import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    text-rendering: optimizelegibility;
    scroll-behavior: smooth;
    background-color: rgb(8, 1, 42);
  }

  body, input, button {
    font-size:0.9rem;
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
  }

  #root {
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }
`;
