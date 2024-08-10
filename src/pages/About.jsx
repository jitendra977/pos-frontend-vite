import React from "react";
import { Container, Row, Col, Card, Image, ListGroup } from "react-bootstrap";
import "../assets/css/about.css"
const About = () => {
  return (
    <Container className="about-container mt-5">
      {/* Profile Section */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="profile-card mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  <Image
                    src="src/assets/images/User/jit-babhadur-khadka.jpeg"
                    className="profile-image"
                    roundedCircle
                    style={{ width: "150px", height: "150px" }}
                  />
                </Col>
                <Col md={8}>
                  <h2 className="profile-name">Jitendra Khadka</h2>
                  <p className="profile-title">Full Stack Developer</p>
                  <p className="profile-bio">
                    Experienced in building scalable web applications with
                    Spring Boot and React. Passionate about creating clean,
                    efficient code and solving complex problems.
                  </p>
                  <ul className="profile-links list-inline">
                    <li className="list-inline-item">
                      <a
                        href="mailto:your-email@example.com"
                        className="profile-link"
                      >
                        Email
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://www.linkedin.com/in/your-profile"
                        className="profile-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://github.com/your-github"
                        className="profile-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Skills Section */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="skills-card mb-4">
            <Card.Body>
              <Row>
                <h2 className="section-title mb-4">Skills & Expertise</h2>
                <Col md={6}>
                  <h3 className="skill-category">Backend Development</h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Spring Boot</ListGroup.Item>
                    <ListGroup.Item>RESTful APIs</ListGroup.Item>
                    <ListGroup.Item>Microservices</ListGroup.Item>
                    <ListGroup.Item>
                      Database Design (MySQL, PostgreSQL)
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Cloud Deployment (AWS, Azure)
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h3 className="skill-category">Frontend Development</h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item>React.js</ListGroup.Item>
                    <ListGroup.Item>Redux, Context API</ListGroup.Item>
                    <ListGroup.Item>Responsive Design</ListGroup.Item>
                    <ListGroup.Item>UI/UX Design Principles</ListGroup.Item>
                    <ListGroup.Item>GraphQL</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Experience Section */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="experience-card mb-4">
            <Card.Body>
              <Row>
                <h2 className="section-title mb-4">Experience</h2>
                <Col md={4}>
                  <h4 className="experience-title">Senior Developer</h4>
                  <p className="experience-company">ABC Tech Solutions</p>
                  <p className="experience-date">June 2015 - Present</p>
                </Col>
                <Col md={8}>
                  <p className="experience-description">
                    Led a team of developers in implementing a microservices
                    architecture using Spring Boot and Docker, resulting in
                    improved scalability and performance of applications.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Education Section */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="education-card mb-4">
            <Card.Body>
              <Row>
                <h2 className="section-title mb-4">Education</h2>
                <Col md={4}>
                  <h4 className="education-title">
                    Bachelor of Computer Science
                  </h4>
                  <p className="education-institution">
                    University of Technology
                  </p>
                  <p className="education-date">Graduated: May 2015</p>
                </Col>
                <Col md={8}>
                  <p className="education-description">
                    Studied computer science with a focus on software
                    engineering and web development. Graduated with honors.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Interests Section */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="interests-card mb-4">
            <Card.Body>
              <Row>
                <h2 className="section-title mb-4">Interests</h2>
                <Col md={4}>
                  <ul className="list-unstyled">
                    <li>Open Source Contribution</li>
                    <li>Learning New Technologies</li>
                  </ul>
                </Col>
                <Col md={4}>
                  <ul className="list-unstyled">
                    <li>Hiking and Outdoor Activities</li>
                    <li>Reading Sci-Fi Novels</li>
                  </ul>
                </Col>
                <Col md={4}>
                  <ul className="list-unstyled">
                    <li>Playing Guitar</li>
                    <li>Photography</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
