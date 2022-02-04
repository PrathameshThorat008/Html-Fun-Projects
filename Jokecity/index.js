async function fetchJoke() {
  let jokeBox = document.getElementById("jokebox");
  let lang = document.getElementById("lang").value;
  let type = document.getElementById("type").value;
  let category = document.getElementById("category").value;

  jokeBox.className = "none";
  jokeBox.innerText = "\nFetching ...\n\n";

  try {
    let data = await fetch(
      `https://v2.jokeapi.dev/joke/${category}` +
        "?lang=" +
        lang +
        (type != "both" ? "&type=" + type : "")
    );
    let joke = await data.json();

    if (joke.error) {
      jokeBox.innerText = `\n${joke.message}\n\nTry by changing Type and Category\n\n`;
      return;
    }

    jokeBox.innerHTML = "<h2 align='center'>" + joke.type + "</h2><br>";

    jokeBox.className = joke.type;
    if (joke.type == "single") {
      let arr = joke.joke.split("\n");
      for (let i = 0; i < arr.length; i++) {
        let a = (document.createElement("div").innerText = arr[i]);
        jokeBox.append(a);
        jokeBox.innerHTML += "<br>";
      }
      jokeBox.innerHTML += "<br>";
      return;
    }

    jokeBox.innerHTML += "<b>A : </b>";
    let a = (document.createElement("div").innerText = joke.setup);
    jokeBox.append(a);
    jokeBox.innerHTML += "<br><br><b>B : </b>";
    let b = (document.createElement("div").innerText = joke.delivery);
    jokeBox.append(b);
    jokeBox.innerHTML += "<br><br>";
  } catch {
    jokeBox.innerText = "\nError !\n check yout Internet and try again ...\n\n";
  }
}

window.onload = () => {
  fetchJoke();
};
