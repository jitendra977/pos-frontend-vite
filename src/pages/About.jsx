import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';


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
                  <Image src="/profile-picture.jpg" className="profile-image" roundedCircle />
                </Col>
                <Col md={8}>
                  <h2 className="profile-name">John Doe</h2>
                  <p className="profile-title">Full Stack Developer</p>
                  <p className="profile-bio">
                    Experienced in building scalable web applications with Spring Boot and React. Passionate about creating clean, efficient code and solving complex problems.
                  </p>
                  <ul className="profile-links list-inline">
                    <li className="list-inline-item"><a href="mailto:your-email@example.com" className="profile-link">Email</a></li>
                    <li className="list-inline-item"><a href="https://www.linkedin.com/in/your-profile" className="profile-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li className="list-inline-item"><a href="https://github.com/your-github" className="profile-link" target="_blank" rel="noopener noreferrer">GitHub</a></li>
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
              <h2 className="section-title mb-4">Skills & Expertise</h2>
              <Row>
                <Col md={6}>
                  <h3 className="skill-category">Backend Development</h3>
                  <ul className="list-unstyled">
                    <li>Spring Boot</li>
                    <li>RESTful APIs</li>
                    <li>Microservices</li>
                    <li>Database Design (MySQL, PostgreSQL)</li>
                    <li>Cloud Deployment (AWS, Azure)</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h3 className="skill-category">Frontend Development</h3>
                  <ul className="list-unstyled">
                    <li>React.js</li>
                    <li>Redux, Context API</li>
                    <li>Responsive Design</li>
                    <li>UI/UX Design Principles</li>
                    <li>GraphQL</li>
                  </ul>
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
              <h2 className="section-title mb-4">Experience</h2>
              <Row>
                <Col md={4}>
                  <h3 className="experience-title">Senior Developer</h3>
                  <p className="experience-company">ABC Tech Solutions</p>
                  <p className="experience-date">June 2015 - Present</p>
                </Col>
                <Col md={8}>
                  <p className="experience-description">
                    Led a team of developers in implementing a microservices architecture using Spring Boot and Docker, resulting in improved scalability and performance of applications.
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
              <h2 className="section-title mb-4">Education</h2>
              <Row>
                <Col md={4}>
                  <h3 className="education-title">Bachelor of Computer Science</h3>
                  <p className="education-institution">University of Technology</p>
                  <p className="education-date">Graduated: May 2015</p>
                </Col>
                <Col md={8}>
                  <p className="education-description">
                    Studied computer science with a focus on software engineering and web development. Graduated with honors.
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
              <h2 className="section-title mb-4">Interests</h2>
              <Row>
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
}

export default About;
