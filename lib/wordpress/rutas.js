import { notFound } from "next/navigation";
import { metadataDesdeSeo, obtenerPagina } from "./datos";

// Páginas fijas: cada una es { uri, grupo ACF, plantilla }. Devuelve el page.js y generateMetadata.
export function paginaFija(uri, grupo, Plantilla) {
	async function Pagina() {
		const data = await obtenerPagina(uri, grupo);
		if (!data) notFound();
		return <Plantilla data={data} />;
	}
	async function generateMetadata() {
		const data = await obtenerPagina(uri, grupo);
		return metadataDesdeSeo(data?.pageBy?.seo, uri);
	}
	return { Pagina, generateMetadata };
}
