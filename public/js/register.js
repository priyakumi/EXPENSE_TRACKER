document.querySelector('#submit').addEventListener("click",
    async (e) => {
        e.preventDefault()
        const firstname = document.querySelector('#firstname').value.trim();
        const lastname = document.querySelector('#lastname').value.trim();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();

        if (firstname && lastname && email && password) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/dashboard/');
            } else {
                alert(response.statusText);
            }
        }
    })
