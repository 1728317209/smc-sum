function get(name) {
  let data = localStorage.getItem(name) || '';
  try {
    data = JSON.parse(data);
  } catch (e) {
    // console.log(e)
  }
  return data;
}

function remove(name) {
  localStorage.removeItem(name);
}

function set(name, data) {
  let dataCopy = data;
  if (typeof data === 'object') {
    dataCopy = JSON.stringify(data);
  }

  localStorage.setItem(name, dataCopy);
}

function clear() {
  localStorage.clear();
}

const LocalStorage = {
  get,
  remove,
  set,
  clear,
};

export default LocalStorage;
