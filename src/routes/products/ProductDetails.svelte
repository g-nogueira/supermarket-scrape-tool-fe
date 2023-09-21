<!-- ProductDetails.svelte -->
<script lang="ts">
	export let product: { id: number; name: string; price: number };
</script>

<div class="product-details">
	<h2>{product.name}</h2>
	<p>Price: ${product.price.toFixed(2)}</p>
	<!-- Add more product details here -->
</div>

<!-- ProductDetails.svelte -->
<style>
	.product-details {
		border: 1px solid #ddd;
		padding: 20px;
		background-color: #f9f9f9;
	}
</style>
