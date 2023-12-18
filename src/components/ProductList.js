import { useRouter } from 'next/router';

const ProductList = ({ productList }) => {
    const router = useRouter();
    console.log(productList);

    return (
        <div>
            <h2 className="productList-heading">NEW ARRIVALS</h2>

            <div className="flex-container">
                {productList?.map((element, index) => (
                    <div
                        className="product-item"
                        onClick={() => router.push(`productDetails/${element?.id}`)}
                    >
                        <div className="product-wrapper">
                            <div className="image-wrapper">
                                <div className="overlay"></div>
                                <img
                                    src={element?.images[0]?.original}
                                    className="product-image"
                                />
                                <div className="image-text">{element?.name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
