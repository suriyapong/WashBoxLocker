(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["eaea4302"],{"00b4":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{staticClass:"bgimg-dropoff-2"},[e("div",{staticClass:"flex flex-center"},[e("div",{staticClass:"q-pa-md",staticStyle:{"padding-top":"400px"}},[e("div",{staticClass:"row"},[e("table",{attrs:{align:"center"}},[e("tbody",[e("tr",[e("td",{attrs:{align:"center"}},[e("img",{attrs:{alt:"Quasar logo",src:n("af50")},on:{click:function(a){return t.choose(1)}}})]),e("td",{attrs:{align:"center"}},[e("img",{attrs:{alt:"Quasar logo",src:n("af46")},on:{click:function(a){return t.choose(2)}}})])])])])])])])])},r=[],o=n("967e"),s=n.n(o),c=(n("96cf"),n("fa84")),i=n.n(c),u=n("4578"),l={data:function(){return{service:"locker"}},mounted:function(){this.startInterval()},methods:{choose:function(){var t=i()(s.a.mark(function t(a){var n=this;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:1==a?u["a"].service("wash-box-service").patch("CheckAvilable",{}).then(function(t){console.log(t[0].Status),t[0].Status?n.$router.push({path:"/dropoffconfirm"}):n.$router.push({path:"/lockernotavailable"})}):this.$router.push({path:"/pickupcode"});case 1:case"end":return t.stop()}},t,this)}));function a(a){return t.apply(this,arguments)}return a}(),startInterval:function(){var t=this,a=setInterval(function(){clearInterval(a),t.gotoMain()},3e4)},gotoMain:function(){this.$router.push({path:"/"})}}},f=l,p=(n("ee33"),n("2877")),h=Object(p["a"])(f,e,r,!1,null,"275aba53",null);a["default"]=h.exports},af46:function(t,a,n){t.exports=n.p+"img/02-Drop-Off-btn2.f3a835a6.png"},af50:function(t,a,n){t.exports=n.p+"img/02-Drop-Off-btn1.732271e0.png"},c679:function(t,a,n){},ee33:function(t,a,n){"use strict";var e=n("c679"),r=n.n(e);r.a}}]);