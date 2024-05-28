import React, { useEffect, useState } from "react";
import {Image, ListGroup } from "react-bootstrap";
import { Briefcase, CardImage, Cart3, ChatDots, Display,  JournalBookmark, Newspaper, People, Person, Play} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import APIService from "../auth/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function SessionLeft (){
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    useEffect(()=>{
        let childitem = document.getElementsByClassName("link-item");
        for (let index = 0; index < childitem.length; index++) {
            const element = childitem[index];
            if(element.getAttribute("href") == location.pathname){
                element.parentNode.classList.add("active");
            }
        }
    },[])    
    return (
        <div className="d-flex flex-column " style={{overflowY: "scroll",height: "100vh", position: "fixed", width: "inherit"}}>
            <div style={{backgroundColor: "#383a45",backgroundImage:"linear-gradient(135deg, #4f5261 0%, #383a45 50%)",height: "400px", paddingTop: "4rem", display: "block",textAlign:"center"}}>
                <Image src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-vertical.svg"/>
                
                <div className="rounded-3 mx-auto px-5 py-4 shadow-sm sessionLeft2_profile" style={{width: "250px",height: "250px",backgroundColor: "#FFFFFF", marginTop: "1.2rem"}} >
                    <div className="d-flex flex-column align-items-center ">
                        <Link to={"/member/profile/"+user.username} className="text-decoration-none ">
                            { user.image!=null?
                                <Image src={user.image} style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                                :
                                (
                                    user.gender == 'female'? 
                                    <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                                    :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                                )
                            }
                        <p className="h6 mt-2 text-black" style={{fontSize: "17px"}}>{user.fullname}</p></Link>
                        <span className="text-black-50 " style={{fontSize: "12px"}}>@{user.username}</span>
                    </div>
                    <hr/>
                    <ListGroup horizontal>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{user.friend_counter}<span className="d-block text-black-50">Friends</span></p>
                            
                        </ListGroup.Item>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{user.group_counter}<span  className="d-block text-black-50">Groups</span></p>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center w-100 " style={{minHeight: "300px", padding: "90px 16px 10px 16px",marginTop: "120px"}}>
                <div style={{width: "250px"}}>
                <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-center ">
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}} className="border-0">
                        <Link to="/" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><JournalBookmark size={20}/>
                        <span>Acitivity</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/photos" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><CardImage size={20}/>
                        <span>Photos</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/watch"  className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><Play size={20}/>
                        <span>Watch</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/people" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item">
                            <Person size={20}/>
                        <span>People</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/listgroup" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><People size={20}/>
                        <span>Groups</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/adverts" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><Display size={20}/>
                        <span>Adverts</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/shop" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><Cart3 size={20}/>
                        <span>Shop</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="jobs" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><Briefcase size={20}/>
                        <span>Jobs</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/forum" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><ChatDots size={20}/>
                        <span>Forums</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/blog" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><Newspaper size={20}/>
                        <span>Blog</span></Link>
                    </ListGroup.Item>
                </ListGroup>
                </div>
            </div>
        </div>
    );
}
export default SessionLeft;