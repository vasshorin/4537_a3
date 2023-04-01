import Search from "./Search";
import Result from "./Result";
import { useState } from "react";
import Login from "./Login";
function App() {
  return (
    <>
      {/* <Search selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      {selectedTypes.length > 0 ? (
        <Result
          selectedTypes={selectedTypes}
          PAGE_SIZE={PAGE_SIZE}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : null} */}
      <Login />
    </>
  );
}


export default App;