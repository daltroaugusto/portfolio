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
  });
