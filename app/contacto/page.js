import Contacto from "@/plantillas/Contacto";
import { paginaFija } from "@/lib/wordpress/rutas";

export const revalidate = 300;

const { Pagina, generateMetadata } = paginaFija("/contacto/", "paginaContacto", Contacto);

export { generateMetadata };
export default Pagina;
