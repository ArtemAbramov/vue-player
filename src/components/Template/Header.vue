<template>
  <header class="header">
    <router-link class="logo" to="/">
      <img class="logo__img" src="@/assets/img/logo.png" alt="Logo">
    </router-link>
    <nav class="header-nav">
      <ul class="header-nav__list">
        <li
            class="header-nav__item"
            v-for="(link, index) in links"
            :key="index"
        >
          <router-link
              class="header-nav__link"
              :to="link.path"
          >{{link.title}}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const links = ref([
      {path: '/', title: 'Main'},
      {path: '/playlist', title: 'Playlist'}
    ])

    return {
      links
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #424242;
  box-shadow: 0 0 6px 2px rgba(0,0,0, .3);

  &-nav {
    &__list {
      display: flex;
    }

    &__item {
      margin: 0 1rem;
    }

    &__link {
      color: #bdbdbd;
      transition: .3s;

      &:hover {
        color: #fafafa;
      }

      &.router-link-active {
        color: #fafafa;
      }
    }
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;

  &__img {
    width: 100%;
  }
}
</style>