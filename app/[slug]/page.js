import { notFound } from "next/navigation";
import Entrada from "@/plantillas/Entrada";
import { metadataDesdeSeo, obtenerEntrada, obtenerEntradas, obtenerSitio } from "@/lib/wordpress/datos";

export const revalidate = 300;

// Las entradas se generan al primer visitante y quedan en caché (revalidate): generarlas todas en la build
// satura la base de datos del hosting compartido (pasó: «Error establishing a database connection»).
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const post = await obtenerEntrada(slug);
	return post ? metadataDesdeSeo(post.seo, `/${slug}/`) : {};
}

export default async function Pagina({ params }) {
	const { slug } = await params;
	const [sitio, post, entradas] = await Promise.all([obtenerSitio(), obtenerEntrada(slug), obtenerEntradas()]);
	if (!post) notFound();
	const recientes = entradas.filter(({ node }) => node.slug !== slug).slice(0, 4);
	return <Entrada data={sitio} post={post} recentPosts={recientes} />;
}
