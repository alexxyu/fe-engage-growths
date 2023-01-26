<script lang="ts">
	import { units, classes, exclusive_classes } from './data';
	import { transpose } from 'matrix-transpose';
	import { mean, sampleCorrelation, standardDeviation } from 'simple-statistics';

	const round = (n: number, d: number) => {
		// Adapted from 'https://stackoverflow.com/a/11832950'
		let k = 10 ** d;
		return Math.round((n + Number.EPSILON) * k) / k;
	}

	const get_overall_growths = (ug: number[], cg: number[]) => ug.map((g, i) => g + cg[i]);
	const get_class_growths = (unit_: string, class_: string) => {
		return classes?.[class_]?.growth_rates ?? exclusive_classes[unit_][class_].growth_rates;
	};

	let unit_ = "Alear";

	let class_names: string[];
	let recs_by_correlation: (number | string)[][];
	let exc_ovr_stat_thresholds: number[];

	$: {
		class_names = [...Object.keys(exclusive_classes?.[unit_] ?? {}).filter((name) => exclusive_classes?.[unit_]?.[name]), ...Object.keys(classes)];
		recs_by_correlation = ((unit_) => {
			let correlation = class_names.map((class_) => {
				return [round(sampleCorrelation(units[unit_].growth_rates, get_class_growths(unit_, class_)), 3), class_];
			});
			return correlation.sort().reverse();
		})(unit_);
		exc_ovr_stat_thresholds = ((unit_: string) => {
			const stats = transpose(class_names.map((class_) => get_overall_growths(units[unit_].growth_rates, get_class_growths(unit_, class_))));
			const means = stats.map((stat) => mean(stat));
			const stddevs = stats.map((stat) => standardDeviation(stat));
			const thresholds = means.map((m, i) => m + stddevs[i]);
			return thresholds;
		})(unit_);
	}

	let show_overall_growths = true;
</script>

<svelte:head>
	<title>FE Engage Growth Calculator</title>
	<meta name="description" content="Check overall growth rates for each unit in Fire Emblem Engage" />
</svelte:head>

<section>
	<div>
		<label for="unit-select">Unit: </label>
		<select id="unit-select" bind:value={unit_}>
			{#each Object.keys(units) as name}
				<option value={name}>
					{name}
				</option>
			{/each}
		</select>
		<button on:click={() => show_overall_growths = !show_overall_growths}>
			{#if show_overall_growths}
				Show class growths
			{:else}
				Show overall growths
			{/if}
		</button>
	</div>
	<div>
		<h3>Top correlated classes:</h3>
		<ul>
			{#each recs_by_correlation.slice(0, 3) as rec }
				<li>{rec[1]} ({rec[0]})</li>
			{/each}
		</ul>
	</div>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>HP</th>
				<th>Str</th>
				<th>Mag</th>
				<th>Dex</th>
				<th>Spd</th>
				<th>Def</th>
				<th>Res</th>
				<th>Lck</th>
				<th>Bld</th>
			</tr>
		</thead>
		<tbody>
			<tr style="background-color: lightgrey;">
				<th class="row-header">Base Growths</th>
				{#each units[unit_].growth_rates as ug}
					<td>{ug}</td>
				{/each}
			</tr>
			{#each class_names as class_ }
				<tr>
					<th class="row-header">{class_}</th>
					{#if show_overall_growths}
						{#each get_overall_growths(units[unit_].growth_rates, get_class_growths(unit_, class_)) as tg, i}
							<td class="{ tg >= exc_ovr_stat_thresholds[i] ? 'excellent-growth' : '' }">{tg}</td>
						{/each}
					{:else}
						{#each classes[class_].growth_rates as cg, i}
							<td class="{ cg + units[unit_].growth_rates[i] >= exc_ovr_stat_thresholds[i] ? 'excellent-growth' : '' }">{cg}</td>
						{/each}
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.row-header {
		text-align: right;
	}

	.excellent-growth {
		background-color: lightgreen;
	}
</style>
