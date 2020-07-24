import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    // Obtener el state del proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // Obtener el state del tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;    

    // Funcion para agregar el proyecto actual
    const selecionarProyecto = id => {
        proyectoActual(id);  // Fijar proyecto actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    };


    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selecionarProyecto(proyecto._id) }
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;