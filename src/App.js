import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Toothless from './dragons/toothless.gif';



function getImageFiles(e) {
  const files = e.currentTarget.files;
  console.log(typeof files, files);
}

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      textWidth: null,
      textHeight: null,
      tabIndex: 1,
      //
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
        width: 760,
        height: 600,
        color: 'white',
        image: null,
        mode: 1, // 1: color, 2: image
        ciIndex:1,
      }
    }
  }
  
  render() {
    const {dragons, background,previewImages } = this.state;
    const editPanel = this.getEditPanel(this.state.tabIndex);
    return (
      <Container className='App' style={{width:'1260px'}}>
        <Row>
          <Col style={{ height:'600px', width:'760px', backgroundColor: 'white'}}>
            <div className='gif-container' id='background' style={{
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
          <Col style={{height: '600px', width: '450px', backgroundColor: 'yellow',flex: 'none'}}>
            <Button onClick={() =>  this.setState({tabIndex: 1,background:{...this.state.background,ciIndex:1} })}>배경</Button>
            <Button onClick={() => this.setState({tabIndex: 2})}>드래곤</Button>
            <Button onClick={() => this.setState({tabIndex: 3})}>Music</Button>
            <Button onClick={() => this.setState({tabIndex: 4})}>저장</Button>
            {editPanel}
          </Col>
        </Row>
      </Container>
    );
  }
  
  getEditPanel(id) {
    
    switch (id) {
      case 1:
        const {ciIndex} = this.state.background;
        // TODO: mode에 따라 색상 입력 혹은 이미지 입력
        let backgroundContent;
        if (ciIndex === 1) {
          backgroundContent = (
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#FFFFFF"
              title="Choose your color"
              size="lg"
              onChange={(e) => this.setState({background: {...this.state.background, color: e.target.value}})}
            />
          )
        } else if(ciIndex ===2 ) {
          backgroundContent= (
            <input type="file" class="real-upload" accept="image/*" required multiple>
              
              </input>
          )
        }
        
        return (
          <div>
            {/* <Form.Control size="lg" type="text" placeholder="가로" onChange={(e) => this.setState({background: {...this.state.background,width:e.target.value > 760 ? 760 : e.target.value}})}/> */}
            <Form.Control size="lg" type="text" placeholder="가로" value={this.state.textWidth} onChange={(e) => this.setState({textWidth: e.target.value})}/>


            {/* <Form.Control size="lg" type="text" placeholder="세로" onChange={(e) => this.setState({background: {...this.state.background,height:e.target.value > 600 ? 600 : e.target.value}})}/> */}
            <Form.Control size="lg" type="text" placeholder="세로" value={this.state.textHeight} onChange={(e) => this.setState({textHeight: e.target.value})}/>
            <div style={{position:'relative',top:10}}>
            <Button style={{width:'100px',position: 'absolute', right: 0}}onClick={()=>{
              
              this.setState({
                background: {...this.state.background,width:this.state.textWidth > 760 ? 760 : this.state.textWidth,
                  height:this.state.textHeight > 600 ? 600 : this.state.textHeight},
                textWidth: this.state.textWidth > 760 ? 760 : this.state.textWidth,
                textHeight: this.state.textHeight > 600 ? 600 : this.state.textHeight,
              })
            }}>확인</Button>
            </div><br/><br/>


            <Form.Check inline name='background' type='radio' defaultChecked={true} onClick={() =>this.setState({background:{...this.state.background,ciIndex:1}})} />


            <Form.Check inline name='background' type='radio'onClick={() =>this.setState({background:{...this.state.background,ciIndex:2}})}/>
            {backgroundContent}
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
