/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
