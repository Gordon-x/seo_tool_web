(function(window){var svgSprite='<svg><symbol id="icon-bofang" viewBox="0 0 1024 1024"><path d="M500.864 952.64c-239.648 0-434.656-194.976-434.656-434.624 0-239.68 195.008-434.624 434.656-434.624 239.68 0 434.656 194.944 434.656 434.624 0 239.68-195.008 434.624-434.656 434.624m0-933.28C225.92 19.36 2.24 243.104 2.24 518.016 2.24 792.96 225.92 1016.64 500.864 1016.64s498.656-223.68 498.656-498.624c0-274.912-223.68-498.624-498.656-498.624"  ></path><path d="M404.864 326.016a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0v-320a32 32 0 0 0-32-32M596.864 326.016a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0v-320a32 32 0 0 0-32-32"  ></path></symbol><symbol id="icon-bofang1" viewBox="0 0 1024 1024"><path d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z"  ></path></symbol><symbol id="icon-bofang2" viewBox="0 0 1024 1024"><path d="M540.032 70.976c-245.952 0-446.016 200.064-446.016 446.016S294.08 963.008 540.032 963.008s446.016-200.064 446.016-446.016S785.984 70.976 540.032 70.976z m0 828.032c-210.624 0-382.016-171.392-382.016-382.016s171.392-382.016 382.016-382.016 382.016 171.392 382.016 382.016-171.392 382.016-382.016 382.016z"  ></path><path d="M417.152 643.84c0 35.2 24.96 49.6 55.424 32L692.16 549.056c30.528-17.6 30.528-46.4 0-64L472.576 358.208c-30.528-17.6-55.424-3.2-55.424 32V643.84z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)