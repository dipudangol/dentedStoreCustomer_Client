import axios from "axios";
const rootUrl = process.env.REACT_APP_API_ENDPOINT;
const adminUserEP = rootUrl + "/admin-user";
const categoryEP = rootUrl + "/category";
const PMEP = rootUrl + "/payment-method";
const productEP = rootUrl + "/product";
const orderEP = rootUrl + "/order";
const userEP = rootUrl + "/users";
const reviewEP = rootUrl + "/reviews";



const apiProcessor = async ({ method, url, data, isPrivate, token }) => {
    try {
        const headers = isPrivate ? { Authorization: sessionStorage.getItem("accessJWT") || token } : null;

        const response = await axios({
            method,
            url,
            data,
            headers,
        });
        return response.data;

    } catch (error) {
        let message = error.message;
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem("accessJWT");
            localStorage.removeItem("refreshJWT");
        }

        if (error.response && error.response.data) {
            message = error.response.data.message;
        }

        if (message === "jwt expired") {
            const accessJWT = await getNewAccessJWT()
            if (accessJWT) {
                return apiProcessor({ method, url, data, isPrivate, token });
            }
        }
        return {
            status: "error",
            message: error.message,
        }

    }
}

//==================================================== Users==========================================================================
//post new  user
export const postUser = (data) => {
    const option = {
        method: "post",
        url: adminUserEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}

//verify admin user
export const emailVerifyAdminUser = (data) => {
    const option = {
        method: "patch",
        url: adminUserEP + "/verify-email",
        data,
    }
    return apiProcessor(option);
}

//login admin user
export const loginAdminUser = (data) => {
    const option = {
        method: "post",
        url: adminUserEP + "/login",
        data,
    }
    return apiProcessor(option);
}

//update admin users
export const updateAdminUser = (data) => {
    const option = {
        method: "put",
        url: adminUserEP,
        isPrivate: true,
        data,
    }
    return apiProcessor(option);
}
//delete admin user
export const deleteAdminUser = (_id) => {
    const option = {
        method: "delete",
        url: adminUserEP + "/" + _id,
        isPrivate: true,
    }
    return apiProcessor(option);
}


//update admin user password
export const updateAdminUserPassword = (data) => {
    const option = {
        method: "patch",
        url: adminUserEP,
        isPrivate: true,
        data,
    }
    return apiProcessor(option);
}


//request otp for reseting user password
export const requestOtpresetAdminUserPassword = (data) => {
    const option = {
        method: "post",
        url: adminUserEP + '/request-password-reset-otp',
        data,
    }
    return apiProcessor(option);
}



//request otp for reseting user password
export const resetAdminUserPassword = (data) => {
    const option = {
        method: "patch",
        url: adminUserEP + '/reset-password',
        data,
    }
    return apiProcessor(option);
}


//FETCH admin user
export const getAdminUser = () => {
    const option = {
        method: "get",
        url: adminUserEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}

//get all admin users
export const getAllAdminUser = () => {
    const option = {
        method: "get",
        url: adminUserEP + "/all-admin",
        isPrivate: true,
    }
    return apiProcessor(option);
}


//FETCH new accessToken
export const getNewAccessJWT = async () => {
    const token = localStorage.getItem("refreshJWT");
    const option = {
        method: "get",
        url: adminUserEP + "/accessjwt",
        isPrivate: true,
        token,
    }
    const { status, accessJWT } = await apiProcessor(option);
    console.log(status, accessJWT);
    status === "success" && sessionStorage.setItem("accessJWT", accessJWT);
    return accessJWT;
}


//=========================================================Categories=========================================================================

export const fetchCategory = (_id) => {
    const option = {
        method: "get",
        url: _id ? categoryEP + "/" + _id : categoryEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// Post new category
export const postCategory = (data) => {
    const option = {
        method: "post",
        url: categoryEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// update categories
export const updateCategory = (data) => {
    const option = {
        method: "put",
        url: categoryEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


//delete categories
export const deleteCategory = (_id) => {
    const option = {
        method: "delete",
        url: categoryEP + '/' + _id,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// ============================================payment Method=====================================================================================

export const fetchPM = () => {
    const option = {
        method: "get",
        url: PMEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// Post new category
export const postPM = (data) => {
    const option = {
        method: "post",
        url: PMEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// deleting the payment method from table/database

export const deletePM = (_id) => {
    const option = {
        method: "delete",
        url: PMEP + '/' + _id,
        isPrivate: true,
    }
    return apiProcessor(option);
}

// update payment method
export const updatePM = (data) => {
    const option = {
        method: "put",
        url: PMEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// ================================================products============================================================
export const fetchProduct = (_id) => {
    const option = {
        method: "get",
        url: _id ? productEP + "/" + _id : productEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// Post new product
export const postProduct = (data) => {
    const option = {
        method: "post",
        url: productEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// deleting the PRODUCT

export const deleteProduct = (_id, data) => {
    const option = {
        method: "delete",
        url: productEP + '/' + _id,
        isPrivate: true,
        data,
    }
    return apiProcessor(option);
}

// update payment method
export const updateProduct = (data) => {
    const option = {
        method: "put",
        url: productEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}

// ======orders==================

export const fetchOrders = (_id) => {
    const option = {
        method: "get",
        url: _id ? orderEP + "/" + _id : orderEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}



// Post new product
export const postOrder = (data) => {
    const option = {
        method: "post",
        url: orderEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// deleting the Order

export const deleteOrder = (_id, data) => {
    const option = {
        method: "delete",
        url: orderEP + '/' + _id,
        isPrivate: true,
        data,
    }
    return apiProcessor(option);
}

// update payment method
export const updateOrder = (data) => {
    const option = {
        method: "put",
        url: orderEP,
        data,
        isPrivate: true,
    }
    return apiProcessor(option);
}


// ======user==================

export const fetchUsers = (_id) => {
    const option = {
        method: "get",
        url: _id ? userEP + "/" + _id : userEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}

// ======revirews==================

export const fetchReviews = (_id) => {
    const option = {
        method: "get",
        url: _id ? reviewEP + "/" + _id : reviewEP,
        isPrivate: true,
    }
    return apiProcessor(option);
}
