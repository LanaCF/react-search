import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";

const App = () => {

  return (
    <Routes>
      {/* Маршрут для головної сторінки */}
      <Route index element={<Home />} />

      {/* Маршрут для фільтрації за брендом */}
      <Route path="/filter/brand/:brand" element={<Home />} />

      {/* Маршрут для фільтрації за кількістю струн */}
      <Route path="/filter/numberStrings/:numberStrings" element={<Home />} />

      {/* Маршрут для фільтрації за коліром */}
      <Route path="/filter/color/:color" element={<Home />} />

      {/* Маршрут для фільтрації за типом */}
      <Route path="/filter/type/:type" element={<Home />} />

      {/* Маршрут для фільтрації за країною */}
      <Route path="/filter/country/:country" element={<Home />} />
    </Routes>
  );
}

export default App;

