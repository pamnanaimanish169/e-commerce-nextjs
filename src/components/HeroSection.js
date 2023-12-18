import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isSearchCompleted, setIsSearchCompleted] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);

    const gadgets = [
        {
            id: 1,
            name: 'iPhone 14',
            Description:
                "The iPhone 14 is poised to redefine smartphone standards. With its sleek design, advanced A16 chip promising blazing speeds, and upgraded camera system for superior photography, it's a tech marvel. ",
            images: [
                { original: 'https://m-cdn.phonearena.com/images/article/139331-wide-two_1200/Gorgeous-iPhone-14-Pro-concept-images-depict-the-fat-48MP-camera-bump-and-all-the-punch-holes.jpg', thumbnail: 'https://m-cdn.phonearena.com/images/article/139331-wide-two_1200/Gorgeous-iPhone-14-Pro-concept-images-depict-the-fat-48MP-camera-bump-and-all-the-punch-holes.jpg' },
                { original: 'https://w7.pngwing.com/pngs/378/624/png-transparent-iphone-14-thumbnail.png', thumbnail: 'https://w7.pngwing.com/pngs/378/624/png-transparent-iphone-14-thumbnail.png' },
                { original: 'https://techgameworld.com/wp-content/uploads/2022/09/1663937924_iPhone-14-Pro-Max-the-best-Apple-smartphone-ever-1600x900.jpg', thumbnail: 'https://techgameworld.com/wp-content/uploads/2022/09/1663937924_iPhone-14-Pro-Max-the-best-Apple-smartphone-ever-1600x900.jpg' }
            ],
            price: '450'
        },
        {
            id: 2,
            name: 'Samsung Galaxy S23',
            Description:
                'The Galaxy S23 and S23+ have a 50 MP wide sensor, a 10 MP telephoto sensor and a 12 MP ultrawide sensor. The S23 Ultra has a 200 MP wide sensor, two 10 MP telephoto sensors and a 12 MP ultrawide sensor. The front camera uses a 12 MP sensor on all three models.',
            images: [
                { original: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-green-back-6.jpg?p=1', thumbnail: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-green-back-6.jpg?p=1' },
                { original: 'https://images.hindustantimes.com/tech/img/2023/02/14/1600x900/SG2_1676367813910_1676367826859_1676367826859.jpg', thumbnail: 'https://images.hindustantimes.com/tech/img/2023/02/14/1600x900/SG2_1676367813910_1676367826859_1676367826859.jpg' },
                { original: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-green-back-6.jpg?fit=2000%2C1333&p=1', thumbnail: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-green-back-6.jpg?fit=2000%2C1333&p=1' }
            ],
            price: '350'
        },
        {
            id: 3,
            name: 'Samsung Galaxy Z Flip5',
            Description:
                "Display Size: Measured diagonally, Galaxy Z Flip5's Main Screen size is 17.03cm (6.7') in the full rectangle and 16.64cm (6.6') accounting for the rounded corners; actual viewable area is less due to the rounded corners and camera hole.",
            images: [
                { original: 'https://www.zdnet.com/a/img/2023/07/31/b55c7119-b84d-425c-8ded-5e3abff6713f/samsung-galaxy-z-flip-5-display-bend-gameboy.jpg', thumbnail: 'https://www.zdnet.com/a/img/2023/07/31/b55c7119-b84d-425c-8ded-5e3abff6713f/samsung-galaxy-z-flip-5-display-bend-gameboy.jpg' },
                { original: 'https://i.insider.com/64ee35278f917700193a263b?width=700', thumbnail: 'https://i.insider.com/64ee35278f917700193a263b?width=700' },
                { original: 'https://images.fonearena.com/blog/wp-content/uploads/2023/08/Samsung-Galaxy-Z-Flip-5_fonearena-16-1024x676.jpg', thumbnail: 'https://images.fonearena.com/blog/wp-content/uploads/2023/08/Samsung-Galaxy-Z-Flip-5_fonearena-16-1024x676.jpg' }
            ],
            price: '550'
        },
    ];

    useEffect(() => {
        console.log(searchTerm.length);
        localStorage.setItem('gadgets', JSON.stringify(gadgets));
        setIsSearchCompleted(false);
        setFilteredSuggestions([]);

        if (searchTerm?.length > 0) {
            const getData = setTimeout(() => {
                setFilteredSuggestions(
                    gadgets.filter((gadget) =>
                        gadget.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                );

                setIsDropdownVisible(true);
                setIsSearchCompleted(true);
                console.log(filteredSuggestions);
            }, 2000);
            return () => clearTimeout(getData);
        }
    }, [searchTerm]);

    const setInput = (value) => {
        console.log(gadgets[0]);
    };

    const handleSuggestionClick = (value) => {
        console.log('handleSuggestionClick', value);
    };

    return (
        <div className="hero-section">
            <h1>LET'S EXPLORE UNIQUE GADGETS</h1>
            <h2>Live for Influential and Innovative fashion!</h2>

            <input
                placeholder="Search for products here..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div class="dropdown">
                <div
                    class="dropdown-options"
                    style={{
                        display: isDropdownVisible ? 'block' : 'none',
                    }}
                >
                    {/* If no results are returned related to the search term */}
                    {isSearchCompleted &&
                        searchTerm.length > 0 &&
                        filteredSuggestions?.length === 0 && (
                            <a href="javscript:void(0)">
                                No suggestions found...
                            </a>
                        )}
                    {/* // If some results are returned related to the search term */}
                    {searchTerm.length > 0 &&
                        filteredSuggestions.length > 0 &&
                        filteredSuggestions.map((suggestion, index) => (
                            <a
                                href={`productDetails/${suggestion?.id}`}
                                key={index}
                            >
                                {suggestion?.name}
                            </a>
                        ))}
                    {/* // If user is currently searching */}
                    {!isSearchCompleted && searchTerm.length > 0 && (
                        <a href="javascript:void(0)">
                            <img
                                src="/rolling-loader.gif"
                                width={32}
                            />
                        </a>
                    )}
                </div>
            </div>
            <button>Shop Now</button>
        </div>
    );
};

export default HeroSection;
