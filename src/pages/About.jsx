import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">About Me</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card mt-4">
            <div className="card-body">
              <h2>Spring Boot Developer</h2>
              <p>
                I have extensive experience in building robust, scalable, and high-performance backend applications using Spring Boot. I am skilled in:
              </p>
              <ul>
                <li>Creating RESTful APIs</li>
                <li>Microservices architecture</li>
                <li>Spring Data JPA for database interactions</li>
                <li>Security with Spring Security</li>
                <li>Integration with various databases like MySQL, PostgreSQL</li>
                <li>Deploying applications on cloud platforms</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mt-4">
            <div className="card-body">
              <h2>React Developer</h2>
              <p>
                On the frontend, I specialize in creating dynamic and responsive user interfaces using React. My skills include:
              </p>
              <ul>
                <li>Building single-page applications (SPAs)</li>
                <li>State management with Redux</li>
                <li>Using React Router for navigation</li>
                <li>Creating reusable components</li>
                <li>Integrating with REST APIs</li>
                <li>Ensuring responsive design and accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2>Contact Me</h2>
              <p>If you want to reach out to me, you can contact me via:</p>
              <ul>
                <li>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">Your LinkedIn Profile</a></li>
                <li>GitHub: <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">Your GitHub Profile</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
