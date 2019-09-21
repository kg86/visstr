(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("visstr", [], factory);
	else if(typeof exports === 'object')
		exports["visstr"] = factory();
	else
		root["visstr"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vis_str.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/color-convert/conversions.js":
/*!***************************************************!*\
  !*** ./node_modules/color-convert/conversions.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/color-convert/index.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/color-convert/conversions.js");
const route = __webpack_require__(/*! ./route */ "./node_modules/color-convert/route.js");

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/color-convert/route.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/route.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/color-convert/conversions.js");

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./src/vis_str.ts":
/*!************************!*\
  !*** ./src/vis_str.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const convert = __webpack_require__(/*! color-convert */ "./node_modules/color-convert/index.js");
class VisStr {
    /**
     *
     * @param canvas HTMLCanvasElement
     * @param font_size font size
     * @param font_type font name
     */
    constructor(canvas, font_size = 32, font_type = 'Courier') {
        this.canvas = canvas;
        this.font_size = font_size;
        this.font_size_half = this.font_size / 2;
        this.font_type = font_type;
        this.ctx = canvas.getContext('2d');
        this.str_x = this.font_size;
        this.str_y = this.font_size * 2 + this.font_size_half;
        this.range_beg_offset = -this.font_size / 4;
        this.range_end_offset = this.font_size / 4;
    }
    /** Clear the canvas. */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Returns the x-coordinate which is a beginning of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range beginning at `idx`
     */
    rangeBeg(idx) {
        return this.str_x + this.font_size * idx + this.range_beg_offset;
    }
    /**
     * Returns the x-coordinate which is a ending of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range ending at `idx`
     */
    rangeEnd(idx) {
        return this.str_x + this.font_size * idx + this.range_end_offset;
    }
    /**
     * Return the height of a given range.
     * @param r A range.
     */
    rangeHeight(r) {
        return r.style === 'str' ? this.font_size : Math.round(this.font_size * 0.5);
    }
    /**
     * For a range not to draw strings, split it to three parts left, center, and right.
     * @param rpx Given range to split.
     */
    splitRangePx(rpx) {
        const styles = rpx.style.split(',');
        let rl = Object.assign({}, rpx);
        let rc = Object.assign({}, rpx);
        let rr = Object.assign({}, rpx);
        rl.x_end = rpx.x_beg + this.curve_d();
        rl.style = styles[0];
        rr.x_beg = rpx.x_end;
        rr.x_end = rpx.x_end - this.curve_d();
        rr.style = styles.length > 1 ? styles[1] : styles[0];
        rc.x_beg = rl.x_end;
        rc.x_end = rr.x_end;
        rc.style = 'line';
        return [rl, rc, rr];
    }
    /**
     * Draw curve as a part of a range.
     * @param rpx A part of a range.
     */
    drawCurvePart(rpx) {
        this.ctx.beginPath();
        this.ctx.moveTo(rpx.x_beg, rpx.y - this.curve_d());
        this.ctx.quadraticCurveTo(rpx.x_beg, rpx.y, rpx.x_end, rpx.y);
        this.ctx.stroke();
    }
    /**
     * Return the length of a beginning (or ending) part of a range.
     */
    curve_d() {
        return this.font_size_half / 2;
    }
    /**
     * Draw line as a part of a range.
     * @param rpx A part of a range.
     */
    drawLinePxPart(rpx) {
        this.ctx.beginPath();
        this.ctx.moveTo(rpx.x_beg, rpx.y);
        this.ctx.lineTo(rpx.x_end, rpx.y);
        this.ctx.stroke();
    }
    /**
     * Draw arrow as a part of a range.
     * @param rpx A part of a range.
     */
    drawArrowPxPart(rpx) {
        const dx = this.curve_d() * (rpx.x_beg < rpx.x_end ? -1 : +1);
        this.drawLinePxPart(rpx);
        this.ctx.beginPath();
        this.ctx.moveTo(rpx.x_end + dx / 2, rpx.y + dx / 2);
        this.ctx.lineTo(rpx.x_end + dx, rpx.y);
        this.ctx.lineTo(rpx.x_end + dx / 2, rpx.y - dx / 2);
        this.ctx.stroke();
    }
    /**
     * Draw range as a part of a range.
     * @param rpx A part of a range.
     */
    drawRangePxPart(rpx) {
        if (rpx.style == 'line') {
            this.drawLinePxPart(rpx);
        }
        else if (rpx.style == 'curve') {
            this.drawCurvePart(rpx);
        }
        else if (rpx.style == 'arrow') {
            this.drawArrowPxPart(rpx);
        }
    }
    /**
     * Draw range.
     * @param rpx A range to draw.
     */
    drawRangePx(rpx) {
        if (rpx.style == 'line') {
            this.drawLinePxPart(rpx);
        }
        else {
            const [rl, rc, rr] = this.splitRangePx(rpx);
            this.drawRangePxPart(rl);
            this.drawRangePxPart(rc);
            this.drawRangePxPart(rr);
        }
    }
    /**
     * Draw strings.
     * @param r A range to draw strings.
     * @param y The y-coorinate to draw range `r`.
     */
    drawStr(r, y) {
        const rstr = r.str;
        for (let i = 0; i < rstr.length; i++) {
            const c = rstr[i];
            const cx = this.str_x + (r.beg + i) * this.font_size;
            this.ctx.fillText(c, cx, y + this.font_size * 0.3, this.font_size);
            this.ctx.beginPath();
            this.ctx.rect(cx - this.font_size_half, y - this.font_size_half, this.font_size, this.font_size);
            this.ctx.stroke();
        }
    }
    /**
     * Draw range.
     * @param r A range to draw.
     * @param y A y-coordinate to draw `r`.
     */
    drawRange(r, y) {
        this.ctx.strokeStyle = r.color;
        let rpx = {
            x_beg: this.rangeBeg(r.beg),
            x_end: this.rangeEnd(r.end),
            y: y,
            style: r.style,
            color: r.color,
            str: r.str,
        };
        if (r.style == 'str') {
            this.drawStr(r, y);
        }
        else if (r.step === undefined) {
            this.drawRangePx(rpx);
        }
        else {
            let x_beg = this.rangeBeg(r.beg);
            for (let cur = r.beg + r.step - 1; cur < r.end; cur += r.step) {
                rpx.x_end = this.str_x + this.font_size * cur + this.font_size_half;
                this.drawRangePx(rpx);
                rpx.x_beg = rpx.x_end;
            }
            if ((r.end - r.beg + 1) % r.step === 0) {
                rpx.x_end = this.rangeEnd(r.end);
                this.drawRangePx(rpx);
            }
            else {
                // There is an uncomplete range.
                rpx.x_end = this.str_x + this.font_size * r.end + this.font_size_half;
                rpx.style = r.style.split(',')[0] + ',line';
                this.drawRangePx(rpx);
            }
        }
    }
    /**
     * Draw ranges.
     * @param range_rows Ranges to draw.
     */
    drawRanges(range_rows) {
        let ypx = this.str_y;
        for (const ranges of range_rows) {
            const height = Math.max(...ranges.map(r => this.rangeHeight(r)));
            for (const range of ranges) {
                this.drawRange(range, ypx + height / 2);
            }
            ypx += height;
        }
    }
    /**
     * Draw an input string.
     */
    drawInputStr(input_str) {
        let index = ['i'];
        for (let i = 0; i < input_str.length; i++)
            index.push('' + i);
        let r = {
            style: 'str',
            color: '#000000',
            beg: -1,
            end: input_str.length - 1,
            str: index,
        };
        this.drawRange(r, this.str_y - this.font_size - this.font_size_half);
        const chars = ['Str'];
        for (let i = 0; i < input_str.length; i++)
            chars.push(input_str.substring(i, i + 1));
        r.str = chars;
        this.drawRange(r, this.str_y - this.font_size_half);
    }
    /**
     * Draw a given string and ranges.
     * @param input_str Input string to draw.
     * @param rss The ranges to draw which are related to a given string `input_str`
     */
    draw(input_str, rss) {
        let range_bound = [-1, input_str.length - 1];
        rss.forEach(rs => rs.forEach(r => (range_bound = [
            Math.min(range_bound[0], r.beg),
            Math.max(range_bound[1], r.end),
        ])));
        this.str_x = this.font_size + Math.abs(range_bound[0]) * this.font_size;
        this.canvas.width = (range_bound[1] - range_bound[0] + 2) * this.font_size;
        this.canvas.height =
            this.str_y +
                this.font_size_half +
                rss.reduce((acm, rs) => acm + Math.max(...rs.map(r => this.rangeHeight(r))), 0);
        // DPI settings
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        // console.log('dpr', dpr, ' rect', rect)
        this.canvas.width *= dpr;
        this.canvas.height *= dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = this.canvas.width / dpr + 'px';
        this.canvas.style.height = this.canvas.height / dpr + 'px';
        this.ctx.textAlign = 'center';
        this.ctx.lineWidth = 3;
        this.ctx.font = this.font_size + 'px ' + this.font_type;
        this.drawInputStr(input_str);
        this.drawRanges(rss);
    }
    /**
     * Make group that each contains a single range.
     * @param ranges The range list.
     */
    makeSingleGroups(ranges) {
        return ranges.map(range => [range]);
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param Ts The range list.
     * @param rangef The function to return the tuple beginning index and ending index of a given range `Ts[i]`.
     */
    nonOverlapObjs(Ts, rangef) {
        if (Ts.length <= 0)
            return [];
        const ends = Ts.map(t => rangef(t)[1]);
        const n = Math.max(...ends) + 1;
        let used = new Array(n);
        used.fill(false);
        let res = [];
        let rows = [];
        for (const t of Ts) {
            // check whether or not a range can be inserted to the current row.
            let used_any = false;
            for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
                used_any = used_any || used[i];
            }
            if (used_any) {
                res.push(rows);
                rows = [t];
                used.fill(false);
            }
            else {
                rows.push(t);
            }
            for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
                used[i] = true;
            }
        }
        if (rows.length > 0)
            res.push(rows);
        return res;
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRanges(rs) {
        return this.nonOverlapObjs(rs, r => [r.beg, r.end]);
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRangesSimple(rs) {
        return this.nonOverlapObjs(rs, x => [x[0], x[1]]);
    }
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeGroupRangesAutoColor(rs, style) {
        let res = [];
        for (let i = 0; i < rs.length; i++) {
            const color = '#' + convert.hsv.hex([(i * 360) / rs.length, 80, 80]);
            res.push(this.makeRanges(rs[i], style, color));
        }
        return res;
    }
    /**
     * Return the range list `rs` specified with style `style` and `color`.
     * @param ranges The range list.
     * @param style The style of the ranges `rs` to draw.
     * @param color The color of the ranges `rs` to draw.
     */
    makeRanges(ranges, style, color) {
        return ranges.map(range => {
            const is_str = typeof range[2] !== 'undefined' && typeof range[2] !== 'number';
            const step = typeof range[2] === 'number' ? range[2] : undefined;
            const str = typeof range[2] !== 'number' ? range[2] : undefined;
            return {
                style: is_str ? 'str' : style,
                color,
                beg: range[0],
                end: range[1],
                step,
                str,
            };
        });
    }
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeRangesAutoColor(rs, style) {
        return rs.map((range, i) => ({
            style,
            color: '#' + convert.hsv.hex([(i * 360) / rs.length, 80, 80]),
            beg: range[0],
            end: range[1],
        }));
    }
}
exports.VisStr = VisStr;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aXNzdHIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92aXNzdHIvLi9ub2RlX21vZHVsZXMvY29sb3ItY29udmVydC9jb252ZXJzaW9ucy5qcyIsIndlYnBhY2s6Ly92aXNzdHIvLi9ub2RlX21vZHVsZXMvY29sb3ItY29udmVydC9pbmRleC5qcyIsIndlYnBhY2s6Ly92aXNzdHIvLi9ub2RlX21vZHVsZXMvY29sb3ItY29udmVydC9yb3V0ZS5qcyIsIndlYnBhY2s6Ly92aXNzdHIvLi9ub2RlX21vZHVsZXMvY29sb3ItbmFtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvdmlzX3N0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxzREFBWTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsUUFBUSw0QkFBNEI7QUFDcEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyw2QkFBNkI7QUFDcEMsV0FBVyxpQ0FBaUM7QUFDNUMsVUFBVSxnQ0FBZ0M7QUFDMUMsV0FBVyxpQ0FBaUM7QUFDNUMsT0FBTyxxQ0FBcUM7QUFDNUMsU0FBUywyQ0FBMkM7QUFDcEQsUUFBUTtBQUNSOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLGlCQUFpQjtBQUN6QjtBQUNBO0FBQ0Esb0RBQW9ELGdCQUFnQjtBQUNwRSxrREFBa0QsY0FBYztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUSxTQUFTO0FBQ2pDLGdCQUFnQixRQUFRLFNBQVM7QUFDakMsaUJBQWlCLE9BQU8sUUFBUTtBQUNoQyxpQkFBaUIsT0FBTyxRQUFRO0FBQ2hDLGdCQUFnQixTQUFTLE9BQU87QUFDaEMsZ0JBQWdCLFNBQVMsT0FBTztBQUNoQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUU7O0FBRXpFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQsRUFBRSxVQUFVLEVBQUU7QUFDL0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0QsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTFaRCx3QkEwWkMiLCJmaWxlIjoidmlzX3N0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidmlzc3RyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInZpc3N0clwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ2aXNzdHJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zpc19zdHIudHNcIik7XG4iLCIvKiBNSVQgbGljZW5zZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXG5jb25zdCBjc3NLZXl3b3JkcyA9IHJlcXVpcmUoJ2NvbG9yLW5hbWUnKTtcblxuLy8gTk9URTogY29udmVyc2lvbnMgc2hvdWxkIG9ubHkgcmV0dXJuIHByaW1pdGl2ZSB2YWx1ZXMgKGkuZS4gYXJyYXlzLCBvclxuLy8gICAgICAgdmFsdWVzIHRoYXQgZ2l2ZSBjb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMpLlxuLy8gICAgICAgZG8gbm90IHVzZSBib3ggdmFsdWVzIHR5cGVzIChpLmUuIE51bWJlcigpLCBTdHJpbmcoKSwgZXRjLilcblxuY29uc3QgcmV2ZXJzZUtleXdvcmRzID0ge307XG5mb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjc3NLZXl3b3JkcykpIHtcblx0cmV2ZXJzZUtleXdvcmRzW2Nzc0tleXdvcmRzW2tleV1dID0ga2V5O1xufVxuXG5jb25zdCBjb252ZXJ0ID0ge1xuXHRyZ2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAncmdiJ30sXG5cdGhzbDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc2wnfSxcblx0aHN2OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzdid9LFxuXHRod2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHdiJ30sXG5cdGNteWs6IHtjaGFubmVsczogNCwgbGFiZWxzOiAnY215ayd9LFxuXHR4eXo6IHtjaGFubmVsczogMywgbGFiZWxzOiAneHl6J30sXG5cdGxhYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsYWInfSxcblx0bGNoOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xjaCd9LFxuXHRoZXg6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2hleCddfSxcblx0a2V5d29yZDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsna2V5d29yZCddfSxcblx0YW5zaTE2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMTYnXX0sXG5cdGFuc2kyNTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kyNTYnXX0sXG5cdGhjZzoge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsnaCcsICdjJywgJ2cnXX0sXG5cdGFwcGxlOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydyMTYnLCAnZzE2JywgJ2IxNiddfSxcblx0Z3JheToge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnZ3JheSddfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0O1xuXG4vLyBIaWRlIC5jaGFubmVscyBhbmQgLmxhYmVscyBwcm9wZXJ0aWVzXG5mb3IgKGNvbnN0IG1vZGVsIG9mIE9iamVjdC5rZXlzKGNvbnZlcnQpKSB7XG5cdGlmICghKCdjaGFubmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHR9XG5cblx0aWYgKCEoJ2xhYmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWwgbGFiZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHR9XG5cblx0aWYgKGNvbnZlcnRbbW9kZWxdLmxhYmVscy5sZW5ndGggIT09IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjaGFubmVsIGFuZCBsYWJlbCBjb3VudHMgbWlzbWF0Y2g6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRjb25zdCB7Y2hhbm5lbHMsIGxhYmVsc30gPSBjb252ZXJ0W21vZGVsXTtcblx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRkZWxldGUgY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBsYWJlbHN9KTtcbn1cblxuY29udmVydC5yZ2IuaHNsID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuXHRsZXQgaDtcblx0bGV0IHM7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0aCA9IDA7XG5cdH0gZWxzZSBpZiAociA9PT0gbWF4KSB7XG5cdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblx0fSBlbHNlIGlmIChnID09PSBtYXgpIHtcblx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblx0fSBlbHNlIGlmIChiID09PSBtYXgpIHtcblx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblx0fVxuXG5cdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRjb25zdCBsID0gKG1pbiArIG1heCkgLyAyO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdHMgPSAwO1xuXHR9IGVsc2UgaWYgKGwgPD0gMC41KSB7XG5cdFx0cyA9IGRlbHRhIC8gKG1heCArIG1pbik7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pO1xuXHR9XG5cblx0cmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmhzdiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0bGV0IHJkaWY7XG5cdGxldCBnZGlmO1xuXHRsZXQgYmRpZjtcblx0bGV0IGg7XG5cdGxldCBzO1xuXG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IHYgPSBNYXRoLm1heChyLCBnLCBiKTtcblx0Y29uc3QgZGlmZiA9IHYgLSBNYXRoLm1pbihyLCBnLCBiKTtcblx0Y29uc3QgZGlmZmMgPSBmdW5jdGlvbiAoYykge1xuXHRcdHJldHVybiAodiAtIGMpIC8gNiAvIGRpZmYgKyAxIC8gMjtcblx0fTtcblxuXHRpZiAoZGlmZiA9PT0gMCkge1xuXHRcdGggPSAwO1xuXHRcdHMgPSAwO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkaWZmIC8gdjtcblx0XHRyZGlmID0gZGlmZmMocik7XG5cdFx0Z2RpZiA9IGRpZmZjKGcpO1xuXHRcdGJkaWYgPSBkaWZmYyhiKTtcblxuXHRcdGlmIChyID09PSB2KSB7XG5cdFx0XHRoID0gYmRpZiAtIGdkaWY7XG5cdFx0fSBlbHNlIGlmIChnID09PSB2KSB7XG5cdFx0XHRoID0gKDEgLyAzKSArIHJkaWYgLSBiZGlmO1xuXHRcdH0gZWxzZSBpZiAoYiA9PT0gdikge1xuXHRcdFx0aCA9ICgyIC8gMykgKyBnZGlmIC0gcmRpZjtcblx0XHR9XG5cblx0XHRpZiAoaCA8IDApIHtcblx0XHRcdGggKz0gMTtcblx0XHR9IGVsc2UgaWYgKGggPiAxKSB7XG5cdFx0XHRoIC09IDE7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRoICogMzYwLFxuXHRcdHMgKiAxMDAsXG5cdFx0diAqIDEwMFxuXHRdO1xufTtcblxuY29udmVydC5yZ2IuaHdiID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdO1xuXHRjb25zdCBnID0gcmdiWzFdO1xuXHRsZXQgYiA9IHJnYlsyXTtcblx0Y29uc3QgaCA9IGNvbnZlcnQucmdiLmhzbChyZ2IpWzBdO1xuXHRjb25zdCB3ID0gMSAvIDI1NSAqIE1hdGgubWluKHIsIE1hdGgubWluKGcsIGIpKTtcblxuXHRiID0gMSAtIDEgLyAyNTUgKiBNYXRoLm1heChyLCBNYXRoLm1heChnLCBiKSk7XG5cblx0cmV0dXJuIFtoLCB3ICogMTAwLCBiICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmNteWsgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cblx0Y29uc3QgayA9IE1hdGgubWluKDEgLSByLCAxIC0gZywgMSAtIGIpO1xuXHRjb25zdCBjID0gKDEgLSByIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdGNvbnN0IG0gPSAoMSAtIGcgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0Y29uc3QgeSA9ICgxIC0gYiAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXG5cdHJldHVybiBbYyAqIDEwMCwgbSAqIDEwMCwgeSAqIDEwMCwgayAqIDEwMF07XG59O1xuXG5mdW5jdGlvbiBjb21wYXJhdGl2ZURpc3RhbmNlKHgsIHkpIHtcblx0Lypcblx0XHRTZWUgaHR0cHM6Ly9lbi5tLndpa2lwZWRpYS5vcmcvd2lraS9FdWNsaWRlYW5fZGlzdGFuY2UjU3F1YXJlZF9FdWNsaWRlYW5fZGlzdGFuY2Vcblx0Ki9cblx0cmV0dXJuIChcblx0XHQoKHhbMF0gLSB5WzBdKSAqKiAyKSArXG5cdFx0KCh4WzFdIC0geVsxXSkgKiogMikgK1xuXHRcdCgoeFsyXSAtIHlbMl0pICoqIDIpXG5cdCk7XG59XG5cbmNvbnZlcnQucmdiLmtleXdvcmQgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHJldmVyc2VkID0gcmV2ZXJzZUtleXdvcmRzW3JnYl07XG5cdGlmIChyZXZlcnNlZCkge1xuXHRcdHJldHVybiByZXZlcnNlZDtcblx0fVxuXG5cdGxldCBjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cdGxldCBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG5cblx0Zm9yIChjb25zdCBrZXl3b3JkIG9mIE9iamVjdC5rZXlzKGNzc0tleXdvcmRzKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gY3NzS2V5d29yZHNba2V5d29yZF07XG5cblx0XHQvLyBDb21wdXRlIGNvbXBhcmF0aXZlIGRpc3RhbmNlXG5cdFx0Y29uc3QgZGlzdGFuY2UgPSBjb21wYXJhdGl2ZURpc3RhbmNlKHJnYiwgdmFsdWUpO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgaXRzIGxlc3MsIGlmIHNvIHNldCBhcyBjbG9zZXN0XG5cdFx0aWYgKGRpc3RhbmNlIDwgY3VycmVudENsb3Nlc3REaXN0YW5jZSkge1xuXHRcdFx0Y3VycmVudENsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuXHRcdFx0Y3VycmVudENsb3Nlc3RLZXl3b3JkID0ga2V5d29yZDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudENsb3Nlc3RLZXl3b3JkO1xufTtcblxuY29udmVydC5rZXl3b3JkLnJnYiA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdHJldHVybiBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcbn07XG5cbmNvbnZlcnQucmdiLnh5eiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0bGV0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGxldCBnID0gcmdiWzFdIC8gMjU1O1xuXHRsZXQgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHQvLyBBc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDQwNDUgPyAoKChyICsgMC4wNTUpIC8gMS4wNTUpICoqIDIuNCkgOiAociAvIDEyLjkyKTtcblx0ZyA9IGcgPiAwLjA0MDQ1ID8gKCgoZyArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQpIDogKGcgLyAxMi45Mik7XG5cdGIgPSBiID4gMC4wNDA0NSA/ICgoKGIgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChiIC8gMTIuOTIpO1xuXG5cdGNvbnN0IHggPSAociAqIDAuNDEyNCkgKyAoZyAqIDAuMzU3NikgKyAoYiAqIDAuMTgwNSk7XG5cdGNvbnN0IHkgPSAociAqIDAuMjEyNikgKyAoZyAqIDAuNzE1MikgKyAoYiAqIDAuMDcyMik7XG5cdGNvbnN0IHogPSAociAqIDAuMDE5MykgKyAoZyAqIDAuMTE5MikgKyAoYiAqIDAuOTUwNSk7XG5cblx0cmV0dXJuIFt4ICogMTAwLCB5ICogMTAwLCB6ICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmxhYiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgeHl6ID0gY29udmVydC5yZ2IueHl6KHJnYik7XG5cdGxldCB4ID0geHl6WzBdO1xuXHRsZXQgeSA9IHh5elsxXTtcblx0bGV0IHogPSB4eXpbMl07XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/ICh4ICoqICgxIC8gMykpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gKHkgKiogKDEgLyAzKSkgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyAoeiAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRjb25zdCBsID0gKDExNiAqIHkpIC0gMTY7XG5cdGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRjb25zdCBiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5oc2wucmdiID0gZnVuY3Rpb24gKGhzbCkge1xuXHRjb25zdCBoID0gaHNsWzBdIC8gMzYwO1xuXHRjb25zdCBzID0gaHNsWzFdIC8gMTAwO1xuXHRjb25zdCBsID0gaHNsWzJdIC8gMTAwO1xuXHRsZXQgdDI7XG5cdGxldCB0Mztcblx0bGV0IHZhbDtcblxuXHRpZiAocyA9PT0gMCkge1xuXHRcdHZhbCA9IGwgKiAyNTU7XG5cdFx0cmV0dXJuIFt2YWwsIHZhbCwgdmFsXTtcblx0fVxuXG5cdGlmIChsIDwgMC41KSB7XG5cdFx0dDIgPSBsICogKDEgKyBzKTtcblx0fSBlbHNlIHtcblx0XHR0MiA9IGwgKyBzIC0gbCAqIHM7XG5cdH1cblxuXHRjb25zdCB0MSA9IDIgKiBsIC0gdDI7XG5cblx0Y29uc3QgcmdiID0gWzAsIDAsIDBdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdHQzID0gaCArIDEgLyAzICogLShpIC0gMSk7XG5cdFx0aWYgKHQzIDwgMCkge1xuXHRcdFx0dDMrKztcblx0XHR9XG5cblx0XHRpZiAodDMgPiAxKSB7XG5cdFx0XHR0My0tO1xuXHRcdH1cblxuXHRcdGlmICg2ICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHR9IGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQyO1xuXHRcdH0gZWxzZSBpZiAoMyAqIHQzIDwgMikge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiAoMiAvIDMgLSB0MykgKiA2O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWwgPSB0MTtcblx0XHR9XG5cblx0XHRyZ2JbaV0gPSB2YWwgKiAyNTU7XG5cdH1cblxuXHRyZXR1cm4gcmdiO1xufTtcblxuY29udmVydC5oc2wuaHN2ID0gZnVuY3Rpb24gKGhzbCkge1xuXHRjb25zdCBoID0gaHNsWzBdO1xuXHRsZXQgcyA9IGhzbFsxXSAvIDEwMDtcblx0bGV0IGwgPSBoc2xbMl0gLyAxMDA7XG5cdGxldCBzbWluID0gcztcblx0Y29uc3QgbG1pbiA9IE1hdGgubWF4KGwsIDAuMDEpO1xuXG5cdGwgKj0gMjtcblx0cyAqPSAobCA8PSAxKSA/IGwgOiAyIC0gbDtcblx0c21pbiAqPSBsbWluIDw9IDEgPyBsbWluIDogMiAtIGxtaW47XG5cdGNvbnN0IHYgPSAobCArIHMpIC8gMjtcblx0Y29uc3Qgc3YgPSBsID09PSAwID8gKDIgKiBzbWluKSAvIChsbWluICsgc21pbikgOiAoMiAqIHMpIC8gKGwgKyBzKTtcblxuXHRyZXR1cm4gW2gsIHN2ICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LnJnYiA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgaCA9IGhzdlswXSAvIDYwO1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRsZXQgdiA9IGhzdlsyXSAvIDEwMDtcblx0Y29uc3QgaGkgPSBNYXRoLmZsb29yKGgpICUgNjtcblxuXHRjb25zdCBmID0gaCAtIE1hdGguZmxvb3IoaCk7XG5cdGNvbnN0IHAgPSAyNTUgKiB2ICogKDEgLSBzKTtcblx0Y29uc3QgcSA9IDI1NSAqIHYgKiAoMSAtIChzICogZikpO1xuXHRjb25zdCB0ID0gMjU1ICogdiAqICgxIC0gKHMgKiAoMSAtIGYpKSk7XG5cdHYgKj0gMjU1O1xuXG5cdHN3aXRjaCAoaGkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRyZXR1cm4gW3YsIHQsIHBdO1xuXHRcdGNhc2UgMTpcblx0XHRcdHJldHVybiBbcSwgdiwgcF07XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cmV0dXJuIFtwLCB2LCB0XTtcblx0XHRjYXNlIDM6XG5cdFx0XHRyZXR1cm4gW3AsIHEsIHZdO1xuXHRcdGNhc2UgNDpcblx0XHRcdHJldHVybiBbdCwgcCwgdl07XG5cdFx0Y2FzZSA1OlxuXHRcdFx0cmV0dXJuIFt2LCBwLCBxXTtcblx0fVxufTtcblxuY29udmVydC5oc3YuaHNsID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdO1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRjb25zdCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCB2bWluID0gTWF0aC5tYXgodiwgMC4wMSk7XG5cdGxldCBzbDtcblx0bGV0IGw7XG5cblx0bCA9ICgyIC0gcykgKiB2O1xuXHRjb25zdCBsbWluID0gKDIgLSBzKSAqIHZtaW47XG5cdHNsID0gcyAqIHZtaW47XG5cdHNsIC89IChsbWluIDw9IDEpID8gbG1pbiA6IDIgLSBsbWluO1xuXHRzbCA9IHNsIHx8IDA7XG5cdGwgLz0gMjtcblxuXHRyZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcbn07XG5cbi8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1jb2xvci8jaHdiLXRvLXJnYlxuY29udmVydC5od2IucmdiID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCBoID0gaHdiWzBdIC8gMzYwO1xuXHRsZXQgd2ggPSBod2JbMV0gLyAxMDA7XG5cdGxldCBibCA9IGh3YlsyXSAvIDEwMDtcblx0Y29uc3QgcmF0aW8gPSB3aCArIGJsO1xuXHRsZXQgZjtcblxuXHQvLyBXaCArIGJsIGNhbnQgYmUgPiAxXG5cdGlmIChyYXRpbyA+IDEpIHtcblx0XHR3aCAvPSByYXRpbztcblx0XHRibCAvPSByYXRpbztcblx0fVxuXG5cdGNvbnN0IGkgPSBNYXRoLmZsb29yKDYgKiBoKTtcblx0Y29uc3QgdiA9IDEgLSBibDtcblx0ZiA9IDYgKiBoIC0gaTtcblxuXHRpZiAoKGkgJiAweDAxKSAhPT0gMCkge1xuXHRcdGYgPSAxIC0gZjtcblx0fVxuXG5cdGNvbnN0IG4gPSB3aCArIGYgKiAodiAtIHdoKTsgLy8gTGluZWFyIGludGVycG9sYXRpb25cblxuXHRsZXQgcjtcblx0bGV0IGc7XG5cdGxldCBiO1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSxuby1tdWx0aS1zcGFjZXMgKi9cblx0c3dpdGNoIChpKSB7XG5cdFx0ZGVmYXVsdDpcblx0XHRjYXNlIDY6XG5cdFx0Y2FzZSAwOiByID0gdjsgIGcgPSBuOyAgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDE6IHIgPSBuOyAgZyA9IHY7ICBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMjogciA9IHdoOyBnID0gdjsgIGIgPSBuOyBicmVhaztcblx0XHRjYXNlIDM6IHIgPSB3aDsgZyA9IG47ICBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA0OiByID0gbjsgIGcgPSB3aDsgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNTogciA9IHY7ICBnID0gd2g7IGIgPSBuOyBicmVhaztcblx0fVxuXHQvKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lLG5vLW11bHRpLXNwYWNlcyAqL1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmNteWsucmdiID0gZnVuY3Rpb24gKGNteWspIHtcblx0Y29uc3QgYyA9IGNteWtbMF0gLyAxMDA7XG5cdGNvbnN0IG0gPSBjbXlrWzFdIC8gMTAwO1xuXHRjb25zdCB5ID0gY215a1syXSAvIDEwMDtcblx0Y29uc3QgayA9IGNteWtbM10gLyAxMDA7XG5cblx0Y29uc3QgciA9IDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspO1xuXHRjb25zdCBnID0gMSAtIE1hdGgubWluKDEsIG0gKiAoMSAtIGspICsgayk7XG5cdGNvbnN0IGIgPSAxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoucmdiID0gZnVuY3Rpb24gKHh5eikge1xuXHRjb25zdCB4ID0geHl6WzBdIC8gMTAwO1xuXHRjb25zdCB5ID0geHl6WzFdIC8gMTAwO1xuXHRjb25zdCB6ID0geHl6WzJdIC8gMTAwO1xuXHRsZXQgcjtcblx0bGV0IGc7XG5cdGxldCBiO1xuXG5cdHIgPSAoeCAqIDMuMjQwNikgKyAoeSAqIC0xLjUzNzIpICsgKHogKiAtMC40OTg2KTtcblx0ZyA9ICh4ICogLTAuOTY4OSkgKyAoeSAqIDEuODc1OCkgKyAoeiAqIDAuMDQxNSk7XG5cdGIgPSAoeCAqIDAuMDU1NykgKyAoeSAqIC0wLjIwNDApICsgKHogKiAxLjA1NzApO1xuXG5cdC8vIEFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogKHIgKiogKDEuMCAvIDIuNCkpKSAtIDAuMDU1KVxuXHRcdDogciAqIDEyLjkyO1xuXG5cdGcgPSBnID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogKGcgKiogKDEuMCAvIDIuNCkpKSAtIDAuMDU1KVxuXHRcdDogZyAqIDEyLjkyO1xuXG5cdGIgPSBiID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogKGIgKiogKDEuMCAvIDIuNCkpKSAtIDAuMDU1KVxuXHRcdDogYiAqIDEyLjkyO1xuXG5cdHIgPSBNYXRoLm1pbihNYXRoLm1heCgwLCByKSwgMSk7XG5cdGcgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBnKSwgMSk7XG5cdGIgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBiKSwgMSk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LmxhYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0bGV0IHggPSB4eXpbMF07XG5cdGxldCB5ID0geHl6WzFdO1xuXHRsZXQgeiA9IHh5elsyXTtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gKHggKiogKDEgLyAzKSkgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyAoeSAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/ICh6ICoqICgxIC8gMykpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGNvbnN0IGwgPSAoMTE2ICogeSkgLSAxNjtcblx0Y29uc3QgYSA9IDUwMCAqICh4IC0geSk7XG5cdGNvbnN0IGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmxhYi54eXogPSBmdW5jdGlvbiAobGFiKSB7XG5cdGNvbnN0IGwgPSBsYWJbMF07XG5cdGNvbnN0IGEgPSBsYWJbMV07XG5cdGNvbnN0IGIgPSBsYWJbMl07XG5cdGxldCB4O1xuXHRsZXQgeTtcblx0bGV0IHo7XG5cblx0eSA9IChsICsgMTYpIC8gMTE2O1xuXHR4ID0gYSAvIDUwMCArIHk7XG5cdHogPSB5IC0gYiAvIDIwMDtcblxuXHRjb25zdCB5MiA9IHkgKiogMztcblx0Y29uc3QgeDIgPSB4ICoqIDM7XG5cdGNvbnN0IHoyID0geiAqKiAzO1xuXHR5ID0geTIgPiAwLjAwODg1NiA/IHkyIDogKHkgLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eCA9IHgyID4gMC4wMDg4NTYgPyB4MiA6ICh4IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHogPSB6MiA+IDAuMDA4ODU2ID8gejIgOiAoeiAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXG5cdHggKj0gOTUuMDQ3O1xuXHR5ICo9IDEwMDtcblx0eiAqPSAxMDguODgzO1xuXG5cdHJldHVybiBbeCwgeSwgel07XG59O1xuXG5jb252ZXJ0LmxhYi5sY2ggPSBmdW5jdGlvbiAobGFiKSB7XG5cdGNvbnN0IGwgPSBsYWJbMF07XG5cdGNvbnN0IGEgPSBsYWJbMV07XG5cdGNvbnN0IGIgPSBsYWJbMl07XG5cdGxldCBoO1xuXG5cdGNvbnN0IGhyID0gTWF0aC5hdGFuMihiLCBhKTtcblx0aCA9IGhyICogMzYwIC8gMiAvIE1hdGguUEk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRjb25zdCBjID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuXG5cdHJldHVybiBbbCwgYywgaF07XG59O1xuXG5jb252ZXJ0LmxjaC5sYWIgPSBmdW5jdGlvbiAobGNoKSB7XG5cdGNvbnN0IGwgPSBsY2hbMF07XG5cdGNvbnN0IGMgPSBsY2hbMV07XG5cdGNvbnN0IGggPSBsY2hbMl07XG5cblx0Y29uc3QgaHIgPSBoIC8gMzYwICogMiAqIE1hdGguUEk7XG5cdGNvbnN0IGEgPSBjICogTWF0aC5jb3MoaHIpO1xuXHRjb25zdCBiID0gYyAqIE1hdGguc2luKGhyKTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MsIHNhdHVyYXRpb24gPSBudWxsKSB7XG5cdGNvbnN0IFtyLCBnLCBiXSA9IGFyZ3M7XG5cdGxldCB2YWx1ZSA9IHNhdHVyYXRpb24gPT09IG51bGwgPyBjb252ZXJ0LnJnYi5oc3YoYXJncylbMl0gOiBzYXR1cmF0aW9uOyAvLyBIc3YgLT4gYW5zaTE2IG9wdGltaXphdGlvblxuXG5cdHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAvIDUwKTtcblxuXHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRyZXR1cm4gMzA7XG5cdH1cblxuXHRsZXQgYW5zaSA9IDMwXG5cdFx0KyAoKE1hdGgucm91bmQoYiAvIDI1NSkgPDwgMilcblx0XHR8IChNYXRoLnJvdW5kKGcgLyAyNTUpIDw8IDEpXG5cdFx0fCBNYXRoLnJvdW5kKHIgLyAyNTUpKTtcblxuXHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRhbnNpICs9IDYwO1xuXHR9XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0Lmhzdi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHQvLyBPcHRpbWl6YXRpb24gaGVyZTsgd2UgYWxyZWFkeSBrbm93IHRoZSB2YWx1ZSBhbmQgZG9uJ3QgbmVlZCB0byBnZXRcblx0Ly8gaXQgY29udmVydGVkIGZvciB1cy5cblx0cmV0dXJuIGNvbnZlcnQucmdiLmFuc2kxNihjb252ZXJ0Lmhzdi5yZ2IoYXJncyksIGFyZ3NbMl0pO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTI1NiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGNvbnN0IHIgPSBhcmdzWzBdO1xuXHRjb25zdCBnID0gYXJnc1sxXTtcblx0Y29uc3QgYiA9IGFyZ3NbMl07XG5cblx0Ly8gV2UgdXNlIHRoZSBleHRlbmRlZCBncmV5c2NhbGUgcGFsZXR0ZSBoZXJlLCB3aXRoIHRoZSBleGNlcHRpb24gb2Zcblx0Ly8gYmxhY2sgYW5kIHdoaXRlLiBub3JtYWwgcGFsZXR0ZSBvbmx5IGhhcyA0IGdyZXlzY2FsZSBzaGFkZXMuXG5cdGlmIChyID09PSBnICYmIGcgPT09IGIpIHtcblx0XHRpZiAociA8IDgpIHtcblx0XHRcdHJldHVybiAxNjtcblx0XHR9XG5cblx0XHRpZiAociA+IDI0OCkge1xuXHRcdFx0cmV0dXJuIDIzMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHIgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdH1cblxuXHRjb25zdCBhbnNpID0gMTZcblx0XHQrICgzNiAqIE1hdGgucm91bmQociAvIDI1NSAqIDUpKVxuXHRcdCsgKDYgKiBNYXRoLnJvdW5kKGcgLyAyNTUgKiA1KSlcblx0XHQrIE1hdGgucm91bmQoYiAvIDI1NSAqIDUpO1xuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5hbnNpMTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0bGV0IGNvbG9yID0gYXJncyAlIDEwO1xuXG5cdC8vIEhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGNvbG9yID09PSAwIHx8IGNvbG9yID09PSA3KSB7XG5cdFx0aWYgKGFyZ3MgPiA1MCkge1xuXHRcdFx0Y29sb3IgKz0gMy41O1xuXHRcdH1cblxuXHRcdGNvbG9yID0gY29sb3IgLyAxMC41ICogMjU1O1xuXG5cdFx0cmV0dXJuIFtjb2xvciwgY29sb3IsIGNvbG9yXTtcblx0fVxuXG5cdGNvbnN0IG11bHQgPSAofn4oYXJncyA+IDUwKSArIDEpICogMC41O1xuXHRjb25zdCByID0gKChjb2xvciAmIDEpICogbXVsdCkgKiAyNTU7XG5cdGNvbnN0IGcgPSAoKChjb2xvciA+PiAxKSAmIDEpICogbXVsdCkgKiAyNTU7XG5cdGNvbnN0IGIgPSAoKChjb2xvciA+PiAyKSAmIDEpICogbXVsdCkgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQuYW5zaTI1Ni5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChhcmdzID49IDIzMikge1xuXHRcdGNvbnN0IGMgPSAoYXJncyAtIDIzMikgKiAxMCArIDg7XG5cdFx0cmV0dXJuIFtjLCBjLCBjXTtcblx0fVxuXG5cdGFyZ3MgLT0gMTY7XG5cblx0bGV0IHJlbTtcblx0Y29uc3QgciA9IE1hdGguZmxvb3IoYXJncyAvIDM2KSAvIDUgKiAyNTU7XG5cdGNvbnN0IGcgPSBNYXRoLmZsb29yKChyZW0gPSBhcmdzICUgMzYpIC8gNikgLyA1ICogMjU1O1xuXHRjb25zdCBiID0gKHJlbSAlIDYpIC8gNSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGV4ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgaW50ZWdlciA9ICgoTWF0aC5yb3VuZChhcmdzWzBdKSAmIDB4RkYpIDw8IDE2KVxuXHRcdCsgKChNYXRoLnJvdW5kKGFyZ3NbMV0pICYgMHhGRikgPDwgOClcblx0XHQrIChNYXRoLnJvdW5kKGFyZ3NbMl0pICYgMHhGRik7XG5cblx0Y29uc3Qgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn07XG5cbmNvbnZlcnQuaGV4LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGNvbnN0IG1hdGNoID0gYXJncy50b1N0cmluZygxNikubWF0Y2goL1thLWYwLTldezZ9fFthLWYwLTldezN9L2kpO1xuXHRpZiAoIW1hdGNoKSB7XG5cdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0fVxuXG5cdGxldCBjb2xvclN0cmluZyA9IG1hdGNoWzBdO1xuXG5cdGlmIChtYXRjaFswXS5sZW5ndGggPT09IDMpIHtcblx0XHRjb2xvclN0cmluZyA9IGNvbG9yU3RyaW5nLnNwbGl0KCcnKS5tYXAoY2hhciA9PiB7XG5cdFx0XHRyZXR1cm4gY2hhciArIGNoYXI7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHRjb25zdCBpbnRlZ2VyID0gcGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblx0Y29uc3QgciA9IChpbnRlZ2VyID4+IDE2KSAmIDB4RkY7XG5cdGNvbnN0IGcgPSAoaW50ZWdlciA+PiA4KSAmIDB4RkY7XG5cdGNvbnN0IGIgPSBpbnRlZ2VyICYgMHhGRjtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGNnID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCBtYXggPSBNYXRoLm1heChNYXRoLm1heChyLCBnKSwgYik7XG5cdGNvbnN0IG1pbiA9IE1hdGgubWluKE1hdGgubWluKHIsIGcpLCBiKTtcblx0Y29uc3QgY2hyb21hID0gKG1heCAtIG1pbik7XG5cdGxldCBncmF5c2NhbGU7XG5cdGxldCBodWU7XG5cblx0aWYgKGNocm9tYSA8IDEpIHtcblx0XHRncmF5c2NhbGUgPSBtaW4gLyAoMSAtIGNocm9tYSk7XG5cdH0gZWxzZSB7XG5cdFx0Z3JheXNjYWxlID0gMDtcblx0fVxuXG5cdGlmIChjaHJvbWEgPD0gMCkge1xuXHRcdGh1ZSA9IDA7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSByKSB7XG5cdFx0aHVlID0gKChnIC0gYikgLyBjaHJvbWEpICUgNjtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IGcpIHtcblx0XHRodWUgPSAyICsgKGIgLSByKSAvIGNocm9tYTtcblx0fSBlbHNlIHtcblx0XHRodWUgPSA0ICsgKHIgLSBnKSAvIGNocm9tYTtcblx0fVxuXG5cdGh1ZSAvPSA2O1xuXHRodWUgJT0gMTtcblxuXHRyZXR1cm4gW2h1ZSAqIDM2MCwgY2hyb21hICogMTAwLCBncmF5c2NhbGUgKiAxMDBdO1xufTtcblxuY29udmVydC5oc2wuaGNnID0gZnVuY3Rpb24gKGhzbCkge1xuXHRjb25zdCBzID0gaHNsWzFdIC8gMTAwO1xuXHRjb25zdCBsID0gaHNsWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGMgPSBsIDwgMC41ID8gKDIuMCAqIHMgKiBsKSA6ICgyLjAgKiBzICogKDEuMCAtIGwpKTtcblxuXHRsZXQgZiA9IDA7XG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9IChsIC0gMC41ICogYykgLyAoMS4wIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzbFswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5oY2cgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGNvbnN0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cblx0Y29uc3QgYyA9IHMgKiB2O1xuXHRsZXQgZiA9IDA7XG5cblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzdlswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5yZ2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGggPSBoY2dbMF0gLyAzNjA7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0aWYgKGMgPT09IDAuMCkge1xuXHRcdHJldHVybiBbZyAqIDI1NSwgZyAqIDI1NSwgZyAqIDI1NV07XG5cdH1cblxuXHRjb25zdCBwdXJlID0gWzAsIDAsIDBdO1xuXHRjb25zdCBoaSA9IChoICUgMSkgKiA2O1xuXHRjb25zdCB2ID0gaGkgJSAxO1xuXHRjb25zdCB3ID0gMSAtIHY7XG5cdGxldCBtZyA9IDA7XG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUgKi9cblx0c3dpdGNoIChNYXRoLmZsb29yKGhpKSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gdjsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdGNhc2UgMTpcblx0XHRcdHB1cmVbMF0gPSB3OyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gdzsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdGNhc2UgNDpcblx0XHRcdHB1cmVbMF0gPSB2OyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSB3O1xuXHR9XG5cdC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUgKi9cblxuXHRtZyA9ICgxLjAgLSBjKSAqIGc7XG5cblx0cmV0dXJuIFtcblx0XHQoYyAqIHB1cmVbMF0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzFdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsyXSArIG1nKSAqIDI1NVxuXHRdO1xufTtcblxuY29udmVydC5oY2cuaHN2ID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGNvbnN0IHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0bGV0IGYgPSAwO1xuXG5cdGlmICh2ID4gMC4wKSB7XG5cdFx0ZiA9IGMgLyB2O1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIGYgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHNsID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGwgPSBnICogKDEuMCAtIGMpICsgMC41ICogYztcblx0bGV0IHMgPSAwO1xuXG5cdGlmIChsID4gMC4wICYmIGwgPCAwLjUpIHtcblx0XHRzID0gYyAvICgyICogbCk7XG5cdH0gZWxzZVxuXHRpZiAobCA+PSAwLjUgJiYgbCA8IDEuMCkge1xuXHRcdHMgPSBjIC8gKDIgKiAoMSAtIGwpKTtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmh3YiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblx0Y29uc3QgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHRyZXR1cm4gW2hjZ1swXSwgKHYgLSBjKSAqIDEwMCwgKDEgLSB2KSAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmh3Yi5oY2cgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdGNvbnN0IHcgPSBod2JbMV0gLyAxMDA7XG5cdGNvbnN0IGIgPSBod2JbMl0gLyAxMDA7XG5cdGNvbnN0IHYgPSAxIC0gYjtcblx0Y29uc3QgYyA9IHYgLSB3O1xuXHRsZXQgZyA9IDA7XG5cblx0aWYgKGMgPCAxKSB7XG5cdFx0ZyA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtod2JbMF0sIGMgKiAxMDAsIGcgKiAxMDBdO1xufTtcblxuY29udmVydC5hcHBsZS5yZ2IgPSBmdW5jdGlvbiAoYXBwbGUpIHtcblx0cmV0dXJuIFsoYXBwbGVbMF0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsxXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzJdIC8gNjU1MzUpICogMjU1XTtcbn07XG5cbmNvbnZlcnQucmdiLmFwcGxlID0gZnVuY3Rpb24gKHJnYikge1xuXHRyZXR1cm4gWyhyZ2JbMF0gLyAyNTUpICogNjU1MzUsIChyZ2JbMV0gLyAyNTUpICogNjU1MzUsIChyZ2JbMl0gLyAyNTUpICogNjU1MzVdO1xufTtcblxuY29udmVydC5ncmF5LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHNsID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFswLCAwLCBhcmdzWzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oc3YgPSBjb252ZXJ0LmdyYXkuaHNsO1xuXG5jb252ZXJ0LmdyYXkuaHdiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAxMDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmNteWsgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDAsIDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmxhYiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbZ3JheVswXSwgMCwgMF07XG59O1xuXG5jb252ZXJ0LmdyYXkuaGV4ID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0Y29uc3QgdmFsID0gTWF0aC5yb3VuZChncmF5WzBdIC8gMTAwICogMjU1KSAmIDB4RkY7XG5cdGNvbnN0IGludGVnZXIgPSAodmFsIDw8IDE2KSArICh2YWwgPDwgOCkgKyB2YWw7XG5cblx0Y29uc3Qgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn07XG5cbmNvbnZlcnQucmdiLmdyYXkgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHZhbCA9IChyZ2JbMF0gKyByZ2JbMV0gKyByZ2JbMl0pIC8gMztcblx0cmV0dXJuIFt2YWwgLyAyNTUgKiAxMDBdO1xufTtcbiIsImNvbnN0IGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xuY29uc3Qgcm91dGUgPSByZXF1aXJlKCcuL3JvdXRlJyk7XG5cbmNvbnN0IGNvbnZlcnQgPSB7fTtcblxuY29uc3QgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5mdW5jdGlvbiB3cmFwUmF3KGZuKSB7XG5cdGNvbnN0IHdyYXBwZWRGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0Y29uc3QgYXJnMCA9IGFyZ3NbMF07XG5cdFx0aWYgKGFyZzAgPT09IHVuZGVmaW5lZCB8fCBhcmcwID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gYXJnMDtcblx0XHR9XG5cblx0XHRpZiAoYXJnMC5sZW5ndGggPiAxKSB7XG5cdFx0XHRhcmdzID0gYXJnMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4oYXJncyk7XG5cdH07XG5cblx0Ly8gUHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5mdW5jdGlvbiB3cmFwUm91bmRlZChmbikge1xuXHRjb25zdCB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGNvbnN0IGFyZzAgPSBhcmdzWzBdO1xuXG5cdFx0aWYgKGFyZzAgPT09IHVuZGVmaW5lZCB8fCBhcmcwID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gYXJnMDtcblx0XHR9XG5cblx0XHRpZiAoYXJnMC5sZW5ndGggPiAxKSB7XG5cdFx0XHRhcmdzID0gYXJnMDtcblx0XHR9XG5cblx0XHRjb25zdCByZXN1bHQgPSBmbihhcmdzKTtcblxuXHRcdC8vIFdlJ3JlIGFzc3VtaW5nIHRoZSByZXN1bHQgaXMgYW4gYXJyYXkgaGVyZS5cblx0XHQvLyBzZWUgbm90aWNlIGluIGNvbnZlcnNpb25zLmpzOyBkb24ndCB1c2UgYm94IHR5cGVzXG5cdFx0Ly8gaW4gY29udmVyc2lvbiBmdW5jdGlvbnMuXG5cdFx0aWYgKHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRmb3IgKGxldCBsZW4gPSByZXN1bHQubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdC8vIFByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxubW9kZWxzLmZvckVhY2goZnJvbU1vZGVsID0+IHtcblx0Y29udmVydFtmcm9tTW9kZWxdID0ge307XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmNoYW5uZWxzfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0ubGFiZWxzfSk7XG5cblx0Y29uc3Qgcm91dGVzID0gcm91dGUoZnJvbU1vZGVsKTtcblx0Y29uc3Qgcm91dGVNb2RlbHMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpO1xuXG5cdHJvdXRlTW9kZWxzLmZvckVhY2godG9Nb2RlbCA9PiB7XG5cdFx0Y29uc3QgZm4gPSByb3V0ZXNbdG9Nb2RlbF07XG5cblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0gPSB3cmFwUm91bmRlZChmbik7XG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdLnJhdyA9IHdyYXBSYXcoZm4pO1xuXHR9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnQ7XG4iLCJjb25zdCBjb252ZXJzaW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbnMnKTtcblxuLypcblx0VGhpcyBmdW5jdGlvbiByb3V0ZXMgYSBtb2RlbCB0byBhbGwgb3RoZXIgbW9kZWxzLlxuXG5cdGFsbCBmdW5jdGlvbnMgdGhhdCBhcmUgcm91dGVkIGhhdmUgYSBwcm9wZXJ0eSBgLmNvbnZlcnNpb25gIGF0dGFjaGVkXG5cdHRvIHRoZSByZXR1cm5lZCBzeW50aGV0aWMgZnVuY3Rpb24uIFRoaXMgcHJvcGVydHkgaXMgYW4gYXJyYXlcblx0b2Ygc3RyaW5ncywgZWFjaCB3aXRoIHRoZSBzdGVwcyBpbiBiZXR3ZWVuIHRoZSAnZnJvbScgYW5kICd0bydcblx0Y29sb3IgbW9kZWxzIChpbmNsdXNpdmUpLlxuXG5cdGNvbnZlcnNpb25zIHRoYXQgYXJlIG5vdCBwb3NzaWJsZSBzaW1wbHkgYXJlIG5vdCBpbmNsdWRlZC5cbiovXG5cbmZ1bmN0aW9uIGJ1aWxkR3JhcGgoKSB7XG5cdGNvbnN0IGdyYXBoID0ge307XG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS9vYmplY3Qta2V5cy12cy1mb3ItaW4td2l0aC1jbG9zdXJlLzNcblx0Y29uc3QgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5cdGZvciAobGV0IGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRncmFwaFttb2RlbHNbaV1dID0ge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vMS12cy1pbmZpbml0eVxuXHRcdFx0Ly8gbWljcm8tb3B0LCBidXQgdGhpcyBpcyBzaW1wbGUuXG5cdFx0XHRkaXN0YW5jZTogLTEsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CcmVhZHRoLWZpcnN0X3NlYXJjaFxuZnVuY3Rpb24gZGVyaXZlQkZTKGZyb21Nb2RlbCkge1xuXHRjb25zdCBncmFwaCA9IGJ1aWxkR3JhcGgoKTtcblx0Y29uc3QgcXVldWUgPSBbZnJvbU1vZGVsXTsgLy8gVW5zaGlmdCAtPiBxdWV1ZSAtPiBwb3BcblxuXHRncmFwaFtmcm9tTW9kZWxdLmRpc3RhbmNlID0gMDtcblxuXHR3aGlsZSAocXVldWUubGVuZ3RoKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHF1ZXVlLnBvcCgpO1xuXHRcdGNvbnN0IGFkamFjZW50cyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zW2N1cnJlbnRdKTtcblxuXHRcdGZvciAobGV0IGxlbiA9IGFkamFjZW50cy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGNvbnN0IGFkamFjZW50ID0gYWRqYWNlbnRzW2ldO1xuXHRcdFx0Y29uc3Qgbm9kZSA9IGdyYXBoW2FkamFjZW50XTtcblxuXHRcdFx0aWYgKG5vZGUuZGlzdGFuY2UgPT09IC0xKSB7XG5cdFx0XHRcdG5vZGUuZGlzdGFuY2UgPSBncmFwaFtjdXJyZW50XS5kaXN0YW5jZSArIDE7XG5cdFx0XHRcdG5vZGUucGFyZW50ID0gY3VycmVudDtcblx0XHRcdFx0cXVldWUudW5zaGlmdChhZGphY2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG5mdW5jdGlvbiBsaW5rKGZyb20sIHRvKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuXHRcdHJldHVybiB0byhmcm9tKGFyZ3MpKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpIHtcblx0Y29uc3QgcGF0aCA9IFtncmFwaFt0b01vZGVsXS5wYXJlbnQsIHRvTW9kZWxdO1xuXHRsZXQgZm4gPSBjb252ZXJzaW9uc1tncmFwaFt0b01vZGVsXS5wYXJlbnRdW3RvTW9kZWxdO1xuXG5cdGxldCBjdXIgPSBncmFwaFt0b01vZGVsXS5wYXJlbnQ7XG5cdHdoaWxlIChncmFwaFtjdXJdLnBhcmVudCkge1xuXHRcdHBhdGgudW5zaGlmdChncmFwaFtjdXJdLnBhcmVudCk7XG5cdFx0Zm4gPSBsaW5rKGNvbnZlcnNpb25zW2dyYXBoW2N1cl0ucGFyZW50XVtjdXJdLCBmbik7XG5cdFx0Y3VyID0gZ3JhcGhbY3VyXS5wYXJlbnQ7XG5cdH1cblxuXHRmbi5jb252ZXJzaW9uID0gcGF0aDtcblx0cmV0dXJuIGZuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmcm9tTW9kZWwpIHtcblx0Y29uc3QgZ3JhcGggPSBkZXJpdmVCRlMoZnJvbU1vZGVsKTtcblx0Y29uc3QgY29udmVyc2lvbiA9IHt9O1xuXG5cdGNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGdyYXBoKTtcblx0Zm9yIChsZXQgbGVuID0gbW9kZWxzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdGNvbnN0IHRvTW9kZWwgPSBtb2RlbHNbaV07XG5cdFx0Y29uc3Qgbm9kZSA9IGdyYXBoW3RvTW9kZWxdO1xuXG5cdFx0aWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cdFx0XHQvLyBObyBwb3NzaWJsZSBjb252ZXJzaW9uLCBvciB0aGlzIG5vZGUgaXMgdGhlIHNvdXJjZSBtb2RlbC5cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnZlcnNpb25bdG9Nb2RlbF0gPSB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCk7XG5cdH1cblxuXHRyZXR1cm4gY29udmVyc2lvbjtcbn07XG5cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0XCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxyXG5cdFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcclxuXHRcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxyXG5cdFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxyXG5cdFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxyXG5cdFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcclxuXHRcImJsYWNrXCI6IFswLCAwLCAwXSxcclxuXHRcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcclxuXHRcImJsdWVcIjogWzAsIDAsIDI1NV0sXHJcblx0XCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxyXG5cdFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcclxuXHRcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXHJcblx0XCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXHJcblx0XCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXHJcblx0XCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXHJcblx0XCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcclxuXHRcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcclxuXHRcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcclxuXHRcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcclxuXHRcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxyXG5cdFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcclxuXHRcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXHJcblx0XCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXHJcblx0XCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxyXG5cdFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcclxuXHRcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXHJcblx0XCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXHJcblx0XCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxyXG5cdFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcclxuXHRcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxyXG5cdFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcclxuXHRcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcclxuXHRcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXHJcblx0XCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXHJcblx0XCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcclxuXHRcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXHJcblx0XCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcclxuXHRcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxyXG5cdFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxyXG5cdFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcclxuXHRcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXHJcblx0XCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcclxuXHRcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcclxuXHRcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcclxuXHRcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXHJcblx0XCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcclxuXHRcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxyXG5cdFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXHJcblx0XCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcclxuXHRcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXHJcblx0XCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXHJcblx0XCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXHJcblx0XCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXHJcblx0XCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcclxuXHRcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxyXG5cdFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcclxuXHRcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXHJcblx0XCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcclxuXHRcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXHJcblx0XCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXHJcblx0XCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXHJcblx0XCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcclxuXHRcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcclxuXHRcImxpZ2h0c2VhZ3JlZW5cIjogWzMyLCAxNzgsIDE3MF0sXHJcblx0XCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxyXG5cdFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxyXG5cdFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxyXG5cdFwibGltZVwiOiBbMCwgMjU1LCAwXSxcclxuXHRcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxyXG5cdFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxyXG5cdFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxyXG5cdFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXHJcblx0XCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxyXG5cdFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxyXG5cdFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE5XSxcclxuXHRcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxyXG5cdFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcclxuXHRcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXHJcblx0XCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXHJcblx0XCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXHJcblx0XCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcclxuXHRcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXHJcblx0XCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxyXG5cdFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxyXG5cdFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxyXG5cdFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcclxuXHRcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxyXG5cdFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcclxuXHRcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcclxuXHRcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxyXG5cdFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcclxuXHRcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXHJcblx0XCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcclxuXHRcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXHJcblx0XCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcclxuXHRcInBhbGV2aW9sZXRyZWRcIjogWzIxOSwgMTEyLCAxNDddLFxyXG5cdFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXHJcblx0XCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxyXG5cdFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcclxuXHRcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxyXG5cdFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXHJcblx0XCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcclxuXHRcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxyXG5cdFwicmViZWNjYXB1cnBsZVwiOiBbMTAyLCA1MSwgMTUzXSxcclxuXHRcInJlZFwiOiBbMjU1LCAwLCAwXSxcclxuXHRcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXHJcblx0XCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXHJcblx0XCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxyXG5cdFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcclxuXHRcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXHJcblx0XCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxyXG5cdFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxyXG5cdFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXHJcblx0XCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxyXG5cdFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXHJcblx0XCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXHJcblx0XCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxyXG5cdFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcclxuXHRcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcclxuXHRcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXHJcblx0XCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXHJcblx0XCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcclxuXHRcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxyXG5cdFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxyXG5cdFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcclxuXHRcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcclxuXHRcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XSxcclxuXHRcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxyXG5cdFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXHJcblx0XCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXVxyXG59O1xyXG4iLCJpbXBvcnQgKiBhcyBjb252ZXJ0IGZyb20gJ2NvbG9yLWNvbnZlcnQnXG5cbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uIGZvciBzdHJpbmdzICovXG5leHBvcnQgdHlwZSBSYW5nZVN0ciA9IFtudW1iZXIsIG51bWJlciwgc3RyaW5nW11dXG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiBmb3IgbGluZSAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VMaW5lID0gW251bWJlciwgbnVtYmVyLCBudW1iZXI/XVxuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gKi9cbmV4cG9ydCB0eXBlIFJhbmdlU2ltcGxlID0gUmFuZ2VTdHIgfCBSYW5nZUxpbmVcblxuZXhwb3J0IGludGVyZmFjZSBSYW5nZSB7XG4gIC8qKiBUaGUgc3R5bGUgdG8gZHJhdyByYW5nZS4gSXQgaXMgZWl0aGVyIG9mIFtcImxpbmVcIiwgXCJjdXJ2ZVwiLCBcImFycm93XCIsIFwic3RyXCJdLiBJZiBcInN0clwiIGlzIGNob3NlbiwgdGhlIG9wdGluYWwgcGFyYW1ldGVyIGBzdHJgIG11c3QgYmUgZ2l2ZW4uIEZvciBvdGhlciBzdHlsZXMsIHlvdSBjYW4gc2V0IGxlZnQgc3R5bGUgYW5kIHJpZ2h0IHN0eWxlIGxpZSBcImxpbmUsYXJyb3dcIi4gKi9cbiAgc3R5bGU6IHN0cmluZ1xuICAvKiogVGhlIGNvbG9yIHRvIGRyYXcgcmFuZ2UsIGUuZy4gXCIjMDAwMDAwXCIgZm9yIGJsYWNrLiAqL1xuICBjb2xvcjogc3RyaW5nXG4gIC8qKiBUaGUgYmVnaW5uaW5nIGluZGV4IG9mIHRoZSByYW5nZS4gKi9cbiAgYmVnOiBudW1iZXJcbiAgLyoqIFRoZSBlbmRpbmcgaW5kZXggb2YgdGhlIHJhbmdlLiBOb3RlIHRoYXQgaW5kZXhlcyBhcmUgaW5jbHVzaXZlLiAqL1xuICBlbmQ6IG51bWJlclxuICAvKiogVGhlIHN0ZXAgb2YgdGhlIHJhbmdlIFtgYmVnYCwgYGVuZGBdLiBGb3IgZXhhbXBsZSwgYSByYW5nZSBbYGJlZ2AsIGBlbmRgLCBgc3RlcGBdID0gWzEsIDgsIDNdIHJlcHJlc2VudHMgY29udGludW91cyByYW5nZXMgW1tgYmVnYCwgYGVuZGBdXT1bWzEsIDNdLCBbNCwgNl0sIFs3LCA4XV0gKi9cbiAgc3RlcD86IG51bWJlclxuICAvKiogVGhlIHN0cmluZ3Mgb2YgdGhlIHJhbmdlLiBJdHMgbGVuZ3RoIG11c3QgYmUgZXF1YWwgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcmFuZ2UgYGVuZGAgLSBgYmVnYCArIDEgKi9cbiAgc3RyPzogc3RyaW5nW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYW5nZVB4IHtcbiAgLyoqIFRoZSBzdHlsZSB0byBkcmF3IHJhbmdlLiBJdCBpcyBlaXRoZXIgb2YgW1wibGluZVwiLCBcImN1cnZlXCIsIFwiYXJyb3dcIiwgXCJzdHJcIl0uIElmIFwic3RyXCIgaXMgY2hvc2VuLCB0aGUgb3B0aW5hbCBwYXJhbWV0ZXIgYHN0cmAgbXVzdCBiZSBnaXZlbi4gRm9yIG90aGVyIHN0eWxlcywgeW91IGNhbiBzZXQgbGVmdCBzdHlsZSBhbmQgcmlnaHQgc3R5bGUgbGllIFwibGluZSxhcnJvd1wiLiAqL1xuICBzdHlsZTogc3RyaW5nXG4gIC8qKiBUaGUgY29sb3IgdG8gZHJhdyByYW5nZSwgZS5nLiBcIiMwMDAwMDBcIiBmb3IgYmxhY2suICovXG4gIGNvbG9yOiBzdHJpbmdcbiAgLyoqIFRoZSB4LWNvb3JkaW5hdGUgd2hpY2ggYmVnaW5zIHRoZSByYW5nZS4gKi9cbiAgeF9iZWc6IG51bWJlclxuICAvKiogVGhlIHgtY29vcmRpbmF0ZSB3aGljaCBlbmRzIHRoZSByYW5nZS4gKi9cbiAgeF9lbmQ6IG51bWJlclxuICAvKiogVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcmFuZ2UuICovXG4gIHk6IG51bWJlclxuICAvKiogVGhlIHN0cmluZ3Mgb2YgdGhlIHJhbmdlLiBJdHMgbGVuZ3RoIG11c3QgYmUgZXF1YWwgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcmFuZ2UgYGVuZGAgLSBgYmVnYCArIDEgKi9cbiAgc3RyPzogc3RyaW5nW11cbn1cblxuZXhwb3J0IGNsYXNzIFZpc1N0ciB7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gIHByaXZhdGUgc3RyX3g6IG51bWJlclxuICBwcml2YXRlIHN0cl95OiBudW1iZXJcbiAgcHJpdmF0ZSBmb250X3NpemU6IG51bWJlclxuICBwcml2YXRlIGZvbnRfc2l6ZV9oYWxmOiBudW1iZXJcbiAgcHJpdmF0ZSBmb250X3R5cGU6IHN0cmluZ1xuICAvKiogVGhlIG9mZnNldCB0byBzdGFydCBkcmF3aW5nIGEgcmFuZ2UgZnJvbSBhIGNlbnRlciBwb3NpdGlvbiBvZiBhbiBpbmRleC4gKi9cbiAgcHJpdmF0ZSByYW5nZV9iZWdfb2Zmc2V0OiBudW1iZXJcbiAgcHJpdmF0ZSByYW5nZV9lbmRfb2Zmc2V0OiBudW1iZXJcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGNhbnZhcyBIVE1MQ2FudmFzRWxlbWVudFxuICAgKiBAcGFyYW0gZm9udF9zaXplIGZvbnQgc2l6ZVxuICAgKiBAcGFyYW0gZm9udF90eXBlIGZvbnQgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICBmb250X3NpemUgPSAzMixcbiAgICBmb250X3R5cGUgPSAnQ291cmllcicsXG4gICkge1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gICAgdGhpcy5mb250X3NpemUgPSBmb250X3NpemVcbiAgICB0aGlzLmZvbnRfc2l6ZV9oYWxmID0gdGhpcy5mb250X3NpemUgLyAyXG4gICAgdGhpcy5mb250X3R5cGUgPSBmb250X3R5cGVcbiAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIHRoaXMuc3RyX3ggPSB0aGlzLmZvbnRfc2l6ZVxuICAgIHRoaXMuc3RyX3kgPSB0aGlzLmZvbnRfc2l6ZSAqIDIgKyB0aGlzLmZvbnRfc2l6ZV9oYWxmXG4gICAgdGhpcy5yYW5nZV9iZWdfb2Zmc2V0ID0gLXRoaXMuZm9udF9zaXplIC8gNFxuICAgIHRoaXMucmFuZ2VfZW5kX29mZnNldCA9IHRoaXMuZm9udF9zaXplIC8gNFxuICB9XG5cbiAgLyoqIENsZWFyIHRoZSBjYW52YXMuICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHgtY29vcmRpbmF0ZSB3aGljaCBpcyBhIGJlZ2lubmluZyBvZiBhIHJhbmdlLlxuICAgKlxuICAgKiBAcGFyYW0gaWR4IGluZGV4IG9mIGEgcmFuZ2VcbiAgICogQHJldHVybiBUaGUgeC1jb29yZGluYXRlIG9mIGEgcmFuZ2UgYmVnaW5uaW5nIGF0IGBpZHhgXG4gICAqL1xuICByYW5nZUJlZyhpZHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIGlkeCArIHRoaXMucmFuZ2VfYmVnX29mZnNldFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHgtY29vcmRpbmF0ZSB3aGljaCBpcyBhIGVuZGluZyBvZiBhIHJhbmdlLlxuICAgKlxuICAgKiBAcGFyYW0gaWR4IGluZGV4IG9mIGEgcmFuZ2VcbiAgICogQHJldHVybiBUaGUgeC1jb29yZGluYXRlIG9mIGEgcmFuZ2UgZW5kaW5nIGF0IGBpZHhgXG4gICAqL1xuICByYW5nZUVuZChpZHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIGlkeCArIHRoaXMucmFuZ2VfZW5kX29mZnNldFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgaGVpZ2h0IG9mIGEgZ2l2ZW4gcmFuZ2UuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UuXG4gICAqL1xuICByYW5nZUhlaWdodChyOiBSYW5nZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHIuc3R5bGUgPT09ICdzdHInID8gdGhpcy5mb250X3NpemUgOiBNYXRoLnJvdW5kKHRoaXMuZm9udF9zaXplICogMC41KVxuICB9XG5cbiAgLyoqXG4gICAqIEZvciBhIHJhbmdlIG5vdCB0byBkcmF3IHN0cmluZ3MsIHNwbGl0IGl0IHRvIHRocmVlIHBhcnRzIGxlZnQsIGNlbnRlciwgYW5kIHJpZ2h0LlxuICAgKiBAcGFyYW0gcnB4IEdpdmVuIHJhbmdlIHRvIHNwbGl0LlxuICAgKi9cbiAgc3BsaXRSYW5nZVB4KHJweDogUmFuZ2VQeCk6IFJhbmdlUHhbXSB7XG4gICAgY29uc3Qgc3R5bGVzID0gcnB4LnN0eWxlLnNwbGl0KCcsJylcblxuICAgIGxldCBybCA9IE9iamVjdC5hc3NpZ24oe30sIHJweClcbiAgICBsZXQgcmMgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpXG4gICAgbGV0IHJyID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KVxuICAgIHJsLnhfZW5kID0gcnB4LnhfYmVnICsgdGhpcy5jdXJ2ZV9kKClcbiAgICBybC5zdHlsZSA9IHN0eWxlc1swXVxuXG4gICAgcnIueF9iZWcgPSBycHgueF9lbmRcbiAgICByci54X2VuZCA9IHJweC54X2VuZCAtIHRoaXMuY3VydmVfZCgpXG4gICAgcnIuc3R5bGUgPSBzdHlsZXMubGVuZ3RoID4gMSA/IHN0eWxlc1sxXSA6IHN0eWxlc1swXVxuXG4gICAgcmMueF9iZWcgPSBybC54X2VuZFxuICAgIHJjLnhfZW5kID0gcnIueF9lbmRcbiAgICByYy5zdHlsZSA9ICdsaW5lJ1xuICAgIHJldHVybiBbcmwsIHJjLCBycl1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGN1cnZlIGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0N1cnZlUGFydChycHg6IFJhbmdlUHgpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKVxuICAgIHRoaXMuY3R4Lm1vdmVUbyhycHgueF9iZWcsIHJweC55IC0gdGhpcy5jdXJ2ZV9kKCkpXG4gICAgdGhpcy5jdHgucXVhZHJhdGljQ3VydmVUbyhycHgueF9iZWcsIHJweC55LCBycHgueF9lbmQsIHJweC55KVxuICAgIHRoaXMuY3R4LnN0cm9rZSgpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBsZW5ndGggb2YgYSBiZWdpbm5pbmcgKG9yIGVuZGluZykgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgY3VydmVfZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZvbnRfc2l6ZV9oYWxmIC8gMlxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgbGluZSBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdMaW5lUHhQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2JlZywgcnB4LnkpXG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCwgcnB4LnkpXG4gICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFycm93IGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0Fycm93UHhQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy5jdXJ2ZV9kKCkgKiAocnB4LnhfYmVnIDwgcnB4LnhfZW5kID8gLTEgOiArMSlcbiAgICB0aGlzLmRyYXdMaW5lUHhQYXJ0KHJweClcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKVxuICAgIHRoaXMuY3R4Lm1vdmVUbyhycHgueF9lbmQgKyBkeCAvIDIsIHJweC55ICsgZHggLyAyKVxuICAgIHRoaXMuY3R4LmxpbmVUbyhycHgueF9lbmQgKyBkeCwgcnB4LnkpXG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCArIGR4IC8gMiwgcnB4LnkgLSBkeCAvIDIpXG4gICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlIGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd1JhbmdlUHhQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIGlmIChycHguc3R5bGUgPT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLmRyYXdMaW5lUHhQYXJ0KHJweClcbiAgICB9IGVsc2UgaWYgKHJweC5zdHlsZSA9PSAnY3VydmUnKSB7XG4gICAgICB0aGlzLmRyYXdDdXJ2ZVBhcnQocnB4KVxuICAgIH0gZWxzZSBpZiAocnB4LnN0eWxlID09ICdhcnJvdycpIHtcbiAgICAgIHRoaXMuZHJhd0Fycm93UHhQYXJ0KHJweClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHJhbmdlIHRvIGRyYXcuXG4gICAqL1xuICBkcmF3UmFuZ2VQeChycHg6IFJhbmdlUHgpIHtcbiAgICBpZiAocnB4LnN0eWxlID09ICdsaW5lJykge1xuICAgICAgdGhpcy5kcmF3TGluZVB4UGFydChycHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFtybCwgcmMsIHJyXSA9IHRoaXMuc3BsaXRSYW5nZVB4KHJweClcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJsKVxuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocmMpXG4gICAgICB0aGlzLmRyYXdSYW5nZVB4UGFydChycilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBzdHJpbmdzLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlIHRvIGRyYXcgc3RyaW5ncy5cbiAgICogQHBhcmFtIHkgVGhlIHktY29vcmluYXRlIHRvIGRyYXcgcmFuZ2UgYHJgLlxuICAgKi9cbiAgZHJhd1N0cihyOiBSYW5nZSwgeTogbnVtYmVyKSB7XG4gICAgY29uc3QgcnN0ciA9IHIuc3RyIGFzIHN0cmluZ1tdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gcnN0cltpXVxuICAgICAgY29uc3QgY3ggPSB0aGlzLnN0cl94ICsgKHIuYmVnICsgaSkgKiB0aGlzLmZvbnRfc2l6ZVxuICAgICAgdGhpcy5jdHguZmlsbFRleHQoYywgY3gsIHkgKyB0aGlzLmZvbnRfc2l6ZSAqIDAuMywgdGhpcy5mb250X3NpemUpXG4gICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgdGhpcy5jdHgucmVjdChcbiAgICAgICAgY3ggLSB0aGlzLmZvbnRfc2l6ZV9oYWxmLFxuICAgICAgICB5IC0gdGhpcy5mb250X3NpemVfaGFsZixcbiAgICAgICAgdGhpcy5mb250X3NpemUsXG4gICAgICAgIHRoaXMuZm9udF9zaXplLFxuICAgICAgKVxuICAgICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZS5cbiAgICogQHBhcmFtIHIgQSByYW5nZSB0byBkcmF3LlxuICAgKiBAcGFyYW0geSBBIHktY29vcmRpbmF0ZSB0byBkcmF3IGByYC5cbiAgICovXG4gIGRyYXdSYW5nZShyOiBSYW5nZSwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSByLmNvbG9yXG4gICAgbGV0IHJweCA9IHtcbiAgICAgIHhfYmVnOiB0aGlzLnJhbmdlQmVnKHIuYmVnKSxcbiAgICAgIHhfZW5kOiB0aGlzLnJhbmdlRW5kKHIuZW5kKSxcbiAgICAgIHk6IHksXG4gICAgICBzdHlsZTogci5zdHlsZSxcbiAgICAgIGNvbG9yOiByLmNvbG9yLFxuICAgICAgc3RyOiByLnN0cixcbiAgICB9XG4gICAgaWYgKHIuc3R5bGUgPT0gJ3N0cicpIHtcbiAgICAgIHRoaXMuZHJhd1N0cihyLCB5KVxuICAgIH0gZWxzZSBpZiAoci5zdGVwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgeF9iZWcgPSB0aGlzLnJhbmdlQmVnKHIuYmVnKVxuICAgICAgZm9yIChsZXQgY3VyID0gci5iZWcgKyByLnN0ZXAgLSAxOyBjdXIgPCByLmVuZDsgY3VyICs9IHIuc3RlcCkge1xuICAgICAgICBycHgueF9lbmQgPSB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiBjdXIgKyB0aGlzLmZvbnRfc2l6ZV9oYWxmXG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KVxuICAgICAgICBycHgueF9iZWcgPSBycHgueF9lbmRcbiAgICAgIH1cbiAgICAgIGlmICgoci5lbmQgLSByLmJlZyArIDEpICUgci5zdGVwID09PSAwKSB7XG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMucmFuZ2VFbmQoci5lbmQpXG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgYW4gdW5jb21wbGV0ZSByYW5nZS5cbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogci5lbmQgKyB0aGlzLmZvbnRfc2l6ZV9oYWxmXG4gICAgICAgIHJweC5zdHlsZSA9IHIuc3R5bGUuc3BsaXQoJywnKVswXSArICcsbGluZSdcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcmFuZ2Vfcm93cyBSYW5nZXMgdG8gZHJhdy5cbiAgICovXG4gIGRyYXdSYW5nZXMocmFuZ2Vfcm93czogUmFuZ2VbXVtdKSB7XG4gICAgbGV0IHlweCA9IHRoaXMuc3RyX3lcbiAgICBmb3IgKGNvbnN0IHJhbmdlcyBvZiByYW5nZV9yb3dzKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCguLi5yYW5nZXMubWFwKHIgPT4gdGhpcy5yYW5nZUhlaWdodChyKSkpXG4gICAgICBmb3IgKGNvbnN0IHJhbmdlIG9mIHJhbmdlcykge1xuICAgICAgICB0aGlzLmRyYXdSYW5nZShyYW5nZSwgeXB4ICsgaGVpZ2h0IC8gMilcbiAgICAgIH1cbiAgICAgIHlweCArPSBoZWlnaHRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhbiBpbnB1dCBzdHJpbmcuXG4gICAqL1xuICBkcmF3SW5wdXRTdHIoaW5wdXRfc3RyOiBzdHJpbmcpIHtcbiAgICBsZXQgaW5kZXggPSBbJ2knXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRfc3RyLmxlbmd0aDsgaSsrKSBpbmRleC5wdXNoKCcnICsgaSlcbiAgICBsZXQgciA9IHtcbiAgICAgIHN0eWxlOiAnc3RyJyxcbiAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICBiZWc6IC0xLFxuICAgICAgZW5kOiBpbnB1dF9zdHIubGVuZ3RoIC0gMSxcbiAgICAgIHN0cjogaW5kZXgsXG4gICAgfVxuICAgIHRoaXMuZHJhd1JhbmdlKHIsIHRoaXMuc3RyX3kgLSB0aGlzLmZvbnRfc2l6ZSAtIHRoaXMuZm9udF9zaXplX2hhbGYpXG4gICAgY29uc3QgY2hhcnMgPSBbJ1N0ciddXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dF9zdHIubGVuZ3RoOyBpKyspXG4gICAgICBjaGFycy5wdXNoKGlucHV0X3N0ci5zdWJzdHJpbmcoaSwgaSArIDEpKVxuICAgIHIuc3RyID0gY2hhcnNcbiAgICB0aGlzLmRyYXdSYW5nZShyLCB0aGlzLnN0cl95IC0gdGhpcy5mb250X3NpemVfaGFsZilcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGEgZ2l2ZW4gc3RyaW5nIGFuZCByYW5nZXMuXG4gICAqIEBwYXJhbSBpbnB1dF9zdHIgSW5wdXQgc3RyaW5nIHRvIGRyYXcuXG4gICAqIEBwYXJhbSByc3MgVGhlIHJhbmdlcyB0byBkcmF3IHdoaWNoIGFyZSByZWxhdGVkIHRvIGEgZ2l2ZW4gc3RyaW5nIGBpbnB1dF9zdHJgXG4gICAqL1xuICBkcmF3KGlucHV0X3N0cjogc3RyaW5nLCByc3M6IFJhbmdlW11bXSkge1xuICAgIGxldCByYW5nZV9ib3VuZCA9IFstMSwgaW5wdXRfc3RyLmxlbmd0aCAtIDFdXG4gICAgcnNzLmZvckVhY2gocnMgPT5cbiAgICAgIHJzLmZvckVhY2goXG4gICAgICAgIHIgPT5cbiAgICAgICAgICAocmFuZ2VfYm91bmQgPSBbXG4gICAgICAgICAgICBNYXRoLm1pbihyYW5nZV9ib3VuZFswXSwgci5iZWcpLFxuICAgICAgICAgICAgTWF0aC5tYXgocmFuZ2VfYm91bmRbMV0sIHIuZW5kKSxcbiAgICAgICAgICBdKSxcbiAgICAgICksXG4gICAgKVxuICAgIHRoaXMuc3RyX3ggPSB0aGlzLmZvbnRfc2l6ZSArIE1hdGguYWJzKHJhbmdlX2JvdW5kWzBdKSAqIHRoaXMuZm9udF9zaXplXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSAocmFuZ2VfYm91bmRbMV0gLSByYW5nZV9ib3VuZFswXSArIDIpICogdGhpcy5mb250X3NpemVcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPVxuICAgICAgdGhpcy5zdHJfeSArXG4gICAgICB0aGlzLmZvbnRfc2l6ZV9oYWxmICtcbiAgICAgIHJzcy5yZWR1Y2UoXG4gICAgICAgIChhY20sIHJzKSA9PiBhY20gKyBNYXRoLm1heCguLi5ycy5tYXAociA9PiB0aGlzLnJhbmdlSGVpZ2h0KHIpKSksXG4gICAgICAgIDAsXG4gICAgICApXG5cbiAgICAvLyBEUEkgc2V0dGluZ3NcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxXG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgLy8gY29uc29sZS5sb2coJ2RwcicsIGRwciwgJyByZWN0JywgcmVjdClcbiAgICB0aGlzLmNhbnZhcy53aWR0aCAqPSBkcHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgKj0gZHByXG4gICAgdGhpcy5jdHguc2NhbGUoZHByLCBkcHIpXG4gICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCAvIGRwciArICdweCdcblxuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodCAvIGRwciArICdweCdcbiAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDNcbiAgICB0aGlzLmN0eC5mb250ID0gdGhpcy5mb250X3NpemUgKyAncHggJyArIHRoaXMuZm9udF90eXBlXG4gICAgdGhpcy5kcmF3SW5wdXRTdHIoaW5wdXRfc3RyKVxuICAgIHRoaXMuZHJhd1Jhbmdlcyhyc3MpXG4gIH1cblxuICAvKipcbiAgICogTWFrZSBncm91cCB0aGF0IGVhY2ggY29udGFpbnMgYSBzaW5nbGUgcmFuZ2UuXG4gICAqIEBwYXJhbSByYW5nZXMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBtYWtlU2luZ2xlR3JvdXBzKHJhbmdlczogUmFuZ2VbXSk6IFJhbmdlW11bXSB7XG4gICAgcmV0dXJuIHJhbmdlcy5tYXAocmFuZ2UgPT4gW3JhbmdlXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gVHMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSByYW5nZWYgVGhlIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgdHVwbGUgYmVnaW5uaW5nIGluZGV4IGFuZCBlbmRpbmcgaW5kZXggb2YgYSBnaXZlbiByYW5nZSBgVHNbaV1gLlxuICAgKi9cbiAgbm9uT3ZlcmxhcE9ianM8VD4oVHM6IFRbXSwgcmFuZ2VmOiAoYXJnMDogVCkgPT4gbnVtYmVyW10pOiBUW11bXSB7XG4gICAgaWYgKFRzLmxlbmd0aCA8PSAwKSByZXR1cm4gW11cbiAgICBjb25zdCBlbmRzID0gVHMubWFwKHQgPT4gcmFuZ2VmKHQpWzFdKVxuICAgIGNvbnN0IG4gPSBNYXRoLm1heCguLi5lbmRzKSArIDFcbiAgICBsZXQgdXNlZCA9IG5ldyBBcnJheTxib29sZWFuPihuKVxuICAgIHVzZWQuZmlsbChmYWxzZSlcbiAgICBsZXQgcmVzID0gW11cbiAgICBsZXQgcm93czogVFtdID0gW11cbiAgICBmb3IgKGNvbnN0IHQgb2YgVHMpIHtcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgb3Igbm90IGEgcmFuZ2UgY2FuIGJlIGluc2VydGVkIHRvIHRoZSBjdXJyZW50IHJvdy5cbiAgICAgIGxldCB1c2VkX2FueSA9IGZhbHNlXG4gICAgICBmb3IgKGxldCBpID0gcmFuZ2VmKHQpWzBdOyBpIDw9IHJhbmdlZih0KVsxXTsgaSsrKSB7XG4gICAgICAgIHVzZWRfYW55ID0gdXNlZF9hbnkgfHwgdXNlZFtpXVxuICAgICAgfVxuICAgICAgaWYgKHVzZWRfYW55KSB7XG4gICAgICAgIHJlcy5wdXNoKHJvd3MpXG4gICAgICAgIHJvd3MgPSBbdF1cbiAgICAgICAgdXNlZC5maWxsKGZhbHNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93cy5wdXNoKHQpXG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gcmFuZ2VmKHQpWzBdOyBpIDw9IHJhbmdlZih0KVsxXTsgaSsrKSB7XG4gICAgICAgIHVzZWRbaV0gPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHJlcy5wdXNoKHJvd3MpXG5cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbm9uT3ZlcmxhcFJhbmdlcyhyczogUmFuZ2VbXSk6IFJhbmdlW11bXSB7XG4gICAgcmV0dXJuIHRoaXMubm9uT3ZlcmxhcE9ianM8UmFuZ2U+KHJzLCByID0+IFtyLmJlZywgci5lbmRdKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ3JvdXBlZCByYW5nZXMgdGhhdCBlYWNoIGNvbnRhaW5zIG5vbiBvdmVybGFwcGluZyByYW5nZXMuXG4gICAqIEBwYXJhbSBycyBUaGUgcmFuZ2UgbGlzdC5cbiAgICovXG4gIG5vbk92ZXJsYXBSYW5nZXNTaW1wbGUocnM6IFJhbmdlU2ltcGxlW10pOiBSYW5nZVNpbXBsZVtdW10ge1xuICAgIHJldHVybiB0aGlzLm5vbk92ZXJsYXBPYmpzPFJhbmdlU2ltcGxlPihycywgeCA9PiBbeFswXSwgeFsxXV0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByYW5nZSBsaXN0IGByc2Agc3BlY2lmaWVkIHdpdGggdGhlIHN0eWxlIGBzdHlsZWAuXG4gICAqIEBwYXJhbSBycyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBzdHlsZSBvZiB0aGUgcmFuZ2VzIGByc2AgdG8gZHJhdy5cbiAgICovXG4gIG1ha2VHcm91cFJhbmdlc0F1dG9Db2xvcihyczogUmFuZ2VTaW1wbGVbXVtdLCBzdHlsZTogc3RyaW5nKTogUmFuZ2VbXVtdIHtcbiAgICBsZXQgcmVzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb2xvciA9ICcjJyArIGNvbnZlcnQuaHN2LmhleChbKGkgKiAzNjApIC8gcnMubGVuZ3RoLCA4MCwgODBdKVxuICAgICAgcmVzLnB1c2godGhpcy5tYWtlUmFuZ2VzKHJzW2ldLCBzdHlsZSwgY29sb3IpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByYW5nZSBsaXN0IGByc2Agc3BlY2lmaWVkIHdpdGggc3R5bGUgYHN0eWxlYCBhbmQgYGNvbG9yYC5cbiAgICogQHBhcmFtIHJhbmdlcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBzdHlsZSBvZiB0aGUgcmFuZ2VzIGByc2AgdG8gZHJhdy5cbiAgICogQHBhcmFtIGNvbG9yIFRoZSBjb2xvciBvZiB0aGUgcmFuZ2VzIGByc2AgdG8gZHJhdy5cbiAgICovXG4gIG1ha2VSYW5nZXMocmFuZ2VzOiBSYW5nZVNpbXBsZVtdLCBzdHlsZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nKTogUmFuZ2VbXSB7XG4gICAgcmV0dXJuIHJhbmdlcy5tYXAocmFuZ2UgPT4ge1xuICAgICAgY29uc3QgaXNfc3RyID1cbiAgICAgICAgdHlwZW9mIHJhbmdlWzJdICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcmFuZ2VbMl0gIT09ICdudW1iZXInXG4gICAgICBjb25zdCBzdGVwID0gdHlwZW9mIHJhbmdlWzJdID09PSAnbnVtYmVyJyA/IHJhbmdlWzJdIDogdW5kZWZpbmVkXG4gICAgICBjb25zdCBzdHIgPSB0eXBlb2YgcmFuZ2VbMl0gIT09ICdudW1iZXInID8gcmFuZ2VbMl0gOiB1bmRlZmluZWRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0eWxlOiBpc19zdHIgPyAnc3RyJyA6IHN0eWxlLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgYmVnOiByYW5nZVswXSxcbiAgICAgICAgZW5kOiByYW5nZVsxXSxcbiAgICAgICAgc3RlcCxcbiAgICAgICAgc3RyLFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByYW5nZSBsaXN0IGByc2Agc3BlY2lmaWVkIHdpdGggdGhlIHN0eWxlIGBzdHlsZWAuXG4gICAqIEBwYXJhbSBycyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBzdHlsZSBvZiB0aGUgcmFuZ2VzIGByc2AgdG8gZHJhdy5cbiAgICovXG4gIG1ha2VSYW5nZXNBdXRvQ29sb3IocnM6IFJhbmdlU2ltcGxlW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdIHtcbiAgICByZXR1cm4gcnMubWFwKChyYW5nZSwgaSkgPT4gKHtcbiAgICAgIHN0eWxlLFxuICAgICAgY29sb3I6ICcjJyArIGNvbnZlcnQuaHN2LmhleChbKGkgKiAzNjApIC8gcnMubGVuZ3RoLCA4MCwgODBdKSxcbiAgICAgIGJlZzogcmFuZ2VbMF0sXG4gICAgICBlbmQ6IHJhbmdlWzFdLFxuICAgIH0pKVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9