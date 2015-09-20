$(function () {
  /*nav下的dropdown*/
  //分类，我的酷设
  $('.dropdown').mouseover(function () {
    if (this.className.indexOf('no-line') == -1) {
      $(this).find('.dropdown-menu').show();
    }
  }).mouseout(function () {
    if (this.className.indexOf('no-line') == -1) {
      $(this).find('.dropdown-menu').hide();
    }
  });
  //消息
  $('.dropdown').click(function (event) {
    $(this).find('.arrow').toggle()
      .end().find('.nav-mess').toggle();
    event.stopPropagation();
  });
  $('body').click(function () {
    if ($('.nav-mess')[0].style.display === 'block') {
      $('.nav-mess').hide();
      $('.arrow').hide();
    }
  });
  //消息下的nav-tab
  $('.nav-icon .nav-tabs').click(function (event) {
    var parentLi = $(event.target).parents('li')[0];
    var classN = parentLi.className.split(' ')[0];
    $(parentLi).addClass('active')
      .siblings().removeClass('active');
    $('.nav-mess-content').find('.' + classN).addClass('mess-cur')
      .siblings().removeClass('mess-cur');
    event.stopPropagation();
  });

  /*nav下的pop和按钮式链接*/
  $('button.nav-reg').click(function () {
    window.location.assign("/kusheCross/register.html");
  });

  (function () {
    var documentHeight = $('body').height();
    $('.nav-login').click(function () {
      $('#zhezhao').height(documentHeight)
        .show();
      $('.login-pop').show();
      return false;
    });

    $('#pop-close').click(function () {
      $('#zhezhao').hide();
      $('.login-pop').hide();
    });
  })();
});
