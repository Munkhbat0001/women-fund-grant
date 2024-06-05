import React from "react";

const Purple = () => {
  return (
    <section class="bg-gradient-to-br from-[#5a9dd0] to-[#5a9dd0] py-16 md:py-32">
      <div class="container mx-auto px-4 md:px-8 text-center">
        <h1 class="text-white font-bold text-4xl md:text-6xl leading-tight mb-6">
          Welcome to our <br />
          Colorful World
        </h1>
        <p class="text-white text-lg md:text-2xl mb-12">
          Experience the magic of colors with our unique products and services.
        </p>
        <a
          href="#"
          class="bg-white text-purple-500 font-bold py-2 px-8 rounded-full hover:bg-purple-500 hover:text-white transition duration-200"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Purple;
