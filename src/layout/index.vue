<template>
  <div id="app">
    <a-layout class="layout">
      <Header />

      <a-layout-content class="content-wrapper">
        <div class="layout-content">
          <transition name="fade">
              <router-view></router-view>
          </transition>
        </div>
      </a-layout-content>

      <Footer />
    </a-layout>
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
html, body {
  background-color: #f0f2f5 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.layout {
  .content-wrapper {
    padding: 25px;

    .layout-content {
      background: #fff;
      min-height: 500px;
      padding: 20px;
    }
  }
}
</style>