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
    const cartList = useSelector((state) => state?.cartList);
    const [contentHeight, setContentHeight] = useState('auto'); // Set default height to 'auto'

    const images = [
        {
            original: 'https://picsum.photos/id/1018/500/300/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/500/300/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/500/300/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

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


    }, []);

    useEffect(() => {
        console.log(localStorage.getItem('gadgets'));
        const allProducts = JSON.parse(localStorage.getItem('gadgets'));
        console.log(allProducts);
        console.log("🚀 ~ file: [id].js:58 ~ productDetails ~ id:", typeof id);

        const singleProduct = allProducts.find((element) => element?.id === parseInt(id));

        console.log(singleProduct, 'singleProduct');
        setSingleProduct(singleProduct);
    }, [id]);

    const handleAddToCart = (item) => {
        if (cartList?.find((element) => item?.id === element?.id)) {
            dispatch({ type: 'update', payload: item });
        } else {
            dispatch({ type: 'add', payload: item });
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
                            <ImageGallery items={singleProduct?.images} />
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
                            <button id="addToCard-button">Add To Cart</button>
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
