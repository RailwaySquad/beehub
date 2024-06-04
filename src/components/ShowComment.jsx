import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { IoMdSend } from "react-icons/io";
import { FaRegCommentAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import { PiShareFat} from "react-icons/pi";
import '../css/showcomment.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import {  useAddLikePostMutation, useCommentQuery, useDeleteLikeMutation, useGetUserQuery, usePostCommentMutation, useUpdateLikePostMutation } from '../post/postApiSlice';
import Comment from './Comment';
import ShareForm from './ShareForm';
import Showcommentshare from './Showcomentshare';
function ShowComment({
  setFromSharePost,formSharePost,getPostById,
  postIdco,getLikeUser,countLike,checkLike,getEnumEmo,refetchCountComment,refetchGetLikeUser,refetchCountLike,refetchCheckLike,refetchGetEnumEmo
}){
  const {data:getComment,refetch:refetchGetComment} = useCommentQuery({id:postIdco.id})
  const [createComment] = usePostCommentMutation();
  const user = useSelector(selectCurrentUser);
  const [addLike] = useAddLikePostMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [updateLike] = useUpdateLikePostMutation();
  const {data:getUser} = useGetUserQuery();
  const [content, setContent] = useState(false);
  const calculateTimeDifference = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate; // Lấy thời gian chênh lệch tính bằng milliseconds
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (daysDifference > 0) {
      return `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minutes ago`;
    } else {
      return `${secondsDifference} seconds ago`;
    }
  };
  const [showShareModal, setShowShareModal] = useState({});
    const handleShareClose = (id) => {
      setShowShareModal((prevState) => ({
        ...prevState,
        [id]:false,
      }))
    };
    const handleShareShow = (id) =>{
      setFromSharePost({
        id:getPostById.id,
        text: getPostById.text,
        medias: getPostById.mediaUrl,
        timeshare: getPostById.createdAt,
        background: getPostById.background,
        color: getPostById.color,
        user:user?.id,
        usershare:getPostById.user
      });
      setShowShareModal((prevState) =>({
      ...prevState,
      [id]:true,
    }));
  }
    const handleChangeComment = (e) =>{
      const value = e.target.value;
      setFormComment({...formComment,[e.target.name]: value})
    }
    const handleSubmitComment = async (e) => {
      e.preventDefault();
      const inputElement = document.getElementById("newMyInput") ;
      const userInput = inputElement.textContent?.trim() || "";
      setFormComment({...formComment, comment: userInput});
      try {
        await createComment(formComment)
        setFormComment((prevState)=>({
          ...prevState,
          comment:"",
        }))
        inputElement.textContent = "";
        refetchGetComment();
        refetchCountComment();
      } catch (error) {
        console.error(error)
      }
    };
  useEffect(() => {
    const inputElement = document.getElementById("myInput") ;
    if (inputElement) {
      const initialContent = inputElement.textContent?.trim() || "";
      setContent(initialContent.length > 0);
    }
  }, []);
  const commentTagLink = (comments) => {
    return /tag=.*&link=/.test(comments);
  };
  const renderCommentWithLink = (comments) => {
    let result = [];
    let startIndex = 0;
    const regex = /tag=(.*?)&link=(.*?)(?=\s+tag=|$)/g;
    let match;
    while((match = regex.exec(comments)) != null){
      const tagName = match[1].trim();
      const link = match[2].trim();
      result.push(comment.substring(startIndex, match.index));
      result.push(
        <span key={startIndex}>
          <Link to={link}>{tagName}</Link>
        </span>
      );
      startIndex = match.index + match[0].length;
    }
    result.push(comment.substring(startIndex));
    return <>{result}</>;
  }; 
  function handleInput(inputId, divId, formType) {
    const inputElement = document.getElementById(divId);
    const ulElement = document.getElementById(`${divId}-ul`) ;
    let userInput = inputElement.textContent?.trim() || "";
    userInput = userInput.replace(/\s+/g, ' ');
  
    setContent(userInput.length > 0);
    const caretPosition = getCaretPosition(inputElement);
    const filteredText = getFilterText(userInput);
  
    Array.from(ulElement.getElementsByTagName("li")).forEach(li => {
      const a = li.getElementsByTagName("a")[0];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().includes(filteredText.toUpperCase())) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  
    ulElement.style.display = userInput.includes("@") ? "block" : "none";
    const commentInputElement = document.getElementById(inputId) ;
    const allContent = Array.from(inputElement.childNodes).map(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim() || "";
      } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "SPAN") {
        const span = node ;
        if (span.classList.contains("selected")) {
          const spanText = span.textContent?.trim() || "";
          const link = span.getAttribute("data-link") || "";
          return `tag=${spanText}&link=${link}`;
        } else {
          return span.textContent?.trim() || "";
        }
      }
      return "";
    }).join(" ");
  
    if (formType === "comment") {
      setFormComment({ ...formComment, comment: allContent.trim() });
    } else if (formType === "reComment") {
      setFormReComment({ ...formReComment, reaction: allContent.trim() });
    }
  
    commentInputElement.value = allContent.trim();
    setCaretPosition(inputElement, caretPosition);
  }
  function getFilterText(inputValue) {
    // Sử dụng biểu thức chính quy để trích xuất phần mong muốn
    const regex = /^@(.+)|\s@(.+)/;
    const match = inputValue.match(regex);
  
    // Nếu có kết quả, trả về phần mong muốn, ngược lại trả về toàn bộ chuỗi
    return match ? match[1] || match[2] || "" : inputValue;
  }
  
  function getCaretPosition(element) {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    return range?.startOffset || 0;
  }
  function setCaretPosition(element, position) {
    const selection = window.getSelection();
    const range = document.createRange();

    // Kiểm tra xem element có nút con hay không
    if (element.childNodes.length === 0) {
        // Tạo một nút văn bản mới nếu không có nút con nào tồn tại
        const textNode = document.createTextNode("");
        element.appendChild(textNode);
    }

    // Lấy nút con cuối cùng của element
    const lastChild = element.childNodes[element.childNodes.length - 1];

    // Kiểm tra xem lastChild có phải là nút văn bản không
    if (lastChild.nodeType === Node.TEXT_NODE) {
        // Đặt vị trí caret
        const length = lastChild.length;
        if (position > length) {
            range.setStart(lastChild, length);
        } else {
            range.setStart(lastChild, position);
        }
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
    }
}
  
