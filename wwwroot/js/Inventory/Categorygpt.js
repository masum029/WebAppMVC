$(document).ready(function () {
    getCategoryList();
});

// Fetch and display the list of categories
function getCategoryList() {
    $.ajax({
        url: '/Category/CategryList',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            debugger
            updateCategoryTable(response);
        },
        error: function () {
            alert('Error retrieving the category list.');
        }
    });
}

// Update the category table based on the response data
function updateCategoryTable(data) {
    var tableContent = '';

    if (!data || data.length === 0) {
        tableContent += '<tr>';
        tableContent += '<td colspan="3">No categories available.</td>';
        tableContent += '</tr>';
    } else {
        data.forEach(function (item) {
            tableContent += '<tr>';
            tableContent += `<td>${item.categoryID}</td>`;
            tableContent += `<td>${item.categoryName}</td>`;
            tableContent += `<td>
                                <a class="btn btn-sm btn-success" onclick="editCategory(${item.categoryID})">Edit</a> | 
                                <a class="btn btn-sm btn-danger" onclick="deleteCategory(${item.categoryID})">Delete</a>
                             </td>`;
            tableContent += '</tr>';
        });
    }

    $('#table_data').html(tableContent);
}

$('#btnAddCategory').click(function () {
    showCategoryModal('Add Category', true);
});

function showCategoryModal(title, isAdd) {
    $('#addCategoryModalLabel').text(title);
    $('#addCategoryModal').modal('show');
    $('#CategoryName').val('');

    if (isAdd) {
        $('#save').show();
        $('#update').hide();
    } else {
        $('#save').hide();
        $('#update').show();
    }
}

// Validate category input
function validateCategory() {
    var isValid = true;
    var categoryName = $('#CategoryName').val().trim();

    if (categoryName === "") {
        $('#CategoryName').css('border-color', 'red');
        isValid = false;
    } else {
        $('#CategoryName').css('border-color', 'lightgrey');
    }

    return isValid;
}

$('#CategoryName').change(validateCategory);

// Insert a new category
function insertCategory() {
    if (!validateCategory()) return;

    var data = {
        CategoryID: 0, // Assuming 0 for new category
        categoryName: $('#CategoryName').val()
    };

    $.ajax({
        url: '/Category/Insert',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(data),
        success: function (response) {

            if (response) {
                hideCategoryModal();
                getCategoryList();
                alert('Category created successfully.');
            } else {
                alert('Error creating category.');
            }
        },
        error: function () {
            alert('Error creating category.');
        }
    });
}

// Edit an existing category
function editCategory(categoryID) {
    $.ajax({
        url: `/Category/Edit?id=${categoryID}`,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (!response) {
                alert('Category not found.');
            } else {
                showCategoryModal('Edit Category', false);
                $('#CategoryID').val(response.categoryID);
                $('#CategoryName').val(response.categoryName);
            }
        },
        error: function () {
            alert('Error fetching category data.');
        }
    });
}

// Update an existing category
function updateCategory() {
    if (!validateCategory()) return;

    var data = {
        CategoryID: $('#CategoryID').val(),
        categoryName: $('#CategoryName').val()
    };

    $.ajax({
        url: '/Category/Update',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(data),
        success: function (response) {
            if (response) {
                hideCategoryModal();
                getCategoryList();
                alert('Category updated successfully.');
            } else {
                alert('Error updating category.');
            }
        },
        error: function () {
            alert('Error updating category.');
        }
    });
}

// Delete a category
function deleteCategory(categoryID) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    $.ajax({
        url: `/Category/Delete?id=${categoryID}`,
        type: 'POST',
        success: function (response) {
            if (response) {
                getCategoryList();
                alert('Category deleted successfully.');
            } else {
                alert('Error deleting category.');
            }
        },
        error: function () {
            alert('Error deleting category.');
        }
    });
}

// Hide and reset the category modal
function hideCategoryModal() {
    $('#addCategoryModal').modal('hide');
}
