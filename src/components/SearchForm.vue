<template>    
  <div class="loc-search">
    <div class="form-header">
      <h2>Tell us what your looking for</h2>
      <p>Search for places, venues, restaurants, etc</p>
    </div>

    <a-input-search
      v-model="q"
      class="search-input"
      placeholder="Search here"
      size="large"
      @search="onSearch">
      <a-icon slot="prefix" type="search" />
      <a-button
        slot="enterButton"
        class="search-btn"
        size="large"
        type="primary"
      >
        <a-icon type="environment" />
      </a-button>
    </a-input-search>

    <div>
      <span>Near:</span>
      <a-select
        v-model="near"
        class="select-city"
        style="width: 120px"
        @change="onSearch">

        <a-select-option v-for="city in cities" :key="city.name" :value="city.value">
          {{ city.name }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const cities = [
  {
    name: 'Tokyo',
    value: 'Tokyo,JP'
  },
  {
    name: 'Yokohama',
    value: 'Yokohama,JP'
  },
  {
    name: 'Kyoto',
    value: 'Kyoto,JP'
  },
  {
    name: 'Osaka',
    value: 'Osaka,JP'
  },
  {
    name: 'Sapporo',
    value: 'Sapporo,JP'
  },
  {
    name: 'Nagoya',
    value: 'Nagoya,JP'
  },
];

export default {
  name: 'SearchForm',
  data() {
    return {
      cities,
      near: 'Tokyo,JP',
      q: '',
      isFetching: false,
      hasFetched: false,
    }
  },
  methods: {
    async onSearch() {
      this.$emit('update', { isFetching: true });

      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/location/search`, {
          params: {
            near: this.near,
            q: this.q
          }
        });

        const result = res.data.result;

        this.$emit('update', {
          venues: result,
          isFetching: false,
          hasFetched: true
        });

        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style lang="scss">
  .loc-search {
    text-align: center;

    .form-header {
      margin-top: 30px;
    }

    .select-city {
      .ant-select-selection {
        border: none;
        border-bottom: 1px solid #d9d9d9;
        border-radius: 0;
      }
    }

    .search-input {
      display: block;
      margin: 30px auto 20px;
      width: 60%;
    }
  }
</style>
