// Generado por scripts/generar-consultas.py desde el acf-json del tema. No editar a mano.

export const OPTIONS = `
options {
  favicon { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
  grupoheader {
    logo { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    logoGreen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
  }
  grupoFooter {
    redes {
      link { url title target }
      icon { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    }
  }
}
`;

export const PAGINABLOG = `
paginaBlog {
  mostrarcarusel
}
`;

export const PAGINACONTACTO = `
paginaContacto {
  mostrarhero
  grupohero {
    titulo
    imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
  }
}
`;

export const PAGINAFAQS = `
paginaFaqs {
  mostrarHero
  mostrarPreguntas
  grupoHero {
    titulo
    imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
  }
  grupoPreguntas {
    imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    items {
      pregunta
      respuesta
    }
  }
}
`;

export const PAGINAGALERIA = `
paginaGaleria {
  mostrarcarusel
  mostrarGaleria
  grupoCarusel {
    slides {
      titulo
      descripcion
      cta { url title target }
      imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    }
  }
  grupogaleria {
    imagenes {
      columnas
      imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    }
  }
}
`;

export const PAGINAGATRONOMIA = `
paginaGatronomia {
  mostrarhero
  grupohero {
    titulo
    imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
  }
  grupoGaleria {
    titulo
    descripcion
    galeria { nodes { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    grupoctatop {
      imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
      titulo
      cta { url title target }
    }
  }
  grupotexto {
    items {
      estilo
      titulo
      descripcion
      imagen { nodes { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
      cta { url title target }
      items {
        titulo
        icono { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
      }
    }
  }
  grupoPlatos {
    titulo
    descripcion
    targetas {
      imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
      detalle
      titulo
    }
    cta { url title target }
  }
  grupocta {
    imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
    titulo
    cta { url title target }
  }
}
`;

export const PAGINAUBICACION = `
paginaUbicacion {
  grupoHero {
    titulo
    imagen { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
  }
}
`;

export const POSTCATEGORIA = `
postCategoria {
  icono { node { mediaItemUrl sourceUrl altText title mediaDetails { width height } } }
}
`;
