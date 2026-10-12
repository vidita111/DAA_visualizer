const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const N2='O(n²)',NL='O(n log n)';
const ALG={
bubble:{n:'Bubble Sort',i:'Compare neighbours and swap them if out of order; the largest value "bubbles" to the end each pass.',b:'O(n)',a:N2,w:N2,sp:'O(1)',st:'Yes',ip:'Yes',p:'repeat until no swap happens:\n  for j = 0 .. n-2-pass:\n    if a[j] > a[j+1]: swap',o:'Sorted input: stops after one pass (about n−1 comparisons). Reverse input: every pair needs a swap.',y:'The "no swap → stop" flag is what makes the best case O(n).'},
selection:{n:'Selection Sort',i:'Find the smallest remaining element and swap it into the next position.',b:N2,a:N2,w:N2,sp:'O(1)',st:'No',ip:'Yes',p:'for i = 0 .. n-2:\n  m = index of min in a[i..n-1]\n  swap a[i], a[m]',o:'Comparisons are the same for every input type (about n²/2), but swaps never exceed n−1.',y:'It always scans the whole unsorted part, so input order cannot help. Long-distance swaps break stability.'},
insertion:{n:'Insertion Sort',i:'Take the next element and slide it left into its place inside the already-sorted part.',b:'O(n)',a:N2,w:N2,sp:'O(1)',st:'Yes',ip:'Yes',p:'for i = 1 .. n-1:\n  key = a[i]\n  shift larger elements right\n  put key in the gap',o:'Few shifts on Sorted / Nearly Sorted input; the maximum on Reverse input.',y:'Work ≈ number of inversions (out-of-order pairs). Nearly sorted → few inversions.'},
merge:{n:'Merge Sort',i:'Split the array in half, sort each half recursively, then merge the two sorted halves.',b:NL,a:NL,w:NL,sp:'O(n)',st:'Yes',ip:'No (extra array)',p:'sort(l, r):\n  if l >= r: return\n  sort(l, mid); sort(mid+1, r)\n  merge the two halves',o:'Comparison count barely changes with input type, because it always splits evenly.',y:'Divide and conquer: T(n) = 2T(n/2) + O(n) = O(n log n). Stable because ties take the left element first.'},
quick:{n:'Quick Sort',i:'Pick a pivot, divide the array into smaller and larger elements, and recursively sort the two parts.',b:NL,a:NL,w:N2,sp:'O(log n) average',st:'No',ip:'Yes (standard in-place partition)',p:'sort(l, r):\n  pivot = a[r]\n  move smaller elements left of it\n  put pivot in its final spot\n  sort(left part); sort(right part)',o:'This version uses the LAST element as pivot, so Sorted and Reverse input give lopsided splits and quadratic work. Random input stays near n log n.',y:'Divide and conquer, but the split depends on the pivot. A bad pivot means recursion depth n (we recurse into the smaller side first to keep the stack small).'},
heap:{n:'Heap Sort',i:'Build a max-heap, then repeatedly swap the maximum to the end and repair the heap.',b:NL,a:NL,w:NL,sp:'O(1)',st:'No',ip:'Yes',p:'build max-heap\nfor end = n-1 .. 1:\n  swap a[0], a[end]\n  sift a[0] down in a[0..end-1]',o:'Nearly independent of input order, but it makes many array accesses as it repairs the heap.',y:'A heap is a binary tree stored in the array: children of i are 2i+1 and 2i+2. (Heap tree drawing is not included; the highlighted range shows the heap region.)'},
counting:{n:'Counting Sort',i:'Count how often each value occurs, then write the values back in order. No element-to-element comparisons.',b:'O(n+k)',a:'O(n+k)',w:'O(n+k)',sp:'O(k)',st:'Yes (prefix-sum version)',ip:'No (count array)',p:'count[v]++ for every element\nfor v = min .. max:\n  write v, count[v] times',o:'Zero comparisons. Cost depends on n and the value range k, not on order. Few Unique Values is its best case.',y:'It beats the O(n log n) limit of comparison sorts because it never compares elements, but it only works for small integer ranges. (Finding min/max is not counted as a comparison.)'}};
const CODE={
bubble:["for i = 0 to n-2:","  swapped = false","  for j = 0 to n-2-i:","    if a[j] > a[j+1]:","      swap(a[j], a[j+1]); swapped = true","  a[n-1-i] is now in place","  if not swapped: break","return a"],
selection:["for i = 0 to n-2:","  min = i","  for j = i+1 to n-1:","    if a[j] < a[min]: min = j","  swap(a[i], a[min])","  a[i] is now in place","return a"],
insertion:["for i = 1 to n-1:","  key = a[i]; j = i-1","  while j >= 0 and a[j] > key:","    a[j+1] = a[j]; j = j-1","  a[j+1] = key","return a"],
merge:["sort(l, r):","  if l >= r: return","  mid = (l + r) / 2","  sort(l, mid); sort(mid+1, r)","  merge the two sorted halves:","    while both halves have elements:","      compare left[i] and right[j]","      copy the smaller one into a[k]","    copy the leftovers","return a"],
quick:["sort(l, r):","  if l >= r: return","  pivot = a[r]","  i = l","  for j = l to r-1:","    if a[j] < pivot:","      swap(a[i], a[j]); i = i+1","  swap(a[i], a[r])   // pivot into place","  sort(l, i-1); sort(i+1, r)","return a"],
heap:["build a max-heap from a","for end = n-1 down to 1:","  swap(a[0], a[end])","  a[end] is now in place","  siftDown(0, end):","    pick the larger of parent and children","    if a child is larger: swap, continue","return a"],
counting:["find min and max of a","count = zeros(max-min+1)","for each x in a: count[x-min]++","for v = min to max:","  write v into a, count[v-min] times","return a"]};
for(const k in CODE)ALG[k].code=CODE[k];
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const AK=Object.keys(ALG),COL=['#3b6cf6','#e5484d','#2fa56b','#f5a524','#9b5de5','#0fb5ba','#8d6e63'],col=k=>COL[AK.indexOf(k)];
const R=n=>Math.floor(Math.random()*n),seq=(n,f)=>Array.from({length:n},(_,i)=>f(i));
const INP={
random:{n:'Random',f:n=>seq(n,()=>1+R(Math.max(n,10))),ex:'7 2 9 1 5 3 8',d:'No pattern: the typical case. Shows average-case behaviour.'},
sorted:{n:'Already Sorted',f:n=>seq(n,i=>i+1),ex:'1 2 3 4 5 6 7',d:'Everything is already in place. Insertion Sort and early-exit Bubble Sort shine; Quick Sort with a fixed pivot suffers.'},
reverse:{n:'Reverse Sorted',f:n=>seq(n,i=>n-i),ex:'7 6 5 4 3 2 1',d:'Every pair is out of order (maximum inversions): the classic worst case for Bubble and Insertion.'},
nearly:{n:'Nearly Sorted',f:n=>{const a=seq(n,i=>i+1);for(let t=0;t<Math.max(1,n>>4);t++){const i=R(n),j=R(n);[a[i],a[j]]=[a[j],a[i]]}return a},ex:'1 2 3 4 8 6 7 5 9 10\n        ↑ displaced',d:'Sorted except a few displaced elements (about 6% swapped). Few inversions, so Insertion Sort needs few shifts.'},
dup:{n:'Many Duplicates',f:n=>{const k=Math.max(2,Math.ceil(n/5)),s=Math.ceil(n/k);return seq(n,()=>(1+R(k))*s)},ex:'3 3 1 2 3 2 3 1 3 2',d:'About 5 copies of each value. Equal keys expose stability and hurt simple partitioning.'},
few:{n:'Few Unique Values',f:n=>seq(n,()=>(1+R(4))*Math.ceil(n/4)),ex:'2 4 2 2 4 1 1 4 2',d:'Only about 4 distinct values (k ≪ n). Counting Sort loves this; simple Quick Sort wastes work on equal elements.'}};
/* ---------- algorithms (UI-free, instrumented) ---------- */
function run(k,src,rec){
const a=src.slice(),n=a.length,S={c:0,s:0,r:0},E=rec?(t,x,y,u,v,l)=>rec.push([t,x,y,S.c,S.s,S.r,u,v,l]):()=>0;
const g=i=>(S.r++,a[i]),C=(x,y,i,j,l)=>{S.c++;E('c',i,j,x,y,l);return x>y},w=(i,v,l)=>{S.r++;a[i]=v;E('w',i,v,0,0,l)},sw=(i,j,l)=>{const t=a[i];a[i]=a[j];a[j]=t;S.r+=4;S.s++;E('s',i,j,a[i],a[j],l)};
const F={
bubble(){for(let i=0;i<n-1;i++){let f=0;for(let j=0;j<n-1-i;j++)if(C(g(j),g(j+1),j,j+1,3)){sw(j,j+1,4);f=1}E('d',n-1-i,0,0,0,5);if(!f)break}},
selection(){for(let i=0;i<n-1;i++){let m=i;for(let j=i+1;j<n;j++)if(C(g(m),g(j),m,j,3))m=j;if(m!=i)sw(i,m,4);E('d',i,0,0,0,5)}},
insertion(){for(let i=1;i<n;i++){const key=g(i);let j=i-1;while(j>=0&&C(g(j),key,j,j+1,2)){w(j+1,a[j],3);j--}w(j+1,key,4)}},
merge(){const ms=(l,r)=>{if(l>=r)return;const m=l+r>>1;ms(l,m);ms(m+1,r);E('m',l,r,0,0,4);const L=[],Q=[];for(let i=l;i<=m;i++)L.push(g(i));for(let i=m+1;i<=r;i++)Q.push(g(i));let i=0,j=0,q=l;while(i<L.length&&j<Q.length)w(q++,C(L[i],Q[j],l+i,m+1+j,6)?Q[j++]:L[i++],7);while(i<L.length)w(q++,L[i++],8);while(j<Q.length)w(q++,Q[j++],8)};ms(0,n-1)},
quick(){const qs=(l,r)=>{while(l<r){E('m',l,r,0,0,1);const p=g(r);E('p',r,0,p,0,2);let i=l;for(let j=l;j<r;j++)if(C(p,g(j),r,j,5)){if(i!=j)sw(i,j,6);i++}if(i!=r)sw(i,r,7);E('d',i,0,0,0,7);if(i-l<r-i){qs(l,i-1);l=i+1}else{qs(i+1,r);r=i-1}}if(l==r)E('d',l,0,0,0,1)};qs(0,n-1)},
heap(){const sd=(i,m)=>{for(;;){let b=i;const l=2*i+1,r=l+1;if(l<m&&C(g(l),g(b),l,b,5))b=l;if(r<m&&C(g(r),g(b),r,b,5))b=r;if(b==i)return;sw(i,b,6);i=b}};E('m',0,n-1,0,0,0);for(let i=(n>>1)-1;i>=0;i--)sd(i,n);for(let e=n-1;e>0;e--){sw(0,e,2);E('d',e,0,0,0,3);E('m',0,e-1,0,0,4);sd(0,e)}},
counting(){if(!n)return;let mn=a[0],mx=a[0];for(let i=0;i<n;i++){const v=g(i);if(v<mn)mn=v;if(v>mx)mx=v}const q=new Array(mx-mn+1).fill(0);for(let i=0;i<n;i++){const v=g(i);q[v-mn]++;S.r++;E('k',i,i,v,0,2)}let p=0;for(let v=0;v<q.length;v++){S.r++;while(q[v]-->0)w(p++,v+mn,4)}}};
F[k]();const end=ALG[k].code.length-1;for(let i=0;i<n;i++)E('d',i,0,0,0,end);return{a,c:S.c,s:S.s,r:S.r}}
const isOk=(a,init)=>{const s=init.slice().sort((x,y)=>x-y);return a.length==s.length&&a.every((v,i)=>v==s[i])};
function timeIt(k,arr){const t0=performance.now(),res=run(k,arr,null);let ms=performance.now()-t0;
if(ms<2){const m=Math.min(3000,Math.ceil(10/Math.max(ms,.003))),t=performance.now();for(let i=0;i<m;i++)run(k,arr,null);ms=(performance.now()-t)/m}
else if(ms<200){for(let i=0;i<2;i++){const t=performance.now();run(k,arr,null);ms=Math.min(ms,performance.now()-t)}}
return{ms,res}}
/* ---------- replay of recorded events ---------- */
const mkst=a=>({a:a.slice(),done:new Set,cmp:null,swp:null,piv:null,rng:null});
function ap(s,e){s.cmp=s.swp=null;const[t,x,y]=e;if(t=='c'||t=='k')s.cmp=[x,y];else if(t=='s'){[s.a[x],s.a[y]]=[s.a[y],s.a[x]];s.swp=[x,y];if(s.piv==x||s.piv==y)s.piv=null}else if(t=='w'){s.a[x]=y;s.swp=[x]}else if(t=='p')s.piv=x;else if(t=='d'){s.done.add(x);if(s.piv==x)s.piv=null}else if(t=='m')s.rng=[x,y]}
const msgOf=(k,e)=>{const[t,x,y,,,,u,v]=e;return t=='c'?(k=='selection'?`Is ${v} smaller than the current minimum ${u}?`:k=='quick'?`Is ${v} smaller than the pivot ${u}? ${v<u?'Yes, it goes to the left part.':'No, it stays on the right.'}`:k=='heap'?`Is the child ${u} larger than ${v}? ${u>v?'Yes, they will be swapped.':'No, heap order is fine.'}`:k=='merge'?`Comparing ${u} (left half) with ${v} (right half): the smaller one goes next.`:`Comparing ${u} and ${v}: ${u>v?'out of order, so move/swap':'already in order'}.`):t=='s'?`${u} and ${v} are swapped.`:t=='w'?(k=='merge'?`Merging: ${y} is placed at position ${x}.`:k=='insertion'?`${y} written at position ${x} (shifting right, or inserting the key).`:`${y} is written at position ${x}.`):t=='p'?`The pivot is ${u}. Elements smaller than ${u} are moved to the left.`:t=='k'?`Counting the value ${u}.`:t=='m'?(k=='merge'?`The left and right halves (positions ${x}–${y}) are being merged.`:k=='heap'?`Repairing the max-heap in positions ${x}–${y} (a parent must be ≥ its children).`:`Partitioning positions ${x}–${y}.`):`Position ${x} now holds its final value.`};
/* ---------- visualizer ---------- */
let cur=[],lanes=[],timer=null;
function mkLane(k,arr){const d=document.createElement('div');d.className='card';d.innerHTML=`<h3>${ALG[k].n}</h3><div class="vz"><div class="bars">${'<i></i>'.repeat(arr.length)}</div><div class="code"><small>Code being executed (▶ = current line)</small>${ALG[k].code.map((t,i)=>`<div class="ln"><span class="ar">▶</span><span class="no">${i+1}</span><code>${esc(t)}</code></div>`).join('')}</div></div><div class="op"></div><div class="stats">${['Comparisons','Swaps','Array Accesses','Elapsed Time','Current Step'].map(x=>`<div><small>${x}</small><b>–</b></div>`).join('')}</div>`;
const l={k,d,init:arr,bars:[...d.querySelectorAll('.bars i')],lines:[...d.querySelectorAll('.code .ln')],op:d.querySelector('.op'),sv:[...d.querySelectorAll('.stats b')],pos:0,ev:[],st:mkst(arr),ms:null};draw(l);return l}
function draw(l){const s=l.st,mx=Math.max(...l.init),n=s.a.length;
l.bars.forEach((b,i)=>{b.style.height=s.a[i]/mx*100+'%';b.textContent=n<=20?s.a[i]:'';b.className=s.swp&&s.swp.includes(i)?'sw':s.cmp&&s.cmp.includes(i)?'cp':s.piv===i?'pv':s.done.has(i)?'dn':s.rng&&i>=s.rng[0]&&i<=s.rng[1]?'rg':''});
const e=l.pos?l.ev[l.pos-1]:0,t=l.fin||{c:e?e[3]:0,s:e?e[4]:0,r:e?e[5]:0},z=x=>x.toLocaleString();
[z(t.c),z(t.s),z(t.r),l.ms==null?'–':l.ms<1?l.ms.toFixed(3)+' ms':l.ms.toFixed(2)+' ms',l.fin?'instant':l.pos+' / '+l.ev.length].forEach((x,i)=>l.sv[i].textContent=x);
const cl=e&&!l.fin?e[8]:-1;l.lines.forEach((x,i)=>x.classList.toggle('cur',i==cl));
const ok=l.ok?' ✔ Verified sorted.':' ✘ NOT sorted!';
l.op.textContent=l.fin?'Animation skipped for speed: final result and real counters shown.'+ok:e?msgOf(l.k,e)+(l.pos==l.ev.length?ok:''):l.ms==null?'Press Start Sorting.':'Ready: press Resume or Next step.'}
function seek(l,p){if(p<l.pos){l.st=mkst(l.init);l.pos=0}while(l.pos<p)ap(l.st,l.ev[l.pos++]);draw(l)}
function load(l,anim){const t=timeIt(l.k,l.init);l.ms=t.ms;l.ok=isOk(t.res.a,l.init);l.st=mkst(l.init);l.pos=0;if(anim){const r=[];run(l.k,l.init,r);l.ev=r;l.fin=null}else{l.ev=[];l.fin=t.res;l.st.a=t.res.a.slice();for(let i=0;i<l.init.length;i++)l.st.done.add(i)}draw(l)}
const ks=()=>[$('#al').value,...($('#al2').value?[$('#al2').value]:[])];
const card=k=>{const x=ALG[k];return`<div class="card"><h3>${x.n}</h3><p><b>Idea:</b> ${x.i}</p><div class="badges"><span>Best ${x.b}</span><span>Average ${x.a}</span><span>Worst ${x.w}</span><span>Space ${x.sp}</span><span>Stable: ${x.st}</span><span>In-place: ${x.ip}</span></div><pre>${x.p}</pre><p><b>👀 What to watch:</b> ${x.o}</p><details><summary>Why?</summary>${x.y}</details></div>`};
function stop(){clearInterval(timer);timer=null}
function refresh(){stop();$('#lanes').innerHTML='';$('#lanes').className=ks().length>1?'two':'';lanes=ks().map(k=>mkLane(k,cur));lanes.forEach(l=>$('#lanes').append(l.d));$('#info').innerHTML=ks().map(card).join('')}
function ex(lab){const t=INP[$('#it').value];$('#ex').innerHTML=(lab?`<b>${lab}</b>`:`<b>${t.n}</b> — ${t.d}<pre>${t.ex}</pre>`)+`<small>Current array (${cur.length}): ${cur.slice(0,40).join(', ')}${cur.length>40?' …':''}</small>`}
function gen(){$('#msg').textContent='';cur=INP[$('#it').value].f(+$('#nz').value);ex();refresh()}
function prep(){if(lanes.some(l=>l.ms==null)){const a=$('#an').checked&&cur.length<=80;lanes.forEach(l=>load(l,a))}}
function play(){stop();const sp=+$('#sp').value,b=Math.ceil(sp/10);timer=setInterval(()=>{let any=0;lanes.forEach(l=>{if(l.pos<l.ev.length){seek(l,Math.min(l.pos+b,l.ev.length));any=1}});if(!any)stop()},Math.max(12,1000/sp))}
function step(d){stop();prep();lanes.forEach(l=>{if(l.ev.length)seek(l,Math.max(0,Math.min(l.ev.length,l.pos+d)))})}
function parseMan(t){t=t.trim();if(!t)return{e:'Type some numbers separated by commas first.'};const p=t.split(/[\s,;]+/).filter(Boolean);if(p.length>200)return{e:'Please use at most 200 numbers.'};const bad=p.find(x=>!/^\d+$/.test(x)||+x<1||+x>9999);if(bad!==undefined)return{e:`"${bad}" is not valid. Use whole numbers from 1 to 9999, separated by commas.`};return{a:p.map(Number)}}
/* ---------- experiment ---------- */
let RES=[];const pick=n=>$$(`input[name=${n}]:checked`).map(e=>e.value),ML={ms:'Time (ms)',c:'Comparisons',s:'Swaps',r:'Array accesses'};
const fm=v=>v>=1e6?(v/1e6).toFixed(1)+'M':v>=1e3?(v/1e3).toFixed(1)+'k':v<1?v.toFixed(3):v%1?v.toFixed(1):''+v;
async function runExp(){const as=pick('ea'),is=pick('ei'),ss=pick('es').map(Number).sort((a,b)=>a-b);if(!as.length||!is.length||!ss.length){$('#pg').textContent='Pick at least one algorithm, input type and size.';return}
RES=[];const tot=as.length*is.length*ss.length;let d=0;$('#rn').disabled=true;
for(const sz of ss)for(const inp of is){const arr=INP[inp].f(sz);for(const k of as){const t=timeIt(k,arr);RES.push({k,inp,size:sz,ms:t.ms,c:t.res.c,s:t.res.s,r:t.res.r,ok:isOk(t.res.a,arr)});$('#pg').textContent=`Running… ${++d}/${tot}`;await new Promise(r=>setTimeout(r))}}
$('#rn').disabled=false;$('#pg').textContent=`Done: ${tot} runs.`;show()}
function show(){const z=x=>x.toLocaleString();$('#tb').innerHTML='<tr><th>Algorithm<th>Input<th>Size<th>Time (ms)<th>Comparisons<th>Swaps<th>Accesses<th>Sorted?</tr>'+RES.map(r=>`<tr><td>${ALG[r.k].n}<td>${INP[r.inp].n}<td>${z(r.size)}<td>${fm(r.ms)}<td>${z(r.c)}<td>${z(r.s)}<td>${z(r.r)}<td>${r.ok?'✔':'✘'}`).join('');
const ins=[...new Set(RES.map(r=>r.inp))],sz=[...new Set(RES.map(r=>r.size))];$('#ci').innerHTML=ins.map(i=>`<option value="${i}">${INP[i].n}</option>`).join('');$('#cs').innerHTML=sz.map(s=>`<option>${s}</option>`).join('');$('#cs').value=sz.at(-1);if(ins.includes('random'))$('#ci').value='random';
$('#out').style.display='block';charts();$('#fd').innerHTML=finds().map(x=>`<li>${x}</li>`).join('')}
function chart(el,title,xs,ser,line){const log=$('#lg').checked,W=640,H=280,L=62,B=40,T=30,Rr=12,all=ser.flatMap(s=>s.v).filter(v=>v!=null);if(!all.length||Math.max(...all)<=0){el.innerHTML=`<p class="mu">${title}: every value is 0 for this metric, so there is nothing to plot. Try another metric.</p>`;return}
const f=v=>log?Math.log10(Math.max(v,.001)):v;let hi=Math.max(...all.map(f)),lo=log?Math.min(...all.map(f)):0;if(hi<=lo)hi=lo+1;const y=v=>H-B-(f(v)-lo)/(hi-lo)*(H-B-T),xn=xs.length,pw=W-L-Rr;
let s=`<svg viewBox="0 0 ${W} ${H}"><text x="${L}" y="20" font-size="17" font-weight="600">${title}</text>`;
for(let i=0;i<=4;i++){const fv=lo+(hi-lo)*i/4,yy=H-B-(H-B-T)*i/4;s+=`<line x1="${L}" x2="${W-Rr}" y1="${yy}" y2="${yy}" style="stroke:var(--ln)"/><text x="${L-4}" y="${yy+4}" text-anchor="end">${fm(log?10**fv:fv)}</text>`}
const px=i=>line?L+10+(xs[i]-xs[0])/((xs.at(-1)-xs[0])||1)*(pw-20):L+(i+.5)*pw/xn;
xs.forEach((x,i)=>s+=`<text x="${px(i)}" y="${H-B+19}" text-anchor="middle">${x}</text>`);
ser.forEach((q,j)=>{const c=col(q.k),pts=q.v.map((v,i)=>v==null?null:[px(i),y(v),v]).filter(Boolean);
if(line){s+=`<polyline fill="none" stroke="${c}" stroke-width="2" points="${pts.map(p=>p[0]+','+p[1]).join(' ')}"/>`+pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${c}"><title>${ALG[q.k].n}: ${fm(p[2])}</title></circle>`).join('')}
else{const gw=pw/xn,bw=gw*.8/ser.length;q.v.forEach((v,i)=>{if(v!=null)s+=`<rect x="${L+i*gw+gw*.1+j*bw}" y="${y(v)}" width="${bw}" height="${H-B-y(v)}" fill="${c}"><title>${ALG[q.k].n}: ${fm(v)}</title></rect>`})}});
el.innerHTML=s+`</svg><div class="lg">${ser.map(q=>`<span><i style="background:${col(q.k)}"></i>${ALG[q.k].n}</span>`).join('')}</div>`}
function charts(){if(!RES.length)return;const m=$('#mt').value,I=$('#ci').value,S=+$('#cs').value,ks=[...new Set(RES.map(r=>r.k))],sz=[...new Set(RES.map(r=>r.size))].sort((a,b)=>a-b),ins=[...new Set(RES.map(r=>r.inp))],g=(k,i,s)=>(RES.find(r=>r.k==k&&r.inp==i&&r.size==s)||{})[m];
chart($('#g1'),`Graph 1: array size vs ${ML[m]} (${INP[I].n})`,sz,ks.map(k=>({k,v:sz.map(s=>g(k,I,s))})),1);
chart($('#g2'),`Graph 2: input type vs ${ML[m]} (n=${S})`,ins.map(i=>INP[i].n),ks.map(k=>({k,v:ins.map(i=>g(k,i,S))})),0);
chart($('#g3'),`Graph 3: algorithms on ${INP[I].n}, n=${S} (${ML[m]})`,[''],ks.map(k=>({k,v:[g(k,I,S)]})),0)}
function finds(){const L=[],g=(k,i,s)=>RES.find(r=>r.k==k&&r.inp==i&&r.size==s),ss=[...new Set(RES.map(r=>r.size))].sort((a,b)=>a-b),B=ss.at(-1),S0=ss[0],N=k=>ALG[k].n,f=x=>x.toLocaleString();
const ia=g('insertion','sorted',B),ir=g('insertion','random',B),inr=g('insertion','nearly',B);
if(ia&&ir&&ia.c<ir.c/2)L.push(`${N('insertion')} used ${f(ia.c)} comparisons on Sorted input but ${f(ir.c)} on Random input (n=${B}). When elements are already in place, its inner loop stops immediately.`);
if(inr&&ir&&inr.c<ir.c/2)L.push(`On Nearly Sorted input Insertion Sort needed ${f(inr.c)} comparisons vs ${f(ir.c)} on Random (n=${B}): elements are close to their final spots, so few shifts are needed.`);
const bs=g('bubble','random',S0),bb=g('bubble','random',B);if(bs&&bb&&B>S0)L.push(`Bubble Sort's comparisons on Random input grew ${(bb.c/bs.c).toFixed(0)}× when n grew ${B/S0}×. Quadratic growth O(n²) predicts about ${(B/S0)**2}×.`);
const qa=g('quick','sorted',B),qr=g('quick','random',B);if(qa&&qr&&qa.c>3*qr.c)L.push(`Quick Sort needed ${f(qa.c)} comparisons on Sorted input vs ${f(qr.c)} on Random (n=${B}). With the last element as pivot, sorted data gives lopsided splits: the O(n²) worst case.`);
const mv=Object.keys(INP).map(i=>g('merge',i,B)).filter(Boolean).map(r=>r.c);if(mv.length>2&&Math.max(...mv)<1.6*Math.min(...mv))L.push(`Merge Sort's comparisons stayed between ${f(Math.min(...mv))} and ${f(Math.max(...mv))} across input types (n=${B}), because it always splits in half.`);
const cs=RES.filter(r=>r.k=='counting');if(cs.length&&cs.every(r=>r.c==0))L.push('Counting Sort made 0 element comparisons in every run: it counts values instead of comparing them, so its cost depends on n and the value range k.');
const rs=RES.filter(r=>r.inp=='random'&&r.size==B).sort((a,b)=>a.ms-b.ms);if(rs.length>1)L.push(`Fastest measured on Random input at n=${B}: ${N(rs[0].k)} (${rs[0].ms.toFixed(2)} ms); slowest: ${N(rs.at(-1).k)} (${rs.at(-1).ms.toFixed(2)} ms). Times are machine-dependent; the counters are the fairer evidence.`);
if(!L.length)L.push('Select more algorithms, input types, and at least two sizes to get richer findings.');return L}
/* ---------- wiring ---------- */
function go(p){$$('main section').forEach(s=>s.classList.toggle('on',s.id==p));$$('nav button').forEach(b=>b.classList.toggle('on',b.dataset.go==p));if(p!='viz')stop()}
$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));$('#th').onclick=()=>{const d=document.documentElement;d.dataset.theme=(d.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))=='dark'?'light':'dark'};
$('#al').innerHTML=AK.map(k=>`<option value="${k}">${ALG[k].n}</option>`).join('');$('#al').value='quick';$('#al2').innerHTML='<option value="">— none —</option>'+AK.map(k=>`<option value="${k}">${ALG[k].n}</option>`).join('');$('#it').innerHTML=Object.keys(INP).map(k=>`<option value="${k}">${INP[k].n}</option>`).join('');
$('#nz').oninput=()=>$('#nv').textContent=$('#nz').value;$('#nz').onchange=$('#it').onchange=gen;$('#al').onchange=$('#al2').onchange=refresh;$('#bg').onclick=gen;
$('#bs').onclick=()=>{refresh();prep();play()};$('#bp').onclick=stop;$('#br').onclick=()=>{if(lanes.some(l=>l.ev.length))play()};$('#bx').onclick=refresh;$('#bv').onclick=()=>step(-1);$('#bn').onclick=()=>step(1);$('#sp').oninput=()=>{if(timer)play()};
$('#bm').onclick=()=>{const r=parseMan($('#man').value);if(r.e){$('#msg').textContent=r.e;return}$('#msg').textContent='';cur=r.a;ex('Custom array (typed by you)');refresh()};
$('#ea').innerHTML=AK.map(k=>`<label><input type="checkbox" name="ea" value="${k}"> ${ALG[k].n}</label>`).join('');
$('#ei').innerHTML=Object.keys(INP).map(k=>`<label><input type="checkbox" name="ei" value="${k}"> ${INP[k].n}</label>`).join('');
$('#es').innerHTML=[20,30,50,100,500,1000,5000].map(k=>`<label><input type="checkbox" name="es" value="${k}"> ${k}</label>`).join('');
$('#rn').onclick=runExp;$('#mt').onchange=$('#ci').onchange=$('#cs').onchange=$('#lg').onchange=charts;
const pl=s=>`<span class="pl ${/²/.test(s)?'r':/log/.test(s)?'y':'g'}">${s}</span>`;
$('#cx').innerHTML='<tr><th>Algorithm<th>Best<th>Average<th>Worst<th>Space<th>Stable<th>In-place</tr>'+AK.map(k=>{const x=ALG[k];return`<tr><td><b>${x.n}</b><td>${pl(x.b)}<td>${pl(x.a)}<td>${pl(x.w)}<td>${pl(x.sp)}<td>${x.st}<td>${x.ip}`}).join('');
$('#bo').innerHTML=[['O(n)','Linear: double the input, double the work. Reading every element once.'],['O(n²)','Quadratic: double the input, FOUR times the work. Two nested loops over the data.'],['O(n log n)','Double the input and the work grows a bit more than 2×. Repeatedly halving the problem (log n levels) with n work per level.']].map(x=>`<div class="card"><h4>${x[0]}</h4>${x[1]}</div>`).join('');
$('#lc').innerHTML=AK.map(card).join('');$('#usp').innerHTML=[['🎯','Input-sensitive experiments','Same algorithm, six input types.'],['📐','Theory vs experiment','Big-O next to real measurements.'],['🔢','Operation counting','Comparisons, swaps, array accesses: real counters.'],['⚖️','Fair comparison','Same generated array for every algorithm.'],['💡','Plain-English findings','Auto-written from your results.']].map(x=>`<div class="card"><div style="font-size:24px">${x[0]}</div><b>${x[1]}</b><br><span class="mu">${x[2]}</span></div>`).join('');
$('#st').onclick=()=>{const cs=[[],[5],[2,2,2],[3,1,2],[1,2,3,4,5],[5,4,3,2,1],...['random','dup','few','nearly'].map(t=>INP[t].f(200))],bad=[];let n=0;for(const k of AK)for(const c of cs){n++;if(!isOk(run(k,c,null).a,c))bad.push(ALG[k].n)}$('#sr').textContent=bad.length?'❌ Failed: '+bad.join(', '):`✅ All ${n} tests passed (${AK.length} algorithms × ${cs.length} inputs incl. empty, single, duplicates, sorted, reverse).`};
gen();
