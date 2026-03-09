-- 005_beautiful_templates.sql
-- Cập nhật 4 mẫu thiệp cưới đẹp với animation

-- ============================================================
-- TEMPLATE 1: Classic "Vườn Hồng"
-- ============================================================
UPDATE templates SET
  name        = 'Classic - Vườn Hồng',
  description = 'Cổ điển lãng mạn với hoa hồng rơi, phong bì mở, màu kem & rose gold',
  thumbnail_url = 'https://placehold.co/600x400/fff8f3/c8956c?text=V%C6%B0%E1%BB%9Dn+H%E1%BB%93ng',
  html_content = $html_classic$
<div id="envelope-wrap">
  <div id="envelope">
    <div class="env-back"></div>
    <div class="env-body">
      <p class="env-title">Thiệp Cưới</p>
      <p class="env-sub">Nhấn để mở</p>
    </div>
    <div class="env-flap"></div>
  </div>
</div>
<canvas id="petals-canvas"></canvas>
<div id="invitation">
  <div class="deco-top">
    <svg viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,20 Q100,0 200,20 Q300,40 400,20" fill="none" stroke="#c8956c" stroke-width="1.5" opacity="0.6"/>
    </svg>
  </div>
  <p class="invite-line">Trân trọng kính mời</p>
  <p class="guest-name" id="guest-name"></p>
  <div class="divider"><span>✦</span></div>
  <h1 class="couple-names"><span class="name-shine" id="groom-name"></span><em class="amp"> &amp; </em><span class="name-shine" id="bride-name"></span></h1>
  <div class="divider"><span>✦</span></div>
  <section class="date-section" id="sec-date">
    <p class="section-label">Ngày trọng đại</p>
    <p class="wedding-date" id="wedding-date"></p>
    <p class="wedding-time" id="wedding-time"></p>
    <div class="countdown" id="countdown">
      <div class="cd-item"><span id="cd-d">--</span><label>Ngày</label></div>
      <div class="cd-item"><span id="cd-h">--</span><label>Giờ</label></div>
      <div class="cd-item"><span id="cd-m">--</span><label>Phút</label></div>
      <div class="cd-item"><span id="cd-s">--</span><label>Giây</label></div>
    </div>
  </section>
  <section class="venue-section" id="sec-venue">
    <div class="ornament">— ✿ —</div>
    <p class="section-label">Địa điểm</p>
    <p class="venue-name" id="venue-name"></p>
    <p class="venue-addr" id="venue-address"></p>
    <a class="maps-btn" id="maps-link" href="#" target="_blank">🗺 Xem bản đồ</a>
  </section>
  <section class="story-section" id="sec-story">
    <div class="ornament">— ✿ —</div>
    <p class="story-text" id="story-text"></p>
  </section>
  <section class="photos-section" id="sec-photos">
    <div class="photo-grid" id="photo-grid"></div>
  </section>
  <footer class="inv-footer">
    <div class="ornament">— ✿ —</div>
    <p class="hashtag" id="hashtag-text"></p>
    <button class="music-btn" id="music-btn">♪ Nhạc nền</button>
    <audio id="bg-audio" loop></audio>
  </footer>
