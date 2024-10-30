import ReactDOM, {createRoot, hydrateRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

const app = (
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </PersistGate>
);

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app); // Hydrate pre-rendered HTML
} else {
    createRoot(rootElement).render(app); // Render normally for CSR
}
