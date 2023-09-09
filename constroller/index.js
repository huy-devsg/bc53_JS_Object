var listEmp = new listEmployee();
var dataJson = localStorage.getItem("LISTEMP");
if (dataJson !== null) {
    listEmp.employees = JSON.parse(dataJson).map(function (item) {
        return new Employee(
            item.tknv,
            item.fullName,
            item.email,
            item.password,
            item.datepicker,
            item.luongCB,
            item.chucvu,
            item.gioLam
        );
      });
      renderTable(listEmp.employees);
    }
function getEmployeeForm()
{
    var tknv = document.querySelector('#tknv').value;
    var fullName = document.querySelector('#fullName').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var datepicker = document.querySelector('#datepicker').value;
    var luongCB = document.querySelector('#luongCB').value;
    var chucvu = document.querySelector('#chucvu');
        chucvu = chucvu.options[chucvu.selectedIndex].textContent;
    var gioLam = document.querySelector('#gioLam').value;

    return new Employee(
        tknv,
        fullName,
        email,
        password,
        datepicker,
        luongCB,
        chucvu,
        gioLam)
};
function addFunction()
{
    document.querySelector("#btnThemNV").style.display = 'block';
    document.querySelector("#btnCapNhat").style.display = 'none';
    document.querySelector("#header-title").innerHTML = 'Thêm Nhân Viên'
}
var listArr = [];
function addEmployee()
{
    document.querySelector("#header-title").innerHTML = 'Thêm Nhân Viên'
    var emp = getEmployeeForm();
    var valid1 = kiemTraRong(
        emp.tknv,
        "#tbTKNV",
        "Tên tài khoản không được bỏ trống !")
        &&kiemTraDoDai(
        emp.tknv,
        "#tbTKNV",
        4, 6,
        'Tên TK chỉ được từ 4-6 kí tự !');

    valid2 = kiemTraRong(
        emp.fullName,
        "#tbTen",
        "Họ và tên không được bỏ trống !",)
        &&kiemTraChu(
        emp.fullName,
        "#tbTen",
        'Họ tên không được dùng số hoặc kí tự đặc biệt !');

    valid3 = kiemTraRong(
        emp.email,
        "#tbEmail",
        "Email không được bỏ trống !")
        &&kiemTraEmail(
            emp.email,
            "#tbEmail",
            'Email không đúng định dạng !');

    valid4 = kiemTraRong(
        emp.password,
        "#tbMatKhau",
        "Mật khẩu không được bỏ trống !")
        &&kiemTraDoDai(
        emp.password,
        "#tbMatKhau",
        6,10,
        'Mật khẩu chứa 6~10 kí tự !')
        &&kiemTraMK(
        emp.password,
        "#tbMatKhau",
        'Mật khẩu có chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt !');

    valid5 = kiemTraRong(
        emp.datepicker,
        "#tbNgay",
        "Ngày làm không được bỏ trống !")
        &&kiemTraDate(
        emp.datepicker,
        "#tbNgay",
        'Ngày làm không đúng định dạng (MM/DD/YYYY) !');

    valid6 = kiemTraRong(
        emp.luongCB,
        "#tbLuongCB",
        "Lương cơ bản không được bỏ trống !")
      &&kiemTraNumber(
        emp.luongCB,
        "#tbLuongCB",
        1000000,20000000,
        'Mức lương cơ bản từ 1.000.000 - 20.000.000 !');  

    valid7 = kiemTraRong(
        emp.chucvu,
        "#tbChucVu",    
        "Chọn chức vụ hợp lệ !");   
 
    valid8 = kiemTraRong(
        emp.gioLam,
        "#tbGiolam",
        "Giờ làm không được để trống !")
      &&kiemTraNumber(
        emp.gioLam,
        "#tbGiolam",
        80,200,
        'Số giờ làm trong tháng 80 - 200 giờ !');
        // console.log('valid: ', valid);
    var valid = valid1&&valid2&&valid3&&valid4&&valid5&&valid6&&valid7&&valid8;
    if (valid) {
        document.querySelector("#btnCapNhat").style.display = 'none';
        listEmp._addEmployee(emp);
        localStorage.setItem('LISTEMP', JSON.stringify(listEmp.employees));
        alert('Thêm nhân viên thành công');
        renderTable(listEmp.employees);
    }
}
function editEmp(IDTK) {
    resetForm();
    var id = IDTK;
    if (id) {
        console.log('id: ', id);
        var modal = document.querySelector('#myModal');
        if (modal) {
            $(modal).modal('show');
        }
        var emp = listEmp._getEmp(id);
        console.log('emp: ', emp);

        if (emp) {
            document.querySelector('#tknv').value       = id;
            document.querySelector('#tknv').disabled    = true;
            document.querySelector('#fullName').value   = emp.fullName;
            document.querySelector('#email').value      = emp.email;
            document.querySelector('#password').value   = emp.password;
            document.querySelector('#datepicker').value =emp.datepicker;
            document.querySelector('#luongCB').value    =emp.luongCB;
            if(emp.chucvu == 'Sếp')
            {
                document.querySelector('#chucvu').selectedIndex =1;
            }
            else if(emp.chucvu == 'Trưởng phòng')
            {
                document.querySelector('#chucvu').selectedIndex =2;
            }
            else
            {
                document.querySelector('#chucvu').selectedIndex =3;
            }
            document.querySelector('#gioLam').value     =emp.gioLam;
            document.querySelector("#btnThemNV").style.display = 'none';
            document.querySelector("#btnCapNhat").style.display = 'block';
            document.querySelector("#header-title").innerHTML = 'Sửa Nhân Viên'
        }

    } else {
        if (modal) {
            $(modal).modal('show');
            document.querySelector('#tknv').value = '';
        }
    }
}
function delEmp(IDTK)
{

    var id = IDTK;
    var modal = document.querySelector('#modalDelete');
        if (modal) {
            $(modal).modal('show');
        }
            listEmp._delEmployee(id);
            document.querySelector('#text-delete').innerHTML = `Xóa thành công ID ${id}`
            localStorage.setItem('LISTEMP', JSON.stringify(listEmp.employees));
            renderTable(listEmp.employees);      

}
function updateEmp()
{
    var emp = getEmployeeForm();
    var valid1 = kiemTraRong(
        emp.tknv,
        "#tbTKNV",
        "Tên tài khoản không được bỏ trống !")
        &&kiemTraDoDai(
        emp.tknv,
        "#tbTKNV",
        4, 6,
        'Tên TK chỉ được từ 4-6 kí tự !');

    valid2 = kiemTraRong(
        emp.fullName,
        "#tbTen",
        "Họ và tên không được bỏ trống !",)
        &&kiemTraChu(
        emp.fullName,
        "#tbTen",
        'Họ tên không được dùng số hoặc kí tự đặc biệt !');

    valid3 = kiemTraRong(
        emp.email,
        "#tbEmail",
        "Email không được bỏ trống !")
        &&kiemTraEmail(
            emp.email,
            "#tbEmail",
            'Email không đúng định dạng !');

    valid4 = kiemTraRong(
        emp.password,
        "#tbMatKhau",
        "Mật khẩu không được bỏ trống !")
        &&kiemTraDoDai(
        emp.password,
        "#tbMatKhau",
        6,10,
        'Mật khẩu chứa 6~10 kí tự !')
        &&kiemTraMK(
        emp.password,
        "#tbMatKhau",
        'Mật khẩu có chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt !');
        

    valid5 = kiemTraRong(
        emp.datepicker,
        "#tbNgay",
        "Ngày làm không được bỏ trống !")
        &&kiemTraDate(
        emp.datepicker,
        "#tbNgay",
        'Ngày làm không đúng định dạng (MM/DD/YYYY) !');

    valid6 = kiemTraRong(
        emp.luongCB,
        "#tbLuongCB",
        "Lương cơ bản không được bỏ trống !")
      &&kiemTraNumber(
        emp.luongCB,
        "#tbLuongCB",
        1000000,20000000,
        'Mức lương cơ bản từ 1.000.000 - 20.000.000 !');  

    valid7 = kiemTraRong(
        emp.chucvu,
        "#tbChucVu",    
        "Chọn chức vụ hợp lệ !");   
 
    valid8 = kiemTraRong(
        emp.gioLam,
        "#tbGiolam",
        "Giờ làm không được để trống !")
      &&kiemTraNumber(
        emp.gioLam,
        "#tbGiolam",
        80,200,
        'Số giờ làm trong tháng 80 - 200 giờ !');
        // console.log('valid: ', valid);
    var valid = valid1&&valid2&&valid3&&valid4&&valid5&&valid6&&valid7&&valid8;
    if (valid) {
        listEmp._updateEmp(emp);
        resetForm();
        document.querySelector('#btnCapNhat').setAttribute("data-dismiss", "modal");
        document.querySelector('#tknv').disabled    = false;
        localStorage.setItem('LISTEMP', JSON.stringify(listEmp.employees)); 
        renderTable(listEmp.employees);
        alert('Cập nhật thành công');
        resetForm();
    }
    else
    {
        document.querySelector('#btnCapNhat').removeAttribute("data-dismiss");
    }
}  

