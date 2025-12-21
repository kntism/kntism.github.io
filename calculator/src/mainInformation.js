const normalOneValueChack = function (value) {
  return value.length === 1 ? true : false;
};

const canUseFunc = {
  sin: {
    func: function (radians) {
      return Math.sin(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  cos: {
    func: function (radians) {
      return Math.cos(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  tan: {
    func: function (radians) {
      return Math.tan(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  cot: {
    func: function (radians) {
      return 1 / Math.tan(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  log: {
    func: function (value) {
      return Math.log10(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  ln: {
    func: function (value) {
      return Math.log(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  sqrt: {
    func: function (value) {
      return Math.sqrt(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  abs: {
    func: function (value) {
      return Math.abs(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  floor: {
    func: function (value) {
      return Math.floor(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  ceil: {
    func: function (value) {
      return Math.ceil(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  round: {
    func: function (value) {
      return Math.round(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  exp: {
    func: function (value) {
      return Math.exp(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  pow: {
    func: function (value) {
      return Math.pow(value[0], value[1]);
    },
    unit: [["#"], ["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: function (value) {
        return value.length === 2 ? true : false;
      },
    },
  },
  sinh: {
    func: function (value) {
      return Math.sinh(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  cosh: {
    func: function (value) {
      return Math.cosh(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  tanh: {
    func: function (value) {
      return Math.tanh(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  asin: {
    func: function (value) {
      return Math.asin(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  acos: {
    func: function (value) {
      return Math.acos(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  atan: {
    func: function (value) {
      return Math.atan(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
  asinh: {
    func: function (value) {
      return Math.asinh(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      checkValueAmount: normalOneValueChack,
    },
  },
};

const constantQuantity = {
  Pi: { value: Math.PI },
  e: { value: Math.E },
  Infinity: { value: Infinity },
};

const canUseQuantityNames = Object.keys(constantQuantity);

const canUseFuncNames = Object.keys(canUseFunc);

const canUseSigns = ["+", "-", "*", "/", "(", ")"];

const allCanUseSigns = canUseSigns;
allCanUseSigns.push(",");

const canUseUnit = ["deg", "rad"];

const settings = {
  degreeOrRad: { general: true, degree: false, rad: false },
  language: { en: true, zh: false },
};

export {
  canUseFunc,
  canUseSigns,
  allCanUseSigns,
  settings,
  canUseUnit,
  canUseFuncNames,
  constantQuantity,
  canUseQuantityNames,
};
