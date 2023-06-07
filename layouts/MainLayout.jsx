import Head from "next/head";

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>Dev Game</title>
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
