import Link from "next/link";
import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
let cx = classNames.bind(styles);

import LogoDefault from "@/public/img/logo-white-forestia-cocina-local.svg";

import { Container } from "../../Layout/Container";
import IconInstagram from "../../SVG/IconInstagram";
import IconFacebook from "../../SVG/IconFacebook";
import IconYoutube from "../../SVG/IconYoutube";
import IconWhatsapp from "../../SVG/IconWhatsapp";
import IconTikTok from "../../SVG/IconTikTok";

// Íconos de redes como SVG del tema (mismo color y tamaño). Se elige por la URL;
// si la red no está aquí, se usa el ícono subido en WordPress.
const ICONOS_RED = [
	[/instagram\.com/, IconInstagram],
	[/facebook\.com|fb\.com/, IconFacebook],
	[/tiktok\.com/, IconTikTok],
	[/youtube\.com|youtu\.be/, IconYoutube],
	[/wa\.me|whatsapp/, IconWhatsapp],
];

function IconoRed({ social }) {
	const url = social?.link?.url ?? "";
	const Icono = ICONOS_RED.find(([patron]) => patron.test(url))?.[1];
	if (Icono) return <Icono width={24} height={24} aria-hidden="true" />;
	if (!social?.icon?.mediaItemUrl) return social?.link?.title ?? null;
	return <Image src={social.icon.mediaItemUrl} width={24} height={24} alt="" />;
}

export default function Footer({
	themeGeneralSettings,
	menuItemsMain,
	menuItems,
}) {
	const Logo = themeGeneralSettings?.options?.grupoheader?.logo?.mediaItemUrl;
	const redes = themeGeneralSettings?.options?.grupoFooter?.redes;
	return (
        <footer className={cx("component")}>
            <div className={cx("bckg")}>
				<Container>
					<div className={cx("grid")}>
						<div className={cx("logo")}>
							<Link href="/" aria-label="Ir a la página de inicio">

                                <Image
                                    src={LogoDefault}
                                    width={242}
                                    height={105}
                                    alt="Logotipo de Forestia cocina local Hotel Campestre"
                                    title="Forestia cocina local Hotel Campestre - Relax y naturaleza en un entorno rural"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto"
                                    }} />

                            </Link>
						</div>

						<div className={cx(["menu", "desktop"])}>
							{menuItems?.map((link, index) => (
								<Link
                                    key={index}
                                    href={link?.path}
                                    className="heading--20 font-weight--100 color--white">

                                    {link?.label}

                                </Link>
							))}
						</div>

						<div className={cx("menu-social")}>
							<div className={cx("menu")}>
								{menuItemsMain?.map((link, index) => (
									<Link
                                        key={index}
                                        href={link?.path}
                                        className="heading--20 font-weight--100 color--white">

                                        {link?.label}

                                    </Link>
								))}
							</div>
							{redes && (
								<div className={cx("social")}>
									{redes.map((social, index) => (
										<Link
										key={index}
										href={social?.link?.url}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`Forestia Cocina Local en ${social?.link?.title}`}
									>
										<IconoRed social={social} />
									</Link>
									))}
								</div>
							)}
						</div>
					</div>

					<div className={cx("mobile")}>
						<div className={cx(["menu", "mobile"])}>
							{menuItems?.map((link, index) => (
								<Link
                                    key={index}
                                    href={link?.path}
                                    className="heading--20 font-weight--100 color--white">

                                    {link?.label}

                                </Link>
							))}
						</div>
					</div>

					<div className={cx("grid-bottom")}>
						<div></div>
						<div className={cx("copy")}>
							<p>© Copyright 2024, FORESTIA COCINA LOCAL</p>
						</div>
					</div>
				</Container>
			</div>
        </footer>
    );
}
