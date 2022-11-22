"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    try {
      const data = await fetch("/getAll");
      const dogs = await data.json();
      const resultArea = document.getElementById("results");
      for (let dog of dogs) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(dog.number));
        tr.appendChild(createCell(dog.name));
        tr.appendChild(createCell(dog.breed));
        tr.appendChild(createCell(dog.length));
        tr.appendChild(createCell(dog.weightKg));
        resultArea.appendChild(tr);
      }
    } catch (err) {
      document.getElementById(
        "errorMessage"
      ).innerHTML = `<p class="error">${err.message}</p>`;
    }
  }
  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
