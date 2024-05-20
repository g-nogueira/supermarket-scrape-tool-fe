<script lang="ts">
	import ProductDetailThumbnail from '../../../components/ProductDetailThumbnail/ProductDetailThumbnail.svelte';
	import { getProductById, getProductsPaginated } from '../../../clients/ProductsClient';
	import { onMount } from 'svelte';
	import { pipe } from 'fp-ts/lib/function';
	import * as Either from 'fp-ts/lib/Either';
	import type { ProductDto, SourceDto } from '../../../clients/ProductDto';
	import { page } from '$app/stores';
	import { productDetail, type ProductDetail } from '../../../types/ProductDetail';
	import ProductSourcesTable from '../../../components/ProductSourcesTable/ProductSourcesTable.svelte';
	import PriceHistoryChart from '../../../components/PriceHistoryChart/PriceHistoryChart.svelte';

	let product: Either.Either<string, ProductDetail> = Either.left('Loading...');
	let productImages: Either.Either<string, string[]> = Either.left('Loading...');
	let productId = $page.params.productId;
	console.log($page);

	onMount(async () => {
		let productResult = await getProductById(productId);
		product = pipe(productResult, Either.flatMap(productDetail.ofDto));

		productImages = pipe(
			productResult,
			Either.map((productDto: ProductDto) => productDto.sources),
			Either.map((sources: SourceDto[]) => sources.map((source) => source.productImageUrl))
		);
	});
</script>

<svelte:head>
	<title>Product Detail</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section class="flex flex-col justify-center gap-4">
	{#if Either.isLeft(product)}
		<p class="text-red-500">{product.left}</p>
	{:else}
		<section class="inline-flex flex-nowrap justify-between">
			<section>
				{#if Either.isLeft(productImages)}
					<p class="text-red-500">{productImages.left}</p>
				{:else}
					<ProductDetailThumbnail images={productImages.right} productName={product.right.name} />
				{/if}
			</section>
			<section class="w-full">
				<ProductSourcesTable product={product.right}></ProductSourcesTable>
			</section>
		</section>
		<section class="w-full">
			<PriceHistoryChart priceHistory={product.right.priceHistory}></PriceHistoryChart>
		</section>
	{/if}
</section>
