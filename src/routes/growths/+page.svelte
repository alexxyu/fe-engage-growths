<script lang="ts">
  import {
    units,
    get_overall_growths,
    get_class_growths,
    get_available_class_names
  } from '../data';
  import { transpose } from 'matrix-transpose';
  import { mean, sampleCorrelation, standardDeviation } from 'simple-statistics';

  const round = (n: number, d: number) => {
    // Adapted from 'https://stackoverflow.com/a/11832950'
    let k = 10 ** d;
    return Math.round((n + Number.EPSILON) * k) / k;
  };

  let unit_ = 'Alear';

  let class_names: string[];
  let recs_by_correlation: (number | string)[][];
  let exc_ovr_stat_thresholds: number[];

  $: {
    class_names = get_available_class_names(unit_);
    recs_by_correlation = ((unit_) => {
      let correlation: [number, string][] = class_names.map((class_) => {
        return [
          round(sampleCorrelation(units[unit_].growth_rates, get_class_growths(unit_, class_)), 3),
          class_
        ];
      });
      return correlation.sort((a, b) => b[0] - a[0]);
    })(unit_);
    exc_ovr_stat_thresholds = ((unit_: string) => {
      const stats = transpose(
        class_names.map((class_) =>
          get_overall_growths(units[unit_].growth_rates, get_class_growths(unit_, class_))
        )
      );
      const means = stats.map((stat) => mean(stat));
      const stddevs = stats.map((stat) => standardDeviation(stat));
      const thresholds = means.map((m, i) => m + stddevs[i]);
      return thresholds;
    })(unit_);
  }

  let show_overall_growths = true;
</script>

<svelte:head>
  <title>FE Engage Growths</title>
  <meta
    name="description"
    content="Check overall growth rates for each unit in Fire Emblem Engage"
  />
</svelte:head>

<section>
  <div class="my-1">
    <select id="unit-select" class="select select-bordered max-w-xs" bind:value={unit_}>
      <option disabled>Select unit</option>
      {#each Object.keys(units) as name}
        <option value={name}>
          {name}
        </option>
      {/each}
    </select>
    <button
      class="btn btn-outline btn-primary normal-case"
      on:click={() => (show_overall_growths = !show_overall_growths)}
    >
      {#if show_overall_growths}
        Show class growths
      {:else}
        Show overall growths
      {/if}
    </button>
  </div>
  <div class="my-1 card card-normal">
    <div class="card-body">
      <div class="card-title">Top correlated classes:</div>
      <div class="card-desc">
        <ol class="list-decimal list-inside">
          {#each recs_by_correlation.slice(0, 3) as rec}
            <li>{rec[1]} ({rec[0]})</li>
          {/each}
        </ol>
      </div>
    </div>
  </div>
  <table class="my-1 table">
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
      <tr>
        <th>Base Growths</th>
        {#each units[unit_].growth_rates as ug}
          <td class="font-bold">{ug}</td>
        {/each}
      </tr>
      {#each class_names as class_}
        <tr>
          <th>{class_}</th>
          {#if show_overall_growths}
            {#each get_overall_growths(units[unit_].growth_rates, get_class_growths(unit_, class_)) as tg, i}
              <td class={tg >= exc_ovr_stat_thresholds[i] ? 'bg-green-300' : ''}>{tg}</td>
            {/each}
          {:else}
            {#each get_class_growths(unit_, class_) as cg, i}
              <td
                class={cg + units[unit_].growth_rates[i] >= exc_ovr_stat_thresholds[i]
                  ? 'bg-green-300'
                  : ''}>{cg}</td
              >
            {/each}
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</section>
