/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vis_str_demo.ts");
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


/***/ }),

/***/ "./src/vis_str_demo.ts":
/*!*****************************!*\
  !*** ./src/vis_str_demo.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vis_str_1 = __webpack_require__(/*! ./vis_str */ "./src/vis_str.ts");
const substrings = (str) => {
    const n = str.length;
    let res = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++)
            res.add(str.substring(i, j));
    }
    return [...res.keys()];
};
const findAll = (str, pat) => {
    const m = pat.length;
    let res = [];
    let pos = str.indexOf(pat);
    while (pos !== -1) {
        res.push([pos, pos + m - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return res;
};
const isPalindrome = (str) => {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] != str[str.length - i - 1])
            return false;
    }
    return true;
};
const enumPalindromes = (str) => {
    const n = str.length;
    let res = [];
    for (let len = 1; len < n; len++) {
        for (let beg = 0; beg + len <= n; beg++) {
            if (isPalindrome(str.substring(beg, beg + len)))
                res.push([beg, beg + len - 1]);
        }
    }
    return res;
};
const lcp = (str, i, j) => {
    let n = str.length;
    let match_len = 0;
    while (i + match_len < n && j + match_len < n) {
        if (str[i + match_len] == str[j + match_len])
            match_len++;
        else
            break;
    }
    return match_len;
};
const prevOccLPF = (str) => {
    let prevOcc = [];
    let lpf = [];
    const n = str.length;
    for (let i = 0; i < n; i++) {
        let poccx = -1;
        let lpfx = 0;
        for (let j = 0; j < i; j++) {
            const l = lcp(str, i, j);
            if (lpfx < l) {
                lpfx = l;
                poccx = j;
            }
        }
        prevOcc.push(poccx);
        lpf.push(lpfx);
    }
    return [prevOcc, lpf];
};
const enumPrevOccLPF = (str) => {
    const n = str.length;
    const [prevOcc, lpf] = prevOccLPF(str);
    let res = [
        [[-1, n - 1, ['occ'].concat(prevOcc.map(x => x.toString()))]],
        [[-1, n - 1, ['len'].concat(lpf.map(x => x.toString()))]],
    ];
    for (let i = 0; i < prevOcc.length; i++) {
        if (lpf[i] > 0) {
            res.push([[i, i + lpf[i] - 1], [prevOcc[i], prevOcc[i] + lpf[i] - 1]]);
        }
    }
    return res;
};
const isSquare = (s, beg, p) => {
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i])
            return false;
    }
    return true;
};
const enumSquares = (s) => {
    const n = s.length;
    let res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (isSquare(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};
const isRightmostSquare = (s, beg, p) => {
    if (!isSquare(s, beg, p))
        return false;
    return (!s.includes(s.substr(beg, 2 * p), beg + 1));
};
const isLeftmostSquare = (s, beg, p) => {
    if (!isSquare(s, beg, p))
        return false;
    return (!s.substr(0, beg + 2 * p - 1).includes(s.substr(beg, 2 * p)));
};
const enumRightmostSquares = (s) => {
    const n = s.length;
    let res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (isRightmostSquare(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};
const enumLeftmostSquares = (s) => {
    const n = s.length;
    let res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (isLeftmostSquare(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};
const isRun = (s, beg, p) => {
    if (beg > 0 && s[beg - 1] == s[beg + p - 1])
        return false;
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i])
            return false;
    }
    return true;
};
const enumRuns = (s) => {
    const n = s.length;
    let res = [];
    let rmap = new Set();
    for (let p = 1; p < n; p++) {
        for (let beg = 0; beg + 2 * p <= n; beg++) {
            if (isRun(s, beg, p)) {
                let match = 2 * p;
                while (match < n && s[beg + (match % p)] == s[beg + match]) {
                    match++;
                }
                const key = beg + ',' + (beg + match - 1);
                if (!rmap.has(key)) {
                    res.push([beg, beg + match - 1, p]);
                    rmap.add(key);
                }
            }
        }
    }
    return res;
};
const leftExtensions = (str, pat) => {
    let res = new Set();
    let fromIdx = 1;
    let pos = str.indexOf(pat, fromIdx);
    while (pos !== -1) {
        res.add(str[pos - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return [...res.keys()];
};
const reverse = (str) => {
    return str
        .split('')
        .reverse()
        .join('');
};
const rightExtensions = (str, pat) => {
    const rstr = reverse(str);
    const rpat = reverse(pat);
    return leftExtensions(rstr, rpat);
};
const isLeftMaximal = (str, pat) => {
    return leftExtensions(str, pat).length > 1;
};
const isRightMaximal = (str, pat) => {
    return rightExtensions(str, pat).length > 1;
};
const isMaxRepeat = (str, pat) => {
    return isLeftMaximal(str, pat) && isRightMaximal(str, pat);
};
const lz77 = (str, show_factorid = 1) => {
    const n = str.length;
    const [occs, lens] = prevOccLPF(str);
    const res = [];
    for (let i = 0; i < n;) {
        let ranges = [];
        if (occs[i] === -1) {
            ranges = [[i, i, [str[i]]]];
            i += 1;
        }
        else {
            ranges = [[occs[i], occs[i] + lens[i] - 1], [i, i + lens[i] - 1]];
            i += lens[i];
        }
        if (show_factorid >= 0) {
            const last_end = ranges[ranges.length - 1][1];
            ranges.push([last_end + 1, last_end + 1, ['f' + show_factorid]]);
            show_factorid++;
        }
        res.push(ranges);
    }
    return res;
};
const lz78 = (str, show_factorid = 1) => {
    let d = new Map();
    let res = [];
    for (var i = 0; i < str.length;) {
        let j = i + 1;
        while (j <= str.length && d.has(str.substring(i, j))) {
            j++;
        }
        let row = [];
        if (j - i > 1) {
            const prev = d.get(str.substring(i, j - 1));
            row.push([prev, prev + (j - i - 2)]);
            row.push([i, j - 2]);
        }
        if (j < str.length) {
            row.push([j - 1, j, [str[j - 1], 'f' + show_factorid]]);
        }
        else {
            row.push([j - 1, j - 1, ['f' + show_factorid]]);
        }
        show_factorid++;
        res.push(row);
        d.set(str.substring(i, j), i);
        i = j;
    }
    return res;
};
const isLyndon = (str) => {
    for (let i = 1; i < str.length; i++) {
        let lessthan = false;
        for (let j = 0; j < str.length; j++) {
            const j2 = (i + j) % str.length;
            if (str[j] > str[j2])
                return false;
            else if (str[j] < str[j2]) {
                lessthan = true;
                break;
            }
        }
        if (!lessthan)
            return false;
    }
    return true;
};
// const enumLyndon = (str: string): RangeSimple[][] => {
//   const check = (str: string, pat: string) => isLyndon(pat)
//   return enumIfGroup(str, check)
// }
const enumLyndon = (str) => {
    const res = [];
    for (let len = 1; len <= str.length; len++) {
        const group = [];
        for (let i = 0; i + len <= str.length; i++) {
            const sub = str.substr(i, len);
            if (isLyndon(sub))
                group.push([i, i + len - 1]);
        }
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
// Duval's algorithm
// find longest lyndon factor which starts at beg in str.
// return [len, repeat], where
// len is the length of the factor,
// repeat is the maximum repeat of the factor.
const findLongestLyndonFactor = (str, beg) => {
    let i = beg;
    let end = beg + 1;
    while (end < str.length && str[i] <= str[end]) {
        if (str[i] === str[end]) {
            i++;
            end++;
        }
        else if (str[i] < str[end]) {
            // str[beg...end] is Lyndon string
            i = beg;
            end++;
        }
    }
    // str[beg...end-1] is the longest Lyndon prefix of str[beg...].
    const len = end - i;
    const repeat = Math.floor((end - beg) / (end - i));
    return [len, repeat];
};
const lyndonFactorization = (str) => {
    let res = [];
    let beg = 0;
    while (beg < str.length) {
        const factor = findLongestLyndonFactor(str, beg);
        const len_factor = factor[0] * factor[1];
        res.push([[beg, beg + len_factor - 1, factor[0]]]);
        beg += len_factor;
    }
    return res;
};
const lyndonArray = (str) => {
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const factor = findLongestLyndonFactor(str, i);
        res.push([[i, i + factor[0] - 1]]);
    }
    return res;
};
// replace the characters to effective alphabet [0, sigma-1]
// sigma is the number of distinct characters of given string
// sigma must be less than 10
const replaceEffectiveAlphabet = (str) => {
    const chars = new Set();
    for (let i = 0; i < str.length; i++)
        chars.add(str[i]);
    const arr = Array.from(chars.values());
    arr.sort();
    const rep = new Map();
    arr.map((c, i) => rep.set(c, i.toString()));
    const reps = [];
    for (let i = 0; i < str.length; i++)
        reps.push(rep.get(str[i]));
    return reps;
    // return reps.join('')
};
const suffixArray = (str) => {
    const suffixes = [...Array(str.length).keys()].map(i => str.substr(i));
    suffixes.sort();
    return suffixes.map(s => str.length - s.length);
};
const rankArray = (str, sa) => {
    if (sa === undefined)
        sa = suffixArray(str);
    const rank = Array(str.length);
    sa.forEach((pos, r) => (rank[pos] = r));
    return rank;
};
const enumIf = (str, check) => {
    return flat(enumIfGroup(str, check));
};
const enumIfGroup = (str, check) => {
    return substrings(str)
        .filter(p => check(str, p))
        .map(p => findAll(str, p));
};
const radioValue = (selector) => {
    let res = '';
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        if (elms[i].checked)
            res = elms[i].value;
    }
    return res;
};
const flat = (arr) => {
    return arr.reduce((acm, x) => acm.concat(x), []);
};
const draw = (e) => {
    // get font size
    let font_size = parseInt(radioValue('[name=font_size]'));
    // get line style
    let range_style = radioValue('[name=line_style]');
    const line_style_right = radioValue('[name=line_style_right]');
    range_style += line_style_right.length === 0 ? '' : ',' + line_style_right;
    let visualize = radioValue('[name=visualize]');
    console.log(`font_size=${font_size}, line_style=${range_style}, visualize=${visualize}`);
    // get input string
    const elm = document.querySelector('#input_str');
    let input_str = elm.value;
    // get canvas
    const canvas = document.querySelector('#canvas');
    // canvas.width = window.innerWidth - 50
    const visStr = new vis_str_1.VisStr(canvas, (font_size = font_size));
    // compute ranges
    let rangesp = [];
    let ranges_group = [];
    let ranges = [];
    const show_effective_alphabet = document.getElementById('effective_alphabet').checked;
    const show_rank_array = document.getElementById('rank_array').checked;
    if (show_effective_alphabet) {
        ranges_group.push([
            [
                -1,
                input_str.length - 1,
                ['eStr', ...replaceEffectiveAlphabet(input_str)],
            ],
        ]);
    }
    if (show_rank_array) {
        ranges_group.push([
            [-1, input_str.length - 1, ['rank', ...rankArray(input_str)]],
        ]);
    }
    if (visualize === 'runs'
        || visualize === 'palindromes'
        || visualize === 'squares'
        || visualize === 'rmostsquares'
        || visualize === 'lmostsquares') {
        if (visualize === 'runs') {
            rangesp = enumRuns(input_str);
        }
        else if (visualize === 'palindromes') {
            rangesp = enumPalindromes(input_str);
        }
        else if (visualize === 'squares') {
            rangesp = enumSquares(input_str);
        }
        else if (visualize === 'rmostsquares') {
            rangesp = enumRightmostSquares(input_str);
        }
        else if (visualize === 'lmostsquares') {
            rangesp = enumLeftmostSquares(input_str);
        }
        console.log('rangesp', rangesp);
        ranges_group = ranges_group.concat(visStr.nonOverlapRangesSimple(rangesp));
        console.log('range_group', ranges_group);
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        console.log('rangesp', ranges);
    }
    else {
        if (visualize === 'lpf')
            ranges_group = ranges_group.concat(enumPrevOccLPF(input_str));
        else if (visualize === 'left_maximal')
            ranges_group = ranges_group.concat(enumIfGroup(input_str, isLeftMaximal));
        else if (visualize === 'right_maximal')
            ranges_group = ranges_group.concat(enumIfGroup(input_str, isRightMaximal));
        else if (visualize === 'max_repeat')
            ranges_group = ranges_group.concat(enumIfGroup(input_str, isMaxRepeat));
        else if (visualize === 'lz77')
            ranges_group = ranges_group.concat(lz77(input_str));
        else if (visualize === 'lz78')
            ranges_group = ranges_group.concat(lz78(input_str));
        else if (visualize === 'lyndon_factorization')
            ranges_group = ranges_group.concat(lyndonFactorization(input_str));
        else if (visualize === 'lyndon_array')
            ranges_group = ranges_group.concat(lyndonArray(input_str));
        else if (visualize === 'enum_lyndon')
            ranges_group = ranges_group.concat(enumLyndon(input_str));
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        ranges = flat(ranges.map(x => visStr.nonOverlapRanges(x)));
    }
    visStr.draw(input_str, ranges);
};
const selectorAddEvent = (selector, event, func) => {
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        elms[i].addEventListener(event, func);
    }
};
const main = () => {
    const input_str = document.getElementById('input_str');
    input_str.addEventListener('input', draw);
    input_str.addEventListener('propertychange', draw);
    // add event for radio buttons
    selectorAddEvent('[name=font_size]', 'click', draw);
    selectorAddEvent('[name=line_style]', 'click', draw);
    selectorAddEvent('[name=line_style_right]', 'click', draw);
    selectorAddEvent('[name=visualize]', 'click', draw);
    // selectorAddEvent('#effective_alphabet', 'click', draw)
    selectorAddEvent('[type=checkbox]', 'click', draw);
    // draw initially.
    input_str.dispatchEvent(new CustomEvent('propertychange', { detail: 'init event' }));
};
main();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvcm91dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLW5hbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zdHIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zdHJfZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLHNEQUFZOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxRQUFRLDRCQUE0QjtBQUNwQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDZCQUE2QjtBQUNwQyxXQUFXLGlDQUFpQztBQUM1QyxVQUFVLGdDQUFnQztBQUMxQyxXQUFXLGlDQUFpQztBQUM1QyxPQUFPLHFDQUFxQztBQUM1QyxTQUFTLDJDQUEyQztBQUNwRCxRQUFRO0FBQ1I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsaUJBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxvREFBb0QsZ0JBQWdCO0FBQ3BFLGtEQUFrRCxjQUFjO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRLFNBQVM7QUFDakMsZ0JBQWdCLFFBQVEsU0FBUztBQUNqQyxpQkFBaUIsT0FBTyxRQUFRO0FBQ2hDLGlCQUFpQixPQUFPLFFBQVE7QUFDaEMsZ0JBQWdCLFNBQVMsT0FBTztBQUNoQyxnQkFBZ0IsU0FBUyxPQUFPO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlFQUF5RTs7QUFFekU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxFQUFFLFVBQVUsRUFBRTtBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdDBCQSxvQkFBb0IsbUJBQU8sQ0FBQyxrRUFBZTtBQUMzQyxjQUFjLG1CQUFPLENBQUMsc0RBQVM7O0FBRS9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0RBQXdELHVDQUF1QztBQUMvRixzREFBc0QscUNBQXFDOztBQUUzRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7QUNoRkEsb0JBQW9CLG1CQUFPLENBQUMsa0VBQWU7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQy9GWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTtLQUNGO0lBQ0QsT0FBTyxHQUFHO0FBQ1osQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFFLEdBQVcsRUFBRSxDQUFTLEVBQVcsRUFBRTtJQUM5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxPQUFPLEtBQUs7S0FDL0M7SUFDRCxPQUFPLElBQUk7QUFDYixDQUFDO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFTLEVBQWlCLEVBQUU7SUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07SUFDbEIsSUFBSSxHQUFHLEdBQWtCLEVBQUU7SUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixLQUFLLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxLQUFLLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4RCxJQUFJLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEdBQUc7QUFDWixDQUFDO0FBRUQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQVMsRUFBRSxHQUFXLEVBQUUsQ0FBUyxFQUFZLEVBQUU7SUFDeEUsSUFBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBUyxFQUFFLEdBQVcsRUFBRSxDQUFTLEVBQVksRUFBRTtJQUN2RSxJQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsR0FBRyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFTLEVBQWlCLEVBQUU7SUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07SUFDbEIsSUFBSSxHQUFHLEdBQWtCLEVBQUU7SUFDM0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztRQUN4QixLQUFJLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBQztZQUN6QyxLQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDO2dCQUNoRCxJQUFHLGlCQUFpQixDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjthQUNGO1NBQ0Y7S0FDRjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFTLEVBQWlCLEVBQUU7SUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07SUFDbEIsSUFBSSxHQUFHLEdBQWtCLEVBQUU7SUFDM0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztRQUN4QixLQUFJLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBQztZQUN6QyxLQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDO2dCQUNoRCxJQUFHLGdCQUFnQixDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjthQUNGO1NBQ0Y7S0FDRjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBUyxFQUFFLEdBQVcsRUFBRSxDQUFTLEVBQVcsRUFBRTtJQUMzRCxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxPQUFPLEtBQUs7SUFDekQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUUsT0FBTyxLQUFLO0tBQy9DO0lBQ0QsT0FBTyxJQUFJO0FBQ2IsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFpQixFQUFFO0lBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNO0lBQ2xCLElBQUksR0FBRyxHQUFrQixFQUFFO0lBQzNCLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFVO0lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUNqQixPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUU7b0JBQzFELEtBQUssRUFBRTtpQkFDUjtnQkFDRCxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDZDthQUNGO1NBQ0Y7S0FDRjtJQUNELE9BQU8sR0FBRztBQUNaLENBQUM7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVksRUFBRTtJQUM1RCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBVTtJQUMzQixJQUFJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0lBQ25DLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUN0QyxPQUFPLEdBQUc7U0FDUCxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFRCxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVksRUFBRTtJQUM3RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDekIsT0FBTyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztBQUNuQyxDQUFDO0FBRUQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFXLEVBQUU7SUFDMUQsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQzVDLENBQUM7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVcsRUFBRTtJQUMzRCxPQUFPLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDN0MsQ0FBQztBQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBVyxFQUFFO0lBQ3hELE9BQU8sYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUM1RCxDQUFDO0FBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFXLEVBQUUsZ0JBQXdCLENBQUMsRUFBbUIsRUFBRTtJQUN2RSxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTTtJQUNwQixNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDcEMsTUFBTSxHQUFHLEdBQW9CLEVBQUU7SUFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBSTtRQUN2QixJQUFJLE1BQU0sR0FBa0IsRUFBRTtRQUM5QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsQixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsSUFBSSxDQUFDO1NBQ1A7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNiO1FBQ0QsSUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEUsYUFBYSxFQUFFO1NBQ2hCO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDakI7SUFDRCxPQUFPLEdBQUc7QUFDWixDQUFDO0FBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFXLEVBQUUsYUFBYSxHQUFHLENBQUMsRUFBbUIsRUFBRTtJQUMvRCxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBa0I7SUFDakMsSUFBSSxHQUFHLEdBQW9CLEVBQUU7SUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUk7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwRCxDQUFDLEVBQUU7U0FDSjtRQUNELElBQUksR0FBRyxHQUFrQixFQUFFO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBVztZQUNyRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsYUFBYSxFQUFFO1FBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDLEdBQUcsQ0FBQztLQUNOO0lBQ0QsT0FBTyxHQUFHO0FBQ1osQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBVyxFQUFXLEVBQUU7SUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxRQUFRLEdBQUcsS0FBSztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTTtZQUMvQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUFFLE9BQU8sS0FBSztpQkFDN0IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN6QixRQUFRLEdBQUcsSUFBSTtnQkFDZixNQUFLO2FBQ047U0FDRjtRQUNELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxLQUFLO0tBQzVCO0lBQ0QsT0FBTyxJQUFJO0FBQ2IsQ0FBQztBQUVELHlEQUF5RDtBQUN6RCw4REFBOEQ7QUFDOUQsbUNBQW1DO0FBQ25DLElBQUk7QUFDSixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVcsRUFBbUIsRUFBRTtJQUNsRCxNQUFNLEdBQUcsR0FBb0IsRUFBRTtJQUMvQixLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMxQyxNQUFNLEtBQUssR0FBa0IsRUFBRTtRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQzlCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxHQUFHO0FBQ1osQ0FBQztBQUVELG9CQUFvQjtBQUNwQix5REFBeUQ7QUFDekQsOEJBQThCO0FBQzlCLG1DQUFtQztBQUNuQyw4Q0FBOEM7QUFDOUMsTUFBTSx1QkFBdUIsR0FBRyxDQUM5QixHQUFXLEVBQ1gsR0FBVyxFQUNPLEVBQUU7SUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRztJQUNYLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsQ0FBQyxFQUFFO1lBQ0gsR0FBRyxFQUFFO1NBQ047YUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsa0NBQWtDO1lBQ2xDLENBQUMsR0FBRyxHQUFHO1lBQ1AsR0FBRyxFQUFFO1NBQ047S0FDRjtJQUNELGdFQUFnRTtJQUNoRSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBVyxFQUFtQixFQUFFO0lBQzNELElBQUksR0FBRyxHQUFvQixFQUFFO0lBQzdCLElBQUksR0FBRyxHQUFHLENBQUM7SUFFWCxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFrQixDQUFDO1FBQ25FLEdBQUcsSUFBSSxVQUFVO0tBQ2xCO0lBQ0QsT0FBTyxHQUFHO0FBQ1osQ0FBQztBQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFtQixFQUFFO0lBQ25ELE1BQU0sR0FBRyxHQUFvQixFQUFFO0lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sTUFBTSxHQUFHLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQWtCLENBQUM7S0FDcEQ7SUFDRCxPQUFPLEdBQUc7QUFDWixDQUFDO0FBRUQsNERBQTREO0FBQzVELDZEQUE2RDtBQUM3RCw2QkFBNkI7QUFDN0IsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQVcsRUFBWSxFQUFFO0lBQ3pELE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFVO0lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtRQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7SUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBa0I7SUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sSUFBSSxHQUFhLEVBQUU7SUFFekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBVyxDQUFDO0lBQ3pFLE9BQU8sSUFBSTtJQUNYLHVCQUF1QjtBQUN6QixDQUFDO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQVksRUFBRTtJQUM1QyxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNmLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNqRCxDQUFDO0FBQ0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBYSxFQUFFLEVBQUU7SUFDL0MsSUFBSSxFQUFFLEtBQUssU0FBUztRQUFFLEVBQUUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQzNDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QyxPQUFPLElBQUk7QUFDYixDQUFDO0FBRUQsTUFBTSxNQUFNLEdBQUcsQ0FDYixHQUFXLEVBQ1gsS0FBd0MsRUFDekIsRUFBRTtJQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFdBQVcsR0FBRyxDQUNsQixHQUFXLEVBQ1gsS0FBd0MsRUFDdkIsRUFBRTtJQUNuQixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUM7U0FDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQWdCLEVBQVUsRUFBRTtJQUM5QyxJQUFJLEdBQUcsR0FBRyxFQUFFO0lBQ1osTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFtQixRQUFRLENBQUM7SUFDbEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztLQUN6QztJQUNELE9BQU8sR0FBRztBQUNaLENBQUM7QUFFRCxNQUFNLElBQUksR0FBRyxDQUFJLEdBQVUsRUFBTyxFQUFFO0lBQ2xDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBUyxDQUFDO0FBQ3pELENBQUM7QUFFRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO0lBQ3hCLGdCQUFnQjtJQUNoQixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDeEQsaUJBQWlCO0lBQ2pCLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNqRCxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQztJQUU5RCxXQUFXLElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCO0lBQzFFLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztJQUM5QyxPQUFPLENBQUMsR0FBRyxDQUNULGFBQWEsU0FBUyxnQkFBZ0IsV0FBVyxlQUFlLFNBQVMsRUFBRSxDQUM1RTtJQUVELG1CQUFtQjtJQUNuQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBcUI7SUFDcEUsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUs7SUFFekIsYUFBYTtJQUNiLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFzQjtJQUNyRSx3Q0FBd0M7SUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUUxRCxpQkFBaUI7SUFDakIsSUFBSSxPQUFPLEdBQWtCLEVBQUU7SUFDL0IsSUFBSSxZQUFZLEdBQW9CLEVBQUU7SUFDdEMsSUFBSSxNQUFNLEdBQWMsRUFBRTtJQUUxQixNQUFNLHVCQUF1QixHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQ3RELG9CQUFvQixDQUNBLENBQUMsT0FBTztJQUM5QixNQUFNLGVBQWUsR0FBSSxRQUFRLENBQUMsY0FBYyxDQUM5QyxZQUFZLENBQ1EsQ0FBQyxPQUFPO0lBRTlCLElBQUksdUJBQXVCLEVBQUU7UUFDM0IsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNoQjtnQkFDRSxDQUFDLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNwQixDQUFDLE1BQU0sRUFBRSxHQUFHLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pEO1NBQ2UsQ0FBQztLQUNwQjtJQUNELElBQUksZUFBZSxFQUFFO1FBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDcEI7SUFFRCxJQUFJLFNBQVMsS0FBSyxNQUFNO1dBQ2pCLFNBQVMsS0FBSyxhQUFhO1dBQzNCLFNBQVMsS0FBSyxTQUFTO1dBQ3ZCLFNBQVMsS0FBSyxjQUFjO1dBQzVCLFNBQVMsS0FBSyxjQUFjLEVBQUU7UUFDbkMsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQ3hCLE9BQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFrQjtTQUMvQzthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsRUFBRTtZQUN0QyxPQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBa0I7U0FDdEQ7YUFBTSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDbEMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQWtCO1NBQ2xEO2FBQU0sSUFBRyxTQUFTLEtBQUssY0FBYyxFQUFDO1lBQ3JDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQWtCO1NBQzNEO2FBQUssSUFBRyxTQUFTLEtBQUssY0FBYyxFQUFDO1lBQ3BDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQWtCO1NBQzFEO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBQy9CLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7UUFDeEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztLQUMvQjtTQUFNO1FBQ0wsSUFBSSxTQUFTLEtBQUssS0FBSztZQUNyQixZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDMUQsSUFBSSxTQUFTLEtBQUssY0FBYztZQUNuQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3RFLElBQUksU0FBUyxLQUFLLGVBQWU7WUFDcEMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUN2RSxJQUFJLFNBQVMsS0FBSyxZQUFZO1lBQ2pDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDcEUsSUFBSSxTQUFTLEtBQUssTUFBTTtZQUMzQixZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDaEQsSUFBSSxTQUFTLEtBQUssTUFBTTtZQUMzQixZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDaEQsSUFBSSxTQUFTLEtBQUssc0JBQXNCO1lBQzNDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9ELElBQUksU0FBUyxLQUFLLGNBQWM7WUFDbkMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZELElBQUksU0FBUyxLQUFLLGFBQWE7WUFDbEMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztRQUNuRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztBQUNoQyxDQUFDO0FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsS0FBYSxFQUFFLElBQVMsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBbUIsUUFBUSxDQUFDO0lBQ2xFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUNoQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBZ0I7SUFDckUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7SUFDekMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQztJQUVsRCw4QkFBOEI7SUFDOUIsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQztJQUNuRCxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO0lBQ3BELGdCQUFnQixDQUFDLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7SUFDMUQsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQztJQUNuRCx5REFBeUQ7SUFDekQsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQztJQUVsRCxrQkFBa0I7SUFDbEIsU0FBUyxDQUFDLGFBQWEsQ0FDckIsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FDNUQ7QUFDSCxDQUFDO0FBRUQsSUFBSSxFQUFFIiwiZmlsZSI6InZpc19zdHJfZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zpc19zdHJfZGVtby50c1wiKTtcbiIsIi8qIE1JVCBsaWNlbnNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbmNvbnN0IGNzc0tleXdvcmRzID0gcmVxdWlyZSgnY29sb3ItbmFtZScpO1xuXG4vLyBOT1RFOiBjb252ZXJzaW9ucyBzaG91bGQgb25seSByZXR1cm4gcHJpbWl0aXZlIHZhbHVlcyAoaS5lLiBhcnJheXMsIG9yXG4vLyAgICAgICB2YWx1ZXMgdGhhdCBnaXZlIGNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cykuXG4vLyAgICAgICBkbyBub3QgdXNlIGJveCB2YWx1ZXMgdHlwZXMgKGkuZS4gTnVtYmVyKCksIFN0cmluZygpLCBldGMuKVxuXG5jb25zdCByZXZlcnNlS2V5d29yZHMgPSB7fTtcbmZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNzc0tleXdvcmRzKSkge1xuXHRyZXZlcnNlS2V5d29yZHNbY3NzS2V5d29yZHNba2V5XV0gPSBrZXk7XG59XG5cbmNvbnN0IGNvbnZlcnQgPSB7XG5cdHJnYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdyZ2InfSxcblx0aHNsOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzbCd9LFxuXHRoc3Y6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHN2J30sXG5cdGh3Yjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdod2InfSxcblx0Y215azoge2NoYW5uZWxzOiA0LCBsYWJlbHM6ICdjbXlrJ30sXG5cdHh5ejoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICd4eXonfSxcblx0bGFiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xhYid9LFxuXHRsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGNoJ30sXG5cdGhleDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnaGV4J119LFxuXHRrZXl3b3JkOiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydrZXl3b3JkJ119LFxuXHRhbnNpMTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kxNiddfSxcblx0YW5zaTI1Njoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTI1NiddfSxcblx0aGNnOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydoJywgJ2MnLCAnZyddfSxcblx0YXBwbGU6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ3IxNicsICdnMTYnLCAnYjE2J119LFxuXHRncmF5OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydncmF5J119XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnQ7XG5cbi8vIEhpZGUgLmNoYW5uZWxzIGFuZCAubGFiZWxzIHByb3BlcnRpZXNcbmZvciAoY29uc3QgbW9kZWwgb2YgT2JqZWN0LmtleXMoY29udmVydCkpIHtcblx0aWYgKCEoJ2NoYW5uZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRpZiAoISgnbGFiZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbCBsYWJlbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRpZiAoY29udmVydFttb2RlbF0ubGFiZWxzLmxlbmd0aCAhPT0gY29udmVydFttb2RlbF0uY2hhbm5lbHMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2NoYW5uZWwgYW5kIGxhYmVsIGNvdW50cyBtaXNtYXRjaDogJyArIG1vZGVsKTtcblx0fVxuXG5cdGNvbnN0IHtjaGFubmVscywgbGFiZWxzfSA9IGNvbnZlcnRbbW9kZWxdO1xuXHRkZWxldGUgY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGxhYmVsc30pO1xufVxuXG5jb252ZXJ0LnJnYi5oc2wgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuXHRjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0Y29uc3QgZGVsdGEgPSBtYXggLSBtaW47XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRoID0gMDtcblx0fSBlbHNlIGlmIChyID09PSBtYXgpIHtcblx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuXHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGIgPT09IG1heCkge1xuXHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXHR9XG5cblx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGNvbnN0IGwgPSAobWluICsgbWF4KSAvIDI7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSBpZiAobCA8PSAwLjUpIHtcblx0XHRzID0gZGVsdGEgLyAobWF4ICsgbWluKTtcblx0fSBlbHNlIHtcblx0XHRzID0gZGVsdGEgLyAoMiAtIG1heCAtIG1pbik7XG5cdH1cblxuXHRyZXR1cm4gW2gsIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuaHN2ID0gZnVuY3Rpb24gKHJnYikge1xuXHRsZXQgcmRpZjtcblx0bGV0IGdkaWY7XG5cdGxldCBiZGlmO1xuXHRsZXQgaDtcblx0bGV0IHM7XG5cblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgdiA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHRjb25zdCBkaWZmID0gdiAtIE1hdGgubWluKHIsIGcsIGIpO1xuXHRjb25zdCBkaWZmYyA9IGZ1bmN0aW9uIChjKSB7XG5cdFx0cmV0dXJuICh2IC0gYykgLyA2IC8gZGlmZiArIDEgLyAyO1xuXHR9O1xuXG5cdGlmIChkaWZmID09PSAwKSB7XG5cdFx0aCA9IDA7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRpZmYgLyB2O1xuXHRcdHJkaWYgPSBkaWZmYyhyKTtcblx0XHRnZGlmID0gZGlmZmMoZyk7XG5cdFx0YmRpZiA9IGRpZmZjKGIpO1xuXG5cdFx0aWYgKHIgPT09IHYpIHtcblx0XHRcdGggPSBiZGlmIC0gZ2RpZjtcblx0XHR9IGVsc2UgaWYgKGcgPT09IHYpIHtcblx0XHRcdGggPSAoMSAvIDMpICsgcmRpZiAtIGJkaWY7XG5cdFx0fSBlbHNlIGlmIChiID09PSB2KSB7XG5cdFx0XHRoID0gKDIgLyAzKSArIGdkaWYgLSByZGlmO1xuXHRcdH1cblxuXHRcdGlmIChoIDwgMCkge1xuXHRcdFx0aCArPSAxO1xuXHRcdH0gZWxzZSBpZiAoaCA+IDEpIHtcblx0XHRcdGggLT0gMTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdGggKiAzNjAsXG5cdFx0cyAqIDEwMCxcblx0XHR2ICogMTAwXG5cdF07XG59O1xuXG5jb252ZXJ0LnJnYi5od2IgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF07XG5cdGNvbnN0IGcgPSByZ2JbMV07XG5cdGxldCBiID0gcmdiWzJdO1xuXHRjb25zdCBoID0gY29udmVydC5yZ2IuaHNsKHJnYilbMF07XG5cdGNvbnN0IHcgPSAxIC8gMjU1ICogTWF0aC5taW4ociwgTWF0aC5taW4oZywgYikpO1xuXG5cdGIgPSAxIC0gMSAvIDI1NSAqIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcblxuXHRyZXR1cm4gW2gsIHcgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuY215ayA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHRjb25zdCBrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG5cdGNvbnN0IGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0Y29uc3QgbSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCB5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cblx0cmV0dXJuIFtjICogMTAwLCBtICogMTAwLCB5ICogMTAwLCBrICogMTAwXTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmF0aXZlRGlzdGFuY2UoeCwgeSkge1xuXHQvKlxuXHRcdFNlZSBodHRwczovL2VuLm0ud2lraXBlZGlhLm9yZy93aWtpL0V1Y2xpZGVhbl9kaXN0YW5jZSNTcXVhcmVkX0V1Y2xpZGVhbl9kaXN0YW5jZVxuXHQqL1xuXHRyZXR1cm4gKFxuXHRcdCgoeFswXSAtIHlbMF0pICoqIDIpICtcblx0XHQoKHhbMV0gLSB5WzFdKSAqKiAyKSArXG5cdFx0KCh4WzJdIC0geVsyXSkgKiogMilcblx0KTtcbn1cblxuY29udmVydC5yZ2Iua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgcmV2ZXJzZWQgPSByZXZlcnNlS2V5d29yZHNbcmdiXTtcblx0aWYgKHJldmVyc2VkKSB7XG5cdFx0cmV0dXJuIHJldmVyc2VkO1xuXHR9XG5cblx0bGV0IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblx0bGV0IGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcblxuXHRmb3IgKGNvbnN0IGtleXdvcmQgb2YgT2JqZWN0LmtleXMoY3NzS2V5d29yZHMpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcblxuXHRcdC8vIENvbXB1dGUgY29tcGFyYXRpdmUgZGlzdGFuY2Vcblx0XHRjb25zdCBkaXN0YW5jZSA9IGNvbXBhcmF0aXZlRGlzdGFuY2UocmdiLCB2YWx1ZSk7XG5cblx0XHQvLyBDaGVjayBpZiBpdHMgbGVzcywgaWYgc28gc2V0IGFzIGNsb3Nlc3Rcblx0XHRpZiAoZGlzdGFuY2UgPCBjdXJyZW50Q2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2U7XG5cdFx0XHRjdXJyZW50Q2xvc2VzdEtleXdvcmQgPSBrZXl3b3JkO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG59O1xuXG5jb252ZXJ0LmtleXdvcmQucmdiID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcblx0cmV0dXJuIGNzc0tleXdvcmRzW2tleXdvcmRdO1xufTtcblxuY29udmVydC5yZ2IueHl6ID0gZnVuY3Rpb24gKHJnYikge1xuXHRsZXQgciA9IHJnYlswXSAvIDI1NTtcblx0bGV0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGxldCBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdC8vIEFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wNDA0NSA/ICgoKHIgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChyIC8gMTIuOTIpO1xuXHRnID0gZyA+IDAuMDQwNDUgPyAoKChnICsgMC4wNTUpIC8gMS4wNTUpICoqIDIuNCkgOiAoZyAvIDEyLjkyKTtcblx0YiA9IGIgPiAwLjA0MDQ1ID8gKCgoYiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQpIDogKGIgLyAxMi45Mik7XG5cblx0Y29uc3QgeCA9IChyICogMC40MTI0KSArIChnICogMC4zNTc2KSArIChiICogMC4xODA1KTtcblx0Y29uc3QgeSA9IChyICogMC4yMTI2KSArIChnICogMC43MTUyKSArIChiICogMC4wNzIyKTtcblx0Y29uc3QgeiA9IChyICogMC4wMTkzKSArIChnICogMC4xMTkyKSArIChiICogMC45NTA1KTtcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IubGFiID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB4eXogPSBjb252ZXJ0LnJnYi54eXoocmdiKTtcblx0bGV0IHggPSB4eXpbMF07XG5cdGxldCB5ID0geHl6WzFdO1xuXHRsZXQgeiA9IHh5elsyXTtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gKHggKiogKDEgLyAzKSkgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyAoeSAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/ICh6ICoqICgxIC8gMykpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGNvbnN0IGwgPSAoMTE2ICogeSkgLSAxNjtcblx0Y29uc3QgYSA9IDUwMCAqICh4IC0geSk7XG5cdGNvbnN0IGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmhzbC5yZ2IgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF0gLyAzNjA7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cdGxldCB0Mjtcblx0bGV0IHQzO1xuXHRsZXQgdmFsO1xuXG5cdGlmIChzID09PSAwKSB7XG5cdFx0dmFsID0gbCAqIDI1NTtcblx0XHRyZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuXHR9XG5cblx0aWYgKGwgPCAwLjUpIHtcblx0XHR0MiA9IGwgKiAoMSArIHMpO1xuXHR9IGVsc2Uge1xuXHRcdHQyID0gbCArIHMgLSBsICogcztcblx0fVxuXG5cdGNvbnN0IHQxID0gMiAqIGwgLSB0MjtcblxuXHRjb25zdCByZ2IgPSBbMCwgMCwgMF07XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0dDMgPSBoICsgMSAvIDMgKiAtKGkgLSAxKTtcblx0XHRpZiAodDMgPCAwKSB7XG5cdFx0XHR0MysrO1xuXHRcdH1cblxuXHRcdGlmICh0MyA+IDEpIHtcblx0XHRcdHQzLS07XG5cdFx0fVxuXG5cdFx0aWYgKDYgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzO1xuXHRcdH0gZWxzZSBpZiAoMiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDI7XG5cdFx0fSBlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhbCA9IHQxO1xuXHRcdH1cblxuXHRcdHJnYltpXSA9IHZhbCAqIDI1NTtcblx0fVxuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jb252ZXJ0LmhzbC5oc3YgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF07XG5cdGxldCBzID0gaHNsWzFdIC8gMTAwO1xuXHRsZXQgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHNtaW4gPSBzO1xuXHRjb25zdCBsbWluID0gTWF0aC5tYXgobCwgMC4wMSk7XG5cblx0bCAqPSAyO1xuXHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRzbWluICo9IGxtaW4gPD0gMSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0Y29uc3QgdiA9IChsICsgcykgLyAyO1xuXHRjb25zdCBzdiA9IGwgPT09IDAgPyAoMiAqIHNtaW4pIC8gKGxtaW4gKyBzbWluKSA6ICgyICogcykgLyAobCArIHMpO1xuXG5cdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YucmdiID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdIC8gNjA7XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGxldCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCBoaSA9IE1hdGguZmxvb3IoaCkgJSA2O1xuXG5cdGNvbnN0IGYgPSBoIC0gTWF0aC5mbG9vcihoKTtcblx0Y29uc3QgcCA9IDI1NSAqIHYgKiAoMSAtIHMpO1xuXHRjb25zdCBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSk7XG5cdGNvbnN0IHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcblx0diAqPSAyNTU7XG5cblx0c3dpdGNoIChoaSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHJldHVybiBbdiwgdCwgcF07XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cmV0dXJuIFtxLCB2LCBwXTtcblx0XHRjYXNlIDI6XG5cdFx0XHRyZXR1cm4gW3AsIHYsIHRdO1xuXHRcdGNhc2UgMzpcblx0XHRcdHJldHVybiBbcCwgcSwgdl07XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cmV0dXJuIFt0LCBwLCB2XTtcblx0XHRjYXNlIDU6XG5cdFx0XHRyZXR1cm4gW3YsIHAsIHFdO1xuXHR9XG59O1xuXG5jb252ZXJ0Lmhzdi5oc2wgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IGggPSBoc3ZbMF07XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGNvbnN0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cdGNvbnN0IHZtaW4gPSBNYXRoLm1heCh2LCAwLjAxKTtcblx0bGV0IHNsO1xuXHRsZXQgbDtcblxuXHRsID0gKDIgLSBzKSAqIHY7XG5cdGNvbnN0IGxtaW4gPSAoMiAtIHMpICogdm1pbjtcblx0c2wgPSBzICogdm1pbjtcblx0c2wgLz0gKGxtaW4gPD0gMSkgPyBsbWluIDogMiAtIGxtaW47XG5cdHNsID0gc2wgfHwgMDtcblx0bCAvPSAyO1xuXG5cdHJldHVybiBbaCwgc2wgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyNod2ItdG8tcmdiXG5jb252ZXJ0Lmh3Yi5yZ2IgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdGNvbnN0IGggPSBod2JbMF0gLyAzNjA7XG5cdGxldCB3aCA9IGh3YlsxXSAvIDEwMDtcblx0bGV0IGJsID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCByYXRpbyA9IHdoICsgYmw7XG5cdGxldCBmO1xuXG5cdC8vIFdoICsgYmwgY2FudCBiZSA+IDFcblx0aWYgKHJhdGlvID4gMSkge1xuXHRcdHdoIC89IHJhdGlvO1xuXHRcdGJsIC89IHJhdGlvO1xuXHR9XG5cblx0Y29uc3QgaSA9IE1hdGguZmxvb3IoNiAqIGgpO1xuXHRjb25zdCB2ID0gMSAtIGJsO1xuXHRmID0gNiAqIGggLSBpO1xuXG5cdGlmICgoaSAmIDB4MDEpICE9PSAwKSB7XG5cdFx0ZiA9IDEgLSBmO1xuXHR9XG5cblx0Y29uc3QgbiA9IHdoICsgZiAqICh2IC0gd2gpOyAvLyBMaW5lYXIgaW50ZXJwb2xhdGlvblxuXG5cdGxldCByO1xuXHRsZXQgZztcblx0bGV0IGI7XG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lLG5vLW11bHRpLXNwYWNlcyAqL1xuXHRzd2l0Y2ggKGkpIHtcblx0XHRkZWZhdWx0OlxuXHRcdGNhc2UgNjpcblx0XHRjYXNlIDA6IHIgPSB2OyAgZyA9IG47ICBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMTogciA9IG47ICBnID0gdjsgIGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAyOiByID0gd2g7IGcgPSB2OyAgYiA9IG47IGJyZWFrO1xuXHRcdGNhc2UgMzogciA9IHdoOyBnID0gbjsgIGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDQ6IHIgPSBuOyAgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA1OiByID0gdjsgIGcgPSB3aDsgYiA9IG47IGJyZWFrO1xuXHR9XG5cdC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUsbm8tbXVsdGktc3BhY2VzICovXG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQuY215ay5yZ2IgPSBmdW5jdGlvbiAoY215aykge1xuXHRjb25zdCBjID0gY215a1swXSAvIDEwMDtcblx0Y29uc3QgbSA9IGNteWtbMV0gLyAxMDA7XG5cdGNvbnN0IHkgPSBjbXlrWzJdIC8gMTAwO1xuXHRjb25zdCBrID0gY215a1szXSAvIDEwMDtcblxuXHRjb25zdCByID0gMSAtIE1hdGgubWluKDEsIGMgKiAoMSAtIGspICsgayk7XG5cdGNvbnN0IGcgPSAxIC0gTWF0aC5taW4oMSwgbSAqICgxIC0gaykgKyBrKTtcblx0Y29uc3QgYiA9IDEgLSBNYXRoLm1pbigxLCB5ICogKDEgLSBrKSArIGspO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5yZ2IgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGNvbnN0IHggPSB4eXpbMF0gLyAxMDA7XG5cdGNvbnN0IHkgPSB4eXpbMV0gLyAxMDA7XG5cdGNvbnN0IHogPSB4eXpbMl0gLyAxMDA7XG5cdGxldCByO1xuXHRsZXQgZztcblx0bGV0IGI7XG5cblx0ciA9ICh4ICogMy4yNDA2KSArICh5ICogLTEuNTM3MikgKyAoeiAqIC0wLjQ5ODYpO1xuXHRnID0gKHggKiAtMC45Njg5KSArICh5ICogMS44NzU4KSArICh6ICogMC4wNDE1KTtcblx0YiA9ICh4ICogMC4wNTU3KSArICh5ICogLTAuMjA0MCkgKyAoeiAqIDEuMDU3MCk7XG5cblx0Ly8gQXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiAociAqKiAoMS4wIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiByICogMTIuOTI7XG5cblx0ZyA9IGcgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiAoZyAqKiAoMS4wIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiBnICogMTIuOTI7XG5cblx0YiA9IGIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiAoYiAqKiAoMS4wIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiBiICogMTIuOTI7XG5cblx0ciA9IE1hdGgubWluKE1hdGgubWF4KDAsIHIpLCAxKTtcblx0ZyA9IE1hdGgubWluKE1hdGgubWF4KDAsIGcpLCAxKTtcblx0YiA9IE1hdGgubWluKE1hdGgubWF4KDAsIGIpLCAxKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoubGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyAoeCAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/ICh5ICoqICgxIC8gMykpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQubGFiLnh5eiA9IGZ1bmN0aW9uIChsYWIpIHtcblx0Y29uc3QgbCA9IGxhYlswXTtcblx0Y29uc3QgYSA9IGxhYlsxXTtcblx0Y29uc3QgYiA9IGxhYlsyXTtcblx0bGV0IHg7XG5cdGxldCB5O1xuXHRsZXQgejtcblxuXHR5ID0gKGwgKyAxNikgLyAxMTY7XG5cdHggPSBhIC8gNTAwICsgeTtcblx0eiA9IHkgLSBiIC8gMjAwO1xuXG5cdGNvbnN0IHkyID0geSAqKiAzO1xuXHRjb25zdCB4MiA9IHggKiogMztcblx0Y29uc3QgejIgPSB6ICoqIDM7XG5cdHkgPSB5MiA+IDAuMDA4ODU2ID8geTIgOiAoeSAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR4ID0geDIgPiAwLjAwODg1NiA/IHgyIDogKHggLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eiA9IHoyID4gMC4wMDg4NTYgPyB6MiA6ICh6IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cblx0eCAqPSA5NS4wNDc7XG5cdHkgKj0gMTAwO1xuXHR6ICo9IDEwOC44ODM7XG5cblx0cmV0dXJuIFt4LCB5LCB6XTtcbn07XG5cbmNvbnZlcnQubGFiLmxjaCA9IGZ1bmN0aW9uIChsYWIpIHtcblx0Y29uc3QgbCA9IGxhYlswXTtcblx0Y29uc3QgYSA9IGxhYlsxXTtcblx0Y29uc3QgYiA9IGxhYlsyXTtcblx0bGV0IGg7XG5cblx0Y29uc3QgaHIgPSBNYXRoLmF0YW4yKGIsIGEpO1xuXHRoID0gaHIgKiAzNjAgLyAyIC8gTWF0aC5QSTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGNvbnN0IGMgPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG5cblx0cmV0dXJuIFtsLCBjLCBoXTtcbn07XG5cbmNvbnZlcnQubGNoLmxhYiA9IGZ1bmN0aW9uIChsY2gpIHtcblx0Y29uc3QgbCA9IGxjaFswXTtcblx0Y29uc3QgYyA9IGxjaFsxXTtcblx0Y29uc3QgaCA9IGxjaFsyXTtcblxuXHRjb25zdCBociA9IGggLyAzNjAgKiAyICogTWF0aC5QSTtcblx0Y29uc3QgYSA9IGMgKiBNYXRoLmNvcyhocik7XG5cdGNvbnN0IGIgPSBjICogTWF0aC5zaW4oaHIpO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncywgc2F0dXJhdGlvbiA9IG51bGwpIHtcblx0Y29uc3QgW3IsIGcsIGJdID0gYXJncztcblx0bGV0IHZhbHVlID0gc2F0dXJhdGlvbiA9PT0gbnVsbCA/IGNvbnZlcnQucmdiLmhzdihhcmdzKVsyXSA6IHNhdHVyYXRpb247IC8vIEhzdiAtPiBhbnNpMTYgb3B0aW1pemF0aW9uXG5cblx0dmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlIC8gNTApO1xuXG5cdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdHJldHVybiAzMDtcblx0fVxuXG5cdGxldCBhbnNpID0gMzBcblx0XHQrICgoTWF0aC5yb3VuZChiIC8gMjU1KSA8PCAyKVxuXHRcdHwgKE1hdGgucm91bmQoZyAvIDI1NSkgPDwgMSlcblx0XHR8IE1hdGgucm91bmQociAvIDI1NSkpO1xuXG5cdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdGFuc2kgKz0gNjA7XG5cdH1cblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuaHN2LmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIE9wdGltaXphdGlvbiBoZXJlOyB3ZSBhbHJlYWR5IGtub3cgdGhlIHZhbHVlIGFuZCBkb24ndCBuZWVkIHRvIGdldFxuXHQvLyBpdCBjb252ZXJ0ZWQgZm9yIHVzLlxuXHRyZXR1cm4gY29udmVydC5yZ2IuYW5zaTE2KGNvbnZlcnQuaHN2LnJnYihhcmdzKSwgYXJnc1syXSk7XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMjU2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgciA9IGFyZ3NbMF07XG5cdGNvbnN0IGcgPSBhcmdzWzFdO1xuXHRjb25zdCBiID0gYXJnc1syXTtcblxuXHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0aWYgKHIgPT09IGcgJiYgZyA9PT0gYikge1xuXHRcdGlmIChyIDwgOCkge1xuXHRcdFx0cmV0dXJuIDE2O1xuXHRcdH1cblxuXHRcdGlmIChyID4gMjQ4KSB7XG5cdFx0XHRyZXR1cm4gMjMxO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLnJvdW5kKCgociAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0fVxuXG5cdGNvbnN0IGFuc2kgPSAxNlxuXHRcdCsgKDM2ICogTWF0aC5yb3VuZChyIC8gMjU1ICogNSkpXG5cdFx0KyAoNiAqIE1hdGgucm91bmQoZyAvIDI1NSAqIDUpKVxuXHRcdCsgTWF0aC5yb3VuZChiIC8gMjU1ICogNSk7XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0LmFuc2kxNi5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRsZXQgY29sb3IgPSBhcmdzICUgMTA7XG5cblx0Ly8gSGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoY29sb3IgPT09IDAgfHwgY29sb3IgPT09IDcpIHtcblx0XHRpZiAoYXJncyA+IDUwKSB7XG5cdFx0XHRjb2xvciArPSAzLjU7XG5cdFx0fVxuXG5cdFx0Y29sb3IgPSBjb2xvciAvIDEwLjUgKiAyNTU7XG5cblx0XHRyZXR1cm4gW2NvbG9yLCBjb2xvciwgY29sb3JdO1xuXHR9XG5cblx0Y29uc3QgbXVsdCA9ICh+fihhcmdzID4gNTApICsgMSkgKiAwLjU7XG5cdGNvbnN0IHIgPSAoKGNvbG9yICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgZyA9ICgoKGNvbG9yID4+IDEpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgYiA9ICgoKGNvbG9yID4+IDIpICYgMSkgKiBtdWx0KSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5hbnNpMjU2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIEhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGFyZ3MgPj0gMjMyKSB7XG5cdFx0Y29uc3QgYyA9IChhcmdzIC0gMjMyKSAqIDEwICsgODtcblx0XHRyZXR1cm4gW2MsIGMsIGNdO1xuXHR9XG5cblx0YXJncyAtPSAxNjtcblxuXHRsZXQgcmVtO1xuXHRjb25zdCByID0gTWF0aC5mbG9vcihhcmdzIC8gMzYpIC8gNSAqIDI1NTtcblx0Y29uc3QgZyA9IE1hdGguZmxvb3IoKHJlbSA9IGFyZ3MgJSAzNikgLyA2KSAvIDUgKiAyNTU7XG5cdGNvbnN0IGIgPSAocmVtICUgNikgLyA1ICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oZXggPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCBpbnRlZ2VyID0gKChNYXRoLnJvdW5kKGFyZ3NbMF0pICYgMHhGRikgPDwgMTYpXG5cdFx0KyAoKE1hdGgucm91bmQoYXJnc1sxXSkgJiAweEZGKSA8PCA4KVxuXHRcdCsgKE1hdGgucm91bmQoYXJnc1syXSkgJiAweEZGKTtcblxuXHRjb25zdCBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5oZXgucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgbWF0Y2ggPSBhcmdzLnRvU3RyaW5nKDE2KS5tYXRjaCgvW2EtZjAtOV17Nn18W2EtZjAtOV17M30vaSk7XG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHR9XG5cblx0bGV0IGNvbG9yU3RyaW5nID0gbWF0Y2hbMF07XG5cblx0aWYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gMykge1xuXHRcdGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcuc3BsaXQoJycpLm1hcChjaGFyID0+IHtcblx0XHRcdHJldHVybiBjaGFyICsgY2hhcjtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdGNvbnN0IGludGVnZXIgPSBwYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXHRjb25zdCByID0gKGludGVnZXIgPj4gMTYpICYgMHhGRjtcblx0Y29uc3QgZyA9IChpbnRlZ2VyID4+IDgpICYgMHhGRjtcblx0Y29uc3QgYiA9IGludGVnZXIgJiAweEZGO1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oY2cgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IG1heCA9IE1hdGgubWF4KE1hdGgubWF4KHIsIGcpLCBiKTtcblx0Y29uc3QgbWluID0gTWF0aC5taW4oTWF0aC5taW4ociwgZyksIGIpO1xuXHRjb25zdCBjaHJvbWEgPSAobWF4IC0gbWluKTtcblx0bGV0IGdyYXlzY2FsZTtcblx0bGV0IGh1ZTtcblxuXHRpZiAoY2hyb21hIDwgMSkge1xuXHRcdGdyYXlzY2FsZSA9IG1pbiAvICgxIC0gY2hyb21hKTtcblx0fSBlbHNlIHtcblx0XHRncmF5c2NhbGUgPSAwO1xuXHR9XG5cblx0aWYgKGNocm9tYSA8PSAwKSB7XG5cdFx0aHVlID0gMDtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IHIpIHtcblx0XHRodWUgPSAoKGcgLSBiKSAvIGNocm9tYSkgJSA2O1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gZykge1xuXHRcdGh1ZSA9IDIgKyAoYiAtIHIpIC8gY2hyb21hO1xuXHR9IGVsc2Uge1xuXHRcdGh1ZSA9IDQgKyAociAtIGcpIC8gY2hyb21hO1xuXHR9XG5cblx0aHVlIC89IDY7XG5cdGh1ZSAlPSAxO1xuXG5cdHJldHVybiBbaHVlICogMzYwLCBjaHJvbWEgKiAxMDAsIGdyYXlzY2FsZSAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhzbC5oY2cgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cblx0Y29uc3QgYyA9IGwgPCAwLjUgPyAoMi4wICogcyAqIGwpIDogKDIuMCAqIHMgKiAoMS4wIC0gbCkpO1xuXG5cdGxldCBmID0gMDtcblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKGwgLSAwLjUgKiBjKSAvICgxLjAgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHNsWzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LmhjZyA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0Y29uc3QgdiA9IGhzdlsyXSAvIDEwMDtcblxuXHRjb25zdCBjID0gcyAqIHY7XG5cdGxldCBmID0gMDtcblxuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHN2WzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLnJnYiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgaCA9IGhjZ1swXSAvIDM2MDtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRpZiAoYyA9PT0gMC4wKSB7XG5cdFx0cmV0dXJuIFtnICogMjU1LCBnICogMjU1LCBnICogMjU1XTtcblx0fVxuXG5cdGNvbnN0IHB1cmUgPSBbMCwgMCwgMF07XG5cdGNvbnN0IGhpID0gKGggJSAxKSAqIDY7XG5cdGNvbnN0IHYgPSBoaSAlIDE7XG5cdGNvbnN0IHcgPSAxIC0gdjtcblx0bGV0IG1nID0gMDtcblxuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSAqL1xuXHRzd2l0Y2ggKE1hdGguZmxvb3IoaGkpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSB2OyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cHVyZVswXSA9IHc7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSB3OyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cHVyZVswXSA9IHY7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IHc7XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSAqL1xuXG5cdG1nID0gKDEuMCAtIGMpICogZztcblxuXHRyZXR1cm4gW1xuXHRcdChjICogcHVyZVswXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMV0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzJdICsgbWcpICogMjU1XG5cdF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc3YgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0Y29uc3QgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHRsZXQgZiA9IDA7XG5cblx0aWYgKHYgPiAwLjApIHtcblx0XHRmID0gYyAvIHY7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgZiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc2wgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0Y29uc3QgbCA9IGcgKiAoMS4wIC0gYykgKyAwLjUgKiBjO1xuXHRsZXQgcyA9IDA7XG5cblx0aWYgKGwgPiAwLjAgJiYgbCA8IDAuNSkge1xuXHRcdHMgPSBjIC8gKDIgKiBsKTtcblx0fSBlbHNlXG5cdGlmIChsID49IDAuNSAmJiBsIDwgMS4wKSB7XG5cdFx0cyA9IGMgLyAoMiAqICgxIC0gbCkpO1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHdiID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdHJldHVybiBbaGNnWzBdLCAodiAtIGMpICogMTAwLCAoMSAtIHYpICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHdiLmhjZyA9IGZ1bmN0aW9uIChod2IpIHtcblx0Y29uc3QgdyA9IGh3YlsxXSAvIDEwMDtcblx0Y29uc3QgYiA9IGh3YlsyXSAvIDEwMDtcblx0Y29uc3QgdiA9IDEgLSBiO1xuXHRjb25zdCBjID0gdiAtIHc7XG5cdGxldCBnID0gMDtcblxuXHRpZiAoYyA8IDEpIHtcblx0XHRnID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2h3YlswXSwgYyAqIDEwMCwgZyAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmFwcGxlLnJnYiA9IGZ1bmN0aW9uIChhcHBsZSkge1xuXHRyZXR1cm4gWyhhcHBsZVswXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzFdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMl0gLyA2NTUzNSkgKiAyNTVdO1xufTtcblxuY29udmVydC5yZ2IuYXBwbGUgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHJldHVybiBbKHJnYlswXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsxXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsyXSAvIDI1NSkgKiA2NTUzNV07XG59O1xuXG5jb252ZXJ0LmdyYXkucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFthcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oc2wgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gWzAsIDAsIGFyZ3NbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmhzdiA9IGNvbnZlcnQuZ3JheS5oc2w7XG5cbmNvbnZlcnQuZ3JheS5od2IgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDEwMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuY215ayA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMCwgMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkubGFiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFtncmF5WzBdLCAwLCAwXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oZXggPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRjb25zdCB2YWwgPSBNYXRoLnJvdW5kKGdyYXlbMF0gLyAxMDAgKiAyNTUpICYgMHhGRjtcblx0Y29uc3QgaW50ZWdlciA9ICh2YWwgPDwgMTYpICsgKHZhbCA8PCA4KSArIHZhbDtcblxuXHRjb25zdCBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5yZ2IuZ3JheSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgdmFsID0gKHJnYlswXSArIHJnYlsxXSArIHJnYlsyXSkgLyAzO1xuXHRyZXR1cm4gW3ZhbCAvIDI1NSAqIDEwMF07XG59O1xuIiwiY29uc3QgY29udmVyc2lvbnMgPSByZXF1aXJlKCcuL2NvbnZlcnNpb25zJyk7XG5jb25zdCByb3V0ZSA9IHJlcXVpcmUoJy4vcm91dGUnKTtcblxuY29uc3QgY29udmVydCA9IHt9O1xuXG5jb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cbmZ1bmN0aW9uIHdyYXBSYXcoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdHJldHVybiBmbihhcmdzKTtcblx0fTtcblxuXHQvLyBQcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbmZ1bmN0aW9uIHdyYXBSb3VuZGVkKGZuKSB7XG5cdGNvbnN0IHdyYXBwZWRGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0Y29uc3QgYXJnMCA9IGFyZ3NbMF07XG5cblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gV2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAobGV0IGxlbiA9IHJlc3VsdC5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Ly8gUHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5tb2RlbHMuZm9yRWFjaChmcm9tTW9kZWwgPT4ge1xuXHRjb252ZXJ0W2Zyb21Nb2RlbF0gPSB7fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0uY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5sYWJlbHN9KTtcblxuXHRjb25zdCByb3V0ZXMgPSByb3V0ZShmcm9tTW9kZWwpO1xuXHRjb25zdCByb3V0ZU1vZGVscyA9IE9iamVjdC5rZXlzKHJvdXRlcyk7XG5cblx0cm91dGVNb2RlbHMuZm9yRWFjaCh0b01vZGVsID0+IHtcblx0XHRjb25zdCBmbiA9IHJvdXRlc1t0b01vZGVsXTtcblxuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXSA9IHdyYXBSb3VuZGVkKGZuKTtcblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0ucmF3ID0gd3JhcFJhdyhmbik7XG5cdH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydDtcbiIsImNvbnN0IGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xuXG4vKlxuXHRUaGlzIGZ1bmN0aW9uIHJvdXRlcyBhIG1vZGVsIHRvIGFsbCBvdGhlciBtb2RlbHMuXG5cblx0YWxsIGZ1bmN0aW9ucyB0aGF0IGFyZSByb3V0ZWQgaGF2ZSBhIHByb3BlcnR5IGAuY29udmVyc2lvbmAgYXR0YWNoZWRcblx0dG8gdGhlIHJldHVybmVkIHN5bnRoZXRpYyBmdW5jdGlvbi4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuXHRvZiBzdHJpbmdzLCBlYWNoIHdpdGggdGhlIHN0ZXBzIGluIGJldHdlZW4gdGhlICdmcm9tJyBhbmQgJ3RvJ1xuXHRjb2xvciBtb2RlbHMgKGluY2x1c2l2ZSkuXG5cblx0Y29udmVyc2lvbnMgdGhhdCBhcmUgbm90IHBvc3NpYmxlIHNpbXBseSBhcmUgbm90IGluY2x1ZGVkLlxuKi9cblxuZnVuY3Rpb24gYnVpbGRHcmFwaCgpIHtcblx0Y29uc3QgZ3JhcGggPSB7fTtcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL29iamVjdC1rZXlzLXZzLWZvci1pbi13aXRoLWNsb3N1cmUvM1xuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cblx0Zm9yIChsZXQgbGVuID0gbW9kZWxzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdGdyYXBoW21vZGVsc1tpXV0gPSB7XG5cdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS8xLXZzLWluZmluaXR5XG5cdFx0XHQvLyBtaWNyby1vcHQsIGJ1dCB0aGlzIGlzIHNpbXBsZS5cblx0XHRcdGRpc3RhbmNlOiAtMSxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZWFkdGgtZmlyc3Rfc2VhcmNoXG5mdW5jdGlvbiBkZXJpdmVCRlMoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gYnVpbGRHcmFwaCgpO1xuXHRjb25zdCBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyBVbnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gcXVldWUucG9wKCk7XG5cdFx0Y29uc3QgYWRqYWNlbnRzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnNbY3VycmVudF0pO1xuXG5cdFx0Zm9yIChsZXQgbGVuID0gYWRqYWNlbnRzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0Y29uc3QgYWRqYWNlbnQgPSBhZGphY2VudHNbaV07XG5cdFx0XHRjb25zdCBub2RlID0gZ3JhcGhbYWRqYWNlbnRdO1xuXG5cdFx0XHRpZiAobm9kZS5kaXN0YW5jZSA9PT0gLTEpIHtcblx0XHRcdFx0bm9kZS5kaXN0YW5jZSA9IGdyYXBoW2N1cnJlbnRdLmRpc3RhbmNlICsgMTtcblx0XHRcdFx0bm9kZS5wYXJlbnQgPSBjdXJyZW50O1xuXHRcdFx0XHRxdWV1ZS51bnNoaWZ0KGFkamFjZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbmZ1bmN0aW9uIGxpbmsoZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0cmV0dXJuIHRvKGZyb20oYXJncykpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCkge1xuXHRjb25zdCBwYXRoID0gW2dyYXBoW3RvTW9kZWxdLnBhcmVudCwgdG9Nb2RlbF07XG5cdGxldCBmbiA9IGNvbnZlcnNpb25zW2dyYXBoW3RvTW9kZWxdLnBhcmVudF1bdG9Nb2RlbF07XG5cblx0bGV0IGN1ciA9IGdyYXBoW3RvTW9kZWxdLnBhcmVudDtcblx0d2hpbGUgKGdyYXBoW2N1cl0ucGFyZW50KSB7XG5cdFx0cGF0aC51bnNoaWZ0KGdyYXBoW2N1cl0ucGFyZW50KTtcblx0XHRmbiA9IGxpbmsoY29udmVyc2lvbnNbZ3JhcGhbY3VyXS5wYXJlbnRdW2N1cl0sIGZuKTtcblx0XHRjdXIgPSBncmFwaFtjdXJdLnBhcmVudDtcblx0fVxuXG5cdGZuLmNvbnZlcnNpb24gPSBwYXRoO1xuXHRyZXR1cm4gZm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZyb21Nb2RlbCkge1xuXHRjb25zdCBncmFwaCA9IGRlcml2ZUJGUyhmcm9tTW9kZWwpO1xuXHRjb25zdCBjb252ZXJzaW9uID0ge307XG5cblx0Y29uc3QgbW9kZWxzID0gT2JqZWN0LmtleXMoZ3JhcGgpO1xuXHRmb3IgKGxldCBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Y29uc3QgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHRjb25zdCBub2RlID0gZ3JhcGhbdG9Nb2RlbF07XG5cblx0XHRpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblx0XHRcdC8vIE5vIHBvc3NpYmxlIGNvbnZlcnNpb24sIG9yIHRoaXMgbm9kZSBpcyB0aGUgc291cmNlIG1vZGVsLlxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udmVyc2lvblt0b01vZGVsXSA9IHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKTtcblx0fVxuXG5cdHJldHVybiBjb252ZXJzaW9uO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXHJcblx0XCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxyXG5cdFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXHJcblx0XCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXHJcblx0XCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXHJcblx0XCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxyXG5cdFwiYmxhY2tcIjogWzAsIDAsIDBdLFxyXG5cdFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxyXG5cdFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcclxuXHRcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXHJcblx0XCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxyXG5cdFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcclxuXHRcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcclxuXHRcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcclxuXHRcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcclxuXHRcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxyXG5cdFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxyXG5cdFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxyXG5cdFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxyXG5cdFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXHJcblx0XCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxyXG5cdFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcclxuXHRcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcclxuXHRcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXHJcblx0XCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxyXG5cdFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcclxuXHRcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcclxuXHRcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXHJcblx0XCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxyXG5cdFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXHJcblx0XCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxyXG5cdFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxyXG5cdFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcclxuXHRcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcclxuXHRcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxyXG5cdFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcclxuXHRcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxyXG5cdFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXHJcblx0XCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXHJcblx0XCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxyXG5cdFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcclxuXHRcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxyXG5cdFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxyXG5cdFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxyXG5cdFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJncmVlblwiOiBbMCwgMTI4LCAwXSxcclxuXHRcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxyXG5cdFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXHJcblx0XCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcclxuXHRcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxyXG5cdFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcclxuXHRcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcclxuXHRcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcclxuXHRcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcclxuXHRcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxyXG5cdFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXHJcblx0XCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxyXG5cdFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcclxuXHRcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxyXG5cdFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcclxuXHRcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcclxuXHRcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcclxuXHRcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxyXG5cdFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxyXG5cdFwibGlnaHRzZWFncmVlblwiOiBbMzIsIDE3OCwgMTcwXSxcclxuXHRcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXHJcblx0XCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXHJcblx0XCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXHJcblx0XCJsaW1lXCI6IFswLCAyNTUsIDBdLFxyXG5cdFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXHJcblx0XCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXHJcblx0XCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXHJcblx0XCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcclxuXHRcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXHJcblx0XCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXHJcblx0XCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTldLFxyXG5cdFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXHJcblx0XCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxyXG5cdFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcclxuXHRcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcclxuXHRcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcclxuXHRcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxyXG5cdFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcclxuXHRcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXHJcblx0XCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXHJcblx0XCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXHJcblx0XCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxyXG5cdFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXHJcblx0XCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxyXG5cdFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxyXG5cdFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXHJcblx0XCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxyXG5cdFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcclxuXHRcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxyXG5cdFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcclxuXHRcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxyXG5cdFwicGFsZXZpb2xldHJlZFwiOiBbMjE5LCAxMTIsIDE0N10sXHJcblx0XCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcclxuXHRcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXHJcblx0XCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxyXG5cdFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXHJcblx0XCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcclxuXHRcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxyXG5cdFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXHJcblx0XCJyZWJlY2NhcHVycGxlXCI6IFsxMDIsIDUxLCAxNTNdLFxyXG5cdFwicmVkXCI6IFsyNTUsIDAsIDBdLFxyXG5cdFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcclxuXHRcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcclxuXHRcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXHJcblx0XCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxyXG5cdFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcclxuXHRcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXHJcblx0XCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXHJcblx0XCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcclxuXHRcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXHJcblx0XCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcclxuXHRcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcclxuXHRcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXHJcblx0XCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxyXG5cdFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxyXG5cdFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcclxuXHRcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcclxuXHRcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxyXG5cdFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXHJcblx0XCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXHJcblx0XCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxyXG5cdFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxyXG5cdFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdLFxyXG5cdFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXHJcblx0XCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcclxuXHRcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdXHJcbn07XHJcbiIsImltcG9ydCAqIGFzIGNvbnZlcnQgZnJvbSAnY29sb3ItY29udmVydCdcblxuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gZm9yIHN0cmluZ3MgKi9cbmV4cG9ydCB0eXBlIFJhbmdlU3RyID0gW251bWJlciwgbnVtYmVyLCBzdHJpbmdbXV1cbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uIGZvciBsaW5lICovXG5leHBvcnQgdHlwZSBSYW5nZUxpbmUgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcj9dXG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VTaW1wbGUgPSBSYW5nZVN0ciB8IFJhbmdlTGluZVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHtcbiAgLyoqIFRoZSBzdHlsZSB0byBkcmF3IHJhbmdlLiBJdCBpcyBlaXRoZXIgb2YgW1wibGluZVwiLCBcImN1cnZlXCIsIFwiYXJyb3dcIiwgXCJzdHJcIl0uIElmIFwic3RyXCIgaXMgY2hvc2VuLCB0aGUgb3B0aW5hbCBwYXJhbWV0ZXIgYHN0cmAgbXVzdCBiZSBnaXZlbi4gRm9yIG90aGVyIHN0eWxlcywgeW91IGNhbiBzZXQgbGVmdCBzdHlsZSBhbmQgcmlnaHQgc3R5bGUgbGllIFwibGluZSxhcnJvd1wiLiAqL1xuICBzdHlsZTogc3RyaW5nXG4gIC8qKiBUaGUgY29sb3IgdG8gZHJhdyByYW5nZSwgZS5nLiBcIiMwMDAwMDBcIiBmb3IgYmxhY2suICovXG4gIGNvbG9yOiBzdHJpbmdcbiAgLyoqIFRoZSBiZWdpbm5pbmcgaW5kZXggb2YgdGhlIHJhbmdlLiAqL1xuICBiZWc6IG51bWJlclxuICAvKiogVGhlIGVuZGluZyBpbmRleCBvZiB0aGUgcmFuZ2UuIE5vdGUgdGhhdCBpbmRleGVzIGFyZSBpbmNsdXNpdmUuICovXG4gIGVuZDogbnVtYmVyXG4gIC8qKiBUaGUgc3RlcCBvZiB0aGUgcmFuZ2UgW2BiZWdgLCBgZW5kYF0uIEZvciBleGFtcGxlLCBhIHJhbmdlIFtgYmVnYCwgYGVuZGAsIGBzdGVwYF0gPSBbMSwgOCwgM10gcmVwcmVzZW50cyBjb250aW51b3VzIHJhbmdlcyBbW2BiZWdgLCBgZW5kYF1dPVtbMSwgM10sIFs0LCA2XSwgWzcsIDhdXSAqL1xuICBzdGVwPzogbnVtYmVyXG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlUHgge1xuICAvKiogVGhlIHN0eWxlIHRvIGRyYXcgcmFuZ2UuIEl0IGlzIGVpdGhlciBvZiBbXCJsaW5lXCIsIFwiY3VydmVcIiwgXCJhcnJvd1wiLCBcInN0clwiXS4gSWYgXCJzdHJcIiBpcyBjaG9zZW4sIHRoZSBvcHRpbmFsIHBhcmFtZXRlciBgc3RyYCBtdXN0IGJlIGdpdmVuLiBGb3Igb3RoZXIgc3R5bGVzLCB5b3UgY2FuIHNldCBsZWZ0IHN0eWxlIGFuZCByaWdodCBzdHlsZSBsaWUgXCJsaW5lLGFycm93XCIuICovXG4gIHN0eWxlOiBzdHJpbmdcbiAgLyoqIFRoZSBjb2xvciB0byBkcmF3IHJhbmdlLCBlLmcuIFwiIzAwMDAwMFwiIGZvciBibGFjay4gKi9cbiAgY29sb3I6IHN0cmluZ1xuICAvKiogVGhlIHgtY29vcmRpbmF0ZSB3aGljaCBiZWdpbnMgdGhlIHJhbmdlLiAqL1xuICB4X2JlZzogbnVtYmVyXG4gIC8qKiBUaGUgeC1jb29yZGluYXRlIHdoaWNoIGVuZHMgdGhlIHJhbmdlLiAqL1xuICB4X2VuZDogbnVtYmVyXG4gIC8qKiBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSByYW5nZS4gKi9cbiAgeTogbnVtYmVyXG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgY2xhc3MgVmlzU3RyIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgcHJpdmF0ZSBzdHJfeDogbnVtYmVyXG4gIHByaXZhdGUgc3RyX3k6IG51bWJlclxuICBwcml2YXRlIGZvbnRfc2l6ZTogbnVtYmVyXG4gIHByaXZhdGUgZm9udF9zaXplX2hhbGY6IG51bWJlclxuICBwcml2YXRlIGZvbnRfdHlwZTogc3RyaW5nXG4gIC8qKiBUaGUgb2Zmc2V0IHRvIHN0YXJ0IGRyYXdpbmcgYSByYW5nZSBmcm9tIGEgY2VudGVyIHBvc2l0aW9uIG9mIGFuIGluZGV4LiAqL1xuICBwcml2YXRlIHJhbmdlX2JlZ19vZmZzZXQ6IG51bWJlclxuICBwcml2YXRlIHJhbmdlX2VuZF9vZmZzZXQ6IG51bWJlclxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2FudmFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAqIEBwYXJhbSBmb250X3NpemUgZm9udCBzaXplXG4gICAqIEBwYXJhbSBmb250X3R5cGUgZm9udCBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgIGZvbnRfc2l6ZSA9IDMyLFxuICAgIGZvbnRfdHlwZSA9ICdDb3VyaWVyJyxcbiAgKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICB0aGlzLmZvbnRfc2l6ZSA9IGZvbnRfc2l6ZVxuICAgIHRoaXMuZm9udF9zaXplX2hhbGYgPSB0aGlzLmZvbnRfc2l6ZSAvIDJcbiAgICB0aGlzLmZvbnRfdHlwZSA9IGZvbnRfdHlwZVxuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplXG4gICAgdGhpcy5zdHJfeSA9IHRoaXMuZm9udF9zaXplICogMiArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICB0aGlzLnJhbmdlX2JlZ19vZmZzZXQgPSAtdGhpcy5mb250X3NpemUgLyA0XG4gICAgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0ID0gdGhpcy5mb250X3NpemUgLyA0XG4gIH1cblxuICAvKiogQ2xlYXIgdGhlIGNhbnZhcy4gKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgYmVnaW5uaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBiZWdpbm5pbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlQmVnKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9iZWdfb2Zmc2V0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgZW5kaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBlbmRpbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlRW5kKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiByYW5nZS5cbiAgICogQHBhcmFtIHIgQSByYW5nZS5cbiAgICovXG4gIHJhbmdlSGVpZ2h0KHI6IFJhbmdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gci5zdHlsZSA9PT0gJ3N0cicgPyB0aGlzLmZvbnRfc2l6ZSA6IE1hdGgucm91bmQodGhpcy5mb250X3NpemUgKiAwLjUpXG4gIH1cblxuICAvKipcbiAgICogRm9yIGEgcmFuZ2Ugbm90IHRvIGRyYXcgc3RyaW5ncywgc3BsaXQgaXQgdG8gdGhyZWUgcGFydHMgbGVmdCwgY2VudGVyLCBhbmQgcmlnaHQuXG4gICAqIEBwYXJhbSBycHggR2l2ZW4gcmFuZ2UgdG8gc3BsaXQuXG4gICAqL1xuICBzcGxpdFJhbmdlUHgocnB4OiBSYW5nZVB4KTogUmFuZ2VQeFtdIHtcbiAgICBjb25zdCBzdHlsZXMgPSBycHguc3R5bGUuc3BsaXQoJywnKVxuXG4gICAgbGV0IHJsID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KVxuICAgIGxldCByYyA9IE9iamVjdC5hc3NpZ24oe30sIHJweClcbiAgICBsZXQgcnIgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpXG4gICAgcmwueF9lbmQgPSBycHgueF9iZWcgKyB0aGlzLmN1cnZlX2QoKVxuICAgIHJsLnN0eWxlID0gc3R5bGVzWzBdXG5cbiAgICByci54X2JlZyA9IHJweC54X2VuZFxuICAgIHJyLnhfZW5kID0gcnB4LnhfZW5kIC0gdGhpcy5jdXJ2ZV9kKClcbiAgICByci5zdHlsZSA9IHN0eWxlcy5sZW5ndGggPiAxID8gc3R5bGVzWzFdIDogc3R5bGVzWzBdXG5cbiAgICByYy54X2JlZyA9IHJsLnhfZW5kXG4gICAgcmMueF9lbmQgPSByci54X2VuZFxuICAgIHJjLnN0eWxlID0gJ2xpbmUnXG4gICAgcmV0dXJuIFtybCwgcmMsIHJyXVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgY3VydmUgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3Q3VydmVQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2JlZywgcnB4LnkgLSB0aGlzLmN1cnZlX2QoKSlcbiAgICB0aGlzLmN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHJweC54X2JlZywgcnB4LnksIHJweC54X2VuZCwgcnB4LnkpXG4gICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGxlbmd0aCBvZiBhIGJlZ2lubmluZyAob3IgZW5kaW5nKSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBjdXJ2ZV9kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZm9udF9zaXplX2hhbGYgLyAyXG4gIH1cblxuICAvKipcbiAgICogRHJhdyBsaW5lIGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0xpbmVQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICB0aGlzLmN0eC5tb3ZlVG8ocnB4LnhfYmVnLCBycHgueSlcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kLCBycHgueSlcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYXJyb3cgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3QXJyb3dQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLmN1cnZlX2QoKSAqIChycHgueF9iZWcgPCBycHgueF9lbmQgPyAtMSA6ICsxKVxuICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2VuZCArIGR4IC8gMiwgcnB4LnkgKyBkeCAvIDIpXG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCArIGR4LCBycHgueSlcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kICsgZHggLyAyLCBycHgueSAtIGR4IC8gMilcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3UmFuZ2VQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgaWYgKHJweC5zdHlsZSA9PSAnbGluZScpIHtcbiAgICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIH0gZWxzZSBpZiAocnB4LnN0eWxlID09ICdjdXJ2ZScpIHtcbiAgICAgIHRoaXMuZHJhd0N1cnZlUGFydChycHgpXG4gICAgfSBlbHNlIGlmIChycHguc3R5bGUgPT0gJ2Fycm93Jykge1xuICAgICAgdGhpcy5kcmF3QXJyb3dQeFBhcnQocnB4KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcmFuZ2UgdG8gZHJhdy5cbiAgICovXG4gIGRyYXdSYW5nZVB4KHJweDogUmFuZ2VQeCkge1xuICAgIGlmIChycHguc3R5bGUgPT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLmRyYXdMaW5lUHhQYXJ0KHJweClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW3JsLCByYywgcnJdID0gdGhpcy5zcGxpdFJhbmdlUHgocnB4KVxuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocmwpXG4gICAgICB0aGlzLmRyYXdSYW5nZVB4UGFydChyYylcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJyKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHN0cmluZ3MuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UgdG8gZHJhdyBzdHJpbmdzLlxuICAgKiBAcGFyYW0geSBUaGUgeS1jb29yaW5hdGUgdG8gZHJhdyByYW5nZSBgcmAuXG4gICAqL1xuICBkcmF3U3RyKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCByc3RyID0gci5zdHIgYXMgc3RyaW5nW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSByc3RyW2ldXG4gICAgICBjb25zdCBjeCA9IHRoaXMuc3RyX3ggKyAoci5iZWcgKyBpKSAqIHRoaXMuZm9udF9zaXplXG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChjLCBjeCwgeSArIHRoaXMuZm9udF9zaXplICogMC4zLCB0aGlzLmZvbnRfc2l6ZSlcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICB0aGlzLmN0eC5yZWN0KFxuICAgICAgICBjeCAtIHRoaXMuZm9udF9zaXplX2hhbGYsXG4gICAgICAgIHkgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmLFxuICAgICAgICB0aGlzLmZvbnRfc2l6ZSxcbiAgICAgICAgdGhpcy5mb250X3NpemUsXG4gICAgICApXG4gICAgICB0aGlzLmN0eC5zdHJva2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlIHRvIGRyYXcuXG4gICAqIEBwYXJhbSB5IEEgeS1jb29yZGluYXRlIHRvIGRyYXcgYHJgLlxuICAgKi9cbiAgZHJhd1JhbmdlKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHIuY29sb3JcbiAgICBsZXQgcnB4ID0ge1xuICAgICAgeF9iZWc6IHRoaXMucmFuZ2VCZWcoci5iZWcpLFxuICAgICAgeF9lbmQ6IHRoaXMucmFuZ2VFbmQoci5lbmQpLFxuICAgICAgeTogeSxcbiAgICAgIHN0eWxlOiByLnN0eWxlLFxuICAgICAgY29sb3I6IHIuY29sb3IsXG4gICAgICBzdHI6IHIuc3RyLFxuICAgIH1cbiAgICBpZiAoci5zdHlsZSA9PSAnc3RyJykge1xuICAgICAgdGhpcy5kcmF3U3RyKHIsIHkpXG4gICAgfSBlbHNlIGlmIChyLnN0ZXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB4X2JlZyA9IHRoaXMucmFuZ2VCZWcoci5iZWcpXG4gICAgICBmb3IgKGxldCBjdXIgPSByLmJlZyArIHIuc3RlcCAtIDE7IGN1ciA8IHIuZW5kOyBjdXIgKz0gci5zdGVwKSB7XG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIGN1ciArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICAgIHJweC54X2JlZyA9IHJweC54X2VuZFxuICAgICAgfVxuICAgICAgaWYgKChyLmVuZCAtIHIuYmVnICsgMSkgJSByLnN0ZXAgPT09IDApIHtcbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5yYW5nZUVuZChyLmVuZClcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGVyZSBpcyBhbiB1bmNvbXBsZXRlIHJhbmdlLlxuICAgICAgICBycHgueF9lbmQgPSB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiByLmVuZCArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICAgICAgcnB4LnN0eWxlID0gci5zdHlsZS5zcGxpdCgnLCcpWzBdICsgJyxsaW5lJ1xuICAgICAgICB0aGlzLmRyYXdSYW5nZVB4KHJweClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZXMuXG4gICAqIEBwYXJhbSByYW5nZV9yb3dzIFJhbmdlcyB0byBkcmF3LlxuICAgKi9cbiAgZHJhd1JhbmdlcyhyYW5nZV9yb3dzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgeXB4ID0gdGhpcy5zdHJfeVxuICAgIGZvciAoY29uc3QgcmFuZ2VzIG9mIHJhbmdlX3Jvd3MpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KC4uLnJhbmdlcy5tYXAociA9PiB0aGlzLnJhbmdlSGVpZ2h0KHIpKSlcbiAgICAgIGZvciAoY29uc3QgcmFuZ2Ugb2YgcmFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlKHJhbmdlLCB5cHggKyBoZWlnaHQgLyAyKVxuICAgICAgfVxuICAgICAgeXB4ICs9IGhlaWdodFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFuIGlucHV0IHN0cmluZy5cbiAgICovXG4gIGRyYXdJbnB1dFN0cihpbnB1dF9zdHI6IHN0cmluZykge1xuICAgIGxldCBpbmRleCA9IFsnaSddXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dF9zdHIubGVuZ3RoOyBpKyspIGluZGV4LnB1c2goJycgKyBpKVxuICAgIGxldCByID0ge1xuICAgICAgc3R5bGU6ICdzdHInLFxuICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIGJlZzogLTEsXG4gICAgICBlbmQ6IGlucHV0X3N0ci5sZW5ndGggLSAxLFxuICAgICAgc3RyOiBpbmRleCxcbiAgICB9XG4gICAgdGhpcy5kcmF3UmFuZ2UociwgdGhpcy5zdHJfeSAtIHRoaXMuZm9udF9zaXplIC0gdGhpcy5mb250X3NpemVfaGFsZilcbiAgICBjb25zdCBjaGFycyA9IFsnU3RyJ11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0X3N0ci5sZW5ndGg7IGkrKylcbiAgICAgIGNoYXJzLnB1c2goaW5wdXRfc3RyLnN1YnN0cmluZyhpLCBpICsgMSkpXG4gICAgci5zdHIgPSBjaGFyc1xuICAgIHRoaXMuZHJhd1JhbmdlKHIsIHRoaXMuc3RyX3kgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYSBnaXZlbiBzdHJpbmcgYW5kIHJhbmdlcy5cbiAgICogQHBhcmFtIGlucHV0X3N0ciBJbnB1dCBzdHJpbmcgdG8gZHJhdy5cbiAgICogQHBhcmFtIHJzcyBUaGUgcmFuZ2VzIHRvIGRyYXcgd2hpY2ggYXJlIHJlbGF0ZWQgdG8gYSBnaXZlbiBzdHJpbmcgYGlucHV0X3N0cmBcbiAgICovXG4gIGRyYXcoaW5wdXRfc3RyOiBzdHJpbmcsIHJzczogUmFuZ2VbXVtdKSB7XG4gICAgbGV0IHJhbmdlX2JvdW5kID0gWy0xLCBpbnB1dF9zdHIubGVuZ3RoIC0gMV1cbiAgICByc3MuZm9yRWFjaChycyA9PlxuICAgICAgcnMuZm9yRWFjaChcbiAgICAgICAgciA9PlxuICAgICAgICAgIChyYW5nZV9ib3VuZCA9IFtcbiAgICAgICAgICAgIE1hdGgubWluKHJhbmdlX2JvdW5kWzBdLCByLmJlZyksXG4gICAgICAgICAgICBNYXRoLm1heChyYW5nZV9ib3VuZFsxXSwgci5lbmQpLFxuICAgICAgICAgIF0pLFxuICAgICAgKSxcbiAgICApXG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplICsgTWF0aC5hYnMocmFuZ2VfYm91bmRbMF0pICogdGhpcy5mb250X3NpemVcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IChyYW5nZV9ib3VuZFsxXSAtIHJhbmdlX2JvdW5kWzBdICsgMikgKiB0aGlzLmZvbnRfc2l6ZVxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9XG4gICAgICB0aGlzLnN0cl95ICtcbiAgICAgIHRoaXMuZm9udF9zaXplX2hhbGYgK1xuICAgICAgcnNzLnJlZHVjZShcbiAgICAgICAgKGFjbSwgcnMpID0+IGFjbSArIE1hdGgubWF4KC4uLnJzLm1hcChyID0+IHRoaXMucmFuZ2VIZWlnaHQocikpKSxcbiAgICAgICAgMCxcbiAgICAgIClcblxuICAgIC8vIERQSSBzZXR0aW5nc1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDFcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAvLyBjb25zb2xlLmxvZygnZHByJywgZHByLCAnIHJlY3QnLCByZWN0KVxuICAgIHRoaXMuY2FudmFzLndpZHRoICo9IGRwclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCAqPSBkcHJcbiAgICB0aGlzLmN0eC5zY2FsZShkcHIsIGRwcilcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gZHByICsgJ3B4J1xuXG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gZHByICsgJ3B4J1xuICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gM1xuICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLmZvbnRfc2l6ZSArICdweCAnICsgdGhpcy5mb250X3R5cGVcbiAgICB0aGlzLmRyYXdJbnB1dFN0cihpbnB1dF9zdHIpXG4gICAgdGhpcy5kcmF3UmFuZ2VzKHJzcylcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGdyb3VwIHRoYXQgZWFjaCBjb250YWlucyBhIHNpbmdsZSByYW5nZS5cbiAgICogQHBhcmFtIHJhbmdlcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICovXG4gIG1ha2VTaW5nbGVHcm91cHMocmFuZ2VzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChyYW5nZSA9PiBbcmFuZ2VdKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ3JvdXBlZCByYW5nZXMgdGhhdCBlYWNoIGNvbnRhaW5zIG5vbiBvdmVybGFwcGluZyByYW5nZXMuXG4gICAqIEBwYXJhbSBUcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHJhbmdlZiBUaGUgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSB0dXBsZSBiZWdpbm5pbmcgaW5kZXggYW5kIGVuZGluZyBpbmRleCBvZiBhIGdpdmVuIHJhbmdlIGBUc1tpXWAuXG4gICAqL1xuICBub25PdmVybGFwT2JqczxUPihUczogVFtdLCByYW5nZWY6IChhcmcwOiBUKSA9PiBudW1iZXJbXSk6IFRbXVtdIHtcbiAgICBpZiAoVHMubGVuZ3RoIDw9IDApIHJldHVybiBbXVxuICAgIGNvbnN0IGVuZHMgPSBUcy5tYXAodCA9PiByYW5nZWYodClbMV0pXG4gICAgY29uc3QgbiA9IE1hdGgubWF4KC4uLmVuZHMpICsgMVxuICAgIGxldCB1c2VkID0gbmV3IEFycmF5PGJvb2xlYW4+KG4pXG4gICAgdXNlZC5maWxsKGZhbHNlKVxuICAgIGxldCByZXMgPSBbXVxuICAgIGxldCByb3dzOiBUW10gPSBbXVxuICAgIGZvciAoY29uc3QgdCBvZiBUcykge1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBvciBub3QgYSByYW5nZSBjYW4gYmUgaW5zZXJ0ZWQgdG8gdGhlIGN1cnJlbnQgcm93LlxuICAgICAgbGV0IHVzZWRfYW55ID0gZmFsc2VcbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZF9hbnkgPSB1c2VkX2FueSB8fCB1c2VkW2ldXG4gICAgICB9XG4gICAgICBpZiAodXNlZF9hbnkpIHtcbiAgICAgICAgcmVzLnB1c2gocm93cylcbiAgICAgICAgcm93cyA9IFt0XVxuICAgICAgICB1c2VkLmZpbGwoZmFsc2UpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3dzLnB1c2godClcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZFtpXSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3MubGVuZ3RoID4gMCkgcmVzLnB1c2gocm93cylcblxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBub25PdmVybGFwUmFuZ2VzKHJzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5ub25PdmVybGFwT2JqczxSYW5nZT4ocnMsIHIgPT4gW3IuYmVnLCByLmVuZF0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbm9uT3ZlcmxhcFJhbmdlc1NpbXBsZShyczogUmFuZ2VTaW1wbGVbXSk6IFJhbmdlU2ltcGxlW11bXSB7XG4gICAgcmV0dXJuIHRoaXMubm9uT3ZlcmxhcE9ianM8UmFuZ2VTaW1wbGU+KHJzLCB4ID0+IFt4WzBdLCB4WzFdXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdW10ge1xuICAgIGxldCByZXMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gJyMnICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pXG4gICAgICByZXMucHVzaCh0aGlzLm1ha2VSYW5nZXMocnNbaV0sIHN0eWxlLCBjb2xvcikpXG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCBzdHlsZSBgc3R5bGVgIGFuZCBgY29sb3JgLlxuICAgKiBAcGFyYW0gcmFuZ2VzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZVJhbmdlcyhyYW5nZXM6IFJhbmdlU2ltcGxlW10sIHN0eWxlOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpOiBSYW5nZVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChyYW5nZSA9PiB7XG4gICAgICBjb25zdCBpc19zdHIgPVxuICAgICAgICB0eXBlb2YgcmFuZ2VbMl0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiByYW5nZVsyXSAhPT0gJ251bWJlcidcbiAgICAgIGNvbnN0IHN0ZXAgPSB0eXBlb2YgcmFuZ2VbMl0gPT09ICdudW1iZXInID8gcmFuZ2VbMl0gOiB1bmRlZmluZWRcbiAgICAgIGNvbnN0IHN0ciA9IHR5cGVvZiByYW5nZVsyXSAhPT0gJ251bWJlcicgPyByYW5nZVsyXSA6IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3R5bGU6IGlzX3N0ciA/ICdzdHInIDogc3R5bGUsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBiZWc6IHJhbmdlWzBdLFxuICAgICAgICBlbmQ6IHJhbmdlWzFdLFxuICAgICAgICBzdGVwLFxuICAgICAgICBzdHIsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZVJhbmdlc0F1dG9Db2xvcihyczogUmFuZ2VTaW1wbGVbXSwgc3R5bGU6IHN0cmluZyk6IFJhbmdlW10ge1xuICAgIHJldHVybiBycy5tYXAoKHJhbmdlLCBpKSA9PiAoe1xuICAgICAgc3R5bGUsXG4gICAgICBjb2xvcjogJyMnICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pLFxuICAgICAgYmVnOiByYW5nZVswXSxcbiAgICAgIGVuZDogcmFuZ2VbMV0sXG4gICAgfSkpXG4gIH1cbn1cbiIsImltcG9ydCB7IFZpc1N0ciwgUmFuZ2VTaW1wbGUsIFJhbmdlIH0gZnJvbSAnLi92aXNfc3RyJ1xuXG5jb25zdCBzdWJzdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aFxuICBsZXQgcmVzID0gbmV3IFNldDxzdHJpbmc+KClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPD0gbjsgaisrKSByZXMuYWRkKHN0ci5zdWJzdHJpbmcoaSwgaikpXG4gIH1cbiAgcmV0dXJuIFsuLi5yZXMua2V5cygpXVxufVxuXG5jb25zdCBmaW5kQWxsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBtID0gcGF0Lmxlbmd0aFxuICBsZXQgcmVzOiBSYW5nZVNpbXBsZVtdID0gW11cbiAgbGV0IHBvcyA9IHN0ci5pbmRleE9mKHBhdClcbiAgd2hpbGUgKHBvcyAhPT0gLTEpIHtcbiAgICByZXMucHVzaChbcG9zLCBwb3MgKyBtIC0gMV0pXG4gICAgcG9zID0gc3RyLmluZGV4T2YocGF0LCBwb3MgKyAxKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuY29uc3QgaXNQYWxpbmRyb21lID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aCAvIDI7IGkrKykge1xuICAgIGlmIChzdHJbaV0gIT0gc3RyW3N0ci5sZW5ndGggLSBpIC0gMV0pIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGVudW1QYWxpbmRyb21lcyA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aFxuICBsZXQgcmVzOiBSYW5nZVNpbXBsZVtdID0gW11cbiAgZm9yIChsZXQgbGVuID0gMTsgbGVuIDwgbjsgbGVuKyspIHtcbiAgICBmb3IgKGxldCBiZWcgPSAwOyBiZWcgKyBsZW4gPD0gbjsgYmVnKyspIHtcbiAgICAgIGlmIChpc1BhbGluZHJvbWUoc3RyLnN1YnN0cmluZyhiZWcsIGJlZyArIGxlbikpKVxuICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyBsZW4gLSAxXSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5jb25zdCBsY3AgPSAoc3RyOiBzdHJpbmcsIGk6IG51bWJlciwgajogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgbGV0IG4gPSBzdHIubGVuZ3RoXG4gIGxldCBtYXRjaF9sZW4gPSAwXG4gIHdoaWxlIChpICsgbWF0Y2hfbGVuIDwgbiAmJiBqICsgbWF0Y2hfbGVuIDwgbikge1xuICAgIGlmIChzdHJbaSArIG1hdGNoX2xlbl0gPT0gc3RyW2ogKyBtYXRjaF9sZW5dKSBtYXRjaF9sZW4rK1xuICAgIGVsc2UgYnJlYWtcbiAgfVxuICByZXR1cm4gbWF0Y2hfbGVuXG59XG5cbmNvbnN0IHByZXZPY2NMUEYgPSAoc3RyOiBzdHJpbmcpOiBbbnVtYmVyW10sIG51bWJlcltdXSA9PiB7XG4gIGxldCBwcmV2T2NjID0gW11cbiAgbGV0IGxwZiA9IFtdXG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgbGV0IHBvY2N4ID0gLTFcbiAgICBsZXQgbHBmeCA9IDBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGk7IGorKykge1xuICAgICAgY29uc3QgbCA9IGxjcChzdHIsIGksIGopXG4gICAgICBpZiAobHBmeCA8IGwpIHtcbiAgICAgICAgbHBmeCA9IGxcbiAgICAgICAgcG9jY3ggPSBqXG4gICAgICB9XG4gICAgfVxuICAgIHByZXZPY2MucHVzaChwb2NjeClcbiAgICBscGYucHVzaChscGZ4KVxuICB9XG4gIHJldHVybiBbcHJldk9jYywgbHBmXVxufVxuXG5jb25zdCBlbnVtUHJldk9jY0xQRiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGNvbnN0IFtwcmV2T2NjLCBscGZdID0gcHJldk9jY0xQRihzdHIpXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtcbiAgICBbWy0xLCBuIC0gMSwgWydvY2MnXS5jb25jYXQocHJldk9jYy5tYXAoeCA9PiB4LnRvU3RyaW5nKCkpKV1dLFxuICAgIFtbLTEsIG4gLSAxLCBbJ2xlbiddLmNvbmNhdChscGYubWFwKHggPT4geC50b1N0cmluZygpKSldXSxcbiAgXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZPY2MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobHBmW2ldID4gMCkge1xuICAgICAgcmVzLnB1c2goW1tpLCBpICsgbHBmW2ldIC0gMV0sIFtwcmV2T2NjW2ldLCBwcmV2T2NjW2ldICsgbHBmW2ldIC0gMV1dKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGlzU3F1YXJlID0gKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHA7IGkrKykge1xuICAgIGlmIChzW2JlZyArIGldICE9IHNbYmVnICsgcCArIGldKSByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBlbnVtU3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IDIgKiBwOyBvZmZzZXQrKykge1xuICAgICAgZm9yIChsZXQgYmVnID0gb2Zmc2V0OyBiZWcgPCBuIC0gMiAqIHAgKyAxOyBiZWcgKz0gMiAqIHApIHtcbiAgICAgICAgaWYgKGlzU3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyAyICogcCAtIDEsIHBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuY29uc3QgaXNSaWdodG1vc3RTcXVhcmUgPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKSA6IGJvb2xlYW4gPT4ge1xuICBpZighaXNTcXVhcmUocywgYmVnLCBwKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKCFzLmluY2x1ZGVzKHMuc3Vic3RyKGJlZywyKnApLCBiZWcrMSkpO1xufVxuXG5jb25zdCBpc0xlZnRtb3N0U3F1YXJlID0gKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcikgOiBib29sZWFuID0+IHtcbiAgaWYoIWlzU3F1YXJlKHMsIGJlZywgcCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICghcy5zdWJzdHIoMCxiZWcrMipwLTEpLmluY2x1ZGVzKHMuc3Vic3RyKGJlZywyKnApKSk7XG59XG5cbmNvbnN0IGVudW1SaWdodG1vc3RTcXVhcmVzID0gKHM6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBuID0gcy5sZW5ndGhcbiAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdXG4gIGZvcihsZXQgcCA9IDE7IHAgPCBuOyBwKyspe1xuICAgIGZvcihsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgMipwOyBvZmZzZXQrKyl7XG4gICAgICBmb3IobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIqcCsxOyBiZWcgKz0gMipwKXtcbiAgICAgICAgaWYoaXNSaWdodG1vc3RTcXVhcmUocyxiZWcscCkpe1xuICAgICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZysyKnAtMSwgcF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgZW51bUxlZnRtb3N0U3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBmb3IobGV0IHAgPSAxOyBwIDwgbjsgcCsrKXtcbiAgICBmb3IobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IDIqcDsgb2Zmc2V0Kyspe1xuICAgICAgZm9yKGxldCBiZWcgPSBvZmZzZXQ7IGJlZyA8IG4gLSAyKnArMTsgYmVnICs9IDIqcCl7XG4gICAgICAgIGlmKGlzTGVmdG1vc3RTcXVhcmUocyxiZWcscCkpe1xuICAgICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZysyKnAtMSwgcF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgaXNSdW4gPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIGlmIChiZWcgPiAwICYmIHNbYmVnIC0gMV0gPT0gc1tiZWcgKyBwIC0gMV0pIHJldHVybiBmYWxzZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHA7IGkrKykge1xuICAgIGlmIChzW2JlZyArIGldICE9IHNbYmVnICsgcCArIGldKSByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBlbnVtUnVucyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBsZXQgcm1hcCA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIGZvciAobGV0IHAgPSAxOyBwIDwgbjsgcCsrKSB7XG4gICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgMiAqIHAgPD0gbjsgYmVnKyspIHtcbiAgICAgIGlmIChpc1J1bihzLCBiZWcsIHApKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IDIgKiBwXG4gICAgICAgIHdoaWxlIChtYXRjaCA8IG4gJiYgc1tiZWcgKyAobWF0Y2ggJSBwKV0gPT0gc1tiZWcgKyBtYXRjaF0pIHtcbiAgICAgICAgICBtYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5ID0gYmVnICsgJywnICsgKGJlZyArIG1hdGNoIC0gMSlcbiAgICAgICAgaWYgKCFybWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgbWF0Y2ggLSAxLCBwXSlcbiAgICAgICAgICBybWFwLmFkZChrZXkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5jb25zdCBsZWZ0RXh0ZW5zaW9ucyA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGxldCByZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBsZXQgZnJvbUlkeCA9IDFcbiAgbGV0IHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgZnJvbUlkeClcbiAgd2hpbGUgKHBvcyAhPT0gLTEpIHtcbiAgICByZXMuYWRkKHN0cltwb3MgLSAxXSlcbiAgICBwb3MgPSBzdHIuaW5kZXhPZihwYXQsIHBvcyArIDEpXG4gIH1cbiAgcmV0dXJuIFsuLi5yZXMua2V5cygpXVxufVxuXG5jb25zdCByZXZlcnNlID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHN0clxuICAgIC5zcGxpdCgnJylcbiAgICAucmV2ZXJzZSgpXG4gICAgLmpvaW4oJycpXG59XG5cbmNvbnN0IHJpZ2h0RXh0ZW5zaW9ucyA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IHJzdHIgPSByZXZlcnNlKHN0cilcbiAgY29uc3QgcnBhdCA9IHJldmVyc2UocGF0KVxuICByZXR1cm4gbGVmdEV4dGVuc2lvbnMocnN0ciwgcnBhdClcbn1cblxuY29uc3QgaXNMZWZ0TWF4aW1hbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGxlZnRFeHRlbnNpb25zKHN0ciwgcGF0KS5sZW5ndGggPiAxXG59XG5cbmNvbnN0IGlzUmlnaHRNYXhpbWFsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gcmlnaHRFeHRlbnNpb25zKHN0ciwgcGF0KS5sZW5ndGggPiAxXG59XG5cbmNvbnN0IGlzTWF4UmVwZWF0ID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNMZWZ0TWF4aW1hbChzdHIsIHBhdCkgJiYgaXNSaWdodE1heGltYWwoc3RyLCBwYXQpXG59XG5cbmNvbnN0IGx6NzcgPSAoc3RyOiBzdHJpbmcsIHNob3dfZmFjdG9yaWQ6IG51bWJlciA9IDEpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aFxuICBjb25zdCBbb2NjcywgbGVuc10gPSBwcmV2T2NjTFBGKHN0cilcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKSB7XG4gICAgbGV0IHJhbmdlczogUmFuZ2VTaW1wbGVbXSA9IFtdXG4gICAgaWYgKG9jY3NbaV0gPT09IC0xKSB7XG4gICAgICByYW5nZXMgPSBbW2ksIGksIFtzdHJbaV1dXV1cbiAgICAgIGkgKz0gMVxuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZXMgPSBbW29jY3NbaV0sIG9jY3NbaV0gKyBsZW5zW2ldIC0gMV0sIFtpLCBpICsgbGVuc1tpXSAtIDFdXVxuICAgICAgaSArPSBsZW5zW2ldXG4gICAgfVxuICAgIGlmIChzaG93X2ZhY3RvcmlkID49IDApIHtcbiAgICAgIGNvbnN0IGxhc3RfZW5kID0gcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXVsxXVxuICAgICAgcmFuZ2VzLnB1c2goW2xhc3RfZW5kICsgMSwgbGFzdF9lbmQgKyAxLCBbJ2YnICsgc2hvd19mYWN0b3JpZF1dKVxuICAgICAgc2hvd19mYWN0b3JpZCsrXG4gICAgfVxuICAgIHJlcy5wdXNoKHJhbmdlcylcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGx6NzggPSAoc3RyOiBzdHJpbmcsIHNob3dfZmFjdG9yaWQgPSAxKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgbGV0IGQgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKSB7XG4gICAgbGV0IGogPSBpICsgMVxuICAgIHdoaWxlIChqIDw9IHN0ci5sZW5ndGggJiYgZC5oYXMoc3RyLnN1YnN0cmluZyhpLCBqKSkpIHtcbiAgICAgIGorK1xuICAgIH1cbiAgICBsZXQgcm93OiBSYW5nZVNpbXBsZVtdID0gW11cbiAgICBpZiAoaiAtIGkgPiAxKSB7XG4gICAgICBjb25zdCBwcmV2ID0gZC5nZXQoc3RyLnN1YnN0cmluZyhpLCBqIC0gMSkpIGFzIG51bWJlclxuICAgICAgcm93LnB1c2goW3ByZXYsIHByZXYgKyAoaiAtIGkgLSAyKV0pXG4gICAgICByb3cucHVzaChbaSwgaiAtIDJdKVxuICAgIH1cbiAgICBpZiAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiwgW3N0cltqIC0gMV0sICdmJyArIHNob3dfZmFjdG9yaWRdXSlcbiAgICB9IGVsc2Uge1xuICAgICAgcm93LnB1c2goW2ogLSAxLCBqIC0gMSwgWydmJyArIHNob3dfZmFjdG9yaWRdXSlcbiAgICB9XG4gICAgc2hvd19mYWN0b3JpZCsrXG4gICAgcmVzLnB1c2gocm93KVxuICAgIGQuc2V0KHN0ci5zdWJzdHJpbmcoaSwgaiksIGkpXG4gICAgaSA9IGpcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGlzTHluZG9uID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGxlc3N0aGFuID0gZmFsc2VcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ci5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgajIgPSAoaSArIGopICUgc3RyLmxlbmd0aFxuICAgICAgaWYgKHN0cltqXSA+IHN0cltqMl0pIHJldHVybiBmYWxzZVxuICAgICAgZWxzZSBpZiAoc3RyW2pdIDwgc3RyW2oyXSkge1xuICAgICAgICBsZXNzdGhhbiA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFsZXNzdGhhbikgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gY29uc3QgZW51bUx5bmRvbiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4vLyAgIGNvbnN0IGNoZWNrID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZykgPT4gaXNMeW5kb24ocGF0KVxuLy8gICByZXR1cm4gZW51bUlmR3JvdXAoc3RyLCBjaGVjaylcbi8vIH1cbmNvbnN0IGVudW1MeW5kb24gPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdXG4gIGZvciAobGV0IGxlbiA9IDE7IGxlbiA8PSBzdHIubGVuZ3RoOyBsZW4rKykge1xuICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSArIGxlbiA8PSBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1YiA9IHN0ci5zdWJzdHIoaSwgbGVuKVxuICAgICAgaWYgKGlzTHluZG9uKHN1YikpIGdyb3VwLnB1c2goW2ksIGkgKyBsZW4gLSAxXSlcbiAgICB9XG4gICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLy8gRHV2YWwncyBhbGdvcml0aG1cbi8vIGZpbmQgbG9uZ2VzdCBseW5kb24gZmFjdG9yIHdoaWNoIHN0YXJ0cyBhdCBiZWcgaW4gc3RyLlxuLy8gcmV0dXJuIFtsZW4sIHJlcGVhdF0sIHdoZXJlXG4vLyBsZW4gaXMgdGhlIGxlbmd0aCBvZiB0aGUgZmFjdG9yLFxuLy8gcmVwZWF0IGlzIHRoZSBtYXhpbXVtIHJlcGVhdCBvZiB0aGUgZmFjdG9yLlxuY29uc3QgZmluZExvbmdlc3RMeW5kb25GYWN0b3IgPSAoXG4gIHN0cjogc3RyaW5nLFxuICBiZWc6IG51bWJlcixcbik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBsZXQgaSA9IGJlZ1xuICBsZXQgZW5kID0gYmVnICsgMVxuICB3aGlsZSAoZW5kIDwgc3RyLmxlbmd0aCAmJiBzdHJbaV0gPD0gc3RyW2VuZF0pIHtcbiAgICBpZiAoc3RyW2ldID09PSBzdHJbZW5kXSkge1xuICAgICAgaSsrXG4gICAgICBlbmQrK1xuICAgIH0gZWxzZSBpZiAoc3RyW2ldIDwgc3RyW2VuZF0pIHtcbiAgICAgIC8vIHN0cltiZWcuLi5lbmRdIGlzIEx5bmRvbiBzdHJpbmdcbiAgICAgIGkgPSBiZWdcbiAgICAgIGVuZCsrXG4gICAgfVxuICB9XG4gIC8vIHN0cltiZWcuLi5lbmQtMV0gaXMgdGhlIGxvbmdlc3QgTHluZG9uIHByZWZpeCBvZiBzdHJbYmVnLi4uXS5cbiAgY29uc3QgbGVuID0gZW5kIC0gaVxuICBjb25zdCByZXBlYXQgPSBNYXRoLmZsb29yKChlbmQgLSBiZWcpIC8gKGVuZCAtIGkpKVxuICByZXR1cm4gW2xlbiwgcmVwZWF0XVxufVxuXG5jb25zdCBseW5kb25GYWN0b3JpemF0aW9uID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW11cbiAgbGV0IGJlZyA9IDBcblxuICB3aGlsZSAoYmVnIDwgc3RyLmxlbmd0aCkge1xuICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgYmVnKVxuICAgIGNvbnN0IGxlbl9mYWN0b3IgPSBmYWN0b3JbMF0gKiBmYWN0b3JbMV1cbiAgICByZXMucHVzaChbW2JlZywgYmVnICsgbGVuX2ZhY3RvciAtIDEsIGZhY3RvclswXV1dIGFzIFJhbmdlU2ltcGxlW10pXG4gICAgYmVnICs9IGxlbl9mYWN0b3JcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGx5bmRvbkFycmF5ID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgaSlcbiAgICByZXMucHVzaChbW2ksIGkgKyBmYWN0b3JbMF0gLSAxXV0gYXMgUmFuZ2VTaW1wbGVbXSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8vIHJlcGxhY2UgdGhlIGNoYXJhY3RlcnMgdG8gZWZmZWN0aXZlIGFscGhhYmV0IFswLCBzaWdtYS0xXVxuLy8gc2lnbWEgaXMgdGhlIG51bWJlciBvZiBkaXN0aW5jdCBjaGFyYWN0ZXJzIG9mIGdpdmVuIHN0cmluZ1xuLy8gc2lnbWEgbXVzdCBiZSBsZXNzIHRoYW4gMTBcbmNvbnN0IHJlcGxhY2VFZmZlY3RpdmVBbHBoYWJldCA9IChzdHI6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgY2hhcnMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykgY2hhcnMuYWRkKHN0cltpXSlcbiAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShjaGFycy52YWx1ZXMoKSlcbiAgYXJyLnNvcnQoKVxuICBjb25zdCByZXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpXG4gIGFyci5tYXAoKGMsIGkpID0+IHJlcC5zZXQoYywgaS50b1N0cmluZygpKSlcbiAgY29uc3QgcmVwczogc3RyaW5nW10gPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSByZXBzLnB1c2gocmVwLmdldChzdHJbaV0pIGFzIHN0cmluZylcbiAgcmV0dXJuIHJlcHNcbiAgLy8gcmV0dXJuIHJlcHMuam9pbignJylcbn1cblxuY29uc3Qgc3VmZml4QXJyYXkgPSAoc3RyOiBzdHJpbmcpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IHN1ZmZpeGVzID0gWy4uLkFycmF5KHN0ci5sZW5ndGgpLmtleXMoKV0ubWFwKGkgPT4gc3RyLnN1YnN0cihpKSlcbiAgc3VmZml4ZXMuc29ydCgpXG4gIHJldHVybiBzdWZmaXhlcy5tYXAocyA9PiBzdHIubGVuZ3RoIC0gcy5sZW5ndGgpXG59XG5jb25zdCByYW5rQXJyYXkgPSAoc3RyOiBzdHJpbmcsIHNhPzogbnVtYmVyW10pID0+IHtcbiAgaWYgKHNhID09PSB1bmRlZmluZWQpIHNhID0gc3VmZml4QXJyYXkoc3RyKVxuICBjb25zdCByYW5rID0gQXJyYXkoc3RyLmxlbmd0aClcbiAgc2EuZm9yRWFjaCgocG9zLCByKSA9PiAocmFua1twb3NdID0gcikpXG4gIHJldHVybiByYW5rXG59XG5cbmNvbnN0IGVudW1JZiA9IChcbiAgc3RyOiBzdHJpbmcsXG4gIGNoZWNrOiAoczogc3RyaW5nLCBwOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4pOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgcmV0dXJuIGZsYXQoZW51bUlmR3JvdXAoc3RyLCBjaGVjaykpXG59XG5cbmNvbnN0IGVudW1JZkdyb3VwID0gKFxuICBzdHI6IHN0cmluZyxcbiAgY2hlY2s6IChzOiBzdHJpbmcsIHA6IHN0cmluZykgPT4gYm9vbGVhbixcbik6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIHJldHVybiBzdWJzdHJpbmdzKHN0cilcbiAgICAuZmlsdGVyKHAgPT4gY2hlY2soc3RyLCBwKSlcbiAgICAubWFwKHAgPT4gZmluZEFsbChzdHIsIHApKVxufVxuXG5jb25zdCByYWRpb1ZhbHVlID0gKHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgcmVzID0gJydcbiAgY29uc3QgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc2VsZWN0b3IpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlbG1zW2ldLmNoZWNrZWQpIHJlcyA9IGVsbXNbaV0udmFsdWVcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGZsYXQgPSA8VD4oYXJyOiBUW11bXSk6IFRbXSA9PiB7XG4gIHJldHVybiBhcnIucmVkdWNlKChhY20sIHgpID0+IGFjbS5jb25jYXQoeCksIFtdIGFzIFRbXSlcbn1cblxuY29uc3QgZHJhdyA9IChlOiBFdmVudCkgPT4ge1xuICAvLyBnZXQgZm9udCBzaXplXG4gIGxldCBmb250X3NpemUgPSBwYXJzZUludChyYWRpb1ZhbHVlKCdbbmFtZT1mb250X3NpemVdJykpXG4gIC8vIGdldCBsaW5lIHN0eWxlXG4gIGxldCByYW5nZV9zdHlsZSA9IHJhZGlvVmFsdWUoJ1tuYW1lPWxpbmVfc3R5bGVdJylcbiAgY29uc3QgbGluZV9zdHlsZV9yaWdodCA9IHJhZGlvVmFsdWUoJ1tuYW1lPWxpbmVfc3R5bGVfcmlnaHRdJylcblxuICByYW5nZV9zdHlsZSArPSBsaW5lX3N0eWxlX3JpZ2h0Lmxlbmd0aCA9PT0gMCA/ICcnIDogJywnICsgbGluZV9zdHlsZV9yaWdodFxuICBsZXQgdmlzdWFsaXplID0gcmFkaW9WYWx1ZSgnW25hbWU9dmlzdWFsaXplXScpXG4gIGNvbnNvbGUubG9nKFxuICAgIGBmb250X3NpemU9JHtmb250X3NpemV9LCBsaW5lX3N0eWxlPSR7cmFuZ2Vfc3R5bGV9LCB2aXN1YWxpemU9JHt2aXN1YWxpemV9YCxcbiAgKVxuXG4gIC8vIGdldCBpbnB1dCBzdHJpbmdcbiAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0X3N0cicpIGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgbGV0IGlucHV0X3N0ciA9IGVsbS52YWx1ZVxuXG4gIC8vIGdldCBjYW52YXNcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50XG4gIC8vIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gNTBcbiAgY29uc3QgdmlzU3RyID0gbmV3IFZpc1N0cihjYW52YXMsIChmb250X3NpemUgPSBmb250X3NpemUpKVxuXG4gIC8vIGNvbXB1dGUgcmFuZ2VzXG4gIGxldCByYW5nZXNwOiBSYW5nZVNpbXBsZVtdID0gW11cbiAgbGV0IHJhbmdlc19ncm91cDogUmFuZ2VTaW1wbGVbXVtdID0gW11cbiAgbGV0IHJhbmdlczogUmFuZ2VbXVtdID0gW11cblxuICBjb25zdCBzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnZWZmZWN0aXZlX2FscGhhYmV0JyxcbiAgKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkXG4gIGNvbnN0IHNob3dfcmFua19hcnJheSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAncmFua19hcnJheScsXG4gICkgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZFxuXG4gIGlmIChzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCkge1xuICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgIFtcbiAgICAgICAgLTEsXG4gICAgICAgIGlucHV0X3N0ci5sZW5ndGggLSAxLFxuICAgICAgICBbJ2VTdHInLCAuLi5yZXBsYWNlRWZmZWN0aXZlQWxwaGFiZXQoaW5wdXRfc3RyKV0sXG4gICAgICBdLFxuICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSlcbiAgfVxuICBpZiAoc2hvd19yYW5rX2FycmF5KSB7XG4gICAgcmFuZ2VzX2dyb3VwLnB1c2goW1xuICAgICAgWy0xLCBpbnB1dF9zdHIubGVuZ3RoIC0gMSwgWydyYW5rJywgLi4ucmFua0FycmF5KGlucHV0X3N0cildXSxcbiAgICBdIGFzIFJhbmdlU2ltcGxlW10pXG4gIH1cblxuICBpZiAodmlzdWFsaXplID09PSAncnVucydcbiAgICAgIHx8IHZpc3VhbGl6ZSA9PT0gJ3BhbGluZHJvbWVzJ1xuICAgICAgfHwgdmlzdWFsaXplID09PSAnc3F1YXJlcydcbiAgICAgIHx8IHZpc3VhbGl6ZSA9PT0gJ3Jtb3N0c3F1YXJlcydcbiAgICAgIHx8IHZpc3VhbGl6ZSA9PT0gJ2xtb3N0c3F1YXJlcycpIHtcbiAgICBpZiAodmlzdWFsaXplID09PSAncnVucycpIHtcbiAgICAgIHJhbmdlc3AgPSBlbnVtUnVucyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW11cbiAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ3BhbGluZHJvbWVzJykge1xuICAgICAgcmFuZ2VzcCA9IGVudW1QYWxpbmRyb21lcyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW11cbiAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ3NxdWFyZXMnKSB7XG4gICAgICByYW5nZXNwID0gZW51bVNxdWFyZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdXG4gICAgfSBlbHNlIGlmKHZpc3VhbGl6ZSA9PT0gJ3Jtb3N0c3F1YXJlcycpe1xuICAgICAgcmFuZ2VzcCA9IGVudW1SaWdodG1vc3RTcXVhcmVzKGlucHV0X3N0cikgYXMgUmFuZ2VTaW1wbGVbXVxuICAgIH1lbHNlIGlmKHZpc3VhbGl6ZSA9PT0gJ2xtb3N0c3F1YXJlcycpe1xuICAgICAgcmFuZ2VzcCA9IGVudW1MZWZ0bW9zdFNxdWFyZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdyYW5nZXNwJywgcmFuZ2VzcClcbiAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHZpc1N0ci5ub25PdmVybGFwUmFuZ2VzU2ltcGxlKHJhbmdlc3ApKVxuICAgIGNvbnNvbGUubG9nKCdyYW5nZV9ncm91cCcsIHJhbmdlc19ncm91cClcbiAgICByYW5nZXMgPSB2aXNTdHIubWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJhbmdlc19ncm91cCwgcmFuZ2Vfc3R5bGUpXG4gICAgY29uc29sZS5sb2coJ3Jhbmdlc3AnLCByYW5nZXMpXG4gIH0gZWxzZSB7XG4gICAgaWYgKHZpc3VhbGl6ZSA9PT0gJ2xwZicpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGVudW1QcmV2T2NjTFBGKGlucHV0X3N0cikpXG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSAnbGVmdF9tYXhpbWFsJylcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBpc0xlZnRNYXhpbWFsKSlcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09ICdyaWdodF9tYXhpbWFsJylcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBpc1JpZ2h0TWF4aW1hbCkpXG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSAnbWF4X3JlcGVhdCcpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGVudW1JZkdyb3VwKGlucHV0X3N0ciwgaXNNYXhSZXBlYXQpKVxuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ2x6NzcnKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChsejc3KGlucHV0X3N0cikpXG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSAnbHo3OCcpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGx6NzgoaW5wdXRfc3RyKSlcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09ICdseW5kb25fZmFjdG9yaXphdGlvbicpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGx5bmRvbkZhY3Rvcml6YXRpb24oaW5wdXRfc3RyKSlcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09ICdseW5kb25fYXJyYXknKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChseW5kb25BcnJheShpbnB1dF9zdHIpKVxuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ2VudW1fbHluZG9uJylcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bUx5bmRvbihpbnB1dF9zdHIpKVxuICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSlcbiAgICByYW5nZXMgPSBmbGF0KHJhbmdlcy5tYXAoeCA9PiB2aXNTdHIubm9uT3ZlcmxhcFJhbmdlcyh4KSkpXG4gIH1cblxuICB2aXNTdHIuZHJhdyhpbnB1dF9zdHIsIHJhbmdlcylcbn1cblxuY29uc3Qgc2VsZWN0b3JBZGRFdmVudCA9IChzZWxlY3Rvcjogc3RyaW5nLCBldmVudDogc3RyaW5nLCBmdW5jOiBhbnkpID0+IHtcbiAgY29uc3QgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc2VsZWN0b3IpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuICAgIGVsbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYylcbiAgfVxufVxuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjb25zdCBpbnB1dF9zdHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRfc3RyJykgYXMgSFRNTEVsZW1lbnRcbiAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZHJhdylcbiAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb3BlcnR5Y2hhbmdlJywgZHJhdylcblxuICAvLyBhZGQgZXZlbnQgZm9yIHJhZGlvIGJ1dHRvbnNcbiAgc2VsZWN0b3JBZGRFdmVudCgnW25hbWU9Zm9udF9zaXplXScsICdjbGljaycsIGRyYXcpXG4gIHNlbGVjdG9yQWRkRXZlbnQoJ1tuYW1lPWxpbmVfc3R5bGVdJywgJ2NsaWNrJywgZHJhdylcbiAgc2VsZWN0b3JBZGRFdmVudCgnW25hbWU9bGluZV9zdHlsZV9yaWdodF0nLCAnY2xpY2snLCBkcmF3KVxuICBzZWxlY3RvckFkZEV2ZW50KCdbbmFtZT12aXN1YWxpemVdJywgJ2NsaWNrJywgZHJhdylcbiAgLy8gc2VsZWN0b3JBZGRFdmVudCgnI2VmZmVjdGl2ZV9hbHBoYWJldCcsICdjbGljaycsIGRyYXcpXG4gIHNlbGVjdG9yQWRkRXZlbnQoJ1t0eXBlPWNoZWNrYm94XScsICdjbGljaycsIGRyYXcpXG5cbiAgLy8gZHJhdyBpbml0aWFsbHkuXG4gIGlucHV0X3N0ci5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgncHJvcGVydHljaGFuZ2UnLCB7IGRldGFpbDogJ2luaXQgZXZlbnQnIH0pLFxuICApXG59XG5cbm1haW4oKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==