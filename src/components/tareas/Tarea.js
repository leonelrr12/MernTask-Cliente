import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    // Obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener el state de la tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, udtTareaActual, takeTareaActual } = tareasContext;   

    // Array destructuring para extraer proyecto actual
    const [proyectoActual] = proyecto;

    // fn elimnar tarea
    const tareaEliminar = id => {
        eliminarTarea(id);
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);
    };

    // fn editar tarea
    const tareaEditar = tarea => {
        takeTareaActual(tarea);
    };

    // fn Modifica estado de una tarea
    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        udtTareaActual(tarea);
    };


    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                ? (
                    <button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >Completo</button>
                )
                : (
                    <button
                        type="button"
                        className="imcompleto"
                        onClick={() => cambiarEstado(tarea)}
                    >Imcompleto</button>
                )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => tareaEditar(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;