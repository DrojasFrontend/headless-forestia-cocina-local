import { notFound } from "next/navigation";
import Categoria from "@/plantillas/Categoria";
import { obtenerCategorias, obtenerEntradas, obtenerSitio } from "@/lib/wordpress/datos";

export const revalidate = 300;

// Las categorías se generan al primer visitante y quedan en caché (revalidate): generarlas todas en la build
// satura la base de datos del hosting compartido (pasó: «Error establishing a database connection»).
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const categoria = (await obtenerCategorias()).find(({ node }) => node.slug === slug);
	return categoria ? { title: `${categoria.node.name} | Blog`, alternates: { canonical: `/categoria/${slug}/` } } : {};
}

export default async function Pagina({ params }) {
	const { slug } = await params;
	const [sitio, categorias, entradas] = await Promise.all([obtenerSitio(), obtenerCategorias(), obtenerEntradas()]);
	if (!categorias.some(({ node }) => node.slug === slug)) notFound();
	const posts = entradas.filter(({ node }) => node.categories?.nodes?.some((c) => c.slug === slug));
	// La plantilla vieja leía las entradas en nodeByUri.posts.edges.
	return <Categoria slugActual={slug} data={{ ...sitio, categories: { edges: categorias }, nodeByUri: { posts: { edges: posts } } }} />;
}
