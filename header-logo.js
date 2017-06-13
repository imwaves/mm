/**
 * @license RequireJS text 2.0.10 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/*!
 * VERSION: 1.11.1
 * DATE: 2013-10-29
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

define("text", ["module"], function(t) { "use strict";
        var e, i, n, r, a, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            h = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            l = "undefined" != typeof location && location.href,
            c = l && location.protocol && location.protocol.replace(/\:/, ""),
            u = l && location.hostname,
            p = l && (location.port || void 0),
            d = {},
            f = t.config && t.config() || {};
        return e = { version: "2.0.10", strip: function(t) {
                if (t) { t = t.replace(s, "");
                    var e = t.match(h);
                    e && (t = e[1]) } else t = "";
                return t }, jsEscape: function(t) {
                return t.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029") }, createXhr: f.createXhr || function() {
                var t, e, i;
                if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                if ("undefined" != typeof ActiveXObject)
                    for (e = 0; e < 3; e += 1) { i = o[e];
                        try { t = new ActiveXObject(i) } catch (t) {}
                        if (t) { o = [i];
                            break } }
                return t }, parseName: function(t) {
                var e, i, n, r = !1,
                    a = t.indexOf("."),
                    o = 0 === t.indexOf("./") || 0 === t.indexOf("../");
                return a !== -1 && (!o || a > 1) ? (e = t.substring(0, a), i = t.substring(a + 1, t.length)) : e = t, n = i || e, a = n.indexOf("!"), a !== -1 && (r = "strip" === n.substring(a + 1), n = n.substring(0, a), i ? i = n : e = n), { moduleName: e, ext: i, strip: r } }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function(t, i, n, r) {
                var a, o, s, h = e.xdRegExp.exec(t);
                return !h || (a = h[2], o = h[3], o = o.split(":"), s = o[1], o = o[0], !(a && a !== i || o && o.toLowerCase() !== n.toLowerCase() || (s || o) && s !== r)) }, finishLoad: function(t, i, n, r) { n = i ? e.strip(n) : n, f.isBuild && (d[t] = n), r(n) }, load: function(t, i, n, r) {
                if (r.isBuild && !r.inlineText) return void n();
                f.isBuild = r.isBuild;
                var a = e.parseName(t),
                    o = a.moduleName + (a.ext ? "." + a.ext : ""),
                    s = i.toUrl(o),
                    h = f.useXhr || e.useXhr;
                return 0 === s.indexOf("empty:") ? void n() : void(!l || h(s, c, u, p) ? e.get(s, function(i) { e.finishLoad(t, a.strip, i, n) }, function(t) { n.error && n.error(t) }) : i([o], function(t) { e.finishLoad(a.moduleName + "." + a.ext, a.strip, t, n) })) }, write: function(t, i, n, r) {
                if (d.hasOwnProperty(i)) {
                    var a = e.jsEscape(d[i]);
                    n.asModule(t + "!" + i, "define(function () { return '" + a + "';});\n") } }, writeFile: function(t, i, n, r, a) {
                var o = e.parseName(i),
                    s = o.ext ? "." + o.ext : "",
                    h = o.moduleName + s,
                    l = n.toUrl(o.moduleName + s) + ".js";
                e.load(h, n, function(i) {
                    var n = function(t) {
                        return r(l, t) };
                    n.asModule = function(t, e) {
                        return r.asModule(t, l, e) }, e.write(t, h, n, a) }, a) } }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (i = require.nodeRequire("fs"), e.get = function(t, e, n) {
            try {
                var r = i.readFileSync(t, "utf8");
                0 === r.indexOf("\ufeff") && (r = r.substring(1)), e(r) } catch (t) { n(t) } }) : "xhr" === f.env || !f.env && e.createXhr() ? e.get = function(t, i, n, r) {
            var a, o = e.createXhr();
            if (o.open("GET", t, !0), r)
                for (a in r) r.hasOwnProperty(a) && o.setRequestHeader(a.toLowerCase(), r[a]);
            f.onXhr && f.onXhr(o, t), o.onreadystatechange = function(e) {
                var r, a;
                4 === o.readyState && (r = o.status, r > 399 && r < 600 ? (a = new Error(t + " HTTP status: " + r), a.xhr = o, n(a)) : i(o.responseText), f.onXhrComplete && f.onXhrComplete(o, t)) }, o.send(null) } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? e.get = function(t, e) {
            var i, n, r = "utf-8",
                a = new java.io.File(t),
                o = java.lang.System.getProperty("line.separator"),
                s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a), r)),
                h = "";
            try {
                for (i = new java.lang.StringBuffer, n = s.readLine(), n && n.length() && 65279 === n.charAt(0) && (n = n.substring(1)), null !== n && i.append(n); null !== (n = s.readLine());) i.append(o), i.append(n);
                h = String(i.toString()) } finally { s.close() }
            e(h) } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (n = Components.classes, r = Components.interfaces, Components.utils.import("resource://gre/modules/FileUtils.jsm"), a = "@mozilla.org/windows-registry-key;1" in n, e.get = function(t, e) {
            var i, o, s, h = {};
            a && (t = t.replace(/\//g, "\\")), s = new FileUtils.File(t);
            try { i = n["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream), i.init(s, 1, 0, !1), o = n["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream), o.init(i, "utf-8", i.available(), r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), o.readString(i.available(), h), o.close(), i.close(), e(h.value) } catch (t) {
                throw new Error((s && s.path || "") + ": " + t) } }), e }),
    function(t, e) { "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define("three", ["exports"], e) : e(t.THREE = t.THREE || {}) }(this, function(t) {
        "use strict";

        function e() {}

        function i(t, e) { this.x = t || 0, this.y = e || 0 }

        function n(t, e, r, a, o, s, h, l, c, u) { Object.defineProperty(this, "id", { value: Ko++ }), this.uuid = Qo.generateUUID(), this.name = "", this.image = void 0 !== t ? t : n.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== e ? e : n.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : ja, this.wrapT = void 0 !== a ? a : ja, this.magFilter = void 0 !== o ? o : Za, this.minFilter = void 0 !== s ? s : Qa, this.anisotropy = void 0 !== c ? c : 1, this.format = void 0 !== h ? h : fo, this.type = void 0 !== l ? l : $a, this.offset = new i(0, 0), this.repeat = new i(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== u ? u : ko, this.version = 0, this.onUpdate = null }

        function r(t, e, i, n) { this.x = t || 0, this.y = e || 0, this.z = i || 0, this.w = void 0 !== n ? n : 1 }

        function a(t, e, i) { this.uuid = Qo.generateUUID(), this.width = t, this.height = e, this.scissor = new r(0, 0, t, e), this.scissorTest = !1, this.viewport = new r(0, 0, t, e), i = i || {}, void 0 === i.minFilter && (i.minFilter = Za), this.texture = new n(void 0, void 0, i.wrapS, i.wrapT, i.magFilter, i.minFilter, i.format, i.type, i.anisotropy, i.encoding), this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer, this.stencilBuffer = void 0 === i.stencilBuffer || i.stencilBuffer, this.depthTexture = void 0 !== i.depthTexture ? i.depthTexture : null }

        function o(t, e, i) { a.call(this, t, e, i), this.activeCubeFace = 0, this.activeMipMapLevel = 0 }

        function s(t, e, i, n) { this._x = t || 0, this._y = e || 0, this._z = i || 0, this._w = void 0 !== n ? n : 1 }

        function h(t, e, i) { this.x = t || 0, this.y = e || 0, this.z = i || 0 }

        function l() { this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.") }

        function c(t, e, i, r, a, o, s, h, l, c) { t = void 0 !== t ? t : [], e = void 0 !== e ? e : Da, n.call(this, t, e, i, r, a, o, s, h, l, c), this.flipY = !1 }

        function u() { this.seq = [], this.map = {} }

        function p(t, e, i) {
            var n = t[0];
            if (n <= 0 || n > 0) return t;
            var r = e * i,
                a = es[r];
            if (void 0 === a && (a = new Float32Array(r), es[r] = a), 0 !== e) { n.toArray(a, 0);
                for (var o = 1, s = 0; o !== e; ++o) s += i, t[o].toArray(a, s) }
            return a }

        function d(t, e) {
            var i = is[e];
            void 0 === i && (i = new Int32Array(e), is[e] = i);
            for (var n = 0; n !== e; ++n) i[n] = t.allocTextureUnit();
            return i }

        function f(t, e) { t.uniform1f(this.addr, e) }

        function m(t, e) { t.uniform1i(this.addr, e) }

        function g(t, e) { void 0 === e.x ? t.uniform2fv(this.addr, e) : t.uniform2f(this.addr, e.x, e.y) }

        function v(t, e) { void 0 !== e.x ? t.uniform3f(this.addr, e.x, e.y, e.z) : void 0 !== e.r ? t.uniform3f(this.addr, e.r, e.g, e.b) : t.uniform3fv(this.addr, e) }

        function y(t, e) { void 0 === e.x ? t.uniform4fv(this.addr, e) : t.uniform4f(this.addr, e.x, e.y, e.z, e.w) }

        function _(t, e) { t.uniformMatrix2fv(this.addr, !1, e.elements || e) }

        function x(t, e) { t.uniformMatrix3fv(this.addr, !1, e.elements || e) }

        function b(t, e) { t.uniformMatrix4fv(this.addr, !1, e.elements || e) }

        function w(t, e, i) {
            var n = i.allocTextureUnit();
            t.uniform1i(this.addr, n), i.setTexture2D(e || $o, n) }

        function M(t, e, i) {
            var n = i.allocTextureUnit();
            t.uniform1i(this.addr, n), i.setTextureCube(e || ts, n) }

        function T(t, e) { t.uniform2iv(this.addr, e) }

        function E(t, e) { t.uniform3iv(this.addr, e) }

        function S(t, e) { t.uniform4iv(this.addr, e) }

        function A(t) {
            switch (t) {
                case 5126:
                    return f;
                case 35664:
                    return g;
                case 35665:
                    return v;
                case 35666:
                    return y;
                case 35674:
                    return _;
                case 35675:
                    return x;
                case 35676:
                    return b;
                case 35678:
                    return w;
                case 35680:
                    return M;
                case 5124:
                case 35670:
                    return m;
                case 35667:
                case 35671:
                    return T;
                case 35668:
                case 35672:
                    return E;
                case 35669:
                case 35673:
                    return S } }

        function R(t, e) { t.uniform1fv(this.addr, e) }

        function L(t, e) { t.uniform1iv(this.addr, e) }

        function P(t, e) { t.uniform2fv(this.addr, p(e, this.size, 2)) }

        function C(t, e) { t.uniform3fv(this.addr, p(e, this.size, 3)) }

        function I(t, e) { t.uniform4fv(this.addr, p(e, this.size, 4)) }

        function O(t, e) { t.uniformMatrix2fv(this.addr, !1, p(e, this.size, 4)) }

        function D(t, e) { t.uniformMatrix3fv(this.addr, !1, p(e, this.size, 9)) }

        function U(t, e) { t.uniformMatrix4fv(this.addr, !1, p(e, this.size, 16)) }

        function N(t, e, i) {
            var n = e.length,
                r = d(i, n);
            t.uniform1iv(this.addr, r);
            for (var a = 0; a !== n; ++a) i.setTexture2D(e[a] || $o, r[a]) }

        function F(t, e, i) {
            var n = e.length,
                r = d(i, n);
            t.uniform1iv(this.addr, r);
            for (var a = 0; a !== n; ++a) i.setTextureCube(e[a] || ts, r[a]) }

        function z(t) {
            switch (t) {
                case 5126:
                    return R;
                case 35664:
                    return P;
                case 35665:
                    return C;
                case 35666:
                    return I;
                case 35674:
                    return O;
                case 35675:
                    return D;
                case 35676:
                    return U;
                case 35678:
                    return N;
                case 35680:
                    return F;
                case 5124:
                case 35670:
                    return L;
                case 35667:
                case 35671:
                    return T;
                case 35668:
                case 35672:
                    return E;
                case 35669:
                case 35673:
                    return S } }

        function B(t, e, i) { this.id = t, this.addr = i, this.setValue = A(e.type) }

        function G(t, e, i) { this.id = t, this.addr = i, this.size = e.size, this.setValue = z(e.type) }

        function k(t) { this.id = t, u.call(this) }

        function H(t, e) { t.seq.push(e), t.map[e.id] = e }

        function j(t, e, i) {
            var n = t.name,
                r = n.length;
            for (ns.lastIndex = 0;;) {
                var a = ns.exec(n),
                    o = ns.lastIndex,
                    s = a[1],
                    h = "]" === a[2],
                    l = a[3];
                if (h && (s = 0 | s), void 0 === l || "[" === l && o + 2 === r) { H(i, void 0 === l ? new B(s, t, e) : new G(s, t, e));
                    break }
                var c = i.map,
                    u = c[s];
                void 0 === u && (u = new k(s), H(i, u)), i = u } }

        function V(t, e, i) { u.call(this), this.renderer = i;
            for (var n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), r = 0; r !== n; ++r) {
                var a = t.getActiveUniform(e, r),
                    o = a.name,
                    s = t.getUniformLocation(e, o);
                j(a, s, this) } }

        function W(t, e, i) {
            return void 0 === e && void 0 === i ? this.set(t) : this.setRGB(t, e, i) }

        function X(t, e, i, r, a, o, s, h, l, c, u, p) { n.call(this, null, o, s, h, l, c, r, a, u, p), this.image = { data: t, width: e, height: i }, this.magFilter = void 0 !== l ? l : Xa, this.minFilter = void 0 !== c ? c : Xa, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 }

        function Y(t, e) { this.min = void 0 !== t ? t : new i(+(1 / 0), +(1 / 0)), this.max = void 0 !== e ? e : new i(-(1 / 0), -(1 / 0)) }

        function q(t, e) {
            function n() {
                var t = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                    e = new Uint16Array([0, 1, 2, 0, 2, 3]);
                a = f.createBuffer(), o = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, a), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), p = f.createTexture(), d = f.createTexture(), m.bindTexture(f.TEXTURE_2D, p), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 16, 16, 0, f.RGB, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), m.bindTexture(f.TEXTURE_2D, d), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, 16, 16, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), s = { vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if ( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"), fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if ( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if ( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n") }, l = r(s), c = { vertex: f.getAttribLocation(l, "position"), uv: f.getAttribLocation(l, "uv") }, u = { renderType: f.getUniformLocation(l, "renderType"), map: f.getUniformLocation(l, "map"), occlusionMap: f.getUniformLocation(l, "occlusionMap"), opacity: f.getUniformLocation(l, "opacity"), color: f.getUniformLocation(l, "color"), scale: f.getUniformLocation(l, "scale"), rotation: f.getUniformLocation(l, "rotation"), screenPosition: f.getUniformLocation(l, "screenPosition") } }

            function r(e) {
                var i = f.createProgram(),
                    n = f.createShader(f.FRAGMENT_SHADER),
                    r = f.createShader(f.VERTEX_SHADER),
                    a = "precision " + t.getPrecision() + " float;\n";
                return f.shaderSource(n, a + e.fragmentShader), f.shaderSource(r, a + e.vertexShader), f.compileShader(n), f.compileShader(r), f.attachShader(i, n), f.attachShader(i, r), f.linkProgram(i), i }
            var a, o, s, l, c, u, p, d, f = t.context,
                m = t.state;
            this.render = function(r, s, g) {
                if (0 !== e.length) {
                    var v = new h,
                        y = g.w / g.z,
                        _ = .5 * g.z,
                        x = .5 * g.w,
                        b = 16 / g.w,
                        w = new i(b * y, b),
                        M = new h(1, 1, 0),
                        T = new i(1, 1),
                        E = new Y;
                    E.min.set(g.x, g.y), E.max.set(g.x + (g.z - 16), g.y + (g.w - 16)), void 0 === l && n(), f.useProgram(l), m.initAttributes(), m.enableAttribute(c.vertex), m.enableAttribute(c.uv), m.disableUnusedAttributes(), f.uniform1i(u.occlusionMap, 0), f.uniform1i(u.map, 1), f.bindBuffer(f.ARRAY_BUFFER, a), f.vertexAttribPointer(c.vertex, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(c.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), m.disable(f.CULL_FACE), m.setDepthWrite(!1);
                    for (var S = 0, A = e.length; S < A; S++) { b = 16 / g.w, w.set(b * y, b);
                        var R = e[S];
                        if (v.set(R.matrixWorld.elements[12], R.matrixWorld.elements[13], R.matrixWorld.elements[14]), v.applyMatrix4(s.matrixWorldInverse), v.applyProjection(s.projectionMatrix), M.copy(v), T.x = g.x + M.x * _ + _ - 8, T.y = g.y + M.y * x + x - 8, E.containsPoint(T) === !0) { m.activeTexture(f.TEXTURE0), m.bindTexture(f.TEXTURE_2D, null), m.activeTexture(f.TEXTURE1), m.bindTexture(f.TEXTURE_2D, p), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGB, T.x, T.y, 16, 16, 0), f.uniform1i(u.renderType, 0), f.uniform2f(u.scale, w.x, w.y), f.uniform3f(u.screenPosition, M.x, M.y, M.z), m.disable(f.BLEND), m.enable(f.DEPTH_TEST), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), m.activeTexture(f.TEXTURE0), m.bindTexture(f.TEXTURE_2D, d), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGBA, T.x, T.y, 16, 16, 0), f.uniform1i(u.renderType, 1), m.disable(f.DEPTH_TEST), m.activeTexture(f.TEXTURE1), m.bindTexture(f.TEXTURE_2D, p), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), R.positionScreen.copy(M), R.customUpdateCallback ? R.customUpdateCallback(R) : R.updateLensFlares(), f.uniform1i(u.renderType, 2), m.enable(f.BLEND);
                            for (var L = 0, P = R.lensFlares.length; L < P; L++) {
                                var C = R.lensFlares[L];
                                C.opacity > .001 && C.scale > .001 && (M.x = C.x, M.y = C.y, M.z = C.z, b = C.size * C.scale / g.w, w.x = b * y, w.y = b, f.uniform3f(u.screenPosition, M.x, M.y, M.z), f.uniform2f(u.scale, w.x, w.y), f.uniform1f(u.rotation, C.rotation), f.uniform1f(u.opacity, C.opacity), f.uniform3f(u.color, C.color.r, C.color.g, C.color.b), m.setBlending(C.blending, C.blendEquation, C.blendSrc, C.blendDst), t.setTexture2D(C.texture, 1), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0)) } } }
                    m.enable(f.CULL_FACE), m.enable(f.DEPTH_TEST), m.setDepthWrite(!0), t.resetGLState() } } }

        function Z(t, e) {
            function i() {
                var t = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                    e = new Uint16Array([0, 1, 2, 0, 2, 3]);
                o = f.createBuffer(), l = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, o), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, l), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), c = r(), u = { position: f.getAttribLocation(c, "position"), uv: f.getAttribLocation(c, "uv") }, p = { uvOffset: f.getUniformLocation(c, "uvOffset"), uvScale: f.getUniformLocation(c, "uvScale"), rotation: f.getUniformLocation(c, "rotation"), scale: f.getUniformLocation(c, "scale"), color: f.getUniformLocation(c, "color"), map: f.getUniformLocation(c, "map"), opacity: f.getUniformLocation(c, "opacity"), modelViewMatrix: f.getUniformLocation(c, "modelViewMatrix"), projectionMatrix: f.getUniformLocation(c, "projectionMatrix"), fogType: f.getUniformLocation(c, "fogType"), fogDensity: f.getUniformLocation(c, "fogDensity"), fogNear: f.getUniformLocation(c, "fogNear"), fogFar: f.getUniformLocation(c, "fogFar"), fogColor: f.getUniformLocation(c, "fogColor"), alphaTest: f.getUniformLocation(c, "alphaTest") };
                var i = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                i.width = 8, i.height = 8;
                var a = i.getContext("2d");
                a.fillStyle = "white", a.fillRect(0, 0, 8, 8), d = new n(i), d.needsUpdate = !0 }

            function r() {
                var e = f.createProgram(),
                    i = f.createShader(f.VERTEX_SHADER),
                    n = f.createShader(f.FRAGMENT_SHADER);
                return f.shaderSource(i, ["precision " + t.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")), f.shaderSource(n, ["precision " + t.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")), f.compileShader(i), f.compileShader(n), f.attachShader(e, i), f.attachShader(e, n), f.linkProgram(e), e }

            function a(t, e) {
                return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : e.id - t.id }
            var o, l, c, u, p, d, f = t.context,
                m = t.state,
                g = new h,
                v = new s,
                y = new h;
            this.render = function(n, r) {
                if (0 !== e.length) { void 0 === c && i(), f.useProgram(c), m.initAttributes(), m.enableAttribute(u.position), m.enableAttribute(u.uv), m.disableUnusedAttributes(), m.disable(f.CULL_FACE), m.enable(f.BLEND), f.bindBuffer(f.ARRAY_BUFFER, o), f.vertexAttribPointer(u.position, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(u.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, l), f.uniformMatrix4fv(p.projectionMatrix, !1, r.projectionMatrix.elements), m.activeTexture(f.TEXTURE0), f.uniform1i(p.map, 0);
                    var s = 0,
                        h = 0,
                        _ = n.fog;
                    _ ? (f.uniform3f(p.fogColor, _.color.r, _.color.g, _.color.b), _.isFog ? (f.uniform1f(p.fogNear, _.near), f.uniform1f(p.fogFar, _.far), f.uniform1i(p.fogType, 1), s = 1, h = 1) : _.isFogExp2 && (f.uniform1f(p.fogDensity, _.density), f.uniform1i(p.fogType, 2), s = 2, h = 2)) : (f.uniform1i(p.fogType, 0), s = 0, h = 0);
                    for (var x = 0, b = e.length; x < b; x++) {
                        var w = e[x];
                        w.modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, w.matrixWorld), w.z = -w.modelViewMatrix.elements[14] }
                    e.sort(a);
                    for (var M = [], x = 0, b = e.length; x < b; x++) {
                        var w = e[x],
                            T = w.material;
                        if (T.visible !== !1) { f.uniform1f(p.alphaTest, T.alphaTest), f.uniformMatrix4fv(p.modelViewMatrix, !1, w.modelViewMatrix.elements), w.matrixWorld.decompose(g, v, y), M[0] = y.x, M[1] = y.y;
                            var E = 0;
                            n.fog && T.fog && (E = h), s !== E && (f.uniform1i(p.fogType, E), s = E), null !== T.map ? (f.uniform2f(p.uvOffset, T.map.offset.x, T.map.offset.y), f.uniform2f(p.uvScale, T.map.repeat.x, T.map.repeat.y)) : (f.uniform2f(p.uvOffset, 0, 0), f.uniform2f(p.uvScale, 1, 1)), f.uniform1f(p.opacity, T.opacity), f.uniform3f(p.color, T.color.r, T.color.g, T.color.b), f.uniform1f(p.rotation, T.rotation), f.uniform2fv(p.scale, M), m.setBlending(T.blending, T.blendEquation, T.blendSrc, T.blendDst), m.setDepthTest(T.depthTest), m.setDepthWrite(T.depthWrite), T.map ? t.setTexture2D(T.map, 0) : t.setTexture2D(d, 0), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0) } }
                    m.enable(f.CULL_FACE), t.resetGLState() } } }

        function J() { Object.defineProperty(this, "id", { value: sl++ }), this.uuid = Qo.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.lights = !0, this.blending = Zr, this.side = Gr, this.shading = Vr, this.vertexColors = Wr, this.opacity = 1, this.transparent = !1, this.blendSrc = ca, this.blendDst = ua, this.blendEquation = ea, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = xa, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.premultipliedAlpha = !1, this.overdraw = 0, this.visible = !0, this._needsUpdate = !0 }

        function Q(t) { J.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1 }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }, this.index0AttributeName = void 0, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t)) }

        function K(t) { J.call(this), this.type = "MeshDepthMaterial", this.depthPacking = Zo, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.setValues(t) }

        function $(t, e) { this.min = void 0 !== t ? t : new h(+(1 / 0), +(1 / 0), +(1 / 0)), this.max = void 0 !== e ? e : new h(-(1 / 0), -(1 / 0), -(1 / 0)) }

        function tt(t, e) { this.center = void 0 !== t ? t : new h, this.radius = void 0 !== e ? e : 0 }

        function et() { this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.") }

        function it(t, e) { this.normal = void 0 !== t ? t : new h(1, 0, 0), this.constant = void 0 !== e ? e : 0 }

        function nt(t, e, i, n, r, a) { this.planes = [void 0 !== t ? t : new it, void 0 !== e ? e : new it, void 0 !== i ? i : new it, void 0 !== n ? n : new it, void 0 !== r ? r : new it, void 0 !== a ? a : new it] }

        function rt(t, e, n, o) {
            function s(e, i, n, r) {
                var a = e.geometry,
                    o = null,
                    s = T,
                    h = e.customDepthMaterial;
                if (n && (s = E, h = e.customDistanceMaterial), h) o = h;
                else {
                    var l = !1;
                    i.morphTargets && (a && a.isBufferGeometry ? l = a.morphAttributes && a.morphAttributes.position && a.morphAttributes.position.length > 0 : a && a.isGeometry && (l = a.morphTargets && a.morphTargets.length > 0));
                    var c = e.isSkinnedMesh && i.skinning,
                        u = 0;
                    l && (u |= b), c && (u |= w), o = s[u] }
                if (t.localClippingEnabled && i.clipShadows === !0 && 0 !== i.clippingPlanes.length) {
                    var p = o.uuid,
                        d = i.uuid,
                        f = S[p];
                    void 0 === f && (f = {}, S[p] = f);
                    var m = f[d];
                    void 0 === m && (m = o.clone(), f[d] = m), o = m }
                o.visible = i.visible, o.wireframe = i.wireframe;
                var g = i.side;
                return z.renderSingleSided && g == Hr && (g = Gr), z.renderReverseSided && (g === Gr ? g = kr : g === kr && (g = Gr)), o.side = g, o.clipShadows = i.clipShadows, o.clippingPlanes = i.clippingPlanes, o.wireframeLinewidth = i.wireframeLinewidth, o.linewidth = i.linewidth, n && void 0 !== o.uniforms.lightPos && o.uniforms.lightPos.value.copy(r), o }

            function c(t, e, i) {
                if (t.visible !== !1) {
                    var n = 0 !== (t.layers.mask & e.layers.mask);
                    if (n && (t.isMesh || t.isLine || t.isPoints) && t.castShadow && (t.frustumCulled === !1 || d.intersectsObject(t) === !0)) {
                        var r = t.material;
                        r.visible === !0 && (t.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t.matrixWorld), x.push(t)) }
                    for (var a = t.children, o = 0, s = a.length; o < s; o++) c(a[o], e, i) } }
            var u = t.context,
                p = t.state,
                d = new nt,
                f = new l,
                m = e.shadows,
                g = new i,
                v = new i(o.maxTextureSize, o.maxTextureSize),
                y = new h,
                _ = new h,
                x = [],
                b = 1,
                w = 2,
                M = (b | w) + 1,
                T = new Array(M),
                E = new Array(M),
                S = {},
                A = [new h(1, 0, 0), new h(-1, 0, 0), new h(0, 0, 1), new h(0, 0, -1), new h(0, 1, 0), new h(0, -1, 0)],
                R = [new h(0, 1, 0), new h(0, 1, 0), new h(0, 1, 0), new h(0, 1, 0), new h(0, 0, 1), new h(0, 0, -1)],
                L = [new r, new r, new r, new r, new r, new r],
                P = new K;
            P.depthPacking = Jo, P.clipping = !0;
            for (var C = ol.distanceRGBA, I = rs.clone(C.uniforms), O = 0; O !== M; ++O) {
                var D = 0 !== (O & b),
                    U = 0 !== (O & w),
                    N = P.clone();
                N.morphTargets = D, N.skinning = U, T[O] = N;
                var F = new Q({ defines: { USE_SHADOWMAP: "" }, uniforms: I, vertexShader: C.vertexShader, fragmentShader: C.fragmentShader, morphTargets: D, skinning: U, clipping: !0 });
                E[O] = F }
            var z = this;
            this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = zr, this.renderReverseSided = !0, this.renderSingleSided = !0, this.render = function(e, i) {
                if (z.enabled !== !1 && (z.autoUpdate !== !1 || z.needsUpdate !== !1) && 0 !== m.length) { p.buffers.color.setClear(1, 1, 1, 1), p.disable(u.BLEND), p.setDepthTest(!0), p.setScissorTest(!1);
                    for (var r, o, h = 0, l = m.length; h < l; h++) {
                        var b = m[h],
                            w = b.shadow;
                        if (void 0 !== w) {
                            var M = w.camera;
                            if (g.copy(w.mapSize), g.min(v), b && b.isPointLight) { r = 6, o = !0;
                                var T = g.x,
                                    E = g.y;
                                L[0].set(2 * T, E, T, E), L[1].set(0, E, T, E), L[2].set(3 * T, E, T, E), L[3].set(T, E, T, E), L[4].set(3 * T, 0, T, E), L[5].set(T, 0, T, E), g.x *= 4, g.y *= 2 } else r = 1, o = !1;
                            if (null === w.map) {
                                var S = { minFilter: Xa, magFilter: Xa, format: fo };
                                w.map = new a(g.x, g.y, S), M.updateProjectionMatrix() }
                            w.isSpotLightShadow && w.update(b), w && w.isRectAreaLightShadow && w.update(b);
                            var P = w.map,
                                C = w.matrix;
                            _.setFromMatrixPosition(b.matrixWorld), M.position.copy(_), t.setRenderTarget(P), t.clear();
                            for (var I = 0; I < r; I++) {
                                if (o) { y.copy(M.position), y.add(A[I]), M.up.copy(R[I]), M.lookAt(y);
                                    var O = L[I];
                                    p.viewport(O) } else y.setFromMatrixPosition(b.target.matrixWorld), M.lookAt(y);
                                M.updateMatrixWorld(), M.matrixWorldInverse.getInverse(M.matrixWorld), C.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), C.multiply(M.projectionMatrix), C.multiply(M.matrixWorldInverse), f.multiplyMatrices(M.projectionMatrix, M.matrixWorldInverse), d.setFromMatrix(f), x.length = 0, c(e, i, M);
                                for (var D = 0, U = x.length; D < U; D++) {
                                    var N = x[D],
                                        F = n.update(N),
                                        B = N.material;
                                    if (B && B.isMultiMaterial)
                                        for (var G = F.groups, k = B.materials, H = 0, j = G.length; H < j; H++) {
                                            var V = G[H],
                                                W = k[V.materialIndex];
                                            if (W.visible === !0) {
                                                var X = s(N, W, o, _);
                                                t.renderBufferDirect(M, null, F, X, N, V) } } else {
                                            var X = s(N, B, o, _);
                                            t.renderBufferDirect(M, null, F, X, N, null) } } } } else console.warn("THREE.WebGLShadowMap:", b, "has no shadow.") }
                    var Y = t.getClearColor(),
                        q = t.getClearAlpha();
                    t.setClearColor(Y, q), z.needsUpdate = !1 } } }

        function at(t, e) { this.origin = void 0 !== t ? t : new h, this.direction = void 0 !== e ? e : new h }

        function ot(t, e, i, n) { this._x = t || 0, this._y = e || 0, this._z = i || 0, this._order = n || ot.DefaultOrder }

        function st() { this.mask = 1 }

        function ht() {
            function t() { r.setFromEuler(n, !1) }

            function e() { n.setFromQuaternion(r, void 0, !1) }
            Object.defineProperty(this, "id", { value: hl++ }), this.uuid = Qo.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ht.DefaultUp.clone();
            var i = new h,
                n = new ot,
                r = new s,
                a = new h(1, 1, 1);
            n.onChange(t), r.onChange(e), Object.defineProperties(this, { position: { enumerable: !0, value: i }, rotation: { enumerable: !0, value: n }, quaternion: { enumerable: !0, value: r }, scale: { enumerable: !0, value: a }, modelViewMatrix: { value: new l }, normalMatrix: { value: new et } }), this.matrix = new l, this.matrixWorld = new l, this.matrixAutoUpdate = ht.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new st, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}, this.onBeforeRender = function() {}, this.onAfterRender = function() {} }

        function lt(t, e) { this.start = void 0 !== t ? t : new h, this.end = void 0 !== e ? e : new h }

        function ct(t, e, i) { this.a = void 0 !== t ? t : new h, this.b = void 0 !== e ? e : new h, this.c = void 0 !== i ? i : new h }

        function ut(t, e, i, n, r, a) { this.a = t, this.b = e, this.c = i, this.normal = n && n.isVector3 ? n : new h, this.vertexNormals = Array.isArray(n) ? n : [], this.color = r && r.isColor ? r : new W, this.vertexColors = Array.isArray(r) ? r : [], this.materialIndex = void 0 !== a ? a : 0 }

        function pt(t) { J.call(this), this.type = "MeshBasicMaterial", this.color = new W(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Ea, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.lights = !1, this.setValues(t) }

        function dt(t, e, i) {
            if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.uuid = Qo.generateUUID(), this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = i === !0, this.dynamic = !1, this.updateRange = { offset: 0, count: -1 }, this.onUploadCallback = function() {}, this.version = 0 }

        function ft(t, e) { dt.call(this, new Int8Array(t), e) }

        function mt(t, e) { dt.call(this, new Uint8Array(t), e) }

        function gt(t, e) { dt.call(this, new Uint8ClampedArray(t), e) }

        function vt(t, e) { dt.call(this, new Int16Array(t), e) }

        function yt(t, e) { dt.call(this, new Uint16Array(t), e) }

        function _t(t, e) { dt.call(this, new Int32Array(t), e) }

        function xt(t, e) { dt.call(this, new Uint32Array(t), e) }

        function bt(t, e) { dt.call(this, new Float32Array(t), e) }

        function wt(t, e) { dt.call(this, new Float64Array(t), e) }

        function Mt() { this.indices = [], this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1 }

        function Tt() { Object.defineProperty(this, "id", { value: Et() }), this.uuid = Qo.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
                []
            ], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1 }

        function Et() {
            return ll++ }

        function St() { Object.defineProperty(this, "id", { value: Et() }), this.uuid = Qo.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 } }

        function At(t, e) { ht.call(this), this.type = "Mesh", this.geometry = void 0 !== t ? t : new St, this.material = void 0 !== e ? e : new pt({ color: 16777215 * Math.random() }), this.drawMode = zo, this.updateMorphTargets() }

        function Rt(t, e, i, n, r, a) {
            function o(t, e, i) {
                var n = 0;
                return n += (t + 1) * (e + 1) * 2, n += (t + 1) * (i + 1) * 2, n += (i + 1) * (e + 1) * 2 }

            function s(t, e, i) {
                var n = 0;
                return n += t * e * 2, n += t * i * 2, n += i * e * 2, 6 * n }

            function l(t, e, i, n, r, a, o, s, l, u, p) {
                for (var w = a / l, M = o / u, T = a / 2, E = o / 2, S = s / 2, A = l + 1, R = u + 1, L = 0, P = 0, C = new h, I = 0; I < R; I++)
                    for (var O = I * M - E, D = 0; D < A; D++) {
                        var U = D * w - T;
                        C[t] = U * n, C[e] = O * r, C[i] = S, f[v] = C.x, f[v + 1] = C.y, f[v + 2] = C.z, C[t] = 0, C[e] = 0,
                            C[i] = s > 0 ? 1 : -1, m[v] = C.x, m[v + 1] = C.y, m[v + 2] = C.z, g[y] = D / l, g[y + 1] = 1 - I / u, v += 3, y += 2, L += 1
                    }
                for (I = 0; I < u; I++)
                    for (D = 0; D < l; D++) {
                        var N = x + D + A * I,
                            F = x + D + A * (I + 1),
                            z = x + (D + 1) + A * (I + 1),
                            B = x + (D + 1) + A * I;
                        d[_] = N, d[_ + 1] = F, d[_ + 2] = B, d[_ + 3] = F, d[_ + 4] = z, d[_ + 5] = B, _ += 6, P += 6 }
                c.addGroup(b, P, p), b += P, x += L
            }
            St.call(this), this.type = "BoxBufferGeometry", this.parameters = { width: t, height: e, depth: i, widthSegments: n, heightSegments: r, depthSegments: a };
            var c = this;
            n = Math.floor(n) || 1, r = Math.floor(r) || 1, a = Math.floor(a) || 1;
            var u = o(n, r, a),
                p = s(n, r, a),
                d = new(p > 65535 ? Uint32Array : Uint16Array)(p),
                f = new Float32Array(3 * u),
                m = new Float32Array(3 * u),
                g = new Float32Array(2 * u),
                v = 0,
                y = 0,
                _ = 0,
                x = 0,
                b = 0;
            l("z", "y", "x", -1, -1, i, e, t, a, r, 0), l("z", "y", "x", 1, -1, i, e, -t, a, r, 1), l("x", "z", "y", 1, 1, t, i, e, n, a, 2), l("x", "z", "y", 1, -1, t, i, -e, n, a, 3), l("x", "y", "z", 1, -1, t, e, i, n, r, 4), l("x", "y", "z", -1, -1, t, e, -i, n, r, 5), this.setIndex(new dt(d, 1)), this.addAttribute("position", new dt(f, 3)), this.addAttribute("normal", new dt(m, 3)), this.addAttribute("uv", new dt(g, 2))
        }

        function Lt(t, e, i, n) { St.call(this), this.type = "PlaneBufferGeometry", this.parameters = { width: t, height: e, widthSegments: i, heightSegments: n };
            for (var r = t / 2, a = e / 2, o = Math.floor(i) || 1, s = Math.floor(n) || 1, h = o + 1, l = s + 1, c = t / o, u = e / s, p = new Float32Array(h * l * 3), d = new Float32Array(h * l * 3), f = new Float32Array(h * l * 2), m = 0, g = 0, v = 0; v < l; v++)
                for (var y = v * u - a, _ = 0; _ < h; _++) {
                    var x = _ * c - r;
                    p[m] = x, p[m + 1] = -y, d[m + 2] = 1, f[g] = _ / o, f[g + 1] = 1 - v / s, m += 3, g += 2 }
            m = 0;
            for (var b = new(p.length / 3 > 65535 ? Uint32Array : Uint16Array)(o * s * 6), v = 0; v < s; v++)
                for (var _ = 0; _ < o; _++) {
                    var w = _ + h * v,
                        M = _ + h * (v + 1),
                        T = _ + 1 + h * (v + 1),
                        E = _ + 1 + h * v;
                    b[m] = w, b[m + 1] = M, b[m + 2] = E, b[m + 3] = M, b[m + 4] = T, b[m + 5] = E, m += 6 }
            this.setIndex(new dt(b, 1)), this.addAttribute("position", new dt(p, 3)), this.addAttribute("normal", new dt(d, 3)), this.addAttribute("uv", new dt(f, 2)) }

        function Pt() { ht.call(this), this.type = "Camera", this.matrixWorldInverse = new l, this.projectionMatrix = new l }

        function Ct(t, e, i, n) { Pt.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== t ? t : 50, this.zoom = 1, this.near = void 0 !== i ? i : .1, this.far = void 0 !== n ? n : 2e3, this.focus = 10, this.aspect = void 0 !== e ? e : 1, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix() }

        function It(t, e, i, n, r, a) { Pt.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = i, this.bottom = n, this.near = void 0 !== r ? r : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix() }

        function Ot(t, e, i) {
            function n(t) { s = t }

            function r(i) { i.array instanceof Uint32Array && e.get("OES_element_index_uint") ? (h = t.UNSIGNED_INT, l = 4) : i.array instanceof Uint16Array ? (h = t.UNSIGNED_SHORT, l = 2) : (h = t.UNSIGNED_BYTE, l = 1) }

            function a(e, n) { t.drawElements(s, n, h, e * l), i.calls++, i.vertices += n, s === t.TRIANGLES && (i.faces += n / 3) }

            function o(n, r, a) {
                var o = e.get("ANGLE_instanced_arrays");
                return null === o ? void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.") : (o.drawElementsInstancedANGLE(s, a, h, r * l, n.maxInstancedCount), i.calls++, i.vertices += a * n.maxInstancedCount, void(s === t.TRIANGLES && (i.faces += n.maxInstancedCount * a / 3))) }
            var s, h, l;
            return { setMode: n, setIndex: r, render: a, renderInstances: o } }

        function Dt(t, e, i) {
            function n(t) { o = t }

            function r(e, n) { t.drawArrays(o, e, n), i.calls++, i.vertices += n, o === t.TRIANGLES && (i.faces += n / 3) }

            function a(n) {
                var r = e.get("ANGLE_instanced_arrays");
                if (null === r) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                var a = n.attributes.position,
                    s = 0;
                a.isInterleavedBufferAttribute ? (s = a.data.count, r.drawArraysInstancedANGLE(o, 0, s, n.maxInstancedCount)) : (s = a.count, r.drawArraysInstancedANGLE(o, 0, s, n.maxInstancedCount)), i.calls++, i.vertices += s * n.maxInstancedCount, o === t.TRIANGLES && (i.faces += n.maxInstancedCount * s / 3) }
            var o;
            return { setMode: n, render: r, renderInstances: a } }

        function Ut() {
            var t = {};
            return { get: function(e) {
                    if (void 0 !== t[e.id]) return t[e.id];
                    var n;
                    switch (e.type) {
                        case "DirectionalLight":
                            n = { direction: new h, color: new W, shadow: !1, shadowBias: 0, shadowRadius: 1, shadowMapSize: new i };
                            break;
                        case "SpotLight":
                            n = { position: new h, direction: new h, color: new W, distance: 0, coneCos: 0, penumbraCos: 0, decay: 0, shadow: !1, shadowBias: 0, shadowRadius: 1, shadowMapSize: new i };
                            break;
                        case "PointLight":
                            n = { position: new h, color: new W, distance: 0, decay: 0, shadow: !1, shadowBias: 0, shadowRadius: 1, shadowMapSize: new i };
                            break;
                        case "HemisphereLight":
                            n = { direction: new h, skyColor: new W, groundColor: new W };
                            break;
                        case "RectAreaLight":
                            n = { color: new W, position: new h, halfWidth: new h, halfHeight: new h } }
                    return t[e.id] = n, n } } }

        function Nt(t) {
            for (var e = t.split("\n"), i = 0; i < e.length; i++) e[i] = i + 1 + ": " + e[i];
            return e.join("\n") }

        function Ft(t, e, i) {
            var n = t.createShader(e);
            return t.shaderSource(n, i), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) === !1 && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(n) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", e === t.VERTEX_SHADER ? "vertex" : "fragment", t.getShaderInfoLog(n), Nt(i)), n }

        function zt(t) {
            switch (t) {
                case ko:
                    return ["Linear", "( value )"];
                case Ho:
                    return ["sRGB", "( value )"];
                case Vo:
                    return ["RGBE", "( value )"];
                case Xo:
                    return ["RGBM", "( value, 7.0 )"];
                case Yo:
                    return ["RGBM", "( value, 16.0 )"];
                case qo:
                    return ["RGBD", "( value, 256.0 )"];
                case jo:
                    return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
                default:
                    throw new Error("unsupported encoding: " + t) } }

        function Bt(t, e) {
            var i = zt(e);
            return "vec4 " + t + "( vec4 value ) { return " + i[0] + "ToLinear" + i[1] + "; }" }

        function Gt(t, e) {
            var i = zt(e);
            return "vec4 " + t + "( vec4 value ) { return LinearTo" + i[0] + i[1] + "; }" }

        function kt(t, e) {
            var i;
            switch (e) {
                case La:
                    i = "Linear";
                    break;
                case Pa:
                    i = "Reinhard";
                    break;
                case Ca:
                    i = "Uncharted2";
                    break;
                case Ia:
                    i = "OptimizedCineon";
                    break;
                default:
                    throw new Error("unsupported toneMapping: " + e) }
            return "vec3 " + t + "( vec3 color ) { return " + i + "ToneMapping( color ); }" }

        function Ht(t, e, i) { t = t || {};
            var n = [t.derivatives || e.envMapCubeUV || e.bumpMap || e.normalMap || e.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (t.fragDepth || e.logarithmicDepthBuffer) && i.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", t.drawBuffers && i.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (t.shaderTextureLOD || e.envMap) && i.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""];
            return n.filter(Wt).join("\n") }

        function jt(t) {
            var e = [];
            for (var i in t) {
                var n = t[i];
                n !== !1 && e.push("#define " + i + " " + n) }
            return e.join("\n") }

        function Vt(t, e, i) {
            for (var n = {}, r = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), a = 0; a < r; a++) {
                var o = t.getActiveAttrib(e, a),
                    s = o.name;
                n[s] = t.getAttribLocation(e, s) }
            return n }

        function Wt(t) {
            return "" !== t }

        function Xt(t, e) {
            return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights) }

        function Yt(t) {
            function e(t, e) {
                var i = nl[e];
                if (void 0 === i) throw new Error("Can not resolve #include <" + e + ">");
                return Yt(i) }
            var i = /#include +<([\w\d.]+)>/g;
            return t.replace(i, e) }

        function qt(t) {
            function e(t, e, i, n) {
                for (var r = "", a = parseInt(e); a < parseInt(i); a++) r += n.replace(/\[ i \]/g, "[ " + a + " ]");
                return r }
            var i = /for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
            return t.replace(i, e) }

        function Zt(t, e, i, n) {
            var r = t.context,
                a = i.extensions,
                o = i.defines,
                s = i.__webglShader.vertexShader,
                h = i.__webglShader.fragmentShader,
                l = "SHADOWMAP_TYPE_BASIC";
            n.shadowMapType === zr ? l = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === Br && (l = "SHADOWMAP_TYPE_PCF_SOFT");
            var c = "ENVMAP_TYPE_CUBE",
                u = "ENVMAP_MODE_REFLECTION",
                p = "ENVMAP_BLENDING_MULTIPLY";
            if (n.envMap) {
                switch (i.envMap.mapping) {
                    case Da:
                    case Ua:
                        c = "ENVMAP_TYPE_CUBE";
                        break;
                    case Ba:
                    case Ga:
                        c = "ENVMAP_TYPE_CUBE_UV";
                        break;
                    case Na:
                    case Fa:
                        c = "ENVMAP_TYPE_EQUIREC";
                        break;
                    case za:
                        c = "ENVMAP_TYPE_SPHERE" }
                switch (i.envMap.mapping) {
                    case Ua:
                    case Fa:
                        u = "ENVMAP_MODE_REFRACTION" }
                switch (i.combine) {
                    case Ea:
                        p = "ENVMAP_BLENDING_MULTIPLY";
                        break;
                    case Sa:
                        p = "ENVMAP_BLENDING_MIX";
                        break;
                    case Aa:
                        p = "ENVMAP_BLENDING_ADD" } }
            var d, f, m = t.gammaFactor > 0 ? t.gammaFactor : 1,
                g = Ht(a, n, t.extensions),
                v = jt(o),
                y = r.createProgram();
            i.isRawShaderMaterial ? (d = [v, "\n"].filter(Wt).join("\n"), f = [g, v, "\n"].filter(Wt).join("\n")) : (d = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", "#define SHADER_NAME " + i.__webglShader.name, v, n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + m, "#define MAX_BONES " + n.maxBones, n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + u : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + n.numClippingPlanes, n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && t.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(Wt).join("\n"), f = [g, "precision " + n.precision + " float;", "precision " + n.precision + " int;", "#define SHADER_NAME " + i.__webglShader.name, v, n.alphaTest ? "#define ALPHATEST " + n.alphaTest : "", "#define GAMMA_FACTOR " + m, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + c : "", n.envMap ? "#define " + u : "", n.envMap ? "#define " + p : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + n.numClippingPlanes, "#define UNION_CLIPPING_PLANES " + (n.numClippingPlanes - n.numClipIntersection), n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && t.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", n.envMap && t.extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", n.toneMapping !== Ra ? "#define TONE_MAPPING" : "", n.toneMapping !== Ra ? nl.tonemapping_pars_fragment : "", n.toneMapping !== Ra ? kt("toneMapping", n.toneMapping) : "", n.outputEncoding || n.mapEncoding || n.envMapEncoding || n.emissiveMapEncoding ? nl.encodings_pars_fragment : "", n.mapEncoding ? Bt("mapTexelToLinear", n.mapEncoding) : "", n.envMapEncoding ? Bt("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMapEncoding ? Bt("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.outputEncoding ? Gt("linearToOutputTexel", n.outputEncoding) : "", n.depthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "", "\n"].filter(Wt).join("\n")), s = Yt(s, n), s = Xt(s, n), h = Yt(h, n), h = Xt(h, n), i.isShaderMaterial || (s = qt(s), h = qt(h));
            var _ = d + s,
                x = f + h,
                b = Ft(r, r.VERTEX_SHADER, _),
                w = Ft(r, r.FRAGMENT_SHADER, x);
            r.attachShader(y, b), r.attachShader(y, w), void 0 !== i.index0AttributeName ? r.bindAttribLocation(y, 0, i.index0AttributeName) : n.morphTargets === !0 && r.bindAttribLocation(y, 0, "position"), r.linkProgram(y);
            var M = r.getProgramInfoLog(y),
                T = r.getShaderInfoLog(b),
                E = r.getShaderInfoLog(w),
                S = !0,
                A = !0;
            r.getProgramParameter(y, r.LINK_STATUS) === !1 ? (S = !1, console.error("THREE.WebGLProgram: shader error: ", r.getError(), "gl.VALIDATE_STATUS", r.getProgramParameter(y, r.VALIDATE_STATUS), "gl.getProgramInfoLog", M, T, E)) : "" !== M ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", M) : "" !== T && "" !== E || (A = !1), A && (this.diagnostics = { runnable: S, material: i, programLog: M, vertexShader: { log: T, prefix: d }, fragmentShader: { log: E, prefix: f } }), r.deleteShader(b), r.deleteShader(w);
            var R;
            this.getUniforms = function() {
                return void 0 === R && (R = new V(r, y, t)), R };
            var L;
            return this.getAttributes = function() {
                return void 0 === L && (L = Vt(r, y)), L }, this.destroy = function() { r.deleteProgram(y), this.program = void 0 }, Object.defineProperties(this, { uniforms: { get: function() {
                        return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms() } }, attributes: { get: function() {
                        return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), this.getAttributes() } } }), this.id = cl++, this.code = e, this.usedTimes = 1, this.program = y, this.vertexShader = b, this.fragmentShader = w, this }

        function Jt(t, e) {
            function i(t) {
                if (e.floatVertexTextures && t && t.skeleton && t.skeleton.useVertexTexture) return 1024;
                var i = e.maxVertexUniforms,
                    n = Math.floor((i - 20) / 4),
                    r = n;
                return void 0 !== t && t && t.isSkinnedMesh && (r = Math.min(t.skeleton.bones.length, r), r < t.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + t.skeleton.bones.length + ", this GPU supports just " + r + " (try OpenGL instead of ANGLE)")), r }

            function n(t, e) {
                var i;
                return t ? t.isTexture ? i = t.encoding : t.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), i = t.texture.encoding) : i = ko, i === ko && e && (i = jo), i }
            var r = [],
                a = { MeshDepthMaterial: "depth", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "phong", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points" },
                o = ["precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking"];
            this.getParameters = function(r, o, s, h, l, c) {
                var u = a[r.type],
                    p = i(c),
                    d = t.getPrecision();
                null !== r.precision && (d = e.getMaxPrecision(r.precision), d !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", d, "instead."));
                var f = t.getCurrentRenderTarget(),
                    m = { shaderID: u, precision: d, supportsVertexTextures: e.vertexTextures, outputEncoding: n(f ? f.texture : null, t.gammaOutput), map: !!r.map, mapEncoding: n(r.map, t.gammaInput), envMap: !!r.envMap, envMapMode: r.envMap && r.envMap.mapping, envMapEncoding: n(r.envMap, t.gammaInput), envMapCubeUV: !!r.envMap && (r.envMap.mapping === Ba || r.envMap.mapping === Ga), lightMap: !!r.lightMap, aoMap: !!r.aoMap, emissiveMap: !!r.emissiveMap, emissiveMapEncoding: n(r.emissiveMap, t.gammaInput), bumpMap: !!r.bumpMap, normalMap: !!r.normalMap, displacementMap: !!r.displacementMap, roughnessMap: !!r.roughnessMap, metalnessMap: !!r.metalnessMap, specularMap: !!r.specularMap, alphaMap: !!r.alphaMap, gradientMap: !!r.gradientMap, combine: r.combine, vertexColors: r.vertexColors, fog: !!s, useFog: r.fog, fogExp: s && s.isFogExp2, flatShading: r.shading === jr, sizeAttenuation: r.sizeAttenuation, logarithmicDepthBuffer: e.logarithmicDepthBuffer, skinning: r.skinning, maxBones: p, useVertexTexture: e.floatVertexTextures && c && c.skeleton && c.skeleton.useVertexTexture, morphTargets: r.morphTargets, morphNormals: r.morphNormals, maxMorphTargets: t.maxMorphTargets, maxMorphNormals: t.maxMorphNormals, numDirLights: o.directional.length, numPointLights: o.point.length, numSpotLights: o.spot.length, numRectAreaLights: o.rectArea.length, numHemiLights: o.hemi.length, numClippingPlanes: h, numClipIntersection: l, shadowMapEnabled: t.shadowMap.enabled && c.receiveShadow && o.shadows.length > 0, shadowMapType: t.shadowMap.type, toneMapping: t.toneMapping, physicallyCorrectLights: t.physicallyCorrectLights, premultipliedAlpha: r.premultipliedAlpha, alphaTest: r.alphaTest, doubleSided: r.side === Hr, flipSided: r.side === kr, depthPacking: void 0 !== r.depthPacking && r.depthPacking };
                return m }, this.getProgramCode = function(t, e) {
                var i = [];
                if (e.shaderID ? i.push(e.shaderID) : (i.push(t.fragmentShader), i.push(t.vertexShader)), void 0 !== t.defines)
                    for (var n in t.defines) i.push(n), i.push(t.defines[n]);
                for (var r = 0; r < o.length; r++) i.push(e[o[r]]);
                return i.join() }, this.acquireProgram = function(e, i, n) {
                for (var a, o = 0, s = r.length; o < s; o++) {
                    var h = r[o];
                    if (h.code === n) { a = h, ++a.usedTimes;
                        break } }
                return void 0 === a && (a = new Zt(t, n, e, i), r.push(a)), a }, this.releaseProgram = function(t) {
                if (0 === --t.usedTimes) {
                    var e = r.indexOf(t);
                    r[e] = r[r.length - 1], r.pop(), t.destroy() } }, this.programs = r }

        function Qt(t, e, i) {
            function n(t) {
                var r = t.target,
                    s = h[r.id];
                null !== s.index && a(s.index), o(s.attributes), r.removeEventListener("dispose", n), delete h[r.id];
                var l = e.get(r);
                l.wireframe && a(l.wireframe), e.delete(r);
                var c = e.get(s);
                c.wireframe && a(c.wireframe), e.delete(s), i.memory.geometries-- }

            function r(t) {
                return t.isInterleavedBufferAttribute ? e.get(t.data).__webglBuffer : e.get(t).__webglBuffer }

            function a(e) {
                var i = r(e);
                void 0 !== i && (t.deleteBuffer(i), s(e)) }

            function o(t) {
                for (var e in t) a(t[e]) }

            function s(t) { t.isInterleavedBufferAttribute ? e.delete(t.data) : e.delete(t) }
            var h = {};
            return { get: function(t) {
                    var e = t.geometry;
                    if (void 0 !== h[e.id]) return h[e.id];
                    e.addEventListener("dispose", n);
                    var r;
                    return e.isBufferGeometry ? r = e : e.isGeometry && (void 0 === e._bufferGeometry && (e._bufferGeometry = (new St).setFromObject(t)), r = e._bufferGeometry), h[e.id] = r, i.memory.geometries++, r } } }

        function Kt(t, e, i) {
            function n(e) {
                var i = c.get(e);
                e.geometry.isGeometry && i.updateFromObject(e);
                var n = i.index,
                    a = i.attributes;
                null !== n && r(n, t.ELEMENT_ARRAY_BUFFER);
                for (var o in a) r(a[o], t.ARRAY_BUFFER);
                var s = i.morphAttributes;
                for (var o in s)
                    for (var h = s[o], l = 0, u = h.length; l < u; l++) r(h[l], t.ARRAY_BUFFER);
                return i }

            function r(t, i) {
                var n = t.isInterleavedBufferAttribute ? t.data : t,
                    r = e.get(n);
                void 0 === r.__webglBuffer ? a(r, n, i) : r.version !== n.version && o(r, n, i) }

            function a(e, i, n) { e.__webglBuffer = t.createBuffer(), t.bindBuffer(n, e.__webglBuffer);
                var r = i.dynamic ? t.DYNAMIC_DRAW : t.STATIC_DRAW;
                t.bufferData(n, i.array, r);
                var a = t.FLOAT,
                    o = i.array;
                o instanceof Float32Array ? a = t.FLOAT : o instanceof Float64Array ? console.warn("Unsupported data buffer format: Float64Array") : o instanceof Uint16Array ? a = t.UNSIGNED_SHORT : o instanceof Int16Array ? a = t.SHORT : o instanceof Uint32Array ? a = t.UNSIGNED_INT : o instanceof Int32Array ? a = t.INT : o instanceof Int8Array ? a = t.BYTE : o instanceof Uint8Array && (a = t.UNSIGNED_BYTE), e.bytesPerElement = o.BYTES_PER_ELEMENT, e.type = a, e.version = i.version, i.onUploadCallback() }

            function o(e, i, n) { t.bindBuffer(n, e.__webglBuffer), i.dynamic === !1 ? t.bufferData(n, i.array, t.STATIC_DRAW) : i.updateRange.count === -1 ? t.bufferSubData(n, 0, i.array) : 0 === i.updateRange.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (t.bufferSubData(n, i.updateRange.offset * i.array.BYTES_PER_ELEMENT, i.array.subarray(i.updateRange.offset, i.updateRange.offset + i.updateRange.count)), i.updateRange.count = 0), e.version = i.version }

            function s(t) {
                return t.isInterleavedBufferAttribute ? e.get(t.data).__webglBuffer : e.get(t).__webglBuffer }

            function h(t) {
                return t.isInterleavedBufferAttribute ? e.get(t.data) : e.get(t) }

            function l(i) {
                var n = e.get(i);
                if (void 0 !== n.wireframe) return n.wireframe;
                var a = [],
                    o = i.index,
                    s = i.attributes,
                    h = s.position;
                if (null !== o)
                    for (var l = o.array, c = 0, u = l.length; c < u; c += 3) {
                        var p = l[c + 0],
                            d = l[c + 1],
                            f = l[c + 2];
                        a.push(p, d, d, f, f, p) } else
                        for (var l = s.position.array, c = 0, u = l.length / 3 - 1; c < u; c += 3) {
                            var p = c + 0,
                                d = c + 1,
                                f = c + 2;
                            a.push(p, d, d, f, f, p) }
                var m = h.count > 65535 ? Uint32Array : Uint16Array,
                    g = new dt(new m(a), 1);
                return r(g, t.ELEMENT_ARRAY_BUFFER), n.wireframe = g, g }
            var c = new Qt(t, e, i);
            return { getAttributeBuffer: s, getAttributeProperties: h, getWireframeAttribute: l, update: n } }

        function $t(t, e, i, n, r, a, o) {
            function s(t, e) {
                if (t.width > e || t.height > e) {
                    var i = e / Math.max(t.width, t.height),
                        n = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                    n.width = Math.floor(t.width * i), n.height = Math.floor(t.height * i);
                    var r = n.getContext("2d");
                    return r.drawImage(t, 0, 0, t.width, t.height, 0, 0, n.width, n.height), console.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + n.width + "x" + n.height, t), n }
                return t }

            function h(t) {
                return Qo.isPowerOfTwo(t.width) && Qo.isPowerOfTwo(t.height) }

            function l(t) {
                if (t instanceof HTMLImageElement || t instanceof HTMLCanvasElement) {
                    var e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                    e.width = Qo.nearestPowerOfTwo(t.width), e.height = Qo.nearestPowerOfTwo(t.height);
                    var i = e.getContext("2d");
                    return i.drawImage(t, 0, 0, e.width, e.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + t.width + "x" + t.height + "). Resized to " + e.width + "x" + e.height, t), e }
                return t }

            function c(t) {
                return t.wrapS !== ja || t.wrapT !== ja || t.minFilter !== Xa && t.minFilter !== Za }

            function u(e) {
                return e === Xa || e === Ya || e === qa ? t.NEAREST : t.LINEAR }

            function p(t) {
                var e = t.target;
                e.removeEventListener("dispose", p), f(e), A.textures-- }

            function d(t) {
                var e = t.target;
                e.removeEventListener("dispose", d), m(e), A.textures-- }

            function f(e) {
                var i = n.get(e);
                if (e.image && i.__image__webglTextureCube) t.deleteTexture(i.__image__webglTextureCube);
                else {
                    if (void 0 === i.__webglInit) return;
                    t.deleteTexture(i.__webglTexture) }
                n.delete(e) }

            function m(e) {
                var i = n.get(e),
                    r = n.get(e.texture);
                if (e) {
                    if (void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture), e.depthTexture && e.depthTexture.dispose(), e.isWebGLRenderTargetCube)
                        for (var a = 0; a < 6; a++) t.deleteFramebuffer(i.__webglFramebuffer[a]), i.__webglDepthbuffer && t.deleteRenderbuffer(i.__webglDepthbuffer[a]);
                    else t.deleteFramebuffer(i.__webglFramebuffer), i.__webglDepthbuffer && t.deleteRenderbuffer(i.__webglDepthbuffer);
                    n.delete(e.texture), n.delete(e) } }

            function g(e, r) {
                var a = n.get(e);
                if (e.version > 0 && a.__version !== e.version) {
                    var o = e.image;
                    if (void 0 === o) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", e);
                    else {
                        if (o.complete !== !1) return void x(a, e, r);
                        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", e) } }
                i.activeTexture(t.TEXTURE0 + r), i.bindTexture(t.TEXTURE_2D, a.__webglTexture) }

            function v(e, o) {
                var l = n.get(e);
                if (6 === e.image.length)
                    if (e.version > 0 && l.__version !== e.version) { l.__image__webglTextureCube || (e.addEventListener("dispose", p), l.__image__webglTextureCube = t.createTexture(), A.textures++), i.activeTexture(t.TEXTURE0 + o), i.bindTexture(t.TEXTURE_CUBE_MAP, l.__image__webglTextureCube), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY);
                        for (var c = e && e.isCompressedTexture, u = e.image[0] && e.image[0].isDataTexture, d = [], f = 0; f < 6; f++) c || u ? d[f] = u ? e.image[f].image : e.image[f] : d[f] = s(e.image[f], r.maxCubemapSize);
                        var m = d[0],
                            g = h(m),
                            v = a(e.format),
                            y = a(e.type);
                        _(t.TEXTURE_CUBE_MAP, e, g);
                        for (var f = 0; f < 6; f++)
                            if (c)
                                for (var x, b = d[f].mipmaps, w = 0, M = b.length; w < M; w++) x = b[w], e.format !== fo && e.format !== po ? i.getCompressedTextureFormats().indexOf(v) > -1 ? i.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, w, v, x.width, x.height, 0, x.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, w, v, x.width, x.height, 0, v, y, x.data);
                            else u ? i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, v, d[f].width, d[f].height, 0, v, y, d[f].data) : i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, v, v, y, d[f]);
                        e.generateMipmaps && g && t.generateMipmap(t.TEXTURE_CUBE_MAP), l.__version = e.version, e.onUpdate && e.onUpdate(e) } else i.activeTexture(t.TEXTURE0 + o), i.bindTexture(t.TEXTURE_CUBE_MAP, l.__image__webglTextureCube) }

            function y(e, r) { i.activeTexture(t.TEXTURE0 + r), i.bindTexture(t.TEXTURE_CUBE_MAP, n.get(e).__webglTexture) }

            function _(i, o, s) {
                var h;
                if (s ? (t.texParameteri(i, t.TEXTURE_WRAP_S, a(o.wrapS)), t.texParameteri(i, t.TEXTURE_WRAP_T, a(o.wrapT)), t.texParameteri(i, t.TEXTURE_MAG_FILTER, a(o.magFilter)), t.texParameteri(i, t.TEXTURE_MIN_FILTER, a(o.minFilter))) : (t.texParameteri(i, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(i, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), o.wrapS === ja && o.wrapT === ja || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", o), t.texParameteri(i, t.TEXTURE_MAG_FILTER, u(o.magFilter)), t.texParameteri(i, t.TEXTURE_MIN_FILTER, u(o.minFilter)), o.minFilter !== Xa && o.minFilter !== Za && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", o)), h = e.get("EXT_texture_filter_anisotropic")) {
                    if (o.type === ao && null === e.get("OES_texture_float_linear")) return;
                    if (o.type === oo && null === e.get("OES_texture_half_float_linear")) return;
                    (o.anisotropy > 1 || n.get(o).__currentAnisotropy) && (t.texParameterf(i, h.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(o.anisotropy, r.getMaxAnisotropy())), n.get(o).__currentAnisotropy = o.anisotropy) } }

            function x(e, n, o) { void 0 === e.__webglInit && (e.__webglInit = !0, n.addEventListener("dispose", p), e.__webglTexture = t.createTexture(), A.textures++), i.activeTexture(t.TEXTURE0 + o), i.bindTexture(t.TEXTURE_2D, e.__webglTexture), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, n.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, n.unpackAlignment);
                var u = s(n.image, r.maxTextureSize);
                c(n) && h(u) === !1 && (u = l(u));
                var d = h(u),
                    f = a(n.format),
                    m = a(n.type);
                _(t.TEXTURE_2D, n, d);
                var g, v = n.mipmaps;
                if (n.isDepthTexture) {
                    var y = t.DEPTH_COMPONENT;
                    if (n.type === ao) {
                        if (!R) throw new Error("Float Depth Texture only supported in WebGL2.0");
                        y = t.DEPTH_COMPONENT32F } else R && (y = t.DEPTH_COMPONENT16);
                    n.format === yo && y === t.DEPTH_COMPONENT && n.type !== io && n.type !== ro && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), n.type = io, m = a(n.type)), n.format === _o && (y = t.DEPTH_STENCIL, n.type !== co && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), n.type = co, m = a(n.type))), i.texImage2D(t.TEXTURE_2D, 0, y, u.width, u.height, 0, f, m, null) } else if (n.isDataTexture)
                    if (v.length > 0 && d) {
                        for (var x = 0, b = v.length; x < b; x++) g = v[x], i.texImage2D(t.TEXTURE_2D, x, f, g.width, g.height, 0, f, m, g.data);
                        n.generateMipmaps = !1 } else i.texImage2D(t.TEXTURE_2D, 0, f, u.width, u.height, 0, f, m, u.data);
                else if (n.isCompressedTexture)
                    for (var x = 0, b = v.length; x < b; x++) g = v[x], n.format !== fo && n.format !== po ? i.getCompressedTextureFormats().indexOf(f) > -1 ? i.compressedTexImage2D(t.TEXTURE_2D, x, f, g.width, g.height, 0, g.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : i.texImage2D(t.TEXTURE_2D, x, f, g.width, g.height, 0, f, m, g.data);
                else if (v.length > 0 && d) {
                    for (var x = 0, b = v.length; x < b; x++) g = v[x], i.texImage2D(t.TEXTURE_2D, x, f, f, m, g);
                    n.generateMipmaps = !1 } else i.texImage2D(t.TEXTURE_2D, 0, f, f, m, u);
                n.generateMipmaps && d && t.generateMipmap(t.TEXTURE_2D), e.__version = n.version, n.onUpdate && n.onUpdate(n) }

            function b(e, r, o, s) {
                var h = a(r.texture.format),
                    l = a(r.texture.type);
                i.texImage2D(s, 0, h, r.width, r.height, 0, h, l, null), t.bindFramebuffer(t.FRAMEBUFFER, e), t.framebufferTexture2D(t.FRAMEBUFFER, o, s, n.get(r.texture).__webglTexture, 0), t.bindFramebuffer(t.FRAMEBUFFER, null) }

            function w(e, i) { t.bindRenderbuffer(t.RENDERBUFFER, e), i.depthBuffer && !i.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, i.width, i.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, e)) : i.depthBuffer && i.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, i.width, i.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, e)) : t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i.width, i.height), t.bindRenderbuffer(t.RENDERBUFFER, null) }

            function M(e, i) {
                var r = i && i.isWebGLRenderTargetCube;
                if (r) throw new Error("Depth Texture with cube render targets is not supported!");
                if (t.bindFramebuffer(t.FRAMEBUFFER, e), !i.depthTexture || !i.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                n.get(i.depthTexture).__webglTexture && i.depthTexture.image.width === i.width && i.depthTexture.image.height === i.height || (i.depthTexture.image.width = i.width, i.depthTexture.image.height = i.height, i.depthTexture.needsUpdate = !0), g(i.depthTexture, 0);
                var a = n.get(i.depthTexture).__webglTexture;
                if (i.depthTexture.format === yo) t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, a, 0);
                else {
                    if (i.depthTexture.format !== _o) throw new Error("Unknown depthTexture format");
                    t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, a, 0) } }

            function T(e) {
                var i = n.get(e),
                    r = e.isWebGLRenderTargetCube === !0;
                if (e.depthTexture) {
                    if (r) throw new Error("target.depthTexture not supported in Cube render targets");
                    M(i.__webglFramebuffer, e) } else if (r) { i.__webglDepthbuffer = [];
                    for (var a = 0; a < 6; a++) t.bindFramebuffer(t.FRAMEBUFFER, i.__webglFramebuffer[a]), i.__webglDepthbuffer[a] = t.createRenderbuffer(), w(i.__webglDepthbuffer[a], e) } else t.bindFramebuffer(t.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer = t.createRenderbuffer(), w(i.__webglDepthbuffer, e);
                t.bindFramebuffer(t.FRAMEBUFFER, null) }

            function E(e) {
                var r = n.get(e),
                    a = n.get(e.texture);
                e.addEventListener("dispose", d), a.__webglTexture = t.createTexture(), A.textures++;
                var o = e.isWebGLRenderTargetCube === !0,
                    s = h(e);
                if (o) { r.__webglFramebuffer = [];
                    for (var l = 0; l < 6; l++) r.__webglFramebuffer[l] = t.createFramebuffer() } else r.__webglFramebuffer = t.createFramebuffer();
                if (o) { i.bindTexture(t.TEXTURE_CUBE_MAP, a.__webglTexture), _(t.TEXTURE_CUBE_MAP, e.texture, s);
                    for (var l = 0; l < 6; l++) b(r.__webglFramebuffer[l], e, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + l);
                    e.texture.generateMipmaps && s && t.generateMipmap(t.TEXTURE_CUBE_MAP), i.bindTexture(t.TEXTURE_CUBE_MAP, null) } else i.bindTexture(t.TEXTURE_2D, a.__webglTexture), _(t.TEXTURE_2D, e.texture, s), b(r.__webglFramebuffer, e, t.COLOR_ATTACHMENT0, t.TEXTURE_2D), e.texture.generateMipmaps && s && t.generateMipmap(t.TEXTURE_2D), i.bindTexture(t.TEXTURE_2D, null);
                e.depthBuffer && T(e) }

            function S(e) {
                var r = e.texture;
                if (r.generateMipmaps && h(e) && r.minFilter !== Xa && r.minFilter !== Za) {
                    var a = e && e.isWebGLRenderTargetCube ? t.TEXTURE_CUBE_MAP : t.TEXTURE_2D,
                        o = n.get(r).__webglTexture;
                    i.bindTexture(a, o), t.generateMipmap(a), i.bindTexture(a, null) } }
            var A = o.memory,
                R = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext;
            this.setTexture2D = g, this.setTextureCube = v, this.setTextureCubeDynamic = y, this.setupRenderTarget = E, this.updateRenderTargetMipmap = S
        }

        function te() {
            var t = {};
            return { get: function(e) {
                    var i = e.uuid,
                        n = t[i];
                    return void 0 === n && (n = {}, t[i] = n), n }, delete: function(e) { delete t[e.uuid] }, clear: function() { t = {} } } }

        function ee(t, e, i) {
            function n() {
                var e = !1,
                    i = new r,
                    n = null,
                    a = new r;
                return { setMask: function(i) { n === i || e || (t.colorMask(i, i, i, i), n = i) }, setLocked: function(t) { e = t }, setClear: function(e, n, r, o, s) { s === !0 && (e *= o, n *= o, r *= o), i.set(e, n, r, o), a.equals(i) === !1 && (t.clearColor(e, n, r, o), a.copy(i)) }, reset: function() { e = !1, n = null, a.set(0, 0, 0, 1) } } }

            function a() {
                var e = !1,
                    i = null,
                    n = null,
                    r = null;
                return { setTest: function(e) { e ? d(t.DEPTH_TEST) : f(t.DEPTH_TEST) }, setMask: function(n) { i === n || e || (t.depthMask(n), i = n) }, setFunc: function(e) {
                        if (n !== e) {
                            if (e) switch (e) {
                                case va:
                                    t.depthFunc(t.NEVER);
                                    break;
                                case ya:
                                    t.depthFunc(t.ALWAYS);
                                    break;
                                case _a:
                                    t.depthFunc(t.LESS);
                                    break;
                                case xa:
                                    t.depthFunc(t.LEQUAL);
                                    break;
                                case ba:
                                    t.depthFunc(t.EQUAL);
                                    break;
                                case wa:
                                    t.depthFunc(t.GEQUAL);
                                    break;
                                case Ma:
                                    t.depthFunc(t.GREATER);
                                    break;
                                case Ta:
                                    t.depthFunc(t.NOTEQUAL);
                                    break;
                                default:
                                    t.depthFunc(t.LEQUAL) } else t.depthFunc(t.LEQUAL);
                            n = e } }, setLocked: function(t) { e = t }, setClear: function(e) { r !== e && (t.clearDepth(e), r = e) }, reset: function() { e = !1, i = null, n = null, r = null } } }

            function o() {
                var e = !1,
                    i = null,
                    n = null,
                    r = null,
                    a = null,
                    o = null,
                    s = null,
                    h = null,
                    l = null;
                return { setTest: function(e) { e ? d(t.STENCIL_TEST) : f(t.STENCIL_TEST) }, setMask: function(n) { i === n || e || (t.stencilMask(n), i = n) }, setFunc: function(e, i, o) { n === e && r === i && a === o || (t.stencilFunc(e, i, o), n = e, r = i, a = o) }, setOp: function(e, i, n) { o === e && s === i && h === n || (t.stencilOp(e, i, n), o = e, s = i, h = n) }, setLocked: function(t) { e = t }, setClear: function(e) { l !== e && (t.clearStencil(e), l = e) }, reset: function() { e = !1, i = null, n = null, r = null, a = null, o = null, s = null, h = null, l = null } } }

            function s(e, i, n) {
                var r = new Uint8Array(4),
                    a = t.createTexture();
                t.bindTexture(e, a), t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
                for (var o = 0; o < n; o++) t.texImage2D(i + o, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, r);
                return a }

            function h() { z.setClear(0, 0, 0, 1), B.setClear(1), G.setClear(0), d(t.DEPTH_TEST), x(xa), E(!1), S(Ir), d(t.CULL_FACE), d(t.BLEND), g(Zr) }

            function l() {
                for (var t = 0, e = H.length; t < e; t++) H[t] = 0 }

            function c(i) {
                if (H[i] = 1, 0 === j[i] && (t.enableVertexAttribArray(i), j[i] = 1), 0 !== V[i]) {
                    var n = e.get("ANGLE_instanced_arrays");
                    n.vertexAttribDivisorANGLE(i, 0), V[i] = 0 } }

            function u(e, i, n) { H[e] = 1, 0 === j[e] && (t.enableVertexAttribArray(e), j[e] = 1), V[e] !== i && (n.vertexAttribDivisorANGLE(e, i), V[e] = i) }

            function p() {
                for (var e = 0, i = j.length; e !== i; ++e) j[e] !== H[e] && (t.disableVertexAttribArray(e), j[e] = 0) }

            function d(e) { W[e] !== !0 && (t.enable(e), W[e] = !0) }

            function f(e) { W[e] !== !1 && (t.disable(e), W[e] = !1) }

            function m() {
                if (null === X && (X = [], e.get("WEBGL_compressed_texture_pvrtc") || e.get("WEBGL_compressed_texture_s3tc") || e.get("WEBGL_compressed_texture_etc1")))
                    for (var i = t.getParameter(t.COMPRESSED_TEXTURE_FORMATS), n = 0; n < i.length; n++) X.push(i[n]);
                return X }

            function g(e, n, r, a, o, s, h, l) { e !== qr ? d(t.BLEND) : f(t.BLEND), e === Y && l === tt || (e === Jr ? l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE, t.ONE, t.ONE)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.SRC_ALPHA, t.ONE)) : e === Qr ? l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR)) : e === Kr ? l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.SRC_COLOR)) : l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)), Y = e, tt = l), e === $r ? (o = o || n, s = s || r, h = h || a, n === q && o === Q || (t.blendEquationSeparate(i(n), i(o)), q = n, Q = o), r === Z && a === J && s === K && h === $ || (t.blendFuncSeparate(i(r), i(a), i(s), i(h)), Z = r, J = a, K = s, $ = h)) : (q = null, Z = null, J = null, Q = null, K = null, $ = null) }

            function v(t) { z.setMask(t) }

            function y(t) { B.setTest(t) }

            function _(t) { B.setMask(t) }

            function x(t) { B.setFunc(t) }

            function b(t) { G.setTest(t) }

            function w(t) { G.setMask(t) }

            function M(t, e, i) { G.setFunc(t, e, i) }

            function T(t, e, i) { G.setOp(t, e, i) }

            function E(e) { et !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), et = e) }

            function S(e) { e !== Cr ? (d(t.CULL_FACE), e !== it && (e === Ir ? t.cullFace(t.BACK) : e === Or ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK))) : f(t.CULL_FACE), it = e }

            function A(e) { e !== nt && (lt && t.lineWidth(e), nt = e) }

            function R(e, i, n) { e ? (d(t.POLYGON_OFFSET_FILL), rt === i && at === n || (t.polygonOffset(i, n), rt = i, at = n)) : f(t.POLYGON_OFFSET_FILL) }

            function L() {
                return ot }

            function P(e) { ot = e, e ? d(t.SCISSOR_TEST) : f(t.SCISSOR_TEST) }

            function C(e) { void 0 === e && (e = t.TEXTURE0 + st - 1), ct !== e && (t.activeTexture(e), ct = e) }

            function I(e, i) { null === ct && C();
                var n = ut[ct];
                void 0 === n && (n = { type: void 0, texture: void 0 }, ut[ct] = n), n.type === e && n.texture === i || (t.bindTexture(e, i || ft[e]), n.type = e, n.texture = i) }

            function O() {
                try { t.compressedTexImage2D.apply(t, arguments) } catch (t) { console.error(t) } }

            function D() {
                try { t.texImage2D.apply(t, arguments) } catch (t) { console.error(t) } }

            function U(e) { pt.equals(e) === !1 && (t.scissor(e.x, e.y, e.z, e.w), pt.copy(e)) }

            function N(e) { dt.equals(e) === !1 && (t.viewport(e.x, e.y, e.z, e.w), dt.copy(e)) }

            function F() {
                for (var e = 0; e < j.length; e++) 1 === j[e] && (t.disableVertexAttribArray(e), j[e] = 0);
                W = {}, X = null, ct = null, ut = {}, Y = null, et = null, it = null, z.reset(), B.reset(), G.reset() }
            var z = new n,
                B = new a,
                G = new o,
                k = t.getParameter(t.MAX_VERTEX_ATTRIBS),
                H = new Uint8Array(k),
                j = new Uint8Array(k),
                V = new Uint8Array(k),
                W = {},
                X = null,
                Y = null,
                q = null,
                Z = null,
                J = null,
                Q = null,
                K = null,
                $ = null,
                tt = !1,
                et = null,
                it = null,
                nt = null,
                rt = null,
                at = null,
                ot = null,
                st = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
                ht = parseFloat(/^WebGL\ ([0-9])/.exec(t.getParameter(t.VERSION))[1]),
                lt = parseFloat(ht) >= 1,
                ct = null,
                ut = {},
                pt = new r,
                dt = new r,
                ft = {};
            return ft[t.TEXTURE_2D] = s(t.TEXTURE_2D, t.TEXTURE_2D, 1), ft[t.TEXTURE_CUBE_MAP] = s(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6), { buffers: { color: z, depth: B, stencil: G }, init: h, initAttributes: l, enableAttribute: c, enableAttributeAndDivisor: u, disableUnusedAttributes: p, enable: d, disable: f, getCompressedTextureFormats: m, setBlending: g, setColorWrite: v, setDepthTest: y, setDepthWrite: _, setDepthFunc: x, setStencilTest: b, setStencilWrite: w, setStencilFunc: M, setStencilOp: T, setFlipSided: E, setCullFace: S, setLineWidth: A, setPolygonOffset: R, getScissorTest: L, setScissorTest: P, activeTexture: C, bindTexture: I, compressedTexImage2D: O, texImage2D: D, scissor: U, viewport: N, reset: F } }

        function ie(t, e, i) {
            function n() {
                if (void 0 !== a) return a;
                var i = e.get("EXT_texture_filter_anisotropic");
                return a = null !== i ? t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0 }

            function r(e) {
                if ("highp" === e) {
                    if (t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision > 0) return "highp";
                    e = "mediump" }
                return "mediump" === e && t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp" }
            var a, o = void 0 !== i.precision ? i.precision : "highp",
                s = r(o);
            s !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", s, "instead."), o = s);
            var h = i.logarithmicDepthBuffer === !0 && !!e.get("EXT_frag_depth"),
                l = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
                c = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                u = t.getParameter(t.MAX_TEXTURE_SIZE),
                p = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),
                d = t.getParameter(t.MAX_VERTEX_ATTRIBS),
                f = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),
                m = t.getParameter(t.MAX_VARYING_VECTORS),
                g = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),
                v = c > 0,
                y = !!e.get("OES_texture_float"),
                _ = v && y;
            return { getMaxAnisotropy: n, getMaxPrecision: r, precision: o, logarithmicDepthBuffer: h, maxTextures: l, maxVertexTextures: c, maxTextureSize: u, maxCubemapSize: p, maxAttributes: d, maxVertexUniforms: f, maxVaryings: m, maxFragmentUniforms: g, vertexTextures: v, floatFragmentTextures: y, floatVertexTextures: _ } }

        function ne(t) {
            var e = {};
            return { get: function(i) {
                    if (void 0 !== e[i]) return e[i];
                    var n;
                    switch (i) {
                        case "WEBGL_depth_texture":
                            n = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
                            break;
                        case "EXT_texture_filter_anisotropic":
                            n = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                            break;
                        case "WEBGL_compressed_texture_s3tc":
                            n = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                            break;
                        case "WEBGL_compressed_texture_pvrtc":
                            n = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                            break;
                        case "WEBGL_compressed_texture_etc1":
                            n = t.getExtension("WEBGL_compressed_texture_etc1");
                            break;
                        default:
                            n = t.getExtension(i) }
                    return null === n && console.warn("THREE.WebGLRenderer: " + i + " extension not supported."), e[i] = n, n } } }

        function re() {
            function t() { l.value !== n && (l.value = n, l.needsUpdate = r > 0), i.numPlanes = r, i.numIntersection = 0 }

            function e(t, e, n, r) {
                var a = null !== t ? t.length : 0,
                    o = null;
                if (0 !== a) {
                    if (o = l.value, r !== !0 || null === o) {
                        var c = n + 4 * a,
                            u = e.matrixWorldInverse;
                        h.getNormalMatrix(u), (null === o || o.length < c) && (o = new Float32Array(c));
                        for (var p = 0, d = n; p !== a; ++p, d += 4) s.copy(t[p]).applyMatrix4(u, h), s.normal.toArray(o, d), o[d + 3] = s.constant }
                    l.value = o, l.needsUpdate = !0 }
                return i.numPlanes = a, o }
            var i = this,
                n = null,
                r = 0,
                a = !1,
                o = !1,
                s = new it,
                h = new et,
                l = { value: null, needsUpdate: !1 };
            this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(t, i, o) {
                var s = 0 !== t.length || i || 0 !== r || a;
                return a = i, n = e(t, o, 0), r = t.length, s }, this.beginShadows = function() { o = !0, e(null) }, this.endShadows = function() { o = !1, t() }, this.setState = function(i, s, h, c, u, p) {
                if (!a || null === i || 0 === i.length || o && !h) o ? e(null) : t();
                else {
                    var d = o ? 0 : r,
                        f = 4 * d,
                        m = u.clippingState || null;
                    l.value = m, m = e(i, c, f, p);
                    for (var g = 0; g !== f; ++g) m[g] = n[g];
                    u.clippingState = m, this.numIntersection = s ? this.numPlanes : 0, this.numPlanes += d } } }

        function ae(t) {
            function e() {
                return null === dt ? Pt : 1 }

            function i() { he.init(), he.scissor(yt.copy(Nt).multiplyScalar(Pt)), he.viewport(xt.copy(zt).multiplyScalar(Pt)), he.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, J) }

            function n() { ut = null, vt = null, gt = "", mt = -1, he.reset() }

            function a(t) { t.preventDefault(), n(), i(), le.clear() }

            function o(t) {
                var e = t.target;
                e.removeEventListener("dispose", o), s(e) }

            function s(t) { c(t), le.delete(t) }

            function c(t) {
                var e = le.get(t).program;
                t.program = void 0, void 0 !== e && pe.releaseProgram(e) }

            function u(t, e, i, n) {
                var r;
                if (i && i.isInstancedBufferGeometry && (r = oe.get("ANGLE_instanced_arrays"), null === r)) return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                void 0 === n && (n = 0), he.initAttributes();
                var a = i.attributes,
                    o = e.getAttributes(),
                    s = t.defaultAttributeValues;
                for (var h in o) {
                    var l = o[h];
                    if (l >= 0) {
                        var c = a[h];
                        if (void 0 !== c) {
                            var u = c.normalized,
                                p = c.itemSize,
                                d = ue.getAttributeProperties(c),
                                f = d.__webglBuffer,
                                m = d.type,
                                g = d.bytesPerElement;
                            if (c.isInterleavedBufferAttribute) {
                                var v = c.data,
                                    y = v.stride,
                                    _ = c.offset;
                                v && v.isInstancedInterleavedBuffer ? (he.enableAttributeAndDivisor(l, v.meshPerAttribute, r), void 0 === i.maxInstancedCount && (i.maxInstancedCount = v.meshPerAttribute * v.count)) : he.enableAttribute(l), Qt.bindBuffer(Qt.ARRAY_BUFFER, f), Qt.vertexAttribPointer(l, p, m, u, y * g, (n * y + _) * g) } else c.isInstancedBufferAttribute ? (he.enableAttributeAndDivisor(l, c.meshPerAttribute, r), void 0 === i.maxInstancedCount && (i.maxInstancedCount = c.meshPerAttribute * c.count)) : he.enableAttribute(l), Qt.bindBuffer(Qt.ARRAY_BUFFER, f), Qt.vertexAttribPointer(l, p, m, u, 0, n * p * g) } else if (void 0 !== s) {
                            var x = s[h];
                            if (void 0 !== x) switch (x.length) {
                                case 2:
                                    Qt.vertexAttrib2fv(l, x);
                                    break;
                                case 3:
                                    Qt.vertexAttrib3fv(l, x);
                                    break;
                                case 4:
                                    Qt.vertexAttrib4fv(l, x);
                                    break;
                                default:
                                    Qt.vertexAttrib1fv(l, x) } } } }
                he.disableUnusedAttributes() }

            function p(t, e) {
                return Math.abs(e[0]) - Math.abs(t[0]) }

            function d(t, e) {
                return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.material.program && e.material.program && t.material.program !== e.material.program ? t.material.program.id - e.material.program.id : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id }

            function f(t, e) {
                return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id }

            function m(t, e, i, n, r) {
                var a, o;
                i.transparent ? (a = at, o = ++ot) : (a = et, o = ++it);
                var s = a[o];
                void 0 !== s ? (s.id = t.id, s.object = t, s.geometry = e, s.material = i, s.z = Wt.z, s.group = r) : (s = { id: t.id, object: t, geometry: e, material: i, z: Wt.z, group: r }, a.push(s)) }

            function g(t) {
                var e = t.geometry;
                return null === e.boundingSphere && e.computeBoundingSphere(), jt.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), y(jt) }

            function v(t) {
                return jt.center.set(0, 0, 0), jt.radius = .7071067811865476, jt.applyMatrix4(t.matrixWorld), y(jt) }

            function y(t) {
                if (!Bt.intersectsSphere(t)) return !1;
                var e = Gt.numPlanes;
                if (0 === e) return !0;
                var i = ct.clippingPlanes,
                    n = t.center,
                    r = -t.radius,
                    a = 0;
                do
                    if (i[a].distanceToPoint(n) < r) return !1;
                while (++a !== e);
                return !0 }

            function _(t, e) {
                if (t.visible !== !1) {
                    var i = 0 !== (t.layers.mask & e.layers.mask);
                    if (i)
                        if (t.isLight) $.push(t);
                        else if (t.isSprite) t.frustumCulled !== !1 && v(t) !== !0 || ht.push(t);
                    else if (t.isLensFlare) lt.push(t);
                    else if (t.isImmediateRenderObject) ct.sortObjects === !0 && (Wt.setFromMatrixPosition(t.matrixWorld), Wt.applyProjection(Vt)), m(t, null, t.material, Wt.z, null);
                    else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.update(), t.frustumCulled === !1 || g(t) === !0)) {
                        var n = t.material;
                        if (n.visible === !0) { ct.sortObjects === !0 && (Wt.setFromMatrixPosition(t.matrixWorld), Wt.applyProjection(Vt));
                            var r = ue.update(t);
                            if (n.isMultiMaterial)
                                for (var a = r.groups, o = n.materials, s = 0, h = a.length; s < h; s++) {
                                    var l = a[s],
                                        c = o[l.materialIndex];
                                    c.visible === !0 && m(t, r, c, Wt.z, l) } else m(t, r, n, Wt.z, null) } }
                    for (var u = t.children, s = 0, h = u.length; s < h; s++) _(u[s], e) } }

            function x(t, e, i, n) {
                for (var r = 0, a = t.length; r < a; r++) {
                    var o = t[r],
                        s = o.object,
                        h = o.geometry,
                        l = void 0 === n ? o.material : n,
                        c = o.group;
                    if (s.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, s.matrixWorld), s.normalMatrix.getNormalMatrix(s.modelViewMatrix), s.onBeforeRender(ct, e, i, h, l, c), s.isImmediateRenderObject) { w(l);
                        var u = M(i, e.fog, l, s);
                        gt = "", s.render(function(t) { ct.renderBufferImmediate(t, u, l) }) } else ct.renderBufferDirect(i, e.fog, h, l, s, c);
                    s.onAfterRender(ct, e, i, h, l, c) } }

            function b(t, e, i) {
                var n = le.get(t),
                    r = pe.getParameters(t, qt, e, Gt.numPlanes, Gt.numIntersection, i),
                    a = pe.getProgramCode(t, r),
                    s = n.program,
                    h = !0;
                if (void 0 === s) t.addEventListener("dispose", o);
                else if (s.code !== a) c(t);
                else {
                    if (void 0 !== r.shaderID) return;
                    h = !1 }
                if (h) {
                    if (r.shaderID) {
                        var l = ol[r.shaderID];
                        n.__webglShader = { name: t.type, uniforms: rs.clone(l.uniforms), vertexShader: l.vertexShader, fragmentShader: l.fragmentShader } } else n.__webglShader = { name: t.type, uniforms: t.uniforms, vertexShader: t.vertexShader, fragmentShader: t.fragmentShader };
                    t.__webglShader = n.__webglShader, s = pe.acquireProgram(t, r, a), n.program = s, t.program = s }
                var u = s.getAttributes();
                if (t.morphTargets) { t.numSupportedMorphTargets = 0;
                    for (var p = 0; p < ct.maxMorphTargets; p++) u["morphTarget" + p] >= 0 && t.numSupportedMorphTargets++ }
                if (t.morphNormals) { t.numSupportedMorphNormals = 0;
                    for (var p = 0; p < ct.maxMorphNormals; p++) u["morphNormal" + p] >= 0 && t.numSupportedMorphNormals++ }
                var d = n.__webglShader.uniforms;
                (t.isShaderMaterial || t.isRawShaderMaterial) && t.clipping !== !0 || (n.numClippingPlanes = Gt.numPlanes, n.numIntersection = Gt.numIntersection, d.clippingPlanes = Gt.uniform), n.fog = e, n.lightsHash = qt.hash, t.lights && (d.ambientLightColor.value = qt.ambient, d.directionalLights.value = qt.directional, d.spotLights.value = qt.spot, d.rectAreaLights.value = qt.rectArea, d.pointLights.value = qt.point, d.hemisphereLights.value = qt.hemi, d.directionalShadowMap.value = qt.directionalShadowMap, d.directionalShadowMatrix.value = qt.directionalShadowMatrix, d.spotShadowMap.value = qt.spotShadowMap, d.spotShadowMatrix.value = qt.spotShadowMatrix, d.pointShadowMap.value = qt.pointShadowMap, d.pointShadowMatrix.value = qt.pointShadowMatrix);
                var f = n.program.getUniforms(),
                    m = V.seqWithValue(f.seq, d);
                n.uniformsList = m }

            function w(t) { t.side === Hr ? he.disable(Qt.CULL_FACE) : he.enable(Qt.CULL_FACE), he.setFlipSided(t.side === kr), t.transparent === !0 ? he.setBlending(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha) : he.setBlending(qr), he.setDepthFunc(t.depthFunc), he.setDepthTest(t.depthTest), he.setDepthWrite(t.depthWrite), he.setColorWrite(t.colorWrite), he.setPolygonOffset(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits) }

            function M(t, e, i, n) { bt = 0;
                var r = le.get(i);
                if (kt && (Ht || t !== vt)) {
                    var a = t === vt && i.id === mt;
                    Gt.setState(i.clippingPlanes, i.clipIntersection, i.clipShadows, t, r, a) }
                i.needsUpdate === !1 && (void 0 === r.program ? i.needsUpdate = !0 : i.fog && r.fog !== e ? i.needsUpdate = !0 : i.lights && r.lightsHash !== qt.hash ? i.needsUpdate = !0 : void 0 === r.numClippingPlanes || r.numClippingPlanes === Gt.numPlanes && r.numIntersection === Gt.numIntersection || (i.needsUpdate = !0)), i.needsUpdate && (b(i, e, n), i.needsUpdate = !1);
                var o = !1,
                    s = !1,
                    h = !1,
                    l = r.program,
                    c = l.getUniforms(),
                    u = r.__webglShader.uniforms;
                if (l.id !== ut && (Qt.useProgram(l.program), ut = l.id, o = !0, s = !0, h = !0), i.id !== mt && (mt = i.id, s = !0), o || t !== vt) {
                    if (c.set(Qt, t, "projectionMatrix"), se.logarithmicDepthBuffer && c.setValue(Qt, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), t !== vt && (vt = t, s = !0, h = !0), i.isShaderMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.envMap) {
                        var p = c.map.cameraPosition;
                        void 0 !== p && p.setValue(Qt, Wt.setFromMatrixPosition(t.matrixWorld)) }(i.isMeshPhongMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial || i.skinning) && c.setValue(Qt, "viewMatrix", t.matrixWorldInverse), c.set(Qt, ct, "toneMappingExposure"), c.set(Qt, ct, "toneMappingWhitePoint") }
                if (i.skinning) { c.setOptional(Qt, n, "bindMatrix"), c.setOptional(Qt, n, "bindMatrixInverse");
                    var d = n.skeleton;
                    d && (se.floatVertexTextures && d.useVertexTexture ? (c.set(Qt, d, "boneTexture"), c.set(Qt, d, "boneTextureWidth"), c.set(Qt, d, "boneTextureHeight")) : c.setOptional(Qt, d, "boneMatrices")) }
                return s && (i.lights && U(u, h), e && i.fog && R(u, e), (i.isMeshBasicMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshNormalMaterial || i.isMeshDepthMaterial) && T(u, i), i.isLineBasicMaterial ? E(u, i) : i.isLineDashedMaterial ? (E(u, i), S(u, i)) : i.isPointsMaterial ? A(u, i) : i.isMeshLambertMaterial ? L(u, i) : i.isMeshToonMaterial ? C(u, i) : i.isMeshPhongMaterial ? P(u, i) : i.isMeshPhysicalMaterial ? O(u, i) : i.isMeshStandardMaterial ? I(u, i) : i.isMeshDepthMaterial ? i.displacementMap && (u.displacementMap.value = i.displacementMap, u.displacementScale.value = i.displacementScale, u.displacementBias.value = i.displacementBias) : i.isMeshNormalMaterial && D(u, i), void 0 !== u.ltcMat && (u.ltcMat.value = THREE.UniformsLib.LTC_MAT_TEXTURE), void 0 !== u.ltcMag && (u.ltcMag.value = THREE.UniformsLib.LTC_MAG_TEXTURE), V.upload(Qt, r.uniformsList, u, ct)), c.set(Qt, n, "modelViewMatrix"), c.set(Qt, n, "normalMatrix"), c.setValue(Qt, "modelMatrix", n.matrixWorld), l }

            function T(t, e) { t.opacity.value = e.opacity, t.diffuse.value = e.color, e.emissive && t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity), t.map.value = e.map, t.specularMap.value = e.specularMap, t.alphaMap.value = e.alphaMap, e.lightMap && (t.lightMap.value = e.lightMap, t.lightMapIntensity.value = e.lightMapIntensity), e.aoMap && (t.aoMap.value = e.aoMap, t.aoMapIntensity.value = e.aoMapIntensity);
                var i;
                if (e.map ? i = e.map : e.specularMap ? i = e.specularMap : e.displacementMap ? i = e.displacementMap : e.normalMap ? i = e.normalMap : e.bumpMap ? i = e.bumpMap : e.roughnessMap ? i = e.roughnessMap : e.metalnessMap ? i = e.metalnessMap : e.alphaMap ? i = e.alphaMap : e.emissiveMap && (i = e.emissiveMap), void 0 !== i) { i.isWebGLRenderTarget && (i = i.texture);
                    var n = i.offset,
                        r = i.repeat;
                    t.offsetRepeat.value.set(n.x, n.y, r.x, r.y) }
                t.envMap.value = e.envMap, t.flipEnvMap.value = e.envMap && e.envMap.isCubeTexture ? -1 : 1, t.reflectivity.value = e.reflectivity, t.refractionRatio.value = e.refractionRatio }

            function E(t, e) { t.diffuse.value = e.color, t.opacity.value = e.opacity }

            function S(t, e) { t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale }

            function A(t, e) {
                if (t.diffuse.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size * Pt, t.scale.value = .5 * Et, t.map.value = e.map, null !== e.map) {
                    var i = e.map.offset,
                        n = e.map.repeat;
                    t.offsetRepeat.value.set(i.x, i.y, n.x, n.y) } }

            function R(t, e) { t.fogColor.value = e.color, e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density) }

            function L(t, e) { e.emissiveMap && (t.emissiveMap.value = e.emissiveMap) }

            function P(t, e) { t.specular.value = e.specular, t.shininess.value = Math.max(e.shininess, 1e-4), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias) }

            function C(t, e) { P(t, e), e.gradientMap && (t.gradientMap.value = e.gradientMap) }

            function I(t, e) { t.roughness.value = e.roughness, t.metalness.value = e.metalness, e.roughnessMap && (t.roughnessMap.value = e.roughnessMap), e.metalnessMap && (t.metalnessMap.value = e.metalnessMap), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias), e.envMap && (t.envMapIntensity.value = e.envMapIntensity) }

            function O(t, e) { t.clearCoat.value = e.clearCoat, t.clearCoatRoughness.value = e.clearCoatRoughness, I(t, e) }

            function D(t, e) { e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias) }

            function U(t, e) { t.ambientLightColor.needsUpdate = e, t.directionalLights.needsUpdate = e, t.pointLights.needsUpdate = e, t.spotLights.needsUpdate = e, t.rectAreaLights.needsUpdate = e, t.hemisphereLights.needsUpdate = e }

            function N(t) {
                for (var e = 0, i = 0, n = t.length; i < n; i++) {
                    var r = t[i];
                    r.castShadow && (qt.shadows[e++] = r) }
                qt.shadows.length = e }

            function F(t, e) {
                var i, n, r, a, o, s, h, c = 0,
                    u = 0,
                    p = 0,
                    d = e.matrixWorldInverse,
                    f = 0,
                    m = 0,
                    g = 0,
                    v = 0,
                    y = 0;
                for (i = 0, n = t.length; i < n; i++)
                    if (r = t[i], a = r.color, o = r.intensity, s = r.distance, h = r.shadow && r.shadow.map ? r.shadow.map.texture : null, r.isAmbientLight) c += a.r * o, u += a.g * o, p += a.b * o;
                    else if (r.isDirectionalLight) {
                    var _ = de.get(r);
                    _.color.copy(r.color).multiplyScalar(r.intensity), _.direction.setFromMatrixPosition(r.matrixWorld), Wt.setFromMatrixPosition(r.target.matrixWorld), _.direction.sub(Wt), _.direction.transformDirection(d), _.shadow = r.castShadow, r.castShadow && (_.shadowBias = r.shadow.bias, _.shadowRadius = r.shadow.radius, _.shadowMapSize = r.shadow.mapSize), qt.directionalShadowMap[f] = h, qt.directionalShadowMatrix[f] = r.shadow.matrix, qt.directional[f++] = _ } else if (r.isSpotLight) {
                    var _ = de.get(r);
                    _.position.setFromMatrixPosition(r.matrixWorld), _.position.applyMatrix4(d), _.color.copy(a).multiplyScalar(o), _.distance = s, _.direction.setFromMatrixPosition(r.matrixWorld), Wt.setFromMatrixPosition(r.target.matrixWorld), _.direction.sub(Wt), _.direction.transformDirection(d), _.coneCos = Math.cos(r.angle), _.penumbraCos = Math.cos(r.angle * (1 - r.penumbra)), _.decay = 0 === r.distance ? 0 : r.decay, _.shadow = r.castShadow, r.castShadow && (_.shadowBias = r.shadow.bias, _.shadowRadius = r.shadow.radius, _.shadowMapSize = r.shadow.mapSize), qt.spotShadowMap[g] = h, qt.spotShadowMatrix[g] = r.shadow.matrix, qt.spot[g++] = _ } else if (r.isRectAreaLight) {
                    var _ = de.get(r);
                    _.color.copy(a).multiplyScalar(o / (r.width * r.height)), _.position.setFromMatrixPosition(r.matrixWorld), _.position.applyMatrix4(d), Yt.identity(), Xt.copy(r.matrixWorld), Xt.premultiply(d), Yt.extractRotation(Xt), _.halfWidth.set(.5 * r.width, 0, 0), _.halfHeight.set(0, .5 * r.height, 0), _.halfWidth.applyMatrix4(Yt), _.halfHeight.applyMatrix4(Yt), qt.rectArea[v++] = _ } else if (r.isPointLight) {
                    var _ = de.get(r);
                    _.position.setFromMatrixPosition(r.matrixWorld), _.position.applyMatrix4(d), _.color.copy(r.color).multiplyScalar(r.intensity), _.distance = r.distance, _.decay = 0 === r.distance ? 0 : r.decay, _.shadow = r.castShadow, r.castShadow && (_.shadowBias = r.shadow.bias, _.shadowRadius = r.shadow.radius, _.shadowMapSize = r.shadow.mapSize), qt.pointShadowMap[m] = h, void 0 === qt.pointShadowMatrix[m] && (qt.pointShadowMatrix[m] = new l), Wt.setFromMatrixPosition(r.matrixWorld).negate(), qt.pointShadowMatrix[m].identity().setPosition(Wt), qt.point[m++] = _ } else if (r.isHemisphereLight) {
                    var _ = de.get(r);
                    _.direction.setFromMatrixPosition(r.matrixWorld), _.direction.transformDirection(d), _.direction.normalize(), _.skyColor.copy(r.color).multiplyScalar(o), _.groundColor.copy(r.groundColor).multiplyScalar(o), qt.hemi[y++] = _ }
                qt.ambient[0] = c, qt.ambient[1] = u, qt.ambient[2] = p, qt.directional.length = f, qt.spot.length = g, qt.rectArea.length = v, qt.point.length = m, qt.hemi.length = y, qt.hash = f + "," + m + "," + g + "," + v + "," + y + "," + qt.shadows.length }

            function z() {
                var t = bt;
                return t >= se.maxTextures && console.warn("WebGLRenderer: trying to use " + t + " texture units while this GPU supports only " + se.maxTextures), bt += 1, t }

            function B(t) {
                var e;
                if (t === Ha) return Qt.REPEAT;
                if (t === ja) return Qt.CLAMP_TO_EDGE;
                if (t === Va) return Qt.MIRRORED_REPEAT;
                if (t === Xa) return Qt.NEAREST;
                if (t === Ya) return Qt.NEAREST_MIPMAP_NEAREST;
                if (t === qa) return Qt.NEAREST_MIPMAP_LINEAR;
                if (t === Za) return Qt.LINEAR;
                if (t === Ja) return Qt.LINEAR_MIPMAP_NEAREST;
                if (t === Qa) return Qt.LINEAR_MIPMAP_LINEAR;
                if (t === $a) return Qt.UNSIGNED_BYTE;
                if (t === so) return Qt.UNSIGNED_SHORT_4_4_4_4;
                if (t === ho) return Qt.UNSIGNED_SHORT_5_5_5_1;
                if (t === lo) return Qt.UNSIGNED_SHORT_5_6_5;
                if (t === to) return Qt.BYTE;
                if (t === eo) return Qt.SHORT;
                if (t === io) return Qt.UNSIGNED_SHORT;
                if (t === no) return Qt.INT;
                if (t === ro) return Qt.UNSIGNED_INT;
                if (t === ao) return Qt.FLOAT;
                if (t === oo && (e = oe.get("OES_texture_half_float"), null !== e)) return e.HALF_FLOAT_OES;
                if (t === uo) return Qt.ALPHA;
                if (t === po) return Qt.RGB;
                if (t === fo) return Qt.RGBA;
                if (t === mo) return Qt.LUMINANCE;
                if (t === go) return Qt.LUMINANCE_ALPHA;
                if (t === yo) return Qt.DEPTH_COMPONENT;
                if (t === _o) return Qt.DEPTH_STENCIL;
                if (t === ea) return Qt.FUNC_ADD;
                if (t === ia) return Qt.FUNC_SUBTRACT;
                if (t === na) return Qt.FUNC_REVERSE_SUBTRACT;
                if (t === oa) return Qt.ZERO;
                if (t === sa) return Qt.ONE;
                if (t === ha) return Qt.SRC_COLOR;
                if (t === la) return Qt.ONE_MINUS_SRC_COLOR;
                if (t === ca) return Qt.SRC_ALPHA;
                if (t === ua) return Qt.ONE_MINUS_SRC_ALPHA;
                if (t === pa) return Qt.DST_ALPHA;
                if (t === da) return Qt.ONE_MINUS_DST_ALPHA;
                if (t === fa) return Qt.DST_COLOR;
                if (t === ma) return Qt.ONE_MINUS_DST_COLOR;
                if (t === ga) return Qt.SRC_ALPHA_SATURATE;
                if ((t === xo || t === bo || t === wo || t === Mo) && (e = oe.get("WEBGL_compressed_texture_s3tc"), null !== e)) {
                    if (t === xo) return e.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (t === bo) return e.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (t === wo) return e.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (t === Mo) return e.COMPRESSED_RGBA_S3TC_DXT5_EXT }
                if ((t === To || t === Eo || t === So || t === Ao) && (e = oe.get("WEBGL_compressed_texture_pvrtc"), null !== e)) {
                    if (t === To) return e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (t === Eo) return e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (t === So) return e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (t === Ao) return e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG }
                if (t === Ro && (e = oe.get("WEBGL_compressed_texture_etc1"), null !== e)) return e.COMPRESSED_RGB_ETC1_WEBGL;
                if ((t === ra || t === aa) && (e = oe.get("EXT_blend_minmax"), null !== e)) {
                    if (t === ra) return e.MIN_EXT;
                    if (t === aa) return e.MAX_EXT }
                return t === co && (e = oe.get("WEBGL_depth_texture"), null !== e) ? e.UNSIGNED_INT_24_8_WEBGL : 0 }
            console.log("THREE.WebGLRenderer", Lr), t = t || {};
            var G = void 0 !== t.canvas ? t.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
                k = void 0 !== t.context ? t.context : null,
                H = void 0 !== t.alpha && t.alpha,
                j = void 0 === t.depth || t.depth,
                X = void 0 === t.stencil || t.stencil,
                Y = void 0 !== t.antialias && t.antialias,
                J = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
                K = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
                $ = [],
                et = [],
                it = -1,
                at = [],
                ot = -1,
                st = new Float32Array(8),
                ht = [],
                lt = [];
            this.domElement = G, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyCorrectLights = !1, this.toneMapping = La, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
            var ct = this,
                ut = null,
                dt = null,
                ft = null,
                mt = -1,
                gt = "",
                vt = null,
                yt = new r,
                _t = null,
                xt = new r,
                bt = 0,
                wt = new W(0),
                Mt = 0,
                Tt = G.width,
                Et = G.height,
                Pt = 1,
                Nt = new r(0, 0, Tt, Et),
                Ft = !1,
                zt = new r(0, 0, Tt, Et),
                Bt = new nt,
                Gt = new re,
                kt = !1,
                Ht = !1,
                jt = new tt,
                Vt = new l,
                Wt = new h,
                Xt = new l,
                Yt = new l,
                qt = { hash: "", ambient: [0, 0, 0], directional: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotShadowMap: [], spotShadowMatrix: [], rectArea: [], point: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], shadows: [] },
                Zt = { calls: 0, vertices: 0, faces: 0, points: 0 };
            this.info = { render: Zt, memory: { geometries: 0, textures: 0 }, programs: null };
            var Qt;
            try {
                var ae = { alpha: H, depth: j, stencil: X, antialias: Y, premultipliedAlpha: J, preserveDrawingBuffer: K };
                if (Qt = k || G.getContext("webgl", ae) || G.getContext("experimental-webgl", ae), null === Qt) throw null !== G.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
                void 0 === Qt.getShaderPrecisionFormat && (Qt.getShaderPrecisionFormat = function() {
                    return { rangeMin: 1, rangeMax: 1, precision: 1 } }), G.addEventListener("webglcontextlost", a, !1) } catch (t) { console.error("THREE.WebGLRenderer: " + t) }
            var oe = new ne(Qt);
            oe.get("WEBGL_depth_texture"), oe.get("OES_texture_float"), oe.get("OES_texture_float_linear"), oe.get("OES_texture_half_float"), oe.get("OES_texture_half_float_linear"), oe.get("OES_standard_derivatives"), oe.get("ANGLE_instanced_arrays"), oe.get("OES_element_index_uint") && (St.MaxIndex = 4294967296);
            var se = new ie(Qt, oe, t),
                he = new ee(Qt, oe, B),
                le = new te,
                ce = new $t(Qt, oe, he, le, se, B, this.info),
                ue = new Kt(Qt, le, this.info),
                pe = new Jt(this, se),
                de = new Ut;
            this.info.programs = pe.programs;
            var fe = new Dt(Qt, oe, Zt),
                me = new Ot(Qt, oe, Zt),
                ge = new It(-1, 1, 1, -1, 0, 1),
                ve = new Ct,
                ye = new At(new Lt(2, 2), new pt({ depthTest: !1, depthWrite: !1, fog: !1 })),
                _e = ol.cube,
                xe = new At(new Rt(5, 5, 5), new Q({ uniforms: _e.uniforms, vertexShader: _e.vertexShader, fragmentShader: _e.fragmentShader, side: kr, depthTest: !1, depthWrite: !1, fog: !1 }));
            i(), this.context = Qt, this.capabilities = se, this.extensions = oe, this.properties = le, this.state = he;
            var be = new rt(this, qt, ue, se);
            this.shadowMap = be;
            var we = new Z(this, ht),
                Me = new q(this, lt);
            this.getContext = function() {
                return Qt }, this.getContextAttributes = function() {
                return Qt.getContextAttributes() }, this.forceContextLoss = function() { oe.get("WEBGL_lose_context").loseContext() }, this.getMaxAnisotropy = function() {
                return se.getMaxAnisotropy() }, this.getPrecision = function() {
                return se.precision }, this.getPixelRatio = function() {
                return Pt }, this.setPixelRatio = function(t) { void 0 !== t && (Pt = t, this.setSize(zt.z, zt.w, !1)) }, this.getSize = function() {
                return { width: Tt, height: Et } }, this.setSize = function(t, e, i) { Tt = t, Et = e, G.width = t * Pt, G.height = e * Pt, i !== !1 && (G.style.width = t + "px", G.style.height = e + "px"), this.setViewport(0, 0, t, e) }, this.setViewport = function(t, e, i, n) { he.viewport(zt.set(t, e, i, n)) }, this.setScissor = function(t, e, i, n) { he.scissor(Nt.set(t, e, i, n)) }, this.setScissorTest = function(t) { he.setScissorTest(Ft = t) }, this.getClearColor = function() {
                return wt }, this.setClearColor = function(t, e) { wt.set(t), Mt = void 0 !== e ? e : 1, he.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, J) }, this.getClearAlpha = function() {
                return Mt }, this.setClearAlpha = function(t) { Mt = t, he.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, J) }, this.clear = function(t, e, i) {
                var n = 0;
                (void 0 === t || t) && (n |= Qt.COLOR_BUFFER_BIT), (void 0 === e || e) && (n |= Qt.DEPTH_BUFFER_BIT), (void 0 === i || i) && (n |= Qt.STENCIL_BUFFER_BIT), Qt.clear(n) }, this.clearColor = function() { this.clear(!0, !1, !1) }, this.clearDepth = function() {
                this.clear(!1, !0, !1)
            }, this.clearStencil = function() { this.clear(!1, !1, !0) }, this.clearTarget = function(t, e, i, n) { this.setRenderTarget(t), this.clear(e, i, n) }, this.resetGLState = n, this.dispose = function() { at = [], ot = -1, et = [], it = -1, G.removeEventListener("webglcontextlost", a, !1) }, this.renderBufferImmediate = function(t, e, i) { he.initAttributes();
                var n = le.get(t);
                t.hasPositions && !n.position && (n.position = Qt.createBuffer()), t.hasNormals && !n.normal && (n.normal = Qt.createBuffer()), t.hasUvs && !n.uv && (n.uv = Qt.createBuffer()), t.hasColors && !n.color && (n.color = Qt.createBuffer());
                var r = e.getAttributes();
                if (t.hasPositions && (Qt.bindBuffer(Qt.ARRAY_BUFFER, n.position), Qt.bufferData(Qt.ARRAY_BUFFER, t.positionArray, Qt.DYNAMIC_DRAW), he.enableAttribute(r.position), Qt.vertexAttribPointer(r.position, 3, Qt.FLOAT, !1, 0, 0)), t.hasNormals) {
                    if (Qt.bindBuffer(Qt.ARRAY_BUFFER, n.normal), !i.isMeshPhongMaterial && !i.isMeshStandardMaterial && !i.isMeshNormalMaterial && i.shading === jr)
                        for (var a = 0, o = 3 * t.count; a < o; a += 9) {
                            var s = t.normalArray,
                                h = (s[a + 0] + s[a + 3] + s[a + 6]) / 3,
                                l = (s[a + 1] + s[a + 4] + s[a + 7]) / 3,
                                c = (s[a + 2] + s[a + 5] + s[a + 8]) / 3;
                            s[a + 0] = h, s[a + 1] = l, s[a + 2] = c, s[a + 3] = h, s[a + 4] = l, s[a + 5] = c, s[a + 6] = h, s[a + 7] = l, s[a + 8] = c }
                    Qt.bufferData(Qt.ARRAY_BUFFER, t.normalArray, Qt.DYNAMIC_DRAW), he.enableAttribute(r.normal), Qt.vertexAttribPointer(r.normal, 3, Qt.FLOAT, !1, 0, 0) }
                t.hasUvs && i.map && (Qt.bindBuffer(Qt.ARRAY_BUFFER, n.uv), Qt.bufferData(Qt.ARRAY_BUFFER, t.uvArray, Qt.DYNAMIC_DRAW), he.enableAttribute(r.uv), Qt.vertexAttribPointer(r.uv, 2, Qt.FLOAT, !1, 0, 0)), t.hasColors && i.vertexColors !== Wr && (Qt.bindBuffer(Qt.ARRAY_BUFFER, n.color), Qt.bufferData(Qt.ARRAY_BUFFER, t.colorArray, Qt.DYNAMIC_DRAW), he.enableAttribute(r.color), Qt.vertexAttribPointer(r.color, 3, Qt.FLOAT, !1, 0, 0)), he.disableUnusedAttributes(), Qt.drawArrays(Qt.TRIANGLES, 0, t.count), t.count = 0 }, this.renderBufferDirect = function(t, i, n, r, a, o) { w(r);
                var s = M(t, i, r, a),
                    h = !1,
                    l = n.id + "_" + s.id + "_" + r.wireframe;
                l !== gt && (gt = l, h = !0);
                var c = a.morphTargetInfluences;
                if (void 0 !== c) {
                    for (var d = [], f = 0, m = c.length; f < m; f++) {
                        var g = c[f];
                        d.push([g, f]) }
                    d.sort(p), d.length > 8 && (d.length = 8);
                    for (var v = n.morphAttributes, f = 0, m = d.length; f < m; f++) {
                        var g = d[f];
                        if (st[f] = g[0], 0 !== g[0]) {
                            var y = g[1];
                            r.morphTargets === !0 && v.position && n.addAttribute("morphTarget" + f, v.position[y]), r.morphNormals === !0 && v.normal && n.addAttribute("morphNormal" + f, v.normal[y]) } else r.morphTargets === !0 && n.removeAttribute("morphTarget" + f), r.morphNormals === !0 && n.removeAttribute("morphNormal" + f) }
                    for (var f = d.length, _ = st.length; f < _; f++) st[f] = 0;
                    s.getUniforms().setValue(Qt, "morphTargetInfluences", st), h = !0 }
                var y = n.index,
                    x = n.attributes.position,
                    b = 1;
                r.wireframe === !0 && (y = ue.getWireframeAttribute(n), b = 2);
                var T;
                null !== y ? (T = me, T.setIndex(y)) : T = fe, h && (u(r, s, n), null !== y && Qt.bindBuffer(Qt.ELEMENT_ARRAY_BUFFER, ue.getAttributeBuffer(y)));
                var E = 0;
                null !== y ? E = y.count : void 0 !== x && (E = x.count);
                var S = n.drawRange.start * b,
                    A = n.drawRange.count * b,
                    R = null !== o ? o.start * b : 0,
                    L = null !== o ? o.count * b : 1 / 0,
                    P = Math.max(S, R),
                    C = Math.min(E, S + A, R + L) - 1,
                    I = Math.max(0, C - P + 1);
                if (0 !== I) {
                    if (a.isMesh)
                        if (r.wireframe === !0) he.setLineWidth(r.wireframeLinewidth * e()), T.setMode(Qt.LINES);
                        else switch (a.drawMode) {
                            case zo:
                                T.setMode(Qt.TRIANGLES);
                                break;
                            case Bo:
                                T.setMode(Qt.TRIANGLE_STRIP);
                                break;
                            case Go:
                                T.setMode(Qt.TRIANGLE_FAN) } else if (a.isLine) {
                            var O = r.linewidth;
                            void 0 === O && (O = 1), he.setLineWidth(O * e()), a.isLineSegments ? T.setMode(Qt.LINES) : T.setMode(Qt.LINE_STRIP) } else a.isPoints && T.setMode(Qt.POINTS);
                    n && n.isInstancedBufferGeometry ? n.maxInstancedCount > 0 && T.renderInstances(n, P, I) : T.render(P, I) } }, this.render = function(t, e, i, n) {
                if (void 0 !== e && e.isCamera !== !0) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                gt = "", mt = -1, vt = null, t.autoUpdate === !0 && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), e.matrixWorldInverse.getInverse(e.matrixWorld), Vt.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), Bt.setFromMatrix(Vt), $.length = 0, it = -1, ot = -1, ht.length = 0, lt.length = 0, Ht = this.localClippingEnabled, kt = Gt.init(this.clippingPlanes, Ht, e), _(t, e), et.length = it + 1, at.length = ot + 1, ct.sortObjects === !0 && (et.sort(d), at.sort(f)), kt && Gt.beginShadows(), N($), be.render(t, e), F($, e), kt && Gt.endShadows(), Zt.calls = 0, Zt.vertices = 0, Zt.faces = 0, Zt.points = 0, void 0 === i && (i = null), this.setRenderTarget(i);
                var r = t.background;
                if (null === r ? he.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, J) : r && r.isColor && (he.buffers.color.setClear(r.r, r.g, r.b, 1, J), n = !0), (this.autoClear || n) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), r && r.isCubeTexture ? (ve.projectionMatrix.copy(e.projectionMatrix), ve.matrixWorld.extractRotation(e.matrixWorld), ve.matrixWorldInverse.getInverse(ve.matrixWorld), xe.material.uniforms.tCube.value = r, xe.modelViewMatrix.multiplyMatrices(ve.matrixWorldInverse, xe.matrixWorld), ue.update(xe), ct.renderBufferDirect(ve, null, xe.geometry, xe.material, xe, null)) : r && r.isTexture && (ye.material.map = r, ue.update(ye), ct.renderBufferDirect(ge, null, ye.geometry, ye.material, ye, null)), t.overrideMaterial) {
                    var a = t.overrideMaterial;
                    x(et, t, e, a), x(at, t, e, a) } else he.setBlending(qr), x(et, t, e), x(at, t, e);
                we.render(t, e), Me.render(t, e, xt), i && ce.updateRenderTargetMipmap(i), he.setDepthTest(!0), he.setDepthWrite(!0), he.setColorWrite(!0) }, this.setFaceCulling = function(t, e) { he.setCullFace(t), he.setFlipSided(e === Ur) }, this.allocTextureUnit = z, this.setTexture2D = function() {
                var t = !1;
                return function(e, i) { e && e.isWebGLRenderTarget && (t || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), ce.setTexture2D(e, i) } }(), this.setTexture = function() {
                var t = !1;
                return function(e, i) { t || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), t = !0), ce.setTexture2D(e, i) } }(), this.setTextureCube = function() {
                var t = !1;
                return function(e, i) { e && e.isWebGLRenderTargetCube && (t || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? ce.setTextureCube(e, i) : ce.setTextureCubeDynamic(e, i) } }(), this.getCurrentRenderTarget = function() {
                return dt }, this.setRenderTarget = function(t) { dt = t, t && void 0 === le.get(t).__webglFramebuffer && ce.setupRenderTarget(t);
                var e, i = t && t.isWebGLRenderTargetCube;
                if (t) {
                    var n = le.get(t);
                    e = i ? n.__webglFramebuffer[t.activeCubeFace] : n.__webglFramebuffer, yt.copy(t.scissor), _t = t.scissorTest, xt.copy(t.viewport) } else e = null, yt.copy(Nt).multiplyScalar(Pt), _t = Ft, xt.copy(zt).multiplyScalar(Pt);
                if (ft !== e && (Qt.bindFramebuffer(Qt.FRAMEBUFFER, e), ft = e), he.scissor(yt), he.setScissorTest(_t), he.viewport(xt), i) {
                    var r = le.get(t.texture);
                    Qt.framebufferTexture2D(Qt.FRAMEBUFFER, Qt.COLOR_ATTACHMENT0, Qt.TEXTURE_CUBE_MAP_POSITIVE_X + t.activeCubeFace, r.__webglTexture, t.activeMipMapLevel) } }, this.readRenderTargetPixels = function(t, e, i, n, r, a) {
                if ((t && t.isWebGLRenderTarget) === !1) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                var o = le.get(t).__webglFramebuffer;
                if (o) {
                    var s = !1;
                    o !== ft && (Qt.bindFramebuffer(Qt.FRAMEBUFFER, o), s = !0);
                    try {
                        var h = t.texture,
                            l = h.format,
                            c = h.type;
                        if (l !== fo && B(l) !== Qt.getParameter(Qt.IMPLEMENTATION_COLOR_READ_FORMAT)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                        if (!(c === $a || B(c) === Qt.getParameter(Qt.IMPLEMENTATION_COLOR_READ_TYPE) || c === ao && (oe.get("OES_texture_float") || oe.get("WEBGL_color_buffer_float")) || c === oo && oe.get("EXT_color_buffer_half_float"))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                        Qt.checkFramebufferStatus(Qt.FRAMEBUFFER) === Qt.FRAMEBUFFER_COMPLETE ? e >= 0 && e <= t.width - n && i >= 0 && i <= t.height - r && Qt.readPixels(e, i, n, r, B(l), B(c), a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.") } finally { s && Qt.bindFramebuffer(Qt.FRAMEBUFFER, ft) } } }
        }

        function oe(t, e) { this.name = "", this.color = new W(t), this.density = void 0 !== e ? e : 25e-5 }

        function se(t, e, i) { this.name = "", this.color = new W(t), this.near = void 0 !== e ? e : 1, this.far = void 0 !== i ? i : 1e3 }

        function he() { ht.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0 }

        function le(t, e, i, n, r) { ht.call(this), this.lensFlares = [], this.positionScreen = new h, this.customUpdateCallback = void 0, void 0 !== t && this.add(t, e, i, n, r) }

        function ce(t) { J.call(this), this.type = "SpriteMaterial", this.color = new W(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.lights = !1, this.setValues(t) }

        function ue(t) { ht.call(this), this.type = "Sprite", this.material = void 0 !== t ? t : new ce }

        function pe() { ht.call(this), this.type = "LOD", Object.defineProperties(this, { levels: { enumerable: !0, value: [] } }) }

        function de(t, e, i) {
            if (this.useVertexTexture = void 0 === i || i, this.identityMatrix = new l, t = t || [], this.bones = t.slice(0), this.useVertexTexture) {
                var n = Math.sqrt(4 * this.bones.length);
                n = Qo.nextPowerOfTwo(Math.ceil(n)), n = Math.max(n, 4), this.boneTextureWidth = n, this.boneTextureHeight = n, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new X(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, fo, ao) } else this.boneMatrices = new Float32Array(16 * this.bones.length);
            if (void 0 === e) this.calculateInverses();
            else if (this.bones.length === e.length) this.boneInverses = e.slice(0);
            else { console.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
                for (var r = 0, a = this.bones.length; r < a; r++) this.boneInverses.push(new l) } }

        function fe() { ht.call(this), this.type = "Bone" }

        function me(t, e, i) { At.call(this, t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new l, this.bindMatrixInverse = new l;
            var n = [];
            if (this.geometry && void 0 !== this.geometry.bones) {
                for (var r, a, o = 0, s = this.geometry.bones.length; o < s; ++o) a = this.geometry.bones[o], r = new fe, n.push(r), r.name = a.name, r.position.fromArray(a.pos), r.quaternion.fromArray(a.rotq), void 0 !== a.scl && r.scale.fromArray(a.scl);
                for (var o = 0, s = this.geometry.bones.length; o < s; ++o) a = this.geometry.bones[o], a.parent !== -1 && null !== a.parent && void 0 !== n[a.parent] ? n[a.parent].add(n[o]) : this.add(n[o]) }
            this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new de(n, void 0, i), this.matrixWorld) }

        function ge(t) { J.call(this), this.type = "LineBasicMaterial", this.color = new W(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.lights = !1, this.setValues(t) }

        function ve(t, e, i) {
            return 1 === i ? (console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), new ye(t, e)) : (ht.call(this), this.type = "Line", this.geometry = void 0 !== t ? t : new St, void(this.material = void 0 !== e ? e : new ge({ color: 16777215 * Math.random() }))) }

        function ye(t, e) { ve.call(this, t, e), this.type = "LineSegments" }

        function _e(t) { J.call(this), this.type = "PointsMaterial", this.color = new W(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.lights = !1, this.setValues(t) }

        function xe(t, e) { ht.call(this), this.type = "Points", this.geometry = void 0 !== t ? t : new St, this.material = void 0 !== e ? e : new _e({ color: 16777215 * Math.random() }) }

        function be() { ht.call(this), this.type = "Group" }

        function we(t, e, i, r, a, o, s, h, l) {
            function c() { requestAnimationFrame(c), t.readyState >= t.HAVE_CURRENT_DATA && (u.needsUpdate = !0) }
            n.call(this, t, e, i, r, a, o, s, h, l), this.generateMipmaps = !1;
            var u = this;
            c() }

        function Me(t, e, i, r, a, o, s, h, l, c, u, p) { n.call(this, null, o, s, h, l, c, r, a, u, p), this.image = { width: e, height: i }, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1 }

        function Te(t, e, i, r, a, o, s, h, l) { n.call(this, t, e, i, r, a, o, s, h, l), this.needsUpdate = !0 }

        function Ee(t, e, i, r, a, o, s, h, l, c) {
            if (c = void 0 !== c ? c : yo, c !== yo && c !== _o) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
            void 0 === i && c === yo && (i = io), void 0 === i && c === _o && (i = co), n.call(this, null, r, a, o, s, h, c, i, l), this.image = { width: t, height: e }, this.magFilter = void 0 !== s ? s : Xa, this.minFilter = void 0 !== h ? h : Xa, this.flipY = !1, this.generateMipmaps = !1 }

        function Se(t) {
            function e(t, e) {
                return t - e }
            St.call(this);
            var i = [0, 0],
                n = {},
                r = ["a", "b", "c"];
            if (t && t.isGeometry) {
                for (var a = t.vertices, o = t.faces, s = 0, h = new Uint32Array(6 * o.length), l = 0, c = o.length; l < c; l++)
                    for (var u = o[l], p = 0; p < 3; p++) { i[0] = u[r[p]], i[1] = u[r[(p + 1) % 3]], i.sort(e);
                        var d = i.toString();
                        void 0 === n[d] && (h[2 * s] = i[0], h[2 * s + 1] = i[1], n[d] = !0, s++) }
                for (var f = new Float32Array(2 * s * 3), l = 0, c = s; l < c; l++)
                    for (var p = 0; p < 2; p++) {
                        var m = a[h[2 * l + p]],
                            g = 6 * l + 3 * p;
                        f[g + 0] = m.x, f[g + 1] = m.y, f[g + 2] = m.z }
                this.addAttribute("position", new dt(f, 3)) } else if (t && t.isBufferGeometry)
                if (null !== t.index) {
                    var v = t.index.array,
                        a = t.attributes.position,
                        y = t.groups,
                        s = 0;
                    0 === y.length && t.addGroup(0, v.length);
                    for (var h = new Uint32Array(2 * v.length), _ = 0, x = y.length; _ < x; ++_)
                        for (var b = y[_], w = b.start, M = b.count, l = w, T = w + M; l < T; l += 3)
                            for (var p = 0; p < 3; p++) { i[0] = v[l + p], i[1] = v[l + (p + 1) % 3], i.sort(e);
                                var d = i.toString();
                                void 0 === n[d] && (h[2 * s] = i[0], h[2 * s + 1] = i[1], n[d] = !0, s++) }
                    for (var f = new Float32Array(2 * s * 3), l = 0, c = s; l < c; l++)
                        for (var p = 0; p < 2; p++) {
                            var g = 6 * l + 3 * p,
                                E = h[2 * l + p];
                            f[g + 0] = a.getX(E), f[g + 1] = a.getY(E), f[g + 2] = a.getZ(E) }
                    this.addAttribute("position", new dt(f, 3)) } else {
                    for (var a = t.attributes.position.array, s = a.length / 3, S = s / 3, f = new Float32Array(2 * s * 3), l = 0, c = S; l < c; l++)
                        for (var p = 0; p < 3; p++) {
                            var g = 18 * l + 6 * p,
                                A = 9 * l + 3 * p;
                            f[g + 0] = a[A], f[g + 1] = a[A + 1], f[g + 2] = a[A + 2];
                            var E = 9 * l + 3 * ((p + 1) % 3);
                            f[g + 3] = a[E], f[g + 4] = a[E + 1], f[g + 5] = a[E + 2] }
                    this.addAttribute("position", new dt(f, 3)) } }

        function Ae(t, e, i) { St.call(this), this.type = "ParametricBufferGeometry", this.parameters = { func: t, slices: e, stacks: i };
            var n, r, a, o, s, h = [],
                l = [],
                c = e + 1;
            for (n = 0; n <= i; n++)
                for (s = n / i, r = 0; r <= e; r++) o = r / e, a = t(o, s), h.push(a.x, a.y, a.z), l.push(o, s);
            var u, p, d, f, m = [];
            for (n = 0; n < i; n++)
                for (r = 0; r < e; r++) u = n * c + r, p = n * c + r + 1, d = (n + 1) * c + r + 1, f = (n + 1) * c + r, m.push(u, p, f), m.push(p, d, f);
            this.setIndex(new(m.length > 65535 ? xt : yt)(m, 1)), this.addAttribute("position", new bt(h, 3)), this.addAttribute("uv", new bt(l, 2)), this.computeVertexNormals() }

        function Re(t, e, i) { Tt.call(this), this.type = "ParametricGeometry", this.parameters = { func: t, slices: e, stacks: i }, this.fromBufferGeometry(new Ae(t, e, i)), this.mergeVertices() }

        function Le(t, e, n, r) {
            function a(t) {
                for (var i = new h, n = new h, r = new h, a = 0; a < e.length; a += 3) p(e[a + 0], i), p(e[a + 1], n), p(e[a + 2], r), o(i, n, r, t) }

            function o(t, e, i, n) {
                var r, a, o = Math.pow(2, n),
                    s = [];
                for (r = 0; r <= o; r++) { s[r] = [];
                    var h = t.clone().lerp(i, r / o),
                        l = e.clone().lerp(i, r / o),
                        c = o - r;
                    for (a = 0; a <= c; a++) 0 === a && r === o ? s[r][a] = h : s[r][a] = h.clone().lerp(l, a / c) }
                for (r = 0; r < o; r++)
                    for (a = 0; a < 2 * (o - r) - 1; a++) {
                        var p = Math.floor(a / 2);
                        a % 2 === 0 ? (u(s[r][p + 1]), u(s[r + 1][p]), u(s[r][p])) : (u(s[r][p + 1]), u(s[r + 1][p + 1]), u(s[r + 1][p])) } }

            function s(t) {
                for (var e = new h, i = 0; i < v.length; i += 3) e.x = v[i + 0], e.y = v[i + 1], e.z = v[i + 2], e.normalize().multiplyScalar(t), v[i + 0] = e.x, v[i + 1] = e.y, v[i + 2] = e.z }

            function l() {
                for (var t = new h, e = 0; e < v.length; e += 3) { t.x = v[e + 0], t.y = v[e + 1], t.z = v[e + 2];
                    var i = m(t) / 2 / Math.PI + .5,
                        n = g(t) / Math.PI + .5;
                    y.push(i, 1 - n) }
                d(), c() }

            function c() {
                for (var t = 0; t < y.length; t += 6) {
                    var e = y[t + 0],
                        i = y[t + 2],
                        n = y[t + 4],
                        r = Math.max(e, i, n),
                        a = Math.min(e, i, n);
                    r > .9 && a < .1 && (e < .2 && (y[t + 0] += 1), i < .2 && (y[t + 2] += 1), n < .2 && (y[t + 4] += 1)) } }

            function u(t) { v.push(t.x, t.y, t.z) }

            function p(e, i) {
                var n = 3 * e;
                i.x = t[n + 0], i.y = t[n + 1], i.z = t[n + 2] }

            function d() {
                for (var t = new h, e = new h, n = new h, r = new h, a = new i, o = new i, s = new i, l = 0, c = 0; l < v.length; l += 9, c += 6) { t.set(v[l + 0], v[l + 1], v[l + 2]), e.set(v[l + 3], v[l + 4], v[l + 5]), n.set(v[l + 6], v[l + 7], v[l + 8]), a.set(y[c + 0], y[c + 1]), o.set(y[c + 2], y[c + 3]), s.set(y[c + 4], y[c + 5]), r.copy(t).add(e).add(n).divideScalar(3);
                    var u = m(r);
                    f(a, c + 0, t, u), f(o, c + 2, e, u), f(s, c + 4, n, u) } }

            function f(t, e, i, n) { n < 0 && 1 === t.x && (y[e] = t.x - 1), 0 === i.x && 0 === i.z && (y[e] = n / 2 / Math.PI + .5) }

            function m(t) {
                return Math.atan2(t.z, -t.x) }

            function g(t) {
                return Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z)) }
            St.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = { vertices: t, indices: e, radius: n, detail: r }, n = n || 1, r = r || 0;
            var v = [],
                y = [];
            a(r), s(n), l(), this.addAttribute("position", new bt(v, 3)), this.addAttribute("normal", new bt(v.slice(), 3)), this.addAttribute("uv", new bt(y, 2)), this.normalizeNormals(), this.boundingSphere = new tt(new h, n) }

        function Pe(t, e) {
            var i = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
                n = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
            Le.call(this, i, n, t, e), this.type = "TetrahedronBufferGeometry", this.parameters = { radius: t, detail: e } }

        function Ce(t, e) { Tt.call(this), this.type = "TetrahedronGeometry", this.parameters = { radius: t, detail: e }, this.fromBufferGeometry(new Pe(t, e)), this.mergeVertices() }

        function Ie(t, e) {
            var i = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
                n = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
            Le.call(this, i, n, t, e), this.type = "OctahedronBufferGeometry", this.parameters = { radius: t, detail: e } }

        function Oe(t, e) { Tt.call(this), this.type = "OctahedronGeometry", this.parameters = { radius: t, detail: e }, this.fromBufferGeometry(new Ie(t, e)), this.mergeVertices() }

        function De(t, e) {
            var i = (1 + Math.sqrt(5)) / 2,
                n = [-1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, 0, 0, -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, i, 0, -1, i, 0, 1, -i, 0, -1, -i, 0, 1],
                r = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
            Le.call(this, n, r, t, e), this.type = "IcosahedronBufferGeometry", this.parameters = { radius: t, detail: e } }

        function Ue(t, e) { Tt.call(this), this.type = "IcosahedronGeometry", this.parameters = { radius: t, detail: e }, this.fromBufferGeometry(new De(t, e)), this.mergeVertices() }

        function Ne(t, e) {
            var i = (1 + Math.sqrt(5)) / 2,
                n = 1 / i,
                r = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -n, -i, 0, -n, i, 0, n, -i, 0, n, i, -n, -i, 0, -n, i, 0, n, -i, 0, n, i, 0, -i, 0, -n, i, 0, -n, -i, 0, n, i, 0, n],
                a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
            Le.call(this, r, a, t, e), this.type = "DodecahedronBufferGeometry", this.parameters = { radius: t, detail: e } }

        function Fe(t, e) { Tt.call(this), this.type = "DodecahedronGeometry", this.parameters = { radius: t, detail: e }, this.fromBufferGeometry(new Ne(t, e)), this.mergeVertices() }

        function ze(t, e, i, n) { Tt.call(this), this.type = "PolyhedronGeometry", this.parameters = { vertices: t, indices: e, radius: i, detail: n }, this.fromBufferGeometry(new Le(t, e, i, n)), this.mergeVertices() }

        function Be(t, e, n, r, a) {
            function o() {
                for (p = 0; p < e; p++) s(p);
                s(a === !1 ? e : 0), c(), l() }

            function s(i) {
                var a = t.getPointAt(i / e),
                    o = u.normals[i],
                    s = u.binormals[i];
                for (d = 0; d <= r; d++) {
                    var h = d / r * Math.PI * 2,
                        l = Math.sin(h),
                        c = -Math.cos(h);
                    m.x = c * o.x + l * s.x, m.y = c * o.y + l * s.y, m.z = c * o.z + l * s.z, m.normalize(), y.push(m.x, m.y, m.z), f.x = a.x + n * m.x, f.y = a.y + n * m.y, f.z = a.z + n * m.z, v.push(f.x, f.y, f.z) } }

            function l() {
                for (d = 1; d <= e; d++)
                    for (p = 1; p <= r; p++) {
                        var t = (r + 1) * (d - 1) + (p - 1),
                            i = (r + 1) * d + (p - 1),
                            n = (r + 1) * d + p,
                            a = (r + 1) * (d - 1) + p;
                        x.push(t, i, a), x.push(i, n, a) } }

            function c() {
                for (p = 0; p <= e; p++)
                    for (d = 0; d <= r; d++) g.x = p / e, g.y = d / r, _.push(g.x, g.y) }
            St.call(this), this.type = "TubeBufferGeometry", this.parameters = { path: t, tubularSegments: e, radius: n, radialSegments: r, closed: a }, e = e || 64, n = n || 1, r = r || 8, a = a || !1;
            var u = t.computeFrenetFrames(e, a);
            this.tangents = u.tangents, this.normals = u.normals, this.binormals = u.binormals;
            var p, d, f = new h,
                m = new h,
                g = new i,
                v = [],
                y = [],
                _ = [],
                x = [];
            o(), this.setIndex(new(x.length > 65535 ? xt : yt)(x, 1)), this.addAttribute("position", new bt(v, 3)), this.addAttribute("normal", new bt(y, 3)), this.addAttribute("uv", new bt(_, 2)) }

        function Ge(t, e, i, n, r, a) { Tt.call(this), this.type = "TubeGeometry", this.parameters = { path: t, tubularSegments: e, radius: i, radialSegments: n, closed: r }, void 0 !== a && console.warn("THREE.TubeGeometry: taper has been removed.");
            var o = new Be(t, e, i, n, r);
            this.tangents = o.tangents, this.normals = o.normals, this.binormals = o.binormals, this.fromBufferGeometry(o), this.mergeVertices() }

        function ke(t, e, n, r, a, o) {
            function s(t, e, i, n, r) {
                var a = Math.cos(t),
                    o = Math.sin(t),
                    s = i / e * t,
                    h = Math.cos(s);
                r.x = n * (2 + h) * .5 * a, r.y = n * (2 + h) * o * .5, r.z = n * Math.sin(s) * .5 }
            St.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = { radius: t, tube: e, tubularSegments: n, radialSegments: r, p: a, q: o }, t = t || 100, e = e || 40, n = Math.floor(n) || 64, r = Math.floor(r) || 8, a = a || 2, o = o || 3;
            var l, c, u = (r + 1) * (n + 1),
                p = r * n * 2 * 3,
                d = new dt(new(p > 65535 ? Uint32Array : Uint16Array)(p), 1),
                f = new dt(new Float32Array(3 * u), 3),
                m = new dt(new Float32Array(3 * u), 3),
                g = new dt(new Float32Array(2 * u), 2),
                v = 0,
                y = 0,
                _ = new h,
                x = new h,
                b = new i,
                w = new h,
                M = new h,
                T = new h,
                E = new h,
                S = new h;
            for (l = 0; l <= n; ++l) {
                var A = l / n * a * Math.PI * 2;
                for (s(A, a, o, t, w), s(A + .01, a, o, t, M), E.subVectors(M, w), S.addVectors(M, w), T.crossVectors(E, S), S.crossVectors(T, E), T.normalize(), S.normalize(), c = 0; c <= r; ++c) {
                    var R = c / r * Math.PI * 2,
                        L = -e * Math.cos(R),
                        P = e * Math.sin(R);
                    _.x = w.x + (L * S.x + P * T.x), _.y = w.y + (L * S.y + P * T.y), _.z = w.z + (L * S.z + P * T.z), f.setXYZ(v, _.x, _.y, _.z), x.subVectors(_, w).normalize(), m.setXYZ(v, x.x, x.y, x.z), b.x = l / n, b.y = c / r, g.setXY(v, b.x, b.y), v++ } }
            for (c = 1; c <= n; c++)
                for (l = 1; l <= r; l++) {
                    var C = (r + 1) * (c - 1) + (l - 1),
                        I = (r + 1) * c + (l - 1),
                        O = (r + 1) * c + l,
                        D = (r + 1) * (c - 1) + l;
                    d.setX(y, C), y++, d.setX(y, I), y++, d.setX(y, D), y++, d.setX(y, I), y++, d.setX(y, O), y++, d.setX(y, D), y++ }
            this.setIndex(d), this.addAttribute("position", f), this.addAttribute("normal", m), this.addAttribute("uv", g) }

        function He(t, e, i, n, r, a, o) { Tt.call(this), this.type = "TorusKnotGeometry", this.parameters = { radius: t, tube: e, tubularSegments: i, radialSegments: n, p: r, q: a }, void 0 !== o && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), this.fromBufferGeometry(new ke(t, e, i, n, r, a)), this.mergeVertices() }

        function je(t, e, i, n, r) { St.call(this), this.type = "TorusBufferGeometry", this.parameters = { radius: t, tube: e, radialSegments: i, tubularSegments: n, arc: r }, t = t || 100, e = e || 40, i = Math.floor(i) || 8, n = Math.floor(n) || 6, r = r || 2 * Math.PI;
            var a, o, s = (i + 1) * (n + 1),
                l = i * n * 2 * 3,
                c = new(l > 65535 ? Uint32Array : Uint16Array)(l),
                u = new Float32Array(3 * s),
                p = new Float32Array(3 * s),
                d = new Float32Array(2 * s),
                f = 0,
                m = 0,
                g = 0,
                v = new h,
                y = new h,
                _ = new h;
            for (a = 0; a <= i; a++)
                for (o = 0; o <= n; o++) {
                    var x = o / n * r,
                        b = a / i * Math.PI * 2;
                    y.x = (t + e * Math.cos(b)) * Math.cos(x), y.y = (t + e * Math.cos(b)) * Math.sin(x), y.z = e * Math.sin(b), u[f] = y.x, u[f + 1] = y.y, u[f + 2] = y.z, v.x = t * Math.cos(x), v.y = t * Math.sin(x), _.subVectors(y, v).normalize(), p[f] = _.x, p[f + 1] = _.y, p[f + 2] = _.z, d[m] = o / n, d[m + 1] = a / i, f += 3, m += 2 }
            for (a = 1; a <= i; a++)
                for (o = 1; o <= n; o++) {
                    var w = (n + 1) * a + o - 1,
                        M = (n + 1) * (a - 1) + o - 1,
                        T = (n + 1) * (a - 1) + o,
                        E = (n + 1) * a + o;
                    c[g] = w, c[g + 1] = M, c[g + 2] = E, c[g + 3] = M, c[g + 4] = T, c[g + 5] = E, g += 6 }
            this.setIndex(new dt(c, 1)), this.addAttribute("position", new dt(u, 3)), this.addAttribute("normal", new dt(p, 3)), this.addAttribute("uv", new dt(d, 2)) }

        function Ve(t, e, i, n, r) { Tt.call(this), this.type = "TorusGeometry", this.parameters = { radius: t, tube: e, radialSegments: i, tubularSegments: n, arc: r }, this.fromBufferGeometry(new je(t, e, i, n, r)) }

        function We(t, e) {
            return "undefined" == typeof t ? void(t = []) : (Tt.call(this), this.type = "ExtrudeGeometry", t = Array.isArray(t) ? t : [t], this.addShapeList(t, e), void this.computeFaceNormals()) }

        function Xe(t, e) { e = e || {};
            var i = e.font;
            if ((i && i.isFont) === !1) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new Tt;
            var n = i.generateShapes(t, e.size, e.curveSegments);
            e.amount = void 0 !== e.height ? e.height : 50, void 0 === e.bevelThickness && (e.bevelThickness = 10), void 0 === e.bevelSize && (e.bevelSize = 8), void 0 === e.bevelEnabled && (e.bevelEnabled = !1), We.call(this, n, e), this.type = "TextGeometry" }

        function Ye(t, e, i, n, r, a, o) { St.call(this), this.type = "SphereBufferGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: i, phiStart: n, phiLength: r, thetaStart: a, thetaLength: o }, t = t || 50, e = Math.max(3, Math.floor(e) || 8), i = Math.max(2, Math.floor(i) || 6), n = void 0 !== n ? n : 0, r = void 0 !== r ? r : 2 * Math.PI, a = void 0 !== a ? a : 0, o = void 0 !== o ? o : Math.PI;
            for (var s = a + o, l = (e + 1) * (i + 1), c = new dt(new Float32Array(3 * l), 3), u = new dt(new Float32Array(3 * l), 3), p = new dt(new Float32Array(2 * l), 2), d = 0, f = [], m = new h, g = 0; g <= i; g++) {
                for (var v = [], y = g / i, _ = 0; _ <= e; _++) {
                    var x = _ / e,
                        b = -t * Math.cos(n + x * r) * Math.sin(a + y * o),
                        w = t * Math.cos(a + y * o),
                        M = t * Math.sin(n + x * r) * Math.sin(a + y * o);
                    m.set(b, w, M).normalize(), c.setXYZ(d, b, w, M), u.setXYZ(d, m.x, m.y, m.z), p.setXY(d, x, 1 - y), v.push(d), d++ }
                f.push(v) }
            for (var T = [], g = 0; g < i; g++)
                for (var _ = 0; _ < e; _++) {
                    var E = f[g][_ + 1],
                        S = f[g][_],
                        A = f[g + 1][_],
                        R = f[g + 1][_ + 1];
                    (0 !== g || a > 0) && T.push(E, S, R), (g !== i - 1 || s < Math.PI) && T.push(S, A, R) }
            this.setIndex(new(c.count > 65535 ? xt : yt)(T, 1)), this.addAttribute("position", c), this.addAttribute("normal", u), this.addAttribute("uv", p), this.boundingSphere = new tt(new h, t) }

        function qe(t, e, i, n, r, a, o) { Tt.call(this), this.type = "SphereGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: i, phiStart: n, phiLength: r, thetaStart: a, thetaLength: o }, this.fromBufferGeometry(new Ye(t, e, i, n, r, a, o)) }

        function Ze(t, e, n, r, a, o) { St.call(this), this.type = "RingBufferGeometry", this.parameters = { innerRadius: t, outerRadius: e, thetaSegments: n, phiSegments: r, thetaStart: a, thetaLength: o }, t = t || 20, e = e || 50, a = void 0 !== a ? a : 0, o = void 0 !== o ? o : 2 * Math.PI, n = void 0 !== n ? Math.max(3, n) : 8, r = void 0 !== r ? Math.max(1, r) : 1;
            var s, l, c, u = (n + 1) * (r + 1),
                p = n * r * 2 * 3,
                d = new dt(new(p > 65535 ? Uint32Array : Uint16Array)(p), 1),
                f = new dt(new Float32Array(3 * u), 3),
                m = new dt(new Float32Array(3 * u), 3),
                g = new dt(new Float32Array(2 * u), 2),
                v = 0,
                y = 0,
                _ = t,
                x = (e - t) / r,
                b = new h,
                w = new i;
            for (l = 0; l <= r; l++) {
                for (c = 0; c <= n; c++) s = a + c / n * o, b.x = _ * Math.cos(s), b.y = _ * Math.sin(s), f.setXYZ(v, b.x, b.y, b.z), m.setXYZ(v, 0, 0, 1), w.x = (b.x / e + 1) / 2, w.y = (b.y / e + 1) / 2, g.setXY(v, w.x, w.y), v++;
                _ += x }
            for (l = 0; l < r; l++) {
                var M = l * (n + 1);
                for (c = 0; c < n; c++) { s = c + M;
                    var T = s,
                        E = s + n + 1,
                        S = s + n + 2,
                        A = s + 1;
                    d.setX(y, T), y++, d.setX(y, E), y++, d.setX(y, S), y++, d.setX(y, T), y++, d.setX(y, S), y++, d.setX(y, A), y++ } }
            this.setIndex(d), this.addAttribute("position", f), this.addAttribute("normal", m), this.addAttribute("uv", g) }

        function Je(t, e, i, n, r, a) { Tt.call(this), this.type = "RingGeometry", this.parameters = { innerRadius: t, outerRadius: e, thetaSegments: i, phiSegments: n, thetaStart: r, thetaLength: a }, this.fromBufferGeometry(new Ze(t, e, i, n, r, a)) }

        function Qe(t, e, i, n) { Tt.call(this), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: i, heightSegments: n }, this.fromBufferGeometry(new Lt(t, e, i, n)) }

        function Ke(t, e, n, r) { St.call(this), this.type = "LatheBufferGeometry", this.parameters = { points: t, segments: e, phiStart: n, phiLength: r }, e = Math.floor(e) || 12, n = n || 0, r = r || 2 * Math.PI, r = Qo.clamp(r, 0, 2 * Math.PI);
            var a, o, s, l = (e + 1) * t.length,
                c = e * t.length * 2 * 3,
                u = new dt(new(c > 65535 ? Uint32Array : Uint16Array)(c), 1),
                p = new dt(new Float32Array(3 * l), 3),
                d = new dt(new Float32Array(2 * l), 2),
                f = 0,
                m = 0,
                g = 1 / e,
                v = new h,
                y = new i;
            for (o = 0; o <= e; o++) {
                var _ = n + o * g * r,
                    x = Math.sin(_),
                    b = Math.cos(_);
                for (s = 0; s <= t.length - 1; s++) v.x = t[s].x * x, v.y = t[s].y, v.z = t[s].x * b, p.setXYZ(f, v.x, v.y, v.z), y.x = o / e, y.y = s / (t.length - 1), d.setXY(f, y.x, y.y), f++ }
            for (o = 0; o < e; o++)
                for (s = 0; s < t.length - 1; s++) { a = s + o * t.length;
                    var w = a,
                        M = a + t.length,
                        T = a + t.length + 1,
                        E = a + 1;
                    u.setX(m, w), m++, u.setX(m, M), m++, u.setX(m, E), m++, u.setX(m, M), m++, u.setX(m, T), m++, u.setX(m, E), m++ }
            if (this.setIndex(u), this.addAttribute("position", p), this.addAttribute("uv", d), this.computeVertexNormals(), r === 2 * Math.PI) {
                var S = this.attributes.normal.array,
                    A = new h,
                    R = new h,
                    L = new h;
                for (a = e * t.length * 3, o = 0, s = 0; o < t.length; o++, s += 3) A.x = S[s + 0], A.y = S[s + 1], A.z = S[s + 2], R.x = S[a + s + 0], R.y = S[a + s + 1], R.z = S[a + s + 2], L.addVectors(A, R).normalize(), S[s + 0] = S[a + s + 0] = L.x, S[s + 1] = S[a + s + 1] = L.y, S[s + 2] = S[a + s + 2] = L.z } }

        function $e(t, e, i, n) { Tt.call(this), this.type = "LatheGeometry", this.parameters = { points: t, segments: e, phiStart: i, phiLength: n }, this.fromBufferGeometry(new Ke(t, e, i, n)), this.mergeVertices() }

        function ti(t, e) {
            function i(t) {
                var i, s, l, c = n.length / 3,
                    u = t.extractPoints(e),
                    p = u.shape,
                    d = u.holes;
                if (ul.isClockWise(p) === !1)
                    for (p = p.reverse(), i = 0, s = d.length; i < s; i++) l = d[i], ul.isClockWise(l) === !0 && (d[i] = l.reverse());
                var f = ul.triangulateShape(p, d);
                for (i = 0, s = d.length; i < s; i++) l = d[i], p = p.concat(l);
                for (i = 0, s = p.length; i < s; i++) {
                    var m = p[i];
                    n.push(m.x, m.y, 0), r.push(0, 0, 1), a.push(m.x, m.y) }
                for (i = 0, s = f.length; i < s; i++) {
                    var g = f[i],
                        v = g[0] + c,
                        y = g[1] + c,
                        _ = g[2] + c;
                    o.push(v, y, _), h += 3 } }
            St.call(this), this.type = "ShapeBufferGeometry", this.parameters = { shapes: t, curveSegments: e }, e = e || 12;
            var n = [],
                r = [],
                a = [],
                o = [],
                s = 0,
                h = 0;
            if (Array.isArray(t) === !1) i(t);
            else
                for (var l = 0; l < t.length; l++) i(t[l]), this.addGroup(s, h, l), s += h, h = 0;
            this.setIndex(new(o.length > 65535 ? xt : yt)(o, 1)), this.addAttribute("position", new bt(n, 3)), this.addAttribute("normal", new bt(r, 3)), this.addAttribute("uv", new bt(a, 2)) }

        function ei(t, e) { Tt.call(this), this.type = "ShapeGeometry", "object" == typeof e && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), e = e.curveSegments), this.parameters = { shapes: t, curveSegments: e }, this.fromBufferGeometry(new ti(t, e)), this.mergeVertices() }

        function ii(t, e) {
            function i(t, e) {
                return t - e }
            St.call(this), e = void 0 !== e ? e : 1;
            var n, r = Math.cos(Qo.DEG2RAD * e),
                a = [0, 0],
                o = {},
                s = ["a", "b", "c"];
            t.isBufferGeometry ? (n = new Tt, n.fromBufferGeometry(t)) : n = t.clone(), n.mergeVertices(), n.computeFaceNormals();
            for (var h = n.vertices, l = n.faces, c = 0, u = l.length; c < u; c++)
                for (var p = l[c], d = 0; d < 3; d++) { a[0] = p[s[d]], a[1] = p[s[(d + 1) % 3]], a.sort(i);
                    var f = a.toString();
                    void 0 === o[f] ? o[f] = { vert1: a[0], vert2: a[1], face1: c, face2: void 0 } : o[f].face2 = c }
            var m = [];
            for (var f in o) {
                var g = o[f];
                if (void 0 === g.face2 || l[g.face1].normal.dot(l[g.face2].normal) <= r) {
                    var v = h[g.vert1];
                    m.push(v.x), m.push(v.y), m.push(v.z), v = h[g.vert2], m.push(v.x), m.push(v.y), m.push(v.z) } }
            this.addAttribute("position", new bt(m, 3)) }

        function ni(t, e, n, r, a, o, s, l) {
            function c() {
                var t = (r + 1) * (a + 1);
                return o === !1 && (t += (r + 1) * m + r * m), t }

            function u() {
                var t = r * a * 2 * 3;
                return o === !1 && (t += r * m * 3), t }

            function p() {
                var i, o, c = new h,
                    u = new h,
                    p = 0,
                    d = (e - t) / n;
                for (o = 0; o <= a; o++) {
                    var m = [],
                        g = o / a,
                        v = g * (e - t) + t;
                    for (i = 0; i <= r; i++) {
                        var A = i / r,
                            R = A * l + s,
                            L = Math.sin(R),
                            P = Math.cos(R);
                        u.x = v * L, u.y = -g * n + E, u.z = v * P, _.setXYZ(w, u.x, u.y, u.z), c.set(L, d, P).normalize(), x.setXYZ(w, c.x, c.y, c.z), b.setXY(w, A, 1 - g), m.push(w), w++ }
                    T.push(m) }
                for (i = 0; i < r; i++)
                    for (o = 0; o < a; o++) {
                        var C = T[o][i],
                            I = T[o + 1][i],
                            O = T[o + 1][i + 1],
                            D = T[o][i + 1];
                        y.setX(M, C), M++, y.setX(M, I), M++, y.setX(M, D), M++, y.setX(M, I), M++, y.setX(M, O), M++, y.setX(M, D), M++, p += 6 }
                f.addGroup(S, p, 0), S += p }

            function d(n) {
                var a, o, c, u = new i,
                    p = new h,
                    d = 0,
                    m = n === !0 ? t : e,
                    g = n === !0 ? 1 : -1;
                for (o = w, a = 1; a <= r; a++) _.setXYZ(w, 0, E * g, 0), x.setXYZ(w, 0, g, 0), u.x = .5, u.y = .5, b.setXY(w, u.x, u.y), w++;
                for (c = w, a = 0; a <= r; a++) {
                    var v = a / r,
                        T = v * l + s,
                        A = Math.cos(T),
                        R = Math.sin(T);
                    p.x = m * R, p.y = E * g, p.z = m * A, _.setXYZ(w, p.x, p.y, p.z), x.setXYZ(w, 0, g, 0), u.x = .5 * A + .5, u.y = .5 * R * g + .5, b.setXY(w, u.x, u.y), w++ }
                for (a = 0; a < r; a++) {
                    var L = o + a,
                        P = c + a;
                    n === !0 ? (y.setX(M, P), M++, y.setX(M, P + 1), M++, y.setX(M, L), M++) : (y.setX(M, P + 1), M++, y.setX(M, P), M++, y.setX(M, L), M++), d += 3 }
                f.addGroup(S, d, n === !0 ? 1 : 2), S += d }
            St.call(this), this.type = "CylinderBufferGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: n, radialSegments: r, heightSegments: a, openEnded: o, thetaStart: s, thetaLength: l };
            var f = this;
            t = void 0 !== t ? t : 20, e = void 0 !== e ? e : 20, n = void 0 !== n ? n : 100, r = Math.floor(r) || 8, a = Math.floor(a) || 1, o = void 0 !== o && o, s = void 0 !== s ? s : 0, l = void 0 !== l ? l : 2 * Math.PI;
            var m = 0;
            o === !1 && (t > 0 && m++, e > 0 && m++);
            var g = c(),
                v = u(),
                y = new dt(new(v > 65535 ? Uint32Array : Uint16Array)(v), 1),
                _ = new dt(new Float32Array(3 * g), 3),
                x = new dt(new Float32Array(3 * g), 3),
                b = new dt(new Float32Array(2 * g), 2),
                w = 0,
                M = 0,
                T = [],
                E = n / 2,
                S = 0;
            p(), o === !1 && (t > 0 && d(!0), e > 0 && d(!1)), this.setIndex(y), this.addAttribute("position", _), this.addAttribute("normal", x), this.addAttribute("uv", b) }

        function ri(t, e, i, n, r, a, o, s) { Tt.call(this), this.type = "CylinderGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: i, radialSegments: n, heightSegments: r, openEnded: a, thetaStart: o, thetaLength: s }, this.fromBufferGeometry(new ni(t, e, i, n, r, a, o, s)), this.mergeVertices() }

        function ai(t, e, i, n, r, a, o) { ri.call(this, 0, t, e, i, n, r, a, o), this.type = "ConeGeometry", this.parameters = { radius: t, height: e, radialSegments: i, heightSegments: n, openEnded: r, thetaStart: a, thetaLength: o } }

        function oi(t, e, i, n, r, a, o) { ni.call(this, 0, t, e, i, n, r, a, o), this.type = "ConeBufferGeometry", this.parameters = { radius: t, height: e, radialSegments: i, heightSegments: n, openEnded: r, thetaStart: a, thetaLength: o } }

        function si(t, e, i, n) {
            St.call(this), this.type = "CircleBufferGeometry", this.parameters = { radius: t, segments: e, thetaStart: i, thetaLength: n }, t = t || 50, e = void 0 !== e ? Math.max(3, e) : 8, i = void 0 !== i ? i : 0, n = void 0 !== n ? n : 2 * Math.PI;
            var r = e + 2,
                a = new Float32Array(3 * r),
                o = new Float32Array(3 * r),
                s = new Float32Array(2 * r);
            o[2] = 1, s[0] = .5, s[1] = .5;
            for (var l = 0, c = 3, u = 2; l <= e; l++, c += 3, u += 2) {
                var p = i + l / e * n;
                a[c] = t * Math.cos(p), a[c + 1] = t * Math.sin(p), o[c + 2] = 1, s[u] = (a[c] / t + 1) / 2, s[u + 1] = (a[c + 1] / t + 1) / 2 }
            for (var d = [], c = 1; c <= e; c++) d.push(c, c + 1, 0);
            this.setIndex(new dt(new Uint16Array(d), 1)), this.addAttribute("position", new dt(a, 3)), this.addAttribute("normal", new dt(o, 3)),
                this.addAttribute("uv", new dt(s, 2)), this.boundingSphere = new tt(new h, t)
        }

        function hi(t, e, i, n) { Tt.call(this), this.type = "CircleGeometry", this.parameters = { radius: t, segments: e, thetaStart: i, thetaLength: n }, this.fromBufferGeometry(new si(t, e, i, n)) }

        function li(t, e, i, n, r, a) { Tt.call(this), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: i, widthSegments: n, heightSegments: r, depthSegments: a }, this.fromBufferGeometry(new Rt(t, e, i, n, r, a)), this.mergeVertices() }

        function ci() { Q.call(this, { uniforms: rs.merge([al.lights, { opacity: { value: 1 } }]), vertexShader: nl.shadow_vert, fragmentShader: nl.shadow_frag }), this.lights = !0, this.transparent = !0, Object.defineProperties(this, { opacity: { enumerable: !0, get: function() {
                        return this.uniforms.opacity.value }, set: function(t) { this.uniforms.opacity.value = t } } }) }

        function ui(t) { Q.call(this, t), this.type = "RawShaderMaterial" }

        function pi(t) { this.uuid = Qo.generateUUID(), this.type = "MultiMaterial", this.materials = Array.isArray(t) ? t : [], this.visible = !0 }

        function di(t) { J.call(this), this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new W(16777215), this.roughness = .5, this.metalness = .5, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new W(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new i(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t) }

        function fi(t) { di.call(this), this.defines = { PHYSICAL: "" }, this.type = "MeshPhysicalMaterial", this.reflectivity = .5, this.clearCoat = 0, this.clearCoatRoughness = 0, this.setValues(t) }

        function mi(t) { J.call(this), this.type = "MeshPhongMaterial", this.color = new W(16777215), this.specular = new W(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new W(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new i(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Ea, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t) }

        function gi(t) { mi.call(this), this.defines = { TOON: "" }, this.type = "MeshToonMaterial", this.gradientMap = null, this.setValues(t) }

        function vi(t) { J.call(this, t), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new i(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t) }

        function yi(t) { J.call(this), this.type = "MeshLambertMaterial", this.color = new W(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new W(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Ea, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t) }

        function _i(t) { J.call(this), this.type = "LineDashedMaterial", this.color = new W(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.lights = !1, this.setValues(t) }

        function xi(t, e, i) {
            var n = this,
                r = !1,
                a = 0,
                o = 0;
            this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = i, this.itemStart = function(t) { o++, r === !1 && void 0 !== n.onStart && n.onStart(t, a, o), r = !0 }, this.itemEnd = function(t) { a++, void 0 !== n.onProgress && n.onProgress(t, a, o), a === o && (r = !1, void 0 !== n.onLoad && n.onLoad()) }, this.itemError = function(t) { void 0 !== n.onError && n.onError(t) } }

        function bi(t) { this.manager = void 0 !== t ? t : ml }

        function wi(t) { this.manager = void 0 !== t ? t : ml, this._parser = null }

        function Mi(t) { this.manager = void 0 !== t ? t : ml, this._parser = null }

        function Ti(t) { this.manager = void 0 !== t ? t : ml }

        function Ei(t) { this.manager = void 0 !== t ? t : ml }

        function Si(t) { this.manager = void 0 !== t ? t : ml }

        function Ai(t, e) { ht.call(this), this.type = "Light", this.color = new W(t), this.intensity = void 0 !== e ? e : 1, this.receiveShadow = void 0 }

        function Ri(t, e, i) { Ai.call(this, t, i), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(ht.DefaultUp), this.updateMatrix(), this.groundColor = new W(e) }

        function Li(t) { this.camera = t, this.bias = 0, this.radius = 1, this.mapSize = new i(512, 512), this.map = null, this.matrix = new l }

        function Pi() { Li.call(this, new Ct(50, 1, .5, 500)) }

        function Ci(t, e, i, n, r, a) { Ai.call(this, t, e), this.type = "SpotLight", this.position.copy(ht.DefaultUp), this.updateMatrix(), this.target = new ht, Object.defineProperty(this, "power", { get: function() {
                    return this.intensity * Math.PI }, set: function(t) { this.intensity = t / Math.PI } }), this.distance = void 0 !== i ? i : 0, this.angle = void 0 !== n ? n : Math.PI / 3, this.penumbra = void 0 !== r ? r : 0, this.decay = void 0 !== a ? a : 1, this.shadow = new Pi }

        function Ii(t, e, i, n) { Ai.call(this, t, e), this.type = "PointLight", Object.defineProperty(this, "power", { get: function() {
                    return 4 * this.intensity * Math.PI }, set: function(t) { this.intensity = t / (4 * Math.PI) } }), this.distance = void 0 !== i ? i : 0, this.decay = void 0 !== n ? n : 1, this.shadow = new Li(new Ct(90, 1, .5, 500)) }

        function Oi(t) { Li.call(this, new It(-5, 5, 5, -5, .5, 500)) }

        function Di(t, e) { Ai.call(this, t, e), this.type = "DirectionalLight", this.position.copy(ht.DefaultUp), this.updateMatrix(), this.target = new ht, this.shadow = new Oi }

        function Ui(t, e) { Ai.call(this, t, e), this.type = "AmbientLight", this.castShadow = void 0 }

        function Ni(t, e, i, n) { this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 !== n ? n : new e.constructor(i), this.sampleValues = e, this.valueSize = i }

        function Fi(t, e, i, n) { Ni.call(this, t, e, i, n), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0 }

        function zi(t, e, i, n) { Ni.call(this, t, e, i, n) }

        function Bi(t, e, i, n) { Ni.call(this, t, e, i, n) }

        function Gi(t, e, i, n) {
            if (void 0 === t) throw new Error("track name is undefined");
            if (void 0 === e || 0 === e.length) throw new Error("no keyframes in track named " + t);
            this.name = t, this.times = vl.convertArray(e, this.TimeBufferType), this.values = vl.convertArray(i, this.ValueBufferType), this.setInterpolation(n || this.DefaultInterpolation), this.validate(), this.optimize() }

        function ki(t, e, i, n) { Gi.call(this, t, e, i, n) }

        function Hi(t, e, i, n) { Ni.call(this, t, e, i, n) }

        function ji(t, e, i, n) { Gi.call(this, t, e, i, n) }

        function Vi(t, e, i, n) { Gi.call(this, t, e, i, n) }

        function Wi(t, e, i, n) { Gi.call(this, t, e, i, n) }

        function Xi(t, e, i) { Gi.call(this, t, e, i) }

        function Yi(t, e, i, n) { Gi.call(this, t, e, i, n) }

        function qi(t, e, i, n) { Gi.apply(this, arguments) }

        function Zi(t, e, i) { this.name = t, this.tracks = i, this.duration = void 0 !== e ? e : -1, this.uuid = Qo.generateUUID(), this.duration < 0 && this.resetDuration(), this.optimize() }

        function Ji(t) { this.manager = void 0 !== t ? t : ml, this.textures = {} }

        function Qi(t) { this.manager = void 0 !== t ? t : ml }

        function Ki() { this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {} }

        function $i(t) { "boolean" == typeof t && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), t = void 0), this.manager = void 0 !== t ? t : ml, this.withCredentials = !1 }

        function tn(t) { this.manager = void 0 !== t ? t : ml, this.texturePath = "" }

        function en() {}

        function nn(t, e) { this.v1 = t, this.v2 = e }

        function rn() { this.curves = [], this.autoClose = !1 }

        function an(t, e, i, n, r, a, o, s) { this.aX = t, this.aY = e, this.xRadius = i, this.yRadius = n, this.aStartAngle = r, this.aEndAngle = a, this.aClockwise = o, this.aRotation = s || 0 }

        function on(t) { this.points = void 0 === t ? [] : t }

        function sn(t, e, i, n) { this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = n }

        function hn(t, e, i) { this.v0 = t, this.v1 = e, this.v2 = i }

        function ln() { cn.apply(this, arguments), this.holes = [] }

        function cn(t) { rn.call(this), this.currentPoint = new i, t && this.fromPoints(t) }

        function un() { this.subPaths = [], this.currentPath = null }

        function pn(t) { this.data = t }

        function dn(t) { this.manager = void 0 !== t ? t : ml }

        function fn(t) { this.manager = void 0 !== t ? t : ml }

        function mn(t, e, i, n) { Ai.call(this, t, e), this.type = "RectAreaLight", this.position.set(0, 1, 0), this.updateMatrix(), this.width = void 0 !== i ? i : 10, this.height = void 0 !== n ? n : 10 }

        function gn() { this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new Ct, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new Ct, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1 }

        function vn(t, e, i) { ht.call(this), this.type = "CubeCamera";
            var n = 90,
                r = 1,
                a = new Ct(n, r, t, e);
            a.up.set(0, -1, 0), a.lookAt(new h(1, 0, 0)), this.add(a);
            var s = new Ct(n, r, t, e);
            s.up.set(0, -1, 0), s.lookAt(new h(-1, 0, 0)), this.add(s);
            var l = new Ct(n, r, t, e);
            l.up.set(0, 0, 1), l.lookAt(new h(0, 1, 0)), this.add(l);
            var c = new Ct(n, r, t, e);
            c.up.set(0, 0, -1), c.lookAt(new h(0, -1, 0)), this.add(c);
            var u = new Ct(n, r, t, e);
            u.up.set(0, -1, 0), u.lookAt(new h(0, 0, 1)), this.add(u);
            var p = new Ct(n, r, t, e);
            p.up.set(0, -1, 0), p.lookAt(new h(0, 0, -1)), this.add(p);
            var d = { format: po, magFilter: Za, minFilter: Za };
            this.renderTarget = new o(i, i, d), this.updateCubeMap = function(t, e) { null === this.parent && this.updateMatrixWorld();
                var i = this.renderTarget,
                    n = i.texture.generateMipmaps;
                i.texture.generateMipmaps = !1, i.activeCubeFace = 0, t.render(e, a, i), i.activeCubeFace = 1, t.render(e, s, i), i.activeCubeFace = 2, t.render(e, l, i), i.activeCubeFace = 3, t.render(e, c, i), i.activeCubeFace = 4, t.render(e, u, i), i.texture.generateMipmaps = n, i.activeCubeFace = 5, t.render(e, p, i), t.setRenderTarget(null) } }

        function yn() { ht.call(this), this.type = "AudioListener", this.context = wl.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null }

        function _n(t) { ht.call(this), this.type = "Audio", this.context = t.context, this.gain = this.context.createGain(), this.gain.connect(t.getInput()), this.autoplay = !1, this.buffer = null, this.loop = !1, this.startTime = 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.sourceType = "empty", this.filters = [] }

        function xn(t) { _n.call(this, t), this.panner = this.context.createPanner(), this.panner.connect(this.gain) }

        function bn(t, e) { this.analyser = t.context.createAnalyser(), this.analyser.fftSize = void 0 !== e ? e : 2048, this.data = new Uint8Array(this.analyser.frequencyBinCount), t.getOutput().connect(this.analyser) }

        function wn(t, e, i) { this.binding = t, this.valueSize = i;
            var n, r = Float64Array;
            switch (e) {
                case "quaternion":
                    n = this._slerp;
                    break;
                case "string":
                case "bool":
                    r = Array, n = this._select;
                    break;
                default:
                    n = this._lerp }
            this.buffer = new r(4 * i), this._mixBufferRegion = n, this.cumulativeWeight = 0, this.useCount = 0, this.referenceCount = 0 }

        function Mn(t, e, i) { this.path = e, this.parsedPath = i || Mn.parseTrackName(e), this.node = Mn.findNode(t, this.parsedPath.nodeName) || t, this.rootNode = t }

        function Tn(t) { this.uuid = Qo.generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
            var e = {};
            this._indicesByUUID = e;
            for (var i = 0, n = arguments.length; i !== n; ++i) e[arguments[i].uuid] = i;
            this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
            var r = this;
            this.stats = { objects: {get total() {
                        return r._objects.length }, get inUse() {
                        return this.total - r.nCachedObjects_ } }, get bindingsPerObject() {
                    return r._bindings.length } } }

        function En(t, e, i) { this._mixer = t, this._clip = e, this._localRoot = i || null;
            for (var n = e.tracks, r = n.length, a = new Array(r), o = { endingStart: Uo, endingEnd: Uo }, s = 0; s !== r; ++s) {
                var h = n[s].createInterpolant(null);
                a[s] = h, h.settings = o }
            this._interpolantSettings = o, this._interpolants = a, this._propertyBindings = new Array(r), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = Po, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0 }

        function Sn(t) { this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1 }

        function An(t) { "string" == typeof t && (console.warn("THREE.Uniform: Type parameter is no longer needed."), t = arguments[1]), this.value = t }

        function Rn() { St.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0 }

        function Ln(t, e, i, n) { this.uuid = Qo.generateUUID(), this.data = t, this.itemSize = e, this.offset = i, this.normalized = n === !0 }

        function Pn(t, e) { this.uuid = Qo.generateUUID(), this.array = t, this.stride = e, this.count = void 0 !== t ? t.length / e : 0, this.dynamic = !1, this.updateRange = { offset: 0, count: -1 }, this.onUploadCallback = function() {}, this.version = 0 }

        function Cn(t, e, i) { Pn.call(this, t, e), this.meshPerAttribute = i || 1 }

        function In(t, e, i) { dt.call(this, t, e), this.meshPerAttribute = i || 1 }

        function On(t, e, i, n) { this.ray = new at(t, e), this.near = i || 0, this.far = n || 1 / 0, this.params = { Mesh: {}, Line: {}, LOD: {}, Points: { threshold: 1 }, Sprite: {} }, Object.defineProperties(this.params, { PointCloud: { get: function() {
                        return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points } } }) }

        function Dn(t, e) {
            return t.distance - e.distance }

        function Un(t, e, i, n) {
            if (t.visible !== !1 && (t.raycast(e, i), n === !0))
                for (var r = t.children, a = 0, o = r.length; a < o; a++) Un(r[a], e, i, !0) }

        function Nn(t) { this.autoStart = void 0 === t || t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1 }

        function Fn(t) {
            function e(t, e, i, n, r, a, o) {
                var s = .5 * (i - t),
                    h = .5 * (n - e);
                return (2 * (e - i) + s + h) * o + (-3 * (e - i) - 2 * s - h) * a + s * r + e }
            this.points = t;
            var i, n, r, a, o, s, l, c, u, p = [],
                d = { x: 0, y: 0, z: 0 };
            this.initFromArray = function(t) { this.points = [];
                for (var e = 0; e < t.length; e++) this.points[e] = { x: t[e][0], y: t[e][1], z: t[e][2] } }, this.getPoint = function(t) {
                return i = (this.points.length - 1) * t, n = Math.floor(i), r = i - n, p[0] = 0 === n ? n : n - 1, p[1] = n, p[2] = n > this.points.length - 2 ? this.points.length - 1 : n + 1, p[3] = n > this.points.length - 3 ? this.points.length - 1 : n + 2, s = this.points[p[0]], l = this.points[p[1]], c = this.points[p[2]], u = this.points[p[3]], a = r * r, o = r * a, d.x = e(s.x, l.x, c.x, u.x, r, a, o), d.y = e(s.y, l.y, c.y, u.y, r, a, o), d.z = e(s.z, l.z, c.z, u.z, r, a, o), d }, this.getControlPointsArray = function() {
                var t, e, i = this.points.length,
                    n = [];
                for (t = 0; t < i; t++) e = this.points[t], n[t] = [e.x, e.y, e.z];
                return n }, this.getLength = function(t) {
                var e, i, n, r, a = 0,
                    o = 0,
                    s = 0,
                    l = new h,
                    c = new h,
                    u = [],
                    p = 0;
                for (u[0] = 0, t || (t = 100), n = this.points.length * t, l.copy(this.points[0]), e = 1; e < n; e++) i = e / n, r = this.getPoint(i), c.copy(r), p += c.distanceTo(l), l.copy(r), a = (this.points.length - 1) * i, o = Math.floor(a), o !== s && (u[o] = p, s = o);
                return u[u.length] = p, { chunks: u, total: p } }, this.reparametrizeByArcLength = function(t) {
                var e, i, n, r, a, o, s, l, c = [],
                    u = new h,
                    p = this.getLength();
                for (c.push(u.copy(this.points[0]).clone()), e = 1; e < this.points.length; e++) {
                    for (o = p.chunks[e] - p.chunks[e - 1], s = Math.ceil(t * o / p.total), r = (e - 1) / (this.points.length - 1), a = e / (this.points.length - 1), i = 1; i < s - 1; i++) n = r + i * (1 / s) * (a - r), l = this.getPoint(n), c.push(u.copy(l).clone());
                    c.push(u.copy(this.points[e]).clone()) }
                this.points = c } }

        function zn(t, e, i) {
            return this.radius = void 0 !== t ? t : 1, this.phi = void 0 !== e ? e : 0, this.theta = void 0 !== i ? i : 0, this }

        function Bn(t, e, i) {
            return this.radius = void 0 !== t ? t : 1, this.theta = void 0 !== e ? e : 0, this.y = void 0 !== i ? i : 0, this }

        function Gn(t, e) { At.call(this, t, e), this.animationsMap = {}, this.animationsList = [];
            var i = this.geometry.morphTargets.length,
                n = "__default",
                r = 0,
                a = i - 1,
                o = i / 1;
            this.createAnimation(n, r, a, o), this.setAnimationWeight(n, 1) }

        function kn(t) { ht.call(this), this.material = t, this.render = function(t) {} }

        function Hn(t, e, i, n) { this.object = t, this.size = void 0 !== e ? e : 1;
            var r = void 0 !== i ? i : 16711680,
                a = void 0 !== n ? n : 1,
                o = 0,
                s = this.object.geometry;
            s && s.isGeometry ? o = 3 * s.faces.length : s && s.isBufferGeometry && (o = s.attributes.normal.count);
            var h = new St,
                l = new bt(2 * o * 3, 3);
            h.addAttribute("position", l), ye.call(this, h, new ge({ color: r, linewidth: a })), this.matrixAutoUpdate = !1, this.update() }

        function jn(t) { ht.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;
            for (var e = new St, i = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], n = 0, r = 1, a = 32; n < a; n++, r++) {
                var o = n / a * Math.PI * 2,
                    s = r / a * Math.PI * 2;
                i.push(Math.cos(o), Math.sin(o), 1, Math.cos(s), Math.sin(s), 1) }
            e.addAttribute("position", new bt(i, 3));
            var h = new ge({ fog: !1 });
            this.cone = new ye(e, h), this.add(this.cone), this.update() }

        function Vn(t) { this.bones = this.getBoneList(t);
            for (var e = new St, i = [], n = [], r = new W(0, 0, 1), a = new W(0, 1, 0), o = 0; o < this.bones.length; o++) {
                var s = this.bones[o];
                s.parent && s.parent.isBone && (i.push(0, 0, 0), i.push(0, 0, 0), n.push(r.r, r.g, r.b), n.push(a.r, a.g, a.b)) }
            e.addAttribute("position", new bt(i, 3)), e.addAttribute("color", new bt(n, 3));
            var h = new ge({ vertexColors: Yr, depthTest: !1, depthWrite: !1, transparent: !0 });
            ye.call(this, e, h), this.root = t, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.update() }

        function Wn(t, e) { this.light = t, this.light.updateMatrixWorld();
            var i = new Ye(e, 4, 2),
                n = new pt({ wireframe: !0, fog: !1 });
            n.color.copy(this.light.color).multiplyScalar(this.light.intensity), At.call(this, i, n), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1 }

        function Xn(t) { ht.call(this), this.light = t, this.light.updateMatrixWorld();
            var e = new pt({ color: t.color, fog: !1 }),
                i = new pt({ color: t.color, fog: !1, wireframe: !0 }),
                n = new St;
            n.addAttribute("position", new dt(new Float32Array(18), 3)), this.add(new At(n, e)), this.add(new At(n, i)), this.update() }

        function Yn(t, e) { ht.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;
            var i = new Ie(e);
            i.rotateY(.5 * Math.PI);
            var n = new pt({ vertexColors: Yr, wireframe: !0 }),
                r = i.getAttribute("position"),
                a = new Float32Array(3 * r.count);
            i.addAttribute("color", new dt(a, 3)), this.add(new At(i, n)), this.update() }

        function qn(t, e, i, n) { t = t || 10, e = e || 10, i = new W(void 0 !== i ? i : 4473924), n = new W(void 0 !== n ? n : 8947848);
            for (var r = e / 2, a = 2 * t / e, o = [], s = [], h = 0, l = 0, c = -t; h <= e; h++, c += a) { o.push(-t, 0, c, t, 0, c), o.push(c, 0, -t, c, 0, t);
                var u = h === r ? i : n;
                u.toArray(s, l), l += 3, u.toArray(s, l), l += 3, u.toArray(s, l), l += 3, u.toArray(s, l), l += 3 }
            var p = new St;
            p.addAttribute("position", new bt(o, 3)), p.addAttribute("color", new bt(s, 3));
            var d = new ge({ vertexColors: Yr });
            ye.call(this, p, d) }

        function Zn(t, e, i, n, r, a) { t = t || 10, e = e || 16, i = i || 8, n = n || 64, r = new W(void 0 !== r ? r : 4473924), a = new W(void 0 !== a ? a : 8947848);
            var o, s, h, l, c, u, p, d = [],
                f = [];
            for (l = 0; l <= e; l++) h = l / e * (2 * Math.PI), o = Math.sin(h) * t, s = Math.cos(h) * t, d.push(0, 0, 0), d.push(o, 0, s), p = 1 & l ? r : a, f.push(p.r, p.g, p.b), f.push(p.r, p.g, p.b);
            for (l = 0; l <= i; l++)
                for (p = 1 & l ? r : a, u = t - t / i * l, c = 0; c < n; c++) h = c / n * (2 * Math.PI), o = Math.sin(h) * u, s = Math.cos(h) * u, d.push(o, 0, s), f.push(p.r, p.g, p.b), h = (c + 1) / n * (2 * Math.PI), o = Math.sin(h) * u, s = Math.cos(h) * u, d.push(o, 0, s), f.push(p.r, p.g, p.b);
            var m = new St;
            m.addAttribute("position", new bt(d, 3)), m.addAttribute("color", new bt(f, 3));
            var g = new ge({ vertexColors: Yr });
            ye.call(this, m, g) }

        function Jn(t, e, i, n) { this.object = t, this.size = void 0 !== e ? e : 1;
            var r = void 0 !== i ? i : 16776960,
                a = void 0 !== n ? n : 1,
                o = 0,
                s = this.object.geometry;
            s && s.isGeometry ? o = s.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
            var h = new St,
                l = new bt(2 * o * 3, 3);
            h.addAttribute("position", l), ye.call(this, h, new ge({ color: r, linewidth: a })), this.matrixAutoUpdate = !1, this.update() }

        function Qn(t, e) { ht.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, void 0 === e && (e = 1);
            var i = new St;
            i.addAttribute("position", new bt([-e, e, 0, e, e, 0, e, -e, 0, -e, -e, 0, -e, e, 0], 3));
            var n = new ge({ fog: !1 });
            this.add(new ve(i, n)), i = new St, i.addAttribute("position", new bt([0, 0, 0, 0, 0, 1], 3)), this.add(new ve(i, n)), this.update() }

        function Kn(t) {
            function e(t, e, n) { i(t, n), i(e, n) }

            function i(t, e) { a.push(0, 0, 0), o.push(e.r, e.g, e.b), void 0 === s[t] && (s[t] = []), s[t].push(a.length / 3 - 1) }
            var n = new St,
                r = new ge({ color: 16777215, vertexColors: Xr }),
                a = [],
                o = [],
                s = {},
                h = new W(16755200),
                l = new W(16711680),
                c = new W(43775),
                u = new W(16777215),
                p = new W(3355443);
            e("n1", "n2", h), e("n2", "n4", h), e("n4", "n3", h), e("n3", "n1", h), e("f1", "f2", h), e("f2", "f4", h), e("f4", "f3", h), e("f3", "f1", h), e("n1", "f1", h), e("n2", "f2", h), e("n3", "f3", h), e("n4", "f4", h), e("p", "n1", l), e("p", "n2", l), e("p", "n3", l), e("p", "n4", l), e("u1", "u2", c), e("u2", "u3", c), e("u3", "u1", c), e("c", "t", u), e("p", "c", p), e("cn1", "cn2", p), e("cn3", "cn4", p), e("cf1", "cf2", p), e("cf3", "cf4", p), n.addAttribute("position", new bt(a, 3)), n.addAttribute("color", new bt(o, 3)), ye.call(this, n, r), this.camera = t, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = s, this.update() }

        function $n(t, e) { void 0 === e && (e = 16776960);
            var i = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
                n = new Float32Array(24),
                r = new St;
            r.setIndex(new dt(i, 1)), r.addAttribute("position", new dt(n, 3)), ye.call(this, r, new ge({ color: e })), void 0 !== t && this.update(t) }

        function tr(t, e, i, n, r, a) { ht.call(this), void 0 === n && (n = 16776960), void 0 === i && (i = 1), void 0 === r && (r = .2 * i), void 0 === a && (a = .2 * r), this.position.copy(e), this.line = new ve(Ml, new ge({ color: n })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new At(Tl, new pt({ color: n })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(t), this.setLength(i, r, a) }

        function er(t) { t = t || 1;
            var e = [0, 0, 0, t, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t],
                i = [1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1],
                n = new St;
            n.addAttribute("position", new bt(e, 3)), n.addAttribute("color", new bt(i, 3));
            var r = new ge({ vertexColors: Yr });
            ye.call(this, n, r) }

        function ir(t, e, i, n, r, a) { an.call(this, t, e, i, i, n, r, a) }

        function nr(t, e, i, n, r, a, o) {
            return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new ut(t, e, i, r, a, o) }

        function rr(t) {
            return console.warn("THREE.MeshFaceMaterial has been renamed to THREE.MultiMaterial."), new pi(t) }

        function ar(t, e) {
            return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new xe(t, e) }

        function or(t) {
            return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new ue(t) }

        function sr(t, e) {
            return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new xe(t, e) }

        function hr(t) {
            return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), new _e(t) }

        function lr(t) {
            return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), new _e(t) }

        function cr(t) {
            return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), new _e(t) }

        function ur(t, e, i) {
            return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), new h(t, e, i) }

        function pr(t, e) {
            return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead."), new dt(t, e).setDynamic(!0) }

        function dr(t, e) {
            return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), new ft(t, e) }

        function fr(t, e) {
            return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), new mt(t, e) }

        function mr(t, e) {
            return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), new gt(t, e) }

        function gr(t, e) {
            return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), new vt(t, e) }

        function vr(t, e) {
            return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), new yt(t, e) }

        function yr(t, e) {
            return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), new _t(t, e) }

        function _r(t, e) {
            return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), new xt(t, e) }

        function xr(t, e) {
            return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), new bt(t, e) }

        function br(t, e) {
            return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), new wt(t, e) }

        function wr(t) { console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), El.call(this, t), this.type = "catmullrom", this.closed = !0 }

        function Mr(t, e) {
            return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), new $n(t, e) }

        function Tr(t, e) {
            return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."), new ye(new ii(t.geometry), new ge({ color: void 0 !== e ? e : 16777215 })) }

        function Er(t, e) {
            return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), new ye(new Se(t.geometry), new ge({ color: void 0 !== e ? e : 16777215 })) }

        function Sr(t) {
            return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new bi(t) }

        function Ar() { console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function(t, e) { console.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(e) }, this.unprojectVector = function(t, e) { console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), t.unproject(e) }, this.pickingRay = function() { console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().") } }

        function Rr() { console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), this.domElement = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), this.clear = function() {}, this.render = function() {}, this.setClearColor = function() {}, this.setSize = function() {} }
        void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Math.sign && (Math.sign = function(t) {
            return t < 0 ? -1 : t > 0 ? 1 : +t }), void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", { get: function() {
                return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1] } }), void 0 === Object.assign && ! function() { Object.assign = function(t) {
                if (void 0 === t || null === t) throw new TypeError("Cannot convert undefined or null to object");
                for (var e = Object(t), i = 1; i < arguments.length; i++) {
                    var n = arguments[i];
                    if (void 0 !== n && null !== n)
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) }
                return e } }(), Object.assign(e.prototype, { addEventListener: function(t, e) { void 0 === this._listeners && (this._listeners = {});
                var i = this._listeners;
                void 0 === i[t] && (i[t] = []), i[t].indexOf(e) === -1 && i[t].push(e) }, hasEventListener: function(t, e) {
                if (void 0 === this._listeners) return !1;
                var i = this._listeners;
                return void 0 !== i[t] && i[t].indexOf(e) !== -1 }, removeEventListener: function(t, e) {
                if (void 0 !== this._listeners) {
                    var i = this._listeners,
                        n = i[t];
                    if (void 0 !== n) {
                        var r = n.indexOf(e);
                        r !== -1 && n.splice(r, 1) } } }, dispatchEvent: function(t) {
                if (void 0 !== this._listeners) {
                    var e = this._listeners,
                        i = e[t.type];
                    if (void 0 !== i) { t.target = this;
                        var n = [],
                            r = 0,
                            a = i.length;
                        for (r = 0; r < a; r++) n[r] = i[r];
                        for (r = 0; r < a; r++) n[r].call(this, t) } } } });
        var Lr = "83",
            Pr = { LEFT: 0, MIDDLE: 1, RIGHT: 2 },
            Cr = 0,
            Ir = 1,
            Or = 2,
            Dr = 3,
            Ur = 0,
            Nr = 1,
            Fr = 0,
            zr = 1,
            Br = 2,
            Gr = 0,
            kr = 1,
            Hr = 2,
            jr = 1,
            Vr = 2,
            Wr = 0,
            Xr = 1,
            Yr = 2,
            qr = 0,
            Zr = 1,
            Jr = 2,
            Qr = 3,
            Kr = 4,
            $r = 5,
            ta = { NoBlending: qr, NormalBlending: Zr, AdditiveBlending: Jr, SubtractiveBlending: Qr, MultiplyBlending: Kr, CustomBlending: $r },
            ea = 100,
            ia = 101,
            na = 102,
            ra = 103,
            aa = 104,
            oa = 200,
            sa = 201,
            ha = 202,
            la = 203,
            ca = 204,
            ua = 205,
            pa = 206,
            da = 207,
            fa = 208,
            ma = 209,
            ga = 210,
            va = 0,
            ya = 1,
            _a = 2,
            xa = 3,
            ba = 4,
            wa = 5,
            Ma = 6,
            Ta = 7,
            Ea = 0,
            Sa = 1,
            Aa = 2,
            Ra = 0,
            La = 1,
            Pa = 2,
            Ca = 3,
            Ia = 4,
            Oa = 300,
            Da = 301,
            Ua = 302,
            Na = 303,
            Fa = 304,
            za = 305,
            Ba = 306,
            Ga = 307,
            ka = { UVMapping: Oa, CubeReflectionMapping: Da, CubeRefractionMapping: Ua, EquirectangularReflectionMapping: Na, EquirectangularRefractionMapping: Fa, SphericalReflectionMapping: za, CubeUVReflectionMapping: Ba, CubeUVRefractionMapping: Ga },
            Ha = 1e3,
            ja = 1001,
            Va = 1002,
            Wa = { RepeatWrapping: Ha, ClampToEdgeWrapping: ja, MirroredRepeatWrapping: Va },
            Xa = 1003,
            Ya = 1004,
            qa = 1005,
            Za = 1006,
            Ja = 1007,
            Qa = 1008,
            Ka = { NearestFilter: Xa, NearestMipMapNearestFilter: Ya, NearestMipMapLinearFilter: qa, LinearFilter: Za, LinearMipMapNearestFilter: Ja, LinearMipMapLinearFilter: Qa },
            $a = 1009,
            to = 1010,
            eo = 1011,
            io = 1012,
            no = 1013,
            ro = 1014,
            ao = 1015,
            oo = 1016,
            so = 1017,
            ho = 1018,
            lo = 1019,
            co = 1020,
            uo = 1021,
            po = 1022,
            fo = 1023,
            mo = 1024,
            go = 1025,
            vo = fo,
            yo = 1026,
            _o = 1027,
            xo = 2001,
            bo = 2002,
            wo = 2003,
            Mo = 2004,
            To = 2100,
            Eo = 2101,
            So = 2102,
            Ao = 2103,
            Ro = 2151,
            Lo = 2200,
            Po = 2201,
            Co = 2202,
            Io = 2300,
            Oo = 2301,
            Do = 2302,
            Uo = 2400,
            No = 2401,
            Fo = 2402,
            zo = 0,
            Bo = 1,
            Go = 2,
            ko = 3e3,
            Ho = 3001,
            jo = 3007,
            Vo = 3002,
            Wo = 3003,
            Xo = 3004,
            Yo = 3005,
            qo = 3006,
            Zo = 3200,
            Jo = 3201,
            Qo = { DEG2RAD: Math.PI / 180, RAD2DEG: 180 / Math.PI, generateUUID: function() {
                    var t, e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                        i = new Array(36),
                        n = 0;
                    return function() {
                        for (var r = 0; r < 36; r++) 8 === r || 13 === r || 18 === r || 23 === r ? i[r] = "-" : 14 === r ? i[r] = "4" : (n <= 2 && (n = 33554432 + 16777216 * Math.random() | 0), t = 15 & n, n >>= 4, i[r] = e[19 === r ? 3 & t | 8 : t]);
                        return i.join("") } }(), clamp: function(t, e, i) {
                    return Math.max(e, Math.min(i, t)) }, euclideanModulo: function(t, e) {
                    return (t % e + e) % e }, mapLinear: function(t, e, i, n, r) {
                    return n + (t - e) * (r - n) / (i - e) }, lerp: function(t, e, i) {
                    return (1 - i) * t + i * e }, smoothstep: function(t, e, i) {
                    return t <= e ? 0 : t >= i ? 1 : (t = (t - e) / (i - e), t * t * (3 - 2 * t)) }, smootherstep: function(t, e, i) {
                    return t <= e ? 0 : t >= i ? 1 : (t = (t - e) / (i - e), t * t * t * (t * (6 * t - 15) + 10)) }, randInt: function(t, e) {
                    return t + Math.floor(Math.random() * (e - t + 1)) }, randFloat: function(t, e) {
                    return t + Math.random() * (e - t) }, randFloatSpread: function(t) {
                    return t * (.5 - Math.random()) }, degToRad: function(t) {
                    return t * Qo.DEG2RAD }, radToDeg: function(t) {
                    return t * Qo.RAD2DEG }, isPowerOfTwo: function(t) {
                    return 0 === (t & t - 1) && 0 !== t }, nearestPowerOfTwo: function(t) {
                    return Math.pow(2, Math.round(Math.log(t) / Math.LN2)) }, nextPowerOfTwo: function(t) {
                    return t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, t++, t } };
        i.prototype = {
            constructor: i,
            isVector2: !0,
            get width() {
                return this.x },
            set width(t) { this.x = t },
            get height() {
                return this.y },
            set height(t) { this.y = t },
            set: function(t, e) {
                return this.x = t, this.y = e, this },
            setScalar: function(t) {
                return this.x = t, this.y = t, this },
            setX: function(t) {
                return this.x = t, this },
            setY: function(t) {
                return this.y = t, this },
            setComponent: function(t, e) {
                switch (t) {
                    case 0:
                        this.x = e;
                        break;
                    case 1:
                        this.y = e;
                        break;
                    default:
                        throw new Error("index is out of range: " + t) }
                return this },
            getComponent: function(t) {
                switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    default:
                        throw new Error("index is out of range: " + t) } },
            clone: function() {
                return new this.constructor(this.x, this.y) },
            copy: function(t) {
                return this.x = t.x, this.y = t.y, this },
            add: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this) },
            addScalar: function(t) {
                return this.x += t, this.y += t, this },
            addVectors: function(t, e) {
                return this.x = t.x + e.x, this.y = t.y + e.y, this },
            addScaledVector: function(t, e) {
                return this.x += t.x * e, this.y += t.y * e, this },
            sub: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this) },
            subScalar: function(t) {
                return this.x -= t, this.y -= t, this },
            subVectors: function(t, e) {
                return this.x = t.x - e.x, this.y = t.y - e.y, this },
            multiply: function(t) {
                return this.x *= t.x, this.y *= t.y, this },
            multiplyScalar: function(t) {
                return isFinite(t) ? (this.x *= t, this.y *= t) : (this.x = 0, this.y = 0), this },
            divide: function(t) {
                return this.x /= t.x, this.y /= t.y, this },
            divideScalar: function(t) {
                return this.multiplyScalar(1 / t) },
            min: function(t) {
                return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this },
            max: function(t) {
                return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this },
            clamp: function(t, e) {
                return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this },
            clampScalar: function() {
                var t, e;
                return function(n, r) {
                    return void 0 === t && (t = new i, e = new i), t.set(n, n), e.set(r, r), this.clamp(t, e) } }(),
            clampLength: function(t, e) {
                var i = this.length();
                return this.multiplyScalar(Math.max(t, Math.min(e, i)) / i) },
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
                    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this },
            dot: function(t) {
                return this.x * t.x + this.y * t.y },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y) },
            lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) },
            normalize: function() {
                return this.divideScalar(this.length()) },
            angle: function() {
                var t = Math.atan2(this.y, this.x);
                return t < 0 && (t += 2 * Math.PI), t },
            distanceTo: function(t) {
                return Math.sqrt(this.distanceToSquared(t)) },
            distanceToSquared: function(t) {
                var e = this.x - t.x,
                    i = this.y - t.y;
                return e * e + i * i },
            distanceToManhattan: function(t) {
                return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) },
            setLength: function(t) {
                return this.multiplyScalar(t / this.length()) },
            lerp: function(t, e) {
                return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this },
            lerpVectors: function(t, e, i) {
                return this.subVectors(e, t).multiplyScalar(i).add(t) },
            equals: function(t) {
                return t.x === this.x && t.y === this.y },
            fromArray: function(t, e) {
                return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this },
            toArray: function(t, e) {
                return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t },
            fromAttribute: function(t, e, i) {
                return void 0 !== i && console.warn("THREE.Vector2: offset has been removed from .fromAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this },
            rotateAround: function(t, e) {
                var i = Math.cos(e),
                    n = Math.sin(e),
                    r = this.x - t.x,
                    a = this.y - t.y;
                return this.x = r * i - a * n + t.x, this.y = r * n + a * i + t.y, this }
        };
        var Ko = 0;
        n.DEFAULT_IMAGE = void 0, n.DEFAULT_MAPPING = Oa, n.prototype = { constructor: n, isTexture: !0, set needsUpdate(t) { t === !0 && this.version++ }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this }, toJSON: function(t) {
                function e(t) {
                    var e;
                    return void 0 !== t.toDataURL ? e = t : (e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), e.width = t.width, e.height = t.height, e.getContext("2d").drawImage(t, 0, 0, t.width, t.height)), e.width > 2048 || e.height > 2048 ? e.toDataURL("image/jpeg", .6) : e.toDataURL("image/png") }
                if (void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
                var i = { metadata: { version: 4.4, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, mapping: this.mapping, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], wrap: [this.wrapS, this.wrapT], minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY };
                if (void 0 !== this.image) {
                    var n = this.image;
                    void 0 === n.uuid && (n.uuid = Qo.generateUUID()), void 0 === t.images[n.uuid] && (t.images[n.uuid] = { uuid: n.uuid, url: e(n) }), i.image = n.uuid }
                return t.textures[this.uuid] = i, i }, dispose: function() { this.dispatchEvent({ type: "dispose" }) }, transformUv: function(t) {
                if (this.mapping === Oa) {
                    if (t.multiply(this.repeat), t.add(this.offset), t.x < 0 || t.x > 1) switch (this.wrapS) {
                        case Ha:
                            t.x = t.x - Math.floor(t.x);
                            break;
                        case ja:
                            t.x = t.x < 0 ? 0 : 1;
                            break;
                        case Va:
                            1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x) }
                    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
                        case Ha:
                            t.y = t.y - Math.floor(t.y);
                            break;
                        case ja:
                            t.y = t.y < 0 ? 0 : 1;
                            break;
                        case Va:
                            1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y) }
                    this.flipY && (t.y = 1 - t.y) } } }, Object.assign(n.prototype, e.prototype), r.prototype = { constructor: r, isVector4: !0, set: function(t, e, i, n) {
                return this.x = t, this.y = e, this.z = i, this.w = n, this }, setScalar: function(t) {
                return this.x = t, this.y = t, this.z = t, this.w = t, this }, setX: function(t) {
                return this.x = t, this }, setY: function(t) {
                return this.y = t, this }, setZ: function(t) {
                return this.z = t, this }, setW: function(t) {
                return this.w = t, this }, setComponent: function(t, e) {
                switch (t) {
                    case 0:
                        this.x = e;
                        break;
                    case 1:
                        this.y = e;
                        break;
                    case 2:
                        this.z = e;
                        break;
                    case 3:
                        this.w = e;
                        break;
                    default:
                        throw new Error("index is out of range: " + t) }
                return this }, getComponent: function(t) {
                switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    case 3:
                        return this.w;
                    default:
                        throw new Error("index is out of range: " + t) } }, clone: function() {
                return new this.constructor(this.x, this.y, this.z, this.w) }, copy: function(t) {
                return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this }, add: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this) }, addScalar: function(t) {
                return this.x += t, this.y += t, this.z += t, this.w += t, this }, addVectors: function(t, e) {
                return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this }, addScaledVector: function(t, e) {
                return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this }, sub: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this) }, subScalar: function(t) {
                return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this }, subVectors: function(t, e) {
                return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this }, multiplyScalar: function(t) {
                return isFinite(t) ? (this.x *= t, this.y *= t, this.z *= t, this.w *= t) : (this.x = 0, this.y = 0, this.z = 0, this.w = 0), this }, applyMatrix4: function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = this.w,
                    a = t.elements;
                return this.x = a[0] * e + a[4] * i + a[8] * n + a[12] * r, this.y = a[1] * e + a[5] * i + a[9] * n + a[13] * r, this.z = a[2] * e + a[6] * i + a[10] * n + a[14] * r, this.w = a[3] * e + a[7] * i + a[11] * n + a[15] * r, this }, divideScalar: function(t) {
                return this.multiplyScalar(1 / t) }, setAxisAngleFromQuaternion: function(t) { this.w = 2 * Math.acos(t.w);
                var e = Math.sqrt(1 - t.w * t.w);
                return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this }, setAxisAngleFromRotationMatrix: function(t) {
                var e, i, n, r, a = .01,
                    o = .1,
                    s = t.elements,
                    h = s[0],
                    l = s[4],
                    c = s[8],
                    u = s[1],
                    p = s[5],
                    d = s[9],
                    f = s[2],
                    m = s[6],
                    g = s[10];
                if (Math.abs(l - u) < a && Math.abs(c - f) < a && Math.abs(d - m) < a) {
                    if (Math.abs(l + u) < o && Math.abs(c + f) < o && Math.abs(d + m) < o && Math.abs(h + p + g - 3) < o) return this.set(1, 0, 0, 0), this;
                    e = Math.PI;
                    var v = (h + 1) / 2,
                        y = (p + 1) / 2,
                        _ = (g + 1) / 2,
                        x = (l + u) / 4,
                        b = (c + f) / 4,
                        w = (d + m) / 4;
                    return v > y && v > _ ? v < a ? (i = 0, n = .707106781, r = .707106781) : (i = Math.sqrt(v), n = x / i, r = b / i) : y > _ ? y < a ? (i = .707106781, n = 0, r = .707106781) : (n = Math.sqrt(y), i = x / n, r = w / n) : _ < a ? (i = .707106781, n = .707106781, r = 0) : (r = Math.sqrt(_), i = b / r, n = w / r), this.set(i, n, r, e), this }
                var M = Math.sqrt((m - d) * (m - d) + (c - f) * (c - f) + (u - l) * (u - l));
                return Math.abs(M) < .001 && (M = 1), this.x = (m - d) / M, this.y = (c - f) / M, this.z = (u - l) / M, this.w = Math.acos((h + p + g - 1) / 2), this }, min: function(t) {
                return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this }, max: function(t) {
                return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this }, clamp: function(t, e) {
                return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this }, clampScalar: function() {
                var t, e;
                return function(i, n) {
                    return void 0 === t && (t = new r, e = new r), t.set(i, i, i, i), e.set(n, n, n, n), this.clamp(t, e) } }(), floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this }, ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this }, round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this }, roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this }, negate: function() {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this }, dot: function(t) {
                return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w }, lengthSq: function() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w }, length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) }, lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w) }, normalize: function() {
                return this.divideScalar(this.length()) }, setLength: function(t) {
                return this.multiplyScalar(t / this.length()) }, lerp: function(t, e) {
                return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this }, lerpVectors: function(t, e, i) {
                return this.subVectors(e, t).multiplyScalar(i).add(t) }, equals: function(t) {
                return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w }, fromArray: function(t, e) {
                return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this }, toArray: function(t, e) {
                return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t }, fromAttribute: function(t, e, i) {
                return void 0 !== i && console.warn("THREE.Vector4: offset has been removed from .fromAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this } }, Object.assign(a.prototype, e.prototype, { isWebGLRenderTarget: !0, setSize: function(t, e) { this.width === t && this.height === e || (this.width = t, this.height = e, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e) }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.width = t.width, this.height = t.height, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this }, dispose: function() { this.dispatchEvent({ type: "dispose" }) } }), o.prototype = Object.create(a.prototype), o.prototype.constructor = o, o.prototype.isWebGLRenderTargetCube = !0, s.prototype = { constructor: s, get x() {
                return this._x }, set x(t) { this._x = t, this.onChangeCallback() }, get y() {
                return this._y }, set y(t) { this._y = t, this.onChangeCallback() }, get z() {
                return this._z }, set z(t) { this._z = t, this.onChangeCallback() }, get w() {
                return this._w }, set w(t) { this._w = t, this.onChangeCallback() }, set: function(t, e, i, n) {
                return this._x = t, this._y = e, this._z = i, this._w = n, this.onChangeCallback(), this }, clone: function() {
                return new this.constructor(this._x, this._y, this._z, this._w) }, copy: function(t) {
                return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), this }, setFromEuler: function(t, e) {
                if ((t && t.isEuler) === !1) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
                var i = Math.cos(t._x / 2),
                    n = Math.cos(t._y / 2),
                    r = Math.cos(t._z / 2),
                    a = Math.sin(t._x / 2),
                    o = Math.sin(t._y / 2),
                    s = Math.sin(t._z / 2),
                    h = t.order;
                return "XYZ" === h ? (this._x = a * n * r + i * o * s, this._y = i * o * r - a * n * s, this._z = i * n * s + a * o * r, this._w = i * n * r - a * o * s) : "YXZ" === h ? (this._x = a * n * r + i * o * s, this._y = i * o * r - a * n * s, this._z = i * n * s - a * o * r, this._w = i * n * r + a * o * s) : "ZXY" === h ? (this._x = a * n * r - i * o * s, this._y = i * o * r + a * n * s, this._z = i * n * s + a * o * r, this._w = i * n * r - a * o * s) : "ZYX" === h ? (this._x = a * n * r - i * o * s, this._y = i * o * r + a * n * s, this._z = i * n * s - a * o * r, this._w = i * n * r + a * o * s) : "YZX" === h ? (this._x = a * n * r + i * o * s, this._y = i * o * r + a * n * s, this._z = i * n * s - a * o * r, this._w = i * n * r - a * o * s) : "XZY" === h && (this._x = a * n * r - i * o * s, this._y = i * o * r - a * n * s, this._z = i * n * s + a * o * r, this._w = i * n * r + a * o * s), e !== !1 && this.onChangeCallback(), this }, setFromAxisAngle: function(t, e) {
                var i = e / 2,
                    n = Math.sin(i);
                return this._x = t.x * n, this._y = t.y * n, this._z = t.z * n, this._w = Math.cos(i), this.onChangeCallback(), this }, setFromRotationMatrix: function(t) {
                var e, i = t.elements,
                    n = i[0],
                    r = i[4],
                    a = i[8],
                    o = i[1],
                    s = i[5],
                    h = i[9],
                    l = i[2],
                    c = i[6],
                    u = i[10],
                    p = n + s + u;
                return p > 0 ? (e = .5 / Math.sqrt(p + 1), this._w = .25 / e, this._x = (c - h) * e, this._y = (a - l) * e, this._z = (o - r) * e) : n > s && n > u ? (e = 2 * Math.sqrt(1 + n - s - u), this._w = (c - h) / e, this._x = .25 * e, this._y = (r + o) / e, this._z = (a + l) / e) : s > u ? (e = 2 * Math.sqrt(1 + s - n - u), this._w = (a - l) / e, this._x = (r + o) / e, this._y = .25 * e, this._z = (h + c) / e) : (e = 2 * Math.sqrt(1 + u - n - s), this._w = (o - r) / e, this._x = (a + l) / e, this._y = (h + c) / e, this._z = .25 * e), this.onChangeCallback(), this }, setFromUnitVectors: function() {
                var t, e, i = 1e-6;
                return function(n, r) {
                    return void 0 === t && (t = new h), e = n.dot(r) + 1, e < i ? (e = 0, Math.abs(n.x) > Math.abs(n.z) ? t.set(-n.y, n.x, 0) : t.set(0, -n.z, n.y)) : t.crossVectors(n, r), this._x = t.x, this._y = t.y, this._z = t.z, this._w = e, this.normalize() } }(), inverse: function() {
                return this.conjugate().normalize() }, conjugate: function() {
                return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this }, dot: function(t) {
                return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w }, lengthSq: function() {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w }, length: function() {
                return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w) }, normalize: function() {
                var t = this.length();
                return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this.onChangeCallback(), this }, multiply: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t) }, premultiply: function(t) {
                return this.multiplyQuaternions(t, this) }, multiplyQuaternions: function(t, e) {
                var i = t._x,
                    n = t._y,
                    r = t._z,
                    a = t._w,
                    o = e._x,
                    s = e._y,
                    h = e._z,
                    l = e._w;
                return this._x = i * l + a * o + n * h - r * s, this._y = n * l + a * s + r * o - i * h, this._z = r * l + a * h + i * s - n * o, this._w = a * l - i * o - n * s - r * h, this.onChangeCallback(), this }, slerp: function(t, e) {
                if (0 === e) return this;
                if (1 === e) return this.copy(t);
                var i = this._x,
                    n = this._y,
                    r = this._z,
                    a = this._w,
                    o = a * t._w + i * t._x + n * t._y + r * t._z;
                if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1) return this._w = a, this._x = i, this._y = n, this._z = r, this;
                var s = Math.sqrt(1 - o * o);
                if (Math.abs(s) < .001) return this._w = .5 * (a + this._w), this._x = .5 * (i + this._x), this._y = .5 * (n + this._y), this._z = .5 * (r + this._z), this;
                var h = Math.atan2(s, o),
                    l = Math.sin((1 - e) * h) / s,
                    c = Math.sin(e * h) / s;
                return this._w = a * l + this._w * c, this._x = i * l + this._x * c, this._y = n * l + this._y * c, this._z = r * l + this._z * c, this.onChangeCallback(), this }, equals: function(t) {
                return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w }, fromArray: function(t, e) {
                return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this.onChangeCallback(), this }, toArray: function(t, e) {
                return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t }, onChange: function(t) {
                return this.onChangeCallback = t, this }, onChangeCallback: function() {} }, Object.assign(s, { slerp: function(t, e, i, n) {
                return i.copy(t).slerp(e, n) }, slerpFlat: function(t, e, i, n, r, a, o) {
                var s = i[n + 0],
                    h = i[n + 1],
                    l = i[n + 2],
                    c = i[n + 3],
                    u = r[a + 0],
                    p = r[a + 1],
                    d = r[a + 2],
                    f = r[a + 3];
                if (c !== f || s !== u || h !== p || l !== d) {
                    var m = 1 - o,
                        g = s * u + h * p + l * d + c * f,
                        v = g >= 0 ? 1 : -1,
                        y = 1 - g * g;
                    if (y > Number.EPSILON) {
                        var _ = Math.sqrt(y),
                            x = Math.atan2(_, g * v);
                        m = Math.sin(m * x) / _, o = Math.sin(o * x) / _ }
                    var b = o * v;
                    if (s = s * m + u * b, h = h * m + p * b, l = l * m + d * b, c = c * m + f * b, m === 1 - o) {
                        var w = 1 / Math.sqrt(s * s + h * h + l * l + c * c);
                        s *= w, h *= w, l *= w, c *= w } }
                t[e] = s, t[e + 1] = h, t[e + 2] = l, t[e + 3] = c } }), h.prototype = { constructor: h, isVector3: !0, set: function(t, e, i) {
                return this.x = t, this.y = e, this.z = i, this }, setScalar: function(t) {
                return this.x = t, this.y = t, this.z = t, this }, setX: function(t) {
                return this.x = t, this }, setY: function(t) {
                return this.y = t, this }, setZ: function(t) {
                return this.z = t, this }, setComponent: function(t, e) {
                switch (t) {
                    case 0:
                        this.x = e;
                        break;
                    case 1:
                        this.y = e;
                        break;
                    case 2:
                        this.z = e;
                        break;
                    default:
                        throw new Error("index is out of range: " + t) }
                return this }, getComponent: function(t) {
                switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    default:
                        throw new Error("index is out of range: " + t) } }, clone: function() {
                return new this.constructor(this.x, this.y, this.z) }, copy: function(t) {
                return this.x = t.x, this.y = t.y, this.z = t.z, this }, add: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this) }, addScalar: function(t) {
                return this.x += t, this.y += t, this.z += t, this }, addVectors: function(t, e) {
                return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this }, addScaledVector: function(t, e) {
                return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this }, sub: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this) }, subScalar: function(t) {
                return this.x -= t, this.y -= t, this.z -= t, this }, subVectors: function(t, e) {
                return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this }, multiply: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this) }, multiplyScalar: function(t) {
                return isFinite(t) ? (this.x *= t, this.y *= t, this.z *= t) : (this.x = 0, this.y = 0, this.z = 0), this }, multiplyVectors: function(t, e) {
                return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this }, applyEuler: function() {
                var t;
                return function(e) {
                    return (e && e.isEuler) === !1 && console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), void 0 === t && (t = new s), this.applyQuaternion(t.setFromEuler(e)) } }(), applyAxisAngle: function() {
                var t;
                return function(e, i) {
                    return void 0 === t && (t = new s), this.applyQuaternion(t.setFromAxisAngle(e, i)) } }(), applyMatrix3: function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = t.elements;
                return this.x = r[0] * e + r[3] * i + r[6] * n, this.y = r[1] * e + r[4] * i + r[7] * n, this.z = r[2] * e + r[5] * i + r[8] * n, this }, applyMatrix4: function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = t.elements;
                return this.x = r[0] * e + r[4] * i + r[8] * n + r[12], this.y = r[1] * e + r[5] * i + r[9] * n + r[13], this.z = r[2] * e + r[6] * i + r[10] * n + r[14], this }, applyProjection: function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = t.elements,
                    a = 1 / (r[3] * e + r[7] * i + r[11] * n + r[15]);
                return this.x = (r[0] * e + r[4] * i + r[8] * n + r[12]) * a, this.y = (r[1] * e + r[5] * i + r[9] * n + r[13]) * a, this.z = (r[2] * e + r[6] * i + r[10] * n + r[14]) * a, this }, applyQuaternion: function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = t.x,
                    a = t.y,
                    o = t.z,
                    s = t.w,
                    h = s * e + a * n - o * i,
                    l = s * i + o * e - r * n,
                    c = s * n + r * i - a * e,
                    u = -r * e - a * i - o * n;
                return this.x = h * s + u * -r + l * -o - c * -a, this.y = l * s + u * -a + c * -r - h * -o, this.z = c * s + u * -o + h * -a - l * -r, this }, project: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.multiplyMatrices(e.projectionMatrix, t.getInverse(e.matrixWorld)), this.applyProjection(t) } }(), unproject: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.multiplyMatrices(e.matrixWorld, t.getInverse(e.projectionMatrix)), this.applyProjection(t) } }(), transformDirection: function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = t.elements;
                return this.x = r[0] * e + r[4] * i + r[8] * n, this.y = r[1] * e + r[5] * i + r[9] * n, this.z = r[2] * e + r[6] * i + r[10] * n, this.normalize() }, divide: function(t) {
                return this.x /= t.x, this.y /= t.y, this.z /= t.z, this }, divideScalar: function(t) {
                return this.multiplyScalar(1 / t) }, min: function(t) {
                return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this }, max: function(t) {
                return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this }, clamp: function(t, e) {
                return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this }, clampScalar: function() {
                var t, e;
                return function(i, n) {
                    return void 0 === t && (t = new h, e = new h), t.set(i, i, i), e.set(n, n, n), this.clamp(t, e) } }(), clampLength: function(t, e) {
                var i = this.length();
                return this.multiplyScalar(Math.max(t, Math.min(e, i)) / i) }, floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this }, ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this }, round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this }, roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this }, negate: function() {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this }, dot: function(t) {
                return this.x * t.x + this.y * t.y + this.z * t.z }, lengthSq: function() {
                return this.x * this.x + this.y * this.y + this.z * this.z }, length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) }, lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) }, normalize: function() {
                return this.divideScalar(this.length()) }, setLength: function(t) {
                return this.multiplyScalar(t / this.length()) }, lerp: function(t, e) {
                return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this }, lerpVectors: function(t, e, i) {
                return this.subVectors(e, t).multiplyScalar(i).add(t) }, cross: function(t, e) {
                if (void 0 !== e) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e);
                var i = this.x,
                    n = this.y,
                    r = this.z;
                return this.x = n * t.z - r * t.y, this.y = r * t.x - i * t.z, this.z = i * t.y - n * t.x, this }, crossVectors: function(t, e) {
                var i = t.x,
                    n = t.y,
                    r = t.z,
                    a = e.x,
                    o = e.y,
                    s = e.z;
                return this.x = n * s - r * o, this.y = r * a - i * s, this.z = i * o - n * a, this }, projectOnVector: function(t) {
                var e = t.dot(this) / t.lengthSq();
                return this.copy(t).multiplyScalar(e) }, projectOnPlane: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new h), t.copy(this).projectOnVector(e), this.sub(t) } }(), reflect: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new h), this.sub(t.copy(e).multiplyScalar(2 * this.dot(e))) } }(), angleTo: function(t) {
                var e = this.dot(t) / Math.sqrt(this.lengthSq() * t.lengthSq());
                return Math.acos(Qo.clamp(e, -1, 1)) }, distanceTo: function(t) {
                return Math.sqrt(this.distanceToSquared(t)) }, distanceToSquared: function(t) {
                var e = this.x - t.x,
                    i = this.y - t.y,
                    n = this.z - t.z;
                return e * e + i * i + n * n }, distanceToManhattan: function(t) {
                return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z) }, setFromSpherical: function(t) {
                var e = Math.sin(t.phi) * t.radius;
                return this.x = e * Math.sin(t.theta), this.y = Math.cos(t.phi) * t.radius, this.z = e * Math.cos(t.theta), this }, setFromCylindrical: function(t) {
                return this.x = t.radius * Math.sin(t.theta), this.y = t.y, this.z = t.radius * Math.cos(t.theta), this }, setFromMatrixPosition: function(t) {
                return this.setFromMatrixColumn(t, 3) }, setFromMatrixScale: function(t) {
                var e = this.setFromMatrixColumn(t, 0).length(),
                    i = this.setFromMatrixColumn(t, 1).length(),
                    n = this.setFromMatrixColumn(t, 2).length();
                return this.x = e, this.y = i, this.z = n, this }, setFromMatrixColumn: function(t, e) {
                if ("number" == typeof t) { console.warn("THREE.Vector3: setFromMatrixColumn now expects ( matrix, index ).");
                    var i = t;
                    t = e, e = i }
                return this.fromArray(t.elements, 4 * e) }, equals: function(t) {
                return t.x === this.x && t.y === this.y && t.z === this.z }, fromArray: function(t, e) {
                return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this }, toArray: function(t, e) {
                return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t }, fromAttribute: function(t, e, i) {
                return void 0 !== i && console.warn("THREE.Vector3: offset has been removed from .fromAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this } }, l.prototype = {
            constructor: l,
            isMatrix4: !0,
            set: function(t, e, i, n, r, a, o, s, h, l, c, u, p, d, f, m) {
                var g = this.elements;
                return g[0] = t, g[4] = e, g[8] = i, g[12] = n, g[1] = r, g[5] = a, g[9] = o, g[13] = s, g[2] = h, g[6] = l, g[10] = c, g[14] = u, g[3] = p, g[7] = d, g[11] = f, g[15] = m, this },
            identity: function() {
                return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this },
            clone: function() {
                return (new l).fromArray(this.elements) },
            copy: function(t) {
                return this.elements.set(t.elements), this },
            copyPosition: function(t) {
                var e = this.elements,
                    i = t.elements;
                return e[12] = i[12], e[13] = i[13], e[14] = i[14], this },
            extractBasis: function(t, e, i) {
                return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this },
            makeBasis: function(t, e, i) {
                return this.set(t.x, e.x, i.x, 0, t.y, e.y, i.y, 0, t.z, e.z, i.z, 0, 0, 0, 0, 1), this },
            extractRotation: function() {
                var t;
                return function(e) { void 0 === t && (t = new h);
                    var i = this.elements,
                        n = e.elements,
                        r = 1 / t.setFromMatrixColumn(e, 0).length(),
                        a = 1 / t.setFromMatrixColumn(e, 1).length(),
                        o = 1 / t.setFromMatrixColumn(e, 2).length();
                    return i[0] = n[0] * r, i[1] = n[1] * r, i[2] = n[2] * r, i[4] = n[4] * a, i[5] = n[5] * a, i[6] = n[6] * a, i[8] = n[8] * o, i[9] = n[9] * o, i[10] = n[10] * o, this } }(),
            makeRotationFromEuler: function(t) {
                (t && t.isEuler) === !1 && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                var e = this.elements,
                    i = t.x,
                    n = t.y,
                    r = t.z,
                    a = Math.cos(i),
                    o = Math.sin(i),
                    s = Math.cos(n),
                    h = Math.sin(n),
                    l = Math.cos(r),
                    c = Math.sin(r);
                if ("XYZ" === t.order) {
                    var u = a * l,
                        p = a * c,
                        d = o * l,
                        f = o * c;
                    e[0] = s * l, e[4] = -s * c, e[8] = h, e[1] = p + d * h, e[5] = u - f * h, e[9] = -o * s, e[2] = f - u * h, e[6] = d + p * h, e[10] = a * s } else if ("YXZ" === t.order) {
                    var m = s * l,
                        g = s * c,
                        v = h * l,
                        y = h * c;
                    e[0] = m + y * o, e[4] = v * o - g, e[8] = a * h, e[1] = a * c, e[5] = a * l, e[9] = -o, e[2] = g * o - v, e[6] = y + m * o, e[10] = a * s } else if ("ZXY" === t.order) {
                    var m = s * l,
                        g = s * c,
                        v = h * l,
                        y = h * c;
                    e[0] = m - y * o, e[4] = -a * c, e[8] = v + g * o, e[1] = g + v * o, e[5] = a * l, e[9] = y - m * o, e[2] = -a * h, e[6] = o, e[10] = a * s } else if ("ZYX" === t.order) {
                    var u = a * l,
                        p = a * c,
                        d = o * l,
                        f = o * c;
                    e[0] = s * l, e[4] = d * h - p, e[8] = u * h + f, e[1] = s * c, e[5] = f * h + u, e[9] = p * h - d, e[2] = -h, e[6] = o * s, e[10] = a * s } else if ("YZX" === t.order) {
                    var _ = a * s,
                        x = a * h,
                        b = o * s,
                        w = o * h;
                    e[0] = s * l, e[4] = w - _ * c, e[8] = b * c + x, e[1] = c, e[5] = a * l, e[9] = -o * l, e[2] = -h * l, e[6] = x * c + b, e[10] = _ - w * c } else if ("XZY" === t.order) {
                    var _ = a * s,
                        x = a * h,
                        b = o * s,
                        w = o * h;
                    e[0] = s * l, e[4] = -c, e[8] = h * l, e[1] = _ * c + w, e[5] = a * l, e[9] = x * c - b, e[2] = b * c - x, e[6] = o * l, e[10] = w * c + _ }
                return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this },
            makeRotationFromQuaternion: function(t) {
                var e = this.elements,
                    i = t.x,
                    n = t.y,
                    r = t.z,
                    a = t.w,
                    o = i + i,
                    s = n + n,
                    h = r + r,
                    l = i * o,
                    c = i * s,
                    u = i * h,
                    p = n * s,
                    d = n * h,
                    f = r * h,
                    m = a * o,
                    g = a * s,
                    v = a * h;
                return e[0] = 1 - (p + f), e[4] = c - v, e[8] = u + g, e[1] = c + v, e[5] = 1 - (l + f), e[9] = d - m, e[2] = u - g, e[6] = d + m, e[10] = 1 - (l + p), e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this },
            lookAt: function() {
                var t, e, i;
                return function(n, r, a) { void 0 === t && (t = new h, e = new h, i = new h);
                    var o = this.elements;
                    return i.subVectors(n, r).normalize(), 0 === i.lengthSq() && (i.z = 1), t.crossVectors(a, i).normalize(), 0 === t.lengthSq() && (i.z += 1e-4, t.crossVectors(a, i).normalize()), e.crossVectors(i, t), o[0] = t.x, o[4] = e.x, o[8] = i.x, o[1] = t.y, o[5] = e.y, o[9] = i.y, o[2] = t.z, o[6] = e.z, o[10] = i.z, this } }(),
            multiply: function(t, e) {
                return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t) },
            premultiply: function(t) {
                return this.multiplyMatrices(t, this) },
            multiplyMatrices: function(t, e) {
                var i = t.elements,
                    n = e.elements,
                    r = this.elements,
                    a = i[0],
                    o = i[4],
                    s = i[8],
                    h = i[12],
                    l = i[1],
                    c = i[5],
                    u = i[9],
                    p = i[13],
                    d = i[2],
                    f = i[6],
                    m = i[10],
                    g = i[14],
                    v = i[3],
                    y = i[7],
                    _ = i[11],
                    x = i[15],
                    b = n[0],
                    w = n[4],
                    M = n[8],
                    T = n[12],
                    E = n[1],
                    S = n[5],
                    A = n[9],
                    R = n[13],
                    L = n[2],
                    P = n[6],
                    C = n[10],
                    I = n[14],
                    O = n[3],
                    D = n[7],
                    U = n[11],
                    N = n[15];
                return r[0] = a * b + o * E + s * L + h * O, r[4] = a * w + o * S + s * P + h * D, r[8] = a * M + o * A + s * C + h * U, r[12] = a * T + o * R + s * I + h * N, r[1] = l * b + c * E + u * L + p * O, r[5] = l * w + c * S + u * P + p * D, r[9] = l * M + c * A + u * C + p * U, r[13] = l * T + c * R + u * I + p * N, r[2] = d * b + f * E + m * L + g * O, r[6] = d * w + f * S + m * P + g * D, r[10] = d * M + f * A + m * C + g * U, r[14] = d * T + f * R + m * I + g * N, r[3] = v * b + y * E + _ * L + x * O, r[7] = v * w + y * S + _ * P + x * D, r[11] = v * M + y * A + _ * C + x * U, r[15] = v * T + y * R + _ * I + x * N, this },
            multiplyToArray: function(t, e, i) {
                var n = this.elements;
                return this.multiplyMatrices(t, e), i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], i[4] = n[4], i[5] = n[5], i[6] = n[6], i[7] = n[7], i[8] = n[8], i[9] = n[9], i[10] = n[10], i[11] = n[11], i[12] = n[12], i[13] = n[13], i[14] = n[14], i[15] = n[15], this },
            multiplyScalar: function(t) {
                var e = this.elements;
                return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this },
            applyToVector3Array: function() {
                var t;
                return function(e, i, n) { void 0 === t && (t = new h), void 0 === i && (i = 0), void 0 === n && (n = e.length);
                    for (var r = 0, a = i; r < n; r += 3, a += 3) t.fromArray(e, a), t.applyMatrix4(this), t.toArray(e, a);
                    return e } }(),
            applyToBufferAttribute: function() {
                var t;
                return function(e) { void 0 === t && (t = new h);
                    for (var i = 0, n = e.count; i < n; i++) t.x = e.getX(i), t.y = e.getY(i), t.z = e.getZ(i), t.applyMatrix4(this), e.setXYZ(i, t.x, t.y, t.z);
                    return e } }(),
            determinant: function() {
                var t = this.elements,
                    e = t[0],
                    i = t[4],
                    n = t[8],
                    r = t[12],
                    a = t[1],
                    o = t[5],
                    s = t[9],
                    h = t[13],
                    l = t[2],
                    c = t[6],
                    u = t[10],
                    p = t[14],
                    d = t[3],
                    f = t[7],
                    m = t[11],
                    g = t[15];
                return d * (+r * s * c - n * h * c - r * o * u + i * h * u + n * o * p - i * s * p) + f * (+e * s * p - e * h * u + r * a * u - n * a * p + n * h * l - r * s * l) + m * (+e * h * c - e * o * p - r * a * c + i * a * p + r * o * l - i * h * l) + g * (-n * o * l - e * s * c + e * o * u + n * a * c - i * a * u + i * s * l) },
            transpose: function() {
                var t, e = this.elements;
                return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this },
            setPosition: function(t) {
                var e = this.elements;
                return e[12] = t.x, e[13] = t.y, e[14] = t.z, this },
            getInverse: function(t, e) {
                var i = this.elements,
                    n = t.elements,
                    r = n[0],
                    a = n[1],
                    o = n[2],
                    s = n[3],
                    h = n[4],
                    l = n[5],
                    c = n[6],
                    u = n[7],
                    p = n[8],
                    d = n[9],
                    f = n[10],
                    m = n[11],
                    g = n[12],
                    v = n[13],
                    y = n[14],
                    _ = n[15],
                    x = d * y * u - v * f * u + v * c * m - l * y * m - d * c * _ + l * f * _,
                    b = g * f * u - p * y * u - g * c * m + h * y * m + p * c * _ - h * f * _,
                    w = p * v * u - g * d * u + g * l * m - h * v * m - p * l * _ + h * d * _,
                    M = g * d * c - p * v * c - g * l * f + h * v * f + p * l * y - h * d * y,
                    T = r * x + a * b + o * w + s * M;
                if (0 === T) {
                    var E = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
                    if (e === !0) throw new Error(E);
                    return console.warn(E), this.identity() }
                var S = 1 / T;
                return i[0] = x * S, i[1] = (v * f * s - d * y * s - v * o * m + a * y * m + d * o * _ - a * f * _) * S, i[2] = (l * y * s - v * c * s + v * o * u - a * y * u - l * o * _ + a * c * _) * S, i[3] = (d * c * s - l * f * s - d * o * u + a * f * u + l * o * m - a * c * m) * S, i[4] = b * S, i[5] = (p * y * s - g * f * s + g * o * m - r * y * m - p * o * _ + r * f * _) * S, i[6] = (g * c * s - h * y * s - g * o * u + r * y * u + h * o * _ - r * c * _) * S, i[7] = (h * f * s - p * c * s + p * o * u - r * f * u - h * o * m + r * c * m) * S, i[8] = w * S, i[9] = (g * d * s - p * v * s - g * a * m + r * v * m + p * a * _ - r * d * _) * S, i[10] = (h * v * s - g * l * s + g * a * u - r * v * u - h * a * _ + r * l * _) * S, i[11] = (p * l * s - h * d * s - p * a * u + r * d * u + h * a * m - r * l * m) * S, i[12] = M * S, i[13] = (p * v * o - g * d * o + g * a * f - r * v * f - p * a * y + r * d * y) * S, i[14] = (g * l * o - h * v * o - g * a * c + r * v * c + h * a * y - r * l * y) * S, i[15] = (h * d * o - p * l * o + p * a * c - r * d * c - h * a * f + r * l * f) * S, this },
            scale: function(t) {
                var e = this.elements,
                    i = t.x,
                    n = t.y,
                    r = t.z;
                return e[0] *= i, e[4] *= n, e[8] *= r, e[1] *= i, e[5] *= n, e[9] *= r, e[2] *= i, e[6] *= n, e[10] *= r, e[3] *= i, e[7] *= n, e[11] *= r, this },
            getMaxScaleOnAxis: function() {
                var t = this.elements,
                    e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
                    i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
                    n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
                return Math.sqrt(Math.max(e, i, n)) },
            makeTranslation: function(t, e, i) {
                return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1), this },
            makeRotationX: function(t) {
                var e = Math.cos(t),
                    i = Math.sin(t);
                return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this },
            makeRotationY: function(t) {
                var e = Math.cos(t),
                    i = Math.sin(t);
                return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this },
            makeRotationZ: function(t) {
                var e = Math.cos(t),
                    i = Math.sin(t);
                return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this },
            makeRotationAxis: function(t, e) {
                var i = Math.cos(e),
                    n = Math.sin(e),
                    r = 1 - i,
                    a = t.x,
                    o = t.y,
                    s = t.z,
                    h = r * a,
                    l = r * o;
                return this.set(h * a + i, h * o - n * s, h * s + n * o, 0, h * o + n * s, l * o + i, l * s - n * a, 0, h * s - n * o, l * s + n * a, r * s * s + i, 0, 0, 0, 0, 1), this },
            makeScale: function(t, e, i) {
                return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this },
            makeShear: function(t, e, i) {
                return this.set(1, e, i, 0, t, 1, i, 0, t, e, 1, 0, 0, 0, 0, 1), this },
            compose: function(t, e, i) {
                return this.makeRotationFromQuaternion(e), this.scale(i), this.setPosition(t), this },
            decompose: function() {
                var t, e;
                return function(i, n, r) { void 0 === t && (t = new h, e = new l);
                    var a = this.elements,
                        o = t.set(a[0], a[1], a[2]).length(),
                        s = t.set(a[4], a[5], a[6]).length(),
                        c = t.set(a[8], a[9], a[10]).length(),
                        u = this.determinant();
                    u < 0 && (o = -o), i.x = a[12], i.y = a[13], i.z = a[14], e.elements.set(this.elements);
                    var p = 1 / o,
                        d = 1 / s,
                        f = 1 / c;
                    return e.elements[0] *= p, e.elements[1] *= p, e.elements[2] *= p, e.elements[4] *= d, e.elements[5] *= d, e.elements[6] *= d, e.elements[8] *= f, e.elements[9] *= f, e.elements[10] *= f, n.setFromRotationMatrix(e), r.x = o, r.y = s, r.z = c, this } }(),
            makeFrustum: function(t, e, i, n, r, a) {
                var o = this.elements,
                    s = 2 * r / (e - t),
                    h = 2 * r / (n - i),
                    l = (e + t) / (e - t),
                    c = (n + i) / (n - i),
                    u = -(a + r) / (a - r),
                    p = -2 * a * r / (a - r);
                return o[0] = s, o[4] = 0, o[8] = l, o[12] = 0, o[1] = 0, o[5] = h, o[9] = c, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = u, o[14] = p, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this },
            makePerspective: function(t, e, i, n) {
                var r = i * Math.tan(Qo.DEG2RAD * t * .5),
                    a = -r,
                    o = a * e,
                    s = r * e;
                return this.makeFrustum(o, s, a, r, i, n) },
            makeOrthographic: function(t, e, i, n, r, a) {
                var o = this.elements,
                    s = 1 / (e - t),
                    h = 1 / (i - n),
                    l = 1 / (a - r),
                    c = (e + t) * s,
                    u = (i + n) * h,
                    p = (a + r) * l;
                return o[0] = 2 * s, o[4] = 0, o[8] = 0, o[12] = -c, o[1] = 0, o[5] = 2 * h,
                    o[9] = 0, o[13] = -u, o[2] = 0, o[6] = 0, o[10] = -2 * l, o[14] = -p, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
            },
            equals: function(t) {
                for (var e = this.elements, i = t.elements, n = 0; n < 16; n++)
                    if (e[n] !== i[n]) return !1;
                return !0 },
            fromArray: function(t, e) { void 0 === e && (e = 0);
                for (var i = 0; i < 16; i++) this.elements[i] = t[i + e];
                return this },
            toArray: function(t, e) { void 0 === t && (t = []), void 0 === e && (e = 0);
                var i = this.elements;
                return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t[e + 9] = i[9], t[e + 10] = i[10], t[e + 11] = i[11], t[e + 12] = i[12], t[e + 13] = i[13], t[e + 14] = i[14], t[e + 15] = i[15], t }
        }, c.prototype = Object.create(n.prototype), c.prototype.constructor = c, c.prototype.isCubeTexture = !0, Object.defineProperty(c.prototype, "images", { get: function() {
                return this.image }, set: function(t) { this.image = t } });
        var $o = new n,
            ts = new c,
            es = [],
            is = [];
        k.prototype.setValue = function(t, e) {
            for (var i = this.seq, n = 0, r = i.length; n !== r; ++n) {
                var a = i[n];
                a.setValue(t, e[a.id]) } };
        var ns = /([\w\d_]+)(\])?(\[|\.)?/g;
        V.prototype.setValue = function(t, e, i) {
            var n = this.map[e];
            void 0 !== n && n.setValue(t, i, this.renderer) }, V.prototype.set = function(t, e, i) {
            var n = this.map[i];
            void 0 !== n && n.setValue(t, e[i], this.renderer) }, V.prototype.setOptional = function(t, e, i) {
            var n = e[i];
            void 0 !== n && this.setValue(t, i, n) }, V.upload = function(t, e, i, n) {
            for (var r = 0, a = e.length; r !== a; ++r) {
                var o = e[r],
                    s = i[o.id];
                s.needsUpdate !== !1 && o.setValue(t, s.value, n) } }, V.seqWithValue = function(t, e) {
            for (var i = [], n = 0, r = t.length; n !== r; ++n) {
                var a = t[n];
                a.id in e && i.push(a) }
            return i };
        var rs = { merge: function(t) {
                    for (var e = {}, i = 0; i < t.length; i++) {
                        var n = this.clone(t[i]);
                        for (var r in n) e[r] = n[r] }
                    return e }, clone: function(t) {
                    var e = {};
                    for (var i in t) { e[i] = {};
                        for (var n in t[i]) {
                            var r = t[i][n];
                            r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? e[i][n] = r.clone() : Array.isArray(r) ? e[i][n] = r.slice() : e[i][n] = r } }
                    return e } },
            as = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
            os = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
            ss = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
            hs = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
            ls = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
            cs = "\nvec3 transformed = vec3( position );\n",
            us = "\nvec3 objectNormal = vec3( normal );\n",
            ps = "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t\t}\n\t\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 ltcTextureCoords( const in GeometricContext geometry, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = (LUT_SIZE - 1.0)/LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5/LUT_SIZE;\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 P = geometry.position;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nvoid clipQuadToHorizon( inout vec3 L[5], out int n ) {\n\tint config = 0;\n\tif ( L[0].z > 0.0 ) config += 1;\n\tif ( L[1].z > 0.0 ) config += 2;\n\tif ( L[2].z > 0.0 ) config += 4;\n\tif ( L[3].z > 0.0 ) config += 8;\n\tn = 0;\n\tif ( config == 0 ) {\n\t} else if ( config == 1 ) {\n\t\tn = 3;\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t\tL[2] = -L[3].z * L[0] + L[0].z * L[3];\n\t} else if ( config == 2 ) {\n\t\tn = 3;\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t} else if ( config == 3 ) {\n\t\tn = 4;\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t\tL[3] = -L[3].z * L[0] + L[0].z * L[3];\n\t} else if ( config == 4 ) {\n\t\tn = 3;\n\t\tL[0] = -L[3].z * L[2] + L[2].z * L[3];\n\t\tL[1] = -L[1].z * L[2] + L[2].z * L[1];\n\t} else if ( config == 5 ) {\n\t\tn = 0;\n\t} else if ( config == 6 ) {\n\t\tn = 4;\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t\tL[3] = -L[3].z * L[2] + L[2].z * L[3];\n\t} else if ( config == 7 ) {\n\t\tn = 5;\n\t\tL[4] = -L[3].z * L[0] + L[0].z * L[3];\n\t\tL[3] = -L[3].z * L[2] + L[2].z * L[3];\n\t} else if ( config == 8 ) {\n\t\tn = 3;\n\t\tL[0] = -L[0].z * L[3] + L[3].z * L[0];\n\t\tL[1] = -L[2].z * L[3] + L[3].z * L[2];\n\t\tL[2] =  L[3];\n\t} else if ( config == 9 ) {\n\t\tn = 4;\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t\tL[2] = -L[2].z * L[3] + L[3].z * L[2];\n\t} else if ( config == 10 ) {\n\t\tn = 0;\n\t} else if ( config == 11 ) {\n\t\tn = 5;\n\t\tL[4] = L[3];\n\t\tL[3] = -L[2].z * L[3] + L[3].z * L[2];\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t} else if ( config == 12 ) {\n\t\tn = 4;\n\t\tL[1] = -L[1].z * L[2] + L[2].z * L[1];\n\t\tL[0] = -L[0].z * L[3] + L[3].z * L[0];\n\t} else if ( config == 13 ) {\n\t\tn = 5;\n\t\tL[4] = L[3];\n\t\tL[3] = L[2];\n\t\tL[2] = -L[1].z * L[2] + L[2].z * L[1];\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t} else if ( config == 14 ) {\n\t\tn = 5;\n\t\tL[4] = -L[0].z * L[3] + L[3].z * L[0];\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t} else if ( config == 15 ) {\n\t\tn = 4;\n\t}\n\tif ( n == 3 )\n\t\tL[3] = L[0];\n\tif ( n == 4 )\n\t\tL[4] = L[0];\n}\nfloat integrateLtcBrdfOverRectEdge( vec3 v1, vec3 v2 ) {\n\tfloat cosTheta = dot( v1, v2 );\n\tfloat theta = acos( cosTheta );\n\tfloat res = cross( v1, v2 ).z * ( ( theta > 0.001 ) ? theta / sin( theta ) : 1.0 );\n\treturn res;\n}\nvoid initRectPoints( const in vec3 pos, const in vec3 halfWidth, const in vec3 halfHeight, out vec3 rectPoints[4] ) {\n\trectPoints[0] = pos - halfWidth - halfHeight;\n\trectPoints[1] = pos + halfWidth - halfHeight;\n\trectPoints[2] = pos + halfWidth + halfHeight;\n\trectPoints[3] = pos - halfWidth + halfHeight;\n}\nvec3 integrateLtcBrdfOverRect( const in GeometricContext geometry, const in mat3 brdfMat, const in vec3 rectPoints[4] ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 P = geometry.position;\n\tvec3 T1, T2;\n\tT1 = normalize(V - N * dot( V, N ));\n\tT2 = - cross( N, T1 );\n\tmat3 brdfWrtSurface = brdfMat * transpose( mat3( T1, T2, N ) );\n\tvec3 clippedRect[5];\n\tclippedRect[0] = brdfWrtSurface * ( rectPoints[0] - P );\n\tclippedRect[1] = brdfWrtSurface * ( rectPoints[1] - P );\n\tclippedRect[2] = brdfWrtSurface * ( rectPoints[2] - P );\n\tclippedRect[3] = brdfWrtSurface * ( rectPoints[3] - P );\n\tint n;\n\tclipQuadToHorizon(clippedRect, n);\n\tif ( n == 0 )\n\t\treturn vec3( 0, 0, 0 );\n\tclippedRect[0] = normalize( clippedRect[0] );\n\tclippedRect[1] = normalize( clippedRect[1] );\n\tclippedRect[2] = normalize( clippedRect[2] );\n\tclippedRect[3] = normalize( clippedRect[3] );\n\tclippedRect[4] = normalize( clippedRect[4] );\n\tfloat sum = 0.0;\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[0], clippedRect[1] );\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[1], clippedRect[2] );\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[2], clippedRect[3] );\n\tif (n >= 4)\n\t\tsum += integrateLtcBrdfOverRectEdge( clippedRect[3], clippedRect[4] );\n\tif (n == 5)\n\t\tsum += integrateLtcBrdfOverRectEdge( clippedRect[4], clippedRect[0] );\n\tsum = max( 0.0, sum );\n\tvec3 Lo_i = vec3( sum, sum, sum );\n\treturn Lo_i;\n}\nvec3 Rect_Area_Light_Specular_Reflectance(\n\t\tconst in GeometricContext geometry,\n\t\tconst in vec3 lightPos, const in vec3 lightHalfWidth, const in vec3 lightHalfHeight,\n\t\tconst in float roughness,\n\t\tconst in sampler2D ltcMat, const in sampler2D ltcMag ) {\n\tvec3 rectPoints[4];\n\tinitRectPoints( lightPos, lightHalfWidth, lightHalfHeight, rectPoints );\n\tvec2 uv = ltcTextureCoords( geometry, roughness );\n\tvec4 brdfLtcApproxParams, t;\n\tbrdfLtcApproxParams = texture2D( ltcMat, uv );\n\tt = texture2D( ltcMat, uv );\n\tfloat brdfLtcScalar = texture2D( ltcMag, uv ).a;\n\tmat3 brdfLtcApproxMat = mat3(\n\t\tvec3(   1,   0, t.y ),\n\t\tvec3(   0, t.z,   0 ),\n\t\tvec3( t.w,   0, t.x )\n\t);\n\tvec3 specularReflectance = integrateLtcBrdfOverRect( geometry, brdfLtcApproxMat, rectPoints );\n\tspecularReflectance *= brdfLtcScalar;\n\treturn specularReflectance;\n}\nvec3 Rect_Area_Light_Diffuse_Reflectance(\n\t\tconst in GeometricContext geometry,\n\t\tconst in vec3 lightPos, const in vec3 lightHalfWidth, const in vec3 lightHalfHeight ) {\n\tvec3 rectPoints[4];\n\tinitRectPoints( lightPos, lightHalfWidth, lightHalfHeight, rectPoints );\n\tmat3 diffuseBrdfMat = mat3(1);\n\tvec3 diffuseReflectance = integrateLtcBrdfOverRect( geometry, diffuseBrdfMat, rectPoints );\n\treturn diffuseReflectance;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
            ds = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
            fs = "#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",
            ms = "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
            gs = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
            vs = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
            ys = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
            _s = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
            xs = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
            bs = "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
            ws = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transpose( const in mat3 v ) {\n\tmat3 tmp;\n\ttmp[0] = vec3(v[0].x, v[1].x, v[2].x);\n\ttmp[1] = vec3(v[0].y, v[1].y, v[2].y);\n\ttmp[2] = vec3(v[0].z, v[1].z, v[2].z);\n\treturn tmp;\n}\n",
            Ms = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
            Ts = "#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n",
            Es = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
            Ss = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
            As = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
            Rs = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
            Ls = "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
            Ps = "\nvec4 LinearToLinear( in vec4 value ) {\n  return value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n  return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n  return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n  float maxComponent = max( max( value.r, value.g ), value.b );\n  float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n  return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n  return vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n  float maxRGB = max( value.x, max( value.g, value.b ) );\n  float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n  M            = ceil( M * 255.0 ) / 255.0;\n  return vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n    return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n    float maxRGB = max( value.x, max( value.g, value.b ) );\n    float D      = max( maxRange / maxRGB, 1.0 );\n    D            = min( floor( D ) / 255.0, 1.0 );\n    return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n  vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n  Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n  vec4 vResult;\n  vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n  float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n  vResult.w = fract(Le);\n  vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n  return vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n  float Le = value.z * 255.0 + value.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n  Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n  vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n  return vec4( max(vRGB, 0.0), 1.0 );\n}\n",
            Cs = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
            Is = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
            Os = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
            Ds = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
            Us = "#ifdef USE_FOG\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
            Ns = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
            Fs = "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
            zs = "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
            Bs = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
            Gs = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
            ks = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = saturate( reflectVec.y * 0.5 + 0.5 );\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
            Hs = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
            js = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\n#if NUM_RECT_AREA_LIGHTS > 0\n    void RE_Direct_RectArea_BlinnPhong( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n        vec3 matDiffColor = material.diffuseColor;\n        vec3 matSpecColor = material.specularColor;\n        vec3 lightColor   = rectAreaLight.color;\n        float roughness = BlinnExponentToGGXRoughness( material.specularShininess );\n        vec3 spec = Rect_Area_Light_Specular_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight,\n                roughness,\n                ltcMat, ltcMag );\n        vec3 diff = Rect_Area_Light_Diffuse_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight );\n        reflectedLight.directSpecular += lightColor * matSpecColor * spec / PI2;\n        reflectedLight.directDiffuse  += lightColor * matDiffColor * diff / PI2;\n    }\n#endif\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
            Vs = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
            Ws = "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n    void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n        vec3 matDiffColor = material.diffuseColor;\n        vec3 matSpecColor = material.specularColor;\n        vec3 lightColor   = rectAreaLight.color;\n        float roughness = material.specularRoughness;\n        vec3 spec = Rect_Area_Light_Specular_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight,\n                roughness,\n                ltcMat, ltcMag );\n        vec3 diff = Rect_Area_Light_Diffuse_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight );\n        reflectedLight.directSpecular += lightColor * matSpecColor * spec;\n        reflectedLight.directDiffuse  += lightColor * matDiffColor * diff;\n    }\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
            Xs = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t \tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\t\t\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
            Ys = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",
            qs = "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
            Zs = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
            Js = "#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n",
            Qs = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
            Ks = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
            $s = "#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
            th = "#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n",
            eh = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.r;\n#endif\n",
            ih = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
            nh = "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
            rh = "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
            ah = "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
            oh = "#ifdef DOUBLE_SIDED\n\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#else\n\tfloat flipNormal = 1.0;\n#endif\n",
            sh = "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal ) * flipNormal;\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
            hh = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
            lh = "vec3 packNormalToRGB( const in vec3 normal ) {\n  return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n  return 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n  return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n  return linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n  return (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n  return ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
            ch = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
            uh = "#ifdef USE_SKINNING\n\tvec4 mvPosition = modelViewMatrix * skinned;\n#else\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n",
            ph = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.r;\n#endif\n",
            dh = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
            fh = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n    #if NUM_RECT_AREA_LIGHTS > 0\n    #endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn 1.0;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tfloat dp = ( length( lightToPosition ) - shadowBias ) / 1000.0;\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
            mh = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n    #if NUM_RECT_AREA_LIGHTS > 0\n    #endif\n#endif\n",
            gh = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n    #if NUM_RECT_AREA_LIGHTS > 0\n    #endif\n#endif\n",
            vh = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
            yh = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
            _h = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
            xh = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n#endif\n",
            bh = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
            wh = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
            Mh = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
            Th = "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
            Eh = "#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n  return toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  color = max( vec3( 0.0 ), color - 0.004 );\n  return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
            Sh = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
            Ah = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n",
            Rh = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
            Lh = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
            Ph = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
            Ch = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
            Ih = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#else\n\t\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\t#endif\n#endif\n",
            Oh = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
            Dh = "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
            Uh = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
            Nh = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
            Fh = "uniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n#include <common>\n#include <packing>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tgl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );\n}\n",
            zh = "varying vec4 vWorldPosition;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition;\n}\n",
            Bh = "uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
            Gh = "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
            kh = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            Hh = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
            jh = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            Vh = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n}\n",
            Wh = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            Xh = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n}\n",
            Yh = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            qh = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n}\n",
            Zh = "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            Jh = "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
            Qh = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED  ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#include <premultiplied_alpha_fragment>\n\t#include <encodings_fragment>\n}\n",
            Kh = "#define NORMAL\n#if defined( FLAT_SHADED  ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED  ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
            $h = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            tl = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
            el = "uniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * ( 1.0  - getShadowMask() ) );\n}\n",
            il = "#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
            nl = {
                alphamap_fragment: as,
                alphamap_pars_fragment: os,
                alphatest_fragment: ss,
                aomap_fragment: hs,
                aomap_pars_fragment: ls,
                begin_vertex: cs,
                beginnormal_vertex: us,
                bsdfs: ps,
                bumpmap_pars_fragment: ds,
                clipping_planes_fragment: fs,
                clipping_planes_pars_fragment: ms,
                clipping_planes_pars_vertex: gs,
                clipping_planes_vertex: vs,
                color_fragment: ys,
                color_pars_fragment: _s,
                color_pars_vertex: xs,
                color_vertex: bs,
                common: ws,
                cube_uv_reflection_fragment: Ms,
                defaultnormal_vertex: Ts,
                displacementmap_pars_vertex: Es,
                displacementmap_vertex: Ss,
                emissivemap_fragment: As,
                emissivemap_pars_fragment: Rs,
                encodings_fragment: Ls,
                encodings_pars_fragment: Ps,
                envmap_fragment: Cs,
                envmap_pars_fragment: Is,
                envmap_pars_vertex: Os,
                envmap_vertex: Ds,
                fog_fragment: Us,
                fog_pars_fragment: Ns,
                gradientmap_pars_fragment: Fs,
                lightmap_fragment: zs,
                lightmap_pars_fragment: Bs,
                lights_lambert_vertex: Gs,
                lights_pars: ks,
                lights_phong_fragment: Hs,
                lights_phong_pars_fragment: js,
                lights_physical_fragment: Vs,
                lights_physical_pars_fragment: Ws,
                lights_template: Xs,
                logdepthbuf_fragment: Ys,
                logdepthbuf_pars_fragment: qs,
                logdepthbuf_pars_vertex: Zs,
                logdepthbuf_vertex: Js,
                map_fragment: Qs,
                map_pars_fragment: Ks,
                map_particle_fragment: $s,
                map_particle_pars_fragment: th,
                metalnessmap_fragment: eh,
                metalnessmap_pars_fragment: ih,
                morphnormal_vertex: nh,
                morphtarget_pars_vertex: rh,
                morphtarget_vertex: ah,
                normal_flip: oh,
                normal_fragment: sh,
                normalmap_pars_fragment: hh,
                packing: lh,
                premultiplied_alpha_fragment: ch,
                project_vertex: uh,
                roughnessmap_fragment: ph,
                roughnessmap_pars_fragment: dh,
                shadowmap_pars_fragment: fh,
                shadowmap_pars_vertex: mh,
                shadowmap_vertex: gh,
                shadowmask_pars_fragment: vh,
                skinbase_vertex: yh,
                skinning_pars_vertex: _h,
                skinning_vertex: xh,
                skinnormal_vertex: bh,
                specularmap_fragment: wh,
                specularmap_pars_fragment: Mh,
                tonemapping_fragment: Th,
                tonemapping_pars_fragment: Eh,
                uv_pars_fragment: Sh,
                uv_pars_vertex: Ah,
                uv_vertex: Rh,
                uv2_pars_fragment: Lh,
                uv2_pars_vertex: Ph,
                uv2_vertex: Ch,
                worldpos_vertex: Ih,
                cube_frag: Oh,
                cube_vert: Dh,
                depth_frag: Uh,
                depth_vert: Nh,
                distanceRGBA_frag: Fh,
                distanceRGBA_vert: zh,
                equirect_frag: Bh,
                equirect_vert: Gh,
                linedashed_frag: kh,
                linedashed_vert: Hh,
                meshbasic_frag: jh,
                meshbasic_vert: Vh,
                meshlambert_frag: Wh,
                meshlambert_vert: Xh,
                meshphong_frag: Yh,
                meshphong_vert: qh,
                meshphysical_frag: Zh,
                meshphysical_vert: Jh,
                normal_frag: Qh,
                normal_vert: Kh,
                points_frag: $h,
                points_vert: tl,
                shadow_frag: el,
                shadow_vert: il
            };
        W.prototype = { constructor: W, isColor: !0, r: 1, g: 1, b: 1, set: function(t) {
                return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this }, setScalar: function(t) {
                return this.r = t, this.g = t, this.b = t, this }, setHex: function(t) {
                return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this }, setRGB: function(t, e, i) {
                return this.r = t, this.g = e, this.b = i, this }, setHSL: function() {
                function t(t, e, i) {
                    return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - i) : t }
                return function(e, i, n) {
                    if (e = Qo.euclideanModulo(e, 1), i = Qo.clamp(i, 0, 1), n = Qo.clamp(n, 0, 1), 0 === i) this.r = this.g = this.b = n;
                    else {
                        var r = n <= .5 ? n * (1 + i) : n + i - n * i,
                            a = 2 * n - r;
                        this.r = t(a, r, e + 1 / 3), this.g = t(a, r, e), this.b = t(a, r, e - 1 / 3) }
                    return this } }(), setStyle: function(t) {
                function e(e) { void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.") }
                var i;
                if (i = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)) {
                    var n, r = i[1],
                        a = i[2];
                    switch (r) {
                        case "rgb":
                        case "rgba":
                            if (n = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(n[1], 10)) / 255, this.g = Math.min(255, parseInt(n[2], 10)) / 255, this.b = Math.min(255, parseInt(n[3], 10)) / 255, e(n[5]), this;
                            if (n = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(n[1], 10)) / 100, this.g = Math.min(100, parseInt(n[2], 10)) / 100, this.b = Math.min(100, parseInt(n[3], 10)) / 100, e(n[5]), this;
                            break;
                        case "hsl":
                        case "hsla":
                            if (n = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) {
                                var o = parseFloat(n[1]) / 360,
                                    s = parseInt(n[2], 10) / 100,
                                    h = parseInt(n[3], 10) / 100;
                                return e(n[5]), this.setHSL(o, s, h) } } } else if (i = /^\#([A-Fa-f0-9]+)$/.exec(t)) {
                    var l = i[1],
                        c = l.length;
                    if (3 === c) return this.r = parseInt(l.charAt(0) + l.charAt(0), 16) / 255, this.g = parseInt(l.charAt(1) + l.charAt(1), 16) / 255, this.b = parseInt(l.charAt(2) + l.charAt(2), 16) / 255, this;
                    if (6 === c) return this.r = parseInt(l.charAt(0) + l.charAt(1), 16) / 255, this.g = parseInt(l.charAt(2) + l.charAt(3), 16) / 255, this.b = parseInt(l.charAt(4) + l.charAt(5), 16) / 255, this }
                if (t && t.length > 0) {
                    var l = rl[t];
                    void 0 !== l ? this.setHex(l) : console.warn("THREE.Color: Unknown color " + t) }
                return this }, clone: function() {
                return new this.constructor(this.r, this.g, this.b) }, copy: function(t) {
                return this.r = t.r, this.g = t.g, this.b = t.b, this }, copyGammaToLinear: function(t, e) {
                return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this }, copyLinearToGamma: function(t, e) { void 0 === e && (e = 2);
                var i = e > 0 ? 1 / e : 1;
                return this.r = Math.pow(t.r, i), this.g = Math.pow(t.g, i), this.b = Math.pow(t.b, i), this }, convertGammaToLinear: function() {
                var t = this.r,
                    e = this.g,
                    i = this.b;
                return this.r = t * t, this.g = e * e, this.b = i * i, this }, convertLinearToGamma: function() {
                return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this }, getHex: function() {
                return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0 }, getHexString: function() {
                return ("000000" + this.getHex().toString(16)).slice(-6) }, getHSL: function(t) {
                var e, i, n = t || { h: 0, s: 0, l: 0 },
                    r = this.r,
                    a = this.g,
                    o = this.b,
                    s = Math.max(r, a, o),
                    h = Math.min(r, a, o),
                    l = (h + s) / 2;
                if (h === s) e = 0, i = 0;
                else {
                    var c = s - h;
                    switch (i = l <= .5 ? c / (s + h) : c / (2 - s - h), s) {
                        case r:
                            e = (a - o) / c + (a < o ? 6 : 0);
                            break;
                        case a:
                            e = (o - r) / c + 2;
                            break;
                        case o:
                            e = (r - a) / c + 4 }
                    e /= 6 }
                return n.h = e, n.s = i, n.l = l, n }, getStyle: function() {
                return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")" }, offsetHSL: function(t, e, i) {
                var n = this.getHSL();
                return n.h += t, n.s += e, n.l += i, this.setHSL(n.h, n.s, n.l), this }, add: function(t) {
                return this.r += t.r, this.g += t.g, this.b += t.b, this }, addColors: function(t, e) {
                return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this }, addScalar: function(t) {
                return this.r += t, this.g += t, this.b += t, this }, sub: function(t) {
                return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this }, multiply: function(t) {
                return this.r *= t.r, this.g *= t.g, this.b *= t.b, this }, multiplyScalar: function(t) {
                return this.r *= t, this.g *= t, this.b *= t, this }, lerp: function(t, e) {
                return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this }, equals: function(t) {
                return t.r === this.r && t.g === this.g && t.b === this.b }, fromArray: function(t, e) {
                return void 0 === e && (e = 0), this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this }, toArray: function(t, e) {
                return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t }, toJSON: function() {
                return this.getHex() } };
        var rl = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
        X.prototype = Object.create(n.prototype), X.prototype.constructor = X, X.prototype.isDataTexture = !0;
        var al = { common: { diffuse: { value: new W(15658734) }, opacity: { value: 1 }, map: { value: null }, offsetRepeat: { value: new r(0, 0, 1, 1) }, specularMap: { value: null }, alphaMap: { value: null }, envMap: { value: null }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, refractionRatio: { value: .98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } }, emissivemap: { emissiveMap: { value: null } }, bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalScale: { value: new i(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, roughnessmap: { roughnessMap: { value: null } }, metalnessmap: { metalnessMap: { value: null } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new W(16777215) } }, lights: { ambientLightColor: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {}, shadow: {}, shadowBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {}, shadow: {}, shadowBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotShadowMap: { value: [] }, spotShadowMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {}, shadow: {}, shadowBias: {}, shadowRadius: {}, shadowMapSize: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } } }, points: { diffuse: { value: new W(15658734) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, offsetRepeat: { value: new r(0, 0, 1, 1) } } },
            ol = { basic: { uniforms: rs.merge([al.common, al.aomap, al.lightmap, al.fog]), vertexShader: nl.meshbasic_vert, fragmentShader: nl.meshbasic_frag }, lambert: { uniforms: rs.merge([al.common, al.aomap, al.lightmap, al.emissivemap, al.fog, al.lights, { emissive: { value: new W(0) } }]), vertexShader: nl.meshlambert_vert, fragmentShader: nl.meshlambert_frag }, phong: { uniforms: rs.merge([al.common, al.aomap, al.lightmap, al.emissivemap, al.bumpmap, al.normalmap, al.displacementmap, al.gradientmap, al.fog, al.lights, { emissive: { value: new W(0) }, specular: { value: new W(1118481) }, shininess: { value: 30 } }]), vertexShader: nl.meshphong_vert, fragmentShader: nl.meshphong_frag }, standard: { uniforms: rs.merge([al.common, al.aomap, al.lightmap, al.emissivemap, al.bumpmap, al.normalmap, al.displacementmap, al.roughnessmap, al.metalnessmap, al.fog, al.lights, { emissive: { value: new W(0) }, roughness: { value: .5 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: nl.meshphysical_vert, fragmentShader: nl.meshphysical_frag }, points: { uniforms: rs.merge([al.points, al.fog]), vertexShader: nl.points_vert, fragmentShader: nl.points_frag }, dashed: { uniforms: rs.merge([al.common, al.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: nl.linedashed_vert, fragmentShader: nl.linedashed_frag }, depth: { uniforms: rs.merge([al.common, al.displacementmap]), vertexShader: nl.depth_vert, fragmentShader: nl.depth_frag }, normal: { uniforms: rs.merge([al.common, al.bumpmap, al.normalmap, al.displacementmap, { opacity: { value: 1 } }]), vertexShader: nl.normal_vert, fragmentShader: nl.normal_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: nl.cube_vert, fragmentShader: nl.cube_frag }, equirect: { uniforms: { tEquirect: { value: null }, tFlip: { value: -1 } }, vertexShader: nl.equirect_vert, fragmentShader: nl.equirect_frag }, distanceRGBA: { uniforms: { lightPos: { value: new h } }, vertexShader: nl.distanceRGBA_vert, fragmentShader: nl.distanceRGBA_frag } };
        ol.physical = { uniforms: rs.merge([ol.standard.uniforms, { clearCoat: { value: 0 }, clearCoatRoughness: { value: 0 } }]), vertexShader: nl.meshphysical_vert, fragmentShader: nl.meshphysical_frag }, Y.prototype = { constructor: Y, set: function(t, e) {
                return this.min.copy(t), this.max.copy(e), this }, setFromPoints: function(t) { this.makeEmpty();
                for (var e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
                return this }, setFromCenterAndSize: function() {
                var t = new i;
                return function(e, i) {
                    var n = t.copy(i).multiplyScalar(.5);
                    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this } }(), clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.min.copy(t.min), this.max.copy(t.max), this }, makeEmpty: function() {
                return this.min.x = this.min.y = +(1 / 0), this.max.x = this.max.y = -(1 / 0), this }, isEmpty: function() {
                return this.max.x < this.min.x || this.max.y < this.min.y }, getCenter: function(t) {
                var e = t || new i;
                return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) }, getSize: function(t) {
                var e = t || new i;
                return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min) }, expandByPoint: function(t) {
                return this.min.min(t), this.max.max(t), this }, expandByVector: function(t) {
                return this.min.sub(t), this.max.add(t), this }, expandByScalar: function(t) {
                return this.min.addScalar(-t), this.max.addScalar(t), this }, containsPoint: function(t) {
                return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y) }, containsBox: function(t) {
                return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y }, getParameter: function(t, e) {
                var n = e || new i;
                return n.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y)) }, intersectsBox: function(t) {
                return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y) }, clampPoint: function(t, e) {
                var n = e || new i;
                return n.copy(t).clamp(this.min, this.max) }, distanceToPoint: function() {
                var t = new i;
                return function(e) {
                    var i = t.copy(e).clamp(this.min, this.max);
                    return i.sub(e).length() } }(), intersect: function(t) {
                return this.min.max(t.min), this.max.min(t.max), this }, union: function(t) {
                return this.min.min(t.min), this.max.max(t.max), this }, translate: function(t) {
                return this.min.add(t), this.max.add(t), this }, equals: function(t) {
                return t.min.equals(this.min) && t.max.equals(this.max) } };
        var sl = 0;
        J.prototype = { constructor: J, isMaterial: !0, get needsUpdate() {
                return this._needsUpdate }, set needsUpdate(t) { t === !0 && this.update(), this._needsUpdate = t }, setValues: function(t) {
                if (void 0 !== t)
                    for (var e in t) {
                        var i = t[e];
                        if (void 0 !== i) {
                            var n = this[e];
                            void 0 !== n ? n && n.isColor ? n.set(i) : n && n.isVector3 && i && i.isVector3 ? n.copy(i) : "overdraw" === e ? this[e] = Number(i) : this[e] = i : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.") } else console.warn("THREE.Material: '" + e + "' parameter is undefined.") } }, toJSON: function(t) {
                function e(t) {
                    var e = [];
                    for (var i in t) {
                        var n = t[i];
                        delete n.metadata, e.push(n) }
                    return e }
                var i = void 0 === t;
                i && (t = { textures: {}, images: {} });
                var n = { metadata: { version: 4.4, type: "Material", generator: "Material.toJSON" } };
                if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearCoat && (n.clearCoat = this.clearCoat), void 0 !== this.clearCoatRoughness && (n.clearCoatRoughness = this.clearCoatRoughness), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, n.reflectivity = this.reflectivity), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.size && (n.size = this.size), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Zr && (n.blending = this.blending), this.shading !== Vr && (n.shading = this.shading), this.side !== Gr && (n.side = this.side), this.vertexColors !== Wr && (n.vertexColors = this.vertexColors), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = this.premultipliedAlpha), this.wireframe === !0 && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), n.skinning = this.skinning, n.morphTargets = this.morphTargets, i) {
                    var r = e(t.textures),
                        a = e(t.images);
                    r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a) }
                return n }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) { this.name = t.name, this.fog = t.fog, this.lights = t.lights, this.blending = t.blending, this.side = t.side, this.shading = t.shading, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.alphaTest = t.alphaTest, this.premultipliedAlpha = t.premultipliedAlpha, this.overdraw = t.overdraw, this.visible = t.visible, this.clipShadows = t.clipShadows, this.clipIntersection = t.clipIntersection;
                var e = t.clippingPlanes,
                    i = null;
                if (null !== e) {
                    var n = e.length;
                    i = new Array(n);
                    for (var r = 0; r !== n; ++r) i[r] = e[r].clone() }
                return this.clippingPlanes = i, this }, update: function() { this.dispatchEvent({ type: "update" }) }, dispose: function() { this.dispatchEvent({ type: "dispose" }) } }, Object.assign(J.prototype, e.prototype), Q.prototype = Object.create(J.prototype), Q.prototype.constructor = Q, Q.prototype.isShaderMaterial = !0, Q.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = rs.clone(t.uniforms), this.defines = t.defines, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, this.clipping = t.clipping, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.extensions = t.extensions, this }, Q.prototype.toJSON = function(t) {
            var e = J.prototype.toJSON.call(this, t);
            return e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e }, K.prototype = Object.create(J.prototype), K.prototype.constructor = K, K.prototype.isMeshDepthMaterial = !0, K.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.depthPacking = t.depthPacking, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this }, $.prototype = { constructor: $, isBox3: !0, set: function(t, e) {
                return this.min.copy(t), this.max.copy(e), this }, setFromArray: function(t) {
                for (var e = +(1 / 0), i = +(1 / 0), n = +(1 / 0), r = -(1 / 0), a = -(1 / 0), o = -(1 / 0), s = 0, h = t.length; s < h; s += 3) {
                    var l = t[s],
                        c = t[s + 1],
                        u = t[s + 2];
                    l < e && (e = l), c < i && (i = c), u < n && (n = u), l > r && (r = l), c > a && (a = c), u > o && (o = u) }
                this.min.set(e, i, n), this.max.set(r, a, o) }, setFromBufferAttribute: function(t) {
                for (var e = +(1 / 0), i = +(1 / 0), n = +(1 / 0), r = -(1 / 0), a = -(1 / 0), o = -(1 / 0), s = 0, h = t.count; s < h; s++) {
                    var l = t.getX(s),
                        c = t.getY(s),
                        u = t.getZ(s);
                    l < e && (e = l), c < i && (i = c), u < n && (n = u), l > r && (r = l), c > a && (a = c), u > o && (o = u) }
                this.min.set(e, i, n), this.max.set(r, a, o) }, setFromPoints: function(t) { this.makeEmpty();
                for (var e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
                return this }, setFromCenterAndSize: function() {
                var t = new h;
                return function(e, i) {
                    var n = t.copy(i).multiplyScalar(.5);
                    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this } }(), setFromObject: function() {
                var t = new h;
                return function(e) {
                    var i = this;
                    return e.updateMatrixWorld(!0), this.makeEmpty(), e.traverse(function(e) {
                        var n, r, a = e.geometry;
                        if (void 0 !== a)
                            if (a.isGeometry) {
                                var o = a.vertices;
                                for (n = 0, r = o.length; n < r; n++) t.copy(o[n]), t.applyMatrix4(e.matrixWorld), i.expandByPoint(t) } else if (a.isBufferGeometry) {
                            var s = a.attributes.position;
                            if (void 0 !== s)
                                for (n = 0, r = s.count; n < r; n++) t.fromAttribute(s, n).applyMatrix4(e.matrixWorld), i.expandByPoint(t) } }), this } }(), clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.min.copy(t.min), this.max.copy(t.max), this }, makeEmpty: function() {
                return this.min.x = this.min.y = this.min.z = +(1 / 0), this.max.x = this.max.y = this.max.z = -(1 / 0), this }, isEmpty: function() {
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z }, getCenter: function(t) {
                var e = t || new h;
                return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) }, getSize: function(t) {
                var e = t || new h;
                return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min) }, expandByPoint: function(t) {
                return this.min.min(t), this.max.max(t), this }, expandByVector: function(t) {
                return this.min.sub(t), this.max.add(t), this }, expandByScalar: function(t) {
                return this.min.addScalar(-t), this.max.addScalar(t), this }, containsPoint: function(t) {
                return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z) }, containsBox: function(t) {
                return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z }, getParameter: function(t, e) {
                var i = e || new h;
                return i.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z)) }, intersectsBox: function(t) {
                return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z) }, intersectsSphere: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new h), this.clampPoint(e.center, t), t.distanceToSquared(e.center) <= e.radius * e.radius } }(), intersectsPlane: function(t) {
                var e, i;
                return t.normal.x > 0 ? (e = t.normal.x * this.min.x, i = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, i = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, i += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, i += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, i += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, i += t.normal.z * this.min.z), e <= t.constant && i >= t.constant }, clampPoint: function(t, e) {
                var i = e || new h;
                return i.copy(t).clamp(this.min, this.max) }, distanceToPoint: function() {
                var t = new h;
                return function(e) {
                    var i = t.copy(e).clamp(this.min, this.max);
                    return i.sub(e).length() } }(), getBoundingSphere: function() {
                var t = new h;
                return function(e) {
                    var i = e || new tt;
                    return this.getCenter(i.center), i.radius = .5 * this.getSize(t).length(), i } }(), intersect: function(t) {
                return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this }, union: function(t) {
                return this.min.min(t.min), this.max.max(t.max), this }, applyMatrix4: function() {
                var t = [new h, new h, new h, new h, new h, new h, new h, new h];
                return function(e) {
                    return this.isEmpty() ? this : (t[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), t[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), t[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), t[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), t[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), t[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), t[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), t[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(t), this) } }(), translate: function(t) {
                return this.min.add(t), this.max.add(t), this }, equals: function(t) {
                return t.min.equals(this.min) && t.max.equals(this.max) } }, tt.prototype = { constructor: tt, set: function(t, e) {
                return this.center.copy(t), this.radius = e, this }, setFromPoints: function() {
                var t = new $;
                return function(e, i) {
                    var n = this.center;
                    void 0 !== i ? n.copy(i) : t.setFromPoints(e).getCenter(n);
                    for (var r = 0, a = 0, o = e.length; a < o; a++) r = Math.max(r, n.distanceToSquared(e[a]));
                    return this.radius = Math.sqrt(r), this } }(), clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.center.copy(t.center), this.radius = t.radius, this }, empty: function() {
                return this.radius <= 0 }, containsPoint: function(t) {
                return t.distanceToSquared(this.center) <= this.radius * this.radius }, distanceToPoint: function(t) {
                return t.distanceTo(this.center) - this.radius }, intersectsSphere: function(t) {
                var e = this.radius + t.radius;
                return t.center.distanceToSquared(this.center) <= e * e }, intersectsBox: function(t) {
                return t.intersectsSphere(this) }, intersectsPlane: function(t) {
                return Math.abs(this.center.dot(t.normal) - t.constant) <= this.radius }, clampPoint: function(t, e) {
                var i = this.center.distanceToSquared(t),
                    n = e || new h;
                return n.copy(t), i > this.radius * this.radius && (n.sub(this.center).normalize(), n.multiplyScalar(this.radius).add(this.center)), n }, getBoundingBox: function(t) {
                var e = t || new $;
                return e.set(this.center, this.center), e.expandByScalar(this.radius), e }, applyMatrix4: function(t) {
                return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this }, translate: function(t) {
                return this.center.add(t), this }, equals: function(t) {
                return t.center.equals(this.center) && t.radius === this.radius } }, et.prototype = { constructor: et, isMatrix3: !0, set: function(t, e, i, n, r, a, o, s, h) {
                var l = this.elements;
                return l[0] = t, l[1] = n, l[2] = o, l[3] = e, l[4] = r, l[5] = s, l[6] = i, l[7] = a, l[8] = h, this }, identity: function() {
                return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this }, clone: function() {
                return (new this.constructor).fromArray(this.elements) }, copy: function(t) {
                var e = t.elements;
                return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this }, setFromMatrix4: function(t) {
                var e = t.elements;
                return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this }, applyToVector3Array: function() {
                var t;
                return function(e, i, n) { void 0 === t && (t = new h), void 0 === i && (i = 0), void 0 === n && (n = e.length);
                    for (var r = 0, a = i; r < n; r += 3, a += 3) t.fromArray(e, a), t.applyMatrix3(this), t.toArray(e, a);
                    return e } }(), applyToBufferAttribute: function() {
                var t;
                return function(e) { void 0 === t && (t = new h);
                    for (var i = 0, n = e.count; i < n; i++) t.x = e.getX(i), t.y = e.getY(i), t.z = e.getZ(i), t.applyMatrix3(this), e.setXYZ(i, t.x, t.y, t.z);
                    return e } }(), multiplyScalar: function(t) {
                var e = this.elements;
                return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this }, determinant: function() {
                var t = this.elements,
                    e = t[0],
                    i = t[1],
                    n = t[2],
                    r = t[3],
                    a = t[4],
                    o = t[5],
                    s = t[6],
                    h = t[7],
                    l = t[8];
                return e * a * l - e * o * h - i * r * l + i * o * s + n * r * h - n * a * s }, getInverse: function(t, e) { t && t.isMatrix4 && console.error("THREE.Matrix3.getInverse no longer takes a Matrix4 argument.");
                var i = t.elements,
                    n = this.elements,
                    r = i[0],
                    a = i[1],
                    o = i[2],
                    s = i[3],
                    h = i[4],
                    l = i[5],
                    c = i[6],
                    u = i[7],
                    p = i[8],
                    d = p * h - l * u,
                    f = l * c - p * s,
                    m = u * s - h * c,
                    g = r * d + a * f + o * m;
                if (0 === g) {
                    var v = "THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0";
                    if (e === !0) throw new Error(v);
                    return console.warn(v), this.identity() }
                var y = 1 / g;
                return n[0] = d * y, n[1] = (o * u - p * a) * y, n[2] = (l * a - o * h) * y, n[3] = f * y, n[4] = (p * r - o * c) * y, n[5] = (o * s - l * r) * y, n[6] = m * y, n[7] = (a * c - u * r) * y, n[8] = (h * r - a * s) * y, this }, transpose: function() {
                var t, e = this.elements;
                return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this }, getNormalMatrix: function(t) {
                return this.setFromMatrix4(t).getInverse(this).transpose() }, transposeIntoArray: function(t) {
                var e = this.elements;
                return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this }, fromArray: function(t, e) { void 0 === e && (e = 0);
                for (var i = 0; i < 9; i++) this.elements[i] = t[i + e];
                return this }, toArray: function(t, e) { void 0 === t && (t = []), void 0 === e && (e = 0);
                var i = this.elements;
                return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t } }, it.prototype = {
            constructor: it,
            set: function(t, e) {
                return this.normal.copy(t), this.constant = e, this },
            setComponents: function(t, e, i, n) {
                return this.normal.set(t, e, i), this.constant = n, this },
            setFromNormalAndCoplanarPoint: function(t, e) {
                return this.normal.copy(t), this.constant = -e.dot(this.normal), this },
            setFromCoplanarPoints: function() {
                var t = new h,
                    e = new h;
                return function(i, n, r) {
                    var a = t.subVectors(r, n).cross(e.subVectors(i, n)).normalize();
                    return this.setFromNormalAndCoplanarPoint(a, i), this } }(),
            clone: function() {
                return (new this.constructor).copy(this) },
            copy: function(t) {
                return this.normal.copy(t.normal), this.constant = t.constant, this },
            normalize: function() {
                var t = 1 / this.normal.length();
                return this.normal.multiplyScalar(t), this.constant *= t, this },
            negate: function() {
                return this.constant *= -1, this.normal.negate(), this },
            distanceToPoint: function(t) {
                return this.normal.dot(t) + this.constant },
            distanceToSphere: function(t) {
                return this.distanceToPoint(t.center) - t.radius },
            projectPoint: function(t, e) {
                return this.orthoPoint(t, e).sub(t).negate() },
            orthoPoint: function(t, e) {
                var i = this.distanceToPoint(t),
                    n = e || new h;
                return n.copy(this.normal).multiplyScalar(i) },
            intersectLine: function() {
                var t = new h;
                return function(e, i) {
                    var n = i || new h,
                        r = e.delta(t),
                        a = this.normal.dot(r);
                    if (0 !== a) {
                        var o = -(e.start.dot(this.normal) + this.constant) / a;
                        if (!(o < 0 || o > 1)) return n.copy(r).multiplyScalar(o).add(e.start) } else if (0 === this.distanceToPoint(e.start)) return n.copy(e.start) } }(),
            intersectsLine: function(t) {
                var e = this.distanceToPoint(t.start),
                    i = this.distanceToPoint(t.end);
                return e < 0 && i > 0 || i < 0 && e > 0 },
            intersectsBox: function(t) {
                return t.intersectsPlane(this) },
            intersectsSphere: function(t) {
                return t.intersectsPlane(this) },
            coplanarPoint: function(t) {
                var e = t || new h;
                return e.copy(this.normal).multiplyScalar(-this.constant) },
            applyMatrix4: function() {
                var t = new h,
                    e = new et;
                return function(i, n) {
                    var r = this.coplanarPoint(t).applyMatrix4(i),
                        a = n || e.getNormalMatrix(i),
                        o = this.normal.applyMatrix3(a).normalize();
                    return this.constant = -r.dot(o), this
                }
            }(),
            translate: function(t) {
                return this.constant = this.constant - t.dot(this.normal), this },
            equals: function(t) {
                return t.normal.equals(this.normal) && t.constant === this.constant }
        }, nt.prototype = { constructor: nt, set: function(t, e, i, n, r, a) {
                var o = this.planes;
                return o[0].copy(t), o[1].copy(e), o[2].copy(i), o[3].copy(n), o[4].copy(r), o[5].copy(a), this }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                for (var e = this.planes, i = 0; i < 6; i++) e[i].copy(t.planes[i]);
                return this }, setFromMatrix: function(t) {
                var e = this.planes,
                    i = t.elements,
                    n = i[0],
                    r = i[1],
                    a = i[2],
                    o = i[3],
                    s = i[4],
                    h = i[5],
                    l = i[6],
                    c = i[7],
                    u = i[8],
                    p = i[9],
                    d = i[10],
                    f = i[11],
                    m = i[12],
                    g = i[13],
                    v = i[14],
                    y = i[15];
                return e[0].setComponents(o - n, c - s, f - u, y - m).normalize(), e[1].setComponents(o + n, c + s, f + u, y + m).normalize(), e[2].setComponents(o + r, c + h, f + p, y + g).normalize(), e[3].setComponents(o - r, c - h, f - p, y - g).normalize(), e[4].setComponents(o - a, c - l, f - d, y - v).normalize(), e[5].setComponents(o + a, c + l, f + d, y + v).normalize(), this }, intersectsObject: function() {
                var t = new tt;
                return function(e) {
                    var i = e.geometry;
                    return null === i.boundingSphere && i.computeBoundingSphere(), t.copy(i.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(t) } }(), intersectsSprite: function() {
                var t = new tt;
                return function(e) {
                    return t.center.set(0, 0, 0), t.radius = .7071067811865476, t.applyMatrix4(e.matrixWorld), this.intersectsSphere(t) } }(), intersectsSphere: function(t) {
                for (var e = this.planes, i = t.center, n = -t.radius, r = 0; r < 6; r++) {
                    var a = e[r].distanceToPoint(i);
                    if (a < n) return !1 }
                return !0 }, intersectsBox: function() {
                var t = new h,
                    e = new h;
                return function(i) {
                    for (var n = this.planes, r = 0; r < 6; r++) {
                        var a = n[r];
                        t.x = a.normal.x > 0 ? i.min.x : i.max.x, e.x = a.normal.x > 0 ? i.max.x : i.min.x, t.y = a.normal.y > 0 ? i.min.y : i.max.y, e.y = a.normal.y > 0 ? i.max.y : i.min.y, t.z = a.normal.z > 0 ? i.min.z : i.max.z, e.z = a.normal.z > 0 ? i.max.z : i.min.z;
                        var o = a.distanceToPoint(t),
                            s = a.distanceToPoint(e);
                        if (o < 0 && s < 0) return !1 }
                    return !0 } }(), containsPoint: function(t) {
                for (var e = this.planes, i = 0; i < 6; i++)
                    if (e[i].distanceToPoint(t) < 0) return !1;
                return !0 } }, at.prototype = { constructor: at, set: function(t, e) {
                return this.origin.copy(t), this.direction.copy(e), this }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.origin.copy(t.origin), this.direction.copy(t.direction), this }, at: function(t, e) {
                var i = e || new h;
                return i.copy(this.direction).multiplyScalar(t).add(this.origin) }, lookAt: function(t) {
                return this.direction.copy(t).sub(this.origin).normalize(), this }, recast: function() {
                var t = new h;
                return function(e) {
                    return this.origin.copy(this.at(e, t)), this } }(), closestPointToPoint: function(t, e) {
                var i = e || new h;
                i.subVectors(t, this.origin);
                var n = i.dot(this.direction);
                return n < 0 ? i.copy(this.origin) : i.copy(this.direction).multiplyScalar(n).add(this.origin) }, distanceToPoint: function(t) {
                return Math.sqrt(this.distanceSqToPoint(t)) }, distanceSqToPoint: function() {
                var t = new h;
                return function(e) {
                    var i = t.subVectors(e, this.origin).dot(this.direction);
                    return i < 0 ? this.origin.distanceToSquared(e) : (t.copy(this.direction).multiplyScalar(i).add(this.origin), t.distanceToSquared(e)) } }(), distanceSqToSegment: function() {
                var t = new h,
                    e = new h,
                    i = new h;
                return function(n, r, a, o) { t.copy(n).add(r).multiplyScalar(.5), e.copy(r).sub(n).normalize(), i.copy(this.origin).sub(t);
                    var s, h, l, c, u = .5 * n.distanceTo(r),
                        p = -this.direction.dot(e),
                        d = i.dot(this.direction),
                        f = -i.dot(e),
                        m = i.lengthSq(),
                        g = Math.abs(1 - p * p);
                    if (g > 0)
                        if (s = p * f - d, h = p * d - f, c = u * g, s >= 0)
                            if (h >= -c)
                                if (h <= c) {
                                    var v = 1 / g;
                                    s *= v, h *= v, l = s * (s + p * h + 2 * d) + h * (p * s + h + 2 * f) + m } else h = u, s = Math.max(0, -(p * h + d)), l = -s * s + h * (h + 2 * f) + m;
                    else h = -u, s = Math.max(0, -(p * h + d)), l = -s * s + h * (h + 2 * f) + m;
                    else h <= -c ? (s = Math.max(0, -(-p * u + d)), h = s > 0 ? -u : Math.min(Math.max(-u, -f), u), l = -s * s + h * (h + 2 * f) + m) : h <= c ? (s = 0, h = Math.min(Math.max(-u, -f), u), l = h * (h + 2 * f) + m) : (s = Math.max(0, -(p * u + d)), h = s > 0 ? u : Math.min(Math.max(-u, -f), u), l = -s * s + h * (h + 2 * f) + m);
                    else h = p > 0 ? -u : u, s = Math.max(0, -(p * h + d)), l = -s * s + h * (h + 2 * f) + m;
                    return a && a.copy(this.direction).multiplyScalar(s).add(this.origin), o && o.copy(e).multiplyScalar(h).add(t), l } }(), intersectSphere: function() {
                var t = new h;
                return function(e, i) { t.subVectors(e.center, this.origin);
                    var n = t.dot(this.direction),
                        r = t.dot(t) - n * n,
                        a = e.radius * e.radius;
                    if (r > a) return null;
                    var o = Math.sqrt(a - r),
                        s = n - o,
                        h = n + o;
                    return s < 0 && h < 0 ? null : s < 0 ? this.at(h, i) : this.at(s, i) } }(), intersectsSphere: function(t) {
                return this.distanceToPoint(t.center) <= t.radius }, distanceToPlane: function(t) {
                var e = t.normal.dot(this.direction);
                if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
                var i = -(this.origin.dot(t.normal) + t.constant) / e;
                return i >= 0 ? i : null }, intersectPlane: function(t, e) {
                var i = this.distanceToPlane(t);
                return null === i ? null : this.at(i, e) }, intersectsPlane: function(t) {
                var e = t.distanceToPoint(this.origin);
                if (0 === e) return !0;
                var i = t.normal.dot(this.direction);
                return i * e < 0 }, intersectBox: function(t, e) {
                var i, n, r, a, o, s, h = 1 / this.direction.x,
                    l = 1 / this.direction.y,
                    c = 1 / this.direction.z,
                    u = this.origin;
                return h >= 0 ? (i = (t.min.x - u.x) * h, n = (t.max.x - u.x) * h) : (i = (t.max.x - u.x) * h, n = (t.min.x - u.x) * h), l >= 0 ? (r = (t.min.y - u.y) * l, a = (t.max.y - u.y) * l) : (r = (t.max.y - u.y) * l, a = (t.min.y - u.y) * l), i > a || r > n ? null : ((r > i || i !== i) && (i = r), (a < n || n !== n) && (n = a), c >= 0 ? (o = (t.min.z - u.z) * c, s = (t.max.z - u.z) * c) : (o = (t.max.z - u.z) * c, s = (t.min.z - u.z) * c), i > s || o > n ? null : ((o > i || i !== i) && (i = o), (s < n || n !== n) && (n = s), n < 0 ? null : this.at(i >= 0 ? i : n, e))) }, intersectsBox: function() {
                var t = new h;
                return function(e) {
                    return null !== this.intersectBox(e, t) } }(), intersectTriangle: function() {
                var t = new h,
                    e = new h,
                    i = new h,
                    n = new h;
                return function(r, a, o, s, h) { e.subVectors(a, r), i.subVectors(o, r), n.crossVectors(e, i);
                    var l, c = this.direction.dot(n);
                    if (c > 0) {
                        if (s) return null;
                        l = 1 } else {
                        if (!(c < 0)) return null;
                        l = -1, c = -c }
                    t.subVectors(this.origin, r);
                    var u = l * this.direction.dot(i.crossVectors(t, i));
                    if (u < 0) return null;
                    var p = l * this.direction.dot(e.cross(t));
                    if (p < 0) return null;
                    if (u + p > c) return null;
                    var d = -l * t.dot(n);
                    return d < 0 ? null : this.at(d / c, h) } }(), applyMatrix4: function(t) {
                return this.direction.add(this.origin).applyMatrix4(t), this.origin.applyMatrix4(t), this.direction.sub(this.origin), this.direction.normalize(), this }, equals: function(t) {
                return t.origin.equals(this.origin) && t.direction.equals(this.direction) } }, ot.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], ot.DefaultOrder = "XYZ", ot.prototype = { constructor: ot, isEuler: !0, get x() {
                return this._x }, set x(t) { this._x = t, this.onChangeCallback() }, get y() {
                return this._y }, set y(t) { this._y = t, this.onChangeCallback() }, get z() {
                return this._z }, set z(t) { this._z = t, this.onChangeCallback() }, get order() {
                return this._order }, set order(t) { this._order = t, this.onChangeCallback() }, set: function(t, e, i, n) {
                return this._x = t, this._y = e, this._z = i, this._order = n || this._order, this.onChangeCallback(), this }, clone: function() {
                return new this.constructor(this._x, this._y, this._z, this._order) }, copy: function(t) {
                return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), this }, setFromRotationMatrix: function(t, e, i) {
                var n = Qo.clamp,
                    r = t.elements,
                    a = r[0],
                    o = r[4],
                    s = r[8],
                    h = r[1],
                    l = r[5],
                    c = r[9],
                    u = r[2],
                    p = r[6],
                    d = r[10];
                return e = e || this._order, "XYZ" === e ? (this._y = Math.asin(n(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-c, d), this._z = Math.atan2(-o, a)) : (this._x = Math.atan2(p, l), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-n(c, -1, 1)), Math.abs(c) < .99999 ? (this._y = Math.atan2(s, d), this._z = Math.atan2(h, l)) : (this._y = Math.atan2(-u, a), this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(n(p, -1, 1)), Math.abs(p) < .99999 ? (this._y = Math.atan2(-u, d), this._z = Math.atan2(-o, l)) : (this._y = 0, this._z = Math.atan2(h, a))) : "ZYX" === e ? (this._y = Math.asin(-n(u, -1, 1)), Math.abs(u) < .99999 ? (this._x = Math.atan2(p, d), this._z = Math.atan2(h, a)) : (this._x = 0, this._z = Math.atan2(-o, l))) : "YZX" === e ? (this._z = Math.asin(n(h, -1, 1)), Math.abs(h) < .99999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-u, a)) : (this._x = 0, this._y = Math.atan2(s, d))) : "XZY" === e ? (this._z = Math.asin(-n(o, -1, 1)), Math.abs(o) < .99999 ? (this._x = Math.atan2(p, l), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-c, d), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e), this._order = e, i !== !1 && this.onChangeCallback(), this }, setFromQuaternion: function() {
                var t;
                return function(e, i, n) {
                    return void 0 === t && (t = new l), t.makeRotationFromQuaternion(e), this.setFromRotationMatrix(t, i, n) } }(), setFromVector3: function(t, e) {
                return this.set(t.x, t.y, t.z, e || this._order) }, reorder: function() {
                var t = new s;
                return function(e) {
                    return t.setFromEuler(this), this.setFromQuaternion(t, e) } }(), equals: function(t) {
                return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order }, fromArray: function(t) {
                return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this.onChangeCallback(), this }, toArray: function(t, e) {
                return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t }, toVector3: function(t) {
                return t ? t.set(this._x, this._y, this._z) : new h(this._x, this._y, this._z) }, onChange: function(t) {
                return this.onChangeCallback = t, this }, onChangeCallback: function() {} }, st.prototype = { constructor: st, set: function(t) { this.mask = 1 << t }, enable: function(t) { this.mask |= 1 << t }, toggle: function(t) { this.mask ^= 1 << t }, disable: function(t) { this.mask &= ~(1 << t) }, test: function(t) {
                return 0 !== (this.mask & t.mask) } };
        var hl = 0;
        ht.DefaultUp = new h(0, 1, 0), ht.DefaultMatrixAutoUpdate = !0, Object.assign(ht.prototype, e.prototype, { isObject3D: !0, applyMatrix: function(t) { this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale) }, setRotationFromAxisAngle: function(t, e) { this.quaternion.setFromAxisAngle(t, e) }, setRotationFromEuler: function(t) { this.quaternion.setFromEuler(t, !0) }, setRotationFromMatrix: function(t) { this.quaternion.setFromRotationMatrix(t) }, setRotationFromQuaternion: function(t) { this.quaternion.copy(t) }, rotateOnAxis: function() {
                var t = new s;
                return function(e, i) {
                    return t.setFromAxisAngle(e, i), this.quaternion.multiply(t), this } }(), rotateX: function() {
                var t = new h(1, 0, 0);
                return function(e) {
                    return this.rotateOnAxis(t, e) } }(), rotateY: function() {
                var t = new h(0, 1, 0);
                return function(e) {
                    return this.rotateOnAxis(t, e) } }(), rotateZ: function() {
                var t = new h(0, 0, 1);
                return function(e) {
                    return this.rotateOnAxis(t, e) } }(), translateOnAxis: function() {
                var t = new h;
                return function(e, i) {
                    return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(i)), this } }(), translateX: function() {
                var t = new h(1, 0, 0);
                return function(e) {
                    return this.translateOnAxis(t, e) } }(), translateY: function() {
                var t = new h(0, 1, 0);
                return function(e) {
                    return this.translateOnAxis(t, e) } }(), translateZ: function() {
                var t = new h(0, 0, 1);
                return function(e) {
                    return this.translateOnAxis(t, e) } }(), localToWorld: function(t) {
                return t.applyMatrix4(this.matrixWorld) }, worldToLocal: function() {
                var t = new l;
                return function(e) {
                    return e.applyMatrix4(t.getInverse(this.matrixWorld)) } }(), lookAt: function() {
                var t = new l;
                return function(e) { t.lookAt(e, this.position, this.up), this.quaternion.setFromRotationMatrix(t) } }(), add: function(t) {
                if (arguments.length > 1) {
                    for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
                    return this }
                return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, t.dispatchEvent({ type: "added" }), this.children.push(t)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this) }, remove: function(t) {
                if (arguments.length > 1)
                    for (var e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                var i = this.children.indexOf(t);
                i !== -1 && (t.parent = null, t.dispatchEvent({ type: "removed" }), this.children.splice(i, 1)) }, getObjectById: function(t) {
                return this.getObjectByProperty("id", t) }, getObjectByName: function(t) {
                return this.getObjectByProperty("name", t) }, getObjectByProperty: function(t, e) {
                if (this[t] === e) return this;
                for (var i = 0, n = this.children.length; i < n; i++) {
                    var r = this.children[i],
                        a = r.getObjectByProperty(t, e);
                    if (void 0 !== a) return a } }, getWorldPosition: function(t) {
                var e = t || new h;
                return this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld) }, getWorldQuaternion: function() {
                var t = new h,
                    e = new h;
                return function(i) {
                    var n = i || new s;
                    return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, n, e), n } }(), getWorldRotation: function() {
                var t = new s;
                return function(e) {
                    var i = e || new ot;
                    return this.getWorldQuaternion(t), i.setFromQuaternion(t, this.rotation.order, !1) } }(), getWorldScale: function() {
                var t = new h,
                    e = new s;
                return function(i) {
                    var n = i || new h;
                    return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, e, n), n } }(), getWorldDirection: function() {
                var t = new s;
                return function(e) {
                    var i = e || new h;
                    return this.getWorldQuaternion(t), i.set(0, 0, 1).applyQuaternion(t) } }(), raycast: function() {}, traverse: function(t) { t(this);
                for (var e = this.children, i = 0, n = e.length; i < n; i++) e[i].traverse(t) }, traverseVisible: function(t) {
                if (this.visible !== !1) { t(this);
                    for (var e = this.children, i = 0, n = e.length; i < n; i++) e[i].traverseVisible(t) } }, traverseAncestors: function(t) {
                var e = this.parent;
                null !== e && (t(e), e.traverseAncestors(t)) }, updateMatrix: function() { this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0 }, updateMatrixWorld: function(t) { this.matrixAutoUpdate === !0 && this.updateMatrix(), this.matrixWorldNeedsUpdate !== !0 && t !== !0 || (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
                for (var e = this.children, i = 0, n = e.length; i < n; i++) e[i].updateMatrixWorld(t) }, toJSON: function(t) {
                function e(t) {
                    var e = [];
                    for (var i in t) {
                        var n = t[i];
                        delete n.metadata, e.push(n) }
                    return e }
                var i = void 0 === t || "" === t,
                    n = {};
                i && (t = { geometries: {}, materials: {}, textures: {}, images: {} }, n.metadata = { version: 4.4, type: "Object", generator: "Object3D.toJSON" });
                var r = {};
                if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), "{}" !== JSON.stringify(this.userData) && (r.userData = this.userData), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), r.matrix = this.matrix.toArray(), void 0 !== this.geometry && (void 0 === t.geometries[this.geometry.uuid] && (t.geometries[this.geometry.uuid] = this.geometry.toJSON(t)), r.geometry = this.geometry.uuid), void 0 !== this.material && (void 0 === t.materials[this.material.uuid] && (t.materials[this.material.uuid] = this.material.toJSON(t)), r.material = this.material.uuid), this.children.length > 0) { r.children = [];
                    for (var a = 0; a < this.children.length; a++) r.children.push(this.children[a].toJSON(t).object) }
                if (i) {
                    var o = e(t.geometries),
                        s = e(t.materials),
                        h = e(t.textures),
                        l = e(t.images);
                    o.length > 0 && (n.geometries = o), s.length > 0 && (n.materials = s), h.length > 0 && (n.textures = h), l.length > 0 && (n.images = l) }
                return n.object = r, n }, clone: function(t) {
                return (new this.constructor).copy(this, t) }, copy: function(t, e) {
                if (void 0 === e && (e = !0), this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)
                    for (var i = 0; i < t.children.length; i++) {
                        var n = t.children[i];
                        this.add(n.clone()) }
                return this } }), lt.prototype = { constructor: lt, set: function(t, e) {
                return this.start.copy(t), this.end.copy(e), this }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.start.copy(t.start), this.end.copy(t.end), this }, getCenter: function(t) {
                var e = t || new h;
                return e.addVectors(this.start, this.end).multiplyScalar(.5) }, delta: function(t) {
                var e = t || new h;
                return e.subVectors(this.end, this.start) }, distanceSq: function() {
                return this.start.distanceToSquared(this.end) }, distance: function() {
                return this.start.distanceTo(this.end) }, at: function(t, e) {
                var i = e || new h;
                return this.delta(i).multiplyScalar(t).add(this.start) }, closestPointToPointParameter: function() {
                var t = new h,
                    e = new h;
                return function(i, n) { t.subVectors(i, this.start), e.subVectors(this.end, this.start);
                    var r = e.dot(e),
                        a = e.dot(t),
                        o = a / r;
                    return n && (o = Qo.clamp(o, 0, 1)), o } }(), closestPointToPoint: function(t, e, i) {
                var n = this.closestPointToPointParameter(t, e),
                    r = i || new h;
                return this.delta(r).multiplyScalar(n).add(this.start) }, applyMatrix4: function(t) {
                return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this }, equals: function(t) {
                return t.start.equals(this.start) && t.end.equals(this.end) } }, ct.normal = function() {
            var t = new h;
            return function(e, i, n, r) {
                var a = r || new h;
                a.subVectors(n, i), t.subVectors(e, i), a.cross(t);
                var o = a.lengthSq();
                return o > 0 ? a.multiplyScalar(1 / Math.sqrt(o)) : a.set(0, 0, 0) } }(), ct.barycoordFromPoint = function() {
            var t = new h,
                e = new h,
                i = new h;
            return function(n, r, a, o, s) { t.subVectors(o, r), e.subVectors(a, r), i.subVectors(n, r);
                var l = t.dot(t),
                    c = t.dot(e),
                    u = t.dot(i),
                    p = e.dot(e),
                    d = e.dot(i),
                    f = l * p - c * c,
                    m = s || new h;
                if (0 === f) return m.set(-2, -1, -1);
                var g = 1 / f,
                    v = (p * u - c * d) * g,
                    y = (l * d - c * u) * g;
                return m.set(1 - v - y, y, v) } }(), ct.containsPoint = function() {
            var t = new h;
            return function(e, i, n, r) {
                var a = ct.barycoordFromPoint(e, i, n, r, t);
                return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1 } }(), ct.prototype = { constructor: ct, set: function(t, e, i) {
                return this.a.copy(t), this.b.copy(e), this.c.copy(i), this }, setFromPointsAndIndices: function(t, e, i, n) {
                return this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[n]), this }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this }, area: function() {
                var t = new h,
                    e = new h;
                return function() {
                    return t.subVectors(this.c, this.b), e.subVectors(this.a, this.b), .5 * t.cross(e).length() } }(), midpoint: function(t) {
                var e = t || new h;
                return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3) }, normal: function(t) {
                return ct.normal(this.a, this.b, this.c, t) }, plane: function(t) {
                var e = t || new it;
                return e.setFromCoplanarPoints(this.a, this.b, this.c) }, barycoordFromPoint: function(t, e) {
                return ct.barycoordFromPoint(t, this.a, this.b, this.c, e) }, containsPoint: function(t) {
                return ct.containsPoint(t, this.a, this.b, this.c) }, closestPointToPoint: function() {
                var t, e, i, n;
                return function(r, a) { void 0 === t && (t = new it, e = [new lt, new lt, new lt], i = new h, n = new h);
                    var o = a || new h,
                        s = 1 / 0;
                    if (t.setFromCoplanarPoints(this.a, this.b, this.c), t.projectPoint(r, i), this.containsPoint(i) === !0) o.copy(i);
                    else { e[0].set(this.a, this.b), e[1].set(this.b, this.c), e[2].set(this.c, this.a);
                        for (var l = 0; l < e.length; l++) { e[l].closestPointToPoint(i, !0, n);
                            var c = i.distanceToSquared(n);
                            c < s && (s = c, o.copy(n)) } }
                    return o } }(), equals: function(t) {
                return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c) } }, ut.prototype = { constructor: ut, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) { this.a = t.a, this.b = t.b, this.c = t.c, this.normal.copy(t.normal), this.color.copy(t.color), this.materialIndex = t.materialIndex;
                for (var e = 0, i = t.vertexNormals.length; e < i; e++) this.vertexNormals[e] = t.vertexNormals[e].clone();
                for (var e = 0, i = t.vertexColors.length; e < i; e++) this.vertexColors[e] = t.vertexColors[e].clone();
                return this } }, pt.prototype = Object.create(J.prototype), pt.prototype.constructor = pt, pt.prototype.isMeshBasicMaterial = !0, pt.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this }, dt.prototype = { constructor: dt, isBufferAttribute: !0, set needsUpdate(t) { t === !0 && this.version++ }, setArray: function(t) {
                if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                this.count = void 0 !== t ? t.length / this.itemSize : 0, this.array = t }, setDynamic: function(t) {
                return this.dynamic = t, this }, copy: function(t) {
                return this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.dynamic = t.dynamic, this }, copyAt: function(t, e, i) { t *= this.itemSize, i *= e.itemSize;
                for (var n = 0, r = this.itemSize; n < r; n++) this.array[t + n] = e.array[i + n];
                return this }, copyArray: function(t) {
                return this.array.set(t), this }, copyColorsArray: function(t) {
                for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                    var a = t[n];
                    void 0 === a && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", n), a = new W), e[i++] = a.r, e[i++] = a.g, e[i++] = a.b }
                return this }, copyIndicesArray: function(t) {
                for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                    var a = t[n];
                    e[i++] = a.a, e[i++] = a.b, e[i++] = a.c }
                return this }, copyVector2sArray: function(t) {
                for (var e = this.array, n = 0, r = 0, a = t.length; r < a; r++) {
                    var o = t[r];
                    void 0 === o && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", r), o = new i), e[n++] = o.x, e[n++] = o.y }
                return this }, copyVector3sArray: function(t) {
                for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                    var a = t[n];
                    void 0 === a && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", n), a = new h), e[i++] = a.x, e[i++] = a.y, e[i++] = a.z }
                return this }, copyVector4sArray: function(t) {
                for (var e = this.array, i = 0, n = 0, a = t.length; n < a; n++) {
                    var o = t[n];
                    void 0 === o && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", n), o = new r), e[i++] = o.x, e[i++] = o.y, e[i++] = o.z, e[i++] = o.w }
                return this }, set: function(t, e) {
                return void 0 === e && (e = 0), this.array.set(t, e), this }, getX: function(t) {
                return this.array[t * this.itemSize] }, setX: function(t, e) {
                return this.array[t * this.itemSize] = e, this }, getY: function(t) {
                return this.array[t * this.itemSize + 1] }, setY: function(t, e) {
                return this.array[t * this.itemSize + 1] = e, this }, getZ: function(t) {
                return this.array[t * this.itemSize + 2] }, setZ: function(t, e) {
                return this.array[t * this.itemSize + 2] = e, this }, getW: function(t) {
                return this.array[t * this.itemSize + 3] }, setW: function(t, e) {
                return this.array[t * this.itemSize + 3] = e, this }, setXY: function(t, e, i) {
                return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = i, this }, setXYZ: function(t, e, i, n) {
                return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = i, this.array[t + 2] = n, this }, setXYZW: function(t, e, i, n, r) {
                return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = i, this.array[t + 2] = n, this.array[t + 3] = r, this }, onUpload: function(t) {
                return this.onUploadCallback = t, this }, clone: function() {
                return (new this.constructor).copy(this) } }, ft.prototype = Object.create(dt.prototype), ft.prototype.constructor = ft, mt.prototype = Object.create(dt.prototype), mt.prototype.constructor = mt, gt.prototype = Object.create(dt.prototype), gt.prototype.constructor = gt, vt.prototype = Object.create(dt.prototype), vt.prototype.constructor = vt, yt.prototype = Object.create(dt.prototype), yt.prototype.constructor = yt, _t.prototype = Object.create(dt.prototype), _t.prototype.constructor = _t, xt.prototype = Object.create(dt.prototype), xt.prototype.constructor = xt, bt.prototype = Object.create(dt.prototype), bt.prototype.constructor = bt, wt.prototype = Object.create(dt.prototype), wt.prototype.constructor = wt, Object.assign(Mt.prototype, { computeGroups: function(t) {
                for (var e, i = [], n = void 0, r = t.faces, a = 0; a < r.length; a++) {
                    var o = r[a];
                    o.materialIndex !== n && (n = o.materialIndex, void 0 !== e && (e.count = 3 * a - e.start, i.push(e)), e = { start: 3 * a, materialIndex: n }) }
                void 0 !== e && (e.count = 3 * a - e.start, i.push(e)), this.groups = i }, fromGeometry: function(t) {
                var e, n = t.faces,
                    r = t.vertices,
                    a = t.faceVertexUvs,
                    o = a[0] && a[0].length > 0,
                    s = a[1] && a[1].length > 0,
                    h = t.morphTargets,
                    l = h.length;
                if (l > 0) { e = [];
                    for (var c = 0; c < l; c++) e[c] = [];
                    this.morphTargets.position = e }
                var u, p = t.morphNormals,
                    d = p.length;
                if (d > 0) { u = [];
                    for (var c = 0; c < d; c++) u[c] = [];
                    this.morphTargets.normal = u }
                for (var f = t.skinIndices, m = t.skinWeights, g = f.length === r.length, v = m.length === r.length, c = 0; c < n.length; c++) {
                    var y = n[c];
                    this.vertices.push(r[y.a], r[y.b], r[y.c]);
                    var _ = y.vertexNormals;
                    if (3 === _.length) this.normals.push(_[0], _[1], _[2]);
                    else {
                        var x = y.normal;
                        this.normals.push(x, x, x) }
                    var b = y.vertexColors;
                    if (3 === b.length) this.colors.push(b[0], b[1], b[2]);
                    else {
                        var w = y.color;
                        this.colors.push(w, w, w) }
                    if (o === !0) {
                        var M = a[0][c];
                        void 0 !== M ? this.uvs.push(M[0], M[1], M[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", c), this.uvs.push(new i, new i, new i)) }
                    if (s === !0) {
                        var M = a[1][c];
                        void 0 !== M ? this.uvs2.push(M[0], M[1], M[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", c), this.uvs2.push(new i, new i, new i)) }
                    for (var T = 0; T < l; T++) {
                        var E = h[T].vertices;
                        e[T].push(E[y.a], E[y.b], E[y.c]) }
                    for (var T = 0; T < d; T++) {
                        var S = p[T].vertexNormals[c];
                        u[T].push(S.a, S.b, S.c) }
                    g && this.skinIndices.push(f[y.a], f[y.b], f[y.c]), v && this.skinWeights.push(m[y.a], m[y.b], m[y.c]) }
                return this.computeGroups(t), this.verticesNeedUpdate = t.verticesNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this } }), Object.assign(Tt.prototype, e.prototype, {
            isGeometry: !0,
            applyMatrix: function(t) {
                for (var e = (new et).getNormalMatrix(t), i = 0, n = this.vertices.length; i < n; i++) {
                    var r = this.vertices[i];
                    r.applyMatrix4(t) }
                for (var i = 0, n = this.faces.length; i < n; i++) {
                    var a = this.faces[i];
                    a.normal.applyMatrix3(e).normalize();
                    for (var o = 0, s = a.vertexNormals.length; o < s; o++) a.vertexNormals[o].applyMatrix3(e).normalize() }
                return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this },
            rotateX: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.makeRotationX(e), this.applyMatrix(t), this } }(),
            rotateY: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.makeRotationY(e), this.applyMatrix(t), this } }(),
            rotateZ: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.makeRotationZ(e), this.applyMatrix(t), this } }(),
            translate: function() {
                var t;
                return function(e, i, n) {
                    return void 0 === t && (t = new l), t.makeTranslation(e, i, n), this.applyMatrix(t), this } }(),
            scale: function() {
                var t;
                return function(e, i, n) {
                    return void 0 === t && (t = new l), t.makeScale(e, i, n), this.applyMatrix(t), this } }(),
            lookAt: function() {
                var t;
                return function(e) { void 0 === t && (t = new ht), t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix) } }(),
            fromBufferGeometry: function(t) {
                function e(t, e, i, r) {
                    var a = void 0 !== s ? [p[t].clone(), p[e].clone(), p[i].clone()] : [],
                        o = void 0 !== l ? [n.colors[t].clone(), n.colors[e].clone(), n.colors[i].clone()] : [],
                        h = new ut(t, e, i, a, o, r);
                    n.faces.push(h), void 0 !== c && n.faceVertexUvs[0].push([d[t].clone(), d[e].clone(), d[i].clone()]), void 0 !== u && n.faceVertexUvs[1].push([f[t].clone(), f[e].clone(), f[i].clone()]) }
                var n = this,
                    r = null !== t.index ? t.index.array : void 0,
                    a = t.attributes,
                    o = a.position.array,
                    s = void 0 !== a.normal ? a.normal.array : void 0,
                    l = void 0 !== a.color ? a.color.array : void 0,
                    c = void 0 !== a.uv ? a.uv.array : void 0,
                    u = void 0 !== a.uv2 ? a.uv2.array : void 0;
                void 0 !== u && (this.faceVertexUvs[1] = []);
                for (var p = [], d = [], f = [], m = 0, g = 0; m < o.length; m += 3, g += 2) n.vertices.push(new h(o[m], o[m + 1], o[m + 2])), void 0 !== s && p.push(new h(s[m], s[m + 1], s[m + 2])), void 0 !== l && n.colors.push(new W(l[m], l[m + 1], l[m + 2])), void 0 !== c && d.push(new i(c[g], c[g + 1])), void 0 !== u && f.push(new i(u[g], u[g + 1]));
                if (void 0 !== r) {
                    var v = t.groups;
                    if (v.length > 0)
                        for (var m = 0; m < v.length; m++)
                            for (var y = v[m], _ = y.start, x = y.count, g = _, b = _ + x; g < b; g += 3) e(r[g], r[g + 1], r[g + 2], y.materialIndex);
                    else
                        for (var m = 0; m < r.length; m += 3) e(r[m], r[m + 1], r[m + 2]) } else
                    for (var m = 0; m < o.length / 3; m += 3) e(m, m + 1, m + 2);
                return this.computeFaceNormals(), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), this },
            center: function() { this.computeBoundingBox();
                var t = this.boundingBox.getCenter().negate();
                return this.translate(t.x, t.y, t.z), t },
            normalize: function() { this.computeBoundingSphere();
                var t = this.boundingSphere.center,
                    e = this.boundingSphere.radius,
                    i = 0 === e ? 1 : 1 / e,
                    n = new l;
                return n.set(i, 0, 0, -i * t.x, 0, i, 0, -i * t.y, 0, 0, i, -i * t.z, 0, 0, 0, 1), this.applyMatrix(n), this },
            computeFaceNormals: function() {
                for (var t = new h, e = new h, i = 0, n = this.faces.length; i < n; i++) {
                    var r = this.faces[i],
                        a = this.vertices[r.a],
                        o = this.vertices[r.b],
                        s = this.vertices[r.c];
                    t.subVectors(s, o), e.subVectors(a, o), t.cross(e), t.normalize(), r.normal.copy(t) } },
            computeVertexNormals: function(t) { void 0 === t && (t = !0);
                var e, i, n, r, a, o;
                for (o = new Array(this.vertices.length), e = 0, i = this.vertices.length; e < i; e++) o[e] = new h;
                if (t) {
                    var s, l, c, u = new h,
                        p = new h;
                    for (n = 0, r = this.faces.length; n < r; n++) a = this.faces[n], s = this.vertices[a.a], l = this.vertices[a.b], c = this.vertices[a.c], u.subVectors(c, l), p.subVectors(s, l), u.cross(p), o[a.a].add(u), o[a.b].add(u), o[a.c].add(u) } else
                    for (this.computeFaceNormals(), n = 0, r = this.faces.length; n < r; n++) a = this.faces[n], o[a.a].add(a.normal), o[a.b].add(a.normal), o[a.c].add(a.normal);
                for (e = 0, i = this.vertices.length; e < i; e++) o[e].normalize();
                for (n = 0, r = this.faces.length; n < r; n++) { a = this.faces[n];
                    var d = a.vertexNormals;
                    3 === d.length ? (d[0].copy(o[a.a]), d[1].copy(o[a.b]), d[2].copy(o[a.c])) : (d[0] = o[a.a].clone(), d[1] = o[a.b].clone(), d[2] = o[a.c].clone()) }
                this.faces.length > 0 && (this.normalsNeedUpdate = !0) },
            computeFlatVertexNormals: function() {
                var t, e, i;
                for (this.computeFaceNormals(), t = 0, e = this.faces.length; t < e; t++) { i = this.faces[t];
                    var n = i.vertexNormals;
                    3 === n.length ? (n[0].copy(i.normal), n[1].copy(i.normal), n[2].copy(i.normal)) : (n[0] = i.normal.clone(), n[1] = i.normal.clone(), n[2] = i.normal.clone()) }
                this.faces.length > 0 && (this.normalsNeedUpdate = !0) },
            computeMorphNormals: function() {
                var t, e, i, n, r;
                for (i = 0, n = this.faces.length; i < n; i++)
                    for (r = this.faces[i], r.__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(), r.__originalVertexNormals || (r.__originalVertexNormals = []), t = 0, e = r.vertexNormals.length; t < e; t++) r.__originalVertexNormals[t] ? r.__originalVertexNormals[t].copy(r.vertexNormals[t]) : r.__originalVertexNormals[t] = r.vertexNormals[t].clone();
                var a = new Tt;
                for (a.faces = this.faces, t = 0, e = this.morphTargets.length; t < e; t++) {
                    if (!this.morphNormals[t]) { this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [];
                        var o, s, l = this.morphNormals[t].faceNormals,
                            c = this.morphNormals[t].vertexNormals;
                        for (i = 0, n = this.faces.length; i < n; i++) o = new h, s = { a: new h, b: new h, c: new h }, l.push(o), c.push(s) }
                    var u = this.morphNormals[t];
                    a.vertices = this.morphTargets[t].vertices, a.computeFaceNormals(), a.computeVertexNormals();
                    var o, s;
                    for (i = 0, n = this.faces.length; i < n; i++) r = this.faces[i], o = u.faceNormals[i], s = u.vertexNormals[i], o.copy(r.normal), s.a.copy(r.vertexNormals[0]), s.b.copy(r.vertexNormals[1]), s.c.copy(r.vertexNormals[2]) }
                for (i = 0, n = this.faces.length; i < n; i++) r = this.faces[i], r.normal = r.__originalFaceNormal, r.vertexNormals = r.__originalVertexNormals },
            computeLineDistances: function() {
                for (var t = 0, e = this.vertices, i = 0, n = e.length; i < n; i++) i > 0 && (t += e[i].distanceTo(e[i - 1])), this.lineDistances[i] = t },
            computeBoundingBox: function() { null === this.boundingBox && (this.boundingBox = new $), this.boundingBox.setFromPoints(this.vertices) },
            computeBoundingSphere: function() { null === this.boundingSphere && (this.boundingSphere = new tt), this.boundingSphere.setFromPoints(this.vertices) },
            merge: function(t, e, i) {
                if ((t && t.isGeometry) === !1) return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t);
                var n, r = this.vertices.length,
                    a = this.vertices,
                    o = t.vertices,
                    s = this.faces,
                    h = t.faces,
                    l = this.faceVertexUvs[0],
                    c = t.faceVertexUvs[0],
                    u = this.colors,
                    p = t.colors;
                void 0 === i && (i = 0), void 0 !== e && (n = (new et).getNormalMatrix(e));
                for (var d = 0, f = o.length; d < f; d++) {
                    var m = o[d],
                        g = m.clone();
                    void 0 !== e && g.applyMatrix4(e), a.push(g) }
                for (var d = 0, f = p.length; d < f; d++) u.push(p[d].clone());
                for (d = 0, f = h.length; d < f; d++) {
                    var v, y, _, x = h[d],
                        b = x.vertexNormals,
                        w = x.vertexColors;
                    v = new ut(x.a + r, x.b + r, x.c + r), v.normal.copy(x.normal), void 0 !== n && v.normal.applyMatrix3(n).normalize();
                    for (var M = 0, T = b.length; M < T; M++) y = b[M].clone(), void 0 !== n && y.applyMatrix3(n).normalize(), v.vertexNormals.push(y);
                    v.color.copy(x.color);
                    for (var M = 0, T = w.length; M < T; M++) _ = w[M], v.vertexColors.push(_.clone());
                    v.materialIndex = x.materialIndex + i, s.push(v) }
                for (d = 0, f = c.length; d < f; d++) {
                    var E = c[d],
                        S = [];
                    if (void 0 !== E) {
                        for (var M = 0, T = E.length; M < T; M++) S.push(E[M].clone());
                        l.push(S);
                    }
                }
            },
            mergeMesh: function(t) {
                return (t && t.isMesh) === !1 ? void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t) : (t.matrixAutoUpdate && t.updateMatrix(), void this.merge(t.geometry, t.matrix)) },
            mergeVertices: function() {
                var t, e, i, n, r, a, o, s, h = {},
                    l = [],
                    c = [],
                    u = 4,
                    p = Math.pow(10, u);
                for (i = 0, n = this.vertices.length; i < n; i++) t = this.vertices[i], e = Math.round(t.x * p) + "_" + Math.round(t.y * p) + "_" + Math.round(t.z * p), void 0 === h[e] ? (h[e] = i, l.push(this.vertices[i]), c[i] = l.length - 1) : c[i] = c[h[e]];
                var d = [];
                for (i = 0, n = this.faces.length; i < n; i++) { r = this.faces[i], r.a = c[r.a], r.b = c[r.b], r.c = c[r.c], a = [r.a, r.b, r.c];
                    for (var f = -1, m = 0; m < 3; m++)
                        if (a[m] === a[(m + 1) % 3]) { f = m, d.push(i);
                            break } }
                for (i = d.length - 1; i >= 0; i--) {
                    var g = d[i];
                    for (this.faces.splice(g, 1), o = 0, s = this.faceVertexUvs.length; o < s; o++) this.faceVertexUvs[o].splice(g, 1) }
                var v = this.vertices.length - l.length;
                return this.vertices = l, v },
            sortFacesByMaterialIndex: function() {
                function t(t, e) {
                    return t.materialIndex - e.materialIndex }
                for (var e = this.faces, i = e.length, n = 0; n < i; n++) e[n]._id = n;
                e.sort(t);
                var r, a, o = this.faceVertexUvs[0],
                    s = this.faceVertexUvs[1];
                o && o.length === i && (r = []), s && s.length === i && (a = []);
                for (var n = 0; n < i; n++) {
                    var h = e[n]._id;
                    r && r.push(o[h]), a && a.push(s[h]) }
                r && (this.faceVertexUvs[0] = r), a && (this.faceVertexUvs[1] = a) },
            toJSON: function() {
                function t(t, e, i) {
                    return i ? t | 1 << e : t & ~(1 << e) }

                function e(t) {
                    var e = t.x.toString() + t.y.toString() + t.z.toString();
                    return void 0 !== p[e] ? p[e] : (p[e] = u.length / 3, u.push(t.x, t.y, t.z), p[e]) }

                function i(t) {
                    var e = t.r.toString() + t.g.toString() + t.b.toString();
                    return void 0 !== f[e] ? f[e] : (f[e] = d.length, d.push(t.getHex()), f[e]) }

                function n(t) {
                    var e = t.x.toString() + t.y.toString();
                    return void 0 !== g[e] ? g[e] : (g[e] = m.length / 2, m.push(t.x, t.y), g[e]) }
                var r = { metadata: { version: 4.4, type: "Geometry", generator: "Geometry.toJSON" } };
                if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), void 0 !== this.parameters) {
                    var a = this.parameters;
                    for (var o in a) void 0 !== a[o] && (r[o] = a[o]);
                    return r }
                for (var s = [], h = 0; h < this.vertices.length; h++) {
                    var l = this.vertices[h];
                    s.push(l.x, l.y, l.z) }
                for (var c = [], u = [], p = {}, d = [], f = {}, m = [], g = {}, h = 0; h < this.faces.length; h++) {
                    var v = this.faces[h],
                        y = !0,
                        _ = !1,
                        x = void 0 !== this.faceVertexUvs[0][h],
                        b = v.normal.length() > 0,
                        w = v.vertexNormals.length > 0,
                        M = 1 !== v.color.r || 1 !== v.color.g || 1 !== v.color.b,
                        T = v.vertexColors.length > 0,
                        E = 0;
                    if (E = t(E, 0, 0), E = t(E, 1, y), E = t(E, 2, _), E = t(E, 3, x), E = t(E, 4, b), E = t(E, 5, w), E = t(E, 6, M), E = t(E, 7, T), c.push(E), c.push(v.a, v.b, v.c), c.push(v.materialIndex), x) {
                        var S = this.faceVertexUvs[0][h];
                        c.push(n(S[0]), n(S[1]), n(S[2])) }
                    if (b && c.push(e(v.normal)), w) {
                        var A = v.vertexNormals;
                        c.push(e(A[0]), e(A[1]), e(A[2])) }
                    if (M && c.push(i(v.color)), T) {
                        var R = v.vertexColors;
                        c.push(i(R[0]), i(R[1]), i(R[2])) } }
                return r.data = {}, r.data.vertices = s, r.data.normals = u, d.length > 0 && (r.data.colors = d), m.length > 0 && (r.data.uvs = [m]), r.data.faces = c, r },
            clone: function() {
                return (new Tt).copy(this) },
            copy: function(t) { this.vertices = [], this.faces = [], this.faceVertexUvs = [
                    []
                ], this.colors = [];
                for (var e = t.vertices, i = 0, n = e.length; i < n; i++) this.vertices.push(e[i].clone());
                for (var r = t.colors, i = 0, n = r.length; i < n; i++) this.colors.push(r[i].clone());
                for (var a = t.faces, i = 0, n = a.length; i < n; i++) this.faces.push(a[i].clone());
                for (var i = 0, n = t.faceVertexUvs.length; i < n; i++) {
                    var o = t.faceVertexUvs[i];
                    void 0 === this.faceVertexUvs[i] && (this.faceVertexUvs[i] = []);
                    for (var s = 0, h = o.length; s < h; s++) {
                        for (var l = o[s], c = [], u = 0, p = l.length; u < p; u++) {
                            var d = l[u];
                            c.push(d.clone()) }
                        this.faceVertexUvs[i].push(c) } }
                return this },
            dispose: function() { this.dispatchEvent({ type: "dispose" }) }
        });
        var ll = 0;
        Object.assign(St.prototype, e.prototype, { isBufferGeometry: !0, getIndex: function() {
                return this.index }, setIndex: function(t) { this.index = t }, addAttribute: function(t, e) {
                return (e && e.isBufferAttribute) === !1 && (e && e.isInterleavedBufferAttribute) === !1 ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void this.addAttribute(t, new dt(arguments[1], arguments[2]))) : "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), void this.setIndex(e)) : (this.attributes[t] = e, this) }, getAttribute: function(t) {
                return this.attributes[t] }, removeAttribute: function(t) {
                return delete this.attributes[t], this }, addGroup: function(t, e, i) { this.groups.push({ start: t, count: e, materialIndex: void 0 !== i ? i : 0 }) }, clearGroups: function() { this.groups = [] }, setDrawRange: function(t, e) { this.drawRange.start = t, this.drawRange.count = e }, applyMatrix: function(t) {
                var e = this.attributes.position;
                void 0 !== e && (t.applyToVector3Array(e.array), e.needsUpdate = !0);
                var i = this.attributes.normal;
                if (void 0 !== i) {
                    var n = (new et).getNormalMatrix(t);
                    n.applyToVector3Array(i.array), i.needsUpdate = !0 }
                return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this }, rotateX: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.makeRotationX(e), this.applyMatrix(t), this } }(), rotateY: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.makeRotationY(e), this.applyMatrix(t), this } }(), rotateZ: function() {
                var t;
                return function(e) {
                    return void 0 === t && (t = new l), t.makeRotationZ(e), this.applyMatrix(t), this } }(), translate: function() {
                var t;
                return function(e, i, n) {
                    return void 0 === t && (t = new l), t.makeTranslation(e, i, n), this.applyMatrix(t), this } }(), scale: function() {
                var t;
                return function(e, i, n) {
                    return void 0 === t && (t = new l), t.makeScale(e, i, n), this.applyMatrix(t), this } }(), lookAt: function() {
                var t;
                return function(e) { void 0 === t && (t = new ht), t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix) } }(), center: function() { this.computeBoundingBox();
                var t = this.boundingBox.getCenter().negate();
                return this.translate(t.x, t.y, t.z), t }, setFromObject: function(t) {
                var e = t.geometry;
                if (t.isPoints || t.isLine) {
                    var i = new bt(3 * e.vertices.length, 3),
                        n = new bt(3 * e.colors.length, 3);
                    if (this.addAttribute("position", i.copyVector3sArray(e.vertices)), this.addAttribute("color", n.copyColorsArray(e.colors)), e.lineDistances && e.lineDistances.length === e.vertices.length) {
                        var r = new bt(e.lineDistances.length, 1);
                        this.addAttribute("lineDistance", r.copyArray(e.lineDistances)) }
                    null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()) } else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
                return this }, updateFromObject: function(t) {
                var e = t.geometry;
                if (t.isMesh) {
                    var i = e.__directGeometry;
                    if (e.elementsNeedUpdate === !0 && (i = void 0, e.elementsNeedUpdate = !1), void 0 === i) return this.fromGeometry(e);
                    i.verticesNeedUpdate = e.verticesNeedUpdate, i.normalsNeedUpdate = e.normalsNeedUpdate, i.colorsNeedUpdate = e.colorsNeedUpdate, i.uvsNeedUpdate = e.uvsNeedUpdate, i.groupsNeedUpdate = e.groupsNeedUpdate, e.verticesNeedUpdate = !1, e.normalsNeedUpdate = !1, e.colorsNeedUpdate = !1, e.uvsNeedUpdate = !1, e.groupsNeedUpdate = !1, e = i }
                var n;
                return e.verticesNeedUpdate === !0 && (n = this.attributes.position, void 0 !== n && (n.copyVector3sArray(e.vertices), n.needsUpdate = !0), e.verticesNeedUpdate = !1), e.normalsNeedUpdate === !0 && (n = this.attributes.normal, void 0 !== n && (n.copyVector3sArray(e.normals), n.needsUpdate = !0), e.normalsNeedUpdate = !1), e.colorsNeedUpdate === !0 && (n = this.attributes.color, void 0 !== n && (n.copyColorsArray(e.colors), n.needsUpdate = !0), e.colorsNeedUpdate = !1), e.uvsNeedUpdate && (n = this.attributes.uv, void 0 !== n && (n.copyVector2sArray(e.uvs), n.needsUpdate = !0), e.uvsNeedUpdate = !1), e.lineDistancesNeedUpdate && (n = this.attributes.lineDistance, void 0 !== n && (n.copyArray(e.lineDistances), n.needsUpdate = !0), e.lineDistancesNeedUpdate = !1), e.groupsNeedUpdate && (e.computeGroups(t.geometry), this.groups = e.groups, e.groupsNeedUpdate = !1), this }, fromGeometry: function(t) {
                return t.__directGeometry = (new Mt).fromGeometry(t), this.fromDirectGeometry(t.__directGeometry) }, fromDirectGeometry: function(t) {
                var e = new Float32Array(3 * t.vertices.length);
                if (this.addAttribute("position", new dt(e, 3).copyVector3sArray(t.vertices)), t.normals.length > 0) {
                    var i = new Float32Array(3 * t.normals.length);
                    this.addAttribute("normal", new dt(i, 3).copyVector3sArray(t.normals)) }
                if (t.colors.length > 0) {
                    var n = new Float32Array(3 * t.colors.length);
                    this.addAttribute("color", new dt(n, 3).copyColorsArray(t.colors)) }
                if (t.uvs.length > 0) {
                    var r = new Float32Array(2 * t.uvs.length);
                    this.addAttribute("uv", new dt(r, 2).copyVector2sArray(t.uvs)) }
                if (t.uvs2.length > 0) {
                    var a = new Float32Array(2 * t.uvs2.length);
                    this.addAttribute("uv2", new dt(a, 2).copyVector2sArray(t.uvs2)) }
                if (t.indices.length > 0) {
                    var o = t.vertices.length > 65535 ? Uint32Array : Uint16Array,
                        s = new o(3 * t.indices.length);
                    this.setIndex(new dt(s, 1).copyIndicesArray(t.indices)) }
                this.groups = t.groups;
                for (var h in t.morphTargets) {
                    for (var l = [], c = t.morphTargets[h], u = 0, p = c.length; u < p; u++) {
                        var d = c[u],
                            f = new bt(3 * d.length, 3);
                        l.push(f.copyVector3sArray(d)) }
                    this.morphAttributes[h] = l }
                if (t.skinIndices.length > 0) {
                    var m = new bt(4 * t.skinIndices.length, 4);
                    this.addAttribute("skinIndex", m.copyVector4sArray(t.skinIndices)) }
                if (t.skinWeights.length > 0) {
                    var g = new bt(4 * t.skinWeights.length, 4);
                    this.addAttribute("skinWeight", g.copyVector4sArray(t.skinWeights)) }
                return null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), this }, computeBoundingBox: function() { null === this.boundingBox && (this.boundingBox = new $);
                var t = this.attributes.position;
                void 0 !== t ? this.boundingBox.setFromBufferAttribute(t) : this.boundingBox.makeEmpty(), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this) }, computeBoundingSphere: function() {
                var t = new $,
                    e = new h;
                return function() { null === this.boundingSphere && (this.boundingSphere = new tt);
                    var i = this.attributes.position;
                    if (i) {
                        var n = this.boundingSphere.center;
                        t.setFromBufferAttribute(i), t.getCenter(n);
                        for (var r = 0, a = 0, o = i.count; a < o; a++) e.x = i.getX(a), e.y = i.getY(a), e.z = i.getZ(a), r = Math.max(r, n.distanceToSquared(e));
                        this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this) } } }(), computeFaceNormals: function() {}, computeVertexNormals: function() {
                var t = this.index,
                    e = this.attributes,
                    i = this.groups;
                if (e.position) {
                    var n = e.position.array;
                    if (void 0 === e.normal) this.addAttribute("normal", new dt(new Float32Array(n.length), 3));
                    else
                        for (var r = e.normal.array, a = 0, o = r.length; a < o; a++) r[a] = 0;
                    var s, l, c, u = e.normal.array,
                        p = new h,
                        d = new h,
                        f = new h,
                        m = new h,
                        g = new h;
                    if (t) {
                        var v = t.array;
                        0 === i.length && this.addGroup(0, v.length);
                        for (var y = 0, _ = i.length; y < _; ++y)
                            for (var x = i[y], b = x.start, w = x.count, a = b, o = b + w; a < o; a += 3) s = 3 * v[a + 0], l = 3 * v[a + 1], c = 3 * v[a + 2], p.fromArray(n, s), d.fromArray(n, l), f.fromArray(n, c), m.subVectors(f, d), g.subVectors(p, d), m.cross(g), u[s] += m.x, u[s + 1] += m.y, u[s + 2] += m.z, u[l] += m.x, u[l + 1] += m.y, u[l + 2] += m.z, u[c] += m.x, u[c + 1] += m.y, u[c + 2] += m.z } else
                        for (var a = 0, o = n.length; a < o; a += 9) p.fromArray(n, a), d.fromArray(n, a + 3), f.fromArray(n, a + 6), m.subVectors(f, d), g.subVectors(p, d), m.cross(g), u[a] = m.x, u[a + 1] = m.y, u[a + 2] = m.z, u[a + 3] = m.x, u[a + 4] = m.y, u[a + 5] = m.z, u[a + 6] = m.x, u[a + 7] = m.y, u[a + 8] = m.z;
                    this.normalizeNormals(), e.normal.needsUpdate = !0 } }, merge: function(t, e) {
                if ((t && t.isBufferGeometry) === !1) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
                void 0 === e && (e = 0);
                var i = this.attributes;
                for (var n in i)
                    if (void 0 !== t.attributes[n])
                        for (var r = i[n], a = r.array, o = t.attributes[n], s = o.array, h = o.itemSize, l = 0, c = h * e; l < s.length; l++, c++) a[c] = s[l];
                return this }, normalizeNormals: function() {
                for (var t, e, i, n, r = this.attributes.normal.array, a = 0, o = r.length; a < o; a += 3) t = r[a], e = r[a + 1], i = r[a + 2], n = 1 / Math.sqrt(t * t + e * e + i * i), r[a] *= n, r[a + 1] *= n, r[a + 2] *= n }, toNonIndexed: function() {
                if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
                var t = new St,
                    e = this.index.array,
                    i = this.attributes;
                for (var n in i) {
                    for (var r = i[n], a = r.array, o = r.itemSize, s = new a.constructor(e.length * o), h = 0, l = 0, c = 0, u = e.length; c < u; c++) { h = e[c] * o;
                        for (var p = 0; p < o; p++) s[l++] = a[h++] }
                    t.addAttribute(n, new dt(s, o)) }
                return t }, toJSON: function() {
                var t = { metadata: { version: 4.4, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
                if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), void 0 !== this.parameters) {
                    var e = this.parameters;
                    for (var i in e) void 0 !== e[i] && (t[i] = e[i]);
                    return t }
                t.data = { attributes: {} };
                var n = this.index;
                if (null !== n) {
                    var r = Array.prototype.slice.call(n.array);
                    t.data.index = { type: n.array.constructor.name, array: r } }
                var a = this.attributes;
                for (var i in a) {
                    var o = a[i],
                        r = Array.prototype.slice.call(o.array);
                    t.data.attributes[i] = { itemSize: o.itemSize, type: o.array.constructor.name, array: r, normalized: o.normalized } }
                var s = this.groups;
                s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
                var h = this.boundingSphere;
                return null !== h && (t.data.boundingSphere = { center: h.center.toArray(), radius: h.radius }), t }, clone: function() {
                return (new St).copy(this) }, copy: function(t) {
                var e = t.index;
                null !== e && this.setIndex(e.clone());
                var i = t.attributes;
                for (var n in i) {
                    var r = i[n];
                    this.addAttribute(n, r.clone()) }
                for (var a = t.groups, o = 0, s = a.length; o < s; o++) {
                    var h = a[o];
                    this.addGroup(h.start, h.count, h.materialIndex) }
                return this }, dispose: function() { this.dispatchEvent({ type: "dispose" }) } }), St.MaxIndex = 65535, At.prototype = Object.assign(Object.create(ht.prototype), { constructor: At, isMesh: !0, setDrawMode: function(t) { this.drawMode = t }, copy: function(t) {
                return ht.prototype.copy.call(this, t), this.drawMode = t.drawMode, this }, updateMorphTargets: function() {
                var t = this.geometry.morphTargets;
                if (void 0 !== t && t.length > 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                    for (var e = 0, i = t.length; e < i; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[t[e].name] = e } }, raycast: function() {
                function t(t, e, i, n, r, a, o) {
                    return ct.barycoordFromPoint(t, e, i, n, y), r.multiplyScalar(y.x), a.multiplyScalar(y.y), o.multiplyScalar(y.z), r.add(a).add(o), r.clone() }

                function e(t, e, i, n, r, a, o) {
                    var s, h = t.material;
                    if (s = h.side === kr ? i.intersectTriangle(a, r, n, !0, o) : i.intersectTriangle(n, r, a, h.side !== Hr, o), null === s) return null;
                    x.copy(o), x.applyMatrix4(t.matrixWorld);
                    var l = e.ray.origin.distanceTo(x);
                    return l < e.near || l > e.far ? null : { distance: l, point: x.clone(), object: t } }

                function n(i, n, r, a, o, h, l, p) { s.fromArray(a, 3 * h), c.fromArray(a, 3 * l), u.fromArray(a, 3 * p);
                    var d = e(i, n, r, s, c, u, _);
                    return d && (o && (m.fromArray(o, 2 * h), g.fromArray(o, 2 * l), v.fromArray(o, 2 * p), d.uv = t(_, s, c, u, m, g, v)), d.face = new ut(h, l, p, ct.normal(s, c, u)), d.faceIndex = h), d }
                var r = new l,
                    a = new at,
                    o = new tt,
                    s = new h,
                    c = new h,
                    u = new h,
                    p = new h,
                    d = new h,
                    f = new h,
                    m = new i,
                    g = new i,
                    v = new i,
                    y = new h,
                    _ = new h,
                    x = new h;
                return function(i, h) {
                    var l = this.geometry,
                        y = this.material,
                        x = this.matrixWorld;
                    if (void 0 !== y && (null === l.boundingSphere && l.computeBoundingSphere(), o.copy(l.boundingSphere), o.applyMatrix4(x), i.ray.intersectsSphere(o) !== !1 && (r.getInverse(x), a.copy(i.ray).applyMatrix4(r), null === l.boundingBox || a.intersectsBox(l.boundingBox) !== !1))) {
                        var b, w;
                        if (l.isBufferGeometry) {
                            var M, T, E, S = l.index,
                                A = l.attributes,
                                R = A.position.array;
                            if (void 0 !== A.uv && (b = A.uv.array), null !== S)
                                for (var L = S.array, P = 0, C = L.length; P < C; P += 3) M = L[P], T = L[P + 1], E = L[P + 2], w = n(this, i, a, R, b, M, T, E), w && (w.faceIndex = Math.floor(P / 3), h.push(w));
                            else
                                for (var P = 0, C = R.length; P < C; P += 9) M = P / 3, T = M + 1, E = M + 2, w = n(this, i, a, R, b, M, T, E), w && (w.index = M, h.push(w)) } else if (l.isGeometry) {
                            var I, O, D, U = y && y.isMultiMaterial,
                                N = U === !0 ? y.materials : null,
                                F = l.vertices,
                                z = l.faces,
                                B = l.faceVertexUvs[0];
                            B.length > 0 && (b = B);
                            for (var G = 0, k = z.length; G < k; G++) {
                                var H = z[G],
                                    j = U === !0 ? N[H.materialIndex] : y;
                                if (void 0 !== j) {
                                    if (I = F[H.a], O = F[H.b], D = F[H.c], j.morphTargets === !0) {
                                        var V = l.morphTargets,
                                            W = this.morphTargetInfluences;
                                        s.set(0, 0, 0), c.set(0, 0, 0), u.set(0, 0, 0);
                                        for (var X = 0, Y = V.length; X < Y; X++) {
                                            var q = W[X];
                                            if (0 !== q) {
                                                var Z = V[X].vertices;
                                                s.addScaledVector(p.subVectors(Z[H.a], I), q), c.addScaledVector(d.subVectors(Z[H.b], O), q), u.addScaledVector(f.subVectors(Z[H.c], D), q) } }
                                        s.add(I), c.add(O), u.add(D), I = s, O = c, D = u }
                                    if (w = e(this, i, a, I, O, D, _)) {
                                        if (b) {
                                            var J = b[G];
                                            m.copy(J[0]), g.copy(J[1]), v.copy(J[2]), w.uv = t(_, I, O, D, m, g, v) }
                                        w.face = H, w.faceIndex = G, h.push(w) } } } } } } }(), clone: function() {
                return new this.constructor(this.geometry, this.material).copy(this) } }), Rt.prototype = Object.create(St.prototype), Rt.prototype.constructor = Rt, Lt.prototype = Object.create(St.prototype), Lt.prototype.constructor = Lt, Pt.prototype = Object.create(ht.prototype), Pt.prototype.constructor = Pt, Pt.prototype.isCamera = !0, Pt.prototype.getWorldDirection = function() {
            var t = new s;
            return function(e) {
                var i = e || new h;
                return this.getWorldQuaternion(t), i.set(0, 0, -1).applyQuaternion(t) } }(), Pt.prototype.lookAt = function() {
            var t = new l;
            return function(e) { t.lookAt(this.position, e, this.up), this.quaternion.setFromRotationMatrix(t) } }(), Pt.prototype.clone = function() {
            return (new this.constructor).copy(this) }, Pt.prototype.copy = function(t) {
            return ht.prototype.copy.call(this, t), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this }, Ct.prototype = Object.assign(Object.create(Pt.prototype), { constructor: Ct, isPerspectiveCamera: !0, copy: function(t) {
                return Pt.prototype.copy.call(this, t), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this }, setFocalLength: function(t) {
                var e = .5 * this.getFilmHeight() / t;
                this.fov = 2 * Qo.RAD2DEG * Math.atan(e), this.updateProjectionMatrix() }, getFocalLength: function() {
                var t = Math.tan(.5 * Qo.DEG2RAD * this.fov);
                return .5 * this.getFilmHeight() / t }, getEffectiveFOV: function() {
                return 2 * Qo.RAD2DEG * Math.atan(Math.tan(.5 * Qo.DEG2RAD * this.fov) / this.zoom) }, getFilmWidth: function() {
                return this.filmGauge * Math.min(this.aspect, 1) }, getFilmHeight: function() {
                return this.filmGauge / Math.max(this.aspect, 1) }, setViewOffset: function(t, e, i, n, r, a) { this.aspect = t / e, this.view = { fullWidth: t, fullHeight: e, offsetX: i, offsetY: n, width: r, height: a }, this.updateProjectionMatrix() }, clearViewOffset: function() { this.view = null, this.updateProjectionMatrix() }, updateProjectionMatrix: function() {
                var t = this.near,
                    e = t * Math.tan(.5 * Qo.DEG2RAD * this.fov) / this.zoom,
                    i = 2 * e,
                    n = this.aspect * i,
                    r = -.5 * n,
                    a = this.view;
                if (null !== a) {
                    var o = a.fullWidth,
                        s = a.fullHeight;
                    r += a.offsetX * n / o, e -= a.offsetY * i / s, n *= a.width / o, i *= a.height / s }
                var h = this.filmOffset;
                0 !== h && (r += t * h / this.getFilmWidth()), this.projectionMatrix.makeFrustum(r, r + n, e - i, e, t, this.far) }, toJSON: function(t) {
                var e = ht.prototype.toJSON.call(this, t);
                return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e } }), It.prototype = Object.assign(Object.create(Pt.prototype), { constructor: It, isOrthographicCamera: !0, copy: function(t) {
                return Pt.prototype.copy.call(this, t), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this }, setViewOffset: function(t, e, i, n, r, a) { this.view = { fullWidth: t, fullHeight: e, offsetX: i, offsetY: n, width: r, height: a }, this.updateProjectionMatrix() }, clearViewOffset: function() { this.view = null, this.updateProjectionMatrix() }, updateProjectionMatrix: function() {
                var t = (this.right - this.left) / (2 * this.zoom),
                    e = (this.top - this.bottom) / (2 * this.zoom),
                    i = (this.right + this.left) / 2,
                    n = (this.top + this.bottom) / 2,
                    r = i - t,
                    a = i + t,
                    o = n + e,
                    s = n - e;
                if (null !== this.view) {
                    var h = this.zoom / (this.view.width / this.view.fullWidth),
                        l = this.zoom / (this.view.height / this.view.fullHeight),
                        c = (this.right - this.left) / this.view.width,
                        u = (this.top - this.bottom) / this.view.height;
                    r += c * (this.view.offsetX / h), a = r + c * (this.view.width / h), o -= u * (this.view.offsetY / l), s = o - u * (this.view.height / l) }
                this.projectionMatrix.makeOrthographic(r, a, o, s, this.near, this.far) }, toJSON: function(t) {
                var e = ht.prototype.toJSON.call(this, t);
                return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e } });
        var cl = 0;
        oe.prototype.isFogExp2 = !0, oe.prototype.clone = function() {
            return new oe(this.color.getHex(), this.density) }, oe.prototype.toJSON = function(t) {
            return { type: "FogExp2", color: this.color.getHex(), density: this.density } }, se.prototype.isFog = !0, se.prototype.clone = function() {
            return new se(this.color.getHex(), this.near, this.far) }, se.prototype.toJSON = function(t) {
            return { type: "Fog", color: this.color.getHex(), near: this.near, far: this.far } }, he.prototype = Object.create(ht.prototype), he.prototype.constructor = he, he.prototype.copy = function(t, e) {
            return ht.prototype.copy.call(this, t, e), null !== t.background && (this.background = t.background.clone()), null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this }, he.prototype.toJSON = function(t) {
            var e = ht.prototype.toJSON.call(this, t);
            return null !== this.background && (e.object.background = this.background.toJSON(t)), null !== this.fog && (e.object.fog = this.fog.toJSON()), e }, le.prototype = Object.assign(Object.create(ht.prototype), { constructor: le, isLensFlare: !0, copy: function(t) { ht.prototype.copy.call(this, t), this.positionScreen.copy(t.positionScreen), this.customUpdateCallback = t.customUpdateCallback;
                for (var e = 0, i = t.lensFlares.length; e < i; e++) this.lensFlares.push(t.lensFlares[e]);
                return this }, add: function(t, e, i, n, r, a) { void 0 === e && (e = -1), void 0 === i && (i = 0), void 0 === a && (a = 1), void 0 === r && (r = new W(16777215)), void 0 === n && (n = Zr), i = Math.min(i, Math.max(0, i)), this.lensFlares.push({ texture: t, size: e, distance: i, x: 0, y: 0, z: 0, scale: 1, rotation: 0, opacity: a, color: r, blending: n }) }, updateLensFlares: function() {
                var t, e, i = this.lensFlares.length,
                    n = 2 * -this.positionScreen.x,
                    r = 2 * -this.positionScreen.y;
                for (t = 0; t < i; t++) e = this.lensFlares[t], e.x = this.positionScreen.x + n * e.distance, e.y = this.positionScreen.y + r * e.distance, e.wantedRotation = e.x * Math.PI * .25, e.rotation += .25 * (e.wantedRotation - e.rotation) } }), ce.prototype = Object.create(J.prototype), ce.prototype.constructor = ce, ce.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.rotation = t.rotation, this }, ue.prototype = Object.assign(Object.create(ht.prototype), { constructor: ue, isSprite: !0, raycast: function() {
                var t = new h;
                return function(e, i) { t.setFromMatrixPosition(this.matrixWorld);
                    var n = e.ray.distanceSqToPoint(t),
                        r = this.scale.x * this.scale.y / 4;
                    n > r || i.push({ distance: Math.sqrt(n), point: this.position, face: null, object: this }) } }(), clone: function() {
                return new this.constructor(this.material).copy(this) } }), pe.prototype = Object.assign(Object.create(ht.prototype), { constructor: pe, copy: function(t) { ht.prototype.copy.call(this, t, !1);
                for (var e = t.levels, i = 0, n = e.length; i < n; i++) {
                    var r = e[i];
                    this.addLevel(r.object.clone(), r.distance) }
                return this }, addLevel: function(t, e) { void 0 === e && (e = 0), e = Math.abs(e);
                for (var i = this.levels, n = 0; n < i.length && !(e < i[n].distance); n++);
                i.splice(n, 0, { distance: e, object: t }), this.add(t) }, getObjectForDistance: function(t) {
                for (var e = this.levels, i = 1, n = e.length; i < n && !(t < e[i].distance); i++);
                return e[i - 1].object }, raycast: function() {
                var t = new h;
                return function(e, i) { t.setFromMatrixPosition(this.matrixWorld);
                    var n = e.ray.origin.distanceTo(t);
                    this.getObjectForDistance(n).raycast(e, i) } }(), update: function() {
                var t = new h,
                    e = new h;
                return function(i) {
                    var n = this.levels;
                    if (n.length > 1) { t.setFromMatrixPosition(i.matrixWorld), e.setFromMatrixPosition(this.matrixWorld);
                        var r = t.distanceTo(e);
                        n[0].object.visible = !0;
                        for (var a = 1, o = n.length; a < o && r >= n[a].distance; a++) n[a - 1].object.visible = !1, n[a].object.visible = !0;
                        for (; a < o; a++) n[a].object.visible = !1 } } }(), toJSON: function(t) {
                var e = ht.prototype.toJSON.call(this, t);
                e.object.levels = [];
                for (var i = this.levels, n = 0, r = i.length; n < r; n++) {
                    var a = i[n];
                    e.object.levels.push({ object: a.object.uuid, distance: a.distance }) }
                return e } }), Object.assign(de.prototype, { calculateInverses: function() { this.boneInverses = [];
                for (var t = 0, e = this.bones.length; t < e; t++) {
                    var i = new l;
                    this.bones[t] && i.getInverse(this.bones[t].matrixWorld), this.boneInverses.push(i) } }, pose: function() {
                for (var t, e = 0, i = this.bones.length; e < i; e++) t = this.bones[e], t && t.matrixWorld.getInverse(this.boneInverses[e]);
                for (var e = 0, i = this.bones.length; e < i; e++) t = this.bones[e], t && (t.parent && t.parent.isBone ? (t.matrix.getInverse(t.parent.matrixWorld), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale)) }, update: function() {
                var t = new l;
                return function() {
                    for (var e = 0, i = this.bones.length; e < i; e++) {
                        var n = this.bones[e] ? this.bones[e].matrixWorld : this.identityMatrix;
                        t.multiplyMatrices(n, this.boneInverses[e]), t.toArray(this.boneMatrices, 16 * e) }
                    this.useVertexTexture && (this.boneTexture.needsUpdate = !0) } }(), clone: function() {
                return new de(this.bones, this.boneInverses, this.useVertexTexture) } }), fe.prototype = Object.assign(Object.create(ht.prototype), { constructor: fe, isBone: !0 }), me.prototype = Object.assign(Object.create(At.prototype), { constructor: me, isSkinnedMesh: !0, bind: function(t, e) { this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.getInverse(e) }, pose: function() { this.skeleton.pose() }, normalizeSkinWeights: function() {
                if (this.geometry && this.geometry.isGeometry)
                    for (var t = 0; t < this.geometry.skinWeights.length; t++) {
                        var e = this.geometry.skinWeights[t],
                            i = 1 / e.lengthManhattan();
                        i !== 1 / 0 ? e.multiplyScalar(i) : e.set(1, 0, 0, 0) } else if (this.geometry && this.geometry.isBufferGeometry)
                        for (var n = new r, a = this.geometry.attributes.skinWeight, t = 0; t < a.count; t++) { n.x = a.getX(t), n.y = a.getY(t), n.z = a.getZ(t), n.w = a.getW(t);
                            var i = 1 / n.lengthManhattan();
                            i !== 1 / 0 ? n.multiplyScalar(i) : n.set(1, 0, 0, 0), a.setXYZW(t, n.x, n.y, n.z, n.w) } }, updateMatrixWorld: function(t) { At.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unrecognized bindMode: " + this.bindMode) }, clone: function() {
                return new this.constructor(this.geometry, this.material, this.skeleton.useVertexTexture).copy(this) } }), ge.prototype = Object.create(J.prototype), ge.prototype.constructor = ge, ge.prototype.isLineBasicMaterial = !0, ge.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this }, ve.prototype = Object.assign(Object.create(ht.prototype), { constructor: ve, isLine: !0, raycast: function() {
                var t = new l,
                    e = new at,
                    i = new tt;
                return function(n, r) {
                    var a = n.linePrecision,
                        o = a * a,
                        s = this.geometry,
                        l = this.matrixWorld;
                    if (null === s.boundingSphere && s.computeBoundingSphere(), i.copy(s.boundingSphere), i.applyMatrix4(l), n.ray.intersectsSphere(i) !== !1) { t.getInverse(l), e.copy(n.ray).applyMatrix4(t);
                        var c = new h,
                            u = new h,
                            p = new h,
                            d = new h,
                            f = this && this.isLineSegments ? 2 : 1;
                        if (s.isBufferGeometry) {
                            var m = s.index,
                                g = s.attributes,
                                v = g.position.array;
                            if (null !== m)
                                for (var y = m.array, _ = 0, x = y.length - 1; _ < x; _ += f) {
                                    var b = y[_],
                                        w = y[_ + 1];
                                    c.fromArray(v, 3 * b), u.fromArray(v, 3 * w);
                                    var M = e.distanceSqToSegment(c, u, d, p);
                                    if (!(M > o)) { d.applyMatrix4(this.matrixWorld);
                                        var T = n.ray.origin.distanceTo(d);
                                        T < n.near || T > n.far || r.push({ distance: T, point: p.clone().applyMatrix4(this.matrixWorld), index: _, face: null, faceIndex: null, object: this }) } } else
                                    for (var _ = 0, x = v.length / 3 - 1; _ < x; _ += f) { c.fromArray(v, 3 * _), u.fromArray(v, 3 * _ + 3);
                                        var M = e.distanceSqToSegment(c, u, d, p);
                                        if (!(M > o)) { d.applyMatrix4(this.matrixWorld);
                                            var T = n.ray.origin.distanceTo(d);
                                            T < n.near || T > n.far || r.push({ distance: T, point: p.clone().applyMatrix4(this.matrixWorld), index: _, face: null, faceIndex: null, object: this }) } } } else if (s.isGeometry)
                            for (var E = s.vertices, S = E.length, _ = 0; _ < S - 1; _ += f) {
                                var M = e.distanceSqToSegment(E[_], E[_ + 1], d, p);
                                if (!(M > o)) { d.applyMatrix4(this.matrixWorld);
                                    var T = n.ray.origin.distanceTo(d);
                                    T < n.near || T > n.far || r.push({ distance: T, point: p.clone().applyMatrix4(this.matrixWorld), index: _, face: null, faceIndex: null, object: this }) } } } } }(), clone: function() {
                return new this.constructor(this.geometry, this.material).copy(this) } }), ye.prototype = Object.assign(Object.create(ve.prototype), { constructor: ye, isLineSegments: !0 }), _e.prototype = Object.create(J.prototype), _e.prototype.constructor = _e, _e.prototype.isPointsMaterial = !0, _e.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this }, xe.prototype = Object.assign(Object.create(ht.prototype), { constructor: xe, isPoints: !0, raycast: function() {
                var t = new l,
                    e = new at,
                    i = new tt;
                return function(n, r) {
                    function a(t, i) {
                        var a = e.distanceSqToPoint(t);
                        if (a < p) {
                            var s = e.closestPointToPoint(t);
                            s.applyMatrix4(l);
                            var h = n.ray.origin.distanceTo(s);
                            if (h < n.near || h > n.far) return;
                            r.push({ distance: h, distanceToRay: Math.sqrt(a), point: s.clone(), index: i, face: null, object: o }) } }
                    var o = this,
                        s = this.geometry,
                        l = this.matrixWorld,
                        c = n.params.Points.threshold;
                    if (null === s.boundingSphere && s.computeBoundingSphere(), i.copy(s.boundingSphere), i.applyMatrix4(l), n.ray.intersectsSphere(i) !== !1) { t.getInverse(l), e.copy(n.ray).applyMatrix4(t);
                        var u = c / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                            p = u * u,
                            d = new h;
                        if (s.isBufferGeometry) {
                            var f = s.index,
                                m = s.attributes,
                                g = m.position.array;
                            if (null !== f)
                                for (var v = f.array, y = 0, _ = v.length; y < _; y++) {
                                    var x = v[y];
                                    d.fromArray(g, 3 * x), a(d, x) } else
                                    for (var y = 0, b = g.length / 3; y < b; y++) d.fromArray(g, 3 * y), a(d, y) } else
                            for (var w = s.vertices, y = 0, b = w.length; y < b; y++) a(w[y], y) } } }(), clone: function() {
                return new this.constructor(this.geometry, this.material).copy(this) } }), be.prototype = Object.assign(Object.create(ht.prototype), { constructor: be }), we.prototype = Object.create(n.prototype), we.prototype.constructor = we, Me.prototype = Object.create(n.prototype), Me.prototype.constructor = Me, Me.prototype.isCompressedTexture = !0, Te.prototype = Object.create(n.prototype), Te.prototype.constructor = Te, Ee.prototype = Object.create(n.prototype), Ee.prototype.constructor = Ee, Ee.prototype.isDepthTexture = !0, Se.prototype = Object.create(St.prototype), Se.prototype.constructor = Se, Ae.prototype = Object.create(St.prototype), Ae.prototype.constructor = Ae, Re.prototype = Object.create(Tt.prototype), Re.prototype.constructor = Re, Le.prototype = Object.create(St.prototype), Le.prototype.constructor = Le, Pe.prototype = Object.create(Le.prototype), Pe.prototype.constructor = Pe, Ce.prototype = Object.create(Tt.prototype), Ce.prototype.constructor = Ce, Ie.prototype = Object.create(Le.prototype), Ie.prototype.constructor = Ie, Oe.prototype = Object.create(Tt.prototype), Oe.prototype.constructor = Oe, De.prototype = Object.create(Le.prototype), De.prototype.constructor = De, Ue.prototype = Object.create(Tt.prototype), Ue.prototype.constructor = Ue, Ne.prototype = Object.create(Le.prototype), Ne.prototype.constructor = Ne, Fe.prototype = Object.create(Tt.prototype), Fe.prototype.constructor = Fe, ze.prototype = Object.create(Tt.prototype), ze.prototype.constructor = ze, Be.prototype = Object.create(St.prototype), Be.prototype.constructor = Be, Ge.prototype = Object.create(Tt.prototype), Ge.prototype.constructor = Ge, ke.prototype = Object.create(St.prototype), ke.prototype.constructor = ke, He.prototype = Object.create(Tt.prototype), He.prototype.constructor = He, je.prototype = Object.create(St.prototype), je.prototype.constructor = je, Ve.prototype = Object.create(Tt.prototype), Ve.prototype.constructor = Ve;
        var ul = {
            area: function(t) {
                for (var e = t.length, i = 0, n = e - 1, r = 0; r < e; n = r++) i += t[n].x * t[r].y - t[r].x * t[n].y;
                return .5 * i },
            triangulate: function() {
                function t(t, e, i, n, r, a) {
                    var o, s, h, l, c, u, p, d, f;
                    if (s = t[a[e]].x, h = t[a[e]].y, l = t[a[i]].x, c = t[a[i]].y, u = t[a[n]].x, p = t[a[n]].y, (l - s) * (p - h) - (c - h) * (u - s) <= 0) return !1;
                    var m, g, v, y, _, x, b, w, M, T, E, S, A, R, L;
                    for (m = u - l, g = p - c, v = s - u, y = h - p, _ = l - s, x = c - h, o = 0; o < r; o++)
                        if (d = t[a[o]].x, f = t[a[o]].y, !(d === s && f === h || d === l && f === c || d === u && f === p) && (b = d - s, w = f - h, M = d - l, T = f - c, E = d - u, S = f - p, L = m * T - g * M, A = _ * w - x * b, R = v * S - y * E, L >= -Number.EPSILON && R >= -Number.EPSILON && A >= -Number.EPSILON)) return !1;
                    return !0 }
                return function(e, i) {
                    var n = e.length;
                    if (n < 3) return null;
                    var r, a, o, s = [],
                        h = [],
                        l = [];
                    if (ul.area(e) > 0)
                        for (a = 0; a < n; a++) h[a] = a;
                    else
                        for (a = 0; a < n; a++) h[a] = n - 1 - a;
                    var c = n,
                        u = 2 * c;
                    for (a = c - 1; c > 2;) {
                        if (u-- <= 0) return console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"), i ? l : s;
                        if (r = a, c <= r && (r = 0), a = r + 1, c <= a && (a = 0), o = a + 1, c <= o && (o = 0), t(e, r, a, o, c, h)) {
                            var p, d, f, m, g;
                            for (p = h[r], d = h[a], f = h[o], s.push([e[p], e[d], e[f]]), l.push([h[r], h[a], h[o]]), m = a, g = a + 1; g < c; m++, g++) h[m] = h[g];
                            c--, u = 2 * c } }
                    return i ? l : s
                }
            }(),
            triangulateShape: function(t, e) {
                function i(t) {
                    var e = t.length;
                    e > 2 && t[e - 1].equals(t[0]) && t.pop() }

                function n(t, e, i) {
                    return t.x !== e.x ? t.x < e.x ? t.x <= i.x && i.x <= e.x : e.x <= i.x && i.x <= t.x : t.y < e.y ? t.y <= i.y && i.y <= e.y : e.y <= i.y && i.y <= t.y }

                function r(t, e, i, r, a) {
                    var o = e.x - t.x,
                        s = e.y - t.y,
                        h = r.x - i.x,
                        l = r.y - i.y,
                        c = t.x - i.x,
                        u = t.y - i.y,
                        p = s * h - o * l,
                        d = s * c - o * u;
                    if (Math.abs(p) > Number.EPSILON) {
                        var f;
                        if (p > 0) {
                            if (d < 0 || d > p) return [];
                            if (f = l * c - h * u, f < 0 || f > p) return [] } else {
                            if (d > 0 || d < p) return [];
                            if (f = l * c - h * u, f > 0 || f < p) return [] }
                        if (0 === f) return !a || 0 !== d && d !== p ? [t] : [];
                        if (f === p) return !a || 0 !== d && d !== p ? [e] : [];
                        if (0 === d) return [i];
                        if (d === p) return [r];
                        var m = f / p;
                        return [{ x: t.x + m * o, y: t.y + m * s }] }
                    if (0 !== d || l * c !== h * u) return [];
                    var g = 0 === o && 0 === s,
                        v = 0 === h && 0 === l;
                    if (g && v) return t.x !== i.x || t.y !== i.y ? [] : [t];
                    if (g) return n(i, r, t) ? [t] : [];
                    if (v) return n(t, e, i) ? [i] : [];
                    var y, _, x, b, w, M, T, E;
                    return 0 !== o ? (t.x < e.x ? (y = t, x = t.x, _ = e, b = e.x) : (y = e, x = e.x, _ = t, b = t.x), i.x < r.x ? (w = i, T = i.x, M = r, E = r.x) : (w = r, T = r.x, M = i, E = i.x)) : (t.y < e.y ? (y = t, x = t.y, _ = e, b = e.y) : (y = e, x = e.y, _ = t, b = t.y), i.y < r.y ? (w = i, T = i.y, M = r, E = r.y) : (w = r, T = r.y, M = i, E = i.y)), x <= T ? b < T ? [] : b === T ? a ? [] : [w] : b <= E ? [w, _] : [w, M] : x > E ? [] : x === E ? a ? [] : [y] : b <= E ? [y, _] : [y, M] }

                function a(t, e, i, n) {
                    var r = e.x - t.x,
                        a = e.y - t.y,
                        o = i.x - t.x,
                        s = i.y - t.y,
                        h = n.x - t.x,
                        l = n.y - t.y,
                        c = r * s - a * o,
                        u = r * l - a * h;
                    if (Math.abs(c) > Number.EPSILON) {
                        var p = h * s - l * o;
                        return c > 0 ? u >= 0 && p >= 0 : u >= 0 || p >= 0 }
                    return u > 0 }

                function o(t, e) {
                    function i(t, e) {
                        var i = y.length - 1,
                            n = t - 1;
                        n < 0 && (n = i);
                        var r = t + 1;
                        r > i && (r = 0);
                        var o = a(y[t], y[n], y[r], s[e]);
                        if (!o) return !1;
                        var h = s.length - 1,
                            l = e - 1;
                        l < 0 && (l = h);
                        var c = e + 1;
                        return c > h && (c = 0), o = a(s[e], s[l], s[c], y[t]), !!o }

                    function n(t, e) {
                        var i, n, a;
                        for (i = 0; i < y.length; i++)
                            if (n = i + 1, n %= y.length, a = r(t, e, y[i], y[n], !0), a.length > 0) return !0;
                        return !1 }

                    function o(t, i) {
                        var n, a, o, s, h;
                        for (n = 0; n < _.length; n++)
                            for (a = e[_[n]], o = 0; o < a.length; o++)
                                if (s = o + 1, s %= a.length, h = r(t, i, a[o], a[s], !0), h.length > 0) return !0;
                        return !1 }
                    for (var s, h, l, c, u, p, d, f, m, g, v, y = t.concat(), _ = [], x = [], b = 0, w = e.length; b < w; b++) _.push(b);
                    for (var M = 0, T = 2 * _.length; _.length > 0;) {
                        if (T--, T < 0) { console.log("Infinite Loop! Holes left:" + _.length + ", Probably Hole outside Shape!");
                            break }
                        for (l = M; l < y.length; l++) { c = y[l], h = -1;
                            for (var b = 0; b < _.length; b++)
                                if (p = _[b], d = c.x + ":" + c.y + ":" + p, void 0 === x[d]) { s = e[p];
                                    for (var E = 0; E < s.length; E++)
                                        if (u = s[E], i(l, E) && !n(c, u) && !o(c, u)) { h = E, _.splice(b, 1), f = y.slice(0, l + 1), m = y.slice(l), g = s.slice(h), v = s.slice(0, h + 1), y = f.concat(g).concat(v).concat(m), M = l;
                                            break }
                                    if (h >= 0) break;
                                    x[d] = !0 }
                            if (h >= 0) break } }
                    return y }
                i(t), e.forEach(i);
                for (var s, h, l, c, u, p, d = {}, f = t.concat(), m = 0, g = e.length; m < g; m++) Array.prototype.push.apply(f, e[m]);
                for (s = 0, h = f.length; s < h; s++) u = f[s].x + ":" + f[s].y, void 0 !== d[u] && console.warn("THREE.ShapeUtils: Duplicate point", u, s), d[u] = s;
                var v = o(t, e),
                    y = ul.triangulate(v, !1);
                for (s = 0, h = y.length; s < h; s++)
                    for (c = y[s], l = 0; l < 3; l++) u = c[l].x + ":" + c[l].y, p = d[u], void 0 !== p && (c[l] = p);
                return y.concat() },
            isClockWise: function(t) {
                return ul.area(t) < 0 },
            b2: function() {
                function t(t, e) {
                    var i = 1 - t;
                    return i * i * e }

                function e(t, e) {
                    return 2 * (1 - t) * t * e }

                function i(t, e) {
                    return t * t * e }
                return function(n, r, a, o) {
                    return t(n, r) + e(n, a) + i(n, o) } }(),
            b3: function() {
                function t(t, e) {
                    var i = 1 - t;
                    return i * i * i * e }

                function e(t, e) {
                    var i = 1 - t;
                    return 3 * i * i * t * e }

                function i(t, e) {
                    var i = 1 - t;
                    return 3 * i * t * t * e }

                function n(t, e) {
                    return t * t * t * e }
                return function(r, a, o, s, h) {
                    return t(r, a) + e(r, o) + i(r, s) + n(r, h) } }()
        };
        We.prototype = Object.create(Tt.prototype), We.prototype.constructor = We, We.prototype.addShapeList = function(t, e) {
            for (var i = t.length, n = 0; n < i; n++) {
                var r = t[n];
                this.addShape(r, e) } }, We.prototype.addShape = function(t, e) {
            function n(t, e, i) {
                return e || console.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(i).add(t) }

            function r(t, e, n) {
                var r, a, o = 1,
                    s = t.x - e.x,
                    h = t.y - e.y,
                    l = n.x - t.x,
                    c = n.y - t.y,
                    u = s * s + h * h,
                    p = s * c - h * l;
                if (Math.abs(p) > Number.EPSILON) {
                    var d = Math.sqrt(u),
                        f = Math.sqrt(l * l + c * c),
                        m = e.x - h / d,
                        g = e.y + s / d,
                        v = n.x - c / f,
                        y = n.y + l / f,
                        _ = ((v - m) * c - (y - g) * l) / (s * c - h * l);
                    r = m + s * _ - t.x, a = g + h * _ - t.y;
                    var x = r * r + a * a;
                    if (x <= 2) return new i(r, a);
                    o = Math.sqrt(x / 2) } else {
                    var b = !1;
                    s > Number.EPSILON ? l > Number.EPSILON && (b = !0) : s < -Number.EPSILON ? l < -Number.EPSILON && (b = !0) : Math.sign(h) === Math.sign(c) && (b = !0), b ? (r = -h, a = s, o = Math.sqrt(u)) : (r = s, a = h, o = Math.sqrt(u / 2)) }
                return new i(r / o, a / o) }

            function a() {
                if (b) {
                    var t = 0,
                        e = V * t;
                    for (Y = 0; Y < W; Y++) j = N[Y], c(j[2] + e, j[1] + e, j[0] + e);
                    for (t = M + 2 * x, e = V * t, Y = 0; Y < W; Y++) j = N[Y], c(j[0] + e, j[1] + e, j[2] + e) } else {
                    for (Y = 0; Y < W; Y++) j = N[Y], c(j[2], j[1], j[0]);
                    for (Y = 0; Y < W; Y++) j = N[Y], c(j[0] + V * M, j[1] + V * M, j[2] + V * M) } }

            function o() {
                var t = 0;
                for (s(F, t), t += F.length, R = 0, L = D.length; R < L; R++) A = D[R], s(A, t), t += A.length }

            function s(t, e) {
                var i, n;
                for (Y = t.length; --Y >= 0;) { i = Y, n = Y - 1, n < 0 && (n = t.length - 1);
                    var r = 0,
                        a = M + 2 * x;
                    for (r = 0; r < a; r++) {
                        var o = V * r,
                            s = V * (r + 1),
                            h = e + i + o,
                            l = e + n + o,
                            c = e + n + s,
                            p = e + i + s;
                        u(h, l, c, p, t, r, a, i, n) } } }

            function l(t, e, i) { P.vertices.push(new h(t, e, i)) }

            function c(t, e, i) { t += C, e += C, i += C, P.faces.push(new ut(t, e, i, null, null, 0));
                var n = S.generateTopUV(P, t, e, i);
                P.faceVertexUvs[0].push(n) }

            function u(t, e, i, n, r, a, o, s, h) { t += C, e += C, i += C, n += C, P.faces.push(new ut(t, e, n, null, null, 1)), P.faces.push(new ut(e, i, n, null, null, 1));
                var l = S.generateSideWallUV(P, t, e, i, n);
                P.faceVertexUvs[0].push([l[0], l[1], l[3]]), P.faceVertexUvs[0].push([l[1], l[2], l[3]]) }
            var p, d, f, m, g, v = void 0 !== e.amount ? e.amount : 100,
                y = void 0 !== e.bevelThickness ? e.bevelThickness : 6,
                _ = void 0 !== e.bevelSize ? e.bevelSize : y - 2,
                x = void 0 !== e.bevelSegments ? e.bevelSegments : 3,
                b = void 0 === e.bevelEnabled || e.bevelEnabled,
                w = void 0 !== e.curveSegments ? e.curveSegments : 12,
                M = void 0 !== e.steps ? e.steps : 1,
                T = e.extrudePath,
                E = !1,
                S = void 0 !== e.UVGenerator ? e.UVGenerator : We.WorldUVGenerator;
            T && (p = T.getSpacedPoints(M), E = !0, b = !1, d = void 0 !== e.frames ? e.frames : T.computeFrenetFrames(M, !1), f = new h, m = new h, g = new h), b || (x = 0, y = 0, _ = 0);
            var A, R, L, P = this,
                C = this.vertices.length,
                I = t.extractPoints(w),
                O = I.shape,
                D = I.holes,
                U = !ul.isClockWise(O);
            if (U) {
                for (O = O.reverse(), R = 0, L = D.length; R < L; R++) A = D[R], ul.isClockWise(A) && (D[R] = A.reverse());
                U = !1 }
            var N = ul.triangulateShape(O, D),
                F = O;
            for (R = 0, L = D.length; R < L; R++) A = D[R], O = O.concat(A);
            for (var z, B, G, k, H, j, V = O.length, W = N.length, X = [], Y = 0, q = F.length, Z = q - 1, J = Y + 1; Y < q; Y++, Z++, J++) Z === q && (Z = 0), J === q && (J = 0), X[Y] = r(F[Y], F[Z], F[J]);
            var Q, K = [],
                $ = X.concat();
            for (R = 0, L = D.length; R < L; R++) {
                for (A = D[R], Q = [], Y = 0, q = A.length, Z = q - 1, J = Y + 1; Y < q; Y++, Z++, J++) Z === q && (Z = 0), J === q && (J = 0), Q[Y] = r(A[Y], A[Z], A[J]);
                K.push(Q), $ = $.concat(Q) }
            for (z = 0; z < x; z++) {
                for (G = z / x, k = y * Math.cos(G * Math.PI / 2), B = _ * Math.sin(G * Math.PI / 2), Y = 0, q = F.length; Y < q; Y++) H = n(F[Y], X[Y], B), l(H.x, H.y, -k);
                for (R = 0, L = D.length; R < L; R++)
                    for (A = D[R], Q = K[R], Y = 0, q = A.length; Y < q; Y++) H = n(A[Y], Q[Y], B), l(H.x, H.y, -k) }
            for (B = _, Y = 0; Y < V; Y++) H = b ? n(O[Y], $[Y], B) : O[Y], E ? (m.copy(d.normals[0]).multiplyScalar(H.x), f.copy(d.binormals[0]).multiplyScalar(H.y), g.copy(p[0]).add(m).add(f), l(g.x, g.y, g.z)) : l(H.x, H.y, 0);
            var tt;
            for (tt = 1; tt <= M; tt++)
                for (Y = 0; Y < V; Y++) H = b ? n(O[Y], $[Y], B) : O[Y], E ? (m.copy(d.normals[tt]).multiplyScalar(H.x), f.copy(d.binormals[tt]).multiplyScalar(H.y), g.copy(p[tt]).add(m).add(f), l(g.x, g.y, g.z)) : l(H.x, H.y, v / M * tt);
            for (z = x - 1; z >= 0; z--) {
                for (G = z / x, k = y * Math.cos(G * Math.PI / 2), B = _ * Math.sin(G * Math.PI / 2), Y = 0, q = F.length; Y < q; Y++) H = n(F[Y], X[Y], B), l(H.x, H.y, v + k);
                for (R = 0, L = D.length; R < L; R++)
                    for (A = D[R], Q = K[R], Y = 0, q = A.length; Y < q; Y++) H = n(A[Y], Q[Y], B), E ? l(H.x, H.y + p[M - 1].y, p[M - 1].x + k) : l(H.x, H.y, v + k) }
            a(), o() }, We.WorldUVGenerator = { generateTopUV: function(t, e, n, r) {
                var a = t.vertices,
                    o = a[e],
                    s = a[n],
                    h = a[r];
                return [new i(o.x, o.y), new i(s.x, s.y), new i(h.x, h.y)] }, generateSideWallUV: function(t, e, n, r, a) {
                var o = t.vertices,
                    s = o[e],
                    h = o[n],
                    l = o[r],
                    c = o[a];
                return Math.abs(s.y - h.y) < .01 ? [new i(s.x, 1 - s.z), new i(h.x, 1 - h.z), new i(l.x, 1 - l.z), new i(c.x, 1 - c.z)] : [new i(s.y, 1 - s.z), new i(h.y, 1 - h.z), new i(l.y, 1 - l.z), new i(c.y, 1 - c.z)] } }, Xe.prototype = Object.create(We.prototype), Xe.prototype.constructor = Xe, Ye.prototype = Object.create(St.prototype), Ye.prototype.constructor = Ye, qe.prototype = Object.create(Tt.prototype), qe.prototype.constructor = qe, Ze.prototype = Object.create(St.prototype), Ze.prototype.constructor = Ze, Je.prototype = Object.create(Tt.prototype), Je.prototype.constructor = Je, Qe.prototype = Object.create(Tt.prototype), Qe.prototype.constructor = Qe, Ke.prototype = Object.create(St.prototype), Ke.prototype.constructor = Ke, $e.prototype = Object.create(Tt.prototype), $e.prototype.constructor = $e, ti.prototype = Object.create(St.prototype), ti.prototype.constructor = ti, ei.prototype = Object.create(Tt.prototype), ei.prototype.constructor = ei, ii.prototype = Object.create(St.prototype), ii.prototype.constructor = ii, ni.prototype = Object.create(St.prototype), ni.prototype.constructor = ni, ri.prototype = Object.create(Tt.prototype), ri.prototype.constructor = ri, ai.prototype = Object.create(ri.prototype), ai.prototype.constructor = ai, oi.prototype = Object.create(ni.prototype), oi.prototype.constructor = oi, si.prototype = Object.create(St.prototype), si.prototype.constructor = si, hi.prototype = Object.create(Tt.prototype), hi.prototype.constructor = hi, li.prototype = Object.create(Tt.prototype), li.prototype.constructor = li;
        var pl = Object.freeze({ WireframeGeometry: Se, ParametricGeometry: Re, ParametricBufferGeometry: Ae, TetrahedronGeometry: Ce, TetrahedronBufferGeometry: Pe, OctahedronGeometry: Oe, OctahedronBufferGeometry: Ie, IcosahedronGeometry: Ue, IcosahedronBufferGeometry: De, DodecahedronGeometry: Fe, DodecahedronBufferGeometry: Ne, PolyhedronGeometry: ze, PolyhedronBufferGeometry: Le, TubeGeometry: Ge, TubeBufferGeometry: Be, TorusKnotGeometry: He, TorusKnotBufferGeometry: ke, TorusGeometry: Ve, TorusBufferGeometry: je, TextGeometry: Xe, SphereBufferGeometry: Ye, SphereGeometry: qe, RingGeometry: Je, RingBufferGeometry: Ze, PlaneBufferGeometry: Lt, PlaneGeometry: Qe, LatheGeometry: $e, LatheBufferGeometry: Ke, ShapeGeometry: ei, ShapeBufferGeometry: ti, ExtrudeGeometry: We, EdgesGeometry: ii, ConeGeometry: ai, ConeBufferGeometry: oi, CylinderGeometry: ri, CylinderBufferGeometry: ni, CircleBufferGeometry: si, CircleGeometry: hi, BoxBufferGeometry: Rt, BoxGeometry: li });
        ci.prototype = Object.create(Q.prototype), ci.prototype.constructor = ci, ci.prototype.isShadowMaterial = !0, ui.prototype = Object.create(Q.prototype), ui.prototype.constructor = ui, ui.prototype.isRawShaderMaterial = !0, pi.prototype = { constructor: pi, isMultiMaterial: !0, toJSON: function(t) {
                for (var e = { metadata: { version: 4.2, type: "material", generator: "MaterialExporter" }, uuid: this.uuid, type: this.type, materials: [] }, i = this.materials, n = 0, r = i.length; n < r; n++) {
                    var a = i[n].toJSON(t);
                    delete a.metadata, e.materials.push(a) }
                return e.visible = this.visible, e }, clone: function() {
                for (var t = new this.constructor, e = 0; e < this.materials.length; e++) t.materials.push(this.materials[e].clone());
                return t.visible = this.visible, t } }, di.prototype = Object.create(J.prototype), di.prototype.constructor = di, di.prototype.isMeshStandardMaterial = !0, di.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this }, fi.prototype = Object.create(di.prototype), fi.prototype.constructor = fi, fi.prototype.isMeshPhysicalMaterial = !0, fi.prototype.copy = function(t) {
            return di.prototype.copy.call(this, t), this.defines = { PHYSICAL: "" }, this.reflectivity = t.reflectivity, this.clearCoat = t.clearCoat, this.clearCoatRoughness = t.clearCoatRoughness, this }, mi.prototype = Object.create(J.prototype), mi.prototype.constructor = mi, mi.prototype.isMeshPhongMaterial = !0, mi.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this }, gi.prototype = Object.create(mi.prototype), gi.prototype.constructor = gi, gi.prototype.isMeshToonMaterial = !0, gi.prototype.copy = function(t) {
            return mi.prototype.copy.call(this, t), this.gradientMap = t.gradientMap, this }, vi.prototype = Object.create(J.prototype), vi.prototype.constructor = vi, vi.prototype.isMeshNormalMaterial = !0, vi.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this }, yi.prototype = Object.create(J.prototype), yi.prototype.constructor = yi, yi.prototype.isMeshLambertMaterial = !0, yi.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this }, _i.prototype = Object.create(J.prototype), _i.prototype.constructor = _i, _i.prototype.isLineDashedMaterial = !0, _i.prototype.copy = function(t) {
            return J.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.scale = t.scale, this.dashSize = t.dashSize, this.gapSize = t.gapSize, this };
        var dl = Object.freeze({ ShadowMaterial: ci, SpriteMaterial: ce, RawShaderMaterial: ui, ShaderMaterial: Q, PointsMaterial: _e, MultiMaterial: pi, MeshPhysicalMaterial: fi, MeshStandardMaterial: di, MeshPhongMaterial: mi, MeshToonMaterial: gi, MeshNormalMaterial: vi, MeshLambertMaterial: yi, MeshDepthMaterial: K, MeshBasicMaterial: pt, LineDashedMaterial: _i, LineBasicMaterial: ge, Material: J }),
            fl = { enabled: !1, files: {}, add: function(t, e) { this.enabled !== !1 && (this.files[t] = e) }, get: function(t) {
                    if (this.enabled !== !1) return this.files[t] }, remove: function(t) { delete this.files[t] }, clear: function() { this.files = {} } },
            ml = new xi;
        Object.assign(bi.prototype, { load: function(t, e, i, n) { void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t);
                var r = this,
                    a = fl.get(t);
                if (void 0 !== a) return r.manager.itemStart(t), setTimeout(function() { e && e(a), r.manager.itemEnd(t) }, 0), a;
                var o = /^data:(.*?)(;base64)?,(.*)$/,
                    s = t.match(o);
                if (s) {
                    var h = s[1],
                        l = !!s[2],
                        c = s[3];
                    c = window.decodeURIComponent(c), l && (c = window.atob(c));
                    try {
                        var u, p = (this.responseType || "").toLowerCase();
                        switch (p) {
                            case "arraybuffer":
                            case "blob":
                                u = new ArrayBuffer(c.length);
                                for (var d = new Uint8Array(u), f = 0; f < c.length; f++) d[f] = c.charCodeAt(f); "blob" === p && (u = new Blob([u], { type: h }));
                                break;
                            case "document":
                                var m = new DOMParser;
                                u = m.parseFromString(c, h);
                                break;
                            case "json":
                                u = JSON.parse(c);
                                break;
                            default:
                                u = c }
                        window.setTimeout(function() { e && e(u), r.manager.itemEnd(t) }, 0) } catch (e) { window.setTimeout(function() { n && n(e), r.manager.itemError(t) }, 0) } } else {
                    var g = new XMLHttpRequest;
                    g.open("GET", t, !0), g.addEventListener("load", function(i) {
                        var a = i.target.response;
                        fl.add(t, a), 200 === this.status ? (e && e(a), r.manager.itemEnd(t)) : 0 === this.status ? (console.warn("THREE.FileLoader: HTTP Status 0 received."), e && e(a), r.manager.itemEnd(t)) : (n && n(i), r.manager.itemError(t)) }, !1), void 0 !== i && g.addEventListener("progress", function(t) { i(t) }, !1), g.addEventListener("error", function(e) { n && n(e), r.manager.itemError(t) }, !1), void 0 !== this.responseType && (g.responseType = this.responseType), void 0 !== this.withCredentials && (g.withCredentials = this.withCredentials), g.overrideMimeType && g.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain"), g.send(null) }
                return r.manager.itemStart(t), g }, setPath: function(t) {
                return this.path = t, this }, setResponseType: function(t) {
                return this.responseType = t, this }, setWithCredentials: function(t) {
                return this.withCredentials = t, this }, setMimeType: function(t) {
                return this.mimeType = t, this } }), Object.assign(wi.prototype, { load: function(t, e, i, n) {
                function r(r) { h.load(t[r], function(t) {
                        var i = a._parser(t, !0);
                        o[r] = { width: i.width, height: i.height, format: i.format, mipmaps: i.mipmaps }, l += 1, 6 === l && (1 === i.mipmapCount && (s.minFilter = Za), s.format = i.format, s.needsUpdate = !0, e && e(s)) }, i, n) }
                var a = this,
                    o = [],
                    s = new Me;
                s.image = o;
                var h = new bi(this.manager);
                if (h.setPath(this.path), h.setResponseType("arraybuffer"), Array.isArray(t))
                    for (var l = 0, c = 0, u = t.length; c < u; ++c) r(c);
                else h.load(t, function(t) {
                    var i = a._parser(t, !0);
                    if (i.isCubemap)
                        for (var n = i.mipmaps.length / i.mipmapCount, r = 0; r < n; r++) { o[r] = { mipmaps: [] };
                            for (var h = 0; h < i.mipmapCount; h++) o[r].mipmaps.push(i.mipmaps[r * i.mipmapCount + h]), o[r].format = i.format, o[r].width = i.width, o[r].height = i.height } else s.image.width = i.width, s.image.height = i.height, s.mipmaps = i.mipmaps;
                    1 === i.mipmapCount && (s.minFilter = Za), s.format = i.format, s.needsUpdate = !0, e && e(s) }, i, n);
                return s }, setPath: function(t) {
                return this.path = t, this } });
        var gl = Mi;
        Object.assign(Mi.prototype, { load: function(t, e, i, n) {
                var r = this,
                    a = new X,
                    o = new bi(this.manager);
                return o.setResponseType("arraybuffer"), o.load(t, function(t) {
                    var i = r._parser(t);
                    i && (void 0 !== i.image ? a.image = i.image : void 0 !== i.data && (a.image.width = i.width, a.image.height = i.height, a.image.data = i.data), a.wrapS = void 0 !== i.wrapS ? i.wrapS : ja, a.wrapT = void 0 !== i.wrapT ? i.wrapT : ja, a.magFilter = void 0 !== i.magFilter ? i.magFilter : Za, a.minFilter = void 0 !== i.minFilter ? i.minFilter : Qa, a.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1, void 0 !== i.format && (a.format = i.format), void 0 !== i.type && (a.type = i.type), void 0 !== i.mipmaps && (a.mipmaps = i.mipmaps), 1 === i.mipmapCount && (a.minFilter = Za), a.needsUpdate = !0, e && e(a, i)) }, i, n), a } }), Object.assign(Ti.prototype, { load: function(t, e, i, n) {
                var r = this,
                    a = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
                if (a.onload = function() { a.onload = null, URL.revokeObjectURL(a.src), e && e(a), r.manager.itemEnd(t) }, a.onerror = n, 0 === t.indexOf("data:")) a.src = t;
                else if (void 0 !== this.crossOrigin) a.crossOrigin = this.crossOrigin, a.src = t;
                else {
                    var o = new bi;
                    o.setPath(this.path), o.setResponseType("blob"), o.setWithCredentials(this.withCredentials), o.load(t, function(t) { a.src = URL.createObjectURL(t) }, i, n) }
                return r.manager.itemStart(t), a }, setCrossOrigin: function(t) {
                return this.crossOrigin = t, this }, setWithCredentials: function(t) {
                return this.withCredentials = t, this }, setPath: function(t) {
                return this.path = t, this } }), Object.assign(Ei.prototype, { load: function(t, e, i, n) {
                function r(i) { o.load(t[i], function(t) { a.images[i] = t, s++, 6 === s && (a.needsUpdate = !0, e && e(a)) }, void 0, n) }
                var a = new c,
                    o = new Ti(this.manager);
                o.setCrossOrigin(this.crossOrigin), o.setPath(this.path);
                for (var s = 0, h = 0; h < t.length; ++h) r(h);
                return a }, setCrossOrigin: function(t) {
                return this.crossOrigin = t, this }, setPath: function(t) {
                return this.path = t, this } }), Object.assign(Si.prototype, { load: function(t, e, i, r) {
                var a = new n,
                    o = new Ti(this.manager);
                return o.setCrossOrigin(this.crossOrigin), o.setWithCredentials(this.withCredentials), o.setPath(this.path), o.load(t, function(i) {
                    var n = t.search(/\.(jpg|jpeg)$/) > 0 || 0 === t.search(/^data\:image\/jpeg/);
                    a.format = n ? po : fo, a.image = i, a.needsUpdate = !0, void 0 !== e && e(a) }, i, r), a }, setCrossOrigin: function(t) {
                return this.crossOrigin = t, this }, setWithCredentials: function(t) {
                return this.withCredentials = t, this }, setPath: function(t) {
                return this.path = t, this } }), Ai.prototype = Object.assign(Object.create(ht.prototype), { constructor: Ai, isLight: !0, copy: function(t) {
                return ht.prototype.copy.call(this, t), this.color.copy(t.color), this.intensity = t.intensity, this }, toJSON: function(t) {
                var e = ht.prototype.toJSON.call(this, t);
                return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e } }), Ri.prototype = Object.assign(Object.create(Ai.prototype), { constructor: Ri, isHemisphereLight: !0, copy: function(t) {
                return Ai.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this } }), Object.assign(Li.prototype, { copy: function(t) {
                return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this }, clone: function() {
                return (new this.constructor).copy(this) }, toJSON: function() {
                var t = {};
                return 0 !== this.bias && (t.bias = this.bias), 1 !== this.radius && (t.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t } }), Pi.prototype = Object.assign(Object.create(Li.prototype), { constructor: Pi, isSpotLightShadow: !0, update: function(t) {
                var e = 2 * Qo.RAD2DEG * t.angle,
                    i = this.mapSize.width / this.mapSize.height,
                    n = t.distance || 500,
                    r = this.camera;
                e === r.fov && i === r.aspect && n === r.far || (r.fov = e, r.aspect = i, r.far = n, r.updateProjectionMatrix()) } }), Ci.prototype = Object.assign(Object.create(Ai.prototype), { constructor: Ci, isSpotLight: !0, copy: function(t) {
                return Ai.prototype.copy.call(this, t), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.shadow = t.shadow.clone(), this } }), Ii.prototype = Object.assign(Object.create(Ai.prototype), { constructor: Ii, isPointLight: !0, copy: function(t) {
                return Ai.prototype.copy.call(this, t), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this } }), Oi.prototype = Object.assign(Object.create(Li.prototype), { constructor: Oi }), Di.prototype = Object.assign(Object.create(Ai.prototype), { constructor: Di, isDirectionalLight: !0, copy: function(t) {
                return Ai.prototype.copy.call(this, t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this } }), Ui.prototype = Object.assign(Object.create(Ai.prototype), { constructor: Ui, isAmbientLight: !0 });
        var vl = { arraySlice: function(t, e, i) {
                return vl.isTypedArray(t) ? new t.constructor(t.subarray(e, i)) : t.slice(e, i) }, convertArray: function(t, e, i) {
                return !t || !i && t.constructor === e ? t : "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t) }, isTypedArray: function(t) {
                return ArrayBuffer.isView(t) && !(t instanceof DataView) }, getKeyframeOrder: function(t) {
                function e(e, i) {
                    return t[e] - t[i] }
                for (var i = t.length, n = new Array(i), r = 0; r !== i; ++r) n[r] = r;
                return n.sort(e), n }, sortedArray: function(t, e, i) {
                for (var n = t.length, r = new t.constructor(n), a = 0, o = 0; o !== n; ++a)
                    for (var s = i[a] * e, h = 0; h !== e; ++h) r[o++] = t[s + h];
                return r }, flattenJSON: function(t, e, i, n) {
                for (var r = 1, a = t[0]; void 0 !== a && void 0 === a[n];) a = t[r++];
                if (void 0 !== a) {
                    var o = a[n];
                    if (void 0 !== o)
                        if (Array.isArray(o)) { do o = a[n], void 0 !== o && (e.push(a.time), i.push.apply(i, o)), a = t[r++]; while (void 0 !== a) } else if (void 0 !== o.toArray) { do o = a[n], void 0 !== o && (e.push(a.time), o.toArray(i, i.length)), a = t[r++]; while (void 0 !== a) } else
                        do o = a[n], void 0 !== o && (e.push(a.time), i.push(o)), a = t[r++]; while (void 0 !== a) } } };
        Ni.prototype = { constructor: Ni, evaluate: function(t) {
                var e = this.parameterPositions,
                    i = this._cachedIndex,
                    n = e[i],
                    r = e[i - 1];
                t: { e: {
                        var a;i: { n: if (!(t < n)) {
                                for (var o = i + 2;;) {
                                    if (void 0 === n) {
                                        if (t < r) break n;
                                        return i = e.length, this._cachedIndex = i, this.afterEnd_(i - 1, t, r) }
                                    if (i === o) break;
                                    if (r = n, n = e[++i], t < n) break e }
                                a = e.length;
                                break i } {
                                if (t >= r) break t;
                                var s = e[1];
                                t < s && (i = 2, r = s);
                                for (var o = i - 2;;) {
                                    if (void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, n);
                                    if (i === o) break;
                                    if (n = r, r = e[--i - 1], t >= r) break e }
                                a = i, i = 0 } }
                        for (; i < a;) {
                            var h = i + a >>> 1;
                            t < e[h] ? a = h : i = h + 1 }
                        if (n = e[i], r = e[i - 1], void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, n);
                        if (void 0 === n) return i = e.length, this._cachedIndex = i, this.afterEnd_(i - 1, r, t) }
                    this._cachedIndex = i, this.intervalChanged_(i, r, n) }
                return this.interpolate_(i, r, t, n) }, settings: null, DefaultSettings_: {}, getSettings_: function() {
                return this.settings || this.DefaultSettings_ }, copySampleValue_: function(t) {
                for (var e = this.resultBuffer, i = this.sampleValues, n = this.valueSize, r = t * n, a = 0; a !== n; ++a) e[a] = i[r + a];
                return e }, interpolate_: function(t, e, i, n) {
                throw new Error("call to abstract method") }, intervalChanged_: function(t, e, i) {} }, Object.assign(Ni.prototype, { beforeStart_: Ni.prototype.copySampleValue_, afterEnd_: Ni.prototype.copySampleValue_ }), Fi.prototype = Object.assign(Object.create(Ni.prototype), { constructor: Fi, DefaultSettings_: { endingStart: Uo, endingEnd: Uo }, intervalChanged_: function(t, e, i) {
                var n = this.parameterPositions,
                    r = t - 2,
                    a = t + 1,
                    o = n[r],
                    s = n[a];
                if (void 0 === o) switch (this.getSettings_().endingStart) {
                    case No:
                        r = t, o = 2 * e - i;
                        break;
                    case Fo:
                        r = n.length - 2, o = e + n[r] - n[r + 1];
                        break;
                    default:
                        r = t, o = i }
                if (void 0 === s) switch (this.getSettings_().endingEnd) {
                    case No:
                        a = t, s = 2 * i - e;
                        break;
                    case Fo:
                        a = 1, s = i + n[1] - n[0];
                        break;
                    default:
                        a = t - 1, s = e }
                var h = .5 * (i - e),
                    l = this.valueSize;
                this._weightPrev = h / (e - o), this._weightNext = h / (s - i), this._offsetPrev = r * l, this._offsetNext = a * l }, interpolate_: function(t, e, i, n) {
                for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = t * o, h = s - o, l = this._offsetPrev, c = this._offsetNext, u = this._weightPrev, p = this._weightNext, d = (i - e) / (n - e), f = d * d, m = f * d, g = -u * m + 2 * u * f - u * d, v = (1 + u) * m + (-1.5 - 2 * u) * f + (-.5 + u) * d + 1, y = (-1 - p) * m + (1.5 + p) * f + .5 * d, _ = p * m - p * f, x = 0; x !== o; ++x) r[x] = g * a[l + x] + v * a[h + x] + y * a[s + x] + _ * a[c + x];
                return r } }), zi.prototype = Object.assign(Object.create(Ni.prototype), { constructor: zi, interpolate_: function(t, e, i, n) {
                for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = t * o, h = s - o, l = (i - e) / (n - e), c = 1 - l, u = 0; u !== o; ++u) r[u] = a[h + u] * c + a[s + u] * l;
                return r } }), Bi.prototype = Object.assign(Object.create(Ni.prototype), { constructor: Bi, interpolate_: function(t, e, i, n) {
                return this.copySampleValue_(t - 1) } });
        var yl;
        yl = { TimeBufferType: Float32Array, ValueBufferType: Float32Array, DefaultInterpolation: Oo, InterpolantFactoryMethodDiscrete: function(t) {
                return new Bi(this.times, this.values, this.getValueSize(), t) }, InterpolantFactoryMethodLinear: function(t) {
                return new zi(this.times, this.values, this.getValueSize(), t) }, InterpolantFactoryMethodSmooth: function(t) {
                return new Fi(this.times, this.values, this.getValueSize(), t) }, setInterpolation: function(t) {
                var e;
                switch (t) {
                    case Io:
                        e = this.InterpolantFactoryMethodDiscrete;
                        break;
                    case Oo:
                        e = this.InterpolantFactoryMethodLinear;
                        break;
                    case Do:
                        e = this.InterpolantFactoryMethodSmooth }
                if (void 0 === e) {
                    var i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                    if (void 0 === this.createInterpolant) {
                        if (t === this.DefaultInterpolation) throw new Error(i);
                        this.setInterpolation(this.DefaultInterpolation) }
                    return void console.warn(i) }
                this.createInterpolant = e }, getInterpolation: function() {
                switch (this.createInterpolant) {
                    case this.InterpolantFactoryMethodDiscrete:
                        return Io;
                    case this.InterpolantFactoryMethodLinear:
                        return Oo;
                    case this.InterpolantFactoryMethodSmooth:
                        return Do } }, getValueSize: function() {
                return this.values.length / this.times.length }, shift: function(t) {
                if (0 !== t)
                    for (var e = this.times, i = 0, n = e.length; i !== n; ++i) e[i] += t;
                return this }, scale: function(t) {
                if (1 !== t)
                    for (var e = this.times, i = 0, n = e.length; i !== n; ++i) e[i] *= t;
                return this }, trim: function(t, e) {
                for (var i = this.times, n = i.length, r = 0, a = n - 1; r !== n && i[r] < t;) ++r;
                for (; a !== -1 && i[a] > e;) --a;
                if (++a, 0 !== r || a !== n) { r >= a && (a = Math.max(a, 1), r = a - 1);
                    var o = this.getValueSize();
                    this.times = vl.arraySlice(i, r, a), this.values = vl.arraySlice(this.values, r * o, a * o) }
                return this }, validate: function() {
                var t = !0,
                    e = this.getValueSize();
                e - Math.floor(e) !== 0 && (console.error("invalid value size in track", this), t = !1);
                var i = this.times,
                    n = this.values,
                    r = i.length;
                0 === r && (console.error("track is empty", this), t = !1);
                for (var a = null, o = 0; o !== r; o++) {
                    var s = i[o];
                    if ("number" == typeof s && isNaN(s)) { console.error("time is not a valid number", this, o, s), t = !1;
                        break }
                    if (null !== a && a > s) { console.error("out of order keys", this, o, s, a), t = !1;
                        break }
                    a = s }
                if (void 0 !== n && vl.isTypedArray(n))
                    for (var o = 0, h = n.length; o !== h; ++o) {
                        var l = n[o];
                        if (isNaN(l)) { console.error("value is not a valid number", this, o, l), t = !1;
                            break } }
                return t }, optimize: function() {
                for (var t = this.times, e = this.values, i = this.getValueSize(), n = this.getInterpolation() === Do, r = 1, a = t.length - 1, o = 1; o < a; ++o) {
                    var s = !1,
                        h = t[o],
                        l = t[o + 1];
                    if (h !== l && (1 !== o || h !== h[0]))
                        if (n) s = !0;
                        else
                            for (var c = o * i, u = c - i, p = c + i, d = 0; d !== i; ++d) {
                                var f = e[c + d];
                                if (f !== e[u + d] || f !== e[p + d]) { s = !0;
                                    break } }
                        if (s) {
                            if (o !== r) { t[r] = t[o];
                                for (var m = o * i, g = r * i, d = 0; d !== i; ++d) e[g + d] = e[m + d] }++r } }
                if (a > 0) { t[r] = t[a];
                    for (var m = a * i, g = r * i, d = 0; d !== i; ++d) e[g + d] = e[m + d];++r }
                return r !== t.length && (this.times = vl.arraySlice(t, 0, r), this.values = vl.arraySlice(e, 0, r * i)), this } }, ki.prototype = Object.assign(Object.create(yl), { constructor: ki, ValueTypeName: "vector" }), Hi.prototype = Object.assign(Object.create(Ni.prototype), { constructor: Hi, interpolate_: function(t, e, i, n) {
                for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, h = t * o, l = (i - e) / (n - e), c = h + o; h !== c; h += 4) s.slerpFlat(r, 0, a, h - o, a, h, l);
                return r } }), ji.prototype = Object.assign(Object.create(yl), { constructor: ji, ValueTypeName: "quaternion", DefaultInterpolation: Oo, InterpolantFactoryMethodLinear: function(t) {
                return new Hi(this.times, this.values, this.getValueSize(), t) }, InterpolantFactoryMethodSmooth: void 0 }), Vi.prototype = Object.assign(Object.create(yl), { constructor: Vi, ValueTypeName: "number" }), Wi.prototype = Object.assign(Object.create(yl), { constructor: Wi, ValueTypeName: "string", ValueBufferType: Array, DefaultInterpolation: Io, InterpolantFactoryMethodLinear: void 0, InterpolantFactoryMethodSmooth: void 0 }), Xi.prototype = Object.assign(Object.create(yl), { constructor: Xi, ValueTypeName: "bool", ValueBufferType: Array, DefaultInterpolation: Io, InterpolantFactoryMethodLinear: void 0, InterpolantFactoryMethodSmooth: void 0 }), Yi.prototype = Object.assign(Object.create(yl), { constructor: Yi, ValueTypeName: "color" }), qi.prototype = yl, yl.constructor = qi, Object.assign(qi, {
            parse: function(t) {
                if (void 0 === t.type) throw new Error("track type undefined, can not parse");
                var e = qi._getTrackTypeForValueTypeName(t.type);
                if (void 0 === t.times) {
                    var i = [],
                        n = [];
                    vl.flattenJSON(t.keys, i, n, "value"), t.times = i, t.values = n }
                return void 0 !== e.parse ? e.parse(t) : new e(t.name, t.times, t.values, t.interpolation) },
            toJSON: function(t) {
                var e, i = t.constructor;
                if (void 0 !== i.toJSON) e = i.toJSON(t);
                else { e = { name: t.name, times: vl.convertArray(t.times, Array), values: vl.convertArray(t.values, Array) };
                    var n = t.getInterpolation();
                    n !== t.DefaultInterpolation && (e.interpolation = n) }
                return e.type = t.ValueTypeName, e },
            _getTrackTypeForValueTypeName: function(t) {
                switch (t.toLowerCase()) {
                    case "scalar":
                    case "double":
                    case "float":
                    case "number":
                    case "integer":
                        return Vi;
                    case "vector":
                    case "vector2":
                    case "vector3":
                    case "vector4":
                        return ki;
                    case "color":
                        return Yi;
                    case "quaternion":
                        return ji;
                    case "bool":
                    case "boolean":
                        return Xi;
                    case "string":
                        return Wi
                }
                throw new Error("Unsupported typeName: " + t)
            }
        }), Zi.prototype = { constructor: Zi, resetDuration: function() {
                for (var t = this.tracks, e = 0, i = 0, n = t.length; i !== n; ++i) {
                    var r = this.tracks[i];
                    e = Math.max(e, r.times[r.times.length - 1]) }
                this.duration = e }, trim: function() {
                for (var t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration);
                return this }, optimize: function() {
                for (var t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
                return this } }, Object.assign(Zi, { parse: function(t) {
                for (var e = [], i = t.tracks, n = 1 / (t.fps || 1), r = 0, a = i.length; r !== a; ++r) e.push(qi.parse(i[r]).scale(n));
                return new Zi(t.name, t.duration, e) }, toJSON: function(t) {
                for (var e = [], i = t.tracks, n = { name: t.name, duration: t.duration, tracks: e }, r = 0, a = i.length; r !== a; ++r) e.push(qi.toJSON(i[r]));
                return n }, CreateFromMorphTargetSequence: function(t, e, i, n) {
                for (var r = e.length, a = [], o = 0; o < r; o++) {
                    var s = [],
                        h = [];
                    s.push((o + r - 1) % r, o, (o + 1) % r), h.push(0, 1, 0);
                    var l = vl.getKeyframeOrder(s);
                    s = vl.sortedArray(s, 1, l), h = vl.sortedArray(h, 1, l), n || 0 !== s[0] || (s.push(r), h.push(h[0])), a.push(new Vi(".morphTargetInfluences[" + e[o].name + "]", s, h).scale(1 / i)) }
                return new Zi(t, -1, a) }, findByName: function(t, e) {
                var i = t;
                if (!Array.isArray(t)) {
                    var n = t;
                    i = n.geometry && n.geometry.animations || n.animations }
                for (var r = 0; r < i.length; r++)
                    if (i[r].name === e) return i[r];
                return null }, CreateClipsFromMorphTargetSequences: function(t, e, i) {
                for (var n = {}, r = /^([\w-]*?)([\d]+)$/, a = 0, o = t.length; a < o; a++) {
                    var s = t[a],
                        h = s.name.match(r);
                    if (h && h.length > 1) {
                        var l = h[1],
                            c = n[l];
                        c || (n[l] = c = []), c.push(s) } }
                var u = [];
                for (var l in n) u.push(Zi.CreateFromMorphTargetSequence(l, n[l], e, i));
                return u }, parseAnimation: function(t, e) {
                if (!t) return console.error("  no animation in JSONLoader data"), null;
                for (var i = function(t, e, i, n, r) {
                        if (0 !== i.length) {
                            var a = [],
                                o = [];
                            vl.flattenJSON(i, a, o, n), 0 !== a.length && r.push(new t(e, a, o)) } }, n = [], r = t.name || "default", a = t.length || -1, o = t.fps || 30, s = t.hierarchy || [], h = 0; h < s.length; h++) {
                    var l = s[h].keys;
                    if (l && 0 !== l.length)
                        if (l[0].morphTargets) {
                            for (var c = {}, u = 0; u < l.length; u++)
                                if (l[u].morphTargets)
                                    for (var p = 0; p < l[u].morphTargets.length; p++) c[l[u].morphTargets[p]] = -1;
                            for (var d in c) {
                                for (var f = [], m = [], p = 0; p !== l[u].morphTargets.length; ++p) {
                                    var g = l[u];
                                    f.push(g.time), m.push(g.morphTarget === d ? 1 : 0) }
                                n.push(new Vi(".morphTargetInfluence[" + d + "]", f, m)) }
                            a = c.length * (o || 1) } else {
                            var v = ".bones[" + e[h].name + "]";
                            i(ki, v + ".position", l, "pos", n), i(ji, v + ".quaternion", l, "rot", n), i(ki, v + ".scale", l, "scl", n) } }
                if (0 === n.length) return null;
                var y = new Zi(r, a, n);
                return y } }), Object.assign(Ji.prototype, { load: function(t, e, i, n) {
                var r = this,
                    a = new bi(r.manager);
                a.load(t, function(t) { e(r.parse(JSON.parse(t))) }, i, n) }, setTextures: function(t) { this.textures = t }, parse: function(t) {
                function e(t) {
                    return void 0 === n[t] && console.warn("THREE.MaterialLoader: Undefined texture", t), n[t] }
                var n = this.textures,
                    r = new dl[t.type];
                if (void 0 !== t.uuid && (r.uuid = t.uuid), void 0 !== t.name && (r.name = t.name), void 0 !== t.color && r.color.setHex(t.color), void 0 !== t.roughness && (r.roughness = t.roughness), void 0 !== t.metalness && (r.metalness = t.metalness), void 0 !== t.emissive && r.emissive.setHex(t.emissive), void 0 !== t.specular && r.specular.setHex(t.specular), void 0 !== t.shininess && (r.shininess = t.shininess), void 0 !== t.clearCoat && (r.clearCoat = t.clearCoat), void 0 !== t.clearCoatRoughness && (r.clearCoatRoughness = t.clearCoatRoughness), void 0 !== t.uniforms && (r.uniforms = t.uniforms), void 0 !== t.vertexShader && (r.vertexShader = t.vertexShader), void 0 !== t.fragmentShader && (r.fragmentShader = t.fragmentShader), void 0 !== t.vertexColors && (r.vertexColors = t.vertexColors), void 0 !== t.fog && (r.fog = t.fog), void 0 !== t.shading && (r.shading = t.shading), void 0 !== t.blending && (r.blending = t.blending), void 0 !== t.side && (r.side = t.side), void 0 !== t.opacity && (r.opacity = t.opacity), void 0 !== t.transparent && (r.transparent = t.transparent), void 0 !== t.alphaTest && (r.alphaTest = t.alphaTest), void 0 !== t.depthTest && (r.depthTest = t.depthTest), void 0 !== t.depthWrite && (r.depthWrite = t.depthWrite), void 0 !== t.colorWrite && (r.colorWrite = t.colorWrite), void 0 !== t.wireframe && (r.wireframe = t.wireframe), void 0 !== t.wireframeLinewidth && (r.wireframeLinewidth = t.wireframeLinewidth), void 0 !== t.wireframeLinecap && (r.wireframeLinecap = t.wireframeLinecap), void 0 !== t.wireframeLinejoin && (r.wireframeLinejoin = t.wireframeLinejoin), void 0 !== t.skinning && (r.skinning = t.skinning), void 0 !== t.morphTargets && (r.morphTargets = t.morphTargets), void 0 !== t.size && (r.size = t.size), void 0 !== t.sizeAttenuation && (r.sizeAttenuation = t.sizeAttenuation), void 0 !== t.map && (r.map = e(t.map)), void 0 !== t.alphaMap && (r.alphaMap = e(t.alphaMap), r.transparent = !0), void 0 !== t.bumpMap && (r.bumpMap = e(t.bumpMap)), void 0 !== t.bumpScale && (r.bumpScale = t.bumpScale), void 0 !== t.normalMap && (r.normalMap = e(t.normalMap)), void 0 !== t.normalScale) {
                    var a = t.normalScale;
                    Array.isArray(a) === !1 && (a = [a, a]), r.normalScale = (new i).fromArray(a) }
                if (void 0 !== t.displacementMap && (r.displacementMap = e(t.displacementMap)), void 0 !== t.displacementScale && (r.displacementScale = t.displacementScale), void 0 !== t.displacementBias && (r.displacementBias = t.displacementBias), void 0 !== t.roughnessMap && (r.roughnessMap = e(t.roughnessMap)), void 0 !== t.metalnessMap && (r.metalnessMap = e(t.metalnessMap)), void 0 !== t.emissiveMap && (r.emissiveMap = e(t.emissiveMap)), void 0 !== t.emissiveIntensity && (r.emissiveIntensity = t.emissiveIntensity), void 0 !== t.specularMap && (r.specularMap = e(t.specularMap)), void 0 !== t.envMap && (r.envMap = e(t.envMap)), void 0 !== t.reflectivity && (r.reflectivity = t.reflectivity), void 0 !== t.lightMap && (r.lightMap = e(t.lightMap)), void 0 !== t.lightMapIntensity && (r.lightMapIntensity = t.lightMapIntensity), void 0 !== t.aoMap && (r.aoMap = e(t.aoMap)), void 0 !== t.aoMapIntensity && (r.aoMapIntensity = t.aoMapIntensity), void 0 !== t.gradientMap && (r.gradientMap = e(t.gradientMap)), void 0 !== t.materials)
                    for (var o = 0, s = t.materials.length; o < s; o++) r.materials.push(this.parse(t.materials[o]));
                return r } }), Object.assign(Qi.prototype, { load: function(t, e, i, n) {
                var r = this,
                    a = new bi(r.manager);
                a.load(t, function(t) { e(r.parse(JSON.parse(t))) }, i, n) }, parse: function(t) {
                var e = new St,
                    i = t.data.index,
                    n = { Int8Array: Int8Array, Uint8Array: Uint8Array, Uint8ClampedArray: Uint8ClampedArray, Int16Array: Int16Array, Uint16Array: Uint16Array, Int32Array: Int32Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array };
                if (void 0 !== i) {
                    var r = new n[i.type](i.array);
                    e.setIndex(new dt(r, 1)) }
                var a = t.data.attributes;
                for (var o in a) {
                    var s = a[o],
                        r = new n[s.type](s.array);
                    e.addAttribute(o, new dt(r, s.itemSize, s.normalized)) }
                var l = t.data.groups || t.data.drawcalls || t.data.offsets;
                if (void 0 !== l)
                    for (var c = 0, u = l.length; c !== u; ++c) {
                        var p = l[c];
                        e.addGroup(p.start, p.count, p.materialIndex) }
                var d = t.data.boundingSphere;
                if (void 0 !== d) {
                    var f = new h;
                    void 0 !== d.center && f.fromArray(d.center), e.boundingSphere = new tt(f, d.radius) }
                return e } }), Ki.prototype = { constructor: Ki, crossOrigin: void 0, extractUrlBase: function(t) {
                var e = t.split("/");
                return 1 === e.length ? "./" : (e.pop(), e.join("/") + "/") }, initMaterials: function(t, e, i) {
                for (var n = [], r = 0; r < t.length; ++r) n[r] = this.createMaterial(t[r], e, i);
                return n }, createMaterial: function() {
                var t, e, i;
                return function(n, r, a) {
                    function o(t, i, n, o, h) {
                        var l, c = r + t,
                            u = Ki.Handlers.get(c);
                        null !== u ? l = u.load(c) : (e.setCrossOrigin(a), l = e.load(c)), void 0 !== i && (l.repeat.fromArray(i), 1 !== i[0] && (l.wrapS = Ha), 1 !== i[1] && (l.wrapT = Ha)), void 0 !== n && l.offset.fromArray(n), void 0 !== o && ("repeat" === o[0] && (l.wrapS = Ha), "mirror" === o[0] && (l.wrapS = Va), "repeat" === o[1] && (l.wrapT = Ha), "mirror" === o[1] && (l.wrapT = Va)), void 0 !== h && (l.anisotropy = h);
                        var p = Qo.generateUUID();
                        return s[p] = l, p }
                    void 0 === t && (t = new W), void 0 === e && (e = new Si), void 0 === i && (i = new Ji);
                    var s = {},
                        h = { uuid: Qo.generateUUID(), type: "MeshLambertMaterial" };
                    for (var l in n) {
                        var c = n[l];
                        switch (l) {
                            case "DbgColor":
                            case "DbgIndex":
                            case "opticalDensity":
                            case "illumination":
                                break;
                            case "DbgName":
                                h.name = c;
                                break;
                            case "blending":
                                h.blending = ta[c];
                                break;
                            case "colorAmbient":
                            case "mapAmbient":
                                console.warn("THREE.Loader.createMaterial:", l, "is no longer supported.");
                                break;
                            case "colorDiffuse":
                                h.color = t.fromArray(c).getHex();
                                break;
                            case "colorSpecular":
                                h.specular = t.fromArray(c).getHex();
                                break;
                            case "colorEmissive":
                                h.emissive = t.fromArray(c).getHex();
                                break;
                            case "specularCoef":
                                h.shininess = c;
                                break;
                            case "shading":
                                "basic" === c.toLowerCase() && (h.type = "MeshBasicMaterial"), "phong" === c.toLowerCase() && (h.type = "MeshPhongMaterial"), "standard" === c.toLowerCase() && (h.type = "MeshStandardMaterial");
                                break;
                            case "mapDiffuse":
                                h.map = o(c, n.mapDiffuseRepeat, n.mapDiffuseOffset, n.mapDiffuseWrap, n.mapDiffuseAnisotropy);
                                break;
                            case "mapDiffuseRepeat":
                            case "mapDiffuseOffset":
                            case "mapDiffuseWrap":
                            case "mapDiffuseAnisotropy":
                                break;
                            case "mapEmissive":
                                h.emissiveMap = o(c, n.mapEmissiveRepeat, n.mapEmissiveOffset, n.mapEmissiveWrap, n.mapEmissiveAnisotropy);
                                break;
                            case "mapEmissiveRepeat":
                            case "mapEmissiveOffset":
                            case "mapEmissiveWrap":
                            case "mapEmissiveAnisotropy":
                                break;
                            case "mapLight":
                                h.lightMap = o(c, n.mapLightRepeat, n.mapLightOffset, n.mapLightWrap, n.mapLightAnisotropy);
                                break;
                            case "mapLightRepeat":
                            case "mapLightOffset":
                            case "mapLightWrap":
                            case "mapLightAnisotropy":
                                break;
                            case "mapAO":
                                h.aoMap = o(c, n.mapAORepeat, n.mapAOOffset, n.mapAOWrap, n.mapAOAnisotropy);
                                break;
                            case "mapAORepeat":
                            case "mapAOOffset":
                            case "mapAOWrap":
                            case "mapAOAnisotropy":
                                break;
                            case "mapBump":
                                h.bumpMap = o(c, n.mapBumpRepeat, n.mapBumpOffset, n.mapBumpWrap, n.mapBumpAnisotropy);
                                break;
                            case "mapBumpScale":
                                h.bumpScale = c;
                                break;
                            case "mapBumpRepeat":
                            case "mapBumpOffset":
                            case "mapBumpWrap":
                            case "mapBumpAnisotropy":
                                break;
                            case "mapNormal":
                                h.normalMap = o(c, n.mapNormalRepeat, n.mapNormalOffset, n.mapNormalWrap, n.mapNormalAnisotropy);
                                break;
                            case "mapNormalFactor":
                                h.normalScale = [c, c];
                                break;
                            case "mapNormalRepeat":
                            case "mapNormalOffset":
                            case "mapNormalWrap":
                            case "mapNormalAnisotropy":
                                break;
                            case "mapSpecular":
                                h.specularMap = o(c, n.mapSpecularRepeat, n.mapSpecularOffset, n.mapSpecularWrap, n.mapSpecularAnisotropy);
                                break;
                            case "mapSpecularRepeat":
                            case "mapSpecularOffset":
                            case "mapSpecularWrap":
                            case "mapSpecularAnisotropy":
                                break;
                            case "mapMetalness":
                                h.metalnessMap = o(c, n.mapMetalnessRepeat, n.mapMetalnessOffset, n.mapMetalnessWrap, n.mapMetalnessAnisotropy);
                                break;
                            case "mapMetalnessRepeat":
                            case "mapMetalnessOffset":
                            case "mapMetalnessWrap":
                            case "mapMetalnessAnisotropy":
                                break;
                            case "mapRoughness":
                                h.roughnessMap = o(c, n.mapRoughnessRepeat, n.mapRoughnessOffset, n.mapRoughnessWrap, n.mapRoughnessAnisotropy);
                                break;
                            case "mapRoughnessRepeat":
                            case "mapRoughnessOffset":
                            case "mapRoughnessWrap":
                            case "mapRoughnessAnisotropy":
                                break;
                            case "mapAlpha":
                                h.alphaMap = o(c, n.mapAlphaRepeat, n.mapAlphaOffset, n.mapAlphaWrap, n.mapAlphaAnisotropy);
                                break;
                            case "mapAlphaRepeat":
                            case "mapAlphaOffset":
                            case "mapAlphaWrap":
                            case "mapAlphaAnisotropy":
                                break;
                            case "flipSided":
                                h.side = kr;
                                break;
                            case "doubleSided":
                                h.side = Hr;
                                break;
                            case "transparency":
                                console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"), h.opacity = c;
                                break;
                            case "depthTest":
                            case "depthWrite":
                            case "colorWrite":
                            case "opacity":
                            case "reflectivity":
                            case "transparent":
                            case "visible":
                            case "wireframe":
                                h[l] = c;
                                break;
                            case "vertexColors":
                                c === !0 && (h.vertexColors = Yr), "face" === c && (h.vertexColors = Xr);
                                break;
                            default:
                                console.error("THREE.Loader.createMaterial: Unsupported", l, c) } }
                    return "MeshBasicMaterial" === h.type && delete h.emissive, "MeshPhongMaterial" !== h.type && delete h.specular, h.opacity < 1 && (h.transparent = !0), i.setTextures(s), i.parse(h) } }() }, Ki.Handlers = { handlers: [], add: function(t, e) { this.handlers.push(t, e) }, get: function(t) {
                for (var e = this.handlers, i = 0, n = e.length; i < n; i += 2) {
                    var r = e[i],
                        a = e[i + 1];
                    if (r.test(t)) return a }
                return null } }, Object.assign($i.prototype, { load: function(t, e, i, n) {
                var r = this,
                    a = this.texturePath && "string" == typeof this.texturePath ? this.texturePath : Ki.prototype.extractUrlBase(t),
                    o = new bi(this.manager);
                o.setWithCredentials(this.withCredentials), o.load(t, function(i) {
                    var n = JSON.parse(i),
                        o = n.metadata;
                    if (void 0 !== o) {
                        var s = o.type;
                        if (void 0 !== s) {
                            if ("object" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
                            if ("scene" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.SceneLoader instead.") } }
                    var h = r.parse(n, a);
                    e(h.geometry, h.materials) }, i, n) }, setTexturePath: function(t) { this.texturePath = t }, parse: function(t, e) {
                function n(e) {
                    function n(t, e) {
                        return t & 1 << e }
                    var r, a, o, s, c, u, p, d, f, m, g, v, y, _, x, b, w, M, T, E, S, A, R, L, P, C, I, O = t.faces,
                        D = t.vertices,
                        U = t.normals,
                        N = t.colors,
                        F = 0;
                    if (void 0 !== t.uvs) {
                        for (r = 0; r < t.uvs.length; r++) t.uvs[r].length && F++;
                        for (r = 0; r < F; r++) l.faceVertexUvs[r] = [] }
                    for (s = 0, c = D.length; s < c;) M = new h, M.x = D[s++] * e, M.y = D[s++] * e, M.z = D[s++] * e, l.vertices.push(M);
                    for (s = 0, c = O.length; s < c;)
                        if (m = O[s++], g = n(m, 0), v = n(m, 1), y = n(m, 3), _ = n(m, 4), x = n(m, 5), b = n(m, 6), w = n(m, 7), g) {
                            if (E = new ut, E.a = O[s], E.b = O[s + 1], E.c = O[s + 3], S = new ut, S.a = O[s + 1], S.b = O[s + 2], S.c = O[s + 3], s += 4, v && (f = O[s++], E.materialIndex = f, S.materialIndex = f), o = l.faces.length, y)
                                for (r = 0; r < F; r++)
                                    for (L = t.uvs[r], l.faceVertexUvs[r][o] = [], l.faceVertexUvs[r][o + 1] = [], a = 0; a < 4; a++) d = O[s++], C = L[2 * d], I = L[2 * d + 1], P = new i(C, I), 2 !== a && l.faceVertexUvs[r][o].push(P), 0 !== a && l.faceVertexUvs[r][o + 1].push(P);
                            if (_ && (p = 3 * O[s++], E.normal.set(U[p++], U[p++], U[p]), S.normal.copy(E.normal)), x)
                                for (r = 0; r < 4; r++) p = 3 * O[s++], R = new h(U[p++], U[p++], U[p]), 2 !== r && E.vertexNormals.push(R), 0 !== r && S.vertexNormals.push(R);
                            if (b && (u = O[s++], A = N[u], E.color.setHex(A), S.color.setHex(A)), w)
                                for (r = 0; r < 4; r++) u = O[s++], A = N[u], 2 !== r && E.vertexColors.push(new W(A)), 0 !== r && S.vertexColors.push(new W(A));
                            l.faces.push(E), l.faces.push(S) } else {
                            if (T = new ut, T.a = O[s++], T.b = O[s++], T.c = O[s++], v && (f = O[s++], T.materialIndex = f), o = l.faces.length, y)
                                for (r = 0; r < F; r++)
                                    for (L = t.uvs[r], l.faceVertexUvs[r][o] = [], a = 0; a < 3; a++) d = O[s++], C = L[2 * d], I = L[2 * d + 1], P = new i(C, I), l.faceVertexUvs[r][o].push(P);
                            if (_ && (p = 3 * O[s++], T.normal.set(U[p++], U[p++], U[p])), x)
                                for (r = 0; r < 3; r++) p = 3 * O[s++], R = new h(U[p++], U[p++], U[p]), T.vertexNormals.push(R);
                            if (b && (u = O[s++], T.color.setHex(N[u])), w)
                                for (r = 0; r < 3; r++) u = O[s++], T.vertexColors.push(new W(N[u]));
                            l.faces.push(T) } }

                function a() {
                    var e = void 0 !== t.influencesPerVertex ? t.influencesPerVertex : 2;
                    if (t.skinWeights)
                        for (var i = 0, n = t.skinWeights.length; i < n; i += e) {
                            var a = t.skinWeights[i],
                                o = e > 1 ? t.skinWeights[i + 1] : 0,
                                s = e > 2 ? t.skinWeights[i + 2] : 0,
                                h = e > 3 ? t.skinWeights[i + 3] : 0;
                            l.skinWeights.push(new r(a, o, s, h)) }
                    if (t.skinIndices)
                        for (var i = 0, n = t.skinIndices.length; i < n; i += e) {
                            var c = t.skinIndices[i],
                                u = e > 1 ? t.skinIndices[i + 1] : 0,
                                p = e > 2 ? t.skinIndices[i + 2] : 0,
                                d = e > 3 ? t.skinIndices[i + 3] : 0;
                            l.skinIndices.push(new r(c, u, p, d)) }
                    l.bones = t.bones, l.bones && l.bones.length > 0 && (l.skinWeights.length !== l.skinIndices.length || l.skinIndices.length !== l.vertices.length) && console.warn("When skinning, number of vertices (" + l.vertices.length + "), skinIndices (" + l.skinIndices.length + "), and skinWeights (" + l.skinWeights.length + ") should match.") }

                function o(e) {
                    if (void 0 !== t.morphTargets)
                        for (var i = 0, n = t.morphTargets.length; i < n; i++) { l.morphTargets[i] = {}, l.morphTargets[i].name = t.morphTargets[i].name, l.morphTargets[i].vertices = [];
                            for (var r = l.morphTargets[i].vertices, a = t.morphTargets[i].vertices, o = 0, s = a.length; o < s; o += 3) {
                                var c = new h;
                                c.x = a[o] * e, c.y = a[o + 1] * e, c.z = a[o + 2] * e, r.push(c) } }
                    if (void 0 !== t.morphColors && t.morphColors.length > 0) { console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');
                        for (var u = l.faces, p = t.morphColors[0].colors, i = 0, n = u.length; i < n; i++) u[i].color.fromArray(p, 3 * i) } }

                function s() {
                    var e = [],
                        i = [];
                    void 0 !== t.animation && i.push(t.animation), void 0 !== t.animations && (t.animations.length ? i = i.concat(t.animations) : i.push(t.animations));
                    for (var n = 0; n < i.length; n++) {
                        var r = Zi.parseAnimation(i[n], l.bones);
                        r && e.push(r) }
                    if (l.morphTargets) {
                        var a = Zi.CreateClipsFromMorphTargetSequences(l.morphTargets, 10);
                        e = e.concat(a) }
                    e.length > 0 && (l.animations = e) }
                var l = new Tt,
                    c = void 0 !== t.scale ? 1 / t.scale : 1;
                if (n(c), a(), o(c), s(), l.computeFaceNormals(), l.computeBoundingSphere(), void 0 === t.materials || 0 === t.materials.length) return { geometry: l };
                var u = Ki.prototype.initMaterials(t.materials, e, this.crossOrigin);
                return { geometry: l, materials: u } } }), Object.assign(tn.prototype, { load: function(t, e, i, n) { "" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
                var r = this,
                    a = new bi(r.manager);
                a.load(t, function(i) {
                    var n = null;
                    try { n = JSON.parse(i) } catch (e) {
                        return void console.error("THREE:ObjectLoader: Can't parse " + t + ".", e.message) }
                    var a = n.metadata;
                    return void 0 === a || void 0 === a.type || "geometry" === a.type.toLowerCase() ? void console.error("THREE.ObjectLoader: Can't load " + t + ". Use THREE.JSONLoader instead.") : void r.parse(n, e) }, i, n) }, setTexturePath: function(t) { this.texturePath = t }, setCrossOrigin: function(t) { this.crossOrigin = t }, parse: function(t, e) {
                var i = this.parseGeometries(t.geometries),
                    n = this.parseImages(t.images, function() { void 0 !== e && e(o) }),
                    r = this.parseTextures(t.textures, n),
                    a = this.parseMaterials(t.materials, r),
                    o = this.parseObject(t.object, i, a);
                return t.animations && (o.animations = this.parseAnimations(t.animations)), void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(o), o }, parseGeometries: function(t) {
                var e = {};
                if (void 0 !== t)
                    for (var i = new $i, n = new Qi, r = 0, a = t.length; r < a; r++) {
                        var o, s = t[r];
                        switch (s.type) {
                            case "PlaneGeometry":
                            case "PlaneBufferGeometry":
                                o = new pl[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
                                break;
                            case "BoxGeometry":
                            case "BoxBufferGeometry":
                            case "CubeGeometry":
                                o = new pl[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
                                break;
                            case "CircleGeometry":
                            case "CircleBufferGeometry":
                                o = new pl[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
                                break;
                            case "CylinderGeometry":
                            case "CylinderBufferGeometry":
                                o = new pl[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                                break;
                            case "ConeGeometry":
                            case "ConeBufferGeometry":
                                o = new pl[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                                break;
                            case "SphereGeometry":
                            case "SphereBufferGeometry":
                                o = new pl[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
                                break;
                            case "DodecahedronGeometry":
                            case "IcosahedronGeometry":
                            case "OctahedronGeometry":
                            case "TetrahedronGeometry":
                                o = new pl[s.type](s.radius, s.detail);
                                break;
                            case "RingGeometry":
                            case "RingBufferGeometry":
                                o = new pl[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
                                break;
                            case "TorusGeometry":
                            case "TorusBufferGeometry":
                                o = new pl[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
                                break;
                            case "TorusKnotGeometry":
                            case "TorusKnotBufferGeometry":
                                o = new pl[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
                                break;
                            case "LatheGeometry":
                            case "LatheBufferGeometry":
                                o = new pl[s.type](s.points, s.segments, s.phiStart, s.phiLength);
                                break;
                            case "BufferGeometry":
                                o = n.parse(s);
                                break;
                            case "Geometry":
                                o = i.parse(s.data, this.texturePath).geometry;
                                break;
                            default:
                                console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');
                                continue }
                        o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), e[s.uuid] = o }
                return e }, parseMaterials: function(t, e) {
                var i = {};
                if (void 0 !== t) {
                    var n = new Ji;
                    n.setTextures(e);
                    for (var r = 0, a = t.length; r < a; r++) {
                        var o = n.parse(t[r]);
                        i[o.uuid] = o } }
                return i }, parseAnimations: function(t) {
                for (var e = [], i = 0; i < t.length; i++) {
                    var n = Zi.parse(t[i]);
                    e.push(n) }
                return e }, parseImages: function(t, e) {
                function i(t) {
                    return n.manager.itemStart(t), o.load(t, function() { n.manager.itemEnd(t) }, void 0, function() { n.manager.itemError(t) }) }
                var n = this,
                    r = {};
                if (void 0 !== t && t.length > 0) {
                    var a = new xi(e),
                        o = new Ti(a);
                    o.setCrossOrigin(this.crossOrigin);
                    for (var s = 0, h = t.length; s < h; s++) {
                        var l = t[s],
                            c = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(l.url) ? l.url : n.texturePath + l.url;
                        r[l.uuid] = i(c) } }
                return r }, parseTextures: function(t, e) {
                function i(t, e) {
                    return "number" == typeof t ? t : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", t), e[t]) }
                var r = {};
                if (void 0 !== t)
                    for (var a = 0, o = t.length; a < o; a++) {
                        var s = t[a];
                        void 0 === s.image && console.warn('THREE.ObjectLoader: No "image" specified for', s.uuid), void 0 === e[s.image] && console.warn("THREE.ObjectLoader: Undefined image", s.image);
                        var h = new n(e[s.image]);
                        h.needsUpdate = !0, h.uuid = s.uuid, void 0 !== s.name && (h.name = s.name), void 0 !== s.mapping && (h.mapping = i(s.mapping, ka)), void 0 !== s.offset && h.offset.fromArray(s.offset), void 0 !== s.repeat && h.repeat.fromArray(s.repeat), void 0 !== s.wrap && (h.wrapS = i(s.wrap[0], Wa), h.wrapT = i(s.wrap[1], Wa)), void 0 !== s.minFilter && (h.minFilter = i(s.minFilter, Ka)), void 0 !== s.magFilter && (h.magFilter = i(s.magFilter, Ka)), void 0 !== s.anisotropy && (h.anisotropy = s.anisotropy), void 0 !== s.flipY && (h.flipY = s.flipY), r[s.uuid] = h }
                return r }, parseObject: function() {
                var t = new l;
                return function(e, i, n) {
                    function r(t) {
                        return void 0 === i[t] && console.warn("THREE.ObjectLoader: Undefined geometry", t), i[t] }

                    function a(t) {
                        if (void 0 !== t) return void 0 === n[t] && console.warn("THREE.ObjectLoader: Undefined material", t), n[t] }
                    var o;
                    switch (e.type) {
                        case "Scene":
                            o = new he, void 0 !== e.background && Number.isInteger(e.background) && (o.background = new W(e.background)), void 0 !== e.fog && ("Fog" === e.fog.type ? o.fog = new se(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (o.fog = new oe(e.fog.color, e.fog.density)));
                            break;
                        case "PerspectiveCamera":
                            o = new Ct(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (o.focus = e.focus), void 0 !== e.zoom && (o.zoom = e.zoom), void 0 !== e.filmGauge && (o.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (o.filmOffset = e.filmOffset), void 0 !== e.view && (o.view = Object.assign({}, e.view));
                            break;
                        case "OrthographicCamera":
                            o = new It(e.left, e.right, e.top, e.bottom, e.near, e.far);
                            break;
                        case "AmbientLight":
                            o = new Ui(e.color, e.intensity);
                            break;
                        case "DirectionalLight":
                            o = new Di(e.color, e.intensity);
                            break;
                        case "PointLight":
                            o = new Ii(e.color, e.intensity, e.distance, e.decay);
                            break;
                        case "SpotLight":
                            o = new Ci(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
                            break;
                        case "HemisphereLight":
                            o = new Ri(e.color, e.groundColor, e.intensity);
                            break;
                        case "Mesh":
                            var s = r(e.geometry),
                                h = a(e.material);
                            o = s.bones && s.bones.length > 0 ? new me(s, h) : new At(s, h);
                            break;
                        case "LOD":
                            o = new pe;
                            break;
                        case "Line":
                            o = new ve(r(e.geometry), a(e.material), e.mode);
                            break;
                        case "LineSegments":
                            o = new ye(r(e.geometry), a(e.material));
                            break;
                        case "PointCloud":
                        case "Points":
                            o = new xe(r(e.geometry), a(e.material));
                            break;
                        case "Sprite":
                            o = new ue(a(e.material));
                            break;
                        case "Group":
                            o = new be;
                            break;
                        case "SkinnedMesh":
                            console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh type. Instantiates Object3D instead.");
                        default:
                            o = new ht }
                    if (o.uuid = e.uuid, void 0 !== e.name && (o.name = e.name), void 0 !== e.matrix ? (t.fromArray(e.matrix), t.decompose(o.position, o.quaternion, o.scale)) : (void 0 !== e.position && o.position.fromArray(e.position), void 0 !== e.rotation && o.rotation.fromArray(e.rotation), void 0 !== e.quaternion && o.quaternion.fromArray(e.quaternion), void 0 !== e.scale && o.scale.fromArray(e.scale)), void 0 !== e.castShadow && (o.castShadow = e.castShadow), void 0 !== e.receiveShadow && (o.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (o.shadow.bias = e.shadow.bias), void 0 !== e.shadow.radius && (o.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && o.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (o.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (o.visible = e.visible), void 0 !== e.userData && (o.userData = e.userData), void 0 !== e.children)
                        for (var l in e.children) o.add(this.parseObject(e.children[l], i, n));
                    if ("LOD" === e.type)
                        for (var c = e.levels, u = 0; u < c.length; u++) {
                            var p = c[u],
                                l = o.getObjectByProperty("uuid", p.object);
                            void 0 !== l && o.addLevel(l, p.distance) }
                    return o } }() }), en.prototype = { constructor: en, getPoint: function(t) {
                return console.warn("THREE.Curve: Warning, getPoint() not implemented!"), null }, getPointAt: function(t) {
                var e = this.getUtoTmapping(t);
                return this.getPoint(e) }, getPoints: function(t) { t || (t = 5);
                for (var e = [], i = 0; i <= t; i++) e.push(this.getPoint(i / t));
                return e }, getSpacedPoints: function(t) { t || (t = 5);
                for (var e = [], i = 0; i <= t; i++) e.push(this.getPointAt(i / t));
                return e }, getLength: function() {
                var t = this.getLengths();
                return t[t.length - 1] }, getLengths: function(t) {
                if (t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
                this.needsUpdate = !1;
                var e, i, n = [],
                    r = this.getPoint(0),
                    a = 0;
                for (n.push(0), i = 1; i <= t; i++) e = this.getPoint(i / t), a += e.distanceTo(r), n.push(a), r = e;
                return this.cacheArcLengths = n, n }, updateArcLengths: function() { this.needsUpdate = !0, this.getLengths() }, getUtoTmapping: function(t, e) {
                var i, n = this.getLengths(),
                    r = 0,
                    a = n.length;
                i = e ? e : t * n[a - 1];
                for (var o, s = 0, h = a - 1; s <= h;)
                    if (r = Math.floor(s + (h - s) / 2), o = n[r] - i, o < 0) s = r + 1;
                    else {
                        if (!(o > 0)) { h = r;
                            break }
                        h = r - 1 }
                if (r = h, n[r] === i) {
                    var l = r / (a - 1);
                    return l }
                var c = n[r],
                    u = n[r + 1],
                    p = u - c,
                    d = (i - c) / p,
                    l = (r + d) / (a - 1);
                return l }, getTangent: function(t) {
                var e = 1e-4,
                    i = t - e,
                    n = t + e;
                i < 0 && (i = 0), n > 1 && (n = 1);
                var r = this.getPoint(i),
                    a = this.getPoint(n),
                    o = a.clone().sub(r);
                return o.normalize() }, getTangentAt: function(t) {
                var e = this.getUtoTmapping(t);
                return this.getTangent(e) }, computeFrenetFrames: function(t, e) {
                var i, n, r, a = new h,
                    o = [],
                    s = [],
                    c = [],
                    u = new h,
                    p = new l;
                for (i = 0; i <= t; i++) n = i / t, o[i] = this.getTangentAt(n), o[i].normalize();
                s[0] = new h, c[0] = new h;
                var d = Number.MAX_VALUE,
                    f = Math.abs(o[0].x),
                    m = Math.abs(o[0].y),
                    g = Math.abs(o[0].z);
                for (f <= d && (d = f, a.set(1, 0, 0)), m <= d && (d = m, a.set(0, 1, 0)), g <= d && a.set(0, 0, 1), u.crossVectors(o[0], a).normalize(), s[0].crossVectors(o[0], u), c[0].crossVectors(o[0], s[0]), i = 1; i <= t; i++) s[i] = s[i - 1].clone(), c[i] = c[i - 1].clone(), u.crossVectors(o[i - 1], o[i]), u.length() > Number.EPSILON && (u.normalize(), r = Math.acos(Qo.clamp(o[i - 1].dot(o[i]), -1, 1)), s[i].applyMatrix4(p.makeRotationAxis(u, r))), c[i].crossVectors(o[i], s[i]);
                if (e === !0)
                    for (r = Math.acos(Qo.clamp(s[0].dot(s[t]), -1, 1)), r /= t, o[0].dot(u.crossVectors(s[0], s[t])) > 0 && (r = -r), i = 1; i <= t; i++) s[i].applyMatrix4(p.makeRotationAxis(o[i], r * i)), c[i].crossVectors(o[i], s[i]);
                return { tangents: o, normals: s, binormals: c } } }, en.create = function(t, e) {
            return t.prototype = Object.create(en.prototype), t.prototype.constructor = t, t.prototype.getPoint = e, t }, nn.prototype = Object.create(en.prototype), nn.prototype.constructor = nn, nn.prototype.isLineCurve = !0, nn.prototype.getPoint = function(t) {
            if (1 === t) return this.v2.clone();
            var e = this.v2.clone().sub(this.v1);
            return e.multiplyScalar(t).add(this.v1), e }, nn.prototype.getPointAt = function(t) {
            return this.getPoint(t) }, nn.prototype.getTangent = function(t) {
            var e = this.v2.clone().sub(this.v1);
            return e.normalize() }, rn.prototype = Object.assign(Object.create(en.prototype), { constructor: rn, add: function(t) { this.curves.push(t) }, closePath: function() {
                var t = this.curves[0].getPoint(0),
                    e = this.curves[this.curves.length - 1].getPoint(1);
                t.equals(e) || this.curves.push(new nn(e, t)) }, getPoint: function(t) {
                for (var e = t * this.getLength(), i = this.getCurveLengths(), n = 0; n < i.length;) {
                    if (i[n] >= e) {
                        var r = i[n] - e,
                            a = this.curves[n],
                            o = a.getLength(),
                            s = 0 === o ? 0 : 1 - r / o;
                        return a.getPointAt(s) }
                    n++ }
                return null }, getLength: function() {
                var t = this.getCurveLengths();
                return t[t.length - 1] }, updateArcLengths: function() { this.needsUpdate = !0, this.cacheLengths = null, this.getLengths() }, getCurveLengths: function() {
                if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
                for (var t = [], e = 0, i = 0, n = this.curves.length; i < n; i++) e += this.curves[i].getLength(), t.push(e);
                return this.cacheLengths = t, t }, getSpacedPoints: function(t) { t || (t = 40);
                for (var e = [], i = 0; i <= t; i++) e.push(this.getPoint(i / t));
                return this.autoClose && e.push(e[0]), e }, getPoints: function(t) { t = t || 12;
                for (var e, i = [], n = 0, r = this.curves; n < r.length; n++)
                    for (var a = r[n], o = a && a.isEllipseCurve ? 2 * t : a && a.isLineCurve ? 1 : a && a.isSplineCurve ? t * a.points.length : t, s = a.getPoints(o), h = 0; h < s.length; h++) {
                        var l = s[h];
                        e && e.equals(l) || (i.push(l), e = l) }
                return this.autoClose && i.length > 1 && !i[i.length - 1].equals(i[0]) && i.push(i[0]), i }, createPointsGeometry: function(t) {
                var e = this.getPoints(t);
                return this.createGeometry(e) }, createSpacedPointsGeometry: function(t) {
                var e = this.getSpacedPoints(t);
                return this.createGeometry(e) }, createGeometry: function(t) {
                for (var e = new Tt, i = 0, n = t.length; i < n; i++) {
                    var r = t[i];
                    e.vertices.push(new h(r.x, r.y, r.z || 0)) }
                return e } }), an.prototype = Object.create(en.prototype), an.prototype.constructor = an, an.prototype.isEllipseCurve = !0, an.prototype.getPoint = function(t) {
            for (var e = 2 * Math.PI, n = this.aEndAngle - this.aStartAngle, r = Math.abs(n) < Number.EPSILON; n < 0;) n += e;
            for (; n > e;) n -= e;
            n < Number.EPSILON && (n = r ? 0 : e), this.aClockwise !== !0 || r || (n === e ? n = -e : n -= e);
            var a = this.aStartAngle + t * n,
                o = this.aX + this.xRadius * Math.cos(a),
                s = this.aY + this.yRadius * Math.sin(a);
            if (0 !== this.aRotation) {
                var h = Math.cos(this.aRotation),
                    l = Math.sin(this.aRotation),
                    c = o - this.aX,
                    u = s - this.aY;
                o = c * h - u * l + this.aX, s = c * l + u * h + this.aY }
            return new i(o, s) };
        var _l = { tangentQuadraticBezier: function(t, e, i, n) {
                return 2 * (1 - t) * (i - e) + 2 * t * (n - i) }, tangentCubicBezier: function(t, e, i, n, r) {
                return -3 * e * (1 - t) * (1 - t) + 3 * i * (1 - t) * (1 - t) - 6 * t * i * (1 - t) + 6 * t * n * (1 - t) - 3 * t * t * n + 3 * t * t * r }, tangentSpline: function(t, e, i, n, r) {
                var a = 6 * t * t - 6 * t,
                    o = 3 * t * t - 4 * t + 1,
                    s = -6 * t * t + 6 * t,
                    h = 3 * t * t - 2 * t;
                return a + o + s + h }, interpolate: function(t, e, i, n, r) {
                var a = .5 * (i - t),
                    o = .5 * (n - e),
                    s = r * r,
                    h = r * s;
                return (2 * e - 2 * i + a + o) * h + (-3 * e + 3 * i - 2 * a - o) * s + a * r + e } };
        on.prototype = Object.create(en.prototype), on.prototype.constructor = on, on.prototype.isSplineCurve = !0, on.prototype.getPoint = function(t) {
            var e = this.points,
                n = (e.length - 1) * t,
                r = Math.floor(n),
                a = n - r,
                o = e[0 === r ? r : r - 1],
                s = e[r],
                h = e[r > e.length - 2 ? e.length - 1 : r + 1],
                l = e[r > e.length - 3 ? e.length - 1 : r + 2],
                c = _l.interpolate;
            return new i(c(o.x, s.x, h.x, l.x, a), c(o.y, s.y, h.y, l.y, a)) }, sn.prototype = Object.create(en.prototype), sn.prototype.constructor = sn, sn.prototype.getPoint = function(t) {
            var e = ul.b3;
            return new i(e(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)) }, sn.prototype.getTangent = function(t) {
            var e = _l.tangentCubicBezier;
            return new i(e(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)).normalize() }, hn.prototype = Object.create(en.prototype), hn.prototype.constructor = hn, hn.prototype.getPoint = function(t) {
            var e = ul.b2;
            return new i(e(t, this.v0.x, this.v1.x, this.v2.x), e(t, this.v0.y, this.v1.y, this.v2.y)) }, hn.prototype.getTangent = function(t) {
            var e = _l.tangentQuadraticBezier;
            return new i(e(t, this.v0.x, this.v1.x, this.v2.x), e(t, this.v0.y, this.v1.y, this.v2.y)).normalize() };
        var xl = Object.assign(Object.create(rn.prototype), { fromPoints: function(t) { this.moveTo(t[0].x, t[0].y);
                for (var e = 1, i = t.length; e < i; e++) this.lineTo(t[e].x, t[e].y) }, moveTo: function(t, e) { this.currentPoint.set(t, e) }, lineTo: function(t, e) {
                var n = new nn(this.currentPoint.clone(), new i(t, e));
                this.curves.push(n), this.currentPoint.set(t, e) }, quadraticCurveTo: function(t, e, n, r) {
                var a = new hn(this.currentPoint.clone(), new i(t, e), new i(n, r));
                this.curves.push(a), this.currentPoint.set(n, r) }, bezierCurveTo: function(t, e, n, r, a, o) {
                var s = new sn(this.currentPoint.clone(), new i(t, e), new i(n, r), new i(a, o));
                this.curves.push(s), this.currentPoint.set(a, o) }, splineThru: function(t) {
                var e = [this.currentPoint.clone()].concat(t),
                    i = new on(e);
                this.curves.push(i), this.currentPoint.copy(t[t.length - 1]) }, arc: function(t, e, i, n, r, a) {
                var o = this.currentPoint.x,
                    s = this.currentPoint.y;
                this.absarc(t + o, e + s, i, n, r, a) }, absarc: function(t, e, i, n, r, a) { this.absellipse(t, e, i, i, n, r, a) }, ellipse: function(t, e, i, n, r, a, o, s) {
                var h = this.currentPoint.x,
                    l = this.currentPoint.y;
                this.absellipse(t + h, e + l, i, n, r, a, o, s) }, absellipse: function(t, e, i, n, r, a, o, s) {
                var h = new an(t, e, i, n, r, a, o, s);
                if (this.curves.length > 0) {
                    var l = h.getPoint(0);
                    l.equals(this.currentPoint) || this.lineTo(l.x, l.y) }
                this.curves.push(h);
                var c = h.getPoint(1);
                this.currentPoint.copy(c) } });
        ln.prototype = Object.assign(Object.create(xl), { constructor: ln, getPointsHoles: function(t) {
                for (var e = [], i = 0, n = this.holes.length; i < n; i++) e[i] = this.holes[i].getPoints(t);
                return e }, extractAllPoints: function(t) {
                return { shape: this.getPoints(t), holes: this.getPointsHoles(t) } }, extractPoints: function(t) {
                return this.extractAllPoints(t) } }), cn.prototype = xl, xl.constructor = cn, un.prototype = {
            moveTo: function(t, e) { this.currentPath = new cn, this.subPaths.push(this.currentPath), this.currentPath.moveTo(t, e) },
            lineTo: function(t, e) { this.currentPath.lineTo(t, e) },
            quadraticCurveTo: function(t, e, i, n) { this.currentPath.quadraticCurveTo(t, e, i, n) },
            bezierCurveTo: function(t, e, i, n, r, a) { this.currentPath.bezierCurveTo(t, e, i, n, r, a) },
            splineThru: function(t) { this.currentPath.splineThru(t) },
            toShapes: function(t, e) {
                function i(t) {
                    for (var e = [], i = 0, n = t.length; i < n; i++) {
                        var r = t[i],
                            a = new ln;
                        a.curves = r.curves, e.push(a) }
                    return e }

                function n(t, e) {
                    for (var i = e.length, n = !1, r = i - 1, a = 0; a < i; r = a++) {
                        var o = e[r],
                            s = e[a],
                            h = s.x - o.x,
                            l = s.y - o.y;
                        if (Math.abs(l) > Number.EPSILON) {
                            if (l < 0 && (o = e[a], h = -h, s = e[r], l = -l), t.y < o.y || t.y > s.y) continue;
                            if (t.y === o.y) {
                                if (t.x === o.x) return !0 } else {
                                var c = l * (t.x - o.x) - h * (t.y - o.y);
                                if (0 === c) return !0;
                                if (c < 0) continue;
                                n = !n } } else {
                            if (t.y !== o.y) continue;
                            if (s.x <= t.x && t.x <= o.x || o.x <= t.x && t.x <= s.x) return !0 }
                    }
                    return n
                }
                var r = ul.isClockWise,
                    a = this.subPaths;
                if (0 === a.length) return [];
                if (e === !0) return i(a);
                var o, s, h, l = [];
                if (1 === a.length) return s = a[0], h = new ln, h.curves = s.curves, l.push(h), l;
                var c = !r(a[0].getPoints());
                c = t ? !c : c;
                var u, p = [],
                    d = [],
                    f = [],
                    m = 0;
                d[m] = void 0, f[m] = [];
                for (var g = 0, v = a.length; g < v; g++) s = a[g], u = s.getPoints(), o = r(u), o = t ? !o : o, o ? (!c && d[m] && m++, d[m] = { s: new ln, p: u }, d[m].s.curves = s.curves, c && m++, f[m] = []) : f[m].push({ h: s, p: u[0] });
                if (!d[0]) return i(a);
                if (d.length > 1) {
                    for (var y = !1, _ = [], x = 0, b = d.length; x < b; x++) p[x] = [];
                    for (var x = 0, b = d.length; x < b; x++)
                        for (var w = f[x], M = 0; M < w.length; M++) {
                            for (var T = w[M], E = !0, S = 0; S < d.length; S++) n(T.p, d[S].p) && (x !== S && _.push({ froms: x, tos: S, hole: M }), E ? (E = !1, p[S].push(T)) : y = !0);
                            E && p[x].push(T) }
                    _.length > 0 && (y || (f = p)) }
                for (var A, g = 0, R = d.length; g < R; g++) { h = d[g].s, l.push(h), A = f[g];
                    for (var L = 0, P = A.length; L < P; L++) h.holes.push(A[L].h) }
                return l
            }
        }, Object.assign(pn.prototype, { isFont: !0, generateShapes: function(t, e, i) {
                function n(t) {
                    for (var i = String(t).split(""), n = e / a.resolution, o = 0, s = [], h = 0; h < i.length; h++) {
                        var l = r(i[h], n, o);
                        o += l.offset, s.push(l.path) }
                    return s }

                function r(t, e, n) {
                    var r = a.glyphs[t] || a.glyphs["?"];
                    if (r) {
                        var o, s, h, l, c, u, p, d, f, m, g, v = new un,
                            y = [],
                            _ = ul.b2,
                            x = ul.b3;
                        if (r.o)
                            for (var b = r._cachedOutline || (r._cachedOutline = r.o.split(" ")), w = 0, M = b.length; w < M;) {
                                var T = b[w++];
                                switch (T) {
                                    case "m":
                                        o = b[w++] * e + n, s = b[w++] * e, v.moveTo(o, s);
                                        break;
                                    case "l":
                                        o = b[w++] * e + n, s = b[w++] * e, v.lineTo(o, s);
                                        break;
                                    case "q":
                                        if (h = b[w++] * e + n, l = b[w++] * e, p = b[w++] * e + n, d = b[w++] * e, v.quadraticCurveTo(p, d, h, l), g = y[y.length - 1]) { c = g.x, u = g.y;
                                            for (var E = 1; E <= i; E++) {
                                                var S = E / i;
                                                _(S, c, p, h), _(S, u, d, l) } }
                                        break;
                                    case "b":
                                        if (h = b[w++] * e + n, l = b[w++] * e, p = b[w++] * e + n, d = b[w++] * e, f = b[w++] * e + n, m = b[w++] * e, v.bezierCurveTo(p, d, f, m, h, l), g = y[y.length - 1]) { c = g.x, u = g.y;
                                            for (var E = 1; E <= i; E++) {
                                                var S = E / i;
                                                x(S, c, p, f, h), x(S, u, d, m, l) } } } }
                        return { offset: r.ha * e, path: v } } }
                void 0 === e && (e = 100), void 0 === i && (i = 4);
                for (var a = this.data, o = n(t), s = [], h = 0, l = o.length; h < l; h++) Array.prototype.push.apply(s, o[h].toShapes());
                return s } }), Object.assign(dn.prototype, { load: function(t, e, i, n) {
                var r = this,
                    a = new bi(this.manager);
                a.load(t, function(t) {
                    var i;
                    try { i = JSON.parse(t) } catch (e) { console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), i = JSON.parse(t.substring(65, t.length - 2)) }
                    var n = r.parse(i);
                    e && e(n) }, i, n) }, parse: function(t) {
                return new pn(t) } });
        var bl, wl = { getContext: function() {
                return void 0 === bl && (bl = new(window.AudioContext || window.webkitAudioContext)), bl }, setContext: function(t) { bl = t } };
        Object.assign(fn.prototype, { load: function(t, e, i, n) {
                var r = new bi(this.manager);
                r.setResponseType("arraybuffer"), r.load(t, function(t) {
                    var i = wl.getContext();
                    i.decodeAudioData(t, function(t) { e(t) }) }, i, n) } }), mn.prototype = Object.assign(Object.create(Ai.prototype), { constructor: mn, isRectAreaLight: !0, copy: function(t) {
                return Ai.prototype.copy.call(this, t), this.width = t.width, this.height = t.height, this } }), Object.assign(gn.prototype, { update: function() {
                var t, e, i, n, r, a, o, s = new l,
                    h = new l;
                return function(l) {
                    var c = t !== this || e !== l.focus || i !== l.fov || n !== l.aspect * this.aspect || r !== l.near || a !== l.far || o !== l.zoom;
                    if (c) { t = this, e = l.focus, i = l.fov, n = l.aspect * this.aspect, r = l.near, a = l.far, o = l.zoom;
                        var u, p, d = l.projectionMatrix.clone(),
                            f = this.eyeSep / 2,
                            m = f * r / e,
                            g = r * Math.tan(Qo.DEG2RAD * i * .5) / o;
                        h.elements[12] = -f, s.elements[12] = f, u = -g * n + m, p = g * n + m, d.elements[0] = 2 * r / (p - u), d.elements[8] = (p + u) / (p - u), this.cameraL.projectionMatrix.copy(d), u = -g * n - m, p = g * n - m, d.elements[0] = 2 * r / (p - u), d.elements[8] = (p + u) / (p - u), this.cameraR.projectionMatrix.copy(d) }
                    this.cameraL.matrixWorld.copy(l.matrixWorld).multiply(h), this.cameraR.matrixWorld.copy(l.matrixWorld).multiply(s) } }() }), vn.prototype = Object.create(ht.prototype), vn.prototype.constructor = vn, yn.prototype = Object.assign(Object.create(ht.prototype), { constructor: yn, getInput: function() {
                return this.gain }, removeFilter: function() { null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null) }, getFilter: function() {
                return this.filter }, setFilter: function(t) { null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = t, this.gain.connect(this.filter), this.filter.connect(this.context.destination) }, getMasterVolume: function() {
                return this.gain.gain.value }, setMasterVolume: function(t) { this.gain.gain.value = t }, updateMatrixWorld: function() {
                var t = new h,
                    e = new s,
                    i = new h,
                    n = new h;
                return function(r) { ht.prototype.updateMatrixWorld.call(this, r);
                    var a = this.context.listener,
                        o = this.up;
                    this.matrixWorld.decompose(t, e, i), n.set(0, 0, -1).applyQuaternion(e), a.positionX ? (a.positionX.setValueAtTime(t.x, this.context.currentTime), a.positionY.setValueAtTime(t.y, this.context.currentTime), a.positionZ.setValueAtTime(t.z, this.context.currentTime), a.forwardX.setValueAtTime(n.x, this.context.currentTime), a.forwardY.setValueAtTime(n.y, this.context.currentTime), a.forwardZ.setValueAtTime(n.z, this.context.currentTime), a.upX.setValueAtTime(o.x, this.context.currentTime), a.upY.setValueAtTime(o.y, this.context.currentTime), a.upZ.setValueAtTime(o.z, this.context.currentTime)) : (a.setPosition(t.x, t.y, t.z), a.setOrientation(n.x, n.y, n.z, o.x, o.y, o.z)) } }() }), _n.prototype = Object.assign(Object.create(ht.prototype), { constructor: _n, getOutput: function() {
                return this.gain }, setNodeSource: function(t) {
                return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = t, this.connect(), this }, setBuffer: function(t) {
                return this.buffer = t, this.sourceType = "buffer", this.autoplay && this.play(), this }, play: function() {
                if (this.isPlaying === !0) return void console.warn("THREE.Audio: Audio is already playing.");
                if (this.hasPlaybackControl === !1) return void console.warn("THREE.Audio: this Audio has no playback control.");
                var t = this.context.createBufferSource();
                return t.buffer = this.buffer, t.loop = this.loop, t.onended = this.onEnded.bind(this), t.playbackRate.setValueAtTime(this.playbackRate, this.startTime), t.start(0, this.startTime), this.isPlaying = !0, this.source = t, this.connect() }, pause: function() {
                return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(), this.startTime = this.context.currentTime, this.isPlaying = !1, this) }, stop: function() {
                return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(), this.startTime = 0, this.isPlaying = !1, this) }, connect: function() {
                if (this.filters.length > 0) { this.source.connect(this.filters[0]);
                    for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].connect(this.filters[t]);
                    this.filters[this.filters.length - 1].connect(this.getOutput()) } else this.source.connect(this.getOutput());
                return this }, disconnect: function() {
                if (this.filters.length > 0) { this.source.disconnect(this.filters[0]);
                    for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].disconnect(this.filters[t]);
                    this.filters[this.filters.length - 1].disconnect(this.getOutput()) } else this.source.disconnect(this.getOutput());
                return this }, getFilters: function() {
                return this.filters }, setFilters: function(t) {
                return t || (t = []), this.isPlaying === !0 ? (this.disconnect(), this.filters = t, this.connect()) : this.filters = t, this }, getFilter: function() {
                return this.getFilters()[0] }, setFilter: function(t) {
                return this.setFilters(t ? [t] : []) }, setPlaybackRate: function(t) {
                return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.playbackRate = t, this.isPlaying === !0 && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), this) }, getPlaybackRate: function() {
                return this.playbackRate }, onEnded: function() { this.isPlaying = !1 }, getLoop: function() {
                return this.hasPlaybackControl === !1 ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop }, setLoop: function(t) {
                return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.loop = t, this.isPlaying === !0 && (this.source.loop = this.loop), this) }, getVolume: function() {
                return this.gain.gain.value }, setVolume: function(t) {
                return this.gain.gain.value = t, this } }), xn.prototype = Object.assign(Object.create(_n.prototype), { constructor: xn, getOutput: function() {
                return this.panner }, getRefDistance: function() {
                return this.panner.refDistance }, setRefDistance: function(t) { this.panner.refDistance = t }, getRolloffFactor: function() {
                return this.panner.rolloffFactor }, setRolloffFactor: function(t) { this.panner.rolloffFactor = t }, getDistanceModel: function() {
                return this.panner.distanceModel }, setDistanceModel: function(t) { this.panner.distanceModel = t }, getMaxDistance: function() {
                return this.panner.maxDistance }, setMaxDistance: function(t) { this.panner.maxDistance = t }, updateMatrixWorld: function() {
                var t = new h;
                return function(e) { ht.prototype.updateMatrixWorld.call(this, e), t.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(t.x, t.y, t.z) } }() }), Object.assign(bn.prototype, { getFrequencyData: function() {
                return this.analyser.getByteFrequencyData(this.data), this.data }, getAverageFrequency: function() {
                for (var t = 0, e = this.getFrequencyData(), i = 0; i < e.length; i++) t += e[i];
                return t / e.length } }), wn.prototype = { constructor: wn, accumulate: function(t, e) {
                var i = this.buffer,
                    n = this.valueSize,
                    r = t * n + n,
                    a = this.cumulativeWeight;
                if (0 === a) {
                    for (var o = 0; o !== n; ++o) i[r + o] = i[o];
                    a = e } else { a += e;
                    var s = e / a;
                    this._mixBufferRegion(i, r, 0, s, n) }
                this.cumulativeWeight = a }, apply: function(t) {
                var e = this.valueSize,
                    i = this.buffer,
                    n = t * e + e,
                    r = this.cumulativeWeight,
                    a = this.binding;
                if (this.cumulativeWeight = 0, r < 1) {
                    var o = 3 * e;
                    this._mixBufferRegion(i, n, o, 1 - r, e) }
                for (var s = e, h = e + e; s !== h; ++s)
                    if (i[s] !== i[s + e]) { a.setValue(i, n);
                        break } }, saveOriginalState: function() {
                var t = this.binding,
                    e = this.buffer,
                    i = this.valueSize,
                    n = 3 * i;
                t.getValue(e, n);
                for (var r = i, a = n; r !== a; ++r) e[r] = e[n + r % i];
                this.cumulativeWeight = 0 }, restoreOriginalState: function() {
                var t = 3 * this.valueSize;
                this.binding.setValue(this.buffer, t) }, _select: function(t, e, i, n, r) {
                if (n >= .5)
                    for (var a = 0; a !== r; ++a) t[e + a] = t[i + a] }, _slerp: function(t, e, i, n, r) { s.slerpFlat(t, e, t, e, t, i, n) }, _lerp: function(t, e, i, n, r) {
                for (var a = 1 - n, o = 0; o !== r; ++o) {
                    var s = e + o;
                    t[s] = t[s] * a + t[i + o] * n } } }, Mn.prototype = { constructor: Mn, getValue: function(t, e) { this.bind(), this.getValue(t, e) }, setValue: function(t, e) { this.bind(), this.setValue(t, e) }, bind: function() {
                var t = this.node,
                    e = this.parsedPath,
                    i = e.objectName,
                    n = e.propertyName,
                    r = e.propertyIndex;
                if (t || (t = Mn.findNode(this.rootNode, e.nodeName) || this.rootNode, this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) return void console.error("  trying to update node for track: " + this.path + " but it wasn't found.");
                if (i) {
                    var a = e.objectIndex;
                    switch (i) {
                        case "materials":
                            if (!t.material) return void console.error("  can not bind to material as node does not have a material", this);
                            if (!t.material.materials) return void console.error("  can not bind to material.materials as node.material does not have a materials array", this);
                            t = t.material.materials;
                            break;
                        case "bones":
                            if (!t.skeleton) return void console.error("  can not bind to bones as node does not have a skeleton", this);
                            t = t.skeleton.bones;
                            for (var o = 0; o < t.length; o++)
                                if (t[o].name === a) { a = o;
                                    break }
                            break;
                        default:
                            if (void 0 === t[i]) return void console.error("  can not bind to objectName of node, undefined", this);
                            t = t[i] }
                    if (void 0 !== a) {
                        if (void 0 === t[a]) return void console.error("  trying to bind to objectIndex of objectName, but is undefined:", this, t);
                        t = t[a] } }
                var s = t[n];
                if (void 0 === s) {
                    var h = e.nodeName;
                    return void console.error("  trying to update property for track: " + h + "." + n + " but it wasn't found.", t) }
                var l = this.Versioning.None;
                void 0 !== t.needsUpdate ? (l = this.Versioning.NeedsUpdate, this.targetObject = t) : void 0 !== t.matrixWorldNeedsUpdate && (l = this.Versioning.MatrixWorldNeedsUpdate, this.targetObject = t);
                var c = this.BindingType.Direct;
                if (void 0 !== r) {
                    if ("morphTargetInfluences" === n) {
                        if (!t.geometry) return void console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry", this);
                        if (!t.geometry.morphTargets) return void console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry.morphTargets", this);
                        for (var o = 0; o < this.node.geometry.morphTargets.length; o++)
                            if (t.geometry.morphTargets[o].name === r) { r = o;
                                break } }
                    c = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r } else void 0 !== s.fromArray && void 0 !== s.toArray ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = s) : void 0 !== s.length ? (c = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = n;
                this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][l] }, unbind: function() { this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } }, Object.assign(Mn.prototype, { _getValue_unavailable: function() {}, _setValue_unavailable: function() {}, _getValue_unbound: Mn.prototype.getValue, _setValue_unbound: Mn.prototype.setValue, BindingType: { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 }, Versioning: { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }, GetterByBindingType: [function(t, e) { t[e] = this.node[this.propertyName] }, function(t, e) {
                for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) t[e++] = i[n] }, function(t, e) { t[e] = this.resolvedProperty[this.propertyIndex] }, function(t, e) { this.resolvedProperty.toArray(t, e) }], SetterByBindingTypeAndVersioning: [
                [function(t, e) { this.node[this.propertyName] = t[e] }, function(t, e) { this.node[this.propertyName] = t[e], this.targetObject.needsUpdate = !0 }, function(t, e) { this.node[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0 }],
                [function(t, e) {
                    for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) i[n] = t[e++] }, function(t, e) {
                    for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
                    this.targetObject.needsUpdate = !0 }, function(t, e) {
                    for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
                    this.targetObject.matrixWorldNeedsUpdate = !0 }],
                [function(t, e) { this.resolvedProperty[this.propertyIndex] = t[e] }, function(t, e) { this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0 }, function(t, e) { this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0 }],
                [function(t, e) { this.resolvedProperty.fromArray(t, e) }, function(t, e) { this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0 }, function(t, e) { this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0 }]
            ] }), Mn.Composite = function(t, e, i) {
            var n = i || Mn.parseTrackName(e);
            this._targetGroup = t, this._bindings = t.subscribe_(e, n) }, Mn.Composite.prototype = { constructor: Mn.Composite, getValue: function(t, e) { this.bind();
                var i = this._targetGroup.nCachedObjects_,
                    n = this._bindings[i];
                void 0 !== n && n.getValue(t, e) }, setValue: function(t, e) {
                for (var i = this._bindings, n = this._targetGroup.nCachedObjects_, r = i.length; n !== r; ++n) i[n].setValue(t, e) }, bind: function() {
                for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].bind() }, unbind: function() {
                for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].unbind() } }, Mn.create = function(t, e, i) {
            return t && t.isAnimationObjectGroup ? new Mn.Composite(t, e, i) : new Mn(t, e, i) }, Mn.parseTrackName = function(t) {
            var e = /^((?:[\w-]+[\/:])*)([\w-]+)?(?:\.([\w-]+)(?:\[(.+)\])?)?\.([\w-]+)(?:\[(.+)\])?$/,
                i = e.exec(t);
            if (!i) throw new Error("cannot parse trackName at all: " + t);
            var n = { nodeName: i[2], objectName: i[3], objectIndex: i[4], propertyName: i[5], propertyIndex: i[6] };
            if (null === n.propertyName || 0 === n.propertyName.length) throw new Error("can not parse propertyName from trackName: " + t);
            return n }, Mn.findNode = function(t, e) {
            if (!e || "" === e || "root" === e || "." === e || e === -1 || e === t.name || e === t.uuid) return t;
            if (t.skeleton) {
                var i = function(t) {
                        for (var i = 0; i < t.bones.length; i++) {
                            var n = t.bones[i];
                            if (n.name === e) return n }
                        return null },
                    n = i(t.skeleton);
                if (n) return n }
            if (t.children) {
                var r = function(t) {
                        for (var i = 0; i < t.length; i++) {
                            var n = t[i];
                            if (n.name === e || n.uuid === e) return n;
                            var a = r(n.children);
                            if (a) return a }
                        return null },
                    a = r(t.children);
                if (a) return a }
            return null }, Tn.prototype = { constructor: Tn, isAnimationObjectGroup: !0, add: function(t) {
                for (var e = this._objects, i = e.length, n = this.nCachedObjects_, r = this._indicesByUUID, a = this._paths, o = this._parsedPaths, s = this._bindings, h = s.length, l = 0, c = arguments.length; l !== c; ++l) {
                    var u = arguments[l],
                        p = u.uuid,
                        d = r[p],
                        f = void 0;
                    if (void 0 === d) { d = i++, r[p] = d, e.push(u);
                        for (var m = 0, g = h; m !== g; ++m) s[m].push(new Mn(u, a[m], o[m])) } else if (d < n) { f = e[d];
                        var v = --n,
                            y = e[v];
                        r[y.uuid] = d, e[d] = y, r[p] = v, e[v] = u;
                        for (var m = 0, g = h; m !== g; ++m) {
                            var _ = s[m],
                                x = _[v],
                                b = _[d];
                            _[d] = x, void 0 === b && (b = new Mn(u, a[m], o[m])), _[v] = b } } else e[d] !== f && console.error("Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes...") }
                this.nCachedObjects_ = n }, remove: function(t) {
                for (var e = this._objects, i = this.nCachedObjects_, n = this._indicesByUUID, r = this._bindings, a = r.length, o = 0, s = arguments.length; o !== s; ++o) {
                    var h = arguments[o],
                        l = h.uuid,
                        c = n[l];
                    if (void 0 !== c && c >= i) {
                        var u = i++,
                            p = e[u];
                        n[p.uuid] = c, e[c] = p, n[l] = u, e[u] = h;
                        for (var d = 0, f = a; d !== f; ++d) {
                            var m = r[d],
                                g = m[u],
                                v = m[c];
                            m[c] = g, m[u] = v } } }
                this.nCachedObjects_ = i }, uncache: function(t) {
                for (var e = this._objects, i = e.length, n = this.nCachedObjects_, r = this._indicesByUUID, a = this._bindings, o = a.length, s = 0, h = arguments.length; s !== h; ++s) {
                    var l = arguments[s],
                        c = l.uuid,
                        u = r[c];
                    if (void 0 !== u)
                        if (delete r[c], u < n) {
                            var p = --n,
                                d = e[p],
                                f = --i,
                                m = e[f];
                            r[d.uuid] = u, e[u] = d, r[m.uuid] = p, e[p] = m, e.pop();
                            for (var g = 0, v = o; g !== v; ++g) {
                                var y = a[g],
                                    _ = y[p],
                                    x = y[f];
                                y[u] = _, y[p] = x, y.pop() } } else {
                            var f = --i,
                                m = e[f];
                            r[m.uuid] = u, e[u] = m, e.pop();
                            for (var g = 0, v = o; g !== v; ++g) {
                                var y = a[g];
                                y[u] = y[f], y.pop() } } }
                this.nCachedObjects_ = n }, subscribe_: function(t, e) {
                var i = this._bindingsIndicesByPath,
                    n = i[t],
                    r = this._bindings;
                if (void 0 !== n) return r[n];
                var a = this._paths,
                    o = this._parsedPaths,
                    s = this._objects,
                    h = s.length,
                    l = this.nCachedObjects_,
                    c = new Array(h);
                n = r.length, i[t] = n, a.push(t), o.push(e), r.push(c);
                for (var u = l, p = s.length; u !== p; ++u) {
                    var d = s[u];
                    c[u] = new Mn(d, t, e) }
                return c }, unsubscribe_: function(t) {
                var e = this._bindingsIndicesByPath,
                    i = e[t];
                if (void 0 !== i) {
                    var n = this._paths,
                        r = this._parsedPaths,
                        a = this._bindings,
                        o = a.length - 1,
                        s = a[o],
                        h = t[o];
                    e[h] = i, a[i] = s, a.pop(), r[i] = r[o], r.pop(), n[i] = n[o], n.pop() } } }, En.prototype = { constructor: En, play: function() {
                return this._mixer._activateAction(this), this }, stop: function() {
                return this._mixer._deactivateAction(this), this.reset() }, reset: function() {
                return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping() }, isRunning: function() {
                return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this) }, isScheduled: function() {
                return this._mixer._isActiveAction(this) }, startAt: function(t) {
                return this._startTime = t, this }, setLoop: function(t, e) {
                return this.loop = t, this.repetitions = e, this }, setEffectiveWeight: function(t) {
                return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading() }, getEffectiveWeight: function() {
                return this._effectiveWeight }, fadeIn: function(t) {
                return this._scheduleFading(t, 0, 1) }, fadeOut: function(t) {
                return this._scheduleFading(t, 1, 0) }, crossFadeFrom: function(t, e, i) {
                if (t.fadeOut(e), this.fadeIn(e), i) {
                    var n = this._clip.duration,
                        r = t._clip.duration,
                        a = r / n,
                        o = n / r;
                    t.warp(1, a, e), this.warp(o, 1, e) }
                return this }, crossFadeTo: function(t, e, i) {
                return t.crossFadeFrom(this, e, i) }, stopFading: function() {
                var t = this._weightInterpolant;
                return null !== t && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this }, setEffectiveTimeScale: function(t) {
                return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping() }, getEffectiveTimeScale: function() {
                return this._effectiveTimeScale }, setDuration: function(t) {
                return this.timeScale = this._clip.duration / t, this.stopWarping() }, syncWith: function(t) {
                return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping() }, halt: function(t) {
                return this.warp(this._effectiveTimeScale, 0, t) }, warp: function(t, e, i) {
                var n = this._mixer,
                    r = n.time,
                    a = this._timeScaleInterpolant,
                    o = this.timeScale;
                null === a && (a = n._lendControlInterpolant(), this._timeScaleInterpolant = a);
                var s = a.parameterPositions,
                    h = a.sampleValues;
                return s[0] = r, s[1] = r + i, h[0] = t / o, h[1] = e / o, this }, stopWarping: function() {
                var t = this._timeScaleInterpolant;
                return null !== t && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this }, getMixer: function() {
                return this._mixer }, getClip: function() {
                return this._clip }, getRoot: function() {
                return this._localRoot || this._mixer._root }, _update: function(t, e, i, n) {
                var r = this._startTime;
                if (null !== r) {
                    var a = (t - r) * i;
                    if (a < 0 || 0 === i) return;
                    this._startTime = null, e = i * a }
                e *= this._updateTimeScale(t);
                var o = this._updateTime(e),
                    s = this._updateWeight(t);
                if (s > 0)
                    for (var h = this._interpolants, l = this._propertyBindings, c = 0, u = h.length; c !== u; ++c) h[c].evaluate(o), l[c].accumulate(n, s) }, _updateWeight: function(t) {
                var e = 0;
                if (this.enabled) { e = this.weight;
                    var i = this._weightInterpolant;
                    if (null !== i) {
                        var n = i.evaluate(t)[0];
                        e *= n, t > i.parameterPositions[1] && (this.stopFading(), 0 === n && (this.enabled = !1)) } }
                return this._effectiveWeight = e, e }, _updateTimeScale: function(t) {
                var e = 0;
                if (!this.paused) { e = this.timeScale;
                    var i = this._timeScaleInterpolant;
                    if (null !== i) {
                        var n = i.evaluate(t)[0];
                        e *= n, t > i.parameterPositions[1] && (this.stopWarping(), 0 === e ? this.paused = !0 : this.timeScale = e) } }
                return this._effectiveTimeScale = e, e }, _updateTime: function(t) {
                var e = this.time + t;
                if (0 === t) return e;
                var i = this._clip.duration,
                    n = this.loop,
                    r = this._loopCount;
                if (n === Lo) { r === -1 && (this._loopCount = 0, this._setEndings(!0, !0, !1));
                    t: {
                        if (e >= i) e = i;
                        else {
                            if (!(e < 0)) break t;
                            e = 0 }
                        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this._mixer.dispatchEvent({ type: "finished", action: this, direction: t < 0 ? -1 : 1 }) } } else {
                    var a = n === Co;
                    if (r === -1 && (t >= 0 ? (r = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), e >= i || e < 0) {
                        var o = Math.floor(e / i);
                        e -= i * o, r += Math.abs(o);
                        var s = this.repetitions - r;
                        if (s < 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, e = t > 0 ? i : 0, this._mixer.dispatchEvent({ type: "finished", action: this, direction: t > 0 ? 1 : -1 });
                        else {
                            if (0 === s) {
                                var h = t < 0;
                                this._setEndings(h, !h, a) } else this._setEndings(!1, !1, a);
                            this._loopCount = r, this._mixer.dispatchEvent({ type: "loop", action: this, loopDelta: o }) } }
                    if (a && 1 === (1 & r)) return this.time = e, i - e }
                return this.time = e, e }, _setEndings: function(t, e, i) {
                var n = this._interpolantSettings;
                i ? (n.endingStart = No, n.endingEnd = No) : (t ? n.endingStart = this.zeroSlopeAtStart ? No : Uo : n.endingStart = Fo, e ? n.endingEnd = this.zeroSlopeAtEnd ? No : Uo : n.endingEnd = Fo) }, _scheduleFading: function(t, e, i) {
                var n = this._mixer,
                    r = n.time,
                    a = this._weightInterpolant;
                null === a && (a = n._lendControlInterpolant(), this._weightInterpolant = a);
                var o = a.parameterPositions,
                    s = a.sampleValues;
                return o[0] = r, s[0] = e, o[1] = r + t, s[1] = i, this } }, Object.assign(Sn.prototype, e.prototype, { clipAction: function(t, e) {
                var i = e || this._root,
                    n = i.uuid,
                    r = "string" == typeof t ? Zi.findByName(i, t) : t,
                    a = null !== r ? r.uuid : t,
                    o = this._actionsByClip[a],
                    s = null;
                if (void 0 !== o) {
                    var h = o.actionByRoot[n];
                    if (void 0 !== h) return h;
                    s = o.knownActions[0], null === r && (r = s._clip) }
                if (null === r) return null;
                var l = new En(this, r, e);
                return this._bindAction(l, s), this._addInactiveAction(l, a, n), l }, existingAction: function(t, e) {
                var i = e || this._root,
                    n = i.uuid,
                    r = "string" == typeof t ? Zi.findByName(i, t) : t,
                    a = r ? r.uuid : t,
                    o = this._actionsByClip[a];
                return void 0 !== o ? o.actionByRoot[n] || null : null }, stopAllAction: function() {
                var t = this._actions,
                    e = this._nActiveActions,
                    i = this._bindings,
                    n = this._nActiveBindings;
                this._nActiveActions = 0, this._nActiveBindings = 0;
                for (var r = 0; r !== e; ++r) t[r].reset();
                for (var r = 0; r !== n; ++r) i[r].useCount = 0;
                return this }, update: function(t) { t *= this.timeScale;
                for (var e = this._actions, i = this._nActiveActions, n = this.time += t, r = Math.sign(t), a = this._accuIndex ^= 1, o = 0; o !== i; ++o) {
                    var s = e[o];
                    s.enabled && s._update(n, t, r, a) }
                for (var h = this._bindings, l = this._nActiveBindings, o = 0; o !== l; ++o) h[o].apply(a);
                return this }, getRoot: function() {
                return this._root }, uncacheClip: function(t) {
                var e = this._actions,
                    i = t.uuid,
                    n = this._actionsByClip,
                    r = n[i];
                if (void 0 !== r) {
                    for (var a = r.knownActions, o = 0, s = a.length; o !== s; ++o) {
                        var h = a[o];
                        this._deactivateAction(h);
                        var l = h._cacheIndex,
                            c = e[e.length - 1];
                        h._cacheIndex = null, h._byClipCacheIndex = null, c._cacheIndex = l, e[l] = c, e.pop(), this._removeInactiveBindingsForAction(h) }
                    delete n[i] } }, uncacheRoot: function(t) {
                var e = t.uuid,
                    i = this._actionsByClip;
                for (var n in i) {
                    var r = i[n].actionByRoot,
                        a = r[e];
                    void 0 !== a && (this._deactivateAction(a), this._removeInactiveAction(a)) }
                var o = this._bindingsByRootAndName,
                    s = o[e];
                if (void 0 !== s)
                    for (var h in s) {
                        var l = s[h];
                        l.restoreOriginalState(), this._removeInactiveBinding(l) } }, uncacheAction: function(t, e) {
                var i = this.existingAction(t, e);
                null !== i && (this._deactivateAction(i), this._removeInactiveAction(i)) } }), Object.assign(Sn.prototype, { _bindAction: function(t, e) {
                var i = t._localRoot || this._root,
                    n = t._clip.tracks,
                    r = n.length,
                    a = t._propertyBindings,
                    o = t._interpolants,
                    s = i.uuid,
                    h = this._bindingsByRootAndName,
                    l = h[s];
                void 0 === l && (l = {}, h[s] = l);
                for (var c = 0; c !== r; ++c) {
                    var u = n[c],
                        p = u.name,
                        d = l[p];
                    if (void 0 !== d) a[c] = d;
                    else {
                        if (d = a[c], void 0 !== d) { null === d._cacheIndex && (++d.referenceCount, this._addInactiveBinding(d, s, p));
                            continue }
                        var f = e && e._propertyBindings[c].binding.parsedPath;
                        d = new wn(Mn.create(i, p, f), u.ValueTypeName, u.getValueSize()), ++d.referenceCount, this._addInactiveBinding(d, s, p), a[c] = d }
                    o[c].resultBuffer = d.buffer } }, _activateAction: function(t) {
                if (!this._isActiveAction(t)) {
                    if (null === t._cacheIndex) {
                        var e = (t._localRoot || this._root).uuid,
                            i = t._clip.uuid,
                            n = this._actionsByClip[i];
                        this._bindAction(t, n && n.knownActions[0]), this._addInactiveAction(t, i, e) }
                    for (var r = t._propertyBindings, a = 0, o = r.length; a !== o; ++a) {
                        var s = r[a];
                        0 === s.useCount++ && (this._lendBinding(s), s.saveOriginalState()) }
                    this._lendAction(t) } }, _deactivateAction: function(t) {
                if (this._isActiveAction(t)) {
                    for (var e = t._propertyBindings, i = 0, n = e.length; i !== n; ++i) {
                        var r = e[i];
                        0 === --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r)) }
                    this._takeBackAction(t) } }, _initMemoryManager: function() { this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
                var t = this;
                this.stats = { actions: {get total() {
                            return t._actions.length }, get inUse() {
                            return t._nActiveActions } }, bindings: {get total() {
                            return t._bindings.length }, get inUse() {
                            return t._nActiveBindings } }, controlInterpolants: {get total() {
                            return t._controlInterpolants.length }, get inUse() {
                            return t._nActiveControlInterpolants } } } }, _isActiveAction: function(t) {
                var e = t._cacheIndex;
                return null !== e && e < this._nActiveActions }, _addInactiveAction: function(t, e, i) {
                var n = this._actions,
                    r = this._actionsByClip,
                    a = r[e];
                if (void 0 === a) a = { knownActions: [t], actionByRoot: {} }, t._byClipCacheIndex = 0, r[e] = a;
                else {
                    var o = a.knownActions;
                    t._byClipCacheIndex = o.length, o.push(t) }
                t._cacheIndex = n.length, n.push(t), a.actionByRoot[i] = t }, _removeInactiveAction: function(t) {
                var e = this._actions,
                    i = e[e.length - 1],
                    n = t._cacheIndex;
                i._cacheIndex = n, e[n] = i, e.pop(), t._cacheIndex = null;
                var r = t._clip.uuid,
                    a = this._actionsByClip,
                    o = a[r],
                    s = o.knownActions,
                    h = s[s.length - 1],
                    l = t._byClipCacheIndex;
                h._byClipCacheIndex = l, s[l] = h, s.pop(), t._byClipCacheIndex = null;
                var c = o.actionByRoot,
                    u = (e._localRoot || this._root).uuid;
                delete c[u], 0 === s.length && delete a[r], this._removeInactiveBindingsForAction(t) }, _removeInactiveBindingsForAction: function(t) {
                for (var e = t._propertyBindings, i = 0, n = e.length; i !== n; ++i) {
                    var r = e[i];
                    0 === --r.referenceCount && this._removeInactiveBinding(r) } }, _lendAction: function(t) {
                var e = this._actions,
                    i = t._cacheIndex,
                    n = this._nActiveActions++,
                    r = e[n];
                t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r }, _takeBackAction: function(t) {
                var e = this._actions,
                    i = t._cacheIndex,
                    n = --this._nActiveActions,
                    r = e[n];
                t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r }, _addInactiveBinding: function(t, e, i) {
                var n = this._bindingsByRootAndName,
                    r = n[e],
                    a = this._bindings;
                void 0 === r && (r = {}, n[e] = r), r[i] = t, t._cacheIndex = a.length, a.push(t) }, _removeInactiveBinding: function(t) {
                var e = this._bindings,
                    i = t.binding,
                    n = i.rootNode.uuid,
                    r = i.path,
                    a = this._bindingsByRootAndName,
                    o = a[n],
                    s = e[e.length - 1],
                    h = t._cacheIndex;
                s._cacheIndex = h, e[h] = s, e.pop(), delete o[r];
                t: {
                    for (var l in o) break t;delete a[n] } }, _lendBinding: function(t) {
                var e = this._bindings,
                    i = t._cacheIndex,
                    n = this._nActiveBindings++,
                    r = e[n];
                t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r }, _takeBackBinding: function(t) {
                var e = this._bindings,
                    i = t._cacheIndex,
                    n = --this._nActiveBindings,
                    r = e[n];
                t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r }, _lendControlInterpolant: function() {
                var t = this._controlInterpolants,
                    e = this._nActiveControlInterpolants++,
                    i = t[e];
                return void 0 === i && (i = new zi(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), i.__cacheIndex = e, t[e] = i), i }, _takeBackControlInterpolant: function(t) {
                var e = this._controlInterpolants,
                    i = t.__cacheIndex,
                    n = --this._nActiveControlInterpolants,
                    r = e[n];
                t.__cacheIndex = n, e[n] = t, r.__cacheIndex = i, e[i] = r }, _controlInterpolantsResultBuffer: new Float32Array(1) }), An.prototype.clone = function() {
            return new An(void 0 === this.value.clone ? this.value : this.value.clone()) }, Rn.prototype = Object.create(St.prototype), Rn.prototype.constructor = Rn, Rn.prototype.isInstancedBufferGeometry = !0, Rn.prototype.addGroup = function(t, e, i) { this.groups.push({ start: t, count: e, materialIndex: i }) }, Rn.prototype.copy = function(t) {
            var e = t.index;
            null !== e && this.setIndex(e.clone());
            var i = t.attributes;
            for (var n in i) {
                var r = i[n];
                this.addAttribute(n, r.clone()) }
            for (var a = t.groups, o = 0, s = a.length; o < s; o++) {
                var h = a[o];
                this.addGroup(h.start, h.count, h.materialIndex) }
            return this }, Ln.prototype = { constructor: Ln, isInterleavedBufferAttribute: !0, get count() {
                return this.data.count }, get array() {
                return this.data.array }, setX: function(t, e) {
                return this.data.array[t * this.data.stride + this.offset] = e, this }, setY: function(t, e) {
                return this.data.array[t * this.data.stride + this.offset + 1] = e, this }, setZ: function(t, e) {
                return this.data.array[t * this.data.stride + this.offset + 2] = e, this }, setW: function(t, e) {
                return this.data.array[t * this.data.stride + this.offset + 3] = e, this }, getX: function(t) {
                return this.data.array[t * this.data.stride + this.offset] }, getY: function(t) {
                return this.data.array[t * this.data.stride + this.offset + 1] }, getZ: function(t) {
                return this.data.array[t * this.data.stride + this.offset + 2] }, getW: function(t) {
                return this.data.array[t * this.data.stride + this.offset + 3] }, setXY: function(t, e, i) {
                return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = i, this }, setXYZ: function(t, e, i, n) {
                return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = i, this.data.array[t + 2] = n, this }, setXYZW: function(t, e, i, n, r) {
                return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = i, this.data.array[t + 2] = n, this.data.array[t + 3] = r, this } }, Pn.prototype = { constructor: Pn, isInterleavedBuffer: !0, set needsUpdate(t) { t === !0 && this.version++ }, setArray: function(t) {
                if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                this.count = void 0 !== t ? t.length / this.stride : 0, this.array = t }, setDynamic: function(t) {
                return this.dynamic = t, this }, copy: function(t) {
                return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.dynamic = t.dynamic, this }, copyAt: function(t, e, i) { t *= this.stride, i *= e.stride;
                for (var n = 0, r = this.stride; n < r; n++) this.array[t + n] = e.array[i + n];
                return this }, set: function(t, e) {
                return void 0 === e && (e = 0), this.array.set(t, e), this }, clone: function() {
                return (new this.constructor).copy(this) }, onUpload: function(t) {
                return this.onUploadCallback = t, this } }, Cn.prototype = Object.create(Pn.prototype), Cn.prototype.constructor = Cn, Cn.prototype.isInstancedInterleavedBuffer = !0, Cn.prototype.copy = function(t) {
            return Pn.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this }, In.prototype = Object.create(dt.prototype), In.prototype.constructor = In, In.prototype.isInstancedBufferAttribute = !0, In.prototype.copy = function(t) {
            return dt.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this }, On.prototype = {
            constructor: On,
            linePrecision: 1,
            set: function(t, e) {
                this.ray.set(t, e)
            },
            setFromCamera: function(t, e) { e && e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, .5).unproject(e).sub(this.ray.origin).normalize()) : e && e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.") },
            intersectObject: function(t, e) {
                var i = [];
                return Un(t, this, i, e), i.sort(Dn), i },
            intersectObjects: function(t, e) {
                var i = [];
                if (Array.isArray(t) === !1) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), i;
                for (var n = 0, r = t.length; n < r; n++) Un(t[n], this, i, e);
                return i.sort(Dn), i }
        }, Nn.prototype = { constructor: Nn, start: function() { this.startTime = (performance || Date).now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0 }, stop: function() { this.getElapsedTime(), this.running = !1 }, getElapsedTime: function() {
                return this.getDelta(), this.elapsedTime }, getDelta: function() {
                var t = 0;
                if (this.autoStart && !this.running && this.start(), this.running) {
                    var e = (performance || Date).now();
                    t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t }
                return t } }, zn.prototype = { constructor: zn, set: function(t, e, i) {
                return this.radius = t, this.phi = e, this.theta = i, this }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this }, makeSafe: function() {
                var t = 1e-6;
                return this.phi = Math.max(t, Math.min(Math.PI - t, this.phi)), this }, setFromVector3: function(t) {
                return this.radius = t.length(), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t.x, t.z), this.phi = Math.acos(Qo.clamp(t.y / this.radius, -1, 1))), this } }, Bn.prototype = { constructor: Bn, set: function(t, e, i) {
                return this.radius = t, this.theta = e, this.y = i, this }, clone: function() {
                return (new this.constructor).copy(this) }, copy: function(t) {
                return this.radius = t.radius, this.theta = t.theta, this.y = t.y, this }, setFromVector3: function(t) {
                return this.radius = Math.sqrt(t.x * t.x + t.z * t.z), this.theta = Math.atan2(t.x, t.z), this.y = t.y, this } }, Gn.prototype = Object.create(At.prototype), Gn.prototype.constructor = Gn, Gn.prototype.createAnimation = function(t, e, i, n) {
            var r = { start: e, end: i, length: i - e + 1, fps: n, duration: (i - e) / n, lastFrame: 0, currentFrame: 0, active: !1, time: 0, direction: 1, weight: 1, directionBackwards: !1, mirroredLoop: !1 };
            this.animationsMap[t] = r, this.animationsList.push(r) }, Gn.prototype.autoCreateAnimations = function(t) {
            for (var e, i = /([a-z]+)_?(\d+)/i, n = {}, r = this.geometry, a = 0, o = r.morphTargets.length; a < o; a++) {
                var s = r.morphTargets[a],
                    h = s.name.match(i);
                if (h && h.length > 1) {
                    var l = h[1];
                    n[l] || (n[l] = { start: 1 / 0, end: -(1 / 0) });
                    var c = n[l];
                    a < c.start && (c.start = a), a > c.end && (c.end = a), e || (e = l) } }
            for (var l in n) {
                var c = n[l];
                this.createAnimation(l, c.start, c.end, t) }
            this.firstAnimation = e }, Gn.prototype.setAnimationDirectionForward = function(t) {
            var e = this.animationsMap[t];
            e && (e.direction = 1, e.directionBackwards = !1) }, Gn.prototype.setAnimationDirectionBackward = function(t) {
            var e = this.animationsMap[t];
            e && (e.direction = -1, e.directionBackwards = !0) }, Gn.prototype.setAnimationFPS = function(t, e) {
            var i = this.animationsMap[t];
            i && (i.fps = e, i.duration = (i.end - i.start) / i.fps) }, Gn.prototype.setAnimationDuration = function(t, e) {
            var i = this.animationsMap[t];
            i && (i.duration = e, i.fps = (i.end - i.start) / i.duration) }, Gn.prototype.setAnimationWeight = function(t, e) {
            var i = this.animationsMap[t];
            i && (i.weight = e) }, Gn.prototype.setAnimationTime = function(t, e) {
            var i = this.animationsMap[t];
            i && (i.time = e) }, Gn.prototype.getAnimationTime = function(t) {
            var e = 0,
                i = this.animationsMap[t];
            return i && (e = i.time), e }, Gn.prototype.getAnimationDuration = function(t) {
            var e = -1,
                i = this.animationsMap[t];
            return i && (e = i.duration), e }, Gn.prototype.playAnimation = function(t) {
            var e = this.animationsMap[t];
            e ? (e.time = 0, e.active = !0) : console.warn("THREE.MorphBlendMesh: animation[" + t + "] undefined in .playAnimation()") }, Gn.prototype.stopAnimation = function(t) {
            var e = this.animationsMap[t];
            e && (e.active = !1) }, Gn.prototype.update = function(t) {
            for (var e = 0, i = this.animationsList.length; e < i; e++) {
                var n = this.animationsList[e];
                if (n.active) {
                    var r = n.duration / n.length;
                    n.time += n.direction * t, n.mirroredLoop ? (n.time > n.duration || n.time < 0) && (n.direction *= -1, n.time > n.duration && (n.time = n.duration, n.directionBackwards = !0), n.time < 0 && (n.time = 0, n.directionBackwards = !1)) : (n.time = n.time % n.duration, n.time < 0 && (n.time += n.duration));
                    var a = n.start + Qo.clamp(Math.floor(n.time / r), 0, n.length - 1),
                        o = n.weight;
                    a !== n.currentFrame && (this.morphTargetInfluences[n.lastFrame] = 0, this.morphTargetInfluences[n.currentFrame] = 1 * o, this.morphTargetInfluences[a] = 0, n.lastFrame = n.currentFrame, n.currentFrame = a);
                    var s = n.time % r / r;
                    n.directionBackwards && (s = 1 - s), n.currentFrame !== n.lastFrame ? (this.morphTargetInfluences[n.currentFrame] = s * o, this.morphTargetInfluences[n.lastFrame] = (1 - s) * o) : this.morphTargetInfluences[n.currentFrame] = o } } }, kn.prototype = Object.create(ht.prototype), kn.prototype.constructor = kn, kn.prototype.isImmediateRenderObject = !0, Hn.prototype = Object.create(ye.prototype), Hn.prototype.constructor = Hn, Hn.prototype.update = function() {
            var t = new h,
                e = new h,
                i = new et;
            return function() {
                var n = ["a", "b", "c"];
                this.object.updateMatrixWorld(!0), i.getNormalMatrix(this.object.matrixWorld);
                var r = this.object.matrixWorld,
                    a = this.geometry.attributes.position,
                    o = this.object.geometry;
                if (o && o.isGeometry)
                    for (var s = o.vertices, h = o.faces, l = 0, c = 0, u = h.length; c < u; c++)
                        for (var p = h[c], d = 0, f = p.vertexNormals.length; d < f; d++) {
                            var m = s[p[n[d]]],
                                g = p.vertexNormals[d];
                            t.copy(m).applyMatrix4(r), e.copy(g).applyMatrix3(i).normalize().multiplyScalar(this.size).add(t), a.setXYZ(l, t.x, t.y, t.z), l += 1, a.setXYZ(l, e.x, e.y, e.z), l += 1 } else if (o && o.isBufferGeometry)
                            for (var v = o.attributes.position, y = o.attributes.normal, l = 0, d = 0, f = v.count; d < f; d++) t.set(v.getX(d), v.getY(d), v.getZ(d)).applyMatrix4(r), e.set(y.getX(d), y.getY(d), y.getZ(d)), e.applyMatrix3(i).normalize().multiplyScalar(this.size).add(t), a.setXYZ(l, t.x, t.y, t.z), l += 1, a.setXYZ(l, e.x, e.y, e.z), l += 1;
                return a.needsUpdate = !0, this } }(), jn.prototype = Object.create(ht.prototype), jn.prototype.constructor = jn, jn.prototype.dispose = function() { this.cone.geometry.dispose(), this.cone.material.dispose() }, jn.prototype.update = function() {
            var t = new h,
                e = new h;
            return function() {
                var i = this.light.distance ? this.light.distance : 1e3,
                    n = i * Math.tan(this.light.angle);
                this.cone.scale.set(n, n, i), t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(e.sub(t)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity) } }(), Vn.prototype = Object.create(ye.prototype), Vn.prototype.constructor = Vn, Vn.prototype.getBoneList = function(t) {
            var e = [];
            t && t.isBone && e.push(t);
            for (var i = 0; i < t.children.length; i++) e.push.apply(e, this.getBoneList(t.children[i]));
            return e }, Vn.prototype.update = function() {
            var t = new h,
                e = new l,
                i = new l;
            return function() {
                var n = this.geometry,
                    r = n.getAttribute("position");
                i.getInverse(this.root.matrixWorld);
                for (var a = 0, o = 0; a < this.bones.length; a++) {
                    var s = this.bones[a];
                    s.parent && s.parent.isBone && (e.multiplyMatrices(i, s.matrixWorld), t.setFromMatrixPosition(e), r.setXYZ(o, t.x, t.y, t.z), e.multiplyMatrices(i, s.parent.matrixWorld), t.setFromMatrixPosition(e), r.setXYZ(o + 1, t.x, t.y, t.z), o += 2) }
                n.getAttribute("position").needsUpdate = !0 } }(), Wn.prototype = Object.create(At.prototype), Wn.prototype.constructor = Wn, Wn.prototype.dispose = function() { this.geometry.dispose(), this.material.dispose() }, Wn.prototype.update = function() { this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity) }, Xn.prototype = Object.create(ht.prototype), Xn.prototype.constructor = Xn, Xn.prototype.dispose = function() { this.children[0].geometry.dispose(), this.children[0].material.dispose(), this.children[1].geometry.dispose(), this.children[1].material.dispose() }, Xn.prototype.update = function() {
            var t = new h,
                e = new h;
            return function() {
                var i = this.children[0],
                    n = this.children[1];
                if (this.light.target) { t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld);
                    var r = e.clone().sub(t);
                    i.lookAt(r), n.lookAt(r) }
                i.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), n.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
                var a = .5 * this.light.width,
                    o = .5 * this.light.height,
                    s = i.geometry.getAttribute("position"),
                    h = s.array;
                h[0] = a, h[1] = -o, h[2] = 0, h[3] = a, h[4] = o, h[5] = 0, h[6] = -a, h[7] = o, h[8] = 0, h[9] = -a, h[10] = o, h[11] = 0, h[12] = -a, h[13] = -o, h[14] = 0, h[15] = a, h[16] = -o, h[17] = 0, s.needsUpdate = !0 } }(), Yn.prototype = Object.create(ht.prototype), Yn.prototype.constructor = Yn, Yn.prototype.dispose = function() { this.children[0].geometry.dispose(), this.children[0].material.dispose() }, Yn.prototype.update = function() {
            var t = new h,
                e = new W,
                i = new W;
            return function() {
                var n = this.children[0],
                    r = n.geometry.getAttribute("color");
                e.copy(this.light.color).multiplyScalar(this.light.intensity), i.copy(this.light.groundColor).multiplyScalar(this.light.intensity);
                for (var a = 0, o = r.count; a < o; a++) {
                    var s = a < o / 2 ? e : i;
                    r.setXYZ(a, s.r, s.g, s.b) }
                n.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate()), r.needsUpdate = !0 } }(), qn.prototype = Object.create(ye.prototype), qn.prototype.constructor = qn, Zn.prototype = Object.create(ye.prototype), Zn.prototype.constructor = Zn, Jn.prototype = Object.create(ye.prototype), Jn.prototype.constructor = Jn, Jn.prototype.update = function() {
            var t = new h,
                e = new h,
                i = new et;
            return function() { this.object.updateMatrixWorld(!0), i.getNormalMatrix(this.object.matrixWorld);
                for (var n = this.object.matrixWorld, r = this.geometry.attributes.position, a = this.object.geometry, o = a.vertices, s = a.faces, h = 0, l = 0, c = s.length; l < c; l++) {
                    var u = s[l],
                        p = u.normal;
                    t.copy(o[u.a]).add(o[u.b]).add(o[u.c]).divideScalar(3).applyMatrix4(n), e.copy(p).applyMatrix3(i).normalize().multiplyScalar(this.size).add(t), r.setXYZ(h, t.x, t.y, t.z), h += 1, r.setXYZ(h, e.x, e.y, e.z), h += 1 }
                return r.needsUpdate = !0, this } }(), Qn.prototype = Object.create(ht.prototype), Qn.prototype.constructor = Qn, Qn.prototype.dispose = function() {
            var t = this.children[0],
                e = this.children[1];
            t.geometry.dispose(), t.material.dispose(), e.geometry.dispose(), e.material.dispose() }, Qn.prototype.update = function() {
            var t = new h,
                e = new h,
                i = new h;
            return function() { t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), i.subVectors(e, t);
                var n = this.children[0],
                    r = this.children[1];
                n.lookAt(i), n.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), r.lookAt(i), r.scale.z = i.length() } }(), Kn.prototype = Object.create(ye.prototype), Kn.prototype.constructor = Kn, Kn.prototype.update = function() {
            function t(t, a, o, s) { n.set(a, o, s).unproject(r);
                var h = i[t];
                if (void 0 !== h)
                    for (var l = e.getAttribute("position"), c = 0, u = h.length; c < u; c++) l.setXYZ(h[c], n.x, n.y, n.z) }
            var e, i, n = new h,
                r = new Pt;
            return function() { e = this.geometry, i = this.pointMap;
                var n = 1,
                    a = 1;
                r.projectionMatrix.copy(this.camera.projectionMatrix), t("c", 0, 0, -1), t("t", 0, 0, 1), t("n1", -n, -a, -1), t("n2", n, -a, -1), t("n3", -n, a, -1), t("n4", n, a, -1), t("f1", -n, -a, 1), t("f2", n, -a, 1), t("f3", -n, a, 1), t("f4", n, a, 1), t("u1", .7 * n, 1.1 * a, -1), t("u2", .7 * -n, 1.1 * a, -1), t("u3", 0, 2 * a, -1), t("cf1", -n, 0, 1), t("cf2", n, 0, 1), t("cf3", 0, -a, 1), t("cf4", 0, a, 1), t("cn1", -n, 0, -1), t("cn2", n, 0, -1), t("cn3", 0, -a, -1), t("cn4", 0, a, -1), e.getAttribute("position").needsUpdate = !0 } }(), $n.prototype = Object.create(ye.prototype), $n.prototype.constructor = $n, $n.prototype.update = function() {
            var t = new $;
            return function(e) {
                if (e && e.isBox3 ? t.copy(e) : t.setFromObject(e), !t.isEmpty()) {
                    var i = t.min,
                        n = t.max,
                        r = this.geometry.attributes.position,
                        a = r.array;
                    a[0] = n.x, a[1] = n.y, a[2] = n.z, a[3] = i.x, a[4] = n.y, a[5] = n.z, a[6] = i.x, a[7] = i.y, a[8] = n.z, a[9] = n.x, a[10] = i.y, a[11] = n.z, a[12] = n.x, a[13] = n.y, a[14] = i.z, a[15] = i.x, a[16] = n.y, a[17] = i.z, a[18] = i.x, a[19] = i.y, a[20] = i.z, a[21] = n.x, a[22] = i.y, a[23] = i.z, r.needsUpdate = !0, this.geometry.computeBoundingSphere() } } }();
        var Ml = new St;
        Ml.addAttribute("position", new bt([0, 0, 0, 0, 1, 0], 3));
        var Tl = new ni(0, .5, 1, 5, 1);
        Tl.translate(0, -.5, 0), tr.prototype = Object.create(ht.prototype), tr.prototype.constructor = tr, tr.prototype.setDirection = function() {
            var t, e = new h;
            return function(i) { i.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : i.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (e.set(i.z, 0, -i.x).normalize(), t = Math.acos(i.y), this.quaternion.setFromAxisAngle(e, t)) } }(), tr.prototype.setLength = function(t, e, i) { void 0 === e && (e = .2 * t), void 0 === i && (i = .2 * e), this.line.scale.set(1, Math.max(0, t - e), 1), this.line.updateMatrix(), this.cone.scale.set(i, e, i), this.cone.position.y = t, this.cone.updateMatrix() }, tr.prototype.setColor = function(t) { this.line.material.color.copy(t), this.cone.material.color.copy(t) }, er.prototype = Object.create(ye.prototype), er.prototype.constructor = er;
        var El = function() {
                function t() {}
                var e = new h,
                    i = new t,
                    n = new t,
                    r = new t;
                return t.prototype.init = function(t, e, i, n) { this.c0 = t, this.c1 = i, this.c2 = -3 * t + 3 * e - 2 * i - n, this.c3 = 2 * t - 2 * e + i + n }, t.prototype.initNonuniformCatmullRom = function(t, e, i, n, r, a, o) {
                    var s = (e - t) / r - (i - t) / (r + a) + (i - e) / a,
                        h = (i - e) / a - (n - e) / (a + o) + (n - i) / o;
                    s *= a, h *= a, this.init(e, i, s, h) }, t.prototype.initCatmullRom = function(t, e, i, n, r) { this.init(e, i, r * (i - t), r * (n - e)) }, t.prototype.calc = function(t) {
                    var e = t * t,
                        i = e * t;
                    return this.c0 + this.c1 * t + this.c2 * e + this.c3 * i }, en.create(function(t) { this.points = t || [], this.closed = !1 }, function(t) {
                    var a, o, s, l, c = this.points;
                    l = c.length, l < 2 && console.log("duh, you need at least 2 points"), a = (l - (this.closed ? 0 : 1)) * t, o = Math.floor(a), s = a - o, this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / c.length) + 1) * c.length : 0 === s && o === l - 1 && (o = l - 2, s = 1);
                    var u, p, d, f;
                    if (this.closed || o > 0 ? u = c[(o - 1) % l] : (e.subVectors(c[0], c[1]).add(c[0]), u = e), p = c[o % l], d = c[(o + 1) % l], this.closed || o + 2 < l ? f = c[(o + 2) % l] : (e.subVectors(c[l - 1], c[l - 2]).add(c[l - 1]), f = e), void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
                        var m = "chordal" === this.type ? .5 : .25,
                            g = Math.pow(u.distanceToSquared(p), m),
                            v = Math.pow(p.distanceToSquared(d), m),
                            y = Math.pow(d.distanceToSquared(f), m);
                        v < 1e-4 && (v = 1), g < 1e-4 && (g = v), y < 1e-4 && (y = v), i.initNonuniformCatmullRom(u.x, p.x, d.x, f.x, g, v, y), n.initNonuniformCatmullRom(u.y, p.y, d.y, f.y, g, v, y), r.initNonuniformCatmullRom(u.z, p.z, d.z, f.z, g, v, y) } else if ("catmullrom" === this.type) {
                        var _ = void 0 !== this.tension ? this.tension : .5;
                        i.initCatmullRom(u.x, p.x, d.x, f.x, _), n.initCatmullRom(u.y, p.y, d.y, f.y, _), r.initCatmullRom(u.z, p.z, d.z, f.z, _) }
                    var x = new h(i.calc(s), n.calc(s), r.calc(s));
                    return x }) }(),
            Sl = en.create(function(t) { console.warn("THREE.SplineCurve3 will be deprecated. Please use THREE.CatmullRomCurve3"), this.points = void 0 === t ? [] : t }, function(t) {
                var e = this.points,
                    i = (e.length - 1) * t,
                    n = Math.floor(i),
                    r = i - n,
                    a = e[0 == n ? n : n - 1],
                    o = e[n],
                    s = e[n > e.length - 2 ? e.length - 1 : n + 1],
                    l = e[n > e.length - 3 ? e.length - 1 : n + 2],
                    c = _l.interpolate;
                return new h(c(a.x, o.x, s.x, l.x, r), c(a.y, o.y, s.y, l.y, r), c(a.z, o.z, s.z, l.z, r)) }),
            Al = en.create(function(t, e, i, n) { this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = n }, function(t) {
                var e = ul.b3;
                return new h(e(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y), e(t, this.v0.z, this.v1.z, this.v2.z, this.v3.z)) }),
            Rl = en.create(function(t, e, i) { this.v0 = t, this.v1 = e, this.v2 = i }, function(t) {
                var e = ul.b2;
                return new h(e(t, this.v0.x, this.v1.x, this.v2.x), e(t, this.v0.y, this.v1.y, this.v2.y), e(t, this.v0.z, this.v1.z, this.v2.z)) }),
            Ll = en.create(function(t, e) { this.v1 = t, this.v2 = e }, function(t) {
                if (1 === t) return this.v2.clone();
                var e = new h;
                return e.subVectors(this.v2, this.v1), e.multiplyScalar(t), e.add(this.v1), e });
        ir.prototype = Object.create(an.prototype), ir.prototype.constructor = ir;
        var Pl = { createMultiMaterialObject: function(t, e) {
                    for (var i = new be, n = 0, r = e.length; n < r; n++) i.add(new At(t, e[n]));
                    return i }, detach: function(t, e, i) { t.applyMatrix(e.matrixWorld), e.remove(t), i.add(t) }, attach: function(t, e, i) {
                    var n = new l;
                    n.getInverse(i.matrixWorld), t.applyMatrix(n), e.remove(t), i.add(t) } },
            Cl = 0,
            Il = 1;
        wr.prototype = Object.create(El.prototype), qn.prototype.setColors = function() { console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.") }, Object.assign(Y.prototype, { center: function(t) {
                return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(t) }, empty: function() {
                return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty() }, isIntersectionBox: function(t) {
                return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t) }, size: function(t) {
                return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(t) } }), Object.assign($.prototype, { center: function(t) {
                return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(t) }, empty: function() {
                return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty() }, isIntersectionBox: function(t) {
                return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t) }, isIntersectionSphere: function(t) {
                return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t) }, size: function(t) {
                return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(t) } }), lt.prototype.center = function(t) {
            return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(t) }, Qo.random16 = function() {
            return console.warn("THREE.Math.random16() has been deprecated. Use Math.random() instead."), Math.random() }, Object.assign(et.prototype, { flattenToArrayOffset: function(t, e) {
                return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e) }, multiplyVector3: function(t) {
                return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this) }, multiplyVector3Array: function(t) {
                return console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t) }, applyToBuffer: function(t, e, i) {
                return console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t) } }), Object.assign(l.prototype, { extractPosition: function(t) {
                return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(t) }, flattenToArrayOffset: function(t, e) {
                return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e) }, getPosition: function() {
                var t;
                return function() {
                    return void 0 === t && (t = new h), console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), t.setFromMatrixColumn(this, 3) } }(), setRotationFromQuaternion: function(t) {
                return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(t) }, multiplyVector3: function(t) {
                return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), t.applyProjection(this) }, multiplyVector4: function(t) {
                return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this) }, multiplyVector3Array: function(t) {
                return console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t) }, rotateAxis: function(t) { console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), t.transformDirection(this) }, crossVector: function(t) {
                return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this) }, translate: function() { console.error("THREE.Matrix4: .translate() has been removed.") }, rotateX: function() { console.error("THREE.Matrix4: .rotateX() has been removed.") }, rotateY: function() { console.error("THREE.Matrix4: .rotateY() has been removed.") }, rotateZ: function() { console.error("THREE.Matrix4: .rotateZ() has been removed.") }, rotateByAxis: function() { console.error("THREE.Matrix4: .rotateByAxis() has been removed.") }, applyToBuffer: function(t, e, i) {
                return console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t) } }), it.prototype.isIntersectionLine = function(t) {
            return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(t) }, s.prototype.multiplyVector3 = function(t) {
            return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), t.applyQuaternion(this) }, Object.assign(at.prototype, { isIntersectionBox: function(t) {
                return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t) }, isIntersectionPlane: function(t) {
                return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(t) }, isIntersectionSphere: function(t) {
                return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t) } }), Object.assign(ln.prototype, { extrude: function(t) {
                return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new We(this, t) }, makeGeometry: function(t) {
                return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new ei(this, t) } }), Object.assign(h.prototype, { setEulerFromRotationMatrix: function() { console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.") }, setEulerFromQuaternion: function() { console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.") }, getPositionFromMatrix: function(t) {
                return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(t) }, getScaleFromMatrix: function(t) {
                return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(t) }, getColumnFromMatrix: function(t, e) {
                return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t) } }), Tt.prototype.computeTangents = function() { console.warn("THREE.Geometry: .computeTangents() has been removed.") }, Object.assign(ht.prototype, { getChildByName: function(t) {
                return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(t) }, renderDepth: function() { console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.") }, translate: function(t, e) {
                return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, t) } }), Object.defineProperties(ht.prototype, { eulerOrder: { get: function() {
                    return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order }, set: function(t) { console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = t } }, useQuaternion: { get: function() { console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.") }, set: function() { console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.") } } }), Object.defineProperties(pe.prototype, { objects: { get: function() {
                    return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels } } }), Ct.prototype.setLens = function(t, e) { console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== e && (this.filmGauge = e), this.setFocalLength(t) }, Object.defineProperties(Ai.prototype, { onlyShadow: { set: function() { console.warn("THREE.Light: .onlyShadow has been removed.") } }, shadowCameraFov: { set: function(t) { console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = t } }, shadowCameraLeft: { set: function(t) { console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = t } }, shadowCameraRight: { set: function(t) { console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = t } }, shadowCameraTop: { set: function(t) { console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = t } }, shadowCameraBottom: { set: function(t) { console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = t } }, shadowCameraNear: { set: function(t) { console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = t } }, shadowCameraFar: { set: function(t) { console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = t } }, shadowCameraVisible: { set: function() { console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.") } }, shadowBias: { set: function(t) { console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = t } }, shadowDarkness: { set: function() { console.warn("THREE.Light: .shadowDarkness has been removed.") } }, shadowMapWidth: { set: function(t) { console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = t } }, shadowMapHeight: { set: function(t) { console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = t } } }), Object.defineProperties(dt.prototype, { length: { get: function() {
                    return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length } } }), Object.assign(St.prototype, { addIndex: function(t) { console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(t) }, addDrawCall: function(t, e, i) { void 0 !== i && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(t, e) }, clearDrawCalls: function() { console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups() }, computeTangents: function() { console.warn("THREE.BufferGeometry: .computeTangents() has been removed.") }, computeOffsets: function() { console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.") } }), Object.defineProperties(St.prototype, { drawcalls: { get: function() {
                    return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups } }, offsets: { get: function() {
                    return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups } } }), Object.defineProperties(An.prototype, { dynamic: { set: function() { console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.") } }, onUpdate: { value: function() {
                    return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this } } }), Object.defineProperties(J.prototype, { wrapAround: { get: function() { console.warn("THREE." + this.type + ": .wrapAround has been removed.") }, set: function() { console.warn("THREE." + this.type + ": .wrapAround has been removed.") } }, wrapRGB: { get: function() {
                    return console.warn("THREE." + this.type + ": .wrapRGB has been removed."), new W } } }), Object.defineProperties(mi.prototype, { metal: { get: function() {
                    return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), !1 }, set: function() { console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead") } } }), Object.defineProperties(Q.prototype, { derivatives: { get: function() {
                    return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives }, set: function(t) { console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = t } } }), e.prototype = Object.assign(Object.create({ constructor: e, apply: function(t) { console.warn("THREE.EventDispatcher: .apply is deprecated, just inherit or Object.assign the prototype to mix-in."), Object.assign(t, this) } }), e.prototype), Object.assign(ae.prototype, { supportsFloatTextures: function() {
                return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float") }, supportsHalfFloatTextures: function() {
                return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float") }, supportsStandardDerivatives: function() {
                return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives") }, supportsCompressedTextureS3TC: function() {
                return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc") }, supportsCompressedTexturePVRTC: function() {
                return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc") }, supportsBlendMinMax: function() {
                return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax") }, supportsVertexTextures: function() {
                return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures }, supportsInstancedArrays: function() {
                return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays") }, enableScissorTest: function(t) { console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(t) }, initMaterial: function() { console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.") }, addPrePlugin: function() { console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.") }, addPostPlugin: function() { console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.") }, updateShadowMap: function() { console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.") } }), Object.defineProperties(ae.prototype, { shadowMapEnabled: { get: function() {
                    return this.shadowMap.enabled }, set: function(t) { console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = t } }, shadowMapType: { get: function() {
                    return this.shadowMap.type }, set: function(t) { console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = t } }, shadowMapCullFace: { get: function() {
                    return this.shadowMap.cullFace }, set: function(t) { console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace."), this.shadowMap.cullFace = t } } }), Object.defineProperties(rt.prototype, { cullFace: { get: function() {
                    return this.renderReverseSided ? Or : Ir }, set: function(t) {
                    var e = t !== Ir;
                    console.warn("WebGLRenderer: .shadowMap.cullFace is deprecated. Set .shadowMap.renderReverseSided to " + e + "."), this.renderReverseSided = e } } }), Object.defineProperties(a.prototype, {
            wrapS: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = t } },
            wrapT: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = t } },
            magFilter: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = t } },
            minFilter: {
                get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter;
                },
                set: function(t) { console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = t }
            },
            anisotropy: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = t } },
            offset: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = t } },
            repeat: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = t } },
            format: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = t } },
            type: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = t } },
            generateMipmaps: { get: function() {
                    return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps }, set: function(t) { console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = t } }
        }), _n.prototype.load = function(t) { console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
            var e = this,
                i = new fn;
            return i.load(t, function(t) { e.setBuffer(t) }), this }, bn.prototype.getData = function() {
            return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData() };
        var Ol = { merge: function(t, e, i) { console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
                    var n;
                    e.isMesh && (e.matrixAutoUpdate && e.updateMatrix(), n = e.matrix, e = e.geometry), t.merge(e, n, i) }, center: function(t) {
                    return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), t.center() } },
            Dl = { crossOrigin: void 0, loadTexture: function(t, e, i, n) { console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
                    var r = new Si;
                    r.setCrossOrigin(this.crossOrigin);
                    var a = r.load(t, i, void 0, n);
                    return e && (a.mapping = e), a }, loadTextureCube: function(t, e, i, n) { console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
                    var r = new Ei;
                    r.setCrossOrigin(this.crossOrigin);
                    var a = r.load(t, i, void 0, n);
                    return e && (a.mapping = e), a }, loadCompressedTexture: function() { console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.") }, loadCompressedTextureCube: function() { console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.") } };
        t.WebGLRenderTargetCube = o, t.WebGLRenderTarget = a, t.WebGLRenderer = ae, t.ShaderLib = ol, t.UniformsLib = al, t.UniformsUtils = rs, t.ShaderChunk = nl, t.FogExp2 = oe, t.Fog = se, t.Scene = he, t.LensFlare = le, t.Sprite = ue, t.LOD = pe, t.SkinnedMesh = me, t.Skeleton = de, t.Bone = fe, t.Mesh = At, t.LineSegments = ye, t.Line = ve, t.Points = xe, t.Group = be, t.VideoTexture = we, t.DataTexture = X, t.CompressedTexture = Me, t.CubeTexture = c, t.CanvasTexture = Te, t.DepthTexture = Ee, t.Texture = n, t.CompressedTextureLoader = wi, t.BinaryTextureLoader = Mi, t.DataTextureLoader = gl, t.CubeTextureLoader = Ei, t.TextureLoader = Si, t.ObjectLoader = tn, t.MaterialLoader = Ji, t.BufferGeometryLoader = Qi, t.DefaultLoadingManager = ml, t.LoadingManager = xi, t.JSONLoader = $i, t.ImageLoader = Ti, t.FontLoader = dn, t.FileLoader = bi, t.Loader = Ki, t.Cache = fl, t.AudioLoader = fn, t.SpotLightShadow = Pi, t.SpotLight = Ci, t.PointLight = Ii, t.RectAreaLight = mn, t.HemisphereLight = Ri, t.DirectionalLightShadow = Oi, t.DirectionalLight = Di, t.AmbientLight = Ui, t.LightShadow = Li, t.Light = Ai, t.StereoCamera = gn, t.PerspectiveCamera = Ct, t.OrthographicCamera = It, t.CubeCamera = vn, t.Camera = Pt, t.AudioListener = yn, t.PositionalAudio = xn, t.AudioContext = wl, t.AudioAnalyser = bn, t.Audio = _n, t.VectorKeyframeTrack = ki, t.StringKeyframeTrack = Wi, t.QuaternionKeyframeTrack = ji, t.NumberKeyframeTrack = Vi, t.ColorKeyframeTrack = Yi, t.BooleanKeyframeTrack = Xi, t.PropertyMixer = wn, t.PropertyBinding = Mn, t.KeyframeTrack = qi, t.AnimationUtils = vl, t.AnimationObjectGroup = Tn, t.AnimationMixer = Sn, t.AnimationClip = Zi, t.Uniform = An, t.InstancedBufferGeometry = Rn, t.BufferGeometry = St, t.GeometryIdCount = Et, t.Geometry = Tt, t.InterleavedBufferAttribute = Ln, t.InstancedInterleavedBuffer = Cn, t.InterleavedBuffer = Pn, t.InstancedBufferAttribute = In, t.Face3 = ut, t.Object3D = ht, t.Raycaster = On, t.Layers = st, t.EventDispatcher = e, t.Clock = Nn, t.QuaternionLinearInterpolant = Hi, t.LinearInterpolant = zi, t.DiscreteInterpolant = Bi, t.CubicInterpolant = Fi, t.Interpolant = Ni, t.Triangle = ct, t.Spline = Fn, t.Math = Qo, t.Spherical = zn, t.Cylindrical = Bn, t.Plane = it, t.Frustum = nt, t.Sphere = tt, t.Ray = at, t.Matrix4 = l, t.Matrix3 = et, t.Box3 = $, t.Box2 = Y, t.Line3 = lt, t.Euler = ot, t.Vector4 = r, t.Vector3 = h, t.Vector2 = i, t.Quaternion = s, t.Color = W, t.MorphBlendMesh = Gn, t.ImmediateRenderObject = kn, t.VertexNormalsHelper = Hn, t.SpotLightHelper = jn, t.SkeletonHelper = Vn, t.PointLightHelper = Wn, t.RectAreaLightHelper = Xn, t.HemisphereLightHelper = Yn, t.GridHelper = qn, t.PolarGridHelper = Zn, t.FaceNormalsHelper = Jn, t.DirectionalLightHelper = Qn, t.CameraHelper = Kn, t.BoxHelper = $n, t.ArrowHelper = tr, t.AxisHelper = er, t.CatmullRomCurve3 = El, t.SplineCurve3 = Sl, t.CubicBezierCurve3 = Al, t.QuadraticBezierCurve3 = Rl, t.LineCurve3 = Ll, t.ArcCurve = ir, t.EllipseCurve = an, t.SplineCurve = on, t.CubicBezierCurve = sn, t.QuadraticBezierCurve = hn, t.LineCurve = nn, t.Shape = ln, t.ShapePath = un, t.Path = cn, t.Font = pn, t.CurvePath = rn, t.Curve = en, t.ShapeUtils = ul, t.SceneUtils = Pl, t.CurveUtils = _l, t.WireframeGeometry = Se, t.ParametricGeometry = Re, t.ParametricBufferGeometry = Ae, t.TetrahedronGeometry = Ce, t.TetrahedronBufferGeometry = Pe, t.OctahedronGeometry = Oe, t.OctahedronBufferGeometry = Ie, t.IcosahedronGeometry = Ue, t.IcosahedronBufferGeometry = De, t.DodecahedronGeometry = Fe, t.DodecahedronBufferGeometry = Ne, t.PolyhedronGeometry = ze, t.PolyhedronBufferGeometry = Le, t.TubeGeometry = Ge, t.TubeBufferGeometry = Be, t.TorusKnotGeometry = He, t.TorusKnotBufferGeometry = ke, t.TorusGeometry = Ve, t.TorusBufferGeometry = je, t.TextGeometry = Xe, t.SphereBufferGeometry = Ye, t.SphereGeometry = qe, t.RingGeometry = Je, t.RingBufferGeometry = Ze, t.PlaneBufferGeometry = Lt, t.PlaneGeometry = Qe, t.LatheGeometry = $e, t.LatheBufferGeometry = Ke, t.ShapeGeometry = ei, t.ShapeBufferGeometry = ti, t.ExtrudeGeometry = We, t.EdgesGeometry = ii, t.ConeGeometry = ai, t.ConeBufferGeometry = oi, t.CylinderGeometry = ri, t.CylinderBufferGeometry = ni, t.CircleBufferGeometry = si, t.CircleGeometry = hi, t.BoxBufferGeometry = Rt, t.BoxGeometry = li, t.ShadowMaterial = ci, t.SpriteMaterial = ce, t.RawShaderMaterial = ui, t.ShaderMaterial = Q, t.PointsMaterial = _e, t.MultiMaterial = pi;
        t.MeshPhysicalMaterial = fi;
        t.MeshStandardMaterial = di, t.MeshPhongMaterial = mi, t.MeshToonMaterial = gi, t.MeshNormalMaterial = vi, t.MeshLambertMaterial = yi, t.MeshDepthMaterial = K, t.MeshBasicMaterial = pt, t.LineDashedMaterial = _i, t.LineBasicMaterial = ge, t.Material = J, t.Float64BufferAttribute = wt, t.Float32BufferAttribute = bt, t.Uint32BufferAttribute = xt, t.Int32BufferAttribute = _t, t.Uint16BufferAttribute = yt, t.Int16BufferAttribute = vt, t.Uint8ClampedBufferAttribute = gt, t.Uint8BufferAttribute = mt, t.Int8BufferAttribute = ft, t.BufferAttribute = dt, t.REVISION = Lr, t.MOUSE = Pr, t.CullFaceNone = Cr, t.CullFaceBack = Ir, t.CullFaceFront = Or, t.CullFaceFrontBack = Dr, t.FrontFaceDirectionCW = Ur, t.FrontFaceDirectionCCW = Nr, t.BasicShadowMap = Fr, t.PCFShadowMap = zr, t.PCFSoftShadowMap = Br, t.FrontSide = Gr, t.BackSide = kr, t.DoubleSide = Hr, t.FlatShading = jr, t.SmoothShading = Vr, t.NoColors = Wr, t.FaceColors = Xr, t.VertexColors = Yr, t.NoBlending = qr, t.NormalBlending = Zr, t.AdditiveBlending = Jr, t.SubtractiveBlending = Qr, t.MultiplyBlending = Kr, t.CustomBlending = $r, t.BlendingMode = ta, t.AddEquation = ea, t.SubtractEquation = ia, t.ReverseSubtractEquation = na, t.MinEquation = ra, t.MaxEquation = aa, t.ZeroFactor = oa, t.OneFactor = sa, t.SrcColorFactor = ha, t.OneMinusSrcColorFactor = la, t.SrcAlphaFactor = ca, t.OneMinusSrcAlphaFactor = ua, t.DstAlphaFactor = pa, t.OneMinusDstAlphaFactor = da, t.DstColorFactor = fa, t.OneMinusDstColorFactor = ma, t.SrcAlphaSaturateFactor = ga, t.NeverDepth = va, t.AlwaysDepth = ya, t.LessDepth = _a, t.LessEqualDepth = xa, t.EqualDepth = ba, t.GreaterEqualDepth = wa, t.GreaterDepth = Ma, t.NotEqualDepth = Ta, t.MultiplyOperation = Ea, t.MixOperation = Sa, t.AddOperation = Aa, t.NoToneMapping = Ra, t.LinearToneMapping = La, t.ReinhardToneMapping = Pa, t.Uncharted2ToneMapping = Ca, t.CineonToneMapping = Ia, t.UVMapping = Oa, t.CubeReflectionMapping = Da, t.CubeRefractionMapping = Ua, t.EquirectangularReflectionMapping = Na, t.EquirectangularRefractionMapping = Fa, t.SphericalReflectionMapping = za, t.CubeUVReflectionMapping = Ba, t.CubeUVRefractionMapping = Ga, t.TextureMapping = ka, t.RepeatWrapping = Ha, t.ClampToEdgeWrapping = ja, t.MirroredRepeatWrapping = Va, t.TextureWrapping = Wa, t.NearestFilter = Xa, t.NearestMipMapNearestFilter = Ya, t.NearestMipMapLinearFilter = qa, t.LinearFilter = Za, t.LinearMipMapNearestFilter = Ja, t.LinearMipMapLinearFilter = Qa, t.TextureFilter = Ka, t.UnsignedByteType = $a, t.ByteType = to, t.ShortType = eo, t.UnsignedShortType = io, t.IntType = no, t.UnsignedIntType = ro, t.FloatType = ao, t.HalfFloatType = oo, t.UnsignedShort4444Type = so, t.UnsignedShort5551Type = ho, t.UnsignedShort565Type = lo, t.UnsignedInt248Type = co, t.AlphaFormat = uo, t.RGBFormat = po, t.RGBAFormat = fo, t.LuminanceFormat = mo, t.LuminanceAlphaFormat = go, t.RGBEFormat = vo, t.DepthFormat = yo, t.DepthStencilFormat = _o, t.RGB_S3TC_DXT1_Format = xo, t.RGBA_S3TC_DXT1_Format = bo, t.RGBA_S3TC_DXT3_Format = wo, t.RGBA_S3TC_DXT5_Format = Mo, t.RGB_PVRTC_4BPPV1_Format = To, t.RGB_PVRTC_2BPPV1_Format = Eo, t.RGBA_PVRTC_4BPPV1_Format = So, t.RGBA_PVRTC_2BPPV1_Format = Ao, t.RGB_ETC1_Format = Ro, t.LoopOnce = Lo, t.LoopRepeat = Po, t.LoopPingPong = Co, t.InterpolateDiscrete = Io, t.InterpolateLinear = Oo, t.InterpolateSmooth = Do, t.ZeroCurvatureEnding = Uo, t.ZeroSlopeEnding = No, t.WrapAroundEnding = Fo, t.TrianglesDrawMode = zo, t.TriangleStripDrawMode = Bo, t.TriangleFanDrawMode = Go, t.LinearEncoding = ko, t.sRGBEncoding = Ho, t.GammaEncoding = jo, t.RGBEEncoding = Vo, t.LogLuvEncoding = Wo, t.RGBM7Encoding = Xo, t.RGBM16Encoding = Yo, t.RGBDEncoding = qo, t.BasicDepthPacking = Zo, t.RGBADepthPacking = Jo, t.CubeGeometry = li, t.Face4 = nr, t.LineStrip = Cl, t.LinePieces = Il, t.MeshFaceMaterial = rr, t.PointCloud = ar, t.Particle = or, t.ParticleSystem = sr, t.PointCloudMaterial = hr, t.ParticleBasicMaterial = lr, t.ParticleSystemMaterial = cr, t.Vertex = ur, t.DynamicBufferAttribute = pr, t.Int8Attribute = dr, t.Uint8Attribute = fr, t.Uint8ClampedAttribute = mr, t.Int16Attribute = gr, t.Uint16Attribute = vr, t.Int32Attribute = yr, t.Uint32Attribute = _r, t.Float32Attribute = xr, t.Float64Attribute = br, t.ClosedSplineCurve3 = wr, t.BoundingBoxHelper = Mr, t.EdgesHelper = Tr, t.WireframeHelper = Er, t.XHRLoader = Sr, t.GeometryUtils = Ol, t.ImageUtils = Dl, t.Projector = Ar, t.CanvasRenderer = Rr, Object.defineProperty(t, "__esModule", { value: !0 })
    });
var Detector = { canvas: !!window.CanvasRenderingContext2D, webgl: function() {
        try {
            var t = document.createElement("canvas");
            return !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl")) } catch (t) {
            return !1 } }(), workers: !!window.Worker, fileapi: window.File && window.FileReader && window.FileList && window.Blob, getWebGLErrorMessage: function() {
        var t = document.createElement("div");
        return t.id = "webgl-error-message", t.style.fontFamily = "monospace", t.style.fontSize = "13px", t.style.fontWeight = "normal", t.style.textAlign = "center", t.style.background = "#fff", t.style.color = "#000", t.style.padding = "1.5em", t.style.width = "400px", t.style.margin = "5em auto 0", this.webgl || (t.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n") : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n")), t }, addGetWebGLMessage: function(t) {
        var e, i, n;
        t = t || {}, e = void 0 !== t.parent ? t.parent : document.body, i = void 0 !== t.id ? t.id : "oldie", n = Detector.getWebGLErrorMessage(), n.id = i, e.appendChild(n) } };
"object" == typeof module && (module.exports = Detector), define("detector", function(t) {
        return function() {
            var e;
            return e || t.Detector } }(this)), (window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = [].slice,
                    r = function(t, e, n) { i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render },
                    a = 1e-10,
                    o = i._internals.isSelector,
                    s = i._internals.isArray,
                    h = r.prototype = i.to({}, .1, {}),
                    l = [];
                r.version = "1.11.1", h.constructor = r, h.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.ticker = i.ticker, h.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this) }, h.updateTo = function(t, e) {
                    var n, r = this.ratio;
                    e && this.timeline && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in t) this.vars[n] = t[n];
                    if (this._initted)
                        if (e) this._initted = !1;
                        else if (this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var a = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1) } else if (this._time > 0) { this._initted = !1, this._init();
                        for (var o, s = 1 / (1 - r), h = this._firstPT; h;) o = h.s + h.c, h.c *= s, h.s = o - h.c, h = h._next }
                    return this }, h.render = function(t, e, i) { this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var n, r, o, s, h, c, u, p, d = this._dirty ? this.totalDuration() : this._totalDuration,
                        f = this._time,
                        m = this._totalTime,
                        g = this._cycle,
                        v = this._duration;
                    if (t >= d ? (this._totalTime = d, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete"), 0 === v && (p = this._rawPrevTime, (0 === t || p < 0 || p === a) && p !== t && (i = !0, p > a && (r = "onReverseComplete")), this._rawPrevTime = p = !e || t ? t : a)) : t < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && this._rawPrevTime > a) && (r = "onReverseComplete", n = this._reversed), t < 0 ? (this._active = !1, 0 === v && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = p = !e || t ? t : a)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (s = v + this._repeatDelay, this._cycle = this._totalTime / s >> 0, 0 !== this._cycle && this._cycle === this._totalTime / s && this._cycle--, this._time = this._totalTime - this._cycle * s, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : this._time < 0 && (this._time = 0)), this._easeType ? (h = this._time / v, c = this._easeType, u = this._easePower, (1 === c || 3 === c && h >= .5) && (h = 1 - h), 3 === c && (h *= 2), 1 === u ? h *= h : 2 === u ? h *= h * h : 3 === u ? h *= h * h * h : 4 === u && (h *= h * h * h * h), 1 === c ? this.ratio = 1 - h : 2 === c ? this.ratio = h : this._time / v < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / v)), f === this._time && !i && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / v) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) }
                    for (this._active || !this._paused && this._time !== f && t >= 0 && (this._active = !0), 0 === m && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || l))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || l)), r && (this._gc || (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || l), 0 === v && this._rawPrevTime === a && p !== a && (this._rawPrevTime = 0))) }, r.to = function(t, e, i) {
                    return new r(t, e, i) }, r.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i) }, r.fromTo = function(t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new r(t, e, n) }, r.staggerTo = r.allTo = function(t, e, a, h, c, u, p) { h = h || 0;
                    var d, f, m, g, v = a.delay || 0,
                        y = [],
                        _ = function() { a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments), c.apply(p || this, u || l) };
                    for (s(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = n.call(t, 0))), d = t.length, m = 0; m < d; m++) { f = {};
                        for (g in a) f[g] = a[g];
                        f.delay = v, m === d - 1 && c && (f.onComplete = _), y[m] = new r(t[m], e, f), v += h }
                    return y }, r.staggerFrom = r.allFrom = function(t, e, i, n, a, o, s) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, n, a, o, s) }, r.staggerFromTo = r.allFromTo = function(t, e, i, n, a, o, s, h) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, n, a, o, s, h) }, r.delayedCall = function(t, e, i, n, a) {
                    return new r(e, 0, { delay: t, onComplete: e, onCompleteParams: i, onCompleteScope: n, onReverseComplete: e, onReverseCompleteParams: i, onReverseCompleteScope: n, immediateRender: !1, useFrames: a, overwrite: 0 }) }, r.set = function(t, e) {
                    return new r(t, 0, e) }, r.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0 };
                var c = function(t, e) {
                        for (var n = [], r = 0, a = t._first; a;) a instanceof i ? n[r++] = a : (e && (n[r++] = a), n = n.concat(c(a, e)), r = n.length), a = a._next;
                        return n },
                    u = r.getAllTweens = function(e) {
                        return c(t._rootTimeline, e).concat(c(t._rootFramesTimeline, e)) };
                r.killAll = function(t, i, n, r) { null == i && (i = !0), null == n && (n = !0);
                    var a, o, s, h = u(0 != r),
                        l = h.length,
                        c = i && n && r;
                    for (s = 0; s < l; s++) o = h[s], (c || o instanceof e || (a = o.target === o.vars.onComplete) && n || i && !a) && (t ? o.totalTime(o.totalDuration()) : o._enabled(!1, !1)) }, r.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var a, h, l, c, u, p = i._tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = n(t, 0)), s(t))
                            for (c = t.length; --c > -1;) r.killChildTweensOf(t[c], e);
                        else { a = [];
                            for (l in p)
                                for (h = p[l].target.parentNode; h;) h === t && (a = a.concat(p[l].tweens)), h = h.parentNode;
                            for (u = a.length, c = 0; c < u; c++) e && a[c].totalTime(a[c].totalDuration()), a[c]._enabled(!1, !1) } } };
                var p = function(t, i, n, r) { i = i !== !1, n = n !== !1, r = r !== !1;
                    for (var a, o, s = u(r), h = i && n && r, l = s.length; --l > -1;) o = s[l], (h || o instanceof e || (a = o.target === o.vars.onComplete) && n || i && !a) && o.paused(t) };
                return r.pauseAll = function(t, e, i) { p(!0, t, e, i) }, r.resumeAll = function(t, e, i) { p(!1, t, e, i) }, r.globalTimeScale = function(e) {
                    var n = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || a, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale }, h.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration() }, h.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration() }, h.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time }, h.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration }, h.totalDuration = function(t) {
                    return arguments.length ? this._repeat === -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration) }, h.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat }, h.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay }, h.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo }, r }, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) { e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], o(i) && i.join("").indexOf("{self}") !== -1 && (r[n] = this._swapSelfInParams(i));
                        o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger) },
                    r = 1e-10,
                    a = i._internals.isSelector,
                    o = i._internals.isArray,
                    s = [],
                    h = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i },
                    l = function(t, e, i, n) { t._timeline.pause(t._startTime), e && e.apply(n || t._timeline, i || s) },
                    c = s.slice,
                    u = n.prototype = new e;
                return n.version = "1.11.0", u.constructor = n, u.kill()._gc = !1, u.to = function(t, e, n, r) {
                    return e ? this.add(new i(t, e, n), r) : this.set(t, n, r) }, u.from = function(t, e, n, r) {
                    return this.add(i.from(t, e, n), r) }, u.fromTo = function(t, e, n, r, a) {
                    return e ? this.add(i.fromTo(t, e, n, r), a) : this.set(t, r, a) }, u.staggerTo = function(t, e, r, o, s, l, u, p) {
                    var d, f = new n({ onComplete: l, onCompleteParams: u, onCompleteScope: p });
                    for ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = c.call(t, 0)), o = o || 0, d = 0; d < t.length; d++) r.startAt && (r.startAt = h(r.startAt)), f.to(t[d], e, h(r), d * o);
                    return this.add(f, s) }, u.staggerFrom = function(t, e, i, n, r, a, o, s) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, a, o, s) }, u.staggerFromTo = function(t, e, i, n, r, a, o, s, h) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, a, o, s, h) }, u.call = function(t, e, n, r) {
                    return this.add(i.delayedCall(0, t, e, n), r) }, u.set = function(t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n) }, n.exportRoot = function(t, e) { t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, a, o = new n(t),
                        s = o._timeline;
                    for (null == e && (e = !0), s._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = s._time, r = s._first; r;) a = r._next, (!e || !(r instanceof i && r.target === r.vars.onComplete)) && o.add(r, r._startTime - r._delay), r = a;
                    return s.add(o, 0), o }, u.add = function(r, a, s, h) {
                    var l, c, u, p, d, f;
                    if ("number" != typeof a && (a = this._parseTimeOrLabel(a, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && o(r)) {
                            for (s = s || "normal", h = h || 0, l = a, c = r.length, u = 0; u < c; u++) o(p = r[u]) && (p = new n({ tweens: p })), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === s ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === s && (p._startTime -= p.delay())), l += h;
                            return this._uncache(!0) }
                        if ("string" == typeof r) return this.addLabel(r, a);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r) }
                    if (e.prototype.add.call(this, r, a), this._gc && !this._paused && this._duration < this.duration())
                        for (d = this, f = d.rawTime() > r._startTime; d._gc && d._timeline;) d._timeline.smoothChildTiming && f ? d.totalTime(d._totalTime, !0) : d._enabled(!0, !1), d = d._timeline;
                    return this }, u.remove = function(e) {
                    if (e instanceof t) return this._remove(e, !1);
                    if (e instanceof Array || e && e.push && o(e)) {
                        for (var i = e.length; --i > -1;) this.remove(e[i]);
                        return this }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e) }, u._remove = function(t, i) { e.prototype._remove.call(this, t, i);
                    var n = this._last;
                    return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = 0, this }, u.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t)) }, u.insert = u.insertMultiple = function(t, e, i, n) {
                    return this.add(t, e || 0, i, n) }, u.appendMultiple = function(t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n) }, u.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this }, u.addPause = function(t, e, i, n) {
                    return this.call(l, ["{self}", e, i, n], this, t) }, u.removeLabel = function(t) {
                    return delete this._labels[t], this }, u.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1 }, u._parseTimeOrLabel = function(e, i, n, r) {
                    var a;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && o(r)))
                        for (a = r.length; --a > -1;) r[a] instanceof t && r[a].timeline === this && this.remove(r[a]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (a = e.indexOf("="), a === -1) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(a - 1) + "1", 10) * Number(e.substr(a + 1)), e = a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, n) : this.duration() }
                    return Number(e) + i }, u.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1) }, u.stop = function() {
                    return this.paused(!0) }, u.gotoAndPlay = function(t, e) {
                    return this.play(t, e) }, u.gotoAndStop = function(t, e) {
                    return this.pause(t, e) }, u.render = function(t, e, i) { this._gc && this._enabled(!0, !1);
                    var n, a, o, h, l, c = this._dirty ? this.totalDuration() : this._totalDuration,
                        u = this._time,
                        p = this._startTime,
                        d = this._timeScale,
                        f = this._paused;
                    if (t >= c ? (this._totalTime = this._time = c, this._reversed || this._hasPausedChild() || (a = !0, h = "onComplete", 0 === this._duration && (0 === t || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t ? t : r, t = c + 1e-6) : t < 1e-7 ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && (this._rawPrevTime > r || t < 0 && this._rawPrevTime >= 0)) && (h = "onReverseComplete", a = this._reversed), t < 0 ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t ? t : r, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u && this._first || i || l) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && t > 0 && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)), this._time >= u)
                            for (n = this._first; n && (o = n._next, !this._paused || f);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                        else
                            for (n = this._last; n && (o = n._prev, !this._paused || f);)(n._active || n._startTime <= u && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                        this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)), h && !this._gc && (p === this._startTime || d !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (a && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || s)) } }, u._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                        t = t._next }
                    return !1 }, u.getChildren = function(t, e, n, r) { r = r || -9999999999;
                    for (var a = [], o = this._first, s = 0; o;) o._startTime < r || (o instanceof i ? e !== !1 && (a[s++] = o) : (n !== !1 && (a[s++] = o), t !== !1 && (a = a.concat(o.getChildren(!0, e, n)), s = a.length))), o = o._next;
                    return a }, u.getTweensOf = function(t, e) {
                    for (var n = i.getTweensOf(t), r = n.length, a = [], o = 0; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (a[o++] = n[r]);
                    return a }, u._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline }
                    return !1 }, u.shiftChildren = function(t, e, i) { i = i || 0;
                    for (var n, r = this._first, a = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (n in a) a[n] >= i && (a[n] += t);
                    return this._uncache(!0) }, u._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                    return r }, u.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0) }, u.invalidate = function() {
                    for (var t = this._first; t;) t.invalidate(), t = t._next;
                    return this }, u._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                    return e.prototype._enabled.call(this, t, i) }, u.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration) }, u.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, r = this._last, a = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > a && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : a = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), a = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                            this._duration = this._totalDuration = n, this._dirty = !1 }
                        return this._totalDuration }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this }, u.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline }, u.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale }, n }, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var n = function(e) { t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0 },
                    r = 1e-10,
                    a = [],
                    o = new i(null, null, 1, 0),
                    s = n.prototype = new t;
                return s.constructor = n, s.kill()._gc = !1, n.version = "1.11.0", s.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this) }, s.addCallback = function(t, i, n, r) {
                    return this.add(e.delayedCall(0, t, n, r), i) }, s.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this }, s.tweenTo = function(t, i) { i = i || {};
                    var n, r, s = { ease: o, overwrite: 2, useFrames: this.usesFrames(), immediateRender: !1 };
                    for (n in i) s[n] = i[n];
                    return s.time = this._parseTimeOrLabel(t), r = new e(this, Math.abs(Number(s.time) - this._time) / this._timeScale || .001, s), s.onStart = function() { r.target.paused(!0), r.vars.time !== r.target.time() && r.duration(Math.abs(r.vars.time - r.target.time()) / r.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || r, i.onStartParams || a) }, r }, s.tweenFromTo = function(t, e, i) { i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = { onComplete: this.seek, onCompleteParams: [t], onCompleteScope: this }, i.immediateRender = i.immediateRender !== !1;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001) }, s.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, o, s, h, l, c, u = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._duration,
                        d = this._time,
                        f = this._totalTime,
                        m = this._startTime,
                        g = this._timeScale,
                        v = this._rawPrevTime,
                        y = this._paused,
                        _ = this._cycle;
                    if (t >= u ? (this._locked || (this._totalTime = u, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (o = !0, h = "onComplete", 0 === this._duration && (0 === t || v < 0 || v === r) && v !== t && this._first && (l = !0, v > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = p, t = p + 1e-6)) : t < 1e-7 ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== d || 0 === p && (v > r || t < 0 && v >= 0) && !this._locked) && (h = "onReverseComplete", o = this._reversed), t < 0 ? (this._active = !1, 0 === p && v >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = p || !e || t ? t : r, t = 0, this._initted || (l = !0))) : (0 === p && v < 0 && (l = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = p + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, t = p + 1e-6) : this._time < 0 ? this._time = t = 0 : t = this._time))), this._cycle !== _ && !this._locked) {
                        var x = this._yoyo && 0 !== (1 & _),
                            b = x === (this._yoyo && 0 !== (1 & this._cycle)),
                            w = this._totalTime,
                            M = this._cycle,
                            T = this._rawPrevTime,
                            E = this._time;
                        if (this._totalTime = _ * p, this._cycle < _ ? x = !x : this._totalTime += p, this._time = d, this._rawPrevTime = 0 === p ? v - 1e-5 : v, this._cycle = _, this._locked = !0, d = x ? 0 : p, this.render(d, e, 0 === p), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || a), b && (d = x ? p + 1e-6 : -1e-6, this.render(d, !0, !1)), this._locked = !1, this._paused && !y) return;
                        this._time = E, this._totalTime = w, this._cycle = M, this._rawPrevTime = T }
                    if (!(this._time !== d && this._first || i || l)) return void(f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || a)));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || a)), this._time >= d)
                        for (n = this._first; n && (s = n._next, !this._paused || y);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
                    else
                        for (n = this._last; n && (s = n._prev, !this._paused || y);)(n._active || n._startTime <= d && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
                    this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || a)), h && (this._locked || !this._gc && (m === this._startTime || g !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (o && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || a)))
                }, s.getActive = function(t, e, i) { null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var n, r, a = [],
                        o = this.getChildren(t, e, i),
                        s = 0,
                        h = o.length;
                    for (n = 0; n < h; n++) r = o[n], r.isActive() && (a[s++] = r);
                    return a }, s.getLabelAfter = function(t) { t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        n = i.length;
                    for (e = 0; e < n; e++)
                        if (i[e].time > t) return i[e].name;
                    return null }, s.getLabelBefore = function(t) { null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (e[i].time < t) return e[i].name;
                    return null }, s.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
                    return e.sort(function(t, e) {
                        return t.time - e.time }), e }, s.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration() }, s.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration() }, s.totalDuration = function(e) {
                    return arguments.length ? this._repeat === -1 ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration) }, s.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time }, s.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat }, s.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay }, s.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo }, s.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8) }, n
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    n = [],
                    r = {},
                    a = function(t, e, i, n) { this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t },
                    o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    s = function(t, e, i, n) {
                        var r = { a: t },
                            a = {},
                            o = {},
                            s = { c: n },
                            h = (t + e) / 2,
                            l = (e + i) / 2,
                            c = (i + n) / 2,
                            u = (h + l) / 2,
                            p = (l + c) / 2,
                            d = (p - u) / 8;
                        return r.b = h + (t - h) / 4, a.b = u + d, r.c = a.a = (r.b + a.b) / 2, a.c = o.a = (u + p) / 2, o.b = p - d, s.b = c + (n - c) / 4, o.c = s.a = (o.b + s.b) / 2, [r, a, o, s] },
                    h = function(t, r, a, o, h) {
                        var l, c, u, p, d, f, m, g, v, y, _, x, b, w = t.length - 1,
                            M = 0,
                            T = t[0].a;
                        for (l = 0; l < w; l++) d = t[M], c = d.a, u = d.d, p = t[M + 1].d, h ? (_ = e[l], x = i[l], b = (x + _) * r * .25 / (o ? .5 : n[l] || .5), f = u - (u - c) * (o ? .5 * r : 0 !== _ ? b / _ : 0), m = u + (p - u) * (o ? .5 * r : 0 !== x ? b / x : 0), g = u - (f + ((m - f) * (3 * _ / (_ + x) + .5) / 4 || 0))) : (f = u - (u - c) * r * .5, m = u + (p - u) * r * .5, g = u - (f + m) / 2), f += g, m += g, d.c = v = f, 0 !== l ? d.b = T : d.b = T = d.a + .6 * (d.c - d.a), d.da = u - c, d.ca = v - c, d.ba = T - c, a ? (y = s(c, T, v, u), t.splice(M, 1, y[0], y[1], y[2], y[3]), M += 4) : M++, T = m;
                        d = t[M], d.b = T, d.c = T + .4 * (d.d - T), d.da = d.d - d.a, d.ca = d.c - d.a, d.ba = T - d.a, a && (y = s(d.a, T, d.c, d.d), t.splice(M, 1, y[0], y[1], y[2], y[3])) },
                    l = function(t, n, r, o) {
                        var s, h, l, c, u, p, d = [];
                        if (o)
                            for (t = [o].concat(t), h = t.length; --h > -1;) "string" == typeof(p = t[h][n]) && "=" === p.charAt(1) && (t[h][n] = o[n] + Number(p.charAt(0) + p.substr(2)));
                        if (s = t.length - 2, s < 0) return d[0] = new a(t[0][n], 0, 0, t[s < -1 ? 0 : 1][n]), d;
                        for (h = 0; h < s; h++) l = t[h][n], c = t[h + 1][n], d[h] = new a(l, 0, 0, c), r && (u = t[h + 2][n], e[h] = (e[h] || 0) + (c - l) * (c - l), i[h] = (i[h] || 0) + (u - c) * (u - c));
                        return d[h] = new a(t[h][n], 0, 0, t[h + 1][n]), d },
                    c = function(t, a, s, c, u, p) {
                        var d, f, m, g, v, y, _, x, b = {},
                            w = [],
                            M = p || t[0];
                        u = "string" == typeof u ? "," + u + "," : o, null == a && (a = 1);
                        for (f in t[0]) w.push(f);
                        if (t.length > 1) {
                            for (x = t[t.length - 1], _ = !0, d = w.length; --d > -1;)
                                if (f = w[d], Math.abs(M[f] - x[f]) > .05) { _ = !1;
                                    break }
                            _ && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3]) }
                        for (e.length = i.length = n.length = 0, d = w.length; --d > -1;) f = w[d], r[f] = u.indexOf("," + f + ",") !== -1, b[f] = l(t, f, r[f], p);
                        for (d = e.length; --d > -1;) e[d] = Math.sqrt(e[d]), i[d] = Math.sqrt(i[d]);
                        if (!c) {
                            for (d = w.length; --d > -1;)
                                if (r[f])
                                    for (m = b[w[d]], y = m.length - 1, g = 0; g < y; g++) v = m[g + 1].da / i[g] + m[g].da / e[g], n[g] = (n[g] || 0) + v * v;
                            for (d = n.length; --d > -1;) n[d] = Math.sqrt(n[d]) }
                        for (d = w.length, g = s ? 4 : 1; --d > -1;) f = w[d], m = b[f], h(m, a, s, c, r[f]), _ && (m.splice(0, g), m.splice(m.length - g, g));
                        return b },
                    u = function(t, e, i) { e = e || "soft";
                        var n, r, o, s, h, l, c, u, p, d, f, m = {},
                            g = "cubic" === e ? 3 : 2,
                            v = "soft" === e,
                            y = [];
                        if (v && i && (t = [i].concat(t)), null == t || t.length < g + 1) throw "invalid Bezier data";
                        for (p in t[0]) y.push(p);
                        for (l = y.length; --l > -1;) {
                            for (p = y[l], m[p] = h = [], d = 0, u = t.length, c = 0; c < u; c++) n = null == i ? t[c][p] : "string" == typeof(f = t[c][p]) && "=" === f.charAt(1) ? i[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && c > 1 && c < u - 1 && (h[d++] = (n + h[d - 2]) / 2), h[d++] = n;
                            for (u = d - g + 1, d = 0, c = 0; c < u; c += g) n = h[c], r = h[c + 1], o = h[c + 2], s = 2 === g ? 0 : h[c + 3], h[d++] = f = 3 === g ? new a(n, r, o, s) : new a(n, (2 * r + n) / 3, (2 * r + o) / 3, o);
                            h.length = d }
                        return m },
                    p = function(t, e, i) {
                        for (var n, r, a, o, s, h, l, c, u, p, d, f = 1 / i, m = t.length; --m > -1;)
                            for (p = t[m], a = p.a, o = p.d - a, s = p.c - a, h = p.b - a, n = r = 0, c = 1; c <= i; c++) l = f * c, u = 1 - l, n = r - (r = (l * l * o + 3 * u * (l * s + u * h)) * l), d = m * i + c - 1, e[d] = (e[d] || 0) + n * n },
                    d = function(t, e) { e = e >> 0 || 6;
                        var i, n, r, a, o = [],
                            s = [],
                            h = 0,
                            l = 0,
                            c = e - 1,
                            u = [],
                            d = [];
                        for (i in t) p(t[i], o, e);
                        for (r = o.length, n = 0; n < r; n++) h += Math.sqrt(o[n]), a = n % e, d[a] = h, a === c && (l += h, a = n / e >> 0, u[a] = d, s[a] = l, h = 0, d = []);
                        return { length: l, lengths: s, segments: u } },
                    f = window._gsDefine.plugin({ propName: "bezier", priority: -1, API: 2, global: !0, init: function(t, e, i) { this._target = t, e instanceof Array && (e = { values: e }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var n, r, a, o, s, h = e.values || [],
                                l = {},
                                p = h[0],
                                f = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = f ? f instanceof Array ? f : [
                                ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                            ] : null;
                            for (n in p) this._props.push(n);
                            for (a = this._props.length; --a > -1;) n = this._props[a], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], l[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), s || l[n] !== h[0][n] && (s = l);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? c(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, s) : u(h, e.type, l), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = d(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length }
                            if (f = this._autoRotate)
                                for (f[0] instanceof Array || (this._autoRotate = f = [f]), a = f.length; --a > -1;)
                                    for (o = 0; o < 3; o++) n = f[a][o], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                            return !0 }, set: function(e) {
                            var i, n, r, a, o, s, h, l, c, u, p = this._segCount,
                                d = this._func,
                                f = this._target;
                            if (this._timeRes) {
                                if (c = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && r < p - 1) {
                                    for (l = p - 1; r < l && (this._l2 = c[++r]) <= e;);
                                    this._l1 = c[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0] } else if (e < this._l1 && r > 0) {
                                    for (; r > 0 && (this._l1 = c[--r]) >= e;);
                                    0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = c[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si] }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < u.length - 1) {
                                    for (l = u.length - 1; r < l && (this._s2 = u[++r]) <= e;);
                                    this._s1 = u[r - 1], this._si = r } else if (e < this._s1 && r > 0) {
                                    for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                    0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r }
                                s = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec } else i = e < 0 ? 0 : e >= 1 ? p - 1 : p * e >> 0, s = (e - i * (1 / p)) * p;
                            for (n = 1 - s, r = this._props.length; --r > -1;) a = this._props[r], o = this._beziers[a][i], h = (s * s * o.da + 3 * n * (s * o.ca + n * o.ba)) * s + o.a, this._round[a] && (h = h + (h > 0 ? .5 : -.5) >> 0), d[a] ? f[a](h) : f[a] = h;
                            if (this._autoRotate) {
                                var m, g, v, y, _, x, b, w = this._autoRotate;
                                for (r = w.length; --r > -1;) a = w[r][2], x = w[r][3] || 0, b = w[r][4] === !0 ? 1 : t, o = this._beziers[w[r][0]], m = this._beziers[w[r][1]], o && m && (o = o[i], m = m[i], g = o.a + (o.b - o.a) * s, y = o.b + (o.c - o.b) * s, g += (y - g) * s, y += (o.c + (o.d - o.c) * s - y) * s, v = m.a + (m.b - m.a) * s, _ = m.b + (m.c - m.b) * s, v += (_ - v) * s, _ += (m.c + (m.d - m.c) * s - _) * s, h = Math.atan2(_ - v, y - g) * b + x, d[a] ? f[a](h) : f[a] = h) } } }),
                    m = f.prototype;
                f.bezierThrough = c, f.cubicToQuadratic = s, f._autoCSS = !0, f.quadraticToCubic = function(t, e, i) {
                    return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i) }, f._cssRegister = function() {
                    var t = window._gsDefine.globals.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            n = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", { parser: function(t, e, a, o, s, h) { e instanceof Array && (e = { values: e }), h = new f;
                                var l, c, u, p = e.values,
                                    d = p.length - 1,
                                    m = [],
                                    g = {};
                                if (d < 0) return s;
                                for (l = 0; l <= d; l++) u = i(t, p[l], o, s, h, d !== l), m[l] = u.end;
                                for (c in e) g[c] = e[c];
                                return g.values = m, s = new r(t, "bezier", 0, 0, u.pt, 2), s.data = u, s.plugin = h, s.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), g.autoRotate && !(g.autoRotate instanceof Array) && (l = g.autoRotate === !0 ? 0 : Number(g.autoRotate), g.autoRotate = null != u.end.left ? [
                                    ["left", "top", "rotation", l, !1]
                                ] : null != u.end.x && [
                                    ["x", "y", "rotation", l, !1]
                                ]), g.autoRotate && (o._transform || o._enableTransforms(!1), u.autoRotate = o._target._gsTransform), h._onInitTween(u.proxy, g, o._tween), s } }) } }, m._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e) }, m._kill = function(t) {
                    var e, i, n = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                    return this._super._kill.call(this, t) } }(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, n, r, a, o = function() { t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio },
                    s = {},
                    h = o.prototype = new t("css");
                h.constructor = o, o.version = "1.11.0", o.API = 2, o.defaultTransformPerspective = 0, h = "px", o.suffixMap = { top: h, right: h, bottom: h, left: h, width: h, height: h, fontSize: h, padding: h, margin: h, perspective: h };
                var l, c, u, p, d, f, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    y = /[^\d\-\.]/g,
                    _ = /(?:\d|\-|\+|=|#|\.)*/g,
                    x = /opacity *= *([^)]*)/,
                    b = /opacity:([^;]*)/,
                    w = /alpha\(opacity *=.+?\)/i,
                    M = /^(rgb|hsl)/,
                    T = /([A-Z])/g,
                    E = /-([a-z])/gi,
                    S = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    A = function(t, e) {
                        return e.toUpperCase() },
                    R = /(?:Left|Right|Width)/i,
                    L = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    P = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    C = /,(?=[^\)]*(?:\(|$))/gi,
                    I = Math.PI / 180,
                    O = 180 / Math.PI,
                    D = {},
                    U = document,
                    N = U.createElement("div"),
                    F = U.createElement("img"),
                    z = o._internals = { _specialProps: s },
                    B = navigator.userAgent,
                    G = function() {
                        var t, e = B.indexOf("Android"),
                            i = U.createElement("div");
                        return u = B.indexOf("Safari") !== -1 && B.indexOf("Chrome") === -1 && (e === -1 || Number(B.substr(e + 8, 1)) > 3), d = u && Number(B.substr(B.indexOf("Version/") + 8, 1)) < 6, p = B.indexOf("Firefox") !== -1, /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B), f = parseFloat(RegExp.$1), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], !!t && /^0.55/.test(t.style.opacity) }(),
                    k = function(t) {
                        return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1 },
                    H = function(t) { window.console && console.log(t) },
                    j = "",
                    V = "",
                    W = function(t, e) { e = e || N;
                        var i, n, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                        return n >= 0 ? (V = 3 === n ? "ms" : i[n], j = "-" + V.toLowerCase() + "-", V + t) : null },
                    X = U.defaultView ? U.defaultView.getComputedStyle : function() {},
                    Y = o.getStyle = function(t, e, i, n, r) {
                        var a;
                        return G || "opacity" !== e ? (!n && t.style[e] ? a = t.style[e] : (i = i || X(t, null)) ? (t = i.getPropertyValue(e.replace(T, "-$1").toLowerCase()), a = t || i.length ? t : i[e]) : t.currentStyle && (a = t.currentStyle[e]), null == r || a && "none" !== a && "auto" !== a && "auto auto" !== a ? a : r) : k(t) },
                    q = function(t, e, i, n, r) {
                        if ("px" === n || !n) return i;
                        if ("auto" === n || !i) return 0;
                        var a, o = R.test(e),
                            s = t,
                            h = N.style,
                            l = i < 0;
                        return l && (i = -i), "%" === n && e.indexOf("border") !== -1 ? a = i / 100 * (o ? t.clientWidth : t.clientHeight) : (h.cssText = "border-style:solid;border-width:0;position:absolute;line-height:0;", "%" !== n && s.appendChild ? h[o ? "borderLeftWidth" : "borderTopWidth"] = i + n : (s = t.parentNode || U.body, h[o ? "width" : "height"] = i + n), s.appendChild(N), a = parseFloat(N[o ? "offsetWidth" : "offsetHeight"]), s.removeChild(N), 0 === a && !r && (a = q(t, e, i, n, !0))), l ? -a : a },
                    Z = function(t, e, i) {
                        if ("absolute" !== Y(t, "position", i)) return 0;
                        var n = "left" === e ? "Left" : "Top",
                            r = Y(t, "margin" + n, i);
                        return t["offset" + n] - (q(t, e, parseFloat(r), r.replace(_, "")) || 0) },
                    J = function(t, e) {
                        var i, n, r = {};
                        if (e = e || X(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r[e[i].replace(E, A)] = e.getPropertyValue(e[i]);
                            else
                                for (i in e) r[i] = e[i];
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 !== r[i] && (r[i.replace(E, A)] = e[i]);
                        return G || (r.opacity = k(t)), n = Mt(t, e, !1), r.rotation = n.rotation, r.skewX = n.skewX, r.scaleX = n.scaleX, r.scaleY = n.scaleY, r.x = n.x, r.y = n.y, wt && (r.z = n.z, r.rotationX = n.rotationX, r.rotationY = n.rotationY, r.scaleZ = n.scaleZ), r.filters && delete r.filters, r },
                    Q = function(t, e, i, n, r) {
                        var a, o, s, h = {},
                            l = t.style;
                        for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (a = i[o]) || r && r[o]) && o.indexOf("Origin") === -1 && ("number" == typeof a || "string" == typeof a) && (h[o] = "auto" !== a || "left" !== o && "top" !== o ? "" !== a && "auto" !== a && "none" !== a || "string" != typeof e[o] || "" === e[o].replace(y, "") ? a : 0 : Z(t, o), void 0 !== l[o] && (s = new ut(l, o, l[o], s)));
                        if (n)
                            for (o in n) "className" !== o && (h[o] = n[o]);
                        return { difs: h, firstMPT: s } },
                    K = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
                    $ = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    tt = function(t, e, i) {
                        var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = K[e],
                            a = r.length;
                        for (i = i || X(t, null); --a > -1;) n -= parseFloat(Y(t, "padding" + r[a], i, !0)) || 0, n -= parseFloat(Y(t, "border" + r[a] + "Width", i, !0)) || 0;
                        return n },
                    et = function(t, e) { null != t && "" !== t && "auto" !== t && "auto auto" !== t || (t = "0 0");
                        var i = t.split(" "),
                            n = t.indexOf("left") !== -1 ? "0%" : t.indexOf("right") !== -1 ? "100%" : i[0],
                            r = t.indexOf("top") !== -1 ? "0%" : t.indexOf("bottom") !== -1 ? "100%" : i[1];
                        return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && (n + "").indexOf("=") === -1) && (n = "50%"), e && (e.oxp = n.indexOf("%") !== -1, e.oyp = r.indexOf("%") !== -1, e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(y, "")), e.oy = parseFloat(r.replace(y, ""))), n + " " + r + (i.length > 2 ? " " + i[2] : "") },
                    it = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) },
                    nt = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t) },
                    rt = function(t, e, i, n) {
                        var r, a, o, s, h = 1e-6;
                        return null == t ? s = e : "number" == typeof t ? s = t : (r = 360, a = t.split("_"), o = Number(a[0].replace(y, "")) * (t.indexOf("rad") === -1 ? 1 : O) - ("=" === t.charAt(1) ? 0 : e), a.length && (n && (n[i] = e + o), t.indexOf("short") !== -1 && (o %= r, o !== o % (r / 2) && (o = o < 0 ? o + r : o - r)), t.indexOf("_cw") !== -1 && o < 0 ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : t.indexOf("ccw") !== -1 && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), s = e + o), s < h && s > -h && (s = 0), s },
                    at = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] },
                    ot = function(t, e, i) {
                        return t = t < 0 ? t + 1 : t > 1 ? t - 1 : t, 255 * (6 * t < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0 },
                    st = function(t) {
                        var e, i, n, r, a, o;
                        return t && "" !== t ? "number" == typeof t ? [t >> 16, t >> 8 & 255, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t] ? at[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), n = t.charAt(3), t = "#" + e + e + i + i + n + n), t = parseInt(t.substr(1), 16), [t >> 16, t >> 8 & 255, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, a = Number(t[1]) / 100, o = Number(t[2]) / 100, i = o <= .5 ? o * (a + 1) : o + a - o * a, e = 2 * o - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ot(r + 1 / 3, e, i), t[1] = ot(r, e, i), t[2] = ot(r - 1 / 3, e, i), t) : (t = t.match(m) || at.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : at.black },
                    ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (h in at) ht += "|" + h + "\\b";
                ht = new RegExp(ht + ")", "gi");
                var lt = function(t, e, i, n) {
                        if (null == t) return function(t) {
                            return t };
                        var r, a = e ? (t.match(ht) || [""])[0] : "",
                            o = t.split(a).join("").match(v) || [],
                            s = t.substr(0, t.indexOf(o[0])),
                            h = ")" === t.charAt(t.length - 1) ? ")" : "",
                            l = t.indexOf(" ") !== -1 ? " " : ",",
                            c = o.length,
                            u = c > 0 ? o[0].replace(m, "") : "";
                        return c ? r = e ? function(t) {
                            var e, p, d, f;
                            if ("number" == typeof t) t += u;
                            else if (n && C.test(t)) {
                                for (f = t.replace(C, "|").split("|"), d = 0; d < f.length; d++) f[d] = r(f[d]);
                                return f.join(",") }
                            if (e = (t.match(ht) || [a])[0], p = t.split(e).join("").match(v) || [], d = p.length, c > d--)
                                for (; ++d < c;) p[d] = i ? p[(d - 1) / 2 | 0] : o[d];
                            return s + p.join(l) + l + e + h + (t.indexOf("inset") !== -1 ? " inset" : "") } : function(t) {
                            var e, a, p;
                            if ("number" == typeof t) t += u;
                            else if (n && C.test(t)) {
                                for (a = t.replace(C, "|").split("|"), p = 0; p < a.length; p++) a[p] = r(a[p]);
                                return a.join(",") }
                            if (e = t.match(v) || [], p = e.length, c > p--)
                                for (; ++p < c;) e[p] = i ? e[(p - 1) / 2 | 0] : o[p];
                            return s + e.join(l) + h } : function(t) {
                            return t } },
                    ct = function(t) {
                        return t = t.split(","),
                            function(e, i, n, r, a, o, s) {
                                var h, l = (i + "").split(" ");
                                for (s = {}, h = 0; h < 4; h++) s[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                                return r.parse(e, s, a, o) } },
                    ut = (z._setPluginRatio = function(t) { this.plugin.setRatio(t);
                        for (var e, i, n, r, a = this.data, o = a.proxy, s = a.firstMPT, h = 1e-6; s;) e = o[s.v], s.r ? e = e > 0 ? e + .5 | 0 : e - .5 | 0 : e < h && e > -h && (e = 0), s.t[s.p] = e, s = s._next;
                        if (a.autoRotate && (a.autoRotate.rotation = o.rotation), 1 === t)
                            for (s = a.firstMPT; s;) {
                                if (i = s.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i.e = r } } else i.e = i.s + i.xs0;
                                s = s._next } }, function(t, e, i, n, r) { this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n) }),
                    pt = (z._parseToProxy = function(t, e, i, n, r, a) {
                        var o, s, h, l, c, u = n,
                            p = {},
                            d = {},
                            f = i._transform,
                            m = D;
                        for (i._transform = null, D = e, n = c = i.parse(t, e, n, r), D = m, a && (i._transform = f, u && (u._prev = null, u._prev && (u._prev._next = null))); n && n !== u;) {
                            if (n.type <= 1 && (s = n.p, d[s] = n.s + n.c, p[s] = n.s, a || (l = new ut(n, "s", s, l, n.r), n.c = 0), 1 === n.type))
                                for (o = n.l; --o > 0;) h = "xn" + o, s = n.p + "_" + h, d[s] = n.data[h], p[s] = n[h], a || (l = new ut(n, h, s, l, n.rxp[h]));
                            n = n._next }
                        return { proxy: p, end: d, firstMPT: l, pt: c } }, z.CSSPropTween = function(t, e, n, r, o, s, h, l, c, u, p) { this.t = t, this.p = e, this.s = n, this.c = r, this.n = h || e, t instanceof pt || a.push(this.n), this.r = l, this.type = s || 0, c && (this.pr = c, i = !0), this.b = void 0 === u ? n : u, this.e = void 0 === p ? n + r : p, o && (this._next = o, o._prev = this) }),
                    dt = o.parseComplex = function(t, e, i, n, r, a, o, s, h, c) { i = i || a || "", o = new pt(t, e, 0, 0, o, c ? 2 : 1, null, !1, s, i, n), n += "";
                        var u, p, d, f, v, y, _, x, b, w, T, E, S = i.split(", ").join(",").split(" "),
                            A = n.split(", ").join(",").split(" "),
                            R = S.length,
                            L = l !== !1;
                        for (n.indexOf(",") === -1 && i.indexOf(",") === -1 || (S = S.join(" ").replace(C, ", ").split(" "), A = A.join(" ").replace(C, ", ").split(" "), R = S.length), R !== A.length && (S = (a || "").split(" "), R = S.length), o.plugin = h, o.setRatio = c, u = 0; u < R; u++)
                            if (f = S[u], v = A[u], x = parseFloat(f), x || 0 === x) o.appendXtra("", x, it(v, x), v.replace(g, ""), L && v.indexOf("px") !== -1, !0);
                            else if (r && ("#" === f.charAt(0) || at[f] || M.test(f))) E = "," === v.charAt(v.length - 1) ? ")," : ")", f = st(f), v = st(v), b = f.length + v.length > 6, b && !G && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(A[u]).join("transparent")) : (G || (b = !1), o.appendXtra(b ? "rgba(" : "rgb(", f[0], v[0] - f[0], ",", !0, !0).appendXtra("", f[1], v[1] - f[1], ",", !0).appendXtra("", f[2], v[2] - f[2], b ? "," : E, !0), b && (f = f.length < 4 ? 1 : f[3], o.appendXtra("", f, (v.length < 4 ? 1 : v[3]) - f, E, !1)));
                        else if (y = f.match(m)) {
                            if (_ = v.match(g), !_ || _.length !== y.length) return o;
                            for (d = 0, p = 0; p < y.length; p++) T = y[p], w = f.indexOf(T, d), o.appendXtra(f.substr(d, w - d), Number(T), it(_[p], T), "", L && "px" === f.substr(w + T.length, 2), 0 === p), d = w + T.length;
                            o["xs" + o.l] += f.substr(d) } else o["xs" + o.l] += o.l ? " " + f : f;
                        if (n.indexOf("=") !== -1 && o.data) {
                            for (E = o.xs0 + o.data.s, u = 1; u < o.l; u++) E += o["xs" + u] + o.data["xn" + u];
                            o.e = E + o["xs" + u] }
                        return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o },
                    ft = 9;
                for (h = pt.prototype, h.l = h.pr = 0; --ft > 0;) h["xn" + ft] = 0, h["xs" + ft] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, n, r, a) {
                    var o = this,
                        s = o.l;
                    return o["xs" + s] += a && s ? " " + t : t || "", i || 0 === s || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", s > 0 ? (o.data["xn" + s] = e + i, o.rxp["xn" + s] = r, o["xn" + s] = e, o.plugin || (o.xfirst = new pt(o, "xn" + s, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = { s: e + i }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + s] += e + (n || ""), o) };
                var mt = function(t, e) { e = e || {}, this.p = e.prefix ? W(t) || t : t, s[t] = s[this.p] = this, this.format = e.formatter || lt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0 },
                    gt = z._registerComplexSpecialProp = function(t, e, i) { "object" != typeof e && (e = { parser: i });
                        var n, r, a = t.split(","),
                            o = e.defaultValue;
                        for (i = i || [o], n = 0; n < a.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, r = new mt(a[n], e) },
                    vt = function(t) {
                        if (!s[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            gt(t, { parser: function(t, i, n, r, a, o, h) {
                                    var l = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                                    return l ? (l._cssRegister(), s[n].parse(t, i, n, r, a, o, h)) : (H("Error: " + e + " js file not loaded."), a) } }) } };
                h = mt.prototype, h.parseComplex = function(t, e, i, n, r, a) {
                    var o, s, h, l, c, u, p = this.keyword;
                    if (this.multi && (C.test(i) || C.test(e) ? (s = e.replace(C, "|").split("|"), h = i.replace(C, "|").split("|")) : p && (s = [e], h = [i])), h) {
                        for (l = h.length > s.length ? h.length : s.length, o = 0; o < l; o++) e = s[o] = s[o] || this.dflt, i = h[o] = h[o] || this.dflt, p && (c = e.indexOf(p), u = i.indexOf(p), c !== u && (i = u === -1 ? h : s, i[o] += " " + p));
                        e = s.join(", "), i = h.join(", ") }
                    return dt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, a) }, h.parse = function(t, e, i, n, a, o, s) {
                    return this.parseComplex(t.style, this.format(Y(t, this.p, r, !1, this.dflt)), this.format(e), a, o) }, o.registerSpecialProp = function(t, e, i) { gt(t, { parser: function(t, n, r, a, o, s, h) {
                            var l = new pt(t, r, 0, 0, o, 2, r, !1, i);
                            return l.plugin = s, l.setRatio = e(t, n, a._tween, r), l }, priority: i }) };
                var yt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
                    _t = W("transform"),
                    xt = j + "transform",
                    bt = W("transformOrigin"),
                    wt = null !== W("perspective"),
                    Mt = function(t, e, i, n) {
                        if (t._gsTransform && i && !n) return t._gsTransform;
                        var r, a, s, h, l, c, u, p, d, f, m, g, v, y = i ? t._gsTransform || { skewY: 0 } : { skewY: 0 },
                            _ = y.scaleX < 0,
                            x = 2e-5,
                            b = 1e5,
                            w = 179.99,
                            M = w * I,
                            T = wt ? parseFloat(Y(t, bt, e, !1, "0 0 0").split(" ")[2]) || y.zOrigin || 0 : 0;
                        for (_t ? r = Y(t, xt, e, !0) : t.currentStyle && (r = t.currentStyle.filter.match(L), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), y.x || 0, y.y || 0].join(",") : ""), a = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], s = a.length; --s > -1;) h = Number(a[s]), a[s] = (l = h - (h |= 0)) ? (l * b + (l < 0 ? -.5 : .5) | 0) / b + h : h;
                        if (16 === a.length) {
                            var E = a[8],
                                S = a[9],
                                A = a[10],
                                R = a[12],
                                P = a[13],
                                C = a[14];
                            if (y.zOrigin && (C = -y.zOrigin, R = E * C - a[12], P = S * C - a[13], C = A * C + y.zOrigin - a[14]), !i || n || null == y.rotationX) {
                                var D, U, N, F, z, B, G, k = a[0],
                                    H = a[1],
                                    j = a[2],
                                    V = a[3],
                                    W = a[4],
                                    X = a[5],
                                    q = a[6],
                                    Z = a[7],
                                    J = a[11],
                                    Q = Math.atan2(q, A),
                                    K = Q < -M || Q > M;
                                y.rotationX = Q * O, Q && (F = Math.cos(-Q), z = Math.sin(-Q), D = W * F + E * z, U = X * F + S * z, N = q * F + A * z, E = W * -z + E * F, S = X * -z + S * F, A = q * -z + A * F, J = Z * -z + J * F, W = D, X = U, q = N), Q = Math.atan2(E, k), y.rotationY = Q * O, Q && (B = Q < -M || Q > M, F = Math.cos(-Q), z = Math.sin(-Q), D = k * F - E * z, U = H * F - S * z, N = j * F - A * z, S = H * z + S * F, A = j * z + A * F, J = V * z + J * F, k = D, H = U, j = N), Q = Math.atan2(H, X), y.rotation = Q * O, Q && (G = Q < -M || Q > M, F = Math.cos(-Q), z = Math.sin(-Q), k = k * F + W * z, U = H * F + X * z, X = H * -z + X * F, q = j * -z + q * F, H = U), G && K ? y.rotation = y.rotationX = 0 : G && B ? y.rotation = y.rotationY = 0 : B && K && (y.rotationY = y.rotationX = 0), y.scaleX = (Math.sqrt(k * k + H * H) * b + .5 | 0) / b, y.scaleY = (Math.sqrt(X * X + S * S) * b + .5 | 0) / b, y.scaleZ = (Math.sqrt(q * q + A * A) * b + .5 | 0) / b, y.skewX = 0, y.perspective = J ? 1 / (J < 0 ? -J : J) : 0, y.x = R, y.y = P, y.z = C } } else if ((!wt || n || !a.length || y.x !== a[4] || y.y !== a[5] || !y.rotationX && !y.rotationY) && (void 0 === y.x || "none" !== Y(t, "display", e))) {
                            var $ = a.length >= 6,
                                tt = $ ? a[0] : 1,
                                et = a[1] || 0,
                                it = a[2] || 0,
                                nt = $ ? a[3] : 1;
                            y.x = a[4] || 0, y.y = a[5] || 0, c = Math.sqrt(tt * tt + et * et), u = Math.sqrt(nt * nt + it * it), p = tt || et ? Math.atan2(et, tt) * O : y.rotation || 0, d = it || nt ? Math.atan2(it, nt) * O + p : y.skewX || 0, f = c - Math.abs(y.scaleX || 0), m = u - Math.abs(y.scaleY || 0), Math.abs(d) > 90 && Math.abs(d) < 270 && (_ ? (c *= -1, d += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (u *= -1, d += d <= 0 ? 180 : -180)), g = (p - y.rotation) % 180, v = (d - y.skewX) % 180, (void 0 === y.skewX || f > x || f < -x || m > x || m < -x || g > -w && g < w && g * b | !1 || v > -w && v < w && v * b | !1) && (y.scaleX = c, y.scaleY = u, y.rotation = p, y.skewX = d), wt && (y.rotationX = y.rotationY = y.z = 0, y.perspective = parseFloat(o.defaultTransformPerspective) || 0, y.scaleZ = 1) }
                        y.zOrigin = T;
                        for (s in y) y[s] < x && y[s] > -x && (y[s] = 0);
                        return i && (t._gsTransform = y), y },
                    Tt = function(t) {
                        var e, i, n = this.data,
                            r = -n.rotation * I,
                            a = r + n.skewX * I,
                            o = 1e5,
                            s = (Math.cos(r) * n.scaleX * o | 0) / o,
                            h = (Math.sin(r) * n.scaleX * o | 0) / o,
                            l = (Math.sin(a) * -n.scaleY * o | 0) / o,
                            c = (Math.cos(a) * n.scaleY * o | 0) / o,
                            u = this.t.style,
                            p = this.t.currentStyle;
                        if (p) { i = h, h = -l, l = -i, e = p.filter, u.filter = "";
                            var d, m, g = this.t.offsetWidth,
                                v = this.t.offsetHeight,
                                y = "absolute" !== p.position,
                                b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + s + ", M12=" + h + ", M21=" + l + ", M22=" + c,
                                w = n.x,
                                M = n.y;
                            if (null != n.ox && (d = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, m = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, w += d - (d * s + m * h), M += m - (d * l + m * c)), y ? (d = g / 2, m = v / 2, b += ", Dx=" + (d - (d * s + m * h) + w) + ", Dy=" + (m - (d * l + m * c) + M) + ")") : b += ", sizingMethod='auto expand')", e.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? u.filter = e.replace(P, b) : u.filter = b + " " + e, (0 === t || 1 === t) && 1 === s && 0 === h && 0 === l && 1 === c && (!y || b.indexOf("Dx=0, Dy=0") !== -1) && (!x.test(e) || 100 === parseFloat(RegExp.$1)) && e.indexOf(e.indexOf("Alpha")) === -1 && u.removeAttribute("filter"), !y) {
                                var T, E, S, A = f < 8 ? 1 : -1;
                                for (d = n.ieOffsetX || 0, m = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((s < 0 ? -s : s) * g + (h < 0 ? -h : h) * v)) / 2 + w), n.ieOffsetY = Math.round((v - ((c < 0 ? -c : c) * v + (l < 0 ? -l : l) * g)) / 2 + M), ft = 0; ft < 4; ft++) E = $[ft], T = p[E], i = T.indexOf("px") !== -1 ? parseFloat(T) : q(this.t, E, parseFloat(T), T.replace(_, "")) || 0, S = i !== n[E] ? ft < 2 ? -n.ieOffsetX : -n.ieOffsetY : ft < 2 ? d - n.ieOffsetX : m - n.ieOffsetY, u[E] = (n[E] = Math.round(i - S * (0 === ft || 2 === ft ? 1 : A))) + "px" } } },
                    Et = function(t) {
                        var e, i, n, r, a, o, s, h, l, c, u, d, f, m, g, v, y, _, x, b, w, M, T, E, S, A, R = this.data,
                            L = this.t.style,
                            P = R.rotation * I,
                            C = R.scaleX,
                            O = R.scaleY,
                            D = R.scaleZ,
                            U = R.perspective;
                        if (p && (E = L.top ? "top" : L.bottom ? "bottom" : parseFloat(Y(this.t, "top", null, !1)) ? "bottom" : "top", b = Y(this.t, E, null, !1), S = parseFloat(b) || 0, A = b.substr((S + "").length) || "px", R._ffFix = !R._ffFix, L[E] = (R._ffFix ? S + .05 : S - .05) + A), P || R.skewX) _ = Math.cos(P), x = Math.sin(P), e = _, a = x, R.skewX && (P -= R.skewX * I, _ = Math.cos(P), x = Math.sin(P)), i = -x, o = _;
                        else {
                            if (!R.rotationY && !R.rotationX && 1 === D && !U) return void(L[_t] = "translate3d(" + R.x + "px," + R.y + "px," + R.z + "px)" + (1 !== C || 1 !== O ? " scale(" + C + "," + O + ")" : ""));
                            e = o = 1, i = a = 0 }
                        u = 1, n = r = s = h = l = c = d = f = m = 0, g = U ? -1 / U : 0, v = R.zOrigin, y = 1e5, P = R.rotationY * I, P && (_ = Math.cos(P), x = Math.sin(P), l = u * -x, f = g * -x, n = e * x, s = a * x, u *= _, g *= _, e *= _, a *= _), P = R.rotationX * I, P && (_ = Math.cos(P), x = Math.sin(P), b = i * _ + n * x, w = o * _ + s * x, M = c * _ + u * x, T = m * _ + g * x, n = i * -x + n * _, s = o * -x + s * _, u = c * -x + u * _, g = m * -x + g * _, i = b, o = w, c = M, m = T), 1 !== D && (n *= D, s *= D, u *= D, g *= D), 1 !== O && (i *= O, o *= O, c *= O, m *= O), 1 !== C && (e *= C, a *= C, l *= C, f *= C), v && (d -= v, r = n * d, h = s * d, d = u * d + v), r = (b = (r += R.x) - (r |= 0)) ? (b * y + (b < 0 ? -.5 : .5) | 0) / y + r : r, h = (b = (h += R.y) - (h |= 0)) ? (b * y + (b < 0 ? -.5 : .5) | 0) / y + h : h, d = (b = (d += R.z) - (d |= 0)) ? (b * y + (b < 0 ? -.5 : .5) | 0) / y + d : d, L[_t] = "matrix3d(" + [(e * y | 0) / y, (a * y | 0) / y, (l * y | 0) / y, (f * y | 0) / y, (i * y | 0) / y, (o * y | 0) / y, (c * y | 0) / y, (m * y | 0) / y, (n * y | 0) / y, (s * y | 0) / y, (u * y | 0) / y, (g * y | 0) / y, r, h, d, U ? 1 + -d / U : 1].join(",") + ")" },
                    St = function(t) {
                        var e, i, n, r, a, o, s, h, l, c = this.data,
                            u = this.t,
                            d = u.style;
                        p && (e = d.top ? "top" : d.bottom ? "bottom" : parseFloat(Y(u, "top", null, !1)) ? "bottom" : "top", i = Y(u, e, null, !1), n = parseFloat(i) || 0, r = i.substr((n + "").length) || "px", c._ffFix = !c._ffFix, d[e] = (c._ffFix ? n + .05 : n - .05) + r), c.rotation || c.skewX ? (a = c.rotation * I, o = a - c.skewX * I, s = 1e5, h = c.scaleX * s, l = c.scaleY * s, d[_t] = "matrix(" + (Math.cos(a) * h | 0) / s + "," + (Math.sin(a) * h | 0) / s + "," + (Math.sin(o) * -l | 0) / s + "," + (Math.cos(o) * l | 0) / s + "," + c.x + "," + c.y + ")") : d[_t] = "matrix(" + c.scaleX + ",0,0," + c.scaleY + "," + c.x + "," + c.y + ")" };
                gt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {
                    parser: function(t, e, i, n, a, o, s) {
                        if (n._transform) return a;
                        var h, l, c, u, p, d, f, m = n._transform = Mt(t, r, !0, s.parseTransform),
                            g = t.style,
                            v = 1e-6,
                            y = yt.length,
                            _ = s,
                            x = {};
                        if ("string" == typeof _.transform && _t) c = g.cssText, g[_t] = _.transform, g.display = "block", h = Mt(t, null, !1), g.cssText = c;
                        else if ("object" == typeof _) {
                            if (h = { scaleX: nt(null != _.scaleX ? _.scaleX : _.scale, m.scaleX), scaleY: nt(null != _.scaleY ? _.scaleY : _.scale, m.scaleY), scaleZ: nt(null != _.scaleZ ? _.scaleZ : _.scale, m.scaleZ), x: nt(_.x, m.x), y: nt(_.y, m.y), z: nt(_.z, m.z), perspective: nt(_.transformPerspective, m.perspective) }, f = _.directionalRotation, null != f)
                                if ("object" == typeof f)
                                    for (c in f) _[c] = f[c];
                                else _.rotation = f;
                            h.rotation = rt("rotation" in _ ? _.rotation : "shortRotation" in _ ? _.shortRotation + "_short" : "rotationZ" in _ ? _.rotationZ : m.rotation, m.rotation, "rotation", x),
                                wt && (h.rotationX = rt("rotationX" in _ ? _.rotationX : "shortRotationX" in _ ? _.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", x), h.rotationY = rt("rotationY" in _ ? _.rotationY : "shortRotationY" in _ ? _.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", x)), h.skewX = null == _.skewX ? m.skewX : rt(_.skewX, m.skewX), h.skewY = null == _.skewY ? m.skewY : rt(_.skewY, m.skewY), (l = h.skewY - m.skewY) && (h.skewX += l, h.rotation += l)
                        }
                        for (null != _.force3D && (m.force3D = _.force3D, d = !0), p = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, !p && null != _.scale && (h.scaleZ = 1); --y > -1;) i = yt[y], u = h[i] - m[i], (u > v || u < -v || null != D[i]) && (d = !0, a = new pt(m, i, m[i], u, a), i in x && (a.e = x[i]), a.xs0 = 0, a.plugin = o, n._overwriteProps.push(a.n));
                        return u = _.transformOrigin, (u || wt && p && m.zOrigin) && (_t ? (d = !0, i = bt, u = (u || Y(t, i, r, !1, "50% 50%")) + "", a = new pt(g, i, 0, 0, a, -1, "transformOrigin"), a.b = g[i], a.plugin = o, wt ? (c = m.zOrigin, u = u.split(" "), m.zOrigin = (u.length > 2 && (0 === c || "0px" !== u[2]) ? parseFloat(u[2]) : c) || 0, a.xs0 = a.e = g[i] = u[0] + " " + (u[1] || "50%") + " 0px", a = new pt(m, "zOrigin", 0, 0, a, -1, a.n), a.b = c, a.xs0 = a.e = m.zOrigin) : a.xs0 = a.e = g[i] = u) : et(u + "", m)), d && (n._transformType = p || 3 === this._transformType ? 3 : 2), a
                    },
                    prefix: !0
                }), gt("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }), gt("borderRadius", { defaultValue: "0px", parser: function(t, e, i, a, o, s) { e = this.format(e);
                        var h, l, c, u, p, d, f, m, g, v, y, _, x, b, w, M, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            E = t.style;
                        for (g = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), h = e.split(" "), l = 0; l < T.length; l++) this.p.indexOf("border") && (T[l] = W(T[l])), p = u = Y(t, T[l], r, !1, "0px"), p.indexOf(" ") !== -1 && (u = p.split(" "), p = u[0], u = u[1]), d = c = h[l], f = parseFloat(p), _ = p.substr((f + "").length), x = "=" === d.charAt(1), x ? (m = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), m *= parseFloat(d), y = d.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(d), y = d.substr((m + "").length)), "" === y && (y = n[i] || _), y !== _ && (b = q(t, "borderLeft", f, _), w = q(t, "borderTop", f, _), "%" === y ? (p = b / g * 100 + "%", u = w / v * 100 + "%") : "em" === y ? (M = q(t, "borderLeft", 1, "em"), p = b / M + "em", u = w / M + "em") : (p = b + "px", u = w + "px"), x && (d = parseFloat(p) + m + y, c = parseFloat(u) + m + y)), o = dt(E, T[l], p + " " + u, d + " " + c, !1, "0px", o);
                        return o }, prefix: !0, formatter: lt("0px 0px 0px 0px", !1, !0) }), gt("backgroundPosition", { defaultValue: "0 0", parser: function(t, e, i, n, a, o) {
                        var s, h, l, c, u, p, d = "background-position",
                            m = r || X(t, null),
                            g = this.format((m ? f ? m.getPropertyValue(d + "-x") + " " + m.getPropertyValue(d + "-y") : m.getPropertyValue(d) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            v = this.format(e);
                        if (g.indexOf("%") !== -1 != (v.indexOf("%") !== -1) && (p = Y(t, "backgroundImage").replace(S, ""), p && "none" !== p)) {
                            for (s = g.split(" "), h = v.split(" "), F.setAttribute("src", p), l = 2; --l > -1;) g = s[l], c = g.indexOf("%") !== -1, c !== (h[l].indexOf("%") !== -1) && (u = 0 === l ? t.offsetWidth - F.width : t.offsetHeight - F.height, s[l] = c ? parseFloat(g) / 100 * u + "px" : parseFloat(g) / u * 100 + "%");
                            g = s.join(" ") }
                        return this.parseComplex(t.style, g, v, a, o) }, formatter: et }), gt("backgroundSize", { defaultValue: "0 0", formatter: et }), gt("perspective", { defaultValue: "0px", prefix: !0 }), gt("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }), gt("transformStyle", { prefix: !0 }), gt("backfaceVisibility", { prefix: !0 }), gt("userSelect", { prefix: !0 }), gt("margin", { parser: ct("marginTop,marginRight,marginBottom,marginLeft") }), gt("padding", { parser: ct("paddingTop,paddingRight,paddingBottom,paddingLeft") }), gt("clip", { defaultValue: "rect(0px,0px,0px,0px)", parser: function(t, e, i, n, a, o) {
                        var s, h, l;
                        return f < 9 ? (h = t.currentStyle, l = f < 8 ? " " : ",", s = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (s = this.format(Y(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, s, e, a, o) } }), gt("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }), gt("autoRound,strictUnits", { parser: function(t, e, i, n, r) {
                        return r } }), gt("border", { defaultValue: "0px solid #000", parser: function(t, e, i, n, a, o) {
                        return this.parseComplex(t.style, this.format(Y(t, "borderTopWidth", r, !1, "0px") + " " + Y(t, "borderTopStyle", r, !1, "solid") + " " + Y(t, "borderTopColor", r, !1, "#000")), this.format(e), a, o) }, color: !0, formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(ht) || ["#000"])[0] } }), gt("float,cssFloat,styleFloat", { parser: function(t, e, i, n, r, a) {
                        var o = t.style,
                            s = "cssFloat" in o ? "cssFloat" : "styleFloat";
                        return new pt(o, s, 0, 0, r, -1, i, !1, 0, o[s], e) } });
                var At = function(t) {
                    var e, i = this.t,
                        n = i.filter || Y(this.data, "filter"),
                        r = this.s + this.c * t | 0;
                    100 === r && (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1 && n.indexOf("oader(") === -1 ? (i.removeAttribute("filter"), e = !Y(this.data, "filter")) : (i.filter = n.replace(w, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), n.indexOf("opacity") === -1 ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r)) };
                gt("opacity,alpha,autoAlpha", { defaultValue: "1", parser: function(t, e, i, n, a, o) {
                        var s = parseFloat(Y(t, "opacity", r, !1, "1")),
                            h = t.style,
                            l = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + s), l && 1 === s && "hidden" === Y(t, "visibility", r) && 0 !== e && (s = 0), G ? a = new pt(h, "opacity", s, e - s, a) : (a = new pt(h, "opacity", 100 * s, 100 * (e - s), a), a.xn1 = l ? 1 : 0, h.zoom = 1, a.type = 2, a.b = "alpha(opacity=" + a.s + ")", a.e = "alpha(opacity=" + (a.s + a.c) + ")", a.data = t, a.plugin = o, a.setRatio = At), l && (a = new pt(h, "visibility", 0, 0, a, -1, null, !1, 0, 0 !== s ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), a.xs0 = "inherit", n._overwriteProps.push(a.n), n._overwriteProps.push(i)), a } });
                var Rt = function(t, e) { e && (t.removeProperty ? t.removeProperty(e.replace(T, "-$1").toLowerCase()) : t.removeAttribute(e)) },
                    Lt = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) { this.t.className = 0 === t ? this.b : this.e;
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Rt(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null) } else this.t.className !== this.e && (this.t.className = this.e) };
                gt("className", { parser: function(t, e, n, a, o, s, h) {
                        var l, c, u, p, d, f = t.className,
                            m = t.style.cssText;
                        if (o = a._classNamePT = new pt(t, n, 0, 0, o, 2), o.setRatio = Lt, o.pr = -11, i = !0, o.b = f, c = J(t, r), u = t._gsClassPT, u) {
                            for (p = {}, d = u.data; d;) p[d.p] = 1, d = d._next;
                            u.setRatio(1) }
                        return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : f.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), a._tween._duration && (t.className = o.e, l = Q(t, c, J(t), h, p), t.className = f, o.data = l.firstMPT, t.style.cssText = m, o = o.xfirst = a.parse(t, l.difs, o, s)), o } });
                var Pt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, n, r, a = this.t.style,
                            o = s.transform.parse;
                        if ("all" === this.e) a.cssText = "", r = !0;
                        else
                            for (e = this.e.split(","), n = e.length; --n > -1;) i = e[n], s[i] && (s[i].parse === o ? r = !0 : i = "transformOrigin" === i ? bt : s[i].p), Rt(a, i);
                        r && (Rt(a, _t), this.t._gsTransform && delete this.t._gsTransform) } };
                for (gt("clearProps", { parser: function(t, e, n, r, a) {
                            return a = new pt(t, n, 0, 0, a, 2), a.setRatio = Pt, a.e = e, a.pr = -10, a.data = r._tween, i = !0, a } }), h = "bezier,throwProps,physicsProps,physics2D".split(","), ft = h.length; ft--;) vt(h[ft]);
                h = o.prototype, h._firstPT = null, h._onInitTween = function(t, e, s) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = s, this._vars = e, l = e.autoRound, i = !1, n = e.suffixMap || o.suffixMap, r = X(t, ""), a = this._overwriteProps;
                    var h, p, f, m, g, v, y, _, x, w = t.style;
                    if (c && "" === w.zIndex && (h = Y(t, "zIndex", r), "auto" !== h && "" !== h || (w.zIndex = 0)), "string" == typeof e && (m = w.cssText, h = J(t, r), w.cssText = m + ";" + e, h = Q(t, h, J(t)).difs, !G && b.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, w.cssText = m), this._firstPT = p = this.parse(t, e, null), this._transformType) {
                        for (x = 3 === this._transformType, _t ? u && (c = !0, "" === w.zIndex && (y = Y(t, "zIndex", r), "auto" !== y && "" !== y || (w.zIndex = 0)), d && (w.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : w.zoom = 1, f = p; f && f._next;) f = f._next;
                        _ = new pt(t, "transform", 0, 0, null, 2), this._linkCSSP(_, null, f), _.setRatio = x && wt ? Et : _t ? St : Tt, _.data = this._transform || Mt(t, r, !0), a.pop() }
                    if (i) {
                        for (; p;) {
                            for (v = p._next, f = m; f && f.pr > p.pr;) f = f._next;
                            (p._prev = f ? f._prev : g) ? p._prev._next = p: m = p, (p._next = f) ? f._prev = p : g = p, p = v }
                        this._firstPT = m }
                    return !0 }, h.parse = function(t, e, i, a) {
                    var o, h, c, u, p, d, f, m, g, v, y = t.style;
                    for (o in e) d = e[o], h = s[o], h ? i = h.parse(t, d, o, this, i, a, e) : (p = Y(t, o, r) + "", g = "string" == typeof d, "color" === o || "fill" === o || "stroke" === o || o.indexOf("Color") !== -1 || g && M.test(d) ? (g || (d = st(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = dt(y, o, p, d, !0, "transparent", i, 0, a)) : !g || d.indexOf(" ") === -1 && d.indexOf(",") === -1 ? (c = parseFloat(p), f = c || 0 === c ? p.substr((c + "").length) : "", "" !== p && "auto" !== p || ("width" === o || "height" === o ? (c = tt(t, o, r), f = "px") : "left" === o || "top" === o ? (c = Z(t, o, r), f = "px") : (c = "opacity" !== o ? 0 : 1, f = "")), v = g && "=" === d.charAt(1), v ? (u = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), u *= parseFloat(d), m = d.replace(_, "")) : (u = parseFloat(d), m = g ? d.substr((u + "").length) || "" : ""), "" === m && (m = n[o] || f), d = u || 0 === u ? (v ? u + c : u) + m : e[o], f !== m && "" !== m && (u || 0 === u) && (c || 0 === c) && (c = q(t, o, c, f), "%" === m ? (c /= q(t, o, 100, "%") / 100, c > 100 && (c = 100), e.strictUnits !== !0 && (p = c + "%")) : "em" === m ? c /= q(t, o, 1, "em") : (u = q(t, o, u, m), m = "px"), v && (u || 0 === u) && (d = u + c + m)), v && (u += c), !c && 0 !== c || !u && 0 !== u ? void 0 !== y[o] && (d || d + "" != "NaN" && null != d) ? (i = new pt(y, o, u || c || 0, 0, i, -1, o, !1, 0, p, d), i.xs0 = "none" !== d || "display" !== o && o.indexOf("Style") === -1 ? d : p) : H("invalid " + o + " tween value: " + e[o]) : (i = new pt(y, o, c, u - c, i, 0, o, l !== !1 && ("px" === m || "zIndex" === o), 0, p, d), i.xs0 = m)) : i = dt(y, o, p, d, !0, null, i, 0, a)), a && i && !i.plugin && (i.plugin = a);
                    return i }, h.setRatio = function(t) {
                    var e, i, n, r = this._firstPT,
                        a = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = e > 0 ? e + .5 | 0 : e - .5 | 0 : e < a && e > -a && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i } else r.type === -1 ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next }, h._enableTransforms = function(t) { this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Mt(this._target, r, !0) }, h._linkCSSP = function(t, e, i, n) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : !n && null === this._firstPT && (this._firstPT = t), t._next = e, t._prev = i), t }, h._kill = function(e) {
                    var i, n, r, a = e;
                    if (e.autoAlpha || e.alpha) { a = {};
                        for (n in e) a[n] = e[n];
                        a.opacity = 1, a.autoAlpha && (a.visibility = 1) }
                    return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, a) };
                var Ct = function(t, e, i) {
                    var n, r, a, o;
                    if (t.slice)
                        for (r = t.length; --r > -1;) Ct(t[r], e, i);
                    else
                        for (n = t.childNodes, r = n.length; --r > -1;) a = n[r], o = a.type, a.style && (e.push(J(a)), i && i.push(a)), (1 === o || 9 === o || 11 === o) && a.childNodes.length && Ct(a, e, i) };
                return o.cascadeTo = function(t, i, n) {
                    var r, a, o, s = e.to(t, i, n),
                        h = [s],
                        l = [],
                        c = [],
                        u = [],
                        p = e._internals.reservedProps;
                    for (t = s._targets || s.target, Ct(t, l, u), s.render(i, !0), Ct(t, c), s.render(0, !0), s._enabled(!0), r = u.length; --r > -1;)
                        if (a = Q(u[r], l[r], c[r]), a.firstMPT) { a = a.difs;
                            for (o in n) p[o] && (a[o] = n[o]);
                            h.push(e.to(u[r], i, a)) }
                    return h }, t.activate([o]), o
            }, !0),
            function() {
                var t = window._gsDefine.plugin({ propName: "roundProps", priority: -1, API: 2, init: function(t, e, i) {
                            return this._tween = i, !0 } }),
                    e = t.prototype;
                e._onInitAllProps = function() {
                    for (var t, e, i, n = this._tween, r = n.vars.roundProps instanceof Array ? n.vars.roundProps : n.vars.roundProps.split(","), a = r.length, o = {}, s = n._propLookup.roundProps; --a > -1;) o[r[a]] = 1;
                    for (a = r.length; --a > -1;)
                        for (t = r[a], e = n._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(o, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : n._firstPT === e && (n._firstPT = i), e._next = e._prev = null, n._propLookup[t] = s), e = i;
                    return !1 }, e._add = function(t, e, i, n) { this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e) } }(), window._gsDefine.plugin({ propName: "attr", API: 2, init: function(t, e, i) {
                    var n;
                    if ("function" != typeof t.setAttribute) return !1;
                    this._target = t, this._proxy = {};
                    for (n in e) this._addTween(this._proxy, n, parseFloat(t.getAttribute(n)), e[n], n) && this._overwriteProps.push(n);
                    return !0 }, set: function(t) { this._super.setRatio.call(this, t);
                    for (var e, i = this._overwriteProps, n = i.length; --n > -1;) e = i[n], this._target.setAttribute(e, this._proxy[e] + "") } }), window._gsDefine.plugin({ propName: "directionalRotation", API: 2, init: function(t, e, i) { "object" != typeof e && (e = { rotation: e }), this.finals = {};
                    var n, r, a, o, s, h, l = e.useRadians === !0 ? 2 * Math.PI : 360,
                        c = 1e-6;
                    for (n in e) "useRadians" !== n && (h = (e[n] + "").split("_"), r = h[0], a = parseFloat("function" != typeof t[n] ? t[n] : t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), o = this.finals[n] = "string" == typeof r && "=" === r.charAt(1) ? a + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, s = o - a, h.length && (r = h.join("_"), r.indexOf("short") !== -1 && (s %= l, s !== s % (l / 2) && (s = s < 0 ? s + l : s - l)), r.indexOf("_cw") !== -1 && s < 0 ? s = (s + 9999999999 * l) % l - (s / l | 0) * l : r.indexOf("ccw") !== -1 && s > 0 && (s = (s - 9999999999 * l) % l - (s / l | 0) * l)), (s > c || s < -c) && (this._addTween(t, n, a, a + s, n), this._overwriteProps.push(n)));
                    return !0 }, set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next } })._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, n, r = window.GreenSockGlobals || window,
                    a = r.com.greensock,
                    o = 2 * Math.PI,
                    s = Math.PI / 2,
                    h = a._class,
                    l = function(e, i) {
                        var n = h("easing." + e, function() {}, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, n },
                    c = t.register || function() {},
                    u = function(t, e, i, n, r) {
                        var a = h("easing." + t, { easeOut: new e, easeIn: new i, easeInOut: new n }, !0);
                        return c(a, t), a },
                    p = function(t, e, i) { this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t) },
                    d = function(e, i) {
                        var n = h("easing." + e, function(t) { this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1 }, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, r.config = function(t) {
                            return new n(t) }, n },
                    f = u("Back", d("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1 }), d("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1) }), d("BackInOut", function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2) })),
                    m = h("easing.SlowMo", function(t, e, i) { e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0 }, !0),
                    g = m.prototype = new t;
                return g.constructor = m, g.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
                    return new m(t, e, i) }, e = h("easing.SteppedEase", function(t) { t = t || 1, this._p1 = 1 / t, this._p2 = t + 1 }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
                    return t < 0 ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1 }, g.config = e.config = function(t) {
                    return new e(t) }, i = h("easing.RoughEase", function(e) { e = e || {};
                    for (var i, n, r, a, o, s, h = e.taper || "none", l = [], c = 0, u = 0 | (e.points || 20), d = u, f = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --d > -1;) i = f ? Math.random() : 1 / u * d, n = g ? g.getRatio(i) : i, "none" === h ? r = v : "out" === h ? (a = 1 - i, r = a * a * v) : "in" === h ? r = i * i * v : i < .5 ? (a = 2 * i, r = a * a * .5 * v) : (a = 2 * (1 - i), r = a * a * .5 * v), f ? n += Math.random() * r - .5 * r : d % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : n < 0 && (n = 0)), l[c++] = { x: i, y: n };
                    for (l.sort(function(t, e) {
                            return t.x - e.x }), s = new p(1, 1, null), d = u; --d > -1;) o = l[d], s = new p(o.x, o.y, s);
                    this._prev = new p(0, 0, 0 !== s.t ? s : s.next) }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev } else
                        for (; e.prev && t <= e.t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c }, g.config = function(t) {
                    return new i(t) }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375 }), l("BounceIn", function(t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375) }), l("BounceInOut", function(t) {
                    var e = t < .5;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5 })), u("Circ", l("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t) }), l("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1) }), l("CircInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1) })), n = function(e, i, n) {
                    var r = h("easing." + e, function(t, e) { this._p1 = t || 1, this._p2 = e || n, this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0) }, !0),
                        a = r.prototype = new t;
                    return a.constructor = r, a.getRatio = i, a.config = function(t, e) {
                        return new r(t, e) }, r }, u("Elastic", n("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * o / this._p2) + 1 }, .3), n("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * o / this._p2)) }, .3), n("ElasticInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * o / this._p2) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * o / this._p2) * .5 + 1 }, .45)), u("Expo", l("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t) }), l("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001 }), l("ExpoInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1))) })), u("Sine", l("SineOut", function(t) {
                    return Math.sin(t * s) }), l("SineIn", function(t) {
                    return -Math.cos(t * s) + 1 }), l("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1) })), h("easing.EaseLookup", { find: function(e) {
                        return t.map[e] } }, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), f }, !0)
    }),
    function(t) {
        "use strict";
        var e = t.GreenSockGlobals || t;
        if (!e.TweenLite) {
            var i, n, r, a, o, s = function(t) {
                    var i, n = t.split("."),
                        r = e;
                    for (i = 0; i < n.length; i++) r[n[i]] = r = r[n[i]] || {};
                    return r },
                h = s("com.greensock"),
                l = 1e-10,
                c = [].slice,
                u = function() {},
                p = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e } }(),
                d = {},
                f = function(i, n, r, a) { this.sc = d[i] ? d[i].sc : [], d[i] = this, this.gsClass = null, this.func = r;
                    var o = [];
                    this.check = function(h) {
                        for (var l, c, u, p, m = n.length, g = m; --m > -1;)(l = d[n[m]] || new f(n[m], [])).gsClass ? (o[m] = l.gsClass, g--) : h && l.sc.push(this);
                        if (0 === g && r)
                            for (c = ("com.greensock." + i).split("."), u = c.pop(), p = s(c.join("."))[u] = this.gsClass = r.apply(r, o), a && (e[u] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function() {
                                    return p }) : "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; m < this.sc.length; m++) this.sc[m].check() }, this.check(!0) },
                m = t._gsDefine = function(t, e, i, n) {
                    return new f(t, e, i, n) },
                g = h._class = function(t, e, i) {
                    return e = e || function() {}, m(t, [], function() {
                        return e }, i), e };
            m.globals = e;
            var v = [0, 0, 1, 1],
                y = [],
                _ = g("easing.Ease", function(t, e, i, n) { this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? v.concat(e) : v }, !0),
                x = _.map = {},
                b = _.register = function(t, e, i, n) {
                    for (var r, a, o, s, l = e.split(","), c = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
                        for (a = l[c], r = n ? g("easing." + a, null, !0) : h.easing[a] || {}, o = u.length; --o > -1;) s = u[o], x[a + "." + s] = x[s + a] = r[s] = t.getRatio ? t : t[s] || new t };
            for (r = _.prototype, r._calcEnd = !1, r.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2 }, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = i.length; --n > -1;) r = i[n] + ",Power" + n, b(new _(null, null, 1, n), r, "easeOut", !0), b(new _(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), b(new _(null, null, 3, n), r, "easeInOut");
            x.linear = h.easing.Linear.easeIn, x.swing = h.easing.Quad.easeInOut;
            var w = g("events.EventDispatcher", function(t) { this._listeners = {}, this._eventTarget = t || this });
            r = w.prototype, r.addEventListener = function(t, e, i, n, r) { r = r || 0;
                var s, h, l = this._listeners[t],
                    c = 0;
                for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) s = l[h], s.c === e && s.s === i ? l.splice(h, 1) : 0 === c && s.pr < r && (c = h + 1);
                l.splice(c, 0, { c: e, s: i, up: n, pr: r }), this === a && !o && a.wake() }, r.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1) }, r.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n.up ? n.c.call(n.s || i, { type: t, target: i }) : n.c.call(n.s || i) };
            var M = t.requestAnimationFrame,
                T = t.cancelAnimationFrame,
                E = Date.now || function() {
                    return (new Date).getTime() },
                S = E();
            for (i = ["ms", "moz", "webkit", "o"], n = i.length; --n > -1 && !M;) M = t[i[n] + "RequestAnimationFrame"], T = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"];
            g("Ticker", function(t, e) {
                var i, n, r, s, h, l = this,
                    c = E(),
                    p = e !== !1 && M,
                    d = function(t) { S = E(), l.time = (S - c) / 1e3;
                        var e, a = l.time - h;
                        (!i || a > 0 || t === !0) && (l.frame++, h += a + (a >= s ? .004 : s - a), e = !0), t !== !0 && (r = n(d)), e && l.dispatchEvent("tick") };
                w.call(l), l.time = l.frame = 0, l.tick = function() { d(!0) }, l.sleep = function() { null != r && (p && T ? T(r) : clearTimeout(r), n = u, r = null, l === a && (o = !1)) }, l.wake = function() { null !== r && l.sleep(), n = 0 === i ? u : p && M ? M : function(t) {
                        return setTimeout(t, 1e3 * (h - l.time) + 1 | 0) }, l === a && (o = !0), d(2) }, l.fps = function(t) {
                    return arguments.length ? (i = t, s = 1 / (i || 60), h = this.time + s, l.wake(), void 0) : i }, l.useRAF = function(t) {
                    return arguments.length ? (l.sleep(), p = t, l.fps(i), void 0) : p }, l.fps(t), setTimeout(function() { p && (!r || l.frame < 5) && l.useRAF(!1) }, 1500) }), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
            var A = g("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, G) { o || a.wake();
                    var i = this.vars.useFrames ? B : G;
                    i.add(this, i._time), this.vars.paused && this.paused(!0) } });
            a = A.ticker = new h.Ticker, r = A.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
            var R = function() { E() - S > 2e3 && a.wake(), setTimeout(R, 2e3) };
            R(), r.play = function(t, e) {
                return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1) }, r.pause = function(t, e) {
                return arguments.length && this.seek(t, e), this.paused(!0) }, r.resume = function(t, e) {
                return arguments.length && this.seek(t, e), this.paused(!1) }, r.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1) }, r.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0) }, r.reverse = function(t, e) {
                return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1) }, r.render = function(t, e, i) {}, r.invalidate = function() {
                return this }, r.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale }, r._enabled = function(t, e) {
                return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1 }, r._kill = function(t, e) {
                return this._enabled(!1, !1) }, r.kill = function(t, e) {
                return this._kill(t, e), this }, r._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this }, r._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i }, r.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = p(i) && i.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e) }
                return this }, r.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay }, r.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration) }, r.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration }, r.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time }, r.totalTime = function(t, e, i) {
                if (o || a.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) { this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && this.render(t, e, !1) }
                return this }, r.progress = r.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration() }, r.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime }, r.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || l, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t }
                return this._timeScale = t, this._uncache(!1) }, r.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._totalTime, !0)), this) : this._reversed }, r.paused = function(t) {
                if (!arguments.length) return this._paused;
                if (t != this._paused && this._timeline) {!o && !t && a.wake();
                    var e = this._timeline,
                        i = e.rawTime(),
                        n = i - this._pauseTime;!t && e.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== n && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0) }
                return this._gc && !t && this._enabled(!0, !1), this };
            var L = g("core.SimpleTimeline", function(t) { A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0 });
            r = L.prototype = new A, r.constructor = L, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function(t, e, i, n) {
                var r, a;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (a = t._startTime; r && r._startTime > a;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._timeline && this._uncache(!0), this }, r._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this }, r.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n }, r.rawTime = function() {
                return o || a.wake(), this._totalTime };
            var P = g("TweenLite", function(e, i, n) {
                    if (A.call(this, i, n), this.render = P.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : P.selector(e) || e;
                    var r, a, o, s = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        h = this.vars.overwrite;
                    if (this._overwrite = h = null == h ? z[P.defaultOverwrite] : "number" == typeof h ? h >> 0 : z[h], (s || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                        for (this._targets = o = c.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) a = o[r], a ? "string" != typeof a ? a.length && a !== t && a[0] && (a[0] === t || a[0].nodeType && a[0].style && !a.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(c.call(a, 0))) : (this._siblings[r] = k(a, this, !1), 1 === h && this._siblings[r].length > 1 && H(a, this, null, 1, this._siblings[r])) : (a = o[r--] = P.selector(a), "string" == typeof a && o.splice(r + 1, 1)) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = k(e, this, !1), 1 === h && this._siblings.length > 1 && H(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0) }, !0),
                C = function(e) {
                    return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType) },
                I = function(t, e) {
                    var i, n = {};
                    for (i in t) !F[i] && (!(i in e) || "x" === i || "y" === i || "width" === i || "height" === i || "className" === i || "border" === i) && (!D[i] || D[i] && D[i]._autoCSS) && (n[i] = t[i], delete t[i]);
                    t.css = n };
            r = P.prototype = new A, r.constructor = P, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = !1, P.version = "1.11.1", P.defaultEase = r._ease = new _(null, null, 1, 1), P.defaultOverwrite = "auto", P.ticker = a, P.autoSleep = !0, P.selector = t.$ || t.jQuery || function(e) {
                return t.$ ? (P.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e };
            var O = P._internals = { isArray: p, isSelector: C },
                D = P._plugins = {},
                U = P._tweenLookup = {},
                N = 0,
                F = O.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1 },
                z = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0 },
                B = A._rootFramesTimeline = new L,
                G = A._rootTimeline = new L;
            G._startTime = a.time, B._startTime = a.frame, G._active = B._active = !0, A._updateRoot = function() {
                if (G.render((a.time - G._startTime) * G._timeScale, !1, !1), B.render((a.frame - B._startTime) * B._timeScale, !1, !1), !(a.frame % 120)) {
                    var t, e, i;
                    for (i in U) {
                        for (e = U[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete U[i] }
                    if (i = G._first, (!i || i._paused) && P.autoSleep && !B._first && 1 === a._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || a.sleep() } } }, a.addEventListener("tick", A._updateRoot);
            var k = function(t, e, i) {
                    var n, r, a = t._gsTweenID;
                    if (U[a || (t._gsTweenID = a = "t" + N++)] || (U[a] = { target: t, tweens: [] }), e && (n = U[a].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return U[a].tweens },
                H = function(t, e, i, n, r) {
                    var a, o, s, h;
                    if (1 === n || n >= 4) {
                        for (h = r.length, a = 0; a < h; a++)
                            if ((s = r[a]) !== e) s._gc || s._enabled(!1, !1) && (o = !0);
                            else if (5 === n) break;
                        return o }
                    var c, u = e._startTime + l,
                        p = [],
                        d = 0,
                        f = 0 === e._duration;
                    for (a = r.length; --a > -1;)(s = r[a]) !== e && !s._gc && !s._paused && (s._timeline !== e._timeline ? (c = c || j(e, 0, f), 0 === j(s, c, f) && (p[d++] = s)) : s._startTime <= u && s._startTime + s.totalDuration() / s._timeScale + l > u && ((f || !s._initted) && u - s._startTime <= 2e-10 || (p[d++] = s)));
                    for (a = d; --a > -1;) s = p[a], 2 === n && s._kill(i, t) && (o = !0), (2 !== n || !s._firstPT && s._initted) && s._enabled(!1, !1) && (o = !0);
                    return o
                },
                j = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, a = t._startTime; n._timeline;) {
                        if (a += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline }
                    return a /= r, a > e ? a - e : i && a === e || !t._initted && a - e < 2 * l ? l : (a += t.totalDuration() / t._timeScale / r) > e + l ? 0 : a - e - l };
            r._init = function() {
                var t, e, i, n, r = this.vars,
                    a = this._overwrittenProps,
                    o = this._duration,
                    s = r.immediateRender,
                    h = r.ease;
                if (r.startAt) {
                    if (this._startAt && this._startAt.render(-1, !0), r.startAt.overwrite = 0, r.startAt.immediateRender = !0, this._startAt = P.to(this.target, 0, r.startAt), s)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== o) return } else if (r.runBackwards && 0 !== o)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
                    else { i = {};
                        for (n in r) F[n] && "autoCSS" !== n || (i[n] = r[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", this._startAt = P.to(this.target, 0, i), r.immediateRender) {
                            if (0 === this._time) return } else this._startAt.render(-1, !0) }
                if (h ? h instanceof _ ? this._ease = r.easeParams instanceof Array ? h.config.apply(h, r.easeParams) : h : this._ease = "function" == typeof h ? new _(h, r.easeParams) : x[h] || P.defaultEase : this._ease = P.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (e && P._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = r.onUpdate, this._initted = !0 }, r._initProps = function(e, i, n, r) {
                var a, o, s, h, l, c;
                if (null == e) return !1;
                this.vars.css || e.style && e !== t && e.nodeType && D.css && this.vars.autoCSS !== !1 && I(this.vars, e);
                for (a in this.vars) {
                    if (c = this.vars[a], F[a]) c && (c instanceof Array || c.push && p(c)) && c.join("").indexOf("{self}") !== -1 && (this.vars[a] = c = this._swapSelfInParams(c, this));
                    else if (D[a] && (h = new D[a])._onInitTween(e, this.vars[a], this)) {
                        for (this._firstPT = l = { _next: this._firstPT, t: h, p: "setRatio", s: 0, c: 1, f: !0, n: a, pg: !0, pr: h._priority }, o = h._overwriteProps.length; --o > -1;) i[h._overwriteProps[o]] = this._firstPT;
                        (h._priority || h._onInitAllProps) && (s = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0) } else this._firstPT = i[a] = l = { _next: this._firstPT, t: e, p: a, f: "function" == typeof e[a], n: a, pg: !1, pr: 0 }, l.s = l.f ? e[a.indexOf("set") || "function" != typeof e["get" + a.substr(3)] ? a : "get" + a.substr(3)]() : parseFloat(e[a]), l.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - l.s || 0;
                    l && l._next && (l._next._prev = l) }
                return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && H(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : s }, r.render = function(t, e, i) {
                var n, r, a, o, s = this._time,
                    h = this._duration;
                if (t >= h) this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete"), 0 === h && (o = this._rawPrevTime, (0 === t || o < 0 || o === l) && o !== t && (i = !0, o > l && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t ? t : l);
                else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== s || 0 === h && this._rawPrevTime > l) && (r = "onReverseComplete", n = this._reversed), t < 0 ? (this._active = !1, 0 === h && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = o = !e || t ? t : l)) : this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / h,
                        u = this._easeType,
                        p = this._easePower;
                    (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : t / h < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2 } else this.ratio = this._ease.getRatio(t / h);
                if (this._time !== s || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / h) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) }
                    for (this._active || !this._paused && this._time !== s && t >= 0 && (this._active = !0), 0 === s && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), a = this._firstPT; a;) a.f ? a.t[a.p](a.c * this.ratio + a.s) : a.t[a.p] = a.c * this.ratio + a.s, a = a._next;
                    this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (!i || 0 !== this._time || 0 !== s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), r && (this._gc || (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y), 0 === h && this._rawPrevTime === l && o !== l && (this._rawPrevTime = 0))) } }, r._kill = function(t, e) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : P.selector(e) || e;
                var i, n, r, a, o, s, h, l;
                if ((p(e) || C(e)) && "number" != typeof e[0])
                    for (i = e.length; --i > -1;) this._kill(t, e[i]) && (s = !0);
                else {
                    if (this._targets) {
                        for (i = this._targets.length; --i > -1;)
                            if (e === this._targets[i]) { o = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                                break } } else {
                        if (e !== this.target) return !1;
                        o = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all" }
                    if (o) { h = t || o, l = t !== n && "all" !== n && t !== o && ("object" != typeof t || !t._tempKill);
                        for (r in h)(a = o[r]) && (a.pg && a.t._kill(h) && (s = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[r]), l && (n[r] = 1);!this._firstPT && this._initted && this._enabled(!1, !1) } }
                return s }, r.invalidate = function() {
                return this._notifyPluginsOfEnabled && P._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this }, r._enabled = function(t, e) {
                if (o || a.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = k(n[i], this, !0);
                    else this._siblings = k(this.target, this, !0) }
                return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && P._onPluginEvent(t ? "_onEnable" : "_onDisable", this) }, P.to = function(t, e, i) {
                return new P(t, e, i) }, P.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new P(t, e, i) }, P.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new P(t, e, n) }, P.delayedCall = function(t, e, i, n, r) {
                return new P(e, 0, { delay: t, onComplete: e, onCompleteParams: i, onCompleteScope: n, onReverseComplete: e, onReverseCompleteParams: i, onReverseCompleteScope: n, immediateRender: !1, useFrames: r, overwrite: 0 }) }, P.set = function(t, e) {
                return new P(t, 0, e) }, P.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : P.selector(t) || t;
                var i, n, r, a;
                if ((p(t) || C(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(P.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (a = n[i], r = i; --r > -1;) a === n[r] && n.splice(i, 1) } else
                    for (n = k(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n }, P.killTweensOf = P.killDelayedCallsTo = function(t, e, i) { "object" == typeof e && (i = e, e = !1);
                for (var n = P.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t) };
            var V = g("plugins.TweenPlugin", function(t, e) { this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = V.prototype }, !0);
            if (r = V.prototype, V.version = "1.10.1", V.API = 2, r._firstPT = null, r._addTween = function(t, e, i, n, r, a) {
                    var o, s;
                    if (null != n && (o = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)))) return this._firstPT = s = { _next: this._firstPT, t: t, p: e, s: i, c: o, f: "function" == typeof t[e], n: r || e, r: a }, s._next && (s._next._prev = s), s }, r.setRatio = function(t) {
                    for (var e, i = this._firstPT, n = 1e-6; i;) e = i.c * t + i.s, i.r ? e = e + (e > 0 ? .5 : -.5) | 0 : e < n && e > -n && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next }, r._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1 }, r._roundProps = function(t, e) {
                    for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next }, P._onPluginEvent = function(t, e) {
                    var i, n, r, a, o, s = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; s;) {
                            for (o = s._next, n = r; n && n.pr > s.pr;) n = n._next;
                            (s._prev = n ? n._prev : a) ? s._prev._next = s: r = s, (s._next = n) ? n._prev = s : a = s, s = o }
                        s = e._firstPT = r }
                    for (; s;) s.pg && "function" == typeof s.t[t] && s.t[t]() && (i = !0), s = s._next;
                    return i }, V.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === V.API && (D[(new t[e])._propName] = t[e]);
                    return !0 }, m.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        a = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" },
                        o = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() { V.call(this, i, n), this._overwriteProps = r || [] }, t.global === !0),
                        s = o.prototype = new V(i);
                    s.constructor = o, o.API = t.API;
                    for (e in a) "function" == typeof t[e] && (s[a[e]] = t[e]);
                    return o.version = t.version, V.activate([o]), o }, i = t._gsQueue, i) {
                for (n = 0; n < i.length; n++) i[n]();
                for (r in d) d[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r) }
            o = !1
        }
    }(window), define("tweenmax", function(t) {
        return function() {
            var e;
            return e || t.TweenMax } }(this)), define("text!shader/vertexShader.vert", [], function() {
        return "  varying vec2 vUvCoords;\n\n  varying vec2 coord;\n\n  uniform sampler2D bufferTexture;\n\n  // varying vec3 vPosition;\n\n\n  void main() {\n    vUvCoords = uv;\n\n    coord = uv;\n\n    vec3 newPosition = position;\n\n    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);\n    \n    gl_Position = projectionMatrix * mvPosition;\n  }" }), define("text!shader/vertexShader2.vert", [], function() {
        return "  varying vec2 vUvCoords;\n\n  precision highp float;\n\n  attribute vec2 vertex;\n  uniform vec2 topLeft;\n  uniform vec2 bottomRight;\n  uniform vec2 containerRatio;\n  varying vec2 ripplesCoord;\n  varying vec2 backgroundCoord;\n  void main() {\n\n    vUvCoords = uv;\n    vec3 newPosition = position;\n\n    // backgroundCoord = mix(topLeft, bottomRight, vUvCoords * 0.5 + 0.5);\n    backgroundCoord = vec2(vUvCoords.x, vUvCoords.y);\n    // ripplesCoord = vec2(vUvCoords.x, -vUvCoords.y) * containerRatio * 0.5 + 0.5;\n    ripplesCoord = vUvCoords;\n    // gl_Position = vec4(vUvCoords.x, -vUvCoords.y, 0.0, 1.0);\n\n    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);\n    \n    gl_Position = projectionMatrix * mvPosition;\n  }\n" }), define("text!shader/vertexShader3.vert", [], function() {
        return "    varying vec2 vUvCoords;\n\n    varying vec2 coord;\n\n    uniform sampler2D bufferTexture;\n\n    // varying vec3 vPosition;\n\n\n    void main() {\n      vUvCoords = uv;\n\n      coord = uv;\n\n      vec3 newPosition = position;\n\n      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);\n      \n      gl_Position = projectionMatrix * mvPosition;\n    }" }), define("text!shader/fragmentShader.frag", [], function() {
        return "varying vec2 vUvCoords;\n\n\nconst float PI = 3.141592653589793;\nuniform vec2 center;\nuniform float radius;\nuniform float strength;\n\nuniform float time;\n\nvarying vec2 coord;\n\nuniform sampler2D bufferTexture;//Our input texture\n\nuniform vec2 position1;\nuniform vec2 position2;\nuniform float position1Size;\nuniform float position2Size;\n\nvoid main() {\n\n     vec4 info = texture2D(bufferTexture, vUvCoords);\n\n     vec2 center2 = center + vec2((cos(time*0.01)-0.5) * 0.05, (sin(time*0.01)-0.5) * 0.05);\n\n     float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius/1.5);\n     drop = 0.5 - cos(drop * PI) * 0.5;\n\n     info.r += drop * strength;\n     // info.a = 1.0;\n\n     float dropStrength = strength;\n\n\n     float drop2 = max(0.0, 1.0 - length(position1 * 0.5 + 0.5 - coord) / position1Size/1.5);\n     drop2 = 0.5 - cos(drop2 * PI) * 0.5;\n\n     info.r += drop2 * dropStrength;\n     // info.a = 1.0;\n\n\n     float drop3 = max(0.0, 1.0 - length(position2 * 0.5 + 0.5 - coord) / position2Size/1.5);\n     drop3 = 0.5 - cos(drop3 * PI + position2Size) * 0.5;\n\n     info.r += drop3 * dropStrength;\n\n\n     gl_FragColor = info;\n}\n" }), define("text!shader/fragmentShader2.frag", [], function() {
        return "precision highp float;\n\nuniform sampler2D samplerBackground;\nuniform sampler2D samplerBackground2;\nuniform sampler2D samplerRipples;\nuniform vec2 delta;\n\nuniform float perturbance;\nvarying vec2 ripplesCoord;\nvarying vec2 backgroundCoord;\n\nuniform float time;\n\nuniform float tweenOpacity;\n\nvoid main() {\n  float multi = 400.0;\n\n  float height = texture2D(samplerRipples, ripplesCoord).r*2.0;\n  float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x*multi*0.5, ripplesCoord.y)).r;\n  float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y*multi*0.5)).r;\n  vec3 dx = vec3(delta.x*multi*2.0, heightX - height, 0.0);\n  vec3 dy = vec3(0.0, heightY - height, delta.y*multi*2.0);\n  vec2 offset = -normalize(cross(dy, dx)).xz-0.5;\n  float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 10.0) * 0.0;\n  float shadow = pow(min(dot(-offset, normalize(vec2(0.6, 1.0))), 1.0), 10.0) * 0.0;\n\n  // gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset) ;\n\n  vec4 color1 = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular + shadow;\n  vec4 color2 = texture2D(samplerBackground2, backgroundCoord + offset * perturbance) + specular + shadow;\n\n  color1.a = tweenOpacity;\n  color2.a = (1.0 - tweenOpacity);\n\n  gl_FragColor = vec4(color1.r*color1.a+color2.r*color2.a, color1.g*color1.a+color2.g*color2.a, color1.b*color1.a+color2.b*color2.a, 1.0);\n  // gl_FragColor = color2;\n\n\n  // vec4 color = texture2D(samplerRipples, ripplesCoord);\n  // color.a += 1.0;\n  // // color.r *= 5.5;\n\n  // gl_FragColor = color;\n}\n" }), define("text!shader/fragmentShader3.frag", [], function() {
        return "varying vec2 vUvCoords;\n\n\nconst float PI = 3.141592653589793;\nuniform vec2 center;\nuniform float radius;\nuniform float strength;\n\nvarying vec2 coord;\n\nuniform sampler2D bufferTexture;//Our input texture\nvoid main() {\n\n     vec4 info = texture2D(bufferTexture, vUvCoords);\n\n     // float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);\n     // drop = 0.5 - cos(drop * PI) * 0.5;\n\n     // info.r += drop * strength;\n     // // info.a = 1.0;\n     // // info.g = 1.0-info.r;\n     // // info.b = 1.0;\n     info.r -= 0.006;\n\n     gl_FragColor = info;\n}" }), define("text!shader/fragmentShaderS.frag", [], function() {
        return "varying vec2 vUvCoords;\n\n\nconst float PI = 3.141592653589793;\nuniform vec2 center;\nuniform float radius;\nuniform float strength;\n\nuniform float time;\n\nvarying vec2 coord;\n\nvoid main() {\n\n     vec4 info = vec4(0.0);\n\n     vec2 center2 = center + vec2((cos(time*0.01)-0.5) * 0.05, (sin(time*0.01)-0.5) * 0.05);\n\n     float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);\n     drop = 0.5 - cos(drop * PI) * 0.5;\n\n     info.r += drop * strength;\n     info.a = info.r;\n     info.r *= 8.5;\n\n\n     // info.g = 1.0-info.r;\n     // info.b = 1.0;\n     gl_FragColor = info;\n}\n" }), window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) { window.setTimeout(t, 1e3 / 60) } }(), require.config({ paths: { three: "libs/three", detector: "libs/Detector", tweenmax: "libs/TweenMax" }, shim: { tweenmax: { exports: "TweenMax" }, three: { exports: "THREE" }, detector: { exports: "Detector" } }, waitSeconds: 0 }), require(["text", "three", "detector", "tweenmax", "text!shader/vertexShader.vert", "text!shader/vertexShader2.vert", "text!shader/vertexShader3.vert", "text!shader/fragmentShader.frag", "text!shader/fragmentShader2.frag", "text!shader/fragmentShader3.frag", "text!shader/fragmentShaderS.frag"], function(t, e, i, n, r, a, o, s, h, l, c) {
        var u = { scene: null, camera: null, renderer: null, bufferScene: null, textureA: null, textureB: null, bufferMaterial: null, plane: null, bufferObject: null, finalMaterial: null, quad: null, drawScene: null, drawTexture: null, drawPlane: null, drawMaterial: null, wWidth: 0, wHeight: 0, mouseX: 0, mouseY: 0, mouseDown: !1, images: ["logo-inverted.png", "logo-inverted.png"], textures: [], tweenObjO: null, time: 0, changeInterval: null, hasStarted: !1, loadCounter: 0, currentIndex: 1, pixelRatio: 1, bgRatio: 1.7777777, loadTextures: function() {
                if (!i.webgl) {
                    var t = document.createElement("div");
                    t.className = "placholder", document.getElementById("container").appendChild(t) }
                console.log("Bureau COOL"), console.log("Moniker"), this.textureLoader = new e.TextureLoader, this.textureLoader.load(this.images[this.loadCounter], this.onTextureLoaded.bind(this)) }, onTextureLoaded: function(t) { this.hasStarted || (this.hasStarted = !0, this.finalMaterial.uniforms.samplerBackground.value = t), 1 === this.loadCounter && (this.finalMaterial.uniforms.samplerBackground2.value = t, this.start()), this.textures.push(t), this.loadCounter++, this.loadCounter < this.images.length && this.textureLoader.load(this.images[this.loadCounter], this.onTextureLoaded.bind(this)) }, init: function() { this.container = document.getElementById("container"), this.width = window.innerWidth, this.height = this.width * this.bgRatio, this.container.style.width = this.width + "px", this.container.style.width = this.height + "px", this.tweenObjO = { opacity: 1 }, this.setChangeInterval(), this.loadTextures(), this.scene_setup(), this.buffer_texture_setup(), this.draw_scene_setup(), this.addEvents(), this.onResize() }, setChangeInterval: function() { this.changeInterval = setInterval(this.onChangeInterval.bind(this), 4e3) }, onChangeInterval: function() { n.killTweensOf(this.tweenObjO), n.to(this.tweenObjO, 1, { opacity: 0, ease: "Sine.easeInOut", onComplete: this.onFadeComplete, onCompleteScope: this }) }, onFadeComplete: function() { this.setNextImage(), this.finalMaterial.uniforms.samplerBackground.value = this.finalMaterial.uniforms.samplerBackground2.value, this.finalMaterial.uniforms.samplerBackground2.value = this.textures[this.currentIndex], this.tweenObjO.opacity = 1 }, setNextImage: function() { this.currentIndex + 1 < this.textures.length ? this.currentIndex += 1 : this.currentIndex = 0 }, start: function() { this.render() }, addEvents: function() { window.onmousemove = this.onMouseMove.bind(this), window.onresize = this.onResize.bind(this) }, onResize: function() { this.wWidth = window.innerWidth, this.wHeight = window.innerHeight, this.width = window.innerWidth, this.height = this.width / this.bgRatio, this.container.style.width = this.width + "px", this.container.style.height = this.height + "px", this.container.style.top = (this.wHeight - this.height) / 2 + "px", this.renderer.setSize(this.width, this.height) }, onMouseMove: function(t) { this.mouseX = t.offsetX, this.mouseY = this.height - t.offsetY, this.bufferMaterial.uniforms.center.value = [this.mouseX / this.width * 2 - 1, this.mouseY / this.height * 2 - 1] }, scene_setup: function() { this.scene = new e.Scene;
                var t = window.innerWidth,
                    i = window.innerHeight;
                this.camera = new e.OrthographicCamera(t / -2, t / 2, i / 2, i / -2, 1, 1e3), this.camera.position.z = 2, window.devicePixelRatio > 1 && (this.pixelRatio = 2), this.renderer = new e.WebGLRenderer({ alpha: !0 }), this.renderer.setPixelRatio(this.pixelRatio), this.renderer.setSize(window.innerWidth, window.innerHeight), this.container.appendChild(this.renderer.domElement) }, buffer_texture_setup: function() { this.bufferScene = new e.Scene, this.textureA = new e.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: e.LinearFilter, magFilter: e.NearestFilterm, format: e.RGBAFormat }), this.textureB = new e.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: e.LinearFilter, magFilter: e.NearestFilter, format: e.RGBAFormat }), this.bufferMaterial = new e.ShaderMaterial({ uniforms: { bufferTexture: { type: "t", value: this.textureA.texture }, res: { type: "v2", value: new e.Vector2(window.innerWidth, window.innerHeight) }, smokeSource: { type: "v3", value: new e.Vector3(0, 0, 0) }, center: { type: "2f", value: [-2, -2] }, radius: { type: "f", value: .05 }, strength: { type: "f", value: .1 }, time: { type: "f", value: this.time }, position1: { type: "2f", value: [Math.random() - .5, 0] }, position2: { type: "2f", value: [Math.random() - .5, 0] }, position1Speed: { type: "f", value: .01 * (.5 * Math.random() + .5) }, position2Speed: { type: "f", value: .01 * (.5 * Math.random() + .5) }, position1Size: { type: "f", value: .05 * (.5 * Math.random() + .5) }, position2Size: { type: "f", value: .05 * (.5 * Math.random() + .5) } }, vertexShader: r, fragmentShader: s, transparent: !1 }), this.startWidth = window.innerWidth, this.startHeight = window.innerHeight, this.plane = new e.PlaneBufferGeometry(this.startWidth, this.startHeight), this.bufferObject = new e.Mesh(this.plane, this.bufferMaterial), this.bufferScene.add(this.bufferObject), this.resolution = 512, this.textureDelta = new Float32Array([1 / this.resolution * .1, 1 / this.resolution * .1]);
                var t = this.renderer.domElement.width,
                    i = this.renderer.domElement.height;
                this.perturbance = .03, this.topLeft = new Float32Array([0 / t, 0 / i]), this.bottomRight = new Float32Array([this.topLeft[0] + t / t, this.topLeft[1] + i / i]);
                var n = Math.max(this.renderer.domElement.width, this.renderer.domElement.height);
                this.containerRatio = new Float32Array([this.renderer.domElement.width / n, this.renderer.domElement.height / n]), this.finalMaterial = new e.ShaderMaterial({ uniforms: { perturbance: { type: "2f", value: this.perturbance }, topLeft: { type: "2f", value: this.topLeft }, bottomRight: { type: "2f", value: this.bottomRight }, containerRatio: { type: "2f", value: this.containerRatio }, samplerRipples: { type: "t", value: this.textureB.texture }, samplerBackground: { type: "t", value: this.bgTexture }, samplerBackground2: { type: "t", value: this.bgTexture }, delta: { type: "2f", value: this.textureDelta }, time: { type: "f", value: 0 }, tweenOpacity: { type: "f", value: this.tweenObjO.opacity } }, vertexShader: a, fragmentShader: h }), this.quad = new e.Mesh(this.plane, this.finalMaterial), this.scene.add(this.quad) }, draw_scene_setup: function() { this.drawScene = new e.Scene, this.drawTexture = new e.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: e.LinearFilter, magFilter: e.NearestFilterm, format: e.RGBAFormat }), this.drawMaterial = new e.ShaderMaterial({ uniforms: { bufferTexture: { type: "t", value: this.textureB.texture }, res: { type: "v2", value: new e.Vector2(window.innerWidth, window.innerHeight) } }, vertexShader: o, fragmentShader: l }), this.drawPlane = new e.PlaneBufferGeometry(window.innerWidth, window.innerHeight), this.drawbject = new e.Mesh(this.drawPlane, this.drawMaterial), this.drawScene.add(this.drawbject) }, render: function() { this.bufferMaterial.uniforms.position1.value[1] > -1 ? this.bufferMaterial.uniforms.position1.value[1] -= this.bufferMaterial.uniforms.position1Speed.value : (this.bufferMaterial.uniforms.position1.value[1] = 1 + (Math.random() - .5), this.bufferMaterial.uniforms.position1.value[0] += .5 * (Math.random() - .5), this.bufferMaterial.uniforms.position1Speed.value = .005 * (.5 * Math.random() + .5), this.bufferMaterial.uniforms.position1Size.value = .05 * (.5 * Math.random() + .5)), this.bufferMaterial.uniforms.position2.value[1] > -1 ? this.bufferMaterial.uniforms.position2.value[1] -= this.bufferMaterial.uniforms.position2Speed.value : (this.bufferMaterial.uniforms.position2.value[1] = 1 + (Math.random() - .5), this.bufferMaterial.uniforms.position2.value[0] += .5 * (Math.random() - .5), this.bufferMaterial.uniforms.position2Speed.value = .005 * (.5 * Math.random() + .5), this.bufferMaterial.uniforms.position2Size.value = .05 * (.5 * Math.random() + .5)), this.time++, requestAnimationFrame(this.render.bind(this)), this.renderer.render(this.bufferScene, this.camera, this.textureB, !0);
                var t = this.textureA;
                this.textureA = this.textureB, this.textureB = t, this.bufferMaterial.uniforms.bufferTexture.value = this.drawTexture.texture, this.bufferMaterial.uniforms.time.value = this.time, this.renderer.render(this.drawScene, this.camera, this.drawTexture, !0), this.finalMaterial.uniforms.tweenOpacity.value = this.tweenObjO.opacity, this.renderer.render(this.scene, this.camera) } };
        u.init() }), define("main", function() {});
