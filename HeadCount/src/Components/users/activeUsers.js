const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)

export const activeUsers = Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        response:"json",
                        data:{mode:"fetchAll",procedure:"getUSerIDList",parameters:``}
                    })
