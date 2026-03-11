async function loadServicios() {
	const res = await fetch('/api/servicios');
	const parts = await res.json();

	const container = document.querySelector('#servicios');

	parts.forEach(p => {
		const card = `
			<div class="card">
				<div class="img-box">
					<img src="${p.image}">
					<span class="tag">TALLER</span>
				</div>
				<h3>${p.name}</h3>
				<a href="/contactos" class="btn-cita">Agendar una cita</a>
			</div>
			`;

		container.innerHTML += card;
	});
}

loadServicios();
