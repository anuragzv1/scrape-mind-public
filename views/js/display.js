
function displayquery(){
    setTimeout(function timedoutdisplay(){
        document.getElementById("tbody").innerHTML="";
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            response.reverse();
            var len = response.length;
            var i=0;
           for(i=0;i<len;i++)
                {
                    // var elem = document.getElementById('sexydiv');
                    // elem.scrollTop = elem.scrollHeight;
                var results = document.createElement("tr");
                //alert(response);
                qno=response[i].id;
                qname=response[i].body;
                qres=response[i].result;
            results.innerHTML = "<th scope='row'>"+qno+"</th><td>"+qname+"</td><td>"+qres+"</td>";
            document.getElementById("tbody").appendChild(results);
                    
        }
            
        }
      };
      xhttp.open("POST", "/api/displayquery", true);
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhttp.send('&id='+id);
    },3000);
    
}