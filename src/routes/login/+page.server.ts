import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
let isUserLoggedIn = false;

export const load: PageServerLoad = () => {
  return {
    success: true,
  };
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    try {
      const apiURL = "https://crunchypawn-dev.fly.dev/api/access/login";
      const form = await request.formData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const username: any = form.get("username");
      const password = form.get("password");
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) throw error(response.status, response.statusText);
      const responseData = await response.json();
      // localStorage.setItem('userToken', responseData.data.token);
      // localStorage.setItem('username', username);

      cookies.set("userToken", responseData.data.token, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30 * 12,
      });
      cookies.set("username", username, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30 * 12,
      });
      isUserLoggedIn = true;
    } catch (error) {
      console.log(error);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      if (isUserLoggedIn) throw redirect(302, "/");
    }
  },
};
