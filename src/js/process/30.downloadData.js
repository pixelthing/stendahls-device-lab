var data = {};

function readJsonP(root) {
  var feed = root.feed;
  var title = feed.title['$t'];
  data[title] = {}
  var entries = feed.entry || [];
  
  for (var i = 0; i < entries.length; ++i) {
    var label = entries[i].title['$t'];
    var contentArray = entries[i].content['$t'].split(', ');
    var value = contentArray[0].split(':')[1];
    value = value.replace(' ','');
    value = value.replace(',','.');
    value = value.trim();
    value = parseFloat(value);
    if (value < 0.01) {
      continue;
    }
    data[title][label] = value;
  }
  //console.log('async');
}

var getCheckForDone = function() {
  var checkCount = 0;
  var checkForEnd = setInterval(function() {
    checkCount++;
    console.log(Object.keys(data).length)
    if (checkCount > 50) {
      console.log('1')
      error.send({'title':'oops'});
      clearInterval(checkForEnd);
      checkCount = 0;
      return;
    }  
    if (sheetsConfig[sheetsChoice] && Object.keys(data).length === Object.keys(sheetsConfig[sheetsChoice].worksheets).length) {
      clearInterval(checkForEnd);
      getDone();
      return;
    }
  }, 100);
}

var getData = function(key1, key2, value) {
    $.get('https://spreadsheets.google.com/feeds/list/' + key1 + '/' + value + '/public/basic?alt=json-in-script&callback=readJsonP',function(data,status) {},'script');
}

var getDataAll = function() {
  
  getCheckForDone();
  
  var key1 = sheetsConfig[sheetsChoice].key;
  var worksheets = sheetsConfig[sheetsChoice].worksheets;
  var getWorksheetPromise = false;
  $.each(worksheets, function(key2, value) {
    getData(key1, key2, value);
  });
}

var getDone = function() {
  data.totals = {};
  data.totals.ALL = data.ALL.TOTAL;
  data.totals.DESKTOP = data.DESKTOP.TOTAL;
  data.totals.TABLET = data.TABLET.TOTAL;
  data.totals.MOBILE = data.MOBILE.TOTAL;
  console.warn(data);
  $('html').trigger('gotit');
}

getDataAll();