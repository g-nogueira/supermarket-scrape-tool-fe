<script lang="ts">
	import { Badge, Button, Card, Rating, Gallery } from 'flowbite-svelte';
	import type { ProductListItem } from '../../types/ProductListItem';
	import { sourceName } from '../../types/SourceName';
	import type { ProductDetail } from '../../types/ProductDetail';

	export let images: string[];
	export let productName: string;

	// State to hold the currently displayed main image URL
	let mainImage = images[0];

	const _images = images.map((image) => {
		return { alt: 'Image of ' + productName, src: image };
	});

	// Function to update the main image
	function selectImage(image: string) {
		mainImage = image;
	}
</script>


<Gallery class="gap-4">
	<img src={mainImage} alt={'Image of ' + productName} class="h-auto max-w-80 rounded-lg" />

	<div class="grid grid-cols-5" style="gap: inherit;">
		{#each [..._images] as image, index}
			<button on:click={() => selectImage(image.src)} class="relative">
				<img src={image.src} alt={image.alt} class="w-24 cursor-pointer rounded-lg" />
				{#if mainImage !== image.src}
					<div class="overlay"></div>
				{/if}
			</button>
		{/each}
	</div>
</Gallery>

<style>
	button {
		position: relative;
	}

	button:hover img,
	button:focus img {
		border: 2px solid rgb(84, 84, 253);
		border-radius: 8px;
	}

	button:active img {
		border: 2px solid rgb(241, 94, 94);
	}

	.overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.3);
		opacity: 0;
		transition: opacity 0.3s;
	}

	button:hover .overlay {
		opacity: 1;
	}
</style>
