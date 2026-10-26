import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { HideTarget, Lang, TARGETS } from "./targets";

interface HiderData {
  lang: Lang;
  hide: Record<string, boolean>;
}

const STYLE_ID = "hider-plus-style";

const UI: Record<Lang, { language: string; languageDesc: string }> = {
  en: { language: "Language", languageDesc: "Language of this settings page." },
  ja: { language: "言語", languageDesc: "この設定画面の表示言語です。" },
};

function defaultLang(): Lang {
  try {
    return (window.localStorage.getItem("language") ?? "").startsWith("ja") ? "ja" : "en";
  } catch {
    return "en";
  }
}

export default class HiderPlus extends Plugin {
  data: HiderData = { lang: "en", hide: {} };

  async onload() {
    const saved = (await this.loadData()) ?? {};
    // Older versions saved the toggles as a flat { id: boolean } object.
    const hide = saved.hide ?? Object.fromEntries(Object.entries(saved).filter(([, v]) => typeof v === "boolean"));
    this.data = { lang: saved.lang ?? defaultLang(), hide };
    this.applyStyle();
    this.addSettingTab(new HiderPlusSettingTab(this.app, this));
  }

  onunload() {
    document.getElementById(STYLE_ID)?.remove();
  }

  async save() {
    await this.saveData(this.data);
    this.applyStyle();
  }

  async setHidden(target: HideTarget, hidden: boolean) {
    this.data.hide[target.id] = hidden;
    // The parent switches all of its children together.
    for (const child of TARGETS.filter((t) => t.parent === target.id)) {
      this.data.hide[child.id] = hidden;
    }
    await this.save();
  }

  applyStyle() {
    const hide = this.data.hide;
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    const rules = TARGETS.filter((t) => hide[t.id]).map((t) => t.css ?? `${t.selector} { display: none !important; }`);
    // Collapse header lines that have nothing left in them.
    const sidebarHeaderGone = hide.topBar && hide.sidebarToggle;
    if (sidebarHeaderGone) {
      rules.push(
        ".mod-left-split .workspace-tab-header-container, .mod-right-split .workspace-tab-header-container { display: none !important; }"
      );
    }
    if (hide.tabBar && hide.tabList && hide.sidebarToggle) {
      rules.push(".mod-root .workspace-tab-header-container { display: none !important; }");
    }
    // The explorer's button row doubles as the spacer next to the window buttons.
    // Once the sidebar header and that row are both gone, keep the file list below the window buttons.
    const navIds = TARGETS.filter((t) => t.parent === "navButtons").map((t) => t.id);
    const navRowGone = hide.navButtons || navIds.every((id) => hide[id]);
    if (sidebarHeaderGone && navRowGone) {
      rules.push(
        '.workspace-leaf-content[data-type="file-explorer"] .nav-files-container { margin-top: var(--header-height, 40px) !important; }'
      );
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
    const lang = this.plugin.data.lang;
    containerEl.empty();

    new Setting(containerEl)
      .setName(UI[lang].language)
      .setDesc(UI[lang].languageDesc)
      .addDropdown((d) =>
        d
          .addOption("en", "English")
          .addOption("ja", "日本語")
          .setValue(lang)
          .onChange(async (v) => {
            this.plugin.data.lang = v as Lang;
            await this.plugin.save();
            this.display();
          })
      );

    for (const target of TARGETS) {
      const setting = new Setting(containerEl)
        .setName(target.name[lang])
        .setDesc(target.desc[lang])
        .addToggle((t) =>
          t.setValue(!!this.plugin.data.hide[target.id]).onChange(async (v) => {
            await this.plugin.setHidden(target, v);
            // Children may have changed along with their parent.
            if (TARGETS.some((c) => c.parent === target.id)) this.display();
          })
        );
      if (target.parent) {
        // Indent children under their parent so the category is visible.
        setting.settingEl.style.marginLeft = "24px";
        setting.settingEl.style.paddingLeft = "12px";
        setting.settingEl.style.borderLeft = "2px solid var(--background-modifier-border)";
      }
    }
  }
}