function selectName(selectedName, inputId, divId) {
  const currentInput = document.getElementById(divId);
  let currentValue = currentInput.textContent?.trim() || "";
  currentValue = currentValue.replace(/&nbsp;/g, '');
  currentValue = currentValue.replace(/\s+/g, ' ');
  const newValue = getOverwrittenText(currentValue, selectedName);

  const commentInputElement = document.getElementById(inputId) ;
  if (commentInputElement) { // Kiểm tra phần tử trước khi đặt giá trị
    commentInputElement.value = newValue;
  } else {
    console.error(`Element with id ${inputId} not found`);
  }

  currentInput.innerHTML = "";
  newValue.split(" ").forEach((word, index, array) => {
    const span = document.createElement("span");
    const wordWithSpaces = index === 0 ? ` ${word} ` : word === "" ? "" : ` ${word} `;
    span.textContent = wordWithSpaces;

    if (isInList(word, divId)) {
      span.contentEditable = "false";
      span.classList.add("selected");
      const link = `http://${word}`;
      span.setAttribute("data-link", link);
    } else {
      span.contentEditable = "true";
    }
    currentInput.appendChild(span);
    if (index < array.length - 1) {
      const space = document.createTextNode(" ");
      currentInput.appendChild(space);
    }
  });

  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  currentInput.dispatchEvent(event);
  (document.getElementById(`${divId}-ul`) ).style.display = "none";
}
function isInList(word, divId) {
  const ulElement = document.getElementById(`${divId}-ul`) ;
  const listItems = ulElement.getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {
    const listItemText = listItems[i].textContent?.trim();
    if (listItemText === word) {
      return true;
    }
  }
  return false;
}
function getOverwrittenText(currentInput, selectedName) {
  const regex = /^@(.+)|\s@(.+)/;
  const match = currentInput.match(regex);
  if (match) {
    const prefix = match[1] || match[2] || "";
    return currentInput.replace("@" + prefix, selectedName);
  } else {
    return selectedName;
  }
}
const handleChangeAddLike = async (postId, enumEmo) => {
  try {
    const response = await addLike({
      user: user?.id,
      post: postId,
      enumEmo: enumEmo,
    });
    refetchGetLikeUser();
    refetchCountLike();
    refetchCheckLike();
    refetchGetEnumEmo();
    console.log(response);
  } catch (error) {
    console.error('Error occurred while liking:', error);
  }
};
const handleChangeUpdateLike = async (postId, enumEmo) => {
    try {
      await updateLike({
        user: user?.id, // Assuming user ID is 1
        post: postId,
        enumEmo: enumEmo,
      });
      refetchGetLikeUser();
      refetchCountLike();
      refetchCheckLike();
      refetchGetEnumEmo();
    } catch (error) {
      console.error('Error occurred while updating like:', error);
    }
};
const handleChangeRemoveLike = async (postId) => {
    try {
      console.log(user?.id, postId);   
      const response = await deleteLike({id: user?.id, postId}); // Giả sử ID người dùng là 1
      refetchGetLikeUser();
      refetchCountLike();
      refetchCheckLike();
      refetchGetEnumEmo();
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gỡ bỏ lượt thích:', error);
    }
};
const isLiked = () => {
    return checkLike === true; // Check if the post is liked by the user
};
const handleFocus = (e) => {
  const divContent = e.target.textContent.trim();
  if (divContent === "" || divContent === e.target.getAttribute("data-text")) {
    e.target.textContent = ""; 
  }
};
const handleBlur = (e) => {
  const divContent = e.target.textContent.trim();
  if (divContent === "") {
    e.target.textContent = e.target.getAttribute("data-text"); 
  }
};
  const [formComment, setFormComment] = useState({
    comment: "",
    createdAt:"",
    post: postIdco.id,
    user:user?.id,
  })
    return(
        <div className="modalshowpostandcomment">
              <div key={postIdco.id} className="modelkhung">           
                <div className="modalright-img ">
                <Modal.Header  closeButton>
                  <Modal.Title className="modaltitleshowcomment">
                    Post
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalbodyshowcomment">
                  <div className="modalshowcomment-anhtentime">
                    <div className="modalanhdaidien">
                    </div>
                    <div className="modalnametime">
                      <div className="modalname">{postIdco.user_username}</div>
                      <div className="modaltime">{calculateTimeDifference(postIdco.create_at)}</div>
                    </div>
                  </div>
                    
                  <div className="modalshowcommentanhcomment">
                  {postIdco.share === true?(
                    <Showcommentshare calculateTimeDifference={calculateTimeDifference} postIdco={postIdco}/>
                  ):(
                    <div>
                      {postIdco.media?(
                        <div className="modalpostimg">
                          <img alt="" src={postIdco.media.media} style={{width: '100%', height: '100%'}}/>
                        </div>
                        ):(
                          <div>
                            {(postIdco.color && postIdco.color !== "inherit" && postIdco.background && postIdco.background !== "inherit") ?(
                      <div
                        className={
                            postIdco.color !== null
                            ? 'modal-showcommentBackgroundcolor'
                            : ''
                        }
                        style={{
                          '--showpostcolor': postIdco.color || 'black' ,
                          '--showpostbackground': postIdco.background || 'white'
                        } } // Sử dụng kiểu dữ liệu CustomCSSProperties
                      >
                        {commentTagLink(postIdco.text) ? renderCommentWithLink(postIdco?.text) : postIdco?.text}
                      </div>
                      ):(
                        <div className="modal-showcomment">
                        {commentTagLink(postIdco.text) ? renderCommentWithLink(postIdco?.text) : postIdco?.text}
                        </div>
                      )}
                        </div>
                      )}
                  
                      </div>
                    )}
                  <div className="postuser-alllikeModal" >
                  {getLikeUser && 
                    Array.from(new Set(getLikeUser?.map(item => item.enumEmo))).slice(0,3).map((emoji, index) => (
                      <span key={index} className="iconEmo">
                        {emoji}
                      </span>
                    ))
                  }
                  
                  <div className="heart-number">{countLike}</div>
                  </div>
                  <div className="modalshowcommentlikehr">
                  <hr className="hr-comment"/>
                    <div className="posticonbinhluan-allModalshowcomment" >
                    
                    <div className="posticonbinhluan-like">
                    <div className="toggleEmojiComment">
                    <div className="toggleEmojiCommentAll">
                    {isLiked(postIdco.id) ? (
                      <>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"👍",1)} className="click">👍</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"❤️",1)} className="click">❤️</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"😂",1)} className="click">😂</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"😡",1)} className="click">😡</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"😢",1)} className="click">😢</span>
                      </>
                    ):( 
                      <>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"👍")} className="click">👍</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"❤️")} className="click">❤️</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"😂")} className="click">😂</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"😡")} className="click">😡</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"😢")} className="click">😢</span>
                      </>
                    )}
                    </div>
                    </div>
                    {checkLike ? (             
                      <span onClick={() => handleChangeRemoveLike(postIdco.id)} className="click">{getEnumEmo}</span>
                    ) : (
                      <span onClick={() => handleChangeAddLike(postIdco.id,'👍')} className="click">👍</span>
                    )}
                      <div className="iconbinhluantest">Like</div>                    
                    </div>
                    <div key={postIdco.id} className="posticonbinhluan-comment">
                      <FaRegCommentAlt className="iconbinhluanall"/>
                      <div className="iconbinhluantest">Comment</div>
                    </div>
                    <div className="posticonbinhluan-share" onClick={() =>handleShareShow(postIdco.id)}>
                      <PiShareFat className="iconbinhluanall"/>
                      <div className="iconbinhluantest">Share</div>
                    </div>
                  </div>
                  <Modal show={showShareModal[postIdco.id]} onHide={() =>handleShareClose(postIdco.id)}>
                      <Modal.Header closeButton>
                          <Modal.Title>Chia sẻ bài viết</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <ShareForm post={postIdco} handleShareClose={handleShareClose} setFromSharePost={setFromSharePost} formSharePost={formSharePost} show={showShareModal} handleClose={handleShareClose} />
                      </Modal.Body>
                    </Modal>
                  <hr className="hr-comment"/>
                </div>                
                  <div className="modalShowComment-showbinhluan">
                  
                  {getComment?.map((comment,index) => (
                    <Comment key={index} refetchGetComment={refetchGetComment} refetchCountComment={refetchCountComment} comment={comment} postIdco={postIdco}/>
                    ))}              
                  </div>
                  </div>
                  <div className="inputcomment">         
                    <form onSubmit={handleSubmitComment}>
                      <input type="hidden" name="comment" value={formComment.comment} onChange={(e) => handleChangeComment(e)} id="newCommentInput" />
                      <div>
                      <div className="divcomment" id="newMyInput" contentEditable="true" onInput={() => handleInput('newCommentInput', 'newMyInput','comment')}data-text="Input Comment" onFocus={handleFocus} onBlur={handleBlur}></div>
                      <ul id="newMyInput-ul" className="myul" >
                      {/* {users.map((user) => (
                        <li onClick={() => selectName(user.name, 'newCommentInput', 'newMyInput')} data-link="http://abakiller"><a href="#">{user.name}</a></li>
                      ))} */}
                    </ul>
                      </div>
                      <input type="hidden" name="post" value={formComment.post} onChange={(e) => handleChangeComment(e)}/>
                      <input type="hidden" name="createdAt" value={formComment.createdAt} onChange={(e) => handleChangeComment(e)} />
                      <button type="submit" className="commentpost" value="Comment"><IoMdSend className="iconcomment"/></button>
                    </form>
                  </div>
                </Modal.Body>
                </div>
              </div>
        </div>
    )
}
export default ShowComment;