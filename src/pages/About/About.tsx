import './About.css';
import intro1 from '../../assets/images/intro1.jpg';
import intro2 from '../../assets/images/intro2.jpg';
import intro3 from '../../assets/images/intro3.jpg';
import intro4 from '../../assets/images/intro4.jpg';

const AboutUs: React.FC = () => {
    return (
      <div className="about-us-container">
        <section className="about-section">
          <h2>VỀ CHÚNG TÔI</h2>
          <p>
            Thế Giới Steak mang đến cho thực khách Sài Gòn một trải nghiệm ẩm thực
            phương Tây độc đáo, nơi mà từng món ăn là sự kết hợp hoàn hảo giữa sự
            tinh tế và sáng tạo. Không gian ấm cúng cùng những hương vị đậm đà sẽ
            đưa bạn vào một hành trình thưởng thức đặc biệt. Tại đây, món steak
            không chỉ đơn thuần là bít tết bò truyền thống mà còn là sự lựa chọn
            phong phú của steak cừu, cá sấu, đà điểu, và nhiều loại thịt hấp dẫn
            khác. Mỗi miếng steak là kết tinh của tâm huyết, được chế biến kèm
            theo các loại sốt đa dạng, mang đến hương vị riêng biệt và đậm chất
            Tây.
          </p>
          <img src={intro1} alt="Giới thiệu Thế Giới Steak" className="intro-image" />
          <p>
            Với phương châm luôn đặt sự hài lòng của khách hàng lên hàng đầu, Thế
            Giới Steak cam kết sử dụng nguyên liệu tươi ngon và quy trình chế biến
            tỉ mỉ, đảm bảo an toàn và chất lượng. Những món ăn tại đây không chỉ
            là sự thỏa mãn về vị giác mà còn là trải nghiệm hoàn hảo từ khâu phục
            vụ đến không gian.
          </p>
          <img src={intro2} alt="Các món steak đa dạng tại Thế Giới Steak" className="intro-image" />
        </section>
  
        <section className="why-choose-section">
          <h2>VÌ SAO BẠN NÊN CHỌN THẾ GIỚI STEAK?</h2>
          <ul>
            <li>Không gian sang trọng và ấm cúng, tạo cảm giác thoải mái cho mọi thực khách.</li>
            <li>Nguyên liệu luôn được chọn lọc kỹ càng, đảm bảo chất lượng và dinh dưỡng.</li>
            <li>Đội ngũ đầu bếp tài năng, giàu kinh nghiệm, đem đến món ăn chuẩn vị Âu.</li>
            <li>Thực đơn phong phú và đa dạng, với các món steak từ nhiều loại thịt khác nhau.</li>
            <li>Dịch vụ phục vụ chuyên nghiệp, tận tâm và chu đáo.</li>
          </ul>
        </section>
  
        <section className="about-gallery">
          <img src={intro3} alt="Không gian nhà hàng Thế Giới Steak" className="intro-image" />
          <img src={intro4} alt="Món ăn đặc sắc tại Thế Giới Steak" className="intro-image" />
        </section>
      </div>
    );
  };
  
  export default AboutUs;