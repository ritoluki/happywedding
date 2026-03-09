-- 007_template_elegant_dark.sql
-- Thêm template mới: Elegant Dark (nền đen, vàng gold, particles)

INSERT INTO templates (name, slug, description, category, is_active, is_featured, sort_order, thumbnail_url, html_content, css_content, js_content)
VALUES (
  'Elegant Dark',
  'elegant',
  'Sang trọng tối giản nền đen nhung, particles vàng gold, countdown & RSVP tích hợp',
  'luxury',
  true,
  true,
  5,
  'https://placehold.co/600x400/0D0B08/C9A84C?text=Elegant+Dark',

$h_elegant$
<canvas id="particles-canvas"></canvas>
<div class="invitation">
  <section class="cover">
    <div class="corner corner-tl">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 76 L4 4 L76 4" stroke="#C9A84C" stroke-width="1" fill="none"/>
        <path d="M4 44 L4 4 L44 4" stroke="#C9A84C" stroke-width="0.5" fill="none" opacity="0.5"/>
        <circle cx="4" cy="4" r="3" fill="#C9A84C" opacity="0.8"/>
        <path d="M10 4 Q20 4 20 14" stroke="#C9A84C" stroke-width="0.5" fill="none" opacity="0.4"/>
      </svg>
    </div>
    <div class="corner corner-tr">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 76 L4 4 L76 4" stroke="#C9A84C" stroke-width="1" fill="none"/>
        <path d="M4 44 L4 4 L44 4" stroke="#C9A84C" stroke-width="0.5" fill="none" opacity="0.5"/>
        <circle cx="4" cy="4" r="3" fill="#C9A84C" opacity="0.8"/>
      </svg>
    </div>
    <div class="corner corner-bl">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 76 L4 4 L76 4" stroke="#C9A84C" stroke-width="1" fill="none"/>
        <circle cx="4" cy="4" r="3" fill="#C9A84C" opacity="0.8"/>
      </svg>
    </div>
    <div class="corner corner-br">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 76 L4 4 L76 4" stroke="#C9A84C" stroke-width="1" fill="none"/>
        <circle cx="4" cy="4" r="3" fill="#C9A84C" opacity="0.8"/>
      </svg>
    </div>
    <div class="guest-greeting" id="guest-greeting">
      Kính mời
      <span class="guest-name-highlight" id="guest-name-display">Quý Khách</span>
    </div>
    <p class="subtitle-top">We Are Getting Married</p>
    <div class="names-wrapper">
      <span class="groom-name shimmer-text" id="groom-display"></span>
      <div class="names-divider"><span class="ampersand">&amp;</span></div>
      <span class="bride-name shimmer-text" id="bride-display"></span>
    </div>
    <div class="date-badge">
      <div class="date-line">
        <span class="date-day" id="date-day">--</span>
        <div class="date-month-year">
          <span class="date-month" id="date-month">--</span>
          <span class="date-year" id="date-year">--</span>
        </div>
      </div>
      <span class="date-weekday" id="date-weekday">--</span>
    </div>
    <div class="scroll-hint">
      <span>Cuộn xuống</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <section class="section story-section reveal">
    <div class="section-label">Câu Chuyện Của Chúng Tôi</div>
    <p class="story-text" id="story-display"></p>
  </section>

  <section class="photos-section reveal" id="photos-section">
    <div class="section-label photos-label">Khoảnh Khắc Của Chúng Tôi</div>
    <div class="photo-track" id="photo-track"></div>
  </section>

  <section class="section details-section reveal">
    <div class="section-label">Chi Tiết Đám Cưới</div>
    <div class="detail-blocks">
      <div class="detail-block">
        <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <p class="detail-type">Tiệc Cưới</p>
        <p class="detail-main" id="time-display">--</p>
        <p class="detail-sub" id="full-date-display">--</p>
      </div>
      <div class="detail-block">
        <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <p class="detail-type">Địa Điểm</p>
        <p class="detail-main" id="venue-display"></p>
        <p class="detail-sub" id="address-display"></p>
        <a href="#" class="maps-btn" id="maps-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          Xem Bản Đồ
        </a>
      </div>
    </div>
  </section>

  <section class="section countdown-section reveal">
    <div class="section-label">Đếm Ngược</div>
    <div class="countdown-grid">
      <div class="countdown-item"><span class="countdown-num" id="cd-days">--</span><span class="countdown-label">Ngày</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-hours">--</span><span class="countdown-label">Giờ</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-mins">--</span><span class="countdown-label">Phút</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-secs">--</span><span class="countdown-label">Giây</span></div>
    </div>
  </section>

  <section class="section rsvp-section reveal">
    <div class="section-label">Xác Nhận Tham Dự</div>
    <p class="rsvp-intro">Sự hiện diện của bạn là<br>món quà quý giá nhất với chúng tôi.</p>
    <div class="rsvp-buttons">
      <button class="btn-rsvp-yes" id="btn-yes">✓ Tôi Sẽ Đến</button>
      <button class="btn-rsvp-no" id="btn-no">Rất Tiếc</button>
    </div>
  </section>

  <section class="footer-section reveal">
    <span class="hashtag" id="hashtag-display"></span>
    <p class="footer-names" id="footer-names"></p>
  </section>
</div>

<button class="share-btn" id="share-btn" title="Chia sẻ">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
</button>

<button class="music-btn" id="music-btn" title="Nhạc nền">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
</button>

<div class="modal-overlay" id="rsvp-modal">
  <div class="modal-box">
    <button class="modal-close" id="modal-close">×</button>
    <p class="modal-title" id="modal-title">Xác Nhận Tham Dự</p>
    <p class="modal-sub" id="modal-sub">Chúng tôi rất vui khi có bạn!</p>
    <input type="text" class="modal-input" id="rsvp-name" placeholder="Tên của bạn">
    <input type="text" class="modal-input" id="rsvp-phone" placeholder="Số điện thoại (không bắt buộc)">
    <input type="text" class="modal-input" id="rsvp-note" placeholder="Lời chúc (không bắt buộc)">
    <button class="modal-submit" id="modal-submit">Gửi Xác Nhận</button>
  </div>
</div>
$h_elegant$,

$c_elegant$
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Nunito:wght@300;400&display=swap');

:root{--gold:#C9A84C;--gold-light:#E8C97A;--gold-dark:#9A7A2E;--cream:#FAF6EE;--dark:#0D0B08;--dark2:#1A1710}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--dark);color:var(--cream);font-family:'Nunito',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh}

#particles-canvas{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.6}

.invitation{position:relative;z-index:1;max-width:480px;margin:0 auto;padding:0 0 60px}

.cover{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;padding:60px 30px;text-align:center}
.cover::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(201,168,76,.12) 0%,transparent 70%);pointer-events:none}

