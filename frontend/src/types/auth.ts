export interface AuthContextType {
  token: string | null;
  userId: number | null;
  login: (token: string, userId: number) => void;
  logout: () => void;
};
