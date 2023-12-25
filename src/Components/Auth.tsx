import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isNotAdmin } from '../Common/helper'


const AuthenticatedRoute: React.FC<any> = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isNotAdmin() === "user" ? (
                <Redirect
                    to={{
                        pathname: "/home",
                        state: { from: props.location },
                        search: `?redirect_to=${props.location.pathname}${props.location.search}${props.location.hash}`
                    }}
                />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export default AuthenticatedRoute





