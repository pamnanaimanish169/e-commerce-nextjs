// Package imports
import { useEffect, useState } from 'react';

// Component imports
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Loader from '@/components/Loader';
import ProductList from '@/components/ProductList';

// Other imports
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    let router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            setProductList(JSON.parse(localStorage.getItem('gadgets')));
            // setIsLoading(false);
        } catch (error) {
            console.error('Error in fetching product details:', error);
            setIsLoading(false);
        }
        console.log(localStorage.getItem('gadgets'));
        paymentStatusPromise.then((res) => {
            router.push(res);
            if (res === '/success') {
                dispatch({ type: 'empty' });
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        });
        // fetch('https://dummyjson.com/products', {})
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setProductList(data?.products);
        //     })
        //     .catch((err) => {
        //         console.error('err', err);
        //     });
    }, []);

    const paymentStatusPromise = new Promise((resolve) => {
        let path = '';
        const query = new URLSearchParams(window.location.search);

        if (query.get('success')) {
            path = '/success';
        } else if (query.get('canceled')) {
            path = '/failure';
        }

        resolve(path);
    });

    const navigateTo = (category) => {
        router.push(`/productListing/${category}`);
    };

    const handleShopNow = () => {
        router.push('/productListing/all');
    };

    const handleEmailOnChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNewsletterSubscription = (email) => {
        let options = {
            method: 'POST',
            headers: {
                'api-key':
                    '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',
            },
            body: JSON.stringify({
                sender: {
                    name: 'Manish Pamnani',
                    email: 'manishpamnani169@gmail.com',
                },
                to: [
                    {
                        email: `${email}`,
                    },
                ],
                subject: 'Subscription Confirmation!',
                htmlContent:
                    '<html><head></head><body><p>Hello,</p>You have been subscribed to our mailing list. You will be notified about all the changes, updates & more. Till then stay tuned.</p></body></html>',
            }),
        };

        // This is a type of transactinal email(one at a time)
        fetch(`https://api.brevo.com/v3/smtp/email`, options)
            .then((res) => res.json())
            .then((data) => {
                if (data?.messageId) {
                    setMessage(
                        "You've been subscribed to our mailing list. You will recieve a mail soon!"
                    );
                    setTimeout(() => {
                        setMessage('');
                        setEmail('');
                    }, 3000);
                } else {
                    setMessage(data?.message);
                }
            });
    };

    return (
        <>
            <div>
                <Header></Header>

                <HeroSection />
                {isLoading ? <Loader /> : <ProductList productList={productList} />}

                <div className={styles.newsletterWrapper}>
                    <div
                        className="container"
                        style={{
                            paddingTop: '3rem',
                            paddingBottom: '8rem',
                        }}
                    >
                        <div>
                            <div
                                className={`text-center ${styles.newsletterHeading}`}
                            >
                                JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO
                            </div>
                            <div
                                className={`m-2 p-2 text-center ${styles.newsletterSubHeading}`}
                            >
                                Type your email down below and be young wild
                                generation
                            </div>
                            <div className="m-2 p-2 text-center">
                                <input
                                    type="search"
                                    placeholder="Add your email here"
                                    value={email}
                                    onChange={handleEmailOnChange}
                                    className={
                                        styles.newsletterSubscriptionsInput
                                    }
                                />
                                <button
                                    className={
                                        styles.newsletterSubscriptionsBtn
                                    }
                                    onClick={() =>
                                        handleNewsletterSubscription(email)
                                    }
                                >
                                    Submit
                                </button>
                                <div>{message}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>
        </>
    );
}

// https://fakestoreapi.com/products
// https://www.typescriptlang.org/
// https://tailwindcss.com/docs/guides/nextjs