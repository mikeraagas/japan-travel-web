<template>
  <div class="venue-list">
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

    .ant-list {
      min-height: 300px;
    }

    .ant-spin {
      margin-top: 50px;
    }
  }
</style>
