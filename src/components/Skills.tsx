import Image from 'next/image'
import React from 'react'
import { Card, CardGroup, Container, Row } from 'react-bootstrap'
import styles from '../styles/Skills.module.css'


type skill_data = {
  skill_name: string;
  pass: string;
}

const SkillCards = ({skilldata, title}) => {
  return(
    <Card className={styles.card}>
    <Card.Title className={styles.card_title}>{title}</Card.Title>
      <Card.Body className={styles.container}>
        {skilldata.map(({skill_name,pass}) => (
          <Card className={styles.skill_card}>
            <Card.Body>
              <Image 
                className={styles.skill_icon}
                src={pass}
                alt='skill-icon'   
                width={40}
                height={40}
              />
              <Card.Text className={styles.skill_text}>
                {skill_name}
              </Card.Text>
            </Card.Body>
          </Card>
      ))}              
      </Card.Body>
    </Card>
  )
}

export const Skills = () => {

    const skill_many: skill_data[] = [
      {
        skill_name: 'Unity',
        pass: '/skill/unity.png'
      },
      {
        skill_name: 'C#',
        pass: '/skill/c-sharp.png'
      },
      {
        skill_name: 'HTML',
        pass: '/skill/html.png'
      },
      {
        skill_name: 'CSS',
        pass: '/skill/css.png'
      },
      {
        skill_name: 'JavaScript',
        pass: '/skill/js.png'
      },
      {
        skill_name: 'TypeScript',
        pass: '/skill/typescript.png'
      },
      {
        skill_name: 'React',
        pass: '/skill/react.png'
      },

      {
        skill_name: 'Node.js',
        pass: '/skill/nodejs.png'
      },
      {
        skill_name: 'Next.js',
        pass: '/skill/nextjs.png'
      },
      {
        skill_name: 'Java',
        pass: '/skill/java.png'
      },
      {
        skill_name: 'SQLite',
        pass: '/skill/sqlite.png'
      },
    ];
        
    const skill_few: skill_data[] = [
      {
        skill_name: 'C',
        pass: '/skill/c.png'
      },
      {
      skill_name: 'C++',
        pass: '/skill/c-.png'
      },
      {
        skill_name: 'PHP',
        pass: '/skill/php.png'
      },
      {
        skill_name: 'Python',
        pass: '/skill/python.png'
      },
      {
        skill_name: 'MySQL',
        pass: '/skill/sql.png'
      },
    ];

    const skill_tool: skill_data[] = [
      {
        skill_name: 'GitHub',
        pass: '/skill/github.png'
      },
      {
        skill_name: 'git',
        pass: '/skill/git.png'
      },
      {
        skill_name: 'VSCode',
        pass: '/skill/vscode.png'
      },
      {
        skill_name: 'VisualStudio',
        pass: '/skill/visualstudio.png'
      },
      {
        skill_name: 'Slack',
        pass: '/skill/slack.png'
      },
    ];


    return(
      <Container>
        <Row>
          <SkillCards skilldata={skill_many} title={"成果物を作った経験がある"}/>
          <SkillCards skilldata={skill_few} title={"授業や趣味で使ったことがある"}/>
          <SkillCards skilldata={skill_tool} title={"使った経験があるツール"}/>
        </Row>
      </Container>
    )
}

export default Skills