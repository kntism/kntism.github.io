import {
  canUseUnit,
  canUseFunc,
  canUseFuncNames,
  canUseSigns,
  allCanUseSigns,
  allOperators,
  constantQuantity,
  canUseQuantityNames,
} from "./mainInformation.js";
//已经有的函数
const mulOrDivFunc = (numList) => {
  formatting(numList);
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
  return numList;
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
    if (!isNaN(tokenExpr[i + 1])) {
      tokenExpr.splice(i + 1, 0, "*");
      i++;
    }
  }
  return tokenExpr;
};

const findTimes = (singleToken) => {
  let variates = singleToken.match(/\*?[a-zA-Z]+/g) || [];
  return variates.length;
};

// console.log(findTimes("e*9*e*e*Pi"));

const polynomialMul = (allTokens) => {
  for (let i = 0; i < allTokens.length; i++) {
    if (allTokens[i].length === 0) {
      allTokens.splice(i, 1);
    }
  }
  if (allTokens.length === 0) {
    return [];
  }
  if (allTokens.length === 1) {
    return allTokens[0];
  }
  let allResult = [];
  for (let i = 0; i < allTokens[0].length; i++) {
    const firstSym = allTokens[0][i - 1] === "-" ? 0 : 1;
    for (let j = 0; j < allTokens[1].length; j++) {
      const secondSym = allTokens[1][j - 1] === "-" ? 0 : 1;
      const togetherSym = firstSym === secondSym ? "+" : "-";
      if (
        allTokens[0][i] !== "+" &&
        allTokens[0][i] !== "-" &&
        allTokens[1][j] !== "+" &&
        allTokens[1][j] !== "-"
      ) {
        if (!isNaN(allTokens[0][i]) && !isNaN(allTokens[1][j])) {
          const result = mulOrDivFunc([allTokens[0][i], "*", allTokens[1][j]]);
          allResult.push(togetherSym);
          allResult.push(...result);
        } else {
          let firstNum = allTokens[0][i];
          let secondNum = allTokens[1][j];
          let firstOther;
          let secondOther;
          if (isNaN(allTokens[0][i])) {
            if (!isNaN(allTokens[0][i])) {
              firstNum = allTokens[0][i].slice(0, 1);
              firstOther = allTokens[0][i].slice(1);
            } else {
              firstNum = 1;
              firstOther = allTokens[0][i];
            }
          }
          if (isNaN(allTokens[1][j])) {
            if (!isNaN(allTokens[1][j])) {
              secondNum = allTokens[1][j].slice(0, 1);
              secondOther = allTokens[1][j].slice(1);
            } else {
              secondNum = 1;
              secondOther = allTokens[1][j];
            }
          }
          let allOther = [firstOther, secondOther];
          for (let i = 0; i < allOther.length; i++) {
            if (!allOther[i]) {
              allOther.splice(i, 1);
            }
          }
          console.log(allOther);
          console.log(`firstNum: ${firstNum},  secondNum: ${secondNum}`);
          const togetherNum = mulOrDivFunc([firstNum, "*", secondNum]);
          const result = togetherNum.join("") + allOther.join("");
          allResult.push(togetherSym);
          allResult.push(result);
        }
      }
    }
  }
  return allResult;
};

console.log(polynomialMul([["4"], ["e"]]));

// const str = "3*e+4*Pi";
// console.log(str.match(/\-|\+|[^-+]+/g));
