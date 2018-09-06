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
                        var viewHtml = response[1].data;
                        $bookswrapper.find('#tilethrobber').remove();
                        $bookswrapper.append(viewHtml);
                        //adjust widths
                        var bookscount = jQuery('.view-ttc-book').length;
                        $bookswrapper.find('.view-ttc-book').css('max-width', ((99-bookscount)/ bookscount) + '%' )
                        //Adjust row heights
                            .last().find('.views-row').each( function(i){
                            $this = jQuery(this);
                            var currheight = $this.outerHeight();
                            var $samerows = jQuery('.views-row-' + (i+1), context);
                            $samerows.each( function() {
                                var $subthis = jQuery(this), myheight =  $subthis.outerHeight()
                                if (myheight < currheight) {
                                    $subthis.outerHeight(currheight);
                                } else if (myheight > currheight) {
                                    $this.outerHeight(myheight);
                                    currheight = myheight;
                                }

                            });
                        });

                    }
                }
            )
        });
    }
}