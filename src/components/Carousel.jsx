const Carousel = ({ slideImages }) => {
  const [activeItem, setActiveItem] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef(null);

  const carousel = () => {
    if (activeItem < slideImages.length - 1) {
      setActiveItem(activeItem + 1);
    } else {
      setActiveItem(0);
    }
  };

  const handleClick = (e, index) => {
    e.preventDefault();

    setActiveItem(index);
  };

  const handleMouseEnter = () => {
    clearInterval(timeoutRef.current);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setInterval(carousel, 3000);
    }

    return () => clearInterval(timeoutRef.current);
  }, [isPaused, activeItem]);

  return (
    <div>
      <div className="slides">
        {slideImages.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              alt={image}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={
                activeItem === index ? { display: "flex" } : { display: "none" }
              }
            />
          );
        })}
      </div>
      <div className="buttons">
        {slideImages.map((_, index) => {
          return (
            <div
              key={index}
              onClick={(e) => handleClick(e, index)}
              type="button"
              style={
                activeItem === index
                  ? { opacity: "1", transform: "scale(1.6)" }
                  : { opacity: ".33", transform: "scale(1)" }
              }>
              <div
                style={{
                  borderRadius: "50%",
                  width: "0.25rem",
                  height: "0.25rem",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
