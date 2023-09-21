<!-- ProductList.svelte -->
<script lang="ts">
	export let products: Array<{ id: number; name: string; price: number }>;
</script>

{#each products as product (product.id)}
	<div class="product">
		<!-- Display product information here -->
		<h3>{product.name}</h3>
		<p>Price: ${product.price.toFixed(2)}</p>
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
