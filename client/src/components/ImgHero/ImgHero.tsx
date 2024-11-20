import { useDispatch } from 'react-redux';
import { deleteImageAsync, Superhero } from '../../store/slices/superherosSlice';
import { AppDispatch } from '../../store/store';
import './ImgHero.scss';

type Props = {
  hero: Superhero;
};
export const ImgHero: React.FC<Props> = ({ hero }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteImage = (image: string) => {
    dispatch(deleteImageAsync({ id: hero.id, image }));
  };

  return (
    <div className="details__images">
      <strong>Images:</strong>
      <div className="details__image-list">
        {hero.images.map((image, index) => (
          <div key={index} className="details__image-container">
            <img src={image} alt={hero.nickname} className="details__image" />
            <button
              type="button"
              className="details__image-delete"
              onClick={() => handleDeleteImage(image)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
