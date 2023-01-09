<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
	import type { Map } from 'maplibre-gl';
	import { createMapGeocoder } from './geocoderSet';

	const map = getContext<Map>('maplibre-map');

	let geocoder: any;

	onMount(() => {
		geocoder = createMapGeocoder();
		map.addControl(geocoder);
	});
</script>
