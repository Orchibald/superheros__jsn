
import { Route, Routes } from 'react-router-dom';
import './App.scss'
import SuperheroesList from './components/SuperherosList/SuperherosList';
import AddSuperhero from './components/AddSuperhero/AddSuperhero';
import EditSuperhero from './components/EditSuperhero/EditSuperhero';
import SuperheroDetails from './components/SuperheroDetails/SuperheroDetails';

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<SuperheroesList />} />
      <Route path="/add" element={<AddSuperhero />} />
      <Route path="/edit/:id" element={<EditSuperhero />} />
      <Route path="/hero/:id" element={<SuperheroDetails />} />
    </Routes>
  );
}
