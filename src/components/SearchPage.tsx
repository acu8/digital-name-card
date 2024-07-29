import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Flex,
  VStack,
  Container,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getAllUsers } from "../utils/supabaseFunction";

interface IFormInput {
  user_id: string;
}

function SearchPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSearch: SubmitHandler<IFormInput> = async (data) => {
    const { user_id } = data;
    setError(null);
    try {
      const userID = await getAllUsers(user_id);
      if (!userID) {
        setError("ユーザーが見つかりません");
        return;
      } else {
        navigate(`/cards/${user_id}`);
        console.log(user_id);
      }
    } catch (error) {
      console.error("データの取得に失敗しました", error);
      setError("データの取得に失敗しました");
    }
  };

  const onClickRegister = () => {
    navigate("/cards/register");
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Container maxW="md">
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center" data-testid="title">
            デジタル名刺アプリ
          </Heading>
          <Box>
            <Card boxShadow="md" backgroundColor="#fefefe" borderRadius="2xl">
              <CardBody>
                <form onSubmit={handleSubmit(onSearch)}>
                  <FormControl isInvalid={!!errors.user_id} mb={4}>
                    <FormLabel>ユーザーIDで検索</FormLabel>
                    <Input
                      placeholder="ユーザーID"
                      data-testid="user_id"
                      {...register("user_id", {
                        required: "ユーザーIDの入力は必須です",
                        pattern: {
                          value: /^[A-Za-z0-9-_]+$/,
                          message:
                            "英数字、ハイフン(-)、アンダースコア(_)のみ使用できます",
                        },
                      })}
                    />
                    {errors.user_id && (
                      <FormErrorMessage>
                        {errors.user_id.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  {error && (
                    <Text color="red.500" mb={4}>
                      {error}
                    </Text>
                  )}
                  <Button
                    colorScheme="green"
                    type="submit"
                    width="100%"
                    data-testid="search-button"
                  >
                    検索
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Box>
          <Button
            data-testid="register-button"
            colorScheme="green"
            variant="outline"
            onClick={onClickRegister}
            width="100%"
          >
            新規登録はこちら
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
}

export default SearchPage;
