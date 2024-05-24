const {buildTbody} = await import(`./buildTbody.js${app_version}`)
export const tableBuilder = (data) =>{
    let context = `
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>${buildTbody(data)}</tbody>
        </table>
    `
    return context
}