import Inicio from "@/plantillas/Inicio";
import { paginaFija } from "@/lib/wordpress/rutas";

export const revalidate = 300;

const { Pagina, generateMetadata } = paginaFija("/", "paginaGatronomia", Inicio);

export { generateMetadata };
export default Pagina;
