/*
 @vimeo/player v2.15.3 | (c) 2021 Vimeo | MIT License | https://github.com/vimeo/player.js */
var $jscomp = $jscomp || {}; $jscomp.scope = {}; $jscomp.getGlobal = function (e) { return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e }; $jscomp.global = $jscomp.getGlobal(this); $jscomp.checkEs6ConformanceViaProxy = function () { try { var e = {}, h = Object.create(new $jscomp.global.Proxy(e, { get: function (k, l, g) { return k == e && "q" == l && g == h } })); return !0 === h.q } catch (k) { return !1 } }; $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy(); $jscomp.arrayIteratorImpl = function (e) { var h = 0; return function () { return h < e.length ? { done: !1, value: e[h++] } : { done: !0 } } }; $jscomp.arrayIterator = function (e) { return { next: $jscomp.arrayIteratorImpl(e) } }; $jscomp.makeIterator = function (e) { var h = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator]; return h ? h.call(e) : $jscomp.arrayIterator(e) }; $jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1; $jscomp.ASSUME_NO_NATIVE_SET = !1; $jscomp.SIMPLE_FROUND_POLYFILL = !1; $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, h, k) { e != Array.prototype && e != Object.prototype && (e[h] = k.value) }; $jscomp.owns = function (e, h) { return Object.prototype.hasOwnProperty.call(e, h) };
$jscomp.polyfill = function (e, h, k, l) { if (h) { k = $jscomp.global; e = e.split("."); for (l = 0; l < e.length - 1; l++) { var g = e[l]; g in k || (k[g] = {}); k = k[g] } e = e[e.length - 1]; l = k[e]; h = h(l); h != l && null != h && $jscomp.defineProperty(k, e, { configurable: !0, writable: !0, value: h }) } };
$jscomp.polyfill("WeakMap", function (e) {
    function h() { if (!e || !Object.seal) return !1; try { var a = Object.seal({}), f = Object.seal({}), g = new e([[a, 2], [f, 3]]); if (2 != g.get(a) || 3 != g.get(f)) return !1; g.delete(a); g.set(f, 4); return !g.has(a) && 4 == g.get(f) } catch (E) { return !1 } } function k() { } function l(a) { var n = typeof a; return "object" === n && null !== a || "function" === n } function g(n) { if (!$jscomp.owns(n, a)) { var f = new k; $jscomp.defineProperty(n, a, { value: f }) } } function p(a) {
        var f = Object[a]; f && (Object[a] = function (a) {
            if (a instanceof
                k) return a; g(a); return f(a)
        })
    } if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) { if (e && $jscomp.ES6_CONFORMANCE) return e } else if (h()) return e; var a = "$jscomp_hidden_" + Math.random(); p("freeze"); p("preventExtensions"); p("seal"); var f = 0, m = function (a) { this.id_ = (f += Math.random() + 1).toString(); if (a) { a = $jscomp.makeIterator(a); for (var e; !(e = a.next()).done;)e = e.value, this.set(e[0], e[1]) } }; m.prototype.set = function (f, e) {
        if (!l(f)) throw Error("Invalid WeakMap key"); g(f); if (!$jscomp.owns(f, a)) throw Error("WeakMap key fail: " +
            f); f[a][this.id_] = e; return this
    }; m.prototype.get = function (f) { return l(f) && $jscomp.owns(f, a) ? f[a][this.id_] : void 0 }; m.prototype.has = function (f) { return l(f) && $jscomp.owns(f, a) && $jscomp.owns(f[a], this.id_) }; m.prototype.delete = function (f) { return l(f) && $jscomp.owns(f, a) && $jscomp.owns(f[a], this.id_) ? delete f[a][this.id_] : !1 }; return m
}, "es6", "es3"); $jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (e) {
    function h() { this.batch_ = null } function k(a) { return a instanceof g ? a : new g(function (f, e) { f(a) }) } if (e && !$jscomp.FORCE_POLYFILL_PROMISE) return e; h.prototype.asyncExecute = function (a) { if (null == this.batch_) { this.batch_ = []; var f = this; this.asyncExecuteFunction(function () { f.executeBatch_() }) } this.batch_.push(a) }; var l = $jscomp.global.setTimeout; h.prototype.asyncExecuteFunction = function (a) { l(a, 0) }; h.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var a =
                this.batch_; this.batch_ = []; for (var f = 0; f < a.length; ++f) { var e = a[f]; a[f] = null; try { e() } catch (n) { this.asyncThrow_(n) } }
        } this.batch_ = null
    }; h.prototype.asyncThrow_ = function (a) { this.asyncExecuteFunction(function () { throw a; }) }; var g = function (a) { this.state_ = 0; this.result_ = void 0; this.onSettledCallbacks_ = []; var f = this.createResolveAndReject_(); try { a(f.resolve, f.reject) } catch (m) { f.reject(m) } }; g.prototype.createResolveAndReject_ = function () {
        function a(a) { return function (g) { e || (e = !0, a.call(f, g)) } } var f = this, e = !1;
        return { resolve: a(this.resolveTo_), reject: a(this.reject_) }
    }; g.prototype.resolveTo_ = function (a) { if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (a instanceof g) this.settleSameAsPromise_(a); else { a: switch (typeof a) { case "object": var f = null != a; break a; case "function": f = !0; break a; default: f = !1 }f ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a) } }; g.prototype.resolveToNonPromiseObj_ = function (a) {
        var f = void 0; try { f = a.then } catch (m) { this.reject_(m); return } "function" == typeof f ?
            this.settleSameAsThenable_(f, a) : this.fulfill_(a)
    }; g.prototype.reject_ = function (a) { this.settle_(2, a) }; g.prototype.fulfill_ = function (a) { this.settle_(1, a) }; g.prototype.settle_ = function (a, f) { if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + f + "): Promise already settled in state" + this.state_); this.state_ = a; this.result_ = f; this.executeOnSettledCallbacks_() }; g.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a = 0; a < this.onSettledCallbacks_.length; ++a)p.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    }; var p = new h; g.prototype.settleSameAsPromise_ = function (a) { var f = this.createResolveAndReject_(); a.callWhenSettled_(f.resolve, f.reject) }; g.prototype.settleSameAsThenable_ = function (a, f) { var e = this.createResolveAndReject_(); try { a.call(f, e.resolve, e.reject) } catch (n) { e.reject(n) } }; g.prototype.then = function (a, f) { function e(a, f) { return "function" == typeof a ? function (f) { try { h(a(f)) } catch (B) { k(B) } } : f } var h, k, l = new g(function (a, f) { h = a; k = f }); this.callWhenSettled_(e(a, h), e(f, k)); return l };
    g.prototype.catch = function (a) { return this.then(void 0, a) }; g.prototype.callWhenSettled_ = function (a, f) { function e() { switch (g.state_) { case 1: a(g.result_); break; case 2: f(g.result_); break; default: throw Error("Unexpected state: " + g.state_); } } var g = this; null == this.onSettledCallbacks_ ? p.asyncExecute(e) : this.onSettledCallbacks_.push(e) }; g.resolve = k; g.reject = function (a) { return new g(function (f, e) { e(a) }) }; g.race = function (a) {
        return new g(function (f, e) {
            for (var g = $jscomp.makeIterator(a), h = g.next(); !h.done; h = g.next())k(h.value).callWhenSettled_(f,
                e)
        })
    }; g.all = function (a) { var f = $jscomp.makeIterator(a), e = f.next(); return e.done ? k([]) : new g(function (a, g) { function h(f) { return function (e) { l[f] = e; m--; 0 == m && a(l) } } var l = [], m = 0; do l.push(void 0), m++, k(e.value).callWhenSettled_(h(l.length - 1), g), e = f.next(); while (!e.done) }) }; return g
}, "es6", "es3");
!function (e, h) { "object" == typeof exports && "undefined" != typeof module ? module.exports = h() : "function" == typeof define && define.amd ? define(h) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Vimeo = e.Vimeo || {}, e.Vimeo.Player = h()) }(this, function () {
    function e(c, a) { for (var b = 0; b < a.length; b++) { var d = a[b]; d.enumerable = d.enumerable || !1; d.configurable = !0; "value" in d && (d.writable = !0); Object.defineProperty(c, d.key, d) } } function h(c, a) {
        return 0 === c.indexOf(a.toLowerCase()) ? c : "".concat(a.toLowerCase()).concat(c.substr(0,
            1).toUpperCase()).concat(c.substr(1))
    } function k(c) { return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(c) } function l(c) {
        var a = 0 < arguments.length && void 0 !== c ? c : {}, b = a.id; a = a.url; a = b || a; if (!a) throw Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute."); if (!isNaN(parseFloat(a)) && isFinite(a) && Math.floor(a) == a) return "https://vimeo.com/".concat(a); if (k(a)) return a.replace("http:", "https:"); if (b) throw new TypeError("\u201c".concat(b,
            "\u201d is not a valid video id.")); throw new TypeError("\u201c".concat(a, "\u201d is not a vimeo.com url."));
    } function g() { if (void 0 === this) throw new TypeError("Constructor WeakMap requires 'new'"); if (v(this, "_id", "_WeakMap_" + Math.random().toString().substring(2) + "." + Math.random().toString().substring(2)), 0 < arguments.length) throw new TypeError("WeakMap iterable is not supported"); } function p(a, d) {
        if (Object(a) !== a || !J.call(a, "_id")) throw new TypeError(d + " method called on incompatible receiver " + typeof a);
    } function a(a, d, b) { var c = u.get(a.element) || {}; d in c || (c[d] = []); c[d].push(b); u.set(a.element, c) } function f(a, d) { return (u.get(a.element) || {})[d] || [] } function m(a, d, b) { var c = u.get(a.element) || {}; if (!c[d]) return !0; if (!b) return c[d] = [], u.set(a.element, c), !0; b = c[d].indexOf(b); return -1 !== b && c[d].splice(b, 1), u.set(a.element, c), c[d] && 0 === c[d].length } function n(a, d) {
        return N.reduce(function (b, c) { var d = a.getAttribute("data-vimeo-".concat(c)); return !d && "" !== d || (b[c] = "" === d ? 1 : d), b }, 1 < arguments.length && void 0 !==
            d ? d : {})
    } function D(a, d) { a = a.html; if (!d) throw new TypeError("An element must be provided"); if (null !== d.getAttribute("data-vimeo-initialized")) return d.querySelector("iframe"); var b = document.createElement("div"); return b.innerHTML = a, d.appendChild(b.firstChild), d.setAttribute("data-vimeo-initialized", "true"), d.querySelector("iframe") } function I(a, d, b) {
        var c = 1 < arguments.length && void 0 !== d ? d : {}, f = 2 < arguments.length ? b : void 0; return new Promise(function (b, d) {
            if (!k(a)) throw new TypeError("\u201c".concat(a,
                "\u201d is not a vimeo.com url.")); var e = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(a)), q; for (q in c) c.hasOwnProperty(q) && (e += "&".concat(q, "=").concat(encodeURIComponent(c[q]))); var g = new ("XDomainRequest" in window ? XDomainRequest : XMLHttpRequest); g.open("GET", e, !0); g.onload = function () {
                    if (404 !== g.status) if (403 !== g.status) try { var c = JSON.parse(g.responseText); if (403 === c.domain_status_code) return D(c, f), void d(Error("\u201c".concat(a, "\u201d is not embeddable."))); b(c) } catch (y) { d(y) } else d(Error("\u201c".concat(a,
                        "\u201d is not embeddable."))); else d(Error("\u201c".concat(a, "\u201d was not found.")))
                }; g.onerror = function () { var b = g.status ? " (".concat(g.status, ")") : ""; d(Error("There was an error fetching the embed code from Vimeo".concat(b, "."))) }; g.send()
        })
    } function E(a) { if ("string" == typeof a) try { a = JSON.parse(a) } catch (d) { return console.warn(d), {} } return a } function A(a, d, b) {
        var c, f; a.element.contentWindow && a.element.contentWindow.postMessage && (c = { method: d }, void 0 !== b && (c.value = b), 8 <= (f = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,
            "$1"))) && 10 > f && (c = JSON.stringify(c)), a.element.contentWindow.postMessage(c, a.origin))
    } function M(a, d) {
        var b, c, e = []; (d = E(d)).event ? ("error" === d.event && f(a, d.data.method).forEach(function (b) { var c = Error(d.data.message); c.name = d.data.name; b.reject(c); m(a, d.data.method, b) }), e = f(a, "event:".concat(d.event)), b = d.data) : !d.method || (c = function (b, a) { var c = f(b, a); if (1 > c.length) return !1; c = c.shift(); return m(b, a, c), c }(a, d.method)) && (e.push(c), b = d.value); e.forEach(function (c) {
            try {
                if ("function" == typeof c) return void c.call(a,
                    b); c.resolve(b)
            } catch (V) { }
        })
    } var B = "undefined" != typeof global && "[object global]" === {}.toString.call(global), F = void 0 !== Array.prototype.indexOf, Q = "undefined" != typeof window && void 0 !== window.postMessage; if (!(B || F && Q)) throw Error("Sorry, the Vimeo Player API is not available in this browser."); var K, J, v, C = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; (K = "undefined" != typeof self ? self : "undefined" != typeof window ?
        window : C).WeakMap || (J = Object.prototype.hasOwnProperty, v = function (a, d, b) { Object.defineProperty ? Object.defineProperty(a, d, { configurable: !0, writable: !0, value: b }) : a[d] = b }, K.WeakMap = (v(g.prototype, "delete", function (a) { if (p(this, "delete"), Object(a) !== a) return !1; var c = a[this._id]; return !(!c || c[0] !== a) && (delete a[this._id], !0) }), v(g.prototype, "get", function (a) { if (p(this, "get"), Object(a) === a) { var c = a[this._id]; return c && c[0] === a ? c[1] : void 0 } }), v(g.prototype, "has", function (a) {
            if (p(this, "has"), Object(a) !== a) return !1;
            var c = a[this._id]; return !(!c || c[0] !== a)
        }), v(g.prototype, "set", function (a, d) { if (p(this, "set"), Object(a) !== a) throw new TypeError("Invalid value used as weak map key"); var b = a[this._id]; return b && b[0] === a ? b[1] = d : v(a, this._id, [a, d]), this }), v(g, "_polyfill", !0), g)); var L, w = (function (a) {
            var c = function () {
                function a(a, b) { this.fn = a; this.self = b; this.next = void 0 } function c(a, b) { n.add(a, b); m = m || w(n.drain) } function e(a) {
                    var b, c = typeof a; return null == a || "object" != c && "function" != c || (b = a.then), "function" == typeof b &&
                        b
                } function f() { for (var a = 0; a < this.chain.length; a++) { var b = void 0, c = void 0, f = 1 === this.state ? this.chain[a].success : this.chain[a].failure, d = this.chain[a]; try { !1 === f ? d.reject(this.msg) : (c = !0 === f ? this.msg : f.call(void 0, this.msg)) === d.promise ? d.reject(TypeError("Promise-chain cycle")) : (b = e(c)) ? b.call(c, d.resolve, d.reject) : d.resolve(c) } catch (U) { d.reject(U) } !0 } this.chain.length = 0 } function d(a) {
                    var b, q = this; if (!q.triggered) {
                        q.triggered = !0; q.def && (q = q.def); try {
                            (b = e(a)) ? c(function () {
                                var c = new k(q); try {
                                    b.call(a,
                                        function () { d.apply(c, arguments) }, function () { g.apply(c, arguments) })
                                } catch (T) { g.call(c, T) }
                            }) : (q.msg = a, q.state = 1, 0 < q.chain.length && c(f, q))
                        } catch (S) { g.call(new k(q), S) }
                    }
                } function g(a) { var b = this; b.triggered || (b.triggered = !0, b.def && (b = b.def), b.msg = a, b.state = 2, 0 < b.chain.length && c(f, b)) } function h(a, b, c, d) { for (var f = 0; f < b.length; f++)!function (f) { a.resolve(b[f]).then(function (a) { c(f, a) }, d) }(f) } function k(a) { this.def = a; this.triggered = !1 } function l(a) {
                    this.promise = a; this.state = 0; this.triggered = !1; this.chain =
                        []; this.msg = void 0
                } function y(a) {
                    if ("function" != typeof a) throw TypeError("Not a function"); if (0 !== this.__NPO__) throw TypeError("Not a promise"); this.__NPO__ = 1; var b = new l(this); this.then = function (a, d) { var e = { success: "function" != typeof a || a, failure: "function" == typeof d && d }; return e.promise = new this.constructor(function (a, b) { if ("function" != typeof a || "function" != typeof b) throw TypeError("Not a function"); e.resolve = a; e.reject = b }), b.chain.push(e), 0 !== b.state && c(f, b), e.promise }; this.catch = function (a) {
                        return this.then(void 0,
                            a)
                    }; try { a.call(void 0, function (a) { d.call(b, a) }, function (a) { g.call(b, a) }) } catch (R) { g.call(b, R) }
                } var m, n, t, p, u, v = Object.prototype.toString, w = "undefined" != typeof setImmediate ? function (a) { return setImmediate(a) } : setTimeout; try { Object.defineProperty({}, "x", {}); var r = function (a, b, c, d) { return Object.defineProperty(a, b, { value: c, writable: !0, configurable: !1 !== d }) } } catch (W) { r = function (a, b, c) { return a[b] = c, a } } var x = r({}, "constructor", y, !(n = {
                    add: function (b, c) { u = new a(b, c); p ? p.next = u : t = u; p = u; u = void 0 }, drain: function () {
                        var a =
                            t; for (t = p = m = void 0; a;)a.fn.call(a.self), a = a.next
                    }
                })); return r(y.prototype = x, "__NPO__", 0, !1), r(y, "resolve", function (a) { return a && "object" == typeof a && 1 === a.__NPO__ ? a : new this(function (b, c) { if ("function" != typeof b || "function" != typeof c) throw TypeError("Not a function"); b(a) }) }), r(y, "reject", function (a) { return new this(function (b, c) { if ("function" != typeof b || "function" != typeof c) throw TypeError("Not a function"); c(a) }) }), r(y, "all", function (a) {
                    var b = this; return "[object Array]" != v.call(a) ? b.reject(TypeError("Not an array")) :
                        0 === a.length ? b.resolve([]) : new b(function (c, d) { if ("function" != typeof c || "function" != typeof d) throw TypeError("Not a function"); var f = a.length, e = Array(f), g = 0; h(b, a, function (a, b) { e[a] = b; ++g === f && c(e) }, d) })
                }), r(y, "race", function (a) { var b = this; return "[object Array]" != v.call(a) ? b.reject(TypeError("Not an array")) : new b(function (c, d) { if ("function" != typeof c || "function" != typeof d) throw TypeError("Not a function"); h(b, a, function (a, b) { c(b) }, d) }) }), y
            }; C.Promise = C.Promise || c(); a.exports && (a.exports = C.Promise)
        }(L =
            { exports: {} }), L.exports), u = new WeakMap, N = "autopause autoplay background byline color controls dnt height id loop maxheight maxwidth muted playsinline portrait responsive speed texttrack title transparent url width".split(" "), r, G, x, z = new WeakMap, H = new WeakMap, t = {}; F = function () {
                function c(b) {
                    var d, f, e = this, g = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}; if (!(this instanceof c)) throw new TypeError("Cannot call a class as a function"); if (!0, window.jQuery && b instanceof jQuery && (1 < b.length &&
                        window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), b = b[0]), "undefined" != typeof document && "string" == typeof b && (b = document.getElementById(b)), d = b, !(d && 1 === d.nodeType && "nodeName" in d && d.ownerDocument && d.ownerDocument.defaultView)) throw new TypeError("You must pass either a valid element or a valid id."); if ("IFRAME" === b.nodeName || (f = b.querySelector("iframe")) && (b = f), "IFRAME" === b.nodeName && !k(b.getAttribute("src") || "")) throw Error("The player element passed isn\u2019t a Vimeo embed.");
                    if (z.has(b)) return z.get(b); this._window = b.ownerDocument.defaultView; this.element = b; this.origin = "*"; var h; d = new w(function (a, c) {
                        var d; e._onMessage = function (b) { if (k(b.origin) && e.element.contentWindow === b.source) { "*" === e.origin && (e.origin = b.origin); if ((b = E(b.data)) && "error" === b.event && b.data && "ready" === b.data.method) { var d = Error(b.data.message); return d.name = b.data.name, void c(d) } d = b && "ping" === b.method; if (b && "ready" === b.event || d) return e.element.setAttribute("data-ready", "true"), void a(); M(e, b) } }; e._window.addEventListener("message",
                            e._onMessage); "IFRAME" !== e.element.nodeName && I(l(d = n(b, g)), d, b).then(function (a) { var c, d, f = D(a, b); return e.element = f, e._originalElement = b, c = b, d = u.get(c), u.set(f, d), u.delete(c), z.set(e.element, e), a }).catch(c)
                    }); return H.set(this, d), z.set(this.element, this), "IFRAME" === this.element.nodeName && A(this, "ping"), t.isEnabled && (h = function () { return t.exit() }, t.on("fullscreenchange", function () { (t.isFullscreen ? a : m)(e, "event:exitFullscreen", h); e.ready().then(function () { A(e, "fullscreenchange", t.isFullscreen) }) })),
                        this
                } var d; return d = [{ key: "callMethod", value: function (b, c) { var d = this, e = 1 < arguments.length && void 0 !== c ? c : {}; return new w(function (c, f) { return d.ready().then(function () { a(d, b, { resolve: c, reject: f }); A(d, b, e) }).catch(f) }) } }, { key: "get", value: function (b) { var c = this; return new w(function (d, e) { return b = h(b, "get"), c.ready().then(function () { a(c, b, { resolve: d, reject: e }); A(c, b) }).catch(e) }) } }, {
                    key: "set", value: function (b, c) {
                        var d = this; return new w(function (e, f) {
                            if (b = h(b, "set"), null == c) throw new TypeError("There must be a value to set.");
                            return d.ready().then(function () { a(d, b, { resolve: e, reject: f }); A(d, b, c) }).catch(f)
                        })
                    }
                }, { key: "on", value: function (b, c) { if (!b) throw new TypeError("You must pass an event name."); if (!c) throw new TypeError("You must pass a callback function."); if ("function" != typeof c) throw new TypeError("The callback must be a function."); 0 === f(this, "event:".concat(b)).length && this.callMethod("addEventListener", b).catch(function () { }); a(this, "event:".concat(b), c) } }, {
                    key: "off", value: function (a, c) {
                        if (!a) throw new TypeError("You must pass an event name.");
                        if (c && "function" != typeof c) throw new TypeError("The callback must be a function."); m(this, "event:".concat(a), c) && this.callMethod("removeEventListener", a).catch(function (a) { })
                    }
                }, { key: "loadVideo", value: function (a) { return this.callMethod("loadVideo", a) } }, { key: "ready", value: function () { var a = H.get(this) || new w(function (a, b) { b(Error("Unknown player. Probably unloaded.")) }); return w.resolve(a) } }, {
                    key: "addCuePoint", value: function (a, c) {
                        return this.callMethod("addCuePoint", {
                            time: a, data: 1 < arguments.length &&
                                void 0 !== c ? c : {}
                        })
                    }
                }, { key: "removeCuePoint", value: function (a) { return this.callMethod("removeCuePoint", a) } }, { key: "enableTextTrack", value: function (a, c) { if (!a) throw new TypeError("You must pass a language."); return this.callMethod("enableTextTrack", { language: a, kind: c }) } }, { key: "disableTextTrack", value: function () { return this.callMethod("disableTextTrack") } }, { key: "pause", value: function () { return this.callMethod("pause") } }, { key: "play", value: function () { return this.callMethod("play") } }, {
                    key: "requestFullscreen",
                    value: function () { return t.isEnabled ? t.request(this.element) : this.callMethod("requestFullscreen") }
                }, { key: "exitFullscreen", value: function () { return t.isEnabled ? t.exit() : this.callMethod("exitFullscreen") } }, { key: "getFullscreen", value: function () { return t.isEnabled ? w.resolve(t.isFullscreen) : this.get("fullscreen") } }, { key: "requestPictureInPicture", value: function () { return this.callMethod("requestPictureInPicture") } }, { key: "exitPictureInPicture", value: function () { return this.callMethod("exitPictureInPicture") } },
                { key: "getPictureInPicture", value: function () { return this.get("pictureInPicture") } }, { key: "unload", value: function () { return this.callMethod("unload") } }, {
                    key: "destroy", value: function () {
                        var a = this; return new w(function (b) {
                            var c; H.delete(a); z.delete(a.element); a._originalElement && (z.delete(a._originalElement), a._originalElement.removeAttribute("data-vimeo-initialized")); a.element && "IFRAME" === a.element.nodeName && a.element.parentNode && (a.element.parentNode.parentNode && a._originalElement && a._originalElement !==
                                a.element.parentNode ? a.element.parentNode.parentNode.removeChild(a.element.parentNode) : a.element.parentNode.removeChild(a.element)); a.element && "DIV" === a.element.nodeName && a.element.parentNode && (a.element.removeAttribute("data-vimeo-initialized"), (c = a.element.querySelector("iframe")) && c.parentNode && (c.parentNode.parentNode && a._originalElement && a._originalElement !== c.parentNode ? c.parentNode.parentNode.removeChild(c.parentNode) : c.parentNode.removeChild(c))); a._window.removeEventListener("message", a._onMessage);
                            b()
                        })
                    }
                }, { key: "getAutopause", value: function () { return this.get("autopause") } }, { key: "setAutopause", value: function (a) { return this.set("autopause", a) } }, { key: "getBuffered", value: function () { return this.get("buffered") } }, { key: "getCameraProps", value: function () { return this.get("cameraProps") } }, { key: "setCameraProps", value: function (a) { return this.set("cameraProps", a) } }, { key: "getChapters", value: function () { return this.get("chapters") } }, { key: "getCurrentChapter", value: function () { return this.get("currentChapter") } },
                { key: "getColor", value: function () { return this.get("color") } }, { key: "setColor", value: function (a) { return this.set("color", a) } }, { key: "getCuePoints", value: function () { return this.get("cuePoints") } }, { key: "getCurrentTime", value: function () { return this.get("currentTime") } }, { key: "setCurrentTime", value: function (a) { return this.set("currentTime", a) } }, { key: "getDuration", value: function () { return this.get("duration") } }, { key: "getEnded", value: function () { return this.get("ended") } }, { key: "getLoop", value: function () { return this.get("loop") } },
                { key: "setLoop", value: function (a) { return this.set("loop", a) } }, { key: "setMuted", value: function (a) { return this.set("muted", a) } }, { key: "getMuted", value: function () { return this.get("muted") } }, { key: "getPaused", value: function () { return this.get("paused") } }, { key: "getPlaybackRate", value: function () { return this.get("playbackRate") } }, { key: "setPlaybackRate", value: function (a) { return this.set("playbackRate", a) } }, { key: "getPlayed", value: function () { return this.get("played") } }, { key: "getQualities", value: function () { return this.get("qualities") } },
                { key: "getQuality", value: function () { return this.get("quality") } }, { key: "setQuality", value: function (a) { return this.set("quality", a) } }, { key: "getSeekable", value: function () { return this.get("seekable") } }, { key: "getSeeking", value: function () { return this.get("seeking") } }, { key: "getTextTracks", value: function () { return this.get("textTracks") } }, { key: "getVideoEmbedCode", value: function () { return this.get("videoEmbedCode") } }, { key: "getVideoId", value: function () { return this.get("videoId") } }, { key: "getVideoTitle", value: function () { return this.get("videoTitle") } },
                { key: "getVideoWidth", value: function () { return this.get("videoWidth") } }, { key: "getVideoHeight", value: function () { return this.get("videoHeight") } }, { key: "getVideoUrl", value: function () { return this.get("videoUrl") } }, { key: "getVolume", value: function () { return this.get("volume") } }, { key: "setVolume", value: function (a) { return this.set("volume", a) } }], e(c.prototype, d), c
            }(); return B || (r = function () {
                for (var a, d = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),
                "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")],
                    b = 0, e = d.length, f = {}; b < e; b++)if ((a = d[b]) && a[1] in document) { for (b = 0; b < a.length; b++)f[d[0][b]] = a[b]; return f } return !1
            }(), G = { fullscreenchange: r.fullscreenchange, fullscreenerror: r.fullscreenerror }, x = {
                request: function (a) { return new Promise(function (c, b) { function d() { x.off("fullscreenchange", d); c() } x.on("fullscreenchange", d); var e = (a = a || document.documentElement)[r.requestFullscreen](); e instanceof Promise && e.then(d).catch(b) }) }, exit: function () {
                    return new Promise(function (a, d) {
                        var b, c; x.isFullscreen ? (b = function P() {
                            x.off("fullscreenchange",
                                P); a()
                        }, x.on("fullscreenchange", b), (c = document[r.exitFullscreen]()) instanceof Promise && c.then(b).catch(d)) : a()
                    })
                }, on: function (a, d) { (a = G[a]) && document.addEventListener(a, d) }, off: function (a, d) { (a = G[a]) && document.removeEventListener(a, d) }
            }, Object.defineProperties(x, { isFullscreen: { get: function () { return !!document[r.fullscreenElement] } }, element: { enumerable: !0, get: function () { return document[r.fullscreenElement] } }, isEnabled: { enumerable: !0, get: function () { return !!document[r.fullscreenEnabled] } } }), t = x, function (a) {
                function c(a) {
                    "console" in
                    window && console.error && console.error("There was an error creating an embed: ".concat(a))
                } [].slice.call((0 < arguments.length && void 0 !== a ? a : document).querySelectorAll("[data-vimeo-id], [data-vimeo-url]")).forEach(function (a) { try { if (null === a.getAttribute("data-vimeo-defer")) { var b = n(a); I(l(b), b, a).then(function (b) { return D(b, a) }).catch(c) } } catch (O) { c(O) } })
            }(), function (a) {
                var c = 0 < arguments.length && void 0 !== a ? a : document; window.VimeoPlayerResizeEmbeds_ || (window.VimeoPlayerResizeEmbeds_ = !0, window.addEventListener("message",
                    function (a) { if (k(a.origin) && a.data && "spacechange" === a.data.event) for (var b = c.querySelectorAll("iframe"), d = 0; d < b.length; d++)if (b[d].contentWindow === a.source) { b[d].parentElement.style.paddingBottom = "".concat(a.data.data[0].bottom, "px"); break } }))
            }()), F
});
