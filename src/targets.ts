export type Lang = "en" | "ja";
export type Text = Record<Lang, string>;

export interface HideTarget {
  id: string;
  name: Text;
  desc: Text;
  /** CSS selector(s) to hide while the toggle is on. */
  selector: string;
  /** Full CSS to use instead of `selector { display: none }`. */
  css?: string;
  /** id of the parent toggle; turning the parent on turns this one on too. */
  parent?: string;
}

const NAV = '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container';

// Add one entry here to add one more thing that can be hidden.
// A child follows its parent in the list and sets `parent`.
export const TARGETS: HideTarget[] = [
  {
    id: "statusBar",
    name: { en: "Status bar", ja: "ステータスバー" },
    desc: { en: "Hide the bar at the bottom of the window.", ja: "ウィンドウ下部のバーを隠します。" },
    selector: ".status-bar",
  },
  {
    id: "ribbon",
    name: { en: "Ribbon", ja: "リボン" },
    desc: { en: "Hide the left icon bar.", ja: "左端のアイコンバーを隠します。" },
    selector: ".workspace-ribbon.mod-left, .side-dock-ribbon",
  },
  {
    id: "tabBar",
    name: { en: "Tabs", ja: "タブ" },
    desc: { en: "Hide the note tabs and the new-tab button.", ja: "ノートのタブと新規タブボタンを隠します。" },
    selector: ".mod-root .workspace-tab-header-container-inner",
  },
  {
    id: "topBar",
    name: { en: "Top bar buttons", ja: "トップバーのボタン" },
    desc: {
      en: "Hide the sidebar tab icons.",
      ja: "サイドバーのアイコン列を隠します。",
    },
    selector:
      ".mod-left-split .workspace-tab-header-container-inner, .mod-right-split .workspace-tab-header-container-inner",
  },
  {
    id: "tabList",
    name: { en: "Tab list dropdown", ja: "タブ一覧ボタン(▾)" },
    desc: {
      en: "Hide the ▾ button that lists all open tabs.",
      ja: "開いているタブの一覧を出す「▾」ボタンだけを隠します。",
    },
    selector: ".workspace-tab-header-tab-list",
  },
  {
    id: "sidebarToggle",
    name: { en: "Sidebar toggle buttons", ja: "サイドバー開閉ボタン" },
    desc: {
      en: "Hide the buttons that open and close the left and right sidebars.",
      ja: "左右のサイドバーを開閉するボタンを隠します。",
    },
    selector: ".sidebar-toggle-button",
  },
  {
    id: "navButtons",
    name: { en: "File explorer buttons", ja: "ファイルエクスプローラーのボタン" },
    desc: {
      en: "Hide the whole button row at the top of the file explorer. Turns on all the buttons below.",
      ja: "ファイルエクスプローラー上部のボタン行をまとめて隠します。下の個別ボタンもすべてオンになります。",
    },
    selector: NAV,
  },
  {
    id: "navNewNote",
    parent: "navButtons",
    name: { en: "New note", ja: "新規ノート" },
    desc: { en: 'Hide the "New note" button.', ja: "「新規ノート」ボタンを隠します。" },
    selector: `${NAV} > :nth-child(1)`,
  },
  {
    id: "navNewFolder",
    parent: "navButtons",
    name: { en: "New folder", ja: "新規フォルダ" },
    desc: { en: 'Hide the "New folder" button.', ja: "「新規フォルダ」ボタンを隠します。" },
    selector: `${NAV} > :nth-child(2)`,
  },
  {
    id: "navSort",
    parent: "navButtons",
    name: { en: "Change sort order", ja: "ソート順の変更" },
    desc: { en: 'Hide the "Change sort order" button.', ja: "「ソート順の変更」ボタンを隠します。" },
    selector: `${NAV} > :nth-child(3)`,
  },
  {
    id: "navAutoReveal",
    parent: "navButtons",
    name: { en: "Auto-reveal current file", ja: "現在のファイルを自動表示" },
    desc: { en: 'Hide the "Auto-reveal current file" button.', ja: "「現在のファイルを自動表示」ボタンを隠します。" },
    selector: `${NAV} > :nth-child(4)`,
  },
  {
    id: "navCollapseAll",
    parent: "navButtons",
    name: { en: "Expand / collapse all", ja: "すべて展開 / 折りたたみ" },
    desc: { en: 'Hide the "Expand all" button.', ja: "「すべて展開」ボタンを隠します。" },
    selector: `${NAV} > :nth-child(5)`,
  },
  {
    id: "viewHeader",
    name: { en: "Note header", ja: "ノートヘッダー" },
    desc: {
      en: "Hide the title bar and buttons at the top of each note.",
      ja: "各ノート上部のタイトルバーとボタンを隠します。",
    },
    selector: ".view-header",
  },
  {
    id: "inlineTitle",
    name: { en: "Inline title", ja: "インラインタイトル" },
    desc: { en: "Hide the note title shown above the content.", ja: "本文の上に表示されるノート名を隠します。" },
    selector: ".inline-title",
  },
  {
    id: "properties",
    name: { en: "Properties", ja: "プロパティ" },
    desc: { en: "Hide the properties (frontmatter) block in notes.", ja: "ノート内のプロパティ(フロントマター)を隠します。" },
    selector: ".metadata-container",
  },
  {
    id: "scrollbars",
    name: { en: "Scrollbars", ja: "スクロールバー" },
    desc: { en: "Hide scrollbars everywhere.", ja: "すべてのスクロールバーを隠します。" },
    selector: "*::-webkit-scrollbar",
    css: "* { scrollbar-width: none !important; } *::-webkit-scrollbar, *::-webkit-scrollbar-thumb { display: none !important; width: 0 !important; height: 0 !important; }",
  },
  {
    id: "vaultTitle",
    name: { en: "Vault name", ja: "Vault名" },
    desc: { en: "Hide the vault name in the file explorer.", ja: "ファイルエクスプローラーのVault名を隠します。" },
    selector: ".nav-folder-title[data-path='/'], .workspace-sidedock-vault-profile",
  },
];
