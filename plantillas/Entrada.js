"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitize } from "@/utils/miscellaneous";

import {
	Container,
	ContentWrapper,
	FeaturedImage,
	Footer,
	FormatDate,
	Main,
	NavigationMenu,
} from "@/components";

import { HeaderGreen } from "@/components/UI/Header/HeaderGreen";
import { Breadcrumbs } from "@/components/Breadcrumbs";

import ImageNotAvailable from "@/public/img/florestia.png";



export default function Entrada(props) {
	const { post, recentPosts: posts } = props;
	const siteSeo = post?.seo;
	const recentPosts = posts ?? [];
	const {
		headerMenuItems,
		menuHeaderMenuItems,
		footerMenuItems,
		footerMenuItemsMain,
		themeGeneralSettings,
	} = props.data;

	const primaryMenu = headerMenuItems?.nodes ?? [];
	const headerMenu = menuHeaderMenuItems?.nodes ?? [];
	const footerMenu = footerMenuItems?.nodes ?? [];
	const footerMenuMain = footerMenuItemsMain?.nodes ?? [];
	const { title, content, featuredImage, date, author } = post ?? {};

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<HeaderGreen
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
				<>
					{/* TODO */}
					<div className="sectionDetailPost">
						<Container>
							<div className="sectionDetailPost__grid">
								<section>
									<Breadcrumbs />
									<h1 className="heading--54 color--primary">{title}</h1>
									<div className="sectionDetailPost__img">
										{featuredImage?.node?.sourceUrl && (
											<Image
												fill
												src={featuredImage.node.sourceUrl}
												priority
												alt={featuredImage.node.altText}
												title={featuredImage.node.title}
												style={{ objectFit: "cover" }}
											/>
										)}
									</div>
									<ContentWrapper content={content} />
								</section>
								<section className="sectionSideBar">
									<h2 className="heading--18 color--primary">Recientes</h2>
									{recentPosts.map((post, index) => (
										<div key={index}>
											<Link href={post?.node?.uri} className="sectionDetailPost__post">
													<div className="sectionDetailPost__thumbnail">
														{post?.node?.featuredImage ? (
															<Image
																src={
																	post?.node?.featuredImage?.node?.mediaItemUrl
																}
																fill
																style={{ objectFit: "cover" }}
																sizes="100vw"
																alt={featuredImage?.node?.altText}
																title={featuredImage?.node?.title}
															/>
														) : (
															<Image
																src={ImageNotAvailable}
																width={372}
																height={230}
																sizes="100vw"
																alt="Imagen no disponible"
																title="no disponible"
															/>
														)}
													</div>
													<div className="sectionDetailPost__info">
														<h3
															className="heading--14 color--primary"
															dangerouslySetInnerHTML={{
																__html: sanitize(post?.node?.title),
															}}
														/>

														<p className="heading--12 color--gray">
															<FormatDate data={post?.node?.date} />
															{post?.node?.date && (
																<time dateTime={post?.node?.date}>
																	<FormatDate date={post?.node?.date} />
																</time>
															)}
														</p>
													</div>
												</Link>
										</div>
									))}
								</section>
							</div>
						</Container>
					</div>
				</>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}

