async function loadSpareParts() {
	const res = await fetch('/api/repuestos');
	const parts = await res.json();

	for (const category in parts) {
		const listParts = parts[category];

		const container = document.querySelector('#' + category.toLowerCase());

		for (const p of listParts) {
			const card = `
				<div class="card">
					<img src="${p.image}">
					<div class="contenido">
						<h3>${p.name}</h3>
						<p>${p.description}</p>
						<span>Marca: ${p.brand_name}</span>
					</div>
				</div>
			`;

			container.innerHTML += card;
			
		};
		
	}

}

loadSpareParts();
