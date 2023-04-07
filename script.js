"use strict";

// first all js get compile and then executed

// Never use secret api on frontend just save it secretly somewhere
let totalTry = 10;

const btn = document.querySelector(".btn");
const audioElement = document.querySelector("audio");

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  // VoiceRSS Speech Parameters

  VoiceRSS.speech({
    key: "9337830151134e07a571998a8e52763a",
    src: jokeString,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJoke() {
  try {
    const apiUrl =
      "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist";
    toggleBtnDisabled();
    const res = await fetch(apiUrl);
    const response = await res.json();

    console.log(response)
    let joke;
    if (response.joke) joke = response.joke;
    if (response.setup) joke = `${response.setup}...${response.delivery}`;
    joke = "my name is lorem"

    tellMe(joke);
  } catch (err) {
    console.log(err);
    totalTry--;
    if (totalTry > 0) getJoke();
    else throw new Error("Bro you got a serious error");
  }
}

function toggleBtnDisabled() {
  btn.disabled = !btn.disabled;
}

audio.addEventListener("ended", toggleBtnDisabled);

btn.addEventListener("click", getJoke);
