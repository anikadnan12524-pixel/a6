(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function $(i){return document.getElementById(i);}
  // tabs
  var tabs=document.querySelectorAll('[role=tab]');
  tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');$(x.getAttribute('aria-controls')).hidden=!on;});});});
  // 1. Size converter: rows [label, US, UK, EU, JP, AU, measure]
  var SZ={w:{h:['US','UK','EU','Japan','AU'],r:[['XS','2','6','34','5','6','Bust 81–84 cm'],['S','4','8','36','7','8','Bust 86–88 cm'],['S/M','6','10','38','9','10','Bust 89–91 cm'],['M','8','12','40','11','12','Bust 94–96 cm'],['M/L','10','14','42','13','14','Bust 97–99 cm'],['L','12','16','44','15','16','Bust 102–104 cm'],['XL','14','18','46','17','18','Bust 107–109 cm'],['XXL','16','20','48','19','20','Bust 112–114 cm']]},
    m:{h:['US','UK','EU','Japan','AU'],r:[['S','36','36','46','M','90','Chest 89–94 cm'],['M','38–40','38–40','48–50','L','92–96','Chest 97–102 cm'],['L','42','42','52','LL','100','Chest 107 cm'],['XL','44–46','44–46','54–56','3L','104–108','Chest 112–117 cm'],['XXL','48','48','58','4L','112','Chest 122 cm']]},
    ws:{h:['US','UK','EU','Japan (cm)','AU'],r:[['5','5','3','35–36','22','3.5'],['6','6','4','36–37','23','4.5'],['7','7','5','37–38','24','5.5'],['8','8','6','39','25','6.5'],['9','9','7','40','26','7.5'],['10','10','8','41','27','8.5'],['11','11','9','42','28','9.5']].map(function(x){return [x[0]+' US',x[0],x[1],x[2],x[3],x[4],'Foot about '+x[3]+' cm long'];})},
    ms:{h:['US','UK','EU','Japan (cm)','AU'],r:[['7','6','40','25','6'],['8','7','41','26','7'],['9','8','42–43','27','8'],['10','9','44','28','9'],['11','10','45','29','10'],['12','11','46','30','11'],['13','12','47','31','12']].map(function(x){return [x[0]+' US',x[0],x[1],x[2],x[3],x[4],'Foot about '+x[3]+' cm long'];})}};
  var st=$('sz-t'),ss=$('sz-s');
  function fillSz(){var T=SZ[st.value];ss.innerHTML=T.r.map(function(r,i){return '<option value="'+i+'">'+r[0]+(st.value==='w'||st.value==='m'?' (US '+r[1]+')':'')+'</option>';}).join('');ss.value=String(Math.floor(T.r.length/2));}
  function size(){if(!st)return;var T=SZ[st.value],r=T.r[+ss.value];
    $('sz-h').textContent=(st.options[st.selectedIndex].text)+': '+r[0];
    $('sz-g').innerHTML=T.h.slice(1).map(function(h,i){return '<div'+(i===1?' class="on"':'')+'><b>'+r[i+2]+'</b><small>'+h+'</small></div>';}).join('');
    $('sz-m').innerHTML='<b>US:</b> '+r[1]+' &middot; <b>Typical measurement:</b> '+r[6];
    $('sz-n').innerHTML='<b>Tip:</b> '+(st.value.length>1?'If you&#8217;re between sizes, go up half a size or check the brand&#8217;s foot-length chart.':'Between sizes? Size up for structured pieces like jackets and size down for stretchy knits.');}
  if(st){st.addEventListener('change',function(){fillSz();size();});ss.addEventListener('change',size);fillSz();size();}
  // 2. Fabric finder: scores per need
  var F={linen:['Linen',{cool:5,warm:1,easy:1,stretch:1,tough:4,soft:3},'Very breathable; creases are part of its charm.'],cotton:['Cotton',{cool:4,warm:2,easy:3,stretch:2,tough:4,soft:4},'Comfortable and familiar; easy to wash.'],
    merino:['Merino wool',{cool:3,warm:5,easy:4,stretch:3,tough:3,soft:5},'Regulates temperature and resists odour, ideal for travel.'],wool:['Wool',{cool:2,warm:5,easy:3,stretch:2,tough:4,soft:2},'Very warm; choose fine wool if you find it itchy.'],
    silk:['Silk',{cool:4,warm:3,easy:1,stretch:1,tough:1,soft:5},'Light and luxurious but delicate.'],lyocell:['Lyocell',{cool:5,warm:2,easy:3,stretch:2,tough:3,soft:5},'Silky, breathable and drapes well.'],
    poly:['Polyester',{cool:1,warm:3,easy:5,stretch:3,tough:5,soft:2},'Crease-resistant and quick-drying.'],nylon:['Nylon',{cool:2,warm:2,easy:5,stretch:4,tough:5,soft:3},'Light, strong and fast-drying.'],
    jersey:['Cotton-elastane jersey',{cool:3,warm:2,easy:4,stretch:5,tough:3,soft:5},'Soft stretch that keeps its shape.'],denim:['Denim',{cool:2,warm:3,easy:4,stretch:3,tough:5,soft:2},'Tough and gets better with wear.'],fleece:['Fleece',{cool:1,warm:4,easy:5,stretch:3,tough:3,soft:4},'Warm, light and quick to dry.']};
  var USE={everyday:{},work:{linen:-1,fleece:-2,denim:-1,silk:1,merino:1,lyocell:1},active:{merino:2,poly:2,nylon:2,jersey:1,silk:-3,linen:-1,denim:-3},travel:{merino:2,poly:1,lyocell:1,linen:-1,silk:-1}};
  var fn=$('ff-n'),fu=$('ff-u');
  function fab(){if(!fn)return;var need=fn.value,u=USE[fu.value],L=Object.keys(F).map(function(k){return [k,F[k][1][need]+(u[k]||0)*0.6];}).sort(function(a,b){return b[1]-a[1];}).slice(0,3);
    $('ff-h').textContent='Best for: '+fn.options[fn.selectedIndex].text.toLowerCase();
    $('ff-l').innerHTML=L.map(function(x,i){var f=F[x[0]];return '<li><em>'+(i===0?'Top pick':'#'+(i+1))+'</em><b>'+f[0]+'</b><small>'+f[2]+'</small></li>';}).join('');
    $('ff-x').innerHTML='<b>Blends:</b> a little elastane adds stretch, and cotton-polyester blends crease less than pure cotton. Check the label for the percentages.';}
  if(fn){[fn,fu].forEach(function(x){x.addEventListener('change',fab);});fab();}
  // 3. Keep or let go
  var A={},kq=$('kq');
  function verdict(){var keys=['worn','fits','good','love','fix'],done=keys.every(function(k){return k in A;}),v,d,c;
    if(!done){$('kv').textContent='Answer the questions';$('kv').className='verdict';$('kd').textContent=(5-Object.keys(A).length)+' question'+(5-Object.keys(A).length===1?'':'s')+' left.';return;}
    if(A.fits&&A.good&&(A.love||A.worn)){v='Keep it';c='v-keep';d='It fits, it&#8217;s in good shape and it earns its place. Hang it where you can see it so you wear it more.';}
    else if(A.fix&&(A.love||A.worn)){v='Repair it';c='v-repair';d='It&#8217;s worth saving. Book a repair or alteration, or try a simple fix like sewing a button or re-stitching a hem.';}
    else if(A.good){v='Pass it on';c='v-donate';d='It&#8217;s in good condition but isn&#8217;t right for you. Give it to a friend, swap it or donate it so someone else can enjoy it.';}
    else{v='Recycle it';c='v-recycle';d='It&#8217;s past its best. Take it to a textile recycling point, or cut it into cleaning cloths, rather than putting it in the bin.';}
    $('kv').textContent=v;$('kv').className='verdict '+c;$('kd').innerHTML=d;}
  if(kq){kq.querySelectorAll('.yn').forEach(function(g){g.querySelectorAll('button').forEach(function(btn){btn.addEventListener('click',function(){A[g.dataset.q]=btn.dataset.v==='1';g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===btn?'true':'false');});verdict();});});});verdict();}
  // contact & cookies
  var cf=$('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;if(!cf.checkValidity()){cf.reportValidity();return;}
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=$('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=$('cookie'),v=null;try{v=localStorage.getItem('tch_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('tch_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();
