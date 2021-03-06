import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    // this.stage.backgroundColor = '#EDEEC9'
    this.stage.backgroundColor = 0x000000
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['PT Sans:regular:cyrillic,latin']
      },
      active: this.fontsLoaded,
      inactive: () => console.error('Huston, we have problem with fonts!'),
      fontinactive: (familyName, fvd) => console.error('Huston, we have problem with font!', familyName, fvd)
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'Загружаются шрифты', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)


    this.load.crossOrigin = 'anonymous'
    this.game.load.baseURL = '/dont_leave_room/assets/'


    this.game.load.image('splash-screen', 'splash.png')
    this.game.load.atlasJSONArray('splash-button', 'ui/splash-button.png', 'ui/splash-button.json')
    this.game.load.atlasJSONArray('button-mute', 'ui/button-mute.png', 'ui/button-mute.json')

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
    this.game.load.image('houses-2-1', 'backgrounds/houses-2-1.png')
    this.game.load.image('houses-2-2', 'backgrounds/houses-2-2.png')
    this.game.load.image('musor', 'backgrounds/musor.png')
    this.game.load.image('ui-plashka', 'ui/plashka.png')
    this.game.load.image('ui-tiker', 'ui/tiker.png')
    this.game.load.image('button-restart', 'ui/restart.png')
    this.game.load.image('logo', 'logo.png')

    this.game.load.audio('main-theme', ['sound/main-theme.mp3', 'sound/main-theme.ogg'])
    this.game.load.audio('machine-gun', ['sound/machine-gun-loop.mp3', 'sound/machine-gun-loop.ogg'])
    this.game.load.audio('glass-smash', ['sound/glass-smash-bottle-h.mp3', 'sound/glass-smash-bottle-h.ogg'])
    this.game.load.audio('fall-with-impact', ['sound/fall-with-impact.mp3', 'sound/fall-with-impact.ogg'])
    this.game.load.audio('explosion', ['sound/explosion.mp3', 'sound/explosion.ogg'])
    this.game.load.audio('crying-baby', ['sound/crying-newborn-baby-child-2.mp3', 'sound/crying-newborn-baby-child-2.ogg'])
    this.game.load.audio('event', ['sound/wow.mp3', 'sound/wow.ogg'])
    this.game.load.audio('croc', ['sound/croc.mp3', 'sound/croc.ogg'])
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
