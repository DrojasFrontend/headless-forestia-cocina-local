const endpoint = process.env.WORDPRESS_GRAPHQL_URL;

// Caché de los datos de WordPress, en segundos: un solo lugar para cambiarla.
export const REVALIDATE_POR_DEFECTO = 300;

export async function fetchGraphQL(query, { variables = {}, revalidate = REVALIDATE_POR_DEFECTO } = {}) {
	if (!endpoint) {
		throw new Error("Falta configurar WORDPRESS_GRAPHQL_URL en las variables de entorno.");
	}

	const res = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query, variables }),
		next: { revalidate },
	});

	if (!res.ok) {
		throw new Error(`WPGraphQL respondió con estado ${res.status}: ${await res.text()}`);
	}

	const { data, errors } = await res.json();

	if (errors?.length) {
		throw new Error(`WPGraphQL devolvió errores: ${errors.map((e) => e.message).join(" | ")}`);
	}

	return data;
}
