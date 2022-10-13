import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty'
import Service from './Section/Service'
import MedicalFacility from './Section/MedicalFacility'
import OutstandingDoctor from './Section/OutstandingDoctor'
import HandBook from './Section/HandBook'
import About from './Section/About'
import HomeFooter from './/HomeFooter'
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions'
import { LANGUAGES } from '../../utils';
// import css files

import './HomePage.scss'
import './HomePage.css'

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false, 
            initialSlide: 0,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            responsive: [
              {
                breakpoint: 480,
                settings: {
                  // initialSlide: 1,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  initialSlide: 2,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  // infinite: true,
                  dots: true
                }
              }
            ]
          };

          let specialSetting = {...settings}
          specialSetting.slidesToShow = 6
          specialSetting.slidesToScroll = 3

        return (
            <>
             <HomeHeader
                isShowBanner = {true}
             />
            <main id="main">

                <Specialty
                   settings={specialSetting}
                />
                <MedicalFacility
                  settings={settings}
                 />
                <OutstandingDoctor
                   settings={settings}
                />
                {/* <HandBook 
                  settings={settings}
                /> */}
                <About/>
                
                {/* <!-- ======= Gallery Section ======= --> */}
                <section id="gallery" className="gallery">
                  <div className="container">

                    <div className="section-title">
                      <h2><FormattedMessage id="homepage.gallery"/></h2>
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row g-0">

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-1.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-1.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-2.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-2.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-3.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-3.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-4.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-4.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-5.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-5.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-6.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-6.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-7.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-7.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                          <a href="assets/img/gallery/gallery-8.jpg" className="galelry-lightbox">
                            <img src="assets/img/gallery/gallery-8.jpg" alt="" className="img-fluid"/>
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                </section>

                  {/* source
                    <!-- ======= Appointment Section ======= -->                
                    <Service />
                    <section id="appointment" className="appointment section-bg">
                      <div className="container">

                        <div className="section-title">
                          <h2>Make an Appointment</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <form action="form" method="post" role="form" className="php-email-form">
                          <div className="row">
                            <div className="col-md-4 form-group">
                              <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars"/>
                              <div className="validate"></div>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                              <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email"/>
                              <div className="validate"></div>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                              <input type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" data-rule="minlen:4" data-msg="Please enter at least 4 chars"/>
                              <div className="validate"></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4 form-group mt-3">
                              <input type="datetime" name="date" className="form-control datepicker" id="date" placeholder="Appointment Date" data-rule="minlen:4" data-msg="Please enter at least 4 chars"/>
                              <div className="validate"></div>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                              <select name="department" id="department" className="form-select">
                                <option value="">Select Department</option>
                                <option value="Department 1">Department 1</option>
                                <option value="Department 2">Department 2</option>
                                <option value="Department 3">Department 3</option>
                              </select>
                              <div className="validate"></div>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                              <select name="doctor" id="doctor" className="form-select">
                                <option value="">Select Doctor</option>
                                <option value="Doctor 1">Doctor 1</option>
                                <option value="Doctor 2">Doctor 2</option>
                                <option value="Doctor 3">Doctor 3</option>
                              </select>
                              <div className="validate"></div>
                            </div>
                          </div>

                          <div className="form-group mt-3">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message (Optional)"></textarea>
                            <div className="validate"></div>
                          </div>
                          <div className="mb-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                          </div>
                          <div className="text-center"><button type="submit">Make an Appointment</button></div>
                        </form>

                      </div>
                    </section>
                    <!-- ======= Departments Section ======= -->
                    <section id="departments" className="departments">
                      <div className="container">

                        <div className="section-title">
                          <h2>Departments</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="row gy-4">
                          <div className="col-lg-3">
                            <ul className="nav nav-tabs flex-column">
                              <li className="nav-item">
                                <a className="nav-link active show" data-bs-toggle="tab" href="#tab-1">Cardiology</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#tab-2">Neurology</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#tab-3">Hepatology</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#tab-4">Pediatrics</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#tab-5">Eye Care</a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-9">
                            <div className="tab-content">
                              <div className="tab-pane active show" id="tab-1">
                                <div className="row gy-4">
                                  <div className="col-lg-8 details order-2 order-lg-1">
                                    <h3>Cardiology</h3>
                                    <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                                    <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                                  </div>
                                  <div className="col-lg-4 text-center order-1 order-lg-2">
                                    <img src="assets/img/departments-1.jpg" alt="" className="img-fluid"/>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane" id="tab-2">
                                <div className="row gy-4">
                                  <div className="col-lg-8 details order-2 order-lg-1">
                                    <h3>Et blanditiis nemo veritatis excepturi</h3>
                                    <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                                    <p>Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et reiciendis sunt sunt est. Non aliquid repellendus itaque accusamus eius et velit ipsa voluptates. Optio nesciunt eaque beatae accusamus lerode pakto madirna desera vafle de nideran pal</p>
                                  </div>
                                  <div className="col-lg-4 text-center order-1 order-lg-2">
                                    <img src="assets/img/departments-2.jpg" alt="" className="img-fluid"/>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane" id="tab-3">
                                <div className="row gy-4">
                                  <div className="col-lg-8 details order-2 order-lg-1">
                                    <h3>Impedit facilis occaecati odio neque aperiam sit</h3>
                                    <p className="fst-italic">Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt dicta dolor et. In asperiores velit quaerat perferendis aut</p>
                                    <p>Iure officiis odit rerum. Harum sequi eum illum corrupti culpa veritatis quisquam. Neque necessitatibus illo rerum eum ut. Commodi ipsam minima molestiae sed laboriosam a iste odio. Earum odit nesciunt fugiat sit ullam. Soluta et harum voluptatem optio quae</p>
                                  </div>
                                  <div className="col-lg-4 text-center order-1 order-lg-2">
                                    <img src="assets/img/departments-3.jpg" alt="" className="img-fluid"/>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane" id="tab-4">
                                <div className="row gy-4">
                                  <div className="col-lg-8 details order-2 order-lg-1">
                                    <h3>Fuga dolores inventore laboriosam ut est accusamus laboriosam dolore</h3>
                                    <p className="fst-italic">Totam aperiam accusamus. Repellat consequuntur iure voluptas iure porro quis delectus</p>
                                    <p>Eaque consequuntur consequuntur libero expedita in voluptas. Nostrum ipsam necessitatibus aliquam fugiat debitis quis velit. Eum ex maxime error in consequatur corporis atque. Eligendi asperiores sed qui veritatis aperiam quia a laborum inventore</p>
                                  </div>
                                  <div className="col-lg-4 text-center order-1 order-lg-2">
                                    <img src="assets/img/departments-4.jpg" alt="" className="img-fluid"/>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane" id="tab-5">
                                <div className="row gy-4">
                                  <div className="col-lg-8 details order-2 order-lg-1">
                                    <h3>Est eveniet ipsam sindera pad rone matrelat sando reda</h3>
                                    <p className="fst-italic">Omnis blanditiis saepe eos autem qui sunt debitis porro quia.</p>
                                    <p>Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis recusandae ut non quam ut quod eius qui. Ipsum quia odit vero atque qui quibusdam amet. Occaecati sed est sint aut vitae molestiae voluptate vel</p>
                                  </div>
                                  <div className="col-lg-4 text-center order-1 order-lg-2">
                                    <img src="assets/img/departments-5.jpg" alt="" className="img-fluid"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </section>
                    <!-- ======= Frequently Asked Questions Section ======= -->
                    <section id="faq" className="faq section-bg">
                      <div className="container">

                        <div className="section-title">
                          <h2>Frequently Asked Questions</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="faq-list">
                          <ul>
                            <li data-aos="fade-up">
                              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">Non consectetur a erat nam at lectus urna duis? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                              <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                                <p>
                                  Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                                </p>
                              </div>
                            </li>

                            <li data-aos="fade-up" data-aos-delay="100">
                              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2" className="collapsed">Feugiat scelerisque varius morbi enim nunc? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                              <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                  Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                </p>
                              </div>
                            </li>

                            <li data-aos="fade-up" data-aos-delay="200">
                              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3" className="collapsed">Dolor sit amet consectetur adipiscing elit? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                              <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                  Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                                </p>
                              </div>
                            </li>

                            <li data-aos="fade-up" data-aos-delay="300">
                              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-4" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                              <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                  Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.
                                </p>
                              </div>
                            </li>

                            <li data-aos="fade-up" data-aos-delay="400">
                              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-5" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                              <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                  Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                                </p>
                              </div>
                            </li>

                          </ul>
                        </div>

                      </div>
                    </section>
                    <!-- ======= Counts Section ======= -->
                    <section id="counts" className="counts">
                      <div className="container">

                        <div className="row">

                          <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                              <i className="fas fa-user-md"></i>
                              <span data-purecounter-start="0" data-purecounter-end="85" data-purecounter-duration="1" className="purecounter"></span>
                              <p>Doctors</p>
                            </div>
                          </div>

                          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                            <div className="count-box">
                              <i className="far fa-hospital"></i>
                              <span data-purecounter-start="0" data-purecounter-end="18" data-purecounter-duration="1" className="purecounter"></span>
                              <p>Departments</p>
                            </div>
                          </div>

                          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                              <i className="fas fa-flask"></i>
                              <span data-purecounter-start="0" data-purecounter-end="12" data-purecounter-duration="1" className="purecounter"></span>
                              <p>Research Labs</p>
                            </div>
                          </div>

                          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                              <i className="fas fa-award"></i>
                              <span data-purecounter-start="0" data-purecounter-end="150" data-purecounter-duration="1" className="purecounter"></span>
                              <p>Awards</p>
                            </div>
                          </div>

                        </div>

                      </div>
                    </section>
                  */}

                {/* <!-- ======= Footer ======= --> */}
                  <HomeFooter/>

                {/* <div id="preloader"></div> */}
                <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

            </main>

            </>
            );
    }

}

const mapStateToProps = state => {
    return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
      changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
