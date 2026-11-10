/* ===== Edit this block to match your college ===== */
var COLLEGE="Your College Name";
var MIN_ATT=75;
var STREAM_LIST={civil:"Civil Engineering",mech:"Mechanical Engineering",cse:"Computer Science and Engineering",ece:"Electronics and Communication Engineering",eee:"Electrical and Electronics Engineering"};
var CHECK={ece:1,eee:1};
/* Anna University Regulations 2025, Semester 1: code, name, L, T, P, credits, internal % (0 = not set), audit */
var C={
MA:["MA25C01","Applied Calculus",3,1,0,4,40],
EN:["EN25C01","English Essentials – I",2,0,0,2,40],
HT:["UC25H01","Heritage of Tamils",1,0,0,1,0],
PH:["PH25C01","Applied Physics – I",2,0,2,3,50],
CY:["CY25C01","Applied Chemistry – I",2,0,2,3,50],
ED:["ME25C01","Engineering Drawing",2,0,4,4,50],
PY:["CS25C02","Computer Programming: Python",2,0,2,3,50],
CP:["CS25C01","Computer Programming: C",2,0,2,3,0],
MK:["ME25C04","Makerspace",0,0,4,2,0],
IC:["CE25C01","Introduction to Civil Engineering",3,0,0,3,40],
IM:["ME25C03","Introduction to Mechanical Engineering",2,1,0,3,0],
EC:["CS25C03","Essentials of Computing",2,0,2,3,0],
IE:["EE25C03","Fundamentals of Electrical and Electronics Engineering",2,1,0,3,0],
BE:["","Basic Electronics and Electrical Engineering",2,1,0,3,0],
LS:["UC25A01","Life Skills for Engineers – I",1,0,2,0,100,1],
PE:["UC25A02","Physical Education – I",0,0,4,1,100,1]};
var STREAMS={civil:["MA","IC","PH","CY","ED","HT","EN","PY","MK","LS","PE"],mech:["MA","IM","ED","PH","CY","HT","EN","PY","MK","LS","PE"],cse:["MA","EN","HT","PH","CY","CP","EC","MK","LS","PE"],ece:["MA","EN","HT","BE","PH","CY","CP","MK","LS","PE"],eee:["MA","IE","HT","PH","CY","EN","PY","MK","LS","PE"]};
var SUBJECTS=[],CUR="",TT={};
function rnd(s){var x=0;for(var i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))%2147483647;x=x||1;return function(){x=(x*48271)%2147483647;return x/2147483647}}
function build(key){return STREAMS[key].map(function(k){var c=C[k],r=rnd(c[1]+key),t=Math.max(10,(c[2]+c[3]+c[4])*6),a=Math.round(t*(0.6+0.38*r()));
 var m=function(o){return [Math.round(o*(0.55+0.4*r())),o]};
 return {id:k,code:c[0],name:c[1],L:c[2],T:c[3],P:c[4],cr:c[5],ca:c[6],audit:!!c[7],att:[a,t],marks:c[7]?null:{"Internal 1":m(50),"Internal 2":m(50),"Model":m(100)}}})}
var PERIODS=["9:00–9:50","9:50–10:40","10:55–11:45","11:45–12:35","1:25–2:15","2:15–3:05","3:20–4:10","4:10–5:00"];
var STARTS=[540,590,655,705,805,855,920,970],ENDS=[590,640,705,755,855,905,970,1020];
function buildTT(list){var days=["Mon","Tue","Wed","Thu","Fri"],tt={},bl=[],th=[],q=[],qi=0,ord=[[0,0],[1,1],[2,0],[3,1],[4,0],[0,1],[1,0],[2,1],[3,0],[4,1]],pr=[4,6];
 days.forEach(function(d){tt[d]=["","","","","","","",""]});
 list.forEach(function(s){var k;for(k=0;k<s.P/2;k++)bl.push(s.id);for(k=0;k<s.L+s.T;k++)(th[k]=th[k]||[]).push(s.id)});
 bl.forEach(function(id,i){if(i>9)return;var o=ord[i],p=pr[o[1]];tt[days[o[0]]][p]=id;tt[days[o[0]]][p+1]=id});
 th.forEach(function(r){r.forEach(function(id){q.push(id)})});
 days.forEach(function(d){for(var p=0;p<8;p++)if(!tt[d][p]&&qi<q.length)tt[d][p]=q[qi++]});
 return tt}
