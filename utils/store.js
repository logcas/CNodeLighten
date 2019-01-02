
let store = {};

store.set = function(key,data) {
  let success = true;
  try {
    wx.setStorageSync(key, data);
  } catch(e) {
    success = false;
  } finally {
    return success;
  }
};

store.get = function(key) {
  try {
    let value = wx.getStorageSync(key);
    return value;
  } catch(e) {
    return null;
  }
}

store.remove = function(key) {
  let success = true;
  try {
    wx.removeStorageSync('key');
    success = true;
  } catch (e) {
    success = false;
  } finally {
    return success;
  }
}

store.clear = function(options) {
  wx.clearStorage(options);
}

module.exports = store;