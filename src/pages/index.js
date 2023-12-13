import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import { useDispatch } from 'react-redux';
import HeroSection from '@/components/HeroSection';
import ProductList from '@/components/ProductList';

export default function Home() {
    let router = useRouter();

    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

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

    useEffect(() => {
        paymentStatusPromise.then((res) => {
            router.push(res);
            if (res === '/success') {
                dispatch({ type: 'empty' });
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        });
        fetch('https://dummyjson.com/products', {})
            .then((res) => res.json())
            .then((data) => {
                setProductList(data?.products);
            })
            .catch((err) => {
                console.error('err', err);
            });
    }, []);

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
        fetch(`https://api.sendinblue.com/v3/smtp/email`, options)
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
            {!isLoading ? (
                <div>
                    <Header></Header>

                    <HeroSection />
                    <ProductList />

                    <div className={styles.newsletterWrapper}>
                        <div className="container py-5">
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
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </>
    );
}

// https://fakestoreapi.com/products

// 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
