function scrape() {
    var se = document.forms[0].elements[0].value;
    if (document.getElementById('verbose_true').checked) {
        var verbose = true;
    }
    else if (document.getElementById('verbose_false').checked) {
        var verbose = false;
    }

    if (document.getElementById('debug_true').checked) {
        var debug = true;
    }
    else if (document.getElementById('debug_false').checked) {
        var debug = false;
    }
    var keywords = document.forms[0].elements[5].value;
    var number_of_pages = document.forms[0].elements[6].value;

    if (se.length != 0 || verbose.length != 0 || debug.length != 0 || keywords.length != 0 || number_of_pages.length != 0) {
        var shell = `node scrape.js --engine "${se}" --debug "${debug}" --verbose "${verbose}" --keywords "${keywords}" --pages "${number_of_pages}"
        `
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('success').innerHTML = this.responseText;
                document.getElementById('success').style.display = "block";
                setTimeout(function () {
                    document.getElementById('success').style.display = "none";
                }, 1500);
            }
        };

        xhttp.open("POST", "/api/sendcommand", true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send('shell=' + shell + '&id=' + id);
        displayquery();
        return false;
    }
    else {
        document.getElementById('success').innerHTML = "Cannot be empty";
        document.getElementById('success').style.display = "block";
        setTimeout(function () {
            document.getElementById('success').style.display = "none";
        }, 1500);
        return false;
    }
    return false;
}