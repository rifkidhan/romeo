<script lang="ts">
	import cn from 'clsx';
	import { Icons } from '$lib/components/ui';

	export let name: string;
	export let id: string | undefined = undefined;
	export let value = '';
	export let files: FileList | undefined = undefined;

	let input: HTMLInputElement;

	const keydown = (e: KeyboardEvent) => {
		if ([' ', 'Enter'].includes(e.key)) {
			e.preventDefault();
			input.click();
		}
	};

	$: className = cn('dropzone', $$props.class, $$slots.preview && files ? 'preview' : 'h-64');
</script>

<label
	class={className}
	tabIndex="0"
	on:keydown={keydown}
	on:focus
	on:blur
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:dragenter
	on:dragleave
	on:dragover
	on:drop
>
	{#if $$slots.preview && files}
		<slot name="preview" />
	{:else}
		<slot name="icon">
			<Icons name="upload-cloud" class="w-8 stroke-2" />
		</slot>
		<slot>
			<p>Click to upload or drag and drop</p>
		</slot>
	{/if}

	<input
		{name}
		id={id ? id : name}
		{...$$restProps}
		bind:value
		bind:files
		bind:this={input}
		type="file"
		class="hidden"
		on:change
		on:click
	/>
</label>

<style lang="postcss">
	.dropzone {
		@apply flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-secondary bg-accent-1 hover:bg-accent-2;
	}
	.preview {
		@apply h-auto overflow-hidden;
	}
</style>
