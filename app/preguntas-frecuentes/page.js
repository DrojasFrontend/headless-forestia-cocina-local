import PreguntasFrecuentes from "@/plantillas/PreguntasFrecuentes";
import { paginaFija } from "@/lib/wordpress/rutas";

export const revalidate = 300;

const { Pagina, generateMetadata } = paginaFija("/preguntas-frecuentes/", "paginaFaqs", PreguntasFrecuentes);

export { generateMetadata };
export default Pagina;
