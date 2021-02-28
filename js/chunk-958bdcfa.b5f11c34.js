(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-958bdcfa"],{6135:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminNav"),r("table",{staticClass:"table"},[t._m(0),r("tbody",t._l(t.users,(function(e){return r("tr",{key:e.id},[r("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),r("td",[t._v(t._s(e.email))]),r("td",[t._v(t._s(e.isAdmin?"Admin":"User"))]),r("td",[e.id!==t.currentUser.id?r("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(r){return r.preventDefault(),r.stopPropagation(),t.toggleUserRole(e.id)}}},[t._v(" set as "+t._s(e.isAdmin?"user":"admin")+" ")]):t._e()])])})),0)])],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",{staticClass:"thead-dark"},[r("tr",[r("th",{attrs:{scope:"col"}},[t._v(" # ")]),r("th",{attrs:{scope:"col"}},[t._v(" Email ")]),r("th",{attrs:{scope:"col"}},[t._v(" Role ")]),r("th",{attrs:{scope:"col",width:"140"}},[t._v(" Action ")])])])}],s=r("1da1"),c=r("5530"),i=(r("d81d"),r("4de4"),r("96cf"),r("2f62")),u=r("be6c"),o=r("2fa3"),d=r("e04c"),l={data:function(){return{users:[]}},components:{AdminNav:d["a"]},computed:Object(c["a"])({},Object(i["b"])(["currentUser"])),methods:{fetchUsers:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u["a"].users.get();case 3:if(r=e.sent,"OK"===r.statusText){e.next=6;break}throw new Error(r.statusText);case 6:t.users=r.data.users,e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](0),o["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"}),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))()},toggleIsAdmin:function(t){this.users=this.users.map((function(e){return e.id===t?Object(c["a"])(Object(c["a"])({},e),{},{isAdmin:!e.isAdmin}):e}))},toggleUserRole:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,a,s,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,n=e.users.filter((function(e){return e.id===t})),console.log("user",n[0]),a={isAdmin:!n[0].isAdmin},console.log("payload",a),r.next=7,u["a"].users.update({userId:t,payLoad:a});case 7:if(s=r.sent,c=s.data,"success"===c.status){r.next=11;break}throw new Error(c.message);case 11:e.toggleIsAdmin(t),r.next=18;break;case 14:r.prev=14,r.t0=r["catch"](0),o["a"].fire({icon:"error",title:"無法切換使用者權限，請稍後再試"}),console.log(r.t0);case 18:case"end":return r.stop()}}),r,null,[[0,14]])})))()}},created:function(){this.fetchUsers()}},f=l,m=r("2877"),p=Object(m["a"])(f,n,a,!1,null,null,null);e["default"]=p.exports},be6c:function(t,e,r){"use strict";r("b0c0");var n=r("2fa3");e["a"]={categories:{get:function(){return n["b"].get("/admin/categories")},create:function(t){var e=t.name;return n["b"].post("/admin/categories",e)},update:function(t){var e=t.categoryId,r=t.name;return n["b"].put("/admin/categories/".concat(e),r)},delete:function(t){var e=t.categoryId;return n["b"].delete("/admin/categories/".concat(e))}},restaurants:{get:function(){return n["b"].get("/admin/restaurants")},getDetail:function(t){var e=t.restaurantId;return n["b"].get("/admin/restaurants/".concat(e))},delete:function(t){var e=t.restaurantId;return n["b"].delete("/admin/restaurants/".concat(e))},create:function(t){var e=t.formData;return n["b"].post("/admin/restaurants",e)},update:function(t){var e=t.restaurantId,r=t.formData;return n["b"].put("/admin/restaurants/".concat(e),r)}},users:{get:function(){return n["b"].get("/admin/users")},update:function(t){var e=t.userId,r=t.payLoad;return n["b"].put("/admin/users/".concat(e),r)}}}},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,s=r("1dde"),c=s("map");n({target:"Array",proto:!0,forced:!c},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},e04c:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("h1",[t._v("餐廳後台")]),r("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/categories"}},[t._v(" Categories")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},a=[],s=r("2877"),c={},i=Object(s["a"])(c,n,a,!1,null,null,null);e["a"]=i.exports}}]);
//# sourceMappingURL=chunk-958bdcfa.b5f11c34.js.map