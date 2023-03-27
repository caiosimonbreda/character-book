<script setup>
import CharacterDetails from '../components/CharacterDetails.vue'
const props = defineProps({
  cid: String,
})
</script>

<template>
  <main>
    <CharacterDetails :cid="props.cid" />
  </main>
</template>
