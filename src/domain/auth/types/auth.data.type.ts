import IUserPayload from '@/domain/user/types/interface/user.payload.interface';
import JWT from '@/utils/lib/jwt/types/enum/jwt.enum';

type AuthData = Record<JWT, string> & {
  userPayload: IUserPayload
};
export default AuthData;
