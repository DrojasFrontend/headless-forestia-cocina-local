import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitize } from "../../../../utils/miscellaneous";

import className from "classnames/bind";
import styles from "./CardsPlan.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardsPlan = ({data, detail}) => {

	if (!data.length === 0) {
		return <p>No hay tarjetas disponibles.</p>;
	}

	return (
        <section className="CardsPlanes">
            <div className={cx("component")}>
				<Container>
					<div className={cx(["title", className])}>
						<h2 className={cx(["heading", "heading--40", "color--primary"])}>
							{detail?.titulo}
						</h2>
						<div
							className="heading--16 color--gray"
							dangerouslySetInnerHTML={{ __html: detail?.descripcion }}
						/>
					</div>

					<div className={cx("grid")}>
						{data.map((targeta, index) => (
							<Link key={index} href={targeta?.uri} className={cx(["card"])}>

                                <Image
                                    src={targeta?.featuredImage?.node?.mediaItemUrl}
                                    width={372}
                                    height={440}
                                    quality={100}
                                    priority
                                    alt={targeta?.featuredImage?.node?.altText || ""}
                                    title={targeta?.featuredImage?.node?.title}
                                    sizes="100vw"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto"
                                    }} />
                                <div className={cx(["copy"])}>
                                    <h3 className="heading--24 color--white">
                                        {targeta?.title}
                                    </h3>
                                    <div
                                        className="heading--16 color--white"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitize(targeta?.excerpt),
                                        }}
                                    />
                                    <span className={cx("moreinfo")}>
                                        <span className={cx(["button", "button button--white"])}>Ver plan</span>
                                    </span>
                                </div>

                            </Link>
						))}

						{/* {cta && (
						<Link href={cta?.url}>
							<a
								className="button button--primary button--center"
								target={cta?.target}
							>
								{cta?.title}
							</a>
						</Link>
					)} */}
					</div>
				</Container>
			</div>
        </section>
    );
};

export default CardsPlan;
