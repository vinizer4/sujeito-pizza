import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      toast.error("Digite um nome!", {
        theme: "colored",
      });

      return;
    }

    const apiClient = setupAPIClient();

    try {
      let response = await apiClient.post("/category", {
        name: name,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Categoria cadastrada com sucesso", { theme: "colored" });
      }
    } catch (error: any) {
      console.log(error.message);
      if (error.message === "Request failed with status code 401") {
        toast.error("Erro ao realizar o cadastro usuário não está logado!", {
          theme: "colored",
        });
      } else {
        toast.error("Erro ao realizar o cadastro!", {
          theme: "colored",
        });
      }
    } finally {
      setName("");
    }
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
