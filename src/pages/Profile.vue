<template>
  <q-page class="q-mx-auto" style="max-width: 600px" padding>
    <div class="q-pa-md row items-center text-h6 text-primary">
      <q-icon name="o_account_circle" color="grey-6" size="25px" class="q-mr-md" />
      Meus Dados
    </div>
    <div class="row q-pa-md q-col-gutter-md">
      <div class="col-12">
        <q-input
          v-model="user.name"
          label="Nome"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.email"
          label="E-mail"
          outlined
          disable
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.cpf"
          label="CPF"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.birthday"
          label="Data de Nascimento"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.trackingId"
          label="ID do Rastreador"
          outlined
          dense
        />
      </div>
    </div>
    <div class="q-pa-md row items-center text-h6 text-primary">
      <q-icon name="two_wheeler" color="grey-6" size="30px" class="q-mr-md" />
      Minha Motocicleta
    </div>
    <div class="row q-pa-md q-col-gutter-md">
      <div class="col-12">
        <q-input
          v-model="user.moto.model"
          label="Modelo"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.moto.color"
          label="Cor"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.moto.year"
          label="Ano"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.moto.plate"
          label="Placa"
          outlined
          dense
        />
      </div>
    </div>
    <div class="col-12 q-my-sm text-center">
      <q-btn
        label="Salvar"
        color="primary"
        class="q-px-xl"
        outline
      />
    </div>
    <div class="q-my-sm text-grey-7 text-center">
      <span @click="handleLogout" style="text-decoration: underline" class="cursor-pointer">
        Sair
      </span>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    user: {
      name: 'José Henrique',
      email: 'jhmerlo@outlook.com',
      cpf: '192.177.489-45',
      birthday: '26/06/1999',
      trackingId: 'xiknv-6jGy',
      moto: {
        model: 'Honda CG 160 Titan',
        color: 'Branco/Vermelho',
        year: '2018',
        plate: 'MTH-2888'
      }
    }
  }),
  methods: {
    async handleLogout () {
      await this.$store.dispatch('auth/logout')
      this.$q.notify({
        type: 'positive',
        message: 'Sua conta foi desconectada com sucesso! Volte Sempre :)'
      })
      return this.$router.push({ name: 'login' })
    }
  }
}
</script>
