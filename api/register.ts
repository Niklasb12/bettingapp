import { RegisterResponse } from "@/types/register"; // om du har baseUrl "@/"

export const register = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const res = await fetch("http://192.168.0.16:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Register failed");
  }

  return await res.json();
};
