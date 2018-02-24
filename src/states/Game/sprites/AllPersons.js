import Phaser from 'phaser'

import Neo from './persons/Neo'
import Brevik from './persons/Brevik'
import Doctor from './persons/Doctor'
import Montirovka from './persons/Montirovka'
import Hero from './persons/Hero'
import Ment from './persons/Ment'
import Men1 from './persons/Men1'
import Men2 from './persons/Men2'
import Men3 from './persons/Men3'
import Men4 from './persons/Men4'
import Men5 from './persons/Men5'
import Gaster from './persons/Gaster'

export default class extends Phaser.Group {
  static preload (game) {
    for (let src of [Neo, Brevik, Doctor, Montirovka, Hero, Men1, Men2, Men3, Men4, Men5, Ment, Gaster]) {
      game.load.atlasJSONHash(...src.getAsset())
    }
  }
  constructor (props) {
    super(props)
    // this.NPCGroup = this.game.add.group()

    this.npc = this.add(
      new Neo({
        game: this.game,
        x: this.game.world.centerX + 50,
        y: this.game.world.centerY
      })
    )
    this.npc.anim['go'].play().add(() => this.npc.anim['hit'].play())
    this.npc.anim['hit'].onComplete.add(() => this.npc.anim['go'].play())

    this.npc2 = this.add(
      new Neo({
        game: this.game,
        x: this.game.world.centerX - 50,
        y: this.game.world.centerY,
        type: 2
      })
    )
    this.npc2.anim['go'].play().add(() => this.npc2.anim['hit'].play())
    this.npc2.anim['hit'].onComplete.add(() => this.npc2.anim['go'].play())

    this.brevik = this.add(
      new Brevik({
        game: this.game,
        x: this.game.world.centerX - 120,
        y: this.game.world.centerY,
        type: 2
      })
    )
    this.brevik.anim['go'].play().add(() => this.brevik.anim['hit'].play())
    this.brevik.anim['hit'].onComplete.add(() => this.brevik.anim['go'].play())

    this.doctor = this.add(
      new Doctor({
        game: this.game,
        x: this.game.world.centerX + 120,
        y: this.game.world.centerY
      })
    )
    this.doctor.anim['go'].play().add(() => this.doctor.anim['hit'].play())
    this.doctor.anim['hit'].onComplete.add(() => this.doctor.anim['go'].play())

    this.montirovka = this.add(
      new Montirovka({
        game: this.game,
        x: this.game.world.centerX + 200,
        y: this.game.world.centerY
      })
    )
    this.montirovka.anim['go'].play().add(() => this.montirovka.anim['hit'].play())
    this.montirovka.anim['hit'].onComplete.add(() => this.montirovka.anim['go'].play())

    this.hero = this.add(
      new Hero({
        game: this.game,
        x: this.game.world.centerX - 300,
        y: this.game.world.centerY
      })
    )
    this.hero.anim['go'].play().add(() => this.hero.anim['spit'].play())
    this.hero.anim['spit'].onComplete.add(() => this.hero.anim['photo'].play())
    this.hero.anim['photo'].onComplete.add(() => this.hero.anim['brokenleg'].play())
    this.hero.anim['brokenleg'].onComplete.add(() => this.hero.anim['death'].play())
    this.hero.anim['death'].onComplete.add(() => this.hero.anim['go'].play())

    this.men1 = this.add(
      new Men1({
        game: this.game,
        x: this.game.world.centerX + 300,
        y: this.game.world.centerY + 80
      })
    )
    this.men1.anim['go'].play().add(() => this.men1.anim['death'].play())
    this.men1.anim['death'].onComplete.add(() => this.men1.anim['go'].play())

    this.ment = this.add(
      new Ment({
        game: this.game,
        x: this.game.world.centerX + 50,
        y: this.game.world.centerY + 150
      })
    )
    this.ment.anim['go'].play().add(() => this.ment.anim['stop'].play())
    this.ment.anim['stop'].onComplete.add(() => this.ment.anim['hit'].play())
    this.ment.anim['hit'].onComplete.add(() => this.ment.anim['naruchniki'].play())
    this.ment.anim['naruchniki'].onComplete.add(() => this.ment.anim['gaz'].play())
    this.ment.anim['gaz'].onComplete.add(() => this.ment.anim['gun'].play())
    this.ment.anim['gun'].onComplete.add(() => this.ment.anim['go_gun'].play())
    this.ment.anim['go_gun'].onComplete.add(() => this.ment.anim['go'].play())

    this.men2 = this.add(
      new Men2({
        game: this.game,
        x: this.game.world.centerX + 150,
        y: this.game.world.centerY + 150
      })
    )
    this.men2.anim['go'].play().add(() => this.men2.anim['fall'].play())
    this.men2.anim['fall'].onComplete.add(() => this.men2.anim['fall_death'].play())
    this.men2.anim['fall_death'].onComplete.add(() => this.men2.anim['death'].play())
    this.men2.anim['death'].onComplete.add(() => this.men2.anim['go'].play())

    this.men3 = this.add(
      new Men3({
        game: this.game,
        x: this.game.world.centerX - 50,
        y: this.game.world.centerY + 150
      })
    )
    this.men3.anim['go'].play().add(() => this.men3.anim['croc'].play())
    this.men3.anim['croc'].onComplete.add(() => this.men3.anim['go'].play())

    this.men4 = this.add(
      new Men4({
        game: this.game,
        x: this.game.world.centerX - 150,
        y: this.game.world.centerY + 150
      })
    )
    this.men4.anim['go'].play().add(() => this.men4.anim['death'].play())
    this.men4.anim['death'].onComplete.add(() => this.men4.anim['go'].play())

    this.men5 = this.add(
      new Men5({
        game: this.game,
        x: this.game.world.centerX - 250,
        y: this.game.world.centerY + 150
      })
    )
    this.men5.anim['go'].play().add(() => this.men5.anim['go'].play())

    this.gaster = this.add(
      new Gaster({
        game: this.game,
        x: this.game.world.centerX + 250,
        y: this.game.world.centerY + 150
      })
    )
    this.gaster.anim['go'].play().add(() => this.gaster.anim['stop'].play())
    this.gaster.anim['stop'].onComplete.add(() => this.gaster.anim['go2'].play())
    this.gaster.anim['go2'].onComplete.add(() => this.gaster.anim['go'].play())

    // this.NPCGroup.destroy()
  }
}
