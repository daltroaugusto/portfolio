/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

document.documentElement.addEventListener("localesloaded", () => {
  $("header").innerHTML = $("div.innerMenu").innerHTML;

  const ctaBtn = $("header .cta-button").outerHTML;
  $("header .cta-button").outerHTML = `<a class="cta-button" href="#headBanner">${ctaBtn}</a>`;
  $("header .cta-button").onclick = () => {
    $("#headBanner .cta-button").onclick();
  };

  const hamburguer = document.createElement('i');
  hamburguer.className = 'fas fa-bars headHamburguer';
  hamburguer.onclick = () => {
    const val = ($('header').getAttribute('hamburguerExpanded') == 'false') ? 'true' : 'false';
    $('header').setAttribute('hamburguerExpanded', val);
  };

  $('header').append(hamburguer);
});

if (!window.isMobile.any) {
  const element = {
    index: "#headBanner",
    learn: "section.headBanner"
  };

  window.onscroll = (e) => {
    const scrollval = document.documentElement.scrollTop;

    if (scrollval >= $(element[window.pagename]).clientHeight) {
      $("header").style.visibility = "visible";
      $("header").style.opacity = "1";
    } else {
      $("header").style.opacity = "0";
      $("header").style.visibility = "hidden";
    }
  };
}
