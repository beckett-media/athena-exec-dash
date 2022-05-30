const { download } = require("./aws");

function run () {
  download("json/average_selling_price.json");
}

run();
