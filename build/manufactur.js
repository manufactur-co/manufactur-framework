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
        "item" : ".mfr-accordion__item",
        "title" : ".mfr-accordion__title",
        "content" : ".mfr-accordion__content"
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

/**
 * MFRPopup
 * 
 * @param {Number} index 
 * @param {HTML} element 
 */
function MFRPopup( index, element ) {
    this.$element = $( element );
    this.$index = index;

    this.selectors = {
        "close" : "[data-mfr-popup-close]"
    }

    this.closeOnOverlayClick = this.$element.data( "close-on-overlay-click" );

    this.init();
}

MFRPopup.prototype = Object.assign( {}, MFRPopup.prototype, {
    init: function() {
        this.$close = this.$element.find( this.selectors.close );

        $( "[data-mfr-open-popup]" ).on( "click", this._handleOpenPopup.bind( this ) );
        this.$close.on( "click", this._handleClosePopup.bind( this ) );
        this.$element.on( "click", this._handleOverlayClick.bind( this ) );
    },
    _handleOpenPopup: function( event ) {
        var targetID = $( event.currentTarget ).data( "mfr-open-popup" );

        if( !$( targetID ).length ) return;

        this.$element.addClass( "is-active" );
    },
    _handleClosePopup: function( event ) {
        this.$element.removeClass( "is-active" );
    },
    _handleOverlayClick: function( event ) {
        if( !this.closeOnOverlayClick ) return;
        if( $( event.target ).get(0) == this.$element.get(0) ) {
            this.$element.removeClass( "is-active" );
        }
    }
} );

// Initialize Components
window.allComponents = {};
function initializeComponent( selector, Component ) {
    const components = [];
    const propertyName = selector.replace( '.', '' ).replace( '-', '_' );

    // Exit function if selector has already been initialized.
    if( window.allComponents[ propertyName ] != undefined ) return false;

    // Initialize on load.
    jQuery( selector ).each( function( index, element ) {
        const initComponent = new Component( index, element );

        components.push( initComponent );
    } );

    // Add components list to the list of initialized components.
    window.allComponents[ propertyName ] = components;

    // Return initialized components.
    return components;
}

// Init
function init() {
    // Accordion
    initializeComponent( ".mfr-accordion", MFRAccordion );
    // Popup
    initializeComponent( ".mfr-popup", MFRPopup );
}

// Event
jQuery( function(){
    init();
} );