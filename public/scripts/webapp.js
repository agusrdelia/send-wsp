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

    detectCountry();

    function detectCountry() {
        fetch('https://ipapi.co/json/')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                var code = data.country_calling_code && data.country_calling_code.replace('+', '');
                if (!code) return;
                var option = inpSelect.querySelector('option[value="' + code + '"]');
                if (!option) return;
                inpSelect.value = code;
                prefix = code;
                renderLink();
            })
            .catch(function() {});
    }

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