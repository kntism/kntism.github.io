const canUseFunc = [
  "sin",
  "cos",
  "tan",
  "cot",
  "log",
  "ln",
  "sqrt",
  "abs",
  "floor",
  "ceil",
  "round",
  "exp",
  "pow",
  "sinh",
  "cosh",
  "tanh",
  "asin",
  "acos",
  "atan",
  "asinh",
];

const canUseSign = ["+", "-", "*", "/"];

const canUseUnit = ["deg", "rad"];

const settings = {
  degreeOrRad: { general: true, degree: false, rad: false },
  language: { en: true, zh: false },
};

export { canUseFunc, canUseSign, settings, canUseUnit };
