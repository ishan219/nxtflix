const SIGN_IN_URL = "https://serverless-api-teal.vercel.app/api/auth/signin";

export const signIn = async (email, password) => {
  const response = await fetch(SIGN_IN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Something went wrong. Please try again.",
    );
  }

  return data;
};

export const extractToken = (data) =>
  data.jwt_token || data.token || data.jwtToken || data.data?.token;
