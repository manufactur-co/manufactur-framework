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