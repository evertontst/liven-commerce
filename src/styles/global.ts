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
    text-align: center;
    color: #fff;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #383636; /* Black */
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
    margin:0 auto;
    text-align: center;
  }
  
  button {
    cursor: pointer;
  }
`;
