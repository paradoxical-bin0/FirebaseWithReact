import './App.css';
import { Auth } from "./components/auth";
import { Footer } from "./components/footer";
import { db, auth, storage } from "./config/firebase"
import {useEffect, useState} from "react"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";


function App() {
  const [movieList, setMovieList] = useState([])

  //User Input Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(null);
  const [isWatched, setWatched] = useState(false);

  //Update operation
  const [updatedTitle, setUpdatedTitle] = useState("")

  //File Upload
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");


  const getMovies = async () => {
    //Read the data
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
    //Set the movie list
   }

  useEffect(() => {
     getMovies();
  }, [])

  const onSubmitMovie = async () => {
    try {
    await addDoc(moviesCollectionRef, {title: newMovieTitle, releaseDate: newReleaseDate, watched: isWatched, userId: auth?.currentUser?.uid});
    getMovies();
    setNewMovieTitle("")
    setNewReleaseDate(null)
    setWatched(false)
    } catch (err) {
      console.log(err);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovies();
    } catch (err) {
      console.log(err)
    }
  }

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle});
      getMovies();
    } catch (err) {
      console.log(err)
    }
  }

  const uploadFile = async  () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      alert("File Uploaded successfully!");
      setFileUpload(null);
    } catch (err) {
      console.log(err);
    }
  }

   
  return (
    <div className="app">
      <h1>🍿 Movie List App 🍿</h1><br></br>
      <h3>[ <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUyfJ33_n-nyrX11bp-slTfwFBPbiuEdLbA&usqp=CAU"></img>  Firebase with React <img src='https://th.bing.com/th/id/OIP.XkyKtJ0Kq-T0Mb-7F-YAVwHaHa?w=158&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'></img> Tutorial ]</h3>
      <Auth></Auth>
      <div>
      <br/>
        <h2>Create Operation</h2>
        <div id='movie'>
        <input onChange={(e) => setNewMovieTitle(e.target.value)
        } value={newMovieTitle} placeholder='Movie Title'></input>
        <input value={newReleaseDate} onChange={(e) => setNewReleaseDate(Number(e.target.value))} placeholder="Release Date" type='number'></input>
        <br /><br />
        <div className='checkbox-wrapper-25'>
          <input checked={isWatched} onChange={(e) => setWatched(e.target.checked)} type='checkbox'></input>
          <label className='label'>Watched?</label>
        </div>
        <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>
      </div>
      <h2>Firebase File Storage Trial</h2>
      <div id='movie'>
        <input onChange={(e) => {
          setFileUpload(e.target.files[0])
        }} type='file'></input>
        <button onClick={uploadFile}>Upload File</button>
      </div>
      <div>
        <h2>Read, Update & Delete Operations</h2>
        {movieList.map((movie) => (
          <div id='movie'>
          <h1 style={movie.watched ? {color: "green"} : {color: "red"}}>{movie.title}</h1>
          <p>({movie.releaseDate})  {movie.watched ? "Watched ✔" : "Watching Soon..."}</p>
          <button onClick={() => {
            deleteMovie(movie.id)
          }}>Delete movie</button>
          <input onChange={(e) => {
            setUpdatedTitle(e.target.value)
          }} placeholder='New Title...'></input>
          <button onClick={() => {
            updateMovieTitle(movie.id)
          }}>Change Title</button>
          <br></br>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
