import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Mismas URLs que el sitio anterior (/contacto/, /<entrada>/).
	trailingSlash: true,
	// Hosting compartido: pocas consultas a WordPress en paralelo durante la build.
	experimental: { cpus: 1, staticGenerationMaxConcurrency: 2 },
	sassOptions: {
		// Los SCSS importan "styles/..." desde la raíz del proyecto.
		includePaths: [path.join(process.cwd(), "node_modules"), process.cwd()],
		loadPaths: [path.join(process.cwd(), "node_modules"), process.cwd()],
		quietDeps: true,
		silenceDeprecations: ["import", "global-builtin", "color-functions", "legacy-js-api", "if-function"],
	},
	images: {
		qualities: [75, 100],
		remotePatterns: [{ protocol: "https", hostname: "**.hostingersite.com" }],
	},
	async rewrites() {
		// /wp-content/* del WordPress (PDFs, imágenes enlazadas en el contenido). public/ tiene prioridad.
		return process.env.WORDPRESS_URL
			? [{ source: "/wp-content/:path*", destination: `${process.env.WORDPRESS_URL}/wp-content/:path*` }]
			: [];
	},
};

export default nextConfig;
