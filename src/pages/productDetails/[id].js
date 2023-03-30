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
            }).catch((error) => console.log('error in connecting', error));
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
            <div className={`d-flex justify-content-center ${styles.productWrapper}`} style={{
                	marginTop: "80px",	
                    marginBottom: "80px"
            }}>
                <div className={styles.productImage}>
                    <img style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "50px",
                        height: "600px"
                    }} src={productData?.thumbnail} />
                </div>

                <div className={styles.productDescription}>
                    <h1>{productData?.title}</h1>
                    <p>{productData?.description}</p>
                    <div style={{ display: 'flex' }}>
                        <p style={{
                            fontSize: "26px",
                            fontWeight: "300",
                            color: "#43474D",
                            marginRight: "20px",
                        }}>₹{productData?.price}</p>
                        <a style={{
                            display: "inline-block",
                            backgroundColor: "#7DC855",
                            borderRadius: "6px",
                            fontSize: "16px",
                            color: "#FFFFFF",
                            textDecoration: "none",
                            padding: "9px 30px",
                            transition: "all .5s",
                            border: "none",
                            height: "45px"
                        }} onClick={() => handleAddToCart(productData)}>Add To Cart</a>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default productDetails;