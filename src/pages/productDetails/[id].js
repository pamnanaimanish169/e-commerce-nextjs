// https://www.npmjs.com/package/pure-react-carousel
// https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0
// https://express-labs.github.io/pure-react-carousel/

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from 'pure-react-carousel';
import AliceCarousel from 'react-alice-carousel';
import ImageGallery from 'react-image-gallery';
import Loader from '@/components/Loader';

const productDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state?.cartList);

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

    useLayoutEffect(() => {
        const parent = document.querySelector('.productDetail-content');
        setTimeout(() => {
            // set a loader here(i.e. on page load and each refresh)
            const element = document.querySelector('.image-gallery-image');
            parent.style.height = `${element.clientHeight}px`;
            console.log('here');
        }, 2000);
    }, []);

    const handleAddToCart = (item) => {
        if (cartList?.find((element) => item?.id === element?.id)) {
            dispatch({ type: 'update', payload: item });
        } else {
            dispatch({ type: 'add', payload: item });
        }
    };

    return (
        <div
            style={{
                marginTop: '100px',
            }}
        >
            <div className="productDetail-parent container">
                <div className="row">
                    <div className="productDetail-image col">
                        <ImageGallery items={images} />
                    </div>
                    <div className="productDetail-content col">
                        <h1>Macbook Pro</h1>
                        <h4 className="productDetail-subheading">
                            The most advanced chips ever built for a personal
                            computer.
                        </h4>
                        <p>
                            <b>$ 123.12</b>
                        </p>
                        <button id="addToCard-button">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default productDetails;

// https://www.npmjs.com/package/react-image-gallery
// https://www.freakyjolly.com/react-image-slider-with-thumbnail-example-using-react-image-slider-tutorial/
// https://commercejs.com/docs - For backend
