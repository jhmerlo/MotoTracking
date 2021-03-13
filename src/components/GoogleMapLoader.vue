<template>
  <div class="App"/>
</template>

<script>
import gmapsInit from '../utils/gmaps'
export default {
  name: 'App',
  props: {
    location: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    marker: null,
    google: null,
    map: null
  }),
  async created () {
    try {
      this.google = await gmapsInit()
      const mapOptions = {
        center: new this.google.maps.LatLng(this.location.lat, this.location.lng),
        zoom: 14,
        mapTypeId: this.google.maps.MapTypeId.ROADMAP
      }
      this.map = new this.google.maps.Map(this.$el, mapOptions)
      this.marker = new this.google.maps.Marker({
        position: new this.google.maps.LatLng(this.location.lat, this.location.lng),
        map: this.map
      })
    } catch (error) {
      console.error(error)
    }
  },
  watch: {
    location () {
      this.marker.setMap(null)
      this.marker = new this.google.maps.Marker({
        position: new this.google.maps.LatLng(this.location.lat, this.location.lng),
        map: this.map
      })
    }
  }
}
</script>
