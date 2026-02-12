<script lang="ts" setup>
definePage({
  meta: {
    layout: '404',
  },
})

const route = useRoute()
</script>

<template>
  <div>{{ route.path }} not found</div>
</template>

<style lang="scss" scoped>

</style>
