module.exports = Object.freeze({
    ROLE_REPAIRER: 2,

    LOGIN_FAIL_MESSAGE: "Sai tên tài khoản hoặc mật khẩu",
    REGISTER_SUCCESSFULLY: "Đăng ký thành công",
    PHONE_NUMBER_REGISTERED: "Số điện thoại đã được sử dụng",
    PHONE_NUMBER_IS_NOT_REGISTERED: "Số điện thoại chưa được đăng ký",
    RESET_PASSWORD_SUCCESSFULLY: "Đổi mật khẩu thành công",

    OLD_PASSWORD_IS_NOT_CORRECT: "Mật khẩu cũ không đúng",

    UPDATE_SUCCESSFULLY: "Lưu thay đổi thành công",
    TAKE_REQUEST_SUCCESSFULLY: "Nhận yêu cầu thành công",

    // Đang tìm thợ
    STATUS_REQUEST_FINDING: 1,
    // Thợ đã nhận đồng thời có nút Bắt đầu sửa
    STATUS_REQUEST_HASTAKEN: 2,
    // Đang sửa: chuyển sang sau khi thợ ấn vào nút Bắt đầu sửa
    STATUS_REQUEST_FIXING: 3,
    // Đã sửa xong đồng thời khi ấn vào tạo hóa đơn
    STATUS_REQUEST_FIXED: 4,
    // Đã tạo xong hóa đơn
    STATUS_REQUEST_PAID: 5,
    STATUS_REQUEST_CANCELED: 6,
})