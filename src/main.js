import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import InrtoState from './states/Intro'
import config from './config'

class Game extends Phaser.Game {
  constructor (container) {
    const docElement = document.documentElement
    const width = Math.min(docElement.clientWidth, config.gameWidth)
    const height = Math.min(docElement.clientHeight, config.gameHeight)
    super(width, height, Phaser.Canvas, container || 'content', null)

    this.pixelRatio = window.devicePixelRatio

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Intro', InrtoState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    // if (!window.cordova) {
    //   this.state.start('Splash') //  Boot
    // }
  }
}

// window.game = new Game()
console.log('_DEV_', __DEV__);

if(__DEV__) {
  window.game = new Game()
  window.game.state.start('Splash');
} else {
  window.startGame = (containerId, stage) => {
    const game = new Game(containerId);
    game.state.start(stage);
    return game;
  };
}

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
