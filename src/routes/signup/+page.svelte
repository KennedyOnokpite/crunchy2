<script lang="ts">
	// import type { PageData, ActionData } from './$types';
	import Visible from '$lib/Visible.svelte';
	import Invisible from '$lib/Invisible.svelte';
	// export let data: PageData;
	// export let form: ActionData;
	
	const styles = {
		page: 'w-screen h-screen bg-slate-100 flex justify-center items-center text-slate-900',
		formContainer: 'bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-xl',
		formElement: 'flex flex-col gap-4',
		formHeader: 'p-4 text-center text-2xl',
		formInputContainer: 'flex flex-col gap-1',
		formInput:
			'p-2 border-none outline-none rounded shadow placeholder:italic placeholder:text-slate-400 w-full',
		formButton: ' bg-blue-500 p-2 rounded outline-none cursor-pointer text-white',
		formFooter: 'text-center'
	};
	const shadowColor = 'shadow-red-300'; // for form validation
	let {
		page,
		formElement,
		formInput,
		formInputContainer,
		formContainer,
		formHeader,
		formFooter,
		formButton
	} = styles;

	let passwordVisibility = false;

	$: password = passwordVisibility ? 'text' : 'password';

	function toggleVisibility() {
		passwordVisibility = !passwordVisibility;
	}
</script>

<div class={page}>
	<div class={formContainer}>
		<form class={formElement} method="POST" action="?/signup">
			<div class={formHeader}>Create an account</div>
			<div class={formInputContainer}>
				<label for="username">Username</label>
				<input type="text" name="username" id="username" placeholder="johndoe" class={formInput} />
				<div class="invisible">Feedback</div>
			</div>
			<div class={formInputContainer}>
				<label for="password">Password</label>
				<div class="flex -space-x-8">
					<input
						type={password}
						name="password"
						id="password"
						placeholder="****"
						class={formInput}
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="flex justify-center items-center" on:click={toggleVisibility}>
						{#if !passwordVisibility}
							<Visible />
						{:else}
							<Invisible />
						{/if}
					</div>
				</div>

				<div class="invisible">Feedback</div>
			</div>

			<button type="submit" class={formButton}>Signup</button>
			<div class={formFooter}>
				Already have an account? <a class="text-blue-500 cursor-pointer" href="/login">Login</a>
			</div>
		</form>
	</div>
</div>
