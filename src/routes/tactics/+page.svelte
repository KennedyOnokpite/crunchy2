<script lang="ts">
  export let data: any;
  import PromotionPossibilities from "$lib/PromotionPossibilities.svelte";
  import Recordings from "$lib/Recordings.svelte";
  import Solution from "$lib/Solution.svelte";
  import Frame from "$lib/Frame.svelte";
  import TestPanel from "$lib/TestPanel.svelte";
  import { puzzle } from "$lib/puzzle";
  import { store } from "$lib/store";
  import { board } from "$lib/board";
  import { boardClone } from "$lib/boardClone";

  $puzzle.position = data.position;
  $puzzle.solution = data.solution;
  $puzzle.isMatePuzzle = data.isMatePuzzle;
  $puzzle.id = data.id;
  $: if ($puzzle?.solution === $puzzle.userSolution) {
    playMoves()
    signifyPuzzleFinished()
  };

  async function signifyPuzzleFinished() {
    const token: any = data.userToken
    console.log(`token: ` + token)
    const nextTacticsPuzzleId = data.id
    console.log(`nextTacticsPuzzleId: ` + nextTacticsPuzzleId)

    try {
      const puzzleFinishedResponse = await fetch(
        `https://crunchypawn-dev.fly.dev/api/puzzles/${nextTacticsPuzzleId}/finish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        }
      );

      const puzzleFinishedResponseJson = await puzzleFinishedResponse.json();
      console.log(puzzleFinishedResponseJson)
      if(puzzleFinishedResponseJson.status) {
        alert('Game solved successfully!')
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function playMoves() {
    const moveArray = $puzzle.solution.split(" ");
    let originSquare;
    let destinationSquare;
    $store.taggedSquares = [];
    for (let move of moveArray) {
      await new Promise((res) => {
        setTimeout(res, 1000);
      });
      originSquare = move.slice(0, 2);
      destinationSquare = move.slice(2, 4);

      if (isCastles(move)) {
        playCastle(move);
        $store.moveSound.play();
        continue;
      }
      if (isPromotion(move)) {
        playPromotion(move);
        continue;
      }
      if (isEnpassant(move)) {
        playEnpassant(move);
        $store.captureSound.play();
        continue;
      } else {
        $board[destinationSquare].piece
          ? $store.captureSound.play()
          : $store.moveSound.play();
        $board[destinationSquare].piece = $board[originSquare].piece;
        $board[originSquare].piece = "";
      }
    }
    console.log("done"); ////////////////////////////////////GET NEXT PUZZLE
  }

  function isCastles(move: string) {
    if ("e1g1e1c1".includes(move)) {
      if ($boardClone["e1"] === "K" || $board["e1"].piece === "K") return true;
    }
    if ("e8g8e8c8".includes(move)) {
      if ($boardClone["e8"] === "k" || $board["e8"].piece === "k") return true;
    }
    return false;
  }

  function playCastle(move: string) {
    if (move === "e1g1") {
      $board["g1"].piece = "K";
      $board["f1"].piece = "R";
      $board["e1"].piece = "";
      $board["h1"].piece = "";
    } else if (move === "e1c1") {
      $board["c1"].piece = "K";
      $board["d1"].piece = "R";
      $board["e1"].piece = "";
      $board["a1"].piece = "";
    } else if (move === "e8g8") {
      $board["g8"].piece = "k";
      $board["f8"].piece = "r";
      $board["e8"].piece = "";
      $board["h8"].piece = "";
    } else if (move === "e8c8") {
      $board["c8"].piece = "k";
      $board["d8"].piece = "r";
      $board["e8"].piece = "";
      $board["a8"].piece = "";
    }
  }

  function isPromotion(move: string) {
    let originSquare = move.slice(0, 2);
    let originRank = move.slice(1, 2);
    let destinationRank = move.slice(3, 4);
    return (
      ($boardClone[originSquare] === "P" &&
        originRank === "7" &&
        destinationRank === "8") ||
      ($boardClone[originSquare] === "p" &&
        originRank === "2" &&
        destinationRank === "1") ||
      ($board[originSquare].piece === "P" &&
        originRank === "7" &&
        destinationRank === "8") ||
      ($board[originSquare].piece === "p" &&
        originRank === "2" &&
        destinationRank === "1")
    );
  }

  function playPromotion(move: string) {
    const originSquare = move.slice(0, 2);
    const destinationSquare = move.slice(2, 4);
    const destinationRank = move.slice(3, 4);
    const promotionPiece = move.slice(4, 5);
    $board[destinationSquare].piece
      ? $store.captureSound.play()
      : $store.moveSound.play();
    destinationRank === "8"
      ? ($board[destinationSquare].piece = promotionPiece.toUpperCase())
      : ($board[destinationSquare].piece = promotionPiece).toLowerCase();
    $board[originSquare].piece = "";
  }

  function isEnpassant(move: string) {
    let originSquare = move.slice(0, 2);
    let destinationSquare = move.slice(2, 4);
    let originFile = move.slice(0, 1);
    let originRank = move.slice(1, 2);
    let destinationFile = move.slice(2, 3);
    let destinationRank = move.slice(3, 4);
    return (
      ($boardClone[originSquare] === "P" &&
        originRank === "5" &&
        destinationRank === "6" &&
        originFile !== destinationFile &&
        $boardClone[destinationSquare] === "" &&
        $boardClone[destinationFile + "5"] === "p") ||
      ($boardClone[originSquare] === "p" &&
        originRank === "4" &&
        destinationRank === "3" &&
        originFile !== destinationFile &&
        $boardClone[destinationSquare] === "" &&
        $boardClone[destinationFile + "4"] === "P") ||
      ($board[originSquare].piece === "P" &&
        originRank === "5" &&
        destinationRank === "6" &&
        originFile !== destinationFile &&
        $board[destinationSquare].piece === "" &&
        $board[destinationFile + "5"].piece === "p") ||
      ($board[originSquare].piece === "p" &&
        originRank === "4" &&
        destinationRank === "3" &&
        originFile !== destinationFile &&
        $board[destinationSquare].piece === "" &&
        $board[destinationFile + "4"].piece === "P")
    );
  }

  function playEnpassant(move: string) {
    let originSquare = move.slice(0, 2);
    let destinationSquare = move.slice(2, 4);
    let destinationFile = move.slice(2, 3);
    if ($board[originSquare].piece === "P") {
      $board[destinationSquare].piece = "P";
      $board[originSquare].piece = "";
      $board[destinationFile + "5"].piece = "";
    } else {
      $board[destinationSquare].piece = "p";
      $board[originSquare].piece = "";
      $board[destinationFile + "4"].piece = "";
    }
  }
</script>

<div>Position: {$puzzle.position}</div>
<div>Solution: {$puzzle.solution}</div>
<div>isMatePuzzle: {$puzzle.isMatePuzzle}</div>
<div>id: {$puzzle.id}</div>

<PromotionPossibilities />

<Frame />

<TestPanel />

<Recordings />

<Solution />
