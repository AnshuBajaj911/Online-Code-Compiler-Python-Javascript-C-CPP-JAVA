var selectedLanguage; //Global Variable so that easy to handle


function languageSelector() { //WORKING FINE 


    if (document.getElementById("python").selected) selectedLanguage = "0";
    else if (document.getElementById("javascript").selected) selectedLanguage = "4";
    else if (document.getElementById("c").selected) selectedLanguage = "7";
    else if (document.getElementById("cpp").selected) selectedLanguage = "77";
    else if (document.getElementById("java").selected) selectedLanguage = "8";
    else return 0;

    return 1;


}

function compile() {

    if (languageSelector()) {

        var code = document.getElementById("code").value;


        compileCode(code, selectedLanguage);


    }
    else {

    }
}



var cid;

function compileCode(code, langId) {
    var request = new XMLHttpRequest()

    request.open("POST", "https://codequotient.com/api/executeCode", true);
    request.setRequestHeader("Content-type", "application/json");




    let body = JSON.stringify({ "code": code, "langId": langId });

    request.send(body);


    request.addEventListener("load", function (event) {

        var a = request.responseText;

        console.log(a);
        var b = JSON.parse(a);
        if (b.codeId === undefined) alert("still undefined");
        else {
            document.getElementById("output").innerHTML = "Loading...";
            cid = b.codeId;
            // console.log(b.error);
            //alert(b.codeId);
            // console.log(b.codeId);
            //  console.log(selectedLanguage);
            //alert();

            setTimeout(function () {

                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "https://codequotient.com/api/codeResult/" + cid);
                xhttp.send();
                setTimeout(function () {



                    console.log(xhttp.responseText);
                    a11 = xhttp.responseText;
                    var a12 = JSON.parse(a11);
                    console.log(typeof a12, a12);
                    var b11 = a12.data;
                    console.log(typeof b11, JSON.parse(b11));
                    var c11 = JSON.parse(b11);

                    console.log(c11.output + "       " + c11.errors);

                    document.getElementById("output").innerHTML = c11.output + "     " + c11.errors;

                }, 5000);
            }, 3000);

            /*
               xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                   
                  console.log(this.responseText);
                a11=this.responseText;
                var a12=JSON.parse(a11);
               console.log(typeof a12,a12);
               var b11 = a12.data;
               console.log(typeof b11,JSON.parse(b11));
               var c11 = JSON.parse(b11);
               console.log(c11.output + "       "+c11.errors);
              // console.log(JSON.parse(a12.output));
                document.getElementById("output").innerHTML =  c11.output + "     " + c11.errors ;
              }
            };
          */
        }




    });
}