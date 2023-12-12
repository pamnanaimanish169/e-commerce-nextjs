import { useRouter } from 'next/router';

const HeroSection = () => {
    let router = useRouter();

    return (
        <div
            style={{
                background: '#F4F6F5',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <h1
                style={{
                    fontSize: '5rem',
                    fontWeight: 900,
                    marginTop: '1.25rem',
                    marginBottom: '1.25rem',
                }}
            >
                LET'S EXPLORE UNIQUE GADGETS
            </h1>
            <h2
                style={{
                    fontSize: '2rem',
                    fontWeight: 400,
                    marginTop: '1.25rem',
                    marginBottom: '1.25rem',
                }}
            >
                Live for Influential and Innovative fashion!
            </h2>
            <input
                placeholder="Search for products here..."
                style={{
                    height: '3.125rem',
                    borderRadius: '0.625rem',
                    border: 'none',
                    width: '50%',
                    padding: '10px',
                    marginTop: '1.25rem',
                    marginBottom: '1.25rem',
                }}
            />
            <button
                style={{
                    background: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.625rem',
                    padding: '0.9375rem',
                    marginTop: '1.25rem',
                    marginBottom: '1.25rem',
                }}
                onClick={() => router.push('/productListing/all')}
            >
                Shop Now
            </button>
        </div>
    );
};

export default HeroSection;
