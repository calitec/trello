<template>
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input
          class="form-control"
          type="text"
          v-model="card.title"
          :readonly="!toggleTitle"
          @click="toggleTitle = true"
          @blur="onBlurTitle"
          ref="inputTitle"
        />
      </div>
      <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body" class="modal-card-body">
      <h3>Description</h3>
      <textarea
        class="form-control"
        rows="3"
        placeholder="Add a more detailed description..."
        :readonly="!toggleDesc"
        @click="toggleDesc = true"
        @blur="onBlurDesc"
        v-model="card.description"
        ref="inputDesc"
      ></textarea>
      <CheckList :card="card" />
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import CheckList from "./CheckList.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { Modal, CheckList },
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false
    };
  },
  computed: {
    ...mapState({
      card: "card",
      board: "board"
    })
  },
  created() {
    this.fetchCard();
  },
  methods: {
    ...mapActions(["FETCH_CARD", "UPDATE_CARD"]),
    fetchCard() {
      const id = this.$route.params.cid;
      this.FETCH_CARD({ id });
    },
    onClose() {
      this.$router.push(`/b/${this.board.id}`);
    },
    onBlurTitle() {
      this.toggleTitle = false;
      const title = this.$refs.inputTitle.value.trim();
      if (!title) return;
      this.UPDATE_CARD({ id: this.card.id, title }).then(() => {
        this.fetchCard();
      });
    },
    onBlurDesc() {
      this.toggleDesc = false;
      const description = this.$refs.inputDesc.value.trim();
      this.UPDATE_CARD({ id: this.card.id, description });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.modal-card {
  .modal-container {
    min-width: 300px;
    max-width: 800px;
    width: 40%;
    height: auto;
    overflow: auto;
    .modal-card-header {
      position: relative;
      .modal-card-header-title {
        padding-right: 30px;
        input {
          font: 700 20px/20px $noto;
          background: transparent;
          border: none;
          padding-left: 0;
        }
      }
      .modal-close-btn {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 24px;
        text-decoration: none;
        color: #000;
      }
    }
    .modal-card-body {
      h3 {
        font: 700 16px/16px $noto;
        margin-bottom: 10px;
      }
      > .form-control {
        height: auto;
        /* min-height: 100px; */
        line-height: 20px;
        /* border: 0; */
      }
    }
  }
}
</style>
