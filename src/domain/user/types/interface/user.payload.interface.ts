import { Role } from '@prisma/client';

interface IUserPayload {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}
export default IUserPayload;
