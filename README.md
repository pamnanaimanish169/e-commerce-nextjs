# 22-03-2023

- Integrate stripe payment gateway
- Fix the following issues:
  - Fix Shop now URL
  - Fix product detail URLs from http://localhost:3000/productListing/laptops & http://localhost:3000/productListing/all
  - Fix the console errors:
  - Fix design for http://localhost:3000/productDetails/7
  - Fix CSS for http://localhost:3000/productListing/all & http://localhost:3000/productListing/laptops(make all images of same size)
  - Fix CSS for home page(make all images of same size with border radius)
  - Fix the redirection bug from http://localhost:3000/productListing/all & http://localhost:3000/productListing/laptops


# 23-03-2023

- Fix header logo in productDetails & productListing
- Fix footer images in productDetails & productListing
- Fix color of the links in footer
- Make the Social links dyanimc
- Make the Product link dynamic
- Remove the DOWNLOAD APP & GET THE VOUCHER! section
- Fix the styling of Add your email here input & the subsequent button
- Implement routing on SHOP NOW button (Banner section)

# 24-03-2023

- Fix the dropdown Styling
- Make the dropdown stick to top if the user scrolls
- Make it more intuituve

https://dribbble.com/shots/3815376-Shopping-Cart-Dropdown

# 25-03-2023

- Show the dropdown only when the cart length is greater than zero
- Fix the footer position(to the bottom) & make the productWrapper div more center to the screen
- If the item count is 0 then the item should not show in cart
- Implement a 404 page

# 27-03-2023

- Implemetn success & fail page for payments
- Implement loader on success & fail page for payments

# 28-03-2023

- Implement mailchimp newsletter API

# 29-03-2023

- Remove mailchimp API & Implement sendinblue newsletter API
- Remove Inline styles for success.js & failure.js
- Remove products.json

# 30-03-2023

- Merge the code & upload to github
- Clean up the 404, productListing(all), productListing(category), productDetails(id), Loader  , footer, Header.js pages

# 31-03-2023

- Clean up index.jsx


# 03-04-2023

- Implement Jumbotron on all Productlisting pages
- Implement Hover animation on individual products(Productlisting pages).
-  






## Inspirations

https://dribbble.com/shots/18427546-My-Cart-Dropdown-for-Tokopackedi

Extra code:


{/* <!-- Vouchers --> */}
            {/* <div className={styles.vouchers}>
          <div>
            <img src="./match-your-style.svg" alt="banner" className={styles.heroImage} />
          </div>
          <div className={styles.bannerContent}>
            <p className={styles.voucherHeading}>
              PAYDAY SALE NOW
            </p>
            <p className={styles.bannerText}>
              DOWNLOAD APP & GET THE VOUCHER!
            </p>
            <p className={styles.bannerText}>
              Get 30% off for first transaction using Rondovision mobile app for now.
            </p>

            <p className={styles.bannerText}>
              <button style={{ background: "none", border: "none" }}>
                <img src="./apple.svg" />
              </button>
              <button style={{ background: "none", border: "none" }}>
                <img src="./apple.svg" />
              </button>
            </p>
          </div>
        </div> */}
            {/* <!-- Vouchers --> */}