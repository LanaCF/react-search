// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// export const FilteredProducts = () => {
//     const { brand, numberStrings, color, type, country } = useParams();
//     const [filteredGuitars, setFilteredGuitars] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(true);
//         let url = 'http://localhost:3000/guitars';

//         // Додавання параметрів фільтрації до URL-адреси
//         const queryParams = [];

//         if (brand) {
//             queryParams.push(`brand=${brand}`);
//         }
//         if (numberStrings) {
//             queryParams.push(`numberStrings=${numberStrings}`);
//         }
//         if (color) {
//             queryParams.push(`color=${color}`);
//         }
//         if (type) {
//             queryParams.push(`type=${type}`);
//         }
//         if (country) {
//             queryParams.push(`country=${country}`);
//         }

//         if (queryParams.length > 0) {
//             url += `?${queryParams.join('&')}`;
//         }

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 setFilteredGuitars(data);
//                 setLoading(false);
//             })
//             .catch(error => console.error('Помилка при отриманні даних з сервера:', error));
//     }, [brand, numberStrings, color, type, country]);

//     return (
//         <>
//             {loading ? (
//                 <p>Дані завантажуються...</p>
//             ) : (
//                 filteredGuitars.map(guitar => (
//                     <div key={guitar.id} className="guitar">
//                         <div className="guitar-img-box">
//                             <img src={process.env.PUBLIC_URL + guitar.img} alt={guitar.title} className="guitar__img" />
//                         </div>
//                         <div className="guitar-info">
//                             <h3>{guitar.title}</h3>
//                             <p className="info"><b>Бренд:</b> {guitar.brand}</p>
//                             <p className="info"><b>Кількість струн:</b> {guitar.numberStrings}</p>
//                             <p className="info"><b>Колір:</b> {guitar.color}</p>
//                             <p className="info"><b>Тип:</b> {guitar.type}</p>
//                             <p className="info"><b>Країна:</b> {guitar.country}</p>
//                             <p className="info"><b>Ціна:</b> {guitar.price} грн.</p>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </>
//     );
// };


















// // import React, { useState, useEffect } from 'react';

// // export const FilteredProducts = ({ property, onChange }) => {
// //   const [filterCounts, setFilterCounts] = useState({});
// //   const [selectedFilters, setSelectedFilters] = useState([]);

// //   useEffect(() => {
// //     fetch(`http://localhost:3000/guitars/${property}`)
// //       .then((response) => response.json())
// //       .then((data) => setFilterCounts(data))
// //       .catch((error) => console.error('Помилка при отриманні даних з сервера:', error));
// //   }, [property]);

// //   const handleFilterChange = (value) => {
// //     const newFilters = [...selectedFilters];
// //     const index = newFilters.indexOf(value);
// //     if (index === -1) {
// //       newFilters.push(value);
// //     } else {
// //       newFilters.splice(index, 1);
// //     }
// //     setSelectedFilters(newFilters);
// //     onChange(newFilters);
// //   };

// //   return (
// //     <div className="filter-box">
// //       <h3>{property.toUpperCase()}</h3>
// //       {Object.keys(filterCounts).map((value) => (
// //         <form key={value} className="brand-box">
// //           <label>
// //             <input
// //               type="checkbox"
// //               name={value}
// //               checked={selectedFilters.includes(value)}
// //               onChange={() => handleFilterChange(value)}
// //             />
// //             {value} ({filterCounts[value]})
// //           </label>
// //         </form>
// //       ))}
// //     </div>
// //   );
// // };