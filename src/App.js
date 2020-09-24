import React, {useEffect, useState} from 'react';
import MovieRow from './components/Movierow';
import Api from'./Api';
import './App.css'


function App() {

  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    const laodAll = async () =>{
      // Pegando a lista total
      let list = await Api.getHomeList()
      setMovieList(list);
    }
    laodAll()
  },[])
  return (
   <div className="page">
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
