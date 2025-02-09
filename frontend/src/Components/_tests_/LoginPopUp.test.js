import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { GasContext } from "../../Context/GasContext";
import LoginPopUp from "../../Components/LoginPopUp";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify"; // Import mock

jest.mock("axios");

// ✅ Mock toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

const mockSetToken = jest.fn();
const mockSetUserData = jest.fn();
const mockSetShowSignIn = jest.fn();

const renderComponent = () => {
  return render(
    <GasContext.Provider
      value={{
        setToken: mockSetToken,
        setUserData: mockSetUserData,
        setShowSignIn: mockSetShowSignIn, // ✅ Now included in context
      }}
    >
      <BrowserRouter>
        <LoginPopUp setShowSignIn={mockSetShowSignIn} />
      </BrowserRouter>
    </GasContext.Provider>
  );
};

describe("LoginPopUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // ✅ Clears mocks before each test
    localStorage.clear(); // ✅ Clears localStorage between tests
  });

  test("renders Sign In form correctly", () => {
    renderComponent();

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Gasbygas@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("**********")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("calls API and logs in user successfully", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { token: "mockToken123", user: { name: "John Doe" } },
    });

    renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Gasbygas@gmail.com"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("**********"), "password123");

    userEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith("https://24a5-212-104-231-197.ngrok-free.app/api/auth/login", {
        email: "user@example.com",
        password: "password123",
      })
    );

    expect(mockSetToken).toHaveBeenCalledWith("mockToken123");
    expect(mockSetShowSignIn).toHaveBeenCalledWith(false);
    expect(toast.success).toHaveBeenCalledWith("Login successful!");

    // ✅ Ensure localStorage is updated
    await waitFor(() => expect(localStorage.getItem("token")).toBe("mockToken123"));
  });

  test("shows error toast on login failure", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));

    renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Gasbygas@gmail.com"), "wrong@example.com");
    await userEvent.type(screen.getByPlaceholderText("**********"), "wrongpassword");

    userEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Error connecting to the server."));
  });
});