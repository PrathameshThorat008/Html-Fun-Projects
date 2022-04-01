const convert = () => {
  const string = document.getElementById("string").value;
  const base = document.getElementById("base_str");

  base.value = btoa(string);
};

window.onload = () => {
  document.getElementById("convert").addEventListener("click", convert);
};
