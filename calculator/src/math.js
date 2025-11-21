import { canUseSign, canUseFunc } from "./mainInformation.js";
export function evaluateExpression(expression) {
  try {
    const tokens =
      expression
        .replace(/\s+/g, "")
        .match(/(\d+\.?\d*|[a-zA-Z]+|\+|\-|\*|\/|\(|\))/g) || [];
    //判定返回 null：
    //若有非法函数，返回 null
    const funcInExpr = expression.replace(/\s+/g, "").match(/[a-zA-Z]+/g);
    if (funcInExpr) {
      for (let i = 0; i < funcInExpr?.length; i++) {
        if (!canUseFunc.includes(funcInExpr[i])) {
          return "you have a wrong function";
        }
      }
    }
    //若左括号和右括号数量不一样，返回null
    const leftBracket = expression.replace(/\s+/g, "").match(/\(/g);
    const rightBracket = expression.replace(/\s+/g, "").match(/\)/g);
    if (leftBracket?.length !== rightBracket?.length) {
      return "tour brackets are not equal";
    }
    //若函数后没有括号，返回 null
    for (let i = 0; i < tokens.length; i++) {
      if (/[a-zA-Z]+/.test(tokens[i])) {
        if (tokens[i + 1] !== "(") {
          return "your function must have a bracket";
        }
      }
    }
    //下写有关符号的返回null
    //定义isObj函数（关键）
    //obj，指数字，函数
    const isObj = (body) => {
      if (!isNaN(+body)) {
        return true;
      } else if (/[a-zA-Z]+/.test(body)) {
        return true;
      } else {
        return false;
      }
    };
    //定义是否是符号函数
    const isSign = (body) => {
      if (/\+|\-|\*|\//.test(body)) {
        return true;
      } else {
        return false;
      }
    };
    //‘+’为一元运算符（后面必跟 obj），也是二元运算符（前后必跟 obj）
    //‘-’为一元运算符（后面必跟 obj），也是二元运算符（前后必跟 obj）
    //总之，‘+’和‘-’前面不一定要跟 obj 或‘+’，‘-’符，但后面一定要跟 obj 或‘+’，‘-’符
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "+" || tokens[i] === "-") {
        if (tokens[i + 1] === undefined) {
          return `the sign can't be at the end('+' and '-') the tokens is ${tokens}`;
        } else if (!isObj(tokens[i + 1])) {
          if (tokens[i + 1] !== "+" && tokens[i + 1] !== "-") {
            return `you can't concat a sign with that('+' and '-')  the tokens is ${tokens}`;
          }
        }
      }
    }
    //‘*’和‘/’较为特殊，它们正常情况下前后都必要跟obj，但它们后面也可以跟‘+’或‘-’
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "*" || tokens[i] === "/") {
        if (tokens[i + 1] === undefined) {
          return "the sign can't be at the end('*' and '/')";
        } else if (tokens[i - 1] === undefined) {
          return "the sign can't be at the start('*' and '/')";
        } else if (!isObj(tokens[i - 1])) {
          return "you can't concat a sign with that('*' and '/')";
        } else if (!isObj(tokens[i + 1])) {
          if (tokens[i + 1] !== "+" && tokens[i + 1] !== "-") {
            return "you can't concat a sign with that('*' and '/')";
          }
        }
      }
    }

    //格式化
    //多个加减合并（关键）
    let fitstAddOrMinusPosi = Math.min(
      tokens.indexOf("+"),
      tokens.indexOf("-")
    );
    let firstPosition = Math.min(tokens.indexOf("+"), tokens.indexOf("-"));
    let minusSignSet = [];
    if (tokens[fitstAddOrMinusPosi] === "-" && fitstAddOrMinusPosi !== -1) {
      minusSignSet.push(tokens[firstPosition]);
    }
    if (fitstAddOrMinusPosi !== -1) {
      while (
        tokens[fitstAddOrMinusPosi + 1] === "+" ||
        tokens[fitstAddOrMinusPosi + 1] === "-"
      ) {
        if (tokens[fitstAddOrMinusPosi + 1] === "-") {
          minusSignSet.push(tokens[fitstAddOrMinusPosi++ + 1]);
        } else {
          fitstAddOrMinusPosi++;
        }
      }
    }
    if (minusSignSet.length % 2 !== 0) {
      tokens.splice(
        firstPosition,
        fitstAddOrMinusPosi - firstPosition + 1,
        "-"
      );
    } else {
      tokens.splice(
        firstPosition,
        fitstAddOrMinusPosi - firstPosition + 1,
        "+"
      );
    }

    //一元加减符合并
    for (let i = 0; i < tokens.length; i++) {
      if (
        (tokens[i] === "-" || tokens[i] === "+") &&
        (!isObj(tokens[i - 1]) ||
          tokens[i - 1] === "*" ||
          tokens[i - 1] === "/")
      ) {
        if (!isNaN(+tokens[i + 1])) {
          tokens.splice(i, 2, tokens[i] + tokens[i + 1]);
        } else if (/[a-zA-Z]+/.test(tokens[i + 1])) {
          if (tokens[i] === "-") {
            tokens.splice(i, 1, "-1", "*");
          } else {
            tokens.splice(i, 1, "1", "*");
          }
        }
      }
    }

    const calc = (tokenExpr) => {
      try {
        if (!tokenExpr || tokenExpr.length === 0) {
          return "0"; // 空表达式返回 0
        }

        if (tokenExpr.length === 1 && !isNaN(+tokenExpr[0])) {
          return String(tokenExpr[0]);
        }
        if (
          tokenExpr.includes("sin") ||
          tokenExpr.includes("cos") ||
          tokenExpr.includes("tan") ||
          tokenExpr.includes("cot") ||
          tokenExpr.includes("sqrt")
        ) {
          //   let i = 0;
          //   while (i < tokenExpr.length)
          for (let i = 0; i < tokenExpr.length; i++) {
            if (
              tokenExpr[i] === "sin" ||
              tokenExpr[i] === "cos" ||
              tokenExpr[i] === "tan" ||
              tokenExpr[i] === "cot" ||
              tokenExpr[i] === "sqrt"
            ) {
              const funcName = tokenExpr[i];
              if (tokenExpr[i + 1] !== undefined) {
                if (isNaN(+tokenExpr[i + 1])) {
                  return "yuo can't use function in that way";
                } else {
                  const radians = (+tokenExpr[i + 1] / 180) * Math.PI;
                }
              }
              switch (funcName) {
                case "sin":
                  tokenExpr.splice(i, 2, Math.sin(radians).toString());
                  break;
                case "cos":
                  tokenExpr.splice(i, 2, Math.cos(radians).toString());
                  break;
                case "tan":
                  tokenExpr.splice(i, 2, Math.tan(radians).toString());
                  break;
                case "cot":
                  tokenExpr.splice(i, 2, (1 / Math.tan(radians)).toString());
                  break;
                case "sqrt":
                  tokenExpr.splice(
                    i,
                    2,
                    Math.sqrt(+tokenExpr[i + 1]).toString()
                  );
                  break;
              }
            }
          }
        }
        // 处理加减乘除
        for (let i = 0; i < tokenExpr.length; i++) {
          if (tokenExpr[i] === "*" || tokenExpr[i] === "/") {
            const a = +tokenExpr[i - 1],
              b = +tokenExpr[i + 1];
            if (tokenExpr[i] === "/" && b === 0) return "Division by zero";
            tokenExpr.splice(
              i - 1,
              3,
              (tokenExpr[i] === "*" ? a * b : a / b).toString()
            );
          }
        }

        for (let i = 0; i < tokenExpr.length; i++) {
          if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
            const a = +tokenExpr[i - 1],
              b = +tokenExpr[i + 1];
            tokenExpr.splice(
              i - 1,
              3,
              (tokenExpr[i] === "+" ? a + b : a - b).toString()
            );
          }
        }

        if (tokenExpr.length !== 1) {
          console.log("计算过程有问题");
          console.log(tokenExpr.length);
          console.log(tokenExpr);
          return undefined; // 明确返回 undefined
        } else {
          return String(tokenExpr[0]);
        }
      } catch (e) {
        console.log(e);
        return undefined; // 出现异常时也返回 undefined
      }
    };
    // 处理括号
    for (let m = tokens.length - 1; m >= 0; m--) {
      if (tokens[m] === "(") {
        if (tokens.indexOf(")", m) === -1) {
          return "you can't use '(' without ')'";
        }
        const n = tokens.indexOf(")", m);
        const result = calc(tokens.slice(m + 1, n));
        if (!isNaN(+result)) {
          console.log("可以计算");
          tokens.splice(m, n - m + 1, result);
        }
      }
    }

    const finalResult = calc(tokens);
    if (finalResult === undefined) {
      return "the final result is undefined";
    } else if (finalResult === NaN) {
      return String(tokens);
    }
    return Number(Number(finalResult).toFixed(5));
  } catch (error) {
    return `There is something wrong.The error is ${error}`;
  }
}
