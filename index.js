const BASE_URL = "https://api.fastforex.io/fetch-all?api_key=2bc0edb268-337f29c03c-shu26l";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        UpdateFlag(evt.target);
    });
}

// Function to update flag based on selected currency
const UpdateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; // Fixed typo: 'contryCode' to 'countryCode'
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Added backticks for template literal
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Handle button click event for currency conversion
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) { // Fixed comparison to use '==='
        amtVal = 1;
        amount.value = "1";
    }

    console.log(fromCurr.value, toCurr.value);

    // Fixed URL construction: No need for template literal in BASE_URL
    const URL = BASE_URL;
    let response = await fetch(URL);
    let data = await response.json();

    // Fixed rate access: Use 'data.results' and access rates directly
    let fromRate = data.results[fromCurr.value.toUpperCase()];
    let toRate = data.results[toCurr.value.toUpperCase()];

    if (fromRate && toRate) {
        let rate = toRate / fromRate;
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`; // Fixed typo: 'toCurr.vlaue' to 'toCurr.value'
    } else {
        msg.innerText = 'Currency code not found';
    }
});
