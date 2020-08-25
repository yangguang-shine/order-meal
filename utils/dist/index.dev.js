"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideToast = exports.hideLoading = exports.showToast = exports.showLoading = exports.showModal = exports.authorize = exports.getSetting = void 0;

var getSetting = function getSetting(scopeName) {
  return new Promise(function (resolve, reject) {
    uni.getSetting({
      success: function success(res) {
        if (res.authSetting[scopeName]) resolve();else reject(res);
      },
      fail: function fail(res) {
        reject(res);
      }
    });
  });
};

exports.getSetting = getSetting;

var authorize = function authorize(scopeName) {
  return new Promise(function (resolve, reject) {
    uni.authorize({
      scope: scopeName,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(res) {
        reject(res);
      }
    });
  });
};

exports.authorize = authorize;

var showModal = function showModal(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? '提示' : _ref$title,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? '' : _ref$content,
      _ref$showCancel = _ref.showCancel,
      showCancel = _ref$showCancel === void 0 ? false : _ref$showCancel,
      _ref$cancelText = _ref.cancelText,
      cancelText = _ref$cancelText === void 0 ? '取消' : _ref$cancelText,
      _ref$confirmText = _ref.confirmText,
      confirmText = _ref$confirmText === void 0 ? '确定' : _ref$confirmText;
  return new Promise(function (resolve, reject) {
    uni.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      cancelText: cancelText,
      confirmText: confirmText,
      success: function success(res) {
        if (res.confirm) {
          resolve(res);
        } else if (res.cancel) {
          reject(res);
        } else {
          reject(res);
        }
      },
      fail: function fail() {
        reject();
      }
    });
  });
};

exports.showModal = showModal;

var showLoading = function showLoading() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? '加载中' : _ref2$title,
      _ref2$mask = _ref2.mask,
      mask = _ref2$mask === void 0 ? true : _ref2$mask;

  return new Promise(function (resolve, reject) {
    uni.showLoading({
      title: title,
      mask: mask,
      success: function success() {
        resolve();
      },
      fail: function fail() {
        reject();
      }
    });
  });
};

exports.showLoading = showLoading;

var showToast = function showToast() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$title = _ref3.title,
      title = _ref3$title === void 0 ? '' : _ref3$title,
      _ref3$icon = _ref3.icon,
      icon = _ref3$icon === void 0 ? 'none' : _ref3$icon,
      _ref3$duration = _ref3.duration,
      duration = _ref3$duration === void 0 ? 1500 : _ref3$duration,
      _ref3$mask = _ref3.mask,
      mask = _ref3$mask === void 0 ? false : _ref3$mask;

  return new Promise(function (resolve, reject) {
    uni.showToast({
      title: title,
      icon: icon,
      duration: duration,
      mask: mask,
      success: function success() {
        resolve();
      },
      fail: function fail() {
        reject();
      }
    });
  });
};

exports.showToast = showToast;

var hideLoading = function hideLoading() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$title = _ref4.title,
      title = _ref4$title === void 0 ? '' : _ref4$title,
      _ref4$icon = _ref4.icon,
      icon = _ref4$icon === void 0 ? 'none' : _ref4$icon,
      _ref4$duration = _ref4.duration,
      duration = _ref4$duration === void 0 ? 1500 : _ref4$duration,
      _ref4$mask = _ref4.mask,
      mask = _ref4$mask === void 0 ? false : _ref4$mask;

  return new Promise(function (resolve, reject) {
    uni.hideLoading({
      success: function success() {
        resolve();
      },
      fail: function fail() {
        reject();
      }
    });
  });
};

exports.hideLoading = hideLoading;

var hideToast = function hideToast() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref5$title = _ref5.title,
      title = _ref5$title === void 0 ? '' : _ref5$title,
      _ref5$icon = _ref5.icon,
      icon = _ref5$icon === void 0 ? 'none' : _ref5$icon,
      _ref5$duration = _ref5.duration,
      duration = _ref5$duration === void 0 ? 1500 : _ref5$duration,
      _ref5$mask = _ref5.mask,
      mask = _ref5$mask === void 0 ? false : _ref5$mask;

  return new Promise(function (resolve, reject) {
    uni.hideToast({
      success: function success() {
        resolve();
      },
      fail: function fail() {
        reject();
      }
    });
  });
};

exports.hideToast = hideToast;