import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

export const BestWorks = () => {    
    return(
        <Container className='d-flex align-items-center justify-content-center'>
            <Card style={{ width: '40rem'}}>
                <a href="https://itunes.apple.com/jp/app/id1609216148?mt=8"><Card.Img variant="top" src="/work/animal-search.png"/></a>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center fw-bold">どうぶつ推理-オンライン対戦ゲーム-</Card.Title>
                    <Card.Text className="d-flex justify-content-center">オンライン対戦ができるパズルゲーム</Card.Text>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default BestWorks