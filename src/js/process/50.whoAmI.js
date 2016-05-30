var unknownDevice = function() {
  if ($.ua.os.name === 'Mac OS') {
    return 'Apple Mac';
  } else if ($.ua.os.name === 'Windows') {
    return 'PC';
  } else if ($.ua.os.name === 'Chrome') {
    return 'Chromebook';
  } else {
    return 'Unknown';
  }
}

var whoiam = {
  'device' : {
    'category': ( $.ua.device.type || 'desktop' ),
    'vendor' : $.ua.device.vendor || unknownDevice(),
    'model' : $.ua.device.model
  },
  'platform' : {
    'name' : $.ua.os.name,
    'version' : $.ua.os.version
  },
  'browser' : {
    'name': $.ua.browser.name,
    'version': $.ua.browser.version,
    'major': parseInt($.ua.browser.version.split('.')[0], 10),
    'engine': $.ua.engine.name
  },
  'screen': {},
  'id': false,
  'name': false
}

var knownScreenSizes = {
  '320x480' : 'iPhone4',
  '320x568' : 'iPhone5',
  '375x667' : 'iPhone6',
  '414x736' : 'iPhone6+',
  '736x414' : 'iPhone6+ - horizontal',
  '360x640' : 'Most Android mobiles',
  '768x1024' : 'iPad - portrait',
  '1024x768' : 'iPad - landscape',
  '1366x768' : 'Many smaller PC laptops',
}

whoiam.screen.width = screen.width;
whoiam.screen.height = screen.height;
whoiam.screen.name = false;
if (knownScreenSizes[whoiam.screen.width + 'x' + whoiam.screen.height]) {
  whoiam.screen.name = knownScreenSizes[whoiam.screen.width + 'x' + whoiam.screen.height];
}
  

if ( whoiam.platform.name === 'iOS' ) {
  whoiam.id = 'iOS ' + ( whoiam.browser.major < 6 ? '<6' : whoiam.browser.major ) + ' - ' + whoiam.device.model;
  whoiam.browser.nameAlt = 'iOS' + ( whoiam.browser.major < 6 ? '5 or less' : whoiam.browser.major );
  
} else if ( whoiam.browser.name === 'Safari' ) {
  whoiam.id = 'Safari ' + whoiam.browser.major + ' - desktop';
  whoiam.browser.nameAlt = 'Safari ' + whoiam.browser.major;
  
} else if ( whoiam.platform.name === 'Android' ) {
  if ( whoiam.browser.name === 'Chrome' ) {
    whoiam.id = 'Chrome - ' + whoiam.device.category + ' - latest';
    whoiam.browser.nameAlt = 'Chrome on Android (latest)';
  } else if ( whoiam.browser.name === 'Firefox' ) {
    whoiam.id = 'Firefox - ' + whoiam.device.category + ' - latest';
    whoiam.browser.nameAlt = 'Firefox on Android (latest)';
  } else {
    whoiam.id = whoiam.browser.name + ' - ' + whoiam.device.category;
    whoiam.browser.nameAlt = whoiam.browser.name + ' on Android ' + whoiam.browser.major;
  }
  
} else if ( whoiam.browser.name === 'Chrome' ) {
  whoiam.id = 'Chrome - ' + whoiam.device.category + ' - latest';
  whoiam.browser.nameAlt = 'Chrome (latest)';
  
} else if ( whoiam.browser.name === 'Firefox' ) {
  whoiam.id = 'Firefox - ' + whoiam.device.category + ' - latest';
  whoiam.browser.nameAlt = 'Firefox (latest)';
  
} else if ( whoiam.browser.name === 'Edge' ) {
  whoiam.id = 'Edge - ' + whoiam.device.category + ' - latest';
  whoiam.browser.nameAlt = 'Edge (latest)';
  
} else if ( whoiam.browser.name === 'Opera' ) {
  whoiam.id = 'Opera - ' + whoiam.device.category + ' - latest';
  whoiam.browser.nameAlt = 'Opera (latest)';
  
} else if ( whoiam.browser.name === 'Blackberry' ) {
  whoiam.id = 'Blackberry - ' + whoiam.device.category + ' - latest';
  whoiam.browser.nameAlt = 'Blackberry (latest)';
  
} else if ( whoiam.browser.name === 'IE' ) {
  whoiam.id = 'IE' + whoiam.browser.major + ' - ' + whoiam.device.category;
  whoiam.browser.nameAlt = 'IE' + whoiam.browser.major;
  
} else {
  whoiam.id = whoiam.browser.name + ' ' + whoiam.browser.major + ' - ' + whoiam.device.category;
  whoiam.browser.nameAlt = whoiam.browser.name + ' ' + whoiam.browser.major;
}

whoiam.screenId = whoiam.screen.width + 'x' + whoiam.screen.height;

console.log(whoiam);
  


