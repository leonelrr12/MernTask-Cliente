import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA }  from '../../types';

const TareaState = props => {
 
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    };

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {

        if(!proyecto) return;

        try {
            const resultado = await clienteAxios.get(`/api/tareas/${proyecto}`);

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error)
        }
    };

    // Valida y muestra un error en caso de 
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    // Eliminar taras por Id
    const eliminarTarea = async id => {

        try {
            await clienteAxios.delete(`/api/tareas/${id}`);

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Extrae tarea para edicion
    const takeTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    // Extrae tarea para edicion
    const udtTareaActual = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                takeTareaActual,
                udtTareaActual
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;