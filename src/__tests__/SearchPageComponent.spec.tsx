import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../components/SearchPage";

jest.mock("../utils/supabaseFunction", () => ({
  getAllUsers: jest.fn().mockResolvedValue(true),
}));

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("SearchPage", () => {
  test("タイトルが表示されること", async () => {
    render(<SearchPage />);

    const title = await screen.findByTestId("title");
    expect(title).toBeInTheDocument();
  });

  test("検索ボタン押下後/cards/:idに遷移すること", async () => {
    render(<SearchPage />);

    const user_id = await screen.findByTestId("user_id");
    fireEvent.change(user_id, { target: { value: "abc" } });

    const searchButton = await screen.findByTestId("search-button");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/cards/abc");
    });
  });

  test("ログインIDが未入力の場合にエラーメッセージが表示されること", async () => {
    render(<SearchPage />);

    const searchButton = await screen.findByTestId("search-button");
    fireEvent.click(searchButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText("ユーザーIDの入力は必須です");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("新規登録ボタンをクリックすると、/に遷移すること", async () => {
    render(<SearchPage />);

    const registerButton = await screen.findByTestId("register-button");
    fireEvent.click(registerButton);

    expect(mockedNavigator).toHaveBeenCalledWith("/cards/register");
  });
});
