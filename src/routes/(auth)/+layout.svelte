<script lang="ts">
	import { Logo } from '$lib/components/ui';
</script>

<main class="my-10 flex flex-col items-center justify-center gap-10">
	<Logo variant="mark" class="w-32" />
	<slot />
</main>
