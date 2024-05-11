<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

    import type { ProductDetail, ProductPriceHistory } from '../../types/ProductDetail';
    import { reduce } from 'fp-ts/Array';
    import { pipe } from 'fp-ts/function';
    import { type Ord, max } from 'fp-ts/Ord';
    import { contramap } from 'fp-ts/Ord';
    import { isNone } from 'fp-ts/Option';

    type PriceHistoryBySourceMatrix = { [key: string]: ProductPriceHistory };
    type PriceHistoryBySource = { name: string } & ProductPriceHistory;


// export enum ProductPriceUnit {
//     Kg,
//     Unit,
// }

// export type ProductSource = {
//     productId: string;
//     name: SourceName;
//     productUrl: string;
//     productImageUrl: string;
// };

// export type ProductPriceHistory = {
//     date: Date;
//     price: number;
//     priceUnit: ProductPriceUnit;
//     source: ProductSource;
// };

// export type ProductDetail = {
//     id: string;
//     name: string;
//     brand: string;
//     priceHistory: ProductPriceHistory[];
//     sources: ProductSource[];
//     ean: string;
// };


    export let product: ProductDetail;

    const dateOrd: Ord<Date> = {
        equals: (x, y) => x.getTime() === y.getTime(),
        compare: (x, y) => (x.getTime() === y.getTime() ? 0 : x.getTime() > y.getTime() ? 1 : -1)
    };

    const priceHistoryOrd: Ord<ProductPriceHistory> = contramap((priceHistory: ProductPriceHistory) => priceHistory.date)(dateOrd);


    // group PriceHistory by source and get only the most recent price for each source
    const priceHistoryBySource = pipe(
        product.priceHistory,
        reduce({}, (acc: PriceHistoryBySourceMatrix, priceHistory) => {
            const currentEntry = acc[priceHistory.source.name];
            if (!currentEntry || max(priceHistoryOrd)(currentEntry, priceHistory) === priceHistory) {
                acc[priceHistory.source.name] = priceHistory;
            }
            return acc;
        }),
        Object.entries,
        (entries) => entries.map(([name, priceHistory]) => ({ name, ...priceHistory } as PriceHistoryBySource))
    );

</script>

<Table>
	<TableBody tableBodyClass="divide-y">
        <!-- List of product sources -->
        {#each priceHistoryBySource as source}
            <TableBodyRow>
                <TableBodyCell>
                    <img src={source.source.productImageUrl} alt={source.name} class="w-16 max-w-full max-h-full" />
                </TableBodyCell>
                <TableBodyCell>
                    <span class="px-6 py-4 font-semibold text-gray-900 dark:text-white">{source.name}</span>
                </TableBodyCell>
                <TableBodyCell>{source.price}</TableBodyCell>
                <TableBodyCell>{source.date}</TableBodyCell>
                <TableHeadCell>
                    <a href={source.source.productUrl} target="_blank" rel="noopener noreferrer">
                        <span class="sr-only">See</span>
                    </a>
                </TableHeadCell>
            </TableBodyRow>
        {/each}
	</TableBody>
</Table>
