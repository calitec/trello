<template>
  <div class="register__container">
    <h2>Join to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="userId">Id</label>
        <input
          class="form-control"
          type="text"
          name="userId"
          v-model="userId"
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
      <div>
        <label for="password">Passwrod Check</label>
        <input
          class="form-control"
          type="password"
          v-model="passwordCheck"
          placeholder="123123"
        />
        <div
          class="password-check"
          :class="{
            valid: passwordCheck.length >= 1 && password == passwordCheck
          }"
        >
          패스워드가 일치 합니다.
        </div>
      </div>
      <div
        class="password-check"
        :class="{
          'invalid error':
            passwordCheck.length >= 1 && password !== passwordCheck
        }"
      >
        패스워드가 일치하지 않습니다.
      </div>
      <button
        class="btn"
        :class="{ 'btn-success': !invalidForm }"
        type="submit"
        :disabled="invalidForm"
      >
        회원가입
      </button>
      <button class="btn btn-success" type="submit" :disabled="invalidForm">
        <router-link :to="`/login`"> 회원정보가 있으신가요? </router-link>
      </button>
    </form>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      userId: "",
      password: "",
      passwordCheck: "",
      returnPath: "",
      error: ""
    };
  },
  computed: {
    invalidForm() {
      return (
        !this.userId || !this.password || this.password !== this.passwordCheck
      );
    }
  },
  created() {
    this.returnPath = this.$route.query.returnPath || "/";
    this.SET_THEME();
  },
  methods: {
    ...mapMutations(["SET_THEME"]),
    onSubmit() {
      const { userId, password } = this;
      this.$store
        .dispatch("REGISTER", { userId, password })
        .then(() => {
          this.$router.push(this.returnPath);
        })
        .catch(err => {
          this.error = err.response.data.error;
        });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";
.register__container {
  width: 400px;
  margin: 0 auto;
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
    input {
      display: inline-block;
    }
  }
  .btn {
  }
}
.password-check {
  display: none;
  margin-bottom: 15px;
  font: 400 14px/14px $notoKR;
  &.valid {
    display: block;
    color: green;
  }
  &.invalid {
    display: block;
    margin: 0 0 10px;
  }
}
.error {
  color: #f00;
}
</style>
