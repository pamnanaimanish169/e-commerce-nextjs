// https://www.npmjs.com/package/pure-react-carousel
// https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0
// https://express-labs.github.io/pure-react-carousel/

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

    console.log(JSON.parse(localStorage.getItem('productData')), '++++++');

    // const images = JSON.parse(localStorage.getItem('productData'));

    useEffect(() => {
        // Implement a loader here
        id &&
            fetch(`https://dummyjson.com/products/${id}`, {})
                .then((res) => res.json())
                .then((data) => {
                    // put a loader here
                    if (data.message && data.message.includes('not found')) {
                        router.push('../404');
                    } else {
                        setProductData(data);
                    }
                })
                .catch((error) => console.error('error in connecting', error));
    }, [id]);

    const handleAddToCart = (item) => {
        if (cartList?.find((element) => item?.id === element?.id)) {
            dispatch({ type: 'update', payload: item });
        } else {
            dispatch({ type: 'add', payload: item });
        }
    };

    return (
        // <>
        //     {
        //         !isLoading ?
        //             <div>
        //                 <Header></Header>

        //                 <div className={`${styles.productWrapper}`}>

        //                     <div className={styles.productDescription}>
        //                         <h1>{productData?.title}</h1>
        //                         <p>{productData?.description}</p>
        //                         <div className="d-flex">
        //                             <p className={styles.individualPrice}>₹{productData?.price}</p>
        //                             <a className={styles.addToCart} onClick={() => handleAddToCart(productData)}>Add To Cart</a>
        //                         </div>
        //                     </div>

        //                     {images && images.length > 0 && <div className={styles.carouselWrapper}>
        //                         <ImageGallery
        //                             items={images}
        //                             showFullscreenButton={false}
        //                             showPlayButton={false}
        //                         ></ImageGallery>
        //                     </div>}
        //                     {
        //                         console.log((images), 'images', typeof images)
        //                     }
        //                 </div>

        //                 <div>
        //                     <Footer></Footer>
        //                 </div>

        //             </div>
        //             :
        //             <Loader />
        //     }
        // </>
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
                        <h2>
                            The most advanced chips ever built for a personal
                            computer.
                        </h2>
                        <p>$ 123.12</p>
                        <button>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
        // <div className="container">
        //     <div className="row">
        //         <div className="col">1</div>
        //         <div className="col">2</div>
        //     </div>
        // </div>
    );
};

export default productDetails;

// https://www.npmjs.com/package/react-image-gallery
// https://www.freakyjolly.com/react-image-slider-with-thumbnail-example-using-react-image-slider-tutorial/
