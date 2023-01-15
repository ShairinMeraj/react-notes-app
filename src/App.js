import {useState , useEffect} from "react";
import {nanoid} from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
const App=()=>{
  const[notes, setNotes ]=useState([
    {
      id:nanoid(),
      text: 'This is my first note',
      date: '15/12/22',
    },
    {
      id:nanoid(),
      text: 'This is my second note',
      date: '17/12/22',
    },
    {
      id:nanoid(),
      text: 'Third note',
      date: '1/01/23',
    },
    {
      id:nanoid(),
      text: 'Fourth note',
      date: '1/01/23',
    },
   

  ]);
  const [searchText, setSearchText]=useState('');
  const [darkMode, setDarkMode]=useState(false); 
  useEffect(()=> { 
    const savedNotes=JSON.parse(localStorage.getItem('react-notes-app-entry')
    );
if(savedNotes){
  setNotes(savedNotes);
}
  },[]); 
  useEffect(()=>{
   localStorage.setItem (
    'react-notes-app-entry',
     JSON.stringify(notes)
     ) ;
  },[notes]);
  
  const addnote=(text)=>{
    const date=new Date();
    const newNote={
      id:nanoid,
      text:text,
      date:date.toLocaleDateString()
    }
   
  const newNotes=[...notes,newNote];
  setNotes(newNotes);};

  const deleteNote=(id)=>{
    const newNotes=notes.filter((note)=> note.id!==id);
    setNotes(newNotes);

  }
  return(
   <div className={`${darkMode && 'dark-mode'}`}>
  <div className="container">
    <Header handleToggleDarkMode={setDarkMode}/>
    <Search handleSearchNote={setSearchText}/>
    <NotesList 
    notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText.toLowerCase()))} 
    handleAddNote={addnote}
     handleDeleteNote={deleteNote}/>
     </div></div>);
}
export default App;