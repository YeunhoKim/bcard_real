import Image from "next/image";
import { useForm } from "react-hook-form";

const { jsPDF } = require("jspdf");

interface IFromProps {
  name_kor: string;
  name_eng: string;
  rnrName: string;
  email: string;
  phoneFirst: number;
  phoneSecond: number;
}

export default function InputForBcard() {
  const { register, handleSubmit } = useForm<IFromProps>();
  const onValid = (data: IFromProps) => {
    const { name_kor, name_eng, rnrName, email, phoneFirst, phoneSecond } =
      data;

    function pdfCard() {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [94, 54],
      });
      doc.addPage();
      doc.setPage(1);
      doc.addImage("./bcardImg.png", "png", 0, 0, 94, 54);

      doc.setPage(2);
      doc.text(name_kor, 10, 10);
      doc.text(name_eng, 10, 20);
      doc.text(rnrName, 10, 30);
      doc.text(`${email}@modulabs.co.kr`, 10, 30);
      doc.text(
        `010 ${phoneFirst.toString()} ${phoneSecond.toString()}`,
        10,
        40
      );
      doc.save(`${name_kor}_명함.pdf`);
    }
    pdfCard();
  };
  const inputClass = "border border-black p-1.5";
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
      <input
        className={inputClass}
        {...register("name_eng", {
          required: true,
        })}
        type="text"
        placeholder="name eng"
      />
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
      <input
        className={inputClass}
        {...register("phoneFirst", {
          required: true,
        })}
        type="number"
        placeholder="phone first"
      />
      <input
        className={inputClass}
        {...register("phoneSecond", {
          required: true,
        })}
        type="number"
        placeholder="phone second"
      />
      {/* <input type="submit" value="dkdk" /> */}
      <button>Create Bcard</button>
    </form>
  );
}
