<script setup>
import { ref, watch } from 'vue'
import { getEpisodeNames } from '../services/characterService'
import { getStatusIndicatorColor } from '../services/statusColorService'
import { useHeroesStore } from '../stores/store.js'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const router = useRouter()

// Set hero store:
const store = useHeroesStore()

const props = defineProps({
    name: String,
    status: String,
    species: String,
    image: String,
    location: Object,
    firstEpisodeUrl: String,
    id: [String, Number],
});

// Get name of episode in which the character first appeared to show on card:
const firstAppearance = ref("")

const getEpisodeNamesList = function () {
    getEpisodeNames([props.firstEpisodeUrl]).then(res => firstAppearance.value = res[0])
}
getEpisodeNamesList()

// Make sure it stays up to date on page changes:
watch(() => props.firstEpisodeUrl, () => {
    getEpisodeNamesList()
})

// Navigate to character details page:
const goToCharacterDetails = function () {
    router.push({ path: `/character/${props.id}` })
}

// Handle setting/unsetting favourite, and make isFavorite available:
const addToFavorites = function() {
    store.toggleFavoriteCharacter(props)
}
const { isFavorite } = storeToRefs(store)
</script>

<template>
    <div class="character-card" @click="goToCharacterDetails">
        <img alt=""
            :src="props ? props.image : 'https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120209238-stock-illustration-profile-picture-illustration-woman-vector.jpg'">
        <div class="character-card-info">
            <div class="character-card-header">
                <h1>{{ props.name }}</h1>
                <button :class="`favorite-button ${isFavorite(props) ? 'red' : ''}`" @click.stop="addToFavorites">{{ `♥` }}</button>
            </div>
            <div class="character-card-status">
                <div class="character-card-status-indicator"
                    :style="`background-color: ${getStatusIndicatorColor(props.status)};`"></div>
                <h3>{{ props.status.charAt(0).toUpperCase() + props.status.substring(1) }} - {{ props.species }}</h3>
            </div>
            <h4>Last known location:</h4>
            <h2>{{ props.location.name.charAt(0).toUpperCase() + props.location.name.substring(1) }}</h2>
            <div v-if="firstAppearance">
                <h4>First seen in:</h4>
                <h2>{{ firstAppearance }}</h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.character-card {
    display: flex;
    height: fit-content;
    border-radius: 10px;
    margin: 10px;
    overflow: hidden;
    width: 480px;
    height: 230px;

    &:hover {
        cursor: pointer;
    }

    img {
        max-width: 200px;
    }

    h1 {
        font-size: 22px;
        margin-bottom: 10px;
    }

    h3 {
        font-weight: 400;
        margin-bottom: 5px;
        font-size: 16px;
    }

    h4 {
        font-size: 14px;
        color: #888;
        font-weight: 400;
        margin-top: 10px;
        z-index: -20;
    }

    h2 {
        font-size: 14px;
        font-weight: 400;
    }

    &-header {
        display: flex;
        width: 100%;
        justify-content: flex-start;

        .favorite-button {
            background-color: inherit;
            color: inherit;
            opacity: 0.15;
            border: none;
            font-size: 22px;
            height: 100%;
            margin-left: 5px;
            cursor: pointer;
            transition: 0.2s ease-in;

            &.red {
                color: rgb(230, 39, 86);
                opacity: .9;
            }
        }
    }

    &-info {
        padding: 15px 25px;
    }

    &-status {
        display: flex;
        align-items: center;

        &-indicator {
            height: 8px;
            width: 8px;
            border-radius: 50%;
            margin-right: 8px;
        }
    }

}
</style>