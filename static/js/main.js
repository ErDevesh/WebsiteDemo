document.addEventListener('DOMContentLoaded',()=>{
  // page loader
  const loader=document.getElementById('page-loader');
  setTimeout(()=>{loader.style.opacity='0';setTimeout(()=>loader.remove(),600);document.querySelector('main').classList.add('ready')},700);

  // Notes search
  const notesInput=document.getElementById('notes-search');
  const notesBtn=document.getElementById('notes-search-btn');
  const notesResults=document.getElementById('notes-results');

  function showNotes(query){
    notesResults.innerHTML='';
    if(!query || !query.trim()) return;
    if(query.toLowerCase().includes('wmn notes')){
      const sample=[
        {title:'WMN Notes - Unit 1',desc:'Concise notes for WMN subject.',link:'#'},
        {title:'WMN Notes - Unit 2',desc:'Worked examples and diagrams.',link:'#'}
      ];
      sample.forEach((s,i)=>{
        const card=document.createElement('div');card.className='note-card';
        card.innerHTML=`<div class='meta'><h4>${s.title}</h4><p>${s.desc}</p></div><div><button class='download'>Download</button></div>`;
        notesResults.appendChild(card);
        setTimeout(()=>card.classList.add('show'),100*i+50);
      });
    } else {
      const alert=document.createElement('div');alert.className='glass';alert.style.padding='14px';alert.innerHTML=`<strong>Notes are not available.</strong><p>If urgent, contact: <a href='mailto:msbtestudyhub@gmail.com'>msbtestudyhub@gmail.com</a></p>`;
      notesResults.appendChild(alert);
      alert.classList.add('fade-in');
    }
  }
  notesBtn.addEventListener('click',()=>showNotes(notesInput.value));
  notesInput.addEventListener('keyup',(e)=>{if(e.key==='Enter') showNotes(notesInput.value)});

  // Model answers
  document.getElementById('model-search').addEventListener('click',()=>{
    const q=document.getElementById('model-subject').value.trim();
    const out=document.getElementById('model-results');out.innerHTML='';
    if(!q){out.innerHTML='<div class="form-notice">Enter subject name or code.</div>';return}
    // sample not found behavior
    out.innerHTML=`<div class='glass' style='padding:14px'><strong>This content is not available.</strong><p>Please contact our team at <a href='mailto:msbtestudyhub@gmail.com'>msbtestudyhub@gmail.com</a></p></div>`;
  });

  // Explore branch clicking
  document.querySelectorAll('.branch-card .explore').forEach(btn=>{
    btn.addEventListener('click',function(e){
      const branch=this.closest('.branch-card').dataset.branch;
      document.body.style.transition='opacity .4s ease';document.body.style.opacity='0';
      setTimeout(()=>location.href=`branch.html?branch=${encodeURIComponent(branch)}`,420);
    });
  });

  // MCQ area
  const mcqArea=document.getElementById('mcq-area');
  const questions=[
    {q:'What is 2 + 2?',opts:['3','4','5'],a:1},
    {q:'Which is a programming language?',opts:['HTML','Python','CSS'],a:1}
  ];
  let currentIdx=0,score=0;
  function renderTest(){
    mcqArea.innerHTML=`<div class='progress'><i style='width:${(currentIdx/questions.length)*100}%'></i></div>`;
    const card=document.createElement('div');card.className='mcq-card';
    const qq=questions[currentIdx];
    card.innerHTML=`<h4>${qq.q}</h4>`;
    qq.opts.forEach((o,idx)=>{const b=document.createElement('button');b.className='btn';b.style.display='block';b.style.margin='8px 0';b.textContent=o;b.addEventListener('click',()=>{if(idx===qq.a)score++;currentIdx++;if(currentIdx<questions.length)renderTest();else showMcqResult();});card.appendChild(b)});
    mcqArea.appendChild(card);
  }
  function showMcqResult(){
    mcqArea.innerHTML=`<div class='glass' style='padding:18px'><h3>Your result has been recorded.</h3><p>We will send your result to your email shortly.<br>Thank you for using MSBTE Study Hub.</p><div style='margin-top:8px'>Please enter email to record result:<br><input id='result-email' placeholder='you@example.com' style='padding:8px;margin-top:6px;border-radius:8px;border:1px solid rgba(12,30,60,0.06)'><button id='submit-result' class='btn primary' style='margin-left:8px'>Submit</button></div></div>`;
    document.getElementById('submit-result').addEventListener('click',()=>{const em=document.getElementById('result-email').value; if(em) alert('Result recorded for '+em)});
  }
  document.getElementById('test-mode').addEventListener('click',()=>{currentIdx=0;score=0;renderTest()});

  // Books grid
  const books=[{b:'Computer',title:'Learning C',author:'A. Author',img:'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop'},{b:'Mechanical',title:'Mechanics 101',author:'B. Writer',img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'}];
  const booksGrid=document.getElementById('books-grid');books.forEach((bk)=>{const el=document.createElement('div');el.className='book-card';el.innerHTML=`<img src='${bk.img}' alt='${bk.title}'><h4>${bk.title}</h4><div style='color:var(--muted)'>${bk.author}</div>`;el.addEventListener('click',()=>openBookDetail(bk));booksGrid.appendChild(el)});
  function openBookDetail(bk){
    const modal=document.createElement('div');modal.style.position='fixed';modal.style.inset='0';modal.style.background='rgba(1,6,20,0.6)';modal.style.display='flex';modal.style.alignItems='center';modal.style.justifyContent='center';modal.innerHTML=`<div class='glass' style='max-width:760px;padding:18px'><div style='display:flex;gap:16px'><img src='${bk.img}' style='width:160px;height:220px;object-fit:cover;border-radius:10px'><div><h3>${bk.title}</h3><p style='color:var(--muted)'>${bk.author}</p><p>Short description about the book, what it covers and sample topics.</p><div style='margin-top:8px'><button class='btn primary' id='buy'>Purchase/PDF</button><button class='btn' id='close' style='margin-left:8px'>Close</button></div></div></div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('#close').addEventListener('click',()=>modal.remove());
    modal.querySelector('#buy').addEventListener('click',()=>alert('Open purchase or PDF link'));
  }

  // Contact form
  document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();document.getElementById('contact-notice').innerHTML='<strong>Our team will contact you shortly.</strong>';setTimeout(()=>document.getElementById('contact-form').reset(),400)});

});
