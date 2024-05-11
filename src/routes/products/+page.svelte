<script lang="ts">
	import { onMount } from 'svelte';
	import { pipe } from 'fp-ts/lib/function';
	import * as Either from "fp-ts/lib/Either";
	import { sequence } from 'fp-ts/lib/Array';
	import { productListItem, type ProductListItem } from '../../types/ProductListItem';
	import { getProductsPaginated } from '../../clients/ProductsClient';
	import type { ProductDto } from '../../clients/ProductDto';
	import SearchBar from '../../components/SearchBar/SearchBar.svelte';
	import ProductCard from '../../components/ProductCard/ProductCard.svelte';

	let products: Either.Either<string, ProductListItem[]> = Either.left("Loading...");

	onMount(async () => {
		const result = await getProductsPaginated(1, 30);
		products = pipe(
			result,
			Either.flatMap((productDtos: ProductDto[]) =>
				sequence(Either.Applicative)(productDtos.map(productListItem.ofJson))
			)
		);
	});
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="my-16 inline-flex w-full justify-center">
	<div class="w-3/4">
		<SearchBar />
	</div>
</div>

<section class="flex flex-wrap justify-center gap-4">
	{#if Either.isLeft(products)}
		<p class="text-red-500">{products.left}</p>
	{:else}
		{#each products.right as product}
			<ProductCard {product} />
		{/each}
	{/if}
</section>
