import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener el state de la tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, udtTareaActual } = tareasContext;   
    
    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            setTarea(tareaseleccionada);
        } else {
            setTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada])
    
    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    });

    // Extrae nombre de la tarea
    const {nombre} = tarea;

    // Si no hay proyecto
    if(!proyecto) return null;

    // Array destructuring para extraer proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        
        // Validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Verificar si es una tarea nueva o existente
        if(tareaseleccionada === null) {
            // Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualiza tarea existente
            udtTareaActual(tarea);
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // Reiniciar formulario
        setTarea({
            nombre: ''
        });
        
    };


    return ( 
        <div className="formulario mb-3">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea ..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">Nombre de la Trarea es Obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;