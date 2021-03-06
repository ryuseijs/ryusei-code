function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),_setPrototypeOf(t.prototype.constructor=t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var LINE_BREAK="\n",CATEGORY_TEXT="text",CATEGORY_LINEBREAK="lb";function isUndefined(t){return void 0===t}function forOwn(t,e){if(t)for(var i=Object.keys(t),r=0;r<i.length;r++)e(t[i[r]],i[r])}function assert(t,e){if(void 0===e&&(e=""),!t)throw new Error(e)}function startsWith(t,e){return t.charAt(0)===e}var isStickySupported=!isUndefined(/x/.sticky),Lexer$1=function(){function t(t){this.language=t,this.init(t)}var e=t.prototype;return e.init=function(i){var r=this;forOwn(i.grammar,function(t,e){i.grammar[e]=r.merge(i,t)}),forOwn(i.use,this.init.bind(this))},e.merge=function(e,t){for(var r=[],i=0;i<t.length;i++){var n=t[i],s=t[i],a=s[0],o=s[1];startsWith(a,"#")&&!o?r.push.apply(r,this.merge(e,e.grammar[a.slice(1)])):function(){var t=o.toString().match(/[gimsy]*$/)[0].replace(/[gy]/g,""),i=o.source+(isStickySupported?"":"|()");forOwn(e.source,function(t,e){i=i.replace(new RegExp("%"+e,"g"),t.source)}),n[1]=new RegExp(i,(isStickySupported?"y":"g")+t),r.push(n)}()}return r},e.parse=function(t,e,i,r){var n=0,s=0;this.depth++;t:for(;n<t.length&&!this.aborted;){for(var a=0;a<i.length;a++){var o=i[a],h=o[1],u=o[2];h.lastIndex=n;h=h.exec(t);if(h&&h[0]){if(s<n&&this.push([CATEGORY_TEXT,t.slice(s,n)],e,r),"@back"===u){s=n;break t}s=n+=this.handle(h,e,o,r)||1;if("@break"===u)break t;continue t}}n++}return s<n&&this.push([CATEGORY_TEXT,t.slice(s)],e,r),this.depth--,n},e.push=function(t,e,i){for(var r=this.depth,n=t[0],s=t[1],a=this.index,o=0,h=0;-1<o&&!this.aborted;){var o=s.indexOf(LINE_BREAK,h),u=this.lines[this.index],c=h===o&&!u.length,p=c?LINE_BREAK:s.slice(h,o<0?void 0:o),l={depth:r,language:e.id,state:i};p&&(n!==CATEGORY_TEXT&&(l.head=-1<o&&!h,l.tail=o<0&&!!h,l.split=-1<o||!!h,l.distance=this.index-a),u.push([n===CATEGORY_TEXT&&c?CATEGORY_LINEBREAK:n,p,l])),-1<o&&(this.index++,this.aborted=this.limit&&this.index>=this.limit,this.aborted||(h=o+1,this.lines[this.index]=[]))}},e.handle=function(t,e,i,r){var n=i[0];if(!n)return 0;var s=t[0];if("@debug"===i[3]&&console.log(s,i),startsWith(n,"@")){assert(e.use);var a=e.use[n.slice(1)];return assert(a),this.parse(s,a,a.grammar.main,n)}if(startsWith(n,"#")){a=e.grammar[n.slice(1)];return assert(a),"@rest"===i[2]&&(s=t.input.slice(t.index)),this.parse(s,e,a,n)}return this.push([n,s],e,r),s.length},e.tokenize=function(t,e){return this.lines=[[]],this.index=0,this.depth=-1,this.limit=e||0,this.aborted=!1,this.parse(t,this.language,this.language.grammar.main,"#main"),this.lines},t}(),PROJECT_CODE="ryuseicode",PROJECT_CODE_SHORT="rc",CLASS_TOKEN=PROJECT_CODE+"__token",Lexer=function(t){function e(){return t.apply(this,arguments)||this}return _inheritsLoose(e,t),e.prototype.run=function(t,e){for(var i=this.tokenize(t,e),r=0;r<i.length;r++)for(var n=i[r],s=0,a=0;a<n.length;a++){var o=n[a],h=o[1].length,u=o[2],c=CLASS_TOKEN+" "+PROJECT_CODE_SHORT+"__"+o[0].split(".")[0],p=o[1].replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");o[2]={category:o[0],code:o[1],html:'<code class="'+c+'">'+p+"</code>",from:s,to:s+h,index:a,state:u.state,depth:u.depth,head:u.head,tail:u.tail,distance:u.distance,language:u.language,split:u.split},s+=h}return i},e}(Lexer$1);export{Lexer};
