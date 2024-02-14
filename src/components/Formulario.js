import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // state del estado de criptomonedas

    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre:'Moneda de estados unidos'},
        {codigo: 'MXN', nombre:'Peso Mexicano'},
        {codigo: 'EUR', nombre:'Euro '},
        {codigo: 'GBP', nombre:'Libra Esterlina'}
    ];

    // Utilizar useMoneda
    const [ moneda, SeleccionarMoneda] = useMoneda('elige tu moneda','', MONEDAS);
    // Utilizar Criptmoneda
    const [criptomoneda, SelectCrypto ] = useCryptomoneda('Elige tu cryptomoneda', '', listacripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // Cuando el usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();

        //Validar si los campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return true;
        }

        //Pasar datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }


    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Los campos deben estar llenos' /> :null}
            <SeleccionarMoneda />
            <SelectCrypto />
            <Boton
                type="submit"
                value="calcular"
            /> 
        </form>
     );
}
 
export default Formulario;