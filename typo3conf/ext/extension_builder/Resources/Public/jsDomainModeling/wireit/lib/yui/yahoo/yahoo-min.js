/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 2.7.0
 */
if (typeof YAHOO == "undefined" || !YAHOO) {
	var YAHOO = {};
}
YAHOO.namespace = function() {
	var A = arguments,E = null,C,B,D;
	for (C = 0; C < A.length; C = C + 1) {
		D = ("" + A[C]).split(".");
		E = YAHOO;
		for (B = (D[0] == "YAHOO") ? 1 : 0; B < D.length; B = B + 1) {
			E[D[B]] = E[D[B]] || {};
			E = E[D[B]];
		}
	}
	return E;
};
YAHOO.log = function(D, A, C) {
	var B = YAHOO.widget.Logger;
	if (B && B.log) {
		return B.log(D, A, C);
	} else {
		return false;
	}
};
YAHOO.register = function(A, E, D) {
	var I = YAHOO.env.modules,B,H,G,F,C;
	if (!I[A]) {
		I[A] = {versions:[],builds:[]};
	}
	B = I[A];
	H = D.version;
	G = D.build;
	F = YAHOO.env.listeners;
	B.name = A;
	B.version = H;
	B.build = G;
	B.versions.push(H);
	B.builds.push(G);
	B.mainClass = E;
	for (C = 0; C < F.length; C = C + 1) {
		F[C](B);
	}
	if (E) {
		E.VERSION = H;
		E.BUILD = G;
	} else {
		YAHOO.log("mainClass is undefined for module " + A, "warn");
	}
};
YAHOO.env = YAHOO.env || {modules:[],listeners:[]};
YAHOO.env.getVersion = function(A) {
	return YAHOO.env.modules[A] || null;
};
YAHOO.env.ua = function() {
	var C = {ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:0},B = navigator.userAgent,A;
	if ((/KHTML/).test(B)) {
		C.webkit = 1;
	}
	A = B.match(/AppleWebKit\/([^\s]*)/);
	if (A && A[1]) {
		C.webkit = parseFloat(A[1]);
		if (/ Mobile\//.test(B)) {
			C.mobile = "Apple";
		} else {
			A = B.match(/NokiaN[^\/]*/);
			if (A) {
				C.mobile = A[0];
			}
		}
		A = B.match(/AdobeAIR\/([^\s]*)/);
		if (A) {
			C.air = A[0];
		}
	}
	if (!C.webkit) {
		A = B.match(/Opera[\s\/]([^\s]*)/);
		if (A && A[1]) {
			C.opera = parseFloat(A[1]);
			A = B.match(/Opera Mini[^;]*/);
			if (A) {
				C.mobile = A[0];
			}
		} else {
			A = B.match(/MSIE\s([^;]*)/);
			if (A && A[1]) {
				C.ie = parseFloat(A[1]);
			} else {
				A = B.match(/Gecko\/([^\s]*)/);
				if (A) {
					C.gecko = 1;
					A = B.match(/rv:([^\s\)]*)/);
					if (A && A[1]) {
						C.gecko = parseFloat(A[1]);
					}
				}
			}
		}
	}
	A = B.match(/Caja\/([^\s]*)/);
	if (A && A[1]) {
		C.caja = parseFloat(A[1]);
	}
	return C;
}();
(function() {
	YAHOO.namespace("util", "widget", "example");
	if ("undefined" !== typeof YAHOO_config) {
		var B = YAHOO_config.listener,A = YAHOO.env.listeners,D = true,C;
		if (B) {
			for (C = 0; C < A.length; C = C + 1) {
				if (A[C] == B) {
					D = false;
					break;
				}
			}
			if (D) {
				A.push(B);
			}
		}
	}
})();
YAHOO.lang = YAHOO.lang || {};
(function() {
	var B = YAHOO.lang,F = "[object Array]",C = "[object Function]",A = Object.prototype,E = ["toString","valueOf"],D = {isArray:function(G) {
		return A.toString.apply(G) === F;
	},isBoolean:function(G) {
		return typeof G === "boolean";
	},isFunction:function(G) {
		return A.toString.apply(G) === C;
	},isNull:function(G) {
		return G === null;
	},isNumber:function(G) {
		return typeof G === "number" && isFinite(G);
	},isObject:function(G) {
		return(G && (typeof G === "object" || B.isFunction(G))) || false;
	},isString:function(G) {
		return typeof G === "string";
	},isUndefined:function(G) {
		return typeof G === "undefined";
	},_IEEnumFix:(YAHOO.env.ua.ie) ? function(I, H) {
		var G,K,J;
		for (G = 0; G < E.length; G = G + 1) {
			K = E[G];
			J = H[K];
			if (B.isFunction(J) && J != A[K]) {
				I[K] = J;
			}
		}
	} : function() {
	},extend:function(J, K, I) {
		if (!K || !J) {
			throw new Error("extend failed, please check that " + "all dependencies are included.");
		}
		var H = function() {
		},G;
		H.prototype = K.prototype;
		J.prototype = new H();
		J.prototype.constructor = J;
		J.superclass = K.prototype;
		if (K.prototype.constructor == A.constructor) {
			K.prototype.constructor = K;
		}
		if (I) {
			for (G in I) {
				if (B.hasOwnProperty(I, G)) {
					J.prototype[G] = I[G];
				}
			}
			B._IEEnumFix(J.prototype, I);
		}
	},augmentObject:function(K, J) {
		if (!J || !K) {
			throw new Error("Absorb failed, verify dependencies.");
		}
		var G = arguments,I,L,H = G[2];
		if (H && H !== true) {
			for (I = 2; I < G.length; I = I + 1) {
				K[G[I]] = J[G[I]];
			}
		} else {
			for (L in J) {
				if (H || !(L in K)) {
					K[L] = J[L];
				}
			}
			B._IEEnumFix(K, J);
		}
	},augmentProto:function(J, I) {
		if (!I || !J) {
			throw new Error("Augment failed, verify dependencies.");
		}
		var G = [J.prototype,I.prototype],H;
		for (H = 2; H < arguments.length; H = H + 1) {
			G.push(arguments[H]);
		}
		B.augmentObject.apply(this, G);
	},dump:function(G, L) {
		var I,K,N = [],O = "{...}",H = "f(){...}",M = ", ",J = " => ";
		if (!B.isObject(G)) {
			return G + "";
		} else {
			if (G instanceof Date || ("nodeType" in G && "tagName" in G)) {
				return G;
			} else {
				if (B.isFunction(G)) {
					return H;
				}
			}
		}
		L = (B.isNumber(L)) ? L : 3;
		if (B.isArray(G)) {
			N.push("[");
			for (I = 0,K = G.length; I < K; I = I + 1) {
				if (B.isObject(G[I])) {
					N.push((L > 0) ? B.dump(G[I], L - 1) : O);
				} else {
					N.push(G[I]);
				}
				N.push(M);
			}
			if (N.length > 1) {
				N.pop();
			}
			N.push("]");
		} else {
			N.push("{");
			for (I in G) {
				if (B.hasOwnProperty(G, I)) {
					N.push(I + J);
					if (B.isObject(G[I])) {
						N.push((L > 0) ? B.dump(G[I], L - 1) : O);
					} else {
						N.push(G[I]);
					}
					N.push(M);
				}
			}
			if (N.length > 1) {
				N.pop();
			}
			N.push("}");
		}
		return N.join("");
	},substitute:function(V, H, O) {
		var L,K,J,R,S,U,Q = [],I,M = "dump",P = " ",G = "{",T = "}",N;
		for (; ;) {
			L = V.lastIndexOf(G);
			if (L < 0) {
				break;
			}
			K = V.indexOf(T, L);
			if (L + 1 >= K) {
				break;
			}
			I = V.substring(L + 1, K);
			R = I;
			U = null;
			J = R.indexOf(P);
			if (J > -1) {
				U = R.substring(J + 1);
				R = R.substring(0, J);
			}
			S = H[R];
			if (O) {
				S = O(R, S, U);
			}
			if (B.isObject(S)) {
				if (B.isArray(S)) {
					S = B.dump(S, parseInt(U, 10));
				} else {
					U = U || "";
					N = U.indexOf(M);
					if (N > -1) {
						U = U.substring(4);
					}
					if (S.toString === A.toString || N > -1) {
						S = B.dump(S, parseInt(U, 10));
					} else {
						S = S.toString();
					}
				}
			} else {
				if (!B.isString(S) && !B.isNumber(S)) {
					S = "~-" + Q.length + "-~";
					Q[Q.length] = I;
				}
			}
			V = V.substring(0, L) + S + V.substring(K + 1);
		}
		for (L = Q.length - 1; L >= 0; L = L - 1) {
			V = V.replace(new RegExp("~-" + L + "-~"), "{" + Q[L] + "}", "g");
		}
		return V;
	},trim:function(G) {
		try {
			return G.replace(/^\s+|\s+$/g, "");
		} catch(H) {
			return G;
		}
	},merge:function() {
		var J = {},H = arguments,G = H.length,I;
		for (I = 0; I < G; I = I + 1) {
			B.augmentObject(J, H[I], true);
		}
		return J;
	},later:function(N, H, O, J, K) {
		N = N || 0;
		H = H || {};
		var I = O,M = J,L,G;
		if (B.isString(O)) {
			I = H[O];
		}
		if (!I) {
			throw new TypeError("method undefined");
		}
		if (!B.isArray(M)) {
			M = [J];
		}
		L = function() {
			I.apply(H, M);
		};
		G = (K) ? setInterval(L, N) : setTimeout(L, N);
		return{interval:K,cancel:function() {
			if (this.interval) {
				clearInterval(G);
			} else {
				clearTimeout(G);
			}
		}};
	},isValue:function(G) {
		return(B.isObject(G) || B.isString(G) || B.isNumber(G) || B.isBoolean(G));
	}};
	B.hasOwnProperty = (A.hasOwnProperty) ? function(G, H) {
		return G && G.hasOwnProperty(H);
	} : function(G, H) {
		return !B.isUndefined(G[H]) && G.constructor.prototype[H] !== G[H];
	};
	D.augmentObject(B, D, true);
	YAHOO.util.Lang = B;
	B.augment = B.augmentProto;
	YAHOO.augment = B.augmentProto;
	YAHOO.extend = B.extend;
})();
YAHOO.register("yahoo", YAHOO, {version:"2.7.0",build:"1799"});