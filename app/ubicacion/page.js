import Ubicacion from "@/plantillas/Ubicacion";
import { paginaFija } from "@/lib/wordpress/rutas";

export const revalidate = 300;

const { Pagina, generateMetadata } = paginaFija("/ubicacion/", "paginaUbicacion", Ubicacion);

export { generateMetadata };
export default Pagina;
