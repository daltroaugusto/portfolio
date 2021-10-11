/** @license
  Copyright 2021 Daltro A. Campanher de Souza

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
// @ts-nocheck

/**
 * Metaloader - ES6 function to easily get organized all metatags for your static website.
 *
 * @async
 * @param {Object} data - Object with jsonSource URL or with accepted keys: charset, title, description, keywords, robots, author, creator, canonical, locale, type, image, url, site_name, viewport.
 * @param {String|false} eventListener - Window event to be awaited. If falsy or by default, meta will be appended immediately.
 * @param {Boolean} newline - Sets if newline will be added between each meta element. Default is false.
 */
export default async (data, eventListener = false, newline = false) => {
  let obj = {
    ValidProps: [
      // [name, type, og<0||undefined:no,1:og-only,2:og-both><optional>, tt<>]
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
    obj.jsonSource = data.jsonSource;

    await loadJson(obj.jsonSource);
    buildData();
  } else {
    obj.eventListener = eventListener;
    obj.newline = newline;
    obj.data = data;

    buildData();
  }

  async function loadJson() {
    return new Promise((resolve, reject) => {
      fetch(obj.jsonSource)
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

  function _newline() {
    if (obj.newline) {
      return "\n";
    } else {
      return "";
    }
  }
};
