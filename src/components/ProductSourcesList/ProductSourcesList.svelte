<script lang="ts">
	import { Badge, Button, Card, Rating } from 'flowbite-svelte';
	import { type ProductListItem } from '../../types/ProductListItem';
	import { sourceName } from '../../types/SourceName';
	import { Gallery } from 'flowbite-svelte';

	export let product: ProductListItem;

	const images = product.images.map((image) => {
		return { alt: 'Image of ' + product.name, src: image };
	});
</script>

<Gallery class="gap-4">
	<img
		src={product.images[0]}
		alt={'Image of ' + product.name}
		class="h-auto max-w-full rounded-lg"
	/>
	<Gallery class="grid-cols-5" items={images} />
</Gallery>
