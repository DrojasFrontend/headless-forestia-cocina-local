import { obtenerCategorias, obtenerEntradas } from "@/lib/wordpress/datos";

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forestiacocinalocal.com";
const PAGINAS = ["/", "/galeria/", "/contacto/", "/ubicacion/", "/preguntas-frecuentes/", "/blog/"];

export const revalidate = 3600;

export default async function sitemap() {
	const [entradas, categorias] = await Promise.all([obtenerEntradas(), obtenerCategorias()]);
	return [
		...PAGINAS.map((ruta) => ({ url: `${SITIO}${ruta}` })),
		...entradas.map(({ node }) => ({ url: `${SITIO}/${node.slug}/`, lastModified: node.date })),
		...categorias.map(({ node }) => ({ url: `${SITIO}/categoria/${node.slug}/` })),
	];
}
