const Binance = require("binance-api-node").default;
const axios = require("axios");

// Remplacez 'YOUR_API_KEY' et 'YOUR_API_SECRET' par votre clé API et votre secret API Binance
const client = Binance({
  apiKey: "",
  apiSecret: "",
});
const baseUrl = "https://api.coingecko.com/api/v3";

async function displayBalances(currency) {
  // Récupérez le portefeuille de l'utilisateur
  const accountInfo = await client.accountInfo();

  // Pour chaque actif du portefeuille, récupérez son cours actuel et affichez son montant en euros
  for (const asset of accountInfo.balances) {
    if (parseFloat(asset.free) > 0) {
      let nameCurrency = "";
      switch (asset.asset) {
        case "BTC":
          nameCurrency = "bitcoin";
          break;
        case "BNB":
          nameCurrency = "binancecoin";
          break;
        case "SOL":
          nameCurrency = "solana";
          break;
        case "USDT":
          nameCurrency = "tether";
          break;
        case "ETHW":
          nameCurrency = "ethereum";
          break;
      }
      if (nameCurrency === "") continue;
      const price = await getPrice(nameCurrency, currency);
      const total = parseFloat(asset.free) * price;
      console.log(`${asset.free} ${asset.asset} = ${total} ${currency}`);
    }
  }
}

async function getPrice(symbol, currency) {
  const config = {
    params: {
      api_key: "",
      ids: symbol,
      vs_currencies: currency,
    },
  };
  const response = await axios.get(`${baseUrl}/simple/price`, config);
  return response.data[symbol][currency];
}

async function main() {
  displayBalances("eur");
}
main();
