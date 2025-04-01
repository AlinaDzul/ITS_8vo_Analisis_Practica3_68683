import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

export class AuthServiceImpl implements AuthService {
  async login(email: string, password: string): Promise<User | null> {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) return response.json();
    return null;
  }

  async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}