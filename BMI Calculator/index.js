/* Created By Prathamesh Thorat */

var weight;
var height;
var BMI;
var BMIStatus;
var weightInp;
var heightInp;
var BMIResult;
var BMIRange;
var BMIStatusBox;

const calculateBMI = () => {
  BMI = (weight / (height * height)).toFixed(1);

  if (BMI > 100) BMI = 100;
  BMIResult.innerText = `BMI : ${BMI}`;

  BMIRange.value = BMI * 10;

  if (BMI >= 18 && BMI <= 25) BMIStatus = "normal";
  else if (BMI < 18) BMIStatus = "underweight";
  else if (BMI > 25) BMIStatus = "overweight";

  BMIStatusBox.innerText = BMIStatus;
};

const setValues = () => {
  weight = Math.abs(weightInp.value);
  weightInp.value = weight;
  if (weight == "") weight = "1";

  height = Math.abs(heightInp.value) / 100;
  heightInp.value = height * 100;
  if (height == "") height = "1";

  calculateBMI();
};

window.onload = () => {
  weightInp = document.getElementById("weight_inp");
  heightInp = document.getElementById("height_inp");
  BMIResult = document.getElementById("bmi_result");
  BMIRange = document.getElementById("bmi_range");
  BMIStatusBox = document.getElementById("bmi_status");

  weightInp.addEventListener("input", setValues);
  heightInp.addEventListener("input", setValues);

  setValues();
};
