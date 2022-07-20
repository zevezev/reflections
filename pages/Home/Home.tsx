import { Box } from "@mui/material";
import dynamic from "next/dynamic";

// I need to lazy load the content in because Next pre-imports things before the window is loaded
// and p5 depends on the window.
let Content;
const HomeContent: React.FC = () => {
  if (typeof window !== "undefined")
    Content = dynamic(() => import("./Content"), { ssr: false });

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
      {!!Content && <Content />}
    </Box>
  );
};

export default HomeContent;
