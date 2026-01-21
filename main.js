// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(reg => {
        console.log("Service Worker registered:", reg.scope);
      })
      .catch(err => {
        console.error("Service Worker registration failed:", err);
      });
  });
}

// Handle PWA Install Prompt
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("PWA install prompt ready");
});

// Optional: trigger install manually later
function installPWA() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === "accepted") {
      console.log("User accepted PWA install");
    } else {
      console.log("User dismissed PWA install");
    }
    deferredPrompt = null;
  });
}