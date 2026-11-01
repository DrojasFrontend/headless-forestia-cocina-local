import { notFound } from "next/navigation";
import Blog from "@/plantillas/Blog";
import { metadataDesdeSeo, obtenerCategorias, obtenerEntradas, obtenerPagina } from "@/lib/wordpress/datos";

export const revalidate = 300;

export async function generateMetadata() {
	const data = await obtenerPagina("/blog/", "paginaBlog");
	return metadataDesdeSeo(data?.pageBy?.seo, "/blog/");
}

export default async function Pagina() {
	const [data, categorias, entradas] = await Promise.all([
		obtenerPagina("/blog/", "paginaBlog"),
		obtenerCategorias(),
		obtenerEntradas(),
	]);
	if (!data) notFound();
	// La plantilla vieja leía la página en `page` y las categorías en `categories.edges`.
	return <Blog data={{ ...data, page: data.pageBy, categories: { edges: categorias } }} posts={entradas} />;
}
