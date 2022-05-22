import Image from "next/image";
import { useForm } from "react-hook-form";
import { _fontNormal, _fontBold } from "./font/font";
import { jsPDF } from "jspdf";

//const { jsPDF } = require("jspdf");

interface IFromProps {
  name_kor: string;
  firstName_eng: string;
  lastName_eng: string;
  rnrName: string;
  email: string;
  phone: number;
}

export default function InputForBcard() {
  const { register, handleSubmit } = useForm<IFromProps>();
  const onValid = (data: IFromProps) => {
    const { name_kor, firstName_eng, lastName_eng, rnrName, email, phone } =
      data;

    const address = {
      company: "(주)모두의연구소",
      korean: "서울시 강남구 역삼로 156, 2F",
      eng: "2F, 156 Yeoksam-ro, Gangnam-gu, Seoul",
    };

    const norSize = 9;
    const smSize = 6;

    function pdfCard() {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [94, 54],
      });
      doc.setLanguage("ko-KR");
      const { company, korean, eng } = address;
      doc.addFileToVFS("SpoqaHanSansNeo-Regular.ttf", _fontNormal);
      doc.addFileToVFS("SpoqaHanSansNeo-Bold.ttf", _fontBold);
      doc.addPage();

      doc.setPage(1);
      doc.addImage("./bcard_front.png", "png", 0, 0, 94, 54);

      doc.setPage(2);
      doc.addImage("./bcard_back.png", "png", 0, 0, 94, 54);
      doc.addFont(
        "SpoqaHanSansNeo-Regular.ttf",
        "SpoqaHanSansNeo-Regular",
        "normal",
        400
      );
      doc.addFont(
        "SpoqaHanSansNeo-Bold.ttf",
        "SpoqaHanSansNeo-Bold",
        "normal",
        900
      );

      doc.setFont("SpoqaHanSansNeo-Bold", "normal", 900);
      doc.setFontSize(norSize);
      doc.text(name_kor, 6.7, 10.327);

      doc.setFontSize(norSize);
      doc.text(`${firstName_eng} ${lastName_eng}`, 38, 10.651);

      doc.setFontSize(smSize);
      doc.text(rnrName, 7, 23.016);

      doc.setFont("SpoqaHanSansNeo-Regular", "normal", "normal");
      doc.setFontSize(norSize);
      doc.text(
        `010 ${phone.toString().substr(0, 4)} ${phone.toString().substr(4)}`,
        38,
        17.273
      );

      doc.setFont("SpoqaHanSansNeo-Regular", "normal", "normal");
      doc.setFontSize(norSize);
      doc.text(`${email}@modulabs.co.kr`, 38, 23.251);

      /* doc.setFont("SpoqaHanSansNeo-Bold", "normal", 900);
      //doc.setFontType("bold");
      doc.setFontSize(8);
      doc.text(company, 36, 40);

      doc.setFont("SpoqaHanSansNeo-Regular", "normal", "normal");
      doc.setFontSize(8);
      doc.text(korean, 54, 40);

      doc.text(`${eng}`, 36, 46); */

      doc.save(`${name_kor}_명함.pdf`);
    }
    pdfCard();
  };
  const inputClass =
    "border border-pink-400 p-1.5 rounded-md shadow-md focus:outline-none focus:ring focus:ring-1 focus:ring-pink-500 focus:border-pink-500";
  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onValid)}>
      <input
        className={inputClass}
        {...register("name_kor", {
          required: true,
          pattern: /[ㄱ-ㅎ|가-힣]/,
        })}
        type="text"
        placeholder="이름"
      />
      <div className="flex space-x-3">
        <input
          className={`${inputClass} w-1/2`}
          {...register("firstName_eng", {
            required: true,
            pattern: /[A-Za-z]/,
          })}
          type="text"
          placeholder="이름(영문)"
        />
        <input
          className={`${inputClass} w-1/2`}
          {...register("lastName_eng", {
            required: true,
          })}
          type="text"
          placeholder="성(영문)"
        />
      </div>
      <input
        className={inputClass}
        {...register("rnrName", {
          required: true,
        })}
        type="text"
        placeholder="직책"
      />
      <div className="space-x-3">
        <input
          className={`${inputClass} w-1/2`}
          {...register("email", {
            required: true,
            pattern: /[A-Za-z]/,
          })}
          type="text"
          placeholder="이메일"
        />
        <span className="text-2xl">@modulabs.co.kr</span>
      </div>
      <div className="flex space-x-3">
        <span className="flex items-center text-2xl">010</span>
        <input
          className={`${inputClass} w-full`}
          {...register("phone", {
            required: true,
            maxLength: 8,
          })}
          type="number"
          placeholder="전화번호"
        />
      </div>
      {/* <input type="submit" value="dkdk" /> */}
      <button className="shadow-md border w-full p-1.5 bg-gray-900 text-white font-bold hover:bg-pink-500 hover:transition hover:transition-color rounded-md">
        명함 pdf 만들기
      </button>
    </form>
  );
}