</div>
$html_classic$,
  css_content  = $css_classic$
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;overflow-x:hidden;background:#fff8f3}
body{font-family:'Cormorant Garamond',serif;color:#5c3d2e;min-height:100vh}

/* ── Envelope ── */
#envelope-wrap{
  position:fixed;inset:0;z-index:100;display:flex;align-items:center;
  justify-content:center;background:#fff8f3;cursor:pointer;
  transition:opacity .8s,visibility .8s
}
#envelope-wrap.hidden{opacity:0;visibility:hidden;pointer-events:none}
#envelope{
  position:relative;width:320px;height:220px;
  filter:drop-shadow(0 8px 32px rgba(200,149,108,.35))
}
.env-back{
  position:absolute;inset:0;background:linear-gradient(135deg,#f3ddd0,#e8c4a8);
  border-radius:4px;border:1px solid #c8956c
}
.env-body{
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:8px
}
.env-title{font-family:'Great Vibes',cursive;font-size:2.2rem;color:#8b5c3c}
.env-sub{font-size:.85rem;letter-spacing:.2em;color:#c8956c;animation:pulse 1.6s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
.env-flap{
  position:absolute;top:0;left:0;right:0;height:50%;
  background:linear-gradient(160deg,#e8c4a8,#dba880);
  clip-path:polygon(0 0,100% 0,50% 100%);
  transform-origin:top center;
  transition:transform .6s ease;border-radius:4px 4px 0 0;
  border:1px solid #c8956c
}
#envelope-wrap:hover .env-flap{transform:rotateX(-160deg)}

/* ── Canvas ── */
#petals-canvas{
  position:fixed;top:0;left:0;width:100%;height:100%;
  pointer-events:none;z-index:1;opacity:0;
  transition:opacity 1s
}
#petals-canvas.show{opacity:1}

/* ── Main Invitation ── */
#invitation{
  max-width:680px;margin:0 auto;padding:3rem 2rem 4rem;
  text-align:center;opacity:0;
  background:linear-gradient(180deg,#fff8f3 0%,#fdf0e8 100%)
}
#invitation.show{animation:fadeInUp .8s ease forwards}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

.deco-top svg{width:100%;max-width:380px;margin-bottom:1.5rem}

.invite-line{
  font-size:1rem;letter-spacing:.35em;text-transform:uppercase;
  color:#c8956c;margin-bottom:.75rem
}
.guest-name{
  font-family:'Great Vibes',cursive;font-size:2.4rem;
  color:#8b5c3c;margin-bottom:.5rem
}
.divider{font-size:1.1rem;color:#c8956c;margin:.75rem 0;letter-spacing:.5em}
.couple-names{
  font-family:'Great Vibes',cursive;font-size:3.8rem;
  line-height:1.15;color:#8b5c3c;margin:.5rem 0
}
.amp{font-size:2.4rem;color:#c8956c}
.name-shine{
  display:inline-block;
  background:linear-gradient(90deg,#8b5c3c 0%,#d4a853 40%,#c8956c 60%,#8b5c3c 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  animation:shine 3.5s linear infinite
}
@keyframes shine{to{background-position:200% center}}

/* ── Sections ── */
.date-section,.venue-section,.story-section,.photos-section{
  margin:2.5rem 0;opacity:0;transform:translateY(24px);
  transition:opacity .7s,transform .7s
}
.date-section.visible,.venue-section.visible,
.story-section.visible,.photos-section.visible{opacity:1;transform:translateY(0)}

.section-label{
  font-size:.8rem;letter-spacing:.4em;text-transform:uppercase;
  color:#c8956c;margin-bottom:.75rem
}
.wedding-date{font-size:1.9rem;font-weight:300;color:#5c3d2e;letter-spacing:.06em}
.wedding-time{font-size:1.1rem;color:#c8956c;margin-top:.3rem}
.ornament{font-size:1rem;color:#c8956c;margin:1.2rem 0;letter-spacing:.4em}

/* ── Countdown ── */
.countdown{
  display:flex;justify-content:center;gap:1.2rem;margin-top:1.5rem
}
.cd-item{
  background:linear-gradient(135deg,#fdf0e8,#f3ddd0);
  border:1px solid #e0b898;border-radius:10px;
  padding:.9rem 1.2rem;min-width:64px;
  box-shadow:0 2px 12px rgba(200,149,108,.15)
}
.cd-item span{
  display:block;font-size:2rem;font-weight:300;
  color:#8b5c3c;line-height:1;font-variant-numeric:tabular-nums
}
.cd-item label{font-size:.65rem;letter-spacing:.2em;color:#c8956c;text-transform:uppercase}

/* ── Venue ── */
.venue-name{font-size:1.35rem;font-weight:400;color:#5c3d2e;margin-bottom:.4rem}
.venue-addr{font-size:.95rem;color:#8b7060;line-height:1.6}
.maps-btn{
  display:inline-block;margin-top:1rem;padding:.55rem 1.4rem;
  border:1px solid #c8956c;color:#c8956c;border-radius:50px;
  font-size:.85rem;letter-spacing:.1em;text-decoration:none;
  transition:background .25s,color .25s
}
.maps-btn:hover{background:#c8956c;color:#fff}

/* ── Story ── */
.story-text{
  font-size:1.05rem;line-height:1.9;color:#7a5844;
  font-style:italic;max-width:540px;margin:0 auto
}

/* ── Photos ── */
.photo-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:10px;max-width:540px;margin:0 auto
}
.photo-grid img{
  width:100%;aspect-ratio:3/4;object-fit:cover;
  border-radius:6px;border:3px solid #fff;
  box-shadow:0 4px 16px rgba(0,0,0,.1);
  transition:transform .3s;cursor:pointer
}
.photo-grid img:hover{transform:scale(1.03)}

/* ── Footer ── */
.inv-footer{margin-top:2.5rem;padding-top:1.5rem}
.hashtag{font-family:'Great Vibes',cursive;font-size:1.6rem;color:#c8956c;margin-bottom:1rem}
.music-btn{
  background:linear-gradient(135deg,#c8956c,#d4a853);
  color:#fff;border:none;border-radius:50px;
  padding:.6rem 1.8rem;font-size:.9rem;letter-spacing:.1em;
  cursor:pointer;transition:opacity .25s;display:none
}
.music-btn:hover{opacity:.85}
.music-btn.playing{background:linear-gradient(135deg,#d4a853,#c8956c)}
$css_classic$,
  js_content   = $js_classic$
(function(){
  var d = window.WEDDING_DATA || {};

  /* Populate data */
  function set(id,val){var el=document.getElementById(id);if(el&&val)el.textContent=val;}
  set('groom-name', d.groom_name);
  set('bride-name', d.bride_name);
  set('guest-name', d.guest_name ? 'Kính gửi: ' + d.guest_name : '');
  set('wedding-date', d.wedding_date ? new Date(d.wedding_date).toLocaleDateString('vi-VN',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '');
  set('wedding-time', d.wedding_time ? '⏰ ' + d.wedding_time : '');
  set('venue-name', d.venue_name);
  set('venue-address', d.venue_address);
  set('story-text', d.story);
  if(d.hashtag){set('hashtag-text','#'+d.hashtag);}
  var mapsLink=document.getElementById('maps-link');
  if(mapsLink&&d.venue_maps_url){mapsLink.href=d.venue_maps_url;}else if(mapsLink){mapsLink.style.display='none';}

  /* Photos */
  if(d.couple_photos&&d.couple_photos.length){
    var grid=document.getElementById('photo-grid');
    d.couple_photos.forEach(function(url){
      var img=document.createElement('img');img.src=url;img.alt='Ảnh cưới';grid.appendChild(img);
    });
  } else {document.getElementById('sec-photos').style.display='none';}

  /* Music */
  if(d.music_url){
    var btn=document.getElementById('music-btn');
    var audio=document.getElementById('bg-audio');
    audio.src=d.music_url;btn.style.display='inline-block';
    btn.addEventListener('click',function(){
      if(audio.paused){audio.play();btn.textContent='⏸ Dừng nhạc';btn.classList.add('playing');}
      else{audio.pause();btn.textContent='♪ Nhạc nền';btn.classList.remove('playing');}
    });
  }

  /* Countdown */
  function updateCd(){
    if(!d.wedding_date)return;
    var target=new Date(d.wedding_date+' '+(d.wedding_time||'00:00'));
    var now=new Date();var diff=target-now;
    if(diff<=0){document.getElementById('countdown').innerHTML='<p style="color:#c8956c;letter-spacing:.2em">Hạnh phúc mãi mãi ✦</p>';return;}
    var days=Math.floor(diff/864e5);
    var hours=Math.floor((diff%864e5)/36e5);
    var mins=Math.floor((diff%36e5)/6e4);
    var secs=Math.floor((diff%6e4)/1e3);
    function set2(id,v){var el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0');}
    set2('cd-d',days);set2('cd-h',hours);set2('cd-m',mins);set2('cd-s',secs);
  }
  updateCd();setInterval(updateCd,1000);

  /* Petal Canvas */
  var canvas=document.getElementById('petals-canvas');
  var ctx=canvas.getContext('2d');
  var petals=[];
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  var colors=['#f4a0a0','#e8c4a8','#f9d5d5','#dba880','#fce4ec'];
  for(var i=0;i<22;i++){
    petals.push({
      x:Math.random()*window.innerWidth,y:Math.random()*-window.innerHeight,
      r:Math.random()*8+5,vy:Math.random()*1.2+.5,vx:(Math.random()-.5)*.8,
      angle:Math.random()*Math.PI*2,va:(Math.random()-.5)*.04,
      color:colors[Math.floor(Math.random()*colors.length)],alpha:Math.random()*.6+.4
    });
  }
  function drawPetal(p){
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);
    ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;
    ctx.beginPath();
    ctx.ellipse(0,0,p.r,p.r/2.2,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
  function animPetals(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    petals.forEach(function(p){
      p.y+=p.vy;p.x+=p.vx+Math.sin(p.y*.015)*.6;p.angle+=p.va;
      if(p.y>canvas.height+20){p.y=-20;p.x=Math.random()*canvas.width;}
      drawPetal(p);
    });
    requestAnimationFrame(animPetals);
  }
  animPetals();

  /* Envelope reveal */
  var wrap=document.getElementById('envelope-wrap');
  var inv=document.getElementById('invitation');
  function reveal(){
    wrap.classList.add('hidden');
    canvas.classList.add('show');
    inv.classList.add('show');
    observeSections();
  }
  wrap.addEventListener('click',function(){
    document.getElementById('envelope').style.transform='scale(.92)';
    setTimeout(reveal,400);
  });
  /* Auto-reveal after 4s if no click */
  setTimeout(function(){if(!wrap.classList.contains('hidden'))reveal();},4000);

  /* IntersectionObserver for sections */
  function observeSections(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});
    },{threshold:.15});
    ['sec-date','sec-venue','sec-story','sec-photos'].forEach(function(id){
      var el=document.getElementById(id);if(el)io.observe(el);
    });
  }
})();
$js_classic$
WHERE slug = 'classic';

-- ============================================================
-- TEMPLATE 2: Modern "Minimalist Gold"
-- ============================================================
UPDATE templates SET
  name        = 'Modern - Minimalist Gold',
  description = 'Tối giản hiện đại, typography sắc nét, đường kẻ vàng, countdown ring SVG',
  thumbnail_url = 'https://placehold.co/600x400/f9f9f7/d4a853?text=Minimalist+Gold',
  html_content = $html_modern$
<div id="page">
  <div class="line-top" id="line-top"></div>
  <header class="hero" id="sec-hero">
    <p class="pre-text reveal-text">WE ARE GETTING MARRIED</p>
    <h1 class="names reveal-text"><span id="groom-name"></span><span class="sep">×</span><span id="bride-name"></span></h1>
    <div class="line-mid"></div>
    <p class="guest-invite reveal-text" id="guest-line"></p>
  </header>
  <section class="date-ring-section" id="sec-date">
    <div class="ring-wrap">
      <svg class="ring-svg" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="88" fill="none" stroke="#e8e8e6" stroke-width="6"/>
        <circle id="ring-progress" cx="100" cy="100" r="88" fill="none"
          stroke="#d4a853" stroke-width="6" stroke-linecap="round"
          stroke-dasharray="553" stroke-dashoffset="553"
          transform="rotate(-90 100 100)"/>
      </svg>
      <div class="ring-inner">
        <div class="countdown-ring" id="countdown">
          <div class="cd-row"><span id="cd-d">--</span><label>D</label></div>
          <div class="cd-sep">:</div>
          <div class="cd-row"><span id="cd-h">--</span><label>H</label></div>
          <div class="cd-sep">:</div>
          <div class="cd-row"><span id="cd-m">--</span><label>M</label></div>
          <div class="cd-sep">:</div>
          <div class="cd-row"><span id="cd-s">--</span><label>S</label></div>
        </div>
      </div>
    </div>
    <p class="date-text" id="wedding-date"></p>
    <p class="time-text" id="wedding-time"></p>
  </section>
  <section class="venue-section reveal-section" id="sec-venue">
    <div class="gold-line"></div>
    <p class="section-tag">VENUE</p>
    <p class="venue-name" id="venue-name"></p>
    <p class="venue-addr" id="venue-address"></p>
    <a class="maps-link" id="maps-link" href="#" target="_blank">VIEW MAP →</a>
  </section>
  <section class="story-section reveal-section" id="sec-story">
    <div class="gold-line"></div>
    <p class="story-text" id="story-text"></p>
  </section>
  <section class="photos-section reveal-section" id="sec-photos">
    <div class="photo-row" id="photo-grid"></div>
  </section>
  <footer class="mod-footer reveal-section" id="sec-footer">
    <div class="gold-line"></div>
    <p class="hashtag" id="hashtag-text"></p>
    <button class="music-btn" id="music-btn">▶ PLAY MUSIC</button>
    <audio id="bg-audio" loop></audio>
    <div class="line-bot"></div>
  </footer>
</div>
$html_modern$,
  css_content  = $css_modern$
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;background:#f9f9f7;color:#1a1a1a;overflow-x:hidden}
body{font-family:'Outfit',sans-serif}

#page{max-width:700px;margin:0 auto;padding:4rem 2rem}

/* ── Top line draw ── */
.line-top{
  height:2px;background:linear-gradient(90deg,transparent,#d4a853,transparent);
  width:0;transition:width 1.2s ease;margin-bottom:3rem
}
.line-top.drawn{width:100%}

/* ── Hero ── */
.hero{text-align:center;margin-bottom:4rem}
.pre-text{
  font-size:.7rem;letter-spacing:.5em;text-transform:uppercase;
  color:#d4a853;margin-bottom:2rem
}
.names{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:3.4rem;font-weight:400;letter-spacing:.03em;
  color:#1a1a1a;line-height:1.2;margin-bottom:1.5rem
}
.sep{
  display:inline-block;font-style:normal;color:#d4a853;
  font-size:2rem;margin:0 .6rem;vertical-align:middle
}
.line-mid{
  width:0;height:1px;background:#d4a853;margin:.8rem auto 1.5rem;
  transition:width 1s ease .5s
}
.line-mid.drawn{width:60%}
.guest-invite{font-size:1rem;color:#555;letter-spacing:.1em}

/* ── Date / Ring ── */
.date-ring-section{text-align:center;margin:2rem 0 3rem}
.ring-wrap{position:relative;width:200px;height:200px;margin:0 auto 1.5rem}
.ring-svg{position:absolute;inset:0;width:100%;height:100%}
.ring-inner{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center
}
.countdown-ring{display:flex;align-items:center;gap:2px}
.cd-row{text-align:center}
.cd-row span{
  display:block;font-size:1.3rem;font-weight:200;color:#1a1a1a;
  font-variant-numeric:tabular-nums;line-height:1
}
.cd-row label{font-size:.55rem;color:#d4a853;letter-spacing:.2em}
.cd-sep{color:#d4a853;font-size:1.1rem;font-weight:200;padding-bottom:8px}
.date-text{font-size:1.15rem;font-weight:300;letter-spacing:.12em;color:#333}
.time-text{font-size:.9rem;color:#d4a853;letter-spacing:.15em;margin-top:.3rem}

/* ── Gold line separator ── */
.gold-line{
  width:48px;height:1px;background:#d4a853;margin:0 auto 1.8rem
}

/* ── Sections ── */
.reveal-section{
  text-align:center;margin:2.5rem 0;
  opacity:0;transform:translateY(20px);
  transition:opacity .7s,transform .7s
}
.reveal-section.visible{opacity:1;transform:translateY(0)}
.section-tag{
  font-size:.65rem;letter-spacing:.55em;text-transform:uppercase;
  color:#d4a853;margin-bottom:.8rem
}
.venue-name{font-family:'Playfair Display',serif;font-size:1.5rem;margin-bottom:.4rem}
.venue-addr{font-size:.9rem;color:#666;line-height:1.7}
.maps-link{
  display:inline-block;margin-top:.9rem;font-size:.7rem;
  letter-spacing:.3em;color:#d4a853;text-decoration:none;
  border-bottom:1px solid #d4a853;padding-bottom:2px;
  transition:color .2s
}
.maps-link:hover{color:#1a1a1a}
.story-text{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:1rem;line-height:2;color:#444;max-width:520px;margin:0 auto
}
.photo-row{
  display:flex;gap:8px;justify-content:center;flex-wrap:wrap
}
.photo-row img{
  width:calc(33% - 6px);max-width:200px;aspect-ratio:2/3;
  object-fit:cover;filter:grayscale(20%);
  transition:filter .3s,transform .3s
}
.photo-row img:hover{filter:none;transform:scale(1.02)}

/* ── Footer ── */
.mod-footer{padding-bottom:2rem}
.hashtag{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:1.4rem;color:#d4a853;margin-bottom:1.2rem
}
.music-btn{
  background:transparent;border:1px solid #d4a853;color:#d4a853;
  padding:.5rem 1.6rem;font-size:.7rem;letter-spacing:.3em;
  cursor:pointer;transition:all .25s;display:none
}
.music-btn:hover,.music-btn.playing{background:#d4a853;color:#fff}
.line-bot{
  width:0;height:1px;background:linear-gradient(90deg,transparent,#d4a853,transparent);
  margin-top:2rem;transition:width 1.2s ease
}
.line-bot.drawn{width:100%}

/* ── Reveal text ── */
.reveal-text{opacity:0;transform:translateY(16px);transition:opacity .7s,transform .7s}
.reveal-text.visible{opacity:1;transform:translateY(0)}
$css_modern$,
  js_content   = $js_modern$
(function(){
  var d = window.WEDDING_DATA || {};

  function set(id,val){var el=document.getElementById(id);if(el&&val)el.textContent=val;}
  set('groom-name', d.groom_name || '');
  set('bride-name', d.bride_name || '');
  var gLine=document.getElementById('guest-line');
  if(gLine) gLine.textContent = d.guest_name ? 'Kính mời · ' + d.guest_name : 'Trân trọng kính mời';
  set('wedding-date', d.wedding_date ? new Date(d.wedding_date).toLocaleDateString('vi-VN',{year:'numeric',month:'long',day:'numeric'}).toUpperCase() : '');
  set('wedding-time', d.wedding_time || '');
  set('venue-name', d.venue_name);
  set('venue-address', d.venue_address);
  set('story-text', d.story);
  if(d.hashtag) set('hashtag-text','#'+d.hashtag);
  var mLink=document.getElementById('maps-link');
  if(mLink&&d.venue_maps_url){mLink.href=d.venue_maps_url;}else if(mLink){mLink.style.display='none';}

  /* Photos */
  if(d.couple_photos&&d.couple_photos.length){
    var grid=document.getElementById('photo-grid');
    d.couple_photos.slice(0,3).forEach(function(url){
      var img=document.createElement('img');img.src=url;img.alt='Photo';grid.appendChild(img);
    });
  } else { document.getElementById('sec-photos').style.display='none'; }

  /* Music */
  if(d.music_url){
    var btn=document.getElementById('music-btn');var audio=document.getElementById('bg-audio');
    audio.src=d.music_url;btn.style.display='inline-block';
    btn.addEventListener('click',function(){
      if(audio.paused){audio.play();btn.textContent='⏸ PAUSE';btn.classList.add('playing');}
      else{audio.pause();btn.textContent='▶ PLAY MUSIC';btn.classList.remove('playing');}
    });
  }

  /* Countdown + ring */
  var ring=document.getElementById('ring-progress');
  var totalDays=365;
  function updateCd(){
    if(!d.wedding_date)return;
    var target=new Date(d.wedding_date+' '+(d.wedding_time||'00:00'));
    var now=new Date();var diff=target-now;
    if(diff<=0){document.getElementById('countdown').innerHTML='<p style="color:#d4a853;font-size:.85rem;letter-spacing:.1em">FOREVER ♥</p>';return;}
    var days=Math.floor(diff/864e5);
    var hours=Math.floor((diff%864e5)/36e5);
    var mins=Math.floor((diff%36e5)/6e4);
    var secs=Math.floor((diff%6e4)/1e3);
    function s2(id,v){var el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0');}
    s2('cd-d',days);s2('cd-h',hours);s2('cd-m',mins);s2('cd-s',secs);
    /* Ring progress – based on days remaining vs totalDays */
    if(ring){
      var pct=Math.max(0,Math.min(1,(totalDays-days)/totalDays));
      var circ=553;ring.style.strokeDashoffset=circ*(1-pct);
    }
  }
  updateCd();setInterval(updateCd,1000);

  /* Entrance animations */
  setTimeout(function(){
    var lt=document.getElementById('line-top');if(lt)lt.classList.add('drawn');
    var lm=document.querySelector('.line-mid');if(lm)lm.classList.add('drawn');
    document.querySelectorAll('.reveal-text').forEach(function(el,i){
      setTimeout(function(){el.classList.add('visible');},i*200+300);
    });
  },100);

  /* IntersectionObserver */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        if(e.target.id==='sec-footer'){
          var lb=document.querySelector('.line-bot');if(lb)lb.classList.add('drawn');
        }
      }
    });
  },{threshold:.15});
  ['sec-date','sec-venue','sec-story','sec-photos','sec-footer'].forEach(function(id){
    var el=document.getElementById(id);if(el)io.observe(el);
  });
})();
$js_modern$
WHERE slug = 'modern';

-- ============================================================
-- TEMPLATE 3: Boho "Wildflower"
-- ============================================================
UPDATE templates SET
  name        = 'Boho - Wildflower',
  description = 'Đồng quê bohemian, lá rơi CSS, botanical SVG, tone đất ấm áp',
  thumbnail_url = 'https://placehold.co/600x400/f5ede0/b85c3c?text=Wildflower',
  html_content = $html_boho$
<div id="leaves-layer" aria-hidden="true"></div>
<div id="page">
  <div class="watercolor-bg" id="wc-bg"></div>
  <header class="hero" id="sec-hero">
    <svg class="botanical-top" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
      <path class="botanical-path" d="M30,70 Q80,10 150,40 Q220,70 270,20" fill="none" stroke="#6b8c5f" stroke-width="1.5" stroke-linecap="round"/>
      <path class="botanical-path" d="M60,65 Q90,30 120,50" fill="none" stroke="#b85c3c" stroke-width="1" stroke-linecap="round" style="animation-delay:.4s"/>
      <circle cx="270" cy="20" r="4" fill="#b85c3c" opacity=".7"/>
      <circle cx="150" cy="40" r="3" fill="#6b8c5f" opacity=".8"/>
    </svg>
    <p class="invite-tag">~ Trân trọng kính mời ~</p>
    <p class="guest-name" id="guest-name"></p>
    <h1 class="couple-names"><span id="groom-name"></span><span class="amp">♡</span><span id="bride-name"></span></h1>
    <p class="tagline">Cùng nhau viết câu chuyện mới</p>
    <svg class="botanical-bot" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
      <path class="botanical-path" d="M30,10 Q80,70 150,40 Q220,10 270,60" fill="none" stroke="#6b8c5f" stroke-width="1.5" stroke-linecap="round" style="animation-delay:.2s"/>
      <path class="botanical-path" d="M180,45 Q210,20 240,50" fill="none" stroke="#b85c3c" stroke-width="1" stroke-linecap="round" style="animation-delay:.6s"/>
    </svg>
  </header>
  <section class="date-section reveal-section" id="sec-date">
    <p class="sec-tag">✦ Ngày trọng đại ✦</p>
    <p class="wedding-date" id="wedding-date"></p>
    <p class="wedding-time" id="wedding-time"></p>
    <div class="countdown" id="countdown">
      <div class="cd-item"><span id="cd-d">--</span><label>ngày</label></div>
      <div class="cd-item"><span id="cd-h">--</span><label>giờ</label></div>
      <div class="cd-item"><span id="cd-m">--</span><label>phút</label></div>
      <div class="cd-item"><span id="cd-s">--</span><label>giây</label></div>
    </div>
  </section>
  <section class="venue-section reveal-section" id="sec-venue">
    <div class="branch-divider">
      <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,12 Q60,2 100,12 Q140,22 190,12" fill="none" stroke="#6b8c5f" stroke-width="1.2"/>
        <circle cx="100" cy="12" r="3" fill="#b85c3c"/>
      </svg>
    </div>
    <p class="sec-tag">✦ Địa điểm ✦</p>
    <p class="venue-name" id="venue-name"></p>
    <p class="venue-addr" id="venue-address"></p>
    <a class="maps-btn" id="maps-link" href="#" target="_blank">🌿 Xem bản đồ</a>
  </section>
  <section class="story-section reveal-section" id="sec-story">
    <div class="branch-divider">
      <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,12 Q60,22 100,12 Q140,2 190,12" fill="none" stroke="#b85c3c" stroke-width="1.2"/>
        <circle cx="100" cy="12" r="3" fill="#6b8c5f"/>
      </svg>
    </div>
    <p class="story-text" id="story-text"></p>
  </section>
  <section class="photos-section reveal-section" id="sec-photos">
    <div class="photo-masonry" id="photo-grid"></div>
  </section>
  <footer class="boho-footer reveal-section">
    <div class="branch-divider">
      <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,12 Q60,2 100,12 Q140,22 190,12" fill="none" stroke="#6b8c5f" stroke-width="1.2"/>
        <circle cx="100" cy="12" r="3" fill="#b85c3c"/>
      </svg>
    </div>
    <p class="hashtag" id="hashtag-text"></p>
    <button class="music-btn" id="music-btn">♪ Nhạc nền</button>
    <audio id="bg-audio" loop></audio>
  </footer>
</div>
$html_boho$,
  css_content  = $css_boho$
@import url('https://fonts.googleapis.com/css2?family=Sacramento&family=Josefin+Sans:ital,wght@0,200;0,300;1,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;overflow-x:hidden}
body{font-family:'Josefin Sans',sans-serif;color:#4a3728;background:#f5ede0;min-height:100vh}

/* ── Leaves ── */
#leaves-layer{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.leaf{
  position:absolute;top:-60px;width:18px;height:30px;border-radius:50% 0 50% 0;
  opacity:.55;animation:leafFall linear infinite
}
@keyframes leafFall{
  0%{transform:translateY(0) rotate(0deg) translateX(0)}
  25%{transform:translateY(25vh) rotate(45deg) translateX(20px)}
  50%{transform:translateY(50vh) rotate(90deg) translateX(-15px)}
  75%{transform:translateY(75vh) rotate(135deg) translateX(25px)}
  100%{transform:translateY(110vh) rotate(180deg) translateX(-10px)}
}

/* ── Watercolor BG ── */
.watercolor-bg{
  position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 50% at 20% 30%,rgba(184,92,60,.07),transparent),
    radial-gradient(ellipse 60% 60% at 80% 70%,rgba(107,140,95,.09),transparent),
    radial-gradient(ellipse 90% 40% at 50% 50%,rgba(245,237,224,.6),transparent);
  clip-path:inset(0 100% 0 0);
  transition:clip-path 1.5s ease
}
.watercolor-bg.reveal{clip-path:inset(0 0% 0 0)}

/* ── Page ── */
#page{position:relative;z-index:1;max-width:660px;margin:0 auto;padding:3rem 2rem 5rem;text-align:center}

/* ── Botanical SVG paths ── */
.botanical-path{
  stroke-dasharray:400;stroke-dashoffset:400;
  animation:drawPath 2s ease forwards
}
@keyframes drawPath{to{stroke-dashoffset:0}}
.botanical-top,.botanical-bot{width:100%;max-width:300px}

/* ── Hero ── */
.invite-tag{
  font-size:.85rem;letter-spacing:.25em;color:#b85c3c;
  margin:1.5rem 0 .5rem;font-weight:300
}
.guest-name{
  font-family:'Sacramento',cursive;font-size:2.2rem;
  color:#6b4423;margin-bottom:.4rem
}
.couple-names{
  font-family:'Sacramento',cursive;font-size:4.2rem;
  color:#8b4513;line-height:1.1;margin:.4rem 0
}
.amp{font-size:2.5rem;color:#b85c3c;display:inline-block;margin:0 .3rem}
.tagline{
  font-size:.9rem;font-style:italic;font-weight:300;
  color:#7a5844;letter-spacing:.1em;margin-top:.8rem
}

/* ── Sections ── */
.reveal-section{
  margin:2rem 0;opacity:0;transform:translateY(20px);
  transition:opacity .8s,transform .8s
}
.reveal-section.visible{opacity:1;transform:translateY(0)}
.sec-tag{
  font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;
  color:#b85c3c;margin-bottom:1rem;font-weight:300
}

/* ── Date ── */
.wedding-date{font-family:'Sacramento',cursive;font-size:2.4rem;color:#8b4513}
.wedding-time{font-size:.9rem;color:#b85c3c;letter-spacing:.15em;margin-top:.3rem}
.countdown{display:flex;justify-content:center;gap:1rem;margin-top:1.5rem}
.cd-item{
  background:rgba(255,255,255,.55);border:1px solid rgba(184,92,60,.25);
  border-radius:8px;padding:.7rem 1rem;min-width:58px;
  backdrop-filter:blur(4px)
}
.cd-item span{
  display:block;font-family:'Sacramento',cursive;font-size:2rem;
  color:#8b4513;line-height:1;font-variant-numeric:tabular-nums
}
.cd-item label{font-size:.65rem;color:#b85c3c;letter-spacing:.15em;text-transform:uppercase}

/* ── Branch divider ── */
.branch-divider{margin:1.5rem 0}
.branch-divider svg{width:180px}

/* ── Venue ── */
.venue-name{font-family:'Sacramento',cursive;font-size:1.9rem;color:#8b4513;margin-bottom:.3rem}
.venue-addr{font-size:.9rem;color:#7a5844;line-height:1.7;font-weight:300}
.maps-btn{
  display:inline-block;margin-top:.9rem;padding:.5rem 1.3rem;
  border:1px solid #6b8c5f;color:#6b8c5f;border-radius:30px;
  font-size:.8rem;letter-spacing:.1em;text-decoration:none;
  transition:background .25s,color .25s
}
.maps-btn:hover{background:#6b8c5f;color:#fff}

/* ── Story ── */
.story-text{
  font-size:1rem;font-style:italic;font-weight:300;
  line-height:2;color:#5a4030;max-width:500px;margin:0 auto
}

/* ── Photos ── */
.photo-masonry{
  display:grid;grid-template-columns:repeat(2,1fr);gap:8px;max-width:460px;margin:0 auto
}
.photo-masonry img{
  width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:4px;
  border:3px solid #fff;box-shadow:0 3px 12px rgba(0,0,0,.08);
  filter:saturate(.9);transition:filter .3s,transform .3s
}
.photo-masonry img:nth-child(odd){margin-top:20px}
.photo-masonry img:hover{filter:saturate(1.1);transform:scale(1.02)}

/* ── Footer ── */
.boho-footer{padding-bottom:2rem}
.hashtag{font-family:'Sacramento',cursive;font-size:2rem;color:#b85c3c;margin-bottom:1rem}
.music-btn{
  background:linear-gradient(135deg,#b85c3c,#8b4513);
  color:#fff;border:none;border-radius:30px;
  padding:.55rem 1.6rem;font-size:.85rem;cursor:pointer;
  transition:opacity .2s;display:none
}
.music-btn:hover{opacity:.85}
$css_boho$,
  js_content   = $js_boho$
(function(){
  var d = window.WEDDING_DATA || {};

  function set(id,val){var el=document.getElementById(id);if(el&&val)el.textContent=val;}
  set('groom-name', d.groom_name);
  set('bride-name', d.bride_name);
  set('guest-name', d.guest_name ? '🌿 ' + d.guest_name : '');
  set('wedding-date', d.wedding_date ? new Date(d.wedding_date).toLocaleDateString('vi-VN',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '');
  set('wedding-time', d.wedding_time || '');
  set('venue-name', d.venue_name);
  set('venue-address', d.venue_address);
  set('story-text', d.story);
  if(d.hashtag) set('hashtag-text','#'+d.hashtag);
  var mLink=document.getElementById('maps-link');
  if(mLink&&d.venue_maps_url){mLink.href=d.venue_maps_url;}else if(mLink){mLink.style.display='none';}

  /* Watercolor reveal */
  setTimeout(function(){
    var bg=document.getElementById('wc-bg');if(bg)bg.classList.add('reveal');
  },100);

  /* Floating leaves */
  var layer=document.getElementById('leaves-layer');
  var leafColors=['#6b8c5f','#8fac72','#b85c3c','#d4956c','#a0c080'];
  for(var i=0;i<18;i++){
    var leaf=document.createElement('div');
    leaf.className='leaf';
    leaf.style.left=Math.random()*100+'%';
    leaf.style.animationDuration=(Math.random()*10+8)+'s';
    leaf.style.animationDelay=(-Math.random()*12)+'s';
    leaf.style.background=leafColors[Math.floor(Math.random()*leafColors.length)];
    leaf.style.transform='rotate('+(Math.random()*360)+'deg)';
    layer.appendChild(leaf);
  }

  /* Photos */
  if(d.couple_photos&&d.couple_photos.length){
    var grid=document.getElementById('photo-grid');
    d.couple_photos.forEach(function(url){
      var img=document.createElement('img');img.src=url;img.alt='Ảnh cưới';grid.appendChild(img);
    });
  } else { document.getElementById('sec-photos').style.display='none'; }

  /* Music */
  if(d.music_url){
    var btn=document.getElementById('music-btn');var audio=document.getElementById('bg-audio');
    audio.src=d.music_url;btn.style.display='inline-block';
    btn.addEventListener('click',function(){
      if(audio.paused){audio.play();btn.textContent='⏸ Dừng nhạc';}
      else{audio.pause();btn.textContent='♪ Nhạc nền';}
    });
  }

  /* Countdown */
  function updateCd(){
    if(!d.wedding_date)return;
    var target=new Date(d.wedding_date+' '+(d.wedding_time||'00:00'));
    var now=new Date();var diff=target-now;
    if(diff<=0){document.getElementById('countdown').innerHTML='<p style="font-family:Sacramento,cursive;font-size:1.8rem;color:#8b4513">Hạnh phúc mãi mãi ♡</p>';return;}
    var days=Math.floor(diff/864e5);
    var hrs=Math.floor((diff%864e5)/36e5);
    var mins=Math.floor((diff%36e5)/6e4);
    var secs=Math.floor((diff%6e4)/1e3);
    function s2(id,v){var el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0');}
    s2('cd-d',days);s2('cd-h',hrs);s2('cd-m',mins);s2('cd-s',secs);
  }
  updateCd();setInterval(updateCd,1000);

  /* IntersectionObserver */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:.12});
  document.querySelectorAll('.reveal-section').forEach(function(el){io.observe(el);});
})();
$js_boho$
WHERE slug = 'boho';

-- ============================================================
-- TEMPLATE 4: Luxury "Black Velvet"
-- ============================================================
UPDATE templates SET
  name        = 'Luxury - Black Velvet',
  description = 'Sang trọng hào nhoáng, nền đen nhung, particles vàng, hiệu ứng sparkle',
  thumbnail_url = 'https://placehold.co/600x400/0d0d0d/d4af37?text=Black+Velvet',
  html_content = $html_luxury$
<canvas id="particles-canvas"></canvas>
<div id="page">
  <div class="luxury-frame">
    <div class="frame-corner top-left"></div>
    <div class="frame-corner top-right"></div>
    <div class="frame-corner bot-left"></div>
    <div class="frame-corner bot-right"></div>
  </div>
  <header class="hero" id="sec-hero">
    <div class="crown-ornament">
      <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20,45 50,10 80,35 100,5 120,35 150,10 180,45" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="20" cy="45" r="3" fill="#d4af37"/>
        <circle cx="100" cy="5" r="4" fill="#d4af37"/>
        <circle cx="180" cy="45" r="3" fill="#d4af37"/>
      </svg>
    </div>
    <p class="pre-text" id="pre-text">WE INVITE YOU TO OUR WEDDING</p>
    <p class="guest-line" id="guest-line"></p>
    <h1 class="couple-names" id="couple-names">
      <span class="name-reveal" id="groom-name"></span>
      <span class="gold-sep">&amp;</span>
      <span class="name-reveal" id="bride-name"></span>
    </h1>
    <div class="shimmer-line"></div>
    <p class="sub-text" id="sub-text">FOREVER AND ALWAYS</p>
  </header>
  <section class="date-section reveal-section" id="sec-date">
    <div class="gold-ornament">✦ ── ✦ ── ✦</div>
    <p class="section-label">THE DATE</p>
    <p class="wedding-date" id="wedding-date"></p>
    <p class="wedding-time" id="wedding-time"></p>
    <div class="countdown" id="countdown">
      <div class="cd-item"><span id="cd-d">--</span><label>DAYS</label></div>
      <div class="cd-item"><span id="cd-h">--</span><label>HRS</label></div>
      <div class="cd-item"><span id="cd-m">--</span><label>MIN</label></div>
      <div class="cd-item"><span id="cd-s">--</span><label>SEC</label></div>
    </div>
  </section>
  <section class="venue-section reveal-section" id="sec-venue">
    <div class="gold-ornament">✦ ── ✦ ── ✦</div>
    <p class="section-label">THE VENUE</p>
    <p class="venue-name" id="venue-name"></p>
    <p class="venue-addr" id="venue-address"></p>
    <a class="maps-btn" id="maps-link" href="#" target="_blank">VIEW MAP</a>
  </section>
  <section class="story-section reveal-section" id="sec-story">
    <div class="gold-ornament">✦ ── ✦ ── ✦</div>
    <p class="story-text" id="story-text"></p>
  </section>
  <section class="photos-section reveal-section" id="sec-photos">
    <div class="photo-row" id="photo-grid"></div>
  </section>
  <footer class="lux-footer reveal-section">
    <div class="gold-ornament">✦ ── ✦ ── ✦</div>
    <p class="hashtag" id="hashtag-text"></p>
    <button class="music-btn" id="music-btn">♪ MUSIC</button>
    <audio id="bg-audio" loop></audio>
    <div class="crown-ornament bot-crown">
      <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20,5 50,40 80,15 100,45 120,15 150,40 180,5" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linejoin="round" opacity=".5"/>
      </svg>
    </div>
  </footer>
</div>
$html_luxury$,
  css_content  = $css_luxury$
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;overflow-x:hidden}
body{font-family:'Cormorant Garamond',serif;background:#0d0d0d;color:#f5e6c8;min-height:100vh}

/* ── Particles canvas ── */
#particles-canvas{
  position:fixed;inset:0;pointer-events:none;z-index:0
}

/* ── Page ── */
#page{position:relative;z-index:1;max-width:700px;margin:0 auto;padding:3rem 2rem 5rem;text-align:center}

/* ── Luxury frame ── */
.luxury-frame{position:fixed;inset:12px;pointer-events:none;z-index:2}
.frame-corner{
  position:absolute;width:48px;height:48px;
  border-color:#d4af37;border-style:solid;opacity:.6
}
.top-left{top:0;left:0;border-width:2px 0 0 2px}
.top-right{top:0;right:0;border-width:2px 2px 0 0}
.bot-left{bottom:0;left:0;border-width:0 0 2px 2px}
.bot-right{bottom:0;right:0;border-width:0 2px 2px 0}

/* ── Crown ornament ── */
.crown-ornament svg{width:180px;margin:0 auto .8rem;display:block}
.bot-crown{margin-top:1.5rem}

/* ── Hero ── */
.hero{padding:2rem 0 1rem}
.pre-text{
  font-size:.6rem;letter-spacing:.55em;color:#d4af37;
  margin-bottom:1.2rem;font-family:'Cinzel Decorative',cursive
}
.guest-line{
  font-size:1.1rem;font-style:italic;color:#c8b07a;
  margin-bottom:1rem;letter-spacing:.06em
}
.couple-names{
  font-family:'Cinzel Decorative',cursive;
  font-size:2.6rem;line-height:1.3;color:#d4af37;
  margin:.5rem 0;
  text-shadow:0 0 40px rgba(212,175,55,.25)
}
.name-reveal{
  display:inline-block;
  opacity:0;letter-spacing:.25em;
  transition:opacity .8s,letter-spacing .8s
}
.name-reveal.shown{opacity:1;letter-spacing:.08em}
.gold-sep{
  display:block;font-family:'Cormorant Garamond',serif;
  font-style:italic;font-size:2rem;color:#d4af37;
  margin:.3rem 0;opacity:.8
}

/* ── Shimmer line ── */
.shimmer-line{
  width:0;height:1px;margin:1.2rem auto;
  background:linear-gradient(90deg,transparent,#d4af37,#f5e6c8,#d4af37,transparent);
  transition:width 1.5s ease .4s
}
.shimmer-line.drawn{width:70%}

/* ── Sub text ── */
.sub-text{
  font-size:.65rem;letter-spacing:.55em;color:#8a7a5a;
  font-family:'Cinzel Decorative',cursive
}

/* ── Sections ── */
.reveal-section{
  margin:3rem 0;opacity:0;transform:translateY(24px);
  transition:opacity .8s,transform .8s
}
.reveal-section.visible{opacity:1;transform:translateY(0)}
.gold-ornament{
  color:#d4af37;font-size:.85rem;letter-spacing:.3em;
  margin-bottom:1.4rem;opacity:.7
}
.section-label{
  font-size:.6rem;letter-spacing:.55em;text-transform:uppercase;
  color:#d4af37;margin-bottom:1rem;font-family:'Cinzel Decorative',cursive
}

/* ── Date ── */
.wedding-date{
  font-family:'Cinzel Decorative',cursive;font-size:1.4rem;
  color:#f5e6c8;letter-spacing:.06em
}
.wedding-time{font-size:1rem;color:#d4af37;letter-spacing:.2em;margin-top:.4rem}

/* ── Countdown ── */
.countdown{display:flex;justify-content:center;gap:1rem;margin-top:2rem}
.cd-item{
  background:rgba(212,175,55,.06);
  border:1px solid rgba(212,175,55,.3);
  padding:1rem 1.2rem;min-width:64px;
  position:relative;overflow:hidden
}
.cd-item::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,transparent 40%,rgba(212,175,55,.04));
}
.cd-item span{
  display:block;font-family:'Cinzel Decorative',cursive;
  font-size:1.9rem;font-weight:400;color:#d4af37;
  line-height:1;font-variant-numeric:tabular-nums
}
.cd-item label{
  font-size:.5rem;letter-spacing:.35em;color:#8a7a5a;
  text-transform:uppercase
}

/* ── Venue ── */
.venue-name{
  font-family:'Cinzel Decorative',cursive;font-size:1.2rem;
  color:#f5e6c8;margin-bottom:.5rem;letter-spacing:.05em
}
.venue-addr{font-size:.95rem;font-style:italic;color:#8a7a5a;line-height:1.8}
.maps-btn{
  display:inline-block;margin-top:1rem;padding:.5rem 1.8rem;
  border:1px solid #d4af37;color:#d4af37;font-family:'Cinzel Decorative',cursive;
  font-size:.6rem;letter-spacing:.3em;text-decoration:none;
  transition:background .25s,color .25s
}
.maps-btn:hover{background:#d4af37;color:#0d0d0d}

/* ── Story ── */
.story-text{
  font-size:1.05rem;font-style:italic;line-height:2.1;
  color:#c8b07a;max-width:520px;margin:0 auto
}

/* ── Photos ── */
.photo-row{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
.photo-row img{
  width:calc(33% - 5px);max-width:200px;aspect-ratio:2/3;
  object-fit:cover;filter:sepia(15%) brightness(.95);
  border:2px solid rgba(212,175,55,.3);
  transition:filter .4s,transform .3s,border-color .3s
}
.photo-row img:hover{
  filter:sepia(0%) brightness(1.05);
  border-color:rgba(212,175,55,.8);
  transform:scale(1.03)
}

/* ── Footer ── */
.lux-footer{padding-bottom:3rem}
.hashtag{
  font-family:'Cinzel Decorative',cursive;font-size:1.1rem;
  color:#d4af37;letter-spacing:.08em;margin-bottom:1.2rem
}
.music-btn{
  background:transparent;
  border:1px solid #d4af37;color:#d4af37;
  font-family:'Cinzel Decorative',cursive;font-size:.6rem;
  letter-spacing:.35em;padding:.55rem 2rem;
  cursor:pointer;transition:all .3s;display:none
}
.music-btn:hover,.music-btn.playing{background:#d4af37;color:#0d0d0d}
$css_luxury$,
  js_content   = $js_luxury$
(function(){
  var d = window.WEDDING_DATA || {};

  function set(id,val){var el=document.getElementById(id);if(el&&val)el.textContent=val;}
  set('groom-name', d.groom_name);
  set('bride-name', d.bride_name);
  var gLine=document.getElementById('guest-line');
  if(gLine) gLine.textContent = d.guest_name ? 'Trân trọng kính mời · ' + d.guest_name : 'Trân trọng kính mời';
  set('wedding-date', d.wedding_date ? new Date(d.wedding_date).toLocaleDateString('vi-VN',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).toUpperCase() : '');
  set('wedding-time', d.wedding_time || '');
  set('venue-name', d.venue_name);
  set('venue-address', d.venue_address);
  set('story-text', d.story);
  if(d.hashtag) set('hashtag-text','#'+d.hashtag);
  var mLink=document.getElementById('maps-link');
  if(mLink&&d.venue_maps_url){mLink.href=d.venue_maps_url;}else if(mLink){mLink.style.display='none';}

  /* Photos */
  if(d.couple_photos&&d.couple_photos.length){
    var grid=document.getElementById('photo-grid');
    d.couple_photos.slice(0,3).forEach(function(url){
      var img=document.createElement('img');img.src=url;img.alt='Photo';grid.appendChild(img);
    });
  } else { document.getElementById('sec-photos').style.display='none'; }

  /* Music */
  if(d.music_url){
    var btn=document.getElementById('music-btn');var audio=document.getElementById('bg-audio');
    audio.src=d.music_url;btn.style.display='inline-block';
    btn.addEventListener('click',function(){
      if(audio.paused){audio.play();btn.textContent='⏸ PAUSE';btn.classList.add('playing');}
      else{audio.pause();btn.textContent='♪ MUSIC';btn.classList.remove('playing');}
    });
  }

  /* Gold particle canvas */
  var canvas=document.getElementById('particles-canvas');
  var ctx=canvas.getContext('2d');
  var particles=[];
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(var i=0;i<70;i++){
    particles.push({
      x:Math.random()*window.innerWidth,
      y:Math.random()*window.innerHeight,
      r:Math.random()*1.6+.4,
      vy:-(Math.random()*.4+.1),
      vx:(Math.random()-.5)*.25,
      alpha:Math.random()*.8+.1,
      twinkle:Math.random()*Math.PI*2,
      twinkleSpeed:Math.random()*.03+.01,
      isSparkle:Math.random()<.12
    });
  }
  function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(function(p){
      p.y+=p.vy;p.x+=p.vx;p.twinkle+=p.twinkleSpeed;
      if(p.y<-10){p.y=canvas.height+10;p.x=Math.random()*canvas.width;}
      var a=p.alpha*(0.5+0.5*Math.sin(p.twinkle));
      if(p.isSparkle){
        /* 4-pointed star */
        ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=a;
        ctx.fillStyle='#f5e6c8';
        ctx.beginPath();
        var sr=p.r*3;
        for(var k=0;k<4;k++){
          ctx.rotate(Math.PI/2);
          ctx.lineTo(0,-sr);ctx.lineTo(sr*.25,-sr*.25);
        }
        ctx.closePath();ctx.fill();ctx.restore();
      } else {
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba(212,175,55,'+a+')';ctx.fill();
      }
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* Name reveal animation */
  setTimeout(function(){
    var shimmer=document.querySelector('.shimmer-line');if(shimmer)shimmer.classList.add('drawn');
    var names=document.querySelectorAll('.name-reveal');
    names[0]&&setTimeout(function(){names[0].classList.add('shown');},200);
    names[1]&&setTimeout(function(){names[1].classList.add('shown');},700);
  },300);

  /* Countdown */
  function updateCd(){
    if(!d.wedding_date)return;
    var target=new Date(d.wedding_date+' '+(d.wedding_time||'00:00'));
    var now=new Date();var diff=target-now;
    if(diff<=0){document.getElementById('countdown').innerHTML='<p style="font-family:Cinzel Decorative,cursive;color:#d4af37;letter-spacing:.2em;font-size:.9rem">FOREVER ✦ ALWAYS</p>';return;}
    var days=Math.floor(diff/864e5);
    var hrs=Math.floor((diff%864e5)/36e5);
    var mins=Math.floor((diff%36e5)/6e4);
    var secs=Math.floor((diff%6e4)/1e3);
    function s2(id,v){var el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0');}
    s2('cd-d',days);s2('cd-h',hrs);s2('cd-m',mins);s2('cd-s',secs);
  }
  updateCd();setInterval(updateCd,1000);

  /* IntersectionObserver */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:.12});
  document.querySelectorAll('.reveal-section').forEach(function(el){io.observe(el);});
})();
$js_luxury$
WHERE slug = 'luxury';
