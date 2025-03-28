import { UUID } from "crypto";

export type Message = {
  id?: UUID;
  data: {
    name: string;
    email: string;
    body: string;
  }
  read: boolean;
  created_at?: string;
  updated_at?: string;
}