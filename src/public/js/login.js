function login() {
    const form = document.getElementById("formLogin");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('isAdmin', result.isAdmin);
                
                console.log('Login exitoso');

                window.location.href = '/admin/dashboard'; 
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err) {
            console.error("Error al enviar: ", err);
            alert('No se pudo conectar con el servidor');
        }
    });
}

login();
