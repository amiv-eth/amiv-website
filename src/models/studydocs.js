import m from 'mithril';
import { apiUrl } from './config';
import { getToken } from './auth';

let querySaved = {};


export function getList() {
  if (typeof this.list === 'undefined') {
    return [];
  }
  return this.list;
}

export function load(query = {}) {
  querySaved = query;
  const queryEncoded = m.buildQueryString({ where: JSON.stringify(query) });

  return m.request({
    method: 'GET',
    url: `${apiUrl}/studydocuments?${queryEncoded}`,
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((result) => {
    this.list = result._items;
  });
}

export function reload() {
  return load(querySaved);
}

export function addNew(doc) {
  if (typeof doc !== 'object') {
    return new Promise(() => { }); // empty promise
  }
  const form = new FormData();
  Object.keys(doc).forEach((key) => {
    if (key === 'files') {
      for (let i = 0; i < doc.files.length; i += 1) {
        form.append('files', doc.files[i]);
      }
    } else {
      form.append(key, doc[key]);
    }
  });

  return m.request({
    method: 'POST',
    url: `${apiUrl}/studydocuments`,
    data: form,
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
}
