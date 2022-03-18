<template>
  <div class="home__container">
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div
        class="board-item"
        v-for="b in boards"
        :key="b.id"
        :data-bgcolor="b.bgColor"
        ref="boardItem"
      >
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a
          class="new-board-btn"
          href=""
          @click.prevent="SET_IS_ADD_BOARD(true)"
        >
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import AddBoard from "./AddBoard.vue";
export default {
  components: {
    AddBoard
  },
  data() {
    return {
      loading: false,
      error: ""
    };
  },
  computed: {
    ...mapState({
      isAddBoard: "isAddBoard",
      boards: "boards"
    })
  },
  created() {
    this.fetchData();
    this.SET_THEME();
  },
  updated() {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor;
    });
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD", "SET_THEME"]),
    ...mapActions(["FETCH_BOARDS"]),
    fetchData() {
      this.loading = true;
      this.FETCH_BOARDS().finally(_ => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";
.home__container {
  .home-title {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    font: 700 16px/16px $noto;
    color: #363636;
  }
  .board-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    .board-item {
      width: 23%;
      height: 100px;
      margin: 0 2% 20px 0;
      border-radius: 3px;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        width: 100%;
        height: 100%;
        &:hover,
        &:focus {
          background-color: rgba(0, 0, 0, 0.1);
          color: #666;
        }
        &.new-board-btn {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          height: 100px;
          width: inherit;
          color: #888;
          font-weight: 700;
        }
      }
    }
    .board-item-new {
      background-color: #ddd;
    }
    .board-item-title {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      padding: 10px;
    }
  }
}
</style>
