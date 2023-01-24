import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import styled from "styled-components";

const StyledInteraction = styled.div`
    background-color: white;
    padding: 5px;

    p {
        margin: 0;
    }

    .interact {
        width: 100%;
        margin: 10px 0px;
    }

    div svg {
        margin-right: 15px;
    }

    p:nth-child(2) {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 10px;
        color: #222426;
    }

    .content {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
       -webkit-line-clamp: 3 ;
        -webkit-box-orient: vertical;
    }

    .tags {
        margin: 10px 0px 10px 0px;
        color: #007AC9;
        cursor: pointer;

        span {
            margin-right: 5px;
        }
    }

    > span:last-child {
        color: gray;
        cursor: pointer;
        font-size: 14px;
        letter-spacing: 1px;
    }
`;

const FeedInteraction = ({ setModal, type=null, post, handleCurPost, setPostId }) => {
    return (
        <StyledInteraction>
            <div className="interact">
                <AiOutlineHeart />
                <AiOutlineShareAlt />
                <BsBookmarkPlus />
            </div>
            <p>좋아요 {post.likeCount}개</p>
            {   type === null ? <div className="content">{post.postingContent}</div>
                : <div>{post.postingContent}</div>
            }
            <div className="tags">
                { post.tags ? 
                    post.tags.map((tag, idx) => {
                        return <span key={idx}>#{tag.tagName}</span> 
                    })
                    : null
                }
            </div>
            { type ? null
            : <span onClick={() => {
                handleCurPost(post);
                setPostId(post.postingId);
                setModal(false);
            }} >{post.comments.length}개 댓글 보기 및 댓글쓰기</span>
            }
        </StyledInteraction>
    )
}

export default FeedInteraction;