<template>
  <div class="page-home">
    
    <!-- START: Autocomplete Form -->
    <div class="loc-autocomplete">
      <a-auto-complete
        size="large"
        placeholder="Search for location"
        option-label-prop="value"
        @select="onSelect"
        @search="onSearch">

        <template slot="dataSource">
          <a-select-option value="current">
            <a-icon type="environment" />
            Use current location
          </a-select-option>

          <a-select-option v-for="loc in dataSource" :key="loc.address" :value="loc.address">
            {{ loc.address }}
          </a-select-option>
        </template>

        <a-input>
          <a-icon slot="prefix" type="search" />
          <a-button
            slot="suffix"
            style="margin-right: -12px"
            class="search-btn"
            size="large"
            type="primary"
          >
            <a-icon type="environment" />
          </a-button>
        </a-input>
      </a-auto-complete>
    </div>
    <!-- END: Autocomplete Form -->

  </div>
</template>

<script>
const dataSource = [
  {
    address: 'Sample Address 1',
  },
  {
    address: 'Test Address 2',
  }
]

export default {
  name: 'Home',
  data: () => {
    return {
      dataSource
    }
  },
  methods: {
    onSearch: (value) => {
      console.log(value);
    },

    onSelect: (value) => {
      console.log(value);
    }
  }
}
</script>

<style lang="scss">
  .page-home {
    .loc-autocomplete {
      text-align: center;

      .ant-select-auto-complete {
        display: block;
        margin: 50px auto 20px;
        width: 60%;
      }

      .ant-input-suffix button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
</style>
