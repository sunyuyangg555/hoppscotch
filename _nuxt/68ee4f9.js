(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1029:function(e,o,n){"use strict";n.r(o);n(24),n(36),n(60),n(57),n(59),n(61),n(70),n(213);var t=n(378),r={mixins:[n(394).a],props:{response:{}},data:function(){return{expandResponse:!1,jsonInvalid:!1,responseBodyMaxLines:16,doneButton:'<i class="material-icons">done</i>',downloadButton:'<i class="material-icons">save_alt</i>',copyButton:'<i class="material-icons">content_copy</i>'}},computed:{jsonBodyText:function(){try{return this.jsonInvalid=!1,JSON.stringify(JSON.parse(this.responseBodyText),null,2)}catch(e){return this.jsonInvalid=!0,this.responseBodyText}},responseType:function(){return(this.response.headers["content-type"]||"").split(";")[0].toLowerCase()},canDownloadResponse:function(){return this.response&&this.response.headers&&this.response.headers["content-type"]&&Object(t.a)(this.response.headers["content-type"])}},methods:{ToggleExpandResponse:function(){this.expandResponse=!this.expandResponse,this.responseBodyMaxLines=this.responseBodyMaxLines==1/0?16:1/0},downloadResponse:function(){var e=this,o=this.responseBodyText,n=new Blob([o],{type:this.responseType}),a=document.createElement("a"),t=URL.createObjectURL(n);a.href=t,a.download="response on ".concat(Date()).replace(/\./g,"[dot]"),document.body.appendChild(a),a.click(),this.$refs.downloadResponse.innerHTML=this.doneButton,this.$toast.success(this.$t("download_started"),{icon:"done"}),setTimeout((function(){document.body.removeChild(a),window.URL.revokeObjectURL(t),e.$refs.downloadResponse.innerHTML=e.downloadButton}),1e3)},copyResponse:function(){var e=this;this.$refs.copyResponse.innerHTML=this.doneButton,this.$toast.success(this.$t("copied_to_clipboard"),{icon:"done"});var o=document.createElement("textarea"),n=this.responseBodyText;o.innerText=n,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),setTimeout((function(){return e.$refs.copyResponse.innerHTML=e.copyButton}),1e3)}}},d=n(13),component=Object(d.a)(r,(function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",[n("div",{staticClass:"row-wrapper"},[n("label",{attrs:{for:"body"}},[e._v(e._s(e.$t("response")))]),e._v(" "),n("div",[e.response.body?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{content:e.expandResponse?e.$t("collapse_response"):e.$t("expand_response")},expression:"{\n          content: !expandResponse ? $t('expand_response') : $t('collapse_response'),\n        }"}],ref:"ToggleExpandResponse",staticClass:"icon",on:{click:e.ToggleExpandResponse}},[n("i",{staticClass:"material-icons"},[e._v("\n          "+e._s(e.expandResponse?"unfold_less":"unfold_more")+"\n        ")])]):e._e(),e._v(" "),e.response.body&&e.canDownloadResponse?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.$t("download_file"),expression:"$t('download_file')"}],ref:"downloadResponse",staticClass:"icon",on:{click:e.downloadResponse}},[n("i",{staticClass:"material-icons"},[e._v("save_alt")])]):e._e(),e._v(" "),e.response.body?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.$t("copy_response"),expression:"$t('copy_response')"}],ref:"copyResponse",staticClass:"icon",on:{click:e.copyResponse}},[n("i",{staticClass:"material-icons"},[e._v("content_copy")])]):e._e()])]),e._v(" "),e.jsonInvalid?n("div",{staticClass:"valid-warning"},[e._m(0)]):e._e(),e._v(" "),n("div",{attrs:{id:"response-details-wrapper"}},[n("ace-editor",{attrs:{value:e.jsonBodyText,lang:"json",options:{maxLines:e.responseBodyMaxLines,minLines:"16",fontSize:"16px",autoScrollEditorIntoView:!0,readOnly:!0,showPrintMargin:!1,useWorker:!1},styles:"rounded-b-lg"}})],1)])}),[function(){var e=this.$createElement,o=this._self._c||e;return o("p",{staticClass:"info"},[o("i",{staticClass:"material-icons"},[this._v("error_outline")]),this._v(" Invalid JSON")])}],!1,null,null,null);o.default=component.exports;installComponents(component,{AceEditor:n(387).default})},394:function(e,o,n){"use strict";n(36),n(57);o.a={props:{response:{}},computed:{responseBodyText:function(){return"string"==typeof this.response.body?this.response.body:new TextDecoder("utf-8").decode(this.response.body).replace(/\0+$/,"")}}}}}]);