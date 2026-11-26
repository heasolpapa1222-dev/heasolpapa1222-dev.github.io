// 한국어/English 전환: ?lang=en 또는 #en 이 있으면 영어, 없으면 브라우저 언어로 결정
(function () {
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') || location.hash.replace('#', '');
  if (lang !== 'ko' && lang !== 'en') {
    lang = (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  }

  document.documentElement.classList.add('js-lang');

  function apply(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.querySelectorAll('article[data-section]').forEach((el) => {
      el.hidden = el.dataset.section !== lang;
    });
    document.querySelectorAll('.lang button').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    const h1 = document.querySelector('article[data-section="' + lang + '"] h1');
    if (h1) document.title = 'InkBridge ' + h1.textContent;
  }

  document.querySelectorAll('.lang button').forEach((btn) => {
    btn.addEventListener('click', () => {
      apply(btn.dataset.lang);
      history.replaceState(null, '', '?lang=' + lang);
      window.scrollTo(0, 0);
    });
  });

  apply(lang);
})();
