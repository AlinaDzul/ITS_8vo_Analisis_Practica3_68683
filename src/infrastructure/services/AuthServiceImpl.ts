import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

export class AuthServiceImpl implements AuthService {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        console.error("Login fallido:", response.statusText);
        return null;
      }
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      console.error("Error en login:", error);
      return null;
    }
  }

  async register(email: string, password: string, name: string): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) {
        console.error("Registro fallido:", response.statusText);
        return null;
      }
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      console.error("Error en register:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  // Método para verificar si el token ha expirado
  isTokenExpired(): boolean {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("tokenExpiration");
    if (!token || !expiration) return true;
    return Date.now() > parseInt(expiration, 10);
  }
}