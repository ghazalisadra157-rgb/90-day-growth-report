const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}})},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const fmt=new Intl.NumberFormat('en-US');
const countObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);const prefix=el.dataset.prefix||'';const start=performance.now();const duration=1300;function tick(now){const p=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-p,4);el.textContent=prefix+fmt.format(Math.round(target*eased));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);countObserver.unobserve(el)})},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('nav a')];
const navObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-30% 0px -65% 0px'});
sections.forEach(s=>navObserver.observe(s));
