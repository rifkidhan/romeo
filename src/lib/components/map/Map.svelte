<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import type { Map } from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';

	let map: Map;
	let container: any;

	const initializeMap = () => {
		map = new maplibregl.Map({
			container,
			style: {
				version: 8,
				name: 'Blank',
				center: [0, 0],
				zoom: 0,
				sources: {
					'raster-tiles': {
						type: 'raster',
						tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
						tileSize: 256,
						minzoom: 0,
						maxzoom: 19
					}
				},
				layers: [
					{
						id: 'background',
						type: 'background',
						paint: {
							'background-color': '#e0dfdf'
						}
					},
					{
						id: 'simple-tiles',
						type: 'raster',
						source: 'raster-tiles'
					}
				]
			},
			center: [106.8089191, -6.3148227],
			zoom: 15.99,
			pitch: 10,
			bearing: 20,
			antialias: true
		});
	};

	onMount(() => {
		initializeMap();
	});

	$: if (map) {
		setContext('maplibre-map', map);
		map.addControl(
			new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			})
		);
	}

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<div bind:this={container} class="map" />
{#if map}
	<slot />
{/if}

<style lang="postcss">
	.map {
		@apply h-full w-full;
	}
</style>
