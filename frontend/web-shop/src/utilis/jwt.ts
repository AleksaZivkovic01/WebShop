import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export const getRoleFromToken = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);

  return decoded[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
};