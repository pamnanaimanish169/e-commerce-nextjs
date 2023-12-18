// Component imports
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// External package imports
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Styles
import styles from '../../styles/Home.module.css';


const productListing = () => {
    const [productList, setProductList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('https://dummyjson.com/products', {}).then((res) => res.json()).then((data) => { setProductList(data?.products); }).catch((err) => { console.error('err', err); });
    }, []);

    const navigateToProduct = (id) => {
        router.push(`../productDetails/${id}`);
    };

    return (
        <div>
            <Header></Header>

            <div className={styles.bannerImage}>
                <div className={styles.bannerText}>All Products</div>
            </div>

            <div className='container my-5'>
                <div className='row'>
                    {
                        productList?.map((element) => (
                            <div key={element.id} className='col my-4' onClick={() => navigateToProduct(element?.id)}>
                                <div className={styles.cardImgWrapper}>
                                    <img src={element?.thumbnail} className={styles.cardImgTop} alt={element?.title} />
                                    <div className={styles.productTitle}>
                                        {element?.title.slice(0, 45)}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default productListing;