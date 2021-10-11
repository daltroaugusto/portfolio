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

const $ = el => document.querySelector(el);
const locales = new LocaleLoader("./locales/index.json");

locales.initialize().then(() => {
  Metaloader({
    title: locales.getString("article.title") + ' | Assistto',
    description: locales.getString('lorem'),
    author: "Daltro Augusto",
  });
});