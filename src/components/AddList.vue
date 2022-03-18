<template>
  <div class="add-list__container" @click="onAddList">
    <input
      class="form-control"
      v-if="isAddList"
      type="text"
      ref="inputTitle"
      v-model="inputTitle"
      @keyup.enter="onSubmitTitle"
      @blur="restore"
    />
    <a v-else>&plus; Add another list</a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isAddList: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState({
      board: "board"
    })
  },
  methods: {
    ...mapActions(["ADD_LIST"]),
    onAddList() {
      this.isAddList = true;
      this.$nextTick(_ => this.$refs.inputTitle.focus());
    },
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return this.resotre();
      const title = this.inputTitle;
      const lastList = this.board.Lists[this.board.Lists.length - 1];
      const pos = lastList ? lastList.pos * 2 : 65535;
      const BoardId = this.board.id;
      this.ADD_LIST({ title, pos, BoardId }).then(_ => this.restore());
    },
    restore() {
      this.isAddList = false;
      this.inputTitle = "";
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.add-list__container {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 12px;
  color: #ddd;
  transition: all 0.3s;
  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
}
</style>
