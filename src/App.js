import axios from 'axios';
import './App.css';
import { useState } from 'react';
import { FcSpeaker } from "react-icons/fc";

function App() {

  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  function getMeaning() {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
      });
  }
  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <>
      <div className='free-dic'>
        <h1>Free Dictionary</h1>
        <div className='dic-search'>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => { setSearchWord(e.target.value); }}
          />

          <button
            onClick={() => { getMeaning(); }}
          >Search
          </button>
        </div>
      </div>

      {data && (
        <div className='showresults'>
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4>Definition :</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>

          <h4>Example:</h4>
          <p>{data.meanings[0].definitions[0].example}</p>
        </div>
      )}

    </>

  );
}

export default App;
