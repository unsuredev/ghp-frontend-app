
export const isNotAuthenticated = () => {

    let token = localStorage.getItem("access_token")
    if (token && token != null) {
        return false
    }
    return true
}

