if (!window.isMobile.any) {
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
