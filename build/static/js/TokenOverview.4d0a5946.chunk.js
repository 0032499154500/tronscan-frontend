webpackJsonp([20],{2264:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(r,l){try{var o=t[r](l),i=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(i).then(function(e){a("next",e)},function(e){a("throw",e)});e(i)}return a("next")})}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{account:e.app.account,walletType:e.app.wallet,tokens:e.tokens.tokens,wallet:e.wallet,currentWallet:e.wallet.current}}Object.defineProperty(t,"__esModule",{value:!0});var u,c=n(12),d=a(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=n(0),p=a(m),h=n(18),g=n(119),b=n(13),y=n(78),w=a(y),E=n(16),v=n(17),x=n(14),k=n(270),_=n(24),T=n(2408),N=(a(T),n(176)),C=n(56),S=a(C),O=n(28),P=n(89),R=n(210),A=n(25),M=n(946),j=n(36),I=a(j),B=n(65),L=a(B),X=n(175),D=(0,X.withTronWeb)(u=function(e){function t(e){l(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));W.call(n),n.state={tokens:[],buyAmount:0,loading:!1,total:0,amount:"",filter:{}};var a=(0,v.trim)((0,k.getQueryParam)(e.location,"search"));return a.length>0&&(n.state.filter.name=""+a),n}return i(t,e),f(t,[{key:"componentDidMount",value:function(){this.loadPage()}},{key:"componentDidUpdate",value:function(e,t){this.props.location!==e.location&&this.setSearch(),this.state.filter!==t.filter&&(console.log("SEARCH CHANGED!"),this.loadPage())}},{key:"render",value:function(){var e=this,t=this.state,n=t.tokens,a=t.alert,r=t.loading,l=t.total,o=this.props,i=(o.match,o.intl),s=this.customizedColumn(),u=i.formatMessage({id:"view_total"})+" "+l+" "+i.formatMessage({id:"view_pass"});return p.default.createElement("main",{className:"container header-overlap token_black"},a,r&&p.default.createElement("div",{className:"loading-style"},p.default.createElement(A.TronLoader,null)),p.default.createElement("div",{className:"row"},p.default.createElement("div",{className:"col-md-12 table_pos"},l?p.default.createElement("div",{className:"table_pos_info d-none d-md-block",style:{left:"auto"}},u):"",p.default.createElement(S.default,{bordered:!0,loading:r,column:s,data:n,total:l,rowClassName:"table-row",onPageChange:function(t,n){e.loadPage(t,n)}}))))}}]),t}(m.Component))||u,W=function(){var e=this;this.loadPage=function(){var t=r(d.default.mark(function t(){var n,a,r,l,o,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return d.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.state.filter,a=e.props.intl,e.setState({loading:!0}),r=void 0,!n.name){t.next=10;break}return t.next=7,I.default.get("https://apilist.tronscan.org/api/token?sort=-name&limit="+s+"&start="+(i-1)*s+"&status=ico&name="+n.name);case 7:r=t.sent,t.next=13;break;case 10:return t.next=12,I.default.get("https://apilist.tronscan.org/api/token?sort=-name&limit="+s+"&start="+(i-1)*s+"&status=ico");case 12:r=t.sent;case 13:return l=r.data.total,o=r.data.data,0===o.length&&N.toastr.warning(a.formatMessage({id:"warning"}),a.formatMessage({id:"record_not_found"})),e.setState({loading:!1,tokens:o,total:l}),t.abrupt("return",l);case 18:case"end":return t.stop()}},t,e)}));return function(){return t.apply(this,arguments)}}(),this.setSearch=function(){var t=(0,v.trim)((0,k.getQueryParam)(e.props.location,"search"));t.length>0?e.setState({filter:{name:""+t}}):e.setState({filter:{}})},this.onChange=function(t,n){e.loadPage(t,n)},this.searchName=function(t){t.length>0?e.setState({filter:{name:"%25"+t+"%25"}}):"#/tokens/view"!==window.location.hash?window.location.hash="#/tokens/view":e.setState({filter:{}})},this.onBuyInputChange=function(t,n,a){var r=e.props.intl;t>a&&(t=a),t=t.replace(/^0|[^\d*]/g,""),e.setState({buyAmount:t}),e.buyAmount.value=t;var l=t*(n/O.ONE_TRX);e.priceTRX.innerHTML=r.formatNumber(l)+" TRX"},this.preBuyTokens=function(t){var n=e.state,a=(n.buyAmount,n.amount,e.props);a.currentWallet;if(!a.wallet.isOpen)return void e.setState({alert:p.default.createElement(w.default,{info:!0,showConfirm:!1,style:{marginLeft:"-240px",marginTop:"-195px",width:"450px",height:"300px"}},p.default.createElement("div",{className:"token-sweet-alert"},p.default.createElement("a",{className:"close",onClick:function(){e.setState({alert:null})}},p.default.createElement("i",{className:"fa fa-times",ariaHidden:"true"})),p.default.createElement("span",null,(0,E.tu)("login_first")),p.default.createElement("button",{className:"btn btn-danger btn-block mt-3",onClick:function(){e.setState({alert:null})}},(0,E.tu)("OK"))))});e.setState({alert:p.default.createElement(w.default,{showConfirm:!1,style:{marginLeft:"-240px",marginTop:"-195px",width:"450px",height:"300px"}},p.default.createElement("div",{className:"mt-5 token-sweet-alert",style:{textAlign:"left"}},p.default.createElement("a",{style:{float:"right",marginTop:"-45px"},onClick:function(){e.setState({alert:null})}},p.default.createElement("i",{className:"fa fa-times",ariaHidden:"true"})),p.default.createElement("h5",{style:{color:"black"}},(0,E.tu)("buy_token_info")),0===t.remaining&&p.default.createElement("span",null," ",(0,E.tu)("no_token_to_buy")),p.default.createElement("div",{className:"input-group mt-5"},p.default.createElement("input",{type:"number",ref:function(t){return e.buyAmount=t},className:"form-control",max:t.remaining,min:1,onKeyUp:function(e){e.target.value=e.target.value.replace(/^0|[^\d*]/g,"")},onChange:function(n){e.onBuyInputChange(n.target.value,t.price,t.remaining)}})),p.default.createElement("div",{className:"text-center mt-3 text-muted"},p.default.createElement("b",null,"= ",p.default.createElement("span",{ref:function(t){return e.priceTRX=t}},"0 TRX"))),p.default.createElement("button",{className:"btn btn-danger btn-block mt-3",onClick:function(){e.buyTokens(t)}},(0,E.tu)("participate"))))})},this.buyTokens=function(t){var n=e.state.buyAmount;if(!(n<=0)){var a=e.props,r=a.currentWallet,l=(a.wallet,n*(t.price/O.ONE_TRX));r.balance/O.ONE_TRX<l?e.setState({alert:p.default.createElement(w.default,{warning:!0,showConfirm:!1,style:{marginLeft:"-240px",marginTop:"-195px",width:"450px",height:"300px"}},p.default.createElement("div",{className:"mt-5 token-sweet-alert"},p.default.createElement("a",{style:{float:"right",marginTop:"-155px"},onClick:function(){e.setState({alert:null})}},p.default.createElement("i",{className:"fa fa-times",ariaHidden:"true"})),p.default.createElement("span",null,(0,E.tu)("not_enough_trx_message")),p.default.createElement("button",{className:"btn btn-danger btn-block mt-3",onClick:function(){e.setState({alert:null})}},(0,E.tu)("confirm"))))}):e.setState({alert:p.default.createElement(w.default,{warning:!0,showConfirm:!1,style:{marginLeft:"-240px",marginTop:"-195px",width:"450px",height:"300px"}},p.default.createElement("div",{className:"mt-5 token-sweet-alert"},p.default.createElement("a",{style:{float:"right",marginTop:"-155px"},onClick:function(){e.setState({alert:null})}},p.default.createElement("i",{className:"fa fa-times",ariaHidden:"true"})),p.default.createElement("h5",{style:{color:"black"}},(0,E.tu)("buy_confirm_message_1")),p.default.createElement("span",null,n," ",t.name," ",(0,E.t)("for")," ",n*(t.price/O.ONE_TRX)," TRX?"),p.default.createElement("button",{className:"btn btn-danger btn-block mt-3",onClick:function(){e.confirmTransaction(t)}},(0,E.tu)("confirm"))))})}},this.submit=function(){var t=r(d.default.mark(function t(n){var a,r,l,o,i,s,u,c,f,m,p,h,g,b;return d.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.props,r=a.account,l=a.currentWallet,o=e.state.buyAmount,i=void 0,!L.default.get("islogin")&&"ACCOUNT_LEDGER"!==e.props.walletType.type&&"ACCOUNT_TRONLINK"!==e.props.walletType.type){t.next=32;break}if(s=e.props.tronWeb(),u=e.props.account.tronWeb,t.prev=6,"ACCOUNT_LEDGER"!==e.props.walletType.type){t.next=16;break}return t.next=10,s.transactionBuilder.purchaseToken(n.ownerAddress,n.id,o*n.price,s.defaultAddress.hex).catch(function(e){return!1});case 10:return c=t.sent,t.next=13,(0,M.transactionResultManager)(c,s);case 13:f=t.sent,m=f.result,i=m;case 16:if("ACCOUNT_TRONLINK"!==e.props.walletType.type){t.next=25;break}return t.next=19,u.transactionBuilder.purchaseToken(n.ownerAddress,n.id,o*n.price,u.defaultAddress.hex).catch(function(e){return!1});case 19:return p=t.sent,t.next=22,(0,M.transactionResultManager)(p,u);case 22:h=t.sent,g=h.result,i=g;case 25:t.next=30;break;case 27:t.prev=27,t.t0=t.catch(6),console.log(t.t0);case 30:t.next=36;break;case 32:return t.next=34,x.Client.participateAsset(l.address,n.ownerAddress,n.id,o*n.price)(r.key);case 34:b=t.sent,i=b.success;case 36:if(!i){t.next=42;break}return e.setState({activeToken:null,confirmedParticipate:!0,participateSuccess:i,buyAmount:0}),e.props.reloadWallet(),t.abrupt("return",!0);case 42:return t.abrupt("return",!1);case 43:case"end":return t.stop()}},t,e,[[6,27]])}));return function(e){return t.apply(this,arguments)}}(),this.confirmTransaction=function(){var t=r(d.default.mark(function t(n){var a,r,l,o;return d.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.props,r=a.account,l=a.intl,o=e.state.buyAmount,e.setState({alert:p.default.createElement(w.default,{showConfirm:!1,showCancel:!1,cancelBtnBsStyle:"default",title:l.formatMessage({id:"transferring"}),style:{marginLeft:"-240px",marginTop:"-195px",width:"450px",height:"300px"}})}),t.next=5,e.submit(n);case 5:if(!t.sent){t.next=9;break}e.setState({alert:p.default.createElement(w.default,{success:!0,showConfirm:!1,style:{marginLeft:"-240px",marginTop:"-195px",width:"450px",height:"300px"}},p.default.createElement("div",{className:"mt-5 token-sweet-alert"},p.default.createElement("a",{style:{float:"right",marginTop:"-155px"},onClick:function(){e.setState({alert:null})}},p.default.createElement("i",{className:"fa fa-times",ariaHidden:"true"})),p.default.createElement("h5",{style:{color:"black"}},(0,E.tu)("transaction")," ",(0,E.tu)("confirm")),p.default.createElement("span",null,(0,E.tu)("success_receive")," ",n.name," ",(0,E.tu)("tokens")),p.default.createElement("button",{className:"btn btn-danger btn-block mt-3",onClick:function(){e.setState({alert:null})}},(0,E.tu)("OK"))))}),t.next=10;break;case 9:e.setState({alert:p.default.createElement(w.default,{danger:!0,title:"Error",onConfirm:function(){return e.setState({alert:null})}},(0,E.tu)("fail_transaction"))});case 10:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}(),this.customizedColumn=function(){var t=e.props.intl;return[{title:"#",dataIndex:"index",key:"index",align:"center",className:"ant_table _text_nowrap"},{title:(0,v.upperFirst)(t.formatMessage({id:"token"})),dataIndex:"name",key:"name",width:"40%",render:function(e,t,a){return p.default.createElement("div",{className:"table-imgtext"},t.imgUrl?p.default.createElement("div",{style:{width:"42px",height:"42px",marginRight:"18px"}},p.default.createElement("img",{style:{width:"42px",height:"42px"},src:t.imgUrl})):p.default.createElement("div",{style:{width:"42px",height:"42px",marginRight:"18px"}},p.default.createElement("img",{style:{width:"42px",height:"42px"},src:n(413)})),p.default.createElement("div",null,p.default.createElement("h5",null,p.default.createElement(_.TokenLink,{name:t.name,id:t.id,namePlus:t.name+" ("+t.abbr+")",address:t.ownerAddress})),p.default.createElement("p",{style:{wordBreak:"break-all"}},t.description)))}},{title:"ID",render:function(e,t,n){return p.default.createElement("div",null,t.id)},align:"center",className:"ant_table d-none d-md-table-cell _text_nowrap"},{title:t.formatMessage({id:"fund_raised"}),render:function(e,t,n){return p.default.createElement("div",null,p.default.createElement(b.FormattedNumber,{value:t.participated/O.ONE_TRX,maximumFractionDigits:1})," TRX")},align:"center",className:"ant_table d-none d-md-table-cell _text_nowrap"},{title:t.formatMessage({id:"issue_progress"}),dataIndex:"issuedPercentage",key:"issuedPercentage",render:function(e,t,n){return null===e&&(e=0),p.default.createElement("div",null,p.default.createElement(b.FormattedNumber,{value:e,maximumFractionDigits:1}),"%")},align:"center",className:"ant_table d-none d-sm-table-cell _text_nowrap"},{title:t.formatMessage({id:"end_time"}),dataIndex:"endTime",key:"endTime",align:"center",className:"ant_table _text_nowrap",render:function(e,t,n){return p.default.createElement("div",null,p.default.createElement(b.FormattedRelative,{value:t.endTime,units:"day"}))}},{title:t.formatMessage({id:"issuing_price"}),render:function(e,t,n){return p.default.createElement("div",null,p.default.createElement(b.FormattedNumber,{value:t.price/O.ONE_TRX,maximumFractionDigits:6})," TRX")},align:"center",className:"ant_table"},{title:t.formatMessage({id:"participate"}),align:"center",render:function(t,n,a){return n.isBlack?p.default.createElement("button",{className:"btn btn-secondary btn-block btn-sm",disabled:!0},(0,E.tu)("participate")):n.endTime<new Date||100===n.issuedPercentage?p.default.createElement("span",{style:{fontWeight:"normal"}},(0,E.tu)("finish")):n.startTime>new Date?p.default.createElement("span",{style:{fontWeight:"normal"}},(0,E.tu)("not_started")):p.default.createElement("button",{className:"btn btn-default btn-block btn-sm",onClick:function(){return e.preBuyTokens(n)}},(0,E.tu)("participate"))},className:"ant_table"}]}},F={loadTokens:g.loadTokens,login:P.login,reloadWallet:R.reloadWallet};t.default=(0,h.connect)(s,F)((0,b.injectIntl)(D))},2408:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(80),s=a(i),u=n(81),c=a(u),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(121),n(79);var f=n(0),m=a(f),p=n(16),h=n(211),g=a(h),b=function(e){function t(e){r(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onInputChange=function(e){n.setState({searchText:e.target.value})},n.onReset=function(){n.setState({searchText:""},function(){n.onSearch()})},n.onSearch=function(){var e=n.state.searchText;n.props.search(e)},n.onPressEnter=function(){(0,g.default)("#dropdownMenuButton").dropdown("toggle"),n.onSearch()},n.state={searchText:""},n}return o(t,e),d(t,[{key:"componentDidMount",value:function(){var e=this;(0,g.default)(".dropdown").on("show.bs.dropdown",function(){setTimeout(function(){e.searchInput&&e.searchInput.focus()},100)})}},{key:"render",value:function(){var e=this;return m.default.createElement("span",{className:"dropdown"},m.default.createElement("span",{id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},m.default.createElement("i",{className:"fa fa-filter ml-2"})),m.default.createElement("div",{className:"custom-filter-dropdown dropdown-menu","aria-labelledby":"dropdownMenuButton"},m.default.createElement(c.default,{ref:function(t){return e.searchInput=t},placeholder:"Search name",type:"text",className:"ant-input",value:this.state.searchText,onChange:this.onInputChange,onPressEnter:this.onPressEnter}),m.default.createElement(s.default,{type:"primary",onClick:this.onSearch},(0,p.tu)("search")),m.default.createElement(s.default,{className:"btn-secondary ml-1",onClick:this.onReset},(0,p.tu)("reset"))))}}]),t}(m.default.Component);t.default=b}});