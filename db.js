App.db = {
  _select : '*',
  _set : '',
  _set_values : '',
  _order_by : '',
  _where : '',


  last_insert_id : 1,


  set : function(data){
    App.db._set = '';
    App.db._set_values = '';

    var i = 0;

    App.Api.Each(data, function(value, key){
      i ++;

      if(i == 1){
        App.db._set += ("'" + key + "'");
        App.db._set_values += ("'" + value + "'");
      }else{
        App.db._set += (',' + "'" + key + "'");
        App.db._set_values += (',' + "'" + value + "'");
      }
    });
  },

  order_by : function(field, type){
    App.db._order_by = "ORDER BY " + field + " " + (type ? type : 'desc');
  },

  where : function(field, value){
    if(!App.db._where) App.db._where += 'WHERE ';
    else App.db._where += 'AND ';

    if((field.indexOf(' <=') + 1)){
      field = ("'" + field.replace(" <=", "' <="));
    }else if((field.indexOf(' >=') + 1)){
      field = ("'" + field.replace(" >=", "' >="));
    }else if((field.indexOf(' !=') + 1)){
      field = ("'" + field.replace(" !=", "' !="));
    }else{
      field = ("'" + field + "' =");
    }

    App.db._where += (field + " '" + value + "' ");
  },

  or_where : function(field, value){
    App.db._where += 'OR ';

    if((field.indexOf(' <=') + 1)){
      field = ("'" + field.replace(" <=", "' <="));
    }else if((field.indexOf(' >=') + 1)){
      field = ("'" + field.replace(" >=", "' >="));
    }else if((field.indexOf(' !=') + 1)){
      field = ("'" + field.replace(" !=", "' !="));
    }else{
      field = ("'" + field + "' =");
    }

    App.db._where += (field + " '" + value + "' ");
  },







  get : function(table){
    var result = [];

    var db = Ti.Database.open(db_name);


    var rows = db.execute("SELECT " + App.db._select + " from " + table + " " + App.db._where + " " + App.db._order_by);

    var i = 0;


    var row;

    while (rows.isValidRow()){
      row = {};

      for(i = 0; i < rows.getFieldCount(); i ++){
        row[rows.fieldName(i)] = rows.field(i);
      }

      result.push(row);
      
      rows.next();
    };

    rows.close();


    db.close();


    // Clear to default
    App.db._select = '*';
    App.db._where = '';
    App.db._order_by = '';


    return result;
  },



  insert : function(table){
    var result = {};

    var db = Ti.Database.open(db_name);

    db.execute("INSERT INTO " + table + " (" + App.db._set + ") VALUES (" + App.db._set_values + ")");

    db.close();


    // Clear to default
    


    // Set last insert id
    App.db.order_by('id', 'desc');
    App.db.last_insert_id = App.db.get(table)[0];


    return result;
  },



  delete : function(table){
    var result = {};

    var db = Ti.Database.open(db_name);

    db.execute("DELETE FROM " + table + " " + App.db._where);

    db.close();


    // Clear to default
    App.db._where = '';


    return result;
  }
};
