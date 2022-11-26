import { writable } from "svelte/store";

type Board = {
  [key: string]: {
    piece: string;
    legalMoves: string[];
    corner?: {
      defaultView: string;
      flippedView: string;
    };
  };
};

const squares: Board = {
  a8: {
    piece: "",
    legalMoves: [],
    corner: { defaultView: "rounded-tl-lg", flippedView: "rounded-br-lg" },
  },
  b8: { piece: "", legalMoves: [] },
  c8: { piece: "", legalMoves: [] },
  d8: { piece: "", legalMoves: [] },
  e8: { piece: "", legalMoves: [] },
  f8: { piece: "", legalMoves: [] },
  g8: { piece: "", legalMoves: [] },
  h8: {
    piece: "",
    legalMoves: [],
    corner: { defaultView: "rounded-tr-lg", flippedView: "rounded-bl-lg" },
  },
  a7: { piece: "", legalMoves: [] },
  b7: { piece: "", legalMoves: [] },
  c7: { piece: "", legalMoves: [] },
  d7: { piece: "", legalMoves: [] },
  e7: { piece: "", legalMoves: [] },
  f7: { piece: "", legalMoves: [] },
  g7: { piece: "", legalMoves: [] },
  h7: { piece: "", legalMoves: [] },
  a6: { piece: "", legalMoves: [] },
  b6: { piece: "", legalMoves: [] },
  c6: { piece: "", legalMoves: [] },
  d6: { piece: "", legalMoves: [] },
  e6: { piece: "", legalMoves: [] },
  f6: { piece: "", legalMoves: [] },
  g6: { piece: "", legalMoves: [] },
  h6: { piece: "", legalMoves: [] },
  a5: { piece: "", legalMoves: [] },
  b5: { piece: "", legalMoves: [] },
  c5: { piece: "", legalMoves: [] },
  d5: { piece: "", legalMoves: [] },
  e5: { piece: "", legalMoves: [] },
  f5: { piece: "", legalMoves: [] },
  g5: { piece: "", legalMoves: [] },
  h5: { piece: "", legalMoves: [] },
  a4: { piece: "", legalMoves: [] },
  b4: { piece: "", legalMoves: [] },
  c4: { piece: "", legalMoves: [] },
  d4: { piece: "", legalMoves: [] },
  e4: { piece: "", legalMoves: [] },
  f4: { piece: "", legalMoves: [] },
  g4: { piece: "", legalMoves: [] },
  h4: { piece: "", legalMoves: [] },
  a3: { piece: "", legalMoves: [] },
  b3: { piece: "", legalMoves: [] },
  c3: { piece: "", legalMoves: [] },
  d3: { piece: "", legalMoves: [] },
  e3: { piece: "", legalMoves: [] },
  f3: { piece: "", legalMoves: [] },
  g3: { piece: "", legalMoves: [] },
  h3: { piece: "", legalMoves: [] },
  a2: { piece: "", legalMoves: [] },
  b2: { piece: "", legalMoves: [] },
  c2: { piece: "", legalMoves: [] },
  d2: { piece: "", legalMoves: [] },
  e2: { piece: "", legalMoves: [] },
  f2: { piece: "", legalMoves: [] },
  g2: { piece: "", legalMoves: [] },
  h2: { piece: "", legalMoves: [] },
  a1: {
    piece: "",
    legalMoves: [],
    corner: { defaultView: "rounded-bl-lg", flippedView: "rounded-tr-lg" },
  },
  b1: { piece: "", legalMoves: [] },
  c1: { piece: "", legalMoves: [] },
  d1: { piece: "", legalMoves: [] },
  e1: { piece: "", legalMoves: [] },
  f1: { piece: "", legalMoves: [] },
  g1: { piece: "", legalMoves: [] },
  h1: {
    piece: "",
    legalMoves: [],
    corner: { defaultView: "rounded-br-lg", flippedView: "rounded-tl-lg" },
  },
};
export const board = writable(squares);
