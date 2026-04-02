async function loadAppointments() {
	const res = await fetch('/api/services');
	const parts = await res.json();

	const container = document.querySelector('#service_type');
	const form = document.getElementById("formAppointment");

	parts.forEach(p => {
		const option = `<option value="${p.id}">${p.name}</option>`;

		container.innerHTML += option;
	})


	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('/api/appointments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},	
				body: JSON.stringify(data)
			});

			const result = await response.json();

			if (response.ok) {
				alert('Cita enviada con exito');
				form.reset();
			} else {
				alert('Error: ' + result.error);
			}
		} catch (err) {
			console.error("Error al enviar: ", err);
			alert('No se pudo conectar con el servidor')
		}
	})
}

function createCalendar() {
	const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
	const horas = ['08h00 a 09h00']
}

loadAppointments();
