import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import ServiziCategoria from './pages/ServiziCategoria';
import ServizioDettaglio from './pages/ServizioDettaglio';
import Team from './pages/Team';
import ChiSiamo from './pages/ChiSiamo';
import Contatti from './pages/Contatti';
import Faq from './pages/Faq';
import { CookiePolicy, Privacy } from './pages/Legale';
import NonTrovata from './pages/NonTrovata';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/servizi" element={<Servizi />} />
          <Route path="/servizi/:categoria" element={<ServiziCategoria />} />
          <Route path="/servizi/:categoria/:slug" element={<ServizioDettaglio />} />

          <Route path="/team" element={<Team />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/faq" element={<Faq />} />

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="*" element={<NonTrovata />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
