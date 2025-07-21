export const $_GET = () =>{
    const paramString = window.location.href.split('?')[1];
    const queryString = new URLSearchParams(paramString);
    const output = {}
    for (let pair of queryString.entries()) {
        output[pair[0]] = pair[1]
    }
    return output
}

