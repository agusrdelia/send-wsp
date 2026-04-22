(function(){
    'use strict';

    var inpSelect = document.querySelector( 'select' );
    var inpNumber = document.querySelector( 'input' );
    var link      = document.querySelector( 'a' );
    var prefix    = '';
    var number    = '';

    inpSelect.addEventListener( 'change', onSelectChange, false );
    inpNumber.addEventListener( 'change', onInputChange, false );
    inpNumber.addEventListener( 'keyup', onInputChange, false );

    function onSelectChange() {
        prefix = this.value.replace(/[^0-9]/g, '');
        renderLink();
    }

    function onInputChange() {
        this.value = this.value.replace(/[^0-9]/g, '');
        number = this.value;
        renderLink();
    }

    function renderLink() {
        if ( !prefix || !number ) {
            link.removeAttribute('href');
            return;
        }
        link.href = "https://api.whatsapp.com/send?phone="+prefix+number;
    }
})();