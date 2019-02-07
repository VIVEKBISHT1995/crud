(function() {
  var tableData = [];

  function loadTableData() {
    $.ajax({
        url: "/getData",
        type: "get",
        contentType: "application/json",
        success: function(data) {
            console.log(data);
            tableData = data;
            for (var i = 0; i < tableData.length; i++) {
                addRowInTable(tableData[i]);
            }
        },
      });
  }

  function addRowInTable(data) {
    var $tr = $('<tr></tr>');
    for (var i = 0; i < data.length; i++) {
        var $td = $(`<td>${data[i].value}</td>`);
        $tr.append($td);
    }
    $("#tbody").append($tr);
  }

  function sendFormData(data) {
    if (data.length) {
      var newData = [];
      for (var i = 0; i < data.length; i++) {
        newData.push({
          name: data[i].field.attr("name"),
          value: data[i].value
        });
      }
      $.ajax({
        url: "/submit",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
          if(data.success) {
            tableData.push(newData);
            addRowInTable(newData);
          } else {
              console.log('Failed to save data');
          }
        },
        data: JSON.stringify(newData)
      });
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    var $username = $("#username");
    var $password = $("#password");
    var $email = $("#email");
    var username = $.trim($username.val());
    var password = $.trim($password.val());
    var email = $.trim($email.val());
    var errorClassName = "error";
    var formInputs = [
      {
        value: username,
        field: $username,
        error: "Invalid Username"
      },
      {
        value: password,
        field: $password,
        error: "Invalid Password"
      },
      {
        value: email,
        field: $email,
        error: "Invalid Email"
      }
    ];

    var isValid = true;

    for (var i = 0; i < formInputs.length; i++) {
      var formItem = formInputs[i];
      if (formItem.value === "") {
        isValid = false;
        formItem.field.addClass(errorClassName);
        break;
      } else {
        formItem.field.removeClass(errorClassName);
      }
    }

    if (isValid) {
      sendFormData(formInputs);
    }
  }
  $(function() {
    $("#submit").on("click", formSubmit);
    loadTableData();
  });
})();
