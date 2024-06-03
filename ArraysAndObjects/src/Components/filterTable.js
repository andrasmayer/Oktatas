export const filterTable = (tableID)=>{
    return  `
            <table id="${tableID}">
                <thead>
                    <tr>
                        <th>
                            <input filterBy="name" placeholder="Név">
                        </th>
                        <th>
                            <input filterBy="age"  placeholder="Kor">
                        </th>
                        <th>
                            <input filterBy="gender"  placeholder="Nem">
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            `
}