import Script from "next/script";
import { obtenerSitio } from "@/lib/wordpress/datos";
import "@/styles/vendor/wp-block-library.css";
import "@/styles/vendor/wp-block-library-theme.css";
import "@/styles/global.scss";

const GTM_ID = "GTM-T9R26JTF";

export async function generateMetadata() {
	const sitio = await obtenerSitio();
	const favicon = sitio.themeGeneralSettings?.options?.favicon?.mediaItemUrl;
	return {
		metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
		title: sitio.generalSettings?.title,
		description: sitio.generalSettings?.description || undefined,
		icons: favicon ? { icon: favicon } : undefined,
		verification: { google: "kIrRZ8SfE0YMixMItktR8EBfaTmelZVAhWh6TMsAsJk" },
	};
}

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body>
				<Script id="gtm" strategy="afterInteractive">
					{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
				</Script>
				{children}
			</body>
		</html>
	);
}
