/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Lightstreamer JavaScript Client
 * Version 6.1.4 build 1640.11
 * Copyright (c) 2004-2015 Weswit Srl. All Rights Reserved.
 * Contains: LightstreamerClient, Subscription, DynaGrid, StaticGrid
 *   StatusWidget
 * Globals
 */
(function () {
    function define(a, c, e) {
        define.a[a] = {e: c, d: e}
    }

    define.a = {};
    define.b = function (a, c, e) {
        for (var g = [], f = 0; f < a.length; f++) {
            var d = define.a[a[f]];
            if (!d)throw"All the modules must already be 'defined' Async load not supported: use a full-featured AMD loader like requirejs";
            d.c || define.b(d.e, d.d, a[f]);
            g.push(d.c)
        }
        a = c.apply(null, g);
        if (e)define.a[e].c = a
    };
    function require(a, c) {
        define.b(a, c, null)
    };
    function u() {
        return function (g) {
            return g
        }
    }

    function D() {
        return function () {
        }
    }

    function G(g) {
        return function (f) {
            this[g] = f
        }
    }

    function M(g) {
        return function () {
            return this[g]
        }
    }

    function V(g) {
        return function () {
            return g
        }
    }

    define("IllegalStateException", [], function () {
        function g(f) {
            this.name = "IllegalStateException";
            this.message = f
        }

        g.prototype = {
            toString: function () {
                return ["[", this.name, this.message, "]"].join("|")
            }
        };
        return g
    });
    define("Environment", ["IllegalStateException"], function (g) {
        var f = "undefined" !== typeof window && navigator && document, e = "undefined" !== typeof importScripts, b = "object" == typeof process && (/node(\.exe)?$/.test(process.execPath) || process.node && process.v8 || process.versions && process.versions.node && process.versions.v8);
        if (f && !document.getElementById)throw new g("Not supported browser");
        var d = {
            isBrowserDocument: function () {
                return f
            }, isBrowser: function () {
                return !b && (f || e)
            }, isNodeJS: function () {
                return !f && b
            }, isWebWorker: function () {
                return !f && !b && e
            }, browserDocumentOrDie: function () {
                if (!this.isBrowserDocument())throw new g("Trying to load a browser-only module on non-browser environment");
            }
        };
        d.isBrowserDocument = d.isBrowserDocument;
        d.isBrowser = d.isBrowser;
        d.isNodeJS = d.isNodeJS;
        d.isWebWorker = d.isWebWorker;
        d.browserDocumentOrDie = d.browserDocumentOrDie;
        return d
    });
    define("Helpers", ["Environment"], function (g) {
        var f = /^\s*([\s\S]*?)\s*$/, e = /,/, b = /\./, d = {
            getTimeStamp: function () {
                return (new Date).getTime()
            }, randomG: function (b) {
                return Math.round(Math.random() * (b || 1E3))
            }, trim: function (b) {
                return b.replace(f, "$1")
            }, getNumber: function (d, a) {
                if (d) {
                    if (!d.replace)return d;
                    a ? (d = d.replace(b, ""), d = d.replace(e, ".")) : d = d.replace(e, "");
                    return new Number(d)
                }
                return 0
            }, isArray: function (b) {
                return b.join && "function" == typeof b.join
            }, addEvent: function (b, a, c) {
                if (!g.isBrowserDocument())return !1;
                "undefined" != typeof b.addEventListener ? b.addEventListener(a, c, !1) : "undefined" != typeof b.attachEvent && b.attachEvent("on" + a, c);
                return !0
            }, removeEvent: function (b, a, c) {
                if (!g.isBrowserDocument())return !1;
                "undefined" != typeof b.removeEventListener ? b.removeEventListener(a, c, !1) : "undefined" != typeof b.detachEvent && b.detachEvent("on" + a, c);
                return !0
            }
        };
        d.getTimeStamp = d.getTimeStamp;
        d.randomG = d.randomG;
        d.trim = d.trim;
        d.getNumber = d.getNumber;
        d.isArray = d.isArray;
        d.addEvent = d.addEvent;
        d.removeEvent = d.removeEvent;
        return d
    });
    define("BrowserDetection", ["Environment"], function (g) {
        function f(b) {
            var d = a;
            return function () {
                null === d && (d = -1 < c.indexOf(b));
                return d
            }
        }

        function e(b) {
            var c = a;
            return function () {
                if (null === c) {
                    c = !0;
                    for (var a = 0; a < b.length; a++)c = c && b[a]()
                }
                return c
            }
        }

        function b(b, c) {
            var d = a, e = a;
            return function (a, h) {
                null === d && (e = (d = b()) ? c() : null);
                return d ? a && e ? !0 === h ? e <= a : !1 === h ? e >= a : e == a : !0 : !1
            }
        }

        function d(a) {
            return function () {
                var b = a.exec(c);
                return b && 2 <= b.length ? b[1] : null
            }
        }

        function h(a) {
            return function () {
                return !a()
            }
        }

        var a =
            g.isBrowser() ? null : !1, c = g.isBrowser() ? navigator.userAgent.toLowerCase() : null, l = a;
        g = {
            isProbablyRekonq: f("rekonq"),
            isProbablyAWebkit: f("webkit"),
            isProbablyPlaystation: f("playstation 3"),
            isProbablyChrome: b(f("chrome/"), d(RegExp("chrome/([0-9]+)", "g"))),
            isProbablyAKhtml: function () {
                null === l && (l = document.childNodes && !document.all && !navigator.CC && !navigator.sC);
                return l
            },
            isProbablyKonqueror: b(f("konqueror"), d(RegExp("konqueror/([0-9.]+)", "g"))),
            isProbablyIE: b(f("msie"), d(RegExp("msie\\s([0-9]+)[.;]", "g"))),
            isProbablyFX: b(f("firefox"), d(/firefox\/(\d+\.?\d*)/)),
            isProbablyOldOpera: b(function () {
                return "undefined" != typeof opera
            }, function () {
                if (opera.version) {
                    var a = opera.version(), a = a.replace(RegExp("[^0-9.]+", "g"), "");
                    return parseInt(a)
                }
                return 7
            })
        };
        g.isProbablyAndroidBrowser = e([f("android"), g.isProbablyAWebkit, h(g.isProbablyChrome)]);
        g.isProbablyOperaMobile = e([g.isProbablyOldOpera, f("opera mobi")]);
        g.isProbablyApple = b(e([f("safari"), function (b) {
            var c = a;
            return function () {
                if (null === c) {
                    c = !1;
                    for (var a = 0; a < b.length; a++)c =
                        c || b[a]()
                }
                return c
            }
        }([f("ipad"), f("iphone"), f("ipod"), e([h(g.isProbablyAndroidBrowser), h(g.isProbablyChrome), h(g.isProbablyRekonq)])])]), d(/version\/(\d+\.?\d*)/));
        g.isProbablyRekonq = g.isProbablyRekonq;
        g.isProbablyChrome = g.isProbablyChrome;
        g.isProbablyAWebkit = g.isProbablyAWebkit;
        g.isProbablyPlaystation = g.isProbablyPlaystation;
        g.isProbablyAndroidBrowser = g.isProbablyAndroidBrowser;
        g.isProbablyOperaMobile = g.isProbablyOperaMobile;
        g.isProbablyApple = g.isProbablyApple;
        g.isProbablyAKhtml = g.isProbablyAKhtml;
        g.isProbablyKonqueror = g.isProbablyKonqueror;
        g.isProbablyIE = g.isProbablyIE;
        g.isProbablyFX = g.isProbablyFX;
        g.isProbablyOldOpera = g.isProbablyOldOpera;
        return g
    });
    define("List", [], function () {
        function g() {
            this.data = []
        }

        g.prototype = {
            add: function (f) {
                this.data.push(f)
            }, remove: function (f) {
                for (var e = 0; e < this.data.length; e++)if (this.data[e] == f)return this.data.splice(e, 1), !0;
                return !1
            }, forEach: function (f) {
                for (var e = 0; e < this.data.length; e++)f(this.data[e])
            }, asArray: function () {
                return [].concat(this.data)
            }, clean: function () {
                this.data = []
            }
        };
        g.prototype.add = g.prototype.add;
        g.prototype.remove = g.prototype.remove;
        g.prototype.forEach = g.prototype.forEach;
        g.prototype.asArray = g.prototype.asArray;
        g.prototype.clean = g.prototype.clean;
        return g
    });
    define("EnvironmentStatus", ["Helpers", "BrowserDetection", "Environment", "List"], function (g, f, e, b) {
        function d(a, b, c, d, e) {
            return function () {
                a[b] || (a[c] = !0, d.forEach(function (a) {
                    try {
                        if (a[e])a[e](); else a()
                    } catch (b) {
                    }
                }), "preunloading" != b && d.clean(), a[b] = !0, a[c] = !1)
            }
        }

        function h(a, b) {
            setTimeout(function () {
                if (a[b])a[b](); else a()
            }, 0)
        }

        function a(a, b, c, d) {
            setTimeout(function () {
                c ? d ? a.apply(c, d) : a.apply(c) : d ? a.apply(null, d) : a()
            }, b)
        }

        function c() {
            m = !0
        }

        var l = new b, n = new b, k = new b, m = !1, p = {
            rh: "onloadDone", ws: "onloadInprogress",
            Wh: "unloaded", Io: "unloading", Fs: "preunloading"
        };
        b = {};
        for (var q in p)b[p[q]] = q;
        q = {
            rh: !1,
            ws: !1,
            Wh: !1,
            Io: !1,
            Fs: !1,
            isLoaded: M("rh"),
            isUnloaded: M("Wh"),
            isUnloading: M("Io"),
            addOnloadHandler: function (a) {
                this.Zx() ? n.add(a) : h(a, "onloadEvent")
            },
            addUnloadHandler: function (a) {
                this.$x() ? l.add(a) : h(a, "unloadEvent")
            },
            addBeforeUnloadHandler: function (a) {
                k.add(a);
                this.Fs && h(a, "preUnloadEvent")
            },
            removeOnloadHandler: function (a) {
                n.remove(a)
            },
            removeUnloadHandler: function (a) {
                l.remove(a)
            },
            removeBeforeUnloadHandler: function (a) {
                k.remove(a)
            },
            Zx: function () {
                return !(this.rh || this.ws)
            },
            $x: function () {
                return !(this.Wh || this.Io)
            },
            Gu: function () {
                g.addEvent(window, "unload", this.fv);
                g.addEvent(window, "beforeunload", this.Iu);
                if (document && "undefined" != typeof document.readyState) {
                    if ("COMPLETE" == document.readyState.toUpperCase()) {
                        this.ji();
                        return
                    }
                    a(this.Xp, 1E3, this)
                } else if (this.rr()) {
                    this.ji();
                    return
                }
                if (!g.addEvent(window, "load", this.Yj))this.ji(); else if (f.isProbablyOldOpera()) {
                    var b = !1;
                    f.isProbablyOldOpera(9, !1) && (b = !0, g.addEvent(document, "DOMContentLoaded",
                        c));
                    a(this.Wp, 1E3, this, [b])
                }
            },
            ji: function () {
                a(this.Yj, 0)
            },
            Xp: function () {
                this.rh || ("COMPLETE" == document.readyState.toUpperCase() ? this.Yj() : a(this.Xp, 1E3, this))
            },
            Wp: function (b) {
                this.rh || (m || !b && this.rr() ? this.Yj() : a(this.Wp, 1E3, this, [b]))
            },
            rr: function () {
                return "undefined" != typeof document.getElementsByTagName && "undefined" != typeof document.getElementById && (null != document.getElementsByTagName("body")[0] || null != document.body)
            }
        };
        q.Yj = d(q, b.onloadDone, b.onloadInprogress, n, "onloadEvent");
        q.fv = d(q, b.unloaded,
            b.unloading, l, "unloadEvent");
        q.Iu = d(q, b.preunloading, b.preunloading, k, "preUnloadEvent");
        e.isBrowserDocument() ? q.Gu() : q.ji();
        q.addOnloadHandler = q.addOnloadHandler;
        q.addUnloadHandler = q.addUnloadHandler;
        q.addBeforeUnloadHandler = q.addBeforeUnloadHandler;
        q.removeOnloadHandler = q.removeOnloadHandler;
        q.removeUnloadHandler = q.removeUnloadHandler;
        q.removeBeforeUnloadHandler = q.removeBeforeUnloadHandler;
        q.isLoaded = q.isLoaded;
        q.isUnloaded = q.isUnloaded;
        q.isUnloading = q.isUnloading;
        return q
    });
    define("Global", ["EnvironmentStatus", "Environment"], function (g, f) {
        var e = {
            Ot: g, toString: function () {
                return "[Lightstreamer javascript client version " + this.version + " build " + this.build + "]"
            }, ua: function (b, d, h, a) {
                b = (a || "_") + b;
                this[b] || (this[b] = {});
                this[b][d] = h;
                return "Lightstreamer." + b + "." + d
            }, Ax: function (b, d, h) {
                b = (h || "_") + b;
                return this[b] && this[b][d]
            }, Cl: function (b, d, h) {
                b = (h || "_") + b;
                if (this[b] && this[b][d]) {
                    delete this[b][d];
                    for (var a in this[b])return;
                    delete this[b]
                }
            }, Yu: function (b, d) {
                var h = (d || "_") + b;
                this[h] && delete this[h]
            }, mj: {}, uu: function (b) {
                var d = this.mj, h = b.kf;
                d[h] || (d[h] = []);
                d[h].push(b)
            }, iA: function (b) {
                var d = b.kf, h = this.mj[d];
                if (h) {
                    for (var a = 0; a < h.length; a++)h[a] == b && h.splice(a, 1);
                    0 == h.length && delete h[d]
                }
            }, gx: function (b) {
                return this.mj[b] && (b = this.mj[b]) && 0 < b.length ? b[0] : null
            }
        };
        f.isBrowserDocument() && (window.lC && OpenAjax.Cx && OpenAjax.Cx.BC("Lightstreamer", "http://www.lightstreamer.com/", e.version), window.Lightstreamer = e);
        e.version = "6.1.4";
        e.build = "1640.11";
        return e
    });
    define("LoggerProxy", ["Helpers"], function (g) {
        function f(b) {
            this.co(b)
        }

        function e() {
            return !1
        }

        var b = {
            error: e,
            warn: e,
            info: e,
            debug: e,
            fatal: e,
            isDebugEnabled: e,
            isInfoEnabled: e,
            isWarnEnabled: e,
            isErrorEnabled: e,
            isFatalEnabled: e
        };
        f.prototype = {
            co: function (d) {
                this.Pa = d || b
            }, logFatal: function (b) {
                this.Tx() && (b += this.te(arguments, 1), this.fatal(b))
            }, fatal: function (b, e) {
                this.Pa.fatal(b, e)
            }, Tx: function () {
                return !this.Pa.isFatalEnabled || this.Pa.isFatalEnabled()
            }, logError: function (b) {
                this.qr() && (b += this.te(arguments,
                    1), this.error(b))
            }, logErrorExc: function (b, e) {
                this.qr() && (e += this.te(arguments, 2), this.error(e, b))
            }, error: function (b, e) {
                this.Pa.error(b, e)
            }, qr: function () {
                return !this.Pa.isErrorEnabled || this.Pa.isErrorEnabled()
            }, logWarn: function (b) {
                this.ly() && (b += this.te(arguments, 1), this.warn(b))
            }, warn: function (b, e) {
                this.Pa.warn(b, e)
            }, ly: function () {
                return !this.Pa.isWarnEnabled || this.Pa.isWarnEnabled()
            }, logInfo: function (b) {
                this.isInfoLogEnabled() && (b += this.te(arguments, 1), this.info(b))
            }, info: function (b, e) {
                this.Pa.info(b,
                    e)
            }, isInfoLogEnabled: function () {
                return !this.Pa.isInfoEnabled || this.Pa.isInfoEnabled()
            }, logDebug: function (b) {
                this.isDebugLogEnabled() && (b += this.te(arguments, 1), this.debug(b))
            }, debug: function (b, e) {
                this.Pa.debug(b, e)
            }, isDebugLogEnabled: function () {
                return !this.Pa.isDebugEnabled || this.Pa.isDebugEnabled()
            }, te: function (b, e) {
                for (var a = " {", c = e ? e : 0; c < b.length; c++)try {
                    var f = b[c];
                    null === f ? a += "NULL" : 0 > f.length ? a += "*" : null != f.charAt ? a += f : f.message ? (a += f.message, f.stack && (a += "\n" + f.stack + "\n")) : f[0] == f ? a += f : g.isArray(f) ?
                        (a += "(", a += this.te(f), a += ")") : a += f;
                    a += " "
                } catch (n) {
                    a += "missing-parameter "
                }
                return a + "}"
            }
        };
        f.prototype.debug = f.prototype.debug;
        f.prototype.isDebugLogEnabled = f.prototype.isDebugLogEnabled;
        f.prototype.logDebug = f.prototype.logDebug;
        f.prototype.info = f.prototype.info;
        f.prototype.isInfoLogEnabled = f.prototype.isInfoLogEnabled;
        f.prototype.logInfo = f.prototype.logInfo;
        f.prototype.warn = f.prototype.warn;
        f.prototype.isWarnEnabled = f.prototype.isWarnEnabled;
        f.prototype.logWarn = f.prototype.logWarn;
        f.prototype.error =
            f.prototype.error;
        f.prototype.isErrorEnabled = f.prototype.isErrorEnabled;
        f.prototype.logError = f.prototype.logError;
        f.prototype.logErrorExc = f.prototype.logErrorExc;
        f.prototype.fatal = f.prototype.fatal;
        f.prototype.isFatalEnabled = f.prototype.isFatalEnabled;
        f.prototype.logFatal = f.prototype.logFatal;
        return f
    });
    define("IllegalArgumentException", [], function () {
        function g(f) {
            this.name = "IllegalArgumentException";
            this.message = f
        }

        g.prototype = {
            toString: function () {
                return ["[", this.name, this.message, "]"].join("|")
            }
        };
        return g
    });
    define("LoggerManager", ["LoggerProxy", "IllegalArgumentException"], function (g, f) {
        var e = {}, b = null, d = {
            setLoggerProvider: function (d) {
                if (d && !d.getLogger)throw new f("The given object is not a LoggerProvider");
                b = d;
                for (var a in e)b ? e[a].co(b.getLogger(a)) : e[a].co(null)
            }, getLoggerProxy: function (d) {
                e[d] || (e[d] = b ? new g(b.getLogger(d)) : new g);
                return e[d]
            }, resolve: u()
        };
        d.setLoggerProvider = d.setLoggerProvider;
        d.getLoggerProxy = d.getLoggerProxy;
        d.resolve = d.resolve;
        return d
    });
    define("lsA", ["Environment"], function (g) {
        return {
            Td: 1E3,
            hp: 200,
            dp: 1,
            yc: 0,
            ep: 2,
            Wo: 3,
            gp: 4,
            Vk: "1640.11",
            rg: !g.isBrowserDocument() || "http:" != document.location.protocol && "https:" != document.location.protocol ? "file:" : document.location.protocol,
            ab: "lightstreamer.stream",
            Re: "lightstreamer.protocol",
            Ud: "lightstreamer.session",
            ug: "lightstreamer.subscriptions",
            Uk: "lightstreamer.actions",
            Qa: "lightstreamer.sharing",
            cp: "lightstreamer.flash",
            nC: "lightstreamer.stats",
            Vd: "Lightstreamer_",
            Zk: "lightstreamer",
            zc: "UNORDERED_MESSAGES",
            vg: {length: -1, toString: V("[UNCHANGED]")},
            CONNECTING: "CONNECTING",
            Fb: "CONNECTED:",
            tg: "STREAM-SENSING",
            Zh: "WS-STREAMING",
            qg: "HTTP-STREAMING",
            Te: "STALLED",
            xg: "WS-POLLING",
            Sd: "HTTP-POLLING",
            ac: "DISCONNECTED",
            wg: "DISCONNECTED:WILL-RETRY",
            cl: "WS",
            Yh: "HTTP",
            al: "RAW",
            Xk: "DISTINCT",
            pg: "COMMAND",
            $k: "MERGE"
        }
    });
    define("lsF", ["LoggerManager", "Helpers", "lsA"], function (g, f, e) {
        function b(a) {
            this.Ha = null;
            this.nt(a)
        }

        function d(a, c) {
            return "var callFun \x3d " + function (a, c) {
                    window.name != a || (window != top || window.Lightstreamer && window.Lightstreamer.Ot) || (window.name = c, window.close())
                }.toString() + "; callFun('" + a + "', '" + c + "');"
        }

        function h(a, c, b, h) {
            this.log = a;
            this.wy = c;
            this.Oh = b;
            this.aq = h
        }

        var a = 0, c = 0, l = !1, n = !1, k = g.getLoggerProxy(e.Qa), m = [];
        b.prototype = {
            nt: function (a) {
                k.logDebug(g.resolve(3));
                this.Ha = a;
                this.pA() ||
                this.Vb()
            }, Vb: function () {
                k.logDebug(g.resolve(4));
                this.Ha = null;
                delete m[this.Nz]
            }, pA: function () {
                try {
                    return this.Ha ? !0 : !1
                } catch (a) {
                    return !1
                }
            }, Rh: function () {
                return this.PB()
            }, PB: function () {
                k.logDebug(g.resolve(5));
                var a = 1;
                try {
                    if (null == this.Ha)return a = 2, new h("null", a, !1, !0);
                    if (this.Ha.closed)return a = 3, this.Vb(), new h("closed", a, !1, !0);
                    if (!this.Ha.Lightstreamer)return a = 4, this.Vb(), new h("not global", a, !1, !1);
                    a = 5;
                    return new h("OK", a, !0, !1)
                } catch (c) {
                    return this.Vb(), new h("exception " + a + " " + c, 6, !1,
                        !0)
                }
            }, Zm: function (b, h, e) {
                var t = null;
                try {
                    m[b] && (t = m[b])
                } catch (s) {
                    t = null
                }
                if (t && (delete m[b], this.Hr(t, b, h)))return !0;
                a:{
                    var t = "javascript:" + ('eval("' + d(b, b + "__TRASH") + '; ")'), E = null;
                    k.logDebug(g.resolve(1));
                    if (n)t = !1; else {
                        try {
                            var C;
                            if (window.oC) {
                                var y = !0;
                                -5 > c - a && (y = !1);
                                window.Zt && y ? (a++, C = e > f.getTimeStamp() ? window.Zt(t, b, "height\x3d100,width\x3d100", !0) : !1) : (l || (l = !0, k.logWarn(g.resolve(0))), a = 0, C = null)
                            } else C = e > f.getTimeStamp() ? window.open(t, b, "height\x3d100,width\x3d100", !0) : !1;
                            E = C
                        } catch (x) {
                            k.logDebug(g.resolve(2),
                                x);
                            t = !1;
                            break a
                        }
                        if (E)try {
                            c++
                        } catch (w) {
                            n = !0
                        }
                        t = E
                    }
                }
                if (!1 === t)return k.logDebug(g.resolve(6)), !1;
                if (!t)return k.logDebug(g.resolve(7)), !0;
                k.logDebug(g.resolve(8));
                this.Hr(t, b, h);
                return !0
            }, Hr: function (a, c, b) {
                try {
                    k.logDebug(g.resolve(9));
                    if (a.closed)return k.logDebug(g.resolve(10)), !1;
                    var h = a;
                    if (b) {
                        if (a == a.top && !a.Lightstreamer) {
                            k.logDebug(g.resolve(11));
                            try {
                                b = trashName, a.name != c && a.name != b || a.close()
                            } catch (l) {
                                k.logDebug(g.resolve(12), l)
                            }
                            return !1
                        }
                        h = a.parent;
                        if (null == h)return k.logDebug(g.resolve(13)), !1
                    }
                    if (!h.Lightstreamer)return k.logDebug(g.resolve(14)),
                        !1;
                    if (!h.Lightstreamer.Ot)return k.logDebug(g.resolve(15)), !1;
                    k.logDebug(g.resolve(16));
                    this.Ha = h;
                    this.Nz = c;
                    m[c] = a
                } catch (d) {
                    return k.logDebug(g.resolve(17), d), !1
                }
                return !0
            }
        };
        h.prototype.toString = function () {
            return ["[|TestResult", this.log, this.wy, this.Oh, this.aq, "]"].join("|")
        };
        b.$t = h;
        return b
    });
    define("Executor", ["Helpers", "EnvironmentStatus", "Environment"], function (g, f, e) {
        function b() {
        }

        function d(a, b) {
            return a.time === b.time ? a.Cn - b.Cn : a.time - b.time
        }

        function h() {
            y = !1;
            c()
        }

        function a() {
            if (t)clearInterval(t); else if (e.isBrowserDocument() && "undefined" != typeof postMessage) {
                C = function () {
                    window.postMessage("Lightstreamer.run", E)
                };
                var a = function (a) {
                    ("Lightstreamer.run" == a.data && "*" == E || a.origin == E) && h()
                };
                g.addEvent(window, "message", a);
                y || (y = !0, C());
                !1 == y && (g.removeEvent(window, "message", a), C = b)
            } else e.isNodeJS() &&
            ("undefined" != typeof process && process.nextTick) && (C = function () {
                process.nextTick(h)
            });
            t = setInterval(c, l)
        }

        function c() {
            if (f.Wh)clearInterval(t); else {
                m = g.getTimeStamp();
                if (0 < k.length) {
                    n && (k.sort(d), n = !1);
                    for (var a; 0 < k.length && k[0].time <= m && !f.Wh;)a = k.shift(), a.of && (x.executeTask(a), a.step && r.push(a))
                }
                for (0 >= k.length && (s = 0); 0 < r.length;)a = r.shift(), a.Cn = s++, x.addPackedTimedTask(a, a.step, !0);
                m >= q && (q = m + p, k = [].concat(k))
            }
        }

        var l = 50, n = !1, k = [], m = g.getTimeStamp(), p = 108E5, q = m + p, r = [], t = null, s = 0, E = !e.isBrowserDocument() ||
        "http:" != document.location.protocol && "https:" != document.location.protocol ? "*" : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : ""), C = b, y = !1, x = {
            toString: function () {
                return ["[|Executor", l, k.length, "]"].join("|")
            }, getQueueLength: function () {
                return k.length
            }, packTask: function (a, b, c) {
                return {of: a, Rl: b || null, Ae: c || null, Cn: s++}
            }, addPackedTimedTask: function (a, b, c) {
                a.step = c ? b : null;
                a.time = m + parseInt(b);
                if (isNaN(a.time))throw"Executor error time: " + a.time;
                k.push(a);
                n = !0
            }, addRepetitiveTask: function (a, b, c, d) {
                return this.addTimedTask(a, b, c, d, !0)
            }, stopRepetitiveTask: function (a) {
                a && (a.of = null, a.step = null)
            }, addTimedTask: function (a, b, c, d, e) {
                a = this.packTask(a, c, d);
                this.addPackedTimedTask(a, b, e);
                0 != b || y || (y = !0, C());
                return a
            }, modifyTaskParam: function (a, b, c) {
                a.Ae[b] = c
            }, modifyAllTaskParams: function (a, b) {
                a.Ae = b
            }, delayTask: function (a, b) {
                a.time += b;
                n = !0
            }, executeTask: function (a, b) {
                try {
                    var c = b || a.Ae;
                    a.Rl ? c ? a.of.apply(a.Rl, c) : a.of.apply(a.Rl) : c ? a.of.apply(null, c) : a.of()
                } catch (d) {
                }
            }
        };
        e.isWebWorker() ? setTimeout(a, 1) : a();
        x.getQueueLength = x.getQueueLength;
        x.packTask = x.packTask;
        x.addPackedTimedTask = x.addPackedTimedTask;
        x.addRepetitiveTask = x.addRepetitiveTask;
        x.stopRepetitiveTask = x.stopRepetitiveTask;
        x.addTimedTask = x.addTimedTask;
        x.modifyTaskParam = x.modifyTaskParam;
        x.modifyAllTaskParams = x.modifyAllTaskParams;
        x.delayTask = x.delayTask;
        x.executeTask = x.executeTask;
        return x
    });
    define("Inheritance", ["IllegalStateException"], function (g) {
        function f(b, d, e) {
            if (d)return e ? d.apply(b, e) : d.apply(b)
        }

        var e = {
            Tt: function (b, d, f, a) {
                for (var c in d.prototype)if (!b.prototype[c])b.prototype[c] = d.prototype[c]; else if (a) {
                    var l;
                    a:{
                        l = d.prototype;
                        var n = void 0;
                        for (n in l)if (l[c] == l[n] && c != n) {
                            l = n;
                            break a
                        }
                        l = null
                    }
                    if (l) {
                        if (b.prototype[l] && b.prototype[l] !== b.prototype[c] && d.prototype[l] !== d.prototype[l])throw new g("Can't solve alias collision, try to minify the classes again (" + l + ", " + c + ")");
                        b.prototype[l] =
                            b.prototype[c]
                    }
                }
                f || (b.prototype._super_ = d, b.prototype._callSuperConstructor = e._callSuperConstructor, b.prototype._callSuperMethod = e._callSuperMethod)
            }, _callSuperMethod: function (b, d, e) {
                return f(this, b.prototype._super_.prototype[d], e)
            }, _callSuperConstructor: function (b, d) {
                f(this, b.prototype._super_, d)
            }
        };
        return e.Tt
    });
    define("CookieManager", ["Helpers", "Environment"], function (g, f) {
        var e = !1, b = {
            areCookiesEnabled: function () {
                return e
            }, getAllCookiesAsSingleString: function () {
                return this.areCookiesEnabled() ? document.cookie.toString() : null
            }, writeCookie: function (b, e) {
                this.Nt(b, e, "")
            }, Nt: function (b, e, a) {
                this.areCookiesEnabled() && (document.cookie = encodeURIComponent(b) + "\x3d" + e + "; " + a + "path\x3d/;")
            }, readCookie: function (b) {
                if (!this.areCookiesEnabled())return null;
                b = encodeURIComponent(b) + "\x3d";
                for (var e = this.getAllCookiesAsSingleString(),
                         e = e.split(";"), a = 0; a < e.length; a++)if (e[a] = g.trim(e[a]), 0 == e[a].indexOf(b))return e[a].substring(b.length, e[a].length);
                return null
            }, removeCookie: function (b) {
                if (this.areCookiesEnabled()) {
                    var e = new Date;
                    e.setTime(e.getTime() - 864E5);
                    this.Nt(b, "deleting", "expires\x3d" + e.toGMTString() + "; ")
                }
            }, Uu: function () {
                if (f.isBrowserDocument() && ("http:" == document.location.protocol || "https:" == document.location.protocol)) {
                    e = !0;
                    var b = "LS__cookie_test" + g.randomG();
                    this.writeCookie(b, "testing");
                    var h = this.readCookie(b);
                    if ("testing" == h && (this.removeCookie(b), h = this.readCookie(b), null == h))return;
                    e = !1
                }
            }
        };
        b.Uu();
        b.areCookiesEnabled = b.areCookiesEnabled;
        b.getAllCookiesAsSingleString = b.getAllCookiesAsSingleString;
        b.writeCookie = b.writeCookie;
        b.removeCookie = b.removeCookie;
        b.readCookie = b.readCookie;
        return b
    });
    define("lsG", ["Environment"], function (g) {
        var f = RegExp("\\.", "g"), e = RegExp("-", "g"), b = {".": !0, " ": !0, 0: !0}, d = {
            tr: function () {
                return g.isBrowser() ? !1 === navigator.onLine : !1
            }, Fp: function () {
                try {
                    return "undefined" != typeof localStorage && null !== localStorage && localStorage.getItem && localStorage.setItem
                } catch (b) {
                    return !1
                }
            }, mc: function () {
                try {
                    return document.domain
                } catch (b) {
                    return ""
                }
            }, Gm: function () {
                if (!g.isBrowserDocument())return !0;
                try {
                    return -1 < document.location.host.indexOf("[") ? !0 : d.mc() == document.location.hostname
                } catch (b) {
                    return !1
                }
            },
            cf: function (h) {
                if ("undefined" != typeof h) {
                    if (!0 === h || !1 === h)return !0 === h;
                    if (null != h)return isNaN(h) || "" == h ? (h || "" == h) && h.toString ? h.toString() : isNaN(h) ? NaN : h : h.charAt && h.charAt(0)in b && h.toString ? h.toString() : parseFloat(h, 10)
                }
                return null
            }, Aj: function (b) {
                return require.Aj ? require.Aj(b) : require(b)
            }, ba: function (b, a) {
                b = b || {};
                if (a)for (var c in a)b[c] = a[c];
                return b
            }, fk: function (b) {
                return b.replace(f, "_").replace(e, "__")
            }, getReverse: function (b) {
                var a = {}, c;
                for (c in b)a[b[c]] = c;
                return a
            }
        };
        return d
    });
    define("lsAZ", ["lsA"], function (g) {
        function f(e, b, d) {
            this.id = e;
            this.T = b;
            this.status = d
        }

        f.prototype = {wb: M("status")};
        return {
            Wf: function (e, b) {
                return this.Ln(b + "_" + e)
            }, gC: function (e, b, d) {
                d = d.join("|");
                this.write(g.Vd + b + "_" + e, d)
            }, Dl: function (e, b) {
                this.clean(g.Vd + b + "_" + e)
            }, Xj: function (e) {
                return this.Ln(e)
            }, $z: function (e) {
                e = this.Ln(e);
                if (!e)return null;
                for (var b = [], d = 0; d < e.length; d++) {
                    var h = e[d].split("_");
                    if (2 == h.length) {
                        var a = this.Wf(h[1], h[0]);
                        null != a && b.push(new f(h[0], h[1], a))
                    }
                }
                return b
            },
            il: function (e, b, d) {
                e = g.Vd + e;
                b += d ? "_" + d : "";
                d = this.Wj(e);
                if (!d)d = "|"; else if (-1 < d.indexOf("|" + b + "|"))return !1;
                this.write(e, d + (b + "|"));
                return !0
            }, Ah: function (e, b, d) {
                e = g.Vd + e;
                b += d ? "_" + d : "";
                if (d = this.Wj(e))b = "|" + b + "|", -1 < d.indexOf(b) && (d = d.replace(b, "|"), "|" == d ? this.clean(e) : this.write(e, d))
            }, gw: function () {
                for (var e = this.keys(), b = [], d = 0; d < e.length; d++)0 == e[d].indexOf(g.Vd) && (e[d] = e[d].substring(g.Vd.length), b.push(e[d]));
                return b
            }, Ln: function (e) {
                e = g.Vd + e;
                e = this.Wj(e);
                if (!e)return null;
                e = e.split("|");
                "" ==
                e[0] && e.shift();
                "" == e[e.length - 1] && e.pop();
                return 0 < e.length ? e : null
            }
        }
    });
    define("lsAa", ["lsG", "lsAZ"], function (g, f) {
        return g.ba({
            Wj: function (e) {
                return localStorage.getItem(e)
            }, write: function (e, b) {
                localStorage.setItem(e, b)
            }, clean: function (e) {
                localStorage.removeItem(e)
            }, keys: function () {
                for (var e = [], b = 0; b < localStorage.length; b++)e.push(localStorage.key(b));
                return e
            }
        }, f)
    });
    define("lsAX", ["CookieManager", "lsAZ", "lsG", "Helpers"], function (g, f, e, b) {
        return e.ba({
            Wj: function (b) {
                return g.readCookie(b)
            }, write: function (b, h) {
                g.writeCookie(b, h)
            }, clean: function (b) {
                g.removeCookie(b)
            }, keys: function () {
                for (var d = [], d = g.getAllCookiesAsSingleString().split(";"), h = 0; h < d.length; h++)d[h] = b.trim(d[h]), d[h] = d[h].substring(0, d[h].indexOf("\x3d")), d[h] = decodeURIComponent(d[h]);
                return d
            }
        }, f)
    });
    define("Dismissable", ["Executor"], function (g) {
        function f() {
            this.initTouches()
        }

        f.prototype = {
            clean: D(), initTouches: function (e) {
                this.Bo = this.tf = 0;
                this.timeout = e || 5E3
            }, bC: function (e) {
                e == this.Bo && 0 >= this.tf && this.clean()
            }, dismiss: function () {
                this.tf--;
                0 >= this.tf && g.addTimedTask(this.bC, this.timeout, this, [this.Bo])
            }, touch: function () {
                this.Bo++;
                0 > this.tf && (this.tf = 0);
                this.tf++
            }
        };
        f.prototype.touch = f.prototype.touch;
        f.prototype.dismiss = f.prototype.dismiss;
        f.prototype.clean = f.prototype.clean;
        f.prototype.initTouches =
            f.prototype.initTouches;
        return f
    });
    define("lsAW", "lsAa lsAX Executor Dismissable Inheritance lsA Helpers lsG".split(" "), function (g, f, e, b, d, h, a, c) {
        function l(a) {
            this._callSuperConstructor(l);
            this.ea = a;
            this.Fk = null
        }

        var n = [], k = h.Td + h.hp, m = 6E4;
        l.prototype = {
            start: function () {
                this.Fk && e.stopRepetitiveTask(this.Fk);
                this.Fk = e.addRepetitiveTask(this.Sp, m, this);
                e.addTimedTask(this.Sp, 0, this)
            }, clean: function () {
                e.stopRepetitiveTask(this.Fk);
                for (var a = 0; a < n.length; a++)if (n[a] == this) {
                    n.splice(a, 1);
                    break
                }
            }, Sp: function () {
                for (var c = a.getTimeStamp(), b = this.ea.gw(), l = 0; l < b.length; l++)0 < b[l].indexOf("_") && this.od(b[l], null, c);
                for (l = 0; l < b.length; l++)-1 >= b[l].indexOf("_") && this.Vu(b[l])
            }, od: function (a, c, b) {
                if (!c) {
                    c = a.split("_");
                    if (2 != c.length)return !1;
                    a = c[0];
                    c = c[1]
                }
                var l = this.ea.Wf(c, a);
                return l ? b ? b - l[h.yc] > k ? (this.ea.Dl(c, a), !1) : !0 : !0 : !1
            }, Vu: function (a) {
                for (var c = this.ea.Xj(a), b = 0; b < c.length; b++)0 < c[b].indexOf("_") ? this.od(c[b]) || this.ea.Ah(a, c[b]) : this.od(c[b], a) || this.ea.Ah(a, c[b])
            }
        };
        d(l, b, !1, !0);
        g = new l(g);
        var p = new l(f), q = c.Fp() ? g : p;
        return {
            start: function (a) {
                a = a ? p : q;
                for (var c = 0; c < n.length; c++)if (n[c] == a) {
                    a.touch();
                    return
                }
                n.push(a);
                a.touch();
                a.start()
            }, stop: function (a) {
                a = a ? p : q;
                for (var c = 0; c < n.length; c++)n[c] == a && a.dismiss()
            }, tC: function (a) {
                m = a;
                for (a = 0; a < n.length; a++)n[a].start()
            }
        }
    });
    define("IFrameHandler", ["BrowserDetection", "EnvironmentStatus", "Environment"], function (g, f, e) {
        var b = g.isProbablyAWebkit() && g.isProbablyChrome(32, !0) ? null : "about:blank", d = {}, h = {
            createFrame: function (a, c) {
                if (!e.isBrowserDocument())return null;
                var f = document.getElementsByTagName("BODY")[0];
                if (!f)return null;
                c = c || b;
                var h = document.createElement("iframe");
                h.style.visibility = "hidden";
                h.style.height = "0px";
                h.style.width = "0px";
                h.style.display = "none";
                h.name = a;
                h.id = a;
                g.isProbablyIE() || g.isProbablyOldOpera() ? (h.src =
                    c, f.appendChild(h)) : (f.appendChild(h), h.src = c);
                try {
                    if (h.contentWindow) {
                        try {
                            h.contentWindow.name = a
                        } catch (k) {
                        }
                        d[a] = h.contentWindow;
                        return d[a]
                    }
                    return document.frames && document.frames[a] ? (d[a] = document.frames[a], d[a]) : null
                } catch (m) {
                    return null
                }
            }, getFrameWindow: function (a, b, e) {
                b && !d[a] && this.createFrame(a, e);
                return d[a] || null
            }, disposeFrame: function (a) {
                if (d[a]) {
                    try {
                        document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(a))
                    } catch (b) {
                    }
                    delete d[a]
                }
            }, removeFrames: function () {
                for (var a in d)try {
                    document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(a))
                } catch (b) {
                }
                d =
                {}
            }
        };
        h.createFrame = h.createFrame;
        h.getFrameWindow = h.getFrameWindow;
        h.disposeFrame = h.disposeFrame;
        h.removeFrames = h.removeFrames;
        f.addUnloadHandler(h.removeFrames);
        return h
    });
    define("lsAY", "Executor lsA lsAW lsAa lsAX Helpers EnvironmentStatus IFrameHandler LoggerManager lsG Environment".split(" "), function (g, f, e, b, d, h, a, c, l, n, k) {
        function m(a, c, b) {
            k.browserDocumentOrDie();
            this.T = a;
            this.jj = this.id = null;
            this.uk = 500;
            this.to = c;
            this.ff = null;
            this.host = location.host;
            this.rd = null;
            this.xh = !1;
            this.Fq = 0;
            b ? (this.ea = d, e.start(!0)) : (this.ea = q, e.start());
            this.Xv = b;
            this.Ao = this.yk = null;
            this.da();
            this.Is();
            this.Mq();
            this.ph = {};
            p.logInfo(l.resolve(19),
                this)
        }

        var p = l.getLoggerProxy(f.Qa), q = n.Fp() ? b : d, r = h.randomG(), t = f.yc;
        m.Am = function () {
            return q
        };
        m.prototype = {
            toString: function () {
                return ["[SharedStatus", this.id, this.T, "]"].join("|")
            }, da: function () {
                this.id = r++;
                this.ea.il(this.T, this.id) ? this.ea.Wf(this.T, this.id) ? this.da() : (this.rd = this.cw(), a.addBeforeUnloadHandler(this), a.addUnloadHandler(this)) : this.da()
            }, start: function () {
                this.Ao = g.addRepetitiveTask(this.cA, f.Td, this);
                p.logInfo(l.resolve(20), this)
            }, Mq: function () {
                c.getFrameWindow(this.rd, !0) ? (this.uk =
                    500, this.yk = g.addTimedTask(this.start, 0, this)) : (this.yk = g.addTimedTask(this.Mq, this.uk, this), this.uk *= 2)
            }, ca: M("id"), nu: function (a) {
                a != this.ff && (this.ff = a, this.ea.il(a, this.id, this.T))
            }, Ms: function (a) {
                this.ff != a ? p.logError(l.resolve(18), this.ff, a) : this.ff = null;
                this.ea.Ah(a, this.id, this.T)
            }, Tw: function (a) {
                a = this.ea.$z(a);
                if (!a)return 0;
                for (var c = 0, b = 0; b < a.length; b++)h.getTimeStamp() - a[b].wb()[t] > f.Td || c++;
                return c
            }, Is: function () {
                this.jj = h.getTimeStamp() + this.Fq;
                this.ea.gC(this.T, this.id, [this.jj, this.rd,
                    this.host, f.Vk, f.rg])
            }, cA: function () {
                if (this.xh)p.logDebug(l.resolve(23)), this.xh = !1; else {
                    var a = !1;
                    if (this.to) {
                        p.logDebug(l.resolve(24), this);
                        var c = this.ea.Xj(this.T);
                        if (c) {
                            p.logDebug(l.resolve(26), this.T);
                            for (var b = 0; b < c.length; b++)if (c[b] != this.id) {
                                var d = this.ea.Wf(this.T, c[b]);
                                d ? d[f.Wo] != f.Vk || d[f.gp] != f.rg ? p.logDebug(l.resolve(28), c[b]) : (d[t] == this.jj && (this.Fq = h.randomG(5)), d[t] > this.jj ? a |= this.Hy(c[b], d[t]) : this.ph[c[b]] && delete this.ph[c[b]]) : p.logDebug(l.resolve(27), c[b])
                            }
                        } else p.logDebug(l.resolve(25),
                            this)
                    }
                    a || (p.logDebug(l.resolve(29)), this.ea.il(this.T, this.id), this.Is())
                }
            }, Hy: function (a, c) {
                p.logDebug(l.resolve(30), a, c);
                if (this.ph[a])if (this.ph[a] != c)p.logInfo(l.resolve(21)), this.Li(); else return !1;
                this.ph[a] = c;
                return !0
            }, cw: function () {
                return n.fk("LSF__" + n.mc() + "_" + this.id + "_" + this.T)
            }, Li: function () {
                this.clean();
                this.to && g.executeTask(this.to)
            }, Fr: function () {
                this.ea.Dl(this.T, this.id);
                this.ea.Ah(this.T, this.id);
                this.xh = !0
            }, clean: function () {
                p.logInfo(l.resolve(22), this);
                g.stopRepetitiveTask(this.Ao);
                g.stopRepetitiveTask(this.yk);
                c.disposeFrame(this.rd);
                this.rd = this.yk = this.Ao = null;
                this.Ms(this.ff);
                this.Fr()
            }, unloadEvent: function () {
                this.clean()
            }, preUnloadEvent: function () {
                this.Fr()
            }, ia: function () {
                this.clean();
                a.removeBeforeUnloadHandler(this);
                a.removeUnloadHandler(this);
                e.stop(this.Xv)
            }
        };
        m.prototype.unloadEvent = m.prototype.unloadEvent;
        m.prototype.preUnloadEvent = m.prototype.preUnloadEvent;
        return m
    });
    define("lsAR", "lsF Executor LoggerManager BrowserDetection Inheritance CookieManager lsAY Helpers lsA lsG".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k(a, c, b, l, d) {
            this._callSuperConstructor(k, [a]);
            this.appName = c;
            this.ml = this.oh = this.ce = null;
            this.ho = !0;
            this.Sf = {};
            this.Vc = {};
            this.ln = 0;
            this.Hc = d || 5E3;
            this.be = null;
            this.Fo = !1;
            this.Mk = this.Ik = 0;
            this.Eo = !1;
            this.fC = b;
            this.jg = l;
            h.areCookiesEnabled() && f.addRepetitiveTask(this.$u, 6E4, this)
        }

        function m(a) {
            for (var c in a)return c
        }

        var p = m({Vb: !0}), q = m({Zm: !0}), r = m({Rh: !0}), t = e.getLoggerProxy(l.Qa), s = g.$t;
        k.prototype = {
            Vb: function () {
                this._callSuperMethod(k, p);
                this.oh = this.ce = null
            }, qf: function () {
                return null != this.Ha ? (this.At(), null !== this.Ha ? this.Ha : null) : null
            }, Hv: function (a) {
                this.ho = !a
            }, qA: function (a, c) {
                var l = null;
                if ((this.Eo || null == a) && this.fC)t.logDebug(e.resolve(31)), l = this.Sv(), this.Eo = !1; else if (null != a)t.logDebug(e.resolve(32)), this.nt(a), this.Eo = !0; else return 10 == this.ln && t.logDebug(e.resolve(33)), 10 >= this.ln && this.ln++,
                    null;
                t.logDebug(e.resolve(34));
                var d = this.At();
                t.logDebug(e.resolve(35), d);
                if (null != this.Ha) {
                    t.logDebug(e.resolve(36));
                    this.Mk = 0;
                    try {
                        return this.Sf["LS6__" + n.mc() + "_" + this.ce + "_" + this.appName] = "OK", this.Ha
                    } catch (h) {
                        t.logDebug(e.resolve(37))
                    }
                }
                if (b.isProbablyOldOpera() && c && l && "null" == l.log)return t.logDebug(e.resolve(38)), f.executeTask(c), null;
                this.Mk++;
                10 <= this.Mk && (this.Mk = 0, c && this.gy() ? (t.logDebug(e.resolve(39)), f.executeTask(c)) : (t.logDebug(e.resolve(40)), this.Fo = !0));
                return null
            }, Zm: function (a,
                             c, b) {
                return !1 === this._callSuperMethod(k, q, [a, !0, c]) ? !1 : this.Bt(b)
            }, gy: function () {
                if (this.vv)return t.logDebug(e.resolve(41)), !0;
                if (b.isProbablyOldOpera())return t.logDebug(e.resolve(42)), !0;
                if (b.isProbablyChrome())return t.logDebug(e.resolve(43)), !0;
                if (b.isProbablyApple(7, !1))return t.logDebug(e.resolve(44)), !0
            }, xw: function () {
                if (!h.areCookiesEnabled())return null;
                this.ml = null;
                var b = l.Td + (this.ho ? l.hp : 0), d = a.Am(), k = d.Xj(this.appName);
                if (!k)return t.logDebug(e.resolve(45)), null;
                for (var q = 0; q < k.length; q++) {
                    var r =
                        k[q] + "_" + this.appName, s = d.Wf(this.appName, k[q]);
                    if (s)if (this.Sf[s[l.dp]])t.logDebug(e.resolve(47), r); else if (s[l.Wo] != l.Vk || s[l.gp] != l.rg)t.logDebug(e.resolve(48), s); else {
                        var n = c.getTimeStamp(), g = n - parseInt(s[l.yc]), p = 1E3 - g;
                        if (g > b)this.Vc[r] ? g > 2 * l.Td ? (this.Vc[r] = null, t.logDebug(e.resolve(49), r)) : (this.Vc[r] = s[l.yc], this.jg && f.executeTask(this.jg, [p]), t.logDebug(e.resolve(50), r)) : t.logDebug(e.resolve(51), r); else {
                            if (this.ho)if (!this.Vc[r]) {
                                t.logDebug(e.resolve(52), r);
                                this.Vc[r] = s[l.yc];
                                this.jg && f.executeTask(this.jg,
                                    [p]);
                                continue
                            } else if (this.Vc[r] == s[l.yc]) {
                                t.logDebug(e.resolve(53), r);
                                this.jg && f.executeTask(this.jg, [p]);
                                continue
                            }
                            this.ml = n + l.Td - g;
                            t.logDebug(e.resolve(54), r);
                            return {L: s, id: k[q]}
                        }
                    } else t.logDebug(e.resolve(46), r)
                }
                return null
            }, Sv: function () {
                var a = this.xw();
                if (!a)return !1;
                var c = a.L, b = c[l.dp], a = this.Zm(b, this.ml, a.id);
                this.Sf[b] = !1 === a || !a.Oh && !1 == a.aq ? !1 : a.log ? a.log : "unknown";
                c[l.ep] && c[l.ep] != location.host && (this.vv = !0);
                return a
            }, Rh: function () {
                var a = this._callSuperMethod(k, r);
                a.Oh || (this.ce = null);
                return a
            }, At: function () {
                return this.ce ? this.Bt(this.ce) : this.OB()
            }, Bt: function (a) {
                var c = this.Rh();
                if (!c.Oh)return c;
                t.logDebug(e.resolve(55));
                c = 0;
                try {
                    var b = this.Ha.Lightstreamer["_" + a];
                    if (!b)return c = 6, t.logDebug(e.resolve(56), a), this.Vb(), new s(a + " not IN global", c, !1, !1);
                    if (!b.lsEngine)return c = 7, t.logDebug(e.resolve(57), a), this.Vb(), new s(a + " not IN ITS global", c, !1, !1);
                    this.ce = a;
                    this.oh = b.lsEngine;
                    c = 8;
                    return new s("OK", c, !0, !1)
                } catch (l) {
                    return t.logDebug(e.resolve(58), c, l), this.Vb(), new s("exception " +
                    c + " " + l, 9, !1, !0)
                }
            }, OB: function () {
                var a = this.Rh();
                if (!a.Oh)return a;
                t.logDebug(e.resolve(59));
                try {
                    var c = this.Ha.Lightstreamer, b;
                    for (b in c)try {
                        if (0 == b.indexOf("_") && c[b].lsEngine && c[b].lsEngine.kf == this.appName)return this.oh = c[b].lsEngine, this.ce = this.oh.Xg(), new s("OK", 10, !0, !1)
                    } catch (l) {
                    }
                } catch (d) {
                    return t.logDebug(e.resolve(60), d), this.Vb(), new s("exception " + d, 11, !1, !0)
                }
            }, ht: function (a) {
                this.Hc = a;
                this.ui && (a = this.be, this.rt(), this.qt(a))
            }, qt: function (a) {
                this.ui || (t.logDebug(e.resolve(61)), this.be =
                    a, this.ui = f.addRepetitiveTask(this.od, this.Hc, this))
            }, rt: function () {
                t.logDebug(e.resolve(62));
                f.stopRepetitiveTask(this.ui);
                delete this.be;
                delete this.ui
            }, od: function () {
                null === this.qf() && this.be && f.executeTask(this.be, [!1]);
                this.be && f.executeTask(this.be, [!0])
            }, $u: function () {
                var a = document.cookie.toString();
                this.Zu(a);
                this.dv(a)
            }, Zu: function (a) {
                var c = this.Sf;
                this.Sf = {};
                for (var b in c)c[b] && -1 < a.indexOf(b) && (this.Sf[b] = c[b])
            }, dv: function (a) {
                var c = this.Vc;
                this.Vc = {};
                for (var b in c)c[b] && -1 < a.indexOf(b) &&
                (this.Vc[b] = c[b])
            }, XB: function (a) {
                this.Fo = !1;
                f.addTimedTask(this.WB, 2E4, this, [new Number(++this.Ik), a])
            }, WB: function (a, c) {
                this.Fo && a == this.Ik && (f.executeTask(c), this.Ik++)
            }, Ku: function () {
                this.Ik++
            }
        };
        d(k, g);
        return k
    });
    define("Setter", ["IllegalArgumentException"], function (g) {
        function f() {
        }

        f.prototype.checkPositiveNumber = function (e, b, d) {
            var f = new Number(e);
            if (isNaN(f))throw new g("The given value is not valid. Use a number");
            if (!d && f != Math.round(f))throw new g("The given value is not valid. Use an integer");
            if (b) {
                if (0 > e)throw new g("The given value is not valid. Use a positive number or 0");
            } else if (0 >= e)throw new g("The given value is not valid. Use a positive number");
            return f
        };
        f.prototype.checkBool = function (e,
                                          b) {
            if (!0 === e || !1 === e || b && !e)return !0 === e;
            throw new g("The given value is not valid. Use true or false");
        };
        return f
    });
    define("lsH", ["LoggerManager", "lsG", "Inheritance", "Setter", "lsA"], function (g, f, e, b, d) {
        function h(a) {
            this.P = "lsH";
            this.parent = null;
            this.Cp = !1;
            a && this.zi(a)
        }

        var a = g.getLoggerProxy(d.Uk), c = g.getLoggerProxy(d.Qa);
        h.prototype = {
            Zi: function (a) {
                return this.Ok[a]
            }, Z: function (c, b) {
                var d = this.Zi(c), h = this[d];
                this[d] = f.cf(b);
                a.logDebug(g.resolve(64), this.parent, c, this.bj(d));
                this.parent && this.Cp && this.Ze(c);
                h != this[d] && this.Tr(c)
            }, bj: function (a) {
                return this.lq && this.lq[a] ? "[...]" : this[a]
            }, v: function (c,
                            b) {
                var d = this.Zi(c);
                b != this[d] && (this[d] = b, a.logInfo(g.resolve(63), c, this.bj(d)), this.Ze(c), this.Tr(c))
            }, cg: function (a, c) {
                this.parent = a;
                this.Cp = c
            }, Ze: function (a) {
                var b = this.Zi(a);
                c.logDebug(g.resolve(65), a, this.bj(b));
                return this.parent && this.parent.Ze && !this.parent.Ze(this.P, a, f.cf(this[b])) ? !1 : !0
            }, Tr: function (c) {
                var b = this.Zi(c);
                !this.parent || !this.parent.Vr || this.Rr && this.Rr[b] || (a.logDebug(g.resolve(66), c, this.bj(b)), this.parent.Vr(c, this))
            }, zi: function (a) {
                var c = this.Ok, b;
                for (b in c)this.Z(b,
                    a[c[b]])
            }
        };
        e(h, b, !1, !0);
        return h
    });
    define("lsJ", ["lsH", "Inheritance", "lsG"], function (g, f, e) {
        function b(a) {
            this.Om = null;
            this.Lg = !1;
            this.Rr = d;
            this.Ok = h;
            this._callSuperConstructor(b, arguments);
            this.P = "lsJ"
        }

        var d = {Om: !0, Lg: !0}, h = {Lg: "connectionRequested", Om: "isLocalEngine"}, h = e.getReverse(h);
        f(b, g);
        return b
    });
    define("lsL", "IllegalArgumentException lsA lsH Inheritance Global Environment lsG".split(" "), function (g, f, e, b, d, h, a) {
        function c() {
            this.Ql = 5E5;
            this.ej = 19E3;
            this.Dd = this.Qc = this.zf = 0;
            this.Fd = 3E3;
            this.xk = 2E3;
            this.bf = 4E3;
            this.Pn = 5E3;
            this.io = !0;
            this.qm = null;
            this.Zp = this.Xn = !1;
            this.ck = 0;
            this.cm = !0;
            this.jo = 5E3;
            this.fh = this.wk = null;
            this.Ai = this.Ro = !0;
            this.Si = 2E3;
            this.vo = 4E3;
            this.Ok = n;
            this._callSuperConstructor(c, arguments);
            this.P = "lsL"
        }

        var l = {};
        l[f.qg] = !0;
        l[f.xg] = !0;
        l[f.Sd] = !0;
        l[f.Zh] = !0;
        l[f.cl] = !0;
        l[f.Yh] = !0;
        var n = {
            Ql: "contentLength",
            ej: "idleMillis",
            zf: "keepaliveMillis",
            Qc: "maxBandwidth",
            Dd: "pollingMillis",
            Fd: "reconnectTimeout",
            xk: "stalledTimeout",
            bf: "connectTimeout",
            Pn: "retryTimeout",
            io: "slowingEnabled",
            qm: "forcedTransport",
            Xn: "serverInstanceAddressIgnored",
            Zp: "cookieHandlingRequired",
            ck: "reverseHeartbeatMillis",
            cm: "earlyWSOpenEnabled",
            jo: "spinFixTimeout",
            wk: "spinFixEnabled",
            Ro: "xDomainStreamingEnabled",
            Ai: "corsXHREnabled",
            Si: "forceBindTimeout",
            vo: "switchCheckTimeout",
            fh: "httpExtraHeaders"
        }, n = a.getReverse(n);
        c.prototype = {
            HA: function (a) {
                this.v("contentLength", this.checkPositiveNumber(a))
            }, sw: M("Ql"), OA: function (a) {
                this.v("idleMillis", this.checkPositiveNumber(a, !0))
            }, Gw: M("ej"), QA: function (a) {
                this.v("keepaliveMillis", this.checkPositiveNumber(a, !0))
            }, Jw: M("zf"), SA: function (a) {
                a = "unlimited" == (new String(a)).toLowerCase() ? 0 : this.checkPositiveNumber(a, !1, !0);
                this.v("maxBandwidth", a)
            }, Lw: function () {
                return 0 >= this.Qc ? "unlimited" : this.Qc
            }, XA: function (a) {
                this.v("pollingMillis",
                    this.checkPositiveNumber(a, !0))
            }, Uw: M("Dd"), Yw: M("Fd"), jB: function (a) {
                this.v("stalledTimeout", this.checkPositiveNumber(a))
            }, er: M("xk"), FA: function (a) {
                this.v("connectTimeout", this.checkPositiveNumber(a))
            }, pw: M("bf"), $A: function (a) {
                this.v("retryTimeout", this.checkPositiveNumber(a))
            }, bx: M("Pn"), fB: function (a) {
                this.v("slowingEnabled", this.checkBool(a))
            }, ey: M("io"), MA: function (a) {
                if (null !== a && !l[a])throw new g("The given value is not valid. Use one of: HTTP-STREAMING, HTTP-POLLING, WS-STREAMING, WS-POLLING, WS, HTTP or null");
                this.v("forcedTransport", a)
            }, Ew: M("qm"), dB: function (a) {
                this.v("serverInstanceAddressIgnored", this.checkBool(a))
            }, dy: M("Xn"), IA: function (a) {
                if (a && !h.isBrowser())throw new g("cookieHandlingRequired is only supported on Browsers");
                this.v("cookieHandlingRequired", this.checkBool(a))
            }, Qb: M("Zp"), KA: function (a) {
                this.v("earlyWSOpenEnabled", this.checkBool(a))
            }, Rx: M("cm"), aB: function (a) {
                this.v("reverseHeartbeatMillis", this.checkPositiveNumber(a, !0))
            }, cx: M("ck"), NA: function (a) {
                if (a) {
                    var c = "", b;
                    for (b in a)c +=
                        b + "\n" + a[b] + "\n";
                    this.v("httpExtraHeaders", c)
                } else this.v("httpExtraHeaders", null)
            }, sf: function () {
                if (!this.fh)return this.fh;
                for (var a = {}, c = this.fh.split("\n"), b = 0; b < c.length - 1; b += 2)a[c[b]] = c[b + 1];
                return a
            }, eh: function () {
                return this.fh ? !0 : !1
            }, nB: function (a) {
                this.v("xDomainStreamingEnabled", this.checkBool(a))
            }, my: M("Ro"), JA: function (a) {
                this.v("corsXHREnabled", this.checkBool(a))
            }, Ox: M("Ai"), LA: function (a) {
                this.v("forceBindTimeout", this.checkPositiveNumber(a))
            }, Cw: M("Si"), kB: function (a) {
                this.v("switchCheckTimeout",
                    this.checkPositiveNumber(a))
            }, mx: M("vo"), iB: function (a) {
                this.v("spinFixTimeout", this.checkPositiveNumber(a))
            }, kx: M("jo"), hB: function (a) {
                this.v("spinFixTimeout", null === this.rC ? null : this.checkBool(a))
            }, jx: M("wk")
        };
        c.prototype.setContentLength = c.prototype.HA;
        c.prototype.getContentLength = c.prototype.sw;
        c.prototype.setIdleMillis = c.prototype.OA;
        c.prototype.getIdleMillis = c.prototype.Gw;
        c.prototype.setKeepaliveMillis = c.prototype.QA;
        c.prototype.getKeepaliveMillis = c.prototype.Jw;
        c.prototype.setMaxBandwidth =
            c.prototype.SA;
        c.prototype.getMaxBandwidth = c.prototype.Lw;
        c.prototype.setPollingMillis = c.prototype.XA;
        c.prototype.getPollingMillis = c.prototype.Uw;
        c.prototype.setReconnectTimeout = c.prototype.er;
        c.prototype.getReconnectTimeout = c.prototype.Yw;
        c.prototype.setStalledTimeout = c.prototype.jB;
        c.prototype.getStalledTimeout = c.prototype.er;
        c.prototype.setConnectTimeout = c.prototype.FA;
        c.prototype.getConnectTimeout = c.prototype.pw;
        c.prototype.setRetryTimeout = c.prototype.$A;
        c.prototype.getRetryTimeout = c.prototype.bx;
        c.prototype.setSlowingEnabled = c.prototype.fB;
        c.prototype.isSlowingEnabled = c.prototype.ey;
        c.prototype.setForcedTransport = c.prototype.MA;
        c.prototype.getForcedTransport = c.prototype.Ew;
        c.prototype.setServerInstanceAddressIgnored = c.prototype.dB;
        c.prototype.isServerInstanceAddressIgnored = c.prototype.dy;
        c.prototype.setCookieHandlingRequired = c.prototype.IA;
        c.prototype.isCookieHandlingRequired = c.prototype.Qb;
        c.prototype.setEarlyWSOpenEnabled = c.prototype.KA;
        c.prototype.isEarlyWSOpenEnabled = c.prototype.Rx;
        c.prototype.setReverseHeartbeatMillis =
            c.prototype.aB;
        c.prototype.getReverseHeartbeatMillis = c.prototype.cx;
        c.prototype.setHttpExtraHeaders = c.prototype.NA;
        c.prototype.getHttpExtraHeaders = c.prototype.sf;
        c.prototype.setXDomainStreamingEnabled = c.prototype.nB;
        c.prototype.isXDomainStreamingEnabled = c.prototype.my;
        c.prototype.setCorsXHREnabled = c.prototype.JA;
        c.prototype.isCorsXHREnabled = c.prototype.Ox;
        c.prototype.setForceBindTimeout = c.prototype.LA;
        c.prototype.getForceBindTimeout = c.prototype.Cw;
        c.prototype.setSwitchCheckTimeout = c.prototype.kB;
        c.prototype.getSwitchCheckTimeout = c.prototype.mx;
        c.prototype.setSpinFixTimeout = c.prototype.iB;
        c.prototype.getSpinFixTimeout = c.prototype.kx;
        c.prototype.setSpinFixEnabled = c.prototype.hB;
        c.prototype.getSpinFixEnabled = c.prototype.jx;
        b(c, e);
        return c
    });
    define("lsB", [], function () {
        function g(f, e, b, d) {
            var h = 3, a, c = e;
            e -= b;
            b = "";
            var l;
            l = "document".toString();
            var g = 0, k = l.length;
            for (a = 0; a < k; a++)g += l.charCodeAt(a);
            l = parseInt(g);
            if (0 < l && (g = f.length, 0 < g))for (k = 0; c + h - k <= g; k += 3) {
                a = k;
                if (0 < e)for (a = 3 * l; a >= e; a -= e);
                a = parseInt(f.substring(k, h - 1)) - parseInt(f.substring(a, a + 2)) + d - parseInt(f.substring(c, c + h - k));
                b = unescape("%" + a.toString(16)) + b;
                h += 3;
                c += 3;
                l += a
            }
            return b
        }

        return {
            ux: function () {
                return g("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482758859157156756051950251650550051450653351251952051650852152653954583",
                    116, 2, 621)
            }, xC: function () {
                return g("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770", 6, 7, 350)
            }
        }
    });
    define("ASSERT", ["LoggerManager"], function (g) {
        var f = g.getLoggerProxy("weswit.test"), e = 0, b = {}, d = {
            VOID: b, getFailures: function () {
                return e
            }, compareArrays: function (b, a, c) {
                if (b.length != a.length)return this.Lb(), f.logError(g.resolve(480), b, a), !1;
                if (c)for (d = 0; d < b.length; d++) {
                    if (b[d] != a[d])return f.logError(g.resolve(483), b[d], a[d]), this.Lb(), !1
                } else {
                    c = {};
                    for (var d = 0; d < b.length; d++)c[b[d]] = 1;
                    for (d = 0; d < a.length; d++)if (c[a[d]])c[a[d]]++; else return f.logError(g.resolve(481), a[d]), this.Lb(), !1;
                    for (d in c)if (1 ==
                        c[d])return f.logError(g.resolve(482), c[d]), this.Lb(), !1
                }
                return !0
            }, verifySuccess: function (b, a, c, d, e) {
                return this.Xh(b, a, c, d, !1, e)
            }, verifyException: function (b, a, c) {
                return this.Xh(b, a, c, null, !0)
            }, verifyNotNull: function (b) {
                return null === b ? (this.Lb(), f.logError(g.resolve(484), b), !1) : !0
            }, verifyValue: function (b, a, c) {
                var d = !1;
                !0 === c ? d = b === a : c ? d = c(b, a) : isNaN(b) ? d = b == a : (c = b && b.charAt ? b.charAt(0) : null, d = a && a.charAt ? a.charAt(0) : null, d = "." == c || " " == c || "0" == c || "." == d || " " == d || "0" == d ? String(b) == String(a) : b == a);
                return d ? !0 : (this.Lb(), f.logError(g.resolve(485), b, a), !1)
            }, verifyDiffValue: function (b, a, c) {
                return (c ? b === a : b == a) ? (this.Lb(), f.logError(g.resolve(486), b, a), !1) : !0
            }, verifyOk: function (b) {
                return b ? !0 : (this.Lb(), f.logError(g.resolve(487)), !1)
            }, verifyNotOk: function (b) {
                return b ? (this.Lb(), f.logError(g.resolve(488)), !1) : !0
            }, fail: function () {
                f.logError(g.resolve(489));
                this.Lb();
                return !1
            }, Lb: function () {
                e++
            }, Xh: function (d, a, c, e, n, k) {
                var m = !1, p = null, q = null;
                try {
                    p = c !== b ? d[a].apply(d, c) : d[a]()
                } catch (r) {
                    m = !0, q = r
                }
                d =
                    n ? "succes" : "failure";
                return n != m ? (this.Lb(), f.logError(g.resolve(490), d, "for", a, c, e, q), !1) : n || e === b ? !0 : this.verifyValue(p, e, k)
            }
        };
        d.getFailures = d.getFailures;
        d.fail = d.fail;
        d.verifyNotOk = d.verifyNotOk;
        d.verifyOk = d.verifyOk;
        d.verifyDiffValue = d.verifyDiffValue;
        d.verifyNotNull = d.verifyNotNull;
        d.verifyValue = d.verifyValue;
        d.verifyException = d.verifyException;
        d.verifySuccess = d.verifySuccess;
        d.compareArrays = d.compareArrays;
        return d
    });
    define("lsq", "LoggerManager lsG lsB Environment ASSERT lsA".split(" "), function (g, f, e, b, d, h) {
        var a = g.getLoggerProxy(h.Re), c = e.ux(), l = /^[a-z][a-z0-9-]+$/, n = /^((?:[a-z][a-z.0-9-]+).(?:[a-z][a-z-]+))(?![\w.])/, k = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?![d])/, m = /^[a-f0-9:]+$/;
        return {
            aC: function (a) {
                a = a.toLowerCase();
                var c = 0 == a.indexOf("http://") ? 7 : 0 == a.indexOf("https://") ? 8 : -1;
                if (-1 == c)return "The given server address has not a valid scheme";
                var b = a.lastIndexOf(":"), b = b > c ? b : a.length, d = this.Aq(a, a.indexOf("://"));
                if (null != d && isNaN(d.substring(1)))return "The given server address has not a valid port";
                d = a.indexOf("/", c);
                d = d < b ? d : b;
                if ("[" == a.charAt(c)) {
                    if (a = a.substring(c + 1, a.lastIndexOf("]")), !m.test(a))return "The given server address is not a valid IPv6"
                } else if (a = a.substring(c, d), -1 < a.indexOf(".")) {
                    if (!n.test(a) && !k.test(a))return "The given server address is not a valid URL"
                } else if (!l.test(a))return "The given server address is not a valid machine name";
                return !0
            }, Aq: function (a, c) {
                var b = a.indexOf(":", c + 1);
                if (-1 >= b)return null;
                if (-1 < a.indexOf("]")) {
                    b = a.indexOf("]:");
                    if (-1 >= b)return null;
                    b += 1
                } else if (b != a.lastIndexOf(":"))return null;
                var d = a.indexOf("/", c + 3);
                return -1 < d ? a.substring(b, d) : a.substring(b)
            }, gv: function (a, c) {
                var b = this.Aq(a, a.indexOf("://"));
                if (b) {
                    var d = c.indexOf("/");
                    c = -1 >= d ? c + b : c.substring(0, d) + b + c.substring(d)
                }
                c = 0 == a.toLowerCase().indexOf("https://") ? "https://" + c : "http://" + c;
                "/" != c.substr(c.length - 1) && (c += "/");
                return c
            }, Vw: function (h, l,
                             e, k, s, n, m, y, x, w, K) {
                K = K && b.isBrowserDocument() && !f.Gm() ? "LS_domain\x3d" + f.mc() + "\x26" : "";
                h = "LS_phase\x3d" + h + "\x26" + K + (y ? "LS_cause\x3d" + y + "\x26" : "");
                s || n ? (h += "LS_polling\x3dtrue\x26", y = w = 0, n && (w = Number(e.Dd), null == x || isNaN(x) || (w += x), y = e.ej), isNaN(w) || (h += "LS_polling_millis\x3d" + w + "\x26"), isNaN(y) || (h += "LS_idle_millis\x3d" + y + "\x26")) : (0 < e.zf && (h += "LS_keepalive_millis\x3d" + e.zf + "\x26"), w && (h += "LS_content_length\x3d" + e.Ql + "\x26"));
                if (s)return l = "", 0 < e.Qc && (l += "LS_requested_max_bandwidth\x3d" + e.Qc + "\x26"),
                null != k.fi && (l += "LS_adapter_set\x3d" + encodeURIComponent(k.fi) + "\x26"), null != k.Nk && (l += "LS_user\x3d" + encodeURIComponent(k.Nk) + "\x26"), e = h + c + l, m && (e += "LS_old_session\x3d" + m + "\x26"), a.logDebug(g.resolve(69), e), null != k.Mj && (e += "LS_password\x3d" + encodeURIComponent(k.Mj) + "\x26"), e;
                d.verifyOk(l) || a.logError(g.resolve(67));
                k = "LS_session\x3d" + l + "\x26" + h;
                a.logDebug(g.resolve(68), k);
                return k
            }, ww: function (c, b) {
                var d = {LS_op: "destroy", LS_session: c};
                b && (d.LS_cause = b);
                a.logDebug(g.resolve(70));
                return d
            }, Dw: function (c,
                             b) {
                var d = {LS_op: "force_rebind"};
                c && (d.LS_cause = c);
                null == b || isNaN(b) || (d.LS_polling_millis = b);
                a.logDebug(g.resolve(71));
                return d
            }, Kw: function (a, c, b) {
                c.LS_build = b;
                c.LS_phase = a;
                return c
            }, qw: function (a) {
                return {LS_op: "constrain", LS_requested_max_bandwidth: 0 < a.Qc ? a.Qc : 0}
            }, br: function (c, b, d) {
                c = b || ".js" == d || "" == d ? (c ? this.sm() + "create_session" : "bind_session") + d : (c ? this.sm() : "") + "STREAMING_IN_PROGRESS";
                a.logDebug(g.resolve(72), c);
                return c
            }, sm: V("")
        }
    });
    define("lsK", "IllegalArgumentException lsH Inheritance Environment Global lsq lsG".split(" "), function (g, f, e, b, d, h, a) {
        function c() {
            this.Fh = k;
            this.dt = this.ct = this.Mj = this.Nk = this.fi = null;
            this.lq = n;
            this.Ok = l;
            this._callSuperConstructor(c, arguments);
            this.P = "lsK"
        }

        var l = {
            Fh: "serverAddress",
            fi: "adapterSet",
            Nk: "user",
            Mj: "password",
            ct: "serverInstanceAddress",
            dt: "serverSocketName"
        }, l = a.getReverse(l), n = {Mj: !0}, k = !b.isBrowser() || "http:" != location.protocol && "https:" !=
        location.protocol ? null : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/";
        c.prototype = {
            lt: function (a) {
                if (null === a)a = k; else {
                    "/" != a.substr(a.length - 1) && (a += "/");
                    var c = h.aC(a);
                    if (!0 !== c)throw new g(c);
                }
                this.v("serverAddress", a)
            }, cr: M("Fh"), ft: function (a) {
                this.v("adapterSet", a)
            }, ew: M("fi"), mB: function (a) {
                this.v("user", a)
            }, tx: M("Nk"), UA: function (a) {
                this.v("password", a)
            }, ex: M("ct"), fx: M("dt")
        };
        c.prototype.setServerAddress = c.prototype.lt;
        c.prototype.getServerAddress = c.prototype.cr;
        c.prototype.setAdapterSet = c.prototype.ft;
        c.prototype.getAdapterSet = c.prototype.ew;
        c.prototype.setUser = c.prototype.mB;
        c.prototype.getUser = c.prototype.tx;
        c.prototype.setPassword = c.prototype.UA;
        c.prototype.getServerInstanceAddress = c.prototype.ex;
        c.prototype.getServerSocketName = c.prototype.fx;
        e(c, f);
        return c
    });
    define("lsAQ", ["LoggerManager", "EnvironmentStatus", "ASSERT", "lsA"], function (g, f, e, b) {
        function d(a) {
            this.u = null;
            this.ob = !1;
            this.p = null;
            this.b = a;
            f.addUnloadHandler(this)
        }

        var h = g.getLoggerProxy(b.Qa);
        d.prototype = {
            rc: function () {
                h.logInfo(g.resolve(73));
                this.ob = !0;
                this.b.h.yx()
            }, Tc: function () {
                h.logInfo(g.resolve(74));
                this.ob = !1;
                this.b.Yn()
            }, ha: function (a) {
                return a == this.u
            }, nk: function (a) {
                e.verifyNotOk(this.ob);
                this.u = a;
                this.rc()
            }, et: function (a) {
                this.u = a;
                this.ob && this.Tc()
            }, zk: function (a) {
                this.b.Gg(a)
            },
            ue: function (a) {
                this.b.sq(a);
                this.Tc()
            }, unloadEvent: function () {
                this.mn()
            }, ia: function () {
                f.removeUnloadHandler(this)
            }
        };
        d.prototype.unloadEvent = d.prototype.unloadEvent;
        return d
    });
    define("lsAV", "lsAQ Inheritance LoggerManager lsG Executor ASSERT lsA Helpers".split(" "), function (g, f, e, b, d, h, a, c) {
        function l(a, c) {
            this._callSuperConstructor(l, [a]);
            this.Pk = 2E3;
            this.da();
            this.Jn = c;
            this.kd = null
        }

        var n = {
                Gy: "newPage",
                Iv: "engineConfiguration",
                sv: "deletePage",
                JB: "tableRemove",
                fd: "updateSubscriptionParams",
                fd: "updateSubscriptionParams",
                Gj: "onTable",
                KB: "tableRequestSubmission",
                qi: "callConnect",
                ri: "callDisconnect",
                tA: "sendMex",
                Hd: "sendLog"
            }, n = b.getReverse(n),
            k, m;
        for (m in{ue: !0})k = m;
        var p = e.getLoggerProxy(a.Qa);
        l.prototype = {
            toString: function () {
                return ["[|RemoteEngineHandler", this.p, this.Qk, this.oe, this.Ta, this.ob, this.u, this.kd, this.Mm, "]"].join("|")
            }, da: function (a) {
                this.u = null;
                this.kd = a ? this.kd + 1 : c.randomG() + 1;
                this.oe = !1;
                this.Ta = null;
                this.ob = this.Qk = !1;
                this.p = -1;
                this.tb = null;
                this.Mm = !1
            }, Hm: M("oe"), wi: function () {
                var a = !1;
                try {
                    var c = this.qf();
                    c && (a = c.fb().vi(this.p))
                } catch (b) {
                    p, logInfo(e.resolve(76), b), a = !1
                }
                a || this.ue();
                return a
            }, vi: function (a, c) {
                p.logDebug(e.resolve(77),
                    a, this.kd);
                return c ? (p.logDebug(e.resolve(78), c, this.u), a == this.kd && this.ha(c)) : a == this.kd
            }, Fe: function (a, c) {
                p.logDebug(e.resolve(79), a, this);
                return this.Gd(a, c, !1, !1)
            }, oa: function (a, c) {
                p.logDebug(e.resolve(80), a, this);
                return this.Gd(a, c, !0, !1)
            }, Vn: function (a, c) {
                p.logDebug(e.resolve(81), a, this);
                return this.Gd(a, c, !1, !0)
            }, ag: function (a, c) {
                p.logDebug(e.resolve(82), a, this);
                return this.Gd(a, c, !0, !0)
            }, fb: function () {
                var a = this.qf();
                return a ? a.fb() : null
            }, Gd: function (a, c, b, d) {
                if (!this.oe)return !1;
                p.logDebug(e.resolve(83),
                    a);
                a = n[a];
                try {
                    var h = this.fb();
                    if (!h)return !1;
                    (d ? h.Cm(this.p) : h.Hs).S(a, this.p, c, b ? this.u : null)
                } catch (l) {
                    return this.Rv(l), !1
                }
                return !0
            }, tn: function (a, c, b, h, l, e, k, f) {
                this.oe = !0;
                this.Qk = !1;
                this.p = a;
                this.u = c;
                this.Ta = k;
                this.Pk = 2E3;
                this.ob = f;
                this.tb.qt(d.packTask(this.bz, this));
                this.b.cs(!0, !1, h, l, e);
                this.b.Gg(b);
                this.ob && this.rc()
            }, bn: function () {
                this.tb.od();
                d.addTimedTask(this.tb.od, 1E3, this.tb)
            }, bz: function (a) {
                a ? this.wi() : this.ue()
            }, ue: function (a) {
                this.oe && this.tb && (this.tb.rt(), this.tb.Vb(), this.da(!0),
                    this._callSuperMethod(l, k, [a]))
            }, Rv: function () {
                this.Mm || p.logDebug(e.resolve(84));
                this.Mm = !0;
                d.addTimedTask(this.tb.od, 0, this.tb)
            }, dz: function (a, c) {
                if (this.oe || this.Qk)p.logError(e.resolve(75)), h.fail();
                this.Qk = !0;
                this.kd++;
                try {
                    this.tb = a, this.fb().Hs.S(n.newPage, -1, {Po: window, Pj: this.kd, Jn: this.Jn})
                } catch (b) {
                    return this.da(!0), !1
                }
                d.addTimedTask(this.ez, this.Pk, this, [c]);
                this.Pk += 500;
                return !0
            }, ez: function (a) {
                d.executeTask(a)
            }, Zs: function (a, c, b) {
                this.Vn("engineConfiguration", {op: a, ku: b, Zz: c})
            }, mn: function () {
                this.oe &&
                this.p && this.Fe("deletePage", this.p)
            }, xn: function (a, c) {
                a ? this.ag("tableRemove", {G: c}) : this.ag("tableRemove", {Ie: c, kb: this.p})
            }, zn: function (a, c, d) {
                a ? this.ag("updateSubscriptionParams", b.ba({G: c}, d)) : this.ag("updateSubscriptionParams", b.ba({
                    Ie: c,
                    kb: this.p
                }, d))
            }, Gj: function (a, c, d, h, l) {
                this.ag("onTable", b.ba({yb: a, Ie: c, Cb: d, kb: this.p, Ek: h}, l))
            }, qs: function (a, c) {
                this.ag("tableRequestSubmission", {kb: this.p, G: a, hf: c})
            }, qi: function () {
                this.Vn("callConnect")
            }, ri: function () {
                this.Vn("callDisconnect")
            }, Kq: function (a,
                             c, b, d) {
                this.oa("sendMex", {Rc: a, jk: c, mh: b, Ve: d})
            }, Jq: function (a) {
                this.Fe("sendLog", a)
            }, qf: function () {
                return this.tb ? this.tb.oh : null
            }
        };
        f(l, g);
        return l
    });
    define("lsAT", ["lsAQ", "Inheritance", "ASSERT", "Executor"], function (g, f, e, b) {
        function d(b, a) {
            this._callSuperConstructor(d, [b]);
            this.ma = a;
            this.p = this.ma.fb().pu(b);
            this.u = this.ma.fb().u
        }

        d.prototype = {
            Hm: V(!0), bound: function (b) {
                var a = this.ma;
                this.b.cs(!1, b, a.qa, a.fa, a.M);
                this.b.Gg(a.wb());
                a.re() && this.rc()
            }, wi: function () {
                return this.ma.fb().vi(this.p)
            }, bn: D(), mn: function () {
                this.ma.fb().Ci(this.p)
            }, Zs: function (d, a, c) {
                d = "lsK" == d ? this.ma.qa : "lsL" == d ? this.ma.fa :
                    this.ma.M;
                b.addTimedTask(d.Z, 0, d, [a, c])
            }, xn: function (d, a) {
                e.verifyOk(d);
                b.addTimedTask(this.Ez, 0, this, [this.u, d, a])
            }, Ez: function (b, a, c) {
                var d = this.ma.fb();
                d && d.ha(b) && (a ? d.Di(c) : d.dq(this.p, c))
            }, zn: function (d, a, c) {
                b.addTimedTask(this.Fz, 0, this, [this.u, d, a, c])
            }, Fz: function (b, a, c, d) {
                var e = this.ma.fb();
                e && e.ha(b) && (a ? e.fd(c, d) : e.Kk(this.p, c, d))
            }, Gj: function (d, a, c, l, e) {
                b.addTimedTask(this.Dz, 0, this, [this.u, d, a, c, l, e])
            }, Dz: function (b, a, c, d, e, k) {
                var f = this.ma.fb();
                f && f.ha(b) && f.hr(a, c, d, this.p, e, k)
            }, qs: function (b,
                             a) {
                this.ma.fb().Ak(this.p, b, a)
            }, qi: function () {
                this.ma.Gi()
            }, ri: function () {
                this.ma.kq()
            }, Kq: function (b, a, c, d) {
                this.ma.gk(b, a, c, d)
            }, Jq: function (b) {
                this.ma.Hd(b)
            }, sy: function () {
                this.ma.Li()
            }, qf: M("ma")
        };
        f(d, g);
        return d
    });
    define("lsAU", ["ASSERT", "Executor"], function (g, f) {
        function e(b) {
            this.Bf = -1;
            this.vh = {};
            this.Oj = {};
            this.wh = {};
            this.Nj = 0;
            this.j = b
        }

        e.prototype = {
            wo: G("j"), Nw: function (b, d) {
                this.Bf++;
                this.vh[this.Bf] = d;
                this.Oj[this.Bf] = b;
                this.wh[this.Bf] = !1;
                this.Nj++;
                var h = {};
                h.kb = this.j.p;
                h.Ga = this.Bf;
                return h
            }, vb: function (b) {
                return this.vh[b]
            }, $g: function (b) {
                return this.Oj[b]
            }, dC: function (b) {
                return this.wh[b]
            }, av: function () {
                var b = [], d;
                for (d in this.vh)b.push(d);
                b.sort(function (b, a) {
                    return b - a
                });
                for (d = 0; d < b.length; d++)this.Lr(b[d]);
                g.verifyValue(this.Nj, 0);
                this.Bf = -1;
                this.vh = {};
                this.Oj = {};
                this.wh = {};
                this.Nj = 0
            }, clean: function (b) {
                delete this.vh[b];
                delete this.Oj[b];
                delete this.wh[b];
                this.Nj--
            }, tj: function (b) {
                this.vb(b) && (this.wh[b] = !0)
            }, oj: function (b) {
                var d = this.vb(b);
                d && f.addTimedTask(d.onProcessed, 0, d, [this.$g(b)]);
                this.clean(b)
            }, sj: function (b) {
                var d = this.vb(b);
                d && f.addTimedTask(d.onError, 0, d, [this.$g(b)]);
                this.clean(b)
            }, qj: function (b, d, h) {
                var a = this.vb(b);
                a && f.addTimedTask(a.onDeny, 0, a, [this.$g(b), d, h]);
                this.clean(b)
            }, rj: function (b) {
                var d =
                    this.vb(b);
                d && f.addTimedTask(d.onDiscarded, 0, d, [this.$g(b)]);
                this.clean(b)
            }, Lr: function (b) {
                var d = this.vb(b);
                d && f.addTimedTask(d.onAbort, 0, d, [this.$g(b), this.dC(b)]);
                this.clean(b)
            }
        };
        return e
    });
    define("lsAe", ["Executor", "LoggerManager", "ASSERT", "lsA"], function (g, f, e, b) {
        function d(a) {
            this.Iy = 0;
            this.uc = {};
            this.Ph = {};
            this.dw = 1;
            this.Fa = null;
            this.c = a;
            this.Yp = 4E3
        }

        var h = f.getLoggerProxy(b.ug), a = f.getLoggerProxy(b.Qa);
        d.prototype = {
            toString: V("[SubscriptionsHandler]"), wo: G("Fa"), ud: function (a) {
                return this.uc[this.Ph[a]] || null
            }, gi: function (a) {
                var b = ++this.Iy;
                h.logInfo(f.resolve(87), a);
                a.Xy(b, ++this.dw, this);
                this.uc[b] = a;
                this.Fa && this.Fa.ob && this.Fn(a)
            }, $j: function (a) {
                var b = a.bc,
                    d = a.Je;
                h.logInfo(f.resolve(88), a);
                if (a.Qm() || a.qe())e.verifyOk(this.Fa.Hm()), d ? this.Fa.xn(!0, d) : this.Fa.xn(!1, b);
                a.sz();
                d && delete this.Ph[d];
                delete this.uc[b];
                return a
            }, fd: function (a, b) {
                if (e.verifyOk(a.ih() && this.Fa && this.Fa.Hm())) {
                    var d = a.Je;
                    d ? this.Fa.zn(!0, d, b) : this.Fa.zn(!1, a.bc, b)
                } else h.logError(f.resolve(85), a)
            }, Fn: function (c, b, d) {
                if (b) {
                    if (!c.Sm() || !this.Fa.ha(b) || !c.zl(d))return
                } else c.Yx() || (h.logError(f.resolve(86)), e.fail()), c.zz();
                d = c.Cb;
                g.addTimedTask(this.Fn, this.Yp, this, [c, this.Fa.u,
                    d]);
                a.logDebug(f.resolve(89));
                this.Fa.Gj(c.yb, c.bc, d, c.Ek, c.bk)
            }, Hj: function (c, b, d, h) {
                var e = this.uc[c];
                e && (e.Sm() && e.Kp(d) && e.zl(h)) && (a.logDebug(f.resolve(90)), e.Hj(b), this.Ph[b] = c, this.ut(e))
            }, ut: function (c, b, d, h, e, p) {
                if (c.Qm()) {
                    if (b) {
                        if (!this.Fa.ha(b) || !c.Kp(h) || !c.zl(e))return !1;
                        p++
                    } else p = 1;
                    b = (d ? 2 * d : this.Yp) + this.c.Dd;
                    a.logDebug(f.resolve(91));
                    d = g.packTask(this.ut, this, [c, this.Fa.u, b, c.yb, c.Cb, p]);
                    c.Au(d, b);
                    this.Fa.qs(c.Je, p)
                }
            }, yx: function () {
                h.logDebug(f.resolve(92));
                for (var a in this.uc)this.Fn(this.uc[a])
            },
            Rz: function (a) {
                e.verifyNotOk(a.Xx());
                h.logDebug(f.resolve(93), a);
                delete this.Ph[a.Je];
                a.pz();
                a.tt && delete this.uc[a.bc]
            }, Qz: function () {
                h.logDebug(f.resolve(94));
                for (var a in this.uc)this.Rz(this.uc[a]);
                this.Ph = {}
            }, Jk: function (a, b) {
                var d = this.ud(a[0]);
                if (!d)return !0;
                d.update(a, b, !1)
            }, Bd: function (a, b, d) {
                a = this.ud(a);
                if (!a)return !1;
                a.xy(b, d)
            }, Ub: function (a, b) {
                var d = this.ud(a);
                if (!d)return !1;
                d.jm(b)
            }, Tb: function (a, b) {
                var d = this.ud(a);
                if (!d)return !1;
                d.Fl(b)
            }, tq: function (a, b, d) {
                (d = this.ud(d)) && d.zA(a, b)
            },
            vt: function (a, b, d, h, e) {
                (a = this.ud(a)) && a.xz(b, d, h, e)
            }, xt: function (a) {
                (a = this.ud(a)) && a.Az()
            }
        };
        return d
    });
    define("lsD", ["LoggerManager", "Executor", "lsA"], function (g, f, e) {
        function b(a, b, d, h) {
            this.fl = a;
            this.pq = b;
            this.Ae = d;
            this.xs = h
        }

        function d(a, b, h) {
            this.Dg = !0 === h;
            this.ov = a;
            this.vq = b;
            this.N = this.Dg ? [] : {Vf: 0, og: 0, ie: 0};
            this.Dg || (this.bc = d.next++, d.Tj[this.bc] = this)
        }

        var h = g.getLoggerProxy(e.Qa);
        d.Tj = {};
        d.next = 0;
        d.Sa = function () {
            for (var a in this.Tj)this.Tj[a].Sa()
        };
        d.remove = function (a) {
            delete this.Tj[a.bc]
        };
        d.prototype = {
            S: function (a, b, d, e) {
                h.logDebug(g.resolve(97), a);
                this.Dg ? f.addTimedTask(this.hs,
                    0, this, [a, b, d, e]) : this.hs(a, b, d, e)
            }, hs: function (a, c, d, h) {
                if (this.Dg)this.N.push(new b(a, c, d, h)), this.Sa(); else {
                    this.xh();
                    this.N[this.N.og] = new b(a, c, d, h);
                    this.N.og++;
                    try {
                        f.addTimedTask(this.Sa, 0, this)
                    } catch (e) {
                    }
                    this.clean()
                }
            }, clean: function () {
                for (var a = this.N.Vf; this.N.ie < a; this.N.ie++)delete this.N[this.N.ie]
            }, xh: function () {
                this.N.ie == this.N.Vf && this.N.ie == this.N.og && (this.N.og = 0, this.N.Vf = 0, this.N.ie = 0, this.N = {
                    Vf: 0,
                    og: 0,
                    ie: 0
                })
            }, Sa: function () {
                if (this.Dg)for (; 0 < this.N.length;) {
                    var a = this.N.shift();
                    this.handleEvent(a)
                } else {
                    for (var b = this.N.Vf; b < this.N.og;)a = this.N[b], this.handleEvent(a), b++;
                    this.N.Vf = b
                }
            }, handleEvent: function (a) {
                try {
                    if (this.ov.vi(a.pq, a.xs))if (this.vq[a.fl])this.vq[a.fl](a.Ae); else h.logError(g.resolve(95))
                } catch (b) {
                    h.logError(g.resolve(96), b)
                }
            }
        };
        b.prototype.toString = function () {
            return ["[|CrossPageProxy.Event", this.fl, this.pq, this.Ae, this.xs, "]"].join("|")
        };
        return d
    });
    define("lso", [], function () {
        function g(f) {
            this.Kg = f;
            this.Ke = {};
            this.Le = {}
        }

        g.prototype = {
            gi: function (f, e, b, d, h) {
                b = {jb: f, cu: b, Cb: d, yb: h, id: e};
                this.Ke[e] = b;
                this.Le[f] = b
            }, $j: function (f) {
                this.Le[f] && (delete this.Ke[this.Le[f].id], delete this.Le[f])
            }, dA: function (f) {
                this.Kg.Di(this.Dm(f))
            }, Kk: function (f, e) {
                this.Kg.fd(this.Dm(f), e)
            }, ia: D(), nx: function (f) {
                return this.Le[f] ? this.Le[f].cu : null
            }, Dm: function (f) {
                return this.Ke[f] ? this.Ke[f].jb : null
            }, Qx: function (f, e, b) {
                return this.Ke[f] && this.Ke[f].Cb ==
                    e && this.Ke[f].yb == b
            }, Rm: function (f) {
                return (f = this.ah().h.ud(f)) ? f.qe() : !1
            }
        };
        return g
    });
    define("lsp", "lso Inheritance lsF lsD lsL lsK lsJ LoggerManager lsA lsG".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k(a, c, d, h, l) {
            this._callSuperConstructor(k, [d]);
            this.En = new e(a);
            this.Ap = c;
            this.Bs = l;
            this.gn = null;
            this.zt = new b(this.Kg, h, !1)
        }

        var m = {
            Rm: "isTableSubscribed",
            Mz: "pageCallback",
            FB: "tableCallback",
            su: "addRequestSent",
            GB: "tableError",
            LB: "tableSubscription",
            MB: "tableUnsubscription",
            Jk: "updatePage",
            HB: "tableOverflow",
            jm: "endOfSnapshot",
            Fl: "clearSnapshot",
            rj: "messageDiscarded",
            qj: "messageDenied",
            sj: "messageError",
            oj: "messageComplete",
            tj: "messageOnNetwork",
            nk: "sessionReadyNotification",
            Yn: "sessionEnd",
            zk: "statusChange",
            lk: "serverError",
            iv: "configurationChange",
            Kv: "engineDying",
            Jv: "engineDeath"
        }, m = n.getReverse(m), p = c.getLoggerProxy(l.Qa);
        k.Ut = !1;
        k.prototype = {
            toString: function () {
                return ["[|RemotePushPageHandler", this.Bs, this.Ap, "]"].join("|")
            }, ia: function () {
                p.logInfo(c.resolve(98), this);
                b.remove(this.zt)
            },
            Cm: M("zt"), Fe: function (a, b) {
                p.logDebug(c.resolve(100), a, this);
                this.Gd(a, b, !1)
            }, oa: function (a, b, d) {
                p.logDebug(c.resolve(101), a, this);
                this.Gd(a, b, d || !0)
            }, bt: function (a, b, d) {
                p.logDebug(c.resolve(102), a, this);
                this.Gd(a, b, d - 1)
            }, Gd: function (a, b, d) {
                if (!k.Ut) {
                    a = m[a];
                    d = !0 === d ? this.Kg.u : !1 === d ? null : d;
                    try {
                        this.ah().Ck.S(a, this.Ap, b, d)
                    } catch (h) {
                        p.logInfo(c.resolve(99), h), this.Kg.Ci(this.gn)
                    }
                }
            }, ah: function () {
                try {
                    return this.En.Ha.Lightstreamer["P" + this.Bs].lsPage
                } catch (a) {
                    return p.logDebug(c.resolve(103), a), null
                }
            },
            jh: function () {
                try {
                    this.En.Rh();
                    if (!this.En.Ha)return p.logDebug(c.resolve(104), this), !1;
                    var a = this.ah();
                    if (!a)return p.logDebug(c.resolve(105), this), !1;
                    var b = a.j;
                    if (!b)return p.logDebug(c.resolve(106), this), !1;
                    var d = b.p;
                    return null != d && d != this.gn ? (p.logDebug(c.resolve(107), this), !1) : !0
                } catch (h) {
                    return p.logDebug(c.resolve(108), h, this), !1
                }
            }, Rm: function (a) {
                try {
                    return this._callSuperMethod(k, m.isTableSubscribed, [a])
                } catch (b) {
                    return p.logDebug(c.resolve(109), b), !1
                }
            }, tn: function (b, c, e) {
                this.gn = b;
                this.Fe("pageCallback",
                    {
                        Po: b,
                        u: c,
                        Ta: e.Xg(),
                        M: new a(e.M),
                        fa: new d(e.fa),
                        qa: new h(e.qa),
                        status: e.wb(),
                        ob: e.re()
                    })
            }, os: function (a, b, c, d) {
                this.oa("tableCallback", {yb: a, Cb: b, Ie: c, G: d})
            }, Xr: function (a) {
                this.oa("addRequestSent", {G: a})
            }, Qf: function (a, b, c) {
                this.oa("tableError", {nm: a, Rc: b, G: c})
            }, rs: function (a, b, c, d, h) {
                this.oa("tableSubscription", {G: a, ry: b, Mu: c, qy: d, Vv: h})
            }, ss: function (a) {
                this.oa("tableUnsubscription", {G: a})
            }, ts: function (a, b) {
                this.oa("updatePage", {zu: a, sB: b})
            }, ps: function (a, b, c) {
                this.oa("tableOverflow", {
                    G: a, item: b,
                    yy: c
                })
            }, Ub: function (a, b) {
                this.oa("endOfSnapshot", {G: a, item: b})
            }, Tb: function (a, b) {
                this.oa("clearSnapshot", {G: a, item: b})
            }, xe: function (a) {
                this.oa("messageDiscarded", {Ga: a})
            }, ks: function (a, b, c) {
                this.oa("messageDenied", {Ga: a, el: b, Rc: c})
            }, Nf: function (a, b, c) {
                this.oa("messageError", {Ga: a, el: b, Rc: c})
            }, js: function (a) {
                this.oa("messageComplete", {Ga: a})
            }, ls: function (a) {
                this.oa("messageOnNetwork", {Ga: a})
            }, rc: function (a) {
                this.bt("sessionReadyNotification", {a: a}, a)
            }, Tc: function (a) {
                this.bt("sessionEnd", {a: a}, a)
            },
            onStatusChange: function (a) {
                this.oa("statusChange", {status: a})
            }, Of: function (a, b) {
                this.oa("serverError", {nm: a, Rc: b})
            }, $r: function (a, b, c) {
                this.Fe("configurationChange", {Wr: a, Yz: b, $B: c})
            }, es: function () {
                this.Fe("engineDying")
            }, ds: function (a) {
                this.Fe("engineDeath", {CB: a})
            }
        };
        f(k, g);
        return k
    });
    define("lsAf", ["lsA"], function (g) {
        return function (f, e) {
            var b = e ? f : [];
            b.Gc = [];
            e || (b[0] = parseInt(f[0]), b[1] = parseInt(f[1]));
            for (var d = 2, h = f.length; d < h; d++)f[d] ? -1 == f[d].length ? b[d] = g.vg : (e || (b[d] = f[d].toString()), b.Gc.push(d - 1)) : (e || (b[d] = "" === f[d] ? "" : null), b.Gc.push(d - 1));
            return b
        }
    });
    define("lsk", ["lso", "Inheritance", "lsAf"], function (g, f, e) {
        function b(d, h) {
            this._callSuperConstructor(b, [d]);
            this.b = h
        }

        b.prototype = {
            ah: M("b"), jh: V(!0), os: function (b, h, a, c) {
                this.b.h.Hj(a, c, b, h)
            }, Xr: function (b) {
                this.b.h.xt(b)
            }, Qf: function (b, h, a) {
                this.b.h.tq(b, h, a)
            }, rs: function (b, h, a, c, e) {
                this.b.h.vt(b, h, a, c, e)
            }, ss: D(), ts: function (b, h) {
                this.b.h.Jk(e(b, !0), h)
            }, ps: function (b, h, a) {
                this.b.h.Bd(b, h, a)
            }, Ub: function (b, h) {
                this.b.h.Ub(b, h)
            }, Tb: function (b, h) {
                this.b.h.Tb(b, h)
            },
            xe: function (b) {
                this.b.q.rj(b)
            }, ks: function (b, h, a) {
                this.b.q.qj(b, h, a)
            }, Nf: function (b, h, a) {
                this.b.q.sj(b, h, a)
            }, js: function (b) {
                this.b.q.oj(b)
            }, ls: function (b) {
                this.b.q.tj(b)
            }, rc: function (b) {
                this.b.j.nk(b)
            }, Tc: function (b) {
                this.b.j.et(b)
            }, onStatusChange: function (b) {
                this.b.j.zk(b)
            }, Of: function (b, h) {
                this.b.lk(b, h)
            }, $r: function (b, h, a) {
                ("lsK" == b ? this.b.qa : "lsL" == b ? this.b.fa : this.b.M).Z(h, a)
            }, es: function () {
                this.b.j.bn()
            }, ds: function (b) {
                this.b.j.ue(b)
            }
        };
        f(b, g);
        return b
    });
    define("lsg", ["lsG", "LoggerManager", "lsA"], function (g, f, e) {
        function b(a) {
            return null == a ? null : a.toString()
        }

        function d(a) {
            var d = {}, h;
            for (h in a)0 === h.indexOf("LS_") && (d[h] = b(a[h]));
            return d
        }

        function h(a, b) {
            this.X = a;
            this.Ed = b
        }

        var a = f.getLoggerProxy(e.Qa);
        h.prototype = {
            toString: V("[Master EventBridge]"), Gy: function (b) {
                a.logDebug(f.resolve(110), this);
                this.Ed.qu(b.Po, parseInt(b.Pj), parseInt(b.Jn))
            }, Gj: function (c) {
                a.logDebug(f.resolve(111), this);
                this.Ed.hr(parseInt(c.yb), b(c.Ie), parseInt(c.Cb),
                    parseInt(c.kb), parseInt(c.Ek), d(c))
            }, KB: function (b) {
                a.logDebug(f.resolve(112), this);
                this.Ed.Ak(parseInt(b.kb), parseInt(b.G), parseInt(b.hf))
            }, JB: function (c) {
                a.logDebug(f.resolve(113), this);
                c.G ? this.Ed.Di(parseInt(c.G)) : this.Ed.dq(parseInt(c.kb), b(c.Ie))
            }, fd: function (c) {
                a.logDebug(f.resolve(114), this);
                c.G ? this.Ed.fd(parseInt(c.G), d(c)) : this.Ed.Kk(parseInt(c.kb), b(c.Ie), d(c))
            }, sv: function (b) {
                a.logDebug(f.resolve(115), this);
                this.Ed.Ci(parseInt(b))
            }, Hd: function (b) {
                a.logDebug(f.resolve(116), this);
                this.X.Hd(d(b))
            },
            tA: function (c) {
                a.logDebug(f.resolve(117), this);
                this.X.gk(b(c.Rc), g.cf(c.jk), c.mh, g.cf(c.Ve))
            }, Iv: function (c) {
                a.logDebug(f.resolve(118), this);
                ("lsK" == c.op ? this.X.qa : "lsL" == c.op ? this.X.fa : this.X.M).Z(b(c.Zz), c.ku)
            }, qi: function () {
                a.logDebug(f.resolve(119), this);
                this.X.Gi()
            }, ri: function () {
                a.logDebug(f.resolve(120), this);
                this.X.kq()
            }
        };
        return h
    });
    define("lsQ", [], function () {
        function g(f) {
            this.Qs = f;
            this.hk = !0;
            this.Ve = 100
        }

        g.prototype = {
            px: function () {
                var f = this.Ve;
                this.Ve += 5E3;
                return f
            }, toString: function () {
                return ["[|DeleteStatus", this.hk, this.Qs, this.Ve, "]"].join("|")
            }
        };
        return g
    });
    define("lsW", ["Executor"], function (g) {
        function f(e, b) {
            this.af = e;
            this.Dt = this.Aw ? this.af.Si : b ? 2 * b : 4E3
        }

        f.prototype = {
            Ad: function (e) {
                e ? this.ee() : g.addTimedTask(this.Cd, this.Dt + Number(this.af.Dd), this)
            }, Cd: function () {
                this.verifySuccess() || this.ee()
            }
        };
        return f
    });
    define("lsV", ["Inheritance", "lsW", "ASSERT"], function (g, f, e) {
        function b(d, h, a, c, e, f) {
            this._callSuperConstructor(b, [d, f]);
            this.G = h;
            this.Pj = a;
            this.ze = c;
            this.Qu = e
        }

        b.prototype = {
            verifySuccess: function () {
                return !this.ze.ky(this.G, this.Pj)
            }, ee: function () {
                this.ze.fd(this.G, this.Qu, this.Dt)
            }, Bj: function () {
                e.fail();
                this.Pf(this.G, this.Pj)
            }
        };
        g(b, f);
        return b
    });
    define("lsn", "lsD EnvironmentStatus lsp lsk Executor lsG LoggerManager ASSERT lsg lsQ lsV lsA Helpers".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p) {
        function q(a) {
            this.s = {};
            this.Or = 1;
            this.Dk = {};
            this.Jy = 1;
            this.Rs = p.randomG();
            this.ik = {};
            this.de = {};
            this.wt = 0;
            this.Be = {};
            this.X = a;
            this.u = p.randomG(100) + 1;
            this.Hs = new g(this, new l(this.X, this), !0);
            this.bv = d.addRepetitiveTask(this.cv, 5E3,
                this);
            f.addBeforeUnloadHandler(this);
            f.addUnloadHandler(this)
        }

        var r = a.getLoggerProxy(m.Qa);
        q.prototype = {
            toString: function () {
                return ["[|PushPageCollectionHandler", this.u, "]"].join("|")
            }, vi: function (a, b) {
                return -1 == a ? !0 : this.td(a) ? b ? this.ha(b) : !0 : !1
            }, ha: function (a) {
                return a == this.u
            }, td: function (b) {
                return this.s[b] ? this.s[b] : (r.logDebug(a.resolve(125)), null)
            }, Cm: function (a) {
                return (a = this.td(a)) ? a.Cm() : null
            }, Nc: function (b) {
                b = this.Dk[b];
                return "undefined" == typeof b ? (r.logDebug(a.resolve(126)), null) : this.td(b)
            },
            qu: function (b, c, d) {
                var h = this.Or++, k = new l(this.X, this);
                b = new e(b, c, this, k, d);
                this.s[h] = b;
                r.logDebug(a.resolve(127), this);
                b.tn(h, this.u, this.X)
            }, pu: function (c) {
                var d = this.Or++;
                c = new b(this, c);
                this.s[d] = c;
                r.logDebug(a.resolve(128), this);
                return d
            }, dq: function (b, c) {
                r.logDebug(a.resolve(129), this);
                b && this.s[b] && this.s[b].dA(c)
            }, nr: function (b) {
                delete this.Dk[b];
                var c;
                if ((c = this.de[b]) && c.hk) {
                    var h = c.px();
                    c.hk = !1;
                    5E3 < h && this.Jp(0);
                    r.logDebug(a.resolve(130));
                    d.addTimedTask(this.Tz, h, this, [b, c.Qs])
                }
            }, Jp: function (b) {
                var c =
                    this.X.$c;
                c && c.Tw(this.X.g.Oc()) > b && r.logWarn(a.resolve(124))
            }, Di: function (b) {
                r.logDebug(a.resolve(131), this);
                var d = this.Dk[b];
                d && this.s[d] ? this.s[d].$j(b) : (r.logError(a.resolve(121), this), c.fail());
                this.nr(b)
            }, Kk: function (b, c, d) {
                r.logDebug(a.resolve(132), this, d);
                b && this.s[b] && this.s[b].Kk(c, d)
            }, fd: function (b, c, d) {
                r.logDebug(a.resolve(133), this, c);
                var e = ++this.wt, l = h.ba({LS_table: b, LS_op: "reconf", LS_win_phase: e}, c);
                this.Be[b] = e;
                c = new k(this.X.fa, b, e, this, c, d);
                this.X.g.vA(b, l, c)
            }, Pf: function (a, b) {
                this.Be[a] ==
                b && delete this.Be[a]
            }, ky: function (a, b) {
                return this.Be[a] && this.Be[a] == b ? !0 : !1
            }, Op: function (a) {
                delete this.de[a];
                delete this.ik[a];
                delete this.Be[a]
            }, Mp: function () {
                this.de = {};
                this.ik = {};
                this.wt = 0;
                this.Be = {}
            }, Ci: function (b) {
                r.logDebug(a.resolve(134), this, b);
                if (this.s[b]) {
                    var c = this.s[b].Le, d;
                    for (d in c)this.Di(d);
                    this.s[b].ia();
                    delete this.s[b]
                }
            }, tu: function (a) {
                this.ik[a] = !0
            }, hA: function (a) {
                this.de[a] && (this.de[a].hk = !0)
            }, by: function (a) {
                return this.ik[a]
            }, Sy: function (a) {
                var b = this.s, c;
                for (c in b)b[c].onStatusChange(a);
                return !0
            }, Ty: function (a, b) {
                var c = this.s, d;
                for (d in c)c[d].Of(a, b)
            }, hr: function (b, d, h, e, l, k) {
                c.verifyOk(this.X.re()) || r.logError(a.resolve(122));
                l = this.s[e];
                if (!l)r.logError(a.resolve(123), this, e), c.fail(); else if (this.X.re()) {
                    var f;
                    l.Qx(d, h, b) ? f = l.Dm(d) : (f = this.Jy++, this.Dk[f] = e, e = this.uw(k, f), l.gi(f, d, e.add, h, b), this.de[f] = new n(e.remove));
                    r.logDebug(a.resolve(135));
                    l.os(b, h, d, f)
                }
            }, Ak: function (a, b, c) {
                3 <= c && this.Jp(1);
                (a = this.s[a].nx(b)) && this.X.g.uA(b, a, this, 2 <= c)
            }, uw: function (a, b) {
                this.Rs++;
                var c =
                {LS_table: b, LS_req_phase: this.Rs, LS_win_phase: this.u};
                h.ba(a, c);
                return {add: h.ba(a, {LS_op: "add"}), remove: h.ba(c, {LS_op: "delete"})}
            }, Ur: function (a) {
                var b = this.s;
                this.s = {};
                for (var c in b)b[c].ds(a)
            }, Py: function () {
                var a = this.s, b;
                for (b in a)a[b].es()
            }, cv: function () {
                for (var b in this.s)this.s[b].jh() || (r.logDebug(a.resolve(136), this), this.Ci(b))
            }, rc: function () {
                this.Mp();
                var a = this.s;
                this.u++;
                for (var b in a)a[b].rc(this.u)
            }, Tc: function () {
                this.Mp();
                var a = this.s;
                this.u++;
                for (var b in a)a[b].Tc(this.u)
            }, Tz: function (a,
                             b) {
                this.de[a] && this.X.re() && this.X.g.wA(a, b, this)
            }, ia: function () {
                d.stopRepetitiveTask(this.bv);
                f.removeBeforeUnloadHandler(this);
                f.removeUnloadHandler(this)
            }, unloadEvent: function () {
                this.Ur(!1)
            }, preUnloadEvent: function () {
                this.Py()
            }
        };
        q.prototype.unloadEvent = q.prototype.unloadEvent;
        q.prototype.preUnloadEvent = q.prototype.preUnloadEvent;
        return q
    });
    define("lsl", ["LoggerManager", "BrowserDetection", "Helpers", "lsA"], function (g, f, e, b) {
        var d = f.isProbablyFX(1.5, !0) ? 10 : 50, h = d, a = 0, c = 0, l = 0, n = null, k = null, m = null, p = g.getLoggerProxy(b.Ud);
        return {
            da: function () {
                h = d;
                l = c = a = 0;
                m = k = n = null
            }, Dx: function () {
                n = a;
                k = c;
                m = l;
                var b = e.getTimeStamp();
                l || (l = b);
                6E4 <= b - l && (a = 0, l = b);
                c && 1E3 > b - c && a++;
                c = b
            }, dk: function () {
                k != c && (a = n, c = k, l = m)
            }, Ep: function () {
                if (0 != c) {
                    if (!h)return !1;
                    if (a >= h)return p.logError(g.resolve(137)), h = 0, !1
                }
                return !0
            }
        }
    });
    define("lsAH", ["Environment", "lsG"], function (g, f) {
        function e(b, d, h, a, c, e) {
            this.VA(b);
            this.dg(d);
            this.setData(h);
            this.qk(a);
            this.Hh(c);
            this.Jh(e)
        }

        e.bu = "GET";
        e.$h = "POST";
        e.prototype = {
            toString: function () {
                return ["[", this.cc, this.ai, this.Ac, this.yg, "]"].join("|")
            }, VA: function (b) {
                for (; b && "/" == b.substring(b.length - 1);)b = b.substring(0, b.length - 1);
                this.cc = b
            }, dg: function (b) {
                for (; b && "/" == b.substring(0, 1);)b = b.substring(1);
                this.ai = b
            }, qk: function (b) {
                this.yg = b || e.$h
            }, Hh: function (b) {
                this.mv = b || !1
            }, Jh: function (b) {
                this.yq =
                    b || null
            }, setData: function (b) {
                this.Ac = b || null
            }, Mi: function (b) {
                this.Ac ? this.kv(b) || (this.Ac += b) : this.setData(b)
            }, kv: function (b) {
                return this.Ac && -1 < this.Ac.indexOf(b)
            }, getFile: M("ai"), Ua: function () {
                return this.ai ? this.cc + "/" + this.ai : this.cc
            }, getData: M("Ac"), sx: function () {
                return this.Ac ? this.Ua() + "?" + this.Ac : this.Ua()
            }, vr: function () {
                return !(0 == this.cc.indexOf("http://") || 0 == this.cc.indexOf("https://") || 0 == this.cc.indexOf("file:///"))
            }, cy: function (b, d) {
                if (!g.isBrowser())return !1;
                if (this.vr())return g.isWebWorker() ?
                location.hostname == b : f.mc() == b;
                if (d) {
                    if (!this.xr(d))return !1;
                    if ("file:" == d)return "" == b
                }
                b = b.replace(".", ".");
                return RegExp("^https?://(?:[a-z][a-z0-9-]+.)*" + b + "(?:/|$|:)", "i").test(this.cc)
            }, xr: function (b) {
                return g.isBrowser() && b.indexOf(":") == b.length - 1 ? this.vr() ? location.protocol == b : 0 == this.cc.indexOf(b) : !1
            }, xa: function () {
                if (!g.isBrowser())return !0;
                var b = g.isWebWorker() ? location.hostname : f.mc();
                return !this.cy(b, location.protocol)
            }, wa: function () {
                return g.isBrowser() ? !this.xr(location.protocol) : !0
            }
        };
        e.lu = new e("about:blank");
        return e
    });
    define("lsO", [], function () {
        function g(f, e, b, d, h) {
            this.Xc = f;
            this.Ks = e;
            this.Ls = d;
            this.Wd = b;
            this.Ee = h
        }

        g.Qd = 1;
        g.Se = 2;
        g.Wk = 3;
        g.Qe = 4;
        g.gd = 5;
        g.Oe = 6;
        g.Yk = 7;
        g.Pe = 8;
        g.Xo = 9;
        g.prototype = {
            toString: function () {
                return ["[|ControlRequest", this.Ls, this.Wd, this.Ee, this.Xc, "]"].join("|")
            }, getKey: M("Ls")
        };
        return g
    });
    define("lsa", ["lsAH", "lsO", "lsG"], function (g, f, e) {
        function b() {
        }

        b.prototype = {
            toString: V("[Encoder]"), Hx: function (b, h, a) {
                var c = new g;
                c.dg((b.sd() == f.Qe ? "msg" : b.sd() == f.gd ? "send_log" : b.sd() == f.Pe ? "heartbeat" : "control") + this.Yg());
                c.qk(g.$h);
                c.Hh(h);
                c.Jh(a);
                return c
            }, qq: function (b, h, a) {
                for (a = a ? "" : "\r\n"; 0 < b.getLength();) {
                    var c = b.Ri(), e = c.Ks, g = c.Wd;
                    if (g == f.Qd && e.lh())b.shift(); else if (g != f.Se || e.wu())if (e && e.verifySuccess && e.verifySuccess())b.shift(); else return b = c.Xc, g == f.Qe ? a + this.im(b,
                        e, h) : g == f.Oe ? a + this.fm(b, e, h) : g == f.Pe ? a + this.gm(b, e, h) : g == f.gd ? a + this.hm(b, e, h) : a + this.em(b, e, h); else e.Bj(), b.shift()
                }
                return null
            }, expand: function (b, e) {
                var a = "";
                if (b)for (var c in b)c !== e && (a += c + "\x3d" + b[c] + "\x26");
                return a
            }, Rg: function (b, e) {
                var a = this.expand(b);
                return a += this.expand(e)
            }, rq: function (b, e, a) {
                var c = this.expand(b, a), c = c + this.expand(e, a);
                b[a] ? c += a + "\x3d" + b[a] : e && (c += a + "\x3d" + e[a]);
                return "LS_unq\x3d" + c.length + "\x26" + c
            }, Qo: u(), Yg: V(".js"), vm: V(0), ym: V(2), em: function (b, h, a, c) {
                c = e.ba(c, {LS_session: a});
                return this.Rg(b, c)
            }, fm: function (b, e, a, c) {
                return this.Rg(b, c)
            }, gm: function (b, e, a, c) {
                return this.Rg(b, c)
            }, hm: function (b, h, a, c) {
                return a ? (c = e.ba(c, {LS_session: a}), this.Rg(b, c)) : this.Rg(b)
            }, im: function (b, e, a, c) {
                return this.rq(b, c, "LS_message")
            }
        };
        return b
    });
    define("lsb", ["lsa", "Inheritance", "lsG"], function (g, f, e) {
        function b() {
        }

        var d = 1, h = {
            im: "encodeMessageRequest",
            em: "encodeControlRequest",
            fm: "encodeDestroyRequest",
            gm: "encodeHeartbeatRequest",
            hm: "encodeLogRequest"
        }, h = e.getReverse(h);
        b.prototype = {
            im: function (a, c, d, f) {
                f = e.ba(f, {LS_session: d});
                c.No ? f.LS_msg_prog || a.LS_msg_prog || (f = e.ba(f, {
                    LS_ack: "",
                    LS_msg_prog: c.sa.Pv(c.jb)
                })) : (c.Gv(!0), f = e.ba(f, {LS_ack: "", LS_msg_prog: c.sa.Kr(c.jb)}));
                return this._callSuperMethod(b, h.encodeMessageRequest, [a,
                    c, d, f])
            }, em: function (a, c, l, f) {
                f = e.ba(f, {LS_unique: d++});
                return this._callSuperMethod(b, h.encodeControlRequest, [a, c, l, f])
            }, fm: function (a, c, l, f) {
                f = e.ba(f, {LS_unique: d++});
                return this._callSuperMethod(b, h.encodeDestroyRequest, [a, c, l, f])
            }, gm: function (a, c, l, f) {
                f = e.ba(f, {LS_unique: d++});
                return this._callSuperMethod(b, h.encodeHeartbeatRequest, [a, c, l, f])
            }, hm: function (a, c, l, f) {
                f = e.ba(f, {LS_unique: d++});
                return this._callSuperMethod(b, h.encodeLogRequest, [a, c, l, f])
            }, expand: function (a, b) {
                var d = "";
                if (a)for (var e in a)d =
                    e !== b ? d + (e + "\x3d" + a[e] + "\x26") : d + (e + "\x3d" + encodeURIComponent(a[e]) + "\x26");
                return d
            }, rq: function (a, b, d) {
                a = this.expand(a, d);
                return a += this.expand(b, d)
            }
        };
        f(b, g);
        return b
    });
    define("lsAI", ["lsb"], function (g) {
        function f() {
            for (var b in{ra: !0})this.bi = b;
            this.P = f
        }

        function e() {
            return !1
        }

        function b() {
            return !0
        }

        var d = new g;
        f.Zo = "LS_container\x3dlsc\x26";
        f.gc = function (d, a) {
            for (var c in a)d[c] = !0 === a[c] ? b : !1 === a[c] ? e : a[c]
        };
        f.gc(f, {va: !1, xa: !1, wa: !1, ec: !1, fc: !1, wf: !1, ic: !1});
        f.prototype = {
            $: D(), mk: function (b, a, c, d, e, k) {
                this.P.fc() ? b.Mi("LS_eng\x3d" + k + "\x26") : b.Mi(f.Zo);
                return this.ra(b, a, c, d, e)
            }, ra: V(!1), le: function () {
                return d
            }
        };
        return f
    });
    define("lsf", ["lsa", "Inheritance"], function (g, f) {
        function e() {
        }

        e.prototype = {
            toString: V("[WSEncoder]"), vm: function (b) {
                return b.length + 2
            }, Yg: V("")
        };
        f(e, g);
        return e
    });
    define("lsAK", "lsAI Inheritance EnvironmentStatus Executor Environment LoggerManager lsG ASSERT lsf lsA".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k(a) {
            this._callSuperConstructor(k);
            this.k = !1;
            this.$a = this.Ij = this.Xa = this.Ki = null;
            this.ye = this.sh = !1;
            this.Gh = null;
            this.An = !1;
            this.hC = a;
            this.P = k
        }

        function m(a) {
            a = a.toLowerCase();
            a = 0 == a.indexOf("http://") ? a.replace("http://", "ws://") : a.replace("https://", "wss://");
            if (q)return new q(a, r);
            if ("undefined" != typeof WebSocket)return new WebSocket(a,
                r);
            if ("undefined" != typeof MozWebSocket)return new MozWebSocket(a, r);
            k.Wl();
            return null
        }

        var p = h.getLoggerProxy(n.ab), q = null;
        d.isNodeJS() && (q = a.Aj("faye-websocket").Client);
        var r = "js.lightstreamer.com", t = new l, s = !1;
        k.Wl = function () {
            s = !0
        };
        k.oA = function () {
            s = !1
        };
        k.Px = function () {
            return s
        };
        g.gc(k, {
            va: function () {
                if (s)return !1;
                var a = null;
                "undefined" != typeof WebSocket ? a = WebSocket : "undefined" != typeof MozWebSocket && (a = MozWebSocket);
                return a && 2 == a.prototype.CLOSED ? !1 : q || a
            }, xa: !0, wa: function () {
                return !d.isBrowser() ||
                    "https:" != location.protocol
            }, ec: !0, fc: !1, wf: !0, ic: !1
        });
        k.prototype = {
            toString: function () {
                return ["[|WebSocketConnection", this.k, this.Xa, this.Ki, this.Pm(), "]"].join("|")
            }, $: function () {
                if (this.$a) {
                    p.logDebug(h.resolve(142));
                    this.Xa = null;
                    if (this.$a)try {
                        this.$a.close(1E3)
                    } catch (a) {
                        p.logDebug(h.resolve(143), a)
                    }
                    this.Wa()
                }
            }, Hz: function (a, c, d, e, l) {
                if (this.k)p.logError(h.resolve(138)); else if (s)return !1;
                this.ye = !1;
                this.Gh = a.cc;
                this.Xa = c;
                try {
                    this.$a = m(this.Gh)
                } catch (k) {
                    return p.logDebug(h.resolve(144), k), !1
                }
                b.addTimedTask(this.Iz,
                    6E3, this, [this.Xa]);
                var f = this;
                this.$a.onmessage = function (a) {
                    f.un(a, c, d)
                };
                this.$a.onerror = function () {
                    f.hz(c, e)
                };
                this.$a.onclose = function (a) {
                    f.Zy(a, c, l, e)
                };
                this.$a.onopen = function () {
                    f.oz(c)
                };
                return !0
            }, Iz: function (a) {
                if (a == this.Xa && this.$a && !this.An)try {
                    p.logDebug(h.resolve(145)), this.$a.close(1E3)
                } catch (b) {
                    p.logDebug(h.resolve(146))
                }
            }, ra: function (a, b) {
                if (this.k)return p.logError(h.resolve(139)), null;
                if (s)return !1;
                this.Ij = a;
                this.Ki = b;
                p.logDebug(h.resolve(147), a.Ua());
                this.Pm() && this.$s(b);
                return !0
            },
            Nx: function (a) {
                return c.verifyOk(this.Gh) ? 0 == this.Gh.indexOf(a) : (p.logError(h.resolve(140)), !1)
            }, Pm: function () {
                return null != this.$a && 1 == this.$a.readyState
            }, zg: function (a, b) {
                if (!this.Pm())return null;
                b && (this.Jt(b), a.Mi(g.Zo));
                p.isDebugLogEnabled() && p.logDebug(h.resolve(148), a.getFile());
                try {
                    this.$a.send(a.getFile() + "\r\n" + a.getData())
                } catch (c) {
                    return p.logDebug(h.resolve(149), c), !1
                }
                return !0
            }, $s: function (a) {
                var b = this.zg(this.Ij, a);
                c.verifyOk(null !== b) || p.logError(h.resolve(141), a);
                b && (this.k = !0, this.hC.Tv(this.Xa))
            },
            Jt: G("Ki"), un: function (a, c, d) {
                this.Xa != c || e.isUnloaded() || (p.isDebugLogEnabled() && p.logDebug(h.resolve(150), a.data), this.sh = !0, b.executeTask(d, [a.data, this.Ki]))
            }, hz: function (a, c) {
                this.Xa != a || e.isUnloaded() || (p.logDebug(h.resolve(151)), this.ye |= !this.sh, b.executeTask(c, ["wsc.unknown", this.Xa, !0, this.ye]))
            }, oz: function (a) {
                this.Xa != a || e.isUnloaded() || (this.An = !0, p.logDebug(h.resolve(152)), this.Ij && this.$s())
            }, Zy: function (a, c, d, l) {
                this.Xa != c || e.isUnloaded() || (a = a ? a.code : -1, p.logDebug(h.resolve(153),
                    a, this.sh), 1E3 == a || 1001 == a ? (b.modifyAllTaskParams(d, [this.Xa, !0]), b.addPackedTimedTask(d, 300), this.Wa()) : (this.ye |= !this.sh, d = this.Xa, this.Wa(), b.executeTask(l, ["wsc." + a, d, !0, this.ye])))
            }, Wa: function () {
                this.An = this.k = !1;
                this.Ij = this.Xa = null;
                this.sh = !1;
                this.Gh = this.$a = null
            }, le: function () {
                return t
            }
        };
        f(k, g);
        return k
    });
    define("lsR", ["Inheritance", "lsW"], function (g, f) {
        function e(b, d, h, a) {
            this._callSuperConstructor(e, [a]);
            this.du = b;
            this.ju = h;
            this.e = d
        }

        e.prototype = {
            verifySuccess: function () {
                return !this.e.ha(this.ju)
            }, ee: function () {
                this.e.Ti(this.du)
            }, Aw: function () {
                return this.af.Si
            }, Bj: D()
        };
        g(e, f);
        return e
    });
    define("lsr", "EnvironmentStatus Helpers LoggerManager Executor lsl lsA lsR lsO lsq ASSERT BrowserDetection lsAK".split(" "), function (g, f, e, b, d, h, a, c, l, n, k) {
        function m(a, c, d, e, h) {
            this.vl = b.packTask(this.yz, this);
            this.ul = b.packTask(this.wn, this);
            this.tl = b.packTask(this.vn, this);
            this.K = a;
            this.je = c;
            this.a = 1;
            this.na = 0;
            this.Na = 100 * f.randomG(100);
            this.d = d;
            this.J = e;
            this.tc = d.tc;
            this.c = d.c;
            this.Gb = d.Gb;
            this.aa = null;
            this.Q = d.Q;
            this.Jb = d.Xg();
            this.Cr = this.ng = this.bg = 0;
            this.Ge = this.Fd = this.Wm = null;
            this.reset();
            h && (this.Ye = h.Ye, this.pb = h.pb, this.Kd = h.Kd, this.Na = h.Na, this.bg = h.bg, this.kk = h.kk, this.Km = h.Km)
        }

        var p = e.getLoggerProxy(h.Ud), q = e.getLoggerProxy(h.Re);
        m.dl = 1;
        m.Rd = 2;
        m.$o = 3;
        m.bp = 4;
        m.ap = 5;
        m.Qt = 7;
        m.Xt = 8;
        m.mC = 9;
        m.pC = 10;
        m.Wt = 6;
        m.bl = 11;
        m.prototype = {
            reset: function () {
                this.Ye = 0;
                this.pb = this.Kd = null;
                this.bg = 0;
                this.ig = this.cd = this.ol = !1;
                this.uo = "";
                this.ad = !1
            }, Xf: D(), Fc: function (a) {
                var b = this.a;
                this.a = a;
                this.na++;
                a = this.na;
                this.a != b && this.d.wB(this.J);
                return a == this.na
            }, gj: function () {
                this.Na++
            }, ha: function (a) {
                return this.Na == a
            }, xm: function () {
                var a = this.a;
                return 1 == a ? h.ac : 11 == a ? h.wg : 2 == a ? h.CONNECTING : 3 == a || 4 == a || 5 == a ? h.Fb + this.Tq() : 10 == a ? h.Te : h.Fb + this.Pq()
            }, k: function () {
                return 1 != this.a && 2 != this.a && 11 != this.a
            }, jy: function () {
                return 2 == this.a || 7 == this.a || 5 == this.a
            }, ur: function () {
                return 3 == this.a || 8 == this.a || 9 == this.a || 10 == this.a
            }, hy: function () {
                return !this.K
            }, Oc: function () {
                return this.k() ? this.Kd : this.kk
            }, bh: M("pb"), Hb: function (a, b) {
                var c = 1 != this.a &&
                11 != this.a ? !1 : !0;
                if (!d.Ep())return this.Ra("mad", c, !0), !1;
                !1 == c && this.Ra("new." + (b || ""), !1, !1);
                p.logDebug(e.resolve(166), this);
                this.reset();
                this.Es();
                this.Gb.Z("serverSocketName", null);
                this.Gb.Z("serverInstanceAddress", null);
                this.kk = this.Gb.Fh;
                this.Km = this.c.Xn;
                this.gj();
                return !0
            }, Zd: function () {
                if (!d.Ep())return this.Ra("madb", !1, !0), !1;
                this.Ye++;
                n.verifyOk(6 == this.a || 4 == this.a || 1 == this.a) || p.logError(e.resolve(154));
                if (1 == this.a) {
                    if (!this.Fc(4))return !1;
                    this.Es();
                    this.ne()
                }
                this.gj();
                p.logDebug(e.resolve(167),
                    this);
                return !0
            }, Ss: function (a, b, c) {
                this.J = a;
                this.cd || (this.ad = !1, 2 == this.a || 11 == this.a || 1 == this.a ? this.d.ef(this.J, b, c) : 6 == this.a || 4 == this.a ? this.d.xo(this.J, b, c) : (this.cd = !0, this.ig = c, this.uo = b, this.Ti(b)))
            }, lA: function (a) {
                this.J = a;
                this.ad || (n.verifyOk(2 != this.a && 11 != this.a && 1 != this.a) || p.logError(e.resolve(155)), 6 == this.a || 4 == this.a ? this.d.ot(this.J) : (this.ad = !0, this.Ti("slow")))
            }, Es: function () {
                1 != this.a && 11 != this.a || this.tc.Wz();
                this.K && this.je && this.tc.Us()
            }, ne: D(), Ra: function (a, b, c) {
                1 != this.a &&
                (2 != this.a && 11 != this.a) && (this.d.Fj(this.Oc()), b || this.sA(a), this.J = this.d.uz(this.J, c), this.Gb.Z("serverSocketName", null), this.Gb.Z("serverInstanceAddress", null), p.logDebug(e.resolve(168), this, a));
                this.fg(!c)
            }, fg: function (a) {
                this.gj();
                this.reset();
                this.Fc(a ? 11 : 1)
            }, Dv: function (a) {
                if (this.Fc(3 == this.a ? 4 : 6)) {
                    this.gj();
                    var b = a;
                    this.K && (a > this.c.Dd || this.c.Z("pollingMillis", a), b = this.Xw());
                    n.verifyOk(6 == this.a || 4 == this.a) || p.logError(e.resolve(156));
                    4 != this.a && b && 0 < b ? (p.logDebug(e.resolve(169)), this.xd(b)) :
                        this.Cd(this.na)
                }
            }, Cd: function (a, b) {
                if (a == this.na) {
                    var c = "timeout." + this.a + "." + this.Ye;
                    2 == this.a || 3 == this.a || 7 == this.a || 10 == this.a || 11 == this.a ? this.ad || this.cd ? this.d.ef(this.J, c + ".switch", this.ig) : !this.K || this.je ? this.Hb(this.pb, c) : this.d.ef(this.J, c, !1) : 5 == this.a ? (this.ng--, this.ad || this.cd ? this.d.ef(this.J, c + ".switch", this.ig) : 0 < this.ng || this.je ? this.Hb(this.pb, c) : this.K ? this.d.ef(this.J, c + ".switch", this.ig) : this.Uc(this.J, c)) : 6 == this.a ? (this.K && this.tc.QB(b), this.Zd("loop")) : 4 == this.a ? this.Zd("loop1") :
                        8 == this.a ? this.UB() : 9 == this.a ? this.TB() : (p.logError(e.resolve(157), this), n.fail())
                }
            }, fo: function () {
                return this.je || this.d.fo()
            }, Uc: function (a, b) {
                var c = this.fo();
                c && this.Ra("giveup", 1 != this.a && 11 != this.a ? !1 : !0, !0);
                this.d.Uc(a, b, c)
            }, za: function (a, b, c, d) {
                8 == this.a || 10 == this.a || 9 == this.a || 7 == this.a || d ? (this.Ra(a, b, !1), this.Cd(this.na)) : 2 == this.a || 3 == this.a || 5 == this.a ? this.cd && !this.je || k.isProbablyAndroidBrowser() ? this.d.ef(this.J, this.uo + ".error", this.ig) : (this.Ra(a, b, !1), this.xd(this.c.Pn)) : (p.logError(e.resolve(158),
                    a, this), n.fail())
            }, on: function (a) {
                this.aa && this.aa.Lq && this.aa.Lq();
                8 == this.a || 9 == this.a || 10 == this.a || 3 == this.a ? this.cd ? this.d.xo(this.J, this.uo, this.ig) : this.ad ? this.d.ot(this.J) : this.Dv(a) : (p.logError(e.resolve(159), this), n.fail())
            }, S: function () {
                2 == this.a ? this.Fc(3) && this.SB() : 3 != this.a && (7 == this.a || 5 == this.a || 9 == this.a || 10 == this.a || 8 == this.a ? this.Fc(8) && this.VB() : (p.logError(e.resolve(160), this), n.fail()))
            }, Tl: function () {
                d.Dx();
                this.Ge = f.getTimeStamp();
                n.verifyOk(1 == this.a || 11 == this.a) || p.logError(e.resolve(161));
                if (!this.Fc(2))return !1;
                this.xd(this.c.bf);
                this.aa = this.d.Qq()
            }, Fg: function () {
                this.Ge = f.getTimeStamp();
                n.verifyOk(6 == this.a || 4 == this.a) || p.logError(e.resolve(162), this);
                if (!this.Fc(6 == this.a ? 7 : 5))return !1;
                this.xd(this.hw());
                this.aa = this.d.Qq()
            }, xd: function (a) {
                return b.addTimedTask(this.Cd, a, this, [this.na, a])
            }, VB: function () {
                if (0 < this.c.zf) {
                    var a = f.getTimeStamp();
                    50 > a - this.Cr && this.Wm ? b.modifyTaskParam(this.Wm, 0, this.na) : (this.Cr = a, this.Wm = this.xd(this.c.zf))
                }
            }, UB: function () {
                this.Fc(9) && this.xd(this.c.xk)
            },
            TB: function () {
                this.Fc(10) && this.xd(this.c.Fd)
            }, SB: function () {
                n.verifyValue(this.a, 3) || p.logError(e.resolve(163));
                this.xd(this.c.xk)
            }, hw: function () {
                return this.K ? this.c.bf + this.c.ej : 0 < this.ng && null != this.Fd ? this.Fd : this.c.bf
            }, Xw: function () {
                if (4 == this.a)return this.c.Dd;
                var a = this.c.Dd;
                if (this.Ge)var b = f.getTimeStamp() - this.Ge, a = a > b ? a - b : 0;
                return a
            }, Nu: function () {
                this.Ge || (p.logError(e.resolve(164), this), n.fail(), this.Fd = null);
                var a = f.getTimeStamp() - this.Ge, b = this.c.bf;
                this.Fd = (a > b ? b : a) + b
            }, yz: function (a,
                             b) {
                !g.isUnloaded() && this.ha(b) && "" !== a && (null == a ? (d.dk(), this.za("nullresp")) : this.aa.lp(b, a))
            }, wn: function (a, b, c, e) {
                !g.isUnloaded() && this.ha(b) && (d.dk(), this.za("failure." + a, !1, c, e))
            }, vn: function (a) {
                this.ha(a) && (d.dk(), this.za("wrongend"))
            }, uq: function () {
                this.za("eval")
            }, vz: function () {
                this.cd || this.ad || this.d.wz(this.J)
            }, Cz: function () {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(170));
                this.S();
                8 == this.a && (this.ng = 1)
            }, tz: function (a) {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(171), a);
                this.bg = a;
                this.c.Z("maxBandwidth",
                    a)
            }, fz: function () {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(172));
                this.za("error41", !0)
            }, jz: function () {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(173));
                this.S()
            }, nz: function (a, b, c, d, h, k) {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(174));
                var f = this.kk;
                null == b || this.Km || (f = b = l.gv(f, b));
                f != this.Kd && (this.d.Fj(this.Kd), this.Kd = f, this.d.sn(this.Kd));
                d && (this.K ? this.c.Z("idleMillis", d) : this.c.Z("keepaliveMillis", d));
                2 == this.a ? this.pb = a : (n.verifyValue(this.pb, a) || p.logError(e.resolve(165)), this.Nu());
                this.tc.vB(this.K);
                this.S();
                3 == this.a ? (this.d.rc(c), this.Gb.Z("serverSocketName", h), this.Gb.Z("serverInstanceAddress", this.Kd), this.ol && (this.si(), this.ol = !1)) : this.d.ns(c);
                k && this.d.iz(k)
            }, kz: function (a) {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(175));
                this.on(a)
            }, Bz: function () {
                d.dk();
                this.za("syncerror", !0)
            }, as: function (a) {
                q.isDebugLogEnabled() && q.logDebug(e.resolve(176), a);
                this.Ra("end", !0, !0)
            }, yn: function (a, b) {
                this.S();
                this.d.yn(a, b)
            }, Ub: function (a) {
                this.S();
                this.d.Ub(a)
            }, Tb: function (a) {
                this.S();
                this.d.Tb(a)
            }, Bd: function (a) {
                this.S();
                this.d.Bd(a)
            }, pn: function (a, b) {
                this.S();
                this.d.pn(a, b)
            }, rn: function (a, b) {
                this.S();
                this.d.rn(a, b)
            }, qn: function (a, b, c, d) {
                this.S();
                this.d.qn(a, b, d, c)
            }, xe: function (a, b) {
                this.S();
                this.d.xe(a, b)
            }, Nf: function (a, b, c, d) {
                this.S();
                this.d.Nf(a, b, d, c)
            }, Qf: function (a, b, c) {
                this.S();
                this.d.Qf(a, b, c)
            }, Of: function (a, b) {
                this.as(b);
                this.d.Of(a, b)
            }, onUnsubscription: function (a) {
                this.S();
                this.d.onUnsubscription(a)
            }, onSubscription: function (a, b, c, d, e) {
                this.S();
                this.d.onSubscription(a,
                    b, c, d, e)
            }, Pf: function (a, b) {
                this.S();
                this.d.Pf(a, b)
            }, Ti: function (b) {
                p.logDebug(e.resolve(177), this);
                var d = l.Dw(b, this.tc.tm());
                b = new a(b, this, this.Na, this.c);
                this.Q.Dc(this.pb, d, c.Yk, b)
            }, sA: function (a) {
                p.logDebug(e.resolve(178), this);
                a = l.ww(this.pb, a);
                this.Q.Dc(this.pb, a, c.Oe, null, this.Oc())
            }, si: function () {
                1 != this.a && 11 != this.a && (2 == this.a ? this.ol = !0 : 0 >= this.bg && 0 >= this.c.Qc || this.bg != this.c.Qc && this.Q.Dc(null, l.qw(this.c), c.Wk, null))
            }
        };
        return m
    });
    define("lsAJ", [], function () {
        function g() {
            this.Hn = !1;
            this.Rj = 0;
            this.To = !1
        }

        g.prototype = {
            zq: function (f, e) {
                if (!e && !this.ay(f))return null;
                0 == this.Rj && "/*" == f.substring(0, 2) && (this.To = !0);
                var b = -1;
                if (e && !this.To)b = f.length; else {
                    b = f.lastIndexOf(";\n");
                    if (0 > b)return null;
                    b += 2
                }
                var d = f.substring(this.Rj, b);
                0 == this.Rj && this.To && (d = d.substring(2, d.length));
                this.Rj = b;
                return d
            }, po: function (f) {
                return this.zq(f, !1)
            }, oo: function (f) {
                return this.zq(f, !0)
            }, ay: function (f) {
                if (this.Hn)return !0;
                var e = f.indexOf("setPhase("),
                    b = f.indexOf("setPhase(ph)");
                if (-1 < e) {
                    if (-1 >= b)return this.Hn = !0;
                    e = f.indexOf("setPhase(", e + 1);
                    if (-1 < e && f.lastIndexOf(";\n") > e)return this.Hn = !0
                }
                return !1
            }
        };
        return g
    });
    define("lsAN", "lsAI Inheritance Executor BrowserDetection EnvironmentStatus lsAJ Environment LoggerManager lsG lsA".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k() {
            this._callSuperConstructor(k);
            this.k = !1;
            this.Ab = this.W = this.hc = this.t = null;
            this.mo = !1;
            this.P = k
        }

        function m(a) {
            return function () {
                e.executeTask(a)
            }
        }

        var p = c.getLoggerProxy(n.ab), q = a.isBrowser() ? 2 : 3, r;
        a.isNodeJS() && (r = l.Aj("xmlhttprequest").XMLHttpRequest);
        var t = null;
        g.gc(k, {
            va: function () {
                if (null !==
                    t)return t;
                b.isProbablyIE(9, !0) ? t = !1 : "undefined" != typeof XMLHttpRequest ? "undefined" != typeof(new XMLHttpRequest).withCredentials && (t = !0) : !a.isBrowser() && r && (t = !0);
                null === t && (t = !1);
                return t
            }, wf: function () {
                return !b.isProbablyOldOpera() && !b.isProbablyPlaystation()
            }, xa: !0, wa: !0, ec: function () {
                return "file:" != n.rg
            }, fc: !1, ic: !0
        });
        k.prototype = {
            toString: function () {
                return ["[|XSXHRConnection", this.k, this.t, this.hc, "]"].join("|")
            }, $: function () {
                if (this.k) {
                    p.logDebug(c.resolve(179));
                    this.t = null;
                    if (this.W)try {
                        this.W.abort()
                    } catch (a) {
                        p.logDebug(c.resolve(180))
                    }
                    this.Wa()
                }
            },
            ra: function (a, b, d, l, k) {
                if (this.k)return null;
                this.W = r ? new r : new XMLHttpRequest;
                this.Ab = new h;
                d = e.packTask(this.un, this, [b, d, k, l]);
                this.W.onreadystatechange = m(d);
                this.t = b;
                this.hc = null;
                p.logDebug(c.resolve(181), a.Ua());
                try {
                    this.W.open(a.yg, a.Ua(), !0);
                    this.W.withCredentials = a.mv;
                    var f = a.yq;
                    if (f)for (var g in f)this.W.setRequestHeader(g, f[g]);
                    this.W.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    this.W.send(a.getData());
                    this.k = !0
                } catch (n) {
                    return p.logDebug(c.resolve(182), n), !1
                }
                return !0
            },
            un: function (a, b, h, l) {
                this.t != a || d.isUnloaded() || (a = null, this.vf() && b && (3 == this.W.readyState ? a = this.Ab.po(this.W.responseText) : 4 == this.W.readyState && (a = this.Ab.oo(this.W.responseText)), p.isDebugLogEnabled() && p.logDebug(c.resolve(183), a), null != a && e.executeTask(b, [a, this.t])), 4 == this.W.readyState && (this.vf() || (this.mo ? (l && e.executeTask(l, ["status0", this.t, !1, !0]), this.mo = !1) : b && e.executeTask(b, [null, this.t])), p.logDebug(c.resolve(184)), this.Wa(), "" == a && h && e.addTimedTask(this.qh, 100, this, [this.t, h])))
            },
            qh: function (a, b) {
                e.executeTask(b, [a])
            }, Wa: function () {
                this.k = !1;
                this.t = null;
                this.W && (delete this.W.onreadystatechange, delete this.W)
            }, vf: function () {
                try {
                    if (null === this.hc) {
                        if (this.W.readyState < q)return !1;
                        this.hc = 200 <= this.W.status && 299 >= this.W.status;
                        0 == this.W.status && (this.mo = !0)
                    }
                    return this.hc
                } catch (a) {
                    return p.logDebug(c.resolve(185), a), !1
                }
            }
        };
        f(k, g);
        return k
    });
    define("lsAE", "lsAI Inheritance Executor EnvironmentStatus lsAJ LoggerManager lsA".split(" "), function (g, f, e, b, d, h, a) {
        function c() {
            this._callSuperConstructor(c);
            this.k = !1;
            this.pa = this.Ab = this.t = null;
            this.Sj = 0;
            this.P = c
        }

        function l(a) {
            return function () {
                e.executeTask(a)
            }
        }

        var n = h.getLoggerProxy(a.ab), k = null;
        g.gc(c, {
            va: function () {
                return null !== k ? k : k = "undefined" != typeof XDomainRequest ? !0 : !1
            }, wf: !0, xa: !0, wa: !1, ec: !1, fc: !1, ic: !1
        });
        c.prototype = {
            toString: function () {
                return ["[|IEXSXHRConnection",
                    this.k, this.t, "]"].join("|")
            }, $: function () {
                if (this.k) {
                    n.logDebug(h.resolve(186));
                    this.t = null;
                    if (this.pa)try {
                        this.pa.abort()
                    } catch (a) {
                        n.logDebug(h.resolve(187))
                    }
                    this.Wa()
                }
            }, ra: function (a, b, c, k, f) {
                if (this.k)return null;
                this.Sj = 0;
                this.pa = new XDomainRequest;
                this.Ab = new d;
                f = e.packTask(this.nA, this, [b, c, f, k]);
                var g = e.packTask(this.zp, this, [b, k, "xdr.err"]);
                k = e.packTask(this.zp, this, [b, k, "xdr.timeout"]);
                c = e.packTask(this.Gs, this, [b, c, !1]);
                this.pa.onload = l(f);
                this.pa.onerror = l(g);
                this.pa.ontimeout = l(k);
                this.pa.onprogress =
                    l(c);
                this.t = b;
                n.logDebug(h.resolve(188), a.Ua());
                try {
                    this.pa.open(a.yg, a.Ua()), this.pa.send(a.getData()), this.k = !0
                } catch (E) {
                    return n.logDebug(h.resolve(189), E), !1
                }
                return !0
            }, zp: function (a, c, d) {
                this.t != a || b.isUnloaded() || (n.logDebug(h.resolve(190)), e.executeTask(c, [d, a]))
            }, Gs: function (a, c, d) {
                this.t != a || b.isUnloaded() || (this.Sj++, c && (a = d ? this.Ab.oo(String(this.pa.responseText)) : this.Ab.po(String(this.pa.responseText)), n.isDebugLogEnabled() && n.logDebug(h.resolve(191), a), null != a && e.executeTask(c, [a, this.t])))
            },
            nA: function (a, c, d, l) {
                this.t != a || b.isUnloaded() || (0 == this.Sj && -1 < String(this.pa.responseText).indexOf("LS_window.alert('License not valid for this Client version');") ? l && e.executeTask(l, ["license", a, !1, !0]) : this.Gs(a, c, !0), this.Wa(), n.logDebug(h.resolve(192)), d && e.addTimedTask(this.qh, 100, this, [d, a]))
            }, qh: function (a, b) {
                e.executeTask(a, [b])
            }, Wa: function () {
                this.k = !1;
                this.Ab = this.t = null;
                this.Sj = 0;
                this.pa && (this.pa.onload = null, this.pa.onerror = null, this.pa.ontimeout = null, this.pa = this.pa.onprogress = null)
            }
        };
        f(c, g);
        return c
    });
    define("lsAA", ["lsAI", "Inheritance", "Executor"], function (g, f, e) {
        function b() {
            this._callSuperConstructor(b)
        }

        g.gc(b, {va: !1, xa: !1, wa: !1, ec: !1, fc: !1, ic: !1});
        b.prototype = {
            ra: function (b, h, a) {
                a && e.addTimedTask(this.Ad, 1E3, this, [a, h]);
                return !0
            }, Ad: function (b, h) {
                e.executeTask(b, ["", h])
            }
        };
        f(b, g);
        return b
    });
    define("lse", ["lsb", "Inheritance"], function (g, f) {
        function e() {
        }

        e.prototype = {
            vm: V(15), ym: function (b) {
                return b ? encodeURIComponent(b).length - b.length : 0
            }, Qo: function (b) {
                return "LS_querystring\x3d" + encodeURIComponent(b)
            }
        };
        f(e, g);
        return e
    });
    define("lsd", ["lse", "Inheritance"], function (g, f) {
        function e() {
        }

        e.prototype = {toString: V("[LegacyEncoder]"), Yg: V(".html"), Qo: u()};
        f(e, g);
        return e
    });
    define("lsAB", "lsAI lsAA Inheritance IFrameHandler Executor Environment LoggerManager lsd lsA lsG".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k(a) {
            this._callSuperConstructor(k);
            a && (this.target = n.fk(a), b.getFrameWindow(a, !0));
            this.k = !1;
            this.P = k;
            this.lj = 0
        }

        var m = new c, p = a.getLoggerProxy(l.ab);
        g.gc(k, {
            va: function () {
                return h.isBrowserDocument()
            }, xa: !0, wa: !0, ec: !0, fc: !0, ic: !1
        });
        k.prototype = {
            toString: function () {
                return ["[|FormConnection", this.target,
                    "]"].join("|")
            }, $: function () {
                p.logDebug(a.resolve(193));
                this.k = !1;
                this.lj++
            }, ra: function (b, c, e, h) {
                if (this.k)return null;
                this._callSuperMethod(k, this.bi, [b, c, e, h]);
                try {
                    this.lj++;
                    var l = this.bw();
                    if (!l)return !1;
                    p.logDebug(a.resolve(194), b.Ua());
                    l.Lc.method = b.yg;
                    l.Lc.target = this.target;
                    l.Lc.action = b.Ua();
                    l.Uj.value = b.getData();
                    l.Lc.submit();
                    d.addTimedTask(this.qv, 1E3, this, [l.Lc, this.lj]);
                    return this.k = !0
                } catch (f) {
                    return p.logDebug(a.resolve(195), f), !1
                }
            }, bw: function () {
                var a = document.getElementsByTagName("BODY")[0];
                if (!a)return null;
                var b = {};
                b.Lc = document.createElement("FORM");
                try {
                    b.Lc.acceptCharset = "utf-8"
                } catch (c) {
                }
                b.Lc.style.display = "none";
                b.Uj = document.createElement("INPUT");
                b.Uj.type = "hidden";
                b.Uj.name = "LS_querystring";
                b.Lc.appendChild(b.Uj);
                a.appendChild(b.Lc);
                return b
            }, qv: function (a, b) {
                a.parentNode.removeChild(a);
                b == this.lj && (this.k = !1)
            }, le: function () {
                return m
            }
        };
        e(k, f);
        return k
    });
    define("lsAC", "lsAI lsAA lsAH Inheritance IFrameHandler Executor EnvironmentStatus Environment lsAB LoggerManager lsd lsA lsG".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p) {
        function q(a) {
            this._callSuperConstructor(q);
            this.target = p.fk(a);
            this.Ec = 0;
            this.k = !1;
            this.Ui = null;
            d.getFrameWindow(this.target, !0);
            this.P = q
        }

        var r = new k, t = n.getLoggerProxy(m.ab);
        g.gc(q, {
            va: function () {
                return c.isBrowserDocument()
            }, xa: !1, wa: !1, ec: !0, fc: !0, wf: !0,
            ic: !1
        });
        q.prototype = {
            toString: function () {
                return ["[|FrameConnection", this.k, this.target, this.Ec, this.Ui, "]"].join("|")
            }, eu: function (a) {
                a == this.Ec && (this.Ec++, this.k && (this.np(this.Ec, e.lu), this.k = !1))
            }, $: function () {
                t.logDebug(n.resolve(196));
                var a = ++this.Ec;
                h.addTimedTask(this.eu, 0, this, [a])
            }, np: function (b, c, e, h, l) {
                if (b == this.Ec && !a.isUnloading()) {
                    this._callSuperMethod(q, this.bi, [c, e, h, l]);
                    this.Ec++;
                    t.logDebug(n.resolve(197), c.Ua());
                    try {
                        d.getFrameWindow(this.target).location.replace(c.sx()), this.k = !0
                    } catch (k) {
                        return t.logDebug(n.resolve(198), k), !1
                    }
                    return !0
                }
            }, vy: function (a, b, c, d) {
                this.Ui || (this.Ui = new l(this.target));
                this.Ec++;
                if (a = this.Ui.ra(a, b, c, d))this.k = !0;
                return a
            }, ra: function (a, b, c, d) {
                if (a.method == e.$h)return this.vy(a, b, c, d);
                var l = ++this.Ec;
                h.addTimedTask(this.np, 0, this, [l, a, b, c, d]);
                return !0
            }, le: function () {
                return r
            }
        };
        b(q, f);
        return q
    });
    define("lsy", "LoggerManager lsAC lsAH lsG Executor EnvironmentStatus IFrameHandler Global Environment Inheritance Dismissable lsA Helpers".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p) {
        function q(a) {
            this.path = a;
            this.Bg = p.randomG();
            this.status = l.isBrowserDocument() && (window.ActiveXObject || "undefined" != typeof XMLHttpRequest) ? 2 : -1;
            this.ii = ++t;
            this.rd = "LS_AJAXFRAME_" + this.ii;
            this.initTouches();
            this.Fu()
        }

        var r = g.getLoggerProxy(m.ab), t = 0, s = {};
        q.fw = function (a) {
            s[a] || (s[a] =
                new q(a), s[a].ra(!1));
            return s[a]
        };
        q.prototype = {
            toString: function () {
                return ["[|AjaxFrameHandler", this.status, "]"].join("|")
            }, Fu: function () {
                var a = this;
                c.ua(this.ii, "LS_a", function (b) {
                    a.Yy(b)
                }, "A")
            }, clean: function () {
                c.Cl(this.ii, "LS_a", "A");
                var a = this.path;
                s[a] && delete s[a]
            }, da: function (a) {
                this.Bg++;
                this.status = a ? 3 : 0
            }, ra: function (a) {
                if (-1 != this.status && (r.logDebug(g.resolve(199)), !this.wd())) {
                    this.da(a);
                    a = this.Bg;
                    b.tr() && r.logDebug(g.resolve(200));
                    var c = "id\x3d" + this.ii + "\x26";
                    b.Gm() || (c += "domain\x3d" +
                    b.mc() + "\x26");
                    c = new e(this.path, "xhr.html", c);
                    (new f(this.rd)).ra(c);
                    d.addTimedTask(this.Zv, 1E4, this, [a]);
                    d.addTimedTask(this.xx, 2E3, this, [a])
                }
            }, Yy: function () {
                h.isUnloaded() || 1 == this.status || (r.logDebug(g.resolve(201)), this.status = 1)
            }, Zv: function (a) {
                this.Bg != a || this.wd() || (r.logDebug(g.resolve(202)), this.ra(!0))
            }, xx: function (a) {
                this.Bg != a || this.wd() || (r.logDebug(g.resolve(203)), this.status = 4)
            }, disable: function () {
                this.status = -1;
                this.Bg++
            }, wd: function () {
                return 1 === this.status
            }, pr: function () {
                return -1 ===
                    this.status || 3 === this.status || 4 === this.status
            }, xA: function (b, c, d, e) {
                if (this.pr())return !1;
                if (1 !== this.status)return null;
                r.logDebug(g.resolve(204), b);
                var h;
                try {
                    h = !1 !== a.getFrameWindow(this.rd).sendRequest(b, c, d, e)
                } catch (l) {
                    h = !1, r.logDebug(g.resolve(205), l)
                }
                !1 === h && this.disable();
                return h
            }
        };
        n(q, k, !0, !0);
        return q
    });
    define("lsAL", "lsAI Inheritance lsy EnvironmentStatus Executor Environment LoggerManager lsA".split(" "), function (g, f, e, b, d, h, a, c) {
        function l() {
            this._callSuperConstructor(l);
            this.error = this.response = this.hc = this.sender = this.t = null;
            this.k = !1;
            this.a = 0;
            this.LS_x = this.gz;
            this.zd = null;
            this.P = l
        }

        var n = a.getLoggerProxy(c.ab);
        g.gc(l, {
            va: function () {
                return h.isBrowserDocument() && (window.ActiveXObject || "undefined" != typeof XMLHttpRequest)
            }, xa: !1, wa: !1, ec: !0, fc: !1, ic: !0
        });
        l.prototype = {
            toString: function () {
                return ["[|XHRConnection", this.k, this.a, this.t, "]"].join("|")
            }, ra: function (b, c, d, h) {
                this.zd = e.fw(b.cc);
                if (this.zd.pr())return this.zd.dismiss(), !1;
                if (!this.zd.wd() || this.k)return null;
                this.zd.touch();
                this.t = c;
                this.hc = null;
                this.response = d;
                this.error = h;
                this.a++;
                var l = this, f = this.a;
                this.LS_h = function () {
                    l.ms(f)
                };
                this.k = !0;
                n.logDebug(a.resolve(206), b.Ua());
                return this.zd.xA(b.Ua(), b.getData(), this, b.yq)
            }, $: function () {
                if (this.k) {
                    this.Wa();
                    n.logDebug(a.resolve(207));
                    try {
                        this.sender &&
                        this.sender.abort && this.sender.abort()
                    } catch (b) {
                        n.logDebug(a.resolve(208), b)
                    }
                    this.xi()
                }
            }, vf: function () {
                try {
                    if (null === this.hc) {
                        if (2 > this.sender.readyState)return !1;
                        this.hc = 200 <= this.sender.status && 299 >= this.sender.status
                    }
                    return this.hc
                } catch (b) {
                    return n.logDebug(a.resolve(209), b), !1
                }
            }, ms: function (c) {
                b.isUnloaded() || (c != this.a || !this.sender) || 4 != this.sender.readyState && "complete" != this.sender.readyState || (c = null, this.vf() && (c = this.sender.responseText, c = c.toString(), "/*" == c.substring(0, 2) && (c = c.substring(2,
                    c.length - 2))), n.isDebugLogEnabled() && n.logDebug(a.resolve(210), c), this.Wa(), this.response && d.executeTask(this.response, [c, this.t]), this.xi())
            }, gz: function () {
                b.isUnloaded() || (myFrameHandler.disable(), n.logDebug(a.resolve(211)), this.Wa(), this.error && d.executeTask(this.error, ["xhr.unknown", this.t]), this.xi())
            }, xi: function () {
                try {
                    delete this.sender.onreadystatechange
                } catch (b) {
                    n.logDebug(a.resolve(212), b)
                }
                try {
                    delete this.sender
                } catch (c) {
                    n.logDebug(a.resolve(213), c)
                }
                this.response = this.error = null;
                this.zd &&
                this.zd.dismiss()
            }, Wa: function () {
                this.k = !1;
                this.a++
            }
        };
        f(l, g);
        return l
    });
    define("lsAM", "lsAI lsAL Inheritance EnvironmentStatus Executor BrowserDetection lsAJ Environment LoggerManager lsA".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k() {
            this._callSuperConstructor(k);
            this.Ab = null;
            this.P = k
        }

        var m = l.getLoggerProxy(n.ab), p = null;
        g.gc(k, {
            va: function () {
                return null !== p ? p : p = c.isBrowserDocument() ? h.isProbablyIE() ? !1 : "undefined" != typeof XMLHttpRequest ? "undefined" != typeof(new XMLHttpRequest).addEventListener : !1 : !1
            },
            wf: function () {
                return !h.isProbablyOldOpera()
            }, xa: !1, wa: !1, ec: !0, fc: !1, ic: !0
        });
        k.prototype = {
            toString: function () {
                return ["[|XHRStreamingConnection", this.k, this.a, this.t, "]"].join("|")
            }, ra: function (b, c, d, e, h) {
                b = this._callSuperMethod(k, this.bi, [b, c, d, e]);
                m.logDebug(l.resolve(214));
                b && (this.Ab = new a, this.Up = h);
                return b
            }, ms: function (a) {
                !b.isUnloaded() && (a == this.a && this.sender) && (a = null, this.vf() && this.response && (3 == this.sender.readyState ? a = this.Ab.po(this.sender.responseText) : 4 == this.sender.readyState && (a =
                    this.Ab.oo(this.sender.responseText)), m.isDebugLogEnabled() && m.logDebug(l.resolve(215), a), null != a && d.executeTask(this.response, [a, this.t])), 4 == this.sender.readyState && (!this.vf() && this.response && d.executeTask(this.response, [null, this.t]), this.Wa(), this.xi(), m.isDebugLogEnabled() && m.logDebug(l.resolve(216)), "" == a && this.Up && d.addTimedTask(this.qh, 100, this, [this.t])))
            }, qh: function (a) {
                d.executeTask(this.Up, [a])
            }
        };
        e(k, f);
        return k
    });
    define("lsE", ["Executor", "IFrameHandler", "Global", "BrowserDetection", "lsG"], function (g, f, e, b, d) {
        function h(b) {
            this.km = b;
            this.mb = !1;
            this.$m = d.mc();
            this.iq = this.Pi = !1;
            this.wj = -1;
            this.oq = b = d.fk(this.Wq() + "_" + this.$m);
            g.addTimedTask(this.Xu, 3E3, this);
            var h = "about:blank";
            this.zj() && (this.wj = ++a, h = e.ua(this.wj, "EQCallback_" + b, this.vx(), "Q"), h = "javascript:(function(){document.open();" + ("document.domain\x3d'" + d.mc() + "';") + ("parent." + h + "(window);") + "document.close();})()");
            try {
                this.lc = f.getFrameWindow(b,
                    !0, h), this.Ey() ? g.addTimedTask(this.am, 1, this) : this.zj() || this.am()
            } catch (n) {
            }
        }

        var a = 0;
        h.prototype = {
            Vq: V(null), Xh: V(!0), ia: function () {
                g.addTimedTask(f.disposeFrame, 0, f, [this.oq]);
                null !== this.wj && e.Cl(this.wj, "EQCallback_" + this.oq, "Q");
                this.iq = !0
            }, hg: function () {
                return this.Pi || this.iq ? !1 : d.mc() == this.$m ? !0 : this.jn() ? !1 : !0
            }, wd: M("mb"), am: function () {
                var a = this.Vq();
                this.zj() ? this.lc.document.write("\x3cscript\x3edocument.domain\x3d'" + this.$m + "';\x3c/script\x3e") : b.isProbablyOldOpera() && !a || this.lc.document.open();
                a && this.lc.document.write(a);
                this.zj() || b.isProbablyOldOpera() && !a || this.lc.document.close();
                this.mb = this.Xh()
            }, vx: function () {
                var a = this;
                return function (b) {
                    a.lc = b;
                    a.am()
                }
            }, zj: function () {
                return b.isProbablyIE() && !d.Gm()
            }, jn: function () {
                return b.isProbablyIE() || b.isProbablyOldOpera() || b.isProbablyKonqueror(4.4, !0)
            }, Ey: function () {
                return b.isProbablyKonqueror()
            }, gu: function (a, b) {
                this.Pi = !0;
                this.km && (this.km.Ae = [a, b], g.executeTask(this.km))
            }, Xu: function () {
                this.mb || this.gu(5)
            }
        };
        return h
    });
    define("lsAG", "LoggerManager Executor lsE Inheritance Dismissable lsA Helpers".split(" "), function (g, f, e, b, d, h, a) {
        function c(a, b) {
            this.iu = a;
            this._callSuperConstructor(c, [b]);
            this.Mg = null;
            this.initTouches()
        }

        function l(a, b, c) {
            try {
                a.appendChild(b), b.src = c
            } catch (d) {
            }
        }

        var n = g.getLoggerProxy(h.ab);
        c.prototype = {
            toString: V("[JSONPFrame]"), Eu: function (a, b) {
                try {
                    var c = this.rw();
                    if (!c)return c;
                    var d = this.lc.document.createElement("script");
                    d.id = a;
                    d.type = "text/javascript";
                    f.addTimedTask(l, 50,
                        null, [c, d, b])
                } catch (e) {
                    return n.logDebug(g.resolve(217), e), !1
                }
                return !0
            }, uv: function (a) {
                var b = this.lc.document.getElementById(a);
                f.addTimedTask(function () {
                    b && b.parentNode && b.parentNode.removeChild(b)
                }, 4E3)
            }, clean: function () {
                this.ia()
            }, rw: function () {
                if (this.Mg)return this.Mg;
                this.Mg = this.lc.document.getElementsByTagName("BODY")[0];
                if (!this.Mg) {
                    if (this.hf)return 2E3 < a.getTimeStamp() - this.hf ? !1 : null;
                    this.hf = a.getTimeStamp();
                    return null
                }
                return this.Mg
            }, Wq: function () {
                return "LS6__JF_" + this.iu
            }
        };
        b(c, e);
        b(c,
            d, !0, !0);
        return c
    });
    define("lsc", ["lse", "Inheritance"], function (g, f) {
        function e() {
        }

        e.prototype = {toString: V("[JSONPEncoder]")};
        f(e, g);
        return e
    });
    define("lsAF", "lsAI lsAA Inheritance Helpers Environment lsAG Executor LoggerManager lsc lsA".split(" "), function (g, f, e, b, d, h, a, c, l, n) {
        function k(c) {
            this._callSuperConstructor(k);
            this.originalTarget = c;
            this.target = c + b.randomG();
            this.Kb = new h(this.target, a.packTask(this.Qr, this));
            this.Ji = 0;
            this.Qn = "script_" + b.randomG();
            this.hf = null;
            this.wp = !1;
            this.Eq = !0;
            this.P = k
        }

        var m, p;
        for (p in{mk: !0})m = p;
        var q = c.getLoggerProxy(n.ab), r = /(^|&)LS_domain=[^&]*/,
            t = new l;
        g.gc(k, {
            va: function () {
                return d.isBrowserDocument()
            }, xa: !0, wa: !0, ec: !0, fc: !0, ic: !1
        });
        k.prototype = {
            toString: function () {
                return ["[|JSONPConnection", this.target, this.Qn, this.hf, "]"].join("|")
            }, Qr: function () {
                this.wp = !0
            }, mk: function (a, b, c, d, e, h) {
                (this.Eq || 10 == this.Ji) && a.Mi("LS_force_head\x3dtrue\x26");
                this.Eq = !1;
                var l = a.getData(), l = l.replace(r, "");
                0 == l.indexOf("\x26") && (l = l.substring(1));
                a.setData(l);
                return this._callSuperMethod(k, m, [a, b, c, d, e, h])
            }, ra: function (d, e, l, f) {
                this.$();
                if (this.wp)return !1;
                if (!this.Kb.hg() && this.Kb.jn() || 10 == this.Ji)this.Kb.ia(), this.Ji = 0, this.target = this.originalTarget + b.randomG(), this.Kb = new h(this.target, a.packTask(this.Qr, this));
                if (!this.Kb.wd())return null;
                this.Ji++;
                q.logDebug(c.resolve(218), d.Ua());
                var g = d.Ua(), n = d.getData(), g = this.Kb.Eu(this.Qn, g + "?" + n);
                if (!g)return g;
                this.Kb.touch();
                this._callSuperMethod(k, this.bi, [d, e, l, f]);
                return !0
            }, $: function () {
                this.Kb.dismiss();
                if (this.Kb.hg() || !this.Kb.jn()) {
                    q.logDebug(c.resolve(219));
                    try {
                        this.Kb.uv(this.Qn)
                    } catch (a) {
                    }
                }
            },
            le: function () {
                return t
            }
        };
        e(k, f);
        return k
    });
    define("lsz", "LoggerManager lsAN lsAE lsAM lsAL lsAC lsAF lsAB lsAA lsAK lsA".split(" "), function (g, f, e, b, d, h, a, c, l, n, k) {
        function m(a, b, c) {
            this.an = a;
            this.Lu = b;
            this.Bp = c;
            this.Qj = -1
        }

        function p() {
            return !1
        }

        var q = g.getLoggerProxy(k.ab);
        m.vC = function () {
            n.va = p
        };
        m.wC = function () {
            f.va = p;
            e.va = p;
            b.va = p;
            d.va = p
        };
        m.uC = function () {
            c.va = p;
            h.va = p
        };
        m.ip = [];
        k = [f, e, b, h];
        for (var r = 0; r < k.length; r++)k[r].wf() &&
        m.ip.push(k[r]);
        m.Rt = [f, e, d, a, c];
        m.sg = [f, e, d, a, h];
        m.Ux = function (a) {
            return a.P === h
        };
        m.DC = function (a) {
            return a.P.prototype.Ad != l.prototype.Ad
        };
        m.uf = function (a, b, c, d, e, h) {
            q.logDebug(g.resolve(220), a);
            if (!a.va())return q.logDebug(g.resolve(221)), !1;
            if (b && !a.xa())return q.logDebug(g.resolve(222)), !1;
            if (c && !a.ec())return q.logDebug(g.resolve(223)), !1;
            if (d && !a.wa())return q.logDebug(g.resolve(224)), !1;
            if (e && !a.ic())return q.logDebug(g.resolve(225)), !1;
            if (b = h) {
                a:{
                    for (b = 0; b < h.length; b++)if (h[b] == a) {
                        a = !0;
                        break a
                    }
                    a = !1
                }
                b = !a
            }
            if (b)return q.logDebug(g.resolve(226)), !1;
            q.logDebug(g.resolve(227));
            return !0
        };
        m.prototype = {
            Im: function () {
                return this.Qj < this.an.length - 1
            }, $q: function (a, b, c, d) {
                for (q.logDebug(g.resolve(228), a, b, c, d); this.Im();) {
                    this.Qj++;
                    var h = this.an[this.Qj];
                    if (!((this.Bp || this.Lu) && h === e || this.Bp && h === f || !this.uf(h, a, b, c, d)))return h
                }
                return null
            }, uf: function (a, b, c, d, e) {
                return m.uf(a, b, c, d, e, this.an)
            }, Bc: function () {
                q.logDebug(g.resolve(229));
                this.Qj = -1
            }
        };
        return m
    });
    define("lsAD", ["lsAC", "BrowserDetection", "IFrameHandler", "Executor"], function (g, f, e, b) {
        function d() {
            this.yj = !1
        }

        d.prototype = {
            Uz: function (b) {
                (this.yj = b === g) && e.getFrameWindow("LS6__HOURGLASS", !0)
            }, yB: function () {
                b.addTimedTask(this.zB, 900, this)
            }, zB: function () {
                if (this.yj && (this.yj = !1, !f.isProbablyAKhtml() && !f.isProbablyIE(6, !0) && !f.isProbablyIE(9, !1)))try {
                    window.open("about:blank", "LS6__HOURGLASS", null, !0)
                } catch (b) {
                }
            }
        };
        return d
    });
    define("lss", "lsA Inheritance lsr lsz lsAD lsAH lsG lsq Executor LoggerManager BrowserDetection EnvironmentStatus lsAE lsAN".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p, q) {
        function r(a, b, c, d, e, h) {
            this._callSuperConstructor(r, arguments);
            this.We = this.Ge = this.xj = this.kc = this.ta = this.$p = null;
            this.Xf(h)
        }

        function t(a) {
            a && a != y || (y++, C = E)
        }

        var s = {
                Hb: "createSession",
                Zd: "bindSession",
                fg: "shutdown",
                Fg: "bindSent",
                S: "onEvent",
                za: "onErrorEvent"
            },
            s = a.getReverse(s), E = 1, C = 1, y = 1, x = n.getLoggerProxy(g.Ud), w = n.getLoggerProxy(g.Re);
        r.prototype = {
            Xf: function (a) {
                a = a || !this.c.Ai;
                this.$p = new b(b.sg, !1, a);
                this.kc = this.K ? new b(b.sg, !1, a) : new b(b.ip, !this.c.Ro, a);
                this.ta = null
            }, Pq: function () {
                return this.K ? g.Sd : g.qg
            }, Tq: function () {
                return this.K ? g.Sd : g.tg
            }, toString: function () {
                return ["[|SessionHTTP", this.K, this.je, this.a, this.na, this.Na, this.ng, this.pb, this.cd, this.ad, "]"].join("|")
            }, Hb: function (a, b) {
                if (!this._callSuperMethod(r, s.createSession, [a, b]))return !1;
                this.Ul(this.na, b, a);
                return !0
            }, Ul: function (b, c, d) {
                if (b == this.na) {
                    this.d.gq();
                    if (a.tr()) {
                        if (0 >= C) {
                            x.logDebug(n.resolve(231));
                            l.addTimedTask(this.Ul, 3E3, this, [b, d, "offline"]);
                            return
                        }
                        C--;
                        0 == C && l.addTimedTask(t, 2E4, null, [y])
                    }
                    b = this.wq(d, this.Ul, c);
                    null !== b && (b ? this.Tl() : !1 === b && x.logWarn(n.resolve(230)))
                }
            }, Zd: function (a) {
                if (!this._callSuperMethod(r, s.bindSession, [a]))return !1;
                this.We && this.We.$();
                this.Uv();
                this.li(this.na, a);
                return !0
            }, Uv: function () {
                if (!m.isLoaded() && (null === this.c.wk && (k.isProbablyAndroidBrowser() ||
                    k.isProbablyApple()) || !0 === this.c.wk)) {
                    var a = this.Ye, b = this;
                    m.addOnloadHandler(function () {
                        l.addTimedTask(function () {
                            a == b.Ye && b.a == e.Xt && b.Ti("spinfix")
                        }, b.c.jo)
                    })
                }
            }, li: function (a, b) {
                if (a == this.na) {
                    this.xj || this.K || (this.xj = new d);
                    var c = this.wq(null, this.li, b);
                    null !== c && (c ? this.Fg() : !1 !== c || this.K || this.Uc(this.J, "streaming.unavailable"))
                }
            }, ne: function () {
                this.a != e.dl && (this.a != e.Rd && this.a != e.bl) && (0 < this.c.ck && !this.K ? this.Q.uB(this.c.ck) : this.Q.st())
            }, fg: function (a) {
                this._callSuperMethod(r, s.shutdown,
                    [a]);
                this.We && this.We.$()
            }, Ug: function (a, b, d) {
                var l = this.a == e.dl || this.a == e.bl, f = this.Oc(), f = new h(f + g.Zk);
                f.Hh(this.c.Qb());
                f.Jh(this.c.sf());
                var k = !f.wa() && !f.xa();
                a = c.Vw(this.Na, this.pb, this.c, this.Gb, l, this.K, a, b, this.tc.tm(), d, k);
                f.setData(a);
                w.logDebug(n.resolve(232), f);
                return f
            }, wq: function (a, d, f) {
                var k = this.a == e.dl || this.a == e.bl, g = !k, t = this.Ug(a, f, !0);
                this.Q.ll(null);
                this.ta && this.ta.P == p && (this.ta = null);
                var s = k ? this.$p : this.kc;
                this.ta && !s.uf(this.ta.P, t.xa(), this.c.Qb(), t.wa(), this.c.eh()) &&
                (s.Bc(), this.ta = null);
                for (var q = !1, m = (this.K ? "LS6__POLLFRAME" : "LS6__PUSHFRAME") + "_" + this.Jb; (this.ta || s.Im()) && !1 === q;) {
                    if (!this.ta) {
                        q = s.$q(t.xa(), this.c.Qb(), t.wa(), this.c.eh());
                        if (!q)return s.Bc(), !1;
                        this.ta = new q(m)
                    }
                    t.qk(b.Ux(this.ta) && g ? h.bu : h.$h);
                    t.dg(c.br(k, this.K, this.ta.le().Yg()));
                    q = this.ta.mk(t, this.Na, this.vl, this.ul, this.tl, this.Jb);
                    if (null === q)return x.logDebug(n.resolve(233)), l.addTimedTask(d, 50, this, [this.na, f, a]), null;
                    !1 === q ? this.ta = null : (x.logDebug(n.resolve(234)), s.Bc(), this.We =
                        this.ta)
                }
                return q
            }, Fg: function () {
                this._callSuperMethod(r, s.bindSent);
                this.hn() && this.xj.Uz(this.We.P)
            }, hn: function () {
                return !this.K
            }, za: function (a, b, c, d) {
                !d || this.ta.P != q && this.ta.P != p || this.d.az(this.J);
                this._callSuperMethod(r, s.onErrorEvent, [a, b, c, d])
            }, S: function () {
                this.a == e.ap && t();
                !this.hn() || this.a != e.Qt && this.a != e.ap || this.xj.yB();
                this._callSuperMethod(r, s.onEvent)
            }
        };
        f(r, e);
        return r
    });
    define("lsu", "lsA lsr lss Inheritance lsAK lsz lsq Executor LoggerManager ASSERT lsAH lsG".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m) {
        function p(a, b, c, d, e, h) {
            this._callSuperConstructor(p, arguments);
            this.U = null;
            this.Zb = 1;
            this.Rf = null;
            this.nf = !1
        }

        var q = {
            Tl: "createSent",
            Cd: "onTimeout",
            on: "onLoop",
            wn: "onStreamError",
            vn: "onStreamEnd",
            za: "onErrorEvent",
            fg: "shutdown"
        }, q = m.getReverse(q), r = l.getLoggerProxy(g.Ud);
        p.prototype = {
            toString: function () {
                return ["[|SessionWS",
                    this.K, this.je, this.a, this.na, this.Na, this.Zb, this.ng, this.pb, this.U, this.cd, this.ad, "]"].join("|")
            }, ae: G("Zb"), Pq: function () {
                return this.K ? g.xg : g.Zh
            }, Tq: function () {
                return g.tg
            }, Bn: function () {
                n.verifyValue(this.Zb, 1) || r.logError(l.resolve(235));
                this.Rf = this.Na;
                this.U = new d(this);
                var a = this.Oc(), a = new k(a + g.Zk);
                a.Hh(this.c.Qb());
                a.Jh(this.c.sf());
                if (h.uf(d, a.xa(), this.c.Qb(), a.wa(), this.c.eh()) && (r.logDebug(l.resolve(242)), this.U.Hz(a, this.Rf, this.vl, this.ul, this.tl)))return this.Q.ll(this.U), this.ae(2),
                    !0;
                this.ae(5);
                return !1
            }, Tl: function () {
                this._callSuperMethod(p, q.createSent);
                this.c.cm && !this.nf && this.Bn()
            }, li: function (b, e) {
                if (b == this.na)if (this.nf = !1, 1 == this.Zb ? this.Bn() : 2 != this.Zb || this.U.Nx(this.Oc()) || (r.logWarn(l.resolve(240)), this.U.$(), this.ae(1), this.Bn()), 6 == this.Zb)this.Uc(this.J, "ws.early.closed"); else if (5 == this.Zb)this.Uc(this.J, "ws.notgood"); else if (3 == this.Zb)d.Wl(), this.Uc(this.J, "ws.early.openfail"); else {
                    var h = this.Ug(null, e, !1), f = !1;
                    h.dg(a.br(!1, this.K, this.U.le().Yg()));
                    var k =
                        !1;
                    2 == this.Zb ? (f = this.U.mk(h, this.Na, this.vl, this.ul, this.tl, this.Jb), k = !0) : 4 == this.Zb ? f = this.U.zg(h, this.Na) : (n.fail(), r.logError(l.resolve(236), this));
                    null === f ? (r.logDebug(l.resolve(243)), c.addTimedTask(this.li, 50, this, [b, e])) : !1 === f ? (r.logWarn(l.resolve(241)), this.Uc(this.J, "ws.false")) : k || (r.logDebug(l.resolve(244)), this.Fg())
                }
            }, Tv: function (a) {
                this.Rf == a && (r.logDebug(l.resolve(245)), this.Fg(), this.ae(4))
            }, Cd: function (a, b) {
                a == this.na && (this.a == f.Rd && (this.nf = !0), this._callSuperMethod(p, q.onTimeout,
                    [a, b]))
            }, on: function (a) {
                this._callSuperMethod(p, q.onLoop, [a]);
                this.U && this.U.Jt(this.Na)
            }, wn: function (a, b, c, d) {
                c ? b == this.Rf && this._callSuperMethod(p, q.onStreamError, [a, this.Na, c, d]) : (this.a == f.Rd && (this.nf = !0), this._callSuperMethod(p, q.onStreamError, arguments))
            }, vn: function (a, b) {
                b ? a == this.Rf && (this.a == f.Vt || this.a == f.Rd || this.a == f.$o ? this.za("ws.early.end", !1, !0) : (n.verifyDiffValue(this.a, f.bp) || r.logError(l.resolve(237), this), this._callSuperMethod(p, q.onStreamEnd, [this.Na, b]))) : (this.a == f.Rd && (this.nf = !0), this._callSuperMethod(p, q.onStreamEnd, arguments))
            }, za: function (a, b, c, e) {
                c ? (n.verifyDiffValue(this.Zb, 1) || r.logError(l.resolve(238), this), e ? this.ae(3) : this.ae(6), this.a == f.Vt || this.a == f.Rd || this.a == f.$o ? r.logDebug(l.resolve(246), this) : this.a == f.bp ? (r.logDebug(l.resolve(247), this), e && d.Wl(), this.Uc(this.J, "ws.error." + a)) : this.K && this.a == f.Wt ? (n.verifyNotOk(e) || r.logError(l.resolve(239), this), r.logDebug(l.resolve(248), this), this.Ra(a, b, !1), this.Cd(this.na)) : this._callSuperMethod(p, q.onErrorEvent,
                    arguments)) : (this.a == f.Rd && (this.nf = !0), this._callSuperMethod(p, q.onErrorEvent, arguments))
            }, fg: function (a) {
                this._callSuperMethod(p, q.shutdown, [a]);
                this.U && (this.Rf = null, this.U.$(), this.U = null, this.Q.ll(null));
                this.ae(1)
            }, hn: V(!1), ne: function () {
                this.Q.st()
            }
        };
        b(p, e);
        return p
    });
    define("lsm", ["Global", "LoggerManager", "EnvironmentStatus", "ASSERT", "lsA"], function (g, f, e, b, d) {
        function h(a, b) {
            this.IB = b;
            this.Nv(a)
        }

        var a = f.getLoggerProxy(d.Re), c = !1;
        h.rB = function (a) {
            c = a
        };
        h.prototype = {
            $d: function (b) {
                a.logDebug(f.resolve(250), b);
                this.g = b
            }, Nv: function (a) {
                var b = this;
                g.ua(a, "LS_e", function (a, c, d, e, h, l, f, g) {
                    b.qz(a, c, d, e, h, l, f, g)
                });
                g.ua(a, "LS_t", D());
                g.ua(a, "LS_u", function (a, c, d) {
                    b.us(a, c, d)
                });
                g.ua(a, "LS_v", function (a, c) {
                    b.us(a, c, !0)
                });
                g.ua(a, "LS_o", function (a, c) {
                    b.Bd(a, c)
                });
                g.ua(a, "LS_n", function (a, c) {
                    b.Ub(a, c)
                });
                g.ua(a, "LS_s", function (a, c) {
                    b.Tb(a, c)
                });
                g.ua(a, "LS_l", function (a, c, d, e) {
                    b.za(a, c, d, e)
                });
                g.ua(a, "LS_w", function (a, c, d, e, h, l, f) {
                    b.$y(a, c, d, e, h, l, f)
                });
                g.ua(a, "setTimeout", function (a, b) {
                    setTimeout(a, b)
                });
                g.ua(a, "alert", function (a) {
                    "undefined" != typeof alert ? alert(a) : "undefined" != typeof console && console.log(a)
                })
            }, sc: function (b, d, h, g) {
                var p = !c && !e.isUnloaded() && null != this.g;
                p && b && (p &= this.g.ha(b));
                p && d && (p &= this.IB.ha(d));
                p && !g && (p = h ? p & this.g.jy() : p & this.g.ur());
                a.isDebugLogEnabled() &&
                a.logDebug(f.resolve(251), p);
                return p
            }, qz: function (a, b, c, d, e, h, f, g) {
                if (this.sc(b, null, 1 == a, 3 == a || 4 == a))if (1 == a)this.g.nz(c, d, h, e, f, g); else if (2 == a)this.g.kz(c); else if (3 == a)this.g.Bz(); else if (4 == a) {
                    a = 30;
                    if (null != c) {
                        a = c;
                        if (41 == a) {
                            this.g.fz();
                            return
                        }
                        if (0 < a && 30 > a || 39 < a)a = 39
                    }
                    this.za(a, b, null, "The session has been forcibly closed by the Server")
                } else 5 == a ? this.g.tz(c) : this.g.as("Unsupported Server version")
            }, us: function (a, b, c) {
                2 > b.length ? this.sc(a) && this.g.jz() : this.sc(null, a) && this.g.yn(b, c || !1)
            }, Ub: function (a,
                             b) {
                this.sc(null, a) && this.g.Ub(b)
            }, Tb: function (a, b) {
                this.sc(null, a) && this.g.Tb(b)
            }, Bd: function (a, b) {
                this.sc(null, a) && this.g.Bd(b)
            }, lz: function (c, d, e, h) {
                if (this.sc())if (b.verifyValue(e.substring(0, 3), "MSG") || a.logError(f.resolve(249), e), e = e.substr(3), 39 == c)for (c = parseInt(h), d = parseInt(d), c = d - c + 1; c <= d; c++)this.g.xe(e, c); else 38 == c ? this.g.xe(e, d) : 0 >= c ? this.g.qn(e, c, h, d) : this.g.Nf(e, c, h, d)
            }, za: function (a, b, c, d) {
                null != c && isNaN(c) ? this.lz(a, b, c, d) : null != c ? this.sc(null, b) && this.g.Qf(c, a, d) : this.sc(b, null,
                    null, !0) && this.g.Of(a, d)
            }, $y: function (b, c, d, e, h, g, r) {
                if (this.sc(null, 4 == b || 5 == b || 9 == b ? null : c))if (4 == b)this.g.pn(d, c); else if (5 == b)this.g.rn(d, c); else if (8 == b)this.g.onUnsubscription(d); else if (6 == b)this.g.onSubscription(d, e, h, g + 1, r + 1); else 9 == b ? this.g.Pf(d, c) : a.logDebug(f.resolve(252), b)
            }
        };
        return h
    });
    define("lsU", ["lsO"], function (g) {
        function f(e, b, d) {
            this.Nd = b;
            this.Wd = d;
            this.sa = e
        }

        f.prototype = {
            lh: function () {
                var e = this.sa.Nc(this.Nd);
                return e ? e.Rm(this.Nd) : !0
            }, wu: function () {
                return this.sa.by(this.Nd)
            }, Ad: function () {
                if (this.Wd == g.Qd) {
                    var e = this.sa.Nc(this.Nd);
                    e && e.Xr(this.Nd);
                    this.sa.tu(this.Nd)
                } else this.Wd == g.Se && this.sa.hA(this.Nd)
            }, Bj: function () {
                this.sa.Op(this.Nd)
            }
        };
        return f
    });
    define("lsv", ["LoggerManager", "Global", "Helpers", "ASSERT", "lsA"], function (g, f, e, b, d) {
        function h(a, b) {
            this.Zj = 0;
            this.Ma = null;
            this.gh = !1;
            this.c = a;
            this.e = null;
            this.Ju(b)
        }

        var a = g.getLoggerProxy(d.Re), c = g.getLoggerProxy(d.Ud);
        h.prototype = {
            toString: function () {
                return ["[", "lsv", this.Ma, this.Zj, 0.5, 7E3, "]"].join("|")
            }, Vx: function (a) {
                return null != this.Ma && this.Ma > a
            }, $d: G("e"), tm: function () {
                return null != this.Ma && 0 < this.Ma ? Math.round(this.Ma) : null
            }, Us: function () {
                this.Ma = null;
                this.gh = !1
            }, Wz: function () {
                this.gh = !1
            }, QB: function (a) {
                this.Ct(a)
            }, EB: function (c, d) {
                a.logDebug(g.resolve(256));
                this.e && this.e.ha(c) && (b.verifyOk(this.e.ur()) || a.logError(g.resolve(253)), this.e.hy() && (this.Ct(1E3 * d) ? this.c.io && this.e.vz() : this.e.Cz()))
            }, Ju: function (a) {
                var b = this;
                f.ua(a, "LS_s", function (a, c) {
                    b.EB(a, c)
                })
            }, vB: function (a) {
                a || this.Us();
                this.Zj = e.getTimeStamp()
            }, Ct: function (a) {
                var b = e.getTimeStamp();
                if (!this.Zj)return !0;
                a = b - this.Zj - a;
                if (null == this.Ma)return this.Ma = a, c.logDebug(g.resolve(257)), !1;
                if (2E4 < a && a > 2 * this.Ma && (this.gh = !this.gh))return c.logInfo(g.resolve(254)), 7E3 < this.Ma;
                this.Ma = 0.5 * this.Ma + 0.5 * a;
                if (60 > this.Ma)return this.Ma = 0, c.logDebug(g.resolve(258)), !1;
                if (this.Vx(7E3))return c.logInfo(g.resolve(255)), !0;
                c.logDebug(g.resolve(259));
                return !1
            }
        };
        return h
    });
    define("lsP", ["LoggerManager", "lsO", "ASSERT", "lsA"], function (g, f, e, b) {
        function d(a) {
            this.Bb = [];
            this.keys = {};
            this.ki = a;
            this.Ay = 0
        }

        var h = g.getLoggerProxy(b.ug);
        d.prototype = {
            toString: function () {
                return ["[|ControlRequestBatch", this.ki, this.Bb.length, "]"].join("|")
            }, rp: function (a, b) {
                this.keys[a] = b;
                this.Bb.push(a)
            }, Xe: function (a, b) {
                var d = a.Wd;
                if (d == f.Qe || d == f.gd || d == f.Pe) {
                    if (this.ki != d)return h.logError(g.resolve(260), this), e.fail(), !1;
                    this.rp(this.Ay++, a);
                    return !0
                }
                if (this.ki !=
                    f.Qd)return h.logError(g.resolve(261), this), e.fail(), !1;
                var n;
                switch (d) {
                    case f.Wk:
                        n = "C";
                        break;
                    case f.Yk:
                        n = "F";
                        break;
                    case f.Xo:
                        n = "X" + a.getKey();
                        break;
                    default:
                        n = a.getKey()
                }
                var k = this.keys[n];
                h.logDebug(g.resolve(265), this, n, a);
                if (k) {
                    if (d == f.Wk || d == f.Yk) {
                        b || (h.logDebug(g.resolve(266)), this.so(n, a));
                        return
                    }
                    if (d == f.Se) {
                        k.Ee ? (h.logDebug(g.resolve(267)), b || this.so(n, a)) : k.Wd == f.Se ? h.logDebug(g.resolve(268)) : (h.logDebug(g.resolve(269)), e.verifyNotOk(b) || h.logError(g.resolve(262), this), b || this.gA(n));
                        return
                    }
                    if (d ==
                        f.Oe) {
                        for (; k && a.Ee != k.Ee;)h.logDebug(g.resolve(270)), n += "_", k = this.keys[n];
                        if (k) {
                            h.logDebug(g.resolve(271));
                            return
                        }
                    } else {
                        b || (h.logDebug(g.resolve(272)), this.so(n, a));
                        return
                    }
                }
                h.logDebug(g.resolve(273));
                this.rp(n, a)
            }, getLength: function () {
                return this.Bb.length
            }, so: function (a, b) {
                this.keys[a] = b
            }, Nn: function (a) {
                if (this.Bb.length <= a)return h.logError(g.resolve(263)), null;
                var b = this.Bb[a];
                this.Bb.splice(a, 1);
                a = this.keys[b];
                delete this.keys[b];
                return a
            }, gA: function (a) {
                if (!this.keys[a])return h.logError(g.resolve(264)),
                    null;
                for (var b = 0; b < this.Bb.length; b++)if (this.Bb[b] == a)return this.Nn(b)
            }, shift: function () {
                return this.Nn(0)
            }, pop: function () {
                return this.Nn(this.Bb.length - 1)
            }, Af: function () {
                return this.Bm(this.Bb.length - 1)
            }, Ri: function () {
                return this.Bm(0)
            }, Bm: function (a) {
                return 0 >= this.Bb.length ? null : this.keys[this.Bb[a]]
            }, sd: M("ki")
        };
        return d
    });
    define("lsN", "lsO lsP LoggerManager lsAH Executor lsz lsA ASSERT".split(" "), function (g, f, e, b, d, h, a, c) {
        function l() {
            this.a = this.Xc = this.Ic = this.Da = null
        }

        function n(a, b, c, d) {
            this.Jm = this.Fi = this.nj = this.Sl = this.cn = this.Ka = this.kc = null;
            this.Bh = this.Zf = 0;
            this.a = this.status = this.f = 1;
            this.Vh = 0;
            this.o = null;
            this.sa = a;
            this.c = b;
            this.Ta = c;
            this.U = null;
            this.Xf(d);
            this.Bc()
        }

        var k = e.getLoggerProxy(a.ug), m = {1: "IDLE", 2: "STAND BY", 3: "WAITING RESP"};
        n.prototype = {
            toString: function () {
                return ["[|ControlConnectionHandler", m[this.status], this.o, this.Bh, "]"].join("|")
            }, ZA: function (a) {
                this.Bh = a;
                k.logDebug(e.resolve(291), this)
            }, uB: function (a) {
                this.Zf = a;
                k.logInfo(e.resolve(281), this);
                1 == this.status && this.at(this.f)
            }, at: function (a) {
                1 == this.status && (this.f == a && 0 != this.Zf) && (k.logDebug(e.resolve(292), this), this.Dc(null, "", g.Pe))
            }, st: function () {
                k.logInfo(e.resolve(282), this);
                this.Zf = 0
            }, Xf: function (a) {
                this.kc = new h(h.Rt, !1, !this.c.Ai || a);
                this.Ka = null
            }, $: function () {
                k.logDebug(e.resolve(293));
                this.Ka && this.Ka.$()
            }, ga: function (a) {
                this.f++;
                1 == a && 0 < this.Zf && d.addTimedTask(this.at, this.Zf, this, [this.f]);
                this.status = a
            }, Bc: function () {
                k.logDebug(e.resolve(294), this);
                this.Bh = 0;
                this.cn = new f(g.Qe);
                this.Sl = new f(g.Qd);
                this.Jm = new f(g.Pe);
                this.U = null;
                this.Zf = 0;
                this.nj || (this.nj = new f(g.gd));
                this.Fi || (this.Fi = new f(g.Qd));
                this.ak = [this.cn, this.Sl, this.nj, this.Fi, this.Jm];
                this.a++;
                var a = this.o ? this.o.sd() : null;
                null !== a && a !== g.Oe && a !== g.gd ? (c.verifyDiffValue(this.status, 1) || k.logError(e.resolve(274)),
                    this.$(), this.o = null, this.ga(1), this.Sa(!1, "reset1")) : null === a && (c.verifyValue(this.status, 1) || k.logError(e.resolve(275)), c.verifyValue(this.o, null) || k.logError(e.resolve(276)), this.Sa(!1, "reset2"))
            }, ll: function (a) {
                a ? k.logDebug(e.resolve(295), this) : this.U && k.logDebug(e.resolve(296), this);
                this.U = a
            }, Dc: function (a, b, c, e, h) {
                d.addTimedTask(this.ru, 0, this, [this.a, a, b, c, e, h])
            }, yl: function (a, b) {
                return b == g.Oe || b == g.gd ? !0 : this.a === a
            }, tp: function (a, b) {
                a == g.Qe ? this.cn.Xe(b) : a == g.gd ? this.nj.Xe(b) : a == g.Oe ? this.Fi.Xe(b) :
                    a == g.Pe ? this.Jm.Xe(b) : this.Sl.Xe(b)
            }, ru: function (a, b, c, d, h, f) {
                this.yl(a, d) && (k.logInfo(e.resolve(283), this, c), a = new g(c, h, d, b, f), this.tp(d, a), 1 == this.status ? this.Sa(!0, "add") : k.logDebug(e.resolve(297), this))
            }, Sa: function (a, b) {
                !0 === a ? (k.logDebug(e.resolve(298), a, this), this.eq(this.f, b)) : d.addTimedTask(this.eq, !1 === a ? 0 : a, this, [this.f, "async." + b])
            }, eq: function (a, b) {
                if (a == this.f) {
                    for (var c = 0; 1 > c;) {
                        c++;
                        this.ga(2);
                        k.logDebug(e.resolve(299), b, this);
                        var d = null;
                        null != this.o ? (k.logDebug(e.resolve(300)), d = this.Ys(this.o)) :
                            (k.logDebug(e.resolve(301)), d = this.rA());
                        if (1 == d)k.logInfo(e.resolve(284)), this.o = null; else {
                            if (2 == d) {
                                k.logInfo(e.resolve(285));
                                this.Sa(200, "later");
                                return
                            }
                            if (3 == d) {
                                k.logWarn(e.resolve(278));
                                this.o && this.o.nn(!0);
                                this.o = null;
                                this.Sa(!1, "no");
                                return
                            }
                            if (4 == d) {
                                k.logInfo(e.resolve(286));
                                this.ga(3);
                                this.o.nn();
                                this.Sa(4E3, "http");
                                return
                            }
                            if (5 == d)k.logInfo(e.resolve(287)), this.ga(3), this.o.nn(), this.o = null, this.ga(1); else {
                                k.logInfo(e.resolve(288));
                                this.$();
                                this.ga(1);
                                return
                            }
                        }
                    }
                    this.Sa(!1, "limit")
                }
            }, rA: function () {
                for (var a =
                    0; a < this.ak.length;) {
                    this.Vh = this.Vh < this.ak.length - 1 ? this.Vh + 1 : 0;
                    if (0 < this.ak[this.Vh].getLength())return this.Ys(this.ak[this.Vh]);
                    a++
                }
                return null
            }, Ys: function (h) {
                var f;
                var l = this.sa.Oc();
                f = this.c.Qb();
                var g = this.c.sf(), n = h.Ri();
                n ? (l = new b((n.Ee && !0 !== n.Ee ? n.Ee : l) + a.Zk), l.Hh(f), l.Jh(g), f = l) : f = null;
                if (null == f)return k.logDebug(e.resolve(302)), 1;
                k.logDebug(e.resolve(303));
                g = !1;
                if (this.U) {
                    k.logDebug(e.resolve(304));
                    g = this.bq(h, this.U);
                    if (null == g)return k.logDebug(e.resolve(305)), 1;
                    f.dg(g.getFile());
                    f.setData(g.getData());
                    g = this.U.zg(f);
                    if (!1 === g)this.U = null; else return null === g ? 2 : 5
                }
                this.Ka && !this.kc.uf(this.Ka.P, f.xa(), this.c.Qb(), f.wa(), this.c.eh()) && (this.kc.Bc(), this.Ka = null);
                for (; this.Ka || this.kc.Im();) {
                    if (!this.Ka) {
                        g = this.kc.$q(f.xa(), this.c.Qb(), f.wa(), this.c.eh());
                        if (!g)return k.logWarn(e.resolve(279), this.Ka), c.fail(), this.kc.Bc(), 3;
                        this.Ka = new g("LS6__CONTROLFRAME");
                        k.logDebug(e.resolve(306), this.Ka)
                    }
                    g = this.bq(h, this.Ka);
                    if (null == g)return k.logDebug(e.resolve(307)), 1;
                    f.dg(g.getFile());
                    f.setData(g.getData());
                    f.qk(g.yg);
                    this.o.WA(this.f);
                    this.Ka.$();
                    g = this.Ka.ra(f, this.o.a, d.packTask(this.rz, this), d.packTask(this.za, this));
                    if (!1 === g)k.logDebug(e.resolve(308)), this.Ka = null; else {
                        if (null === g)return k.logDebug(e.resolve(309)), 2;
                        this.kc.Bc();
                        return 4
                    }
                }
                !1 !== g && (k.logError(e.resolve(277)), c.fail());
                return 3
            }, bq: function (a, b) {
                var c = b.le();
                if (null == this.o)this.o = new l, this.o.it(c), this.o.fill(a, this.Bh, this.sa.bh(), this.c.Qb(), this.c.sf()); else if (this.o.Fy(c) && (this.o.it(c), c = this.o.bA(this.Bh,
                        this.sa.bh(), this.c.Qb(), this.c.sf())))for (var d = c.sd(); 0 < c.getLength();)this.tp(d, c.shift());
                return this.o.kh() ? this.o = null : this.o.Xc
            }, rz: function (a, b) {
                this.o && b == this.o.a && (k.logInfo(e.resolve(289), b), this.ga(1), this.o = null, this.Sa(!1, "ready4next"))
            }, za: function (a, b) {
                this.o && b == this.o.a && (k.logInfo(e.resolve(290), this, a), this.ga(1), this.o = null, this.Sa(!1, "error"))
            }
        };
        l.prototype = {
            toString: function () {
                return this.Da ? this.Da.toString() : null
            }, sd: function () {
                return this.Da ? this.Da.sd() : null
            }, Ri: function () {
                return this.Da ?
                    this.Da.Ri() : null
            }, getLength: function () {
                return this.Da ? this.Da.getLength() : 0
            }, shift: function () {
                return this.Da ? this.Da.shift() : null
            }, Fy: function (a) {
                return a != this.Ic
            }, it: G("Ic"), fill: function (a, b, c, d, h) {
                if (!(0 >= a.getLength()))if (this.Da = new f(a.sd()), this.Xc = this.Ic.Hx(a, d, h), d = "", h = this.Ic.qq(a, c, !0), null === h)this.Xc = this.Da = null; else {
                    var l = this.Ic.vm(this.Xc.getFile()), g = this.Ic.ym(h) + h.length;
                    0 < b && g + l > b && k.logWarn(e.resolve(280), d);
                    do d += h, this.Da.Xe(a.shift()), l += g, 0 < a.getLength() && (h = this.Ic.qq(a,
                        c)) && (g = this.Ic.ym(h) + h.length); while (h && (0 == b || l + g < b) && 0 < a.getLength());
                    d ? this.Xc.setData(this.Ic.Qo(d)) : this.Xc = null
                }
            }, bA: function (a, b, c, d) {
                var e = this.Da;
                this.Da = null;
                this.fill(e, a, b, c, d);
                return 0 < e.getLength() ? e : null
            }, WA: G("a"), kh: function () {
                return 0 >= this.getLength()
            }, nn: function (a) {
                for (var b = 0, c = null; c = this.Da.Bm(b);)(c = c.Ks) && d.addTimedTask(c.Ad, 0, c, [a]), b++
            }
        };
        return n
    });
    define("lsS", ["Inheritance", "lsW", "lsG"], function (g, f) {
        function e(b, a, c, d, f, g, m) {
            this._callSuperConstructor(e, [a]);
            this.Wn = d;
            this.jb = f;
            this.jk = g;
            this.a = c;
            this.sa = b;
            this.No = m
        }

        var b, d;
        for (d in{Ad: !0})b = d;
        e.prototype = {
            Ad: function (d) {
                this._callSuperMethod(e, b, [d]);
                d || (this.sa.yA(this.jk, this.jb), this.No || this.sa.Ky(this.jk, this.jb))
            }, verifySuccess: function () {
                return this.sa.Wu(this.a) && this.Wn.q[this.jb] && null != this.Wn.q[this.jb].yh ? !1 : !0
            }, ee: function () {
                this.sa.mA(this.jb, this)
            }, Bj: D(),
            Gv: G("No")
        };
        g(e, f);
        return e
    });
    define("lsT", ["lsS", "lsO", "LoggerManager", "lsA"], function (g, f, e, b) {
        function d(a, b, d) {
            this.di = !1;
            this.uj = 0;
            this.Jd = {};
            this.dd = {};
            this.Gt = 0;
            this.Q = a;
            this.r = b;
            this.af = d
        }

        var h = e.getLoggerProxy(b.ug);
        d.prototype = {
            $: function () {
                this.di = !1;
                this.Jd = {};
                this.Gt = 0;
                this.dd = {};
                this.uj++;
                h.logDebug(e.resolve(315))
            }, hl: function () {
                h.logDebug(e.resolve(316));
                if (!this.di) {
                    for (var a in this.Jd) {
                        var b = this.Jd[a], d;
                        for (d in b.q)if (null != b.q[d].yh) {
                            var f = new g(this, this.af,
                                this.uj, b, d);
                            this.Un(d, query, f)
                        }
                    }
                    this.di = !0
                }
            }, zg: function (a, c, d, f) {
                h.logDebug(e.resolve(317));
                var k = this.Jd[c];
                null == k && (k = {Ff: 0, q: {}}, this.Jd[c] = k);
                k.Ff++;
                a = {LS_message: a};
                var m = !1;
                d && (a.LS_outcome = "", m = !0);
                c != b.zc && (a.LS_sequence = encodeURIComponent(c), m = !0);
                f && (a.LS_max_wait = f, m = !0);
                m && (a.LS_ack = "", a.LS_msg_prog = c == b.zc ? this.Kr(k.Ff) : k.Ff);
                f = {};
                f.yh = a;
                f.mh = d;
                k.q[k.Ff] = f;
                this.di && (h.logDebug(e.resolve(318), a), c = new g(this, this.af, this.uj, k, k.Ff, c, m), this.Un(k.Ff, a, c))
            }, Kr: function (a) {
                var b = ++this.Gt;
                this.dd[b] = a;
                return b
            }, Ch: function (a) {
                return this.dd[a] ? this.dd[a] : a
            }, eA: function (a) {
                for (var b in this.dd)if (this.dd[b] == a) {
                    delete this.dd[b];
                    break
                }
            }, Pv: function (a) {
                for (var b in this.dd)if (this.dd[b] == a)return b
            }, Wu: function (a) {
                return a == this.uj
            }, mA: function (a, b) {
                var d = b.Wn.q[a].yh;
                h.logDebug(e.resolve(319), d);
                this.Un(a, d, b)
            }, Un: function (a, b, d) {
                this.Q.Dc(a, b, f.Qe, d)
            }, mu: function (a, c) {
                c = a == b.zc ? this.Ch(c) : c;
                h.logInfo(e.resolve(310), a, c);
                var d = this.Jd[a];
                d.q[c] && (null != d.q[c].yh && (h.logDebug(e.resolve(320)),
                    d.q[c].yh = null), null == d.q[c].mh && (h.logDebug(e.resolve(321)), this.Ue(a, c)))
            }, Ky: function (a, b) {
                h.logDebug(e.resolve(322), a, b);
                this.Ue(a, b)
            }, Ue: function (a, c) {
                h.logDebug(e.resolve(323));
                var d = this.Jd[a];
                d && d.q[c] && (delete d.q[c], a == b.zc && this.eA(c))
            }, vb: function (a, b) {
                var d = this.Jd[a];
                return d && d.q[b] && d.q[b].mh ? d.q[b].mh : null
            }, yA: function (a, b) {
                h.logDebug(e.resolve(324), a, b);
                var d = this.vb(a, b);
                if (d) {
                    var f = this.r.td(d.kb);
                    f && f.ls(d.Ga)
                }
            }, fu: function (a, c) {
                c = a == b.zc ? this.Ch(c) : c;
                h.logInfo(e.resolve(311),
                    a, c);
                var d = this.vb(a, c);
                if (d) {
                    var f = this.r.td(d.kb);
                    f && f.js(d.Ga)
                }
                this.Ue(a, c)
            }, Oy: function (a, c) {
                c = a == b.zc ? this.Ch(c) : c;
                h.logInfo(e.resolve(312), a, c);
                var d = this.vb(a, c);
                if (d) {
                    var f = this.r.td(d.kb);
                    f && f.xe(d.Ga)
                }
                this.Ue(a, c)
            }, Ny: function (a, c, d, f) {
                f = a == b.zc ? this.Ch(f) : f;
                h.logInfo(e.resolve(313), a, f);
                var g = this.vb(a, f);
                if (g) {
                    var m = this.r.td(g.kb);
                    m && m.ks(g.Ga, c, d)
                }
                this.Ue(a, f)
            }, Qy: function (a, c, d, f) {
                f = a == b.zc ? this.Ch(f) : f;
                h.logInfo(e.resolve(314), a, f);
                var g = this.vb(a, f);
                if (g) {
                    var m = this.r.td(g.kb);
                    m &&
                    m.Nf(g.Ga, c, d)
                }
                this.Ue(a, f)
            }
        };
        return d
    });
    define("lsi", ["LoggerManager", "Executor", "Global", "ASSERT", "lsA"], function (g, f, e, b, d) {
        function h(a) {
            this.Ta = a;
            this.ub = [];
            this.ir = !1;
            this.lsc = {};
            this.lsc.LS_window = e["_" + a];
            this.tv = this.aw(this.lsc)
        }

        var a = g.getLoggerProxy(d.ab);
        h.prototype = {
            toString: function () {
                return "[EvalQueue|" + this.ub.length + "]"
            }, aw: function () {
                eval("var lsc \x3d arguments[0]");
                return function (a) {
                    with (lsc)eval(a)
                }
            }, lp: function (b, d) {
                this.hg() && (this.ub.push({Jj: b, sb: d}), a.isDebugLogEnabled() && a.logDebug(g.resolve(326)),
                    f.addTimedTask(this.Ei, 0, this))
            }, $d: G("e"), Ei: function () {
                for (a.isDebugLogEnabled() && a.logDebug(g.resolve(327), this.ub.length); 0 < this.ub.length;) {
                    var c = this.ub.shift();
                    if (this.e && this.e.ha(c.Jj))try {
                        this.tv(c.sb)
                    } catch (d) {
                        this.ir = !0, this.ub = [], b.fail(), a.logError(g.resolve(325), d, c.sb), this.e.uq()
                    } else a.isDebugLogEnabled() && a.logDebug(g.resolve(328), c.Jj, this.e)
                }
            }, hg: function () {
                return !this.ir
            }, ia: D()
        };
        return h
    });
    define("lsh", [], function () {
        function g(f) {
            this.lsc = {};
            this.lsc.LS_window = f;
            this.mb = !1
        }

        g.prototype = {
            wd: M("mb"), tw: M("lsc"), Lv: function (f) {
                eval("var lsc \x3d this.lsc");
                with (lsc)eval(f);
                this.mb = !0
            }
        };
        return g
    });
    define("lsw", "LoggerManager Executor lsE Inheritance Global lsh lsA".split(" "), function (g, f, e, b, d, h, a) {
        function c(a, b) {
            this.Ta = a;
            this._callSuperConstructor(c, [f.packTask(this.gs, this)]);
            this.ub = [];
            this.Ii = b ? b : new h(d["_" + a])
        }

        var l = g.getLoggerProxy(a.ab), n = 0;
        c.prototype = {
            toString: function () {
                return "[WrappedEvalQueue|" + this.ub.length + "]"
            },
            lp: function (a, b) {
                this.hg() && (this.ub.push({
                    Jj: a,
                    sb: b
                }), l.isDebugLogEnabled() && l.logDebug(g.resolve(330)), f.addTimedTask(this.Ei,
                    0, this))
            },
            Lq: function () {
                this.Pi = !0
            },
            $d: G("e"),
            Vq: V("\x3cscript\x3ewindow.evalProxy \x3d function(lsc,_p){with(lsc){eval(_p);}};\x3c/script\x3e"),
            Xh: function () {
                return this.lc.evalProxy ? !0 : !1
            },
            Wq: function () {
                return "LS6__EQ_" + this.Ta + "_" + ++n
            },
            Ei: function () {
                if (this.mb)for (l.isDebugLogEnabled() && l.logDebug(g.resolve(331)); 0 < this.ub.length;) {
                    var a = this.ub.shift();
                    if (this.e && this.e.ha(a.Jj)) {
                        var b = null, c = null;
                        if (!this.Ii.wd() && (-1 < (b = a.sb.indexOf("// END OF HEADER")) || -1 < (c = a.sb.indexOf("myEnv.LS_window \x3d LS_window;")))) {
                            var d;
                            -1 < b ? (d = a.sb.substring(0, b), b = a.sb.substring(b)) : (d = a.sb.substring(0, c + 28), b = a.sb.substring(c + 28));
                            a.sb = b;
                            this.Ii.Lv(d)
                        }
                        try {
                            this.lc.evalProxy(this.Ii.tw(), a.sb)
                        } catch (e) {
                            this.gs(a.sb, e);
                            break
                        }
                    }
                } else f.addTimedTask(this.Ei, 100, this)
            },
            gs: function (a, b) {
                this.Pi = !0;
                this.ub = [];
                l.logError(g.resolve(329), b, a);
                this.e && this.e.uq()
            }
        };
        b(c, e);
        return c
    });
    define("lst", "Executor BrowserDetection ASSERT LoggerManager Helpers lsq lsl lsAK lss lsu EnvironmentStatus Global lsm lsO lsU lsA lsv lsN lsT lsi lsw".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p, q, r, t, s, E, C, y, x) {
        function w(a, b) {
            this.status = z;
            this.f = 0;
            this.Gl = this.e = null;
            this.ke = "";
            this.ze = a;
            this.r = b;
            this.c = a.fa;
            this.Gb = a.qa;
            this.Jb = a.Xg();
            this.tc = new s(this.c, this.Jb);
            this.Lz = new p(this.Jb, b);
            k.addUnloadHandler(this);
            this.Mv();
            this.gf = null;
            this.Q = new E(this, a.fa, this.Jb, !1);
            this.Id = new C(this.Q, this.r, this.c)
        }

        function K(a) {
            switch (a) {
                case z:
                    return "No session";
                case P:
                    return "WS Streaming";
                case J:
                    return "prepare WS Streaming";
                case N:
                    return "WS Polling";
                case H:
                    return "prepare WS Polling";
                case v:
                    return "HTTP Streaming";
                case I:
                    return "prepare HTTP Streaming";
                case A:
                    return "HTTP Polling";
                case F:
                    return "prepare HTTP Polling";
                case R:
                    return "Shutting down"
            }
        }

        var z = 1, P = 2, J = 3, N = 4, H = 5, v = 6, I = 7, A = 8, F = 9, R = 10, L = {};
        L[P] = I;
        L[v] = F;
        L[N] = J;
        L[A] = J;
        L["_" + P] = J;
        L["_" + v] = F;
        L["_" + N] = J;
        L["_" + A] = I;
        var Q = {};
        Q[P] = I;
        Q[v] = F;
        Q[N] = J;
        Q[A] = J;
        Q["_" + P] = J;
        Q["_" + v] = F;
        Q["_" + N] = J;
        Q["_" + A] = F;
        var S = {};
        S[P] = J;
        S[v] = I;
        S[N] = H;
        S[A] = F;
        var U = {};
        U[P] = H;
        U[v] = F;
        U[I] = F;
        U[F] = F;
        var T = {};
        T[J] = !0;
        T[H] = !0;
        T[I] = !0;
        T[F] = !0;
        var B = b.getLoggerProxy(t.Re), O = b.getLoggerProxy(t.Ud);
        w.prototype = {
            Mv: function () {
                var a = this;
                m.ua(this.Jb, "LS_forceReload", function () {
                    a.e && a.e.za("server.exit", !0)
                })
            }, ga: function (a) {
                this.status =
                    a;
                this.f++
            }, Ra: function (a, b, c) {
                this.status != z && this.status != R && this.e && this.e.Ra(a ? "api" : b, !1, c)
            }, jh: function () {
                return this.status != z && this.status != R
            }, Hb: function (b, c, d, e, h, f, g) {
                b && a.da();
                this.gq();
                b = b ? "api" : f;
                this.ke = c ? "_" : "";
                !g && this.jh() ? (c = e ? h ? F : H : h ? I : J, this.ga(c), this.lo(b), this.e.Ss(this.f, b, d)) : (this.Ts(), g = this.e ? this.e.bh() : null, b = "new." + b, this.Ra(!1, b, !1), c = e ? h ? A : N : h ? v : P, this.ga(c), this.Cs(e, d, h), this.e.Hb(g, b))
            }, Cs: function (a, b, c, d) {
                this.e = new (c ? l : n)(a, b, this, this.f, d, null !== this.gf);
                d && d.fg();
                this.tc.$d(this.e);
                this.aa && this.aa.$d(this.e);
                this.Lz.$d(this.e)
            }, Zd: function (a, b, c, d) {
                this.ga(b ? c ? A : N : c ? v : P);
                this.Cs(b, a, c, this.e);
                this.e.Zd(d)
            }, fo: function () {
                return "_" == this.ke && S[this.status] == Q[this.ke + this.status]
            }, Uc: function (a, c, d) {
                a == this.f && (d ? (O.logInfo(b.resolve(337)), this.ga(z)) : (a = Q[this.status] || this.status, O.logInfo(b.resolve(338), K(this.status), K(a)), a == z || a == R ? (O.logError(b.resolve(332)), e.fail()) : (this.ga(a), this.lo(c), this.e.Ss(this.f, c, !1))))
            }, wz: function (a) {
                a == this.f &&
                (a = U[this.status], O.logInfo(b.resolve(339), K(this.status), K(a)), a ? (this.ga(a), this.lo("slow"), this.e.lA(this.f)) : (O.logError(b.resolve(333), K(this.status), this.e), e.fail()))
            }, ef: function (a, c, d) {
                a == this.f && (a = L[this.ke + this.status] || this.status, O.logInfo(b.resolve(340), K(this.status), K(a)), a == z || a == R ? (O.logError(b.resolve(334)), e.fail()) : this.Hb(!1, "_" == this.ke, d, a == J || a == I ? !1 : !0, a == J || a == H ? !1 : !0, c, !0))
            }, xo: function (a, c, d) {
                a == this.f && (a = this.status, O.logInfo(b.resolve(341), K(this.status)), T[a] ? this.Zd(d,
                    a == J || a == I ? !1 : !0, a == J || a == H ? !1 : !0, c) : (O.logError(b.resolve(335)), e.fail()))
            }, ot: function (a) {
                O.logInfo(b.resolve(342));
                this.xo(a, "slow", !1)
            }, DB: function (a, c) {
                if (a == this.f) {
                    var d = this.status;
                    O.logInfo(b.resolve(343), K(this.status));
                    T[d] ? this.Hb(!1, "_" == this.ke, !1, d == J || d == I ? !1 : !0, d == J || d == H ? !1 : !0, "switch.timeout." + c, !0) : (O.logError(b.resolve(336)), e.fail())
                }
            }, lo: function (a) {
                g.addTimedTask(this.DB, this.c.vo + (this.tc.tm() || 0), this, [this.f, a])
            }, Ts: function () {
                this.Q.Bc();
                this.Id.$()
            }, Pl: function () {
                var a =
                    null !== this.gf;
                this.e && this.e.Xf(a);
                this.Q && this.Q.Xf(a)
            }, az: function (a) {
                a == this.f && (this.gf = d.getTimeStamp(), this.Pl())
            }, gq: function () {
                null !== this.gf && 1E3 < d.getTimeStamp() - this.gf && (this.gf = null, this.Pl())
            }, re: function () {
                return this.e ? this.e.k() : null
            }, xm: function () {
                return this.e ? this.e.xm() : t.ac
            }, Oc: function () {
                return this.e ? this.e.Oc() : this.Gb.Fh
            }, bh: function () {
                return this.e ? this.e.bh() : null
            }, Qq: function () {
                if (!this.aa || !this.aa.hg()) {
                    if (f.isProbablyIE(9, !0)) {
                        var a = null;
                        this.aa && (a = this.aa.Ii, this.aa.ia());
                        this.aa = new x(this.Jb, a)
                    } else this.aa = new y(this.Jb);
                    this.aa.$d(this.e)
                }
                return this.aa
            }, ia: function () {
                this.aa && this.aa.ia();
                k.removeUnloadHandler(this)
            }, unloadEvent: function () {
                this.Ra(!1, "unload", !0);
                this.ga(R)
            }, Xg: M("Jb"), wB: function (a) {
                a == this.f && this.ze.Ry()
            }, rc: function (a) {
                O.logInfo(b.resolve(344), this);
                this.ns(a);
                this.Id.hl();
                this.r.rc();
                this.ne()
            }, ns: function (a) {
                O.logDebug(b.resolve(345), this);
                a && this.Q.ZA(a)
            }, uz: function (a, c) {
                if (a != this.f)return null;
                O.logDebug(b.resolve(346), this);
                this.Ts();
                this.ze.Tc();
                c ? this.ga(z) : this.ga(this.status);
                return this.f
            }, yn: function (a, c) {
                var d = this.r.Nc(a[0]);
                d ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(348), a), d.ts(a, c)) : (this.r.nr(a[0]), B.logDebug(b.resolve(347), this))
            }, Bd: function (a) {
                var c = this.r.Nc(a[0]);
                c ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(350), a), c.ps(a[0], a[1], a[2])) : B.logDebug(b.resolve(349), this)
            }, Ub: function (a) {
                var c = this.r.Nc(a[0]);
                c ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(352), a), c.Ub(a[0], a[1])) : B.logDebug(b.resolve(351), this)
            },
            Tb: function (a) {
                var c = this.r.Nc(a[0]);
                c ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(354), a), c.Tb(a[0], a[1])) : B.logDebug(b.resolve(353), this)
            }, Of: function (a, c) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(355), a, c);
                this.r.Ty(a, c)
            }, Qf: function (a, c, d) {
                var e = this.r.Nc(a);
                e ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(357), a, c, d), e.Qf(c, d, a)) : B.logDebug(b.resolve(356), this)
            }, onUnsubscription: function (a) {
                this.r.Op(a);
                var c = this.r.Nc(a);
                c ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(359), a), c.ss(a)) : B.logDebug(b.resolve(358),
                    this)
            }, Pf: function (a, c) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(360), a, c);
                this.r.Pf(a, c)
            }, onSubscription: function (a, c, d, e, h) {
                var f = this.r.Nc(a);
                f ? (B.isDebugLogEnabled() && B.logDebug(b.resolve(362), a, c, d, e, h), f.rs(a, e, h, c, d)) : B.logDebug(b.resolve(361), this)
            }, pn: function (a, c) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(363), a, c);
                this.Id.mu(a, c)
            }, rn: function (a, c) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(364), a, c);
                this.Id.fu(a, c)
            }, qn: function (a, c, d, e) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(365),
                    a, e, c, d);
                this.Id.Ny(a, c, e, d)
            }, xe: function (a, c) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(366), a, c);
                this.Id.Oy(a, c)
            }, Nf: function (a, c, d, e) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(367), a, e, c, d);
                this.Id.Qy(a, c, e, d)
            }, Fj: function (a) {
                this.ze.Fj(a)
            }, sn: function (a) {
                B.isDebugLogEnabled() && B.logDebug(b.resolve(368), a);
                this.ze.sn(a)
            }, iz: function (a) {
                this.Gl && (a != this.Gl && c.Px()) && (c.oA(), this.Hb(!1, "_" == this.ke, !1, !1, !1, "ip", !1));
                this.Gl = a
            }, gk: function (a, b, c, d) {
                this.Id.zg(a, b, c, d)
            }, Hd: function (a, b) {
                var c =
                    h.Kw(this.f, a, b);
                this.Q.Dc(null, c, q.gd, null)
            }, si: function () {
                this.e && this.e.si()
            }, uA: function (a, b, c, d) {
                this.Q.Dc(a, b, q.Qd, new r(c, a, q.Qd), d)
            }, wA: function (a, b, c) {
                this.Q.Dc(a, b, q.Se, new r(c, a, q.Se))
            }, vA: function (a, b, c) {
                this.Q.Dc(a, b, q.Xo, c)
            }, ne: function () {
                this.e && this.e.ne()
            }
        };
        w.prototype.unloadEvent = w.prototype.unloadEvent;
        return w
    });
    define("lsj", "Global lsA LoggerManager lsJ lsK lsL lsn lst lsO Executor lsAY".split(" "), function (g, f, e, b, d, h, a, c, l, n, k) {
        function m(f, l, p, m, y) {
            this.M = new b(l);
            this.M.cg(this, !0);
            this.kf = null;
            f ? this.kf = f : (r.logWarn(e.resolve(369)), this.kf = "default");
            this.qa = new d(m);
            this.qa.cg(this, !0);
            this.fa = new h(p);
            this.fa.cg(this, !0);
            this.Xm = null;
            if (this.M.Om) {
                this.$c = null;
                do this.Ta = "s" + q++; while (g.Ax(this.Ta,
                    "lsEngine"))
            } else this.$c = new k(this.kf, y ? null : n.packTask(this.Li, this)), this.Ta = this.$c.ca();
            this.r = new a(this);
            this.g = new c(this, this.r);
            g.ua(this.Ta, "lsEngine", this);
            g.uu(this);
            this.M.Lg && this.Gi()
        }

        var p = "1640.11";
        isNaN(p) && (p = 0);
        var q = 0, r = e.getLoggerProxy(f.Ud);
        m.prototype = {
            toString: V("[LightstreamerEngine]"), re: function () {
                return this.g.re()
            }, Tc: function () {
                this.r.Tc()
            }, Fj: function (a) {
                this.$c && this.$c.Ms(a)
            }, sn: function (a) {
                this.$c && this.$c.nu(a)
            }, Ze: function (a, b, c) {
                var d = this.r.s, e;
                for (e in d)d[e].$r(a,
                    b, c);
                "maxBandwidth" == b ? this.g.si(c) : "forcedTransport" == b ? this.M.Lg && this.Gi() : "reverseHeartbeatMillis" == b ? this.g.ne() : "corsXHREnabled" != b && "xDomainStreamingEnabled" != b || this.g.Pl();
                return !0
            }, Ry: function () {
                var a = this.wb();
                if (this.Xm != a) {
                    var b = this.Xm;
                    this.Xm = a;
                    this.r.Sy(a, b);
                    if (this.onStatusChange)this.onStatusChange(a)
                }
            }, fb: M("r"), Hd: function (a) {
                this.g.Hd(a, p);
                return !0
            }, Xg: M("Ta"), Li: function () {
                this.g.Ra(!1, "suicide", !0);
                this.g.ia();
                g.Yu(this.Ta);
                g.iA(this);
                this.$c && this.$c.ia();
                this.r.Ur(!0);
                this.r.ia()
            },
            Ww: function () {
                var a = [], b = this.r.s, c;
                for (c in b)if (b[c].jh())try {
                    var d = b[c].ah();
                    a.push(d)
                } catch (e) {
                }
                return a
            }, kq: function () {
                r.logInfo(e.resolve(370));
                this.M.Z("connectionRequested", !1);
                this.g.Ra(!0, "api", !0)
            }, Gi: function () {
                r.logInfo(e.resolve(371));
                this.M.Z("connectionRequested", !0);
                var a = this.fa.qm;
                null === a ? this.g.Hb(!0, !1, !1, !1, !1) : this.Av(a)
            }, Av: function (a) {
                var b = a == f.cl || a == f.Yh;
                this.g.Hb(!0, b, !b, a == f.xg || a == f.Sd, a == f.Sd || a == f.qg || a == f.Yh)
            }, gk: function (a, b, c, d) {
                var e = this.wb();
                if (e == f.ac || e ==
                    f.wg)return !1;
                this.g.gk(a, b, c, d);
                return !0
            }, wb: function () {
                return this.g.xm()
            }
        };
        return m
    });
    define("lsAS", "lsK lsL lsJ lsA lsG lsAf LoggerManager".split(" "), function (g, f, e, b, d, h, a) {
        function c(a) {
            this.b = a
        }

        function l(a) {
            return null == a ? null : a.toString()
        }

        var n = a.getLoggerProxy(b.Qa);
        c.prototype = {
            toString: V("[Client EventBridge]"), Mz: function (b) {
                n.logDebug(a.resolve(372), this);
                this.b.j.tn(parseInt(b.Po), parseInt(b.u), l(b.status), new g(b.qa), new f(b.fa), new e(b.M), parseInt(b.Ta), !0 === b.ob)
            }, iv: function (b) {
                n.logDebug(a.resolve(373), this);
                ("lsK" == b.Wr ? this.b.qa : "lsL" == b.Wr ? this.b.fa : this.b.M).Z(l(b.Yz), b.$B)
            }, zk: function (b) {
                n.logDebug(a.resolve(374), this);
                this.b.j.zk(l(b.status))
            }, nk: function (b) {
                n.logDebug(a.resolve(375), this);
                this.b.j.nk(d.cf(b.a))
            }, Yn: function (b) {
                n.logDebug(a.resolve(376), this);
                this.b.j.et(d.cf(b.a))
            }, Jv: function (b) {
                n.logDebug(a.resolve(377), this);
                this.b.j.ue(!0 === b.CB)
            }, Kv: function () {
                n.logDebug(a.resolve(378), this);
                this.b.j.bn()
            }, lk: function (b) {
                n.logDebug(a.resolve(379), this);
                this.b.lk(parseInt(b.nm),
                    l(b.Rc))
            }, FB: function (b) {
                n.logDebug(a.resolve(380), this);
                this.b.h.Hj(l(b.Ie), parseInt(b.G), parseInt(b.yb), parseInt(b.Cb))
            }, Jk: function (a) {
                var b = h(a.zu, !1);
                this.b.h.Jk(b, a.sB ? !0 : !1)
            }, HB: function (b) {
                n.logDebug(a.resolve(382), this);
                this.b.h.Bd(parseInt(b.G), parseInt(b.item), parseInt(b.yy))
            }, jm: function (b) {
                n.logDebug(a.resolve(383), this);
                this.b.h.Ub(parseInt(b.G), parseInt(b.item))
            }, Fl: function (b) {
                n.logDebug(a.resolve(384), this);
                this.b.h.Tb(parseInt(b.G), parseInt(b.item))
            }, GB: function (b) {
                n.logDebug(a.resolve(385),
                    this);
                this.b.h.tq(parseInt(b.nm), l(b.Rc), parseInt(b.G))
            }, LB: function (b) {
                n.logDebug(a.resolve(386), this);
                this.b.h.vt(parseInt(b.G), parseInt(b.ry), parseInt(b.Mu), parseInt(b.qy), parseInt(b.Vv))
            }, MB: function () {
                n.logDebug(a.resolve(387), this)
            }, su: function (b) {
                n.logDebug(a.resolve(388), this);
                this.b.h.xt(parseInt(b.G))
            }, sj: function (b) {
                n.logDebug(a.resolve(389), this);
                this.b.q.sj(parseInt(b.Ga), parseInt(b.el), l(b.Rc))
            }, oj: function (b) {
                n.logDebug(a.resolve(390), this);
                this.b.q.oj(parseInt(b.Ga))
            }, tj: function (b) {
                n.logDebug(a.resolve(391),
                    this);
                this.b.q.tj(parseInt(b.Ga))
            }, qj: function (b) {
                n.logDebug(a.resolve(392), this);
                this.b.q.qj(parseInt(b.Ga), parseInt(b.el), l(b.Rc))
            }, rj: function (b) {
                n.logDebug(a.resolve(393), this);
                this.b.q.rj(parseInt(b.Ga))
            }
        };
        return c
    });
    define("EventDispatcher", ["Executor", "List", "Inheritance"], function (g, f, e) {
        function b() {
            this._callSuperConstructor(b)
        }

        function d() {
            this.initDispatcher()
        }

        d.prototype = {
            initDispatcher: function () {
                this.Gk = new b;
                this.yt = !1
            }, addListener: function (b) {
                b && (b = {d: b, Ir: !0}, this.Gk.add(b), this.Xl("onListenStart", [this], b, !0))
            }, removeListener: function (b) {
                b && (b = this.Gk.remove(b)) && this.Xl("onListenEnd", [this], b, !0)
            }, getListeners: function () {
                return this.Gk.asArray()
            }, useSynchEvents: function (b) {
                this.yt = !0 === b
            }, Xl: function (b,
                             a, c, d) {
                this.yt ? this.hq(b, a, c, !0) : g.addTimedTask(this.hq, 0, this, [b, a, c, d])
            }, hq: function (b, a, c, d) {
                if (c && c.d[b] && (d || c.Ir))try {
                    a ? c.d[b].apply(c.d, a) : c.d[b].apply(c.d)
                } catch (e) {
                }
            }, dispatchEvent: function (b, a) {
                var c = this;
                this.Gk.forEach(function (d) {
                    c.Xl(b, a, d, !1)
                })
            }
        };
        d.prototype.initDispatcher = d.prototype.initDispatcher;
        d.prototype.addListener = d.prototype.addListener;
        d.prototype.removeListener = d.prototype.removeListener;
        d.prototype.getListeners = d.prototype.getListeners;
        d.prototype.useSynchEvents = d.prototype.useSynchEvents;
        d.prototype.dispatchEvent = d.prototype.dispatchEvent;
        b.prototype = {
            remove: function (b) {
                for (var a = 0; a < this.data.length; a++)if (this.data[a].d == b)return b = this.data[a], b.Ir = !1, this.data.splice(a, 1), b;
                return !1
            }, asArray: function () {
                var b = [];
                this.forEach(function (a) {
                    b.push(a.d)
                });
                return b
            }
        };
        e(b, f);
        return d
    });
    define("lsAP", "Executor lsA LoggerManager Inheritance Setter Environment IllegalStateException IllegalArgumentException Helpers".split(" "), function (g, f, e, b, d, h, a, c, l) {
        function n() {
            this.Hc = 5E3;
            this.Zl = !1;
            this.R = this.eo = this.eg = this.Wb = this.T = this.Uf = null
        }

        var k = /^[a-zA-Z0-9]*$/, m = {ATTACH: !0, "ATTACH:FAST": !0, IGNORE: !0, ABORT: !0}, p = {
            CREATE: !0,
            ABORT: !0,
            WAIT: !0
        }, q = {ATTACH: !0, "ATTACH:FAST": !0}, r = e.getLoggerProxy(f.Qa);
        n.prototype = {
            YA: G("R"), BA: function (a) {
                this.Hc = this.checkPositiveNumber(a);
                this.R.Pu(this.Hc)
            }, pv: function () {
                this.dm("default" + l.randomG(), "IGNORE", "CREATE", !0, null)
            }, dm: function (a, b, d, g, l) {
                if (!a)throw new c("The share name is missing");
                if (!k.test(a))throw new c("The given share name is not valid, use only alphanumeric characters");
                if (!p[d])throw new c("sharePolicyOnNotFound must be one of: CREATE, ABORT, WAIT");
                if (!m[b])throw new c("sharePolicyOnFound must be one of: ATTACH, ATTACH:FAST, IGNORE, ABORT");
                if (!h.isBrowserDocument()) {
                    if (q[b])throw new c("ATTACH* can only be used if the LightstreamerClient is loaded inside a browser document");
                    g || (g = !0)
                }
                "file:" != f.rg || g || (r.logWarn(e.resolve(394)), g = !0);
                this.R.zr() || (this.Zl = !0, this.R.Bv(), this.Zl = !1);
                this.Uf = this.checkBool(g, !0);
                this.T = a;
                this.Wb = b;
                this.eg = d;
                this.eo = l;
                "IGNORE" == this.Wb && "CREATE" == this.eg ? (r.logInfo(e.resolve(395)), this.R.jq(this.T, this.Uf)) : "IGNORE" != this.Wb && "ABORT" != this.Wb || "ABORT" != this.eg ? (r.logInfo(e.resolve(397)), this.R.mq(this.T, "ATTACH:FAST" == this.Wb, this.Uf, this.Hc, this.eo)) : (r.logInfo(e.resolve(396)), this.R.$l())
            }, sr: function () {
                return this.R.Wx()
            }, hx: M("T"),
            ix: function () {
                return this.R.iw()
            }, Hu: function () {
                return "IGNORE" == this.Wb
            }, fs: function (a, b, c) {
                "ABORT" == this.Wb ? (r.logInfo(e.resolve(398)), this.R.$l()) : "IGNORE" != this.Wb ? (r.logInfo(e.resolve(399)), this.R.xv(b, c)) : r.logInfo(e.resolve(400))
            }, cC: function (a) {
                this.R.yl(a) && this.R.mq(this.T, "ATTACH:FAST" == this.Wb, this.Uf, this.Hc, this.eo)
            }, Ej: function (a, b) {
                "CREATE" == this.eg ? (r.logInfo(e.resolve(401)), this.R.jq(this.T, b || this.Uf)) : "WAIT" == this.eg ? (r.logInfo(e.resolve(402), 1E3), g.addTimedTask(this.cC, 1E3, this,
                    [a])) : (r.logInfo(e.resolve(403)), this.R.$l())
            }, cz: function () {
                this.Zl || (r.logInfo(e.resolve(404)), this.dm(this.T, this.Wb, -1 < this.Wb.indexOf("ATTACH") ? "CREATE" : this.eg, this.Uf, null))
            }
        };
        n.prototype.setCheckShareTimeout = n.prototype.BA;
        n.prototype.enableSharing = n.prototype.dm;
        n.prototype.isMaster = n.prototype.sr;
        n.prototype.getShareName = n.prototype.hx;
        n.prototype.getSharedClients = n.prototype.ix;
        b(n, d, !0, !0);
        return n
    });
    define("LightstreamerClient", "Helpers Global lsAR Executor CookieManager lsAY lsJ lsL lsK lsAV lsAT lsAU lsAe lsD lsj lsAS Inheritance Setter EventDispatcher lsA EnvironmentStatus IllegalArgumentException Environment LoggerManager lsAP IllegalStateException ASSERT lsm".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p, q, r, t, s, E, C, y, x,
                                                                                                                                                                                                                                                                                                         w, K, z, P, J, N, H) {
        function v(b, d) {
            this._callSuperConstructor(v);
            this.Hk = ++R;
            this.Jf = this.Ck = this.Wc = this.nb = this.j = null;
            this.q = new m;
            this.ka = 0;
            this.f = 1;
            this.se = y.ac;
            this.Vp = new c;
            this.Nl = new l;
            this.Ol = new P;
            this.connectionOptions = this.Vp;
            this.connectionDetails = this.Nl;
            this.connectionSharing = this.Ol;
            this.M = new a;
            this.fa = this.Vp;
            this.qa = this.Nl;
            this.dc = this.Ol;
            b && this.qa.lt(b);
            d && this.qa.ft(d);
            this.M.cg(this);
            this.fa.cg(this);
            this.qa.cg(this);
            this.dc.YA(this);
            this.h = new p(this.fa);
            this.dn = 2E3;
            this.Hc =
                null;
            "undefined" != typeof console && K.isBrowser() && F.logWarn(z.resolve(405))
        }

        function I(a, b) {
            var c = h.Am();
            c.Dl(b, a);
            c.Ah(b, a)
        }

        var A = z.getLoggerProxy(y.Qa), F = z.getLoggerProxy(y.Uk), R = 0, L = /^[a-zA-Z0-9_]*$/;
        v.setLoggerProvider = function (a) {
            z.setLoggerProvider(a)
        };
        v.LIB_NAME = "JAVASCRIPT";
        v.LIB_VERSION = "6.1.4 build 1640.11";
        v.simulateSilence = function (a) {
            H.rB(a)
        };
        v.prototype = {
            toString: function () {
                return ["[|LightstreamerClient", this.Hk, this.f, this.ka, "]"].join("|")
            }, Ze: function (a, b, c) {
                this.j && this.j.Zs(a, b,
                    c);
                return !0
            }, Vr: function (a, b) {
                b != this.M && this.dispatchEvent("onPropertyChange", [a])
            }, jq: function (a, b) {
                A.logInfo(z.resolve(406), a, b);
                this.nd(9);
                this.M.Z("isLocalEngine", b);
                var c = new r(a, this.M, this.fa, this.qa, this.dc.Hu()), c = new k(this, c);
                this.kl(c);
                c.bound(!0)
            }, $l: function () {
                this.nd(7);
                A.logInfo(z.resolve(407));
                this.dispatchEvent("onShareAbort")
            }, Bv: function () {
                if (1 != this.f) {
                    var a = this.f;
                    this.nd(1);
                    this.j && (5 == a ? (A.logInfo(z.resolve(408)), this.j.sy()) : (A.logInfo(z.resolve(409)), this.j.mn(), this.j.ue()))
                }
            },
            yl: function (a) {
                return this.ka == a
            }, mq: function (a, b, c, d, e) {
                this.nd(2);
                c || this.Xz(a, e);
                this.nb && (this.nb.Hv(b), this.nb.ht(d));
                A.logDebug(z.resolve(418));
                (b = f.gx(a)) ? this.dc.fs(this.ka, b, !0) : this.vp(this.ka, a) ? this.dc.Ej(this.ka) : c ? this.dc.Ej(this.ka) : this.Sn(this.ka, e)
            }, xv: function (a, b) {
                if (b) {
                    A.logInfo(z.resolve(410));
                    var c = new k(this, a);
                    this.nd(8);
                    this.kl(c);
                    c.bound(!1)
                } else A.logInfo(z.resolve(411)), this.nd(3), this.kl(this.Wc)
            }, Sn: function (a, c, d) {
                if (this.ka == a) {
                    A.logDebug(z.resolve(419));
                    d = this.kt((d ||
                    100) + 50);
                    this.Jf = null;
                    this.Wc.da(!0);
                    var e = b.packTask(this.ee, this, [a]);
                    this.nb.qA(c, e, a) ? (e = b.packTask(this.Ly, this, [a + 1, c]), this.Wc.dz(this.nb, e) ? (A.logDebug(z.resolve(422)), this.dc.fs(this.ka, c, !1)) : (A.logDebug(z.resolve(421), d), b.addTimedTask(this.Sn, d, this, [a, c, d]))) : (A.logDebug(z.resolve(420), d), b.addTimedTask(this.Sn, d, this, [a, c, d]))
                }
            }, ee: function (a) {
                this.ka == a && this.dc.Ej(this.ka, !0)
            }, Ly: function (a) {
                this.ka == a && 3 == this.f && (A.logDebug(z.resolve(423)), this.Wc.da(!0), this.ka == a && this.sq(!1))
            },
            Pu: function (a) {
                this.nb && this.nb.ht(a)
            }, vp: function (a, c, e) {
                if (a != this.ka || !d.areCookiesEnabled())return !0;
                var h = this.iy(c, e);
                if (!0 !== h && !1 !== h)return b.addTimedTask(this.vp, h.hi, this, [a, c, h]), !1;
                if (e) {
                    if (h)return !1;
                    this.dc.Ej(this.ka)
                }
                return !0
            }, iy: function (a, b) {
                var c = {hi: 0}, d = !1, e = g.getTimeStamp(), f = h.Am(), l = f.Xj(a);
                if (!l)return A.logDebug(z.resolve(424)), !1;
                A.logDebug(z.resolve(425), this);
                for (var k = 0; k < l.length; k++) {
                    var n = f.Wf(a, l[k]);
                    if (!n || 5 > n.length)I(l[k], a); else if (b && b[l[k]]) {
                        if (n[y.yc] != b[l[k]])return A.logInfo(z.resolve(412)),
                            !0;
                        A.logInfo(z.resolve(413))
                    } else {
                        var p = Number(n[y.yc]) + y.Td + 2E3 - e;
                        -6E4 >= p ? (A.logInfo(z.resolve(414)), I(l[k], a)) : (p < this.dn && (p = this.dn), c[l[k]] = n[y.yc], d = !0, c.hi = c.hi > p ? c.hi : p)
                    }
                }
                if (d)return A.logInfo(z.resolve(415)), c;
                A.logInfo(z.resolve(416));
                return !1
            }, zr: function () {
                return 1 == this.f
            }, Sx: function () {
                return 7 == this.f
            }, nd: function (a) {
                a == this.f ? N.verifyOk(2 == a || 1 == a) : (1 == this.f && 7 != a && f.ua(this.Hk, "lsPage", this, "P"), 7 != a && 6 != a && 5 != a && 1 != a && 8 != a || this.wv(), 1 == a && f.Cl(this.Hk, "lsPage", "P"), this.f = a, this.ka++)
            },
            Wx: function () {
                return 5 == this.f ? !0 : 4 == this.f ? !1 : null
            }, Xz: function (a, c) {
                if (!this.nb) {
                    var d = b.packTask(this.kt, this);
                    this.nb = new e(c || null, a, !0, d, this.Hc);
                    this.Wc = new n(this, this.Hk);
                    this.Ck = new q(this.Wc, new t(this), !1);
                    this.nb.XB(b.packTask(this.ee, this, [this.ka]))
                }
            }, wv: function () {
                this.nb && (this.nb.Ku(), this.nb = null, this.Wc && (this.Wc.ia(), this.Wc = null), q.remove(this.Ck), this.Ck = null)
            }, kt: function (a) {
                2500 < a ? a = 2500 : 50 > a && (a = 50);
                return this.Jf = this.Jf && this.Jf < a ? this.Jf : a
            }, kl: function (a) {
                this.j && this.j !=
                a && this.j.ia();
                this.j = a;
                this.h.wo(a);
                this.q.wo(a)
            }, cs: function (a, b, c, d, e) {
                A.logDebug(z.resolve(426));
                this.nd(b ? 5 : 4);
                b || (this.fa.zi(d), this.M.zi(e), this.qa.zi(c))
            }, sq: function (a) {
                this.dn = a ? 1E4 : 2E3;
                A.logInfo(z.resolve(417));
                this.M.Lg ? this.Gg(y.wg) : this.Gg(y.ac);
                this.j.ia();
                this.j = null;
                x.isUnloading() || x.isUnloaded() ? this.nd(1) : (N.verifyOk(5 != this.f || a), this.dc.cz(this.ka))
            }, iw: function () {
                if (5 == this.f || 4 == this.f)try {
                    return this.j.qf().Ww()
                } catch (a) {
                    this.j && this.j.wi && b.addTimedTask(this.j.wi, 0, this.j)
                }
                return []
            },
            jv: function () {
                if (!this.qa.Fh)throw new J("Configure the server address before trying to connect");
                this.zr() && this.dc.pv();
                if (this.Sx())throw new J("Cannot connect in the current status, reconfigure sharing policies.");
                F.logDebug(z.resolve(427));
                b.addTimedTask(this.Cu, 0, this)
            }, Cu: function () {
                if (!this.se || this.se != y.CONNECTING && this.se != y.Te && 0 != this.se.indexOf(y.Fb)) {
                    F.logDebug(z.resolve(428));
                    this.M.Z("connectionRequested", !0);
                    var a = this.j;
                    a && a.qi()
                }
            }, disconnect: function () {
                F.logDebug(z.resolve(429));
                b.addTimedTask(this.Du, 0, this)
            }, Du: function () {
                F.logDebug(z.resolve(430));
                this.M.Z("connectionRequested", !1);
                var a = this.j;
                a && a.ri()
            }, wb: M("se"), sendMessage: function (a, c, d, e) {
                if (!c)c = y.zc; else if (!L.test(c))throw new w("The given sequence name is not valid, use only alphanumeric characters plus underscore, or null");
                d = d ? this.checkPositiveNumber(d) : null;
                b.addTimedTask(this.Bu, 0, this, [a, c, e, d])
            }, Bu: function (a, b, c, d) {
                c && (c = this.q.Nw(a, c));
                5 != this.f && 4 != this.f || !this.j.ob ? c && this.q.Lr(c.Ga) : this.j.Kq(a,
                    b, c, d)
            }, lk: function (a, b) {
                this.dispatchEvent("onServerError", [a, b])
            }, Yn: function () {
                this.h.Qz();
                this.q.av()
            }, Gg: function (a) {
                a != this.se && (this.se = a, this.dispatchEvent("onStatusChange", [a]))
            }, Hd: function (a) {
                return 5 != this.f && 4 != this.f || !this.j.ob ? !1 : (this.j.Jq(a), !0)
            }, lx: function () {
                var a = [], b = this.h.uc, c;
                for (c in b)b[c].tt || a.push(b[c]);
                return a
            }, ro: function (a) {
                this.h.gi(a)
            }, Ht: function (a) {
                this.h.$j(a)
            }, addListener: function (a) {
                this._callSuperMethod(v, "addListener", [a])
            }, removeListener: function (a) {
                this._callSuperMethod(v,
                    "removeListener", [a])
            }, getListeners: function () {
                return this._callSuperMethod(v, "getListeners")
            }
        };
        v.setLoggerProvider = v.setLoggerProvider;
        v.prototype.connect = v.prototype.jv;
        v.prototype.disconnect = v.prototype.disconnect;
        v.prototype.getStatus = v.prototype.wb;
        v.prototype.sendMessage = v.prototype.sendMessage;
        v.prototype.getSubscriptions = v.prototype.lx;
        v.prototype.subscribe = v.prototype.ro;
        v.prototype.unsubscribe = v.prototype.Ht;
        v.prototype.addListener = v.prototype.addListener;
        v.prototype.removeListener = v.prototype.removeListener;
        v.prototype.getListeners = v.prototype.getListeners;
        s(v, C, !1, !0);
        s(v, E, !0, !0);
        return v
    });
    define("lsAc", ["lsA", "ASSERT"], function (g, f) {
        function e(b, d, e) {
            this.Lj = b;
            this.Ar = d;
            this.Js = e
        }

        e.prototype = {
            onItemUpdate: function (b) {
                if (this.pB())return f.verifyValue(b.Wi(), 1), b = b.Pd, this.Lj.cB(b.length - 2), b = this.lv(b), this.Lj.update(b, !1, !0)
            }, pB: function () {
                return this.Lj.Bx(this.Ar, this.Js)
            }, lv: function (b) {
                var d = this.Lj, e = this.Ar, a = [];
                a[0] = d.Je;
                a[1] = e;
                a.Gc = [];
                for (var e = d.Xq() + 2, c = 2, f = 2; f < e; f++)f == d.keyCode + 1 ? a[f] = this.Js : f == d.eb + 1 ? a[f] = "UPDATE" : f <= d.ja.xb + 1 ? a[f] = g.vg :
                    (a[f] = b[c], b.Go[c] ? a[f] = g.vg : a.Gc.push(f - 1), c++);
                return a
            }
        };
        return e
    });
    define("lsAb", ["LoggerManager", "IllegalArgumentException", "lsA"], function (g, f, e) {
        function b(b, a, c, d, e) {
            this.py = a;
            this.oy = b;
            this.hu = d;
            this.ja = c;
            this.Pd = e
        }

        var d = g.getLoggerProxy(e.Uk);
        b.prototype = {
            zm: M("oy"), Wi: M("py"), getValue: function (b) {
                b = this.Th(b);
                return (b = this.Pd[b]) && b.AC ? b.value : b
            }, yr: function (b) {
                b = this.Th(b);
                return !this.Pd.Go[b]
            }, fy: M("hu"), forEachChangedField: function (b) {
                for (var a = this.Pd.Gc, c = 0; c < a.length; c++) {
                    var e = this.ja.getName(a[c]), f = this.Pd[a[c] + 1];
                    try {
                        b(e, a[c], f)
                    } catch (k) {
                        d.logErrorExc(k,
                            g.resolve(431))
                    }
                }
            }, Hq: function (b) {
                for (var a = 2; a < this.Pd.length; a++) {
                    var c = a - 1, e = this.ja.getName(c), f = this.Pd[a];
                    try {
                        b(e, c, f)
                    } catch (k) {
                        d.logErrorExc(k, g.resolve(432))
                    }
                }
            }, Th: function (b) {
                b = isNaN(b) ? this.ja.me(b) : b;
                if (null == b)throw new f("the specified field does not exist");
                if (0 >= b || b > this.ja.wm() + 1)throw new f("the specified field position is out of bounds");
                return b + 1
            }, Sw: function () {
                return this.Pd.length - 2
            }, yw: function (b) {
                return this.ja.getName(b)
            }
        };
        b.prototype.getItemName = b.prototype.zm;
        b.prototype.getItemPos =
            b.prototype.Wi;
        b.prototype.getValue = b.prototype.getValue;
        b.prototype.isValueChanged = b.prototype.yr;
        b.prototype.isSnapshot = b.prototype.fy;
        b.prototype.forEachChangedField = b.prototype.forEachChangedField;
        b.prototype.forEachField = b.prototype.Hq;
        return b
    });
    define("lsX", [], function () {
        function g() {
            this.Xb = null;
            this.xb = 0
        }

        g.prototype = {
            mt: G("Xb"), wm: function () {
                return this.Xb ? this.xb + this.Xb.xb : this.xb
            }, Ld: G("xb")
        };
        return g
    });
    define("lsY", ["Inheritance", "lsX"], function (g, f) {
        function e(b) {
            this._callSuperConstructor(e);
            this.list = b;
            for (var d = {}, h = 0; h < b.length; h++)d[b[h]] = h + 1;
            this.Vs = d;
            this.xb = b.length
        }

        e.prototype = {
            Ld: D(), rm: function () {
                return this.list.join(" ")
            }, me: function (b) {
                return this.Vs[b] ? this.Vs[b] : this.Xb ? (b = this.Xb.me(b), null !== b ? b + this.xb : null) : null
            }, getName: function (b) {
                return b > this.xb && this.Xb ? this.Xb.getName(b - this.xb) : this.list[b - 1] || null
            }, Mc: M("list")
        };
        g(e, f);
        return e
    });
    define("lsZ", ["Inheritance", "lsX"], function (g, f) {
        function e(b) {
            this._callSuperConstructor(e);
            this.name = b
        }

        e.prototype = {
            rm: M("name"), me: function (b) {
                return this.Xb ? (b = this.Xb.me(b), null !== b ? b + this.xb : null) : null
            }, getName: function (b) {
                return this.Xb ? this.Xb.getName(b - this.xb) : null
            }, Mc: M("name")
        };
        g(e, f);
        return e
    });
    define("Matrix", [], function () {
        function g(f) {
            this.ya = f || {}
        }

        g.prototype = {
            insert: function (f, e, b) {
                this.ya[e] || (this.ya[e] = {});
                this.ya[e][b] = f
            }, get: function (f, e) {
                return this.ya[f] && "undefined" != typeof this.ya[f][e] ? this.ya[f][e] : null
            }, del: function (f, e) {
                if (this.ya[f]) {
                    this.ya[f][e] && delete this.ya[f][e];
                    for (var b in this.ya[f])return;
                    delete this.ya[f]
                }
            }, insertRow: function (f, e) {
                this.ya[e] = f
            }, getRow: function (f) {
                return this.ya[f] ? this.ya[f] : null
            }, delRow: function (f) {
                this.ya[f] && delete this.ya[f]
            }, getEntireMatrix: M("ya")
        };
        g.prototype.insert = g.prototype.insert;
        g.prototype.get = g.prototype.get;
        g.prototype.del = g.prototype.del;
        g.prototype.insertRow = g.prototype.insertRow;
        g.prototype.getRow = g.prototype.getRow;
        g.prototype.delRow = g.prototype.delRow;
        g.prototype.getEntireMatrix = g.prototype.getEntireMatrix;
        return g
    });
    define("Subscription", "lsAc lsAb lsY lsZ Inheritance Setter Matrix Executor lsA EventDispatcher IllegalArgumentException IllegalStateException LoggerManager lsG ASSERT Helpers".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p, q, r, t) {
        function s(b, c, d) {
            this._callSuperConstructor(s);
            b = (new String(b)).toUpperCase();
            if (!b || !y[b])throw new k("The given value is not a valid subscription mode. Admitted values are MERGE, DISTINCT, RAW, COMMAND");
            this.hd = b;
            this.ja = this.Jc = this.Mb = this.Rb = this.xf = this.yf = null;
            this.nc = "RAW" === b ? null : "yes";
            this.bk = this.Je = this.Bi = this.ci = this.kp = this.pp = this.De = this.Ya = null;
            this.we = new a;
            this.Sc = new a;
            this.d = null;
            this.Za = 1;
            this.Ek = 0;
            this.bc = null;
            this.Cb = 0;
            this.yb = null;
            this.zh;
            this.Vj;
            this.ek = this.Dj = 0;
            this.rb = this.hd == l.pg ? 2 : 1;
            this.Ho = this.keyCode = this.eb = null;
            this.Aa = {};
            this.Nh = this.He = this.Md = null;
            this.BB = l.$k;
            if (c) {
                if (!d || !t.isArray(d))throw new k("Please specify a valid field list");
                t.isArray(c) ? this.Kh(c) :
                    this.Kh([c]);
                this.pk(d)
            } else if (d)throw new k("Please specify a valid item or item list");
        }

        function E(a, b) {
            for (var c = 0; c < a.length; c++)if (a[c]) {
                if (-1 < a[c].indexOf(" "))throw new k(b + z);
                if (!isNaN(a[c]))throw new k(b + P);
            } else throw new k(b + K);
        }

        function C(a, b) {
            return a - b
        }

        var y = {
            COMMAND: !0,
            RAW: !0,
            MERGE: !0,
            DISTINCT: !0
        }, x = l.vg, w = p.getLoggerProxy(l.ug), K = " name cannot be empty", z = " name cannot contain spaces", P = " name cannot be a number";
        s.prototype = {
            toString: function () {
                return ["[|Subscription", this.Za, this.Ek,
                    this.bc, this.Cb, this.yb, "]"].join("|")
            }, Np: function () {
                this.Je = null;
                this.we = new a;
                this.Sc = new a;
                this.ja.Ld(0);
                this.Rb.Ld(0);
                3 == this.rb && (this.ja.mt(null), this.Aa = {});
                this.Vj = this.zh = null;
                w.logDebug(p.resolve(437), this)
            }, Xy: function (a, b, c) {
                this.zb();
                if (!this.Rb)throw new k("Invalid Subscription, please specify an item list or item group");
                if (!this.ja)throw new k("Invalid Subscription, please specify a field list or field schema");
                this.Za = 5;
                this.yb = b;
                this.bc = a;
                this.d = c;
                this.Cb++;
                this.Dj++;
                r.verifyValue(this.Dj,
                    1);
                this.Ug();
                w.logInfo(p.resolve(434), this);
                return !0
            }, zz: function () {
                this.Cb++;
                this.Za = 2;
                w.logDebug(p.resolve(438), this)
            }, Hj: function (a) {
                this.Je = a;
                this.Za = 3;
                w.logDebug(p.resolve(439), this)
            }, pz: function () {
                var a = this.qe();
                this.Za = 5;
                this.Np();
                a && this.bs();
                w.logDebug(p.resolve(440), this)
            }, sz: function () {
                this.Mx();
                var a = this.qe();
                this.Za = 1;
                this.bc = this.yb = null;
                delete this.bk;
                3 == this.rb && this.jA();
                this.Np();
                this.Dj--;
                r.verifyValue(this.Dj, 0);
                a && this.bs();
                this.d = null;
                w.logDebug(p.resolve(441), this)
            }, Az: function () {
                this.zh &&
                (c.addPackedTimedTask(this.zh, this.Vj), this.Vj = this.zh = null, w.logDebug(p.resolve(442), this))
            }, xz: function (a, b, c, d) {
                this.Za = 4;
                this.ek++;
                r.verifyValue(this.ek, 1);
                w.logInfo(p.resolve(435), this);
                3 == this.rb && this.ja.mt(this.Nh);
                this.Jc && 1 != this.rb && this.eB(b, a);
                this.Rb.Ld(c);
                this.ja.Ld(d);
                this.dispatchEvent("onSubscription")
            }, bs: function () {
                this.ek--;
                r.verifyValue(this.ek, 0);
                w.logInfo(p.resolve(436), this);
                this.dispatchEvent("onUnsubscription")
            }, jA: function () {
                for (var a in this.Aa)this.Os(a)
            }, Os: function (a) {
                for (var b in this.Aa[a])this.Ps(a,
                    b)
            }, zl: function (a) {
                return a == this.Cb
            }, Kp: function (a) {
                return this.yb == a
            }, Au: function (a, b) {
                this.zh = a;
                this.Vj = b
            }, Nq: function () {
                if (null != this.Ya) {
                    var a = this.Ya;
                    return {LS_requested_max_frequency: "unlimited" == a ? 0 : a}
                }
                return {}
            }, Ug: function () {
                var a = {
                    LS_mode: this.hd,
                    LS_id: encodeURIComponent(this.Rb.rm()),
                    LS_schema: encodeURIComponent(this.ja.rm())
                };
                null != this.Bi && (a.LS_data_adapter = encodeURIComponent(this.Bi));
                null != this.ci && (a.LS_selector = encodeURIComponent(this.ci));
                null != this.pp && (a.LS_start = this.pp);
                null !=
                this.kp && (a.LS_end = this.kp);
                null != this.nc && (a.LS_snapshot = "yes" === this.nc ? "true" : "no" === this.nc ? "false" : this.nc);
                q.ba(a, this.Nq());
                if (null != this.De) {
                    var b = this.De;
                    "unlimited" != b && 0 < b && (a.LS_requested_buffer_size = b)
                }
                w.logDebug(p.resolve(443), this);
                return this.bk = a
            }, bB: function () {
                if (this.hd == l.pg && null != this.Mb && (this.eb = this.Mb.me("command"), this.keyCode = this.Mb.me("key"), !this.eb || !this.keyCode))throw new k("A field list for a COMMAND subscription must contain the key and command fields");
            }, eB: function (a,
                             b) {
                w.logDebug(p.resolve(444), this, a, b);
                this.eb = a;
                this.keyCode = b
            }, zb: function () {
                if (this.ih())throw new m("Cannot modify an active Subscription, please unsubscribe before applying any change");
            }, Mx: function () {
                if (!this.ih())throw new m("Subscription is not active");
            }, Tn: function () {
                if (this.hd != l.pg)throw new m("Second level field list is only available on COMMAND Subscriptions");
            }, Kl: function () {
                if (this.hd != l.pg)throw new m("This method can only be used on COMMAND subscriptions");
            }, Xx: function () {
                return 1 ==
                    this.Za
            }, Sm: function () {
                return 2 == this.Za
            }, Qm: function () {
                return 3 == this.Za
            }, qe: function () {
                return 4 == this.Za
            }, Yx: function () {
                return 5 == this.Za
            }, ih: function () {
                return 1 != this.Za
            }, lh: function () {
                return this.qe()
            }, Kh: function (a) {
                this.zb();
                if (!t.isArray(a))throw new k(" Please specifiy a valid array");
                E(a, "An item");
                this.yf = null == a ? null : new e(a);
                this.xf = null;
                this.Rb = this.yf
            }, Iw: function () {
                if (!this.yf) {
                    if (this.xf)throw new m("This Subscription was initiated using an item group, use getItemGroup instead of using getItems");
                    throw new m("The  item list/item group of this Subscription was not initiated");
                }
                return this.yf.Mc()
            }, jt: function (a) {
                this.zb();
                this.yf = null;
                this.Rb = this.xf = null == a ? null : new b(a)
            }, Hw: function () {
                if (!this.xf) {
                    if (this.yf)throw new m("This Subscription was initiated using an item list, use getItems instead of using getItemGroup");
                    throw new m("The  item list/item group of this Subscription was not initiated");
                }
                return this.xf.Mc()
            }, pk: function (a) {
                this.zb();
                if (!t.isArray(a))throw new k(" Please specifiy a valid array");
                E(a, "A field");
                this.Mb = null == a ? null : new e(a);
                this.Jc = null;
                this.ja = this.Mb;
                this.bB()
            }, Sq: function () {
                if (!this.Mb) {
                    if (this.Jc)throw new m("This Subscription was initiated using a field schema, use getFieldSchema instead of using getFields");
                    throw new IllegalStateExceptio("The field list/field schema of this Subscription was not initiated");
                }
                return this.Mb.Mc()
            }, Zn: function (a) {
                this.zb();
                this.Mb = null;
                this.ja = this.Jc = null == a ? null : new b(a)
            }, zw: function () {
                if (!this.Jc) {
                    if (this.Mb)throw new m("This Subscription was initiated using a field list, use getFields instead of using getFieldSchema");
                    throw new IllegalStateExceptio("The field list/field schema of this Subscription was not initiated");
                }
                return this.Jc.Mc()
            }, Yi: M("hd"), Ih: function (a) {
                this.zb();
                this.Bi = a;
                w.logDebug(p.resolve(445), this, a)
            }, vw: M("Bi"), tk: function (a) {
                this.zb();
                this.ci = a;
                w.logDebug(p.resolve(446), this, a)
            }, dx: M("ci"), Lh: function (a) {
                a && (a = new String(a), a = a.toLowerCase());
                var b = this.Ya;
                if (this.ih()) {
                    if (!a && 0 != a || null == this.Ya)throw new m("Can't change the frequency from/to 'unfiltered' or null while the Subscription is active");
                    if ("unfiltered" == a || "unfiltered" == this.Ya)throw new m("Can't change the frequency from/to 'unfiltered' or null while the Subscription is active");
                }
                if (a || 0 == a)if ("unfiltered" == a || "unlimited" == a)this.Ya = a; else try {
                    this.Ya = this.checkPositiveNumber(a, !1, !0)
                } catch (c) {
                    throw new k("The given value is not valid for this setting; use null, 'unlimited', 'unfiltered' or a positive number instead");
                } else this.Ya = null;
                if ((this.Sm() || this.Qm() || this.qe()) && String(b) != String(this.Ya) && (this.Ug(), this.d.fd(this,
                        this.Nq()), 3 == this.rb))for (var d in this.Aa)for (var e in this.Aa[d])r.verifyOk(this.qe()), this.Aa[d][e].Lh(this.Ya);
                w.logDebug(p.resolve(447), this, this.Ya)
            }, $w: M("Ya"), sk: function (a) {
                this.zb();
                if (a || 0 == a)if (a = new String(a), a = a.toLowerCase(), "unlimited" == a)this.De = a; else try {
                    this.De = this.checkPositiveNumber(a)
                } catch (b) {
                    throw new k("The given value is not valid for this setting; use null, 'unlimited' or a positive number instead");
                } else this.De = null;
                w.logDebug(p.resolve(448), this, this.De)
            }, Zw: M("De"),
            bo: function (a) {
                this.zb();
                if (a || 0 == a)if (a = new String(a), a = a.toLowerCase(), "no" == a)this.nc = a; else {
                    if (this.hd == l.al)throw new m("Snapshot is not permitted if RAW was specified as mode");
                    if ("yes" == a)this.nc = a; else {
                        if (isNaN(a))throw new k("The given value is not valid for this setting; use null, 'yes', 'no' or a positive number instead");
                        if (this.hd != l.Xk)throw new m("Numeric values are only allowed when the subscription mode is DISTINCT");
                        try {
                            this.nc = this.checkPositiveNumber(a)
                        } catch (b) {
                            throw new k("The given value is not valid for this setting; use null, 'yes', 'no' or a positive number instead");
                        }
                    }
                } else this.nc = null;
                w.logDebug(p.resolve(449), this, this.nc)
            }, ax: M("nc"), EA: function (a) {
                this.zb();
                this.Tn();
                if (!t.isArray(a))throw new k(" Please specifiy a valid array");
                E(a, "A field");
                this.Md = null == a ? null : new e(a);
                this.He = null;
                this.Nh = this.Md;
                this.Ds()
            }, nw: function () {
                if (!this.Md) {
                    if (this.He)throw new m("The second level of this Subscription was initiated using a field schema, use getCommandSecondLevelFieldSchema instead of using getCommandSecondLevelFields");
                    throw new m("The second level of this Subscription was not initiated");
                }
                return this.Md.Mc()
            }, DA: function (a) {
                this.zb();
                this.Tn();
                this.Md = null;
                this.Nh = this.He = null == a ? null : new b(a);
                this.Ds()
            }, mw: function () {
                if (!this.He) {
                    if (this.Md)throw new m("The second level of this Subscription was initiated using a field list, use getCommandSecondLevelFields instead of using getCommandSecondLevelFieldSchema");
                    throw new m("The second level of this Subscription was not initiated");
                }
                return this.He.Mc()
            }, CA: function (a) {
                this.zb();
                this.Tn();
                this.Ho = a;
                w.logDebug(p.resolve(450), this, a)
            }, lw: M("Ho"),
            getValue: function (a, b) {
                return this.we.get(this.Ft(a), this.Et(b))
            }, ow: function (a, b, c) {
                this.Kl();
                return this.Sc.get(this.Ft(a) + " " + b, this.Et(c, !0))
            }, Yq: function () {
                this.Kl();
                if (!this.Jc && this.Mb)throw new m("This Subscription was initiated using a field list, key field is always 'key'");
                if (null == this.keyCode)throw new m("The position of the key field is currently unknown");
                return this.keyCode
            }, Oq: function () {
                this.Kl();
                if (!this.Jc && this.Mb)throw new m("This Subscription was initiated using a field list, command field is always 'command'");
                if (null == this.eb)throw new m("The position of the command field is currently unknown");
                return this.eb
            }, Et: function (a, b) {
                var c = this.Th(a, this.ja, b);
                if (null === c)throw new k("the specified field does not exist");
                if (!1 === c)throw new k("the specified field position is out of bounds");
                return c
            }, Ft: function (a) {
                a = this.Th(a, this.Rb);
                if (null === a)throw new k("the specified item does not exist");
                if (!1 === a)throw new k("the specified item position is out of bounds");
                return a
            }, Th: function (a, b, c) {
                a = isNaN(a) ? b.me(a) :
                    a;
                return null == a ? null : 0 >= a || a > (c ? b.wm() : b.xb) ? !1 : a
            }, Ds: function () {
                this.rb = null == this.Nh ? 2 : 3
            }, jm: function (a) {
                this.dispatchEvent("onEndOfSnapshot", [this.Rb.getName(a), a])
            }, Fl: function (b) {
                var c = this.Rb.getName(b);
                2 == this.rb ? this.Sc = new a : 3 == this.rb && (this.Sc = new a, this.Os(b));
                this.dispatchEvent("onClearSnapshot", [c, b])
            }, xy: function (a, b) {
                this.dispatchEvent("onItemLostUpdates", [this.Rb.getName(a), a, b])
            }, zA: function (a, b) {
                this.dispatchEvent("onSubscriptionError", [a, b])
            }, update: function (a, b, c) {
                r.verifyValue(4,
                    this.Za);
                var d = a[1], e = new String(d);
                1 != this.rb && (e = this.Jz(a, d, c));
                3 != this.rb || c || this.zx(a);
                1 == this.rb ? this.Kt(this.we, d, a, !0) : this.Kt(this.Sc, e, a, !0);
                a = new f(this.Rb.getName(d), d, this.ja, b, a);
                this.dispatchEvent("onItemUpdate", [a]);
                "DELETE" == this.Sc.get(e, this.eb) && this.Sc.delRow(e)
            }, Kt: function (a, b, c, d) {
                var e = c.length - 2, h = 1, f = 2;
                for (c.Go = {}; h <= e; h++, f++)c[f] !== x ? a.insert(c[f], b, h) : d && (c[f] = a.get(b, h), c.Go[f] = !0)
            }, Jz: function (a, b, c) {
                var d;
                if ("undefined" == typeof a[this.keyCode + 1] || "undefined" == typeof a[this.eb +
                    1])return w.logWarn(p.resolve(433)), null;
                d = a[this.keyCode + 1] == x ? b + " " + this.we.get(b, this.keyCode) : b + " " + a[this.keyCode + 1];
                if (c)a[this.keyCode + 1] = x, a[this.eb + 1] == this.Sc.get(d, this.eb) ? a[this.eb + 1] = x : (a.Gc.push(this.eb), a.Gc.sort(C)); else {
                    a.Gc = [];
                    for (c = 2; c < a.length; c++)a[c] && a[c] == x ? a[c] = this.we.get(b, c - 1) : this.we.insert(a[c], b, c - 1), a[c] == this.Sc.get(d, c - 1) ? a[c] = x : a.Gc.push(c - 1);
                    if (3 == this.rb && (b = this.Xq() + 2, b > a.length))for (c = a.length; c < b; c++)a[c] = x
                }
                return d
            }, zx: function (a) {
                var b = a[1], c = a[this.keyCode +
                1] == x ? this.we.get(b, this.keyCode) : a[this.keyCode + 1];
                a = a[this.eb + 1];
                this.Aa[b] && this.Aa[b][c] && "DELETE" == a ? this.Ps(b, c) : this.Aa[b] && this.Aa[b][c] || "DELETE" == a || this.vu(b, c)
            }, zy: function () {
                this.tt = !0
            }, Bx: function (a, b) {
                return this.Aa[a] && this.Aa[a][b]
            }, Ps: function (a, b) {
                this.d.$j(this.Aa[a][b]);
                delete this.Aa[a][b]
            }, vu: function (a, b) {
                var c = new s(this.BB);
                c.Kh([b]);
                this.Md ? c.pk(this.Md.Mc()) : c.Zn(this.He.Mc());
                c.Ih(this.Ho);
                c.bo("yes");
                c.Ya = this.Ya;
                c.zy();
                var d = new g(this, a, b);
                c.addListener(d);
                this.Aa[a] ||
                (this.Aa[a] = {});
                this.Aa[a][b] = c;
                this.d.gi(c)
            }, cB: function (a) {
                this.Nh.Ld(a)
            }, Xq: function () {
                return this.ja.wm()
            }, addListener: function (a) {
                this._callSuperMethod(s, "addListener", [a])
            }, removeListener: function (a) {
                this._callSuperMethod(s, "removeListener", [a])
            }, getListeners: function () {
                return this._callSuperMethod(s, "getListeners")
            }
        };
        s.prototype.isActive = s.prototype.ih;
        s.prototype.isSubscribed = s.prototype.lh;
        s.prototype.setItems = s.prototype.Kh;
        s.prototype.getItems = s.prototype.Iw;
        s.prototype.setItemGroup = s.prototype.jt;
        s.prototype.getItemGroup = s.prototype.Hw;
        s.prototype.setFields = s.prototype.pk;
        s.prototype.getFields = s.prototype.Sq;
        s.prototype.setFieldSchema = s.prototype.Zn;
        s.prototype.getFieldSchema = s.prototype.zw;
        s.prototype.getMode = s.prototype.Yi;
        s.prototype.setDataAdapter = s.prototype.Ih;
        s.prototype.getDataAdapter = s.prototype.vw;
        s.prototype.setSelector = s.prototype.tk;
        s.prototype.getSelector = s.prototype.dx;
        s.prototype.setRequestedMaxFrequency = s.prototype.Lh;
        s.prototype.getRequestedMaxFrequency = s.prototype.$w;
        s.prototype.setRequestedBufferSize =
            s.prototype.sk;
        s.prototype.getRequestedBufferSize = s.prototype.Zw;
        s.prototype.setRequestedSnapshot = s.prototype.bo;
        s.prototype.getRequestedSnapshot = s.prototype.ax;
        s.prototype.setCommandSecondLevelFields = s.prototype.EA;
        s.prototype.getCommandSecondLevelFields = s.prototype.nw;
        s.prototype.setCommandSecondLevelFieldSchema = s.prototype.DA;
        s.prototype.getCommandSecondLevelFieldSchema = s.prototype.mw;
        s.prototype.setCommandSecondLevelDataAdapter = s.prototype.CA;
        s.prototype.getCommandSecondLevelDataAdapter = s.prototype.lw;
        s.prototype.getValue = s.prototype.getValue;
        s.prototype.getCommandValue = s.prototype.ow;
        s.prototype.getKeyPosition = s.prototype.Yq;
        s.prototype.getCommandPosition = s.prototype.Oq;
        s.prototype.addListener = s.prototype.addListener;
        s.prototype.removeListener = s.prototype.removeListener;
        s.prototype.getListeners = s.prototype.getListeners;
        d(s, n, !1, !0);
        d(s, h, !0, !0);
        return s
    });
    define("Cell", ["Environment"], function (g) {
        function f(b, d) {
            this.i = b;
            this.la = !0;
            this.Ni = 0;
            d || (d = this.rx());
            if (d)if (0 == d.toLowerCase().indexOf("style.")) {
                var e = d.slice(6);
                this.lg = h(e);
                this.Yf = a(e)
            } else this.lg = m(d), this.Yf = p(d); else b.nodeName.toLowerCase()in C ? (this.lg = c, this.Yf = l) : (this.lg = n, this.Yf = k);
            this.Ig = y++;
            this.ed = 0;
            this.oc = this.pc = this.ve = null;
            this.Kx = this.Yf(!0);
            this.Ix = this.i.className;
            this.Jx = this.Bq()
        }

        function e(a, b) {
            if (!1 === f.Lk)return a.dataset ? a.dataset[b] : a.getAttribute("data-" + b);
            if (!0 === f.Lk)return a.getAttribute(b);
            var c = a.dataset ? a.dataset[b] : a.getAttribute("data-" + b);
            if (c)return f.Lk = !1, c;
            if (c = a.getAttribute(b))f.Lk = !0;
            return c
        }

        function b(a, b) {
            if (!a)return b;
            for (var c in b)a[c] || (null === a[c] || "" === a[c]) || (a[c] = b[c]);
            return a
        }

        function d(a) {
            return (a = e(a, s)) && a.toLowerCase() == E
        }

        function h(a) {
            return function (b) {
                this.i.style[a] = b === t ? null : b
            }
        }

        function a(a) {
            return function () {
                return this.i.style[a] || ""
            }
        }

        function c(a) {
            this.i.value = a && a !== t ? a : ""
        }

        function l() {
            return this.i.value
        }

        function n(a, b) {
            b ? this.i.innerHTML = a : 1 != this.i.childNodes.length || 3 != this.i.firstChild.nodeType ? (null != this.i.firstChild && (this.i.innerHTML = ""), this.i.appendChild(document.createTextNode(a))) : this.i.firstChild.nodeValue = a
        }

        function k(a) {
            return a ? this.i.innerHTML : this.i.firstChild ? this.i.firstChild.nodeValue : ""
        }

        function m(a) {
            return a === q ? c : function (b) {
                b && b !== t ? this.i.setAttribute(a, b) : this.i.removeAttribute(a)
            }
        }

        function p(a) {
            return a === q ? l : function () {
                return this.i.getAttribute(a)
            }
        }

        g.browserDocumentOrDie();
        var q = "value", r = {
            extra: !0,
            "first-level": !0,
            "second-level": !0
        }, t = "\u00a0", s = "source", E = "lightstreamer", C = {input: !0, textarea: !0}, y = 0;
        f.kC = 1;
        f.Yo = 2;
        f.St = "first-level";
        f.Yt = "second-level";
        f.Lk = null;
        f.Xi = function (a, b) {
            var c = [];
            b || (b = ["*"]);
            for (var e = 0; e < b.length; e++)for (var g = a.getElementsByTagName(b[e]), h = 0; h < g.length; h++)d(g[h]) && c.push(new f(g[h]));
            return c
        };
        f.Lt = d;
        f.vd = function (a) {
            for (var b = null; null != a && a != document;)b = a, a = a.parentNode;
            return null == a ? null != b && "HTML" == b.nodeName ? !0 : !1 : !0
        };
        f.prototype =
        {
            Rn: function (a, b) {
                this.lg(a.Yf(), b);
                this.ve = a.ve;
                this.pc = a.pc;
                this.oc = a.oc;
                this.ed = a.ed;
                this.ok(a.Bq());
                this.Jo(a.i.className);
                this.Ni = a.Ni
            }, Wg: M("i"), Bq: function () {
            var a = {}, b;
            for (b in this.i.style)a[b] = this.i.style[b];
            return a
        }, Jo: function (a) {
            null !== a && this.i.className != a && (this.i.className = a)
        }, ok: function (a) {
            if (a)for (var b in a) {
                "CLASS" == b && this.Jo(a[b]);
                try {
                    null !== a[b] && (this.i.style[b] = a[b])
                } catch (c) {
                }
            }
        }, Eg: function (a, b) {
            a == this.ed && (1 == b ? (this.ok(this.pc), this.pc = null) : (this.ok(this.oc), this.oc =
                null))
        }, Xd: function (a, b) {
            a == this.ed && (this.lg(this.ve, b), this.ve = null, this.Eg(a, 1))
        }, lB: function () {
            this.ed++;
            return this.ed
        }, rf: function () {
            var a = e(this.i, "field");
            return a ? a : null
        }, Pb: function () {
            var a = e(this.i, "replica");
            return a ? a : null
        }, Rq: function () {
            var a = e(this.i, "fieldtype");
            if (!a)return "first-level";
            a = a.toLowerCase();
            return r[a] ? a : "first-level"
        }, fr: function () {
            return e(this.i, "grid")
        }, getRow: function () {
            var a = e(this.i, "item");
            a || (a = e(this.i, "row"));
            return a
        }, rx: function () {
            return e(this.i, "update")
        },
            Lm: function () {
                return ++this.Ni
            }, um: M("Ni"), wr: function (a) {
            return a.i === this.i
        }, vd: function () {
            return f.vd(this.i)
        }, or: function () {
            return this.i.id ? document.getElementById(this.i.id) === this.i : this.vd(this.i)
        }, ao: function (a) {
            this.ve = "" === a ? t : a
        }, Ag: function (a, b, c) {
            this.pc || (this.pc = {});
            this.oc || (this.oc = {});
            this.pc[c] = a || "";
            this.oc[c] = b || ""
        }, Rw: function (a) {
            a && (this.pc = b(this.pc, a));
            return this.pc
        }, Qw: function (a) {
            a && (this.oc = b(this.oc, a));
            return this.oc
        }, clean: function () {
            this.lg(this.Kx, !0);
            this.Jo(this.Ix);
            this.ok(this.Jx)
        }
        };
        return f
    });
    define("CellMatrix", ["Matrix", "Inheritance", "Cell"], function (g, f, e) {
        function b(a) {
            this._callSuperConstructor(b, [a])
        }

        function d(a, b) {
            var d = new e(document.createElement("p"));
            d.Rn(a, b);
            var f = a.Pb();
            d.Pb = function () {
                return f
            };
            return d
        }

        function h(a) {
            if (a.la)a.clean(); else for (var b = 0; b < a.length; b++)a[b].clean()
        }

        b.$f = function (a, b, e) {
            var f = {}, g;
            for (g in a)f[g] = !0;
            if (b)for (g in b)f[g] = !0; else b = {};
            for (var m in f)if (a[m])if (b[m])if (b[m].la && a[m].la)b[m].Rn(a[m], e); else {
                f = a[m].la ? [a[m]] : a[m];
                b[m].la && (b[m] =
                    [b[m]]);
                g = [].concat(b[m]);
                for (var p = 0; p < f.length; p++) {
                    for (var q = !1, r = 0; r < g.length; r++)if (g[r].Pb() === f[p].Pb()) {
                        g[r].Rn(f[p], e);
                        q = !0;
                        g.splice(r, 1);
                        break
                    }
                    q || b[m].push(d(f[p], e))
                }
                h(g)
            } else {
                f = b;
                g = m;
                p = a[m];
                q = e;
                if (p.la)p = d(p, q); else {
                    for (var r = [], t = 0; t < p.length; t++)r[t] = d(p[t], q);
                    p = r
                }
                f[g] = p
            } else h(b[m]);
            return b
        };
        b.prototype = {
            xu: function (a) {
                var b = this.pf(a.getRow(), a.rf());
                if (!b)return !1;
                if (b.la)return b.wr(a);
                for (var d = 0; d < b.length; d++)if (b[d].wr(a))return !0;
                return !1
            }, addCell: function (a, b, d) {
                b = b || a.getRow();
                d = d || a.rf();
                var e = this.pf(b, d);
                e ? e.la ? this.insert([e, a], b, d) : e.push(a) : this.insert(a, b, d)
            }, Wv: function (a) {
                var b = this.getEntireMatrix(), d;
                for (d in b)this.om(d, a)
            }, om: function (a, b) {
                var d = this.getRow(a), e;
                for (e in d)this.Gq(a, e, b)
            }, Gq: function (a, b, d) {
                var e = this.get(a, b);
                if (e)if (e.la)d(e, a, b); else for (var f = 0; f < e.length; f++)d(e[f], a, b, e[f].Pb())
            }, pf: function (a, b, d) {
                if (d) {
                    if (a = this.get(a, b))if (!a.la)for (b = 0; b < a.length; b++) {
                        if (a[b].Pb() == d)return a[b]
                    } else if (a.Pb() == d)return a;
                    return null
                }
                return this.get(a,
                    b)
            }, Ou: function () {
                var a = this.getEntireMatrix(), b;
                for (b in a) {
                    var d = a[b], e = !1, f = void 0;
                    for (f in d) {
                        var g;
                        g = d[f];
                        if (g.la)g = g.or(); else {
                            for (var h = !1, q = 0; q < g.length;)g[q].or() ? (h = !0, q++) : g.splice(q, 1);
                            g = h
                        }
                        g ? e = !0 : delete d[f]
                    }
                    e || delete a[b]
                }
            }
        };
        f(b, g, !1, !0);
        return b
    });
    define("ColorConverter", ["Environment", "LoggerManager", "BrowserDetection", "IFrameHandler"], function (g, f, e, b) {
        function d(b) {
            0 == b.indexOf("#") && (b = b.substring(1, b.length));
            if (3 == b.length)b = b.charAt(0) + b.charAt(0) + b.charAt(1) + b.charAt(1) + b.charAt(2) + b.charAt(2); else if (6 != b.length)return m.warn("A hexadecimal color value must be 3 or 6 character long. An invalid value was specified, will be ignored"), null;
            var c = b.substring(2, 4), d = b.substring(4, 6);
            numR = a(b.substring(0, 2));
            numG = a(c);
            numB = a(d);
            return null ==
            numR || null == numG || null == numB ? null : [numR, numG, numB]
        }

        function h(a) {
            if (0 <= a && 9 >= a)return new Number(a);
            a = a.toUpperCase();
            if (p[a])return p[a];
            m.warn("A hexadecimal number must contain numbers between 0 and 9 and letters between A and F. An invalid value was specified, will be ignored");
            return null
        }

        function a(a) {
            var b = 0, c = 0, d;
            for (d = a.length; 1 <= d; d--) {
                var e = h(a.substring(d - 1, d));
                if (null == e)return null;
                var f;
                for (f = 1; f <= c; f++)e *= 16;
                c++;
                b += e
            }
            return b
        }

        function c(a) {
            if (a.indexOf("%") == a.length - 1) {
                a = parseFloat(a.substring(0,
                    a.length - 1));
                if (100 < a || 0 > a)return m.warn("A RGB element must be a number \x3e\x3d0 and \x3c\x3d255 or a percentile \x3e\x3d0 and \x3c\x3d100. An invalid value was specified, will be ignored"), null;
                a *= 2.55
            }
            return a
        }

        function l(a, b) {
            return a && "" != a ? b ? a != b ? !0 : !1 : !0 : !1
        }

        function n(a) {
            var b = document.createElement("DIV");
            b.style.backgroundColor = a;
            var c = s.dh(b, q, a);
            if (255 == c[0] && (255 == c[1] && 255 == c[2]) && "WHITE" != a.toUpperCase()) {
                var d = document.getElementsByTagName("BODY")[0];
                d && (d.appendChild(b), c = s.dh(b, q,
                    a), d.removeChild(b))
            }
            r[a] = c;
            return r[a]
        }

        function k(a) {
            var c = "";
            if (r[a])return r[a];
            if (e.isProbablyIE())try {
                if (t = b.getFrameWindow("weswit__ColorFrame", !0))t.document.bgColor = a, c = t.document.bgColor
            } catch (f) {
                c = null
            } else return n(a);
            if (!c || c == a) {
                var g = document.bgColor;
                document.bgColor = a;
                c = document.bgColor;
                document.bgColor = g
            }
            if (!c || c == a)return n(a);
            r[a] = d(c);
            return r[a]
        }

        g.browserDocumentOrDie();
        var m = f.getLoggerProxy("lightstreamer.grids"), p = {
                A: 10,
                B: 11,
                C: 12,
                D: 13,
                E: 14,
                F: 15
            }, q = "backgroundColor", r = {}, t = null,
            s = {
                Do: function (a) {
                    if (0 == a.indexOf("rgb"))a:{
                        var b, e;
                        if (0 == a.indexOf("rgb("))b = 4, e = ")"; else if (0 == a.indexOf("rgba("))b = 5, e = ","; else {
                            m.warn("A RGB color value must be in the form 'rgb(x, y, z)' or 'rgba(x, y, z, a)'. An invalid value was specified, will be ignored");
                            a = null;
                            break a
                        }
                        a = a.substring(b, a.length);
                        var f = a.indexOf(",");
                        b = c(a.substring(0, f));
                        var g = a.indexOf(",", f + 1), f = c(a.substring(f + 1, g));
                        a = c(a.substring(g + 1, a.indexOf(e, g + 1)));
                        a = null == b || null == f || null == a ? null : [b, f, a]
                    } else a = 0 == a.indexOf("#") ?
                        d(a) : k(a);
                    return a
                }, dh: function (a, b, c) {
                    if (null == a)return [255, 255, 255];
                    var d = "";
                    try {
                        if (window.getComputedStyle || document.defaultView && document.defaultView.getComputedStyle) {
                            var e = document.defaultView.getComputedStyle(a, null);
                            if (e)var f = b == q ? "background-color" : b, d = e.getPropertyValue(f)
                        }
                    } catch (g) {
                    }
                    try {
                        !l(d, c) && a.currentStyle && (f = "background-color" == b ? q : b, d = a.currentStyle[f])
                    } catch (h) {
                    }
                    try {
                        if (!l(d, c))if (e = "background-color" == b ? q : b, "" != a.style[e])d = a.style[e]; else return [255, 255, 255]
                    } catch (k) {
                    }
                    return "transparent" ==
                    d && a.parentNode ? this.dh(a.parentNode, b) : "transparent" == d ? [255, 255, 255] : l(d, c) ? this.Do(d) : [255, 255, 255]
                }
            };
        return s
    });
    define("FadersHandler", ["ColorConverter", "Executor", "Helpers", "Cell", "Environment"], function (g, f, e, b, d) {
        function h(a, b, c, d, e, f, g) {
            this.da(a, b, c, d, e, f, g)
        }

        function a() {
            this.length = 0;
            this.zs = {}
        }

        function c(b) {
            this.ge = b;
            this.Vi = new a;
            this.Dq = 0;
            this.mf = {};
            this.Oi = !1;
            this.Yc = {}
        }

        d.browserDocumentOrDie();
        c.prototype = {
            Zq: function (a, b, c, d, e, f) {
                e = this.Fw(e);
                var g = a.Lm();
                if (g) {
                    var t = this.Vi.get();
                    if (null == t)return this.mf[this.Dq] = new h(a, b, c, d, e, g, f), this.Dq++;
                    this.mf[t].da(a, b, c, d, e, g, f);
                    return t
                }
            }, Fw: function (a) {
                a /=
                    this.ge;
                return 1 < a ? a : 1
            }, Dr: function (a) {
                var b = this.mf[a], c = b.md.um();
                if (!c)this.no(b.md); else if (!(b.a < c)) {
                    var c = this.Yc[b.md.Ig], d = this.mf[c];
                    d && (d.gr || (b.gr ? d.Hi && f.executeTask(d.Hi) : (b.Ja = d.Ja, b.Oa < d.Oa && (b.Oa = d.Oa))), this.Vi.put(c));
                    this.Yc[b.md.Ig] = a;
                    b.jf && (b.gg = g.dh(b.md.Wg(), "backgroundColor"));
                    b.Sg && (b.ko = g.dh(b.md.Wg(), "color"));
                    this.Oi || this.Qv(this.ge)
                }
            }, no: function (a) {
                var b = this.Yc[a.Ig];
                if (b || 0 == b)delete this.Yc[a.Ig], this.Vi.put(b)
            }, Cv: function (a) {
                var b = e.getTimeStamp(), c = 0;
                a && (c = b - (a +
                this.ge));
                a = !1;
                for (var d in this.Yc) {
                    var g = this.Yc[d], h = this.mf[g];
                    if (h.Ja > h.Oa)this.Vi.put(g), delete this.Yc[d], h.Hi && f.addPackedTimedTask(h.Hi, 0); else {
                        g = h.md.Wg();
                        if (!g) {
                            this.no(h.md);
                            continue
                        }
                        "transparent" == h.jf ? g.style.backgroundColor = "rgba(" + h.gg[0] + "," + h.gg[1] + "," + h.gg[2] + "," + this.fe(100, 0, h.Oa, h.Ja) / 100 + ")" : h.jf && (g.style.backgroundColor = "rgb(" + this.fe(h.gg[0], h.jf[0], h.Oa, h.Ja) + "," + this.fe(h.gg[1], h.jf[1], h.Oa, h.Ja) + "," + this.fe(h.gg[2], h.jf[2], h.Oa, h.Ja) + ")");
                        h.Sg && (g.style.color = "rgb(" + this.fe(h.ko[0],
                            h.Sg[0], h.Oa, h.Ja) + "," + this.fe(h.ko[1], h.Sg[1], h.Oa, h.Ja) + "," + this.fe(h.ko[2], h.Sg[2], h.Oa, h.Ja) + ")");
                        a = !0
                    }
                    h.Ja++
                }
                a ? (d = e.getTimeStamp(), b = d - b + c, b > this.ge && (c = b / this.ge, b = Math.floor(c), c -= b, this.aA(b), b = this.ge * c), this.Nr(this.ge - b, d)) : this.Oi = !1
            }, Nr: function (a, b) {
                f.addTimedTask(this.Cv, a, this, [b])
            }, aA: function (a) {
                for (var b in this.Yc) {
                    var c = this.mf[this.Yc[b]];
                    c.Ja > c.Oa || (c.Ja = c.Ja + a < c.Oa ? c.Ja + a : c.Oa)
                }
            }, Qv: function (a) {
                !0 != this.Oi && (this.Oi = !0, this.Nr(a))
            }, fe: function (a, b, c, d) {
                a = new Number(a);
                b = new Number(b);
                return Math.ceil(a + 1 / c * d * (b - a))
            }
        };
        a.prototype = {
            put: function (a) {
                this.zs[this.length] = a;
                this.length++
            }, get: function () {
                if (0 >= this.length)return null;
                this.length--;
                return this.zs[this.length]
            }
        };
        h.prototype = {
            da: function (a, b, c, d, e, f, h) {
                this.Hi = h ? h : null;
                this.gr = b;
                this.md = a;
                this.jf = "" === c || "transparent" == c ? "transparent" : c ? g.Do(c) : null;
                this.Sg = d ? g.Do(d) : null;
                this.Oa = e;
                this.a = f;
                this.Ja = 0
            }
        };
        return c
    });
    define("LightstreamerConstants", [], function () {
        return {
            CONNECTING: "CONNECTING",
            Fb: "CONNECTED:",
            tg: "STREAM-SENSING",
            Zh: "WS-STREAMING",
            qg: "HTTP-STREAMING",
            Te: "STALLED",
            xg: "WS-POLLING",
            Sd: "HTTP-POLLING",
            ac: "DISCONNECTED",
            wg: "DISCONNECTED:WILL-RETRY",
            cl: "WS",
            Yh: "HTTP",
            al: "RAW",
            Xk: "DISTINCT",
            pg: "COMMAND",
            $k: "MERGE"
        }
    });
    define("DoubleKeyMatrix", ["Inheritance", "Matrix"], function (g, f) {
        function e() {
            this._callSuperConstructor(e);
            this.Dh = {}
        }

        e.prototype = {
            insert: function (b, d, f) {
                "undefined" == typeof this.Dh[f] && (this.Dh[f] = d, this._callSuperMethod(e, "insert", [b, d, f]))
            }, del: function (b, d) {
                this._callSuperMethod(e, "del", [b, d]);
                delete this.Dh[d]
            }, delReverse: function (b) {
                var d = this.Dh[b];
                "undefined" != typeof d && this.del(d, b)
            }, delRow: function (b) {
                var d = this.getRow(b), f;
                for (f in d)delete this.Dh[f];
                this._callSuperMethod(e, "delRow", [b])
            }
        };
        e.prototype.insert = e.prototype.insert;
        e.prototype.del = e.prototype.del;
        e.prototype.delReverse = e.prototype.delReverse;
        e.prototype.delRow = e.prototype.delRow;
        g(e, f);
        return e
    });
    define("AbstractWidget", "Inheritance Matrix LoggerManager Setter EventDispatcher IllegalStateException LightstreamerConstants DoubleKeyMatrix".split(" "), function (g, f, e, b, d, h, a, c) {
        function l(a) {
            this._callSuperConstructor(l);
            this.Pc = "ITEM_IS_KEY";
            this.Ll = this.ij = null;
            this.ed = 0;
            this.lm = null;
            this.L = new f;
            this.parsed = !1;
            this.id = a;
            this.useSynchEvents(!0);
            this.Qp = this.Pp = !1;
            this.ei = 0;
            this.Df = null;
            this.pm = !1;
            this.Od = null;
            this.Bk = [];
            this.Nb = [];
            this.Tg = {};
            this.Kc = this.Qi = 0;
            this.Vm = new c
        }

        var n = e.getLoggerProxy("lightstreamer.grids");
        l.fp = "ITEM_IS_KEY";
        l.au = "UPDATE_IS_KEY";
        l.prototype = {
            ca: M("id"), xl: function () {
                if (!this.parsed)throw new h("Please parse html before calling this method");
            }, onItemUpdate: function (a) {
                var b = a.zm(), c = a.Wi();
                this.ed++;
                var c = null == b ? c : b, b = this.ny() ? c : this.Ba() ? this.ed : c + " " + a.getValue(this.ij), d = {};
                this.Ba() ? a.Hq(this.Uq(d)) : a.forEachChangedField(this.Uq(d));
                this.Br() && "DELETE" == d[this.Ll] ? this.removeRow(b) : (this.updateRow(b, d), this.Vm.insert(!0, c, b))
            }, onClearSnapshot: function (a, b) {
                var c = this.Vm.zC(null ==
                a ? b : a), d;
                for (d in c)this.removeRow(d)
            }, onSubscription: function () {
                0 == this.ei && this.Pp && this.clean();
                this.Br() && !this.ij && (this.ij = this.Df.Yq(), this.Ll = this.Df.Oq());
                this.ei++
            }, onUnsubscription: function () {
                this.ei--;
                0 == this.ei && this.Qp && this.clean()
            }, onListenStart: function (a) {
                this.Df || (this.Df = a, this.pm || this.Lp());
                if (a.lh())this.onSubscription()
            }, onListenEnd: function (a) {
                if (a.lh())this.onUnsubscription()
            }, Lp: function () {
                if (this.Df) {
                    var b = this.Df;
                    if (b.Yi() == a.$k || b.Yi() == a.al)this.Pc = "ITEM_IS_KEY"; else if (b.Yi() ==
                        a.Xk)this.Pc = "UPDATE_IS_KEY"; else {
                        this.Pc = "KEY_IS_KEY";
                        try {
                            b.Sq(), this.ij = "key", this.Ll = "command"
                        } catch (c) {
                        }
                    }
                } else this.Pc = "ITEM_IS_KEY"
            }, Uq: function (a) {
                var b = this;
                return function (c, d, e) {
                    null === b.lm && (b.lm = null == c);
                    a[b.lm ? d : c] = e
                }
            }, ny: function () {
                return "ITEM_IS_KEY" == this.Pc
            }, Ba: function () {
                return "UPDATE_IS_KEY" == this.Pc
            }, Br: function () {
                return "KEY_IS_KEY" == this.Pc
            }, ar: function () {
                return this.Kc >= this.Nb.length ? null : this.Nb[this.Kc]
            }, Ns: function (a) {
                var b = this.Tg[a];
                delete this.Tg[a];
                this.Nb[b] = null;
                this.Qi++;
                if (b == this.Kc) {
                    for (; null === this.Nb[this.Kc] && this.Kc < this.Nb.length;)this.Kc++;
                    if (this.Kc >= this.Nb.length) {
                        this.Nb = [];
                        this.Tg = {};
                        this.Kc = this.Qi = 0;
                        return
                    }
                }
                if (100 <= this.Qi)for (this.Tg = {}, a = this.Nb, this.Nb = [], b = this.Qi = this.Kc = 0; b < a.length; b++)null !== a[b] && this.Mr(a[b])
            }, Mr: function (a) {
                this.Tg[a] = this.Nb.length;
                this.Nb.push(a)
            }, removeRow: function (a) {
                this.xl();
                if (this.Od)this.rv(a); else if (this.L.getRow(a)) {
                    n.isDebugLogEnabled() && n.logDebug(e.resolve(495), a, this);
                    this.Od = {};
                    var b = null;
                    try {
                        this.removeRowExecution(a),
                            this.L.delRow(a), this.Vm.delReverse(a), this.Ba() && this.Ns(a)
                    } catch (c) {
                        b = c
                    }
                    this.Od = null;
                    this.fq();
                    if (null !== b)throw b;
                } else n.logWarn(e.resolve(493), a, this)
            }, It: function (a, b) {
                n.isDebugLogEnabled() && n.logDebug(e.resolve(496), this);
                this.Bk.push({type: 2, key: a, Uy: b})
            }, rv: function (a) {
                n.isDebugLogEnabled() && n.logDebug(e.resolve(497), this);
                this.Bk.push({type: 1, key: a})
            }, fq: function () {
                for (; 0 < this.Bk.length;) {
                    var a = this.Bk.shift();
                    1 == a.type ? this.removeRow(a.key) : this.updateRow(a.key, a.Uy)
                }
            }, updateRow: function (a,
                                    b) {
                this.xl();
                if (this.Od)a == this.Od ? this.mergeUpdate(a, b) : this.It(a, b); else {
                    this.Od = a;
                    var c = null;
                    try {
                        if (this.updateRowExecution(a, b), this.L.getRow(a)) {
                            n.isDebugLogEnabled() && n.logDebug(e.resolve(499), a, this);
                            for (var d in b)this.L.insert(b[d], a, d)
                        } else n.isDebugLogEnabled() && n.logDebug(e.resolve(498), a, this), this.Ba() && this.Mr(a), this.L.insertRow(b, a)
                    } catch (f) {
                        c = f
                    }
                    this.Od = null;
                    this.fq();
                    if (null !== c)throw c;
                }
            }, clean: function () {
                n.logInfo(e.resolve(494), this);
                var a = this.L.getEntireMatrix(), b, c = [];
                for (b in a)c.push(b);
                for (b = 0; b < c.length; b++)this.removeRow(c[b])
            }, getValue: function (a, b) {
                return this.L.get(a, b)
            }, setAutoCleanBehavior: function (a, b) {
                this.Pp = this.checkBool(a);
                this.Qp = this.checkBool(b)
            }, parseHtml: D(), updateRowExecution: D(), removeRowExecution: D(), mergeUpdate: D()
        };
        l.prototype.onItemUpdate = l.prototype.onItemUpdate;
        l.prototype.onClearSnapshot = l.prototype.onClearSnapshot;
        l.prototype.onSubscription = l.prototype.onSubscription;
        l.prototype.onUnsubscription = l.prototype.onUnsubscription;
        l.prototype.onListenStart =
            l.prototype.onListenStart;
        l.prototype.onListenEnd = l.prototype.onListenEnd;
        l.prototype.removeRow = l.prototype.removeRow;
        l.prototype.updateRow = l.prototype.updateRow;
        l.prototype.clean = l.prototype.clean;
        l.prototype.getValue = l.prototype.getValue;
        l.prototype.setAutoCleanBehavior = l.prototype.setAutoCleanBehavior;
        l.prototype.parseHtml = l.prototype.parseHtml;
        l.prototype.updateRowExecution = l.prototype.updateRowExecution;
        l.prototype.removeRowExecution = l.prototype.removeRowExecution;
        l.prototype.mergeUpdate = l.prototype.mergeUpdate;
        g(l, d, !1, !0);
        g(l, b, !0, !0);
        return l
    });
    define("AbstractGrid", "Inheritance CellMatrix Executor Cell Helpers FadersHandler AbstractWidget IllegalArgumentException IllegalStateException LoggerManager Environment".split(" "), function (g, f, e, b, d, h, a, c, l, n, k) {
        function m() {
            this._callSuperConstructor(m, arguments);
            this.Ia = !1;
            this.Qh = p;
            this.Cc = !1;
            this.n = null;
            this.Jl = this.Cj = this.Qg = !1;
            this.lf = new h(50);
            this.Pg = this.Og = null;
            this.l = this.m = 0;
            this.H = new f
        }

        k.browserDocumentOrDie();
        var p = ["div", "span", "input"], q = n.getLoggerProxy("lightstreamer.grids");
        m.prototype =
        {
            mergeUpdate: function (a, b) {
                q.isDebugLogEnabled() && q.logDebug(n.resolve(501), this);
                for (var c in b)this.Pg[c] = b[c];
                this.mm(this.Og, b)
            }, mm: function (a, b) {
            for (var c in b)this.H.Gq(a, c, function (d) {
                q.isDebugLogEnabled() && q.logDebug(n.resolve(502), a, c);
                d.ao(null === b[c] ? "" : b[c])
            })
        }, pe: function (a, b) {
            return null != a && null != b || a == b ? this.Qg ? a > b : a < b : null == a ? !this.Qg : this.Qg
        }, setHtmlInterpretationEnabled: function (a) {
            this.Ia = this.checkBool(a)
        }, isHtmlInterpretationEnabled: M("Ia"), setNodeTypes: function (a) {
            if (a && 0 < a.length)this.Qh =
                a; else throw new c("The given array is not valid or empty");
        }, getNodeTypes: M("Qh"), setAddOnTop: function (a) {
            null != this.n && q.logWarn(n.resolve(500));
            this.Cc = this.checkBool(a)
        }, isAddOnTop: M("Cc"), setSort: function (a, b, c, d) {
            a ? (this.n = a, this.Qg = this.checkBool(b, !0), this.Cj = this.checkBool(c, !0), this.Jl = this.checkBool(d, !0), this.vk()) : this.n = null
        }, getSortField: M("n"), isDescendingSort: function () {
            return null === this.n ? null : this.Qg
        }, isNumericSort: function () {
            return null === this.n ? null : this.Cj
        }, isCommaAsDecimalSeparator: function () {
            return null !==
            this.n && this.Cj ? this.Jl : null
        }, extractFieldList: function () {
            return this.Cq(b.St)
        }, extractCommandSecondLevelFieldList: function () {
            return this.Cq(b.Yt)
        }, parseHtml: D(), forceSubscriptionInterpretation: function (b) {
            if (0 < this.m)throw new l("This method can only be called while the grid is empty.");
            if (b) {
                if (b != a.au && b != a.fp)throw new c("The given value is not valid, use UPDATE_IS_KEY or ITEM_IS_KEY.");
                this.Pc = b;
                this.pm = !0
            } else this.pm = !1, this.Lp()
        }, Cq: function (a) {
            a = this.Ml(a);
            var b = [], c;
            for (c in a)b.push(c);
            return b
        }, ib: function (a) {
            return this.Cj ? d.getNumber(a, this.Jl) : null === a ? a : (new String(a)).toUpperCase()
        }, Mt: function (a, c, d) {
            d = d || a;
            var f = c.Rp, g = f + c.kr, h = g + c.dj, l = c.cj, k = c.Il, p = [];
            a = this.H.getRow(a);
            for (var n in a)for (var q = -1, m = a[n], N = 0; m && (m.la || N < m.length); N++) {
                var H = m.la ? m : m[N], m = m.la ? null : m;
                null === H.Pb() && q++;
                var v = this.dr ? this.dr(H, d, n, H.Pb(), q) : H;
                if (null != H.ve) {
                    var I = H.lB(), A = H.Qw(k), F = H.Rw(l);
                    if (F) {
                        var R = !1, L = !1, H = !1, Q = null, S = null, U = null, T = null;
                        F && (F.backgroundColor && (R = !0, Q = F.backgroundColor,
                            S = A.backgroundColor), F.color && (R = !0, U = F.color, T = A.color));
                        R && (0 < f ? (L = e.packTask(v.Xd, v, [I, this.Ia]), A = this.lf.Zq(v, !1, Q, U, f, L), this.lf.Dr(A), L = !0) : this.lf.no(v), 0 < c.dj && (H = e.packTask(v.Eg, v, [I, b.Yo]), A = this.lf.Zq(v, !0, S, T, c.dj, H), e.addTimedTask(this.lf.Dr, g, this.lf, [A]), H = !0));
                        L || (0 < f ? e.addTimedTask(v.Xd, f, v, [I, this.Ia]) : (S = e.packTask(v.Xd, v, [I, this.Ia]), p.push(S)));
                        H || e.addTimedTask(v.Eg, h, v, [I, b.Yo])
                    } else 0 < f ? e.addTimedTask(v.Xd, f, v, [I, this.Ia]) : (S = e.packTask(v.Xd, v, [I, this.Ia]), p.push(S))
                }
            }
            for (c =
                     0; c < p.length; c++)e.executeTask(p[c])
        }, updateRowExecution: D(), removeRowExecution: D(), vk: D(), Ml: D()
        };
        m.prototype.setHtmlInterpretationEnabled = m.prototype.setHtmlInterpretationEnabled;
        m.prototype.isHtmlInterpretationEnabled = m.prototype.isHtmlInterpretationEnabled;
        m.prototype.setNodeTypes = m.prototype.setNodeTypes;
        m.prototype.getNodeTypes = m.prototype.getNodeTypes;
        m.prototype.setAddOnTop = m.prototype.setAddOnTop;
        m.prototype.isAddOnTop = m.prototype.isAddOnTop;
        m.prototype.setSort = m.prototype.setSort;
        m.prototype.getSortField =
            m.prototype.getSortField;
        m.prototype.isDescendingSort = m.prototype.isDescendingSort;
        m.prototype.isNumericSort = m.prototype.isNumericSort;
        m.prototype.isCommaAsDecimalSeparator = m.prototype.isCommaAsDecimalSeparator;
        m.prototype.extractFieldList = m.prototype.extractFieldList;
        m.prototype.extractCommandSecondLevelFieldList = m.prototype.extractCommandSecondLevelFieldList;
        m.prototype.parseHtml = m.prototype.parseHtml;
        m.prototype.forceSubscriptionInterpretation = m.prototype.forceSubscriptionInterpretation;
        m.prototype.updateRowExecution =
            m.prototype.updateRowExecution;
        m.prototype.removeRowExecution = m.prototype.removeRowExecution;
        g(m, a);
        return m
    });
    define("AbstractParent", [], function () {
        function g() {
        }

        g.prototype = {
            da: function () {
                this.length = 0;
                this.Va = {};
                this.vs || (this.map = {})
            }
        };
        return g
    });
    define("VisibleParent", ["AbstractParent", "Inheritance"], function (g, f) {
        function e(b, d, f) {
            this._callSuperConstructor(e);
            this.pd = b;
            this.Sh = d;
            this.Wy = f;
            this.vs = !0;
            this.kg = this.Sh;
            this.da()
        }

        e.prototype = {
            removeChild: function (b) {
                if (!(0 >= this.length)) {
                    this.length--;
                    delete this.Va[b.ca()];
                    var d = b.element();
                    d == this.kg && (this.kg = d.nextSibling);
                    this.pd.removeChild(d);
                    b.rk(null)
                }
            }, insertBefore: function (b, d) {
                d != b && b && (d ? null == this.Va[d.ca()] ? this.appendChild(b, !0) : (this.hh(b), this.pd.insertBefore(b.element(), d.element())) :
                    this.appendChild(b, !0))
            }, appendChild: function (b, d) {
                if (b) {
                    this.hh(b);
                    var e = b.element();
                    d ? (this.kg || (this.kg = e), this.Sh ? this.pd.insertBefore(e, this.Sh) : this.pd.appendChild(e)) : (this.pd.insertBefore(e, this.kg), this.kg = e)
                }
            }, hh: function (b) {
                b.hj(this) || (this.length++, this.Va[b.ca()] = b, b.Um(), b.rk(this))
            }, Ob: function (b) {
                if (this.length <= b)return null;
                b += this.Wy;
                b = this.pd.childNodes[b].getAttribute("id");
                return this.getElementById(b)
            }, getElementById: function (b) {
                return this.Va[b]
            }, clean: function () {
                this.pd && delete this.pd;
                this.Sh && delete this.Sh;
                for (var b in this.Va)this.Va[b].clean()
            }
        };
        f(e, g);
        return e
    });
    define("InvisibleParent", ["AbstractParent", "Inheritance"], function (g, f) {
        function e() {
            this._callSuperConstructor(e);
            this.vs = !1;
            this.da()
        }

        e.prototype = {
            removeChild: function (b) {
                if (!(0 >= this.length)) {
                    this.length--;
                    var d;
                    for (d = this.Va[b.ca()]; d < this.length; d++)this.map[d] = this.map[d + 1], this.Va[this.map[d].ca()] = d;
                    this.Va[b.ca()] = null;
                    this.map[this.length] = null;
                    b.rk(null)
                }
            }, insertBefore: function (b, d) {
                if (d != b && b)if (d)if (null == this.Va[d.ca()])this.appendChild(b, !0); else {
                    b.Um();
                    for (var e = this.Va[d.ca()], a =
                        this.length; a >= e + 1; a--)this.map[a] = this.map[a - 1], this.Va[this.map[a].ca()] = a;
                    this.hh(b, e)
                } else this.appendChild(b, !0)
            }, appendChild: function (b, d) {
                b && (b.Um(), d || 0 == this.length ? this.hh(b, this.length) : this.insertBefore(b, this.map[0]))
            }, hh: function (b, d) {
                this.length++;
                this.Va[b.ca()] = d;
                this.map[d] = b;
                b.rk(this)
            }, Ob: function (b) {
                return this.map[b]
            }, getElementById: function (b) {
                return this.map[this.Va[b]]
            }, clean: function () {
                for (var b = 0; b < this.length; b++)this.map[b].clean()
            }
        };
        f(e, g);
        return e
    });
    define("DynaElement", ["Cell"], function (g) {
        function f(e, b) {
            this.key = e;
            this.Dn = b;
            this.node = this.If = null;
            this.id = "hc6|" + b.ca() + "|" + e
        }

        f.prototype = {
            rk: G("If"), Um: function () {
                this.If && this.If.removeChild(this)
            }, hj: function (e) {
                return this.If == e
            }, getKey: M("key"), ca: M("id"), element: function () {
                if (null != this.node)return this.node;
                this.node = this.Dn.ox();
                this.node.setAttribute("id", this.id);
                for (var e = g.Xi(this.node, this.Dn.getNodeTypes()), b = 0; b < e.length; b++) {
                    var d = e[b], f = d.rf();
                    f && this.Dn.mz(d, this.key, f)
                }
                return this.node
            },
            clean: function () {
                this.node && delete this.node
            }
        };
        return f
    });
    define("VisualUpdate", ["LoggerManager", "Inheritance", "Setter", "IllegalArgumentException"], function (g, f, e, b) {
        function d(a, b, d) {
            this.wl = a;
            this.Lo = b;
            this.key = d;
            this.dj = this.Rp = 0;
            this.kr = 1200;
            this.Il = this.cj = null
        }

        var h = g.getLoggerProxy("lightstreamer.grids");
        d.prototype = {
            getCellValue: function (a, c) {
                var d = this.wl.pf(this.key, a, c);
                if (!d)throw new b("No cell defined for this field");
                d.la || (d = d[0]);
                return d.ve || d.Yf()
            }, setCellValue: function (a, c, d) {
                a = this.wl.pf(this.key, a, d);
                if (!a)throw new b("No cell defined for this field");
                if (a.la)a.ao(c); else for (d = 0; d < a.length; d++)a[d].ao(c)
            }, getChangedFieldValue: function (a) {
                return this.Lo[a] || null
            }, setHotTime: function (a) {
                this.kr = this.checkPositiveNumber(a, !0)
            }, setColdToHotTime: function (a) {
                this.Rp = this.checkPositiveNumber(a, !0)
            }, setHotToColdTime: function (a) {
                this.dj = this.checkPositiveNumber(a, !0)
            }, Ag: function (a, c, d, e, f) {
                a = this.wl.pf(this.key, a, f);
                if (!a)throw new b("No cell defined for this field");
                if (a.la)a.Ag(c, d, e); else for (f = 0; f < a.length; f++)a[f].Ag(c, d, e)
            }, sp: function (a, b, d) {
                this.cj ||
                (this.cj = {}, this.Il = {});
                this.cj[d] = a || "";
                this.Il[d] = b || ""
            }, setAttribute: function (a, b, d) {
                this.sp(a, b, d)
            }, setStyle: function (a, b) {
                this.sp(a, b, "CLASS")
            }, setCellAttribute: function (a, b, d, e, f) {
                this.Ag(a, b, d, e, f)
            }, setCellStyle: function (a, b, d, e) {
                this.Ag(a, b, d, "CLASS", e)
            }, forEachChangedField: function (a) {
                for (var b in this.Lo)try {
                    a(b, this.Lo[b])
                } catch (d) {
                    h.logError(g.resolve(537), d)
                }
            }
        };
        d.prototype.getCellValue = d.prototype.getCellValue;
        d.prototype.setCellValue = d.prototype.setCellValue;
        d.prototype.getChangedFieldValue =
            d.prototype.getChangedFieldValue;
        d.prototype.setHotTime = d.prototype.setHotTime;
        d.prototype.setColdToHotTime = d.prototype.setColdToHotTime;
        d.prototype.setHotToColdTime = d.prototype.setHotToColdTime;
        d.prototype.setAttribute = d.prototype.setAttribute;
        d.prototype.setStyle = d.prototype.setStyle;
        d.prototype.setCellAttribute = d.prototype.setCellAttribute;
        d.prototype.setCellStyle = d.prototype.setCellStyle;
        d.prototype.forEachChangedField = d.prototype.forEachChangedField;
        f(d, e, !0, !0);
        return d
    });
    define("DynaGrid", "Inheritance AbstractGrid Cell VisibleParent InvisibleParent DynaElement BrowserDetection VisualUpdate IllegalArgumentException IllegalStateException LoggerManager ASSERT Environment".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p) {
        function q(a, b) {
            this._callSuperConstructor(q, [a]);
            this.p = 1;
            this.Ng = 0;
            this.jd = null;
            this.Yd = "OFF";
            this.mr();
            (b = this.checkBool(b, !0)) && this.parseHtml()
        }

        p.browserDocumentOrDie();
        var r = k.getLoggerProxy("lightstreamer.grids");
        q.prototype = {
            toString: function () {
                return ["[",
                    this.id, this.m, this.Ng, "]"].join("|")
            }, setMaxDynaRows: function (a) {
                this.l = a && "unlimited" != (new String(a)).toLowerCase() ? this.checkPositiveNumber(a, !0) : 0;
                this.Ba() ? this.Gr() : (this.rl(), this.vk(), this.Hp(1))
            }, getMaxDynaRows: function () {
                return 0 == this.l ? "unlimited" : this.l
            }, goToPage: function (a) {
                if (this.Ba())throw new n("This grid is configured to no support pagination");
                if (0 == this.l)throw new n("Can't switch pages while 'no-page mode' is used");
                a = this.checkPositiveNumber(a);
                this.Hp(a)
            }, getCurrentPages: function () {
                return 0 ==
                this.l ? 1 : this.Ng
            }, setAutoScroll: function (a, b) {
                if (!a)throw new l("The given value is not a valid scroll type. Admitted values are OFF, ELEMENT, PAGE");
                a = (new String(a)).toUpperCase();
                if ("ELEMENT" == a)if (b)this.jd = b; else throw new l("Please specify an element id in order to use ELEMENT autoscroll"); else if ("PAGE" != a && "OFF" != a)throw new l("The given value is not a valid scroll type. Admitted values are OFF, ELEMENT, PAGE");
                this.Yd = a;
                this.Vz()
            }, parseHtml: function () {
                this.parsed = !0;
                var a = this.Hl;
                if (a) {
                    if (e.vd(a))return !0;
                    this.mr()
                }
                a = document.getElementById(this.id);
                if (!this.NB(a))return !1;
                this.zo = a.cloneNode(!0);
                this.zo.removeAttribute("id");
                this.Hl = a;
                var c = a.parentNode;
                a.style.display = "none";
                for (var f = c.childNodes, g = 0, h = 0, k = null, g = 0; g < f.length; g++)if (f[g] == a) {
                    f[g + 1] && (k = f[g + 1]);
                    h = g + 1;
                    break
                }
                this.Y = new b(c, k, h);
                this.qc = new d;
                this.lb = new d;
                return !0
            }, Ml: function (a) {
                for (var b = e.Xi(this.Hl, this.Qh), c = {}, d = 0; d < b.length; d++)if (b[d].Rq() == a) {
                    var f = b[d].rf();
                    f && (c[f] = !0)
                }
                return c
            }, NB: function (a) {
                if (!a)throw new l("No template defined");
                if (!e.Lt(a))throw new l("The template defined for the grid does not define the 'data-source' attribute");
                var b = [];
                a = e.Xi(a, this.Qh);
                for (var c = 0; c < a.length; c++)a[c].rf() && b.push(a[c]);
                if (0 >= b.length)throw new l("No valid cells defined for grid");
                return !0
            }, Vz: function () {
                if (!("ELEMENT" != this.Yd || this.jd && this.jd.appendChild)) {
                    var a = document.getElementById(this.jd);
                    a ? this.jd = a : (r.logError(k.resolve(538), this), this.Yd = "OFF")
                }
            }, mr: function () {
                this.lb = this.qc = this.Y = this.zo = this.Hl = null;
                this.yi = {}
            }, ox: function () {
                return this.zo.cloneNode(!0)
            },
            mz: function (a, b, c) {
                this.H.addCell(a, b, c)
            }, clean: function () {
                this._callSuperMethod(q, "clean")
            }, eC: function () {
                if ("OFF" == this.Yd)return !1;
                if (this.Ba()) {
                    var b = "ELEMENT" == this.Yd ? this.jd : document.body;
                    return this.Cc ? 0 == b.scrollTop : a.isProbablyOldOpera() ? !0 : 1 >= Math.abs(b.clientHeight + b.scrollTop - b.scrollHeight)
                }
                return !0
            }, Pw: function (a) {
                var b = "PAGE" == this.Yd ? document.body : this.jd;
                return this.Ba() ? this.Cc ? 0 : b.scrollHeight - b.clientHeight : a.offsetTop - b.offsetTop
            }, yv: function (a) {
                r.isDebugLogEnabled() && r.logDebug(k.resolve(540),
                    this, a);
                "PAGE" == this.Yd ? window.scrollTo(0, a) : this.jd.scrollTop = a
            }, vk: function () {
                for (var a = this.n, b = new d, c = 1; 0 < this.m;) {
                    var e = this.Zg(c);
                    if (e)if (null == a)b.appendChild(e, !0), this.m--; else {
                        var f = e.getKey();
                        if ("" == f)this.m--, c++; else {
                            for (var f = this.ib(this.L.get(f, this.n)), g = 0, h = b.length - 1; g < h;) {
                                var l = Math.floor((g + h) / 2), m = b.Ob(l);
                                (m = this.ib(this.L.get(m.getKey(), this.n))) || r.logWarn(k.resolve(539), this);
                                this.pe(f, m) ? h = l - 1 : g = l + 1
                            }
                            m = b.Ob(g);
                            g == h ? (g = this.ib(this.L.get(m.getKey(), this.n)), this.pe(f, g) ? b.insertBefore(e,
                                m) : (f = b.Ob(h + 1)) ? b.insertBefore(e, f) : b.appendChild(e, !0)) : m ? b.insertBefore(e, m) : b.appendChild(e, !0);
                            this.m--
                        }
                    } else this.m--, c++
                }
                for (; 0 < b.length;)this.m++, a = b.Ob(0), this.m <= this.l * (this.p - 1) ? this.lb.appendChild(a, !0) : 0 >= this.l || this.m <= this.l * this.p ? this.Y.appendChild(a, !0) : this.qc.appendChild(a, !0)
            }, Hp: function (a) {
                if (!(0 >= this.m)) {
                    if (this.p >= a)for (; this.Mh(this.lb, this.Y, (a - 1) * this.l);)this.Mh(this.Y, this.qc, this.l); else for (; this.qd(this.Y, this.lb, (a - 1) * this.l, !1);)this.qd(this.qc, this.Y, this.l,
                        !1);
                    this.p = a
                }
            }, rl: function () {
                r.isDebugLogEnabled() && r.logDebug(k.resolve(541), this);
                var a = 0, a = 0 >= this.l ? 1 : Math.ceil(this.m / this.l);
                this.Ng != a && (this.Ng = a, this.dispatchEvent("onCurrentPagesChanged", [this.Ng]));
                return a
            }, removeRowExecution: function (a) {
                var b = this.yi[a];
                if (b) {
                    this.m--;
                    this.rl();
                    var c = !1, d = this.lb, e = this.qc;
                    this.dispatchEvent("onVisualUpdate", [a, null, b.element()]);
                    this.Ba() && (this.Cc && null == this.n) && (c = this.Cc, d = this.qc, e = this.lb);
                    b.hj(this.Y) ? (this.Y.removeChild(b), this.qd(e, this.Y, this.l,
                        c)) : b.hj(e) ? e.removeChild(b) : (this.lb.removeChild(b), this.qd(this.Y, d, this.l * (this.p - 1), c) && this.qd(e, this.Y, this.l, c));
                    this.H.delRow(a);
                    delete this.yi[a]
                }
            }, updateRowExecution: function (a, b) {
                var c = !1, d = this.yi[a];
                d || (d = new h(a, this), this.yi[a] = d, d.element());
                m.verifyOk(d);
                this.mm(a, b);
                var e = this.Yl(a, b, d), f = this.eC(), g = !this.L.getRow(a), k = null != this.n ? this.ib(this.L.get(a, this.n)) : null, l = null != this.n ? this.ib(b[this.n]) : null, n = k == l || !b[this.n] && null !== b[this.n];
                null != this.n && !1 == n ? (k = this.sl(d, k, l),
                    this.Lx(k, d), g && (this.m++, c = !0)) : g && (this.xp(d, !this.Cc), this.m++, c = !0);
                this.Mt(a, e);
                this.Od = null;
                g && this.Ba() && this.Gr();
                f && d.hj(this.Y) && (d = this.Pw(d.element()), this.yv(d));
                c && this.rl()
            }, Yl: function (a, b, d) {
                this.Og = a;
                this.Pg = b;
                b = new c(this.H, b, a);
                this.dispatchEvent("onVisualUpdate", [a, b, d.element()]);
                this.Pg = this.Og = null;
                return b
            }, sl: function (a, b, c) {
                for (var d = 1, e = this.m, f = -1; d < e;) {
                    var f = Math.floor((d + e) / 2), g = null;
                    f <= this.m && (g = this.Zg(f), g = g == a ? b : this.ib(this.L.get(g.getKey(), this.n)));
                    this.pe(c,
                        g) ? e = f - 1 : d = f + 1
                }
                return d == e ? (g = this.Zg(d), a = this.ib(this.L.get(g.getKey(), this.n)), this.pe(c, a) ? d : d + 1) : d
            }, Zg: function (a) {
                if (a > this.m || 0 >= a)return null;
                if (a <= this.lb.length)return this.lb.Ob(a - 1);
                a -= this.lb.length;
                if (a <= this.Y.length)return this.Y.Ob(a - 1);
                a -= this.Y.length;
                return this.qc.Ob(a - 1)
            }, xp: function (a, b) {
                var c = b ? this.lb : this.qc, d = b ? this.qc : this.lb;
                if (0 < d.length || this.Y.length == this.l && 0 < this.l)return d.appendChild(a, b), d;
                if (0 < this.Y.length || c.length == this.l * (this.p - 1))return this.Y.appendChild(a,
                    b), this.Y;
                c.appendChild(a, b);
                return c
            }, Lx: function (a, b) {
                if (!(a > this.m + 1 || 0 >= a) && b != this.Zg(a)) {
                    var c = b.If, d, e = this.Y, f = this.qc, g = this.lb, h = this.Zg(a);
                    null == h ? d = this.xp(b, !0) : (d = h.If, d.insertBefore(b, h));
                    d == e ? c && c != f ? c == g && this.qd(e, g, this.l * (this.p - 1), !1) : this.Mh(e, f, this.l) : d == g ? c != g && this.Mh(g, e, this.l * (this.p - 1)) && this.Mh(e, f, this.l) : d == f && (c == g && this.qd(e, g, this.l * (this.p - 1), !1), this.qd(f, e, this.l, !1))
                }
            }, qd: function (a, b, c, d) {
                return 0 >= this.l ? !1 : b.length < c && 0 < a.length ? (a = a.Ob(0), b.appendChild(a,
                    !d), !0) : !1
            }, Mh: function (a, b, c) {
                return 0 >= this.l ? !1 : a.length > c ? (a = a.Ob(a.length - 1), b.insertBefore(a, b.Ob(0)), !0) : !1
            }, Gr: function () {
                for (; 0 < this.l && this.m > this.l;)this.removeRow(this.ar())
            }, addListener: function (a) {
                this._callSuperMethod(q, "addListener", [a])
            }, removeListener: function (a) {
                this._callSuperMethod(q, "removeListener", [a])
            }, getListeners: function () {
                return this._callSuperMethod(q, "getListeners")
            }
        };
        q.prototype.setMaxDynaRows = q.prototype.setMaxDynaRows;
        q.prototype.getMaxDynaRows = q.prototype.getMaxDynaRows;
        q.prototype.goToPage = q.prototype.goToPage;
        q.prototype.getCurrentPages = q.prototype.getCurrentPages;
        q.prototype.setAutoScroll = q.prototype.setAutoScroll;
        q.prototype.parseHtml = q.prototype.parseHtml;
        q.prototype.clean = q.prototype.clean;
        q.prototype.addListener = q.prototype.addListener;
        q.prototype.removeListener = q.prototype.removeListener;
        q.prototype.getListeners = q.prototype.getListeners;
        q.prototype.updateRowExecution = q.prototype.updateRowExecution;
        q.prototype.removeRowExecution = q.prototype.removeRowExecution;
        g(q, f);
        return q
    });
    define("SlidingCell", [], function () {
        function g(e, b, d, g, a) {
            this.Kz = e;
            this.key = b;
            this.field = d;
            this.jb = g || null;
            this.Sr = a;
            this.Ig = "s" + f++
        }

        var f = 0;
        g.prototype = {
            Vg: function () {
                var e = this.Kz.jw(this.key, this.field, this.jb);
                if (!e)return null;
                if (e.la) {
                    if (this.jb === e.Pb() && 0 >= this.Sr)return e
                } else for (var b = -1, d = 0; d < e.length; d++) {
                    var f = e[d].Pb();
                    null === f && b++;
                    if (this.jb === f && this.Sr == b)return e[d]
                }
                return null
            }, Lm: function () {
                var e = this.Vg();
                return e ? e.Lm() : null
            }, um: function () {
                var e = this.Vg();
                return e ? e.um() : null
            },
            Wg: function () {
                var e = this.Vg();
                return e ? e.Wg() : null
            }, Eg: function (e, b) {
                var d = this.Vg();
                d && d.Eg(e, b)
            }, Xd: function (e, b) {
                var d = this.Vg();
                d && d.Xd(e, b)
            }
        };
        return g
    });
    define("DoubleKeyMap", ["IllegalArgumentException"], function (g) {
        function f() {
            this.map = {};
            this.Eh = {}
        }

        function e(b) {
            return null !== b && "undefined" != typeof b
        }

        function b(b, a, c) {
            var d = b[c];
            e(d) && (delete b[c], delete a[d])
        }

        function d(b, a) {
            for (var c in b)a(c, b[c])
        }

        f.prototype = {
            set: function (b, a) {
                var c = this.map, d = this.Eh;
                if (!e(b) || !e(a))throw new g("values can't be null nor missing");
                var f = c[b], k = d[a];
                e(f) ? f !== a && (e(k) ? (c[k] = f, c[b] = a, d[a] = b, d[f] = k) : (delete d[c[b]], c[b] = a, d[a] = b)) : e(k) ? (delete c[d[a]], d[a] = b, c[b] =
                    a) : (c[b] = a, d[a] = b)
            }, remove: function (d) {
                b(this.map, this.Eh, d)
            }, removeReverse: function (d) {
                b(this.Eh, this.map, d)
            }, get: function (b) {
                return this.map[b]
            }, getReverse: function (b) {
                return this.Eh[b]
            }, exist: function (b) {
                return "undefined" != typeof this.get(b)
            }, existReverse: function (b) {
                return "undefined" != typeof this.getReverse(b)
            }, forEach: function (b) {
                d(this.map, b)
            }, forEachReverse: function (b) {
                d(this.Eh, b)
            }
        };
        f.prototype.set = f.prototype.set;
        f.prototype.remove = f.prototype.remove;
        f.prototype.removeReverse = f.prototype.removeReverse;
        f.prototype.get = f.prototype.get;
        f.prototype.getReverse = f.prototype.getReverse;
        f.prototype.exist = f.prototype.exist;
        f.prototype.existReverse = f.prototype.existReverse;
        f.prototype.forEach = f.prototype.forEach;
        f.prototype.forEachReverse = f.prototype.forEachReverse;
        return f
    });
    define("StaticGrid", "Inheritance AbstractGrid VisualUpdate Cell SlidingCell CellMatrix IllegalArgumentException IllegalStateException Helpers ASSERT LoggerManager DoubleKeyMap Environment".split(" "), function (g, f, e, b, d, h, a, c, l, n, k, m, p) {
        function q(a, b, c, d) {
            this._callSuperConstructor(q, [a]);
            this.xq = !1;
            this.Ws = null;
            this.setRootNode(c || document);
            this.yo = [];
            d && this.addCell(d);
            this.O = new m;
            this.Yb = null;
            (b = this.checkBool(b, !0)) && this.parseHtml()
        }

        function r(a, b, c) {
            var d = a[b];
            a[b] = a[c];
            a[c] = d
        }

        p.browserDocumentOrDie();
        var t = k.getLoggerProxy("lightstreamer.grids");
        q.prototype = {
            toString: function () {
                return ["[", this.id, "]"].join("|")
            }, addCell: function (c) {
                if (!c)throw new a("The given cell is null or undefined");
                if (l.isArray(c))for (var d = 0; d < c.length; d++)this.addCell(c[d]); else {
                    c = new b(c);
                    d = c.fr();
                    if (!d || d != this.id)throw new a("The cell does not belong to the Grid");
                    this.xq = !0;
                    this.yo.push(c)
                }
            }, setRootNode: function (b) {
                if (b && b.getElementsByTagName)this.Ws = b; else throw new a("The given root element is not valid");
            }, extractItemList: function () {
                this.xl();
                if (!1 === this.Yb)throw new c("Can\ufffdt extract schema from cells declared with the data-row property; use data-item instead.");
                var a = this.hv(), b = [], d;
                for (d in a)b.push(d);
                return b
            }, parseHtml: function () {
                this.parsed = !0;
                this.H.Ou();
                var a;
                this.xq ? (a = this.yo, this.yo = []) : a = b.Xi(this.Ws, this.Qh);
                for (var d = 0; d < a.length; d++) {
                    var e = a[d].fr();
                    if (e && e == this.id && (e = a[d].getRow())) {
                        isNaN(e) || (e = Number(e));
                        if (null === this.Yb)this.Yb = isNaN(e); else if (this.Yb != isNaN(e))throw c("Can\ufffdt mix data-item and data-row declarations on the same grid");
                        this.Yb || (this.l = e > this.l ? e : this.l);
                        a[d].rf() && (this.H.xu(a[d]) || this.H.addCell(a[d]))
                    }
                }
                mtx = this.H.getEntireMatrix();
                for (var f in mtx)return;
                throw new c("Please specify at least one cell");
            }, Ml: function (a) {
                var b = {};
                this.H.Wv(function (c, d, e) {
                    c.Rq() == a && (b[e] = !0)
                });
                return b
            }, hv: function () {
                var a = this.H.getEntireMatrix(), b = {}, c;
                for (c in a)b[c] = !0;
                return b
            }, updateRowExecution: function (a, b) {
                var c = !this.L.getRow(a), d;
                if (this.Yb)d = a; else {
                    d = null != this.n ? this.ib(this.L.get(a, this.n)) : null;
                    var e = null != this.n ?
                        this.ib(b[this.n]) : null, f = d == e || "undefined" == typeof b[this.n];
                    d = null != this.n && !1 == f ? this.sl(a, d, e) : c ? this.Cc ? 1 : this.Ba() ? this.m == this.l ? this.m : this.m + 1 : this.m + 1 : this.O.get(a);
                    this.Ba() && (this.l == this.m && c && null != this.n) && (c = this.Xs(this.ar()), c < d && d--, this.O.set(a, c), this.m++, c = !1);
                    this.O.existReverse(d) && this.O.getReverse(d) != a && this.Jr(d, a);
                    this.O.set(a, d)
                }
                c && this.m++;
                !this.Ba() && (d > this.l && !this.H.getRow(d)) && (c = this.H.getRow(d - 1), c = h.$f(c, null, this.Ia), this.H.insertRow(c, d));
                this.mm(d, b);
                c = this.Yl(a,
                    d, b);
                this.Mt(d, c, a)
            }, Yl: function (a, b, c) {
                this.Og = b;
                this.Pg = c;
                c = new e(this.H, c, b);
                this.dispatchEvent("onVisualUpdate", [a, c, b]);
                this.Pg = this.Og = null;
                return c
            }, dr: function (a, b, c, e, f) {
                return this.Yb ? a : new d(this, b, c, e, f)
            }, jw: function (a, b, c) {
                a = this.O.get(a);
                return this.H.pf(a, b, c)
            }, removeRowExecution: function (a) {
                var b = this.Yb ? a : this.O.get(a);
                this.dispatchEvent("onVisualUpdate", [a, null, b]);
                this.Yb || (b != this.m && (this.Jr(this.m, a), b = this.O.get(a)), n.verifyValue(this.m, b) || t.logError(k.resolve(542)));
                this.H.om(b,
                    function (a) {
                        a.clean()
                    });
                this.m--;
                this.Yb || this.O.remove(a)
            }, Xs: function (a) {
                var b = this.O.get(a);
                this.O.remove(a);
                this.m--;
                this.L.delRow(a);
                this.Ba() && this.Ns(a);
                return b
            }, Jr: function (a, b) {
                var c = this.O.get(b);
                if (a != c) {
                    var d = c ? h.$f(this.H.getRow(c), null, this.Ia) : null, e = c ? this.O.getReverse(c) : null, f, g, k;
                    c ? c > a ? (g = c - 1, k = a, f = -1) : (g = c + 1, k = a, f = 1) : null != this.n || this.Cc ? (k = a, g = this.m, f = -1) : (g = 1, k = a, f = 1);
                    for (var l = g; l - f != k; l += f) {
                        var m = l - f, p = this.H.getRow(l), q = this.H.getRow(m);
                        q || this.Ba() || (q = {}, this.H.insertRow(q,
                            m), n.verifyNotOk(c));
                        q ? (h.$f(p, q, this.Ia), p = this.O.getReverse(l), this.O.set(p, m)) : (n.verifyOk(this.Ba()), n.verifyValue(l, g), p = this.O.getReverse(l), this.Xs(p))
                    }
                    d ? (h.$f(d, this.H.getRow(a), this.Ia), this.O.set(e, a)) : this.H.om(a, function (a) {
                        a.clean()
                    })
                }
            }, sl: function (a, b, c) {
                for (var d = 1, e = this.m, f = -1; d < e;) {
                    var f = Math.floor((d + e) / 2), g = null;
                    f <= this.m && (g = this.O.getReverse(f), g = g == a ? b : this.ib(this.L.get(g, this.n)));
                    this.pe(c, g) ? e = f - 1 : d = f + 1
                }
                return d == e ? (g = this.O.getReverse(d), a = this.ib(this.L.get(g, this.n)),
                    this.pe(c, a) ? d : d + 1) : d
            }, Pz: function (a, b, c, d) {
                var e = this.ib(this.L.get(a[d], this.n));
                r(a, c, d);
                for (d = b; b < c; b++) {
                    var f = this.ib(this.L.get(a[b], this.n));
                    this.pe(e, f) || (r(a, b, d), d++)
                }
                r(a, d, c);
                return d
            }, Kn: function (a, b, c) {
                if (b < c) {
                    var d = this.Pz(a, b, c, Math.round(b + (c - b) / 2));
                    this.Kn(a, b, d - 1);
                    this.Kn(a, d + 1, c)
                }
            }, vk: function () {
                if (!this.Yb) {
                    var a = {};
                    this.O.forEachReverse(function (b, c) {
                        a[b] = c
                    });
                    this.Kn(a, 1, this.m);
                    var b = {}, c = new m, d;
                    for (d in a)if (c.set(a[d], d), oldKeyPerPos = this.O.getReverse(d), a[d] != oldKeyPerPos) {
                        var e =
                            this.H.getRow(d);
                        b[oldKeyPerPos] = h.$f(e, null, this.Ia);
                        var f = a[d], f = b[f] ? b[f] : this.H.getRow(this.O.get(f));
                        h.$f(f, e, this.Ia)
                    }
                    this.O = c
                }
            }, addListener: function (a) {
                this._callSuperMethod(q, "addListener", [a])
            }, removeListener: function (a) {
                this._callSuperMethod(q, "removeListener", [a])
            }, getListeners: function () {
                return this._callSuperMethod(q, "getListeners")
            }
        };
        q.prototype.addCell = q.prototype.addCell;
        q.prototype.setRootNode = q.prototype.setRootNode;
        q.prototype.extractItemList = q.prototype.extractItemList;
        q.prototype.parseHtml =
            q.prototype.parseHtml;
        q.prototype.addListener = q.prototype.addListener;
        q.prototype.removeListener = q.prototype.removeListener;
        q.prototype.getListeners = q.prototype.getListeners;
        q.prototype.updateRowExecution = q.prototype.updateRowExecution;
        q.prototype.removeRowExecution = q.prototype.removeRowExecution;
        g(q, f);
        return q
    });
    define("StatusWidget", "Environment IllegalArgumentException Helpers LightstreamerConstants Executor BrowserDetection".split(" "), function (g, f, e, b, d, h) {
        function a(a, b, c, g, h) {
            if (!p) {
                this.Ne = "closed";
                this.Gz = !1 !== h;
                this.Db = this.Oo = this.mg = this.Ca = null;
                a = a || "left";
                if (!E[a])throw new f("The given value is not valid. Admitted values are no, left and right");
                this.Nm = "left" === a;
                h = c ? b : "auto";
                b = c ? "auto" : b;
                this.bd = k("div");
                this.Ca = k("div");
                n(this.Ca, {
                    width: "270px", height: "40px", backgroundColor: "#dddddd", opacity: "0.85",
                    filter: "alpha(opacity\x3d85)", boxShadow: "1px 1px 5px #999999"
                });
                "no" == a ? (this.My = !0, n(this.Ca, {position: "absolute", borderRadius: "8px"})) : (n(this.Ca, {
                    position: "fixed",
                    top: h,
                    bottom: b,
                    zIndex: "99999",
                    "transition-duration": "1s",
                    MozTransitionDuration: "1s",
                    "-webkit-transition-duration": "1s",
                    OTransitionDuration: "1s",
                    "-ms-transition-duration": "1s",
                    "transition-timing-function": "ease",
                    MozTransitionTimingFunction: "ease",
                    "-webkit-transition-timing-function": "ease",
                    OTransitionTimingFunction: "ease",
                    "-ms-transition-timing-function": "ease",
                    "transition-property": a,
                    MozTransitionProperty: a,
                    "-webkit-transition-property": a,
                    OTransitionProperty: a,
                    "-ms-transition-property": a
                }), "left" == a ? n(this.Ca, {
                    left: "-225px",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px"
                }) : n(this.Ca, {right: "-225px", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}));
                h = k("td");
                n(h, {
                    width: "70px",
                    height: "40px",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "10px",
                    color: "#333333",
                    fontWeight: "bolder",
                    textShadow: "2px 2px 3px white, -2px 2px 3px white, 2px -2px 3px white, -2px -2px 3px white",
                    verticalAlign: "middle",
                    padding: "0"
                });
                h.innerHTML = "REAL-TIME\x3cbr/\x3eSERVER";
                this.mg = k("td");
                n(this.mg, {
                    width: "150px",
                    height: "40px",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "10px",
                    color: "#333333",
                    textShadow: "1px 1px 1px white",
                    verticalAlign: "middle",
                    padding: "0"
                });
                b = k("table");
                n(b, {
                    position: "absolute",
                    left: "left" == a || "no" == a ? "0px" : "50px",
                    borderSpacing: 0,
                    border: 0,
                    tableLayout: "fixed",
                    width: "220px"
                });
                c = k("tr");
                "right" == a ? m(c, [this.mg, h]) : m(c, [h, this.mg]);
                h = k("tbody");
                h.appendChild(c);
                b.appendChild(h);
                h = k("div");
                n(h, {
                    position: "absolute",
                    top: "4px",
                    width: "1px",
                    height: "32px",
                    backgroundColor: "#555555",
                    boxShadow: "1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white"
                });
                var l = k("div");
                n(l, {
                    position: "absolute",
                    height: "32px",
                    top: "4px",
                    width: "1px",
                    backgroundColor: "#555555",
                    boxShadow: "1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white"
                });
                this.Db = k("div");
                n(this.Db, {
                    position: "absolute", top: "0px", width: "4px",
                    height: "40px"
                });
                c = k("div");
                n(c, {position: "absolute", top: "0px", width: "35px", height: "35px", paddingTop: "5px"});
                "no" == a ? (c.style.left = "233px", h.style.left = "70px", l.style.left = "220px", m(this.Ca, [b, h, l, c])) : ("left" == a ? (h.style.left = "70px", l.style.left = "220px", this.Db.style.left = "228px", c.style.left = "233px", this.Db.innerHTML = "\x3cdiv style\x3d'position: absolute; left: 0px; top: 16px; width: 1px; height: 7px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 1px; top: 17px; width: 1px; height: 5px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 2px; top: 18px; width: 1px; height: 3px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 3px; top: 19px; width: 1px; height: 1px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e",
                    m(this.Ca, [b, h, l, this.Db, c])) : (h.style.right = "70px", l.style.right = "220px", this.Db.style.right = "228px", c.style.right = "233px", this.Db.innerHTML = "\x3cdiv style\x3d'position: absolute; left: 0px; top: 19px; width: 1px; height: 1px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 1px; top: 18px; width: 1px; height: 3px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 2px; top: 17px; width: 1px; height: 5px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 3px; top: 16px; width: 1px; height: 7px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e",
                    m(this.Ca, [h, l, this.Db, c, b])), e.addEvent(this.bd, "mouseover", this.Ow()), e.addEvent(this.bd, "click", this.kw()), a = this.qx(), e.addEvent(this.bd, "transitionend", a), e.addEvent(this.bd, "webkitTransitionEnd", a), e.addEvent(this.bd, "MSTransitionEnd", a), e.addEvent(this.bd, "oTransitionEnd", a));
                this.mg.innerHTML = "Ready";
                this.bd.appendChild(this.Ca);
                this.Mn = this.mb = !1;
                this.pl = null;
                this.hl();
                this.ni = this.R = null;
                this.mi = !1;
                g = g || "dyna";
                if (!C[g])throw new f("The given value is not valid. Admitted values are open, closed and dyna");
                "closed" != g && (this.Uh(!0), "dyna" == g && d.addTimedTask(this.Uh, 1E3, this));
                this.Fx(c)
            }
        }

        function c(a) {
            var b = k("img");
            b.src = a;
            n(b, {display: "none"});
            return b
        }

        function l() {
            for (var a = {}, b = 0; b < arguments.length; b++)a[arguments[b]] = !0;
            return a
        }

        function n(a, b) {
            for (var c in b)a.style[c] = b[c]
        }

        function k(a) {
            a = document.createElement(a);
            n(a, {backgroundColor: "transparent"});
            return a
        }

        function m(a, b) {
            for (var c = 0; c < b.length; c++)a.appendChild(b[c])
        }

        g.browserDocumentOrDie();
        var p = h.isProbablyIE(6, !0), q = c("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALDwAACw8BkvkDpQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuN6eEncwAAAQDSURBVFhH7ZZtaJVlGMet1IpcgZHVF6XQCAJBxVkUEeGG7KzlS8xe9PiyM888vnBg7gyXExbOkmDH3M7mmmVDK9nOKJ2bw41UfJ3tKCgOF80PRUUvREQQZNvd7/9wP3US5vN4Zh8CBz/uc3au+3/9n+u5X64xY279/Z8r0Hn+zXGQDWGogRbohuNwFNqhCabftOdEbAK8BltgLzRbkozH4ApchSE4CE/dlOQITYZqWAUTXdGSd0smQR6UQR20RHatPrz+/chJPidhJ1TAQph8w2ZIlmXL+wvjLAkgNAPegjdgAUyDh+BReAZC0AAXYRiM5U/GJpjgywgJp8KXYCDOxBzotWIhifz0fVUWPAshSyljHbRA8+XByo8/ORk719xTumff0Q1P+EqsIBLeCZdtcrOlrfQz92miuyM9iEfhNPwOG+HedHG+T4IF0AQ/goFhuARvQ/Z1zZC40E2++1iFWdawzCljuLHIdJ2NSkiCotjrqYgZB/Ohy5r4gzGlio04l+RVroGK1mJTWFuIgbBZmSgw3Z+vd5MPInKbl4FrKnMfc8Z7ziH5q66B2L4ikx/PN8HEYrOiLs/s7FzuGvjUUyjTAJKPh/Mykegucwzkx+eZxe/kmlB9wFz8olwmzmSq72seyR+GlEys2xPEQMDk1TxnCuLPm5KmfHNhoHwIE4/5Ess0yO6GzQf6qn+NNC81gZocx4R4qXau2d6x5Pi2jkV3Z6rve55Ov/bU1opNyVXfvLB97t8mZOSVhrzv4l3RGDH3+BbMNFBro3p/JLhwR06/WwmNMrW5LfzDwdTWTelHdaZ5POd19K65q7Zz6YlFO/6phl7PGl6TXhcmKvX6PIVGE8ACfDzVXzZU3BhwFqYqoYWqBWu3cJ8W8mhyeM7FRN+5/jJTlAg4W1RbVVtWW9ea0Fb2Png8M40QgIEOHcm17UHnkAomXnYM6PByDzIdar70ERrrK9AGEX87fC0Dh3rXcky/6NwXOrY3thSnG6gaUZfJy+Ew/Ay6JFohF+7wMkPMOvdS6jwTvRpuDDkGdHHpAkurQOH1DIxFZB7o2vzKFWT8FuqhAB645kK5n/9VwW/W/Iq1763usn3CMFf3kbTkAze0Gw71ls/+6MiG5IFTsUsDVyqTJPgQNKrJULOhxkNVywZnm5G4yCY/y5hLQjWoqoCamWlelXR+V5tk2yW1TW4LpXbqAtTbJE8zPgIPwlSYD2rLtsFM6ZBwJqh9i8O/mhS/RqYgpgbydWiENjWYNJrdfG6FBMQgICOuqE4/UMOqxnWKr2ReQQg9Cert1WKr1R4E9fut8IFFrbla9CWQ5aXp+3fEpsMuUG+vRSV6bHKVtwTmwH93yPh2eytwFBX4C/nwkj6r2tmsAAAAAElFTkSuQmCC"),
            r = c("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALDgAACw4BQL7hQQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAD00lEQVRYR+2WWWhUVxzG1bq0aBQsbi+KoiIIgpbGFsW3SmlB1AcfVEQxLi9CFjohZt/IIlRCJqNmAnGIEsjEENCEyczEKCpGM9rEYqlQ81BpCy2IlEJBTa6/73JOSYV4rxP7UHDgx5lkzvm+7557lv+0ae8//+cZGBgYmAWZcAy+hQ5IwA24BpchDBve2XMiNg/2QRVcgIihk/Y6jMILGIMr8Pk7MUdoOVTDUVhoRaurqxfDV/ANBKGjpqYmXldXd4vvnXAWTsJuWP7WYTDLMNP7jPYTCSC0EWqhAnbBGlgKq2ArZMEZ+B7GwTG8pA3DPF9BMFwNP4EDpxn4BdwxYlkSGR0dzYBtkGXIow1CB0SGh4fbe3p67kej0bbu7u71vozVCcM58KMxd5qbm6/ap6mvr08ing234W8ogPkTxfl7MeyCMPwBDozDQzgFmW8Mg/Eea97V1eWUlpa601hZWenE43EJSVAc8Xoq+syCnRAzIZ7T3tOMTToW83IbIBgMOgUFBW6A4uJiJ5FIWPPHiEz3CvDazCxgzGzPMZjvtQEaGhqcvLw817yoqMhpa2uzAbo9hdLtgPls+E4h2tvb3QC5ublOfn6+U1JS4qRSKYUYTFff1zjMl8E9hWDhuSGys7PdIBUVFc7Q0NAYIdb6Eku3k9kNJclk8s/a2lonJyfHDSE0G62trTdaWlo+Slff9zidfv39/Sebmpp+sTNhgxQWFv7GugjQZ65vwXQ7am2Ew+EDgUDgBxtArUKFQqHfCVk08ahO18dzXCwW+zASidwkyD+vRK+HO8DR6yJEsV6fp9BUOrAA1w0ODo6VlZW5C9POhBas2cIpLeSpeHiOJUSKEO4ZoUWpIHod2romhLay98Hj6TRJBwL06EhmN7iHlIIogA4ve5DpUPOlj9BMXx1NJ/rPgCcK0NfX55rruNax3djYODFA+aS6DD4IcXgKuiSisB0+8ApDnxP2UmJRvqiqqnID6OLSBTZhBva8KcBMRL4EXZs/W0HaXyEEO2DRaxfKx/yvHP4y4Q9xSMVMnTDO1Y23W0OIR2+1G7hqPyV9Z29v78ORkZFODC6CWhUZKjZUeGjWMsHdZhgfNuZ3abdjqAJV5ipm1njNpPu7yiRTLqlssiWUyqkHEDImW2hXwhJYDTtBZVkdbJIOhptA5dtp+FeR4jfICsRUQBbCObikApNCM8H3KDRBAL5WECuK2UJQwarCdYUvM69OCH0Gqu1VYqvUfgyq96Nw3qDSXCX6fsjw0vT9O2IboAVU29tP0phreo/DZvjvDhnfad93nMIMvAIArtySMI7UCwAAAABJRU5ErkJggg\x3d\x3d"),
            t = c("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALDgAACw4BQL7hQQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAECElEQVRYR+2WX2hbZRjGp9uq4qqguOnNhrKJIAycWJWJdw5RkM2LXaiIYnXeCMLYwLkJFQeK4G5mVOqFQ0VoK+iyxJg2bZrEpK3LRpqky9iyLq3705b9UcSBs/38PWffGWfV5JxOxxC8+PGlzTnv++T9vvf9nnmhUGje1eSqJtcP/28LqE3tWwgtsAE+gA7ohjQkIQztsLLeNs+5AgRbBM/CO/AF7LJ0sfbDETgP07AHHm50xgILINBS2A6vwC1u0P6R/sXwBGyCndCRGknFMwdSP/C5Cz6GLfA0LJ0txlcAyZptec+y3q8ABLoP3oW3YR2sgNvhLngEWuEjKMIMGMsfrO2wyBXSUAAJl8NhMLCDFx+DQRusVUHO/fZjMzwKrZaNrDuhA3ad+XnoqyMncvsqP2U/P3Qse2/gCpDwOqjY5CZfzfa6vyZTSfUQ/HXIwTl4A27yBufvxbAO2mEKDMxAGd6HloZtSOL1bvLK8QGTKCUulLHcZ8YmMgqkgOJlv0HGMwthLcSsiN9Z86pY3S0geZsrYKCaNPFi3BHQV4qa8cmMm7xKkGv8BMyqzM280+R7Bkj+jCsgd6jPRAtRqhA3vcWIKdd6XQHfzCX53z3bqAJNCNgvEaXxrCMgWthj4sNhqhAxp87mJGLgiglQYJLfAXmJSB9MICBiIoVvWXezHVFz6kxuGhF3/xMRQeaAuuGt0cn8L6lKAgFhR4T4vrjbFGo96f212A2XK8JXgBtY0+/oVH7LYDV5TBVwRWjtLkVOFMYym3nmxrkKCSzAI6QpP5p6PjYcHvGKkKihav8kIrd6R7WfoDkLuChkInV9sZbIxIa91QgbbZO2CxHbNMyumAA7hu+ZOp2dTpYjzsG8cEAjzoG1LbxXB/lfuQ3rBaEL9iLCaU21qFpVLavWtSLUyhcHT+C7wK907vcIiGgkF48mnCGVKHU7AjS83EGmoVYv3iVngEALgia2W3At74xLQG0iTRW+c8a1xvbA4aRXQFtdAbz8AsThNOiS6IQ1MN9PDM+85l5KtZOZ87qoJEAXly4wTwXWNxKwgCCPg67NMc8td5zPIXgKbpt1odzK/9rgVyv+xfSBVMz6hBmu7j5P8oONuuEvbVibyD2AcegaPZkrYya6SPAlaJXJkNmQ8VDVWsBpMxK/ZJMPsa4hoQyqKiAzsyJQF8gmWbsk2+RaKNmpYQjZJKtZ74QlsBzWgmzZe7DK3h+rSCr7tgMuMSmBbkMCLQMZyDfhE/haBhOj2c3nTvgQNsOTEuId1SSUYZVxXeZ3ftzv/TzhQwSTt5fFltWugvx+J3xmkTWXRX8OmoMm9hVAsJXwKcjb61CJHptc5X0VHoS6QyaImMu+C4IED/LM/wL+BDxNDVItZyFPAAAAAElFTkSuQmCC"),
            s = !1, E = l("no", "left", "right"), C = l("dyna", "open", "closed"), y = function () {
                for (var a = ["animationName", "WebkitAnimationName", "MozAnimationName", "OAnimationName", "msAnimationName"], b = document.createElement("div").style, c = 0; c < a.length; c++)if ("undefined" != typeof b[a[c]])return !0;
                return !1
            }();
        a.prototype = {
            getDomNode: M("Ca"), Fx: function (a) {
                this.gb = r.cloneNode(!0);
                a.appendChild(this.gb);
                this.vc(this.gb);
                if (!s && 32 != this.gb.height && h.isProbablyIE(7)) {
                    a.removeChild(this.gb);
                    var b = k("div");
                    n(b, {
                        textAlign: "center",
                        textOverflow: "ellipsis",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: "10px",
                        color: "#333333",
                        verticalAlign: "middle",
                        paddingTop: "3px",
                        width: "32px",
                        height: "32px",
                        display: "none"
                    });
                    b.innerHTML = "Net\x3cbr/\x3eState";
                    r = q = t = b;
                    s = !0;
                    this.gb = r.cloneNode(!0);
                    a.appendChild(this.gb);
                    this.vc(this.gb)
                }
                this.Em = q.cloneNode(!0);
                a.appendChild(this.Em);
                this.Er = t.cloneNode(!0);
                a.appendChild(this.Er)
            }, toggle: function () {
                this.My || p || (this.mb ? d.addTimedTask(this.Uh, 0, this) : this.Mn = !this.Mn)
            }, hl: function () {
                if (!this.mb) {
                    var a =
                        document.getElementsByTagName("body");
                    if (a && 0 != a.length)a[0].appendChild(this.bd), this.mb = !0; else {
                        var b = this;
                        e.addEvent(document, "DOMContentLoaded", function () {
                            document.getElementsByTagName("body")[0].appendChild(b.bd);
                            b.mb = !0;
                            if (b.pl)b.onStatusChange(b.pl);
                            b.Mn && b.toggle()
                        })
                    }
                }
            }, onListenStart: function (a) {
                p || (this.onStatusChange(a.wb()), this.R = a)
            }, onListenEnd: function () {
                p || (this.vc(this.gb, "Ready"), this.R = null)
            }, vc: function (a, b) {
                b && (this.xB(), this.mg.innerHTML = b);
                this.Oo && (this.Oo.style.display = "none");
                a.style.display = "";
                this.Oo = a
            }, xB: function () {
                this.ni && (this.mi = !1, d.stopRepetitiveTask(this.ni), this.ni = null)
            }, pt: function () {
                this.ni = d.addRepetitiveTask(this.zv, 500, this)
            }, zv: function () {
                this.vc(this.mi ? this.gb : this.Em);
                this.mi = !this.mi
            }, onStatusChange: function (a) {
                if (!this.mb || p)this.pl = a; else if (a == b.ac)this.vc(this.gb, "Disconnected"); else if (a == b.CONNECTING)this.vc(this.gb, "Connecting..."), this.pt(); else if (a == b.Fb + b.tg)this.vc(this.gb, "Connected\x3cbr/\x3eStream-sensing..."), this.pt(); else if (0 ==
                    a.indexOf(b.Fb)) {
                    var c = this.R && 0 == this.R.Nl.cr().indexOf("https");
                    this.vc(this.Em, "Connected over " + (-1 < a.indexOf("HTTP") ? c ? "HTTPS" : "HTTP" : c ? "WSS" : "WebSocket") + "\x3cbr/\x3ein " + (-1 < a.indexOf("STREAMING") ? "Streaming" : "Polling") + " mode" + (!this.R || this.R.Ol.sr() ? "" : " (slave)"))
                } else a == b.Te ? this.vc(this.Er, "Stalled") : this.vc(this.gb, "Disconnected\x3cbr/\x3e(will retry)")
            }, Uh: function (a) {
                "closed" == this.Ne ? (this.Nm ? this.Ca.style.left = "0px" : this.Ca.style.right = "0px", y && !a || this.Co()) : "open" == this.Ne && (this.Nm ?
                    this.Ca.style.left = "-225px" : this.Ca.style.right = "-225px", y && !a || this.Co())
            }, Ow: function () {
                var a = this;
                return function () {
                    a.Dy()
                }
            }, Dy: function () {
                this.Gz && "closed" == this.Ne && this.Uh()
            }, kw: function () {
                var a = this;
                return function () {
                    a.ev()
                }
            }, ev: function () {
                this.Uh()
            }, qx: function () {
                var a = this;
                return function () {
                    a.Co()
                }
            }, Co: function () {
                this.Nm ? "0px" == this.Ca.style.left ? (this.Db.innerHTML = "\x3cdiv style\x3d'position: absolute; left: 0px; top: 19px; width: 1px; height: 1px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 1px; top: 18px; width: 1px; height: 3px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 2px; top: 17px; width: 1px; height: 5px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 3px; top: 16px; width: 1px; height: 7px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e",
                    this.Ne = "open") : (this.Db.innerHTML = "\x3cdiv style\x3d'position: absolute; left: 0px; top: 16px; width: 1px; height: 7px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 1px; top: 17px; width: 1px; height: 5px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 2px; top: 18px; width: 1px; height: 3px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 3px; top: 19px; width: 1px; height: 1px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e",
                    this.Ne = "closed") : "0px" == this.Ca.style.right ? (this.Db.innerHTML = "\x3cdiv style\x3d'position: absolute; left: 0px; top: 16px; width: 1px; height: 7px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 1px; top: 17px; width: 1px; height: 5px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 2px; top: 18px; width: 1px; height: 3px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 3px; top: 19px; width: 1px; height: 1px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e",
                    this.Ne = "open") : (this.Db.innerHTML = "\x3cdiv style\x3d'position: absolute; left: 0px; top: 19px; width: 1px; height: 1px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 1px; top: 18px; width: 1px; height: 3px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 2px; top: 17px; width: 1px; height: 5px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white;' \x3e\x3c/div\x3e\x3cdiv style\x3d'position: absolute; left: 3px; top: 16px; width: 1px; height: 7px; background-color: #555555; box-shadow: 1px 1px 3px white, -1px 1px 3px white, 1px -1px 3px white, -1px -1px 3px white;' \x3e\x3c/div\x3e",
                    this.Ne = "closed")
            }
        };
        a.prototype.onStatusChange = a.prototype.onStatusChange;
        a.prototype.onListenStart = a.prototype.onListenStart;
        a.prototype.onListenEnd = a.prototype.onListenEnd;
        a.prototype.getDomNode = a.prototype.getDomNode;
        return a
    });
    var classes = ['LightstreamerClient', 'Subscription', 'DynaGrid', 'StaticGrid', 'StatusWidget'];
    require(classes, function () {
        for (var i = 0; i < classes.length; i++)window[classes[i]] = arguments[i];
    });
})();