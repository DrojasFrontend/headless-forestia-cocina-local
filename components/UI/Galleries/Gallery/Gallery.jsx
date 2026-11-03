import React from "react";
import Image from "next/image";

import className from "classnames/bind";
import styles from "./Gallery.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const Gallery = ({data}) => {
	const { imagenes: Imagenes = [], columnas } = data;
	return (
        <section className="Gallery">
            <div className={cx(["conmponent"])}>
				<Container>
					<h2 className="heading--40 color--primary">Galeria</h2>
					<span className="space space--20"></span>
					<div className={cx(["grid"])}>
						{Imagenes.map((item, index) => (
							<div
								key={index}
								className={cx(["img", item.columnas])}
							>
								<Image
                                    src={item?.imagen?.mediaItemUrl}
                                    width={1208}
                                    height={418}
                                    quality={100}
                                    priority
                                    alt={item?.imagen?.altText || ""}
                                    title={item?.imagen?.title}
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto"
                                    }} />
							</div>
						))}
					</div>
				</Container>
			</div>
        </section>
    );
};

export default Gallery;
