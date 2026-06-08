// ── PROGRESS BAR ──
const progress = document.getElementById('progress');
if(progress) window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/h*100)+'%';
},{passive:true});

// ── NAV ──
const nav=document.getElementById('main-nav');
if(nav) window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>20);},{passive:true});

// ── HAMBURGER ──
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobile-menu');
if(hamburger&&mobileMenu){
  hamburger.addEventListener('click',()=>{
    const open=hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  });
  mobileMenu.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow='';
  }));
}

// ── SCROLL REVEALS ──
const reveals=document.querySelectorAll('.reveal');
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target);}});
},{threshold:.1});
reveals.forEach(el=>revealObs.observe(el));

// ── COUNTER ANIMATION ──
function countUp(el,target,duration){
  const start=performance.now();
  (function step(now){
    const p=Math.min((now-start)/duration,1);
    el.textContent=Math.floor((1-Math.pow(1-p,3))*target);
    if(p<1)requestAnimationFrame(step);else el.textContent=target;
  })(start);
}
document.querySelectorAll('[data-count]').forEach(el=>{
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){countUp(e.target,+e.target.dataset.count,1600);e.target.removeAttribute('data-count');}});
  },{threshold:.5}).observe(el);
});

// ── CARD TILT (desktop only) ──
if(!('ontouchstart' in window)){
  document.querySelectorAll('.feature-card,.svc-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      card.style.transform=`perspective(900px) rotateX(${(y-r.height/2)/r.height*-5}deg) rotateY(${(x-r.width/2)/r.width*5}deg) translateY(-3px)`;
      card.style.transition='transform .05s,border-color .25s';
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='';
      card.style.transition='transform .55s cubic-bezier(0.23,1,0.32,1),border-color .25s';
    });
  });

  // ── MAGNETIC BUTTONS ──
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mouseenter',()=>{btn.style.transition='transform .1s ease,background .2s,box-shadow .2s';});
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.28}px,${(e.clientY-r.top-r.height/2)*.28}px)`;
    });
    btn.addEventListener('mouseleave',()=>{
      btn.style.transform='';
      btn.style.transition='transform .5s cubic-bezier(0.23,1,0.32,1),background .2s,box-shadow .2s';
    });
  });
}
