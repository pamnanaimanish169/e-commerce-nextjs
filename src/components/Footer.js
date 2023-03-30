import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Footer = () => {
    const router = useRouter();

    const socialMedia = [
        {
            image: "../social-network-1.svg",
            url: "https://www.facebook.com/fashionhouse134/"
        },
        {
            image: "../instagram.svg",
            url: "https://www.instagram.com/modeblogg/?hl=en"
        },
        {
            image: "../twitter.svg",
            url: "https://twitter.com/twitterfashion?lang=en"
        }
    ];

    const products = [
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "smartphones",
        "laptops"
    ]

    const navigateTo = (category) => {
        router.push(`/productListing/${category}`);
    }

    const defaultImage = '../defaultIcon.svg';

    const getTitleCase = (str) => {
        str = str.toLowerCase();
        str = str.split(' ');

        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }

        return str.join(' '); 
    }
    return (
        <>
            {/* <!-- Footer --> */}
            <footer style={{
                background: 'black',
                color: 'white'
            }}>
                <div className={`p-5 ${styles.footerWrapper}`}>
                    <div>
                        <span style={{
                            fontFamily: 'Poppins',
                            fontWeight: '900',
                            fontSize: '40px'
                        }}>
                            FASHION
                        </span>
                        <p style={{
                            fontFamily: 'Poppins',
                            fontWeight: '400',
                            fontSize: '24px',
                            lineHeight: "40px",
                            color: '#8E8E8E'
                        }}>
                            Complete your style with awesome clothes from us.
                        </p>

                        <div>
                            {socialMedia.map((element) => (<a href={element?.url} target={'_blank'}><img src={element?.image || defaultImage} className="mx-1" /></a>))}
                        </div>
                    </div>

                    <div className={styles.footerLlinks}>
                        <div>
                            <label style={{ fontWeight: "bold" }} className={styles.company}>Category</label>
                            <ul style={{ listStyle: "none", paddingLeft: 0, marginLeft: "5px" }}>
                                {
                                    products.map((element, index) => (
                                        <li className={styles.listItem} onClick={() => navigateTo(element)}>{getTitleCase(element.replace(/[^a-zA-Z ]/g, " "))}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Footer --> */}
        </>
    )
}

export default Footer;