import { useParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Text,
  Link as ChakraLink,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

import { getAllUsers, getUserSkills } from "../utils/supabaseFunction";
import { Skill, User } from "../domain/user";

function CardPage() {
  const { user_id } = useParams<{ user_id: string }>();
  console.log("user_id:", user_id);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllData = async () => {
      if (!user_id) {
        setError("ID is undefined");
        return;
      }
      try {
        const usersData = await getAllUsers(user_id);
        if (!usersData) {
          setError("User not found");
          return;
        }
        const skillData = await getUserSkills(user_id);

        console.log("skillData", skillData);
        //クラス定義からインスタンスを作成
        const skill = new Skill(skillData.id, skillData.name);

        const user = new User(
          usersData.id,
          usersData.name,
          usersData.description,
          skill,
          usersData.github_id,
          usersData.qiita_id,
          usersData.x_id
        );

        setUser(user);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    getAllData();
  }, [user_id]);

  if (isLoading) {
    return <Spinner data-testid="loading" />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (!user) {
    return <Spinner data-testid="loading" />;
  }
  return (
    <Box p={5}>
      <Card maxW="sm" size="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign="center" mb={4}>
              {user.name}
            </Heading>
            <Text dangerouslySetInnerHTML={{ __html: user.description }} />
            <Text fontSize="1xl">スキル：{user.Skill?.name}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex
            gap={5}
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <ChakraLink
              href={`https://github.com/${user.github_id}`}
              isExternal
            >
              <Icon as={FaGithub} boxSize={6} />
            </ChakraLink>
            <ChakraLink href={`https://qiita.com/${user.qiita_id}`} isExternal>
              <Icon as={SiQiita} boxSize={6} />
            </ChakraLink>
            <ChakraLink href={`https://twitter.com/${user.x_id}`} isExternal>
              <Icon as={RiTwitterXFill} boxSize={6} />
            </ChakraLink>
          </Flex>
        </CardFooter>
      </Card>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        戻る
      </Button>
    </Box>
  );
}

export default CardPage;
