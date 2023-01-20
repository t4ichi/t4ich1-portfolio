import Image from 'next/image'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import styles from '../styles/Skills.module.css'

export const Works = () => {
    type work_data = {
        title: string;
        pass: string;
    }

    const works_game: work_data[] = [
        {
            title: 'カニホッケー',
            pass: '/work/kani-game.png'
        },
        {
            title: 'ばくだんゲーム',
            pass: '/work/bomb-game.png'
        },
        {
            title: 'どうぶつ推理ゲーム',
            pass: '/work/animal-search.png'
        },
    ];
    
    return(
        <>
        {works_game.map(({title,pass}) => (
        <Col>
            <Card>
            <Card.Img variant="top" src={pass} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        ))}
      </>
    )
}

export default Works