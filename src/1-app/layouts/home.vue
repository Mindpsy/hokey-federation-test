<script lang="ts" setup>
import { vHeader } from '~widgets/header'

const navLinks = [
    { text: 'Teams', href: '/teams-list' },
]
</script>

<template>
  <main class="home">
    <vHeader text="Hokey Federation Test" :nav-links="navLinks"/>
    <div class="home__page">
      <p>Home layout</p>
      <RouterView/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.home {
  &__page {
    padding: 20px;
  }
}
</style>
