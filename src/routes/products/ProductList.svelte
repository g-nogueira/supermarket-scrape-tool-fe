<!-- ProductList.svelte -->
<script lang="ts">
	export let products: Array<{ id: number; name: string; price: number; priceUnit: string; source: string; imageUrl: string}>;
</script>

{#each products as product (product.id)}
	<div class="product">
		<!-- Display product information here -->
		<img src="{product.imageUrl}" width="500px" alt="Image of {product.name}"/>
		<h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
		<p>Price: ${product.price.toFixed(2)} {product.priceUnit} ({product.source})</p>
		<!-- Add more details as needed -->
	</div>
{/each}

<!-- ProductList.svelte -->
<style>
	.product {
		border: 1px solid #ddd;
		padding: 10px;
		margin: 10px;
		background-color: #f9f9f9;
	}
</style>
