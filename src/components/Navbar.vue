<template>
  <nav class="header__container">
    <div class="header-logo">
      <router-link to="/">Home</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      navbarColor: "navbarColor",
      bodyColor: "bodyColor"
    }),
    ...mapGetters(["isAuth"])
  },
  watch: {
    bodyColor: "updateTheme"
  },
  mounted() {
    this.updateTheme();
  },
  methods: {
    ...mapMutations(["LOGOUT", "SET_THEME", "SET_IS_SHOW_BOARD_SETTINGS"]),
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
    },
    updateTheme() {
      this.$el.style.backgroundColor = this.navbarColor;
      const body = document.querySelector("body");
      const container = document.querySelector(".container");
      if (body) body.style.backgroundColor = this.bodyColor;
      if (container) container.style.backgroundColor = this.bodyColor;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.header__container {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 10px 10px;
  .header-logo {
    flex: 1;
    text-align: center;
    font-weight: bolder;
    a {
      font: 400 28px/28px $pac;
      color: rgba(255, 255, 255, 1);
      &:hover,
      &:focus {
        color: rgba(255, 255, 255, 0.808);
      }
    }
  }
  .header-auth {
    a {
      display: inline-block;
      border-radius: 2px;
      padding: 5px 8px;
      background-color: rgba(255, 255, 255, 0.5);
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s;
      font: 400 16px/16px $noto;
      &:hover,
      &:focus {
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
