import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
          x: 100,
          y: 100,
          degree: 20,
        },
        {
          height: 100,
          width: 100,
          x: 100,
          y: 100,
          degree: 30,
        },
        {
          height: 100,
          width: 100,
          x: 100,
          y: 100,
          degree: 40,
        },
      ],
    }
  }
  
  render() {
    const editPanel = this.getEditPanel(this.state.mode);
    return (
      <Container className='App' style={{width: '100%'}}>
        <Row style={{width: '100%'}}>
          <Col style={{ height:'600px', backgroundColor: 'white'}}>
            {
              this.state.dragons.map((dragon, index) => {
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
          </Col>
          <Col style={{height: '600px', backgroundColor: 'yellow'}}>
            <Button onClick={() => this.setState({mode: 1})}>버튼1</Button>
            <Button onClick={() => this.setState({mode: 2})}>버튼2</Button>
            <Button onClick={() => this.setState({mode: 3})}>버튼3</Button>
            <Button onClick={() => this.setState({mode: 4})}>버튼4</Button>
            <Button onClick={() => this.setState({mode: 5})}>버튼5</Button>
            {editPanel}
          </Col>
        </Row>
      </Container>
    );
  }
  
  getEditPanel(id) {
    switch (id) {
      case 1:
        return (
          <div>
            배경
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
            BGM
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