document.querySelector("#btnTimNV").onclick = function () {
    var textSearch = document.querySelector("#searchName").value.trim()
    textSearch.toLowerCase();
    var result = [];
  
    if (textSearch.length > 0) {
      result = listEmp.employees.filter(function (emp) {
        return emp.employeeElassification().toLowerCase().includes(textSearch);
      });
      if(result.length=== 0)
      {
        document.querySelector('#tableDanhSach').innerHTML = `Không tìm thấy kết quả, vui lòng thử lại.`;
      }
      else
      {
        renderTable(result);
      }      
    } else {
      renderTable(listEmp.employees);
    }
  };
  

function resetForm() {
    document.querySelector('#tknv').value = '';
    document.querySelector('#tknv').disabled = false;
    document.querySelector('#fullName').value= '';
    document.querySelector('#email').value= '';
    document.querySelector('#password').value= '';
    document.querySelector('#datepicker').value= '';
    document.querySelector('#luongCB').value= '';
    document.querySelector('#gioLam').value= '';

  }
function renderTable(listArr) {
    var htmlString = '';
    for (var i = 0; i < listArr.length; i++) {
        var emp = listArr[i];
        htmlString += `<tr>
            <td>${emp.tknv}</td>
            <td>${emp.fullName}</td>
            <td>${emp.email}</td>
            <td>${emp.datepicker}</td>
            <td>${emp.chucvu}</td>
            <td>${emp.caculatorSalary()}</td>
            <td>${emp.employeeElassification()}</td>
            <td>
                <button class="btn btn-warning" id="editEmp" onclick="editEmp('${emp.tknv}')">Edit</button>
                <button class="btn btn-danger" id="delEmp" onclick="delEmp('${emp.tknv}')">Delete</button>
            </td>
        </tr>`;
    }
    document.querySelector("#tableDanhSach").innerHTML = htmlString;
}
