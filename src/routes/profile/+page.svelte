<script lang="ts">
	// import type { PageData, ActionData } from './$types';
	// export let data: PageData;
	export let data: any;
	const { username, puzzleLevel, puzzlePieceCount, totalNumberOfPuzzles } = data.userProfile.data;

	const styles = {
		page: 'w-screen h-screen bg-slate-500 flex justify-center items-center text-slate-900',
		entry: 'bg-blue-500 text-white p-4 m-1'
	};
	let { page, entry } = styles;
</script>

<div class={page}>
	<div>
		<div class={entry}>{`Username: ${username}`}</div>
		<div class={entry}>{`Puzzle Level: ${puzzleLevel}`}</div>
		<div class={entry}>{`Puzzle Piece Count: ${puzzlePieceCount}`}</div>
		<div class={entry}>{`Total Puzzles: ${totalNumberOfPuzzles}`}</div>

		<form method="POST" action="?/logout">
			<button class="bg-red-500 p-4 cursor-pointer" type="submit">Log out</button>
		</form>
	</div>
</div>
