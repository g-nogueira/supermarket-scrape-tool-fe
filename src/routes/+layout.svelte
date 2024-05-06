<script>
	import Navbar from '../components/Navbar/Navbar.svelte';
	import './styles.css';
	import '@fortawesome/fontawesome-free/css/all.min.css'
</script>

<div class="app">
	<Navbar />

	<main>
		<slot />
	</main>

	<footer>
		<p>Developed by Gustavo Nogueira @ <a href="https://github.com/g-nogueira/supermarket-scrape-tool-fe">github.com/g-nogueira</a>.</p>
	</footer>
</div>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
