import { FormEvent, useContext, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.svg";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" className="image" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
