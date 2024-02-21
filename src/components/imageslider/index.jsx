import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, page = 1, limit = 5 }) {
  const [images, setImages] = useState([]);
  let [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      //   const [res12, res123] = Promise.all([response1, response2]);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data) {
        setImages(data);
        console.log(">>>>entered if");
        setLoading(false);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlide(
      currentSlide === 0 ? (currentSlide = images.length - 1) : currentSlide - 1
    );
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  console.log(">>>>>>", images);

  if (loading) {
    return <div>Loading, pls wait!</div>;
  }

  if (errorMessage) {
    return <div>Oh shit! Error Occured {errorMessage}</div>;
  }
  return (
    <div className="frame">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handlePrevious}
      />
      {images && images.length
        ? images.map((imagesItem, index) => (
            <img
              id={imagesItem.id}
              src={imagesItem.download_url}
              alt={imagesItem.download_url}
              // className="current-img"
              className={
                currentSlide === index
                  ? "current-img"
                  : "current-img hide-current-img"
              }
            ></img>
          ))
        : null}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleNext}
      />
      <span className="circle-idicator">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-current-indicator"
                }
                onClick={() => {
                  setCurrentSlide(index);
                }}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
