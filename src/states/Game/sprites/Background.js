import { Animation } from 'phaser'
import Layer from './Layer'


const velocity = 0.3
export default (game) => {
  const layer1 = new Layer({
    game: game,
    asset: 'background',
    tiles: Animation.generateFrameNames('parallax-2-', 1, 5, '.png'),
    speed: -velocity,
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
    speed: -velocity * 1.8,
    scale: 0.75,
    anchor: (0.5, 0)
  })
  for (let i = 0; i < 10; i++) {
    layer2.ganerateTile()
  }

  // const layer3 = new Layer({
  //   game: game,
  //   asset: 'background',
  //   tiles: Animation.generateFrameNames('doma-tile', 1, 1, '.png'),
  //   speed: -1.25,
  //   scale: 1,
  //   anchor: (0.5, 0)
  // })
  // for (let i = 0; i < 10; i++) {
  //   layer2.ganerateTile()
  // }

  const zabor = game.add.tileSprite(
    0,
    180,
    game.world.width,
    350 / 4,
    'background',
    'parallax-0-1.png'
  )
  zabor.tileScale.setTo(0.25)

  const doma = game.add.tileSprite(
    0,
    60 + 15,
    game.world.width,
    234,
    'houses-2-1'
  )
  const doma2 = game.add.tileSprite(
    0,
    80,
    game.world.width,
    265,
    'houses-2-2'
  )
  doma2.tilePosition.x += 200
  // zabor.tileScale.setTo(0.25)

  const musor = game.add.tileSprite(
    0,
    game.world.height - 100,
    game.world.width,
    90,
    'musor'
  )

  return {
    move: (x = 1) => {
      layer1.move()
      layer2.move()
      zabor.tilePosition.x -= velocity * 9
      doma.tilePosition.x -= velocity * 2.5
      doma2.tilePosition.x -= velocity * 2.9
      musor.tilePosition.x -= velocity * 3.85
    }
  }
}
