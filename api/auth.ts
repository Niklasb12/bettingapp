import { LoginResponse } from "@/types/auth"; // om du har baseUrl "@/"

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch("http://192.168.0.16:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return await res.json();
};
