(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2357"],{"22ab":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container py-5"},[r("NavTabs"),e.isLoading?r("Spinner"):[r("h1",{staticClass:"mt-5"},[e._v(" 美食達人 ")]),r("hr"),r("div",{staticClass:"row text-center"},e._l(e.users,(function(e){return r("UserCard",{key:e.id,attrs:{"initial-user":e}})})),1)]],2)},s=[],a=r("1da1"),i=(r("96cf"),r("8bb1")),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"col-3"},[r("router-link",{attrs:{to:{name:"user",params:{id:e.user.id}}}},[r("img",{attrs:{src:e._f("emptyImage")(e.user.image),width:"140px",height:"140px"}})]),r("h2",[e._v(e._s(e.user.name))]),r("span",{staticClass:"badge badge-secondary"},[e._v("追蹤人數："+e._s(e.user.Followers.length))]),r("p",{staticClass:"mt-3"},[e.user.isFollowed?r("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.deleteFollow(e.user.id)}}},[e._v(" 取消追蹤 ")]):r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.addFollow(e.user.id)}}},[e._v(" 追蹤 ")])])],1)},c=[],u=r("5530"),l=r("2708"),d=r("4cce"),p=r("2fa3"),b={props:{initialUser:{type:Object}},data:function(){return{user:this.initialUser}},mixins:[l["a"]],methods:{addFollow:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d["a"].addFollowing({userId:e});case 3:if(n=r.sent,s=n.data,"success"===s.status){r.next=7;break}throw new Error(s.status);case 7:t.user=Object(u["a"])(Object(u["a"])({},t.user),{},{isFollowed:!0}),r.next=14;break;case 10:r.prev=10,r.t0=r["catch"](0),p["a"].fire({icon:"error",title:"無法追蹤該使用者，請稍後再試"}),console.log(r.t0);case 14:case"end":return r.stop()}}),r,null,[[0,10]])})))()},deleteFollow:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d["a"].deleteFollowing({userId:e});case 3:if(n=r.sent,s=n.data,"success"===s.status){r.next=7;break}throw new Error(s.status);case 7:t.user=Object(u["a"])(Object(u["a"])({},t.user),{},{isFollowed:!1}),r.next=14;break;case 10:r.prev=10,r.t0=r["catch"](0),p["a"].fire({icon:"error",title:"無法追蹤該使用者，請稍後再試"}),console.log(r.t0);case 14:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}},f=b,w=r("2877"),h=Object(w["a"])(f,o,c,!1,null,null,null),v=h.exports,g=r("2375"),m={data:function(){return{users:[],isLoading:!0}},components:{NavTabs:i["a"],UserCard:v,Spinner:g["a"]},methods:{fetchUsers:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d["a"].getTopUsers();case 3:if(r=t.sent,"OK"===r.statusText){t.next=6;break}throw new Error(r.statusText);case 6:e.isLoading=!1,e.users=r.data.users,t.next=15;break;case 10:t.prev=10,t.t0=t["catch"](0),p["a"].fire({icon:"error",title:"無法取得美食達人清單，請稍後再試"}),e.isLoading=!1,console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,10]])})))()}},created:function(){this.fetchUsers()}},x=m,k=Object(w["a"])(x,n,s,!1,null,null,null);t["default"]=k.exports}}]);
//# sourceMappingURL=chunk-2d0b2357.e9ae98d0.js.map