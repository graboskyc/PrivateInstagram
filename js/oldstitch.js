! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("stitch", [], e) : "object" == typeof exports ? exports.stitch = e() : t.stitch = e()
}(this, function() {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function(t) {
            return t
        }, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                    return t.
                    default
                } : function() {
                    return t
                };
            return e.d(n, "a", n), n
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 13)
    }([
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                var n = e.serviceName,
                    r = void 0 === n ? t.serviceName : n,
                    i = e.action,
                    o = e.args,
                    u = t.client;
                if (!u) throw new Error("Service has no client");
                return u.executeServiceFunction(r, i, o)
            }

            function i(t) {
                return encodeURIComponent(u.btoa(JSON.stringify(t)))
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.uriEncodeObject = e.serviceResponse = void 0;
            var o = n(10),
                u = function(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e.
                    default = t, e
                }(o);
            e.serviceResponse = r, e.uriEncodeObject = i
        },
        function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            e.USER_AUTH_KEY = "_stitch_ua", e.REFRESH_TOKEN_KEY = "_stitch_rt", e.DEVICE_ID_KEY = "_stitch_did", e.STATE_KEY = "_stitch_state", e.USER_AUTH_COOKIE_NAME = "stitch_ua", e.STITCH_ERROR_KEY = "_stitch_error", e.STITCH_LINK_KEY = "_stitch_link", e.USER_LOGGED_IN_PT_KEY = "_stitch_pt", e.STITCH_REDIRECT_PROVIDER = "_stitch_rp", e.DEFAULT_ACCESS_TOKEN_EXPIRE_WITHIN_SECS = 10, e.APP_CLIENT_CODEC = {
                accessToken: "access_token",
                refreshToken: "refresh_token",
                deviceId: "device_id",
                userId: "user_id"
            }, e.ADMIN_CLIENT_CODEC = {
                accessToken: "access_token",
                refreshToken: "refresh_token",
                deviceId: "device_id",
                userId: "user_id"
            }
        },
        function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.makeFetchArgs = e.checkStatus = e.SDK_VERSION = e.DEFAULT_STITCH_SERVER_URL = e.ADMIN_CLIENT_TYPE = e.APP_CLIENT_TYPE = e.JSONTYPE = void 0;
            var r = n(3),
                i = e.JSONTYPE = "application/json",
                o = (e.APP_CLIENT_TYPE = "app", e.ADMIN_CLIENT_TYPE = "admin", e.DEFAULT_STITCH_SERVER_URL = "https://stitch.mongodb.com", "unknown");
            o = "3.1.2";
            e.SDK_VERSION = o, e.checkStatus = function(t) {
                if (t.status >= 200 && t.status < 300) return t;
                if (t.headers.get("Content-Type") === i) return t.json().then(function(e) {
                    var n = new r.StitchError(e.error, e.error_code);
                    return n.response = t, n.json = e, Promise.reject(n)
                });
                var e = new Error(t.statusText);
                return e.response = t, Promise.reject(e)
            }, e.makeFetchArgs = function(t, e) {
                var n = {
                    method: t,
                    headers: {
                        Accept: i,
                        "Content-Type": i
                    }
                };
                return e && (n.body = e), n.cors = !0, n
            }
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function o(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var u = function(t) {
                function e(t, n) {
                    r(this, e);
                    var o = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    return o.name = "StitchError", o.message = t, void 0 !== n && (o.code = n), "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(o, o.constructor) : o.stack = new Error(t).stack, o
                }
                return o(e, t), e
            }(function(t) {
                function e() {
                    var e = Reflect.construct(t, Array.from(arguments));
                    return Object.setPrototypeOf(e, Object.getPrototypeOf(this)), e
                }
                return e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t, e
            }(Error));
            e.StitchError = u, e.ErrAuthProviderNotFound = "AuthProviderNotFound", e.ErrInvalidSession = "InvalidSession", e.ErrUnauthorized = "Unauthorized"
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function i(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function o(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function u(t, e) {
                var n, r, o, u, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, f = Object.create(t),
                    h = d.DEFAULT_STITCH_SERVER_URL;
                s.baseUrl && (h = s.baseUrl), f.clientAppID = e, f.authUrl = e ? h + "/api/client/v2.0/app/" + e + "/auth" : h + "/api/admin/v3.0/auth", f.rootURLsByAPIVersion = (u = {}, i(u, w, (n = {}, i(n, E, h + "/api/public/v1.0"), i(n, A, h + "/api/client/v1.0"), i(n, O, h + "/api/private/v1.0"), i(n, N, e ? h + "/api/client/v1.0/app/" + e : h + "/api/public/v1.0"), n)), i(u, m, (r = {}, i(r, E, h + "/api/public/v2.0"), i(r, A, h + "/api/client/v2.0"), i(r, O, h + "/api/private/v2.0"), i(r, N, e ? h + "/api/client/v2.0/app/" + e : h + "/api/public/v2.0"), r)), i(u, S, (o = {}, i(o, E, h + "/api/public/v3.0"), i(o, A, h + "/api/client/v3.0"), i(o, N, e ? h + "/api/client/v3.0/app/" + e : h + "/api/admin/v3.0"), o)), u);
                var l = {
                    codec: c.APP_CLIENT_CODEC,
                    storage: s.storage
                };
                return s.storageType && (l.storageType = s.storageType), s.platform && (l.platform = s.platform), s.authCodec && (l.codec = s.authCodec), a.AuthFactory.create(f, f.authUrl, l).then(function(t) {
                    return f.auth = t, Promise.all([f.auth.handleRedirect(), f.auth.handleCookie()])
                }).then(function() {
                    return f
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.StitchClient = e.StitchClientFactory = void 0;
            var s = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }();
            e.newStitchClient = u, n(8);
            var a = n(11),
                f = n(7),
                c = n(1),
                h = n(17),
                l = r(h),
                p = n(2),
                d = function(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e.
                    default = t, e
                }(p),
                v = n(5),
                y = r(v),
                g = n(33),
                _ = r(g),
                b = n(3),
                w = 1,
                m = 2,
                S = 3,
                E = "public",
                O = "private",
                A = "client",
                N = "app",
                T = (e.StitchClientFactory = function() {
                    function t() {
                        throw o(this, t), new b.StitchError("StitchClient can only be made from the StitchClientFactory.create function")
                    }
                    return s(t, null, [{
                        key: "create",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return u(T.prototype, t, e)
                        }
                    }]), t
                }(), e.StitchClient = function() {
                    function t() {
                        o(this, t);
                        var e = this.constructor.name;
                        throw new b.StitchError(e + " can only be made from the " + e + "Factory.create function")
                    }
                    return s(t, [{
                        key: "login",
                        value: function(t, e) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            return void 0 === t || void 0 === e ? this.authenticate(f.PROVIDER_TYPE_ANON, n) : this.authenticate("userpass", Object.assign({
                                username: t,
                                password: e
                            }, n))
                        }
                    }, {
                        key: "register",
                        value: function(t, e) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            return this.auth.provider("userpass").register(t, e, n)
                        }
                    }, {
                        key: "linkWithProvider",
                        value: function(t) {
                            var e = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (!this.isAuthenticated()) throw new b.StitchError("Must be authenticated to link an account");
                            return this.auth.provider(t).authenticate(n, !0).then(function() {
                                return e.authedId()
                            })
                        }
                    }, {
                        key: "authenticate",
                        value: function(t) {
                            var e = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = function() {
                                    return e.auth.provider(t).authenticate(n).then(function() {
                                        return e.authedId()
                                    })
                                };
                            return this.isAuthenticated() ? t === f.PROVIDER_TYPE_ANON && this.auth.getLoggedInProviderType() === f.PROVIDER_TYPE_ANON ? Promise.resolve(this.auth.authedId) : this.logout().then(function() {
                                return r()
                            }) : r()
                        }
                    }, {
                        key: "logout",
                        value: function() {
                            var t = this;
                            return this._do("/auth/session", "DELETE", {
                                refreshOnFailure: !1,
                                useRefreshToken: !0,
                                rootURL: this.rootURLsByAPIVersion[m][A]
                            }).then(function() {
                                return t.auth.clear()
                            }, function() {
                                return t.auth.clear()
                            })
                        }
                    }, {
                        key: "authError",
                        value: function() {
                            return this.auth.error()
                        }
                    }, {
                        key: "userProfile",
                        value: function() {
                            return this._do("/auth/profile", "GET", {
                                rootURL: this.rootURLsByAPIVersion[m][A]
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "isAuthenticated",
                        value: function() {
                            return !!this.authedId()
                        }
                    }, {
                        key: "authedId",
                        value: function() {
                            return this.auth.authedId
                        }
                    }, {
                        key: "service",
                        value: function(e, n) {
                            if (this.constructor !== t) throw new b.StitchError("`service` is a factory method, do not use `new`");
                            if (!l.
                                default.hasOwnProperty(e)) throw new b.StitchError("Invalid service type specified: " + e);
                            return new(0, l.
                                default [e])(this, n)
                        }
                    }, {
                        key: "executeFunction",
                        value: function(t) {
                            for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                            return this._doFunctionCall({
                                name: t,
                                arguments: n
                            })
                        }
                    }, {
                        key: "executeServiceFunction",
                        value: function(t, e) {
                            for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
                            return this._doFunctionCall({
                                service: t,
                                name: e,
                                arguments: r
                            })
                        }
                    }, {
                        key: "_doFunctionCall",
                        value: function(t) {
                            var e = function(t) {
                                return y.
                                default.parse(t, {
                                    relaxed: !0
                                })
                            };
                            return this._do("/functions/call", "POST", {
                                body: function(t) {
                                    return y.
                                    default.stringify(t, {
                                        strict: !0
                                    })
                                }(t)
                            }).then(function(t) {
                                return t.text()
                            }).then(function(t) {
                                return e(t)
                            })
                        }
                    }, {
                        key: "doSessionPost",
                        value: function() {
                            return this._do("/auth/session", "POST", {
                                refreshOnFailure: !1,
                                useRefreshToken: !0,
                                rootURL: this.rootURLsByAPIVersion[m][A]
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "getApiKeys",
                        value: function() {
                            return this._do("/auth/api_keys", "GET", {
                                rootURL: this.rootURLsByAPIVersion[m][A],
                                useRefreshToken: !0
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "createApiKey",
                        value: function(t) {
                            return this._do("/auth/api_keys", "POST", {
                                rootURL: this.rootURLsByAPIVersion[m][A],
                                useRefreshToken: !0,
                                body: JSON.stringify({
                                    name: t
                                })
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "getApiKeyByID",
                        value: function(t) {
                            return this._do("/auth/api_keys/" + t, "GET", {
                                rootURL: this.rootURLsByAPIVersion[m][A],
                                useRefreshToken: !0
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "deleteApiKeyByID",
                        value: function(t) {
                            return this._do("/auth/api_keys/" + t, "DELETE", {
                                rootURL: this.rootURLsByAPIVersion[m][A],
                                useRefreshToken: !0
                            })
                        }
                    }, {
                        key: "enableApiKeyByID",
                        value: function(t) {
                            return this._do("/auth/api_keys/" + t + "/enable", "PUT", {
                                rootURL: this.rootURLsByAPIVersion[m][A],
                                useRefreshToken: !0
                            })
                        }
                    }, {
                        key: "disableApiKeyByID",
                        value: function(t) {
                            return this._do("/auth/api_keys/" + t + "/disable", "PUT", {
                                rootURL: this.rootURLsByAPIVersion[m][A],
                                useRefreshToken: !0
                            })
                        }
                    }, {
                        key: "_fetch",
                        value: function(t, e, n, r, i) {
                            var o = this;
                            return fetch(t, e).then(function(t) {
                                if (t.status >= 200 && t.status < 300) return Promise.resolve(t);
                                if (t.headers.get("Content-Type") === d.JSONTYPE) return t.json().then(function(e) {
                                    if ("error_code" in e && e.error_code === b.ErrInvalidSession) return i.refreshOnFailure ? o.auth.refreshToken().then(function() {
                                        return i.refreshOnFailure = !1, o._do(n, r, i)
                                    }) : o.auth.clear().then(function() {
                                        var n = new b.StitchError(e.error, e.error_code);
                                        throw n.response = t, n.json = e, n
                                    });
                                    var u = new b.StitchError(e.error, e.error_code);
                                    return u.response = t, u.json = e, Promise.reject(u)
                                });
                                var e = new Error(t.statusText);
                                return e.response = t, Promise.reject(e)
                            })
                        }
                    }, {
                        key: "_fetchArgs",
                        value: function(t, e, n) {
                            var r = this.rootURLsByAPIVersion[n.apiVersion][n.apiType],
                                i = "" + r + t;
                            n.rootURL && (i = "" + n.rootURL + t);
                            var o = d.makeFetchArgs(e, n.body);
                            return n.headers && Object.assign(o.headers, n.headers), n.queryParams && (i = i + "?" + _.
                                default.stringify(n.queryParams)), {
                                url: i,
                                fetchArgs: o
                            }
                        }
                    }, {
                        key: "_do",
                        value: function(t, e, n) {
                            n = Object.assign({}, {
                                refreshOnFailure: !0,
                                useRefreshToken: !1,
                                apiVersion: m,
                                apiType: N,
                                rootURL: void 0
                            }, n);
                            var r = this._fetchArgs(t, e, n),
                                i = r.url,
                                o = r.fetchArgs;
                            if (n.noAuth) return this._fetch(i, o, t, e, n);
                            if (!this.isAuthenticated()) return Promise.reject(new b.StitchError("Must auth first", b.ErrUnauthorized));
                            var u = n.useRefreshToken ? this.auth.getRefreshToken() : this.auth.getAccessToken();
                            return o.headers.Authorization = "Bearer " + u, this._fetch(i, o, t, e, n)
                        }
                    }, {
                        key: "type",
                        get: function() {
                            return d.APP_CLIENT_TYPE
                        }
                    }]), t
                }())
        },
        function(t, e, n) {
            "use strict";
            (function(r) {
                var i, o, u, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    };
                ! function(r, a) {
                    "object" === s(e) && void 0 !== t ? t.exports = a(n(6)) : (o = [n(6)], i = a, void 0 !== (u = "function" == typeof i ? i.apply(e, o) : i) && (t.exports = u))
                }(0, function(t) {
                    function e(t) {
                        var e = Number(t).toString(16);
                        return 1 === e.length ? "0" + e : e
                    }

                    function n(t) {
                        return {
                            $binary: {
                                base64: t.buffer.toString("base64"),
                                subType: e(t.sub_type)
                            }
                        }
                    }

                    function i(t, e) {
                        var n = e.$binary.subType ? parseInt(e.$binary.subType, 16) : 0,
                            i = new r(e.$binary.base64, "base64");
                        return new t.Binary(i, n)
                    }

                    function o(t) {
                        return t.scope ? {
                            $code: t.code,
                            $scope: t.scope
                        } : {
                            $code: t.code
                        }
                    }

                    function u(t, e) {
                        return new t.Code(e.$code, e.$scope)
                    }

                    function a(t) {
                        var e = {
                            $ref: t.collection,
                            $id: t.oid
                        };
                        return t.db && (e.$db = t.db), e = Object.assign(e, t.fields)
                    }

                    function f(t, e) {
                        var n = Object.assign({}, e);
                        return ["$ref", "$id", "$db"].forEach(function(t) {
                            return delete n[t]
                        }), new t.DBRef(e.$ref, e.$id, e.$db, n)
                    }

                    function c(t) {
                        return {
                            $numberDecimal: t.toString()
                        }
                    }

                    function h(t, e) {
                        return new t.Decimal128.fromString(e.$numberDecimal)
                    }

                    function l(t, e) {
                        return e && e.relaxed && isFinite(t.value) ? t.value : {
                            $numberDouble: t.value.toString()
                        }
                    }

                    function p(t, e, n) {
                        return n && n.relaxed ? parseFloat(e.$numberDouble) : new t.Double(parseFloat(e.$numberDouble))
                    }

                    function d(t, e) {
                        return e && e.relaxed ? t.value : {
                            $numberInt: t.value.toString()
                        }
                    }

                    function v(t, e, n) {
                        return n && n.relaxed ? parseInt(e.$numberInt, 10) : new t.Int32(e.$numberInt)
                    }

                    function y(t, e) {
                        return e && e.relaxed ? t.toNumber() : {
                            $numberLong: t.toString()
                        }
                    }

                    function g(t, e, n) {
                        var r = t.Long.fromString(e.$numberLong);
                        return n && n.relaxed ? r.toNumber() : r
                    }

                    function _() {
                        return {
                            $maxKey: 1
                        }
                    }

                    function b(t) {
                        return new t.MaxKey
                    }

                    function w() {
                        return {
                            $minKey: 1
                        }
                    }

                    function m(t) {
                        return new t.MinKey
                    }

                    function S(t) {
                        return t.toHexString ? {
                            $oid: t.toHexString()
                        } : {
                            $oid: t.toString("hex")
                        }
                    }

                    function E(t, e) {
                        return new t.ObjectID(e.$oid)
                    }

                    function O(t) {
                        return {
                            $regularExpression: {
                                pattern: t.pattern,
                                options: t.options
                            }
                        }
                    }

                    function A(t, e) {
                        return new t.BSONRegExp(e.$regularExpression.pattern, e.$regularExpression.options.split("").sort().join(""))
                    }

                    function N(t) {
                        return {
                            $symbol: t.value
                        }
                    }

                    function T(t, e) {
                        return new t.Symbol(e.$symbol)
                    }

                    function B(t) {
                        return {
                            $timestamp: {
                                t: t.high_,
                                i: t.low_
                            }
                        }
                    }

                    function I(t, e) {
                        return new t.Timestamp(e.$timestamp.i, e.$timestamp.t)
                    }

                    function R(t) {
                        Z.forEach(function(e) {
                            if (!t[e]) throw new Error("passed in module does not contain all BSON types required")
                        }), X = t
                    }

                    function P(t, e, n, r) {
                        if ("number" == typeof n) {
                            if (Math.floor(n) === n) {
                                var i = n >= nt && n <= et,
                                    o = n >= it && n <= rt;
                                if (i) return r.strict ? new X.Int32(n) : n;
                                if (o) return r.strict ? new X.Long.fromNumber(n) : n
                            }
                            return new X.Double(n)
                        }
                        if (null == n || "object" !== (void 0 === n ? "undefined" : H(n))) return n;
                        if (n.$undefined) return null;
                        for (var u = Object.keys(n).filter(function(t) {
                            return t.startsWith("$") && null != n[t]
                        }), s = 0; s < u.length; s++) {
                            var a = Q[u[s]];
                            if (a) return a.fromExtendedJSON(X, n, r)
                        }
                        if (null != n.$date) {
                            var f = n.$date,
                                c = new Date;
                            return "string" == typeof f ? c.setTime(Date.parse(f)) : f instanceof X.Long ? c.setTime(f.toNumber()) : "number" == typeof f && r.relaxed && c.setTime(f), c
                        }
                        if (null != n.$code) {
                            if (n.$scope) var h = P(t, null, n.$scope);
                            return Object.assign({}, n).$scope = h, q.Code.fromExtendedJSON(X, n)
                        }
                        if (null != n.$ref || null != n.$dbPointer) {
                            var l = n.$ref ? n : n.$dbPointer;
                            if (l instanceof X.DBRef) return l;
                            var p = Object.keys(l).filter(function(t) {
                                return t.startsWith("$")
                            }),
                                d = !0;
                            if (p.forEach(function(t) {
                                -1 === ["$ref", "$id", "$db"].indexOf(t) && (d = !1)
                            }), d) return q.DBRef.fromExtendedJSON(X, l)
                        }
                        return n
                    }

                    function x(t, e) {
                        return t.map(function(t) {
                            return M(t, e)
                        })
                    }

                    function D(t) {
                        var e = t.toISOString();
                        return 0 !== t.getUTCMilliseconds() ? e : e.slice(0, -5) + "Z"
                    }

                    function M(t, e) {
                        if (Array.isArray(t)) return x(t, e);
                        if (void 0 === t) return null;
                        if (t instanceof Date) {
                            var n = t.getTime(),
                                r = n > -1 && n < 2534023188e5;
                            return e.relaxed && r ? {
                                $date: D(t)
                            } : {
                                $date: {
                                    $numberLong: t.getTime().toString()
                                }
                            }
                        }
                        if ("number" == typeof t && !e.relaxed) {
                            if (Math.floor(t) === t) {
                                var i = t >= nt && t <= et,
                                    o = t >= it && t <= rt;
                                if (i) return {
                                    $numberInt: t.toString()
                                };
                                if (o) return {
                                    $numberLong: t.toString()
                                }
                            }
                            return {
                                $numberDouble: t.toString()
                            }
                        }
                        return null != t && "object" === (void 0 === t ? "undefined" : H(t)) ? k(t, e) : t
                    }

                    function k(t, e) {
                        if (null == t || "object" !== (void 0 === t ? "undefined" : H(t))) throw new Error("not an object instance");
                        if (t._bsontype && -1 !== Z.indexOf(t._bsontype)) {
                            if ("Code" === t._bsontype && t.scope) {
                                var n = k(t.scope, e),
                                    r = Object.assign({}, t, {
                                        scope: n
                                    });
                                return q.Code.toExtendedJSON(r, e)
                            }
                            if ("DBRef" === t._bsontype && t.oid) {
                                var i = k(t.oid, e),
                                    o = Object.assign({}, t, {
                                        oid: i
                                    });
                                return q.DBRef.toExtendedJSON(o, e)
                            }
                            return q[t._bsontype].toExtendedJSON(t, e)
                        }
                        var u = {};
                        for (var s in t) {
                            var a = t[s];
                            if (Array.isArray(a)) u[s] = x(a, e);
                            else if (null != a && a._bsontype && -1 !== Z.indexOf(a._bsontype))
                                if ("Code" === a._bsontype && a.scope) {
                                    var f = k(a.scope, e),
                                        c = Object.assign({}, a, {
                                            scope: f
                                        });
                                    u[s] = q.Code.toExtendedJSON(c, e)
                                } else if ("DBRef" === a._bsontype && a.oid) {
                                var h = k(a.oid, e),
                                    l = Object.assign({}, a, {
                                        oid: h
                                    });
                                u[s] = q.DBRef.toExtendedJSON(l, e)
                            } else u[s] = q[a._bsontype].toExtendedJSON(a, e);
                            else a instanceof Date ? u[s] = M(a, e) : null != a && "object" === (void 0 === a ? "undefined" : H(a)) && (u[s] = k(a, e));
                            u[s] = M(a, e)
                        }
                        return u
                    }
                    t = t && t.hasOwnProperty("default") ? t.
                    default : t;
                    var U = {
                        toExtendedJSON: n,
                        fromExtendedJSON: i
                    }, j = {
                            toExtendedJSON: o,
                            fromExtendedJSON: u
                        }, L = {
                            toExtendedJSON: a,
                            fromExtendedJSON: f
                        }, C = {
                            toExtendedJSON: c,
                            fromExtendedJSON: h
                        }, F = {
                            toExtendedJSON: l,
                            fromExtendedJSON: p
                        }, Y = {
                            toExtendedJSON: d,
                            fromExtendedJSON: v
                        }, W = {
                            toExtendedJSON: y,
                            fromExtendedJSON: g
                        }, K = {
                            toExtendedJSON: _,
                            fromExtendedJSON: b
                        }, $ = {
                            toExtendedJSON: w,
                            fromExtendedJSON: m
                        }, V = {
                            toExtendedJSON: S,
                            fromExtendedJSON: E
                        }, J = {
                            toExtendedJSON: O,
                            fromExtendedJSON: A
                        }, G = {
                            toExtendedJSON: N,
                            fromExtendedJSON: T
                        }, z = {
                            toExtendedJSON: B,
                            fromExtendedJSON: I
                        }, q = {
                            Binary: U,
                            Code: j,
                            DBRef: L,
                            Decimal128: C,
                            Double: F,
                            Int32: Y,
                            Long: W,
                            MaxKey: K,
                            MinKey: $,
                            ObjectID: V,
                            BSONRegExp: J,
                            Symbol: G,
                            Timestamp: z
                        }, H = "function" == typeof Symbol && "symbol" === s(Symbol.iterator) ? function(t) {
                            return void 0 === t ? "undefined" : s(t)
                        } : function(t) {
                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : s(t)
                        }, X = t,
                        Z = ["Binary", "Code", "DBRef", "Decimal128", "Double", "Int32", "Long", "MaxKey", "MinKey", "ObjectID", "BSONRegExp", "Symbol", "Timestamp"];
                    R(X);
                    var Q = {
                        $oid: q.ObjectID,
                        $binary: q.Binary,
                        $symbol: q.Symbol,
                        $numberInt: q.Int32,
                        $numberDecimal: q.Decimal128,
                        $numberDouble: q.Double,
                        $numberLong: q.Long,
                        $minKey: q.MinKey,
                        $maxKey: q.MaxKey,
                        $regularExpression: q.BSONRegExp,
                        $timestamp: q.Timestamp
                    }, tt = function(t, e) {
                            var n = this;
                            return e = e || {
                                relaxed: !1
                            }, "boolean" == typeof e.relaxed && (e.strict = !e.relaxed), "boolean" == typeof e.strict && (e.relaxed = !e.strict), JSON.parse(t, function(t, r) {
                                return P(n, t, r, e)
                            })
                        }, et = 2147483647,
                        nt = -2147483648,
                        rt = 0x8000000000000000,
                        it = -0x8000000000000000;
                    return {
                        parse: tt,
                        stringify: function(t, e, n, r) {
                            var i = {};
                            null != r && "object" === (void 0 === r ? "undefined" : H(r)) ? i = r : null != n && "object" === (void 0 === n ? "undefined" : H(n)) ? (i = n, n = 0) : null != e && "object" === (void 0 === e ? "undefined" : H(e)) && (i = e, e = null);
                            var o = Array.isArray(t) ? x(t, i) : k(t, i);
                            return JSON.stringify(o, e, n)
                        },
                        setBSONModule: R,
                        BSON: X
                    }
                })
            }).call(e, n(23).Buffer)
        },
        function(module, exports, __webpack_require__) {
            "use strict";
            (function(module) {
                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    };
                ! function(t, e) {
                    if ("object" === _typeof2(exports) && "object" === _typeof2(module)) module.exports = e();
                    else {
                        __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = e, void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
                    }
                }("undefined" != typeof self && self, function() {
                    return function(t) {
                        function e(r) {
                            if (n[r]) return n[r].exports;
                            var i = n[r] = {
                                i: r,
                                l: !1,
                                exports: {}
                            };
                            return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
                        }
                        var n = {};
                        return e.m = t, e.c = n, e.d = function(t, n, r) {
                            e.o(t, n) || Object.defineProperty(t, n, {
                                configurable: !1,
                                enumerable: !0,
                                get: r
                            })
                        }, e.n = function(t) {
                            var n = t && t.__esModule ? function() {
                                    return t.
                                    default
                                } : function() {
                                    return t
                                };
                            return e.d(n, "a", n), n
                        }, e.o = function(t, e) {
                            return Object.prototype.hasOwnProperty.call(t, e)
                        }, e.p = "/", e(e.s = 139)
                    }([
                        function(t, e, n) {
                            var r = n(2),
                                i = n(21),
                                o = n(12),
                                u = n(13),
                                s = n(18),
                                a = function t(e, n, a) {
                                    var f, c, h, l, p = e & t.F,
                                        d = e & t.G,
                                        v = e & t.S,
                                        y = e & t.P,
                                        g = e & t.B,
                                        _ = d ? r : v ? r[n] || (r[n] = {}) : (r[n] || {}).prototype,
                                        b = d ? i : i[n] || (i[n] = {}),
                                        w = b.prototype || (b.prototype = {});
                                    d && (a = n);
                                    for (f in a) c = !p && _ && void 0 !== _[f], h = (c ? _ : a)[f], l = g && c ? s(h, r) : y && "function" == typeof h ? s(Function.call, h) : h, _ && u(_, f, h, e & t.U), b[f] != h && o(b, f, l), y && w[f] != h && (w[f] = h)
                                };
                            r.core = i, a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a
                        },
                        function(t, e, n) {
                            var r = n(4);
                            t.exports = function(t) {
                                if (!r(t)) throw TypeError(t + " is not an object!");
                                return t
                            }
                        },
                        function(t, e) {
                            var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
                            "number" == typeof __g && (__g = n)
                        },
                        function(t, e) {
                            t.exports = function(t) {
                                try {
                                    return !!t()
                                } catch (t) {
                                    return !0
                                }
                            }
                        },
                        function(t, e) {
                            t.exports = function(t) {
                                return "object" === (void 0 === t ? "undefined" : _typeof2(t)) ? null !== t : "function" == typeof t
                            }
                        },
                        function(t, e, n) {
                            var r = n(54)("wks"),
                                i = n(32),
                                o = n(2).Symbol,
                                u = "function" == typeof o;
                            (t.exports = function(t) {
                                return r[t] || (r[t] = u && o[t] || (u ? o : i)("Symbol." + t))
                            }).store = r
                        },
                        function(t, e, n) {
                            t.exports = !n(3)(function() {
                                return 7 != Object.defineProperty({}, "a", {
                                    get: function() {
                                        return 7
                                    }
                                }).a
                            })
                        },
                        function(t, e, n) {
                            var r = n(1),
                                i = n(105),
                                o = n(22),
                                u = Object.defineProperty;
                            e.f = n(6) ? Object.defineProperty : function(t, e, n) {
                                if (r(t), e = o(e, !0), r(n), i) try {
                                    return u(t, e, n)
                                } catch (t) {}
                                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                                return "value" in n && (t[e] = n.value), t
                            }
                        },
                        function(t, e, n) {
                            var r = n(24),
                                i = Math.min;
                            t.exports = function(t) {
                                return t > 0 ? i(r(t), 9007199254740991) : 0
                            }
                        },
                        function(t, e, n) {
                            var r = n(23);
                            t.exports = function(t) {
                                return Object(r(t))
                            }
                        },
                        function(t, e) {
                            t.exports = function(t) {
                                if ("function" != typeof t) throw TypeError(t + " is not a function!");
                                return t
                            }
                        },
                        function(t, e) {
                            var n = {}.hasOwnProperty;
                            t.exports = function(t, e) {
                                return n.call(t, e)
                            }
                        },
                        function(t, e, n) {
                            var r = n(7),
                                i = n(31);
                            t.exports = n(6) ? function(t, e, n) {
                                return r.f(t, e, i(1, n))
                            } : function(t, e, n) {
                                return t[e] = n, t
                            }
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(12),
                                o = n(11),
                                u = n(32)("src"),
                                s = Function.toString,
                                a = ("" + s).split("toString");
                            n(21).inspectSource = function(t) {
                                return s.call(t)
                            }, (t.exports = function(t, e, n, s) {
                                var f = "function" == typeof n;
                                f && (o(n, "name") || i(n, "name", e)), t[e] !== n && (f && (o(n, u) || i(n, u, t[e] ? "" + t[e] : a.join(String(e)))), t === r ? t[e] = n : s ? t[e] ? t[e] = n : i(t, e, n) : (delete t[e], i(t, e, n)))
                            })(Function.prototype, "toString", function() {
                                return "function" == typeof this && this[u] || s.call(this)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(3),
                                o = n(23),
                                u = /"/g,
                                s = function(t, e, n, r) {
                                    var i = String(o(t)),
                                        s = "<" + e;
                                    return "" !== n && (s += " " + n + '="' + String(r).replace(u, "&quot;") + '"'), s + ">" + i + "</" + e + ">"
                                };
                            t.exports = function(t, e) {
                                var n = {};
                                n[t] = e(s), r(r.P + r.F * i(function() {
                                    var e = "" [t]('"');
                                    return e !== e.toLowerCase() || e.split('"').length > 3
                                }), "String", n)
                            }
                        },
                        function(t, e, n) {
                            var r = n(49),
                                i = n(23);
                            t.exports = function(t) {
                                return r(i(t))
                            }
                        },
                        function(t, e, n) {
                            var r = n(50),
                                i = n(31),
                                o = n(15),
                                u = n(22),
                                s = n(11),
                                a = n(105),
                                f = Object.getOwnPropertyDescriptor;
                            e.f = n(6) ? f : function(t, e) {
                                if (t = o(t), e = u(e, !0), a) try {
                                    return f(t, e)
                                } catch (t) {}
                                if (s(t, e)) return i(!r.f.call(t, e), t[e])
                            }
                        },
                        function(t, e, n) {
                            var r = n(11),
                                i = n(9),
                                o = n(78)("IE_PROTO"),
                                u = Object.prototype;
                            t.exports = Object.getPrototypeOf || function(t) {
                                return t = i(t), r(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null
                            }
                        },
                        function(t, e, n) {
                            var r = n(10);
                            t.exports = function(t, e, n) {
                                if (r(t), void 0 === e) return t;
                                switch (n) {
                                    case 1:
                                        return function(n) {
                                            return t.call(e, n)
                                        };
                                    case 2:
                                        return function(n, r) {
                                            return t.call(e, n, r)
                                        };
                                    case 3:
                                        return function(n, r, i) {
                                            return t.call(e, n, r, i)
                                        }
                                }
                                return function() {
                                    return t.apply(e, arguments)
                                }
                            }
                        },
                        function(t, e) {
                            var n = {}.toString;
                            t.exports = function(t) {
                                return n.call(t).slice(8, -1)
                            }
                        },
                        function(t, e, n) {
                            var r = n(3);
                            t.exports = function(t, e) {
                                return !!t && r(function() {
                                    e ? t.call(null, function() {}, 1) : t.call(null)
                                })
                            }
                        },
                        function(t, e) {
                            var n = t.exports = {
                                version: "2.5.1"
                            };
                            "number" == typeof __e && (__e = n)
                        },
                        function(t, e, n) {
                            var r = n(4);
                            t.exports = function(t, e) {
                                if (!r(t)) return t;
                                var n, i;
                                if (e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i;
                                if ("function" == typeof(n = t.valueOf) && !r(i = n.call(t))) return i;
                                if (!e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i;
                                throw TypeError("Can't convert object to primitive value")
                            }
                        },
                        function(t, e) {
                            t.exports = function(t) {
                                if (void 0 == t) throw TypeError("Can't call method on  " + t);
                                return t
                            }
                        },
                        function(t, e) {
                            var n = Math.ceil,
                                r = Math.floor;
                            t.exports = function(t) {
                                return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t)
                            }
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(21),
                                o = n(3);
                            t.exports = function(t, e) {
                                var n = (i.Object || {})[t] || Object[t],
                                    u = {};
                                u[t] = e(n), r(r.S + r.F * o(function() {
                                    n(1)
                                }), "Object", u)
                            }
                        },
                        function(t, e, n) {
                            var r = n(18),
                                i = n(49),
                                o = n(9),
                                u = n(8),
                                s = n(95);
                            t.exports = function(t, e) {
                                var n = 1 == t,
                                    a = 2 == t,
                                    f = 3 == t,
                                    c = 4 == t,
                                    h = 6 == t,
                                    l = 5 == t || h,
                                    p = e || s;
                                return function(e, s, d) {
                                    for (var v, y, g = o(e), _ = i(g), b = r(s, d, 3), w = u(_.length), m = 0, S = n ? p(e, w) : a ? p(e, 0) : void 0; w > m; m++)
                                        if ((l || m in _) && (v = _[m], y = b(v, m, g), t))
                                            if (n) S[m] = y;
                                            else if (y) switch (t) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return v;
                                        case 6:
                                            return m;
                                        case 2:
                                            S.push(v)
                                    } else if (c) return !1;
                                    return h ? -1 : f || c ? c : S
                                }
                            }
                        },
                        function(t, e, n) {
                            if (n(6)) {
                                var r = n(33),
                                    i = n(2),
                                    o = n(3),
                                    u = n(0),
                                    s = n(64),
                                    a = n(101),
                                    f = n(18),
                                    c = n(39),
                                    h = n(31),
                                    l = n(12),
                                    p = n(41),
                                    d = n(24),
                                    v = n(8),
                                    y = n(131),
                                    g = n(35),
                                    _ = n(22),
                                    b = n(11),
                                    w = n(51),
                                    m = n(4),
                                    S = n(9),
                                    E = n(92),
                                    O = n(36),
                                    A = n(17),
                                    N = n(37).f,
                                    T = n(94),
                                    B = n(32),
                                    I = n(5),
                                    R = n(26),
                                    P = n(55),
                                    x = n(62),
                                    D = n(97),
                                    M = n(46),
                                    k = n(59),
                                    U = n(38),
                                    j = n(96),
                                    L = n(121),
                                    C = n(7),
                                    F = n(16),
                                    Y = C.f,
                                    W = F.f,
                                    K = i.RangeError,
                                    $ = i.TypeError,
                                    V = i.Uint8Array,
                                    J = Array.prototype,
                                    G = a.ArrayBuffer,
                                    z = a.DataView,
                                    q = R(0),
                                    H = R(2),
                                    X = R(3),
                                    Z = R(4),
                                    Q = R(5),
                                    tt = R(6),
                                    et = P(!0),
                                    nt = P(!1),
                                    rt = D.values,
                                    it = D.keys,
                                    ot = D.entries,
                                    ut = J.lastIndexOf,
                                    st = J.reduce,
                                    at = J.reduceRight,
                                    ft = J.join,
                                    ct = J.sort,
                                    ht = J.slice,
                                    lt = J.toString,
                                    pt = J.toLocaleString,
                                    dt = I("iterator"),
                                    vt = I("toStringTag"),
                                    yt = B("typed_constructor"),
                                    gt = B("def_constructor"),
                                    _t = s.CONSTR,
                                    bt = s.TYPED,
                                    wt = s.VIEW,
                                    mt = R(1, function(t, e) {
                                        return Nt(x(t, t[gt]), e)
                                    }),
                                    St = o(function() {
                                        return 1 === new V(new Uint16Array([1]).buffer)[0]
                                    }),
                                    Et = !! V && !! V.prototype.set && o(function() {
                                        new V(1).set({})
                                    }),
                                    Ot = function(t, e) {
                                        var n = d(t);
                                        if (n < 0 || n % e) throw K("Wrong offset!");
                                        return n
                                    }, At = function(t) {
                                        if (m(t) && bt in t) return t;
                                        throw $(t + " is not a typed array!")
                                    }, Nt = function(t, e) {
                                        if (!(m(t) && yt in t)) throw $("It is not a typed array constructor!");
                                        return new t(e)
                                    }, Tt = function(t, e) {
                                        return Bt(x(t, t[gt]), e)
                                    }, Bt = function(t, e) {
                                        for (var n = 0, r = e.length, i = Nt(t, r); r > n;) i[n] = e[n++];
                                        return i
                                    }, It = function(t, e, n) {
                                        Y(t, e, {
                                            get: function() {
                                                return this._d[n]
                                            }
                                        })
                                    }, Rt = function(t) {
                                        var e, n, r, i, o, u, s = S(t),
                                            a = arguments.length,
                                            c = a > 1 ? arguments[1] : void 0,
                                            h = void 0 !== c,
                                            l = T(s);
                                        if (void 0 != l && !E(l)) {
                                            for (u = l.call(s), r = [], e = 0; !(o = u.next()).done; e++) r.push(o.value);
                                            s = r
                                        }
                                        for (h && a > 2 && (c = f(c, arguments[2], 2)), e = 0, n = v(s.length), i = Nt(this, n); n > e; e++) i[e] = h ? c(s[e], e) : s[e];
                                        return i
                                    }, Pt = function() {
                                        for (var t = 0, e = arguments.length, n = Nt(this, e); e > t;) n[t] = arguments[t++];
                                        return n
                                    }, xt = !! V && o(function() {
                                        pt.call(new V(1))
                                    }),
                                    Dt = function() {
                                        return pt.apply(xt ? ht.call(At(this)) : At(this), arguments)
                                    }, Mt = {
                                        copyWithin: function(t, e) {
                                            return L.call(At(this), t, e, arguments.length > 2 ? arguments[2] : void 0)
                                        },
                                        every: function(t) {
                                            return Z(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        fill: function(t) {
                                            return j.apply(At(this), arguments)
                                        },
                                        filter: function(t) {
                                            return Tt(this, H(At(this), t, arguments.length > 1 ? arguments[1] : void 0))
                                        },
                                        find: function(t) {
                                            return Q(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        findIndex: function(t) {
                                            return tt(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        forEach: function(t) {
                                            q(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        indexOf: function(t) {
                                            return nt(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        includes: function(t) {
                                            return et(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        join: function(t) {
                                            return ft.apply(At(this), arguments)
                                        },
                                        lastIndexOf: function(t) {
                                            return ut.apply(At(this), arguments)
                                        },
                                        map: function(t) {
                                            return mt(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        reduce: function(t) {
                                            return st.apply(At(this), arguments)
                                        },
                                        reduceRight: function(t) {
                                            return at.apply(At(this), arguments)
                                        },
                                        reverse: function() {
                                            for (var t, e = this, n = At(e).length, r = Math.floor(n / 2), i = 0; i < r;) t = e[i], e[i++] = e[--n], e[n] = t;
                                            return e
                                        },
                                        some: function(t) {
                                            return X(At(this), t, arguments.length > 1 ? arguments[1] : void 0)
                                        },
                                        sort: function(t) {
                                            return ct.call(At(this), t)
                                        },
                                        subarray: function(t, e) {
                                            var n = At(this),
                                                r = n.length,
                                                i = g(t, r);
                                            return new(x(n, n[gt]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, v((void 0 === e ? r : g(e, r)) - i))
                                        }
                                    }, kt = function(t, e) {
                                        return Tt(this, ht.call(At(this), t, e))
                                    }, Ut = function(t) {
                                        At(this);
                                        var e = Ot(arguments[1], 1),
                                            n = this.length,
                                            r = S(t),
                                            i = v(r.length),
                                            o = 0;
                                        if (i + e > n) throw K("Wrong length!");
                                        for (; o < i;) this[e + o] = r[o++]
                                    }, jt = {
                                        entries: function() {
                                            return ot.call(At(this))
                                        },
                                        keys: function() {
                                            return it.call(At(this))
                                        },
                                        values: function() {
                                            return rt.call(At(this))
                                        }
                                    }, Lt = function(t, e) {
                                        return m(t) && t[bt] && "symbol" != (void 0 === e ? "undefined" : _typeof2(e)) && e in t && String(+e) == String(e)
                                    }, Ct = function(t, e) {
                                        return Lt(t, e = _(e, !0)) ? h(2, t[e]) : W(t, e)
                                    }, Ft = function(t, e, n) {
                                        return !(Lt(t, e = _(e, !0)) && m(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? Y(t, e, n) : (t[e] = n.value, t)
                                    };
                                _t || (F.f = Ct, C.f = Ft), u(u.S + u.F * !_t, "Object", {
                                    getOwnPropertyDescriptor: Ct,
                                    defineProperty: Ft
                                }), o(function() {
                                    lt.call({})
                                }) && (lt = pt = function() {
                                    return ft.call(this)
                                });
                                var Yt = p({}, Mt);
                                p(Yt, jt), l(Yt, dt, jt.values), p(Yt, {
                                    slice: kt,
                                    set: Ut,
                                    constructor: function() {},
                                    toString: lt,
                                    toLocaleString: Dt
                                }), It(Yt, "buffer", "b"), It(Yt, "byteOffset", "o"), It(Yt, "byteLength", "l"), It(Yt, "length", "e"), Y(Yt, vt, {
                                    get: function() {
                                        return this[bt]
                                    }
                                }), t.exports = function(t, e, n, a) {
                                    a = !! a;
                                    var f = t + (a ? "Clamped" : "") + "Array",
                                        h = "get" + t,
                                        p = "set" + t,
                                        d = i[f],
                                        g = d || {}, _ = d && A(d),
                                        b = !d || !s.ABV,
                                        S = {}, E = d && d.prototype,
                                        T = function(t, n) {
                                            var r = t._d;
                                            return r.v[h](n * e + r.o, St)
                                        }, B = function(t, n, r) {
                                            var i = t._d;
                                            a && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.v[p](n * e + i.o, r, St)
                                        }, I = function(t, e) {
                                            Y(t, e, {
                                                get: function() {
                                                    return T(this, e)
                                                },
                                                set: function(t) {
                                                    return B(this, e, t)
                                                },
                                                enumerable: !0
                                            })
                                        };
                                    b ? (d = n(function(t, n, r, i) {
                                        c(t, d, f, "_d");
                                        var o, u, s, a, h = 0,
                                            p = 0;
                                        if (m(n)) {
                                            if (!(n instanceof G || "ArrayBuffer" == (a = w(n)) || "SharedArrayBuffer" == a)) return bt in n ? Bt(d, n) : Rt.call(d, n);
                                            o = n, p = Ot(r, e);
                                            var g = n.byteLength;
                                            if (void 0 === i) {
                                                if (g % e) throw K("Wrong length!");
                                                if ((u = g - p) < 0) throw K("Wrong length!")
                                            } else if ((u = v(i) * e) + p > g) throw K("Wrong length!");
                                            s = u / e
                                        } else s = y(n), u = s * e, o = new G(u);
                                        for (l(t, "_d", {
                                            b: o,
                                            o: p,
                                            l: u,
                                            e: s,
                                            v: new z(o)
                                        }); h < s;) I(t, h++)
                                    }), E = d.prototype = O(Yt), l(E, "constructor", d)) : o(function() {
                                        d(1)
                                    }) && o(function() {
                                        new d(-1)
                                    }) && k(function(t) {
                                        new d, new d(null), new d(1.5), new d(t)
                                    }, !0) || (d = n(function(t, n, r, i) {
                                        c(t, d, f);
                                        var o;
                                        return m(n) ? n instanceof G || "ArrayBuffer" == (o = w(n)) || "SharedArrayBuffer" == o ? void 0 !== i ? new g(n, Ot(r, e), i) : void 0 !== r ? new g(n, Ot(r, e)) : new g(n) : bt in n ? Bt(d, n) : Rt.call(d, n) : new g(y(n))
                                    }), q(_ !== Function.prototype ? N(g).concat(N(_)) : N(g), function(t) {
                                        t in d || l(d, t, g[t])
                                    }), d.prototype = E, r || (E.constructor = d));
                                    var R = E[dt],
                                        P = !! R && ("values" == R.name || void 0 == R.name),
                                        x = jt.values;
                                    l(d, yt, !0), l(E, bt, f), l(E, wt, !0), l(E, gt, d), (a ? new d(1)[vt] == f : vt in E) || Y(E, vt, {
                                        get: function() {
                                            return f
                                        }
                                    }), S[f] = d, u(u.G + u.W + u.F * (d != g), S), u(u.S, f, {
                                        BYTES_PER_ELEMENT: e
                                    }), u(u.S + u.F * o(function() {
                                        g.of.call(d, 1)
                                    }), f, {
                                        from: Rt,
                                        of: Pt
                                    }), "BYTES_PER_ELEMENT" in E || l(E, "BYTES_PER_ELEMENT", e), u(u.P, f, Mt), U(f), u(u.P + u.F * Et, f, {
                                        set: Ut
                                    }), u(u.P + u.F * !P, f, jt), r || E.toString == lt || (E.toString = lt), u(u.P + u.F * o(function() {
                                        new d(1).slice()
                                    }), f, {
                                        slice: kt
                                    }), u(u.P + u.F * (o(function() {
                                        return [1, 2].toLocaleString() != new d([1, 2]).toLocaleString()
                                    }) || !o(function() {
                                        E.toLocaleString.call([1, 2])
                                    })), f, {
                                        toLocaleString: Dt
                                    }), M[f] = P ? R : x, r || P || l(E, dt, x)
                                }
                            } else t.exports = function() {}
                        },
                        function(t, e, n) {
                            var r = n(126),
                                i = n(0),
                                o = n(54)("metadata"),
                                u = o.store || (o.store = new(n(129))),
                                s = function(t, e, n) {
                                    var i = u.get(t);
                                    if (!i) {
                                        if (!n) return;
                                        u.set(t, i = new r)
                                    }
                                    var o = i.get(e);
                                    if (!o) {
                                        if (!n) return;
                                        i.set(e, o = new r)
                                    }
                                    return o
                                }, a = function(t, e, n) {
                                    var r = s(e, n, !1);
                                    return void 0 !== r && r.has(t)
                                }, f = function(t, e, n) {
                                    var r = s(e, n, !1);
                                    return void 0 === r ? void 0 : r.get(t)
                                }, c = function(t, e, n, r) {
                                    s(n, r, !0).set(t, e)
                                }, h = function(t, e) {
                                    var n = s(t, e, !1),
                                        r = [];
                                    return n && n.forEach(function(t, e) {
                                        r.push(e)
                                    }), r
                                }, l = function(t) {
                                    return void 0 === t || "symbol" == (void 0 === t ? "undefined" : _typeof2(t)) ? t : String(t)
                                }, p = function(t) {
                                    i(i.S, "Reflect", t)
                                };
                            t.exports = {
                                store: u,
                                map: s,
                                has: a,
                                get: f,
                                set: c,
                                keys: h,
                                key: l,
                                exp: p
                            }
                        },
                        function(t, e, n) {
                            var r = n(32)("meta"),
                                i = n(4),
                                o = n(11),
                                u = n(7).f,
                                s = 0,
                                a = Object.isExtensible || function() {
                                    return !0
                                }, f = !n(3)(function() {
                                    return a(Object.preventExtensions({}))
                                }),
                                c = function(t) {
                                    u(t, r, {
                                        value: {
                                            i: "O" + ++s,
                                            w: {}
                                        }
                                    })
                                }, h = function(t, e) {
                                    if (!i(t)) return "symbol" == (void 0 === t ? "undefined" : _typeof2(t)) ? t : ("string" == typeof t ? "S" : "P") + t;
                                    if (!o(t, r)) {
                                        if (!a(t)) return "F";
                                        if (!e) return "E";
                                        c(t)
                                    }
                                    return t[r].i
                                }, l = function(t, e) {
                                    if (!o(t, r)) {
                                        if (!a(t)) return !0;
                                        if (!e) return !1;
                                        c(t)
                                    }
                                    return t[r].w
                                }, p = function(t) {
                                    return f && d.NEED && a(t) && !o(t, r) && c(t), t
                                }, d = t.exports = {
                                    KEY: r,
                                    NEED: !1,
                                    fastKey: h,
                                    getWeak: l,
                                    onFreeze: p
                                }
                        },
                        function(t, e, n) {
                            var r = n(5)("unscopables"),
                                i = Array.prototype;
                            void 0 == i[r] && n(12)(i, r, {}), t.exports = function(t) {
                                i[r][t] = !0
                            }
                        },
                        function(t, e) {
                            t.exports = function(t, e) {
                                return {
                                    enumerable: !(1 & t),
                                    configurable: !(2 & t),
                                    writable: !(4 & t),
                                    value: e
                                }
                            }
                        },
                        function(t, e) {
                            var n = 0,
                                r = Math.random();
                            t.exports = function(t) {
                                return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36))
                            }
                        },
                        function(t, e) {
                            t.exports = !1
                        },
                        function(t, e, n) {
                            var r = n(107),
                                i = n(79);
                            t.exports = Object.keys || function(t) {
                                return r(t, i)
                            }
                        },
                        function(t, e, n) {
                            var r = n(24),
                                i = Math.max,
                                o = Math.min;
                            t.exports = function(t, e) {
                                return t = r(t), t < 0 ? i(t + e, 0) : o(t, e)
                            }
                        },
                        function(t, e, n) {
                            var r = n(1),
                                i = n(108),
                                o = n(79),
                                u = n(78)("IE_PROTO"),
                                s = function() {}, a = function() {
                                    var t, e = n(76)("iframe"),
                                        r = o.length;
                                    for (e.style.display = "none", n(80).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), a = t.F; r--;) delete a.prototype[o[r]];
                                    return a()
                                };
                            t.exports = Object.create || function(t, e) {
                                var n;
                                return null !== t ? (s.prototype = r(t), n = new s, s.prototype = null, n[u] = t) : n = a(), void 0 === e ? n : i(n, e)
                            }
                        },
                        function(t, e, n) {
                            var r = n(107),
                                i = n(79).concat("length", "prototype");
                            e.f = Object.getOwnPropertyNames || function(t) {
                                return r(t, i)
                            }
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(7),
                                o = n(6),
                                u = n(5)("species");
                            t.exports = function(t) {
                                var e = r[t];
                                o && e && !e[u] && i.f(e, u, {
                                    configurable: !0,
                                    get: function() {
                                        return this
                                    }
                                })
                            }
                        },
                        function(t, e) {
                            t.exports = function(t, e, n, r) {
                                if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");
                                return t
                            }
                        },
                        function(t, e, n) {
                            var r = n(18),
                                i = n(119),
                                o = n(92),
                                u = n(1),
                                s = n(8),
                                a = n(94),
                                f = {}, c = {}, e = t.exports = function(t, e, n, h, l) {
                                    var p, d, v, y, g = l ? function() {
                                            return t
                                        } : a(t),
                                        _ = r(n, h, e ? 2 : 1),
                                        b = 0;
                                    if ("function" != typeof g) throw TypeError(t + " is not iterable!");
                                    if (o(g)) {
                                        for (p = s(t.length); p > b; b++)
                                            if ((y = e ? _(u(d = t[b])[0], d[1]) : _(t[b])) === f || y === c) return y
                                    } else
                                        for (v = g.call(t); !(d = v.next()).done;)
                                            if ((y = i(v, _, d.value, e)) === f || y === c) return y
                                };
                            e.BREAK = f, e.RETURN = c
                        },
                        function(t, e, n) {
                            var r = n(13);
                            t.exports = function(t, e, n) {
                                for (var i in e) r(t, i, e[i], n);
                                return t
                            }
                        },
                        function(t, e, n) {
                            (function(t) {
                                function r() {
                                    return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                                }

                                function i(t, e) {
                                    if (r() < e) throw new RangeError("Invalid typed array length");
                                    return o.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = o.prototype) : (null === t && (t = new o(e)), t.length = e), t
                                }

                                function o(t, e, n) {
                                    if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(t, e, n);
                                    if ("number" == typeof t) {
                                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                                        return f(this, t)
                                    }
                                    return u(this, t, e, n)
                                }

                                function u(t, e, n, r) {
                                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? l(t, e, n, r) : "string" == typeof e ? c(t, e, n) : p(t, e)
                                }

                                function s(t) {
                                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                                }

                                function a(t, e, n, r) {
                                    return s(e), e <= 0 ? i(t, e) : void 0 !== n ? "string" == typeof r ? i(t, e).fill(n, r) : i(t, e).fill(n) : i(t, e)
                                }

                                function f(t, e) {
                                    if (s(e), t = i(t, e < 0 ? 0 : 0 | d(e)), !o.TYPED_ARRAY_SUPPORT)
                                        for (var n = 0; n < e; ++n) t[n] = 0;
                                    return t
                                }

                                function c(t, e, n) {
                                    if ("string" == typeof n && "" !== n || (n = "utf8"), !o.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                                    var r = 0 | y(e, n);
                                    t = i(t, r);
                                    var u = t.write(e, n);
                                    return u !== r && (t = t.slice(0, u)), t
                                }

                                function h(t, e) {
                                    var n = e.length < 0 ? 0 : 0 | d(e.length);
                                    t = i(t, n);
                                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                                    return t
                                }

                                function l(t, e, n, r) {
                                    if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                                    if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                                    return e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r), o.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = o.prototype) : t = h(t, e), t
                                }

                                function p(t, e) {
                                    if (o.isBuffer(e)) {
                                        var n = 0 | d(e.length);
                                        return t = i(t, n), 0 === t.length ? t : (e.copy(t, 0, 0, n), t)
                                    }
                                    if (e) {
                                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || q(e.length) ? i(t, 0) : h(t, e);
                                        if ("Buffer" === e.type && Z(e.data)) return h(t, e.data)
                                    }
                                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                                }

                                function d(t) {
                                    if (t >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                                    return 0 | t
                                }

                                function v(t) {
                                    return +t != t && (t = 0), o.alloc(+t)
                                }

                                function y(t, e) {
                                    if (o.isBuffer(t)) return t.length;
                                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                                    "string" != typeof t && (t = "" + t);
                                    var n = t.length;
                                    if (0 === n) return 0;
                                    for (var r = !1;;) switch (e) {
                                        case "ascii":
                                        case "latin1":
                                        case "binary":
                                            return n;
                                        case "utf8":
                                        case "utf-8":
                                        case void 0:
                                            return $(t).length;
                                        case "ucs2":
                                        case "ucs-2":
                                        case "utf16le":
                                        case "utf-16le":
                                            return 2 * n;
                                        case "hex":
                                            return n >>> 1;
                                        case "base64":
                                            return G(t).length;
                                        default:
                                            if (r) return $(t).length;
                                            e = ("" + e).toLowerCase(), r = !0
                                    }
                                }

                                function g(t, e, n) {
                                    var r = !1;
                                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                                    if (n >>>= 0, e >>>= 0, n <= e) return "";
                                    for (t || (t = "utf8");;) switch (t) {
                                        case "hex":
                                            return x(this, e, n);
                                        case "utf8":
                                        case "utf-8":
                                            return B(this, e, n);
                                        case "ascii":
                                            return R(this, e, n);
                                        case "latin1":
                                        case "binary":
                                            return P(this, e, n);
                                        case "base64":
                                            return T(this, e, n);
                                        case "ucs2":
                                        case "ucs-2":
                                        case "utf16le":
                                        case "utf-16le":
                                            return D(this, e, n);
                                        default:
                                            if (r) throw new TypeError("Unknown encoding: " + t);
                                            t = (t + "").toLowerCase(), r = !0
                                    }
                                }

                                function _(t, e, n) {
                                    var r = t[e];
                                    t[e] = t[n], t[n] = r
                                }

                                function b(t, e, n, r, i) {
                                    if (0 === t.length) return -1;
                                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                                        if (i) return -1;
                                        n = t.length - 1
                                    } else if (n < 0) {
                                        if (!i) return -1;
                                        n = 0
                                    }
                                    if ("string" == typeof e && (e = o.from(e, r)), o.isBuffer(e)) return 0 === e.length ? -1 : w(t, e, n, r, i);
                                    if ("number" == typeof e) return e &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : w(t, [e], n, r, i);
                                    throw new TypeError("val must be string, number or Buffer")
                                }

                                function w(t, e, n, r, i) {
                                    function o(t, e) {
                                        return 1 === u ? t[e] : t.readUInt16BE(e * u)
                                    }
                                    var u = 1,
                                        s = t.length,
                                        a = e.length;
                                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                                        if (t.length < 2 || e.length < 2) return -1;
                                        u = 2, s /= 2, a /= 2, n /= 2
                                    }
                                    var f;
                                    if (i) {
                                        var c = -1;
                                        for (f = n; f < s; f++)
                                            if (o(t, f) === o(e, -1 === c ? 0 : f - c)) {
                                                if (-1 === c && (c = f), f - c + 1 === a) return c * u
                                            } else -1 !== c && (f -= f - c), c = -1
                                    } else
                                        for (n + a > s && (n = s - a), f = n; f >= 0; f--) {
                                            for (var h = !0, l = 0; l < a; l++)
                                                if (o(t, f + l) !== o(e, l)) {
                                                    h = !1;
                                                    break
                                                }
                                            if (h) return f
                                        }
                                    return -1
                                }

                                function m(t, e, n, r) {
                                    n = Number(n) || 0;
                                    var i = t.length - n;
                                    r ? (r = Number(r)) > i && (r = i) : r = i;
                                    var o = e.length;
                                    if (o % 2 != 0) throw new TypeError("Invalid hex string");
                                    r > o / 2 && (r = o / 2);
                                    for (var u = 0; u < r; ++u) {
                                        var s = parseInt(e.substr(2 * u, 2), 16);
                                        if (isNaN(s)) return u;
                                        t[n + u] = s
                                    }
                                    return u
                                }

                                function S(t, e, n, r) {
                                    return z($(e, t.length - n), t, n, r)
                                }

                                function E(t, e, n, r) {
                                    return z(V(e), t, n, r)
                                }

                                function O(t, e, n, r) {
                                    return E(t, e, n, r)
                                }

                                function A(t, e, n, r) {
                                    return z(G(e), t, n, r)
                                }

                                function N(t, e, n, r) {
                                    return z(J(e, t.length - n), t, n, r)
                                }

                                function T(t, e, n) {
                                    return 0 === e && n === t.length ? H.fromByteArray(t) : H.fromByteArray(t.slice(e, n))
                                }

                                function B(t, e, n) {
                                    n = Math.min(t.length, n);
                                    for (var r = [], i = e; i < n;) {
                                        var o = t[i],
                                            u = null,
                                            s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                                        if (i + s <= n) {
                                            var a, f, c, h;
                                            switch (s) {
                                                case 1:
                                                    o < 128 && (u = o);
                                                    break;
                                                case 2:
                                                    a = t[i + 1], 128 == (192 & a) && (h = (31 & o) << 6 | 63 & a) > 127 && (u = h);
                                                    break;
                                                case 3:
                                                    a = t[i + 1], f = t[i + 2], 128 == (192 & a) && 128 == (192 & f) && (h = (15 & o) << 12 | (63 & a) << 6 | 63 & f) > 2047 && (h < 55296 || h > 57343) && (u = h);
                                                    break;
                                                case 4:
                                                    a = t[i + 1], f = t[i + 2], c = t[i + 3], 128 == (192 & a) && 128 == (192 & f) && 128 == (192 & c) && (h = (15 & o) << 18 | (63 & a) << 12 | (63 & f) << 6 | 63 & c) > 65535 && h < 1114112 && (u = h)
                                            }
                                        }
                                        null === u ? (u = 65533, s = 1) : u > 65535 && (u -= 65536, r.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), r.push(u), i += s
                                    }
                                    return I(r)
                                }

                                function I(t) {
                                    var e = t.length;
                                    if (e <= Q) return String.fromCharCode.apply(String, t);
                                    for (var n = "", r = 0; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += Q));
                                    return n
                                }

                                function R(t, e, n) {
                                    var r = "";
                                    n = Math.min(t.length, n);
                                    for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                                    return r
                                }

                                function P(t, e, n) {
                                    var r = "";
                                    n = Math.min(t.length, n);
                                    for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                                    return r
                                }

                                function x(t, e, n) {
                                    var r = t.length;
                                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                                    for (var i = "", o = e; o < n; ++o) i += K(t[o]);
                                    return i
                                }

                                function D(t, e, n) {
                                    for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                                    return i
                                }

                                function M(t, e, n) {
                                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                                }

                                function k(t, e, n, r, i, u) {
                                    if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                                    if (e > i || e < u) throw new RangeError('"value" argument is out of bounds');
                                    if (n + r > t.length) throw new RangeError("Index out of range")
                                }

                                function U(t, e, n, r) {
                                    e < 0 && (e = 65535 + e + 1);
                                    for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
                                }

                                function j(t, e, n, r) {
                                    e < 0 && (e = 4294967295 + e + 1);
                                    for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
                                }

                                function L(t, e, n, r, i, o) {
                                    if (n + r > t.length) throw new RangeError("Index out of range");
                                    if (n < 0) throw new RangeError("Index out of range")
                                }

                                function C(t, e, n, r, i) {
                                    return i || L(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), X.write(t, e, n, r, 23, 4), n + 4
                                }

                                function F(t, e, n, r, i) {
                                    return i || L(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), X.write(t, e, n, r, 52, 8), n + 8
                                }

                                function Y(t) {
                                    if (t = W(t).replace(tt, ""), t.length < 2) return "";
                                    for (; t.length % 4 != 0;) t += "=";
                                    return t
                                }

                                function W(t) {
                                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                                }

                                function K(t) {
                                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                                }

                                function $(t, e) {
                                    e = e || 1 / 0;
                                    for (var n, r = t.length, i = null, o = [], u = 0; u < r; ++u) {
                                        if ((n = t.charCodeAt(u)) > 55295 && n < 57344) {
                                            if (!i) {
                                                if (n > 56319) {
                                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                                    continue
                                                }
                                                if (u + 1 === r) {
                                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                                    continue
                                                }
                                                i = n;
                                                continue
                                            }
                                            if (n < 56320) {
                                                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                                                continue
                                            }
                                            n = 65536 + (i - 55296 << 10 | n - 56320)
                                        } else i && (e -= 3) > -1 && o.push(239, 191, 189); if (i = null, n < 128) {
                                            if ((e -= 1) < 0) break;
                                            o.push(n)
                                        } else if (n < 2048) {
                                            if ((e -= 2) < 0) break;
                                            o.push(n >> 6 | 192, 63 & n | 128)
                                        } else if (n < 65536) {
                                            if ((e -= 3) < 0) break;
                                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                                        } else {
                                            if (!(n < 1114112)) throw new Error("Invalid code point");
                                            if ((e -= 4) < 0) break;
                                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                                        }
                                    }
                                    return o
                                }

                                function V(t) {
                                    for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                                    return e
                                }

                                function J(t, e) {
                                    for (var n, r, i, o = [], u = 0; u < t.length && !((e -= 2) < 0); ++u) n = t.charCodeAt(u), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                                    return o
                                }

                                function G(t) {
                                    return H.toByteArray(Y(t))
                                }

                                function z(t, e, n, r) {
                                    for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                                    return i
                                }

                                function q(t) {
                                    return t !== t
                                }
                                /*!
                                 * The buffer module from node.js, for the browser.
                                 *
                                 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
                                 * @license  MIT
                                 */
                                var H = n(344),
                                    X = n(345),
                                    Z = n(346);
                                e.Buffer = o, e.SlowBuffer = v, e.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                                    try {
                                        var t = new Uint8Array(1);
                                        return t.__proto__ = {
                                            __proto__: Uint8Array.prototype,
                                            foo: function() {
                                                return 42
                                            }
                                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                                    } catch (t) {
                                        return !1
                                    }
                                }(), e.kMaxLength = r(), o.poolSize = 8192, o._augment = function(t) {
                                    return t.__proto__ = o.prototype, t
                                }, o.from = function(t, e, n) {
                                    return u(null, t, e, n)
                                }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
                                    value: null,
                                    configurable: !0
                                })), o.alloc = function(t, e, n) {
                                    return a(null, t, e, n)
                                }, o.allocUnsafe = function(t) {
                                    return f(null, t)
                                }, o.allocUnsafeSlow = function(t) {
                                    return f(null, t)
                                }, o.isBuffer = function(t) {
                                    return !(null == t || !t._isBuffer)
                                }, o.compare = function(t, e) {
                                    if (!o.isBuffer(t) || !o.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                                    if (t === e) return 0;
                                    for (var n = t.length, r = e.length, i = 0, u = Math.min(n, r); i < u; ++i)
                                        if (t[i] !== e[i]) {
                                            n = t[i], r = e[i];
                                            break
                                        }
                                    return n < r ? -1 : r < n ? 1 : 0
                                }, o.isEncoding = function(t) {
                                    switch (String(t).toLowerCase()) {
                                        case "hex":
                                        case "utf8":
                                        case "utf-8":
                                        case "ascii":
                                        case "latin1":
                                        case "binary":
                                        case "base64":
                                        case "ucs2":
                                        case "ucs-2":
                                        case "utf16le":
                                        case "utf-16le":
                                            return !0;
                                        default:
                                            return !1
                                    }
                                }, o.concat = function(t, e) {
                                    if (!Z(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                                    if (0 === t.length) return o.alloc(0);
                                    var n;
                                    if (void 0 === e)
                                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                                    var r = o.allocUnsafe(e),
                                        i = 0;
                                    for (n = 0; n < t.length; ++n) {
                                        var u = t[n];
                                        if (!o.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
                                        u.copy(r, i), i += u.length
                                    }
                                    return r
                                }, o.byteLength = y, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
                                    var t = this.length;
                                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                                    for (var e = 0; e < t; e += 2) _(this, e, e + 1);
                                    return this
                                }, o.prototype.swap32 = function() {
                                    var t = this.length;
                                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                                    for (var e = 0; e < t; e += 4) _(this, e, e + 3), _(this, e + 1, e + 2);
                                    return this
                                }, o.prototype.swap64 = function() {
                                    var t = this.length;
                                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                                    for (var e = 0; e < t; e += 8) _(this, e, e + 7), _(this, e + 1, e + 6), _(this, e + 2, e + 5), _(this, e + 3, e + 4);
                                    return this
                                }, o.prototype.toString = function() {
                                    var t = 0 | this.length;
                                    return 0 === t ? "" : 0 === arguments.length ? B(this, 0, t) : g.apply(this, arguments)
                                }, o.prototype.equals = function(t) {
                                    if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                                    return this === t || 0 === o.compare(this, t)
                                }, o.prototype.inspect = function() {
                                    var t = "",
                                        n = e.INSPECT_MAX_BYTES;
                                    return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
                                }, o.prototype.compare = function(t, e, n, r, i) {
                                    if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                                    if (r >= i && e >= n) return 0;
                                    if (r >= i) return -1;
                                    if (e >= n) return 1;
                                    if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
                                    for (var u = i - r, s = n - e, a = Math.min(u, s), f = this.slice(r, i), c = t.slice(e, n), h = 0; h < a; ++h)
                                        if (f[h] !== c[h]) {
                                            u = f[h], s = c[h];
                                            break
                                        }
                                    return u < s ? -1 : s < u ? 1 : 0
                                }, o.prototype.includes = function(t, e, n) {
                                    return -1 !== this.indexOf(t, e, n)
                                }, o.prototype.indexOf = function(t, e, n) {
                                    return b(this, t, e, n, !0)
                                }, o.prototype.lastIndexOf = function(t, e, n) {
                                    return b(this, t, e, n, !1)
                                }, o.prototype.write = function(t, e, n, r) {
                                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                                    else {
                                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                                        e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                                    }
                                    var i = this.length - e;
                                    if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                                    r || (r = "utf8");
                                    for (var o = !1;;) switch (r) {
                                        case "hex":
                                            return m(this, t, e, n);
                                        case "utf8":
                                        case "utf-8":
                                            return S(this, t, e, n);
                                        case "ascii":
                                            return E(this, t, e, n);
                                        case "latin1":
                                        case "binary":
                                            return O(this, t, e, n);
                                        case "base64":
                                            return A(this, t, e, n);
                                        case "ucs2":
                                        case "ucs-2":
                                        case "utf16le":
                                        case "utf-16le":
                                            return N(this, t, e, n);
                                        default:
                                            if (o) throw new TypeError("Unknown encoding: " + r);
                                            r = ("" + r).toLowerCase(), o = !0
                                    }
                                }, o.prototype.toJSON = function() {
                                    return {
                                        type: "Buffer",
                                        data: Array.prototype.slice.call(this._arr || this, 0)
                                    }
                                };
                                var Q = 4096;
                                o.prototype.slice = function(t, e) {
                                    var n = this.length;
                                    t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                                    var r;
                                    if (o.TYPED_ARRAY_SUPPORT) r = this.subarray(t, e), r.__proto__ = o.prototype;
                                    else {
                                        var i = e - t;
                                        r = new o(i, void 0);
                                        for (var u = 0; u < i; ++u) r[u] = this[u + t]
                                    }
                                    return r
                                }, o.prototype.readUIntLE = function(t, e, n) {
                                    t |= 0, e |= 0, n || M(t, e, this.length);
                                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                                    return r
                                }, o.prototype.readUIntBE = function(t, e, n) {
                                    t |= 0, e |= 0, n || M(t, e, this.length);
                                    for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
                                    return r
                                }, o.prototype.readUInt8 = function(t, e) {
                                    return e || M(t, 1, this.length), this[t]
                                }, o.prototype.readUInt16LE = function(t, e) {
                                    return e || M(t, 2, this.length), this[t] | this[t + 1] << 8
                                }, o.prototype.readUInt16BE = function(t, e) {
                                    return e || M(t, 2, this.length), this[t] << 8 | this[t + 1]
                                }, o.prototype.readUInt32LE = function(t, e) {
                                    return e || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                                }, o.prototype.readUInt32BE = function(t, e) {
                                    return e || M(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                                }, o.prototype.readIntLE = function(t, e, n) {
                                    t |= 0, e |= 0, n || M(t, e, this.length);
                                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                                    return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
                                }, o.prototype.readIntBE = function(t, e, n) {
                                    t |= 0, e |= 0, n || M(t, e, this.length);
                                    for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
                                    return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
                                }, o.prototype.readInt8 = function(t, e) {
                                    return e || M(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                                }, o.prototype.readInt16LE = function(t, e) {
                                    e || M(t, 2, this.length);
                                    var n = this[t] | this[t + 1] << 8;
                                    return 32768 & n ? 4294901760 | n : n
                                }, o.prototype.readInt16BE = function(t, e) {
                                    e || M(t, 2, this.length);
                                    var n = this[t + 1] | this[t] << 8;
                                    return 32768 & n ? 4294901760 | n : n
                                }, o.prototype.readInt32LE = function(t, e) {
                                    return e || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                                }, o.prototype.readInt32BE = function(t, e) {
                                    return e || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                                }, o.prototype.readFloatLE = function(t, e) {
                                    return e || M(t, 4, this.length), X.read(this, t, !0, 23, 4)
                                }, o.prototype.readFloatBE = function(t, e) {
                                    return e || M(t, 4, this.length), X.read(this, t, !1, 23, 4)
                                }, o.prototype.readDoubleLE = function(t, e) {
                                    return e || M(t, 8, this.length), X.read(this, t, !0, 52, 8)
                                }, o.prototype.readDoubleBE = function(t, e) {
                                    return e || M(t, 8, this.length), X.read(this, t, !1, 52, 8)
                                }, o.prototype.writeUIntLE = function(t, e, n, r) {
                                    if (t = +t, e |= 0, n |= 0, !r) {
                                        k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
                                    }
                                    var i = 1,
                                        o = 0;
                                    for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
                                    return e + n
                                }, o.prototype.writeUIntBE = function(t, e, n, r) {
                                    if (t = +t, e |= 0, n |= 0, !r) {
                                        k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
                                    }
                                    var i = n - 1,
                                        o = 1;
                                    for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
                                    return e + n
                                }, o.prototype.writeUInt8 = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                                }, o.prototype.writeUInt16LE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
                                }, o.prototype.writeUInt16BE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
                                }, o.prototype.writeUInt32LE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : j(this, t, e, !0), e + 4
                                }, o.prototype.writeUInt32BE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4
                                }, o.prototype.writeIntLE = function(t, e, n, r) {
                                    if (t = +t, e |= 0, !r) {
                                        var i = Math.pow(2, 8 * n - 1);
                                        k(this, t, e, n, i - 1, -i)
                                    }
                                    var o = 0,
                                        u = 1,
                                        s = 0;
                                    for (this[e] = 255 & t; ++o < n && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), this[e + o] = (t / u >> 0) - s & 255;
                                    return e + n
                                }, o.prototype.writeIntBE = function(t, e, n, r) {
                                    if (t = +t, e |= 0, !r) {
                                        var i = Math.pow(2, 8 * n - 1);
                                        k(this, t, e, n, i - 1, -i)
                                    }
                                    var o = n - 1,
                                        u = 1,
                                        s = 0;
                                    for (this[e + o] = 255 & t; --o >= 0 && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), this[e + o] = (t / u >> 0) - s & 255;
                                    return e + n
                                }, o.prototype.writeInt8 = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                                }, o.prototype.writeInt16LE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
                                }, o.prototype.writeInt16BE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
                                }, o.prototype.writeInt32LE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : j(this, t, e, !0), e + 4
                                }, o.prototype.writeInt32BE = function(t, e, n) {
                                    return t = +t, e |= 0, n || k(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4
                                }, o.prototype.writeFloatLE = function(t, e, n) {
                                    return C(this, t, e, !0, n)
                                }, o.prototype.writeFloatBE = function(t, e, n) {
                                    return C(this, t, e, !1, n)
                                }, o.prototype.writeDoubleLE = function(t, e, n) {
                                    return F(this, t, e, !0, n)
                                }, o.prototype.writeDoubleBE = function(t, e, n) {
                                    return F(this, t, e, !1, n)
                                }, o.prototype.copy = function(t, e, n, r) {
                                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                                    if (0 === t.length || 0 === this.length) return 0;
                                    if (e < 0) throw new RangeError("targetStart out of bounds");
                                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                                    var i, u = r - n;
                                    if (this === t && n < e && e < r)
                                        for (i = u - 1; i >= 0; --i) t[i + e] = this[i + n];
                                    else if (u < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                                        for (i = 0; i < u; ++i) t[i + e] = this[i + n];
                                    else Uint8Array.prototype.set.call(t, this.subarray(n, n + u), e);
                                    return u
                                }, o.prototype.fill = function(t, e, n, r) {
                                    if ("string" == typeof t) {
                                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                                            var i = t.charCodeAt(0);
                                            i < 256 && (t = i)
                                        }
                                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                                        if ("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                                    } else "number" == typeof t && (t &= 255); if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                                    if (n <= e) return this;
                                    e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0);
                                    var u;
                                    if ("number" == typeof t)
                                        for (u = e; u < n; ++u) this[u] = t;
                                    else {
                                        var s = o.isBuffer(t) ? t : $(new o(t, r).toString()),
                                            a = s.length;
                                        for (u = 0; u < n - e; ++u) this[u + e] = s[u % a]
                                    }
                                    return this
                                };
                                var tt = /[^+\/0-9A-Za-z-_]/g
                            }).call(e, n(48))
                        },
                        function(t, e, n) {
                            function r(t, e) {
                                if (!(this instanceof r)) return new r(t, e);
                                this._bsontype = "Long", this.low_ = 0 | t, this.high_ = 0 | e
                            }
                            r.prototype.toInt = function() {
                                return this.low_
                            }, r.prototype.toNumber = function() {
                                return this.high_ * r.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
                            }, r.prototype.toJSON = function() {
                                return this.toString()
                            }, r.prototype.toString = function(t) {
                                var e = t || 10;
                                if (e < 2 || 36 < e) throw Error("radix out of range: " + e);
                                if (this.isZero()) return "0";
                                if (this.isNegative()) {
                                    if (this.equals(r.MIN_VALUE)) {
                                        var n = r.fromNumber(e),
                                            i = this.div(n),
                                            o = i.multiply(n).subtract(this);
                                        return i.toString(e) + o.toInt().toString(e)
                                    }
                                    return "-" + this.negate().toString(e)
                                }
                                var u = r.fromNumber(Math.pow(e, 6));
                                o = this;
                                for (var s = ""; !o.isZero();) {
                                    var a = o.div(u),
                                        f = o.subtract(a.multiply(u)).toInt(),
                                        c = f.toString(e);
                                    if (o = a, o.isZero()) return c + s;
                                    for (; c.length < 6;) c = "0" + c;
                                    s = "" + c + s
                                }
                            }, r.prototype.getHighBits = function() {
                                return this.high_
                            }, r.prototype.getLowBits = function() {
                                return this.low_
                            }, r.prototype.getLowBitsUnsigned = function() {
                                return this.low_ >= 0 ? this.low_ : r.TWO_PWR_32_DBL_ + this.low_
                            }, r.prototype.getNumBitsAbs = function() {
                                if (this.isNegative()) return this.equals(r.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
                                for (var t = 0 !== this.high_ ? this.high_ : this.low_, e = 31; e > 0 && 0 == (t & 1 << e); e--);
                                return 0 !== this.high_ ? e + 33 : e + 1
                            }, r.prototype.isZero = function() {
                                return 0 === this.high_ && 0 === this.low_
                            }, r.prototype.isNegative = function() {
                                return this.high_ < 0
                            }, r.prototype.isOdd = function() {
                                return 1 == (1 & this.low_)
                            }, r.prototype.equals = function(t) {
                                return this.high_ === t.high_ && this.low_ === t.low_
                            }, r.prototype.notEquals = function(t) {
                                return this.high_ !== t.high_ || this.low_ !== t.low_
                            }, r.prototype.lessThan = function(t) {
                                return this.compare(t) < 0
                            }, r.prototype.lessThanOrEqual = function(t) {
                                return this.compare(t) <= 0
                            }, r.prototype.greaterThan = function(t) {
                                return this.compare(t) > 0
                            }, r.prototype.greaterThanOrEqual = function(t) {
                                return this.compare(t) >= 0
                            }, r.prototype.compare = function(t) {
                                if (this.equals(t)) return 0;
                                var e = this.isNegative(),
                                    n = t.isNegative();
                                return e && !n ? -1 : !e && n ? 1 : this.subtract(t).isNegative() ? -1 : 1
                            }, r.prototype.negate = function() {
                                return this.equals(r.MIN_VALUE) ? r.MIN_VALUE : this.not().add(r.ONE)
                            }, r.prototype.add = function(t) {
                                var e = this.high_ >>> 16,
                                    n = 65535 & this.high_,
                                    i = this.low_ >>> 16,
                                    o = 65535 & this.low_,
                                    u = t.high_ >>> 16,
                                    s = 65535 & t.high_,
                                    a = t.low_ >>> 16,
                                    f = 65535 & t.low_,
                                    c = 0,
                                    h = 0,
                                    l = 0,
                                    p = 0;
                                return p += o + f, l += p >>> 16, p &= 65535, l += i + a, h += l >>> 16, l &= 65535, h += n + s, c += h >>> 16, h &= 65535, c += e + u, c &= 65535, r.fromBits(l << 16 | p, c << 16 | h)
                            }, r.prototype.subtract = function(t) {
                                return this.add(t.negate())
                            }, r.prototype.multiply = function(t) {
                                if (this.isZero()) return r.ZERO;
                                if (t.isZero()) return r.ZERO;
                                if (this.equals(r.MIN_VALUE)) return t.isOdd() ? r.MIN_VALUE : r.ZERO;
                                if (t.equals(r.MIN_VALUE)) return this.isOdd() ? r.MIN_VALUE : r.ZERO;
                                if (this.isNegative()) return t.isNegative() ? this.negate().multiply(t.negate()) : this.negate().multiply(t).negate();
                                if (t.isNegative()) return this.multiply(t.negate()).negate();
                                if (this.lessThan(r.TWO_PWR_24_) && t.lessThan(r.TWO_PWR_24_)) return r.fromNumber(this.toNumber() * t.toNumber());
                                var e = this.high_ >>> 16,
                                    n = 65535 & this.high_,
                                    i = this.low_ >>> 16,
                                    o = 65535 & this.low_,
                                    u = t.high_ >>> 16,
                                    s = 65535 & t.high_,
                                    a = t.low_ >>> 16,
                                    f = 65535 & t.low_,
                                    c = 0,
                                    h = 0,
                                    l = 0,
                                    p = 0;
                                return p += o * f, l += p >>> 16, p &= 65535, l += i * f, h += l >>> 16, l &= 65535, l += o * a, h += l >>> 16, l &= 65535, h += n * f, c += h >>> 16, h &= 65535, h += i * a, c += h >>> 16, h &= 65535, h += o * s, c += h >>> 16, h &= 65535, c += e * f + n * a + i * s + o * u, c &= 65535, r.fromBits(l << 16 | p, c << 16 | h)
                            }, r.prototype.div = function(t) {
                                if (t.isZero()) throw Error("division by zero");
                                if (this.isZero()) return r.ZERO;
                                if (this.equals(r.MIN_VALUE)) {
                                    if (t.equals(r.ONE) || t.equals(r.NEG_ONE)) return r.MIN_VALUE;
                                    if (t.equals(r.MIN_VALUE)) return r.ONE;
                                    var e = this.shiftRight(1),
                                        n = e.div(t).shiftLeft(1);
                                    if (n.equals(r.ZERO)) return t.isNegative() ? r.ONE : r.NEG_ONE;
                                    var i = this.subtract(t.multiply(n));
                                    return n.add(i.div(t))
                                }
                                if (t.equals(r.MIN_VALUE)) return r.ZERO;
                                if (this.isNegative()) return t.isNegative() ? this.negate().div(t.negate()) : this.negate().div(t).negate();
                                if (t.isNegative()) return this.div(t.negate()).negate();
                                var o = r.ZERO;
                                for (i = this; i.greaterThanOrEqual(t);) {
                                    n = Math.max(1, Math.floor(i.toNumber() / t.toNumber()));
                                    for (var u = Math.ceil(Math.log(n) / Math.LN2), s = u <= 48 ? 1 : Math.pow(2, u - 48), a = r.fromNumber(n), f = a.multiply(t); f.isNegative() || f.greaterThan(i);) n -= s, a = r.fromNumber(n), f = a.multiply(t);
                                    a.isZero() && (a = r.ONE), o = o.add(a), i = i.subtract(f)
                                }
                                return o
                            }, r.prototype.modulo = function(t) {
                                return this.subtract(this.div(t).multiply(t))
                            }, r.prototype.not = function() {
                                return r.fromBits(~this.low_, ~this.high_)
                            }, r.prototype.and = function(t) {
                                return r.fromBits(this.low_ & t.low_, this.high_ & t.high_)
                            }, r.prototype.or = function(t) {
                                return r.fromBits(this.low_ | t.low_, this.high_ | t.high_)
                            }, r.prototype.xor = function(t) {
                                return r.fromBits(this.low_ ^ t.low_, this.high_ ^ t.high_)
                            }, r.prototype.shiftLeft = function(t) {
                                if (0 === (t &= 63)) return this;
                                var e = this.low_;
                                if (t < 32) {
                                    var n = this.high_;
                                    return r.fromBits(e << t, n << t | e >>> 32 - t)
                                }
                                return r.fromBits(0, e << t - 32)
                            }, r.prototype.shiftRight = function(t) {
                                if (0 === (t &= 63)) return this;
                                var e = this.high_;
                                if (t < 32) {
                                    var n = this.low_;
                                    return r.fromBits(n >>> t | e << 32 - t, e >> t)
                                }
                                return r.fromBits(e >> t - 32, e >= 0 ? 0 : -1)
                            }, r.prototype.shiftRightUnsigned = function(t) {
                                if (0 === (t &= 63)) return this;
                                var e = this.high_;
                                if (t < 32) {
                                    var n = this.low_;
                                    return r.fromBits(n >>> t | e << 32 - t, e >>> t)
                                }
                                return 32 === t ? r.fromBits(e, 0) : r.fromBits(e >>> t - 32, 0)
                            }, r.fromInt = function(t) {
                                if (-128 <= t && t < 128) {
                                    var e = r.INT_CACHE_[t];
                                    if (e) return e
                                }
                                var n = new r(0 | t, t < 0 ? -1 : 0);
                                return -128 <= t && t < 128 && (r.INT_CACHE_[t] = n), n
                            }, r.fromNumber = function(t) {
                                return isNaN(t) || !isFinite(t) ? r.ZERO : t <= -r.TWO_PWR_63_DBL_ ? r.MIN_VALUE : t + 1 >= r.TWO_PWR_63_DBL_ ? r.MAX_VALUE : t < 0 ? r.fromNumber(-t).negate() : new r(t % r.TWO_PWR_32_DBL_ | 0, t / r.TWO_PWR_32_DBL_ | 0)
                            }, r.fromBits = function(t, e) {
                                return new r(t, e)
                            }, r.fromString = function(t, e) {
                                if (0 === t.length) throw Error("number format error: empty string");
                                var n = e || 10;
                                if (n < 2 || 36 < n) throw Error("radix out of range: " + n);
                                if ("-" === t.charAt(0)) return r.fromString(t.substring(1), n).negate();
                                if (t.indexOf("-") >= 0) throw Error('number format error: interior "-" character: ' + t);
                                for (var i = r.fromNumber(Math.pow(n, 8)), o = r.ZERO, u = 0; u < t.length; u += 8) {
                                    var s = Math.min(8, t.length - u),
                                        a = parseInt(t.substring(u, u + s), n);
                                    if (s < 8) {
                                        var f = r.fromNumber(Math.pow(n, s));
                                        o = o.multiply(f).add(r.fromNumber(a))
                                    } else o = o.multiply(i), o = o.add(r.fromNumber(a))
                                }
                                return o
                            }, r.INT_CACHE_ = {}, r.TWO_PWR_16_DBL_ = 65536, r.TWO_PWR_24_DBL_ = 1 << 24, r.TWO_PWR_32_DBL_ = r.TWO_PWR_16_DBL_ * r.TWO_PWR_16_DBL_, r.TWO_PWR_31_DBL_ = r.TWO_PWR_32_DBL_ / 2, r.TWO_PWR_48_DBL_ = r.TWO_PWR_32_DBL_ * r.TWO_PWR_16_DBL_, r.TWO_PWR_64_DBL_ = r.TWO_PWR_32_DBL_ * r.TWO_PWR_32_DBL_, r.TWO_PWR_63_DBL_ = r.TWO_PWR_64_DBL_ / 2, r.ZERO = r.fromInt(0), r.ONE = r.fromInt(1), r.NEG_ONE = r.fromInt(-1), r.MAX_VALUE = r.fromBits(-1, 2147483647), r.MIN_VALUE = r.fromBits(0, -2147483648), r.TWO_PWR_24_ = r.fromInt(1 << 24), t.exports = r, t.exports.Long = r
                        },
                        function(t, e, n) {
                            var r = n(7).f,
                                i = n(11),
                                o = n(5)("toStringTag");
                            t.exports = function(t, e, n) {
                                t && !i(t = n ? t : t.prototype, o) && r(t, o, {
                                    configurable: !0,
                                    value: e
                                })
                            }
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(23),
                                o = n(3),
                                u = n(82),
                                s = "[" + u + "]",
                                a = "â€‹Â…",
                                f = RegExp("^" + s + s + "*"),
                                c = RegExp(s + s + "*$"),
                                h = function(t, e, n) {
                                    var i = {}, s = o(function() {
                                            return !!u[t]() || a[t]() != a
                                        }),
                                        f = i[t] = s ? e(l) : u[t];
                                    n && (i[n] = f), r(r.P + r.F * s, "String", i)
                                }, l = h.trim = function(t, e) {
                                    return t = String(i(t)), 1 & e && (t = t.replace(f, "")), 2 & e && (t = t.replace(c, "")), t
                                };
                            t.exports = h
                        },
                        function(t, e) {
                            t.exports = {}
                        },
                        function(t, e, n) {
                            var r = n(4);
                            t.exports = function(t, e) {
                                if (!r(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");
                                return t
                            }
                        },
                        function(t, e) {
                            var n;
                            n = function() {
                                return this
                            }();
                            try {
                                n = n || Function("return this")() || (0, eval)("this")
                            } catch (t) {
                                "object" === ("undefined" == typeof window ? "undefined" : _typeof2(window)) && (n = window)
                            }
                            t.exports = n
                        },
                        function(t, e, n) {
                            var r = n(19);
                            t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
                                return "String" == r(t) ? t.split("") : Object(t)
                            }
                        },
                        function(t, e) {
                            e.f = {}.propertyIsEnumerable
                        },
                        function(t, e, n) {
                            var r = n(19),
                                i = n(5)("toStringTag"),
                                o = "Arguments" == r(function() {
                                    return arguments
                                }()),
                                u = function(t, e) {
                                    try {
                                        return t[e]
                                    } catch (t) {}
                                };
                            t.exports = function(t) {
                                var e, n, s;
                                return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(n = u(e = Object(t), i)) ? n : o ? r(e) : "Object" == (s = r(e)) && "function" == typeof e.callee ? "Arguments" : s
                            }
                        },
                        function(t, e, n) {
                            function r() {
                                if (!(this instanceof r)) return new r;
                                this._bsontype = "MinKey"
                            }
                            t.exports = r, t.exports.MinKey = r
                        },
                        function(t, e, n) {
                            (function(e) {
                                function r(t, e) {
                                    if (!(this instanceof r)) return new r(t, e);
                                    if (this._bsontype = "Binary", t instanceof Number ? (this.sub_type = t, this.position = 0) : (this.sub_type = null == e ? o : e, this.position = 0), null == t || t instanceof Number) void 0 !== i ? this.buffer = new i(r.BUFFER_SIZE) : "undefined" != typeof Uint8Array ? this.buffer = new Uint8Array(new ArrayBuffer(r.BUFFER_SIZE)) : this.buffer = new Array(r.BUFFER_SIZE), this.position = 0;
                                    else {
                                        if ("string" == typeof t)
                                            if (void 0 !== i) this.buffer = new i(t);
                                            else {
                                                if ("undefined" == typeof Uint8Array && "[object Array]" !== Object.prototype.toString.call(t)) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                                                this.buffer = u(t)
                                            } else this.buffer = t;
                                        this.position = t.length
                                    }
                                }
                                if (void 0 !== e) var i = n(42).Buffer;
                                r.prototype.put = function(t) {
                                    if (null != t.length && "number" != typeof t && 1 !== t.length) throw new TypeError("only accepts single character String, Uint8Array or Array");
                                    if ("number" != typeof t && t < 0 || t > 255) throw new TypeError("only accepts number in a valid unsigned byte range 0-255");
                                    var e = null;
                                    if (e = "string" == typeof t ? t.charCodeAt(0) : null != t.length ? t[0] : t, this.buffer.length > this.position) this.buffer[this.position++] = e;
                                    else if (void 0 !== i && i.isBuffer(this.buffer)) {
                                        var n = new i(r.BUFFER_SIZE + this.buffer.length);
                                        this.buffer.copy(n, 0, 0, this.buffer.length), this.buffer = n, this.buffer[this.position++] = e
                                    } else {
                                        n = null, n = "[object Uint8Array]" === Object.prototype.toString.call(this.buffer) ? new Uint8Array(new ArrayBuffer(r.BUFFER_SIZE + this.buffer.length)) : new Array(r.BUFFER_SIZE + this.buffer.length);
                                        for (var o = 0; o < this.buffer.length; o++) n[o] = this.buffer[o];
                                        this.buffer = n, this.buffer[this.position++] = e
                                    }
                                }, r.prototype.write = function(t, e) {
                                    if (e = "number" == typeof e ? e : this.position, this.buffer.length < e + t.length) {
                                        var n = null;
                                        if (void 0 !== i && i.isBuffer(this.buffer)) n = new i(this.buffer.length + t.length), this.buffer.copy(n, 0, 0, this.buffer.length);
                                        else if ("[object Uint8Array]" === Object.prototype.toString.call(this.buffer)) {
                                            n = new Uint8Array(new ArrayBuffer(this.buffer.length + t.length));
                                            for (var r = 0; r < this.position; r++) n[r] = this.buffer[r]
                                        }
                                        this.buffer = n
                                    }
                                    if (void 0 !== i && i.isBuffer(t) && i.isBuffer(this.buffer)) t.copy(this.buffer, e, 0, t.length), this.position = e + t.length > this.position ? e + t.length : this.position;
                                    else if (void 0 !== i && "string" == typeof t && i.isBuffer(this.buffer)) this.buffer.write(t, e, "binary"), this.position = e + t.length > this.position ? e + t.length : this.position;
                                    else if ("[object Uint8Array]" === Object.prototype.toString.call(t) || "[object Array]" === Object.prototype.toString.call(t) && "string" != typeof t) {
                                        for (r = 0; r < t.length; r++) this.buffer[e++] = t[r];
                                        this.position = e > this.position ? e : this.position
                                    } else if ("string" == typeof t) {
                                        for (r = 0; r < t.length; r++) this.buffer[e++] = t.charCodeAt(r);
                                        this.position = e > this.position ? e : this.position
                                    }
                                }, r.prototype.read = function(t, e) {
                                    if (e = e && e > 0 ? e : this.position, this.buffer.slice) return this.buffer.slice(t, t + e);
                                    for (var n = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(e)) : new Array(e), r = 0; r < e; r++) n[r] = this.buffer[t++];
                                    return n
                                }, r.prototype.value = function(t) {
                                    if ((t = null != t && t) && void 0 !== i && i.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;
                                    if (void 0 !== i && i.isBuffer(this.buffer)) return t ? this.buffer.slice(0, this.position) : this.buffer.toString("binary", 0, this.position);
                                    if (t) {
                                        if (null != this.buffer.slice) return this.buffer.slice(0, this.position);
                                        for (var e = "[object Uint8Array]" === Object.prototype.toString.call(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position), n = 0; n < this.position; n++) e[n] = this.buffer[n];
                                        return e
                                    }
                                    return s(this.buffer, 0, this.position)
                                }, r.prototype.length = function() {
                                    return this.position
                                }, r.prototype.toJSON = function() {
                                    return null != this.buffer ? this.buffer.toString("base64") : ""
                                }, r.prototype.toString = function(t) {
                                    return null != this.buffer ? this.buffer.slice(0, this.position).toString(t) : ""
                                };
                                var o = 0,
                                    u = function(t) {
                                        for (var e = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(t.length)) : new Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
                                        return e
                                    }, s = function(t, e, n) {
                                        for (var r = "", i = e; i < n; i++) r += String.fromCharCode(t[i]);
                                        return r
                                    };
                                r.BUFFER_SIZE = 256, r.SUBTYPE_DEFAULT = 0, r.SUBTYPE_FUNCTION = 1, r.SUBTYPE_BYTE_ARRAY = 2, r.SUBTYPE_UUID_OLD = 3, r.SUBTYPE_UUID = 4, r.SUBTYPE_MD5 = 5, r.SUBTYPE_USER_DEFINED = 128, t.exports = r, t.exports.Binary = r
                            }).call(e, n(48))
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
                            t.exports = function(t) {
                                return i[t] || (i[t] = {})
                            }
                        },
                        function(t, e, n) {
                            var r = n(15),
                                i = n(8),
                                o = n(35);
                            t.exports = function(t) {
                                return function(e, n, u) {
                                    var s, a = r(e),
                                        f = i(a.length),
                                        c = o(u, f);
                                    if (t && n != n) {
                                        for (; f > c;)
                                            if ((s = a[c++]) != s) return !0
                                    } else
                                        for (; f > c; c++)
                                            if ((t || c in a) && a[c] === n) return t || c || 0; return !t && -1
                                }
                            }
                        },
                        function(t, e) {
                            e.f = Object.getOwnPropertySymbols
                        },
                        function(t, e, n) {
                            var r = n(19);
                            t.exports = Array.isArray || function(t) {
                                return "Array" == r(t)
                            }
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(19),
                                o = n(5)("match");
                            t.exports = function(t) {
                                var e;
                                return r(t) && (void 0 !== (e = t[o]) ? !! e : "RegExp" == i(t))
                            }
                        },
                        function(t, e, n) {
                            var r = n(5)("iterator"),
                                i = !1;
                            try {
                                var o = [7][r]();
                                o.
                                return = function() {
                                    i = !0
                                }, Array.from(o, function() {
                                    throw 2
                                })
                            } catch (t) {}
                            t.exports = function(t, e) {
                                if (!e && !i) return !1;
                                var n = !1;
                                try {
                                    var o = [7],
                                        u = o[r]();
                                    u.next = function() {
                                        return {
                                            done: n = !0
                                        }
                                    }, o[r] = function() {
                                        return u
                                    }, t(o)
                                } catch (t) {}
                                return n
                            }
                        },
                        function(t, e, n) {
                            var r = n(1);
                            t.exports = function() {
                                var t = r(this),
                                    e = "";
                                return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e
                            }
                        },
                        function(t, e, n) {
                            var r = n(12),
                                i = n(13),
                                o = n(3),
                                u = n(23),
                                s = n(5);
                            t.exports = function(t, e, n) {
                                var a = s(t),
                                    f = n(u, a, "" [t]),
                                    c = f[0],
                                    h = f[1];
                                o(function() {
                                    var e = {};
                                    return e[a] = function() {
                                        return 7
                                    }, 7 != "" [t](e)
                                }) && (i(String.prototype, t, c), r(RegExp.prototype, a, 2 == e ? function(t, e) {
                                    return h.call(t, this, e)
                                } : function(t) {
                                    return h.call(t, this)
                                }))
                            }
                        },
                        function(t, e, n) {
                            var r = n(1),
                                i = n(10),
                                o = n(5)("species");
                            t.exports = function(t, e) {
                                var n, u = r(t).constructor;
                                return void 0 === u || void 0 == (n = r(u)[o]) ? e : i(n)
                            }
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(0),
                                o = n(13),
                                u = n(41),
                                s = n(29),
                                a = n(40),
                                f = n(39),
                                c = n(4),
                                h = n(3),
                                l = n(59),
                                p = n(44),
                                d = n(83);
                            t.exports = function(t, e, n, v, y, g) {
                                var _ = r[t],
                                    b = _,
                                    w = y ? "set" : "add",
                                    m = b && b.prototype,
                                    S = {}, E = function(t) {
                                        var e = m[t];
                                        o(m, t, "delete" == t ? function(t) {
                                            return !(g && !c(t)) && e.call(this, 0 === t ? 0 : t)
                                        } : "has" == t ? function(t) {
                                            return !(g && !c(t)) && e.call(this, 0 === t ? 0 : t)
                                        } : "get" == t ? function(t) {
                                            return g && !c(t) ? void 0 : e.call(this, 0 === t ? 0 : t)
                                        } : "add" == t ? function(t) {
                                            return e.call(this, 0 === t ? 0 : t), this
                                        } : function(t, n) {
                                            return e.call(this, 0 === t ? 0 : t, n), this
                                        })
                                    };
                                if ("function" == typeof b && (g || m.forEach && !h(function() {
                                    (new b).entries().next()
                                }))) {
                                    var O = new b,
                                        A = O[w](g ? {} : -0, 1) != O,
                                        N = h(function() {
                                            O.has(1)
                                        }),
                                        T = l(function(t) {
                                            new b(t)
                                        }),
                                        B = !g && h(function() {
                                            for (var t = new b, e = 5; e--;) t[w](e, e);
                                            return !t.has(-0)
                                        });
                                    T || (b = e(function(e, n) {
                                        f(e, b, t);
                                        var r = d(new _, e, b);
                                        return void 0 != n && a(n, y, r[w], r), r
                                    }), b.prototype = m, m.constructor = b), (N || B) && (E("delete"), E("has"), y && E("get")), (B || A) && E(w), g && m.clear && delete m.clear
                                } else b = v.getConstructor(e, t, y, w), u(b.prototype, n), s.NEED = !0;
                                return p(b, t), S[t] = b, i(i.G + i.W + i.F * (b != _), S), g || v.setStrong(b, t, y), b
                            }
                        },
                        function(t, e, n) {
                            for (var r, i = n(2), o = n(12), u = n(32), s = u("typed_array"), a = u("view"), f = !(!i.ArrayBuffer || !i.DataView), c = f, h = 0, l = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); h < 9;)(r = i[l[h++]]) ? (o(r.prototype, s, !0), o(r.prototype, a, !0)) : c = !1;
                            t.exports = {
                                ABV: f,
                                CONSTR: c,
                                TYPED: s,
                                VIEW: a
                            }
                        },
                        function(t, e, n) {
                            t.exports = n(33) || !n(3)(function() {
                                var t = Math.random();
                                __defineSetter__.call(null, t, function() {}), delete n(2)[t]
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            t.exports = function(t) {
                                r(r.S, t, {
                                    of: function() {
                                        for (var t = arguments.length, e = Array(t); t--;) e[t] = arguments[t];
                                        return new this(e)
                                    }
                                })
                            }
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(10),
                                o = n(18),
                                u = n(40);
                            t.exports = function(t) {
                                r(r.S, t, {
                                    from: function(t) {
                                        var e, n, r, s, a = arguments[1];
                                        return i(this), e = void 0 !== a, e && i(a), void 0 == t ? new this : (n = [], e ? (r = 0, s = o(a, arguments[2], 2), u(t, !1, function(t) {
                                            n.push(s(t, r++))
                                        })) : u(t, !1, n.push, n), new this(n))
                                    }
                                })
                            }
                        },
                        function(t, e, n) {
                            function r(t) {
                                if (!(this instanceof r)) return new r(t);
                                this._bsontype = "Double", this.value = t
                            }
                            r.prototype.valueOf = function() {
                                return this.value
                            }, r.prototype.toJSON = function() {
                                return this.value
                            }, t.exports = r, t.exports.Double = r
                        },
                        function(t, e, n) {
                            function r(t, e) {
                                t instanceof i ? i.call(this, t.low_, t.high_) : i.call(this, t, e), this._bsontype = "Timestamp"
                            }
                            var i = n(43);
                            r.prototype = Object.create(i.prototype), r.prototype.constructor = r, r.prototype.toJSON = function() {
                                return {
                                    $timestamp: this.toString()
                                }
                            }, r.fromInt = function(t) {
                                return new r(i.fromInt(t))
                            }, r.fromNumber = function(t) {
                                return new r(i.fromNumber(t))
                            }, r.fromBits = function(t, e) {
                                return new r(t, e)
                            }, r.fromString = function(t, e) {
                                return new r(i.fromString(t, e))
                            }, t.exports = r, t.exports.Timestamp = r
                        },
                        function(t, e, n) {
                            (function(e, n) {
                                function r(t) {
                                    if (t instanceof r) return t;
                                    if (!(this instanceof r)) return new r(t);
                                    if (this._bsontype = "ObjectID", null == t || "number" == typeof t) return this.id = this.generate(t), void(r.cacheHexString && (this.__id = this.toString("hex")));
                                    var n = r.isValid(t);
                                    if (!n && null != t) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
                                    if (n && "string" == typeof t && 24 === t.length && u) return new r(new e(t, "hex"));
                                    if (n && "string" == typeof t && 24 === t.length) return r.createFromHexString(t);
                                    if (null == t || 12 !== t.length) {
                                        if (null != t && t.toHexString) return t;
                                        throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
                                    }
                                    this.id = t, r.cacheHexString && (this.__id = this.toString("hex"))
                                }
                                var i = parseInt(16777215 * Math.random(), 10),
                                    o = new RegExp("^[0-9a-fA-F]{24}$"),
                                    u = !1;
                                try {
                                    e && e.from && (u = !0)
                                } catch (t) {
                                    u = !1
                                }
                                for (var s = [], a = 0; a < 256; a++) s[a] = (a <= 15 ? "0" : "") + a.toString(16);
                                r.prototype.toHexString = function() {
                                    if (r.cacheHexString && this.__id) return this.__id;
                                    var t = "";
                                    if (!this.id || !this.id.length) throw new TypeError("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [" + JSON.stringify(this.id) + "]");
                                    if (this.id instanceof c) return t = h(this.id), r.cacheHexString && (this.__id = t), t;
                                    for (var e = 0; e < this.id.length; e++) t += s[this.id.charCodeAt(e)];
                                    return r.cacheHexString && (this.__id = t), t
                                }, r.prototype.get_inc = function() {
                                    return r.index = (r.index + 1) % 16777215
                                }, r.prototype.getInc = function() {
                                    return this.get_inc()
                                }, r.prototype.generate = function(t) {
                                    "number" != typeof t && (t = ~~ (Date.now() / 1e3));
                                    var r = (void 0 === n || 1 === n.pid ? Math.floor(1e5 * Math.random()) : n.pid) % 65535,
                                        o = this.get_inc(),
                                        u = new e(12);
                                    return u[3] = 255 & t, u[2] = t >> 8 & 255, u[1] = t >> 16 & 255, u[0] = t >> 24 & 255, u[6] = 255 & i, u[5] = i >> 8 & 255, u[4] = i >> 16 & 255, u[8] = 255 & r, u[7] = r >> 8 & 255, u[11] = 255 & o, u[10] = o >> 8 & 255, u[9] = o >> 16 & 255, u
                                }, r.prototype.toString = function(t) {
                                    return this.id && this.id.copy ? this.id.toString("string" == typeof t ? t : "hex") : this.toHexString()
                                }, r.prototype.inspect = r.prototype.toString, r.prototype.toJSON = function() {
                                    return this.toHexString()
                                }, r.prototype.equals = function(t) {
                                    return t instanceof r ? this.toString() === t.toString() : "string" == typeof t && r.isValid(t) && 12 === t.length && this.id instanceof c ? t === this.id.toString("binary") : "string" == typeof t && r.isValid(t) && 24 === t.length ? t.toLowerCase() === this.toHexString() : "string" == typeof t && r.isValid(t) && 12 === t.length ? t === this.id : !(null == t || !(t instanceof r || t.toHexString)) && t.toHexString() === this.toHexString()
                                }, r.prototype.getTimestamp = function() {
                                    var t = new Date,
                                        e = this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
                                    return t.setTime(1e3 * Math.floor(e)), t
                                }, r.index = ~~ (16777215 * Math.random()), r.createPk = function() {
                                    return new r
                                }, r.createFromTime = function(t) {
                                    var n = new e([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                                    return n[3] = 255 & t, n[2] = t >> 8 & 255, n[1] = t >> 16 & 255, n[0] = t >> 24 & 255, new r(n)
                                };
                                var f = [];
                                for (a = 0; a < 10;) f[48 + a] = a++;
                                for (; a < 16;) f[55 + a] = f[87 + a] = a++;
                                var c = e,
                                    h = function(t) {
                                        return t.toString("hex")
                                    };
                                r.createFromHexString = function(t) {
                                    if (void 0 === t || null != t && 24 !== t.length) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
                                    if (u) return new r(new e(t, "hex"));
                                    for (var n = new c(12), i = 0, o = 0; o < 24;) n[i++] = f[t.charCodeAt(o++)] << 4 | f[t.charCodeAt(o++)];
                                    return new r(n)
                                }, r.isValid = function(t) {
                                    return null != t && ("number" == typeof t || ("string" == typeof t ? 12 === t.length || 24 === t.length && o.test(t) : t instanceof r || (t instanceof c || !! t.toHexString && (12 === t.id.length || 24 === t.id.length && o.test(t.id)))))
                                }, Object.defineProperty(r.prototype, "generationTime", {
                                    enumerable: !0,
                                    get: function() {
                                        return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24
                                    },
                                    set: function(t) {
                                        this.id[3] = 255 & t, this.id[2] = t >> 8 & 255, this.id[1] = t >> 16 & 255, this.id[0] = t >> 24 & 255
                                    }
                                }), t.exports = r, t.exports.ObjectID = r, t.exports.ObjectId = r
                            }).call(e, n(42).Buffer, n(347))
                        },
                        function(t, e, n) {
                            function r(t) {
                                return t.split("").sort().join("")
                            }

                            function i(t, e) {
                                if (!(this instanceof i)) return new i(t, e);
                                this._bsontype = "BSONRegExp", this.pattern = t || "", this.options = e ? r(e) : "";
                                for (var n = 0; n < this.options.length; n++)
                                    if ("i" !== this.options[n] && "m" !== this.options[n] && "x" !== this.options[n] && "l" !== this.options[n] && "s" !== this.options[n] && "u" !== this.options[n]) throw new Error("the regular expression options [" + this.options[n] + "] is not supported")
                            }
                            t.exports = i, t.exports.BSONRegExp = i
                        },
                        function(t, e, n) {
                            function r(t, e) {
                                if (!(this instanceof r)) return new r(t, e);
                                this._bsontype = "Code", this.code = t, this.scope = e
                            }
                            r.prototype.toJSON = function() {
                                return {
                                    scope: this.scope,
                                    code: this.code
                                }
                            }, t.exports = r, t.exports.Code = r
                        },
                        function(t, e, n) {
                            (function(e) {
                                function r(t) {
                                    this._bsontype = "Decimal128", this.bytes = t
                                }
                                var i = n(43),
                                    o = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/,
                                    u = /^(\+|-)?(Infinity|inf)$/i,
                                    s = /^(\+|-)?NaN$/i,
                                    a = 6176,
                                    f = [124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
                                    c = [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
                                    h = [120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
                                    l = /^([-+])?(\d+)?$/,
                                    p = function(t) {
                                        return !isNaN(parseInt(t, 10))
                                    }, d = function(t) {
                                        var e = i.fromNumber(1e9),
                                            n = i.fromNumber(0);
                                        if (!(t.parts[0] || t.parts[1] || t.parts[2] || t.parts[3])) return {
                                            quotient: t,
                                            rem: n
                                        };
                                        for (var r = 0; r <= 3; r++) n = n.shiftLeft(32), n = n.add(new i(t.parts[r], 0)), t.parts[r] = n.div(e).low_, n = n.modulo(e);
                                        return {
                                            quotient: t,
                                            rem: n
                                        }
                                    }, v = function(t, e) {
                                        if (!t && !e) return {
                                            high: i.fromNumber(0),
                                            low: i.fromNumber(0)
                                        };
                                        var n = t.shiftRightUnsigned(32),
                                            r = new i(t.getLowBits(), 0),
                                            o = e.shiftRightUnsigned(32),
                                            u = new i(e.getLowBits(), 0),
                                            s = n.multiply(o),
                                            a = n.multiply(u),
                                            f = r.multiply(o),
                                            c = r.multiply(u);
                                        return s = s.add(a.shiftRightUnsigned(32)), a = new i(a.getLowBits(), 0).add(f).add(c.shiftRightUnsigned(32)), s = s.add(a.shiftRightUnsigned(32)), c = a.shiftLeft(32).add(new i(c.getLowBits(), 0)), {
                                            high: s,
                                            low: c
                                        }
                                    }, y = function(t, e) {
                                        var n = t.high_ >>> 0,
                                            r = e.high_ >>> 0;
                                        if (n < r) return !0;
                                        if (n === r) {
                                            if (t.low_ >>> 0 < e.low_ >>> 0) return !0
                                        }
                                        return !1
                                    }, g = function(t, e) {
                                        throw new TypeError('"${string}" not a valid Decimal128 string - ' + e)
                                    };
                                r.fromString = function(t) {
                                    var n = !1,
                                        d = !1,
                                        _ = !1,
                                        b = 0,
                                        w = 0,
                                        m = 0,
                                        S = 0,
                                        E = 0,
                                        O = [0],
                                        A = 0,
                                        N = 0,
                                        T = 0,
                                        B = 0,
                                        I = 0,
                                        R = 0,
                                        P = [0, 0],
                                        x = [0, 0],
                                        D = 0,
                                        M = 0;
                                    if (t.length >= 7e3) throw new TypeError(t + " not a valid Decimal128 string");
                                    var k = t.match(o),
                                        U = t.match(u),
                                        j = t.match(s);
                                    if (!k && !U && !j || 0 === t.length) throw new TypeError(t + " not a valid Decimal128 string");
                                    if (k) {
                                        var L = k[2],
                                            C = k[4],
                                            F = k[5],
                                            Y = k[6];
                                        C && void 0 === Y && g(0, "missing exponent power"), C && void 0 === L && g(0, "missing exponent base"), void 0 === C && (F || Y) && g(0, "missing e before exponent")
                                    }
                                    if ("+" !== t[M] && "-" !== t[M] || (n = "-" === t[M++]), !p(t[M]) && "." !== t[M]) {
                                        if ("i" === t[M] || "I" === t[M]) return new r(new e(n ? c : h));
                                        if ("N" === t[M]) return new r(new e(f))
                                    }
                                    for (; p(t[M]) || "." === t[M];) "." !== t[M] ? (A < 34 && ("0" !== t[M] || _) && (_ || (E = w), _ = !0, O[N++] = parseInt(t[M], 10), A += 1), _ && (m += 1), d && (S += 1), w += 1, M += 1) : (d && g(0, "contains multiple periods"), d = !0, M += 1);
                                    if (d && !w) throw new TypeError(t + " not a valid Decimal128 string");
                                    if ("e" === t[M] || "E" === t[M]) {
                                        var W = t.substr(++M).match(l);
                                        if (!W || !W[2]) return new r(new e(f));
                                        I = parseInt(W[0], 10), M += W[0].length
                                    }
                                    if (t[M]) return new r(new e(f));
                                    if (T = 0, A) {
                                        if (B = A - 1, 1 !== (b = m))
                                            for (;
                                                "0" === t[E + b - 1];) b -= 1
                                    } else T = 0, B = 0, O[0] = 0, m = 1, A = 1, b = 0;
                                    for (I <= S && S - I > 16384 ? I = -6176 : I -= S; I > 6111;) {
                                        if ((B += 1) - T > 34) {
                                            var K = O.join("");
                                            if (K.match(/^0+$/)) {
                                                I = 6111;
                                                break
                                            }
                                            g(0, "overflow")
                                        }
                                        I -= 1
                                    }
                                    for (; I < -6176 || A < m;) {
                                        if (0 === B && b < A) {
                                            I = -6176, b = 0;
                                            break
                                        }
                                        if (A < m ? m -= 1 : B -= 1, I < 6111) I += 1;
                                        else {
                                            if (K = O.join(""), K.match(/^0+$/)) {
                                                I = 6111;
                                                break
                                            }
                                            g(0, "overflow")
                                        }
                                    }
                                    if (B - T + 1 < b) {
                                        var $ = w;
                                        d && (E += 1, $ += 1), n && (E += 1, $ += 1);
                                        var V = parseInt(t[E + B + 1], 10),
                                            J = 0;
                                        if (V >= 5 && (J = 1, 5 === V))
                                            for (J = O[B] % 2 == 1, R = E + B + 2; R < $; R++)
                                                if (parseInt(t[R], 10)) {
                                                    J = 1;
                                                    break
                                                }
                                        if (J)
                                            for (var G = B; G >= 0; G--)
                                                if (++O[G] > 9 && (O[G] = 0, 0 === G)) {
                                                    if (!(I < 6111)) return new r(new e(n ? c : h));
                                                    I += 1, O[G] = 1
                                                }
                                    }
                                    if (P = i.fromNumber(0), x = i.fromNumber(0), 0 === b) P = i.fromNumber(0), x = i.fromNumber(0);
                                    else if (B - T < 17)
                                        for (G = T, x = i.fromNumber(O[G++]), P = new i(0, 0); G <= B; G++) x = x.multiply(i.fromNumber(10)), x = x.add(i.fromNumber(O[G]));
                                    else {
                                        for (G = T, P = i.fromNumber(O[G++]); G <= B - 17; G++) P = P.multiply(i.fromNumber(10)), P = P.add(i.fromNumber(O[G]));
                                        for (x = i.fromNumber(O[G++]); G <= B; G++) x = x.multiply(i.fromNumber(10)), x = x.add(i.fromNumber(O[G]))
                                    }
                                    var z = v(P, i.fromString("100000000000000000"));
                                    z.low = z.low.add(x), y(z.low, x) && (z.high = z.high.add(i.fromNumber(1))), D = I + a;
                                    var q = {
                                        low: i.fromNumber(0),
                                        high: i.fromNumber(0)
                                    };
                                    z.high.shiftRightUnsigned(49).and(i.fromNumber(1)).equals(i.fromNumber) ? (q.high = q.high.or(i.fromNumber(3).shiftLeft(61)), q.high = q.high.or(i.fromNumber(D).and(i.fromNumber(16383).shiftLeft(47))), q.high = q.high.or(z.high.and(i.fromNumber(0x7fffffffffff)))) : (q.high = q.high.or(i.fromNumber(16383 & D).shiftLeft(49)), q.high = q.high.or(z.high.and(i.fromNumber(562949953421311)))), q.low = z.low, n && (q.high = q.high.or(i.fromString("9223372036854775808")));
                                    var H = new e(16);
                                    return M = 0, H[M++] = 255 & q.low.low_, H[M++] = q.low.low_ >> 8 & 255, H[M++] = q.low.low_ >> 16 & 255, H[M++] = q.low.low_ >> 24 & 255, H[M++] = 255 & q.low.high_, H[M++] = q.low.high_ >> 8 & 255, H[M++] = q.low.high_ >> 16 & 255, H[M++] = q.low.high_ >> 24 & 255, H[M++] = 255 & q.high.low_, H[M++] = q.high.low_ >> 8 & 255, H[M++] = q.high.low_ >> 16 & 255, H[M++] = q.high.low_ >> 24 & 255, H[M++] = 255 & q.high.high_, H[M++] = q.high.high_ >> 8 & 255, H[M++] = q.high.high_ >> 16 & 255, H[M++] = q.high.high_ >> 24 & 255, new r(H)
                                };
                                a = 6176, r.prototype.toString = function() {
                                    for (var t, e, n, r, o, u, s = 0, f = new Array(36), c = 0; c < f.length; c++) f[c] = 0;
                                    var h, l, p, v, y, g = 0,
                                        _ = !1,
                                        b = {
                                            parts: new Array(4)
                                        }, w = [];
                                    g = 0;
                                    var m = this.bytes;
                                    if (r = m[g++] | m[g++] << 8 | m[g++] << 16 | m[g++] << 24, n = m[g++] | m[g++] << 8 | m[g++] << 16 | m[g++] << 24, e = m[g++] | m[g++] << 8 | m[g++] << 16 | m[g++] << 24, t = m[g++] | m[g++] << 8 | m[g++] << 16 | m[g++] << 24, g = 0, {
                                        low: new i(r, n),
                                        high: new i(e, t)
                                    }.high.lessThan(i.ZERO) && w.push("-"), (o = t >> 26 & 31) >> 3 == 3) {
                                        if (30 === o) return w.join("") + "Infinity";
                                        if (31 === o) return "NaN";
                                        u = t >> 15 & 16383, p = 8 + (t >> 14 & 1)
                                    } else p = t >> 14 & 7, u = t >> 17 & 16383; if (h = u - a, b.parts[0] = (16383 & t) + ((15 & p) << 14), b.parts[1] = e, b.parts[2] = n, b.parts[3] = r, 0 === b.parts[0] && 0 === b.parts[1] && 0 === b.parts[2] && 0 === b.parts[3]) _ = !0;
                                    else
                                        for (y = 3; y >= 0; y--) {
                                            var S = 0,
                                                E = d(b);
                                            if (b = E.quotient, S = E.rem.low_)
                                                for (v = 8; v >= 0; v--) f[9 * y + v] = S % 10, S = Math.floor(S / 10)
                                        }
                                    if (_) s = 1, f[g] = 0;
                                    else
                                        for (s = 36, c = 0; !f[g];) c++, s -= 1, g += 1; if ((l = s - 1 + h) >= 34 || l <= -7 || h > 0) {
                                        if (s > 34) return w.push(0), h > 0 ? w.push("E+" + h) : h < 0 && w.push("E" + h), w.join("");
                                        for (w.push(f[g++]), s -= 1, s && w.push("."), c = 0; c < s; c++) w.push(f[g++]);
                                        w.push("E"), l > 0 ? w.push("+" + l) : w.push(l)
                                    } else if (h >= 0)
                                        for (c = 0; c < s; c++) w.push(f[g++]);
                                    else {
                                        var O = s + h;
                                        if (O > 0)
                                            for (c = 0; c < O; c++) w.push(f[g++]);
                                        else w.push("0");
                                        for (w.push("."); O++ < 0;) w.push("0");
                                        for (c = 0; c < s - Math.max(O - 1, 0); c++) w.push(f[g++])
                                    }
                                    return w.join("")
                                }, r.prototype.toJSON = function() {
                                    return {
                                        $numberDecimal: this.toString()
                                    }
                                }, t.exports = r, t.exports.Decimal128 = r
                            }).call(e, n(42).Buffer)
                        },
                        function(t, e, n) {
                            function r() {
                                if (!(this instanceof r)) return new r;
                                this._bsontype = "MaxKey"
                            }
                            t.exports = r, t.exports.MaxKey = r
                        },
                        function(t, e, n) {
                            function r(t, e, n, i) {
                                if (!(this instanceof r)) return new r(t, e, n, i);
                                var o = t.split(".");
                                2 === o.length && (n = o.shift(), t = o.shift()), this._bsontype = "DBRef", this.collection = t, this.oid = e, this.db = n, this.fields = i || {}
                            }
                            r.prototype.toJSON = function() {
                                var t = {
                                    $ref: this.collection,
                                    $id: this.oid
                                };
                                return null != this.db && (t.$db = this.db), t = Object.assign(t, this.fields)
                            }, t.exports = r, t.exports.DBRef = r
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(2).document,
                                o = r(i) && r(i.createElement);
                            t.exports = function(t) {
                                return o ? i.createElement(t) : {}
                            }
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(21),
                                o = n(33),
                                u = n(106),
                                s = n(7).f;
                            t.exports = function(t) {
                                var e = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
                                "_" == t.charAt(0) || t in e || s(e, t, {
                                    value: u.f(t)
                                })
                            }
                        },
                        function(t, e, n) {
                            var r = n(54)("keys"),
                                i = n(32);
                            t.exports = function(t) {
                                return r[t] || (r[t] = i(t))
                            }
                        },
                        function(t, e) {
                            t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
                        },
                        function(t, e, n) {
                            var r = n(2).document;
                            t.exports = r && r.documentElement
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(1),
                                o = function(t, e) {
                                    if (i(t), !r(e) && null !== e) throw TypeError(e + ": can't set as prototype!")
                                };
                            t.exports = {
                                set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, e, r) {
                                    try {
                                        r = n(18)(Function.call, n(16).f(Object.prototype, "__proto__").set, 2), r(t, []), e = !(t instanceof Array)
                                    } catch (t) {
                                        e = !0
                                    }
                                    return function(t, n) {
                                        return o(t, n), e ? t.__proto__ = n : r(t, n), t
                                    }
                                }({}, !1) : void 0),
                                check: o
                            }
                        },
                        function(t, e) {
                            t.exports = "\t\n\v\f\r Â áš€á Žâ€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff"
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(81).set;
                            t.exports = function(t, e, n) {
                                var o, u = e.constructor;
                                return u !== n && "function" == typeof u && (o = u.prototype) !== n.prototype && r(o) && i && i(t, o), t
                            }
                        },
                        function(t, e, n) {
                            var r = n(24),
                                i = n(23);
                            t.exports = function(t) {
                                var e = String(i(this)),
                                    n = "",
                                    o = r(t);
                                if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
                                for (; o > 0;
                                    (o >>>= 1) && (e += e)) 1 & o && (n += e);
                                return n
                            }
                        },
                        function(t, e) {
                            t.exports = Math.sign || function(t) {
                                return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1
                            }
                        },
                        function(t, e) {
                            var n = Math.expm1;
                            t.exports = !n || n(10) > 22025.465794806718 || n(10) < 22025.465794806718 || -2e-17 != n(-2e-17) ? function(t) {
                                return 0 == (t = +t) ? t : t > -1e-6 && t < 1e-6 ? t + t * t / 2 : Math.exp(t) - 1
                            } : n
                        },
                        function(t, e, n) {
                            var r = n(24),
                                i = n(23);
                            t.exports = function(t) {
                                return function(e, n) {
                                    var o, u, s = String(i(e)),
                                        a = r(n),
                                        f = s.length;
                                    return a < 0 || a >= f ? t ? "" : void 0 : (o = s.charCodeAt(a), o < 55296 || o > 56319 || a + 1 === f || (u = s.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? s.charAt(a) : o : t ? s.slice(a, a + 2) : u - 56320 + (o - 55296 << 10) + 65536)
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(33),
                                i = n(0),
                                o = n(13),
                                u = n(12),
                                s = n(11),
                                a = n(46),
                                f = n(89),
                                c = n(44),
                                h = n(17),
                                l = n(5)("iterator"),
                                p = !([].keys && "next" in [].keys()),
                                d = function() {
                                    return this
                                };
                            t.exports = function(t, e, n, v, y, g, _) {
                                f(n, e, v);
                                var b, w, m, S = function(t) {
                                        if (!p && t in N) return N[t];
                                        switch (t) {
                                            case "keys":
                                            case "values":
                                                return function() {
                                                    return new n(this, t)
                                                }
                                        }
                                        return function() {
                                            return new n(this, t)
                                        }
                                    }, E = e + " Iterator",
                                    O = "values" == y,
                                    A = !1,
                                    N = t.prototype,
                                    T = N[l] || N["@@iterator"] || y && N[y],
                                    B = T || S(y),
                                    I = y ? O ? S("entries") : B : void 0,
                                    R = "Array" == e ? N.entries || T : T;
                                if (R && (m = h(R.call(new t))) !== Object.prototype && m.next && (c(m, E, !0), r || s(m, l) || u(m, l, d)), O && T && "values" !== T.name && (A = !0, B = function() {
                                    return T.call(this)
                                }), r && !_ || !p && !A && N[l] || u(N, l, B), a[e] = B, a[E] = d, y)
                                    if (b = {
                                        values: O ? B : S("values"),
                                        keys: g ? B : S("keys"),
                                        entries: I
                                    }, _)
                                        for (w in b) w in N || o(N, w, b[w]);
                                    else i(i.P + i.F * (p || A), e, b);
                                return b
                            }
                        },
                        function(t, e, n) {
                            var r = n(36),
                                i = n(31),
                                o = n(44),
                                u = {};
                            n(12)(u, n(5)("iterator"), function() {
                                return this
                            }), t.exports = function(t, e, n) {
                                t.prototype = r(u, {
                                    next: i(1, n)
                                }), o(t, e + " Iterator")
                            }
                        },
                        function(t, e, n) {
                            var r = n(58),
                                i = n(23);
                            t.exports = function(t, e, n) {
                                if (r(e)) throw TypeError("String#" + n + " doesn't accept regex!");
                                return String(i(t))
                            }
                        },
                        function(t, e, n) {
                            var r = n(5)("match");
                            t.exports = function(t) {
                                var e = /./;
                                try {
                                    "/./" [t](e)
                                } catch (n) {
                                    try {
                                        return e[r] = !1, !"/./" [t](e)
                                    } catch (t) {}
                                }
                                return !0
                            }
                        },
                        function(t, e, n) {
                            var r = n(46),
                                i = n(5)("iterator"),
                                o = Array.prototype;
                            t.exports = function(t) {
                                return void 0 !== t && (r.Array === t || o[i] === t)
                            }
                        },
                        function(t, e, n) {
                            var r = n(7),
                                i = n(31);
                            t.exports = function(t, e, n) {
                                e in t ? r.f(t, e, i(0, n)) : t[e] = n
                            }
                        },
                        function(t, e, n) {
                            var r = n(51),
                                i = n(5)("iterator"),
                                o = n(46);
                            t.exports = n(21).getIteratorMethod = function(t) {
                                if (void 0 != t) return t[i] || t["@@iterator"] || o[r(t)]
                            }
                        },
                        function(t, e, n) {
                            var r = n(232);
                            t.exports = function(t, e) {
                                return new(r(t))(e)
                            }
                        },
                        function(t, e, n) {
                            var r = n(9),
                                i = n(35),
                                o = n(8);
                            t.exports = function(t) {
                                for (var e = r(this), n = o(e.length), u = arguments.length, s = i(u > 1 ? arguments[1] : void 0, n), a = u > 2 ? arguments[2] : void 0, f = void 0 === a ? n : i(a, n); f > s;) e[s++] = t;
                                return e
                            }
                        },
                        function(t, e, n) {
                            var r = n(30),
                                i = n(122),
                                o = n(46),
                                u = n(15);
                            t.exports = n(88)(Array, "Array", function(t, e) {
                                this._t = u(t), this._i = 0, this._k = e
                            }, function() {
                                var t = this._t,
                                    e = this._k,
                                    n = this._i++;
                                return !t || n >= t.length ? (this._t = void 0, i(1)) : "keys" == e ? i(0, n) : "values" == e ? i(0, t[n]) : i(0, [n, t[n]])
                            }, "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries")
                        },
                        function(t, e, n) {
                            var r, i, o, u = n(18),
                                s = n(112),
                                a = n(80),
                                f = n(76),
                                c = n(2),
                                h = c.process,
                                l = c.setImmediate,
                                p = c.clearImmediate,
                                d = c.MessageChannel,
                                v = c.Dispatch,
                                y = 0,
                                g = {}, _ = function() {
                                    var t = +this;
                                    if (g.hasOwnProperty(t)) {
                                        var e = g[t];
                                        delete g[t], e()
                                    }
                                }, b = function(t) {
                                    _.call(t.data)
                                };
                            l && p || (l = function(t) {
                                for (var e = [], n = 1; arguments.length > n;) e.push(arguments[n++]);
                                return g[++y] = function() {
                                    s("function" == typeof t ? t : Function(t), e)
                                }, r(y), y
                            }, p = function(t) {
                                delete g[t]
                            }, "process" == n(19)(h) ? r = function(t) {
                                h.nextTick(u(_, t, 1))
                            } : v && v.now ? r = function(t) {
                                v.now(u(_, t, 1))
                            } : d ? (i = new d, o = i.port2, i.port1.onmessage = b, r = u(o.postMessage, o, 1)) : c.addEventListener && "function" == typeof postMessage && !c.importScripts ? (r = function(t) {
                                c.postMessage(t + "", "*")
                            }, c.addEventListener("message", b, !1)) : r = "onreadystatechange" in f("script") ? function(t) {
                                a.appendChild(f("script")).onreadystatechange = function() {
                                    a.removeChild(this), _.call(t)
                                }
                            } : function(t) {
                                setTimeout(u(_, t, 1), 0)
                            }), t.exports = {
                                set: l,
                                clear: p
                            }
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(98).set,
                                o = r.MutationObserver || r.WebKitMutationObserver,
                                u = r.process,
                                s = r.Promise,
                                a = "process" == n(19)(u);
                            t.exports = function() {
                                var t, e, n, f = function() {
                                        var r, i;
                                        for (a && (r = u.domain) && r.exit(); t;) {
                                            i = t.fn, t = t.next;
                                            try {
                                                i()
                                            } catch (r) {
                                                throw t ? n() : e = void 0, r
                                            }
                                        }
                                        e = void 0, r && r.enter()
                                    };
                                if (a) n = function() {
                                    u.nextTick(f)
                                };
                                else if (o) {
                                    var c = !0,
                                        h = document.createTextNode("");
                                    new o(f).observe(h, {
                                        characterData: !0
                                    }), n = function() {
                                        h.data = c = !c
                                    }
                                } else if (s && s.resolve) {
                                    var l = s.resolve();
                                    n = function() {
                                        l.then(f)
                                    }
                                } else n = function() {
                                    i.call(r, f)
                                };
                                return function(r) {
                                    var i = {
                                        fn: r,
                                        next: void 0
                                    };
                                    e && (e.next = i), t || (t = i, n()), e = i
                                }
                            }
                        },
                        function(t, e, n) {
                            function r(t) {
                                var e, n;
                                this.promise = new t(function(t, r) {
                                    if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");
                                    e = t, n = r
                                }), this.resolve = i(e), this.reject = i(n)
                            }
                            var i = n(10);
                            t.exports.f = function(t) {
                                return new r(t)
                            }
                        },
                        function(t, e, n) {
                            function r(t, e, n) {
                                var r, i, o, u = Array(n),
                                    s = 8 * n - e - 1,
                                    a = (1 << s) - 1,
                                    f = a >> 1,
                                    c = 23 === e ? L(2, -24) - L(2, -77) : 0,
                                    h = 0,
                                    l = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                                for (t = j(t), t != t || t === k ? (i = t != t ? 1 : 0, r = a) : (r = C(F(t) / Y), t * (o = L(2, -r)) < 1 && (r--, o *= 2), t += r + f >= 1 ? c / o : c * L(2, 1 - f), t * o >= 2 && (r++, o /= 2), r + f >= a ? (i = 0, r = a) : r + f >= 1 ? (i = (t * o - 1) * L(2, e), r += f) : (i = t * L(2, f - 1) * L(2, e), r = 0)); e >= 8; u[h++] = 255 & i, i /= 256, e -= 8);
                                for (r = r << e | i, s += e; s > 0; u[h++] = 255 & r, r /= 256, s -= 8);
                                return u[--h] |= 128 * l, u
                            }

                            function i(t, e, n) {
                                var r, i = 8 * n - e - 1,
                                    o = (1 << i) - 1,
                                    u = o >> 1,
                                    s = i - 7,
                                    a = n - 1,
                                    f = t[a--],
                                    c = 127 & f;
                                for (f >>= 7; s > 0; c = 256 * c + t[a], a--, s -= 8);
                                for (r = c & (1 << -s) - 1, c >>= -s, s += e; s > 0; r = 256 * r + t[a], a--, s -= 8);
                                if (0 === c) c = 1 - u;
                                else {
                                    if (c === o) return r ? NaN : f ? -k : k;
                                    r += L(2, e), c -= u
                                }
                                return (f ? -1 : 1) * r * L(2, c - e)
                            }

                            function o(t) {
                                return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0]
                            }

                            function u(t) {
                                return [255 & t]
                            }

                            function s(t) {
                                return [255 & t, t >> 8 & 255]
                            }

                            function a(t) {
                                return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255]
                            }

                            function f(t) {
                                return r(t, 52, 8)
                            }

                            function c(t) {
                                return r(t, 23, 4)
                            }

                            function h(t, e, n) {
                                N(t[I], e, {
                                    get: function() {
                                        return this[n]
                                    }
                                })
                            }

                            function l(t, e, n, r) {
                                var i = +n,
                                    o = O(i);
                                if (o + e > t[K]) throw M(R);
                                var u = t[W]._b,
                                    s = o + t[$],
                                    a = u.slice(s, s + e);
                                return r ? a : a.reverse()
                            }

                            function p(t, e, n, r, i, o) {
                                var u = +n,
                                    s = O(u);
                                if (s + e > t[K]) throw M(R);
                                for (var a = t[W]._b, f = s + t[$], c = r(+i), h = 0; h < e; h++) a[f + h] = c[o ? h : e - h - 1]
                            }
                            var d = n(2),
                                v = n(6),
                                y = n(33),
                                g = n(64),
                                _ = n(12),
                                b = n(41),
                                w = n(3),
                                m = n(39),
                                S = n(24),
                                E = n(8),
                                O = n(131),
                                A = n(37).f,
                                N = n(7).f,
                                T = n(96),
                                B = n(44),
                                I = "prototype",
                                R = "Wrong index!",
                                P = d.ArrayBuffer,
                                x = d.DataView,
                                D = d.Math,
                                M = d.RangeError,
                                k = d.Infinity,
                                U = P,
                                j = D.abs,
                                L = D.pow,
                                C = D.floor,
                                F = D.log,
                                Y = D.LN2,
                                W = v ? "_b" : "buffer",
                                K = v ? "_l" : "byteLength",
                                $ = v ? "_o" : "byteOffset";
                            if (g.ABV) {
                                if (!w(function() {
                                    P(1)
                                }) || !w(function() {
                                    new P(-1)
                                }) || w(function() {
                                    return new P, new P(1.5), new P(NaN), "ArrayBuffer" != P.name
                                })) {
                                    P = function(t) {
                                        return m(this, P), new U(O(t))
                                    };
                                    for (var V, J = P[I] = U[I], G = A(U), z = 0; G.length > z;)(V = G[z++]) in P || _(P, V, U[V]);
                                    y || (J.constructor = P)
                                }
                                var q = new x(new P(2)),
                                    H = x[I].setInt8;
                                q.setInt8(0, 2147483648), q.setInt8(1, 2147483649), !q.getInt8(0) && q.getInt8(1) || b(x[I], {
                                    setInt8: function(t, e) {
                                        H.call(this, t, e << 24 >> 24)
                                    },
                                    setUint8: function(t, e) {
                                        H.call(this, t, e << 24 >> 24)
                                    }
                                }, !0)
                            } else P = function(t) {
                                m(this, P, "ArrayBuffer");
                                var e = O(t);
                                this._b = T.call(Array(e), 0), this[K] = e
                            }, x = function(t, e, n) {
                                m(this, x, "DataView"), m(t, P, "DataView");
                                var r = t[K],
                                    i = S(e);
                                if (i < 0 || i > r) throw M("Wrong offset!");
                                if (n = void 0 === n ? r - i : E(n), i + n > r) throw M("Wrong length!");
                                this[W] = t, this[$] = i, this[K] = n
                            }, v && (h(P, "byteLength", "_l"), h(x, "buffer", "_b"), h(x, "byteLength", "_l"), h(x, "byteOffset", "_o")), b(x[I], {
                                getInt8: function(t) {
                                    return l(this, 1, t)[0] << 24 >> 24
                                },
                                getUint8: function(t) {
                                    return l(this, 1, t)[0]
                                },
                                getInt16: function(t) {
                                    var e = l(this, 2, t, arguments[1]);
                                    return (e[1] << 8 | e[0]) << 16 >> 16
                                },
                                getUint16: function(t) {
                                    var e = l(this, 2, t, arguments[1]);
                                    return e[1] << 8 | e[0]
                                },
                                getInt32: function(t) {
                                    return o(l(this, 4, t, arguments[1]))
                                },
                                getUint32: function(t) {
                                    return o(l(this, 4, t, arguments[1])) >>> 0
                                },
                                getFloat32: function(t) {
                                    return i(l(this, 4, t, arguments[1]), 23, 4)
                                },
                                getFloat64: function(t) {
                                    return i(l(this, 8, t, arguments[1]), 52, 8)
                                },
                                setInt8: function(t, e) {
                                    p(this, 1, t, u, e)
                                },
                                setUint8: function(t, e) {
                                    p(this, 1, t, u, e)
                                },
                                setInt16: function(t, e) {
                                    p(this, 2, t, s, e, arguments[2])
                                },
                                setUint16: function(t, e) {
                                    p(this, 2, t, s, e, arguments[2])
                                },
                                setInt32: function(t, e) {
                                    p(this, 4, t, a, e, arguments[2])
                                },
                                setUint32: function(t, e) {
                                    p(this, 4, t, a, e, arguments[2])
                                },
                                setFloat32: function(t, e) {
                                    p(this, 4, t, c, e, arguments[2])
                                },
                                setFloat64: function(t, e) {
                                    p(this, 8, t, f, e, arguments[2])
                                }
                            });
                            B(P, "ArrayBuffer"), B(x, "DataView"), _(x[I], g.VIEW, !0), e.ArrayBuffer = P, e.DataView = x
                        },
                        function(t, e, n) {
                            (function(e) {
                                if (void 0 !== e.Map) t.exports = e.Map, t.exports.Map = e.Map;
                                else {
                                    var n = function(t) {
                                        this._keys = [], this._values = {};
                                        for (var e = 0; e < t.length; e++)
                                            if (null != t[e]) {
                                                var n = t[e],
                                                    r = n[0],
                                                    i = n[1];
                                                this._keys.push(r), this._values[r] = {
                                                    v: i,
                                                    i: this._keys.length - 1
                                                }
                                            }
                                    };
                                    n.prototype.clear = function() {
                                        this._keys = [], this._values = {}
                                    }, n.prototype.delete = function(t) {
                                        var e = this._values[t];
                                        return null != e && (delete this._values[t], this._keys.splice(e.i, 1), !0)
                                    }, n.prototype.entries = function() {
                                        var t = this,
                                            e = 0;
                                        return {
                                            next: function() {
                                                var n = t._keys[e++];
                                                return {
                                                    value: void 0 !== n ? [n, t._values[n].v] : void 0,
                                                    done: void 0 === n
                                                }
                                            }
                                        }
                                    }, n.prototype.forEach = function(t, e) {
                                        e = e || this;
                                        for (var n = 0; n < this._keys.length; n++) {
                                            var r = this._keys[n];
                                            t.call(e, this._values[r].v, r, e)
                                        }
                                    }, n.prototype.get = function(t) {
                                        return this._values[t] ? this._values[t].v : void 0
                                    }, n.prototype.has = function(t) {
                                        return null != this._values[t]
                                    }, n.prototype.keys = function() {
                                        var t = this,
                                            e = 0;
                                        return {
                                            next: function() {
                                                var n = t._keys[e++];
                                                return {
                                                    value: void 0 !== n ? n : void 0,
                                                    done: void 0 === n
                                                }
                                            }
                                        }
                                    }, n.prototype.set = function(t, e) {
                                        return this._values[t] ? (this._values[t].v = e, this) : (this._keys.push(t), this._values[t] = {
                                            v: e,
                                            i: this._keys.length - 1
                                        }, this)
                                    }, n.prototype.values = function() {
                                        var t = this,
                                            e = 0;
                                        return {
                                            next: function() {
                                                var n = t._keys[e++];
                                                return {
                                                    value: void 0 !== n ? t._values[n].v : void 0,
                                                    done: void 0 === n
                                                }
                                            }
                                        }
                                    }, Object.defineProperty(n.prototype, "size", {
                                        enumerable: !0,
                                        get: function() {
                                            return this._keys.length
                                        }
                                    }), t.exports = n, t.exports.Map = n
                                }
                            }).call(e, n(48))
                        },
                        function(t, e, n) {
                            function r(t) {
                                if (!(this instanceof r)) return new r(t);
                                this._bsontype = "Symbol", this.value = t
                            }
                            r.prototype.valueOf = function() {
                                return this.value
                            }, r.prototype.toString = function() {
                                return this.value
                            }, r.prototype.inspect = function() {
                                return this.value
                            }, r.prototype.toJSON = function() {
                                return this.value
                            }, t.exports = r, t.exports.Symbol = r
                        },
                        function(t, e, n) {
                            function r(t) {
                                if (!(this instanceof r)) return new r(t);
                                this._bsontype = "Int32", this.value = t
                            }
                            r.prototype.valueOf = function() {
                                return this.value
                            }, r.prototype.toJSON = function() {
                                return this.value
                            }, t.exports = r, t.exports.Int32 = r
                        },
                        function(t, e, n) {
                            t.exports = !n(6) && !n(3)(function() {
                                return 7 != Object.defineProperty(n(76)("div"), "a", {
                                    get: function() {
                                        return 7
                                    }
                                }).a
                            })
                        },
                        function(t, e, n) {
                            e.f = n(5)
                        },
                        function(t, e, n) {
                            var r = n(11),
                                i = n(15),
                                o = n(55)(!1),
                                u = n(78)("IE_PROTO");
                            t.exports = function(t, e) {
                                var n, s = i(t),
                                    a = 0,
                                    f = [];
                                for (n in s) n != u && r(s, n) && f.push(n);
                                for (; e.length > a;) r(s, n = e[a++]) && (~o(f, n) || f.push(n));
                                return f
                            }
                        },
                        function(t, e, n) {
                            var r = n(7),
                                i = n(1),
                                o = n(34);
                            t.exports = n(6) ? Object.defineProperties : function(t, e) {
                                i(t);
                                for (var n, u = o(e), s = u.length, a = 0; s > a;) r.f(t, n = u[a++], e[n]);
                                return t
                            }
                        },
                        function(t, e, n) {
                            var r = n(15),
                                i = n(37).f,
                                o = {}.toString,
                                u = "object" == ("undefined" == typeof window ? "undefined" : _typeof2(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                                s = function(t) {
                                    try {
                                        return i(t)
                                    } catch (t) {
                                        return u.slice()
                                    }
                                };
                            t.exports.f = function(t) {
                                return u && "[object Window]" == o.call(t) ? s(t) : i(r(t))
                            }
                        },
                        function(t, e, n) {
                            var r = n(34),
                                i = n(56),
                                o = n(50),
                                u = n(9),
                                s = n(49),
                                a = Object.assign;
                            t.exports = !a || n(3)(function() {
                                var t = {}, e = {}, n = Symbol(),
                                    r = "abcdefghijklmnopqrst";
                                return t[n] = 7, r.split("").forEach(function(t) {
                                    e[t] = t
                                }), 7 != a({}, t)[n] || Object.keys(a({}, e)).join("") != r
                            }) ? function(t, e) {
                                for (var n = u(t), a = arguments.length, f = 1, c = i.f, h = o.f; a > f;)
                                    for (var l, p = s(arguments[f++]), d = c ? r(p).concat(c(p)) : r(p), v = d.length, y = 0; v > y;) h.call(p, l = d[y++]) && (n[l] = p[l]);
                                return n
                            } : a
                        },
                        function(t, e, n) {
                            var r = n(10),
                                i = n(4),
                                o = n(112),
                                u = [].slice,
                                s = {}, a = function(t, e, n) {
                                    if (!(e in s)) {
                                        for (var r = [], i = 0; i < e; i++) r[i] = "a[" + i + "]";
                                        s[e] = Function("F,a", "return new F(" + r.join(",") + ")")
                                    }
                                    return s[e](t, n)
                                };
                            t.exports = Function.bind || function(t) {
                                var e = r(this),
                                    n = u.call(arguments, 1),
                                    s = function r() {
                                        var i = n.concat(u.call(arguments));
                                        return this instanceof r ? a(e, i.length, i) : o(e, i, t)
                                    };
                                return i(e.prototype) && (s.prototype = e.prototype), s
                            }
                        },
                        function(t, e) {
                            t.exports = function(t, e, n) {
                                var r = void 0 === n;
                                switch (e.length) {
                                    case 0:
                                        return r ? t() : t.call(n);
                                    case 1:
                                        return r ? t(e[0]) : t.call(n, e[0]);
                                    case 2:
                                        return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
                                    case 3:
                                        return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
                                    case 4:
                                        return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
                                }
                                return t.apply(n, e)
                            }
                        },
                        function(t, e, n) {
                            var r = n(2).parseInt,
                                i = n(45).trim,
                                o = n(82),
                                u = /^[-+]?0[xX]/;
                            t.exports = 8 !== r(o + "08") || 22 !== r(o + "0x16") ? function(t, e) {
                                var n = i(String(t), 3);
                                return r(n, e >>> 0 || (u.test(n) ? 16 : 10))
                            } : r
                        },
                        function(t, e, n) {
                            var r = n(2).parseFloat,
                                i = n(45).trim;
                            t.exports = 1 / r(n(82) + "-0") != -1 / 0 ? function(t) {
                                var e = i(String(t), 3),
                                    n = r(e);
                                return 0 === n && "-" == e.charAt(0) ? -0 : n
                            } : r
                        },
                        function(t, e, n) {
                            var r = n(19);
                            t.exports = function(t, e) {
                                if ("number" != typeof t && "Number" != r(t)) throw TypeError(e);
                                return +t
                            }
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = Math.floor;
                            t.exports = function(t) {
                                return !r(t) && isFinite(t) && i(t) === t
                            }
                        },
                        function(t, e) {
                            t.exports = Math.log1p || function(t) {
                                return (t = +t) > -1e-8 && t < 1e-8 ? t - t * t / 2 : Math.log(1 + t)
                            }
                        },
                        function(t, e, n) {
                            var r = n(85),
                                i = Math.pow,
                                o = i(2, -52),
                                u = i(2, -23),
                                s = i(2, 127) * (2 - u),
                                a = i(2, -126),
                                f = function(t) {
                                    return t + 1 / o - 1 / o
                                };
                            t.exports = Math.fround || function(t) {
                                var e, n, i = Math.abs(t),
                                    c = r(t);
                                return i < a ? c * f(i / a / u) * a * u : (e = (1 + u / o) * i, n = e - (e - i), n > s || n != n ? c * (1 / 0) : c * n)
                            }
                        },
                        function(t, e, n) {
                            var r = n(1);
                            t.exports = function(t, e, n, i) {
                                try {
                                    return i ? e(r(n)[0], n[1]) : e(n)
                                } catch (e) {
                                    var o = t.
                                    return;
                                    throw void 0 !== o && r(o.call(t)), e
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(10),
                                i = n(9),
                                o = n(49),
                                u = n(8);
                            t.exports = function(t, e, n, s, a) {
                                r(e);
                                var f = i(t),
                                    c = o(f),
                                    h = u(f.length),
                                    l = a ? h - 1 : 0,
                                    p = a ? -1 : 1;
                                if (n < 2)
                                    for (;;) {
                                        if (l in c) {
                                            s = c[l], l += p;
                                            break
                                        }
                                        if (l += p, a ? l < 0 : h <= l) throw TypeError("Reduce of empty array with no initial value")
                                    }
                                for (; a ? l >= 0 : h > l; l += p) l in c && (s = e(s, c[l], l, f));
                                return s
                            }
                        },
                        function(t, e, n) {
                            var r = n(9),
                                i = n(35),
                                o = n(8);
                            t.exports = [].copyWithin || function(t, e) {
                                var n = r(this),
                                    u = o(n.length),
                                    s = i(t, u),
                                    a = i(e, u),
                                    f = arguments.length > 2 ? arguments[2] : void 0,
                                    c = Math.min((void 0 === f ? u : i(f, u)) - a, u - s),
                                    h = 1;
                                for (a < s && s < a + c && (h = -1, a += c - 1, s += c - 1); c-- > 0;) a in n ? n[s] = n[a] : delete n[s], s += h, a += h;
                                return n
                            }
                        },
                        function(t, e) {
                            t.exports = function(t, e) {
                                return {
                                    value: e,
                                    done: !! t
                                }
                            }
                        },
                        function(t, e, n) {
                            n(6) && "g" != /./g.flags && n(7).f(RegExp.prototype, "flags", {
                                configurable: !0,
                                get: n(60)
                            })
                        },
                        function(t, e) {
                            t.exports = function(t) {
                                try {
                                    return {
                                        e: !1,
                                        v: t()
                                    }
                                } catch (t) {
                                    return {
                                        e: !0,
                                        v: t
                                    }
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(1),
                                i = n(4),
                                o = n(100);
                            t.exports = function(t, e) {
                                if (r(t), i(e) && e.constructor === t) return e;
                                var n = o.f(t);
                                return (0, n.resolve)(e), n.promise
                            }
                        },
                        function(t, e, n) {
                            var r = n(127),
                                i = n(47);
                            t.exports = n(63)("Map", function(t) {
                                return function() {
                                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                                }
                            }, {
                                get: function(t) {
                                    var e = r.getEntry(i(this, "Map"), t);
                                    return e && e.v
                                },
                                set: function(t, e) {
                                    return r.def(i(this, "Map"), 0 === t ? 0 : t, e)
                                }
                            }, r, !0)
                        },
                        function(t, e, n) {
                            var r = n(7).f,
                                i = n(36),
                                o = n(41),
                                u = n(18),
                                s = n(39),
                                a = n(40),
                                f = n(88),
                                c = n(122),
                                h = n(38),
                                l = n(6),
                                p = n(29).fastKey,
                                d = n(47),
                                v = l ? "_s" : "size",
                                y = function(t, e) {
                                    var n, r = p(e);
                                    if ("F" !== r) return t._i[r];
                                    for (n = t._f; n; n = n.n)
                                        if (n.k == e) return n
                                };
                            t.exports = {
                                getConstructor: function(t, e, n, f) {
                                    var c = t(function(t, r) {
                                        s(t, c, e, "_i"), t._t = e, t._i = i(null), t._f = void 0, t._l = void 0, t[v] = 0, void 0 != r && a(r, n, t[f], t)
                                    });
                                    return o(c.prototype, {
                                        clear: function() {
                                            for (var t = d(this, e), n = t._i, r = t._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
                                            t._f = t._l = void 0, t[v] = 0
                                        },
                                        delete: function(t) {
                                            var n = d(this, e),
                                                r = y(n, t);
                                            if (r) {
                                                var i = r.n,
                                                    o = r.p;
                                                delete n._i[r.i], r.r = !0, o && (o.n = i), i && (i.p = o), n._f == r && (n._f = i), n._l == r && (n._l = o), n[v]--
                                            }
                                            return !!r
                                        },
                                        forEach: function(t) {
                                            d(this, e);
                                            for (var n, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;)
                                                for (r(n.v, n.k, this); n && n.r;) n = n.p
                                        },
                                        has: function(t) {
                                            return !!y(d(this, e), t)
                                        }
                                    }), l && r(c.prototype, "size", {
                                        get: function() {
                                            return d(this, e)[v]
                                        }
                                    }), c
                                },
                                def: function(t, e, n) {
                                    var r, i, o = y(t, e);
                                    return o ? o.v = n : (t._l = o = {
                                        i: i = p(e, !0),
                                        k: e,
                                        v: n,
                                        p: r = t._l,
                                        n: void 0,
                                        r: !1
                                    }, t._f || (t._f = o), r && (r.n = o), t[v]++, "F" !== i && (t._i[i] = o)), t
                                },
                                getEntry: y,
                                setStrong: function(t, e, n) {
                                    f(t, e, function(t, n) {
                                        this._t = d(t, e), this._k = n, this._l = void 0
                                    }, function() {
                                        for (var t = this, e = t._k, n = t._l; n && n.r;) n = n.p;
                                        return t._t && (t._l = n = n ? n.n : t._t._f) ? "keys" == e ? c(0, n.k) : "values" == e ? c(0, n.v) : c(0, [n.k, n.v]) : (t._t = void 0, c(1))
                                    }, n ? "entries" : "values", !n, !0), h(e)
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(127),
                                i = n(47);
                            t.exports = n(63)("Set", function(t) {
                                return function() {
                                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                                }
                            }, {
                                add: function(t) {
                                    return r.def(i(this, "Set"), t = 0 === t ? 0 : t, t)
                                }
                            }, r)
                        },
                        function(t, e, n) {
                            var r, i = n(26)(0),
                                o = n(13),
                                u = n(29),
                                s = n(110),
                                a = n(130),
                                f = n(4),
                                c = n(3),
                                h = n(47),
                                l = u.getWeak,
                                p = Object.isExtensible,
                                d = a.ufstore,
                                v = {}, y = function(t) {
                                    return function() {
                                        return t(this, arguments.length > 0 ? arguments[0] : void 0)
                                    }
                                }, g = {
                                    get: function(t) {
                                        if (f(t)) {
                                            var e = l(t);
                                            return !0 === e ? d(h(this, "WeakMap")).get(t) : e ? e[this._i] : void 0
                                        }
                                    },
                                    set: function(t, e) {
                                        return a.def(h(this, "WeakMap"), t, e)
                                    }
                                }, _ = t.exports = n(63)("WeakMap", y, g, a, !0, !0);
                            c(function() {
                                return 7 != (new _).set((Object.freeze || Object)(v), 7).get(v)
                            }) && (r = a.getConstructor(y, "WeakMap"), s(r.prototype, g), u.NEED = !0, i(["delete", "has", "get", "set"], function(t) {
                                var e = _.prototype,
                                    n = e[t];
                                o(e, t, function(e, i) {
                                    if (f(e) && !p(e)) {
                                        this._f || (this._f = new r);
                                        var o = this._f[t](e, i);
                                        return "set" == t ? this : o
                                    }
                                    return n.call(this, e, i)
                                })
                            }))
                        },
                        function(t, e, n) {
                            var r = n(41),
                                i = n(29).getWeak,
                                o = n(1),
                                u = n(4),
                                s = n(39),
                                a = n(40),
                                f = n(26),
                                c = n(11),
                                h = n(47),
                                l = f(5),
                                p = f(6),
                                d = 0,
                                v = function(t) {
                                    return t._l || (t._l = new y)
                                }, y = function() {
                                    this.a = []
                                }, g = function(t, e) {
                                    return l(t.a, function(t) {
                                        return t[0] === e
                                    })
                                };
                            y.prototype = {
                                get: function(t) {
                                    var e = g(this, t);
                                    if (e) return e[1]
                                },
                                has: function(t) {
                                    return !!g(this, t)
                                },
                                set: function(t, e) {
                                    var n = g(this, t);
                                    n ? n[1] = e : this.a.push([t, e])
                                },
                                delete: function(t) {
                                    var e = p(this.a, function(e) {
                                        return e[0] === t
                                    });
                                    return~ e && this.a.splice(e, 1), !! ~e
                                }
                            }, t.exports = {
                                getConstructor: function(t, e, n, o) {
                                    var f = t(function(t, r) {
                                        s(t, f, e, "_i"), t._t = e, t._i = d++, t._l = void 0, void 0 != r && a(r, n, t[o], t)
                                    });
                                    return r(f.prototype, {
                                        delete: function(t) {
                                            if (!u(t)) return !1;
                                            var n = i(t);
                                            return !0 === n ? v(h(this, e)).delete(t) : n && c(n, this._i) && delete n[this._i]
                                        },
                                        has: function(t) {
                                            if (!u(t)) return !1;
                                            var n = i(t);
                                            return !0 === n ? v(h(this, e)).has(t) : n && c(n, this._i)
                                        }
                                    }), f
                                },
                                def: function(t, e, n) {
                                    var r = i(o(e), !0);
                                    return !0 === r ? v(t).set(e, n) : r[t._i] = n, t
                                },
                                ufstore: v
                            }
                        },
                        function(t, e, n) {
                            var r = n(24),
                                i = n(8);
                            t.exports = function(t) {
                                if (void 0 === t) return 0;
                                var e = r(t),
                                    n = i(e);
                                if (e !== n) throw RangeError("Wrong length!");
                                return n
                            }
                        },
                        function(t, e, n) {
                            var r = n(37),
                                i = n(56),
                                o = n(1),
                                u = n(2).Reflect;
                            t.exports = u && u.ownKeys || function(t) {
                                var e = r.f(o(t)),
                                    n = i.f;
                                return n ? e.concat(n(t)) : e
                            }
                        },
                        function(t, e, n) {
                            function r(t, e, n, f, c, h, l, p) {
                                for (var d, v, y = c, g = 0, _ = !! l && s(l, p, 3); g < f;) {
                                    if (g in n) {
                                        if (d = _ ? _(n[g], g, e) : n[g], v = !1, o(d) && (v = d[a], v = void 0 !== v ? !! v : i(d)), v && h > 0) y = r(t, e, d, u(d.length), y, h - 1) - 1;
                                        else {
                                            if (y >= 9007199254740991) throw TypeError();
                                            t[y] = d
                                        }
                                        y++
                                    }
                                    g++
                                }
                                return y
                            }
                            var i = n(57),
                                o = n(4),
                                u = n(8),
                                s = n(18),
                                a = n(5)("isConcatSpreadable");
                            t.exports = r
                        },
                        function(t, e, n) {
                            var r = n(8),
                                i = n(84),
                                o = n(23);
                            t.exports = function(t, e, n, u) {
                                var s = String(o(t)),
                                    a = s.length,
                                    f = void 0 === n ? " " : String(n),
                                    c = r(e);
                                if (c <= a || "" == f) return s;
                                var h = c - a,
                                    l = i.call(f, Math.ceil(h / f.length));
                                return l.length > h && (l = l.slice(0, h)), u ? l + s : s + l
                            }
                        },
                        function(t, e, n) {
                            var r = n(34),
                                i = n(15),
                                o = n(50).f;
                            t.exports = function(t) {
                                return function(e) {
                                    for (var n, u = i(e), s = r(u), a = s.length, f = 0, c = []; a > f;) o.call(u, n = s[f++]) && c.push(t ? [n, u[n]] : u[n]);
                                    return c
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(51),
                                i = n(137);
                            t.exports = function(t) {
                                return function() {
                                    if (r(this) != t) throw TypeError(t + "#toJSON isn't generic");
                                    return i(this)
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(40);
                            t.exports = function(t, e) {
                                var n = [];
                                return r(t, !1, n.push, n, e), n
                            }
                        },
                        function(t, e) {
                            t.exports = Math.scale || function(t, e, n, r, i) {
                                return 0 === arguments.length || t != t || e != e || n != n || r != r || i != i ? NaN : t === 1 / 0 || t === -1 / 0 ? t : (t - e) * (i - r) / (n - e) + r
                            }
                        },
                        function(t, e, n) {
                            n(140), t.exports = n(342)
                        },
                        function(t, e, n) {
                            (function(t) {
                                function e(t, e, n) {
                                    t[e] || Object[r](t, e, {
                                        writable: !0,
                                        configurable: !0,
                                        value: n
                                    })
                                }
                                if (n(141), n(338), n(339), t._babelPolyfill) throw new Error("only one instance of babel-polyfill is allowed");
                                t._babelPolyfill = !0;
                                var r = "defineProperty";
                                e(String.prototype, "padLeft", "".padStart), e(String.prototype, "padRight", "".padEnd), "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(t) {
                                    [][t] && e(Array, t, Function.call.bind([][t]))
                                })
                            }).call(e, n(48))
                        },
                        function(t, e, n) {
                            n(142), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(170), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(182), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(205), n(206), n(207), n(208), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(216), n(217), n(218), n(219), n(220), n(222), n(223), n(225), n(226), n(227), n(228), n(229), n(230), n(231), n(233), n(234), n(235), n(236), n(237), n(238), n(239), n(240), n(241), n(242), n(243), n(244), n(245), n(97), n(246), n(247), n(123), n(248), n(249), n(250), n(251), n(252), n(126), n(128), n(129), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), n(266), n(267), n(268), n(269), n(270), n(271), n(272), n(273), n(274), n(275), n(276), n(277), n(278), n(279), n(280), n(281), n(282), n(283), n(284), n(285), n(286), n(287), n(288), n(289), n(290), n(291), n(292), n(293), n(294), n(295), n(296), n(297), n(298), n(299), n(300), n(301), n(302), n(303), n(304), n(305), n(306), n(307), n(308), n(309), n(310), n(311), n(312), n(313), n(314), n(315), n(316), n(317), n(318), n(319), n(320), n(321), n(322), n(323), n(324), n(325), n(326), n(327), n(328), n(329), n(330), n(331), n(332), n(333), n(334), n(335), n(336), n(337), t.exports = n(21)
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(11),
                                o = n(6),
                                u = n(0),
                                s = n(13),
                                a = n(29).KEY,
                                f = n(3),
                                c = n(54),
                                h = n(44),
                                l = n(32),
                                p = n(5),
                                d = n(106),
                                v = n(77),
                                y = n(143),
                                g = n(57),
                                _ = n(1),
                                b = n(15),
                                w = n(22),
                                m = n(31),
                                S = n(36),
                                E = n(109),
                                O = n(16),
                                A = n(7),
                                N = n(34),
                                T = O.f,
                                B = A.f,
                                I = E.f,
                                R = r.Symbol,
                                P = r.JSON,
                                x = P && P.stringify,
                                D = p("_hidden"),
                                M = p("toPrimitive"),
                                k = {}.propertyIsEnumerable,
                                U = c("symbol-registry"),
                                j = c("symbols"),
                                L = c("op-symbols"),
                                C = Object.prototype,
                                F = "function" == typeof R,
                                Y = r.QObject,
                                W = !Y || !Y.prototype || !Y.prototype.findChild,
                                K = o && f(function() {
                                    return 7 != S(B({}, "a", {
                                        get: function() {
                                            return B(this, "a", {
                                                value: 7
                                            }).a
                                        }
                                    })).a
                                }) ? function(t, e, n) {
                                    var r = T(C, e);
                                    r && delete C[e], B(t, e, n), r && t !== C && B(C, e, r)
                                } : B,
                                $ = function(t) {
                                    var e = j[t] = S(R.prototype);
                                    return e._k = t, e
                                }, V = F && "symbol" == _typeof2(R.iterator) ? function(t) {
                                    return "symbol" == (void 0 === t ? "undefined" : _typeof2(t))
                                } : function(t) {
                                    return t instanceof R
                                }, J = function(t, e, n) {
                                    return t === C && J(L, e, n), _(t), e = w(e, !0), _(n), i(j, e) ? (n.enumerable ? (i(t, D) && t[D][e] && (t[D][e] = !1), n = S(n, {
                                        enumerable: m(0, !1)
                                    })) : (i(t, D) || B(t, D, m(1, {})), t[D][e] = !0), K(t, e, n)) : B(t, e, n)
                                }, G = function(t, e) {
                                    _(t);
                                    for (var n, r = y(e = b(e)), i = 0, o = r.length; o > i;) J(t, n = r[i++], e[n]);
                                    return t
                                }, z = function(t, e) {
                                    return void 0 === e ? S(t) : G(S(t), e)
                                }, q = function(t) {
                                    var e = k.call(this, t = w(t, !0));
                                    return !(this === C && i(j, t) && !i(L, t)) && (!(e || !i(this, t) || !i(j, t) || i(this, D) && this[D][t]) || e)
                                }, H = function(t, e) {
                                    if (t = b(t), e = w(e, !0), t !== C || !i(j, e) || i(L, e)) {
                                        var n = T(t, e);
                                        return !n || !i(j, e) || i(t, D) && t[D][e] || (n.enumerable = !0), n
                                    }
                                }, X = function(t) {
                                    for (var e, n = I(b(t)), r = [], o = 0; n.length > o;) i(j, e = n[o++]) || e == D || e == a || r.push(e);
                                    return r
                                }, Z = function(t) {
                                    for (var e, n = t === C, r = I(n ? L : b(t)), o = [], u = 0; r.length > u;)!i(j, e = r[u++]) || n && !i(C, e) || o.push(j[e]);
                                    return o
                                };
                            F || (R = function() {
                                if (this instanceof R) throw TypeError("Symbol is not a constructor!");
                                var t = l(arguments.length > 0 ? arguments[0] : void 0),
                                    e = function e(n) {
                                        this === C && e.call(L, n), i(this, D) && i(this[D], t) && (this[D][t] = !1), K(this, t, m(1, n))
                                    };
                                return o && W && K(C, t, {
                                    configurable: !0,
                                    set: e
                                }), $(t)
                            }, s(R.prototype, "toString", function() {
                                return this._k
                            }), O.f = H, A.f = J, n(37).f = E.f = X, n(50).f = q, n(56).f = Z, o && !n(33) && s(C, "propertyIsEnumerable", q, !0), d.f = function(t) {
                                return $(p(t))
                            }), u(u.G + u.W + u.F * !F, {
                                Symbol: R
                            });
                            for (var Q = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), tt = 0; Q.length > tt;) p(Q[tt++]);
                            for (var et = N(p.store), nt = 0; et.length > nt;) v(et[nt++]);
                            u(u.S + u.F * !F, "Symbol", {
                                for: function(t) {
                                    return i(U, t += "") ? U[t] : U[t] = R(t)
                                },
                                keyFor: function(t) {
                                    if (!V(t)) throw TypeError(t + " is not a symbol!");
                                    for (var e in U)
                                        if (U[e] === t) return e
                                },
                                useSetter: function() {
                                    W = !0
                                },
                                useSimple: function() {
                                    W = !1
                                }
                            }), u(u.S + u.F * !F, "Object", {
                                create: z,
                                defineProperty: J,
                                defineProperties: G,
                                getOwnPropertyDescriptor: H,
                                getOwnPropertyNames: X,
                                getOwnPropertySymbols: Z
                            }), P && u(u.S + u.F * (!F || f(function() {
                                var t = R();
                                return "[null]" != x([t]) || "{}" != x({
                                    a: t
                                }) || "{}" != x(Object(t))
                            })), "JSON", {
                                stringify: function(t) {
                                    if (void 0 !== t && !V(t)) {
                                        for (var e, n, r = [t], i = 1; arguments.length > i;) r.push(arguments[i++]);
                                        return e = r[1], "function" == typeof e && (n = e), !n && g(e) || (e = function(t, e) {
                                            if (n && (e = n.call(this, t, e)), !V(e)) return e
                                        }), r[1] = e, x.apply(P, r)
                                    }
                                }
                            }), R.prototype[M] || n(12)(R.prototype, M, R.prototype.valueOf), h(R, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0)
                        },
                        function(t, e, n) {
                            var r = n(34),
                                i = n(56),
                                o = n(50);
                            t.exports = function(t) {
                                var e = r(t),
                                    n = i.f;
                                if (n)
                                    for (var u, s = n(t), a = o.f, f = 0; s.length > f;) a.call(t, u = s[f++]) && e.push(u);
                                return e
                            }
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Object", {
                                create: n(36)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S + r.F * !n(6), "Object", {
                                defineProperty: n(7).f
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S + r.F * !n(6), "Object", {
                                defineProperties: n(108)
                            })
                        },
                        function(t, e, n) {
                            var r = n(15),
                                i = n(16).f;
                            n(25)("getOwnPropertyDescriptor", function() {
                                return function(t, e) {
                                    return i(r(t), e)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(9),
                                i = n(17);
                            n(25)("getPrototypeOf", function() {
                                return function(t) {
                                    return i(r(t))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(9),
                                i = n(34);
                            n(25)("keys", function() {
                                return function(t) {
                                    return i(r(t))
                                }
                            })
                        },
                        function(t, e, n) {
                            n(25)("getOwnPropertyNames", function() {
                                return n(109).f
                            })
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(29).onFreeze;
                            n(25)("freeze", function(t) {
                                return function(e) {
                                    return t && r(e) ? t(i(e)) : e
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(29).onFreeze;
                            n(25)("seal", function(t) {
                                return function(e) {
                                    return t && r(e) ? t(i(e)) : e
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(29).onFreeze;
                            n(25)("preventExtensions", function(t) {
                                return function(e) {
                                    return t && r(e) ? t(i(e)) : e
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4);
                            n(25)("isFrozen", function(t) {
                                return function(e) {
                                    return !r(e) || !! t && t(e)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4);
                            n(25)("isSealed", function(t) {
                                return function(e) {
                                    return !r(e) || !! t && t(e)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4);
                            n(25)("isExtensible", function(t) {
                                return function(e) {
                                    return !!r(e) && (!t || t(e))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S + r.F, "Object", {
                                assign: n(110)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Object", {
                                is: n(159)
                            })
                        },
                        function(t, e) {
                            t.exports = Object.is || function(t, e) {
                                return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e
                            }
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Object", {
                                setPrototypeOf: n(81).set
                            })
                        },
                        function(t, e, n) {
                            var r = n(51),
                                i = {};
                            i[n(5)("toStringTag")] = "z", i + "" != "[object z]" && n(13)(Object.prototype, "toString", function() {
                                return "[object " + r(this) + "]"
                            }, !0)
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.P, "Function", {
                                bind: n(111)
                            })
                        },
                        function(t, e, n) {
                            var r = n(7).f,
                                i = Function.prototype,
                                o = /^\s*function ([^ (]*)/;
                            "name" in i || n(6) && r(i, "name", {
                                configurable: !0,
                                get: function() {
                                    try {
                                        return ("" + this).match(o)[1]
                                    } catch (t) {
                                        return ""
                                    }
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(17),
                                o = n(5)("hasInstance"),
                                u = Function.prototype;
                            o in u || n(7).f(u, o, {
                                value: function(t) {
                                    if ("function" != typeof this || !r(t)) return !1;
                                    if (!r(this.prototype)) return t instanceof this;
                                    for (; t = i(t);)
                                        if (this.prototype === t) return !0;
                                    return !1
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(113);
                            r(r.G + r.F * (parseInt != i), {
                                parseInt: i
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(114);
                            r(r.G + r.F * (parseFloat != i), {
                                parseFloat: i
                            })
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(11),
                                o = n(19),
                                u = n(83),
                                s = n(22),
                                a = n(3),
                                f = n(37).f,
                                c = n(16).f,
                                h = n(7).f,
                                l = n(45).trim,
                                p = r.Number,
                                d = p,
                                v = p.prototype,
                                y = "Number" == o(n(36)(v)),
                                g = "trim" in String.prototype,
                                _ = function(t) {
                                    var e = s(t, !1);
                                    if ("string" == typeof e && e.length > 2) {
                                        e = g ? e.trim() : l(e, 3);
                                        var n, r, i, o = e.charCodeAt(0);
                                        if (43 === o || 45 === o) {
                                            if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN
                                        } else if (48 === o) {
                                            switch (e.charCodeAt(1)) {
                                                case 66:
                                                case 98:
                                                    r = 2, i = 49;
                                                    break;
                                                case 79:
                                                case 111:
                                                    r = 8, i = 55;
                                                    break;
                                                default:
                                                    return +e
                                            }
                                            for (var u, a = e.slice(2), f = 0, c = a.length; f < c; f++)
                                                if ((u = a.charCodeAt(f)) < 48 || u > i) return NaN;
                                            return parseInt(a, r)
                                        }
                                    }
                                    return +e
                                };
                            if (!p(" 0o1") || !p("0b1") || p("+0x1")) {
                                p = function(t) {
                                    var e = arguments.length < 1 ? 0 : t,
                                        n = this;
                                    return n instanceof p && (y ? a(function() {
                                        v.valueOf.call(n)
                                    }) : "Number" != o(n)) ? u(new d(_(e)), n, p) : _(e)
                                };
                                for (var b, w = n(6) ? f(d) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), m = 0; w.length > m; m++) i(d, b = w[m]) && !i(p, b) && h(p, b, c(d, b));
                                p.prototype = v, v.constructor = p, n(13)(r, "Number", p)
                            }
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(24),
                                o = n(115),
                                u = n(84),
                                s = 1..toFixed,
                                a = Math.floor,
                                f = [0, 0, 0, 0, 0, 0],
                                c = "Number.toFixed: incorrect invocation!",
                                h = function(t, e) {
                                    for (var n = -1, r = e; ++n < 6;) r += t * f[n], f[n] = r % 1e7, r = a(r / 1e7)
                                }, l = function(t) {
                                    for (var e = 6, n = 0; --e >= 0;) n += f[e], f[e] = a(n / t), n = n % t * 1e7
                                }, p = function() {
                                    for (var t = 6, e = ""; --t >= 0;)
                                        if ("" !== e || 0 === t || 0 !== f[t]) {
                                            var n = String(f[t]);
                                            e = "" === e ? n : e + u.call("0", 7 - n.length) + n
                                        }
                                    return e
                                }, d = function t(e, n, r) {
                                    return 0 === n ? r : n % 2 == 1 ? t(e, n - 1, r * e) : t(e * e, n / 2, r)
                                }, v = function(t) {
                                    for (var e = 0, n = t; n >= 4096;) e += 12, n /= 4096;
                                    for (; n >= 2;) e += 1, n /= 2;
                                    return e
                                };
                            r(r.P + r.F * ( !! s && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !n(3)(function() {
                                s.call({})
                            })), "Number", {
                                toFixed: function(t) {
                                    var e, n, r, s, a = o(this, c),
                                        f = i(t),
                                        y = "",
                                        g = "0";
                                    if (f < 0 || f > 20) throw RangeError(c);
                                    if (a != a) return "NaN";
                                    if (a <= -1e21 || a >= 1e21) return String(a);
                                    if (a < 0 && (y = "-", a = -a), a > 1e-21)
                                        if (e = v(a * d(2, 69, 1)) - 69, n = e < 0 ? a * d(2, -e, 1) : a / d(2, e, 1), n *= 4503599627370496, (e = 52 - e) > 0) {
                                            for (h(0, n), r = f; r >= 7;) h(1e7, 0), r -= 7;
                                            for (h(d(10, r, 1), 0), r = e - 1; r >= 23;) l(1 << 23), r -= 23;
                                            l(1 << r), h(1, 1), l(2), g = p()
                                        } else h(0, n), h(1 << -e, 0), g = p() + u.call("0", f);
                                    return f > 0 ? (s = g.length, g = y + (s <= f ? "0." + u.call("0", f - s) + g : g.slice(0, s - f) + "." + g.slice(s - f))) : g = y + g, g
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(3),
                                o = n(115),
                                u = 1..toPrecision;
                            r(r.P + r.F * (i(function() {
                                return "1" !== u.call(1, void 0)
                            }) || !i(function() {
                                u.call({})
                            })), "Number", {
                                toPrecision: function(t) {
                                    var e = o(this, "Number#toPrecision: incorrect invocation!");
                                    return void 0 === t ? u.call(e) : u.call(e, t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Number", {
                                EPSILON: Math.pow(2, -52)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(2).isFinite;
                            r(r.S, "Number", {
                                isFinite: function(t) {
                                    return "number" == typeof t && i(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Number", {
                                isInteger: n(116)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Number", {
                                isNaN: function(t) {
                                    return t != t
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(116),
                                o = Math.abs;
                            r(r.S, "Number", {
                                isSafeInteger: function(t) {
                                    return i(t) && o(t) <= 9007199254740991
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Number", {
                                MAX_SAFE_INTEGER: 9007199254740991
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Number", {
                                MIN_SAFE_INTEGER: -9007199254740991
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(114);
                            r(r.S + r.F * (Number.parseFloat != i), "Number", {
                                parseFloat: i
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(113);
                            r(r.S + r.F * (Number.parseInt != i), "Number", {
                                parseInt: i
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(117),
                                o = Math.sqrt,
                                u = Math.acosh;
                            r(r.S + r.F * !(u && 710 == Math.floor(u(Number.MAX_VALUE)) && u(1 / 0) == 1 / 0), "Math", {
                                acosh: function(t) {
                                    return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? Math.log(t) + Math.LN2 : i(t - 1 + o(t - 1) * o(t + 1))
                                }
                            })
                        },
                        function(t, e, n) {
                            function r(t) {
                                return isFinite(t = +t) && 0 != t ? t < 0 ? -r(-t) : Math.log(t + Math.sqrt(t * t + 1)) : t
                            }
                            var i = n(0),
                                o = Math.asinh;
                            i(i.S + i.F * !(o && 1 / o(0) > 0), "Math", {
                                asinh: r
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = Math.atanh;
                            r(r.S + r.F * !(i && 1 / i(-0) < 0), "Math", {
                                atanh: function(t) {
                                    return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(85);
                            r(r.S, "Math", {
                                cbrt: function(t) {
                                    return i(t = +t) * Math.pow(Math.abs(t), 1 / 3)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                clz32: function(t) {
                                    return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = Math.exp;
                            r(r.S, "Math", {
                                cosh: function(t) {
                                    return (i(t = +t) + i(-t)) / 2
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(86);
                            r(r.S + r.F * (i != Math.expm1), "Math", {
                                expm1: i
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                fround: n(118)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = Math.abs;
                            r(r.S, "Math", {
                                hypot: function(t, e) {
                                    for (var n, r, o = 0, u = 0, s = arguments.length, a = 0; u < s;) n = i(arguments[u++]), a < n ? (r = a / n, o = o * r * r + 1, a = n) : n > 0 ? (r = n / a, o += r * r) : o += n;
                                    return a === 1 / 0 ? 1 / 0 : a * Math.sqrt(o)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = Math.imul;
                            r(r.S + r.F * n(3)(function() {
                                return -5 != i(4294967295, 5) || 2 != i.length
                            }), "Math", {
                                imul: function(t, e) {
                                    var n = +t,
                                        r = +e,
                                        i = 65535 & n,
                                        o = 65535 & r;
                                    return 0 | i * o + ((65535 & n >>> 16) * o + i * (65535 & r >>> 16) << 16 >>> 0)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                log10: function(t) {
                                    return Math.log(t) * Math.LOG10E
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                log1p: n(117)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                log2: function(t) {
                                    return Math.log(t) / Math.LN2
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                sign: n(85)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(86),
                                o = Math.exp;
                            r(r.S + r.F * n(3)(function() {
                                return -2e-17 != !Math.sinh(-2e-17)
                            }), "Math", {
                                sinh: function(t) {
                                    return Math.abs(t = +t) < 1 ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(86),
                                o = Math.exp;
                            r(r.S, "Math", {
                                tanh: function(t) {
                                    var e = i(t = +t),
                                        n = i(-t);
                                    return e == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (e - n) / (o(t) + o(-t))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                trunc: function(t) {
                                    return (t > 0 ? Math.floor : Math.ceil)(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(35),
                                o = String.fromCharCode,
                                u = String.fromCodePoint;
                            r(r.S + r.F * ( !! u && 1 != u.length), "String", {
                                fromCodePoint: function(t) {
                                    for (var e, n = [], r = arguments.length, u = 0; r > u;) {
                                        if (e = +arguments[u++], i(e, 1114111) !== e) throw RangeError(e + " is not a valid code point");
                                        n.push(e < 65536 ? o(e) : o(55296 + ((e -= 65536) >> 10), e % 1024 + 56320))
                                    }
                                    return n.join("")
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(15),
                                o = n(8);
                            r(r.S, "String", {
                                raw: function(t) {
                                    for (var e = i(t.raw), n = o(e.length), r = arguments.length, u = [], s = 0; n > s;) u.push(String(e[s++])), s < r && u.push(String(arguments[s]));
                                    return u.join("")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(45)("trim", function(t) {
                                return function() {
                                    return t(this, 3)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(87)(!0);
                            n(88)(String, "String", function(t) {
                                this._t = String(t), this._i = 0
                            }, function() {
                                var t, e = this._t,
                                    n = this._i;
                                return n >= e.length ? {
                                    value: void 0,
                                    done: !0
                                } : (t = r(e, n), this._i += t.length, {
                                    value: t,
                                    done: !1
                                })
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(87)(!1);
                            r(r.P, "String", {
                                codePointAt: function(t) {
                                    return i(this, t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(8),
                                o = n(90),
                                u = "".endsWith;
                            r(r.P + r.F * n(91)("endsWith"), "String", {
                                endsWith: function(t) {
                                    var e = o(this, t, "endsWith"),
                                        n = arguments.length > 1 ? arguments[1] : void 0,
                                        r = i(e.length),
                                        s = void 0 === n ? r : Math.min(i(n), r),
                                        a = String(t);
                                    return u ? u.call(e, a, s) : e.slice(s - a.length, s) === a
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(90);
                            r(r.P + r.F * n(91)("includes"), "String", {
                                includes: function(t) {
                                    return !!~i(this, t, "includes").indexOf(t, arguments.length > 1 ? arguments[1] : void 0)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.P, "String", {
                                repeat: n(84)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(8),
                                o = n(90),
                                u = "".startsWith;
                            r(r.P + r.F * n(91)("startsWith"), "String", {
                                startsWith: function(t) {
                                    var e = o(this, t, "startsWith"),
                                        n = i(Math.min(arguments.length > 1 ? arguments[1] : void 0, e.length)),
                                        r = String(t);
                                    return u ? u.call(e, r, n) : e.slice(n, n + r.length) === r
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("anchor", function(t) {
                                return function(e) {
                                    return t(this, "a", "name", e)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("big", function(t) {
                                return function() {
                                    return t(this, "big", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("blink", function(t) {
                                return function() {
                                    return t(this, "blink", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("bold", function(t) {
                                return function() {
                                    return t(this, "b", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("fixed", function(t) {
                                return function() {
                                    return t(this, "tt", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("fontcolor", function(t) {
                                return function(e) {
                                    return t(this, "font", "color", e)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("fontsize", function(t) {
                                return function(e) {
                                    return t(this, "font", "size", e)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("italics", function(t) {
                                return function() {
                                    return t(this, "i", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("link", function(t) {
                                return function(e) {
                                    return t(this, "a", "href", e)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("small", function(t) {
                                return function() {
                                    return t(this, "small", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("strike", function(t) {
                                return function() {
                                    return t(this, "strike", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("sub", function(t) {
                                return function() {
                                    return t(this, "sub", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            n(14)("sup", function(t) {
                                return function() {
                                    return t(this, "sup", "", "")
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Date", {
                                now: function() {
                                    return (new Date).getTime()
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(9),
                                o = n(22);
                            r(r.P + r.F * n(3)(function() {
                                return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
                                    toISOString: function() {
                                        return 1
                                    }
                                })
                            }), "Date", {
                                toJSON: function(t) {
                                    var e = i(this),
                                        n = o(e);
                                    return "number" != typeof n || isFinite(n) ? e.toISOString() : null
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(221);
                            r(r.P + r.F * (Date.prototype.toISOString !== i), "Date", {
                                toISOString: i
                            })
                        },
                        function(t, e, n) {
                            var r = n(3),
                                i = Date.prototype.getTime,
                                o = Date.prototype.toISOString,
                                u = function(t) {
                                    return t > 9 ? t : "0" + t
                                };
                            t.exports = r(function() {
                                return "0385-07-25T07:06:39.999Z" != o.call(new Date(-5e13 - 1))
                            }) || !r(function() {
                                o.call(new Date(NaN))
                            }) ? function() {
                                if (!isFinite(i.call(this))) throw RangeError("Invalid time value");
                                var t = this,
                                    e = t.getUTCFullYear(),
                                    n = t.getUTCMilliseconds(),
                                    r = e < 0 ? "-" : e > 9999 ? "+" : "";
                                return r + ("00000" + Math.abs(e)).slice(r ? -6 : -4) + "-" + u(t.getUTCMonth() + 1) + "-" + u(t.getUTCDate()) + "T" + u(t.getUTCHours()) + ":" + u(t.getUTCMinutes()) + ":" + u(t.getUTCSeconds()) + "." + (n > 99 ? n : "0" + u(n)) + "Z"
                            } : o
                        },
                        function(t, e, n) {
                            var r = Date.prototype,
                                i = r.toString,
                                o = r.getTime;
                            new Date(NaN) + "" != "Invalid Date" && n(13)(r, "toString", function() {
                                var t = o.call(this);
                                return t === t ? i.call(this) : "Invalid Date"
                            })
                        },
                        function(t, e, n) {
                            var r = n(5)("toPrimitive"),
                                i = Date.prototype;
                            r in i || n(12)(i, r, n(224))
                        },
                        function(t, e, n) {
                            var r = n(1),
                                i = n(22);
                            t.exports = function(t) {
                                if ("string" !== t && "number" !== t && "default" !== t) throw TypeError("Incorrect hint");
                                return i(r(this), "number" != t)
                            }
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Array", {
                                isArray: n(57)
                            })
                        },
                        function(t, e, n) {
                            var r = n(18),
                                i = n(0),
                                o = n(9),
                                u = n(119),
                                s = n(92),
                                a = n(8),
                                f = n(93),
                                c = n(94);
                            i(i.S + i.F * !n(59)(function(t) {
                                Array.from(t)
                            }), "Array", {
                                from: function(t) {
                                    var e, n, i, h, l = o(t),
                                        p = "function" == typeof this ? this : Array,
                                        d = arguments.length,
                                        v = d > 1 ? arguments[1] : void 0,
                                        y = void 0 !== v,
                                        g = 0,
                                        _ = c(l);
                                    if (y && (v = r(v, d > 2 ? arguments[2] : void 0, 2)), void 0 == _ || p == Array && s(_))
                                        for (e = a(l.length), n = new p(e); e > g; g++) f(n, g, y ? v(l[g], g) : l[g]);
                                    else
                                        for (h = _.call(l), n = new p; !(i = h.next()).done; g++) f(n, g, y ? u(h, v, [i.value, g], !0) : i.value);
                                    return n.length = g, n
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(93);
                            r(r.S + r.F * n(3)(function() {
                                function t() {}
                                return !(Array.of.call(t) instanceof t)
                            }), "Array", {
                                of: function() {
                                    for (var t = 0, e = arguments.length, n = new("function" == typeof this ? this : Array)(e); e > t;) i(n, t, arguments[t++]);
                                    return n.length = e, n
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(15),
                                o = [].join;
                            r(r.P + r.F * (n(49) != Object || !n(20)(o)), "Array", {
                                join: function(t) {
                                    return o.call(i(this), void 0 === t ? "," : t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(80),
                                o = n(19),
                                u = n(35),
                                s = n(8),
                                a = [].slice;
                            r(r.P + r.F * n(3)(function() {
                                i && a.call(i)
                            }), "Array", {
                                slice: function(t, e) {
                                    var n = s(this.length),
                                        r = o(this);
                                    if (e = void 0 === e ? n : e, "Array" == r) return a.call(this, t, e);
                                    for (var i = u(t, n), f = u(e, n), c = s(f - i), h = Array(c), l = 0; l < c; l++) h[l] = "String" == r ? this.charAt(i + l) : this[i + l];
                                    return h
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(10),
                                o = n(9),
                                u = n(3),
                                s = [].sort,
                                a = [1, 2, 3];
                            r(r.P + r.F * (u(function() {
                                a.sort(void 0)
                            }) || !u(function() {
                                a.sort(null)
                            }) || !n(20)(s)), "Array", {
                                sort: function(t) {
                                    return void 0 === t ? s.call(o(this)) : s.call(o(this), i(t))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(0),
                                o = n(20)([].forEach, !0);
                            r(r.P + r.F * !o, "Array", {
                                forEach: function(t) {
                                    return i(this, t, arguments[1])
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(4),
                                i = n(57),
                                o = n(5)("species");
                            t.exports = function(t) {
                                var e;
                                return i(t) && (e = t.constructor, "function" != typeof e || e !== Array && !i(e.prototype) || (e = void 0), r(e) && null === (e = e[o]) && (e = void 0)), void 0 === e ? Array : e
                            }
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(1);
                            r(r.P + r.F * !n(20)([].map, !0), "Array", {
                                map: function(t) {
                                    return i(this, t, arguments[1])
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(2);
                            r(r.P + r.F * !n(20)([].filter, !0), "Array", {
                                filter: function(t) {
                                    return i(this, t, arguments[1])
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(3);
                            r(r.P + r.F * !n(20)([].some, !0), "Array", {
                                some: function(t) {
                                    return i(this, t, arguments[1])
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(4);
                            r(r.P + r.F * !n(20)([].every, !0), "Array", {
                                every: function(t) {
                                    return i(this, t, arguments[1])
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(120);
                            r(r.P + r.F * !n(20)([].reduce, !0), "Array", {
                                reduce: function(t) {
                                    return i(this, t, arguments.length, arguments[1], !1)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(120);
                            r(r.P + r.F * !n(20)([].reduceRight, !0), "Array", {
                                reduceRight: function(t) {
                                    return i(this, t, arguments.length, arguments[1], !0)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(55)(!1),
                                o = [].indexOf,
                                u = !! o && 1 / [1].indexOf(1, -0) < 0;
                            r(r.P + r.F * (u || !n(20)(o)), "Array", {
                                indexOf: function(t) {
                                    return u ? o.apply(this, arguments) || 0 : i(this, t, arguments[1])
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(15),
                                o = n(24),
                                u = n(8),
                                s = [].lastIndexOf,
                                a = !! s && 1 / [1].lastIndexOf(1, -0) < 0;
                            r(r.P + r.F * (a || !n(20)(s)), "Array", {
                                lastIndexOf: function(t) {
                                    if (a) return s.apply(this, arguments) || 0;
                                    var e = i(this),
                                        n = u(e.length),
                                        r = n - 1;
                                    for (arguments.length > 1 && (r = Math.min(r, o(arguments[1]))), r < 0 && (r = n + r); r >= 0; r--)
                                        if (r in e && e[r] === t) return r || 0;
                                    return -1
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.P, "Array", {
                                copyWithin: n(121)
                            }), n(30)("copyWithin")
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.P, "Array", {
                                fill: n(96)
                            }), n(30)("fill")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(5),
                                o = !0;
                            "find" in [] && Array(1).find(function() {
                                o = !1
                            }), r(r.P + r.F * o, "Array", {
                                find: function(t) {
                                    return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
                                }
                            }), n(30)("find")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(26)(6),
                                o = "findIndex",
                                u = !0;
                            o in [] && Array(1)[o](function() {
                                u = !1
                            }), r(r.P + r.F * u, "Array", {
                                findIndex: function(t) {
                                    return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
                                }
                            }), n(30)(o)
                        },
                        function(t, e, n) {
                            n(38)("Array")
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(83),
                                o = n(7).f,
                                u = n(37).f,
                                s = n(58),
                                a = n(60),
                                f = r.RegExp,
                                c = f,
                                h = f.prototype,
                                l = /a/g,
                                p = /a/g,
                                d = new f(l) !== l;
                            if (n(6) && (!d || n(3)(function() {
                                return p[n(5)("match")] = !1, f(l) != l || f(p) == p || "/a/i" != f(l, "i")
                            }))) {
                                f = function(t, e) {
                                    var n = this instanceof f,
                                        r = s(t),
                                        o = void 0 === e;
                                    return !n && r && t.constructor === f && o ? t : i(d ? new c(r && !o ? t.source : t, e) : c((r = t instanceof f) ? t.source : t, r && o ? a.call(t) : e), n ? this : h, f)
                                };
                                for (var v = u(c), y = 0; v.length > y;)! function(t) {
                                    t in f || o(f, t, {
                                        configurable: !0,
                                        get: function() {
                                            return c[t]
                                        },
                                        set: function(e) {
                                            c[t] = e
                                        }
                                    })
                                }(v[y++]);
                                h.constructor = f, f.prototype = h, n(13)(r, "RegExp", f)
                            }
                            n(38)("RegExp")
                        },
                        function(t, e, n) {
                            n(123);
                            var r = n(1),
                                i = n(60),
                                o = n(6),
                                u = /./.toString,
                                s = function(t) {
                                    n(13)(RegExp.prototype, "toString", t, !0)
                                };
                            n(3)(function() {
                                return "/a/b" != u.call({
                                    source: "a",
                                    flags: "b"
                                })
                            }) ? s(function() {
                                var t = r(this);
                                return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0)
                            }) : "toString" != u.name && s(function() {
                                return u.call(this)
                            })
                        },
                        function(t, e, n) {
                            n(61)("match", 1, function(t, e, n) {
                                return [function(n) {
                                    var r = t(this),
                                        i = void 0 == n ? void 0 : n[e];
                                    return void 0 !== i ? i.call(n, r) : new RegExp(n)[e](String(r))
                                }, n]
                            })
                        },
                        function(t, e, n) {
                            n(61)("replace", 2, function(t, e, n) {
                                return [function(r, i) {
                                    var o = t(this),
                                        u = void 0 == r ? void 0 : r[e];
                                    return void 0 !== u ? u.call(r, o, i) : n.call(String(o), r, i)
                                }, n]
                            })
                        },
                        function(t, e, n) {
                            n(61)("search", 1, function(t, e, n) {
                                return [function(n) {
                                    var r = t(this),
                                        i = void 0 == n ? void 0 : n[e];
                                    return void 0 !== i ? i.call(n, r) : new RegExp(n)[e](String(r))
                                }, n]
                            })
                        },
                        function(t, e, n) {
                            n(61)("split", 2, function(t, e, r) {
                                var i = n(58),
                                    o = r,
                                    u = [].push,
                                    s = "length";
                                if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[s] || 2 != "ab".split(/(?:ab)*/)[s] || 4 != ".".split(/(.?)(.?)/)[s] || ".".split(/()()/)[s] > 1 || "".split(/.?/)[s]) {
                                    var a = void 0 === /()??/.exec("")[1];
                                    r = function(t, e) {
                                        var n = String(this);
                                        if (void 0 === t && 0 === e) return [];
                                        if (!i(t)) return o.call(n, t, e);
                                        var r, f, c, h, l, p = [],
                                            d = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""),
                                            v = 0,
                                            y = void 0 === e ? 4294967295 : e >>> 0,
                                            g = new RegExp(t.source, d + "g");
                                        for (a || (r = new RegExp("^" + g.source + "$(?!\\s)", d));
                                            (f = g.exec(n)) && !((c = f.index + f[0][s]) > v && (p.push(n.slice(v, f.index)), !a && f[s] > 1 && f[0].replace(r, function() {
                                                for (l = 1; l < arguments[s] - 2; l++) void 0 === arguments[l] && (f[l] = void 0)
                                            }), f[s] > 1 && f.index < n[s] && u.apply(p, f.slice(1)), h = f[0][s], v = c, p[s] >= y));) g.lastIndex === f.index && g.lastIndex++;
                                        return v === n[s] ? !h && g.test("") || p.push("") : p.push(n.slice(v)), p[s] > y ? p.slice(0, y) : p
                                    }
                                } else "0".split(void 0, 0)[s] && (r = function(t, e) {
                                    return void 0 === t && 0 === e ? [] : o.call(this, t, e)
                                });
                                return [function(n, i) {
                                    var o = t(this),
                                        u = void 0 == n ? void 0 : n[e];
                                    return void 0 !== u ? u.call(n, o, i) : r.call(String(o), n, i)
                                }, r]
                            })
                        },
                        function(t, e, n) {
                            var r, i, o, u, s = n(33),
                                a = n(2),
                                f = n(18),
                                c = n(51),
                                h = n(0),
                                l = n(4),
                                p = n(10),
                                d = n(39),
                                v = n(40),
                                y = n(62),
                                g = n(98).set,
                                _ = n(99)(),
                                b = n(100),
                                w = n(124),
                                m = n(125),
                                S = a.TypeError,
                                E = a.process,
                                O = a.Promise,
                                A = "process" == c(E),
                                N = function() {}, T = i = b.f,
                                B = !! function() {
                                    try {
                                        var t = O.resolve(1),
                                            e = (t.constructor = {})[n(5)("species")] = function(t) {
                                                t(N, N)
                                            };
                                        return (A || "function" == typeof PromiseRejectionEvent) && t.then(N) instanceof e
                                    } catch (t) {}
                                }(),
                                I = function(t) {
                                    var e;
                                    return !(!l(t) || "function" != typeof(e = t.then)) && e
                                }, R = function(t, e) {
                                    if (!t._n) {
                                        t._n = !0;
                                        var n = t._c;
                                        _(function() {
                                            for (var r = t._v, i = 1 == t._s, o = 0; n.length > o;)! function(e) {
                                                var n, o, u = i ? e.ok : e.fail,
                                                    s = e.resolve,
                                                    a = e.reject,
                                                    f = e.domain;
                                                try {
                                                    u ? (i || (2 == t._h && D(t), t._h = 1), !0 === u ? n = r : (f && f.enter(), n = u(r), f && f.exit()), n === e.promise ? a(S("Promise-chain cycle")) : (o = I(n)) ? o.call(n, s, a) : s(n)) : a(r)
                                                } catch (t) {
                                                    a(t)
                                                }
                                            }(n[o++]);
                                            t._c = [], t._n = !1, e && !t._h && P(t)
                                        })
                                    }
                                }, P = function(t) {
                                    g.call(a, function() {
                                        var e, n, r, i = t._v,
                                            o = x(t);
                                        if (o && (e = w(function() {
                                            A ? E.emit("unhandledRejection", i, t) : (n = a.onunhandledrejection) ? n({
                                                promise: t,
                                                reason: i
                                            }) : (r = a.console) && r.error && r.error("Unhandled promise rejection", i)
                                        }), t._h = A || x(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v
                                    })
                                }, x = function t(e) {
                                    if (1 == e._h) return !1;
                                    for (var n, r = e._a || e._c, i = 0; r.length > i;)
                                        if (n = r[i++], n.fail || !t(n.promise)) return !1;
                                    return !0
                                }, D = function(t) {
                                    g.call(a, function() {
                                        var e;
                                        A ? E.emit("rejectionHandled", t) : (e = a.onrejectionhandled) && e({
                                            promise: t,
                                            reason: t._v
                                        })
                                    })
                                }, M = function(t) {
                                    var e = this;
                                    e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), R(e, !0))
                                }, k = function t(e) {
                                    var n, r = this;
                                    if (!r._d) {
                                        r._d = !0, r = r._w || r;
                                        try {
                                            if (r === e) throw S("Promise can't be resolved itself");
                                            (n = I(e)) ? _(function() {
                                                var i = {
                                                    _w: r,
                                                    _d: !1
                                                };
                                                try {
                                                    n.call(e, f(t, i, 1), f(M, i, 1))
                                                } catch (t) {
                                                    M.call(i, t)
                                                }
                                            }) : (r._v = e, r._s = 1, R(r, !1))
                                        } catch (t) {
                                            M.call({
                                                _w: r,
                                                _d: !1
                                            }, t)
                                        }
                                    }
                                };
                            B || (O = function(t) {
                                d(this, O, "Promise", "_h"), p(t), r.call(this);
                                try {
                                    t(f(k, this, 1), f(M, this, 1))
                                } catch (t) {
                                    M.call(this, t)
                                }
                            }, r = function(t) {
                                this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
                            }, r.prototype = n(41)(O.prototype, {
                                then: function(t, e) {
                                    var n = T(y(this, O));
                                    return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = A ? E.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise
                                },
                                catch: function(t) {
                                    return this.then(void 0, t)
                                }
                            }), o = function() {
                                var t = new r;
                                this.promise = t, this.resolve = f(k, t, 1), this.reject = f(M, t, 1)
                            }, b.f = T = function(t) {
                                return t === O || t === u ? new o(t) : i(t)
                            }), h(h.G + h.W + h.F * !B, {
                                Promise: O
                            }), n(44)(O, "Promise"), n(38)("Promise"), u = n(21).Promise, h(h.S + h.F * !B, "Promise", {
                                reject: function(t) {
                                    var e = T(this);
                                    return (0, e.reject)(t), e.promise
                                }
                            }), h(h.S + h.F * (s || !B), "Promise", {
                                resolve: function(t) {
                                    return m(s && this === u ? O : this, t)
                                }
                            }), h(h.S + h.F * !(B && n(59)(function(t) {
                                O.all(t).
                                catch (N)
                            })), "Promise", {
                                all: function(t) {
                                    var e = this,
                                        n = T(e),
                                        r = n.resolve,
                                        i = n.reject,
                                        o = w(function() {
                                            var n = [],
                                                o = 0,
                                                u = 1;
                                            v(t, !1, function(t) {
                                                var s = o++,
                                                    a = !1;
                                                n.push(void 0), u++, e.resolve(t).then(function(t) {
                                                    a || (a = !0, n[s] = t, --u || r(n))
                                                }, i)
                                            }), --u || r(n)
                                        });
                                    return o.e && i(o.v), n.promise
                                },
                                race: function(t) {
                                    var e = this,
                                        n = T(e),
                                        r = n.reject,
                                        i = w(function() {
                                            v(t, !1, function(t) {
                                                e.resolve(t).then(n.resolve, r)
                                            })
                                        });
                                    return i.e && r(i.v), n.promise
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(130),
                                i = n(47);
                            n(63)("WeakSet", function(t) {
                                return function() {
                                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                                }
                            }, {
                                add: function(t) {
                                    return r.def(i(this, "WeakSet"), t, !0)
                                }
                            }, r, !1, !0)
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(64),
                                o = n(101),
                                u = n(1),
                                s = n(35),
                                a = n(8),
                                f = n(4),
                                c = n(2).ArrayBuffer,
                                h = n(62),
                                l = o.ArrayBuffer,
                                p = o.DataView,
                                d = i.ABV && c.isView,
                                v = l.prototype.slice,
                                y = i.VIEW;
                            r(r.G + r.W + r.F * (c !== l), {
                                ArrayBuffer: l
                            }), r(r.S + r.F * !i.CONSTR, "ArrayBuffer", {
                                isView: function(t) {
                                    return d && d(t) || f(t) && y in t
                                }
                            }), r(r.P + r.U + r.F * n(3)(function() {
                                return !new l(2).slice(1, void 0).byteLength
                            }), "ArrayBuffer", {
                                slice: function(t, e) {
                                    if (void 0 !== v && void 0 === e) return v.call(u(this), t);
                                    for (var n = u(this).byteLength, r = s(t, n), i = s(void 0 === e ? n : e, n), o = new(h(this, l))(a(i - r)), f = new p(this), c = new p(o), d = 0; r < i;) c.setUint8(d++, f.getUint8(r++));
                                    return o
                                }
                            }), n(38)("ArrayBuffer")
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.G + r.W + r.F * !n(64).ABV, {
                                DataView: n(101).DataView
                            })
                        },
                        function(t, e, n) {
                            n(27)("Int8", 1, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Uint8", 1, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Uint8", 1, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            }, !0)
                        },
                        function(t, e, n) {
                            n(27)("Int16", 2, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Uint16", 2, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Int32", 4, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Uint32", 4, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Float32", 4, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(27)("Float64", 8, function(t) {
                                return function(e, n, r) {
                                    return t(this, e, n, r)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(10),
                                o = n(1),
                                u = (n(2).Reflect || {}).apply,
                                s = Function.apply;
                            r(r.S + r.F * !n(3)(function() {
                                u(function() {})
                            }), "Reflect", {
                                apply: function(t, e, n) {
                                    var r = i(t),
                                        a = o(n);
                                    return u ? u(r, e, a) : s.call(r, e, a)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(36),
                                o = n(10),
                                u = n(1),
                                s = n(4),
                                a = n(3),
                                f = n(111),
                                c = (n(2).Reflect || {}).construct,
                                h = a(function() {
                                    function t() {}
                                    return !(c(function() {}, [], t) instanceof t)
                                }),
                                l = !a(function() {
                                    c(function() {})
                                });
                            r(r.S + r.F * (h || l), "Reflect", {
                                construct: function(t, e) {
                                    o(t), u(e);
                                    var n = arguments.length < 3 ? t : o(arguments[2]);
                                    if (l && !h) return c(t, e, n);
                                    if (t == n) {
                                        switch (e.length) {
                                            case 0:
                                                return new t;
                                            case 1:
                                                return new t(e[0]);
                                            case 2:
                                                return new t(e[0], e[1]);
                                            case 3:
                                                return new t(e[0], e[1], e[2]);
                                            case 4:
                                                return new t(e[0], e[1], e[2], e[3])
                                        }
                                        var r = [null];
                                        return r.push.apply(r, e), new(f.apply(t, r))
                                    }
                                    var a = n.prototype,
                                        p = i(s(a) ? a : Object.prototype),
                                        d = Function.apply.call(t, p, e);
                                    return s(d) ? d : p
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(7),
                                i = n(0),
                                o = n(1),
                                u = n(22);
                            i(i.S + i.F * n(3)(function() {
                                Reflect.defineProperty(r.f({}, 1, {
                                    value: 1
                                }), 1, {
                                    value: 2
                                })
                            }), "Reflect", {
                                defineProperty: function(t, e, n) {
                                    o(t), e = u(e, !0), o(n);
                                    try {
                                        return r.f(t, e, n), !0
                                    } catch (t) {
                                        return !1
                                    }
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(16).f,
                                o = n(1);
                            r(r.S, "Reflect", {
                                deleteProperty: function(t, e) {
                                    var n = i(o(t), e);
                                    return !(n && !n.configurable) && delete t[e]
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(1),
                                o = function(t) {
                                    this._t = i(t), this._i = 0;
                                    var e, n = this._k = [];
                                    for (e in t) n.push(e)
                                };
                            n(89)(o, "Object", function() {
                                var t, e = this,
                                    n = e._k;
                                do {
                                    if (e._i >= n.length) return {
                                        value: void 0,
                                        done: !0
                                    }
                                } while (!((t = n[e._i++]) in e._t));
                                return {
                                    value: t,
                                    done: !1
                                }
                            }), r(r.S, "Reflect", {
                                enumerate: function(t) {
                                    return new o(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            function r(t, e) {
                                var n, s, c = arguments.length < 3 ? t : arguments[2];
                                return f(t) === c ? t[e] : (n = i.f(t, e)) ? u(n, "value") ? n.value : void 0 !== n.get ? n.get.call(c) : void 0 : a(s = o(t)) ? r(s, e, c) : void 0
                            }
                            var i = n(16),
                                o = n(17),
                                u = n(11),
                                s = n(0),
                                a = n(4),
                                f = n(1);
                            s(s.S, "Reflect", {
                                get: r
                            })
                        },
                        function(t, e, n) {
                            var r = n(16),
                                i = n(0),
                                o = n(1);
                            i(i.S, "Reflect", {
                                getOwnPropertyDescriptor: function(t, e) {
                                    return r.f(o(t), e)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(17),
                                o = n(1);
                            r(r.S, "Reflect", {
                                getPrototypeOf: function(t) {
                                    return i(o(t))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Reflect", {
                                has: function(t, e) {
                                    return e in t
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(1),
                                o = Object.isExtensible;
                            r(r.S, "Reflect", {
                                isExtensible: function(t) {
                                    return i(t), !o || o(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Reflect", {
                                ownKeys: n(132)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(1),
                                o = Object.preventExtensions;
                            r(r.S, "Reflect", {
                                preventExtensions: function(t) {
                                    i(t);
                                    try {
                                        return o && o(t), !0
                                    } catch (t) {
                                        return !1
                                    }
                                }
                            })
                        },
                        function(t, e, n) {
                            function r(t, e, n) {
                                var a, l, p = arguments.length < 4 ? t : arguments[3],
                                    d = o.f(c(t), e);
                                if (!d) {
                                    if (h(l = u(t))) return r(l, e, n, p);
                                    d = f(0)
                                }
                                return s(d, "value") ? !(!1 === d.writable || !h(p)) && (a = o.f(p, e) || f(0), a.value = n, i.f(p, e, a), !0) : void 0 !== d.set && (d.set.call(p, n), !0)
                            }
                            var i = n(7),
                                o = n(16),
                                u = n(17),
                                s = n(11),
                                a = n(0),
                                f = n(31),
                                c = n(1),
                                h = n(4);
                            a(a.S, "Reflect", {
                                set: r
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(81);
                            i && r(r.S, "Reflect", {
                                setPrototypeOf: function(t, e) {
                                    i.check(t, e);
                                    try {
                                        return i.set(t, e), !0
                                    } catch (t) {
                                        return !1
                                    }
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(55)(!0);
                            r(r.P, "Array", {
                                includes: function(t) {
                                    return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
                                }
                            }), n(30)("includes")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(133),
                                o = n(9),
                                u = n(8),
                                s = n(10),
                                a = n(95);
                            r(r.P, "Array", {
                                flatMap: function(t) {
                                    var e, n, r = o(this);
                                    return s(t), e = u(r.length), n = a(r, 0), i(n, r, r, e, 0, 1, t, arguments[1]), n
                                }
                            }), n(30)("flatMap")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(133),
                                o = n(9),
                                u = n(8),
                                s = n(24),
                                a = n(95);
                            r(r.P, "Array", {
                                flatten: function() {
                                    var t = arguments[0],
                                        e = o(this),
                                        n = u(e.length),
                                        r = a(e, 0);
                                    return i(r, e, e, n, 0, void 0 === t ? 1 : s(t)), r
                                }
                            }), n(30)("flatten")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(87)(!0);
                            r(r.P, "String", {
                                at: function(t) {
                                    return i(this, t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(134);
                            r(r.P, "String", {
                                padStart: function(t) {
                                    return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !0)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(134);
                            r(r.P, "String", {
                                padEnd: function(t) {
                                    return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !1)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(45)("trimLeft", function(t) {
                                return function() {
                                    return t(this, 1)
                                }
                            }, "trimStart")
                        },
                        function(t, e, n) {
                            n(45)("trimRight", function(t) {
                                return function() {
                                    return t(this, 2)
                                }
                            }, "trimEnd")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(23),
                                o = n(8),
                                u = n(58),
                                s = n(60),
                                a = RegExp.prototype,
                                f = function(t, e) {
                                    this._r = t, this._s = e
                                };
                            n(89)(f, "RegExp String", function() {
                                var t = this._r.exec(this._s);
                                return {
                                    value: t,
                                    done: null === t
                                }
                            }), r(r.P, "String", {
                                matchAll: function(t) {
                                    if (i(this), !u(t)) throw TypeError(t + " is not a regexp!");
                                    var e = String(this),
                                        n = "flags" in a ? String(t.flags) : s.call(t),
                                        r = new RegExp(t.source, ~n.indexOf("g") ? n : "g" + n);
                                    return r.lastIndex = o(t.lastIndex), new f(r, e)
                                }
                            })
                        },
                        function(t, e, n) {
                            n(77)("asyncIterator")
                        },
                        function(t, e, n) {
                            n(77)("observable")
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(132),
                                o = n(15),
                                u = n(16),
                                s = n(93);
                            r(r.S, "Object", {
                                getOwnPropertyDescriptors: function(t) {
                                    for (var e, n, r = o(t), a = u.f, f = i(r), c = {}, h = 0; f.length > h;) void 0 !== (n = a(r, e = f[h++])) && s(c, e, n);
                                    return c
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(135)(!1);
                            r(r.S, "Object", {
                                values: function(t) {
                                    return i(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(135)(!0);
                            r(r.S, "Object", {
                                entries: function(t) {
                                    return i(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(9),
                                o = n(10),
                                u = n(7);
                            n(6) && r(r.P + n(65), "Object", {
                                __defineGetter__: function(t, e) {
                                    u.f(i(this), t, {
                                        get: o(e),
                                        enumerable: !0,
                                        configurable: !0
                                    })
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(9),
                                o = n(10),
                                u = n(7);
                            n(6) && r(r.P + n(65), "Object", {
                                __defineSetter__: function(t, e) {
                                    u.f(i(this), t, {
                                        set: o(e),
                                        enumerable: !0,
                                        configurable: !0
                                    })
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(9),
                                o = n(22),
                                u = n(17),
                                s = n(16).f;
                            n(6) && r(r.P + n(65), "Object", {
                                __lookupGetter__: function(t) {
                                    var e, n = i(this),
                                        r = o(t, !0);
                                    do {
                                        if (e = s(n, r)) return e.get
                                    } while (n = u(n))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(9),
                                o = n(22),
                                u = n(17),
                                s = n(16).f;
                            n(6) && r(r.P + n(65), "Object", {
                                __lookupSetter__: function(t) {
                                    var e, n = i(this),
                                        r = o(t, !0);
                                    do {
                                        if (e = s(n, r)) return e.set
                                    } while (n = u(n))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.P + r.R, "Map", {
                                toJSON: n(136)("Map")
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.P + r.R, "Set", {
                                toJSON: n(136)("Set")
                            })
                        },
                        function(t, e, n) {
                            n(66)("Map")
                        },
                        function(t, e, n) {
                            n(66)("Set")
                        },
                        function(t, e, n) {
                            n(66)("WeakMap")
                        },
                        function(t, e, n) {
                            n(66)("WeakSet")
                        },
                        function(t, e, n) {
                            n(67)("Map")
                        },
                        function(t, e, n) {
                            n(67)("Set")
                        },
                        function(t, e, n) {
                            n(67)("WeakMap")
                        },
                        function(t, e, n) {
                            n(67)("WeakSet")
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.G, {
                                global: n(2)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "System", {
                                global: n(2)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(19);
                            r(r.S, "Error", {
                                isError: function(t) {
                                    return "Error" === i(t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                clamp: function(t, e, n) {
                                    return Math.min(n, Math.max(e, t))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                DEG_PER_RAD: Math.PI / 180
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = 180 / Math.PI;
                            r(r.S, "Math", {
                                degrees: function(t) {
                                    return t * i
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(138),
                                o = n(118);
                            r(r.S, "Math", {
                                fscale: function(t, e, n, r, u) {
                                    return o(i(t, e, n, r, u))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                iaddh: function(t, e, n, r) {
                                    var i = t >>> 0,
                                        o = e >>> 0,
                                        u = n >>> 0;
                                    return o + (r >>> 0) + ((i & u | (i | u) & ~(i + u >>> 0)) >>> 31) | 0
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                isubh: function(t, e, n, r) {
                                    var i = t >>> 0,
                                        o = e >>> 0,
                                        u = n >>> 0;
                                    return o - (r >>> 0) - ((~i & u | ~(i ^ u) & i - u >>> 0) >>> 31) | 0
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                imulh: function(t, e) {
                                    var n = +t,
                                        r = +e,
                                        i = 65535 & n,
                                        o = 65535 & r,
                                        u = n >> 16,
                                        s = r >> 16,
                                        a = (u * o >>> 0) + (i * o >>> 16);
                                    return u * s + (a >> 16) + ((i * s >>> 0) + (65535 & a) >> 16)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                RAD_PER_DEG: 180 / Math.PI
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = Math.PI / 180;
                            r(r.S, "Math", {
                                radians: function(t) {
                                    return t * i
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                scale: n(138)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                umulh: function(t, e) {
                                    var n = +t,
                                        r = +e,
                                        i = 65535 & n,
                                        o = 65535 & r,
                                        u = n >>> 16,
                                        s = r >>> 16,
                                        a = (u * o >>> 0) + (i * o >>> 16);
                                    return u * s + (a >>> 16) + ((i * s >>> 0) + (65535 & a) >>> 16)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0);
                            r(r.S, "Math", {
                                signbit: function(t) {
                                    return (t = +t) != t ? t : 0 == t ? 1 / t == 1 / 0 : t > 0
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(21),
                                o = n(2),
                                u = n(62),
                                s = n(125);
                            r(r.P + r.R, "Promise", {
                                finally: function(t) {
                                    var e = u(this, i.Promise || o.Promise),
                                        n = "function" == typeof t;
                                    return this.then(n ? function(n) {
                                        return s(e, t()).then(function() {
                                            return n
                                        })
                                    } : t, n ? function(n) {
                                        return s(e, t()).then(function() {
                                            throw n
                                        })
                                    } : t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(100),
                                o = n(124);
                            r(r.S, "Promise", {
                                try: function(t) {
                                    var e = i.f(this),
                                        n = o(t);
                                    return (n.e ? e.reject : e.resolve)(n.v), e.promise
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = r.key,
                                u = r.set;
                            r.exp({
                                defineMetadata: function(t, e, n, r) {
                                    u(t, e, i(n), o(r))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = r.key,
                                u = r.map,
                                s = r.store;
                            r.exp({
                                deleteMetadata: function(t, e) {
                                    var n = arguments.length < 3 ? void 0 : o(arguments[2]),
                                        r = u(i(e), n, !1);
                                    if (void 0 === r || !r.delete(t)) return !1;
                                    if (r.size) return !0;
                                    var a = s.get(e);
                                    return a.delete(n), !! a.size || s.delete(e)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = n(17),
                                u = r.has,
                                s = r.get,
                                a = r.key,
                                f = function t(e, n, r) {
                                    if (u(e, n, r)) return s(e, n, r);
                                    var i = o(n);
                                    return null !== i ? t(e, i, r) : void 0
                                };
                            r.exp({
                                getMetadata: function(t, e) {
                                    return f(t, i(e), arguments.length < 3 ? void 0 : a(arguments[2]))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(128),
                                i = n(137),
                                o = n(28),
                                u = n(1),
                                s = n(17),
                                a = o.keys,
                                f = o.key,
                                c = function t(e, n) {
                                    var o = a(e, n),
                                        u = s(e);
                                    if (null === u) return o;
                                    var f = t(u, n);
                                    return f.length ? o.length ? i(new r(o.concat(f))) : f : o
                                };
                            o.exp({
                                getMetadataKeys: function(t) {
                                    return c(u(t), arguments.length < 2 ? void 0 : f(arguments[1]))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = r.get,
                                u = r.key;
                            r.exp({
                                getOwnMetadata: function(t, e) {
                                    return o(t, i(e), arguments.length < 3 ? void 0 : u(arguments[2]))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = r.keys,
                                u = r.key;
                            r.exp({
                                getOwnMetadataKeys: function(t) {
                                    return o(i(t), arguments.length < 2 ? void 0 : u(arguments[1]))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = n(17),
                                u = r.has,
                                s = r.key,
                                a = function t(e, n, r) {
                                    if (u(e, n, r)) return !0;
                                    var i = o(n);
                                    return null !== i && t(e, i, r)
                                };
                            r.exp({
                                hasMetadata: function(t, e) {
                                    return a(t, i(e), arguments.length < 3 ? void 0 : s(arguments[2]))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = r.has,
                                u = r.key;
                            r.exp({
                                hasOwnMetadata: function(t, e) {
                                    return o(t, i(e), arguments.length < 3 ? void 0 : u(arguments[2]))
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(28),
                                i = n(1),
                                o = n(10),
                                u = r.key,
                                s = r.set;
                            r.exp({
                                metadata: function(t, e) {
                                    return function(n, r) {
                                        s(t, e, (void 0 !== r ? i : o)(n), u(r))
                                    }
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(99)(),
                                o = n(2).process,
                                u = "process" == n(19)(o);
                            r(r.G, {
                                asap: function(t) {
                                    var e = u && o.domain;
                                    i(e ? e.bind(t) : t)
                                }
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(2),
                                o = n(21),
                                u = n(99)(),
                                s = n(5)("observable"),
                                a = n(10),
                                f = n(1),
                                c = n(39),
                                h = n(41),
                                l = n(12),
                                p = n(40),
                                d = p.RETURN,
                                v = function(t) {
                                    return null == t ? void 0 : a(t)
                                }, y = function(t) {
                                    var e = t._c;
                                    e && (t._c = void 0, e())
                                }, g = function(t) {
                                    return void 0 === t._o
                                }, _ = function(t) {
                                    g(t) || (t._o = void 0, y(t))
                                }, b = function(t, e) {
                                    f(t), this._c = void 0, this._o = t, t = new w(this);
                                    try {
                                        var n = e(t),
                                            r = n;
                                        null != n && ("function" == typeof n.unsubscribe ? n = function() {
                                            r.unsubscribe()
                                        } : a(n), this._c = n)
                                    } catch (e) {
                                        return void t.error(e)
                                    }
                                    g(this) && y(this)
                                };
                            b.prototype = h({}, {
                                unsubscribe: function() {
                                    _(this)
                                }
                            });
                            var w = function(t) {
                                this._s = t
                            };
                            w.prototype = h({}, {
                                next: function(t) {
                                    var e = this._s;
                                    if (!g(e)) {
                                        var n = e._o;
                                        try {
                                            var r = v(n.next);
                                            if (r) return r.call(n, t)
                                        } catch (t) {
                                            try {
                                                _(e)
                                            } finally {
                                                throw t
                                            }
                                        }
                                    }
                                },
                                error: function(t) {
                                    var e = this._s;
                                    if (g(e)) throw t;
                                    var n = e._o;
                                    e._o = void 0;
                                    try {
                                        var r = v(n.error);
                                        if (!r) throw t;
                                        t = r.call(n, t)
                                    } catch (t) {
                                        try {
                                            y(e)
                                        } finally {
                                            throw t
                                        }
                                    }
                                    return y(e), t
                                },
                                complete: function(t) {
                                    var e = this._s;
                                    if (!g(e)) {
                                        var n = e._o;
                                        e._o = void 0;
                                        try {
                                            var r = v(n.complete);
                                            t = r ? r.call(n, t) : void 0
                                        } catch (t) {
                                            try {
                                                y(e)
                                            } finally {
                                                throw t
                                            }
                                        }
                                        return y(e), t
                                    }
                                }
                            });
                            var m = function(t) {
                                c(this, m, "Observable", "_f")._f = a(t)
                            };
                            h(m.prototype, {
                                subscribe: function(t) {
                                    return new b(t, this._f)
                                },
                                forEach: function(t) {
                                    var e = this;
                                    return new(o.Promise || i.Promise)(function(n, r) {
                                        a(t);
                                        var i = e.subscribe({
                                            next: function(e) {
                                                try {
                                                    return t(e)
                                                } catch (t) {
                                                    r(t), i.unsubscribe()
                                                }
                                            },
                                            error: r,
                                            complete: n
                                        })
                                    })
                                }
                            }), h(m, {
                                from: function(t) {
                                    var e = "function" == typeof this ? this : m,
                                        n = v(f(t)[s]);
                                    if (n) {
                                        var r = f(n.call(t));
                                        return r.constructor === e ? r : new e(function(t) {
                                            return r.subscribe(t)
                                        })
                                    }
                                    return new e(function(e) {
                                        var n = !1;
                                        return u(function() {
                                            if (!n) {
                                                try {
                                                    if (p(t, !1, function(t) {
                                                        if (e.next(t), n) return d
                                                    }) === d) return
                                                } catch (t) {
                                                    if (n) throw t;
                                                    return void e.error(t)
                                                }
                                                e.complete()
                                            }
                                        }),
                                        function() {
                                            n = !0
                                        }
                                    })
                                },
                                of: function() {
                                    for (var t = 0, e = arguments.length, n = Array(e); t < e;) n[t] = arguments[t++];
                                    return new("function" == typeof this ? this : m)(function(t) {
                                        var e = !1;
                                        return u(function() {
                                            if (!e) {
                                                for (var r = 0; r < n.length; ++r)
                                                    if (t.next(n[r]), e) return;
                                                t.complete()
                                            }
                                        }),
                                        function() {
                                            e = !0
                                        }
                                    })
                                }
                            }), l(m.prototype, s, function() {
                                return this
                            }), r(r.G, {
                                Observable: m
                            }), n(38)("Observable")
                        },
                        function(t, e, n) {
                            var r = n(2),
                                i = n(0),
                                o = r.navigator,
                                u = [].slice,
                                s = !! o && /MSIE .\./.test(o.userAgent),
                                a = function(t) {
                                    return function(e, n) {
                                        var r = arguments.length > 2,
                                            i = !! r && u.call(arguments, 2);
                                        return t(r ? function() {
                                            ("function" == typeof e ? e : Function(e)).apply(this, i)
                                        } : e, n)
                                    }
                                };
                            i(i.G + i.B + i.F * s, {
                                setTimeout: a(r.setTimeout),
                                setInterval: a(r.setInterval)
                            })
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(98);
                            r(r.G + r.B, {
                                setImmediate: i.set,
                                clearImmediate: i.clear
                            })
                        },
                        function(t, e, n) {
                            for (var r = n(97), i = n(34), o = n(13), u = n(2), s = n(12), a = n(46), f = n(5), c = f("iterator"), h = f("toStringTag"), l = a.Array, p = {
                                    CSSRuleList: !0,
                                    CSSStyleDeclaration: !1,
                                    CSSValueList: !1,
                                    ClientRectList: !1,
                                    DOMRectList: !1,
                                    DOMStringList: !1,
                                    DOMTokenList: !0,
                                    DataTransferItemList: !1,
                                    FileList: !1,
                                    HTMLAllCollection: !1,
                                    HTMLCollection: !1,
                                    HTMLFormElement: !1,
                                    HTMLSelectElement: !1,
                                    MediaList: !0,
                                    MimeTypeArray: !1,
                                    NamedNodeMap: !1,
                                    NodeList: !0,
                                    PaintRequestList: !1,
                                    Plugin: !1,
                                    PluginArray: !1,
                                    SVGLengthList: !1,
                                    SVGNumberList: !1,
                                    SVGPathSegList: !1,
                                    SVGPointList: !1,
                                    SVGStringList: !1,
                                    SVGTransformList: !1,
                                    SourceBufferList: !1,
                                    StyleSheetList: !0,
                                    TextTrackCueList: !1,
                                    TextTrackList: !1,
                                    TouchList: !1
                                }, d = i(p), v = 0; v < d.length; v++) {
                                var y, g = d[v],
                                    _ = p[g],
                                    b = u[g],
                                    w = b && b.prototype;
                                if (w && (w[c] || s(w, c, l), w[h] || s(w, h, g), a[g] = l, _))
                                    for (y in r) w[y] || o(w, y, r[y], !0)
                            }
                        },
                        function(t, e, n) {
                            (function(e) {
                                ! function(e) {
                                    function n(t, e, n, r) {
                                        var o = e && e.prototype instanceof i ? e : i,
                                            u = Object.create(o.prototype),
                                            s = new p(r || []);
                                        return u._invoke = f(t, n, s), u
                                    }

                                    function r(t, e, n) {
                                        try {
                                            return {
                                                type: "normal",
                                                arg: t.call(e, n)
                                            }
                                        } catch (t) {
                                            return {
                                                type: "throw",
                                                arg: t
                                            }
                                        }
                                    }

                                    function i() {}

                                    function o() {}

                                    function u() {}

                                    function s(t) {
                                        ["next", "throw", "return"].forEach(function(e) {
                                            t[e] = function(t) {
                                                return this._invoke(e, t)
                                            }
                                        })
                                    }

                                    function a(t) {
                                        function n(e, i, o, u) {
                                            var s = r(t[e], t, i);
                                            if ("throw" !== s.type) {
                                                var a = s.arg,
                                                    f = a.value;
                                                return f && "object" === (void 0 === f ? "undefined" : _typeof2(f)) && _.call(f, "__await") ? Promise.resolve(f.__await).then(function(t) {
                                                    n("next", t, o, u)
                                                }, function(t) {
                                                    n("throw", t, o, u)
                                                }) : Promise.resolve(f).then(function(t) {
                                                    a.value = t, o(a)
                                                }, u)
                                            }
                                            u(s.arg)
                                        }

                                        function i(t, e) {
                                            function r() {
                                                return new Promise(function(r, i) {
                                                    n(t, e, r, i)
                                                })
                                            }
                                            return o = o ? o.then(r, r) : r()
                                        }
                                        "object" === _typeof2(e.process) && e.process.domain && (n = e.process.domain.bind(n));
                                        var o;
                                        this._invoke = i
                                    }

                                    function f(t, e, n) {
                                        var i = A;
                                        return function(o, u) {
                                            if (i === T) throw new Error("Generator is already running");
                                            if (i === B) {
                                                if ("throw" === o) throw u;
                                                return v()
                                            }
                                            for (n.method = o, n.arg = u;;) {
                                                var s = n.delegate;
                                                if (s) {
                                                    var a = c(s, n);
                                                    if (a) {
                                                        if (a === I) continue;
                                                        return a
                                                    }
                                                }
                                                if ("next" === n.method) n.sent = n._sent = n.arg;
                                                else if ("throw" === n.method) {
                                                    if (i === A) throw i = B, n.arg;
                                                    n.dispatchException(n.arg)
                                                } else "return" === n.method && n.abrupt("return", n.arg);
                                                i = T;
                                                var f = r(t, e, n);
                                                if ("normal" === f.type) {
                                                    if (i = n.done ? B : N, f.arg === I) continue;
                                                    return {
                                                        value: f.arg,
                                                        done: n.done
                                                    }
                                                }
                                                "throw" === f.type && (i = B, n.method = "throw", n.arg = f.arg)
                                            }
                                        }
                                    }

                                    function c(t, e) {
                                        var n = t.iterator[e.method];
                                        if (n === y) {
                                            if (e.delegate = null, "throw" === e.method) {
                                                if (t.iterator.
                                                    return &&(e.method = "return", e.arg = y, c(t, e), "throw" === e.method)) return I;
                                                e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                                            }
                                            return I
                                        }
                                        var i = r(n, t.iterator, e.arg);
                                        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, I;
                                        var o = i.arg;
                                        return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = y), e.delegate = null, I) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, I)
                                    }

                                    function h(t) {
                                        var e = {
                                            tryLoc: t[0]
                                        };
                                        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                                    }

                                    function l(t) {
                                        var e = t.completion || {};
                                        e.type = "normal", delete e.arg, t.completion = e
                                    }

                                    function p(t) {
                                        this.tryEntries = [{
                                            tryLoc: "root"
                                        }], t.forEach(h, this), this.reset(!0)
                                    }

                                    function d(t) {
                                        if (t) {
                                            var e = t[w];
                                            if (e) return e.call(t);
                                            if ("function" == typeof t.next) return t;
                                            if (!isNaN(t.length)) {
                                                var n = -1,
                                                    r = function e() {
                                                        for (; ++n < t.length;)
                                                            if (_.call(t, n)) return e.value = t[n], e.done = !1, e;
                                                        return e.value = y, e.done = !0, e
                                                    };
                                                return r.next = r
                                            }
                                        }
                                        return {
                                            next: v
                                        }
                                    }

                                    function v() {
                                        return {
                                            value: y,
                                            done: !0
                                        }
                                    }
                                    var y, g = Object.prototype,
                                        _ = g.hasOwnProperty,
                                        b = "function" == typeof Symbol ? Symbol : {}, w = b.iterator || "@@iterator",
                                        m = b.asyncIterator || "@@asyncIterator",
                                        S = b.toStringTag || "@@toStringTag",
                                        E = "object" === (void 0 === t ? "undefined" : _typeof2(t)),
                                        O = e.regeneratorRuntime;
                                    if (O) return void(E && (t.exports = O));
                                    O = e.regeneratorRuntime = E ? t.exports : {}, O.wrap = n;
                                    var A = "suspendedStart",
                                        N = "suspendedYield",
                                        T = "executing",
                                        B = "completed",
                                        I = {}, R = {};
                                    R[w] = function() {
                                        return this
                                    };
                                    var P = Object.getPrototypeOf,
                                        x = P && P(P(d([])));
                                    x && x !== g && _.call(x, w) && (R = x);
                                    var D = u.prototype = i.prototype = Object.create(R);
                                    o.prototype = D.constructor = u, u.constructor = o, u[S] = o.displayName = "GeneratorFunction", O.isGeneratorFunction = function(t) {
                                        var e = "function" == typeof t && t.constructor;
                                        return !!e && (e === o || "GeneratorFunction" === (e.displayName || e.name))
                                    }, O.mark = function(t) {
                                        return Object.setPrototypeOf ? Object.setPrototypeOf(t, u) : (t.__proto__ = u, S in t || (t[S] = "GeneratorFunction")), t.prototype = Object.create(D), t
                                    }, O.awrap = function(t) {
                                        return {
                                            __await: t
                                        }
                                    }, s(a.prototype), a.prototype[m] = function() {
                                        return this
                                    }, O.AsyncIterator = a, O.async = function(t, e, r, i) {
                                        var o = new a(n(t, e, r, i));
                                        return O.isGeneratorFunction(e) ? o : o.next().then(function(t) {
                                            return t.done ? t.value : o.next()
                                        })
                                    }, s(D), D[S] = "Generator", D[w] = function() {
                                        return this
                                    }, D.toString = function() {
                                        return "[object Generator]"
                                    }, O.keys = function(t) {
                                        var e = [];
                                        for (var n in t) e.push(n);
                                        return e.reverse(),
                                        function n() {
                                            for (; e.length;) {
                                                var r = e.pop();
                                                if (r in t) return n.value = r, n.done = !1, n
                                            }
                                            return n.done = !0, n
                                        }
                                    }, O.values = d, p.prototype = {
                                        constructor: p,
                                        reset: function(t) {
                                            if (this.prev = 0, this.next = 0, this.sent = this._sent = y, this.done = !1, this.delegate = null, this.method = "next", this.arg = y, this.tryEntries.forEach(l), !t)
                                                for (var e in this) "t" === e.charAt(0) && _.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = y)
                                        },
                                        stop: function() {
                                            this.done = !0;
                                            var t = this.tryEntries[0],
                                                e = t.completion;
                                            if ("throw" === e.type) throw e.arg;
                                            return this.rval
                                        },
                                        dispatchException: function(t) {
                                            function e(e, r) {
                                                return o.type = "throw", o.arg = t, n.next = e, r && (n.method = "next", n.arg = y), !! r
                                            }
                                            if (this.done) throw t;
                                            for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                                                var i = this.tryEntries[r],
                                                    o = i.completion;
                                                if ("root" === i.tryLoc) return e("end");
                                                if (i.tryLoc <= this.prev) {
                                                    var u = _.call(i, "catchLoc"),
                                                        s = _.call(i, "finallyLoc");
                                                    if (u && s) {
                                                        if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                                        if (this.prev < i.finallyLoc) return e(i.finallyLoc)
                                                    } else if (u) {
                                                        if (this.prev < i.catchLoc) return e(i.catchLoc, !0)
                                                    } else {
                                                        if (!s) throw new Error("try statement without catch or finally");
                                                        if (this.prev < i.finallyLoc) return e(i.finallyLoc)
                                                    }
                                                }
                                            }
                                        },
                                        abrupt: function(t, e) {
                                            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                                                var r = this.tryEntries[n];
                                                if (r.tryLoc <= this.prev && _.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                                    var i = r;
                                                    break
                                                }
                                            }
                                            i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                                            var o = i ? i.completion : {};
                                            return o.type = t, o.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, I) : this.complete(o)
                                        },
                                        complete: function(t, e) {
                                            if ("throw" === t.type) throw t.arg;
                                            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), I
                                        },
                                        finish: function(t) {
                                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                                var n = this.tryEntries[e];
                                                if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), l(n), I
                                            }
                                        },
                                        catch: function(t) {
                                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                                var n = this.tryEntries[e];
                                                if (n.tryLoc === t) {
                                                    var r = n.completion;
                                                    if ("throw" === r.type) {
                                                        var i = r.arg;
                                                        l(n)
                                                    }
                                                    return i
                                                }
                                            }
                                            throw new Error("illegal catch attempt")
                                        },
                                        delegateYield: function(t, e, n) {
                                            return this.delegate = {
                                                iterator: d(t),
                                                resultName: e,
                                                nextLoc: n
                                            }, "next" === this.method && (this.arg = y), I
                                        }
                                    }
                                }("object" === (void 0 === e ? "undefined" : _typeof2(e)) ? e : "object" === ("undefined" == typeof window ? "undefined" : _typeof2(window)) ? window : "object" === ("undefined" == typeof self ? "undefined" : _typeof2(self)) ? self : this)
                            }).call(e, n(48))
                        },
                        function(t, e, n) {
                            n(340), t.exports = n(21).RegExp.escape
                        },
                        function(t, e, n) {
                            var r = n(0),
                                i = n(341)(/[\\^$*+?.()|[\]{}]/g, "\\$&");
                            r(r.S, "RegExp", {
                                escape: function(t) {
                                    return i(t)
                                }
                            })
                        },
                        function(t, e) {
                            t.exports = function(t, e) {
                                var n = e === Object(e) ? function(t) {
                                        return e[t]
                                    } : e;
                                return function(e) {
                                    return String(e).replace(t, n)
                                }
                            }
                        },
                        function(t, e, n) {
                            var r = n(343),
                                i = n(53),
                                o = n(72),
                                u = n(75),
                                s = n(73),
                                a = n(68),
                                f = n(104),
                                c = n(43),
                                h = n(102),
                                l = n(74),
                                p = n(52),
                                d = n(70),
                                v = n(71),
                                y = n(103),
                                g = n(69);
                            r.BSON_INT32_MAX = 2147483647, r.BSON_INT32_MIN = -2147483648, r.BSON_INT64_MAX = Math.pow(2, 63) - 1, r.BSON_INT64_MIN = -Math.pow(2, 63), r.JS_INT_MAX = 9007199254740992, r.JS_INT_MIN = -9007199254740992, r.Binary = i, r.Code = o, r.DBRef = u, r.Decimal128 = s, r.Double = a, r.Int32 = f, r.Long = c, r.Map = h, r.MaxKey = l, r.MinKey = p, r.ObjectId = d, r.ObjectID = d, r.BSONRegExp = v, r.Symbol = y, r.Timestamp = g, t.exports = r
                        },
                        function(t, e, n) {
                            (function(e) {
                                var r = n(102),
                                    i = n(43),
                                    o = n(68),
                                    u = n(69),
                                    s = n(70),
                                    a = n(71),
                                    f = n(103),
                                    c = n(104),
                                    h = n(72),
                                    l = n(73),
                                    p = n(52),
                                    d = n(74),
                                    v = n(75),
                                    y = n(53),
                                    g = n(348),
                                    _ = n(349),
                                    b = n(351),
                                    w = new e(17825792),
                                    m = function() {};
                                m.prototype.serialize = function(t, n) {
                                    n = n || {};
                                    var r = "boolean" == typeof n.checkKeys && n.checkKeys,
                                        i = "boolean" == typeof n.serializeFunctions && n.serializeFunctions,
                                        o = "boolean" != typeof n.ignoreUndefined || n.ignoreUndefined,
                                        u = "number" == typeof n.minInternalBufferSize ? n.minInternalBufferSize : 17825792;
                                    w.length < u && (w = new e(u));
                                    var s = _(w, t, r, 0, 0, i, o, []),
                                        a = new e(s);
                                    return w.copy(a, 0, 0, a.length), a
                                }, m.prototype.serializeWithBufferAndIndex = function(t, e, n) {
                                    n = n || {};
                                    var r = "boolean" == typeof n.checkKeys && n.checkKeys,
                                        i = "boolean" == typeof n.serializeFunctions && n.serializeFunctions,
                                        o = "boolean" != typeof n.ignoreUndefined || n.ignoreUndefined,
                                        u = "number" == typeof n.index ? n.index : 0,
                                        s = _(w, t, r, 0, 0, i, o);
                                    return w.copy(e, u, 0, s), u + s - 1
                                }, m.prototype.deserialize = function(t, e) {
                                    return g(t, e)
                                }, m.prototype.calculateObjectSize = function(t, e) {
                                    e = e || {};
                                    var n = "boolean" == typeof e.serializeFunctions && e.serializeFunctions,
                                        r = "boolean" != typeof e.ignoreUndefined || e.ignoreUndefined;
                                    return b(t, n, r)
                                }, m.prototype.deserializeStream = function(t, e, n, r, i, o) {
                                    o = Object.assign({
                                        allowObjectSmallerThanBufferSize: !0
                                    }, o);
                                    for (var u = e, s = 0; s < n; s++) {
                                        var a = t[u] | t[u + 1] << 8 | t[u + 2] << 16 | t[u + 3] << 24;
                                        o.index = u, r[i + s] = this.deserialize(t, o), u += a
                                    }
                                    return u
                                }, m.BSON_INT32_MAX = 2147483647, m.BSON_INT32_MIN = -2147483648, m.BSON_INT64_MAX = Math.pow(2, 63) - 1, m.BSON_INT64_MIN = -Math.pow(2, 63), m.JS_INT_MAX = 9007199254740992, m.JS_INT_MIN = -9007199254740992, m.BSON_DATA_NUMBER = 1, m.BSON_DATA_STRING = 2, m.BSON_DATA_OBJECT = 3, m.BSON_DATA_ARRAY = 4, m.BSON_DATA_BINARY = 5, m.BSON_DATA_OID = 7, m.BSON_DATA_BOOLEAN = 8, m.BSON_DATA_DATE = 9, m.BSON_DATA_NULL = 10, m.BSON_DATA_REGEXP = 11, m.BSON_DATA_CODE = 13, m.BSON_DATA_SYMBOL = 14, m.BSON_DATA_CODE_W_SCOPE = 15, m.BSON_DATA_INT = 16, m.BSON_DATA_TIMESTAMP = 17, m.BSON_DATA_LONG = 18, m.BSON_DATA_MIN_KEY = 255, m.BSON_DATA_MAX_KEY = 127, m.BSON_BINARY_SUBTYPE_DEFAULT = 0, m.BSON_BINARY_SUBTYPE_FUNCTION = 1, m.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2, m.BSON_BINARY_SUBTYPE_UUID = 3, m.BSON_BINARY_SUBTYPE_MD5 = 4, m.BSON_BINARY_SUBTYPE_USER_DEFINED = 128, t.exports = m, t.exports.Code = h, t.exports.Map = r, t.exports.Symbol = f, t.exports.BSON = m, t.exports.DBRef = v, t.exports.Binary = y, t.exports.ObjectID = s, t.exports.Long = i, t.exports.Timestamp = u, t.exports.Double = o, t.exports.Int32 = c, t.exports.MinKey = p, t.exports.MaxKey = d, t.exports.BSONRegExp = a, t.exports.Decimal128 = l
                            }).call(e, n(42).Buffer)
                        },
                        function(t, e, n) {
                            function r(t) {
                                var e = t.length;
                                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                                return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
                            }

                            function i(t) {
                                return 3 * t.length / 4 - r(t)
                            }

                            function o(t) {
                                var e, n, i, o, u, s = t.length;
                                o = r(t), u = new h(3 * s / 4 - o), n = o > 0 ? s - 4 : s;
                                var a = 0;
                                for (e = 0; e < n; e += 4) i = c[t.charCodeAt(e)] << 18 | c[t.charCodeAt(e + 1)] << 12 | c[t.charCodeAt(e + 2)] << 6 | c[t.charCodeAt(e + 3)], u[a++] = i >> 16 & 255, u[a++] = i >> 8 & 255, u[a++] = 255 & i;
                                return 2 === o ? (i = c[t.charCodeAt(e)] << 2 | c[t.charCodeAt(e + 1)] >> 4, u[a++] = 255 & i) : 1 === o && (i = c[t.charCodeAt(e)] << 10 | c[t.charCodeAt(e + 1)] << 4 | c[t.charCodeAt(e + 2)] >> 2, u[a++] = i >> 8 & 255, u[a++] = 255 & i), u
                            }

                            function u(t) {
                                return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
                            }

                            function s(t, e, n) {
                                for (var r, i = [], o = e; o < n; o += 3) r = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(u(r));
                                return i.join("")
                            }

                            function a(t) {
                                for (var e, n = t.length, r = n % 3, i = "", o = [], u = 0, a = n - r; u < a; u += 16383) o.push(s(t, u, u + 16383 > a ? a : u + 16383));
                                return 1 === r ? (e = t[n - 1], i += f[e >> 2], i += f[e << 4 & 63], i += "==") : 2 === r && (e = (t[n - 2] << 8) + t[n - 1], i += f[e >> 10], i += f[e >> 4 & 63], i += f[e << 2 & 63], i += "="), o.push(i), o.join("")
                            }
                            e.byteLength = i, e.toByteArray = o, e.fromByteArray = a;
                            for (var f = [], c = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, d = l.length; p < d; ++p) f[p] = l[p], c[l.charCodeAt(p)] = p;
                            c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63
                        },
                        function(t, e) {
                            e.read = function(t, e, n, r, i) {
                                var o, u, s = 8 * i - r - 1,
                                    a = (1 << s) - 1,
                                    f = a >> 1,
                                    c = -7,
                                    h = n ? i - 1 : 0,
                                    l = n ? -1 : 1,
                                    p = t[e + h];
                                for (h += l, o = p & (1 << -c) - 1, p >>= -c, c += s; c > 0; o = 256 * o + t[e + h], h += l, c -= 8);
                                for (u = o & (1 << -c) - 1, o >>= -c, c += r; c > 0; u = 256 * u + t[e + h], h += l, c -= 8);
                                if (0 === o) o = 1 - f;
                                else {
                                    if (o === a) return u ? NaN : 1 / 0 * (p ? -1 : 1);
                                    u += Math.pow(2, r), o -= f
                                }
                                return (p ? -1 : 1) * u * Math.pow(2, o - r)
                            }, e.write = function(t, e, n, r, i, o) {
                                var u, s, a, f = 8 * o - i - 1,
                                    c = (1 << f) - 1,
                                    h = c >> 1,
                                    l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                                    p = r ? 0 : o - 1,
                                    d = r ? 1 : -1,
                                    v = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, u = c) : (u = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -u)) < 1 && (u--, a *= 2), e += u + h >= 1 ? l / a : l * Math.pow(2, 1 - h), e * a >= 2 && (u++, a /= 2), u + h >= c ? (s = 0, u = c) : u + h >= 1 ? (s = (e * a - 1) * Math.pow(2, i), u += h) : (s = e * Math.pow(2, h - 1) * Math.pow(2, i), u = 0)); i >= 8; t[n + p] = 255 & s, p += d, s /= 256, i -= 8);
                                for (u = u << i | s, f += i; f > 0; t[n + p] = 255 & u, p += d, u /= 256, f -= 8);
                                t[n + p - d] |= 128 * v
                            }
                        },
                        function(t, e) {
                            var n = {}.toString;
                            t.exports = Array.isArray || function(t) {
                                return "[object Array]" == n.call(t)
                            }
                        },
                        function(t, e) {
                            function n() {
                                throw new Error("setTimeout has not been defined")
                            }

                            function r() {
                                throw new Error("clearTimeout has not been defined")
                            }

                            function i(t) {
                                if (c === setTimeout) return setTimeout(t, 0);
                                if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
                                try {
                                    return c(t, 0)
                                } catch (e) {
                                    try {
                                        return c.call(null, t, 0)
                                    } catch (e) {
                                        return c.call(this, t, 0)
                                    }
                                }
                            }

                            function o(t) {
                                if (h === clearTimeout) return clearTimeout(t);
                                if ((h === r || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);
                                try {
                                    return h(t)
                                } catch (e) {
                                    try {
                                        return h.call(null, t)
                                    } catch (e) {
                                        return h.call(this, t)
                                    }
                                }
                            }

                            function u() {
                                v && p && (v = !1, p.length ? d = p.concat(d) : y = -1, d.length && s())
                            }

                            function s() {
                                if (!v) {
                                    var t = i(u);
                                    v = !0;
                                    for (var e = d.length; e;) {
                                        for (p = d, d = []; ++y < e;) p && p[y].run();
                                        y = -1, e = d.length
                                    }
                                    p = null, v = !1, o(t)
                                }
                            }

                            function a(t, e) {
                                this.fun = t, this.array = e
                            }

                            function f() {}
                            var c, h, l = t.exports = {};
                            ! function() {
                                try {
                                    c = "function" == typeof setTimeout ? setTimeout : n
                                } catch (t) {
                                    c = n
                                }
                                try {
                                    h = "function" == typeof clearTimeout ? clearTimeout : r
                                } catch (t) {
                                    h = r
                                }
                            }();
                            var p, d = [],
                                v = !1,
                                y = -1;
                            l.nextTick = function(t) {
                                var e = new Array(arguments.length - 1);
                                if (arguments.length > 1)
                                    for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                                d.push(new a(t, e)), 1 !== d.length || v || i(s)
                            }, a.prototype.run = function() {
                                this.fun.apply(null, this.array)
                            }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = f, l.addListener = f, l.once = f, l.off = f, l.removeListener = f, l.removeAllListeners = f, l.emit = f, l.prependListener = f, l.prependOnceListener = f, l.listeners = function(t) {
                                return []
                            }, l.binding = function(t) {
                                throw new Error("process.binding is not supported")
                            }, l.cwd = function() {
                                return "/"
                            }, l.chdir = function(t) {
                                throw new Error("process.chdir is not supported")
                            }, l.umask = function() {
                                return 0
                            }
                        },
                        function(module, exports, __webpack_require__) {
                            (function(Buffer) {
                                var Long = __webpack_require__(43).Long,
                                    Double = __webpack_require__(68).Double,
                                    Timestamp = __webpack_require__(69).Timestamp,
                                    ObjectID = __webpack_require__(70).ObjectID,
                                    Code = __webpack_require__(72).Code,
                                    MinKey = __webpack_require__(52).MinKey,
                                    MaxKey = __webpack_require__(74).MaxKey,
                                    Decimal128 = __webpack_require__(73),
                                    Int32 = __webpack_require__(104),
                                    DBRef = __webpack_require__(75).DBRef,
                                    BSONRegExp = __webpack_require__(71).BSONRegExp,
                                    Binary = __webpack_require__(53).Binary,
                                    deserialize = function(t, e, n) {
                                        e = null == e ? {} : e;
                                        var r = e && e.index ? e.index : 0,
                                            i = t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24;
                                        if (i < 5) throw new Error("bson size must be >= 5, is " + i);
                                        if (e.allowObjectSmallerThanBufferSize && t.length < i) throw new Error("buffer length " + t.length + " must be >= bson size " + i);
                                        if (!e.allowObjectSmallerThanBufferSize && t.length !== i) throw new Error("buffer length " + t.length + " must === bson size " + i);
                                        if (i + r > t.length) throw new Error("(bson size " + i + " + options.index " + r + " must be <= buffer length " + t.length + ")");
                                        if (0 !== t[r + i - 1]) throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
                                        return deserializeObject(t, r, e, n)
                                    }, deserializeObject = function t(e, n, r, i) {
                                        var o = null != r.evalFunctions && r.evalFunctions,
                                            u = null != r.cacheFunctions && r.cacheFunctions,
                                            s = null != r.cacheFunctionsCrc32 && r.cacheFunctionsCrc32;
                                        if (!s) var a = null;
                                        var f = null == r.fieldsAsRaw ? null : r.fieldsAsRaw,
                                            c = null != r.raw && r.raw,
                                            h = "boolean" == typeof r.bsonRegExp && r.bsonRegExp,
                                            l = null != r.promoteBuffers && r.promoteBuffers,
                                            p = null == r.promoteLongs || r.promoteLongs,
                                            d = null == r.promoteValues || r.promoteValues,
                                            v = n;
                                        if (e.length < 5) throw new Error("corrupt bson message < 5 bytes long");
                                        var y = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
                                        if (y < 5 || y > e.length) throw new Error("corrupt bson message");
                                        for (var g = i ? [] : {}, _ = 0;;) {
                                            var b = e[n++];
                                            if (0 === b) break;
                                            for (var w = n; 0 !== e[w] && w < e.length;) w++;
                                            if (w >= e.length) throw new Error("Bad BSON Document: illegal CString");
                                            var m = i ? _++ : e.toString("utf8", n, w);
                                            if (n = w + 1, b === BSON.BSON_DATA_STRING) {
                                                var S = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
                                                if (S <= 0 || S > e.length - n || 0 !== e[n + S - 1]) throw new Error("bad string length in bson");
                                                var E = e.toString("utf8", n, n + S - 1);
                                                for (w = 0; w < E.length; w++)
                                                    if (65533 === E.charCodeAt(w)) throw new Error("Invalid UTF-8 string in BSON document");
                                                g[m] = E, n += S
                                            } else if (b === BSON.BSON_DATA_OID) {
                                                var O = new Buffer(12);
                                                e.copy(O, 0, n, n + 12), g[m] = new ObjectID(O), n += 12
                                            } else if (b === BSON.BSON_DATA_INT && !1 === d) g[m] = new Int32(e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24);
                                            else if (b === BSON.BSON_DATA_INT) g[m] = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
                                            else if (b === BSON.BSON_DATA_NUMBER && !1 === d) g[m] = new Double(e.readDoubleLE(n)), n += 8;
                                            else if (b === BSON.BSON_DATA_NUMBER) g[m] = e.readDoubleLE(n), n += 8;
                                            else if (b === BSON.BSON_DATA_DATE) {
                                                var A = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24,
                                                    N = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
                                                g[m] = new Date(new Long(A, N).toNumber())
                                            } else if (b === BSON.BSON_DATA_BOOLEAN) {
                                                if (0 !== e[n] && 1 !== e[n]) throw new Error("illegal boolean type value");
                                                g[m] = 1 === e[n++]
                                            } else if (b === BSON.BSON_DATA_OBJECT) {
                                                var T = n,
                                                    B = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
                                                if (B <= 0 || B > e.length - n) throw new Error("bad embedded document length in bson");
                                                g[m] = c ? e.slice(n, n + B) : t(e, T, r, !1), n += B
                                            } else if (b === BSON.BSON_DATA_ARRAY) {
                                                T = n, B = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
                                                var I = r,
                                                    R = n + B;
                                                if (f && f[m]) {
                                                    I = {};
                                                    for (var P in r) I[P] = r[P];
                                                    I.raw = !0
                                                }
                                                if (g[m] = t(e, T, I, !0), n += B, 0 !== e[n - 1]) throw new Error("invalid array terminator byte");
                                                if (n !== R) throw new Error("corrupted array bson")
                                            } else if (b === BSON.BSON_DATA_UNDEFINED) g[m] = void 0;
                                            else if (b === BSON.BSON_DATA_NULL) g[m] = null;
                                            else if (b === BSON.BSON_DATA_LONG) {
                                                A = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24, N = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
                                                var x = new Long(A, N);
                                                g[m] = p && !0 === d && x.lessThanOrEqual(JS_INT_MAX_LONG) && x.greaterThanOrEqual(JS_INT_MIN_LONG) ? x.toNumber() : x
                                            } else if (b === BSON.BSON_DATA_DECIMAL128) {
                                                var D = new Buffer(16);
                                                e.copy(D, 0, n, n + 16), n += 16;
                                                var M = new Decimal128(D);
                                                g[m] = M.toObject ? M.toObject() : M
                                            } else if (b === BSON.BSON_DATA_BINARY) {
                                                var k = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24,
                                                    U = k,
                                                    j = e[n++];
                                                if (k < 0) throw new Error("Negative binary type element size found");
                                                if (k > e.length) throw new Error("Binary type size larger than document size");
                                                if (null != e.slice) {
                                                    if (j === Binary.SUBTYPE_BYTE_ARRAY) {
                                                        if ((k = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                                                        if (k > U - 4) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                                                        if (k < U - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                                                    }
                                                    g[m] = l && d ? e.slice(n, n + k) : new Binary(e.slice(n, n + k), j)
                                                } else {
                                                    var L = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(k)) : new Array(k);
                                                    if (j === Binary.SUBTYPE_BYTE_ARRAY) {
                                                        if ((k = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                                                        if (k > U - 4) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                                                        if (k < U - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                                                    }
                                                    for (w = 0; w < k; w++) L[w] = e[n + w];
                                                    g[m] = l && d ? L : new Binary(L, j)
                                                }
                                                n += k
                                            } else if (b === BSON.BSON_DATA_REGEXP && !1 === h) {
                                                for (w = n; 0 !== e[w] && w < e.length;) w++;
                                                if (w >= e.length) throw new Error("Bad BSON Document: illegal CString");
                                                var C = e.toString("utf8", n, w);
                                                for (n = w + 1, w = n; 0 !== e[w] && w < e.length;) w++;
                                                if (w >= e.length) throw new Error("Bad BSON Document: illegal CString");
                                                var F = e.toString("utf8", n, w);
                                                n = w + 1;
                                                var Y = new Array(F.length);
                                                for (w = 0; w < F.length; w++) switch (F[w]) {
                                                    case "m":
                                                        Y[w] = "m";
                                                        break;
                                                    case "s":
                                                        Y[w] = "g";
                                                        break;
                                                    case "i":
                                                        Y[w] = "i"
                                                }
                                                g[m] = new RegExp(C, Y.join(""))
                                            } else if (b === BSON.BSON_DATA_REGEXP && !0 === h) {
                                                for (w = n; 0 !== e[w] && w < e.length;) w++;
                                                if (w >= e.length) throw new Error("Bad BSON Document: illegal CString");
                                                for (C = e.toString("utf8", n, w), n = w + 1, w = n; 0 !== e[w] && w < e.length;) w++;
                                                if (w >= e.length) throw new Error("Bad BSON Document: illegal CString");
                                                F = e.toString("utf8", n, w), n = w + 1, g[m] = new BSONRegExp(C, F)
                                            } else if (b === BSON.BSON_DATA_SYMBOL) {
                                                if ((S = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24) <= 0 || S > e.length - n || 0 !== e[n + S - 1]) throw new Error("bad string length in bson");
                                                g[m] = e.toString("utf8", n, n + S - 1), n += S
                                            } else if (b === BSON.BSON_DATA_TIMESTAMP) A = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24, N = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24, g[m] = new Timestamp(A, N);
                                            else if (b === BSON.BSON_DATA_MIN_KEY) g[m] = new MinKey;
                                            else if (b === BSON.BSON_DATA_MAX_KEY) g[m] = new MaxKey;
                                            else if (b === BSON.BSON_DATA_CODE) {
                                                if ((S = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24) <= 0 || S > e.length - n || 0 !== e[n + S - 1]) throw new Error("bad string length in bson");
                                                var W = e.toString("utf8", n, n + S - 1);
                                                if (o)
                                                    if (u) {
                                                        var K = s ? a(W) : W;
                                                        g[m] = isolateEvalWithHash(functionCache, K, W, g)
                                                    } else g[m] = isolateEval(W);
                                                    else g[m] = new Code(W);
                                                n += S
                                            } else if (b === BSON.BSON_DATA_CODE_W_SCOPE) {
                                                var $ = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
                                                if ($ < 13) throw new Error("code_w_scope total size shorter minimum expected length");
                                                if ((S = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24) <= 0 || S > e.length - n || 0 !== e[n + S - 1]) throw new Error("bad string length in bson");
                                                W = e.toString("utf8", n, n + S - 1), n += S, T = n, B = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
                                                var V = t(e, T, r, !1);
                                                if (n += B, $ < 8 + B + S) throw new Error("code_w_scope total size is to short, truncating scope");
                                                if ($ > 8 + B + S) throw new Error("code_w_scope total size is to long, clips outer document");
                                                o ? (u ? (K = s ? a(W) : W, g[m] = isolateEvalWithHash(functionCache, K, W, g)) : g[m] = isolateEval(W), g[m].scope = V) : g[m] = new Code(W, V)
                                            } else {
                                                if (b !== BSON.BSON_DATA_DBPOINTER) throw new Error("Detected unknown BSON type " + b.toString(16) + ' for fieldname "' + m + '", are you using the latest BSON parser?');
                                                if ((S = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24) <= 0 || S > e.length - n || 0 !== e[n + S - 1]) throw new Error("bad string length in bson");
                                                var J = e.toString("utf8", n, n + S - 1);
                                                n += S;
                                                var G = new Buffer(12);
                                                for (e.copy(G, 0, n, n + 12), O = new ObjectID(G), n += 12, w = 0; w < J.length; w++)
                                                    if (65533 === J.charCodeAt(w)) throw new Error("Invalid UTF-8 string in BSON document");
                                                g[m] = new DBRef(J, O)
                                            }
                                        }
                                        if (y !== n - v) {
                                            if (i) throw new Error("corrupt array bson");
                                            throw new Error("corrupt object bson")
                                        }
                                        var z = Object.keys(g).filter(function(t) {
                                            return t.startsWith("$")
                                        }),
                                            q = !0;
                                        if (z.forEach(function(t) {
                                            -1 === ["$ref", "$id", "$db"].indexOf(t) && (q = !1)
                                        }), !q) return g;
                                        if (null != g.$id && null != g.$ref) {
                                            var H = Object.assign({}, g);
                                            return delete H.$ref, delete H.$id, delete H.$db, new DBRef(g.$ref, g.$id, g.$db || null, H)
                                        }
                                        return g
                                    }, isolateEvalWithHash = function isolateEvalWithHash(functionCache, hash, functionString, object) {
                                        var value = null;
                                        return null == functionCache[hash] && (eval("value = " + functionString), functionCache[hash] = value), functionCache[hash].bind(object)
                                    }, isolateEval = function isolateEval(functionString) {
                                        var value = null;
                                        return eval("value = " + functionString), value
                                    }, BSON = {}, functionCache = BSON.functionCache = {};
                                BSON.BSON_DATA_NUMBER = 1, BSON.BSON_DATA_STRING = 2, BSON.BSON_DATA_OBJECT = 3, BSON.BSON_DATA_ARRAY = 4, BSON.BSON_DATA_BINARY = 5, BSON.BSON_DATA_UNDEFINED = 6, BSON.BSON_DATA_OID = 7, BSON.BSON_DATA_BOOLEAN = 8, BSON.BSON_DATA_DATE = 9, BSON.BSON_DATA_NULL = 10, BSON.BSON_DATA_REGEXP = 11, BSON.BSON_DATA_DBPOINTER = 12, BSON.BSON_DATA_CODE = 13, BSON.BSON_DATA_SYMBOL = 14, BSON.BSON_DATA_CODE_W_SCOPE = 15, BSON.BSON_DATA_INT = 16, BSON.BSON_DATA_TIMESTAMP = 17, BSON.BSON_DATA_LONG = 18, BSON.BSON_DATA_DECIMAL128 = 19, BSON.BSON_DATA_MIN_KEY = 255, BSON.BSON_DATA_MAX_KEY = 127, BSON.BSON_BINARY_SUBTYPE_DEFAULT = 0, BSON.BSON_BINARY_SUBTYPE_FUNCTION = 1, BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2, BSON.BSON_BINARY_SUBTYPE_UUID = 3, BSON.BSON_BINARY_SUBTYPE_MD5 = 4, BSON.BSON_BINARY_SUBTYPE_USER_DEFINED = 128, BSON.BSON_INT32_MAX = 2147483647, BSON.BSON_INT32_MIN = -2147483648, BSON.BSON_INT64_MAX = Math.pow(2, 63) - 1, BSON.BSON_INT64_MIN = -Math.pow(2, 63), BSON.JS_INT_MAX = 9007199254740992, BSON.JS_INT_MIN = -9007199254740992;
                                var JS_INT_MAX_LONG = Long.fromNumber(9007199254740992),
                                    JS_INT_MIN_LONG = Long.fromNumber(-9007199254740992);
                                module.exports = deserialize
                            }).call(exports, __webpack_require__(42).Buffer)
                        },
                        function(t, e, n) {
                            (function(e) {
                                var r = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
                                        return void 0 === t ? "undefined" : _typeof2(t)
                                    } : function(t) {
                                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t)
                                    }, i = n(350).writeIEEE754,
                                    o = n(43).Long,
                                    u = n(102),
                                    s = n(52).MinKey,
                                    a = n(53).Binary,
                                    f = /\x00/,
                                    c = function(t) {
                                        return "object" === (void 0 === t ? "undefined" : r(t)) && "[object Date]" === Object.prototype.toString.call(t)
                                    }, h = function(t) {
                                        return "[object RegExp]" === Object.prototype.toString.call(t)
                                    }, l = function(t, e, n, r, i) {
                                        t[r++] = D.BSON_DATA_STRING, r = r + (i ? t.write(e, r, "ascii") : t.write(e, r, "utf8")) + 1, t[r - 1] = 0;
                                        var o = t.write(n, r + 4, "utf8");
                                        return t[r + 3] = o + 1 >> 24 & 255, t[r + 2] = o + 1 >> 16 & 255, t[r + 1] = o + 1 >> 8 & 255, t[r] = o + 1 & 255, r = r + 4 + o, t[r++] = 0, r
                                    }, p = function(t, e, n, r, u) {
                                        if (Math.floor(n) === n && n >= D.JS_INT_MIN && n <= D.JS_INT_MAX)
                                            if (n >= D.BSON_INT32_MIN && n <= D.BSON_INT32_MAX) {
                                                t[r++] = D.BSON_DATA_INT;
                                                var s = u ? t.write(e, r, "ascii") : t.write(e, r, "utf8");
                                                r += s, t[r++] = 0, t[r++] = 255 & n, t[r++] = n >> 8 & 255, t[r++] = n >> 16 & 255, t[r++] = n >> 24 & 255
                                            } else if (n >= D.JS_INT_MIN && n <= D.JS_INT_MAX) t[r++] = D.BSON_DATA_NUMBER, s = u ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), r += s, t[r++] = 0, i(t, n, r, "little", 52, 8), r += 8;
                                        else {
                                            t[r++] = D.BSON_DATA_LONG, s = u ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), r += s, t[r++] = 0;
                                            var a = o.fromNumber(n),
                                                f = a.getLowBits(),
                                                c = a.getHighBits();
                                            t[r++] = 255 & f, t[r++] = f >> 8 & 255, t[r++] = f >> 16 & 255, t[r++] = f >> 24 & 255, t[r++] = 255 & c, t[r++] = c >> 8 & 255, t[r++] = c >> 16 & 255, t[r++] = c >> 24 & 255
                                        } else t[r++] = D.BSON_DATA_NUMBER, s = u ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), r += s, t[r++] = 0, i(t, n, r, "little", 52, 8), r += 8;
                                        return r
                                    }, d = function(t, e, n, r, i) {
                                        return t[r++] = D.BSON_DATA_NULL, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, r
                                    }, v = function(t, e, n, r, i) {
                                        return t[r++] = D.BSON_DATA_BOOLEAN, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, t[r++] = n ? 1 : 0, r
                                    }, y = function(t, e, n, r, i) {
                                        t[r++] = D.BSON_DATA_DATE, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var u = o.fromNumber(n.getTime()),
                                            s = u.getLowBits(),
                                            a = u.getHighBits();
                                        return t[r++] = 255 & s, t[r++] = s >> 8 & 255, t[r++] = s >> 16 & 255, t[r++] = s >> 24 & 255, t[r++] = 255 & a, t[r++] = a >> 8 & 255, t[r++] = a >> 16 & 255, t[r++] = a >> 24 & 255, r
                                    }, g = function(t, e, n, r, i) {
                                        if (t[r++] = D.BSON_DATA_REGEXP, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, n.source && null != n.source.match(f)) throw Error("value " + n.source + " must not contain null bytes");
                                        return r += t.write(n.source, r, "utf8"), t[r++] = 0, n.ignoreCase && (t[r++] = 105), n.global && (t[r++] = 115), n.multiline && (t[r++] = 109), t[r++] = 0, r
                                    }, _ = function(t, e, n, r, i) {
                                        if (t[r++] = D.BSON_DATA_REGEXP, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, null != n.pattern.match(f)) throw Error("pattern " + n.pattern + " must not contain null bytes");
                                        return r += t.write(n.pattern, r, "utf8"), t[r++] = 0, r += t.write(n.options.split("").sort().join(""), r, "utf8"), t[r++] = 0, r
                                    }, b = function(t, e, n, r, i) {
                                        return t[r++] = null === n ? D.BSON_DATA_NULL : n instanceof s ? D.BSON_DATA_MIN_KEY : D.BSON_DATA_MAX_KEY, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, r
                                    }, w = function(t, e, n, r, i) {
                                        if (t[r++] = D.BSON_DATA_OID, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, "string" == typeof n.id) t.write(n.id, r, "binary");
                                        else {
                                            if (!n.id || !n.id.copy) throw new TypeError("object [" + JSON.stringify(n) + "] is not a valid ObjectId");
                                            n.id.copy(t, r, 0, 12)
                                        }
                                        return r + 12
                                    }, m = function(t, e, n, r, i) {
                                        t[r++] = D.BSON_DATA_BINARY, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var o = n.length;
                                        return t[r++] = 255 & o, t[r++] = o >> 8 & 255, t[r++] = o >> 16 & 255, t[r++] = o >> 24 & 255, t[r++] = D.BSON_BINARY_SUBTYPE_DEFAULT, n.copy(t, r, 0, o), r += o
                                    }, S = function(t, e, n, r, i, o, u, s, a, f) {
                                        for (var c = 0; c < f.length; c++)
                                            if (f[c] === n) throw new Error("cyclic dependency detected");
                                        f.push(n), t[r++] = Array.isArray(n) ? D.BSON_DATA_ARRAY : D.BSON_DATA_OBJECT, r += a ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var h = x(t, n, i, r, o + 1, u, s, f);
                                        return f.pop(), h
                                    }, E = function(t, e, n, r, i) {
                                        return t[r++] = D.BSON_DATA_DECIMAL128, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, n.bytes.copy(t, r, 0, 16), r + 16
                                    }, O = function(t, e, n, r, i) {
                                        t[r++] = "Long" === n._bsontype ? D.BSON_DATA_LONG : D.BSON_DATA_TIMESTAMP, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var o = n.getLowBits(),
                                            u = n.getHighBits();
                                        return t[r++] = 255 & o, t[r++] = o >> 8 & 255, t[r++] = o >> 16 & 255, t[r++] = o >> 24 & 255, t[r++] = 255 & u, t[r++] = u >> 8 & 255, t[r++] = u >> 16 & 255, t[r++] = u >> 24 & 255, r
                                    }, A = function(t, e, n, r, i) {
                                        return t[r++] = D.BSON_DATA_INT, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, t[r++] = 255 & n, t[r++] = n >> 8 & 255, t[r++] = n >> 16 & 255, t[r++] = n >> 24 & 255, r
                                    }, N = function(t, e, n, r, o) {
                                        return t[r++] = D.BSON_DATA_NUMBER, r += o ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0, i(t, n.value, r, "little", 52, 8), r += 8
                                    }, T = function(t, e, n, r, i, o, u) {
                                        t[r++] = D.BSON_DATA_CODE, r += u ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var s = n.toString(),
                                            a = t.write(s, r + 4, "utf8") + 1;
                                        return t[r] = 255 & a, t[r + 1] = a >> 8 & 255, t[r + 2] = a >> 16 & 255, t[r + 3] = a >> 24 & 255, r = r + 4 + a - 1, t[r++] = 0, r
                                    }, B = function(t, e, n, i, o, u, s, a, f) {
                                        if (n.scope && "object" === r(n.scope)) {
                                            t[i++] = D.BSON_DATA_CODE_W_SCOPE;
                                            var c = f ? t.write(e, i, "ascii") : t.write(e, i, "utf8");
                                            i += c, t[i++] = 0;
                                            var h = i,
                                                l = "string" == typeof n.code ? n.code : n.code.toString();
                                            i += 4;
                                            var p = t.write(l, i + 4, "utf8") + 1;
                                            t[i] = 255 & p, t[i + 1] = p >> 8 & 255, t[i + 2] = p >> 16 & 255, t[i + 3] = p >> 24 & 255, t[i + 4 + p - 1] = 0, i = i + p + 4;
                                            var d = x(t, n.scope, o, i, u + 1, s, a);
                                            i = d - 1;
                                            var v = d - h;
                                            t[h++] = 255 & v, t[h++] = v >> 8 & 255, t[h++] = v >> 16 & 255, t[h++] = v >> 24 & 255, t[i++] = 0
                                        } else {
                                            t[i++] = D.BSON_DATA_CODE, c = f ? t.write(e, i, "ascii") : t.write(e, i, "utf8"), i += c, t[i++] = 0, l = n.code.toString();
                                            var y = t.write(l, i + 4, "utf8") + 1;
                                            t[i] = 255 & y, t[i + 1] = y >> 8 & 255, t[i + 2] = y >> 16 & 255, t[i + 3] = y >> 24 & 255, i = i + 4 + y - 1, t[i++] = 0
                                        }
                                        return i
                                    }, I = function(t, e, n, r, i) {
                                        t[r++] = D.BSON_DATA_BINARY, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var o = n.value(!0),
                                            u = n.position;
                                        return n.sub_type === a.SUBTYPE_BYTE_ARRAY && (u += 4), t[r++] = 255 & u, t[r++] = u >> 8 & 255, t[r++] = u >> 16 & 255, t[r++] = u >> 24 & 255, t[r++] = n.sub_type, n.sub_type === a.SUBTYPE_BYTE_ARRAY && (u -= 4, t[r++] = 255 & u, t[r++] = u >> 8 & 255, t[r++] = u >> 16 & 255, t[r++] = u >> 24 & 255), o.copy(t, r, 0, n.position), r += n.position
                                    }, R = function(t, e, n, r, i) {
                                        t[r++] = D.BSON_DATA_SYMBOL, r += i ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var o = t.write(n.value, r + 4, "utf8") + 1;
                                        return t[r] = 255 & o, t[r + 1] = o >> 8 & 255, t[r + 2] = o >> 16 & 255, t[r + 3] = o >> 24 & 255, r = r + 4 + o - 1, t[r++] = 0, r
                                    }, P = function(t, e, n, r, i, o, u) {
                                        t[r++] = D.BSON_DATA_OBJECT, r += u ? t.write(e, r, "ascii") : t.write(e, r, "utf8"), t[r++] = 0;
                                        var s, a = r,
                                            f = {
                                                $ref: n.collection,
                                                $id: n.oid
                                            };
                                        null != n.db && (f.$db = n.db), f = Object.assign(f, n.fields), s = x(t, f, !1, r, i + 1, o);
                                        var c = s - a;
                                        return t[a++] = 255 & c, t[a++] = c >> 8 & 255, t[a++] = c >> 16 & 255, t[a++] = c >> 24 & 255, s
                                    }, x = function(t, n, i, o, s, a, x, D) {
                                        o = o || 0, D = D || [], D.push(n);
                                        var M = o + 4;
                                        if (Array.isArray(n))
                                            for (var k = 0; k < n.length; k++) {
                                                var U = "" + k,
                                                    j = n[k];
                                                if (j && j.toBSON) {
                                                    if ("function" != typeof j.toBSON) throw new TypeError("toBSON is not a function");
                                                    j = j.toBSON()
                                                }
                                                var L = void 0 === j ? "undefined" : r(j);
                                                "string" === L ? M = l(t, U, j, M, !0) : "number" === L ? M = p(t, U, j, M, !0) : "boolean" === L ? M = v(t, U, j, M, !0) : j instanceof Date || c(j) ? M = y(t, U, j, M, !0) : void 0 === j ? M = d(t, U, 0, M, !0) : null === j ? M = d(t, U, 0, M, !0) : "ObjectID" === j._bsontype ? M = w(t, U, j, M, !0) : e.isBuffer(j) ? M = m(t, U, j, M, !0) : j instanceof RegExp || h(j) ? M = g(t, U, j, M, !0) : "object" === L && null == j._bsontype ? M = S(t, U, j, M, i, s, a, x, !0, D) : "object" === L && "Decimal128" === j._bsontype ? M = E(t, U, j, M, !0) : "Long" === j._bsontype || "Timestamp" === j._bsontype ? M = O(t, U, j, M, !0) : "Double" === j._bsontype ? M = N(t, U, j, M, !0) : "function" == typeof j && a ? M = T(t, U, j, M, 0, 0, a) : "Code" === j._bsontype ? M = B(t, U, j, M, i, s, a, x, !0) : "Binary" === j._bsontype ? M = I(t, U, j, M, !0) : "Symbol" === j._bsontype ? M = R(t, U, j, M, !0) : "DBRef" === j._bsontype ? M = P(t, U, j, M, s, a, !0) : "BSONRegExp" === j._bsontype ? M = _(t, U, j, M, !0) : "Int32" === j._bsontype ? M = A(t, U, j, M, !0) : "MinKey" !== j._bsontype && "MaxKey" !== j._bsontype || (M = b(t, U, j, M, !0))
                                            } else if (n instanceof u)
                                                for (var C = n.entries(), F = !1; !F;) {
                                                    var Y = C.next();
                                                    if (!(F = Y.done)) {
                                                        if (U = Y.value[0], j = Y.value[1], L = void 0 === j ? "undefined" : r(j), "$db" !== U && "$ref" !== U && "$id" !== U) {
                                                            if (null != U.match(f)) throw Error("key " + U + " must not contain null bytes");
                                                            if (i) {
                                                                if ("$" === U[0]) throw Error("key " + U + " must not start with '$'");
                                                                if (~U.indexOf(".")) throw Error("key " + U + " must not contain '.'")
                                                            }
                                                        }
                                                        "string" === L ? M = l(t, U, j, M) : "number" === L ? M = p(t, U, j, M) : "boolean" === L ? M = v(t, U, j, M) : j instanceof Date || c(j) ? M = y(t, U, j, M) : null === j || void 0 === j && !1 === x ? M = d(t, U, 0, M) : "ObjectID" === j._bsontype ? M = w(t, U, j, M) : e.isBuffer(j) ? M = m(t, U, j, M) : j instanceof RegExp || h(j) ? M = g(t, U, j, M) : "object" === L && null == j._bsontype ? M = S(t, U, j, M, i, s, a, x, !1, D) : "object" === L && "Decimal128" === j._bsontype ? M = E(t, U, j, M) : "Long" === j._bsontype || "Timestamp" === j._bsontype ? M = O(t, U, j, M) : "Double" === j._bsontype ? M = N(t, U, j, M) : "Code" === j._bsontype ? M = B(t, U, j, M, i, s, a, x) : "function" == typeof j && a ? M = T(t, U, j, M, 0, 0, a) : "Binary" === j._bsontype ? M = I(t, U, j, M) : "Symbol" === j._bsontype ? M = R(t, U, j, M) : "DBRef" === j._bsontype ? M = P(t, U, j, M, s, a) : "BSONRegExp" === j._bsontype ? M = _(t, U, j, M) : "Int32" === j._bsontype ? M = A(t, U, j, M) : "MinKey" !== j._bsontype && "MaxKey" !== j._bsontype || (M = b(t, U, j, M))
                                                    }
                                                } else {
                                                    if (n.toBSON) {
                                                        if ("function" != typeof n.toBSON) throw new TypeError("toBSON is not a function");
                                                        if (null != (n = n.toBSON()) && "object" !== (void 0 === n ? "undefined" : r(n))) throw new TypeError("toBSON function did not return an object")
                                                    }
                                                    for (U in n) {
                                                        if ((j = n[U]) && j.toBSON) {
                                                            if ("function" != typeof j.toBSON) throw new TypeError("toBSON is not a function");
                                                            j = j.toBSON()
                                                        }
                                                        if (L = void 0 === j ? "undefined" : r(j), "$db" !== U && "$ref" !== U && "$id" !== U) {
                                                            if (null != U.match(f)) throw Error("key " + U + " must not contain null bytes");
                                                            if (i) {
                                                                if ("$" === U[0]) throw Error("key " + U + " must not start with '$'");
                                                                if (~U.indexOf(".")) throw Error("key " + U + " must not contain '.'")
                                                            }
                                                        }
                                                        "string" === L ? M = l(t, U, j, M) : "number" === L ? M = p(t, U, j, M) : "boolean" === L ? M = v(t, U, j, M) : j instanceof Date || c(j) ? M = y(t, U, j, M) : void 0 === j ? !1 === x && (M = d(t, U, 0, M)) : null === j ? M = d(t, U, 0, M) : "ObjectID" === j._bsontype ? M = w(t, U, j, M) : e.isBuffer(j) ? M = m(t, U, j, M) : j instanceof RegExp || h(j) ? M = g(t, U, j, M) : "object" === L && null == j._bsontype ? M = S(t, U, j, M, i, s, a, x, !1, D) : "object" === L && "Decimal128" === j._bsontype ? M = E(t, U, j, M) : "Long" === j._bsontype || "Timestamp" === j._bsontype ? M = O(t, U, j, M) : "Double" === j._bsontype ? M = N(t, U, j, M) : "Code" === j._bsontype ? M = B(t, U, j, M, i, s, a, x) : "function" == typeof j && a ? M = T(t, U, j, M, 0, 0, a) : "Binary" === j._bsontype ? M = I(t, U, j, M) : "Symbol" === j._bsontype ? M = R(t, U, j, M) : "DBRef" === j._bsontype ? M = P(t, U, j, M, s, a) : "BSONRegExp" === j._bsontype ? M = _(t, U, j, M) : "Int32" === j._bsontype ? M = A(t, U, j, M) : "MinKey" !== j._bsontype && "MaxKey" !== j._bsontype || (M = b(t, U, j, M))
                                                    }
                                                }
                                            D.pop(), t[M++] = 0;
                                        var W = M - o;
                                        return t[o++] = 255 & W, t[o++] = W >> 8 & 255, t[o++] = W >> 16 & 255, t[o++] = W >> 24 & 255, M
                                    }, D = {};
                                D.BSON_DATA_NUMBER = 1, D.BSON_DATA_STRING = 2, D.BSON_DATA_OBJECT = 3, D.BSON_DATA_ARRAY = 4, D.BSON_DATA_BINARY = 5, D.BSON_DATA_UNDEFINED = 6, D.BSON_DATA_OID = 7, D.BSON_DATA_BOOLEAN = 8, D.BSON_DATA_DATE = 9, D.BSON_DATA_NULL = 10, D.BSON_DATA_REGEXP = 11, D.BSON_DATA_CODE = 13, D.BSON_DATA_SYMBOL = 14, D.BSON_DATA_CODE_W_SCOPE = 15, D.BSON_DATA_INT = 16, D.BSON_DATA_TIMESTAMP = 17, D.BSON_DATA_LONG = 18, D.BSON_DATA_DECIMAL128 = 19, D.BSON_DATA_MIN_KEY = 255, D.BSON_DATA_MAX_KEY = 127, D.BSON_BINARY_SUBTYPE_DEFAULT = 0, D.BSON_BINARY_SUBTYPE_FUNCTION = 1, D.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2, D.BSON_BINARY_SUBTYPE_UUID = 3, D.BSON_BINARY_SUBTYPE_MD5 = 4, D.BSON_BINARY_SUBTYPE_USER_DEFINED = 128, D.BSON_INT32_MAX = 2147483647, D.BSON_INT32_MIN = -2147483648, D.BSON_INT64_MAX = Math.pow(2, 63) - 1, D.BSON_INT64_MIN = -Math.pow(2, 63), D.JS_INT_MAX = 9007199254740992, D.JS_INT_MIN = -9007199254740992, t.exports = x
                            }).call(e, n(42).Buffer)
                        },
                        function(t, e, n) {
                            var r = function(t, e, n, r, i) {
                                var o, u, s = "big" === n,
                                    a = 8 * i - r - 1,
                                    f = (1 << a) - 1,
                                    c = f >> 1,
                                    h = -7,
                                    l = s ? 0 : i - 1,
                                    p = s ? 1 : -1,
                                    d = t[e + l];
                                for (l += p, o = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; o = 256 * o + t[e + l], l += p, h -= 8);
                                for (u = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; u = 256 * u + t[e + l], l += p, h -= 8);
                                if (0 === o) o = 1 - c;
                                else {
                                    if (o === f) return u ? NaN : 1 / 0 * (d ? -1 : 1);
                                    u += Math.pow(2, r), o -= c
                                }
                                return (d ? -1 : 1) * u * Math.pow(2, o - r)
                            }, i = function(t, e, n, r, i, o) {
                                    var u, s, a, f = "big" === r,
                                        c = 8 * o - i - 1,
                                        h = (1 << c) - 1,
                                        l = h >> 1,
                                        p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                                        d = f ? o - 1 : 0,
                                        v = f ? -1 : 1,
                                        y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, u = h) : (u = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -u)) < 1 && (u--, a *= 2), e += u + l >= 1 ? p / a : p * Math.pow(2, 1 - l), e * a >= 2 && (u++, a /= 2), u + l >= h ? (s = 0, u = h) : u + l >= 1 ? (s = (e * a - 1) * Math.pow(2, i), u += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, i), u = 0)), isNaN(e) && (s = 0); i >= 8;) t[n + d] = 255 & s, d += v, s /= 256, i -= 8;
                                    for (u = u << i | s, isNaN(e) && (u += 8), c += i; c > 0;) t[n + d] = 255 & u, d += v, u /= 256, c -= 8;
                                    t[n + d - v] |= 128 * y
                                };
                            e.readIEEE754 = r, e.writeIEEE754 = i
                        },
                        function(t, e, n) {
                            (function(e) {
                                function r(t, n, r, w, m) {
                                    switch (n && n.toBSON && (n = n.toBSON()), void 0 === n ? "undefined" : i(n)) {
                                        case "string":
                                            return 1 + e.byteLength(t, "utf8") + 1 + 4 + e.byteLength(n, "utf8") + 1;
                                        case "number":
                                            return Math.floor(n) === n && n >= b.JS_INT_MIN && n <= b.JS_INT_MAX && n >= b.BSON_INT32_MIN && n <= b.BSON_INT32_MAX ? (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 5 : (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 9;
                                        case "undefined":
                                            return w || !m ? (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 : 0;
                                        case "boolean":
                                            return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 2;
                                        case "object":
                                            if (null == n || n instanceof p || n instanceof d || "MinKey" === n._bsontype || "MaxKey" === n._bsontype) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1;
                                            if (n instanceof a || "ObjectID" === n._bsontype) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 13;
                                            if (n instanceof Date || g(n)) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 9;
                                            if (void 0 !== e && e.isBuffer(n)) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 6 + n.length;
                                            if (n instanceof o || n instanceof u || n instanceof s || "Long" === n._bsontype || "Double" === n._bsontype || "Timestamp" === n._bsontype) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 9;
                                            if (n instanceof l || "Decimal128" === n._bsontype) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 17;
                                            if (n instanceof h || "Code" === n._bsontype) return null != n.scope && Object.keys(n.scope).length > 0 ? (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + 4 + 4 + e.byteLength(n.code.toString(), "utf8") + 1 + _(n.scope, r, m) : (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + 4 + e.byteLength(n.code.toString(), "utf8") + 1;
                                            if (n instanceof y || "Binary" === n._bsontype) return n.sub_type === y.SUBTYPE_BYTE_ARRAY ? (null != t ? e.byteLength(t, "utf8") + 1 : 0) + (n.position + 1 + 4 + 1 + 4) : (null != t ? e.byteLength(t, "utf8") + 1 : 0) + (n.position + 1 + 4 + 1);
                                            if (n instanceof f || "Symbol" === n._bsontype) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + e.byteLength(n.value, "utf8") + 4 + 1 + 1;
                                            if (n instanceof v || "DBRef" === n._bsontype) {
                                                var S = {
                                                    $ref: n.collection,
                                                    $id: n.oid
                                                };
                                                return null != n.db && (S.$db = n.db), S = Object.assign(S, n.fields), (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + _(S, r, m)
                                            }
                                            return n instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(n) ? (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + e.byteLength(n.source, "utf8") + 1 + (n.global ? 1 : 0) + (n.ignoreCase ? 1 : 0) + (n.multiline ? 1 : 0) + 1 : n instanceof c || "BSONRegExp" === n._bsontype ? (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + e.byteLength(n.pattern, "utf8") + 1 + e.byteLength(n.options, "utf8") + 1 : (null != t ? e.byteLength(t, "utf8") + 1 : 0) + _(n, r, m) + 1;
                                        case "function":
                                            if (n instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(n) || "[object RegExp]" === String.call(n)) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + e.byteLength(n.source, "utf8") + 1 + (n.global ? 1 : 0) + (n.ignoreCase ? 1 : 0) + (n.multiline ? 1 : 0) + 1;
                                            if (r && null != n.scope && Object.keys(n.scope).length > 0) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + 4 + 4 + e.byteLength(n.toString(), "utf8") + 1 + _(n.scope, r, m);
                                            if (r) return (null != t ? e.byteLength(t, "utf8") + 1 : 0) + 1 + 4 + e.byteLength(n.toString(), "utf8") + 1
                                    }
                                    return 0
                                }
                                var i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
                                        return void 0 === t ? "undefined" : _typeof2(t)
                                    } : function(t) {
                                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t)
                                    }, o = n(43).Long,
                                    u = n(68).Double,
                                    s = n(69).Timestamp,
                                    a = n(70).ObjectID,
                                    f = n(103).Symbol,
                                    c = n(71).BSONRegExp,
                                    h = n(72).Code,
                                    l = n(73),
                                    p = n(52).MinKey,
                                    d = n(74).MaxKey,
                                    v = n(75).DBRef,
                                    y = n(53).Binary,
                                    g = function(t) {
                                        return "object" === (void 0 === t ? "undefined" : i(t)) && "[object Date]" === Object.prototype.toString.call(t)
                                    }, _ = function(t, e, n) {
                                        var i = 5;
                                        if (Array.isArray(t))
                                            for (var o = 0; o < t.length; o++) i += r(o.toString(), t[o], e, !0, n);
                                        else {
                                            t.toBSON && (t = t.toBSON());
                                            for (var u in t) i += r(u, t[u], e, !1, n)
                                        }
                                        return i
                                    }, b = {};
                                b.BSON_INT32_MAX = 2147483647, b.BSON_INT32_MIN = -2147483648, b.JS_INT_MAX = 9007199254740992, b.JS_INT_MIN = -9007199254740992, t.exports = _
                            }).call(e, n(42).Buffer)
                        }
                    ])
                })
            }).call(exports, __webpack_require__(36)(module))
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e.
                default = t, e
            }

            function i(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function o(t, e) {
                return e ? t + "?link=true" : t
            }

            function u(t) {
                return {
                    authenticate: function(e, n) {
                        var r = t.getDeviceId(),
                            i = t.getDeviceInfo(r, !! t.client && t.client.clientAppID),
                            u = g.makeFetchArgs("GET");
                        return u.cors = !0, fetch(o(t.rootUrl + "/providers/anon-user/login?device=" + (0, w.uriEncodeObject)(i), n), t.fetchArgsWithLink(u, n)).then(g.checkStatus).then(function(t) {
                            return t.json()
                        }).then(function(e) {
                            return t.set(e, m)
                        })
                    }
                }
            }

            function s(t) {
                return {
                    authenticate: function(e, n) {
                        var r = t.getDeviceId(),
                            i = t.getDeviceInfo(r, !! t.client && t.client.clientAppID),
                            u = g.makeFetchArgs("POST", JSON.stringify({
                                token: e,
                                options: {
                                    device: i
                                }
                            }));
                        return u.cors = !0, fetch(o(t.rootUrl + "/providers/custom-token/login", n), t.fetchArgsWithLink(u, n)).then(g.checkStatus).then(function(t) {
                            return t.json()
                        }).then(function(e) {
                            return t.set(e, S)
                        })
                    }
                }
            }

            function a(t) {
                var e = (t.isAppClient(), "providers/local-userpass"),
                    n = (t.isAppClient(), e + "/login");
                return {
                    authenticate: function(e, r) {
                        var i = e.username,
                            u = e.password,
                            s = t.getDeviceId(),
                            a = t.getDeviceInfo(s, !! t.client && t.client.clientAppID),
                            f = g.makeFetchArgs("POST", JSON.stringify({
                                username: i,
                                password: u,
                                options: {
                                    device: a
                                }
                            }));
                        return f.cors = !0, fetch(o(t.rootUrl + "/" + n, r), t.fetchArgsWithLink(f, r)).then(g.checkStatus).then(function(t) {
                            return t.json()
                        }).then(function(e) {
                            return t.set(e, E)
                        })
                    },
                    emailConfirm: function(n, r) {
                        var i = g.makeFetchArgs("POST", JSON.stringify({
                            tokenId: n,
                            token: r
                        }));
                        return i.cors = !0, fetch(t.rootUrl + "/" + e + "/confirm", i).then(g.checkStatus).then(function(t) {
                            return t.json()
                        })
                    },
                    sendEmailConfirm: function(n) {
                        var r = g.makeFetchArgs("POST", JSON.stringify({
                            email: n
                        }));
                        return r.cors = !0, fetch(t.rootUrl + "/" + e + "/confirm/send", r).then(g.checkStatus).then(function(t) {
                            return t.json()
                        })
                    },
                    sendPasswordReset: function(n) {
                        var r = g.makeFetchArgs("POST", JSON.stringify({
                            email: n
                        }));
                        return r.cors = !0, fetch(t.rootUrl + "/" + e + "/reset/send", r).then(g.checkStatus).then(function(t) {
                            return t.json()
                        })
                    },
                    passwordReset: function(n, r, i) {
                        var o = g.makeFetchArgs("POST", JSON.stringify({
                            tokenId: n,
                            token: r,
                            password: i
                        }));
                        return o.cors = !0, fetch(t.rootUrl + "/" + e + "/reset", o).then(g.checkStatus).then(function(t) {
                            return t.json()
                        })
                    },
                    register: function(n, r) {
                        var i = g.makeFetchArgs("POST", JSON.stringify({
                            email: n,
                            password: r
                        }));
                        return i.cors = !0, fetch(t.rootUrl + "/" + e + "/register", i).then(g.checkStatus).then(function(t) {
                            return t.json()
                        })
                    }
                }
            }

            function f(t) {
                var e = (t.isAppClient(), "providers/api-key/login");
                return {
                    authenticate: function(n, r) {
                        var i = t.getDeviceId(),
                            u = t.getDeviceInfo(i, !! t.client && t.client.clientAppID),
                            s = g.makeFetchArgs("POST", JSON.stringify({
                                key: n,
                                options: {
                                    device: u
                                }
                            }));
                        return s.cors = !0, fetch(o(t.rootUrl + "/" + e, r), t.fetchArgsWithLink(s, r)).then(g.checkStatus).then(function(t) {
                            return t.json()
                        }).then(function(e) {
                            return t.set(e, O)
                        })
                    }
                }
            }

            function c() {
                for (var t = "", e = 0; e < 64; ++e) t += B.charAt(Math.floor(Math.random() * B.length));
                return t
            }

            function h(t, e, n) {
                void 0 === n && (n = t.pageRootUrl());
                var r = c();
                return t.storage.set(b.STATE_KEY, r).then(function() {
                    return t.getDeviceId()
                }).then(function(i) {
                    var o = t.getDeviceInfo(i, !! t.client && t.client.clientAppID);
                    return t.rootUrl + "/providers/oauth2-" + e + "/login?redirect=" + encodeURI(n) + "&state=" + r + "&device=" + (0, w.uriEncodeObject)(o)
                })
            }

            function l(t) {
                var e = (t.isAppClient(), "providers/oauth2-google/login");
                return {
                    authenticate: function(n, r) {
                        var i = n.authCode;
                        if (i) {
                            var u = t.getDeviceId(),
                                s = t.getDeviceInfo(u, !! t.client && t.client.clientAppID),
                                a = g.makeFetchArgs("POST", JSON.stringify({
                                    authCode: i,
                                    options: {
                                        device: s
                                    }
                                }));
                            return fetch(o(t.rootUrl + "/" + e, r), t.fetchArgsWithLink(a, r)).then(g.checkStatus).then(function(t) {
                                return t.json()
                            }).then(function(e) {
                                return t.set(e, A)
                            })
                        }
                        var f = n && n.redirectUrl ? n.redirectUrl : void 0;
                        return t.storage.set(b.STITCH_REDIRECT_PROVIDER, A).then(function() {
                            return h(t, A, f)
                        }).then(function(t) {
                            return window.location.replace(t)
                        })
                    }
                }
            }

            function p(t) {
                var e = (t.isAppClient(), "providers/oauth2-facebook/login");
                return {
                    authenticate: function(n, r) {
                        var i = n.accessToken;
                        if (i) {
                            var u = t.getDeviceId(),
                                s = t.getDeviceInfo(u, !! t.client && t.client.clientAppID),
                                a = g.makeFetchArgs("POST", JSON.stringify({
                                    accessToken: i,
                                    options: {
                                        device: s
                                    }
                                }));
                            return fetch(o(t.rootUrl + "/" + e, r), t.fetchArgsWithLink(a, r)).then(g.checkStatus).then(function(t) {
                                return t.json()
                            }).then(function(e) {
                                return t.set(e, N)
                            })
                        }
                        var f = n && n.redirectUrl ? n.redirectUrl : void 0;
                        return t.storage.set(b.STITCH_REDIRECT_PROVIDER, N).then(function() {
                            return h(t, N, f)
                        }).then(function(t) {
                            return window.location.replace(t)
                        })
                    }
                }
            }

            function d(t) {
                var e = (t.isAppClient(), "providers/mongodb-cloud/login");
                return {
                    authenticate: function(n, r) {
                        var i = n.username,
                            u = n.apiKey,
                            s = n.cors,
                            a = n.cookie,
                            f = Object.assign({}, {
                                cors: !0,
                                cookie: !1
                            }, {
                                cors: s,
                                cookie: a
                            }),
                            c = t.getDeviceId(),
                            h = t.getDeviceInfo(c, !! t.client && t.client.clientAppID),
                            l = g.makeFetchArgs("POST", JSON.stringify({
                                username: i,
                                apiKey: u,
                                options: {
                                    device: h
                                }
                            }));
                        l.cors = !0, l.credentials = "include";
                        var p = o(t.rootUrl + "/" + e, r);
                        return f.cookie ? fetch(p + "?cookie=true", l).then(g.checkStatus) : fetch(p, t.fetchArgsWithLink(l, r)).then(g.checkStatus).then(function(t) {
                            return t.json()
                        }).then(function(e) {
                            return t.set(e, T)
                        })
                    }
                }
            }

            function v(t) {
                var e;
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return e = {}, i(e, m, u(t)), i(e, O, f(t)), i(e, A, l(t)), i(e, N, p(t)), i(e, T, d(t)), i(e, E, a(t)), i(e, S, s(t)), e
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.createProviders = e.PROVIDER_TYPE_MONGODB_CLOUD = e.PROVIDER_TYPE_FACEBOOK = e.PROVIDER_TYPE_GOOGLE = e.PROVIDER_TYPE_APIKEY = e.PROVIDER_TYPE_USERPASS = e.PROVIDER_TYPE_CUSTOM = e.PROVIDER_TYPE_ANON = void 0;
            var y = n(2),
                g = r(y),
                _ = n(1),
                b = r(_),
                w = n(0),
                m = e.PROVIDER_TYPE_ANON = "anon",
                S = e.PROVIDER_TYPE_CUSTOM = "custom",
                E = e.PROVIDER_TYPE_USERPASS = "userpass",
                O = e.PROVIDER_TYPE_APIKEY = "apiKey",
                A = e.PROVIDER_TYPE_GOOGLE = "google",
                N = e.PROVIDER_TYPE_FACEBOOK = "facebook",
                T = e.PROVIDER_TYPE_MONGODB_CLOUD = "mongodbCloud",
                B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            e.createProviders = v
        },
        function(t, e, n) {
            n(37);
            var r = "undefined" != typeof self && self || this;
            t.exports = r.fetch.bind(r)
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function i(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }

            function o(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.StitchAdminClient = e.StitchAdminClientFactory = void 0;
            var u = function t(e, n, r) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, n);
                if (void 0 === i) {
                    var o = Object.getPrototypeOf(e);
                    return null === o ? void 0 : t(o, n, r)
                }
                if ("value" in i) return i.value;
                var u = i.get;
                if (void 0 !== u) return u.call(r)
            }, s = function() {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                        }
                    }
                    return function(e, n, r) {
                        return n && t(e.prototype, n), r && t(e, r), e
                    }
                }();
            n(8);
            var a = n(4),
                f = n(2),
                c = function(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }(f),
                h = n(1),
                l = n(3),
                p = (e.StitchAdminClientFactory = function() {
                    function t() {
                        throw o(this, t), new l.StitchError("StitchAdminClient can only be made from the StitchAdminClientFactory.create function")
                    }
                    return s(t, null, [{
                        key: "create",
                        value: function(t) {
                            return (0, a.newStitchClient)(p.prototype, "", {
                                baseUrl: t,
                                authCodec: h.ADMIN_CLIENT_CODEC
                            })
                        }
                    }]), t
                }(), e.StitchAdminClient = function(t) {
                    function e() {
                        return o(this, e), r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
                    }
                    return i(e, t), s(e, [{
                        key: "logout",
                        value: function() {
                            var t = this;
                            return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_do", this).call(this, "/auth/session", "DELETE", {
                                refreshOnFailure: !1,
                                useRefreshToken: !0,
                                apiVersion: 3
                            }).then(function() {
                                return t.auth.clear()
                            })
                        }
                    }, {
                        key: "userProfile",
                        value: function() {
                            return this._v3._get("/auth/profile")
                        }
                    }, {
                        key: "getAuthProviders",
                        value: function() {
                            return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_do", this).call(this, "/auth/providers", "GET", {
                                noAuth: !0,
                                apiVersion: 3
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "doSessionPost",
                        value: function() {
                            return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_do", this).call(this, "/auth/session", "POST", {
                                refreshOnFailure: !1,
                                useRefreshToken: !0,
                                apiVersion: 3
                            }).then(function(t) {
                                return t.json()
                            })
                        }
                    }, {
                        key: "apps",
                        value: function(t) {
                            var e = this._v3,
                                n = "/groups/" + t + "/apps";
                            return {
                                list: function() {
                                    return e._get(n)
                                },
                                create: function(t, r) {
                                    var i = r && r.defaults ? "?defaults=true" : "";
                                    return e._post(n + i, t)
                                },
                                app: function(t) {
                                    var r = n + "/" + t;
                                    return {
                                        get: function() {
                                            return e._get(r)
                                        },
                                        remove: function() {
                                            return e._delete(r)
                                        },
                                        export: function() {
                                            return e._get(r + "/export")
                                        },
                                        values: function() {
                                            return {
                                                list: function() {
                                                    return e._get(r + "/values")
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/values", t)
                                                },
                                                value: function(t) {
                                                    var n = r + "/values/" + t;
                                                    return {
                                                        get: function() {
                                                            return e._get(n)
                                                        },
                                                        remove: function() {
                                                            return e._delete(n)
                                                        },
                                                        update: function(t) {
                                                            return e._put(n, t)
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        services: function() {
                                            return {
                                                list: function() {
                                                    return e._get(r + "/services")
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/services", t)
                                                },
                                                service: function(t) {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/services/" + t)
                                                        },
                                                        remove: function() {
                                                            return e._delete(r + "/services/" + t)
                                                        },
                                                        update: function(n) {
                                                            return e._patch(r + "/services/" + t, n)
                                                        },
                                                        runCommand: function(n, i) {
                                                            return e._post(r + "/services/" + t + "/commands/" + n, i)
                                                        },
                                                        config: function() {
                                                            return {
                                                                get: function() {
                                                                    return e._get(r + "/services/" + t + "/config")
                                                                },
                                                                update: function(n) {
                                                                    return e._patch(r + "/services/" + t + "/config", n)
                                                                }
                                                            }
                                                        },
                                                        rules: function() {
                                                            return {
                                                                list: function() {
                                                                    return e._get(r + "/services/" + t + "/rules")
                                                                },
                                                                create: function(n) {
                                                                    return e._post(r + "/services/" + t + "/rules", n)
                                                                },
                                                                rule: function(n) {
                                                                    var i = r + "/services/" + t + "/rules/" + n;
                                                                    return {
                                                                        get: function() {
                                                                            return e._get(i)
                                                                        },
                                                                        update: function(t) {
                                                                            return e._put(i, t)
                                                                        },
                                                                        remove: function() {
                                                                            return e._delete(i)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        incomingWebhooks: function() {
                                                            return {
                                                                list: function() {
                                                                    return e._get(r + "/services/" + t + "/incoming_webhooks")
                                                                },
                                                                create: function(n) {
                                                                    return e._post(r + "/services/" + t + "/incoming_webhooks", n)
                                                                },
                                                                incomingWebhook: function(n) {
                                                                    var i = r + "/services/" + t + "/incoming_webhooks/" + n;
                                                                    return {
                                                                        get: function() {
                                                                            return e._get(i)
                                                                        },
                                                                        update: function(t) {
                                                                            return e._put(i, t)
                                                                        },
                                                                        remove: function() {
                                                                            return e._delete(i)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        pushNotifications: function() {
                                            return {
                                                list: function(t) {
                                                    return e._get(r + "/push/notifications", t)
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/push/notifications", t)
                                                },
                                                pushNotification: function(t) {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/push/notifications/" + t)
                                                        },
                                                        update: function(n) {
                                                            return e._put(r + "/push/notifications/" + t, n)
                                                        },
                                                        remove: function() {
                                                            return e._delete(r + "/push/notifications/" + t)
                                                        },
                                                        send: function() {
                                                            return e._post(r + "/push/notifications/" + t + "/send")
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        users: function() {
                                            return {
                                                list: function(t) {
                                                    return e._get(r + "/users", t)
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/users", t)
                                                },
                                                user: function(t) {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/users/" + t)
                                                        },
                                                        devices: function() {
                                                            return {
                                                                get: function() {
                                                                    return e._get(r + "/users/" + t + "/devices")
                                                                }
                                                            }
                                                        },
                                                        logout: function() {
                                                            return e._put(r + "/users/" + t + "/logout")
                                                        },
                                                        enable: function() {
                                                            return e._put(r + "/users/" + t + "/enable")
                                                        },
                                                        disable: function() {
                                                            return e._put(r + "/users/" + t + "/disable")
                                                        },
                                                        remove: function() {
                                                            return e._delete(r + "/users/" + t)
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        userRegistrations: function() {
                                            return {
                                                sendConfirmationEmail: function(t) {
                                                    return e._post(r + "/user_registrations/by_email/" + t + "/send_confirm")
                                                }
                                            }
                                        },
                                        debug: function() {
                                            return {
                                                executeFunction: function(t) {
                                                    for (var n = arguments.length, i = Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
                                                    var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                                                    return e._post(r + "/debug/execute_function", {
                                                        name: u,
                                                        arguments: i
                                                    }, {
                                                        user_id: t
                                                    })
                                                },
                                                executeFunctionSource: function(t) {
                                                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                                                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                                                    return e._post(r + "/debug/execute_function_source", {
                                                        source: n,
                                                        eval_source: i
                                                    }, {
                                                        user_id: t
                                                    })
                                                }
                                            }
                                        },
                                        authProviders: function() {
                                            return {
                                                list: function() {
                                                    return e._get(r + "/auth_providers")
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/auth_providers", t)
                                                },
                                                authProvider: function(t) {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/auth_providers/" + t)
                                                        },
                                                        update: function(n) {
                                                            return e._patch(r + "/auth_providers/" + t, n)
                                                        },
                                                        enable: function() {
                                                            return e._put(r + "/auth_providers/" + t + "/enable")
                                                        },
                                                        disable: function() {
                                                            return e._put(r + "/auth_providers/" + t + "/disable")
                                                        },
                                                        remove: function() {
                                                            return e._delete(r + "/auth_providers/" + t)
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        security: function() {
                                            return {
                                                allowedRequestOrigins: function() {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/security/allowed_request_origins")
                                                        },
                                                        update: function(t) {
                                                            return e._post(r + "/security/allowed_request_origins", t)
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        logs: function() {
                                            return {
                                                list: function(t) {
                                                    return e._get(r + "/logs", t)
                                                }
                                            }
                                        },
                                        apiKeys: function() {
                                            return {
                                                list: function() {
                                                    return e._get(r + "/api_keys")
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/api_keys", t)
                                                },
                                                apiKey: function(t) {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/api_keys/" + t)
                                                        },
                                                        remove: function() {
                                                            return e._delete(r + "/api_keys/" + t)
                                                        },
                                                        enable: function() {
                                                            return e._put(r + "/api_keys/" + t + "/enable")
                                                        },
                                                        disable: function() {
                                                            return e._put(r + "/api_keys/" + t + "/disable")
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        functions: function() {
                                            return {
                                                list: function() {
                                                    return e._get(r + "/functions")
                                                },
                                                create: function(t) {
                                                    return e._post(r + "/functions", t)
                                                },
                                                function: function(t) {
                                                    return {
                                                        get: function() {
                                                            return e._get(r + "/functions/" + t)
                                                        },
                                                        update: function(n) {
                                                            return e._put(r + "/functions/" + t, n)
                                                        },
                                                        remove: function() {
                                                            return e._delete(r + "/functions/" + t)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, {
                        key: "v2",
                        value: function() {
                            var t = this._v2;
                            return {
                                apps: function(e) {
                                    var n = "/groups/" + e + "/apps";
                                    return {
                                        list: function() {
                                            return t._get(n)
                                        },
                                        create: function(e, r) {
                                            var i = r && r.defaults ? "?defaults=true" : "";
                                            return t._post(n + i, e)
                                        },
                                        app: function(e) {
                                            var r = n + "/" + e;
                                            return {
                                                get: function() {
                                                    return t._get(r)
                                                },
                                                remove: function() {
                                                    return t._delete(r)
                                                },
                                                pipelines: function() {
                                                    return {
                                                        list: function() {
                                                            return t._get(r + "/pipelines")
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/pipelines", e)
                                                        },
                                                        pipeline: function(e) {
                                                            var n = r + "/pipelines/" + e;
                                                            return {
                                                                get: function() {
                                                                    return t._get(n)
                                                                },
                                                                remove: function() {
                                                                    return t._delete(n)
                                                                },
                                                                update: function(e) {
                                                                    return t._put(n, e)
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                values: function() {
                                                    return {
                                                        list: function() {
                                                            return t._get(r + "/values")
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/values", e)
                                                        },
                                                        value: function(e) {
                                                            var n = r + "/values/" + e;
                                                            return {
                                                                get: function() {
                                                                    return t._get(n)
                                                                },
                                                                remove: function() {
                                                                    return t._delete(n)
                                                                },
                                                                update: function(e) {
                                                                    return t._put(n, e)
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                services: function() {
                                                    return {
                                                        list: function() {
                                                            return t._get(r + "/services")
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/services", e)
                                                        },
                                                        service: function(e) {
                                                            return {
                                                                get: function() {
                                                                    return t._get(r + "/services/" + e)
                                                                },
                                                                remove: function() {
                                                                    return t._delete(r + "/services/" + e)
                                                                },
                                                                runCommand: function(n, i) {
                                                                    return t._post(r + "/services/" + e + "/commands/" + n, i)
                                                                },
                                                                config: function() {
                                                                    return {
                                                                        get: function() {
                                                                            return t._get(r + "/services/" + e + "/config")
                                                                        },
                                                                        update: function(n) {
                                                                            return t._patch(r + "/services/" + e + "/config", n)
                                                                        }
                                                                    }
                                                                },
                                                                rules: function() {
                                                                    return {
                                                                        list: function() {
                                                                            return t._get(r + "/services/" + e + "/rules")
                                                                        },
                                                                        create: function(n) {
                                                                            return t._post(r + "/services/" + e + "/rules", n)
                                                                        },
                                                                        rule: function(n) {
                                                                            var i = r + "/services/" + e + "/rules/" + n;
                                                                            return {
                                                                                get: function() {
                                                                                    return t._get(i)
                                                                                },
                                                                                update: function(e) {
                                                                                    return t._put(i, e)
                                                                                },
                                                                                remove: function() {
                                                                                    return t._delete(i)
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                incomingWebhooks: function() {
                                                                    return {
                                                                        list: function() {
                                                                            return t._get(r + "/services/" + e + "/incoming_webhooks")
                                                                        },
                                                                        create: function(n) {
                                                                            return t._post(r + "/services/" + e + "/incoming_webhooks", n)
                                                                        },
                                                                        incomingWebhook: function(n) {
                                                                            var i = r + "/services/" + e + "/incoming_webhooks/" + n;
                                                                            return {
                                                                                get: function() {
                                                                                    return t._get(i)
                                                                                },
                                                                                update: function(e) {
                                                                                    return t._put(i, e)
                                                                                },
                                                                                remove: function() {
                                                                                    return t._delete(i)
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                pushNotifications: function() {
                                                    return {
                                                        list: function(e) {
                                                            return t._get(r + "/push/notifications", e)
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/push/notifications", e)
                                                        },
                                                        pushNotification: function(e) {
                                                            return {
                                                                get: function() {
                                                                    return t._get(r + "/push/notifications/" + e)
                                                                },
                                                                update: function(n) {
                                                                    return t._put(r + "/push/notifications/" + e, n)
                                                                },
                                                                setType: function(n) {
                                                                    return t._put(r + "/push/notifications/" + e + "/type", {
                                                                        type: n
                                                                    })
                                                                },
                                                                remove: function() {
                                                                    return t._delete(r + "/push/notifications/" + e)
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                users: function() {
                                                    return {
                                                        list: function(e) {
                                                            return t._get(r + "/users", e)
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/users", e)
                                                        },
                                                        user: function(e) {
                                                            return {
                                                                get: function() {
                                                                    return t._get(r + "/users/" + e)
                                                                },
                                                                logout: function() {
                                                                    return t._put(r + "/users/" + e + "/logout")
                                                                },
                                                                remove: function() {
                                                                    return t._delete(r + "/users/" + e)
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                dev: function() {
                                                    return {
                                                        executePipeline: function(e, n, i) {
                                                            return t._post(r + "/dev/pipeline", e, Object.assign({}, i, {
                                                                user_id: n
                                                            }))
                                                        }
                                                    }
                                                },
                                                authProviders: function() {
                                                    return {
                                                        list: function() {
                                                            return t._get(r + "/auth_providers")
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/auth_providers", e)
                                                        },
                                                        authProvider: function(e) {
                                                            return {
                                                                get: function() {
                                                                    return t._get(r + "/auth_providers/" + e)
                                                                },
                                                                update: function(n) {
                                                                    return t._patch(r + "/auth_providers/" + e, n)
                                                                },
                                                                enable: function() {
                                                                    return t._put(r + "/auth_providers/" + e + "/enable")
                                                                },
                                                                disable: function() {
                                                                    return t._put(r + "/auth_providers/" + e + "/disable")
                                                                },
                                                                remove: function() {
                                                                    return t._delete(r + "/auth_providers/" + e)
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                security: function() {
                                                    return {
                                                        allowedRequestOrigins: function() {
                                                            return {
                                                                get: function() {
                                                                    return t._get(r + "/security/allowed_request_origins")
                                                                },
                                                                update: function(e) {
                                                                    return t._post(r + "/security/allowed_request_origins", e)
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                logs: function() {
                                                    return {
                                                        list: function(e) {
                                                            return t._get(r + "/logs", e)
                                                        }
                                                    }
                                                },
                                                apiKeys: function() {
                                                    return {
                                                        list: function() {
                                                            return t._get(r + "/api_keys")
                                                        },
                                                        create: function(e) {
                                                            return t._post(r + "/api_keys", e)
                                                        },
                                                        apiKey: function(e) {
                                                            return {
                                                                get: function() {
                                                                    return t._get(r + "/api_keys/" + e)
                                                                },
                                                                remove: function() {
                                                                    return t._delete(r + "/api_keys/" + e)
                                                                },
                                                                enable: function() {
                                                                    return t._put(r + "/api_keys/" + e + "/enable")
                                                                },
                                                                disable: function() {
                                                                    return t._put(r + "/api_keys/" + e + "/disable")
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, {
                        key: "type",
                        get: function() {
                            return c.
                            default
                        }
                    }, {
                        key: "_v3",
                        get: function() {
                            var t = this,
                                n = function(n, r, i) {
                                    return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_do", t).call(t, n, r, Object.assign({}, {
                                        apiVersion: 3
                                    }, i)).then(function(t) {
                                        return (t.headers.get("content-type") || "").split(",").indexOf("application/json") >= 0 ? t.json() : t
                                    })
                                };
                            return {
                                _get: function(t, e) {
                                    return n(t, "GET", {
                                        queryParams: e
                                    })
                                },
                                _put: function(t, e) {
                                    return e ? n(t, "PUT", {
                                        body: JSON.stringify(e)
                                    }) : n(t, "PUT")
                                },
                                _patch: function(t, e) {
                                    return e ? n(t, "PATCH", {
                                        body: JSON.stringify(e)
                                    }) : n(t, "PATCH")
                                },
                                _delete: function(t) {
                                    return n(t, "DELETE")
                                },
                                _post: function(t, e, r) {
                                    return r ? n(t, "POST", {
                                        body: JSON.stringify(e),
                                        queryParams: r
                                    }) : n(t, "POST", {
                                        body: JSON.stringify(e)
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_v2",
                        get: function() {
                            var t = this,
                                n = function(n, r, i) {
                                    return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_do", t).call(t, n, r, Object.assign({}, {
                                        apiVersion: 2
                                    }, i)).then(function(t) {
                                        return (t.headers.get("content-type") || "").split(",").indexOf("application/json") >= 0 ? t.json() : t
                                    })
                                };
                            return {
                                _get: function(t, e) {
                                    return n(t, "GET", {
                                        queryParams: e
                                    })
                                },
                                _put: function(t, e) {
                                    return e ? n(t, "PUT", {
                                        body: JSON.stringify(e)
                                    }) : n(t, "PUT")
                                },
                                _patch: function(t, e) {
                                    return e ? n(t, "PATCH", {
                                        body: JSON.stringify(e)
                                    }) : n(t, "PATCH")
                                },
                                _delete: function(t) {
                                    return n(t, "DELETE")
                                },
                                _post: function(t, e, r) {
                                    return r ? n(t, "POST", {
                                        body: JSON.stringify(e),
                                        queryParams: r
                                    }) : n(t, "POST", {
                                        body: JSON.stringify(e)
                                    })
                                }
                            }
                        }
                    }]), e
                }(a.StitchClient))
        },
        function(t, e, n) {
            ! function() {
                function t(t) {
                    this.message = t
                }
                var n = e,
                    r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                t.prototype = new Error, t.prototype.name = "InvalidCharacterError", n.btoa || (n.btoa = function(e) {
                    for (var n, i, o = String(e), u = 0, s = r, a = ""; o.charAt(0 | u) || (s = "=", u % 1); a += s.charAt(63 & n >> 8 - u % 1 * 8)) {
                        if ((i = o.charCodeAt(u += .75)) > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                        n = n << 8 | i
                    }
                    return a
                }), n.atob || (n.atob = function(e) {
                    var n = String(e).replace(/[=]+$/, "");
                    if (n.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
                    for (var i, o, u = 0, s = 0, a = ""; o = n.charAt(s++);~ o && (i = u % 4 ? 64 * i + o : o, u++ % 4) ? a += String.fromCharCode(255 & i >> (-2 * u & 6)) : 0) o = r.indexOf(o);
                    return a
                })
            }()
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e.
                default = t, e
            }

            function i(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function o(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function u(t, e, n) {
                var r = Object.create(b.prototype),
                    i = void 0;
                return i = t && "" !== t.clientAppID ? "client." + t.clientAppID : "admin", n = Object.assign({
                    codec: p.APP_CLIENT_CODEC,
                    namespace: i,
                    storageType: "localStorage"
                }, n), r.client = t, r.rootUrl = e, r.codec = n.codec, r.platform = n.platform || g, r.storage = (0, f.createStorage)(n), r.providers = (0, c.createProviders)(r, n), Promise.all([r._get(), r.storage.get(p.REFRESH_TOKEN_KEY), r.storage.get(p.USER_LOGGED_IN_PT_KEY), r.storage.get(p.DEVICE_ID_KEY)]).then(function(t) {
                    var e = s(t, 4),
                        n = e[0],
                        i = e[1],
                        o = e[2],
                        u = e[3];
                    return r.auth = n, r.authedId = n.userId, r.rt = i, r.loggedInProviderType = o, r.deviceId = u, r
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Auth = e.AuthFactory = void 0;
            var s = function() {
                function t(t, e) {
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var u, s = t[Symbol.iterator](); !(r = (u = s.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                    } catch (t) {
                        i = !0, o = t
                    } finally {
                        try {
                            !r && s.
                            return &&s.
                            return ()
                        } finally {
                            if (i) throw o
                        }
                    }
                    return n
                }
                return function(e, n) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
                a = function() {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                        }
                    }
                    return function(e, n, r) {
                        return n && t(e.prototype, n), r && t(e, r), e
                    }
                }();
            e.newAuth = u;
            var f = n(12),
                c = n(7),
                h = n(3),
                l = n(1),
                p = r(l),
                d = n(2),
                v = r(d),
                y = n(24),
                g = r(y),
                _ = n(31),
                b = (e.AuthFactory = function() {
                    function t() {
                        throw o(this, t), new h.StitchError("Auth can only be made from the AuthFactory.create function")
                    }
                    return a(t, null, [{
                        key: "create",
                        value: function(t, e, n) {
                            return u(t, e, n)
                        }
                    }]), t
                }(), e.Auth = function() {
                    function t(e, n, r) {
                        throw o(this, t), new h.StitchError("Auth can only be made from the AuthFactory.create function")
                    }
                    return a(t, [{
                        key: "getDeviceInfo",
                        value: function(t, e) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                                r = {
                                    appId: e,
                                    appVersion: n,
                                    sdkVersion: v.SDK_VERSION
                                };
                            return t && (r.deviceId = t), this.platform && (r.platform = this.platform.name, r.platformVersion = this.platform.version), r
                        }
                    }, {
                        key: "provider",
                        value: function(t) {
                            if (!this.providers.hasOwnProperty(t)) throw new Error("Invalid auth provider specified: " + t);
                            return this.providers[t]
                        }
                    }, {
                        key: "refreshToken",
                        value: function() {
                            var t = this;
                            return this.client.doSessionPost().then(function(e) {
                                return t.set(e)
                            })
                        }
                    }, {
                        key: "pageRootUrl",
                        value: function() {
                            return [window.location.protocol, "//", window.location.host, window.location.pathname].join("")
                        }
                    }, {
                        key: "error",
                        value: function() {
                            return this._error
                        }
                    }, {
                        key: "isAppClient",
                        value: function() {
                            return !this.client || this.client.type === v.APP_CLIENT_TYPE
                        }
                    }, {
                        key: "handleRedirect",
                        value: function() {
                            var t = this;
                            if ("undefined" != typeof window && window.location && window.location.hash) return Promise.all([this.storage.get(p.STATE_KEY), this.storage.get(p.STITCH_REDIRECT_PROVIDER)]).then(function(e) {
                                var n = s(e, 2),
                                    r = n[0],
                                    i = n[1],
                                    o = window.location.hash.substring(1),
                                    u = t.parseRedirectFragment(o, r);
                                return u.lastError || u.found && !i ? (console.error("StitchClient: error from redirect: " + (u.lastError ? u.lastError : "provider type not set")), t._error = u.lastError, window.history.replaceState(null, "", t.pageRootUrl()), Promise.reject()) : u.found ? Promise.all([t.storage.remove(p.STATE_KEY), t.storage.remove(p.STITCH_REDIRECT_PROVIDER)]).then(function() {
                                    return {
                                        redirectState: u,
                                        redirectProvider: i
                                    }
                                }) : Promise.reject()
                            }).then(function(e) {
                                var n = e.redirectState,
                                    r = e.redirectProvider;
                                return n.stateValid ? n.ua ? t.set(n.ua, r) : void console.error("StitchClient: no UA value was returned from redirect!") : (console.error("StitchClient: state values did not match!"), void window.history.replaceState(null, "", t.pageRootUrl()))
                            }).then(function() {
                                return window.history.replaceState(null, "", t.pageRootUrl())
                            }).
                            catch (function(t) {
                                if (t) throw t
                            })
                        }
                    }, {
                        key: "getCookie",
                        value: function(t) {
                            for (var e = document.cookie.split(" "), n = 0; n < e.length; n++) {
                                var r = e[n],
                                    i = r.indexOf("=");
                                if (r.substring(0, i) === t) {
                                    var o = r.substring(i + 1, r.length);
                                    return ";" === o[o.length - 1] ? o.substring(0, r.length - 1) : o
                                }
                            }
                        }
                    }, {
                        key: "handleCookie",
                        value: function() {
                            var t = this;
                            if ("undefined" != typeof window && "undefined" != typeof document && document.cookie) {
                                var e = this.getCookie(p.USER_AUTH_COOKIE_NAME);
                                if (e) {
                                    document.cookie = p.USER_AUTH_COOKIE_NAME + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                                    var n = this.unmarshallUserAuth(e);
                                    return this.set(n, c.PROVIDER_TYPE_MONGODB_CLOUD).then(function() {
                                        return window.history.replaceState(null, "", t.pageRootUrl())
                                    })
                                }
                            }
                        }
                    }, {
                        key: "clear",
                        value: function() {
                            return this.auth = null, this.authedId = null, this.rt = null, this.loggedInProviderType = null, Promise.all([this.storage.remove(p.USER_AUTH_KEY), this.storage.remove(p.REFRESH_TOKEN_KEY), this.storage.remove(p.USER_LOGGED_IN_PT_KEY), this.storage.remove(p.STITCH_REDIRECT_PROVIDER)])
                        }
                    }, {
                        key: "getDeviceId",
                        value: function() {
                            return this.deviceId
                        }
                    }, {
                        key: "isAccessTokenExpired",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p.DEFAULT_ACCESS_TOKEN_EXPIRE_WITHIN_SECS,
                                e = this.getAccessToken();
                            if (!e) return !1;
                            var n = void 0;
                            try {
                                n = _(e)
                            } catch (t) {
                                return !1
                            }
                            return !!n && (n.exp && Math.floor(Date.now() / 1e3) >= n.exp - t)
                        }
                    }, {
                        key: "getAccessToken",
                        value: function() {
                            return this.auth.accessToken
                        }
                    }, {
                        key: "getRefreshToken",
                        value: function() {
                            return this.rt
                        }
                    }, {
                        key: "set",
                        value: function(t) {
                            var e = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                            if (t) {
                                var r = {}, i = [];
                                return n && (this.loggedInProviderType = n, i.push(this.storage.set(p.USER_LOGGED_IN_PT_KEY, n))), t[this.codec.refreshToken] && (this.rt = t[this.codec.refreshToken], delete t[this.codec.refreshToken], i.push(this.storage.set(p.REFRESH_TOKEN_KEY, this.rt))), t[this.codec.deviceId] && (this.deviceId = t[this.codec.deviceId], delete t[this.codec.deviceId], i.push(this.storage.set(p.DEVICE_ID_KEY, this.deviceId))), t[this.codec.accessToken] && (r.accessToken = t[this.codec.accessToken]), t[this.codec.userId] && (r.userId = t[this.codec.userId]), this.auth = Object.assign(this.auth ? this.auth : {}, r), this.authedId = this.auth.userId, i.push(this.storage.set(p.USER_AUTH_KEY, JSON.stringify(this.auth))), Promise.all(i).then(function() {
                                    return e.auth
                                })
                            }
                        }
                    }, {
                        key: "_get",
                        value: function() {
                            var t = this;
                            return this.storage.get(p.USER_AUTH_KEY).then(function(e) {
                                if (!e) return {};
                                try {
                                    return JSON.parse(e)
                                } catch (e) {
                                    return t.clear().then(function() {
                                        throw new h.StitchError("Failure retrieving stored auth")
                                    })
                                }
                            })
                        }
                    }, {
                        key: "getLoggedInProviderType",
                        value: function() {
                            return this.loggedInProviderType
                        }
                    }, {
                        key: "parseRedirectFragment",
                        value: function(t, e) {
                            for (var n = t.split("&"), r = {
                                    ua: null,
                                    found: !1,
                                    stateValid: !1,
                                    lastError: null
                                }, i = !1, o = 0; o < n.length && !i; ++o) {
                                var u = n[o].split("=");
                                switch (decodeURIComponent(u[0])) {
                                    case p.STITCH_ERROR_KEY:
                                        r.lastError = decodeURIComponent(u[1]), r.found = !0, i = !0;
                                        break;
                                    case p.USER_AUTH_KEY:
                                        try {
                                            r.ua = this.unmarshallUserAuth(decodeURIComponent(u[1])), r.found = !0
                                        } catch (t) {
                                            r.lastError = t
                                        }
                                        continue;
                                    case p.STITCH_LINK_KEY:
                                        r.found = !0;
                                        continue;
                                    case p.STATE_KEY:
                                        r.found = !0;
                                        var s = decodeURIComponent(u[1]);
                                        e && e === s && (r.stateValid = !0);
                                        continue;
                                    default:
                                        continue
                                }
                            }
                            return r
                        }
                    }, {
                        key: "unmarshallUserAuth",
                        value: function(t) {
                            var e, n = t.split("$");
                            if (4 !== n.length) throw new RangeError("invalid user auth data provided: " + t);
                            return e = {}, i(e, this.codec.accessToken, n[0]), i(e, this.codec.refreshToken, n[1]), i(e, this.codec.userId, n[2]), i(e, this.codec.deviceId, n[3]), e
                        }
                    }, {
                        key: "fetchArgsWithLink",
                        value: function(t, e) {
                            return e && (t.headers.Authorization = "Bearer " + this.getAccessToken()), t
                        }
                    }]), t
                }())
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e) {
                switch (t) {
                    case null:
                    case void 0:
                        var n = [s.USER_AUTH_KEY, s.REFRESH_TOKEN_KEY, s.DEVICE_ID_KEY, s.STATE_KEY].map(function(t) {
                            return Promise.resolve(e.store.getItem(t)).then(function(n) {
                                return !!n && e.store.setItem(e._generateKey(t), n)
                            }).then(function() {
                                return e.store.removeItem(t)
                            })
                        });
                        return Promise.all(n).then(function() {
                            return e.store.setItem(c, f)
                        })
                }
            }

            function o(t) {
                var e = t.storageType,
                    n = t.storage,
                    r = t.namespace;
                if ("localStorage" === e) {
                    if ("undefined" != typeof window && "localStorage" in window && null !== window.localStorage) return new h(window.localStorage, r)
                } else if ("sessionStorage" === e) {
                    if ("undefined" != typeof window && "sessionStorage" in window && null !== window.sessionStorage) return new h(window.sessionStorage, r)
                } else if ("customStorage" == e) return new h(n, r);
                return new h(new a, r)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.MemoryStorage = void 0;
            var u = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }();
            e.createStorage = o;
            var s = n(1),
                a = e.MemoryStorage = function() {
                    function t() {
                        r(this, t), this._data = {}, this._orderedKeys = [], this.length = 0
                    }
                    return u(t, [{
                        key: "getItem",
                        value: function(t) {
                            return t in this._data ? this._data[t] : null
                        }
                    }, {
                        key: "setItem",
                        value: function(t, e) {
                            return this._orderedKeys.push(t), this._data[t] = e, this.length++, this._data[t]
                        }
                    }, {
                        key: "removeItem",
                        value: function(t) {
                            this._orderedKeys.pop(t), delete this._data[t], this.length--
                        }
                    }, {
                        key: "key",
                        value: function(t) {
                            return this._orderedKeys[t]
                        }
                    }]), t
                }(),
                f = 1,
                c = "__stitch_storage_version__",
                h = function() {
                    function t(e, n) {
                        var o = this;
                        r(this, t), this.store = e, this.namespace = "_stitch." + n, this._migration = Promise.resolve(this.store.getItem(c)).then(function(t) {
                            return i(t, o)
                        })
                    }
                    return u(t, [{
                        key: "_generateKey",
                        value: function(t) {
                            return this.namespace + "." + t
                        }
                    }, {
                        key: "get",
                        value: function(t) {
                            var e = this;
                            return Promise.resolve(this._migration).then(function() {
                                return e.store.getItem(e._generateKey(t))
                            })
                        }
                    }, {
                        key: "set",
                        value: function(t, e) {
                            var n = this;
                            return Promise.resolve(this._migration).then(function() {
                                return n.store.setItem(n._generateKey(t), e)
                            }).then(function() {
                                return e
                            })
                        }
                    }, {
                        key: "remove",
                        value: function(t) {
                            var e = this;
                            return Promise.resolve(this._migration).then(function() {
                                return e.store.removeItem(e._generateKey(t))
                            })
                        }
                    }]), t
                }()
        },
        function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.BSON = e.StitchAdminClientFactory = e.StitchClientFactory = void 0;
            var r = n(4),
                i = n(9),
                o = n(5);
            e.StitchClientFactory = r.StitchClientFactory, e.StitchAdminClientFactory = i.StitchAdminClientFactory, e.BSON = o.BSON
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                o = n(0),
                u = function() {
                    function t(e, n) {
                        r(this, t), this.client = e, this.serviceName = n
                    }
                    return i(t, [{
                        key: "put",
                        value: function(t, e, n, r, i) {
                            return (0, o.serviceResponse)(this, {
                                action: "put",
                                args: {
                                    bucket: t,
                                    key: e,
                                    acl: n,
                                    contentType: r,
                                    body: i
                                }
                            })
                        }
                    }, {
                        key: "signPolicy",
                        value: function(t, e, n, r) {
                            return (0, o.serviceResponse)(this, {
                                action: "signPolicy",
                                args: {
                                    bucket: t,
                                    key: e,
                                    acl: n,
                                    contentType: r
                                }
                            })
                        }
                    }]), t
                }();
            e.
            default = u, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                o = n(0),
                u = function() {
                    function t(e, n) {
                        r(this, t), this.client = e, this.serviceName = n
                    }
                    return i(t, [{
                        key: "send",
                        value: function(t, e, n, r) {
                            return (0, o.serviceResponse)(this, {
                                action: "send",
                                args: {
                                    fromAddress: t,
                                    toAddress: e,
                                    subject: n,
                                    body: r
                                }
                            })
                        }
                    }]), t
                }();
            e.
            default = u, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e) {
                var n = void 0;
                return "string" != typeof t ? n = t : (n = {
                    url: t
                }, e.authUrl && (n.authUrl = e.authUrl)), n
            }

            function o(t, e, n) {
                return (0, s.serviceResponse)(e, {
                    action: t,
                    args: n
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var u = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                s = n(0),
                a = function() {
                    function t(e, n) {
                        r(this, t), this.client = e, this.serviceName = n
                    }
                    return u(t, [{
                        key: "get",
                        value: function(t) {
                            return o("get", this, i(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}))
                        }
                    }, {
                        key: "post",
                        value: function(t) {
                            return o("post", this, i(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}))
                        }
                    }, {
                        key: "put",
                        value: function(t) {
                            return o("put", this, i(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}))
                        }
                    }, {
                        key: "patch",
                        value: function(t) {
                            return o("patch", this, i(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}))
                        }
                    }, {
                        key: "delete",
                        value: function(t) {
                            return o("delete", this, i(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}))
                        }
                    }, {
                        key: "head",
                        value: function(t) {
                            return o("head", this, i(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}))
                        }
                    }]), t
                }();
            e.
            default = a, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(14),
                o = r(i),
                u = n(15),
                s = r(u),
                a = n(16),
                f = r(a),
                c = n(20),
                h = r(c),
                l = n(21),
                p = r(l);
            e.
            default = {
                "aws-s3": o.
                default,
                "aws-ses": s.
                default,
                aws_s3: o.
                default,
                aws_ses: s.
                default,
                http: f.
                default,
                mongodb: h.
                default,
                twilio: p.
                default
            }, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o = e ? "updateMany" : "updateOne",
                    u = void 0;
                return !e && i.upsert && (u = {
                    upsert: !0
                }), a(o, t, s(t, {
                    query: n,
                    update: r
                }, u))
            }

            function o(t) {
                var e = t.service;
                return a("find", e, s(e, {
                    query: t.query,
                    project: t.project,
                    limit: t.limit,
                    sort: t.sort
                }))
            }

            function u(t, e) {
                return a("aggregate", t, s(t, {
                    pipeline: e
                }))
            }

            function s(t, e) {
                var n = t.db.name,
                    r = t.name,
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return Object.assign({
                    database: n,
                    collection: r
                }, e, i)
            }

            function a(t, e, n) {
                return (0, h.serviceResponse)(e.db, {
                    serviceName: e.db.service,
                    action: t,
                    args: n
                })
            }

            function f(t, e, n) {
                return this instanceof f ? (this.service = t, this.query = e, this.project = n, this) : new f(t, e, n)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var c = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                h = n(0),
                l = function() {
                    function t(e, n) {
                        r(this, t), this.db = e, this.name = n
                    }
                    return c(t, [{
                        key: "insertOne",
                        value: function(t) {
                            return a("insertOne", this, s(this, {
                                document: t
                            }))
                        }
                    }, {
                        key: "insertMany",
                        value: function(t) {
                            return a("insertMany", this, s(this, {
                                documents: Array.isArray(t) ? t : [t]
                            }))
                        }
                    }, {
                        key: "deleteOne",
                        value: function(t) {
                            return a("deleteOne", this, s(this, {
                                query: t
                            }))
                        }
                    }, {
                        key: "deleteMany",
                        value: function(t) {
                            return a("deleteMany", this, s(this, {
                                query: t
                            }))
                        }
                    }, {
                        key: "updateOne",
                        value: function(t, e) {
                            return i(this, !1, t, e, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {})
                        }
                    }, {
                        key: "updateMany",
                        value: function(t, e) {
                            return i(this, !0, t, e)
                        }
                    }, {
                        key: "find",
                        value: function(t, e) {
                            return new f(this, t, e)
                        }
                    }, {
                        key: "findOne",
                        value: function(t, e) {
                            return a("findOne", this, s(this, {
                                query: t,
                                project: e
                            }))
                        }
                    }, {
                        key: "aggregate",
                        value: function(t) {
                            return u(this, t)
                        }
                    }, {
                        key: "count",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = void 0;
                            return e.limit && (n = {
                                limit: e.limit
                            }), a("count", this, s(this, {
                                count: !0,
                                query: t
                            }, n))
                        }
                    }]), t
                }();
            f.prototype.limit = function(t) {
                return this.limit = t, this
            }, f.prototype.sort = function(t) {
                return this.sort = t, this
            }, f.prototype.execute = function(t) {
                return o(this)
            }, e.
            default = l, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                o = n(18),
                u = function(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }(o),
                s = function() {
                    function t(e, n, i) {
                        r(this, t), this.client = e, this.service = n, this.name = i
                    }
                    return i(t, [{
                        key: "collection",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return new u.
                            default (this, t, e)
                        }
                    }]), t
                }();
            e.
            default = s, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                o = n(19),
                u = function(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }(o),
                s = function() {
                    function t(e, n) {
                        r(this, t), this.stitchClient = e, this.serviceName = n
                    }
                    return i(t, [{
                        key: "db",
                        value: function(t) {
                            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            return new u.
                            default (this.stitchClient, this.serviceName, t)
                        }
                    }]), t
                }();
            e.
            default = s, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
                o = n(0),
                u = function() {
                    function t(e, n) {
                        r(this, t), this.client = e, this.serviceName = n
                    }
                    return i(t, [{
                        key: "send",
                        value: function(t, e, n) {
                            return (0, o.serviceResponse)(this, {
                                action: "send",
                                args: {
                                    from: t,
                                    to: e,
                                    body: n
                                }
                            })
                        }
                    }]), t
                }();
            e.
            default = u, t.exports = e.
            default
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var n = t.indexOf("=");
                return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
            }

            function i(t) {
                var e = r(t),
                    n = e[0],
                    i = e[1];
                return 3 * (n + i) / 4 - i
            }

            function o(t, e, n) {
                return 3 * (e + n) / 4 - n
            }

            function u(t) {
                for (var e, n = r(t), i = n[0], u = n[1], s = new l(o(t, i, u)), a = 0, f = u > 0 ? i - 4 : i, c = 0; c < f; c += 4) e = h[t.charCodeAt(c)] << 18 | h[t.charCodeAt(c + 1)] << 12 | h[t.charCodeAt(c + 2)] << 6 | h[t.charCodeAt(c + 3)], s[a++] = e >> 16 & 255, s[a++] = e >> 8 & 255, s[a++] = 255 & e;
                return 2 === u && (e = h[t.charCodeAt(c)] << 2 | h[t.charCodeAt(c + 1)] >> 4, s[a++] = 255 & e), 1 === u && (e = h[t.charCodeAt(c)] << 10 | h[t.charCodeAt(c + 1)] << 4 | h[t.charCodeAt(c + 2)] >> 2, s[a++] = e >> 8 & 255, s[a++] = 255 & e), s
            }

            function s(t) {
                return c[t >> 18 & 63] + c[t >> 12 & 63] + c[t >> 6 & 63] + c[63 & t]
            }

            function a(t, e, n) {
                for (var r, i = [], o = e; o < n; o += 3) r = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), i.push(s(r));
                return i.join("")
            }

            function f(t) {
                for (var e, n = t.length, r = n % 3, i = [], o = 0, u = n - r; o < u; o += 16383) i.push(a(t, o, o + 16383 > u ? u : o + 16383));
                return 1 === r ? (e = t[n - 1], i.push(c[e >> 2] + c[e << 4 & 63] + "==")) : 2 === r && (e = (t[n - 2] << 8) + t[n - 1], i.push(c[e >> 10] + c[e >> 4 & 63] + c[e << 2 & 63] + "=")), i.join("")
            }
            e.byteLength = i, e.toByteArray = u, e.fromByteArray = f;
            for (var c = [], h = [], l = "undefined" != typeof Uint8Array ? Uint8Array : Array, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = 0, v = p.length; d < v; ++d) c[d] = p[d], h[p.charCodeAt(d)] = d;
            h["-".charCodeAt(0)] = 62, h["_".charCodeAt(0)] = 63
        },
        function(t, e, n) {
            "use strict";
            (function(t) {
                function r() {
                    return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function i(t, e) {
                    if (r() < e) throw new RangeError("Invalid typed array length");
                    return o.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = o.prototype) : (null === t && (t = new o(e)), t.length = e), t
                }

                function o(t, e, n) {
                    if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(t, e, n);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return f(this, t)
                    }
                    return u(this, t, e, n)
                }

                function u(t, e, n, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? l(t, e, n, r) : "string" == typeof e ? c(t, e, n) : p(t, e)
                }

                function s(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function a(t, e, n, r) {
                    return s(e), e <= 0 ? i(t, e) : void 0 !== n ? "string" == typeof r ? i(t, e).fill(n, r) : i(t, e).fill(n) : i(t, e)
                }

                function f(t, e) {
                    if (s(e), t = i(t, e < 0 ? 0 : 0 | d(e)), !o.TYPED_ARRAY_SUPPORT)
                        for (var n = 0; n < e; ++n) t[n] = 0;
                    return t
                }

                function c(t, e, n) {
                    if ("string" == typeof n && "" !== n || (n = "utf8"), !o.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | y(e, n);
                    t = i(t, r);
                    var u = t.write(e, n);
                    return u !== r && (t = t.slice(0, u)), t
                }

                function h(t, e) {
                    var n = e.length < 0 ? 0 : 0 | d(e.length);
                    t = i(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function l(t, e, n, r) {
                    if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                    return e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r), o.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = o.prototype) : t = h(t, e), t
                }

                function p(t, e) {
                    if (o.isBuffer(e)) {
                        var n = 0 | d(e.length);
                        return t = i(t, n), 0 === t.length ? t : (e.copy(t, 0, 0, n), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || q(e.length) ? i(t, 0) : h(t, e);
                        if ("Buffer" === e.type && Z(e.data)) return h(t, e.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function d(t) {
                    if (t >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                    return 0 | t
                }

                function v(t) {
                    return +t != t && (t = 0), o.alloc(+t)
                }

                function y(t, e) {
                    if (o.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return $(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return G(t).length;
                        default:
                            if (r) return $(t).length;
                            e = ("" + e).toLowerCase(), r = !0
                    }
                }

                function g(t, e, n) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if (n >>>= 0, e >>>= 0, n <= e) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return x(this, e, n);
                        case "utf8":
                        case "utf-8":
                            return B(this, e, n);
                        case "ascii":
                            return R(this, e, n);
                        case "latin1":
                        case "binary":
                            return P(this, e, n);
                        case "base64":
                            return T(this, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return D(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function _(t, e, n) {
                    var r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function b(t, e, n, r, i) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (i) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!i) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = o.from(e, r)), o.isBuffer(e)) return 0 === e.length ? -1 : w(t, e, n, r, i);
                    if ("number" == typeof e) return e &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : w(t, [e], n, r, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function w(t, e, n, r, i) {
                    function o(t, e) {
                        return 1 === u ? t[e] : t.readUInt16BE(e * u)
                    }
                    var u = 1,
                        s = t.length,
                        a = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        u = 2, s /= 2, a /= 2, n /= 2
                    }
                    var f;
                    if (i) {
                        var c = -1;
                        for (f = n; f < s; f++)
                            if (o(t, f) === o(e, -1 === c ? 0 : f - c)) {
                                if (-1 === c && (c = f), f - c + 1 === a) return c * u
                            } else -1 !== c && (f -= f - c), c = -1
                    } else
                        for (n + a > s && (n = s - a), f = n; f >= 0; f--) {
                            for (var h = !0, l = 0; l < a; l++)
                                if (o(t, f + l) !== o(e, l)) {
                                    h = !1;
                                    break
                                }
                            if (h) return f
                        }
                    return -1
                }

                function m(t, e, n, r) {
                    n = Number(n) || 0;
                    var i = t.length - n;
                    r ? (r = Number(r)) > i && (r = i) : r = i;
                    var o = e.length;
                    if (o % 2 != 0) throw new TypeError("Invalid hex string");
                    r > o / 2 && (r = o / 2);
                    for (var u = 0; u < r; ++u) {
                        var s = parseInt(e.substr(2 * u, 2), 16);
                        if (isNaN(s)) return u;
                        t[n + u] = s
                    }
                    return u
                }

                function S(t, e, n, r) {
                    return z($(e, t.length - n), t, n, r)
                }

                function E(t, e, n, r) {
                    return z(V(e), t, n, r)
                }

                function O(t, e, n, r) {
                    return E(t, e, n, r)
                }

                function A(t, e, n, r) {
                    return z(G(e), t, n, r)
                }

                function N(t, e, n, r) {
                    return z(J(e, t.length - n), t, n, r)
                }

                function T(t, e, n) {
                    return 0 === e && n === t.length ? H.fromByteArray(t) : H.fromByteArray(t.slice(e, n))
                }

                function B(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], i = e; i < n;) {
                        var o = t[i],
                            u = null,
                            s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                        if (i + s <= n) {
                            var a, f, c, h;
                            switch (s) {
                                case 1:
                                    o < 128 && (u = o);
                                    break;
                                case 2:
                                    a = t[i + 1], 128 == (192 & a) && (h = (31 & o) << 6 | 63 & a) > 127 && (u = h);
                                    break;
                                case 3:
                                    a = t[i + 1], f = t[i + 2], 128 == (192 & a) && 128 == (192 & f) && (h = (15 & o) << 12 | (63 & a) << 6 | 63 & f) > 2047 && (h < 55296 || h > 57343) && (u = h);
                                    break;
                                case 4:
                                    a = t[i + 1], f = t[i + 2], c = t[i + 3], 128 == (192 & a) && 128 == (192 & f) && 128 == (192 & c) && (h = (15 & o) << 18 | (63 & a) << 12 | (63 & f) << 6 | 63 & c) > 65535 && h < 1114112 && (u = h)
                            }
                        }
                        null === u ? (u = 65533, s = 1) : u > 65535 && (u -= 65536, r.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), r.push(u), i += s
                    }
                    return I(r)
                }

                function I(t) {
                    var e = t.length;
                    if (e <= Q) return String.fromCharCode.apply(String, t);
                    for (var n = "", r = 0; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += Q));
                    return n
                }

                function R(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                    return r
                }

                function P(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                    return r
                }

                function x(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var i = "", o = e; o < n; ++o) i += K(t[o]);
                    return i
                }

                function D(t, e, n) {
                    for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                    return i
                }

                function M(t, e, n) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function k(t, e, n, r, i, u) {
                    if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > i || e < u) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function U(t, e, n, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
                }

                function j(t, e, n, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
                }

                function L(t, e, n, r, i, o) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function C(t, e, n, r, i) {
                    return i || L(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), X.write(t, e, n, r, 23, 4), n + 4
                }

                function F(t, e, n, r, i) {
                    return i || L(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), X.write(t, e, n, r, 52, 8), n + 8
                }

                function Y(t) {
                    if (t = W(t).replace(tt, ""), t.length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }

                function W(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }

                function K(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function $(t, e) {
                    e = e || 1 / 0;
                    for (var n, r = t.length, i = null, o = [], u = 0; u < r; ++u) {
                        if ((n = t.charCodeAt(u)) > 55295 && n < 57344) {
                            if (!i) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (u + 1 === r) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                                continue
                            }
                            n = 65536 + (i - 55296 << 10 | n - 56320)
                        } else i && (e -= 3) > -1 && o.push(239, 191, 189); if (i = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            o.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }

                function V(t) {
                    for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                    return e
                }

                function J(t, e) {
                    for (var n, r, i, o = [], u = 0; u < t.length && !((e -= 2) < 0); ++u) n = t.charCodeAt(u), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                    return o
                }

                function G(t) {
                    return H.toByteArray(Y(t))
                }

                function z(t, e, n, r) {
                    for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                    return i
                }

                function q(t) {
                    return t !== t
                }
                /*!
                 * The buffer module from node.js, for the browser.
                 *
                 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
                 * @license  MIT
                 */
                var H = n(22),
                    X = n(27),
                    Z = n(28);
                e.Buffer = o, e.SlowBuffer = v, e.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }(), e.kMaxLength = r(), o.poolSize = 8192, o._augment = function(t) {
                    return t.__proto__ = o.prototype, t
                }, o.from = function(t, e, n) {
                    return u(null, t, e, n)
                }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
                    value: null,
                    configurable: !0
                })), o.alloc = function(t, e, n) {
                    return a(null, t, e, n)
                }, o.allocUnsafe = function(t) {
                    return f(null, t)
                }, o.allocUnsafeSlow = function(t) {
                    return f(null, t)
                }, o.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer)
                }, o.compare = function(t, e) {
                    if (!o.isBuffer(t) || !o.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var n = t.length, r = e.length, i = 0, u = Math.min(n, r); i < u; ++i)
                        if (t[i] !== e[i]) {
                            n = t[i], r = e[i];
                            break
                        }
                    return n < r ? -1 : r < n ? 1 : 0
                }, o.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, o.concat = function(t, e) {
                    if (!Z(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return o.alloc(0);
                    var n;
                    if (void 0 === e)
                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var r = o.allocUnsafe(e),
                        i = 0;
                    for (n = 0; n < t.length; ++n) {
                        var u = t[n];
                        if (!o.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
                        u.copy(r, i), i += u.length
                    }
                    return r
                }, o.byteLength = y, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) _(this, e, e + 1);
                    return this
                }, o.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) _(this, e, e + 3), _(this, e + 1, e + 2);
                    return this
                }, o.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) _(this, e, e + 7), _(this, e + 1, e + 6), _(this, e + 2, e + 5), _(this, e + 3, e + 4);
                    return this
                }, o.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? B(this, 0, t) : g.apply(this, arguments)
                }, o.prototype.equals = function(t) {
                    if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === o.compare(this, t)
                }, o.prototype.inspect = function() {
                    var t = "",
                        n = e.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
                }, o.prototype.compare = function(t, e, n, r, i) {
                    if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                    if (r >= i && e >= n) return 0;
                    if (r >= i) return -1;
                    if (e >= n) return 1;
                    if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
                    for (var u = i - r, s = n - e, a = Math.min(u, s), f = this.slice(r, i), c = t.slice(e, n), h = 0; h < a; ++h)
                        if (f[h] !== c[h]) {
                            u = f[h], s = c[h];
                            break
                        }
                    return u < s ? -1 : s < u ? 1 : 0
                }, o.prototype.includes = function(t, e, n) {
                    return -1 !== this.indexOf(t, e, n)
                }, o.prototype.indexOf = function(t, e, n) {
                    return b(this, t, e, n, !0)
                }, o.prototype.lastIndexOf = function(t, e, n) {
                    return b(this, t, e, n, !1)
                }, o.prototype.write = function(t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    var i = this.length - e;
                    if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var o = !1;;) switch (r) {
                        case "hex":
                            return m(this, t, e, n);
                        case "utf8":
                        case "utf-8":
                            return S(this, t, e, n);
                        case "ascii":
                            return E(this, t, e, n);
                        case "latin1":
                        case "binary":
                            return O(this, t, e, n);
                        case "base64":
                            return A(this, t, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return N(this, t, e, n);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }, o.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var Q = 4096;
                o.prototype.slice = function(t, e) {
                    var n = this.length;
                    t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                    var r;
                    if (o.TYPED_ARRAY_SUPPORT) r = this.subarray(t, e), r.__proto__ = o.prototype;
                    else {
                        var i = e - t;
                        r = new o(i, void 0);
                        for (var u = 0; u < i; ++u) r[u] = this[u + t]
                    }
                    return r
                }, o.prototype.readUIntLE = function(t, e, n) {
                    t |= 0, e |= 0, n || M(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return r
                }, o.prototype.readUIntBE = function(t, e, n) {
                    t |= 0, e |= 0, n || M(t, e, this.length);
                    for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
                    return r
                }, o.prototype.readUInt8 = function(t, e) {
                    return e || M(t, 1, this.length), this[t]
                }, o.prototype.readUInt16LE = function(t, e) {
                    return e || M(t, 2, this.length), this[t] | this[t + 1] << 8
                }, o.prototype.readUInt16BE = function(t, e) {
                    return e || M(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, o.prototype.readUInt32LE = function(t, e) {
                    return e || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, o.prototype.readUInt32BE = function(t, e) {
                    return e || M(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, o.prototype.readIntLE = function(t, e, n) {
                    t |= 0, e |= 0, n || M(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
                }, o.prototype.readIntBE = function(t, e, n) {
                    t |= 0, e |= 0, n || M(t, e, this.length);
                    for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
                    return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
                }, o.prototype.readInt8 = function(t, e) {
                    return e || M(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, o.prototype.readInt16LE = function(t, e) {
                    e || M(t, 2, this.length);
                    var n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, o.prototype.readInt16BE = function(t, e) {
                    e || M(t, 2, this.length);
                    var n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, o.prototype.readInt32LE = function(t, e) {
                    return e || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, o.prototype.readInt32BE = function(t, e) {
                    return e || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, o.prototype.readFloatLE = function(t, e) {
                    return e || M(t, 4, this.length), X.read(this, t, !0, 23, 4)
                }, o.prototype.readFloatBE = function(t, e) {
                    return e || M(t, 4, this.length), X.read(this, t, !1, 23, 4)
                }, o.prototype.readDoubleLE = function(t, e) {
                    return e || M(t, 8, this.length), X.read(this, t, !0, 52, 8)
                }, o.prototype.readDoubleBE = function(t, e) {
                    return e || M(t, 8, this.length), X.read(this, t, !1, 52, 8)
                }, o.prototype.writeUIntLE = function(t, e, n, r) {
                    if (t = +t, e |= 0, n |= 0, !r) {
                        k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
                    }
                    var i = 1,
                        o = 0;
                    for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
                    return e + n
                }, o.prototype.writeUIntBE = function(t, e, n, r) {
                    if (t = +t, e |= 0, n |= 0, !r) {
                        k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
                    }
                    var i = n - 1,
                        o = 1;
                    for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
                    return e + n
                }, o.prototype.writeUInt8 = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, o.prototype.writeUInt16LE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
                }, o.prototype.writeUInt16BE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
                }, o.prototype.writeUInt32LE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : j(this, t, e, !0), e + 4
                }, o.prototype.writeUInt32BE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4
                }, o.prototype.writeIntLE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        k(this, t, e, n, i - 1, -i)
                    }
                    var o = 0,
                        u = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++o < n && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), this[e + o] = (t / u >> 0) - s & 255;
                    return e + n
                }, o.prototype.writeIntBE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        k(this, t, e, n, i - 1, -i)
                    }
                    var o = n - 1,
                        u = 1,
                        s = 0;
                    for (this[e + o] = 255 & t; --o >= 0 && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), this[e + o] = (t / u >> 0) - s & 255;
                    return e + n
                }, o.prototype.writeInt8 = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, o.prototype.writeInt16LE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
                }, o.prototype.writeInt16BE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
                }, o.prototype.writeInt32LE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : j(this, t, e, !0), e + 4
                }, o.prototype.writeInt32BE = function(t, e, n) {
                    return t = +t, e |= 0, n || k(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4
                }, o.prototype.writeFloatLE = function(t, e, n) {
                    return C(this, t, e, !0, n)
                }, o.prototype.writeFloatBE = function(t, e, n) {
                    return C(this, t, e, !1, n)
                }, o.prototype.writeDoubleLE = function(t, e, n) {
                    return F(this, t, e, !0, n)
                }, o.prototype.writeDoubleBE = function(t, e, n) {
                    return F(this, t, e, !1, n)
                }, o.prototype.copy = function(t, e, n, r) {
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    var i, u = r - n;
                    if (this === t && n < e && e < r)
                        for (i = u - 1; i >= 0; --i) t[i + e] = this[i + n];
                    else if (u < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                        for (i = 0; i < u; ++i) t[i + e] = this[i + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, n + u), e);
                    return u
                }, o.prototype.fill = function(t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                            var i = t.charCodeAt(0);
                            i < 256 && (t = i)
                        }
                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                    } else "number" == typeof t && (t &= 255); if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0);
                    var u;
                    if ("number" == typeof t)
                        for (u = e; u < n; ++u) this[u] = t;
                    else {
                        var s = o.isBuffer(t) ? t : $(new o(t, r).toString()),
                            a = s.length;
                        for (u = 0; u < n - e; ++u) this[u + e] = s[u % a]
                    }
                    return this
                };
                var tt = /[^+\/0-9A-Za-z-_]/g
            }).call(e, n(35))
        },
        function(t, e, n) {
            var r, i = n(25);
            "undefined" != typeof navigator && navigator && (r = navigator.userAgent), t.exports = i(r)
        },
        function(t, e, n) {
            var r = n(26);
            t.exports = function(t) {
                return t ? [
                    ["edge", /Edge\/([0-9\._]+)/],
                    ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
                    ["vivaldi", /Vivaldi\/([0-9\.]+)/],
                    ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
                    ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
                    ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
                    ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
                    ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
                    ["fxios", /FxiOS\/([0-9\.]+)/],
                    ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
                    ["opera", /OPR\/([0-9\.]+)(:?\s|$)$/],
                    ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
                    ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
                    ["ie", /MSIE\s(7\.0)/],
                    ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
                    ["android", /Android\s([0-9\.]+)/],
                    ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
                    ["safari", /Version\/([0-9\._]+).*Safari/]
                ].map(function(e) {
                    if (e[1].test(t)) {
                        var n = e[1].exec(t),
                            i = n && n[1].split(/[._]/).slice(0, 3);
                        return i && i.length < 3 && Array.prototype.push.apply(i, 1 == i.length ? [0, 0] : [0]), {
                            name: e[0],
                            version: i.join("."),
                            os: r(t)
                        }
                    }
                }).filter(Boolean).shift() : null
            }
        },
        function(t, e) {
            t.exports = function(t) {
                var e = [{
                    name: "iOS",
                    rule: /iP(hone|od|ad)/
                }, {
                    name: "Android OS",
                    rule: /Android/
                }, {
                    name: "BlackBerry OS",
                    rule: /BlackBerry|BB10/
                }, {
                    name: "Windows Mobile",
                    rule: /IEMobile/
                }, {
                    name: "Amazon OS",
                    rule: /Kindle/
                }, {
                    name: "Windows 3.11",
                    rule: /Win16/
                }, {
                    name: "Windows 95",
                    rule: /(Windows 95)|(Win95)|(Windows_95)/
                }, {
                    name: "Windows 98",
                    rule: /(Windows 98)|(Win98)/
                }, {
                    name: "Windows 2000",
                    rule: /(Windows NT 5.0)|(Windows 2000)/
                }, {
                    name: "Windows XP",
                    rule: /(Windows NT 5.1)|(Windows XP)/
                }, {
                    name: "Windows Server 2003",
                    rule: /(Windows NT 5.2)/
                }, {
                    name: "Windows Vista",
                    rule: /(Windows NT 6.0)/
                }, {
                    name: "Windows 7",
                    rule: /(Windows NT 6.1)/
                }, {
                    name: "Windows 8",
                    rule: /(Windows NT 6.2)/
                }, {
                    name: "Windows 8.1",
                    rule: /(Windows NT 6.3)/
                }, {
                    name: "Windows 10",
                    rule: /(Windows NT 10.0)/
                }, {
                    name: "Windows ME",
                    rule: /Windows ME/
                }, {
                    name: "Open BSD",
                    rule: /OpenBSD/
                }, {
                    name: "Sun OS",
                    rule: /SunOS/
                }, {
                    name: "Linux",
                    rule: /(Linux)|(X11)/
                }, {
                    name: "Mac OS",
                    rule: /(Mac_PowerPC)|(Macintosh)/
                }, {
                    name: "QNX",
                    rule: /QNX/
                }, {
                    name: "BeOS",
                    rule: /BeOS/
                }, {
                    name: "OS/2",
                    rule: /OS\/2/
                }, {
                    name: "Search Bot",
                    rule: /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/
                }],
                    n = e.filter(function(e) {
                        if (t.match(e.rule)) return !0
                    });
                return n && n[0] ? n[0].name : null
            }
        },
        function(t, e) {
            e.read = function(t, e, n, r, i) {
                var o, u, s = 8 * i - r - 1,
                    a = (1 << s) - 1,
                    f = a >> 1,
                    c = -7,
                    h = n ? i - 1 : 0,
                    l = n ? -1 : 1,
                    p = t[e + h];
                for (h += l, o = p & (1 << -c) - 1, p >>= -c, c += s; c > 0; o = 256 * o + t[e + h], h += l, c -= 8);
                for (u = o & (1 << -c) - 1, o >>= -c, c += r; c > 0; u = 256 * u + t[e + h], h += l, c -= 8);
                if (0 === o) o = 1 - f;
                else {
                    if (o === a) return u ? NaN : 1 / 0 * (p ? -1 : 1);
                    u += Math.pow(2, r), o -= f
                }
                return (p ? -1 : 1) * u * Math.pow(2, o - r)
            }, e.write = function(t, e, n, r, i, o) {
                var u, s, a, f = 8 * o - i - 1,
                    c = (1 << f) - 1,
                    h = c >> 1,
                    l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    p = r ? 0 : o - 1,
                    d = r ? 1 : -1,
                    v = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, u = c) : (u = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -u)) < 1 && (u--, a *= 2), e += u + h >= 1 ? l / a : l * Math.pow(2, 1 - h), e * a >= 2 && (u++, a /= 2), u + h >= c ? (s = 0, u = c) : u + h >= 1 ? (s = (e * a - 1) * Math.pow(2, i), u += h) : (s = e * Math.pow(2, h - 1) * Math.pow(2, i), u = 0)); i >= 8; t[n + p] = 255 & s, p += d, s /= 256, i -= 8);
                for (u = u << i | s, f += i; f > 0; t[n + p] = 255 & u, p += d, u /= 256, f -= 8);
                t[n + p - d] |= 128 * v
            }
        },
        function(t, e) {
            var n = {}.toString;
            t.exports = Array.isArray || function(t) {
                return "[object Array]" == n.call(t)
            }
        },
        function(t, e) {
            function n(t) {
                this.message = t
            }

            function r(t) {
                var e = String(t).replace(/=+$/, "");
                if (e.length % 4 == 1) throw new n("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var r, o, u = 0, s = 0, a = ""; o = e.charAt(s++);~ o && (r = u % 4 ? 64 * r + o : o, u++ % 4) ? a += String.fromCharCode(255 & r >> (-2 * u & 6)) : 0) o = i.indexOf(o);
                return a
            }
            var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            n.prototype = new Error, n.prototype.name = "InvalidCharacterError", t.exports = "undefined" != typeof window && window.atob && window.atob.bind(window) || r
        },
        function(t, e, n) {
            function r(t) {
                return decodeURIComponent(i(t).replace(/(.)/g, function(t, e) {
                    var n = e.charCodeAt(0).toString(16).toUpperCase();
                    return n.length < 2 && (n = "0" + n), "%" + n
                }))
            }
            var i = n(29);
            t.exports = function(t) {
                var e = t.replace(/-/g, "+").replace(/_/g, "/");
                switch (e.length % 4) {
                    case 0:
                        break;
                    case 2:
                        e += "==";
                        break;
                    case 3:
                        e += "=";
                        break;
                    default:
                        throw "Illegal base64url string!"
                }
                try {
                    return r(e)
                } catch (t) {
                    return i(e)
                }
            }
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                this.message = t
            }
            var i = n(30);
            r.prototype = new Error, r.prototype.name = "InvalidTokenError", t.exports = function(t, e) {
                if ("string" != typeof t) throw new r("Invalid token specified");
                e = e || {};
                var n = !0 === e.header ? 0 : 1;
                try {
                    return JSON.parse(i(t.split(".")[n]))
                } catch (t) {
                    throw new r("Invalid token specified: " + t.message)
                }
            }, t.exports.InvalidTokenError = r
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }
            /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
            var i = Object.getOwnPropertySymbols,
                o = Object.prototype.hasOwnProperty,
                u = Object.prototype.propertyIsEnumerable;
            t.exports = function() {
                try {
                    if (!Object.assign) return !1;
                    var t = new String("abc");
                    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                    for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                        return e[t]
                    }).join("")) return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                        r[t] = t
                    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (t) {
                    return !1
                }
            }() ? Object.assign : function(t, e) {
                for (var n, s, a = r(t), f = 1; f < arguments.length; f++) {
                    n = Object(arguments[f]);
                    for (var c in n) o.call(n, c) && (a[c] = n[c]);
                    if (i) {
                        s = i(n);
                        for (var h = 0; h < s.length; h++) u.call(n, s[h]) && (a[s[h]] = n[s[h]])
                    }
                }
                return a
            }
        },
        function(t, e, n) {
            "use strict";

            function r(t) {
                switch (t.arrayFormat) {
                    case "index":
                        return function(e, n, r) {
                            return null === n ? [o(e, t), "[", r, "]"].join("") : [o(e, t), "[", o(r, t), "]=", o(n, t)].join("")
                        };
                    case "bracket":
                        return function(e, n) {
                            return null === n ? o(e, t) : [o(e, t), "[]=", o(n, t)].join("")
                        };
                    default:
                        return function(e, n) {
                            return null === n ? o(e, t) : [o(e, t), "=", o(n, t)].join("")
                        }
                }
            }

            function i(t) {
                var e;
                switch (t.arrayFormat) {
                    case "index":
                        return function(t, n, r) {
                            if (e = /\[(\d*)\]$/.exec(t), t = t.replace(/\[\d*\]$/, ""), !e) return void(r[t] = n);
                            void 0 === r[t] && (r[t] = {}), r[t][e[1]] = n
                        };
                    case "bracket":
                        return function(t, n, r) {
                            return e = /(\[\])$/.exec(t), t = t.replace(/\[\]$/, ""), e ? void 0 === r[t] ? void(r[t] = [n]) : void(r[t] = [].concat(r[t], n)) : void(r[t] = n)
                        };
                    default:
                        return function(t, e, n) {
                            if (void 0 === n[t]) return void(n[t] = e);
                            n[t] = [].concat(n[t], e)
                        }
                }
            }

            function o(t, e) {
                return e.encode ? e.strict ? s(t) : encodeURIComponent(t) : t
            }

            function u(t) {
                return Array.isArray(t) ? t.sort() : "object" == typeof t ? u(Object.keys(t)).sort(function(t, e) {
                    return Number(t) - Number(e)
                }).map(function(e) {
                    return t[e]
                }) : t
            }
            var s = n(34),
                a = n(32);
            e.extract = function(t) {
                return t.split("?")[1] || ""
            }, e.parse = function(t, e) {
                e = a({
                    arrayFormat: "none"
                }, e);
                var n = i(e),
                    r = Object.create(null);
                return "string" != typeof t ? r : (t = t.trim().replace(/^(\?|#|&)/, "")) ? (t.split("&").forEach(function(t) {
                    var e = t.replace(/\+/g, " ").split("="),
                        i = e.shift(),
                        o = e.length > 0 ? e.join("=") : void 0;
                    o = void 0 === o ? null : decodeURIComponent(o), n(decodeURIComponent(i), o, r)
                }), Object.keys(r).sort().reduce(function(t, e) {
                    var n = r[e];
                    return Boolean(n) && "object" == typeof n && !Array.isArray(n) ? t[e] = u(n) : t[e] = n, t
                }, Object.create(null))) : r
            }, e.stringify = function(t, e) {
                e = a({
                    encode: !0,
                    strict: !0,
                    arrayFormat: "none"
                }, e);
                var n = r(e);
                return t ? Object.keys(t).sort().map(function(r) {
                    var i = t[r];
                    if (void 0 === i) return "";
                    if (null === i) return o(r, e);
                    if (Array.isArray(i)) {
                        var u = [];
                        return i.slice().forEach(function(t) {
                            void 0 !== t && u.push(n(r, t, u.length))
                        }), u.join("&")
                    }
                    return o(r, e) + "=" + o(i, e)
                }).filter(function(t) {
                    return t.length > 0
                }).join("&") : ""
            }
        },
        function(t, e, n) {
            "use strict";
            t.exports = function(t) {
                return encodeURIComponent(t).replace(/[!'()*]/g, function(t) {
                    return "%" + t.charCodeAt(0).toString(16).toUpperCase()
                })
            }
        },
        function(t, e) {
            var n;
            n = function() {
                return this
            }();
            try {
                n = n || Function("return this")() || (0, eval)("this")
            } catch (t) {
                "object" == typeof window && (n = window)
            }
            t.exports = n
        },
        function(t, e) {
            t.exports = function(t) {
                return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                    enumerable: !0,
                    get: function() {
                        return t.l
                    }
                }), Object.defineProperty(t, "id", {
                    enumerable: !0,
                    get: function() {
                        return t.i
                    }
                }), t.webpackPolyfill = 1), t
            }
        },
        function(t, e) {
            ! function(t) {
                "use strict";

                function e(t) {
                    if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
                    return t.toLowerCase()
                }

                function n(t) {
                    return "string" != typeof t && (t = String(t)), t
                }

                function r(t) {
                    var e = {
                        next: function() {
                            var e = t.shift();
                            return {
                                done: void 0 === e,
                                value: e
                            }
                        }
                    };
                    return g.iterable && (e[Symbol.iterator] = function() {
                        return e
                    }), e
                }

                function i(t) {
                    this.map = {}, t instanceof i ? t.forEach(function(t, e) {
                        this.append(e, t)
                    }, this) : Array.isArray(t) ? t.forEach(function(t) {
                        this.append(t[0], t[1])
                    }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                        this.append(e, t[e])
                    }, this)
                }

                function o(t) {
                    if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
                    t.bodyUsed = !0
                }

                function u(t) {
                    return new Promise(function(e, n) {
                        t.onload = function() {
                            e(t.result)
                        }, t.onerror = function() {
                            n(t.error)
                        }
                    })
                }

                function s(t) {
                    var e = new FileReader,
                        n = u(e);
                    return e.readAsArrayBuffer(t), n
                }

                function a(t) {
                    var e = new FileReader,
                        n = u(e);
                    return e.readAsText(t), n
                }

                function f(t) {
                    for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++) n[r] = String.fromCharCode(e[r]);
                    return n.join("")
                }

                function c(t) {
                    if (t.slice) return t.slice(0);
                    var e = new Uint8Array(t.byteLength);
                    return e.set(new Uint8Array(t)), e.buffer
                }

                function h() {
                    return this.bodyUsed = !1, this._initBody = function(t) {
                        if (this._bodyInit = t, t)
                            if ("string" == typeof t) this._bodyText = t;
                            else if (g.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                        else if (g.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                        else if (g.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                        else if (g.arrayBuffer && g.blob && b(t)) this._bodyArrayBuffer = c(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                        else {
                            if (!g.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !w(t)) throw new Error("unsupported BodyInit type");
                            this._bodyArrayBuffer = c(t)
                        } else this._bodyText = "";
                        this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : g.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                    }, g.blob && (this.blob = function() {
                        var t = o(this);
                        if (t) return t;
                        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                        if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                        return Promise.resolve(new Blob([this._bodyText]))
                    }, this.arrayBuffer = function() {
                        return this._bodyArrayBuffer ? o(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
                    }), this.text = function() {
                        var t = o(this);
                        if (t) return t;
                        if (this._bodyBlob) return a(this._bodyBlob);
                        if (this._bodyArrayBuffer) return Promise.resolve(f(this._bodyArrayBuffer));
                        if (this._bodyFormData) throw new Error("could not read FormData body as text");
                        return Promise.resolve(this._bodyText)
                    }, g.formData && (this.formData = function() {
                        return this.text().then(d)
                    }), this.json = function() {
                        return this.text().then(JSON.parse)
                    }, this
                }

                function l(t) {
                    var e = t.toUpperCase();
                    return m.indexOf(e) > -1 ? e : t
                }

                function p(t, e) {
                    e = e || {};
                    var n = e.body;
                    if (t instanceof p) {
                        if (t.bodyUsed) throw new TypeError("Already read");
                        this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new i(t.headers)), this.method = t.method, this.mode = t.mode, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0)
                    } else this.url = String(t); if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new i(e.headers)), this.method = l(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
                    this._initBody(n)
                }

                function d(t) {
                    var e = new FormData;
                    return t.trim().split("&").forEach(function(t) {
                        if (t) {
                            var n = t.split("="),
                                r = n.shift().replace(/\+/g, " "),
                                i = n.join("=").replace(/\+/g, " ");
                            e.append(decodeURIComponent(r), decodeURIComponent(i))
                        }
                    }), e
                }

                function v(t) {
                    var e = new i;
                    return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                        var n = t.split(":"),
                            r = n.shift().trim();
                        if (r) {
                            var i = n.join(":").trim();
                            e.append(r, i)
                        }
                    }), e
                }

                function y(t, e) {
                    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new i(e.headers), this.url = e.url || "", this._initBody(t)
                }
                if (!t.fetch) {
                    var g = {
                        searchParams: "URLSearchParams" in t,
                        iterable: "Symbol" in t && "iterator" in Symbol,
                        blob: "FileReader" in t && "Blob" in t && function() {
                            try {
                                return new Blob, !0
                            } catch (t) {
                                return !1
                            }
                        }(),
                        formData: "FormData" in t,
                        arrayBuffer: "ArrayBuffer" in t
                    };
                    if (g.arrayBuffer) var _ = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                    b = function(t) {
                        return t && DataView.prototype.isPrototypeOf(t)
                    }, w = ArrayBuffer.isView || function(t) {
                        return t && _.indexOf(Object.prototype.toString.call(t)) > -1
                    };
                    i.prototype.append = function(t, r) {
                        t = e(t), r = n(r);
                        var i = this.map[t];
                        this.map[t] = i ? i + "," + r : r
                    }, i.prototype.delete = function(t) {
                        delete this.map[e(t)]
                    }, i.prototype.get = function(t) {
                        return t = e(t), this.has(t) ? this.map[t] : null
                    }, i.prototype.has = function(t) {
                        return this.map.hasOwnProperty(e(t))
                    }, i.prototype.set = function(t, r) {
                        this.map[e(t)] = n(r)
                    }, i.prototype.forEach = function(t, e) {
                        for (var n in this.map) this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
                    }, i.prototype.keys = function() {
                        var t = [];
                        return this.forEach(function(e, n) {
                            t.push(n)
                        }), r(t)
                    }, i.prototype.values = function() {
                        var t = [];
                        return this.forEach(function(e) {
                            t.push(e)
                        }), r(t)
                    }, i.prototype.entries = function() {
                        var t = [];
                        return this.forEach(function(e, n) {
                            t.push([n, e])
                        }), r(t)
                    }, g.iterable && (i.prototype[Symbol.iterator] = i.prototype.entries);
                    var m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                    p.prototype.clone = function() {
                        return new p(this, {
                            body: this._bodyInit
                        })
                    }, h.call(p.prototype), h.call(y.prototype), y.prototype.clone = function() {
                        return new y(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new i(this.headers),
                            url: this.url
                        })
                    }, y.error = function() {
                        var t = new y(null, {
                            status: 0,
                            statusText: ""
                        });
                        return t.type = "error", t
                    };
                    var S = [301, 302, 303, 307, 308];
                    y.redirect = function(t, e) {
                        if (-1 === S.indexOf(e)) throw new RangeError("Invalid status code");
                        return new y(null, {
                            status: e,
                            headers: {
                                location: t
                            }
                        })
                    }, t.Headers = i, t.Request = p, t.Response = y, t.fetch = function(t, e) {
                        return new Promise(function(n, r) {
                            var i = new p(t, e),
                                o = new XMLHttpRequest;
                            o.onload = function() {
                                var t = {
                                    status: o.status,
                                    statusText: o.statusText,
                                    headers: v(o.getAllResponseHeaders() || "")
                                };
                                t.url = "responseURL" in o ? o.responseURL : t.headers.get("X-Request-URL");
                                var e = "response" in o ? o.response : o.responseText;
                                n(new y(e, t))
                            }, o.onerror = function() {
                                r(new TypeError("Network request failed"))
                            }, o.ontimeout = function() {
                                r(new TypeError("Network request failed"))
                            }, o.open(i.method, i.url, !0), "include" === i.credentials ? o.withCredentials = !0 : "omit" === i.credentials && (o.withCredentials = !1), "responseType" in o && g.blob && (o.responseType = "blob"), i.headers.forEach(function(t, e) {
                                o.setRequestHeader(e, t)
                            }), o.send(void 0 === i._bodyInit ? null : i._bodyInit)
                        })
                    }, t.fetch.polyfill = !0
                }
            }("undefined" != typeof self ? self : this)
        }
    ])
});
//# sourceMappingURL=stitch.min.js.map