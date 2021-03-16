import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --background: #F0F2F5;
    --text-body: #969CB3;
    --text-title: #363F5F;
    --red: #E62E4D; 
    --green: #33CC95;
    --blue: #5429CC;
    --blue-light: #6933FF;
    --shape: #FFFFFF;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  // font-size: 16px; - Padrão Desktop
  // 1rem = 16px;

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width:  720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }


`;
