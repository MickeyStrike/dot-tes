import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .container-section {
    max-width: 1140px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    padding: 0 16px;

    @media (max-width: 768px) {
      padding: 0 12px;
    }
  }

  .section-wrapper {
    margin: 24px 0;
  }

  .section-title {
    font-size: 1.42857rem;
    font-weight: 800;
    line-height: 2.35714rem;
    color: #212121;
    margin-bottom: 16px;
  }

  .min-height-container {
    min-height: 80vh;
  }

  .container-card {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    place-items: center;
    margin-left: auto;
    margin-right: auto;
    gap: 18px 5px;
    width: 100%;
    max-width: 1200px;
    min-height: 365px;
    padding-bottom: 21px;
  }

  @media (max-width: 1200px) {
    .container-card {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 945px) {
    .container-card {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 768px) {
    .container-card {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 480px) {
    .container-card {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .items-center {
    align-items: center;
  }

  .text-green-bold {
    color: #004751;
    font-weight: bold;
  }

  .text-center {
    text-align: center;
  }

  .py-2 {
    padding: 32px 0;
  }

  .mt-2 {
    margin-top: 32px;
  }

  .mt-1 {
    margin-top: 16px;
  }

  .mt-90 {
    margin-top: 90px;
  }

  .gap-5 {
    gap: 20px;
  }

  .gap-1 {
    gap: 4px;
  }

  .relative {
    position: relative;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .overflow-hidden {
    overflow: hidden !important;
  }
`;

export default GlobalStyle;
