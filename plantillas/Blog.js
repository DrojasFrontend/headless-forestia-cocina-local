"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Footer,
	Main,
	NavigationMenu,
	FeaturedImage,
} from "@/components";
import { HeaderWhite } from "@/components/UI/Header/HeaderWhite";
import { Container } from "@/components/Layout/Container";
import { HeroCaruselPosts } from "@/components/UI/Heros/HeroCaruselPosts";
import { CardsGridThreeCaruselBlog } from "@/components/UI/Cards/CardsGridThreeCaruselBlog";
import { CardPost } from "@/components/UI/Cards/CardPost";




export default function Blog(props) {
	const [isNavShown, setIsNavShown] = useState(false);


	const siteSeo = props.data.page.seo;
	const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const headerMenu = props?.data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = props?.data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const mostrarCarusel = props?.data?.page?.paginaBlog?.mostrarcarusel ?? "";
	const categories = props?.data?.categories?.edges ?? [];

	const posts = props?.posts ?? [];

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
				{mostrarCarusel && <HeroCaruselPosts data={posts} />}
				<section className="CardsPost">
					<div className="CardsPost__scroll">
						<ul className="CardsPost__category">
							{categories
								.filter((category) => category?.node?.slug !== "uncategorized")
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
					<CardsGridThreeCaruselBlog data={posts} />
					<Container>
						<h2 className="heading--40 color--primary">Descubrir artículos</h2>
						<div className="CardsPost__grid">
							{posts.map((post, index) => (
								<CardPost key={index} data={post} />
							))}
						</div>

						{/* Paginación */}
						{/* <div className="pagination">
							{currentPage > 1 && (
								<button
									className="pagination__prev"
									type="button"
									aria-label="anterior"
									onClick={handlePreviousPage}
								>
									Anterior
								</button>
							)}

							{[...Array(totalPages)].map((_, index) => {
								const pageNumber = index + 1;
								return (
									<button
										className={`pagination__currentPage ${
											currentPage === pageNumber ? "active" : ""
										}`}
										type="button"
										aria-label="pagina actual"
										key={pageNumber}
										onClick={() => handlePageClick(pageNumber)}
									>
										{pageNumber}
									</button>
								);
							})}

							{currentPage < totalPages && pageInfo.hasNextPage && (
								<button
									className="pagination__next"
									type="button"
									aria-label="siguiente"
									onClick={handleNextPage}
								>
									Siguiente
								</button>
							)}
						</div> */}
					</Container>
				</section>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}


