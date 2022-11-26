<script lang="ts">
	import { puzzle } from '$lib/puzzle';
	import { store } from '$lib/store';
	import { boardClone } from '$lib/boardClone';

	$: display = !$store.whitePromotes && !$store.blackPromotes ? 'hidden' : 'flex';

	const styles = {
		backdrop: 'fixed top-0 left-0 w-screen h-screen justify-center items-center bg-gray-100/50 p-4',
		promotionPiecesContainer: 'bg-gray-200 flex w-[26rem] overflow-hidden rounded-lg p-4',
		pieceContainer: 'flex-1 text-center flex justify-center cursor-pointer',
		imageSize: 'w-12 h-12'
	};

	let { backdrop, promotionPiecesContainer, pieceContainer, imageSize } = styles;

	function promoteToWhiteQueen() {
		$puzzle.userSolution += 'q';
		$store.recordings += '=Q';
		$boardClone[$store.promotionSquare] = 'Q';
		$store.whitePromotes = false;
	}

	function promoteToWhiteRook() {
		$puzzle.userSolution += 'r';
		$store.recordings += '=R';
		$boardClone[$store.promotionSquare] = 'R';
		$store.whitePromotes = false;
	}

	function promoteToWhiteBishop() {
		$puzzle.userSolution += 'b';
		$store.recordings += '=B';
		$boardClone[$store.promotionSquare] = 'B';
		$store.whitePromotes = false;
	}

	function promoteToWhiteKnight() {
		$puzzle.userSolution += 'n';
		$store.recordings += '=N';
		$boardClone[$store.promotionSquare] = 'N';
		$store.whitePromotes = false;
	}

	function promoteToBlackQueen() {
		$puzzle.userSolution += 'q';
		$store.recordings += '=Q';
		$boardClone[$store.promotionSquare] = 'q';
		$store.blackPromotes = false;
	}

	function promoteToBlackRook() {
		$puzzle.userSolution += 'r';
		$store.recordings += '=R';
		$boardClone[$store.promotionSquare] = 'r';
		$store.blackPromotes = false;
	}

	function promoteToBlackBishop() {
		$puzzle.userSolution += 'b';
		$store.recordings += '=B';
		$boardClone[$store.promotionSquare] = 'b';
		$store.blackPromotes = false;
	}

	function promoteToBlackKnight() {
		$puzzle.userSolution += 'n';
		$store.recordings += '=N';
		$boardClone[$store.promotionSquare] = 'n';
		$store.blackPromotes = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class={`${backdrop} ${display}`}>
	{#if $store.whitePromotes}
		<div class={promotionPiecesContainer}>
			<div class={`${pieceContainer} rounded-l-lg`} on:click={promoteToWhiteQueen}>
				<img src="/whiteQueen.png" alt="White Queen" class={imageSize} draggable="false" />
			</div>
			<div class={pieceContainer} on:click={promoteToWhiteRook}>
				<img src="/whiteRook.png" alt="White Rook" class={imageSize} draggable="false" />
			</div>
			<div class={pieceContainer} on:click={promoteToWhiteBishop}>
				<img src="/whiteBishop.png" alt="White Bishop" class={imageSize} draggable="false" />
			</div>
			<div class={`${pieceContainer} rounded-r-lg`} on:click={promoteToWhiteKnight}>
				<img src="/whiteKnight.png" alt="White Knight" class={imageSize} draggable="false" />
			</div>
		</div>
	{/if}

	{#if $store.blackPromotes}
		<div class={promotionPiecesContainer}>
			<div class={`${pieceContainer} rounded-l-lg`} on:click={promoteToBlackQueen}>
				<img src="/blackQueen.png" alt="Black Queen" class={imageSize} draggable="false" />
			</div>
			<div class={pieceContainer} on:click={promoteToBlackRook}>
				<img src="/blackRook.png" alt="Black Rook" class={imageSize} draggable="false" />
			</div>
			<div class={pieceContainer} on:click={promoteToBlackBishop}>
				<img src="/blackBishop.png" alt="Black Bishop" class={imageSize} draggable="false" />
			</div>
			<div class={`${pieceContainer} rounded-r-lg`} on:click={promoteToBlackKnight}>
				<img src="/blackKnight.png" alt="Black Knight" class={imageSize} draggable="false" />
			</div>
		</div>
	{/if}
</main>
