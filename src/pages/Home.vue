<template>
  <div class="page-home">
    <a-row>
      <a-col :md="12" :xs="24">
        <SearchForm
          @update="handleDataUpdate" />
        
        <VenueList
          :venues="venues"
          :is-fetching="isFetching"
          :has-fetched="hasFetched" />
      </a-col>
      <a-col :md="12" :xs="24">
        <WeatherForecast
          ref="weather"
          :near="near" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SearchForm from '@components/SearchForm';
import VenueList from '@components/VenueList';
import WeatherForecast from '@components/WeatherForecast';

export default {
  name: 'Home',
  components: {
    SearchForm,
    VenueList,
    WeatherForecast
  },
  data() {
    return {
      near: 'Tokyo,Jp',
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

      if ('near' in data) {
        this.$refs.weather.getCurrentWeather(data.near);
      }
    }
  }
}
</script>

<style lang="scss"></style>
