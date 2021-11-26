// Created By Prathamesh Thorat

window.onload = () => {
  const secHand = document.querySelector(".sec");
  const minHand = document.querySelector(".min");
  const hourHand = document.querySelector(".hour");

  setInterval(() => {
    let date = new Date();

    let ms = date.getMilliseconds();
    let sec = date.getSeconds() + ms / 1000;
    let min = date.getMinutes() + sec / 60;
    let hour = date.getHours() + min / 60;

    secHand.style.transform = `translateY(-50%) rotate(${sec * 6}deg)`;
    minHand.style.transform = `translateY(-50%) rotate(${min * 6}deg)`;
    hourHand.style.transform = `translateY(-50%) rotate(${hour * 30}deg)`;
  }, 1);
};
