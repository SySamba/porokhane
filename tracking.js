(function () {
  window.dataLayer = window.dataLayer || [];

  // ---------- Contexte de page (segmentation GA4) ----------
  var path = location.pathname.replace(/\/+$/, '') || '/';
  var pageType = 'page';
  if (path === '/') pageType = 'accueil';
  else if (/^\/merci(\/|\.html)/.test(path)) pageType = 'confirmation';
  else if (/^\/blog/.test(path)) pageType = 'blog';
  else if (/^\/(devis|contact)(\/|\.html|$)/.test(path)) pageType = 'conversion';
  else {
    var lds = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < lds.length; i++) {
      if (/"@type"\s*:\s*"(Article|BlogPosting|NewsArticle)"/.test(lds[i].textContent)) { pageType = 'article'; break; }
    }
    if (pageType === 'page' &&
        /service|formation|robotique|automatisation|impression|marketing|seo|cyber|ia_|mdd|agent|agence|site_web|digital/.test(path))
      pageType = 'service';
  }
  window.dataLayer.push({ page_type: pageType, page_slug: path });

  function push(evt) {
    evt.page_type = pageType;
    evt.page_path = path;
    window.dataLayer.push(evt);
  }

  // ---------- Formulaires : retour sur /merci/ après envoi ----------
  // _next est ajouté dynamiquement à tous les formulaires Formspree :
  // l'utilisateur revient sur le site et lead_confirmed est mesuré.
  function armForms() {
    var forms = document.querySelectorAll('form[action*="formspree.io"]');
    for (var i = 0; i < forms.length; i++) {
      var f = forms[i];
      if (f.querySelector('input[name="_next"]')) continue;
      var inp = document.createElement('input');
      inp.type = 'hidden';
      inp.name = '_next';
      inp.value = 'https://digital-porokhane.com/merci/?f=' + encodeURIComponent(f.id || 'form');
      f.appendChild(inp);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', armForms);
  else armForms();

  // ---------- Lead confirmé (page /merci/) ----------
  if (pageType === 'confirmation') {
    var src = new URLSearchParams(location.search).get('f') || 'inconnu';
    push({ event: 'lead_confirmed', lead_source: src });
  }

  // ---------- Soumissions de formulaires ----------
  document.addEventListener('submit', function (e) {
    var form = e.target;
    var action = form.getAttribute('action') || '';
    if (action.indexOf('formspree.io') === -1) return;
    if (form.id === 'newsletterForm') {
      push({ event: 'newsletter_signup' });
    } else {
      push({
        event: 'generate_lead',
        lead_source: form.id === 'devisForm' ? 'formulaire_devis' : 'formulaire_contact'
      });
    }
  }, true);

  // ---------- Clics : contacts + CTA ----------
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var method = /^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)/i.test(href) ? 'whatsapp'
      : /^tel:/i.test(href) ? 'telephone'
      : /^mailto:/i.test(href) ? 'email' : null;
    if (method) {
      push({ event: 'contact_click', contact_method: method, link_url: href });
      return;
    }
    var target = /\/devis(\/|\.html|$)/.test(href) ? 'devis'
      : /\/contact(\/|\.html|$)/.test(href) ? 'contact' : null;
    if (target) {
      push({
        event: 'cta_click',
        cta_target: target,
        cta_text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80)
      });
    }
  }, true);
})();
