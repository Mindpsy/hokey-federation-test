<script lang="ts" setup>
import { vHeader } from '~widgets/header'

const navLinks = [
    { text: 'Home', href: '/' , isNative: false},
    { text: 'Teams', href: '/teams-list', isNative: false},
    { text: '3th Task', href: '/html-page.html', isNative: true},
]
</script>

<template>
  <vHeader text="Hokey Federation Test" :nav-links="navLinks"/>
  <RouterView/>
</template>

<style lang="scss" scoped>
</style>