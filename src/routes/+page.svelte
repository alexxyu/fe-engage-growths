<script lang="ts">
  import {
    units,
    get_overall_growths,
    get_class_growths,
    get_class,
    get_available_class_names
  } from './data';
  import Select from 'svelte-select';

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
      (x, i) => class_base_stats_new[i] - class_base_stats_current[i] + (remaining_levels * x) / 100
    );
  };

  type PromotionEntry = {
    class_name: string;
    final_level: number;
    stat_increases: number[];
    expected_final_stats: number[];
  };

  let form_data: Record<string, [string, number]> = {};
  let data: Record<string, PromotionEntry[]> = {};
  Object.keys(units).forEach((name) => {
    const unit = units[name];
    data[name] = [
      {
        class_name: unit.base_class,
        final_level: unit.base_level,
        stat_increases: unit.base_stats,
        expected_final_stats: unit.base_stats
      }
    ];
    form_data[name] = ['', 1];
  });

  let errors: string[] = [];
  let display_errors = false;

  const add_entry = (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    const name_ = form.name_.value;
    const [class_, level_] = form_data[name_];

    errors = [];
    if (level_ < 1 || level_ > 40) {
      errors = [...errors, 'Level must be between 1 and 40.'];
    } else if (level_ > 20 && class_ !== 'Thief' && class_ !== 'Dancer') {
      errors = [...errors, 'Only Thieves and Dancers can level past 20.'];
    }

    const prev_entry = data[name_].slice(-1)[0];
    const {
      class_name: current_class,
      expected_final_stats: previous_final_stats,
      final_level: current_level
    } = prev_entry;

    const current_class_data = get_class(name_, current_class);
    if (class_ !== current_class && current_class_data.is_base_class && current_level < 10) {
      errors = [...errors, 'Unit must be at least level 10 in a base class to change classes.'];
    }

    if (errors.length > 0) {
      display_errors = true;
      return;
    }

    const starting_level = class_ === current_class ? current_level : 1;
    const stat_increases = get_expected_stat_increases(
      name_,
      current_class,
      starting_level,
      class_,
      level_
    );
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
    const unit_data = data[name_];
    const curr_entry = unit_data[i];
    const curr_class_data = get_class(name_, curr_entry.class_name);
    const next_entry = unit_data?.[i + 1];

    errors = [];
    if (
      next_entry &&
      next_entry.class_name !== curr_entry.class_name &&
      curr_class_data.is_base_class
    ) {
      if (
        curr_entry.final_level < 10 ||
        unit_data?.[i - 1]?.class_name !== curr_entry.class_name ||
        unit_data?.[i - 1]?.final_level < 10
      ) {
        errors = [
          ...errors,
          'Deleting this entry is invalid since units in base classes must be at least level 10 to change classes.'
        ];
      }
    }

    if (errors.length > 0) {
      display_errors = true;
      return;
    }

    unit_data.splice(i, 1);
    unit_data.reduce((prev, entry) => {
      const stat_increases = get_expected_stat_increases(
        name_,
        prev.class_name,
        prev.final_level,
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

<div class="modal {display_errors ? 'modal-open' : ''}" id="errors-modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold text-error mb-3">Errors:</h3>
    <ul class="list-disc list-inside">
      {#each errors as error}
        <li>{error}</li>
      {/each}
    </ul>
    <div class="modal-action">
      <button class="btn btn-sm" on:click={() => (display_errors = false)}>OK</button>
    </div>
  </div>
</div>

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
              <Select
                items={get_available_class_names(name)}
                class="select select-bordered mb-2"
                placeholder="Select class"
                bind:justValue={form_data[name][0]}
                required
              />
              <input
                class="input input-bordered mb-4"
                placeholder="Final level"
                type="number"
                bind:value={form_data[name][1]}
                required
              />
              <button
                type="submit"
                class="btn btn-sm btn-outline btn-primary"
                disabled={data[name].length >= 10}
              >
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
                      <td>{Math.floor(stat)}</td>
                    {/each}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      {/each}
    </div>
    <div class="drawer-side">
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
