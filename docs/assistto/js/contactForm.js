
document.documentElement.addEventListener('localesloaded', () => {
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
