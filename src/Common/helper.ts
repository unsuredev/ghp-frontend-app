import jwt_decode from "jwt-decode";

const tokenKey = "access_token"

export const isNotAdmin = () => {
  let token: any = localStorage.getItem(tokenKey)
  var decoded = jwt_decode(token);
  //@ts-ignore
  let { role } = decoded;
  console.log("role", role)
  return role
}



export const getToken = () => {
  //@ts-ignore
  return localStorage.getItem(tokenKey);
};



export const getUserName = () => {
  const token: any = localStorage.getItem(tokenKey);

  if (token) {
    const decoded = jwt_decode(token);
    //@ts-ignore
    const { name } = decoded;
    return name
  }

  // Return undefined if no valid name is found
  return undefined;
};

export const getShortName = () => {

  const token: any = localStorage.getItem(tokenKey);
  if (token) {
    const decoded = jwt_decode(token);
    //@ts-ignore
    const { name } = decoded;
    if (name && name !== undefined) {
      // Return only the first 5 characters of the name
      return name.slice(0, 5);
    }
  }
}

export const getRole = () => {
  let role = ""
  if (localStorage.getItem(tokenKey) != null) {
    let token: any = localStorage.getItem(tokenKey);
    var decoded: any = jwt_decode(token);
    role = decoded.role;
  }
  return role;
}


export const getUser = () => {
  let token: any = localStorage.getItem(tokenKey);
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
  let token: any = localStorage.getItem(tokenKey);
  var decoded = jwt_decode(token);
  //@ts-ignore
  let { user_id } = decoded;
  return user_id
}

export const parseJwt = (tokenParsed?: string) => {
  let token;
  if (!tokenParsed) {
    token = getToken();
  } else {
    token = tokenParsed;
  }
  if (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url?.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  return undefined;
};

export const isTokenExpired = () => {
  const token = getToken();

  if (token) {
    const user = parseJwt(token);
    const cur_time = new Date().getTime() / 1000;

    console.log('Token expiration time:', user.exp);
    console.log('Current time:', cur_time);

    if (user && user.exp && cur_time < user.exp) {
      console.log('Token is not expired.');
      return false;
    }

    console.log('Token is expired.');
    return true;
  }

  console.log('No token found.');
  return true;
};
export const setToken = (token: string) => {
  localStorage.setItem("access_token", token);
};
export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("jhpuser");

};