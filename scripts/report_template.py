"""Template HTML du dashboard SEO — contient %%DATA%% (JSON injecté au build)."""

TEMPLATE = r"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rapport SEO mensuel — Porokhane Digital Consulting</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<style>
*{box-sizing:border-box;margin:0}
body{font-family:'Inter',-apple-system,Arial,sans-serif;background:#f0f4f3;color:#1a1a2e}
header{background:linear-gradient(135deg,#0a5c4d,#0e7c66);color:#fff;padding:1.6rem 2rem;position:sticky;top:0;z-index:50;box-shadow:0 2px 8px rgba(0,0,0,.15)}
header h1{font-size:1.35rem;font-weight:700}
header .sub{opacity:.85;font-size:.85rem;margin-top:.3rem}
.badges{margin-top:.6rem}
.badge{display:inline-block;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:.2rem .75rem;font-size:.75rem;margin-right:.4rem}
main{max-width:1240px;margin:0 auto;padding:1.2rem}
h2{color:#0a5c4d;font-size:1.15rem;margin:1.8rem 0 .8rem;display:flex;align-items:center;gap:.5rem}
h2 .dot{width:10px;height:10px;background:#e9c46a;border-radius:50%}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.8rem;margin:1rem 0}
.kpi{background:#fff;border-radius:12px;padding:1rem 1.1rem;border-top:4px solid #0e7c66;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.kpi .v{font-size:1.55rem;font-weight:800;color:#0a5c4d}
.kpi .l{font-size:.78rem;color:#666;margin-top:.15rem}
.delta{display:inline-block;font-size:.72rem;font-weight:700;margin-top:.4rem;padding:.15rem .55rem;border-radius:999px}
.up{background:#d1f2e8;color:#0a7c5a}.down{background:#fde8e8;color:#c0392b}
.card{background:#fff;border-radius:12px;padding:1.1rem 1.2rem;margin:.8rem 0;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.card h3{font-size:.95rem;color:#264653;margin-bottom:.7rem}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.grid3{display:grid;grid-template-columns:2fr 1fr;gap:1rem}
.tw{max-height:420px;overflow:auto;border-radius:8px;border:1px solid #eee}
table{border-collapse:collapse;width:100%;font-size:.84rem}
th,td{padding:.5rem .6rem;text-align:left;border-bottom:1px solid #f0f0f0}
th{background:#0e7c66;color:#fff;position:sticky;top:0;cursor:pointer;user-select:none;white-space:nowrap}
th .arr{opacity:.7;font-size:.7rem}
th:hover{background:#0a5c4d}
td.num{text-align:right;font-variant-numeric:tabular-nums}
tr:hover td{background:#f0f7f5}
tr.sel td{background:#e6f4f0}
.chart{position:relative;height:280px}
.chart-sm{position:relative;height:230px}
footer{text-align:center;font-size:.78rem;color:#888;padding:2rem 0}
@media(max-width:850px){.grid2,.grid3{grid-template-columns:1fr}}
@media print{header{position:static}.tw{max-height:none}.card{break-inside:avoid}}
</style>
</head>
<body>
<header>
  <h1>Rapport SEO mensuel — Porokhane Digital Consulting</h1>
  <div class="sub">Search Console + Google Analytics 4 • <span id="periode"></span></div>
  <div class="badges">
    <span class="badge">digital-porokhane.com</span>
    <span class="badge">vs période précédente</span>
    <span class="badge" id="badge-gen"></span>
  </div>
</header>
<main>

<div class="card"><h3>Synthèse exécutive</h3><div id="obj" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.6rem"></div></div>

<h2><span class="dot"></span>KPIs — Search Console <small style="font-weight:400;color:#888;font-size:.75rem">(28 jours vs 28 jours précédents)</small></h2>
<div class="kpis" id="kpi-gsc"></div>

<div class="grid3">
  <div class="card"><h3>Clics &amp; impressions par jour</h3><div class="chart"><canvas id="chTraf"></canvas></div></div>
  <div class="card"><h3>Positions des requêtes</h3><div class="chart"><canvas id="chPos"></canvas></div></div>
</div>

<div class="grid2">
  <div class="card"><h3>Mots-clés cibles (suivi)</h3><div class="tw" id="t-cibles"></div></div>
  <div class="card"><h3>Répartition appareils &amp; pays (SEO)</h3><div class="tw" id="t-devices"></div><div class="tw" id="t-pays" style="margin-top:.7rem"></div></div>
</div>

<div class="grid2">
  <div class="card"><h3>Quick wins : position 11–20 (à optimiser en priorité)</h3><div class="tw" id="t-opps"></div></div>
  <div class="card"><h3>Nouvelles requêtes apparues</h3><div class="tw" id="t-newq"></div></div>
</div>

<div class="card"><h3>Requêtes</h3><div class="tw" id="t-req"></div></div>
<div class="card"><h3>Pages (Search Console)</h3><div class="tw" id="t-pages"></div></div>

<h2><span class="dot"></span>Trafic &amp; conversions — Google Analytics</h2>
<div class="kpis" id="kpi-ga4"></div>
<div class="grid2">
  <div class="card"><h3>Canaux d'acquisition</h3><div class="chart-sm"><canvas id="chCanaux"></canvas></div><div class="tw" id="t-canaux" style="margin-top:.7rem"></div></div>
  <div class="card"><h3>Conversions (événements clés)</h3><div class="tw" id="t-conv"></div><h3 style="margin-top:1rem">Pages générant des conversions</h3><div class="tw" id="t-convp"></div></div>
</div>
<div class="grid2">
  <div class="card"><h3>Sources / supports</h3><div class="tw" id="t-sources"></div></div>
  <div class="card"><h3>Appareils &amp; pays (trafic)</h3><div class="tw" id="t-gdev"></div><div class="tw" id="t-gpays" style="margin-top:.7rem"></div></div>
</div>
<div class="grid2">
  <div class="card"><h3>Pages d'atterrissage</h3><div class="tw" id="t-landing"></div></div>
  <div class="card"><h3>Pages les plus vues</h3><div class="tw" id="t-gpages"></div></div>
</div>

<div class="card"><h3>Recommandations prioritaires — mois prochain</h3><div id="recos" style="font-size:.9rem;color:#333;line-height:1.8"></div></div>

<footer>Rapport généré automatiquement — Porokhane Digital Consulting • période 28 jours • <span id="foot-gen"></span></footer>
</main>

<script>
const D = %%DATA%%;
const $ = s => document.querySelector(s);
const pct = x => (x*100).toFixed(1)+' %';
const fmt = x => x==null?'–':x.toLocaleString('fr-FR');
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
let sortState = {};

/* ---------- Tables ---------- */
function renderTable(el, heads, rows, opts={}){
  const key = el.id || el.className;
  let rows2 = rows.slice();
  if(sortState[key]){const[i,d]=sortState[key];rows2.sort((a,b)=>(typeof a[i]==='number'?(a[i]-b[i]):String(a[i]).localeCompare(String(b[i])))*d);}
  let html='<table><tr>'+heads.map((h,i)=>`<th data-i="${i}">${h} <span class="arr">${sortState[key]&&sortState[key][0]===i?(sortState[key][1]>0?'▲':'▼'):''}</span></th>`).join('')+'</tr>';
  rows2.forEach(r=>{html+='<tr>'+r.map((c,i)=>`<td class="${typeof c==='number'?'num':''}">${typeof c==='number'&&i>0?fmt(c):c}</td>`).join('')+'</tr>'});
  html+='</table>';
  el.innerHTML=html;
  el.querySelectorAll('th').forEach(th=>th.addEventListener('click',()=>{
    const i=+th.dataset.i;sortState[key]=sortState[key]&&sortState[key][0]===i?[i,-sortState[key][1]]:[i,-1];refresh();}));
}

function renderReq(){
  const rows=D.requetes.map(r=>[esc(r[0]),r[1],r[2],r[3]?+(r[3]*100).toFixed(1):0,r[4]?+r[4].toFixed(1):0,r[5]?+(+r[5]).toFixed(1):'–']);
  renderTable($('#t-req'),['Requête','Clics','Impr.','CTR %','Pos.','Pos. préc.'],rows);
  const cib=D.requetes.filter(r=>/impression 3d|marketing digital|agence|création site|seo dakar|formation/i.test(r[0]))
    .map(r=>[esc(r[0]),r[1],r[2],+(r[3]*100).toFixed(1),+r[4].toFixed(1)]);
  renderTable($('#t-cibles'),['Requête cible','Clics','Impr.','CTR %','Pos.'],cib.length?cib:[['—',0,0,0,0]]);
  const b=[0,0,0,0];
  D.requetes.forEach(r=>{const p=r[4];b[p<=3?0:p<=10?1:p<=20?2:3]++;});
  chPos.data.datasets[0].data=b;chPos.update();
}

/* ---------- KPI cards ---------- */
function delta(cur,prev,inv){
  if(!prev)return'';
  const d=(cur-prev)/prev*100,g=inv?d<0:d>0;
  return `<span class="delta ${g?'up':'down'}">${d>0?'↗':d<0?'↘':'→'} ${Math.abs(d).toFixed(0)} %</span>`;
}
function kpi(v,l,d){return `<div class="kpi"><div class="v">${v}</div><div class="l">${l}</div>${d||''}</div>`}
function renderKpis(){
  const t=D.total,p=D.total_prev;
  $('#kpi-gsc').innerHTML=
    kpi(fmt(t.clics),'Clics',delta(t.clics,p.clics))+
    kpi(fmt(t.impressions),'Impressions',delta(t.impressions,p.impressions))+
    kpi(pct(t.ctr),'CTR',delta(t.ctr,p.ctr))+
    kpi(t.position.toFixed(1),'Position moy.',delta(t.position,p.position,true));
  if(D.ga4){
    const a=D.ga4.total||{},b=D.ga4.total_prev||{};
    $('#kpi-ga4').innerHTML=
      kpi(fmt(a.sessions||0),'Sessions',delta(a.sessions||0,b.sessions||0))+
      kpi(fmt(a.totalUsers||0),'Utilisateurs',delta(a.totalUsers||0,b.totalUsers||0))+
      kpi(fmt(a.newUsers||0),'Nouveaux',delta(a.newUsers||0,b.newUsers||0))+
      kpi(fmt(a.screenPageViews||0),'Vues de pages',delta(a.screenPageViews||0,b.screenPageViews||0))+
      kpi(`${Math.floor((a.averageSessionDuration||0)/60)}:${String(Math.round((a.averageSessionDuration||0)%60)).padStart(2,'0')}`,'Durée moyenne')+
      kpi(fmt(a.keyEvents||0),'Conversions',delta(a.keyEvents||0,b.keyEvents||0));
  } else $('#kpi-ga4').innerHTML='<div class="kpi"><div class="l">GA4 non disponible</div></div>';
}

/* ---------- Export CSV (bouton supprimé — fonction conservée pour usage futur) ---------- */
function exportCSV(){
  const rows=[['Requête','Clics','Impressions','CTR','Position'],
    ...D.requetes.map(r=>[r[0],r[1],r[2],(r[3]*100).toFixed(1)+'%',r[4].toFixed(1)])];
  const csv='\ufeff'+rows.map(r=>r.join(';')).join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download='requetes_seo_'+D.genere+'.csv';a.click();
}

/* ---------- Graphiques ---------- */
let chPos, chTraf, chCanaux;
function initCharts(){
  chTraf=new Chart($('#chTraf'),{type:'line',
    data:{labels:D.jours.map(j=>j[0]),datasets:[
      {label:'Clics',data:D.jours.map(j=>j[1]),borderColor:'#0e7c66',backgroundColor:'rgba(14,124,102,.12)',fill:true,tension:.3,yAxisID:'y'},
      {label:'Impressions',data:D.jours.map(j=>j[2]),borderColor:'#e9c46a',backgroundColor:'rgba(233,196,106,.08)',fill:true,tension:.3,yAxisID:'y1'}]},
    options:{maintainAspectRatio:false,scales:{y:{position:'left'},y1:{position:'right',grid:{drawOnChartArea:false}}},plugins:{legend:{position:'top'}}}});
  chPos=new Chart($('#chPos'),{type:'bar',
    data:{labels:['Top 3','Top 10','Top 20','20+'],datasets:[{data:[0,0,0,0],backgroundColor:['#0e7c66','#2a9d8f','#e9c46a','#e76f51'],borderRadius:6}]},
    options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{title:{display:true,text:'requêtes'}}}}});
  if(D.ga4){
    chCanaux=new Chart($('#chCanaux'),{type:'doughnut',
      data:{labels:D.ga4.canaux.map(r=>r.sessionDefaultChannelGroup),datasets:[{data:D.ga4.canaux.map(r=>r.sessions),backgroundColor:['#0e7c66','#2a9d8f','#e9c46a','#f4a261','#e76f51','#264653','#8ab17d','#577590']}]},
      options:{maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{boxWidth:12,font:{size:11}}}}}});
  }
}

/* ---------- Rendu GA4 ---------- */
function renderGA4(){
  if(!D.ga4){$('#kpi-ga4').parentNode.querySelectorAll('.card,.grid2').forEach(e=>e.style.display='none');return;}
  const a=D.ga4;
  renderTable($('#t-canaux'),['Canal','Sessions','Utilis.','Conv.'],a.canaux.map(r=>[esc(r.sessionDefaultChannelGroup),r.sessions,r.totalUsers,r.keyEvents||0]));
  renderTable($('#t-conv'),['Événement','Conversions'],a.conversions.length?a.conversions.map(r=>[esc(r.eventName),r.keyEvents]):[['—',0]]);
  renderTable($('#t-convp'),['Page','Conversions'],a.conv_pages.length?a.conv_pages.map(r=>[esc(r.pagePath),r.keyEvents]):[['—',0]]);
  renderTable($('#t-sources'),['Source / Support','Sessions','Conv.'],a.sources.map(r=>[esc(r.sessionSource)+' / '+esc(r.sessionMedium),r.sessions,r.keyEvents||0]));
  renderTable($('#t-gdev'),['Appareil','Sessions','Utilis.','Conv.'],a.devices.map(r=>[r.deviceCategory,r.sessions,r.totalUsers,r.keyEvents||0]));
  renderTable($('#t-gpays'),['Pays','Sessions','Utilis.','Conv.'],a.pays.map(r=>[r.country,r.sessions,r.totalUsers,r.keyEvents||0]));
  renderTable($('#t-landing'),['Page','Sessions','Conv.'],a.landing.map(r=>[esc(r.landingPage),r.sessions,r.keyEvents||0]));
  renderTable($('#t-gpages'),['Page','Vues','Utilis.','Durée','Conv.'],a.pages.map(r=>[esc(r.pagePathPlusQueryString).slice(0,70),r.screenPageViews,r.totalUsers,Math.round(r.averageSessionDuration)+' s',r.keyEvents||0]));
}

/* ---------- Init ---------- */
function refresh(){renderReq();}
$('#periode').textContent=D.periode+' • vs '+D.prev;
$('#badge-gen').textContent='Généré le '+D.genere;
$('#foot-gen').textContent=D.genere;
renderKpis();
renderTable($('#t-pages'),['Page','Clics','Impr.','CTR %','Pos.'],D.pages.map(r=>[esc(r[0]),r[1],r[2],+(r[3]*100).toFixed(1),+r[4].toFixed(1)]));
renderTable($('#t-devices'),['Appareil','Clics','Impr.','CTR %','Pos.'],D.devices.map(r=>[r[0],r[1],r[2],+(r[3]*100).toFixed(1),+r[4].toFixed(1)]));
renderTable($('#t-pays'),['Pays','Clics','Impr.','CTR %','Pos.'],D.pays.map(r=>[r[0],r[1],r[2],+(r[3]*100).toFixed(1),+r[4].toFixed(1)]));
// Synthèse exécutive : objectifs + recommandations
if(D.derived){
  $('#obj').innerHTML=D.derived.objectives.map(o=>
    `<div style="background:${o.ok?'#d1fae5':o.proche?'#fef3c7':'#fde8e8'};border-radius:8px;padding:.6rem .8rem">
      <b style="color:#17805c">${o.ok?'✓':o.proche?'~':'✗'} ${esc(o.label)}</b>
      <div style="font-size:.8rem;color:#666">Valeur : ${o.val}</div></div>`).join('');
  $('#recos').innerHTML='<b style="color:#0a5c4d">Recommandations :</b><ul style="margin:.4rem 0 0 1.2rem">'
    +D.derived.recos.map(r=>`<li>${esc(r)}</li>`).join('')+'</ul>';
  renderTable($('#t-opps'),['Requête','Impr.','Pos.'],D.derived.opps.map(r=>[esc(r.keys[0]),r.impressions,+r.position.toFixed(1)]));
  renderTable($('#t-newq'),['Requête','Impr.','Pos.'],D.derived.new_q.map(r=>[esc(r.keys[0]),r.impressions,+r.position.toFixed(1)]));
}
initCharts();renderReq();renderGA4();
</script>
</body>
</html>
"""
