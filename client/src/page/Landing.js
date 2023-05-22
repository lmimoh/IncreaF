import styled from "styled-components"
import { useEffect, useState } from "react";
import Login from "../components/Landing/Login";
import Main from "../components/Landing/Main";
import Sign from "../components/Landing/Sign";
import logo from "../assets/logo.png";
import { useGuest } from "../util/useGuest";

const Wrapper = styled.div`
`

const StyledHeader = styled.header`
    position: fixed;
    width: 100%;
    height: 85px;
    border-bottom: 1px solid #dbdbdb;
    z-index: 33;
    background-color: white;

    nav {
        height : 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap : 50px;
    }

    nav img {
        height: 60px;
        padding: 0px 0px 10px 0px;
        margin: 0px 0px 0px 13%;
    }

    nav ul {
        display: flex;
        flex-direction: row;
        gap: 50px;
        list-style: none;
        padding: 0px;
        margin: 0px;

        li {
            font-size: 18px;
            font-weight: 600;
            color: gray;
            cursor: pointer;
        }

        li svg {
            font-size: 24px;
        }

        .selected {
            color: black;
        }
    }
`

const Landing = ({ setIsLanded }) => {
    const [ selected, setSelected ] = useState(0);
    const { guestLogin, open, Modal } = useGuest();

    return (
        <Wrapper>
            <StyledHeader>
                <nav>
                    <img src={logo} alt="img" />
                    <ul>
                        <li
                            className={selected === 0 ? "selected" : null}
                            onClick={() => setSelected(0)}>
                            홈
                        </li>
                        <li
                            className={selected === 1 || selected === 2 ? "selected" : null}
                            onClick={() => setSelected(1)}>
                            시작하기
                        </li>
                        <li onClick={() => guestLogin(setIsLanded)}>
                            게스트로 입장하기
                        </li>
                    </ul>
                </nav>
            </StyledHeader>
            {
                selected === 0 && <Main />
            }
            {
                selected === 1 && <Login setSelected={setSelected} setIsLanded={setIsLanded} />
            }
            {
                selected === 2 && <Sign setSelected={setSelected} />
            }
            <Modal>
                <p>현재 사용 불가능한 기능입니다.</p>
            </Modal>
        </Wrapper>
    )
}

export default Landing;