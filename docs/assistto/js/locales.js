
const locales = ["en", "pt"];
const browserLang = navigator.language.substr(0, 2);

if(locales.indexOf(browserLang) > -1) {
  fetch(`locales/${browserLang}.json`).then(res => {
    res.json().then(locale => {
      for(node of document.querySelectorAll('[string]')) {
        const nodeString = node.getAttribute('string');
        const thestring = eval(`locale.${nodeString}`);
        
        node.innerHTML = thestring;
      }

      document.documentElement.dispatchEvent(new Event('localesloaded'));
    });
  });
} else {
  // fallback to english]
  fetch(`locales/en.json`).then(res => {
    res.json().then(locale => {
      for(node of document.querySelectorAll('[string]')) {
        const nodeString = node.getAttribute('string');
        const thestring = eval(`locale.${nodeString}`);
        
        node.innerHTML = thestring;
      }

      document.documentElement.dispatchEvent(new Event('localesloaded'));
    });
  });
}
