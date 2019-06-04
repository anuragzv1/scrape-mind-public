function fire_query(){
    var shell = document.forms[1].elements[0].value;

    if(shell.length!=0){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById('success').innerHTML = this.responseText;
            document.getElementById('success').style.display="block";
            setTimeout(function(){
              document.getElementById('success').style.display="none";
            },1500);
          }
        };
  
        xhttp.open("POST", "/api/sendcommand", true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send('shell='+shell+'&id='+id);
        displayquery();
        return false;
    }
    else {
      document.getElementById('success').innerHTML = "Cannot be empty";
      document.getElementById('success').style.display="block";
      setTimeout(function(){
        document.getElementById('success').style.display="none";
      },1500);
      return false;
    }

}