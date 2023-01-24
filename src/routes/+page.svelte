<script lang="ts">
	import { mean, sampleCorrelation, standardDeviation } from 'simple-statistics';
	import { transpose } from 'matrix-transpose';

	const round = (n: number, d: number) => {
		// Adapted from 'https://stackoverflow.com/a/11832950'
		let k = 10 ** d;
		return Math.round((n + Number.EPSILON) * k) / k;
	}

	const unit_growths: Record<string, number[]> = {"Alear": [60, 35, 20, 45, 50, 40, 25, 25, 5], "Vander": [60, 25, 10, 25, 35, 35, 20, 10, 5], "Clanne": [40, 35, 10, 40, 50, 30, 25, 20, 5], "Framme": [55, 30, 25, 35, 55, 25, 30, 25, 0], "Alfred": [65, 40, 5, 35, 40, 40, 20, 40, 10], "Etie": [45, 40, 0, 25, 35, 25, 30, 25, 5], "Boucheron": [85, 20, 0, 50, 45, 35, 20, 15, 20], "C\u00e9line": [50, 35, 25, 30, 45, 30, 40, 50, 5], "Chlo\u00e9": [75, 25, 35, 40, 55, 30, 25, 25, 5], "Louis": [75, 40, 0, 25, 25, 50, 20, 25, 15], "Yunaka": [50, 35, 25, 40, 45, 15, 45, 25, 5], "Alcryst": [65, 30, 10, 40, 45, 30, 20, 15, 10], "Citrinne": [45, 10, 40, 25, 30, 20, 40, 25, 5], "Lapis": [55, 25, 20, 35, 55, 35, 30, 25, 5], "Diamant": [75, 30, 15, 20, 40, 40, 25, 20, 15], "Amber": [65, 45, 0, 25, 30, 35, 5, 35, 15], "Jade": [55, 35, 25, 35, 30, 40, 30, 20, 10], "Ivy": [55, 25, 30, 25, 40, 30, 35, 15, 10], "Kagetsu": [60, 30, 15, 50, 50, 40, 25, 40, 10], "Zelkov": [65, 35, 15, 40, 35, 35, 15, 25, 10], "Fogado": [60, 30, 25, 30, 55, 30, 35, 25, 10], "Pandreo": [60, 5, 30, 45, 45, 15, 55, 30, 15], "Bunet": [65, 30, 10, 40, 35, 45, 25, 40, 10], "Timerra": [55, 25, 25, 45, 45, 30, 30, 30, 10], "Panette": [75, 45, 10, 40, 25, 30, 15, 20, 15], "Merrin": [55, 25, 25, 40, 50, 30, 30, 25, 10], "Hortensia": [40, 20, 20, 35, 50, 25, 55, 50, 0], "Seadall": [55, 25, 15, 25, 50, 25, 25, 35, 10], "Rosado": [75, 45, 25, 40, 45, 30, 30, 20, 5], "Goldmary": [65, 30, 5, 25, 25, 55, 25, 25, 5], "Lindon": [65, 25, 25, 25, 40, 25, 40, 15, 10], "Saphir": [80, 35, 0, 25, 30, 30, 5, 20, 10], "Veyle": [40, 25, 45, 35, 30, 25, 35, 20, 0], "Mauvier": [70, 35, 40, 40, 35, 50, 45, 15, 15], "Anna": [55, 15, 50, 50, 50, 20, 35, 45, 5], "Jean": [50, 20, 20, 35, 40, 25, 20, 25, 5]};
	const class_growths: Record<string, number[]> = {"Dragon Child": [10, 10, 0, 10, 15, 10, 10, 5, 5], "Divine Dragon": [10, 10, 0, 10, 15, 15, 15, 10, 5], "Fell Child": [10, 10, 25, 10, 5, 10, 25, 0, 0], "Noble": [0, 5, 10, 5, 5, 5, 10, 20, 0], "Avenir": [15, 15, 0, 5, 10, 25, 5, 20, 5], "Vidame": [5, 10, 15, 5, 5, 5, 15, 20, 0], "Lord": [10, 10, 0, 25, 10, 10, 0, 5, 0], "Successeur": [15, 20, 0, 10, 15, 15, 0, 10, 5], "Tireur d\u2019\u00e9lite": [10, 10, 0, 30, 10, 15, 5, 5, 0], "Wing Tamer": [0, 0, 15, 10, 10, 0, 25, 10, 0], "Lindwurm": [5, 0, 25, 5, 0, 15, 25, 0, 0], "Sleipnir Rider": [0, 0, 20, 15, 15, 0, 30, 15, 0], "Sentinel": [10, 5, 0, 15, 15, 5, 15, 0, 0], "Picket": [10, 15, 0, 10, 10, 20, 5, 5, 5], "Cupido": [10, 5, 5, 20, 20, 5, 20, 0, 0], "Melusine": [10, 10, 10, 10, 15, 10, 10, 0, 5], "Sword Fighter": [10, 10, 0, 15, 20, 0, 15, 10, 0], "Swordmaster": [10, 10, 0, 15, 20, 0, 15, 15, 0], "Hero": [15, 15, 0, 10, 15, 0, 10, 15, 0], "Lance Fighter": [10, 10, 5, 20, 5, 10, 5, 0, 0], "Halberdier": [10, 15, 5, 20, 10, 15, 5, 5, 0], "Royal Knight": [5, 10, 15, 15, 15, 5, 20, 10, 0], "Axe Fighter": [25, 20, 0, 5, 10, 5, 0, 0, 5], "Berserker": [30, 30, 0, 5, 10, 5, 0, 0, 10], "Warrior": [25, 20, 0, 10, 15, 10, 5, 0, 5], "Archer": [10, 15, 0, 25, 10, 5, 0, 5, 0], "Sniper": [15, 15, 0, 30, 10, 10, 0, 10, 0], "Bow Knight": [10, 10, 0, 20, 20, 0, 15, 15, 0], "Sword Armor": [20, 15, 0, 10, 0, 30, 0, 0, 5], "Lance Armor": [20, 15, 0, 10, 0, 30, 0, 0, 5], "Axe Armor": [20, 15, 0, 10, 0, 30, 0, 0, 5], "General": [25, 20, 0, 10, 0, 30, 0, 0, 10], "Great Knight": [20, 15, 0, 15, 0, 25, 10, 5, 5], "Sword Cavalier": [10, 10, 0, 10, 10, 10, 10, 10, 0], "Lance Cavalier": [10, 10, 0, 10, 10, 10, 10, 10, 0], "Axe Cavalier": [10, 10, 0, 10, 10, 10, 10, 10, 0], "Paladin": [15, 15, 0, 10, 15, 15, 15, 10, 0], "Wolf Knight": [10, 5, 0, 15, 20, 5, 20, 20, 0], "Mage": [0, 0, 25, 5, 0, 0, 25, 5, 0], "Sage": [0, 0, 30, 5, 0, 0, 30, 15, 0], "Mage Knight": [5, 5, 25, 0, 5, 10, 25, 5, 0], "Martial Monk": [0, 10, 25, 0, 0, 10, 20, 10, 0], "Martial Master": [5, 10, 20, 0, 0, 15, 25, 10, 0], "High Priest": [0, 0, 25, 0, 5, 0, 30, 30, 0], "Sword Flier": [5, 10, 5, 10, 10, 0, 10, 10, 0], "Lance Flier": [5, 10, 5, 10, 10, 0, 10, 10, 0], "Axe Flier": [5, 10, 5, 10, 10, 0, 10, 10, 0], "Griffin Knight": [0, 10, 15, 15, 20, 0, 15, 15, 0], "Wyvern Knight": [20, 20, 0, 10, 5, 20, 5, 5, 5], "Thief": [5, 10, 0, 20, 15, 15, 5, 15, 0], "Dancer": [5, 10, 0, 5, 15, 10, 20, 20, 0]};
	const classes = Object.keys(class_growths);
	const get_overall_growths = (ug: number[], cg: number[]) => ug.map((g, i) => g + cg[i]);

	let unit_ = "Alear";
	let correlation_recommendations: (number | string)[][], excellent_stat_thresholds: number[];

	$: correlation_recommendations = ((unit_) => {
		let correlation = classes.map((class_) => {
			return [round(sampleCorrelation(unit_growths[unit_], class_growths[class_]), 3), class_];
		});
		return correlation.sort().reverse().slice(0, 3);
	})(unit_);

	$: excellent_stat_thresholds = ((unit_: string) => {
		const stats = transpose(classes.map((class_) => get_overall_growths(unit_growths[unit_], class_growths[class_])));
		const means = stats.map((stat) => mean(stat));
		const stddevs = stats.map((stat) => standardDeviation(stat));
		const thresholds = means.map((m, i) => m + stddevs[i]);
		return thresholds;
	})(unit_);
</script>

<svelte:head>
	<title>FE Engage Growth Calculator</title>
	<meta name="description" content="Check overall growth rates for each unit in Fire Emblem Engage" />
</svelte:head>

<section>
	<div>
		<label for="unit-select">Unit: </label>
		<select id="unit-select" bind:value={unit_}>
			{#each Object.keys(unit_growths) as name}
				<option>{name}</option>
			{/each}
		</select>
		<div>
			<h3>Top correlated classes:</h3>
			<ul>
				{#each correlation_recommendations as rec }
					<li>{rec[1]} ({rec[0]})</li>
				{/each}
			</ul>
		</div>
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
				{#each unit_growths[unit_] as ug}
				<td>{ug}</td>
				{/each}
			</tr>
			<!-- <tr>
				<th>Class</th>
				{#each class_growths[class_] as cg}
				<td>{cg}</td>
				{/each}
			</tr> -->
			{#each Object.keys(class_growths) as class_ }
			<tr>
				<th class="row-header">{class_}</th>
				{#each get_overall_growths(unit_growths[unit_], class_growths[class_]) as tg, i }
					<td class="{ tg >= excellent_stat_thresholds[i] ? 'excellent-growth' : '' }">{tg}</td>
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
