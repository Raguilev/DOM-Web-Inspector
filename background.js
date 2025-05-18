chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle-inspector",
    title: "Activar DOM Inspector",
    contexts: ["action"]
  });

  chrome.storage.local.set({ inspectorActive: false });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggle-inspector") {
    chrome.storage.local.get("inspectorActive", (data) => {
      const isActive = data.inspectorActive;

      if (!isActive) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["inspector.js"]
        });
        chrome.contextMenus.update("toggle-inspector", { title: "Desactivar DOM Inspector" });
        chrome.storage.local.set({ inspectorActive: true });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            if (window.__DOM_INSPECTOR_ACTIVE__) {
              document.removeEventListener('click', window.__DOM_INSPECTOR_HANDLER__, true);
              window.__DOM_INSPECTOR_ACTIVE__ = false;
              console.clear();
              console.log("🛑 DOM Inspector DESACTIVADO (desde menú)");
            }
          }
        });
        chrome.contextMenus.update("toggle-inspector", { title: "Activar DOM Inspector" });
        chrome.storage.local.set({ inspectorActive: false });
      }
    });
  }
});
