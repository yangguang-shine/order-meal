"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("@/App"));

var _router = _interopRequireDefault(require("@/utils/router.js"));

var _fly = _interopRequireDefault(require("@/utils/fly.js"));

var _store = _interopRequireDefault(require("@/store"));

var _noData = _interopRequireDefault(require("@/components/no-data.vue"));

var _utils = require("@/utils");

var _tool = require("@/utils/tool.js");

require("@/style/flex.css");

require("@/style/common.css");

var _BottomButton = _interopRequireDefault(require("@/components/BottomButton.vue"));

var _vuex = require("vuex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].component('no-data', _noData["default"]);

_vue["default"].config.productionTip = false;
_vue["default"].prototype.$router = _router["default"];
_vue["default"].prototype.$store = _store["default"];
_vue["default"].prototype.$fetch = _fly["default"];
_vue["default"].prototype.$showModal = _utils.showModal;
_vue["default"].prototype.$showLoading = _utils.showLoading;
_vue["default"].prototype.$showToast = _utils.showToast;
_vue["default"].prototype.$hideLoading = _utils.hideLoading;
_vue["default"].prototype.$setStorage = _tool.setStorage;
_vue["default"].prototype.$getStorage = _tool.getStorage; // Vue.prototype.$data.$mainColor = '#47ff56'
// Vue.prototype.$mainColor = '#47ff56'

_App["default"].mpType = 'app';
var _$mainColor = "#cb9ddb";
var _$mainColor2 = "#58a3dd";
var app = new _vue["default"](_objectSpread({}, _App["default"], {
  store: _store["default"]
}));

_vue["default"].component('bottom-button', _BottomButton["default"]);

_vue["default"].mixin({
  // 用得比较多且需要在模板里用可以放到这里，如果用jsx就没有这么多事
  computed: _objectSpread({
    // 不能修改
    $mainColor: function $mainColor() {
      return _$mainColor;
    },
    $mainColor2: function $mainColor2() {
      return _$mainColor2;
    }
  }, (0, _vuex.mapState)({
    selectShopItem: function selectShopItem(state) {
      return (0, _tool.vuexStorage)(state, 'selectShopItem') || {};
    }
  }))
});

app.$mount();