import {
  settings,
  canUseUnit,
  canUseFunc,
  canUseFuncNames,
  canUseSigns,
  allCanUseSigns,
  allOperators,
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
      let i = tokenExpr.length - 1;
      while (i >= 0) {
        if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
          if (
            (allOperators.includes(tokenExpr[i - 1]) || !tokenExpr[i - 1]) && //前面是运算符号或没有值
            !isNaN(+tokenExpr[i + 1]) //并且后面是个数字
          ) {
            tokenExpr.splice(i, 2, tokenExpr[i] + tokenExpr[i + 1]);
            i--;
            continue;
          } else {
            i--;
          }
        } else {
          i--;
        }
      }

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
      let tokens = [...subExpr];
      formatting(tokens);
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
          if (canUseSigns.includes(tokens[i - 1]) && tokens[i - 1]) {
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
      if (canUseSigns.includes(numList[0])) {
        numList.unshift("1");
      }
      if (
        !canUseSigns.includes(othersList[0]) &&
        othersList[0] &&
        numList.length !== 0
      ) {
        othersList.unshift("*");
      }
      for (let i = 0; i < numList.length; i++) {
        if (numList[i] === "*" || numList[i] === "/") {
          const a = +numList[i - 1],
            b = +numList[i + 1];
          if (numList[i] === "/" && numList[i + 1] === "0") {
            throw new Error("You can't divide by 0");
          }
          if (isNaN(a) || isNaN(b)) {
            if (
              allOperators.includes(numList[i + 1]) ||
              allOperators.includes(numList[i - 1]) ||
              !numList[i - 1] ||
              !numList[i + 1]
            ) {
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
      const finalResult = `${numResult}${othersList.join("")}`;
      return {
        result: finalResult,
        // totalLength: numList.length + othersList.length,
        totalLength: 1,
      };
    };

    const evalSubExprAddAndSub = (subExpr) => {
      let tokens = [...subExpr];
      formatting(tokens);
      let numList = [];
      let othersList = [];
      for (let i = tokens.length - 1; i >= 0; i--) {
        if (
          (!isNaN(+tokens[i]) || tokens[i] === "+" || tokens[i] === "-") &&
          tokens[i]
        ) {
          numList.unshift(tokens[i]);
          continue;
        } else {
          if (canUseSigns.includes(tokens[i - 1]) && tokens[i - 1]) {
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
      console.log("FIRST numList: " + numList);
      console.log("FIRST othersList: " + othersList);
      if (canUseSigns.includes(numList[0])) {
        numList.unshift("0");
      }
      if (
        !canUseSigns.includes(othersList[0]) &&
        othersList[0] &&
        numList.length !== 0
      ) {
        othersList.unshift("+");
      }
      for (let i = 0; i < numList.length; i++) {
        if (numList[i] === "+" || numList[i] === "-") {
          const a = +numList[i - 1],
            b = +numList[i + 1];
          if (isNaN(a) || isNaN(b)) {
            if (
              allOperators.includes(numList[i + 1]) ||
              allOperators.includes(numList[i - 1]) ||
              !numList[i - 1] ||
              !numList[i + 1]
            ) {
              throw new Error(
                "There is no can use object before or after '+' or '-'" +
                  "numList: " +
                  numList +
                  "subExpr: " +
                  subExpr
              );
            }
          }
          numList.splice(i - 1, 3, numList[i] === "+" ? a + b : a - b);
          i--;
          continue;
        }
      }

      //将numList和othersList组合在一起
      // let newTokens = [...numList, ...othersList];

      // for (let i = 0; i < othersList.length; i++) {
      //   othersList.splice(
      //     i,
      //     1,
      //     ...(othersList[i].match(
      //       /(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\,|\^)/g
      //     ) || [])
      //   );
      // }
      // formatting(othersList);
      // let actualToken = [];
      // for (let i = othersList.length - 1; i >= 0; i--) {
      //   actualToken.unshift(othersList[i]);
      // }

      console.log("numList: " + numList);
      console.log("otherList: " + othersList);
      const numResult = numList.join("");
      const finalResult = `${numResult}${othersList.join("")}`;
      console.log("finalResult: " + finalResult);
      return {
        result: finalResult,
        // totalLength: numList.length + othersList.length,
        totalLength: 1,
      };
    };

    //const tokens = expr.replace(/\s+/g, "").match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/)/g) || [];
    let tokens =
      expr.match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\,|\^)/g) || [];
    if (tokens.length === 0) {
      throw new Error("There is no expression");
    }
    formatting(tokens);
    console.log("+++++tokens: " + tokens);
    const cal = (tokenExpr) => {
      let i = tokenExpr.length - 1;
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
          console.log("---------tokenExpr" + tokenExpr);
          console.log("canUseSigns: " + canUseSigns);
          for (
            let m = i + 1;
            !canUseSigns.includes(tokenExpr[m]) &&
            !canUseFuncNames.includes(tokenExpr[m]) &&
            m < tokenExpr.length;
            m++
          ) {
            value.push(tokenExpr[m]);
          }
          console.log("---------111value: " + value);
          let valueLength = value.length;
          for (let m = 0; m < value.length; m++) {
            if (isNaN(+value[m])) {
              value.splice(m, 1);
            }
          }
          console.log("---------value: " + value);
          if (
            canUseFunc[tokenExpr[i]].toolFunc.checkValueAmount(value) === false
          ) {
            if (canUseFunc[tokenExpr[i]].unit.length === 1) {
              value = [value[0]];
              valueLength = 1;
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
          console.log("hello");
          let subExpr = [tokenExpr[i]];
          let j = i + 1;
          let spliceStart = i;
          if (tokenExpr[i - 1]) {
            subExpr.unshift(tokenExpr[i - 1]);
            spliceStart--;
          }
          if (tokenExpr[i + 1]) {
            subExpr.push(tokenExpr[i + 1]);
            j++;
          }
          const signsInsteatOfMulAndDiv = allCanUseSigns.filter(
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
          const resultObj = evalSubExprMulAndDiv(subExpr);
          tokenExpr.splice(spliceStart, subExpr.length, resultObj.result);
          console.log("乘法计算完毕tokenExpr: " + tokenExpr);
          i += resultObj.totalLength - 1;
          console.log(
            "乘法计算完毕resultObj.totalLength: " + resultObj.totalLength
          );
          console.log("乘法计算完毕i: " + i);
        } else i++;
      }

      i = 0;
      while (i < tokenExpr.length) {
        if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
          // let subExpr = [tokenExpr[i - 1], tokenExpr[i], tokenExpr[i + 1]];
          let subExpr = [tokenExpr[i]];
          let j = i + 1;
          let spliceStart = i;
          if (tokenExpr[i - 1]) {
            subExpr.unshift(tokenExpr[i - 1]);
            spliceStart--;
          }
          if (tokenExpr[i + 1]) {
            subExpr.push(tokenExpr[i + 1]);
            j++;
          }

          // let j = i + 2;
          const signsInsteatOfMulAndDiv = allCanUseSigns.filter(
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
          // for (let i = 0; i < subExpr.length; i++) {
          //   if (!subExpr[i]) {
          //     subExpr.splice(i, 1);
          //   }
          // }
          const resultObj = evalSubExprAddAndSub(subExpr);
          tokenExpr.splice(spliceStart, subExpr.length, resultObj.result);
          console.log(`----------tokens: ${tokenExpr}`);
          i += resultObj.totalLength - 1;
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
          continue;
        } else {
          // 处理普通括号：(expression)
          console.log(`----括号前没有函数 : subExpr: ${subExpr}`);
          const result = cal(subExpr);
          tokens.splice(i, n - i + 1, ...result);
          i--;
          console.log(`----括号前没有函数 : tokens: ${tokens}`);
          continue;
        }
      }
    }
    if (
      tokens.length === 1 &&
      tokens[0] &&
      !allCanUseSigns.includes(tokens[0])
    ) {
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
