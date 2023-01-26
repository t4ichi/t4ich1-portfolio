import { Card, Col, Container, Row } from 'react-bootstrap';
import Achievements from '../components/Achievements';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import { Skills } from '../components/Skills';
import Works from '../components/Works';
import styles from '../styles/Index.module.css'

const IndexPage = () => {
  return (
    <>
      <Container>
        <Row>
          <>
            <Col>
            <Profile />
            </Col>
            <Col>
              <h1 className={styles.title}>Achievements</h1>
              <Achievements />
            </Col>
          </>
          <div>
            <h1 className={styles.title}>Skills</h1>
            <Skills />
          </div>
          
          <div>
            <h1 className={styles.title}>Works</h1>
          </div>
          <Works />
        </Row>
      </Container>
    <Footer />
    </>
    );
};

export default IndexPage;