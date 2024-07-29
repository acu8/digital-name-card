import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardPage from "../components/CardPage";
import { User } from "../domain/user";

const mockUser = jest
  .fn()
  .mockResolvedValue(
    new User(
      "abc",
      "Eri",
      "description",
      { id: 1, name: "React" },
      "github",
      "qiita",
      "x"
    )
  );

const mockgetUserSkills = jest.fn().mockResolvedValue({ id: 1, name: "React" });

jest.mock("../utils/supabaseFunction", () => {
  return {
    getAllUsers: (user_id: string) => mockUser(user_id),
    getUserSkills: (user_id: string) => mockgetUserSkills(user_id),
  };
});

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => ({ user_id: "abc" }),
}));

describe("CardPage", () => {
  test("Cardの中身が正しく表示されること", async () => {
    render(<CardPage />);

    await waitFor(() => {
      const userName = screen.getByTestId("name");
      const description = screen.getByTestId("description");
      const skill = screen.getByTestId("skill");
      const githubId = screen.getByTestId("github");
      const qiitaId = screen.getByTestId("qiita");
      const xId = screen.getByTestId("x");
      expect(userName).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(skill).toBeInTheDocument();
      expect(githubId).toBeInTheDocument();
      expect(qiitaId).toBeInTheDocument();
      expect(xId).toBeInTheDocument();
    });
  });

  test("戻るボタンをクリックすると、/に遷移すること", async () => {
    render(<CardPage />);

    const backButton = await screen.findByTestId("back-button");
    fireEvent.click(backButton);

    if (mockUser.mock.calls.length > 0) {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    }
  });
});
