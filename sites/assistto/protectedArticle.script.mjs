/*  @license
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// @ts-nocheck

import LocaleLoader from "../../libs/localeloader/localeloader.js";
import Metaloader from "../../libs/metaloader/metaloader.js";
import crypto from "./js/cryptoArticle.mjs";

const $ = el => document.querySelector(el);
const locales = new LocaleLoader("./locales/index.json");

// passwd is potatoisgood

locales.initialize().then(() => {
  Metaloader({
    title: locales.getString("article2.title") + " | Assistto",
    description: locales.getString("lorem"),
    author: "Daltro Augusto",
  });

  const wrongPasswd = () => {
    $("div.wrongPasswd").style.visibility = "visible";
  },
  showArticle = corpus => {
    $("section#auth").className =
      "animate__animated animate__fadeOut animate__faster";
    $("article").style.opacity = 0;
    $("article").style.display = "block";
    $(".content").insertAdjacentHTML("afterBegin", corpus);
    $(`article div[lang="${locales.locale}"]`).style.display = "block";

    $("section#auth").onanimationend = e => {
      e.target.outerHTML = "";
      $("article").style.opacity = 1;
    };
  };

fetch("./assets/articles/p-article1.txt").then(r => {
  r.text().then(encoded => {
    $("#articlePasswd").style.visibility = "visible";
    crypto.setPasswdInputElement(
      $("#articlePasswd"),
      $keyPass,
      encoded,
      showArticle,
      wrongPasswd
    );
  });
});
});
