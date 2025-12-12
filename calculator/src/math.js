import {
  settings,
  canUseUnit,
  canUseFunc,
  canUseFuncNames,
  canUseSigns,
} from "./mainInformation.js";
export function calculate(expr) {
  try {
    //const tokens = expr.replace(/\s+/g, "").match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/)/g) || [];
    const tokens = expr.match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\))/g) || [];
    if (tokens.length === 0) {
      throw new Error("There is no expression");
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
          if (canUseUnit.includes(tokenExpr[i])) {
            i--;
            continue;
          }
          if (!canUseFunc.hasOwnProperty(tokenExpr[i])) {
            throw new Error("There are unknown functions");
          }
          if (isNaN(+tokenExpr[i + 1])) {
            throw new Error("There is no number behind the function");
          }
          if (isNaN(tokenExpr[i - 1])) {
            //函数后面一定是数字
            let value = [];
            for (
              let m = i + 1;
              !canUseSigns.includes(tokenExpr[m]) && m < tokenExpr.length;
              m++
            ) {
              value.push(tokenExpr[m]);
            }
            console.log("-------" + value);
            for (let i = 0; i < value.length; i++) {
              if (isNaN(+value[i])) {
                value.splice(i, 1);
              }
            }
            if (canUseFunc[tokenExpr[i]].unit.length !== value.length) {
              throw new Error(
                `There should be ${
                  canUseFunc[tokenExpr[i]].unit.length
                } number after the function ${tokenExpr[i]}, but there are ${
                  value.length
                }`
              );
            }
            if (value.length === 1) {
              value = value[0];
            }
            const funcResult = canUseFunc[tokenExpr[i]].func(value);
            tokenExpr.splice(i, value.length + 1, funcResult);
            i--;
          } else {
            const value = +tokenExpr[i + 1];
            const funcResult =
              +tokenExpr[i - 1] * canUseFunc[tokenExpr[i]].func(value);
            tokenExpr.splice(i - 1, 3, funcResult);
            i -= 2;
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

      return tokenExpr.length === 1 ? String(tokenExpr) : tokenExpr;
    };
    const leftBracket = expr.match(/\(/g) || [];
    const rightBracket = expr.match(/\)/g) || [];
    if (leftBracket.length !== rightBracket.length) {
      throw new Error("Your brackets quantity is not equal");
    }
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
        if (!isNaN(+tokens[i - 1]) || !isNaN(+tokens[n + 1])) {
          if (!isNaN(+tokens[i - 1])) {
            tokens.splice(i, 0, "*");
            i++;
            n++;
          }
          if (!isNaN(+tokens[n + 1])) {
            tokens.splice(n + 1, 0, "*");
          }
          const subExpr = tokens.slice(i + 1, n);
          tokens.splice(i, n - i + 1, ...cal(subExpr));
          i--;
          console.log(tokens);
          continue;
        } else {
          const subExpr = tokens.slice(i + 1, n);
          tokens.splice(i, n - i + 1, ...cal(subExpr));
          i--;
          continue;
        }
      }
    }
    return cal(tokens);
  } catch (e) {
    return e.message;
  }
}
