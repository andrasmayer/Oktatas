export const propCheck = (props)=>{
    //delete props.userId
    console.log(app_version)

 //   props.formPropCheck = () =>{ alert("Magic")}

    return {
        DOM : `<div>
                <div>
                    <div>Belső tartalom</div>
                    <div>Ez a propCheck.js tartalma</div>
                </div>
                <div>
                    <div>Bejövő tartalom</div>
                    <div>
                        <h1>Szia ${props.userName}</h1>
                    </div>
                    <div>${props.myElement}</div>
                </div>
            </div>`,
        original: props,
        formPropCheck : () =>{ alert("Magic")}
        }

}