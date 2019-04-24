import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import Experience from "./components/sections/experience/Experience";
import AchievementList from "./components/sections/achievements/AchievementList";

class App extends Component {
    render() {
        return (
            <>
                <Head description={"CV page using React"}/>
                <Navigation/>
                <div className="container-fluid p-0">
                    <About description="Programmer, student, interested in data science"/>
                    <Experience/>
                    <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="education">
                        <div className="my-auto">
                            <h2 className="mb-5">Education</h2>

                            <div className="resume-item d-flex flex-column flex-md-row mb-5">
                                <div className="resume-content mr-auto">
                                    <h3 className="mb-0">University of Wrocław</h3>
                                    <div className="subheading mb-3">Computer Science (Master's degree)</div>
                                </div>
                                <div className="resume-date text-md-right">
                                    <span className="text-primary">Oct 2017 - Present</span>
                                </div>
                            </div>

                            <div className="resume-item d-flex flex-column flex-md-row">
                                <div className="resume-content mr-auto">
                                    <h3 className="mb-0">University of Wrocław</h3>
                                    <div className="subheading mb-3">Joint Studies in Computer Science and Mathematics
                                        (Bachelor's degree)
                                    </div>
                                    <p>Final grade: 5.0/5.0</p>
                                    <p><b>Thesis:</b> Reduction of dimensionality by sparse subspace clustering</p>

                                </div>
                                <div className="resume-date text-md-right">
                                    <span className="text-primary">Oct 2014 - Sep 2017</span>
                                </div>
                            </div>
                            <a href="https://github.com/sjwilczynski/Studies/blob/master/README.md">Here</a> you can
                            find a list of all courses I took during my studies.

                        </div>
                    </section>

                    <hr className="m-0"/>

                        <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="projects">
                            <div className="my-auto">
                                <h2 className="mb-5">Projects & apps</h2>
                                <ul className="fa-ul list-dot mb-0">
                                    <li>
                                        <a href="https://github.com/sjwilczynski/Studies/tree/master/2017-2018/Summer/Object%20Oriented%20Design/list9">Dependency
                                            injection container</a> in Java
                                    </li>
                                    <li>
                                        AI for the <a href="http://play.threesgame.com">Threes game</a> using
                                        reinforcement learning and PyTorch (<a
                                        href="https://github.com/sjwilczynski/ThreesGameWithNeuralNets">link to the
                                        repository</a>)
                                    </li>
                                    <li>
                                        Co-author of R package <a
                                        href="https://github.com/psobczyk/varclust">Varclust</a>
                                    </li>
                                    <li>
                                        <a href="https://mysterious-woodland-15958.herokuapp.com">Game Yavalath</a> in
                                        JavaScript using Express framework
                                    </li>
                                    <li>
                                        <a href="https://github.com/sjwilczynski/Studies/blob/master/2016-2017/Summer/Introduction%20to%20Wave%20Analysis%20Applications%20/FingerprintRecognition/falki_projekt_malik_wilczynski.ipynb">Fingerprint
                                            recognition system</a> in Python
                                    </li>
                                    <li>
                                        <a href="https://github.com/sjwilczynski/Studies/blob/master/2017-2018/Summer/Complex%20data/final_project/Zaleska_Wilczynski_project.pdf">Analysis</a> of
                                        medical data on kidney condition after transplant
                                    </li>
                                    <li>
                                        Prediction of midprice changes based on Limit Order Book data set (<a
                                        href="https://github.com/sjwilczynski/Studies/tree/master/2016-2017/Winter/Data%20Mining/LOBclassification">link
                                        to the repository</a>)
                                    </li>
                                    <li>
                                        <a href="https://github.com/sjwilczynski/Studies/tree/master/2015-2016/Winter/Instant%20messanger%20-%20python">Instant
                                            messenger</a> in Python
                                    </li>
                                </ul>
                                More code can be found on my <a href="https://github.com/sjwilczynski">github</a>
                            </div>
                        </section>

                        <hr className="m-0"/>

                            <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="research">
                                <div className="my-auto">
                                    <h2 className="mb-5">Research</h2>

                                    <div className="resume-item d-flex flex-column flex-md-row mb-5">
                                        <div className="resume-content mr-auto">
                                            <h3 className="mb-0">Speaker</h3>
                                            <div className="subheading mb-3">11th International Conference of the ERCIM
                                                WG on Computational and Methodological Statistics (CMStatistics 2018)
                                            </div>
                                            <p>One of the biggest statistical conferences in Europe. I gave a talk
                                                on <i>Multiple latent components clustering</i>.
                                            </p>
                                        </div>
                                        <div className="resume-date text-md-right">
                                            <span className="text-primary">Pisa<br/>Dec 2018</span>
                                        </div>
                                    </div>

                                    <div className="resume-item d-flex flex-column flex-md-row mb-5">
                                        <div className="resume-content mr-auto">
                                            <h3 className="mb-0">Research assistant</h3>
                                            <div className="subheading mb-3">MIR New developments and applications in
                                                Big Data
                                            </div>
                                            <p>Continued working on Multiple Latent Components Clustering (MLCC). The
                                                collaboration with University of Angers aimed at extending
                                                the method to work with data from zero inflated negative binomial
                                                distribution and proving
                                                mathematical properties of MLCC and PEnalized SEmi-integrated Likelihood
                                                (PESEL) method. Furthermore, we use MLCC
                                                to extract significant features/information from huge genetic dataset
                                                (1200 observations, 60000 variables).
                                            </p>
                                        </div>
                                        <div className="resume-date text-md-right">
                                            <span className="text-primary">University of Wrocław<br/>University of Angers<br/>Apr 2018 - Present</span>
                                        </div>
                                    </div>

                                    <div className="resume-item d-flex flex-column flex-md-row mb-5">
                                        <div className="resume-content mr-auto">
                                            <h3 className="mb-0">Speaker</h3>
                                            <div className="subheading mb-3">Joint Conference on
                                                Biometrics &amp; Biopharmaceutical Statistics
                                            </div>
                                            <p>As one of just 8 people from across Europe, I was selected to present
                                                results of my research
                                                on Young Statisticians Session. I gave a talk on <i>Reduction of
                                                    dimensionality by sparse subspace clustering</i>.
                                            </p>
                                        </div>
                                        <div className="resume-date text-md-right">
                                            <span className="text-primary">Vienna<br/>Aug 2017</span>
                                        </div>
                                    </div>

                                    <div className="resume-item d-flex flex-column flex-md-row mb-5">
                                        <div className="resume-content mr-auto">
                                            <h3 className="mb-0">Research assistant</h3>
                                            <div className="subheading mb-3">Clustering in low-dimensional subspaces
                                            </div>
                                            <p>In this project I started working on Multiple Latent Components
                                                Clustering (MLCC).
                                                I was responsible for formalizing its mathematical basis, maintaining
                                                and extending R package <a
                                                    href="https://github.com/psobczyk/varclust">Varclust</a>
                                                that includes MLCC. Moreover, I made and analysed simulations to justify
                                                that MLCC
                                                is competitive with state-of-the-art variable clustering methods.
                                            </p>
                                        </div>
                                        <div className="resume-date text-md-right">
                                            <span className="text-primary">University of Wrocław<br/>Oct 2016 - Sep 2017</span>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <hr className="m-0"/>

                                <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="skills">
                                    <div className="my-auto">
                                        <h2 className="mb-2">Skills</h2>
                                        <div className="d-flex">
                                            <div className="col-6">
                                                <ul className="fa-ul list-dot mb-0">
                                                    <li>Analytical thinking</li>
                                                    <li>Problem solving</li>
                                                    <li>Algorithms &amp; data structures</li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul className="fa-ul list-dot mb-0">
                                                    <li>Design patterns</li>
                                                    <li>Code reviewing</li>
                                                    <li>Unit testing</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="subheading mb-1 mt-2">Certifications</div>
                                        <ul className="fa-ul mb-0">
                                            <li>
                                                <i className="fa-li fa fa-check"></i>
                                                <a href="https://www.youracclaim.com/badges/223429ec-6c7f-4bef-a755-88f65dea3ecd/linked_in_profile">Oracle
                                                    Certified Associate, Java SE 8 Programmer</a></li>
                                        </ul>

                                        <div className="subheading mb-3 mt-2">Programming Languages &amp; tools</div>
                                        <div className="d-flex">
                                            <div className="col-4">
                                                <ul className="fa-ul list-dot mb-0">
                                                    <li>Java</li>
                                                    <li>Oracle SQL</li>
                                                    <li>Python + numpy, scikit</li>
                                                    <li>R</li>
                                                </ul>
                                            </div>
                                            <div className="col-4">
                                                <ul className="fa-ul list-dot mb-0">
                                                    <li>HTML</li>
                                                    <li>CSS, Less</li>
                                                    <li>JavaScript</li>
                                                    <li>Mustache</li>
                                                </ul>
                                            </div>
                                            <div className="col-4">
                                                <ul className="fa-ul list-dot mb-0">
                                                    <li>IntelliJ IDEA <i className="fas fa-heart"></i></li>
                                                    <li>Jenkins</li>
                                                    <li>Git/SVN</li>
                                                </ul>
                                            </div>
                                        </div>


                                    </div>
                                </section>

                                <hr className="m-0"/>

                                    <AchievementList/>

                                        <section className="resume-section p-3 p-lg-5 d-flex flex-column"
                                                 id="interests">
                                            <div className="my-auto">
                                                <h2 className="mb-5">Interests</h2>
                                                <p>
                                                    Apart from being a programmer and a student, I mostly enjoy doing
                                                    and watching various sports, especially basketball, athletics,
                                                    swimming and football.
                                                    Among basketball leagues I consider NBA to be most fascinating and
                                                    my two favorite players are <a
                                                    href="https://www.youtube.com/watch?v=w3l3txhX0L4">Russel
                                                    Westbrook</a>
                                                    and <a href="https://www.youtube.com/watch?v=-f6TnC0xFPY">Kevin
                                                    Durant</a> <i className="fas fa-basketball-ball"></i>. As a former
                                                    sprinter I am still shocked by Wayde van Niekerk's <a
                                                    href="https://www.youtube.com/watch?v=xG91krXuxyw">world record</a>.
                                                </p>
                                                <p>
                                                    As for my other interests I am keen on travelling <i
                                                    className="fas fa-plane"></i> (most beautiful city - Porto,
                                                    Portugal, most astonishing view - Tatev, Armenia, best beach -
                                                    Tangalle, Sri Lanka).<br/>
                                                    Aside from that, in my free time I like visiting escape rooms and
                                                    reading books <i className="fas fa-book"></i> (particularly fantasy
                                                    and history). However my most beloved activity is going to rock
                                                    concerts (I've been to around 40 already).
                                                </p>
                                            </div>
                                        </section>
                </div>
            </>
        );
    }
}

export default App;
