(function(_){for(var r in _){_[r].__farm_resource_pot__='index_2765.js';(globalThis || window || global)['2456aff43c84a4c45a870ae04198076a'].__farm_module_system__.register(r,_[r])}})({"8336e77e":function e(e,t,n,l){e._m(t);let d=document.getElementById("canvas"),i=document.getElementById("start-btn"),r=document.getElementById("stop-btn"),o=document.getElementById("erase-btn"),c=document.getElementById("paint-btn"),a=document.getElementById("plus-btn"),s=document.getElementById("minus-btn"),u=document.getElementById("restart-btn"),f=document.getElementById("paint-size");f.innerText=1;let m=d.getContext("2d"),E=!1,y=0,v=!1,b=!1,g=1;function I(){let e=[];for(let t=0;t<100;t++){e[t]=[];for(let n=0;n<100;n++)e[t][n]=0;}return e;}d.width=600,d.height=600;let B=I();function k(){E&&(B=function(e){let t=I();for(let n=0;n<100;n++)for(let l=0;l<100;l++){let d=function(e,t,n){let l=0;for(let d=-1;d<2;d++)for(let i=-1;i<2;i++){let r=(t+i+100)%100;l+=e[(n+d+100)%100][r];}return l-e[n][t];}(e,l,n);1===e[n][l]?d<2||d>3?t[n][l]=0:t[n][l]=1:3===d&&(t[n][l]=1);}return t;}(B),L(),y++,document.getElementById("generation").innerText=y);}function L(){m.fillStyle="#dad7cd",m.fillRect(0,0,100,100),B.forEach((e,t)=>{e.forEach((e,n)=>{1===e&&(m.fillStyle="black",m.fillRect(n,t,1,1));});});}function p(e){if(!v)return;let t=Math.floor(e.offsetX/6),n=Math.floor(e.offsetY/6);for(let e=0;e<g;e++)for(let l=0;l<g;l++){let d=(t+l+100)%100;B[(n+e+100)%100][d]=b?0:1;}L();}m.scale(6,6),i.addEventListener("click",()=>{i.style.display="none",r.style.display="block",u.setAttribute("disabled","true"),E=!0,setInterval(k,42);}),r.addEventListener("click",()=>{i.style.display="block",r.style.display="none",u.removeAttribute("disabled","false"),E=!1;}),d.addEventListener("mousedown",e=>{E||(v=!0),p(e);}),d.addEventListener("mouseup",()=>{v=!1;}),d.addEventListener("mousemove",p),o.addEventListener("click",()=>{b=!0,o.setAttribute("activated","true"),c.removeAttribute("activated","false");}),c.addEventListener("click",()=>{b=!1,o.removeAttribute("activated","false"),c.setAttribute("activated","true");}),a.addEventListener("click",()=>{g<4&&g++,f.innerText=g;}),s.addEventListener("click",()=>{g>1&&g--,f.innerText=g;}),u.addEventListener("click",()=>{E||(B=I(),y=0,L(),document.getElementById("generation").innerText=y);}),L();},});
//# sourceMappingURL=index_2765.eeea7788.js.map