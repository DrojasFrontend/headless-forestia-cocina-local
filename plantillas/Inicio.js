"use client";

import { useState } from "react";
import { Footer, Main } from "@/components";

import { HeroImage } from "@/components/UI/Heros/HeroImage";
import { Carusel } from "@/components/UI/Caruseles/Carusel";
import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { TitleCopy } from "@/components/UI/Titles/TitleCopy";
import { TextImage } from "@/components/UI/TextImages/TextImage";
import { CardsGrid } from "@/components/UI/Cards/CardsGrid";
import { BannerTextCta } from "@/components/UI/Banners/BannerTextCta";

export default function Component(props) {
	const { data } = props;

	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const mostrarHero = props?.data?.pageBy?.paginaGatronomia?.mostrarhero;

	const grupoHero = props?.data?.pageBy?.paginaGatronomia?.grupohero ?? [];
	const grupoGaleria =
		props?.data?.pageBy?.paginaGatronomia?.grupoGaleria ?? [];
	const grupoGaleriaCtaTop =
		props?.data?.pageBy?.paginaGatronomia?.grupoGaleria?.grupoctatop ?? [];
	const grupoTexto = props?.data?.pageBy?.paginaGatronomia?.grupotexto ?? [];
	const grupoPlatos = props?.data?.pageBy?.paginaGatronomia?.grupoPlatos ?? [];
	const grupoCta = props?.data?.pageBy?.paginaGatronomia?.grupocta ?? [];
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
				{mostrarHero && <HeroImage data={grupoHero} />}

				<TitleCopy data={grupoGaleria} />
				<Carusel data={grupoGaleria} />
				<BannerTextCta data={grupoGaleriaCtaTop} />
				<TextImage data={grupoTexto} />
				<CardsGrid data={grupoPlatos} className="text--center" />
				<BannerTextCta data={grupoCta} />
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}


