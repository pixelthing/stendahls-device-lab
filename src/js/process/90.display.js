
$('html').on('lookedup', function() {
  
  $('[data-js-data-name]').text(sheetsConfig[sheetsChoice].name);
  
  $('[data-js-id]').text(whoiam.id);
  
  $('[data-js-device-vendor]').text(whoiam.device.vendor);
  $('[data-js-device-model]').text(whoiam.device.model);
  $('[data-js-device-cat]').text(whoiam.device.category);
  
  $('[data-js-device-stats-percent]').text(myStats.device.per);
  
  $('[data-js-platform-name]').text(whoiam.platform.name);
  $('[data-js-platform-version]').text(whoiam.platform.version);
  
  $('[data-js-browser-name]').text(whoiam.browser.name);
  $('[data-js-browser-name-alt]').text(whoiam.browser.nameAlt);
  $('[data-js-browser-version]').text(whoiam.browser.version);
  $('[data-js-browser-major]').text(whoiam.browser.major);
  $('[data-js-browser-engine]').text(whoiam.browser.engine);
  
  $('[data-js-browser-stats-all-percent]').text(myStats.browser.all.per);
  $('[data-js-browser-stats-cat-percent]').text(myStats.browser.cat.per);
  
  $('[data-js-screen-width]').text(whoiam.screen.width);
  $('[data-js-screen-height]').text(whoiam.screen.height);
  if (whoiam.screen.name) {
    $('[data-js-screen-name]').text('(' + whoiam.screen.name + ')');
  }
  
  $('[data-js-screen-stats-all-percent]').text(myStats.screen.all.per);
  $('[data-js-screen-stats-cat-percent]').text(myStats.screen.cat.per);
  
  openCurtain();
  
  var nextSlide = function() {
    var $currentActive = $('.slide--active');
    console.log($currentActive.next('.slide'))
    var $nextActive = $currentActive.next('.slide');
    if (!$nextActive.length) {
      $nextActive = $('.slide').first();
    }
    $currentActive.removeClass('slide--active');
    $nextActive.addClass('slide--active');
  }
  
  var nextSlideShowTimer = null;
  var nextSlideShowStart = function() {
    nextSlideShowTimer = setInterval(function() {
      nextSlide();
    },15000);
  }
  var nextSlideShowStop = function() {
    clearInterval(nextSlideShowTimer);
  }
  
  $('[data-js-next-click]').click(function(){
    nextSlideShowStop();
    nextSlide();
    nextSlideShowStart();
  });
  
  nextSlideShowStart();
  
});