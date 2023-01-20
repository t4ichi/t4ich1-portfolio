import { Card, Col, Container, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import MyHistoryChart from '../components/MyHistoryChart';
import Profile from '../components/Profile';
import { Skills } from '../components/Skills';
import Works from '../components/Works';
import { MyHistory } from '../domain/entities';
import styles from '../styles/Index.module.css'

const IndexPage = () => {
  const EmptyMyHistory: MyHistory = {
    title: '私の自分年表',
    events: [
      {
        age: 6,
        score: 100,
        title: '子供時代',
        text: '',
      },
      {
        age: 10,
        score: 10,
        title: '子供時代',
        text: '',
      },
      {
        age: 12,
        score: -100,
        title: '中学生',
        text: '',
      },
      {
        age: 15,
        score: 30,
        title: '高校生',
        text: '',
      },

      {
        age: 18,
        score: 50,
        title: '大学生活',
        text: '',
      },
      {
        age: 20,
        score: 60,
        title: '現在',
        text: '',
      },
    ],
  }
  return (
    <Container>
      <Row>
        {/* <h1 className={styles.title}>Profile</h1> */}
        <Profile />
        <h1 className={styles.title}>年表</h1>
          <Card className={styles.history_chart}>
            <MyHistoryChart myEvents={EmptyMyHistory.events}  width='50%'readonly={true}/>
          </Card>
        
        <h1 className={styles.title}>Skills</h1>
        <Skills />
        <h1 className={styles.title}>Works</h1>
        <Works />
        
      </Row>
    </Container>
    
    );
};

export default IndexPage;