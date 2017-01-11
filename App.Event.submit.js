App.Event.submit = {
  Form : function(Self, event){
    var data = {};


    Self.find('input, textarea').each(function(){
      data[$(this).attr('name')] = $(this).val();
    });



    $.ajax({
      url : Self.attr('action'),
      type : 'post',
      dataType : 'json',
      data : data,
      success : function(json){
        console.log(json);
      }
    });

    return false;
  }
};