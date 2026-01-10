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
      numList.splice(
        i - 1,
        3,
        numList[i] === "*" ? String(a * b) : String(a / b)
      );
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
    if (!isNaN(tokenExpr[i + 1]) && !canUseFuncNames.includes(tokenExpr[i])) {
      tokenExpr.splice(i + 1, 0, "*");
      i++;
    }
  }
  return tokenExpr;
};

const combineMul = (tokens) => {
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      let subExpr = [tokens[i]];
      let j = i + 1;
      let spliceStart = i;
      if (tokens[i - 1]) {
        subExpr.unshift(tokens[i - 1]);
        spliceStart--;
      }
      if (tokens[i + 1]) {
        subExpr.push(tokens[i + 1]);
        j++;
      }
      const signsInsteatOfMulAndDiv = allCanUseSigns.filter(
        (sign) => sign !== "*" && sign !== "/"
      );
      while (
        !signsInsteatOfMulAndDiv.includes(tokens[j]) &&
        j < tokens.length &&
        tokens[j]
      ) {
        subExpr.push(tokens[j]);
        j++;
        continue;
      }
      tokens.splice(spliceStart, subExpr.length, subExpr.join(""));
      continue;
    } else i++;
  }
};

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
          allOther = allOther.join("*");
          allOther = "*" + allOther;
          const result = togetherNum.join("") + allOther;
          allResult.push(togetherSym);
          allResult.push(result);
        }
      }
    }
  }
  return allResult;
};

const finalFormatting = (tokens) => {
  tokens = tokens.join("");
  tokens = tokens.match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\,|\^)/g) || [];
  formatting(tokens);
  combineMul(tokens);
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].includes("*") || tokens[i].includes("/")) {
      let final;
      for (let j = tokens[i].length - 1; j >= 0; j--) {
        if (!isNaN(tokens[i][j])) {
          const number = tokens[i].slice(0, j + 1);
          const others = tokens[i].slice(j + 1);
          const result = mulOrDivFunc(
            number.match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\,|\^)/g) || []
          );
          if (result.length === 1 && result[0] === "0") {
            final = "0";
            break;
          }
          if (result.length === 1 && result[0] === "1" && others[0] === "*") {
            final = others.slice(1);
            break;
          }
          final = result.join("") + others;
          break;
        }
      }
      if (final) {
        tokens.splice(i, 1, final);
      }
    }
  }
  console.log(tokens);
  tokens = tokens.join("");
  tokens = tokens.replace(/\+0|0\+/g, "");
  tokens = tokens.replace(/^0\-/g, "-");
  return tokens;
};

console.log(finalFormatting(["0-7*e+1*1*1*e*e+0*67/Pi"]));
