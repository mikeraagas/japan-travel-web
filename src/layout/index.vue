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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

html, body {
  background-color: #f0f2f5 !important;
}

#app {
  font-family: 'Montserrat', sans-serif;
  font-variant: tabular-nums;
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