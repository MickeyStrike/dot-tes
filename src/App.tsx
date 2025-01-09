import Router from './router';
import GlobalStyle from './styles/GlobalStyles';
import { GlobalContextProvider } from './providers/stores';

function App() {
  return (
    <GlobalContextProvider>
      <GlobalStyle />
      <Router/>
    </GlobalContextProvider>
  );
};

export default App;
