import _ from "lodash";

import api from "../libs/api";
import schedule from "../pages/Schedule";

async function fetchAll (keyword) {
  let url = '/schedules';

  if (!_.isEmpty(keyword)) {
    url += `?search=${keyword}`;
  }

  const result = await api.get(url);
  return result.data.data;
}

async function create (attribute){
  let result = {};

  try {
    return await api.post('/schedules', attribute);
  } catch (e) {
    if (e.response) {
      result = e.response.data.data
    }
  }

  return result;
}

async function update (attribute){
  let result = {};

  try {
    return await api.patch(`/schedules/${attribute._id}`, attribute);
  } catch (e) {
    if (e.response) {
      result = e.response.data.data
    }
  }

  return result;
}

async function remove (attribute){
  let result = {};

  try {
    return await api.delete('/schedules', {
      data: attribute
    });
  } catch (e) {
    if (e.response) {
      result = e.response.data.data
    }
  }

  return result;
}

export default {
  create,
  update,
  remove,
  fetchAll
}