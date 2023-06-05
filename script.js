const currencySelect = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const resultText = document.getElementById("resultText");
const clearButton = document.getElementById("clearButton");

convertButton.addEventListener("click", () => {
  const currency = currencySelect.value;
  const amount = amountInput.value;

  if (amount <= 0) {
    alert("Proszę podać liczbę większą od zera.");
    return;
  }

  const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`;

  clearResult();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.rates && data.rates.length > 0) {
        const exchangeRate = data.rates[0].mid;
        if (exchangeRate) {
          const convertedAmount = (amount * exchangeRate).toFixed(2);
          displayResult(`${amount} ${currency} = ${convertedAmount} PLN`);
        } else {
          displayError("Nie można pobrać kursu wymiany.");
        }
      } else {
        displayError("Nieprawidłowa odpowiedź z interfejsu API.");
      }
    })
    .catch((error) => {
      console.log(error);
      displayError("Wystąpił błąd. Proszę spróbować później.");
    });
});

clearButton.addEventListener("click", clearResult);

function displayResult(result) {
  resultText.textContent = result;
}

function displayError(errorMessage) {
  resultText.textContent = errorMessage;
}

function clearResult() {
  resultText.textContent = "";
  amountInput.value = "";
}
