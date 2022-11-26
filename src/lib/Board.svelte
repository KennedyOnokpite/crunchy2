<script lang="ts">
  import { store } from "$lib/store";
  import { puzzle } from "$lib/puzzle";
  import { board } from "$lib/board";
  import { boardClone } from "$lib/boardClone";
  import Square from "$lib/Square.svelte";
  import { onMount } from "svelte";

  //   $puzzle.solution = "f2g3 e6e7 b2b1 b3c1 b1c1 h6c1";
  //   r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24,
  // 5rk1/2p3b1/3pq3/P4rp1/1PP1p1Q1/4B2P/5P1K/2R2R2 w - - 0 36,e3g5 e6e5 f2f4 e4f3
  // 2kr1bnr/ppp1qppp/2bp4/4P3/5PQ1/1B6/PPP3PP/RNB2RK1 b - - 2 11,f7f5g4h2 e1c1 h3f3 h1h2 f3e2 c3e2 e5f6 e7d7 b3e6
  //CASTLING
  // $puzzle.position =
  //   "r3k2r/4bppp/p2p4/2pPp3/4P1n1/2N2P1q/PP1BQP1P/R3K2R b KQkq - 6 15";
  // $puzzle.solution = "g4h2 e1c1 h3f3 h1h2 f3e2 c3e2";
  //  $puzzle.position = "r1b1kb1r/pp3ppp/1qnppn2/2p5/4P3/2NPBN2/PPPQBPPP/R3K2R b KQkq - 1 7";
  // $puzzle.solution = "b6b2 a1b1 b2a3 c3b5 a3a2 e1g1";
  // $puzzle.position ="r3k2r/p1q2ppp/bb2p1n1/3pP3/3N1B2/2P3P1/PP1Q1PBP/R3K2R b KQkq - 2 16";
  // $puzzle.solution = "g6e5 e1c1 e8g8 h1e1 b6d4 d2d4";
  //ENPASSANT
  // $puzzle.position = 'r4r1k/1b1p1p1p/p1n1p3/2qnP2Q/1p2BP2/8/PPP3PP/R1B2R1K b - - 3 17';
  // $puzzle.solution = 'f7f5 e5f6 d5f6 h5c5';
  //PROMOTION
  // $puzzle.position = "8/7R/5p2/p7/7P/2p5/3k2r1/1K2N3 w - - 3 48";
  // $puzzle.solution = "e1g2 c3c2 b1a2 c2c1q h7d7 d2e2";
  // $puzzle.position = "8/8/8/3K2kp/8/2P1P3/8/8 w - - 0 50";
  // $puzzle.solution = "c3c4 h5h4 d5e4 g5g4 c4c5 h4h3 e4e5 h3h2 c5c6 h2h1q";
  console.log($puzzle.solution);
  // $puzzle.position = '2kr4/2pR4/2P1K1P1/8/8/p3n3/8/8 b - - 1 49';
  // $puzzle.solution = 'a3a2 d7d8 c8d8 g6g7 a2a1q g7g8q';
  console.log($puzzle.solution);

  const boardClasses =
    "col-start-2 col-end-3 row-start-2 row-end-3 w-96 h-96 flex flex-wrap";

  const getMoveType = function (move: string) {
    if (isCastles(move)) {
      recordCastles(move);
      castleClone(move);
    } else if (isEnpassant(move)) {
      recordEnpassant(move);
      enpassantClone(move);
    } else if (isPromotion(move)) {
      recordPromotion(move);
      promoteClone(move);
    } else {
      recordNormalMove(move);
      moveClone(move);
    }
  };

  function isCastles(move: string) {
    if ("e1g1e1c1".includes(move)) {
      if ($boardClone["e1"] === "K" || $board["e1"].piece === "K") return true;
    }
    if ("e8g8e8c8".includes(move)) {
      if ($boardClone["e8"] === "k" || $board["e8"].piece === "k") return true;
    }
    return false;
  }

  function recordCastles(move: string) {
    "e1g1e8g8".includes(move)
      ? ($store.recordings = $store.recordings.slice(0, -3) + "0-0")
      : ($store.recordings = $store.recordings.slice(0, -3) + "0-0-0");
  }

  function castleClone(move: string) {
    if (move === "e1g1") {
      $boardClone["g1"] = "K";
      $boardClone["f1"] = "R";
      $boardClone["e1"] = "";
      $boardClone["h1"] = "";
    } else if (move === "e1c1") {
      $boardClone["c1"] = "K";
      $boardClone["d1"] = "R";
      $boardClone["e1"] = "";
      $boardClone["a1"] = "";
    } else if (move === "e8g8") {
      $boardClone["g8"] = "k";
      $boardClone["f8"] = "r";
      $boardClone["e8"] = "";
      $boardClone["h8"] = "";
    } else if (move === "e8c8") {
      $boardClone["c8"] = "k";
      $boardClone["d8"] = "r";
      $boardClone["e8"] = "";
      $boardClone["a8"] = "";
    }
    $store.moveSound.play();
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

  function recordEnpassant(move: string) {
    $store.recordings += "x" + move.slice(2, 4);
  }

  function enpassantClone(move: string) {
    let originSquare = move.slice(0, 2);
    let destinationSquare = move.slice(2, 4);
    let destinationFile = move.slice(2, 3);
    if ($boardClone[originSquare] === "P") {
      $boardClone[destinationSquare] = "P";
      $boardClone[originSquare] = "";
      $boardClone[destinationFile + "5"] = "";
      $store.captureSound.play();
    } else {
      $boardClone[destinationSquare] = "p";
      $boardClone[originSquare] = "";
      $boardClone[destinationFile + "4"] = "";
      $store.captureSound.play();
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

  function recordPromotion(move: string) {
    const destinationSquare = move.slice(2, 4);
    const destinationRank = move.slice(3, 4);
    destinationRank === "8"
      ? ($store.whitePromotes = true)
      : ($store.blackPromotes = true);
    $boardClone[destinationSquare]
      ? ($store.recordings += "x" + destinationSquare)
      : ($store.recordings += "-" + destinationSquare);
  }

  function promoteClone(move: string) {
    const originSquare = move.slice(0, 2);
    const destinationSquare = move.slice(2, 4);
    $boardClone[destinationSquare]
      ? $store.captureSound.play()
      : $store.moveSound.play();
    $store.promotionSquare = destinationSquare;
    $boardClone[originSquare] = "";
  }

  function recordNormalMove(move: string) {
    const destinationSquare = move.slice(2, 4);
    if ($boardClone[destinationSquare]) {
      $store.recordings += "x" + destinationSquare;
      $store.captureSound.play();
    } else {
      $store.recordings += "-" + destinationSquare;
      $store.moveSound.play();
    }
  }

  function moveClone(move: string) {
    const originSquare = move.slice(0, 2);
    const destinationSquare = move.slice(2, 4);
    $boardClone[destinationSquare] = $boardClone[originSquare];
    $boardClone[originSquare] = "";
  }

  function setBoardView() {
    //The user should be able to choose view from the page
    if ($store.randomBoardView) $store.flippedBoardView = Math.random() >= 0.5;
    else if ($store.whiteToMove) $store.flippedBoardView = true;
    else $store.flippedBoardView = false;
  }

  function saveFenData() {
    let fenDataArray = $puzzle.position.split(" ");
    $store.whiteToMove = $puzzle.position.includes("w") ? true : false;
    $store.possibleWhiteKingSideCastling = fenDataArray[2].includes("K")
      ? true
      : false;
    $store.possibleWhiteQueenSideCastling = fenDataArray[2].includes("Q")
      ? true
      : false;
    $store.possibleBlackKingSideCastling = fenDataArray[2].includes("k")
      ? true
      : false;
    $store.possibleBlackQueenSideCastling = fenDataArray[2].includes("q")
      ? true
      : false;
    $store.possibleEnpassantSquare = fenDataArray[3];
  }

  function setPosition() {
    let pieceArray: string[] = [];
    $puzzle.position
      .split(" ")[0]
      .split("")
      .forEach((character) => {
        if ("KQRBNPkqrbnp".includes(character)) {
          pieceArray.push(character);
        } else if ("12345678".includes(character)) {
          for (let i = 0; i < Number(character); i++) {
            pieceArray.push("");
          }
        } else return;
      });
    pieceArray.forEach((piece, index) => {
      $board[$store.squareArray[index]].piece = piece;
      $boardClone[$store.squareArray[index]] = piece;
    });
  }

  function saveFirstMove() {
    const firstMove = $puzzle.solution.split(" ")[0];
    const originSquare = firstMove.slice(0, 2);
    const destinationSquare = firstMove.slice(2, 4);
    $store.recordings = "";
    $store.taggedSquares = [originSquare, destinationSquare];

    if (isCastles(firstMove)) {
      "e1g1e8g8".includes(firstMove)
        ? ($store.recordings = "0-0")
        : ($store.recordings = "0-0-0");
      castleClone(firstMove);
    } else if (isPromotion(firstMove)) {
      $boardClone[destinationSquare]
        ? ($store.recordings = `${originSquare}x${destinationSquare}=${firstMove
            .slice(4, 5)
            .toUpperCase()})`)
        : ($store.recordings = `${originSquare}-${destinationSquare}=${firstMove
            .slice(4, 5)
            .toUpperCase()}`);
      promoteClone(firstMove);
    } else if (isEnpassant(firstMove)) {
      $store.recordings = `${firstMove.slice(0, 2)}x${firstMove.slice(2, 4)}`;
      enpassantClone(firstMove);
    } else {
      "KQRBNkqrbn".includes($boardClone[originSquare])
        ? ($store.recordings +=
            $boardClone[originSquare].toUpperCase() + originSquare)
        : ($store.recordings += originSquare);
      $boardClone[destinationSquare]
        ? ($store.recordings += "x" + destinationSquare)
        : ($store.recordings += "-" + destinationSquare);
      moveClone(firstMove);
    }
    $puzzle.userSolution += firstMove;
  }

  saveFenData();
  setBoardView();
  setPosition();
  onMount(() => {
    saveFirstMove();
  });
</script>

<div class={boardClasses}>
  {#each $store.flippedBoardView ? $store.flippedSquareArray : $store.squareArray as square (square)}
    <Square {square} {getMoveType} />
  {/each}
</div>

<audio bind:this={$store.moveSound}>
  <source src="/move.mp3" type="audio/mpeg" />
</audio>

<audio bind:this={$store.captureSound}>
  <source src="/capture.mp3" type="audio/mpeg" />
</audio>

<style>
</style>
 
