import { useEffect } from 'react';
import './App.css';

// --- Data Section ---
export interface EducationItem {
  period?: string;
  institution: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  pdf?: string;
  isComingSoon?: boolean;
}

const personalInfo = {
  name: "전지민",
  enName: "Jeon-Jimin",
  logoText: "Jimin.",
  email: "jeonjimin@smail.kongju.ac.kr",
  bio: "공주대학교 스마트정보기술공학과 3학년에 재학 중이며, 정보통신과 웹프로그래밍을 공부중입니다.",
  contactMessage: "문의사항은 아래 버튼을 통해 메일을 보내주세요!",
};


const education: EducationItem[] = [
  { institution: "천안신안초등학교",period: "2010-2016" },
  { institution: "천성중학교" , period: "2016-2019"},
  { institution: "천안중앙고등학교", period: "2019-2022"},
  { institution: "육군 병장 만기 전역", period: "2022 - 2024" },
  { institution: "공주대학교", description: "스마트정보기술공학과 (3학년 재학)", period: "2022 - 현재" },
];

const skills: SkillCategory[] = [
  {
    category: "프로그래밍 언어",
    items: ["Python", "C/C++", "JavaScript"],
  },
  {
    category: "프론트엔드",
    items: ["React", "HTML", "CSS"],
  },
  {
    category: "백엔드",
    items: ["Python-Django", "WebSocket", "SQLite"],
  },
  {
    category: "임베디드",
    items: ["Atmega"],
  },
];

const interests = [
  "웹 개발",
  "정보통신",
  "사용자 경험 디자인",
  "데이터베이스 설계",
];

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: '개인 포트폴리오 웹사이트로, React와 TypeScript를 사용하여 개발되었습니다.',
    tech: ['React', 'TypeScript', 'CSS', 'HTML'],
    github: 'https://github.com/rema03/portfolio',
  },
  {
    title: 'jimin-chat',
    description: 'Django 프레임워크를 기반으로 구축된 실시간 채팅 애플리케이션입니다.',
    tech: ['Python', 'Python-Django', 'JavaScript', 'WebSocket', 'HTML', 'CSS', 'SQLite'],
    github: 'https://github.com/rema03/jimin-chat',
    live: 'https://chat.jimindev.com',
  },
  {
    title: 'IOT클릭봇',
    description: 'MQTT 프로토콜을 기반으로 한 IoT 원격 클릭 제어 시스템입니다. 실시간 상태 모니터링 및 제어 대시보드를 제공합니다.',
    tech: ['Node.js', 'Express', 'MQTT', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/rema03/iot-clickbot',
  },
  {
    title: '준비 중...',
    description: '새로운 프로젝트가 곧 추가될 예정입니다.',
    tech: [],
    isComingSoon: true,
  },
];

const navLinks = [
  { id: 'about', label: '메인' },
  { id: 'profile', label: '프로필' },
  { id: 'projects', label: '프로젝트' },
  { id: 'contact', label: '연락처' },
];

// --- Component Section ---
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
          <div className="logo">{personalInfo.logoText}</div>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}><a href={`#${link.id}`}>{link.label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="about" className="hero animate-on-scroll">
          <h1>안녕하세요, {personalInfo.name}입니다.</h1>
          <p>{personalInfo.bio}</p>
          <a href="#projects" className="hero-btn">프로젝트 보기</a>
        </section>

        <section id="profile" className="profile animate-on-scroll">
          <h2 className="section-title">프로필</h2>
          <div className="profile-content">
            <div className="profile-section">
              <h3 className="profile-subtitle">기술 스택</h3>
              <div className="skills-grid">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="skill-category">
                    <h4>{skillGroup.category}</h4>
                    <div className="skill-tags">
                      {skillGroup.items.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-subtitle">경력 및 교육</h3>
              <div className="education-list">
                {education.map((item, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h4>{item.institution}</h4>
                      {item.period && <span className="education-period">{item.period}</span>}
                    </div>
                    {item.description && <p className="education-desc">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-subtitle">관심 분야</h3>
              <div className="interests">
                {interests.map((interest) => (
                  <span key={interest} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="projects-bg">
          <section id="projects" className="animate-on-scroll">
            <h2 className="section-title">주요 프로젝트</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className={`project-card ${project.isComingSoon ? 'coming-soon' : ''}`}>
                  <div className="project-img"></div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    {project.tech.length > 0 && (
                      <div className="project-tech">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    {!project.isComingSoon && (
                      <div className="project-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>
                        )}
                        {project.pdf && (
                          <a href={project.pdf} target="_blank" rel="noopener noreferrer">발표 자료 (PDF)</a>
                        )}
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
          <p>{personalInfo.contactMessage}</p>
          <a href={`mailto:${personalInfo.email}`} className="contact-btn">메일 보내기</a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {personalInfo.enName}. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
}

export default App;