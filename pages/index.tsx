import type { NextPage } from "next";
import HomeContent from "./Home/Home";
import Head from "next/head";
import { styled } from "@mui/system";

const Home: NextPage = () => {
  return (
    <RootBox>
      <Head>
        <title>BAY PEDALS</title>
      </Head>
      <HomeContent />
    </RootBox>
  );
};
const RootBox = styled("div")({
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  display: "flex",
  flex: "1",
});

export default Home;
