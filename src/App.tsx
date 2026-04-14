import { useEffect } from 'react';
import './App.css';

const projects = [
  {
    title: 'jimin-chat',
    description: 'Django 프레임워크를 기반으로 구축된 실시간 채팅 애플리케이션입니다.',
    tech: ['Python', 'Django', 'JavaScript', 'WebSocket', 'HTML', 'CSS', 'SQLite'],
    github: 'https://github.com/rema03/jimin-chat',
    live: 'http://43.200.0.115:8000/accounts/login/',
  },
  {
    title: '준비 중...',
    description: '새로운 프로젝트가 곧 추가될 예정입니다.',
    tech: [],
    github: '#',
    live: '#',
  },
];

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <div className="logo">Jimin.</div>
          <ul className="nav-links">
            <li><a href="#about">소개</a></li>
            <li><a href="#projects">프로젝트</a></li>
            <li><a href="#contact">연락처</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="about" className="hero animate-on-scroll">
          <h1>안녕하세요, 전지민입니다.</h1>
          <p>
            공주대학교 스마트정보기술공학과 3학년에 재학 중이며, C언어와 Python을 활용한 개발에 관심이 많습니다. 
            사용자에게 가치 있는 경험을 제공하는 깔끔하고 효율적인 소프트웨어를 지향합니다.
          </p>
          <a href="#projects" className="hero-btn">프로젝트 보기</a>
        </section>

        <div className="projects-bg">
          <section id="projects" className="animate-on-scroll">
            <h2 className="section-title">주요 프로젝트</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-img"></div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {project.title !== '준비 중...' && (
                      <div className="project-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section id="contact" className="contact animate-on-scroll">
          <h2 className="section-title">연락하기</h2>
          <p>
            새로운 기회나 협업 제안은 언제든 환영입니다. 궁금한 점이 있으시다면 아래 버튼을 통해 메일을 보내주세요!
          </p>
          <a href="mailto:jeonjimin@smail.kongju.ac.kr" className="contact-btn">메일 보내기</a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Jeon-Jimin. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
}

export default App;
