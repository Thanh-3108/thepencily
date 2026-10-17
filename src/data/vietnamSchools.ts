export interface ProvinceData {
  id: string;
  name: string;
  universities?: string[];
  highSchools: string[];
}

export const VIETNAM_PROVINCES_DATA: ProvinceData[] = [
  {
    id: "hcm",
    name: "TP. Hồ Chí Minh",
    universities: [
      "Đại học Quốc gia TP.HCM",
      "ĐH Bách Khoa - ĐHQG TP.HCM",
      "ĐH Khoa học Tự nhiên - ĐHQG TP.HCM",
      "ĐH Khoa học Xã hội & Nhân văn - ĐHQG TP.HCM",
      "ĐH Quốc tế - ĐHQG TP.HCM",
      "ĐH Công nghệ Thông tin - ĐHQG TP.HCM",
      "ĐH Kinh tế - Luật - ĐHQG TP.HCM",
      "Đại học Y Dược TP.HCM",
      "Đại học Y khoa Phạm Ngọc Thạch",
      "Đại học Kinh tế TP.HCM (UEH)",
      "Đại học Sư phạm TP.HCM (HCMUE)",
      "Đại học Ngoại thương Cơ sở II (FTU2)",
      "Đại học Luật TP.HCM (ULAW)",
      "Đại học Ngân hàng TP.HCM (HUB)",
      "Đại học Nông Lâm TP.HCM (NLU)",
      "ĐH Sư phạm Kỹ thuật TP.HCM (HCMUTE)",
      "Đại học Giao thông Vận tải TP.HCM",
      "Đại học Sài Gòn (SGU)",
      "Đại học Mở TP.HCM (OU)",
      "Đại học RMIT Việt Nam (Cơ sở Nam Sài Gòn)",
      "Đại học Fulbright Việt Nam",
      "Đại học FPT TP.HCM",
      "Đại học Tôn Đức Thắng (TDTU)",
      "Đại học Hoa Sen",
      "Đại học Văn Lang",
      "Đại học Công nghệ TP.HCM (HUTECH)",
      "Đại học Kinh tế - Tài chính TP.HCM (UEF)",
      "Đại học Công Thương TP.HCM (HUIT)",
    ],
    highSchools: [
      "THPT Chuyên Năng Khiếu (PTNK, ĐHQG-HCM)",
      "THPT Chuyên Lê Hồng Phong",
      "THPT Chuyên Trần Đại Nghĩa",
      "THPT Nguyễn Thượng Hiền",
      "THPT Gia Định",
      "THPT Bùi Thị Xuân",
      "THPT Nguyễn Thị Minh Khai",
      "THPT Lê Quý Đôn",
      "THPT Lương Thế Vinh",
      "THPT Mạc Đĩnh Chi",
      "THPT Trần Phú",
      "THPT Nguyễn Hữu Huân",
      "THPT Phú Nhuận",
      "THPT Võ Thị Sáu",
      "THPT Nguyễn Công Trứ",
      "THPT Marie Curie",
      "THPT Hùng Vương",
      "THPT Võ Trường Toản",
      "THPT Trưng Vương",
      "THPT Tây Thạnh",
      "THPT Trần Hưng Đạo",
      "THPT Thủ Đức",
      "THPT Hoàng Hoa Thám",
      "THPT Nguyễn Khuyến",
      "THPT Nguyễn Du",
      "THCS & THPT Đinh Thiện Lý (Lawrence S. Ting)",
      "Trường Quốc tế Úc (AIS)",
      "Trường Quốc tế Anh (BIS HCMC)",
      "Trường Quốc tế Nam Sài Gòn (SSIS)",
    ],
  },
  {
    id: "hanoi",
    name: "Hà Nội",
    universities: [
      "Đại học Quốc gia Hà Nội",
      "ĐH Công nghệ - ĐHQG Hà Nội (UET)",
      "ĐH Khoa học Tự nhiên - ĐHQG Hà Nội",
      "ĐH Khoa học Xã hội & Nhân văn - ĐHQG Hà Nội",
      "ĐH Ngoại ngữ - ĐHQG Hà Nội (ULIS)",
      "ĐH Kinh tế - ĐHQG Hà Nội (UEB)",
      "Đại học Bách Khoa Hà Nội",
      "Đại học Kinh tế Quốc dân (NEU)",
      "Đại học Ngoại thương (FTU)",
      "Đại học Y Hà Nội (HMU)",
      "Đại học Dược Hà Nội (HUP)",
      "Đại học Luật Hà Nội (HLU)",
      "Học viện Ngoại giao (DAV)",
      "Học viện Báo chí và Tuyên truyền (AJC)",
      "Học viện Tài chính (AOF)",
      "Học viện Ngân hàng (BA)",
      "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
      "Đại học Sư phạm Hà Nội (HNUE)",
      "Đại học Xây dựng Hà Nội (HUCE)",
      "Đại học Giao thông Vận tải (UTC)",
      "Đại học Thương mại (TMU)",
      "Đại học Kiến trúc Hà Nội",
      "Đại học Mở Hà Nội (HOU)",
      "Đại học VinUniversity (VinUni)",
      "Đại học FPT Hà Nội",
      "Đại học Anh Quốc Việt Nam (BUV)",
      "Đại học Phenikaa",
    ],
    highSchools: [
      "THPT Chuyên Khoa học Tự nhiên (KHTN, ĐHQGHN)",
      "THPT Chuyên Ngoại ngữ (CNN, ĐHQGHN)",
      "THPT Chuyên Khoa học Xã hội & Nhân văn (ĐHQGHN)",
      "THPT Chuyên Đại học Sư phạm (CSP, HNUE)",
      "THPT Chuyên Hà Nội - Amsterdam",
      "THPT Chuyên Nguyễn Huệ",
      "THPT Chu Văn An",
      "THPT Kim Liên",
      "THPT Thăng Long",
      "THPT Việt Đức",
      "THPT Phan Đình Phùng",
      "THPT Yên Hòa",
      "THPT Cầu Giấy",
      "THPT Lê Quý Đôn - Đống Đa",
      "THPT Lê Quý Đôn - Hà Đông",
      "THPT Trần Phú - Hoàn Kiếm",
      "THPT Nhân Chính",
      "THPT Lương Thế Vinh",
      "THPT Marie Curie Hà Nội",
      "THPT Nguyễn Gia Thiều",
      "THPT Nguyễn Thị Minh Khai - Bắc Từ Liêm",
      "THPT Chuyên Sơn Tây",
      "Trường Quốc tế Liên Hợp Quốc Hà Nội (UNIS)",
    ],
  },
  {
    id: "danang",
    name: "Đà Nẵng",
    universities: [
      "Đại học Đà Nẵng",
      "ĐH Bách Khoa - ĐH Đà Nẵng",
      "ĐH Kinh tế - ĐH Đà Nẵng",
      "ĐH Sư phạm - ĐH Đà Nẵng",
      "ĐH Ngoại ngữ - ĐH Đà Nẵng",
      "ĐH Công nghệ Thông tin & Truyền thông Việt - Hàn (VKU)",
      "Đại học Kỹ thuật Y - Dược Đà Nẵng",
      "Đại học Sư phạm Kỹ thuật - ĐH Đà Nẵng",
      "Đại học Duy Tân",
      "Đại học Đông Á",
      "Đại học Kiến trúc Đà Nẵng",
      "Đại học FPT Đà Nẵng",
    ],
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Đà Nẵng",
      "THPT Phan Châu Trinh",
      "THPT Hoàng Hoa Thám",
      "THPT Hòa Vang",
      "THPT Trần Phú Đà Nẵng",
      "THPT Nguyễn Hiền",
      "THPT Nguyễn Trãi",
      "THPT Ngô Quyền",
      "THPT Thái Phiên Đà Nẵng",
      "THPT FPT Đà Nẵng",
    ],
  },
  {
    id: "cantho",
    name: "Cần Thơ",
    universities: [
      "Đại học Cần Thơ (CTU)",
      "Đại học Y Dược Cần Thơ",
      "Đại học Kỹ thuật - Công nghệ Cần Thơ",
      "Đại học Nam Cần Thơ",
      "Đại học FPT Cần Thơ",
    ],
    highSchools: [
      "THPT Chuyên Lý Tự Trọng",
      "THPT Châu Văn Liêm",
      "THPT Bùi Hữu Nghĩa",
      "THPT Nguyễn Việt Hồng",
      "THPT Phan Ngọc Hiển",
      "THPT Thốt Nốt",
      "THPT Thực hành Sư phạm (ĐH Cần Thơ)",
      "THPT FPT Cần Thơ",
    ],
  },
  {
    id: "haiphong",
    name: "Hải Phòng",
    universities: [
      "Đại học Hàng hải Việt Nam (VMU)",
      "Đại học Y Dược Hải Phòng",
      "Đại học Hải Phòng",
      "Đại học Quản lý và Công nghệ Hải Phòng",
    ],
    highSchools: [
      "THPT Chuyên Trần Phú",
      "THPT Ngô Quyền",
      "THPT Thái Phiên Hải Phòng",
      "THPT Lê Quý Đôn Hải Phòng",
      "THPT Trần Nguyên Hãn",
      "THPT Hồng Bàng",
      "THPT Kiến An",
    ],
  },
  {
    id: "hue",
    name: "Thừa Thiên Huế",
    universities: [
      "Đại học Huế",
      "ĐH Y Dược - ĐH Huế",
      "ĐH Sư phạm - ĐH Huế",
      "ĐH Khoa học - ĐH Huế",
      "ĐH Kinh tế - ĐH Huế",
      "ĐH Ngoại ngữ - ĐH Huế",
      "ĐH Luật - ĐH Huế",
      "ĐH Nông Lâm - ĐH Huế",
      "ĐH Nghệ thuật - ĐH Huế",
    ],
    highSchools: [
      "THPT Chuyên Quốc Học Huế",
      "THPT Hai Bà Trưng",
      "THPT Nguyễn Huệ Huế",
      "THPT Gia Hội",
      "THPT Nguyễn Trường Tộ",
      "THPT Phan Đăng Lưu",
    ],
  },
  {
    id: "nghean",
    name: "Nghệ An",
    universities: [
      "Đại học Vinh",
      "Đại học Y khoa Vinh",
      "Đại học Sư phạm Kỹ thuật Vinh",
    ],
    highSchools: [
      "THPT Chuyên Phan Bội Châu",
      "THPT Chuyên ĐH Vinh",
      "THPT Huỳnh Thúc Kháng",
      "THPT Hà Huy Tập",
      "THPT Lê Viết Thuật",
      "THPT Đô Lương 1",
      "THPT Quỳnh Lưu 1",
    ],
  },
  {
    id: "thanhhoa",
    name: "Thanh Hóa",
    universities: [
      "Đại học Hồng Đức",
      "Đại học Văn hóa, Thể thao và Du lịch Thanh Hóa",
    ],
    highSchools: [
      "THPT Chuyên Lam Sơn",
      "THPT Đào Duy Từ Thanh Hóa",
      "THPT Hàm Rồng",
      "THPT Quảng Xương 1",
      "THPT Sầm Sơn",
      "THPT Hậu Lộc 1",
    ],
  },
  {
    id: "binhdinh",
    name: "Bình Định",
    universities: [
      "Đại học Quy Nhơn",
      "Đại học Quang Trung",
      "Đại học FPT Quy Nhơn",
    ],
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Bình Định",
      "THPT Chuyên Chu Văn An",
      "THPT Quốc Học Quy Nhơn",
      "THPT Trưng Vương Bình Định",
      "THPT số 1 Tuy Phước",
    ],
  },
  {
    id: "khanhhoa",
    name: "Khánh Hòa",
    universities: [
      "Đại học Nha Trang",
      "Đại học Khánh Hòa",
      "Học viện Hải quân",
      "Trường Sĩ quan Thông tin",
      "Trường Sĩ quan Không quân",
    ],
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Khánh Hòa",
      "THPT Lý Tự Trọng Nha Trang",
      "THPT Nguyễn Văn Trỗi",
      "THPT Hoàng Văn Thụ",
      "THPT Hà Huy Tập Nha Trang",
    ],
  },
  {
    id: "lamdong",
    name: "Lâm Đồng",
    universities: [
      "Đại học Đà Lạt",
      "Đại học Yersin Đà Lạt",
      "Học viện Lục quân",
    ],
    highSchools: [
      "THPT Chuyên Thăng Long Đà Lạt",
      "THPT Chuyên Bảo Lộc",
      "THPT Bùi Thị Xuân Đà Lạt",
      "THPT Trần Phú Đà Lạt",
      "THPT Đức Trọng",
    ],
  },
  {
    id: "dongnai",
    name: "Đồng Nai",
    universities: [
      "Đại học Đồng Nai",
      "Đại học Lạc Hồng",
      "Đại học Công nghệ Miền Đông",
    ],
    highSchools: [
      "THPT Chuyên Lương Thế Vinh Đồng Nai",
      "THPT Ngô Quyền Đồng Nai",
      "THPT Trấn Biên",
      "THPT Long Khánh",
      "THPT Thống Nhất A",
    ],
  },
  {
    id: "binhduong",
    name: "Bình Dương",
    universities: [
      "Đại học Quốc tế Miền Đông (EIU)",
      "Đại học Thủ Dầu Một",
      "Đại học Bình Dương",
      "Đại học Kinh tế - Kỹ thuật Bình Dương",
      "Đại học Việt Đức (VGU)",
    ],
    highSchools: [
      "THPT Chuyên Hùng Vương Bình Dương",
      "THPT Trịnh Hoài Đức",
      "THPT Dĩ An",
      "THPT Võ Minh Đức",
      "THPT Nguyễn Trãi Bình Dương",
    ],
  },
  {
    id: "vungtau",
    name: "Bà Rịa - Vũng Tàu",
    universities: [
      "Đại học Bà Rịa - Vũng Tàu (BVU)",
      "ĐH Dầu khí Việt Nam (PVU)",
    ],
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Vũng Tàu",
      "THPT Vũng Tàu",
      "THPT Châu Thành",
      "THPT Đinh Tiên Hoàng Vũng Tàu",
      "THPT Nguyễn Bỉnh Khiêm",
    ],
  },
  {
    id: "tiengiang",
    name: "Tiền Giang",
    universities: [
      "Đại học Tiền Giang",
    ],
    highSchools: [
      "THPT Chuyên Tiền Giang",
      "THPT Nguyễn Đình Chiểu Mỹ Tho",
      "THPT Trương Định",
      "THPT Chợ Gạo",
    ],
  },
  {
    id: "angiang",
    name: "An Giang",
    universities: [
      "Đại học An Giang (ĐHQG TP.HCM)",
    ],
    highSchools: [
      "THPT Chuyên Thoại Ngọc Hầu",
      "THPT Chuyên Thủ Khoa Nghĩa",
      "THPT Long Xuyên",
      "THPT Nguyễn Hiền An Giang",
    ],
  },
  {
    id: "bacninh",
    name: "Bắc Ninh",
    universities: [
      "Đại học Kinh Bắc",
      "Học viện Ngân hàng (Phân viện Bắc Ninh)",
    ],
    highSchools: [
      "THPT Chuyên Bắc Ninh",
      "THPT Hàn Thuyên",
      "THPT Yên Phong 1",
      "THPT Thuận Thành 1",
      "THPT Tiên Du 1",
    ],
  },
  {
    id: "vinhphuc",
    name: "Vĩnh Phúc",
    universities: [
      "Đại học Sư phạm Hà Nội 2",
      "Đại học Công nghệ Giao thông Vận tải (Cơ sở Vĩnh Phúc)",
    ],
    highSchools: [
      "THPT Chuyên Vĩnh Phúc",
      "THPT Ngô Gia Tự Vĩnh Phúc",
      "THPT Trần Phú Vĩnh Phúc",
      "THPT Lê Xoay",
      "THPT Yên Lạc",
    ],
  },
  {
    id: "quangninh",
    name: "Quảng Ninh",
    universities: [
      "Đại học Hạ Long",
      "ĐH Công nghiệp Quảng Ninh",
      "Đại học Ngoại thương (Cơ sở Quảng Ninh)",
    ],
    highSchools: [
      "THPT Chuyên Hạ Long",
      "THPT Hòn Gai",
      "THPT Bãi Cháy",
      "THPT Cẩm Phả",
      "THPT Uông Bí",
    ],
  },
  {
    id: "thainguyen",
    name: "Thái Nguyên",
    universities: [
      "Đại học Thái Nguyên",
      "ĐH Kỹ thuật Công nghiệp - ĐH Thái Nguyên",
      "ĐH Y Dược - ĐH Thái Nguyên",
      "ĐH Sư phạm - ĐH Thái Nguyên",
      "ĐH Kinh tế & Quản trị Kinh doanh - ĐH Thái Nguyên",
      "ĐH Công nghệ Thông tin & Truyền thông (ICTU)",
      "ĐH Nông Lâm - ĐH Thái Nguyên",
    ],
    highSchools: [
      "THPT Chuyên Thái Nguyên",
      "THPT Lương Ngọc Quyến",
      "THPT Gang Thép",
      "THPT Chu Văn An Thái Nguyên",
    ],
  },
  {
    id: "namdinh",
    name: "Nam Định",
    universities: [
      "Đại học Điều dưỡng Nam Định",
      "ĐH Kinh tế - Kỹ thuật Công nghiệp (UNETI)",
      "ĐH Sư phạm Kỹ thuật Nam Định",
    ],
    highSchools: [
      "THPT Chuyên Lê Hồng Phong Nam Định",
      "THPT Giao Thủy",
      "THPT Hải Hậu A",
      "THPT Trần Hưng Đạo Nam Định",
      "THPT Tống Văn Trân",
    ],
  },
  {
    id: "haiduong",
    name: "Hải Dương",
    universities: [
      "Đại học Kỹ thuật Y tế Hải Dương",
      "Đại học Sao Đỏ",
      "Đại học Hải Dương",
    ],
    highSchools: [
      "THPT Chuyên Nguyễn Trãi",
      "THPT Hồng Quang",
      "THPT Thanh Hà",
      "THPT Nam Sách",
    ],
  },
  {
    id: "hungyen",
    name: "Hưng Yên",
    universities: [
      "Đại học Sư phạm Kỹ thuật Hưng Yên",
      "Đại học Tài chính - Quản trị Kinh doanh",
    ],
    highSchools: [
      "THPT Chuyên Hưng Yên",
      "THPT Mỹ Hào",
      "THPT Văn Giang",
      "THPT Khoái Châu",
    ],
  },
  {
    id: "quangnam",
    name: "Quảng Nam",
    universities: [
      "Đại học Quảng Nam",
      "Đại học Phan Châu Trinh",
    ],
    highSchools: [
      "THPT Chuyên Nguyễn Bỉnh Khiêm",
      "THPT Chuyên Lê Thánh Tông",
      "THPT Trần Cao Vân",
      "THPT Huỳnh Thúc Kháng Quảng Nam",
    ],
  },
  {
    id: "quangngai",
    name: "Quảng Ngãi",
    universities: [
      "Đại học Phạm Văn Đồng",
      "Đại học Tài chính - Kế toán",
    ],
    highSchools: [
      "THPT Chuyên Lê Khiết",
      "THPT Trần Quốc Tuấn Quảng Ngãi",
      "THPT Bình Sơn",
    ],
  },
  {
    id: "phuyen",
    name: "Phú Yên",
    universities: [
      "Đại học Phú Yên",
      "ĐH Xây dựng Miền Trung",
    ],
    highSchools: [
      "THPT Chuyên Lương Văn Chánh",
      "THPT Nguyễn Huệ Tuy Hòa",
      "THPT Lê Trung Kiên",
    ],
  },
  {
    id: "daklak",
    name: "Đắk Lắk",
    universities: [
      "Đại học Tây Nguyên",
      "Đại học Đông Á (Phân hiệu Đắk Lắk)",
    ],
    highSchools: [
      "THPT Chuyên Nguyễn Du",
      "THPT Buôn Ma Thuột",
      "THPT Lê Quý Đôn Buôn Ma Thuột",
      "THPT Cư M'gar",
    ],
  },
  {
    id: "gialai",
    name: "Gia Lai",
    universities: [
      "Đại học Nông Lâm TP.HCM (Phân hiệu Gia Lai)",
    ],
    highSchools: [
      "THPT Chuyên Hùng Vương Gia Lai",
      "THPT Pleiku",
      "THPT Lê Lợi Pleiku",
    ],
  },
  {
    id: "bentre",
    name: "Bến Tre",
    universities: [
      "ĐHQG TP.HCM (Phân hiệu Bến Tre)",
    ],
    highSchools: [
      "THPT Chuyên Bến Tre",
      "THPT Nguyễn Đình Chiểu Bến Tre",
      "THPT Phan Thanh Giản",
    ],
  },
  {
    id: "vinhlong",
    name: "Vĩnh Long",
    universities: [
      "Đại học Sư phạm Kỹ thuật Vĩnh Long",
      "Đại học Xây dựng Miền Tây",
      "Đại học Cửu Long",
      "Đại học Kinh tế TP.HCM (Phân hiệu Vĩnh Long)",
    ],
    highSchools: [
      "THPT Chuyên Nguyễn Bỉnh Khiêm Vĩnh Long",
      "THPT Lưu Văn Liệt",
      "THPT Trần Đại Nghĩa Vĩnh Long",
    ],
  },
  {
    id: "dongthap",
    name: "Đồng Tháp",
    universities: [
      "Đại học Đồng Tháp",
    ],
    highSchools: [
      "THPT Chuyên Nguyễn Quang Diêu",
      "THPT Chuyên Nguyễn Đình Chiểu Sa Đéc",
      "THPT TP. Cao Lãnh",
      "THPT Sa Đéc",
    ],
  },
  {
    id: "kiengiang",
    name: "Kiên Giang",
    universities: [
      "Đại học Kiên Giang",
    ],
    highSchools: [
      "THPT Chuyên Huỳnh Mẫn Đạt",
      "THPT Nguyễn Trung Trực Rạch Giá",
      "THPT Phú Quốc",
    ],
  },
  {
    id: "camau",
    name: "Cà Mau",
    universities: [
      "Đại học Bình Dương (Phân hiệu Cà Mau)",
    ],
    highSchools: [
      "THPT Chuyên Phan Ngọc Hiển",
      "THPT Cà Mau",
      "THPT Hồ Thị Kỷ",
    ],
  },
  {
    id: "bacgiang",
    name: "Bắc Giang",
    universities: [
      "Đại học Nông - Lâm Bắc Giang",
    ],
    highSchools: [
      "THPT Chuyên Bắc Giang",
      "THPT Ngô Sĩ Liên",
      "THPT Hiệp Hòa số 1",
      "THPT Lạng Giang số 1",
    ],
  },
  {
    id: "backan",
    name: "Bắc Kạn",
    highSchools: [
      "THPT Chuyên Bắc Kạn",
      "THPT Bắc Kạn",
      "THPT Chợ Đồn",
    ],
  },
  {
    id: "baclieu",
    name: "Bạc Liêu",
    universities: [
      "Đại học Bạc Liêu",
    ],
    highSchools: [
      "THPT Chuyên Bạc Liêu",
      "THPT Bạc Liêu",
      "THPT Giá Rai",
    ],
  },
  {
    id: "binhphuoc",
    name: "Bình Phước",
    highSchools: [
      "THPT Chuyên Quang Trung",
      "THPT Chuyên Bình Long",
      "THPT Đồng Xoài",
      "THPT Phước Bình",
    ],
  },
  {
    id: "binhthuan",
    name: "Bình Thuận",
    universities: [
      "Đại học Phan Thiết",
    ],
    highSchools: [
      "THPT Chuyên Trần Hưng Đạo",
      "THPT Phan Bội Châu Phan Thiết",
      "THPT Phan Chu Trinh",
      "THPT Lý Thường Kiệt La Gi",
    ],
  },
  {
    id: "caobang",
    name: "Cao Bằng",
    highSchools: [
      "THPT Chuyên Cao Bằng",
      "THPT TP. Cao Bằng",
      "THPT Quảng Uyên",
    ],
  },
  {
    id: "daknong",
    name: "Đắk Nông",
    highSchools: [
      "THPT Chuyên Nguyễn Chí Thanh",
      "THPT Gia Nghĩa",
      "THPT Đắk Mil",
    ],
  },
  {
    id: "dienbien",
    name: "Điện Biên",
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Điện Biên",
      "THPT TP. Điện Biên Phủ",
      "THPT Phan Đình Giót",
    ],
  },
  {
    id: "hagiang",
    name: "Hà Giang",
    highSchools: [
      "THPT Chuyên Hà Giang",
      "THPT Lê Hồng Phong Hà Giang",
      "THPT Vị Xuyên",
    ],
  },
  {
    id: "hanam",
    name: "Hà Nam",
    universities: [
      "ĐH Sư phạm Hà Nội (Cơ sở Hà Nam)",
      "ĐH Công nghiệp Hà Nội (Cơ sở Hà Nam)",
    ],
    highSchools: [
      "THPT Chuyên Biên Hòa",
      "THPT Phủ Lý A",
      "THPT Lý Nhân",
      "THPT C Bình Lục",
    ],
  },
  {
    id: "hatinh",
    name: "Hà Tĩnh",
    universities: [
      "Đại học Hà Tĩnh",
    ],
    highSchools: [
      "THPT Chuyên Hà Tĩnh",
      "THPT Phan Đình Phùng Hà Tĩnh",
      "THPT Hồng Lĩnh",
      "THPT Kỳ Anh",
    ],
  },
  {
    id: "haugiang",
    name: "Hậu Giang",
    highSchools: [
      "THPT Chuyên Vị Thanh",
      "THPT Vị Thanh",
      "THPT Ngã Bảy",
      "THPT Long Mỹ",
    ],
  },
  {
    id: "hoabinh",
    name: "Hòa Bình",
    highSchools: [
      "THPT Chuyên Hoàng Văn Thụ",
      "THPT Lạc Long Quân",
      "THPT Công Nghiệp Hòa Bình",
    ],
  },
  {
    id: "kontum",
    name: "Kon Tum",
    universities: [
      "Đại học Đà Nẵng (Phân hiệu Kon Tum)",
    ],
    highSchools: [
      "THPT Chuyên Nguyễn Tất Thành Kon Tum",
      "THPT Kon Tum",
      "THPT Duy Tân",
    ],
  },
  {
    id: "laichau",
    name: "Lai Châu",
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Lai Châu",
      "THPT TP. Lai Châu",
      "THPT Bình Lư",
    ],
  },
  {
    id: "langson",
    name: "Lạng Sơn",
    highSchools: [
      "THPT Chuyên Chu Văn An Lạng Sơn",
      "THPT Việt Bắc Lạng Sơn",
      "THPT Hoàng Văn Thụ Lạng Sơn",
    ],
  },
  {
    id: "laocai",
    name: "Lào Cai",
    universities: [
      "Phân hiệu ĐH Thái Nguyên tại Lào Cai",
    ],
    highSchools: [
      "THPT Chuyên Lào Cai",
      "THPT số 1 TP. Lào Cai",
      "THPT số 1 Bảo Thắng",
    ],
  },
  {
    id: "longan",
    name: "Long An",
    universities: [
      "Đại học Kinh tế Công nghiệp Long An",
      "Đại học Tân Tạo (TTU)",
    ],
    highSchools: [
      "THPT Chuyên Long An",
      "THPT Tân An",
      "THPT Cần Giuộc",
      "THPT Hậu Nghĩa",
    ],
  },
  {
    id: "ninhbinh",
    name: "Ninh Bình",
    universities: [
      "Đại học Hoa Lư",
    ],
    highSchools: [
      "THPT Chuyên Lương Văn Tụy",
      "THPT Đinh Tiên Hoàng Ninh Bình",
      "THPT Yên Khánh A",
      "THPT Kim Sơn A",
    ],
  },
  {
    id: "ninhthuan",
    name: "Ninh Thuận",
    universities: [
      "ĐH Nông Lâm TP.HCM (Phân hiệu Ninh Thuận)",
    ],
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Ninh Thuận",
      "THPT Tháp Chàm",
      "THPT Nguyễn Trãi Ninh Thuận",
    ],
  },
  {
    id: "phutho",
    name: "Phú Thọ",
    universities: [
      "Đại học Hùng Vương",
      "Đại học Công nghiệp Việt Trì",
    ],
    highSchools: [
      "THPT Chuyên Hùng Vương Phú Thọ",
      "THPT Việt Trì",
      "THPT Công Nghiệp Việt Trì",
      "THPT Phù Ninh",
    ],
  },
  {
    id: "quangbinh",
    name: "Quảng Bình",
    universities: [
      "Đại học Quảng Bình",
    ],
    highSchools: [
      "THPT Chuyên Võ Nguyên Giáp",
      "THPT Đào Duy Từ Đồng Hới",
      "THPT Quảng Trạch",
      "THPT Lệ Thủy",
    ],
  },
  {
    id: "quangtri",
    name: "Quảng Trị",
    universities: [
      "Đại học Huế (Phân hiệu Quảng Trị)",
    ],
    highSchools: [
      "THPT Chuyên Lê Quý Đôn Quảng Trị",
      "THPT Đông Hà",
      "THPT Thị xã Quảng Trị",
      "THPT Vĩnh Linh",
    ],
  },
  {
    id: "soctrang",
    name: "Sóc Trăng",
    highSchools: [
      "THPT Chuyên Nguyễn Thị Minh Khai Sóc Trăng",
      "THPT Hoàng Diệu",
      "THPT TP. Sóc Trăng",
    ],
  },
  {
    id: "sonla",
    name: "Sơn La",
    universities: [
      "Đại học Tây Bắc",
    ],
    highSchools: [
      "THPT Chuyên Sơn La",
      "THPT Tô Hiệu Sơn La",
      "THPT Mộc Lỵ",
    ],
  },
  {
    id: "tayninh",
    name: "Tây Ninh",
    highSchools: [
      "THPT Chuyên Hoàng Lê Kha",
      "THPT Tây Ninh",
      "THPT Trần Phú Tây Ninh",
      "THPT Lý Thường Kiệt Tây Ninh",
    ],
  },
  {
    id: "thaibinh",
    name: "Thái Bình",
    universities: [
      "Đại học Y Dược Thái Bình",
      "Đại học Thái Bình",
    ],
    highSchools: [
      "THPT Chuyên Thái Bình",
      "THPT Nguyễn Đức Cảnh",
      "THPT Tây Tiền Hải",
      "THPT Quỳnh Côi",
    ],
  },
  {
    id: "travinh",
    name: "Trà Vinh",
    universities: [
      "Đại học Trà Vinh (TVU)",
    ],
    highSchools: [
      "THPT Chuyên Trà Vinh",
      "THPT Nguyễn Thiện Thành",
      "THPT TP. Trà Vinh",
    ],
  },
  {
    id: "tuyenquang",
    name: "Tuyên Quang",
    universities: [
      "Đại học Tân Trào",
    ],
    highSchools: [
      "THPT Chuyên Tuyên Quang",
      "THPT Tân Trào",
      "THPT Hàm Yên",
    ],
  },
  {
    id: "yenbai",
    name: "Yên Bái",
    highSchools: [
      "THPT Chuyên Nguyễn Tất Thành Yên Bái",
      "THPT Nguyễn Huệ Yên Bái",
      "THPT Chu Văn An Văn Yên",
    ],
  },
  {
    id: "other",
    name: "Tỉnh / Thành phố khác & Quốc tế",
    highSchools: [
      "THPT Khác tại địa phương",
      "Trường Quốc tế / Du học sinh",
      "Học sinh tự do",
    ],
    universities: [
      "Đại học Quốc tế",
      "Đại học Khác tại Việt Nam",
      "Du học sinh Quốc tế",
    ],
  },
];

