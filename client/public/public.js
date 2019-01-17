// Checks if browser is Safari Mobile, and adjusts background CSS accordingly

var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

function safariBackgroundCompatibility() {
  if (iOSSafari) {
    elems = document.getElementsByClassName('race-block');

    for (let i = 0; i < elems.length; i++) {
      elems[i].style.backgroundAttachment = "scroll";
    }
  }
}