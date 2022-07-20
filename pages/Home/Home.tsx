import { Box, Button } from "@mui/material";
import Content, { SimKey } from "./Content";

const HomeContent: React.FC = () => {
  return (
    <Box
      flex="1"
      display="flex"
      width="100%"
      alignItems="center"
      flexDirection="column"
      paddingTop="2rem"
      overflow="auto"
      gap="1rem"
      paddingBottom="2rem"
      paddingLeft="10rem"
      paddingRight="10rem"
    >
      <h1>Mirrors, Light, and Perspective</h1>
      <Box>
        1. You're in a room with a mirror and a diamond. You're looking at the
        diamond in the mirror. Try moving the eye around to see how the light
        travels from the diamond into it. Notice how the light coming from the
        diamond bounces off the mirror into your eye - it always makes equal
        incoming and outgoing angles!
      </Box>
      <Content />
      <Box>
        2. The room now has 2 mirrors, and infinite reflections of diamonds! Try
        clicking on the diamond's reflections to see the path the light travels
        when you look at it. Notice how it appears far away because the light
        takes a longer path.
      </Box>
      <Content simNumber={SimKey.TWO_MIRRORS} />
    </Box>
  );
};

export default HomeContent;
