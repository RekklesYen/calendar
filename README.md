# Vue-簡易行事曆

### Demo

[Demo 頁](https://rekklesyen.github.io/calendar)

### 應用說明

提供帳號註冊/登入機制，建立個人待辦事項。

### 功能說明

---

#### 帳號註冊/登入

> 說明：使用 firebase 完成註冊功能以及登任的身分驗證，表單驗證使用 `vee-validate`，登入/登出/註冊成功後使用 `cxlt-vue2-toastr` 彈出提示畫面

> 參考網址:

- [vee-validate](https://baianat.github.io/vee-validate/)

- [cxlt-vue2-toastr](https://github.com/chengxulvtu/cxlt-vue2-toastr)

DEMO:

![Register](https://github.com/RekklesYen/calendar/blob/master/gif/register.gif?raw=true 'Register')

![Login](https://github.com/RekklesYen/calendar/blob/master/gif/login.gif?raw=true 'Login')

---

#### 建立待辦事項

> 說明：輸入代辦事項後儲存資料至 firebase，components 之間的溝通使用`props`、`event bus`達成

DEMO:

![Add](https://github.com/RekklesYen/calendar/blob/master/gif/add.gif?raw=true 'add')

---

#### 修改/刪除待辦事項

> 說明：雙擊代辦事項可修改，Exc 鍵或滑鼠取消 focus 則取消修改資料

DEMO:

![Update](https://github.com/RekklesYen/calendar/blob/master/gif/add.gif?raw=true 'Update')
