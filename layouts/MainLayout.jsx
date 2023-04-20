import Head from "next/head";
import Link from "next/link";

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>Jumpstart Shop</title>
      </Head>
      <main>
        <div>
          {props.children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
