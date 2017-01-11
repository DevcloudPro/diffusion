/* Start objects */

// Set variables
var timer;

var timeout;


var debug = true;

var duration = 400;

var App = {
  Protocol : 'http://',
  Domain : 'devcloud.pro',
  data : {},


  Event : {},

  // ACTIONS
  Tools : {
    // Get current date
    Get_date : function(time, days_ago, days_future){
      // Set variables
      if(days_ago){
        var Time = new Date();

        Time.setDate(Time.getDate() - days_ago);
      }else if(days_future){
        var Time = new Date();

        Time.setDate(Time.getDate() + days_future);
      }else{
        var Time = new Date();
      }
      

      var Year = Time.getFullYear();
      var Month = (Time.getMonth() + 1);
      var Day = Time.getDate();

      var string = Year;
      string += '-';
      string += Month.toString().length == 2 ? Month : '0' + Month;
      string += '-';
      string += Day.toString().length == 2 ? Day : '0' + Day;

      if(time) string += (' ' + this.Get_time());

      return string;
    },


    // Get current time
    Get_time : function(){
      // Set variables
      var Time = new Date();

      var hours = Time.getHours();
      var minutes = Time.getMinutes();
      var seconds = Time.getSeconds();

      var string = hours.toString().length == 2 ? hours : '0' + hours;
      string += ':';
      string += minutes.toString().length == 2 ? minutes : '0' + minutes;
      string += ':';
      string += seconds.toString().length == 2 ? seconds : '0' + seconds;

      return string;
    },

    Redirect : function(url, delayed){
      if(delayed){
        setTimeout(function(){
          window.location.href = url;
        }, delayed);
      }else{
        window.location.href = url;
      }
    },

    // Get segment
    Get_segment : function(number, array){
      var array = array ? array : window.location.pathname.split('/');

      if(number == 'all'){
        return array;
      }else{
        return (array[number] ? (array[number] == '0' || array[number] == 'false' || array[number] == 'undefined' ? '' : array[number]) : '');
      }
    },

    Get_key : function(number, array){
      var array = array ? array : window.location.href.split('=');

      $.each(array, function(key, val){
        if(val.indexOf('?') + 1){
          array[key] = val.split('?');
          array[key] = array[key][0];
        }else if(val.indexOf('&') + 1){
          array[key] = val.split('&');
          array[key] = array[key][0];
        }        
      });

      console.log(array);

      if(number == 'all'){
        return array;
      }else{
        return (array[number] ? (array[number] == '0' || array[number] == 'false' || array[number] == 'undefined' ? '' : array[number]) : '');
      }
    },

    Set_segment : function(number, value){
      var array = window.location.pathname.split('/');
      var push = '';

      array[number] = value ? value : '0';

      for(var i = 0; i < array.length; i ++){
        if(i > 0) push += ('/' + array[i]);
      }

      history.pushState({
        url : push
      }, '', push);
    },

    Console : function(string, not_show_time){
      if(debug){
        if(!not_show_time) string = this.Get_time() + ' :: ' + string;

        console.debug(string);
      }
    },


    Message : function(string){
      alert(string);
    },


    Trace : function(string){
      alert(string);
    },

    GetBase : function(){
      return './';
    },

    Note : function(text, type){
      if(!type) type = 'error';

      $('#notification')
      .hide()
      .html('<div class="' + type + '">' + text + '</div>')
      .fadeIn(function(){
        var self = $(this);

        setTimeout(function(){
          self.fadeOut(function(){
            self.html('');
          });
        }, 5000);
      });
    }
  },

  // STRING
  String : {
    IsArray : function(value){
      return value &&
        typeof value === 'object' &&
        typeof value.length === 'number' &&
        typeof value.splice === 'function' &&
        !(value.propertyIsEnumerable('length'));
    },

    // использование Math.round() даст неравномерное распределение!
    GetRandomInt : function(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    Explode : function(delimiter, string) { // Split a string by string
      // 
      // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: kenneth
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

      var emptyArray = { 0: '' };

      if ( arguments.length != 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
      {
        return null;
      }

      if ( delimiter === ''
        || delimiter === false
        || delimiter === null )
      {
        return false;
      }

      if ( typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object' )
      {
        return emptyArray;
      }

      if ( delimiter === true ) {
        delimiter = '1';
      }

      return string.toString().split ( delimiter.toString() );
    },



    Htmlspecialchars : function(string, quote_style, charset, double_encode) {
      var optTemp = 0,
        i = 0,
        noquotes = false;
      if (typeof quote_style === 'undefined' || quote_style === null) {
        quote_style = 2;
      }
      
      if(string){
        string = string.toString();
        if (double_encode !== false) { // Put this first to avoid double-encoding
          string = string.replace(/&/g, '&amp;');
        }
        string = string.replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        var OPTS = {
          'ENT_NOQUOTES': 0,
          'ENT_HTML_QUOTE_SINGLE': 1,
          'ENT_HTML_QUOTE_DOUBLE': 2,
          'ENT_COMPAT': 2,
          'ENT_QUOTES': 3,
          'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
          noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
          quote_style = [].concat(quote_style);
          for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
            if (OPTS[quote_style[i]] === 0) {
              noquotes = true;
            } else if (OPTS[quote_style[i]]) {
              optTemp = optTemp | OPTS[quote_style[i]];
            }
          }
          quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
          string = string.replace(/'/g, '&#039;');
        }
        if (!noquotes) {
          string = string.replace(/"/g, '&quot;');
        }
      }
      

      return string;
    },

    Htmlspecialchars_decode : function(string, quote_style) {
      var optTemp = 0,
        i = 0,
        noquotes = false;
      if (typeof quote_style === 'undefined') {
        quote_style = 2;
      }
      
      if(string){
        string = string.toString()
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
        var OPTS = {
          'ENT_NOQUOTES': 0,
          'ENT_HTML_QUOTE_SINGLE': 1,
          'ENT_HTML_QUOTE_DOUBLE': 2,
          'ENT_COMPAT': 2,
          'ENT_QUOTES': 3,
          'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
          noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
          quote_style = [].concat(quote_style);
          for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[quote_style[i]] === 0) {
              noquotes = true;
            } else if (OPTS[quote_style[i]]) {
              optTemp = optTemp | OPTS[quote_style[i]];
            }
          }
          quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
          string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
          // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
        }
        if (!noquotes) {
          string = string.replace(/&quot;/g, '"');
        }
        // Put this in last place to avoid escape being double-decoded
        string = string.replace(/&amp;/g, '&');
      }
        

      return string;
    }
  },

  // Events
  Events : {
    click : function(){
      // Set variables
      var Selector;

      // Event listeners
      $.each(App.Event.click, function(key, value){
        Selector = ('#' + key);

        $(Selector).live('click', function(event){
          value($(this), event);

          return false;
        });     


        if(debug) App.Tools.Console('click #' + key + ' :: has append to event listeners');         
      });
    },

    submit : function(){
      // Set variables
      var Selector;

      // Event listeners
      $.each(App.Event.submit, function(key, value){
        Selector = ('#' + key);

        $(Selector).live('submit', function(event){
          value($(this), event);

          return false;
        });     


        if(debug) App.Tools.Console('submit #' + key + ' :: has append to event listeners');         
      });
    },

    keyup : function(){
      // Set variables
      var Selector;

      // Event listeners
      $.each(App.Event.keyup, function(key, value){
        Selector = ('#' + key);

        $(Selector).live('keyup', function(event){
          value($(this), event);
        });     


        if(debug) App.Tools.Console('keyup #' + key + ' :: has append to event listeners');         
      });
    },







    resize : function(){
      $.each(App.Event.resize, function(key, value){
        value();

        if(debug) App.Tools.Console('resize #' + key + ' :: has append to event listeners');   
      });
    },


    scroll : function(){
      var Selector;

      $.each(App.Event.scroll, function(key, value){
        Selector = (key == 'Window' ? window : ('#' + key));

        $(Selector).scroll(function(){
          value($(this));
        });

        if(debug) App.Tools.Console('scroll #' + key + ' :: has append to event listeners');   
      });
    },


    load : function(){
      $.each(App.Event.load, function(key, value){
        value();
      });
    },

    interval : function(){
      $.each(App.Event.interval, function(key, value){
        value();
      });
    }
  },



  // Initialization
  Init : function(callback){
    if(debug) App.Tools.Console('Start initializing');

    $('#Loader').show();




    // Init listeners
    App.Events.click();
    App.Events.keyup();
    App.Events.submit();

    App.Events.load();
    App.Events.scroll();

    // Init resizes
    App.Events.resize();

    $(window).resize(function(){
      App.Events.resize();
    });


    // Init intervals
    App.data.interval = setInterval(function(){
      App.Events.interval();
    }, 1000); 


    // End init
    setTimeout(function(){
      $('#Loader').hide('fade');

      if(callback) callback();

      if(debug) App.Tools.Console('Initializing complete');
    }, 1000);
  }
};



// God init, dot input here...
$(document).ready(function(){
  App.Init();
});