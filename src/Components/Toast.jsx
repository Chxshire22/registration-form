import { useState, useEffect, useMemo, useRef } from "react";
import { ToastContext } from "./toast-context";


function useTimeout(callbackFunction){
	const savedCallback = useRef(callbackFunction)
	useEffect(() =>
			{
				savedCallback.current = callbackFunction
			},[callbackFunction]);

	useEffect(() =>
			{
				const functionId = setTimeout(()=>savedCallback.current(), 3000)
				return ()=>clearTimeout(functionId)
			},[]);
}

export default function Toast({ message, close }) {

	useTimeout(()=>{
		close()
	})

	return (
		<div className="toast">
			<p className="toast__content">{message}</p>
			<button className="toast__close-button" onClick={close}>
				{"\u274C"}
			</button>
		</div>
	);
}

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	function openToast(message) {
		const newToast = {
			id: Date.now(),
			message: message,
		};
		setToasts((previousToasts) => [...previousToasts, newToast]);
	}

	function closeToast(id) {
		setToasts((previousToasts) =>
			previousToasts.filter((toast) => toast.id !== id)
		);
	}

	const contextValue = useMemo(
		() => ({
			open: openToast,
			close: closeToast,
		}),
		[]
	);

	useEffect(() => {
		console.log(toasts);
	}, [toasts]);

	return (
		<>
			<ToastContext.Provider value={contextValue}>
				{children}
				<div className="toasts">
					{toasts &&
						toasts.map((toast) => {
							return (
								<Toast
									key={toast.id}
									message={toast.message}
									close={() => closeToast(toast.id)}
								/>
							);
						})}
				</div>
			</ToastContext.Provider>
		</>
	);
}
