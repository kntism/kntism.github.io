const canUseFunc = {
  sin: {
    func: function (radians) {
      return Math.sin(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: trigonometricFunctionsUnitTran,
      checkValueAmount: normalOneValueChack,
    },
  },
  cos: {
    func: function (radians) {
      return Math.cos(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: trigonometricFunctionsUnitTran,
      checkValueAmount: normalOneValueChack,
    },
  },
  tan: {
    func: function (radians) {
      return Math.tan(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: trigonometricFunctionsUnitTran,
      checkValueAmount: normalOneValueChack,
    },
  },
  cot: {
    func: function (radians) {
      return 1 / Math.tan(radians[0]);
    },
    unit: [["deg", "rad", "#"]],
    toolFunc: {
      unitTransition: trigonometricFunctionsUnitTran,
      checkValueAmount: normalOneValueChack,
    },
  },
  log: {
    func: function (value) {
      return Math.log10(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  ln: {
    func: function (value) {
      return Math.log(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  sqrt: {
    func: function (value) {
      return Math.sqrt(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  abs: {
    func: function (value) {
      return Math.abs(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  floor: {
    func: function (value) {
      return Math.floor(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  ceil: {
    func: function (value) {
      return Math.ceil(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  round: {
    func: function (value) {
      return Math.round(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  exp: {
    func: function (value) {
      return Math.exp(value[0]);
    },
    unit: [["#"]],
    toolFunc: {
      unitTransition: null,
      checkValueAmount: normalOneValueChack,
    },
  },
  pow: {
    func: function (value) {
      return Math.pow(value[0], value[1]);
    },
    unit: [["#"], ["#"]],
    toolFunc: {
      unitTransition: null,
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
  pi: { value: Math.PI },
  e: { value: Math.E },
  Infinity: { value: Infinity },
};

const canUseQuantityNames = Object.keys(constantQuantity);

const canUseFuncNames = Object.keys(canUseFunc);

const canUseSigns = ["+", "-", "*", "/", "^", "(", ")"];

const allCanUseSigns = ["+", "-", "*", "/", "^", "(", ")", ","];

const allOperators = ["+", "-", "*", "/", "^"];

const canUseUnit = ["deg", "rad"];

const settings = {
  degreeOrRad: { general: true, degree: false, rad: false },
  language: { en: true, zh: false },
};

function replaceUnit(expr) {
  let newExpr = expr.replace(/°/g, "deg");
  newExpr = newExpr.replace(/\\lceil(.+?)\\rceil/g, "ceil($1)");
  newExpr = newExpr.replace(/\\lfloor(.+?)\\rfloor/g, "floor($1)");
  newExpr = newExpr.replace(/r a d/g, "rad");
  return newExpr;
}
function trigonometricFunctionsUnitTran(value, funcName) {
  for (let i = 0; i < value.length; i++) {
    if (/^[a-zA-Z]+$/.test(value[i])) {
      if (value[i] === "rad") {
        value.splice(i, 1);
      } else if (value[i] === "deg") {
        value.splice(i - 1, 2, (+value[i - 1] * Math.PI) / 180);
      } else if (
        !canUseQuantityNames.includes(value[i]) &&
        !canUseFuncNames.includes(value[i])
      ) {
        throw new Error(
          `You can't use unit ${value[i]} in ${funcName}  value: ${value}`
        );
      }
    }
  }
}

function normalOneValueChack(value) {
  return value.filter((v) => !canUseUnit.includes(v)).length === 1
    ? true
    : false;
}

function findTrueValue(obj) {
  return Object.keys(obj).find((key) => obj[key] === true);
}

export {
  findTrueValue,
  replaceUnit,
  canUseFunc,
  canUseSigns,
  allCanUseSigns,
  allOperators,
  settings,
  canUseUnit,
  canUseFuncNames,
  constantQuantity,
  canUseQuantityNames,
};
