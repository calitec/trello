<template>
  <div class="check-list__container">
    <div class="check-list-header"><h3>Checklists</h3></div>
    <div class="progress-bar">
      <em>{{ progress ? progress : 0 }}%</em>
      <div>
        <span
          v-bind:style="{
            width: progress + '%',
            backgroundColor: progress == 100 ? 'green' : '#5e6c84'
          }"
        ></span>
      </div>
    </div>
    <div class="check-items">
      <div v-for="(check, index) in card.CheckLists" :key="check.id">
        <form action="" @submit.prevent="() => onSaveContent(check.id, index)">
          <input
            type="checkbox"
            class="checkbox"
            v-bind:checked="check.value == 'incomplete' ? false : true"
            v-on:change="e => onSaveCheck(check.id, e)"
          />
          <input
            type="text"
            :readonly="!toggleContent"
            @click="toggleContent = true"
            :value="check.content"
            ref="inputContent"
          />
          <button type="submit">Save</button>
          <button @click.prevent="() => onDeleteCheck(check.id)">Delete</button>
        </form>
      </div>
      <div v-if="isAddCheckList">
        <AddCheckItem @close="isAddCheckList = false" />
      </div>
      <div v-else>
        <button class="btn" href="" @click.prevent="isAddCheckList = true">
          Add an item
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddCheckItem from "./AddCheckItem.vue";

export default {
  components: { AddCheckItem },
  props: ["checklist"],
  data() {
    return {
      isAddCheckList: false,
      toggleContent: false,
      checked: [],
      progress: 0
    };
  },
  computed: {
    ...mapState({
      card: "card"
    })
  },
  created() {
    this.fetchCard();
  },
  updated() {
    const len = this.card.CheckLists.length;
    const result =
      (this.card.CheckLists.filter(v => {
        return v.value == "complete";
      }).length /
        len) *
      100;
    this.progress = Math.floor(result);
  },
  methods: {
    ...mapActions(["ADD_CARD", "UPDATE_CHECK", "DELETE_CHECK", "FETCH_CARD"]),
    fetchCard() {
      const id = this.$route.params.cid;
      this.FETCH_CARD({ id });
    },
    onSaveCheck(checkId, e) {
      e.preventDefault();
      const value = {
        id: checkId,
        value: e.target.checked
      };
      const len = this.card.CheckLists.length;

      if (e.target.value) {
        this.checked.push(checkId);
      } else {
        this.checked = this.checked.filter(v => {
          v !== checkId;
        });
      }
      this.progress = (this.checked.length / len) * 100;

      this.UPDATE_CHECK(value).then(() => {
        this.fetchCard();
      });
    },
    onSaveContent(checkId, index) {
      this.toggleContent = false;
      const content = this.$refs.inputContent[index].value.trim();
      const value = {
        id: checkId,
        content
      };
      this.UPDATE_CHECK(value).then(() => {
        this.fetchCard();
      });
    },
    onDeleteCheck(checkId) {
      if (!confirm(`Are you sure to delete this Item?`)) return;
      this.DELETE_CHECK(checkId).then(() => this.fetchCard());
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

.check-list__container {
  overflow: auto;
  max-height: 300px;
  .check-list-header {
    display: flex;
    align-items: center;
    margin: 30px 0 0;
    h3 {
      font: 700 16px/16px $noto;
    }
  }
  .progress-bar {
    position: relative;
    margin: 10px 0 20px;
    em {
      font: 400 15px/15px $noto;
      color: #5e6c84;
      left: 0;
      line-height: 10px;
      position: absolute;
      text-align: center;
      top: -1px;
      width: 32px;
    }
    div {
      background: #091e4214;
      border-radius: 4px;
      clear: both;
      height: 8px;
      margin: 0 0 0 40px;
      overflow: hidden;
      position: relative;
      span {
        display: block;
        width: 0%;
        height: 100%;
        /* background-color: #5e6c84; */
      }
    }
  }
  .check-items {
    position: relative;
    div {
      form {
        display: flex;
        align-items: center;
        input {
          flex: 1;
          background-color: transparent;
          padding: 5px 0;
          &.checkbox {
            flex: none;
            width: 16px;
            height: 16px;
            left: 0;
            border-radius: 2px;
            box-shadow: inset 0 0 0 2px #dfe1e6;
            background-color: #fafbfc;
            margin: 6px;
            overflow: hidden;
            text-align: center;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
          }
        }
        button:not(.btn) {
          display: inline-block;
          position: relative;
          background-color: #091e420a;
          font: 400 14px/14px $noto;
          font-weight: 400;
          line-height: 20px;
          margin: 8px 4px 0 0;
          padding: 6px 12px;
          text-align: center;
          border-radius: 3px;
          margin-bottom: 8px;
          text-decoration: none;
          box-sizing: border-box;
          -webkit-appearance: none;
          cursor: pointer;
          &:hover {
            background-color: #091e4214;
          }
        }
      }
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}
</style>
