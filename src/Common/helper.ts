import jwt_decode from "jwt-decode";

export const isNotAdmin = () => {
  let token: any = localStorage.getItem("access_token")
  var decoded = jwt_decode(token);
  //@ts-ignore
  let { role } = decoded;
  console.log("role", role)
  return role
}



export const getToken = () => {
  //@ts-ignore
  return localStorage.getItem("access_token");
};



export const getUserName = () => {
  let token: any = localStorage.getItem("access_token");
  var decoded = jwt_decode(token);
  //@ts-ignore
  let { name } = decoded;
  if (name && name != undefined) {
    return name
  }

}

export const getRole = () => {
  let token: any = localStorage.getItem("access_token");

  var decoded = jwt_decode(token);
  //@ts-ignore
  let { role } = decoded;
  return role;
}


export const getUser = () => {
  let token: any = localStorage.getItem("access_token");
  var decoded = jwt_decode(token);
  //@ts-ignore
  let { role } = decoded;

  if (role === "employee") {
    return true;
  } else {
    return false;
  }
};


export const getUserId = () => {
  let token: any = localStorage.getItem("access_token");
  var decoded = jwt_decode(token);
  //@ts-ignore
  let { user_id } = decoded;
  return user_id
}