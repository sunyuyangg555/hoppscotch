(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{336:function(e,o,n){"use strict";n(39);o.a={props:{response:{}},computed:{responseBodyText(){return"string"==typeof this.response.body?this.response.body:new TextDecoder("utf-8").decode(this.response.body).replace(/\0+$/,"")}}}},968:function(e,o,n){"use strict";n.r(o);n(14),n(39),n(41),n(19),n(176);var t={mixins:[n(336).a],props:{response:{}},data:()=>({expandResponse:!1,responseBodyMaxLines:16,doneButton:'<i class="material-icons">done</i>',downloadButton:'<i class="material-icons">save_alt</i>',copyButton:'<i class="material-icons">content_copy</i>'}),computed:{responseType(){return(this.response.headers["content-type"]||"").split(";")[0].toLowerCase()}},methods:{ToggleExpandResponse(){this.expandResponse=!this.expandResponse,this.responseBodyMaxLines=this.responseBodyMaxLines==1/0?16:1/0},downloadResponse(){var e=this.responseBodyText,o=new Blob([e],{type:this.responseType}),a=document.createElement("a"),n=URL.createObjectURL(o);a.href=n,a.download="response on ".concat(Date()).replace(/\./g,"[dot]"),document.body.appendChild(a),a.click(),this.$refs.downloadResponse.innerHTML=this.doneButton,this.$toast.success(this.$t("download_started"),{icon:"done"}),setTimeout(()=>{document.body.removeChild(a),window.URL.revokeObjectURL(n),this.$refs.downloadResponse.innerHTML=this.downloadButton},1e3)},copyResponse(){this.$refs.copyResponse.innerHTML=this.doneButton,this.$toast.success(this.$t("copied_to_clipboard"),{icon:"done"});var e=document.createElement("textarea"),o=this.responseBodyText;e.innerText=o,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),setTimeout(()=>this.$refs.copyResponse.innerHTML=this.copyButton,1e3)}}},r=n(6),component=Object(r.a)(t,(function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",[n("div",{staticClass:"row-wrapper"},[n("label",{attrs:{for:"body"}},[e._v(e._s(e.$t("response")))]),e._v(" "),n("div",[e.response.body?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{content:e.expandResponse?e.$t("collapse_response"):e.$t("expand_response")},expression:"{\n          content: !expandResponse ? $t('expand_response') : $t('collapse_response'),\n        }"}],ref:"ToggleExpandResponse",staticClass:"icon",on:{click:e.ToggleExpandResponse}},[n("i",{staticClass:"material-icons"},[e._v("\n          "+e._s(e.expandResponse?"unfold_less":"unfold_more")+"\n        ")])]):e._e(),e._v(" "),e.response.body?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.$t("download_file"),expression:"$t('download_file')"}],ref:"downloadResponse",staticClass:"icon",on:{click:e.downloadResponse}},[n("i",{staticClass:"material-icons"},[e._v("save_alt")])]):e._e(),e._v(" "),e.response.body?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.$t("copy_response"),expression:"$t('copy_response')"}],ref:"copyResponse",staticClass:"icon",on:{click:e.copyResponse}},[n("i",{staticClass:"material-icons"},[e._v("content_copy")])]):e._e()])]),e._v(" "),n("div",{attrs:{id:"response-details-wrapper"}},[n("ace-editor",{attrs:{value:e.responseBodyText,lang:"xml",options:{maxLines:e.responseBodyMaxLines,minLines:"16",fontSize:"16px",autoScrollEditorIntoView:!0,readOnly:!0,showPrintMargin:!1,useWorker:!1},styles:"rounded-b-lg"}})],1)])}),[],!1,null,null,null);o.default=component.exports;installComponents(component,{AceEditor:n(329).default})}}]);