

//Dispatch the action to the reducer
let dispatchActionHandler = (type, data, dispatch) => {
    dispatch({ type, data });
};


function getLanguageWords(params) {
    return async (dispatch) => {
        // let response = await companiesService.getApiBody("GetCompanyInfo", params);
        // response.data = {
        //     ...response.data,
        //     id: params.company_id,

        //     ...response.data?.company_legal_address,
        //     street_address:
        //         response.data?.company_legal_address?.business_street_address,
        // };F

        dispatchActionHandler(
            "GET_LANGUAGE_WORDS",
            response.data,
            dispatch
        );
        return response;
    };
}

function setLanguage(params) {
    return async (dispatch) => {
        // let response = await companiesService.getApiBody("GetCompanyInfo", params);
        // response.data = {
        //     ...response.data,
        //     id: params.company_id,

        //     ...response.data?.company_legal_address,
        //     street_address:
        //         response.data?.company_legal_address?.business_street_address,
        // };F

        dispatchActionHandler(
            "SET_LANGUAGE",
            params,
            dispatch
        );
        return response;
    };
}

function _constructCompanyCreationError(defaultError = null) {
    return {
        defaultError,
    };
}
