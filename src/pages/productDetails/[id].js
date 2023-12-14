import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
// import Header from '@/components/Header';

const productDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
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
            console.log(parent);
            console.log(element);

            if (parent && element) {
                parent.style.height = `${element.clientHeight}px`;
                setContentHeight(`${element.clientHeight}px`);
                setIsContentLoaded(true);
            }
        }, 1000);
    }, []);

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
                <div className="productDetail-parent container">
                    <div className="row">
                        <div className="productDetail-image col">
                            <ImageGallery items={images} />
                        </div>
                        <div
                            className="productDetail-content col"
                            style={{
                                height: contentHeight,
                                opacity: isContentLoaded ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        >
                            <h1>Macbook Pro</h1>
                            <h4 className="productDetail-subheading">
                                The most advanced chips ever built for a
                                personal computer.
                            </h4>
                            <p>
                                <b>$ 123.12</b>
                            </p>
                            <button id="addToCard-button">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default productDetails;

// https://commercejs.com/docs - For backend
