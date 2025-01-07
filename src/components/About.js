import React from "react";
import "../css/About.css";
import ProfileCard from "./ProfileCard";
import Footer from "./Footer";
import pho5 from "../images/creators/pho5.jpg"
import pho4 from "../images/creators/pho4.jpg"
import pho3 from "../images/creators/pho3.jpg" 
import pho1 from "../images/creators/pho1.jpg"
import pho6 from "../images/creators/pho6.jpg"
import pho2 from "../images/creators/pho2.jpg"


function About() {
  return (
    <div className="about-main-container">
      <div className="about-container">
        <div className="about-box">
          <h1 className="h1-about"> Who we are </h1>
          <div className="text-about-p">
            <p>
              At the heart of CertStore is a team of dedicated professionals who
              thrive in a cooperative and inspiring environment. Collaboration,
              creativity, and mutual respect define our workplace culture,
              making it a beautiful space where ideas and innovation takes
              shape. We believe in the power of teamwork enabling us to deliver
              exceptional solutions for our clients.
            </p>
            <p>Why Choose Us?</p>
            <ul>
              <li>
                Comprehensive Offerings: From programming languages to
                specialized fields, our certifications cater to diverse
                professional needs.
              </li>
              <li>
                Globally Recognized: Our certifications are designed to meet
                industry standards and are valued by employers worldwide.
              </li>
              <li>
                Flexible and Convenient: Learn and certify at your own pace with
                our user-friendly platform, available anytime, anywhere.
              </li>
            </ul>
          </div>
          <div className="box-cards">
            <ProfileCard
              avatar={pho1}
              name="Mantzinos Efthymios"
              occupation="Leader Software Engineer"
              interest="Developing, 9ball, Gaming"
            />
            <ProfileCard
              avatar={pho4}
              name="Pattichi Ioanna"
              occupation="FullStack Developer Engineer"
              interest="Foreign languages. Exploring new places and cultures"
            />
            <ProfileCard
              avatar={pho6}
              name="Laoudis Kostas"
              occupation="Fullstack Developer Engineer"
              interest="Exploring new places and learning new things"
            />
            <ProfileCard
              avatar={pho2}
              name="Antonopoulos Zois"
              occupation="Fullstack Developer Engineer"
              interest="Developing and Trading"
            />
            <ProfileCard
              avatar={pho5}
              name="Gkarlaouni Christina"
              occupation="Fullstack Developer Engineer"
              interest="Photography, Beekeeping, Speleology"
            />
            <ProfileCard
              avatar={pho3}
              name="Efstratiou Nikos"
              occupation="FullStack Developer Engineer"
              interest="Music,Psychology"
            />
          </div>
        </div>
      </div>

      <div>
        <Footer color={"var(--color2)"} />
      </div>
    </div>
  );
}

export default About;
