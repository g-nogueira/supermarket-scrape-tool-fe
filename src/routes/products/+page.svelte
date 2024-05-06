<script>
	import ProductCard from '../../components/ProductCard/ProductCard.svelte';
	import SearchBar from '../../components/SearchBar/SearchBar.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="inline-flex justify-center my-16 w-full">
	<div class="w-3/4">
		<SearchBar />
	</div>
</div>

<section class="flex flex-wrap gap-4 justify-center">
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
</section>
