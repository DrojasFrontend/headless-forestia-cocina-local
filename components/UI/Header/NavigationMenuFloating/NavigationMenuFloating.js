"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { GET_FLOATING_MENU } from "../../../../queries/queries";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavigationMenuFloating.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default function NavigationMenuFloating({}) {
	const { data, loading, error } = useQuery(GET_FLOATING_MENU);
	const router = useRouter();
	const [currentPosition, setCurrentPosition] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error?.message}</p>;

	const menuItems =
		data?.themeGeneralSettings?.options?.grupomenufloating?.items ?? [];

		const ORIGIN = "Bogotá, Colombia";
		const DESTINATION = "5.531775171873888, -73.66150807522493";
	
		const waypoints = [
			"Puente de Boyacá, Boyacá, Colombia",
			"Samacá, Boyacá, Colombia",
			"Sutamarchán, Boyacá, Colombia",
			"Tinjacá, Boyacá, Colombia",
			"5.538401792005162, -73.6330853982385",
		];

	const navigateToSelvaggio = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const origin = `${position.coords.latitude},${position.coords.longitude}`;
				const destination = encodeURIComponent(DESTINATION);
				const waypointsStr = waypoints
					.map((wp) => encodeURIComponent(wp))
					.join("|");
				const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsStr}&travelmode=driving`;
				window.open(url, "_blank");
			});
		}
	};

	const renderMenuItem = (item, index) => {
		const isActive = router?.asPath === item?.enlace?.url;

		if (index === 0) {
			return (
				item?.enlace?.url && (
					<button
						key={index}
						onClick={navigateToSelvaggio}
						className={cx("floatingMenuCta", { isPage: isActive })}
					>
						<span className={cx("deafult")}>
							<Image
								src={item?.icono?.mediaItemUrl}
								width={27}
								height={27}
								alt={item?.enlace?.title}
							/>
						</span>
						<span className={cx("active")}>
							<Image
								src={item?.iconoActive?.mediaItemUrl}
								width={27}
								height={27}
								alt={item?.enlace?.title}
							/>
						</span>
						{item?.enlace?.title}
					</button>
				)
			);
		}

		return (
			item?.enlace?.url && (
				<Link href={item?.enlace?.url} key={index}>
					<a className={cx("floatingMenuCta", { isPage: isActive })}>
						<span className={cx("deafult")}>
							<Image
								src={item?.icono?.mediaItemUrl}
								width={27}
								height={27}
								alt={item?.enlace?.title}
							/>
						</span>
						<span className={cx("active")}>
							<Image
								src={item?.iconoActive?.mediaItemUrl}
								width={27}
								height={27}
								alt={item?.enlace?.title}
							/>
						</span>
						{item?.enlace?.title}
					</a>
				</Link>
			)
		);
	};

	return (
		<div className={cx("floatingMenu")}>
			<div className={cx("grid")}>
				{menuItems?.map((item, index) => renderMenuItem(item, index))}
			</div>
		</div>
	);
}

NavigationMenuFloating.fragments = {
	entry: gql`
		fragment NavigationMenuItemFragment on MenuItem {
			id
			path
			label
			parentId
			cssClasses
			menu {
				node {
					name
				}
			}
		}
	`,
};
