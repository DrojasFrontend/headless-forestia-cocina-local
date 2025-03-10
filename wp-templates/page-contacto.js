import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Container, Footer, Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroImageMedium } from "../components/UI/Heros/HeroImageMedium";
import { FormContact } from "../components/Forms/FormContact";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});
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
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
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

Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetPageData(
		$headerLocation: MenuLocationEnum
		$menuHeaderLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
		generalSettings {
			...BlogInfoFragment
		}
		themeGeneralSettings {
			pageSlug
			pageTitle
			options {
				favicon {
					mediaItemUrl
				}
				grupoheader {
					logo {
						mediaItemUrl
					}
					logoGreen {
						mediaItemUrl
					}
				}
				grupoFooter {
					redes {
						link {
							target
							title
							url
						}
						icon {
							mediaItemUrl
						}
					}
				}
			}
		}
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		menuHeaderMenuItems: menuItems(where: { location: $menuHeaderLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		footerMenuItemsMain: menuItems(where: { location: $footerLocationMain }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		pageBy(uri: "/contacto") {
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			paginaContacto {
				mostrarhero
				grupohero {
					titulo
					imagen {
						mediaItemUrl
						altText
						title
					}
				}
			}
		}
	}
`;

Component.variables = () => {
	return {
		headerLocation: MENUS.PRIMARY_LOCATION,
		menuHeaderLocation: MENUS.HEADER_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};