function cap(s){return (s.code?s.code+" · ":"")+(s.audit&&!s.cr?"Audit course":s.cr+" credit"+(s.cr===1?"":"s"))}
var NOTICES=[
 {t:"Model exam hall tickets available from the office",d:"This week"},
 {t:"Library will stay open until 8 pm during exams",d:"Next week"},
 {t:"Fee payment last date extended",d:"Check the office board"}
];
var PLACES=[
 {n:"Main Block",x:250,y:60,w:200,h:70,c:"#b9c8ff",d:"Classrooms for all first-year sections, department offices and the principal’s office."},
 {n:"Library",x:70,y:60,w:140,h:70,c:"#c7ecd9",d:"Reading hall, digital library and book lending. Open 8 am to 6 pm."},
 {n:"Computer Labs",x:490,y:60,w:150,h:70,c:"#ffe0a8",d:"C programming and networking labs. Carry your ID card."},
 {n:"Auditorium",x:490,y:170,w:150,h:80,c:"#f6c3cc",d:"Seminars, symposiums and the annual day."},
 {n:"Canteen",x:70,y:290,w:140,h:70,c:"#ffd9bd",d:"Meals, snacks and tea. Busiest from 12:35 to 1:30."},
 {n:"Workshop & Physics Lab",x:250,y:290,w:200,h:70,c:"#d7d0f5",d:"Physics, chemistry and engineering graphics sessions."},
 {n:"Sports Ground",x:70,y:170,w:380,h:90,c:"#d3efb8",d:"Cricket and football ground with an outdoor court."},
 {n:"Hostel",x:490,y:290,w:150,h:70,c:"#c4e6ee",d:"Boys’ and girls’ hostels with a common mess."},
 {n:"Main Gate",x:300,y:385,w:100,h:36,c:"#e5e5e5",d:"Entry and exit. Show your ID to security."}
];
/* ===== App ===== */
var $=function(s){return document.querySelector(s)};
var DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var st={user:null,tab:"home",exam:"Internal 1",day:["Mon","Tue","Wed","Thu","Fri"].indexOf(DAYS[new Date().getDay()])<0?"Mon":DAYS[new Date().getDay()],place:null};
var ICON={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',att:'<path d="M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>',marks:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',tt:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',map:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11z"/><circle cx="12" cy="10" r="2.500"/>'};
var TABS=[["home","Home"],["att","Attendance"],["marks","Marks"],["tt","Timetable"],["map","Campus map"]];
function sub(id){return SUBJECTS.filter(function(s){return s.id===id})[0]}
function pct(a,t){return t?a/t*100:0}
function cls(p){return p>=MIN_ATT?"ok":p>=MIN_ATT-10?"warn":"bad"}
function col(p){return "var(--"+cls(p)+")"}
function totals(){var a=0,t=0;SUBJECTS.forEach(function(s){a+=s.att[0];t+=s.att[1]});return pct(a,t)}
function examTotal(s){var m=s.marks,k=Object.keys(m),g=0,o=0;k.forEach(function(e){g+=m[e][0];o+=m[e][1]});return pct(g,o)}
function grade(p){return p>=90?"O":p>=80?"A+":p>=70?"A":p>=60?"B+":p>=50?"B":"RA"}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
function bunk(s){var a=s.att[0],t=s.att[1],r=MIN_ATT/100;
 if(pct(a,t)>=MIN_ATT){var n=Math.floor(a/r-t);return n>0?"You can miss "+n+" more class"+(n>1?"es":"")+" and stay above "+MIN_ATT+"%.":"You are right at "+MIN_ATT+"%. Don’t miss the next class."}
 var need=Math.ceil((r*t-a)/(1-r));return "Attend the next "+need+" class"+(need>1?"es":"")+" in a row to reach "+MIN_ATT+"%."}
function nowInfo(){var d=new Date(),m=d.getHours()*60+d.getMinutes(),day=DAYS[d.getDay()],row=TT[day];if(!row)return null;
 for(var i=0;i<8;i++){if(row[i]&&m<ENDS[i])return {i:i,id:row[i],on:m>=STARTS[i]}}return null}
function render(){
 var app=$("#app");
 if(!st.user){app.innerHTML='<div class="login"><h1 style="font-size:2rem">'+esc(COLLEGE)+'</h1><p class="mute">Sign in to see your attendance, marks, timetable and campus map.</p><form id="f"><label for="n">Your name</label><input id="n" autocomplete="name" required><label for="r">Register number</label><input id="r" inputmode="numeric" required><label for="s">Branch</label><select id="s">'+Object.keys(STREAM_LIST).map(function(k){return '<option value="'+k+'">'+STREAM_LIST[k]+'</option>'}).join("")+'</select><button class="btn" type="submit">Sign in</button></form><p class="mute" style="margin-top:18px">This is a demo with sample data. The college can replace it with real records.</p></div>';
  $("#f").onsubmit=function(e){e.preventDefault();st.user={name:$("#n").value.trim(),reg:$("#r").value.trim(),stream:$("#s").value};try{localStorage.setItem("cp_user",JSON.stringify(st.user))}catch(x){}render()};return}
 if(CUR!==st.user.stream){CUR=st.user.stream;SUBJECTS=build(CUR);TT=buildTT(SUBJECTS)}
 var v={home:home,att:att,marks:marks,tt:tt,map:map}[st.tab]();
 app.innerHTML='<div class="wrap">'+v+'</div><nav aria-label="Sections">'+TABS.map(function(t){return '<button data-t="'+t[0]+'"'+(st.tab===t[0]?' aria-current="page"':'')+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+ICON[t[0]]+'</svg>'+t[1]+'</button>'}).join("")+'</nav>';
 app.querySelectorAll("nav button").forEach(function(b){b.onclick=function(){st.tab=b.dataset.t;render();scrollTo(0,0)}});
 bind()}
function head(t,sub){return '<div class="row" style="margin-bottom:14px"><div><h1 style="font-size:1.7rem">'+t+'</h1>'+(sub?'<div class="mute">'+sub+'</div>':'')+'</div><button class="ghost" id="out">Sign out</button></div>'}
function home(){var o=totals(),n=nowInfo(),G=SUBJECTS.filter(function(s){return s.marks}),cr=SUBJECTS.reduce(function(a,s){return a+s.cr},0),avg=G.reduce(function(a,s){return a+examTotal(s)},0)/G.length,low=SUBJECTS.filter(function(s){return pct(s.att[0],s.att[1])<MIN_ATT});
 return '<section class="hero"><div class="hero-tag">✦ STUDENT DASHBOARD</div><h1>Hey, '+esc(st.user.name.split(" ")[0])+'!</h1><p>Your campus life, all in one place.</p><svg class="hero-art" viewBox="0 0 140 125" fill="none" aria-hidden="true"><path d="M16 105h108" stroke="white" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/><path d="M31 105V53l39-27 39 27v52" stroke="white" stroke-width="4" stroke-linejoin="round"/><path d="M48 105V70h44v35M63 70v35M77 70v35" stroke="white" stroke-width="3"/><path d="M22 53h96L70 15 22 53Z" fill="white" fill-opacity=".18" stroke="white" stroke-width="3"/><path d="M70 15V5m-7 0h14" stroke="white" stroke-width="3" stroke-linecap="round"/><circle cx="116" cy="22" r="8" fill="#FDE68A"/><path d="m116 8 0-5m0 38v-5m14-14h5m-38 0h5" stroke="#FDE68A" stroke-width="2" stroke-linecap="round"/></svg></section><p class="mute" style="margin:0 2px 14px">'+esc(COLLEGE)+' · '+STREAM_LIST[st.user.stream]+' · Semester 1 · Reg. no. '+esc(st.user.reg)+'</p>' 
 +'<div class="grid" style="margin-bottom:14px"><div class="card stat-card"><div class="stat-icon">◷</div><div class="mute">Overall attendance</div><div class="big" style="color:'+col(o)+'">'+o.toFixed(1)+'%</div><span class="pill '+cls(o)+'">'+(o>=MIN_ATT?"Safe":"Below "+MIN_ATT+"%")+'</span></div><div class="card stat-card"><div class="stat-icon">✦</div><div class="mute">Average exam score</div><div class="big">'+avg.toFixed(0)+'%</div><span class="pill ok">'+cr+' credits this semester</span></div></div>'
 +'<div class="card"><div class="mute">'+(n?(n.on?"Happening now":"Next class"):"No more classes today")+'</div>'+(n?'<h2 style="font-size:1.3rem;margin-top:4px">'+sub(n.id).name+'</h2><div class="mute">Period '+(n.i+1)+' · '+PERIODS[n.i]+'</div>':'<div>Enjoy your evening.</div>')+'</div>'
 +(low.length?'<div class="card"><h3 style="font-size:1.1rem;margin-bottom:6px">Attendance needs attention</h3>'+low.map(function(s){return '<div style="margin:6px 0"><b>'+s.name+'</b> <span class="pill bad">'+pct(s.att[0],s.att[1]).toFixed(0)+'%</span><div class="mute">'+bunk(s)+'</div></div>'}).join("")+'</div>':'')
 +'<div class="card"><h3 style="font-size:1.1rem;margin-bottom:6px">Notices</h3>'+NOTICES.map(function(x){return '<div class="slot"><div style="flex:1">'+esc(x.t)+'</div><div class="mute">'+esc(x.d)+'</div></div>'}).join("")+'</div><p class="mute">Subjects follow Anna University Regulations 2025, Semester 1'+(CHECK[st.user.stream]?' (only partly verified for this branch, so check your department’s curriculum)':'')+'. Attendance, marks and timetable are sample data.</p>'}
function att(){var o=totals();
 return head("Attendance","Minimum required: "+MIN_ATT+"%")
 +'<div class="card"><div class="mute">Overall</div><div class="big" style="color:'+col(o)+'">'+o.toFixed(1)+'%</div></div>'
 +SUBJECTS.map(function(s){var p=pct(s.att[0],s.att[1]);return '<div class="card"><div class="row"><div><b>'+s.name+'</b><div class="mute">'+cap(s)+'</div></div><span class="pill '+cls(p)+'">'+p.toFixed(1)+'%</span></div><div class="bar" role="img" aria-label="'+p.toFixed(0)+' percent attendance"><i style="width:'+p+'%;background:'+col(p)+'"></i><b style="left:'+MIN_ATT+'%"></b></div><div class="mute">'+s.att[0]+' of '+s.att[1]+' classes attended</div><div style="margin-top:6px;font-size:.92rem">'+bunk(s)+'</div></div>'}).join("")}
function marks(){var ex=Object.keys(SUBJECTS[0].marks),M=SUBJECTS.filter(function(s){return s.marks});
 return head("Exam marks")+'<div class="tabs">'+ex.map(function(e){return '<button data-e="'+e+'" aria-pressed="'+(st.exam===e)+'">'+e+'</button>'}).join("")+'</div>'
 +M.map(function(s){var m=s.marks[st.exam],p=pct(m[0],m[1]);return '<div class="card"><div class="row"><div><b>'+s.name+'</b><div class="mute">'+cap(s)+(s.ca?" · Internal "+s.ca+"% · End sem "+(100-s.ca)+"%":"")+'</div></div><div style="text-align:right"><b style="font-size:1.2rem">'+m[0]+'</b><span class="mute"> / '+m[1]+'</span></div></div><div class="bar"><i style="width:'+p+'%;background:var(--brand)"></i></div></div>'}).join("")
 +'<div class="card"><h3 style="font-size:1.1rem;margin-bottom:6px">All exams combined</h3>'+M.map(function(s){var p=examTotal(s);return '<div class="slot"><div style="flex:1">'+s.name+'</div><div><b>'+p.toFixed(0)+'%</b> <span class="pill '+(p>=75?"ok":p>=50?"warn":"bad")+'">'+(p>=75?"Strong":p>=50?"Fair":"Needs work")+'</span></div></div>'}).join("")+'</div>'}
function tt(){var days=Object.keys(TT),n=nowInfo(),today=DAYS[new Date().getDay()];
 return head("Timetable")+'<div class="tabs">'+days.map(function(d){return '<button data-d="'+d+'" aria-pressed="'+(st.day===d)+'">'+d+(d===today?" (today)":"")+'</button>'}).join("")+'</div><div class="card">'
 +TT[st.day].map(function(id,i){if(!id)return '';var live=n&&n.on&&n.i===i&&st.day===today;return '<div class="slot'+(live?' now':'')+'"><div class="t">'+PERIODS[i]+'</div><div style="flex:1"><b>'+sub(id).name+'</b><div class="mute">'+sub(id).code+(live?' · Happening now':'')+'</div></div></div>'}).join("")+'</div>'}
function map(){var p=st.place;
 return head("Campus map","Tap a building for details")
 +'<div class="card scroll"><svg class="map" viewBox="0 0 700 440" width="100%" role="group" aria-label="Campus map"><rect width="700" height="440" rx="14" fill="#eef3e6"/><path d="M50 150h620M50 270h620M230 140v250M470 140v250M350 360v25" stroke="#cfd6c0" stroke-width="10" fill="none"/>'
 +PLACES.map(function(b,i){return '<g class="b'+(p===i?' sel':'')+'" data-p="'+i+'" tabindex="0" role="button" aria-label="'+b.n+'"><rect x="'+b.x+'" y="'+b.y+'" width="'+b.w+'" height="'+b.h+'" fill="'+b.c+'"/><text x="'+(b.x+b.w/2)+'" y="'+(b.y+b.h/2+4)+'" text-anchor="middle">'+b.n+'</text></g>'}).join("")+'</svg></div>'
 +'<label class="mute" for="ps">Find a place</label><select id="ps"><option value="">Choose a place</option>'+PLACES.map(function(b,i){return '<option value="'+i+'"'+(p===i?' selected':'')+'>'+b.n+'</option>'}).join("")+'</select>'
 +(p!==null?'<div class="card"><h3>'+PLACES[p].n+'</h3><p style="margin:6px 0 0">'+PLACES[p].d+'</p></div>':'')}
function bind(){var o=$("#out");if(o)o.onclick=function(){st.user=null;try{localStorage.removeItem("cp_user")}catch(x){}render()};
 document.querySelectorAll("[data-e]").forEach(function(b){b.onclick=function(){st.exam=b.dataset.e;render()}});
 document.querySelectorAll("[data-d]").forEach(function(b){b.onclick=function(){st.day=b.dataset.d;render()}});
 document.querySelectorAll("[data-p]").forEach(function(g){var f=function(){st.place=+g.dataset.p;render()};g.onclick=f;g.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();f()}}});
 var ps=$("#ps");if(ps)ps.onchange=function(){st.place=ps.value===""?null:+ps.value;render()}}
try{var u=localStorage.getItem("cp_user");if(u){st.user=JSON.parse(u);if(!STREAM_LIST[st.user.stream])st.user.stream="civil"}}catch(x){}
render();
