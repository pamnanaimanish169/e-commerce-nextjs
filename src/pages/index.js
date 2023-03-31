import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import { useDispatch } from 'react-redux';

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
  })

  useEffect(() => {
    paymentStatusPromise.then((res) => {
      router.push(res)
      if (res === '/success') {
        dispatch({ type: "empty" });
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    })
    fetch('https://dummyjson.com/products', {}).then((res) => res.json()).then((data) => { setProductList(data?.products) }).catch((err) => { console.error('err', err) });
  }, []);

  const navigateTo = (category) => {
    router.push(`/productListing/${category}`);
  }

  const handleShopNow = () => {
    router.push('/productListing/all');
  }

  const handleEmailOnChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNewsletterSubscription = (email) => {
    let options = {
      method: 'POST',
      headers: {
        "api-key": "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"
      },
      body: JSON.stringify({
        "sender": {
          "name": "Manish Pamnani",
          "email": "manishpamnani169@gmail.com"
        },
        "to": [
          {
            "email": `${email}`,
          }
        ],
        "subject": "Subscription Confirmation!",
        "htmlContent": "<html><head></head><body><p>Hello,</p>You have been subscribed to our mailing list. You will be notified about all the changes, updates & more. Till then stay tuned.</p></body></html>"
      })
    };

    // This is a type of transactinal email(one at a time)
    fetch(`https://api.sendinblue.com/v3/smtp/email`, options).then((res) => res.json())
      .then((data) => {
        if (data?.messageId) {
          setMessage("You've been subscribed to our mailing list. You will recieve a mail soon!")
          setTimeout(() => {
            setMessage('');
            setEmail('');
          }, 3000);
        } else {
          setMessage(data?.message);
        }
      })

  }

  return (
    <>
      {
        !isLoading ?
          <div>
            {/* <!-- Header --> */}
            <Header></Header>
            {/* <!-- Header --> */}

            {/* <!-- Hero Section --> */}
            <div className={styles.heroSection}>
              <div>
                <div className={`row ${styles.exploreRow}`}>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="row">
                      <h1 className={styles.exploreHeading}>
                        LET'S EXPLORE UNIQUE GADGETS
                      </h1>
                    </div>
                    <div className={styles.heroSubHeading}>
                      Live for Influential and Innovative fashion!
                    </div>
                    {/*  */}
                    <div className={`row ${styles?.shopNowWrapper}`}>
                      <span className="col-xs-12 col-md-8 p-0 my-2">
                        <button className={styles.shopNowBtn} onClick={handleShopNow}>Shop Now</button>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6 heroContainer">
                    <img src="./smartphones.png" alt="hero-image" className={styles.heroImage} />
                  </div>

                </div>
              </div>
            </div>
            {/* <!-- Hero Section --> */}

            {/* <!-- Brands --> */}
            <div className={`d-flex justify-content-between ${styles.brands}`}>
              <div className="m-5">
                <img src="./brand-1-bg-removed.png" alt="brand" />
              </div>
              <div className="m-5">
                <img src="./brand-1-bg-removed.png" alt="brand" />

              </div>
              <div className="m-5">
                <img src="./brand-1-bg-removed.png" alt="brand" />

              </div>
              <div className="m-5">
                <img src="./brand-1-bg-removed.png" alt="brand" />

              </div>
              <div className="m-5">
                <img src="./brand-1-bg-removed.png" alt="brand" />

              </div>
              <div className="m-5">
                <img src="./brand-1-bg-removed.png" alt="brand" />

              </div>
            </div>
            {/* {/* <!-- Brands -->  */}

            {/* <!-- New arrivals --> */}
            <div className='row p-5'>
              <div className={`py-5 ${styles.heading}`}>NEW ARRIVALS</div>
              {
                productList?.filter((element) => element?.category === 'laptops').map((element) => (
                  <>
                    <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-4">
                      <div>
                        <img src={element?.thumbnail} alt="arrivals" className={styles.arrivalsThumbnail} />
                        <div className='d-flex justify-content-between'>
                          <div>
                            <div className={styles.arrivalssubTitle}>
                              LAPTOPS & PC
                            </div>
                            <div className={styles.arrivalssubTitle}>
                              Explore Now!
                            </div>
                          </div>
                          <img src="./arrow-1.svg" alt="arrow" onClick={() => navigateTo('laptops')} />
                        </div>
                      </div>
                    </div>
                  </>
                ))
              }
            </div>
            {/* <!-- New arrivals --> */}

            {/* <!-- Banner --> */}
            <div className={styles.banner}>
              <div>
                {/* hero-image */}
                <img src="./hero-image-3.png" alt="banner" className={styles.heroImage} />
              </div>
              <div className={styles.bannerContent}>
                <p className={styles.bannerHeading}>
                  PAYDAY SALE NOW
                </p>
                <p className={styles.bannerText}>
                  Spend minimal $100 get 30% off
                  voucher code for your next purchase
                </p>
                <p className={styles.bannerText}>
                  1 June - 10 June 2021
                </p>

                <p className={styles.bannerText}>
                  *Terms & Conditions apply
                </p>

                <p className={styles.bannerText}>
                  <button className={styles.bannerBtn} onClick={() => navigateTo('../productListing/all')}>SHOP NOW</button>
                </p>
              </div>
            </div>
            {/* <!-- Banner --> */}

            {/* <!-- Young’s Favourite --> */}
            <div className="row p-5">
              <div className={`py-5 ${styles.heading}`}>Young’s Favourite</div>
              {productList?.filter((element) => element?.category === 'smartphones').map((element) => (
                <div className="col-xs-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <div className= {`m-4 ${styles.arrivals}`} >
                    <img src={element?.thumbnail} alt="arrivals" className={styles.favouriteThumbnail} />
                    <div className={styles.favouriteTitle}>{element?.title}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* <!-- Young’s Favourite --> */}

            {/* Newsletter */}
            <div className={styles.newsletterWrapper}>
              <div className="container py-5">
                <div>
                  <div className={`text-center ${styles.newsletterHeading}`}>JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO</div>
                  <div className={`m-2 p-2 text-center ${styles.newsletterSubHeading}`}>Type your email down below and be young wild generation</div>
                  <div className="m-2 p-2 text-center">
                    <input type="search" placeholder="Add your email here" 
                      value={email}
                      onChange={handleEmailOnChange}
                      className={styles.newsletterSubscriptionsInput}
                    />
                    <button className={styles.newsletterSubscriptionsBtn} onClick={() => handleNewsletterSubscription(email)}>Submit</button>
                    <div>
                      {message}
                    </div>
                  </div>
                  {/* <Newsletter /> */}
                </div>
              </div>
            </div>
            {/* Newsletter */}

            {/*  Footer  */}
            <Footer></Footer>
            {/*  Footer */}
          </div>
          : <div>
            <Loader />
          </div>
      }
    </>
  )
}


// https://fakestoreapi.com/products