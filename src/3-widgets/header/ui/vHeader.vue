<script lang="ts" setup>
import { ROUTE } from '~shared/lib'

const props = defineProps<{
    text?: string,
    navLinks?: Array<{ text: string; href: string }>
}>()

const links = computed(() => props.navLinks || [])

onBeforeMount(() => {
    //
})
</script>

<template>
    <header class="header">
        <p class="header__title">
            <RouterLink :to="{...ROUTE.home}">{{ text }}</RouterLink>
        </p>
        <nav class="header__nav" v-if="links.length">
            <ul class="nav__links" v-for="link in links" :key="link.text">
                <li><a :href="link.href">{{ link.text }}</a></li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 20px 20px;

    .nav__links {
        list-style: none;
    }
}
</style>    