import { Col, Container, Form, Image, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import { Bell, ChatSquareDots, HouseDoorFill, People, PersonCircle, Search, ShopWindow, Tv } from "react-bootstrap-icons";

function NavigatorBar(){
    return (
        <>
         <Navbar expand="lg" style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"}} className="bg-body-tertiary pb-0">
            <Container fluid >
                <Row style={{ width: "100%", paddingTop:"3px"}}>
                    <Col lg={4} md={4} xs={4}>
                        <Row>
                            <Col lg={4} md={2} xs={4}>
                                <Navbar.Brand href="#home" className="ms-4">
                                <Image src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" width={40} alt="logo"/>
                                </Navbar.Brand>
                            </Col>
                            <Col lg={8} md={10} xs={8}>
                                <Form inline>
                                    <InputGroup >
                                        <Form.Control 
                                            placeholder="Search"
                                            aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Text id="basic-addon2">
                                            <Search />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={5} md={5} xs={5}>
                    <Nav className="justify-content-center d-flex flex-row" variant="underline" defaultActiveKey="/home">
                        <Nav.Item style={{width: "80px"}}>
                            <Nav.Link href="/home">
                                <HouseDoorFill color="#8224E3" size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item  style={{width: "80px"}}>
                            <Nav.Link  href="/friend">
                                <People size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item  style={{width: "80px"}}>
                            <Nav.Link href="/video">
                                <Tv size={20} />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item  style={{width: "80px"}}>
                            <Nav.Link href="/">
                                <ShopWindow size={20} />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col lg={1} md={2} className="d-sm-none"></Col>
                    <Col lg={3} md={1} xs={2}>
                    <Nav className="justify-content-end d-flex flex-row" variant="none" defaultActiveKey="/home">
                        <Nav.Item className="me-2">
                            <Nav.Link >
                                <Bell size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item  className="me-2">
                            <Nav.Link  href="/friend">
                                <ChatSquareDots size={25}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="me-2">
                            <Nav.Link href="/">
                            <Image src="\assets\images\user\meme-6.jpg" style={{width:"25px",height: "25px"}} roundedCircle />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                </Row>
            </Container>

         </Navbar>
        </>
    );
}
export default NavigatorBar;