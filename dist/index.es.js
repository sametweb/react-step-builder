import * as m from "react";
import Pe from "react";
var Z = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function dr() {
  if (xe) return $;
  xe = 1;
  var p = Pe, v = Symbol.for("react.element"), R = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, x = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, O = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(_, s, E) {
    var d, y = {}, P = null, F = null;
    E !== void 0 && (P = "" + E), s.key !== void 0 && (P = "" + s.key), s.ref !== void 0 && (F = s.ref);
    for (d in s) f.call(s, d) && !O.hasOwnProperty(d) && (y[d] = s[d]);
    if (_ && _.defaultProps) for (d in s = _.defaultProps, s) y[d] === void 0 && (y[d] = s[d]);
    return { $$typeof: v, type: _, key: P, ref: F, props: y, _owner: x.current };
  }
  return $.Fragment = R, $.jsx = T, $.jsxs = T, $;
}
var L = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function vr() {
  return Oe || (Oe = 1, process.env.NODE_ENV !== "production" && function() {
    var p = Pe, v = Symbol.for("react.element"), R = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), _ = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), F = Symbol.for("react.offscreen"), S = Symbol.iterator, we = "@@iterator";
    function je(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = S && e[S] || e[we];
      return typeof r == "function" ? r : null;
    }
    var D = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ke("error", e, t);
      }
    }
    function ke(e, r, t) {
      {
        var n = D.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var Fe = !1, De = !1, Ae = !1, Ie = !1, We = !1, re;
    re = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === O || We || e === x || e === E || e === d || Ie || e === F || Fe || De || Ae || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === y || e.$$typeof === T || e.$$typeof === _ || e.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === re || e.getModuleId !== void 0));
    }
    function $e(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function te(e) {
      return e.displayName || "Context";
    }
    function w(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case f:
          return "Fragment";
        case R:
          return "Portal";
        case O:
          return "Profiler";
        case x:
          return "StrictMode";
        case E:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            var r = e;
            return te(r) + ".Consumer";
          case T:
            var t = e;
            return te(t._context) + ".Provider";
          case s:
            return $e(e, e.render, "ForwardRef");
          case y:
            var n = e.displayName || null;
            return n !== null ? n : w(e.type) || "Memo";
          case P: {
            var i = e, u = i._payload, o = i._init;
            try {
              return w(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var j = Object.assign, W = 0, ne, ae, oe, ie, se, ue, le;
    function ce() {
    }
    ce.__reactDisabledLog = !0;
    function Le() {
      {
        if (W === 0) {
          ne = console.log, ae = console.info, oe = console.warn, ie = console.error, se = console.group, ue = console.groupCollapsed, le = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ce,
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
            log: j({}, e, {
              value: ne
            }),
            info: j({}, e, {
              value: ae
            }),
            warn: j({}, e, {
              value: oe
            }),
            error: j({}, e, {
              value: ie
            }),
            group: j({}, e, {
              value: se
            }),
            groupCollapsed: j({}, e, {
              value: ue
            }),
            groupEnd: j({}, e, {
              value: le
            })
          });
        }
        W < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z = D.ReactCurrentDispatcher, B;
    function V(e, r, t) {
      {
        if (B === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            B = n && n[1] || "";
          }
        return `
` + B + e;
      }
    }
    var J = !1, N;
    {
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      N = new Ne();
    }
    function fe(e, r) {
      if (!e || J)
        return "";
      {
        var t = N.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      J = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = z.current, z.current = null, Le();
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
            } catch (b) {
              n = b;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (b) {
              n = b;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (b) {
            n = b;
          }
          e();
        }
      } catch (b) {
        if (b && n && typeof b.stack == "string") {
          for (var a = b.stack.split(`
`), g = n.stack.split(`
`), l = a.length - 1, c = g.length - 1; l >= 1 && c >= 0 && a[l] !== g[c]; )
            c--;
          for (; l >= 1 && c >= 0; l--, c--)
            if (a[l] !== g[c]) {
              if (l !== 1 || c !== 1)
                do
                  if (l--, c--, c < 0 || a[l] !== g[c]) {
                    var C = `
` + a[l].replace(" at new ", " at ");
                    return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && N.set(e, C), C;
                  }
                while (l >= 1 && c >= 0);
              break;
            }
        }
      } finally {
        J = !1, z.current = u, Ve(), Error.prepareStackTrace = i;
      }
      var I = e ? e.displayName || e.name : "", k = I ? V(I) : "";
      return typeof e == "function" && N.set(e, k), k;
    }
    function Me(e, r, t) {
      return fe(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function M(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return fe(e, Ue(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case E:
          return V("Suspense");
        case d:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case s:
            return Me(e.render);
          case y:
            return M(e.type, r, t);
          case P: {
            var n = e, i = n._payload, u = n._init;
            try {
              return M(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var Y = Object.prototype.hasOwnProperty, de = {}, ve = D.ReactDebugCurrentFrame;
    function U(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        ve.setExtraStackFrame(t);
      } else
        ve.setExtraStackFrame(null);
    }
    function ze(e, r, t, n, i) {
      {
        var u = Function.call.bind(Y);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var g = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (l) {
              a = l;
            }
            a && !(a instanceof Error) && (U(i), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), U(null)), a instanceof Error && !(a.message in de) && (de[a.message] = !0, U(i), h("Failed %s type: %s", t, a.message), U(null));
          }
      }
    }
    var Be = Array.isArray;
    function K(e) {
      return Be(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ke(e) {
      try {
        return pe(e), !1;
      } catch {
        return !0;
      }
    }
    function pe(e) {
      return "" + e;
    }
    function he(e) {
      if (Ke(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), pe(e);
    }
    var ge = D.ReactCurrentOwner, qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ee, be;
    function Ge(e) {
      if (Y.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (Y.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function He(e, r) {
      typeof e.ref == "string" && ge.current;
    }
    function Ze(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          be || (be = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
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
    function rr(e, r, t, n, i) {
      {
        var u, o = {}, a = null, g = null;
        t !== void 0 && (he(t), a = "" + t), Xe(r) && (he(r.key), a = "" + r.key), Ge(r) && (g = r.ref, He(r, i));
        for (u in r)
          Y.call(r, u) && !qe.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var l = e.defaultProps;
          for (u in l)
            o[u] === void 0 && (o[u] = l[u]);
        }
        if (a || g) {
          var c = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ze(o, c), g && Qe(o, c);
        }
        return er(e, a, g, i, n, ge.current, o);
      }
    }
    var q = D.ReactCurrentOwner, Re = D.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        Re.setExtraStackFrame(t);
      } else
        Re.setExtraStackFrame(null);
    }
    var G;
    G = !1;
    function X(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function _e() {
      {
        if (q.current) {
          var e = w(q.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      return "";
    }
    var ye = {};
    function nr(e) {
      {
        var r = _e();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function me(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (ye[t])
          return;
        ye[t] = !0;
        var n = "";
        e && e._owner && e._owner !== q.current && (n = " It was passed a child from " + w(e._owner.type) + "."), A(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Se(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            X(n) && me(n, r);
          }
        else if (X(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = je(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              X(o.value) && me(o.value, r);
        }
      }
    }
    function ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === s || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === y))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = w(r);
          ze(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !G) {
          G = !0;
          var i = w(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var Ce = {};
    function Te(e, r, t, n, i, u) {
      {
        var o = Ye(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var g = tr();
          g ? a += g : a += _e();
          var l;
          e === null ? l = "null" : K(e) ? l = "array" : e !== void 0 && e.$$typeof === v ? (l = "<" + (w(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : l = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", l, a);
        }
        var c = rr(e, r, t, i, u);
        if (c == null)
          return c;
        if (o) {
          var C = r.children;
          if (C !== void 0)
            if (n)
              if (K(C)) {
                for (var I = 0; I < C.length; I++)
                  Se(C[I], e);
                Object.freeze && Object.freeze(C);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Se(C, e);
        }
        if (Y.call(r, "key")) {
          var k = w(e), b = Object.keys(r).filter(function(fr) {
            return fr !== "key";
          }), H = b.length > 0 ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ce[k + H]) {
            var cr = b.length > 0 ? "{" + b.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, H, k, cr, k), Ce[k + H] = !0;
          }
        }
        return e === f ? or(c) : ar(c), c;
      }
    }
    function ir(e, r, t) {
      return Te(e, r, t, !0);
    }
    function sr(e, r, t) {
      return Te(e, r, t, !1);
    }
    var ur = sr, lr = ir;
    L.Fragment = f, L.jsx = ur, L.jsxs = lr;
  }()), L;
}
process.env.NODE_ENV === "production" ? Z.exports = dr() : Z.exports = vr();
var Q = Z.exports;
const ee = m.createContext({
  current: 1,
  setCurrent: () => {
  },
  size: 0,
  setSize: () => {
  },
  isLast: !1,
  isFirst: !1,
  hasPrev: !1,
  hasNext: !1,
  progress: 0,
  next: () => {
  },
  prev: () => {
  },
  jump: () => {
  }
}), hr = ({
  children: p
}) => {
  const [v, R] = m.useState(1), [f, x] = m.useState(0), O = () => {
    const S = v + 1;
    S <= f && R(S);
  }, T = () => {
    const S = v - 1;
    S >= 1 && R(S);
  }, _ = (S) => {
    S >= 1 && S <= f && R(S);
  }, s = v === f, E = v === 1, d = v > 1, y = v < f, P = f <= 1 ? 0 : Number(((v - 1) / (f - 1)).toFixed(2)), F = {
    current: v,
    setCurrent: R,
    size: f,
    setSize: x,
    isLast: s,
    isFirst: E,
    hasPrev: d,
    progress: P,
    next: O,
    prev: T,
    jump: _,
    hasNext: y
  };
  return /* @__PURE__ */ Q.jsx(ee.Provider, { value: F, children: p });
}, gr = (p) => {
  const v = m.useContext(ee), { current: R, setCurrent: f, setSize: x } = v, [O, T] = m.useState(!0);
  m.useEffect(() => {
    T(!1);
    const { startsFrom: s = 1 } = p, E = m.Children.count(p.children);
    s > E ? (f(1), console.warn(
      "React Step Builder: startsFrom is greater than the number of steps. First step will be rendered by default."
    )) : f(s);
  }, []), m.useEffect(() => {
    const s = m.Children.count(p.children);
    x(s);
  }, [p.children]), m.useEffect(() => {
    var s;
    !O && ((s = p.onStepChange) == null || s.call(p));
  }, [R]);
  const _ = m.Children.map(p.children, (s, E) => {
    const d = E + 1, y = m.cloneElement(s);
    return R === d && y;
  });
  return /* @__PURE__ */ Q.jsx(Q.Fragment, { children: _ });
}, Er = () => {
  const p = m.useContext(ee), {
    prev: v,
    next: R,
    jump: f,
    isFirst: x,
    isLast: O,
    hasPrev: T,
    hasNext: _,
    progress: s,
    size: E,
    current: d
  } = p;
  return {
    prev: v,
    next: R,
    jump: f,
    isFirst: x,
    isLast: O,
    hasPrev: T,
    hasNext: _,
    progress: s,
    total: E,
    current: d
  };
};
export {
  gr as Steps,
  hr as StepsProvider,
  Er as useSteps
};
