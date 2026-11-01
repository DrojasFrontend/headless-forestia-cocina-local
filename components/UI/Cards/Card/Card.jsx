import React from "react";
import Image from "next/image";
import Link from "next/link";

import IconCheck from "../../../SVG/IconCheck";

import className from "classnames/bind";
import styles from "./Card.module.scss";
let cx = className.bind(styles);

import ImageNotAvailable from "/public/img/image-not-available.png";

export default function Card({
	title,
	excerpt,
	slug,
	postInterna,
	featuredImage,
}) {
	return (
        <article className="Card">
            <div className={cx("component")}>
				<div className={cx("item")}>
					<div className={cx("img")}>
						{featuredImage ? (
							<Image
                                src={featuredImage?.node?.mediaItemUrl}
                                quality={100}
                                priority
                                alt={featuredImage?.node?.altText}
                                title={featuredImage?.node?.title}
                                fill
                                sizes="100vw" />
						) : (
							<Image
                                src={ImageNotAvailable}
                                width={372}
                                height={200}
                                quality={100}
                                priority
                                alt="Imagen no disponible"
                                title="no disponible"
                                sizes="100vw"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }} />
						)}
						<h3 className={cx(["title", "heading--24 color--white"])}>
							<Link href={slug}>

                                {title}
                                <span className="button--circle"></span>

                            </Link>
						</h3>
					</div>
					<div className={cx("info")}>
						<Link href={slug}>

                            <div
                                className="heading--16 color--gray"
                                dangerouslySetInnerHTML={{ __html: excerpt }}
                            />
                            <h3 className="heading--18 color--primary">
                                {postInterna?.grupocaracteristicas?.titulo}
                            </h3>
                            <ul className="">
                                {postInterna?.grupocaracteristicas?.caracteristica && (
                                    <>
                                        {postInterna?.grupocaracteristicas?.caracteristica?.map(
                                            (icon, index) => (
                                                <li key={index}>
                                                    <span className={cx("icon")}>
                                                        <IconCheck />
                                                    </span>
                                                    {icon?.detalle}
                                                </li>
                                            )
                                        )}
                                    </>
                                )}
                            </ul>

                        </Link>
					</div>
				</div>
			</div>
        </article>
    );
}
