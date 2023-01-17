import styled from "styled-components";
import Uploader from "./Uploader";
import Tags from "./Tags";
import CloseBtn from "../CloseBtn";
import { useRef, useState, useEffect } from "react";
import { BlueBtn } from "../BlueBtn";
import axios from "axios";
import Cookie from "../../../util/Cookie";

const Wrapper= styled.div`
    background-color: white;
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 800px;
    height: auto;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    margin: 0 auto;
    padding: 50px;
    color: gray;
    z-index: 1000;
    box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.3); 

    > div:first-child {
        margin: 0 0 0 auto;
    }

    button:last-of-type{
        background-color: #D96848;
    }

    @media screen and (max-width: 1255px) {
        width: 700px;
    }

    @media screen and (max-width: 770px) {
        width: 480px;
    }
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    line-height: 1;
    resize: none;
    padding: 10px 10px;
    outline: none;
    border: 1px solid #dbdbdb;
    border-radius: 5px;

    :focus {
        box-shadow: 0 0 6px #5e8b7e;
    }
`;

// 기능 추가: 사진 x클릭시 사진 삭제, 태그 줄 자동바꿈,
const WritePost = ({ handleIsPosted }) => {
    const [images, setImages] = useState([]);
    const [value, setValue] = useState("");
    const [tags, setTags] = useState([]);
    const fileInputRef = useRef([]);
    const tagRef = useRef();
    const cookie = new Cookie();

    const handleImg = (e) => {
        const file = fileInputRef.current[images.length].files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImages([...images, reader.result]);
        }
    };

    const handleValue = (e) => {
        setValue(e.target.value);
    };

    const addTags = (e) => {
        if(e.key === "Enter" && e.target.value.length > 0 && tags.length < 5) {
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
        deleteTags(e);
    };

    const deleteTags = (e,idx) => {
        if(e.key === "Backspace") {
            setTags(tags.slice(0, tags.length - 1));
        }
    };

    const removeTag = (idx) => {
        // setTags([...tags.filter((tag) => tags.indexOf(tag) !== idx)]);


    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("data", {
            "memberId": 1,
            "postingContent": value,
            "tagName": tags
        });
        formData.append("file1", images[0]);
        formData.append("file2", images[1]);
        formData.append("file3", images[2]);

        axios({
            method: 'post',
            url: "http://localhost:8080/posts",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", Authorization: cookie.get("authorization") }
            }).then(function (response) {
                console.log('성공');
            }).catch(function (error) {
                console.log('전송 실패');
        })
    };

    useEffect(() => {
        document.getElementById("bg").addEventListener("click", () => {
            handleIsPosted();
        })
    },[handleIsPosted])

    return (
        <Wrapper>
            <CloseBtn handleModal={handleIsPosted}/>
            <Uploader images={images} handleImg={handleImg} fileInputRef={fileInputRef} />
            <StyledTextarea value={value} onChange={handleValue} placeholder="당신의 식물을 소개해주세요.">{value}</StyledTextarea>
            <Tags tags={tags} addTags={addTags} removeTag={removeTag} tagRef={tagRef}/>
            <div>
                <BlueBtn onClick={handleSubmit}>작성</BlueBtn>
                <BlueBtn onClick={handleIsPosted}>취소</BlueBtn>
            </div>
        </Wrapper>
    )
}

export default WritePost;