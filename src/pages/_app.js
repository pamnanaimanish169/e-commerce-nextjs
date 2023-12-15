// Global styles
import '@/styles/globals.css';

// External library styles
import 'bootstrap/dist/css/bootstrap.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'react-image-gallery/styles/css/image-gallery.css';

// React and Redux related imports
import { persistor, store } from '@/store/cart';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// UI related imports
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap');
        import('bootstrap/dist/js/bootstrap.bundle');
    }, []);
    return (
        <NextUIProvider>
            <Provider store={store}>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <Component />
                </PersistGate>
            </Provider>
        </NextUIProvider>
    );
}
