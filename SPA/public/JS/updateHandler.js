"use strict";

(function () {
  let inputField;
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

    inputField = document.getElementById("searchNumber");
    document.getElementById("submit").addEventListener("click", send);
    document.getElementById("update").addEventListener("click", update);
  }

  async function send() {
    clearMessageArea();
    const number = inputField.value;

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ number }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/getOne", options);
      const resultJson = await data.json();
      updatePage(resultJson);
    } catch (err) {
      updateMessageArea(err.message);
    }
  }

  function updatePage(result) {
    if (result) {
      if (result.message) {
        updateMessageArea(result.message, result.type);
      } else {
        updateDog(result);
      }
    } else {
      updateMessageArea("Not found");
    }
  }

  function updateDog(dog) {
    numberField.value = dog.number;
    nameField.value = dog.name;
    breedField.value = dog.breed;
    lengthField.value = dog.length;
    weightField.value = dog.weightKg;
  }

  async function update() {
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
      const data = await fetch("/update", options);
      const resultJson = await data.json();
      if (resultJson.message) {
        updateMessageArea(resultJson.message, resultJson.type);
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
