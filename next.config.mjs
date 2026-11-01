/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: ["node_modules"],
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
