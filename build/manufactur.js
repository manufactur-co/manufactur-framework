// Components

/**
 * MFRAccordion
 * 
 * @param {Number} index 
 * @param {HTML} element 
 */
function MFRAccordion( index, element ) {
    this.$element = $( element );
    this.$index = index;

    this.selectors = {
        "item" : ".accordion__item",
        "title" : ".accordion__title",
        "content" : ".accordion__content"
    }

    this.animationDuration = 350;
    this.multiExpand = this.$element.data( "multi-expand" );

    this.init();
}

MFRAccordion.prototype = Object.assign( {}, MFRAccordion.prototype, {
    init: function() {
        this.$item = this.$element.find( this.selectors.item );
        this.$title = this.$element.find( this.selectors.title );
        this.$content = this.$element.find( this.selectors.content );

        this.$title.on( "click", this._handleTitleClick.bind( this ) );
    },
    _handleTitleClick: function( event ) {
        event.preventDefault();
        var item = $( event.target ).closest( this.selectors.item );
        var content = $( event.target ).siblings( this.selectors.content );

        if( !this.multiExpand ) this.closeItem( this.$item.not( item ) );

        if( content.hasClass( "is-active" ) ) {
            this.closeItem( item );
        } else {
            this.openItem( item );
        }
    },
    openItem: function( item ) {
        var content = $( item ).find( this.selectors.content );
        var paddingTop = content.css("padding-top");
        var paddingBottom = content.css("padding-top");
        var duration = this.animationDuration;
        var contentHeight = content.css( { display: "block" }).height();
        content.css( { display: "" } );

        if( item.hasClass( "animating" ) ) return;

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
    },
    closeItem: function( item ) {
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
} );



// Init
function init() {
    // Accordion
    $( ".accordion" ).each( function( index, element ) {
        var mfrAccordion = new MFRAccordion( index, element );
    } );
}

// Event
jQuery( function(){
    init();
} );