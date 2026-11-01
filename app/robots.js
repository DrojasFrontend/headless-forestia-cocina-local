const SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forestiacocinalocal.com";

export default function robots() {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `${SITIO}/sitemap.xml`,
	};
}
