"use strict";var precacheConfig=[["/index.html","8529a0faabdd140ed930366713631a5e"],["/static/css/main.0c2b4dcc.css","a68a125225e7409317cc212947dde109"],["/static/js/main.f089e1c9.js","47c26de0fb3312bde9f56b9f489fb566"],["/static/media/Gotham-Medium.e19c20e9.otf","e19c20e966bde501f94e41cd0322dbe8"],["/static/media/ScalaSans-Bold.e842ce41.otf","e842ce4125597cd966c7f889e239c0d8"],["/static/media/ScalaSans-Italic.7598ad28.otf","7598ad280971c1fe26b455da8cfc7fda"],["/static/media/ScalaSans-Regular.f6cf2e5b.otf","f6cf2e5b3c6ab4bf0f77dcf57ea76469"],["/static/media/ScalaSans.e189025f.otf","e189025f815ac0d2b724d4f27e2d5823"],["/static/media/btn-delete.7330fad2.png","7330fad291a404de187008745293d444"],["/static/media/btn-home.7217a1d6.png","7217a1d6f8a3c7198ee5de87139b8db3"],["/static/media/btn-record.a0c43b91.png","a0c43b917980e8c55f9f12b16ac57145"],["/static/media/btn-save.b458de08.png","b458de086d6ac7233d0284a164ee7a7a"],["/static/media/chime-re.a55c0bed.mp3","a55c0beda49428ccbf82a60e2ae528f5"],["/static/media/icon-stop.aed18c03.png","aed18c0306fe5e697d94a1d234895627"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});