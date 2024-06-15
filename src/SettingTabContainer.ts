import { PluginSettingTab, App } from 'obsidian';
import Component from '../src/component/SettingTabCompo.svelte';
import MyPlugin from 'main';
export default class SettingTabContainer extends PluginSettingTab {
  plugin: MyPlugin;
  private component: Component;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    if (!this.component)
      this.component = new Component({
        target: containerEl,
        props: {
          variable: 1,
        },
      });
  }
}
