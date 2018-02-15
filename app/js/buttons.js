const $ = require('jquery')
const { remote } = require('electron')

module.exports = class Buttons {
  start () {
    // bind the listener to the document, but target the button. ensures the listener works properly if the DOM hasn't loaded yet
    $(document).on('click', '#quit', (e) => {
      e.preventDefault()
      remote.getCurrentWindow().close()
    })
  }

  joinGame (callback) {
    $(document).on('click', '#joinGame', (e) => {
      e.preventDefault()
      $('#main').hide()
      $('#gameScreen').show()
      callback()
    })
  }

  hostGame (callback) {
    $(document).on('click', '#hostGame', (e) => {
      e.preventDefault()
      $('#main').hide()
      $('#hostScreen').show()
    })
  }

  generic (el, callback) {
    $(document).on('click', el, (e) => {
      e.preventDefault()
      callback()
    })
  }
}
