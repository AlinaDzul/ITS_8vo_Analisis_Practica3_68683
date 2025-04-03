import { User } from "../domain/User";
import { AuthService } from "../ports/AuthService";

export class RegisterUseCase {
  constructor(private authService: AuthService) {}

  async execute(email: string, password: string, name: string): Promise<User | null> {
    return this.authService.register(email, password, name);
  }
}