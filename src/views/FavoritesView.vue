<script setup>
import { ref } from 'vue'
import CharacterListCard from '../components/CharacterListCard.vue'
import { useHeroesStore } from '../stores/store.js'

// Set hero store
const store = useHeroesStore()

// Handle fetching characters & pagination:
const favoriteCharacters = ref([])

favoriteCharacters.value = store.getAllFavoriteCharacters

</script>

<template>
    <div class="outer-wrapper">
        <main>
            <CharacterListCard v-for="char in favoriteCharacters" :name="char.name" :status="char.status"
                :species="char.species" :id="char.id" :image="char.image" :location="char.location"
                :firstEpisodeUrl="char.episode ? char.episode[0] : ''" :key="char.id" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.outer-wrapper {
    min-height: 100vh;
}

main {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    padding-top: 52px;
}

footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 20px 0;

    p {
        font-size: 18px;
        padding: 0 20px;
    }

    button {
        background-color: transparent;
        border: none;
        color: inherit;
        border-radius: 50%;
        width: 50px;
        height: 50px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        &:active {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
}
</style>
