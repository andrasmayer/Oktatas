export const modal = `
        <div class="p-2">
            <div>
                <input class="newArea" placeholder="Tetület">
                <button class="save">Létrehozás</button>
            </div>
            <div>
                <h4 class="pName"></h4>
                <h5 class="sName text-secondary"></h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Tetület</th>
                            <th>Létrehozva</th>
                            <th>Készültség</th>
                        </tr>
                    <thead>
                    <tbody class="locations"></tbody>
                </table>
            </div>
            <div class="msg"></div>   
            <div class="modal fade" id="modal"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
                    </div>
                    </div>
                </div>
            </div>            
        </div>
        `