.corner{position:absolute;width:80px;height:80px;opacity:0.5}
.corner svg{width:100%;height:100%}
.corner-tl{top:20px;left:20px}
.corner-tr{top:20px;right:20px;transform:scaleX(-1)}
.corner-bl{bottom:20px;left:20px;transform:scaleY(-1)}
.corner-br{bottom:20px;right:20px;transform:scale(-1)}

.guest-greeting{font-family:'Nunito',sans-serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);opacity:0;animation:fadeUp 1s ease .3s forwards;margin-bottom:30px}
.guest-name-highlight{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;letter-spacing:1px;color:var(--gold-light);display:block;margin-top:6px}

.subtitle-top{font-family:'Cinzel',serif;font-size:10px;letter-spacing:5px;text-transform:uppercase;color:var(--gold);opacity:0;animation:fadeUp 1s ease .5s forwards;margin-bottom:16px}

.names-wrapper{opacity:0;animation:fadeUp 1.2s ease .7s forwards;margin-bottom:10px}
.groom-name,.bride-name{font-family:'Cormorant Garamond',serif;font-size:clamp(52px,14vw,72px);font-weight:300;line-height:1;color:var(--cream);display:block}
.names-divider{display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;opacity:.7}
.names-divider::before,.names-divider::after{content:'';height:1px;width:50px;background:linear-gradient(to right,transparent,var(--gold))}
.names-divider::after{background:linear-gradient(to left,transparent,var(--gold))}
.ampersand{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:var(--gold)}

