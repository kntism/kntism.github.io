const canUseFunc = {
  sin: {
    func: Math.sin,
    unit: [["deg", "rad", "#"]],
    toolFunc: { unitTransition: function (value) {} },
  },
  cos: { func: Math.cos, unit: [["deg", "rad", "#"]] },
  tan: { func: Math.tan, unit: [["deg", "rad", "#"]] },
  cot: {
    func: function (radians) {
      return 1 / Math.tan(radians);
    },
    unit: [["deg", "rad", "#"]],
  },
  log: { func: Math.log10, unit: [["#"]] },
  ln: { func: Math.log, unit: [["#"]] },
  sqrt: { func: Math.sqrt, unit: [["#"]] },
  abs: { func: Math.abs, unit: [["#"]] },
  floor: { func: Math.floor, unit: [["#"]] },
  ceil: { func: Math.ceil, unit: [["#"]] },
  round: { func: Math.round, unit: [["#"]] },
  exp: { func: Math.exp, unit: [["#"]] },
  pow: {
    func: function (value) {
      return Math.pow(value[0], value[1]);
    },
    unit: [["#"], ["#"]],
  },
  sinh: { func: Math.sinh, unit: [["#"]] },
  cosh: { func: Math.cosh, unit: [["#"]] },
  tanh: { func: Math.tanh, unit: [["#"]] },
  asin: { func: Math.asin, unit: [["#"]] },
  acos: { func: Math.acos, unit: [["#"]] },
  atan: { func: Math.atan, unit: [["#"]] },
  asinh: { func: Math.asinh, unit: [["#"]] },
};

const canUseFuncNames = Object.keys(canUseFunc);

const canUseSigns = ["+", "-", "*", "/", "(", ")"];

const canUseUnit = ["deg", "rad"];

const settings = {
  degreeOrRad: { general: true, degree: false, rad: false },
  language: { en: true, zh: false },
};

export { canUseFunc, canUseSigns, settings, canUseUnit, canUseFuncNames };
