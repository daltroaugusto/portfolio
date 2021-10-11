/** @license
  Metaloader - ES6 function to easily get organized all metatags for your static website.
  Copyright (C) 2021 Daltro A. Campanher de Souza

  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 3 of the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with this program; if not, write to the Free Software Foundation,
  Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// @ts-nocheck

/**
 * Metaloader - ES6 function to easily get organized all metatags for your static website.
 *
 * @namespace Metaloader
 * @async
 * @param {Object} data - Object with jsonSource URL or with accepted keys: charset, title, description, keywords, robots, author, creator, canonical, locale, type, image, url, site_name, viewport.
 * @param {String|false} eventListener - Window event to be awaited. If falsy or by default, meta will be appended immediately.
 * @param {Boolean} newline - Sets if newline will be added between each meta element. Default is false.
 */
export default async (data, eventListener = false, newline = false) => {
  let obj = {
    /**
     * Map: [name, typeof, og<0||undefined:no,1:og-only,2:og-both>]
     */
    ValidProps: [
      ["charset", "string"],
      ["title", "string", 2],
      ["description", "string", 2],
      ["keywords", "string"],
      ["author", "string"],
      ["creator", "string"],
      ["canonical", "link:string"],
      ["robots", "string"],
      ["locale", "string", 1],
      ["type", "string", 1],
      ["image", "string", 1],
      ["url", "string", 1],
      ["site_name", "string", 1],
      ["viewport", "string"],
    ],
  };

  if (data.jsonSource) {
    obj.eventListener = eventListener;
    obj.newline = newline;

    await loadJson(data.jsonSource);
    buildData();
  } else {
    obj.eventListener = eventListener;
    obj.newline = newline;
    obj.data = data;

    buildData();
  }

  /**
   * Fetch data.jsonSource and loads into function.
   * @async
   * @returns {Promise}
   * @memberof Metaloader
   * @private
   */
  async function loadJson() {
    return new Promise((resolve, reject) => {
      fetch(this.jsonSource)
        .then(r => {
          r.json().then(data => {
            obj.data = data;
            resolve();
          });
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * Builds bundled html to be appended just-in-time or handled to a specific function defined in eventListener.
   * @memberof Metaloader
   * @private
   */
  function buildData() {
    let $html = "";

    try {
      for (const key in obj.data) {
        $html += parseData(key, obj.data[key]);
      }
    } catch (err) {
      throw new Error(err);
    }

    if (obj.eventListener) {
      window.addEventListener(obj.eventListener, () => appendMeta($html));
    } else {
      appendMeta($html);
    }
  }

  /**
   * Parses each single data input.
   * @param {String} key 
   * @param {String} data 
   * @returns {(String|'')} The parsed HTML or an empty string.
   * @memberof Metaloader
   * @private
   */
  function parseData(key, data) {
    for (const prop of obj.ValidProps) {
      if (
        // check if is valid/supported key
        prop[0] == key &&
        (typeof data == prop[1] || typeof data == prop[1].split(":")[1]) &&
        key != "charset"
      ) {
        let $return = "";

        if (prop[1].indexOf(":")) {
          switch (prop[1].split(":")[0]) {
            case "link":
              return `<link rel="${key}" href="${data}" />${_newline()}`;
          }
        }

        if (!prop[2] || prop[2] == 2) {
          // og is none or both
          $return += `<meta name="${key}" content="${data}" />${_newline()}`;
        }

        if (prop[2] == 1 || prop[2] == 2) {
          // og is og or both
          $return += `<meta property="og:${key}" content="${data}" />${_newline()}`;
        }

        return $return;
      }
    }
    return ""; // escaped from iteration? then it's not valid, returns empty
  }

  /**
   * Embeds title and charset elements, if needed, and appends the full previously generated metatags.
   * @param {String} html 
   * @memberof Metaloader
   * @private
   */
  function appendMeta(html) {
    const $ = el => document.querySelector(el);

    if (!$("title")) {
      $("head").insertAdjacentHTML(
        "afterBegin",
        `<title>${obj.data.title}</title>`
      );
    }
    if (!$("meta[charset]")) {
      $("title").insertAdjacentHTML(
        "afterEnd",
        `\n<meta charset="${obj.data.charset || "utf-8"}" />`
      );
    }

    $("meta[charset]").insertAdjacentHTML("afterEnd", html);
  }

  /**
   * Returns "\n" is newline is true.
   * @returns {(String|'')}
   * @memberof Metaloader
   * @private
   */
  function _newline() {
    if (obj.newline) {
      return "\n";
    } else {
      return "";
    }
  }
};
