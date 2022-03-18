<template>
  <div
    class="card-item__container"
    :data-card-id="data.id"
    :data-card-pos="data.pos"
  >
    <router-link :to="`/b/${BoardId}/c/${data.id}`">
      <span>{{ data.title }}</span>
      <div class="card-item-meta" v-if="data.description">&equiv;</div>
      <a class="delete-card-btn" href="" @click.prevent="onDelete">&times;</a>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["data"],
  computed: {
    ...mapState({
      BoardId: state => state.board.id
    })
  },
  methods: {
    ...mapActions(["DELETE_CARD"]),
    onDelete() {
      if (!window.confirm("Delete this card?")) return;
      this.DELETE_CARD({ id: this.data.id });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.card-item__container {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  position: relative;
  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  > a {
    padding: 15px 8px;
    text-decoration: none;
    color: #444;
    word-wrap: break-word;
    white-space: normal;
    overflow: hidden;
    display: block;
    .delete-card-btn {
      position: absolute;
      top: 4px;
      right: 0;
      padding: 10px;
      text-decoration: none;
      font-size: 18px;
      color: #aaa;
    }
  }
  .card-item-meta {
    font-size: 26px;
    padding: 5px 0 0 3px;
    color: #8c8c8c;
  }
}
</style>
