import {
  settings,
  canUseUnit,
  canUseFunc,
  canUseFuncNames,
  canUseSigns,
  allCanUseSigns,
  constantQuantity,
  canUseQuantityNames,
} from "./mainInformation.js";
export function calculate(expr) {
  try {
    const conversionOfScientificNotation = (result) => {
      let tokenResult = result;
      if (!Array.isArray(tokenResult)) {
        tokenResult = String(result).match(
          /((\+|\-)?\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\,|\^)/g
        );
      }

      for (let i = 0; i < tokenResult.length; i++) {
        if (tokenResult[i] === "e") {
          if (isNaN(tokenResult[i + 1]) || isNaN(tokenResult[i - 1])) continue;
          const normalNotationExpr = [
            tokenResult[i - 1],
            "*",
            "10",
            "^",
            tokenResult[i + 1],
          ];
          // +tokenResult[i - 1] * Math.pow(10, +tokenResult[i + 1]);
          tokenResult.splice(i - 1, 3, normalNotationExpr);
          i--;
          continue;
        } else continue;
      }
      return tokenResult;
    };

    const formatting = (tokenExpr) => {
      for (let i = 0; i < tokenExpr.length; i++) {
        if (tokenExpr[i] !== "(") continue;
        if (!isNaN(tokenExpr[i - 1]) || tokenExpr[i - 1] === ")") {
          tokenExpr.splice(i, 0, "*");
          i++;
        }
      }

      for (let i = 0; i < tokenExpr.length; i++) {
        if (tokenExpr[i] !== ")") continue;
        if (!isNaN(tokenExpr[i + 1]) || tokenExpr[i + 1] === "(") {
          tokenExpr.splice(i + 1, 0, "*");
          i++;
        }
      }

      for (let i = 0; i < tokenExpr.length; i++) {
        if (!/[a-zA-Z]+/g.test(tokenExpr[i])) continue;
        if (!isNaN(tokenExpr[i - 1])) {
          tokenExpr.splice(i, 0, "*");
          i++;
        }
      }
      return tokenExpr;
    };

    const evalSubExprMulAndDiv = (subExpr) => {
      let tokens = subExpr;
      formatting(tokens);
      console.log(`tokens:${tokens}`);
      let numList = [];
      let othersList = [];
      for (let i = tokens.length - 1; i >= 0; i--) {
        if (
          (!isNaN(+tokens[i]) || tokens[i] === "*" || tokens[i] === "/") &&
          tokens[i]
        ) {
          numList.unshift(tokens[i]);
          continue;
        } else {
          if (tokens[i - 1]) {
            othersList.unshift(tokens[i]);
            othersList.unshift(tokens[i - 1]);
            i--;
            continue;
          } else {
            othersList.unshift(tokens[i]);
            continue;
          }
        }
      }
      console.log(`numList:${numList}`);
      console.log(`othersList:${othersList}`);
      for (let i = 0; i < numList.length; i++) {
        if (numList[i] === "*" || numList[i] === "/") {
          const a = +numList[i - 1],
            b = +numList[i + 1];
          if (numList[i] === "/" && numList[i + 1] === "0") {
            throw new Error("You can't divide by 0");
          }
          if (isNaN(a) || isNaN(b)) {
            if (allCanUseSigns.includes(a) && allCanUseSigns.includes(b)) {
              throw new Error(
                "There is no can use object before or after '*' or '/'"
              );
            }
          }
          numList.splice(i - 1, 3, numList[i] === "*" ? a * b : a / b);
          i--;
          continue;
        }
      }
      const numResult = numList.join("");
      console.log(`numList:${numList}`);
      console.log(`numResult:${numResult}`);
      const finalResult = `${numResult}${othersList.join("")}`;
      return {
        result: finalResult,
        totalLength: numList.length + othersList.length,
      };
    };

    const evalSubExprAddAndSub = (subExpr) => {
      let tokens = subExpr;
      formatting(tokens);
      let numList = [];
      let othersList = [];
      for (let i = 0; i < tokens.length; i++) {
        if (
          (!isNaN(+tokens[i]) || tokens[i] === "+" || tokens[i] === "-") &&
          tokens[i]
        ) {
          numList.unshift(tokens[i]);
          continue;
        } else {
          if (tokens[i - 1]) {
            othersList.unshift(tokens[i]);
            othersList.unshift(tokens[i - 1]);
            i--;
            continue;
          } else {
            othersList.unshift(tokens[i]);
            continue;
          }
        }
      }
      console.log(`numList:${numList}`);
      console.log(`othersList:${othersList}`);
      for (let i = 0; i < numList.length; i++) {
        if (numList[i] === "+" || numList[i] === "-") {
          const a = +numList[i - 1],
            b = +numList[i + 1];
          if (isNaN(a) || isNaN(b)) {
            if (allCanUseSigns.includes(a) && allCanUseSigns.includes(b)) {
              throw new Error(
                "There is no can use object before or after '*' or '/'"
              );
            }
          }
          numList.splice(i - 1, 3, numList[i] === "+" ? a + b : a - b);
          i--;
          continue;
        }
      }
      const numResult = numList.join("");
      const finalResult = `${numResult}${othersList.join("")}`;
      return {
        result: finalResult,
        totalLength: numList.length + othersList.length,
      };
    };

    //const tokens = expr.replace(/\s+/g, "").match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/)/g) || [];
    let tokens =
      expr
        .replace(/\s+/g, "")
        .match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\,|\^)/g) || [];
    if (tokens.length === 0) {
      throw new Error("There is no expression");
    }
    formatting(tokens);
    const cal = (tokenExpr) => {
      let i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (allCanUseSigns.includes(a)) {
            if (isNaN(b)) {
              throw new Error("You can't use '+' or '-' in that way");
            }
            tokenExpr.splice(i, 2, tokenExpr[i] + b);
          } else {
            i++;
          }
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
          if (canUseQuantityNames.includes(tokenExpr[i])) {
            i--;
            continue;
          }
          if (!canUseFuncNames.includes(tokenExpr[i])) {
            throw new Error("There are unknown functions: " + tokenExpr[i]);
          }
          if (isNaN(+tokenExpr[i + 1])) {
            throw new Error("There is no number behind the function");
          }
          let value = [];
          for (
            let m = i + 1;
            !canUseSigns.includes(tokenExpr[m]) &&
            !canUseFuncNames.includes(tokenExpr[m]) &&
            m < tokenExpr.length;
            m++
          ) {
            value.push(tokenExpr[m]);
          }
          const valueLength = value.length;
          for (let i = 0; i < value.length; i++) {
            if (isNaN(+value[i])) {
              value.splice(i, 1);
              console.log("value: " + value);
            }
          }
          if (
            canUseFunc[tokenExpr[i]].toolFunc.checkValueAmount(value) === false
          ) {
            if (canUseFunc[tokenExpr[i]].unit.length === 1) {
              value = [value[0]];
            } else {
              throw new Error(
                `There should be ${
                  canUseFunc[tokenExpr[i]].unit.length
                } number after the function ${tokenExpr[i]}, but there are ${
                  value.length
                }`
              );
            }
          }
          let funcResult = canUseFunc[tokenExpr[i]].func(value);
          funcResult = conversionOfScientificNotation(funcResult);
          tokenExpr.splice(i, valueLength + 1, ...funcResult);
          console.log(`valuelength:${valueLength}`);
          console.log(`函数计算完毕,tokens为:${tokenExpr}`);
          i--;
        } else i--;
      }

      i = tokenExpr.length - 1;
      while (i >= 0) {
        if (tokenExpr[i] === "^") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (isNaN(a) || isNaN(b)) {
            throw new Error("There is no number before or after '^'");
          }
          tokenExpr.splice(
            i - 1,
            3,
            ...conversionOfScientificNotation(Math.pow(a, b))
          );
          i--;
        } else i--;
      }

      i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "*" || tokenExpr[i] === "/") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (tokenExpr[i] === "/" && b === 0) {
            throw new Error("You can't divide by 0");
          }
          if (isNaN(a) || isNaN(b)) {
            if (allCanUseSigns.includes(a) && allCanUseSigns.includes(b)) {
              throw new Error(
                "There is no can use object before or after '*' or '/'" +
                  "----------tokenExpr: " +
                  tokenExpr +
                  "tokenExpr[i - 1]: " +
                  tokenExpr[i - 1] +
                  "tokenExpr[i + 1]: " +
                  tokenExpr[i + 1]
              );
            }
          }
          let subExpr = [tokenExpr[i - 1], tokenExpr[i], tokenExpr[i + 1]];
          let j = i + 2;
          const signsInsteatOfMulAndDiv = canUseSigns.filter(
            (sign) => sign !== "*" && sign !== "/"
          );
          while (
            !signsInsteatOfMulAndDiv.includes(tokenExpr[j]) &&
            j < tokenExpr.length &&
            tokenExpr[j]
          ) {
            subExpr.push(tokenExpr[j]);
            j++;
            continue;
          }
          tokenExpr.splice(
            i - 1,
            subExpr.length,
            evalSubExprMulAndDiv(subExpr).result
          );
          console.log(`subExpr: ${subExpr}`);
          i += evalSubExprMulAndDiv(subExpr).totalLength - 1;
        } else i++;
      }

      i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
          const a = +tokenExpr[i - 1],
            b = +tokenExpr[i + 1];
          if (isNaN(a) || isNaN(b)) {
            if (allCanUseSigns.includes(a) && allCanUseSigns.includes(b)) {
              throw new Error(
                "There is no can use object before or after '+' or '-'"
              );
            }
          }
          let subExpr = [tokenExpr[i - 1], tokenExpr[i], tokenExpr[i + 1]];
          let j = i + 2;
          const signsInsteatOfMulAndDiv = canUseSigns.filter(
            (sign) => sign !== "+" && sign !== "-"
          );
          while (
            !signsInsteatOfMulAndDiv.includes(tokenExpr[j]) &&
            j < tokenExpr.length &&
            tokenExpr[j]
          ) {
            subExpr.push(tokenExpr[j]);
            j++;
            continue;
          }
          tokenExpr.splice(
            i - 1,
            subExpr.length,
            evalSubExprAddAndSub(subExpr)
          );
          i += evalSubExprMulAndDiv(subExpr).totalLength - 1;
        } else i++;
      }
      for (let i = 0; i < tokenExpr.length; i++) {
        if (tokenExpr[i] === ",") {
          tokenExpr.splice(i, 1);
        }
      }
      // return tokenExpr.length === 1 ? [String(tokenExpr)] : tokenExpr;
      return tokenExpr;
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
        const subExpr = tokens.slice(i + 1, n);
        if (canUseFuncNames.includes(tokens[i - 1])) {
          // 处理函数调用：func(expression)
          const result = cal([tokens[i - 1], ...cal(subExpr)]);
          tokens.splice(i - 1, n - i + 2, ...result);
          i -= 2;
          console.log(`----tokens: ${tokens}`);
          continue;
        } else {
          // 处理普通括号：(expression)
          const result = cal(subExpr);
          tokens.splice(i, n - i + 1, ...result);
          i--;
          console.log(`----括号前没有函数 : tokens: ${tokens}`);
          continue;
        }
      }
    }
    if (tokens.length === 1) {
      console.log(`----最终结果 : tokens: ${tokens[0]}`);
      return tokens[0];
    } else {
      const finalResult = cal(tokens);
      console.log(`----最终结果 : tokens: ${finalResult}`);
      return finalResult;
    }
  } catch (e) {
    return e.message;
  }
}
