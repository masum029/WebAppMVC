$(document).ready(function () {

});

function GetCategory() {
    $.ajax({
        url: '/Category/GetCategory',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                var obj = '';
                obj += '<tr>';
                obj += '<td class=clspan="2">' + 'Category Not Available.' + '</td>';
                obj += '</tr>';

                $('#table_data').html(obj);
            } else {
                var obj = '';
                $.each(response, function (index, item) {
                    obj += '<tr>'
                    obj += '<td>' + item.CategoryID + '</td>';
                    obj += '<td>' + item.CategoryName + '</td>';
                    obj += '<td><a href="#" class="btn btn-sm btn-success" onclick="Edit(' + item.CategoryID + ')">Edit</a>||<a href="#" class="btn btn-sm btn-danger" onclick=Delete(' + item.CategoryID + ')>Delete</a></td>';
                    obj+='</tr>'
                })

            }
        }
    })
}