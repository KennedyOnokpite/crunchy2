<script lang="ts">
  import { board } from "$lib/board";
  export const piece = "B";
  export function getLegalMoves(square:string) {
    const capturablePieces = "qrbnpc";
    let legalMoves: string[] = [];
    let fileUnicode = [97, 98, 99, 100, 101, 102, 103, 104];
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    let nextSquare;
    let pieceOnNextSquare;
    let rank;
    let unicode;
    const bishopMatrix = [
      { unicodeStepSize: 1, rankStepSize: 1 },
      { unicodeStepSize: -1, rankStepSize: 1 },
      { unicodeStepSize: 1, rankStepSize: -1 },
      { unicodeStepSize: -1, rankStepSize: -1 },
    ];

    bishopMatrix.forEach((element) => {
      rank = Number(square[1]);
      unicode = square[0].charCodeAt(0);
      while (
        fileUnicode.includes((unicode += element.unicodeStepSize)) &&
        ranks.includes((rank += element.rankStepSize))
      ) {
        nextSquare = `${String.fromCharCode(unicode)}${rank}`;
        pieceOnNextSquare = $board[nextSquare].piece;
        if (!pieceOnNextSquare) legalMoves.push(nextSquare);
        else if (capturablePieces.includes(pieceOnNextSquare)) {
          legalMoves.push(nextSquare);
          break;
        } else break;
      }
    });
    return legalMoves;
  }
</script>

<img
  src="/whiteBishop.png"
  alt="White Bishop"
  id={piece}
  class="w-full h-full"
  draggable="false"
/>
