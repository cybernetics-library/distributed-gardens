;(function($) {
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    var methods = {
        init: function (settings) {

            settings = $.extend( {
              'colors'         : ['red', 'blue'],
              'direction'      : 'top'
            }, settings);

            return this.each(function(){
                if($.isArray(settings.colors) && settings.colors.length >= 2) {
                    $(this).css({ 
                        'background':
                        methods.gradientToString(settings.colors, settings.direction)
                    });
                } else {
                    $.error('Please pass an array');
                }

            });

        },
        gradientToString: function (colors, direction) {

            var nbColors = colors.length;

            //If no percent, we need to calculate them
            if(colors[0].percent === undefined) {

                //Passed only colors as an array we make it an object
                if(colors[0].color === undefined) {
                    var tmp = [];
                    for(i=0; i < nbColors; i++)
                        tmp.push({'color':colors[i]});

                    colors = tmp;
                }

                var p = 0,
                    percent = 100 / (nbColors - 1);

                //calculate percent
                for(i=0; i< nbColors; i++) {
                    p = i === 0 ? p : (i == nbColors-1 ? 100 : p + percent);
                    colors[i].percent = p;
                }
            }

            var to = isSafari ? '' : 'to';

            //build the string
            var gradientString = isSafari ? '-webkit-linear-gradient(' : 'linear-gradient(';

           gradientString += direction;

            for(i=0; i < nbColors; i++)
               gradientString += ', '+ colors[i].color + ' ' + colors[i].percent + '%';

            gradientString += ')';
            return gradientString;

        }

    };

    $.fn.gradientGenerator = function () {
        return methods.init.apply( this, arguments );
    };
})(jQuery);