export interface SchoolItem {
  name: string;
  provinceId: string;
  provinceName: string;
  level: "highSchool" | "university";
}

/**
 * Returns all schools formatted as flat items
 */
export function getAllSchoolsFlat(): SchoolItem[] {
  const result: SchoolItem[] = [];
  for (const prov of VIETNAM_PROVINCES_DATA) {
    if (prov.universities) {
      for (const uni of prov.universities) {
        result.push({
          name: uni,
          provinceId: prov.id,
          provinceName: prov.name,
          level: "university",
        });
      }
    }
    for (const hs of prov.highSchools) {
      result.push({
        name: hs,
        provinceId: prov.id,
        provinceName: prov.name,
        level: "highSchool",
      });
    }
  }
  return result;
}

/**
 * Detect province and level from an existing school name string
 */
export function detectSchoolInfo(schoolName: string): {
  provinceId: string;
  level: "all" | "highSchool" | "university";
  found: boolean;
} {
  if (!schoolName || !schoolName.trim()) {
    return { provinceId: "hcm", level: "all", found: false };
  }
  const clean = schoolName.trim().toLowerCase();

  for (const prov of VIETNAM_PROVINCES_DATA) {
    if (prov.universities?.some((u) => u.toLowerCase() === clean || clean.includes(u.toLowerCase()))) {
      return { provinceId: prov.id, level: "university", found: true };
    }
    if (prov.highSchools.some((h) => h.toLowerCase() === clean || clean.includes(h.toLowerCase()))) {
      return { provinceId: prov.id, level: "highSchool", found: true };
    }
  }

  // Fallback: guess by keywords
  if (clean.includes("đại học") || clean.includes("đh ") || clean.includes("học viện") || clean.includes("university")) {
    return { provinceId: "hcm", level: "university", found: false };
  }
  if (clean.includes("thpt") || clean.includes("chuyên") || clean.includes("cấp 3") || clean.includes("high school")) {
    return { provinceId: "hcm", level: "highSchool", found: false };
  }

  return { provinceId: "hcm", level: "all", found: false };
}
