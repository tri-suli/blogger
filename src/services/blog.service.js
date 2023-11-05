import _ from "lodash";

import api from "../libs/api";

async function fetchAll (keyword) {
  let url = '/blogs';

  if (!_.isEmpty(keyword)) {
    url += `?search=${keyword}`;
  }

  const result = await api.get(url);
  return result.data.data;
}

export default {
  fetchAll
}