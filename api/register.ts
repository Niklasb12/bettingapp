import { RegisterFormValues } from "@/types/register"; // om du har baseUrl "@/"
import { API_URL } from "@/constants/api";

export const register = async (form: RegisterFormValues) => {
  const { confirmPassword, ...payload } = form; // Skicka inte confirm

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    try {
      const errorJson = await res.json();
      throw new Error(errorJson.message || "Registration failed");
    } catch {
      throw new Error("Registration failed");
    }
  }

  return await res.json();
};
