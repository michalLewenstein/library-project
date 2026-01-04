import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme(); 

createRoot(document.getElementById('root')).render(
  // Access to data storage from any component
    <Provider store={store}> 
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
);
