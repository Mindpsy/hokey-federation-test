<script lang="ts" setup>
import { TeamsList } from '~features/team-list'
import { TeamDTO, useTeam } from '~entities/team'

const { getTeams } = useTeam()
const teams: Ref<Array<TeamDTO>> = ref([])

onBeforeMount(async () => {
  console.log('Получение команд')
  teams.value = await getTeams()
})

definePage({
  meta: {
    layout: 'home',
  },
})
</script>

<template>
  <h1>Список команд</h1>
  <TeamsList :teams :showFilter="true" />
</template>

<style lang="scss" scoped>

</style>