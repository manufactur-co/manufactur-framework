/**
 * MFRPopup
 * 
 * @param {Number} index 
 * @param {HTML} element 
 */
class MFRPopup {
    constructor( index, element ) {
        this.$element = $( element );
        this.$index = index;
    
        this.selectors = {
            "close" : "[data-mfr-popup-close]"
        }
    
        this.closeOnOverlayClick = this.$element.data( "close-on-overlay-click" );
        this.currentPopup;
    
        this.init();
    }
    init() {
        this.$close = this.$element.find( this.selectors.close );

        $( "[data-mfr-open-popup]" ).on( "click", this._handleOpenPopup.bind( this ) );
        this.$close.on( "click", this._handleClosePopup.bind( this ) );
        this.$element.on( "click", this._handleOverlayClick.bind( this ) );
    }
    _handleOpenPopup( event ) {
        this.currentPopup = $( $( event.currentTarget ).data( "mfr-open-popup" ) );
        
        if( !this.currentPopup.length ) return;

        this.currentPopup.addClass( "is-active" );
    }
    _handleClosePopup( event ) {
        this.currentPopup.removeClass( "is-active" );
    }
    _handleOverlayClick( event ) {
        if( !this.closeOnOverlayClick ) return;
        
        if( $( event.target ).get(0) == this.$element.get(0) ) {
            this.$element.removeClass( "is-active" );
        }
    }
}

// Popup
initializeComponent( ".mfr-popup", MFRPopup );