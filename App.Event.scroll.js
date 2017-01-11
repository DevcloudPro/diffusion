App.Event.scroll = {
  Window : function(){
    var Portfolio = $('#Portfolio li a');

    if(Portfolio.length){
      var scrollTop = $(document).scrollTop();
      var oldScrollTop = $('#Data').attr('data-oldScrollTop') * 1;

      var position = $('#Data').attr('data-position') * 1;

      if(!position) position = 0;



      var delta = 1;

      if(scrollTop > oldScrollTop){
        position += delta;
      }else{
        position -= delta;
      }


      console.log(position);

      // Set modified vars
      $('#Data').attr('data-position', position);
      $('#Data').attr('data-oldScrollTop', scrollTop);







      Portfolio.css({
        backgroundPosition : 'center ' + position + 'px'
      });
    }
  }
};