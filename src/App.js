import React, { useEffect, useState } from 'react';
import MovieRow from './components/Movierow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header'
import Api from './Api';
import './App.css'


function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const laodAll = async () => {
      // Pegando a lista total
      let list = await Api.getHomeList()
      setMovieList(list);

      // pegando os originais da netflix
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    laodAll()
  }, []);
  useEffect(() => {
    const scrollListner = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListner);

    return () => {
      window.removeEventListener('scroll, scrollListner');
    }
  }, [])
  return (
    <div className="page">
      <Header black={blackHeader} />
      {featureData &&
        <FeatureMovie item={featureData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pelo dev João Paulo Duarte <br />
        Direitos de imagem para a Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList >= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading" />
        </div>
      }
    </div>
  );
}

export default App;
