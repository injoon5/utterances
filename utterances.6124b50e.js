parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var c={};function G(){var e=n(location.search.substr(1)),r=null,i=null;if("issue-term"in e){if(void 0!==(r=e["issue-term"])){if(""===r)throw new Error("When issue-term is specified, it cannot be blank.");if(-1!==["title","url","pathname","og:title"].indexOf(r)){if(!e[r])throw new Error("Unable to find \""+r+"\" metadata.");r=e[r]}}}else{if(!("issue-number"in e))throw new Error("\"issue-term\" or \"issue-number\" must be specified.");if((i=+e["issue-number"]).toString(10)!==e["issue-number"])throw new Error("issue-number is invalid. \""+e["issue-number"])}if(!("repo"in e))throw new Error("\"repo\" is required.");if(!("origin"in e))throw new Error("\"origin\" is required.");var t=ha.exec(e.repo);if(null===t)throw new Error("Invalid repo: \""+e.repo+"\"");return{owner:t[1],repo:t[2],issueTerm:r,issueNumber:i,origin:e.origin,url:e.url,title:e.title,description:e.description,theme:e.theme||"github-light"}}var e={};function n(e){for(var r,o=/\+/g,n=/([^&=]+)=?([^&]*)/g,p=function(e){return decodeURIComponent(e.replace(o," "))},a={};r=n.exec(e);)a[p(r[1])]=p(r[2]);return a}function o(e){var r=[];for(var o in e)e.hasOwnProperty(o)&&r.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return r.join("&")}e.deparam=n,e.param=o;var ha=/^([\w-_]+)\/([\w-_.]+)$/i;var a=G();var l="https://api.utteranc.es";var ga=l+"/authorize",ca=l+"/token",_=location.origin+"/authorized.html",$=function(){function e(){this.storageKey="OAUTH_TOKEN2",this.token=null;try{this.token=localStorage.getItem(this.storageKey)}catch(e){}}return Object.defineProperty(e.prototype,"value",{get:function(){return this.token},set:function(e){this.token=e;try{null===e?localStorage.removeItem(this.storageKey):localStorage.setItem(this.storageKey,e)}catch(t){}},enumerable:!0,configurable:!0}),e}(),h=new $;function Y(){return window.open(ga+"?"+o({redirect_uri:_})),new Promise(function(e){return window.notifyAuthorized=e}).then(function(e){return fetch(ca+e,{mode:"cors"})}).then(function(e){return e.ok?e.json():e.text().then(function(e){return Promise.reject("Error retrieving token:\n"+e)})}).then(function(e){h.value=e},function(e){throw h.value=null,e})}function U(e){return e=e.replace(/\s/g,""),decodeURIComponent(escape(atob(e)))}var d,f,M="https://api.github.com/",s="application/vnd.github.VERSION.html+json",I="application/vnd.github.VERSION.html",k="application/vnd.github.squirrel-girl-preview",C=100,t="master";function A(n){d=n.owner,f=n.repo}function i(n,e){(e=e||{}).mode="cors",e.cache="no-cache";var r=new Request(M+n,e);return r.headers.set("Accept",k),/^search\//.test(n)||null===h.value||r.headers.set("Authorization","token "+h.value),r}var x={standard:{limit:Number.MAX_VALUE,remaining:Number.MAX_VALUE,reset:0},search:{limit:Number.MAX_VALUE,remaining:Number.MAX_VALUE,reset:0}};function T(n){var e=n.headers.get("X-RateLimit-Limit"),r=n.headers.get("X-RateLimit-Remaining"),t=n.headers.get("X-RateLimit-Reset"),$=/\/search\//.test(n.url),o=$?x.search:x.standard;if(o.limit=+e,o.remaining=+r,o.reset=+t,403===n.status&&0===o.remaining){var a=new Date(0);a.setUTCSeconds(o.reset);var s=Math.round((a.getTime()-new Date().getTime())/1e3/60),i=$?"search API":"non-search APIs";console.warn("Rate limit exceeded for "+i+". Resets in "+s+" minute"+(1===s?"":"s")+".")}}function B(n){var e=n.headers.get("link");if(null===e)return 0;var r=/\?page=([2-9][0-9]*)>; rel="next"/.exec(e);return null===r?0:+r[1]}function g(n){return fetch(n).then(function(e){return 401===e.status&&(h.value=null),403===e.status&&e.json().then(function(n){"Resource not accessible by integration"===n.message&&window.dispatchEvent(new CustomEvent("not-installed"))}),T(e),"GET"===n.method&&-1!==[401,403].indexOf(e.status)&&n.headers.has("Authorization")?(n.headers.delete("Authorization"),g(n)):e})}function D(n,e){void 0===e&&(e=!1);var r=i("repos/"+d+"/"+f+"/contents/"+n+"?ref="+t);return e&&r.headers.set("accept",I),g(r).then(function(r){if(404===r.status)throw new Error("Repo \""+d+"/"+f+"\" does not have a file named \""+n+"\" in the \""+t+"\" branch.");if(!r.ok)throw new Error("Error fetching "+n+".");return e?r.text():r.json()}).then(function(n){if(e)return n;var r=n.content,t=U(r);return JSON.parse(t)})}function E(n){var e="\""+n+"\" type:issue in:title repo:"+d+"/"+f;return g(i("search/issues?q="+encodeURIComponent(e)+"&sort=created&order=asc")).then(function(n){if(!n.ok)throw new Error("Error fetching issue via search.");return n.json()}).then(function(n){return 0===n.total_count?null:(n.total_count>1&&console.warn("Multiple issues match \""+e+"\". Using earliest created."),n.items[0])})}function F(n){return g(i("repos/"+d+"/"+f+"/issues/"+n)).then(function(n){if(!n.ok)throw new Error("Error fetching issue via issue number.");return n.json()})}function ka(n,e){var r=i("repos/"+d+"/"+f+"/issues/"+n+"/comments?page="+e+"&per_page="+C),t=s+","+k;return r.headers.set("Accept",t),r}function H(n,e){return g(ka(n,e)).then(function(n){if(!n.ok)throw new Error("Error fetching comments.");var e=B(n);return n.json().then(function(n){return{items:n,nextPage:e}})})}function v(){return null===h.value?Promise.resolve(null):g(i("user")).then(function(n){return n.ok?n.json():null})}function J(n,e,r,t){var $=new Request(l+"/repos/"+d+"/"+f+"/issues",{method:"POST",body:JSON.stringify({title:n,body:"# "+r+"\n\n"+t+"\n\n["+e+"]("+e+")"})});return $.headers.set("Accept",k),$.headers.set("Authorization","token "+h.value),fetch($).then(function(n){if(!n.ok)throw new Error("Error creating comments container issue");return n.json()})}function K(n,e){var r=i("repos/"+d+"/"+f+"/issues/"+n+"/comments",{method:"POST",body:JSON.stringify({body:e})}),t=s+","+k;return r.headers.set("Accept",t),g(r).then(function(n){if(!n.ok)throw new Error("Error posting comment.");return n.json()})}function L(n){return g(i("markdown",{method:"POST",body:JSON.stringify({text:n,mode:"gfm",context:d+"/"+f})})).then(function(n){return n.text()})}var j=[1e3,"second",6e4,"minute",36e5,"hour",864e5,"day",6048e5,"week",23328e5,"month"],N={month:"short",day:"numeric",year:"numeric"};function O(r,e){var $=r-e.getTime();if($<5e3)return"just now";for(var o=0;o+2<j.length&&1.1*$>j[o+2];)o+=2;var t=j[o],a=j[o+1],h=Math.round($/t);return h>3&&o===j.length-2?"on "+e.toLocaleDateString(void 0,N):1===h?("hour"===a?"an":"a")+" "+a+" ago":h+" "+a+"s ago"}var P;function Q(e){P=e,addEventListener("resize",b),addEventListener("load",b)}var R=-1;function S(){var e=document.body.scrollHeight;if(e!==R){R=e;var $={type:"resize",height:e};parent.postMessage($,P)}}var z=0;function b(){var e=Date.now();e-z>50&&(z=e,setTimeout(S,50))}var V="?v=3&s=88",W={COLLABORATOR:"Collaborator",CONTRIBUTOR:"Contributor",MEMBER:"Member",OWNER:"Owner"},X=function(){function e(e,r){this.comment=e,this.currentUser=r;var t=e.user,n=e.html_url,a=e.created_at,o=e.body_html,s=e.author_association;this.element=document.createElement("article"),this.element.classList.add("timeline-comment"),t.login===r&&this.element.classList.add("current-user");var l=W[s];this.element.innerHTML="\n      <a class=\"avatar\" href=\""+t.html_url+"\" target=\"_blank\" tabindex=\"-1\">\n        <img alt=\"@"+t.login+"\" height=\"44\" width=\"44\"\n              src=\""+t.avatar_url+V+"\">\n      </a>\n      <div class=\"comment\">\n        <header class=\"comment-header\">\n          <span class=\"comment-meta\">\n            <a class=\"text-link\" href=\""+t.html_url+"\" target=\"_blank\"><strong>"+t.login+"</strong></a>\n            commented\n            <a class=\"text-link\" href=\""+n+"\" target=\"_blank\">"+O(Date.now(),new Date(a))+"</a>\n          </span>\n          "+(l?"<span class=\"author-association-badge\">"+l+"</span>":"")+"\n        </header>\n        <div class=\"markdown-body markdown-body-scrollable\">\n          "+o+"\n        </div>\n      </div>";var i=this.element.lastElementChild.lastElementChild,c=i.querySelector(".email-hidden-toggle a");if(c){var m=i.querySelector(".email-hidden-reply");c.onclick=function(e){e.preventDefault(),m.classList.toggle("expanded")}}p(i)}return e.prototype.setCurrentUser=function(e){this.currentUser!==e&&(this.currentUser=e,this.comment.user.login===this.currentUser?this.element.classList.add("current-user"):this.element.classList.remove("current-user"))},e}();function p(e){Array.from(e.querySelectorAll(":not(.email-hidden-toggle) > a")).forEach(function(e){e.target="_top",e.rel="noopener noreferrer"}),Array.from(e.querySelectorAll("img")).forEach(function(e){return e.onload=b}),Array.from(e.querySelectorAll("a.commit-tease-sha")).forEach(function(e){return e.href="https://github.com"+e.pathname})}var Z=function(){function e(e,t){this.user=e,this.issue=t,this.timeline=[],this.count=0,this.element=document.createElement("main"),this.element.classList.add("timeline"),this.element.innerHTML="\n      <h1 class=\"timeline-header\">\n        <a class=\"text-link\" target=\"_blank\"></a>\n        <em>\n          - powered by\n          <a class=\"text-link\" href=\"https://utteranc.es\" target=\"_blank\">utteranc.es</a>\n        </em>\n      </h1>",this.countAnchor=this.element.firstElementChild.firstElementChild,this.marker=document.createComment("marker"),this.element.appendChild(this.marker),this.setIssue(this.issue),this.renderCount()}return e.prototype.setUser=function(e){this.user=e;for(var t=e?e.login:null,n=0;n<this.timeline.length;n++)this.timeline[n].setCurrentUser(t);b()},e.prototype.setIssue=function(e){this.issue=e,e?this.countAnchor.href=e.html_url:this.countAnchor.removeAttribute("href")},e.prototype.appendComment=function(e){var t=new X(e,this.user?this.user.login:null);this.timeline.push(t),this.element.insertBefore(t.element,this.marker),this.count++,this.renderCount(),b()},e.prototype.renderCount=function(){this.countAnchor.textContent=this.count+" Comment"+(1===this.count?"":"s")},e}();var r;function w(){return r||(r=D("utterances.json").then(function(r){return Array.isArray(r.origins)||(r.origins=[]),r},function(){return{origins:[a.origin]}})),r}var aa="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\" version=\"1.1\"><path fill=\"rgb(179,179,179)\" fill-rule=\"evenodd\" d=\"M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z\"></path></svg>",ba="data:image/svg+xml;base64,"+btoa(aa),m="Nothing to preview",da=function(){function t(t,e){var n=this;this.user=t,this.submit=e,this.submitting=!1,this.renderTimeout=0,this.handleInput=function(){w();var t=n.textarea.value,e=/^\s*$/.test(t);n.submitButton.disabled=e,n.textarea.scrollHeight<450&&n.textarea.offsetHeight<n.textarea.scrollHeight&&(n.textarea.style.height=n.textarea.scrollHeight+"px",b()),clearTimeout(n.renderTimeout),e?n.preview.textContent=m:(n.preview.textContent="Loading preview...",n.renderTimeout=setTimeout(function(){return L(t).then(function(t){return n.preview.innerHTML=t}).then(function(){return p(n.preview)}).then(b)},500))},this.handleSubmit=function(t){t.preventDefault(),n.submitting||(n.submitting=!0,n.user&&(n.textarea.disabled=!0,n.submitButton.disabled=!0),n.submit(n.textarea.value).catch(function(){return 0}).then(function(){n.submitting=!1,n.textarea.disabled=!n.user,n.textarea.value="",n.submitButton.disabled=!1,n.handleClick({target:n.form.querySelector(".tabnav-tab.tab-write")}),n.preview.textContent=m}))},this.handleClick=function(t){var e=t.target;if(e instanceof HTMLButtonElement&&e.classList.contains("tabnav-tab")&&!e.classList.contains("selected")){n.form.querySelector(".tabnav-tab.selected").classList.remove("selected"),e.classList.add("selected");var a=e.classList.contains("tab-preview");n.textarea.style.display=a?"none":"",n.preview.style.display=a?"":"none",b()}},this.handleKeyDown=function(t){var e=t.which,a=t.ctrlKey;13===e&&a&&!n.submitButton.disabled&&n.form.dispatchEvent(new CustomEvent("submit"))},this.element=document.createElement("article"),this.element.classList.add("timeline-comment"),this.element.innerHTML="\n      <a class=\"avatar\" target=\"_blank\" tabindex=\"-1\">\n        <img height=\"44\" width=\"44\">\n      </a>\n      <form class=\"comment\" accept-charset=\"UTF-8\" action=\"javascript:\">\n        <header class=\"new-comment-header\">\n          <nav class=\"tabnav-tabs\" role=\"tablist\">\n            <button type=\"button\" class=\"tabnav-tab tab-write selected\"\n                    role=\"tab\" aria-selected=\"true\">\n              Write\n            </button>\n            <button type=\"button\" class=\"tabnav-tab tab-preview\"\n                    role=\"tab\">\n              Preview\n            </button>\n          </nav>\n        </header>\n        <div class=\"comment-body\">\n          <textarea class=\"form-control\" placeholder=\"Leave a comment\" aria-label=\"comment\"></textarea>\n          <div class=\"markdown-body\" style=\"display: none\">\n            "+m+"\n          </div>\n        </div>\n        <footer class=\"comment-footer\">\n          <a class=\"text-link markdown-info\" tabindex=\"-1\" target=\"_blank\"\n             href=\"https://guides.github.com/features/mastering-markdown/\">\n            <svg class=\"octicon v-align-bottom\" viewBox=\"0 0 16 16\" version=\"1.1\"\n              width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15\n                13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4\n                8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z\">\n              </path>\n            </svg>\n            Styling with Markdown is supported\n          </a>\n          <button class=\"btn btn-primary\" type=\"submit\">Comment</button>\n        </footer>\n      </form>",this.avatarAnchor=this.element.firstElementChild,this.avatar=this.avatarAnchor.firstElementChild,this.form=this.avatarAnchor.nextElementSibling,this.textarea=this.form.firstElementChild.nextElementSibling.firstElementChild,this.preview=this.form.firstElementChild.nextElementSibling.lastElementChild,this.submitButton=this.form.lastElementChild.lastElementChild,this.setUser(t),this.textarea.addEventListener("input",this.handleInput),this.form.addEventListener("submit",this.handleSubmit),this.form.addEventListener("click",this.handleClick),this.form.addEventListener("keydown",this.handleKeyDown),ea(this.textarea)}return t.prototype.setUser=function(t){this.user=t,this.submitButton.textContent=t?"Comment":"Sign in to comment",this.submitButton.disabled=!!t,t?(this.avatarAnchor.href=t.html_url,this.avatar.alt="@"+t.login,this.avatar.src=t.avatar_url+"?v=3&s=88"):(this.avatarAnchor.removeAttribute("href"),this.avatar.alt="@anonymous",this.avatar.src=ba,this.textarea.disabled=!0)},t.prototype.clear=function(){this.textarea.value=""},t}();function ea(t){var e=function t(){removeEventListener("mousemove",b),removeEventListener("mouseup",t)};t.addEventListener("mousedown",function(){addEventListener("mousemove",b),addEventListener("mouseup",e)})}function fa(e,t){return new Promise(function(s){var n=document.createElement("link");n.rel="stylesheet",n.setAttribute("crossorigin","anonymous"),n.onload=s,n.href="/stylesheets/themes/"+e+"/utterances.css",document.head.appendChild(n),addEventListener("message",function(e){e.origin===t&&"set-theme"===e.data.type&&(n.href="/stylesheets/themes/"+e.data.theme+"/utterances.css")})})}var u=c&&c.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,s){function i(e){try{a(n.next(e))}catch(t){s(t)}}function u(e){try{a(n.throw(e))}catch(t){s(t)}}function a(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(i,u)}a((n=n.apply(e,t||[])).next())})},y=c&&c.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function u(s){return function(u){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue;}s=t.call(e,i)}catch(u){s=[6,u],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}};function ia(){return null!==a.issueNumber?F(a.issueNumber):E(a.issueTerm)}function ja(e,t){var r=this;Q(a.origin);var n=new Z(t,e);if(document.body.appendChild(n.element),e&&e.comments>0&&H(e.number,1).then(function(e){return e.items.forEach(function(e){return n.appendComment(e)})}),!e||!e.locked){var o=new da(t,function(s){return u(r,void 0,void 0,function(){var r;return y(this,function(i){switch(i.label){case 0:return t?[4,q()]:[3,5];case 1:return i.sent(),e?[3,3]:[4,J(a.issueTerm,a.url,a.title,a.description)];case 2:e=i.sent(),n.setIssue(e),i.label=3;case 3:return[4,K(e.number,s)];case 4:return r=i.sent(),n.appendComment(r),o.clear(),[2];case 5:return[4,Y()];case 6:return i.sent(),[4,v()];case 7:return t=i.sent(),n.setUser(t),o.setUser(t),[2];}})})});n.element.appendChild(o.element),b()}}function q(){return u(this,void 0,void 0,function(){var e,t,r,n;return y(this,function(o){switch(o.label){case 0:return[4,w()];case 1:if(e=o.sent().origins,t=a.origin,r=a.owner,n=a.repo,a.url,-1!==e.indexOf(t))return[2];throw document.querySelector(".timeline").lastElementChild.insertAdjacentHTML("beforebegin","\n  <div class=\"flash flash-error flash-not-installed\">\n    Error: <code>"+t+"</code> is not permitted to post to <code>"+r+"/"+n+"</code>.\n    Confirm this is the correct repo for this site's comments. If you own this repo,\n    <a href=\"https://github.com/"+r+"/"+n+"/edit/master/utterances.json\" target=\"_top\">\n      <strong>update the utterances.json</strong>\n    </a>\n    to include <code>"+t+"</code> in the list of origins.<br/><br/>\n    Suggested configuration:<br/>\n    <pre><code>"+JSON.stringify({origins:[t]},null,2)+"</code></pre>\n  </div>"),b(),new Error("Origin not permitted.");}})})}A(a),Promise.all([ia(),v(),fa(a.theme,a.origin)]).then(function(e){return ja(e[0],e[1])}),addEventListener("not-installed",function e(){removeEventListener("not-installed",e),document.querySelector(".timeline").insertAdjacentHTML("afterbegin","\n  <div class=\"flash flash-error\">\n    Error: utterances is not installed on <code>"+a.owner+"/"+a.repo+"</code>.\n    If you own this repo,\n    <a href=\"https://github.com/apps/utterances\" target=\"_top\"><strong>install the app</strong></a>.\n    Read more about this change in\n    <a href=\"https://github.com/utterance/utterances/pull/25\" target=\"_top\">the PR</a>.\n  </div>"),b()}),c.assertOrigin=q;if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=c}else if(typeof define==="function"&&define.amd){define(function(){return c})}e.__esModule=true;c.__esModule=true;return{"ieWq":e,"fHsu":c};});