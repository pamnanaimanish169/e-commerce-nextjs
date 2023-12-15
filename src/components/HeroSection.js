import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isSearchCompleted, setIsSearchCompleted] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);

    const gadgets = [
        {
            name: 'iPhone 14',
            Description:
                "The iPhone 14 is poised to redefine smartphone standards. With its sleek design, advanced A16 chip promising blazing speeds, and upgraded camera system for superior photography, it's a tech marvel. ",
            image: 'https://www.digitaltrends.com/wp-content/uploads/2022/09/apple-iphone-14-review-11.jpg?p=1',
        },
        {
            name: 'Samsung Galaxy S23',
            Description:
                'The Galaxy S23 and S23+ have a 50 MP wide sensor, a 10 MP telephoto sensor and a 12 MP ultrawide sensor. The S23 Ultra has a 200 MP wide sensor, two 10 MP telephoto sensors and a 12 MP ultrawide sensor. The front camera uses a 12 MP sensor on all three models.',
            image: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-green-back-6.jpg?p=1',
        },
        {
            name: 'Samsung Galaxy Z Flip5',
            Description:
                "Display Size: Measured diagonally, Galaxy Z Flip5's Main Screen size is 17.03cm (6.7') in the full rectangle and 16.64cm (6.6') accounting for the rounded corners; actual viewable area is less due to the rounded corners and camera hole.",
            image: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-green-back-6.jpg?p=1',
        },
    ];

    useEffect(() => {
        console.log(searchTerm.length);
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
                                href="javascript:void(0)"
                                key={index}
                            >
                                {suggestion?.name}
                            </a>
                        ))}
                    {/* // If user is currently searching */}
                    {!isSearchCompleted && searchTerm.length > 0 && (
                        <a href="javascript:void(0)">Loading...</a>
                    )}
                </div>
            </div>
            <button>Shop Now</button>
        </div>
    );
};

export default HeroSection;
