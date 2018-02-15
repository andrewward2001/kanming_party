module.exports = class Tile {
  constructor (x, y, type, directions) {
    this.x = x
    this.y = y
    this.type = type
    this.directions = directions
    this.right = directions[0]
    this.down = directions[1]
    this.left = directions[2]
    this.up = directions[3]

    switch(this.type) {
      case 0:
        this.color = '#ffafaf'
        break
      case 1:
        this.color = '#ff0'
        break
      case 2:
        this.color = '#f00'
        break
      case 3:
        this.color = '#00f'
        break
      case 4:
        this.color = '#ffc800'
        break
      case 5:
        this.color = '#fff'
        break
    }
  }
}

// types:
// 0: home
// 1: star
// 2: battle
// 3: drop
// 4: minigame
// 5: empty
