function MFRAccordion(t,i){this.$element=$(i),this.$index=t,this.selectors={item:".mfr-accordion__item",title:".mfr-accordion__title",content:".mfr-accordion__content"},this.animationDuration=350,this.multiExpand=this.$element.data("multi-expand"),this.init()}function MFRPopup(t,i){this.$element=$(i),this.$index=t,this.selectors={close:"[data-mfr-popup-close]"},this.closeOnOverlayClick=this.$element.data("close-on-overlay-click"),this.init()}function initializeComponent(t,i){const e=[],n=t.replace(".","").replace("-","_");return null==window.allComponents[n]&&(jQuery(t).each(function(t,n){const s=new i(t,n);e.push(s)}),window.allComponents[n]=e,e)}function init(){initializeComponent(".mfr-accordion",MFRAccordion),initializeComponent(".mfr-popup",MFRPopup)}MFRAccordion.prototype=Object.assign({},MFRAccordion.prototype,{init:function(){this.$item=this.$element.find(this.selectors.item),this.$title=this.$element.find(this.selectors.title),this.$content=this.$element.find(this.selectors.content),this.$title.on("click",this._handleTitleClick.bind(this))},_handleTitleClick:function(t){t.preventDefault();var i=$(t.target).closest(this.selectors.item),e=$(t.target).siblings(this.selectors.content);this.multiExpand||this.closeItem(this.$item.not(i)),e.hasClass("is-active")?this.closeItem(i):this.openItem(i)},openItem:function(t){var i=$(t).find(this.selectors.content),e=i.css("padding-top"),n=i.css("padding-top"),s=this.animationDuration,o=i.css({display:"block"}).height();i.css({display:""}),t.hasClass("animating")||(t.addClass("is-active").addClass("animating"),i.addClass("is-active").css({height:0,paddingTop:0,paddingBottom:0,display:"block"}).animate({height:o,paddingTop:e,paddingBottom:n},s,function(){i.css({height:"",paddingTop:"",paddingBottom:""}),t.removeClass("animating")}))},closeItem:function(t){var i=$(t).find(this.selectors.content),e=this.animationDuration;t.hasClass("animating")||(t.removeClass("is-active").addClass("animating"),i.removeClass("is-active").animate({height:0,paddingTop:0,paddingBottom:0},e,function(){i.css({height:"",paddingTop:"",paddingBottom:"",display:"none"}),t.removeClass("animating")}))}}),MFRPopup.prototype=Object.assign({},MFRPopup.prototype,{init:function(){this.$close=this.$element.find(this.selectors.close),$("[data-mfr-open-popup]").on("click",this._handleOpenPopup.bind(this)),this.$close.on("click",this._handleClosePopup.bind(this)),this.$element.on("click",this._handleOverlayClick.bind(this))},_handleOpenPopup:function(t){var i=$(t.currentTarget).data("mfr-open-popup");$(i).length&&this.$element.addClass("is-active")},_handleClosePopup:function(t){this.$element.removeClass("is-active")},_handleOverlayClick:function(t){this.closeOnOverlayClick&&$(t.target).get(0)==this.$element.get(0)&&this.$element.removeClass("is-active")}}),window.allComponents={},jQuery(function(){init()});