<script lang="ts">
	import { units, get_overall_growths, get_class_growths, get_class } from '../data';
	import { transpose } from 'matrix-transpose';
	import { mean, sampleCorrelation, standardDeviation } from 'simple-statistics';

	const expected_stats_with_no_promotion: [string, number[]][] = Object.keys(units).map((name) => {
		const unit = units[name];

		const max_level = unit.base_class === 'Dancer' || unit.base_class == 'Thief' ? 40 : 20;
		const remaining_levels = max_level - unit.base_level;
		const overall_growths = get_overall_growths(
			unit.growth_rates,
			get_class_growths(name, unit.base_class)
		);
		const max_class_stats = get_class(name, unit.base_class).max_stats;
		return [
			name,
			unit.base_stats.map((x, i) => {
				let e_x = x + Math.round((remaining_levels * overall_growths[i]) / 100);
				return Math.min(e_x, max_class_stats[i] + unit.max_stat_modifiers[i]);
			})
		];
	});

	const exc_ovr_stat_thresholds = (() => {
		const stats = transpose(expected_stats_with_no_promotion.map((x) => x[1]));
		const means = stats.map((stat) => mean(stat));
		const stddevs = stats.map((stat) => standardDeviation(stat));
		const thresholds = means.map((m, i) => m + stddevs[i]);
		return thresholds;
	})();
	console.log(exc_ovr_stat_thresholds);

	const get_tooltip = (name: string) => {
		const unit = units[name];
		return `Base: ${unit.base_class} lvl ${unit.base_level}`;
	};
</script>

<svelte:head>
	<title>FE Engage Growths | Units</title>
	<meta
		name="description"
		content="Check overall growth rates for each unit in Fire Emblem Engage"
	/>
</svelte:head>

<section>
	<div class="mb-4 font-bold text-lg">Average stats at max level of starting class:</div>
	<table class="table">
		<thead>
			<tr>
				<th />
				<th class="text-lg">HP</th>
				<th class="text-lg">Str</th>
				<th class="text-lg">Mag</th>
				<th class="text-lg">Dex</th>
				<th class="text-lg">Spd</th>
				<th class="text-lg">Def</th>
				<th class="text-lg">Res</th>
				<th class="text-lg">Lck</th>
				<th class="text-lg">Bld</th>
			</tr>
		</thead>
		<tbody>
			{#each expected_stats_with_no_promotion as [unit, stats]}
				<tr>
					<th class="tooltip tooltip-left" data-tip={get_tooltip(unit)}>{unit}</th>
					{#each stats as stat, i}
						<td class={stat >= exc_ovr_stat_thresholds[i] ? 'bg-green-300' : ''}>{stat}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>
