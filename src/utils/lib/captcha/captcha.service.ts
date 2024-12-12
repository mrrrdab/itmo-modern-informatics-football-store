import { RedisService } from '@/cache/redis';
import { CryptoProvider } from '../crypto';

export class CaptchaService {
  constructor(
    private readonly redisService: RedisService,
    private readonly crypto: CryptoProvider
  ) {}

  public async generateCaptcha(captchaLength: number = 6): Promise<string> {
    const token = this.crypto.generateSecureVerifToken(captchaLength);
    return token;
  }

  public async verifyCaptcha(token: string) {

  }
}
