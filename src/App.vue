<template>
  <div id="app">
    <!-- <UserInfo class="brush-mrgin-bottom" /> -->
    <div style="display: flex">
      <GetCookie />
      <InputCookie />
      <ClearCache />
    </div>
  </div>
</template>
<script>
// import UserInfo from './views/userInfo'
import GetCookie from './views/func/newGetCookie.vue'
import InputCookie from './views/func/newInputCookie.vue'
import ClearCache from './views/func/clearCache.vue'
export default {
  components: {
    // UserInfo,
    GetCookie,
    InputCookie,
    ClearCache
  },
  mounted () {
    console.log('刷新')
  }
}
</script>
<style lang="less">
#app {
  border: 1px solid #ff2a00;
  z-index: 9999;
  margin-top: 10px;
  margin-bottom: 15px;
  padding: 5px 0;
}
</style>
