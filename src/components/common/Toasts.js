import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast {

    static error(message) {
        return toast.error(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    static info(message, seconds) {

        //Set AutoClose by milliseconds
        let autoClose_Milliseconds = 4000
        if (seconds) {
            autoClose_Milliseconds = 1000 * seconds
        }

        return toast.warn(message, {
            position: "top-right",
            autoClose: autoClose_Milliseconds,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    static success(message, seconds) {

        //Set AutoClose by milliseconds
        let autoClose_Milliseconds = 4000
        if (seconds) {
            autoClose_Milliseconds = 1000 * seconds
        }
        return toast.success(message, {
            position: "top-right",
            autoClose: autoClose_Milliseconds,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export default Toast;