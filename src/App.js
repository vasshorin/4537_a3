import Search from "./Search";
import Result from "./Result";
import Pagination from "./Pagination";
import { useState } from "react";

function App() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Search selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      {selectedTypes.length > 0 ? (
        <Result
          selectedTypes={selectedTypes}
          PAGE_SIZE={PAGE_SIZE}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : null}
    </>
  );
}


export default App;