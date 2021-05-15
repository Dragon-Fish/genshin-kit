/**
 * @method CharactersFilter
 * @param {Object} avatars UserRoles.data.avatars
 */
import { Character } from '../types/Character'

export class CharactersFilter {
  allCharacters: Character[] = []
  id: (filter: number | string) => Character | null

  constructor(avatars: Character[]) {
    this.allCharacters = avatars
    this.id = this.name
  }

  /**
   * @function id/name 通过名称或id获取玩家指定角色的信息
   * @param {Number} uid
   * @param {String|Number} filter 角色名称或 id
   * @return {Object|null} 角色信息或null
   */
  name(filter: number | string): Character | null {
    // 解析查询的方式
    let type: 'id' | 'name'
    if (typeof filter === 'number' || /^[0-9]$/g.test(filter)) {
      type = 'id'
      filter = Number(filter)
    } else if (typeof filter === 'string') {
      type = 'name'
    } else {
      return null
    }

    const res = this.allCharacters.filter((i) => i[type] === filter)

    if (res.length > 0) return res[0]
    return null
  }

  /**
   * @function element 通过指定元素筛选玩家的角色
   */
  element(el: string): Character[] {
    el = el.toLocaleLowerCase()

    // 中文名转换
    const elAlias: Record<string, string> = {
      火: 'pyro',
      fire: 'pyro',
      水: 'hydro',
      water: 'hydro',
      风: 'anemo',
      wind: 'anemo',
      雷: 'electro',
      thunder: 'electro',
      冰: 'cryo',
      ice: 'cryo',
      岩: 'geo',
      rock: 'geo',
      草: 'dendro',
      grass: 'dendro'
    }
    el = elAlias[el] || el

    const list = []
    for (const item of this.allCharacters) {
      if (item.element.toLocaleLowerCase() === el) list.push(item)
    }
    return list
  }

  /**
   * @function rarity
   * @param {Array|Number} 4 或 5 或 [4, 5]
   */
  rarity(rarity: number | number[]): Character[] {
    // 缓存
    let queryRarity: number[] = []
    const list: Character[] = []

    if (typeof rarity === 'number') {
      queryRarity = [rarity]
    } else if (rarity.constructor !== Array) {
      return []
    }

    this.allCharacters.forEach((item) => {
      if (queryRarity.includes(item.rarity)) list.push(item)
    })

    return list
  }

  /**
   * @function all
   */
  all(): Character[] {
    return this.allCharacters
  }
}
