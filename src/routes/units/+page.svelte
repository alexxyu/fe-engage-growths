<script lang="ts">
	import { units, classes, exclusive_classes, get_overall_growths, get_class_growths, get_class } from '../data';

    const expected_stats_no_promotion = Object.keys(units).map((name) => {
        const unit = units[name];

        const max_level = unit.base_class === 'Dancer' || unit.base_class == 'Thief' ? 40 : 20;
        const remaining_levels = max_level - unit.base_level;
        console.log(name, unit.base_class);
        const overall_growths = get_overall_growths(unit.growth_rates, get_class_growths(name, unit.base_class));
        const max_class_stats = get_class(name, unit.base_class).max_stats;
        return [name, unit.base_stats.map((x, i) => {
            let e_x = x + Math.round(remaining_levels * overall_growths[i] / 100);
            return Math.min(e_x, max_class_stats[i] + unit.max_stat_modifiers[i]);
        })];
    });
</script>

<svelte:head>
	<title>FE Engage Growth Calculator</title>
	<meta name="description" content="Check overall growth rates for each unit in Fire Emblem Engage" />
</svelte:head>

<section>
    <h3>Expected stats at max level of starting class:</h3>
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
			{#each expected_stats_no_promotion as [unit, stats] }
				<tr>
					<th class="row-header">{unit}</th>
                    {#each stats as stat }
                        <td>{stat}</td>
                    {/each}
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
