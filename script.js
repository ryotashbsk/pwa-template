if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker Registered');
  });

  const button = document.querySelector('#installApp');

  if (button) {
    // Reference:
    // https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

    let deferredPrompt;
    document.documentElement.classList.remove('enable-pwa');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;

      document.documentElement.classList.add('enable-pwa');

      button.addEventListener('click', () => {
        document.documentElement.classList.remove('enable-pwa');

        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('accepted');
          } else {
            console.log('unaccepted');
          }
          deferredPrompt = null;
        });
      });
    });
  }
}
