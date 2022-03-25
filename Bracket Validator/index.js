const setStatus = (val) => {
  const box = document.getElementById("info_box");

  box.innerText = val;
};

const validate = (e) => {
  let ex = document.getElementById("expression").value;

  if (ex == "") {
    setStatus("Expression Not Detected \n⭕ Enter The Expression ⭕");
    return 0;
  }

  if (/[\[\]\{\}]/g.test(ex)) {
    setStatus("In valid Parenthasis\nonly '(' and ')' is accepted");
    return 0;
  }

  let bracket = [];

  for (let i of ex) {
    if (i == "(") bracket.push(1);
    else if (i == ")") {
      if (bracket.length == 0) {
        bracket.push(1);
        break;
      }
      bracket.pop();
    }
  }
  if (bracket.length != 0)
    setStatus("Wrong Expression\n❌ Unclosed Paranthesis ❌");
  else setStatus("Right Expression\n👉 Closed Paranthesis 👈");
};

window.onload = () => {
  document.getElementById("validate_btn").addEventListener("click", validate);
};
