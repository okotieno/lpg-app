export interface IAuthUser {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  profileDescription?: string;
  emailVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerified: boolean;
  phoneVerifiedAt?: string;
  profilePictureLink?: string;
  lastActivityAt: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
  roles: string[];
  permissions: string[];
  stationSpecificRoles:
    {
      roleId: number;
      roleName: string;
      permissions: {
        permissionId: number;
        permissionName: string;
      }[];
      dealerId?: number;
      dealerName?: string;
      depotId?: number;
      depotName?: string;
      transporterId?: number;
      transporterName?: string;
    }[];
}
