import { SupportError, SupportApi } from '@/api/support.api'

const saveSupportError = (commit, error) => {
  if (error instanceof SupportError) {
    commit('updateSupportError', {
      errorCode: error.errorCode,
      errorMessage: error.message,
    })
  }
  return false;
};

const state = () => ({
  supportMessage: null,
  supportError: null,
});

const getters = {
  supportMessage: (state) => state.supportMessage,
  supportError: (state) => state.supportError,
};

const mutations = {
  updateSupportMessage(state, newData) {
    state.supportMessage = newData;
  },
  updateSupportError(state, errorData) {
    state.supportError = errorData;
  }
};

const actions = {
  async sendMessage(context, data) {
    const { commit } = context;
    try {
      const { message } = await SupportApi.postSupport(data);
      commit('updateSupportMessage', message);
      return true;
    } catch(error) {
      saveSupportError(commit, error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
