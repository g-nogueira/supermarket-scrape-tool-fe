<script lang="ts">
	import { Badge, Button, Card, Rating } from 'flowbite-svelte';
	import { type ProductListItem } from '../../types/ProductListItem';
	import { sourceName } from '../../types/SourceName';

	export let product: ProductListItem;
</script>

<Card padding="none" class="flex-none">
	<a href="/product/{product.id}">
		<img class="rounded-t-lg p-8" src={product.images[0]} alt="product 1" />
	</a>
	<div class="px-5 pb-5">
		<a href="/product/{product.id}">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{product.name}
			</h5>
		</a>
		{#each product.sources as source}
			<Badge slot="text" color={sourceName.toColor(source)}>{sourceName.toString(source)}</Badge>
		{/each}
		<div class="flex items-center justify-between">
			<span class="text-3xl font-bold text-gray-900 dark:text-white">
				{#if product.priceRange.length === 2}
					{product.priceRange[0]} - {product.priceRange[1]}
				{:else if product.priceRange.length === 1}
					{product.priceRange[0]}
				{:else}
					-
				{/if}
			</span>
		</div>
	</div>
</Card>
