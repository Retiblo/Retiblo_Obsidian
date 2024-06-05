<script lang="ts">
  import GithubTab from './GithubTab.svelte';
  import GeneralTab from './GeneralTab.svelte';
  import { getCommits } from '../api/github';
  export let variable: number;
  export let displayIndex = 0;
  export let tabs = [
    {
      name: 'General',
      compo: GeneralTab,
    },
    {
      name: 'Github',
      compo: GithubTab,
    },
  ];

  function onClickTab(index: number) {
    displayIndex = index;
    console.log(displayIndex);
  }

  $: displayCompo = tabs[displayIndex].compo;

  function onKeyDown(event: KeyboardEvent) {
    console.log(event);
  }
</script>

<div class="number">
  <span>My number is {variable}</span>
  {#each tabs as tab, index}
    <div
      on:click={() => onClickTab(index)}
      on:keydown={onKeyDown}
      aria-hidden="true"
    >
      {tab.name}
    </div>
  {/each}

  <p>{displayIndex}</p>
  <svelte:component this={displayCompo} {variable}></svelte:component>
</div>

<style>
  .number {
    color: red;
  }
</style>
