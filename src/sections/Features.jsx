import React from "react";

const Features = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center mt-10 mb-10">
        <div className=" max-w-sm">
          <div className="flex rounded-lg w-full dark:bg-gray-800 p-8 flex-col">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/K3hXBTUqvYA"
              title="МОНЭС 2016 оны 10 р сарын байдлаар 23 төсөлд тэтгэлэг олгоод байна"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="max-w-sm">
          <div className="flex rounded-lg w-full dark:bg-gray-800 p-8 flex-col">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/HXOcxA5wNX0"
              title="Монголын Эмэгтэйчүүдийн Сан танилцуулга   Монгол"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="max-w-sm">
          <div className="flex rounded-lg w-full dark:bg-gray-800 p-8 flex-col">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sEKlYtPcV2Y"
              title="МОНЭС юу хийдэг вэ (Дохионы хэлтэй)"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
