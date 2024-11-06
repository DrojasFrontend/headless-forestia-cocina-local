import "../faust.config";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "@faustwp/core/dist/css/toolbar.css";
import "../styles/global.scss";
import Script from "next/script";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const gtmId = process.env.NEXT_PUBLIC_GTM_ID; // Usamos una variable de entorno para el GTM ID

		if (gtmId) {
			TagManager.initialize({ gtmId }); // Inicializa GTM
		}
	}, []);

	return (
		<ApolloProvider client={client}>
			<FaustProvider pageProps={pageProps}>
				<Script id="gtm" strategy="afterInteractive">
					{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T9R26JTF');
      `}
				</Script>
				<Component {...pageProps} key={router.asPath} />
			</FaustProvider>
		</ApolloProvider>
	);
}
