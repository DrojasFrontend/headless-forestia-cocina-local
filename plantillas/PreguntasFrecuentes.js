"use client";

import { useState } from "react";
import { Accordion, Footer, Main } from "@/components";

import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { HeroImageMedium } from "@/components/UI/Heros/HeroImageMedium";

export default function Component(props) {
	const { data } = props;

	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaFaqs?.grupoHero ?? [];
	const mostrarHero = props?.data?.pageBy?.paginaFaqs?.mostrarHero ?? "";
	const grupoPreguntas = props?.data?.pageBy?.paginaFaqs?.grupoPreguntas ?? [];
	const mostrarPreguntas =
		props?.data?.pageBy?.paginaFaqs?.mostrarPreguntas ?? "";

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
				{mostrarHero && <HeroImageMedium data={grupoHero} />}
				{mostrarPreguntas && <Accordion data={grupoPreguntas} />}
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}


