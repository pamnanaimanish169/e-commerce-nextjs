import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Footer = () => {
    const router = useRouter();

    const socialMedia = [
        {
            image: '../social-network-1.svg',
            url: 'https://www.facebook.com/fashionhouse134/',
        },
        {
            image: '../instagram.svg',
            url: 'https://www.instagram.com/modeblogg/?hl=en',
        },
        {
            image: '../twitter.svg',
            url: 'https://twitter.com/twitterfashion?lang=en',
        },
    ];

    const products = [
        'fragrances',
        'skincare',
        'groceries',
        'home-decoration',
        'smartphones',
        'laptops',
    ];

    const navigateTo = (category) => {
        router.push(`/productListing/${category}`);
    };

    const defaultImage = '../defaultIcon.svg';

    const getTitleCase = (str) => {
        str = str.toLowerCase();
        str = str.split(' ');

        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }

        return str.join(' ');
    };
    return (
        <>
            {/* <footer className={styles.footer}>
                <div className={`p-5 ${styles.footerWrapper}`}>
                    <div>
                        <span className={styles.footerSubtitle}>
                            FASHION
                        </span>
                        <p className={styles.footerDescription} style={{
                            
                        }}>
                            Complete your style with awesome clothes from us.
                        </p>

                        <div>
                            {socialMedia.map((element) => (<a key={element?.url} href={element?.url} target={'_blank'}><img src={element?.image || defaultImage} className="mx-1" /></a>))}
                        </div>
                    </div>

                    <div className={styles.footerLlinks}>
                        <div>
                            <label className={styles.company}>Category</label>
                            <ul className={styles.footerLinksWrapper}>
                                {
                                    products.map((element) => (
                                        <li key={element} className={styles.listItem} onClick={() => navigateTo(element)}>{getTitleCase(element.replace(/[^a-zA-Z ]/g, " "))}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </footer> */}
        </>
    );
};

export default Footer;
