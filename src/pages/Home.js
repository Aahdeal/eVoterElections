import React from 'react';

function Home() {
  return (
    <div>
      {/* About Section */}
      <section className="about_section layout_padding mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="img-box">
                <img src="images/about-img.png" alt="About" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="detail-box">
                <div className="custom_heading-container">
                  <h2>eVoting Platform</h2>
                </div>
                <p>Content goes here</p>
                <div>
                  <a href="#vote">Vote Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Results Section */}
      <section className="skill_section layout_padding2">
        <div className="container">
          <div className="custom_heading-container">
            <h2>Voting Results</h2>
          </div>
          <div className="skill_padding">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="box">
                  <div className="circle" id="circles-1"></div>
                  <h6>Adobe Photoshop</h6>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="box">
                  <div className="circle" id="circles-2"></div>
                  <h6>Adobe Illustrator</h6>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="box">
                  <div className="circle" id="circles-3"></div>
                  <h6>After Effects</h6>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="box">
                  <div className="circle" id="circles-4"></div>
                  <h6>Adobe XD</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Section */}
      <section className="do_section layout_padding2" id="vote">
        <div className="container">
          <div className="custom_heading-container">
            <h2>Vote</h2>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="content-box bg-red">
                <div className="img-box">
                  <img src="images/idea.png" alt="Candidate 1" />
                </div>
                <div className="detail-box">
                  <h6>Candidate 1</h6>
                  <p><strong>Slogan</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="content-box bg-red">
                <div className="img-box">
                  <img src="images/idea.png" alt="Candidate 1" />
                </div>
                <div className="detail-box">
                  <h6>Candidate 1</h6>
                  <p><strong>Slogan</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="content-box bg-red">
                <div className="img-box">
                  <img src="images/idea.png" alt="Candidate 1" />
                </div>
                <div className="detail-box">
                  <h6>Candidate 1</h6>
                  <p><strong>Slogan</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="content-box bg-red">
                <div className="img-box">
                  <img src="images/idea.png" alt="Candidate 1" />
                </div>
                <div className="detail-box">
                  <h6>Candidate 1</h6>
                  <p><strong>Slogan</strong></p>
                </div>
              </div>
            </div>
            {/* Repeat for other candidates */}
          </div>
        </div>
      </section>

      {/* Candidate Section */}
      <section className="client_section layout_padding-bottom">
        <div className="container">
          <div className="custom_heading-container">
            <h2>Candidates</h2>
          </div>
        </div>

        <div className="container">
          <div id="carouselExample2Controls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="client_container layout_padding2">
                  <div className="client_box b-1">
                    <div className="client-id">
                      <div className="img-box">
                        <img src="images/client-1.jpg" alt="Candidate 1" />
                      </div>
                      <div className="name">
                        <h5>Smirth Jon</h5>
                        <p>Party</p>
                      </div>
                    </div>
                    <div className="detail">
                      <p>Manifesto</p>
                    </div>
                  </div>
                  <div className="client_box b-1">
                    <div className="client-id">
                      <div className="img-box">
                        <img src="images/client-1.jpg" alt="Candidate 1" />
                      </div>
                      <div className="name">
                        <h5>Smirth Jon</h5>
                        <p>Party</p>
                      </div>
                    </div>
                    <div className="detail">
                      <p>Manifesto</p>
                    </div>
                  </div>
                  <div className="client_box b-1">
                    <div className="client-id">
                      <div className="img-box">
                        <img src="images/client-1.jpg" alt="Candidate 1" />
                      </div>
                      <div className="name">
                        <h5>Smirth Jon</h5>
                        <p>Party</p>
                      </div>
                    </div>
                    <div className="detail">
                      <p>Manifesto</p>
                    </div>
                  </div>
                  {/* Repeat for other clients */}
                </div>
              </div>
              {/* Additional carousel items */}
            </div>
            <a className="carousel-control-prev" href="#carouselExample2Controls" role="button" data-slide="prev">
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExample2Controls" role="button" data-slide="next">
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>



      {/* Include your scripts here */}
      <script src="js/jquery-3.4.1.min.js"></script>
      <script src="js/bootstrap.js"></script>
      <script src="js/circles.min.js"></script>
      <script src="js/custom.js"></script>
    </div>
  );
}

export default Home;
