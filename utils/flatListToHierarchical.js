// Reemplazo de flatListToHierarchical de @faustwp/core: arma el árbol de un menú plano de WordPress.
export function flatListToHierarchical(data = [], { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}) {
	const arbol = [];
	const hijos = {};
	data.forEach((item) => {
		const nuevo = { ...item, [childrenKey]: [] };
		const id = nuevo[idKey];
		const padre = nuevo[parentKey] || 0;
		hijos[id] = hijos[id] || [];
		nuevo[childrenKey] = hijos[id];
		if (padre) {
			hijos[padre] = hijos[padre] || [];
			hijos[padre].push(nuevo);
		} else {
			arbol.push(nuevo);
		}
	});
	return arbol;
}
