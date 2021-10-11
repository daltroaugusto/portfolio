if (window.pagename == "index") {
  let setMapHeight = () => {
    if (window.isMobile.any) {
      document.querySelector(".map-wrapper").style.height =
        document.querySelector("section.ourHistory").clientWidth * 0.565 + "px";
    } else {
      document.querySelector(".map-wrapper").style.height =
        (document.querySelector("section.ourHistory").clientWidth / 2) * 0.565 +
        "px";
    }
  };

  setMapHeight();
  document.documentElement.addEventListener("resize", setMapHeight);
}
