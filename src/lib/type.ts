export interface IUser {
  success: boolean;
  data: {
    id?: string;
    name: string;
    email: string;
    role: "ADMIN" | "LANDLORD" | "TENANT";
    avatarUrl?: string;
  };
}