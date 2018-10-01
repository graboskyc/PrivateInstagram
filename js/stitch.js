! function(exports) {
    "use strict";
    var AuthInfo = function() {
        function t(e, t, r, n, i, o, s) {
            this.userId = e, this.deviceId = t, this.accessToken = r, this.refreshToken = n, this.loggedInProviderType = i, this.loggedInProviderName = o, this.userProfile = s
        }
        return t.empty = function() {
            return new t(void 0, void 0, void 0, void 0, void 0, void 0, void 0)
        }, t.prototype.loggedOut = function() {
            return new t(void 0, this.deviceId, void 0, void 0, void 0, void 0, void 0)
        }, t.prototype.merge = function(e) {
            return new t(void 0 === e.userId ? this.userId : e.userId, void 0 === e.deviceId ? this.deviceId : e.deviceId, void 0 === e.accessToken ? this.accessToken : e.accessToken, void 0 === e.refreshToken ? this.refreshToken : e.refreshToken, void 0 === e.loggedInProviderType ? this.loggedInProviderType : e.loggedInProviderType, void 0 === e.loggedInProviderName ? this.loggedInProviderName : e.loggedInProviderName, void 0 === e.userProfile ? this.userProfile : e.userProfile)
        }, t
    }(),
        commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function createCommonjsModule(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    for (var byteLength_1 = byteLength, toByteArray_1 = toByteArray, fromByteArray_1 = fromByteArray, lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;

    function getLens(e) {
        var t = e.length;
        if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function byteLength(e) {
        var t = getLens(e),
            r = t[0],
            n = t[1];
        return 3 * (r + n) / 4 - n
    }

    function _byteLength(e, t, r) {
        return 3 * (t + r) / 4 - r
    }

    function toByteArray(e) {
        for (var t, r = getLens(e), n = r[0], i = r[1], o = new Arr(_byteLength(e, n, i)), s = 0, u = 0 < i ? n - 4 : n, a = 0; a < u; a += 4) t = revLookup[e.charCodeAt(a)] << 18 | revLookup[e.charCodeAt(a + 1)] << 12 | revLookup[e.charCodeAt(a + 2)] << 6 | revLookup[e.charCodeAt(a + 3)], o[s++] = t >> 16 & 255, o[s++] = t >> 8 & 255, o[s++] = 255 & t;
        return 2 === i && (t = revLookup[e.charCodeAt(a)] << 2 | revLookup[e.charCodeAt(a + 1)] >> 4, o[s++] = 255 & t), 1 === i && (t = revLookup[e.charCodeAt(a)] << 10 | revLookup[e.charCodeAt(a + 1)] << 4 | revLookup[e.charCodeAt(a + 2)] >> 2, o[s++] = t >> 8 & 255, o[s++] = 255 & t), o
    }

    function tripletToBase64(e) {
        return lookup[e >> 18 & 63] + lookup[e >> 12 & 63] + lookup[e >> 6 & 63] + lookup[63 & e]
    }

    function encodeChunk(e, t, r) {
        for (var n, i = [], o = t; o < r; o += 3) n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), i.push(tripletToBase64(n));
        return i.join("")
    }

    function fromByteArray(e) {
        for (var t, r = e.length, n = r % 3, i = [], o = 16383, s = 0, u = r - n; s < u; s += o) i.push(encodeChunk(e, s, u < s + o ? u : s + o));
        return 1 === n ? (t = e[r - 1], i.push(lookup[t >> 2] + lookup[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], i.push(lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "=")), i.join("")
    }
    revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
    var base64Js = {
        byteLength: byteLength_1,
        toByteArray: toByteArray_1,
        fromByteArray: fromByteArray_1
    }, read = function(e, t, r, n, i) {
            var o, s, u = 8 * i - n - 1,
                a = (1 << u) - 1,
                f = a >> 1,
                c = -7,
                l = r ? i - 1 : 0,
                h = r ? -1 : 1,
                p = e[t + l];
            for (l += h, o = p & (1 << -c) - 1, p >>= -c, c += u; 0 < c; o = 256 * o + e[t + l], l += h, c -= 8);
            for (s = o & (1 << -c) - 1, o >>= -c, c += n; 0 < c; s = 256 * s + e[t + l], l += h, c -= 8);
            if (0 === o) o = 1 - f;
            else {
                if (o === a) return s ? NaN : 1 / 0 * (p ? -1 : 1);
                s += Math.pow(2, n), o -= f
            }
            return (p ? -1 : 1) * s * Math.pow(2, o - n)
        }, write = function(e, t, r, n, i, o) {
            var s, u, a, f = 8 * o - i - 1,
                c = (1 << f) - 1,
                l = c >> 1,
                h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = n ? 0 : o - 1,
                d = n ? 1 : -1,
                y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + l ? h / a : h * Math.pow(2, 1 - l)) * a && (s++, a /= 2), c <= s + l ? (u = 0, s = c) : 1 <= s + l ? (u = (t * a - 1) * Math.pow(2, i), s += l) : (u = t * Math.pow(2, l - 1) * Math.pow(2, i), s = 0)); 8 <= i; e[r + p] = 255 & u, p += d, u /= 256, i -= 8);
            for (s = s << i | u, f += i; 0 < f; e[r + p] = 255 & s, p += d, s /= 256, f -= 8);
            e[r + p - d] |= 128 * y
        }, ieee754 = {
            read: read,
            write: write
        }, buffer = createCommonjsModule(function(e, r) {
            r.Buffer = l, r.SlowBuffer = function(e) {
                +e != e && (e = 0);
                return l.alloc(+e)
            }, r.INSPECT_MAX_BYTES = 50;
            var n = 2147483647;

            function s(e) {
                if (n < e) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                var t = new Uint8Array(e);
                return t.__proto__ = l.prototype, t
            }

            function l(e, t, r) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return o(e)
                }
                return i(e, t, r)
            }

            function i(e, t, r) {
                if ("string" == typeof e) return function(e, t) {
                    "string" == typeof t && "" !== t || (t = "utf8");
                    if (!l.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                    var r = 0 | c(e, t),
                        n = s(r),
                        i = n.write(e, t);
                    i !== r && (n = n.slice(0, i));
                    return n
                }(e, t);
                if (ArrayBuffer.isView(e)) return a(e);
                if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if (L(e, ArrayBuffer) || e && L(e.buffer, ArrayBuffer)) return function(e, t, r) {
                    if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    var n;
                    n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
                    return n.__proto__ = l.prototype, n
                }(e, t, r);
                if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                var n = e.valueOf && e.valueOf();
                if (null != n && n !== e) return l.from(n, t, r);
                var i = function(e) {
                    if (l.isBuffer(e)) {
                        var t = 0 | f(e.length),
                            r = s(t);
                        return 0 === r.length || e.copy(r, 0, 0, t), r
                    }
                    if (void 0 !== e.length) return "number" != typeof e.length || x(e.length) ? s(0) : a(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return a(e.data)
                }(e);
                if (i) return i;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return l.from(e[Symbol.toPrimitive]("string"), t, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
            }

            function u(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
            }

            function o(e) {
                return u(e), s(e < 0 ? 0 : 0 | f(e))
            }

            function a(e) {
                for (var t = e.length < 0 ? 0 : 0 | f(e.length), r = s(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                return r
            }

            function f(e) {
                if (n <= e) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
                return 0 | e
            }

            function c(e, t) {
                if (l.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || L(e, ArrayBuffer)) return e.byteLength;
                if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                var r = e.length,
                    n = 2 < arguments.length && !0 === arguments[2];
                if (!n && 0 === r) return 0;
                for (var i = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return T(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return R(e).length;
                    default:
                        if (i) return n ? -1 : T(e).length;
                        t = ("" + t).toLowerCase(), i = !0
                }
            }

            function h(e, t, r) {
                var n = e[t];
                e[t] = e[r], e[r] = n
            }

            function p(e, t, r, n, i) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), x(r = +r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                    if (i) return -1;
                    r = e.length - 1
                } else if (r < 0) {
                    if (!i) return -1;
                    r = 0
                }
                if ("string" == typeof t && (t = l.from(t, n)), l.isBuffer(t)) return 0 === t.length ? -1 : d(e, t, r, n, i);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : d(e, [t], r, n, i);
                throw new TypeError("val must be string, number or Buffer")
            }

            function d(e, t, r, n, i) {
                var o, s = 1,
                    u = e.length,
                    a = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    u /= s = 2, a /= 2, r /= 2
                }

                function f(e, t) {
                    return 1 === s ? e[t] : e.readUInt16BE(t * s)
                }
                if (i) {
                    var c = -1;
                    for (o = r; o < u; o++)
                        if (f(e, o) === f(t, -1 === c ? 0 : o - c)) {
                            if (-1 === c && (c = o), o - c + 1 === a) return c * s
                        } else -1 !== c && (o -= o - c), c = -1
                } else
                    for (u < r + a && (r = u - a), o = r; 0 <= o; o--) {
                        for (var l = !0, h = 0; h < a; h++)
                            if (f(e, o + h) !== f(t, h)) {
                                l = !1;
                                break
                            }
                        if (l) return o
                    }
                return -1
            }

            function y(e, t, r, n) {
                r = Number(r) || 0;
                var i = e.length - r;
                n ? i < (n = Number(n)) && (n = i) : n = i;
                var o = t.length;
                o / 2 < n && (n = o / 2);
                for (var s = 0; s < n; ++s) {
                    var u = parseInt(t.substr(2 * s, 2), 16);
                    if (x(u)) return s;
                    e[r + s] = u
                }
                return s
            }

            function _(e, t, r, n) {
                return D(function(e) {
                    for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                    return t
                }(t), e, r, n)
            }

            function g(e, t, r) {
                return 0 === t && r === e.length ? base64Js.fromByteArray(e) : base64Js.fromByteArray(e.slice(t, r))
            }

            function $(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], i = t; i < r;) {
                    var o, s, u, a, f = e[i],
                        c = null,
                        l = 239 < f ? 4 : 223 < f ? 3 : 191 < f ? 2 : 1;
                    if (i + l <= r) switch (l) {
                        case 1:
                            f < 128 && (c = f);
                            break;
                        case 2:
                            128 == (192 & (o = e[i + 1])) && 127 < (a = (31 & f) << 6 | 63 & o) && (c = a);
                            break;
                        case 3:
                            o = e[i + 1], s = e[i + 2], 128 == (192 & o) && 128 == (192 & s) && 2047 < (a = (15 & f) << 12 | (63 & o) << 6 | 63 & s) && (a < 55296 || 57343 < a) && (c = a);
                            break;
                        case 4:
                            o = e[i + 1], s = e[i + 2], u = e[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & u) && 65535 < (a = (15 & f) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & u) && a < 1114112 && (c = a)
                    }
                    null === c ? (c = 65533, l = 1) : 65535 < c && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), i += l
                }
                return function(e) {
                    var t = e.length;
                    if (t <= b) return String.fromCharCode.apply(String, e);
                    var r = "",
                        n = 0;
                    for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += b));
                    return r
                }(n)
            }
            r.kMaxLength = n, (l.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo()
                } catch (e) {
                    return !1
                }
            }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(l.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (l.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(l.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (l.isBuffer(this)) return this.byteOffset
                }
            }), "undefined" != typeof Symbol && null != Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), l.poolSize = 8192, l.from = function(e, t, r) {
                return i(e, t, r)
            }, l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, l.alloc = function(e, t, r) {
                return i = t, o = r, u(n = e), n <= 0 ? s(n) : void 0 !== i ? "string" == typeof o ? s(n).fill(i, o) : s(n).fill(i) : s(n);
                var n, i, o
            }, l.allocUnsafe = function(e) {
                return o(e)
            }, l.allocUnsafeSlow = function(e) {
                return o(e)
            }, l.isBuffer = function(e) {
                return null != e && !0 === e._isBuffer && e !== l.prototype
            }, l.compare = function(e, t) {
                if (L(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), L(t, Uint8Array) && (t = l.from(t, t.offset, t.byteLength)), !l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (e === t) return 0;
                for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i)
                    if (e[i] !== t[i]) {
                        r = e[i], n = t[i];
                        break
                    }
                return r < n ? -1 : n < r ? 1 : 0
            }, l.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
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
            }, l.concat = function(e, t) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return l.alloc(0);
                var r;
                if (void 0 === t)
                    for (r = t = 0; r < e.length; ++r) t += e[r].length;
                var n = l.allocUnsafe(t),
                    i = 0;
                for (r = 0; r < e.length; ++r) {
                    var o = e[r];
                    if (L(o, Uint8Array) && (o = l.from(o)), !l.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                    o.copy(n, i), i += o.length
                }
                return n
            }, l.byteLength = c, l.prototype._isBuffer = !0, l.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) h(this, t, t + 1);
                return this
            }, l.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) h(this, t, t + 3), h(this, t + 1, t + 2);
                return this
            }, l.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) h(this, t, t + 7), h(this, t + 1, t + 6), h(this, t + 2, t + 5), h(this, t + 3, t + 4);
                return this
            }, l.prototype.toLocaleString = l.prototype.toString = function() {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? $(this, 0, e) : function(e, t, r) {
                    var n = !1;
                    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e || (e = "utf8");;) switch (e) {
                        case "hex":
                            return N(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return $(this, t, r);
                        case "ascii":
                            return S(this, t, r);
                        case "latin1":
                        case "binary":
                            return m(this, t, r);
                        case "base64":
                            return g(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return E(this, t, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), n = !0
                    }
                }.apply(this, arguments)
            }, l.prototype.equals = function(e) {
                if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === l.compare(this, e)
            }, l.prototype.inspect = function() {
                var e = "",
                    t = r.INSPECT_MAX_BYTES;
                return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
            }, l.prototype.compare = function(e, t, r, n, i) {
                if (L(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), !l.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                if (i <= n && r <= t) return 0;
                if (i <= n) return -1;
                if (r <= t) return 1;
                if (this === e) return 0;
                for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(o, s), a = this.slice(n, i), f = e.slice(t, r), c = 0; c < u; ++c)
                    if (a[c] !== f[c]) {
                        o = a[c], s = f[c];
                        break
                    }
                return o < s ? -1 : s < o ? 1 : 0
            }, l.prototype.includes = function(e, t, r) {
                return -1 !== this.indexOf(e, t, r)
            }, l.prototype.indexOf = function(e, t, r) {
                return p(this, e, t, r, !0)
            }, l.prototype.lastIndexOf = function(e, t, r) {
                return p(this, e, t, r, !1)
            }, l.prototype.write = function(e, t, r, n) {
                if (void 0 === t) n = "utf8", r = this.length, t = 0;
                else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                }
                var i = this.length - t;
                if ((void 0 === r || i < r) && (r = i), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var o, s, u, a, f, c, l, h, p, d = !1;;) switch (n) {
                    case "hex":
                        return y(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                        return h = t, p = r, D(T(e, (l = this).length - h), l, h, p);
                    case "ascii":
                        return _(this, e, t, r);
                    case "latin1":
                    case "binary":
                        return _(this, e, t, r);
                    case "base64":
                        return a = this, f = t, c = r, D(R(e), a, f, c);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return s = t, u = r, D(function(e, t) {
                            for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
                            return o
                        }(e, (o = this).length - s), o, s, u);
                    default:
                        if (d) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), d = !0
                }
            }, l.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var b = 4096;

            function S(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                return n
            }

            function m(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                return n
            }

            function N(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || n < r) && (r = n);
                for (var i = "", o = t; o < r; ++o) i += I(e[o]);
                return i
            }

            function E(e, t, r) {
                for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i
            }

            function B(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
            }

            function O(e, t, r, n, i, o) {
                if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (i < t || t < o) throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length) throw new RangeError("Index out of range")
            }

            function A(e, t, r, n, i, o) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function v(e, t, r, n, i) {
                return t = +t, r >>>= 0, i || A(e, 0, r, 4), ieee754.write(e, t, r, n, 23, 4), r + 4
            }

            function w(e, t, r, n, i) {
                return t = +t, r >>>= 0, i || A(e, 0, r, 8), ieee754.write(e, t, r, n, 52, 8), r + 8
            }
            l.prototype.slice = function(e, t) {
                var r = this.length;
                (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), t < e && (t = e);
                var n = this.subarray(e, t);
                return n.__proto__ = l.prototype, n
            }, l.prototype.readUIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || B(e, t, this.length);
                for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                return n
            }, l.prototype.readUIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || B(e, t, this.length);
                for (var n = this[e + --t], i = 1; 0 < t && (i *= 256);) n += this[e + --t] * i;
                return n
            }, l.prototype.readUInt8 = function(e, t) {
                return e >>>= 0, t || B(e, 1, this.length), this[e]
            }, l.prototype.readUInt16LE = function(e, t) {
                return e >>>= 0, t || B(e, 2, this.length), this[e] | this[e + 1] << 8
            }, l.prototype.readUInt16BE = function(e, t) {
                return e >>>= 0, t || B(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, l.prototype.readUInt32LE = function(e, t) {
                return e >>>= 0, t || B(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, l.prototype.readUInt32BE = function(e, t) {
                return e >>>= 0, t || B(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, l.prototype.readIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || B(e, t, this.length);
                for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                return (i *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
            }, l.prototype.readIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || B(e, t, this.length);
                for (var n = t, i = 1, o = this[e + --n]; 0 < n && (i *= 256);) o += this[e + --n] * i;
                return (i *= 128) <= o && (o -= Math.pow(2, 8 * t)), o
            }, l.prototype.readInt8 = function(e, t) {
                return e >>>= 0, t || B(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, l.prototype.readInt16LE = function(e, t) {
                e >>>= 0, t || B(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, l.prototype.readInt16BE = function(e, t) {
                e >>>= 0, t || B(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, l.prototype.readInt32LE = function(e, t) {
                return e >>>= 0, t || B(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, l.prototype.readInt32BE = function(e, t) {
                return e >>>= 0, t || B(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, l.prototype.readFloatLE = function(e, t) {
                return e >>>= 0, t || B(e, 4, this.length), ieee754.read(this, e, !0, 23, 4)
            }, l.prototype.readFloatBE = function(e, t) {
                return e >>>= 0, t || B(e, 4, this.length), ieee754.read(this, e, !1, 23, 4)
            }, l.prototype.readDoubleLE = function(e, t) {
                return e >>>= 0, t || B(e, 8, this.length), ieee754.read(this, e, !0, 52, 8)
            }, l.prototype.readDoubleBE = function(e, t) {
                return e >>>= 0, t || B(e, 8, this.length), ieee754.read(this, e, !1, 52, 8)
            }, l.prototype.writeUIntLE = function(e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || O(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = 1,
                    o = 0;
                for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                return t + r
            }, l.prototype.writeUIntBE = function(e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || O(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = r - 1,
                    o = 1;
                for (this[t + i] = 255 & e; 0 <= --i && (o *= 256);) this[t + i] = e / o & 255;
                return t + r
            }, l.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, l.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, l.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, l.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, l.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, l.prototype.writeIntLE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var i = Math.pow(2, 8 * r - 1);
                    O(this, e, t, r, i - 1, -i)
                }
                var o = 0,
                    s = 1,
                    u = 0;
                for (this[t] = 255 & e; ++o < r && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + o - 1] && (u = 1), this[t + o] = (e / s >> 0) - u & 255;
                return t + r
            }, l.prototype.writeIntBE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var i = Math.pow(2, 8 * r - 1);
                    O(this, e, t, r, i - 1, -i)
                }
                var o = r - 1,
                    s = 1,
                    u = 0;
                for (this[t + o] = 255 & e; 0 <= --o && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + o + 1] && (u = 1), this[t + o] = (e / s >> 0) - u & 255;
                return t + r
            }, l.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, l.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, l.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, l.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, l.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || O(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, l.prototype.writeFloatLE = function(e, t, r) {
                return v(this, e, t, !0, r)
            }, l.prototype.writeFloatBE = function(e, t, r) {
                return v(this, e, t, !1, r)
            }, l.prototype.writeDoubleLE = function(e, t, r) {
                return w(this, e, t, !0, r)
            }, l.prototype.writeDoubleBE = function(e, t, r) {
                return w(this, e, t, !1, r)
            }, l.prototype.copy = function(e, t, r, n) {
                if (!l.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < n && n < r && (n = r), n === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                var i = n - r;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);
                else if (this === e && r < t && t < n)
                    for (var o = i - 1; 0 <= o; --o) e[o + t] = this[o + r];
                else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                return i
            }, l.prototype.fill = function(e, t, r, n) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !l.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    if (1 === e.length) {
                        var i = e.charCodeAt(0);
                        ("utf8" === n && i < 128 || "latin1" === n) && (e = i)
                    }
                } else "number" == typeof e && (e &= 255); if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                if (r <= t) return this;
                var o;
                if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
                    for (o = t; o < r; ++o) this[o] = e;
                else {
                    var s = l.isBuffer(e) ? e : l.from(e, n),
                        u = s.length;
                    if (0 === u) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    for (o = 0; o < r - t; ++o) this[o + t] = s[o % u]
                }
                return this
            };
            var t = /[^+/0-9A-Za-z-_]/g;

            function I(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function T(e, t) {
                var r;
                t = t || 1 / 0;
                for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
                    if (55295 < (r = e.charCodeAt(s)) && r < 57344) {
                        if (!i) {
                            if (56319 < r) {
                                -1 < (t -= 3) && o.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === n) {
                                -1 < (t -= 3) && o.push(239, 191, 189);
                                continue
                            }
                            i = r;
                            continue
                        }
                        if (r < 56320) {
                            -1 < (t -= 3) && o.push(239, 191, 189), i = r;
                            continue
                        }
                        r = 65536 + (i - 55296 << 10 | r - 56320)
                    } else i && -1 < (t -= 3) && o.push(239, 191, 189); if (i = null, r < 128) {
                        if ((t -= 1) < 0) break;
                        o.push(r)
                    } else if (r < 2048) {
                        if ((t -= 2) < 0) break;
                        o.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((t -= 3) < 0) break;
                        o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return o
            }

            function R(e) {
                return base64Js.toByteArray(function(e) {
                    if ((e = (e = e.split("=")[0]).trim().replace(t, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function D(e, t, r, n) {
                for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                return i
            }

            function L(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
            }

            function x(e) {
                return e != e
            }
        }),
        buffer_1 = buffer.Buffer,
        buffer_2 = buffer.SlowBuffer,
        buffer_3 = buffer.INSPECT_MAX_BYTES,
        buffer_4 = buffer.kMaxLength,
        global$1 = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};

    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined")
    }
    var cachedSetTimeout = defaultSetTimout,
        cachedClearTimeout = defaultClearTimeout;

    function runTimeout(t) {
        if (cachedSetTimeout === setTimeout) return setTimeout(t, 0);
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(t, 0);
        try {
            return cachedSetTimeout(t, 0)
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, t, 0)
            } catch (e) {
                return cachedSetTimeout.call(this, t, 0)
            }
        }
    }

    function runClearTimeout(t) {
        if (cachedClearTimeout === clearTimeout) return clearTimeout(t);
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(t);
        try {
            return cachedClearTimeout(t)
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, t)
            } catch (e) {
                return cachedClearTimeout.call(this, t)
            }
        }
    }
    "function" == typeof global$1.setTimeout && (cachedSetTimeout = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout = clearTimeout);
    var queue = [],
        draining = !1,
        currentQueue, queueIndex = -1;

    function cleanUpNextTick() {
        draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
    }

    function drainQueue() {
        if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t;) {
                for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, t = queue.length
            }
            currentQueue = null, draining = !1, runClearTimeout(e)
        }
    }

    function nextTick(e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
    }

    function Item(e, t) {
        this.fun = e, this.array = t
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    var title = "browser",
        platform = "browser",
        browser = !0,
        env = {}, argv = [],
        version = "",
        versions = {}, release = {}, config = {};

    function noop() {}
    var on = noop,
        addListener = noop,
        once = noop,
        off = noop,
        removeListener = noop,
        removeAllListeners = noop,
        emit = noop;

    function binding(e) {
        throw new Error("process.binding is not supported")
    }

    function cwd() {
        return "/"
    }

    function chdir(e) {
        throw new Error("process.chdir is not supported")
    }

    function umask() {
        return 0
    }
    var performance = global$1.performance || {}, performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
            return (new Date).getTime()
        };

    function hrtime(e) {
        var t = .001 * performanceNow.call(performance),
            r = Math.floor(t),
            n = Math.floor(t % 1 * 1e9);
        return e && (r -= e[0], (n -= e[1]) < 0 && (r--, n += 1e9)), [r, n]
    }
    var startTime = new Date;

    function uptime() {
        return (new Date - startTime) / 1e3
    }
    var process = {
        nextTick: nextTick,
        title: title,
        browser: browser,
        env: env,
        argv: argv,
        version: version,
        versions: versions,
        on: on,
        addListener: addListener,
        once: once,
        off: off,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners,
        emit: emit,
        binding: binding,
        cwd: cwd,
        chdir: chdir,
        umask: umask,
        hrtime: hrtime,
        platform: platform,
        release: release,
        config: config,
        uptime: uptime
    }, commonjsGlobal$1 = "undefined" != typeof window ? window : void 0 !== global$1 ? global$1 : "undefined" != typeof self ? self : {};

    function createCommonjsModule$1(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var map = createCommonjsModule$1(function(e) {
        buffer.Buffer;
        if (void 0 !== commonjsGlobal$1.Map) e.exports = commonjsGlobal$1.Map, e.exports.Map = commonjsGlobal$1.Map;
        else {
            var t = function(e) {
                this._keys = [], this._values = {};
                for (var t = 0; t < e.length; t++)
                    if (null != e[t]) {
                        var r = e[t],
                            n = r[0],
                            i = r[1];
                        this._keys.push(n), this._values[n] = {
                            v: i,
                            i: this._keys.length - 1
                        }
                    }
            };
            t.prototype.clear = function() {
                this._keys = [], this._values = {}
            }, t.prototype.delete = function(e) {
                var t = this._values[e];
                return null != t && (delete this._values[e], this._keys.splice(t.i, 1), !0)
            }, t.prototype.entries = function() {
                var t = this,
                    r = 0;
                return {
                    next: function() {
                        var e = t._keys[r++];
                        return {
                            value: void 0 !== e ? [e, t._values[e].v] : void 0,
                            done: void 0 === e
                        }
                    }
                }
            }, t.prototype.forEach = function(e, t) {
                t = t || this;
                for (var r = 0; r < this._keys.length; r++) {
                    var n = this._keys[r];
                    e.call(t, this._values[n].v, n, t)
                }
            }, t.prototype.get = function(e) {
                return this._values[e] ? this._values[e].v : void 0
            }, t.prototype.has = function(e) {
                return null != this._values[e]
            }, t.prototype.keys = function() {
                var t = this,
                    r = 0;
                return {
                    next: function() {
                        var e = t._keys[r++];
                        return {
                            value: void 0 !== e ? e : void 0,
                            done: void 0 === e
                        }
                    }
                }
            }, t.prototype.set = function(e, t) {
                return this._values[e] ? this._values[e].v = t : (this._keys.push(e), this._values[e] = {
                    v: t,
                    i: this._keys.length - 1
                }), this
            }, t.prototype.values = function() {
                var t = this,
                    r = 0;
                return {
                    next: function() {
                        var e = t._keys[r++];
                        return {
                            value: void 0 !== e ? t._values[e].v : void 0,
                            done: void 0 === e
                        }
                    }
                }
            }, Object.defineProperty(t.prototype, "size", {
                enumerable: !0,
                get: function() {
                    return this._keys.length
                }
            }), e.exports = t, e.exports.Map = t
        }
    }),
        map_1 = map.Map;

    function Long(e, t) {
        if (!(this instanceof Long)) return new Long(e, t);
        this._bsontype = "Long", this.low_ = 0 | e, this.high_ = 0 | t
    }
    Long.prototype.toInt = function() {
        return this.low_
    }, Long.prototype.toNumber = function() {
        return this.high_ * Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
    }, Long.prototype.toJSON = function() {
        return this.toString()
    }, Long.prototype.toString = function(e) {
        var t = e || 10;
        if (t < 2 || 36 < t) throw Error("radix out of range: " + t);
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.equals(Long.MIN_VALUE)) {
                var r = Long.fromNumber(t),
                    n = this.div(r),
                    i = n.multiply(r).subtract(this);
                return n.toString(t) + i.toInt().toString(t)
            }
            return "-" + this.negate().toString(t)
        }
        var o = Long.fromNumber(Math.pow(t, 6));
        i = this;
        for (var s = ""; !i.isZero();) {
            var u = i.div(o),
                a = i.subtract(u.multiply(o)).toInt().toString(t);
            if ((i = u).isZero()) return a + s;
            for (; a.length < 6;) a = "0" + a;
            s = "" + a + s
        }
    }, Long.prototype.getHighBits = function() {
        return this.high_
    }, Long.prototype.getLowBits = function() {
        return this.low_
    }, Long.prototype.getLowBitsUnsigned = function() {
        return 0 <= this.low_ ? this.low_ : Long.TWO_PWR_32_DBL_ + this.low_
    }, Long.prototype.getNumBitsAbs = function() {
        if (this.isNegative()) return this.equals(Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
        for (var e = 0 !== this.high_ ? this.high_ : this.low_, t = 31; 0 < t && 0 == (e & 1 << t); t--);
        return 0 !== this.high_ ? t + 33 : t + 1
    }, Long.prototype.isZero = function() {
        return 0 === this.high_ && 0 === this.low_
    }, Long.prototype.isNegative = function() {
        return this.high_ < 0
    }, Long.prototype.isOdd = function() {
        return 1 == (1 & this.low_)
    }, Long.prototype.equals = function(e) {
        return this.high_ === e.high_ && this.low_ === e.low_
    }, Long.prototype.notEquals = function(e) {
        return this.high_ !== e.high_ || this.low_ !== e.low_
    }, Long.prototype.lessThan = function(e) {
        return this.compare(e) < 0
    }, Long.prototype.lessThanOrEqual = function(e) {
        return this.compare(e) <= 0
    }, Long.prototype.greaterThan = function(e) {
        return 0 < this.compare(e)
    }, Long.prototype.greaterThanOrEqual = function(e) {
        return 0 <= this.compare(e)
    }, Long.prototype.compare = function(e) {
        if (this.equals(e)) return 0;
        var t = this.isNegative(),
            r = e.isNegative();
        return t && !r ? -1 : !t && r ? 1 : this.subtract(e).isNegative() ? -1 : 1
    }, Long.prototype.negate = function() {
        return this.equals(Long.MIN_VALUE) ? Long.MIN_VALUE : this.not().add(Long.ONE)
    }, Long.prototype.add = function(e) {
        var t = this.high_ >>> 16,
            r = 65535 & this.high_,
            n = this.low_ >>> 16,
            i = 65535 & this.low_,
            o = e.high_ >>> 16,
            s = 65535 & e.high_,
            u = e.low_ >>> 16,
            a = 0,
            f = 0,
            c = 0,
            l = 0;
        return c += (l += i + (65535 & e.low_)) >>> 16, l &= 65535, f += (c += n + u) >>> 16, c &= 65535, a += (f += r + s) >>> 16, f &= 65535, a += t + o, a &= 65535, Long.fromBits(c << 16 | l, a << 16 | f)
    }, Long.prototype.subtract = function(e) {
        return this.add(e.negate())
    }, Long.prototype.multiply = function(e) {
        if (this.isZero()) return Long.ZERO;
        if (e.isZero()) return Long.ZERO;
        if (this.equals(Long.MIN_VALUE)) return e.isOdd() ? Long.MIN_VALUE : Long.ZERO;
        if (e.equals(Long.MIN_VALUE)) return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;
        if (this.isNegative()) return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
        if (e.isNegative()) return this.multiply(e.negate()).negate();
        if (this.lessThan(Long.TWO_PWR_24_) && e.lessThan(Long.TWO_PWR_24_)) return Long.fromNumber(this.toNumber() * e.toNumber());
        var t = this.high_ >>> 16,
            r = 65535 & this.high_,
            n = this.low_ >>> 16,
            i = 65535 & this.low_,
            o = e.high_ >>> 16,
            s = 65535 & e.high_,
            u = e.low_ >>> 16,
            a = 65535 & e.low_,
            f = 0,
            c = 0,
            l = 0,
            h = 0;
        return l += (h += i * a) >>> 16, h &= 65535, c += (l += n * a) >>> 16, l &= 65535, c += (l += i * u) >>> 16, l &= 65535, f += (c += r * a) >>> 16, c &= 65535, f += (c += n * u) >>> 16, c &= 65535, f += (c += i * s) >>> 16, c &= 65535, f += t * a + r * u + n * s + i * o, f &= 65535, Long.fromBits(l << 16 | h, f << 16 | c)
    }, Long.prototype.div = function(e) {
        if (e.isZero()) throw Error("division by zero");
        if (this.isZero()) return Long.ZERO;
        if (this.equals(Long.MIN_VALUE)) {
            if (e.equals(Long.ONE) || e.equals(Long.NEG_ONE)) return Long.MIN_VALUE;
            if (e.equals(Long.MIN_VALUE)) return Long.ONE;
            var t = this.shiftRight(1).div(e).shiftLeft(1);
            if (t.equals(Long.ZERO)) return e.isNegative() ? Long.ONE : Long.NEG_ONE;
            var r = this.subtract(e.multiply(t));
            return t.add(r.div(e))
        }
        if (e.equals(Long.MIN_VALUE)) return Long.ZERO;
        if (this.isNegative()) return e.isNegative() ? this.negate().div(e.negate()) : this.negate().div(e).negate();
        if (e.isNegative()) return this.div(e.negate()).negate();
        var n = Long.ZERO;
        for (r = this; r.greaterThanOrEqual(e);) {
            t = Math.max(1, Math.floor(r.toNumber() / e.toNumber()));
            for (var i = Math.ceil(Math.log(t) / Math.LN2), o = i <= 48 ? 1 : Math.pow(2, i - 48), s = Long.fromNumber(t), u = s.multiply(e); u.isNegative() || u.greaterThan(r);) t -= o, u = (s = Long.fromNumber(t)).multiply(e);
            s.isZero() && (s = Long.ONE), n = n.add(s), r = r.subtract(u)
        }
        return n
    }, Long.prototype.modulo = function(e) {
        return this.subtract(this.div(e).multiply(e))
    }, Long.prototype.not = function() {
        return Long.fromBits(~this.low_, ~this.high_)
    }, Long.prototype.and = function(e) {
        return Long.fromBits(this.low_ & e.low_, this.high_ & e.high_)
    }, Long.prototype.or = function(e) {
        return Long.fromBits(this.low_ | e.low_, this.high_ | e.high_)
    }, Long.prototype.xor = function(e) {
        return Long.fromBits(this.low_ ^ e.low_, this.high_ ^ e.high_)
    }, Long.prototype.shiftLeft = function(e) {
        if (0 === (e &= 63)) return this;
        var t = this.low_;
        if (e < 32) {
            var r = this.high_;
            return Long.fromBits(t << e, r << e | t >>> 32 - e)
        }
        return Long.fromBits(0, t << e - 32)
    }, Long.prototype.shiftRight = function(e) {
        if (0 === (e &= 63)) return this;
        var t = this.high_;
        if (e < 32) {
            var r = this.low_;
            return Long.fromBits(r >>> e | t << 32 - e, t >> e)
        }
        return Long.fromBits(t >> e - 32, 0 <= t ? 0 : -1)
    }, Long.prototype.shiftRightUnsigned = function(e) {
        if (0 === (e &= 63)) return this;
        var t = this.high_;
        if (e < 32) {
            var r = this.low_;
            return Long.fromBits(r >>> e | t << 32 - e, t >>> e)
        }
        return 32 === e ? Long.fromBits(t, 0) : Long.fromBits(t >>> e - 32, 0)
    }, Long.fromInt = function(e) {
        if (-128 <= e && e < 128) {
            var t = Long.INT_CACHE_[e];
            if (t) return t
        }
        var r = new Long(0 | e, e < 0 ? -1 : 0);
        return -128 <= e && e < 128 && (Long.INT_CACHE_[e] = r), r
    }, Long.fromNumber = function(e) {
        return isNaN(e) || !isFinite(e) ? Long.ZERO : e <= -Long.TWO_PWR_63_DBL_ ? Long.MIN_VALUE : e + 1 >= Long.TWO_PWR_63_DBL_ ? Long.MAX_VALUE : e < 0 ? Long.fromNumber(-e).negate() : new Long(e % Long.TWO_PWR_32_DBL_ | 0, e / Long.TWO_PWR_32_DBL_ | 0)
    }, Long.fromBits = function(e, t) {
        return new Long(e, t)
    }, Long.fromString = function(e, t) {
        if (0 === e.length) throw Error("number format error: empty string");
        var r = t || 10;
        if (r < 2 || 36 < r) throw Error("radix out of range: " + r);
        if ("-" === e.charAt(0)) return Long.fromString(e.substring(1), r).negate();
        if (0 <= e.indexOf("-")) throw Error('number format error: interior "-" character: ' + e);
        for (var n = Long.fromNumber(Math.pow(r, 8)), i = Long.ZERO, o = 0; o < e.length; o += 8) {
            var s = Math.min(8, e.length - o),
                u = parseInt(e.substring(o, o + s), r);
            if (s < 8) {
                var a = Long.fromNumber(Math.pow(r, s));
                i = i.multiply(a).add(Long.fromNumber(u))
            } else i = (i = i.multiply(n)).add(Long.fromNumber(u))
        }
        return i
    }, Long.INT_CACHE_ = {}, Long.TWO_PWR_16_DBL_ = 65536, Long.TWO_PWR_24_DBL_ = 1 << 24, Long.TWO_PWR_32_DBL_ = Long.TWO_PWR_16_DBL_ * Long.TWO_PWR_16_DBL_, Long.TWO_PWR_31_DBL_ = Long.TWO_PWR_32_DBL_ / 2, Long.TWO_PWR_48_DBL_ = Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_16_DBL_, Long.TWO_PWR_64_DBL_ = Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_32_DBL_, Long.TWO_PWR_63_DBL_ = Long.TWO_PWR_64_DBL_ / 2, Long.ZERO = Long.fromInt(0), Long.ONE = Long.fromInt(1), Long.NEG_ONE = Long.fromInt(-1), Long.MAX_VALUE = Long.fromBits(-1, 2147483647), Long.MIN_VALUE = Long.fromBits(0, -2147483648), Long.TWO_PWR_24_ = Long.fromInt(1 << 24);
    var long_1 = Long,
        Long_1 = Long;

    function Double(e) {
        if (!(this instanceof Double)) return new Double(e);
        this._bsontype = "Double", this.value = e
    }
    long_1.Long = Long_1, Double.prototype.valueOf = function() {
        return this.value
    }, Double.prototype.toJSON = function() {
        return this.value
    };
    var double_1 = Double,
        Double_1 = Double;

    function Timestamp(e, t) {
        e instanceof long_1 ? long_1.call(this, e.low_, e.high_) : long_1.call(this, e, t), this._bsontype = "Timestamp"
    }
    double_1.Double = Double_1, Timestamp.prototype = Object.create(long_1.prototype), Timestamp.prototype.constructor = Timestamp, Timestamp.prototype.toJSON = function() {
        return {
            $timestamp: this.toString()
        }
    }, Timestamp.fromInt = function(e) {
        return new Timestamp(long_1.fromInt(e))
    }, Timestamp.fromNumber = function(e) {
        return new Timestamp(long_1.fromNumber(e))
    }, Timestamp.fromBits = function(e, t) {
        return new Timestamp(e, t)
    }, Timestamp.fromString = function(e, t) {
        return new Timestamp(long_1.fromString(e, t))
    };
    var timestamp = Timestamp,
        Timestamp_1 = Timestamp,
        _endianness;

    function endianness() {
        if (void 0 === _endianness) {
            var e = new ArrayBuffer(2),
                t = new Uint8Array(e),
                r = new Uint16Array(e);
            if (t[0] = 1, t[1] = 2, 258 === r[0]) _endianness = "BE";
            else {
                if (513 !== r[0]) throw new Error("unable to figure out endianess");
                _endianness = "LE"
            }
        }
        return _endianness
    }

    function hostname() {
        return void 0 !== global$1.location ? global$1.location.hostname : ""
    }

    function loadavg() {
        return []
    }

    function uptime$1() {
        return 0
    }

    function freemem() {
        return Number.MAX_VALUE
    }

    function totalmem() {
        return Number.MAX_VALUE
    }

    function cpus() {
        return []
    }

    function type() {
        return "Browser"
    }

    function release$1() {
        return void 0 !== global$1.navigator ? global$1.navigator.appVersion : ""
    }

    function networkInterfaces() {}

    function getNetworkInterfaces() {}

    function arch() {
        return "javascript"
    }

    function platform$1() {
        return "browser"
    }

    function tmpDir() {
        return "/tmp"
    }
    timestamp.Timestamp = Timestamp_1;
    var tmpdir = tmpDir,
        EOL = "\n",
        os = {
            EOL: EOL,
            tmpdir: tmpdir,
            tmpDir: tmpDir,
            networkInterfaces: networkInterfaces,
            getNetworkInterfaces: getNetworkInterfaces,
            release: release$1,
            type: type,
            cpus: cpus,
            totalmem: totalmem,
            freemem: freemem,
            uptime: uptime$1,
            loadavg: loadavg,
            hostname: hostname,
            endianness: endianness
        }, os$1 = Object.freeze({
            endianness: endianness,
            hostname: hostname,
            loadavg: loadavg,
            uptime: uptime$1,
            freemem: freemem,
            totalmem: totalmem,
            cpus: cpus,
            type: type,
            release: release$1,
            networkInterfaces: networkInterfaces,
            getNetworkInterfaces: getNetworkInterfaces,
            arch: arch,
            platform: platform$1,
            tmpDir: tmpDir,
            tmpdir: tmpdir,
            EOL: EOL,
            default: os
        }),
        Buffer = buffer.Buffer,
        MASK_8 = 255,
        MASK_24 = 16777215,
        MASK_32 = 4294967295,
        FNV_PRIME = new long_1(16777619, 0),
        OFFSET_BASIS = new long_1(2166136261, 0),
        FNV_MASK = new long_1(MASK_32, 0);

    function fnv1a32(e, t) {
        t = t || "utf8";
        for (var r = Buffer.from(e, t), n = OFFSET_BASIS, i = 0; i < r.length; i += 1) n = (n = (n = n.xor(new long_1(r[i], 0))).multiply(FNV_PRIME)).and(FNV_MASK);
        return n.getLowBitsUnsigned()
    }

    function fnv1a24(e, t) {
        var r = fnv1a32(e, t);
        return (r & MASK_24 ^ r >>> 24 & MASK_8) & MASK_24
    }
    var fnv1a = {
        fnv1a24: fnv1a24,
        fnv1a32: fnv1a32
    }, require$$1 = os$1 && os || os$1,
        Buffer$1 = buffer.Buffer,
        hostname$1 = require$$1.hostname,
        fnv1a24$1 = fnv1a.fnv1a24,
        MACHINE_ID = fnv1a24$1(hostname$1),
        checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"),
        hasBufferType = !1;
    try {
        Buffer$1 && Buffer$1.from && (hasBufferType = !0)
    } catch (e) {
        hasBufferType = !1
    }

    function ObjectID(e) {
        if (e instanceof ObjectID) return e;
        if (!(this instanceof ObjectID)) return new ObjectID(e);
        if (this._bsontype = "ObjectID", null == e || "number" == typeof e) return this.id = this.generate(e), void(ObjectID.cacheHexString && (this.__id = this.toString("hex")));
        var t = ObjectID.isValid(e);
        if (!t && null != e) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        if (t && "string" == typeof e && 24 === e.length && hasBufferType) return new ObjectID(new Buffer$1(e, "hex"));
        if (t && "string" == typeof e && 24 === e.length) return ObjectID.createFromHexString(e);
        if (null == e || 12 !== e.length) {
            if (null != e && e.toHexString) return e;
            throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
        }
        this.id = e, ObjectID.cacheHexString && (this.__id = this.toString("hex"))
    }
    for (var hexTable = [], i$1 = 0; i$1 < 256; i$1++) hexTable[i$1] = (i$1 <= 15 ? "0" : "") + i$1.toString(16);
    ObjectID.prototype.toHexString = function() {
        if (ObjectID.cacheHexString && this.__id) return this.__id;
        var e = "";
        if (!this.id || !this.id.length) throw new TypeError("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [" + JSON.stringify(this.id) + "]");
        if (this.id instanceof _Buffer) return e = convertToHex(this.id), ObjectID.cacheHexString && (this.__id = e), e;
        for (var t = 0; t < this.id.length; t++) e += hexTable[this.id.charCodeAt(t)];
        return ObjectID.cacheHexString && (this.__id = e), e
    }, ObjectID.prototype.get_inc = function() {
        return ObjectID.index = (ObjectID.index + 1) % 16777215
    }, ObjectID.prototype.getInc = function() {
        return this.get_inc()
    }, ObjectID.prototype.generate = function(e) {
        "number" != typeof e && (e = ~~ (Date.now() / 1e3));
        var t = (void 0 === process || 1 === process.pid ? Math.floor(1e5 * Math.random()) : process.pid) % 65535,
            r = this.get_inc(),
            n = new Buffer$1(12);
        return n[3] = 255 & e, n[2] = e >> 8 & 255, n[1] = e >> 16 & 255, n[0] = e >> 24 & 255, n[6] = 255 & MACHINE_ID, n[5] = MACHINE_ID >> 8 & 255, n[4] = MACHINE_ID >> 16 & 255, n[8] = 255 & t, n[7] = t >> 8 & 255, n[11] = 255 & r, n[10] = r >> 8 & 255, n[9] = r >> 16 & 255, n
    }, ObjectID.prototype.toString = function(e) {
        return this.id && this.id.copy ? this.id.toString("string" == typeof e ? e : "hex") : this.toHexString()
    }, ObjectID.prototype.inspect = ObjectID.prototype.toString, ObjectID.prototype.toJSON = function() {
        return this.toHexString()
    }, ObjectID.prototype.equals = function(e) {
        return e instanceof ObjectID ? this.toString() === e.toString() : "string" == typeof e && ObjectID.isValid(e) && 12 === e.length && this.id instanceof _Buffer ? e === this.id.toString("binary") : "string" == typeof e && ObjectID.isValid(e) && 24 === e.length ? e.toLowerCase() === this.toHexString() : "string" == typeof e && ObjectID.isValid(e) && 12 === e.length ? e === this.id : !(null == e || !(e instanceof ObjectID || e.toHexString)) && e.toHexString() === this.toHexString()
    }, ObjectID.prototype.getTimestamp = function() {
        var e = new Date,
            t = this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
        return e.setTime(1e3 * Math.floor(t)), e
    }, ObjectID.index = ~~ (16777215 * Math.random()), ObjectID.createPk = function() {
        return new ObjectID
    }, ObjectID.createFromTime = function(e) {
        var t = new Buffer$1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        return t[3] = 255 & e, t[2] = e >> 8 & 255, t[1] = e >> 16 & 255, t[0] = e >> 24 & 255, new ObjectID(t)
    };
    var decodeLookup = [];
    for (i$1 = 0; i$1 < 10;) decodeLookup[48 + i$1] = i$1++;
    for (; i$1 < 16;) decodeLookup[55 + i$1] = decodeLookup[87 + i$1] = i$1++;
    var _Buffer = Buffer$1,
        convertToHex = function(e) {
            return e.toString("hex")
        };
    ObjectID.createFromHexString = function(e) {
        if (void 0 === e || null != e && 24 !== e.length) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        if (hasBufferType) return new ObjectID(new Buffer$1(e, "hex"));
        for (var t = new _Buffer(12), r = 0, n = 0; n < 24;) t[r++] = decodeLookup[e.charCodeAt(n++)] << 4 | decodeLookup[e.charCodeAt(n++)];
        return new ObjectID(t)
    }, ObjectID.isValid = function(e) {
        return null != e && ("number" == typeof e || ("string" == typeof e ? 12 === e.length || 24 === e.length && checkForHexRegExp.test(e) : e instanceof ObjectID || (e instanceof _Buffer || !! e.toHexString && (12 === e.id.length || 24 === e.id.length && checkForHexRegExp.test(e.id)))))
    }, Object.defineProperty(ObjectID.prototype, "generationTime", {
        enumerable: !0,
        get: function() {
            return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24
        },
        set: function(e) {
            this.id[3] = 255 & e, this.id[2] = e >> 8 & 255, this.id[1] = e >> 16 & 255, this.id[0] = e >> 24 & 255
        }
    });
    var objectid = ObjectID,
        ObjectID_1 = ObjectID,
        ObjectId = ObjectID;

    function alphabetize(e) {
        return e.split("").sort().join("")
    }

    function BSONRegExp(e, t) {
        if (!(this instanceof BSONRegExp)) return new BSONRegExp(e, t);
        this._bsontype = "BSONRegExp", this.pattern = e || "", this.options = t ? alphabetize(t) : "";
        for (var r = 0; r < this.options.length; r++)
            if ("i" !== this.options[r] && "m" !== this.options[r] && "x" !== this.options[r] && "l" !== this.options[r] && "s" !== this.options[r] && "u" !== this.options[r]) throw new Error("the regular expression options [" + this.options[r] + "] is not supported")
    }
    objectid.ObjectID = ObjectID_1, objectid.ObjectId = ObjectId;
    var regexp = BSONRegExp,
        BSONRegExp_1 = BSONRegExp;

    function _Symbol(e) {
        if (!(this instanceof _Symbol)) return new _Symbol(e);
        this._bsontype = "Symbol", this.value = e
    }
    regexp.BSONRegExp = BSONRegExp_1, _Symbol.prototype.valueOf = function() {
        return this.value
    }, _Symbol.prototype.toString = function() {
        return this.value
    }, _Symbol.prototype.inspect = function() {
        return this.value
    }, _Symbol.prototype.toJSON = function() {
        return this.value
    };
    var symbol = _Symbol,
        Symbol_1 = _Symbol;

    function Int32(e) {
        if (!(this instanceof Int32)) return new Int32(e);
        this._bsontype = "Int32", this.value = e
    }
    symbol.Symbol = Symbol_1, Int32.prototype.valueOf = function() {
        return this.value
    }, Int32.prototype.toJSON = function() {
        return this.value
    };
    var int_32 = Int32,
        Int32_1 = Int32;

    function Code(e, t) {
        if (!(this instanceof Code)) return new Code(e, t);
        this._bsontype = "Code", this.code = e, this.scope = t
    }
    int_32.Int32 = Int32_1, Code.prototype.toJSON = function() {
        return {
            scope: this.scope,
            code: this.code
        }
    };
    var code$1 = Code,
        Code_1 = Code;
    code$1.Code = Code_1;
    var Buffer$2 = buffer.Buffer,
        PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/,
        PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i,
        PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i,
        EXPONENT_MAX = 6111,
        EXPONENT_MIN = -6176,
        EXPONENT_BIAS = 6176,
        MAX_DIGITS = 34,
        NAN_BUFFER = [124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_NEGATIVE_BUFFER = [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_POSITIVE_BUFFER = [120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        EXPONENT_REGEX = /^([-+])?(\d+)?$/,
        isDigit = function(e) {
            return !isNaN(parseInt(e, 10))
        }, divideu128 = function(e) {
            var t = long_1.fromNumber(1e9),
                r = long_1.fromNumber(0);
            if (!(e.parts[0] || e.parts[1] || e.parts[2] || e.parts[3])) return {
                quotient: e,
                rem: r
            };
            for (var n = 0; n <= 3; n++) r = (r = r.shiftLeft(32)).add(new long_1(e.parts[n], 0)), e.parts[n] = r.div(t).low_, r = r.modulo(t);
            return {
                quotient: e,
                rem: r
            }
        }, multiply64x2 = function(e, t) {
            if (!e && !t) return {
                high: long_1.fromNumber(0),
                low: long_1.fromNumber(0)
            };
            var r = e.shiftRightUnsigned(32),
                n = new long_1(e.getLowBits(), 0),
                i = t.shiftRightUnsigned(32),
                o = new long_1(t.getLowBits(), 0),
                s = r.multiply(i),
                u = r.multiply(o),
                a = n.multiply(i),
                f = n.multiply(o);
            return s = s.add(u.shiftRightUnsigned(32)), u = new long_1(u.getLowBits(), 0).add(a).add(f.shiftRightUnsigned(32)), {
                high: s = s.add(u.shiftRightUnsigned(32)),
                low: f = u.shiftLeft(32).add(new long_1(f.getLowBits(), 0))
            }
        }, lessThan = function(e, t) {
            var r = e.high_ >>> 0,
                n = t.high_ >>> 0;
            return r < n || r === n && e.low_ >>> 0 < t.low_ >>> 0
        }, invalidErr = function(e, t) {
            throw new TypeError('"${string}" not a valid Decimal128 string - ' + t)
        };

    function Decimal128(e) {
        this._bsontype = "Decimal128", this.bytes = e
    }
    Decimal128.fromString = function(e) {
        var t, r = !1,
            n = !1,
            i = !1,
            o = 0,
            s = 0,
            u = 0,
            a = 0,
            f = 0,
            c = [0],
            l = 0,
            h = 0,
            p = 0,
            d = 0,
            y = 0,
            _ = 0,
            g = [0, 0],
            $ = [0, 0],
            b = 0;
        if (7e3 <= e.length) throw new TypeError(e + " not a valid Decimal128 string");
        var S = e.match(PARSE_STRING_REGEXP),
            m = e.match(PARSE_INF_REGEXP),
            N = e.match(PARSE_NAN_REGEXP);
        if (!S && !m && !N || 0 === e.length) throw new TypeError(e + " not a valid Decimal128 string");
        if (S) {
            var E = S[2],
                B = S[4],
                O = S[5],
                A = S[6];
            B && void 0 === A && invalidErr(e, "missing exponent power"), B && void 0 === E && invalidErr(e, "missing exponent base"), void 0 === B && (O || A) && invalidErr(e, "missing e before exponent")
        }
        if ("+" !== e[b] && "-" !== e[b] || (r = "-" === e[b++]), !isDigit(e[b]) && "." !== e[b]) {
            if ("i" === e[b] || "I" === e[b]) return new Decimal128(new Buffer$2(r ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            if ("N" === e[b]) return new Decimal128(new Buffer$2(NAN_BUFFER))
        }
        for (; isDigit(e[b]) || "." === e[b];) "." !== e[b] ? (l < 34 && ("0" !== e[b] || i) && (i || (f = s), i = !0, c[h++] = parseInt(e[b], 10), l += 1), i && (u += 1), n && (a += 1), s += 1) : (n && invalidErr(e, "contains multiple periods"), n = !0), b += 1;
        if (n && !s) throw new TypeError(e + " not a valid Decimal128 string");
        if ("e" === e[b] || "E" === e[b]) {
            var v = e.substr(++b).match(EXPONENT_REGEX);
            if (!v || !v[2]) return new Decimal128(new Buffer$2(NAN_BUFFER));
            y = parseInt(v[0], 10), b += v[0].length
        }
        if (e[b]) return new Decimal128(new Buffer$2(NAN_BUFFER));
        if (p = 0, l) {
            if (d = l - 1, 1 !== (o = u))
                for (;
                    "0" === e[f + o - 1];) o -= 1
        } else l = u = 1, o = c[d = p = 0] = 0;
        for (y <= a && 16384 < a - y ? y = EXPONENT_MIN : y -= a; EXPONENT_MAX < y;) {
            if (MAX_DIGITS < (d += 1) - p) {
                var w = c.join("");
                if (w.match(/^0+$/)) {
                    y = EXPONENT_MAX;
                    break
                }
                invalidErr(e, "overflow")
            }
            y -= 1
        }
        for (; y < EXPONENT_MIN || l < u;) {
            if (0 === d && o < l) {
                y = EXPONENT_MIN, o = 0;
                break
            }
            if (l < u ? u -= 1 : d -= 1, y < EXPONENT_MAX) y += 1;
            else {
                if ((w = c.join("")).match(/^0+$/)) {
                    y = EXPONENT_MAX;
                    break
                }
                invalidErr(e, "overflow")
            }
        }
        if (d - p + 1 < o) {
            var I = s;
            n && (f += 1, I += 1), r && (f += 1, I += 1);
            var T = parseInt(e[f + d + 1], 10),
                R = 0;
            if (5 <= T && (R = 1, 5 === T))
                for (R = c[d] % 2 == 1, _ = f + d + 2; _ < I; _++)
                    if (parseInt(e[_], 10)) {
                        R = 1;
                        break
                    }
            if (R)
                for (var D = d; 0 <= D; D--)
                    if (9 < ++c[D] && (c[D] = 0) === D) {
                        if (!(y < EXPONENT_MAX)) return new Decimal128(new Buffer$2(r ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
                        y += 1, c[D] = 1
                    }
        }
        if (g = long_1.fromNumber(0), $ = long_1.fromNumber(0), 0 === o) g = long_1.fromNumber(0), $ = long_1.fromNumber(0);
        else if (d - p < 17)
            for (D = p, $ = long_1.fromNumber(c[D++]), g = new long_1(0, 0); D <= d; D++) $ = ($ = $.multiply(long_1.fromNumber(10))).add(long_1.fromNumber(c[D]));
        else {
            for (D = p, g = long_1.fromNumber(c[D++]); D <= d - 17; D++) g = (g = g.multiply(long_1.fromNumber(10))).add(long_1.fromNumber(c[D]));
            for ($ = long_1.fromNumber(c[D++]); D <= d; D++) $ = ($ = $.multiply(long_1.fromNumber(10))).add(long_1.fromNumber(c[D]))
        }
        var L = multiply64x2(g, long_1.fromString("100000000000000000"));
        L.low = L.low.add($), lessThan(L.low, $) && (L.high = L.high.add(long_1.fromNumber(1))), t = y + EXPONENT_BIAS;
        var x = {
            low: long_1.fromNumber(0),
            high: long_1.fromNumber(0)
        };
        L.high.shiftRightUnsigned(49).and(long_1.fromNumber(1)).equals(long_1.fromNumber) ? (x.high = x.high.or(long_1.fromNumber(3).shiftLeft(61)), x.high = x.high.or(long_1.fromNumber(t).and(long_1.fromNumber(16383).shiftLeft(47))), x.high = x.high.or(L.high.and(long_1.fromNumber(0x7fffffffffff)))) : (x.high = x.high.or(long_1.fromNumber(16383 & t).shiftLeft(49)), x.high = x.high.or(L.high.and(long_1.fromNumber(562949953421311)))), x.low = L.low, r && (x.high = x.high.or(long_1.fromString("9223372036854775808")));
        var C = new Buffer$2(16);
        return b = 0, C[b++] = 255 & x.low.low_, C[b++] = x.low.low_ >> 8 & 255, C[b++] = x.low.low_ >> 16 & 255, C[b++] = x.low.low_ >> 24 & 255, C[b++] = 255 & x.low.high_, C[b++] = x.low.high_ >> 8 & 255, C[b++] = x.low.high_ >> 16 & 255, C[b++] = x.low.high_ >> 24 & 255, C[b++] = 255 & x.high.low_, C[b++] = x.high.low_ >> 8 & 255, C[b++] = x.high.low_ >> 16 & 255, C[b++] = x.high.low_ >> 24 & 255, C[b++] = 255 & x.high.high_, C[b++] = x.high.high_ >> 8 & 255, C[b++] = x.high.high_ >> 16 & 255, C[b++] = x.high.high_ >> 24 & 255, new Decimal128(C)
    };
    var COMBINATION_MASK = 31,
        EXPONENT_MASK = 16383,
        COMBINATION_INFINITY = 30,
        COMBINATION_NAN = 31;
    EXPONENT_BIAS = 6176, Decimal128.prototype.toString = function() {
        for (var e, t, r, n, i, o, s = 0, u = new Array(36), a = 0; a < u.length; a++) u[a] = 0;
        var f, c, l, h, p, d = 0,
            y = !1,
            _ = {
                parts: new Array(4)
            }, g = [];
        d = 0;
        var $ = this.bytes;
        if (n = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, r = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, t = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, e = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, d = 0, {
            low: new long_1(n, r),
            high: new long_1(t, e)
        }.high.lessThan(long_1.ZERO) && g.push("-"), (i = e >> 26 & COMBINATION_MASK) >> 3 == 3) {
            if (i === COMBINATION_INFINITY) return g.join("") + "Infinity";
            if (i === COMBINATION_NAN) return "NaN";
            o = e >> 15 & EXPONENT_MASK, l = 8 + (e >> 14 & 1)
        } else l = e >> 14 & 7, o = e >> 17 & EXPONENT_MASK; if (f = o - EXPONENT_BIAS, _.parts[0] = (16383 & e) + ((15 & l) << 14), _.parts[1] = t, _.parts[2] = r, _.parts[3] = n, 0 === _.parts[0] && 0 === _.parts[1] && 0 === _.parts[2] && 0 === _.parts[3]) y = !0;
        else
            for (p = 3; 0 <= p; p--) {
                var b = 0,
                    S = divideu128(_);
                if (_ = S.quotient, b = S.rem.low_)
                    for (h = 8; 0 <= h; h--) u[9 * p + h] = b % 10, b = Math.floor(b / 10)
            }
        if (y) s = 1, u[d] = 0;
        else
            for (s = 36, a = 0; !u[d];) a++, s -= 1, d += 1; if (34 <= (c = s - 1 + f) || c <= -7 || 0 < f) {
            if (34 < s) return g.push(0), 0 < f ? g.push("E+" + f) : f < 0 && g.push("E" + f), g.join("");
            for (g.push(u[d++]), (s -= 1) && g.push("."), a = 0; a < s; a++) g.push(u[d++]);
            g.push("E"), 0 < c ? g.push("+" + c) : g.push(c)
        } else if (0 <= f)
            for (a = 0; a < s; a++) g.push(u[d++]);
        else {
            var m = s + f;
            if (0 < m)
                for (a = 0; a < m; a++) g.push(u[d++]);
            else g.push("0");
            for (g.push("."); m++ < 0;) g.push("0");
            for (a = 0; a < s - Math.max(m - 1, 0); a++) g.push(u[d++])
        }
        return g.join("")
    }, Decimal128.prototype.toJSON = function() {
        return {
            $numberDecimal: this.toString()
        }
    };
    var decimal128 = Decimal128,
        Decimal128_1 = Decimal128;

    function MinKey() {
        if (!(this instanceof MinKey)) return new MinKey;
        this._bsontype = "MinKey"
    }
    decimal128.Decimal128 = Decimal128_1;
    var min_key = MinKey,
        MinKey_1 = MinKey;

    function MaxKey() {
        if (!(this instanceof MaxKey)) return new MaxKey;
        this._bsontype = "MaxKey"
    }
    min_key.MinKey = MinKey_1;
    var max_key = MaxKey,
        MaxKey_1 = MaxKey;

    function DBRef(e, t, r, n) {
        if (!(this instanceof DBRef)) return new DBRef(e, t, r, n);
        var i = e.split(".");
        2 === i.length && (r = i.shift(), e = i.shift()), this._bsontype = "DBRef", this.collection = e, this.oid = t, this.db = r, this.fields = n || {}
    }
    max_key.MaxKey = MaxKey_1, DBRef.prototype.toJSON = function() {
        var e = {
            $ref: this.collection,
            $id: this.oid
        };
        return null != this.db && (e.$db = this.db), e = Object.assign(e, this.fields)
    };
    var db_ref = DBRef,
        DBRef_1 = DBRef;
    db_ref.DBRef = DBRef_1;
    var Buffer$3 = buffer.Buffer;

    function Binary(e, t) {
        if (!(this instanceof Binary)) return new Binary(e, t);
        if (!(null == e || "string" == typeof e || Buffer$3.isBuffer(e) || e instanceof Uint8Array || Array.isArray(e))) throw new Error("only String, Buffer, Uint8Array or Array accepted");
        if (this._bsontype = "Binary", e instanceof Number ? this.sub_type = e : this.sub_type = null == t ? BSON_BINARY_SUBTYPE_DEFAULT : t, this.position = 0, null == e || e instanceof Number) void 0 !== Buffer$3 ? this.buffer = new Buffer$3(Binary.BUFFER_SIZE) : "undefined" != typeof Uint8Array ? this.buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE)) : this.buffer = new Array(Binary.BUFFER_SIZE), this.position = 0;
        else {
            if ("string" == typeof e)
                if (void 0 !== Buffer$3) this.buffer = new Buffer$3(e);
                else {
                    if ("undefined" == typeof Uint8Array && "[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                    this.buffer = writeStringToArray(e)
                } else this.buffer = e;
            this.position = e.length
        }
    }
    Binary.prototype.put = function(e) {
        if (null != e.length && "number" != typeof e && 1 !== e.length) throw new TypeError("only accepts single character String, Uint8Array or Array");
        if ("number" != typeof e && e < 0 || 255 < e) throw new TypeError("only accepts number in a valid unsigned byte range 0-255");
        var t = null;
        if (t = "string" == typeof e ? e.charCodeAt(0) : null != e.length ? e[0] : e, this.buffer.length > this.position) this.buffer[this.position++] = t;
        else if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) {
            var r = new Buffer$3(Binary.BUFFER_SIZE + this.buffer.length);
            this.buffer.copy(r, 0, 0, this.buffer.length), this.buffer = r, this.buffer[this.position++] = t
        } else {
            r = null, r = "[object Uint8Array]" === Object.prototype.toString.call(this.buffer) ? new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE + this.buffer.length)) : new Array(Binary.BUFFER_SIZE + this.buffer.length);
            for (var n = 0; n < this.buffer.length; n++) r[n] = this.buffer[n];
            this.buffer = r, this.buffer[this.position++] = t
        }
    }, Binary.prototype.write = function(e, t) {
        if (t = "number" == typeof t ? t : this.position, this.buffer.length < t + e.length) {
            var r = null;
            if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) r = new Buffer$3(this.buffer.length + e.length), this.buffer.copy(r, 0, 0, this.buffer.length);
            else if ("[object Uint8Array]" === Object.prototype.toString.call(this.buffer)) {
                r = new Uint8Array(new ArrayBuffer(this.buffer.length + e.length));
                for (var n = 0; n < this.position; n++) r[n] = this.buffer[n]
            }
            this.buffer = r
        }
        if (void 0 !== Buffer$3 && Buffer$3.isBuffer(e) && Buffer$3.isBuffer(this.buffer)) e.copy(this.buffer, t, 0, e.length), this.position = t + e.length > this.position ? t + e.length : this.position;
        else if (void 0 !== Buffer$3 && "string" == typeof e && Buffer$3.isBuffer(this.buffer)) this.buffer.write(e, t, "binary"), this.position = t + e.length > this.position ? t + e.length : this.position;
        else if ("[object Uint8Array]" === Object.prototype.toString.call(e) || "[object Array]" === Object.prototype.toString.call(e) && "string" != typeof e) {
            for (n = 0; n < e.length; n++) this.buffer[t++] = e[n];
            this.position = t > this.position ? t : this.position
        } else if ("string" == typeof e) {
            for (n = 0; n < e.length; n++) this.buffer[t++] = e.charCodeAt(n);
            this.position = t > this.position ? t : this.position
        }
    }, Binary.prototype.read = function(e, t) {
        if (t = t && 0 < t ? t : this.position, this.buffer.slice) return this.buffer.slice(e, e + t);
        for (var r = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(t)) : new Array(t), n = 0; n < t; n++) r[n] = this.buffer[e++];
        return r
    }, Binary.prototype.value = function(e) {
        if ((e = null != e && e) && void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;
        if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) return e ? this.buffer.slice(0, this.position) : this.buffer.toString("binary", 0, this.position);
        if (e) {
            if (null != this.buffer.slice) return this.buffer.slice(0, this.position);
            for (var t = "[object Uint8Array]" === Object.prototype.toString.call(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position), r = 0; r < this.position; r++) t[r] = this.buffer[r];
            return t
        }
        return convertArraytoUtf8BinaryString(this.buffer, 0, this.position)
    }, Binary.prototype.length = function() {
        return this.position
    }, Binary.prototype.toJSON = function() {
        return null != this.buffer ? this.buffer.toString("base64") : ""
    }, Binary.prototype.toString = function(e) {
        return null != this.buffer ? this.buffer.slice(0, this.position).toString(e) : ""
    };
    var BSON_BINARY_SUBTYPE_DEFAULT = 0,
        writeStringToArray = function(e) {
            for (var t = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(e.length)) : new Array(e.length), r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
            return t
        }, convertArraytoUtf8BinaryString = function(e, t, r) {
            for (var n = "", i = t; i < r; i++) n += String.fromCharCode(e[i]);
            return n
        };
    Binary.BUFFER_SIZE = 256, Binary.SUBTYPE_DEFAULT = 0, Binary.SUBTYPE_FUNCTION = 1, Binary.SUBTYPE_BYTE_ARRAY = 2, Binary.SUBTYPE_UUID_OLD = 3, Binary.SUBTYPE_UUID = 4, Binary.SUBTYPE_MD5 = 5, Binary.SUBTYPE_USER_DEFINED = 128;
    var binary = Binary,
        Binary_1 = Binary;
    binary.Binary = Binary_1;
    var Buffer$4 = buffer.Buffer,
        Long$1 = long_1.Long,
        Double$1 = double_1.Double,
        Timestamp$1 = timestamp.Timestamp,
        ObjectID$1 = objectid.ObjectID,
        Code$1 = code$1.Code,
        MinKey$1 = min_key.MinKey,
        MaxKey$1 = max_key.MaxKey,
        DBRef$1 = db_ref.DBRef,
        BSONRegExp$1 = regexp.BSONRegExp,
        Binary$1 = binary.Binary,
        deserialize = function(e, t, r) {
            var n = (t = null == t ? {} : t) && t.index ? t.index : 0,
                i = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
            if (i < 5) throw new Error("bson size must be >= 5, is " + i);
            if (t.allowObjectSmallerThanBufferSize && Buffer$4.byteLength(e) < i) throw new Error("buffer length " + Buffer$4.byteLength(e) + " must be >= bson size " + i);
            if (!t.allowObjectSmallerThanBufferSize && Buffer$4.byteLength(e) !== i) throw new Error("buffer length " + Buffer$4.byteLength(e) + " must === bson size " + i);
            if (i + n > Buffer$4.byteLength(e)) throw new Error("(bson size " + i + " + options.index " + n + " must be <= buffer length " + Buffer$4.byteLength(e) + ")");
            if (0 !== e[n + i - 1]) throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
            return deserializeObject(e, n, t, r)
        }, deserializeObject = function e(t, r, n, i) {
            var o = null != n.evalFunctions && n.evalFunctions,
                s = null != n.cacheFunctions && n.cacheFunctions,
                u = null != n.cacheFunctionsCrc32 && n.cacheFunctionsCrc32;
            if (!u) var a = null;
            var f = null == n.fieldsAsRaw ? null : n.fieldsAsRaw,
                c = null != n.raw && n.raw,
                l = "boolean" == typeof n.bsonRegExp && n.bsonRegExp,
                h = null != n.promoteBuffers && n.promoteBuffers,
                p = null == n.promoteLongs || n.promoteLongs,
                d = null == n.promoteValues || n.promoteValues,
                y = r;
            if (Buffer$4.byteLength(t) < 5) throw new Error("corrupt bson message < 5 bytes long");
            var _ = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
            if (_ < 5 || _ > Buffer$4.byteLength(t)) throw new Error("corrupt bson message");
            for (var g = i ? [] : {}, $ = 0;;) {
                var b = t[r++];
                if (0 === b) break;
                for (var S = r; 0 !== t[S] && S < Buffer$4.byteLength(t);) S++;
                if (S >= Buffer$4.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                var m = i ? $++ : t.toString("utf8", r, S);
                if (r = S + 1, b === BSON.BSON_DATA_STRING) {
                    var N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    if (N <= 0 || N > Buffer$4.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    var E = t.toString("utf8", r, r + N - 1);
                    for (S = 0; S < E.length; S++)
                        if (65533 === E.charCodeAt(S)) throw new Error("Invalid UTF-8 string in BSON document");
                    g[m] = E, r += N
                } else if (b === BSON.BSON_DATA_OID) {
                    var B = new Buffer$4(12);
                    t.copy(B, 0, r, r + 12), g[m] = new ObjectID$1(B), r += 12
                } else if (b === BSON.BSON_DATA_INT && !1 === d) g[m] = new int_32(t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24);
                else if (b === BSON.BSON_DATA_INT) g[m] = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                else if (b === BSON.BSON_DATA_NUMBER && !1 === d) g[m] = new Double$1(t.readDoubleLE(r)), r += 8;
                else if (b === BSON.BSON_DATA_NUMBER) g[m] = t.readDoubleLE(r), r += 8;
                else if (b === BSON.BSON_DATA_DATE) {
                    var O = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24,
                        A = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    g[m] = new Date(new Long$1(O, A).toNumber())
                } else if (b === BSON.BSON_DATA_BOOLEAN) {
                    if (0 !== t[r] && 1 !== t[r]) throw new Error("illegal boolean type value");
                    g[m] = 1 === t[r++]
                } else if (b === BSON.BSON_DATA_OBJECT) {
                    var v = r,
                        w = t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24;
                    if (w <= 0 || w > Buffer$4.byteLength(t) - r) throw new Error("bad embedded document length in bson");
                    g[m] = c ? t.slice(r, r + w) : e(t, v, n, !1), r += w
                } else if (b === BSON.BSON_DATA_ARRAY) {
                    var I = n,
                        T = (v = r) + (w = t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24);
                    if (f && f[m]) {
                        for (var R in I = {}, n) I[R] = n[R];
                        I.raw = !0
                    }
                    if (g[m] = e(t, v, I, !0), 0 !== t[(r += w) - 1]) throw new Error("invalid array terminator byte");
                    if (r !== T) throw new Error("corrupted array bson")
                } else if (b === BSON.BSON_DATA_UNDEFINED) g[m] = void 0;
                else if (b === BSON.BSON_DATA_NULL) g[m] = null;
                else if (b === BSON.BSON_DATA_LONG) {
                    O = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24, A = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    var D = new Long$1(O, A);
                    g[m] = p && !0 === d && D.lessThanOrEqual(JS_INT_MAX_LONG) && D.greaterThanOrEqual(JS_INT_MIN_LONG) ? D.toNumber() : D
                } else if (b === BSON.BSON_DATA_DECIMAL128) {
                    var L = new Buffer$4(16);
                    t.copy(L, 0, r, r + 16), r += 16;
                    var x = new decimal128(L);
                    g[m] = x.toObject ? x.toObject() : x
                } else if (b === BSON.BSON_DATA_BINARY) {
                    var C = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24,
                        M = C,
                        P = t[r++];
                    if (C < 0) throw new Error("Negative binary type element size found");
                    if (C > Buffer$4.byteLength(t)) throw new Error("Binary type size larger than document size");
                    if (null != t.slice) {
                        if (P === Binary$1.SUBTYPE_BYTE_ARRAY) {
                            if ((C = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                            if (M - 4 < C) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                            if (C < M - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                        }
                        g[m] = h && d ? t.slice(r, r + C) : new Binary$1(t.slice(r, r + C), P)
                    } else {
                        var U = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(C)) : new Array(C);
                        if (P === Binary$1.SUBTYPE_BYTE_ARRAY) {
                            if ((C = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                            if (M - 4 < C) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                            if (C < M - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                        }
                        for (S = 0; S < C; S++) U[S] = t[r + S];
                        g[m] = h && d ? U : new Binary$1(U, P)
                    }
                    r += C
                } else if (b === BSON.BSON_DATA_REGEXP && !1 === l) {
                    for (S = r; 0 !== t[S] && S < Buffer$4.byteLength(t);) S++;
                    if (S >= Buffer$4.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    var F = t.toString("utf8", r, S);
                    for (S = r = S + 1; 0 !== t[S] && S < Buffer$4.byteLength(t);) S++;
                    if (S >= Buffer$4.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    var j = t.toString("utf8", r, S);
                    r = S + 1;
                    var k = new Array(j.length);
                    for (S = 0; S < j.length; S++) switch (j[S]) {
                        case "m":
                            k[S] = "m";
                            break;
                        case "s":
                            k[S] = "g";
                            break;
                        case "i":
                            k[S] = "i"
                    }
                    g[m] = new RegExp(F, k.join(""))
                } else if (b === BSON.BSON_DATA_REGEXP && !0 === l) {
                    for (S = r; 0 !== t[S] && S < Buffer$4.byteLength(t);) S++;
                    if (S >= Buffer$4.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    for (F = t.toString("utf8", r, S), S = r = S + 1; 0 !== t[S] && S < Buffer$4.byteLength(t);) S++;
                    if (S >= Buffer$4.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    j = t.toString("utf8", r, S), r = S + 1, g[m] = new BSONRegExp$1(F, j)
                } else if (b === BSON.BSON_DATA_SYMBOL) {
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    g[m] = t.toString("utf8", r, r + N - 1), r += N
                } else if (b === BSON.BSON_DATA_TIMESTAMP) O = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24, A = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24, g[m] = new Timestamp$1(O, A);
                else if (b === BSON.BSON_DATA_MIN_KEY) g[m] = new MinKey$1;
                else if (b === BSON.BSON_DATA_MAX_KEY) g[m] = new MaxKey$1;
                else if (b === BSON.BSON_DATA_CODE) {
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    var z = t.toString("utf8", r, r + N - 1);
                    if (o)
                        if (s) {
                            var K = u ? a(z) : z;
                            g[m] = isolateEvalWithHash(functionCache, K, z, g)
                        } else g[m] = isolateEval(z);
                        else g[m] = new Code$1(z);
                    r += N
                } else if (b === BSON.BSON_DATA_CODE_W_SCOPE) {
                    var Y = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    if (Y < 13) throw new Error("code_w_scope total size shorter minimum expected length");
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    z = t.toString("utf8", r, r + N - 1), w = t[v = r += N] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24;
                    var W = e(t, v, n, !1);
                    if (r += w, Y < 8 + w + N) throw new Error("code_w_scope total size is to short, truncating scope");
                    if (8 + w + N < Y) throw new Error("code_w_scope total size is to long, clips outer document");
                    o ? (s ? (K = u ? a(z) : z, g[m] = isolateEvalWithHash(functionCache, K, z, g)) : g[m] = isolateEval(z), g[m].scope = W) : g[m] = new Code$1(z, W)
                } else {
                    if (b !== BSON.BSON_DATA_DBPOINTER) throw new Error("Detected unknown BSON type " + b.toString(16) + ' for fieldname "' + m + '", are you using the latest BSON parser?');
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    var q = t.toString("utf8", r, r + N - 1);
                    r += N;
                    var J = new Buffer$4(12);
                    for (t.copy(J, 0, r, r + 12), B = new ObjectID$1(J), r += 12, S = 0; S < q.length; S++)
                        if (65533 === q.charCodeAt(S)) throw new Error("Invalid UTF-8 string in BSON document");
                    g[m] = new DBRef$1(q, B)
                }
            }
            if (_ !== r - y) {
                if (i) throw new Error("corrupt array bson");
                throw new Error("corrupt object bson")
            }
            var X = Object.keys(g).filter(function(e) {
                return e.startsWith("$")
            }),
                Z = !0;
            if (X.forEach(function(e) {
                -1 === ["$ref", "$id", "$db"].indexOf(e) && (Z = !1)
            }), !Z) return g;
            if (null != g.$id && null != g.$ref) {
                var V = Object.assign({}, g);
                return delete V.$ref, delete V.$id, delete V.$db, new DBRef$1(g.$ref, g.$id, g.$db || null, V)
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
    var JS_INT_MAX_LONG = Long$1.fromNumber(9007199254740992),
        JS_INT_MIN_LONG = Long$1.fromNumber(-9007199254740992),
        deserializer = deserialize,
        readIEEE754 = function(e, t, r, n, i) {
            var o, s, u = "big" === r,
                a = 8 * i - n - 1,
                f = (1 << a) - 1,
                c = f >> 1,
                l = -7,
                h = u ? 0 : i - 1,
                p = u ? 1 : -1,
                d = e[t + h];
            for (h += p, o = d & (1 << -l) - 1, d >>= -l, l += a; 0 < l; o = 256 * o + e[t + h], h += p, l -= 8);
            for (s = o & (1 << -l) - 1, o >>= -l, l += n; 0 < l; s = 256 * s + e[t + h], h += p, l -= 8);
            if (0 === o) o = 1 - c;
            else {
                if (o === f) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                s += Math.pow(2, n), o -= c
            }
            return (d ? -1 : 1) * s * Math.pow(2, o - n)
        }, writeIEEE754 = function(e, t, r, n, i, o) {
            var s, u, a, f = "big" === n,
                c = 8 * o - i - 1,
                l = (1 << c) - 1,
                h = l >> 1,
                p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = f ? o - 1 : 0,
                y = f ? -1 : 1,
                _ = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + h ? p / a : p * Math.pow(2, 1 - h)) * a && (s++, a /= 2), l <= s + h ? (u = 0, s = l) : 1 <= s + h ? (u = (t * a - 1) * Math.pow(2, i), s += h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)), isNaN(t) && (u = 0); 8 <= i;) e[r + d] = 255 & u, d += y, u /= 256, i -= 8;
            for (s = s << i | u, isNaN(t) && (s += 8), c += i; 0 < c;) e[r + d] = 255 & s, d += y, s /= 256, c -= 8;
            e[r + d - y] |= 128 * _
        }, readIEEE754_1 = readIEEE754,
        writeIEEE754_1 = writeIEEE754,
        float_parser = {
            readIEEE754: readIEEE754_1,
            writeIEEE754: writeIEEE754_1
        };

    function normalizedFunctionString(e) {
        return e.toString().replace(/function(.*)\(/, "function (")
    }
    var utils = {
        normalizedFunctionString: normalizedFunctionString
    }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Buffer$5 = buffer.Buffer,
        writeIEEE754$1 = float_parser.writeIEEE754,
        Long$2 = long_1.Long,
        MinKey$2 = min_key.MinKey,
        Binary$2 = binary.Binary,
        normalizedFunctionString$1 = utils.normalizedFunctionString,
        regexp$1 = /\x00/,
        isDate = function(e) {
            return "object" === (void 0 === e ? "undefined" : _typeof(e)) && "[object Date]" === Object.prototype.toString.call(e)
        }, isRegExp = function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        }, serializeString = function(e, t, r, n, i) {
            e[n++] = BSON$1.BSON_DATA_STRING;
            var o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
            e[(n = n + o + 1) - 1] = 0;
            var s = e.write(r, n + 4, "utf8");
            return e[n + 3] = s + 1 >> 24 & 255, e[n + 2] = s + 1 >> 16 & 255, e[n + 1] = s + 1 >> 8 & 255, e[n] = s + 1 & 255, n = n + 4 + s, e[n++] = 0, n
        }, serializeNumber = function(e, t, r, n, i) {
            if (Math.floor(r) === r && r >= BSON$1.JS_INT_MIN && r <= BSON$1.JS_INT_MAX)
                if (r >= BSON$1.BSON_INT32_MIN && r <= BSON$1.BSON_INT32_MAX) {
                    e[n++] = BSON$1.BSON_DATA_INT;
                    var o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
                    n += o, e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255
                } else if (r >= BSON$1.JS_INT_MIN && r <= BSON$1.JS_INT_MAX) e[n++] = BSON$1.BSON_DATA_NUMBER, n += o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r, n, "little", 52, 8), n += 8;
            else {
                e[n++] = BSON$1.BSON_DATA_LONG, n += o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
                var s = Long$2.fromNumber(r),
                    u = s.getLowBits(),
                    a = s.getHighBits();
                e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255, e[n++] = 255 & a, e[n++] = a >> 8 & 255, e[n++] = a >> 16 & 255, e[n++] = a >> 24 & 255
            } else e[n++] = BSON$1.BSON_DATA_NUMBER, n += o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r, n, "little", 52, 8), n += 8;
            return n
        }, serializeNull = function(e, t, r, n, i) {
            return e[n++] = BSON$1.BSON_DATA_NULL, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
        }, serializeBoolean = function(e, t, r, n, i) {
            return e[n++] = BSON$1.BSON_DATA_BOOLEAN, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = r ? 1 : 0, n
        }, serializeDate = function(e, t, r, n, i) {
            e[n++] = BSON$1.BSON_DATA_DATE, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = Long$2.fromNumber(r.getTime()),
                s = o.getLowBits(),
                u = o.getHighBits();
            return e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255, n
        }, serializeRegExp = function(e, t, r, n, i) {
            if (e[n++] = BSON$1.BSON_DATA_REGEXP, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.source && null != r.source.match(regexp$1)) throw Error("value " + r.source + " must not contain null bytes");
            return n += e.write(r.source, n, "utf8"), e[n++] = 0, r.ignoreCase && (e[n++] = 105), r.global && (e[n++] = 115), r.multiline && (e[n++] = 109), e[n++] = 0, n
        }, serializeBSONRegExp = function(e, t, r, n, i) {
            if (e[n++] = BSON$1.BSON_DATA_REGEXP, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, null != r.pattern.match(regexp$1)) throw Error("pattern " + r.pattern + " must not contain null bytes");
            return n += e.write(r.pattern, n, "utf8"), e[n++] = 0, n += e.write(r.options.split("").sort().join(""), n, "utf8"), e[n++] = 0, n
        }, serializeMinMax = function(e, t, r, n, i) {
            return e[n++] = null === r ? BSON$1.BSON_DATA_NULL : r instanceof MinKey$2 ? BSON$1.BSON_DATA_MIN_KEY : BSON$1.BSON_DATA_MAX_KEY, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
        }, serializeObjectId = function(e, t, r, n, i) {
            if (e[n++] = BSON$1.BSON_DATA_OID, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, "string" == typeof r.id) e.write(r.id, n, "binary");
            else {
                if (!r.id || !r.id.copy) throw new TypeError("object [" + JSON.stringify(r) + "] is not a valid ObjectId");
                r.id.copy(e, n, 0, 12)
            }
            return n + 12
        }, serializeBuffer = function(e, t, r, n, i) {
            e[n++] = BSON$1.BSON_DATA_BINARY, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = r.length;
            return e[n++] = 255 & o, e[n++] = o >> 8 & 255, e[n++] = o >> 16 & 255, e[n++] = o >> 24 & 255, e[n++] = BSON$1.BSON_BINARY_SUBTYPE_DEFAULT, r.copy(e, n, 0, o), n += o
        }, serializeObject = function(e, t, r, n, i, o, s, u, a, f) {
            for (var c = 0; c < f.length; c++)
                if (f[c] === r) throw new Error("cyclic dependency detected");
            f.push(r), e[n++] = Array.isArray(r) ? BSON$1.BSON_DATA_ARRAY : BSON$1.BSON_DATA_OBJECT, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var l = serializeInto(e, r, i, n, o + 1, s, u, f);
            return f.pop(), l
        }, serializeDecimal128 = function(e, t, r, n, i) {
            return e[n++] = BSON$1.BSON_DATA_DECIMAL128, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.bytes.copy(e, n, 0, 16), n + 16
        }, serializeLong = function(e, t, r, n, i) {
            e[n++] = "Long" === r._bsontype ? BSON$1.BSON_DATA_LONG : BSON$1.BSON_DATA_TIMESTAMP, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = r.getLowBits(),
                s = r.getHighBits();
            return e[n++] = 255 & o, e[n++] = o >> 8 & 255, e[n++] = o >> 16 & 255, e[n++] = o >> 24 & 255, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, n
        }, serializeInt32 = function(e, t, r, n, i) {
            return e[n++] = BSON$1.BSON_DATA_INT, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255, n
        }, serializeDouble = function(e, t, r, n, i) {
            return e[n++] = BSON$1.BSON_DATA_NUMBER, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r.value, n, "little", 52, 8), n += 8
        }, serializeFunction = function(e, t, r, n, i, o, s) {
            e[n++] = BSON$1.BSON_DATA_CODE, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var u = normalizedFunctionString$1(r),
                a = e.write(u, n + 4, "utf8") + 1;
            return e[n] = 255 & a, e[n + 1] = a >> 8 & 255, e[n + 2] = a >> 16 & 255, e[n + 3] = a >> 24 & 255, n = n + 4 + a - 1, e[n++] = 0, n
        }, serializeCode = function(e, t, r, n, i, o, s, u, a) {
            if (r.scope && "object" === _typeof(r.scope)) {
                e[n++] = BSON$1.BSON_DATA_CODE_W_SCOPE;
                var f = a ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
                n += f, e[n++] = 0;
                var c = n,
                    l = "string" == typeof r.code ? r.code : r.code.toString();
                n += 4;
                var h = e.write(l, n + 4, "utf8") + 1;
                e[n] = 255 & h, e[n + 1] = h >> 8 & 255, e[n + 2] = h >> 16 & 255, e[n + 3] = h >> 24 & 255, e[n + 4 + h - 1] = 0, n = n + h + 4;
                var p = serializeInto(e, r.scope, i, n, o + 1, s, u);
                n = p - 1;
                var d = p - c;
                e[c++] = 255 & d, e[c++] = d >> 8 & 255, e[c++] = d >> 16 & 255, e[c++] = d >> 24 & 255, e[n++] = 0
            } else {
                e[n++] = BSON$1.BSON_DATA_CODE, n += f = a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, l = r.code.toString();
                var y = e.write(l, n + 4, "utf8") + 1;
                e[n] = 255 & y, e[n + 1] = y >> 8 & 255, e[n + 2] = y >> 16 & 255, e[n + 3] = y >> 24 & 255, n = n + 4 + y - 1, e[n++] = 0
            }
            return n
        }, serializeBinary = function(e, t, r, n, i) {
            e[n++] = BSON$1.BSON_DATA_BINARY, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = r.value(!0),
                s = r.position;
            return r.sub_type === Binary$2.SUBTYPE_BYTE_ARRAY && (s += 4), e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = r.sub_type, r.sub_type === Binary$2.SUBTYPE_BYTE_ARRAY && (s -= 4, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255), o.copy(e, n, 0, r.position), n += r.position
        }, serializeSymbol = function(e, t, r, n, i) {
            e[n++] = BSON$1.BSON_DATA_SYMBOL, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = e.write(r.value, n + 4, "utf8") + 1;
            return e[n] = 255 & o, e[n + 1] = o >> 8 & 255, e[n + 2] = o >> 16 & 255, e[n + 3] = o >> 24 & 255, n = n + 4 + o - 1, e[n++] = 0, n
        }, serializeDBRef = function(e, t, r, n, i, o, s) {
            e[n++] = BSON$1.BSON_DATA_OBJECT, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var u, a = n,
                f = {
                    $ref: r.collection,
                    $id: r.oid
                };
            null != r.db && (f.$db = r.db), f = Object.assign(f, r.fields);
            var c = (u = serializeInto(e, f, !1, n, i + 1, o)) - a;
            return e[a++] = 255 & c, e[a++] = c >> 8 & 255, e[a++] = c >> 16 & 255, e[a++] = c >> 24 & 255, u
        }, serializeInto = function(e, t, r, n, i, o, s, u) {
            n = n || 0, (u = u || []).push(t);
            var a = n + 4;
            if (Array.isArray(t))
                for (var f = 0; f < t.length; f++) {
                    var c = "" + f,
                        l = t[f];
                    if (l && l.toBSON) {
                        if ("function" != typeof l.toBSON) throw new TypeError("toBSON is not a function");
                        l = l.toBSON()
                    }
                    var h = void 0 === l ? "undefined" : _typeof(l);
                    "string" === h ? a = serializeString(e, c, l, a, !0) : "number" === h ? a = serializeNumber(e, c, l, a, !0) : "boolean" === h ? a = serializeBoolean(e, c, l, a, !0) : l instanceof Date || isDate(l) ? a = serializeDate(e, c, l, a, !0) : void 0 === l ? a = serializeNull(e, c, l, a, !0) : null === l ? a = serializeNull(e, c, l, a, !0) : "ObjectID" === l._bsontype ? a = serializeObjectId(e, c, l, a, !0) : Buffer$5.isBuffer(l) ? a = serializeBuffer(e, c, l, a, !0) : l instanceof RegExp || isRegExp(l) ? a = serializeRegExp(e, c, l, a, !0) : "object" === h && null == l._bsontype ? a = serializeObject(e, c, l, a, r, i, o, s, !0, u) : "object" === h && "Decimal128" === l._bsontype ? a = serializeDecimal128(e, c, l, a, !0) : "Long" === l._bsontype || "Timestamp" === l._bsontype ? a = serializeLong(e, c, l, a, !0) : "Double" === l._bsontype ? a = serializeDouble(e, c, l, a, !0) : "function" == typeof l && o ? a = serializeFunction(e, c, l, a, r, i, o, !0) : "Code" === l._bsontype ? a = serializeCode(e, c, l, a, r, i, o, s, !0) : "Binary" === l._bsontype ? a = serializeBinary(e, c, l, a, !0) : "Symbol" === l._bsontype ? a = serializeSymbol(e, c, l, a, !0) : "DBRef" === l._bsontype ? a = serializeDBRef(e, c, l, a, i, o, !0) : "BSONRegExp" === l._bsontype ? a = serializeBSONRegExp(e, c, l, a, !0) : "Int32" === l._bsontype ? a = serializeInt32(e, c, l, a, !0) : "MinKey" !== l._bsontype && "MaxKey" !== l._bsontype || (a = serializeMinMax(e, c, l, a, !0))
                } else if (t instanceof map)
                    for (var p = t.entries(), d = !1; !d;) {
                        var y = p.next();
                        if (!(d = y.done)) {
                            if (c = y.value[0], h = void 0 === (l = y.value[1]) ? "undefined" : _typeof(l), "$db" !== c && "$ref" !== c && "$id" !== c) {
                                if (null != c.match(regexp$1)) throw Error("key " + c + " must not contain null bytes");
                                if (r) {
                                    if ("$" === c[0]) throw Error("key " + c + " must not start with '$'");
                                    if (~c.indexOf(".")) throw Error("key " + c + " must not contain '.'")
                                }
                            }
                            "string" === h ? a = serializeString(e, c, l, a) : "number" === h ? a = serializeNumber(e, c, l, a) : "boolean" === h ? a = serializeBoolean(e, c, l, a) : l instanceof Date || isDate(l) ? a = serializeDate(e, c, l, a) : null === l || void 0 === l && !1 === s ? a = serializeNull(e, c, l, a) : "ObjectID" === l._bsontype ? a = serializeObjectId(e, c, l, a) : Buffer$5.isBuffer(l) ? a = serializeBuffer(e, c, l, a) : l instanceof RegExp || isRegExp(l) ? a = serializeRegExp(e, c, l, a) : "object" === h && null == l._bsontype ? a = serializeObject(e, c, l, a, r, i, o, s, !1, u) : "object" === h && "Decimal128" === l._bsontype ? a = serializeDecimal128(e, c, l, a) : "Long" === l._bsontype || "Timestamp" === l._bsontype ? a = serializeLong(e, c, l, a) : "Double" === l._bsontype ? a = serializeDouble(e, c, l, a) : "Code" === l._bsontype ? a = serializeCode(e, c, l, a, r, i, o, s) : "function" == typeof l && o ? a = serializeFunction(e, c, l, a, r, i, o) : "Binary" === l._bsontype ? a = serializeBinary(e, c, l, a) : "Symbol" === l._bsontype ? a = serializeSymbol(e, c, l, a) : "DBRef" === l._bsontype ? a = serializeDBRef(e, c, l, a, i, o) : "BSONRegExp" === l._bsontype ? a = serializeBSONRegExp(e, c, l, a) : "Int32" === l._bsontype ? a = serializeInt32(e, c, l, a) : "MinKey" !== l._bsontype && "MaxKey" !== l._bsontype || (a = serializeMinMax(e, c, l, a))
                        }
                    } else {
                        if (t.toBSON) {
                            if ("function" != typeof t.toBSON) throw new TypeError("toBSON is not a function");
                            if (null != (t = t.toBSON()) && "object" !== (void 0 === t ? "undefined" : _typeof(t))) throw new TypeError("toBSON function did not return an object")
                        }
                        for (c in t) {
                            if ((l = t[c]) && l.toBSON) {
                                if ("function" != typeof l.toBSON) throw new TypeError("toBSON is not a function");
                                l = l.toBSON()
                            }
                            if (h = void 0 === l ? "undefined" : _typeof(l), "$db" !== c && "$ref" !== c && "$id" !== c) {
                                if (null != c.match(regexp$1)) throw Error("key " + c + " must not contain null bytes");
                                if (r) {
                                    if ("$" === c[0]) throw Error("key " + c + " must not start with '$'");
                                    if (~c.indexOf(".")) throw Error("key " + c + " must not contain '.'")
                                }
                            }
                            "string" === h ? a = serializeString(e, c, l, a) : "number" === h ? a = serializeNumber(e, c, l, a) : "boolean" === h ? a = serializeBoolean(e, c, l, a) : l instanceof Date || isDate(l) ? a = serializeDate(e, c, l, a) : void 0 === l ? !1 === s && (a = serializeNull(e, c, l, a)) : null === l ? a = serializeNull(e, c, l, a) : "ObjectID" === l._bsontype ? a = serializeObjectId(e, c, l, a) : Buffer$5.isBuffer(l) ? a = serializeBuffer(e, c, l, a) : l instanceof RegExp || isRegExp(l) ? a = serializeRegExp(e, c, l, a) : "object" === h && null == l._bsontype ? a = serializeObject(e, c, l, a, r, i, o, s, !1, u) : "object" === h && "Decimal128" === l._bsontype ? a = serializeDecimal128(e, c, l, a) : "Long" === l._bsontype || "Timestamp" === l._bsontype ? a = serializeLong(e, c, l, a) : "Double" === l._bsontype ? a = serializeDouble(e, c, l, a) : "Code" === l._bsontype ? a = serializeCode(e, c, l, a, r, i, o, s) : "function" == typeof l && o ? a = serializeFunction(e, c, l, a, r, i, o) : "Binary" === l._bsontype ? a = serializeBinary(e, c, l, a) : "Symbol" === l._bsontype ? a = serializeSymbol(e, c, l, a) : "DBRef" === l._bsontype ? a = serializeDBRef(e, c, l, a, i, o) : "BSONRegExp" === l._bsontype ? a = serializeBSONRegExp(e, c, l, a) : "Int32" === l._bsontype ? a = serializeInt32(e, c, l, a) : "MinKey" !== l._bsontype && "MaxKey" !== l._bsontype || (a = serializeMinMax(e, c, l, a))
                        }
                    }
                u.pop(), e[a++] = 0;
            var _ = a - n;
            return e[n++] = 255 & _, e[n++] = _ >> 8 & 255, e[n++] = _ >> 16 & 255, e[n++] = _ >> 24 & 255, a
        }, BSON$1 = {
            BSON_DATA_NUMBER: 1,
            BSON_DATA_STRING: 2,
            BSON_DATA_OBJECT: 3,
            BSON_DATA_ARRAY: 4,
            BSON_DATA_BINARY: 5,
            BSON_DATA_UNDEFINED: 6,
            BSON_DATA_OID: 7,
            BSON_DATA_BOOLEAN: 8,
            BSON_DATA_DATE: 9,
            BSON_DATA_NULL: 10,
            BSON_DATA_REGEXP: 11,
            BSON_DATA_CODE: 13,
            BSON_DATA_SYMBOL: 14,
            BSON_DATA_CODE_W_SCOPE: 15,
            BSON_DATA_INT: 16,
            BSON_DATA_TIMESTAMP: 17,
            BSON_DATA_LONG: 18,
            BSON_DATA_DECIMAL128: 19,
            BSON_DATA_MIN_KEY: 255,
            BSON_DATA_MAX_KEY: 127,
            BSON_BINARY_SUBTYPE_DEFAULT: 0,
            BSON_BINARY_SUBTYPE_FUNCTION: 1,
            BSON_BINARY_SUBTYPE_BYTE_ARRAY: 2,
            BSON_BINARY_SUBTYPE_UUID: 3,
            BSON_BINARY_SUBTYPE_MD5: 4,
            BSON_BINARY_SUBTYPE_USER_DEFINED: 128,
            BSON_INT32_MAX: 2147483647,
            BSON_INT32_MIN: -2147483648
        };
    BSON$1.BSON_INT64_MAX = Math.pow(2, 63) - 1, BSON$1.BSON_INT64_MIN = -Math.pow(2, 63), BSON$1.JS_INT_MAX = 9007199254740992, BSON$1.JS_INT_MIN = -9007199254740992;
    var serializer = serializeInto,
        Buffer$6 = buffer.Buffer,
        Long$3 = long_1.Long,
        Double$2 = double_1.Double,
        Timestamp$2 = timestamp.Timestamp,
        ObjectID$2 = objectid.ObjectID,
        _Symbol$1 = symbol.Symbol,
        BSONRegExp$2 = regexp.BSONRegExp,
        Code$2 = code$1.Code,
        MinKey$3 = min_key.MinKey,
        MaxKey$2 = max_key.MaxKey,
        DBRef$2 = db_ref.DBRef,
        Binary$3 = binary.Binary,
        normalizedFunctionString$2 = utils.normalizedFunctionString,
        isDate$1 = function(e) {
            return "object" === (void 0 === e ? "undefined" : _typeof(e)) && "[object Date]" === Object.prototype.toString.call(e)
        }, calculateObjectSize = function(e, t, r) {
            var n = 5;
            if (Array.isArray(e))
                for (var i = 0; i < e.length; i++) n += calculateElement(i.toString(), e[i], t, !0, r);
            else
                for (var o in e.toBSON && (e = e.toBSON()), e) n += calculateElement(o, e[o], t, !1, r);
            return n
        };

    function calculateElement(e, t, r, n, i) {
        switch (t && t.toBSON && (t = t.toBSON()), void 0 === t ? "undefined" : _typeof(t)) {
            case "string":
                return 1 + Buffer$6.byteLength(e, "utf8") + 1 + 4 + Buffer$6.byteLength(t, "utf8") + 1;
            case "number":
                return Math.floor(t) === t && t >= BSON$2.JS_INT_MIN && t <= BSON$2.JS_INT_MAX && t >= BSON$2.BSON_INT32_MIN && t <= BSON$2.BSON_INT32_MAX ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 5 : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
            case "undefined":
                return n || !i ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 : 0;
            case "boolean":
                return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 2;
            case "object":
                if (null == t || t instanceof MinKey$3 || t instanceof MaxKey$2 || "MinKey" === t._bsontype || "MaxKey" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1;
                if (t instanceof ObjectID$2 || "ObjectID" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 13;
                if (t instanceof Date || isDate$1(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
                if (void 0 !== Buffer$6 && Buffer$6.isBuffer(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 6 + t.length;
                if (t instanceof Long$3 || t instanceof Double$2 || t instanceof Timestamp$2 || "Long" === t._bsontype || "Double" === t._bsontype || "Timestamp" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
                if (t instanceof decimal128 || "Decimal128" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 17;
                if (t instanceof Code$2 || "Code" === t._bsontype) return null != t.scope && 0 < Object.keys(t.scope).length ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(t.code.toString(), "utf8") + 1 + calculateObjectSize(t.scope, r, i) : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6.byteLength(t.code.toString(), "utf8") + 1;
                if (t instanceof Binary$3 || "Binary" === t._bsontype) return t.sub_type === Binary$3.SUBTYPE_BYTE_ARRAY ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1 + 4) : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1);
                if (t instanceof _Symbol$1 || "Symbol" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + Buffer$6.byteLength(t.value, "utf8") + 4 + 1 + 1;
                if (t instanceof DBRef$2 || "DBRef" === t._bsontype) {
                    var o = {
                        $ref: t.collection,
                        $id: t.oid
                    };
                    return null != t.db && (o.$db = t.db), o = Object.assign(o, t.fields), (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + calculateObjectSize(o, r, i)
                }
                return t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1 : t instanceof BSONRegExp$2 || "BSONRegExp" === t._bsontype ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.pattern, "utf8") + 1 + Buffer$6.byteLength(t.options, "utf8") + 1 : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + calculateObjectSize(t, r, i) + 1;
            case "function":
                if (t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) || "[object RegExp]" === String.call(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1;
                if (r && null != t.scope && 0 < Object.keys(t.scope).length) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(t), "utf8") + 1 + calculateObjectSize(t.scope, r, i);
                if (r) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(t), "utf8") + 1
        }
        return 0
    }
    var BSON$2 = {
        BSON_INT32_MAX: 2147483647,
        BSON_INT32_MIN: -2147483648,
        JS_INT_MAX: 9007199254740992,
        JS_INT_MIN: -9007199254740992
    }, calculate_size = calculateObjectSize,
        Buffer$7 = buffer.Buffer,
        ensure_buffer = function(e) {
            if (e instanceof Buffer$7) return e;
            if (e instanceof Uint8Array) return new Buffer$7(e.buffer);
            throw new TypeError("Must use either Buffer or Uint8Array")
        }, Buffer$8 = buffer.Buffer,
        MAXSIZE = 17825792,
        buffer$1 = new Buffer$8(MAXSIZE),
        BSON$3 = function() {};
    BSON$3.prototype.serialize = function(e, t) {
        var r = "boolean" == typeof(t = t || {}).checkKeys && t.checkKeys,
            n = "boolean" == typeof t.serializeFunctions && t.serializeFunctions,
            i = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined,
            o = "number" == typeof t.minInternalBufferSize ? t.minInternalBufferSize : MAXSIZE;
        buffer$1.length < o && (buffer$1 = new Buffer$8(o));
        var s = serializer(buffer$1, e, r, 0, 0, n, i, []),
            u = new Buffer$8(s);
        return buffer$1.copy(u, 0, 0, u.length), u
    }, BSON$3.prototype.serializeWithBufferAndIndex = function(e, t, r) {
        var n = "boolean" == typeof(r = r || {}).checkKeys && r.checkKeys,
            i = "boolean" == typeof r.serializeFunctions && r.serializeFunctions,
            o = "boolean" != typeof r.ignoreUndefined || r.ignoreUndefined,
            s = "number" == typeof r.index ? r.index : 0,
            u = serializer(buffer$1, e, n, 0, 0, i, o);
        return t = ensure_buffer(t), buffer$1.copy(t, s, 0, u), s + u - 1
    }, BSON$3.prototype.deserialize = function(e, t) {
        return e = ensure_buffer(e), deserializer(e, t)
    }, BSON$3.prototype.calculateObjectSize = function(e, t) {
        var r = "boolean" == typeof(t = t || {}).serializeFunctions && t.serializeFunctions,
            n = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined;
        return calculate_size(e, r, n)
    }, BSON$3.prototype.deserializeStream = function(e, t, r, n, i, o) {
        o = Object.assign({
            allowObjectSmallerThanBufferSize: !0
        }, o), e = ensure_buffer(e);
        for (var s = t, u = 0; u < r; u++) {
            var a = e[s] | e[s + 1] << 8 | e[s + 2] << 16 | e[s + 3] << 24;
            o.index = s, n[i + u] = this.deserialize(e, o), s += a
        }
        return s
    }, BSON$3.BSON_INT32_MAX = 2147483647, BSON$3.BSON_INT32_MIN = -2147483648, BSON$3.BSON_INT64_MAX = Math.pow(2, 63) - 1, BSON$3.BSON_INT64_MIN = -Math.pow(2, 63), BSON$3.JS_INT_MAX = 9007199254740992, BSON$3.JS_INT_MIN = -9007199254740992, BSON$3.BSON_DATA_NUMBER = 1, BSON$3.BSON_DATA_STRING = 2, BSON$3.BSON_DATA_OBJECT = 3, BSON$3.BSON_DATA_ARRAY = 4, BSON$3.BSON_DATA_BINARY = 5, BSON$3.BSON_DATA_OID = 7, BSON$3.BSON_DATA_BOOLEAN = 8, BSON$3.BSON_DATA_DATE = 9, BSON$3.BSON_DATA_NULL = 10, BSON$3.BSON_DATA_REGEXP = 11, BSON$3.BSON_DATA_CODE = 13, BSON$3.BSON_DATA_SYMBOL = 14, BSON$3.BSON_DATA_CODE_W_SCOPE = 15, BSON$3.BSON_DATA_INT = 16, BSON$3.BSON_DATA_TIMESTAMP = 17, BSON$3.BSON_DATA_LONG = 18, BSON$3.BSON_DATA_MIN_KEY = 255, BSON$3.BSON_DATA_MAX_KEY = 127, BSON$3.BSON_BINARY_SUBTYPE_DEFAULT = 0, BSON$3.BSON_BINARY_SUBTYPE_FUNCTION = 1, BSON$3.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2, BSON$3.BSON_BINARY_SUBTYPE_UUID = 3, BSON$3.BSON_BINARY_SUBTYPE_MD5 = 4, BSON$3.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;
    var bson = BSON$3,
        Code_1$1 = code$1,
        Map_1 = map,
        Symbol_1$1 = symbol,
        BSON_1 = BSON$3,
        DBRef_1$1 = db_ref,
        Binary_1$1 = binary,
        ObjectId$1 = objectid,
        ObjectID_1$1 = objectid,
        Long_1$1 = long_1,
        Timestamp_1$1 = timestamp,
        Double_1$1 = double_1,
        Int32_1$1 = int_32,
        MinKey_1$1 = min_key,
        MaxKey_1$1 = max_key,
        BSONRegExp_1$1 = regexp,
        Decimal128_1$1 = decimal128;
    bson.Code = Code_1$1, bson.Map = Map_1, bson.Symbol = Symbol_1$1, bson.BSON = BSON_1, bson.DBRef = DBRef_1$1, bson.Binary = Binary_1$1, bson.ObjectId = ObjectId$1, bson.ObjectID = ObjectID_1$1, bson.Long = Long_1$1, bson.Timestamp = Timestamp_1$1, bson.Double = Double_1$1, bson.Int32 = Int32_1$1, bson.MinKey = MinKey_1$1, bson.MaxKey = MaxKey_1$1, bson.BSONRegExp = BSONRegExp_1$1, bson.Decimal128 = Decimal128_1$1;
    var jsBson = bson,
        Buffer$9 = buffer.Buffer;

    function convert(e) {
        var t = Number(e).toString(16);
        return 1 === t.length ? "0" + t : t
    }

    function toExtendedJSON(e) {
        return {
            $binary: {
                base64: Buffer$9.isBuffer(e.buffer) ? e.buffer.toString("base64") : Buffer$9.from(e.buffer).toString("base64"),
                subType: convert(e.sub_type)
            }
        }
    }

    function fromExtendedJSON(e, t) {
        var r = t.$binary.subType ? parseInt(t.$binary.subType, 16) : 0,
            n = new Buffer$9(t.$binary.base64, "base64");
        return new e.Binary(n, r)
    }
    var binary$1 = {
        toExtendedJSON: toExtendedJSON,
        fromExtendedJSON: fromExtendedJSON
    };

    function toExtendedJSON$1(e) {
        return e.scope ? {
            $code: e.code,
            $scope: e.scope
        } : {
            $code: e.code
        }
    }

    function fromExtendedJSON$1(e, t) {
        return new e.Code(t.$code, t.$scope)
    }
    var code$2 = {
        toExtendedJSON: toExtendedJSON$1,
        fromExtendedJSON: fromExtendedJSON$1
    };

    function toExtendedJSON$2(e) {
        var t = {
            $ref: e.collection,
            $id: e.oid
        };
        return e.db && (t.$db = e.db), t = Object.assign(t, e.fields)
    }

    function fromExtendedJSON$2(e, t) {
        var r = Object.assign({}, t);
        return ["$ref", "$id", "$db"].forEach(function(e) {
            return delete r[e]
        }), new e.DBRef(t.$ref, t.$id, t.$db, r)
    }
    var db_ref$1 = {
        toExtendedJSON: toExtendedJSON$2,
        fromExtendedJSON: fromExtendedJSON$2
    };

    function toExtendedJSON$3(e) {
        return {
            $numberDecimal: e.toString()
        }
    }

    function fromExtendedJSON$3(e, t) {
        return new e.Decimal128.fromString(t.$numberDecimal)
    }
    var decimal128$1 = {
        toExtendedJSON: toExtendedJSON$3,
        fromExtendedJSON: fromExtendedJSON$3
    };

    function toExtendedJSON$4(e, t) {
        return t && t.relaxed && isFinite(e.value) ? e.value : {
            $numberDouble: e.value.toString()
        }
    }

    function fromExtendedJSON$4(e, t, r) {
        return r && r.relaxed ? parseFloat(t.$numberDouble) : new e.Double(parseFloat(t.$numberDouble))
    }
    var double_1$1 = {
        toExtendedJSON: toExtendedJSON$4,
        fromExtendedJSON: fromExtendedJSON$4
    };

    function toExtendedJSON$5(e, t) {
        return t && t.relaxed ? e.value : {
            $numberInt: e.value.toString()
        }
    }

    function fromExtendedJSON$5(e, t, r) {
        return r && r.relaxed ? parseInt(t.$numberInt, 10) : new e.Int32(t.$numberInt)
    }
    var int_32$1 = {
        toExtendedJSON: toExtendedJSON$5,
        fromExtendedJSON: fromExtendedJSON$5
    };

    function toExtendedJSON$6(e, t) {
        return t && t.relaxed ? e.toNumber() : {
            $numberLong: e.toString()
        }
    }

    function fromExtendedJSON$6(e, t, r) {
        var n = e.Long.fromString(t.$numberLong);
        return r && r.relaxed ? n.toNumber() : n
    }
    var long_1$1 = {
        toExtendedJSON: toExtendedJSON$6,
        fromExtendedJSON: fromExtendedJSON$6
    };

    function toExtendedJSON$7() {
        return {
            $maxKey: 1
        }
    }

    function fromExtendedJSON$7(e) {
        return new e.MaxKey
    }
    var max_key$1 = {
        toExtendedJSON: toExtendedJSON$7,
        fromExtendedJSON: fromExtendedJSON$7
    };

    function toExtendedJSON$8() {
        return {
            $minKey: 1
        }
    }

    function fromExtendedJSON$8(e) {
        return new e.MinKey
    }
    var min_key$1 = {
        toExtendedJSON: toExtendedJSON$8,
        fromExtendedJSON: fromExtendedJSON$8
    };

    function toExtendedJSON$9(e) {
        return e.toHexString ? {
            $oid: e.toHexString()
        } : {
            $oid: e.toString("hex")
        }
    }

    function fromExtendedJSON$9(e, t) {
        return new e.ObjectID(t.$oid)
    }
    var objectid$1 = {
        toExtendedJSON: toExtendedJSON$9,
        fromExtendedJSON: fromExtendedJSON$9
    };

    function toExtendedJSON$10(e) {
        return {
            $regularExpression: {
                pattern: e.pattern,
                options: e.options
            }
        }
    }

    function fromExtendedJSON$10(e, t) {
        return new e.BSONRegExp(t.$regularExpression.pattern, t.$regularExpression.options.split("").sort().join(""))
    }
    var regexp$2 = {
        toExtendedJSON: toExtendedJSON$10,
        fromExtendedJSON: fromExtendedJSON$10
    };

    function toExtendedJSON$11(e) {
        return {
            $symbol: e.value
        }
    }

    function fromExtendedJSON$11(e, t) {
        return new e.Symbol(t.$symbol)
    }
    var symbol$1 = {
        toExtendedJSON: toExtendedJSON$11,
        fromExtendedJSON: fromExtendedJSON$11
    };

    function toExtendedJSON$12(e) {
        return {
            $timestamp: {
                t: e.high_,
                i: e.low_
            }
        }
    }

    function fromExtendedJSON$12(e, t) {
        return new e.Timestamp(t.$timestamp.i, t.$timestamp.t)
    }
    var timestamp$1 = {
        toExtendedJSON: toExtendedJSON$12,
        fromExtendedJSON: fromExtendedJSON$12
    }, bson$1 = {
            Binary: binary$1,
            Code: code$2,
            DBRef: db_ref$1,
            Decimal128: decimal128$1,
            Double: double_1$1,
            Int32: int_32$1,
            Long: long_1$1,
            MaxKey: max_key$1,
            MinKey: min_key$1,
            ObjectID: objectid$1,
            BSONRegExp: regexp$2,
            Symbol: symbol$1,
            Timestamp: timestamp$1
        }, _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, BSON$4 = jsBson,
        BSONTypes = ["Binary", "Code", "DBRef", "Decimal128", "Double", "Int32", "Long", "MaxKey", "MinKey", "ObjectID", "BSONRegExp", "Symbol", "Timestamp"];
    setBSONModule(BSON$4);
    var keysToCodecs = {
        $oid: bson$1.ObjectID,
        $binary: bson$1.Binary,
        $symbol: bson$1.Symbol,
        $numberInt: bson$1.Int32,
        $numberDecimal: bson$1.Decimal128,
        $numberDouble: bson$1.Double,
        $numberLong: bson$1.Long,
        $minKey: bson$1.MinKey,
        $maxKey: bson$1.MaxKey,
        $regularExpression: bson$1.BSONRegExp,
        $timestamp: bson$1.Timestamp
    };

    function setBSONModule(t) {
        BSONTypes.forEach(function(e) {
            if (!t[e]) throw new Error("passed in module does not contain all BSON types required")
        }), BSON$4 = t
    }

    function deserializeValue(e, t, r, n) {
        if ("number" == typeof r) {
            if (Math.floor(r) === r) {
                var i = BSON_INT64_MIN <= r && r <= BSON_INT64_MAX;
                if (BSON_INT32_MIN <= r && r <= BSON_INT32_MAX) return n.strict ? new BSON$4.Int32(r) : r;
                if (i) return n.strict ? new BSON$4.Long.fromNumber(r) : r
            }
            return new BSON$4.Double(r)
        }
        if (null == r || "object" !== (void 0 === r ? "undefined" : _typeof$1(r))) return r;
        if (r.$undefined) return null;
        for (var o = Object.keys(r).filter(function(e) {
            return e.startsWith("$") && null != r[e]
        }), s = 0; s < o.length; s++) {
            var u = keysToCodecs[o[s]];
            if (u) return u.fromExtendedJSON(BSON$4, r, n)
        }
        if (null != r.$date) {
            var a = r.$date,
                f = new Date;
            return "string" == typeof a ? f.setTime(Date.parse(a)) : a instanceof BSON$4.Long ? f.setTime(a.toNumber()) : "number" == typeof a && n.relaxed && f.setTime(a), f
        }
        if (null != r.$code) {
            if (r.$scope) var c = deserializeValue(e, null, r.$scope);
            return Object.assign({}, r).$scope = c, bson$1.Code.fromExtendedJSON(BSON$4, r)
        }
        if (null != r.$ref || null != r.$dbPointer) {
            var l = r.$ref ? r : r.$dbPointer;
            if (l instanceof BSON$4.DBRef) return l;
            var h = Object.keys(l).filter(function(e) {
                return e.startsWith("$")
            }),
                p = !0;
            if (h.forEach(function(e) {
                -1 === ["$ref", "$id", "$db"].indexOf(e) && (p = !1)
            }), p) return bson$1.DBRef.fromExtendedJSON(BSON$4, l)
        }
        return r
    }
    var parse = function(e, r) {
        var n = this;
        return "boolean" == typeof(r = r || {
            relaxed: !1
        }).relaxed && (r.strict = !r.relaxed), "boolean" == typeof r.strict && (r.relaxed = !r.strict), JSON.parse(e, function(e, t) {
            return deserializeValue(n, e, t, r)
        })
    }, BSON_INT32_MAX = 2147483647,
        BSON_INT32_MIN = -2147483648,
        BSON_INT64_MAX = 0x8000000000000000,
        BSON_INT64_MIN = -0x8000000000000000,
        stringify = function(e, t, r, n) {
            var i = {};
            null != n && "object" === (void 0 === n ? "undefined" : _typeof$1(n)) ? i = n : null != r && "object" === (void 0 === r ? "undefined" : _typeof$1(r)) ? (i = r, r = 0) : null != t && "object" === (void 0 === t ? "undefined" : _typeof$1(t)) && (i = t, t = null);
            var o = Array.isArray(e) ? serializeArray(e, i) : serializeDocument(e, i);
            return JSON.stringify(o, t, r)
        };

    function serializeArray(e, t) {
        return e.map(function(e) {
            return serializeValue(e, t)
        })
    }

    function getISOString(e) {
        var t = e.toISOString();
        return 0 !== e.getUTCMilliseconds() ? t : t.slice(0, -5) + "Z"
    }

    function serializeValue(e, t) {
        if (Array.isArray(e)) return serializeArray(e, t);
        if (void 0 === e) return null;
        if (e instanceof Date) {
            var r = e.getTime(),
                n = -1 < r && r < 2534023188e5;
            return t.relaxed && n ? {
                $date: getISOString(e)
            } : {
                $date: {
                    $numberLong: e.getTime().toString()
                }
            }
        }
        if ("number" == typeof e && !t.relaxed) {
            if (Math.floor(e) === e) {
                var i = BSON_INT64_MIN <= e && e <= BSON_INT64_MAX;
                if (BSON_INT32_MIN <= e && e <= BSON_INT32_MAX) return {
                    $numberInt: e.toString()
                };
                if (i) return {
                    $numberLong: e.toString()
                }
            }
            return {
                $numberDouble: e.toString()
            }
        }
        return null != e && "object" === (void 0 === e ? "undefined" : _typeof$1(e)) ? serializeDocument(e, t) : e
    }

    function serializeDocument(e, t) {
        if (null == e || "object" !== (void 0 === e ? "undefined" : _typeof$1(e))) throw new Error("not an object instance");
        if (e._bsontype && -1 !== BSONTypes.indexOf(e._bsontype)) {
            if ("Code" === e._bsontype && e.scope) {
                var r = serializeDocument(e.scope, t),
                    n = Object.assign({}, e, {
                        scope: r
                    });
                return bson$1.Code.toExtendedJSON(n, t)
            }
            if ("DBRef" === e._bsontype && e.oid) {
                var i = serializeDocument(e.oid, t),
                    o = Object.assign({}, e, {
                        oid: i
                    });
                return bson$1.DBRef.toExtendedJSON(o, t)
            }
            return bson$1[e._bsontype].toExtendedJSON(e, t)
        }
        var s = {};
        for (var u in e) {
            var a = e[u];
            if (Array.isArray(a)) s[u] = serializeArray(a, t);
            else if (null != a && a._bsontype && -1 !== BSONTypes.indexOf(a._bsontype))
                if ("Code" === a._bsontype && a.scope) {
                    var f = serializeDocument(a.scope, t),
                        c = Object.assign({}, a, {
                            scope: f
                        });
                    s[u] = bson$1.Code.toExtendedJSON(c, t)
                } else if ("DBRef" === a._bsontype && a.oid) {
                var l = serializeDocument(a.oid, t),
                    h = Object.assign({}, a, {
                        oid: l
                    });
                s[u] = bson$1.DBRef.toExtendedJSON(h, t)
            } else s[u] = bson$1[a._bsontype].toExtendedJSON(a, t);
            else a instanceof Date ? s[u] = serializeValue(a, t) : null != a && "object" === (void 0 === a ? "undefined" : _typeof$1(a)) && (s[u] = serializeDocument(a, t)); if (s[u] = serializeValue(a, t), a instanceof RegExp) {
                var p = a.flags;
                void 0 === p && (p = a.toString().match(/[gimuy]*$/)[0]), s[u] = bson$1.BSONRegExp.toExtendedJSON({
                    pattern: a.source,
                    options: p
                })
            }
        }
        return s
    }
    var ext_json = {
        parse: parse,
        stringify: stringify,
        setBSONModule: setBSONModule,
        BSON: BSON$4
    }, mongodbExtjson = {
            parse: ext_json.parse,
            stringify: ext_json.stringify,
            setBSONModule: ext_json.setBSONModule,
            BSON: ext_json.BSON
        }, mongodbExtjson_1 = mongodbExtjson.parse,
        mongodbExtjson_2 = mongodbExtjson.stringify,
        ContentTypes = function() {
            function e() {}
            return e.APPLICATION_JSON = "application/json", e
        }(),
        Headers = function() {
            function t() {}
            return t.getAuthorizationBearer = function(e) {
                return t.AUTHORIZATION_BEARER + " " + e
            }, t.CONTENT_TYPE = (t.CONTENT_TYPE_CANON = "Content-Type").toLocaleLowerCase(), t.AUTHORIZATION = (t.AUTHORIZATION_CANON = "Authorization").toLocaleLowerCase(), t.AUTHORIZATION_BEARER = "Bearer", t
        }(),
        __extends = (xy = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                xy(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        xy, _Error = function(e) {
            Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this), this.message = e, this.name = this.constructor.name
        };
    _Error.prototype = Object.create(Error.prototype);
    var StitchError = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return __extends(t, e), t
    }(_Error),
        _a, Jy;
    Jy = exports.StitchRequestErrorCode || (exports.StitchRequestErrorCode = {}), Jy[Jy.TRANSPORT_ERROR = 0] = "TRANSPORT_ERROR", Jy[Jy.DECODING_ERROR = 1] = "DECODING_ERROR", Jy[Jy.ENCODING_ERROR = 2] = "ENCODING_ERROR";
    var requestErrorCodeDescs = (_a = {}, _a[exports.StitchRequestErrorCode.TRANSPORT_ERROR] = "the request transport encountered an error communicating with Stitch", _a[exports.StitchRequestErrorCode.DECODING_ERROR] = "an error occurred while decoding a response from Stitch", _a[exports.StitchRequestErrorCode.ENCODING_ERROR] = "an error occurred while encoding a request for Stitch", _a),
        __extends$1 = (Ky = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                Ky(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        Ky, StitchRequestError = function(i) {
            function e(e, t) {
                var r = this,
                    n = e.message + "(" + exports.StitchRequestErrorCode[t] + "): " + requestErrorCodeDescs[t];
                return (r = i.call(this, n) || this).underlyingError = e, r.errorCode = t, r.errorCodeName = exports.StitchRequestErrorCode[t], r
            }
            return __extends$1(e, i), e
        }(StitchError),
        Zy;
    Zy = exports.StitchServiceErrorCode || (exports.StitchServiceErrorCode = {}), Zy[Zy.MissingAuthReq = 0] = "MissingAuthReq", Zy[Zy.InvalidSession = 1] = "InvalidSession", Zy[Zy.UserAppDomainMismatch = 2] = "UserAppDomainMismatch", Zy[Zy.DomainNotAllowed = 3] = "DomainNotAllowed", Zy[Zy.ReadSizeLimitExceeded = 4] = "ReadSizeLimitExceeded", Zy[Zy.InvalidParameter = 5] = "InvalidParameter", Zy[Zy.MissingParameter = 6] = "MissingParameter", Zy[Zy.TwilioError = 7] = "TwilioError", Zy[Zy.GCMError = 8] = "GCMError", Zy[Zy.HTTPError = 9] = "HTTPError", Zy[Zy.AWSError = 10] = "AWSError", Zy[Zy.MongoDBError = 11] = "MongoDBError", Zy[Zy.ArgumentsNotAllowed = 12] = "ArgumentsNotAllowed", Zy[Zy.FunctionExecutionError = 13] = "FunctionExecutionError", Zy[Zy.NoMatchingRuleFound = 14] = "NoMatchingRuleFound", Zy[Zy.InternalServerError = 15] = "InternalServerError", Zy[Zy.AuthProviderNotFound = 16] = "AuthProviderNotFound", Zy[Zy.AuthProviderAlreadyExists = 17] = "AuthProviderAlreadyExists", Zy[Zy.ServiceNotFound = 18] = "ServiceNotFound", Zy[Zy.ServiceTypeNotFound = 19] = "ServiceTypeNotFound", Zy[Zy.ServiceAlreadyExists = 20] = "ServiceAlreadyExists", Zy[Zy.ServiceCommandNotFound = 21] = "ServiceCommandNotFound", Zy[Zy.ValueNotFound = 22] = "ValueNotFound", Zy[Zy.ValueAlreadyExists = 23] = "ValueAlreadyExists", Zy[Zy.ValueDuplicateName = 24] = "ValueDuplicateName", Zy[Zy.FunctionNotFound = 25] = "FunctionNotFound", Zy[Zy.FunctionAlreadyExists = 26] = "FunctionAlreadyExists", Zy[Zy.FunctionDuplicateName = 27] = "FunctionDuplicateName", Zy[Zy.FunctionSyntaxError = 28] = "FunctionSyntaxError", Zy[Zy.FunctionInvalid = 29] = "FunctionInvalid", Zy[Zy.IncomingWebhookNotFound = 30] = "IncomingWebhookNotFound", Zy[Zy.IncomingWebhookAlreadyExists = 31] = "IncomingWebhookAlreadyExists", Zy[Zy.IncomingWebhookDuplicateName = 32] = "IncomingWebhookDuplicateName", Zy[Zy.RuleNotFound = 33] = "RuleNotFound", Zy[Zy.ApiKeyNotFound = 34] = "ApiKeyNotFound", Zy[Zy.RuleAlreadyExists = 35] = "RuleAlreadyExists", Zy[Zy.RuleDuplicateName = 36] = "RuleDuplicateName", Zy[Zy.AuthProviderDuplicateName = 37] = "AuthProviderDuplicateName", Zy[Zy.RestrictedHost = 38] = "RestrictedHost", Zy[Zy.ApiKeyAlreadyExists = 39] = "ApiKeyAlreadyExists", Zy[Zy.IncomingWebhookAuthFailed = 40] = "IncomingWebhookAuthFailed", Zy[Zy.ExecutionTimeLimitExceeded = 41] = "ExecutionTimeLimitExceeded", Zy[Zy.FunctionNotCallable = 42] = "FunctionNotCallable", Zy[Zy.UserAlreadyConfirmed = 43] = "UserAlreadyConfirmed", Zy[Zy.UserNotFound = 44] = "UserNotFound", Zy[Zy.UserDisabled = 45] = "UserDisabled", Zy[Zy.Unknown = 46] = "Unknown";
    var apiErrorCodes = {
        MissingAuthReq: exports.StitchServiceErrorCode.MissingAuthReq,
        InvalidSession: exports.StitchServiceErrorCode.InvalidSession,
        UserAppDomainMismatch: exports.StitchServiceErrorCode.UserAppDomainMismatch,
        DomainNotAllowed: exports.StitchServiceErrorCode.DomainNotAllowed,
        ReadSizeLimitExceeded: exports.StitchServiceErrorCode.ReadSizeLimitExceeded,
        InvalidParameter: exports.StitchServiceErrorCode.InvalidParameter,
        MissingParameter: exports.StitchServiceErrorCode.MissingParameter,
        TwilioError: exports.StitchServiceErrorCode.TwilioError,
        GCMError: exports.StitchServiceErrorCode.GCMError,
        HTTPError: exports.StitchServiceErrorCode.HTTPError,
        AWSError: exports.StitchServiceErrorCode.AWSError,
        MongoDBError: exports.StitchServiceErrorCode.MongoDBError,
        ArgumentsNotAllowed: exports.StitchServiceErrorCode.ArgumentsNotAllowed,
        FunctionExecutionError: exports.StitchServiceErrorCode.FunctionExecutionError,
        NoMatchingRuleFound: exports.StitchServiceErrorCode.NoMatchingRuleFound,
        InternalServerError: exports.StitchServiceErrorCode.InternalServerError,
        AuthProviderNotFound: exports.StitchServiceErrorCode.AuthProviderNotFound,
        AuthProviderAlreadyExists: exports.StitchServiceErrorCode.AuthProviderAlreadyExists,
        ServiceNotFound: exports.StitchServiceErrorCode.ServiceNotFound,
        ServiceTypeNotFound: exports.StitchServiceErrorCode.ServiceTypeNotFound,
        ServiceAlreadyExists: exports.StitchServiceErrorCode.ServiceAlreadyExists,
        ServiceCommandNotFound: exports.StitchServiceErrorCode.ServiceCommandNotFound,
        ValueNotFound: exports.StitchServiceErrorCode.ValueNotFound,
        ValueAlreadyExists: exports.StitchServiceErrorCode.ValueAlreadyExists,
        ValueDuplicateName: exports.StitchServiceErrorCode.ValueDuplicateName,
        FunctionNotFound: exports.StitchServiceErrorCode.FunctionNotFound,
        FunctionAlreadyExists: exports.StitchServiceErrorCode.FunctionAlreadyExists,
        FunctionDuplicateName: exports.StitchServiceErrorCode.FunctionDuplicateName,
        FunctionSyntaxError: exports.StitchServiceErrorCode.FunctionSyntaxError,
        FunctionInvalid: exports.StitchServiceErrorCode.FunctionInvalid,
        IncomingWebhookNotFound: exports.StitchServiceErrorCode.IncomingWebhookNotFound,
        IncomingWebhookAlreadyExists: exports.StitchServiceErrorCode.IncomingWebhookAlreadyExists,
        IncomingWebhookDuplicateName: exports.StitchServiceErrorCode.IncomingWebhookDuplicateName,
        RuleNotFound: exports.StitchServiceErrorCode.RuleNotFound,
        APIKeyNotFound: exports.StitchServiceErrorCode.ApiKeyNotFound,
        RuleAlreadyExists: exports.StitchServiceErrorCode.RuleAlreadyExists,
        RuleDuplicateName: exports.StitchServiceErrorCode.RuleDuplicateName,
        AuthProviderDuplicateName: exports.StitchServiceErrorCode.AuthProviderDuplicateName,
        RestrictedHost: exports.StitchServiceErrorCode.RestrictedHost,
        APIKeyAlreadyExists: exports.StitchServiceErrorCode.ApiKeyAlreadyExists,
        IncomingWebhookAuthFailed: exports.StitchServiceErrorCode.IncomingWebhookAuthFailed,
        ExecutionTimeLimitExceeded: exports.StitchServiceErrorCode.ExecutionTimeLimitExceeded,
        FunctionNotCallable: exports.StitchServiceErrorCode.FunctionNotCallable,
        UserAlreadyConfirmed: exports.StitchServiceErrorCode.UserAlreadyConfirmed,
        UserNotFound: exports.StitchServiceErrorCode.UserNotFound,
        UserDisabled: exports.StitchServiceErrorCode.UserDisabled
    };

    function stitchServiceErrorCodeFromApi(e) {
        return e in apiErrorCodes ? apiErrorCodes[e] : exports.StitchServiceErrorCode.Unknown
    }
    var __extends$2 = (_y = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            _y(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        _y, StitchServiceError = function(n) {
            function e(e, t) {
                void 0 === t && (t = exports.StitchServiceErrorCode.Unknown);
                var r = n.call(this, e) || this;
                return r.message = e, r.errorCode = t, r.errorCodeName = exports.StitchServiceErrorCode[t], r
            }
            return __extends$2(e, n), e
        }(StitchError),
        Fields, nz, Method, zz;

    function wrapDecodingError(e) {
        return e instanceof StitchError ? e : new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
    }

    function handleRequestError(t) {
        if (void 0 === t.body) throw new StitchServiceError("received unexpected status code " + t.statusCode, exports.StitchServiceErrorCode.Unknown);
        var e;
        try {
            e = t.body
        } catch (e) {
            throw new StitchServiceError("received unexpected status code " + t.statusCode, exports.StitchServiceErrorCode.Unknown)
        }
        var r = handleRichError(t, e);
        throw new StitchServiceError(r, exports.StitchServiceErrorCode.Unknown)
    }

    function handleRichError(e, t) {
        if (void 0 === e.headers[Headers.CONTENT_TYPE] || void 0 !== e.headers[Headers.CONTENT_TYPE] && e.headers[Headers.CONTENT_TYPE] !== ContentTypes.APPLICATION_JSON) return t;
        var r = JSON.parse(t);
        if (!(r instanceof Object)) return t;
        var n = r;
        if (void 0 === n[Fields.ERROR]) return t;
        var i = n[Fields.ERROR];
        if (void 0 === n[Fields.ERROR_CODE]) return i;
        var o = n[Fields.ERROR_CODE];
        throw new StitchServiceError(i, stitchServiceErrorCodeFromApi(o))
    }
    nz = Fields || (Fields = {}), nz.ERROR = "error", nz.ERROR_CODE = "error_code", zz = Method || (Method = {}), zz.GET = "GET", zz.POST = "POST", zz.PUT = "PUT", zz.DELETE = "DELETE", zz.HEAD = "HEAD", zz.OPTIONS = "OPTIONS", zz.TRACE = "TRACE", zz.PATCH = "PATCH";
    var Method$1 = Method,
        StitchRequest = function() {
            function e(e, t, r, n, i) {
                this.method = e, this.path = t, this.headers = r, this.body = i, this.startedAt = n
            }
            return Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        Gz, Hz;
    Gz = StitchRequest || (StitchRequest = {}), Hz = function() {
        function e(e) {
            void 0 !== e && (this.method = e.method, this.path = e.path, this.headers = e.headers, this.body = e.body, this.startedAt = e.startedAt)
        }
        return e.prototype.withMethod = function(e) {
            return this.method = e, this
        }, e.prototype.withPath = function(e) {
            return this.path = e, this
        }, e.prototype.withHeaders = function(e) {
            return this.headers = e, this
        }, e.prototype.withBody = function(e) {
            return this.body = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.method) throw Error("must set method");
            if (void 0 === this.path) throw Error("must set non-empty path");
            return void 0 === this.startedAt && (this.startedAt = Date.now() / 1e3), new Gz(this.method, this.path, void 0 === this.headers ? {} : this.headers, this.startedAt, this.body)
        }, e
    }(), Gz.Builder = Hz;
    var __extends$3 = (Oz = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            Oz(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        Oz, StitchAuthRequest = function(i) {
            function e(e, t, r) {
                void 0 === t && (t = !1), void 0 === r && (r = !0);
                var n = i.call(this, e.method, e.path, e.headers, e.startedAt, e.body) || this;
                return n.useRefreshToken = t, n.shouldRefreshOnFailure = r, n
            }
            return __extends$3(e, i), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchRequest),
        bA, cA;
    bA = StitchAuthRequest || (StitchAuthRequest = {}), cA = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return __extends$3(e, t), e.prototype.withAccessToken = function() {
            return this.useRefreshToken = !1, this
        }, e.prototype.withRefreshToken = function() {
            return this.useRefreshToken = !0, this
        }, e.prototype.withShouldRefreshOnFailure = function(e) {
            return this.shouldRefreshOnFailure = e, this
        }, e.prototype.build = function() {
            return this.useRefreshToken && (this.shouldRefreshOnFailure = !1), new bA(t.prototype.build.call(this), this.useRefreshToken, this.shouldRefreshOnFailure)
        }, e
    }(StitchRequest.Builder), bA.Builder = cA;
    var __extends$4 = (hA = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            hA(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        hA, StitchAuthDocRequest = function(n) {
            function e(e, t) {
                var r = this;
                return (r = e instanceof StitchAuthRequest ? n.call(this, e, e.useRefreshToken, e.shouldRefreshOnFailure) || this : n.call(this, e) || this).document = t, r
            }
            return __extends$4(e, n), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchAuthRequest),
        vA, wA;
    vA = StitchAuthDocRequest || (StitchAuthDocRequest = {}), wA = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return void 0 !== e && (t.document = e.document, t.useRefreshToken = e.useRefreshToken), t
        }
        return __extends$4(e, r), e.prototype.withDocument = function(e) {
            return this.document = e, this
        }, e.prototype.withAccessToken = function() {
            return this.useRefreshToken = !1, this
        }, e.prototype.build = function() {
            if (void 0 === this.document || !(this.document instanceof Object)) throw new Error("document must be set: " + this.document);
            return void 0 === this.headers && this.withHeaders({}), this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON, this.withBody(mongodbExtjson_2(this.document)), new vA(r.prototype.build.call(this), this.document)
        }, e
    }(StitchAuthRequest.Builder), vA.Builder = wA;
    var __extends$5 = (CA = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            CA(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        CA, StitchDocRequest = function(n) {
            function e(e, t) {
                var r = n.call(this, e.method, e.path, e.headers, e.startedAt, e.body) || this;
                return r.document = t, r
            }
            return __extends$5(e, n), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchRequest),
        QA, RA, _a$1, XA;
    QA = StitchDocRequest || (StitchDocRequest = {}), RA = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return void 0 !== e && (t.document = e.document), t
        }
        return __extends$5(e, r), e.prototype.withDocument = function(e) {
            return this.document = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.document || !(this.document instanceof Object)) throw new Error("document must be set");
            return void 0 === this.headers && this.withHeaders({}), this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON, this.withBody(mongodbExtjson_2(this.document)), new QA(r.prototype.build.call(this), this.document)
        }, e
    }(StitchRequest.Builder), QA.Builder = RA, XA = exports.StitchClientErrorCode || (exports.StitchClientErrorCode = {}), XA[XA.LoggedOutDuringRequest = 0] = "LoggedOutDuringRequest", XA[XA.MustAuthenticateFirst = 1] = "MustAuthenticateFirst", XA[XA.UserNoLongerValid = 2] = "UserNoLongerValid", XA[XA.CouldNotLoadPersistedAuthInfo = 3] = "CouldNotLoadPersistedAuthInfo", XA[XA.CouldNotPersistAuthInfo = 4] = "CouldNotPersistAuthInfo";
    var clientErrorCodeDescs = (_a$1 = {}, _a$1[exports.StitchClientErrorCode.LoggedOutDuringRequest] = "logged out while making a request to Stitch", _a$1[exports.StitchClientErrorCode.MustAuthenticateFirst] = "method called requires being authenticated", _a$1[exports.StitchClientErrorCode.UserNoLongerValid] = "user instance being accessed is no longer valid; please get a new user with auth.getUser()", _a$1[exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo] = "failed to load stored auth information for Stitch", _a$1[exports.StitchClientErrorCode.CouldNotPersistAuthInfo] = "failed to save auth information for Stitch", _a$1),
        __extends$6 = (YA = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                YA(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        YA, StitchClientError = function(n) {
            function e(e) {
                var t = this,
                    r = "(" + exports.StitchClientErrorCode[e] + "): " + clientErrorCodeDescs[e];
                return (t = n.call(this, r) || this).errorCode = e, t.errorCodeName = exports.StitchClientErrorCode[e], t
            }
            return __extends$6(e, n), e
        }(StitchError),
        StitchAuthResponseCredential = function(e, t, r, n) {
            this.authInfo = e, this.providerType = t, this.providerName = r, this.asLink = n
        };

    function base64Decode(e) {
        var t, r = e.length % 4;
        0 != r ? t = e + "=".repeat(4 - r) : t = e;
        var n = toByteArray_1(t);
        return utf8Slice(n, 0, n.length)
    }

    function base64Encode(e) {
        var t;
        return "undefined" == typeof Uint8Array && (t = utf8ToBytes(e)), t = new Uint8Array(utf8ToBytes(e)), fromByteArray_1(t)
    }

    function utf8ToBytes(e) {
        for (var t, r = 1 / 0, n = e.length, i = null, o = [], s = 0; s < n; s++) {
            if (55295 < (t = e.charCodeAt(s)) && t < 57344) {
                if (!i) {
                    if (56319 < t) {
                        -1 < (r -= 3) && o.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        -1 < (r -= 3) && o.push(239, 191, 189);
                        continue
                    }
                    i = t;
                    continue
                }
                if (t < 56320) {
                    -1 < (r -= 3) && o.push(239, 191, 189), i = t;
                    continue
                }
                t = i - 55296 << 10 | t - 56320 | 65536, i = null
            } else i && (-1 < (r -= 3) && o.push(239, 191, 189), i = null); if (t < 128) {
                if ((r -= 1) < 0) break;
                o.push(t)
            } else if (t < 2048) {
                if ((r -= 2) < 0) break;
                o.push(t >> 6 | 192, 63 & t | 128)
            } else if (t < 65536) {
                if ((r -= 3) < 0) break;
                o.push(t >> 12 | 224, t >> 6 & 63 | 128, 63 & t | 128)
            } else {
                if (!(t < 2097152)) throw new Error("Invalid code point");
                if ((r -= 4) < 0) break;
                o.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, 63 & t | 128)
            }
        }
        return o
    }

    function utf8Slice(e, t, r) {
        var n = "",
            i = "";
        r = Math.min(e.length, r || 1 / 0);
        for (var o = t = t || 0; o < r; o++) e[o] <= 127 ? (n += decodeUtf8Char(i) + String.fromCharCode(e[o]), i = "") : i += "%" + e[o].toString(16);
        return n + decodeUtf8Char(i)
    }

    function decodeUtf8Char(e) {
        try {
            return decodeURIComponent(e)
        } catch (e) {
            return String.fromCharCode(65533)
        }
    }
    var EXPIRES = "exp",
        ISSUED_AT = "iat",
        JWT = function() {
            function n(e, t) {
                this.expires = e, this.issuedAt = t
            }
            return n.fromEncoded = function(e) {
                var t = n.splitToken(e),
                    r = JSON.parse(base64Decode(t[1]));
                return new n(r[EXPIRES], r[ISSUED_AT])
            }, n.splitToken = function(e) {
                var t = e.split(".");
                if (3 !== t.length) throw new Error("Malformed JWT token. The string " + e + " should have 3 parts.");
                return t
            }, n
        }(),
        SLEEP_MILLIS = 6e4,
        EXPIRATION_WINDOW_SECS = 300,
        AccessTokenRefresher = function() {
            function e(e) {
                this.auth = e
            }
            return e.prototype.shouldRefresh = function() {
                var e = this.auth;
                if (void 0 === e) return !1;
                if (!e.isLoggedIn) return !1;
                var t, r = e.authInfo;
                if (void 0 === r) return !1;
                try {
                    t = JWT.fromEncoded(r.accessToken)
                } catch (e) {
                    return console.log(e), !1
                }
                return !(Date.now() / 1e3 < t.expires - EXPIRATION_WINDOW_SECS)
            }, e.prototype.run = function() {
                var e = this;
                this.shouldRefresh() ? this.auth.refreshAccessToken().then(function() {
                    e.nextTimeout = setTimeout(function() {
                        return e.run()
                    }, SLEEP_MILLIS)
                }).
                catch (function() {
                    e.nextTimeout = setTimeout(function() {
                        return e.run()
                    }, SLEEP_MILLIS)
                }) : this.nextTimeout = setTimeout(function() {
                    return e.run()
                }, SLEEP_MILLIS)
            }, e.prototype.stop = function() {
                clearTimeout(this.nextTimeout)
            }, e
        }(),
        __extends$7 = (aC = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                aC(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        aC, Fields$1, jC;
    jC = Fields$1 || (Fields$1 = {}), jC.USER_ID = "user_id", jC.DEVICE_ID = "device_id", jC.ACCESS_TOKEN = "access_token", jC.REFRESH_TOKEN = "refresh_token";
    var ApiAuthInfo = function(i) {
        function t(e, t, r, n) {
            return i.call(this, e, t, r, n) || this
        }
        return __extends$7(t, i), t.fromJSON = function(e) {
            return new t(e[Fields$1.USER_ID], e[Fields$1.DEVICE_ID], e[Fields$1.ACCESS_TOKEN], e[Fields$1.REFRESH_TOKEN])
        }, t.prototype.toJSON = function() {
            var e;
            return (e = {})[Fields$1.USER_ID] = this.userId, e[Fields$1.DEVICE_ID] = this.deviceId, e[Fields$1.ACCESS_TOKEN] = this.accessToken, e[Fields$1.REFRESH_TOKEN] = this.refreshToken, e
        }, t
    }(AuthInfo),
        Assertions = function() {
            function e() {}
            return e.keyPresent = function(e, t) {
                if (void 0 === t[e]) throw new Error("expected " + e + " to be present")
            }, e
        }(),
        NAME = "name",
        EMAIL = "email",
        PICTURE_Url = "picture",
        FIRST_NAME = "first_name",
        LAST_NAME = "last_name",
        GENDER = "gender",
        BIRTHDAY = "birthday",
        MIN_AGE = "min_age",
        MAX_AGE = "max_age",
        StitchUserProfileImpl = function() {
            function e(e, t, r) {
                void 0 === t && (t = {}), void 0 === r && (r = []), this.userType = e, this.data = t, this.identities = r
            }
            return e.empty = function() {
                return new e
            }, Object.defineProperty(e.prototype, "name", {
                get: function() {
                    return this.data[NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "email", {
                get: function() {
                    return this.data[EMAIL]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "pictureUrl", {
                get: function() {
                    return this.data[PICTURE_Url]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "firstName", {
                get: function() {
                    return this.data[FIRST_NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "lastName", {
                get: function() {
                    return this.data[LAST_NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "gender", {
                get: function() {
                    return this.data[GENDER]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "birthday", {
                get: function() {
                    return this.data[BIRTHDAY]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "minAge", {
                get: function() {
                    var e = this.data[MIN_AGE];
                    if (void 0 !== e) return +e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "maxAge", {
                get: function() {
                    var e = this.data[MAX_AGE];
                    if (void 0 !== e) return +e
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        StitchUserIdentity = function(e, t) {
            this.id = e, this.providerType = t
        }, __extends$8 = (EC = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                EC(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        EC, Fields$2, NC;
    NC = Fields$2 || (Fields$2 = {}), NC.ID = "id", NC.PROVIDER_TYPE = "provider_type";
    var ApiStitchUserIdentity = function(r) {
        function t(e, t) {
            return r.call(this, e, t) || this
        }
        return __extends$8(t, r), t.fromJSON = function(e) {
            return new t(e[Fields$2.ID], e[Fields$2.PROVIDER_TYPE])
        }, t.prototype.toJSON = function() {
            var e;
            return (e = {})[Fields$2.ID] = this.id, e[Fields$2.PROVIDER_TYPE] = this.providerType, e
        }, t
    }(StitchUserIdentity),
        __extends$9 = (UC = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                UC(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        UC, Fields$3, bD;
    bD = Fields$3 || (Fields$3 = {}), bD.DATA = "data", bD.USER_TYPE = "type", bD.IDENTITIES = "identities";
    var ApiCoreUserProfile = function(n) {
        function t(e, t, r) {
            return n.call(this, e, t, r) || this
        }
        return __extends$9(t, n), t.fromJSON = function(e) {
            return Assertions.keyPresent(Fields$3.USER_TYPE, e), Assertions.keyPresent(Fields$3.DATA, e), Assertions.keyPresent(Fields$3.IDENTITIES, e), new t(e[Fields$3.USER_TYPE], e[Fields$3.DATA], e[Fields$3.IDENTITIES].map(ApiStitchUserIdentity.fromJSON))
        }, t.prototype.toJSON = function() {
            var e;
            return (e = {})[Fields$3.DATA] = this.data, e[Fields$3.USER_TYPE] = this.userType, e[Fields$3.IDENTITIES] = this.identities, e
        }, t
    }(StitchUserProfileImpl),
        __extends$a = (jD = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                jD(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        jD, Fields$4, sD;
    sD = Fields$4 || (Fields$4 = {}), sD.ID = "id", sD.PROVIDER_TYPE = "provider_type";
    var StoreStitchUserIdentity = function(r) {
        function t(e, t) {
            return r.call(this, e, t) || this
        }
        return __extends$a(t, r), t.decode = function(e) {
            return new t(e[Fields$4.ID], e[Fields$4.PROVIDER_TYPE])
        }, t.prototype.encode = function() {
            var e;
            return (e = {})[Fields$4.ID] = this.id, e[Fields$4.PROVIDER_TYPE] = this.providerType, e
        }, t
    }(StitchUserIdentity),
        __extends$b = (zD = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                zD(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        zD, Fields$5, ID;
    ID = Fields$5 || (Fields$5 = {}), ID.DATA = "data", ID.USER_TYPE = "type", ID.IDENTITIES = "identities";
    var StoreCoreUserProfile = function(i) {
        function t(e, t, r) {
            var n = i.call(this, e, t, r) || this;
            return n.userType = e, n.data = t, n.identities = r, n
        }
        return __extends$b(t, i), t.decode = function(e) {
            return e ? new t(e[Fields$5.USER_TYPE], e[Fields$5.DATA], e[Fields$5.IDENTITIES].map(function(e) {
                return StoreStitchUserIdentity.decode(e)
            })) : void 0
        }, t.prototype.encode = function() {
            var e;
            return (e = {})[Fields$5.DATA] = this.data, e[Fields$5.USER_TYPE] = this.userType, e[Fields$5.IDENTITIES] = this.identities.map(function(e) {
                return e.encode()
            }), e
        }, t
    }(StitchUserProfileImpl),
        __extends$c = (TD = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                TD(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        TD, Fields$6, aE;

    function readFromStorage(e) {
        var t = e.get(StoreAuthInfo.STORAGE_NAME);
        if (t) return StoreAuthInfo.decode(JSON.parse(t))
    }

    function writeToStorage(e, t) {
        var r = new StoreAuthInfo(e.userId, e.deviceId, e.accessToken, e.refreshToken, e.loggedInProviderType, e.loggedInProviderName, e.userProfile ? new StoreCoreUserProfile(e.userProfile.userType, e.userProfile.data, e.userProfile.identities.map(function(e) {
            return new StoreStitchUserIdentity(e.id, e.providerType)
        })) : void 0);
        t.set(StoreAuthInfo.STORAGE_NAME, JSON.stringify(r.encode()))
    }
    aE = Fields$6 || (Fields$6 = {}), aE.USER_ID = "user_id", aE.DEVICE_ID = "device_id", aE.ACCESS_TOKEN = "access_token", aE.REFRESH_TOKEN = "refresh_token", aE.LOGGED_IN_PROVIDER_TYPE = "logged_in_provider_type", aE.LOGGED_IN_PROVIDER_NAME = "logged_in_provider_name", aE.USER_PROFILE = "user_profile";
    var StoreAuthInfo = function(a) {
        function f(e, t, r, n, i, o, s) {
            var u = a.call(this, e, t, r, n, i, o, s) || this;
            return u.userProfile = s, u
        }
        return __extends$c(f, a), f.decode = function(e) {
            var t = e[Fields$6.USER_ID],
                r = e[Fields$6.DEVICE_ID],
                n = e[Fields$6.ACCESS_TOKEN],
                i = e[Fields$6.REFRESH_TOKEN],
                o = e[Fields$6.LOGGED_IN_PROVIDER_TYPE],
                s = e[Fields$6.LOGGED_IN_PROVIDER_NAME],
                u = e[Fields$6.USER_PROFILE];
            return new f(t, r, n, i, o, s, StoreCoreUserProfile.decode(u))
        }, f.prototype.encode = function() {
            var e = {};
            return e[Fields$6.USER_ID] = this.userId, e[Fields$6.ACCESS_TOKEN] = this.accessToken, e[Fields$6.REFRESH_TOKEN] = this.refreshToken, e[Fields$6.DEVICE_ID] = this.deviceId, e[Fields$6.LOGGED_IN_PROVIDER_NAME] = this.loggedInProviderName, e[Fields$6.LOGGED_IN_PROVIDER_TYPE] = this.loggedInProviderType, e[Fields$6.USER_PROFILE] = this.userProfile ? this.userProfile.encode() : void 0, e
        }, f.STORAGE_NAME = "auth_info", f
    }(AuthInfo),
        OPTIONS = "options",
        DEVICE = "device",
        CoreStitchAuth = function() {
            function e(e, t, r, n) {
                var i;
                void 0 === n && (n = !0), this.requestClient = e, this.authRoutes = t, this.storage = r;
                try {
                    i = readFromStorage(r)
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo)
                }
                this.authInfo = void 0 === i ? AuthInfo.empty() : i, this.prepUser(), n && (this.accessTokenRefresher = new AccessTokenRefresher(this), this.accessTokenRefresher.run())
            }
            return Object.defineProperty(e.prototype, "isLoggedIn", {
                get: function() {
                    return void 0 !== this.currentUser
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "user", {
                get: function() {
                    return this.currentUser
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.doAuthenticatedRequest = function(t) {
                var r = this;
                return this.requestClient.doRequest(this.prepareAuthRequest(t)).
                catch (function(e) {
                    return r.handleAuthFailure(e, t)
                })
            }, e.prototype.doAuthenticatedRequestWithDecoder = function(e, r) {
                return this.doAuthenticatedRequest(e).then(function(e) {
                    var t = mongodbExtjson_1(e.body, {
                        strict: !1
                    });
                    return r ? r.decode(t) : t
                }).
                catch (function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.refreshAccessToken = function() {
                var r = this,
                    e = (new StitchAuthRequest.Builder).withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method$1.POST);
                return this.doAuthenticatedRequest(e.build()).then(function(e) {
                    try {
                        var t = ApiAuthInfo.fromJSON(JSON.parse(e.body));
                        r.authInfo = r.authInfo.merge(t)
                    } catch (e) {
                        throw new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                    }
                    try {
                        writeToStorage(r.authInfo, r.storage)
                    } catch (e) {
                        throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                })
            }, e.prototype.loginWithCredentialInternal = function(e) {
                return e instanceof StitchAuthResponseCredential ? this.processLogin(e, e.authInfo, e.asLink) : this.isLoggedIn ? e.providerCapabilities.reusesExistingSession && e.providerType === this.currentUser.loggedInProviderType ? Promise.resolve(this.currentUser) : (this.logoutInternal(), this.doLogin(e, !1)) : this.doLogin(e, !1)
            }, e.prototype.linkUserWithCredentialInternal = function(e, t) {
                return void 0 !== this.currentUser && e.id !== this.currentUser.id ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNoLongerValid)) : this.doLogin(t, !0)
            }, e.prototype.logoutInternal = function() {
                var e = this;
                return this.isLoggedIn ? this.doLogout().then(function() {
                    e.clearAuth()
                }).
                catch (function() {
                    e.clearAuth()
                }) : Promise.resolve()
            }, Object.defineProperty(e.prototype, "hasDeviceId", {
                get: function() {
                    return void 0 !== this.authInfo.deviceId && "" !== this.authInfo.deviceId && "000000000000000000000000" !== this.authInfo.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "deviceId", {
                get: function() {
                    if (this.hasDeviceId) return this.authInfo.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.prepareAuthRequest = function(e) {
                if (!this.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.MustAuthenticateFirst);
                var t = e.builder,
                    r = t.headers || {};
                return e.useRefreshToken ? r[Headers.AUTHORIZATION] = Headers.getAuthorizationBearer(this.authInfo.refreshToken) : r[Headers.AUTHORIZATION] = Headers.getAuthorizationBearer(this.authInfo.accessToken), t.withHeaders(r), t.build()
            }, e.prototype.handleAuthFailure = function(e, t) {
                var r = this;
                if (!(e instanceof StitchServiceError) || e.errorCode !== exports.StitchServiceErrorCode.InvalidSession) throw e;
                if (t.useRefreshToken || !t.shouldRefreshOnFailure) throw this.clearAuth(), e;
                return this.tryRefreshAccessToken(t.startedAt).then(function() {
                    return r.doAuthenticatedRequest(t.builder.withShouldRefreshOnFailure(!1).build())
                })
            }, e.prototype.tryRefreshAccessToken = function(e) {
                if (!this.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.LoggedOutDuringRequest);
                try {
                    if (JWT.fromEncoded(this.authInfo.accessToken).issuedAt >= e) return Promise.resolve()
                } catch (e) {}
                return this.refreshAccessToken()
            }, e.prototype.prepUser = function() {
                void 0 !== this.authInfo.userId && (this.currentUser = this.userFactory.makeUser(this.authInfo.userId, this.authInfo.loggedInProviderType, this.authInfo.loggedInProviderName, this.authInfo.userProfile))
            }, e.prototype.attachAuthOptions = function(e) {
                var t = {};
                t[DEVICE] = this.deviceInfo, e[OPTIONS] = t
            }, e.prototype.doLogin = function(t, r) {
                var n = this;
                return this.doLoginRequest(t, r).then(function(e) {
                    return n.processLoginResponse(t, e, r)
                }).then(function(e) {
                    return n.onAuthEvent(), e
                })
            }, e.prototype.doLoginRequest = function(e, t) {
                var r = new StitchDocRequest.Builder;
                r.withMethod(Method$1.POST), t ? r.withPath(this.authRoutes.getAuthProviderLinkRoute(e.providerName)) : r.withPath(this.authRoutes.getAuthProviderLoginRoute(e.providerName));
                var n = e.material;
                if (this.attachAuthOptions(n), r.withDocument(n), !t) return this.requestClient.doRequest(r.build());
                var i = new StitchAuthDocRequest(r.build(), r.document);
                return this.doAuthenticatedRequest(i)
            }, e.prototype.processLogin = function(t, r, n) {
                var i = this,
                    o = this.authInfo,
                    s = this.currentUser;
                return r = this.authInfo.merge(new AuthInfo(r.userId, r.deviceId, r.accessToken, r.refreshToken, t.providerType, t.providerName, void 0)), this.authInfo = r, this.currentUser = this.userFactory.makeUser(this.authInfo.userId, t.providerType, t.providerName, void 0), this.doGetUserProfile().then(function(e) {
                    r = r.merge(new AuthInfo(r.userId, r.deviceId, r.accessToken, r.refreshToken, t.providerType, t.providerName, e));
                    try {
                        writeToStorage(r, i.storage)
                    } catch (e) {
                        throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                    return i.authInfo = r, i.currentUser = i.userFactory.makeUser(i.authInfo.userId, t.providerType, t.providerName, e), i.currentUser
                }).
                catch (function(e) {
                    throw n ? (i.authInfo = o, i.currentUser = s) : i.clearAuth(), e
                })
            }, e.prototype.processLoginResponse = function(e, t, r) {
                try {
                    if (!t) throw new StitchServiceError("the login response could not be processed for credential: " + e + ";response was undefined");
                    if (!t.body) throw new StitchServiceError("response with status code " + t.statusCode + " has empty body");
                    return this.processLogin(e, ApiAuthInfo.fromJSON(JSON.parse(t.body)), r)
                } catch (e) {
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                }
            }, e.prototype.doGetUserProfile = function() {
                var e = new StitchAuthRequest.Builder;
                return e.withMethod(Method$1.GET).withPath(this.authRoutes.profileRoute), this.doAuthenticatedRequest(e.build()).then(function(e) {
                    return ApiCoreUserProfile.fromJSON(JSON.parse(e.body))
                }).
                catch (function(e) {
                    throw e instanceof StitchError ? e : new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                })
            }, e.prototype.doLogout = function() {
                var e = new StitchAuthRequest.Builder;
                return e.withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method$1.DELETE), this.doAuthenticatedRequest(e.build()).then(function() {})
            }, e.prototype.clearAuth = function() {
                if (this.isLoggedIn) {
                    this.authInfo = this.authInfo.loggedOut();
                    try {
                        writeToStorage(this.authInfo, this.storage)
                    } catch (e) {
                        throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                    this.currentUser = void 0, this.onAuthEvent()
                }
            }, e.prototype.close = function() {
                this.accessTokenRefresher && this.accessTokenRefresher.stop()
            }, e
        }(),
        CoreStitchUserImpl = function() {
            function e(e, t, r, n) {
                this.id = e, this.loggedInProviderType = t, this.loggedInProviderName = r, this.profile = void 0 === n ? StitchUserProfileImpl.empty() : n
            }
            return Object.defineProperty(e.prototype, "userType", {
                get: function() {
                    return this.profile.userType
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identities", {
                get: function() {
                    return this.profile.identities
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        DeviceFields, PF;
    PF = DeviceFields || (DeviceFields = {}), PF.DEVICE_ID = "deviceId", PF.APP_ID = "appId", PF.APP_VERSION = "appVersion", PF.PLATFORM = "platform", PF.PLATFORM_VERSION = "platformVersion", PF.SDK_VERSION = "sdkVersion";
    var DeviceFields$1 = DeviceFields,
        AnonymousAuthProvider = function() {
            function e() {}
            return e.TYPE = "anon-user", e.DEFAULT_NAME = "anon-user", e
        }(),
        ProviderCapabilities = function(e) {
            void 0 === e && (e = !1), this.reusesExistingSession = e
        }, AnonymousCredential = function(e) {
            void 0 === e && (e = AnonymousAuthProvider.DEFAULT_NAME), this.providerType = AnonymousAuthProvider.TYPE, this.material = {}, this.providerCapabilities = new ProviderCapabilities(!0), this.providerName = e
        }, CustomAuthProvider = function() {
            function e() {}
            return e.TYPE = "custom-token", e.DEFAULT_NAME = "custom-token", e
        }(),
        Fields$7;
    (Fields$7 || (Fields$7 = {})).TOKEN = "token";
    var CustomCredential = function(e, t) {
        var r;
        void 0 === t && (t = CustomAuthProvider.DEFAULT_NAME), this.providerType = CustomAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.token = e, this.material = ((r = {})[Fields$7.TOKEN] = this.token, r)
    }, FacebookAuthProvider = function() {
            function e() {}
            return e.TYPE = "oauth2-facebook", e.DEFAULT_NAME = "oauth2-facebook", e
        }(),
        Fields$8;
    (Fields$8 || (Fields$8 = {})).ACCESS_TOKEN = "accessToken";
    var FacebookCredential = function() {
        function e(e, t) {
            var r;
            void 0 === t && (t = FacebookAuthProvider.DEFAULT_NAME), this.providerType = FacebookAuthProvider.TYPE, this.providerName = t, this.accessToken = e, this.material = ((r = {})[Fields$8.ACCESS_TOKEN] = this.accessToken, r)
        }
        return Object.defineProperty(e.prototype, "providerCapabilities", {
            get: function() {
                return new ProviderCapabilities(!1)
            },
            enumerable: !0,
            configurable: !0
        }), e
    }(),
        GoogleAuthProvider = function() {
            function e() {}
            return e.TYPE = "oauth2-google", e.DEFAULT_NAME = "oauth2-google", e
        }(),
        Fields$9;
    (Fields$9 || (Fields$9 = {})).AUTH_CODE = "authCode";
    var GoogleCredential = function(e, t) {
        var r;
        void 0 === t && (t = GoogleAuthProvider.DEFAULT_NAME), this.providerType = GoogleAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.authCode = e, this.material = ((r = {})[Fields$9.AUTH_CODE] = this.authCode, r)
    }, ServerApiKeyAuthProvider = function() {
            function e() {}
            return e.TYPE = "api-key", e.DEFAULT_NAME = "api-key", e
        }(),
        Fields$a;
    (Fields$a || (Fields$a = {})).KEY = "key";
    var ServerApiKeyCredential = function(e, t) {
        var r;
        void 0 === t && (t = ServerApiKeyAuthProvider.DEFAULT_NAME), this.providerType = ServerApiKeyAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.key = e, this.material = ((r = {})[Fields$a.KEY] = this.key, r)
    }, CoreAuthProviderClient = function(e, t, r) {
            this.providerName = e, this.requestClient = t, this.baseRoute = r
        }, commonjsGlobal$2 = "undefined" != typeof window ? window : void 0 !== global$1 ? global$1 : "undefined" != typeof self ? self : {};

    function createCommonjsModule$2(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var map$1 = createCommonjsModule$2(function(e) {
        buffer.Buffer;
        if (void 0 !== commonjsGlobal$2.Map) e.exports = commonjsGlobal$2.Map, e.exports.Map = commonjsGlobal$2.Map;
        else {
            var t = function(e) {
                this._keys = [], this._values = {};
                for (var t = 0; t < e.length; t++)
                    if (null != e[t]) {
                        var r = e[t],
                            n = r[0],
                            i = r[1];
                        this._keys.push(n), this._values[n] = {
                            v: i,
                            i: this._keys.length - 1
                        }
                    }
            };
            t.prototype.clear = function() {
                this._keys = [], this._values = {}
            }, t.prototype.delete = function(e) {
                var t = this._values[e];
                return null != t && (delete this._values[e], this._keys.splice(t.i, 1), !0)
            }, t.prototype.entries = function() {
                var t = this,
                    r = 0;
                return {
                    next: function() {
                        var e = t._keys[r++];
                        return {
                            value: void 0 !== e ? [e, t._values[e].v] : void 0,
                            done: void 0 === e
                        }
                    }
                }
            }, t.prototype.forEach = function(e, t) {
                t = t || this;
                for (var r = 0; r < this._keys.length; r++) {
                    var n = this._keys[r];
                    e.call(t, this._values[n].v, n, t)
                }
            }, t.prototype.get = function(e) {
                return this._values[e] ? this._values[e].v : void 0
            }, t.prototype.has = function(e) {
                return null != this._values[e]
            }, t.prototype.keys = function() {
                var t = this,
                    r = 0;
                return {
                    next: function() {
                        var e = t._keys[r++];
                        return {
                            value: void 0 !== e ? e : void 0,
                            done: void 0 === e
                        }
                    }
                }
            }, t.prototype.set = function(e, t) {
                return this._values[e] ? this._values[e].v = t : (this._keys.push(e), this._values[e] = {
                    v: t,
                    i: this._keys.length - 1
                }), this
            }, t.prototype.values = function() {
                var t = this,
                    r = 0;
                return {
                    next: function() {
                        var e = t._keys[r++];
                        return {
                            value: void 0 !== e ? t._values[e].v : void 0,
                            done: void 0 === e
                        }
                    }
                }
            }, Object.defineProperty(t.prototype, "size", {
                enumerable: !0,
                get: function() {
                    return this._keys.length
                }
            }), e.exports = t, e.exports.Map = t
        }
    }),
        map_1$1 = map$1.Map;

    function Long$4(e, t) {
        if (!(this instanceof Long$4)) return new Long$4(e, t);
        this._bsontype = "Long", this.low_ = 0 | e, this.high_ = 0 | t
    }
    Long$4.prototype.toInt = function() {
        return this.low_
    }, Long$4.prototype.toNumber = function() {
        return this.high_ * Long$4.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
    }, Long$4.prototype.toJSON = function() {
        return this.toString()
    }, Long$4.prototype.toString = function(e) {
        var t = e || 10;
        if (t < 2 || 36 < t) throw Error("radix out of range: " + t);
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.equals(Long$4.MIN_VALUE)) {
                var r = Long$4.fromNumber(t),
                    n = this.div(r),
                    i = n.multiply(r).subtract(this);
                return n.toString(t) + i.toInt().toString(t)
            }
            return "-" + this.negate().toString(t)
        }
        var o = Long$4.fromNumber(Math.pow(t, 6));
        i = this;
        for (var s = ""; !i.isZero();) {
            var u = i.div(o),
                a = i.subtract(u.multiply(o)).toInt().toString(t);
            if ((i = u).isZero()) return a + s;
            for (; a.length < 6;) a = "0" + a;
            s = "" + a + s
        }
    }, Long$4.prototype.getHighBits = function() {
        return this.high_
    }, Long$4.prototype.getLowBits = function() {
        return this.low_
    }, Long$4.prototype.getLowBitsUnsigned = function() {
        return 0 <= this.low_ ? this.low_ : Long$4.TWO_PWR_32_DBL_ + this.low_
    }, Long$4.prototype.getNumBitsAbs = function() {
        if (this.isNegative()) return this.equals(Long$4.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
        for (var e = 0 !== this.high_ ? this.high_ : this.low_, t = 31; 0 < t && 0 == (e & 1 << t); t--);
        return 0 !== this.high_ ? t + 33 : t + 1
    }, Long$4.prototype.isZero = function() {
        return 0 === this.high_ && 0 === this.low_
    }, Long$4.prototype.isNegative = function() {
        return this.high_ < 0
    }, Long$4.prototype.isOdd = function() {
        return 1 == (1 & this.low_)
    }, Long$4.prototype.equals = function(e) {
        return this.high_ === e.high_ && this.low_ === e.low_
    }, Long$4.prototype.notEquals = function(e) {
        return this.high_ !== e.high_ || this.low_ !== e.low_
    }, Long$4.prototype.lessThan = function(e) {
        return this.compare(e) < 0
    }, Long$4.prototype.lessThanOrEqual = function(e) {
        return this.compare(e) <= 0
    }, Long$4.prototype.greaterThan = function(e) {
        return 0 < this.compare(e)
    }, Long$4.prototype.greaterThanOrEqual = function(e) {
        return 0 <= this.compare(e)
    }, Long$4.prototype.compare = function(e) {
        if (this.equals(e)) return 0;
        var t = this.isNegative(),
            r = e.isNegative();
        return t && !r ? -1 : !t && r ? 1 : this.subtract(e).isNegative() ? -1 : 1
    }, Long$4.prototype.negate = function() {
        return this.equals(Long$4.MIN_VALUE) ? Long$4.MIN_VALUE : this.not().add(Long$4.ONE)
    }, Long$4.prototype.add = function(e) {
        var t = this.high_ >>> 16,
            r = 65535 & this.high_,
            n = this.low_ >>> 16,
            i = 65535 & this.low_,
            o = e.high_ >>> 16,
            s = 65535 & e.high_,
            u = e.low_ >>> 16,
            a = 0,
            f = 0,
            c = 0,
            l = 0;
        return c += (l += i + (65535 & e.low_)) >>> 16, l &= 65535, f += (c += n + u) >>> 16, c &= 65535, a += (f += r + s) >>> 16, f &= 65535, a += t + o, a &= 65535, Long$4.fromBits(c << 16 | l, a << 16 | f)
    }, Long$4.prototype.subtract = function(e) {
        return this.add(e.negate())
    }, Long$4.prototype.multiply = function(e) {
        if (this.isZero()) return Long$4.ZERO;
        if (e.isZero()) return Long$4.ZERO;
        if (this.equals(Long$4.MIN_VALUE)) return e.isOdd() ? Long$4.MIN_VALUE : Long$4.ZERO;
        if (e.equals(Long$4.MIN_VALUE)) return this.isOdd() ? Long$4.MIN_VALUE : Long$4.ZERO;
        if (this.isNegative()) return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
        if (e.isNegative()) return this.multiply(e.negate()).negate();
        if (this.lessThan(Long$4.TWO_PWR_24_) && e.lessThan(Long$4.TWO_PWR_24_)) return Long$4.fromNumber(this.toNumber() * e.toNumber());
        var t = this.high_ >>> 16,
            r = 65535 & this.high_,
            n = this.low_ >>> 16,
            i = 65535 & this.low_,
            o = e.high_ >>> 16,
            s = 65535 & e.high_,
            u = e.low_ >>> 16,
            a = 65535 & e.low_,
            f = 0,
            c = 0,
            l = 0,
            h = 0;
        return l += (h += i * a) >>> 16, h &= 65535, c += (l += n * a) >>> 16, l &= 65535, c += (l += i * u) >>> 16, l &= 65535, f += (c += r * a) >>> 16, c &= 65535, f += (c += n * u) >>> 16, c &= 65535, f += (c += i * s) >>> 16, c &= 65535, f += t * a + r * u + n * s + i * o, f &= 65535, Long$4.fromBits(l << 16 | h, f << 16 | c)
    }, Long$4.prototype.div = function(e) {
        if (e.isZero()) throw Error("division by zero");
        if (this.isZero()) return Long$4.ZERO;
        if (this.equals(Long$4.MIN_VALUE)) {
            if (e.equals(Long$4.ONE) || e.equals(Long$4.NEG_ONE)) return Long$4.MIN_VALUE;
            if (e.equals(Long$4.MIN_VALUE)) return Long$4.ONE;
            var t = this.shiftRight(1).div(e).shiftLeft(1);
            if (t.equals(Long$4.ZERO)) return e.isNegative() ? Long$4.ONE : Long$4.NEG_ONE;
            var r = this.subtract(e.multiply(t));
            return t.add(r.div(e))
        }
        if (e.equals(Long$4.MIN_VALUE)) return Long$4.ZERO;
        if (this.isNegative()) return e.isNegative() ? this.negate().div(e.negate()) : this.negate().div(e).negate();
        if (e.isNegative()) return this.div(e.negate()).negate();
        var n = Long$4.ZERO;
        for (r = this; r.greaterThanOrEqual(e);) {
            t = Math.max(1, Math.floor(r.toNumber() / e.toNumber()));
            for (var i = Math.ceil(Math.log(t) / Math.LN2), o = i <= 48 ? 1 : Math.pow(2, i - 48), s = Long$4.fromNumber(t), u = s.multiply(e); u.isNegative() || u.greaterThan(r);) t -= o, u = (s = Long$4.fromNumber(t)).multiply(e);
            s.isZero() && (s = Long$4.ONE), n = n.add(s), r = r.subtract(u)
        }
        return n
    }, Long$4.prototype.modulo = function(e) {
        return this.subtract(this.div(e).multiply(e))
    }, Long$4.prototype.not = function() {
        return Long$4.fromBits(~this.low_, ~this.high_)
    }, Long$4.prototype.and = function(e) {
        return Long$4.fromBits(this.low_ & e.low_, this.high_ & e.high_)
    }, Long$4.prototype.or = function(e) {
        return Long$4.fromBits(this.low_ | e.low_, this.high_ | e.high_)
    }, Long$4.prototype.xor = function(e) {
        return Long$4.fromBits(this.low_ ^ e.low_, this.high_ ^ e.high_)
    }, Long$4.prototype.shiftLeft = function(e) {
        if (0 === (e &= 63)) return this;
        var t = this.low_;
        if (e < 32) {
            var r = this.high_;
            return Long$4.fromBits(t << e, r << e | t >>> 32 - e)
        }
        return Long$4.fromBits(0, t << e - 32)
    }, Long$4.prototype.shiftRight = function(e) {
        if (0 === (e &= 63)) return this;
        var t = this.high_;
        if (e < 32) {
            var r = this.low_;
            return Long$4.fromBits(r >>> e | t << 32 - e, t >> e)
        }
        return Long$4.fromBits(t >> e - 32, 0 <= t ? 0 : -1)
    }, Long$4.prototype.shiftRightUnsigned = function(e) {
        if (0 === (e &= 63)) return this;
        var t = this.high_;
        if (e < 32) {
            var r = this.low_;
            return Long$4.fromBits(r >>> e | t << 32 - e, t >>> e)
        }
        return 32 === e ? Long$4.fromBits(t, 0) : Long$4.fromBits(t >>> e - 32, 0)
    }, Long$4.fromInt = function(e) {
        if (-128 <= e && e < 128) {
            var t = Long$4.INT_CACHE_[e];
            if (t) return t
        }
        var r = new Long$4(0 | e, e < 0 ? -1 : 0);
        return -128 <= e && e < 128 && (Long$4.INT_CACHE_[e] = r), r
    }, Long$4.fromNumber = function(e) {
        return isNaN(e) || !isFinite(e) ? Long$4.ZERO : e <= -Long$4.TWO_PWR_63_DBL_ ? Long$4.MIN_VALUE : e + 1 >= Long$4.TWO_PWR_63_DBL_ ? Long$4.MAX_VALUE : e < 0 ? Long$4.fromNumber(-e).negate() : new Long$4(e % Long$4.TWO_PWR_32_DBL_ | 0, e / Long$4.TWO_PWR_32_DBL_ | 0)
    }, Long$4.fromBits = function(e, t) {
        return new Long$4(e, t)
    }, Long$4.fromString = function(e, t) {
        if (0 === e.length) throw Error("number format error: empty string");
        var r = t || 10;
        if (r < 2 || 36 < r) throw Error("radix out of range: " + r);
        if ("-" === e.charAt(0)) return Long$4.fromString(e.substring(1), r).negate();
        if (0 <= e.indexOf("-")) throw Error('number format error: interior "-" character: ' + e);
        for (var n = Long$4.fromNumber(Math.pow(r, 8)), i = Long$4.ZERO, o = 0; o < e.length; o += 8) {
            var s = Math.min(8, e.length - o),
                u = parseInt(e.substring(o, o + s), r);
            if (s < 8) {
                var a = Long$4.fromNumber(Math.pow(r, s));
                i = i.multiply(a).add(Long$4.fromNumber(u))
            } else i = (i = i.multiply(n)).add(Long$4.fromNumber(u))
        }
        return i
    }, Long$4.INT_CACHE_ = {}, Long$4.TWO_PWR_16_DBL_ = 65536, Long$4.TWO_PWR_24_DBL_ = 1 << 24, Long$4.TWO_PWR_32_DBL_ = Long$4.TWO_PWR_16_DBL_ * Long$4.TWO_PWR_16_DBL_, Long$4.TWO_PWR_31_DBL_ = Long$4.TWO_PWR_32_DBL_ / 2, Long$4.TWO_PWR_48_DBL_ = Long$4.TWO_PWR_32_DBL_ * Long$4.TWO_PWR_16_DBL_, Long$4.TWO_PWR_64_DBL_ = Long$4.TWO_PWR_32_DBL_ * Long$4.TWO_PWR_32_DBL_, Long$4.TWO_PWR_63_DBL_ = Long$4.TWO_PWR_64_DBL_ / 2, Long$4.ZERO = Long$4.fromInt(0), Long$4.ONE = Long$4.fromInt(1), Long$4.NEG_ONE = Long$4.fromInt(-1), Long$4.MAX_VALUE = Long$4.fromBits(-1, 2147483647), Long$4.MIN_VALUE = Long$4.fromBits(0, -2147483648), Long$4.TWO_PWR_24_ = Long$4.fromInt(1 << 24);
    var long_1$2 = Long$4,
        Long_1$2 = Long$4;

    function Double$3(e) {
        if (!(this instanceof Double$3)) return new Double$3(e);
        this._bsontype = "Double", this.value = e
    }
    long_1$2.Long = Long_1$2, Double$3.prototype.valueOf = function() {
        return this.value
    }, Double$3.prototype.toJSON = function() {
        return this.value
    };
    var double_1$2 = Double$3,
        Double_1$2 = Double$3;

    function Timestamp$3(e, t) {
        e instanceof long_1$2 ? long_1$2.call(this, e.low_, e.high_) : long_1$2.call(this, e, t), this._bsontype = "Timestamp"
    }
    double_1$2.Double = Double_1$2, Timestamp$3.prototype = Object.create(long_1$2.prototype), Timestamp$3.prototype.constructor = Timestamp$3, Timestamp$3.prototype.toJSON = function() {
        return {
            $timestamp: this.toString()
        }
    }, Timestamp$3.fromInt = function(e) {
        return new Timestamp$3(long_1$2.fromInt(e))
    }, Timestamp$3.fromNumber = function(e) {
        return new Timestamp$3(long_1$2.fromNumber(e))
    }, Timestamp$3.fromBits = function(e, t) {
        return new Timestamp$3(e, t)
    }, Timestamp$3.fromString = function(e, t) {
        return new Timestamp$3(long_1$2.fromString(e, t))
    };
    var timestamp$2 = Timestamp$3,
        Timestamp_1$2 = Timestamp$3,
        _endianness$1;

    function endianness$1() {
        if (void 0 === _endianness$1) {
            var e = new ArrayBuffer(2),
                t = new Uint8Array(e),
                r = new Uint16Array(e);
            if (t[0] = 1, t[1] = 2, 258 === r[0]) _endianness$1 = "BE";
            else {
                if (513 !== r[0]) throw new Error("unable to figure out endianess");
                _endianness$1 = "LE"
            }
        }
        return _endianness$1
    }

    function hostname$2() {
        return void 0 !== global$1.location ? global$1.location.hostname : ""
    }

    function loadavg$1() {
        return []
    }

    function uptime$2() {
        return 0
    }

    function freemem$1() {
        return Number.MAX_VALUE
    }

    function totalmem$1() {
        return Number.MAX_VALUE
    }

    function cpus$1() {
        return []
    }

    function type$1() {
        return "Browser"
    }

    function release$2() {
        return void 0 !== global$1.navigator ? global$1.navigator.appVersion : ""
    }

    function networkInterfaces$1() {}

    function getNetworkInterfaces$1() {}

    function arch$1() {
        return "javascript"
    }

    function platform$2() {
        return "browser"
    }

    function tmpDir$1() {
        return "/tmp"
    }
    timestamp$2.Timestamp = Timestamp_1$2;
    var tmpdir$1 = tmpDir$1,
        EOL$1 = "\n",
        os$2 = {
            EOL: EOL$1,
            tmpdir: tmpdir$1,
            tmpDir: tmpDir$1,
            networkInterfaces: networkInterfaces$1,
            getNetworkInterfaces: getNetworkInterfaces$1,
            release: release$2,
            type: type$1,
            cpus: cpus$1,
            totalmem: totalmem$1,
            freemem: freemem$1,
            uptime: uptime$2,
            loadavg: loadavg$1,
            hostname: hostname$2,
            endianness: endianness$1
        }, os$1$1 = Object.freeze({
            endianness: endianness$1,
            hostname: hostname$2,
            loadavg: loadavg$1,
            uptime: uptime$2,
            freemem: freemem$1,
            totalmem: totalmem$1,
            cpus: cpus$1,
            type: type$1,
            release: release$2,
            networkInterfaces: networkInterfaces$1,
            getNetworkInterfaces: getNetworkInterfaces$1,
            arch: arch$1,
            platform: platform$2,
            tmpDir: tmpDir$1,
            tmpdir: tmpdir$1,
            EOL: EOL$1,
            default: os$2
        }),
        Buffer$a = buffer.Buffer,
        MASK_8$1 = 255,
        MASK_24$1 = 16777215,
        MASK_32$1 = 4294967295,
        FNV_PRIME$1 = new long_1$2(16777619, 0),
        OFFSET_BASIS$1 = new long_1$2(2166136261, 0),
        FNV_MASK$1 = new long_1$2(MASK_32$1, 0);

    function fnv1a32$1(e, t) {
        t = t || "utf8";
        for (var r = Buffer$a.from(e, t), n = OFFSET_BASIS$1, i = 0; i < r.length; i += 1) n = (n = (n = n.xor(new long_1$2(r[i], 0))).multiply(FNV_PRIME$1)).and(FNV_MASK$1);
        return n.getLowBitsUnsigned()
    }

    function fnv1a24$2(e, t) {
        var r = fnv1a32$1(e, t);
        return (r & MASK_24$1 ^ r >>> 24 & MASK_8$1) & MASK_24$1
    }
    var fnv1a$1 = {
        fnv1a24: fnv1a24$2,
        fnv1a32: fnv1a32$1
    }, require$$1$1 = os$1$1 && os$2 || os$1$1,
        Buffer$1$1 = buffer.Buffer,
        hostname$1$1 = require$$1$1.hostname,
        fnv1a24$1$1 = fnv1a$1.fnv1a24,
        MACHINE_ID$1 = fnv1a24$1$1(hostname$1$1),
        checkForHexRegExp$1 = new RegExp("^[0-9a-fA-F]{24}$"),
        hasBufferType$1 = !1;
    try {
        Buffer$1$1 && Buffer$1$1.from && (hasBufferType$1 = !0)
    } catch (e) {
        hasBufferType$1 = !1
    }

    function ObjectID$3(e) {
        if (e instanceof ObjectID$3) return e;
        if (!(this instanceof ObjectID$3)) return new ObjectID$3(e);
        if (this._bsontype = "ObjectID", null == e || "number" == typeof e) return this.id = this.generate(e), void(ObjectID$3.cacheHexString && (this.__id = this.toString("hex")));
        var t = ObjectID$3.isValid(e);
        if (!t && null != e) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        if (t && "string" == typeof e && 24 === e.length && hasBufferType$1) return new ObjectID$3(new Buffer$1$1(e, "hex"));
        if (t && "string" == typeof e && 24 === e.length) return ObjectID$3.createFromHexString(e);
        if (null == e || 12 !== e.length) {
            if (null != e && e.toHexString) return e;
            throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
        }
        this.id = e, ObjectID$3.cacheHexString && (this.__id = this.toString("hex"))
    }
    for (var hexTable$1 = [], i$2 = 0; i$2 < 256; i$2++) hexTable$1[i$2] = (i$2 <= 15 ? "0" : "") + i$2.toString(16);
    ObjectID$3.prototype.toHexString = function() {
        if (ObjectID$3.cacheHexString && this.__id) return this.__id;
        var e = "";
        if (!this.id || !this.id.length) throw new TypeError("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [" + JSON.stringify(this.id) + "]");
        if (this.id instanceof _Buffer$1) return e = convertToHex$1(this.id), ObjectID$3.cacheHexString && (this.__id = e), e;
        for (var t = 0; t < this.id.length; t++) e += hexTable$1[this.id.charCodeAt(t)];
        return ObjectID$3.cacheHexString && (this.__id = e), e
    }, ObjectID$3.prototype.get_inc = function() {
        return ObjectID$3.index = (ObjectID$3.index + 1) % 16777215
    }, ObjectID$3.prototype.getInc = function() {
        return this.get_inc()
    }, ObjectID$3.prototype.generate = function(e) {
        "number" != typeof e && (e = ~~ (Date.now() / 1e3));
        var t = (void 0 === process || 1 === process.pid ? Math.floor(1e5 * Math.random()) : process.pid) % 65535,
            r = this.get_inc(),
            n = new Buffer$1$1(12);
        return n[3] = 255 & e, n[2] = e >> 8 & 255, n[1] = e >> 16 & 255, n[0] = e >> 24 & 255, n[6] = 255 & MACHINE_ID$1, n[5] = MACHINE_ID$1 >> 8 & 255, n[4] = MACHINE_ID$1 >> 16 & 255, n[8] = 255 & t, n[7] = t >> 8 & 255, n[11] = 255 & r, n[10] = r >> 8 & 255, n[9] = r >> 16 & 255, n
    }, ObjectID$3.prototype.toString = function(e) {
        return this.id && this.id.copy ? this.id.toString("string" == typeof e ? e : "hex") : this.toHexString()
    }, ObjectID$3.prototype.inspect = ObjectID$3.prototype.toString, ObjectID$3.prototype.toJSON = function() {
        return this.toHexString()
    }, ObjectID$3.prototype.equals = function(e) {
        return e instanceof ObjectID$3 ? this.toString() === e.toString() : "string" == typeof e && ObjectID$3.isValid(e) && 12 === e.length && this.id instanceof _Buffer$1 ? e === this.id.toString("binary") : "string" == typeof e && ObjectID$3.isValid(e) && 24 === e.length ? e.toLowerCase() === this.toHexString() : "string" == typeof e && ObjectID$3.isValid(e) && 12 === e.length ? e === this.id : !(null == e || !(e instanceof ObjectID$3 || e.toHexString)) && e.toHexString() === this.toHexString()
    }, ObjectID$3.prototype.getTimestamp = function() {
        var e = new Date,
            t = this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
        return e.setTime(1e3 * Math.floor(t)), e
    }, ObjectID$3.index = ~~ (16777215 * Math.random()), ObjectID$3.createPk = function() {
        return new ObjectID$3
    }, ObjectID$3.createFromTime = function(e) {
        var t = new Buffer$1$1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        return t[3] = 255 & e, t[2] = e >> 8 & 255, t[1] = e >> 16 & 255, t[0] = e >> 24 & 255, new ObjectID$3(t)
    };
    var decodeLookup$1 = [];
    for (i$2 = 0; i$2 < 10;) decodeLookup$1[48 + i$2] = i$2++;
    for (; i$2 < 16;) decodeLookup$1[55 + i$2] = decodeLookup$1[87 + i$2] = i$2++;
    var _Buffer$1 = Buffer$1$1,
        convertToHex$1 = function(e) {
            return e.toString("hex")
        };
    ObjectID$3.createFromHexString = function(e) {
        if (void 0 === e || null != e && 24 !== e.length) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        if (hasBufferType$1) return new ObjectID$3(new Buffer$1$1(e, "hex"));
        for (var t = new _Buffer$1(12), r = 0, n = 0; n < 24;) t[r++] = decodeLookup$1[e.charCodeAt(n++)] << 4 | decodeLookup$1[e.charCodeAt(n++)];
        return new ObjectID$3(t)
    }, ObjectID$3.isValid = function(e) {
        return null != e && ("number" == typeof e || ("string" == typeof e ? 12 === e.length || 24 === e.length && checkForHexRegExp$1.test(e) : e instanceof ObjectID$3 || (e instanceof _Buffer$1 || !! e.toHexString && (12 === e.id.length || 24 === e.id.length && checkForHexRegExp$1.test(e.id)))))
    }, Object.defineProperty(ObjectID$3.prototype, "generationTime", {
        enumerable: !0,
        get: function() {
            return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24
        },
        set: function(e) {
            this.id[3] = 255 & e, this.id[2] = e >> 8 & 255, this.id[1] = e >> 16 & 255, this.id[0] = e >> 24 & 255
        }
    });
    var objectid$2 = ObjectID$3,
        ObjectID_1$2 = ObjectID$3,
        ObjectId$2 = ObjectID$3;

    function alphabetize$1(e) {
        return e.split("").sort().join("")
    }

    function BSONRegExp$3(e, t) {
        if (!(this instanceof BSONRegExp$3)) return new BSONRegExp$3(e, t);
        this._bsontype = "BSONRegExp", this.pattern = e || "", this.options = t ? alphabetize$1(t) : "";
        for (var r = 0; r < this.options.length; r++)
            if ("i" !== this.options[r] && "m" !== this.options[r] && "x" !== this.options[r] && "l" !== this.options[r] && "s" !== this.options[r] && "u" !== this.options[r]) throw new Error("the regular expression options [" + this.options[r] + "] is not supported")
    }
    objectid$2.ObjectID = ObjectID_1$2, objectid$2.ObjectId = ObjectId$2;
    var regexp$3 = BSONRegExp$3,
        BSONRegExp_1$2 = BSONRegExp$3;

    function _Symbol$2(e) {
        if (!(this instanceof _Symbol$2)) return new _Symbol$2(e);
        this._bsontype = "Symbol", this.value = e
    }
    regexp$3.BSONRegExp = BSONRegExp_1$2, _Symbol$2.prototype.valueOf = function() {
        return this.value
    }, _Symbol$2.prototype.toString = function() {
        return this.value
    }, _Symbol$2.prototype.inspect = function() {
        return this.value
    }, _Symbol$2.prototype.toJSON = function() {
        return this.value
    };
    var symbol$2 = _Symbol$2,
        Symbol_1$2 = _Symbol$2;

    function Int32$1(e) {
        if (!(this instanceof Int32$1)) return new Int32$1(e);
        this._bsontype = "Int32", this.value = e
    }
    symbol$2.Symbol = Symbol_1$2, Int32$1.prototype.valueOf = function() {
        return this.value
    }, Int32$1.prototype.toJSON = function() {
        return this.value
    };
    var int_32$2 = Int32$1,
        Int32_1$2 = Int32$1;

    function Code$3(e, t) {
        if (!(this instanceof Code$3)) return new Code$3(e, t);
        this._bsontype = "Code", this.code = e, this.scope = t
    }
    int_32$2.Int32 = Int32_1$2, Code$3.prototype.toJSON = function() {
        return {
            scope: this.scope,
            code: this.code
        }
    };
    var code$3 = Code$3,
        Code_1$2 = Code$3;
    code$3.Code = Code_1$2;
    var Buffer$2$1 = buffer.Buffer,
        PARSE_STRING_REGEXP$1 = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/,
        PARSE_INF_REGEXP$1 = /^(\+|-)?(Infinity|inf)$/i,
        PARSE_NAN_REGEXP$1 = /^(\+|-)?NaN$/i,
        EXPONENT_MAX$1 = 6111,
        EXPONENT_MIN$1 = -6176,
        EXPONENT_BIAS$1 = 6176,
        MAX_DIGITS$1 = 34,
        NAN_BUFFER$1 = [124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_NEGATIVE_BUFFER$1 = [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_POSITIVE_BUFFER$1 = [120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        EXPONENT_REGEX$1 = /^([-+])?(\d+)?$/,
        isDigit$1 = function(e) {
            return !isNaN(parseInt(e, 10))
        }, divideu128$1 = function(e) {
            var t = long_1$2.fromNumber(1e9),
                r = long_1$2.fromNumber(0);
            if (!(e.parts[0] || e.parts[1] || e.parts[2] || e.parts[3])) return {
                quotient: e,
                rem: r
            };
            for (var n = 0; n <= 3; n++) r = (r = r.shiftLeft(32)).add(new long_1$2(e.parts[n], 0)), e.parts[n] = r.div(t).low_, r = r.modulo(t);
            return {
                quotient: e,
                rem: r
            }
        }, multiply64x2$1 = function(e, t) {
            if (!e && !t) return {
                high: long_1$2.fromNumber(0),
                low: long_1$2.fromNumber(0)
            };
            var r = e.shiftRightUnsigned(32),
                n = new long_1$2(e.getLowBits(), 0),
                i = t.shiftRightUnsigned(32),
                o = new long_1$2(t.getLowBits(), 0),
                s = r.multiply(i),
                u = r.multiply(o),
                a = n.multiply(i),
                f = n.multiply(o);
            return s = s.add(u.shiftRightUnsigned(32)), u = new long_1$2(u.getLowBits(), 0).add(a).add(f.shiftRightUnsigned(32)), {
                high: s = s.add(u.shiftRightUnsigned(32)),
                low: f = u.shiftLeft(32).add(new long_1$2(f.getLowBits(), 0))
            }
        }, lessThan$1 = function(e, t) {
            var r = e.high_ >>> 0,
                n = t.high_ >>> 0;
            return r < n || r === n && e.low_ >>> 0 < t.low_ >>> 0
        }, invalidErr$1 = function(e, t) {
            throw new TypeError('"${string}" not a valid Decimal128 string - ' + t)
        };

    function Decimal128$1(e) {
        this._bsontype = "Decimal128", this.bytes = e
    }
    Decimal128$1.fromString = function(e) {
        var t, r = !1,
            n = !1,
            i = !1,
            o = 0,
            s = 0,
            u = 0,
            a = 0,
            f = 0,
            c = [0],
            l = 0,
            h = 0,
            p = 0,
            d = 0,
            y = 0,
            _ = 0,
            g = [0, 0],
            $ = [0, 0],
            b = 0;
        if (7e3 <= e.length) throw new TypeError(e + " not a valid Decimal128 string");
        var S = e.match(PARSE_STRING_REGEXP$1),
            m = e.match(PARSE_INF_REGEXP$1),
            N = e.match(PARSE_NAN_REGEXP$1);
        if (!S && !m && !N || 0 === e.length) throw new TypeError(e + " not a valid Decimal128 string");
        if (S) {
            var E = S[2],
                B = S[4],
                O = S[5],
                A = S[6];
            B && void 0 === A && invalidErr$1(e, "missing exponent power"), B && void 0 === E && invalidErr$1(e, "missing exponent base"), void 0 === B && (O || A) && invalidErr$1(e, "missing e before exponent")
        }
        if ("+" !== e[b] && "-" !== e[b] || (r = "-" === e[b++]), !isDigit$1(e[b]) && "." !== e[b]) {
            if ("i" === e[b] || "I" === e[b]) return new Decimal128$1(new Buffer$2$1(r ? INF_NEGATIVE_BUFFER$1 : INF_POSITIVE_BUFFER$1));
            if ("N" === e[b]) return new Decimal128$1(new Buffer$2$1(NAN_BUFFER$1))
        }
        for (; isDigit$1(e[b]) || "." === e[b];) "." !== e[b] ? (l < 34 && ("0" !== e[b] || i) && (i || (f = s), i = !0, c[h++] = parseInt(e[b], 10), l += 1), i && (u += 1), n && (a += 1), s += 1) : (n && invalidErr$1(e, "contains multiple periods"), n = !0), b += 1;
        if (n && !s) throw new TypeError(e + " not a valid Decimal128 string");
        if ("e" === e[b] || "E" === e[b]) {
            var v = e.substr(++b).match(EXPONENT_REGEX$1);
            if (!v || !v[2]) return new Decimal128$1(new Buffer$2$1(NAN_BUFFER$1));
            y = parseInt(v[0], 10), b += v[0].length
        }
        if (e[b]) return new Decimal128$1(new Buffer$2$1(NAN_BUFFER$1));
        if (p = 0, l) {
            if (d = l - 1, 1 !== (o = u))
                for (;
                    "0" === e[f + o - 1];) o -= 1
        } else l = u = 1, o = c[d = p = 0] = 0;
        for (y <= a && 16384 < a - y ? y = EXPONENT_MIN$1 : y -= a; EXPONENT_MAX$1 < y;) {
            if (MAX_DIGITS$1 < (d += 1) - p) {
                var w = c.join("");
                if (w.match(/^0+$/)) {
                    y = EXPONENT_MAX$1;
                    break
                }
                invalidErr$1(e, "overflow")
            }
            y -= 1
        }
        for (; y < EXPONENT_MIN$1 || l < u;) {
            if (0 === d && o < l) {
                y = EXPONENT_MIN$1, o = 0;
                break
            }
            if (l < u ? u -= 1 : d -= 1, y < EXPONENT_MAX$1) y += 1;
            else {
                if ((w = c.join("")).match(/^0+$/)) {
                    y = EXPONENT_MAX$1;
                    break
                }
                invalidErr$1(e, "overflow")
            }
        }
        if (d - p + 1 < o) {
            var I = s;
            n && (f += 1, I += 1), r && (f += 1, I += 1);
            var T = parseInt(e[f + d + 1], 10),
                R = 0;
            if (5 <= T && (R = 1, 5 === T))
                for (R = c[d] % 2 == 1, _ = f + d + 2; _ < I; _++)
                    if (parseInt(e[_], 10)) {
                        R = 1;
                        break
                    }
            if (R)
                for (var D = d; 0 <= D; D--)
                    if (9 < ++c[D] && (c[D] = 0) === D) {
                        if (!(y < EXPONENT_MAX$1)) return new Decimal128$1(new Buffer$2$1(r ? INF_NEGATIVE_BUFFER$1 : INF_POSITIVE_BUFFER$1));
                        y += 1, c[D] = 1
                    }
        }
        if (g = long_1$2.fromNumber(0), $ = long_1$2.fromNumber(0), 0 === o) g = long_1$2.fromNumber(0), $ = long_1$2.fromNumber(0);
        else if (d - p < 17)
            for (D = p, $ = long_1$2.fromNumber(c[D++]), g = new long_1$2(0, 0); D <= d; D++) $ = ($ = $.multiply(long_1$2.fromNumber(10))).add(long_1$2.fromNumber(c[D]));
        else {
            for (D = p, g = long_1$2.fromNumber(c[D++]); D <= d - 17; D++) g = (g = g.multiply(long_1$2.fromNumber(10))).add(long_1$2.fromNumber(c[D]));
            for ($ = long_1$2.fromNumber(c[D++]); D <= d; D++) $ = ($ = $.multiply(long_1$2.fromNumber(10))).add(long_1$2.fromNumber(c[D]))
        }
        var L = multiply64x2$1(g, long_1$2.fromString("100000000000000000"));
        L.low = L.low.add($), lessThan$1(L.low, $) && (L.high = L.high.add(long_1$2.fromNumber(1))), t = y + EXPONENT_BIAS$1;
        var x = {
            low: long_1$2.fromNumber(0),
            high: long_1$2.fromNumber(0)
        };
        L.high.shiftRightUnsigned(49).and(long_1$2.fromNumber(1)).equals(long_1$2.fromNumber) ? (x.high = x.high.or(long_1$2.fromNumber(3).shiftLeft(61)), x.high = x.high.or(long_1$2.fromNumber(t).and(long_1$2.fromNumber(16383).shiftLeft(47))), x.high = x.high.or(L.high.and(long_1$2.fromNumber(0x7fffffffffff)))) : (x.high = x.high.or(long_1$2.fromNumber(16383 & t).shiftLeft(49)), x.high = x.high.or(L.high.and(long_1$2.fromNumber(562949953421311)))), x.low = L.low, r && (x.high = x.high.or(long_1$2.fromString("9223372036854775808")));
        var C = new Buffer$2$1(16);
        return b = 0, C[b++] = 255 & x.low.low_, C[b++] = x.low.low_ >> 8 & 255, C[b++] = x.low.low_ >> 16 & 255, C[b++] = x.low.low_ >> 24 & 255, C[b++] = 255 & x.low.high_, C[b++] = x.low.high_ >> 8 & 255, C[b++] = x.low.high_ >> 16 & 255, C[b++] = x.low.high_ >> 24 & 255, C[b++] = 255 & x.high.low_, C[b++] = x.high.low_ >> 8 & 255, C[b++] = x.high.low_ >> 16 & 255, C[b++] = x.high.low_ >> 24 & 255, C[b++] = 255 & x.high.high_, C[b++] = x.high.high_ >> 8 & 255, C[b++] = x.high.high_ >> 16 & 255, C[b++] = x.high.high_ >> 24 & 255, new Decimal128$1(C)
    };
    var COMBINATION_MASK$1 = 31,
        EXPONENT_MASK$1 = 16383,
        COMBINATION_INFINITY$1 = 30,
        COMBINATION_NAN$1 = 31;
    EXPONENT_BIAS$1 = 6176, Decimal128$1.prototype.toString = function() {
        for (var e, t, r, n, i, o, s = 0, u = new Array(36), a = 0; a < u.length; a++) u[a] = 0;
        var f, c, l, h, p, d = 0,
            y = !1,
            _ = {
                parts: new Array(4)
            }, g = [];
        d = 0;
        var $ = this.bytes;
        if (n = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, r = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, t = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, e = $[d++] | $[d++] << 8 | $[d++] << 16 | $[d++] << 24, d = 0, {
            low: new long_1$2(n, r),
            high: new long_1$2(t, e)
        }.high.lessThan(long_1$2.ZERO) && g.push("-"), (i = e >> 26 & COMBINATION_MASK$1) >> 3 == 3) {
            if (i === COMBINATION_INFINITY$1) return g.join("") + "Infinity";
            if (i === COMBINATION_NAN$1) return "NaN";
            o = e >> 15 & EXPONENT_MASK$1, l = 8 + (e >> 14 & 1)
        } else l = e >> 14 & 7, o = e >> 17 & EXPONENT_MASK$1; if (f = o - EXPONENT_BIAS$1, _.parts[0] = (16383 & e) + ((15 & l) << 14), _.parts[1] = t, _.parts[2] = r, _.parts[3] = n, 0 === _.parts[0] && 0 === _.parts[1] && 0 === _.parts[2] && 0 === _.parts[3]) y = !0;
        else
            for (p = 3; 0 <= p; p--) {
                var b = 0,
                    S = divideu128$1(_);
                if (_ = S.quotient, b = S.rem.low_)
                    for (h = 8; 0 <= h; h--) u[9 * p + h] = b % 10, b = Math.floor(b / 10)
            }
        if (y) s = 1, u[d] = 0;
        else
            for (s = 36, a = 0; !u[d];) a++, s -= 1, d += 1; if (34 <= (c = s - 1 + f) || c <= -7 || 0 < f) {
            if (34 < s) return g.push(0), 0 < f ? g.push("E+" + f) : f < 0 && g.push("E" + f), g.join("");
            for (g.push(u[d++]), (s -= 1) && g.push("."), a = 0; a < s; a++) g.push(u[d++]);
            g.push("E"), 0 < c ? g.push("+" + c) : g.push(c)
        } else if (0 <= f)
            for (a = 0; a < s; a++) g.push(u[d++]);
        else {
            var m = s + f;
            if (0 < m)
                for (a = 0; a < m; a++) g.push(u[d++]);
            else g.push("0");
            for (g.push("."); m++ < 0;) g.push("0");
            for (a = 0; a < s - Math.max(m - 1, 0); a++) g.push(u[d++])
        }
        return g.join("")
    }, Decimal128$1.prototype.toJSON = function() {
        return {
            $numberDecimal: this.toString()
        }
    };
    var decimal128$2 = Decimal128$1,
        Decimal128_1$2 = Decimal128$1;

    function MinKey$4() {
        if (!(this instanceof MinKey$4)) return new MinKey$4;
        this._bsontype = "MinKey"
    }
    decimal128$2.Decimal128 = Decimal128_1$2;
    var min_key$2 = MinKey$4,
        MinKey_1$2 = MinKey$4;

    function MaxKey$3() {
        if (!(this instanceof MaxKey$3)) return new MaxKey$3;
        this._bsontype = "MaxKey"
    }
    min_key$2.MinKey = MinKey_1$2;
    var max_key$2 = MaxKey$3,
        MaxKey_1$2 = MaxKey$3;

    function DBRef$3(e, t, r, n) {
        if (!(this instanceof DBRef$3)) return new DBRef$3(e, t, r, n);
        var i = e.split(".");
        2 === i.length && (r = i.shift(), e = i.shift()), this._bsontype = "DBRef", this.collection = e, this.oid = t, this.db = r, this.fields = n || {}
    }
    max_key$2.MaxKey = MaxKey_1$2, DBRef$3.prototype.toJSON = function() {
        var e = {
            $ref: this.collection,
            $id: this.oid
        };
        return null != this.db && (e.$db = this.db), e = Object.assign(e, this.fields)
    };
    var db_ref$2 = DBRef$3,
        DBRef_1$2 = DBRef$3;
    db_ref$2.DBRef = DBRef_1$2;
    var Buffer$3$1 = buffer.Buffer;

    function Binary$4(e, t) {
        if (!(this instanceof Binary$4)) return new Binary$4(e, t);
        if (!(null == e || "string" == typeof e || Buffer$3$1.isBuffer(e) || e instanceof Uint8Array || Array.isArray(e))) throw new Error("only String, Buffer, Uint8Array or Array accepted");
        if (this._bsontype = "Binary", e instanceof Number ? this.sub_type = e : this.sub_type = null == t ? BSON_BINARY_SUBTYPE_DEFAULT$1 : t, this.position = 0, null == e || e instanceof Number) void 0 !== Buffer$3$1 ? this.buffer = new Buffer$3$1(Binary$4.BUFFER_SIZE) : "undefined" != typeof Uint8Array ? this.buffer = new Uint8Array(new ArrayBuffer(Binary$4.BUFFER_SIZE)) : this.buffer = new Array(Binary$4.BUFFER_SIZE), this.position = 0;
        else {
            if ("string" == typeof e)
                if (void 0 !== Buffer$3$1) this.buffer = new Buffer$3$1(e);
                else {
                    if ("undefined" == typeof Uint8Array && "[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                    this.buffer = writeStringToArray$1(e)
                } else this.buffer = e;
            this.position = e.length
        }
    }
    Binary$4.prototype.put = function(e) {
        if (null != e.length && "number" != typeof e && 1 !== e.length) throw new TypeError("only accepts single character String, Uint8Array or Array");
        if ("number" != typeof e && e < 0 || 255 < e) throw new TypeError("only accepts number in a valid unsigned byte range 0-255");
        var t = null;
        if (t = "string" == typeof e ? e.charCodeAt(0) : null != e.length ? e[0] : e, this.buffer.length > this.position) this.buffer[this.position++] = t;
        else if (void 0 !== Buffer$3$1 && Buffer$3$1.isBuffer(this.buffer)) {
            var r = new Buffer$3$1(Binary$4.BUFFER_SIZE + this.buffer.length);
            this.buffer.copy(r, 0, 0, this.buffer.length), this.buffer = r, this.buffer[this.position++] = t
        } else {
            r = null, r = "[object Uint8Array]" === Object.prototype.toString.call(this.buffer) ? new Uint8Array(new ArrayBuffer(Binary$4.BUFFER_SIZE + this.buffer.length)) : new Array(Binary$4.BUFFER_SIZE + this.buffer.length);
            for (var n = 0; n < this.buffer.length; n++) r[n] = this.buffer[n];
            this.buffer = r, this.buffer[this.position++] = t
        }
    }, Binary$4.prototype.write = function(e, t) {
        if (t = "number" == typeof t ? t : this.position, this.buffer.length < t + e.length) {
            var r = null;
            if (void 0 !== Buffer$3$1 && Buffer$3$1.isBuffer(this.buffer)) r = new Buffer$3$1(this.buffer.length + e.length), this.buffer.copy(r, 0, 0, this.buffer.length);
            else if ("[object Uint8Array]" === Object.prototype.toString.call(this.buffer)) {
                r = new Uint8Array(new ArrayBuffer(this.buffer.length + e.length));
                for (var n = 0; n < this.position; n++) r[n] = this.buffer[n]
            }
            this.buffer = r
        }
        if (void 0 !== Buffer$3$1 && Buffer$3$1.isBuffer(e) && Buffer$3$1.isBuffer(this.buffer)) e.copy(this.buffer, t, 0, e.length), this.position = t + e.length > this.position ? t + e.length : this.position;
        else if (void 0 !== Buffer$3$1 && "string" == typeof e && Buffer$3$1.isBuffer(this.buffer)) this.buffer.write(e, t, "binary"), this.position = t + e.length > this.position ? t + e.length : this.position;
        else if ("[object Uint8Array]" === Object.prototype.toString.call(e) || "[object Array]" === Object.prototype.toString.call(e) && "string" != typeof e) {
            for (n = 0; n < e.length; n++) this.buffer[t++] = e[n];
            this.position = t > this.position ? t : this.position
        } else if ("string" == typeof e) {
            for (n = 0; n < e.length; n++) this.buffer[t++] = e.charCodeAt(n);
            this.position = t > this.position ? t : this.position
        }
    }, Binary$4.prototype.read = function(e, t) {
        if (t = t && 0 < t ? t : this.position, this.buffer.slice) return this.buffer.slice(e, e + t);
        for (var r = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(t)) : new Array(t), n = 0; n < t; n++) r[n] = this.buffer[e++];
        return r
    }, Binary$4.prototype.value = function(e) {
        if ((e = null != e && e) && void 0 !== Buffer$3$1 && Buffer$3$1.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;
        if (void 0 !== Buffer$3$1 && Buffer$3$1.isBuffer(this.buffer)) return e ? this.buffer.slice(0, this.position) : this.buffer.toString("binary", 0, this.position);
        if (e) {
            if (null != this.buffer.slice) return this.buffer.slice(0, this.position);
            for (var t = "[object Uint8Array]" === Object.prototype.toString.call(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position), r = 0; r < this.position; r++) t[r] = this.buffer[r];
            return t
        }
        return convertArraytoUtf8BinaryString$1(this.buffer, 0, this.position)
    }, Binary$4.prototype.length = function() {
        return this.position
    }, Binary$4.prototype.toJSON = function() {
        return null != this.buffer ? this.buffer.toString("base64") : ""
    }, Binary$4.prototype.toString = function(e) {
        return null != this.buffer ? this.buffer.slice(0, this.position).toString(e) : ""
    };
    var BSON_BINARY_SUBTYPE_DEFAULT$1 = 0,
        writeStringToArray$1 = function(e) {
            for (var t = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(e.length)) : new Array(e.length), r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
            return t
        }, convertArraytoUtf8BinaryString$1 = function(e, t, r) {
            for (var n = "", i = t; i < r; i++) n += String.fromCharCode(e[i]);
            return n
        };
    Binary$4.BUFFER_SIZE = 256, Binary$4.SUBTYPE_DEFAULT = 0, Binary$4.SUBTYPE_FUNCTION = 1, Binary$4.SUBTYPE_BYTE_ARRAY = 2, Binary$4.SUBTYPE_UUID_OLD = 3, Binary$4.SUBTYPE_UUID = 4, Binary$4.SUBTYPE_MD5 = 5, Binary$4.SUBTYPE_USER_DEFINED = 128;
    var binary$2 = Binary$4,
        Binary_1$2 = Binary$4;
    binary$2.Binary = Binary_1$2;
    var Buffer$4$1 = buffer.Buffer,
        Long$1$1 = long_1$2.Long,
        Double$1$1 = double_1$2.Double,
        Timestamp$1$1 = timestamp$2.Timestamp,
        ObjectID$1$1 = objectid$2.ObjectID,
        Code$1$1 = code$3.Code,
        MinKey$1$1 = min_key$2.MinKey,
        MaxKey$1$1 = max_key$2.MaxKey,
        DBRef$1$1 = db_ref$2.DBRef,
        BSONRegExp$1$1 = regexp$3.BSONRegExp,
        Binary$1$1 = binary$2.Binary,
        deserialize$1 = function(e, t, r) {
            var n = (t = null == t ? {} : t) && t.index ? t.index : 0,
                i = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
            if (i < 5) throw new Error("bson size must be >= 5, is " + i);
            if (t.allowObjectSmallerThanBufferSize && Buffer$4$1.byteLength(e) < i) throw new Error("buffer length " + Buffer$4$1.byteLength(e) + " must be >= bson size " + i);
            if (!t.allowObjectSmallerThanBufferSize && Buffer$4$1.byteLength(e) !== i) throw new Error("buffer length " + Buffer$4$1.byteLength(e) + " must === bson size " + i);
            if (i + n > Buffer$4$1.byteLength(e)) throw new Error("(bson size " + i + " + options.index " + n + " must be <= buffer length " + Buffer$4$1.byteLength(e) + ")");
            if (0 !== e[n + i - 1]) throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
            return deserializeObject$1(e, n, t, r)
        }, deserializeObject$1 = function e(t, r, n, i) {
            var o = null != n.evalFunctions && n.evalFunctions,
                s = null != n.cacheFunctions && n.cacheFunctions,
                u = null != n.cacheFunctionsCrc32 && n.cacheFunctionsCrc32;
            if (!u) var a = null;
            var f = null == n.fieldsAsRaw ? null : n.fieldsAsRaw,
                c = null != n.raw && n.raw,
                l = "boolean" == typeof n.bsonRegExp && n.bsonRegExp,
                h = null != n.promoteBuffers && n.promoteBuffers,
                p = null == n.promoteLongs || n.promoteLongs,
                d = null == n.promoteValues || n.promoteValues,
                y = r;
            if (Buffer$4$1.byteLength(t) < 5) throw new Error("corrupt bson message < 5 bytes long");
            var _ = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
            if (_ < 5 || _ > Buffer$4$1.byteLength(t)) throw new Error("corrupt bson message");
            for (var g = i ? [] : {}, $ = 0;;) {
                var b = t[r++];
                if (0 === b) break;
                for (var S = r; 0 !== t[S] && S < Buffer$4$1.byteLength(t);) S++;
                if (S >= Buffer$4$1.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                var m = i ? $++ : t.toString("utf8", r, S);
                if (r = S + 1, b === BSON$5.BSON_DATA_STRING) {
                    var N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    if (N <= 0 || N > Buffer$4$1.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    var E = t.toString("utf8", r, r + N - 1);
                    for (S = 0; S < E.length; S++)
                        if (65533 === E.charCodeAt(S)) throw new Error("Invalid UTF-8 string in BSON document");
                    g[m] = E, r += N
                } else if (b === BSON$5.BSON_DATA_OID) {
                    var B = new Buffer$4$1(12);
                    t.copy(B, 0, r, r + 12), g[m] = new ObjectID$1$1(B), r += 12
                } else if (b === BSON$5.BSON_DATA_INT && !1 === d) g[m] = new int_32$2(t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24);
                else if (b === BSON$5.BSON_DATA_INT) g[m] = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                else if (b === BSON$5.BSON_DATA_NUMBER && !1 === d) g[m] = new Double$1$1(t.readDoubleLE(r)), r += 8;
                else if (b === BSON$5.BSON_DATA_NUMBER) g[m] = t.readDoubleLE(r), r += 8;
                else if (b === BSON$5.BSON_DATA_DATE) {
                    var O = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24,
                        A = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    g[m] = new Date(new Long$1$1(O, A).toNumber())
                } else if (b === BSON$5.BSON_DATA_BOOLEAN) {
                    if (0 !== t[r] && 1 !== t[r]) throw new Error("illegal boolean type value");
                    g[m] = 1 === t[r++]
                } else if (b === BSON$5.BSON_DATA_OBJECT) {
                    var v = r,
                        w = t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24;
                    if (w <= 0 || w > Buffer$4$1.byteLength(t) - r) throw new Error("bad embedded document length in bson");
                    g[m] = c ? t.slice(r, r + w) : e(t, v, n, !1), r += w
                } else if (b === BSON$5.BSON_DATA_ARRAY) {
                    var I = n,
                        T = (v = r) + (w = t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24);
                    if (f && f[m]) {
                        for (var R in I = {}, n) I[R] = n[R];
                        I.raw = !0
                    }
                    if (g[m] = e(t, v, I, !0), 0 !== t[(r += w) - 1]) throw new Error("invalid array terminator byte");
                    if (r !== T) throw new Error("corrupted array bson")
                } else if (b === BSON$5.BSON_DATA_UNDEFINED) g[m] = void 0;
                else if (b === BSON$5.BSON_DATA_NULL) g[m] = null;
                else if (b === BSON$5.BSON_DATA_LONG) {
                    O = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24, A = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    var D = new Long$1$1(O, A);
                    g[m] = p && !0 === d && D.lessThanOrEqual(JS_INT_MAX_LONG$1) && D.greaterThanOrEqual(JS_INT_MIN_LONG$1) ? D.toNumber() : D
                } else if (b === BSON$5.BSON_DATA_DECIMAL128) {
                    var L = new Buffer$4$1(16);
                    t.copy(L, 0, r, r + 16), r += 16;
                    var x = new decimal128$2(L);
                    g[m] = x.toObject ? x.toObject() : x
                } else if (b === BSON$5.BSON_DATA_BINARY) {
                    var C = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24,
                        M = C,
                        P = t[r++];
                    if (C < 0) throw new Error("Negative binary type element size found");
                    if (C > Buffer$4$1.byteLength(t)) throw new Error("Binary type size larger than document size");
                    if (null != t.slice) {
                        if (P === Binary$1$1.SUBTYPE_BYTE_ARRAY) {
                            if ((C = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                            if (M - 4 < C) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                            if (C < M - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                        }
                        g[m] = h && d ? t.slice(r, r + C) : new Binary$1$1(t.slice(r, r + C), P)
                    } else {
                        var U = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(C)) : new Array(C);
                        if (P === Binary$1$1.SUBTYPE_BYTE_ARRAY) {
                            if ((C = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                            if (M - 4 < C) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                            if (C < M - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                        }
                        for (S = 0; S < C; S++) U[S] = t[r + S];
                        g[m] = h && d ? U : new Binary$1$1(U, P)
                    }
                    r += C
                } else if (b === BSON$5.BSON_DATA_REGEXP && !1 === l) {
                    for (S = r; 0 !== t[S] && S < Buffer$4$1.byteLength(t);) S++;
                    if (S >= Buffer$4$1.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    var F = t.toString("utf8", r, S);
                    for (S = r = S + 1; 0 !== t[S] && S < Buffer$4$1.byteLength(t);) S++;
                    if (S >= Buffer$4$1.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    var j = t.toString("utf8", r, S);
                    r = S + 1;
                    var k = new Array(j.length);
                    for (S = 0; S < j.length; S++) switch (j[S]) {
                        case "m":
                            k[S] = "m";
                            break;
                        case "s":
                            k[S] = "g";
                            break;
                        case "i":
                            k[S] = "i"
                    }
                    g[m] = new RegExp(F, k.join(""))
                } else if (b === BSON$5.BSON_DATA_REGEXP && !0 === l) {
                    for (S = r; 0 !== t[S] && S < Buffer$4$1.byteLength(t);) S++;
                    if (S >= Buffer$4$1.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    for (F = t.toString("utf8", r, S), S = r = S + 1; 0 !== t[S] && S < Buffer$4$1.byteLength(t);) S++;
                    if (S >= Buffer$4$1.byteLength(t)) throw new Error("Bad BSON Document: illegal CString");
                    j = t.toString("utf8", r, S), r = S + 1, g[m] = new BSONRegExp$1$1(F, j)
                } else if (b === BSON$5.BSON_DATA_SYMBOL) {
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4$1.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    g[m] = t.toString("utf8", r, r + N - 1), r += N
                } else if (b === BSON$5.BSON_DATA_TIMESTAMP) O = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24, A = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24, g[m] = new Timestamp$1$1(O, A);
                else if (b === BSON$5.BSON_DATA_MIN_KEY) g[m] = new MinKey$1$1;
                else if (b === BSON$5.BSON_DATA_MAX_KEY) g[m] = new MaxKey$1$1;
                else if (b === BSON$5.BSON_DATA_CODE) {
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4$1.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    var z = t.toString("utf8", r, r + N - 1);
                    if (o)
                        if (s) {
                            var K = u ? a(z) : z;
                            g[m] = isolateEvalWithHash$1(functionCache$1, K, z, g)
                        } else g[m] = isolateEval$1(z);
                        else g[m] = new Code$1$1(z);
                    r += N
                } else if (b === BSON$5.BSON_DATA_CODE_W_SCOPE) {
                    var Y = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24;
                    if (Y < 13) throw new Error("code_w_scope total size shorter minimum expected length");
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4$1.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    z = t.toString("utf8", r, r + N - 1), w = t[v = r += N] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24;
                    var W = e(t, v, n, !1);
                    if (r += w, Y < 8 + w + N) throw new Error("code_w_scope total size is to short, truncating scope");
                    if (8 + w + N < Y) throw new Error("code_w_scope total size is to long, clips outer document");
                    o ? (s ? (K = u ? a(z) : z, g[m] = isolateEvalWithHash$1(functionCache$1, K, z, g)) : g[m] = isolateEval$1(z), g[m].scope = W) : g[m] = new Code$1$1(z, W)
                } else {
                    if (b !== BSON$5.BSON_DATA_DBPOINTER) throw new Error("Detected unknown BSON type " + b.toString(16) + ' for fieldname "' + m + '", are you using the latest BSON parser?');
                    if ((N = t[r++] | t[r++] << 8 | t[r++] << 16 | t[r++] << 24) <= 0 || N > Buffer$4$1.byteLength(t) - r || 0 !== t[r + N - 1]) throw new Error("bad string length in bson");
                    var q = t.toString("utf8", r, r + N - 1);
                    r += N;
                    var J = new Buffer$4$1(12);
                    for (t.copy(J, 0, r, r + 12), B = new ObjectID$1$1(J), r += 12, S = 0; S < q.length; S++)
                        if (65533 === q.charCodeAt(S)) throw new Error("Invalid UTF-8 string in BSON document");
                    g[m] = new DBRef$1$1(q, B)
                }
            }
            if (_ !== r - y) {
                if (i) throw new Error("corrupt array bson");
                throw new Error("corrupt object bson")
            }
            var X = Object.keys(g).filter(function(e) {
                return e.startsWith("$")
            }),
                Z = !0;
            if (X.forEach(function(e) {
                -1 === ["$ref", "$id", "$db"].indexOf(e) && (Z = !1)
            }), !Z) return g;
            if (null != g.$id && null != g.$ref) {
                var V = Object.assign({}, g);
                return delete V.$ref, delete V.$id, delete V.$db, new DBRef$1$1(g.$ref, g.$id, g.$db || null, V)
            }
            return g
        }, isolateEvalWithHash$1 = function isolateEvalWithHash(functionCache, hash, functionString, object) {
            var value = null;
            return null == functionCache[hash] && (eval("value = " + functionString), functionCache[hash] = value), functionCache[hash].bind(object)
        }, isolateEval$1 = function isolateEval(functionString) {
            var value = null;
            return eval("value = " + functionString), value
        }, BSON$5 = {}, functionCache$1 = BSON$5.functionCache = {};
    BSON$5.BSON_DATA_NUMBER = 1, BSON$5.BSON_DATA_STRING = 2, BSON$5.BSON_DATA_OBJECT = 3, BSON$5.BSON_DATA_ARRAY = 4, BSON$5.BSON_DATA_BINARY = 5, BSON$5.BSON_DATA_UNDEFINED = 6, BSON$5.BSON_DATA_OID = 7, BSON$5.BSON_DATA_BOOLEAN = 8, BSON$5.BSON_DATA_DATE = 9, BSON$5.BSON_DATA_NULL = 10, BSON$5.BSON_DATA_REGEXP = 11, BSON$5.BSON_DATA_DBPOINTER = 12, BSON$5.BSON_DATA_CODE = 13, BSON$5.BSON_DATA_SYMBOL = 14, BSON$5.BSON_DATA_CODE_W_SCOPE = 15, BSON$5.BSON_DATA_INT = 16, BSON$5.BSON_DATA_TIMESTAMP = 17, BSON$5.BSON_DATA_LONG = 18, BSON$5.BSON_DATA_DECIMAL128 = 19, BSON$5.BSON_DATA_MIN_KEY = 255, BSON$5.BSON_DATA_MAX_KEY = 127, BSON$5.BSON_BINARY_SUBTYPE_DEFAULT = 0, BSON$5.BSON_BINARY_SUBTYPE_FUNCTION = 1, BSON$5.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2, BSON$5.BSON_BINARY_SUBTYPE_UUID = 3, BSON$5.BSON_BINARY_SUBTYPE_MD5 = 4, BSON$5.BSON_BINARY_SUBTYPE_USER_DEFINED = 128, BSON$5.BSON_INT32_MAX = 2147483647, BSON$5.BSON_INT32_MIN = -2147483648, BSON$5.BSON_INT64_MAX = Math.pow(2, 63) - 1, BSON$5.BSON_INT64_MIN = -Math.pow(2, 63), BSON$5.JS_INT_MAX = 9007199254740992, BSON$5.JS_INT_MIN = -9007199254740992;
    var JS_INT_MAX_LONG$1 = Long$1$1.fromNumber(9007199254740992),
        JS_INT_MIN_LONG$1 = Long$1$1.fromNumber(-9007199254740992),
        deserializer$1 = deserialize$1,
        readIEEE754$1 = function(e, t, r, n, i) {
            var o, s, u = "big" === r,
                a = 8 * i - n - 1,
                f = (1 << a) - 1,
                c = f >> 1,
                l = -7,
                h = u ? 0 : i - 1,
                p = u ? 1 : -1,
                d = e[t + h];
            for (h += p, o = d & (1 << -l) - 1, d >>= -l, l += a; 0 < l; o = 256 * o + e[t + h], h += p, l -= 8);
            for (s = o & (1 << -l) - 1, o >>= -l, l += n; 0 < l; s = 256 * s + e[t + h], h += p, l -= 8);
            if (0 === o) o = 1 - c;
            else {
                if (o === f) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                s += Math.pow(2, n), o -= c
            }
            return (d ? -1 : 1) * s * Math.pow(2, o - n)
        }, writeIEEE754$2 = function(e, t, r, n, i, o) {
            var s, u, a, f = "big" === n,
                c = 8 * o - i - 1,
                l = (1 << c) - 1,
                h = l >> 1,
                p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = f ? o - 1 : 0,
                y = f ? -1 : 1,
                _ = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + h ? p / a : p * Math.pow(2, 1 - h)) * a && (s++, a /= 2), l <= s + h ? (u = 0, s = l) : 1 <= s + h ? (u = (t * a - 1) * Math.pow(2, i), s += h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)), isNaN(t) && (u = 0); 8 <= i;) e[r + d] = 255 & u, d += y, u /= 256, i -= 8;
            for (s = s << i | u, isNaN(t) && (s += 8), c += i; 0 < c;) e[r + d] = 255 & s, d += y, s /= 256, c -= 8;
            e[r + d - y] |= 128 * _
        }, readIEEE754_1$1 = readIEEE754$1,
        writeIEEE754_1$1 = writeIEEE754$2,
        float_parser$1 = {
            readIEEE754: readIEEE754_1$1,
            writeIEEE754: writeIEEE754_1$1
        };

    function normalizedFunctionString$3(e) {
        return e.toString().replace(/function(.*)\(/, "function (")
    }
    var utils$1 = {
        normalizedFunctionString: normalizedFunctionString$3
    }, _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Buffer$5$1 = buffer.Buffer,
        writeIEEE754$1$1 = float_parser$1.writeIEEE754,
        Long$2$1 = long_1$2.Long,
        MinKey$2$1 = min_key$2.MinKey,
        Binary$2$1 = binary$2.Binary,
        normalizedFunctionString$1$1 = utils$1.normalizedFunctionString,
        regexp$1$1 = /\x00/,
        isDate$2 = function(e) {
            return "object" === (void 0 === e ? "undefined" : _typeof$2(e)) && "[object Date]" === Object.prototype.toString.call(e)
        }, isRegExp$1 = function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        }, serializeString$1 = function(e, t, r, n, i) {
            e[n++] = BSON$1$1.BSON_DATA_STRING;
            var o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
            e[(n = n + o + 1) - 1] = 0;
            var s = e.write(r, n + 4, "utf8");
            return e[n + 3] = s + 1 >> 24 & 255, e[n + 2] = s + 1 >> 16 & 255, e[n + 1] = s + 1 >> 8 & 255, e[n] = s + 1 & 255, n = n + 4 + s, e[n++] = 0, n
        }, serializeNumber$1 = function(e, t, r, n, i) {
            if (Math.floor(r) === r && r >= BSON$1$1.JS_INT_MIN && r <= BSON$1$1.JS_INT_MAX)
                if (r >= BSON$1$1.BSON_INT32_MIN && r <= BSON$1$1.BSON_INT32_MAX) {
                    e[n++] = BSON$1$1.BSON_DATA_INT;
                    var o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
                    n += o, e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255
                } else if (r >= BSON$1$1.JS_INT_MIN && r <= BSON$1$1.JS_INT_MAX) e[n++] = BSON$1$1.BSON_DATA_NUMBER, n += o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1$1(e, r, n, "little", 52, 8), n += 8;
            else {
                e[n++] = BSON$1$1.BSON_DATA_LONG, n += o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
                var s = Long$2$1.fromNumber(r),
                    u = s.getLowBits(),
                    a = s.getHighBits();
                e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255, e[n++] = 255 & a, e[n++] = a >> 8 & 255, e[n++] = a >> 16 & 255, e[n++] = a >> 24 & 255
            } else e[n++] = BSON$1$1.BSON_DATA_NUMBER, n += o = i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1$1(e, r, n, "little", 52, 8), n += 8;
            return n
        }, serializeNull$1 = function(e, t, r, n, i) {
            return e[n++] = BSON$1$1.BSON_DATA_NULL, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
        }, serializeBoolean$1 = function(e, t, r, n, i) {
            return e[n++] = BSON$1$1.BSON_DATA_BOOLEAN, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = r ? 1 : 0, n
        }, serializeDate$1 = function(e, t, r, n, i) {
            e[n++] = BSON$1$1.BSON_DATA_DATE, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = Long$2$1.fromNumber(r.getTime()),
                s = o.getLowBits(),
                u = o.getHighBits();
            return e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255, n
        }, serializeRegExp$1 = function(e, t, r, n, i) {
            if (e[n++] = BSON$1$1.BSON_DATA_REGEXP, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.source && null != r.source.match(regexp$1$1)) throw Error("value " + r.source + " must not contain null bytes");
            return n += e.write(r.source, n, "utf8"), e[n++] = 0, r.ignoreCase && (e[n++] = 105), r.global && (e[n++] = 115), r.multiline && (e[n++] = 109), e[n++] = 0, n
        }, serializeBSONRegExp$1 = function(e, t, r, n, i) {
            if (e[n++] = BSON$1$1.BSON_DATA_REGEXP, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, null != r.pattern.match(regexp$1$1)) throw Error("pattern " + r.pattern + " must not contain null bytes");
            return n += e.write(r.pattern, n, "utf8"), e[n++] = 0, n += e.write(r.options.split("").sort().join(""), n, "utf8"), e[n++] = 0, n
        }, serializeMinMax$1 = function(e, t, r, n, i) {
            return e[n++] = null === r ? BSON$1$1.BSON_DATA_NULL : r instanceof MinKey$2$1 ? BSON$1$1.BSON_DATA_MIN_KEY : BSON$1$1.BSON_DATA_MAX_KEY, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
        }, serializeObjectId$1 = function(e, t, r, n, i) {
            if (e[n++] = BSON$1$1.BSON_DATA_OID, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, "string" == typeof r.id) e.write(r.id, n, "binary");
            else {
                if (!r.id || !r.id.copy) throw new TypeError("object [" + JSON.stringify(r) + "] is not a valid ObjectId");
                r.id.copy(e, n, 0, 12)
            }
            return n + 12
        }, serializeBuffer$1 = function(e, t, r, n, i) {
            e[n++] = BSON$1$1.BSON_DATA_BINARY, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = r.length;
            return e[n++] = 255 & o, e[n++] = o >> 8 & 255, e[n++] = o >> 16 & 255, e[n++] = o >> 24 & 255, e[n++] = BSON$1$1.BSON_BINARY_SUBTYPE_DEFAULT, r.copy(e, n, 0, o), n += o
        }, serializeObject$1 = function(e, t, r, n, i, o, s, u, a, f) {
            for (var c = 0; c < f.length; c++)
                if (f[c] === r) throw new Error("cyclic dependency detected");
            f.push(r), e[n++] = Array.isArray(r) ? BSON$1$1.BSON_DATA_ARRAY : BSON$1$1.BSON_DATA_OBJECT, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var l = serializeInto$1(e, r, i, n, o + 1, s, u, f);
            return f.pop(), l
        }, serializeDecimal128$1 = function(e, t, r, n, i) {
            return e[n++] = BSON$1$1.BSON_DATA_DECIMAL128, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.bytes.copy(e, n, 0, 16), n + 16
        }, serializeLong$1 = function(e, t, r, n, i) {
            e[n++] = "Long" === r._bsontype ? BSON$1$1.BSON_DATA_LONG : BSON$1$1.BSON_DATA_TIMESTAMP, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = r.getLowBits(),
                s = r.getHighBits();
            return e[n++] = 255 & o, e[n++] = o >> 8 & 255, e[n++] = o >> 16 & 255, e[n++] = o >> 24 & 255, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, n
        }, serializeInt32$1 = function(e, t, r, n, i) {
            return e[n++] = BSON$1$1.BSON_DATA_INT, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255, n
        }, serializeDouble$1 = function(e, t, r, n, i) {
            return e[n++] = BSON$1$1.BSON_DATA_NUMBER, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1$1(e, r.value, n, "little", 52, 8), n += 8
        }, serializeFunction$1 = function(e, t, r, n, i, o, s) {
            e[n++] = BSON$1$1.BSON_DATA_CODE, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var u = normalizedFunctionString$1$1(r),
                a = e.write(u, n + 4, "utf8") + 1;
            return e[n] = 255 & a, e[n + 1] = a >> 8 & 255, e[n + 2] = a >> 16 & 255, e[n + 3] = a >> 24 & 255, n = n + 4 + a - 1, e[n++] = 0, n
        }, serializeCode$1 = function(e, t, r, n, i, o, s, u, a) {
            if (r.scope && "object" === _typeof$2(r.scope)) {
                e[n++] = BSON$1$1.BSON_DATA_CODE_W_SCOPE;
                var f = a ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
                n += f, e[n++] = 0;
                var c = n,
                    l = "string" == typeof r.code ? r.code : r.code.toString();
                n += 4;
                var h = e.write(l, n + 4, "utf8") + 1;
                e[n] = 255 & h, e[n + 1] = h >> 8 & 255, e[n + 2] = h >> 16 & 255, e[n + 3] = h >> 24 & 255, e[n + 4 + h - 1] = 0, n = n + h + 4;
                var p = serializeInto$1(e, r.scope, i, n, o + 1, s, u);
                n = p - 1;
                var d = p - c;
                e[c++] = 255 & d, e[c++] = d >> 8 & 255, e[c++] = d >> 16 & 255, e[c++] = d >> 24 & 255, e[n++] = 0
            } else {
                e[n++] = BSON$1$1.BSON_DATA_CODE, n += f = a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, l = r.code.toString();
                var y = e.write(l, n + 4, "utf8") + 1;
                e[n] = 255 & y, e[n + 1] = y >> 8 & 255, e[n + 2] = y >> 16 & 255, e[n + 3] = y >> 24 & 255, n = n + 4 + y - 1, e[n++] = 0
            }
            return n
        }, serializeBinary$1 = function(e, t, r, n, i) {
            e[n++] = BSON$1$1.BSON_DATA_BINARY, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = r.value(!0),
                s = r.position;
            return r.sub_type === Binary$2$1.SUBTYPE_BYTE_ARRAY && (s += 4), e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = r.sub_type, r.sub_type === Binary$2$1.SUBTYPE_BYTE_ARRAY && (s -= 4, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255), o.copy(e, n, 0, r.position), n += r.position
        }, serializeSymbol$1 = function(e, t, r, n, i) {
            e[n++] = BSON$1$1.BSON_DATA_SYMBOL, n += i ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var o = e.write(r.value, n + 4, "utf8") + 1;
            return e[n] = 255 & o, e[n + 1] = o >> 8 & 255, e[n + 2] = o >> 16 & 255, e[n + 3] = o >> 24 & 255, n = n + 4 + o - 1, e[n++] = 0, n
        }, serializeDBRef$1 = function(e, t, r, n, i, o, s) {
            e[n++] = BSON$1$1.BSON_DATA_OBJECT, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var u, a = n,
                f = {
                    $ref: r.collection,
                    $id: r.oid
                };
            null != r.db && (f.$db = r.db), f = Object.assign(f, r.fields);
            var c = (u = serializeInto$1(e, f, !1, n, i + 1, o)) - a;
            return e[a++] = 255 & c, e[a++] = c >> 8 & 255, e[a++] = c >> 16 & 255, e[a++] = c >> 24 & 255, u
        }, serializeInto$1 = function(e, t, r, n, i, o, s, u) {
            n = n || 0, (u = u || []).push(t);
            var a = n + 4;
            if (Array.isArray(t))
                for (var f = 0; f < t.length; f++) {
                    var c = "" + f,
                        l = t[f];
                    if (l && l.toBSON) {
                        if ("function" != typeof l.toBSON) throw new TypeError("toBSON is not a function");
                        l = l.toBSON()
                    }
                    var h = void 0 === l ? "undefined" : _typeof$2(l);
                    "string" === h ? a = serializeString$1(e, c, l, a, !0) : "number" === h ? a = serializeNumber$1(e, c, l, a, !0) : "boolean" === h ? a = serializeBoolean$1(e, c, l, a, !0) : l instanceof Date || isDate$2(l) ? a = serializeDate$1(e, c, l, a, !0) : void 0 === l ? a = serializeNull$1(e, c, l, a, !0) : null === l ? a = serializeNull$1(e, c, l, a, !0) : "ObjectID" === l._bsontype ? a = serializeObjectId$1(e, c, l, a, !0) : Buffer$5$1.isBuffer(l) ? a = serializeBuffer$1(e, c, l, a, !0) : l instanceof RegExp || isRegExp$1(l) ? a = serializeRegExp$1(e, c, l, a, !0) : "object" === h && null == l._bsontype ? a = serializeObject$1(e, c, l, a, r, i, o, s, !0, u) : "object" === h && "Decimal128" === l._bsontype ? a = serializeDecimal128$1(e, c, l, a, !0) : "Long" === l._bsontype || "Timestamp" === l._bsontype ? a = serializeLong$1(e, c, l, a, !0) : "Double" === l._bsontype ? a = serializeDouble$1(e, c, l, a, !0) : "function" == typeof l && o ? a = serializeFunction$1(e, c, l, a, r, i, o, !0) : "Code" === l._bsontype ? a = serializeCode$1(e, c, l, a, r, i, o, s, !0) : "Binary" === l._bsontype ? a = serializeBinary$1(e, c, l, a, !0) : "Symbol" === l._bsontype ? a = serializeSymbol$1(e, c, l, a, !0) : "DBRef" === l._bsontype ? a = serializeDBRef$1(e, c, l, a, i, o, !0) : "BSONRegExp" === l._bsontype ? a = serializeBSONRegExp$1(e, c, l, a, !0) : "Int32" === l._bsontype ? a = serializeInt32$1(e, c, l, a, !0) : "MinKey" !== l._bsontype && "MaxKey" !== l._bsontype || (a = serializeMinMax$1(e, c, l, a, !0))
                } else if (t instanceof map$1)
                    for (var p = t.entries(), d = !1; !d;) {
                        var y = p.next();
                        if (!(d = y.done)) {
                            if (c = y.value[0], h = void 0 === (l = y.value[1]) ? "undefined" : _typeof$2(l), "$db" !== c && "$ref" !== c && "$id" !== c) {
                                if (null != c.match(regexp$1$1)) throw Error("key " + c + " must not contain null bytes");
                                if (r) {
                                    if ("$" === c[0]) throw Error("key " + c + " must not start with '$'");
                                    if (~c.indexOf(".")) throw Error("key " + c + " must not contain '.'")
                                }
                            }
                            "string" === h ? a = serializeString$1(e, c, l, a) : "number" === h ? a = serializeNumber$1(e, c, l, a) : "boolean" === h ? a = serializeBoolean$1(e, c, l, a) : l instanceof Date || isDate$2(l) ? a = serializeDate$1(e, c, l, a) : null === l || void 0 === l && !1 === s ? a = serializeNull$1(e, c, l, a) : "ObjectID" === l._bsontype ? a = serializeObjectId$1(e, c, l, a) : Buffer$5$1.isBuffer(l) ? a = serializeBuffer$1(e, c, l, a) : l instanceof RegExp || isRegExp$1(l) ? a = serializeRegExp$1(e, c, l, a) : "object" === h && null == l._bsontype ? a = serializeObject$1(e, c, l, a, r, i, o, s, !1, u) : "object" === h && "Decimal128" === l._bsontype ? a = serializeDecimal128$1(e, c, l, a) : "Long" === l._bsontype || "Timestamp" === l._bsontype ? a = serializeLong$1(e, c, l, a) : "Double" === l._bsontype ? a = serializeDouble$1(e, c, l, a) : "Code" === l._bsontype ? a = serializeCode$1(e, c, l, a, r, i, o, s) : "function" == typeof l && o ? a = serializeFunction$1(e, c, l, a, r, i, o) : "Binary" === l._bsontype ? a = serializeBinary$1(e, c, l, a) : "Symbol" === l._bsontype ? a = serializeSymbol$1(e, c, l, a) : "DBRef" === l._bsontype ? a = serializeDBRef$1(e, c, l, a, i, o) : "BSONRegExp" === l._bsontype ? a = serializeBSONRegExp$1(e, c, l, a) : "Int32" === l._bsontype ? a = serializeInt32$1(e, c, l, a) : "MinKey" !== l._bsontype && "MaxKey" !== l._bsontype || (a = serializeMinMax$1(e, c, l, a))
                        }
                    } else {
                        if (t.toBSON) {
                            if ("function" != typeof t.toBSON) throw new TypeError("toBSON is not a function");
                            if (null != (t = t.toBSON()) && "object" !== (void 0 === t ? "undefined" : _typeof$2(t))) throw new TypeError("toBSON function did not return an object")
                        }
                        for (c in t) {
                            if ((l = t[c]) && l.toBSON) {
                                if ("function" != typeof l.toBSON) throw new TypeError("toBSON is not a function");
                                l = l.toBSON()
                            }
                            if (h = void 0 === l ? "undefined" : _typeof$2(l), "$db" !== c && "$ref" !== c && "$id" !== c) {
                                if (null != c.match(regexp$1$1)) throw Error("key " + c + " must not contain null bytes");
                                if (r) {
                                    if ("$" === c[0]) throw Error("key " + c + " must not start with '$'");
                                    if (~c.indexOf(".")) throw Error("key " + c + " must not contain '.'")
                                }
                            }
                            "string" === h ? a = serializeString$1(e, c, l, a) : "number" === h ? a = serializeNumber$1(e, c, l, a) : "boolean" === h ? a = serializeBoolean$1(e, c, l, a) : l instanceof Date || isDate$2(l) ? a = serializeDate$1(e, c, l, a) : void 0 === l ? !1 === s && (a = serializeNull$1(e, c, l, a)) : null === l ? a = serializeNull$1(e, c, l, a) : "ObjectID" === l._bsontype ? a = serializeObjectId$1(e, c, l, a) : Buffer$5$1.isBuffer(l) ? a = serializeBuffer$1(e, c, l, a) : l instanceof RegExp || isRegExp$1(l) ? a = serializeRegExp$1(e, c, l, a) : "object" === h && null == l._bsontype ? a = serializeObject$1(e, c, l, a, r, i, o, s, !1, u) : "object" === h && "Decimal128" === l._bsontype ? a = serializeDecimal128$1(e, c, l, a) : "Long" === l._bsontype || "Timestamp" === l._bsontype ? a = serializeLong$1(e, c, l, a) : "Double" === l._bsontype ? a = serializeDouble$1(e, c, l, a) : "Code" === l._bsontype ? a = serializeCode$1(e, c, l, a, r, i, o, s) : "function" == typeof l && o ? a = serializeFunction$1(e, c, l, a, r, i, o) : "Binary" === l._bsontype ? a = serializeBinary$1(e, c, l, a) : "Symbol" === l._bsontype ? a = serializeSymbol$1(e, c, l, a) : "DBRef" === l._bsontype ? a = serializeDBRef$1(e, c, l, a, i, o) : "BSONRegExp" === l._bsontype ? a = serializeBSONRegExp$1(e, c, l, a) : "Int32" === l._bsontype ? a = serializeInt32$1(e, c, l, a) : "MinKey" !== l._bsontype && "MaxKey" !== l._bsontype || (a = serializeMinMax$1(e, c, l, a))
                        }
                    }
                u.pop(), e[a++] = 0;
            var _ = a - n;
            return e[n++] = 255 & _, e[n++] = _ >> 8 & 255, e[n++] = _ >> 16 & 255, e[n++] = _ >> 24 & 255, a
        }, BSON$1$1 = {
            BSON_DATA_NUMBER: 1,
            BSON_DATA_STRING: 2,
            BSON_DATA_OBJECT: 3,
            BSON_DATA_ARRAY: 4,
            BSON_DATA_BINARY: 5,
            BSON_DATA_UNDEFINED: 6,
            BSON_DATA_OID: 7,
            BSON_DATA_BOOLEAN: 8,
            BSON_DATA_DATE: 9,
            BSON_DATA_NULL: 10,
            BSON_DATA_REGEXP: 11,
            BSON_DATA_CODE: 13,
            BSON_DATA_SYMBOL: 14,
            BSON_DATA_CODE_W_SCOPE: 15,
            BSON_DATA_INT: 16,
            BSON_DATA_TIMESTAMP: 17,
            BSON_DATA_LONG: 18,
            BSON_DATA_DECIMAL128: 19,
            BSON_DATA_MIN_KEY: 255,
            BSON_DATA_MAX_KEY: 127,
            BSON_BINARY_SUBTYPE_DEFAULT: 0,
            BSON_BINARY_SUBTYPE_FUNCTION: 1,
            BSON_BINARY_SUBTYPE_BYTE_ARRAY: 2,
            BSON_BINARY_SUBTYPE_UUID: 3,
            BSON_BINARY_SUBTYPE_MD5: 4,
            BSON_BINARY_SUBTYPE_USER_DEFINED: 128,
            BSON_INT32_MAX: 2147483647,
            BSON_INT32_MIN: -2147483648
        };
    BSON$1$1.BSON_INT64_MAX = Math.pow(2, 63) - 1, BSON$1$1.BSON_INT64_MIN = -Math.pow(2, 63), BSON$1$1.JS_INT_MAX = 9007199254740992, BSON$1$1.JS_INT_MIN = -9007199254740992;
    var serializer$1 = serializeInto$1,
        Buffer$6$1 = buffer.Buffer,
        Long$3$1 = long_1$2.Long,
        Double$2$1 = double_1$2.Double,
        Timestamp$2$1 = timestamp$2.Timestamp,
        ObjectID$2$1 = objectid$2.ObjectID,
        _Symbol$1$1 = symbol$2.Symbol,
        BSONRegExp$2$1 = regexp$3.BSONRegExp,
        Code$2$1 = code$3.Code,
        MinKey$3$1 = min_key$2.MinKey,
        MaxKey$2$1 = max_key$2.MaxKey,
        DBRef$2$1 = db_ref$2.DBRef,
        Binary$3$1 = binary$2.Binary,
        normalizedFunctionString$2$1 = utils$1.normalizedFunctionString,
        isDate$1$1 = function(e) {
            return "object" === (void 0 === e ? "undefined" : _typeof$2(e)) && "[object Date]" === Object.prototype.toString.call(e)
        }, calculateObjectSize$1 = function(e, t, r) {
            var n = 5;
            if (Array.isArray(e))
                for (var i = 0; i < e.length; i++) n += calculateElement$1(i.toString(), e[i], t, !0, r);
            else
                for (var o in e.toBSON && (e = e.toBSON()), e) n += calculateElement$1(o, e[o], t, !1, r);
            return n
        };

    function calculateElement$1(e, t, r, n, i) {
        switch (t && t.toBSON && (t = t.toBSON()), void 0 === t ? "undefined" : _typeof$2(t)) {
            case "string":
                return 1 + Buffer$6$1.byteLength(e, "utf8") + 1 + 4 + Buffer$6$1.byteLength(t, "utf8") + 1;
            case "number":
                return Math.floor(t) === t && t >= BSON$2$1.JS_INT_MIN && t <= BSON$2$1.JS_INT_MAX && t >= BSON$2$1.BSON_INT32_MIN && t <= BSON$2$1.BSON_INT32_MAX ? (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 5 : (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 9;
            case "undefined":
                return n || !i ? (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 : 0;
            case "boolean":
                return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 2;
            case "object":
                if (null == t || t instanceof MinKey$3$1 || t instanceof MaxKey$2$1 || "MinKey" === t._bsontype || "MaxKey" === t._bsontype) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1;
                if (t instanceof ObjectID$2$1 || "ObjectID" === t._bsontype) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 13;
                if (t instanceof Date || isDate$1$1(t)) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 9;
                if (void 0 !== Buffer$6$1 && Buffer$6$1.isBuffer(t)) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 6 + t.length;
                if (t instanceof Long$3$1 || t instanceof Double$2$1 || t instanceof Timestamp$2$1 || "Long" === t._bsontype || "Double" === t._bsontype || "Timestamp" === t._bsontype) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 9;
                if (t instanceof decimal128$2 || "Decimal128" === t._bsontype) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 17;
                if (t instanceof Code$2$1 || "Code" === t._bsontype) return null != t.scope && 0 < Object.keys(t.scope).length ? (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6$1.byteLength(t.code.toString(), "utf8") + 1 + calculateObjectSize$1(t.scope, r, i) : (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6$1.byteLength(t.code.toString(), "utf8") + 1;
                if (t instanceof Binary$3$1 || "Binary" === t._bsontype) return t.sub_type === Binary$3$1.SUBTYPE_BYTE_ARRAY ? (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1 + 4) : (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1);
                if (t instanceof _Symbol$1$1 || "Symbol" === t._bsontype) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + Buffer$6$1.byteLength(t.value, "utf8") + 4 + 1 + 1;
                if (t instanceof DBRef$2$1 || "DBRef" === t._bsontype) {
                    var o = {
                        $ref: t.collection,
                        $id: t.oid
                    };
                    return null != t.db && (o.$db = t.db), o = Object.assign(o, t.fields), (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + calculateObjectSize$1(o, r, i)
                }
                return t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) ? (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6$1.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1 : t instanceof BSONRegExp$2$1 || "BSONRegExp" === t._bsontype ? (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6$1.byteLength(t.pattern, "utf8") + 1 + Buffer$6$1.byteLength(t.options, "utf8") + 1 : (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + calculateObjectSize$1(t, r, i) + 1;
            case "function":
                if (t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) || "[object RegExp]" === String.call(t)) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6$1.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1;
                if (r && null != t.scope && 0 < Object.keys(t.scope).length) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6$1.byteLength(normalizedFunctionString$2$1(t), "utf8") + 1 + calculateObjectSize$1(t.scope, r, i);
                if (r) return (null != e ? Buffer$6$1.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6$1.byteLength(normalizedFunctionString$2$1(t), "utf8") + 1
        }
        return 0
    }
    var BSON$2$1 = {
        BSON_INT32_MAX: 2147483647,
        BSON_INT32_MIN: -2147483648,
        JS_INT_MAX: 9007199254740992,
        JS_INT_MIN: -9007199254740992
    }, calculate_size$1 = calculateObjectSize$1,
        Buffer$7$1 = buffer.Buffer,
        ensure_buffer$1 = function(e) {
            if (e instanceof Buffer$7$1) return e;
            if (e instanceof Uint8Array) return new Buffer$7$1(e.buffer);
            throw new TypeError("Must use either Buffer or Uint8Array")
        }, Buffer$8$1 = buffer.Buffer,
        MAXSIZE$1 = 17825792,
        buffer$2 = new Buffer$8$1(MAXSIZE$1),
        BSON$3$1 = function() {};
    BSON$3$1.prototype.serialize = function(e, t) {
        var r = "boolean" == typeof(t = t || {}).checkKeys && t.checkKeys,
            n = "boolean" == typeof t.serializeFunctions && t.serializeFunctions,
            i = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined,
            o = "number" == typeof t.minInternalBufferSize ? t.minInternalBufferSize : MAXSIZE$1;
        buffer$2.length < o && (buffer$2 = new Buffer$8$1(o));
        var s = serializer$1(buffer$2, e, r, 0, 0, n, i, []),
            u = new Buffer$8$1(s);
        return buffer$2.copy(u, 0, 0, u.length), u
    }, BSON$3$1.prototype.serializeWithBufferAndIndex = function(e, t, r) {
        var n = "boolean" == typeof(r = r || {}).checkKeys && r.checkKeys,
            i = "boolean" == typeof r.serializeFunctions && r.serializeFunctions,
            o = "boolean" != typeof r.ignoreUndefined || r.ignoreUndefined,
            s = "number" == typeof r.index ? r.index : 0,
            u = serializer$1(buffer$2, e, n, 0, 0, i, o);
        return t = ensure_buffer$1(t), buffer$2.copy(t, s, 0, u), s + u - 1
    }, BSON$3$1.prototype.deserialize = function(e, t) {
        return e = ensure_buffer$1(e), deserializer$1(e, t)
    }, BSON$3$1.prototype.calculateObjectSize = function(e, t) {
        var r = "boolean" == typeof(t = t || {}).serializeFunctions && t.serializeFunctions,
            n = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined;
        return calculate_size$1(e, r, n)
    }, BSON$3$1.prototype.deserializeStream = function(e, t, r, n, i, o) {
        o = Object.assign({
            allowObjectSmallerThanBufferSize: !0
        }, o), e = ensure_buffer$1(e);
        for (var s = t, u = 0; u < r; u++) {
            var a = e[s] | e[s + 1] << 8 | e[s + 2] << 16 | e[s + 3] << 24;
            o.index = s, n[i + u] = this.deserialize(e, o), s += a
        }
        return s
    }, BSON$3$1.BSON_INT32_MAX = 2147483647, BSON$3$1.BSON_INT32_MIN = -2147483648, BSON$3$1.BSON_INT64_MAX = Math.pow(2, 63) - 1, BSON$3$1.BSON_INT64_MIN = -Math.pow(2, 63), BSON$3$1.JS_INT_MAX = 9007199254740992, BSON$3$1.JS_INT_MIN = -9007199254740992, BSON$3$1.BSON_DATA_NUMBER = 1, BSON$3$1.BSON_DATA_STRING = 2, BSON$3$1.BSON_DATA_OBJECT = 3, BSON$3$1.BSON_DATA_ARRAY = 4, BSON$3$1.BSON_DATA_BINARY = 5, BSON$3$1.BSON_DATA_OID = 7, BSON$3$1.BSON_DATA_BOOLEAN = 8, BSON$3$1.BSON_DATA_DATE = 9, BSON$3$1.BSON_DATA_NULL = 10, BSON$3$1.BSON_DATA_REGEXP = 11, BSON$3$1.BSON_DATA_CODE = 13, BSON$3$1.BSON_DATA_SYMBOL = 14, BSON$3$1.BSON_DATA_CODE_W_SCOPE = 15, BSON$3$1.BSON_DATA_INT = 16, BSON$3$1.BSON_DATA_TIMESTAMP = 17, BSON$3$1.BSON_DATA_LONG = 18, BSON$3$1.BSON_DATA_MIN_KEY = 255, BSON$3$1.BSON_DATA_MAX_KEY = 127, BSON$3$1.BSON_BINARY_SUBTYPE_DEFAULT = 0, BSON$3$1.BSON_BINARY_SUBTYPE_FUNCTION = 1, BSON$3$1.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2, BSON$3$1.BSON_BINARY_SUBTYPE_UUID = 3, BSON$3$1.BSON_BINARY_SUBTYPE_MD5 = 4, BSON$3$1.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;
    var bson$2 = BSON$3$1,
        Code_1$1$1 = code$3,
        Map_1$1 = map$1,
        Symbol_1$1$1 = symbol$2,
        BSON_1$1 = BSON$3$1,
        DBRef_1$1$1 = db_ref$2,
        Binary_1$1$1 = binary$2,
        ObjectId$1$1 = objectid$2,
        ObjectID_1$1$1 = objectid$2,
        Long_1$1$1 = long_1$2,
        Timestamp_1$1$1 = timestamp$2,
        Double_1$1$1 = double_1$2,
        Int32_1$1$1 = int_32$2,
        MinKey_1$1$1 = min_key$2,
        MaxKey_1$1$1 = max_key$2,
        BSONRegExp_1$1$1 = regexp$3,
        Decimal128_1$1$1 = decimal128$2;
    bson$2.Code = Code_1$1$1, bson$2.Map = Map_1$1, bson$2.Symbol = Symbol_1$1$1, bson$2.BSON = BSON_1$1, bson$2.DBRef = DBRef_1$1$1, bson$2.Binary = Binary_1$1$1, bson$2.ObjectId = ObjectId$1$1, bson$2.ObjectID = ObjectID_1$1$1, bson$2.Long = Long_1$1$1, bson$2.Timestamp = Timestamp_1$1$1, bson$2.Double = Double_1$1$1, bson$2.Int32 = Int32_1$1$1, bson$2.MinKey = MinKey_1$1$1, bson$2.MaxKey = MaxKey_1$1$1, bson$2.BSONRegExp = BSONRegExp_1$1$1, bson$2.Decimal128 = Decimal128_1$1$1;
    var jsBson$1 = bson$2,
        Fields$b, GS;
    GS = Fields$b || (Fields$b = {}), GS.ID = "_id", GS.KEY = "key", GS.NAME = "name", GS.DISABLED = "disabled";
    var UserApiKey = function() {
        function r(e, t, r, n) {
            this.id = jsBson$1.ObjectID.createFromHexString(e), this.key = t, this.name = r, this.disabled = n
        }
        return r.readFromApi = function(e) {
            var t = "string" == typeof e ? JSON.parse(e) : e;
            return Assertions.keyPresent(Fields$b.ID, t), Assertions.keyPresent(Fields$b.NAME, t), Assertions.keyPresent(Fields$b.DISABLED, t), new r(t[Fields$b.ID], t[Fields$b.KEY], t[Fields$b.NAME], t[Fields$b.DISABLED])
        }, r.prototype.toJSON = function() {
            var e;
            return (e = {})[Fields$b.ID] = this.id, e[Fields$b.KEY] = this.key, e[Fields$b.NAME] = this.name, e[Fields$b.DISABLED] = this.disabled, e
        }, r
    }(),
        UserApiKeyAuthProvider = function() {
            function e() {}
            return e.TYPE = "api-key", e.DEFAULT_NAME = "api-key", e
        }(),
        __extends$d = (QS = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                QS(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        QS, ApiKeyFields;
    (ApiKeyFields || (ApiKeyFields = {})).NAME = "name";
    var CoreUserApiKeyAuthProviderClient = function(i) {
        function e(e, t) {
            var r = t.baseAuthRoute + "/api_keys",
                n = UserApiKeyAuthProvider.DEFAULT_NAME;
            return i.call(this, n, e, r) || this
        }
        return __extends$d(e, i), e.prototype.createApiKey = function(e) {
            var t, r = new StitchAuthDocRequest.Builder;
            return r.withMethod(Method$1.POST).withPath(this.baseRoute).withDocument((t = {}, t[ApiKeyFields.NAME] = e, t)).withRefreshToken(), this.requestClient.doAuthenticatedRequest(r.build()).then(function(e) {
                return UserApiKey.readFromApi(e.body)
            }).
            catch (function(e) {
                throw wrapDecodingError(e)
            })
        }, e.prototype.fetchApiKey = function(e) {
            var t = new StitchAuthRequest.Builder;
            return t.withMethod(Method$1.GET).withPath(this.getApiKeyRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function(e) {
                return UserApiKey.readFromApi(e.body)
            }).
            catch (function(e) {
                throw wrapDecodingError(e)
            })
        }, e.prototype.fetchApiKeys = function() {
            var e = new StitchAuthRequest.Builder;
            return e.withMethod(Method$1.GET).withPath(this.baseRoute), e.withRefreshToken(), this.requestClient.doAuthenticatedRequest(e.build()).then(function(e) {
                var t = JSON.parse(e.body);
                if (Array.isArray(t)) return t.map(function(e) {
                    return UserApiKey.readFromApi(e)
                });
                throw new StitchRequestError(new Error("unexpected non-array response from server"), exports.StitchRequestErrorCode.DECODING_ERROR)
            }).
            catch (function(e) {
                throw wrapDecodingError(e)
            })
        }, e.prototype.deleteApiKey = function(e) {
            var t = new StitchAuthRequest.Builder;
            return t.withMethod(Method$1.DELETE).withPath(this.getApiKeyRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
        }, e.prototype.enableApiKey = function(e) {
            var t = new StitchAuthRequest.Builder;
            return t.withMethod(Method$1.PUT).withPath(this.getApiKeyEnableRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
        }, e.prototype.disableApiKey = function(e) {
            var t = new StitchAuthRequest.Builder;
            return t.withMethod(Method$1.PUT).withPath(this.getApiKeyDisableRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
        }, e.prototype.getApiKeyRoute = function(e) {
            return this.baseRoute + "/" + e
        }, e.prototype.getApiKeyEnableRoute = function(e) {
            return this.getApiKeyRoute(e) + "/enable"
        }, e.prototype.getApiKeyDisableRoute = function(e) {
            return this.getApiKeyRoute(e) + "/disable"
        }, e
    }(CoreAuthProviderClient),
        Fields$c;
    (Fields$c || (Fields$c = {})).KEY = "key";
    var UserApiKeyCredential = function(e, t) {
        var r;
        void 0 === t && (t = UserApiKeyAuthProvider.DEFAULT_NAME), this.providerType = UserApiKeyAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.key = e, this.material = ((r = {})[Fields$c.KEY] = this.key, r)
    }, UserPasswordAuthProvider = function() {
            function e() {}
            return e.TYPE = "local-userpass", e.DEFAULT_NAME = "local-userpass", e
        }(),
        __extends$e = (IT = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                IT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        IT, RegistrationFields, RT, ActionFields, ST;
    RT = RegistrationFields || (RegistrationFields = {}), RT.EMAIL = "email", RT.PASSWORD = "password", ST = ActionFields || (ActionFields = {}), ST.EMAIL = "email", ST.PASSWORD = "password", ST.TOKEN = "token", ST.TOKEN_ID = "tokenId";
    var CoreUserPasswordAuthProviderClient = function(i) {
        function e(e, t, r) {
            void 0 === e && (e = UserPasswordAuthProvider.DEFAULT_NAME);
            var n = r.getAuthProviderRoute(e);
            return i.call(this, e, t, n) || this
        }
        return __extends$e(e, i), e.prototype.registerWithEmailInternal = function(e, t) {
            var r, n = new StitchDocRequest.Builder;
            return n.withMethod(Method$1.POST).withPath(this.getRegisterWithEmailRoute()), n.withDocument(((r = {})[RegistrationFields.EMAIL] = e, r[RegistrationFields.PASSWORD] = t, r)), this.requestClient.doRequest(n.build()).then(function() {})
        }, e.prototype.confirmUserInternal = function(e, t) {
            var r, n = new StitchDocRequest.Builder;
            return n.withMethod(Method$1.POST).withPath(this.getConfirmUserRoute()), n.withDocument(((r = {})[ActionFields.TOKEN] = e, r[ActionFields.TOKEN_ID] = t, r)), this.requestClient.doRequest(n.build()).then(function() {})
        }, e.prototype.resendConfirmationEmailInternal = function(e) {
            var t, r = new StitchDocRequest.Builder;
            return r.withMethod(Method$1.POST).withPath(this.getResendConfirmationEmailRoute()), r.withDocument(((t = {})[ActionFields.EMAIL] = e, t)), this.requestClient.doRequest(r.build()).then(function() {})
        }, e.prototype.resetPasswordInternal = function(e, t, r) {
            var n, i = new StitchDocRequest.Builder;
            return i.withMethod(Method$1.POST).withPath(this.getResetPasswordRoute()), i.withDocument(((n = {})[ActionFields.TOKEN] = e, n[ActionFields.TOKEN_ID] = t, n[ActionFields.PASSWORD] = r, n)), this.requestClient.doRequest(i.build()).then(function() {})
        }, e.prototype.sendResetPasswordEmailInternal = function(e) {
            var t, r = new StitchDocRequest.Builder;
            return r.withMethod(Method$1.POST).withPath(this.getSendResetPasswordEmailRoute()), r.withDocument(((t = {})[ActionFields.EMAIL] = e, t)), this.requestClient.doRequest(r.build()).then(function() {})
        }, e.prototype.getRegisterWithEmailRoute = function() {
            return this.getExtensionRoute("register")
        }, e.prototype.getConfirmUserRoute = function() {
            return this.getExtensionRoute("confirm")
        }, e.prototype.getResendConfirmationEmailRoute = function() {
            return this.getExtensionRoute("confirm/send")
        }, e.prototype.getResetPasswordRoute = function() {
            return this.getExtensionRoute("reset")
        }, e.prototype.getSendResetPasswordEmailRoute = function() {
            return this.getExtensionRoute("reset/send")
        }, e.prototype.getExtensionRoute = function(e) {
            return this.baseRoute + "/" + e
        }, e
    }(CoreAuthProviderClient),
        Fields$d, sU;
    sU = Fields$d || (Fields$d = {}), sU.USERNAME = "username", sU.PASSWORD = "password";
    var UserPasswordCredential = function(e, t, r) {
        var n;
        void 0 === r && (r = UserPasswordAuthProvider.DEFAULT_NAME), this.username = e, this.password = t, this.providerName = r, this.providerType = UserPasswordAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.material = ((n = {})[Fields$d.USERNAME] = this.username, n[Fields$d.PASSWORD] = this.password, n)
    }, UserType, yU;
    yU = UserType || (UserType = {}), yU.Normal = "normal", yU.Server = "server", yU.Unknown = "unknown";
    var UserType$1 = UserType,
        MemoryStorage = function() {
            function e(e) {
                this.suiteName = e, this.storage = {}
            }
            return e.prototype.get = function(e) {
                return this.storage[this.suiteName + "." + e]
            }, e.prototype.set = function(e, t) {
                this.storage[this.suiteName + "." + e] = t
            }, e.prototype.remove = function(e) {
                delete this.storage[this.suiteName + "." + e]
            }, e
        }(),
        CoreStitchServiceClientImpl = function() {
            function e(e, t, r) {
                this.requestClient = e, this.serviceRoutes = t, this.serviceName = r
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.requestClient.doAuthenticatedRequestWithDecoder(this.getCallServiceFunctionRequest(e, t), r)
            }, e.prototype.getCallServiceFunctionRequest = function(e, t) {
                var r = {
                    name: e
                };
                void 0 !== this.serviceName && (r.service = this.serviceName), r.arguments = t;
                var n = new StitchAuthDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.serviceRoutes.functionCallRoute), n.withDocument(r), n.build()
            }, e
        }(),
        CoreStitchAppClient = function() {
            function e(e, t) {
                this.functionService = new CoreStitchServiceClientImpl(e, t.serviceRoutes)
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.functionService.callFunction(e, t, r)
            }, e
        }(),
        Response = function(r, e, t) {
            var n = this;
            this.statusCode = e, this.body = t, this.headers = {}, Object.keys(r).map(function(e, t) {
                n.headers[e.toLocaleLowerCase()] = r[e]
            })
        };
    ! function(e) {
        if (!e.fetch) {
            var t = "URLSearchParams" in e,
                r = "Symbol" in e && "iterator" in Symbol,
                s = "FileReader" in e && "Blob" in e && function() {
                    try {
                        return new Blob, !0
                    } catch (e) {
                        return !1
                    }
                }(),
                n = "FormData" in e,
                i = "ArrayBuffer" in e;
            if (i) var o = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
            u = function(e) {
                return e && DataView.prototype.isPrototypeOf(e)
            }, a = ArrayBuffer.isView || function(e) {
                return e && -1 < o.indexOf(Object.prototype.toString.call(e))
            };
            d.prototype.append = function(e, t) {
                e = l(e), t = h(t);
                var r = this.map[e];
                this.map[e] = r ? r + "," + t : t
            }, d.prototype.delete = function(e) {
                delete this.map[l(e)]
            }, d.prototype.get = function(e) {
                return e = l(e), this.has(e) ? this.map[e] : null
            }, d.prototype.has = function(e) {
                return this.map.hasOwnProperty(l(e))
            }, d.prototype.set = function(e, t) {
                this.map[l(e)] = h(t)
            }, d.prototype.forEach = function(e, t) {
                for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
            }, d.prototype.keys = function() {
                var r = [];
                return this.forEach(function(e, t) {
                    r.push(t)
                }), p(r)
            }, d.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), p(t)
            }, d.prototype.entries = function() {
                var r = [];
                return this.forEach(function(e, t) {
                    r.push([t, e])
                }), p(r)
            }, r && (d.prototype[Symbol.iterator] = d.prototype.entries);
            var f = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            S.prototype.clone = function() {
                return new S(this, {
                    body: this._bodyInit
                })
            }, b.call(S.prototype), b.call(N.prototype), N.prototype.clone = function() {
                return new N(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new d(this.headers),
                    url: this.url
                })
            }, N.error = function() {
                var e = new N(null, {
                    status: 0,
                    statusText: ""
                });
                return e.type = "error", e
            };
            var c = [301, 302, 303, 307, 308];
            N.redirect = function(e, t) {
                if (-1 === c.indexOf(t)) throw new RangeError("Invalid status code");
                return new N(null, {
                    status: t,
                    headers: {
                        location: e
                    }
                })
            }, e.Headers = d, e.Request = S, e.Response = N, e.fetch = function(r, i) {
                return new Promise(function(n, e) {
                    var t = new S(r, i),
                        o = new XMLHttpRequest;
                    o.onload = function() {
                        var e, i, t = {
                                status: o.status,
                                statusText: o.statusText,
                                headers: (e = o.getAllResponseHeaders() || "", i = new d, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                                    var t = e.split(":"),
                                        r = t.shift().trim();
                                    if (r) {
                                        var n = t.join(":").trim();
                                        i.append(r, n)
                                    }
                                }), i)
                            };
                        t.url = "responseURL" in o ? o.responseURL : t.headers.get("X-Request-URL");
                        var r = "response" in o ? o.response : o.responseText;
                        n(new N(r, t))
                    }, o.onerror = function() {
                        e(new TypeError("Network request failed"))
                    }, o.ontimeout = function() {
                        e(new TypeError("Network request failed"))
                    }, o.open(t.method, t.url, !0), "include" === t.credentials ? o.withCredentials = !0 : "omit" === t.credentials && (o.withCredentials = !1), "responseType" in o && s && (o.responseType = "blob"), t.headers.forEach(function(e, t) {
                        o.setRequestHeader(t, e)
                    }), o.send(void 0 === t._bodyInit ? null : t._bodyInit)
                })
            }, e.fetch.polyfill = !0
        }

        function l(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }

        function h(e) {
            return "string" != typeof e && (e = String(e)), e
        }

        function p(t) {
            var e = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return r && (e[Symbol.iterator] = function() {
                return e
            }), e
        }

        function d(t) {
            this.map = {}, t instanceof d ? t.forEach(function(e, t) {
                this.append(t, e)
            }, this) : Array.isArray(t) ? t.forEach(function(e) {
                this.append(e[0], e[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }

        function y(e) {
            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }

        function _(r) {
            return new Promise(function(e, t) {
                r.onload = function() {
                    e(r.result)
                }, r.onerror = function() {
                    t(r.error)
                }
            })
        }

        function g(e) {
            var t = new FileReader,
                r = _(t);
            return t.readAsArrayBuffer(e), r
        }

        function $(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer
        }

        function b() {
            return this.bodyUsed = !1, this._initBody = function(e) {
                if (this._bodyInit = e)
                    if ("string" == typeof e) this._bodyText = e;
                    else if (s && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
                else if (n && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
                else if (t && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
                else if (i && s && u(e)) this._bodyArrayBuffer = $(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                else {
                    if (!i || !ArrayBuffer.prototype.isPrototypeOf(e) && !a(e)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = $(e)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, s && (this.blob = function() {
                var e = y(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? y(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(g)
            }), this.text = function() {
                var e, t, r, n = y(this);
                if (n) return n;
                if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, r = _(t), t.readAsText(e), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
                    for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, n && (this.formData = function() {
                return this.text().then(m)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function S(e, t) {
            var r, n, i = (t = t || {}).body;
            if (e instanceof S) {
                if (e.bodyUsed) throw new TypeError("Already read");
                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new d(e.headers)), this.method = e.method, this.mode = e.mode, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0)
            } else this.url = String(e); if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new d(t.headers)), this.method = (r = t.method || this.method || "GET", n = r.toUpperCase(), -1 < f.indexOf(n) ? n : r), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(i)
        }

        function m(e) {
            var i = new FormData;
            return e.trim().split("&").forEach(function(e) {
                if (e) {
                    var t = e.split("="),
                        r = t.shift().replace(/\+/g, " "),
                        n = t.join("=").replace(/\+/g, " ");
                    i.append(decodeURIComponent(r), decodeURIComponent(n))
                }
            }), i
        }

        function N(e, t) {
            t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new d(t.headers), this.url = t.url || "", this._initBody(e)
        }
    }("undefined" != typeof self ? self : void 0);
    var globalObj = "undefined" != typeof self && self || commonjsGlobal,
        fetchNpmBrowserify = globalObj.fetch.bind(globalObj),
        FetchTransport = function() {
            function e() {}
            return e.prototype.roundTrip = function(e) {
                var t = fetchNpmBrowserify(e.url, {
                    body: e.body,
                    headers: e.headers,
                    method: e.method
                }),
                    r = t.then(function(e) {
                        return e.text()
                    });
                return Promise.all([t, r]).then(function(e) {
                    var t = e[0],
                        r = e[1],
                        n = {};
                    return t.headers.forEach(function(e, t) {
                        n[t] = e
                    }), new Response(n, t.status, r)
                })
            }, e
        }(),
        BASE_ROUTE = "/api/client/v2.0";

    function getAppRoute(e) {
        return BASE_ROUTE + "/app/" + e
    }

    function getFunctionCallRoute(e) {
        return getAppRoute(e) + "/functions/call"
    }

    function getAuthProviderRoute(e, t) {
        return getAppRoute(e) + "/auth/providers/" + t
    }

    function getAuthProviderLoginRoute(e, t) {
        return getAuthProviderRoute(e, t) + "/login"
    }

    function getAuthProviderLinkRoute(e, t) {
        return getAuthProviderLoginRoute(e, t) + "?link=true"
    }
    var StitchAppAuthRoutes = function() {
        function e(e) {
            var t = this;
            this.baseAuthRoute = BASE_ROUTE + "/auth", this.sessionRoute = t.baseAuthRoute + "/session", this.profileRoute = t.baseAuthRoute + "/profile", this.clientAppId = e
        }
        return e.prototype.getAuthProviderRoute = function(e) {
            return getAuthProviderRoute(this.clientAppId, e)
        }, e.prototype.getAuthProviderLoginRoute = function(e) {
            return getAuthProviderLoginRoute(this.clientAppId, e)
        }, e.prototype.getAuthProviderLinkRoute = function(e) {
            return getAuthProviderLinkRoute(this.clientAppId, e)
        }, e.prototype.getAuthProviderExtensionRoute = function(e, t) {
            return this.getAuthProviderRoute(e) + "/" + t
        }, e
    }(),
        StitchServiceRoutes = function(e) {
            this.clientAppId = e, this.functionCallRoute = getFunctionCallRoute(e)
        }, StitchAppRoutes = function(e) {
            this.clientAppId = e, this.authRoutes = new StitchAppAuthRoutes(e), this.serviceRoutes = new StitchServiceRoutes(e), this.functionCallRoute = getFunctionCallRoute(e)
        }, BasicRequest = function(e, t, r, n) {
            this.method = e, this.url = t, this.headers = r, this.body = n
        }, KX, LX;

    function inspectResponse(e) {
        return 200 <= e.statusCode && e.statusCode < 300 ? e : handleRequestError(e)
    }
    KX = BasicRequest || (BasicRequest = {}), LX = function() {
        function e(e) {
            e && (this.method = e.method, this.url = e.url, this.headers = e.headers, this.body = e.body)
        }
        return e.prototype.withMethod = function(e) {
            return this.method = e, this
        }, e.prototype.withUrl = function(e) {
            return this.url = e, this
        }, e.prototype.withHeaders = function(e) {
            return this.headers = e, this
        }, e.prototype.withBody = function(e) {
            return this.body = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.method) throw new Error("must set method");
            if (void 0 === this.url) throw new Error("must set non-empty url");
            return new KX(this.method, this.url, void 0 === this.headers ? {} : this.headers, this.body)
        }, e
    }(), KX.Builder = LX;
    var StitchRequestClient = function() {
        function e(e, t) {
            this.baseUrl = e, this.transport = t
        }
        return e.prototype.doRequest = function(e) {
            return this.transport.roundTrip(this.buildRequest(e)).
            catch (function(e) {
                throw new StitchRequestError(e, exports.StitchRequestErrorCode.TRANSPORT_ERROR)
            }).then(inspectResponse)
        }, e.prototype.buildRequest = function(e) {
            return (new BasicRequest.Builder).withMethod(e.method).withUrl("" + this.baseUrl + e.path).withHeaders(e.headers).withBody(e.body).build()
        }, e
    }(),
        StitchClientConfiguration = function() {
            function e(e, t, r, n) {
                this.baseUrl = e, this.storage = t, this.dataDirectory = r, this.transport = n
            }
            return e.prototype.builder = function() {
                return new e.Builder(this)
            }, e
        }(),
        cY, dY;
    cY = StitchClientConfiguration || (StitchClientConfiguration = {}), dY = function() {
        function e(e) {
            e && (this.baseUrl = e.baseUrl, this.storage = e.storage, this.dataDirectory = e.dataDirectory, this.transport = e.transport)
        }
        return e.prototype.withBaseUrl = function(e) {
            return this.baseUrl = e, this
        }, e.prototype.withStorage = function(e) {
            return this.storage = e, this
        }, e.prototype.withDataDirectory = function(e) {
            return this.dataDirectory = e, this
        }, e.prototype.withTransport = function(e) {
            return this.transport = e, this
        }, e.prototype.build = function() {
            return new cY(this.baseUrl, this.storage, this.dataDirectory, this.transport)
        }, e
    }(), cY.Builder = dY;
    var __extends$f = (kY = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            kY(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        kY, zY, AY;
    exports.StitchAppClientConfiguration = function(i) {
        function e(e, t, r) {
            var n = i.call(this, e.baseUrl, e.storage, e.dataDirectory, e.transport) || this;
            return n.localAppVersion = r, n.localAppName = t, n
        }
        return __extends$f(e, i), e.prototype.builder = function() {
            return new e.Builder(this)
        }, e
    }(StitchClientConfiguration), zY = exports.StitchAppClientConfiguration || (exports.StitchAppClientConfiguration = {}), AY = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return e && (t.localAppVersion = e.localAppVersion, t.localAppName = e.localAppName), t
        }
        return __extends$f(e, r), e.prototype.withLocalAppName = function(e) {
            return this.localAppName = e, this
        }, e.prototype.withLocalAppVersion = function(e) {
            return this.localAppVersion = e, this
        }, e.prototype.build = function() {
            var e = r.prototype.build.call(this);
            return new zY(e, this.localAppName, this.localAppVersion)
        }, e
    }(StitchClientConfiguration.Builder), zY.Builder = AY;
    var StitchAppClientInfo = function(e, t, r, n) {
        this.clientAppId = e, this.dataDirectory = t, this.localAppName = r, this.localAppVersion = n
    }, FacebookRedirectCredential = function(e, t, r) {
            void 0 === t && (t = FacebookAuthProvider.DEFAULT_NAME), void 0 === r && (r = FacebookAuthProvider.TYPE), this.redirectUrl = e, this.providerName = t, this.providerType = r
        }, GoogleRedirectCredential = function(e, t, r) {
            void 0 === t && (t = GoogleAuthProvider.DEFAULT_NAME), void 0 === r && (r = GoogleAuthProvider.TYPE), this.redirectUrl = e, this.providerName = t, this.providerType = r
        }, __extends$g = (VY = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                VY(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        VY, UserApiKeyAuthProviderClientImpl = function(r) {
            function e(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$g(e, r), e.prototype.createApiKey = function(e) {
                return r.prototype.createApiKey.call(this, e)
            }, e.prototype.fetchApiKey = function(e) {
                return r.prototype.fetchApiKey.call(this, e)
            }, e.prototype.fetchApiKeys = function() {
                return r.prototype.fetchApiKeys.call(this)
            }, e.prototype.deleteApiKey = function(e) {
                return r.prototype.deleteApiKey.call(this, e)
            }, e.prototype.enableApiKey = function(e) {
                return r.prototype.enableApiKey.call(this, e)
            }, e.prototype.disableApiKey = function(e) {
                return r.prototype.disableApiKey.call(this, e)
            }, e
        }(CoreUserApiKeyAuthProviderClient);
    (exports.UserApiKeyAuthProviderClient || (exports.UserApiKeyAuthProviderClient = {})).factory = new(function() {
            function e() {}
            return e.prototype.getClient = function(e, t, r) {
                return new UserApiKeyAuthProviderClientImpl(e, r)
            }, e
        }());
    var __extends$h = (qZ = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            qZ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        qZ, UserPasswordAuthProviderClientImpl = function(n) {
            function e(e, t) {
                return n.call(this, UserPasswordAuthProvider.DEFAULT_NAME, e, t) || this
            }
            return __extends$h(e, n), e.prototype.registerWithEmail = function(e, t) {
                return n.prototype.registerWithEmailInternal.call(this, e, t)
            }, e.prototype.confirmUser = function(e, t) {
                return n.prototype.confirmUserInternal.call(this, e, t)
            }, e.prototype.resendConfirmationEmail = function(e) {
                return n.prototype.resendConfirmationEmailInternal.call(this, e)
            }, e.prototype.resetPassword = function(e, t, r) {
                return n.prototype.resetPasswordInternal.call(this, e, t, r)
            }, e.prototype.sendResetPasswordEmail = function(e) {
                return n.prototype.sendResetPasswordEmailInternal.call(this, e)
            }, e
        }(CoreUserPasswordAuthProviderClient);
    (exports.UserPasswordAuthProviderClient || (exports.UserPasswordAuthProviderClient = {})).factory = new(function() {
            function e() {}
            return e.prototype.getClient = function(e, t, r) {
                return new UserPasswordAuthProviderClientImpl(t, r)
            }, e
        }());
    var stitchPrefixKey = "__stitch.client",
        LocalStorage = function() {
            function e(e) {
                this.suiteName = e
            }
            return e.prototype.getKey = function(e) {
                return stitchPrefixKey + "." + this.suiteName + "." + e
            }, e.prototype.get = function(e) {
                return localStorage.getItem(this.getKey(e))
            }, e.prototype.set = function(e, t) {
                localStorage.setItem(this.getKey(e), t)
            }, e.prototype.remove = function(e) {
                localStorage.removeItem(this.getKey(e))
            }, e
        }();

    function detect() {
        return "undefined" != typeof navigator ? parseUserAgent(navigator.userAgent) : getNodeVersion()
    }

    function detectOS(t) {
        var e = getOperatingSystemRules().filter(function(e) {
            return e.rule && e.rule.test(t)
        })[0];
        return e ? e.name : null
    }

    function getNodeVersion() {
        return void 0 !== process && process.version && {
            name: "node",
            version: process.version.slice(1),
            os: process.platform
        }
    }

    function parseUserAgent(n) {
        var e = getBrowserRules();
        if (!n) return null;
        var t = e.map(function(e) {
            var t = e.rule.exec(n),
                r = t && t[1].split(/[._]/).slice(0, 3);
            return r && r.length < 3 && (r = r.concat(1 == r.length ? [0, 0] : [0])), t && {
                name: e.name,
                version: r.join(".")
            }
        }).filter(Boolean)[0] || null;
        return t && (t.os = detectOS(n)), /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(n) && ((t = t || {}).bot = !0), t
    }

    function getBrowserRules() {
        return buildRules([
            ["aol", /AOLShield\/([0-9\._]+)/],
            ["edge", /Edge\/([0-9\._]+)/],
            ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
            ["vivaldi", /Vivaldi\/([0-9\.]+)/],
            ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
            ["samsung", /SamsungBrowser\/([0-9\.]+)/],
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
            ["safari", /Version\/([0-9\._]+).*Safari/],
            ["facebook", /FBAV\/([0-9\.]+)/],
            ["instagram", /Instagram\ ([0-9\.]+)/],
            ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/]
        ])
    }

    function getOperatingSystemRules() {
        return buildRules([
            ["iOS", /iP(hone|od|ad)/],
            ["Android OS", /Android/],
            ["BlackBerry OS", /BlackBerry|BB10/],
            ["Windows Mobile", /IEMobile/],
            ["Amazon OS", /Kindle/],
            ["Windows 3.11", /Win16/],
            ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
            ["Windows 98", /(Windows 98)|(Win98)/],
            ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
            ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
            ["Windows Server 2003", /(Windows NT 5.2)/],
            ["Windows Vista", /(Windows NT 6.0)/],
            ["Windows 7", /(Windows NT 6.1)/],
            ["Windows 8", /(Windows NT 6.2)/],
            ["Windows 8.1", /(Windows NT 6.3)/],
            ["Windows 10", /(Windows NT 10.0)/],
            ["Windows ME", /Windows ME/],
            ["Open BSD", /OpenBSD/],
            ["Sun OS", /SunOS/],
            ["Linux", /(Linux)|(X11)/],
            ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
            ["QNX", /QNX/],
            ["BeOS", /BeOS/],
            ["OS/2", /OS\/2/],
            ["Search Bot", /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]
        ])
    }

    function buildRules(e) {
        return e.map(function(e) {
            return {
                name: e[0],
                rule: e[1]
            }
        })
    }
    var detectBrowser = {
        detect: detect,
        detectOS: detectOS,
        getNodeVersion: getNodeVersion,
        parseUserAgent: parseUserAgent
    }, detectBrowser_1 = detectBrowser.detect,
        version$1 = "4.0.13",
        RedirectFragmentFields, j$;
    j$ = RedirectFragmentFields || (RedirectFragmentFields = {}), j$.StitchError = "_stitch_error", j$.State = "_stitch_state", j$.UserAuth = "_stitch_ua", j$.LinkUser = "_stitch_link_user", j$.StitchLink = "_stitch_link", j$.ClientAppId = "_stitch_client_app_id";
    var RedirectFragmentFields$1 = RedirectFragmentFields,
        RedirectKeys, k$;
    k$ = RedirectKeys || (RedirectKeys = {}), k$.ProviderName = "_stitch_redirect_provider_name", k$.ProviderType = "_stitch_redirect_provider_type", k$.State = "_stitch_redirect_state";
    var RedirectKeys$1 = RedirectKeys,
        __extends$i = (l$ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                l$(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        l$, StitchRedirectError = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends$i(e, t), e
        }(StitchError),
        __extends$j = (x$ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                x$(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        x$, StitchUserImpl = function(s) {
            function e(e, t, r, n, i) {
                var o = s.call(this, e, t, r, n) || this;
                return o.auth = i, o
            }
            return __extends$j(e, s), e.prototype.linkWithCredential = function(e) {
                return this.auth.linkWithCredential(this, e)
            }, e.prototype.linkUserWithRedirect = function(e) {
                return this.auth.linkWithRedirectInternal(this, e)
            }, e
        }(CoreStitchUserImpl),
        StitchUserFactoryImpl = function() {
            function e(e) {
                this.auth = e
            }
            return e.prototype.makeUser = function(e, t, r, n) {
                return new StitchUserImpl(e, t, r, n, this.auth)
            }, e
        }(),
        __extends$k = (W$ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                W$(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        W$, alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        StitchAuthImpl = function(s) {
            function e(e, t, r, n, i) {
                void 0 === i && (i = window);
                var o = s.call(this, e, t, r) || this;
                return o.browserAuthRoutes = t, o.authStorage = r, o.appInfo = n, o.jsdomWindow = i, o.listeners = new Set, o
            }
            return __extends$k(e, s), Object.defineProperty(e.prototype, "userFactory", {
                get: function() {
                    return new StitchUserFactoryImpl(this)
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.getProviderClient = function(e, t) {
                return isAuthProviderClientFactory(e) ? e.getClient(this, this.requestClient, this.authRoutes) : e.getNamedClient(t, this.requestClient, this.authRoutes)
            }, e.prototype.loginWithCredential = function(e) {
                return s.prototype.loginWithCredentialInternal.call(this, e)
            }, e.prototype.loginWithRedirect = function(e) {
                var t = this.prepareRedirect(e),
                    r = t.redirectUrl,
                    n = t.state;
                this.jsdomWindow.location.replace(this.browserAuthRoutes.getAuthProviderRedirectRoute(e, r, n, this.deviceInfo))
            }, e.prototype.linkWithRedirectInternal = function(e, t) {
                var r = this;
                if (void 0 !== this.user && e.id !== this.user.id) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNoLongerValid));
                var n = this.prepareRedirect(t),
                    i = n.redirectUrl,
                    o = n.state,
                    s = this.browserAuthRoutes.getAuthProviderLinkRedirectRoute(t, i, o, this.deviceInfo);
                return fetch(new Request(s, {
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + this.authInfo.accessToken
                    }
                })).then(function(e) {
                    r.jsdomWindow.location.replace(e.headers.get("X-Stitch-Location"))
                })
            }, e.prototype.hasRedirectResult = function() {
                var e = !1;
                try {
                    return e = this.parseRedirect().isValid
                } catch (e) {
                    return !1
                } finally {
                    e || this.cleanupRedirect()
                }
            }, e.prototype.handleRedirectResult = function() {
                try {
                    var e = this.authStorage.get(RedirectKeys$1.ProviderName),
                        t = this.authStorage.get(RedirectKeys$1.ProviderType),
                        r = this.parseRedirect();
                    return this.loginWithCredentialInternal(new StitchAuthResponseCredential(this.processRedirectResult(r), t, e, r.asLink)).then(function(e) {
                        return e
                    })
                } catch (e) {
                    return Promise.reject(e)
                }
            }, e.prototype.linkWithCredential = function(e, t) {
                return s.prototype.linkUserWithCredentialInternal.call(this, e, t)
            }, e.prototype.logout = function() {
                return Promise.resolve(s.prototype.logoutInternal.call(this))
            }, Object.defineProperty(e.prototype, "deviceInfo", {
                get: function() {
                    var e = {};
                    this.hasDeviceId && (e[DeviceFields$1.DEVICE_ID] = this.deviceId), void 0 !== this.appInfo.localAppName && (e[DeviceFields$1.APP_ID] = this.appInfo.localAppName), void 0 !== this.appInfo.localAppVersion && (e[DeviceFields$1.APP_VERSION] = this.appInfo.localAppVersion);
                    var t = detectBrowser_1();
                    return t ? (e[DeviceFields$1.PLATFORM] = t.name, e[DeviceFields$1.PLATFORM_VERSION] = t.version) : (e[DeviceFields$1.PLATFORM] = "web", e[DeviceFields$1.PLATFORM_VERSION] = "0.0.0"), e[DeviceFields$1.SDK_VERSION] = version$1, e
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.addAuthListener = function(e) {
                this.listeners.add(e), this.onAuthEvent(e)
            }, e.prototype.removeAuthListener = function(e) {
                this.listeners.delete(e)
            }, e.prototype.onAuthEvent = function(t) {
                var r = this;
                if (t) {
                    var n = this;
                    new Promise(function(e) {
                        t.onAuthEvent(n), e(void 0)
                    })
                } else this.listeners.forEach(function(e) {
                    r.onAuthEvent(e)
                })
            }, e.prototype.cleanupRedirect = function() {
                this.jsdomWindow.history.replaceState(null, "", this.pageRootUrl()), this.authStorage.remove(RedirectKeys$1.State), this.authStorage.remove(RedirectKeys$1.ProviderName), this.authStorage.remove(RedirectKeys$1.ProviderType)
            }, e.prototype.parseRedirect = function() {
                if (void 0 === this.jsdomWindow) throw new StitchRedirectError("running in a non-browser environment");
                if (!this.jsdomWindow.location || !this.jsdomWindow.location.hash) throw new StitchRedirectError("window location hash was undefined");
                var e = this.authStorage.get(RedirectKeys$1.State);
                return parseRedirectFragment(this.jsdomWindow.location.hash.substring(1), e, this.appInfo.clientAppId)
            }, e.prototype.processRedirectResult = function(e) {
                try {
                    if (!e.isValid) throw new StitchRedirectError("invalid redirect result");
                    if (e.lastError) throw new StitchRedirectError("error handling redirect: " + e.lastError);
                    if (!e.authInfo) throw new StitchRedirectError("no user auth value was found: it could not be decoded from fragment")
                } catch (e) {
                    throw e
                } finally {
                    this.cleanupRedirect()
                }
                return e.authInfo
            }, e.prototype.prepareRedirect = function(e) {
                this.authStorage.set(RedirectKeys$1.ProviderName, e.providerName), this.authStorage.set(RedirectKeys$1.ProviderType, e.providerType);
                var t = e.redirectUrl;
                void 0 === t && (t = this.pageRootUrl());
                var r = generateState();
                return this.authStorage.set(RedirectKeys$1.State, r), {
                    redirectUrl: t,
                    state: r
                }
            }, e.prototype.pageRootUrl = function() {
                return [this.jsdomWindow.location.protocol, "//", this.jsdomWindow.location.host, this.jsdomWindow.location.pathname].join("")
            }, e
        }(CoreStitchAuth);

    function generateState() {
        for (var e = "", t = 0; t < 64; ++t) e += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphaNumericCharacters.length));
        return e
    }

    function unmarshallUserAuth(e) {
        var t = e.split("$");
        if (4 !== t.length) throw new StitchRedirectError("invalid user auth data provided while marshalling user authentication data: " + e);
        var r = t[0],
            n = t[1],
            i = t[2],
            o = t[3];
        return new AuthInfo(i, o, r, n)
    }
    var ParsedRedirectFragment = function() {
        function e() {
            this.stateValid = !1, this.clientAppIdValid = !1, this.asLink = !1
        }
        return Object.defineProperty(e.prototype, "isValid", {
            get: function() {
                return this.stateValid && this.clientAppIdValid
            },
            enumerable: !0,
            configurable: !0
        }), e
    }();

    function parseRedirectFragment(e, i, o) {
        var t = e.split("&"),
            s = new ParsedRedirectFragment;
        return t.forEach(function(e) {
            var t = e.split("=");
            switch (decodeURIComponent(t[0])) {
                case RedirectFragmentFields$1.StitchError:
                    s.lastError = decodeURIComponent(t[1]);
                    break;
                case RedirectFragmentFields$1.UserAuth:
                    try {
                        s.authInfo = unmarshallUserAuth(decodeURIComponent(t[1]))
                    } catch (e) {
                        s.lastError = e
                    }
                    break;
                case RedirectFragmentFields$1.StitchLink:
                    "ok" == t[1] && (s.asLink = !0);
                    break;
                case RedirectFragmentFields$1.State:
                    var r = decodeURIComponent(t[1]);
                    i === r && (s.stateValid = !0);
                    break;
                case RedirectFragmentFields$1.ClientAppId:
                    var n = decodeURIComponent(t[1]);
                    o === n && (s.clientAppIdValid = !0)
            }
        }), s
    }

    function isAuthProviderClientFactory(e) {
        return void 0 !== e.getClient
    }
    var __extends$l = (t0 = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            t0(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        t0, StitchBrowserAppAuthRoutes = function(n) {
            function e(e, t) {
                var r = n.call(this, e) || this;
                return r.baseUrl = t, r
            }
            return __extends$l(e, n), e.prototype.getAuthProviderRedirectRoute = function(e, t, r, n) {
                return "" + this.baseUrl + this.getAuthProviderLoginRoute(e.providerName) + "?redirect=" + encodeURI(t) + "&state=" + r + "&device=" + this.uriEncodeObject(n)
            }, e.prototype.getAuthProviderLinkRedirectRoute = function(e, t, r, n) {
                return "" + this.baseUrl + this.getAuthProviderLoginRoute(e.providerName) + "?redirect=" + encodeURI(t) + "&state=" + r + "&device=" + this.uriEncodeObject(n) + "&link=true&providerRedirectHeader=true"
            }, e.prototype.uriEncodeObject = function(e) {
                return encodeURIComponent(base64Encode(JSON.stringify(e)))
            }, e
        }(StitchAppAuthRoutes),
        __extends$m = (Q0 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                Q0(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        Q0, StitchBrowserAppRoutes = function(n) {
            function e(e, t) {
                var r = n.call(this, e) || this;
                return r.authRoutes = new StitchBrowserAppAuthRoutes(e, t), r
            }
            return __extends$m(e, n), e
        }(StitchAppRoutes),
        StitchServiceClientImpl = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.proxy.callFunction(e, t, r)
            }, e
        }(),
        StitchAppClientImpl = function() {
            function e(e, t) {
                this.info = new StitchAppClientInfo(e, t.dataDirectory, t.localAppName, t.localAppVersion), this.routes = new StitchBrowserAppRoutes(this.info.clientAppId, t.baseUrl);
                var r = new StitchRequestClient(t.baseUrl, t.transport);
                this.auth = new StitchAuthImpl(r, this.routes.authRoutes, t.storage, this.info), this.coreClient = new CoreStitchAppClient(this.auth, this.routes)
            }
            return e.prototype.getServiceClient = function(e, t) {
                return isServiceClientFactory(e) ? e.getClient(new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, ""), this.info) : e.getNamedClient(new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, t), this.info)
            }, e.prototype.getGeneralServiceClient = function(e) {
                return new StitchServiceClientImpl(new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, e))
            }, e.prototype.callFunction = function(e, t) {
                return this.coreClient.callFunction(e, t)
            }, e
        }();

    function isServiceClientFactory(e) {
        return void 0 !== e.getClient
    }
    var DEFAULT_BASE_URL = "https://stitch.mongodb.com",
        appClients = {}, Stitch = function() {
            function i() {}
            return Object.defineProperty(i, "defaultAppClient", {
                get: function() {
                    if (void 0 === i.defaultClientAppId) throw new Error("default app client has not yet been initialized/set");
                    return appClients[i.defaultClientAppId]
                },
                enumerable: !0,
                configurable: !0
            }), i.getAppClient = function(e) {
                if (void 0 !== appClients[e]) throw new Error("client for app '" + e + "' has not yet been initialized");
                return appClients[e]
            }, i.hasAppClient = function(e) {
                return void 0 !== appClients[e]
            }, i.initializeDefaultAppClient = function(e, t) {
                if (void 0 === t && (t = (new exports.StitchAppClientConfiguration.Builder).build()), void 0 === e || "" === e) throw new Error("clientAppId must be set to a non-empty string");
                if (void 0 !== i.defaultClientAppId) throw new Error("default app can only be set once; currently set to '" + i.defaultClientAppId + "'");
                var r = i.initializeAppClient(e, t);
                return i.defaultClientAppId = e, r
            }, i.initializeAppClient = function(e, t) {
                if (void 0 === t && (t = (new exports.StitchAppClientConfiguration.Builder).build()), void 0 === e || "" === e) throw new Error("clientAppId must be set to a non-empty string");
                if (void 0 !== appClients[e]) throw new Error("client for app '" + e + "' has already been initialized");
                var r = t.builder();
                void 0 === r.storage && r.withStorage(new LocalStorage(e)), void 0 === r.transport && r.withTransport(new FetchTransport), void 0 !== r.baseUrl && "" !== r.baseUrl || r.withBaseUrl(DEFAULT_BASE_URL), void 0 !== r.localAppName && "" !== r.localAppName || r.withLocalAppName(i.localAppName), void 0 !== r.localAppVersion && "" !== r.localAppVersion || r.withLocalAppVersion(i.localAppVersion);
                var n = new StitchAppClientImpl(e, r.build());
                return appClients[e] = n
            }, i
        }(),
        CoreRemoteMongoReadOperation = function() {
            function e(e, t, r, n) {
                this.command = e, this.args = t, this.service = r, n && (this.collectionDecoder = new(function() {
                    function e() {}
                    return e.prototype.decode = function(e) {
                        return e instanceof Array ? e.map(function(e) {
                            return n.decode(e)
                        }) : [n.decode(e)]
                    }, e
                }()))
            }
            return e.prototype.iterator = function() {
                return this.executeRead().then(function(e) {
                    return e[Symbol.iterator]()
                })
            }, e.prototype.first = function() {
                return this.executeRead().then(function(e) {
                    return e[0]
                })
            }, e.prototype.asArray = function() {
                return this.executeRead()
            }, e.prototype.executeRead = function() {
                return this.service.callFunction(this.command, [this.args], this.collectionDecoder)
            }, e
        }(),
        RemoteInsertManyResult = function(e) {
            var r = {};
            e.forEach(function(e, t) {
                r[t] = e
            }), this.insertedIds = r
        }, RemoteInsertManyResultFields, RemoteInsertOneResultFields, RemoteUpdateResultFields, S1, RemoteDeleteResultFields;
    (RemoteInsertManyResultFields || (RemoteInsertManyResultFields = {})).InsertedIds = "insertedIds", (RemoteInsertOneResultFields || (RemoteInsertOneResultFields = {})).InsertedId = "insertedId", S1 = RemoteUpdateResultFields || (RemoteUpdateResultFields = {}), S1.MatchedCount = "matchedCount", S1.ModifiedCount = "modifiedCount", S1.UpsertedId = "upsertedId", (RemoteDeleteResultFields || (RemoteDeleteResultFields = {})).DeletedCount = "deletedCount";
    var RemoteInsertManyResultDecoder = function() {
        function e() {}
        return e.prototype.decode = function(e) {
            return new RemoteInsertManyResult(e[RemoteInsertManyResultFields.InsertedIds])
        }, e
    }(),
        RemoteInsertOneResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    insertedId: e[RemoteInsertOneResultFields.InsertedId]
                }
            }, e
        }(),
        RemoteUpdateResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    matchedCount: e[RemoteUpdateResultFields.MatchedCount],
                    modifiedCount: e[RemoteUpdateResultFields.ModifiedCount],
                    upsertedId: e[RemoteUpdateResultFields.UpsertedId]
                }
            }, e
        }(),
        RemoteDeleteResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    deletedCount: e[RemoteDeleteResultFields.DeletedCount]
                }
            }, e
        }(),
        ResultDecoders = function() {
            function e() {}
            return e.remoteInsertManyResultDecoder = new RemoteInsertManyResultDecoder, e.remoteInsertOneResultDecoder = new RemoteInsertOneResultDecoder, e.remoteUpdateResultDecoder = new RemoteUpdateResultDecoder, e.remoteDeleteResultDecoder = new RemoteDeleteResultDecoder, e
        }(),
        __assign = Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }, CoreRemoteMongoCollectionImpl = function() {
            function t(e, t, r, n) {
                var i = this;
                this.name = e, this.databaseName = t, this.service = r, this.codec = n, this.namespace = this.databaseName + "." + this.name, this.baseOperationArgs = {
                    collection: i.name,
                    database: i.databaseName
                }
            }
            return t.prototype.withCollectionType = function(e) {
                return new t(this.name, this.databaseName, this.service, e)
            }, t.prototype.find = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign({}, this.baseOperationArgs);
                return r.query = e, t && (t.limit && (r.limit = t.limit), t.projection && (r.project = t.projection), t.sort && (r.sort = t.sort)), new CoreRemoteMongoReadOperation("find", r, this.service, this.codec)
            }, t.prototype.aggregate = function(e) {
                var t = __assign({}, this.baseOperationArgs);
                return t.pipeline = e, new CoreRemoteMongoReadOperation("aggregate", t, this.service, this.codec)
            }, t.prototype.count = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign({}, this.baseOperationArgs);
                return r.query = e, t && t.limit && (r.limit = t.limit), this.service.callFunction("count", [r])
            }, t.prototype.insertOne = function(e) {
                var t = __assign({}, this.baseOperationArgs);
                return t.document = this.generateObjectIdIfMissing(this.codec ? this.codec.encode(e) : e), this.service.callFunction("insertOne", [t], ResultDecoders.remoteInsertOneResultDecoder)
            }, t.prototype.insertMany = function(e) {
                var t = this,
                    r = __assign({}, this.baseOperationArgs);
                return r.documents = e.map(function(e) {
                    return t.generateObjectIdIfMissing(t.codec ? t.codec.encode(e) : e)
                }), this.service.callFunction("insertMany", [r], ResultDecoders.remoteInsertManyResultDecoder)
            }, t.prototype.deleteOne = function(e) {
                return this.executeDelete(e, !1)
            }, t.prototype.deleteMany = function(e) {
                return this.executeDelete(e, !0)
            }, t.prototype.updateOne = function(e, t, r) {
                return this.executeUpdate(e, t, r, !1)
            }, t.prototype.updateMany = function(e, t, r) {
                return this.executeUpdate(e, t, r, !0)
            }, t.prototype.executeDelete = function(e, t) {
                var r = __assign({}, this.baseOperationArgs);
                return r.query = e, this.service.callFunction(t ? "deleteMany" : "deleteOne", [r], ResultDecoders.remoteDeleteResultDecoder)
            }, t.prototype.executeUpdate = function(e, t, r, n) {
                void 0 === n && (n = !1);
                var i = __assign({}, this.baseOperationArgs);
                return i.query = e, i.update = t, r && r.upsert && (i.upsert = r.upsert), this.service.callFunction(n ? "updateMany" : "updateOne", [i], ResultDecoders.remoteUpdateResultDecoder)
            }, t.prototype.generateObjectIdIfMissing = function(e) {
                if (!e._id) {
                    var t = e;
                    return t._id = new jsBson$1.ObjectID, t
                }
                return e
            }, t
        }(),
        CoreRemoteMongoDatabaseImpl = function() {
            function e(e, t) {
                this.name = e, this.service = t
            }
            return e.prototype.collection = function(e, t) {
                return new CoreRemoteMongoCollectionImpl(e, this.name, this.service, t)
            }, e
        }(),
        CoreRemoteMongoClientImpl = function() {
            function e(e) {
                this.service = e
            }
            return e.prototype.db = function(e) {
                return new CoreRemoteMongoDatabaseImpl(e, this.service)
            }, e
        }(),
        RemoteMongoCursor = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.next = function() {
                return Promise.resolve(this.proxy.next().value)
            }, e
        }(),
        RemoteMongoReadOperation = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.first = function() {
                return this.proxy.first()
            }, e.prototype.asArray = function() {
                return this.proxy.asArray()
            }, e.prototype.iterator = function() {
                return this.proxy.iterator().then(function(e) {
                    return new RemoteMongoCursor(e)
                })
            }, e
        }(),
        RemoteMongoCollectionImpl = function() {
            function t(e) {
                this.proxy = e, this.namespace = this.proxy.namespace
            }
            return t.prototype.withCollectionType = function(e) {
                return new t(this.proxy.withCollectionType(e))
            }, t.prototype.count = function(e, t) {
                return this.proxy.count(e, t)
            }, t.prototype.find = function(e, t) {
                return new RemoteMongoReadOperation(this.proxy.find(e, t))
            }, t.prototype.aggregate = function(e) {
                return new RemoteMongoReadOperation(this.proxy.aggregate(e))
            }, t.prototype.insertOne = function(e) {
                return this.proxy.insertOne(e)
            }, t.prototype.insertMany = function(e) {
                return this.proxy.insertMany(e)
            }, t.prototype.deleteOne = function(e) {
                return this.proxy.deleteOne(e)
            }, t.prototype.deleteMany = function(e) {
                return this.proxy.deleteMany(e)
            }, t.prototype.updateOne = function(e, t, r) {
                return this.proxy.updateOne(e, t, r)
            }, t.prototype.updateMany = function(e, t, r) {
                return this.proxy.updateMany(e, t, r)
            }, t
        }(),
        RemoteMongoDatabaseImpl = function() {
            function e(e) {
                this.proxy = e, this.name = this.proxy.name
            }
            return e.prototype.collection = function(e, t) {
                return new RemoteMongoCollectionImpl(this.proxy.collection(e, t))
            }, e
        }(),
        RemoteMongoClientImpl = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.db = function(e) {
                return new RemoteMongoDatabaseImpl(this.proxy.db(e))
            }, e
        }();
    (exports.RemoteMongoClient || (exports.RemoteMongoClient = {})).factory = new(function() {
            function e() {}
            return e.prototype.getNamedClient = function(e, t) {
                return new RemoteMongoClientImpl(new CoreRemoteMongoClientImpl(e))
            }, e
        }()), exports.AnonymousAuthProvider = AnonymousAuthProvider, exports.AnonymousCredential = AnonymousCredential, exports.CustomAuthProvider = CustomAuthProvider, exports.CustomCredential = CustomCredential, exports.FacebookAuthProvider = FacebookAuthProvider, exports.FacebookCredential = FacebookCredential, exports.GoogleAuthProvider = GoogleAuthProvider, exports.GoogleCredential = GoogleCredential, exports.ServerApiKeyAuthProvider = ServerApiKeyAuthProvider, exports.ServerApiKeyCredential = ServerApiKeyCredential, exports.UserApiKeyAuthProvider = UserApiKeyAuthProvider, exports.UserApiKey = UserApiKey, exports.UserApiKeyCredential = UserApiKeyCredential, exports.UserPasswordAuthProvider = UserPasswordAuthProvider, exports.UserPasswordCredential = UserPasswordCredential, exports.StitchAppClientInfo = StitchAppClientInfo, exports.StitchClientError = StitchClientError, exports.StitchRequestError = StitchRequestError, exports.StitchServiceError = StitchServiceError, exports.StitchUserIdentity = StitchUserIdentity, exports.MemoryStorage = MemoryStorage, exports.UserType = UserType$1, exports.Stitch = Stitch, exports.FacebookRedirectCredential = FacebookRedirectCredential, exports.GoogleRedirectCredential = GoogleRedirectCredential, exports.RemoteInsertManyResult = RemoteInsertManyResult, exports.RemoteMongoReadOperation = RemoteMongoReadOperation
}(this.stitch = this.stitch || {});
//# sourceMappingURL=stitch.js.map