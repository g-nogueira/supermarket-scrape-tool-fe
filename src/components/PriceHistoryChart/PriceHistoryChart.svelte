<script lang="ts">
	import { Chart, Card, A, Button, Dropdown, DropdownItem, Popover } from 'flowbite-svelte';
	import type { ProductDetail, ProductPriceHistory } from '../../types/ProductDetail';
	import type { ApexOptions } from 'apexcharts';
	import { pipe } from 'fp-ts/lib/function';
	import * as Arr from 'fp-ts/lib/Array';
	import { contramap } from 'fp-ts/lib/Ord';
	import * as Str from 'fp-ts/lib/string';
	import * as Dt from 'fp-ts/lib/Date';
	import * as Opt from 'fp-ts/lib/Option';
	import * as Nbr from 'fp-ts/lib/number';
	import { sourceName } from '../../types/SourceName';
	import * as Record from 'fp-ts/lib/Record';

	export let priceHistory: ProductPriceHistory[];

	const colors = ['#1A56DB', '#7E3AF2'];

	const groupBy =
		<A,>(f: (a: A) => string) =>
		(as: A[]): Record<string, A[]> =>
			pipe(
				as,
				Arr.reduce({}, (acc: any, a) => {
					const k = f(a);
					return {
						...acc,
						[k]: (acc[k] || []).concat(a)
					};
				})
			);

	const getMinPrice = (history: ProductPriceHistory[]) => {
		return pipe(
			history,
			Arr.map((item) => item.price),
			Arr.sort(Nbr.Ord),
			Arr.head,
			Opt.toNullable
		);
	};

	const getMaxPrice = (history: ProductPriceHistory[]) => {
		return pipe(
			history,
			Arr.map((item) => item.price),
			Arr.sort(Nbr.Ord),
			Arr.last,
			Opt.toNullable
		);
	};

	const mkSeries = (
		history: ProductPriceHistory[]
	): ApexAxisChartSeries | ApexNonAxisChartSeries => {
		const groupBySupermarket = groupBy((item: ProductPriceHistory) =>
			sourceName.toString(item.source.name)
		);

		const sortByDate = pipe(
			Dt.Ord,
			contramap((item: ProductPriceHistory) => item.date)
		);

		return pipe(
			history,
			groupBySupermarket,
			Record.toArray,
			Arr.map(([supermarket, items]) => ({
				name: supermarket,
				data: pipe(
					items,
					Arr.sort(sortByDate),
					Arr.map((item) => item.price)
				),
				color: colors.pop() || '#000000' // Default color if colors array is empty
			}))
		);
	};

	const mkCategories = (history: ProductPriceHistory[]): string[] => {
		const toDateString = (date: Date) => date.toDateString();

		return pipe(
			history,
			Arr.map((item) => item.date),
			Arr.sort(Dt.Ord),
			Arr.map(toDateString),
			Arr.uniq(Str.Eq)
		);
	};

	const options: ApexOptions = {
		chart: {
			height: '200px',
			width: '100%',
			type: 'line',
			dropShadow: { enabled: false },
			toolbar: { show: false }
		},
		tooltip: { enabled: true, x: { show: false } },
		dataLabels: { enabled: false },
		stroke: {
			width: 6,
			curve: 'smooth'
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -26
			}
		},
		series: mkSeries(priceHistory),
		legend: { show: false },
		xaxis: {
			categories: mkCategories(priceHistory),
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: { show: true }
	};
</script>

{#if Arr.isEmpty(priceHistory)}
	<p class="text-red-500">No price history available</p>
{:else}
	<Card class="min-w-full">
		<div class="mb-5 flex justify-between">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<h5
						class="mb-2 inline-flex items-center font-normal leading-none text-gray-500 dark:text-gray-400"
					>
						Min
					</h5>
					<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white">
						{pipe(priceHistory, getMinPrice)}
					</p>
				</div>
				<div>
					<h5
						class="mb-2 inline-flex items-center font-normal leading-none text-gray-500 dark:text-gray-400"
					>
						Max
					</h5>
					<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white">
						{pipe(priceHistory, getMaxPrice)}
					</p>
				</div>
			</div>
		</div>
		<Chart {options} />
	</Card>
{/if}
