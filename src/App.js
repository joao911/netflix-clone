import React, {useEffect, useState} from 'react';
import MovieRow from './components/Movierow';
import FeatureMovie from './components/FeatureMovie';
import Api from'./Api';
import './App.css'


function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);

  useEffect(()=>{
    const laodAll = async () =>{
      // Pegando a lista total
      let list = await Api.getHomeList()
      setMovieList(list);

      // pegando os originais da netflix
      let originals = list.filter(i=> i.slug ==='originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    laodAll()
  },[])
  return (
   <div className="page">
     {featureData &&
     <FeatureMovie item={featureData}/>
     }
     <section className="lists">
       {movieList.map((item, key)=>(
         <div>
             <MovieRow key={key} title={item.title} items={item.items}/>
         </div>
       ))}
     </section>
   </div>
  );
}

export default App;
