<template>
  <div class="page-home">
    <SearchForm @update="handleDataUpdate" />
    <VenueList :venues="venues" :is-fetching="isFetching" :has-fetched="hasFetched" />
  </div>
</template>

<script>
import SearchForm from '@components/SearchForm';
import VenueList from '@components/VenueList';

export default {
  name: 'Home',
  components: {
    SearchForm,
    VenueList
  },
  data() {
    return {
      venues: [],
      isFetching: false,
      hasFetched: false,
    }
  },
  methods: {
    handleDataUpdate(data) {
      for (let i in data) {
        this[i] = data[i];
      }
    }
  }
}
</script>

<style lang="scss">
  .page-home {}
</style>
