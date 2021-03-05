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
  async created () {
    try {
      const google = await gmapsInit()
      const mapOptions = {
        center: new google.maps.LatLng(this.location.lat, this.location.lng),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      const map = new google.maps.Map(this.$el, mapOptions)
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.location.lat, this.location.lng),
        map
      })
      console.log(marker)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
