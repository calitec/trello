<template>
  <div
    class="list__container"
    :data-list-id="data.id"
    :data-list-pos="data.pos"
  >
    <div class="list-header" @click="onClickTitle">
      <input
        v-if="isEditTitle"
        class="form-control input-title"
        type="text"
        v-model="inputTitle"
        ref="inputTitle"
        @keyup.enter="onSubmitTitle"
        @blur="onBlurTitle"
      />
      <div v-else class="list-header-title">
        {{ data.title }}
      </div>
      <a class="delete-list-btn" href="" @click.prevent="onDeleteList"
        >&times;</a
      >
    </div>

    <div class="card-list" :data-list-id="data.id">
      <CardItem v-for="card in data.Cards" :key="`${card.id}`" :data="card" />
    </div>

    <div v-if="isAddCard">
      <AddCard :list-id="data.id" @close="isAddCard = false" />
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent="isAddCard = true">
        &plus; Add a card...
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddCard from "./AddCard.vue";
import CardItem from "./CardItem.vue";
export default {
  components: { AddCard, CardItem },
  props: ["data"],
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  created() {
    this.inputTitle = this.data.title;
  },
  methods: {
    ...mapActions(["UPDATE_LIST", "DELETE_LIST"]),
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(_ => this.$refs.inputTitle.focus());
    },
    onSubmitTitle() {
      this.$refs.inputTitle.blur();
    },
    onBlurTitle() {
      this.isEditTitle = false;
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;
      const id = this.data.id;
      const title = this.inputTitle;
      if (title === this.data.title) return;

      this.UPDATE_LIST({ id, title });
    },
    onDeleteList() {
      if (!confirm(`Delete ${this.data.title} list?`)) return;
      this.DELETE_LIST({ id: this.data.id });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.list__container {
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  .list-header {
    padding: 10px 8px 8px;
    position: relative;
    .input-title {
      width: 90%;
      font: 400 16px/16px $noto;
    }
    .list-header-title {
      font: 700 16px/30px $noto;
      padding-left: 8px;
    }

    .delete-list-btn {
      position: absolute;
      right: 10px;
      top: 8px;
      text-decoration: none;
      color: #aaa;
      font-size: 24px;
    }
  }
  .card-list {
    overflow-y: auto;
  }
}
.add-card-btn {
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}
</style>
