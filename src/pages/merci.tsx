// Page de confirmation après envoi d'un formulaire Formspree.
// tracking.js ajoute _next=/merci/?f=<formId> sur tous les formulaires du site,
// puis pousse l'événement GA4 « lead_confirmed » à l'arrivée ici.
import React from 'react';
import { Document } from '../components';
import { preamble, nav, footer, chatbot, scripts } from './contact';

export const fileName = 'merci.html';
export { preamble };

export const headTag = `<head>`;
export const head = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KBH8R72G');</script>
<!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Merci — Porokhane Digital Consulting</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="canonical" href="https://digital-porokhane.com/merci/">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="stylesheet" href="styles.css">
  <style>
    .merci-wrap{min-height:72vh;display:flex;align-items:center;justify-content:center;padding:130px 20px 70px;background:#f6f9fc}
    .merci-card{background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.08);max-width:580px;width:100%;text-align:center;padding:48px 36px}
    .merci-check{width:78px;height:78px;margin:0 auto 22px;border-radius:50%;background:#1fa47a;color:#fff;font-size:40px;display:flex;align-items:center;justify-content:center;font-weight:700}
    .merci-card h1{color:#1e2a4a;font-size:28px;margin:0 0 12px}
    .merci-card p{color:#5b6472;font-size:16px;line-height:1.6;margin:0 0 6px}
    .merci-sub{font-size:14px;color:#8a94a6;margin-bottom:0}
    .merci-actions{display:flex;gap:14px;justify-content:center;margin-top:30px;flex-wrap:wrap}
    .merci-actions .btn{padding:13px 26px;border-radius:8px;font-weight:600;font-size:15px;text-decoration:none}
    .merci-actions .btn-p{background:#1fa47a;color:#fff}
    .merci-actions .btn-p:hover{background:#17805c}
    .merci-actions .btn-g{border:2px solid #1fa47a;color:#1fa47a;background:#fff}
    .merci-actions .btn-g:hover{background:#e9f8f2}
  </style>
`;

export const bodyTag = `<body>`;
export { nav, footer, chatbot };

export const content = `
<main class="merci-wrap">
  <div class="merci-card">
    <div class="merci-check">&#10003;</div>
    <h1>Merci !</h1>
    <p id="merciMsg">Votre message a bien été envoyé.</p>
    <p class="merci-sub">Notre équipe vous répond sous 24&nbsp;h ouvrées.</p>
    <div class="merci-actions">
      <a class="btn btn-p" href="/">Retour à l'accueil</a>
      <a class="btn btn-g" href="https://wa.me/221710589088"><i class="fab fa-whatsapp"></i> Continuer sur WhatsApp</a>
    </div>
  </div>
</main>
<script>
(function () {
  var msgs = {
    devisForm: 'Votre demande de devis a bien été envoyée.',
    contactForm: 'Votre message a bien été envoyé.',
    newsletterForm: 'Votre inscription à la newsletter est confirmée.'
  };
  var f = new URLSearchParams(location.search).get('f');
  var el = document.getElementById('merciMsg');
  if (f && msgs[f] && el) el.textContent = msgs[f];
})();
</script>
`;

export { scripts };

export default function Page() {
  return <Document headTag={headTag} head={head} bodyTag={bodyTag} nav={nav}
    content={content} footer={footer} chatbot={chatbot} scripts={scripts} />;
}
