import Image from 'next/image'
import { Card, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from '../styles/Profile.module.css'
import user_icon from '../images/user-icon.png'

type MyLink = {
  title: string;
  pass: string;
  url: string;
}

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
      url: 'https://apps.apple.com/us/developer/taichi-ito/id1616435870'
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
        <div className={styles.icon_container}>
          <Image 
            className={styles.icon}
            alt='user-icon'   
            src={user_icon}
          />
        </div>
        <div>
        <Card.Title className={styles.name}><b>Taichi Ito (伊藤 太一)</b></Card.Title>  
        </div>
        
        <div className={styles.logo}>
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
        </div>

      </Card>
    </Container>
  )
}

export default Profile