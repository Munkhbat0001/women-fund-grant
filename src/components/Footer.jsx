import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiLinkedinFill,
  RiTwitchFill,
} from "react-icons/ri";
import logoEn from "../assets/logoEn.png";

const Footer = () => {
  return (
    <footer className="py-[20px] bg-gray-10 z-40">
      <div className="container">
        <div>
          <div className="flex flex-col">
            <div className="flex items-start justify-between flex-wrap gap-8">
              <div className="footer-col">
                <h2 className="text-h3 text-white">Mongolian women's fund</h2>
                <p className="text-base !leading-[normal] text-gray-80">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center gap-x-4">
                  <a href="#" className="">
                    <RiFacebookCircleFill size={32} className="social-icon" />
                  </a>
                  <a href="#" className="">
                    <RiInstagramFill size={32} className="social-icon" />
                  </a>
                  <a href="#" className="">
                    <RiTwitchFill size={32} className="social-icon" />
                  </a>
                  <a href="#" className="">
                    <RiLinkedinFill size={32} className="social-icon" />
                  </a>
                </div>
              </div>
              <div className="footer-col">
                <p className="footer-heading">Бидний тухай</p>
                <div className="flex flex-col gap-y-2">
                  <a href="#home" className="footer-link">
                    Бидний тухай
                  </a>
                  {/* <a href="#home" className="footer-link">
                    Төслүүд
                  </a> */}
                  {/* <a href="#home" className="footer-link">
                    Home
                  </a>
                  <a href="#about" className="footer-link">
                    About
                  </a>
                  <a href="#home" className="footer-link">
                    Courses
                  </a>
                  <a href="#instructors" className="footer-link">
                    Instructors
                  </a>
                  <a href="#blog" className="footer-link">
                    Blog
                  </a> */}
                </div>
              </div>
              <div className="footer-col">
                <p className="footer-heading">Холбоо барих</p>
                <div className="flex flex-col gap-y-2">
                  <a href="tel:+97699334546" className="footer-link">
                    Phone: (+976) 77665544
                  </a>
                  <a href="mailto:coursat@gmail.com" className="footer-link">
                    Email: info@mones.org.mn
                  </a>
                </div>
              </div>
              <div className="footer-col">
                <p className="footer-heading">Хаяг</p>
                <div className="text-base !leading-[normal] text-gray-80">
                  {/* <a href="#" className="footer-link"> */}
                  Address: 903, 9th floor, Centrum office, 1 khoroo, Sukhbaatar
                  district, Ulaanbaatar, Mongolia
                  {/* </a> */}
                </div>
              </div>
              {/* <div className="footer-col">
                <p className="footer-heading">Subscribe to our Newsletter</p>
                <form className="flex flex-col gap-y-4">
                  <input
                    type="text"
                    className="outline-0 rounded-2xl h-14 px-1.5 bg-gray-20 text-base font-medium text-white"
                    placeholder="Enter Your Email"
                    autoComplete="off"
                  />
                  <button type="submit" className="btn btn-primary !w-full">
                    Subscribe
                  </button>
                </form>
              </div> */}
            </div>
            <div className="flex justify-between flex-wrap gap-4 p-4 mt-[20px] bg-gray-20 rounded-4xl">
              <p className="text-lg text-gray-80">
                &copy; 2024{" "}
                <span className="text-primary-50">Mongolian women's fund</span>{" "}
                Бүх эрх хуулиар хамгаалагдсан
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
