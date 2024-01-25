import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Toothless from './dragons/toothless.gif';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      dragons: [
        {
          height: 100,
          width: 100,
          x: 100,
          y: 100,
          degree: 10,
        },
        {
          height: 100,
          width: 100,
          x: 120,
          y: 120,
          degree: 20,
        },
        {
          height: 100,
          width: 100,
          x: 140,
          y: 140,
          degree: 30,
        },
        {
          height: 100,
          width: 100,
          x: 160,
          y: 160,
          degree: 40,
        },

        {
          height: 100,
          width: 100,
          x: 600,
          y: 100,
          degree: 40,
        },
        {
          height: 100,
          width: 100,
          x: 580,
          y: 120,
          degree: 30,
        },
        {
          height: 100,
          width: 100,
          x: 560,
          y: 140,
          degree: 20,
        },
        {
          height: 100,
          width: 100,
          x: 540,
          y: 160,
          degree: 10,
        },
      ],
      background: {
        width: 1000,
        height: 1000,
        color: 'white',
        image: null,
        mode: 1, // 1: color, 2: image
      }
    }
  }
  
  render() {
    const {dragons, background } = this.state;
    const editPanel = this.getEditPanel(this.state.mode);
    return (
      <Container className='App' style={{width: '100%'}}>
        <Row style={{width: '100%'}}>
          <Col style={{ height:'600px', backgroundColor: 'white'}}>
            <div id='background' style={{
              width: `${background.width}px`,
              height: `${background.height}px`,
              backgroundColor: background.mode === 1 ? background.color : null,
              backgroundImage: background.mode === 2 ? background.image : null,
              }}>
              {
                dragons.map((dragon, index) => {
                  return (
                    <img src={Toothless} alt={'toothless'} style={{
                      height: dragon.height,
                      width: dragon.width,
                      transform: `rotate(${dragon.degree}deg)`,
                      position: 'absolute',
                      top: dragon.y,
                      left: dragon.x,
                      zIndex: index,
                    }}/>
                  )
                }, this)
              }
            </div>
            
          </Col>
          <Col style={{height: '600px', backgroundColor: 'yellow'}}>
            <Button onClick={() => this.setState({mode: 1})}>배경</Button>
            <Button onClick={() => this.setState({mode: 2})}>드래곤</Button>
            <Button onClick={() => this.setState({mode: 3})}>Music</Button>
            <Button onClick={() => this.setState({mode: 4})}>저장</Button>
            {editPanel}
          </Col>
        </Row>
      </Container>
    );
  }
  
  getEditPanel(id) {
    
    switch (id) {
      case 1:
        const {mode} = this.state.background;
        // TODO: mode에 따라 색상 입력 혹은 이미지 입력
        
        return (
          <div>
            <Form.Control size="lg" type="text" placeholder="가로" />
            <Form.Control size="lg" type="text" placeholder="세로" />
            <Form.Check inline name='background' type='radio'/>
            <Form.Check inline name='background' type='radio'/>
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#FFFFFF"
              title="Choose your color"
              size="lg"
              onChange={(e) => this.setState({background: {...this.state.background, color: e.target.value}})}
            />
          </div>
        )
      case 2:
        return (
          <div>
            드래곤
          </div>
        )
      case 3:
        return (
          <div>
            Music
          </div>
        )
      case 4:
        return (
          <div>
            BGM
          </div>
        )
      default:
        console.assert(false, '올바르지 않은 모드입니다.');
    }
  }
}
