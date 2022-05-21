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
  phoneFirst: number;
  phoneSecond: number;
}

export default function InputForBcard() {
  const { register, handleSubmit } = useForm<IFromProps>();
  const onValid = (data: IFromProps) => {
    const {
      name_kor,
      firstName_eng,
      lastName_eng,
      rnrName,
      email,
      phoneFirst,
      phoneSecond,
    } = data;

    const address = {
      company: "(주)모두의연구소",
      korean: "서울시 강남구 역삼로 156, 2F",
      eng: "2F, 156 Yeoksam-ro, Gangnam-gu, Seoul",
    };

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
      doc.setFontSize(10);
      doc.text(name_kor, 4.9, 8.85);

      doc.setFontSize(10);
      doc.text(`${firstName_eng} ${lastName_eng}`, 36, 8.85);

      doc.setFontSize(6);
      doc.text(rnrName, 4.9, 21.5);

      doc.setFont("SpoqaHanSansNeo-Regular", "normal", "normal");
      doc.setFontSize(10);
      doc.text(`010 ${phoneFirst} ${phoneSecond}`, 36, 15.444);

      doc.setFont("SpoqaHanSansNeo-Regular", "normal", "normal");
      doc.setFontSize(10);
      doc.text(`${email}@modulabs.co.kr`, 36, 21.423);

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
  const inputClass = "border border-black p-1.5 rounded-md";
  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onValid)}>
      <input
        className={inputClass}
        {...register("name_kor", {
          required: true,
        })}
        type="text"
        placeholder="name korean"
      />
      <div className="flex space-x-3">
        <input
          className={`${inputClass} w-1/2`}
          {...register("firstName_eng", {
            required: true,
          })}
          type="text"
          placeholder="first name eng"
        />
        <input
          className={`${inputClass} w-1/2`}
          {...register("lastName_eng", {
            required: true,
          })}
          type="text"
          placeholder="Last name eng"
        />
      </div>
      <input
        className={inputClass}
        {...register("rnrName", {
          required: true,
        })}
        type="text"
        placeholder="rnr name"
      />
      <input
        className={inputClass}
        {...register("email", {
          required: true,
        })}
        type="text"
        placeholder="email(@modulabs.co.kr 제외)"
      />
      <div className="flex space-x-3">
        <input
          className={`${inputClass} w-1/2`}
          {...register("phoneFirst", {
            required: true,
          })}
          type="number"
          placeholder="phone first"
        />
        <input
          className={`${inputClass} w-1/2`}
          {...register("phoneSecond", {
            required: true,
          })}
          type="number"
          placeholder="phone second"
        />
      </div>
      {/* <input type="submit" value="dkdk" /> */}
      <button className="border w-full p-1.5 border-black rounded-md">
        Create Bcard pdf file
      </button>
    </form>
  );
}
