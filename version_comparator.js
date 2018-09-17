Drupal.behaviors.versionComparator = {
    attach : function(context) {
        jQuery('#addtranslator').on('click', function(e){
            var $t = jQuery('#translators');
            var tname = $t.val();
            var $bookswrapper = jQuery('#bookswrapper');
            $t.find('option[value="'+tname+'"]').remove();
            $bookswrapper.append("<div id='tilethrobber'><i class='glyphicon glyphicon-refresh glyphicon-spin'></i></div>");
            jQuery.post(
                Drupal.settings.basePath+'views/ajax',
                {
                    view_name : 'version_comparator_book',
                    view_display_id : 'block',
                    view_args : tname
                },
                function(response) {
                    if (response[1] !== undefined)
                    {
                        jQuery('select#translators').find('option:contains("'+tname+'")').remove();
                        var viewHtml = response[1].data;
                        $bookswrapper.find('#tilethrobber').remove();
                        $bookswrapper.append(viewHtml);
                        jQuery('.vc-book-header').width('auto');
                        jQuery('#bookswrapper .view-header').width('auto');
                        var bookscount = jQuery('.view-version-comparator-book').length;
                        $bookswrapper.find('.view-version-comparator-book')
                        //Adjust row heights
                            .last().find('.views-row').each( function(i){
                                if ( bookscount == 1) {
                                    return false;
                                }
                            var $samerows = jQuery('.views-row-' + (i+1), context);
                            jQuery($samerows).matchHeight();
                        });
                        //Set headers
                        jQuery('.vc-book-header').each( function(i) {
                          var setwidth = jQuery(this).parents('.view-header').width();
                          jQuery(this).width( setwidth);
                          jQuery(this).parents('.view-header').width(setwidth);
                        })
                        jQuery('#bookswrapper .vc-book-header')
                            .affix({
                                offset: {
                                    top: jQuery('#bookswrapper').offset().top, target: '.view-header'
                                }
                            }
                        );
                    }
                }
            )
        });
    }
}