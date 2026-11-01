// WPGraphQL for ACF actual devuelve imágenes como { node: {...} } y galerías como { nodes: [...] }.
// Los componentes se escribieron para la versión anterior (imagen directa con mediaItemUrl),
// así que los campos ACF se aplanan a esa forma antes de pasarlos a las plantillas.
// Solo se usa sobre campos ACF: las conexiones propias de WordPress (menús, posts) no se tocan.
export function aplanar(valor) {
	if (Array.isArray(valor)) return valor.map(aplanar);
	if (!valor || typeof valor !== "object") return valor;

	const claves = Object.keys(valor);
	if (claves.length === 1 && claves[0] === "node") return aplanar(valor.node);
	if (claves.length === 1 && claves[0] === "nodes") return aplanar(valor.nodes);

	return Object.fromEntries(claves.map((k) => [k, aplanar(valor[k])]));
}
