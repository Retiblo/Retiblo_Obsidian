<script lang="ts">
  import GithubTab from './GithubTab.svelte';
  import GeneralTab from './GeneralTab.svelte';
  import ConnectTab from './ConnectTab.svelte';
  import BlogSettingTab from './BlogSettingTab.svelte';
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
    {
      name: 'Connect',
      compo: ConnectTab,
    },
    {
      name: 'BlogSetting',
      compo: BlogSettingTab,
    },
  ];

  const onClickTab = function (index: number) {
    displayIndex = index;
    console.log(displayIndex);
  };

  $: displayCompo = tabs[displayIndex].compo;

  const onKeyDown = (event: KeyboardEvent) => {
    console.log(event);
  };
</script>

<div class="modal-content vertical-tab-container retiblo-main">
  <div class="retiblo-tab-header vertical-tab-header">
    <div class="vertical-tab-header-group">
      <div class="vertical-tab-header-group-title">Retiblo Setting</div>
      <div class="vertical-tab-header-group-items">
        {#each tabs as tab, index}
          <div
            on:click={() => onClickTab(index)}
            on:keydown={onKeyDown}
            aria-hidden="true"
            class={`vertical-tab-nav-item ${displayIndex === index ? 'is-active' : ''} `}
          >
            {tab.name}
          </div>
        {/each}
      </div>
    </div>

    <p>{displayIndex}</p>
  </div>
  <div class="vertical-tab-content-container">
    <div class="vertical-tab-content">
      <svelte:component this={displayCompo} {variable}></svelte:component>
    </div>
  </div>
</div>

<style>
  .retiblo-main {
    height: 100%;
    width: 100%;
  }
  .retiblo-tab-header {
    flex: 0 0 33% !important;
  }
  .selection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    cursor: pointer;
    text-align: center;
  }
  .select-true {
    font-weight: bold;
  }
</style>
