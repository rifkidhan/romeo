<script lang="ts">
	export let name: string;
	export let id: string | undefined = undefined;
</script>

<textarea {name} id={id ? id : name} on:change on:input on:blur {...$$restProps} />

<style lang="postcss">
	textarea {
		@apply mx-auto min-h-[10rem] w-full whitespace-pre-wrap break-words rounded-lg border-2 border-secondary p-5 focus:outline-none;
	}
</style>
