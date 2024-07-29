import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Button,
  Card,
  CardBody,
  Stack,
  Container,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addSkill, addUserRecords, getSkills } from "../utils/supabaseFunction";
import { Skill } from "../domain/user";

interface IFormInput {
  user_id: string;
  name: string;
  description: string;
  github_id?: string;
  qiita_id?: string;
  x_id?: string;
  skills: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const navigate = useNavigate();

  const onRegisterRecord: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form data:", data);
    if (!data.user_id || !data.name || !data.description) {
      console.error("必須フィールドが入力されていません");
      return;
    }

    try {
      const user = await addUserRecords(
        data.user_id,
        data.name,
        data.description,
        data.github_id,
        data.qiita_id,
        data.x_id
      );

      if (user && data.skills) {
        const skillData = await addSkill(data.user_id, data.skills);
        console.log(skillData);
      }

      reset();
      navigate(`/`);
    } catch (error) {
      console.log("Error occured when registering content", error);
    }
  };

  useEffect(() => {
    const getSkillData = async () => {
      try {
        const skillData = await getSkills();
        if (!skillData) {
          console.log("User not found");
          return;
        }
        setSkills(skillData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    getSkillData();
  }, []);

  return (
    <>
      <Container maxW={{ base: "100%", sm: "sm" }} px={{ base: 4, md: 0 }}>
        <Heading m={6} textAlign="center" data-testid="title">
          名刺新規登録
        </Heading>
        <Card boxShadow="md" backgroundColor="#fefefe" borderRadius="2xl">
          <CardBody>
            <form onSubmit={handleSubmit(onRegisterRecord)}>
              <Stack spacing={6}>
                <FormControl isInvalid={!!errors.user_id}>
                  <FormLabel>ユーザーID（英字で入力）</FormLabel>
                  <Input
                    placeholder="ユーザーID"
                    data-testid="user_id"
                    {...register("user_id", {
                      required: "ユーザーIDの入力は必須です",
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "英字で入力してください",
                      },
                    })}
                  />
                  {errors.user_id && (
                    <FormErrorMessage>
                      {errors.user_id.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>名前:</FormLabel>
                  <Input
                    placeholder="名前"
                    data-testid="name"
                    {...register("name", { required: "名前の入力は必須です" })}
                  />
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>自己紹介:</FormLabel>
                  <Input
                    placeholder="description"
                    data-testid="description"
                    {...register("description", {
                      required: "自己紹介の記入は必須です",
                    })}
                  />
                  {errors.description && (
                    <FormErrorMessage>
                      {errors.description.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.skills}>
                  <FormLabel>好きな技術:</FormLabel>
                  <Select
                    placeholder="好きな技術を選択"
                    data-testid="skills"
                    {...register("skills", {
                      required: "技術の選択は必須です",
                    })}
                  >
                    {skills &&
                      skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                  </Select>
                  {errors.skills && (
                    <FormErrorMessage>{errors.skills.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Github ID:</FormLabel>
                  <Input
                    placeholder="Github id"
                    data-testid="github_id"
                    {...register("github_id")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Qiita ID:</FormLabel>
                  <Input
                    placeholder="Qiita id"
                    data-testid="qiita_id"
                    {...register("qiita_id")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>X ID:</FormLabel>
                  <Input
                    placeholder="X id"
                    data-testid="x_id"
                    {...register("x_id")}
                  />
                </FormControl>

                <Box display="flex" justifyContent="center" mt={6}>
                  <Button
                    type="submit"
                    data-testid="register-button"
                    colorScheme="blue"
                    size="lg"
                  >
                    新規登録
                  </Button>
                </Box>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default RegisterPage;
