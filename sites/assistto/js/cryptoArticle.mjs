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
