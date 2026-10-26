import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { HideTarget, TARGETS } from "./targets";

type HiderSettings = Record<string, boolean>;

const STYLE_ID = "hider-plus-style";

export default class HiderPlus extends Plugin {
  settings: HiderSettings = {};

  async onload() {
    this.settings = Object.assign({}, await this.loadData());
    this.applyStyle();
    this.addSettingTab(new HiderPlusSettingTab(this.app, this));
  }

  onunload() {
    document.getElementById(STYLE_ID)?.remove();
  }

  async setHidden(target: HideTarget, hidden: boolean) {
    this.settings[target.id] = hidden;
    await this.saveData(this.settings);
    this.applyStyle();
  }

  applyStyle() {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    const rules = TARGETS.filter((t) => this.settings[t.id]).map((t) => t.css ?? `${t.selector} { display: none !important; }`);
    // With tabs and top bar buttons both hidden, collapse the empty header line too.
    if (this.settings.tabBar && this.settings.topBar) {
      rules.push(".mod-root .workspace-tab-header-container { display: none !important; }");
    }
    el.textContent = rules.join("\n");
  }
}

class HiderPlusSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: HiderPlus) {
    super(app, plugin);
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    for (const target of TARGETS) {
      new Setting(containerEl)
        .setName(target.name)
        .setDesc(target.desc)
        .addToggle((t) =>
          t.setValue(!!this.plugin.settings[target.id]).onChange((v) => this.plugin.setHidden(target, v))
        );
    }
  }
}
