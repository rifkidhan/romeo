<script lang="ts">
	import cn from 'clsx';
	export let name: string;

	$: className = cn('w-6 stroke-2', $$props.class);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
>
	{#if name === 'bold'}
		<path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
		<path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
	{:else if name === 'italic'}
		<line x1="11" y1="5" x2="17" y2="5" />
		<line x1="7" y1="19" x2="13" y2="19" />
		<line x1="14" y1="5" x2="10" y2="19" />
	{:else if name === 'underline'}
		<path d="M7 5v5a5 5 0 0 0 10 0v-5" />
		<path d="M5 19h14" />
	{:else if name === 'strike'}
		<line x1="5" y1="12" x2="19" y2="12" />
		<path
			d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5"
		/>
	{:else if name === 'link'}
		<path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
		<path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
	{:else if name === 'quote'}
		<path d="M6 15h15" />
		<path d="M21 19h-15" />
		<path d="M15 11h6" />
		<path d="M21 7h-6" />
		<path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
		<path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
	{:else if name === 'codeInline'}
		<polyline points="7 8 3 12 7 16" />
		<polyline points="17 8 21 12 17 16" />
		<line x1="14" y1="4" x2="10" y2="20" />
	{:else if name === 'codeBlock'}
		<path d="M14 3v4a1 1 0 0 0 1 1h4" />
		<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
		<path d="M10 13l-1 2l1 2" />
		<path d="M14 13l1 2l-1 2" />
	{:else if name === 'check'}
		<path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
		<path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
		<path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
		<line x1="11" y1="6" x2="20" y2="6" />
		<line x1="11" y1="12" x2="20" y2="12" />
		<line x1="11" y1="18" x2="20" y2="18" />
	{:else if name === 'number'}
		<path d="M11 6h9" />
		<path d="M11 12h9" />
		<path d="M12 18h8" />
		<path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
		<path d="M6 10v-6l-2 2" />
	{:else if name === 'bullet'}
		<line x1="9" y1="6" x2="20" y2="6" />
		<line x1="9" y1="12" x2="20" y2="12" />
		<line x1="9" y1="18" x2="20" y2="18" />
		<line x1="5" y1="6" x2="5" y2="6.01" />
		<line x1="5" y1="12" x2="5" y2="12.01" />
		<line x1="5" y1="18" x2="5" y2="18.01" />
	{:else if name === 'image'}
		<line x1="15" y1="8" x2="15.01" y2="8" />
		<rect x="4" y="4" width="16" height="16" rx="3" />
		<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
		<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
	{:else if name === 'paragraph'}
		<path d="M7 20v-16h5.5a4 4 0 0 1 0 9h-5.5" />
	{:else if name === 'h2'}
		<path d="M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0" />
		<path d="M4 6v12" />
		<path d="M12 6v12" />
		<path d="M11 18h2" />
		<path d="M3 18h2" />
		<path d="M4 12h8" />
		<path d="M3 6h2" />
		<path d="M11 6h2" />
	{:else if name === 'h3'}
		<path d="M19 14a2 2 0 1 0 -2 -2" />
		<path d="M17 16a2 2 0 1 0 2 -2" />
		<path d="M4 6v12" />
		<path d="M12 6v12" />
		<path d="M11 18h2" />
		<path d="M3 18h2" />
		<path d="M4 12h8" />
		<path d="M3 6h2" />
		<path d="M11 6h2" />
	{:else if name === 'h4'}
		<path d="M20 18v-8l-4 6h5" />
		<path d="M4 6v12" />
		<path d="M12 6v12" />
		<path d="M11 18h2" />
		<path d="M3 18h2" />
		<path d="M4 12h8" />
		<path d="M3 6h2" />
		<path d="M11 6h2" />
	{:else if name === 'h5'}
		<path d="M17 18h2a2 2 0 1 0 0 -4h-2v-4h4" />
		<path d="M4 6v12" />
		<path d="M12 6v12" />
		<path d="M11 18h2" />
		<path d="M3 18h2" />
		<path d="M4 12h8" />
		<path d="M3 6h2" />
		<path d="M11 6h2" />
	{:else if name === 'h6'}
		<circle transform="rotate(180 19 16)" cx="19" cy="16" r="2" />
		<path d="M21 12a2 2 0 1 0 -4 0v4" />
		<path d="M4 6v12" />
		<path d="M12 6v12" />
		<path d="M11 18h2" />
		<path d="M3 18h2" />
		<path d="M4 12h8" />
		<path d="M3 6h2" />
		<path d="M11 6h2" />
	{:else if name === 'separator'}
		<line x1="3" y1="12" x2="3" y2="12.01" />
		<line x1="7" y1="12" x2="17" y2="12" />
		<line x1="21" y1="12" x2="21" y2="12.01" />
	{:else if name === 'undo'}
		<path d="M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4" />
	{:else if name === 'redo'}
		<path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" />
	{:else if name === 'subscript'}
		<path d="M5 7l8 10m-8 0l8 -10" />
		<path d="M21 20h-4l3.5 -4a1.73 1.73 0 0 0 -3.5 -2" />
	{:else if name === 'superscript'}
		<path d="M5 7l8 10m-8 0l8 -10" />
		<path d="M21 11h-4l3.5 -4a1.73 1.73 0 0 0 -3.5 -2" />
	{/if}
</svg>
