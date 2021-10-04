/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const locales = ["en", "pt"];
const $fallback = 'en';
const browserLang = navigator.language.substr(0, 2);

const iteratorMixin = (localeinput) => {
  for (const node of document.querySelectorAll("[string]")) {
    const nodeString = node.getAttribute("string");
    const thestring = eval(`localeinput.${nodeString}`);

    node.innerHTML = thestring;
  }

  for(const node of document.querySelectorAll('[placeholderstring]')) {
    const phString = node.getAttribute('placeholderstring');
    const thestring = eval(`localeinput.${phString}`);

    node.setAttribute('placeholder', thestring);
  }

  document.documentElement.dispatchEvent(new Event("localesloaded"));
};

export function getCurrentLocale() {
  if (locales.indexOf(browserLang) > -1) {
    return browserLang;
  } else {
    return $fallback;
  }
}

export function loadLocale() {
  if (locales.indexOf(browserLang) > -1) {
    fetch(`locales/${browserLang}.json`).then((res) => {
      res.json().then((locale) => {
        iteratorMixin(locale);
      });
    });
  } else {
    // fallback to english]
    fetch(`locales/${$fallback}.json`).then((res) => {
      res.json().then((locale) => {
        iteratorMixin(locale);
      });
    });
  }
}
