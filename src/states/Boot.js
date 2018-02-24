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
      loading: () => console.log('fonts are loading...'),
      active: this.fontsLoaded,
      inactive: () => console.error('Huston, we have problem with fonts!'),
      fontloading: (familyName, fvd) => console.log('font is loading...', familyName, fvd),
      fontactive: (familyName, fvd) => console.log('font was load.', familyName, fvd),
      fontinactive: (familyName, fvd) => console.error('Huston, we have problem with font!', familyName, fvd)
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.crossOrigin = 'anonymous'
    // this.load.image('loaderBg', './assets/images/loader-bg.png')
    // this.load.image('loaderBar', './assets/images/loader-bar.png')
    // this.load.image('menuBack', './assets/menu-ui/menu-back.png')
    // this.load.image('buttonGreen', './assets/menu-ui/button-green.png')

    this.game.load.baseURL = './assets/'
    // this.game.load.atlasJSONHash('foreground', 'backgrounds/asset1.png', 'backgrounds/asset1.json')
    this.game.load.atlasJSONHash('background', 'backgrounds/asset2.png', 'backgrounds/asset2.json')
    this.game.load.atlasJSONHash('houses', 'backgrounds/houses.png', 'backgrounds/houses.json')
    this.game.load.atlasJSONHash('rape', 'events/rape.png', 'events/rape.json')
    // this.game.load.spritesheet('button', 'PowerButtonsAsset.png', 62, 70, 3)
    this.game.load.image('buttonReplay', 'Repeat.png')
    this.game.load.atlasJSONHash('croc', 'events/croc.png', 'events/croc.json')
    this.game.load.atlasJSONHash('men2', 'persons/men2.png', 'persons/men2.json')
    this.game.load.atlasJSONHash('men3', 'persons/men3.png', 'persons/men3.json')
    this.game.load.atlasJSONHash('hero', 'persons/hero.png', 'persons/hero.json')
    this.game.load.atlasJSONHash('neo', 'persons/neo.png', 'persons/neo.json')
    this.game.load.atlasJSONHash('brevik', 'persons/brevik.png', 'persons/brevik.json')
  }

  render () {
    if (this.fontsReady) {
      console.log('this.state.start')
      this.state.start('Splash') //  Splash
    }
  }

  fontsLoaded () {
    console.log('ALL FONTS ARE LOADED')
    this.fontsReady = true
  }
}
