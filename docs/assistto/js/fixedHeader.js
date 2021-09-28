document.documentElement.addEventListener("localesloaded", () => {
  $("header").innerHTML = $("div.innerMenu").innerHTML;

  const ctaBtn = $("header .cta-button").outerHTML;
  $("header .cta-button").outerHTML = `<a href="#headBanner">${ctaBtn}</a>`;
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
  window.onscroll = (e) => {
    const scrollval = document.documentElement.scrollTop;

    if (scrollval >= $("#headBanner").clientHeight) {
      $("header").style.visibility = "visible";
      $("header").style.opacity = "1";
    } else {
      $("header").style.opacity = "0";
      $("header").style.visibility = "hidden";
    }
  };
}
