import Parser from '/js/parser.js';

function evaluate() {
  console.log("Evaluate()");
  let input_text = document.getElementById("expression_input").value;
  console.log(input_text);
  if (input_text == null || input_text == undefined) {
    throw new Error("Input is empty");
  }
  let parser = new Parser(input_text);
  console.log(" tokens ", parser.tokens);

  let result = document.getElementById("result");
  result.value = parser.parse_exp();
}

document.getElementById("evaluateBtn").addEventListener("click", evaluate);
