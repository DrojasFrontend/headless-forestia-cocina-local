"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Main, NavigationMenu, } from "@/components";

import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { HeroCaruselPosts } from "@/components/UI/Heros/HeroCaruselPosts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Layout/Container";
import { CardPost } from "@/components/UI/Cards/CardPost";
import { Footer } from "@/components/UI/Footer";

export default function Component(props) {
	const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];
	const { title: siteTitle, description: siteDescription } =
		props?.data?.generalSettings;
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const headerMenu = props?.data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const footerMenuMain = props?.data?.footerMenuItemsMain?.nodes ?? [];
  const categories = props?.data?.categories?.edges ?? [];
	const posts = props?.data?.nodeByUri?.posts?.edges;

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<HeaderWhite
				title={siteTitle}
				description={siteDescription}
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
				<>
					<HeroCaruselPosts data={posts} />
					<section className="CardsPost">
						<div className="CardsPost__scroll">
							<ul className="CardsPost__category">
								{categories
									.filter(
										(category) => category?.node?.slug !== "uncategorized"
									) // Filtrar "Uncategorized"
									.map((category, index) => (
										<li key={index}>
											<Link href={`/categoria/${category?.node?.slug}`} className="category">
													{category?.node?.postCategoria?.icono?.mediaItemUrl && (<Image src={category.node.postCategoria.icono.mediaItemUrl}
														alt={category?.node?.name}
														width={44}
														height={44}
													/>)}
													{category?.node?.name}
												</Link>
										</li>
									))}
							</ul>
						</div>
						<Container>
							<Breadcrumbs />
							<h2 className="heading--40 color--primary">
								Descubrir artículos
							</h2>
							<div className="CardsPost__grid">
								{posts.map((post, index) => (
									<CardPost key={index} data={post} />
								))}
							</div>
						</Container>
					</section>
				</>
			</Main>
			<Footer
				title={siteTitle}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}
