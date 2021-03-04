<template>
  <div class="App"/>
</template>

<script>
import gmapsInit from '../utils/gmaps'
const location = {
  position: {
    lat: '-20.256172',
    lng: '-40.271153'
  }
}
export default {
  name: 'App',
  async mounted () {
    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el)

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)

        const marker = new google.maps.Marker({ location, map })
        console.log(marker)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
