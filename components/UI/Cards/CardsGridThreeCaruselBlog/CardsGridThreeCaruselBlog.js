import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import classNames from "classnames/bind";
import styles from "./CardsGridThreeCaruselBlog.module.scss";
let cx = classNames.bind(styles);

import { Container } from "../../../Layout/Container";

import ImageNotAvailable from "@/public/img/image-not-available.png";

const CardsGridThreeCaruselBlog = ({ data }) => {
	const [nav1, setNav1] = useState(null);
	let sliderRef1 = useRef(null);
	// Orden aleatorio solo en el navegador: mezclar durante el render daba un orden distinto al del servidor (error de hidratación #418).
	const [shuffledData, setShuffledData] = useState(data ?? []);
	useEffect(() => {
		setShuffledData([...(data ?? [])].sort(() => 0.5 - Math.random()));
	}, [data]);

	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		fade: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	useEffect(() => {
		setNav1(sliderRef1);
	}, []);

	const nextSlide = () => {
		sliderRef1?.slickNext();
	};

	const prevSlide = () => {
		sliderRef1?.slickPrev();
	};

	if (!data?.length) {
		return <p>No hay Entradas disponibles.</p>;
	}

	return (
        <section className="CardsGridThreeCaruselBlog">
            <div className={cx(["component"])}>
				<div className={cx("container")}>
					<div className={cx("grid-slick")}>
						<div className={cx("info")}>
							<h2 className="heading--40 color--primary">Contenido global</h2>
							<p className="heading--16 color--gray">
								Lorem ipsum dolor sit amet, consectetur eiusmod tempor.
							</p>
							<div className={cx(["customArrows", "custom-arrows"])}>
								<button
									className="custom-arrows__prev"
									onClick={prevSlide}
								></button>
								<button
									className="custom-arrows__next"
									onClick={nextSlide}
								></button>
							</div>
						</div>
						<Slider {...settings} ref={(slider) => (sliderRef1 = slider)}>
							{shuffledData.map((targeta, index) => (
								<div key={index} className={cx("card")}>
									{targeta?.node?.featuredImage?.node?.mediaItemUrl ? (
										<>
											<Image
                                                src={targeta.node.featuredImage.node.mediaItemUrl}
                                                alt={targeta?.node?.featuredImage?.node?.altText || ""}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, 85vw"
                                                style={{
                                                    objectFit: "cover"
                                                }} />
											<h3 className={cx(["title", "heading--20 color--white"])}>
												{targeta.node.title}
											</h3>
										</>
									) : (
										<Image
                                            src={ImageNotAvailable}
                                            width={372}
                                            height={230}
                                            alt="Imagen no disponible"
                                            title="no disponible"
                                            sizes="100vw"
                                            style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} />
									)}
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
        </section>
    );
};

export default CardsGridThreeCaruselBlog;
