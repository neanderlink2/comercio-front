export interface AuthProviderUser {
  username: string;
  email: string;
  phoneNumber: Date;
}

export type AuthContextType = {
  user: AuthProviderUser | null;
  token: string | null;
  loading: boolean;
  authenticated: boolean;
  hydrating: boolean;
  entrar(usuario: string, senha: string): void;
  sair(): void;
};
