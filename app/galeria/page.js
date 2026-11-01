import Galeria from "@/plantillas/Galeria";
import { paginaFija } from "@/lib/wordpress/rutas";

export const revalidate = 300;

const { Pagina, generateMetadata } = paginaFija("/galeria/", "paginaGaleria", Galeria);

export { generateMetadata };
export default Pagina;
