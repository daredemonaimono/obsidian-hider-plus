export interface HideTarget {
  id: string;
  name: string;
  desc: string;
  /** CSS selector(s) to hide while the toggle is on. */
  selector: string;
  /** Full CSS to use instead of `selector { display: none }`. */
  css?: string;
}

// Add one entry here to add one more thing that can be hidden.
export const TARGETS: HideTarget[] = [
  {
    id: "statusBar",
    name: "Status bar",
    desc: "Hide the bar at the bottom of the window.",
    selector: ".status-bar",
  },
  {
    id: "ribbon",
    name: "Ribbon",
    desc: "Hide the left icon bar.",
    selector: ".workspace-ribbon.mod-left, .side-dock-ribbon",
  },
  {
    id: "tabBar",
    name: "Tabs",
    desc: "Hide the note tabs and the new-tab button.",
    selector: ".mod-root .workspace-tab-header-container-inner",
  },
  {
    id: "topBar",
    name: "Top bar buttons",
    desc: "Hide the sidebar tab icons, the sidebar toggles and the tab list dropdown.",
    selector:
      ".mod-left-split .workspace-tab-header-container, .mod-right-split .workspace-tab-header-container, .mod-root .workspace-tab-header-tab-list, .sidebar-toggle-button",
  },
  {
    id: "navButtons",
    name: "File explorer: all buttons",
    desc: "Hide the whole button row at the top of the file explorer.",
    selector: '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container',
  },
  {
    id: "navNewNote",
    name: "File explorer: New note",
    desc: "Hide the \"New note\" button in the file explorer.",
    selector: '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container > :nth-child(1)',
  },
  {
    id: "navNewFolder",
    name: "File explorer: New folder",
    desc: "Hide the \"New folder\" button in the file explorer.",
    selector: '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container > :nth-child(2)',
  },
  {
    id: "navSort",
    name: "File explorer: Change sort order",
    desc: "Hide the \"Change sort order\" button in the file explorer.",
    selector: '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container > :nth-child(3)',
  },
  {
    id: "navAutoReveal",
    name: "File explorer: Auto-reveal current file",
    desc: "Hide the \"Auto-reveal current file\" button in the file explorer.",
    selector: '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container > :nth-child(4)',
  },
  {
    id: "navCollapseAll",
    name: "File explorer: Expand / collapse all",
    desc: "Hide the \"Expand / collapse all\" button in the file explorer.",
    selector: '.workspace-leaf-content[data-type="file-explorer"] .nav-buttons-container > :nth-child(5)',
  },
  {
    id: "viewHeader",
    name: "Note header",
    desc: "Hide the title bar and buttons at the top of each note.",
    selector: ".view-header",
  },
  {
    id: "inlineTitle",
    name: "Inline title",
    desc: "Hide the note title shown above the content.",
    selector: ".inline-title",
  },
  {
    id: "properties",
    name: "Properties",
    desc: "Hide the properties (frontmatter) block in notes.",
    selector: ".metadata-container",
  },
  {
    id: "scrollbars",
    name: "Scrollbars",
    desc: "Hide scrollbars everywhere.",
    selector: "*::-webkit-scrollbar",
    css: "* { scrollbar-width: none !important; } *::-webkit-scrollbar, *::-webkit-scrollbar-thumb { display: none !important; width: 0 !important; height: 0 !important; }",
  },
  {
    id: "vaultTitle",
    name: "Vault name",
    desc: "Hide the vault name in the file explorer.",
    selector: ".nav-folder-title[data-path='/'], .workspace-sidedock-vault-profile",
  },
];
