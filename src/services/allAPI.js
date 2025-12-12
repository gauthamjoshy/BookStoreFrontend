import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"


// register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/register`, reqBody)
}

// login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody)
}

//google login
export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/google-login`, reqBody)
} 


// getHomeBooks
export const getHomeBookAPI = async () => {
    return await commonAPI("GET", `${SERVERURL}/home-books`)
}

// --------      user    --------

//  add book
export const addBookAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/add-book`, reqBody, reqHeader)
}

// get all books -----------
export const getAllBooksAPI = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-books?search=${searchKey}`, {}, reqHeader)
}

// get a books
export const getAbookAPI = async (bookid, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/view-books/${bookid}`, {}, reqHeader)
}

//  user added - books
export const getUserBooksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/user-books`, {}, reqHeader)
}

// delete user added books
export const deleteUserAddedBookAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVERURL}/delete-book/${id}`, {})
}

// get user brought books
export const getUserBroughtBooksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/brought-books`, {}, reqHeader)
}

// save update user profile
export const updateUserProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/update-user-profile`, reqBody, reqHeader)
}

// make payment api
export const makePaymentAPI = async (reqBody, reqHeader)=>{
    return await commonAPI("PUT", `${SERVERURL}/make-payment`,reqBody, reqHeader )
}

// ---------------------    admin   ---------------------

// get all books in admin
export const getAllBooksAdminAPI = async () => {
    return await commonAPI("GET", `${SERVERURL}/get-allbooks`)
}

// approve book status
export const approveBookStatusAPI = async (id)=>{
    return await commonAPI("PUT", `${SERVERURL}/update-book/${id}`)
}

// get all users in admin
export const getAllUsersAPI = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVERURL}/get-allusers`, {}, reqHeader)
}

// update admin profile 
export const updateAdminProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/update-admin-profile`, reqBody, reqHeader)
}