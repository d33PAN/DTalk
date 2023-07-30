import React, { useContext, useState } from "react";
import sendBtn from "../../assets/send.svg";
import attachFile from "../../assets/attachFile.svg";
import addImage from "../../assets/addAvatar.svg";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function input() {
  const { data } = useContext(ChatContext);
  const currentUser = useContext(AuthenticationContext);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  async function send() {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          if (error) {
            // error
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img : downloadURL
              }),
            });
             });
        }
      );
    }
     else {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
        [data.chatId+".date"]: serverTimestamp()
      }
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
        [data.chatId+".date"]: serverTimestamp()
      }
    })
    setText("");
    setImg(null);
  }
  return (
    <div className="input">
      <input
        type="text"
        name="text"
        value={text}
        placeholder="Type something..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="send">
        <img src={attachFile} alt="" />
        <input
          type="file"
          name="img"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <label htmlFor="file">
          <img src={addImage} alt="" />
        </label>
        <button onClick={send}>
          <img src={sendBtn} alt="" />
        </button>
      </div>
    </div>
  );
}

export default input;
