import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitize } from "../../../../utils/miscellaneous";

import className from "classnames/bind";
import styles from "./CardPost.module.scss";
let cx = className.bind(styles);

import { FormatDate } from "../../../FormatDate";
import ImageNotAvailable from "@/public/img/image-not-available.png";

const CardPost = ({ data, className, excerptLength = 160 }) => {
	const { title, excerpt, uri, date, author, featuredImage } = data.node;

	const content =
		excerpt.slice(0, excerptLength) +
		(excerpt.length > excerptLength ? " [...]" : "");

	return (
        <article className={cx("component")}>
            <Link href={uri} className={cx("img")}>

                {featuredImage ? (
                    <Image
                        src={featuredImage?.node?.mediaItemUrl}
                        fill
                        alt={featuredImage?.node?.altText || ""}
                        sizes="(min-width: 1024px) 33vw, (min-width: 680px) 50vw, 100vw" />
                ) : (
                    <Image
                        src={ImageNotAvailable}
                        fill
                        alt="Imagen no disponible"
                        sizes="(min-width: 1024px) 33vw, (min-width: 680px) 50vw, 100vw" />
                )}

            </Link>
            <Link href={uri} className={cx("info")}>

                <h3
                    className="heading--18 color--primary"
                    dangerouslySetInnerHTML={{ __html: sanitize(title) }}
                />
                <p className="heading--14 color--primary font-weight--400">
                    {author?.node?.firstName}
                </p>
                <p className="heading--12 color--gray">
                    <FormatDate data={date} />
                    {date && (
                        <time dateTime={date}>
                            <FormatDate date={date} />
                        </time>
                    )}{" "}
                    - 5 min lectura
                </p>
                <div
                    className="heading--16 color--gray"
                    dangerouslySetInnerHTML={{ __html: sanitize(content) }}
                />

            </Link>
        </article>
    );
};

export default CardPost;
