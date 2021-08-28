// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hz976":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "44998faef7e7bf39";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"2YoVz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _configJs = require("./config.js");
var _modelJs = require("../src/model.js");
var _countryViewJs = require("./view/countryView.js");
var _countryViewJsDefault = parcelHelpers.interopDefault(_countryViewJs);
var _saveViewJs = require("./view/saveView.js");
var _saveViewJsDefault = parcelHelpers.interopDefault(_saveViewJs);
var _paginationViewJs = require("./view/paginationView.js");
var _paginationViewJsDefault = parcelHelpers.interopDefault(_paginationViewJs);
var _countryPageViewJs = require("./view/countryPageView.js");
var _countryPageViewJsDefault = parcelHelpers.interopDefault(_countryPageViewJs);
var _countryNeighbourViewJs = require("./view/countryNeighbourView.js");
var _countryNeighbourViewJsDefault = parcelHelpers.interopDefault(_countryNeighbourViewJs);
var _navViewJs = require("./view/navView.js");
var _navViewJsDefault = parcelHelpers.interopDefault(_navViewJs);
var _countrySearchViewJs = require("./view/countrySearchView.js");
var _countrySearchViewJsDefault = parcelHelpers.interopDefault(_countrySearchViewJs);
var _headerViewJs = require("./view/headerView.js");
var _headerViewJsDefault = parcelHelpers.interopDefault(_headerViewJs);
// Display Countries Card
const controlAllCountries = async function(sortingLetter = "a") {
    try {
        //get all countries data
        await _modelJs.getAllCountries(_configJs.ALL__COUNTRIES__API, sortingLetter);
        //render countries card start with A
        _countryViewJsDefault.default.renderCard(_modelJs.state.countriesFilterByLetter);
    } catch (err) {
        console.error(`${err} Yo`);
    }
};
//Display Country Detail Page
const controlCountryDetails = async function(countryName) {
    try {
        // get country
        const country = _modelJs.state.countriesAll.find((country1)=>country1.name.toLowerCase() === countryName
        );
        if (!country) throw new Error(` Check spelling '${countryName.toUpperCase()}' isn't a country. You can also try to create country '${countryName.toUpperCase()}'for yourself 😛`);
        // get country lat lng
        const countryLatLng = country.latlng;
        // get bordering countries Alpha3Code
        const countryBorders = country.borders;
        getBorderingCountries(_modelJs.state.countriesAll, countryBorders);
        // render country detail page
        _countryPageViewJsDefault.default.renderPage(country, borderCountry);
        //remove previous border countries
        borderCountry = [];
        // display country location on map
        renderMap(...countryLatLng, countryName.charAt(0).toUpperCase() + countryName.slice(1));
    } catch (err) {
        _countryPageViewJsDefault.default.renderError(err);
    }
};
//Get negighbouring country
let borderCountry = [];
const getBorderingCountries = function(countriesAll, countryBorders) {
    countryBorders.forEach((countryCode)=>{
        countriesAll.filter((country)=>{
            if (country.alpha3Code === countryCode) borderCountry.push(country);
        });
    });
};
// Display Current Country
const controlWhereAmI = async function() {
    try {
        // get country [lat,lng]
        await _modelJs.getLatLng(_configJs.TRACK__IP__API);
        // get country
        const country = _modelJs.state.countriesAll.find((country1)=>country1.alpha2Code === _modelJs.state.ipTrackedCountry
        );
        if (!country) throw new Error("You're a Jason Bourne 😛 couldn't find you at the moment");
        // get country borders
        const countryBorders = country.borders;
        // get bordering countries
        getBorderingCountries(_modelJs.state.countriesAll, countryBorders);
        // render country detail page
        _countryPageViewJsDefault.default.renderPage(country, borderCountry, _modelJs.state.city);
        // render country location on map
        renderMap(..._modelJs.state.latlng, "You are here now!");
    } catch (err) {
        _countryPageViewJsDefault.default.renderError(err);
    }
};
// Display Filtered Countries
const controlFilterBy = function(filterBy) {
    // render countries card by population ascending
    if (filterBy === "population") {
        _modelJs.sortCountries(filterBy);
        _countryViewJsDefault.default.renderCard(_modelJs.state.sortedCountries);
    }
    // render countries card by area size ascending
    if (filterBy === "area") {
        _modelJs.sortCountries(filterBy);
        _countryViewJsDefault.default.renderCard(_modelJs.state.sortedCountries);
    }
    // render favourite countries card
    if (filterBy === "favourite") _countryViewJsDefault.default.renderCard(_modelJs.state.bookmarkedCountry);
    // render traveled countries card
    if (filterBy === "traveled") {
        console.log(_modelJs.state.traveledCountry);
        _countryViewJsDefault.default.renderCard(_modelJs.state.traveledCountry);
    }
    // render island countries card
    if (filterBy === "island") {
        _modelJs.getIslandcountries();
        _countryViewJsDefault.default.renderCard(_modelJs.state.islandCountries);
    }
    // render regional country card
    _modelJs.getCountriesFilterByRegion(filterBy);
    _countryViewJsDefault.default.renderCard(_modelJs.state.regionalCountries);
};
// Save/Delete Countries From Favourite, Traveled List
const controlSaveCountry = function(countryCode, iconClicked) {
    // save country
    _modelJs.saveCountry(countryCode, iconClicked);
// update icon
// persist data
};
// Create Display Map
const renderMap = function(lat, lng, popupMsg) {
    // Create leaflet map
    const mapView = L.map("map").setView([
        lat,
        lng
    ], 5);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZm9pc2FsMDciLCJhIjoiY2txdnNxazRhMGhsMTJvbWg2OWlyODN6NyJ9.Tf_hHhpLFTpQPmbMl_wbSQ", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoiZm9pc2FsMDciLCJhIjoiY2txdnNxazRhMGhsMTJvbWg2OWlyODN6NyJ9.Tf_hHhpLFTpQPmbMl_wbSQ"
    }).addTo(mapView);
    // Leaflet map marker
    L.popup().setLatLng([
        lat,
        lng
    ]).setContent(`${popupMsg}`).openOn(mapView);
};
const init = function() {
    _headerViewJsDefault.default.addHandlerThemeButton();
    _countrySearchViewJsDefault.default.addHandlerSearch(controlCountryDetails);
    _navViewJsDefault.default.addHandlerWhereAmI(controlWhereAmI);
    _navViewJsDefault.default.addHandlerFilter(controlFilterBy);
    _countryViewJsDefault.default.addHandlerRenderCountryCard(controlAllCountries);
    _countryViewJsDefault.default.addHandlerCountryCard(controlCountryDetails);
    _saveViewJsDefault.default.addHandlerSaveCountry(controlSaveCountry);
    _countryPageViewJsDefault.default.addHandlerBackBtn();
    _countryNeighbourViewJsDefault.default.addHandlerCountryCard(controlCountryDetails);
    _paginationViewJsDefault.default.addHandlerPagination(controlAllCountries);
    _paginationViewJsDefault.default.addHandlerSlides();
};
init();

},{"./config.js":"4dfwK","../src/model.js":"wvpmA","./view/countryView.js":"4zmMg","./view/saveView.js":"1ChBU","./view/paginationView.js":"94if7","./view/countryPageView.js":"9ytWy","./view/countryNeighbourView.js":"90S4e","./view/navView.js":"4vPbm","./view/countrySearchView.js":"19HPl","./view/headerView.js":"bBf5H","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"4dfwK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ACCUWEATHER__API__KEY", ()=>ACCUWEATHER__API__KEY
);
parcelHelpers.export(exports, "ALL__COUNTRIES__API", ()=>ALL__COUNTRIES__API
);
parcelHelpers.export(exports, "ACCUWEATHER__API__URL", ()=>ACCUWEATHER__API__URL
);
parcelHelpers.export(exports, "REGION__COUNTRIES__API", ()=>REGION__COUNTRIES__API
);
parcelHelpers.export(exports, "COUNTRY__API", ()=>COUNTRY__API
);
parcelHelpers.export(exports, "BORDER__COUNTIRES__API", ()=>BORDER__COUNTIRES__API
);
parcelHelpers.export(exports, "TRACK__IP__API", ()=>TRACK__IP__API
);
parcelHelpers.export(exports, "TIMEOUT__SEC", ()=>TIMEOUT__SEC
);
const IP__API__KEY = "at_xk8bGjkoMSZqd9masOygBm2VaP32h";
const ACCUWEATHER__API__KEY = "sIe9pvMN8yPZd3QxoUQVngWhBvj9xA2l";
const ALL__COUNTRIES__API = "https://restcountries.eu/rest/v2/all";
const ACCUWEATHER__API__URL = "http://dataservice.accuweather.com/locations/v1/";
const REGION__COUNTRIES__API = "https://restcountries.eu/rest/v2/region/";
const COUNTRY__API = "https://restcountries.eu/rest/v2/name/";
const BORDER__COUNTIRES__API = "https://restcountries.eu/rest/v2/alpha/";
const TRACK__IP__API = `https://geo.ipify.org/api/v1?apiKey=${IP__API__KEY}&ipAddress=`;
const TIMEOUT__SEC = 10;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"JacNc":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"wvpmA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state
);
parcelHelpers.export(exports, "getAllCountries", ()=>getAllCountries
);
parcelHelpers.export(exports, "getLatLng", ()=>getLatLng
);
parcelHelpers.export(exports, "sortCountries", ()=>sortCountries
);
parcelHelpers.export(exports, "getIslandcountries", ()=>getIslandcountries
);
parcelHelpers.export(exports, "getCountriesFilterByRegion", ()=>getCountriesFilterByRegion
);
parcelHelpers.export(exports, "saveCountry", ()=>saveCountry
);
var _helperJs = require("./helper.js");
const state = {
    countriesAll: [],
    countriesFilterByLetter: [],
    ipTrackedCountry: {
    },
    latlng: [],
    city: {
    },
    sortedCountries: [],
    islandCountries: [],
    regionalCountries: [],
    bookmarkedCountry: [],
    traveledCountry: []
};
const getAllCountries = async function(url, sortingLetter) {
    try {
        const data = await _helperJs.AJAX(url);
        state.countriesAll = data;
        // filter countries by starting letter
        state.countriesFilterByLetter = state.countriesAll.filter((country)=>country.name.slice(0, 1).toLowerCase() === sortingLetter
        );
    } catch (err) {
        throw err;
    }
};
const getLatLng = async function(url) {
    try {
        // Get IP Adress from browser
        const { ip  } = await _helperJs.AJAX("https://api.ipify.org/?format=json");
        // Get lat lng
        const data = await _helperJs.AJAX(`${url}${ip}`);
        state.ipTrackedCountry = data.location.country;
        state.city = data.location.city;
        state.latlng = [
            data.location.lat,
            data.location.lng
        ];
    } catch (err) {
        throw err;
    }
};
const sortCountries = function(sortBy) {
    // passing compare object population, area
    const compareFunction = function(sortBy1) {
        return (a, b)=>b[0][sortBy1] - a[0][sortBy1]
        ;
    };
    // sort countries
    const countiresSorted = state.countriesAll.map((country)=>[
            country
        ]
    ).sort(compareFunction(sortBy));
    // filter top ten countries
    state.sortedCountries = countiresSorted.slice(0, 10).map((country)=>country[0]
    );
};
const getIslandcountries = ()=>{
    state.islandCountries = state.countriesAll.filter((country)=>country.borders.length === 0
    );
};
const getCountriesFilterByRegion = (filterBy)=>{
    state.regionalCountries = state.countriesAll.filter((country)=>country.region === filterBy
    );
};
const saveCountry = function(countryCode, iconClicked) {
    const country = state.countriesAll.find((country1)=>country1.alpha3Code === countryCode
    );
    if (iconClicked === "bookmark") state.bookmarkedCountry.push(country);
    if (iconClicked === "traveled") state.traveledCountry.push(country);
}; // export const getTopCitiesOfCountry = async function (countryCode) {
 //   const data = await AJAX(
 //     `${ACCUWEATHER__API__URL}adminareas/${countryCode}?apikey=${ACCUWEATHER__API__KEY}`
 //   );
 //   console.log(data);
 // }
 // export const getCountriesByRegion = async function (url, region) {
 //   try {
 //     const data = await AJAX(`${url}${region}`);
 //     state.countriesByRegion = data;
 //   } catch (err) {
 //     console.log(err);
 //   }
 // };
 // export const getBorderCountries = async function (url, borders) {
 //   try {
 //   } catch (err) {
 //     console.log(err);
 //   }
 // };

},{"./helper.js":"8vfmt","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"8vfmt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AJAX", ()=>AJAX
);
var _configJs = require("./config.js");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const AJAX = async function(url) {
    try {
        const res = await Promise.race([
            fetch(url),
            timeout(_configJs.TIMEOUT__SEC)
        ]);
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
};

},{"./config.js":"4dfwK","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"4zmMg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CountryView", ()=>CountryView
);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class CountryView extends _viewJsDefault.default {
    _displayContainer = document.querySelector(".display-countries");
    _paginationContainer = document.querySelector(".pagination__container");
    addHandlerRenderCountryCard(handler) {
        window.addEventListener("load", handler());
    }
    addHandlerCountryCard(handler) {
        // handler country card
        this._displayContainer.addEventListener("click", (function(e) {
            e.preventDefault();
            //get country name
            const country = e.target.closest(".country-card");
            if (!country) return;
            const countryName = country.getAttribute("data-country-name").toLowerCase();
            // hide countries card
            this._hideCountryCardContainer();
            // neighbour container country card clear detail page
            this._clearDetailPageContainer();
            // clear pagination
            this._hidePaginationContainer();
            // go top
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            //render country detail page
            handler(countryName);
        }).bind(this));
    }
}
exports.default = new CountryView();

},{"./View.js":"35FB2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"35FB2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class View {
    _displayContainer;
    _countryCardsContainer = document.querySelector(".countrycard__container");
    _detailPageContainer = document.querySelector(".detailpage__container");
    _paginationContainer = document.querySelector(".pagination__container");
    _generateCountryCardMarkup(country) {
        return `\n    <div class="country-card dark" data-country-name="${country.name}">\n        <div class="country-card__flag">\n            <img src="${country.flag}" alt="${country.name}" />\n        </div>\n        <div class="country-card__info">\n            <div class="country-card__info__name">\n                <strong><h4>${country.name}</h4></strong>\n                ${this._generateIcons(country.alpha3Code)}            \n            </div>\n            <ul class="country-card__info__detail">\n                <li> Population: <strong>${(country.population / 1000000).toFixed(2)} M</strong></li>\n                <li>Area: <strong>${Math.round(country.area * 0.386102)} Sqm (approx)\n                    </strong>\n                </li>\n                <li>Language: <strong>${country.languages.map((lang)=>lang.name
        ).join(" , ")}</strong></li>\n                <li>Region: <strong>${country.region}</strong></li>\n            </ul>\n        </div>\n    </div>\n    `;
    }
    _generateCountryPageMarkup(country, borderCountry, city) {
        return `\n    <div class="country-detail fade">\n\n        <div class="country-detail__flag">\n          <div class="btn__container">\n            <button class ='button--back'>\n              <i class="icon fa fa-long-arrow-left" aria-hidden="true"></i>\n            </button>\n          </div>\n          <img src="${country.flag}" alt="${country.name}"/>\n        </div>\n\n        <div class="country-detail__info">\n\n            <div class="country-detail__info__name">\n                <h1>${city ? `You are now in ${city}, ${country.name}` : `${country.name}`}</h1>\n                ${this._generateIcons(country.alpha3Code)} \n            </div>\n\n            <div class="country-detail__info__detail">\n\n                <div class="column-one">\n                    <li>\n                        <strong>Native Name: </strong> ${country.nativeName}\n                    </li>\n                    <li>\n                        <strong>Population: </strong>${(country.population / 1000000).toFixed(2)} M\n                    </li>\n                    <li>\n                        <strong>Area: </strong>${Math.round(country.area * 0.386102)} Sqm (approx)\n                    </li>\n                    <li>\n                        <strong>Region: </strong>${country.region}\n                    </li>\n                    <li>\n                        <strong>Sub Region: </strong>${country.subregion}\n                    </li>\n                </div>\n\n                <div class="column-two">\n                    <li>\n                        <strong>Capital: </strong>${country.capital}\n                    </li>\n                    <li>\n                        <strong>Currencies: </strong>${country.currencies[0].name} (${country.currencies[0].symbol})\n                    </li>\n                    <li>\n                        <strong>Language: </strong>${country.languages.map((lang)=>lang.name
        ).join(" , ")}\n                    </li>\n                    <li>\n                        <strong>Country Domain: </strong>${country.topLevelDomain}\n                    </li>\n                </div>\n                \n            </div>\n        </div>\n    </div>\n\n    <div class='map__container'>\n      <h2>On Map</h2>\n      <div class="country-map" id="map">\n      </div>\n    </div>\n\n    <div class="neighbour__container">\n      <h2>The Neighbours</h2>\n      <div class="country__neighbours">\n      ${borderCountry.length > 0 ? borderCountry.map((country)=>{
            return this._generateCountryCardMarkup(country);
        }).join(" ") : "No land borders"}\n      </div>\n    </div>`;
    }
    _generateIcons(countryalphacode) {
        return `<div class = 'country-card__icons' data-countryCode = ${countryalphacode}> \n                <div class = 'icon' data-icon='bookmark'>\n                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n                    <path id ='icon--bookmark' stroke-linecap="round" class=''stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />\n                  </svg>\n                </div>\n                <div class ='icon' data-icon='traveled'>\n                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n                  <path id ='icon--traveled' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />\n                  </svg>\n                </div>\n              </div>\n    `;
    }
    renderCard(data) {
        const markup = data.map((country)=>this._generateCountryCardMarkup(country)
        ).join("");
        this._displayContainer.insertAdjacentHTML("beforeend", markup);
    }
    renderPage(data, borderCountry, city) {
        const markup = this._generateCountryPageMarkup(data, borderCountry, city);
        this._displayContainer.insertAdjacentHTML("afterbegin", markup);
    }
    renderError(message = this._errorMessage) {
        const markup = `\n      <div class="error">\n        <div class = "error__message">\n          <i class="icon fa fa-exclamation-triangle"></i>${message}\n        </div>\n        \n        <div class="btn__container">\n          <button class ='button button--med button--back'>\n            All Country\n          </button>\n        </div>\n      </div>\n    `;
        this._displayContainer.insertAdjacentHTML("afterbegin", markup);
    }
    _hideCountryCardContainer() {
        this._countryCardsContainer.classList.add("hidden");
    }
    _showCountryCardContainer() {
        this._countryCardsContainer.classList.remove("hidden");
    }
    _clearCountryCardContainer() {
        this._displayContainer.innerHTML = "";
    }
    _clearDetailPageContainer() {
        this._detailPageContainer.innerHTML = "";
    }
    _hidePaginationContainer() {
        this._paginationContainer.classList.add("hidden");
    }
    _showPaginationContainer() {
        this._paginationContainer.classList.remove("hidden");
    }
}
exports.default = View;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"1ChBU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class SaveView extends _viewJsDefault.default {
    _displayContainer = document.querySelector(".display-countries");
    addHandlerSaveCountry(handler) {
        this._displayContainer.addEventListener("click", (function(e) {
            e.preventDefault();
            console.log(e);
            //get clicked icon and country
            const icon = e.target.closest(".icon");
            if (!icon) return;
            const iconClicked = icon.getAttribute("data-icon");
            const country = e.target.closest(".country-card__icons");
            const countryCode = country.getAttribute("data-countryCode");
            console.log(iconClicked, countryCode);
            document.getElementById(`icon--${iconClicked}`).style.fill = "orange";
            //save current country
            handler(countryCode, iconClicked);
        }).bind(this));
    }
}
exports.default = new SaveView();

},{"./View.js":"35FB2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"94if7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class CountryPaginationView extends _viewJsDefault.default {
    _displayContainer = document.querySelector(".display-countries");
    _paginationContainer = document.querySelector(".pagination__container");
    _sortingLetter = document.querySelector(".letter");
    _prevBtn = document.querySelector(".btnPrev");
    _nextBtn = document.querySelector(".btnNext");
    _slidesAll = document.querySelectorAll(".slide");
    _curSlide = 0;
    _maxSlide = 5;
    addHandlerPagination(handler) {
        this._paginationContainer.addEventListener("click", (function(e) {
            e.preventDefault();
            // get first letter
            const letter = e.target.closest(".letter");
            if (!letter) return;
            const sortingLetter = letter.innerText.toLowerCase();
            //clear container
            this._clearCountryCardContainer();
            // display matched letter countires
            handler(sortingLetter);
        }).bind(this));
    }
    _goToSlide(slide) {
        // set initial slide positions (Nodelist)
        this._slidesAll.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - slide)}%)`
        );
    }
    _nextSlide() {
        if (this._curSlide === this._maxSlide - 1) return this._curSlide = 0;
        else return this._curSlide++;
    }
    _prevSlide() {
        if (this._curSlide === 0) return this._curSlide = this._maxSlide - 1;
        else return this._curSlide--;
    }
    addHandlerSlides() {
        // at load slide number 0
        this._goToSlide(this._curSlide);
        this._paginationContainer.addEventListener("click", (function(e) {
            e.preventDefault();
            // set prev slide number
            if (e.target.closest(".btnPrev")) this._prevSlide();
            // set next slide number
            if (e.target.closest(".btnNext")) this._nextSlide();
            // go to set slide number
            this._goToSlide(this._curSlide);
        }).bind(this));
    }
}
exports.default = new CountryPaginationView();

},{"./View.js":"35FB2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"9ytWy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class CountryPageView extends _viewJsDefault.default {
    _displayContainer = document.querySelector(".detailpage__container");
    addHandlerBackBtn() {
        this._displayContainer.addEventListener("click", (function(e) {
            const backBtn = e.target.closest(".button--back");
            if (!backBtn) return;
            // clear detail page
            this._displayContainer.innerHTML = "";
            // show country card container
            this._showCountryCardContainer();
            // show pagination container
            this._showPaginationContainer();
        }).bind(this));
    }
}
exports.default = new CountryPageView();

},{"./View.js":"35FB2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"90S4e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _countryViewJs = require("./countryView.js");
class CountryNeighbourView extends _countryViewJs.CountryView {
    _displayContainer = document.querySelector(".detailpage__container");
}
exports.default = new CountryNeighbourView();

},{"./View.js":"35FB2","./countryView.js":"4zmMg","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"4vPbm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class NavView extends _viewJsDefault.default {
    _navContainer = document.querySelector(".nav");
    _whereAmIBtn = document.querySelector(".nav__whereami_btn");
    _displayContainer = document.querySelector(".display-countries");
    // Handler WhereAmI
    addHandlerWhereAmI(handler) {
        this._navContainer.addEventListener("click", (function(e) {
            e.preventDefault();
            const whereAmI = e.target.closest(".nav__whereami_btn");
            if (!whereAmI) return;
            // hide countries card
            this._hideCountryCardContainer();
            // clear detail page
            this._clearDetailPageContainer();
            // hide pagination container
            this._hidePaginationContainer();
            //render tracked country
            handler();
        }).bind(this));
    }
    // Handler region
    addHandlerFilter(handler) {
        this._navContainer.addEventListener("click", (function(e) {
            e.preventDefault();
            const filter = e.target.closest(".filterBy");
            if (!filter) return;
            const filterBy = filter.getAttribute("data-filterBy");
            // show countrycard container
            this._showCountryCardContainer();
            // clear country cards
            this._displayContainer.innerHTML = "";
            // clear detail page
            this._clearDetailPageContainer();
            // hide pagination container
            this._hidePaginationContainer();
            //render regional countries
            handler(filterBy);
        }).bind(this));
    }
}
exports.default = new NavView();

},{"./View.js":"35FB2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"19HPl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class SearchView extends _viewJsDefault.default {
    _search = document.querySelector(".search");
    _navSearchCountryInput = document.querySelector(".nav__searchCountry__input");
    _errorMessage = 'Country not found!';
    // Handler search
    addHandlerSearch(handler) {
        this._search.addEventListener("submit", (function(e) {
            e.preventDefault();
            //get searched query
            const searchedCountry = this._navSearchCountryInput.value.toLowerCase();
            //hide country cards
            this._hideCountryCardContainer();
            // clear detail page
            this._clearDetailPageContainer();
            // clear search field
            this._navSearchCountryInput.value = "";
            // hide pagination container
            this._hidePaginationContainer();
            handler(searchedCountry);
        }).bind(this));
    }
}
exports.default = new SearchView();

},{"./View.js":"35FB2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"bBf5H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class HeaderView {
    _body = document.body;
    _modeBtn = document.querySelector(".header_darkmode_btn");
    _countryCard = document.querySelector(".country-card");
    _nav = document.querySelector(".nav");
    addHandlerThemeButton(handler) {
        this._modeBtn.addEventListener("click", (e)=>{
            this._body.classList.toggle("dark");
            this._body.classList.toggle("light");
            this._countryCard.classList.toggle("dark");
            this._countryCard.classList.toggle("light");
            handler();
        });
    }
}
exports.default = new HeaderView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}]},["hz976","2YoVz"], "2YoVz", "parcelRequireac1f")

//# sourceMappingURL=index.f7e7bf39.js.map
