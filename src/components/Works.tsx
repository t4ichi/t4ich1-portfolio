import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export const Works = () => {
    type work_data = {
        title: string;
        pass: string;
        url: string;
        text: string;
    }

    const works_game: work_data[] = [
        {
            title: 'カニホッケー',
            pass: '/work/kani-game.png',
            url: 'https://itunes.apple.com/jp/app/id1563739832?mt=8',
            text: '近くの人と遊べるアクションゲーム',
        },
        {
            title: 'ばくだんゲーム',
            pass: '/work/bomb-game.png',
            url: 'https://apps.apple.com/jp/app/bomb-games/id1602334691?mt=8',
            text: '押したボタンのどれかが爆発するだけのゲーム',
        },
    ];
    
    return(
        <Row xs={1} md={3} className="g-4">
        {works_game.map((work_data) => (
            <Col>
                <Card>
                    <a href={work_data.url}><Card.Img variant="top" src={work_data.pass}/></a>
                    <Card.Body>
                        <Card.Title className="d-flex justify-content-center fw-bold">{work_data.title}</Card.Title>
                        <Card.Text className="d-flex justify-content-center">{work_data.text}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))}
       </Row>
    )
}

export default Works