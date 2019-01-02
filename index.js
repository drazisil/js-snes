var page = require('webpage').create();
page.open('index.html', function(status) {
  console.log("Status: " + status);
  phantom.exit();
});