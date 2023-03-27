<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const darkModeEnabled = ref(false)

if (localStorage.getItem("theme")) {
  darkModeEnabled.value = localStorage.getItem("theme") === "true"
}

const setTheme = function() {
  localStorage.setItem("theme", darkModeEnabled.value)
}
</script>

<template>
  <header>
    <div class="wrapper-left">
      <nav>
        <RouterLink to="/">Characters</RouterLink>
        <RouterLink to="/create">Create</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
    </div>
    <div class="wrapper-right">
      <p>Dark Mode</p>
      <label class="switch">
        <input type="checkbox" v-model="darkModeEnabled" @change="setTheme">
        <span class="slider round"></span>
      </label>
    </div>
  </header>

  <div :class="`app-container ${darkModeEnabled ? 'dark' : 'light'}`">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
header {
  background-color: #0b0d0f;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  z-index: 100;

  .wrapper-left {
    nav {
      display: flex;
      align-items: center;

      a {
        text-decoration: none;
        margin: 16px;
        border-bottom: 1px solid transparent;
        color: #ededed;

        &:hover {
          border-bottom: 1px solid;
        }
      }
    }
  }

  .wrapper-right {
    display: flex;
    align-items: center;
    padding-right: 16px;
    
    p {
      color: #888;
      margin-right: 10px
    }
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked+.slider {
  background-color: rgb(103, 139, 103);
}

input:focus+.slider {
  box-shadow: 0 0 1px rgb(103, 139, 103);
}

input:checked+.slider:before {
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
