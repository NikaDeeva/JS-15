"use strict";
const countryInput = document.querySelector("#country");
const list = document.querySelector("#countriesList");

countryInput.addEventListener("input", _.debounce(() => {
    const country = countryInput.value.trim();
    if (country.length === 1) {
      alert("Write a more specific search");
      return;
    }
    renderList(country);
  }, 500)
);

function renderList(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then((data) => {
      list.innerHTML = ""; 

      if (data.length === 1) {
        renderOneCountry(data[0]);
      } else {
        const correspondeds = data
          .map((item) => `<li>${item.name.common}</li>`)
          .join("");
        list.insertAdjacentHTML("beforeend", correspondeds);
      }
    })
    .catch((error) => {
      console.error(error);
      list.innerHTML = "<li>No matching countries found</li>";
    });
}

function renderOneCountry(country) {
  const languages = Object.values(country.languages).join(", "); 

  const markUp = `
    <h2 class="countryDataName">${country.name.common}</h2>
    <div class="countryData">
      <ul class="countryDataList">
        <li class="countryDataItem"><b>Capital:</b> ${country.capital} </li>
        <li class="countryDataItem"><b>Population:</b> ${country.population}</li>
        <li class="countryDataItem"><b>Languages:</b> ${languages}</li>
      </ul>
      <img class="countryFlag" src="${country.flags.png}" alt="Flag of ${country.name.common}">
    </div>
  `;

  list.innerHTML = markUp; 
}

