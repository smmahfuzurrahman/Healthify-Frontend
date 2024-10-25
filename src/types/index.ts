import { JwtPayload } from "jwt-decode"; // If you're using `jsonwebtoken`

// Define your custom payload interface
export interface ICustomJwtPayload extends JwtPayload {
  role: string; 
}

export type TConversation = {
  userQuery: string;
  reply: string;
  loading: boolean
}