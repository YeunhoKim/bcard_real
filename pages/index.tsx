import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import InputForBcard from "../components/input";

const Home: NextPage = () => {
  return (
    <div className="p-5 max-w-lg mx-auto">
      <InputForBcard />
    </div>
  );
};

export default Home;
