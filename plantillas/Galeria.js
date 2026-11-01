"use client";

import { useState } from "react";
import { Footer, Main } from "@/components";

import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { HeroCarusel } from "@/components/UI/Heros/HeroCarusel";
import { Gallery } from "@/components/UI/Galleries/Gallery";

export default function Component(props, pageProps) {
	const { data } = props;

	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoCarusel = props?.data?.pageBy?.paginaGaleria?.grupoCarusel ?? [];
	const grupoGaleria = props?.data?.pageBy?.paginaGaleria?.grupogaleria ?? [];
	const mostrarCarusel =
		props?.data?.pageBy?.paginaGaleria?.mostrarcarusel ?? "";
	const mostrarGaleria =
		props?.data?.pageBy?.paginaGaleria?.mostrarGaleria ?? "";

	const [isNavShown, setIsNavShown] = useState(false);
	return (
		<>
			<HeaderWhite
				title={siteSeo?.title}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
				menuItems={primaryMenu}
				menuHeaderItems={headerMenu}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				{mostrarCarusel && <HeroCarusel data={grupoCarusel} />}
				{mostrarGaleria && <Gallery data={grupoGaleria} />}
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}


