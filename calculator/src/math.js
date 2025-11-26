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
    let firstAddOrMinusPosi = Math.min(
      tokens.indexOf("+"),
      tokens.indexOf("-")
    );
    let firstPosition = Math.min(tokens.indexOf("+"), tokens.indexOf("-"));
    let minusSignSet = [];
    if (tokens[firstAddOrMinusPosi] === "-" && firstAddOrMinusPosi !== -1) {
      minusSignSet.push(tokens[firstPosition]);
    }
    if (firstAddOrMinusPosi !== -1) {
      while (
        tokens[firstAddOrMinusPosi + 1] === "+" ||
        tokens[firstAddOrMinusPosi + 1] === "-"
      ) {
        if (tokens[firstAddOrMinusPosi + 1] === "-") {
          minusSignSet.push(tokens[firstAddOrMinusPosi++ + 1]);
        } else {
          firstAddOrMinusPosi++;
        }
      }
    }
    if (minusSignSet.length % 2 !== 0) {
      tokens.splice(
        firstPosition,
        firstAddOrMinusPosi - firstPosition + 1,
        "-"
      );
    } else {
      tokens.splice(
        firstPosition,
        firstAddOrMinusPosi - firstPosition + 1,
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
          tokenExpr.includes("sqrt") ||
          tokenExpr.includes("log") ||
          tokenExpr.includes("ln") ||
          tokenExpr.includes("abs") ||
          tokenExpr.includes("floor") ||
          tokenExpr.includes("ceil") ||
          tokenExpr.includes("round") ||
          tokenExpr.includes("exp") ||
          tokenExpr.includes("asin") ||
          tokenExpr.includes("acos") ||
          tokenExpr.includes("atan")
        ) {
          //   let i = 0;
          //   while (i < tokenExpr.length)
          for (let i = 0; i < tokenExpr.length; i++) {
            if (
              tokenExpr[i] === "sin" ||
              tokenExpr[i] === "cos" ||
              tokenExpr[i] === "tan" ||
              tokenExpr[i] === "cot" ||
              tokenExpr[i] === "sqrt" ||
              tokenExpr[i] === "log" ||
              tokenExpr[i] === "ln" ||
              tokenExpr[i] === "abs" ||
              tokenExpr[i] === "floor" ||
              tokenExpr[i] === "ceil" ||
              tokenExpr[i] === "round" ||
              tokenExpr[i] === "exp" ||
              tokenExpr[i] === "asin" ||
              tokenExpr[i] === "acos" ||
              tokenExpr[i] === "atan"
            ) {
              const funcName = tokenExpr[i];
              if (tokenExpr[i + 1] === undefined) {
                return "you can't use function at the end";
              }

              if (isNaN(+tokenExpr[i + 1])) {
                return "you can't use function in that way";
              }

              const value = +tokenExpr[i + 1];
              let result;

              switch (funcName) {
                case "sin": {
                  const radians = (value / 180) * Math.PI;
                  result = Math.sin(radians).toString();
                  break;
                }
                case "cos": {
                  const radians = (value / 180) * Math.PI;
                  result = Math.cos(radians).toString();
                  break;
                }
                case "tan": {
                  const radians = (value / 180) * Math.PI;
                  result = Math.tan(radians).toString();
                  break;
                }
                case "cot": {
                  const radians = (value / 180) * Math.PI;
                  result = (1 / Math.tan(radians)).toString();
                  break;
                }
                case "sqrt":
                  if (value < 0) return "square root of negative number";
                  result = Math.sqrt(value).toString();
                  break;
                case "log":
                  if (value <= 0) return "logarithm of non-positive number";
                  result = Math.log10(value).toString();
                  break;
                case "ln":
                  if (value <= 0)
                    return "natural logarithm of non-positive number";
                  result = Math.log(value).toString();
                  break;
                case "abs":
                  result = Math.abs(value).toString();
                  break;
                case "floor":
                  result = Math.floor(value).toString();
                  break;
                case "ceil":
                  result = Math.ceil(value).toString();
                  break;
                case "round":
                  result = Math.round(value).toString();
                  break;
                case "exp":
                  result = Math.exp(value).toString();
                  break;
                case "asin": {
                  if (value < -1 || value > 1)
                    return "asin input out of range [-1, 1]";
                  const radians = Math.asin(value);
                  result = ((radians * 180) / Math.PI).toString();
                  break;
                }
                case "acos": {
                  if (value < -1 || value > 1)
                    return "acos input out of range [-1, 1]";
                  const radians = Math.acos(value);
                  result = ((radians * 180) / Math.PI).toString();
                  break;
                }
                case "atan": {
                  const radians = Math.atan(value);
                  result = ((radians * 180) / Math.PI).toString();
                  break;
                }
              }

              tokenExpr.splice(i, 2, result);
              i--; // Adjust index since we modified the array
            }
          }
        }
        // 处理加减乘除
        for (let i = 0; i < tokenExpr.length; i++) {
          if (tokenExpr[i] === "*" || tokenExpr[i] === "/") {
            // 检查边界条件
            if (i === 0 || i === tokenExpr.length - 1) {
              return "Invalid expression";
            }

            const a = +tokenExpr[i - 1];
            const b = +tokenExpr[i + 1];

            // 检查操作数是否为有效数字
            if (isNaN(a) || isNaN(b)) {
              return "Invalid operands";
            }

            if (tokenExpr[i] === "/" && b === 0) return "Division by zero";
            tokenExpr.splice(
              i - 1,
              3,
              (tokenExpr[i] === "*" ? a * b : a / b).toString()
            );
            i -= 2; // Adjust index since we modified the array
          }
        }

        for (let i = 0; i < tokenExpr.length; i++) {
          if (tokenExpr[i] === "+" || tokenExpr[i] === "-") {
            // 检查边界条件
            if (i === 0 || i === tokenExpr.length - 1) {
              return "Invalid expression";
            }

            const a = +tokenExpr[i - 1];
            const b = +tokenExpr[i + 1];

            // 检查操作数是否为有效数字
            if (isNaN(a) || isNaN(b)) {
              return "Invalid operands";
            }

            tokenExpr.splice(
              i - 1,
              3,
              (tokenExpr[i] === "+" ? a + b : a - b).toString()
            );
            i -= 2; // Adjust index since we modified the array
          }
        }

        if (tokenExpr.length !== 1) {
          return undefined; // 明确返回 undefined
        } else {
          return String(tokenExpr[0]);
        }
      } catch (e) {
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
        if (result === undefined) {
          return "calculation error in brackets";
        }
        if (!isNaN(+result)) {
          tokens.splice(m, n - m + 1, result);
        } else {
          return result; // Return the error message
        }
      }
    }

    const finalResult = calc(tokens);
    if (finalResult === undefined) {
      return "the final result is undefined";
    }
    return Number(Number(finalResult).toFixed(5));
  } catch (error) {
    return `There is something wrong.The error is ${error}`;
  }
}
