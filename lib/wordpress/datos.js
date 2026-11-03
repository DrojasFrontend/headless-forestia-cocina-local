import { cache } from "react";
import { fetchGraphQL } from "./client";
import { aplanar } from "./aplanar";
import * as ACF from "./fragmentos-acf";

const MENU_ITEM = `
	id
	path
	label
	parentId
	cssClasses
	menu {
		node {
			name
		}
	}
`;

const SEO = `
	seo {
		title
		metaDesc
		canonical
		opengraphImage {
			mediaItemUrl
		}
	}
`;

const IMAGEN_DESTACADA = `
	featuredImage {
		node {
			id
			sourceUrl
			mediaItemUrl
			altText
			title
			caption
			mediaDetails {
				width
				height
			}
		}
	}
`;

// Lo que comparten todas las páginas: ajustes, opciones del tema y los 4 menús.
// Devuelve las mismas claves que consultaban las plantillas de Faust.
export const obtenerSitio = cache(async () => {
	const data = await fetchGraphQL(`
		query Sitio {
			generalSettings {
				title
				description
			}
			themeGeneralSettings {
				${ACF.OPTIONS}
			}
			headerMenuItems: menuItems(first: 50, where: { location: PRIMARY }) { nodes { ${MENU_ITEM} } }
			menuHeaderMenuItems: menuItems(first: 50, where: { location: MENUHEADER }) { nodes { ${MENU_ITEM} } }
			footerMenuItemsMain: menuItems(first: 50, where: { location: FOOTERMAIN }) { nodes { ${MENU_ITEM} } }
			footerMenuItems: menuItems(first: 50, where: { location: FOOTER }) { nodes { ${MENU_ITEM} } }
		}
	`);
	return { ...data, themeGeneralSettings: aplanar(data.themeGeneralSettings) };
});

// Página por URI con su grupo ACF. Devuelve { ...sitio, pageBy } como las plantillas viejas.
export const obtenerPagina = cache(async (uri, grupo) => {
	const fragmento = grupo ? ACF[grupo.toUpperCase()] : "";
	const [sitio, data] = await Promise.all([
		obtenerSitio(),
		fetchGraphQL(
			`
			query Pagina($uri: ID!) {
				page(id: $uri, idType: URI) {
					title
					content
					${IMAGEN_DESTACADA}
					${SEO}
					${fragmento}
				}
			}
		`,
			{ variables: { uri } }
		),
	]);
	if (!data.page) return null;
	return { ...sitio, pageBy: { ...data.page, ...(grupo ? { [grupo]: aplanar(data.page[grupo]) } : {}) } };
});

const ENTRADA_RESUMEN = `
	id
	databaseId
	title
	slug
	uri
	date
	excerpt
	${IMAGEN_DESTACADA}
	categories {
		nodes {
			name
			slug
		}
	}
`;

export const obtenerEntradas = cache(async () => {
	const data = await fetchGraphQL(`
		query Entradas {
			posts(first: 200, where: { status: PUBLISH }) {
				edges {
					node { ${ENTRADA_RESUMEN} }
				}
			}
		}
	`);
	return data.posts.edges;
});

export const obtenerCategorias = cache(async () => {
	const data = await fetchGraphQL(`
		query Categorias {
			categories(first: 50, where: { hideEmpty: true }) {
				edges {
					node {
						id
						name
						slug
						${ACF.POSTCATEGORIA}
					}
				}
			}
		}
	`);
	return data.categories.edges.map((e) => ({ node: { ...e.node, postCategoria: aplanar(e.node.postCategoria) } }));
});

export const obtenerEntrada = cache(async (slug) => {
	const data = await fetchGraphQL(
		`
		query Entrada($slug: ID!) {
			post(id: $slug, idType: SLUG) {
				${ENTRADA_RESUMEN}
				content
				author {
					node {
						name
					}
				}
				${SEO}
			}
		}
	`,
		{ variables: { slug } }
	);
	return data.post;
});

// Metadata de Next a partir del SEO de Yoast.
export function metadataDesdeSeo(seo, ruta = "/") {
	if (!seo) return {};
	const imagen = seo.opengraphImage?.mediaItemUrl;
	return {
		title: seo.title,
		description: seo.metaDesc || undefined,
		alternates: { canonical: ruta },
		openGraph: { title: seo.title, description: seo.metaDesc || undefined, images: imagen ? [imagen] : undefined },
		twitter: { card: "summary_large_image", title: seo.title, description: seo.metaDesc || undefined },
	};
}
