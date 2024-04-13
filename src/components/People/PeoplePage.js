import React from "react";
import { Badge, Col, Container, Form, InputGroup, Nav, Row } from "react-bootstrap";
import SessionLeft2 from "../SessionLeft/SessionLeft2";
import NavigatorBar2 from "../navigation_bar/NavigatorBar2";
import PeopleCard from "../PeopleCard/PeopleCard";
import { Search } from "react-bootstrap-icons";
function PeoplePage(){
    const handelClick=(e)=>{
        const badge= e.target.querySelector(".badge");
        const otherbadge =document.querySelectorAll('.badge');
        if(badge!=null){
            otherbadge.forEach((ba)=>{
                if(ba.classList.contains("bg-primary")){
                    ba.classList.toggle("bg-primary");
                    ba.classList.toggle("bg-secondary");
                };
            });
            badge.classList.toggle('bg-secondary');
            badge.classList.toggle('bg-primary');
        }
    }
    return (

        <Row>
            <Col xl={3} className='p-0 ' >
              <SessionLeft2 />
            </Col>
            <Col xl={9} className='p-0'>
              <div className='d-flex flex-column'>
                <NavigatorBar2 />
                <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        <Col xl={12} className="mt-2">
                            <Nav justify  variant="tabs" defaultActiveKey="friend">
                                <Nav.Item>
                                    <Nav.Link eventKey="friend" onClick={handelClick}>Friends <Badge bg="primary">9</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="following" onClick={handelClick}>Following <Badge bg="secondary">66</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="follower" onClick={handelClick}>Followers <Badge bg="secondary">3</Badge></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr/>
                            <Container fluid>
                                <Row xl={4}>
                                    <Col xl={12} className="mb-3">
                                    <Form inline>
                                        <InputGroup >
                                            <InputGroup.Text id="basic-addon2" style={{borderRight: 0,backgroundColor: "#ffffff"}}>
                                                <Search />
                                            </InputGroup.Text>
                                            <Form.Control style={{borderLeft: 0}} 
                                                placeholder="Search"
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </Form>
                                    </Col>
                                    <Col className="mx-auto mb-3">
                                        <PeopleCard img="\assets\images\user\fuxuan3.png" size="16rem" name="Fu Xuan" groups="2" friends="4"/>
                                    </Col>
                                    <Col className="mx-auto mb-3">
                                        <PeopleCard img="\assets\images\user\jingliu.png" size="16rem" name="Jingliu" groups="0" friends="0"/>
                                    </Col>
                                    <Col className="mx-auto mb-3">
                                        <PeopleCard img="\assets\images\user\huohuo-6.png" size="16rem" name="Huo Huo" groups="1" friends="6"/>
                                    </Col>
                                    <Col className="mx-auto mb-3">
                                        <PeopleCard img="\assets\images\user\bw-1.png" size="16rem" name="Black Swan" groups="12" friends="122"/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
              </div>
            </Col>
        </Row>
    );
}
export default PeoplePage;