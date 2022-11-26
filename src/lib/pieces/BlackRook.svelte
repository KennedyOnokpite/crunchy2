<script lang="ts">
  import { board } from "$lib/board";
  export const piece = "r";
  export function getLegalMoves(square:string) {
    const capturablePieces = "QRBNPc";
    let legalMoves: string[] = [];
    let fileUnicode = [97, 98, 99, 100, 101, 102, 103, 104];
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    let nextSquare;
    let pieceOnNextSquare;
    let rank;
    let unicode;
    const rookMatrix = [
      { unicodeStepSize: 0, rankStepSize: 1 },
      { unicodeStepSize: 0, rankStepSize: -1 },
      { unicodeStepSize: 1, rankStepSize: 0 },
      { unicodeStepSize: -1, rankStepSize: 0 },
    ];

    rookMatrix.forEach((element) => {
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
  src="/blackRook.png"
  alt="Black Rook"
  id={piece}
  class="w-full h-full"
  draggable="false"
/>
