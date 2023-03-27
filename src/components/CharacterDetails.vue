<script setup>
import { ref } from 'vue'
import { getAllCharacters, getEpisodeNames } from '../services/characterService';
import { getStatusIndicatorColor } from '../services/statusColorService'
import { useHeroesStore } from '../stores/store.js'
import { storeToRefs } from 'pinia'
import { validate as isUUID } from 'uuid'

const props = defineProps({
    cid: String,
})

// Set hero store:
const store = useHeroesStore()
const { getHeroById } = storeToRefs(store)

const characterInfo = ref({})
const episodeNames = ref([])

// If ID is an UUID, that means it's one of our custom heroes. Otherwise, fetch from API
if (!isUUID(props.cid)) {
    getAllCharacters(props.cid).then((res) => {
        characterInfo.value = res
        // get episode names from the URLs in characterInfo:
        getEpisodeNames(characterInfo.value.episode).then((res) => {
            episodeNames.value = res
        })
    })
} else {
    characterInfo.value = getHeroById.value(props.cid)
}

</script>

<template>
    <main v-if="characterInfo.name">
        <img :src="characterInfo.image" alt="">
        <h1>{{ characterInfo.name }}</h1>
        <div class="character-status">
            <div class="character-status-indicator"
                :style="`background-color: ${getStatusIndicatorColor(characterInfo.status)};`"></div>
            <h3>{{ characterInfo.status.charAt(0).toUpperCase() + characterInfo.status.substring(1) }} - {{
                characterInfo.species }}</h3>
        </div>
        <div v-if="characterInfo.episode" class="episode-list">
            <h4>Appears in:</h4>
            <ul>
                <li v-for="episode in episodeNames">{{ episode }}</li>
            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    padding-top: 90px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    min-height: 100vh;

    img {
        border-radius: 100%;
        max-width: 200px;
    }

    h1 {
        margin-top: 14px;
        font-weight: 400;
    }

    h3 {
        margin-top: 10px;
        font-weight: 400;
    }

    .episode-list {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        h4 {
            margin-top: 36px;
            color: #888;
            font-weight: 400;
        }

        ul {
            text-align: center;
            list-style: none;
            margin-bottom: 60px;

            li {
                margin-top: 10px;
            }
        }
    }
}

.character-status {
    display: flex;
    align-items: center;

    &-indicator {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 8px;
    }
}
</style>