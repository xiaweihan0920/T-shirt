$( function ( ) {
  $( '#myTab a' )
    .click( function ( e ) {
      e.preventDefault( );
      $( this )
        .tab( 'show' );
    } ); //Tab

  $( window )
    .scroll( function ( ) {
      // alert(window.scrollY);
      if ( window.scrollY > 100 ) {
        $( 'footer button#back-top' )
          .show( 'fast' );
      } else {
        $( 'footer button#back-top' )
          .hide( 'fast' );
      }
    } ); //Back-top

  $( 'span.heart' )
    .click( function ( ) {
      var $count = $( this )
        .next( )
        .next( );
      var num = parseInt( $count.text( ) ) + 1;
      $count.text( num );
    } ); //count-zan

  $( '#write-mes' )
    .on( 'click', function ( ) {
      $( '#recipient-name' )
        .val( "" );
      $( '#recipient-name' )
        .attr( 'disabled', false );
    } ); //disable-form

  //correct-position

  $( 'div.action' )
    .on( 'click', 'span.total', function ( ) {
      $( 'div.list div.mess-list' )
        .each( function ( index, el ) {
          // alert($(this).html());
          if ( $( this )
            .find( 'div.mes-two-sides' )
            .find( 'span.name' )
            .text( ) == '我' ) {
            $( this )
              .find( 'div.action' )
              .empty( )
              .append( '<span class="del" data-toggle="modal" data-target="#Modal-del-detail">删除</span>' );
          }
        } ); //correct-position
      var name = $( this )
        .parent( )
        .prev( )
        .find( '.name' )
        .text( );
      // $('div.col-md-7').toggleClass('mes-info');
      $( 'div.my-mes>span.mes-to>span.to-name' )
        .text( name );
      $( '#post-cont' )
        .focus( );
    } ); //focus-form

  $( 'div.pro div.action' )
    .on( 'click', 'span.res', function ( ) {
      var userName = $( this )
        .parent( )
        .prev( )
        .find( '.name' )
        .text( );
      $( '#recipient-name' )
        .val( userName );
      $( '#recipient-name' )
        .attr( 'disabled', true );
    } ); //res-form-enable


  $( 'div.list div.action' )
    .on( 'click', 'span.res', function ( ) {
      $( '#post-cont' )
        .focus( );
    } ); //focus-form-res



  $( '.form-group' )
    .on( 'click', 'button#send', function ( ) {
      // alert('good');
      $( '#post-cont' )
        .siblings( )
        .remove( );
      if ( $( '#post-cont' )
        .val( )
        .match( /^\s*$/ ) ) {
        var tip = '<span class="tip pull-right">请填写私信内容</span><div class="clear-fix"></div>';
        $( '#post-cont' )
          .after( tip );
      }
    } ); //send-tips

  $( '#post-cont' )
    .on( 'focus', function ( ) {
      $( 'span.tip,span.tip+div.clear-fix' )
        .remove( );
    } ); //remove-tips

  $( 'div.action' )
    .on( 'click', 'span.del', function ( ) {
      var name = $( this )
        .parent( )
        .prev( )
        .find( '.name' )
        .text( );
      $( '.modal-body span.name' )
        .text( name );
    } );
  $( 'div.my-mes>div.back' )
    .on( 'click', function ( ) {
      $( 'div.col-md-7' )
        .toggleClass( 'mes-info' );
    } ); //del-modal

  // $("#draggable,#draggable-del,#draggable-del-detail").draggable();

  function jubao( ) {
    var html = '<ul class="subnav"><li><a href="#">广告等垃圾信息</a></li><li><a href = "#">不友善内容</a></li><li><a href = "#">其他</a></li></ul>';
    $( 'body' )
      .append( html );
    $( '.subnav' )
      .hide( );
    $( 'span.jubao' )
      .on( 'mouseover', function ( ) {
        // var x = $(this).position().left,
        // y = $(this).position().top + $(this).outerHeight();
        var x = $( this )
          .offset( )
          .left,
          y = $( this )
          .offset( )
          .top + $( this )
          .outerHeight( );
        // alert('x=' + x + '\ny=' + y);
        $( '.subnav' )
          .css( {
            'position': 'absolute',
            'left': x,
            'top': y
          } );
        $( '.subnav' )
          .show( );
      } );
    $( 'span.jubao' )
      .mouseout( function ( ) {
        $( '.subnav' )
          .hide( );
      } );
    $( '.subnav' )
      .mouseover( function ( ) {
        $( this )
          .show( );
      } );
    $( '.subnav' )
      .mouseout( function ( ) {
        $( this )
          .hide( );
      } );
  }
  jubao( );
} )

