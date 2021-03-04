<template>
  <q-layout view="hHh lpR lfr">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-1 text-white">
      <q-tabs
        class="text-grey-8"
        active-color="primary"
      >
        <q-route-tab
          style="width: 33%"
          :to="{ name: 'app.profile' }"
          name="app.profile"
          icon="o_account_circle"
          label="Perfil"
          no-caps
        />
        <q-route-tab
          style="width: 33%"
          :to="{ name: 'app.home' }"
          name="app.home"
          icon="o_home"
          label="Início"
          no-caps
        />
        <q-route-tab
          style="width: 33%"
          :to="{ name: 'app.history' }"
          name="app.history"
          icon="o_location_on"
          label="Localizações"
          no-caps
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
