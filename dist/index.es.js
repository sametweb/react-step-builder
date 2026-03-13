import * as b from "react";
import ke from "react";
var re = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function vr() {
  if (we) return $;
  we = 1;
  var v = ke, p = Symbol.for("react.element"), h = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, O = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(y, c, _) {
    var s, g = {}, T = null, j = null;
    _ !== void 0 && (T = "" + _), c.key !== void 0 && (T = "" + c.key), c.ref !== void 0 && (j = c.ref);
    for (s in c) d.call(c, s) && !C.hasOwnProperty(s) && (g[s] = c[s]);
    if (y && y.defaultProps) for (s in c = y.defaultProps, c) g[s] === void 0 && (g[s] = c[s]);
    return { $$typeof: p, type: y, key: T, ref: j, props: g, _owner: O.current };
  }
  return $.Fragment = h, $.jsx = x, $.jsxs = x, $;
}
var N = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var je;
function pr() {
  return je || (je = 1, process.env.NODE_ENV !== "production" && function() {
    var v = ke, p = Symbol.for("react.element"), h = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), y = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), j = Symbol.for("react.offscreen"), V = Symbol.iterator, J = "@@iterator";
    function P(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = V && e[V] || e[J];
      return typeof r == "function" ? r : null;
    }
    var w = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Fe("error", e, t);
      }
    }
    function Fe(e, r, t) {
      {
        var n = w.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var De = !1, Ae = !1, Ie = !1, We = !1, Ye = !1, ae;
    ae = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === d || e === C || Ye || e === O || e === _ || e === s || We || e === j || De || Ae || Ie || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === g || e.$$typeof === x || e.$$typeof === y || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function Ne(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case d:
          return "Fragment";
        case h:
          return "Portal";
        case C:
          return "Profiler";
        case O:
          return "StrictMode";
        case _:
          return "Suspense";
        case s:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var r = e;
            return oe(r) + ".Consumer";
          case x:
            var t = e;
            return oe(t._context) + ".Provider";
          case c:
            return Ne(e, e.render, "ForwardRef");
          case g:
            var n = e.displayName || null;
            return n !== null ? n : k(e.type) || "Memo";
          case T: {
            var i = e, u = i._payload, o = i._init;
            try {
              return k(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, W = 0, ie, se, ue, ce, fe, le, de;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function Le() {
      {
        if (W === 0) {
          ie = console.log, se = console.info, ue = console.warn, ce = console.error, fe = console.group, le = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        W++;
      }
    }
    function Ve() {
      {
        if (W--, W === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: ie
            }),
            info: F({}, e, {
              value: se
            }),
            warn: F({}, e, {
              value: ue
            }),
            error: F({}, e, {
              value: ce
            }),
            group: F({}, e, {
              value: fe
            }),
            groupCollapsed: F({}, e, {
              value: le
            }),
            groupEnd: F({}, e, {
              value: de
            })
          });
        }
        W < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var K = w.ReactCurrentDispatcher, q;
    function M(e, r, t) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            q = n && n[1] || "";
          }
        return `
` + q + e;
      }
    }
    var G = !1, U;
    {
      var Me = typeof WeakMap == "function" ? WeakMap : Map;
      U = new Me();
    }
    function pe(e, r) {
      if (!e || G)
        return "";
      {
        var t = U.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      G = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = K.current, K.current = null, Le();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (m) {
              n = m;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (m) {
              n = m;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (m) {
            n = m;
          }
          e();
        }
      } catch (m) {
        if (m && n && typeof m.stack == "string") {
          for (var a = m.stack.split(`
`), E = n.stack.split(`
`), f = a.length - 1, l = E.length - 1; f >= 1 && l >= 0 && a[f] !== E[l]; )
            l--;
          for (; f >= 1 && l >= 0; f--, l--)
            if (a[f] !== E[l]) {
              if (f !== 1 || l !== 1)
                do
                  if (f--, l--, l < 0 || a[f] !== E[l]) {
                    var S = `
` + a[f].replace(" at new ", " at ");
                    return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && U.set(e, S), S;
                  }
                while (f >= 1 && l >= 0);
              break;
            }
        }
      } finally {
        G = !1, K.current = u, Ve(), Error.prepareStackTrace = i;
      }
      var I = e ? e.displayName || e.name : "", D = I ? M(I) : "";
      return typeof e == "function" && U.set(e, D), D;
    }
    function Ue(e, r, t) {
      return pe(e, !1);
    }
    function ze(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function z(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, ze(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case _:
          return M("Suspense");
        case s:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return Ue(e.render);
          case g:
            return z(e.type, r, t);
          case T: {
            var n = e, i = n._payload, u = n._init;
            try {
              return z(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var Y = Object.prototype.hasOwnProperty, he = {}, ge = w.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = z(e.type, e._source, r ? r.type : null);
        ge.setExtraStackFrame(t);
      } else
        ge.setExtraStackFrame(null);
    }
    function Be(e, r, t, n, i) {
      {
        var u = Function.call.bind(Y);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var E = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f) {
              a = f;
            }
            a && !(a instanceof Error) && (B(i), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), B(null)), a instanceof Error && !(a.message in he) && (he[a.message] = !0, B(i), R("Failed %s type: %s", t, a.message), B(null));
          }
      }
    }
    var Je = Array.isArray;
    function X(e) {
      return Je(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function qe(e) {
      try {
        return Re(e), !1;
      } catch {
        return !0;
      }
    }
    function Re(e) {
      return "" + e;
    }
    function be(e) {
      if (qe(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Re(e);
    }
    var Ee = w.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, me, ye;
    function Xe(e) {
      if (Y.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if (Y.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      typeof e.ref == "string" && Ee.current;
    }
    function Qe(e, r) {
      {
        var t = function() {
          me || (me = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          ye || (ye = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: p,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function tr(e, r, t, n, i) {
      {
        var u, o = {}, a = null, E = null;
        t !== void 0 && (be(t), a = "" + t), He(r) && (be(r.key), a = "" + r.key), Xe(r) && (E = r.ref, Ze(r, i));
        for (u in r)
          Y.call(r, u) && !Ge.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var f = e.defaultProps;
          for (u in f)
            o[u] === void 0 && (o[u] = f[u]);
        }
        if (a || E) {
          var l = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Qe(o, l), E && er(o, l);
        }
        return rr(e, a, E, i, n, Ee.current, o);
      }
    }
    var H = w.ReactCurrentOwner, _e = w.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = z(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(t);
      } else
        _e.setExtraStackFrame(null);
    }
    var Z;
    Z = !1;
    function Q(e) {
      return typeof e == "object" && e !== null && e.$$typeof === p;
    }
    function Se() {
      {
        if (H.current) {
          var e = k(H.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      return "";
    }
    var Ce = {};
    function ar(e) {
      {
        var r = Se();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function xe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ar(r);
        if (Ce[t])
          return;
        Ce[t] = !0;
        var n = "";
        e && e._owner && e._owner !== H.current && (n = " It was passed a child from " + k(e._owner.type) + "."), A(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (X(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            Q(n) && xe(n, r);
          }
        else if (Q(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = P(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              Q(o.value) && xe(o.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === g))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = k(r);
          Be(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Z) {
          Z = !0;
          var i = k(r);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var Pe = {};
    function Oe(e, r, t, n, i, u) {
      {
        var o = $e(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = nr();
          E ? a += E : a += Se();
          var f;
          e === null ? f = "null" : X(e) ? f = "array" : e !== void 0 && e.$$typeof === p ? (f = "<" + (k(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, a);
        }
        var l = tr(e, r, t, i, u);
        if (l == null)
          return l;
        if (o) {
          var S = r.children;
          if (S !== void 0)
            if (n)
              if (X(S)) {
                for (var I = 0; I < S.length; I++)
                  Te(S[I], e);
                Object.freeze && Object.freeze(S);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(S, e);
        }
        if (Y.call(r, "key")) {
          var D = k(e), m = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), ee = m.length > 0 ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Pe[D + ee]) {
            var lr = m.length > 0 ? "{" + m.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ee, D, lr, D), Pe[D + ee] = !0;
          }
        }
        return e === d ? ir(l) : or(l), l;
      }
    }
    function sr(e, r, t) {
      return Oe(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Oe(e, r, t, !1);
    }
    var cr = ur, fr = sr;
    N.Fragment = d, N.jsx = cr, N.jsxs = fr;
  }()), N;
}
process.env.NODE_ENV === "production" ? re.exports = vr() : re.exports = pr();
var te = re.exports;
const L = () => {
}, hr = { current: void 0 }, ne = b.createContext({
  current: 1,
  setCurrent: L,
  size: 0,
  setSize: L,
  beforeNextRef: hr,
  isLast: !1,
  isFirst: !1,
  hasPrev: !1,
  hasNext: !1,
  progress: 0,
  next: () => Promise.resolve(!1),
  prev: L,
  jump: L,
  reset: L
}), Rr = ({
  children: v
}) => {
  const [p, h] = b.useState(1), [d, O] = b.useState(0), C = b.useRef(void 0), x = async () => {
    const P = C.current;
    if (P && !await P())
      return !1;
    const w = p + 1;
    return w <= d ? (h(w), !0) : !1;
  }, y = () => {
    const P = p - 1;
    P >= 1 && h(P);
  }, c = (P) => {
    P >= 1 && P <= d && h(P);
  }, _ = () => {
    h(1);
  }, s = p === d, g = p === 1, T = p > 1, j = p < d, V = d <= 1 ? 0 : Number(((p - 1) / (d - 1)).toFixed(2)), J = {
    current: p,
    setCurrent: h,
    size: d,
    setSize: O,
    beforeNextRef: C,
    isLast: s,
    isFirst: g,
    hasPrev: T,
    progress: V,
    next: x,
    prev: y,
    jump: c,
    reset: _,
    hasNext: j
  };
  return /* @__PURE__ */ te.jsx(ne.Provider, { value: J, children: v });
}, br = (v) => {
  const p = b.useContext(ne), { current: h, setCurrent: d, setSize: O, beforeNextRef: C } = p, [x, y] = b.useState(!0), c = b.useRef(h);
  b.useEffect(() => {
    C.current = v.beforeNext;
  }, [v.beforeNext]), b.useEffect(() => {
    y(!1);
    const { startsFrom: s = 1 } = v, g = b.Children.count(v.children);
    s > g ? (d(1), console.warn(
      "React Step Builder: startsFrom is greater than the number of steps. First step will be rendered by default."
    )) : d(s), c.current = s;
  }, []), b.useEffect(() => {
    const s = b.Children.count(v.children);
    O(s);
  }, [v.children]), b.useEffect(() => {
    var s;
    x || (s = v.onStepChange) == null || s.call(v, { from: c.current, to: h }), c.current = h;
  }, [h]);
  const _ = b.Children.map(v.children, (s, g) => {
    const T = g + 1, j = b.cloneElement(s);
    return h === T && j;
  });
  return /* @__PURE__ */ te.jsx(te.Fragment, { children: _ });
}, Er = () => {
  const v = b.useContext(ne), {
    prev: p,
    next: h,
    jump: d,
    reset: O,
    isFirst: C,
    isLast: x,
    hasPrev: y,
    hasNext: c,
    progress: _,
    size: s,
    current: g
  } = v;
  return {
    prev: p,
    next: h,
    jump: d,
    reset: O,
    isFirst: C,
    isLast: x,
    hasPrev: y,
    hasNext: c,
    progress: _,
    total: s,
    current: g
  };
};
export {
  br as Steps,
  Rr as StepsProvider,
  Er as useSteps
};
