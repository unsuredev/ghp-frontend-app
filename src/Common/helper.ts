import jwt_decode from "jwt-decode";

export const isNotAdmin = () => {
    let token: any = localStorage.getItem("access_token")
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { role } = decoded;
    console.log("role" , role)
   return role
}

