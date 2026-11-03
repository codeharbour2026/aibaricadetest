(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  function renderCrawlers() {
    var box = $('crawler-list');
    box.textContent = '';
    window.CRAWLERS.forEach(function (c) {
      var lab = document.createElement('label');
      lab.style.display = 'block';
      lab.style.margin = '4px 0';
      
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = c.token;
      cb.style.marginRight = '8px';
      
      var txt = document.createElement('span');
      txt.textContent = c.token + ' (' + c.operator + ')';
      
      lab.appendChild(cb);
      lab.appendChild(txt);
      box.appendChild(lab);
    });
  }

  $('generate').addEventListener('click', function () {
    var existing = $('existing').value.trim();
    var checkboxes = document.querySelectorAll('#crawler-list input[type=checkbox]:checked');
    var blockedTokens = Array.from(checkboxes).map(function (cb) { return cb.value; });
    
    var output = existing ? existing + '\n\n' : '';
    blockedTokens.forEach(function (token) {
      output += 'User-agent: ' + token + '\nDisallow: /\n';
    });
    
    $('preview').textContent = output;
  });

  renderCrawlers();
})();