.date-badge{opacity:0;animation:fadeUp 1.2s ease 1s forwards;margin-top:32px;display:flex;flex-direction:column;align-items:center;gap:6px}
.date-line{display:flex;align-items:center;gap:16px}
.date-day{font-family:'Cinzel',serif;font-size:52px;font-weight:500;color:var(--gold);line-height:1}
.date-month-year{text-align:left}
.date-month{font-family:'Cinzel',serif;font-size:14px;letter-spacing:3px;color:var(--cream);display:block}
.date-year{font-family:'Cinzel',serif;font-size:11px;letter-spacing:4px;color:var(--gold);display:block}
.date-weekday{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,168,76,.6)}

.scroll-hint{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fadeIn 1s ease 2s forwards}
.scroll-hint span{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,168,76,.5)}
.scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,var(--gold),transparent);animation:scrollPulse 2s ease-in-out infinite}

.section{padding:60px 30px;position:relative}
.section-label{font-family:'Cinzel',serif;font-size:9px;letter-spacing:5px;text-transform:uppercase;color:var(--gold);text-align:center;margin-bottom:30px;display:flex;align-items:center;justify-content:center;gap:16px}
.section-label::before,.section-label::after{content:'';height:1px;flex:1;background:linear-gradient(to right,transparent,rgba(201,168,76,.4))}
.section-label::after{background:linear-gradient(to left,transparent,rgba(201,168,76,.4))}

.story-section{text-align:center;border-top:1px solid rgba(201,168,76,.15)}
.story-text{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;line-height:1.8;color:rgba(250,246,238,.75);max-width:360px;margin:0 auto}

.photos-section{border-top:1px solid rgba(201,168,76,.15);padding:50px 0}
.photos-label{padding:0 30px;margin-bottom:24px}
.photo-track{display:flex;gap:12px;overflow-x:auto;padding:0 30px 12px;scrollbar-width:none;-ms-overflow-style:none;scroll-snap-type:x mandatory}
.photo-track::-webkit-scrollbar{display:none}
.photo-item{flex:0 0 220px;height:300px;border-radius:4px;overflow:hidden;position:relative;scroll-snap-align:start;background:var(--dark2)}
.photo-item img{width:100%;height:100%;object-fit:cover;filter:sepia(20%) contrast(1.05);transition:transform .6s ease}
.photo-item:hover img{transform:scale(1.05)}
.photo-item::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 60%,rgba(13,11,8,.5));pointer-events:none}
.photo-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1710,#2a2318)}
.photo-placeholder svg{width:48px;height:48px;opacity:.2}

.details-section{border-top:1px solid rgba(201,168,76,.15);text-align:center}
.detail-blocks{display:flex;flex-direction:column;gap:32px}
.detail-block{padding:28px;border:1px solid rgba(201,168,76,.15);border-radius:2px;position:relative;background:rgba(201,168,76,.03)}
.detail-block::before{content:'';position:absolute;top:-1px;left:30px;width:40px;height:1px;background:var(--dark)}
.detail-icon{width:28px;height:28px;margin:0 auto 14px;color:var(--gold);opacity:.7}
.detail-type{font-family:'Cinzel',serif;font-size:8px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:10px;opacity:.7}
.detail-main{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--cream);margin-bottom:6px;line-height:1.3}
.detail-sub{font-size:13px;color:rgba(250,246,238,.5);line-height:1.6}
.maps-btn{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:8px 20px;border:1px solid rgba(201,168,76,.4);border-radius:1px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);text-decoration:none;transition:all .3s;font-family:'Cinzel',serif}
.maps-btn:hover{background:rgba(201,168,76,.1);border-color:var(--gold)}

