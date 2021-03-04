<template>
  <q-page class="background">
    <q-card style="max-width: 720px; max-height: 820px" class="shadow-20 q-mx-auto q-my-auto fullscreen">
      <div class="q-mb-xl">
        <q-img
          src="~assets/logo.png"
          style="height: 220px"
        />
      </div>
      <q-card-section>
        <q-form @submit="handleLogin" class="row q-px-lg justify-center q-col-gutter-lg">
          <div class="col-12 q-mt-md">
            <q-input
              v-model="user.email"
              :rules="[required, email]"
              label="E-mail"
              lazy-rules
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              v-model="user.password"
              :type="visiblePassword ? 'text' : 'password'"
              :rules="[required]"
              label="Senha"
              lazy-rules
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="gpp_good" />
              </template>
              <template v-slot:append>
                <q-icon
                  @click="visiblePassword = !visiblePassword"
                  class="cursor-pointer"
                  :name="visiblePassword ? 'visibility' : 'visibility_off'"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mt-lg text-center">
            <q-btn
              label="Login"
              class="full-width q-py-sm"
              text-color="primary"
              color="grey-10"
              type="submit"
            />
          </div>
          <div class="col-12 text-center">
            <q-btn
              label="Cadastro"
              class="full-width q-py-sm"
              color="primary"
              outline
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { rules } from 'src/mixins'
export default {
  name: 'Login',
  mixins: [rules],
  data: () => ({
    visiblePassword: false,
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async handleLogin () {
      const { email, password } = this.user
      if (email === 'motociclista@email.com' && password === '12345678') {
        this.$q.loading.show()
        setTimeout(async () => {
          this.$router.push({ name: 'app.home' })
          await this.$store.commit('auth/handleLogin')
          console.log(this.$store.getters['auth/isLogged'])
          this.$q.loading.hide()
        }, 2000)
      } else {
        this.$q.notify({
          message: 'Falha na autenticação, email ou senha incorretos.',
          type: 'negative'
        })
      }
    }
  },
  created () {
    console.log(this.$store.getters['auth/isLogged'])
  }
}
</script>

<style scoped>
.background {
  background: rgb(0,0,0);
  background: linear-gradient(106deg, rgba(0,0,0,1) 0%, rgba(47,47,43,1) 13%, rgba(25,25,29,1) 63%, rgba(47,47,43,0.87718837535014) 100%);
}
</style>
