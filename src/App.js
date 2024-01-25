import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// dragons
import Toothless from './dragons/toothless.gif';
import LightFury from './dragons/light-fury.gif';
import AngryToothless from './dragons/angry-toothless.gif';
import BabyToothless from './dragons/baby-toothless.gif';
import ListeningToothless from './dragons/listening-toothless.gif';
import Toothless2 from './dragons/toothless2.gif';
import MouseToothless from './dragons/mouse-toothless.gif';
import SpeedyToothless from './dragons/speedy-toothless.gif';

import BackgroundMusic from './music/background.mp3';
import {Stack} from "react-bootstrap";

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      dragons: [],
      background: {
        width: 1000,
        height: 1000,
        color: 'white',
        image: null,
        mode: 1, // 1: color, 2: image
      },
      handlingDragon: null,
      backgroundMusic: BackgroundMusic,
    }
  }
  
  render() {
    const {dragons, background, backgroundMusic } = this.state;
    const editPanel = this.getEditPanel(this.state.mode);
    return (
      <Container className='App' style={{width: '100%'}}>
        {dragons.length > 0 && <audio src={backgroundMusic} controls autoPlay loop hidden/>
        }
        <Row style={{width: '100%'}}>
          <Col style={{ width:'50%', backgroundColor: 'white'}}>
            <div id='background' style={{
              width: `${background.width}px`,
              height: `${background.height}px`,
              backgroundColor: background.mode === 1 ? background.color : null,
              backgroundImage: background.mode === 2 ? background.image : null,
              }}
                 onDragOver={(e) => {
                    e.preventDefault();
                 }}
                onDrop={(e) => {
                  e.preventDefault();
                  console.log(e);
                  
                  const {handlingDragon} = this.state;
                  console.log('dragon:',handlingDragon.target.src)
                  const { pageX, pageY } = e;
                  const { x, y } = e.target.getBoundingClientRect();
                  const width = 100;
                  const height = 100;
                  const newDragon = {
                    src: handlingDragon.target.src,
                    name: handlingDragon.target.alt,
                    height: height,
                    width: width,
                    x: pageX - x - width/2,
                    y: pageY - y - height/2,
                    degree: 0,
                    zIndex: this.state.dragons.length+1,
                  }
                  this.setState({
                    dragons: [...dragons, newDragon],
                    handlingDragon: null,
                  })
                }}
            >
              {
                dragons.map((dragon, index) => {
                  return (
                    <img src={dragon.src} alt={dragon.name} style={{
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
          <Col style={{width: '50%', backgroundColor: 'yellow'}}>
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
        
        return (
          <div>
            <Form.Control size="lg" type="text" placeholder="가로"/>
            <Form.Control size="lg" type="text" placeholder="세로"/>
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
          <Stack direction='horizontal' className='dragon-list-box'>
            <img src={Toothless} alt={'toothless'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={LightFury} alt={'light-fury'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={AngryToothless} alt={'angry-toothless'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={BabyToothless} alt={'baby-toothless'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={ListeningToothless} alt={'listening-toothless'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={Toothless2} alt={'toothless2'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={MouseToothless} alt={'mouse-toothless'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
            <img src={SpeedyToothless} alt={'speedy-toothless'} onDragStart={(e) => {this.setState({handlingDragon: e})}}/>
          </Stack>
        )
      case 3:
        return (
          <div>
            <p>Music</p>
            <input
              type='file'
              accept='audio/*'
              name='audio_file'
              onChange={(e) => {
                const selectedAudio = e.target.files[0];
                
                if (selectedAudio) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const previewAudioUrl = reader.result;
                    console.log(previewAudioUrl);
                    this.setState({ backgroundMusic: previewAudioUrl });
                  };
                  
                  reader.readAsDataURL(selectedAudio);
                }
              }}
            />
          </div>
        )
      case 4:
        return (
          <div>
            다운로드
          </div>
        )
      default:
        console.assert(false, '올바르지 않은 모드입니다.');
    }
  }
}
