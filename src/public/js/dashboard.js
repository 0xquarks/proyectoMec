async function loadServices() {
	try {
		const res = await fetch('/api/services');
		const services = await res.json();

		const container = document.querySelector('#services-table');

		container.innerHTML = '';

		services.forEach(service => {
			const row = `
				<tr>
					<td>${service.id}</td>
					<td>${service.name}</td>
					<td>
						<button class="btn btn-edit" data-id="${service.id}">Editar</button>
						<button class="btn btn-delete" data-id="${service.id}">Eliminar</button>
					</td>
				</tr>
			`;

			container.insertAdjacentHTML('beforeend', row);
		});
	} catch (err) {
		console.error('Error cargando servicios:', err);
	}
}

async function loadSpareParts() {
	try {
		const res = await fetch('/api/spare-parts')
		const spareParts = await res.json();

		const tbody = document.getElementById('sparePartsTable');

		tbody.innerHTML = '';

		spareParts.forEach(sparePart => {
			const row = `
				<tr>
					<td>${sparePart.id}</td>
					<td>${sparePart.type}</td>
					<td>${sparePart.name}</td>
					<td>${sparePart.description}</td>
					<td>${sparePart.brand_name}</td>
					<td>
                        <button class="btn btn-edit" data-id="${sparePart.id}">Editar</button>
                        <button class="btn btn-delete" data-id="${sparePart.id}">Eliminar</button>
                    </td>

				</tr>
			`;

			tbody.insertAdjacentHTML('beforeend', row);
		});
	} catch (err) {
		console.log('Error cargando repuestos: ', err)
	}
}

async function loadStats() {
	try {
		const [servicesRes, sparePartsRes, appointmentsRes] = await Promise.all([
			fetch('/api/services'),
			fetch('/api/spare-parts'),
			fetch('/api/appointments')
		]);

		const services = await servicesRes.json();
		const spareParts = await sparePartsRes.json();
		const appointments = await appointmentsRes.json();

		document.getElementById('stat-services').textContent = services.length || 0;
		document.getElementById('stat-spareparts').textContent = spareParts.length || 0;
		document.getElementById('stat-appointments').textContent = appointments.length || 0;

	} catch (err) {
		console.error('Error cargando estadísticas:', err);
	}
}

async function loadAppointments() {
	try {
		const res = await fetch('/api/appointments');
		const appointments = await res.json();

		const tbody = document.getElementById('appointmentsTable');
		
		tbody.innerHTML = '';

		appointments.forEach(appointment => {
			const row = `
				<tr>
					<td>${appointment.id}</td>
					<td>${appointment.customer_name}</td>
					<td>${appointment.phone}</td>
					<td>${appointment.email}</td>
					<td>${appointment.brand}</td>
					<td>${appointment.model}</td>
					<td>${appointment.year}</td>
					<td>${appointment.license_plate}</td>
					<td>${appointment.mileage}</td>
					<td>${appointment.service}</td>
					<td>${appointment.comment}</td>
					<td>
                        <button class="btn btn-edit" data-id="${appointment.id}">Editar</button>
                        <button class="btn btn-delete" data-id="${appointment.id}">Eliminar</button>
                    </td>
				</tr>
			`;

			tbody.insertAdjacentHTML('beforeend', row);
		});
	} catch (err) {
		console.error('Error cargando appointments: ', err)
	}
}

async function loadAll() {
	const links = document.querySelectorAll(".sidebar a");
	const sections = document.querySelectorAll(".card");

	links.forEach(link => {
		link.addEventListener("click", (e) => {
			e.preventDefault();

			const targetId = link.getAttribute("href").substring(1);

			sections.forEach(sec => sec.classList.remove("active"));

			const targetSection = document.getElementById(targetId);
			if (targetSection) {
				targetSection.classList.add("active");
			}
		});
	});

	await loadStats();
	await loadServices();
	await loadSpareParts();
	await loadAppointments()
}

async function delService(e) {
	if (!e.target.classList.contains("btn-delete")) return;

	const id = e.target.dataset.id;

	const confirmDelete = confirm("¿Seguro que quieres eliminar este servicio?");
	if (!confirmDelete) return;

	try {
		e.target.textContent = "Eliminando...";
		e.target.disabled = true;

		const res = await fetch(`/api/services/${id}`, {
			method: "DELETE"
		});

		if (!res.ok) {
			throw new Error("Error al eliminar");
		}

		const row = e.target.closest("tr");
		row.remove();

	} catch (err) {
		console.error(err);
		alert("No se pudo eliminar el servicio");
	} finally {
		e.target.textContent = "Eliminar";
		e.target.disabled = false;
	}
}

document.getElementById("services-table")
	.addEventListener("click", delService);

document.addEventListener('DOMContentLoaded', loadAll);
