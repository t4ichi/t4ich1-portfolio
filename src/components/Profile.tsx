import Image from 'next/image'
import { Button, ButtonGroup, ButtonToolbar, Card, Col, Container, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import styles from '../styles/Profile.module.css'
import user_icon from '../images/user-icon.png'
import { MyLink } from '../domain/entities'

export const Profile = () => {

  const icons: MyLink[] = [
    {
      title: 'GitHub',
      pass: '/profile/github.svg',
      url: 'https://github.com/t4ichi'
    },
    {
      title: 'Twitter',
      pass: '/profile/twitter.svg',
      url: 'https://twitter.com/t4i000'
    },
    {
      title: 'Atcoder',
      pass: '/profile/atcoder.svg',
      url: 'https://atcoder.jp/users/t4ich1'
    },
    {
      title: 'AppStore',
      pass: '/profile/app-store.svg',
      url: 'https://zenn.dev/t4ich1'
    },
    {
      title: 'Blog',
      pass: '/profile/blog.svg',
      url: 'https://zenn.dev/t4ich1'
    },
  ];

  const renderTooltip = (message:string) => (
    <Tooltip id="button-tooltip">
      {message}
    </Tooltip>
  );

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Row>
          <Col className={styles.icon_container}>
            <Image 
            className={styles.icon}
            alt='user-icon'   
            src={user_icon}
            />
          </Col>
          
          <Col>
          <Card.Body>
          <Card.Title><b>伊藤 太一</b></Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col className={styles.logo}>
          {icons.map(({title,pass,url}) => (
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(title)}
            >
              <a href={url}>
                <Image
                  alt='icon' 
                  src={pass}                  
                  width={40}
                  height={40}>
                </Image>
              </a>
            </OverlayTrigger>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default Profile