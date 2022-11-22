"use strict";

(function () {
  let numberField;
  let nameField;
  let breedField;
  let lengthField;
  let weightField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    breedField = document.getElementById("breed");
    lengthField = document.getElementById("length");
    weightField = document.getElementById("weight");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessageArea();
    const dog = {
      number: numberField.value,
      name: nameField.value,
      breed: breedField.value,
      length: lengthField.value,
      weightKg: weightField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(dog),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/add", options);
      const resultJson = await data.json();
      if (resultJson.message) {
        updateMessageArea(resultJson.message, resultJson.type);
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
