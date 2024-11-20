import { FaTimes } from "react-icons/fa";

const LoginRegis = () => {
  return (
    <div className="login-regis">
        <div className="login-regis-container">
            <div className="close">
                <i><FaTimes/></i>
            </div>
            <div className="title">
                <h3>Regis / Login</h3>
            </div>
            <div className="description">
                <p>Vui lòng đăng nhập để hưởng những đặc</p>
                <p>quyền dành cho thành viên.</p>
            </div>
            <div className="input-num">
                <input type="number" placeholder="Enter your phone num..." />
            </div>
            <div>
                <button disabled>Next</button>
            </div>
        </div>
    </div>
  )
}

export default LoginRegis