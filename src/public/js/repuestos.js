async function loadSpareParts() {
	const res = await fetch('/api/repuestos');
	const parts = await res.json();

	const container = document.querySelector('#aceites');

	parts.forEach(p => {
		const card = `
			<div class="card">
				<img src="${p.image}">
				<div class="contenido">
					<h3>${p.name}</h3>
					<p>${p.description}</p>
					<span>Marca: ${p.brand}</span>
				</div>
			</div>
			`;

		container.innerHTML += card;
	});
}

loadSpareParts();
