import React from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
export default function App() {
  const [openedSecond, setOpenedSecond] = React.useState(true);

  function flippedState() {
    setOpenedSecond((prevState) => !prevState);
  }

  return (
    <div className="card">
      {openedSecond === true ? (
        <FirstPage setOpenedSecond={flippedState} />
      ) : (
        <SecondPage startSecond={openedSecond} />
      )}
    </div>
  );
}
