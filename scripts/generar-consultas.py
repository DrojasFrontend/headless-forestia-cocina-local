"""Genera lib/wordpress/fragmentos-acf.js desde el acf-json del tema de WordPress.
Cada grupo ACF → un string con su selección GraphQL (imágenes con node/nodes; lib/wordpress/aplanar.js
las devuelve a la forma vieja `{ mediaItemUrl, altText, title }` que esperan los componentes).
Uso: python3 -I scripts/generar-consultas.py <tema>/acf-json"""
import json, os, sys

ACF = sys.argv[1]
SALIDA = os.path.join(os.path.dirname(__file__), "..", "lib", "wordpress", "fragmentos-acf.js")
IMAGEN = "mediaItemUrl sourceUrl altText title mediaDetails { width height }"


def seleccion(campos, nivel):
    pad = "  " * nivel
    lineas = []
    for c in campos:
        n, t = c["graphql_field_name"], c["type"]
        if t == "image":
            lineas.append(f"{pad}{n} {{ node {{ {IMAGEN} }} }}")
        elif t == "gallery":
            lineas.append(f"{pad}{n} {{ nodes {{ {IMAGEN} }} }}")
        elif t == "link":
            lineas.append(f"{pad}{n} {{ url title target }}")
        elif t in ("group", "repeater"):
            lineas.append(f"{pad}{n} {{\n" + seleccion(c["sub_fields"], nivel + 1) + f"\n{pad}}}")
        else:
            lineas.append(f"{pad}{n}")
    return "\n".join(lineas)


grupos = sorted((json.load(open(os.path.join(ACF, f))) for f in os.listdir(ACF) if f.endswith(".json")), key=lambda g: g["key"])
salida = ["// Generado por scripts/generar-consultas.py desde el acf-json del tema. No editar a mano.", ""]
for g in grupos:
    salida.append(f"export const {g['graphql_field_name'].upper()} = `\n{g['graphql_field_name']} {{\n{seleccion(g['fields'], 1)}\n}}\n`;\n")
os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
open(SALIDA, "w").write("\n".join(salida))
print("ok", [g["graphql_field_name"] for g in grupos])
