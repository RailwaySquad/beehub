import React, { useEffect, useState } from "react";
import {Button, Card, Col, Container,  Image, Row, Spinner, Toast, ToastContainer} from "react-bootstrap";
import * as bootstrap from 'bootstrap';
import APIService from "../../features/APIService";
import { Link, useNavigate } from "react-router-dom";
import { FormSettingProfile } from "./FormSettingProfile";
import { FormSettingPassword } from "./FormSettingPassword";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { useProfileQuery } from "../../features/userApiSlice";
import { SettingItems } from "./SettingItems";
import { refresh } from "../../features/userSlice";
import BeehubSpinner from "../../components/BeehubSpinner";
export function AccountSetting(){
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const reset = useSelector((state)=>state.user.reset);
    const {data: account, isLoading} = useProfileQuery({id: appUser.id,username: appUser.username,reset:reset});
    const [ messageToast, setMessageToast] = useState(false);
    const [ messageToastError, setMessageToastError] = useState(false);
    //For bootstrap
    const triggerTabList = document.querySelectorAll('#myTab button')
        triggerTabList.forEach(triggerEl => {
        const tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', event => {
            event.preventDefault()
            tabTrigger.show()
        })
    })
    const handleClick= async (typeClick,receiver_id)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id:receiver_id, type: typeClick },token);
        if(resp.result != 'unsuccess'|| resp.result !="error"){
            dispatch(refresh())
        }
    }
    const handleClickDeactive= async (typeClick,receiver_id)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id:receiver_id, type: typeClick },token);
        if(resp.result != 'unsuccess'|| resp.result !="error"){
            navigator("/logout")
        }
    }
    
    return (
        <Container >
            <Row  className="bg-white">
                <Col xl={12} className="position-relative" style={{height: "90px", marginTop:"40px"}}>
                    <ToastContainer
                        className="p-3"
                        position="top-center"
                        style={{ zIndex: 1 }}
                    >
                        <Toast variant="success" onClose={() => setMessageToast(false)} show={messageToast} delay={2000} autohide>
                            <Toast.Header>
                                <img src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" height={20} className="rounded me-2" alt="" />
                                <strong className="me-auto">Beehub notification</strong>
                            </Toast.Header>
                            <Toast.Body className="text-start h5">Update successfully
                            
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                    <ToastContainer
                        className="p-3"
                        position="top-center"
                        style={{ zIndex: 1 }}
                    >
                        <Toast onClose={() => setMessageToastError(false)} show={messageToastError} delay={2000} autohide>
                            <Toast.Header>
                                <img src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" height={20} className="rounded me-2" alt="" />
                                <strong className="me-auto">Beehub notification</strong>
                            </Toast.Header>
                            <Toast.Body className="text-start h5">Setting failure. Let try again.
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
                <Col xl={10} lg={10} md={12} sm={12} xs={12} className="mx-auto mt-2"style={{marginBottom: "100px"}} >
                    <Row>
                        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mx-auto text-center" >
                            <h3>Settings</h3>
                            <hr/>
                            <div className="nav flex-md-column  nav-underline me-3 border-end pe-4 flex-fill" id="myTab" role="tablist" aria-orientation="vertical">
                                <hr/>
                                <button className="nav-link text-start text-black fs-5 active" id="v-tabs-profile-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-profile" type="button" role="tab" aria-controls="v-tabs-profile" aria-selected="true">Profile</button>
                                <button className="nav-link text-start text-black fs-5" id="v-tabs-password-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-password" type="button" role="tab" aria-controls="v-tabs-password" aria-selected="false">Password Setting</button>
                                <button className="nav-link text-start text-black fs-5" id="v-tabs-account-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-account" type="button" role="tab" aria-controls="v-tabs-account" aria-selected="false">Account Settings</button>
                                <button className="nav-link text-start text-black fs-5" id="v-tabs-blocklist-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-blocklist" type="button" role="tab" aria-controls="v-tabs-blocklist" aria-selected="false">Block List</button>
                                <button className="nav-link text-start text-black fs-5" id="v-tabs-security-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-security" type="button" role="tab" aria-controls="v-tabs-security" aria-selected="false">Security Settings</button>
                            </div>
                            <hr/>
                        </Col>
                        <Col xl={8} lg={8} md={7} sm={12} xs={12}>
                            {isLoading ? 
                                <div className="tab-content  text-center" id="myTabContent" style={{width: "800px"}}>
                                <BeehubSpinner/></div>
                            :
                            <div className="tab-content " id="myTabContent" >
                                <div className="tab-pane fade show active text-start px-5" id="v-tabs-profile" role="tabpanel" aria-labelledby="v-tabs-profile" tabIndex="0">
                                    <FormSettingProfile user={account} setMessageToast={setMessageToast} setMessageToastError={setMessageToastError} />
                                </div>
                                <div className="tab-pane fade text-start px-5" id="v-tabs-password" role="tabpanel" aria-labelledby="v-tabs-password" tabIndex="0">
                                    <FormSettingPassword user={account} setMessageToast={setMessageToast} setMessageToastError={setMessageToastError} />
                                </div>
                                <div className="tab-pane fade text-start px-5" id="v-tabs-account" role="tabpanel" aria-labelledby="v-tabs-account" tabIndex="0">
                                    <SettingItems settings={account!=null?account.user_settings:[]}  setMessageToast={setMessageToast} setMessageToastError={setMessageToastError} />
                                </div>
                                <div className="tab-pane fade text-start px-5" id="v-tabs-blocklist" role="tabpanel" aria-labelledby="v-tabs-blocklist" tabIndex="0">
                                    <h4>List User Blocked</h4>
                                    <hr/>
                                    <div className="mt-3 d-flex flex-column">
                                        {account !=null && account.relationships.filter((e,i)=> e.typeRelationship == 'BLOCKED').length>0?
                                            account.relationships.filter((e,i)=> e.typeRelationship == 'BLOCKED').map((block, index)=>{
                                                let image = block.image!=null?block.image:(block.gender=='female'? APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                                                return (<Card key={index} className="mb-2 p-1">
                                                <Card.Body className="d-flex flex-row justify-content-between align-items-center" >
                                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                                        <Image src={image}  style={{height: "80px",width: "80px", objectFit: "contain"}} rounded/>
                                                        <Card.Title style={{width: "200px", marginLeft: "20px"}} ><p style={{fontSize: "18px"}}>{block.fullname}</p></Card.Title>
                                                    </div>
                                                    <Button variant="outline-danger" style={{width: "150px"}} onClick={()=> handleClick("UN_BLOCK",block.id)} >Unblock</Button>
                                                </Card.Body>
                                            </Card>);
                                            })
                                        :<p className="fs-5">Not Found Blocked</p>
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane fade text-start px-5" id="v-tabs-security" role="tabpanel" aria-labelledby="v-tabs-security" tabIndex="0">
                                        <h4>Deactive Account</h4>
                                        <hr/>
                                        <p>When you deactive your account, No one can found you on Beehub social media. You can active your account again by sign in again.</p>
                                        <Button variant="outline-danger" onClick={()=>{ if(confirm("Really you want to deactive your account?")){handleClickDeactive("DEACTIVE_ACCOUNT",appUser.id);}} } >Deactive Account</Button>
                                </div>
                            </div>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
