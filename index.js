if(window.location.href.indexOf('?') == -1){
window.history.replaceState(null, null,  window.location.href+ "?uid=NDUx&token=4kz-f8c949069cfe163de406");
}

function getUrlVars() {

    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function changePassword() {

    var new_password1 = document.getElementById('id_new_password1').value;
    var new_password2 = document.getElementById('id_new_password2').value;
    if(new_password1 !== new_password2)
    {
        //return;
    }

    var url = window.location.href;
    var data = getUrlVars(url);

    data.new_password1 = new_password1;
    data.new_password2 = new_password2;


    console.log(data);
    postHttpChangePasswordRequest(data)

}

function postHttpChangePasswordRequest(data) {
    var url = "https://rehive.com/api/3/auth/password/reset/confirm/";
    var method = "POST";
    var postData = data;

    var async = true;

    var request = new XMLHttpRequest();

    request.onload = function () {

        console.log(request);


        // You can get all kinds of information about the HTTP response.
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
        showError(data);
    };

    request.open(method, url, async);

    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify(postData));
}

function showError(error){
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = error.message;
}