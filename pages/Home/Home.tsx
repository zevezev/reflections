import { Box } from "@mui/material";
import dynamic from "next/dynamic";

// I need to lazy load the content in because Next pre-imports things before the window is loaded
// and p5 depends on the window.
const Content = dynamic(() => import("./Content"), { ssr: false });

const HomeContent: React.FC = () => {
  return (
    <Box
      flex="1"
      display="flex"
      width="100%"
      alignItems="center"
      flexDirection="column"
      paddingTop="2rem"
    >
      <h1>Reflections</h1>
      <Content />
    </Box>
  );
};

export default HomeContent;
