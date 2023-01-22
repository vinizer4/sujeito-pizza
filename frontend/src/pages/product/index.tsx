import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import styles from "./styles.module.scss";

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <h1>Novo produto</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
