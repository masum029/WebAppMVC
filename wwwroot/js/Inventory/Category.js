//const { get } = require("jquery");

$(document).ready(function () {
    GetCategory();
});



function GetCategory() {
    $.ajax({
        url: '/Category/CategryList',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            //debugger
            if (response == null || response == undefined || response.length == 0) {

                var obj = '';
                obj += '<tr>';
                obj += '<td colspan="3">' + 'Category Not Available.' + '</td>';
                obj += '</tr>';

                $('#table_data').html(obj);
            } else {
                var obj = '';

                $.each(response, function (index, item) {
                    debugger
                    obj += '<tr>'
                    obj += '<td>' + item.categoryID + '</td>';
                    obj += '<td>' + item.categoryName + '</td>';
                    obj += '<td><a class="btn btn-sm btn-success" onclick="Edit(' + item.categoryID + ')">Edit</a> | <a href="#" class="btn btn-sm btn-danger" onclick=Delete(' + item.categoryID + ')>Delete</a></td>';
                    obj += '</tr>'

                });
                $('#table_data').html(obj);
            }
        },
        error: function () {
            debugger
            alert('Unable to read the data.')
        }

    })
}


$('#btnAddCategory').click(function () {
    $('#addCategoryModal').modal('show');
    $('#addCategoryModalLabel').text('Add Category');
});

function HideModal() {
    clearData();
    $('#save').css('display', 'block');
    $('#update').css('display', 'none');
    $('#addCategoryModal').modal('hide');
}

function clearData() {
    $('#CategoryName').val('');
}


function validate() {
    var isValid = true;
    if ($('#CategoryName').val().trim() == "") {
        $('#CategoryName').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#CategoryName').css('border-color', 'lightgrey');
    }

    return isValid;
}

$('#CategoryName').change(function () {
    validate();
});
function Insert() {
    debugger

    var result = validate();
    if (result == false) {
        return false;
    }
    var fromData = new Object();
    fromData.CategoryID = $('#CategoryID').val();
    fromData.categoryName = $('#CategoryName').val();


    $.ajax({
        url: '/category/Insert',
        data: fromData,
        type: 'post',

        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                alert("Unable to save data.")
            } else {
                HideModal();
                GetCategory();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data');
        }
    });
}


function Edit(CategoryID) {
    debugger
    $.ajax({
        url: 'Category/Edit?id=' + CategoryID,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',

        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read the data');
            }
            else if (response.length == 0) {
                alert('No record found with the id' + id)
            }
            else {
                debugger
                $('#addCategoryModal').modal('show');
                $('#addCategoryModalLabel').text('Update Category');
                $('#save').css('display', 'none');          
                $('#update').removeClass('disabled');
                $('#update').css('display', 'block');
                $('#CategoryID').val(response.categoryID);
                $('#CategoryName').val(response.categoryName);
            }
        }, error: function () {

        }
    });
}

function Update() {
    debugger

    var result = validate();
    if (result == false) {
        return false;
    }
    var fromData = new Object();
    fromData.CategoryID = $('#CategoryID').val();
    fromData.categoryName = $('#CategoryName').val();


    $.ajax({
        url: '/category/Update',
        data: fromData,
        type: 'post',

        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                alert("Unable to save data.")
            } else {
                HideModal();
                GetCategory();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data');
        }
    });
}


function Delete(CategoryID) {
    debugger

    if (confirm('Are you sure to delete this record?')) {

    }
    $.ajax({
        url: 'Category/Delete?id=' + CategoryID,
        type: 'post',
   

        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read the data');
            }
            else if (response.length == 0) {
                alert('No record found with the id' + id)
            }
            else {
                GetCategory();
                alert(response);
            }
        }, error: function () {
            alert('Error Occourd');
        }
    });
}
