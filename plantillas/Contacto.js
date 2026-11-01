"use client";

import { useState } from "react";
import { Container, Footer, Main } from "@/components";

import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { HeroImageMedium } from "@/components/UI/Heros/HeroImageMedium";
import { FormContact } from "@/components/Forms/FormContact";

export default function Component(props) {
	const { data } = props;
	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaContacto?.grupohero ?? [];

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
				<HeroImageMedium data={grupoHero} />
				<Container>
					<FormContact />
				</Container>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}


