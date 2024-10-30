import ReactDOM, {createRoot, hydrateRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store, persistor} from './redux/store.js'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <PersistGate persistor={persistor}>
//         <Provider store={store}>
//             <ThemeProvider>
//                 <App/>
//             </ThemeProvider>
//         </Provider>
//     </PersistGate>
// )

const rootElement = document.getElementById('root');

const app = (
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </PersistGate>
);

if (rootElement.hasChildNodes()) {
    // Hydrate pre-rendered HTML (SSR)
    hydrateRoot(rootElement, app);
} else {
    // Render normally (CSR)
    createRoot(rootElement).render(app);
}
