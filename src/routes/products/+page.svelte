<!-- App.svelte -->
<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import ProductList from './ProductList.svelte';
	import ProductDetails from './ProductDetails.svelte';

	let products: Array<{ id: number; name: string; price: number }> = []; // Initialize with product data fetched from API
	let selectedProduct: { id: number; name: string; price: number } | null = null; // Initialize with a selected product
	let currentPage = 1; // Track the current page

	// Function to fetch products based on the page number
	const fetchProducts = async (page: number) => {
		const response = await fetch(`http://localhost:5000/api/v1/products/?page=${page}&itemsPerPage=10`);
		return response.json();
	};

	// Fetch product data from your API using onMount or any suitable method
	onMount(async () => {
		products = await fetchProducts(currentPage);
	});

	// // Update product data when currentPage changes
	// afterUpdate(() => {
	// 	fetchProducts(currentPage).then((newProducts) => {
	// 		products = newProducts;
	// 	});
	// });

	// Function to navigate to the next page
	const nextPage = async () => {
		currentPage++;
		products = await fetchProducts(currentPage);
	};

	// Function to navigate to the previous page
	const previousPage = async() => {
		if (currentPage > 1) {
			currentPage--;
			products = await fetchProducts(currentPage);
		}
	};
</script>

<main>
	<h1>Product List</h1>
	<ProductList {products} />

	<div class="pagination">
		<button on:click={previousPage}>Previous</button>
		<span>Page {currentPage}</span>
		<button on:click={nextPage}>Next</button>
	</div>

	<h1>Product Details</h1>
	{#if selectedProduct}
		<ProductDetails {selectedProduct} />
	{/if}
</main>
