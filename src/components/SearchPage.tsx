import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
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
    <>
      <form onSubmit={handleSubmit(onSearch)}>
        <Heading mb={4}>デジタル名刺アプリ</Heading>
        <Box p={5} maxW="sm">
          <FormControl isInvalid={!!errors.user_id}>
            <FormLabel>ユーザーIDで検索</FormLabel>
            <Input
              placeholder="ユーザーID"
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
              <FormErrorMessage>{errors.user_id.message}</FormErrorMessage>
            )}
          </FormControl>
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
        </Box>
        <Button colorScheme="green" mt={5} type="submit">
          検索
        </Button>
      </form>

      <Button
        colorScheme="green"
        color="green"
        variant="outline"
        mt={5}
        ml={2}
        onClick={onClickRegister}
      >
        新規登録はこちら
      </Button>
    </>
  );
}

export default SearchPage;
