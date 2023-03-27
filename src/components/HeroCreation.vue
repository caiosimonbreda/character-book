<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, url } from "@vuelidate/validators";
import { useHeroesStore } from '../stores/store.js'
import { reactive, toRef } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

//Set hero store:
const store = useHeroesStore()

// Handle form data & validation:
const heroFormData = reactive({
    image: "",
    name: "",
    gender: "male"
})

const rules = {
    image: { required, url },
    name: { required },
    gender: {},
}

const vv = useVuelidate(rules, {
  image: toRef(heroFormData, "image"),
  name: toRef(heroFormData, "name"),
  gender: toRef(heroFormData, "gender"),
});

// Handle form submission:
const onSubmit = function() {
    vv.value.$touch();
    // If not valid, interrupt submit
    if (vv.value.$invalid) return
    // Send new hero info to the store and view list
    store.addNewHero(heroFormData)
    router.push({ path: `/` })
}
</script>

<template>
    <div class="form-wrapper">
        <h1>Create your own hero:</h1>
        <form>
            <input v-model="vv.image.$model" type="text" placeholder="Image URL">
            <p>{{ vv?.image?.$errors[0]?.$message }}</p>
            <input v-model="vv.name.$model" type="text" placeholder="Name">
            <p>{{ vv?.name?.$errors[0]?.$message }}</p>
            <section>
                <label class="rb-label">
                    <input type="radio" v-model="vv.gender.$model" value="male">Male
                </label>
                <label class="rb-label">
                    <input type="radio" v-model="vv.gender.$model" value="female">Female
                </label>
            </section>
        </form>
        <button @click="onSubmit">Create my hero!</button>
    </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    min-height: 100vh;

    h1 {
        padding-top: 100px;
        font-weight: 400;
        margin-bottom: 28px;
    }

    form {
        display: flex;
        flex-flow: column nowrap;
        gap: 20px;
        width: 100%;
        max-width: 480px;

        p {
            font-size: 14px;
            margin-top: -12px;
            transform: translate(8px, 0);
            color: #c44;
        }

        input[type=text] {
            padding: 12px;
            font-size: 18px;
            background-color: transparent;
            border: 1px solid #555;
            border-radius: 8px;
            color: inherit;
            width: 100%;
        }

        section {
            display: flex;
            gap: 20px;
            color: inherit;
            margin-bottom: 20px;

            .rb-label {
                display: flex;
                gap: 10px;
                text-align: left;
                font-size: 18px;
                padding: 5px;
            }

            input[type="radio"] {
                margin: 0;
                font: inherit;
                width: 1.15em;
                height: 1.15em;
                border-radius: 50%;
            }

        }
    }

    button {
        width: 100%;
        font-size: 18px;
        max-width: 480px;
        background-color: #0b0d0f;
        color: #ededed;
        border: none;
        padding: 12px;
        border-radius: 8px;
    }
}
</style>