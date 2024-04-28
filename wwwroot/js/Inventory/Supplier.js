$(document).ready(function () {
    GetSupplier();
});



function GetSupplier() {
    $.ajax({
        url: '/Supplier/SuppliersList',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            debugger
            if (response == null || response == undefined || response.length == 0) {

                var obj = '';
                obj += '<tr>';
                obj += '<td colspan="3">' + 'Supplier Not Available.' + '</td>';
                obj += '</tr>';

                $('#supplier_data').html(obj);
            } else {
                var obj = '';
                debugger
                $.each(response, function (index, item) {
                    debugger
                    obj += '<tr>'
                    obj += '<td>' + item.SupplierID + '</td>';
                    obj += '<td>' + item.SupplierName + '</td>';
                    obj += '<td><a class="btn btn-sm btn-success" onclick="Edit(' + item.SupplierID + ')">Edit</a> | <a href="#" class="btn btn-sm btn-danger" onclick=Delete(' + item.categoryID + ')>Delete</a></td>';
                    obj += '</tr>'

                });
                $('#supplier_data').html(obj);
            }
        },
        error: function () {
            debugger
            alert('Unable to read the data.')
        }

    })
}


$('#btnAddSupplier').click(function () {
    $('#addSupplierModal').modal('show');
    $('#addSupplierModalLabel').text('Add Supplier');
    $('#update').css('display', 'none');
});


function validate() {
    var isValid = true;
    if ($('#SupplierName').val().trim() == "") {
        $('#SupplierName').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#SupplierName').css('border-color', 'lightgrey');
    }

    return isValid;
}

$('#SupplierName').change(function () {
    validate();
});
function clearData() {
    $('#SupplierName').val('');
}


function HideModal() {
    clearData();
    $('#save').css('display', 'block');
    $('#update').css('display', 'none');
    $('#addSupplierModal').modal('hide');
}

function Insert() {
    debugger

    var result = validate();
    if (result == false) {
        return false;
    }
    var fromData = new Object();
    fromData.SupplierID = $('#SupplierID').val();
    fromData.SupplierName = $('#SupplierName').val();


    $.ajax({
        url: '/Supplier/Create',
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
