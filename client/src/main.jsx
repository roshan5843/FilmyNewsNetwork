import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
)

// const isSnap = navigator.userAgent === 'ReactSnap';
// 
// ReactDOM.hydrateRoot(document.getElementById('root'), (
//     <Provider store={store}>
//         {/* Disable PersistGate during pre-rendering */}
//         {isSnap ? (
//             <ThemeProvider>
//                 <App />
//             </ThemeProvider>
//         ) : (
//             <PersistGate loading={null} persistor={persistor}>
//                 <ThemeProvider>
//                     <App />
//                 </ThemeProvider>
//             </PersistGate>
//         )}
//     </Provider>
// ));
