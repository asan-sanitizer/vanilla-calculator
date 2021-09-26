import tokenize from '/js/tokenizer.js';

export default class Parser {
  constructor(input) {
    this.input = input;
    this.tokens = tokenize(input);
    this.position = 0;
  }

  get_all_tokens() { return this.tokens; }

  parse_exp() {
    let result = this.term();
    while (this.current_token().type == 'ADD_OP' ||
           this.current_token.type == 'SUB_OP') {
      let op = this.current_token().value;
      this.next_token();

      if (op == '+') {
        result += this.term();
        this.next_token();
      } else if (op == '-') {
        result -= this.term();
        this.next_token();
      }
    }

    return result;
  }

  factor() {
    let result;

    if (this.current_token().type == 'NUMBER_LITERAL') {
      result = this.current_token().value;
      this.next_token();
    } else if (this.current_token().type == 'L_PARAN') {
      this.next_token();
      result = this.parse_exp();
      this.next_token();

    } 

    return result;
  }

  term() {
    let result = this.factor();

    while (this.current_token().type == 'MUL_OP' ||
           this.current_token().type == 'DIV_OP' ||
           this.current_token().type == 'SIN_OP' ||
           this.current_token().type == 'COS_OP' ) {
      let op = this.current_token().value;
      this.next_token(); 

      if (op == '*') {
        result *= this.term();
        this.next_token();
      } else if (op == '/') {
        result /= this.term();
        this.next_token();
      } else if (op == 'sin') {
        let val = this.term();
        result = Math.sin(val);
      } else if(op == 'cos') {
        let val = this.term();
        result = Math.cos(val);
      }
    }

    return result;
  }

  next_token() {
    if (this.position < this.tokens.length - 1) {
      this.position += 1;
    }
  }

  current_token() { return this.tokens[this.position]; }
}
