<template>
  <v-ons-page>
    <!-- <custom-toolbar title='<%= schema.label_plural %>'></custom-toolbar> -->

    <v-ons-pull-hook
      :action="fetch"
      :fixed-content="md"
      :height="md ? 84 : 64"
      :on-pull="md && onPull || null"
      @changestate="state = $event.state"
    >

      <!-- Show this on iOS -->
      <v-ons-icon v-if="!md"
        size="22px"
        class="pull-hook-spinner"
        :icon="fetching ? 'fa-spinner' : 'fa-arrow-down'"
        :rotate="fetching && 180"
        :spin="fetching"
      ></v-ons-icon>

      <!-- Show this on Material Design -->
      <div v-else class="pull-hook-progress">
        <v-ons-progress-circular
          :value="ratio * 100"
          :indeterminate="state === 'action'"
          :style="{ transform: `rotate(${ratio}turn)` }"
        ></v-ons-progress-circular>
      </div>

    </v-ons-pull-hook>

    <!-- TODO - wire up to new component -->
    <v-ons-fab position="bottom right">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>

    <!-- TODO - break out into List/Child components -->
    <v-ons-list>
      <!-- <v-ons-list-header>Pull to refresh</v-ons-list-header> -->

      <!-- TODO - tap to navigate to 'show' page -->
      <v-ons-list-item v-for="(model, index) in collection" :key="model._id + index">
        <!-- <div class="left"> -->
          <!-- <img class="list-item__thumbnail" :src="model.url"> -->
        <!-- </div> -->

        <!-- <v-ons-button modifier="small" class="button-margin" @click="$ons.notification.confirm('Are you ready?')">Show</v-ons-button> -->

        <div>{{ model.<%= schema.attributes[0].identifier %> }}</div>

      </v-ons-list-item>
    </v-ons-list>

    <!-- <v-ons-card v-for="(model, index) in collection" :key="model._id + index"> -->
      <!-- <div class="title">{{ model.<%= schema.attributes[0].identifier %> }}</div> -->
    <!-- </v-ons-card> -->

  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      state: 'initial',
      ratio: 0
    };
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: '<%= schema.identifier %>/fetching',
    collection: '<%= schema.identifier %>/collection'
  }),
  methods: {
    fetch () {
      this.$store.dispatch('<%= schema.identifier %>/fetchCollection')
    },
    onPull(ratio) {
      this.ratio = ratio;
    }
  }
};
</script>

<style>
.pull-hook-spinner {
  color: #666;
  transition: transform .25s ease-in-out;
}

.pull-hook-progress {
  background-color: white;
  width: 32px;
  height: 32px;
  margin: 30px auto 0;
  border-radius: 100%;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  display: inline-block;
  line-height: 0px;
}

.pull-hook-progress .progress-circular {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 4px;
  left: 4px;
}

.pull-hook-progress .progress-circular__primary {
  transition: stroke-dashoffset 0s;
}
</style>
