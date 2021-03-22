<template>
  <q-page class="background">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      fullscreen
      control-color="primary"
      class="rounded-borders"
    >
      <q-carousel-slide :name="1" style="max-width: 500px" class="column q-mx-auto no-wrap flex-center">
        <div class="text-grey-9 text-center q-py-md text-h6">
          MotoTracking
        </div>
        <div class="text-subtitle2 text-primary text-center">
          Veículos inteligentes necessitam rastreadores inteligentes
        </div>
        <div class="text-center full-width q-mt-md">
          <q-btn
            @click="slide++"
            label="Começar"
            class="full-width q-py-sm"
            color="primary"
            unelevated
          />
        </div>
        <div class="text-center full-width q-mt-md">
          <q-btn
            :to="{ name: 'login' }"
            label="Voltar ao Início"
            class="full-width q-py-sm"
            color="grey-8"
            outline
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" style="max-width: 500px" class="column q-mx-auto no-wrap flex-center">
          <div class="text-center">
            <q-img
              src="~assets/my_data.svg"
              style="width: 300px; max-width: 90%"
            />
          </div>
          <div class="text-primary text-center q-py-md text-body1">
            Hora de registrar os seus dados!
          </div>
          <q-form @submit.prevent="handleRegister" class="row q-px-sm justify-center q-col-gutter-sm">
            <div class="col-12">
              <q-input
                v-model="user.name"
                :rules="[required, validName]"
                label="Nome *"
                outlined
                lazy-rules
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="user.email"
                :rules="[required, email]"
                label="E-mail *"
                outlined
                lazy-rules
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
                lazy-rules
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="user.password"
                type="password"
                :rules="[
                  required,
                  val => minLength(val, 8)
                ]"
                label="Senha *"
                outlined
                lazy-rules
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="user.password_confirmation"
                type="password"
                :rules="[
                  required,
                  val => sameAs(val, user.password, 'Senhas não conferem.')
                ]"
                label="Confirmar Senha *"
                outlined
                lazy-rules
                dense
              />
            </div>
            <div class="col-12 text-center">
              <q-btn
                type="submit"
                label="Próximo"
                class="full-width q-py-sm"
                color="primary"
                unelevated
              />
            </div>
            <div class="text-center full-width">
              <q-btn
                @click="slide--"
                label="Anterior"
                class="full-width q-py-sm"
                color="grey-8"
                outline
              />
            </div>
          </q-form>
      </q-carousel-slide>
      <q-carousel-slide :name="3" style="max-width: 500px" class="column q-mx-auto no-wrap flex-center">
          <div class="text-center">
            <q-img
              src="~assets/my_moto.svg"
              style="width: 300px; max-width: 90%"
            />
          </div>
          <div class="text-primary text-center q-py-md text-body1">
            Hora de registrar os dados da sua moto!
          </div>
          <q-form @submit.prevent="handleRegister" class="row q-px-sm justify-center q-col-gutter-sm">
            <div class="col-12">
              <q-input
                v-model="user.moto.model"
                :rules="[required]"
                label="Modelo *"
                lazy-rules
                outlined
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="user.moto.color"
                :rules="[required]"
                label="Cor *"
                lazy-rules
                outlined
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="user.moto.year"
                :rules="[
                  required,
                  val => minLength(val, 4, 'Utilize o formato AAAA')
                ]"
                label="Ano *"
                mask="####"
                lazy-rules
                outlined
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="user.moto.plate"
                :rules="[required]"
                label="Placa"
                lazy-rules
                outlined
                dense
              />
            </div>
            <div class="col-12 text-center">
              <q-btn
                type="submit"
                label="Concluir"
                class="full-width q-py-sm"
                color="primary"
                unelevated
              />
            </div>
            <div class="text-center full-width">
              <q-btn
                @click="slide--"
                label="Anterior"
                class="full-width q-py-sm"
                color="grey-8"
                outline
              />
            </div>
          </q-form>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { rules, masks } from 'src/mixins'
export default {
  name: 'Register',
  mixins: [rules, masks],
  data: () => ({
    visiblePassword: false,
    slide: 1,
    user: {
      email: '',
      cpf: '',
      password_confirmation: '',
      password: '',
      moto: {
        model: '',
        color: '',
        year: '',
        plate: ''
      }
    }
  }),
  methods: {
    async handleRegister () {
      if (this.slide === 3) {
        await this.$axios.post('register', this.user)
        this.$q.notify({
          type: 'positive',
          message: 'Usuário cadastrado com sucesso, faça login para continuar.'
        })
        return this.$router.push({ name: 'login' })
      } else this.slide++
    }
  }
}
</script>

<style scoped>
.background {
  background: rgb(0,0,0);
  background: linear-gradient(106deg, rgba(0,0,0,1) 0%, rgba(47,47,43,1) 13%, rgba(25,25,29,1) 63%, rgba(47,47,43,0.87718837535014) 100%);
}
</style>
