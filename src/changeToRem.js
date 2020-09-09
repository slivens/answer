export function changeToRem(win, option) {
  var count = 0
  var designWidth = option.designWidth
  var designHeight = option.designHeight || 0
  var designFontSize = option.designFontSize || 100
  var callback = option.callback || null
  var root = document.documentElement
  // body = document.body,
  var rootWidth
  var newSize
  var t
  var self

  // 返回root元素字体计算结果
  function _getNewFontSize() {
    var iw = win.innerWidth > 750 ? 750 : win.innerWidth
    console.log(iw)
    var scale = designHeight !== 0 ? Math.min(iw / designWidth, win.innerHeight / designHeight) : iw / designWidth
    return parseInt(scale * 10000 * designFontSize) / 10000
  }
  function calc() {
    rootWidth = root.getBoundingClientRect().width

    if (!self) {
      self = calc
    }

    // self = self ? self : arguments.callee()

    // 如果此时屏幕宽度不准确，就尝试再次获取分辨率，只尝试20次，否则使用win.innerWidth计算
    if (rootWidth !== win.innerWidth && count < 20) {
      win.setTimeout(function () {
        count++
        self()
      }, 0)
    } else {
      newSize = _getNewFontSize()
      // 如果css已经兼容当前分辨率就不管了
      if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
        root.style.fontSize = newSize + 'px'
        return callback && callback(newSize)
      }
    }
  }
  calc()
  // 横竖屏切换的时候改变fontSize，根据需要选择使用
  win.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
    clearTimeout(t)
    t = setTimeout(function () {
      self()
    }, 200)
  }, false)
}
