export function getStorage(key) {
  return localStorage.getItem(key);
}

export function setStorage(key, val) {
  localStorage.setItem(key, val);
}

/**
 * 删除某个key对应的数据
 * @param {String} key 需要删除的key
 */
export function removeStorage(key) {
  localStorage.removeItem(key);
}

/**清空缓存*/
export function cleatStorage() {
  localStorage.clear();
}
