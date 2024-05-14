import { motion } from "framer-motion";
import { leftSideVariants, rightSideVariants } from "../constants/motion";
import { hero01, hero02, hero03, roundedText } from "../constants/images";

const Hero = () => {
  return (
    <section id="home" className="flex items-center">
      <div className="container flex items-center justify-center">
        <div className="flex justify-between items-center flex-col-reverse lg:flex-row pt-[70px] lg:pt-0 gap-8">
          {/* Left Side */}
          <motion.div
            variants={leftSideVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-y-8 items-center lg:items-start text-center lg:text-start"
          >
            <div className="flex flex-col gap-y-4">
              <h2 className="section-title-before section-title-after text-h1 text-gray-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, impedit?
              </h2>
              <p className="text-base font-medium text-gray-60">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur ipsam quam quod qui vel nisi deserunt praesentium
                provident. Consectetur dicta veritatis aperiam earum voluptate
                reprehenderit soluta, explicabo facilis quae eius?
              </p>
            </div>
            <button type="button" className="btn btn-primary">
              Get Started
            </button>
          </motion.div>
          {/* Right side */}
          <motion.div
            variants={rightSideVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="grid grid-cols-[minmax(70px_230px)_minmax(70px_250px)] grid-rows-[auto_auto} sm:grid-cols-[240px_270px] sm:grid-rows-[220px_220px] xl:grid-cols-[270px_300px] xl:grid-rows-[250px_250px] gap-4">
              <img src={hero01} className="rounded-4xl" />
              <img src={hero02} className="row-span-2 rounded-4xl" />
              <img src={hero03} className="rounded-4xl" />
            </div>
            <div className="hidden sm:block w-[120px] h-[120px] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-[calc(50%-15px)]">
              <img src={roundedText} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
