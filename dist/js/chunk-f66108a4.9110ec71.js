(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f66108a4","chunk-2e122d24"],{"1f9b":function(t,e,r){},2731:function(t,e,r){"use strict";var i=r("1f9b"),l=r.n(i);l.a},"4cdf":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.attributeList,border:"",height:t.showBtn?"500":""},on:{"selection-change":t.handleSelectionChange}},[t.showBtn?r("el-table-column",{attrs:{type:"selection",width:"55"}}):t._e(),r("el-table-column",{attrs:{prop:"attn","min-width":t.minWidth,label:"Name"}}),r("el-table-column",{attrs:{prop:"attt","min-width":t.minWidth,label:"Type"}}),r("el-table-column",{attrs:{prop:"deci","min-width":t.minWidth,label:"D"}}),r("el-table-column",{attrs:{label:"Key: Address","min-width":"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",[t._l(e.row.aadd,(function(e){return r("div",{key:t.getFullName(e.pref,e.suff),staticClass:"addrs"},[t._v("\n          "+t._s(t.getFullName(e.pref,e.suff))+":\n           \n          "+t._s(e.addr)+"\n        ")])})),e.row.aadd.length?t._e():r("span",[t._v("-")])],2)]}}])}),r("el-table-column",{attrs:{prop:"adis","min-width":t.minWidth,label:"T"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(e.row.adis?"YES":"NO")+"\n    ")]}}])}),r("el-table-column",{attrs:{prop:"achg","min-width":t.minWidth,label:"C"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(e.row.achg?"YES":"NO")+"\n    ")]}}])}),r("el-table-column",{attrs:{prop:"attr","min-width":t.minWidth,label:"RW"}}),r("el-table-column",{attrs:{prop:"rtim","min-width":t.minWidth,label:"Rtime"}}),t.showBtn?r("el-table-column",{attrs:{label:"Address","min-width":t.minWidth},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text"},on:{click:function(r){return t.addAddress(e.row)}}},[t._v("Address")])]}}],null,!1,667500208)}):t._e()],1)},l=[],a={props:{value:{type:Array},showBtn:{type:Boolean,default:!1},attributeList:{type:Array,required:!0},objectName:{type:String,required:!0}},data:function(){return{minWidth:"40",multipleSelection:[]}},methods:{addAddress:function(t){this.$emit("add",t)},handleSelectionChange:function(t){this.multipleSelection=t,this.$emit("input",this.multipleSelection)},getFullName:function(t,e){return"".concat(t,"_").concat(this.objectName,"_").concat(e)}},watch:{value:function(t){this.multipleSelection=t}}},n=a,u=(r("a154"),r("2877")),o=Object(u["a"])(n,i,l,!1,null,"8f2f006a",null);e["default"]=o.exports},"8fa8":function(t,e,r){},a154:function(t,e,r){"use strict";var i=r("8fa8"),l=r.n(i);l.a},bad5:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Container",{attrs:{type:"card-full",scorll:!1}},[r("div",{staticClass:"row"},[r("div",{staticClass:"dd-title"},[t._v("Attribute")]),r("el-button",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("Back")]),r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogTableVisible=!0}}},[t._v("Create")]),r("el-button",{attrs:{type:"danger"},on:{click:t.handleDelete}},[t._v("Delete")]),r("el-button",{attrs:{type:"primary",disabled:!t.canSubmit},on:{click:t.handleSubmit}},[t._v("Submit")])],1),r("div",[r("AttrbuteTable",{attrs:{attributeList:t.attributeList,showBtn:!0,objectName:t.objn},on:{add:t.addAddress},model:{value:t.multipleSelection,callback:function(e){t.multipleSelection=e},expression:"multipleSelection"}})],1),r("el-dialog",{attrs:{title:"Data Attribute Setup",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e},closed:t.close}},[r("el-form",{ref:"AttributeSetupFrom",attrs:{model:t.AttributeSetupFrom,rules:t.AttributeSetupFromRules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"Attribute name",prop:"attn"}},[r("el-input",{model:{value:t.AttributeSetupFrom.attn,callback:function(e){t.$set(t.AttributeSetupFrom,"attn",e)},expression:"AttributeSetupFrom.attn"}})],1),r("el-form-item",{attrs:{label:"Attribute type",prop:"attn"}},[r("el-select",{model:{value:t.AttributeSetupFrom.attt,callback:function(e){t.$set(t.AttributeSetupFrom,"attt",e)},expression:"AttributeSetupFrom.attt"}},t._l(t.AttributeTypeList,(function(t){return r("el-option",{key:t.val,attrs:{label:t.val,value:t.val}})})),1)],1),t.showDecimal?r("el-form-item",{attrs:{label:"Decimal",prop:"deci"}},[r("el-input-number",{attrs:{controls:!1,precision:0,min:0},model:{value:t.AttributeSetupFrom.deci,callback:function(e){t.$set(t.AttributeSetupFrom,"deci",e)},expression:"AttributeSetupFrom.deci"}})],1):t._e(),r("el-form-item",{attrs:{label:"Display",prop:"adis"}},[r("el-radio-group",{model:{value:t.AttributeSetupFrom.adis,callback:function(e){t.$set(t.AttributeSetupFrom,"adis",e)},expression:"AttributeSetupFrom.adis"}},[r("el-radio",{attrs:{label:1}},[t._v("Yes")]),r("el-radio",{attrs:{label:0}},[t._v("No")])],1)],1),r("el-form-item",{attrs:{label:"Change",prop:"achg"}},[r("el-radio-group",{model:{value:t.AttributeSetupFrom.achg,callback:function(e){t.$set(t.AttributeSetupFrom,"achg",e)},expression:"AttributeSetupFrom.achg"}},[r("el-radio",{attrs:{label:1}},[t._v("Yes")]),r("el-radio",{attrs:{label:0}},[t._v("No")])],1)],1),r("el-form-item",{attrs:{label:"Direction",prop:"attr"}},[r("el-radio-group",{model:{value:t.AttributeSetupFrom.attr,callback:function(e){t.$set(t.AttributeSetupFrom,"attr",e)},expression:"AttributeSetupFrom.attr"}},[r("el-radio",{attrs:{label:"R"}},[t._v("R")]),r("el-radio",{attrs:{label:"W"}},[t._v("W")]),r("el-radio",{attrs:{label:"R/W"}},[t._v("R/W")])],1)],1),t.showReadTime?r("el-form-item",{attrs:{label:"Read time",prop:"rtim"}},[r("el-input-number",{attrs:{controls:!1,precision:0,min:0},model:{value:t.AttributeSetupFrom.rtim,callback:function(e){t.$set(t.AttributeSetupFrom,"rtim",e)},expression:"AttributeSetupFrom.rtim"}})],1):t._e()],1),r("el-button",{on:{click:t.submitAttributeSetupFrom}},[t._v("submit")])],1),r("el-dialog",{attrs:{title:"Data Address Setup",visible:t.addressVisible},on:{"update:visible":function(e){t.addressVisible=e}}},[r("el-table",{staticClass:"dd-mb",attrs:{data:t.preAndSuff,border:""}},[r("el-table-column",{attrs:{label:"Index",width:t.minWidth},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.obix+1)+"\n        ")]}}])}),r("el-table-column",{attrs:{prop:"pref",width:t.minWidth,label:"Prefix"}}),r("el-table-column",{attrs:{label:"Suffix",width:t.minWidth,prop:"suff"}}),r("el-table-column",{attrs:{label:"Address"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{model:{value:e.row.addr,callback:function(r){t.$set(e.row,"addr",r)},expression:"scope.row.addr"}})]}}])})],1),r("el-button",{attrs:{type:"primary"},on:{click:t.addressSubmit}},[t._v("submit")])],1)],1)},l=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("75fc")),n=(r("6762"),r("2fdb"),r("bd86")),u=r("ed08"),o=r("f121"),s=r("4cdf"),c=r("2f62");function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(r,!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var m={data:function(){return{minWidth:80,objn:"",preAndSuff:[],dialogTableVisible:!1,attributeList:[],AttributeSetupFrom:{aadd:[]},AttributeSetupFromRules:{attn:[{required:!0,message:"pleace input Name",trigger:"blur"},{max:30,message:"max 30",trigger:"blur"}],attt:[{required:!0,message:"pleace select Type",trigger:"blur"}],deci:[{required:!0,message:"pleace input Decimal",trigger:"blur"}],adis:[{required:!0,message:"pleace select Display",trigger:"blur"}],achg:[{required:!0,message:"pleace select Change",trigger:"blur"}],attr:[{required:!0,message:"pleace select Direction",trigger:"blur"}],rtim:[{required:!0,message:"pleact input Time",trigger:"blur"}]},AttributeTypeList:o["a"],addressVisible:!1,activeAttributeRow:{},multipleSelection:[]}},methods:b({close:function(){},getFullName:function(t,e){return"".concat(t,"_").concat(this.objn,"_").concat(e)},submitAttributeSetupFrom:function(){var t=this;this.$refs.AttributeSetupFrom.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.attributeList.push(Object(u["a"])(t.AttributeSetupFrom)),t.dialogTableVisible=!1,t.AttributeSetupFrom={}}))},handleSubmit:function(){this.setObjectAttribute({name:this.objn,attributeList:this.attributeList}),this.$router.push({name:"Setup-objectAndDriver"})},addAddress:function(t){this.activeAttributeRow=t,t.aadd.length&&(this.preAndSuff=t.aadd),this.addressVisible=!0},addressSubmit:function(){this.addressVisible=!1,this.$set(this.activeAttributeRow,"aadd",Object(u["a"])(this.preAndSuff)),this.resetPreAndSuff()},resetPreAndSuff:function(){this.preAndSuff=this.preAndSuff.map((function(t){return t.addr="",t}))},handleDelete:function(){var t=this;this.multipleSelection.length&&this.$confirm("Are you sure delete these attribute?","delete attribute",{confirmButtonText:"yes",cancelButtonText:"no",type:"warning"}).then((function(){var e=t.multipleSelection.map((function(t){return t.attn}));t.attributeList=t.attributeList.filter((function(t){return!e.includes(t.attn)})),t.setObjectAttribute({name:t.objn,attributeList:t.attributeList})})).catch((function(){}))},init:function(){var t=this,e=this.$route.params.data;e&&(this.objn=e,this.objectData.some((function(r){if(r.objn===e)return t.preAndSuff=r.preAndSuff?Object(a["a"])(r.preAndSuff):[],r.oatt&&(t.attributeList=r.oatt),!1})))}},Object(c["c"])(["setObjectAttribute"])),computed:b({showDecimal:function(){return this.AttributeSetupFrom.attt&&-1!==this.AttributeSetupFrom.attt.indexOf("word")},showReadTime:function(){return this.AttributeSetupFrom.attr&&"W"!==this.AttributeSetupFrom.attr},canSubmit:function(){return this.attributeList.length&&this.attributeList.every((function(t){return t.aadd.length}))}},Object(c["d"])({objectData:function(t){return t.SetUpData.objectData}})),watch:{"AttributeSetupFrom.attt":function(t){this.AttributeSetupFrom.deci=0}},beforeMount:function(){this.init()},beforeRouteEnter:function(t,e,r){t.params.data?r():r({name:"index"})},components:{AttrbuteTable:s["default"]}},p=m,f=(r("2731"),r("2877")),h=Object(f["a"])(p,i,l,!1,null,"e9b85666",null);e["default"]=h.exports},f121:function(t,e,r){"use strict";r.d(e,"b",(function(){return i})),r.d(e,"f",(function(){return l})),r.d(e,"a",(function(){return a})),r.d(e,"d",(function(){return n})),r.d(e,"c",(function(){return u})),r.d(e,"e",(function(){return o})),r.d(e,"g",(function(){return s}));var i=[{val:"mbstcp",label:"Modbus TCP"},{val:"ethip",label:"Allen - Bradley Ethernet / IP"},{val:"mele71",label:"Mitsubishi MC Protocol for MELSEC - Q and E71 module"},{val:"finstc",label:"Omron FINS on TCP"},{val:"s7iso",label:"Siemens Industrial Ethernet ISO for S7 - 300 / 400"},{val:"siefw",label:"Siemens Fetch Write for S7 - 300 / 400 and CP443 module"},{val:"tsxmbt",label:"Schneider Modbus TCP"}],l=[{val:"mbsrtu",label:"Modbus RTU"},{val:"df1hp2",label:"Allen - Bradley DF1 half - duplex for PLC2"},{val:"df1hp5",label:"Allen - Bradley DF1 half - duplex for PLC5"},{val:"fxnpro",label:"Mitsubishi FX0N / FX0S / FX1N / FX1S / FX2"},{val:"fxdpro",label:"Mitsubishi FX 232ADP / 485BD / 232BD Module"},{val:"fx3u3g",label:"Mitsubishi FX2N / FX3U / FX3G / FX3S"},{val:"melc24",label:"Mitsubishi MC Protocol full - duplex for MELSEC - Q and C24 module"},{val:"finshl",label:"Omron FINS on Host Link"},{val:"omrhls",label:"Omron Host Link(single)"},{val:"omrhlm",label:"Omron Host Link(multiple)"},{val:"s539rk",label:"Siemens 3964R / RK512 for S5"},{val:"s739rk",label:"Siemens 3964R / RK512 for S7"},{val:"tsxmbr",label:"Schneider Modbus RTU"},{val:"unite",label:"Schneider Telemecanique UNI - TE"},{val:"comli",label:"ABB SattControl Comli"}],a=[{val:"word"},{val:"uword"},{val:"dword"},{val:"udword"},{val:"float"},{val:"double"},{val:"bit"}],n=[{val:">"},{val:">="},{val:"=="},{val:"<"},{val:"<="},{val:"!="},{val:"&"},{val:"^"},{val:"|"}],u=[{val:"critical"},{val:"alarm"},{val:"warning"},{val:"event"},{val:"view"}],o=[{val:"COMMENT"},{val:"DECLARE"},{val:"INIT"},{val:"DO"},{val:"IF"},{val:"THEN"},{val:"ELSE IF"},{val:"ELSE"},{val:"POS"}],s=[{label:"VIEW(0)",key:0},{label:"OPERATOR(1)",key:1},{label:"FOREMAN(2)",key:2},{label:"MAINENANCE(3)",key:3},{label:"SUPERVISOR(4)",key:4},{label:"ENGINEER(5)",key:5},{label:"DESIGNER(6)",key:6},{label:"MANAGER(7)",key:7}]}}]);
//# sourceMappingURL=chunk-f66108a4.9110ec71.js.map