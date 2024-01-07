import { BASE_URL } from "../Common/constant";

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



const httpCustomUrlClient = async (url: string, type: string, obj: any = undefined
) => {
  try {
    type = type.toUpperCase();
    if (type.toLowerCase() === "get" && obj) {
      var params = Object.keys(obj)
        .map(function (key) {
          return key + "=" + obj[key];
        })
        .join("&");
      url += "?" + params;
      obj = undefined;
    }
    await fetch(url, {
      method: type.toUpperCase(),
      body: obj,
    });
    return null;
  } catch (error) {
    console.group(`Custom API ${type} Error`);
    console.error(error);
    console.groupEnd();
    throw error;
  }
};






export const removeNulls = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      removeNulls(obj[key]);
    } else if (obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};

const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getFullName = (data: {
  firstName: string;
  middleName?: string;
  lastName?: string;
}) => {
  let name = data.firstName;
  if (data.middleName) {
    name = name + " " + data.middleName;
  }
  if (data.lastName) {
    name = name + " " + data.lastName;
  }
  return name;
};


export { httpClient, httpCustomUrlClient }