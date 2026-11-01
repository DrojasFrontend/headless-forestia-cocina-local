"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import className from "classnames/bind";
import styles from "./Breadcrumbs.module.scss";

let cx = className.bind(styles);

export default function Breadcrumbs() {
	const asPath = usePathname() ?? "/";

	const pathArray = asPath.split("/").filter((segment) => segment !== "");

	const breadcrumbs = pathArray.map((segment, index) => {
		const href = "/" + pathArray.slice(0, index + 1).join("/");
		return { segment, href };
	});

	return (
        <nav aria-label="breadcrumb">
            <ul className={cx("breadcrumbs")}>
				{/* Inicio siempre es un enlace */}
				<li>
					<Link href="/" className="heading--14 color--primary">
						Inicio
					</Link>
				</li>
				{/* Los demás elementos no son enlaces */}
				{breadcrumbs.map((crumb, index) => (
					<li key={index}>
						{/* Mostrar los demás elementos como texto sin enlace */}
						<span>{crumb.segment.replace(/-/g, " ")}</span>
					</li>
				))}
			</ul>
        </nav>
    );
}
