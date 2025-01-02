import React from "react";
import "../css/About.css";
import ProfileCard from "./ProfileCard";
import Footer from "./Footer";

function About() {
  return (
  <div>
    <div className="about-container">
    
      <div className="about-box">
          <h1 className="h1-about"> Who we are </h1>
          <div className="text-about-p">
                <p>
                    At the heart of CertStore is a team of dedicated 
                    professionals who thrive in a cooperative and inspiring environment. 
                    Collaboration, creativity, and mutual respect define our workplace culture, 
                    making it a beautiful space where ideas and innovation takes shape. 
                    We believe in the power of teamwork enabling us to deliver exceptional solutions for our clients.
                </p>
                  <p>Why Choose Us?</p>
                      <ul>
                        <li>Comprehensive Offerings: From programming languages to specialized fields, our certifications cater to diverse professional needs.</li>
                          <li>Globally Recognized: Our certifications are designed to meet industry standards and are valued by employers worldwide.</li>
                          <li>Flexible and Convenient: Learn and certify at your own pace with our user-friendly platform, available anytime, anywhere.</li>
                      </ul>

            </div>
           <div className="box-cards">
                    <ProfileCard avatar='https://i.imgur.com/yXOvdOSs.jpg' name="Mantzinos Efthimios" occupation="Leader  Software Engineer" interest="Developing,Gaming"/>
                    <ProfileCard avatar='' name="Pattichi Ioanna" occupation="FullStack Software Engineer" interest="Foreign languages. Exploring new places and cultures."/>
                    <ProfileCard avatar='' name="Laoudis Kostas" occupation="Frontend Software Engineer"/>
                    <ProfileCard avatar='' name="Antonopoulos Zois" occupation="Backend Software Engineer"/>
                    <ProfileCard avatar='' name="Gkarlaouni Christina" occupation="Backend Software Engineer" interest="Beekeeping,Speleology"/>
                    <ProfileCard avatar='' name="Efstratiou Nikos" occupation="FullStack Software Engineer"/>
             </div>
        </div>      
    </div>
    

     <div>
     <Footer color={"var(--color4)"} />
   </div>
   </div>
  );
}

export default About;
