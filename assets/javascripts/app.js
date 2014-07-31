var jQuery = require('../bower_components/jquery/dist/jquery.min');
window.jQuery = jQuery;
var Foundation = require('../bower_components/foundation/js/foundation.min');
var Sharrre = require('../bower_components/Sharrre/jquery.sharrre.min');


jQuery('#compartilhar').sharrre({
    share: {
        twitter: true,
        facebook: true,
        googlePlus: true
    },
    template: '<span class="show-for-medium-up">Compartilhar:</span><a href="#" class="facebook"><i class="icon-facebook"></i></a><a href="#" class="twitter"><i class="icon-twitter"></i></a><a href="#" class="googleplus"><i class="icon-google-plus"></i></a>',
    enableHover: false,
    enableTracking: true,
    urlCurl: '',
    render: function(api, options){
        jQuery(api.element).on('click', '.twitter', function() {
            api.openPopup('twitter');
        });
        jQuery(api.element).on('click', '.facebook', function() {
            api.openPopup('facebook');
        });
        jQuery(api.element).on('click', '.googleplus', function() {
            api.openPopup('googlePlus');
        });
    }
});

jQuery(document).foundation();