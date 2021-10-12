/*  @license
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// @ts-nocheck

const article = {
  checkPasswd: (passwd, key) => {
    return new Promise((resolve) => {
      argon2
        .verify({
          pass: passwd,
          encoded: key,
        })
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          resolve(false);
        });
    });
  },
  generatePasswdKey: (passwd) => {
    argon2
      .hash({
        pass: passwd,
        salt: "assisttobydaltroaugusto",
        time: 3,
        hashLen: 256,
        type: argon2.ArgonType.Argon2id,
      })
      .then((r) => {
        console.log(`key is ${r.encoded}`);
      })
      .catch((e) => {
        console.log("Error is:");
        console.log(e);
      });
  },
  generateDataKey: (data, passwd) => {
    try {
      const key = CryptoJS.AES.encrypt(data, passwd).toString();
      console.log(`key is\n${key}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  decryptArticle: (data, passwd) => {
    try {
      const response = CryptoJS.AES.decrypt(data, passwd);
      return response.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  setPasswdInputElement: (el, keyPass, keyData, callback, reject) => {
    const inputTimeout = 250;

    el.addEventListener("input", (e) => {
      const value = e.target.value;

      setTimeout(() => {
        if (e.target.value != value) return null;

        article.checkPasswd(value, keyPass).then((r) => {
          if (r) {
            const decrypted = article.decryptArticle(keyData, value);

            if (!decrypted) {
              reject();
            } else {
              callback(decrypted);
            }
          } else reject();
        });
      }, inputTimeout);
    });

    if(el.parentElement.querySelector('.revealfalse')) {
      el.parentElement.querySelector('.revealfalse').onclick = (e) => {
        el.setAttribute('type', 'text');
        el.setAttribute('reveal', 'true');
      };

      el.parentElement.querySelector('.revealtrue').onclick = (e) => {
        el.setAttribute('type', 'password');
        el.setAttribute('reveal', 'false');
      };
    }
    //console.log(el.parentElement.childNodes);
  },
};

export default article;
