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
                const foundCartItem = cartFromLocal.find((element) => element?.id === parseInt(id));

                setCartItem({ ...foundCartItem });
                return;
            }

            // If the cartList doesn't exists then extract the data from gadgets array
            const gadgetsFromLocal = JSON.parse(localStorage.getItem('gadgets'));
            const foundCartItem = gadgetsFromLocal.find((element) => element?.id === parseInt(id));

            setCartItem({ ...foundCartItem });

        } catch (error) {
            console.error('Error in fetching cartItem', error);
        }
    };

    const handleAddToCart = (item) => {
        // If the item exists then say item is already in the cart and don't add in cartList
        const cartFromLocal = JSON.parse(localStorage.getItem('cartList'));
        const foundCartItem = cartFromLocal.find((element) => element?.id === parseInt(id));

        if (!foundCartItem) {
            setCartItem({ ...item, quantity: 1 });
            localStorage.setItem('cartList', JSON.stringify([{ ...cartItem, quantity: 1 }]));
        } else {
            alert('Item is already in the cart!');
        }

        setIsQuantityControlsVisible(true);

    };

    const handleIncrement = (item) => {
        const updatedCart = { ...item, quantity: item?.quantity + 1 };
        setCartItem(updatedCart);

        updateItem(updatedCart);
    };

    const handleDecrement = (item) => {
        const updatedCart = { ...item, quantity: item?.quantity - 1 };
        setCartItem(updatedCart);

        updateItem(updatedCart);
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
