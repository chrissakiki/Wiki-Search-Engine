import { useState } from "react";


function App() {
  const [search, setSearch] =useState("");
  const [ results, setResults] = useState([]);
  const [ searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const baseUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${search}`
    const response = await fetch(baseUrl);

    if(!response.ok){
      throw Error(response.statusText);
    }

    const data = await response.json();

    setResults(data.query.search);
    setSearchInfo(data.query.searchinfo);

  }
  return (
    <div className="App">
     <header>
       <h1>WikiPedia Search</h1>
       <form className="search-box" onSubmit={handleSearch}>
         <input type="search" placeholder="What are you looking for?" value={search} onChange={(e) => setSearch(e.target.value)} />
       </form>
       {(searchInfo.totalhits) ? <p>Search Results : {searchInfo.totalhits}</p> : ""}
       </header>
       <div className="results">
         {results.map((result, index) => {
           const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

           return(
            <div className="result" key={index}>
            <h3>{result.title}</h3>
            <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
            <a href={url} target="_blank" rel="noreferrer">Read more</a>
            </div>

           )
         })}

       </div>
     
    </div>
  );
}

export default App;
