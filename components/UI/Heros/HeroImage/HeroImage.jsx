import Image from "next/image";

import className from "classnames/bind";
import styles from "./HeroImage.module.scss";
let cx = className.bind(styles);

const HeroImage = ({data, className }) => {
	const {titulo, imagen } = data;

	return (
        <section className={cx(["component"])}>
            <div className={cx(["bckg"])}>
				<Image
                    src={imagen.mediaItemUrl}
                    priority
                    quality={100}
                    alt={imagen.altText}
                    title={imagen.title}
                    fill
                    sizes="100vw" />
				<h1 className={cx("heading", "heading--54", "color--white", className)}>
					{titulo}
				</h1>
			</div>
        </section>
    );
};

export default HeroImage;
