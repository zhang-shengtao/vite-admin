export function getStorage(key) {
  return localStorage.getItem(key);
}

export function setStorage(key, val) {
  localStorage.setItem(key, val);
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}

// 清空缓存
export function cleatStorage() {
  localStorage.clear();
}
