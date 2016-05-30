var myStats = {};

$('html').on('gotit', function() {
  
  var catUpper = whoiam.device.category.toUpperCase();
  
  myStats.device = {
    'abs' : data.totals[catUpper],
    'per' : parseFloat( ( ( data.totals[catUpper] / data.totals.ALL ) * 100 ).toFixed(1) )
  }

  var browserStat = data.ALL[whoiam.id];
  myStats.browser = {
    'all' : {
      'abs' : browserStat,
      'per' : parseFloat( ( ( browserStat / data.totals.ALL ) * 100 ).toFixed(1) )
    },
    'cat' : {
      'cat' : whoiam.device.category,
      'abs' : browserStat,
      'per' : parseFloat( ( ( browserStat / data.totals[catUpper] ) * 100 ).toFixed(1) )
    }
  }
  
  var screenCat = whoiam.device.category;
  var screenStatCat = data[catUpper + ' SCREENS'][whoiam.screenId];
  var screenTotal = data.totals[catUpper];
  myStats.screen = {
    'all' : {
      'abs' : screenStatCat,
      'per' : parseFloat( ( ( screenStatCat / data.totals.ALL ) * 100 ).toFixed(1) )
    },
    'cat': {
      'cat' : screenCat,
      'abs' : screenStatCat,
      'per' : parseFloat( ( ( screenStatCat / screenTotal ) * 100 ).toFixed(1) )
    }
  }
  
  $('html').trigger('lookedup');

  console.log(myStats);
  
});