<script lang="ts">
	import {
		units,
		get_overall_growths,
		get_class_growths,
		get_class,
		get_max_level_of_class,
		get_available_class_names
	} from './data';

	const get_expected_stat_increases = (
		name: string,
		current_class: string,
		current_level: number,
		new_class: string,
		final_level: number
	) => {
		const unit = units[name];
		const remaining_levels = final_level - current_level;
		const overall_growths = get_overall_growths(
			unit.growth_rates,
			get_class_growths(name, new_class)
		);

		const class_base_stats_current = get_class(name, current_class).base_stats;
		const class_base_stats_new = get_class(name, new_class).base_stats;
		return overall_growths.map(
			(x, i) =>
				class_base_stats_new[i] -
				class_base_stats_current[i] +
				Math.round((remaining_levels * x) / 100)
		);
	};

	type PromotionEntry = {
		class_name: string;
		final_level: number;
		stat_increases: number[];
		expected_final_stats: number[];
	};

	let data: Record<string, PromotionEntry[]> = {};
	Object.keys(units).forEach((name) => {
		const unit = units[name];
		const final_level = get_max_level_of_class(unit.base_class);
		const stat_increases = get_expected_stat_increases(
			name,
			unit.base_class,
			unit.base_level,
			unit.base_class,
			final_level
		);
		const max_class_stats = get_class(name, unit.base_class).max_stats;
		const final_stats = unit.base_stats.map((x, i) => {
			return Math.min(x + stat_increases[i], max_class_stats[i]);
		});
		data[name] = [
			{
				class_name: unit.base_class,
				final_level: final_level,
				stat_increases,
				expected_final_stats: final_stats
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
		const { class_name: current_class, expected_final_stats: previous_final_stats } =
			data[name_].slice(-1)[0];

		const stat_increases = get_expected_stat_increases(name_, current_class, 1, class_, level_);
		const final_stats = previous_final_stats.map((x, i) => {
			return Math.min(x + stat_increases[i], get_class(name_, class_).max_stats[i]);
		});

		data[name_].push({
			class_name: class_,
			final_level: level_,
			stat_increases,
			expected_final_stats: final_stats
		});

		// This line is required to force a reactive update
		data = data;
	};

	const delete_entry = (name_: string, i: number) => {
		data[name_].splice(i, 1);
		data[name_].reduce((prev, entry) => {
			console.log(prev, entry);
			const stat_increases = get_expected_stat_increases(
				name_,
				prev.class_name,
				1,
				entry.class_name,
				entry.final_level
			);
			entry.stat_increases = stat_increases;
			entry.expected_final_stats = prev.expected_final_stats.map((x, i) => {
				return Math.min(x + stat_increases[i], get_class(name_, entry.class_name).max_stats[i]);
			});
			return entry;
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
		content="Calculate projected unit stats upon promotions in Fire Emblem Engage"
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
							<button type="submit" class="btn btn-sm btn-outline btn-primary">
								Add promotion
							</button>
						</form>
						<table class="table">
							<thead>
								<tr>
									<th class="bg-transparent" />
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
								{#each data[name] as class_entry, i}
									<tr>
										<th class="border-none px-0">
											{#if i > 0}
												<button
													class="btn btn-xs btn-outline btn-error mx-4"
													on:click={() => delete_entry(name, i)}
												>
													X
												</button>
											{/if}
										</th>
										<th class="">
											{class_entry.class_name} lvl. {class_entry.final_level}
										</th>
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
