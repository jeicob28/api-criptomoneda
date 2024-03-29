import React,{useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

    &::after{
      content: '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display: block;
    }
`;

function App() {

  //States 
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect( () => {

    const cotizarCriptomoneda = async ()  =>{
    //Detiene la primera ejecucion
    if(moneda ===  '') return;

    //Consultar Api para obtener la cotizacion 
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    const resultado = await axios.get(url);

    //Mostrar spinner 
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        //Guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000);

    }

    cotizarCriptomoneda();

  },[moneda,criptomoneda] );

  //mostrar spinner o resultado

  const componente = (cargando) ? <Spinner/>  : <Cotizacion resultado={resultado} />;

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen crypto" />
      </div>
      <div>
        <Heading>Cotiza Cryptomonedas al instante</Heading>
        <Formulario
        guardarMoneda={guardarMoneda}
        guardarCriptomoneda={guardarCriptomoneda}
        />
      {componente}
        
      </div>
    </Contenedor> 
  );
}

export default App;
