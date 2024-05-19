<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHeadCell
	} from 'flowbite-svelte';

	import type { ProductDetail, ProductPriceHistory } from '../../types/ProductDetail';
	import { map, reduce } from 'fp-ts/Array';
	import { pipe } from 'fp-ts/function';
	import { type Ord, max } from 'fp-ts/Ord';
	import { contramap } from 'fp-ts/Ord';
	import { sourceName } from '../../types/SourceName';

	type PriceHistoryBySourceMatrix = { [key: string]: ProductPriceHistory };
	type PriceHistoryBySource = {
		name: string;
		priceString: string;
		dateString: string;
	} & ProductPriceHistory;

	export let product: ProductDetail;

	let currentLanguage = navigator.language;

	const dateOrd: Ord<Date> = {
		equals: (x, y) => x.getTime() === y.getTime(),
		compare: (x, y) => (x.getTime() === y.getTime() ? 0 : x.getTime() > y.getTime() ? 1 : -1)
	};

	const priceHistoryOrd: Ord<ProductPriceHistory> = contramap(
		(priceHistory: ProductPriceHistory) => priceHistory.date
	)(dateOrd);

	const mkRelativeDate = (date: Date) => {
		const rtf = new Intl.RelativeTimeFormat(currentLanguage, { numeric: 'auto' });
		const diff = date.getTime() - new Date().getTime();
		const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
		return rtf.format(diffInDays, 'day');
	};

	const mkPriceHistoryBySource = ([name, priceHistory]: [string, ProductPriceHistory]) => {
		return {
			name,
			priceString: `${priceHistory.price} €`,
			dateString: mkRelativeDate(priceHistory.date),
			...priceHistory
		} as PriceHistoryBySource;
	};

	const priceHistoryBySource = pipe(
		product.priceHistory,
		reduce({}, (acc: PriceHistoryBySourceMatrix, priceHistory) => {
			const sourceNameStr = pipe(priceHistory.source.name, sourceName.toString);

			const currentEntry = acc[sourceNameStr];

			if (!currentEntry || max(priceHistoryOrd)(currentEntry, priceHistory) === priceHistory) {
				acc[sourceNameStr] = priceHistory;
			}
			return acc;
		}),
		Object.entries,
		map(mkPriceHistoryBySource)
	);
</script>

<Table>
	<TableBody tableBodyClass="divide-y">
		<!-- List of product sources -->
		{#each priceHistoryBySource as source}
			<TableBodyRow>
				<TableBodyCell>
					<img
						src={source.source.productImageUrl}
						alt={source.name}
						class="max-h-full w-16 max-w-full"
					/>
				</TableBodyCell>
				<TableBodyCell>
					<span class="px-6 py-4 font-semibold text-gray-900 dark:text-white">{source.name}</span>
				</TableBodyCell>
				<TableBodyCell>{source.priceString}</TableBodyCell>
				<TableBodyCell>{source.dateString}</TableBodyCell>
				<TableHeadCell>
					<a href={source.source.productUrl} target="_blank" rel="noopener noreferrer">
						<span class="sr-only">See</span>
					</a>
				</TableHeadCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
