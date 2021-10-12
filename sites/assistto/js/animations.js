/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

if (!window.isMobile.any) {
  if (window.pagename == "index") {
    const scrollAnimations = [
      Scrollmotion(
        ".sm-fades.sm-ratio5,.ourArticles > h1,.articlesList,.ourHistory > h1",
        {
          animateItem: (i) => {
            i.style.visibility = "visible";
            i.className += " animate__animated animate__fadeInDown";
          },
          prepareItem: (i) => {
            i.style.visibility = "hidden";
          },
          ratio: 0.5,
        }
      ),
      Scrollmotion(".sm-zoom", {
        animateItem: (i) => {
          i.style.visibility = "visible";
          i.className += " animate__animated animate__zoomIn";
        },
        prepareItem: (i) => {
          i.style.visibility = "hidden";
        },
        ratio: 0.2,
      }),
      Scrollmotion(".testimonialsWrap", {
        animateItem: (i) => {
          i.style.visibility = "visible";
          i.className += " animate__animated animate__zoomIn";
        },
        prepareItem: (i) => {
          i.style.visibility = "hidden";
        },
        ratio: 0.2,
      }),
      Scrollmotion(".sm-bounce", {
        animateItem: (i) => {
          i.style.visibility = "visible";
          i.className += " animate__animated animate__bounceIn";
        },
        prepareItem: (i) => {
          i.style.visibility = "hidden";
        },
        ratio: 0.2,
      }),
      Scrollmotion(".sm-bouncedown", {
        animateItem: (i) => {
          i.style.visibility = "visible";
          i.className += " animate__animated animate__bounceInDown";
        },
        prepareItem: (i) => {
          i.style.visibility = "hidden";
        },
        ratio: 0.2,
      }),
      Scrollmotion(".sm-faderight", {
        animateItem: (i) => {
          i.style.visibility = "visible";
          i.className += " animate__animated animate__fadeInRight";
        },
        prepareItem: (i) => {
          i.style.visibility = "hidden";
        },
        ratio: 0.2,
      }),
      Scrollmotion(".sm-fadeleft", {
        animateItem: (i) => {
          i.style.visibility = "visible";
          i.className += " animate__animated animate__fadeInLeft";
        },
        prepareItem: (i) => {
          i.style.visibility = "hidden";
        },
        ratio: 0.2,
      }),
    ];

    for (scrollAnimation of scrollAnimations) {
      scrollAnimation.start();
    }
  }
}
