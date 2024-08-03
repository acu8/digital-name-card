import {
  Box,
  Heading,
  Link as ChakraLink,
  Flex,
  Container,
  VStack,
  Card,
  CardBody,
} from "@chakra-ui/react";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { Link } from "react-router-dom";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const bounceStyle = css`
  &:hover {
    animation: ${bounce} 0.3s ease infinite;
  }
`;

function Home() {
  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Container maxW="md" centerContent>
        <VStack spacing={6} align="stretch">
          <Heading mb={2} textAlign="center">
            Digital Name Card
          </Heading>
          <ChakraLink
            as={Link}
            to="/cards/sample-id"
            _hover={{ textDecoration: "none" }}
            css={bounceStyle}
          >
            <Card
              boxShadow="md"
              backgroundColor="#FFFDE6"
              borderRadius="2xl"
              _hover={{ backgroundColor: "#E6FFF0" }}
              cursor="pointer"
              p={3}
            >
              <CardBody py={2} textAlign="center">
                View Example Card
              </CardBody>
            </Card>
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/cards/register"
            _hover={{ textDecoration: "none" }}
            css={bounceStyle}
          >
            <Card
              boxShadow="md"
              backgroundColor="#FFFDE6"
              borderRadius="2xl"
              _hover={{ backgroundColor: "#E6FFF0" }}
              cursor="pointer"
              p={3}
            >
              <CardBody py={2} textAlign="center">
                Go to Register Page
              </CardBody>
            </Card>
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/cards/search"
            _hover={{ textDecoration: "none" }}
            css={bounceStyle}
          >
            <Card
              boxShadow="md"
              backgroundColor="#FFFDE6"
              borderRadius="2xl"
              _hover={{ backgroundColor: "#E6FFF0" }}
              cursor="pointer"
              p={3}
            >
              <CardBody py={2} textAlign="center">
                Go to Search Page
              </CardBody>
            </Card>
          </ChakraLink>
        </VStack>
      </Container>
    </Flex>
  );
}

export default Home;
