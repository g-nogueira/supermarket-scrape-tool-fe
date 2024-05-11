<script lang="ts">
	import { Badge, Button, Card, Rating } from 'flowbite-svelte';
	import { type ProductListItem } from '../../types/ProductListItem';
	import { sourceName } from '../../types/SourceName';
	import { Gallery } from 'flowbite-svelte';
	import type { ProductDetail } from '../../types/ProductDetail';

	export let images: string[];
    export let productName: string;

	const _images = images.map((image) => {
		return { alt: 'Image of ' + productName, src: image };
	});
</script>

<Gallery class="gap-4">
	<img
		src={images[0]}
		alt={'Image of ' + productName}
		class="h-auto max-w-full rounded-lg"
	/>
	<Gallery class="grid-cols-5" items={_images} />
</Gallery>
