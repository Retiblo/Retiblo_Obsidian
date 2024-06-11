import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
// Remember to rename these classes and interfaces!
import SettingTabModal from './src/SettingTabModal';
import SettingTabContainer from './src/SettingTabContainer';

interface MyPluginSettings {
  mySetting: string;
}

export const VIEW_TYPE_EXAMPLE = 'example-view';
const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: 'default',
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();
    // this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new SettingTabModal(leaf));

    // This creates an icon in the left ribbon.
    const ribbonIconEl = this.addRibbonIcon(
      'dice',
      'Retiblo Obsidian',
      (evt: MouseEvent) => {
        // Called when the user clicks the icon.
        new Notice('This is a notice!');
        // this.activateView();
      }
    );
    // Perform additional things with the ribbon
    ribbonIconEl.addClass('my-plugin-ribbon-class');

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText('Status Bar Text');

    // TODO: this part should sperate to other files to manage only addCommands

    // This adds a simple command that can be triggered anywhere
    this.addCommand({
      id: 'open-sample-modal-simple',
      name: 'Open sample modal (simple)',
      callback: () => {
        new SettingTabModal(this.app).open();
      },
    });
    // This adds an editor command that can perform some operation on the current editor instance
    this.addCommand({
      id: 'sample-editor-command',
      name: 'Sample editor command',
      editorCallback: (editor: Editor, _) => {
        console.log(editor.getSelection());
        editor.replaceSelection('Sample Editor Command');
      },
    });
    // This adds a complex command that can check whether the current state of the app allows execution of the command
    this.addCommand({
      id: 'open-sample-modal-complex',
      name: 'Open sample modal (complex)',
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView =
          this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            new SettingTabModal(this.app).open();
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      },
    });
    // to here

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new SettingTabContainer(this.app, this));

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      console.log('click', evt);
    });

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(
      window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000)
    );
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
