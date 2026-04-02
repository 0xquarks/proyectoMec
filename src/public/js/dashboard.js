const loadedSections = new Set();
let sparePartsCache = null;
const sparePartSelect = document.getElementById('spare-part-type');

async function loadSection() {
	document.querySelector('.sidebar').addEventListener('click', async (e) => {
		const link = e.target.closest('a');
		
		if (!link) return;

		e.preventDefault();

		const targetId = link.getAttribute('href').substring(1);

		document.querySelectorAll('.card')
			.forEach(sec => sec.classList.remove('active'));

		const targetSection = document.getElementById(targetId);

		if (targetSection) {
			targetSection.classList.add('active');
		}

		if (!loadedSections.has(targetId)) {
			await loadSectionData(targetId);
			loadedSections.add(targetId);
		}
	});

	const first = document.querySelector('.sidebar a');
	if (first) {
		first.click();
	}
}

async function loadSectionData(section) {
	switch (section) {
		case 'services':
			await loadComponent('services');
			break;
		case 'spare-parts':
			await loadComponent('spare-parts');
			break;
		case 'appointments':
			await loadComponent('appointments');
			break;
		case 'stats':
			await loadStats();
			break;
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

async function loadComponent(type) {
	try {
		const res = await fetch(`/api/${type}`);
		const data = await res.json();

		const container = document.querySelector(`#${type}-table`);

		container.innerHTML = data.map(d => createRow(type, d)).join('');	
	} catch (err) {
		console.error(`Error cargando  ${type}: `, err);
	}
}

function createRow(type, d) {
	const buttons = `
		<td>
			<button class="btn btn-edit" data-id="${d.id}" data-type="${type}">Editar</button>
			<button class="btn btn-delete" data-id="${d.id}" data-type="${type}">Eliminar</button>
		</td>
	`

	switch (type) {
		case 'services':
			return `
				<tr >
					<td data-field="id">${d.id}</td>
					<td class="editable" data-field="name">${d.name}</td>
					${buttons}
				</tr>
			`;
		case 'appointments':
			return `
				<tr >
					<td>${d.id}</td>
					<td>${d.customer_name}</td>
					<td>${d.phone}</td>
					<td>${d.email}</td>
					<td>${d.brand}</td>
					<td>${d.model}</td>
					<td>${d.vehicle_year}</td>
					<td>${d.license_plate}</td>
					<td>${d.mileage}</td>
					<td>${d.service}</td>
					<td>${d.comment}</td>
					<td>${d.appointment_status}</td>
					<td>
						<button onclick="handleAction('${d.token}', 'A')">Aceptar</button>
			            <button onclick="handleAction('${d.token}', 'R')">Rechazar</button>
						<button class="btn btn-delete" data-id="${d.id}" data-type="${type}">Eliminar</button>
					</td>
				</tr>
			`;
		case 'spare-parts':
			return `
				<tr>
					<td data-field="id">${d.id}</td>
					<td class="editable" data-field="type">${d.type}</td>
					<td class="editable" data-field="name">${d.name}</td>
					<td class="editable" data-field="description">${d.description}</td>
					<td class="editable" data-field="brand_name">${d.brand_name}</td>
					${buttons}
				</tr>
			`;
	}
}

async function handleAction(token, status) {
	try {
		const res = await fetch('/api/appointments/status-update', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, status })
		});

		const result = await res.json();
		
		console.log(result);

		if (!result.success) {
			alert(result.error);
			loadComponent('appointments'); 
		}
	} catch (err) {
		console.error(err);
		alert('No se puedo modificar el estado de la cita')
	}
}

async function deleteRow(btn) {
	const id = btn.dataset.id;
	const type = btn.dataset.type;

	const confirmDelete = confirm("¿Seguro que quieres eliminar?");

	if (!confirmDelete) return;

	try {
		btn.textContent = 'Eliminando...';
		btn.disabled = true;

		const res = await fetch(`/api/${type}/${id}`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			throw new Error('Error al eliminar');
		}

		const row = btn.closest('tr');
		row.remove();
	} catch (err) {
		console.error(err);
		alert('No se pudo eliminar el servicio');
	} finally {
		btn.textContent = 'Eliminar';
		btn.disabled = false;
	}
}

