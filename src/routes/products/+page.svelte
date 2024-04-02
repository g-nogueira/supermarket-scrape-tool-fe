<!-- App.svelte -->
<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { debounce } from 'lodash';
	import ProductList from './ProductList.svelte';
	import ProductDetails from './ProductDetails.svelte';
	import Product from '../../models/Product';

	let selectedProduct: Product | null = null;
	let products: Product[] = [];
	let currentPage = 1;
	let titleFilter = '';
	let supermarketFilter = '';
	let minPriceFilter = '';
	let maxPriceFilter = '';
	let sortingOption: 'asc' | 'desc' = 'asc';

	// Debounce the applyFilters function to wait for 300ms after user stops typing
	const applyFiltersDebounced = debounce(() => {
		// Minimum number of characters to trigger the search
		if (titleFilter.length >= 3) {
			currentPage = 1; // Reset page number when filters change
			fetchFilteredProducts();
		}
	}, 300);

	const fetchFilteredProducts = async () => {
		const response = await fetch(
			`http://localhost:5000/api/v1/products/search?page=${currentPage}&itemsPerPage=10&title=${titleFilter}&supermarket=${supermarketFilter}&sorting=${sortingOption}&createdAfter=&createdBefore=&createdAt=`
		);
		products = (await response.json()).map(Product.fromJson);
		console.log(products);
	};

	onMount(fetchFilteredProducts);

	const applyFilters = () => {
		currentPage = 1; // Reset page number when filters change
		applyFiltersDebounced(); // Debounce the function call
	};

	// Function to navigate to the next page
	const nextPage = async () => {
		currentPage++;
		fetchFilteredProducts();
	};

	// Function to navigate to the previous page
	const previousPage = async () => {
		if (currentPage > 1) {
			currentPage--;
			fetchFilteredProducts();
		}
	};
</script>

<main>
	<h1>Product List</h1>
	<div class="filters">
		<input
			type="text"
			placeholder="Search by Product Title"
			bind:value={titleFilter}
			on:input={applyFilters}
		/>
		<input
			type="text"
			placeholder="Filter by Supermarket"
			bind:value={supermarketFilter}
			on:input={applyFilters}
		/>
		<input
			type="number"
			placeholder="Min Price"
			bind:value={minPriceFilter}
			on:input={applyFilters}
		/>
		<input
			type="number"
			placeholder="Max Price"
			bind:value={maxPriceFilter}
			on:input={applyFilters}
		/>
		<select bind:value={sortingOption} on:change={applyFilters}>
			<option value="asc">Oldest First</option>
			<option value="desc">Newest First</option>
		</select>
	</div>

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
