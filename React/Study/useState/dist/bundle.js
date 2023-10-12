(() => {
	"use strict";
	var t = [],
		e = 0;
	function r(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
		return n;
	}
	!(function t(e, r) {
		if ("string" != typeof e && "number" != typeof e) {
			var n = e.type,
				o = e.props,
				i = e.children,
				l = document.createElement(n);
			for (var u in o)
				if (u.startsWith("on")) {
					var a = u.slice(2).toLowerCase();
					l.addEventListener(a, o[u]);
				} else l.setAttribute(u, o[u]);
			i.forEach(function (e) {
				return t(e, l);
			}),
				r.appendChild(l);
		} else r.appendChild(document.createTextNode(String(e)));
	})(
		createElement(function () {
			var n,
				o,
				i,
				l,
				u,
				a =
					((n = e),
					(o = "function" == typeof 0 ? 0() : 0),
					(i = t[n] || o),
					(t[n] = i),
					e++,
					(u = 2),
					(function (t) {
						if (Array.isArray(t)) return t;
					})(
						(l = [
							i,
							function (e) {
								t[n] = "function" == typeof e ? e(i) : e;
							}
						])
					) ||
						(function (t, e) {
							var r =
								null == t
									? null
									: ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
									  t["@@iterator"];
							if (null != r) {
								var n,
									o,
									i,
									l,
									u = [],
									a = !0,
									c = !1;
								try {
									if (((i = (r = r.call(t)).next), 0 === e)) {
										if (Object(r) !== r) return;
										a = !1;
									} else
										for (
											;
											!(a = (n = i.call(r)).done) &&
											(u.push(n.value), u.length !== e);
											a = !0
										);
								} catch (t) {
									(c = !0), (o = t);
								} finally {
									try {
										if (
											!a &&
											null != r.return &&
											((l = r.return()), Object(l) !== l)
										)
											return;
									} finally {
										if (c) throw o;
									}
								}
								return u;
							}
						})(l, u) ||
						(function (t, e) {
							if (t) {
								if ("string" == typeof t) return r(t, e);
								var n = Object.prototype.toString.call(t).slice(8, -1);
								return (
									"Object" === n && t.constructor && (n = t.constructor.name),
									"Map" === n || "Set" === n
										? Array.from(t)
										: "Arguments" === n ||
										  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
										? r(t, e)
										: void 0
								);
							}
						})(l, u) ||
						(function () {
							throw new TypeError(
								"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
							);
						})()),
				c = a[0],
				f = a[1];
			return createElement(
				"div",
				null,
				createElement("h1", null, c),
				createElement(
					"button",
					{
						onClick: function () {
							return f(function (t) {
								return t + 1;
							});
						}
					},
					"+1"
				)
			);
		}, null),
		document.getElementById("root")
	);
})();
