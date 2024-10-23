import { Controller, Get, Post, Param, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { CryptoProvider, JWT, MailerProvider } from '@/utils';

import { UserService } from '../user/user.service';
import { UserAggregate } from '../user/user.aggregate';
import { IUserPayload } from '../user/types';
import { EmailVerifService } from '../email-verification/email-verification.service';

import { AuthEmailTemplate } from './auth.email.template';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards';
import { EmailSubject, PasswordChar } from './types';
import { TokenVerifDTO, UserSignInDTO, UserSignUpDTO } from './dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly mailer: MailerProvider,
    private readonly crypto: CryptoProvider,
    private readonly authEmailTemplate: AuthEmailTemplate,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userAggregate: UserAggregate,
    private readonly emailVerifService: EmailVerifService,
  ) {}

  @ApiOperation({ summary: 'Get User Payload' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('userPayload')
  @UseGuards(AuthGuard)
  public getUserPayload(@Req() req: Request, @Res() res: Response): Response | void {
    if (!req.user) {
      return res.status(401).send('Not Authorized');
    }

    res.status(200).json({
      data: req.user,
      message: 'User Payload',
    });
  }

  @ApiOperation({ summary: 'Recover Customer Password' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Not Authorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'email',
    type: 'string',
    format: 'email',
    required: true,
    description: 'User email',
  })
  @Get('recoverPassword/:email')
  public async recoverPassword(@Param('email') email: string, @Res() res: Response): Promise<Response | void> {
    const user = await this.userService.getByUniqueParams({
      where: {
        email: email,
      },
    });

    const token = this.crypto.generateSecureVerifToken(6);
    const requiredChars = Object.values(PasswordChar)
      .map(charType => this.authService.generateRandomCharToPassword(charType))
      .flat();

    const splittedToken = token.split('');
    requiredChars.forEach(char => {
      const insertIndex = Math.floor(Math.random() * (splittedToken.length + 1));
      splittedToken.splice(insertIndex, 0, char);
    });

    const newPassword = splittedToken.join('');
    const hashNewPassword = await this.crypto.hashStringBySHA256(newPassword);

    await this.userService.update(user.id, {
      password: hashNewPassword,
    });

    await this.mailer.getTransporter().sendMail({
      to: email,
      subject: this.authEmailTemplate.getEmailSubject(EmailSubject.recoverPassword),
      html: this.authEmailTemplate.createRecoverEmail(newPassword),
    });

    res.status(200).send(`The password has been successfully changed and sent to your email - ${email}`);
  }

  @ApiOperation({ summary: 'Sign In' })
  @ApiBody({
    type: UserSignInDTO,
    examples: {
      'User - Customer || Administrator || Moderator': {
        value: {
          email: 'voyagerbvb@gmail.com',
          password: 'hjgkdLJFOP!04',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Invalid Syntax' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('signin')
  public async signin(@Body() userSigninData: UserSignInDTO, @Res() res: Response): Promise<Response | void> {
    const hashUserPassword = await this.crypto.hashStringBySHA256(userSigninData.password);
    const user = await this.userService.getByUniqueParams({
      where: {
        email: userSigninData.email,
      },
    });

    if (user.password !== hashUserPassword) {
      return res.status(401).send('Invalid email or password');
    }

    if (!user.isVerified) {
      return res.status(403).send('Account is not activated');
    }

    const { userPayload, refresh } = await this.authService.setJWTCookie(user, res);
    await this.userService.update(user.id, {
      refreshToken: refresh,
    });

    res.status(200).json({
      data: userPayload,
      message: 'Successful authorization',
    });
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiBody({
    type: UserSignUpDTO,
    examples: {
      'User - Customer': {
        value: {
          email: 'voyagerbvb@gmail.com',
          password: 'hjgkdLJFOP!04',
          confirmPassword: 'hjgkdLJFOP!04',
          firstName: 'James',
          lastName: 'Smith',
          birthDate: new Date('2002-12-29'),
          phoneNumber: '+7 (982) 408-31-75',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful Response (The account was created but not activated)' })
  @ApiResponse({ status: 400, description: 'Invalid Syntax' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('signup')
  public async signup(@Body() userSignupData: UserSignUpDTO, @Res() res: Response): Promise<Response | void> {
    userSignupData.password = await this.crypto.hashStringBySHA256(userSignupData.password);
    const verifToken = this.crypto.generateSecureVerifToken(6);

    await this.userAggregate.applySignupTransaction(userSignupData, {
      token: verifToken,
    });

    await this.mailer.getTransporter().sendMail({
      to: userSignupData.email,
      subject: this.authEmailTemplate.getEmailSubject(EmailSubject.activateAccount),
      html: this.authEmailTemplate.createActivationEmail({
        token: verifToken,
      }),
    });

    res.status(200).send(`Verification letter successfully sent to your email - ${userSignupData.email}`);
  }

  @ApiOperation({ summary: 'Sign Out' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('logout')
  @UseGuards(AuthGuard)
  public async logout(@Req() req: Request, @Res() res: Response) {
    const userPayload = req.user as IUserPayload;

    await this.userService.update(userPayload.id, {
      refreshToken: null,
    });

    if (req.cookies[JWT.refresh]) {
      res.clearCookie(JWT.refresh);
    }

    res.clearCookie(JWT.access);
    res.status(200).send('You have successfully logged out');
  }

  @ApiOperation({ summary: 'Resend the email to verify the customer email' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'User email',
  })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/signup/resendEmail/:email')
  public async resendEmail(@Param('email') email: string, @Res() res: Response): Promise<Response | void> {
    const user = await this.userService.getByUniqueParams({
      where: {
        email: email,
      },
    });

    let emailVerif = await this.emailVerifService.getByUniqueParams({
      where: {
        userId: user.id,
      },
    });

    if (new Date(emailVerif.expiresAt) < new Date()) {
      emailVerif = await this.emailVerifService.update(emailVerif.id, {
        verifToken: this.crypto.generateSecureVerifToken(6),
      });
    }

    await this.mailer.getTransporter().sendMail({
      to: email,
      subject: this.authEmailTemplate.getEmailSubject(EmailSubject.activateAccount),
      html: this.authEmailTemplate.createActivationEmail({
        token: emailVerif.verifToken,
      }),
    });

    res.status(200).send(`The letter has been successfully sent to your email address - ${email}`);
  }

  @ApiOperation({ summary: 'Activate the created customer account' })
  @ApiBody({
    type: TokenVerifDTO,
    examples: {
      'User - Customer': {
        value: {
          token: '4747918d87de',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Verification Token Expired' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/signup/verifyUserEmail')
  public async verifyUserEmail(@Body() verifData: TokenVerifDTO, @Res() res: Response): Promise<Response | void> {
    const emailVerif = await this.emailVerifService.getByUniqueParams({
      where: {
        verifToken: verifData.token,
      },
    });

    if (new Date(emailVerif.expiresAt) < new Date()) {
      return res.status(401).send('Verification Token Expired');
    }

    const user = await this.userService.getByUniqueParams({
      where: {
        id: emailVerif.userId,
      },
    });

    await this.userService.update(user.id, {
      isVerified: true,
    });

    const { userPayload, refresh } = await this.authService.setJWTCookie(user, res);
    await this.userService.update(user.id, {
      refreshToken: refresh,
    });

    res.status(200).json({
      data: userPayload,
      message: 'Successful Authorization',
    });
  }
}
