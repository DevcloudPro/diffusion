App.Event.load = {
  Interface : function(){
    
  },

  Datepicker : function(){
    // Set jquery plugins
    var self;

    // Datepicker
    /* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
    /* Written by Andrew Stromnov (stromnov@gmail.com). */
    ( function( factory ) {
      if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ "../widgets/datepicker" ], factory );
      } else {

        // Browser globals
        factory( jQuery.datepicker );
      }
    }( function( datepicker ) {

    datepicker.regional.ru = {
      closeText: "Закрыть",
      prevText: "&#x3C;Пред",
      nextText: "След&#x3E;",
      currentText: "Сегодня",
      monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
      "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
      monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
      "Июл","Авг","Сен","Окт","Ноя","Дек" ],
      dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
      dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
      dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
      weekHeader: "Нед",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "" };
      datepicker.setDefaults( datepicker.regional.ru );

      return datepicker.regional.ru;

    } ) );


    $('input.datepicker').each(function(){
      self = $(this);

      $('#' + self.attr('id')).datepicker({
        dateFormat : 'dd.mm.yy',
        onSelect : function(){
          $(this).keyup();
        }
      });
    });
  },

  Fancybox : function(){
    $("a.fancybox").fancybox({
      'transitionIn'  : 'fade',
      'transitionOut' : 'fade',
      'speedIn'   : 600, 
      'speedOut'    : 200, 
      'overlayShow' : true
    }).each(function(){
      var self = $(this);

      if(self.attr('href')){
        self.css({
          backgroundImage : 'url(' + self.attr('href') + ')'
        });
      }
    });
  }
};