async function handleCreate(btn) {
	const modal = btn.closest('.modal');
	const section = btn.closest('section');

	const type = section.id;
	
	let endpoint = `/api/${type}`;
	let isFileUpload = false;

	if (modal.id === 'modal-spare-part-type') {
		endpoint = '/api/spare-parts-types';
	}

	const inputs = modal.querySelectorAll('input, select');

	const data = {};
	const formData = new FormData();

	for (const input of inputs) {
		if (input.type === 'file') {
			const file = input.files[0];
			if (!file) {
				alert('Complete los campos');
				return;
			}
			formData.append(input.name, file);
			isFileUpload = true;
		} else {
			const value = input.value.trim();
			if (!value) {
				alert('Complete los campos');
				return;
			}
			formData.append(input.name, value);
			data[input.name] = value;
		}
	}

	try {
		const res = await fetch(endpoint, {
			method: 'POST',
			headers: isFileUpload
				? undefined
				: { 'Content-Type': 'application/json' },
			body: isFileUpload
				? formData
				: JSON.stringify(data)
		});

		if (!res.ok) throw new Error('Error al crear');

		modal.classList.add('hidden');

		alert('Creado correctamente');

		await loadComponent(type);
	} catch (err) {
		console.error(err);
		alert("Error al crear");
	}
}

function restoreButtons(row) {
	const saveBtn = row.querySelector('.btn-save, .btn-edit');
	const cancelBtn = row.querySelector('.btn-cancel, .btn-delete');

	if (saveBtn && saveBtn.dataset.originalText) {
		saveBtn.textContent = saveBtn.dataset.originalText;
		saveBtn.classList.remove('btn-save');
		saveBtn.classList.add('btn-edit');
	}

	if (cancelBtn && cancelBtn.dataset.originalText) {
		cancelBtn.textContent = cancelBtn.dataset.originalText;
		cancelBtn.classList.remove('btn-cancel');
		cancelBtn.classList.add('btn-delete');
	}
}
async function toggleFields(fields, editable = true) {
	if (!fields) return;

	for (const field of fields) {
		const key = field.dataset.field;

		if (key === 'type') {
			if (editable) {
				if (!sparePartsCache) {
					try {
						const res = await fetch('/api/spare-parts-types');
						if (!res.ok) throw new Error();
						sparePartsCache = await res.json();
					} catch (err) {
						console.error(err);
						alert('No se pudieron cargar los tipos de repuesto');
						continue;
					}
				}

				const currentText = field.textContent.trim();
				const select = document.createElement('select');

				for (const type of sparePartsCache) {
					const option = document.createElement('option');
					option.value = type.id;
					option.textContent = type.name;
					if (type.name === currentText) option.selected = true;
					select.appendChild(option);
				}

				field.innerHTML = '';
				field.appendChild(select);
				continue;
			} else {
				const select = field.querySelector('select');
				if (select) field.textContent = select.options[select.selectedIndex].text;
				field.classList.remove('editing');
				field.contentEditable = false;
				continue;
			}
		}

		if (editable) field.dataset.original = field.textContent;
		field.contentEditable = editable;
		field.classList.toggle('editing', editable);
	}
}

function restoreFields(fields) {
	fields.forEach(field => {
		const select = field.querySelector('select');
		if (select) {
			field.textContent = select.options[select.selectedIndex].text;
		} else if (field.dataset.original !== undefined) {
			field.textContent = field.dataset.original;
		}

		field.contentEditable = false;
		field.classList.remove('editing');
	});
}

function toggleModal(modal, show) {
	if (!modal) return;

	if (show === undefined) {
		modal.classList.toggle('hidden'); 
	} else {
		modal.classList.toggle('hidden', !show);
	}
}

async function getSparePartsType() {
	if (!sparePartsCache) {
		try {
			const res = await fetch('/api/spare-parts-types');
			if (!res.ok) throw new Error();

			sparePartsCache = await res.json();
		} catch (err) {
			console.error(err);
			alert('No se pudieron cargar los tipos');
		}
	}

	renderTypes(sparePartsCache);
}

function renderTypes(types) {
	if (sparePartSelect.children.length > 0) return;

	const placeholder = document.createElement('option');
	placeholder.value = "";
	placeholder.textContent = "Seleccione un tipo";
	placeholder.disabled = true;
	placeholder.selected = true;
	sparePartSelect.appendChild(placeholder);

	types.forEach(t => {
		const option = document.createElement('option');
		option.value = t.id;
		option.textContent = t.name;
		sparePartSelect.appendChild(option);
	});
}

