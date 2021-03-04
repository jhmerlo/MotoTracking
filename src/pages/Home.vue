<template>
  <q-page class="bg-grey-1" padding>
    <q-card class="q-ma-sm bg-grey-9 q-mt-md shadow-4">
      <q-card-section class="row text-center">
        <div class="text-caption q-mt-md col-12 text-grey-1">
          Última Localização
        </div>
        <div class="text-h6 col-12 text-primary">
          Jardim Camburi
        </div>
      </q-card-section>
    </q-card>
    <div class="col-12 q-mt-md">
      <GoogleMapLoader class="q-ma-sm" style="height: 500px" />
    </div>
  </q-page>
</template>

<script>
import GoogleMapLoader from 'components/GoogleMapLoader'
export default {
  name: 'PageIndex',
  components: {
    GoogleMapLoader
  },
  async created () {
    const user = await this.$store.getters['auth/isLogged']
    if (!user) return this.$router.push({ name: 'login' })
  }
}
</script>