.countdown-section{border-top:1px solid rgba(201,168,76,.15);text-align:center}
.countdown-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}
.countdown-item{padding:16px 8px;border:1px solid rgba(201,168,76,.15);border-radius:2px;background:rgba(201,168,76,.03)}
.countdown-num{font-family:'Cinzel',serif;font-size:28px;font-weight:500;color:var(--gold);line-height:1;display:block}
.countdown-label{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:rgba(201,168,76,.5);margin-top:6px;display:block}

.rsvp-section{border-top:1px solid rgba(201,168,76,.15);text-align:center}
.rsvp-intro{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:rgba(250,246,238,.6);margin-bottom:28px;line-height:1.7}
.rsvp-buttons{display:flex;gap:12px;justify-content:center}
.btn-rsvp-yes{flex:1;padding:14px;background:var(--gold);color:var(--dark);border:none;font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:1px;transition:all .3s}
.btn-rsvp-yes:hover{background:var(--gold-light);transform:translateY(-2px)}
.btn-rsvp-no{flex:1;padding:14px;background:transparent;color:rgba(250,246,238,.5);border:1px solid rgba(201,168,76,.25);font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:1px;transition:all .3s}
.btn-rsvp-no:hover{border-color:rgba(201,168,76,.5);color:var(--cream)}

.footer-section{border-top:1px solid rgba(201,168,76,.15);text-align:center;padding:50px 30px}
.hashtag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:var(--gold);display:block;margin-bottom:20px}
.footer-names{font-family:'Cinzel',serif;font-size:11px;letter-spacing:4px;color:rgba(201,168,76,.4);text-transform:uppercase}

.share-btn{position:fixed;bottom:24px;right:24px;width:48px;height:48px;border-radius:50%;background:var(--gold);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:100;box-shadow:0 4px 20px rgba(201,168,76,.4);transition:all .3s}
.share-btn:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(201,168,76,.5)}
.share-btn svg{width:20px;height:20px;color:var(--dark)}

