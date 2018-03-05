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

  const zabor = game.add.tileSprite(
    0,
    game.camera.height / 2.8,
    game.world.width,
    350 / 4,
    'background',
    'parallax-0-1.png'
  )
  zabor.tileScale.setTo(0.25)

  const vScale = Math.min(1, game.camera.height / 500)
  const doma = game.add.tileSprite(
    0,
    game.camera.height * 0.55,
    game.world.width,
    234 * vScale * 0.9,
    'houses-2-1'
  )
  doma.anchor.setTo(0, 1)
  doma.tileScale.setTo(vScale * 0.9)

  const doma2 = game.add.tileSprite(
    0,
    game.camera.height * 0.68,
    game.world.width,
    265 * vScale,
    'houses-2-2'
  )
  doma2.anchor.setTo(0, 1)
  doma2.tileScale.setTo(vScale)
  // doma2.tilePosition.x += 200
  // zabor.tileScale.setTo(0.25)

  const houseNamesArray = [
    'house-2', 'house-3', 'house-4', 'house-5', 'house-6', 'house-7', 'house-8', 'house-9',
    'barber', 'garage', 'hospital', 'pizza', 'shop', 'sight-1', 'stop', 'trashcan'
  ]
  const layer3 = game.add.group()
  const create3LayerHome = (offset = 0) => {
    const _house = game.add.sprite(offset, 0, 'houses', game.rnd.pick(houseNamesArray))
    _house.anchor.setTo(0, 1)
    _house.scale.setTo(0.85)
    layer3.add(_house)
  }
  create3LayerHome()

  game.add.existing(layer3)
  layer3.y = game.camera.height * 0.75
  layer3.update = () => {
    const _s = layer3.getTop()
    if (layer3.getTop()) {
      if (_s.x < (-1 * _s.width)) {
        _s.destroy()
        create3LayerHome(game.rnd.integerInRange(game.camera.width * 1, game.camera.width * 1.5))
      }
    }
  }

  const musor = game.add.tileSprite(
    0,
    game.world.height * 0.9,
    game.world.width,
    90,
    'musor'
  )

  return {
    move: (x = 1) => {
      layer1.move()
      layer2.move()
      zabor.tilePosition.x -= velocity * 9 
      doma.tilePosition.x -= velocity * 2.5 * (Math.max(1, 1 / vScale))
      doma2.tilePosition.x -= velocity * 2.9 * (Math.max(1, 1 / vScale))
      layer3.addAll('x', -1 * velocity * 3.3)
      musor.tilePosition.x -= velocity * 3.85
    }
  }
}
