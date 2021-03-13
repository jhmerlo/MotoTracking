<template>
  <q-page class="bg-grey-4" style="height: 90vh">
    <div style="height: 19%" class="bg-grey-10 q-pa-sm row justify-center text-center shadow-20">
      <div class="col-12 text-center">
        <q-icon name="location_on" color="primary" size="30px" />
      </div>
      <div class="text-caption q-mt-sm col-12 text-grey-5">
        Última Localização
      </div>
      <template v-if="showMap">
        <div class="text-caption col-12 text-grey-5">
          {{ lastUpdated }}
        </div>
        <div class="text-body1 col-12 text-primary">
          {{ actualLocalization }}
        </div>
      </template>
      <template v-else>
        <div class="row col-12 justify-center" v-if="!showMap">
          <div class="col-4">
            <q-skeleton animation="fade" class="bg-grey-8" type="text" />
          </div>
        </div>
        <div class="row col-12 justify-center" v-if="!showMap">
          <div class="col-6">
            <q-skeleton animation="fade" class="bg-grey-8" type="text" />
          </div>
        </div>
      </template>
    </div>
    <div style="height: 81%" class="col-12">
      <google-map-loader
        v-if="showMap"
        style="width: 100%; height: 100%"
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
      lat: '',
      lng: ''
    },
    apiKey: 'AIzaSyAxiknv-6jGy94ydJQ3UoKnxNGfRBWg2nY',
    actualLocalization: '',
    lastUpdated: '',
    showMap: false
  }),
  methods: {
    async getLastLocalization () {
      this.showMap = false
      const { data } = await this.$axios.get('localization/last')
      this.lastUpdated = this.formatDate(new Date(data.localization.created_at))
      this.location = {
        lat: data.localization.latitude,
        lng: data.localization.longitude
      }
      await this.reverseGeocoding()
      this.showMap = true
    },
    async reverseGeocoding () {
      const { data } = await axios.get((`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GMAPS_API_KEY}&latlng=` + this.location.lat + ',' + this.location.lng))
      const localization = data.plus_code.compound_code
      this.actualLocalization = localization.substr(localization.indexOf(' ') + 1)
    },
    formatDate (date) {
      return date.toLocaleDateString('pt-br', { dateStyle: 'long' }) +
        ' - ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
  async created () {
    this.getLastLocalization()
    setInterval(async () => {
      const { data } = await this.$axios.get('localization/last', { disableLoading: true })
      this.location = {
        lat: data.localization.latitude,
        lng: data.localization.longitude
      }
      this.lastUpdated = this.formatDate(new Date(data.localization.created_at))
      await this.reverseGeocoding()
    }, 30000)
  }
}
</script>
