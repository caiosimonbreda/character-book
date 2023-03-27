<script setup>
import { ref, computed } from 'vue'
import CharacterListCard from './CharacterListCard.vue'
import CharacterListFilter from './CharacterListFilter.vue';
import { getAllCharacters, fetchFromUrl } from '../services/characterService'
import { useHeroesStore } from '../stores/store.js'

// Set hero store
const store = useHeroesStore()

// Handle fetching characters & pagination:
const allCharacters = ref([])
const nextChunkUrl = ref("")
const currentPage = ref(1)
const lastPage = ref(null)

getAllCharacters("").then((res) => {
    allCharacters.value = res.results
    nextChunkUrl.value = res.info.next
    getCustomHeroes()
})

// See if there are any custom heroes in the store, and add them to the list: 
const getCustomHeroes = function () {
    const newHeroes = store.getAllHeroes
    allCharacters.value = newHeroes.concat(allCharacters.value)
}

// Reference point for which 12 characters to show in each page:
const currentPageStartingId = computed(() => (currentPage.value - 1) * 12)
const charactersToShow = computed(() => {
    return allCharacters.value.slice(currentPageStartingId.value, currentPageStartingId.value + 12)
})

const showNextPage = function () {
    if ((allCharacters.value.slice(currentPageStartingId.value + 12).length < 12) && nextChunkUrl.value !== null) {
        // If the next page has < 12 characters and next chunk is available, fetch it.
        fetchFromUrl(nextChunkUrl.value).then((res) => {
            nextChunkUrl.value = res.info.next
            allCharacters.value = allCharacters.value.concat(res.results)
            currentPage.value++
        })
    } else if (allCharacters.value.slice(currentPageStartingId.value + 12).length < 1) {
        // If next chunk url is null and next page is empty, set last page to
        // current to disable "next page" button.
        lastPage.value = currentPage.value
    } else currentPage.value++
}

const showPreviousPage = function () {
    currentPage.value--
}

// Fetch characters when a filter is applied:
const getFilteredCharacters = function (filter) {
    getAllCharacters(filter).then((res) => {
        allCharacters.value = res.results
        nextChunkUrl.value = res.info.next
        currentPage.value = 1
    })
}


</script>

<template>
    <div class="outer-wrapper">
        <main>
            <CharacterListFilter @filterCharacters="getFilteredCharacters" />
            <CharacterListCard v-for="char in charactersToShow" :name="char.name" :status="char.status"
                :species="char.species" :id="char.id" :image="char.image" :location="char.location"
                :firstEpisodeUrl="char.episode ? char.episode[0] : ''" :key="char.id" />
        </main>
        <footer>
            <button @click="showPreviousPage" :disabled="currentPage === 1">{{ "<-" }}</button>
                    <p>{{ currentPage }}</p>
                    <button @click="showNextPage" :disabled="currentPage === lastPage">{{ "->" }}</button>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.outer-wrapper {
    min-height: 100vh;
}

main {
    display: flex;
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
