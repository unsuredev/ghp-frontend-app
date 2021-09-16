import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

import { Close } from "mdi-material-ui";

type snackType = "success" | "warn" | "error" | "default";
interface IDispatch {
    message?: string;
    type?: snackType;
    dismiss?: boolean;
}
interface dispatchFunc {
    (params: IDispatch): void;
}

interface showToastFunc {
    (message: string, type: snackType, options?: Object): void;
}
interface IState {
    visible: boolean;
    message: string;
    // icon: string;
    color?: string;
}

export interface IToast {
    showToast: showToastFunc;
}

export const ToastContext = React.createContext<IToast>({
    // show: () => {},
    showToast: () => { },
});

export const ToastProvider: React.FC<any> = (props) => {
    const [state, dispatch]: [IState, dispatchFunc] = React.useReducer(
        (prevState: any, action: IDispatch) => {
            let color;

            if (action.dismiss === true) {
                return {
                    ...prevState,
                    visible: false,
                };
            }

            switch (action.type) {
                case "success":
                    color = "#357a38";
                    break;
                case "warn":
                    color = "#ffa000";
                    break;
                case "error":
                    color = "#d32f2f";
                    break;
                default:
                    color = "#313131";
                    break;
            }

            return {
                ...prevState,
                visible: true,
                // icon,
                color: color,
                message: action.message,
            };
        },
        { visible: false, message: "" }
    );
    const toastContext = React.useMemo(
        () => ({
            // show: (message: string, type: snackType) => {
            //   dispatch({ type, message });
            // },
            showToast: (message: string, type: snackType) => {
                dispatch({ type, message });
            },
        }),
        []
    );
    return (
        <ToastContext.Provider value={toastContext}>
            <>
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={state.visible}
                    onClose={() => dispatch({ dismiss: true })}
                    autoHideDuration={3000}
                >
                    <SnackbarContent
                        // onClose={this.handleClose}
                        style={{ backgroundColor: state.color }}
                        message={<span id="toast">{state.message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => dispatch({ dismiss: true })}
                            >
                                <Close />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
                {props.children}
            </>
        </ToastContext.Provider>
    );
};

export const withToastContext = (ChildComponent: any) => (props: any) => {
    const { showToast } = React.useContext(ToastContext);
    return <ChildComponent {...props} showToast={showToast} />;
};
