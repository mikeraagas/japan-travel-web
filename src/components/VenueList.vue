<template>
  <div class="venue-list">
    <div class="result-info" v-show="(hasFetched || isFetching) && venues">
      Top 5 results for <b>{{ q }}</b> in <b>{{ near }}</b>
    </div>

    <a-list
      v-show="hasFetched || isFetching"
      item-layout="vertical"
      :loading="isFetching"
      :data-source="venues">
      <a-list-item slot="renderItem" slot-scope="venue">
        <template>
          
        </template>
        <a-list-item-meta
          :description="venue.location.formattedAddress.join(' ')"
        >
          <a slot="title" href="#">{{ venue.name }}</a>
          <div>category:</div>
        </a-list-item-meta>

        <div v-if="venue.categories.length">
          Category: {{ venue.categories[0].name }}
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'VenueList',
  data() {
    return {
    }
  },
  props: [
    'q',
    'near',
    'venues',
    'isFetching',
    'hasFetched'
  ],
  methods: {
  }
}
</script>

<style lang="scss">
  .venue-list {
    margin-top: 30px;
    padding: 0 20px;

    .result-info {
      font-style: italic;
      margin-bottom: 20px;

      b {
        text-transform: capitalize;
      }
    }

    .ant-list {
      min-height: 300px;
    }

    .ant-spin {
      margin-top: 50px;
    }
  }
</style>
