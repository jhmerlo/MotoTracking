<template>
  <q-page class="bg-grey-4">
    <div class="bg-grey-10 q-pa-md row text-center shadow-4">
      <div class="col-12 text-center">
        <q-icon name="location_on" color="primary" size="40px" />
      </div>
      <div class="text-caption q-mt-sm col-12 text-grey-5">
        Última Localização
      </div>
      <div class="text-h6 col-12 text-primary">
        {{ actualLocalization }}
      </div>
    </div>
    <div class="col-12 q-mt-md">
      <google-map-loader
        v-if="location"
        class="q-ma-sm"
        style="height: 68vh"
        :location="location"
      />
    </div>
  </q-page>
</template>

<script>
import GoogleMapLoader from 'components/GoogleMapLoader'
import axios from 'axios'
export default {
  name: 'PageIndex',
  components: {
    GoogleMapLoader
  },
  data: () => ({
    location: {
      lat: -20.174181,
      lng: -40.273449
    },
    apiKey: 'AIzaSyAxiknv-6jGy94ydJQ3UoKnxNGfRBWg2nY',
    actualLocalization: ''
  }),
  async created () {
    const user = await this.$store.getters['auth/isLogged']
    if (!user) return this.$router.push({ name: 'login' })
    const { data } = await axios.get((`https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&latlng=` + this.location.lat + ',' + this.location.lng))
    const localization = data.plus_code.compound_code
    this.actualLocalization = localization.substr(localization.indexOf(' ') + 1)
  }
}
</script>
