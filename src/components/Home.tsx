import { Box, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box p={5}>
      <Heading mb={4}>Welcome to Digital Name Card</Heading>
      <ChakraLink as={Link} to="/cards/sample-id">
        View Example Card
      </ChakraLink>
      <br />
      <ChakraLink as={Link} to="/cards/register">
        Go to Register Page
      </ChakraLink>
      <br />
      <ChakraLink as={Link} to="/cards/search">
        Go to Search Page
      </ChakraLink>
    </Box>
  );
}

export default Home;
