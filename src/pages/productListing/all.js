import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const productListing = () => {
    const [productList, setProductList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('https://dummyjson.com/products', {}).then((res) => res.json()).then((data) => { setProductList(data?.products) }).catch((err) => { console.log('err', err) });
    }, []);

    const navigateToProduct = (id) => {
        router.push(`../productDetails/${id}`);
    }

    return (
        <div>
            <Header></Header>

            <div className='container my-5'>
                <div className='row'>
                    {
                        productList.map((element) => (
                            <div className='col my-2' onClick={() => navigateToProduct(element?.id)}>
                                <div style={{ width: "18rem", margin: "0 auto" }}>
                                    <img src={element?.thumbnail} className="card-img-top" alt={element?.title} style={{
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: '50px'
                                    }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{element?.title.slice(0, 45)}</h5>
                                        <p className="card-text">{element?.description.slice(0, 131)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default productListing;