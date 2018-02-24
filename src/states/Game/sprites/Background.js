import { Animation } from 'phaser'
import Layer from './Layer'

export default (game) => {
  const foreground = game.add.tileSprite(
    0,
    game.height - 66,
    game.world.width,
    game.height,
    'asphalt'
  )
  foreground.tileScale.setTo(0.5)

  const layer1 = new Layer({
    game: game,
    asset: 'background',
    tiles: Animation.generateFrameNames('parallax-2-', 1, 5, '.png'),
    speed: -0.5,
    scale: 0.5,
    anchor: (0.5, 0)
  })
  for (let i = 0; i < 10; i++) {
    layer1.ganerateTile()
  }

  const layer2 = new Layer({
    game: game,
    asset: 'background',
    tiles: Animation.generateFrameNames('parallax-1-', 1, 5, '.png'),
    speed: -1,
    scale: 0.75,
    anchor: (0.5, 0)
  })
  for (let i = 0; i < 10; i++) {
    layer2.ganerateTile()
  }

  const zabor = game.add.tileSprite(
    0,
    190,
    game.world.width,
    350 / 4,
    'background',
    'parallax-0-1.png'
  )
  zabor.tileScale.setTo(0.25)
}
