import React,{Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color :#fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border:none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) =>{

    //State custom Hook

    const [state, actualizarState] = useState(stateInicial);

    const seleccionar = () =>{
        return(
            <Fragment>
                <Label>{label}</Label>
                <Select
                    onChange = {(e) => actualizarState(e.target.value)}
                    value={state}
                >
                    <option > - Selecione - </option>
                    {opciones.map(opcion => (
                        <option key={opcion.codigo} value={opcion.codigo} >{opcion.nombre}</option>
                    ))}
                </Select>
            </Fragment>
        )
    };

    // Retornar state, interfaz y funcion que modifica el state

    return [state, seleccionar, actualizarState];

};

export default useMoneda;