document.addEventListener("DOMContentLoaded", () => {
  // Initialize Swiper carousel
  const productImageSwiper = new Swiper("#see-swiper", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,
    effect: "fade",
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: ".my-swiper-button-next",
      prevEl: ".my-swiper-button-prev",
    },
  });

  // Make an element draggable horizontally
  function makeElementHorizontallyDraggable(
    elementSelector,
    dragMultiplier = 1.5
  ) {
    const draggableElement = document.querySelector(elementSelector);
    if (!draggableElement) return;

    let isDragging = false;
    let dragStartX;
    let initialScrollLeft;

    const startDrag = (clientX) => {
      isDragging = true;
      draggableElement.classList.add("dragging");
      draggableElement.style.userSelect = "none";
      dragStartX = clientX - draggableElement.offsetLeft;
      initialScrollLeft = draggableElement.scrollLeft;
    };

    const stopDrag = () => {
      isDragging = false;
      draggableElement.classList.remove("dragging");
      draggableElement.style.userSelect = "text";
    };

    const handleDrag = (clientX) => {
      if (!isDragging) return;
      const dragDistance = (clientX - dragStartX) * dragMultiplier;
      draggableElement.scrollLeft = initialScrollLeft - dragDistance;
    };

    // Mouse events
    draggableElement.addEventListener("mousedown", (event) =>
      startDrag(event.pageX)
    );
    draggableElement.addEventListener("mouseup", stopDrag);
    draggableElement.addEventListener("mouseleave", stopDrag);
    draggableElement.addEventListener("mousemove", (event) =>
      handleDrag(event.pageX)
    );

    // Touch events
    draggableElement.addEventListener("touchstart", (event) =>
      startDrag(event.touches[0].pageX)
    );
    draggableElement.addEventListener("touchend", stopDrag);
    draggableElement.addEventListener("touchmove", (event) =>
      handleDrag(event.touches[0].pageX)
    );
  }

  // Apply draggable behavior to specific sliders
  makeElementHorizontallyDraggable(".map__steps");
  makeElementHorizontallyDraggable(".comparisons-table__columns");

  // Scroll-triggered animations for general elements
  const scrollAnimatedElements = document.querySelectorAll(
    ".scroll-fade-in, .scroll-slide-up"
  );
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-viewport", entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );
  scrollAnimatedElements.forEach((element) =>
    intersectionObserver.observe(element)
  );

  // Scroll-triggered animation for table cells
  const comparisonTable = document.querySelector(".comparisons-table");
  const tableCells = document.querySelectorAll(".scroll-slide-in-left");

  if (comparisonTable) {
    let hasAnimatedCells = false;

    const tableObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedCells) {
            hasAnimatedCells = true;
            tableCells.forEach((cell, index) => {
              setTimeout(() => cell.classList.add("in-viewport"), index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    tableObserver.observe(comparisonTable);
  }
});
