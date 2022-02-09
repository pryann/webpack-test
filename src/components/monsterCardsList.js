import monsters from './monsters.js'
import monsterCardFactory from './monsterCardFactory'
import monsterIcon from '../assets/ico/monster-icon.svg'
import Title from '../assets/raw/title.txt'

const monsterCardsList = {
  selector: 'body',
  position: 'beforeend',
  template: `
    <div class="monsters">
      <h1 class="monsters__title">
        ${Title} <img src="${monsterIcon}" />
      </h1>
      <div class="monsters__list">
        ${monsters.map(monsterCardFactory).join('')}
      </div>
    </div>
  `
}

export default monsterCardsList
