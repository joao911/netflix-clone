import React, {useState} from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import './Movierow.css';

function Movierow({ title, items }) {
  const [srcrolX, setScrolX] = useState(0)
  const handleLeftArrow = () => {
    let x = srcrolX + Math.round(window.innerWidth / 2);
    if(x > 0){
      x = 0;
    }
    setScrolX(x)
  };
  const handleRightArrow = () =>{
    console.log('heii')
    let x = srcrolX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if((window.innerWidth - listW) > x){
      x = (window.innerWidth - listW) - 60;
    }

    setScrolX(x)
  };
  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movireRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
          marginLeft: srcrolX,
          width: items.results.length * 150
          }}>
          {items.results.length > 0 && items.results.map((item, key) => (
            <div key={key} className="movieRow--item">
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.original_title} />
            </div>

          ))}
        </div>

      </div>
    </div>
  );
}

export default Movierow;