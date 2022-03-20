import * as api from "../api";

const actions = {
  // 인증
  REGISTER({ commit }, { userId, password }) {
    return api.auth.register(userId, password).then(() => commit("REGISTER"));
  },
  LOGIN({ commit }, { userId, password }) {
    return api.auth
      .login(userId, password)
      .then(({ accessToken }) => commit("LOGIN", accessToken));
  },

  // 보드
  ADD_BOARD(_, { title }) {
    return api.board.create(title).then(data => data.item);
  },
  FETCH_BOARDS({ commit }) {
    return api.board.fetch().then(data => {
      commit("SET_BOARDS", data.list);
    });
  },
  FETCH_BOARD({ commit }, { id }) {
    return api.board.fetch(id).then(data => {
      commit("SET_BOARD", data.item);
    });
  },
  UPDATE_BOARD({ state, dispatch }, { id, title, bgColor }) {
    return api.board
      .update(id, { title, bgColor })
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  DELETE_BOARD(_, { id }) {
    return api.board.destroy(id);
  },

  // 리스트
  ADD_LIST({ state, dispatch }, { title, pos, BoardId }) {
    return api.list
      .create({ title, pos, BoardId })
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  UPDATE_LIST({ state, dispatch }, { id, pos, title }) {
    console.log(id, "12321");
    return api.list
      .update(id, { pos, title })
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  DELETE_LIST({ state, dispatch }, { id }) {
    return api.list
      .destroy(id)
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },

  // 카드
  ADD_CARD({ dispatch, state }, { title, pos, ListId }) {
    return api.card
      .create(title, pos, ListId)
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  FETCH_CARD({ commit }, { id }) {
    return api.card.fetch(id).then(data => {
      commit("SET_CARD", data.item);
    });
  },
  UPDATE_CARD({ state, dispatch }, { id, title, description, pos, ListId }) {
    return api.card
      .update(id, { title, description, pos, ListId })
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  DELETE_CARD({ state, dispatch }, { id }) {
    return api.card
      .destroy(id)
      .then(_ => dispatch("FETCH_BOARD", { id: state.board.id }));
  },

  // 체크리스트
  ADD_CHECK({ state, dispatch, commit }, { content, CardId }) {
    return api.check
      .create(content, CardId)
      .then(_ => dispatch("FETCH_CARD", { id: state.board.id }));
  },
  FETCH_CHECKS({ commit }) {
    return api.check.fetch().then(data => {
      commit("SET_CHECKS", data.item);
    });
  },
  UPDATE_CHECK({ state, dispatch }, { id, value, content }) {
    return api.check
      .update(id, value, content)
      .then(_ => dispatch("FETCH_CARD", { id: state.board.id }));
  },
  DELETE_CHECK(_, checkId) {
    console.log(checkId, "123123");
    return api.check.destroy(checkId);
  }
};

export default actions;
