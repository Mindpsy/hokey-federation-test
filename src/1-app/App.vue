<script lang="ts" setup>
import { vHeader } from '~widgets/header'
import type { NavLink } from '~widgets/header'

const navLinks: NavLink[] = [
    { text: 'Home', href: '/', isNative: false },
    { text: 'Teams (1st task)', href: '/teams-list', isNative: false },
    { text: '2th Generic Task', href: '/generic', isNative: false },
    { text: '3th Task', href: '/html-page.html', isNative: true },
]
</script>

<template>
  <vHeader text="Hokey Federation Test" :nav-links="navLinks"/>
  <RouterView/>
</template>

<style lang="scss" scoped>
</style>