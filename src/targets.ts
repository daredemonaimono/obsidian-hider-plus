export interface HideTarget {
  id: string;
  name: string;
  desc: string;
  /** CSS selector(s) to hide while the toggle is on. */
  selector: string;
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
    selector: ".workspace-ribbon.mod-left",
  },
  {
    id: "tabBar",
    name: "Tab bar",
    desc: "Hide the tab headers above each pane.",
    selector: ".workspace-tabs .workspace-tab-header-container",
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
  },
  {
    id: "vaultTitle",
    name: "Vault name",
    desc: "Hide the vault name in the file explorer.",
    selector: ".nav-folder-title[data-path='/'], .workspace-sidedock-vault-profile",
  },
];
