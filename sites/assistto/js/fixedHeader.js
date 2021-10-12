/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// @ts-nocheck

window.addEventListener("localesloaded", () => {
  $("header").innerHTML = $("div.innerMenu").innerHTML;

  if (window.pagename == "index") {
    const ctaBtn = $("header .cta-button").outerHTML;
    $(
      "header .cta-button"
    ).outerHTML = `<a class="cta-button" href="#headBanner">${ctaBtn}</a>`;
    $("header .cta-button").onclick = () => {
      $("#headBanner .cta-button").onclick();
    };
    $("header a.cta-button").addEventListener("click", () => {
      $(".headHamburguer").className = "fas fa-bars headHamburguer";
      $("header").setAttribute("hamburguerExpanded", "false");
      $(".headerPicture").style.visibility = "hidden";
      setTimeout(() => {
        $("main").style.filter = "none";
        $("footer").style.filter = "none";
        if ($("#headBanner")) $("#headBanner").style.filter = "none";
      }, 190);
    });
  }

  const hamburguer = document.createElement("i");
  hamburguer.className = "fas fa-bars headHamburguer";
  hamburguer.onclick = () => {
    const val =
      $("header").getAttribute("hamburguerExpanded") == "false"
        ? "true"
        : "false";
    $("header").setAttribute("hamburguerExpanded", val);

    if (val == "true") {
      $(".headHamburguer").className = "fas fa-times headHamburguer";
      $(".headerPicture").style.visibility = "visible";

      setTimeout(() => {
        $("main").style.filter = "blur(10px)";
        $("footer").style.filter = "blur(10px)";
        if ($("#headBanner")) $("#headBanner").style.filter = "blur(10px)";
      }, 190);
    } else {
      $(".headHamburguer").className = "fas fa-bars headHamburguer";
      $(".headerPicture").style.visibility = "hidden";
      setTimeout(() => {
        $("main").style.filter = "none";
        $("footer").style.filter = "none";
        if ($("#headBanner")) $("#headBanner").style.filter = "none";
      }, 190);
    }
  };

  const picture = document.createElement("img");
  picture.src = "assets/imgs/menu.png";
  picture.className = "headerPicture";
  picture.style.visibility = "hidden";
  const slogan = document.createElement("span");

  $("header").append(hamburguer);
  //$('header .menu .cta-button').insertAdjacentHTML('beforeBegin', picture.outerHTML);
  $("header").append(picture);
});

const element = {
  index: "#headBanner",
  learn: "section.headBanner",
  article: "header",
};

window.onscroll = () => {
  const scrollval = document.documentElement.scrollTop;

  if (
    scrollval >= $(element[window.pagename]).clientHeight &&
    document.documentElement.clientWidth >= 800
  ) {
    $("header").style.visibility = "visible";
    $("header").style.opacity = "1";
  } else {
    $("header").style.opacity = "0";
    $("header").style.visibility = "hidden";
  }
};
