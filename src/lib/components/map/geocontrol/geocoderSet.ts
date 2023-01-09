/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import type { IControl } from 'maplibre-gl';
import maplibregl from 'maplibre-gl';

export const geoApi = {
	forwardGeocode: async (config: any) => {
		const features: Array<any> = [];
		try {
			const request =
				'https://nominatim.openstreetmap.org/search?q=' +
				config.query +
				'&format=geojson&polygon_geojson=1&addressdetails=1';
			const response = await fetch(request);
			const geojson = await response.json();

			for (const feature of geojson.features) {
				const center = [
					feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
					feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
				];
				const point = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: center
					},
					place_name: feature.properties.display_name,
					properties: feature.properties,
					text: feature.properties.display_name,
					place_type: ['place'],
					center: center
				};
				features.push(point);
			}
		} catch (e) {
			console.error(`Failed to forwardGeocode with error: ${e}`);
		}
		return {
			features: features
		};
	},
	getSuggestions: async (config: any) => {
		const suggestions: Array<any> = [];
		try {
			const request =
				'https://nominatim.openstreetmap.org/search?q=' +
				config.query +
				'&format=geojson&polygon_geojson=1&addressdetails=1';
			const response = await fetch(request);
			const geojson = await response.json();
			for (const feature of geojson.features) {
				const center = [
					feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
					feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
				];
				const point = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: center
					},
					place_name: feature.properties.display_name,
					properties: feature.properties,
					text: feature.properties.display_name,
					place_type: ['place'],
					center: center
				};

				suggestions.push(point);
			}
		} catch (e) {
			console.error(`Failed to suggest with error: ${e}`);
		}

		return {
			suggestions
		};
	}
};

export function createMapGeocoder(options?: any): IControl {
	return new MaplibreGeocoder(geoApi, {
		maplibregl: maplibregl,
		showResultsWhileTyping: true,
		...options
	});
}
