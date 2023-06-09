import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/cart';
import { NextUIProvider } from '@nextui-org/react';
import { PersistGate } from 'redux-persist/integration/react'
import "react-alice-carousel/lib/alice-carousel.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import "react-image-gallery/styles/css/image-gallery.css";

export default function App({ Component }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    import("bootstrap/dist/js/bootstrap.bundle");
  }, [])
  return (
    <NextUIProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>
    </NextUIProvider>
  )
}
