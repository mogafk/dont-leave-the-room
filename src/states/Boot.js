import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['PT Sans:regular:cyrillic,latin']
      },
      // loading: () => console.log('fonts are loading...'),
      active: this.fontsLoaded,
      inactive: () => console.error('Huston, we have problem with fonts!'),
      // fontloading: (familyName, fvd) => console.log('font is loading...', familyName, fvd),
      // fontactive: (familyName, fvd) => console.log('font was load.', familyName, fvd),
      fontinactive: (familyName, fvd) => console.error('Huston, we have problem with font!', familyName, fvd)
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.crossOrigin = 'anonymous'
    this.game.load.baseURL = './assets/'
    // this.game.load.atlasJSONHash('foreground', 'backgrounds/asset1.png', 'backgrounds/asset1.json')
    // this.game.load.spritesheet('button', 'PowerButtonsAsset.png', 62, 70, 3)
    // this.game.load.atlasJSONHash('neo', 'persons/neo.png', 'persons/neo.json')
    // this.game.load.atlasJSONHash('brevik', 'persons/brevik.png', 'persons/brevik.json')
    // this.game.load.video('intro', 'intro.mp4')
    this.game.load.atlasJSONHash('background', 'backgrounds/asset2.png', 'backgrounds/asset2.json')
    this.game.load.atlasJSONHash('houses', 'backgrounds/houses.png', 'backgrounds/houses.json')
    this.game.load.atlasJSONHash('rape', 'events/rape.png', 'events/rape.json')
    this.game.load.atlasJSONHash('croc', 'events/croc.png', 'events/croc.json')
    this.game.load.atlasJSONHash('men2', 'persons/men2.png', 'persons/men2.json')
    this.game.load.atlasJSONHash('men3', 'persons/men3.png', 'persons/men3.json')
    this.game.load.atlasJSONHash('hero', 'persons/hero.png', 'persons/hero.json')
    this.game.load.atlasJSONHash('explose', 'events/explose.png', 'events/explose.json')
    this.game.load.atlasJSONHash('montirovka-car', 'events/montirovka_car.png', 'events/montirovka_car.json')
    this.game.load.atlasJSONHash('montirovka-man', 'persons/montirovka.png', 'persons/montirovka.json')
    this.game.load.atlasJSONHash('men1', 'persons/men1.png', 'persons/men1.json')
    this.game.load.atlasJSONHash('icicle', 'events/icicle.png', 'events/icicle.json')
    this.game.load.atlasJSONHash('dps', 'events/dps.png', 'events/dps.json')
    this.game.load.image('buttonReplay', 'Repeat.png')
    this.game.load.image('doma-tile', 'backgrounds/doma-tile.png')
    this.game.load.image('explosed-0', 'backgrounds/explosed-0.png')
    this.game.load.image('explosed-1', 'backgrounds/explosed-1.png')
    this.game.load.image('trashcan', 'backgrounds/trashcan.png')
    this.game.load.image('sight-2', 'backgrounds/sight-2.png')
    this.game.load.image('house-police', 'backgrounds/police.png')
    this.game.load.image('house-0', 'backgrounds/house-0.png')
    this.game.load.audio('main-theme', 'sound/main-theme.mp3')
    this.game.load.audio('event1', 'sound/event1.mp3')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Intro')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
