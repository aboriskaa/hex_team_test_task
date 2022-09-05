import { useNavigate } from "react-router-dom";

export function Auth() {
    let navigate = useNavigate();
    if (localStorage.getItem('userAuth') == false) {
        navigate('/');
    }
}