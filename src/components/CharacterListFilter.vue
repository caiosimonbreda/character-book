<script setup>
    import { ref, watch } from 'vue'

    const name = ref("")
    const status = ref("")
    const species = ref("")
    const type = ref("")
    const gender = ref("")

    const emit = defineEmits(['filterCharacters'])

    const assembleFilterString = function() {
        let filterString = ""
        // ?name=rick&status=alive
        if (name.value !== "") {
            filterString += `name=${name.value}`
        }
        if (status.value !== "") {
            if (filterString !== "") {
                filterString += '&'
            }
            filterString += `status=${status.value}`
        }
        if (species.value !== "") {
            if (filterString !== "") {
                filterString += '&'
            }
            filterString += `species=${species.value}`
        }
        if (type.value !== "") {
            if (filterString !== "") {
                filterString += '&'
            }
            filterString += `type=${type.value}`
        }
        if (gender.value !== "") {
            if (filterString !== "") {
                filterString += '&'
            }
            filterString += `gender=${gender.value}`
        }

        emit('filterCharacters', `?${filterString}`)
    }

</script>

<template>
    <form>
        <input v-model="name" type="text" id="name" placeholder="Name">
        <input v-model="status" type="text" id="status" placeholder="Status">
        <input v-model="species" type="text" id="species" placeholder="Species">
        <input v-model="type" type="text" id="type" placeholder="Type">
        <input v-model="gender" type="text" id="gender" placeholder="Gender">
        <button type="button" @click="assembleFilterString">Filter</button>
    </form>
</template>

<style lang="scss" scoped>
form {
    display: flex;
    flex-flow: row wrap;
    background-color: #0b0d0f;
    justify-content: center;
    margin-bottom: 10px;
    padding: 20px;
    width: 100%;
    gap: 10px;

    input {
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.15);
        border: none;
        border-radius: 8px;
        color: #ededed;

        &::placeholder {
            color: rgba(255, 255, 255, 0.55);
        }
    }

    button {
        background-color: #333;
        color: inherit;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        color: #ededed;

        &:hover {
            cursor: pointer;
            background-color: #444;
        }

        &:active {
            background-color: #555;
        }
    }
}
</style>