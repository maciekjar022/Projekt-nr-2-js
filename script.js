const currencySelect = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const resultDiv = document.getElementById("result");

convertButton.addEventListener("click", () => {
  const currency = currencySelect.value;
  const amount = amountInput.value;

  const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[0].mid;
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      resultDiv.textContent = `${amount} ${currency} = ${convertedAmount} PLN`;
    })
    .catch((error) => {
      console.log(error);
    });
});
