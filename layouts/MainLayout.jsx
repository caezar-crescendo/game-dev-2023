import Head from "next/head";
import Link from "next/link";

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>Jumpstart Shop</title>
      </Head>
      <main className="bg-gray-300 min-h-[100vh]">
        <div>
          {props.children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
