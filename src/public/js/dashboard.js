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
					<td class="service-name">${service.name}</td>
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
					<td class="editable" data-field="id">${sparePart.id}</td>
					<td class="editable" data-field="type">${sparePart.type}</td>
					<td class="editable" data-field="name">${sparePart.name}</td>
					<td class="editable" data-field="description">${sparePart.description}</td>
					<td class="editable" data-field="brand_name">${sparePart.brand_name}</td>
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

async function delAppointment(e) {
	if (!e.target.classList.contains("btn-delete")) return;

	const id = e.target.dataset.id;

	const confirmDelete = confirm("¿Seguro que quieres eliminar este appointment?");
	if (!confirmDelete) return;

	try {
		e.target.textContent = "Eliminando...";
		e.target.disabled = true;

		const res = await fetch(`/api/appointments/${id}`, {
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

async function delSparePart(e) {
	if (!e.target.classList.contains("btn-delete")) return;

	const id = e.target.dataset.id;

	const confirmDelete = confirm("¿Seguro que quieres eliminar este repuesto?");
	if (!confirmDelete) return;

	try {
		e.target.textContent = "Eliminando...";
		e.target.disabled = true;

		const res = await fetch(`/api/spare-parts/${id}`, {
			method: "DELETE"
		});

		if (!res.ok) {
			throw new Error("Error al eliminar");
		}

		const row = e.target.closest("tr");
		row.remove();

	} catch (err) {
		console.error(err);
		alert("No se pudo eliminar el repuesto");
	} finally {
		e.target.textContent = "Eliminar";
		e.target.disabled = false;
	}
}

document.querySelector("#modal-service .save-btn").addEventListener("click", async () => {
	const name = document.getElementById("service-name").value;
	const fileInput = document.getElementById("service-image");

	const file = fileInput.files[0];

	if (!name || !file) {
		alert("Complete los campos");
		return;
	}

	const formData = new FormData();
	formData.append("name", name);
	formData.append("image", file);

	try {
		await fetch("/api/services", {
			method: "POST",
			body: formData 
		});

		document.getElementById("modal-service").classList.add("hidden");
		loadServices();
	} catch (err) {
		console.error(err);
		alert("Error al crear el servicio");
	}
})

document.querySelector("#modal-spare-part .save-btn").addEventListener("click", async () => {
	const name = document.getElementById("spare-part-name").value;
	const type = document.getElementById("spare-part-type").value;
	const fileInput = document.getElementById("spare-part-file");
	const description = document.getElementById("spare-part-description").value;
	const brand = document.getElementById("spare-part-brand").value;

	const file = fileInput.files[0];

	if (!name || !type || !file || !description || !brand) {
		alert("Complete los campos");
		return;
	}

	const formData = new FormData();
	formData.append("name", name);
	formData.append("type", type);
	formData.append("image", file);
	formData.append("description", description);
	formData.append("brand", brand);

	console.log(formData);

	try {
		const res = await fetch("/api/spare-parts", {
			method: "POST",
			body: formData
		})

		if (!res.ok) {
			throw new Error("Error al crear un repuesto")
		}

		document.getElementById("modal-spare-part").classList.add("hidden");
		loadSpareParts();

		alert("Repuesto creado correctamente");
	} catch (err) {
		console.error(err);
		alert("Error al crear repuesto");
	}
});

document.querySelector("#repuestos .btn-add").addEventListener("click", () => {
    getSparePartsType();
});

async function getSparePartsType() {
    try {
        const res = await fetch('/api/spare-parts-types');
        if (!res.ok) throw new Error("Error al obtener tipos de repuesto");

        const types = await res.json();
        const select = document.getElementById('spare-part-type');

        select.innerHTML = '';

        types.forEach(t => {
            const option = document.createElement('option');
            option.value = t.id;
            option.textContent = t.name;
            select.appendChild(option);
        });
    } catch (err) {
        console.error(err);
        alert('No se pudieron cargar los tipos de repuesto');
    }
}

document.getElementById("services-table").addEventListener("click", (e) => {
	if (e.target.classList.contains("btn-edit")) {
		const row = e.target.closest("tr");
		const td = row.querySelector(".service-name");

		td.setAttribute("contenteditable", "true");
		td.focus();
	}
})


document.getElementById("services-table").addEventListener("keydown", async (e) => {
	if (e.key === "Enter" && e.target.hasAttribute("contenteditable")) {

		e.preventDefault();

		const td = e.target;
		const row = td.closest("tr");
		const id = row.querySelector(".btn-edit").dataset.id;
		const newName = td.textContent.trim();

		td.removeAttribute("contenteditable");

		if (!newName) return;

		try {
			const res = await fetch(`/api/services/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newName })
			});

			if (!res.ok) {
				throw new Error("Error al actualizar");
			}

			alert("Actualizado correctamente");
		} catch (err) {
			console.error(err);
			alert("Error al actualizar");

			td.textContent = td.dataset.original;
		}
	}
});

const table = document.getElementById("sparePartsTable");

table.addEventListener("click", (e) => {
	if (e.target.classList.contains("btn-edit")) {
		const row = e.target.closest("tr");
		const tds = row.querySelectorAll("td.editable");

		tds.forEach(td => {
			td.dataset.original = td.textContent; // guarda valor original
			td.setAttribute("contenteditable", "true");
			td.classList.add("editing"); // opcional: para marcar visualmente
		});

		if (tds.length > 0) tds[0].focus();

		// cambiar botón a "Guardar"
		e.target.textContent = "Guardar";
		e.target.classList.remove("btn-edit");
		e.target.classList.add("btn-save");
	}
});

table.addEventListener("click", async (e) => {
	console.log(e.target);
	if (e.target.classList.contains("btn-save")) {
		const row = e.target.closest("tr");
		const tds = row.querySelectorAll("td.editable");
		const id = e.target.dataset.id;

		const updatedData = {};
		tds.forEach(td => {
			const key = td.dataset.field; // por ejemplo: <td class="editable" data-field="name">
			updatedData[key] = td.textContent.trim();
			td.removeAttribute("contenteditable");
			td.classList.remove("editing");
		});

		console.log(updatedData);

		try {
			const res = await fetch(`/api/spare-parts/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedData)
			});

			if (!res.ok) throw new Error("Error al actualizar");

			alert("Actualizado correctamente");
			// volver botón a Editar
			e.target.textContent = "Editar";
			e.target.classList.remove("btn-save");
			e.target.classList.add("btn-edit");

		} catch (err) {
			console.error(err);
			alert("Error al actualizar");

			// revertir a valores originales
			tds.forEach(td => td.textContent = td.dataset.original);
		}
	}
});

document.querySelector("#repuestos .btn-add").addEventListener("click", () => {
	const modal = document.getElementById("modal-spare-part");

	document.getElementById("spare-part-name").value = "";

	modal.classList.remove("hidden");
});

document.querySelector("#servicios .btn-add").addEventListener("click", () => {
	console.log("test");
	const modal = document.getElementById("modal-service");

	document.getElementById("service-name").value = "";
	document.getElementById("service-image").value = "";

	modal.classList.remove("hidden");
});
document.querySelector("#modal-spare-part .close-btn").addEventListener("click", () => {
	document.getElementById("modal-spare-part").classList.add("hidden");
});

document.querySelector("#modal-service .close-btn").addEventListener("click", () => {
	document.getElementById("modal-service").classList.add("hidden");
});

document.getElementById("appointmentsTable")
	.addEventListener("click", delAppointment);
document.getElementById("sparePartsTable")
	.addEventListener("click", delSparePart);
document.getElementById("services-table")
	.addEventListener("click", delService);

document.addEventListener('DOMContentLoaded', loadAll);
