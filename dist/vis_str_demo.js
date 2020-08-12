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
    if (visualize === 'runs' ||
        visualize === 'palindromes' ||
        visualize === 'squares') {
        if (visualize === 'runs') {
            rangesp = enumRuns(input_str);
        }
        else if (visualize === 'palindromes') {
            rangesp = enumPalindromes(input_str);
        }
        else if (visualize === 'squares') {
            rangesp = enumSquares(input_str);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvcm91dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLW5hbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zdHIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zdHJfZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLHNEQUFZOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxRQUFRLDRCQUE0QjtBQUNwQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDZCQUE2QjtBQUNwQyxXQUFXLGlDQUFpQztBQUM1QyxVQUFVLGdDQUFnQztBQUMxQyxXQUFXLGlDQUFpQztBQUM1QyxPQUFPLHFDQUFxQztBQUM1QyxTQUFTLDJDQUEyQztBQUNwRCxRQUFRO0FBQ1I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsaUJBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxvREFBb0QsZ0JBQWdCO0FBQ3BFLGtEQUFrRCxjQUFjO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRLFNBQVM7QUFDakMsZ0JBQWdCLFFBQVEsU0FBUztBQUNqQyxpQkFBaUIsT0FBTyxRQUFRO0FBQ2hDLGlCQUFpQixPQUFPLFFBQVE7QUFDaEMsZ0JBQWdCLFNBQVMsT0FBTztBQUNoQyxnQkFBZ0IsU0FBUyxPQUFPO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlFQUF5RTs7QUFFekU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxFQUFFLFVBQVUsRUFBRTtBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdDBCQSxvQkFBb0IsbUJBQU8sQ0FBQyxrRUFBZTtBQUMzQyxjQUFjLG1CQUFPLENBQUMsc0RBQVM7O0FBRS9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0RBQXdELHVDQUF1QztBQUMvRixzREFBc0QscUNBQXFDOztBQUUzRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7QUNoRkEsb0JBQW9CLG1CQUFPLENBQUMsa0VBQWU7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQy9GWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTtLQUNGO0lBQ0QsT0FBTyxHQUFHO0FBQ1osQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFFLEdBQVcsRUFBRSxDQUFTLEVBQVcsRUFBRTtJQUM5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENB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X3N0cl9kZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmlzX3N0cl9kZW1vLnRzXCIpO1xuIiwiLyogTUlUIGxpY2Vuc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuY29uc3QgY3NzS2V5d29yZHMgPSByZXF1aXJlKCdjb2xvci1uYW1lJyk7XG5cbi8vIE5PVEU6IGNvbnZlcnNpb25zIHNob3VsZCBvbmx5IHJldHVybiBwcmltaXRpdmUgdmFsdWVzIChpLmUuIGFycmF5cywgb3Jcbi8vICAgICAgIHZhbHVlcyB0aGF0IGdpdmUgY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzKS5cbi8vICAgICAgIGRvIG5vdCB1c2UgYm94IHZhbHVlcyB0eXBlcyAoaS5lLiBOdW1iZXIoKSwgU3RyaW5nKCksIGV0Yy4pXG5cbmNvbnN0IHJldmVyc2VLZXl3b3JkcyA9IHt9O1xuZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3NzS2V5d29yZHMpKSB7XG5cdHJldmVyc2VLZXl3b3Jkc1tjc3NLZXl3b3Jkc1trZXldXSA9IGtleTtcbn1cblxuY29uc3QgY29udmVydCA9IHtcblx0cmdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3JnYid9LFxuXHRoc2w6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHNsJ30sXG5cdGhzdjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc3YnfSxcblx0aHdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2h3Yid9LFxuXHRjbXlrOiB7Y2hhbm5lbHM6IDQsIGxhYmVsczogJ2NteWsnfSxcblx0eHl6OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3h5eid9LFxuXHRsYWI6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGFiJ30sXG5cdGxjaDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsY2gnfSxcblx0aGV4OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydoZXgnXX0sXG5cdGtleXdvcmQ6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2tleXdvcmQnXX0sXG5cdGFuc2kxNjoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTE2J119LFxuXHRhbnNpMjU2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMjU2J119LFxuXHRoY2c6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ2gnLCAnYycsICdnJ119LFxuXHRhcHBsZToge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsncjE2JywgJ2cxNicsICdiMTYnXX0sXG5cdGdyYXk6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2dyYXknXX1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydDtcblxuLy8gSGlkZSAuY2hhbm5lbHMgYW5kIC5sYWJlbHMgcHJvcGVydGllc1xuZm9yIChjb25zdCBtb2RlbCBvZiBPYmplY3Qua2V5cyhjb252ZXJ0KSkge1xuXHRpZiAoISgnY2hhbm5lbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0fVxuXG5cdGlmICghKCdsYWJlbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVsIGxhYmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0fVxuXG5cdGlmIChjb252ZXJ0W21vZGVsXS5sYWJlbHMubGVuZ3RoICE9PSBjb252ZXJ0W21vZGVsXS5jaGFubmVscykge1xuXHRcdHRocm93IG5ldyBFcnJvcignY2hhbm5lbCBhbmQgbGFiZWwgY291bnRzIG1pc21hdGNoOiAnICsgbW9kZWwpO1xuXHR9XG5cblx0Y29uc3Qge2NoYW5uZWxzLCBsYWJlbHN9ID0gY29udmVydFttb2RlbF07XG5cdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmxhYmVscztcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNoYW5uZWxzfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogbGFiZWxzfSk7XG59XG5cbmNvbnZlcnQucmdiLmhzbCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgbWluID0gTWF0aC5taW4ociwgZywgYik7XG5cdGNvbnN0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHRjb25zdCBkZWx0YSA9IG1heCAtIG1pbjtcblx0bGV0IGg7XG5cdGxldCBzO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdGggPSAwO1xuXHR9IGVsc2UgaWYgKHIgPT09IG1heCkge1xuXHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG5cdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG5cdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgbCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5oc3YgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGxldCByZGlmO1xuXHRsZXQgZ2RpZjtcblx0bGV0IGJkaWY7XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCB2ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRpZmYgPSB2IC0gTWF0aC5taW4ociwgZywgYik7XG5cdGNvbnN0IGRpZmZjID0gZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gKHYgLSBjKSAvIDYgLyBkaWZmICsgMSAvIDI7XG5cdH07XG5cblx0aWYgKGRpZmYgPT09IDApIHtcblx0XHRoID0gMDtcblx0XHRzID0gMDtcblx0fSBlbHNlIHtcblx0XHRzID0gZGlmZiAvIHY7XG5cdFx0cmRpZiA9IGRpZmZjKHIpO1xuXHRcdGdkaWYgPSBkaWZmYyhnKTtcblx0XHRiZGlmID0gZGlmZmMoYik7XG5cblx0XHRpZiAociA9PT0gdikge1xuXHRcdFx0aCA9IGJkaWYgLSBnZGlmO1xuXHRcdH0gZWxzZSBpZiAoZyA9PT0gdikge1xuXHRcdFx0aCA9ICgxIC8gMykgKyByZGlmIC0gYmRpZjtcblx0XHR9IGVsc2UgaWYgKGIgPT09IHYpIHtcblx0XHRcdGggPSAoMiAvIDMpICsgZ2RpZiAtIHJkaWY7XG5cdFx0fVxuXG5cdFx0aWYgKGggPCAwKSB7XG5cdFx0XHRoICs9IDE7XG5cdFx0fSBlbHNlIGlmIChoID4gMSkge1xuXHRcdFx0aCAtPSAxO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBbXG5cdFx0aCAqIDM2MCxcblx0XHRzICogMTAwLFxuXHRcdHYgKiAxMDBcblx0XTtcbn07XG5cbmNvbnZlcnQucmdiLmh3YiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXTtcblx0Y29uc3QgZyA9IHJnYlsxXTtcblx0bGV0IGIgPSByZ2JbMl07XG5cdGNvbnN0IGggPSBjb252ZXJ0LnJnYi5oc2wocmdiKVswXTtcblx0Y29uc3QgdyA9IDEgLyAyNTUgKiBNYXRoLm1pbihyLCBNYXRoLm1pbihnLCBiKSk7XG5cblx0YiA9IDEgLSAxIC8gMjU1ICogTWF0aC5tYXgociwgTWF0aC5tYXgoZywgYikpO1xuXG5cdHJldHVybiBbaCwgdyAqIDEwMCwgYiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5jbXlrID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdGNvbnN0IGsgPSBNYXRoLm1pbigxIC0gciwgMSAtIGcsIDEgLSBiKTtcblx0Y29uc3QgYyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCBtID0gKDEgLSBnIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdGNvbnN0IHkgPSAoMSAtIGIgLSBrKSAvICgxIC0gaykgfHwgMDtcblxuXHRyZXR1cm4gW2MgKiAxMDAsIG0gKiAxMDAsIHkgKiAxMDAsIGsgKiAxMDBdO1xufTtcblxuZnVuY3Rpb24gY29tcGFyYXRpdmVEaXN0YW5jZSh4LCB5KSB7XG5cdC8qXG5cdFx0U2VlIGh0dHBzOi8vZW4ubS53aWtpcGVkaWEub3JnL3dpa2kvRXVjbGlkZWFuX2Rpc3RhbmNlI1NxdWFyZWRfRXVjbGlkZWFuX2Rpc3RhbmNlXG5cdCovXG5cdHJldHVybiAoXG5cdFx0KCh4WzBdIC0geVswXSkgKiogMikgK1xuXHRcdCgoeFsxXSAtIHlbMV0pICoqIDIpICtcblx0XHQoKHhbMl0gLSB5WzJdKSAqKiAyKVxuXHQpO1xufVxuXG5jb252ZXJ0LnJnYi5rZXl3b3JkID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByZXZlcnNlZCA9IHJldmVyc2VLZXl3b3Jkc1tyZ2JdO1xuXHRpZiAocmV2ZXJzZWQpIHtcblx0XHRyZXR1cm4gcmV2ZXJzZWQ7XG5cdH1cblxuXHRsZXQgY3VycmVudENsb3Nlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXHRsZXQgY3VycmVudENsb3Nlc3RLZXl3b3JkO1xuXG5cdGZvciAoY29uc3Qga2V5d29yZCBvZiBPYmplY3Qua2V5cyhjc3NLZXl3b3JkcykpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGNzc0tleXdvcmRzW2tleXdvcmRdO1xuXG5cdFx0Ly8gQ29tcHV0ZSBjb21wYXJhdGl2ZSBkaXN0YW5jZVxuXHRcdGNvbnN0IGRpc3RhbmNlID0gY29tcGFyYXRpdmVEaXN0YW5jZShyZ2IsIHZhbHVlKTtcblxuXHRcdC8vIENoZWNrIGlmIGl0cyBsZXNzLCBpZiBzbyBzZXQgYXMgY2xvc2VzdFxuXHRcdGlmIChkaXN0YW5jZSA8IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdGN1cnJlbnRDbG9zZXN0S2V5d29yZCA9IGtleXdvcmQ7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcbn07XG5cbmNvbnZlcnQua2V5d29yZC5yZ2IgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuXHRyZXR1cm4gY3NzS2V5d29yZHNba2V5d29yZF07XG59O1xuXG5jb252ZXJ0LnJnYi54eXogPSBmdW5jdGlvbiAocmdiKSB7XG5cdGxldCByID0gcmdiWzBdIC8gMjU1O1xuXHRsZXQgZyA9IHJnYlsxXSAvIDI1NTtcblx0bGV0IGIgPSByZ2JbMl0gLyAyNTU7XG5cblx0Ly8gQXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjA0MDQ1ID8gKCgociArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQpIDogKHIgLyAxMi45Mik7XG5cdGcgPSBnID4gMC4wNDA0NSA/ICgoKGcgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChnIC8gMTIuOTIpO1xuXHRiID0gYiA+IDAuMDQwNDUgPyAoKChiICsgMC4wNTUpIC8gMS4wNTUpICoqIDIuNCkgOiAoYiAvIDEyLjkyKTtcblxuXHRjb25zdCB4ID0gKHIgKiAwLjQxMjQpICsgKGcgKiAwLjM1NzYpICsgKGIgKiAwLjE4MDUpO1xuXHRjb25zdCB5ID0gKHIgKiAwLjIxMjYpICsgKGcgKiAwLjcxNTIpICsgKGIgKiAwLjA3MjIpO1xuXHRjb25zdCB6ID0gKHIgKiAwLjAxOTMpICsgKGcgKiAwLjExOTIpICsgKGIgKiAwLjk1MDUpO1xuXG5cdHJldHVybiBbeCAqIDEwMCwgeSAqIDEwMCwgeiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5sYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiLnh5eihyZ2IpO1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyAoeCAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/ICh5ICoqICgxIC8gMykpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQuaHNsLnJnYiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgaCA9IGhzbFswXSAvIDM2MDtcblx0Y29uc3QgcyA9IGhzbFsxXSAvIDEwMDtcblx0Y29uc3QgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHQyO1xuXHRsZXQgdDM7XG5cdGxldCB2YWw7XG5cblx0aWYgKHMgPT09IDApIHtcblx0XHR2YWwgPSBsICogMjU1O1xuXHRcdHJldHVybiBbdmFsLCB2YWwsIHZhbF07XG5cdH1cblxuXHRpZiAobCA8IDAuNSkge1xuXHRcdHQyID0gbCAqICgxICsgcyk7XG5cdH0gZWxzZSB7XG5cdFx0dDIgPSBsICsgcyAtIGwgKiBzO1xuXHR9XG5cblx0Y29uc3QgdDEgPSAyICogbCAtIHQyO1xuXG5cdGNvbnN0IHJnYiA9IFswLCAwLCAwXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdGlmICh0MyA8IDApIHtcblx0XHRcdHQzKys7XG5cdFx0fVxuXG5cdFx0aWYgKHQzID4gMSkge1xuXHRcdFx0dDMtLTtcblx0XHR9XG5cblx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG5cdFx0fSBlbHNlIGlmICgyICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0Mjtcblx0XHR9IGVsc2UgaWYgKDMgKiB0MyA8IDIpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsID0gdDE7XG5cdFx0fVxuXG5cdFx0cmdiW2ldID0gdmFsICogMjU1O1xuXHR9XG5cblx0cmV0dXJuIHJnYjtcbn07XG5cbmNvbnZlcnQuaHNsLmhzdiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgaCA9IGhzbFswXTtcblx0bGV0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGxldCBsID0gaHNsWzJdIC8gMTAwO1xuXHRsZXQgc21pbiA9IHM7XG5cdGNvbnN0IGxtaW4gPSBNYXRoLm1heChsLCAwLjAxKTtcblxuXHRsICo9IDI7XG5cdHMgKj0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdHNtaW4gKj0gbG1pbiA8PSAxID8gbG1pbiA6IDIgLSBsbWluO1xuXHRjb25zdCB2ID0gKGwgKyBzKSAvIDI7XG5cdGNvbnN0IHN2ID0gbCA9PT0gMCA/ICgyICogc21pbikgLyAobG1pbiArIHNtaW4pIDogKDIgKiBzKSAvIChsICsgcyk7XG5cblx0cmV0dXJuIFtoLCBzdiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5yZ2IgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IGggPSBoc3ZbMF0gLyA2MDtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0bGV0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cdGNvbnN0IGhpID0gTWF0aC5mbG9vcihoKSAlIDY7XG5cblx0Y29uc3QgZiA9IGggLSBNYXRoLmZsb29yKGgpO1xuXHRjb25zdCBwID0gMjU1ICogdiAqICgxIC0gcyk7XG5cdGNvbnN0IHEgPSAyNTUgKiB2ICogKDEgLSAocyAqIGYpKTtcblx0Y29uc3QgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuXHR2ICo9IDI1NTtcblxuXHRzd2l0Y2ggKGhpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cmV0dXJuIFt2LCB0LCBwXTtcblx0XHRjYXNlIDE6XG5cdFx0XHRyZXR1cm4gW3EsIHYsIHBdO1xuXHRcdGNhc2UgMjpcblx0XHRcdHJldHVybiBbcCwgdiwgdF07XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cmV0dXJuIFtwLCBxLCB2XTtcblx0XHRjYXNlIDQ6XG5cdFx0XHRyZXR1cm4gW3QsIHAsIHZdO1xuXHRcdGNhc2UgNTpcblx0XHRcdHJldHVybiBbdiwgcCwgcV07XG5cdH1cbn07XG5cbmNvbnZlcnQuaHN2LmhzbCA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgaCA9IGhzdlswXTtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0Y29uc3QgdiA9IGhzdlsyXSAvIDEwMDtcblx0Y29uc3Qgdm1pbiA9IE1hdGgubWF4KHYsIDAuMDEpO1xuXHRsZXQgc2w7XG5cdGxldCBsO1xuXG5cdGwgPSAoMiAtIHMpICogdjtcblx0Y29uc3QgbG1pbiA9ICgyIC0gcykgKiB2bWluO1xuXHRzbCA9IHMgKiB2bWluO1xuXHRzbCAvPSAobG1pbiA8PSAxKSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0c2wgPSBzbCB8fCAwO1xuXHRsIC89IDI7XG5cblx0cmV0dXJuIFtoLCBzbCAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG4vLyBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3MtY29sb3IvI2h3Yi10by1yZ2JcbmNvbnZlcnQuaHdiLnJnYiA9IGZ1bmN0aW9uIChod2IpIHtcblx0Y29uc3QgaCA9IGh3YlswXSAvIDM2MDtcblx0bGV0IHdoID0gaHdiWzFdIC8gMTAwO1xuXHRsZXQgYmwgPSBod2JbMl0gLyAxMDA7XG5cdGNvbnN0IHJhdGlvID0gd2ggKyBibDtcblx0bGV0IGY7XG5cblx0Ly8gV2ggKyBibCBjYW50IGJlID4gMVxuXHRpZiAocmF0aW8gPiAxKSB7XG5cdFx0d2ggLz0gcmF0aW87XG5cdFx0YmwgLz0gcmF0aW87XG5cdH1cblxuXHRjb25zdCBpID0gTWF0aC5mbG9vcig2ICogaCk7XG5cdGNvbnN0IHYgPSAxIC0gYmw7XG5cdGYgPSA2ICogaCAtIGk7XG5cblx0aWYgKChpICYgMHgwMSkgIT09IDApIHtcblx0XHRmID0gMSAtIGY7XG5cdH1cblxuXHRjb25zdCBuID0gd2ggKyBmICogKHYgLSB3aCk7IC8vIExpbmVhciBpbnRlcnBvbGF0aW9uXG5cblx0bGV0IHI7XG5cdGxldCBnO1xuXHRsZXQgYjtcblx0LyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUsbm8tbXVsdGktc3BhY2VzICovXG5cdHN3aXRjaCAoaSkge1xuXHRcdGRlZmF1bHQ6XG5cdFx0Y2FzZSA2OlxuXHRcdGNhc2UgMDogciA9IHY7ICBnID0gbjsgIGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAxOiByID0gbjsgIGcgPSB2OyAgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDI6IHIgPSB3aDsgZyA9IHY7ICBiID0gbjsgYnJlYWs7XG5cdFx0Y2FzZSAzOiByID0gd2g7IGcgPSBuOyAgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNDogciA9IG47ICBnID0gd2g7IGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDU6IHIgPSB2OyAgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSxuby1tdWx0aS1zcGFjZXMgKi9cblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC5jbXlrLnJnYiA9IGZ1bmN0aW9uIChjbXlrKSB7XG5cdGNvbnN0IGMgPSBjbXlrWzBdIC8gMTAwO1xuXHRjb25zdCBtID0gY215a1sxXSAvIDEwMDtcblx0Y29uc3QgeSA9IGNteWtbMl0gLyAxMDA7XG5cdGNvbnN0IGsgPSBjbXlrWzNdIC8gMTAwO1xuXG5cdGNvbnN0IHIgPSAxIC0gTWF0aC5taW4oMSwgYyAqICgxIC0gaykgKyBrKTtcblx0Y29uc3QgZyA9IDEgLSBNYXRoLm1pbigxLCBtICogKDEgLSBrKSArIGspO1xuXHRjb25zdCBiID0gMSAtIE1hdGgubWluKDEsIHkgKiAoMSAtIGspICsgayk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LnJnYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0Y29uc3QgeCA9IHh5elswXSAvIDEwMDtcblx0Y29uc3QgeSA9IHh5elsxXSAvIDEwMDtcblx0Y29uc3QgeiA9IHh5elsyXSAvIDEwMDtcblx0bGV0IHI7XG5cdGxldCBnO1xuXHRsZXQgYjtcblxuXHRyID0gKHggKiAzLjI0MDYpICsgKHkgKiAtMS41MzcyKSArICh6ICogLTAuNDk4Nik7XG5cdGcgPSAoeCAqIC0wLjk2ODkpICsgKHkgKiAxLjg3NTgpICsgKHogKiAwLjA0MTUpO1xuXHRiID0gKHggKiAwLjA1NTcpICsgKHkgKiAtMC4yMDQwKSArICh6ICogMS4wNTcwKTtcblxuXHQvLyBBc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIChyICoqICgxLjAgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IHIgKiAxMi45MjtcblxuXHRnID0gZyA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIChnICoqICgxLjAgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IGcgKiAxMi45MjtcblxuXHRiID0gYiA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIChiICoqICgxLjAgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IGIgKiAxMi45MjtcblxuXHRyID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgciksIDEpO1xuXHRnID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgZyksIDEpO1xuXHRiID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgYiksIDEpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5sYWIgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGxldCB4ID0geHl6WzBdO1xuXHRsZXQgeSA9IHh5elsxXTtcblx0bGV0IHogPSB4eXpbMl07XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/ICh4ICoqICgxIC8gMykpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gKHkgKiogKDEgLyAzKSkgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyAoeiAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRjb25zdCBsID0gKDExNiAqIHkpIC0gMTY7XG5cdGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRjb25zdCBiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5sYWIueHl6ID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgeDtcblx0bGV0IHk7XG5cdGxldCB6O1xuXG5cdHkgPSAobCArIDE2KSAvIDExNjtcblx0eCA9IGEgLyA1MDAgKyB5O1xuXHR6ID0geSAtIGIgLyAyMDA7XG5cblx0Y29uc3QgeTIgPSB5ICoqIDM7XG5cdGNvbnN0IHgyID0geCAqKiAzO1xuXHRjb25zdCB6MiA9IHogKiogMztcblx0eSA9IHkyID4gMC4wMDg4NTYgPyB5MiA6ICh5IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHggPSB4MiA+IDAuMDA4ODU2ID8geDIgOiAoeCAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR6ID0gejIgPiAwLjAwODg1NiA/IHoyIDogKHogLSAxNiAvIDExNikgLyA3Ljc4NztcblxuXHR4ICo9IDk1LjA0Nztcblx0eSAqPSAxMDA7XG5cdHogKj0gMTA4Ljg4MztcblxuXHRyZXR1cm4gW3gsIHksIHpdO1xufTtcblxuY29udmVydC5sYWIubGNoID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgaDtcblxuXHRjb25zdCBociA9IE1hdGguYXRhbjIoYiwgYSk7XG5cdGggPSBociAqIDM2MCAvIDIgLyBNYXRoLlBJO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgYyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcblxuXHRyZXR1cm4gW2wsIGMsIGhdO1xufTtcblxuY29udmVydC5sY2gubGFiID0gZnVuY3Rpb24gKGxjaCkge1xuXHRjb25zdCBsID0gbGNoWzBdO1xuXHRjb25zdCBjID0gbGNoWzFdO1xuXHRjb25zdCBoID0gbGNoWzJdO1xuXG5cdGNvbnN0IGhyID0gaCAvIDM2MCAqIDIgKiBNYXRoLlBJO1xuXHRjb25zdCBhID0gYyAqIE1hdGguY29zKGhyKTtcblx0Y29uc3QgYiA9IGMgKiBNYXRoLnNpbihocik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzLCBzYXR1cmF0aW9uID0gbnVsbCkge1xuXHRjb25zdCBbciwgZywgYl0gPSBhcmdzO1xuXHRsZXQgdmFsdWUgPSBzYXR1cmF0aW9uID09PSBudWxsID8gY29udmVydC5yZ2IuaHN2KGFyZ3MpWzJdIDogc2F0dXJhdGlvbjsgLy8gSHN2IC0+IGFuc2kxNiBvcHRpbWl6YXRpb25cblxuXHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgLyA1MCk7XG5cblx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0cmV0dXJuIDMwO1xuXHR9XG5cblx0bGV0IGFuc2kgPSAzMFxuXHRcdCsgKChNYXRoLnJvdW5kKGIgLyAyNTUpIDw8IDIpXG5cdFx0fCAoTWF0aC5yb3VuZChnIC8gMjU1KSA8PCAxKVxuXHRcdHwgTWF0aC5yb3VuZChyIC8gMjU1KSk7XG5cblx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0YW5zaSArPSA2MDtcblx0fVxuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5oc3YuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gT3B0aW1pemF0aW9uIGhlcmU7IHdlIGFscmVhZHkga25vdyB0aGUgdmFsdWUgYW5kIGRvbid0IG5lZWQgdG8gZ2V0XG5cdC8vIGl0IGNvbnZlcnRlZCBmb3IgdXMuXG5cdHJldHVybiBjb252ZXJ0LnJnYi5hbnNpMTYoY29udmVydC5oc3YucmdiKGFyZ3MpLCBhcmdzWzJdKTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kyNTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCByID0gYXJnc1swXTtcblx0Y29uc3QgZyA9IGFyZ3NbMV07XG5cdGNvbnN0IGIgPSBhcmdzWzJdO1xuXG5cdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRpZiAociA9PT0gZyAmJiBnID09PSBiKSB7XG5cdFx0aWYgKHIgPCA4KSB7XG5cdFx0XHRyZXR1cm4gMTY7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPiAyNDgpIHtcblx0XHRcdHJldHVybiAyMzE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKChyIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHR9XG5cblx0Y29uc3QgYW5zaSA9IDE2XG5cdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHIgLyAyNTUgKiA1KSlcblx0XHQrICg2ICogTWF0aC5yb3VuZChnIC8gMjU1ICogNSkpXG5cdFx0KyBNYXRoLnJvdW5kKGIgLyAyNTUgKiA1KTtcblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuYW5zaTE2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGxldCBjb2xvciA9IGFyZ3MgJSAxMDtcblxuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChjb2xvciA9PT0gMCB8fCBjb2xvciA9PT0gNykge1xuXHRcdGlmIChhcmdzID4gNTApIHtcblx0XHRcdGNvbG9yICs9IDMuNTtcblx0XHR9XG5cblx0XHRjb2xvciA9IGNvbG9yIC8gMTAuNSAqIDI1NTtcblxuXHRcdHJldHVybiBbY29sb3IsIGNvbG9yLCBjb2xvcl07XG5cdH1cblxuXHRjb25zdCBtdWx0ID0gKH5+KGFyZ3MgPiA1MCkgKyAxKSAqIDAuNTtcblx0Y29uc3QgciA9ICgoY29sb3IgJiAxKSAqIG11bHQpICogMjU1O1xuXHRjb25zdCBnID0gKCgoY29sb3IgPj4gMSkgJiAxKSAqIG11bHQpICogMjU1O1xuXHRjb25zdCBiID0gKCgoY29sb3IgPj4gMikgJiAxKSAqIG11bHQpICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LmFuc2kyNTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gSGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoYXJncyA+PSAyMzIpIHtcblx0XHRjb25zdCBjID0gKGFyZ3MgLSAyMzIpICogMTAgKyA4O1xuXHRcdHJldHVybiBbYywgYywgY107XG5cdH1cblxuXHRhcmdzIC09IDE2O1xuXG5cdGxldCByZW07XG5cdGNvbnN0IHIgPSBNYXRoLmZsb29yKGFyZ3MgLyAzNikgLyA1ICogMjU1O1xuXHRjb25zdCBnID0gTWF0aC5mbG9vcigocmVtID0gYXJncyAlIDM2KSAvIDYpIC8gNSAqIDI1NTtcblx0Y29uc3QgYiA9IChyZW0gJSA2KSAvIDUgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhleCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGNvbnN0IGludGVnZXIgPSAoKE1hdGgucm91bmQoYXJnc1swXSkgJiAweEZGKSA8PCAxNilcblx0XHQrICgoTWF0aC5yb3VuZChhcmdzWzFdKSAmIDB4RkYpIDw8IDgpXG5cdFx0KyAoTWF0aC5yb3VuZChhcmdzWzJdKSAmIDB4RkYpO1xuXG5cdGNvbnN0IHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LmhleC5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCBtYXRjaCA9IGFyZ3MudG9TdHJpbmcoMTYpLm1hdGNoKC9bYS1mMC05XXs2fXxbYS1mMC05XXszfS9pKTtcblx0aWYgKCFtYXRjaCkge1xuXHRcdHJldHVybiBbMCwgMCwgMF07XG5cdH1cblxuXHRsZXQgY29sb3JTdHJpbmcgPSBtYXRjaFswXTtcblxuXHRpZiAobWF0Y2hbMF0ubGVuZ3RoID09PSAzKSB7XG5cdFx0Y29sb3JTdHJpbmcgPSBjb2xvclN0cmluZy5zcGxpdCgnJykubWFwKGNoYXIgPT4ge1xuXHRcdFx0cmV0dXJuIGNoYXIgKyBjaGFyO1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0Y29uc3QgaW50ZWdlciA9IHBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cdGNvbnN0IHIgPSAoaW50ZWdlciA+PiAxNikgJiAweEZGO1xuXHRjb25zdCBnID0gKGludGVnZXIgPj4gOCkgJiAweEZGO1xuXHRjb25zdCBiID0gaW50ZWdlciAmIDB4RkY7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhjZyA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgoTWF0aC5tYXgociwgZyksIGIpO1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihNYXRoLm1pbihyLCBnKSwgYik7XG5cdGNvbnN0IGNocm9tYSA9IChtYXggLSBtaW4pO1xuXHRsZXQgZ3JheXNjYWxlO1xuXHRsZXQgaHVlO1xuXG5cdGlmIChjaHJvbWEgPCAxKSB7XG5cdFx0Z3JheXNjYWxlID0gbWluIC8gKDEgLSBjaHJvbWEpO1xuXHR9IGVsc2Uge1xuXHRcdGdyYXlzY2FsZSA9IDA7XG5cdH1cblxuXHRpZiAoY2hyb21hIDw9IDApIHtcblx0XHRodWUgPSAwO1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gcikge1xuXHRcdGh1ZSA9ICgoZyAtIGIpIC8gY2hyb21hKSAlIDY7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSBnKSB7XG5cdFx0aHVlID0gMiArIChiIC0gcikgLyBjaHJvbWE7XG5cdH0gZWxzZSB7XG5cdFx0aHVlID0gNCArIChyIC0gZykgLyBjaHJvbWE7XG5cdH1cblxuXHRodWUgLz0gNjtcblx0aHVlICU9IDE7XG5cblx0cmV0dXJuIFtodWUgKiAzNjAsIGNocm9tYSAqIDEwMCwgZ3JheXNjYWxlICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHNsLmhjZyA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgcyA9IGhzbFsxXSAvIDEwMDtcblx0Y29uc3QgbCA9IGhzbFsyXSAvIDEwMDtcblxuXHRjb25zdCBjID0gbCA8IDAuNSA/ICgyLjAgKiBzICogbCkgOiAoMi4wICogcyAqICgxLjAgLSBsKSk7XG5cblx0bGV0IGYgPSAwO1xuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAobCAtIDAuNSAqIGMpIC8gKDEuMCAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc2xbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YuaGNnID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRjb25zdCB2ID0gaHN2WzJdIC8gMTAwO1xuXG5cdGNvbnN0IGMgPSBzICogdjtcblx0bGV0IGYgPSAwO1xuXG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc3ZbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cucmdiID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBoID0gaGNnWzBdIC8gMzYwO1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGlmIChjID09PSAwLjApIHtcblx0XHRyZXR1cm4gW2cgKiAyNTUsIGcgKiAyNTUsIGcgKiAyNTVdO1xuXHR9XG5cblx0Y29uc3QgcHVyZSA9IFswLCAwLCAwXTtcblx0Y29uc3QgaGkgPSAoaCAlIDEpICogNjtcblx0Y29uc3QgdiA9IGhpICUgMTtcblx0Y29uc3QgdyA9IDEgLSB2O1xuXHRsZXQgbWcgPSAwO1xuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihoaSkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IHY7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHRwdXJlWzBdID0gdzsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSB2OyBicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IHc7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRjYXNlIDQ6XG5cdFx0XHRwdXJlWzBdID0gdjsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gdztcblx0fVxuXHQvKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cblx0bWcgPSAoMS4wIC0gYykgKiBnO1xuXG5cdHJldHVybiBbXG5cdFx0KGMgKiBwdXJlWzBdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsxXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMl0gKyBtZykgKiAyNTVcblx0XTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzdiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRjb25zdCB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdGxldCBmID0gMDtcblxuXHRpZiAodiA+IDAuMCkge1xuXHRcdGYgPSBjIC8gdjtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBmICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzbCA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRjb25zdCBsID0gZyAqICgxLjAgLSBjKSArIDAuNSAqIGM7XG5cdGxldCBzID0gMDtcblxuXHRpZiAobCA+IDAuMCAmJiBsIDwgMC41KSB7XG5cdFx0cyA9IGMgLyAoMiAqIGwpO1xuXHR9IGVsc2Vcblx0aWYgKGwgPj0gMC41ICYmIGwgPCAxLjApIHtcblx0XHRzID0gYyAvICgyICogKDEgLSBsKSk7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5od2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cdGNvbnN0IHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0cmV0dXJuIFtoY2dbMF0sICh2IC0gYykgKiAxMDAsICgxIC0gdikgKiAxMDBdO1xufTtcblxuY29udmVydC5od2IuaGNnID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCB3ID0gaHdiWzFdIC8gMTAwO1xuXHRjb25zdCBiID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gMSAtIGI7XG5cdGNvbnN0IGMgPSB2IC0gdztcblx0bGV0IGcgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGcgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHdiWzBdLCBjICogMTAwLCBnICogMTAwXTtcbn07XG5cbmNvbnZlcnQuYXBwbGUucmdiID0gZnVuY3Rpb24gKGFwcGxlKSB7XG5cdHJldHVybiBbKGFwcGxlWzBdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMV0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsyXSAvIDY1NTM1KSAqIDI1NV07XG59O1xuXG5jb252ZXJ0LnJnYi5hcHBsZSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIFsocmdiWzBdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzFdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzJdIC8gMjU1KSAqIDY1NTM1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gW2FyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTVdO1xufTtcblxuY29udmVydC5ncmF5LmhzbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbMCwgMCwgYXJnc1swXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHN2ID0gY29udmVydC5ncmF5LmhzbDtcblxuY29udmVydC5ncmF5Lmh3YiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMTAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5jbXlrID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAwLCAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5sYWIgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gW2dyYXlbMF0sIDAsIDBdO1xufTtcblxuY29udmVydC5ncmF5LmhleCA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdGNvbnN0IHZhbCA9IE1hdGgucm91bmQoZ3JheVswXSAvIDEwMCAqIDI1NSkgJiAweEZGO1xuXHRjb25zdCBpbnRlZ2VyID0gKHZhbCA8PCAxNikgKyAodmFsIDw8IDgpICsgdmFsO1xuXG5cdGNvbnN0IHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LnJnYi5ncmF5ID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB2YWwgPSAocmdiWzBdICsgcmdiWzFdICsgcmdiWzJdKSAvIDM7XG5cdHJldHVybiBbdmFsIC8gMjU1ICogMTAwXTtcbn07XG4iLCJjb25zdCBjb252ZXJzaW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbnMnKTtcbmNvbnN0IHJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZScpO1xuXG5jb25zdCBjb252ZXJ0ID0ge307XG5cbmNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuZnVuY3Rpb24gd3JhcFJhdyhmbikge1xuXHRjb25zdCB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGNvbnN0IGFyZzAgPSBhcmdzWzBdO1xuXHRcdGlmIChhcmcwID09PSB1bmRlZmluZWQgfHwgYXJnMCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZzA7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZzAubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IGFyZzA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKGFyZ3MpO1xuXHR9O1xuXG5cdC8vIFByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZnVuY3Rpb24gd3JhcFJvdW5kZWQoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblxuXHRcdGlmIChhcmcwID09PSB1bmRlZmluZWQgfHwgYXJnMCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZzA7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZzAubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IGFyZzA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0ID0gZm4oYXJncyk7XG5cblx0XHQvLyBXZSdyZSBhc3N1bWluZyB0aGUgcmVzdWx0IGlzIGFuIGFycmF5IGhlcmUuXG5cdFx0Ly8gc2VlIG5vdGljZSBpbiBjb252ZXJzaW9ucy5qczsgZG9uJ3QgdXNlIGJveCB0eXBlc1xuXHRcdC8vIGluIGNvbnZlcnNpb24gZnVuY3Rpb25zLlxuXHRcdGlmICh0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Zm9yIChsZXQgbGVuID0gcmVzdWx0Lmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRyZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHQvLyBQcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbm1vZGVscy5mb3JFYWNoKGZyb21Nb2RlbCA9PiB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdGNvbnN0IHJvdXRlcyA9IHJvdXRlKGZyb21Nb2RlbCk7XG5cdGNvbnN0IHJvdXRlTW9kZWxzID0gT2JqZWN0LmtleXMocm91dGVzKTtcblxuXHRyb3V0ZU1vZGVscy5mb3JFYWNoKHRvTW9kZWwgPT4ge1xuXHRcdGNvbnN0IGZuID0gcm91dGVzW3RvTW9kZWxdO1xuXG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdID0gd3JhcFJvdW5kZWQoZm4pO1xuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXS5yYXcgPSB3cmFwUmF3KGZuKTtcblx0fSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0O1xuIiwiY29uc3QgY29udmVyc2lvbnMgPSByZXF1aXJlKCcuL2NvbnZlcnNpb25zJyk7XG5cbi8qXG5cdFRoaXMgZnVuY3Rpb24gcm91dGVzIGEgbW9kZWwgdG8gYWxsIG90aGVyIG1vZGVscy5cblxuXHRhbGwgZnVuY3Rpb25zIHRoYXQgYXJlIHJvdXRlZCBoYXZlIGEgcHJvcGVydHkgYC5jb252ZXJzaW9uYCBhdHRhY2hlZFxuXHR0byB0aGUgcmV0dXJuZWQgc3ludGhldGljIGZ1bmN0aW9uLiBUaGlzIHByb3BlcnR5IGlzIGFuIGFycmF5XG5cdG9mIHN0cmluZ3MsIGVhY2ggd2l0aCB0aGUgc3RlcHMgaW4gYmV0d2VlbiB0aGUgJ2Zyb20nIGFuZCAndG8nXG5cdGNvbG9yIG1vZGVscyAoaW5jbHVzaXZlKS5cblxuXHRjb252ZXJzaW9ucyB0aGF0IGFyZSBub3QgcG9zc2libGUgc2ltcGx5IGFyZSBub3QgaW5jbHVkZWQuXG4qL1xuXG5mdW5jdGlvbiBidWlsZEdyYXBoKCkge1xuXHRjb25zdCBncmFwaCA9IHt9O1xuXHQvLyBodHRwczovL2pzcGVyZi5jb20vb2JqZWN0LWtleXMtdnMtZm9yLWluLXdpdGgtY2xvc3VyZS8zXG5cdGNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuXHRmb3IgKGxldCBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Z3JhcGhbbW9kZWxzW2ldXSA9IHtcblx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tLzEtdnMtaW5maW5pdHlcblx0XHRcdC8vIG1pY3JvLW9wdCwgYnV0IHRoaXMgaXMgc2ltcGxlLlxuXHRcdFx0ZGlzdGFuY2U6IC0xLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlYWR0aC1maXJzdF9zZWFyY2hcbmZ1bmN0aW9uIGRlcml2ZUJGUyhmcm9tTW9kZWwpIHtcblx0Y29uc3QgZ3JhcGggPSBidWlsZEdyYXBoKCk7XG5cdGNvbnN0IHF1ZXVlID0gW2Zyb21Nb2RlbF07IC8vIFVuc2hpZnQgLT4gcXVldWUgLT4gcG9wXG5cblx0Z3JhcGhbZnJvbU1vZGVsXS5kaXN0YW5jZSA9IDA7XG5cblx0d2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBxdWV1ZS5wb3AoKTtcblx0XHRjb25zdCBhZGphY2VudHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9uc1tjdXJyZW50XSk7XG5cblx0XHRmb3IgKGxldCBsZW4gPSBhZGphY2VudHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRjb25zdCBhZGphY2VudCA9IGFkamFjZW50c1tpXTtcblx0XHRcdGNvbnN0IG5vZGUgPSBncmFwaFthZGphY2VudF07XG5cblx0XHRcdGlmIChub2RlLmRpc3RhbmNlID09PSAtMSkge1xuXHRcdFx0XHRub2RlLmRpc3RhbmNlID0gZ3JhcGhbY3VycmVudF0uZGlzdGFuY2UgKyAxO1xuXHRcdFx0XHRub2RlLnBhcmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoYWRqYWNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuZnVuY3Rpb24gbGluayhmcm9tLCB0bykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRyZXR1cm4gdG8oZnJvbShhcmdzKSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKSB7XG5cdGNvbnN0IHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0bGV0IGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHRsZXQgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gZGVyaXZlQkZTKGZyb21Nb2RlbCk7XG5cdGNvbnN0IGNvbnZlcnNpb24gPSB7fTtcblxuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAobGV0IGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRjb25zdCB0b01vZGVsID0gbW9kZWxzW2ldO1xuXHRcdGNvbnN0IG5vZGUgPSBncmFwaFt0b01vZGVsXTtcblxuXHRcdGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gTm8gcG9zc2libGUgY29udmVyc2lvbiwgb3IgdGhpcyBub2RlIGlzIHRoZSBzb3VyY2UgbW9kZWwuXG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb252ZXJzaW9uW3RvTW9kZWxdID0gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpO1xuXHR9XG5cblx0cmV0dXJuIGNvbnZlcnNpb247XG59O1xuXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcclxuXHRcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXHJcblx0XCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcclxuXHRcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcclxuXHRcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcclxuXHRcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXHJcblx0XCJibGFja1wiOiBbMCwgMCwgMF0sXHJcblx0XCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXHJcblx0XCJibHVlXCI6IFswLCAwLCAyNTVdLFxyXG5cdFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcclxuXHRcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXHJcblx0XCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxyXG5cdFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxyXG5cdFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxyXG5cdFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxyXG5cdFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXHJcblx0XCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXHJcblx0XCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXHJcblx0XCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXHJcblx0XCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcclxuXHRcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXHJcblx0XCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxyXG5cdFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxyXG5cdFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcclxuXHRcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXHJcblx0XCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxyXG5cdFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxyXG5cdFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcclxuXHRcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXHJcblx0XCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcclxuXHRcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXHJcblx0XCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXHJcblx0XCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxyXG5cdFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxyXG5cdFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXHJcblx0XCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxyXG5cdFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXHJcblx0XCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcclxuXHRcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcclxuXHRcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXHJcblx0XCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxyXG5cdFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXHJcblx0XCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXHJcblx0XCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXHJcblx0XCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxyXG5cdFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXHJcblx0XCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcclxuXHRcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxyXG5cdFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXHJcblx0XCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxyXG5cdFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxyXG5cdFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxyXG5cdFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxyXG5cdFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXHJcblx0XCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcclxuXHRcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXHJcblx0XCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxyXG5cdFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXHJcblx0XCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxyXG5cdFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxyXG5cdFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxyXG5cdFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXHJcblx0XCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXHJcblx0XCJsaWdodHNlYWdyZWVuXCI6IFszMiwgMTc4LCAxNzBdLFxyXG5cdFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcclxuXHRcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcclxuXHRcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcclxuXHRcImxpbWVcIjogWzAsIDI1NSwgMF0sXHJcblx0XCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcclxuXHRcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcclxuXHRcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcclxuXHRcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxyXG5cdFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcclxuXHRcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcclxuXHRcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxOV0sXHJcblx0XCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcclxuXHRcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXHJcblx0XCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxyXG5cdFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxyXG5cdFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxyXG5cdFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXHJcblx0XCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxyXG5cdFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcclxuXHRcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcclxuXHRcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcclxuXHRcIm5hdnlcIjogWzAsIDAsIDEyOF0sXHJcblx0XCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcclxuXHRcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXHJcblx0XCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXHJcblx0XCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcclxuXHRcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXHJcblx0XCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxyXG5cdFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXHJcblx0XCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxyXG5cdFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXHJcblx0XCJwYWxldmlvbGV0cmVkXCI6IFsyMTksIDExMiwgMTQ3XSxcclxuXHRcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxyXG5cdFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcclxuXHRcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXHJcblx0XCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcclxuXHRcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxyXG5cdFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXHJcblx0XCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcclxuXHRcInJlYmVjY2FwdXJwbGVcIjogWzEwMiwgNTEsIDE1M10sXHJcblx0XCJyZWRcIjogWzI1NSwgMCwgMF0sXHJcblx0XCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxyXG5cdFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxyXG5cdFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcclxuXHRcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXHJcblx0XCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxyXG5cdFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcclxuXHRcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcclxuXHRcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxyXG5cdFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcclxuXHRcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxyXG5cdFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxyXG5cdFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcclxuXHRcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXHJcblx0XCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXHJcblx0XCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxyXG5cdFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxyXG5cdFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXHJcblx0XCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcclxuXHRcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcclxuXHRcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXHJcblx0XCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXHJcblx0XCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV0sXHJcblx0XCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcclxuXHRcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxyXG5cdFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF1cclxufTtcclxuIiwiaW1wb3J0ICogYXMgY29udmVydCBmcm9tICdjb2xvci1jb252ZXJ0J1xuXG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiBmb3Igc3RyaW5ncyAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VTdHIgPSBbbnVtYmVyLCBudW1iZXIsIHN0cmluZ1tdXVxuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gZm9yIGxpbmUgKi9cbmV4cG9ydCB0eXBlIFJhbmdlTGluZSA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyP11cbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uICovXG5leHBvcnQgdHlwZSBSYW5nZVNpbXBsZSA9IFJhbmdlU3RyIHwgUmFuZ2VMaW5lXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2Uge1xuICAvKiogVGhlIHN0eWxlIHRvIGRyYXcgcmFuZ2UuIEl0IGlzIGVpdGhlciBvZiBbXCJsaW5lXCIsIFwiY3VydmVcIiwgXCJhcnJvd1wiLCBcInN0clwiXS4gSWYgXCJzdHJcIiBpcyBjaG9zZW4sIHRoZSBvcHRpbmFsIHBhcmFtZXRlciBgc3RyYCBtdXN0IGJlIGdpdmVuLiBGb3Igb3RoZXIgc3R5bGVzLCB5b3UgY2FuIHNldCBsZWZ0IHN0eWxlIGFuZCByaWdodCBzdHlsZSBsaWUgXCJsaW5lLGFycm93XCIuICovXG4gIHN0eWxlOiBzdHJpbmdcbiAgLyoqIFRoZSBjb2xvciB0byBkcmF3IHJhbmdlLCBlLmcuIFwiIzAwMDAwMFwiIGZvciBibGFjay4gKi9cbiAgY29sb3I6IHN0cmluZ1xuICAvKiogVGhlIGJlZ2lubmluZyBpbmRleCBvZiB0aGUgcmFuZ2UuICovXG4gIGJlZzogbnVtYmVyXG4gIC8qKiBUaGUgZW5kaW5nIGluZGV4IG9mIHRoZSByYW5nZS4gTm90ZSB0aGF0IGluZGV4ZXMgYXJlIGluY2x1c2l2ZS4gKi9cbiAgZW5kOiBudW1iZXJcbiAgLyoqIFRoZSBzdGVwIG9mIHRoZSByYW5nZSBbYGJlZ2AsIGBlbmRgXS4gRm9yIGV4YW1wbGUsIGEgcmFuZ2UgW2BiZWdgLCBgZW5kYCwgYHN0ZXBgXSA9IFsxLCA4LCAzXSByZXByZXNlbnRzIGNvbnRpbnVvdXMgcmFuZ2VzIFtbYGJlZ2AsIGBlbmRgXV09W1sxLCAzXSwgWzQsIDZdLCBbNywgOF1dICovXG4gIHN0ZXA/OiBudW1iZXJcbiAgLyoqIFRoZSBzdHJpbmdzIG9mIHRoZSByYW5nZS4gSXRzIGxlbmd0aCBtdXN0IGJlIGVxdWFsIHRvIHRoZSBsZW5ndGggb2YgdGhlIHJhbmdlIGBlbmRgIC0gYGJlZ2AgKyAxICovXG4gIHN0cj86IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2VQeCB7XG4gIC8qKiBUaGUgc3R5bGUgdG8gZHJhdyByYW5nZS4gSXQgaXMgZWl0aGVyIG9mIFtcImxpbmVcIiwgXCJjdXJ2ZVwiLCBcImFycm93XCIsIFwic3RyXCJdLiBJZiBcInN0clwiIGlzIGNob3NlbiwgdGhlIG9wdGluYWwgcGFyYW1ldGVyIGBzdHJgIG11c3QgYmUgZ2l2ZW4uIEZvciBvdGhlciBzdHlsZXMsIHlvdSBjYW4gc2V0IGxlZnQgc3R5bGUgYW5kIHJpZ2h0IHN0eWxlIGxpZSBcImxpbmUsYXJyb3dcIi4gKi9cbiAgc3R5bGU6IHN0cmluZ1xuICAvKiogVGhlIGNvbG9yIHRvIGRyYXcgcmFuZ2UsIGUuZy4gXCIjMDAwMDAwXCIgZm9yIGJsYWNrLiAqL1xuICBjb2xvcjogc3RyaW5nXG4gIC8qKiBUaGUgeC1jb29yZGluYXRlIHdoaWNoIGJlZ2lucyB0aGUgcmFuZ2UuICovXG4gIHhfYmVnOiBudW1iZXJcbiAgLyoqIFRoZSB4LWNvb3JkaW5hdGUgd2hpY2ggZW5kcyB0aGUgcmFuZ2UuICovXG4gIHhfZW5kOiBudW1iZXJcbiAgLyoqIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHJhbmdlLiAqL1xuICB5OiBudW1iZXJcbiAgLyoqIFRoZSBzdHJpbmdzIG9mIHRoZSByYW5nZS4gSXRzIGxlbmd0aCBtdXN0IGJlIGVxdWFsIHRvIHRoZSBsZW5ndGggb2YgdGhlIHJhbmdlIGBlbmRgIC0gYGJlZ2AgKyAxICovXG4gIHN0cj86IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBjbGFzcyBWaXNTdHIge1xuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICBwcml2YXRlIHN0cl94OiBudW1iZXJcbiAgcHJpdmF0ZSBzdHJfeTogbnVtYmVyXG4gIHByaXZhdGUgZm9udF9zaXplOiBudW1iZXJcbiAgcHJpdmF0ZSBmb250X3NpemVfaGFsZjogbnVtYmVyXG4gIHByaXZhdGUgZm9udF90eXBlOiBzdHJpbmdcbiAgLyoqIFRoZSBvZmZzZXQgdG8gc3RhcnQgZHJhd2luZyBhIHJhbmdlIGZyb20gYSBjZW50ZXIgcG9zaXRpb24gb2YgYW4gaW5kZXguICovXG4gIHByaXZhdGUgcmFuZ2VfYmVnX29mZnNldDogbnVtYmVyXG4gIHByaXZhdGUgcmFuZ2VfZW5kX29mZnNldDogbnVtYmVyXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBjYW52YXMgSFRNTENhbnZhc0VsZW1lbnRcbiAgICogQHBhcmFtIGZvbnRfc2l6ZSBmb250IHNpemVcbiAgICogQHBhcmFtIGZvbnRfdHlwZSBmb250IG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgZm9udF9zaXplID0gMzIsXG4gICAgZm9udF90eXBlID0gJ0NvdXJpZXInLFxuICApIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuZm9udF9zaXplID0gZm9udF9zaXplXG4gICAgdGhpcy5mb250X3NpemVfaGFsZiA9IHRoaXMuZm9udF9zaXplIC8gMlxuICAgIHRoaXMuZm9udF90eXBlID0gZm9udF90eXBlXG4gICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICB0aGlzLnN0cl94ID0gdGhpcy5mb250X3NpemVcbiAgICB0aGlzLnN0cl95ID0gdGhpcy5mb250X3NpemUgKiAyICsgdGhpcy5mb250X3NpemVfaGFsZlxuICAgIHRoaXMucmFuZ2VfYmVnX29mZnNldCA9IC10aGlzLmZvbnRfc2l6ZSAvIDRcbiAgICB0aGlzLnJhbmdlX2VuZF9vZmZzZXQgPSB0aGlzLmZvbnRfc2l6ZSAvIDRcbiAgfVxuXG4gIC8qKiBDbGVhciB0aGUgY2FudmFzLiAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB4LWNvb3JkaW5hdGUgd2hpY2ggaXMgYSBiZWdpbm5pbmcgb2YgYSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGlkeCBpbmRleCBvZiBhIHJhbmdlXG4gICAqIEByZXR1cm4gVGhlIHgtY29vcmRpbmF0ZSBvZiBhIHJhbmdlIGJlZ2lubmluZyBhdCBgaWR4YFxuICAgKi9cbiAgcmFuZ2VCZWcoaWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiBpZHggKyB0aGlzLnJhbmdlX2JlZ19vZmZzZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB4LWNvb3JkaW5hdGUgd2hpY2ggaXMgYSBlbmRpbmcgb2YgYSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGlkeCBpbmRleCBvZiBhIHJhbmdlXG4gICAqIEByZXR1cm4gVGhlIHgtY29vcmRpbmF0ZSBvZiBhIHJhbmdlIGVuZGluZyBhdCBgaWR4YFxuICAgKi9cbiAgcmFuZ2VFbmQoaWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiBpZHggKyB0aGlzLnJhbmdlX2VuZF9vZmZzZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGhlaWdodCBvZiBhIGdpdmVuIHJhbmdlLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlLlxuICAgKi9cbiAgcmFuZ2VIZWlnaHQocjogUmFuZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiByLnN0eWxlID09PSAnc3RyJyA/IHRoaXMuZm9udF9zaXplIDogTWF0aC5yb3VuZCh0aGlzLmZvbnRfc2l6ZSAqIDAuNSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgYSByYW5nZSBub3QgdG8gZHJhdyBzdHJpbmdzLCBzcGxpdCBpdCB0byB0aHJlZSBwYXJ0cyBsZWZ0LCBjZW50ZXIsIGFuZCByaWdodC5cbiAgICogQHBhcmFtIHJweCBHaXZlbiByYW5nZSB0byBzcGxpdC5cbiAgICovXG4gIHNwbGl0UmFuZ2VQeChycHg6IFJhbmdlUHgpOiBSYW5nZVB4W10ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHJweC5zdHlsZS5zcGxpdCgnLCcpXG5cbiAgICBsZXQgcmwgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpXG4gICAgbGV0IHJjID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KVxuICAgIGxldCByciA9IE9iamVjdC5hc3NpZ24oe30sIHJweClcbiAgICBybC54X2VuZCA9IHJweC54X2JlZyArIHRoaXMuY3VydmVfZCgpXG4gICAgcmwuc3R5bGUgPSBzdHlsZXNbMF1cblxuICAgIHJyLnhfYmVnID0gcnB4LnhfZW5kXG4gICAgcnIueF9lbmQgPSBycHgueF9lbmQgLSB0aGlzLmN1cnZlX2QoKVxuICAgIHJyLnN0eWxlID0gc3R5bGVzLmxlbmd0aCA+IDEgPyBzdHlsZXNbMV0gOiBzdHlsZXNbMF1cblxuICAgIHJjLnhfYmVnID0gcmwueF9lbmRcbiAgICByYy54X2VuZCA9IHJyLnhfZW5kXG4gICAgcmMuc3R5bGUgPSAnbGluZSdcbiAgICByZXR1cm4gW3JsLCByYywgcnJdXG4gIH1cblxuICAvKipcbiAgICogRHJhdyBjdXJ2ZSBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdDdXJ2ZVBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICB0aGlzLmN0eC5tb3ZlVG8ocnB4LnhfYmVnLCBycHgueSAtIHRoaXMuY3VydmVfZCgpKVxuICAgIHRoaXMuY3R4LnF1YWRyYXRpY0N1cnZlVG8ocnB4LnhfYmVnLCBycHgueSwgcnB4LnhfZW5kLCBycHgueSlcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbGVuZ3RoIG9mIGEgYmVnaW5uaW5nIChvciBlbmRpbmcpIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGN1cnZlX2QoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5mb250X3NpemVfaGFsZiAvIDJcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGxpbmUgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3TGluZVB4UGFydChycHg6IFJhbmdlUHgpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKVxuICAgIHRoaXMuY3R4Lm1vdmVUbyhycHgueF9iZWcsIHJweC55KVxuICAgIHRoaXMuY3R4LmxpbmVUbyhycHgueF9lbmQsIHJweC55KVxuICAgIHRoaXMuY3R4LnN0cm9rZSgpXG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhcnJvdyBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdBcnJvd1B4UGFydChycHg6IFJhbmdlUHgpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMuY3VydmVfZCgpICogKHJweC54X2JlZyA8IHJweC54X2VuZCA/IC0xIDogKzEpXG4gICAgdGhpcy5kcmF3TGluZVB4UGFydChycHgpXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICB0aGlzLmN0eC5tb3ZlVG8ocnB4LnhfZW5kICsgZHggLyAyLCBycHgueSArIGR4IC8gMilcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kICsgZHgsIHJweC55KVxuICAgIHRoaXMuY3R4LmxpbmVUbyhycHgueF9lbmQgKyBkeCAvIDIsIHJweC55IC0gZHggLyAyKVxuICAgIHRoaXMuY3R4LnN0cm9rZSgpXG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZSBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdSYW5nZVB4UGFydChycHg6IFJhbmdlUHgpIHtcbiAgICBpZiAocnB4LnN0eWxlID09ICdsaW5lJykge1xuICAgICAgdGhpcy5kcmF3TGluZVB4UGFydChycHgpXG4gICAgfSBlbHNlIGlmIChycHguc3R5bGUgPT0gJ2N1cnZlJykge1xuICAgICAgdGhpcy5kcmF3Q3VydmVQYXJ0KHJweClcbiAgICB9IGVsc2UgaWYgKHJweC5zdHlsZSA9PSAnYXJyb3cnKSB7XG4gICAgICB0aGlzLmRyYXdBcnJvd1B4UGFydChycHgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSByYW5nZSB0byBkcmF3LlxuICAgKi9cbiAgZHJhd1JhbmdlUHgocnB4OiBSYW5nZVB4KSB7XG4gICAgaWYgKHJweC5zdHlsZSA9PSAnbGluZScpIHtcbiAgICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBbcmwsIHJjLCBycl0gPSB0aGlzLnNwbGl0UmFuZ2VQeChycHgpXG4gICAgICB0aGlzLmRyYXdSYW5nZVB4UGFydChybClcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJjKVxuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocnIpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgc3RyaW5ncy5cbiAgICogQHBhcmFtIHIgQSByYW5nZSB0byBkcmF3IHN0cmluZ3MuXG4gICAqIEBwYXJhbSB5IFRoZSB5LWNvb3JpbmF0ZSB0byBkcmF3IHJhbmdlIGByYC5cbiAgICovXG4gIGRyYXdTdHIocjogUmFuZ2UsIHk6IG51bWJlcikge1xuICAgIGNvbnN0IHJzdHIgPSByLnN0ciBhcyBzdHJpbmdbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYyA9IHJzdHJbaV1cbiAgICAgIGNvbnN0IGN4ID0gdGhpcy5zdHJfeCArIChyLmJlZyArIGkpICogdGhpcy5mb250X3NpemVcbiAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGMsIGN4LCB5ICsgdGhpcy5mb250X3NpemUgKiAwLjMsIHRoaXMuZm9udF9zaXplKVxuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICAgIHRoaXMuY3R4LnJlY3QoXG4gICAgICAgIGN4IC0gdGhpcy5mb250X3NpemVfaGFsZixcbiAgICAgICAgeSAtIHRoaXMuZm9udF9zaXplX2hhbGYsXG4gICAgICAgIHRoaXMuZm9udF9zaXplLFxuICAgICAgICB0aGlzLmZvbnRfc2l6ZSxcbiAgICAgIClcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UgdG8gZHJhdy5cbiAgICogQHBhcmFtIHkgQSB5LWNvb3JkaW5hdGUgdG8gZHJhdyBgcmAuXG4gICAqL1xuICBkcmF3UmFuZ2UocjogUmFuZ2UsIHk6IG51bWJlcikge1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gci5jb2xvclxuICAgIGxldCBycHggPSB7XG4gICAgICB4X2JlZzogdGhpcy5yYW5nZUJlZyhyLmJlZyksXG4gICAgICB4X2VuZDogdGhpcy5yYW5nZUVuZChyLmVuZCksXG4gICAgICB5OiB5LFxuICAgICAgc3R5bGU6IHIuc3R5bGUsXG4gICAgICBjb2xvcjogci5jb2xvcixcbiAgICAgIHN0cjogci5zdHIsXG4gICAgfVxuICAgIGlmIChyLnN0eWxlID09ICdzdHInKSB7XG4gICAgICB0aGlzLmRyYXdTdHIociwgeSlcbiAgICB9IGVsc2UgaWYgKHIuc3RlcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRyYXdSYW5nZVB4KHJweClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHhfYmVnID0gdGhpcy5yYW5nZUJlZyhyLmJlZylcbiAgICAgIGZvciAobGV0IGN1ciA9IHIuYmVnICsgci5zdGVwIC0gMTsgY3VyIDwgci5lbmQ7IGN1ciArPSByLnN0ZXApIHtcbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogY3VyICsgdGhpcy5mb250X3NpemVfaGFsZlxuICAgICAgICB0aGlzLmRyYXdSYW5nZVB4KHJweClcbiAgICAgICAgcnB4LnhfYmVnID0gcnB4LnhfZW5kXG4gICAgICB9XG4gICAgICBpZiAoKHIuZW5kIC0gci5iZWcgKyAxKSAlIHIuc3RlcCA9PT0gMCkge1xuICAgICAgICBycHgueF9lbmQgPSB0aGlzLnJhbmdlRW5kKHIuZW5kKVxuICAgICAgICB0aGlzLmRyYXdSYW5nZVB4KHJweClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIHVuY29tcGxldGUgcmFuZ2UuXG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIHIuZW5kICsgdGhpcy5mb250X3NpemVfaGFsZlxuICAgICAgICBycHguc3R5bGUgPSByLnN0eWxlLnNwbGl0KCcsJylbMF0gKyAnLGxpbmUnXG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlcy5cbiAgICogQHBhcmFtIHJhbmdlX3Jvd3MgUmFuZ2VzIHRvIGRyYXcuXG4gICAqL1xuICBkcmF3UmFuZ2VzKHJhbmdlX3Jvd3M6IFJhbmdlW11bXSkge1xuICAgIGxldCB5cHggPSB0aGlzLnN0cl95XG4gICAgZm9yIChjb25zdCByYW5nZXMgb2YgcmFuZ2Vfcm93cykge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoLi4ucmFuZ2VzLm1hcChyID0+IHRoaXMucmFuZ2VIZWlnaHQocikpKVxuICAgICAgZm9yIChjb25zdCByYW5nZSBvZiByYW5nZXMpIHtcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2UocmFuZ2UsIHlweCArIGhlaWdodCAvIDIpXG4gICAgICB9XG4gICAgICB5cHggKz0gaGVpZ2h0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYW4gaW5wdXQgc3RyaW5nLlxuICAgKi9cbiAgZHJhd0lucHV0U3RyKGlucHV0X3N0cjogc3RyaW5nKSB7XG4gICAgbGV0IGluZGV4ID0gWydpJ11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0X3N0ci5sZW5ndGg7IGkrKykgaW5kZXgucHVzaCgnJyArIGkpXG4gICAgbGV0IHIgPSB7XG4gICAgICBzdHlsZTogJ3N0cicsXG4gICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgYmVnOiAtMSxcbiAgICAgIGVuZDogaW5wdXRfc3RyLmxlbmd0aCAtIDEsXG4gICAgICBzdHI6IGluZGV4LFxuICAgIH1cbiAgICB0aGlzLmRyYXdSYW5nZShyLCB0aGlzLnN0cl95IC0gdGhpcy5mb250X3NpemUgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmKVxuICAgIGNvbnN0IGNoYXJzID0gWydTdHInXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRfc3RyLmxlbmd0aDsgaSsrKVxuICAgICAgY2hhcnMucHVzaChpbnB1dF9zdHIuc3Vic3RyaW5nKGksIGkgKyAxKSlcbiAgICByLnN0ciA9IGNoYXJzXG4gICAgdGhpcy5kcmF3UmFuZ2UociwgdGhpcy5zdHJfeSAtIHRoaXMuZm9udF9zaXplX2hhbGYpXG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhIGdpdmVuIHN0cmluZyBhbmQgcmFuZ2VzLlxuICAgKiBAcGFyYW0gaW5wdXRfc3RyIElucHV0IHN0cmluZyB0byBkcmF3LlxuICAgKiBAcGFyYW0gcnNzIFRoZSByYW5nZXMgdG8gZHJhdyB3aGljaCBhcmUgcmVsYXRlZCB0byBhIGdpdmVuIHN0cmluZyBgaW5wdXRfc3RyYFxuICAgKi9cbiAgZHJhdyhpbnB1dF9zdHI6IHN0cmluZywgcnNzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgcmFuZ2VfYm91bmQgPSBbLTEsIGlucHV0X3N0ci5sZW5ndGggLSAxXVxuICAgIHJzcy5mb3JFYWNoKHJzID0+XG4gICAgICBycy5mb3JFYWNoKFxuICAgICAgICByID0+XG4gICAgICAgICAgKHJhbmdlX2JvdW5kID0gW1xuICAgICAgICAgICAgTWF0aC5taW4ocmFuZ2VfYm91bmRbMF0sIHIuYmVnKSxcbiAgICAgICAgICAgIE1hdGgubWF4KHJhbmdlX2JvdW5kWzFdLCByLmVuZCksXG4gICAgICAgICAgXSksXG4gICAgICApLFxuICAgIClcbiAgICB0aGlzLnN0cl94ID0gdGhpcy5mb250X3NpemUgKyBNYXRoLmFicyhyYW5nZV9ib3VuZFswXSkgKiB0aGlzLmZvbnRfc2l6ZVxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKHJhbmdlX2JvdW5kWzFdIC0gcmFuZ2VfYm91bmRbMF0gKyAyKSAqIHRoaXMuZm9udF9zaXplXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID1cbiAgICAgIHRoaXMuc3RyX3kgK1xuICAgICAgdGhpcy5mb250X3NpemVfaGFsZiArXG4gICAgICByc3MucmVkdWNlKFxuICAgICAgICAoYWNtLCBycykgPT4gYWNtICsgTWF0aC5tYXgoLi4ucnMubWFwKHIgPT4gdGhpcy5yYW5nZUhlaWdodChyKSkpLFxuICAgICAgICAwLFxuICAgICAgKVxuXG4gICAgLy8gRFBJIHNldHRpbmdzXG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMVxuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIC8vIGNvbnNvbGUubG9nKCdkcHInLCBkcHIsICcgcmVjdCcsIHJlY3QpXG4gICAgdGhpcy5jYW52YXMud2lkdGggKj0gZHByXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ICo9IGRwclxuICAgIHRoaXMuY3R4LnNjYWxlKGRwciwgZHByKVxuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggLyBkcHIgKyAncHgnXG5cbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyBkcHIgKyAncHgnXG4gICAgdGhpcy5jdHgudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAzXG4gICAgdGhpcy5jdHguZm9udCA9IHRoaXMuZm9udF9zaXplICsgJ3B4ICcgKyB0aGlzLmZvbnRfdHlwZVxuICAgIHRoaXMuZHJhd0lucHV0U3RyKGlucHV0X3N0cilcbiAgICB0aGlzLmRyYXdSYW5nZXMocnNzKVxuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgZ3JvdXAgdGhhdCBlYWNoIGNvbnRhaW5zIGEgc2luZ2xlIHJhbmdlLlxuICAgKiBAcGFyYW0gcmFuZ2VzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbWFrZVNpbmdsZUdyb3VwcyhyYW5nZXM6IFJhbmdlW10pOiBSYW5nZVtdW10ge1xuICAgIHJldHVybiByYW5nZXMubWFwKHJhbmdlID0+IFtyYW5nZV0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIFRzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gcmFuZ2VmIFRoZSBmdW5jdGlvbiB0byByZXR1cm4gdGhlIHR1cGxlIGJlZ2lubmluZyBpbmRleCBhbmQgZW5kaW5nIGluZGV4IG9mIGEgZ2l2ZW4gcmFuZ2UgYFRzW2ldYC5cbiAgICovXG4gIG5vbk92ZXJsYXBPYmpzPFQ+KFRzOiBUW10sIHJhbmdlZjogKGFyZzA6IFQpID0+IG51bWJlcltdKTogVFtdW10ge1xuICAgIGlmIChUcy5sZW5ndGggPD0gMCkgcmV0dXJuIFtdXG4gICAgY29uc3QgZW5kcyA9IFRzLm1hcCh0ID0+IHJhbmdlZih0KVsxXSlcbiAgICBjb25zdCBuID0gTWF0aC5tYXgoLi4uZW5kcykgKyAxXG4gICAgbGV0IHVzZWQgPSBuZXcgQXJyYXk8Ym9vbGVhbj4obilcbiAgICB1c2VkLmZpbGwoZmFsc2UpXG4gICAgbGV0IHJlcyA9IFtdXG4gICAgbGV0IHJvd3M6IFRbXSA9IFtdXG4gICAgZm9yIChjb25zdCB0IG9mIFRzKSB7XG4gICAgICAvLyBjaGVjayB3aGV0aGVyIG9yIG5vdCBhIHJhbmdlIGNhbiBiZSBpbnNlcnRlZCB0byB0aGUgY3VycmVudCByb3cuXG4gICAgICBsZXQgdXNlZF9hbnkgPSBmYWxzZVxuICAgICAgZm9yIChsZXQgaSA9IHJhbmdlZih0KVswXTsgaSA8PSByYW5nZWYodClbMV07IGkrKykge1xuICAgICAgICB1c2VkX2FueSA9IHVzZWRfYW55IHx8IHVzZWRbaV1cbiAgICAgIH1cbiAgICAgIGlmICh1c2VkX2FueSkge1xuICAgICAgICByZXMucHVzaChyb3dzKVxuICAgICAgICByb3dzID0gW3RdXG4gICAgICAgIHVzZWQuZmlsbChmYWxzZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd3MucHVzaCh0KVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IHJhbmdlZih0KVswXTsgaSA8PSByYW5nZWYodClbMV07IGkrKykge1xuICAgICAgICB1c2VkW2ldID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm93cy5sZW5ndGggPiAwKSByZXMucHVzaChyb3dzKVxuXG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ3JvdXBlZCByYW5nZXMgdGhhdCBlYWNoIGNvbnRhaW5zIG5vbiBvdmVybGFwcGluZyByYW5nZXMuXG4gICAqIEBwYXJhbSBycyBUaGUgcmFuZ2UgbGlzdC5cbiAgICovXG4gIG5vbk92ZXJsYXBSYW5nZXMocnM6IFJhbmdlW10pOiBSYW5nZVtdW10ge1xuICAgIHJldHVybiB0aGlzLm5vbk92ZXJsYXBPYmpzPFJhbmdlPihycywgciA9PiBbci5iZWcsIHIuZW5kXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBub25PdmVybGFwUmFuZ2VzU2ltcGxlKHJzOiBSYW5nZVNpbXBsZVtdKTogUmFuZ2VTaW1wbGVbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5ub25PdmVybGFwT2JqczxSYW5nZVNpbXBsZT4ocnMsIHggPT4gW3hbMF0sIHhbMV1dKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmFuZ2UgbGlzdCBgcnNgIHNwZWNpZmllZCB3aXRoIHRoZSBzdHlsZSBgc3R5bGVgLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgc3R5bGUgb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqL1xuICBtYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocnM6IFJhbmdlU2ltcGxlW11bXSwgc3R5bGU6IHN0cmluZyk6IFJhbmdlW11bXSB7XG4gICAgbGV0IHJlcyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29sb3IgPSAnIycgKyBjb252ZXJ0Lmhzdi5oZXgoWyhpICogMzYwKSAvIHJzLmxlbmd0aCwgODAsIDgwXSlcbiAgICAgIHJlcy5wdXNoKHRoaXMubWFrZVJhbmdlcyhyc1tpXSwgc3R5bGUsIGNvbG9yKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmFuZ2UgbGlzdCBgcnNgIHNwZWNpZmllZCB3aXRoIHN0eWxlIGBzdHlsZWAgYW5kIGBjb2xvcmAuXG4gICAqIEBwYXJhbSByYW5nZXMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgc3R5bGUgb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqL1xuICBtYWtlUmFuZ2VzKHJhbmdlczogUmFuZ2VTaW1wbGVbXSwgc3R5bGU6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IFJhbmdlW10ge1xuICAgIHJldHVybiByYW5nZXMubWFwKHJhbmdlID0+IHtcbiAgICAgIGNvbnN0IGlzX3N0ciA9XG4gICAgICAgIHR5cGVvZiByYW5nZVsyXSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHJhbmdlWzJdICE9PSAnbnVtYmVyJ1xuICAgICAgY29uc3Qgc3RlcCA9IHR5cGVvZiByYW5nZVsyXSA9PT0gJ251bWJlcicgPyByYW5nZVsyXSA6IHVuZGVmaW5lZFxuICAgICAgY29uc3Qgc3RyID0gdHlwZW9mIHJhbmdlWzJdICE9PSAnbnVtYmVyJyA/IHJhbmdlWzJdIDogdW5kZWZpbmVkXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdHlsZTogaXNfc3RyID8gJ3N0cicgOiBzdHlsZSxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIGJlZzogcmFuZ2VbMF0sXG4gICAgICAgIGVuZDogcmFuZ2VbMV0sXG4gICAgICAgIHN0ZXAsXG4gICAgICAgIHN0cixcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmFuZ2UgbGlzdCBgcnNgIHNwZWNpZmllZCB3aXRoIHRoZSBzdHlsZSBgc3R5bGVgLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgc3R5bGUgb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqL1xuICBtYWtlUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdLCBzdHlsZTogc3RyaW5nKTogUmFuZ2VbXSB7XG4gICAgcmV0dXJuIHJzLm1hcCgocmFuZ2UsIGkpID0+ICh7XG4gICAgICBzdHlsZSxcbiAgICAgIGNvbG9yOiAnIycgKyBjb252ZXJ0Lmhzdi5oZXgoWyhpICogMzYwKSAvIHJzLmxlbmd0aCwgODAsIDgwXSksXG4gICAgICBiZWc6IHJhbmdlWzBdLFxuICAgICAgZW5kOiByYW5nZVsxXSxcbiAgICB9KSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlzU3RyLCBSYW5nZVNpbXBsZSwgUmFuZ2UgfSBmcm9tICcuL3Zpc19zdHInXG5cbmNvbnN0IHN1YnN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGxldCByZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBuOyBqKyspIHJlcy5hZGQoc3RyLnN1YnN0cmluZyhpLCBqKSlcbiAgfVxuICByZXR1cm4gWy4uLnJlcy5rZXlzKCldXG59XG5cbmNvbnN0IGZpbmRBbGwgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gIGNvbnN0IG0gPSBwYXQubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBsZXQgcG9zID0gc3RyLmluZGV4T2YocGF0KVxuICB3aGlsZSAocG9zICE9PSAtMSkge1xuICAgIHJlcy5wdXNoKFtwb3MsIHBvcyArIG0gLSAxXSlcbiAgICBwb3MgPSBzdHIuaW5kZXhPZihwYXQsIHBvcyArIDEpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5jb25zdCBpc1BhbGluZHJvbWUgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoIC8gMjsgaSsrKSB7XG4gICAgaWYgKHN0cltpXSAhPSBzdHJbc3RyLmxlbmd0aCAtIGkgLSAxXSkgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgZW51bVBhbGluZHJvbWVzID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBmb3IgKGxldCBsZW4gPSAxOyBsZW4gPCBuOyBsZW4rKykge1xuICAgIGZvciAobGV0IGJlZyA9IDA7IGJlZyArIGxlbiA8PSBuOyBiZWcrKykge1xuICAgICAgaWYgKGlzUGFsaW5kcm9tZShzdHIuc3Vic3RyaW5nKGJlZywgYmVnICsgbGVuKSkpXG4gICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZyArIGxlbiAtIDFdKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGxjcCA9IChzdHI6IHN0cmluZywgaTogbnVtYmVyLCBqOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBsZXQgbiA9IHN0ci5sZW5ndGhcbiAgbGV0IG1hdGNoX2xlbiA9IDBcbiAgd2hpbGUgKGkgKyBtYXRjaF9sZW4gPCBuICYmIGogKyBtYXRjaF9sZW4gPCBuKSB7XG4gICAgaWYgKHN0cltpICsgbWF0Y2hfbGVuXSA9PSBzdHJbaiArIG1hdGNoX2xlbl0pIG1hdGNoX2xlbisrXG4gICAgZWxzZSBicmVha1xuICB9XG4gIHJldHVybiBtYXRjaF9sZW5cbn1cblxuY29uc3QgcHJldk9jY0xQRiA9IChzdHI6IHN0cmluZyk6IFtudW1iZXJbXSwgbnVtYmVyW11dID0+IHtcbiAgbGV0IHByZXZPY2MgPSBbXVxuICBsZXQgbHBmID0gW11cbiAgY29uc3QgbiA9IHN0ci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBsZXQgcG9jY3ggPSAtMVxuICAgIGxldCBscGZ4ID0gMFxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICBjb25zdCBsID0gbGNwKHN0ciwgaSwgailcbiAgICAgIGlmIChscGZ4IDwgbCkge1xuICAgICAgICBscGZ4ID0gbFxuICAgICAgICBwb2NjeCA9IGpcbiAgICAgIH1cbiAgICB9XG4gICAgcHJldk9jYy5wdXNoKHBvY2N4KVxuICAgIGxwZi5wdXNoKGxwZngpXG4gIH1cbiAgcmV0dXJuIFtwcmV2T2NjLCBscGZdXG59XG5cbmNvbnN0IGVudW1QcmV2T2NjTFBGID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGhcbiAgY29uc3QgW3ByZXZPY2MsIGxwZl0gPSBwcmV2T2NjTFBGKHN0cilcbiAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW1xuICAgIFtbLTEsIG4gLSAxLCBbJ29jYyddLmNvbmNhdChwcmV2T2NjLm1hcCh4ID0+IHgudG9TdHJpbmcoKSkpXV0sXG4gICAgW1stMSwgbiAtIDEsIFsnbGVuJ10uY29uY2F0KGxwZi5tYXAoeCA9PiB4LnRvU3RyaW5nKCkpKV1dLFxuICBdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldk9jYy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChscGZbaV0gPiAwKSB7XG4gICAgICByZXMucHVzaChbW2ksIGkgKyBscGZbaV0gLSAxXSwgW3ByZXZPY2NbaV0sIHByZXZPY2NbaV0gKyBscGZbaV0gLSAxXV0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuY29uc3QgaXNTcXVhcmUgPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcDsgaSsrKSB7XG4gICAgaWYgKHNbYmVnICsgaV0gIT0gc1tiZWcgKyBwICsgaV0pIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5jb25zdCBlbnVtU3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IDIgKiBwOyBvZmZzZXQrKykge1xuICAgICAgZm9yIChsZXQgYmVnID0gb2Zmc2V0OyBiZWcgPCBuIC0gMiAqIHAgKyAxOyBiZWcgKz0gMiAqIHApIHtcbiAgICAgICAgaWYgKGlzU3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyAyICogcCAtIDEsIHBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuY29uc3QgaXNSdW4gPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIGlmIChiZWcgPiAwICYmIHNbYmVnIC0gMV0gPT0gc1tiZWcgKyBwIC0gMV0pIHJldHVybiBmYWxzZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHA7IGkrKykge1xuICAgIGlmIChzW2JlZyArIGldICE9IHNbYmVnICsgcCArIGldKSByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBlbnVtUnVucyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXVxuICBsZXQgcm1hcCA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIGZvciAobGV0IHAgPSAxOyBwIDwgbjsgcCsrKSB7XG4gICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgMiAqIHAgPD0gbjsgYmVnKyspIHtcbiAgICAgIGlmIChpc1J1bihzLCBiZWcsIHApKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IDIgKiBwXG4gICAgICAgIHdoaWxlIChtYXRjaCA8IG4gJiYgc1tiZWcgKyAobWF0Y2ggJSBwKV0gPT0gc1tiZWcgKyBtYXRjaF0pIHtcbiAgICAgICAgICBtYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5ID0gYmVnICsgJywnICsgKGJlZyArIG1hdGNoIC0gMSlcbiAgICAgICAgaWYgKCFybWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgbWF0Y2ggLSAxLCBwXSlcbiAgICAgICAgICBybWFwLmFkZChrZXkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5jb25zdCBsZWZ0RXh0ZW5zaW9ucyA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGxldCByZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBsZXQgZnJvbUlkeCA9IDFcbiAgbGV0IHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgZnJvbUlkeClcbiAgd2hpbGUgKHBvcyAhPT0gLTEpIHtcbiAgICByZXMuYWRkKHN0cltwb3MgLSAxXSlcbiAgICBwb3MgPSBzdHIuaW5kZXhPZihwYXQsIHBvcyArIDEpXG4gIH1cbiAgcmV0dXJuIFsuLi5yZXMua2V5cygpXVxufVxuXG5jb25zdCByZXZlcnNlID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHN0clxuICAgIC5zcGxpdCgnJylcbiAgICAucmV2ZXJzZSgpXG4gICAgLmpvaW4oJycpXG59XG5cbmNvbnN0IHJpZ2h0RXh0ZW5zaW9ucyA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IHJzdHIgPSByZXZlcnNlKHN0cilcbiAgY29uc3QgcnBhdCA9IHJldmVyc2UocGF0KVxuICByZXR1cm4gbGVmdEV4dGVuc2lvbnMocnN0ciwgcnBhdClcbn1cblxuY29uc3QgaXNMZWZ0TWF4aW1hbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGxlZnRFeHRlbnNpb25zKHN0ciwgcGF0KS5sZW5ndGggPiAxXG59XG5cbmNvbnN0IGlzUmlnaHRNYXhpbWFsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gcmlnaHRFeHRlbnNpb25zKHN0ciwgcGF0KS5sZW5ndGggPiAxXG59XG5cbmNvbnN0IGlzTWF4UmVwZWF0ID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNMZWZ0TWF4aW1hbChzdHIsIHBhdCkgJiYgaXNSaWdodE1heGltYWwoc3RyLCBwYXQpXG59XG5cbmNvbnN0IGx6NzcgPSAoc3RyOiBzdHJpbmcsIHNob3dfZmFjdG9yaWQ6IG51bWJlciA9IDEpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aFxuICBjb25zdCBbb2NjcywgbGVuc10gPSBwcmV2T2NjTFBGKHN0cilcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKSB7XG4gICAgbGV0IHJhbmdlczogUmFuZ2VTaW1wbGVbXSA9IFtdXG4gICAgaWYgKG9jY3NbaV0gPT09IC0xKSB7XG4gICAgICByYW5nZXMgPSBbW2ksIGksIFtzdHJbaV1dXV1cbiAgICAgIGkgKz0gMVxuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZXMgPSBbW29jY3NbaV0sIG9jY3NbaV0gKyBsZW5zW2ldIC0gMV0sIFtpLCBpICsgbGVuc1tpXSAtIDFdXVxuICAgICAgaSArPSBsZW5zW2ldXG4gICAgfVxuICAgIGlmIChzaG93X2ZhY3RvcmlkID49IDApIHtcbiAgICAgIGNvbnN0IGxhc3RfZW5kID0gcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXVsxXVxuICAgICAgcmFuZ2VzLnB1c2goW2xhc3RfZW5kICsgMSwgbGFzdF9lbmQgKyAxLCBbJ2YnICsgc2hvd19mYWN0b3JpZF1dKVxuICAgICAgc2hvd19mYWN0b3JpZCsrXG4gICAgfVxuICAgIHJlcy5wdXNoKHJhbmdlcylcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGx6NzggPSAoc3RyOiBzdHJpbmcsIHNob3dfZmFjdG9yaWQgPSAxKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgbGV0IGQgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpXG4gIGxldCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKSB7XG4gICAgbGV0IGogPSBpICsgMVxuICAgIHdoaWxlIChqIDw9IHN0ci5sZW5ndGggJiYgZC5oYXMoc3RyLnN1YnN0cmluZyhpLCBqKSkpIHtcbiAgICAgIGorK1xuICAgIH1cbiAgICBsZXQgcm93OiBSYW5nZVNpbXBsZVtdID0gW11cbiAgICBpZiAoaiAtIGkgPiAxKSB7XG4gICAgICBjb25zdCBwcmV2ID0gZC5nZXQoc3RyLnN1YnN0cmluZyhpLCBqIC0gMSkpIGFzIG51bWJlclxuICAgICAgcm93LnB1c2goW3ByZXYsIHByZXYgKyAoaiAtIGkgLSAyKV0pXG4gICAgICByb3cucHVzaChbaSwgaiAtIDJdKVxuICAgIH1cbiAgICBpZiAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiwgW3N0cltqIC0gMV0sICdmJyArIHNob3dfZmFjdG9yaWRdXSlcbiAgICB9IGVsc2Uge1xuICAgICAgcm93LnB1c2goW2ogLSAxLCBqIC0gMSwgWydmJyArIHNob3dfZmFjdG9yaWRdXSlcbiAgICB9XG4gICAgc2hvd19mYWN0b3JpZCsrXG4gICAgcmVzLnB1c2gocm93KVxuICAgIGQuc2V0KHN0ci5zdWJzdHJpbmcoaSwgaiksIGkpXG4gICAgaSA9IGpcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGlzTHluZG9uID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGxlc3N0aGFuID0gZmFsc2VcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ci5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgajIgPSAoaSArIGopICUgc3RyLmxlbmd0aFxuICAgICAgaWYgKHN0cltqXSA+IHN0cltqMl0pIHJldHVybiBmYWxzZVxuICAgICAgZWxzZSBpZiAoc3RyW2pdIDwgc3RyW2oyXSkge1xuICAgICAgICBsZXNzdGhhbiA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFsZXNzdGhhbikgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gY29uc3QgZW51bUx5bmRvbiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4vLyAgIGNvbnN0IGNoZWNrID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZykgPT4gaXNMeW5kb24ocGF0KVxuLy8gICByZXR1cm4gZW51bUlmR3JvdXAoc3RyLCBjaGVjaylcbi8vIH1cbmNvbnN0IGVudW1MeW5kb24gPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdXG4gIGZvciAobGV0IGxlbiA9IDE7IGxlbiA8PSBzdHIubGVuZ3RoOyBsZW4rKykge1xuICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSArIGxlbiA8PSBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1YiA9IHN0ci5zdWJzdHIoaSwgbGVuKVxuICAgICAgaWYgKGlzTHluZG9uKHN1YikpIGdyb3VwLnB1c2goW2ksIGkgKyBsZW4gLSAxXSlcbiAgICB9XG4gICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLy8gRHV2YWwncyBhbGdvcml0aG1cbi8vIGZpbmQgbG9uZ2VzdCBseW5kb24gZmFjdG9yIHdoaWNoIHN0YXJ0cyBhdCBiZWcgaW4gc3RyLlxuLy8gcmV0dXJuIFtsZW4sIHJlcGVhdF0sIHdoZXJlXG4vLyBsZW4gaXMgdGhlIGxlbmd0aCBvZiB0aGUgZmFjdG9yLFxuLy8gcmVwZWF0IGlzIHRoZSBtYXhpbXVtIHJlcGVhdCBvZiB0aGUgZmFjdG9yLlxuY29uc3QgZmluZExvbmdlc3RMeW5kb25GYWN0b3IgPSAoXG4gIHN0cjogc3RyaW5nLFxuICBiZWc6IG51bWJlcixcbik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBsZXQgaSA9IGJlZ1xuICBsZXQgZW5kID0gYmVnICsgMVxuICB3aGlsZSAoZW5kIDwgc3RyLmxlbmd0aCAmJiBzdHJbaV0gPD0gc3RyW2VuZF0pIHtcbiAgICBpZiAoc3RyW2ldID09PSBzdHJbZW5kXSkge1xuICAgICAgaSsrXG4gICAgICBlbmQrK1xuICAgIH0gZWxzZSBpZiAoc3RyW2ldIDwgc3RyW2VuZF0pIHtcbiAgICAgIC8vIHN0cltiZWcuLi5lbmRdIGlzIEx5bmRvbiBzdHJpbmdcbiAgICAgIGkgPSBiZWdcbiAgICAgIGVuZCsrXG4gICAgfVxuICB9XG4gIC8vIHN0cltiZWcuLi5lbmQtMV0gaXMgdGhlIGxvbmdlc3QgTHluZG9uIHByZWZpeCBvZiBzdHJbYmVnLi4uXS5cbiAgY29uc3QgbGVuID0gZW5kIC0gaVxuICBjb25zdCByZXBlYXQgPSBNYXRoLmZsb29yKChlbmQgLSBiZWcpIC8gKGVuZCAtIGkpKVxuICByZXR1cm4gW2xlbiwgcmVwZWF0XVxufVxuXG5jb25zdCBseW5kb25GYWN0b3JpemF0aW9uID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW11cbiAgbGV0IGJlZyA9IDBcblxuICB3aGlsZSAoYmVnIDwgc3RyLmxlbmd0aCkge1xuICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgYmVnKVxuICAgIGNvbnN0IGxlbl9mYWN0b3IgPSBmYWN0b3JbMF0gKiBmYWN0b3JbMV1cbiAgICByZXMucHVzaChbW2JlZywgYmVnICsgbGVuX2ZhY3RvciAtIDEsIGZhY3RvclswXV1dIGFzIFJhbmdlU2ltcGxlW10pXG4gICAgYmVnICs9IGxlbl9mYWN0b3JcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGx5bmRvbkFycmF5ID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgaSlcbiAgICByZXMucHVzaChbW2ksIGkgKyBmYWN0b3JbMF0gLSAxXV0gYXMgUmFuZ2VTaW1wbGVbXSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8vIHJlcGxhY2UgdGhlIGNoYXJhY3RlcnMgdG8gZWZmZWN0aXZlIGFscGhhYmV0IFswLCBzaWdtYS0xXVxuLy8gc2lnbWEgaXMgdGhlIG51bWJlciBvZiBkaXN0aW5jdCBjaGFyYWN0ZXJzIG9mIGdpdmVuIHN0cmluZ1xuLy8gc2lnbWEgbXVzdCBiZSBsZXNzIHRoYW4gMTBcbmNvbnN0IHJlcGxhY2VFZmZlY3RpdmVBbHBoYWJldCA9IChzdHI6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgY2hhcnMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykgY2hhcnMuYWRkKHN0cltpXSlcbiAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShjaGFycy52YWx1ZXMoKSlcbiAgYXJyLnNvcnQoKVxuICBjb25zdCByZXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpXG4gIGFyci5tYXAoKGMsIGkpID0+IHJlcC5zZXQoYywgaS50b1N0cmluZygpKSlcbiAgY29uc3QgcmVwczogc3RyaW5nW10gPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSByZXBzLnB1c2gocmVwLmdldChzdHJbaV0pIGFzIHN0cmluZylcbiAgcmV0dXJuIHJlcHNcbiAgLy8gcmV0dXJuIHJlcHMuam9pbignJylcbn1cblxuY29uc3Qgc3VmZml4QXJyYXkgPSAoc3RyOiBzdHJpbmcpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IHN1ZmZpeGVzID0gWy4uLkFycmF5KHN0ci5sZW5ndGgpLmtleXMoKV0ubWFwKGkgPT4gc3RyLnN1YnN0cihpKSlcbiAgc3VmZml4ZXMuc29ydCgpXG4gIHJldHVybiBzdWZmaXhlcy5tYXAocyA9PiBzdHIubGVuZ3RoIC0gcy5sZW5ndGgpXG59XG5jb25zdCByYW5rQXJyYXkgPSAoc3RyOiBzdHJpbmcsIHNhPzogbnVtYmVyW10pID0+IHtcbiAgaWYgKHNhID09PSB1bmRlZmluZWQpIHNhID0gc3VmZml4QXJyYXkoc3RyKVxuICBjb25zdCByYW5rID0gQXJyYXkoc3RyLmxlbmd0aClcbiAgc2EuZm9yRWFjaCgocG9zLCByKSA9PiAocmFua1twb3NdID0gcikpXG4gIHJldHVybiByYW5rXG59XG5cbmNvbnN0IGVudW1JZiA9IChcbiAgc3RyOiBzdHJpbmcsXG4gIGNoZWNrOiAoczogc3RyaW5nLCBwOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4pOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgcmV0dXJuIGZsYXQoZW51bUlmR3JvdXAoc3RyLCBjaGVjaykpXG59XG5cbmNvbnN0IGVudW1JZkdyb3VwID0gKFxuICBzdHI6IHN0cmluZyxcbiAgY2hlY2s6IChzOiBzdHJpbmcsIHA6IHN0cmluZykgPT4gYm9vbGVhbixcbik6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIHJldHVybiBzdWJzdHJpbmdzKHN0cilcbiAgICAuZmlsdGVyKHAgPT4gY2hlY2soc3RyLCBwKSlcbiAgICAubWFwKHAgPT4gZmluZEFsbChzdHIsIHApKVxufVxuXG5jb25zdCByYWRpb1ZhbHVlID0gKHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgcmVzID0gJydcbiAgY29uc3QgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc2VsZWN0b3IpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlbG1zW2ldLmNoZWNrZWQpIHJlcyA9IGVsbXNbaV0udmFsdWVcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGZsYXQgPSA8VD4oYXJyOiBUW11bXSk6IFRbXSA9PiB7XG4gIHJldHVybiBhcnIucmVkdWNlKChhY20sIHgpID0+IGFjbS5jb25jYXQoeCksIFtdIGFzIFRbXSlcbn1cblxuY29uc3QgZHJhdyA9IChlOiBFdmVudCkgPT4ge1xuICAvLyBnZXQgZm9udCBzaXplXG4gIGxldCBmb250X3NpemUgPSBwYXJzZUludChyYWRpb1ZhbHVlKCdbbmFtZT1mb250X3NpemVdJykpXG4gIC8vIGdldCBsaW5lIHN0eWxlXG4gIGxldCByYW5nZV9zdHlsZSA9IHJhZGlvVmFsdWUoJ1tuYW1lPWxpbmVfc3R5bGVdJylcbiAgY29uc3QgbGluZV9zdHlsZV9yaWdodCA9IHJhZGlvVmFsdWUoJ1tuYW1lPWxpbmVfc3R5bGVfcmlnaHRdJylcblxuICByYW5nZV9zdHlsZSArPSBsaW5lX3N0eWxlX3JpZ2h0Lmxlbmd0aCA9PT0gMCA/ICcnIDogJywnICsgbGluZV9zdHlsZV9yaWdodFxuICBsZXQgdmlzdWFsaXplID0gcmFkaW9WYWx1ZSgnW25hbWU9dmlzdWFsaXplXScpXG4gIGNvbnNvbGUubG9nKFxuICAgIGBmb250X3NpemU9JHtmb250X3NpemV9LCBsaW5lX3N0eWxlPSR7cmFuZ2Vfc3R5bGV9LCB2aXN1YWxpemU9JHt2aXN1YWxpemV9YCxcbiAgKVxuXG4gIC8vIGdldCBpbnB1dCBzdHJpbmdcbiAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0X3N0cicpIGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgbGV0IGlucHV0X3N0ciA9IGVsbS52YWx1ZVxuXG4gIC8vIGdldCBjYW52YXNcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50XG4gIC8vIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gNTBcbiAgY29uc3QgdmlzU3RyID0gbmV3IFZpc1N0cihjYW52YXMsIChmb250X3NpemUgPSBmb250X3NpemUpKVxuXG4gIC8vIGNvbXB1dGUgcmFuZ2VzXG4gIGxldCByYW5nZXNwOiBSYW5nZVNpbXBsZVtdID0gW11cbiAgbGV0IHJhbmdlc19ncm91cDogUmFuZ2VTaW1wbGVbXVtdID0gW11cbiAgbGV0IHJhbmdlczogUmFuZ2VbXVtdID0gW11cblxuICBjb25zdCBzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnZWZmZWN0aXZlX2FscGhhYmV0JyxcbiAgKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkXG4gIGNvbnN0IHNob3dfcmFua19hcnJheSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAncmFua19hcnJheScsXG4gICkgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZFxuXG4gIGlmIChzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCkge1xuICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgIFtcbiAgICAgICAgLTEsXG4gICAgICAgIGlucHV0X3N0ci5sZW5ndGggLSAxLFxuICAgICAgICBbJ2VTdHInLCAuLi5yZXBsYWNlRWZmZWN0aXZlQWxwaGFiZXQoaW5wdXRfc3RyKV0sXG4gICAgICBdLFxuICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSlcbiAgfVxuICBpZiAoc2hvd19yYW5rX2FycmF5KSB7XG4gICAgcmFuZ2VzX2dyb3VwLnB1c2goW1xuICAgICAgWy0xLCBpbnB1dF9zdHIubGVuZ3RoIC0gMSwgWydyYW5rJywgLi4ucmFua0FycmF5KGlucHV0X3N0cildXSxcbiAgICBdIGFzIFJhbmdlU2ltcGxlW10pXG4gIH1cblxuICBpZiAoXG4gICAgdmlzdWFsaXplID09PSAncnVucycgfHxcbiAgICB2aXN1YWxpemUgPT09ICdwYWxpbmRyb21lcycgfHxcbiAgICB2aXN1YWxpemUgPT09ICdzcXVhcmVzJ1xuICApIHtcbiAgICBpZiAodmlzdWFsaXplID09PSAncnVucycpIHtcbiAgICAgIHJhbmdlc3AgPSBlbnVtUnVucyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW11cbiAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ3BhbGluZHJvbWVzJykge1xuICAgICAgcmFuZ2VzcCA9IGVudW1QYWxpbmRyb21lcyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW11cbiAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ3NxdWFyZXMnKSB7XG4gICAgICByYW5nZXNwID0gZW51bVNxdWFyZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdyYW5nZXNwJywgcmFuZ2VzcClcbiAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHZpc1N0ci5ub25PdmVybGFwUmFuZ2VzU2ltcGxlKHJhbmdlc3ApKVxuICAgIGNvbnNvbGUubG9nKCdyYW5nZV9ncm91cCcsIHJhbmdlc19ncm91cClcbiAgICByYW5nZXMgPSB2aXNTdHIubWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJhbmdlc19ncm91cCwgcmFuZ2Vfc3R5bGUpXG4gICAgY29uc29sZS5sb2coJ3Jhbmdlc3AnLCByYW5nZXMpXG4gIH0gZWxzZSB7XG4gICAgaWYgKHZpc3VhbGl6ZSA9PT0gJ2xwZicpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGVudW1QcmV2T2NjTFBGKGlucHV0X3N0cikpXG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSAnbGVmdF9tYXhpbWFsJylcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBpc0xlZnRNYXhpbWFsKSlcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09ICdyaWdodF9tYXhpbWFsJylcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBpc1JpZ2h0TWF4aW1hbCkpXG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSAnbWF4X3JlcGVhdCcpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGVudW1JZkdyb3VwKGlucHV0X3N0ciwgaXNNYXhSZXBlYXQpKVxuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ2x6NzcnKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChsejc3KGlucHV0X3N0cikpXG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSAnbHo3OCcpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGx6NzgoaW5wdXRfc3RyKSlcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09ICdseW5kb25fZmFjdG9yaXphdGlvbicpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGx5bmRvbkZhY3Rvcml6YXRpb24oaW5wdXRfc3RyKSlcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09ICdseW5kb25fYXJyYXknKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChseW5kb25BcnJheShpbnB1dF9zdHIpKVxuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gJ2VudW1fbHluZG9uJylcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bUx5bmRvbihpbnB1dF9zdHIpKVxuICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSlcbiAgICByYW5nZXMgPSBmbGF0KHJhbmdlcy5tYXAoeCA9PiB2aXNTdHIubm9uT3ZlcmxhcFJhbmdlcyh4KSkpXG4gIH1cblxuICB2aXNTdHIuZHJhdyhpbnB1dF9zdHIsIHJhbmdlcylcbn1cblxuY29uc3Qgc2VsZWN0b3JBZGRFdmVudCA9IChzZWxlY3Rvcjogc3RyaW5nLCBldmVudDogc3RyaW5nLCBmdW5jOiBhbnkpID0+IHtcbiAgY29uc3QgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc2VsZWN0b3IpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuICAgIGVsbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYylcbiAgfVxufVxuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjb25zdCBpbnB1dF9zdHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRfc3RyJykgYXMgSFRNTEVsZW1lbnRcbiAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZHJhdylcbiAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb3BlcnR5Y2hhbmdlJywgZHJhdylcblxuICAvLyBhZGQgZXZlbnQgZm9yIHJhZGlvIGJ1dHRvbnNcbiAgc2VsZWN0b3JBZGRFdmVudCgnW25hbWU9Zm9udF9zaXplXScsICdjbGljaycsIGRyYXcpXG4gIHNlbGVjdG9yQWRkRXZlbnQoJ1tuYW1lPWxpbmVfc3R5bGVdJywgJ2NsaWNrJywgZHJhdylcbiAgc2VsZWN0b3JBZGRFdmVudCgnW25hbWU9bGluZV9zdHlsZV9yaWdodF0nLCAnY2xpY2snLCBkcmF3KVxuICBzZWxlY3RvckFkZEV2ZW50KCdbbmFtZT12aXN1YWxpemVdJywgJ2NsaWNrJywgZHJhdylcbiAgLy8gc2VsZWN0b3JBZGRFdmVudCgnI2VmZmVjdGl2ZV9hbHBoYWJldCcsICdjbGljaycsIGRyYXcpXG4gIHNlbGVjdG9yQWRkRXZlbnQoJ1t0eXBlPWNoZWNrYm94XScsICdjbGljaycsIGRyYXcpXG5cbiAgLy8gZHJhdyBpbml0aWFsbHkuXG4gIGlucHV0X3N0ci5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgncHJvcGVydHljaGFuZ2UnLCB7IGRldGFpbDogJ2luaXQgZXZlbnQnIH0pLFxuICApXG59XG5cbm1haW4oKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==