export const Effect = {
  "shadow": {
    "dashboardCard": {
      "normal": "var(--effect-shadow-dashboardCard-normal)" as string,
      "hoverFloat": "var(--effect-shadow-dashboardCard-hoverFloat)" as string
    },
    "listItem": {
      "hover": "var(--effect-shadow-listItem-hover)" as string,
      "selected": "var(--effect-shadow-listItem-selected)" as string
    },
    "menu": {
      "default": "var(--effect-shadow-menu-default)" as string,
      "above": "var(--effect-shadow-menu-above)" as string
    },
    "button": {
      "cta": "var(--effect-shadow-button-cta)" as string,
      "ordinary": "var(--effect-shadow-button-ordinary)" as string
    },
    "previewPanel": {
      "default": "var(--effect-shadow-previewPanel-default)" as string,
      "above": "var(--effect-shadow-previewPanel-above)" as string
    },
    "tooltip": "var(--effect-shadow-tooltip)" as string
  },
  "glow": {
    "toast": {
      "blue": "var(--effect-glow-toast-blue)" as string,
      "red": "var(--effect-glow-toast-red)" as string,
      "green": "var(--effect-glow-toast-green)" as string,
      "yellow": "var(--effect-glow-toast-yellow)" as string
    }
  },
  "outline": {
    "hover": "var(--effect-outline-hover)" as string,
    "activeFocus": "var(--effect-outline-activeFocus)" as string,
    "error": "var(--effect-outline-error)" as string,
    "notice": "var(--effect-outline-notice)" as string
  }
} as const;
