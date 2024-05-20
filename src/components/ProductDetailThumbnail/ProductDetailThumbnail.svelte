<script lang="ts">
	import { Gallery } from 'flowbite-svelte';

	export let images: string[];
	export let productName: string;

	let mainImage = images[0];

	const _images = images.map((image) => ({
		alt: 'Image of ' + productName,
		src: image
	}));

	function selectImage(image: string) {
		mainImage = image;
	}

	function openLightbox(imageUrl : string) {
		// Implementation for opening the image in a lightbox
		// You can use a library like Lightbox.js or a custom modal
	}
</script>

<Gallery class="gap-4">
	<button on:click={() => openLightbox(mainImage)} class="w-80">
		<img
			src={mainImage}
			alt={`Image of ${productName}`}
			class="h-auto max-w-full transform cursor-pointer rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
		/>
	</button>

	<div class="mt-4 grid grid-cols-5 gap-2 md:gap-4">
		{#each _images as image}
			<button
				on:click={() => selectImage(image.src)}
				class="relative focus:outline-none"
				aria-label={`Select ${image.alt}`}
			>
				<img
					src={image.src}
					alt={image.alt}
					class="w-24 transform cursor-pointer rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
				/>
				{#if mainImage !== image.src}
					<div
						class="absolute inset-0 rounded-lg bg-black bg-opacity-30 opacity-0 transition-opacity duration-300"
					></div>
				{/if}
			</button>
		{/each}
	</div>
</Gallery>

<style>
	button:hover img,
	button:focus img {
		border: 2px solid rgb(84, 84, 253);
		border-radius: 8px;
	}

	button:active img {
		border: 2px solid rgb(241, 94, 94);
	}
</style>
