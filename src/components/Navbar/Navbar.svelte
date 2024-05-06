<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input, } from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
	</NavBrand>
	<div class="flex md:order-2">
		<Button
			color="none"
			data-collapse-toggle="mobile-menu-3"
			aria-controls="mobile-menu-3"
			aria-expanded="false"
			class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
		>
            <i class="fas fa-magnifying-glass" />
		</Button>
		<div class="hidden relative md:block">
			<div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
				<i class="fas fa-magnifying-glass" />
			</div>
			<Input id="search-navbar" class="ps-10" placeholder="Search..." />
		</div>
		<NavHamburger />
	</div>
	<NavUl>
		<NavLi href="/products" active={true}>Home</NavLi>
	</NavUl>
</Navbar>
