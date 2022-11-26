<script lang="ts">
	export let getMoveType:any;
	export let square: string;
	import { store } from '$lib/store';
	import { puzzle } from '$lib/puzzle';
	import { board } from './board';
	import { boardClone } from '$lib/boardClone';
	import whiteKing from './pieces/WhiteKing.svelte';
	import whiteQueen from './pieces/WhiteQueen.svelte';
	import whiteRook from './pieces/WhiteRook.svelte';
	import whiteBishop from './pieces/WhiteBishop.svelte';
	import whiteKnight from './pieces/WhiteKnight.svelte';
	import whitePawn from './pieces/WhitePawn.svelte';
	import blackKing from './pieces/BlackKing.svelte';
	import blackQueen from './pieces/BlackQueen.svelte';
	import blackRook from './pieces/BlackRook.svelte';
	import blackBishop from './pieces/BlackBishop.svelte';
	import blackKnight from './pieces/BlackKnight.svelte';
	import blackPawn from './pieces/BlackPawn.svelte';

	$: squareColor = $store.lightSquares.includes(square)
		? $store.lightSquareColor
		: $store.darkSquareColor;
	$: corner = $store.flippedBoardView
		? $board[square].corner?.flippedView
		: $board[square].corner?.defaultView;
	$: tag = $store.taggedSquares.includes(square) ? 'sepia' : '';

	$: squareClass = `w-[3rem] h-[3rem] flex justify-center items-center cursor-pointer ${squareColor} ${corner} ${tag}`;

	const pieces: { [key: string]: any } = {
		K: whiteKing,
		Q: whiteQueen,
		R: whiteRook,
		B: whiteBishop,
		N: whiteKnight,
		P: whitePawn,
		k: blackKing,
		q: blackQueen,
		r: blackRook,
		b: blackBishop,
		n: blackKnight,
		p: blackPawn
	};

	let piece: any;

	function handleClick() {
		if ($store.taggedSquares.length === 1) {
			$store.taggedSquares.push(square);
			const move = $store.taggedSquares.join('');
			getMoveType(move);
			$puzzle.userSolution += move.slice(2, 4);
			return;
		}
		if ($boardClone[square]) {
			$store.taggedSquares = [square];
			'KQRBNkqrbn'.includes($boardClone[square])
				? ($store.recordings += ' ' + $boardClone[square].toUpperCase() + square)
				: ($store.recordings += ' ' + square);
			$puzzle.userSolution += ' ' + square;
		}
	}

	function showLegalMoves() {
		if (piece) console.log(piece.getLegalMoves());
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id={square} class={squareClass} on:click={handleClick}>
	<svelte:component this={pieces[$board[square].piece]} bind:this={piece} />
</div>
