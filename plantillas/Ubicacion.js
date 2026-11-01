"use client";

import { useState } from "react";
import { Footer, Main } from "@/components";

import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { HeroImage } from "@/components/UI/Heros/HeroImage";
import RouteMap  from "@/components/UI/Map/RouteMap";

export default function Component(props) {
	const { data } = props;

	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const grupoHero = props?.data?.pageBy?.paginaUbicacion?.grupoHero ?? [];

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
				<HeroImage data={grupoHero} className="ubicacion" />
        <RouteMap/>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}


