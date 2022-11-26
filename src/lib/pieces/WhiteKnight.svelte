<script lang="ts">
  import { board } from "$lib/board";
  export const piece = "N";
  export function getLegalMoves(square:string) {
    const capturablePieces = "qrbnpc";
    let legalMoves: string[] = [];
    let fileUnicode = [97, 98, 99, 100, 101, 102, 103, 104];
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    let nextSquare;
    let pieceOnNextSquare;
    let rank;
    let unicode;
    const knightMatrix = [
      { unicodeStepSize: 1, rankStepSize: 2 },
      { unicodeStepSize: 2, rankStepSize: 1 },
      { unicodeStepSize: 2, rankStepSize: -1 },
      { unicodeStepSize: 1, rankStepSize: -2 },
      { unicodeStepSize: -1, rankStepSize: -2 },
      { unicodeStepSize: -2, rankStepSize: -1 },
      { unicodeStepSize: -2, rankStepSize: 1 },
      { unicodeStepSize: -1, rankStepSize: 2 },
    ];

    knightMatrix.forEach((element) => {
      rank = Number(square[1]);
      unicode = square[0].charCodeAt(0);
      if (
        fileUnicode.includes((unicode += element.unicodeStepSize)) &&
        ranks.includes((rank += element.rankStepSize))
      ) {
        nextSquare = `${String.fromCharCode(unicode)}${rank}`;
        pieceOnNextSquare = $board[nextSquare].piece;
        if (!pieceOnNextSquare || capturablePieces.includes(pieceOnNextSquare))
          legalMoves.push(nextSquare);
      }
    });
    return legalMoves;
  }
</script>

<img
  src="/whiteKnight.png"
  alt="White Knight"
  id={piece}
  class="w-full h-full"
  draggable="false"
/>
