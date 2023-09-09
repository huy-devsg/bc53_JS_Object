function Employee(
        _tknv,
        _fullName,
        _email,
        _password,
        _datepicker,
        _luongCB,
        _chucvu,
        _gioLam)
    {
        this.tknv = _tknv;
        this.fullName = _fullName;
        this.email = _email;
        this.password = _password;
        this.datepicker= _datepicker;
        this.luongCB = _luongCB;
        this.chucvu = _chucvu;
        this.gioLam = _gioLam;

        // method
        this.caculatorSalary = function()
        {
            if(this.chucvu !== 'Chọn chức vụ')
            {
                if (this.chucvu === 'Sếp') 
                {
                    return this.luongCB *3;
                }
                else if (this.chucvu === 'Trưởng phòng') 
                {
                    return this.luongCB *2;
                }
                else
                {
                    return this.luongCB;
                }
            }
            else
            {
                return '';
            }
        };
        this.employeeElassification = function()
        {
            if(!isNaN(this.gioLam))
            {
                if(this.gioLam >= 192)
                {
                    return 'Nhân viên xuất sắc'
                }
                else if(this.gioLam >= 176)
                {
                    return 'Nhân viên giỏi'
                }
                else if(this.gioLam >= 160)
                {
                    return 'Nhân viên khá'
                }
                else
                {
                    return 'Nhân viên trung bình'
                }
            }
        };
}