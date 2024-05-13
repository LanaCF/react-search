import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

export const Home = () => {
    const { brand: selectedBrandFromSearch, numberStrings: selectedNumberStringsFromSearch, color: selectedColorFromSearch, type: selectedTypeFromSearch, country: selectedCountryFromSearch } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [allGuitars, setAllGuitars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState({
        brand: selectedBrandFromSearch || '',
        numberStrings: selectedNumberStringsFromSearch || '',
        color: selectedColorFromSearch || '',
        type: selectedTypeFromSearch || '',
        country: selectedCountryFromSearch || ''
    });
    const [filteredGuitars, setFilteredGuitars] = useState([]);

    const handleFilterChange = (filterType, value) => {
        const updatedFilters = { ...selectedFilters };
        const isFilterSelected = updatedFilters[filterType] === value;
        
        if (isFilterSelected) {
            updatedFilters[filterType] = '';
        } else {
            updatedFilters[filterType] = value;
        }
        
        setSelectedFilters(updatedFilters);

        const searchParams = new URLSearchParams(location.search);
        for (const key in updatedFilters) {
            if (updatedFilters[key]) {
                searchParams.set(key, updatedFilters[key]);
            } else {
                searchParams.delete(key);
            }
        }
        const queryString = searchParams.toString();
        navigate(`${location.pathname}?${queryString}`);
    };

    useEffect(() => {
        setLoading(true);
        let url = 'http://localhost:3000/guitars';

        const queryParams = [];
        for (const key in selectedFilters) {
            if (selectedFilters[key]) {
                queryParams.push(`${key}=${selectedFilters[key]}`);
            }
        }
        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAllGuitars(data);
                setFilteredGuitars(data);
                setLoading(false);
            })
            .catch(error => console.error('Помилка при отриманні даних з сервера:', error));
    }, [selectedFilters, location.pathname]);

    const getFilterOptions = (filterType, guitars) => {
        const options = new Map();
        guitars.forEach(guitar => {
            const value = guitar[filterType];
            options.set(value, (options.get(value) || 0) + 1);
        });
        return Array.from(options).map(([value, count]) => ({ value, count }));
    };

    useEffect(() => {
        setLoading(true);
        let url = 'http://localhost:3000/guitars';

        // Додавання параметрів фільтрації до URL-адреси
        const queryParams = [];

        if (selectedFilters.brand) {
            queryParams.push(`brand=${selectedFilters.brand}`);
        }
        if (selectedFilters.numberStrings) {
            queryParams.push(`numberStrings=${selectedFilters.numberStrings}`);
        }
        if (selectedFilters.color) {
            queryParams.push(`color=${selectedFilters.color}`);
        }
        if (selectedFilters.type) {
            queryParams.push(`type=${selectedFilters.type}`);
        }
        if (selectedFilters.country) {
            queryParams.push(`country=${selectedFilters.country}`);
        }

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAllGuitars(data);
                setFilteredGuitars(data);
                setLoading(false);
            })
            .catch(error => console.error('Помилка при отриманні даних з сервера:', error));
    }, [selectedFilters]);

    const handleResetFilters = () => {
        setLoading(true);
        fetch('http://localhost:3000/guitars')
            .then(response => response.json())
            .then(data => {
                setAllGuitars(data);
                setLoading(false);
            })
            .catch(error => console.error('Помилка при отриманні даних з сервера:', error));

        // Очищення вибраних фільтрів
        setSelectedFilters({
            brand: '',
            numberStrings: '',
            color: '',
            type: '',
            country: ''
        });
    };

    return (
        <div className="container">
            <div className="header">
                <Link to='/' onClick={ handleResetFilters }>
                    <h1 className="title-page">ГІТАРИ</h1>
                </Link>
            </div>

            <div>
                <p><b>Всього товарів на сторінці:</b> { allGuitars.length }</p>

                <Link to='/' onClick={ handleResetFilters }>
                    <button onClick={ handleResetFilters }>Очистити фільтр</button>
                </Link>                
            </div>

            <div className="wrapper">
                <div className="filter-block">
                    <div className="brand filter-box">
                        <h3>БРЕНД</h3>
                        {
                            getFilterOptions('brand', allGuitars).map(option => (
                                <form key={ option.value } className="brand-box">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="info"
                                            className="info"
                                            checked={ selectedFilters.brand === option.value }
                                            onChange={ () => handleFilterChange('brand', option.value) }
                                        />
                                        { option.value } ({ option.count })
                                    </label>
                                </form>
                            ))
                        }
                    </div>

                    <div className="number-strings filter-box">
                        <h3>КІЛЬКІСТЬ СТРУН</h3>
                        {
                            getFilterOptions('numberStrings', allGuitars).map(option => (
                                <form key={ option.value } className="brand-box">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="info"
                                            className="info"
                                            checked={ selectedFilters.numberStrings === option.value }
                                            onChange={ () => handleFilterChange('numberStrings', option.value) }
                                        />
                                        { option.value } ({ option.count })
                                    </label>
                                </form>
                            ))
                        }
                    </div>

                    <div className="color filter-box">
                        <h3>КОЛІР</h3>
                        {
                            getFilterOptions('color', allGuitars).map(option => (
                                <form key={ option.value } className="brand-box">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="info"
                                            className="info"
                                            checked={ selectedFilters.color === option.value }
                                            onChange={ () => handleFilterChange('color', option.value) }
                                        />
                                        { option.value } ({ option.count })
                                    </label>
                                </form>
                            ))
                        }
                    </div>

                    <div className="type filter-box">
                        <h3>ТИП</h3>
                        {
                            getFilterOptions('type', allGuitars).map(option => (
                                <form key={ option.value } className="brand-box">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="info"
                                            className="info"
                                            checked={ selectedFilters.type === option.value }
                                            onChange={ () => handleFilterChange('type', option.value) }
                                        />
                                        { option.value } ({ option.count })
                                    </label>
                                </form>
                            ))
                        }
                    </div>

                    <div className="country filter-box">
                        <h3>КРАЇНА</h3>
                        {
                            getFilterOptions('country', allGuitars).map(option => (
                                <form key={ option.value } className="brand-box">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="info"
                                            className="info"
                                            checked={ selectedFilters.country === option.value }
                                            onChange={ () => handleFilterChange('country', option.value) }
                                        />
                                        { option.value } ({ option.count })
                                    </label>
                                </form>
                            ))
                        }
                    </div>
                </div>

                <div className="products-block">
                    {
                        loading ? (
                            <p>Дані завантажуються...</p>
                        ) : (
                            allGuitars.map(guitar => (
                                <div key={guitar.id} className="guitar">
                                    <div className="guitar-img-box">
                                        <img src={process.env.PUBLIC_URL + guitar.img} alt={guitar.title} className="guitar__img" />
                                    </div>
                                    <div className="guitar-info">
                                        <h3>{guitar.title}</h3>
                                        <p className="info"><b>Бренд:</b> {guitar.brand}</p>
                                        <p className="info"><b>Кількість струн:</b> {guitar.numberStrings}</p>
                                        <p className="info"><b>Колір:</b> {guitar.color}</p>
                                        <p className="info"><b>Тип:</b> {guitar.type}</p>
                                        <p className="info"><b>Країна:</b> {guitar.country}</p>
                                        <p className="info"><b>Ціна:</b> {guitar.price} грн.</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}


































// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

// export const Home = () => {
//     const { brand: selectedBrandFromSearch, numberStrings: selectedNumberStringsFromSearch, color: selectedColorFromSearch, type: selectedTypeFromSearch, country: selectedCountryFromSearch } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
    
//     const [allGuitars, setAllGuitars] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedFilters, setSelectedFilters] = useState({
//         brand: selectedBrandFromSearch || '',
//         numberStrings: selectedNumberStringsFromSearch || '',
//         color: selectedColorFromSearch || '',
//         type: selectedTypeFromSearch || '',
//         country: selectedCountryFromSearch || ''
//     });
//     const [filteredGuitars, setFilteredGuitars] = useState([]);

//     const handleFilterChange = (filterType, value) => {
//         const updatedFilters = { ...selectedFilters };
//         const isFilterSelected = updatedFilters[filterType] === value;
        
//         if (isFilterSelected) {
//             updatedFilters[filterType] = '';
//         } else {
//             updatedFilters[filterType] = value;
//         }
        
//         setSelectedFilters(updatedFilters);

//         const searchParams = new URLSearchParams(location.search);
//         for (const key in updatedFilters) {
//             if (updatedFilters[key]) {
//                 searchParams.set(key, updatedFilters[key]);
//             } else {
//                 searchParams.delete(key);
//             }
//         }
//         const queryString = searchParams.toString();
//         navigate(`${location.pathname}?${queryString}`);
//     };

//     useEffect(() => {
//         setLoading(true);
//         let url = 'http://localhost:3000/guitars';

//         const queryParams = [];
//         for (const key in selectedFilters) {
//             if (selectedFilters[key]) {
//                 queryParams.push(`${key}=${selectedFilters[key]}`);
//             }
//         }
//         if (queryParams.length > 0) {
//             url += `?${queryParams.join('&')}`;
//         }

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 setAllGuitars(data);
//                 setFilteredGuitars(data);
//                 setLoading(false);
//             })
//             .catch(error => console.error('Помилка при отриманні даних з сервера:', error));
//     }, [selectedFilters, location.pathname]);

//     const getFilterOptions = (filterType, guitars) => {
//         const options = new Map();
//         guitars.forEach(guitar => {
//             const value = guitar[filterType];
//             options.set(value, (options.get(value) || 0) + 1);
//         });
//         return Array.from(options).map(([value, count]) => ({ value, count }));
//     };

//     useEffect(() => {
//         setLoading(true);
//         let url = 'http://localhost:3000/guitars';

//         // Додавання параметрів фільтрації до URL-адреси
//         const queryParams = [];

//         if (selectedFilters.brand) {
//             queryParams.push(`brand=${selectedFilters.brand}`);
//         }
//         if (selectedFilters.numberStrings) {
//             queryParams.push(`numberStrings=${selectedFilters.numberStrings}`);
//         }
//         if (selectedFilters.color) {
//             queryParams.push(`color=${selectedFilters.color}`);
//         }
//         if (selectedFilters.type) {
//             queryParams.push(`type=${selectedFilters.type}`);
//         }
//         if (selectedFilters.country) {
//             queryParams.push(`country=${selectedFilters.country}`);
//         }

//         if (queryParams.length > 0) {
//             url += `?${queryParams.join('&')}`;
//         }

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 setAllGuitars(data);
//                 setFilteredGuitars(data);
//                 setLoading(false);
//             })
//             .catch(error => console.error('Помилка при отриманні даних з сервера:', error));
//     }, [selectedFilters]);

//     const handleResetFilters = () => {
//         setLoading(true);
//         fetch('http://localhost:3000/guitars')
//             .then(response => response.json())
//             .then(data => {
//                 setAllGuitars(data);
//                 setLoading(false);
//             })
//             .catch(error => console.error('Помилка при отриманні даних з сервера:', error));

//         // Очищення вибраних фільтрів
//         setSelectedFilters({
//             brand: '',
//             numberStrings: '',
//             color: '',
//             type: '',
//             country: ''
//         });
//     };

//     return (
//         <div className="container">
//             <div className="header">
//                 <Link to='/' onClick={ handleResetFilters }>
//                     <h1 className="title-page">ГІТАРИ</h1>
//                 </Link>
//             </div>

//             <div>
//                 <p><b>Всього товарів на сторінці:</b> { allGuitars.length }</p>

//                 <Link to='/' onClick={ handleResetFilters }>
//                     <button onClick={ handleResetFilters }>Очистити фільтр</button>
//                 </Link>                
//             </div>

//             <div className="wrapper">
//                 <div className="filter-block">
//                     <div className="brand filter-box">
//                         <h3>БРЕНД</h3>
//                         {
//                             getFilterOptions('brand', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.brand === option.value }
//                                             onChange={ () => handleFilterChange('brand', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="number-strings filter-box">
//                         <h3>КІЛЬКІСТЬ СТРУН</h3>
//                         {
//                             getFilterOptions('numberStrings', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.numberStrings === option.value }
//                                             onChange={ () => handleFilterChange('numberStrings', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="color filter-box">
//                         <h3>КОЛІР</h3>
//                         {
//                             getFilterOptions('color', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.color === option.value }
//                                             onChange={ () => handleFilterChange('color', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="type filter-box">
//                         <h3>ТИП</h3>
//                         {
//                             getFilterOptions('type', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.type === option.value }
//                                             onChange={ () => handleFilterChange('type', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="country filter-box">
//                         <h3>КРАЇНА</h3>
//                         {
//                             getFilterOptions('country', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.country === option.value }
//                                             onChange={ () => handleFilterChange('country', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>
//                 </div>

//                 <div className="products-block">
//                     {
//                         loading ? (
//                             <p>Дані завантажуються...</p>
//                         ) : (
//                             allGuitars.map(guitar => (
//                                 <div key={guitar.id} className="guitar">
//                                     <div className="guitar-img-box">
//                                         <img src={process.env.PUBLIC_URL + guitar.img} alt={guitar.title} className="guitar__img" />
//                                     </div>
//                                     <div className="guitar-info">
//                                         <h3>{guitar.title}</h3>
//                                         <p className="info"><b>Бренд:</b> {guitar.brand}</p>
//                                         <p className="info"><b>Кількість струн:</b> {guitar.numberStrings}</p>
//                                         <p className="info"><b>Колір:</b> {guitar.color}</p>
//                                         <p className="info"><b>Тип:</b> {guitar.type}</p>
//                                         <p className="info"><b>Країна:</b> {guitar.country}</p>
//                                         <p className="info"><b>Ціна:</b> {guitar.price} грн.</p>
//                                     </div>
//                                 </div>
//                             ))
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }


//=============================================================================



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// export const Home = () => {
//     const { brand: selectedBrand, numberStrings: selectedNumberStrings, color: selectedColor, type: selectedType, country: selectedCountry } = useParams();
//     const [allGuitars, setAllGuitars] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Стан для зберігання вибраних фільтрів
//     const [selectedFilters, setSelectedFilters] = useState({
//         brand: selectedBrand || '',
//         numberStrings: selectedNumberStrings || '',
//         color: selectedColor || '',
//         type: selectedType || '',
//         country: selectedCountry || ''
//     });
//     // Стан для відфільтрованих гітар
//     const [filteredGuitars, setFilteredGuitars] = useState([]);

//     // Обробник зміни вибраних фільтрів
//     // const handleFilterChange = (filterType, value) => {
//     //     // Перевірка, чи вже обраний фільтр збігається з новим значенням
//     //     const isAlreadySelected = selectedFilters[filterType] === value;
    
//     //     // Вибір нового фільтру, якщо він ще не обраний, і зняття вибраного фільтру, якщо він вже обраний
//     //     setSelectedFilters(prevFilters => ({
//     //         ...prevFilters,
//     //         [filterType]: isAlreadySelected ? '' : value
//     //     }));
//     // };

//     const handleFilterChange = (filterType, value) => {
//         // Створюємо копію поточних вибраних фільтрів
//         const updatedFilters = { ...selectedFilters };
        
//         // Перевіряємо, чи фільтр вже вибраний
//         const isFilterSelected = updatedFilters[filterType] === value;
        
//         // Якщо фільтр вже вибраний, знімаємо його
//         if (isFilterSelected) {
//             updatedFilters[filterType] = '';
//         } else {
//             // Інакше оновлюємо значення фільтра
//             updatedFilters[filterType] = value;
//         }
        
//         // Оновлюємо стан вибраних фільтрів
//         setSelectedFilters(updatedFilters);
//     };

//     useEffect(() => {
//         setLoading(true);
//         let url = 'http://localhost:3000/guitars';

//         // Додавання параметрів фільтрації до URL-адреси
//         const queryParams = [];

//         if (selectedFilters.brand) {
//             queryParams.push(`brand=${selectedFilters.brand}`);
//         }
//         if (selectedFilters.numberStrings) {
//             queryParams.push(`numberStrings=${selectedFilters.numberStrings}`);
//         }
//         if (selectedFilters.color) {
//             queryParams.push(`color=${selectedFilters.color}`);
//         }
//         if (selectedFilters.type) {
//             queryParams.push(`type=${selectedFilters.type}`);
//         }
//         if (selectedFilters.country) {
//             queryParams.push(`country=${selectedFilters.country}`);
//         }

//         if (queryParams.length > 0) {
//             url += `?${queryParams.join('&')}`;
//         }

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 setAllGuitars(data);
//                 setFilteredGuitars(data);
//                 setLoading(false);
//             })
//             .catch(error => console.error('Помилка при отриманні даних з сервера:', error));
//     }, [selectedFilters]);

//     // Допоміжна функція для отримання варіантів фільтрів та їх кількостей
//     const getFilterOptions = (filterType, guitars) => {
//         const options = new Map();
//         guitars.forEach(guitar => {
//             const value = guitar[filterType];
//             options.set(value, (options.get(value) || 0) + 1);
//         });
//         return Array.from(options).map(([value, count]) => ({ value, count }));
//     };

//     return (
//         <div className="container">
//             <div className="header">
//                 <h1 className="title-page">ГІТАРИ</h1>
//             </div>

//             <div className="wrapper">
//                 <div className="filter-block">
//                     <div className="brand filter-box">
//                         <h3>БРЕНД</h3>
//                         {
//                             getFilterOptions('brand', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.brand === option.value }
//                                             onChange={ () => handleFilterChange('brand', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="number-strings filter-box">
//                         <h3>КІЛЬКІСТЬ СТРУН</h3>
//                         {
//                             getFilterOptions('numberStrings', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.numberStrings === option.value }
//                                             onChange={ () => handleFilterChange('numberStrings', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="color filter-box">
//                         <h3>КОЛІР</h3>
//                         {
//                             getFilterOptions('color', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.color === option.value }
//                                             onChange={ () => handleFilterChange('color', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="type filter-box">
//                         <h3>ТИП</h3>
//                         {
//                             getFilterOptions('type', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.type === option.value }
//                                             onChange={ () => handleFilterChange('type', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>

//                     <div className="country filter-box">
//                         <h3>КРАЇНА</h3>
//                         {
//                             getFilterOptions('country', allGuitars).map(option => (
//                                 <form key={ option.value } className="brand-box">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="info"
//                                             className="info"
//                                             checked={ selectedFilters.country === option.value }
//                                             onChange={ () => handleFilterChange('country', option.value) }
//                                         />
//                                         { option.value } ({ option.count })
//                                     </label>
//                                 </form>
//                             ))
//                         }
//                     </div>
//                 </div>

//                 <div className="products-block">
//                     {
//                         loading ? (
//                             <p>Дані завантажуються...</p>
//                         ) : (
//                             filteredGuitars.map(guitar => (
//                                 <div key={guitar.id} className="guitar">
//                                     <div className="guitar-img-box">
//                                         <img src={process.env.PUBLIC_URL + guitar.img} alt={guitar.title} className="guitar__img" />
//                                     </div>
//                                     <div className="guitar-info">
//                                         <h3>{guitar.title}</h3>
//                                         <p className="info"><b>Бренд:</b> {guitar.brand}</p>
//                                         <p className="info"><b>Кількість струн:</b> {guitar.numberStrings}</p>
//                                         <p className="info"><b>Колір:</b> {guitar.color}</p>
//                                         <p className="info"><b>Тип:</b> {guitar.type}</p>
//                                         <p className="info"><b>Країна:</b> {guitar.country}</p>
//                                         <p className="info"><b>Ціна:</b> {guitar.price} грн.</p>
//                                     </div>
//                                 </div>
//                             ))
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }