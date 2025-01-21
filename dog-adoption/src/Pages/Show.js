import { useState, useEffect } from 'react';
import Card from './Card';
import './Show.css';

const Show = () => {

  const api = "https://frontend-take-home-service.fetch.com";
  const [dogIds, setDogIds] = useState("");
  const [dogs, setDogs] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [sortBy, setSortBy] = useState('sort=breed:asc');

  /*
  useEffect(() => {
    async function getDogBreeds() {
      const response = await fetch(`${api}/dogs/breeds`, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: "include"
      }).catch((error) => console.log('error'));
      const data = await response.json();
      setDogBreed(data);
    }
    getDogBreeds();

  }, []);*/ 


  useEffect(() => {

    async function getData() {
      const response = await fetch(`${api}/dogs/search?${sortBy}`, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: "include"
      }).catch((error) => console.log('error'));
      const data = await response.json();
      setDogIds(data.resultIds);
    }

    getData()
  }, []);
  
    useEffect(() => {
      if (dogIds) {
        async function getDogs() {
          const response = await fetch(`${api}/dogs`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogIds),
            credentials: "include"
          })
          const data = await response.json();
          console.log(data);     
          setDogs(data);
        }
        getDogs();
      } else {
        console.log("loading");
        // ToDo: Add loading icon 
      }

    }, [dogIds])

    const searchByDogBreed = (formData) => {
      const dogBreed = formData.get("query");
      alert(`Dog Breed: ${dogBreed}`);
    };

  return (
    <div className="card-container">
      <form className="dropdown">
        <input name="query"  />
        <button formAction={searchByDogBreed} /* type="submit"*/>Search</button>
      </form>

      {dogs ? (
        <div className="card-layout">
        {[...dogs].map((dog) => {
          return (
            <Card key={dog.id} dog={dog} />
          )
        })}
        </div>
      ): (
          <p>Loading</p>
      )}

    </div>
  )
};

export default Show;