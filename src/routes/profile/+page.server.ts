import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
  // const token = localStorage.getItem('userToken')
  const token = cookies.get("userToken");
  if (token) {
    try {
      const profile = await fetch(
        "https://crunchypawn-dev.fly.dev/api/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        }
      );
      const userProfile = await profile.json();
      return { userProfile };
    } catch (error) {
      console.log(error);
    }
  }
};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.set("username", "", {
      path: "/",
      expires: new Date(0),
    });
    cookies.set("userToken", "", {
      path: "/",
      expires: new Date(0),
    });
    cookies.set("nextTacticsPuzzleId", "", {
      path: "/",
      expires: new Date(0),
    });
    cookies.set("nextTacticsPuzzlePosition", "", {
      path: "/",
      expires: new Date(0),
    });
    cookies.set("nextTacticsPuzzleSolution", "", {
      path: "/",
      expires: new Date(0),
    });
    cookies.set("isMatePuzzle", "", {
      path: "/",
      expires: new Date(0),
    });
    throw redirect(302, "/");
  },
};
