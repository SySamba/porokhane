// Généré depuis digidocs.html — ne plus modifier le .html racine, éditer ce fichier.
import React from 'react';
import { Document } from '../components';

export const fileName = 'digidocs.html';
export const preamble = `<!DOCTYPE html>
<html lang="fr">
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
    <title>DigiDocs - Gestion Électronique des Documents | Porokhane</title>
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <meta name="description" content="DigiDocs : solution de gestion électronique des documents (GED) pour dématérialiser, classer et sécuriser vos documents d'entreprise.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        .project-hero {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            padding: 120px 0 80px;
            color: white;
            text-align: center;
        }
        
        .project-hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: white;
        }
        
        .project-hero .subtitle {
            font-size: 1.3rem;
            opacity: 0.95;
            max-width: 800px;
            margin: 0 auto 2rem;
        }
        
        .project-tags {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        
        .project-tag {
            background: rgba(255,255,255,0.2);
            padding: 0.6rem 1.2rem;
            border-radius: 25px;
            font-weight: 500;
            backdrop-filter: blur(10px);
        }
        
        .video-section {
            padding: 80px 0;
            background: #f8fafc;
        }
        
        .video-container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        
        .video-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
        }
        
        .video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .features-section {
            padding: 80px 0;
            background: white;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: #f8fafc;
            padding: 2rem;
            border-radius: 16px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(37,99,235,0.15);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            color: var(--bleu);
            margin-bottom: 1rem;
        }
        
        .feature-card h3 {
            color: var(--bleu);
            margin-bottom: 0.8rem;
        }
        
        .tech-stack {
            padding: 80px 0;
            background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
            color: white;
        }
        
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .tech-item {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .tech-item i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .back-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.5rem;
            background: white;
            color: var(--bleu);
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s;
            margin-top: 2rem;
        }
        
        .back-button:hover {
            transform: translateX(-5px);
        }
    </style>
  <link rel="canonical" href="https://digital-porokhane.com/digidocs.html">
  <meta property="og:title" content="DigiDocs - Gestion Électronique des Documents | Porokhane">
  <meta property="og:description" content="DigiDocs : solution de gestion électronique des documents (GED) pour dématérialiser, classer et sécuriser vos documents d'entreprise.">
  <meta property="og:image" content="https://digital-porokhane.com/images/logo_porokhane_digital.jpg">
  <meta property="og:url" content="https://digital-porokhane.com/digidocs.html">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="DigiDocs - Gestion Électronique des Documents | Porokhane">
  <meta name="twitter:description" content="DigiDocs : solution de gestion électronique des documents (GED) pour dématérialiser, classer et sécuriser vos documents d'entreprise.">
  <meta name="twitter:image" content="https://digital-porokhane.com/images/logo_porokhane_digital.jpg">
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "DigiDocs - Gestion Électronique des Documents | Porokhane",
  "description": "DigiDocs : solution de gestion électronique des documents (GED) pour dématérialiser, classer et sécuriser vos documents d'entreprise.",
  "url": "https://digital-porokhane.com/digidocs.html",
  "inLanguage": "fr-FR",
  "isPartOf": {
    "@type": "WebSite",
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
  }
}
  </script>
`;
export const bodyTag = `<body>`;
export const nav = `<nav class="navbar">
        <div class="container">
            <a href="index.html" class="logo" style="font-size: 1.8rem; font-weight: 700; color: var(--vert); text-decoration: none;">
                Porokhane
            </a>
            <ul class="nav-links">
                <li><a href="index.html#accueil">Accueil</a></li>
                <li><a href="index.html#services">Services</a></li>
                <li><a href="index.html#realisations">Réalisations</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>`;
