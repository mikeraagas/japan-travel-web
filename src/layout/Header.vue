<template>
  <a-layout-header class="layout-header">
    <div class="logo">
      Biz Weather
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss">
  .ant-layout-header.layout-header {
    .logo {
      color: #fff;
      float: left;
      font-weight: 500;
      text-transform: uppercase;
    }
  }
</style>