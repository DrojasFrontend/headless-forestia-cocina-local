"use client";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Map.module.scss";
let cx = className.bind(styles);

import { Container } from "../../Layout/Container";

export default function RouteMap() {
	const [map, setMap] = useState(null);
	const [directionsService, setDirectionsService] = useState(null);
	const [directionsRenderer, setDirectionsRenderer] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const ORIGIN = "Bogotá, Colombia";
	const DESTINATION = "5.531775171873888, -73.66150807522493";

	const waypoints = [
		"Puente de Boyacá, Boyacá, Colombia",
		"Samacá, Boyacá, Colombia",
		"Sutamarchán, Boyacá, Colombia",
		"Tinjacá, Boyacá, Colombia",
		"5.538401792005162, -73.6330853982385",
	];

	// Detectar dispositivo iOS
	const isIOS = () => {
		return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	};

	useEffect(() => {
		const loadGoogleMaps = () => {
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXVmK876Ergv-nYNpfq9yACLsFsnLFHs`;
			script.async = true;
			script.defer = true;
			script.onload = initMap;
			document.head.appendChild(script);
		};

		loadGoogleMaps();
	}, []);

	const initMap = () => {
		const directionsService = new google.maps.DirectionsService();
		const directionsRenderer = new google.maps.DirectionsRenderer();

		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 8,
			center: { lat: 5.5342, lng: -73.3672 },
		});

		directionsRenderer.setMap(map);
		setMap(map);
		setDirectionsService(directionsService);
		setDirectionsRenderer(directionsRenderer);

		const waypts = waypoints.map((location) => ({
			location: location,
			stopover: true,
		}));

		directionsService
			.route({
				origin: ORIGIN,
				destination: DESTINATION,
				waypoints: waypts,
				optimizeWaypoints: false,
				travelMode: google.maps.TravelMode.DRIVING,
			})
			.then((response) => {
				directionsRenderer.setDirections(response);
			})
			.catch((e) => window.alert("Error al calcular la ruta: " + e));
	};

	const handleNavigation = (platform) => {
		setIsLoading(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const origin = `${position.coords.latitude},${position.coords.longitude}`;
					const destination = DESTINATION;
					const waypointsStr = waypoints.join("|");

					let url;
					if (isIOS()) {
						// Soporte específico para iOS
						url = `maps://maps.apple.com/maps?saddr=${origin}&daddr=${destination}&dirflg=d`;
					} else if (platform === "google") {
						url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsStr}&travelmode=driving`;
					} else {
						url = `https://waze.com/ul?ll=${destination}&navigate=yes`;
					}

					// Usar location.href para mejor compatibilidad
					window.location.href = url;
					setIsLoading(false);
				},
				(error) => {
					alert("Por favor permite el acceso a tu ubicación para continuar");
					setIsLoading(false);
				}
			);
		}
	};

	return (
		<div className={cx("map__wrapper")}>
			<Container>
				<div className={cx("grid")}>
					<button
						className="button button--primary"
						onClick={() => handleNavigation("google")}
						disabled={isLoading}
					>
						{isLoading ? "Cargando..." : "Abrir ruta"}
					</button>
				</div>
			</Container>
		</div>
	);
}
