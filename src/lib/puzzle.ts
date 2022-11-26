import { writable } from "svelte/store";

type Puzzle = {
  position: string;
  solution: string;
  id: number;
  userSolution: string;
  isMatePuzzle: boolean;
};

const puzzleData: Puzzle = {
  position: "",
  solution: "", 
  id: 0,
  userSolution: "",
  isMatePuzzle: false,
};

export const puzzle = writable(puzzleData);
