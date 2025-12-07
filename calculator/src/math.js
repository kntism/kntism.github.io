import { settings, canUseUnit } from "./mainInformation.js";
export function calculate(expr) {
  try {
    //const tokens = expr.replace(/\s+/g, "").match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/)/g) || [];
    const tokens = expr.match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\))/g) || [];

    if (settings.degreeOrRad.degree) {
      for (let i = 0; i < tokens.length; i++) {
        if (canUseUnit.includes(tokens[i])) {
          if (isNaN(+tokens[i - 1]))
            throw new Error(`There is no number before "deg"`);
          if (tokens[i] === "rad") {
            throw new Error(`You can't use "rad" in degree mode`);
          } else if (tokens[i] === "deg") {
            tokens.splice(i - 1, 2, (+tokens[i - 1] * Math.PI) / 180);
          }
        }
      }
    } else if (settings.degreeOrRad.rad) {
      for (let i = 0; i < tokens.length; i++) {
        if (canUseUnit.includes(tokens[i])) {
          if (isNaN(+tokens[i - 1]))
            throw new Error(`There is no number before "rad"`);
          if (tokens[i] === "deg") {
            throw new Error(`You can't use "deg" in rad mode`);
          } else if (tokens[i] === "rad") {
            tokens.splice(i, i);
          }
        }
      }
    }
    const cal = (tokenExpr) => {
      let i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (!isNaN(a)) {
            break;
          }
          if (isNaN(b)) {
            throw new Error("You can't use '+' or '-' in that way");
          }
          tokenExpr.splice(i, 2, tokenExpr[i] + b);
        } else {
          i++;
        }
      }
      i = tokenExpr.length - 1;
      while (i >= 0) {
        if (/[a-zA-Z]+/.test(tokenExpr[i])) {
          if (isNaN(+tokenExpr[i + 1])) {
            throw new Error("There is no number behind the function");
          }
          switch (tokenExpr[i]) {
            case "sin":
              if (isNaN(tokenExpr[i - 1])) {
                const funcResult = Math.sin(+tokenExpr[i + 1]);
                tokenExpr.splice(i, 2, funcResult);
                i--;
              } else {
                const funcResult =
                  +tokenExpr[i - 1] * Math.sin(+tokenExpr[i + 1]);
                tokenExpr.splice(i - 1, 3, funcResult);
                i -= 2;
              }
              break;
            case "cos":
              if (isNaN(tokenExpr[i - 1])) {
                const funcResult = Math.cos(+tokenExpr[i + 1]);
                tokenExpr.splice(i, 2, funcResult);
                i--;
              } else {
                const funcResult =
                  +tokenExpr[i - 1] * Math.cos(+tokenExpr[i + 1]);
                tokenExpr.splice(i - 1, 3, funcResult);
                i -= 2;
              }
              break;
            case "tan":
              if (isNaN(tokenExpr[i - 1])) {
                const funcResult = Math.tan(+tokenExpr[i + 1]);
                tokenExpr.splice(i, 2, funcResult);
                i--;
              } else {
                const funcResult =
                  +tokenExpr[i - 1] * Math.tan(+tokenExpr[i + 1]);
                tokenExpr.splice(i - 1, 3, funcResult);
                i -= 2;
              }
              break;
            case "cot":
              if (isNaN(tokenExpr[i - 1])) {
                const funcResult = 1 / Math.tan(+tokenExpr[i + 1]);
                tokenExpr.splice(i, 2, funcResult);
                i--;
              } else {
                const funcResult =
                  +tokenExpr[i - 1] * (1 / Math.tan(+tokenExpr[i + 1]));
                tokenExpr.splice(i - 1, 3, funcResult);
                i -= 2;
              }
              break;
            default:
              throw new Error("There are unknown functions");
              break;
          }
        } else i--;
      }

      i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "*" || tokenExpr[i] === "/") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (isNaN(a) || isNaN(b)) {
            throw new Error("There is no number before or after '*' or '/'");
          }
          if (tokenExpr[i] === "/" && b === 0) {
            throw new Error("You can't divide by 0");
          }
          tokenExpr.splice(
            i - 1,
            3,
            String(tokenExpr[i] === "*" ? a * b : a / b)
          );
        } else i++;
      }
      i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (isNaN(a) || isNaN(b)) {
            throw new Error("There is no number before or after '+' or '-'");
          }
          tokenExpr.splice(
            i - 1,
            3,
            String(tokenExpr[i] === "+" ? a + b : a - b)
          );
        } else i++;
      }

      return String(tokenExpr);
    };
    let i = tokens.length - 1;
    while (i >= 0) {
      if (tokens[i] !== "(") {
        i--;
        continue;
      } else {
        let n = tokens.indexOf(")", i);
        if (n === -1) {
          throw new Error("Your brackets are wrong");
        }
        if (n === i + 1) {
          throw new Error("You can't use empty brackets");
        }
        const subExpr = tokens.slice(i + 1, n);
        tokens.splice(i, n - i + 1, cal(subExpr));
        i--;
      }
    }
    return cal(tokens);
  } catch (e) {
    return e.message;
  }
}
