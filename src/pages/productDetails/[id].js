// Package imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ImageGallery from 'react-image-gallery';

// Component imports
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// Other imports
import { useRouter } from 'next/router';

const productDetails = () => {
    const router = useRouter();
    const { id } = router?.query;

    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [contentHeight, setContentHeight] = useState('auto'); // Set default height to 'auto'
    const [isQuantityControlsVisible, setIsQuantityControlsVisible] = useState(false);

    const [cartItem, setCartItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProductDetails();
    }, []);

    useEffect(() => {
        id && getCartItem();
    }, [id]);

    const loadProductDetails = () => {
        setTimeout(() => {
            const parent = document.querySelector('.productDetail-content');
            const element = document.querySelector('.image-gallery-image');

            if (parent && element) {
                parent.style.height = `${element.clientHeight}px`;
                setContentHeight(`${element.clientHeight}px`);
                setIsContentLoaded(true);
            }
        }, 1000);
    };

    const getCartItem = async () => {
        try {
            // If the cartList exists then extract the data from the cartList array
            const cartList = JSON.parse(localStorage.getItem('cartList'));

            if (cartList) {
                const cartFromLocal = JSON.parse(localStorage.getItem('cartList'));
                const foundCartItem = cartFromLocal?.find((element) => element?.id === parseInt(id));

                // If the cartList exists but the item is not present in the cartList
                // then extract the data from the gadgets array
                if (!foundCartItem) {

                    const gadgetsFromLocal = JSON.parse(localStorage.getItem('gadgets')) || [];
                    const newCartItem = gadgetsFromLocal?.find((element) => element?.id === parseInt(id));

                    if (!newCartItem) {
                        setCartItem(null);
                        return;
                    }
                    setCartItem({ ...newCartItem, quantity: newCartItem?.quantity });
                } else {
                    setCartItem({ ...foundCartItem, quantity: foundCartItem?.quantity });

                    if (foundCartItem.quantity > 0) {
                        setIsQuantityControlsVisible(true);
                    }
                }

            } else if (!cartList) {
                // If the cartList doesn't exists then extract the data from gadgets array
                const gadgetsFromLocal = JSON.parse(localStorage.getItem('gadgets'));
                const foundCartItem = gadgetsFromLocal.find((element) => element?.id === parseInt(id));

                setCartItem({ ...foundCartItem, quantity: foundCartItem?.quantity });
            } else {
                setCartItem(null);
            }

        } catch (error) {
            console.error('Error in fetching cartItem', error);
        }
    };

    const handleAddToCart = (item) => {
        // If the item is not in the cart then add it in cartList
        const cartFromLocal = JSON.parse(localStorage.getItem('cartList'));
        const foundCartItem = cartFromLocal?.find((element) => element?.id === parseInt(id));

        if (!foundCartItem && cartFromLocal) {
            setCartItem({ ...item, quantity: 1 });
            const updatedCart = [...cartFromLocal, { ...cartItem, quantity: 1 }];
            localStorage.setItem('cartList', JSON.stringify(updatedCart));
        } else {
            setCartItem({ ...item, quantity: 1 });
            localStorage.setItem('cartList', JSON.stringify([{ ...item, quantity: 1 }]));
        }

        setIsQuantityControlsVisible(true);
    };

    const handleIncrement = (item) => {
        const updatedCart = { ...item, quantity: item?.quantity + 1 };
        setCartItem(updatedCart);

        updateItem(updatedCart);
    };

    const handleDecrement = (item) => {
        if (item?.quantity > 0) {
            const updatedCart = { ...item, quantity: item?.quantity - 1 };
            setCartItem(updatedCart);

            updateItem(updatedCart);

        } else {
            alert('Invalid quantity');
        }
    };

    const updateItem = (item) => {
        // Retrieve the existing items from localStorage
        const cartList = JSON.parse(localStorage.getItem('cartList'));

        // Find the index of the item in the existing items array (assuming 'id' is the unique identifier)
        const index = cartList.findIndex((element) => element?.id === item?.id);

        // If the item exists in the existing items array, update it
        if (index >= 0) {
            cartList[index] = item;
            localStorage.setItem('cartList', JSON.stringify(cartList));
        }
    };

    return (
        <div>
            <Header></Header>
            <div
                style={{
                    marginTop: '100px',
                }}
            >
                {cartItem ? <div className="productDetail-parent container" key={cartItem?.id}>
                    <div className="row">
                        <div className="productDetail-image col">
                            <ImageGallery items={cartItem?.images} showFullscreenButton={false} showPlayButton={false} />
                        </div>
                        <div
                            className="productDetail-content col"
                            style={{
                                height: contentHeight,
                                opacity: isContentLoaded ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        >
                            <h1>{cartItem?.name}</h1>
                            <h4 className="productDetail-subheading">
                                {cartItem?.Description}
                            </h4>
                            <p>
                                <b>$ {cartItem?.price}</b>
                            </p>
                            <button id="addToCard-button" onClick={() => handleAddToCart(cartItem)}>Add To Cart</button>

                            <div style={{
                                display: isQuantityControlsVisible ? 'flex' : 'none'
                            }}>
                                <div className="quantity-controls">
                                    <button className="control-button" onClick={() => handleIncrement(cartItem)}>+</button>
                                    <div className="quantity-display">{cartItem?.quantity}</div>
                                    <button className="control-button" onClick={() => handleDecrement(cartItem)}>-</button>
                                </div>

                                <div className="total-price">
                                    $ <b>{cartItem?.quantity ? cartItem?.quantity * cartItem?.price : '0'}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="no-product-found"><b>No Product found with the mentioned id...</b></div>}


            </div>
            <Footer></Footer>
        </div>
    );
};

export default productDetails;

// https://commercejs.com/docs - For backend
