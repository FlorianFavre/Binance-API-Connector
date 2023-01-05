const Binance = require("binance-api-node").default;

// Remplacez 'YOUR_API_KEY' et 'YOUR_API_SECRET' par votre clé API et votre secret API Binance
const client = Binance({
  apiKey: "",
  apiSecret: "",
});

async function btcBalance(currency, positiveBalances) {
  positiveBalances.find((asset) => {
    if (asset.asset === currency) {
      console.log(asset.asset);
      console.log(asset.free);
    }
  });
}

async function main() {
  // Récupérez le portefeuille de l'utilisateur
  const accountInfo = await client.accountInfo();

  // Filtrez les actifs du portefeuille par solde disponible positif
  const positiveBalances = accountInfo.balances.filter((asset) => {
    return parseFloat(asset.free) > 0;
  });

  btcBalance("BTC", positiveBalances);

  btcBalance("BNB", positiveBalances);
  btcBalance("SOL", positiveBalances);
  btcBalance("USDT", positiveBalances);
  btcBalance("ETHW", positiveBalances);
}
main();
