/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/color-convert/conversions.js":
/*!***************************************************!*\
  !*** ./node_modules/color-convert/conversions.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ ((module) => {

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

/***/ "./src/strlib.ts":
/*!***********************!*\
  !*** ./src/strlib.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enumPalindromes = exports.isPalindrome = void 0;
const isPalindrome = (str) => {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] != str[str.length - i - 1])
            return false;
    }
    return true;
};
exports.isPalindrome = isPalindrome;
const enumPalindromes = (str) => {
    // export const enumPalindromes = (str: string): RangeSimple[] => {
    const n = str.length;
    // let res: RangeSimple[] = [];
    let res = [];
    for (let len = 1; len <= n; len++) {
        for (let beg = 0; beg + len <= n; beg++) {
            if ((0, exports.isPalindrome)(str.substring(beg, beg + len)))
                res.push([beg, beg + len - 1]);
        }
    }
    return res;
};
exports.enumPalindromes = enumPalindromes;


/***/ }),

/***/ "./src/vis_str.ts":
/*!************************!*\
  !*** ./src/vis_str.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VisStr = void 0;
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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/vis_str_demo.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vis_str_1 = __webpack_require__(/*! ./vis_str */ "./src/vis_str.ts");
const strlib = __webpack_require__(/*! ./strlib */ "./src/strlib.ts");
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
// const isPalindrome = (str: string): boolean => {
//     for (let i = 0; i < str.length / 2; i++) {
//         if (str[i] != str[str.length - i - 1]) return false;
//     }
//     return true;
// };
// export const enumPalindromes = (str: string): RangeSimple[] => {
//     const n = str.length;
//     let res: RangeSimple[] = [];
//     for (let len = 1; len < n; len++) {
//         for (let beg = 0; beg + len <= n; beg++) {
//             if (isPalindrome(str.substring(beg, beg + len)))
//                 res.push([beg, beg + len - 1]);
//         }
//     }
//     return res;
// };
const isPalindrome = strlib.isPalindrome;
const enumPalindromes = strlib.enumPalindromes;
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
        [[-1, n - 1, ["occ"].concat(prevOcc.map((x) => x.toString()))]],
        [[-1, n - 1, ["len"].concat(lpf.map((x) => x.toString()))]],
    ];
    for (let i = 0; i < prevOcc.length; i++) {
        if (lpf[i] > 0) {
            res.push([
                [i, i + lpf[i] - 1],
                [prevOcc[i], prevOcc[i] + lpf[i] - 1],
            ]);
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
    return !s.includes(s.substr(beg, 2 * p), beg + 1);
};
const isLeftmostSquare = (s, beg, p) => {
    if (!isSquare(s, beg, p))
        return false;
    return !s.substr(0, beg + 2 * p - 1).includes(s.substr(beg, 2 * p));
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
                const key = beg + "," + (beg + match - 1);
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
    return str.split("").reverse().join("");
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
            ranges = [
                [occs[i], occs[i] + lens[i] - 1],
                [i, i + lens[i] - 1],
            ];
            i += lens[i];
        }
        if (show_factorid >= 0) {
            const last_end = ranges[ranges.length - 1][1];
            ranges.push([last_end + 1, last_end + 1, ["f" + show_factorid]]);
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
            row.push([j - 1, j, [str[j - 1], "f" + show_factorid]]);
        }
        else {
            row.push([j - 1, j - 1, ["f" + show_factorid]]);
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
    const suffixes = [...Array(str.length).keys()].map((i) => str.substr(i));
    suffixes.sort();
    return suffixes.map((s) => str.length - s.length);
};
const rankArray = (str, sa) => {
    if (sa === undefined)
        sa = suffixArray(str);
    const rank = Array(str.length);
    sa.forEach((pos, r) => (rank[pos] = r));
    return rank;
};
// next smaller suffixes
const nssArray = (str, rank) => {
    if (rank === undefined)
        rank = rankArray(str);
    const n = rank.length;
    const nssa = new Array(n);
    for (let i = 0; i < n; i++) {
        let nss = n;
        for (let j = i + 1; j < n; j++) {
            if (rank[i] > rank[j]) {
                nss = j;
                break;
            }
        }
        nssa[i] = nss;
    }
    return nssa;
};
// next smaller suffixes
const prevArray = (str, rank) => {
    if (rank === undefined)
        rank = rankArray(str);
    const n = rank.length;
    const pssa = new Array(n);
    for (let i = 0; i < n; i++) {
        let pss = -1;
        for (let j = i - 1; j >= 0; j--) {
            if (rank[i] > rank[j]) {
                pss = j;
                break;
            }
        }
        pssa[i] = pss;
    }
    return pssa;
};
const nextSmallerSuffixes = (str) => {
    const nssa = nssArray(str);
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const group = [[i, nssa[i]]];
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
const prevSmallerSuffixes = (str) => {
    const pssa = prevArray(str);
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const group = [[pssa[i], i]];
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
const enumIf = (str, check) => {
    return flat(enumIfGroup(str, check));
};
const enumIfGroup = (str, check) => {
    return substrings(str)
        .filter((p) => check(str, p))
        .map((p) => findAll(str, p));
};
const radioValue = (selector) => {
    let res = "";
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
    let font_size = parseInt(radioValue("[name=font_size]"));
    // get line style
    let range_style = radioValue("[name=line_style]");
    const line_style_right = radioValue("[name=line_style_right]");
    range_style += line_style_right.length === 0 ? "" : "," + line_style_right;
    let visualize = radioValue("[name=visualize]");
    console.log(`font_size=${font_size}, line_style=${range_style}, visualize=${visualize}`);
    // get input string
    const elm = document.querySelector("#input_str");
    let input_str = elm.value;
    // get canvas
    const canvas = document.querySelector("#canvas");
    // canvas.width = window.innerWidth - 50
    const visStr = new vis_str_1.VisStr(canvas, (font_size = font_size));
    // compute ranges
    let rangesp = [];
    let ranges_group = [];
    let ranges = [];
    const show_effective_alphabet = document.getElementById("effective_alphabet").checked;
    const show_rank_array = document.getElementById("rank_array").checked;
    if (show_effective_alphabet) {
        ranges_group.push([
            [
                -1,
                input_str.length - 1,
                ["eStr", ...replaceEffectiveAlphabet(input_str)],
            ],
        ]);
    }
    if (show_rank_array) {
        ranges_group.push([
            [-1, input_str.length - 1, ["rank", ...rankArray(input_str)]],
        ]);
    }
    if (visualize === "runs" ||
        visualize === "palindromes" ||
        visualize === "squares" ||
        visualize === "rmostsquares" ||
        visualize === "lmostsquares") {
        if (visualize === "runs") {
            rangesp = enumRuns(input_str);
        }
        else if (visualize === "palindromes") {
            rangesp = enumPalindromes(input_str);
        }
        else if (visualize === "squares") {
            rangesp = enumSquares(input_str);
        }
        else if (visualize === "rmostsquares") {
            rangesp = enumRightmostSquares(input_str);
        }
        else if (visualize === "lmostsquares") {
            rangesp = enumLeftmostSquares(input_str);
        }
        console.log("rangesp", rangesp);
        ranges_group = ranges_group.concat(visStr.nonOverlapRangesSimple(rangesp));
        console.log("range_group", ranges_group);
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        console.log("rangesp", ranges);
    }
    else {
        if (visualize === "lpf")
            ranges_group = ranges_group.concat(enumPrevOccLPF(input_str));
        else if (visualize === "left_maximal")
            ranges_group = ranges_group.concat(enumIfGroup(input_str, isLeftMaximal));
        else if (visualize === "right_maximal")
            ranges_group = ranges_group.concat(enumIfGroup(input_str, isRightMaximal));
        else if (visualize === "max_repeat")
            ranges_group = ranges_group.concat(enumIfGroup(input_str, isMaxRepeat));
        else if (visualize === "lz77")
            ranges_group = ranges_group.concat(lz77(input_str));
        else if (visualize === "lz78")
            ranges_group = ranges_group.concat(lz78(input_str));
        else if (visualize === "lyndon_factorization")
            ranges_group = ranges_group.concat(lyndonFactorization(input_str));
        else if (visualize === "lyndon_array")
            ranges_group = ranges_group.concat(lyndonArray(input_str));
        else if (visualize === "enum_lyndon")
            ranges_group = ranges_group.concat(enumLyndon(input_str));
        else if (visualize === "prev_smaller_suffix")
            ranges_group = ranges_group.concat(prevSmallerSuffixes(input_str));
        else if (visualize === "next_smaller_suffix")
            ranges_group = ranges_group.concat(nextSmallerSuffixes(input_str));
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        ranges = flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
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
    const input_str = document.getElementById("input_str");
    input_str.addEventListener("input", draw);
    input_str.addEventListener("propertychange", draw);
    // add event for radio buttons
    selectorAddEvent("[name=font_size]", "click", draw);
    selectorAddEvent("[name=line_style]", "click", draw);
    selectorAddEvent("[name=line_style_right]", "click", draw);
    selectorAddEvent("[name=visualize]", "click", draw);
    // selectorAddEvent('#effective_alphabet', 'click', draw)
    selectorAddEvent("[type=checkbox]", "click", draw);
    // draw initially.
    input_str.dispatchEvent(new CustomEvent("propertychange", { detail: "init event" }));
};
main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzX3N0cl9kZW1vLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxzREFBWTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsUUFBUSw0QkFBNEI7QUFDcEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyw2QkFBNkI7QUFDcEMsV0FBVyxpQ0FBaUM7QUFDNUMsVUFBVSxnQ0FBZ0M7QUFDMUMsV0FBVyxpQ0FBaUM7QUFDNUMsT0FBTyxxQ0FBcUM7QUFDNUMsU0FBUywyQ0FBMkM7QUFDcEQsUUFBUTtBQUNSOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLGtCQUFrQjtBQUMxQjtBQUNBO0FBQ0Esb0RBQW9ELGdCQUFnQjtBQUNwRSxrREFBa0QsY0FBYztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUSxRQUFRO0FBQ2xDLGtCQUFrQixRQUFRLFFBQVE7QUFDbEMsa0JBQWtCLFFBQVEsT0FBTztBQUNqQyxrQkFBa0IsUUFBUSxPQUFPO0FBQ2pDLGtCQUFrQixRQUFRLE9BQU87QUFDakMsa0JBQWtCLFFBQVEsT0FBTztBQUNqQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEU7O0FBRTFFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQsRUFBRSxVQUFVLEVBQUU7QUFDL0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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RyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQztJQUN0RSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVuRCw4QkFBOEI7SUFDOUIsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELHlEQUF5RDtJQUN6RCxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFbkQsa0JBQWtCO0lBQ2xCLFNBQVMsQ0FBQyxhQUFhLENBQ25CLElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQzlELENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2NvbnZlcnNpb25zLmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2luZGV4LmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L3JvdXRlLmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovL3Zpc3N0ci8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3Zpc19zdHIudHMiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Zpc3N0ci8uL3NyYy92aXNfc3RyX2RlbW8udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogTUlUIGxpY2Vuc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuY29uc3QgY3NzS2V5d29yZHMgPSByZXF1aXJlKCdjb2xvci1uYW1lJyk7XG5cbi8vIE5PVEU6IGNvbnZlcnNpb25zIHNob3VsZCBvbmx5IHJldHVybiBwcmltaXRpdmUgdmFsdWVzIChpLmUuIGFycmF5cywgb3Jcbi8vICAgICAgIHZhbHVlcyB0aGF0IGdpdmUgY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzKS5cbi8vICAgICAgIGRvIG5vdCB1c2UgYm94IHZhbHVlcyB0eXBlcyAoaS5lLiBOdW1iZXIoKSwgU3RyaW5nKCksIGV0Yy4pXG5cbmNvbnN0IHJldmVyc2VLZXl3b3JkcyA9IHt9O1xuZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3NzS2V5d29yZHMpKSB7XG5cdHJldmVyc2VLZXl3b3Jkc1tjc3NLZXl3b3Jkc1trZXldXSA9IGtleTtcbn1cblxuY29uc3QgY29udmVydCA9IHtcblx0cmdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3JnYid9LFxuXHRoc2w6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHNsJ30sXG5cdGhzdjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc3YnfSxcblx0aHdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2h3Yid9LFxuXHRjbXlrOiB7Y2hhbm5lbHM6IDQsIGxhYmVsczogJ2NteWsnfSxcblx0eHl6OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3h5eid9LFxuXHRsYWI6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGFiJ30sXG5cdGxjaDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsY2gnfSxcblx0aGV4OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydoZXgnXX0sXG5cdGtleXdvcmQ6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2tleXdvcmQnXX0sXG5cdGFuc2kxNjoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTE2J119LFxuXHRhbnNpMjU2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMjU2J119LFxuXHRoY2c6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ2gnLCAnYycsICdnJ119LFxuXHRhcHBsZToge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsncjE2JywgJ2cxNicsICdiMTYnXX0sXG5cdGdyYXk6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2dyYXknXX1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydDtcblxuLy8gSGlkZSAuY2hhbm5lbHMgYW5kIC5sYWJlbHMgcHJvcGVydGllc1xuZm9yIChjb25zdCBtb2RlbCBvZiBPYmplY3Qua2V5cyhjb252ZXJ0KSkge1xuXHRpZiAoISgnY2hhbm5lbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0fVxuXG5cdGlmICghKCdsYWJlbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVsIGxhYmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0fVxuXG5cdGlmIChjb252ZXJ0W21vZGVsXS5sYWJlbHMubGVuZ3RoICE9PSBjb252ZXJ0W21vZGVsXS5jaGFubmVscykge1xuXHRcdHRocm93IG5ldyBFcnJvcignY2hhbm5lbCBhbmQgbGFiZWwgY291bnRzIG1pc21hdGNoOiAnICsgbW9kZWwpO1xuXHR9XG5cblx0Y29uc3Qge2NoYW5uZWxzLCBsYWJlbHN9ID0gY29udmVydFttb2RlbF07XG5cdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmxhYmVscztcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNoYW5uZWxzfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogbGFiZWxzfSk7XG59XG5cbmNvbnZlcnQucmdiLmhzbCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgbWluID0gTWF0aC5taW4ociwgZywgYik7XG5cdGNvbnN0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHRjb25zdCBkZWx0YSA9IG1heCAtIG1pbjtcblx0bGV0IGg7XG5cdGxldCBzO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdGggPSAwO1xuXHR9IGVsc2UgaWYgKHIgPT09IG1heCkge1xuXHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG5cdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG5cdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgbCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5oc3YgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGxldCByZGlmO1xuXHRsZXQgZ2RpZjtcblx0bGV0IGJkaWY7XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCB2ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRpZmYgPSB2IC0gTWF0aC5taW4ociwgZywgYik7XG5cdGNvbnN0IGRpZmZjID0gZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gKHYgLSBjKSAvIDYgLyBkaWZmICsgMSAvIDI7XG5cdH07XG5cblx0aWYgKGRpZmYgPT09IDApIHtcblx0XHRoID0gMDtcblx0XHRzID0gMDtcblx0fSBlbHNlIHtcblx0XHRzID0gZGlmZiAvIHY7XG5cdFx0cmRpZiA9IGRpZmZjKHIpO1xuXHRcdGdkaWYgPSBkaWZmYyhnKTtcblx0XHRiZGlmID0gZGlmZmMoYik7XG5cblx0XHRpZiAociA9PT0gdikge1xuXHRcdFx0aCA9IGJkaWYgLSBnZGlmO1xuXHRcdH0gZWxzZSBpZiAoZyA9PT0gdikge1xuXHRcdFx0aCA9ICgxIC8gMykgKyByZGlmIC0gYmRpZjtcblx0XHR9IGVsc2UgaWYgKGIgPT09IHYpIHtcblx0XHRcdGggPSAoMiAvIDMpICsgZ2RpZiAtIHJkaWY7XG5cdFx0fVxuXG5cdFx0aWYgKGggPCAwKSB7XG5cdFx0XHRoICs9IDE7XG5cdFx0fSBlbHNlIGlmIChoID4gMSkge1xuXHRcdFx0aCAtPSAxO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBbXG5cdFx0aCAqIDM2MCxcblx0XHRzICogMTAwLFxuXHRcdHYgKiAxMDBcblx0XTtcbn07XG5cbmNvbnZlcnQucmdiLmh3YiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXTtcblx0Y29uc3QgZyA9IHJnYlsxXTtcblx0bGV0IGIgPSByZ2JbMl07XG5cdGNvbnN0IGggPSBjb252ZXJ0LnJnYi5oc2wocmdiKVswXTtcblx0Y29uc3QgdyA9IDEgLyAyNTUgKiBNYXRoLm1pbihyLCBNYXRoLm1pbihnLCBiKSk7XG5cblx0YiA9IDEgLSAxIC8gMjU1ICogTWF0aC5tYXgociwgTWF0aC5tYXgoZywgYikpO1xuXG5cdHJldHVybiBbaCwgdyAqIDEwMCwgYiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5jbXlrID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdGNvbnN0IGsgPSBNYXRoLm1pbigxIC0gciwgMSAtIGcsIDEgLSBiKTtcblx0Y29uc3QgYyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCBtID0gKDEgLSBnIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdGNvbnN0IHkgPSAoMSAtIGIgLSBrKSAvICgxIC0gaykgfHwgMDtcblxuXHRyZXR1cm4gW2MgKiAxMDAsIG0gKiAxMDAsIHkgKiAxMDAsIGsgKiAxMDBdO1xufTtcblxuZnVuY3Rpb24gY29tcGFyYXRpdmVEaXN0YW5jZSh4LCB5KSB7XG5cdC8qXG5cdFx0U2VlIGh0dHBzOi8vZW4ubS53aWtpcGVkaWEub3JnL3dpa2kvRXVjbGlkZWFuX2Rpc3RhbmNlI1NxdWFyZWRfRXVjbGlkZWFuX2Rpc3RhbmNlXG5cdCovXG5cdHJldHVybiAoXG5cdFx0KCh4WzBdIC0geVswXSkgKiogMikgK1xuXHRcdCgoeFsxXSAtIHlbMV0pICoqIDIpICtcblx0XHQoKHhbMl0gLSB5WzJdKSAqKiAyKVxuXHQpO1xufVxuXG5jb252ZXJ0LnJnYi5rZXl3b3JkID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByZXZlcnNlZCA9IHJldmVyc2VLZXl3b3Jkc1tyZ2JdO1xuXHRpZiAocmV2ZXJzZWQpIHtcblx0XHRyZXR1cm4gcmV2ZXJzZWQ7XG5cdH1cblxuXHRsZXQgY3VycmVudENsb3Nlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXHRsZXQgY3VycmVudENsb3Nlc3RLZXl3b3JkO1xuXG5cdGZvciAoY29uc3Qga2V5d29yZCBvZiBPYmplY3Qua2V5cyhjc3NLZXl3b3JkcykpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGNzc0tleXdvcmRzW2tleXdvcmRdO1xuXG5cdFx0Ly8gQ29tcHV0ZSBjb21wYXJhdGl2ZSBkaXN0YW5jZVxuXHRcdGNvbnN0IGRpc3RhbmNlID0gY29tcGFyYXRpdmVEaXN0YW5jZShyZ2IsIHZhbHVlKTtcblxuXHRcdC8vIENoZWNrIGlmIGl0cyBsZXNzLCBpZiBzbyBzZXQgYXMgY2xvc2VzdFxuXHRcdGlmIChkaXN0YW5jZSA8IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdGN1cnJlbnRDbG9zZXN0S2V5d29yZCA9IGtleXdvcmQ7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcbn07XG5cbmNvbnZlcnQua2V5d29yZC5yZ2IgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuXHRyZXR1cm4gY3NzS2V5d29yZHNba2V5d29yZF07XG59O1xuXG5jb252ZXJ0LnJnYi54eXogPSBmdW5jdGlvbiAocmdiKSB7XG5cdGxldCByID0gcmdiWzBdIC8gMjU1O1xuXHRsZXQgZyA9IHJnYlsxXSAvIDI1NTtcblx0bGV0IGIgPSByZ2JbMl0gLyAyNTU7XG5cblx0Ly8gQXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjA0MDQ1ID8gKCgociArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQpIDogKHIgLyAxMi45Mik7XG5cdGcgPSBnID4gMC4wNDA0NSA/ICgoKGcgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChnIC8gMTIuOTIpO1xuXHRiID0gYiA+IDAuMDQwNDUgPyAoKChiICsgMC4wNTUpIC8gMS4wNTUpICoqIDIuNCkgOiAoYiAvIDEyLjkyKTtcblxuXHRjb25zdCB4ID0gKHIgKiAwLjQxMjQpICsgKGcgKiAwLjM1NzYpICsgKGIgKiAwLjE4MDUpO1xuXHRjb25zdCB5ID0gKHIgKiAwLjIxMjYpICsgKGcgKiAwLjcxNTIpICsgKGIgKiAwLjA3MjIpO1xuXHRjb25zdCB6ID0gKHIgKiAwLjAxOTMpICsgKGcgKiAwLjExOTIpICsgKGIgKiAwLjk1MDUpO1xuXG5cdHJldHVybiBbeCAqIDEwMCwgeSAqIDEwMCwgeiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5sYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiLnh5eihyZ2IpO1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyAoeCAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/ICh5ICoqICgxIC8gMykpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQuaHNsLnJnYiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgaCA9IGhzbFswXSAvIDM2MDtcblx0Y29uc3QgcyA9IGhzbFsxXSAvIDEwMDtcblx0Y29uc3QgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHQyO1xuXHRsZXQgdDM7XG5cdGxldCB2YWw7XG5cblx0aWYgKHMgPT09IDApIHtcblx0XHR2YWwgPSBsICogMjU1O1xuXHRcdHJldHVybiBbdmFsLCB2YWwsIHZhbF07XG5cdH1cblxuXHRpZiAobCA8IDAuNSkge1xuXHRcdHQyID0gbCAqICgxICsgcyk7XG5cdH0gZWxzZSB7XG5cdFx0dDIgPSBsICsgcyAtIGwgKiBzO1xuXHR9XG5cblx0Y29uc3QgdDEgPSAyICogbCAtIHQyO1xuXG5cdGNvbnN0IHJnYiA9IFswLCAwLCAwXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdGlmICh0MyA8IDApIHtcblx0XHRcdHQzKys7XG5cdFx0fVxuXG5cdFx0aWYgKHQzID4gMSkge1xuXHRcdFx0dDMtLTtcblx0XHR9XG5cblx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG5cdFx0fSBlbHNlIGlmICgyICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0Mjtcblx0XHR9IGVsc2UgaWYgKDMgKiB0MyA8IDIpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsID0gdDE7XG5cdFx0fVxuXG5cdFx0cmdiW2ldID0gdmFsICogMjU1O1xuXHR9XG5cblx0cmV0dXJuIHJnYjtcbn07XG5cbmNvbnZlcnQuaHNsLmhzdiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgaCA9IGhzbFswXTtcblx0bGV0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGxldCBsID0gaHNsWzJdIC8gMTAwO1xuXHRsZXQgc21pbiA9IHM7XG5cdGNvbnN0IGxtaW4gPSBNYXRoLm1heChsLCAwLjAxKTtcblxuXHRsICo9IDI7XG5cdHMgKj0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdHNtaW4gKj0gbG1pbiA8PSAxID8gbG1pbiA6IDIgLSBsbWluO1xuXHRjb25zdCB2ID0gKGwgKyBzKSAvIDI7XG5cdGNvbnN0IHN2ID0gbCA9PT0gMCA/ICgyICogc21pbikgLyAobG1pbiArIHNtaW4pIDogKDIgKiBzKSAvIChsICsgcyk7XG5cblx0cmV0dXJuIFtoLCBzdiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5yZ2IgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IGggPSBoc3ZbMF0gLyA2MDtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0bGV0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cdGNvbnN0IGhpID0gTWF0aC5mbG9vcihoKSAlIDY7XG5cblx0Y29uc3QgZiA9IGggLSBNYXRoLmZsb29yKGgpO1xuXHRjb25zdCBwID0gMjU1ICogdiAqICgxIC0gcyk7XG5cdGNvbnN0IHEgPSAyNTUgKiB2ICogKDEgLSAocyAqIGYpKTtcblx0Y29uc3QgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuXHR2ICo9IDI1NTtcblxuXHRzd2l0Y2ggKGhpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cmV0dXJuIFt2LCB0LCBwXTtcblx0XHRjYXNlIDE6XG5cdFx0XHRyZXR1cm4gW3EsIHYsIHBdO1xuXHRcdGNhc2UgMjpcblx0XHRcdHJldHVybiBbcCwgdiwgdF07XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cmV0dXJuIFtwLCBxLCB2XTtcblx0XHRjYXNlIDQ6XG5cdFx0XHRyZXR1cm4gW3QsIHAsIHZdO1xuXHRcdGNhc2UgNTpcblx0XHRcdHJldHVybiBbdiwgcCwgcV07XG5cdH1cbn07XG5cbmNvbnZlcnQuaHN2LmhzbCA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgaCA9IGhzdlswXTtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0Y29uc3QgdiA9IGhzdlsyXSAvIDEwMDtcblx0Y29uc3Qgdm1pbiA9IE1hdGgubWF4KHYsIDAuMDEpO1xuXHRsZXQgc2w7XG5cdGxldCBsO1xuXG5cdGwgPSAoMiAtIHMpICogdjtcblx0Y29uc3QgbG1pbiA9ICgyIC0gcykgKiB2bWluO1xuXHRzbCA9IHMgKiB2bWluO1xuXHRzbCAvPSAobG1pbiA8PSAxKSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0c2wgPSBzbCB8fCAwO1xuXHRsIC89IDI7XG5cblx0cmV0dXJuIFtoLCBzbCAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG4vLyBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3MtY29sb3IvI2h3Yi10by1yZ2JcbmNvbnZlcnQuaHdiLnJnYiA9IGZ1bmN0aW9uIChod2IpIHtcblx0Y29uc3QgaCA9IGh3YlswXSAvIDM2MDtcblx0bGV0IHdoID0gaHdiWzFdIC8gMTAwO1xuXHRsZXQgYmwgPSBod2JbMl0gLyAxMDA7XG5cdGNvbnN0IHJhdGlvID0gd2ggKyBibDtcblx0bGV0IGY7XG5cblx0Ly8gV2ggKyBibCBjYW50IGJlID4gMVxuXHRpZiAocmF0aW8gPiAxKSB7XG5cdFx0d2ggLz0gcmF0aW87XG5cdFx0YmwgLz0gcmF0aW87XG5cdH1cblxuXHRjb25zdCBpID0gTWF0aC5mbG9vcig2ICogaCk7XG5cdGNvbnN0IHYgPSAxIC0gYmw7XG5cdGYgPSA2ICogaCAtIGk7XG5cblx0aWYgKChpICYgMHgwMSkgIT09IDApIHtcblx0XHRmID0gMSAtIGY7XG5cdH1cblxuXHRjb25zdCBuID0gd2ggKyBmICogKHYgLSB3aCk7IC8vIExpbmVhciBpbnRlcnBvbGF0aW9uXG5cblx0bGV0IHI7XG5cdGxldCBnO1xuXHRsZXQgYjtcblx0LyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUsbm8tbXVsdGktc3BhY2VzICovXG5cdHN3aXRjaCAoaSkge1xuXHRcdGRlZmF1bHQ6XG5cdFx0Y2FzZSA2OlxuXHRcdGNhc2UgMDogciA9IHY7ICBnID0gbjsgIGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAxOiByID0gbjsgIGcgPSB2OyAgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDI6IHIgPSB3aDsgZyA9IHY7ICBiID0gbjsgYnJlYWs7XG5cdFx0Y2FzZSAzOiByID0gd2g7IGcgPSBuOyAgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNDogciA9IG47ICBnID0gd2g7IGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDU6IHIgPSB2OyAgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSxuby1tdWx0aS1zcGFjZXMgKi9cblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC5jbXlrLnJnYiA9IGZ1bmN0aW9uIChjbXlrKSB7XG5cdGNvbnN0IGMgPSBjbXlrWzBdIC8gMTAwO1xuXHRjb25zdCBtID0gY215a1sxXSAvIDEwMDtcblx0Y29uc3QgeSA9IGNteWtbMl0gLyAxMDA7XG5cdGNvbnN0IGsgPSBjbXlrWzNdIC8gMTAwO1xuXG5cdGNvbnN0IHIgPSAxIC0gTWF0aC5taW4oMSwgYyAqICgxIC0gaykgKyBrKTtcblx0Y29uc3QgZyA9IDEgLSBNYXRoLm1pbigxLCBtICogKDEgLSBrKSArIGspO1xuXHRjb25zdCBiID0gMSAtIE1hdGgubWluKDEsIHkgKiAoMSAtIGspICsgayk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LnJnYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0Y29uc3QgeCA9IHh5elswXSAvIDEwMDtcblx0Y29uc3QgeSA9IHh5elsxXSAvIDEwMDtcblx0Y29uc3QgeiA9IHh5elsyXSAvIDEwMDtcblx0bGV0IHI7XG5cdGxldCBnO1xuXHRsZXQgYjtcblxuXHRyID0gKHggKiAzLjI0MDYpICsgKHkgKiAtMS41MzcyKSArICh6ICogLTAuNDk4Nik7XG5cdGcgPSAoeCAqIC0wLjk2ODkpICsgKHkgKiAxLjg3NTgpICsgKHogKiAwLjA0MTUpO1xuXHRiID0gKHggKiAwLjA1NTcpICsgKHkgKiAtMC4yMDQwKSArICh6ICogMS4wNTcwKTtcblxuXHQvLyBBc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIChyICoqICgxLjAgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IHIgKiAxMi45MjtcblxuXHRnID0gZyA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIChnICoqICgxLjAgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IGcgKiAxMi45MjtcblxuXHRiID0gYiA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIChiICoqICgxLjAgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IGIgKiAxMi45MjtcblxuXHRyID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgciksIDEpO1xuXHRnID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgZyksIDEpO1xuXHRiID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgYiksIDEpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5sYWIgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGxldCB4ID0geHl6WzBdO1xuXHRsZXQgeSA9IHh5elsxXTtcblx0bGV0IHogPSB4eXpbMl07XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/ICh4ICoqICgxIC8gMykpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gKHkgKiogKDEgLyAzKSkgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyAoeiAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRjb25zdCBsID0gKDExNiAqIHkpIC0gMTY7XG5cdGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRjb25zdCBiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5sYWIueHl6ID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgeDtcblx0bGV0IHk7XG5cdGxldCB6O1xuXG5cdHkgPSAobCArIDE2KSAvIDExNjtcblx0eCA9IGEgLyA1MDAgKyB5O1xuXHR6ID0geSAtIGIgLyAyMDA7XG5cblx0Y29uc3QgeTIgPSB5ICoqIDM7XG5cdGNvbnN0IHgyID0geCAqKiAzO1xuXHRjb25zdCB6MiA9IHogKiogMztcblx0eSA9IHkyID4gMC4wMDg4NTYgPyB5MiA6ICh5IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHggPSB4MiA+IDAuMDA4ODU2ID8geDIgOiAoeCAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR6ID0gejIgPiAwLjAwODg1NiA/IHoyIDogKHogLSAxNiAvIDExNikgLyA3Ljc4NztcblxuXHR4ICo9IDk1LjA0Nztcblx0eSAqPSAxMDA7XG5cdHogKj0gMTA4Ljg4MztcblxuXHRyZXR1cm4gW3gsIHksIHpdO1xufTtcblxuY29udmVydC5sYWIubGNoID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgaDtcblxuXHRjb25zdCBociA9IE1hdGguYXRhbjIoYiwgYSk7XG5cdGggPSBociAqIDM2MCAvIDIgLyBNYXRoLlBJO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgYyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcblxuXHRyZXR1cm4gW2wsIGMsIGhdO1xufTtcblxuY29udmVydC5sY2gubGFiID0gZnVuY3Rpb24gKGxjaCkge1xuXHRjb25zdCBsID0gbGNoWzBdO1xuXHRjb25zdCBjID0gbGNoWzFdO1xuXHRjb25zdCBoID0gbGNoWzJdO1xuXG5cdGNvbnN0IGhyID0gaCAvIDM2MCAqIDIgKiBNYXRoLlBJO1xuXHRjb25zdCBhID0gYyAqIE1hdGguY29zKGhyKTtcblx0Y29uc3QgYiA9IGMgKiBNYXRoLnNpbihocik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzLCBzYXR1cmF0aW9uID0gbnVsbCkge1xuXHRjb25zdCBbciwgZywgYl0gPSBhcmdzO1xuXHRsZXQgdmFsdWUgPSBzYXR1cmF0aW9uID09PSBudWxsID8gY29udmVydC5yZ2IuaHN2KGFyZ3MpWzJdIDogc2F0dXJhdGlvbjsgLy8gSHN2IC0+IGFuc2kxNiBvcHRpbWl6YXRpb25cblxuXHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgLyA1MCk7XG5cblx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0cmV0dXJuIDMwO1xuXHR9XG5cblx0bGV0IGFuc2kgPSAzMFxuXHRcdCsgKChNYXRoLnJvdW5kKGIgLyAyNTUpIDw8IDIpXG5cdFx0fCAoTWF0aC5yb3VuZChnIC8gMjU1KSA8PCAxKVxuXHRcdHwgTWF0aC5yb3VuZChyIC8gMjU1KSk7XG5cblx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0YW5zaSArPSA2MDtcblx0fVxuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5oc3YuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gT3B0aW1pemF0aW9uIGhlcmU7IHdlIGFscmVhZHkga25vdyB0aGUgdmFsdWUgYW5kIGRvbid0IG5lZWQgdG8gZ2V0XG5cdC8vIGl0IGNvbnZlcnRlZCBmb3IgdXMuXG5cdHJldHVybiBjb252ZXJ0LnJnYi5hbnNpMTYoY29udmVydC5oc3YucmdiKGFyZ3MpLCBhcmdzWzJdKTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kyNTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCByID0gYXJnc1swXTtcblx0Y29uc3QgZyA9IGFyZ3NbMV07XG5cdGNvbnN0IGIgPSBhcmdzWzJdO1xuXG5cdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRpZiAociA9PT0gZyAmJiBnID09PSBiKSB7XG5cdFx0aWYgKHIgPCA4KSB7XG5cdFx0XHRyZXR1cm4gMTY7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPiAyNDgpIHtcblx0XHRcdHJldHVybiAyMzE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKChyIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHR9XG5cblx0Y29uc3QgYW5zaSA9IDE2XG5cdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHIgLyAyNTUgKiA1KSlcblx0XHQrICg2ICogTWF0aC5yb3VuZChnIC8gMjU1ICogNSkpXG5cdFx0KyBNYXRoLnJvdW5kKGIgLyAyNTUgKiA1KTtcblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuYW5zaTE2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGxldCBjb2xvciA9IGFyZ3MgJSAxMDtcblxuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChjb2xvciA9PT0gMCB8fCBjb2xvciA9PT0gNykge1xuXHRcdGlmIChhcmdzID4gNTApIHtcblx0XHRcdGNvbG9yICs9IDMuNTtcblx0XHR9XG5cblx0XHRjb2xvciA9IGNvbG9yIC8gMTAuNSAqIDI1NTtcblxuXHRcdHJldHVybiBbY29sb3IsIGNvbG9yLCBjb2xvcl07XG5cdH1cblxuXHRjb25zdCBtdWx0ID0gKH5+KGFyZ3MgPiA1MCkgKyAxKSAqIDAuNTtcblx0Y29uc3QgciA9ICgoY29sb3IgJiAxKSAqIG11bHQpICogMjU1O1xuXHRjb25zdCBnID0gKCgoY29sb3IgPj4gMSkgJiAxKSAqIG11bHQpICogMjU1O1xuXHRjb25zdCBiID0gKCgoY29sb3IgPj4gMikgJiAxKSAqIG11bHQpICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LmFuc2kyNTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gSGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoYXJncyA+PSAyMzIpIHtcblx0XHRjb25zdCBjID0gKGFyZ3MgLSAyMzIpICogMTAgKyA4O1xuXHRcdHJldHVybiBbYywgYywgY107XG5cdH1cblxuXHRhcmdzIC09IDE2O1xuXG5cdGxldCByZW07XG5cdGNvbnN0IHIgPSBNYXRoLmZsb29yKGFyZ3MgLyAzNikgLyA1ICogMjU1O1xuXHRjb25zdCBnID0gTWF0aC5mbG9vcigocmVtID0gYXJncyAlIDM2KSAvIDYpIC8gNSAqIDI1NTtcblx0Y29uc3QgYiA9IChyZW0gJSA2KSAvIDUgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhleCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGNvbnN0IGludGVnZXIgPSAoKE1hdGgucm91bmQoYXJnc1swXSkgJiAweEZGKSA8PCAxNilcblx0XHQrICgoTWF0aC5yb3VuZChhcmdzWzFdKSAmIDB4RkYpIDw8IDgpXG5cdFx0KyAoTWF0aC5yb3VuZChhcmdzWzJdKSAmIDB4RkYpO1xuXG5cdGNvbnN0IHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LmhleC5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCBtYXRjaCA9IGFyZ3MudG9TdHJpbmcoMTYpLm1hdGNoKC9bYS1mMC05XXs2fXxbYS1mMC05XXszfS9pKTtcblx0aWYgKCFtYXRjaCkge1xuXHRcdHJldHVybiBbMCwgMCwgMF07XG5cdH1cblxuXHRsZXQgY29sb3JTdHJpbmcgPSBtYXRjaFswXTtcblxuXHRpZiAobWF0Y2hbMF0ubGVuZ3RoID09PSAzKSB7XG5cdFx0Y29sb3JTdHJpbmcgPSBjb2xvclN0cmluZy5zcGxpdCgnJykubWFwKGNoYXIgPT4ge1xuXHRcdFx0cmV0dXJuIGNoYXIgKyBjaGFyO1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0Y29uc3QgaW50ZWdlciA9IHBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cdGNvbnN0IHIgPSAoaW50ZWdlciA+PiAxNikgJiAweEZGO1xuXHRjb25zdCBnID0gKGludGVnZXIgPj4gOCkgJiAweEZGO1xuXHRjb25zdCBiID0gaW50ZWdlciAmIDB4RkY7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhjZyA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgoTWF0aC5tYXgociwgZyksIGIpO1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihNYXRoLm1pbihyLCBnKSwgYik7XG5cdGNvbnN0IGNocm9tYSA9IChtYXggLSBtaW4pO1xuXHRsZXQgZ3JheXNjYWxlO1xuXHRsZXQgaHVlO1xuXG5cdGlmIChjaHJvbWEgPCAxKSB7XG5cdFx0Z3JheXNjYWxlID0gbWluIC8gKDEgLSBjaHJvbWEpO1xuXHR9IGVsc2Uge1xuXHRcdGdyYXlzY2FsZSA9IDA7XG5cdH1cblxuXHRpZiAoY2hyb21hIDw9IDApIHtcblx0XHRodWUgPSAwO1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gcikge1xuXHRcdGh1ZSA9ICgoZyAtIGIpIC8gY2hyb21hKSAlIDY7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSBnKSB7XG5cdFx0aHVlID0gMiArIChiIC0gcikgLyBjaHJvbWE7XG5cdH0gZWxzZSB7XG5cdFx0aHVlID0gNCArIChyIC0gZykgLyBjaHJvbWE7XG5cdH1cblxuXHRodWUgLz0gNjtcblx0aHVlICU9IDE7XG5cblx0cmV0dXJuIFtodWUgKiAzNjAsIGNocm9tYSAqIDEwMCwgZ3JheXNjYWxlICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHNsLmhjZyA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgcyA9IGhzbFsxXSAvIDEwMDtcblx0Y29uc3QgbCA9IGhzbFsyXSAvIDEwMDtcblxuXHRjb25zdCBjID0gbCA8IDAuNSA/ICgyLjAgKiBzICogbCkgOiAoMi4wICogcyAqICgxLjAgLSBsKSk7XG5cblx0bGV0IGYgPSAwO1xuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAobCAtIDAuNSAqIGMpIC8gKDEuMCAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc2xbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YuaGNnID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRjb25zdCB2ID0gaHN2WzJdIC8gMTAwO1xuXG5cdGNvbnN0IGMgPSBzICogdjtcblx0bGV0IGYgPSAwO1xuXG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc3ZbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cucmdiID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBoID0gaGNnWzBdIC8gMzYwO1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGlmIChjID09PSAwLjApIHtcblx0XHRyZXR1cm4gW2cgKiAyNTUsIGcgKiAyNTUsIGcgKiAyNTVdO1xuXHR9XG5cblx0Y29uc3QgcHVyZSA9IFswLCAwLCAwXTtcblx0Y29uc3QgaGkgPSAoaCAlIDEpICogNjtcblx0Y29uc3QgdiA9IGhpICUgMTtcblx0Y29uc3QgdyA9IDEgLSB2O1xuXHRsZXQgbWcgPSAwO1xuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihoaSkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IHY7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHRwdXJlWzBdID0gdzsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSB2OyBicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IHc7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRjYXNlIDQ6XG5cdFx0XHRwdXJlWzBdID0gdjsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gdztcblx0fVxuXHQvKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cblx0bWcgPSAoMS4wIC0gYykgKiBnO1xuXG5cdHJldHVybiBbXG5cdFx0KGMgKiBwdXJlWzBdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsxXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMl0gKyBtZykgKiAyNTVcblx0XTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzdiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRjb25zdCB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdGxldCBmID0gMDtcblxuXHRpZiAodiA+IDAuMCkge1xuXHRcdGYgPSBjIC8gdjtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBmICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzbCA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRjb25zdCBsID0gZyAqICgxLjAgLSBjKSArIDAuNSAqIGM7XG5cdGxldCBzID0gMDtcblxuXHRpZiAobCA+IDAuMCAmJiBsIDwgMC41KSB7XG5cdFx0cyA9IGMgLyAoMiAqIGwpO1xuXHR9IGVsc2Vcblx0aWYgKGwgPj0gMC41ICYmIGwgPCAxLjApIHtcblx0XHRzID0gYyAvICgyICogKDEgLSBsKSk7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5od2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cdGNvbnN0IHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0cmV0dXJuIFtoY2dbMF0sICh2IC0gYykgKiAxMDAsICgxIC0gdikgKiAxMDBdO1xufTtcblxuY29udmVydC5od2IuaGNnID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCB3ID0gaHdiWzFdIC8gMTAwO1xuXHRjb25zdCBiID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gMSAtIGI7XG5cdGNvbnN0IGMgPSB2IC0gdztcblx0bGV0IGcgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGcgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHdiWzBdLCBjICogMTAwLCBnICogMTAwXTtcbn07XG5cbmNvbnZlcnQuYXBwbGUucmdiID0gZnVuY3Rpb24gKGFwcGxlKSB7XG5cdHJldHVybiBbKGFwcGxlWzBdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMV0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsyXSAvIDY1NTM1KSAqIDI1NV07XG59O1xuXG5jb252ZXJ0LnJnYi5hcHBsZSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIFsocmdiWzBdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzFdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzJdIC8gMjU1KSAqIDY1NTM1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gW2FyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTVdO1xufTtcblxuY29udmVydC5ncmF5LmhzbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbMCwgMCwgYXJnc1swXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHN2ID0gY29udmVydC5ncmF5LmhzbDtcblxuY29udmVydC5ncmF5Lmh3YiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMTAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5jbXlrID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAwLCAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5sYWIgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gW2dyYXlbMF0sIDAsIDBdO1xufTtcblxuY29udmVydC5ncmF5LmhleCA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdGNvbnN0IHZhbCA9IE1hdGgucm91bmQoZ3JheVswXSAvIDEwMCAqIDI1NSkgJiAweEZGO1xuXHRjb25zdCBpbnRlZ2VyID0gKHZhbCA8PCAxNikgKyAodmFsIDw8IDgpICsgdmFsO1xuXG5cdGNvbnN0IHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LnJnYi5ncmF5ID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB2YWwgPSAocmdiWzBdICsgcmdiWzFdICsgcmdiWzJdKSAvIDM7XG5cdHJldHVybiBbdmFsIC8gMjU1ICogMTAwXTtcbn07XG4iLCJjb25zdCBjb252ZXJzaW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbnMnKTtcbmNvbnN0IHJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZScpO1xuXG5jb25zdCBjb252ZXJ0ID0ge307XG5cbmNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuZnVuY3Rpb24gd3JhcFJhdyhmbikge1xuXHRjb25zdCB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGNvbnN0IGFyZzAgPSBhcmdzWzBdO1xuXHRcdGlmIChhcmcwID09PSB1bmRlZmluZWQgfHwgYXJnMCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZzA7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZzAubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IGFyZzA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKGFyZ3MpO1xuXHR9O1xuXG5cdC8vIFByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZnVuY3Rpb24gd3JhcFJvdW5kZWQoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblxuXHRcdGlmIChhcmcwID09PSB1bmRlZmluZWQgfHwgYXJnMCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZzA7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZzAubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IGFyZzA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0ID0gZm4oYXJncyk7XG5cblx0XHQvLyBXZSdyZSBhc3N1bWluZyB0aGUgcmVzdWx0IGlzIGFuIGFycmF5IGhlcmUuXG5cdFx0Ly8gc2VlIG5vdGljZSBpbiBjb252ZXJzaW9ucy5qczsgZG9uJ3QgdXNlIGJveCB0eXBlc1xuXHRcdC8vIGluIGNvbnZlcnNpb24gZnVuY3Rpb25zLlxuXHRcdGlmICh0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Zm9yIChsZXQgbGVuID0gcmVzdWx0Lmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRyZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHQvLyBQcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbm1vZGVscy5mb3JFYWNoKGZyb21Nb2RlbCA9PiB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdGNvbnN0IHJvdXRlcyA9IHJvdXRlKGZyb21Nb2RlbCk7XG5cdGNvbnN0IHJvdXRlTW9kZWxzID0gT2JqZWN0LmtleXMocm91dGVzKTtcblxuXHRyb3V0ZU1vZGVscy5mb3JFYWNoKHRvTW9kZWwgPT4ge1xuXHRcdGNvbnN0IGZuID0gcm91dGVzW3RvTW9kZWxdO1xuXG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdID0gd3JhcFJvdW5kZWQoZm4pO1xuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXS5yYXcgPSB3cmFwUmF3KGZuKTtcblx0fSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0O1xuIiwiY29uc3QgY29udmVyc2lvbnMgPSByZXF1aXJlKCcuL2NvbnZlcnNpb25zJyk7XG5cbi8qXG5cdFRoaXMgZnVuY3Rpb24gcm91dGVzIGEgbW9kZWwgdG8gYWxsIG90aGVyIG1vZGVscy5cblxuXHRhbGwgZnVuY3Rpb25zIHRoYXQgYXJlIHJvdXRlZCBoYXZlIGEgcHJvcGVydHkgYC5jb252ZXJzaW9uYCBhdHRhY2hlZFxuXHR0byB0aGUgcmV0dXJuZWQgc3ludGhldGljIGZ1bmN0aW9uLiBUaGlzIHByb3BlcnR5IGlzIGFuIGFycmF5XG5cdG9mIHN0cmluZ3MsIGVhY2ggd2l0aCB0aGUgc3RlcHMgaW4gYmV0d2VlbiB0aGUgJ2Zyb20nIGFuZCAndG8nXG5cdGNvbG9yIG1vZGVscyAoaW5jbHVzaXZlKS5cblxuXHRjb252ZXJzaW9ucyB0aGF0IGFyZSBub3QgcG9zc2libGUgc2ltcGx5IGFyZSBub3QgaW5jbHVkZWQuXG4qL1xuXG5mdW5jdGlvbiBidWlsZEdyYXBoKCkge1xuXHRjb25zdCBncmFwaCA9IHt9O1xuXHQvLyBodHRwczovL2pzcGVyZi5jb20vb2JqZWN0LWtleXMtdnMtZm9yLWluLXdpdGgtY2xvc3VyZS8zXG5cdGNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuXHRmb3IgKGxldCBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Z3JhcGhbbW9kZWxzW2ldXSA9IHtcblx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tLzEtdnMtaW5maW5pdHlcblx0XHRcdC8vIG1pY3JvLW9wdCwgYnV0IHRoaXMgaXMgc2ltcGxlLlxuXHRcdFx0ZGlzdGFuY2U6IC0xLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlYWR0aC1maXJzdF9zZWFyY2hcbmZ1bmN0aW9uIGRlcml2ZUJGUyhmcm9tTW9kZWwpIHtcblx0Y29uc3QgZ3JhcGggPSBidWlsZEdyYXBoKCk7XG5cdGNvbnN0IHF1ZXVlID0gW2Zyb21Nb2RlbF07IC8vIFVuc2hpZnQgLT4gcXVldWUgLT4gcG9wXG5cblx0Z3JhcGhbZnJvbU1vZGVsXS5kaXN0YW5jZSA9IDA7XG5cblx0d2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBxdWV1ZS5wb3AoKTtcblx0XHRjb25zdCBhZGphY2VudHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9uc1tjdXJyZW50XSk7XG5cblx0XHRmb3IgKGxldCBsZW4gPSBhZGphY2VudHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRjb25zdCBhZGphY2VudCA9IGFkamFjZW50c1tpXTtcblx0XHRcdGNvbnN0IG5vZGUgPSBncmFwaFthZGphY2VudF07XG5cblx0XHRcdGlmIChub2RlLmRpc3RhbmNlID09PSAtMSkge1xuXHRcdFx0XHRub2RlLmRpc3RhbmNlID0gZ3JhcGhbY3VycmVudF0uZGlzdGFuY2UgKyAxO1xuXHRcdFx0XHRub2RlLnBhcmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoYWRqYWNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuZnVuY3Rpb24gbGluayhmcm9tLCB0bykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRyZXR1cm4gdG8oZnJvbShhcmdzKSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKSB7XG5cdGNvbnN0IHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0bGV0IGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHRsZXQgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gZGVyaXZlQkZTKGZyb21Nb2RlbCk7XG5cdGNvbnN0IGNvbnZlcnNpb24gPSB7fTtcblxuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAobGV0IGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRjb25zdCB0b01vZGVsID0gbW9kZWxzW2ldO1xuXHRcdGNvbnN0IG5vZGUgPSBncmFwaFt0b01vZGVsXTtcblxuXHRcdGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gTm8gcG9zc2libGUgY29udmVyc2lvbiwgb3IgdGhpcyBub2RlIGlzIHRoZSBzb3VyY2UgbW9kZWwuXG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb252ZXJzaW9uW3RvTW9kZWxdID0gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpO1xuXHR9XG5cblx0cmV0dXJuIGNvbnZlcnNpb247XG59O1xuXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcclxuXHRcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXHJcblx0XCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcclxuXHRcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcclxuXHRcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcclxuXHRcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXHJcblx0XCJibGFja1wiOiBbMCwgMCwgMF0sXHJcblx0XCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXHJcblx0XCJibHVlXCI6IFswLCAwLCAyNTVdLFxyXG5cdFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcclxuXHRcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXHJcblx0XCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxyXG5cdFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxyXG5cdFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxyXG5cdFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxyXG5cdFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXHJcblx0XCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXHJcblx0XCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXHJcblx0XCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXHJcblx0XCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcclxuXHRcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXHJcblx0XCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxyXG5cdFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxyXG5cdFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcclxuXHRcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXHJcblx0XCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxyXG5cdFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxyXG5cdFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcclxuXHRcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXHJcblx0XCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcclxuXHRcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXHJcblx0XCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXHJcblx0XCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxyXG5cdFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxyXG5cdFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXHJcblx0XCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxyXG5cdFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXHJcblx0XCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcclxuXHRcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcclxuXHRcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXHJcblx0XCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxyXG5cdFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXHJcblx0XCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXHJcblx0XCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXHJcblx0XCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxyXG5cdFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXHJcblx0XCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcclxuXHRcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxyXG5cdFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXHJcblx0XCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxyXG5cdFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxyXG5cdFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxyXG5cdFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxyXG5cdFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXHJcblx0XCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcclxuXHRcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXHJcblx0XCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxyXG5cdFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXHJcblx0XCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxyXG5cdFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxyXG5cdFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxyXG5cdFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXHJcblx0XCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXHJcblx0XCJsaWdodHNlYWdyZWVuXCI6IFszMiwgMTc4LCAxNzBdLFxyXG5cdFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcclxuXHRcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcclxuXHRcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcclxuXHRcImxpbWVcIjogWzAsIDI1NSwgMF0sXHJcblx0XCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcclxuXHRcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcclxuXHRcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcclxuXHRcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxyXG5cdFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcclxuXHRcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcclxuXHRcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxOV0sXHJcblx0XCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcclxuXHRcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXHJcblx0XCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxyXG5cdFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxyXG5cdFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxyXG5cdFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXHJcblx0XCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxyXG5cdFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcclxuXHRcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcclxuXHRcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcclxuXHRcIm5hdnlcIjogWzAsIDAsIDEyOF0sXHJcblx0XCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcclxuXHRcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXHJcblx0XCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXHJcblx0XCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcclxuXHRcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXHJcblx0XCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxyXG5cdFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXHJcblx0XCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxyXG5cdFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXHJcblx0XCJwYWxldmlvbGV0cmVkXCI6IFsyMTksIDExMiwgMTQ3XSxcclxuXHRcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxyXG5cdFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcclxuXHRcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXHJcblx0XCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcclxuXHRcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxyXG5cdFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXHJcblx0XCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcclxuXHRcInJlYmVjY2FwdXJwbGVcIjogWzEwMiwgNTEsIDE1M10sXHJcblx0XCJyZWRcIjogWzI1NSwgMCwgMF0sXHJcblx0XCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxyXG5cdFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxyXG5cdFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcclxuXHRcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXHJcblx0XCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxyXG5cdFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcclxuXHRcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcclxuXHRcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxyXG5cdFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcclxuXHRcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxyXG5cdFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxyXG5cdFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcclxuXHRcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXHJcblx0XCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXHJcblx0XCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxyXG5cdFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxyXG5cdFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXHJcblx0XCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcclxuXHRcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcclxuXHRcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXHJcblx0XCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXHJcblx0XCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV0sXHJcblx0XCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcclxuXHRcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxyXG5cdFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF1cclxufTtcclxuIiwiaW1wb3J0IHsgUmFuZ2UsIFJhbmdlU2ltcGxlLCBSYW5nZUxpbmUsIFZpc1N0ciB9IGZyb20gXCIuL3Zpc19zdHJcIjtcbmV4cG9ydCBjb25zdCBpc1BhbGluZHJvbWUgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGggLyAyOyBpKyspIHtcbiAgICAgICAgaWYgKHN0cltpXSAhPSBzdHJbc3RyLmxlbmd0aCAtIGkgLSAxXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUGFsaW5kcm9tZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZUxpbmVbXSA9PiB7XG4gICAgLy8gZXhwb3J0IGNvbnN0IGVudW1QYWxpbmRyb21lcyA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICAgIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICAgIC8vIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBsZXQgcmVzOiBSYW5nZUxpbmVbXSA9IFtdO1xuICAgIGZvciAobGV0IGxlbiA9IDE7IGxlbiA8PSBuOyBsZW4rKykge1xuICAgICAgICBmb3IgKGxldCBiZWcgPSAwOyBiZWcgKyBsZW4gPD0gbjsgYmVnKyspIHtcbiAgICAgICAgICAgIGlmIChpc1BhbGluZHJvbWUoc3RyLnN1YnN0cmluZyhiZWcsIGJlZyArIGxlbikpKVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZyArIGxlbiAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcbiIsImltcG9ydCAqIGFzIGNvbnZlcnQgZnJvbSAnY29sb3ItY29udmVydCdcblxuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gZm9yIHN0cmluZ3MgKi9cbmV4cG9ydCB0eXBlIFJhbmdlU3RyID0gW251bWJlciwgbnVtYmVyLCBzdHJpbmdbXV1cbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uIGZvciBsaW5lICovXG5leHBvcnQgdHlwZSBSYW5nZUxpbmUgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcj9dXG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VTaW1wbGUgPSBSYW5nZVN0ciB8IFJhbmdlTGluZVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHtcbiAgLyoqIFRoZSBzdHlsZSB0byBkcmF3IHJhbmdlLiBJdCBpcyBlaXRoZXIgb2YgW1wibGluZVwiLCBcImN1cnZlXCIsIFwiYXJyb3dcIiwgXCJzdHJcIl0uIElmIFwic3RyXCIgaXMgY2hvc2VuLCB0aGUgb3B0aW5hbCBwYXJhbWV0ZXIgYHN0cmAgbXVzdCBiZSBnaXZlbi4gRm9yIG90aGVyIHN0eWxlcywgeW91IGNhbiBzZXQgbGVmdCBzdHlsZSBhbmQgcmlnaHQgc3R5bGUgbGllIFwibGluZSxhcnJvd1wiLiAqL1xuICBzdHlsZTogc3RyaW5nXG4gIC8qKiBUaGUgY29sb3IgdG8gZHJhdyByYW5nZSwgZS5nLiBcIiMwMDAwMDBcIiBmb3IgYmxhY2suICovXG4gIGNvbG9yOiBzdHJpbmdcbiAgLyoqIFRoZSBiZWdpbm5pbmcgaW5kZXggb2YgdGhlIHJhbmdlLiAqL1xuICBiZWc6IG51bWJlclxuICAvKiogVGhlIGVuZGluZyBpbmRleCBvZiB0aGUgcmFuZ2UuIE5vdGUgdGhhdCBpbmRleGVzIGFyZSBpbmNsdXNpdmUuICovXG4gIGVuZDogbnVtYmVyXG4gIC8qKiBUaGUgc3RlcCBvZiB0aGUgcmFuZ2UgW2BiZWdgLCBgZW5kYF0uIEZvciBleGFtcGxlLCBhIHJhbmdlIFtgYmVnYCwgYGVuZGAsIGBzdGVwYF0gPSBbMSwgOCwgM10gcmVwcmVzZW50cyBjb250aW51b3VzIHJhbmdlcyBbW2BiZWdgLCBgZW5kYF1dPVtbMSwgM10sIFs0LCA2XSwgWzcsIDhdXSAqL1xuICBzdGVwPzogbnVtYmVyXG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlUHgge1xuICAvKiogVGhlIHN0eWxlIHRvIGRyYXcgcmFuZ2UuIEl0IGlzIGVpdGhlciBvZiBbXCJsaW5lXCIsIFwiY3VydmVcIiwgXCJhcnJvd1wiLCBcInN0clwiXS4gSWYgXCJzdHJcIiBpcyBjaG9zZW4sIHRoZSBvcHRpbmFsIHBhcmFtZXRlciBgc3RyYCBtdXN0IGJlIGdpdmVuLiBGb3Igb3RoZXIgc3R5bGVzLCB5b3UgY2FuIHNldCBsZWZ0IHN0eWxlIGFuZCByaWdodCBzdHlsZSBsaWUgXCJsaW5lLGFycm93XCIuICovXG4gIHN0eWxlOiBzdHJpbmdcbiAgLyoqIFRoZSBjb2xvciB0byBkcmF3IHJhbmdlLCBlLmcuIFwiIzAwMDAwMFwiIGZvciBibGFjay4gKi9cbiAgY29sb3I6IHN0cmluZ1xuICAvKiogVGhlIHgtY29vcmRpbmF0ZSB3aGljaCBiZWdpbnMgdGhlIHJhbmdlLiAqL1xuICB4X2JlZzogbnVtYmVyXG4gIC8qKiBUaGUgeC1jb29yZGluYXRlIHdoaWNoIGVuZHMgdGhlIHJhbmdlLiAqL1xuICB4X2VuZDogbnVtYmVyXG4gIC8qKiBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSByYW5nZS4gKi9cbiAgeTogbnVtYmVyXG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgY2xhc3MgVmlzU3RyIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgcHJpdmF0ZSBzdHJfeDogbnVtYmVyXG4gIHByaXZhdGUgc3RyX3k6IG51bWJlclxuICBwcml2YXRlIGZvbnRfc2l6ZTogbnVtYmVyXG4gIHByaXZhdGUgZm9udF9zaXplX2hhbGY6IG51bWJlclxuICBwcml2YXRlIGZvbnRfdHlwZTogc3RyaW5nXG4gIC8qKiBUaGUgb2Zmc2V0IHRvIHN0YXJ0IGRyYXdpbmcgYSByYW5nZSBmcm9tIGEgY2VudGVyIHBvc2l0aW9uIG9mIGFuIGluZGV4LiAqL1xuICBwcml2YXRlIHJhbmdlX2JlZ19vZmZzZXQ6IG51bWJlclxuICBwcml2YXRlIHJhbmdlX2VuZF9vZmZzZXQ6IG51bWJlclxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2FudmFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAqIEBwYXJhbSBmb250X3NpemUgZm9udCBzaXplXG4gICAqIEBwYXJhbSBmb250X3R5cGUgZm9udCBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgIGZvbnRfc2l6ZSA9IDMyLFxuICAgIGZvbnRfdHlwZSA9ICdDb3VyaWVyJyxcbiAgKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICB0aGlzLmZvbnRfc2l6ZSA9IGZvbnRfc2l6ZVxuICAgIHRoaXMuZm9udF9zaXplX2hhbGYgPSB0aGlzLmZvbnRfc2l6ZSAvIDJcbiAgICB0aGlzLmZvbnRfdHlwZSA9IGZvbnRfdHlwZVxuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplXG4gICAgdGhpcy5zdHJfeSA9IHRoaXMuZm9udF9zaXplICogMiArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICB0aGlzLnJhbmdlX2JlZ19vZmZzZXQgPSAtdGhpcy5mb250X3NpemUgLyA0XG4gICAgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0ID0gdGhpcy5mb250X3NpemUgLyA0XG4gIH1cblxuICAvKiogQ2xlYXIgdGhlIGNhbnZhcy4gKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgYmVnaW5uaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBiZWdpbm5pbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlQmVnKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9iZWdfb2Zmc2V0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgZW5kaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBlbmRpbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlRW5kKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiByYW5nZS5cbiAgICogQHBhcmFtIHIgQSByYW5nZS5cbiAgICovXG4gIHJhbmdlSGVpZ2h0KHI6IFJhbmdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gci5zdHlsZSA9PT0gJ3N0cicgPyB0aGlzLmZvbnRfc2l6ZSA6IE1hdGgucm91bmQodGhpcy5mb250X3NpemUgKiAwLjUpXG4gIH1cblxuICAvKipcbiAgICogRm9yIGEgcmFuZ2Ugbm90IHRvIGRyYXcgc3RyaW5ncywgc3BsaXQgaXQgdG8gdGhyZWUgcGFydHMgbGVmdCwgY2VudGVyLCBhbmQgcmlnaHQuXG4gICAqIEBwYXJhbSBycHggR2l2ZW4gcmFuZ2UgdG8gc3BsaXQuXG4gICAqL1xuICBzcGxpdFJhbmdlUHgocnB4OiBSYW5nZVB4KTogUmFuZ2VQeFtdIHtcbiAgICBjb25zdCBzdHlsZXMgPSBycHguc3R5bGUuc3BsaXQoJywnKVxuXG4gICAgbGV0IHJsID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KVxuICAgIGxldCByYyA9IE9iamVjdC5hc3NpZ24oe30sIHJweClcbiAgICBsZXQgcnIgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpXG4gICAgcmwueF9lbmQgPSBycHgueF9iZWcgKyB0aGlzLmN1cnZlX2QoKVxuICAgIHJsLnN0eWxlID0gc3R5bGVzWzBdXG5cbiAgICByci54X2JlZyA9IHJweC54X2VuZFxuICAgIHJyLnhfZW5kID0gcnB4LnhfZW5kIC0gdGhpcy5jdXJ2ZV9kKClcbiAgICByci5zdHlsZSA9IHN0eWxlcy5sZW5ndGggPiAxID8gc3R5bGVzWzFdIDogc3R5bGVzWzBdXG5cbiAgICByYy54X2JlZyA9IHJsLnhfZW5kXG4gICAgcmMueF9lbmQgPSByci54X2VuZFxuICAgIHJjLnN0eWxlID0gJ2xpbmUnXG4gICAgcmV0dXJuIFtybCwgcmMsIHJyXVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgY3VydmUgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3Q3VydmVQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2JlZywgcnB4LnkgLSB0aGlzLmN1cnZlX2QoKSlcbiAgICB0aGlzLmN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHJweC54X2JlZywgcnB4LnksIHJweC54X2VuZCwgcnB4LnkpXG4gICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGxlbmd0aCBvZiBhIGJlZ2lubmluZyAob3IgZW5kaW5nKSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBjdXJ2ZV9kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZm9udF9zaXplX2hhbGYgLyAyXG4gIH1cblxuICAvKipcbiAgICogRHJhdyBsaW5lIGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0xpbmVQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICB0aGlzLmN0eC5tb3ZlVG8ocnB4LnhfYmVnLCBycHgueSlcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kLCBycHgueSlcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYXJyb3cgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3QXJyb3dQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLmN1cnZlX2QoKSAqIChycHgueF9iZWcgPCBycHgueF9lbmQgPyAtMSA6ICsxKVxuICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2VuZCArIGR4IC8gMiwgcnB4LnkgKyBkeCAvIDIpXG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCArIGR4LCBycHgueSlcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kICsgZHggLyAyLCBycHgueSAtIGR4IC8gMilcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3UmFuZ2VQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgaWYgKHJweC5zdHlsZSA9PSAnbGluZScpIHtcbiAgICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIH0gZWxzZSBpZiAocnB4LnN0eWxlID09ICdjdXJ2ZScpIHtcbiAgICAgIHRoaXMuZHJhd0N1cnZlUGFydChycHgpXG4gICAgfSBlbHNlIGlmIChycHguc3R5bGUgPT0gJ2Fycm93Jykge1xuICAgICAgdGhpcy5kcmF3QXJyb3dQeFBhcnQocnB4KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcmFuZ2UgdG8gZHJhdy5cbiAgICovXG4gIGRyYXdSYW5nZVB4KHJweDogUmFuZ2VQeCkge1xuICAgIGlmIChycHguc3R5bGUgPT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLmRyYXdMaW5lUHhQYXJ0KHJweClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW3JsLCByYywgcnJdID0gdGhpcy5zcGxpdFJhbmdlUHgocnB4KVxuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocmwpXG4gICAgICB0aGlzLmRyYXdSYW5nZVB4UGFydChyYylcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJyKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHN0cmluZ3MuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UgdG8gZHJhdyBzdHJpbmdzLlxuICAgKiBAcGFyYW0geSBUaGUgeS1jb29yaW5hdGUgdG8gZHJhdyByYW5nZSBgcmAuXG4gICAqL1xuICBkcmF3U3RyKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCByc3RyID0gci5zdHIgYXMgc3RyaW5nW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSByc3RyW2ldXG4gICAgICBjb25zdCBjeCA9IHRoaXMuc3RyX3ggKyAoci5iZWcgKyBpKSAqIHRoaXMuZm9udF9zaXplXG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChjLCBjeCwgeSArIHRoaXMuZm9udF9zaXplICogMC4zLCB0aGlzLmZvbnRfc2l6ZSlcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICB0aGlzLmN0eC5yZWN0KFxuICAgICAgICBjeCAtIHRoaXMuZm9udF9zaXplX2hhbGYsXG4gICAgICAgIHkgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmLFxuICAgICAgICB0aGlzLmZvbnRfc2l6ZSxcbiAgICAgICAgdGhpcy5mb250X3NpemUsXG4gICAgICApXG4gICAgICB0aGlzLmN0eC5zdHJva2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlIHRvIGRyYXcuXG4gICAqIEBwYXJhbSB5IEEgeS1jb29yZGluYXRlIHRvIGRyYXcgYHJgLlxuICAgKi9cbiAgZHJhd1JhbmdlKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHIuY29sb3JcbiAgICBsZXQgcnB4ID0ge1xuICAgICAgeF9iZWc6IHRoaXMucmFuZ2VCZWcoci5iZWcpLFxuICAgICAgeF9lbmQ6IHRoaXMucmFuZ2VFbmQoci5lbmQpLFxuICAgICAgeTogeSxcbiAgICAgIHN0eWxlOiByLnN0eWxlLFxuICAgICAgY29sb3I6IHIuY29sb3IsXG4gICAgICBzdHI6IHIuc3RyLFxuICAgIH1cbiAgICBpZiAoci5zdHlsZSA9PSAnc3RyJykge1xuICAgICAgdGhpcy5kcmF3U3RyKHIsIHkpXG4gICAgfSBlbHNlIGlmIChyLnN0ZXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB4X2JlZyA9IHRoaXMucmFuZ2VCZWcoci5iZWcpXG4gICAgICBmb3IgKGxldCBjdXIgPSByLmJlZyArIHIuc3RlcCAtIDE7IGN1ciA8IHIuZW5kOyBjdXIgKz0gci5zdGVwKSB7XG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIGN1ciArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICAgIHJweC54X2JlZyA9IHJweC54X2VuZFxuICAgICAgfVxuICAgICAgaWYgKChyLmVuZCAtIHIuYmVnICsgMSkgJSByLnN0ZXAgPT09IDApIHtcbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5yYW5nZUVuZChyLmVuZClcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGVyZSBpcyBhbiB1bmNvbXBsZXRlIHJhbmdlLlxuICAgICAgICBycHgueF9lbmQgPSB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiByLmVuZCArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICAgICAgcnB4LnN0eWxlID0gci5zdHlsZS5zcGxpdCgnLCcpWzBdICsgJyxsaW5lJ1xuICAgICAgICB0aGlzLmRyYXdSYW5nZVB4KHJweClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZXMuXG4gICAqIEBwYXJhbSByYW5nZV9yb3dzIFJhbmdlcyB0byBkcmF3LlxuICAgKi9cbiAgZHJhd1JhbmdlcyhyYW5nZV9yb3dzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgeXB4ID0gdGhpcy5zdHJfeVxuICAgIGZvciAoY29uc3QgcmFuZ2VzIG9mIHJhbmdlX3Jvd3MpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KC4uLnJhbmdlcy5tYXAociA9PiB0aGlzLnJhbmdlSGVpZ2h0KHIpKSlcbiAgICAgIGZvciAoY29uc3QgcmFuZ2Ugb2YgcmFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlKHJhbmdlLCB5cHggKyBoZWlnaHQgLyAyKVxuICAgICAgfVxuICAgICAgeXB4ICs9IGhlaWdodFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFuIGlucHV0IHN0cmluZy5cbiAgICovXG4gIGRyYXdJbnB1dFN0cihpbnB1dF9zdHI6IHN0cmluZykge1xuICAgIGxldCBpbmRleCA9IFsnaSddXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dF9zdHIubGVuZ3RoOyBpKyspIGluZGV4LnB1c2goJycgKyBpKVxuICAgIGxldCByID0ge1xuICAgICAgc3R5bGU6ICdzdHInLFxuICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIGJlZzogLTEsXG4gICAgICBlbmQ6IGlucHV0X3N0ci5sZW5ndGggLSAxLFxuICAgICAgc3RyOiBpbmRleCxcbiAgICB9XG4gICAgdGhpcy5kcmF3UmFuZ2UociwgdGhpcy5zdHJfeSAtIHRoaXMuZm9udF9zaXplIC0gdGhpcy5mb250X3NpemVfaGFsZilcbiAgICBjb25zdCBjaGFycyA9IFsnU3RyJ11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0X3N0ci5sZW5ndGg7IGkrKylcbiAgICAgIGNoYXJzLnB1c2goaW5wdXRfc3RyLnN1YnN0cmluZyhpLCBpICsgMSkpXG4gICAgci5zdHIgPSBjaGFyc1xuICAgIHRoaXMuZHJhd1JhbmdlKHIsIHRoaXMuc3RyX3kgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYSBnaXZlbiBzdHJpbmcgYW5kIHJhbmdlcy5cbiAgICogQHBhcmFtIGlucHV0X3N0ciBJbnB1dCBzdHJpbmcgdG8gZHJhdy5cbiAgICogQHBhcmFtIHJzcyBUaGUgcmFuZ2VzIHRvIGRyYXcgd2hpY2ggYXJlIHJlbGF0ZWQgdG8gYSBnaXZlbiBzdHJpbmcgYGlucHV0X3N0cmBcbiAgICovXG4gIGRyYXcoaW5wdXRfc3RyOiBzdHJpbmcsIHJzczogUmFuZ2VbXVtdKSB7XG4gICAgbGV0IHJhbmdlX2JvdW5kID0gWy0xLCBpbnB1dF9zdHIubGVuZ3RoIC0gMV1cbiAgICByc3MuZm9yRWFjaChycyA9PlxuICAgICAgcnMuZm9yRWFjaChcbiAgICAgICAgciA9PlxuICAgICAgICAgIChyYW5nZV9ib3VuZCA9IFtcbiAgICAgICAgICAgIE1hdGgubWluKHJhbmdlX2JvdW5kWzBdLCByLmJlZyksXG4gICAgICAgICAgICBNYXRoLm1heChyYW5nZV9ib3VuZFsxXSwgci5lbmQpLFxuICAgICAgICAgIF0pLFxuICAgICAgKSxcbiAgICApXG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplICsgTWF0aC5hYnMocmFuZ2VfYm91bmRbMF0pICogdGhpcy5mb250X3NpemVcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IChyYW5nZV9ib3VuZFsxXSAtIHJhbmdlX2JvdW5kWzBdICsgMikgKiB0aGlzLmZvbnRfc2l6ZVxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9XG4gICAgICB0aGlzLnN0cl95ICtcbiAgICAgIHRoaXMuZm9udF9zaXplX2hhbGYgK1xuICAgICAgcnNzLnJlZHVjZShcbiAgICAgICAgKGFjbSwgcnMpID0+IGFjbSArIE1hdGgubWF4KC4uLnJzLm1hcChyID0+IHRoaXMucmFuZ2VIZWlnaHQocikpKSxcbiAgICAgICAgMCxcbiAgICAgIClcblxuICAgIC8vIERQSSBzZXR0aW5nc1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDFcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAvLyBjb25zb2xlLmxvZygnZHByJywgZHByLCAnIHJlY3QnLCByZWN0KVxuICAgIHRoaXMuY2FudmFzLndpZHRoICo9IGRwclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCAqPSBkcHJcbiAgICB0aGlzLmN0eC5zY2FsZShkcHIsIGRwcilcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gZHByICsgJ3B4J1xuXG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gZHByICsgJ3B4J1xuICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gM1xuICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLmZvbnRfc2l6ZSArICdweCAnICsgdGhpcy5mb250X3R5cGVcbiAgICB0aGlzLmRyYXdJbnB1dFN0cihpbnB1dF9zdHIpXG4gICAgdGhpcy5kcmF3UmFuZ2VzKHJzcylcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGdyb3VwIHRoYXQgZWFjaCBjb250YWlucyBhIHNpbmdsZSByYW5nZS5cbiAgICogQHBhcmFtIHJhbmdlcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICovXG4gIG1ha2VTaW5nbGVHcm91cHMocmFuZ2VzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChyYW5nZSA9PiBbcmFuZ2VdKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ3JvdXBlZCByYW5nZXMgdGhhdCBlYWNoIGNvbnRhaW5zIG5vbiBvdmVybGFwcGluZyByYW5nZXMuXG4gICAqIEBwYXJhbSBUcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHJhbmdlZiBUaGUgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSB0dXBsZSBiZWdpbm5pbmcgaW5kZXggYW5kIGVuZGluZyBpbmRleCBvZiBhIGdpdmVuIHJhbmdlIGBUc1tpXWAuXG4gICAqL1xuICBub25PdmVybGFwT2JqczxUPihUczogVFtdLCByYW5nZWY6IChhcmcwOiBUKSA9PiBudW1iZXJbXSk6IFRbXVtdIHtcbiAgICBpZiAoVHMubGVuZ3RoIDw9IDApIHJldHVybiBbXVxuICAgIGNvbnN0IGVuZHMgPSBUcy5tYXAodCA9PiByYW5nZWYodClbMV0pXG4gICAgY29uc3QgbiA9IE1hdGgubWF4KC4uLmVuZHMpICsgMVxuICAgIGxldCB1c2VkID0gbmV3IEFycmF5PGJvb2xlYW4+KG4pXG4gICAgdXNlZC5maWxsKGZhbHNlKVxuICAgIGxldCByZXMgPSBbXVxuICAgIGxldCByb3dzOiBUW10gPSBbXVxuICAgIGZvciAoY29uc3QgdCBvZiBUcykge1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBvciBub3QgYSByYW5nZSBjYW4gYmUgaW5zZXJ0ZWQgdG8gdGhlIGN1cnJlbnQgcm93LlxuICAgICAgbGV0IHVzZWRfYW55ID0gZmFsc2VcbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZF9hbnkgPSB1c2VkX2FueSB8fCB1c2VkW2ldXG4gICAgICB9XG4gICAgICBpZiAodXNlZF9hbnkpIHtcbiAgICAgICAgcmVzLnB1c2gocm93cylcbiAgICAgICAgcm93cyA9IFt0XVxuICAgICAgICB1c2VkLmZpbGwoZmFsc2UpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3dzLnB1c2godClcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZFtpXSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3MubGVuZ3RoID4gMCkgcmVzLnB1c2gocm93cylcblxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBub25PdmVybGFwUmFuZ2VzKHJzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5ub25PdmVybGFwT2JqczxSYW5nZT4ocnMsIHIgPT4gW3IuYmVnLCByLmVuZF0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbm9uT3ZlcmxhcFJhbmdlc1NpbXBsZShyczogUmFuZ2VTaW1wbGVbXSk6IFJhbmdlU2ltcGxlW11bXSB7XG4gICAgcmV0dXJuIHRoaXMubm9uT3ZlcmxhcE9ianM8UmFuZ2VTaW1wbGU+KHJzLCB4ID0+IFt4WzBdLCB4WzFdXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdW10ge1xuICAgIGxldCByZXMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gJyMnICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pXG4gICAgICByZXMucHVzaCh0aGlzLm1ha2VSYW5nZXMocnNbaV0sIHN0eWxlLCBjb2xvcikpXG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCBzdHlsZSBgc3R5bGVgIGFuZCBgY29sb3JgLlxuICAgKiBAcGFyYW0gcmFuZ2VzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZVJhbmdlcyhyYW5nZXM6IFJhbmdlU2ltcGxlW10sIHN0eWxlOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpOiBSYW5nZVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChyYW5nZSA9PiB7XG4gICAgICBjb25zdCBpc19zdHIgPVxuICAgICAgICB0eXBlb2YgcmFuZ2VbMl0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiByYW5nZVsyXSAhPT0gJ251bWJlcidcbiAgICAgIGNvbnN0IHN0ZXAgPSB0eXBlb2YgcmFuZ2VbMl0gPT09ICdudW1iZXInID8gcmFuZ2VbMl0gOiB1bmRlZmluZWRcbiAgICAgIGNvbnN0IHN0ciA9IHR5cGVvZiByYW5nZVsyXSAhPT0gJ251bWJlcicgPyByYW5nZVsyXSA6IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3R5bGU6IGlzX3N0ciA/ICdzdHInIDogc3R5bGUsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBiZWc6IHJhbmdlWzBdLFxuICAgICAgICBlbmQ6IHJhbmdlWzFdLFxuICAgICAgICBzdGVwLFxuICAgICAgICBzdHIsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZVJhbmdlc0F1dG9Db2xvcihyczogUmFuZ2VTaW1wbGVbXSwgc3R5bGU6IHN0cmluZyk6IFJhbmdlW10ge1xuICAgIHJldHVybiBycy5tYXAoKHJhbmdlLCBpKSA9PiAoe1xuICAgICAgc3R5bGUsXG4gICAgICBjb2xvcjogJyMnICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pLFxuICAgICAgYmVnOiByYW5nZVswXSxcbiAgICAgIGVuZDogcmFuZ2VbMV0sXG4gICAgfSkpXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBSYW5nZSwgUmFuZ2VTaW1wbGUsIFZpc1N0ciB9IGZyb20gXCIuL3Zpc19zdHJcIjtcbmltcG9ydCAqIGFzIHN0cmxpYiBmcm9tIFwiLi9zdHJsaWJcIjtcblxuY29uc3Qgc3Vic3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbiAgICBsZXQgcmVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDw9IG47IGorKykgcmVzLmFkZChzdHIuc3Vic3RyaW5nKGksIGopKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi5yZXMua2V5cygpXTtcbn07XG5cbmNvbnN0IGZpbmRBbGwgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gICAgY29uc3QgbSA9IHBhdC5sZW5ndGg7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICAgIGxldCBwb3MgPSBzdHIuaW5kZXhPZihwYXQpO1xuICAgIHdoaWxlIChwb3MgIT09IC0xKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwb3MsIHBvcyArIG0gLSAxXSk7XG4gICAgICAgIHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgcG9zICsgMSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG4vLyBjb25zdCBpc1BhbGluZHJvbWUgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGggLyAyOyBpKyspIHtcbi8vICAgICAgICAgaWYgKHN0cltpXSAhPSBzdHJbc3RyLmxlbmd0aCAtIGkgLSAxXSkgcmV0dXJuIGZhbHNlO1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gdHJ1ZTtcbi8vIH07XG5cbi8vIGV4cG9ydCBjb25zdCBlbnVtUGFsaW5kcm9tZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbi8vICAgICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbi8vICAgICBsZXQgcmVzOiBSYW5nZVNpbXBsZVtdID0gW107XG4vLyAgICAgZm9yIChsZXQgbGVuID0gMTsgbGVuIDwgbjsgbGVuKyspIHtcbi8vICAgICAgICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgbGVuIDw9IG47IGJlZysrKSB7XG4vLyAgICAgICAgICAgICBpZiAoaXNQYWxpbmRyb21lKHN0ci5zdWJzdHJpbmcoYmVnLCBiZWcgKyBsZW4pKSlcbi8vICAgICAgICAgICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyBsZW4gLSAxXSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIHJlcztcbi8vIH07XG5jb25zdCBpc1BhbGluZHJvbWUgPSBzdHJsaWIuaXNQYWxpbmRyb21lO1xuY29uc3QgZW51bVBhbGluZHJvbWVzID0gc3RybGliLmVudW1QYWxpbmRyb21lcztcblxuY29uc3QgbGNwID0gKHN0cjogc3RyaW5nLCBpOiBudW1iZXIsIGo6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgbGV0IG4gPSBzdHIubGVuZ3RoO1xuICAgIGxldCBtYXRjaF9sZW4gPSAwO1xuICAgIHdoaWxlIChpICsgbWF0Y2hfbGVuIDwgbiAmJiBqICsgbWF0Y2hfbGVuIDwgbikge1xuICAgICAgICBpZiAoc3RyW2kgKyBtYXRjaF9sZW5dID09IHN0cltqICsgbWF0Y2hfbGVuXSkgbWF0Y2hfbGVuKys7XG4gICAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaF9sZW47XG59O1xuXG5jb25zdCBwcmV2T2NjTFBGID0gKHN0cjogc3RyaW5nKTogW251bWJlcltdLCBudW1iZXJbXV0gPT4ge1xuICAgIGxldCBwcmV2T2NjID0gW107XG4gICAgbGV0IGxwZiA9IFtdO1xuICAgIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGxldCBwb2NjeCA9IC0xO1xuICAgICAgICBsZXQgbHBmeCA9IDA7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBsID0gbGNwKHN0ciwgaSwgaik7XG4gICAgICAgICAgICBpZiAobHBmeCA8IGwpIHtcbiAgICAgICAgICAgICAgICBscGZ4ID0gbDtcbiAgICAgICAgICAgICAgICBwb2NjeCA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJldk9jYy5wdXNoKHBvY2N4KTtcbiAgICAgICAgbHBmLnB1c2gobHBmeCk7XG4gICAgfVxuICAgIHJldHVybiBbcHJldk9jYywgbHBmXTtcbn07XG5cbmNvbnN0IGVudW1QcmV2T2NjTFBGID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbiAgICBjb25zdCBbcHJldk9jYywgbHBmXSA9IHByZXZPY2NMUEYoc3RyKTtcbiAgICBsZXQgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXG4gICAgICAgIFtbLTEsIG4gLSAxLCBbXCJvY2NcIl0uY29uY2F0KHByZXZPY2MubWFwKCh4KSA9PiB4LnRvU3RyaW5nKCkpKV1dLFxuICAgICAgICBbWy0xLCBuIC0gMSwgW1wibGVuXCJdLmNvbmNhdChscGYubWFwKCh4KSA9PiB4LnRvU3RyaW5nKCkpKV1dLFxuICAgIF07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2T2NjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChscGZbaV0gPiAwKSB7XG4gICAgICAgICAgICByZXMucHVzaChbXG4gICAgICAgICAgICAgICAgW2ksIGkgKyBscGZbaV0gLSAxXSxcbiAgICAgICAgICAgICAgICBbcHJldk9jY1tpXSwgcHJldk9jY1tpXSArIGxwZltpXSAtIDFdLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGlzU3F1YXJlID0gKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDsgaSsrKSB7XG4gICAgICAgIGlmIChzW2JlZyArIGldICE9IHNbYmVnICsgcCArIGldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgZW51bVNxdWFyZXMgPSAoczogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gICAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICAgIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgICAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCAyICogcDsgb2Zmc2V0KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIgKiBwICsgMTsgYmVnICs9IDIgKiBwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5jb25zdCBpc1JpZ2h0bW9zdFNxdWFyZSA9IChzOiBzdHJpbmcsIGJlZzogbnVtYmVyLCBwOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIWlzU3F1YXJlKHMsIGJlZywgcCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIXMuaW5jbHVkZXMocy5zdWJzdHIoYmVnLCAyICogcCksIGJlZyArIDEpO1xufTtcblxuY29uc3QgaXNMZWZ0bW9zdFNxdWFyZSA9IChzOiBzdHJpbmcsIGJlZzogbnVtYmVyLCBwOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIWlzU3F1YXJlKHMsIGJlZywgcCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIXMuc3Vic3RyKDAsIGJlZyArIDIgKiBwIC0gMSkuaW5jbHVkZXMocy5zdWJzdHIoYmVnLCAyICogcCkpO1xufTtcblxuY29uc3QgZW51bVJpZ2h0bW9zdFNxdWFyZXMgPSAoczogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gICAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICAgIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgICAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCAyICogcDsgb2Zmc2V0KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIgKiBwICsgMTsgYmVnICs9IDIgKiBwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRtb3N0U3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5jb25zdCBlbnVtTGVmdG1vc3RTcXVhcmVzID0gKHM6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICAgIGNvbnN0IG4gPSBzLmxlbmd0aDtcbiAgICBsZXQgcmVzOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgZm9yIChsZXQgcCA9IDE7IHAgPCBuOyBwKyspIHtcbiAgICAgICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgMiAqIHA7IG9mZnNldCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBiZWcgPSBvZmZzZXQ7IGJlZyA8IG4gLSAyICogcCArIDE7IGJlZyArPSAyICogcCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0xlZnRtb3N0U3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5jb25zdCBpc1J1biA9IChzOiBzdHJpbmcsIGJlZzogbnVtYmVyLCBwOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICBpZiAoYmVnID4gMCAmJiBzW2JlZyAtIDFdID09IHNbYmVnICsgcCAtIDFdKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwOyBpKyspIHtcbiAgICAgICAgaWYgKHNbYmVnICsgaV0gIT0gc1tiZWcgKyBwICsgaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBlbnVtUnVucyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgICBjb25zdCBuID0gcy5sZW5ndGg7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICAgIGxldCBybWFwID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChsZXQgcCA9IDE7IHAgPCBuOyBwKyspIHtcbiAgICAgICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgMiAqIHAgPD0gbjsgYmVnKyspIHtcbiAgICAgICAgICAgIGlmIChpc1J1bihzLCBiZWcsIHApKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gMiAqIHA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG1hdGNoIDwgbiAmJiBzW2JlZyArIChtYXRjaCAlIHApXSA9PSBzW2JlZyArIG1hdGNoXSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBiZWcgKyBcIixcIiArIChiZWcgKyBtYXRjaCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICghcm1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyBtYXRjaCAtIDEsIHBdKTtcbiAgICAgICAgICAgICAgICAgICAgcm1hcC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGxlZnRFeHRlbnNpb25zID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgICBsZXQgcmVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgbGV0IGZyb21JZHggPSAxO1xuICAgIGxldCBwb3MgPSBzdHIuaW5kZXhPZihwYXQsIGZyb21JZHgpO1xuICAgIHdoaWxlIChwb3MgIT09IC0xKSB7XG4gICAgICAgIHJlcy5hZGQoc3RyW3BvcyAtIDFdKTtcbiAgICAgICAgcG9zID0gc3RyLmluZGV4T2YocGF0LCBwb3MgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi5yZXMua2V5cygpXTtcbn07XG5cbmNvbnN0IHJldmVyc2UgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBzdHIuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG59O1xuXG5jb25zdCByaWdodEV4dGVuc2lvbnMgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICAgIGNvbnN0IHJzdHIgPSByZXZlcnNlKHN0cik7XG4gICAgY29uc3QgcnBhdCA9IHJldmVyc2UocGF0KTtcbiAgICByZXR1cm4gbGVmdEV4dGVuc2lvbnMocnN0ciwgcnBhdCk7XG59O1xuXG5jb25zdCBpc0xlZnRNYXhpbWFsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBsZWZ0RXh0ZW5zaW9ucyhzdHIsIHBhdCkubGVuZ3RoID4gMTtcbn07XG5cbmNvbnN0IGlzUmlnaHRNYXhpbWFsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiByaWdodEV4dGVuc2lvbnMoc3RyLCBwYXQpLmxlbmd0aCA+IDE7XG59O1xuXG5jb25zdCBpc01heFJlcGVhdCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gaXNMZWZ0TWF4aW1hbChzdHIsIHBhdCkgJiYgaXNSaWdodE1heGltYWwoc3RyLCBwYXQpO1xufTtcblxuY29uc3QgbHo3NyA9IChzdHI6IHN0cmluZywgc2hvd19mYWN0b3JpZDogbnVtYmVyID0gMSk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gICAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gICAgY29uc3QgW29jY3MsIGxlbnNdID0gcHJldk9jY0xQRihzdHIpO1xuICAgIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICkge1xuICAgICAgICBsZXQgcmFuZ2VzOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgICAgIGlmIChvY2NzW2ldID09PSAtMSkge1xuICAgICAgICAgICAgcmFuZ2VzID0gW1tpLCBpLCBbc3RyW2ldXV1dO1xuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VzID0gW1xuICAgICAgICAgICAgICAgIFtvY2NzW2ldLCBvY2NzW2ldICsgbGVuc1tpXSAtIDFdLFxuICAgICAgICAgICAgICAgIFtpLCBpICsgbGVuc1tpXSAtIDFdLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGkgKz0gbGVuc1tpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvd19mYWN0b3JpZCA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0X2VuZCA9IHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV1bMV07XG4gICAgICAgICAgICByYW5nZXMucHVzaChbbGFzdF9lbmQgKyAxLCBsYXN0X2VuZCArIDEsIFtcImZcIiArIHNob3dfZmFjdG9yaWRdXSk7XG4gICAgICAgICAgICBzaG93X2ZhY3RvcmlkKys7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2gocmFuZ2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGx6NzggPSAoc3RyOiBzdHJpbmcsIHNob3dfZmFjdG9yaWQgPSAxKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICBsZXQgZCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyApIHtcbiAgICAgICAgbGV0IGogPSBpICsgMTtcbiAgICAgICAgd2hpbGUgKGogPD0gc3RyLmxlbmd0aCAmJiBkLmhhcyhzdHIuc3Vic3RyaW5nKGksIGopKSkge1xuICAgICAgICAgICAgaisrO1xuICAgICAgICB9XG4gICAgICAgIGxldCByb3c6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICAgICAgaWYgKGogLSBpID4gMSkge1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IGQuZ2V0KHN0ci5zdWJzdHJpbmcoaSwgaiAtIDEpKSBhcyBudW1iZXI7XG4gICAgICAgICAgICByb3cucHVzaChbcHJldiwgcHJldiArIChqIC0gaSAtIDIpXSk7XG4gICAgICAgICAgICByb3cucHVzaChbaSwgaiAtIDJdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiwgW3N0cltqIC0gMV0sIFwiZlwiICsgc2hvd19mYWN0b3JpZF1dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiAtIDEsIFtcImZcIiArIHNob3dfZmFjdG9yaWRdXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd19mYWN0b3JpZCsrO1xuICAgICAgICByZXMucHVzaChyb3cpO1xuICAgICAgICBkLnNldChzdHIuc3Vic3RyaW5nKGksIGopLCBpKTtcbiAgICAgICAgaSA9IGo7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5jb25zdCBpc0x5bmRvbiA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsZXNzdGhhbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgajIgPSAoaSArIGopICUgc3RyLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChzdHJbal0gPiBzdHJbajJdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBlbHNlIGlmIChzdHJbal0gPCBzdHJbajJdKSB7XG4gICAgICAgICAgICAgICAgbGVzc3RoYW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbGVzc3RoYW4pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBjb25zdCBlbnVtTHluZG9uID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbi8vICAgY29uc3QgY2hlY2sgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKSA9PiBpc0x5bmRvbihwYXQpXG4vLyAgIHJldHVybiBlbnVtSWZHcm91cChzdHIsIGNoZWNrKVxuLy8gfVxuY29uc3QgZW51bUx5bmRvbiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gICAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBsZW4gPSAxOyBsZW4gPD0gc3RyLmxlbmd0aDsgbGVuKyspIHtcbiAgICAgICAgY29uc3QgZ3JvdXA6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyBsZW4gPD0gc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzdWIgPSBzdHIuc3Vic3RyKGksIGxlbik7XG4gICAgICAgICAgICBpZiAoaXNMeW5kb24oc3ViKSkgZ3JvdXAucHVzaChbaSwgaSArIGxlbiAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAubGVuZ3RoID4gMCkgcmVzLnB1c2goZ3JvdXApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcblxuLy8gRHV2YWwncyBhbGdvcml0aG1cbi8vIGZpbmQgbG9uZ2VzdCBseW5kb24gZmFjdG9yIHdoaWNoIHN0YXJ0cyBhdCBiZWcgaW4gc3RyLlxuLy8gcmV0dXJuIFtsZW4sIHJlcGVhdF0sIHdoZXJlXG4vLyBsZW4gaXMgdGhlIGxlbmd0aCBvZiB0aGUgZmFjdG9yLFxuLy8gcmVwZWF0IGlzIHRoZSBtYXhpbXVtIHJlcGVhdCBvZiB0aGUgZmFjdG9yLlxuY29uc3QgZmluZExvbmdlc3RMeW5kb25GYWN0b3IgPSAoXG4gICAgc3RyOiBzdHJpbmcsXG4gICAgYmVnOiBudW1iZXJcbik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICAgIGxldCBpID0gYmVnO1xuICAgIGxldCBlbmQgPSBiZWcgKyAxO1xuICAgIHdoaWxlIChlbmQgPCBzdHIubGVuZ3RoICYmIHN0cltpXSA8PSBzdHJbZW5kXSkge1xuICAgICAgICBpZiAoc3RyW2ldID09PSBzdHJbZW5kXSkge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgZW5kKys7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyW2ldIDwgc3RyW2VuZF0pIHtcbiAgICAgICAgICAgIC8vIHN0cltiZWcuLi5lbmRdIGlzIEx5bmRvbiBzdHJpbmdcbiAgICAgICAgICAgIGkgPSBiZWc7XG4gICAgICAgICAgICBlbmQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBzdHJbYmVnLi4uZW5kLTFdIGlzIHRoZSBsb25nZXN0IEx5bmRvbiBwcmVmaXggb2Ygc3RyW2JlZy4uLl0uXG4gICAgY29uc3QgbGVuID0gZW5kIC0gaTtcbiAgICBjb25zdCByZXBlYXQgPSBNYXRoLmZsb29yKChlbmQgLSBiZWcpIC8gKGVuZCAtIGkpKTtcbiAgICByZXR1cm4gW2xlbiwgcmVwZWF0XTtcbn07XG5cbmNvbnN0IGx5bmRvbkZhY3Rvcml6YXRpb24gPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICAgIGxldCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICAgIGxldCBiZWcgPSAwO1xuXG4gICAgd2hpbGUgKGJlZyA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yID0gZmluZExvbmdlc3RMeW5kb25GYWN0b3Ioc3RyLCBiZWcpO1xuICAgICAgICBjb25zdCBsZW5fZmFjdG9yID0gZmFjdG9yWzBdICogZmFjdG9yWzFdO1xuICAgICAgICByZXMucHVzaChbW2JlZywgYmVnICsgbGVuX2ZhY3RvciAtIDEsIGZhY3RvclswXV1dIGFzIFJhbmdlU2ltcGxlW10pO1xuICAgICAgICBiZWcgKz0gbGVuX2ZhY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGx5bmRvbkFycmF5ID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgaSk7XG4gICAgICAgIHJlcy5wdXNoKFtbaSwgaSArIGZhY3RvclswXSAtIDFdXSBhcyBSYW5nZVNpbXBsZVtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8vIHJlcGxhY2UgdGhlIGNoYXJhY3RlcnMgdG8gZWZmZWN0aXZlIGFscGhhYmV0IFswLCBzaWdtYS0xXVxuLy8gc2lnbWEgaXMgdGhlIG51bWJlciBvZiBkaXN0aW5jdCBjaGFyYWN0ZXJzIG9mIGdpdmVuIHN0cmluZ1xuLy8gc2lnbWEgbXVzdCBiZSBsZXNzIHRoYW4gMTBcbmNvbnN0IHJlcGxhY2VFZmZlY3RpdmVBbHBoYWJldCA9IChzdHI6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgICBjb25zdCBjaGFycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSBjaGFycy5hZGQoc3RyW2ldKTtcbiAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKGNoYXJzLnZhbHVlcygpKTtcbiAgICBhcnIuc29ydCgpO1xuICAgIGNvbnN0IHJlcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgYXJyLm1hcCgoYywgaSkgPT4gcmVwLnNldChjLCBpLnRvU3RyaW5nKCkpKTtcbiAgICBjb25zdCByZXBzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHJlcHMucHVzaChyZXAuZ2V0KHN0cltpXSkgYXMgc3RyaW5nKTtcbiAgICByZXR1cm4gcmVwcztcbiAgICAvLyByZXR1cm4gcmVwcy5qb2luKCcnKVxufTtcblxuY29uc3Qgc3VmZml4QXJyYXkgPSAoc3RyOiBzdHJpbmcpOiBudW1iZXJbXSA9PiB7XG4gICAgY29uc3Qgc3VmZml4ZXMgPSBbLi4uQXJyYXkoc3RyLmxlbmd0aCkua2V5cygpXS5tYXAoKGkpID0+IHN0ci5zdWJzdHIoaSkpO1xuICAgIHN1ZmZpeGVzLnNvcnQoKTtcbiAgICByZXR1cm4gc3VmZml4ZXMubWFwKChzKSA9PiBzdHIubGVuZ3RoIC0gcy5sZW5ndGgpO1xufTtcblxuY29uc3QgcmFua0FycmF5ID0gKHN0cjogc3RyaW5nLCBzYT86IG51bWJlcltdKSA9PiB7XG4gICAgaWYgKHNhID09PSB1bmRlZmluZWQpIHNhID0gc3VmZml4QXJyYXkoc3RyKTtcbiAgICBjb25zdCByYW5rID0gQXJyYXkoc3RyLmxlbmd0aCk7XG4gICAgc2EuZm9yRWFjaCgocG9zLCByKSA9PiAocmFua1twb3NdID0gcikpO1xuICAgIHJldHVybiByYW5rO1xufTtcblxuLy8gbmV4dCBzbWFsbGVyIHN1ZmZpeGVzXG5jb25zdCBuc3NBcnJheSA9IChzdHI6IHN0cmluZywgcmFuaz86IG51bWJlcltdKSA9PiB7XG4gICAgaWYgKHJhbmsgPT09IHVuZGVmaW5lZCkgcmFuayA9IHJhbmtBcnJheShzdHIpO1xuICAgIGNvbnN0IG4gPSByYW5rLmxlbmd0aDtcbiAgICBjb25zdCBuc3NhID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGxldCBuc3MgPSBuO1xuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChyYW5rW2ldID4gcmFua1tqXSkge1xuICAgICAgICAgICAgICAgIG5zcyA9IGo7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnNzYVtpXSA9IG5zcztcbiAgICB9XG4gICAgcmV0dXJuIG5zc2E7XG59O1xuXG4vLyBuZXh0IHNtYWxsZXIgc3VmZml4ZXNcbmNvbnN0IHByZXZBcnJheSA9IChzdHI6IHN0cmluZywgcmFuaz86IG51bWJlcltdKSA9PiB7XG4gICAgaWYgKHJhbmsgPT09IHVuZGVmaW5lZCkgcmFuayA9IHJhbmtBcnJheShzdHIpO1xuICAgIGNvbnN0IG4gPSByYW5rLmxlbmd0aDtcbiAgICBjb25zdCBwc3NhID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGxldCBwc3MgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgaWYgKHJhbmtbaV0gPiByYW5rW2pdKSB7XG4gICAgICAgICAgICAgICAgcHNzID0gajtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwc3NhW2ldID0gcHNzO1xuICAgIH1cbiAgICByZXR1cm4gcHNzYTtcbn07XG5cbmNvbnN0IG5leHRTbWFsbGVyU3VmZml4ZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICAgIGNvbnN0IG5zc2EgPSBuc3NBcnJheShzdHIpO1xuICAgIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZ3JvdXA6IFJhbmdlU2ltcGxlW10gPSBbW2ksIG5zc2FbaV1dXTtcbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IHByZXZTbWFsbGVyU3VmZml4ZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICAgIGNvbnN0IHBzc2EgPSBwcmV2QXJyYXkoc3RyKTtcbiAgICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW1twc3NhW2ldLCBpXV07XG4gICAgICAgIGlmIChncm91cC5sZW5ndGggPiAwKSByZXMucHVzaChncm91cCk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5jb25zdCBlbnVtSWYgPSAoXG4gICAgc3RyOiBzdHJpbmcsXG4gICAgY2hlY2s6IChzOiBzdHJpbmcsIHA6IHN0cmluZykgPT4gYm9vbGVhblxuKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gICAgcmV0dXJuIGZsYXQoZW51bUlmR3JvdXAoc3RyLCBjaGVjaykpO1xufTtcblxuY29uc3QgZW51bUlmR3JvdXAgPSAoXG4gICAgc3RyOiBzdHJpbmcsXG4gICAgY2hlY2s6IChzOiBzdHJpbmcsIHA6IHN0cmluZykgPT4gYm9vbGVhblxuKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICByZXR1cm4gc3Vic3RyaW5ncyhzdHIpXG4gICAgICAgIC5maWx0ZXIoKHApID0+IGNoZWNrKHN0ciwgcCkpXG4gICAgICAgIC5tYXAoKHApID0+IGZpbmRBbGwoc3RyLCBwKSk7XG59O1xuXG5jb25zdCByYWRpb1ZhbHVlID0gKHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGVsbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KHNlbGVjdG9yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVsbXNbaV0uY2hlY2tlZCkgcmVzID0gZWxtc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGZsYXQgPSA8VD4oYXJyOiBUW11bXSk6IFRbXSA9PiB7XG4gICAgcmV0dXJuIGFyci5yZWR1Y2UoKGFjbSwgeCkgPT4gYWNtLmNvbmNhdCh4KSwgW10gYXMgVFtdKTtcbn07XG5cbmNvbnN0IGRyYXcgPSAoZTogRXZlbnQpID0+IHtcbiAgICAvLyBnZXQgZm9udCBzaXplXG4gICAgbGV0IGZvbnRfc2l6ZSA9IHBhcnNlSW50KHJhZGlvVmFsdWUoXCJbbmFtZT1mb250X3NpemVdXCIpKTtcbiAgICAvLyBnZXQgbGluZSBzdHlsZVxuICAgIGxldCByYW5nZV9zdHlsZSA9IHJhZGlvVmFsdWUoXCJbbmFtZT1saW5lX3N0eWxlXVwiKTtcbiAgICBjb25zdCBsaW5lX3N0eWxlX3JpZ2h0ID0gcmFkaW9WYWx1ZShcIltuYW1lPWxpbmVfc3R5bGVfcmlnaHRdXCIpO1xuXG4gICAgcmFuZ2Vfc3R5bGUgKz0gbGluZV9zdHlsZV9yaWdodC5sZW5ndGggPT09IDAgPyBcIlwiIDogXCIsXCIgKyBsaW5lX3N0eWxlX3JpZ2h0O1xuICAgIGxldCB2aXN1YWxpemUgPSByYWRpb1ZhbHVlKFwiW25hbWU9dmlzdWFsaXplXVwiKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYGZvbnRfc2l6ZT0ke2ZvbnRfc2l6ZX0sIGxpbmVfc3R5bGU9JHtyYW5nZV9zdHlsZX0sIHZpc3VhbGl6ZT0ke3Zpc3VhbGl6ZX1gXG4gICAgKTtcblxuICAgIC8vIGdldCBpbnB1dCBzdHJpbmdcbiAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0X3N0clwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGxldCBpbnB1dF9zdHIgPSBlbG0udmFsdWU7XG5cbiAgICAvLyBnZXQgY2FudmFzXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgLy8gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSA1MFxuICAgIGNvbnN0IHZpc1N0ciA9IG5ldyBWaXNTdHIoY2FudmFzLCAoZm9udF9zaXplID0gZm9udF9zaXplKSk7XG5cbiAgICAvLyBjb21wdXRlIHJhbmdlc1xuICAgIGxldCByYW5nZXNwOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgbGV0IHJhbmdlc19ncm91cDogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgbGV0IHJhbmdlczogUmFuZ2VbXVtdID0gW107XG5cbiAgICBjb25zdCBzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCA9IChcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZmZlY3RpdmVfYWxwaGFiZXRcIikgYXMgSFRNTElucHV0RWxlbWVudFxuICAgICkuY2hlY2tlZDtcbiAgICBjb25zdCBzaG93X3JhbmtfYXJyYXkgPSAoXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFua19hcnJheVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgKS5jaGVja2VkO1xuXG4gICAgaWYgKHNob3dfZWZmZWN0aXZlX2FscGhhYmV0KSB7XG4gICAgICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAtMSxcbiAgICAgICAgICAgICAgICBpbnB1dF9zdHIubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICBbXCJlU3RyXCIsIC4uLnJlcGxhY2VFZmZlY3RpdmVBbHBoYWJldChpbnB1dF9zdHIpXSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gICAgfVxuICAgIGlmIChzaG93X3JhbmtfYXJyYXkpIHtcbiAgICAgICAgcmFuZ2VzX2dyb3VwLnB1c2goW1xuICAgICAgICAgICAgWy0xLCBpbnB1dF9zdHIubGVuZ3RoIC0gMSwgW1wicmFua1wiLCAuLi5yYW5rQXJyYXkoaW5wdXRfc3RyKV1dLFxuICAgICAgICBdIGFzIFJhbmdlU2ltcGxlW10pO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgdmlzdWFsaXplID09PSBcInJ1bnNcIiB8fFxuICAgICAgICB2aXN1YWxpemUgPT09IFwicGFsaW5kcm9tZXNcIiB8fFxuICAgICAgICB2aXN1YWxpemUgPT09IFwic3F1YXJlc1wiIHx8XG4gICAgICAgIHZpc3VhbGl6ZSA9PT0gXCJybW9zdHNxdWFyZXNcIiB8fFxuICAgICAgICB2aXN1YWxpemUgPT09IFwibG1vc3RzcXVhcmVzXCJcbiAgICApIHtcbiAgICAgICAgaWYgKHZpc3VhbGl6ZSA9PT0gXCJydW5zXCIpIHtcbiAgICAgICAgICAgIHJhbmdlc3AgPSBlbnVtUnVucyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW107XG4gICAgICAgIH0gZWxzZSBpZiAodmlzdWFsaXplID09PSBcInBhbGluZHJvbWVzXCIpIHtcbiAgICAgICAgICAgIHJhbmdlc3AgPSBlbnVtUGFsaW5kcm9tZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdO1xuICAgICAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJzcXVhcmVzXCIpIHtcbiAgICAgICAgICAgIHJhbmdlc3AgPSBlbnVtU3F1YXJlcyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW107XG4gICAgICAgIH0gZWxzZSBpZiAodmlzdWFsaXplID09PSBcInJtb3N0c3F1YXJlc1wiKSB7XG4gICAgICAgICAgICByYW5nZXNwID0gZW51bVJpZ2h0bW9zdFNxdWFyZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdO1xuICAgICAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJsbW9zdHNxdWFyZXNcIikge1xuICAgICAgICAgICAgcmFuZ2VzcCA9IGVudW1MZWZ0bW9zdFNxdWFyZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmFuZ2VzcFwiLCByYW5nZXNwKTtcbiAgICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChcbiAgICAgICAgICAgIHZpc1N0ci5ub25PdmVybGFwUmFuZ2VzU2ltcGxlKHJhbmdlc3ApXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmFuZ2VfZ3JvdXBcIiwgcmFuZ2VzX2dyb3VwKTtcbiAgICAgICAgcmFuZ2VzID0gdmlzU3RyLm1ha2VHcm91cFJhbmdlc0F1dG9Db2xvcihyYW5nZXNfZ3JvdXAsIHJhbmdlX3N0eWxlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJyYW5nZXNwXCIsIHJhbmdlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHZpc3VhbGl6ZSA9PT0gXCJscGZcIilcbiAgICAgICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoZW51bVByZXZPY2NMUEYoaW5wdXRfc3RyKSk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJsZWZ0X21heGltYWxcIilcbiAgICAgICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoXG4gICAgICAgICAgICAgICAgZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBpc0xlZnRNYXhpbWFsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcInJpZ2h0X21heGltYWxcIilcbiAgICAgICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoXG4gICAgICAgICAgICAgICAgZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBpc1JpZ2h0TWF4aW1hbClcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJtYXhfcmVwZWF0XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICAgICAgICAgIGVudW1JZkdyb3VwKGlucHV0X3N0ciwgaXNNYXhSZXBlYXQpXG4gICAgICAgICAgICApO1xuICAgICAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHo3N1wiKVxuICAgICAgICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChsejc3KGlucHV0X3N0cikpO1xuICAgICAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHo3OFwiKVxuICAgICAgICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChsejc4KGlucHV0X3N0cikpO1xuICAgICAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHluZG9uX2ZhY3Rvcml6YXRpb25cIilcbiAgICAgICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQobHluZG9uRmFjdG9yaXphdGlvbihpbnB1dF9zdHIpKTtcbiAgICAgICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcImx5bmRvbl9hcnJheVwiKVxuICAgICAgICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChseW5kb25BcnJheShpbnB1dF9zdHIpKTtcbiAgICAgICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcImVudW1fbHluZG9uXCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KGVudW1MeW5kb24oaW5wdXRfc3RyKSk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJwcmV2X3NtYWxsZXJfc3VmZml4XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHByZXZTbWFsbGVyU3VmZml4ZXMoaW5wdXRfc3RyKSk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJuZXh0X3NtYWxsZXJfc3VmZml4XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KG5leHRTbWFsbGVyU3VmZml4ZXMoaW5wdXRfc3RyKSk7XG4gICAgICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSk7XG4gICAgICAgIHJhbmdlcyA9IGZsYXQocmFuZ2VzLm1hcCgoeCkgPT4gdmlzU3RyLm5vbk92ZXJsYXBSYW5nZXMoeCkpKTtcbiAgICB9XG5cbiAgICB2aXNTdHIuZHJhdyhpbnB1dF9zdHIsIHJhbmdlcyk7XG59O1xuXG5jb25zdCBzZWxlY3RvckFkZEV2ZW50ID0gKHNlbGVjdG9yOiBzdHJpbmcsIGV2ZW50OiBzdHJpbmcsIGZ1bmM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGVsbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KHNlbGVjdG9yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZWxtc1tpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcbiAgICB9XG59O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0X3N0ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfc3RyXCIpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlucHV0X3N0ci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZHJhdyk7XG4gICAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9wZXJ0eWNoYW5nZVwiLCBkcmF3KTtcblxuICAgIC8vIGFkZCBldmVudCBmb3IgcmFkaW8gYnV0dG9uc1xuICAgIHNlbGVjdG9yQWRkRXZlbnQoXCJbbmFtZT1mb250X3NpemVdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG4gICAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPWxpbmVfc3R5bGVdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG4gICAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPWxpbmVfc3R5bGVfcmlnaHRdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG4gICAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPXZpc3VhbGl6ZV1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgICAvLyBzZWxlY3RvckFkZEV2ZW50KCcjZWZmZWN0aXZlX2FscGhhYmV0JywgJ2NsaWNrJywgZHJhdylcbiAgICBzZWxlY3RvckFkZEV2ZW50KFwiW3R5cGU9Y2hlY2tib3hdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG5cbiAgICAvLyBkcmF3IGluaXRpYWxseS5cbiAgICBpbnB1dF9zdHIuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwicHJvcGVydHljaGFuZ2VcIiwgeyBkZXRhaWw6IFwiaW5pdCBldmVudFwiIH0pXG4gICAgKTtcbn07XG5cbm1haW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==