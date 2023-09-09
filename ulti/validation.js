function kiemTraRong(value, idErr, message) {  
   if (value === "" || value === "Chọn chức vụ") {
    document.querySelector(idErr).style.display = 'block';
    document.querySelector(idErr).innerHTML = message;
    return false;
  }
  else {   
    document.querySelector(idErr).style.display = 'none';
    return true;    
  }
}
function kiemTraDoDai(value,idErr, min, max, message)
{
  if(value.length < min || value.length > max)
  {
    document.querySelector(idErr).style.display = 'block';
    document.querySelector(idErr).innerHTML = message;
    return false;
  } 
  else
  {
    document.querySelector(idErr).style.display = 'none';
    return true;
  }
}
function kiemTraNumber(value,idErr, min, max, message)
{
  if(value < min || value > max)
  {
    document.querySelector(idErr).style.display = 'block';
    document.querySelector(idErr).innerHTML = message;
    return false;
  } 
  else
  {
    document.querySelector(idErr).style.display = 'none';
    return true;
  }
}
function testRegex(regex,value,idErr, message)
{
  if(!regex.test(value))
  {
    document.querySelector(idErr).style.display = 'block';
    document.querySelector(idErr).innerHTML = message;
    return false;
  }
  else
  {
    document.querySelector(idErr).style.display = 'none';
    return true;
  }
}
function kiemTraChu(value, idErr, message)
{
  var re = /^[A-Za-z\sÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+$/;
  return testRegex(re,value,idErr, message);
}
function kiemTraEmail(value, idErr, message)
{
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return testRegex(re,value,idErr, message);
}
function kiemTraMK(value, idErr, message)
{
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/;
  return testRegex(re,value,idErr, message);
}
function kiemTraDate(value, idErr, message)
{
  var re = /^((0[1-9]|1[0-2])\/(0[1-9]|1\d|2[0-9]|3[0-1])\/((19|20)\d{2}))$/;
  return testRegex(re,value,idErr, message);
}

