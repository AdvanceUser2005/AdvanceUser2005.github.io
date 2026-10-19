// Scroll reveal
const obs = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('in'), i*70); obs.unobserve(e.target); }
  });
},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Mini Tesla: annotated CAD section viewer
document.querySelectorAll('[data-xsec]').forEach(root=>{
  const tabs=[...root.querySelectorAll('.xsec-tab')];
  const select=t=>{
    tabs.forEach(b=>{
      const on=b===t;
      b.setAttribute('aria-selected',on);
      b.tabIndex=on?0:-1;
      document.getElementById(b.getAttribute('aria-controls')).hidden=!on;
    });
  };
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>select(t));
    t.addEventListener('keydown',e=>{
      const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
      if(!d) return;
      const n=tabs[(i+d+tabs.length)%tabs.length]; select(n); n.focus();
    });
  });
  root.querySelectorAll('.xsec-panel').forEach(p=>{
    const fig=p.querySelector('.xsec-fig');
    const items=[...p.querySelectorAll('[data-n]')];
    let pinned=null;
    const show=n=>{
      fig.classList.toggle('focus',!!n);
      items.forEach(el=>el.classList.toggle('on',!!n&&el.dataset.n===n));
    };
    items.forEach(el=>{
      el.addEventListener('mouseenter',()=>show(el.dataset.n));
      el.addEventListener('mouseleave',()=>show(pinned));
      el.addEventListener('focus',()=>show(el.dataset.n));
      el.addEventListener('blur',()=>show(pinned));
      el.addEventListener('click',()=>{pinned=pinned===el.dataset.n?null:el.dataset.n;show(pinned);});
    });
  });
});
