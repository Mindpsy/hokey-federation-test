<script lang="ts" setup>
import { TeamDTO } from '~entities/team'

const props = withDefaults(
    defineProps<{
        teams: Array<TeamDTO>,
        isLoading?: boolean,
        showFilter?: boolean,
        showSort?: boolean
    }>(),
    {
        teams: () => [],
        isLoading: false,
        showFilter: false,
        showSort: false
    }
)

const queryFilter = ref('')
const teams = computed(() => props.teams)
</script>

<template>
<h1>Команды</h1>
<div class="teams-list container">
    <div class="head-list">
        <div class="filter" v-if="showFilter">
            <input type="text" v-model="queryFilter">
        </div>
        <div class="sort" v-if="showSort">
            <button>Сортировка</button>
        </div>
    </div>
    <div v-if="isLoading" class="loader">
        <span>Загрузка...</span>
    </div>
    <div v-else>
        <div v-for="team in teams" :key="team.id">
            <p>{{ team.name }}</p>
            <p>{{ team.city }}</p>
            <p>{{ team.points }}</p>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
</style>