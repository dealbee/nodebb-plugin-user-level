# Plugin thêm cấp độ cho người dùng và hỗ trợ hiển thị thông tin này

Plugin cho phép tạo và chỉnh sửa danh sách các cấp độ cho người dùng

Plugin hiển thị cấp độ người dùng ở các bài viết và trang thông tin người dùng

## Tạo và chỉnh sửa danh sách cấp độ người dùng

Để tạo danh sách này, admin có thể truy cập vào đường dẫn `/admin/plugins/user-level`

Mỗi cấp độ người dùng cần có tên cấp và giá trị tối thiểu của điểm uy tín để đạt được cấp độ này

Thứ tự của các cấp người dùng có thể nằm lộn xộn (nhưng nên theo thứ tự để admins có thể dễ dàng quản lý)
![Image](screenshots/admin.png?raw=true)

## Hiển thị thông tin cấp độ người dùng

### Thông tin ở các bài viết

Thông tin này được hiển thị trước tên của người dùng
![Image](screenshots/post-line.png?raw=true)

Các thông tin thêm bao gồm:
*Số điểm uy tín hiện có / số điểm uy tín cần có để đến cấp tiếp theo
*Cấp độ tiếp theo
![Image](screenshots/post-line-more.png?raw=true)

### Thông tin ở trang thông tin người dùng

Thông tin được hiển thị giữa họ tên (fullname) của người dùng và tên người dùng (username)
![Image](screenshots/profile.png?raw=true)

