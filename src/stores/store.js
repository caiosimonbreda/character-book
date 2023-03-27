import { defineStore } from 'pinia'
import { v1 as uuid } from 'uuid'

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    heroes: [],
    favoriteCharacters: []
  }),
  getters: {
    getAllHeroes: (state) => state.heroes,
    getHeroById: (state) => {
      return (heroId) => state.heroes.find((hero) => hero.id === heroId)
    },
    getAllFavoriteCharacters: (state) => state.favoriteCharacters,
    isFavorite: (state) => {
      return (character) => state.favoriteCharacters.find(char => char.id === character.id) ? true : false
    }
  },
  actions: {
    addNewHero(newHero) {
      this.heroes.push({ ...newHero, id: uuid(), status: 'Alive', species: 'Unknown', location: { name: 'unknown' } })
    },
    toggleFavoriteCharacter(character) {
      const favCharIndex = this.favoriteCharacters.findIndex(char => char.id == character.id)
      console.log(favCharIndex)
      if (favCharIndex === -1) {
        this.favoriteCharacters.push(character)
      } else {
        this.favoriteCharacters.splice(favCharIndex, 1)
      }
    }
  },
})
