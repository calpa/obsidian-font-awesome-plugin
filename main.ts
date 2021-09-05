import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface PluginSettings {
  kitName: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
  kitName: "default",
};

export default class FontAwesomePlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();

    const script = document.createElement("script");
    script.src = `https://kit.fontawesome.com/${this.settings.kitName}.js`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    this.addSettingTab(new FontAwesomeSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class FontAwesomeSettingTab extends PluginSettingTab {
  plugin: FontAwesomePlugin;

  constructor(app: App, plugin: FontAwesomePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "Font Awesome" });

    new Setting(containerEl).setName("Kit Name").addText((text) =>
      text
        .setPlaceholder("Enter your kit name")
        .setValue("")
        .onChange(async (value) => {
          this.plugin.settings.kitName = value;
          await this.plugin.saveSettings();
        })
    );
  }
}
