<template>
  <q-page class="q-mx-auto" style="max-width: 600px" padding>
    <div class="q-pa-md row items-center text-h6 text-primary">
      <q-icon name="o_account_circle" color="grey-6" size="25px" class="q-mr-md" />
      Meus Dados
    </div>
    <div class="row q-pa-md">
      <div class="col-12">
        <q-input
          v-model="user.name"
          :rules="[required, validName]"
          label="Nome *"
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.email"
          :rules="[required, email]"
          label="E-mail *"
          outlined
          disable
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.cpf"
          :rules="[required, validCPF]"
          :mask="cpfMask"
          label="CPF *"
          unmasked-value
          outlined
          dense
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="user.trackingId"
          label="ID do Rastreador *"
          disable
          outlined
          dense
        />
      </div>
    </div>
    <div class="q-pa-md row items-center text-h6 text-primary">
      <q-icon name="two_wheeler" color="grey-6" size="30px" class="q-mr-md" />
      Minha Motocicleta
    </div>
    <q-form @submit="editUser">
      <div class="row q-pa-md">
        <div class="col-12">
          <q-input
            v-model="user.moto.model"
            :rules="[required]"
            label="Modelo *"
            outlined
            dense
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="user.moto.color"
            :rules="[required]"
            label="Cor *"
            outlined
            dense
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="user.moto.year"
            :rules="[required]"
            mask="####"
            label="Ano *"
            outlined
            dense
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="user.moto.plate"
            :rules="[required]"
            label="Placa *"
            outlined
            dense
          />
        </div>
      </div>
      <div class="col-12 q-my-sm text-center">
        <q-btn
          type="submit"
          label="Salvar"
          color="primary"
          class="q-px-xl"
          outline
        />
      </div>
    </q-form>
    <div class="q-my-sm text-grey-7 text-center">
      <span @click="handleLogout" style="text-decoration: underline" class="cursor-pointer">
        Sair
      </span>
    </div>
  </q-page>
</template>

<script>
import { rules, masks } from 'src/mixins'
export default {
  name: 'Profile',
  mixins: [rules, masks],
  data: () => ({
    user: {
      name: '',
      email: '',
      cpf: '',
      trackingId: 'xiknv-6jGy',
      moto: {
        model: '',
        color: '',
        year: '',
        plate: ''
      }
    }
  }),
  methods: {
    async handleLogout () {
      await this.$store.dispatch('auth/logout')
      this.$q.notify({
        type: 'positive',
        message: 'Sua conta foi desconectada com sucesso!'
      })
      return this.$router.push({ name: 'login' })
    },
    async getUser () {
      const { data } = await this.$axios.get('user')
      this.user = { ...this.user, ...data.user }
      this.user.moto = data.moto
    },
    async editUser () {
      const { data } = await this.$axios.put('user', this.user)
      this.user = { ...this.user, ...data.user }
      this.user.moto = data.moto
      this.$q.notify({
        type: 'positive',
        message: 'Usuário editado com sucesso!'
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>
