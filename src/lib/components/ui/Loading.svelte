<script lang="ts">
	export let type: 'dots' | 'spinner' = 'dots';
</script>

{#if type === 'dots'}
	<span class="root">
		<span class="dot" />
		<span class="dot" />
		<span class="dot" />
	</span>
{:else}
	<div class="loaderRoot">
		<div class="loader">
			<div />
		</div>
	</div>
{/if}

<style lang="postcss">
	.root {
		@apply inline-flex items-center text-center leading-7;
		& > .dot {
			@apply mx-1 h-2 w-2 rounded-full bg-secondary;
			animation-name: blink;
			animation-duration: 1.4s;
			animation-iteration-count: infinite;
			animation-fill-mode: both;
			&:nth-of-type(2) {
				animation-delay: 0.2s;
			}
			&:nth-of-type(3) {
				animation-delay: 0.4s;
			}
		}
	}

	@keyframes blink {
		0% {
			opacity: 0.2;
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 0.2;
		}
	}

	/* spinner */
	.loaderRoot {
		@apply flex items-center justify-center;
	}
	.loader {
		@apply relative box-border block h-10 w-10 md:h-14 md:w-14;
		& > div {
			@apply float-none inline-block h-full w-full overflow-hidden rounded-xl
			border-2 border-secondary bg-transparent;
			animation: square-loader 2s infinite ease;
			&:after {
				@apply inline-block w-full bg-red align-top content-[''];
				animation: square-loader-inner 2s infinite ease-in;
			}
		}
	}

	@keyframes square-loader {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(180deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes square-loader-inner {
		0% {
			height: 0;
		}
		25% {
			height: 0;
		}
		50% {
			height: 100%;
		}
		75% {
			height: 100%;
		}
		100% {
			height: 0;
		}
	}
</style>