function editRow(row) {
	const fields = row.querySelectorAll('.editable');
	toggleFields(fields, true);
	fields[0]?.focus();

	const saveBtn = row.querySelector('.btn-edit');
	if (saveBtn && !saveBtn.dataset.originalText) saveBtn.dataset.originalText = saveBtn.textContent;

	const delBtn = row.querySelector('.btn-delete');
	if (delBtn && !delBtn.dataset.originalText) delBtn.dataset.originalText = delBtn.textContent;

	if (saveBtn) {
		saveBtn.textContent = 'Guardar';
		saveBtn.classList.replace('btn-edit', 'btn-save');
	}

	if (delBtn) {
		delBtn.textContent = 'Cancelar';
		delBtn.classList.replace('btn-delete', 'btn-cancel');
	}
}

async function saveRow(row) {
	const section = row.closest('section');
	const type = row.dataset.type || section?.id;
	const saveBtn = row.querySelector('.btn-save');
	if (!type || !saveBtn) return;

	const id = saveBtn.dataset.id;
	if (!id) return;

	const fields = row.querySelectorAll('.editable');
	const data = {};

	fields.forEach(field => {
		const key = field.dataset.field;
		if (key === 'type') {
			const select = field.querySelector('select');
			if (select) {
				data[key] = select.value;
				field.textContent = select.options[select.selectedIndex].text;
			}
		} else {
			data[key] = field.textContent.trim();
		}
	});

	toggleFields(fields, false);

	try {
		const res = await fetch(`/api/${type}/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		if (!res.ok) throw new Error('Error al guardar');

		alert('Guardado correctamente');
		restoreButtons(row);
	} catch (err) {
		console.error(err);
		alert('Error al guardar');
		restoreFields(fields);
		restoreButtons(row);
	}
}

function cancelEdit(row) {
	const fields = row.querySelectorAll('.editable');
	restoreFields(fields);
	restoreButtons(row);
}

async function handleRowClick(e) {
	const btn = e.target.closest('button');
	if (!btn) return;

	const row = btn.closest('tr');
	if (!row) return;

	if (btn.classList.contains('btn-edit')) {
		editRow(row);
	} else if (btn.classList.contains('btn-save')) {
		await saveRow(row);
	} else if (btn.classList.contains('btn-cancel')) {
		cancelEdit(row);
	} else if (btn.classList.contains('btn-delete')) {
		await deleteRow(btn);
	}
}

function handleEnterKey(e) {
	if (e.key !== 'Enter') return;

	const field = e.target.closest('.editable');
	if (!field || !field.isContentEditable) return;

	const row = field.closest('tr');
	if (!row) return;

	const saveBtn = row.querySelector('.btn-save');
	if (!saveBtn) return;

	saveBtn.click(); // disparar click de guardar
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
	await fetch('/api/logout', { method: 'POST' });
	window.location.href = '/login';
});
document.addEventListener('click', handleRowClick);
document.addEventListener('keydown', handleEnterKey);
document.addEventListener('click', async (e) => {
	const addTypeBtn = e.target.closest('.btn-add-type');

	if (addTypeBtn) {
		const modal = document.getElementById('modal-spare-part-type');
		toggleModal(modal, true);
		return;
	}
})

document.addEventListener('click', async (e) => {
	const closeBtn = e.target.closest('.close-btn');
	if (closeBtn) {
		const modal = closeBtn.closest('.modal');
		toggleModal(modal, false);
		return;
	}

	const saveBtn = e.target.closest('.save-btn');
	if (saveBtn) {
		await handleCreate(saveBtn);
		return;
	}

	const addBtn = e.target.closest('.btn-add');
	if (addBtn) {
		const section = addBtn.closest('section');
		const type = section?.id;

		if (type === 'spare-parts') {
			await getSparePartsType();
		}

		const map = {
			"services": "modal-service",
			"spare-parts": "modal-spare-part" 
		};

		const modal = document.getElementById(map[type]);
		toggleModal(modal, true);

		return;
	}

});

document.addEventListener('DOMContentLoaded', loadSection);
