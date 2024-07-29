import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterPage from "../components/RegisterPage";

const mockAddUser = jest.fn().mockResolvedValue({
  user_id: "abc",
  name: "Eri",
  description: "description",
  github_id: "github",
  qiita_id: "qiita",
  x_id: "x",
  skills: "React",
});

const mockAddUserSkill = jest.fn().mockResolvedValue({
  data: [{ user_id: "abc", skill_id: "1" }],
  error: null,
});

jest.mock("../utils/supabaseFunction", () => {
  return {
    addUserRecords: () => mockAddUser(),
    addSkill: (user_id: string, skill_id: string) =>
      mockAddUserSkill(user_id, skill_id),
    getSkills: jest.fn().mockResolvedValue([
      { id: "1", name: "React" },
      { id: "2", name: "Node.js" },
    ]),
  };
});

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => ({ user_id: "abc" }),
}));

describe("RegisterPage", () => {
  test("Cardの中身が正しく表示されること", async () => {
    render(<RegisterPage />);

    await waitFor(() => {
      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
    });
  });

  test("ログインIDが未入力の場合にエラーメッセージが表示されること", async () => {
    render(<RegisterPage />);

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText("ユーザーIDの入力は必須です");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("名前が未入力の場合にエラーメッセージが表示されること", async () => {
    render(<RegisterPage />);

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText("名前の入力は必須です");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("自己紹介が未入力の場合にエラーメッセージが表示されること", async () => {
    render(<RegisterPage />);

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText("自己紹介の記入は必須です");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("好きな技術が未選択の場合にエラーメッセージが表示されること", async () => {
    render(<RegisterPage />);

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText("技術の選択は必須です");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("登録ボタン押下後/に遷移すること（オプション入力なし）", async () => {
    render(<RegisterPage />);

    const user_id = await screen.findByTestId("user_id");
    fireEvent.change(user_id, { target: { value: "abc" } });

    const name = await screen.findByTestId("name");
    fireEvent.change(name, { target: { value: "Eri" } });

    const description = await screen.findByTestId("description");
    fireEvent.change(description, { target: { value: "description" } });

    const skills = await screen.findByTestId("skills");
    fireEvent.change(skills, { target: { value: "1" } });

    const github_id = await screen.findByTestId("github_id");
    fireEvent.change(github_id, { target: { value: "" } });

    const qiita_id = await screen.findByTestId("qiita_id");
    fireEvent.change(qiita_id, { target: { value: "" } });

    const x_id = await screen.findByTestId("x_id");
    fireEvent.change(x_id, { target: { value: "" } });

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalled();
    });

    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });

  test("登録ボタン押下後/に遷移すること（全項目入力）", async () => {
    render(<RegisterPage />);

    const user_id = await screen.findByTestId("user_id");
    fireEvent.change(user_id, { target: { value: "abc" } });

    const name = await screen.findByTestId("name");
    fireEvent.change(name, { target: { value: "Eri" } });

    const description = await screen.findByTestId("description");
    fireEvent.change(description, { target: { value: "description" } });

    const skills = await screen.findByTestId("skills");
    fireEvent.change(skills, { target: { value: "1" } });

    const github_id = await screen.findByTestId("github_id");
    fireEvent.change(github_id, { target: { value: "github_id" } });

    const qiita_id = await screen.findByTestId("qiita_id");
    fireEvent.change(qiita_id, { target: { value: "qiita_id" } });

    const x_id = await screen.findByTestId("x_id");
    fireEvent.change(x_id, { target: { value: "x_id" } });

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalled();
    });

    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
