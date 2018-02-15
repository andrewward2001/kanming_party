const $ = require('jquery')
const path = require('path')
const Tile = require('./js/tile.js')
const Buttons = require('./js/buttons.js')
const Player = require('./js/player.js')

let board = [],
    buttons,
    player,
    moves = 0,
    safeToCycle = false

// loads the JSON, then executes a Promise function
$.getJSON(path.join(__dirname, 'res/board.json'), (data) => {
  for(let i = 0; i < 10; i++) { // this is lazy but we know it's a 10x10 board sooo
    $('#gameBoard').append(`<tr id="${i}"></tr>`)
    board[i] = []
    for(let j = 0; j < 10; j++) {
      let tile = data[`tile${i}${j}`]
      board[i].push(new Tile(j, i, tile['type'], tile['directions']))
      let num = i === 0 ? '' + j : '' + i + j
      $(`#gameBoard tr#${i}`).prepend(`<td id="${j}" style="background-color: ${board[i][j].color}"></td>`)
    }
  }
})

buttons = new Buttons()
buttons.joinGame(() => {
  // code when the game screen is up
  player = new Player();
  player.draw()
  cycle()
})

function cycle() {
  $('#rollResult').html('')
  $('#rollPopup').modal('show')
  buttons.generic('#rollDie', (e) => {
    moves = Math.floor(Math.random() * 6) + 1
    $('#rollResult').html(moves)
    setTimeout(() => { $('#rollPopup').modal('hide') }, 1000)
    $(document).on('hidden.bs.modal', (e) => {
        while(moves > 0) {
          let x = 9 - player.x
          let y = player.y
          let coord = y === 0 ? '' + x : y + ', ' + x
          let dirsAvail = []
          let dir = ''
          let dirDecided = false

          if(board[y][x].up) dirsAvail.push('up')
          if(board[y][x].right) dirsAvail.push('right')
          if(board[y][x].down) dirsAvail.push('down')
          if(board[y][x].left) dirsAvail.push('left')

          if(dirsAvail.length > 1) {
            $('#directionPopup').modal('show')
            $('#directionPopup #opt1').html(dirsAvail[0])
            $('#directionPopup #opt2').html(dirsAvail[1])

            buttons.generic('#directionPopup #opt1', () => {
              dir = dirsAvail[0]
              $('#directionPopup').modal('hide')
              dirDecided = true
            })

            buttons.generic('#directionPopup #opt2', () => {
              dir = dirsAvail[1]
              $('#directionPopup').modal('hide')
              dirDecided = true
            })
          } else {
            dir = dirsAvail[0]
            dirDecided = true
          }
          console.log(dirDecided)
          if(dirDecided = true) {
            if(dir === 'up') player.y -= 1
            if(dir === 'down') player.y += 1
            if(dir === 'left') player.x -= 1
            if(dir === 'right') player.x += 1
            console.log(player)
            player.draw()
            moves--
            dirDecided = false
          }
        }
        console.log('ended')
        cycle()
    })
  })
}
