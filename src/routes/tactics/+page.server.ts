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
