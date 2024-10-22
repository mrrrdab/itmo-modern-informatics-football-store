import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

const UseRole = (role: Role) => SetMetadata('role', role);
export default UseRole;
