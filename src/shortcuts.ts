import {toast} from "react-toastify";


export const ToastOptionsShortcuts = {
    Default: {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        closeButton: true,
        progress: undefined
    },
    Message: {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        closeButton: false,
        hideProgressBar: true
    }
}

export const Toasts = {
    onCopy(content?: string) {
        toast.success(content ?? 'Copied', {
            ...ToastOptionsShortcuts.Message,
            style: {width: '50%'},
            className: 'mx-auto'
        })
    }
}
