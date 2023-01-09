<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import Gecoder from '$lib/components/map/geocontrol/Gecoder.svelte';
</script>

<div>
	<h1>About Page</h1>

	<div class="container mx-auto">
		<div class="h-screen w-full overflow-hidden rounded-xl border-2 border-secondary">
			<Map>
				<Gecoder />
			</Map>
		</div>
	</div>
</div>