export const content = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KBH8R72G"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    

    <section class="project-hero">
        <div class="container">
            <h1>DigiDocs</h1>
            <p class="subtitle">Gestion Électronique des Documents - Solution complète d'archivage et de gestion documentaire</p>
            <div class="project-tags">
                <span class="project-tag"><i class="fab fa-react"></i> React</span>
                <span class="project-tag"><i class="fab fa-node-js"></i> Node.js</span>
                <span class="project-tag"><i class="fas fa-database"></i> PostgreSQL</span>
                <span class="project-tag"><i class="fab fa-js"></i> TypeScript</span>
            </div>
        </div>
    </section>

    <section class="video-section">
        <div class="container">
            <div class="section-header">
                <h2>Démonstration Vidéo</h2>
                <p>Découvrez en action notre solution de Gestion Électronique des Documents</p>
            </div>
            <div class="video-container">
                <div class="video-wrapper">
                    <iframe src="https://drive.google.com/file/d/1M-8Odn7kmtZVjTJflwe2v2sp2xtqrltS/preview" allow="autoplay" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </section>

    <section class="features-section">
        <div class="container">
            <div class="section-header">
                <h2>Fonctionnalités Principales</h2>
                <p>Une solution complète pour gérer tous vos documents numériques</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-upload"></i></div>
                    <h3>Upload Sécurisé</h3>
                    <p>Téléchargement de documents avec validation de format, compression automatique et stockage sécurisé.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-archive"></i></div>
                    <h3>Archivage Intelligent</h3>
                    <p>Système d'archivage automatique avec catégorisation, tags et métadonnées pour une organisation optimale.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-search"></i></div>
                    <h3>Recherche Avancée</h3>
                    <p>Moteur de recherche puissant avec filtres multiples, recherche full-text et suggestions intelligentes.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-download"></i></div>
                    <h3>Téléchargement Rapide</h3>
                    <p>Téléchargement optimisé avec reprise automatique, compression à la volée et gestion des versions.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-user-shield"></i></div>
                    <h3>Gestion des Droits</h3>
                    <p>Contrôle d'accès granulaire par utilisateur, rôle et département avec audit trail complet.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-history"></i></div>
                    <h3>Versioning</h3>
                    <p>Gestion automatique des versions avec historique complet et possibilité de restauration.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-share-alt"></i></div>
                    <h3>Partage Collaboratif</h3>
                    <p>Partage sécurisé de documents avec liens temporaires et contrôle des permissions.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
                    <h3>Tableaux de Bord</h3>
                    <p>Analytics et statistiques détaillées sur l'utilisation, le stockage et l'activité des utilisateurs.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="tech-stack">
        <div class="container">
            <div class="section-header">
                <h2 style="color: white;">Technologies Utilisées</h2>
                <p style="color: rgba(255,255,255,0.9);">Stack technique moderne et performant</p>
            </div>
            <div class="tech-grid">
                <div class="tech-item">
                    <i class="fab fa-react"></i>
                    <h3>React</h3>
                    <p>Interface utilisateur réactive et moderne</p>
                </div>
                <div class="tech-item">
                    <i class="fab fa-node-js"></i>
                    <h3>Node.js</h3>
                    <p>Backend performant et scalable</p>
                </div>
                <div class="tech-item">
                    <i class="fas fa-database"></i>
                    <h3>PostgreSQL</h3>
                    <p>Base de données robuste et fiable</p>
                </div>
                <div class="tech-item">
                    <i class="fab fa-js"></i>
                    <h3>TypeScript</h3>
                    <p>Code typé et maintenable</p>
                </div>
            </div>
            <div style="text-align: center;">
                <a href="index.html#realisations" class="back-button">
                    <i class="fas fa-arrow-left"></i> Retour aux réalisations
                </a>
            </div>
        </div>
    </section>

    

    

`;
export const footer = `<footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Porokhane</h3>
                    <p>Votre partenaire digital au Sénégal</p>
                </div>
                <div class="footer-section">
                    <h3>Contact</h3>
                    <p><i class="fas fa-envelope"></i> contact@porokhane.com</p>
                    <p><i class="fas fa-phone"></i> +221 XX XXX XX XX</p>
                </div>
                <div class="footer-section">
                    <h3>Suivez-nous</h3>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Porokhane. Tous droits réservés.</p>
            </div>
        </div>
    </footer>`;
export const chatbot = ``;
export const scripts = `<script src="script.js"></script>
<script src="tracking.js" defer></script>`;

export default function Page() {
  return <Document headTag={headTag} head={head} bodyTag={bodyTag} nav={nav}
    content={content} footer={footer} chatbot={chatbot} scripts={scripts} />;
}
