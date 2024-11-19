import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { deleteSuperhero, deleteSuperheroAsync, fetchSuperheroes } from '../../store/slices/superherosSlice';
import './SuperherosList.scss';
import { Loader } from '../Loader/Loader';

const ITEMS_PER_PAGE = 5;

const heroesList: React.FC = () => {
  const { heroes, loading, error } = useSelector((state: RootState) => state.superheroes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSuperheroes()); 
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    dispatch(deleteSuperheroAsync(id));
  };
  

  const totalPages = Math.ceil(heroes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentHeroes = heroes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Something wend wrong</div>;
  }

  return (
    <div className='list'>
      <div className="list__header">
        <h1 className="list__title">superHeroes</h1>
        <Link to="/add">
          <button className='list__btn add'>Add Superhero</button>
        </Link>
      </div>

      <div className='list__cards'>
        {currentHeroes.map(hero => (
          <div key={hero.id} className='list__card'>
            <img src={hero.images[0]} alt={hero.nickname} className='card__img' />
            <h2 className='card__nickname'>{hero.nickname}</h2>
            <div className="card__btns">
              <Link to={`/hero/${hero.id}`}>
                <button className='list__btn view'>Details</button>
              </Link>
              <Link to={`/edit/${hero.id}`}>
                <button className='list__btn edit'>Edit</button>
              </Link>
              <button onClick={() => handleDelete(hero.id)} className='list__btn delete'>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="list__pagination">
        <button
          onClick={handlePreviousPage}
          className="list__pagination-btn"
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span className="list__page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="list__pagination-btn"
          disabled={currentPage === totalPages}
        >
          {'>'}
          </button>
      </div>
    </div>
  );
};

export default heroesList;
