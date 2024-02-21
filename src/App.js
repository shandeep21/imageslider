import "./App.css";
import ImageSlider from "./components/imageslider";
function App() {
  return (
    <div className="App">
      <ImageSlider
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"5"}
      />
    </div>
  );
}

export default App;
