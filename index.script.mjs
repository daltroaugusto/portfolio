/*  @license
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// @ts-nocheck

import LocaleLoader from "./libs/localeloader/localeloader.js";
import Metaloader from "./libs/metaloader/metaloader.js";

const $ = el => document.querySelector(el);
const $$ = els => document.querySelectorAll(els);
const locales = new LocaleLoader("./locales/index.json");

locales
  .initialize()
  .then(() => {
    Metaloader({
      title: locales.getString("title"),
      description: locales.getString("slogan"),
      author: "Daltro Augusto",
      locale: locales.locale,
      url: "https://daltroaugusto.github.io/portfolio/",
      site_name: locales.getString('title'),
      viewport: "width=device-width, initial-scale=1.0"
    });
  })
  .then(() => {
    tippy(".social-links i.fa-linkedin-in", {
      content: "LinkedIn",
      placement: "bottom",
    });

    tippy(".social-links i.fa-shopping-cart", {
      content: locales.getString("socialBuy"),
      placement: "bottom",
    });

    tippy(".social-links i.fa-graduation-cap", {
      content: locales.getString("socialAcademic"),
      placement: "bottom",
    });
  })
  .then(() => {
    return fetch("./ejs/sites.ejs");
  })
  .then(r => r.text())
  .then(sitestemplate => {
    const html = ejs.render(sitestemplate, {
      sites: locales.getString("sites"),
      viewSiteCaption: locales.getString("seeSite"),
      viewSourceCaption: locales.getString("seeSource"),
    });

    $("main div.sites").innerHTML = html;
  })
  .then(() => {
    $$(".sites article[site-id]").forEach(site => {
      const id = site.getAttribute("site-id");

      new Swiper(`.sites article[site-id="${id}"] div.swiper`, {
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: `.sites article[site-id="${id}"] div.swiper .swiper-button-next`,
          prevEl: `.sites article[site-id="${id}"] div.swiper .swiper-button-prev`,
        },
      });
    });
  })
  .then(() => {
    $('header').style.opacity = '1';
    $('main').style.opacity = '1';
  });
