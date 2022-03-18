<template>
  <div class="add-card__container">
    <form @submit.prevent="onSubmit">
      <input
        class="form-control"
        type="text"
        v-model="inputTitle"
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
import { mapActions } from "vuex";
export default {
  props: ["ListId"],
  data() {
    return {
      inputTitle: ""
    };
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    }
  },
  mounted() {
    this.$refs.inputText.focus();
    this.setupClickOutside(this.$el);
  },
  methods: {
    ...mapActions(["ADD_CARD"]),
    onSubmit() {
      if (this.invalidInput) return;
      const { inputTitle, ListId } = this;
      const pos = this.newCardPos();
      this.ADD_CARD({ title: inputTitle, ListId, pos }).finally(
        _ => (this.inputTitle = "")
      );
    },
    newCardPos() {
      const curList = this.$store.state.board.Lists.filter(
        l => l.id === this.ListId
      )[0];
      if (!curList) return 65535;
      const { Cards } = curList;
      if (!Cards.length) return 65535;
      return Cards[Cards.length - 1].pos * 2;
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

.add-card__container {
  padding: 10px;
  display: block;
  position: relative;
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
