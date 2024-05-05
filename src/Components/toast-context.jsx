import {useContext} from "react";
import { createContext } from "react";

export const ToastContext = createContext(null)

export const useToast = () => useContext(ToastContext)
