import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '../../styles/Home.module.css';

const productDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [productData, setProductData] = useState([]);
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state?.cartList);

    useEffect(() => {
        // Implement a loader here
        id && fetch(`https://dummyjson.com/products/${id}`, {}).then((res) => res.json())
            .then((data) => {
                // put a loader here
                if (data.message && data.message.includes('not found')) {
                    router.push('../404')
                } else {
                    setProductData(data)
                }
            }).catch((error) => console.error('error in connecting', error));
    }, [id]);

    const handleAddToCart = (item) => {
        if (cartList?.find((element) => item?.id === element?.id)) {
            dispatch({ type: "update", payload: item });
        } else {
            dispatch({ type: "add", payload: item });
        }
    }

    return (
        <div>
            <Header></Header>
            <div className={`d-flex justify-content-center ${styles.productWrapper}`}>
                <div className={styles.productImageWrapper}>
                    <img className={styles.productImage} src={productData?.thumbnail} />
                </div>

                <div className={styles.productDescription}>
                    <h1>{productData?.title}</h1>
                    <p>{productData?.description}</p>
                    <div className="d-flex">
                        <p className={styles.individualPrice}>₹{productData?.price}</p>
                        <a className={styles.addToCart} onClick={() => handleAddToCart(productData)}>Add To Cart</a>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default productDetails;