document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header.site');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.faq-item h4').forEach(function (h) {
    h.addEventListener('click', function () {
      h.parentElement.classList.toggle('open');
    });
  });

  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('form-success');
      form.style.display = 'none';
      if (msg) msg.style.display = 'block';
    });
  }
});
