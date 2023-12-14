import { useRouter } from 'next/router';

const ProductList = () => {
    const router = useRouter();

    return (
        <div>
            <h2 className="productList-heading">NEW ARRIVALS</h2>

            <div className="flex-container">
                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>
                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>

                <div
                    className="product-item"
                    onClick={() => router.push('productDetails/1')}
                >
                    <div className="product-wrapper">
                        <div className="image-wrapper">
                            <div className="overlay"></div>
                            <img
                                src="./macbook-pro.jpeg"
                                className="product-image"
                            />
                            <div className="image-text">Macbook Pro</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
