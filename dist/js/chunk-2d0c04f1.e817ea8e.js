(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c04f1"],{"40dc":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{display:"inline-block"}},[s("el-select",{attrs:{placeholder:""},on:{change:e.handleSelect},model:{value:e.scriptType.subr,callback:function(t){e.$set(e.scriptType,"subr",t)},expression:"scriptType.subr"}},e._l(e.scriptTypeList,(function(e){return s("el-option",{key:e.subr,attrs:{label:e.name,value:e.subr}})})),1),e._v("\n    \n  "),s("el-button",{attrs:{type:"danger"},on:{click:e.handleDelete}},[e._v("delete")]),s("el-button",{attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v("create")]),s("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible},on:{closed:e.handleClose,"update:visible":function(t){e.dialogVisible=t}}},[s("el-form",{ref:"subroutineForm",attrs:{model:e.subroutineForm,rules:e.subroutineFormRules,"label-width":"100px"}},[s("el-form-item",{attrs:{prop:"name",label:"name"}},[s("el-input",{model:{value:e.subroutineForm.name,callback:function(t){e.$set(e.subroutineForm,"name",t)},expression:"subroutineForm.name"}})],1),s("el-form-item",{attrs:{prop:"subr",label:"subr"}},[s("el-input",{model:{value:e.subroutineForm.subr,callback:function(t){e.$set(e.subroutineForm,"subr",t)},expression:"subroutineForm.subr"}})],1)],1),s("template",{slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确 定")])],1)],2)],1)},r=[],n=(s("7f7f"),s("6762"),s("75fc")),u={props:["value"],data:function(){return{scriptType:null,scriptTypeList:[{name:"Main",subr:-10},{name:"Auto",subr:-20},{name:"Manual",subr:-30}],dialogVisible:!1,subroutineForm:{name:"",subr:""},subroutineFormRules:{name:[{required:!0,message:"",trigger:"blur"}],subr:[{required:!0,message:"",trigger:"blur"}]}}},beforeMount:function(){this.init()},methods:{init:function(){this.$ws().set({success:this.setSubroutineList}).send({func:32})},setSubroutineList:function(e){var t;32===e.func&&(this.$ws().remove(this.setSubroutineList),(t=this.scriptTypeList).unshift.apply(t,Object(n["a"])(e.rows)))},handleCreate:function(){this.dialogVisible=!0},handleDelete:function(){var e=this,t=[-10,-20,-30];if(this.scriptType.subr&&!t.includes(this.scriptType.subr)){this.$ws().send({func:35,subr:this.scriptType.subr});var s=this.scriptTypeList.filter((function(s){return t.includes(s.subr)||s.subr!==e.scriptType.subr}));s.length!==this.scriptTypeList.length&&(this.scriptTypeList=s,this.scriptType={name:"",subr:""}),this.$emit("delete")}},handleClose:function(){this.$refs.subroutineForm.resetFields(),this.subroutineForm={name:"",subr:""}},handleSubmit:function(){var e=this;this.$refs.subroutineForm.validate((function(t){if(!t)return!1;var s=e.subroutineForm,i=s.name,r=s.subr;e.scriptTypeList.some((function(e){return e.subr===r}))||(e.scriptTypeList.push({name:i,subr:r}),e.dialogVisible=!1)}))},handleSelect:function(e){if(e){var t=this.scriptTypeList.filter((function(t){return t.subr===e}));this.scriptType={name:t[0].name,subr:t[0].subr},this.$emit("input",this.scriptType)}}},watch:{value:{handler:function(e){this.scriptType=e},immediate:!0}}},l=u,o=s("2877"),a=Object(o["a"])(l,i,r,!1,null,"177a8f34",null);t["default"]=a.exports}}]);
//# sourceMappingURL=chunk-2d0c04f1.e817ea8e.js.map