let xtermModulesPromise = null;

export const loadXtermModules = () => {
  if (!xtermModulesPromise) {
    xtermModulesPromise = Promise.all([
      import("@xterm/xterm"),
      import("@xterm/addon-search"),
      import("@xterm/addon-fit"),
    ])
      .then(([xterm, addonSearch, addonFit]) => ({
        Terminal: xterm.Terminal,
        SearchAddon: addonSearch.SearchAddon,
        FitAddon: addonFit.FitAddon,
      }))
      .catch((error) => {
        xtermModulesPromise = null;
        throw error;
      });
  }

  return xtermModulesPromise;
};
