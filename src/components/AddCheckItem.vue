<template>
  <div class="add-check-item__container">
    <form @submit.prevent="onSubmit">
      <input
        class="form-control"
        type="text"
        v-model="content"
        ref="inputText"
      />
      <button class="btn btn-success" type="submit" :disabled="invalidInput">
        Add Card
      </button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')"
        >&times;</a
      >
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["ListId"],
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapState({
      card: "card"
    }),
    invalidInput() {
      return !this.content.trim();
    }
  },
  mounted() {
    this.$refs.inputText.focus();
    this.setupClickOutside(this.$el);
  },
  methods: {
    ...mapActions(["ADD_CHECK", "FETCH_CARD"]),
    fetchCard() {
      const id = this.$route.params.cid;
      this.FETCH_CARD({ id });
    },
    onSubmit() {
      if (this.invalidInput) return;
      const { content } = this;
      const CardId = this.card.id;
      this.ADD_CHECK({ content, CardId })
        .then(_ => this.fetchCard())
        .finally(_ => (this.content = ""));
    },
    setupClickOutside(el) {
      document.querySelector("body").addEventListener("click", e => {
        if (el.contains(e.target)) return;
        this.$emit("close");
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.add-check-item__container {
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
  form {
    width: 100%;
    .form-control {
      margin: 0 10px 0 0;
    }
  }
  .cancel-add-btn {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    text-decoration: none;
    color: #888;
    font-size: 24px;
    &:hover,
    &:focus {
      color: #666;
    }
  }
}
</style>
