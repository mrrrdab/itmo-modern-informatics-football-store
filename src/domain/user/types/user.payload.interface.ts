import { Role } from '@prisma/client';

export interface IUserPayload {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}
