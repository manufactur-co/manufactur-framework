/**
 * MFRAccordion
 * 
 * @param {Number} index 
 * @param {HTML} element 
 */
 class MFRAccordion {
    constructor ( index, element ) {
        this.$element = $( element );
        this.$index = index;
    
        this.selectors = {
            "item" : ".mfr-accordion__item",
            "title" : ".mfr-accordion__title",
            "content" : ".mfr-accordion__content"
        }
    
        this.animationDuration = 350;
        this.multiExpand = this.$element.data( "multi-expand" );
    
        this.init();
    }
    init() {
        this.$item = this.$element.find( this.selectors.item );
        this.$title = this.$element.find( this.selectors.title );
        this.$content = this.$element.find( this.selectors.content );

        this.$title.on( "click", this._handleTitleClick.bind( this ) );
    }

    _handleTitleClick( event ) {
        event.preventDefault();
        var item = $( event.target ).closest( this.selectors.item );
        var content = $( event.target ).siblings( this.selectors.content );

        if( !this.multiExpand ) this.closeItem( this.$item.not( item ) );

        if( content.hasClass( "is-active" ) ) {
            this.closeItem( item );
        } else {
            this.openItem( item );
        }
    }

    openItem( item ) {
        const content = $( item ).find( this.selectors.content );
        const paddingTop = content.css("padding-top");
        const paddingBottom = content.css("padding-top");
        const duration = this.animationDuration;
        const contentHeight = content.css( { display: "block" }).outerHeight();
        content.css( { display: "" } );

        if( item.hasClass( "animating" ) ) return;

        console.log( contentHeight, paddingTop, paddingBottom );

        item.addClass( "is-active" ).addClass( "animating" );
        content
            .addClass( "is-active" )
            .css( {
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                display: "block"
            } )
            .animate( {
                height: contentHeight,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom
            }, duration, function() {
                content.css( {
                    height: "",
                    paddingTop: "",
                    paddingBottom: ""
                } );
                item.removeClass( "animating" );
            } );
    }

    closeItem( item ) {
        var content = $( item ).find( this.selectors.content );
        var duration = this.animationDuration;

        if( item.hasClass( "animating" ) ) return;

        item.removeClass( "is-active" ).addClass( "animating" );
        content
            .removeClass( "is-active" )
            .animate( {
                height: 0,
                paddingTop: 0,
                paddingBottom:  0
            }, duration, function() {
                content.css( {
                    height: "",
                    paddingTop: "",
                    paddingBottom: "",
                    display: "none"
                } );
                item.removeClass( "animating" );
            } );
    }
}

 // Accordion
 initializeComponent( ".mfr-accordion", MFRAccordion );