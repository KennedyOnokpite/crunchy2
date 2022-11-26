<script lang="ts">
  import { board } from "$lib/board";
  import { store } from "$lib/store";
  export const piece = "P";
  export function getLegalMoves(square:string) {
    //Special moves like enpassant and promotion have not yet been implemented and wouldnt be needed for the basic level
    const whitePieces = "KQRBNP";
    let legalMoves: string[] = [];
    let fileUnicode = [97, 98, 99, 100, 101, 102, 103, 104];
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    let nextSquare;
    let pieceOnNextSquare;
    let blockadingPiece;
    let rank;
    let unicode;
    rank = Number(square[1]);
    unicode = square[0].charCodeAt(0);
    if (fileUnicode.includes(unicode) && ranks.includes((rank += 1))) {
      nextSquare = `${String.fromCharCode(unicode)}${rank}`;
      pieceOnNextSquare = $board[nextSquare].piece;
      if (!pieceOnNextSquare) legalMoves.push(nextSquare);
    }
    rank = Number(square[1]);
    unicode = square[0].charCodeAt(0);
    if (
      rank === 2 &&
      fileUnicode.includes(unicode) &&
      ranks.includes((rank += 2))
    ) {
      nextSquare = `${String.fromCharCode(unicode)}${rank}`;
      blockadingPiece =
        $board[`${String.fromCharCode(unicode)}${rank - 1}`].piece;
      pieceOnNextSquare = $board[nextSquare].piece;
      if (!pieceOnNextSquare && !blockadingPiece) legalMoves.push(nextSquare);
    }

    rank = Number(square[1]);
    unicode = square[0].charCodeAt(0);
    if (fileUnicode.includes((unicode += 1)) && ranks.includes((rank += 1))) {
      nextSquare = `${String.fromCharCode(unicode)}${rank}`;
      pieceOnNextSquare = $board[nextSquare].piece;
      if (pieceOnNextSquare && !whitePieces.includes(pieceOnNextSquare))
        legalMoves.push(nextSquare);
    }

    rank = Number(square[1]);
    unicode = square[0].charCodeAt(0);
    if (fileUnicode.includes((unicode -= 1)) && ranks.includes((rank += 1))) {
      nextSquare = `${String.fromCharCode(unicode)}${rank}`;
      pieceOnNextSquare = $board[nextSquare].piece;
      if (pieceOnNextSquare && !whitePieces.includes(pieceOnNextSquare))
        legalMoves.push(nextSquare);
    }
    return legalMoves;
  }
 
</script>

<img
  src="/whitePawn.png"
  alt="White Pawn"
  id={piece}
  class="w-full h-full"
  draggable=false
 
/>
