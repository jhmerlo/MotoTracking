<template>
  <q-page class="q-mx-auto" style="max-width: 600px" padding>
    <div class="q-px-md q-pt-md q-pb-none row items-center text-h6 text-primary">
      Histórico
    </div>
    <div class="q-px-md q-py-none row items-center text-caption text-grey-8">
      Clique na localização de interesse para visualizar no mapa.
    </div>
    <div class="row q-pa-md q-col-gutter-md">
      <q-list class="col-12" separator>
        <q-item @click="showOnTheMap(localization)" clickable v-for="(localization, index) in localizations" :key="index">
          <q-item-section>
            <q-item-label class="text-primary text-bold" caption>{{ getDay(new Date(localization.created_at)) }}</q-item-label>
            <q-item-label caption>
              <strong>Latitude: </strong> {{ localization.latitude }}
            </q-item-label>
            <q-item-label caption>
              <strong>Longitude: </strong> {{ localization.longitude }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ getHour(new Date(localization.created_at)) }}</q-item-label>
          </q-item-section>
        </q-item>
        <template v-if="isNotLoaded">
          <q-item v-for="index in 7" :key="index">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>
    <q-dialog full-height full-width v-model="showLocalization">
      <q-card class="bg-grey-3" style="height: 100%">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-body1 text-bold text-grey-6">
              Moto<span class="text-grey-7">Tracking</span>
            </div>
            <q-space />
            <q-btn icon="close" color="grey-8" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section style="height: 90%">
          <div class="col-12" style="height: 100%">
            <google-map-loader
              v-if="showLocalization"
              style="width: 100%; height: 100%"
              :location="selectedLocalization"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import GoogleMapLoader from 'components/GoogleMapLoader'
export default {
  name: 'History',
  data: () => ({
    localizations: [],
    showLocalization: false,
    isNotLoaded: true
  }),
  components: { GoogleMapLoader },
  methods: {
    async getLocalizations () {
      const { data } = await this.$axios.get('localizations')
      this.isNotLoaded = false
      this.localizations = data.localizations.slice(0).reverse()
    },
    getDay (date) {
      return date.toLocaleDateString('pt-br', { dateStyle: 'long' })
    },
    getHour (date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    showOnTheMap (localization) {
      this.selectedLocalization = {
        lat: localization.latitude,
        lng: localization.longitude
      }
      this.showLocalization = true
    }
  },
  created () {
    this.getLocalizations()
  }
}
</script>
