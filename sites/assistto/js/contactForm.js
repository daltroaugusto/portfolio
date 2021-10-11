/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

window.addEventListener('localesloaded', () => {
  let quill = new Quill('#message', {
    theme: 'snow'
  });
});

$('.cta-button').onclick = (e) => {
  $('.innerBanner').style.animation = 'bounceOutDown';
  $('.innerBanner').style.animationDuration = '1s';

  if($('header').getAttribute('hamburguerExpanded') == 'true') $('header').setAttribute('hamburguerExpanded', 'false');
};

$('.innerBanner').onanimationend = (e) => {
  if(e.animationName == 'bounceOutDown') {
    e.target.style.display = 'none';

    $('.innerContact').style.animation = 'bounceInDown';
    $('.innerContact').style.animationDuration = '.5s';
    $('.innerContact').style.display = 'flex';

    const safesum = $('.ql-toolbar').clientHeight + $('#message').clientHeight + $('.msgSubmit').clientHeight + 80;

    if($('#headBanner').clientHeight < safesum) {
      $('#headBanner').style.height = safesum + 40 + 'px';
    }
  }
}
