import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import Header from '@/components/Header';

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

    useEffect(() => {
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
                        <div className="productDetail-content col">
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
