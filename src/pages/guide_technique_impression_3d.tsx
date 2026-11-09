// Généré depuis guide_technique_impression_3d.html — ne plus modifier le .html racine, éditer ce fichier.
import React from 'react';
import { Document } from '../components';

export const fileName = 'guide_technique_impression_3d.html';
export const preamble = `﻿<!DOCTYPE html>
<html lang="fr">
<script async>function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}window.addEventListener('load',function(){loadScript(function(){beTracker.t({hash:"4839b43b65f279b77271391d6643be69"})})});</script>

`;
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
  <title>Guide impression 3D : réglages, calibration et défauts</title>
  <meta name="description" content="Guide technique d&#x27;impression 3D : hauteur de couche, températures, calibration E-steps et PID, warping, stringing. Conseils d&#x27;experts à Dakar.">
  <meta name="keywords" content="guide impression 3d, réglages impression 3d, calibration imprimante 3d, défauts impression 3d, warping, stringing, impression 3d dakar, impression 3d sénégal, fabrication additive">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="author" content="Porokhane Digital Consulting">
  <meta name="geo.region" content="SN-DK">
  <meta name="geo.placename" content="Dakar">
  <link rel="icon" type="image/png" href="images/logo.png">


  <link rel="canonical" href="https://digital-porokhane.com/guide_technique_impression_3d.html">

  <meta property="og:title" content="Guide technique de l&#x27;impression 3D : réglages, calibration et résolution des défauts">
  <meta property="og:description" content="Guide technique d&#x27;impression 3D : hauteur de couche, températures, calibration E-steps et PID, warping, stringing. Conseils d&#x27;experts à Dakar.">
  <meta property="og:image" content="https://digital-porokhane.com/images/logo_porokhane_digital.jpg">
  <meta property="og:image:alt" content="Guide technique impression 3D - Porokhane Digital Consulting Dakar">
  <meta property="og:url" content="https://digital-porokhane.com/guide_technique_impression_3d.html">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Porokhane Digital Consulting">
  <meta property="article:published_time" content="2026-09-29T09:00:00+00:00">
  <meta property="article:modified_time" content="2026-09-29T09:00:00+00:00">
  <meta property="article:section" content="Impression 3D">
  <meta property="article:publisher" content="https://www.facebook.com/Porokhane.Digital.Consulting">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Guide impression 3D : réglages, calibration et défauts">
  <meta name="twitter:description" content="Guide technique d&#x27;impression 3D : hauteur de couche, températures, calibration E-steps et PID, warping, stringing. Conseils d&#x27;experts à Dakar.">
  <meta name="twitter:image" content="https://digital-porokhane.com/images/logo_porokhane_digital.jpg">

  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Guide technique de l'impression 3D : réglages, calibration et résolution des défauts",
  "description": "Guide technique d'impression 3D : hauteur de couche, températures, calibration E-steps et PID, warping, stringing. Conseils d'experts à Dakar.",
  "image": [
    "https://digital-porokhane.com/images/logo_porokhane_digital.jpg"
  ],
  "datePublished": "2026-09-29",
  "dateModified": "2026-09-29",
  "inLanguage": "fr-FR",
  "articleSection": "Impression 3D",
  "keywords": "guide impression 3d, réglages impression 3d, calibration imprimante 3d, défauts impression 3d, warping, stringing, impression 3d dakar, impression 3d sénégal, fabrication additive",
  "author": {
    "@type": "Organization",
    "name": "Porokhane Digital Consulting",
    "url": "https://digital-porokhane.com/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Porokhane Digital Consulting",
    "url": "https://digital-porokhane.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digital-porokhane.com/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://digital-porokhane.com/guide_technique_impression_3d.html"
  },
  "url": "https://digital-porokhane.com/guide_technique_impression_3d.html"
}
  </script>

  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://digital-porokhane.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Actualités",
      "item": "https://digital-porokhane.com/blog.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Guide technique impression 3D",
      "item": "https://digital-porokhane.com/guide_technique_impression_3d.html"
    }
  ]
}
  </script>

  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle hauteur de couche choisir pour une impression 3D ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avec une buse de 0,4 mm, 0,12 mm donne un rendu esthétique très lisse, 0,16 à 0,20 mm est le meilleur compromis qualité/temps pour les pièces fonctionnelles, et 0,28 mm convient aux brouillons rapides. La hauteur de couche ne doit pas dépasser 75 % du diamètre de la buse."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi mon impression 3D se décolle du plateau (warping) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le warping vient d'un refroidissement trop rapide de la matière. Nettoyez le plateau à l'alcool isopropylique, vérifiez le nivellement, augmentez la température du plateau de 5 à 10 °C, ajoutez une bordure (brim) et, pour l'ABS ou l'ASA, imprimez dans une enceinte fermée à l'abri des courants d'air."
      }
    },
    {
      "@type": "Question",
      "name": "Comment supprimer les fils (stringing) sur une impression 3D ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Baissez la température de buse par paliers de 5 °C, réglez la rétraction (0,5 à 2 mm en direct drive, 4 à 6 mm en Bowden, à 35-45 mm/s), augmentez la vitesse de déplacement et séchez le filament : un filament humide est la cause n°1 du stringing, surtout dans le climat humide de Dakar."
      }
    },
    {
      "@type": "Question",
      "name": "Quel filament choisir pour une pièce résistante à la chaleur au Sénégal ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le PLA se ramollit vers 55-60 °C : il est déconseillé pour une pièce exposée au soleil ou dans un véhicule à Dakar. Préférez le PETG (environ 80 °C), l'ASA (environ 95 °C, résistant aux UV) ou le nylon pour les pièces mécaniques sollicitées."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il calibrer une imprimante 3D neuve ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Même neuve, une imprimante doit être calibrée : nivellement du plateau et Z-offset, pas de l'extrudeur (E-steps), PID de la buse et du plateau, puis débit (flow) pour chaque nouveau filament. Ces réglages prennent moins d'une heure et éliminent la majorité des défauts."
      }
    }
  ]
}
  </script>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  
  <style>
    :root {
      --vert: #1fa47a;
      --vert-clair: #d1fae5;
      --bleu: #2563eb;
      --bleu-clair: #dbeafe;
      --blanc: #fff;
      --noir: #0f172a;
      --gris: #f8fafc;
      --gris-fonce: #e2e8f0;
      --gris-texte: #475569;
      --gris-titre: #1e293b;
      --ombre: 0 4px 24px rgba(0,0,0,0.08);
      --rayon: 16px;
      --rayon-grand: 24px;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: var(--gris);
      color: var(--gris-titre);
      line-height: 1.7;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    /* Navigation */
    .navbar {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 0;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      text-decoration: none;
    }
    
    .nav-logo a {
      text-decoration: none;
      transition: transform 0.3s ease;
    }
    
    .nav-logo a:hover {
      transform: scale(1.05);
    }
    
    .nav-logo img {
      height: 90px;
      width: auto;
      display: block;
      margin-right: 0.5rem;
    }
    
    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;
      gap: 1.5rem;
    }
    
    .nav-item {
      position: relative;
    }
    
    .nav-link {
      color: var(--gris-titre);
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      padding: 0.5rem 0;
      position: relative;
      transition: color 0.3s;
      display: inline-block;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--vert);
      transition: width 0.3s;
    }
    
    .nav-link:hover {
      color: var(--vert);
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
    
    .submenu {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      background: var(--blanc);
      border-radius: var(--rayon);
      box-shadow: var(--ombre);
      min-width: 220px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 100;
      border: 1px solid var(--gris-fonce);
      padding: 0.5rem 0;
    }
    
    .nav-item:hover .submenu {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
    
    .submenu-link {
      display: block;
      padding: 0.7rem 1.5rem;
      color: var(--noir);
      text-decoration: none;
      transition: all 0.2s;
      font-weight: 500;
    }
    
    .submenu-link:hover {
      background: var(--vert-clair);
      color: var(--vert);
      padding-left: 1.7rem;
    }
    
    .nav-devis {
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 0.7rem 1.5rem;
      background: linear-gradient(90deg, var(--vert), var(--bleu));
      color: white;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1rem;
      overflow: hidden;
      z-index: 1;
      transition: all 0.4s;
      box-shadow: 0 4px 15px rgba(31, 164, 122, 0.3);
      border: none;
      cursor: pointer;
      white-space: nowrap;
    }
    
    .nav-devis:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
      background: linear-gradient(90deg, var(--bleu), var(--vert));
    }
    
    .devis-icon {
      margin-left: 0.5rem;
      transition: transform 0.3s;
    }
    
    .nav-devis:hover .devis-icon {
      transform: translateX(5px);
    }
    
    /* Menu Hamburger */
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      padding: 8px;
      background: none;
      border: none;
      z-index: 1001;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background: var(--vert);
      margin: 3px 0;
      transition: 0.3s;
      border-radius: 2px;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* Article Hero */
    .article-hero {
      background: linear-gradient(rgba(31,164,122,0.85), rgba(37,99,235,0.85)), url('images/impression.jpg') center/cover no-repeat;
      color: var(--blanc);
      min-height: 45vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 20px;
    }
    
    .article-hero h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 1.2rem;
      text-shadow: 0 4px 24px rgba(0,0,0,0.18);
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .article-meta {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      font-size: 1.05rem;
      opacity: 0.95;
    }
    
    .article-meta span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    

    /* Fil d'Ariane */
    .breadcrumb {
      font-size: 0.92rem;
      color: var(--gris-texte);
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gris-fonce);
    }
    .breadcrumb ol {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }
    .breadcrumb li { display: flex; align-items: center; gap: 0.5rem; }
    .breadcrumb a { color: var(--vert); text-decoration: none; font-weight: 600; }
    .breadcrumb a:hover { text-decoration: underline; }
    .breadcrumb li[aria-current] { color: var(--gris-texte); }
    .breadcrumb .sep { color: var(--gris-fonce); }

    /* Article Content */
    .article-content {
      max-width: 850px;
      margin: -60px auto 60px;
      background: var(--blanc);
      border-radius: var(--rayon-grand);
      box-shadow: var(--ombre);
      padding: 50px 40px;
      position: relative;
      z-index: 2;
    }
    
    .article-content p {
      color: var(--gris-texte);
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }
    
    .article-content h2 {
      color: var(--vert);
      font-size: 1.8rem;
      font-weight: 800;
      margin: 2.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--vert-clair);
    }
    
    .article-content h3 {
      color: var(--bleu);
      font-size: 1.4rem;
      font-weight: 700;
      margin: 2rem 0 0.8rem;
    }
    
    .article-content ul, .article-content ol {
      margin: 1rem 0 1.5rem 1.5rem;
    }
    
    .article-content ul li, .article-content ol li {
      color: var(--gris-texte);
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 0.6rem;
      padding-left: 0.5rem;
    }
    
    .article-content ul li::marker {
      color: var(--vert);
    }
    
    .article-content ol li::marker {
      color: var(--bleu);
      font-weight: 700;
    }
    
    .highlight-box {
      background: linear-gradient(135deg, rgba(31,164,122,0.08), rgba(37,99,235,0.08));
      border-left: 4px solid var(--vert);
      border-radius: 0 var(--rayon) var(--rayon) 0;
      padding: 2rem;
      margin: 2rem 0;
    }
    
    .highlight-box h3 {
      color: var(--vert) !important;
      margin-top: 0 !important;
    }
    
    .cta-box {
      background: linear-gradient(135deg, var(--vert), var(--bleu));
      color: var(--blanc);
      border-radius: var(--rayon-grand);
      padding: 2.5rem;
      text-align: center;
      margin: 3rem 0 1rem;
    }
    
    .cta-box h3 {
      color: var(--blanc) !important;
      font-size: 1.6rem;
      margin-bottom: 1rem !important;
      margin-top: 0 !important;
    }
    
    .cta-box p {
      color: rgba(255,255,255,0.9) !important;
      margin-bottom: 1.5rem !important;
    }
    
    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: var(--blanc);
      color: var(--vert);
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.1rem;
      transition: all 0.3s;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .cta-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(0,0,0,0.2);
    }
    
    /* Articles récents */
    .recent-articles {
      max-width: 1200px;
      margin: 0 auto 60px;
      padding: 0 20px;
    }
    
    .recent-articles h2 {
      text-align: center;
      color: var(--vert);
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 2rem;
    }
    
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .article-card {
      background: var(--blanc);
      border-radius: var(--rayon);
      padding: 1.5rem;
      box-shadow: var(--ombre);
      transition: all 0.3s;
    }
    
    .article-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(37, 99, 235, 0.15);
    }
    
    .article-card h3 {
      color: var(--bleu);
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
      line-height: 1.4;
    }
    
    .article-card p {
      color: var(--gris-texte);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .article-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--vert);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .article-link:hover {
      color: var(--bleu);
      gap: 0.8rem;
    }
    
    /* Footer */
    .footer {
      background: linear-gradient(135deg, var(--vert), var(--bleu));
      color: var(--blanc);
      padding: 80px 0 30px;
      position: relative;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
      margin-bottom: 3rem;
    }
    
    .footer-section h3, .footer-section h4 {
      color: var(--blanc);
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
      font-weight: 700;
      position: relative;
      display: inline-block;
    }
    
    .footer-section h3::after, .footer-section h4::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
    }
    
    .footer-section p {
      color: rgba(255,255,255,0.8);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .footer-section ul {
      list-style: none;
    }
    
    .footer-section ul li {
      margin-bottom: 0.8rem;
    }
    
    .footer-section ul li a {
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .footer-section ul li a:hover {
      color: var(--blanc);
      transform: translateX(5px);
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .social-links a {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--blanc);
      text-decoration: none;
      transition: all 0.3s;
    }
    
    .social-links a:hover {
      background: var(--blanc);
      color: var(--vert);
      transform: translateY(-3px) scale(1.1);
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.15);
      padding-top: 2rem;
      text-align: center;
      color: rgba(255,255,255,0.7);
      font-size: 0.9rem;
    }
    
    /* Chatbot */
    .chatbot-btn {
      position: fixed;
      bottom: 32px;
      right: 32px;
      background: linear-gradient(90deg, var(--vert), var(--bleu));
      color: var(--blanc);
      border: none;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      box-shadow: 0 4px 24px rgba(31,164,122,0.18);
      font-size: 2.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      transition: background 0.3s, transform 0.2s;
      animation: chatbot-bounce 1.5s infinite alternate;
    }
    .chatbot-btn:hover {
      background: linear-gradient(90deg, var(--bleu), var(--vert));
      transform: scale(1.08);
    }
    @keyframes chatbot-bounce {
      0% { box-shadow: 0 4px 24px rgba(31,164,122,0.18); transform: scale(1); }
      100% { box-shadow: 0 8px 32px rgba(37,99,235,0.18); transform: scale(1.08); }
    }
    .chatbot-window {
      position: fixed;
      bottom: 110px;
      right: 32px;
      width: 340px;
      max-width: 95vw;
      background: var(--blanc);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(37,99,235,0.18);
      border: 1.5px solid var(--vert);
      z-index: 9999;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .chatbot-header {
      background: linear-gradient(90deg, var(--vert), var(--bleu));
      color: var(--blanc);
      padding: 1rem 1.2rem;
      font-weight: 700;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .chatbot-close {
      background: none;
      border: none;
      color: var(--blanc);
      font-size: 1.3rem;
      cursor: pointer;
    }
    .chatbot-body {
      padding: 1.2rem;
      background: var(--gris);
      min-height: 180px;
      max-height: 320px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .chatbot-message {
      background: var(--blanc);
      border-radius: 14px 14px 14px 4px;
      padding: 0.8rem 1rem;
      color: var(--gris-titre);
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(31,164,122,0.07);
      align-self: flex-start;
      max-width: 85%;
    }
    .chatbot-message.user {
      background: var(--vert);
      color: var(--blanc);
      align-self: flex-end;
      border-radius: 14px 14px 4px 14px;
    }
    .chatbot-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .chatbot-suggestion {
      background: var(--bleu-clair);
      color: var(--bleu);
      border: none;
      border-radius: 20px;
      padding: 0.4rem 1rem;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .chatbot-suggestion:hover {
      background: var(--bleu);
      color: var(--blanc);
    }
    .chatbot-footer {
      padding: 0.8rem 1.2rem;
      background: var(--blanc);
      border-top: 1px solid var(--gris-fonce);
      display: flex;
      gap: 0.5rem;
    }
    .chatbot-input {
      flex: 1;
      border: 1px solid var(--gris-fonce);
      border-radius: 20px;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      outline: none;
    }
    .chatbot-input:focus {
      border-color: var(--vert);
    }
    .chatbot-send {
      background: linear-gradient(90deg, var(--vert), var(--bleu));
      color: var(--blanc);
      border: none;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .chatbot-send:hover {
      background: linear-gradient(90deg, var(--bleu), var(--vert));
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .hamburger {
        display: flex !important;
        order: 2;
        margin-left: auto;
      }
      
      .nav-menu {
        position: fixed !important;
        top: 0 !important;
        right: -100% !important;
        width: 280px !important;
        height: 100vh !important;
        background: var(--blanc) !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
        align-items: flex-start !important;
        padding: 80px 2rem 2rem 2rem !important;
        box-shadow: -5px 0 15px rgba(0,0,0,0.1) !important;
        transition: right 0.3s ease !important;
        gap: 0 !important;
        margin: 0 !important;
        overflow-y: auto !important;
        z-index: 1000 !important;
        display: none !important;
      }
      
      .nav-menu.active {
        right: 0 !important;
        display: flex !important;
      }
      
      .nav-logo img {
        height: 70px;
      }
      
      .article-hero h1 {
        font-size: 2rem;
      }
      
      .article-content {
        padding: 30px 20px;
        margin: -40px 15px 40px;
      }
      
      .article-content h2 {
        font-size: 1.6rem;
      }
      
      .article-content h3 {
        font-size: 1.3rem;
      }
      
      .article-content p, .article-content ul li, .article-content ol li {
        font-size: 1rem;
      }

      .submenu {
        position: static !important;
        transform: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        max-height: 0 !important;
        overflow: hidden !important;
        background: var(--gris) !important;
        border-radius: 8px !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        width: 100% !important;
        min-width: auto !important;
        transition: all 0.3s ease !important;
      }

      .nav-item:hover .submenu {
        opacity: 1 !important;
        visibility: visible !important;
        max-height: 200px !important;
        margin-top: 0.5rem !important;
        padding: 0.5rem 0 !important;
      }

      .footer-content {
        grid-template-columns: 1fr;
      }
    }

    .tech-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; display: block; overflow-x: auto; }
    .tech-table th, .tech-table td { border: 1px solid #e5e7eb; padding: 0.6rem 0.8rem; text-align: left; vertical-align: top; }
    .tech-table thead th { background: var(--vert); color: #fff; }
    .tech-table tbody tr:nth-child(even) { background: #f9fafb; }
    .article-content pre { background: #111827; color: #e5e7eb; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; }
    .article-content code { font-family: Menlo, Consolas, monospace; font-size: 0.9em; }
    .article-content p code, .article-content li code { background: #f3f4f6; color: #111827; padding: 0.1rem 0.35rem; border-radius: 4px; }
    .toc-box { background: #f9fafb; border-left: 4px solid var(--vert); border-radius: 8px; padding: 1.2rem 1.5rem; margin: 2rem 0; }
    .toc-box h3 { margin-top: 0; }
  </style>
`;
export const bodyTag = `<body>`;
export const nav = `<nav class="navbar">
    <div class="container nav-container">
      <div class="nav-logo">
        <a href="https://digital-porokhane.com/">
          <img src="images/logo.png" alt="Porokhane Digital Consulting - agence de marketing digital à Dakar" width="270" height="90">
        </a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="nav-menu">
        <li><a href="https://digital-porokhane.com/" class="nav-link">Accueil</a></li>
        <li><a href="blog.html" class="nav-link" style="color: var(--vert);">Actualités</a></li>
        <li class="nav-item">
          <a href="formations.html" class="nav-link">Formations <i class="fas fa-chevron-down"></i></a>
          <ul class="submenu">
            <li><a href="robotique.html" class="submenu-link">Robotique</a></li>
            <li><a href="impression_3d_dakar.html#formation" class="submenu-link">Impression 3D</a></li>
            <li><a href="cybersecurite.html" class="submenu-link">Cybersécurité</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="marketing.html" class="nav-link">Marketing <i class="fas fa-chevron-down"></i></a>
          <ul class="submenu">
            <li><a href="audit_express.html" class="submenu-link">Audit Express</a></li>
            <li><a href="site.html" class="submenu-link">Création/Réfonte de site</a></li>
            <li><a href="strategie_digitale.html" class="submenu-link">Stratégie digitale</a></li>
            <li><a href="seo.html" class="submenu-link">Référencement naturel</a></li>
            <li><a href="reseaux_sociaux.html" class="submenu-link">Réseaux sociaux</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="accompagnement.html" class="nav-link">Accompagnement <i class="fas fa-chevron-down"></i></a>
          <ul class="submenu">
            <li><a href="automatisation.html" class="submenu-link">Automatisation</a></li>
            <li><a href="base_donnee.html" class="submenu-link">Bases de données</a></li>
            <li><a href="erp.html" class="submenu-link">ERP</a></li>
            <li><a href="ia.html" class="submenu-link">Intelligence Artificielle</a></li>
          </ul>
        </li>
        <li><a href="realisations.html" class="nav-link">Emplois</a></li>
        <li>
          <a href="devis.html" class="nav-devis">
            Demandez un devis
            <span class="devis-icon"><i class="fas fa-paper-plane"></i></span>
          </a>
        </li>
      </ul>
    </div>
  </nav>`;
export const content = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KBH8R72G"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
  <!-- Navigation -->
  

  <!-- Article Hero -->
  <section class="article-hero">
    <div class="container">
      <h1>Guide technique de l'impression 3D : réglages, calibration et résolution des défauts</h1>
      <div class="article-meta">
        <span><i class="far fa-calendar-alt"></i> 29 septembre 2026</span>
        <span><i class="far fa-folder"></i> Impression 3D</span>
        <span><i class="far fa-clock"></i> 14 min de lecture</span>
      </div>
    </div>
  </section>

  <!-- Article Content -->
  <article class="article-content">
    <nav class="breadcrumb" aria-label="Fil d'Ariane">
      <ol>
        <li><a href="https://digital-porokhane.com/">Accueil</a> <span class="sep">/</span></li>
        <li><a href="blog.html">Actualités</a> <span class="sep">/</span></li>
        <li aria-current="page">Guide technique impression 3D</li>
      </ol>
    </nav>

    <h2 id="introduction">Introduction</h2>
    <p>L'<strong>impression 3D</strong> ne se résume pas à envoyer un fichier à la machine. Entre deux pièces imprimées sur la même imprimante, la différence de qualité tient presque toujours à trois choses : des <strong>réglages adaptés</strong>, une <strong>calibration rigoureuse</strong> et la capacité à <strong>diagnostiquer un défaut</strong> dès qu'il apparaît.</p>
    <p>Ce guide technique rassemble la méthode utilisée par notre atelier d'<a href="impression_3d_dakar.html">impression 3D à Dakar</a> : les paramètres clés expliqués un par un, les procédures de calibration pas à pas, le choix des matériaux selon l'usage, un tableau de diagnostic des défauts courants et les spécificités liées au climat chaud et humide du Sénégal. Il s'adresse aux ingénieurs, makers, étudiants et entreprises qui veulent des pièces fiables du premier coup.</p>

    <div class="toc-box">
      <h3>Sommaire</h3>
      <ol>
        <li><a href="#parametres">Les paramètres d'impression essentiels</a></li>
        <li><a href="#calibration">Calibrer son imprimante 3D pas à pas</a></li>
        <li><a href="#materiaux">Choisir le bon matériau</a></li>
        <li><a href="#defauts">Diagnostiquer et corriger les défauts</a></li>
        <li><a href="#climat">Imprimer en 3D à Dakar : chaleur, humidité, coupures</a></li>
        <li><a href="#slicing">Optimisation avancée du tranchage</a></li>
        <li><a href="#post-traitement">Post-traitement et finitions</a></li>
        <li><a href="#faq">FAQ impression 3D</a></li>
      </ol>
    </div>

    <h2 id="parametres">1. Les paramètres d'impression 3D essentiels</h2>
    <p>Tous les logiciels de tranchage (Cura, PrusaSlicer, OrcaSlicer, Bambu Studio) exposent les mêmes réglages fondamentaux. Les valeurs ci-dessous correspondent à une imprimante FDM équipée d'une buse de 0,4 mm et d'un filament de 1,75 mm.</p>

    <h3>Hauteur de couche</h3>
    <p>La hauteur de couche fixe la résolution verticale. Règle d'or : elle doit rester comprise entre <strong>25 % et 75 % du diamètre de la buse</strong>, soit 0,10 à 0,30 mm pour une buse de 0,4 mm.</p>
    <ul>
      <li><strong>0,08 – 0,12 mm</strong> : figurines, maquettes architecturales, surfaces courbes très lisses (temps d'impression × 1,5 à × 2)</li>
      <li><strong>0,16 – 0,20 mm</strong> : le meilleur compromis pour les prototypes et les pièces fonctionnelles</li>
      <li><strong>0,24 – 0,28 mm</strong> : brouillons rapides, pièces internes non visibles</li>
    </ul>

    <h3>Températures de buse et de plateau</h3>
    <table class="tech-table">
      <thead>
        <tr><th>Matériau</th><th>Buse</th><th>Plateau</th><th>Ventilation</th><th>Enceinte</th></tr>
      </thead>
      <tbody>
        <tr><td>PLA</td><td>195 – 215 °C</td><td>55 – 60 °C</td><td>100 %</td><td>Non</td></tr>
        <tr><td>PETG</td><td>230 – 250 °C</td><td>70 – 85 °C</td><td>30 – 50 %</td><td>Non</td></tr>
        <tr><td>ABS</td><td>240 – 260 °C</td><td>95 – 110 °C</td><td>0 – 15 %</td><td>Oui</td></tr>
        <tr><td>ASA</td><td>240 – 260 °C</td><td>90 – 105 °C</td><td>0 – 20 %</td><td>Oui</td></tr>
        <tr><td>TPU 95A</td><td>220 – 235 °C</td><td>40 – 60 °C</td><td>50 – 100 %</td><td>Non</td></tr>
        <tr><td>Nylon (PA)</td><td>250 – 270 °C</td><td>70 – 90 °C</td><td>0 – 20 %</td><td>Oui</td></tr>
      </tbody>
    </table>
    <p>Ces plages sont indicatives : chaque fabricant de filament donne ses propres valeurs. Pour trouver la température idéale, imprimez une <strong>tour de température</strong> (temperature tower) qui fait varier la chauffe tous les 5 °C, puis retenez l'étage offrant le meilleur compromis entre adhérence des couches, ponts et absence de fils.</p>

    <h3>Vitesses et accélérations</h3>
    <ul>
      <li><strong>Première couche</strong> : 15 – 25 mm/s, c'est elle qui conditionne l'adhérence de toute la pièce</li>
      <li><strong>Périmètres extérieurs</strong> : 30 – 50 mm/s pour un bel état de surface</li>
      <li><strong>Remplissage</strong> : 60 – 100 mm/s (ou davantage sur une machine CoreXY récente)</li>
      <li><strong>Déplacements à vide</strong> : 150 – 250 mm/s pour limiter le suintement</li>
      <li><strong>Accélération</strong> : 500 – 1 500 mm/s² sur une machine cartésienne classique ; au-delà, les vibrations (ghosting) apparaissent</li>
    </ul>

    <h3>Parois, remplissage et résistance mécanique</h3>
    <p>Contrairement à une idée reçue, la résistance d'une pièce dépend davantage du <strong>nombre de parois</strong> que du taux de remplissage. Passer de 2 à 4 périmètres augmente souvent plus la solidité que passer de 20 % à 50 % de remplissage, pour un surcoût de matière bien moindre.</p>
    <ul>
      <li><strong>Pièce décorative</strong> : 2 parois, 10 – 15 % de remplissage</li>
      <li><strong>Prototype fonctionnel</strong> : 3 parois, 20 – 25 % de remplissage gyroïde</li>
      <li><strong>Pièce mécanique sollicitée</strong> : 4 – 6 parois, 40 – 60 % de remplissage gyroïde ou cubique</li>
    </ul>
    <p>Le motif <strong>gyroïde</strong> offre une résistance quasi identique dans toutes les directions et imprime sans à-coups : c'est notre choix par défaut pour les pièces techniques.</p>

    <h3>Rétraction</h3>
    <p>La rétraction tire le filament en arrière à chaque déplacement pour éviter les fils. Valeurs de départ : <strong>0,5 – 2 mm à 35 – 45 mm/s</strong> pour un extrudeur direct drive, <strong>4 – 6 mm à 40 – 50 mm/s</strong> pour un montage Bowden. Une rétraction excessive provoque des bouchages : augmentez-la par pas de 0,5 mm seulement.</p>

    <h2 id="calibration">2. Calibrer son imprimante 3D pas à pas</h2>
    <p>Une calibration dans le bon ordre élimine l'essentiel des défauts. Ne passez à l'étape suivante que lorsque la précédente est validée.</p>

    <h3>Étape 1 : nivellement du plateau et Z-offset</h3>
    <ol>
      <li>Chauffez la buse et le plateau à leur température d'impression : le métal se dilate et le réglage à froid est faussé.</li>
      <li>Nettoyez le plateau à l'alcool isopropylique (aucune trace de doigts).</li>
      <li>Réglez chaque coin avec une feuille de papier de 0,1 mm : elle doit glisser avec un léger frottement.</li>
      <li>Sur une machine équipée d'un capteur (BLTouch, CR Touch, sonde inductive), lancez le maillage automatique (<code>G29</code>) puis ajustez le <strong>Z-offset</strong> en direct pendant l'impression d'un carré de test.</li>
      <li>Une bonne première couche est légèrement écrasée, sans espaces entre les lignes ni bourrelets.</li>
    </ol>

    <h3>Étape 2 : calibration de l'extrudeur (E-steps)</h3>
    <p>L'objectif : quand le logiciel demande 100 mm de filament, l'extrudeur doit en pousser exactement 100 mm.</p>
    <ol>
      <li>Chauffez la buse, puis marquez le filament à 120 mm de l'entrée de l'extrudeur.</li>
      <li>Envoyez <code>M83</code> puis <code>G1 E100 F100</code> pour extruder 100 mm lentement.</li>
      <li>Mesurez la distance restante jusqu'au repère : s'il reste 20 mm, la valeur est juste.</li>
      <li>Sinon, calculez : <code>nouveaux E-steps = E-steps actuels × 100 / longueur réellement extrudée</code>.</li>
      <li>Enregistrez avec <code>M92 E[valeur]</code> puis <code>M500</code>.</li>
    </ol>

    <h3>Étape 3 : autotune PID de la buse et du plateau</h3>
    <p>Un PID mal réglé fait osciller la température de ±3 à 5 °C, ce qui crée des stries régulières sur les parois. Lancez l'autotune à la température de travail, ventilateur allumé :</p>
    <pre><code>M303 E0 S210 C8 U1   ; buse à 210 °C, 8 cycles
M303 E-1 S60 C8 U1   ; plateau à 60 °C
M500                 ; sauvegarde en EEPROM</code></pre>

    <h3>Étape 4 : calibration du débit (flow)</h3>
    <p>Imprimez un cube creux en mode « vase » (une seule paroi) avec une largeur de ligne de 0,45 mm. Mesurez l'épaisseur de paroi au pied à coulisse en plusieurs points et corrigez : <code>nouveau flow = flow actuel × 0,45 / épaisseur mesurée</code>. Ce réglage est à refaire pour chaque marque de filament.</p>

    <h3>Étape 5 : pressure advance / linear advance</h3>
    <p>Sur les firmwares Klipper (pressure advance) et Marlin (linear advance), ce réglage compense la pression dans la buse lors des accélérations : angles plus nets, coins sans bourrelets. Utilisez la mire de test intégrée à OrcaSlicer ou PrusaSlicer et retenez la ligne la plus régulière.</p>

    <h3>Étape 6 : tension des courroies et mécanique</h3>
    <p>Une courroie détendue provoque des cercles ovalisés et des décalages ; une courroie trop tendue use les roulements. Vérifiez aussi les galets excentriques, le serrage des poulies (vis sans tête sur le méplat de l'axe moteur) et la propreté de la vis trapézoïdale de l'axe Z.</p>

    <h2 id="materiaux">3. Choisir le bon matériau d'impression 3D</h2>
    <table class="tech-table">
      <thead>
        <tr><th>Matériau</th><th>Points forts</th><th>Limites</th><th>Usages typiques</th></tr>
      </thead>
      <tbody>
        <tr><td>PLA</td><td>Très facile, précis, peu de déformation</td><td>Ramollit vers 55 °C, cassant</td><td>Maquettes, prototypes visuels, décoration</td></tr>
        <tr><td>PETG</td><td>Robuste, résistant aux chocs et aux produits chimiques</td><td>Fils fréquents, colle au plateau</td><td>Boîtiers, pièces fonctionnelles, extérieur abrité</td></tr>
        <tr><td>ABS</td><td>Tenue en température, se lisse à l'acétone</td><td>Warping, fumées : enceinte et ventilation obligatoires</td><td>Pièces techniques, automobile</td></tr>
        <tr><td>ASA</td><td>Résiste aux UV et à la chaleur</td><td>Mêmes contraintes que l'ABS</td><td>Pièces exposées au soleil, signalétique extérieure</td></tr>
        <tr><td>TPU</td><td>Souple, amortit, résiste à l'abrasion</td><td>Impression lente, direct drive recommandé</td><td>Joints, coques, pieds antidérapants</td></tr>
        <tr><td>Nylon / PA-CF</td><td>Très résistant, autolubrifiant</td><td>Très hygroscopique, séchage obligatoire</td><td>Engrenages, pièces mécaniques industrielles</td></tr>
        <tr><td>Résine (SLA/MSLA)</td><td>Détails extrêmes, surface lisse</td><td>Fragile, post-traitement chimique</td><td>Bijouterie, dentaire, figurines, moules</td></tr>
      </tbody>
    </table>
    <p>Pour un projet professionnel, le choix du matériau se fait à partir de trois questions : la pièce sera-t-elle <strong>exposée à la chaleur ou au soleil</strong> ? Subira-t-elle des <strong>efforts mécaniques ou des chocs</strong> ? Doit-elle être <strong>esthétique ou fonctionnelle</strong> ? Si vous hésitez, notre équipe vous conseille lors de votre <a href="devis.html">demande de devis</a>.</p>

    <h2 id="defauts">4. Diagnostiquer et corriger les défauts d'impression 3D</h2>
    <p>Corrigez toujours <strong>un seul paramètre à la fois</strong> et notez le résultat : c'est la seule façon d'identifier la vraie cause.</p>
    <table class="tech-table">
      <thead>
        <tr><th>Défaut</th><th>Symptôme</th><th>Causes probables</th><th>Corrections</th></tr>
      </thead>
      <tbody>
        <tr><td>Warping</td><td>Coins qui se soulèvent</td><td>Refroidissement trop rapide, plateau sale ou trop froid</td><td>Nettoyer, +5 à 10 °C plateau, brim, enceinte, couper la ventilation des 3 premières couches</td></tr>
        <tr><td>Stringing</td><td>Fils entre les parties</td><td>Température trop haute, rétraction faible, filament humide</td><td>−5 °C, ajuster la rétraction, sécher le filament, déplacements plus rapides</td></tr>
        <tr><td>Sous-extrusion</td><td>Couches incomplètes, trous</td><td>Buse partiellement bouchée, E-steps faux, vitesse trop élevée</td><td>Cold pull ou changement de buse, recalibrer E-steps et flow, ralentir</td></tr>
        <tr><td>Sur-extrusion</td><td>Bourrelets, cotes trop grandes</td><td>Flow trop élevé, diamètre de filament mal renseigné</td><td>Calibrer le flow, vérifier 1,75 mm au pied à coulisse</td></tr>
        <tr><td>Décalage de couches</td><td>Pièce « cassée » en escalier</td><td>Courroie détendue, poulie desserrée, accélération excessive</td><td>Retendre, serrer la vis de poulie, réduire l'accélération</td></tr>
        <tr><td>Ghosting / ringing</td><td>Ondulations après les angles</td><td>Vibrations, accélération et jerk trop élevés</td><td>Réduire l'accélération, rigidifier le châssis, input shaping (Klipper)</td></tr>
        <tr><td>Pied d'éléphant</td><td>Base évasée</td><td>Buse trop proche, plateau trop chaud</td><td>Relever le Z-offset de 0,02 à 0,05 mm, compensation dans le slicer</td></tr>
        <tr><td>Délaminage</td><td>Couches qui se séparent</td><td>Température trop basse, trop de ventilation, courants d'air</td><td>+5 à 10 °C buse, réduire la ventilation, enceinte</td></tr>
        <tr><td>Surplombs ratés</td><td>Dessous affaissé ou spaghetti</td><td>Angle &gt; 45°, refroidissement insuffisant</td><td>Supports arborescents, réorienter la pièce, ventilation 100 % (PLA)</td></tr>
      </tbody>
    </table>

    <h2 id="climat">5. Imprimer en 3D à Dakar : chaleur, humidité et coupures de courant</h2>
    <p>Les guides publiés en Europe oublient un point décisif : les conditions locales. À Dakar, l'humidité relative dépasse régulièrement 70 % pendant l'hivernage et la température ambiante frôle 30 °C. Ces conditions ont un impact direct sur la qualité des impressions.</p>
    <h3>L'humidité, ennemie n°1 des filaments</h3>
    <p>PETG, nylon et TPU absorbent l'humidité de l'air en quelques jours. Symptômes : crépitements à la buse, bulles, fils et surface rugueuse. Nos règles en atelier :</p>
    <ul>
      <li>Stocker chaque bobine dans une boîte hermétique avec du gel de silice, idéalement sous 20 % d'humidité</li>
      <li>Sécher avant impression : PLA 45 – 50 °C pendant 4 h, PETG 65 °C pendant 4 à 6 h, nylon 70 – 80 °C pendant 8 h</li>
      <li>Imprimer directement depuis une boîte de séchage pour les longues impressions</li>
    </ul>
    <h3>La chaleur ambiante</h3>
    <p>Une pièce en PLA laissée dans une voiture au soleil à Dakar se déforme en quelques heures. Pour tout objet destiné à l'extérieur, privilégiez le PETG ou l'ASA. Côté machine, une ambiance chaude réduit l'efficacité de la ventilation : sur le PLA, baissez la température de buse de 5 °C et vérifiez le ventilateur du dissipateur pour éviter le « heat creep » (filament qui ramollit trop tôt et bouche l'extrudeur).</p>
    <h3>Les coupures de courant et la poussière</h3>
    <ul>
      <li>Activez la fonction de <strong>reprise après coupure</strong> (power loss recovery) du firmware</li>
      <li>Pour les impressions de plus de 10 heures, un onduleur évite de perdre la pièce et la bobine</li>
      <li>Nettoyez régulièrement les axes et les ventilateurs : la poussière et le sable fin accélèrent l'usure des galets et des roulements</li>
    </ul>

    <h2 id="slicing">6. Optimisation avancée du tranchage</h2>
    <h3>Orienter la pièce selon les efforts</h3>
    <p>Une pièce imprimée en FDM est jusqu'à <strong>deux fois moins résistante entre les couches</strong> que dans le plan des couches. Orientez donc la pièce pour que les efforts principaux s'exercent parallèlement aux couches, puis seulement dans un second temps pour minimiser les supports.</p>
    <h3>Supports arborescents et interfaces</h3>
    <p>Les supports arborescents (tree supports) consomment moins de matière et se retirent plus proprement. Laissez un écart en Z de 0,2 mm (une couche) et ajoutez 2 à 3 couches d'interface pour obtenir une face inférieure propre.</p>
    <h3>Hauteur de couche variable et lissage (ironing)</h3>
    <p>La <strong>hauteur de couche adaptative</strong> affine les couches sur les courbes et les épaissit sur les zones droites : jusqu'à 25 % de temps gagné sans perte visible de qualité. Le <strong>lissage</strong> (ironing) repasse la buse sur les surfaces supérieures avec un débit de 10 à 15 % pour un rendu quasi miroir sur les faces planes.</p>
    <h3>Tolérances d'assemblage</h3>
    <p>Pour des pièces qui s'emboîtent, prévoyez un jeu de <strong>0,2 mm</strong> pour un ajustement glissant et de <strong>0,1 mm</strong> pour un ajustement serré. Les trous horizontaux sortent souvent plus petits : compensez de 0,1 à 0,2 mm dans le modèle ou via la compensation XY du slicer.</p>

    <h2 id="post-traitement">7. Post-traitement et finitions</h2>
    <ul>
      <li><strong>Retrait des supports</strong> : pince coupante et cutter ; un passage au pistolet à chaleur efface les marques blanches sur le PLA et le PETG</li>
      <li><strong>Ponçage</strong> : grain 120 → 240 → 400 → 800, à l'eau à partir du 400</li>
      <li><strong>Apprêt et peinture</strong> : apprêt garnissant en bombe, ponçage fin, puis peinture acrylique</li>
      <li><strong>Lissage chimique</strong> : vapeur d'acétone pour l'ABS et l'ASA, uniquement en extérieur ou sous hotte, avec gants et lunettes</li>
      <li><strong>Inserts filetés</strong> : inserts en laiton posés au fer à souder pour des vissages solides et démontables</li>
      <li><strong>Assemblage</strong> : colle cyanoacrylate pour le PLA, époxy bi-composant pour les pièces sollicitées</li>
    </ul>

    <div class="highlight-box">
      <h3>Se former ou faire imprimer ?</h3>
      <p>Vous voulez maîtriser ces réglages vous-même ? Notre <a href="impression_3d_dakar.html#formation">formation impression 3D à Dakar</a> couvre la modélisation, le tranchage, la calibration et la maintenance. Vous préférez confier votre projet à des professionnels ? Découvrez notre <a href="impression_3d_dakar.html">service d'impression 3D à Dakar</a> et les <a href="impression_3d_senegal.html">projets réalisables au Sénégal</a>.</p>
    </div>

    <h2 id="faq">FAQ : vos questions techniques sur l'impression 3D</h2>
    <h3>Quelle hauteur de couche choisir pour une impression 3D ?</h3>
    <p>Avec une buse de 0,4 mm, 0,12 mm donne un rendu esthétique très lisse, 0,16 à 0,20 mm est le meilleur compromis qualité/temps pour les pièces fonctionnelles, et 0,28 mm convient aux brouillons rapides. La hauteur de couche ne doit pas dépasser 75 % du diamètre de la buse.</p>
    <h3>Pourquoi mon impression 3D se décolle du plateau (warping) ?</h3>
    <p>Le warping vient d'un refroidissement trop rapide de la matière. Nettoyez le plateau à l'alcool isopropylique, vérifiez le nivellement, augmentez la température du plateau de 5 à 10 °C, ajoutez une bordure (brim) et, pour l'ABS ou l'ASA, imprimez dans une enceinte fermée à l'abri des courants d'air.</p>
    <h3>Comment supprimer les fils (stringing) sur une impression 3D ?</h3>
    <p>Baissez la température de buse par paliers de 5 °C, réglez la rétraction (0,5 à 2 mm en direct drive, 4 à 6 mm en Bowden, à 35-45 mm/s), augmentez la vitesse de déplacement et séchez le filament : un filament humide est la cause n°1 du stringing, surtout dans le climat humide de Dakar.</p>
    <h3>Quel filament choisir pour une pièce résistante à la chaleur au Sénégal ?</h3>
    <p>Le PLA se ramollit vers 55-60 °C : il est déconseillé pour une pièce exposée au soleil ou dans un véhicule à Dakar. Préférez le PETG (environ 80 °C), l'ASA (environ 95 °C, résistant aux UV) ou le nylon pour les pièces mécaniques sollicitées.</p>
    <h3>Faut-il calibrer une imprimante 3D neuve ?</h3>
    <p>Oui. Même neuve, une imprimante doit être calibrée : nivellement du plateau et Z-offset, pas de l'extrudeur (E-steps), PID de la buse et du plateau, puis débit (flow) pour chaque nouveau filament. Ces réglages prennent moins d'une heure et éliminent la majorité des défauts.</p>

    <h2>Conclusion</h2>
    <p>Une impression 3D réussie repose sur une méthode : calibrer la machine dans le bon ordre, adapter les réglages au matériau, corriger un défaut à la fois et tenir compte des conditions locales, en particulier l'humidité à Dakar. Notez vos profils validés pour chaque filament : ils deviendront votre meilleur atout.</p>

    <div class="cta-box">
      <h3>Un projet d'impression 3D à Dakar ?</h3>
      <p>Prototype, pièce de rechange, maquette ou petite série : nos experts choisissent le matériau et les réglages adaptés et vous livrent une pièce prête à l'emploi.</p>
      <a href="devis.html" class="cta-btn"><i class="fas fa-rocket"></i> Demandez votre devis gratuit</a>
    </div>

  </article>

  <!-- Articles récents -->
  <section class="recent-articles">
    <h2>Articles récents</h2>
    <div class="articles-grid">
      <div class="article-card">
        <h3>Impression 3D à Dakar : une solution rapide et sur mesure</h3>
        <p>Prototypage rapide, pièces sur mesure, matériaux PLA, PETG et résine : de l'idée au produit fini.</p>
        <a href="impression_3d_dakar.html" class="article-link">
          Lire l'article <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="article-card">
        <h3>Impression 3D au Sénégal : quels projets réaliser avec la fabrication additive ?</h3>
        <p>Maquettes, pièces industrielles, trophées, prototypes : tour d'horizon des applications.</p>
        <a href="impression_3d_senegal.html" class="article-link">
          Lire l'article <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="article-card">
        <h3>Agent de marketing digital : le métier clé d’une agence de marketing digital à Dakar</h3>
        <p>Missions, compétences et journée type d’un agent de marketing digital au Sénégal.</p>
        <a href="agent_marketing_digital.html" class="article-link">
          Lire l'article <i class="fas fa-arrow-right"></i>
        </a>
      </div>

    </div>
  </section>
  <!-- Footer -->
  

  <!-- Chatbot -->
  

  

`;
export const footer = `<footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="nav-logo">
            <a href="https://digital-porokhane.com/">
              <img src="images/icone.webp" alt="Porokhane Digital Consulting - agence de marketing digital à Dakar" width="180" height="60" loading="lazy">
            </a>
          </div>
          <p>Votre partenaire de confiance pour la transformation digitale. Nous créons des solutions innovantes qui propulsent votre entreprise vers le succès.</p>
          <div class="social-links">
            <a href="https://www.facebook.com/Porokhane.Digital.Consulting" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="tiktok"><i class="fab fa-tiktok"></i></a>
            <a href="https://www.linkedin.com/company/porokhane-digital-consulting" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/porokhane_digital_consulting/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Nos Services</h4>
          <ul>
            <li><a href="formations.html"><i class="fas fa-chevron-right"></i> Formations Pédagogiques</a></li>
            <li><a href="marketing.html"><i class="fas fa-chevron-right"></i> Marketing Digital</a></li>
            <li><a href="accompagnement.html"><i class="fas fa-chevron-right"></i> Accompagnement PME</a></li>
            <li><a href="erp.html"><i class="fas fa-chevron-right"></i> ERP (Gestion d'entreprise)</a></li>
            <li><a href="site.html"><i class="fas fa-chevron-right"></i> Développement Web et Mobile</a></li>
            <li><a href="securite.html"><i class="fas fa-chevron-right"></i> Sécurité IT</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Informations</h4>
          <ul>
            <li><a href="https://digital-porokhane.com/"><i class="fas fa-chevron-right"></i> Accueil</a></li>
            <li><a href="service.html"><i class="fas fa-chevron-right"></i> Services</a></li>
            <li><a href="blog.html"><i class="fas fa-chevron-right"></i> Actualités</a></li>
            <li><a href="index.html#temoignages"><i class="fas fa-chevron-right"></i> Témoignages</a></li>
            <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact</a></li>
            <li><a href="devis.html"><i class="fas fa-chevron-right"></i> Devis</a></li>
            <li><a href="index.html#certifications"><i class="fas fa-chevron-right"></i> Certifications</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+221710589088"><i class="fas fa-phone"></i> +221 710589088</a></li>
            <li><a href="tel:+338306157"><i class="fas fa-phone"></i> +33 830 61 57</a></li>
            <li><a href="mailto:contact1@digital-porokhane.com"><i class="fas fa-envelope"></i> contact1@digital-porokhane.com</a></li>
            <li><a href="https://maps.app.goo.gl/jCAGEpeoCBiSNQSr5" target="_blank"><i class="fas fa-map-marker-alt"></i> Dakar, Ngor Extension villa 454</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Porokhane Digital Consulting. Tous droits réservés.</p>
      </div>
    </div>
  </footer>`;
export const chatbot = `<button class="chatbot-btn" id="chatbotBtn" aria-label="Ouvrir le chat" title="Discuter avec nous">
    <i class="fas fa-comments"></i>
  </button>

  <div class="chatbot-window" id="chatbotWindow">
    <div class="chatbot-header">
      <span>🤖 Porokhane Chatbot</span>
      <button class="chatbot-close" id="chatbotClose" aria-label="Fermer le chat">&times;</button>
    </div>
    <div class="chatbot-body" id="chatbotBody">
      <div class="chatbot-message">Bonjour 👋 ! Je suis le chatbot Porokhane. Posez-moi vos questions ou choisissez une suggestion ci-dessous :</div>
      <div class="chatbot-message" style="background: var(--bleu-clair); color: var(--bleu); font-size: 0.98rem;">
        Vous pouvez aussi envoyer ici un message à notre équipe, nous vous répondrons rapidement !
      </div>
      <div class="chatbot-suggestions" id="chatbotSuggestions">
        <button class="chatbot-suggestion">Quels services proposez-vous ?</button>
        <button class="chatbot-suggestion">Comment Demandez un devis ?</button>
        <button class="chatbot-suggestion">Quels sont vos délais de livraison ?</button>
        <button class="chatbot-suggestion">Proposez-vous des formations ?</button>
        <button class="chatbot-suggestion">Comment vous contacter ?</button>
      </div>
    </div>
    <form class="chatbot-footer" id="chatbotForm" autocomplete="off">
      <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Écrivez votre question..." />
      <button type="submit" class="chatbot-send" aria-label="Envoyer"><i class="fas fa-paper-plane"></i></button>
    </form>
  </div>`;
export const scripts = `<script>
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    const chatbotFAQ = {
      'services': "Nous proposons : formations (robotique, impression 3D, cybersécurité), marketing digital, accompagnement (automatisation, IA, bases de données), développement web mobile et plus encore !",
      'devis': "Pour Demandez un devis, cliquez sur 'Demandez un devis' dans le menu ou rendez-vous sur la page devis. Nous vous répondrons rapidement !",
      'délais': "Nos délais varient selon le projet, mais nous nous engageons à livrer dans les temps convenus, avec un suivi régulier.",
      'formations': "Oui, nous proposons des formations en robotique, impression 3D, cybersécurité et plus. Consultez la page Formations pour plus d'infos !",
      'contacter': "Vous pouvez nous contacter via la page Contact, par téléphone ou par email. Nous sommes à votre écoute !",
      'salutation': "Bonjour et bienvenue chez Porokhane Digital Consulting ! 👋\\n\\nJe peux répondre à vos questions sur :\\n• Nos services\\n• Comment Demandez un devis\\n• Nos délais de livraison\\n• Nos formations\\n• Comment nous contacter\\n\\nCliquez sur une suggestion ou posez votre question !"
    };

    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotBody = document.getElementById('chatbotBody');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSuggestions = document.getElementById('chatbotSuggestions');

    chatbotBtn.onclick = () => {
      chatbotWindow.style.display = 'flex';
      setTimeout(() => chatbotInput.focus(), 300);
    };
    
    chatbotClose.onclick = () => {
      chatbotWindow.style.display = 'none';
    };

    chatbotSuggestions.onclick = function(e) {
      if (e.target.classList.contains('chatbot-suggestion')) {
        const question = e.target.textContent;
        addUserMessage(question);
        respondToUser(question);
      }
    };

    chatbotForm.onsubmit = function(e) {
      e.preventDefault();
      const question = chatbotInput.value.trim();
      if (question) {
        addUserMessage(question);
        respondToUser(question);
        chatbotInput.value = '';
      }
    };

    function addUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'chatbot-message user';
      msg.textContent = text;
      chatbotBody.appendChild(msg);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function addBotMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'chatbot-message';
      msg.textContent = text;
      chatbotBody.appendChild(msg);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function respondToUser(question) {
      let response = "Je suis désolé, je n'ai pas compris votre question. Essayez une des suggestions ci-dessus ou contactez-nous directement.";
      const q = question.toLowerCase();
      if (q.includes('service')) response = chatbotFAQ['services'];
      else if (q.includes('devis')) response = chatbotFAQ['devis'];
      else if (q.includes('délai') || q.includes('delai')) response = chatbotFAQ['délais'];
      else if (q.includes('formation')) response = chatbotFAQ['formations'];
      else if (q.includes('contact')) response = chatbotFAQ['contacter'];
      else if (q.includes('salut') || q.includes('bonjour') || q.includes('bonsoir') || q.includes('hello')) response = chatbotFAQ['salutation'];
      setTimeout(() => addBotMessage(response), 600);
    }
  </script>
<script src="tracking.js" defer></script>`;

export default function Page() {
  return <Document headTag={headTag} head={head} bodyTag={bodyTag} nav={nav}
    content={content} footer={footer} chatbot={chatbot} scripts={scripts} />;
}
