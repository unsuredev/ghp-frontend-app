import { BASE_URL } from "../Common/constant";

let base_url = BASE_URL

const baseUrlChange = (data: any) => {
  if (data === "SS") {
    base_url = BASE_URL
  }
  if (data === "SH") {
    base_url = BASE_URL
  }
}


const httpClient = async (url: string, type: string, obj: any = undefined
) => {
  try {
    type = type.toUpperCase();
    if (type === "GET" && obj) {
      var params = Object.keys(obj)
        .map(function (key) {
          return key + "=" + obj[key];
        })
        .join("&");
      url += "?" + params;
      obj = undefined;
    }


    let res = await fetch(BASE_URL + url, {
      method: type,
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "encryption": "false",
        token: getToken(),
      } as any,
    });
    return await res.json();
  } catch (error) {
    // console.group(`API ${type} Error`);
    console.error(error);
    console.groupEnd();
    // throw error;
  }
};

const getToken = () => {
  return localStorage.getItem("access_token");
};



export { httpClient, baseUrlChange }