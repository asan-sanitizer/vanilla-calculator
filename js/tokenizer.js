export default function tokenize(input) {
  if (input != null || input != undefined) {
    var tokens = [];
    for (var i = 0; i < input.length; i++) {
      while (input[i] == ' ' || input[i] == '\t') i += 1;

      if (input[i] == '+') {
        tokens.push({type: 'ADD_OP', value: input[i]});
      } else if (input[i] == '-') {
        tokens.push({type: 'SUB_OP', value: input[i]});
      } else if (input[i] == '*') {
        tokens.push({type: 'MUL_OP', value: input[i]});
      } else if (input[i] == '/') {
        tokens.push({type: 'DIV_OP', value: input[i]});
      } else if (input[i] == '(') {
        tokens.push({type: 'L_PARAN', value: input[i]});
      } else if (input[i] == ')') {
        tokens.push({type: 'R_PARAN', value: input[i]});
      } else if (isDigit(input[i])) {
        var res = '';
        do {
          res += input[i];
          i += 1;
        } while (isDigit(input[i]) && i < input.length);
        tokens.push({type: 'NUMBER_LITERAL', value: parseFloat(res)});
      } else if (input[i] >= "a" && input[i] <= "z") {
        var res = '';
        do {
          res += input[i];
          console.log("tokenize(input) -> res ", res);
          i += 1;
        } while (input[i] >= 'a' && input[i] <= 'z' && i < input.length);

        if (res == 'sin') {
          tokens.push({type: 'SIN_OP', value: res});
        } else if (res == 'cos') {
          tokens.push({type: 'COS_OP', value: res});
        } else {
          tokens.push({type: 'IDENTIFIER_LITERAL', value: res});
        }
      } else {
        const msg = 'Unknown token found ' + input[i];
        throw new Error(msg);
      }
    }
    return tokens;
  }
}

let isDigit = (ch) => {
  return !isNaN(ch - parseFloat(ch));
}

let isChar = (ch) => {
  return ch <= 'a' && ch <= 'z';
}
