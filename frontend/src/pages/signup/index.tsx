import { FormEvent, useContext, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/home.module.scss";

import logoImg from "../../../public/logo.svg";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" className="image" />
        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input placeholder="Digite seu email" type="text" />

            <Input placeholder="Sua senha" type="password" />

            <Button type="submit" loading={false}>
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
