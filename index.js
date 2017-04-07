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

    var url = window.location.href;
    var data = getUrlVars(url);

    data.new_password1 = new_password1;
    data.new_password2 = new_password2;

    postHttpChangePasswordRequest(data)
}

function postHttpChangePasswordRequest(data) {

    document.getElementById('error').style.display = 'none';

    var url = "https://rehive.com/api/3/auth/password/reset/confirm/";
    var method = "POST";
    var postData = data;
    var async = true;
    var request = new XMLHttpRequest();

    request.onload = function () {

        var responseText = JSON.parse(request.responseText);
        if(request.status == 200){
            document.getElementById('changePasswordForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('successMessage').innerHTML = responseText.message;
        } else{
            evaluateError(responseText.data);
        }
    };

    request.open(method, url, async);

    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify(postData));
}

function evaluateError(errors) {
    var errorText;
    for(var key in errors){
        if (errors.hasOwnProperty(key)) {
            errors[key].forEach(function(error){
                errorText = (key.charAt(0).toUpperCase() + key.slice(1)) + ": " + error;
                showError(errorText)
            })
        }
    }
}

function showError(error){
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = error;
}