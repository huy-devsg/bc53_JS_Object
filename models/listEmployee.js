function listEmployee()
{
    this.employees = [];
    this._addEmployee = function (emp)
    {
        this.employees.push(emp)
    };

    this._findIndex= function (tknv) {
        var index = -1;
        for (var i = 0; i < this.employees.length; i++) {
          var emp = this.employees[i];
          if (emp.tknv === tknv) {
            index = i;
            break;
          }
        }
        return index;
    };

    this._getEmp = function (tknv) {
        var index = this._findIndex(tknv);
        if (index !== -1) {
          var emp = this.employees[index];
          return emp;
        }
      };

      this._delEmployee = function (tknv) {
        var index = this._findIndex(tknv);
        if (index !== -1) {
          this.employees.splice(index, 1);
        }
      };
        
      this._updateEmp = function (emp) {
        var index = this._findIndex(emp.tknv);
        if (index !== -1) {
          this.employees[index] = emp;
        }
      };
    
}   