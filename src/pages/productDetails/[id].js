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
    const { id } = router.query;

    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [singleProduct, setSingleProduct] = useState();
    const dispatch = useDispatch();
    const [cartList, setCartList] = useState();
    const [contentHeight, setContentHeight] = useState('auto'); // Set default height to 'auto'
    const [QuantityControlsVisible, setQuantityControlsVisible] = useState(false);
    const cartItem = cartList?.find((element) => element?.id === parseInt(id));



    useEffect(() => {
        setTimeout(() => {
            const parent = document.querySelector('.productDetail-content');
            const element = document.querySelector('.image-gallery-image');

            if (parent && element) {
                parent.style.height = `${element.clientHeight}px`;
                setContentHeight(`${element.clientHeight}px`);
                setIsContentLoaded(true);
            }
        }, 1000);
        setCartList(JSON.parse(localStorage.getItem('cartList')));
    }, []);

    useEffect(() => {
        const allProducts = JSON.parse(localStorage.getItem('gadgets'));
        const singleProduct = allProducts?.find((element) => element?.id === parseInt(id));
        setSingleProduct(singleProduct);
    }, [id]);

    useEffect(() => {
        console.log(singleProduct);
    }, [cartList]);

    const handleAddToCart = (item) => {
        if (cartList?.find((element) => (element?.id) !== (singleProduct?.id))) {
            const updatedCartList = [...(cartList || []), { ...singleProduct, quantity: 1 }];
            console.log(updatedCartList);
            localStorage.setItem('cartList', JSON.stringify(updatedCartList));
        }

        setQuantityControlsVisible(true);
    };

    const handleIncrement = () => {
        // Retrieve the cartList from localStorage
        const cartList = JSON.parse(localStorage.getItem('cartList'));

        // Check if the cartList exists and the product with the given ID is in the list
        if (cartList && cartList.some(item => item.id === singleProduct?.id)) {
            // Increment the quantity of the product in cartList
            const updatedCartList = cartList.map(item => {
                if (item.id === singleProduct?.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });

            // Update the 'cartList' in localStorage with the updated cartList
            localStorage.setItem('cartList', JSON.stringify(updatedCartList));
        }
    };

    const handleDecrement = () => {
        // Retrieve the cartList from localStorage
        const cartList = JSON.parse(localStorage.getItem('cartList'));

        if (cartList && cartList.some(item => item?.id === singleProduct?.id)) {
            const updatedCartList = cartList.map(item => {
                if (item?.id === singleProduct?.id) {
                    return { ...item, quantity: item?.quantity - 1 };
                }
                return item;
            });

            localStorage.setItem('cartList', JSON.stringify(updatedCartList));
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
                {singleProduct ? <div className="productDetail-parent container" key={singleProduct?.id}>
                    <div className="row">
                        <div className="productDetail-image col">
                            <ImageGallery items={singleProduct?.images} showFullscreenButton={false} showPlayButton={false} />
                        </div>
                        <div
                            className="productDetail-content col"
                            style={{
                                height: contentHeight,
                                opacity: isContentLoaded ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        >
                            <h1>{singleProduct?.name}</h1>
                            <h4 className="productDetail-subheading">
                                {singleProduct?.Description}
                            </h4>
                            <p>
                                <b>$ {singleProduct?.price}</b>
                            </p>
                            <button id="addToCard-button" onClick={(singleProduct) => handleAddToCart(singleProduct)}>Add To Cart</button>

                            <div style={{
                                display: QuantityControlsVisible ? 'flex' : 'none',
                            }}>
                                <div className="quantity-controls">
                                    <button className="control-button" onClick={handleIncrement}>+</button>
                                    <div className="quantity-display">{cartItem?.quantity}</div>
                                    <button className="control-button" onClick={handleDecrement}>-</button>
                                </div>

                                <div className="total-price">
                                    $ <b>{cartItem?.quantity * singleProduct?.price}</b>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> : <div className="no-product-found"><b>No Product found with the mentioned id:{id}...</b></div>}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default productDetails;

// https://commercejs.com/docs - For backend
