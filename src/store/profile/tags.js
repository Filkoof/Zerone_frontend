import axios from 'axios';

class TagsError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const TagsService = {
  async request(requestData) {
    try {
      const { data } = await axios(requestData);
      return data;
    } catch(error) {
      const { status, data } = error.response;
      throw new TagsError(status, data.error_description);
    }
  },

  async getTags(params) {
    const requestData = {
      method: 'get',
      url: 'tags',
      params,
    }
    return this.request(requestData);
  },

  async postTags(data) {
    const requestData = {
      method: 'post',
      url: 'tags',
      data,
    }
    return this.request(requestData);
  },

  async deleteTag(tagId) {
    const requestData = {
      method: 'delete',
      url: 'tags',
      params: {
        id: tagId
      },
    }
    return this.request(requestData);
  }
};

const concatTags = ({ tags, data, offset}) => {
  if (!offset) {
    return data;
  }

  const allTags = [...tags, ...data];
  const unicTags = new Set(allTags);
  return [...unicTags];
};

const saveTagsData = ({ state, commit, response }) => {
  const tags = state.tags;
  const { total, offset, perPage, data } = response;
  const allTags = concatTags({ tags, data, offset});
  commit('updateTags', allTags);
  commit('updatePageParams', { total, offset, perPage });
};

const saveTagsError = (commit, error) => {
  if (error instanceof TagsError) {
    commit('updateTagsError', {
      errorCode: error.errorCode,
      errorMessage: error.message,
    })
  }
  return false;
};

const state = () => ({
  tags: null,
  pageParams: '',
  tagsError: null,
});

const getters = {
  tags: (state) => state.tags,
  pageParams: (state) => state.pageParams,
  tagsError: (state) => state.tagsError,
};

const mutations = {
  updateTags(state, newData) {
    state.tags = newData;
  },
  updatePageParams(state, newParams) {
    state.pageParams = newParams;
  },
  updateTagsError(state, errorData) {
    state.tagsError = errorData;
  }
};

const actions = {
  async getTags(context, params = {}) {
    const { state, commit } = context;

    try {
      const response = await TagsService.getTags(params);
      saveTagsData({ state, commit, response });
      return true;
    } catch(error) {
      saveTagsError(commit, error);
    }
  },
  async createTag(context, tag) {
    const { commit, dispatch } = context;
    try {
      await TagsService.postTags({ id: 0, tag });
      dispatch('getTags', {tag});
    } catch(error) {
      saveTagsError(commit, error);
    }
  },
  async deleteTag(context, tagId) {
    const { commit, dispatch } = context;
    try {
      await TagsService.deleteTag(tagId);
      dispatch('getTags');
    } catch(error) {
      saveTagsError(commit, error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
