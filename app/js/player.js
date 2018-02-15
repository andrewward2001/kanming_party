const $ = require('jquery')

module.exports = class Player {
  constructor () {
    this.x = 0
    this.y = 0
  }

  draw () {
    let baseX = parseInt($('#gameBoard').css('marginLeft')) + this.x * 80
    let baseY = parseInt($('#gameBoard').css('marginTop')) + this.y * 80
    $('#player').css({ top: baseY, left: baseX })
  }
}
