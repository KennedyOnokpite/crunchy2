import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ cookies }) => {
  const token: any = cookies.get("userToken");
  const id = cookies.get("nextTacticsPuzzleId");
  if (id) {
    return {
      id: id,
      position: cookies.get("nextTacticsPuzzlePosition"),
      solution: cookies.get("nextTacticsPuzzleSolution"),
      isMatePuzzle: cookies.get("isMatePuzzle"),
    };
  }

  try {
    const puzzle = await fetch(
      "https://crunchypawn-dev.fly.dev/api/puzzles/next",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      }
    );

    const nextPuzzle = await puzzle.json();
    const { id, position, solution, isMatePuzzle } = nextPuzzle.data;

    cookies.set("nextTacticsPuzzleId", id, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 12,
    });
    cookies.set("nextTacticsPuzzlePosition", position, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 12,
    });
    cookies.set("nextTacticsPuzzleSolution", solution, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 12,
    });
    cookies.set("isMatePuzzle", isMatePuzzle, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 12,
    });
    return { id, position, solution, isMatePuzzle };
  } catch (error) {
    console.log(error);
  }
};

// export const actions: Actions = {
//   saveSolvedPuzzle: async ({ request, cookies }) => {
//     try {
//       const apiURL = "https://crunchypawn-dev.fly.dev/api/signup/signup";
//       const form = await request.formData();
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const username: any = form.get("username");
//       const password = form.get("password");
//       const response = await fetch(apiURL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });
//       if (!response.ok) throw error(response.status, response.statusText);
//       const responseData = await response.json();
//       // localStorage.setItem('userToken', responseData.data.token);
//       // localStorage.setItem('username', username);

//       cookies.set("userToken", responseData.data.token, {
//         path: "/",
//         httpOnly: true,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24 * 30 * 12,
//       });
//       cookies.set("username", username, {
//         path: "/",
//         httpOnly: true,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24 * 30 * 12,
//       });
//       isAccountCreated = true;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       // eslint-disable-next-line no-unsafe-finally
//       if (isAccountCreated) throw redirect(302, "/");
//     }
//   },
// };
