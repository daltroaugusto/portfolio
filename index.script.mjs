// @ts-nocheck

import LocaleLoader from "./libs/localeloader/localeloader.js";
import Metaloader from "./libs/metaloader/metaloader.js";

const $ = el => document.querySelector(el);
const locales = new LocaleLoader("./locales/index.json");

locales.initialize().then(() => {
  Metaloader({
    title: locales.getString("title"),
    description: locales.getString("slogan"),
    author: "Daltro Augusto",
  });

  tippy('.social-links i.fa-linkedin-in', {
    content: 'LinkedIn',
    placement: 'bottom'
  });

  tippy('.social-links i.fa-shopping-cart', {
    content: locales.getString('socialBuy'),
    placement: 'bottom'
  });

  tippy('.social-links i.fa-graduation-cap', {
    content: locales.getString('socialAcademic'),
    placement: 'bottom'
  });
});