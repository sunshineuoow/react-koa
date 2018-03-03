(function(win, doc) {
  var docEl = doc.documentElement
  var resizeEvt = 'oritationchange' in win ? 'oritationchage' : 'resize'
  var racalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (!clientWidth >= 640) {
      docEl.style.fontSize = '10px'
    } else {
      docEl.style.fontSize = 10 * (clientWidth / 375) + 'px'
    }
  }
  racalc()

  if (!docEl.addEventListene) return
  win.addEventListener(resizeEvt, racalc, false)
  docEl.addEventListener(resizeEvt, racalc, false)
})(window, document)
