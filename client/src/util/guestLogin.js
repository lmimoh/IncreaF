import axios from "axios";
import { decode } from "./decode";
import Cookie from "./Cookie";

const guestLogin = (setIsLanded) => {
    const cookie = new Cookie()

    axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/member`,
        data: {
            email: `${process.env.REACT_APP_GUEST_ID}`,
            password: `${process.env.REACT_APP_GUEST_PW}`
        }
    }).then(res => {
        const date = new Date();
        const user = decode(res.headers.authorization);
  
        date.setMinutes(date.getMinutes() + 60 * 24);
        cookie.set("authorization", res.headers.authorization, `{ expires: date }`);
        cookie.set("memberId", user.memberId, { expires : date });
        cookie.set("username", user.username, { expires : date });
  
        date.setMinutes(date.getMinutes() + 60 * 24 * 7);
        cookie.set("refresh", res.headers.refresh, { expires: date });
  
        setIsLanded(false);
    })
    .catch(e => {
        // 오류처리 필요
    })
  }

export default guestLogin;