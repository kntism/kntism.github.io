const normalOneValueChack = function (value) {
  return value.length === 1 ? true : false;
};

const canUseFunc = {
  sin: {
    func: Math.sin,
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  cos: {
    func: Math.cos,
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  tan: {
    func: Math.tan,
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  cot: {
    func: function (radians) {
      return 1 / Math.tan(radians);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  log: {
    func: Math.log10,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  ln: {
    func: Math.log,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  sqrt: {
    func: Math.sqrt,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  abs: {
    func: Math.abs,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  floor: {
    func: Math.floor,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  ceil: {
    func: Math.ceil,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  round: {
    func: Math.round,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  exp: {
    func: Math.exp,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  pow: {
    func: function (value) {
      return Math.pow(value[0], value[1]);
    },
    unit: [["#"], ["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: function (value) {
        return value.length === 2 ? true : false;
      },
    },
  },
  sinh: {
    func: Math.sinh,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  cosh: {
    func: Math.cosh,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  tanh: {
    func: Math.tanh,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  asin: {
    func: Math.asin,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  acos: {
    func: Math.acos,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  atan: {
    func: Math.atan,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
  asinh: {
    func: Math.asinh,
    unit: [["#"]],
    toolFunc: {
      unitTransition: function (value) {},
      chackValueAmount: normalOneValueChack,
    },
  },
};

const canUseFuncNames = Object.keys(canUseFunc);

const canUseSigns = ["+", "-", "*", "/", "(", ")"];

const canUseUnit = ["deg", "rad"];

const settings = {
  degreeOrRad: { general: true, degree: false, rad: false },
  language: { en: true, zh: false },
};

export { canUseFunc, canUseSigns, settings, canUseUnit, canUseFuncNames };
