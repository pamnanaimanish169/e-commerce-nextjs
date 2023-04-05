import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

const productListing = () => {
    const [productList, setProductList] = useState([]);
    const router = useRouter();
    const { category } = router?.query;

    useEffect(() => {
        category && fetch(`https://dummyjson.com/products/category/${category}`, {}).then((res) => res.json()).then((data) => { setProductList(data?.products) }).catch((err) => { console.error('err', err) })
    }, [category])

    const navigateToProduct = (id) => {
        id && fetch(`https://dummyjson.com/products/${id}`, {}).then((res) => res.json())
            .then((data) => {
                // put a loader here
                if (data.message && data.message.includes('not found')) {
                    router.push('../404')
                } else {
                    data.images.forEach((element) => {
                        images.push({ thumbnail : element, original : element });
                    })
                    localStorage.setItem("productData", JSON.stringify(images));
                    router.push(`../productDetails/${id}`);
                }
            }).catch((error) => console.error('error in connecting', error));
    }

    return (
        <div>
            <Header></Header>

            <div className={styles.productContainer}>
                <div className={styles.bannerImage}>
                    <div className={styles.bannerText}>{category && category.toUpperCase()}</div>
                </div>

                <div className='container my-5'>
                    <div className='row'>
                        {
                            productList.map((element) => (
                                <div key={element.id} className='col my-2' onClick={() => navigateToProduct(element?.id)}>
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
            </div>

            <Footer></Footer>
        </div >
    )
}

export default productListing;