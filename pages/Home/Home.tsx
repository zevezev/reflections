import { Box } from "@mui/material";

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

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="red"
        width="20rem"
        height="10rem"
        marginTop="8rem"
      >
        <h2> Content</h2>
      </Box>
    </Box>
  );
};

export default HomeContent;
