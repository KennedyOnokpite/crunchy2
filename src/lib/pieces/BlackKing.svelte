<script lang="ts">
  import { board } from "$lib/board";
  import { store } from "$lib/store";
  export const piece = "k";
  export function getLegalMoves(square:string) {
    //Special moves like castling have not yet been implemented and wouldnt be needed for the basic level
    const blackPieces = "kqrbnp";
    let legalMoves: string[] = [];
    let fileUnicode = [97, 98, 99, 100, 101, 102, 103, 104];
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    let nextSquare;
    let pieceOnNextSquare;
    let rank;
    let unicode;
    const kingMatrix = [
      { unicodeStepSize: 1, rankStepSize: 1 },
      { unicodeStepSize: -1, rankStepSize: 1 },
      { unicodeStepSize: 1, rankStepSize: -1 },
      { unicodeStepSize: -1, rankStepSize: -1 },
      { unicodeStepSize: 0, rankStepSize: 1 },
      { unicodeStepSize: 0, rankStepSize: -1 },
      { unicodeStepSize: 1, rankStepSize: 0 },
      { unicodeStepSize: -1, rankStepSize: 0 },
    ];

    kingMatrix.forEach((element) => {
      rank = Number(square[1]);
      unicode = square[0].charCodeAt(0);
      if (
        fileUnicode.includes((unicode += element.unicodeStepSize)) &&
        ranks.includes((rank += element.rankStepSize))
      ) {
        nextSquare = `${String.fromCharCode(unicode)}${rank}`;
        pieceOnNextSquare = $board[nextSquare].piece;
        if (pieceOnNextSquare) {
          if (pieceOnNextSquare === "c") legalMoves.push(nextSquare);
          else if (blackPieces.includes(pieceOnNextSquare)) {
          } else legalMoves.push(nextSquare);
        } else legalMoves.push(nextSquare);
      }
    });
    return legalMoves;
  }

</script>

<img
  src="/blackKing.png"
  alt="Black King"
  id={piece}
  class="w-full h-full"
  draggable=false
/>
