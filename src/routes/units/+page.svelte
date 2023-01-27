<script lang="ts">
	import {
		units,
		get_overall_growths,
		get_class_growths,
		get_class,
		get_max_level_of_class,
		get_available_class_names
	} from '../data';

	const get_expected_final_stats = (
		name: string,
		current_class: string,
		current_stats: number[],
		current_level: number,
		final_level: number
	) => {
		const unit = units[name];
		const remaining_levels = final_level - current_level;
		const overall_growths = get_overall_growths(
			unit.growth_rates,
			get_class_growths(name, current_class)
		);
		const max_class_stats = get_class(name, current_class).max_stats;
		return current_stats.map((x, i) => {
			let e_x = x + Math.round((remaining_levels * overall_growths[i]) / 100);
			return Math.min(e_x, max_class_stats[i] + unit.max_stat_modifiers[i]);
		});
	};

	type UnitEntry = {
		class_name: string;
		final_level: number;
		expected_final_stats: number[];
	};

	let data: Record<string, UnitEntry[]> = {};
	Object.keys(units).forEach((name) => {
		const unit = units[name];
		const final_level = get_max_level_of_class(unit.base_class);
		const stats = get_expected_final_stats(
			name,
			unit.base_class,
			unit.base_stats,
			unit.base_level,
			final_level
		);
		data[name] = [
			{
				class_name: unit.base_class,
				final_level: final_level,
				expected_final_stats: stats
			}
		];
	});

	const add_entry = (e: SubmitEvent) => {
		const form_data: Record<string, any> = {};
		for (let field of new FormData(e.target as HTMLFormElement)) {
			const [key, value] = field;
			form_data[key] = value;
		}

		const { name_, class_, level_ } = form_data;
		const previous_final_stats = data[name_].slice(-1)[0].expected_final_stats;
		const stats: number[] = get_expected_final_stats(
			name_,
			class_,
			previous_final_stats,
			1,
			level_
		);

		data[name_].push({
			class_name: class_,
			final_level: level_,
			expected_final_stats: stats
		});

		// This line is required to force a reactive update
		data = data;
	};

	let visible_unit = 'Alear';
</script>

<svelte:head>
	<title>FE Engage Growths | Units</title>
	<meta
		name="description"
		content="Check overall growth rates for each unit in Fire Emblem Engage"
	/>
</svelte:head>

<section>
	<div class="drawer drawer-mobile">
		<input class="drawer-toggle" type="checkbox" />
		<div class="drawer-content flex flex-col items-center">
			{#each Object.keys(units) as name}
				{#if name == visible_unit}
					<div class="text-4xl font-bold my-12">
						{name}
					</div>
					<div class="flex">
						<form class="flex flex-col mr-8" on:submit|preventDefault={add_entry}>
							<input name="name_" value={name} hidden />
							<select name="class_" id="unit-select" class="select select-bordered mb-2">
								<option disabled>Select class</option>
								{#each get_available_class_names(name) as class_}
									<option value={class_}>
										{class_}
									</option>
								{/each}
							</select>
							<input
								name="level_"
								class="input input-bordered mb-4"
								placeholder="Final level"
								type="number"
								min="10"
								max="40"
								required
							/>
							<button type="submit" class="btn btn-outline btn-primary">Add promotion</button>
						</form>
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
								{#each data[name] as class_entry}
									<tr>
										<th>{class_entry.class_name} lvl. {class_entry.final_level}</th>
										{#each class_entry.expected_final_stats as stat}
											<td>{stat}</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			{/each}
		</div>
		<div class="drawer-side overscroll-contain">
			<ul class="menu">
				{#each Object.keys(units) as name}
					<li>
						<button
							class="bg-transparent text-inherit hover:bg-primary hover:text-white border-none rounded-none normal-case flex-none w-full pl-10 pr-24 my-0"
							type="button"
							on:click={() => (visible_unit = name)}
							aria-controls={name}
						>
							{name}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
