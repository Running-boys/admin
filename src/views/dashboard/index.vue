<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <chinaMap />
    <worldMap />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import chinaMap from '@/components/chinaMap/index'
import worldMap from '@/components/worldMap/index'

export default {
  name: 'Dashboard',
  components:{
    chinaMap,
    worldMap
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