.music-btn{position:fixed;bottom:24px;left:24px;width:48px;height:48px;border-radius:50%;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:100;transition:all .3s;backdrop-filter:blur(10px)}
.music-btn:hover{background:rgba(201,168,76,.25)}
.music-btn svg{width:20px;height:20px;color:var(--gold)}
.music-btn.playing svg{animation:musicBounce .8s ease-in-out infinite alternate}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scrollPulse{0%,100%{opacity:.3;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.2)}}
@keyframes musicBounce{from{transform:scaleY(.6)}to{transform:scaleY(1.2)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

.shimmer-text{background:linear-gradient(90deg,var(--gold-dark) 0%,var(--gold-light) 40%,var(--gold-dark) 60%,var(--gold) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}

.reveal{opacity:0;transform:translateY(30px);transition:opacity .8s ease,transform .8s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

.modal-overlay{display:none;position:fixed;inset:0;background:rgba(13,11,8,.92);z-index:200;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px)}
.modal-overlay.open{display:flex;animation:fadeIn .3s ease}
.modal-box{background:var(--dark2);border:1px solid rgba(201,168,76,.25);border-radius:4px;padding:36px 28px;width:100%;max-width:380px;text-align:center;position:relative}
.modal-title{font-family:'Cinzel',serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.modal-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:rgba(250,246,238,.6);margin-bottom:28px}
.modal-input{width:100%;background:rgba(201,168,76,.05);border:1px solid rgba(201,168,76,.2);border-radius:2px;padding:12px 16px;color:var(--cream);font-family:'Nunito',sans-serif;font-size:14px;margin-bottom:12px;outline:none;transition:border-color .3s}
.modal-input:focus{border-color:rgba(201,168,76,.5)}
.modal-input::placeholder{color:rgba(250,246,238,.3)}
.modal-submit{width:100%;padding:14px;background:var(--gold);color:var(--dark);border:none;font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:1px;margin-top:8px;transition:all .3s}
.modal-submit:hover{background:var(--gold-light)}
.modal-close{position:absolute;top:16px;right:16px;background:none;border:none;color:rgba(250,246,238,.3);cursor:pointer;font-size:20px;line-height:1}
$c_elegant$,

$j_elegant$
(function(){
  var d = window.WEDDING_DATA || {};
  var months = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  var weekdays = ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];

  function el(id){ return document.getElementById(id); }
  function set(id, val){ var e = el(id); if(e && val != null) e.textContent = val; }

  /* Populate */
  set('groom-display', d.groom_name);
  set('bride-display', d.bride_name);
  set('footer-names', (d.groom_name || '') + ' — ' + (d.bride_name || ''));
  set('hashtag-display', d.hashtag ? '#' + d.hashtag : '#' + (d.groom_name||'') + (d.bride_name||''));
  set('story-display', d.story || '"Có những cuộc gặp gỡ mà người ta gọi là duyên phận — và chúng tôi tin đó chính là điều đã xảy ra."');
  set('venue-display', d.venue_name);
  set('address-display', d.venue_address);

  if(d.venue_maps_url){ el('maps-link').href = d.venue_maps_url; }
  else { el('maps-link').style.display = 'none'; }

  if(d.guest_name){ set('guest-name-display', d.guest_name); }
  else { var gg = el('guest-greeting'); if(gg) gg.style.display = 'none'; }

  /* Date */
  if(d.wedding_date){
    var wDate = new Date(d.wedding_date);
    set('date-day', wDate.getDate());
    set('date-month', months[wDate.getMonth()]);
    set('date-year', 'Năm ' + wDate.getFullYear());
    set('date-weekday', weekdays[wDate.getDay()]);
    set('time-display', (d.wedding_time || '18:00') + ' — ' + weekdays[wDate.getDay()]);
    set('full-date-display', wDate.getDate() + ' ' + months[wDate.getMonth()] + ', ' + wDate.getFullYear());
  }

  /* Photos */
  var track = el('photo-track');
  if(d.couple_photos && d.couple_photos.length > 0){
    track.innerHTML = d.couple_photos.map(function(url){
      return '<div class="photo-item"><img src="' + url + '" alt="Ảnh cưới" loading="lazy"></div>';
    }).join('');
  } else {
    var sec = el('photos-section'); if(sec) sec.style.display = 'none';
  }

  /* Countdown */
  function updateCountdown(){
    if(!d.wedding_date) return;
    var wDate = new Date(d.wedding_date);
    var parts = (d.wedding_time || '18:00').split(':');
    wDate.setHours(parseInt(parts[0])||18, parseInt(parts[1])||0, 0, 0);
    var diff = wDate - new Date();
    if(diff <= 0){
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(function(id){ set(id,'00'); });
      return;
    }
    var s = function(v){ return String(Math.floor(v)).padStart(2,'0'); };
    set('cd-days',  s(diff / 864e5));
    set('cd-hours', s((diff % 864e5) / 36e5));
    set('cd-mins',  s((diff % 36e5) / 6e4));
    set('cd-secs',  s((diff % 6e4) / 1e3));
  }
  updateCountdown(); setInterval(updateCountdown, 1000);

  /* Particles */
  var canvas = el('particles-canvas');
  var ctx = canvas.getContext('2d');
  var W, H, parts = [];
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for(var i = 0; i < 80; i++){
    parts.push({
      x: Math.random()*1000, y: Math.random()*800,
      r: Math.random()*1.5+0.3, speed: Math.random()*0.4+0.1,
      drift: (Math.random()-0.5)*0.3, angle: Math.random()*Math.PI*2,
      alpha: Math.random()*0.6+0.1, gold: Math.random()>0.5
    });
  }
  function drawParticles(){
    ctx.clearRect(0,0,W,H);
    parts.forEach(function(p){
      p.y += p.speed; p.x += p.drift; p.angle += 0.02;
      if(p.y > H+10){ p.y = -10; p.x = Math.random()*W; }
      if(p.x < -10 || p.x > W+10){ p.x = Math.random()*W; p.y = 0; }
      ctx.save(); ctx.globalAlpha = p.alpha;
      if(p.gold){
        ctx.fillStyle = '#C9A84C';
        ctx.translate(p.x, p.y); ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.moveTo(0,-p.r*2); ctx.lineTo(p.r,0);
        ctx.lineTo(0,p.r*2); ctx.lineTo(-p.r,0);
        ctx.closePath(); ctx.fill();
      } else {
        ctx.fillStyle = '#FAF6EE';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* Scroll reveal */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(e){ io.observe(e); });

  /* Music */
  var audio = null, isPlaying = false;
  var musicBtn = el('music-btn');
  if(musicBtn){
    musicBtn.addEventListener('click', function(){
      if(!d.music_url) return;
      if(!audio){ audio = new Audio(d.music_url); audio.loop = true; }
      if(isPlaying){ audio.pause(); isPlaying = false; musicBtn.classList.remove('playing'); }
      else { audio.play().catch(function(){}); isPlaying = true; musicBtn.classList.add('playing'); }
    });
  }

  /* Share */
  var shareBtn = el('share-btn');
  if(shareBtn){
    shareBtn.addEventListener('click', function(){
      var title = 'Thiệp Cưới ' + (d.groom_name||'') + ' & ' + (d.bride_name||'');
      if(navigator.share){ navigator.share({ title: title, text: 'Trân trọng kính mời bạn!', url: window.location.href }); }
      else { navigator.clipboard.writeText(window.location.href).then(function(){ alert('Đã copy link thiệp!'); }); }
    });
  }

  /* RSVP */
  var rsvpAttending = true;
  function openRSVP(attending){
    rsvpAttending = attending;
    set('modal-title', attending ? 'Xác Nhận Tham Dự' : 'Rất Tiếc Khi Vắng Bạn');
    set('modal-sub', attending ? 'Chúng tôi rất vui khi có bạn!' : 'Cảm ơn bạn đã phản hồi.');
    el('rsvp-modal').classList.add('open');
  }
  function closeRSVP(){ el('rsvp-modal').classList.remove('open'); }

  var btnYes = el('btn-yes'); if(btnYes) btnYes.addEventListener('click', function(){ openRSVP(true); });
  var btnNo  = el('btn-no');  if(btnNo)  btnNo.addEventListener('click',  function(){ openRSVP(false); });
  var btnClose = el('modal-close'); if(btnClose) btnClose.addEventListener('click', closeRSVP);
  el('rsvp-modal').addEventListener('click', function(e){ if(e.target === this) closeRSVP(); });

  var btnSubmit = el('modal-submit');
  if(btnSubmit){
    btnSubmit.addEventListener('click', function(){
      var name = el('rsvp-name').value.trim();
      if(!name){ el('rsvp-name').style.borderColor = 'rgba(201,100,76,.6)'; return; }
      closeRSVP();
      setTimeout(function(){
        alert('Cảm ơn ' + name + '! ' + (rsvpAttending ? 'Hẹn gặp bạn vào ngày vui của chúng tôi 💛' : 'Chúng tôi sẽ nhớ bạn!'));
      }, 100);
    });
  }
})();
$j_elegant$

)
ON CONFLICT (slug) DO UPDATE SET
  name          = EXCLUDED.name,
  description   = EXCLUDED.description,
  thumbnail_url = EXCLUDED.thumbnail_url,
  html_content  = EXCLUDED.html_content,
  css_content   = EXCLUDED.css_content,
  js_content    = EXCLUDED.js_content,
  is_active     = EXCLUDED.is_active,
  is_featured   = EXCLUDED.is_featured,
  sort_order    = EXCLUDED.sort_order;
