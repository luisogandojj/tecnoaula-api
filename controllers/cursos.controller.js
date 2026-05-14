let cursos = require("../data/cursos");

// Obtener todos los cursos
const getCursos = (req, res) => {
    res.json(cursos);
};

// Obtener un curso por ID
const getCursoById = (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursos.find(c => c.id === id);

    if (!curso) {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.json(curso);
};

// Crear un nuevo curso
const createCurso = (req, res) => {
    const { nombre, descripcion, duracion, nivel, precio } = req.body;

    if (!nombre || !descripcion || !duracion) {
        return res.status(400).json({
            mensaje: "Nombre, descripción y duración son obligatorios"
        });
    }

    const nuevoId = cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1;

    const nuevoCurso = {
        id: nuevoId,
        nombre,
        descripcion,
        duracion,
        nivel: nivel || "Sin especificar",
        precio: precio || 0
    };

    cursos.push(nuevoCurso);

    res.status(201).json(nuevoCurso);
};

// Modificar un curso existente
const updateCurso = (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    cursos[index] = {
        ...cursos[index],
        ...req.body
    };

    res.json(cursos[index]);
};

// Eliminar un curso
const deleteCurso = (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    const eliminado = cursos[index];
    cursos = cursos.filter(c => c.id !== id);

    res.json({
        mensaje: "Curso eliminado correctamente",
        curso: eliminado
    });
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
};
