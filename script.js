const currencySelect = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const resultText = document.getElementById("resultText");

convertButton.addEventListener("click", () => {
  const currency = currencySelect.value;
  const amount = amountInput.value;

  if (amount <= 0) {
    alert("Proszę podać liczbę większą od zera.");
    return;
  }

  const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.rates && data.rates.length > 0) {
        const exchangeRate = data.rates[0].mid;
        if (exchangeRate) {
          const convertedAmount = (amount * exchangeRate).toFixed(2);
          displayResult(`${amount} ${currency} = ${convertedAmount} PLN`);
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

function displayResult(result) {
  resultText.textContent = result;
}

function displayError(errorMessage) {
  resultText.textContent = errorMessage;
}
