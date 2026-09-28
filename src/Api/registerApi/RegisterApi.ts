import { LoginRequest } from "@/feature/validation/loginValid";
import axios from "axios";

export async function RegisterApi({email, password}: LoginRequest) {
    return await axios.post(
        'https://api.backendless.com/51BDC217-6F0F-4668-8A87-71B5CFFCD59A/EC698C6A-021C-4A86-8DAD-32A425C360DD/users/register',
        { email, password },
      );
}