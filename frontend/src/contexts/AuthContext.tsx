import { createContext, ReactNode, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { toast } from "react-toastify";

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        toast.success(`Bem vindo ${response.data.name}!`, {
          theme: "colored",
          autoClose: 1000,
        });

        const { id, name, token } = response.data;

        setCookie(undefined, "@nextauth.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/", // Quais caminhoes terao acesso ao cookie
        });

        setUser({
          id,
          name,
          email,
        });

        // Passar para proximas requisicoes o nosso token
        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        // Redirecionar user para /dashboard
        Router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("Error ao tentar realizar login: " + error.message, {
        theme: "colored",
      });
      console.log("ERRO AO ACESSAR ", error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(`Usuário ${response.data.name} cadastro com sucesso!`, {
          theme: "colored",
          autoClose: 1000,
        });

        Router.push("/");
      }
    } catch (error: any) {
      toast.error("Error ao tentar realizar cadastro: " + error.message, {
        theme: "colored",
      });
      console.log("ERRO AO ACESSAR ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
