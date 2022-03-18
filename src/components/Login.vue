<template>
  <div class="login__container">
    <h2>Come to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input
          class="form-control"
          type="text"
          name="email"
          v-model="email"
          autofocus
          placeholder="e.g., test@test.com"
        />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input
          class="form-control"
          type="password"
          v-model="password"
          placeholder="123123"
        />
      </div>
      <button
        class="btn"
        :class="{ 'btn-success': !invalidForm }"
        type="submit"
        :disabled="invalidForm"
      >
        Log In
      </button>
      <button class="btn btn-success" type="submit" :disabled="invalidForm">
        <router-link :to="`/register`">
          회원가입
        </router-link>
      </button>
    </form>
    <p class="error" v-if="error">{{ error.toUpperCase() }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: ""
    };
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password;
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    ...mapActions(["LOGIN"]),
    onSubmit() {
      this.LOGIN({ email: this.email, password: this.password })
        .then(data => {
          this.$router.push(this.rPath);
        })
        .catch(err => {
          this.error = err.data.error;
        });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.login__container {
  width: 400px;
  margin: 0 auto;
  .error {
    color: #f00;
    margin-top: 20px;
    font: 400 14px/14px $noto;
  }
  h2 {
    font: 700 16px/16px $pac;
    margin: 10px 0 0;
  }
  div {
    label {
      display: inline-block;
      margin: 15px 0 8px;
      font: $reguler;
    }
  }
  .btn {
  }
}
</style>
