

document.getElementById('login').addEventListener('click', function (e) {

    e.preventDefault()
    console.log("clicked");
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email == "fabio@gmail.com" && password == "123456") {
        document.location.replace('/dashboard/');
    } else { return alert("Wrong email or password"); }


});